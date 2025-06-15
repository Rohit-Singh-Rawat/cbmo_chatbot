import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/server/db";
import { MessageRole, ThreadType } from "@/lib/generated/prisma";
import { env } from "@/env";

// Types
interface Message {
	id?: string;
	content: string;
	role: MessageRole;
	threadId?: string;
	parentMessageId?: string;
	attachments?: Attachment[];
}

interface Attachment {
	type: string;
	url: string;
}

interface AIResponse {
	text: string;
	error?: string;
}

interface DatabaseMessage {
	id: string;
	content: string;
	role: MessageRole;
	threadId: string;
	parentMessageId?: string;
	attachments?: {
		create: {
			id: string;
			type: string;
			url: string;
		}[];
	};
}

// Constants
const AI_MODEL = "gemini-pro";
const MAX_TITLE_LENGTH = 5;
const DEFAULT_TITLE = "New Conversation";

// Constants for message handling
const MAX_CONTEXT_MESSAGES = 10; // Number of previous messages to include in context
const MAX_TOKEN_LENGTH = 4096; // Maximum tokens for context window

interface MessageChain {
	messages: any[];
	hasMore: boolean;
	nextCursor?: string;
}

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });

// Validation schemas
const AttachmentSchema = z.object({
	type: z.string(),
	url: z.string().url(),
});

const MessageSchema = z.object({
	id: z.string().optional(),
	content: z.string().min(1),
	attachments: z.array(AttachmentSchema).optional(),
});

const RequestSchema = z.object({
	messages: z.array(MessageSchema).min(1),
	conversationId: z.string().optional(),
	parentId: z.string().optional(),
});

// System prompt to set AI personality and guidelines
const systemPrompt = `You are an empathetic, supportive, and professional AI daily companion. Your role is to engage users in friendly, warm, and meaningful conversation every day. Always maintain a consistent tone that is both friendly and professional. Begin interactions with polite greetings, use positive and uplifting language, and show genuine interest in the user's well-being and daily experiences. Your personality should be cheerful, patient, and encouraging. Be empathetic—acknowledge user emotions, reflect on their feelings, and offer kind words of support. Always respond in a respectful and caring way.

Encourage the user to share about their day, thoughts, or interests. Ask open-ended, supportive questions that foster natural, flowing conversation. Listen actively and adapt to the context, remembering relevant information where applicable to provide a personalized experience. Maintain a steady conversational voice and never switch abruptly between tones or styles. Tailor your responses to the user's stated or implied language preference. If a user writes in a different language, seamlessly continue the conversation in that language unless otherwise specified.

Deliver high-quality, informative, and practical responses while avoiding jargon or unnecessary complexity. Simplify your language when needed and ensure that your answers are easy to understand. Mirror the user's tone when appropriate while always keeping your responses polite, respectful, and safe.

You must never generate, promote, or encourage any abusive, offensive, violent, explicit, hateful, insensitive, unethical, or inappropriate content. This includes but is not limited to racism, sexism, hate speech, harassment, or illegal activities. If prompted with such topics, respond with a neutral and respectful refusal and steer the conversation back to safe and positive ground. Avoid providing medical, legal, or financial advice—if asked, gently suggest the user consult a qualified expert.

Encourage users by celebrating their efforts and progress. Use phrases such as "You're doing great," "I'm proud of you," and "Keep going, you've got this." Be helpful and kind in every interaction, offering information and support that enriches the user's day. Whether helping them plan, reflect, relax, or learn, always aim to make their experience engaging, valuable, and emotionally supportive.`;

// Helper functions
async function validateSession() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		throw new Error("Unauthorized");
	}
	return session;
}

async function validateRequest(request: NextRequest) {
	const body = await request.json();
	const result = RequestSchema.safeParse(body);
	if (!result.success) {
		throw new Error("Invalid request format");
	}
	return result.data;
}

async function generateConversationTitle(content: string): Promise<string> {
	try {
		const result = await ai.models.generateContent({
			model: AI_MODEL,
			contents: [
				{
					role: "user",
					parts: [
						{
							text: `Generate a short, concise title (max ${MAX_TITLE_LENGTH} words) for a conversation that starts with: ${content}`,
						},
					],
				},
			],
		});

		return result.text?.trim() || DEFAULT_TITLE;
	} catch (error) {
		console.error("Error generating title:", error);
		return DEFAULT_TITLE;
	}
}

async function createNewConversation(userId: string, firstMessage: string) {
	const title = await generateConversationTitle(firstMessage);
	const conversation = await db.thread.create({
		data: {
			id: nanoid(),
			title,
			userId,
			type: ThreadType.conversation,
		},
	});
	return conversation.id;
}

async function getPreviousMessages(
	conversationId: string,
	limit = MAX_CONTEXT_MESSAGES,
): Promise<MessageChain> {
	try {
		// Get message chain using cursor-based pagination directly with conversationId
		const messages = await db.message.findMany({
			where: {
				threadId: conversationId,
			},
			take: limit + 1, // Get one extra to check if there are more
			orderBy: [{ createdAt: "desc" }],
			include: {
				attachments: true,
			},
		});

		const hasMore = messages.length > limit;
		const relevantMessages = messages.slice(0, limit).reverse();

		return {
			messages: relevantMessages.map((msg) => ({
				role: msg.role,
				parts: [{ text: msg.content }],
				timestamp: msg.createdAt,
				attachments: msg.attachments,
			})),
			hasMore,
			nextCursor: hasMore ? messages[limit].id : undefined,
		};
	} catch (error) {
		console.error("Error fetching message chain:", error);
		return { messages: [], hasMore: false };
	}
}

function estimateTokenCount(text: string): number {
	// Rough estimation: 1 token ≈ 4 characters
	return Math.ceil(text.length / 4);
}

function prepareConversationContext(
	systemPrompt: string,
	previousMessages: any[],
	currentMessages: Message[],
): any[] {
	let totalTokens = estimateTokenCount(systemPrompt);
	const context = [{ role: "system", parts: [{ text: systemPrompt }] }];

	// Add current messages first (they're most important)
	const currentContextMessages = currentMessages.map((msg) => ({
		role: msg.role === MessageRole.user ? "user" : "assistant",
		parts: [{ text: msg.content }],
	}));

	for (const msg of currentContextMessages) {
		const tokens = estimateTokenCount(msg.parts[0].text);
		if (totalTokens + tokens > MAX_TOKEN_LENGTH) break;
		context.push(msg);
		totalTokens += tokens;
	}

	// Add previous messages in reverse chronological order until we hit token limit
	for (const msg of previousMessages.reverse()) {
		const tokens = estimateTokenCount(msg.parts[0].text);
		if (totalTokens + tokens > MAX_TOKEN_LENGTH) break;
		// Map the role to the expected string literal
		context.unshift({
			role: msg.role === MessageRole.user ? "user" : "assistant",
			parts: [{ text: msg.content }],
		});
		totalTokens += tokens;
	}

	return context;
}

async function storeUserMessages(
	messages: Message[],
	conversationId: string,
	parentId?: string,
) {
	let lastMessageId = parentId;

	// Store messages sequentially to maintain proper chain
	for (const msg of messages) {
		const messageData: DatabaseMessage = {
			id: msg.id || nanoid(),
			content: msg.content,
			role: MessageRole.user,
			threadId: conversationId,
			parentMessageId: lastMessageId, // Each message points to the previous one
			attachments: msg.attachments
				? {
						create: msg.attachments.map((attachment) => ({
							id: nanoid(),
							type: attachment.type,
							url: attachment.url,
						})),
					}
				: undefined,
		};

		const storedMessage = await db.message.create({
			data: messageData,
		});

		lastMessageId = storedMessage.id;
	}

	return lastMessageId; // Return the last message ID for AI response parent reference
}

async function storeAIResponse(
	responseId: string,
	content: string,
	conversationId: string,
	parentMessageId: string,
) {
	const messageData: DatabaseMessage = {
		id: responseId,
		content,
		role: MessageRole.assistant,
		threadId: conversationId,
		parentMessageId,
	};

	await db.message.create({
		data: messageData,
	});
}

function createResponseStream(
	model: any,
	responseId: string,
	conversationId: string,
	parentMessageId: string,
) {
	const encoder = new TextEncoder();

	return new ReadableStream({
		async start(controller) {
			try {
				let fullResponse = "";
				for await (const chunk of model) {
					const chunkText = chunk.text;
					if (chunkText) {
						fullResponse += chunkText;
						controller.enqueue(encoder.encode(chunkText));
					}
				}

				await storeAIResponse(
					responseId,
					fullResponse,
					conversationId,
					parentMessageId,
				);
				controller.close();
			} catch (error) {
				controller.error(error);
			}
		},
	});
}

// Main handler
export async function POST(request: NextRequest) {
	try {
		const session = await validateSession();
		const requestData = await validateRequest(request);

		const messages: Message[] = requestData.messages.map((msg) => ({
			id: msg.id,
			content: msg.content,
			role: MessageRole.user,
			attachments: msg.attachments,
		}));

		const currentConversationId =
			requestData.conversationId ||
			(await createNewConversation(session.user.id, messages[0].content));

		// Get previous context with pagination using conversationId directly
		const { messages: previousMessages, hasMore } = currentConversationId
			? await getPreviousMessages(currentConversationId)
			: { messages: [], hasMore: false };

		// Store messages and get last message ID
		const lastMessageId = await storeUserMessages(
			messages,
			currentConversationId,
			requestData.parentId,
		);

		// Prepare context with token limit awareness
		const conversationContext = prepareConversationContext(
			systemPrompt,
			previousMessages,
			messages,
		);

		const result = await ai.models.generateContentStream({
			model: AI_MODEL,
			contents: conversationContext,
			config: {
				temperature: 0.7,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 1024,
			},
		});

		const responseId = nanoid();
		const stream = createResponseStream(
			result,
			responseId,
			currentConversationId,
			lastMessageId || "", // Use the last message as parent
		);

		return new Response(stream, {
			headers: {
				"Content-Type": "text/event-stream; charset=utf-8",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
				"X-Conversation-Id": currentConversationId,
				"X-Response-Id": responseId,
				"X-Has-More-Context": hasMore.toString(),
			},
		});
	} catch (error) {
		console.error("API Error:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Failed to process request";
		return NextResponse.json(
			{ error: errorMessage },
			{
				status:
					error instanceof Error && error.message === "Unauthorized"
						? 401
						: 500,
			},
		);
	}
}


import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: 'GOOGLE_API_KEY' });
export async function POST(request: NextRequest) {
	try {
		const { message } = await request.json();

		const model = await ai.models.generateContentStream({
			model: 'gemini-2.0-flash',
			config: {
				temperature: 0.7,
				topK: 40,
				topP: 0.95,
				maxOutputTokens: 1024,
			},
			contents: [message],

		});

		// Create a readable stream
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const chunk of model) {
						const chunkText = chunk.text;
						if (chunkText) {
							controller.enqueue(encoder.encode(chunkText));
						}
					}
					controller.close();
				} catch (error) {
					controller.error(error);
				}
			},
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream; charset=utf-8',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive',
			},
		});
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json(
			{ error: 'Failed to process request' },
			{ status: 500 }
		);
	}
}

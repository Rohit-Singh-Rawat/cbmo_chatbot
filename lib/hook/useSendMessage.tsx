import { useState, useCallback } from "react";

type SendMessageOptions = {
	onChunk?: (chunk: string) => void;
	onComplete?: (fullText: string) => void;
	onError?: (error: Error) => void;
};

type SendMessageResult = {
	isGenerating: boolean;
	isStreaming: boolean;
	streamingText: string;
	error: Error | null;
	sendMessage: (message: string) => Promise<string>;
	cancel: () => void;
};

// Streaming fetch for AI responses
const streamingFetch = async (
	message: string,
	signal: AbortSignal,
	onChunk?: (chunk: string) => void,
	onStreamingTextUpdate?: (text: string) => void,
): Promise<string> => {
	const response = await fetch("/api/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message }),
		signal,
	});

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`);
	}

	if (!response.body) {
		throw new Error("ReadableStream not supported");
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let fullText = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		const chunk = decoder.decode(value, { stream: true });
		fullText += chunk;
		if (onChunk) onChunk(chunk);
		if (onStreamingTextUpdate) onStreamingTextUpdate(fullText);
	}

	return fullText;
};

export function useSendMessage({
	onChunk,
	onComplete,
	onError,
}: SendMessageOptions = {}): SendMessageResult {
	const [isGenerating, setIsGenerating] = useState(false);
	const [isStreaming, setIsStreaming] = useState(false);
	const [streamingText, setStreamingText] = useState("");
	const [error, setError] = useState<Error | null>(null);
	const [abortController, setAbortController] =
		useState<AbortController | null>(null);

	const cancel = useCallback(() => {
		if (abortController) {
			abortController.abort();
			setIsGenerating(false);
			setIsStreaming(false);
			setStreamingText("");
		}
	}, [abortController]);

	const sendMessage = useCallback(
		async (message: string): Promise<string> => {
			setIsGenerating(true);
			setIsStreaming(true);
			setStreamingText("");
			setError(null);

			const controller = new AbortController();
			setAbortController(controller);

			try {
				const fullText = await streamingFetch(
					message,
					controller.signal,
					onChunk,
					(text) => setStreamingText(text),
				);

				if (onComplete) onComplete(fullText);
				return fullText;
			} catch (err) {
				const error = err instanceof Error ? err : new Error(String(err));
				if (error.name !== "AbortError") {
					setError(error);
					if (onError) onError(error);
				}
				throw error;
			} finally {
				setIsGenerating(false);
				setIsStreaming(false);
				setAbortController(null);
			}
		},
		[onChunk, onComplete, onError],
	);

	return {
		isGenerating,
		isStreaming,
		streamingText,
		error,
		sendMessage,
		cancel,
	};
}

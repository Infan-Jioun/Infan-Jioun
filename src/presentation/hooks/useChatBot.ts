"use client";

import { useState, useCallback } from "react";
import { ChatMessageDto, ChatResponseDto } from "@/shared/validation/chat.schema";

export interface UiChatMessage extends ChatMessageDto {
  sources?: Array<{
    title: string;
    category: string;
    similarity: number;
  }>;
}

export function useChatBot() {
  const [messages, setMessages] = useState<UiChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm Infan AI, powered by RAG with PostgreSQL pgvector. Ask me anything about my projects, skills, tech stack, or hiring availability!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (textToSend?: string): Promise<void> => {
      const content = (textToSend ?? input).trim();
      if (!content || loading) return;

      const userMessage: UiChatMessage = { role: "user", content };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.error ?? "Failed to fetch response from server.");
        }

        const data: ChatResponseDto = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
            sources: data.sources,
          },
        ]);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(errorMsg);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an issue retrieving the answer from the vector knowledge base. Please try again in a moment.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  return {
    messages,
    input,
    setInput,
    loading,
    error,
    sendMessage,
  };
}


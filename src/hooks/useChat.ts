"use client";

import { useCallback, useState } from "react";
import { sendChatMessages } from "@/services/chatService";
import { ERRORS } from "@/constants/app";
import type { Message } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessages(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERRORS.generic);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setError(null);
  }, []);

  return {
    messages,
    input,
    loading,
    error,
    setInput,
    sendMessage,
    resetChat,
  };
}

"use client";

import { useCallback, useState } from "react";
import { fetchConversation, sendChatMessages } from "@/services/chatService";
import { ERRORS } from "@/constants/app";
import type { Message } from "@/types/chat";

export function useChat(onConversationSaved?: () => void) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
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
      const result = await sendChatMessages(nextMessages, conversationId);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: result.reply },
      ]);
      setConversationId(result.conversationId);
      onConversationSaved?.();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERRORS.generic);
    } finally {
      setLoading(false);
    }
  }, [conversationId, input, loading, messages, onConversationSaved]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setInput("");
    setError(null);
  }, []);

  const loadConversation = useCallback(async (id: string) => {
    setError(null);
    try {
      const loaded = await fetchConversation(id);
      setMessages(loaded);
      setConversationId(id);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERRORS.generic);
    }
  }, []);

  return {
    messages,
    conversationId,
    input,
    loading,
    error,
    setInput,
    sendMessage,
    resetChat,
    loadConversation,
  };
}

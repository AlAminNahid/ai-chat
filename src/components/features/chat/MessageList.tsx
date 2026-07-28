"use client";

import { useEffect, useRef } from "react";
import { EmptyState } from "./EmptyState";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/types/chat";

type MessageListProps = {
  messages: Message[];
  loading: boolean;
  error: string | null;
  onSuggestionClick: (suggestion: string) => void;
};

export function MessageList({
  messages,
  loading,
  error,
  onSuggestionClick,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6 min-h-full">
        {messages.length === 0 && !loading && (
          <EmptyState onSuggestionClick={onSuggestionClick} />
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}

        {loading && <TypingIndicator />}

        {error && (
          <div className="text-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}

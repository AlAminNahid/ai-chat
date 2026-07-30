"use client";

import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { AppShell } from "@/components/layouts/AppShell";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";

export function ChatContainer() {
  const { conversations, refresh } = useConversations();
  const {
    messages,
    conversationId,
    input,
    loading,
    error,
    setInput,
    sendMessage,
    resetChat,
    loadConversation,
  } = useChat(refresh);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(max-width: 767px)").matches;
  });

  const closeOnMobile = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSidebarOpen(false);
    }
  };

  return (
    <AppShell
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((open) => !open)}
          onClose={() => setSidebarOpen(false)}
          onNewChat={() => {
            resetChat();
            closeOnMobile();
          }}
          conversations={conversations}
          activeId={conversationId}
          onSelect={(id) => {
            loadConversation(id);
            closeOnMobile();
          }}
        />
      }
    >
      <ChatHeader />
      <MessageList
        messages={messages}
        loading={loading}
        error={error}
        onSuggestionClick={setInput}
      />
      <ChatInput
        value={input}
        loading={loading}
        onChange={setInput}
        onSend={sendMessage}
      />
    </AppShell>
  );
}

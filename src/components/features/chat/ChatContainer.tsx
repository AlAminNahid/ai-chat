"use client";

import { useEffect, useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <AppShell
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((open) => !open)}
          onClose={() => setSidebarOpen(false)}
          onNewChat={() => {
            resetChat();
            setSidebarOpen(false);
          }}
          conversations={conversations}
          activeId={conversationId}
          onSelect={loadConversation}
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

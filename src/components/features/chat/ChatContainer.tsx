"use client";

import { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { AppShell } from "@/components/layouts/AppShell";
import { Sidebar } from "@/components/layouts/Sidebar";
import { useChat } from "@/hooks/useChat";

export function ChatContainer() {
  const { messages, input, loading, error, setInput, sendMessage, resetChat } =
    useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppShell
      sidebar={
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={() => {
            resetChat();
            setSidebarOpen(false);
          }}
        />
      }
    >
      <ChatHeader onToggleSidebar={() => setSidebarOpen((open) => !open)} />
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

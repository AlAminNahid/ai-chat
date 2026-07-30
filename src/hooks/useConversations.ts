"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchConversations } from "@/services/chatService";
import type { ConversationSummary } from "@/types/chat";

export function useConversations() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);

  const refresh = useCallback(() => {
    fetchConversations()
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { conversations, refresh };
}

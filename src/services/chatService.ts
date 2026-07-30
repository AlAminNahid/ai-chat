import { API_ROUTES, ERRORS } from "@/constants/app";
import type { ChatResponse, ConversationSummary, Message } from "@/types/chat";

export async function sendChatMessages(
  messages: Message[],
  conversationId: string | null,
): Promise<{ reply: string; conversationId: string }> {
  let response: Response;

  try {
    response = await fetch(API_ROUTES.chat, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, conversationId }),
    });
  } catch {
    throw new Error(ERRORS.network);
  }

  const data = (await response.json().catch(() => null)) as ChatResponse | null;

  if (!response.ok || data === null || "error" in data || !("reply" in data)) {
    const detail = data && "error" in data ? data.error : null;
    throw new Error(detail ?? ERRORS.generic);
  }

  return data;
}

export async function fetchConversations(): Promise<ConversationSummary[]> {
  const response = await fetch("/api/conversations");
  if (!response.ok) throw new Error(ERRORS.generic);

  const data = (await response.json()) as {
    conversations: ConversationSummary[];
  };
  return data.conversations;
}

export async function fetchConversation(id: string): Promise<Message[]> {
  const response = await fetch(`/api/conversations/${id}`);
  if (!response.ok) throw new Error(ERRORS.generic);

  const data = (await response.json()) as { messages: Message[] };
  return data.messages;
}

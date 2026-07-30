import type { Message } from "@/types/chat";

function isMessage(value: unknown): value is Message {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

export function parseMessages(value: unknown): Message[] | null {
  if (typeof value !== "object" || value === null) return null;

  const { messages } = value as Record<string, unknown>;

  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (!messages.every(isMessage)) return null;

  return messages;
}

export type ChatBody = {
  messages: Message[];
  conversationId: string | null;
};

export function parseChatBody(value: unknown): ChatBody | null {
  const messages = parseMessages(value);
  if (!messages) return null;

  const { conversationId } = value as Record<string, unknown>;
  if (
    conversationId !== undefined &&
    conversationId !== null &&
    typeof conversationId !== "string"
  ) {
    return null;
  }

  return { messages, conversationId: conversationId ?? null };
}

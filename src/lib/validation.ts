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

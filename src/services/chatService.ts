import { API_ROUTES, ERRORS } from "@/constants/app";
import type { ChatResponse, Message } from "@/types/chat";

export async function sendChatMessages(messages: Message[]): Promise<string> {
  let response: Response;

  try {
    response = await fetch(API_ROUTES.chat, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new Error(ERRORS.network);
  }

  const data = (await response.json().catch(() => null)) as ChatResponse | null;

  if (!response.ok || data === null || "error" in data) {
    const detail = data && "error" in data ? data.error : null;
    throw new Error(detail ?? ERRORS.generic);
  }

  return data.reply;
}

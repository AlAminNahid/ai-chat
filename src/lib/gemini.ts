import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_CONFIG, getGeminiApiKey } from "@/config/ai";
import type { Message } from "@/types/chat";

function toGeminiContents(messages: Message[]) {
  return messages.map((message) => ({
    role: message.role === "user" ? "user" : "model",
    parts: [{ text: message.content }],
  }));
}

export async function generateReply(messages: Message[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());

  const model = genAI.getGenerativeModel({
    model: AI_CONFIG.model,
    systemInstruction: AI_CONFIG.systemInstruction,
  });

  const result = await model.generateContent({
    contents: toGeminiContents(messages),
  });

  return result.response.text();
}

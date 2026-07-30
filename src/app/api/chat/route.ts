import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/gemini";
import { parseChatBody } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { ERRORS } from "@/constants/app";
import type { Message } from "@/types/chat";

function titleFrom(content: string): string {
  const trimmed = content.trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = parseChatBody(body);

    if (!parsed) {
      return NextResponse.json(
        { error: "Request body must include a non-empty `messages` array." },
        { status: 400 },
      );
    }

    const { messages, conversationId } = parsed;
    const latestMessage = messages[messages.length - 1];

    let existingMessages: Message[] = [];

    if (conversationId) {
      const existing = await prisma.conversation.findUnique({
        where: { id: conversationId },
        select: { messages: true },
      });

      if (!existing) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 },
        );
      }

      existingMessages = existing.messages as Message[];
    }

    const reply = await generateReply(messages);

    const finalMessages: Message[] = [
      ...existingMessages,
      { role: latestMessage.role, content: latestMessage.content },
      { role: "assistant", content: reply },
    ];

    const conversation = conversationId
      ? await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date(), messages: finalMessages },
        })
      : await prisma.conversation.create({
          data: {
            title: titleFrom(latestMessage.content),
            messages: finalMessages,
          },
        });

    return NextResponse.json({ reply, conversationId: conversation.id });
  } catch (error) {
    console.error("[api/chat]", error);

    return NextResponse.json(
      { error: ERRORS.generic, detail: String(error) },
      { status: 500 },
    );
  }
}

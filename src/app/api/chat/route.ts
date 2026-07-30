import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/gemini";
import { parseChatBody } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { ERRORS } from "@/constants/app";

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

    const conversation = conversationId
      ? await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            updatedAt: new Date(),
            messages: {
              create: { role: latestMessage.role, content: latestMessage.content },
            },
          },
        })
      : await prisma.conversation.create({
          data: {
            title: titleFrom(latestMessage.content),
            messages: {
              create: { role: latestMessage.role, content: latestMessage.content },
            },
          },
        });

    const reply = await generateReply(messages);

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        updatedAt: new Date(),
        messages: { create: { role: "assistant", content: reply } },
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

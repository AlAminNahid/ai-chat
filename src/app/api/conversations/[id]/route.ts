import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ERRORS } from "@/constants/app";
import type { Role } from "@/types/chat";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      select: { messages: true },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      messages: conversation.messages as { role: Role; content: string }[],
    });
  } catch (error) {
    console.error("[api/conversations/:id]", error);

    return NextResponse.json(
      { error: ERRORS.generic, detail: String(error) },
      { status: 500 },
    );
  }
}

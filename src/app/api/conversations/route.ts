import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ERRORS } from "@/constants/app";

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, updatedAt: true },
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("[api/conversations]", error);

    return NextResponse.json(
      { error: ERRORS.generic, detail: String(error) },
      { status: 500 },
    );
  }
}

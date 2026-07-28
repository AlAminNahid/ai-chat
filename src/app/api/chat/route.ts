import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "@/lib/gemini";
import { parseMessages } from "@/lib/validation";
import { ERRORS } from "@/constants/app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const messages = parseMessages(body);

    if (!messages) {
      return NextResponse.json(
        { error: "Request body must include a non-empty `messages` array." },
        { status: 400 },
      );
    }

    const reply = await generateReply(messages);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[api/chat]", error);

    return NextResponse.json(
      { error: ERRORS.generic, detail: String(error) },
      { status: 500 },
    );
  }
}

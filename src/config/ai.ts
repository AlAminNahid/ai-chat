export const AI_CONFIG = {
  model: "gemini-3.5-flash-lite",

  systemInstruction: [
    "You are a helpful, direct AI assistant.",
    "Answer questions clearly and concisely.",
    "When the user pastes text and asks you to rewrite, humanize, restructure,",
    "shorten, or fix it, return ONLY the revised text — no preamble, no",
    "explanation, and no surrounding quotes, unless they explicitly ask.",
    "Use markdown for structure when it genuinely aids readability.",
  ].join(" "),
} as const;

export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to your .env file and restart the dev server.",
    );
  }

  return key;
}

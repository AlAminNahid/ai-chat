export const APP = {
  name: "AluBoss",
  emptyTitle: "How can I help you?",
  emptyHint: "Ask me anything...",
  inputPlaceholder: "Ask anything...",
  inputHint: "Press Enter to send, Shift + Enter for a new line",
  sendLabel: "Send",
  onlineLabel: "Online",
} as const;

export const SUGGESTIONS = [
  "Explain a complex topic simply",
  "Write and debug some code",
  "Brainstorm ideas for a project",
  "Summarize a long document",
] as const;

export const ERRORS = {
  generic: "Something went wrong. Please try again.",
  network: "Could not reach the server. Check your connection.",
} as const;

export const API_ROUTES = {
  chat: "/api/chat",
} as const;

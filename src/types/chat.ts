export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type ChatRequest = {
  messages: Message[];
  conversationId?: string;
};

export type ChatSuccessResponse = {
  reply: string;
  conversationId: string;
};

export type ChatErrorResponse = {
  error: string;
  detail?: string;
};

export type ChatResponse = ChatSuccessResponse | ChatErrorResponse;

export type ConversationSummary = {
  id: string;
  title: string | null;
  updatedAt: string;
};

export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
};

export type ChatRequest = {
  messages: Message[];
};

export type ChatSuccessResponse = {
  reply: string;
};

export type ChatErrorResponse = {
  error: string;
  detail?: string;
};

export type ChatResponse = ChatSuccessResponse | ChatErrorResponse;

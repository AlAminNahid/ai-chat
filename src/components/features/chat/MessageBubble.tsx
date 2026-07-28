import { Avatar } from "@/components/ui/Avatar";
import type { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-3 animate-fade-in-up ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar label={isUser ? "U" : "AI"} variant={isUser ? "dark" : "light"} />

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-zinc-900 text-white rounded-br-md dark:bg-indigo-600"
            : "bg-white text-zinc-700 rounded-bl-md border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-[#f5f4f2] text-gray-800">
      {/* Header */}
      <header className="border-b border-[#e2e0dc] px-6 py-4 flex items-center gap-3 bg-white shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-[#6b6b6b] flex items-center justify-center text-sm font-semibold text-white">
          AI
        </div>
        <div>
          <h1 className="font-semibold text-gray-700">AI Assistant</h1>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-8 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-[#e8e6e2] flex items-center justify-center text-3xl">
              💬
            </div>
            <p className="text-lg font-medium text-gray-500">
              How can I help you?
            </p>
            <p className="text-sm text-gray-400">
              Ask me anything — time, weather, general knowledge...
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                m.role === "user"
                  ? "bg-[#6b6b6b] text-white"
                  : "bg-[#dedad5] text-gray-600"
              }`}
            >
              {m.role === "user" ? "U" : "AI"}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                m.role === "user"
                  ? "bg-[#3d3d3d] text-white rounded-br-sm"
                  : "bg-white text-gray-700 rounded-bl-sm border border-[#e2e0dc]"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-3">
            <div className="w-7 h-7 rounded-full bg-[#dedad5] flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-600">
              AI
            </div>
            <div className="bg-white border border-[#e2e0dc] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center shadow-sm">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="border-t border-[#e2e0dc] bg-white px-4 py-4 shadow-[0_-1px_4px_rgba(0,0,0,0.04)]">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            className="flex-1 bg-[#f5f4f2] border border-[#dedad5] rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask anything..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-[#3d3d3d] hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Press Enter to send
        </p>
      </footer>
    </div>
  );
}

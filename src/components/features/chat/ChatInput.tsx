"use client";

import { useEffect, useRef } from "react";
import { APP } from "@/constants/app";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <footer className="bg-transparent px-4 pb-4 sm:pb-6 pt-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-3 py-2 shadow-md shadow-black/[0.03] dark:shadow-black/20 focus-within:border-zinc-300 dark:focus-within:border-zinc-700 transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none max-h-40"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder={APP.inputPlaceholder}
            disabled={loading}
          />

          <button
            onClick={onSend}
            disabled={loading || !value.trim()}
            aria-label={APP.sendLabel}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            {loading ? (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-2">
          {APP.inputHint}
        </p>
      </div>
    </footer>
  );
}

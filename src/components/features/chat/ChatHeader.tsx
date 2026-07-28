import { APP } from "@/constants/app";

type ChatHeaderProps = {
  onToggleSidebar: () => void;
};

export function ChatHeader({ onToggleSidebar }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6 py-3.5">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <button
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          className="md:hidden text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 p-1 -ml-1"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-500/30">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v2.2" />
            <rect x="4" y="7" width="16" height="12" rx="4" />
            <circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none" />
            <circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none" />
            <path d="M9 17h6" />
            <path d="M2 12v3" />
            <path d="M22 12v3" />
          </svg>
        </div>

        <div className="flex flex-col leading-tight">
          <h1 className="font-semibold text-[15px] text-zinc-900 dark:text-zinc-100">
            {APP.name}
          </h1>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            AI Assistant
          </span>
        </div>

        <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          {APP.onlineLabel}
        </span>
      </div>
    </header>
  );
}

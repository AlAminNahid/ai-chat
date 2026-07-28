type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
};

export function Sidebar({ open, onClose, onNewChat }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-[1px] md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-72 flex-shrink-0 flex flex-col bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v2" />
              <rect x="4" y="6" width="16" height="12" rx="3" />
              <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
              <path d="M2 11v2" />
              <path d="M22 11v2" />
            </svg>
          </div>

          <button
            aria-label="Close sidebar"
            onClick={onClose}
            className="ml-auto md:hidden text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl px-3 py-2.5 transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
            Recent
          </p>

          <div className="flex flex-col items-center text-center gap-2 px-4 py-8 text-zinc-400 dark:text-zinc-600">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-xs leading-relaxed">
              Your conversations will show up here once you start chatting.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

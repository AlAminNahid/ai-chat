import { APP, SUGGESTIONS } from "@/constants/app";

type EmptyStateProps = {
  onSuggestionClick: (suggestion: string) => void;
};

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4 px-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20">
        ✨
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          {APP.emptyTitle}
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          {APP.emptyHint}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-md mt-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-sm text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

type AvatarProps = {
  label: string;
  variant?: "dark" | "light";
  size?: "sm" | "md";
  src?: string;
};

const VARIANTS = {
  dark: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  light: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
} as const;

const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
} as const;

export function Avatar({
  label,
  variant = "dark",
  size = "sm",
  src,
}: AvatarProps) {
  return (
    <div
      className={`flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center font-semibold ring-1 ring-black/5 dark:ring-white/10 ${SIZES[size]} ${VARIANTS[variant]}`}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
          loading="eager"
        />
      ) : (
        label
      )}
    </div>
  );
}

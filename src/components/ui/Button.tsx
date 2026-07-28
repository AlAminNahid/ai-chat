import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white ${className}`}
    >
      {children}
    </button>
  );
}

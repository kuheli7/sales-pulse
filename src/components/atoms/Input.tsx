import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-36 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30 ${className}`}
      {...props}
    />
  );
}

import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Button({ active = false, className = "", ...props }: Props) {
  const tone = active
    ? "border-accent bg-accent text-on-accent"
    : "border-line bg-surface text-ink-2 hover:text-ink hover:border-ink-2";
  return (
    <button
      aria-pressed={active}
      className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${tone} ${className}`}
      {...props}
    />
  );
}

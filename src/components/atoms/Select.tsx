import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={`cursor-pointer appearance-none rounded-lg border border-line bg-surface py-1.5 pl-3 pr-8 text-sm font-medium text-ink outline-none transition-colors hover:border-ink-2 focus:border-accent focus:ring-2 focus:ring-accent/30 ${className}`}
        {...props}
      >
        {children}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
        ▾
      </span>
    </div>
  );
}

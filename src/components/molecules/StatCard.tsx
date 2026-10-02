"use client";

import { Card } from "@/components/atoms/Card";
import { useCountUp } from "@/hooks/useCountUp";

interface Props {
  label: string;
  value: number;
  format: (n: number) => string;
  /** percent change vs the comparison period; null/undefined hides the line */
  delta?: number | null;
  deltaLabel?: string;
}

export function StatCard({ label, value, format, delta, deltaLabel }: Props) {
  const shown = useCountUp(value);
  const up = (delta ?? 0) >= 0;

  return (
    <Card>
      <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />
      <p className="text-sm text-ink-2">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-ink">{format(shown)}</p>
      {delta != null && (
        <p className={`mt-2 flex flex-wrap items-center gap-x-1.5 text-xs ${up ? "text-good" : "text-bad"}`}>
          <span aria-hidden="true">{up ? "▲" : "▼"}</span>
          <span className="font-semibold">
            {up ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
          <span className="text-muted">{deltaLabel}</span>
        </p>
      )}
    </Card>
  );
}

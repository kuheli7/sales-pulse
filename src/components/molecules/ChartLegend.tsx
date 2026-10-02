import { formatCompact } from "@/lib/format";

export interface LegendItem {
  name: string;
  value: number;
  color: string;
}

export function ChartLegend({ items }: { items: LegendItem[] }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  return (
    <ul className="w-full space-y-2 text-sm sm:w-1/2">
      {items.map((item) => (
        <li key={item.name} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: item.color }} aria-hidden="true" />
          <span className="truncate text-ink-2">{item.name}</span>
          <span className="ml-auto text-ink">{total ? Math.round((item.value / total) * 100) : 0}%</span>
          <span className="w-14 text-right text-muted">{formatCompact(item.value)}</span>
        </li>
      ))}
    </ul>
  );
}

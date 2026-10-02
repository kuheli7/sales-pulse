import { formatCompact } from "@/lib/format";
import type { SalesSummary } from "@/types/sales";

export function InsightStrip({ data }: { data: SalesSummary }) {
  const bestMonth = data.monthly.reduce((best, m) => (m.value > best.value ? m : best), data.monthly[0]);
  const topLine = data.byProductLine[0];
  const topCountry = data.byCountry[0];
  const share = Math.round((topLine.value / data.totalSales) * 100);

  const insights = [
    { label: "Best month", value: bestMonth.name, note: formatCompact(bestMonth.value) },
    { label: "Top product line", value: topLine.name, note: `${share}% of sales` },
    { label: "Top country", value: topCountry.name, note: formatCompact(topCountry.value) },
  ];

  return (
    <section
      aria-label="Highlights"
      className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
    >
      {insights.map((i) => (
        <div key={i.label} className="bg-surface px-5 py-3">
          <p className="text-xs uppercase tracking-wide text-muted">{i.label}</p>
          <p className="mt-0.5 flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-accent">{i.value}</span>
            <span className="text-sm text-ink-2">{i.note}</span>
          </p>
        </div>
      ))}
    </section>
  );
}

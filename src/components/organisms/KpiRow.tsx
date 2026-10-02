import { StatCard } from "@/components/molecules/StatCard";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { SalesSummary } from "@/types/sales";

export function KpiRow({ data }: { data: SalesSummary }) {
  const c = data.comparison;
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Key figures">
      <StatCard label="Total sales" value={data.totalSales} format={formatCurrency} delta={c?.sales} deltaLabel={c?.label} />
      <StatCard label="Orders" value={data.orderCount} format={formatNumber} delta={c?.orders} deltaLabel={c?.label} />
      <StatCard label="Units sold" value={data.unitsSold} format={formatNumber} delta={c?.units} deltaLabel={c?.label} />
      <StatCard
        label="Avg. order value"
        value={data.averageOrderValue}
        format={formatCurrency}
        delta={c?.averageOrderValue}
        deltaLabel={c?.label}
      />
    </section>
  );
}

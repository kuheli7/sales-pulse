import orders from "@/data/sales.json";
import type { Comparison, DataPoint, Order, SalesSummary, Year } from "@/types/sales";

export const YEARS: Year[] = [2022, 2023, 2024];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const round = (n: number) => Math.round(n * 100) / 100;

function groupBy(list: Order[], key: (o: Order) => string): DataPoint[] {
  const totals = new Map<string, number>();
  for (const o of list) totals.set(key(o), (totals.get(key(o)) ?? 0) + o.sales);
  return [...totals].map(([name, value]) => ({ name, value: round(value) }));
}

function totalsOf(list: Order[]) {
  const orderCount = new Set(list.map((o) => o.orderNumber)).size;
  const sales = list.reduce((s, o) => s + o.sales, 0);
  return {
    sales,
    orderCount,
    units: list.reduce((s, o) => s + o.quantity, 0),
    averageOrderValue: orderCount ? sales / orderCount : 0,
  };
}

const pctChange = (current: number, previous: number) =>
  previous ? round(((current - previous) / previous) * 100) : null;

export function isYear(n: number): n is Year {
  return (YEARS as number[]).includes(n);
}

export function getSalesSummary(year: Year): SalesSummary {
  const all = orders as Order[];
  const list = all.filter((o) => o.year === year);
  const months = [...new Set(list.map((o) => o.month))].sort((a, b) => a - b);
  const partial = months.length < 12;
  const range = `${MONTHS[months[0] - 1]}-${MONTHS[months[months.length - 1] - 1]}`;
  const current = totalsOf(list);

  const previousList = all.filter((o) => o.year === year - 1 && months.includes(o.month));
  let comparison: Comparison | null = null;
  if (previousList.length) {
    const prev = totalsOf(previousList);
    comparison = {
      year: year - 1,
      label: partial ? `vs ${year - 1} (${range})` : `vs ${year - 1}`,
      sales: pctChange(current.sales, prev.sales),
      orders: pctChange(current.orderCount, prev.orderCount),
      units: pctChange(current.units, prev.units),
      averageOrderValue: pctChange(current.averageOrderValue, prev.averageOrderValue),
    };
  }

  const monthTotals = groupBy(list, (o) => MONTHS[o.month - 1]);

  return {
    year,
    totalSales: round(current.sales),
    orderCount: current.orderCount,
    unitsSold: current.units,
    averageOrderValue: round(current.averageOrderValue),
    monthly: months.map((m) => monthTotals.find((t) => t.name === MONTHS[m - 1])!),
    byProductLine: groupBy(list, (o) => o.productLine).sort((a, b) => b.value - a.value),
    byCountry: groupBy(list, (o) => o.country).sort((a, b) => b.value - a.value),
    coverage: { label: partial ? `Partial year: ${range}` : "Full year", partial },
    comparison,
  };
}

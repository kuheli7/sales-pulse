"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card } from "@/components/atoms/Card";
import { ChartLegend } from "@/components/molecules/ChartLegend";
import { formatCompact, formatCurrency } from "@/lib/format";
import type { ChartType, DataPoint } from "@/types/sales";

const ACCENT = "var(--accent)";
const SERIES_COUNT = 8;
const tick = { fill: "var(--muted)", fontSize: 12 };

/** Colour follows the entity: its slot in `colorOrder`, never its rank in the filtered data. */
function sliceColor(name: string, colorOrder: string[]) {
  const i = colorOrder.indexOf(name);
  return i >= 0 && i < SERIES_COUNT ? `var(--series-${i + 1})` : "var(--muted)";
}

interface TooltipProps {
  active?: boolean;
  payload?: ReadonlyArray<{ value?: unknown; payload?: DataPoint }>;
  label?: unknown;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg">
      <p className="text-ink-2">{point.payload?.name ?? String(label)}</p>
      <p className="font-display text-base font-semibold text-ink">{formatCurrency(Number(point.value))}</p>
    </div>
  );
}

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  data: DataPoint[];
  type: ChartType;
  /** category charts (not a time axis): bars go horizontal, line labels tilt */
  categorical?: boolean;
  colorOrder?: string[];
}

export function SalesChart({ id, title, subtitle, data, type, categorical = false, colorOrder = [] }: Props) {
  const gradientId = `fill-${id}`;
  const items = data.filter((d) => d.value > 0);
  const total = items.reduce((s, d) => s + d.value, 0);

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      {subtitle && <p className="mb-4 text-xs text-muted">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}

      {items.length === 0 ? (
        <p className="flex h-72 items-center justify-center text-sm text-muted">No data meets the sales threshold.</p>
      ) : type === "pie" ? (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative h-60 w-full sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={items}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="92%"
                  paddingAngle={2}
                  stroke="var(--surface)"
                  strokeWidth={2}
                >
                  {items.map((d) => (
                    <Cell key={d.name} fill={sliceColor(d.name, colorOrder)} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-muted">Total</span>
              <span className="font-display text-xl font-semibold text-ink">{formatCompact(total)}</span>
            </div>
          </div>
          <ChartLegend items={items.map((d) => ({ ...d, color: sliceColor(d.name, colorOrder) }))} />
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <AreaChart data={items} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: ACCENT, stopOpacity: 0.35 }} />
                    <stop offset="100%" style={{ stopColor: ACCENT, stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--grid)" />
                <XAxis
                  dataKey="name"
                  tick={tick}
                  tickLine={false}
                  axisLine={{ stroke: "var(--axis)" }}
                  interval={0}
                  {...(categorical ? { angle: -30, textAnchor: "end", height: 64 } : {})}
                />
                <YAxis tick={tick} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompact(Number(v))} width={56} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--axis)" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={ACCENT}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={{ r: 3, fill: ACCENT, stroke: "var(--surface)", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: ACCENT, stroke: "var(--surface)", strokeWidth: 2 }}
                />
              </AreaChart>
            ) : categorical ? (
              <BarChart data={items} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="var(--grid)" />
                <XAxis type="number" tick={tick} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompact(Number(v))} />
                <YAxis type="category" dataKey="name" width={112} tick={tick} tickLine={false} axisLine={{ stroke: "var(--axis)" }} interval={0} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--hover)" }} />
                <Bar dataKey="value" fill={ACCENT} radius={[0, 4, 4, 0]} maxBarSize={20} isAnimationActive={false} />
              </BarChart>
            ) : (
              <BarChart data={items} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--grid)" />
                <XAxis dataKey="name" tick={tick} tickLine={false} axisLine={{ stroke: "var(--axis)" }} />
                <YAxis tick={tick} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompact(Number(v))} width={56} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--hover)" }} />
                <Bar dataKey="value" fill={ACCENT} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

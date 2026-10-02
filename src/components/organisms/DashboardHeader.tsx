import { Logo } from "@/components/atoms/Logo";
import { ChartTypeToggle } from "@/components/molecules/ChartTypeToggle";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { ThresholdInput } from "@/components/molecules/ThresholdInput";
import { YearSelector } from "@/components/molecules/YearSelector";
import type { ChartType, SalesSummary, Year } from "@/types/sales";

interface Props {
  year: Year;
  onYearChange: (y: Year) => void;
  chartType: ChartType;
  onChartTypeChange: (t: ChartType) => void;
  threshold: string;
  onThresholdChange: (v: string) => void;
  coverage?: SalesSummary["coverage"];
}

export function DashboardHeader(p: Props) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">Sales Pulse</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
            Sales in <span className="text-accent">{p.year}</span>
          </h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-ink-2">
            Kaggle sample sales data
            {p.coverage?.partial && (
              <span className="rounded-full border border-accent px-2 py-0.5 text-xs text-accent">
                {p.coverage.label}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <YearSelector value={p.year} onChange={p.onYearChange} />
          <ChartTypeToggle value={p.chartType} onChange={p.onChartTypeChange} />
          <ThresholdInput value={p.threshold} onChange={p.onThresholdChange} />
        </div>
      </div>
    </header>
  );
}

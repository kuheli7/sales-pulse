"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/atoms/Spinner";
import { DashboardHeader } from "@/components/organisms/DashboardHeader";
import { InsightStrip } from "@/components/organisms/InsightStrip";
import { KpiRow } from "@/components/organisms/KpiRow";
import { SalesChart } from "@/components/organisms/SalesChart";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import type { ChartType, DataPoint, SalesSummary, Year } from "@/types/sales";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PIE_COUNTRIES = 7;

/** A donut of 12 months is unreadable, so months are grouped into quarters. */
function toQuarters(monthly: DataPoint[]): DataPoint[] {
  return QUARTERS.map((name, q) => ({
    name,
    value: monthly
      .filter((m) => Math.floor(MONTH_NAMES.indexOf(m.name) / 3) === q)
      .reduce((s, m) => s + m.value, 0),
  }));
}

/** Keeps the top `n` entries and folds the rest into one "Other" slice. */
function withOther(ranked: DataPoint[], n: number): DataPoint[] {
  const rest = ranked.slice(n).reduce((s, d) => s + d.value, 0);
  return rest > 0 ? [...ranked.slice(0, n), { name: "Other", value: rest }] : ranked;
}

export function DashboardClient() {
  const [year, setYear] = useState<Year>(2024);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState("");
  const [data, setData] = useState<SalesSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  // the page accent colour follows the selected year (see globals.css)
  useEffect(() => {
    document.documentElement.dataset.year = String(year);
  }, [year]);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    fetch(`/api/sales?year=${year}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Request failed (${res.status})`))))
      .then(setData)
      .catch((e: Error) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, [year]);

  const min = Number(threshold) || 0;
  const aboveMin = (list: DataPoint[]) => list.filter((d) => d.value >= min);
  const ready = data !== null && data.year === year;
  const isPie = chartType === "pie";

  const productNames = ready ? data.byProductLine.map((d) => d.name).sort() : [];
  const countries = ready ? (isPie ? withOther(data.byCountry, PIE_COUNTRIES) : data.byCountry.slice(0, 10)) : [];

  return (
    <DashboardTemplate
      header={
        <DashboardHeader
          year={year}
          onYearChange={setYear}
          chartType={chartType}
          onChartTypeChange={setChartType}
          threshold={threshold}
          onThresholdChange={setThreshold}
          coverage={ready ? data.coverage : undefined}
        />
      }
      kpis={ready ? <KpiRow data={data} /> : null}
      insights={ready ? <InsightStrip data={data} /> : null}
    >
      {error ? (
        <p role="alert" className="text-bad lg:col-span-2">
          Could not load sales data: {error}
        </p>
      ) : !ready ? (
        <div className="lg:col-span-2">
          <Spinner />
        </div>
      ) : (
        <>
          <SalesChart
            id="monthly"
            title={isPie ? "Sales by quarter" : "Monthly sales"}
            subtitle={data.coverage.label}
            data={aboveMin(isPie ? toQuarters(data.monthly) : data.monthly)}
            type={chartType}
            colorOrder={QUARTERS}
          />
          <SalesChart
            id="products"
            title="Sales by product line"
            data={aboveMin(data.byProductLine)}
            type={chartType}
            categorical
            colorOrder={productNames}
          />
          <div className="lg:col-span-2">
            <SalesChart
              id="countries"
              title={isPie ? "Sales share by country" : "Top countries"}
              data={aboveMin(countries)}
              type={chartType}
              categorical
              colorOrder={data.byCountry.slice(0, PIE_COUNTRIES).map((d) => d.name)}
            />
          </div>
        </>
      )}
    </DashboardTemplate>
  );
}

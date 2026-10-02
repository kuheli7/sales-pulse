import type { ReactNode } from "react";

interface Props {
  header: ReactNode;
  kpis: ReactNode;
  insights: ReactNode;
  children: ReactNode;
}

export function DashboardTemplate({ header, kpis, insights, children }: Props) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      {header}
      {kpis}
      {insights}
      <div className="grid gap-6 lg:grid-cols-2">{children}</div>
      <footer className="pt-2 text-center text-xs text-muted">
        Data: Kaggle &ldquo;Sample Sales Data&rdquo; (kyanyoga), order dates shifted +19 years to 2022-2024.
      </footer>
    </main>
  );
}

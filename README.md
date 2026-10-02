# Sales Dashboard

A sales dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4** and **Recharts**, structured with **Atomic Design**. It shows sales for **2022, 2023 and 2024** from a Kaggle dataset.

## What I did

- Scaffolded a Next.js 15 (App Router) project with TypeScript, Tailwind and ESLint.
- Downloaded the Kaggle dataset [Sample Sales Data](https://www.kaggle.com/datasets/kyanyoga/sample-sales-data) (`data/sales_data_sample.csv`, 2,823 order lines).
- Wrote `scripts/build-data.mjs`, which cleans the CSV into `src/data/sales.json`.
  The original order dates are 2003-2005, so they are **shifted forward by 19 years** to produce 2022-2024. Only the dates are changed; all other values are the original data.
- Built an API route, `GET /api/sales?year=2022|2023|2024`, that aggregates the data (totals, monthly, by product line, by country). The dashboard fetches from this API rather than using hardcoded mock data.
- Built an (initially empty) `/dashboard` page, then added the components inside it.

### Enhancements implemented

| Enhancement | Where |
| --- | --- |
| Custom filter input: set your own sales threshold; chart points below it are hidden | `ThresholdInput` molecule, applied in `DashboardClient` |
| API integration: data is fetched from `/api/sales` | `src/app/api/sales/route.ts` |
| Multiple chart types: switch between bar, line and pie (Recharts) | `ChartTypeToggle` molecule, `SalesChart` organism |

### Design

The look is a custom dark "fintech" theme rather than a stock template:

- **Per-year accent colour**: 2022 is blue, 2023 is green and 2024 is orange. Switching year recolours the title, buttons, charts and the glow behind the page.
- **Dark and light themes** with a toggle (the choice is saved in `localStorage`). Colours are CSS variables defined in `src/app/globals.css`.
- **Custom chart palette**: an 8-colour categorical palette in a fixed order, checked for colour-blind separation and contrast in both themes. Slices keep their colour when you change the threshold filter.
- **Chart styling**: rounded bars, a gradient area for the line chart, and a donut (with the total in the middle and a legend showing each share) in place of a plain pie. Monthly data is grouped into quarters in donut mode.
- **KPI cards** count up when the data changes and show the change against the previous year, compared like for like (for a partial year, only the same months are compared).
- **Highlights strip** (best month, top product line, top country), the Space Grotesk font, and a small logo.

### Atomic structure

```
src/components
├── atoms/       Button, Card, Input, Spinner, Logo
├── molecules/   StatCard, YearSelector, ChartTypeToggle, ThresholdInput, ThemeToggle, ChartLegend
├── organisms/   DashboardHeader, KpiRow, InsightStrip, SalesChart
└── templates/   DashboardTemplate (page layout; the page supplies the data)
src/app/dashboard   page (the dashboard page)
src/hooks           useCountUp
```

Other folders: `src/lib` (aggregation and formatting), `src/types`, `src/data` (generated JSON), `data/` (raw Kaggle CSV).

## Setup

Requires Node.js 18.18+ (tested on Node 22).

```bash
git clone <this-repo-url>
cd sales-dashboard
npm install
npm run dev          # http://localhost:3000 (redirects to /dashboard)
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint
node scripts/build-data.mjs   # regenerate src/data/sales.json from the CSV
```

## Notes

- The source dataset ends in May of its last year, so **2024 only has data for Jan-May** and its totals are lower than 2022 and 2023.
- The dataset is a public Kaggle sample from Classic Models; the remapped years are for demonstration only.

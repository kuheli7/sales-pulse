export type Year = 2022 | 2023 | 2024;
export type ChartType = "bar" | "line" | "pie";

export interface Order {
  orderNumber: number;
  year: number;
  month: number;
  day: number;
  sales: number;
  quantity: number;
  productLine: string;
  country: string;
  dealSize: string;
  status: string;
}

export interface DataPoint {
  name: string;
  value: number;
}

/** Percent change vs the previous year, like-for-like on the months present this year. */
export interface Comparison {
  year: number;
  label: string;
  sales: number | null;
  orders: number | null;
  units: number | null;
  averageOrderValue: number | null;
}

export interface SalesSummary {
  year: Year;
  totalSales: number;
  orderCount: number;
  unitsSold: number;
  averageOrderValue: number;
  /** only months that have data */
  monthly: DataPoint[];
  byProductLine: DataPoint[];
  byCountry: DataPoint[];
  coverage: { label: string; partial: boolean };
  comparison: Comparison | null;
}

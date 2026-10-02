import { NextResponse } from "next/server";
import { getSalesSummary, isYear, YEARS } from "@/lib/sales";

// GET /api/sales?year=2024 -> aggregated sales for that year
export function GET(request: Request) {
  const year = Number(new URL(request.url).searchParams.get("year") ?? YEARS[YEARS.length - 1]);
  if (!isYear(year)) {
    return NextResponse.json({ error: `year must be one of ${YEARS.join(", ")}` }, { status: 400 });
  }
  return NextResponse.json(getSalesSummary(year));
}

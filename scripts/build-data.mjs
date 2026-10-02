// Converts the Kaggle "Sample Sales Data" CSV into a slim JSON used by the API route.
// Order dates (2003-2005) are shifted +19 years so they land on 2022-2024.
import { readFileSync, writeFileSync } from "node:fs";

const YEAR_SHIFT = 19;

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const [header, ...rows] = parseCsv(readFileSync("data/sales_data_sample.csv", "latin1"));
const idx = Object.fromEntries(header.map((h, i) => [h, i]));

const orders = rows
  .filter((r) => r.length === header.length)
  .map((r) => {
    const [m, d, y] = r[idx.ORDERDATE].split(" ")[0].split("/").map(Number);
    return {
      orderNumber: Number(r[idx.ORDERNUMBER]),
      year: y + YEAR_SHIFT,
      month: m,
      day: d,
      sales: Math.round(Number(r[idx.SALES]) * 100) / 100,
      quantity: Number(r[idx.QUANTITYORDERED]),
      productLine: r[idx.PRODUCTLINE],
      country: r[idx.COUNTRY],
      dealSize: r[idx.DEALSIZE],
      status: r[idx.STATUS],
    };
  });

writeFileSync("src/data/sales.json", JSON.stringify(orders));
const years = [...new Set(orders.map((o) => o.year))].sort();
console.log(`Wrote ${orders.length} orders for years ${years.join(", ")}`);

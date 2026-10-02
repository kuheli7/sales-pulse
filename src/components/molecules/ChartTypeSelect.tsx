import { Select } from "@/components/atoms/Select";
import type { ChartType } from "@/types/sales";

const TYPES: { type: ChartType; label: string }[] = [
  { type: "bar", label: "Bar" },
  { type: "line", label: "Line" },
  { type: "pie", label: "Donut" },
];

export function ChartTypeSelect({ value, onChange }: { value: ChartType; onChange: (t: ChartType) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-2">
      Plot
      <Select
        value={value}
        onChange={(e) => {
          const next = TYPES.find((t) => t.type === e.target.value);
          if (next) onChange(next.type);
        }}
      >
        {TYPES.map((t) => (
          <option key={t.type} value={t.type}>
            {t.label}
          </option>
        ))}
      </Select>
    </label>
  );
}

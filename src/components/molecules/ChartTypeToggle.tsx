import { Button } from "@/components/atoms/Button";
import type { ChartType } from "@/types/sales";

const TYPES: { type: ChartType; label: string }[] = [
  { type: "bar", label: "Bar" },
  { type: "line", label: "Line" },
  { type: "pie", label: "Donut" },
];

export function ChartTypeToggle({ value, onChange }: { value: ChartType; onChange: (t: ChartType) => void }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Chart type">
      {TYPES.map((t) => (
        <Button key={t.type} active={t.type === value} onClick={() => onChange(t.type)}>
          {t.label}
        </Button>
      ))}
    </div>
  );
}

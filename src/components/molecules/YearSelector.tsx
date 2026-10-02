import { Button } from "@/components/atoms/Button";
import { YEARS } from "@/lib/sales";
import type { Year } from "@/types/sales";

export function YearSelector({ value, onChange }: { value: Year; onChange: (y: Year) => void }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Select year">
      {YEARS.map((y) => (
        <Button key={y} active={y === value} onClick={() => onChange(y)}>
          {y}
        </Button>
      ))}
    </div>
  );
}

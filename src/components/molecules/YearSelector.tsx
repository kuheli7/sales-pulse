import { Select } from "@/components/atoms/Select";
import { YEARS } from "@/lib/sales";
import type { Year } from "@/types/sales";

export function YearSelector({ value, onChange }: { value: Year; onChange: (y: Year) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-2">
      Year
      <Select
        value={value}
        onChange={(e) => {
          const year = YEARS.find((y) => String(y) === e.target.value);
          if (year) onChange(year);
        }}
      >
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>
    </label>
  );
}

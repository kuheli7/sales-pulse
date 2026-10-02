import { Input } from "@/components/atoms/Input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function ThresholdInput({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-2">
      Min sales ($)
      <Input
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="e.g. 100000"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

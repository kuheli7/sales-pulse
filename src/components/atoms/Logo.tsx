/** Three rising bars: the brand mark. Takes the current year's accent colour. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect x="3" y="15" width="6" height="10" rx="2" className="fill-accent opacity-50" />
      <rect x="11" y="9" width="6" height="16" rx="2" className="fill-accent opacity-75" />
      <rect x="19" y="3" width="6" height="22" rx="2" className="fill-accent" />
    </svg>
  );
}

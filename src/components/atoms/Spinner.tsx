export function Spinner() {
  return (
    <div role="status" aria-label="Loading" className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-line border-t-accent" />
    </div>
  );
}

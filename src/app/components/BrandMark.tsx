export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="27" cy="30" r="15.5" fill="none" stroke="currentColor" strokeWidth="8.5" />
      <path d="M44,15 L44,45" fill="none" stroke="currentColor" strokeWidth="8.5" />
      <rect x="8" y="47.5" width="48" height="7" rx="3.5" style={{ fill: "var(--rose-ink)" }} />
    </svg>
  );
}

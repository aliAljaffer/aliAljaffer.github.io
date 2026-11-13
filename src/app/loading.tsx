export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex space-x-2" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bounce-dot bg-dot-1"></div>
        <div className="w-3 h-3 rounded-full bounce-dot bg-dot-2"></div>
        <div className="w-3 h-3 rounded-full bounce-dot bg-dot-3"></div>
      </div>
    </div>
  );
}

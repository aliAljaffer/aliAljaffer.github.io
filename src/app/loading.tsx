export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bounce-dot bg-neutral-900 dark:bg-neutral-200"></div>
        <div className="w-3 h-3 rounded-full bounce-dot bg-neutral-700 dark:bg-neutral-400"></div>
        <div className="w-3 h-3 rounded-full bounce-dot bg-neutral-500 dark:bg-neutral-600"></div>
      </div>
    </div>
  );
}

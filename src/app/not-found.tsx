import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function NotFound({ message }: { message?: string }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 font-mono flex flex-col">
      <ThemeToggle
        className="fixed top-0 right-0 z-50 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 pb-3 px-4"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      />
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500">
          404
        </p>
        <p className="text-sm">Page not found.</p>
        {message && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{message}</p>
        )}
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.15em] font-bold hover:underline mt-2"
        >
          ← Portfolio
        </Link>
      </div>
    </div>
  );
}

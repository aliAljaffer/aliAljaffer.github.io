import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={`min-h-screen flex flex-col bg-terminal-bg text-terminal-text font-mono leading-4 ${className}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-6 focus:z-[60] focus:bg-neutral-950 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>
      {children}
    </div>
  );
}

import type React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div
      className={`min-h-screen bg-terminal-bg text-terminal-text font-mono leading-4 ${className}`}
    >
      {children}
    </div>
  );
}

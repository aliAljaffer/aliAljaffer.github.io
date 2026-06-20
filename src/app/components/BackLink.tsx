import type React from "react";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function BackLink({
  href,
  children,
  className = "",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`text-xs uppercase tracking-[0.15em] font-bold hover:underline ${className}`}
    >
      {children}
    </Link>
  );
}

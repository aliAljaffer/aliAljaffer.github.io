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
      className={`text-terminal-link hover:no-underline underline-offset-2 mb-8 inline-block underline ${className}`}
    >
      {children}
    </Link>
  );
}

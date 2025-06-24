import type React from "react";

interface StatusCommentProps {
  children: React.ReactNode;
  className?: string;
}

export default function StatusComment({
  children,
  className = "",
}: StatusCommentProps) {
  return (
    <span
      className={`text-terminal-comment before:content-['['] after:content-[']'] ${className}`}
    >
      &nbsp;
      {children}
      &nbsp;
    </span>
  );
}

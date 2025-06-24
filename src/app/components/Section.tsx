import type React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function Section({
  title,
  children,
  className = "",
  titleClassName = "",
}: SectionProps) {
  return (
    <section className={`xl:pr-4 mb-4 max-h-fit ${className}`}>
      <h1
        className={`text-terminal-accent mb-2 ml-6 sm:ml-4 w-fit relative font-normal text-xl sm:text-2xl ${titleClassName}`}
      >
        <span className="absolute -left-9 select-none">{"/*"}</span>
        <span className="absolute -right-9 select-none">{"*/"}</span>
        {title}
      </h1>
      {children}
    </section>
  );
}

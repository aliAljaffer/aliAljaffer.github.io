import type { SVGProps } from "react";

// fai logo mark. Strokes with `currentColor` so it inherits the surrounding
// text color in both themes.
type FaiIconProps = SVGProps<SVGSVGElement>;

export function FaiIcon({ className, ...props }: FaiIconProps) {
  return (
    <svg
      viewBox="55 61 126 164"
      fill="none"
      stroke="currentColor"
      strokeWidth={30}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="fai"
      className={className}
      {...props}
    >
      <path d="M158 76 H130 A28 28 0 0 0 102 104 V210" />
      <path d="M70 136 H166" />
    </svg>
  );
}

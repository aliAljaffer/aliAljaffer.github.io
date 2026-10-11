"use client";

import type { SVGProps } from "react";
import { useEffect, useRef } from "react";

type HelmIconProps = SVGProps<SVGSVGElement>;

export function HelmIcon({ className, ...props }: HelmIconProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateFilter = () => {
      if (imgRef.current) {
        const isDark = document.documentElement.classList.contains("dark");
        // In light mode: darken the icon to match text color (neutral-950)
        // In dark mode: lighten the icon to match text color (neutral-50)
        imgRef.current.style.filter = isDark
          ? "grayscale(1) brightness(2) invert(0.1)"
          : "grayscale(1) brightness(0.3)";
      }
    };

    updateFilter();

    // Listen for theme changes
    const observer = new MutationObserver(updateFilter);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src="https://www.redhat.com/rhdc/managed-files/helm.svg"
      alt="Helm"
      className={className}
      {...(props as any)}
      style={{
        width: "1em",
        height: "1em",
        display: "inline-block",
        opacity: 0.95,
        ...props.style,
      }}
    />
  );
}

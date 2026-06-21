import type { SVGProps } from "react";

// AZM logo mark. Fills with `currentColor`, so it inherits the surrounding
// text color and works in both light and dark themes. The viewBox is cropped
// tightly around the artwork to remove the original surrounding whitespace.
type AzmIconProps = SVGProps<SVGSVGElement>;

export function AzmIcon({ className, ...props }: AzmIconProps) {
  return (
    <svg
      viewBox="180 105 261 390"
      fill="currentColor"
      role="img"
      aria-label="AZM"
      className={className}
      {...props}
    >
      <g transform="translate(0,600) scale(0.1,-0.1)">
        <path d="M3455 4916 c-92 -29 -160 -88 -197 -172 l-19 -44 -257 0 c-284 0 -366 -9 -430 -46 -48 -28 -96 -88 -114 -143 -8 -25 -12 -133 -13 -341 l-1 -305 -299 -5 -300 -5 -3 -1017 -2 -1018 29 0 c50 0 154 38 194 70 20 18 49 53 65 78 27 47 27 49 34 287 9 365 9 1052 -2 1124 -10 74 -31 101 -96 128 -24 10 -44 21 -44 26 0 4 288 7 641 7 424 0 655 4 683 11 60 15 134 75 168 136 45 80 51 191 43 761 -8 538 -1 493 -80 468z m-245 -791 l0 -265 -240 0 -240 0 0 206 c0 231 -6 257 -66 295 -19 11 -34 23 -34 25 0 2 131 4 290 4 l290 0 0 -265z M3433 3213 l-323 -3 -2 -533 -3 -532 -157 -3 -158 -3 0 226 0 225 -77 0 c-95 0 -142 -12 -184 -47 -66 -56 -64 -27 -67 -777 -2 -431 1 -683 7 -689 6 -6 34 -2 79 12 132 40 211 144 232 303 5 40 10 153 10 251 l0 177 800 0 800 0 0 113 c0 95 -3 117 -20 145 -37 61 -44 62 -515 62 l-425 0 0 311 c0 356 -1 361 -79 410 l-45 29 277 0 277 0 0 -130 c0 -124 1 -132 24 -155 29 -29 80 -37 201 -33 l90 3 -1 200 c-1 224 -6 250 -63 323 -54 68 -121 101 -228 112 -49 6 -97 9 -108 7 -11 -1 -165 -3 -342 -4z M2467 3204 c-12 -12 -8 -304 4 -304 6 0 20 6 32 13 13 7 75 14 152 17 l130 5 0 135 0 135 -156 3 c-85 1 -158 -1 -162 -4z" />
      </g>
    </svg>
  );
}

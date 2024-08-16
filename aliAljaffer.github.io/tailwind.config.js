/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: "Cutive Mono" },
      height: { screen: "100dvh" },
    },
    colors: {
      c1: "#0d1b2a",
      c2: "#1b263b",
      c3: "#415a77",
      c4: "#778da9",
      c5: "#e0e1dd",
    },
  },
  plugins: [],
};

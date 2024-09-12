/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: "Ubuntu Mono" },
      height: { screen: "100dvh" },
      minHeight: {
        screen: "100dvh",
      },
      maxHeight: {
        screen: "100dvh",
      },
      colors: {
        c1: "#0d1b2a",
        c2: "#1b263b",
        c3: "#415a77",
        c4: "#778da9",
        c5: "#e0e1dd",
      },
      boxShadow: {
        cool: "box-shadow: -10px -10px 15px rgba(255,255,255,0.5), 10px 10px 15px rgba(70,70,70,0.12)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

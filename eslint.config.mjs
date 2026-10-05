import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: [".next/**", "dist/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;

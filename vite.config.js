import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/

export default defineConfig({
  root: "./",
  build: {
    outDir: "./docs",
    emptyOutDir: true,
  },
  plugins: [react(), eslint()],
});

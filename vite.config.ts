import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
const projectRoot = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  root: fileURLToPath(new URL("./web", import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: { "/src": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  base: "/no-swipe-club/",
  build: {
    outDir: fileURLToPath(new URL("./dist", import.meta.url)),
    emptyOutDir: true,
  },
  test: {
    root: projectRoot,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});

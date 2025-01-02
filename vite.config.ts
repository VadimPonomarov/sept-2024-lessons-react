import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvCompatible from "vite-plugin-env-compatible";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

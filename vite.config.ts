import * as path from "path";

import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import dynamicImport from "vite-plugin-dynamic-import";

// Загрузка переменных окружения из файла .env
dotenv.config();

export default defineConfig({
  esbuild: {
    target: "esnext",
  },
  plugins: [
    react(),
    babel({
      babelConfig: { presets: ["@babel/preset-react", "@babel/preset-env"] },
    }),
    dynamicImport(),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  build: {
    rollupOptions: { output: { manualChunks: { "react-dom": ["react-dom"] } } },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
});

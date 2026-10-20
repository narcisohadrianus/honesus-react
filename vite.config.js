import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" gera caminhos relativos: a pasta dist/ funciona em qualquer alojamento ou subpasta.
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { port: 5173, open: true },
});

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true, // Expose to all network interfaces
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
        secure: false,
        // Rewrite path if needed
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});

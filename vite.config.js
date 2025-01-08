import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "/chill-around-project-REACT/",
  plugins: [react()],
  server: {
    open: true, // 自動開啟瀏覽器
  },
});

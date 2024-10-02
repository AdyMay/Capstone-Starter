import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = process.env.PORT || 5432;
console.log(`api need to run on ${serverPort} for vite server`);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${serverPort || 5432}`,
    },
  },
});

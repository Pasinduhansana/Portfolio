import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

const copyRedirects = () => {
  return {
    name: "copy-redirects",
    closeBundle() {
      // Check if public/_redirects exists
      if (fs.existsSync("public/_redirects")) {
        // Make sure dist directory exists
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }
        // Copy _redirects file to dist
        fs.copyFileSync("public/_redirects", "dist/_redirects");
      }
    },
  };
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyRedirects()],
});

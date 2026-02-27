import { copyFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "tsup";

const srcCssPath = fileURLToPath(new URL("./src/styles.css", import.meta.url));
const distCssPath = fileURLToPath(new URL("./dist/styles.css", import.meta.url));

export default defineConfig({
  entry: ["src/index.ts", "src/tailwind-preset.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess() {
    mkdirSync(dirname(distCssPath), { recursive: true });
    copyFileSync(srcCssPath, distCssPath);
  },
});

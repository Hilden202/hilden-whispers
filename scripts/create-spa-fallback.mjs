import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const outDir = "dist";
const indexFile = join(outDir, "index.html");
const fallbackFile = join(outDir, "404.html");

if (!existsSync(indexFile)) {
  throw new Error(`Cannot create SPA fallback because ${indexFile} does not exist.`);
}

copyFileSync(indexFile, fallbackFile);
console.log(`Created ${fallbackFile} for GitHub Pages route refreshes.`);

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "lib/client/schemas/acteCreate.runtime.ts");

if (!fs.existsSync(filePath)) {
  console.log("⚠️ acte-runtime.ts not found — generating...");
  execSync("npm run generate:acte", { stdio: "inherit" });
} else {
  console.log("✔ acte-runtime.ts already exists.");
}
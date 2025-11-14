const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const filePath = path.resolve("lib/client/schemas/acteCreate.runtime.ts");

if (!fs.existsSync(filePath)) {
  console.log("⚠️ acte-runtime.ts not found — generating...");
  execSync("npm run generate:acte", { stdio: "inherit" });
} else {
  console.log("✔ acte-runtime.ts already exists.");
}

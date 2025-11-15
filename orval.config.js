// orval.config.js
const fs = require("fs");
const path = require("path");

const ENDPOINTS_DIR = "lib/client/endpoints";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Creates or updates index.ts for a single folder
function generateLocalIndex(folderPath) {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");

  if (files.length === 0) return;

  const tag = path.basename(folderPath);
  const content = files
    .map((f) => `export * from "./${path.basename(f, ".ts")}";`)
    .join("\n");

  fs.writeFileSync(path.join(folderPath, "index.ts"), `// Barrel for ${tag} endpoints\n${content}\n`);
  console.log(`✅ Updated index.ts for tag: ${tag}`);
}

// Creates global index.ts that aggregates all tag folders
function createGlobalIndex() {
  ensureDir(ENDPOINTS_DIR);

  const folders = fs
    .readdirSync(ENDPOINTS_DIR)
    .filter((name) =>
      fs.statSync(path.join(ENDPOINTS_DIR, name)).isDirectory()
    );

  // Generate local index.ts for each tag folder
  folders.forEach((folder) => {
    const folderPath = path.join(ENDPOINTS_DIR, folder);
    generateLocalIndex(folderPath);
  });

  // Create global index.ts
  const content = folders.map((f) => `export * from "./${f}";`).join("\n");
  fs.writeFileSync(path.join(ENDPOINTS_DIR, "index.ts"), content + "\n");
  console.log(`✅ Generated global endpoints index.ts`);
}

module.exports = {
  aeroRh: {
    input: "http://127.0.0.1:9721/openapi.json",
    output: {
      mode: "tags-split",
      target: ENDPOINTS_DIR, // must be string in v7
      schemas: "lib/client/schemas",
      client: "axios",
      clean: true,
      prettier: true,
      override: {
        useDates: true,
        mutator: {
          path: "./lib/client/axiosInstance.ts",
          name: "customAxios",
        },
        transformers: {
          dates: ["date", "date-time"],
        },
        // Remove afterWrite: fixGeneratedFile because it wasn’t reliably called
      },
    },
    hooks: {
      afterAllFilesWrite: createGlobalIndex, // now runs both local and global indexes
    },
  },
};
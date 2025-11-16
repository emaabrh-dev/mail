// orval.config.js
const fs = require("fs");
const path = require("path");

const ENDPOINTS_DIR = "lib/client/endpoints";

// Helper to ensure folder exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Create/update index.ts for a single folder
function generateLocalIndex(folderPath) {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");

  if (!files.length) return;

  const tag = path.basename(folderPath);
  const content = files
    .map((f) => `export * from "./${path.basename(f, ".ts")}";`)
    .join("\n");

  fs.writeFileSync(
    path.join(folderPath, "index.ts"),
    `// Barrel for ${tag} endpoints\n${content}\n`
  );
  console.log(`✅ Updated index.ts for tag: ${tag}`);
}

// Create global index.ts
function createGlobalIndex() {
  ensureDir(ENDPOINTS_DIR);

  const folders = fs
    .readdirSync(ENDPOINTS_DIR)
    .filter((name) =>
      fs.statSync(path.join(ENDPOINTS_DIR, name)).isDirectory()
    );

  folders.forEach((folder) => {
    generateLocalIndex(path.join(ENDPOINTS_DIR, folder));
  });

  const content = folders.map((f) => `export * from "./${f}";`).join("\n");
  fs.writeFileSync(path.join(ENDPOINTS_DIR, "index.ts"), content + "\n");
  console.log(`✅ Generated global endpoints index.ts`);
}

/** @type {import('@orval/core').OrvalConfig} */
module.exports = {
  aeroRh: {
    input: "http://127.0.0.1:9721/openapi.json",
    output: {
      mode: "tags-split",
      target: ENDPOINTS_DIR,
      schemas: "lib/client/schemas",
      client: "axios",
      clean: true,
      prettier: true,
      baseUrl: "/api/v2", 
      override: {
        useDates: true,
        mutator: {
          path: "./lib/client/axiosInstance.ts",
          name: "customAxios",
        },      
        requestOptions: (request) => {
          console.log("requestOptions called:", request.url);
          return request;
        },
        transformers: {
          dates: ["date", "date-time"], // automatically converts date-time fields
        },
        transformer: './lib/client/transformer.ts', 
      },
    },
    hooks: {
      afterAllFilesWrite: createGlobalIndex, // generate local + global indexes
    },
  },
};
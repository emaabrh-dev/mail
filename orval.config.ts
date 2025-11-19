// orval.config.ts
import fs from "fs";
import path from "path";
import { Project, Type } from "ts-morph"
import { defineConfig, type Options } from 'orval';

const ENDPOINTS_DIR = "lib/client/endpoints";

// Ensure folder exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Create/update index.ts inside each tag folder
function generateLocalIndex(folderPath: string) {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");

  if (!files.length) {
    console.log(`ℹ️ No files to export in ${folderPath}, skipping`);
    return;
  }

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

// Generate global index.ts
function createGlobalIndex() {
  ensureDir(ENDPOINTS_DIR);

  const folders = fs
    .readdirSync(ENDPOINTS_DIR)
    .filter((name) =>
      fs.statSync(path.join(ENDPOINTS_DIR, name)).isDirectory()
    );

  folders.forEach((folder) =>
    generateLocalIndex(path.join(ENDPOINTS_DIR, folder))
  );

  const content = folders.map((f) => `export * from "./${f}";`).join("\n");
  fs.writeFileSync(path.join(ENDPOINTS_DIR, "index.ts"), content + "\n");

  console.log("✅ Generated global endpoints index.ts");
}

/**
 * Generates acteCreate.runtime.ts dynamically
 */
function generateActeRuntime() {
  const runtimePath = path.resolve("lib/client/schemas/acteCreate.runtime.ts");

  if (fs.existsSync(runtimePath)) {
    console.log("✔ acteCreate.runtime.ts already exists, skipping generation.");
    return;
  }

  console.log("⚠️ acteCreate.runtime.ts not found — generating...");

  const sourceSchemaPath = path.resolve("lib/client/schemas/acteCreate.ts");

  if (!fs.existsSync(sourceSchemaPath)) {
    console.warn("❌ acteCreate.ts not found, aborting.");
    return;
  }

  const project = new Project({ tsConfigFilePath: "tsconfig.json" });
  const sourceFile = project.addSourceFileAtPath(sourceSchemaPath);
  const iface = sourceFile.getInterfaceOrThrow("ActeCreate");

  function resolveType(type: Type): string {
    if (type.isUnion()) {
      // Filter out "never" types (optional)
      const members = type.getUnionTypes().filter(t => !t.isNever());
      // Recursively resolve each member
      return members.map(resolveType).join(" | ");
    }

    if (type.isIntersection()) {
      return type.getIntersectionTypes().map(resolveType).join(" & ");
    }

    const aliasSymbol = type.getAliasSymbol();
    if (aliasSymbol) {
      const decl = aliasSymbol.getDeclarations()[0];
      const declType = decl.getType();
      return resolveType(declType);
    }

    if (type.isArray()) {
      const elemType = type.getArrayElementTypeOrThrow();
      return `${resolveType(elemType)}[]`;
    }

    // For literal types, enums, or primitives
    return type.isUnknown() ? "unknown" : type.getText();
  }

  function getTypeName(type: Type): string {
    // Imported type alias or interface
    const alias = type.getAliasSymbol();
    if (alias) return alias.getName();

    // Local interface / type declared in same file
    const symbol = type.getSymbol();
    if (symbol) return symbol.getName();

    // Fallback to primitive
    return type.getText().replace(/^import\(.+\)\./, "");
  }

  const properties = iface.getProperties().map((prop) => {
    return {
      key: prop.getName(),
      type: getTypeName(prop.getType()),
    }
  });

  const output = `// AUTO-GENERATED — DO NOT EDIT
export const acteCreateFields = [
${properties.map((p) => `  { key: "${p.key}", type: "${p.type}" },`).join("\n")}
] as const;
`;

  fs.writeFileSync(runtimePath, output);
  console.log("✅ acteCreate.runtime.ts successfully generated!");
}

// --------------------------------------------------------------
// 🟦 ORVAL CONFIG
// --------------------------------------------------------------
const config = defineConfig({
  aeroRh: {
    input: {
      target: "http://127.0.0.1:9721/openapi.json",
      override: {
        transformer: (schema: any) => {
          console.log("🔄 Input transformer called");

          // Remove "/api" prefix
          const transformedPaths: Record<string, any> = {};
          Object.entries(schema.paths || {}).forEach(([route, value]) => {
            transformedPaths[route.replace(/^\/api/, "")] = value;
          });

          return { ...schema, paths: transformedPaths };
        },
      },
    },
    output: {
      mode: "tags-split",
      target: ENDPOINTS_DIR,
      schemas: "lib/client/schemas",
      client: "axios",
      clean: true,
      prettier: true,
      baseUrl: "/api/v1",
      indexFiles: true,
      override: {
        transformer: (operation) => {
          // operation.response.definition → TS type as string
          if (!operation.response.imports) {
            operation.response.imports = [];
          }

          // Make sure FourDigitNumber is imported in all generated files
          operation.response.imports.push({ name: "FourDigitNumber" });

          if (operation.verb === "post") {
            // operation.response.types → array of imported types or inline definitions
            //console.log("Types:", operation.response.types.success[0].originalSchema?.properties);
          }
          return operation;
        },
        useDates: true,
        mutator: {
          path: "./lib/client/axiosInstance.ts",
          name: "customAxios",
        },
      },
    },

    hooks: {
      afterAllFilesWrite: () => {
        createGlobalIndex();
        generateActeRuntime();
      },
    },
  },
});

export default config;
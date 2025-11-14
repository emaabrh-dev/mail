import { Project, Type, ts } from "ts-morph";
import fs, { writeFileSync } from "fs";
import path from "path";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const ph = path.resolve("lib/client/schemas/acteCreate.ts")

if (!fs.existsSync(ph)) {
  console.warn('Schema file not found, skipping...');
}else {
  const sourceFile = project.addSourceFileAtPath(ph);
  const iface = sourceFile.getInterfaceOrThrow("ActeCreate");

  // Recursively resolve type aliases
  function resolveType(type: Type): string {
    // Handle union, intersection, or literal types
    if (type.isUnion()) {
      return type.getUnionTypes().map(resolveType).join(" | ");
    }
    if (type.isIntersection()) {
      return type.getIntersectionTypes().map(resolveType).join(" & ");
    }

    // Resolve type alias
    const aliasSymbol = type.getAliasSymbol();
    if (aliasSymbol) {
      const decl = aliasSymbol.getDeclarations()[0];
      const declType = decl.getType();
      return resolveType(declType);
    }

    // Resolve array types
    if (type.isArray()) {
      const elemType = type.getArrayElementTypeOrThrow();
      return `${resolveType(elemType)}[]`;
    }

    // Otherwise, return primitive name
    return type.getText();
  }

  const properties = iface.getProperties().map((p) => ({
    key: p.getName(),
    type: resolveType(p.getType()),
  }));

  const outputPath = path.resolve("lib/client/schemas/acteCreate.runtime.ts");
  writeFileSync(
    outputPath,
    `// AUTO-GENERATED — DO NOT EDIT
  export const acteCreateFields = [
  ${properties.map((p) => `  { key: "${p.key}", type: "${p.type}" },`).join("\n")}
  ] as const;
  `
  );

  console.log("✅ acteCreate.runtime.ts generated with fully resolved types!");
}

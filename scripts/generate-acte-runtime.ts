// scripts/generate-acte-runtime.ts
import { Project } from "ts-morph";
import { writeFileSync } from "fs";
import path from "path";

// Path to your interface file
const inputPath = path.resolve("lib/client/schemas/acteCreate.ts");

// Output runtime file
const outputPath = path.resolve("lib/client/schemas/acteCreate.runtime.ts");

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

// Load the interface file
const sourceFile = project.addSourceFileAtPath(inputPath);

// Get the interface
const iface = sourceFile.getInterfaceOrThrow("ActeCreate");

// Extract properties
const properties = iface.getProperties().map((p) => p.getName());

// Generate output file content
const output = `
// AUTO-GENERATED — DO NOT EDIT
// Generated using ts-morph

import type { ActeCreate } from "./acteCreate";

export const acteCreateKeys = [
${properties.map((p) => `  "${p}",`).join("\n")}
] as const satisfies readonly (keyof ActeCreate)[];
`;

writeFileSync(outputPath, output);

console.log("acteCreate.runtime.ts generated successfully!");

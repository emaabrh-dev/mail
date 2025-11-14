import { register } from "node:module";
import { pathToFileURL } from "node:url";

// register ts-node loader
register("ts-node/esm", pathToFileURL("./"));

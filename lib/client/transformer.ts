import path from "path";

/**
 * Transformer for Orval to prepend /api/v1 to paths
 */
export default (inputSchema: any) => {
  const path = inputSchema.route.startsWith("/api/") ? inputSchema.route.replace(/^\/api\//, "/api/v1/") : inputSchema.route.startsWith("/") ? inputSchema.route.replace(/^\//, "/api/v2/") : inputSchema.route;
  
  return {
    ...inputSchema,
    route: path,
    pathRoute: path // fallback to empty object if paths is missing   
  }
};
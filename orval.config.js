module.exports = {
  aeroRh: {
    input: "http://localhost:9721/openapi.json",
    output: {
      target: "lib/client/endpoints",
      schemas: "lib/client/schemas",
      client: "axios",
      mode: "tags",     // ✅ IMPORTANT → splits by tags
      clean: true,
      prettier: true,
    },
  },
};

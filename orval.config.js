// orval.config.js
module.exports = {
  aeroRh: {
    input: "http://127.0.0.1:9721/openapi.json", // updated to 127.0.0.1
    output: {
      target: "lib/client/endpoints",
      schemas: "lib/client/schemas",
      client: "axios",
      mode: "tags",     // splits by tags
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./lib/client/axiosInstance.ts", // path to your custom Axios
          name: "customAxios",                  // export name of the instance
        },
      },
    },
  },
};
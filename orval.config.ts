import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "split",
      target: "app/api/endpoints/petstoreFromFileSpecWithTransformer.ts",
      schemas: "app/api/model",
      client: "react-query",
      biome: true,
      override: {
        mutator: {
          path: "./app/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        operations: {
          listPets: {
            query: {
              useQuery: true,
              useSuspenseQuery: true,
              useSuspenseInfiniteQuery: true,
              useInfinite: true,
              useInfiniteQueryParam: "limit",
            },
          },
        },
      },
    },
    input: {
      target: "./petstore.yaml",
    },
  },
});

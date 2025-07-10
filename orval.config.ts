import { env } from "node:process";
import { config } from "dotenv";
import { defineConfig } from "orval";

config();

const target = env.SWAGGER_END_POINT as string;

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
      target,
    },
  },
});

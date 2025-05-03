import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { type UserConfig, defineConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import type { ViteUserConfig as VitestUserConfig } from "vitest/config";

const vitestConfig: VitestUserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/test/setup.ts",
  },
};

export default defineConfig(
  mergeConfig(vitestConfig, {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  } satisfies UserConfig),
);

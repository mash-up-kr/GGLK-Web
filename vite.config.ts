import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { type UserConfig, defineConfig, loadEnv, mergeConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import type { ViteUserConfig as VitestUserConfig } from "vitest/config";

const vitestConfig: VitestUserConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/test/setup.ts",
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return mergeConfig(vitestConfig, {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/api/, ""),
          changeOrigin: true,
        },
      },
    },
  } satisfies UserConfig);
});

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      host: "127.0.0.1",
    },

    plugins: [
      createHtmlPlugin({
        template: "public/index.html",
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),

      visualizer({
        filename: "dist/stats.html",
      }),

      {
        name: "vitest-plugin-beforeall",
        config: () => ({
          test: { setupFiles: ["./tests/unit/beforeall.ts"] },
        }),
      },

      vue(),
      vuetify(),
    ],
    base:
      mode === "production" ? env.VITE_PROD_BASE_URL : env.VITE_DEV_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    test: {
      globals: true,
      environment: "happy-dom",
      deps: {
        inline: ["vuetify"],
      },
    },
  };
});

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
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
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
      }),
    ],
    base: mode === "production" ? "/showcase3-demo/" : "/",
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

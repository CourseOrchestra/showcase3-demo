import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { resolve } from "path";
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

      vue(),
      vuetify(),
      vueI18n({
        include: resolve(__dirname, "./src/locales/**"),
      }),
    ],
    base:
      mode === "production" ? env.VITE_PROD_BASE_URL : env.VITE_DEV_BASE_URL,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    test: {
      setupFiles: ["./tests/unit/beforeall.ts"],
      globals: true,
      environment: "happy-dom",
      deps: {
        inline: ["vuetify"],
      },
    },
  };
});

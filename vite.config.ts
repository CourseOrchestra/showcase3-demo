import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vueDevTools(),

      createHtmlPlugin({
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
      //  tag::vuei18n[]
      vueI18n({
        include: fileURLToPath(new URL("./src/locales/**", import.meta.url)),
      }),
      //    end::vuei18n[]
    ],
    base:
      mode === "production" ? env.VITE_PROD_BASE_URL : env.VITE_DEV_BASE_URL,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    test: {
      setupFiles: ["./tests/unit/beforeall.ts"],
      globals: true,
      environment: "happy-dom",
      server: {
        deps: {
          inline: ["vuetify"],
        },
      },
    },
  };
});

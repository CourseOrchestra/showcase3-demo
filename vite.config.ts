import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path");

const publicPath =
  process.env.NODE_ENV === "production" ? "/showcase3-demo/" : "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
  base: publicPath,
  define: {
    "process.env": {
      VUE_APP_TITLE: "Демо showcase3",
      BASE_URL: publicPath,
    },
  },
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

  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});

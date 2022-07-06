import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  //base: process.env.NODE_ENV === "production" ? "/showcase3-demo/" : "/",
  base: "/showcase3-demo/",
  define: {
    "process.env": {
      VUE_APP_TITLE: "Демо showcase3",
      BASE_URL: "/showcase3-demo/",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
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

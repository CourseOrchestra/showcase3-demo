import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import messages from "@intlify/vite-plugin-vue-i18n/messages";

loadFonts();

const i18n = createI18n({
  locale: import.meta.env.VITE_APP_I18N_LOCALE,
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE,
  messages,
});

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify) /*.use(showcase3)*/
  .component("EasyDataTable", Vue3EasyDataTable)
  .mount("#app");

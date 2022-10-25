import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import messages from "@intlify/vite-plugin-vue-i18n/messages";

loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(pinia);

import { useInternationalizationStore } from "@/stores/internationalization";
const internationalization = useInternationalizationStore();

const i18n = createI18n({
  locale: internationalization.locale,
  fallbackLocale: import.meta.env.VITE_APP_I18N_LOCALE,
  messages,
});

app
  .use(i18n)
  .use(router)
  .use(vuetify) /*.use(showcase3)*/
  .component("EasyDataTable", Vue3EasyDataTable)
  .mount("#app");

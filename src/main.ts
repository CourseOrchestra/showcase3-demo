import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { i18n } from "./plugins/i18n";

loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
  .use(pinia)
  .use(i18n)
  .use(router)
  .use(vuetify) /*.use(showcase3)*/
  .component("EasyDataTable", Vue3EasyDataTable);

import { useInternationalizationStore } from "@/stores/internationalization";
const internationalization = useInternationalizationStore();
i18n.global.locale.value = internationalization.locale;

app.mount("#app");

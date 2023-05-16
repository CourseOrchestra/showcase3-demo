import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
// tag::pinia[]
import { createPinia } from "pinia";
// end::pinia[]
// tag::persist[]
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// end::persist[]
import { i18n } from "./plugins/i18n";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import TreeTable from "primevue/treetable";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

loadFonts();

// tag::def_pinia[]
const pinia = createPinia();
// end::def_pinia[]
// tag::use_persist[]
pinia.use(piniaPluginPersistedstate);
// end::use_persist[]

// tag::def2_pinia[]
const app = createApp(App)
  .use(pinia)
  // end::def2_pinia[]
  .use(i18n)
  .use(router)

  .use(PrimeVue)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("InputText", InputText)
  .component("TreeTable", TreeTable)

  .use(vuetify) /*.use(showcase3)*/
  .component("EasyDataTable", Vue3EasyDataTable);

// tag::read_store[]
import { useInternationalizationStore } from "@/stores/internationalization";
const internationalization = useInternationalizationStore();
i18n.global.locale.value = internationalization.locale;
// end::read_store[]

vuetify.locale;

app.mount("#app");

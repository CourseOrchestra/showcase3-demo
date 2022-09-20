import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify) /*.use(showcase3)*/
  .component("EasyDataTable", Vue3EasyDataTable)
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
//import showcase3 from "showcase3";

loadFonts();

createApp(App)
  .use(router)
  .use(vuetify) /*.use(showcase3)*/
  .mount("#app");

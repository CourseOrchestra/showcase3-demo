import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { VDataTableServer } from "vuetify/labs/VDataTable";
import { VDataTableVirtual } from "vuetify/labs/VDataTable";
import { VVirtualScroll } from "vuetify/labs/VVirtualScroll";

import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import { i18n } from "./i18n";

const vuetify = createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  components: {
    VDataTableServer,
    VDataTableVirtual,
    VVirtualScroll,
  },
});

export default vuetify;

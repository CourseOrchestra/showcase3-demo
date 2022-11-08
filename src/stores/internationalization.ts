import { defineStore } from "pinia";

export type Internationalization = {
  locale: string;
};

export const useInternationalizationStore = defineStore({
  id: "internationalization",
  state: () =>
    ({ locale: import.meta.env.VITE_APP_I18N_LOCALE } as Internationalization),

  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },
  },

  // tag::persist[]
  persist: true,
  // end::persist[]
});

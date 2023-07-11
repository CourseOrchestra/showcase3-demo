import { defineStore } from "pinia";

export type Common = {
  page: string;
};

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({ page: "" }) as Common,
  actions: {
    setPage(page: string) {
      this.page = page;
    },
  },
});

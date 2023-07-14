import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import GridPage from "@/components/GridPage.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";
import router from "@/router";
import { i18n } from "@/plugins/i18n";

const vuetify = createVuetify();

describe("GridPage.vue", () => {
  it("Грид", () => {
    const wrapper = mount(GridPage, {
      global: {
        plugins: [vuetify, createTestingPinia(), i18n, router],
      },
      components: {
        EasyDataTable: Vue3EasyDataTable,
      },
    });
    expect(wrapper.text()).toContain("http");
  });
});

import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import GridPage from "@/components/GridPage.vue";
import Vue3EasyDataTable from "vue3-easy-data-table";

const vuetify = createVuetify();

describe("GridPage.vue", () => {
  it.skip("Грид", () => {
    const wrapper = mount(GridPage, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },

      components: {
        EasyDataTable: Vue3EasyDataTable,
      },
    });
    expect(wrapper.text()).toContain("http");
  });
});

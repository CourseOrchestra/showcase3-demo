import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import GridVuetifyPage from "@/components/GridVuetifyPage.vue";
import router from "@/router";
import { i18n } from "@/plugins/i18n";

const vuetify = createVuetify();

describe("GridPage.vue", () => {
  it("Грид", () => {
    const wrapper = mount(GridVuetifyPage, {
      global: {
        plugins: [vuetify, createTestingPinia(), i18n, router],
      },
    });
    expect(wrapper.text()).toContain("Dessert");
  });
});

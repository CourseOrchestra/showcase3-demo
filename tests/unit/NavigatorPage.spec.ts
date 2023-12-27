import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import NavigatorPage from "@/components/NavigatorPage.vue";

const vuetify = createVuetify();

describe("NavigatorPage.vue", () => {
  it.skip("Навигатор", () => {
    const wrapper = mount(NavigatorPage, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
    expect(wrapper.text()).toContain("title");
  });
});

import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import UrlStatePage from "@/components/UrlStatePage.vue";

const vuetify = createVuetify();

describe("UrlStatePage.vue", () => {
  it.skip("Состояние в url", () => {
    const wrapper = mount(UrlStatePage, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
    expect(wrapper.text()).toContain("title");
  });
});

import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import WelcomePage from "@/components/WelcomePage.vue";

const vuetify = createVuetify();

describe("WelcomePage.vue", () => {
  it.skip("Welcome", () => {
    const wrapper = mount(WelcomePage, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
    expect(wrapper.text()).toContain("Vue");
  });
});

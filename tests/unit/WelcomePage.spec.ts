import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import WelcomePage from "@/components/WelcomePage.vue";

const vuetify = createVuetify();

describe("WelcomePage.vue", () => {
  it("Welcome", () => {
    const wrapper = mount(WelcomePage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("Vue");
  });
});

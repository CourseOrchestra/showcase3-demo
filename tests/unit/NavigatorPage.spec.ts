import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import NavigatorPage from "@/components/NavigatorPage.vue";

const vuetify = createVuetify();

describe("NavigatorPage.vue", () => {
  it("Навигатор", () => {
    const wrapper = mount(NavigatorPage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("title");
  });
});

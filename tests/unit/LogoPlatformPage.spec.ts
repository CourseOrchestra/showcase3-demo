import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import LogoPlatformPage from "@/components/LogoPlatformPage.vue";

const vuetify = createVuetify();

describe("LogoPlatformPage.vue", () => {
  it("Логотип Платформы", () => {
    const wrapper = mount(LogoPlatformPage, {
      global: {
        plugins: [vuetify],
      },
    });
    //expect(wrapper.html()).toContain("logo-curs");
    expect(wrapper.html()).toContain("v-col");
  });
});

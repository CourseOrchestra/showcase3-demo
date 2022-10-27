import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import LogoPlatformPage from "@/components/LogoPlatformPage.vue";

const vuetify = createVuetify();

describe("LogoPlatformPage.vue", () => {
  it.skip("Логотип Платформы", () => {
    const wrapper = mount(LogoPlatformPage, {
      global: {
        plugins: [vuetify, createTestingPinia()],
      },
    });
    expect(wrapper.html()).toContain("corchestra.ru");
  });
});

import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import LogoCursPage from "@/components/LogoCursPage.vue";

const vuetify = createVuetify();

describe("LogoCursPage.vue", () => {
  it("Логотип КУРСа", () => {
    const wrapper = mount(LogoCursPage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.html()).toContain("curs.ru");
  });
});

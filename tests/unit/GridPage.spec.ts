import { describe, it, expect } from "vitest";
import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import GridPage from "@/components/GridPage.vue";

const vuetify = createVuetify();

describe("GridPage.vue", () => {
  it.skip("Грид", () => {
    const wrapper = mount(GridPage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("http");
  });
});

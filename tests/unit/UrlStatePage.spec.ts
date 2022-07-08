import { createVuetify } from "vuetify";
import { mount } from "@vue/test-utils";
import UrlStatePage from "@/components/UrlStatePage.vue";

const vuetify = createVuetify();

describe("UrlStatePage.vue", () => {
  it("Навигатор", () => {
    const wrapper = mount(UrlStatePage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toContain("Демонстрация состояния в url");
  });
});

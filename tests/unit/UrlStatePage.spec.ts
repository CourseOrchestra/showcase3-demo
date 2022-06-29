import vuetify from "../../src/plugins/vuetify";
import { shallowMount } from "@vue/test-utils";
import UrlStatePage from "@/components/UrlStatePage.vue";
import { VApp } from "vuetify/components";

describe("UrlStatePage.vue", () => {
  it("Навигатор", () => {
    const wrapper = shallowMount(UrlStatePage, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.html()).toContain("Демонстрация состояния в url");
  });
});

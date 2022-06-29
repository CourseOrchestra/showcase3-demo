import vuetify from "../../src/plugins/vuetify";
import { shallowMount } from "@vue/test-utils";
import UrlStatePage from "@/components/UrlStatePage.vue";

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

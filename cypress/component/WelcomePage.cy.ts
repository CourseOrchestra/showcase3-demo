import vuetify from "@/plugins/vuetify";
import WelcomePage from "@/components/WelcomePage.vue";

describe("WelcomePage.cy.ts", () => {
  it("Welcome", () => {
    /* eslint @typescript-eslint/ban-ts-comment: "off" */
    // @ts-ignore
    cy.mount(WelcomePage, { extensions: { plugins: [vuetify] } });
    cy.contains("h1", "Vue");
    cy.contains("h1", "Vuetify");
  });
});

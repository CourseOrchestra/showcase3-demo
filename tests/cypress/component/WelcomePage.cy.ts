import vuetify from "@/plugins/vuetify";
import WelcomePage from "@/components/WelcomePage.vue";

describe("WelcomePage.cy.ts", () => {
  it("Welcome", (done) => {
    setTimeout(() => {
      cy.mount(WelcomePage, { extensions: { plugins: [vuetify] } });
      cy.contains("h1", "Vue");
      cy.contains("h1", "Vuetify");
      done();
    }, 100);
  });
});

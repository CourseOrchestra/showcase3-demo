import WelcomePage from "@/components/WelcomePage.vue";

describe("WelcomePage.cy.ts", () => {
  it.skip("Welcome", () => {
    cy.mount(WelcomePage);
    cy.contains("h1", "Vue");
    cy.contains("h1", "Vuetify");
  });
});

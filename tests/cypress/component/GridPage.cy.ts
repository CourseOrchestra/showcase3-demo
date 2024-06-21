import GridVuetifyPage from "@/components/GridVuetifyPage.vue";

describe("GridPage.cy.ts", () => {
  it("Грид", () => {
    cy.mount(GridVuetifyPage);
    cy.contains("Dessert");
  });
});

import GridPage from "@/components/GridPage.vue";

describe("GridPage.cy.ts", () => {
  it("Грид", () => {
    cy.mount(GridPage);
    cy.contains("h2", "http");
  });
});

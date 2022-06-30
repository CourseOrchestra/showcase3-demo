import WelcomePage from "@/components/WelcomePage.vue";

describe("WelcomePage.cy.ts", () => {
  it("playground", () => {
    /* eslint @typescript-eslint/ban-ts-comment: "off" */
    // @ts-ignore
    cy.mount(WelcomePage);
    //    cy.contains("h1", "Vue");
    cy.contains("Vue");

    /*

    cy.get('[data-testid=stepper]')
        .should('be.visible')
        .and('contain.text', '1');

*/
  });
});

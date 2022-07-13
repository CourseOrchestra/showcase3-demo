import vuetify from "@/plugins/vuetify";
import GridPage from "@/components/GridPage.vue";

describe("GridPage.cy.ts", () => {
  it("Грид", () => {
    /* eslint @typescript-eslint/ban-ts-comment: "off" */
    // @ts-ignore
    cy.mount(GridPage, { extensions: { plugins: [vuetify] } });
    cy.contains("h1", "Демонстрация грида");
  });
});

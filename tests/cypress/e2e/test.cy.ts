describe("e2e тесты", () => {
  it("Welcome", () => {
    cy.visit("/");
    cy.contains("div", "welcome");
    cy.contains("div", "logocurs");
    cy.contains("div", "logoplatform");
    cy.contains("div", "navigator");
    cy.contains("div", "grid");
    cy.contains("div", "urlstate");
  });
  it("Логотип КУРСа", () => {
    cy.visit("/logocurs");
    cy.get("#lcurs1").should("have.attr", "href").and("contain", "curs.ru");
  });
  it("Логотип Платформы", () => {
    cy.visit("/logoplatform");
    cy.get("#lplatform1")
      .should("have.attr", "href")
      .and("contain", "corchestra.ru");
  });
  it("Навигатор", () => {
    cy.visit("/navigator");
    cy.contains("h1", "title");
  });
  it("Грид", () => {
    cy.visit("/grid");
  });
  it("Состояние в url", () => {
    cy.visit("/urlstate");
    cy.contains("h1", "title");
  });
});

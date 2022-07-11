describe("e2e тесты", () => {
  it("Welcome", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("div", "Welcome");
    cy.contains("div", "Логотип КУРСа");
    cy.contains("div", "Логотип Платформы");
    cy.contains("div", "Навигатор");
    cy.contains("div", "Грид");
    cy.contains("div", "Состояние");
  });
  it("Логотип КУРСа", () => {
    cy.visit("http://localhost:3000/logocurs");
    cy.get("#lcurs1").should("have.attr", "href").and("contain", "curs.ru");
  });
  it("Логотип Платформы", () => {
    cy.visit("http://localhost:3000/logoplatform");
    cy.get("#lplatform1")
      .should("have.attr", "href")
      .and("contain", "corchestra.ru");
  });
  it("Навигатор", () => {
    cy.visit("http://localhost:3000/navigator");
    cy.contains("h1", "Демонстрация навигатора");
  });
  it("Грид", () => {
    cy.visit("http://localhost:3000/grid");
  });
  it("Состояние в url", () => {
    cy.visit("http://localhost:3000/urlstate");
    cy.contains("h1", "Демонстрация состояния в url");
  });
});

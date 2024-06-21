describe("e2e тесты", () => {
  it("Welcome", () => {
    cy.visit("/");
    cy.contains("div", "Welcome");
    cy.contains("div", "Логотип КУРСа");
    cy.contains("div", "Логотип Платформы");
    cy.contains("div", "Навигатор");
    cy.contains("div", "Грид");
    cy.contains("div", "Состояние");
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
  it.skip("Навигатор", () => {
    cy.visit("/navigator");
    cy.contains("h1", "Демонстрация навигатора");
  });
  it("Грид", () => {
    cy.visit("/gridvuetify");
  });
  it("Состояние в url", () => {
    cy.visit("/urlstate");
    cy.contains("div", "Демонстрация состояния в url");
  });
  it("Группировка", () => {
    cy.visit("/primevuedatagroup");
    cy.contains("div", "Группировка");
    cy.contains("span", "Наименование нарушения");
  });
});

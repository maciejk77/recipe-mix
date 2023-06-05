import decode from "jwt-decode";

Cypress.session.clearAllSavedSessions();

describe("User NOT signed in", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.skip("should display message to sign in", () => {
    cy.findByText(/Please sign in above to get access/i);
  });

  it.skip("should display sign in button", () => {
    cy.findByRole("link", { name: "Login" });
  });

  it.skip("should NOT display navigation options (Home|Recipes|Add Recipe)", () => {
    cy.get('[data-testid="nav-bar"]').should("not.exist");
  });

  // both below redirect to sign in page
  it.skip("should NOT show the list of recipes (no access)", () => {
    cy.visit("/recipes");
    cy.url().should("not.contain", "/recipes");
  });

  it.skip("should NOT show a chosen recipe information (no access)", () => {
    cy.visit("/recipes/29");
    cy.url().should("not.contain", "/recipes/29");
  });
});

describe("User is signed in", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should successfully log into our app", () => {
    cy.login(Cypress.env("auth_username"), Cypress.env("auth_password")).then(
      () => {
        cy.url().should("eq", "http://localhost:3000/");
        cy.findByText(/welcome/i);
        // cy.get("[data-testid=logout]").contains("Logout");
        // cy.get('[href="/profile"]').click();
        // cy.url().should("eq", "http://localhost:3000/profile");
        // cy.get('[href="/"]').click();
        // cy.get("[data-testid=logout]").click();
        // cy.url().should("eq", "http://localhost:3000/");
      }
    );
  });
  // it("should show welcome message", () => {
  //   cy.visit("/");
  //   cy.login();
  //   cy.findByText(/welcome/i);
  // });

  // it("should show logout button", () => {});

  // it("should display navigation options (Home|Recipes|Add Recipe)", () => {});

  // it("should show the list of recipes", () => {});

  // it("should show a chosen recipe information", () => {});

  // it("should show (add|edit) options for user who created the recipe", () => {});

  // it("should add the recipe to recipes on save", () => {});

  // it("should NOT add the recipe to recipes on save, if form not filled properly", () => {});

  // it("should NOT add the recipe on cancel", () => {});

  // it("should allow editing a recipe for user who created it", () => {});

  // it("should NOT allow editing a recipe for user who NOT created it", () => {});

  // it("should allow deleting recipe for user who created it", () => {});

  // it("should NOT allow deleting recipe for user who NOT created it", () => {});
});

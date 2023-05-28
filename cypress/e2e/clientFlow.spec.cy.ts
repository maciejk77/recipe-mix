describe("User NOT signed in", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display message to sign in", () => {
    cy.findByText(/Please sign in above to get access/i);
  });

  it("should display sign in button", () => {
    cy.findByRole("button", { name: /sign in/i });
  });

  it("should NOT display navigation options (Home|Recipes|Add Recipe)", () => {});

  it("should NOT show the list of recipes", () => {});

  it("should NOT show a chosen recipe information", () => {});
});

describe("User is signed in", () => {
  it("should show welcome message", () => {});

  it("should show logout button", () => {});

  it("should display navigation options (Home|Recipes|Add Recipe)", () => {});

  it("should show the list of recipes", () => {});

  it("should show a chosen recipe information", () => {});

  it("should show (add|edit) options for user who created the recipe", () => {});

  it("should add the recipe to recipes on save", () => {});

  it("should NOT add the recipe to recipes on save, if form not filled properly", () => {});

  it("should NOT add the recipe on cancel", () => {});

  it("should allow editing a recipe for user who created it", () => {});

  it("should NOT allow editing a recipe for user who NOT created it", () => {});

  it("should allow deleting recipe for user who created it", () => {});

  it("should NOT allow deleting recipe for user who NOT created it", () => {});
});

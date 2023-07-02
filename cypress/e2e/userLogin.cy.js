describe("Login with different username", () => {
  let userData

  beforeEach(() => {
    
    cy.fixture("users").then((data) => {
      userData = data;
    })
  })

  context("Positive case", () => {
    it("Login success", () => {
      cy.login(userData.standardUser.user, userData.standardUser.password)
      cy.contains(userData.standardUser.expected).should("be.visible");
    });
  })

  context("Negative case", () => {
    it("Locked out user", () => {
      cy.login(userData.lockedOutUser.user, userData.lockedOutUser.password)
      cy.get("[data-test='error']").contains("Epic sadface: Sorry, this user has been locked out.").should("exist");
    });

    it("Invalid user", () => {
      cy.login(userData.invalidUser.user, userData.invalidUser.password)
      cy.get("[data-test='error']").contains("Epic sadface: Username and password do not match any user in this service").should("exist");
    });
  })  
  
})
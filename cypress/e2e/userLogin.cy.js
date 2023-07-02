describe("User login", () => {
  let userData

  beforeEach(() => {
    
    cy.fixture("users").then((data) => {
      userData = data;
    })
  })

  context("When login using valid username and password", () => {
    it("Should successfully login and redirect to inventory page", () => {
      cy.login(userData.standardUser.user, userData.standardUser.password)
      cy.contains(userData.standardUser.expected).should("be.visible");
    });
  })

  context("When login using invalid username or password", () => {
    it("Should show error message about account has been locked out", () => {
      cy.login(userData.lockedOutUser.user, userData.lockedOutUser.password)
      cy.get("[data-test='error']").contains("Epic sadface: Sorry, this user has been locked out.").should("exist");
    });

    it("Should show error message about invalid username and password", () => {
      cy.login(userData.invalidUser.user, userData.invalidUser.password)
      cy.get("[data-test='error']").contains("Epic sadface: Username and password do not match any user in this service").should("exist");
    });
  })  
  
})
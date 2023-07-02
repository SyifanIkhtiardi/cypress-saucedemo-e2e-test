// Custom command for login
Cypress.Commands.add("login", (user, password) => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type(user);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add("addToCart", (product) => {
    const productSelector = `[data-test="add-to-cart-${product}"]`
    cy.get(productSelector).click()
});

Cypress.Commands.add("removeFromCart", (product) => {
    const productSelector = `[data-test="remove-${product}"]`
    cy.get(productSelector).click()
});
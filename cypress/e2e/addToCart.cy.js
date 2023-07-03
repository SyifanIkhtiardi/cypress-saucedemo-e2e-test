describe("Add product to cart", () => {
   
    // Store login session.
    beforeEach(() => {
        // Perform login
        cy.fixture("users").then((data) => {
            cy.login(data.standardUser.user, data.standardUser.password);
        });

        // Get cookie
        cy.getCookies().then((cookies) => {
        // Save the cookies to be used for future requests
        cy.writeFile("cypress/fixtures/cookies.json", JSON.stringify(cookies));
        });

        cy.window().then((win) => {
        // Save the local storage data to be used for future sessions
        cy.writeFile("cypress/fixtures/localStorage.json", JSON.stringify(win.localStorage));
        });

    });

    context("When adding product to cart", () => {
        beforeEach(() => {
            // Add product to cart
            cy.addToCart("sauce-labs-bike-light");
            cy.addToCart("sauce-labs-backpack");
        });

        it("Should display correct number of product in cart", () => {
            // Verify the number of product in the cart
            cy.get(".shopping_cart_badge").should("contain", "2");
        });

        it("Should remove product from cart", () => {
            cy.removeFromCart("sauce-labs-backpack");
            cy.get(".shopping_cart_badge").should("contain", "1");
        });
    });
});
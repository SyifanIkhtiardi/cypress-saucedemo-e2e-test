describe("Product checkout", () => {
   
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

    context("When checking out product", () => {
        beforeEach(() => {
            // Add product to cart
            cy.addToCart("sauce-labs-bike-light");
        });

        it("should allow completing checkout process", () => {
            cy.get(".shopping_cart_link").click();

            // Proceed to checkout
            cy.get("[data-test='checkout']").click();

            // Fill checkout form
            cy.get("[data-test='firstName']").type("Test");
            cy.get("[data-test='lastName']").type("Test1");
            cy.get("[data-test='postalCode']").type("1232");

            // Continue checkout process
            cy.get("[data-test='continue']").click();

            // Verify checkout detail
            cy.contains("Sauce Labs Bike Light").should("exist");
            cy.contains("Item total: $9.99").should("exist");
            cy.contains("Tax: $0.80").should("exist");
            cy.contains("Total: $10.79").should("exist");

            // Complete checkout process
            cy.get("[data-test='finish']").click();

            // Verify the order confirmation
            cy.contains("Your order has been dispatched, and will arrive just as fast as the pony can get there!").should("exist");
        });

        it("Should allow to cancel checkout process", () => {
            cy.get(".shopping_cart_link").click();

            // Proceed to checkout
            cy.get("[data-test='checkout']").click();

            // Cancel checkout process
            cy.get("[data-test='cancel']").click();

            // Check of redirected to cart page
            cy.url().should("eq", "https://www.saucedemo.com/cart.html");
        })
    });
});
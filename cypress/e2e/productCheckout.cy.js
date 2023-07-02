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

    context("When checking out", () => {
        beforeEach(() => {
            // Add product to cart
            cy.addToCart("sauce-labs-bike-light");
        });

        it("should display the correct product and total amount", () => {
            // Access cart page
            cy.get(".shopping_cart_link").click();

            // Verify product displayed in the cart
            cy.contains("Sauce Labs Bike Light").should("exist");
            // Verify the total amount displayed in the cart
            cy.contains("$9.99").should("exist");
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
        })

    });


})
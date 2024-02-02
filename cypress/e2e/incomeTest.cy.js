const { describe } = require("mocha");

// Describe block for the entire test suite related to Income Management
describe("Income Management Tests", () => {

    // Before each test, set up common test conditions
    beforeEach(() => {
        // Intercept API call to fetch transactions and provide mock data
        cy.intercept("/get-transactions", { fixture: "mockData.json" }).as("getTransactions");
        cy.log("Intercepting API call with mock data");

        // Visit the income management page with some pre-configuration
        cy.visit("localhost:5050/instrumented/add-income.html", {
            // Before loading the page, stub sessionStorage methods to avoid side effects
            onBeforeLoad(win) {
                Object.defineProperty(win.sessionStorage, "setItem", {
                    value: cy.stub(),
                    writable: true,
                });

                Object.defineProperty(win.sessionStorage, "clear", {
                    value: cy.stub(),
                    writable: true,
                });
            },
        });
    });

    // Test case: Verify the correctness of the page title
    it("displays the correct page title", () => {
        cy.title().should("eq", "Add Income");
    });

    // Test case: Verify the presence and correctness of navigation items
    it("displays the correct navigation items", () => {
        cy.get(".navigation-item").first().should("contain", "View Transactions");
        cy.get(".navigation-item").eq(1).should("contain", "Income");
        cy.get(".navigation-item").last().should("contain", "Expenses");
    });

    // Test case: Add an income when all fields are valid
    it("should add an income when all fields are valid", () => {
        // Enter valid income data
        cy.get("#income_name").type("Test Income");
        cy.get("#income_amount").type("9191");
        cy.get("#source").type("Test Source");
        cy.get("#income_date").type("2024-02-01");
        cy.get("#description").type("Test Description");

        // Trigger the function to validate and add the income
        cy.window().invoke("validateAndAddIncome");

        // Verify the success alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Your Income has been added successfully");
        });
    });

    // Test case: Handle invalid income data
    it("Should handle invalid income data", () => {
        // Visit the page to reset any previous state
        cy.visit("localhost:5050/instrumented/add-income.html");
        // Enter valid data but leave a required field empty
        cy.get("#income_name").type("Test Income");
        cy.get("#income_amount").type("9191");
        cy.get("#source").clear();
        cy.get("#income_date").type("2024-02-01");
        cy.get("#description").type("Test Description");

        // Trigger the function to validate and add the income
        cy.window().invoke("validateAndAddIncome");

        // Verify the error alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Please fill in all required fields.");
        });
    });

    // Test case: Handle invalid income amount
    it("should handle invalid income amount", () => {
        // Enter valid data but with a negative income amount
        cy.get("#income_name").type("Test Income");
        cy.get("#income_amount").type("-9191");
        cy.get("#source").type("Testing Source");
        cy.get("#income_date").type("2024-02-01");
        cy.get("#description").type("Test Description");

        // Trigger the function to validate and add the income
        cy.window().invoke("validateAndAddIncome");

        // Verify the error alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Income Amount must be a positive number.");
        });
    });

    // Test case: Store the id and related information in session storage
    it("should store the id and its related information in session storage", () => {
        // Click on the first income title and wait for the transactions API call
        cy.get(".income-title").first().click();
        cy.wait("@getTransactions");

        // Verify session storage contains the expected values
        cy.window((win) => {
            const income = JSON.parse(win.sessionStorage.getItem("income"));
            const incomeId = win.sessionStorage.getItem("id");

            expect(income.id).to.equal(incomeId);
            expect(income).to.exist;
            expect(win.location.href).to.include("update-income.html");
        });
    });

    // Test case: Populate the form with related income details
    it("should populate the form with the related income details", () => {
        // Visit the page to reset any previous state
        cy.visit("localhost:5050/instrumented/add-income.html");
        // Click on the first income title
        cy.get(".income-title").first().click();

        // Verify the form is populated with the expected values
        cy.window((win) => {
            const income = JSON.parse(win.sessionStorage.getItem("income"));

            cy.get("#update_income_name").should("have.value", income.name);
            cy.get("#update_income_amount").should("have.value", income.amount);
            cy.get("#update_source").should("have.value", income.source);
            cy.get("#update_income_date").should("have.value", income.date);
            cy.get("#update_description").should("have.value", income.description);

            expect(win.location.href).to.include("update-income.html");
        });
    });

    // Test case: Update an income when all fields are valid
    it("should update an income when all fields are valid", () => {
        // Visit the page to reset any previous state
        cy.visit("localhost:5050/instrumented/add-income.html");
        // Click on the first income title to simulate selecting an income for update
        cy.get(".income-title").first().click();

        // Set the id in sessionStorage to simulate an existing income
        cy.window().then((win) => {
            win.sessionStorage.setItem("id", "1706728421915975");
        });

        // Clear existing values and enter updated data
        cy.get("#update_income_name").clear();
        cy.get("#update_income_amount").clear();
        cy.get("#update_source").clear();
        cy.get("#update_income_date").clear();
        cy.get("#update_description").clear();

        cy.get("#update_income_name").type("Updated Test Income");
        cy.get("#update_income_amount").type("6961");
        cy.get("#update_source").type("Updated Test Source");
        cy.get("#update_income_date").type("2024-02-01");
        cy.get("#update_description").type("Updated Test Description");

        // Trigger the function to update the income
        cy.window().invoke("updateIncome");

        // Verify the success alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Income has been updated successfully!");
        });

        // Verify the URL indicates return to add-income.html
        cy.url().should("include", "add-income.html");
    });

    // Test case: Show invalid update income
    it("should show invalid update income", () => {
        // Click on the first income title to simulate selecting an income for update
        cy.get(".income-title").first().click();

        // Set the id in sessionStorage to simulate an existing income
        cy.window().then((win) => {
            win.sessionStorage.setItem("id", "69");
        });

        // Enter updated data
        cy.get("#update_income_name").type("Updated Test Income");
        cy.get("#update_income_amount").type("6961");
        cy.get("#update_source").type("Updated Test Source");
        cy.get("#update_income_date").type("2024-02-01");
        cy.get("#update_description").type("Updated Test Description");

        // Trigger the function to update the income
        cy.window().invoke("updateIncome");

        // Verify the error alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("An error has occured while updating the Income. Please try again.");
        });
    });

    // Test case: Handle missing updated income data
    it("Should handle missing updated income data", () => {
        // Click on the first income title to simulate selecting an income for update
        cy.get(".income-title").first().click();
        // Enter updated data but leave a required field empty
        cy.get("#update_income_name").type("Test Income");
        cy.get("#update_income_amount").type("91911");
        cy.get("#update_source").clear();
        cy.get("#update_income_date").type("2024-02-01");
        cy.get("#update_description").type("Test Description");

        // Trigger the function to update the income
        cy.window().invoke("updateIncome");

        // Verify the error alert
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Please fill in all required fields.");
        });
    });

    // Test case: Delete an income when confirmation is given
    it("should delete an income when confirmation is given", () => {
        // Intercept the DELETE request for deleting an income
        cy.intercept("DELETE", "/delete-income/*", {
            statusCode: 200,
            body: { message: "Income deleted successfully!" },
        }).as("deleteRequest");

        // Visit the page
        cy.visit("localhost:5050/instrumented/add-income.html");

        // Click on the delete button for the first income
        cy.get("#delete").first().click();

        // Stub window.confirm to always return true
        cy.window().then((win) => {
            cy.stub(win, "confirm").returns(true);
        });

        // Wait for the DELETE request to complete
        cy.wait("@deleteRequest");

        // Verify the success alert
        cy.on("window:alert", (text) => {
            expect(text).to.equal("The selected income has been deleted successfully!");
        });

        // Verify the URL indicates return to add-income.html
        cy.url().should("include", "add-income.html");
    });

    // ... (Continue commenting for each test case)

    // Test case: Handle an error when the server response is not successful
    it("should handle an error when the server response is not successful", () => {
        // Confirm deletion when the confirmation dialog appears
        cy.on("window:confirm", () => true);

        // Intercept the DELETE request for deleting an income with a server error
        cy.intercept("DELETE", "/delete-income/*", {
            statusCode: 500,
            body: { message: "Server error!" },
        }).as("deleteRequest");

        // Visit the page
        cy.visit("localhost:5050/instrumented/add-income.html");

        // Click on the delete button for the first income
        cy.get(".delete-icon").first().click();

        // Wait for the DELETE request to complete
        cy.wait("@deleteRequest");

        // Verify the error alert
        cy.on("window:alert", (text) => {
            expect(text).to.equal("Error deleting the selected income");
        });

        // Verify the URL indicates return to add-income.html
        cy.url().should("include", "add-income.html");
    });

    // Test case: Calculate total income correctly
    it("should calculate total income correctly", () => {
        // Calculate total income using the function and verify the result
        cy.window().then((win) => {
            win.calculateTotalIncome().then((totalIncome) => {
                expect(totalIncome).to.eq(300);
            });
        });
    });

    // Test case: Update the DOM with the correct total income
    it("should update the DOM with the correct total income", () => {
        // Update the total income in the DOM and verify the displayed value
        cy.window().then((win) => {
            win.updateTotalIncome();
            cy.wait("@getTransactions");
            cy.get("#totalIncome").should("have.text", "Total Income: - $300");
        });
    });

    // Test case: Create income elements in the DOM
    it("should create income elements in the DOM", () => {
        // Verify the existence of income elements in the DOM after transactions API call
        cy.window().then((win) => {
            cy.wait("@getTransactions");
            cy.get("income").should("have.length", 2);
        });
    });
});


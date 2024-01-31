const { describe } = require("mocha");

// Test suite for unit testing
describe("Cypress testing units for frontend", () => {
    // Execute before each test case to visit the webpage
    beforeEach(() => {
        cy.visit("public/add-income.html"); // Visit the webpage before each test
    });

    it("should validate and add income", () => {
        // Test case for adding income with valid input
        cy.get("#income_name").type("Salary");
        cy.get("#income_amount").type("1000");
        cy.get("#source").type("Job");
        cy.get("#income_date").type("2022-01-01");
        cy.get("#description").type("Monthly salary");
        cy.get("#add_income_button").click();
        // Assert the success alert message
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Your Income has been added successfully");
        });

        // Test case for submitting the form with empty required fields
        cy.get("#income_name").clear();
        cy.get("#add_income_button").click();
        // Assert the alert for incomplete form submission
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Please fill in all required fields.");
        });

        // Test case for submitting the form with a negative income amount
        cy.get("#income_name").type("Salary");
        cy.get("#income_amount").type("-1000");
        cy.get("#add_income_button").click();
        // Assert the alert for negative income amount
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Income Amount must be a positive number.");
        });
    });

    it("should update income", () => {
        // Test case for updating income with valid input
        cy.get("#update_income_name").type("Updated Salary");
        cy.get("#update_income_amount").type("1500");
        cy.get("#update_source").type("Job");
        cy.get("#update_income_date").type("2022-02-01");
        cy.get("#update_description").type("Updated monthly salary");
        cy.get("#update_income_button").click();
        // Assert the success alert message
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Income has been updated successfully!");
        });

        // Test case for submitting the update form with empty required fields
        cy.get("#update_income_name").clear();
        cy.get("#update_income_button").click();
        // Assert the alert for incomplete update form submission
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Please fill in all required fields.");
        });
    });

    it("should calculate total income", () => {
        // Test case for calculating total income
        cy.intercept("/get-transactions", { fixture: "transactions.json" });
        cy.get("#calculate_total_income_button").click();
        // Assert the displayed total income value
        cy.get("#totalIncome").should("have.text", "Total Income: $3000");
    });

    it("should delete income", () => {
        // Test case for confirming deletion
        cy.on("window:confirm", () => true);
        cy.get("#delete_income_button").click();
        // Assert the success alert message
        cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("The selected income has been deleted successfully!");
        });

        // Test case for canceling deletion
        cy.on("window:confirm", () => false);
        cy.get("#delete_income_button").click();
        // Assert the URL remains unchanged after canceling deletion
        cy.location("pathname").should("eq", "/add-income.html");
    });
});

describe("Unit tests for HTML elements", () => {
    beforeEach(() => {
        cy.visit("public/add-income.html"); // Visit the webpage before each test
    });

    it("should fill update form with income details", () => {
        // Test case for filling update form with predefined income details
        cy.window().then((win) => {
            win.sessionStorage.setItem("income", JSON.stringify({ name: "Salary", amount: 1000, source: "Job", date: "2022-01-01", description: "Monthly salary" }));
        });
        cy.get("#fill_update_form_button").click();
        // Check if the update form is filled correctly with predefined details
        cy.get("#update_income_name").should("have.value", "Salary");
        cy.get("#update_income_amount").should("have.value", "1000");
        cy.get("#update_source").should("have.value", "Job");
        cy.get("#update_income_date").should("have.value", "2022-01-01");
        cy.get("#update_description").should("have.value", "Monthly salary");
    });
});

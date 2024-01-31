const { describe } = require("mocha");

// Test suite for Wesbite functions
describe("Basic Website Test", () => 
{
    // Test case 1
    it("Title should be correct", () => {
        // Steps
        cy.visit("http://localhost:5050/add-income.html")
        // Title should be equal to Add Income
        cy.title().should("eq", "Add Income")
    })

        // Test case 2
        it("Title should be wrong", () => {
            // Steps
            cy.visit("http://localhost:5050/add-income.html")
            // Title should not be equal to our app name, BudgetBuddy
            cy.title().should("not.eq", "Add Income")
        })
    

});
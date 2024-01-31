const { describe } = require("mocha");

// Test suite for checking if it renders the income list
describe('renderList', () => {
    beforeEach(() => {
        // Set up the test environment by visiting the HTML file (assuming it's named index.html)
        cy.visit('index.html');
    });

    it('displays "No income found." when incomes array is empty', () => {
        // Arrange: Set the incomes array to an empty array
        cy.window().then((win) => {
            win.incomes = [];
        });

        // Act: Trigger the rendering function
        cy.window().then((win) => {
            win.renderList();
        });

        // Assert: Check if the status element has the expected text
        cy.get('#status').should('have.text', 'No income found.');
    });

    it('renders list items with income details', () => {
        // Arrange: Set the incomes array with sample data
        cy.window().then((win) => {
            win.incomes = [
                { id: 1, name: 'Salary', amount: 1000, date: '2022-01-01' },
                { id: 2, name: 'Bonus', amount: 500, date: '2022-02-01' },
            ];
        });

        // Act: Trigger the rendering function
        cy.window().then((win) => {
            win.renderList();
        });

        // Assert: Check if there are 2 list items
        cy.get('#list li').should('have.length', 2);
        // Check if the first list item contains the name "Salary"
        cy.get('#list li').eq(0).should('contain', 'Salary');
        // Check if the second list item contains the name "Bonus"
        cy.get('#list li').eq(1).should('contain', 'Bonus');
    });
});

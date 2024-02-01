// transaction.cy.js
describe('Transaction Page Tests', () => {
    beforeEach(() => {
      // Mock the API response for "/view-transactions"
      cy.intercept('GET', '/view-transactions', { fixture: 'transactions.json' }).as('getTransactions');
      cy.visit('localhost:5050/instrumented/view-transactions.html'); // Replace with the actual path to your transaction page
    });
  
    it('displays fetched transactions correctly', () => {
      cy.wait('@getTransactions');
      cy.get('.transaction').should('have.length.at.least', 1); // Ensure there is at least one transaction displayed
    });
  
    it('calculates and displays total expenses and incomes correctly', () => {
      cy.wait('@getTransactions');
      // Assuming the fixture contains data for total expenses and incomes
      cy.get('#expenses p').should('contain', '$40'); 
      cy.get('#incomes p').should('contain', '$7999'); 
    });
  
    it('handles errors during transaction fetching', () => {
        cy.intercept('GET', '/view-transactions', {
          statusCode: 500,
          body: { error: 'Server error' }
        }).as('fetchTransactionsFail');
        cy.visit('localhost:5050/instrumented/view-transactions.html'); // Replace with the actual path
        cy.wait('@fetchTransactionsFail');
        cy.get('#error').should('exist').and('be.visible'); // Assuming an element with id="error" is shown upon error
      });
      
  });
  
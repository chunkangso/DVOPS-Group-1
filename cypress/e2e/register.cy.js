// register.cy.js
describe('Registration Functionality', () => {
  beforeEach(() => {
    cy.visit('localhost:5050/instrumented/register.html'); // Make sure this points to the correct location of your registration page
  });

  it('shows an error when fields are empty', () => {
    // Attempt to submit without filling out the fields
    cy.get('button').contains('Register').click(); // Adjust if your button contains different text
    cy.get('#error').should('contain', 'All fields are required!');
  });

  it('shows an error when passwords do not match', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('differentPassword123');
    cy.get('button').contains('Register').click(); // Adjust if your button contains different text
    cy.get('#error').should('contain', 'Password does not match!');
  });

  it('shows a message if registration fails on the server', () => {
    // Mock the server response to simulate a failed registration
    cy.intercept('POST', '/register', {
      statusCode: 400,
      body: { message: 'Authentication failed!' }
    }).as('registerRequest');

    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('button').contains('Register').click(); // Adjust if your button contains different text
    cy.wait('@registerRequest');
    cy.get('#error').should('contain', 'Authentication failed!');
  });

  it('redirects to the home page on successful registration', () => {
    // Mock the server response to simulate a successful registration
    cy.intercept('POST', '/register', {
      statusCode: 200,
      body: {}
    }).as('registerSuccess');

    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('button').contains('Register').click(); // Adjust if your button contains different text
    cy.wait('@registerSuccess');
    cy.location('pathname').should('eq', 'index.html');
  });
});

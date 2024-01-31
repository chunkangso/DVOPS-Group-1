import React from 'react';
import { mount } from '@cypress/react';
import Register from './Register'; // Adjust the import to the correct path of your component

describe('Register Component Tests', () => {
  it('renders the register component', () => {
    mount(<Register />);
    // Add your tests here, such as checking if certain elements exist
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#confirmPassword').should('exist');
    cy.get('button').contains('Register').click();
    cy.get('#error').should('contain', 'All fields are required!');
    // ... other assertions or interactions
  });

  // More tests for different aspects of the Register component
});

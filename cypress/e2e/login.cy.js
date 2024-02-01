// login.cy.js
describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("localhost:5050/instrumented/index.html"); // Replace with the correct path to your login page
  });

  it("shows an error when fields are empty", () => {
    // Attempt to submit the form without filling out the fields
    cy.get("button").contains("Login").click(); // Adjust if your button contains different text
    cy.get("#error").should("contain", "All fields are required!");
  });

  it("shows an error for invalid credentials", () => {
    // Mock the server response to simulate invalid credentials
    cy.intercept("POST", "/login", {
      statusCode: 401,
      body: { message: "Invalid credentials!" },
    }).as("loginRequest");

    cy.get("#email").type("wrong@example.com");
    cy.get("#password").type("wrongPassword");
    cy.get("button").contains("Login").click(); // Adjust if your button contains different text
    cy.wait("@loginRequest");
    cy.get("#error").should("contain", "Invalid credentials!");
  });

  it("redirects to the home page on successful login", () => {
    // Mock the server response to simulate a successful login
    cy.intercept("POST", "/login", {
      statusCode: 200,
      body: { message: "Login successful!" },
    }).as("loginSuccess");

    cy.get("#email").type("test@example.com");
    cy.get("#password").type("password123");

    cy.get("button").contains("Login").click();
    cy.wait("@loginSuccess"); 

    //cy.url().should("include", "instrumented/view-transactions.html");
  });
});

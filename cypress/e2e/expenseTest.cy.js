describe("Expense Management Tests", () => {
  beforeEach(() => {
    // Mock the Fetch API
    cy.intercept("/get-transactions", { fixture: "mockData.json" }).as(
      "getTransactions"
    );

    // Stub session storage
    cy.visit("localhost:5050/instrumented/add-expense.html", {
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
  it("displays the correct page title", () => {
    cy.title().should("eq", "Expense");
  });

  it("displays the correct navigation items", () => {
    cy.get(".navigation-item").first().should("contain", "View Transactions");

    cy.get(".navigation-item").eq(1).should("contain", "Income");

    cy.get(".navigation-item").last().should("contain", "Expenses");
  });

  it("should add an expense when all fields are valid", () => {
    // Fill all the fields correctly
    cy.get("#expense_name").type("Test Expense");
    cy.get("#expense_amount").type("100");
    cy.get("#category").type("Test Category");
    cy.get("#expense_date").type("2024-01-28");
    cy.get("#description").type("Test Description");

    // Call the function
    cy.window().invoke("validateAndAddExpense");

    // Check if the alert was called
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Your Expense is added successfully");
    });
  });

  it("Should handle invalid expense data", () => {
    cy.visit("localhost:5050/instrumented/add-expense.html");
    // Leave some fields empty
    cy.get("#expense_name").type("Test Expense");
    cy.get("#expense_amount").type("100");
    cy.get("#category").clear();
    cy.get("#expense_date").type("2024-01-28");
    cy.get("#description").type("Test Description");

    // Call the function
    cy.window().invoke("validateAndAddExpense");

    // Check if the alert was called
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in all required fields.");
    });
  });
  it("should handle invalid expense amount", () => {
    // Set an invalid expense amount
    cy.get("#expense_name").type("Test Expense");
    cy.get("#expense_amount").type("-100");
    cy.get("#category").type("Test Category");
    cy.get("#expense_date").type("2024-01-28");
    cy.get("#description").type("Test Description");

    // Call the function
    cy.window().invoke("validateAndAddExpense");

    // Check if the alert was called
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Expense Amount must be a positive number.");
    });
  });

  it("should store the id and its related information in session storage", () => {
    // Visit the page where the expenses are listed

    // Find the first expense and click it
    cy.get(".expense-title").first().click();

    // Wait for the request to complete
    cy.wait("@getTransactions");

    // Check that the correct items were set in session storage
    cy.window((win) => {
      const expense = JSON.parse(win.sessionStorage.getItem("expense"));
      const expenseId = win.sessionStorage.getItem("id");

      // Check that the expense ID matches the one stored in the session
      expect(expense.id).to.equal(expenseId);

      // Check that the expense exists in the session
      expect(expense).to.exist;

      // Check that the URL is correct
      expect(win.location.href).to.include("update-expense.html");
    });
  });
  it("should populate the form with the related expense details", () => {
    cy.visit("localhost:5050/instrumented/add-expense.html");

    cy.get(".expense-title").first().click();

    cy.window((win) => {
      const expense = JSON.parse(win.sessionStorage.getItem("expense"));

      cy.get("#update_expense_name").should("have.value", expense.name);
      cy.get("#update_expense_amount").should("have.value", expense.amount);
      cy.get("#update_category").should("have.value", expense.category);
      cy.get("#update_expense_date").should("have.value", expense.date);
      cy.get("#update_description").should("have.value", expense.description);

      // Check that the URL is correct
      expect(win.location.href).to.include("update-expense.html");
    });
  });

  it("should update an expense when all fields are valid", () => {
    cy.visit("localhost:5050/instrumented/add-expense.html");

    cy.get(".expense-title").first().click();

    cy.window().then((win) => {
      win.sessionStorage.setItem("id", "1706755046197937");
    });
    cy.get("#update_expense_name").clear();
    cy.get("#update_expense_amount").clear();
    cy.get("#update_category").clear();
    cy.get("#update_expense_date").clear();
    cy.get("#update_description").clear();

    cy.get("#update_expense_name").type("Updated Test Expense");
    cy.get("#update_expense_amount").type("100");
    cy.get("#update_category").type("Updated Test Category");
    cy.get("#update_expense_date").type("2024-01-28");
    cy.get("#update_description").type("Updated Test Description");
    cy.window().invoke("updateExpense");
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Updating the Expense is Successfully");
    });

    cy.url().should("include", "add-expense.html");
  });
  it("should show invalid update expense", () => {
    cy.get(".expense-title").first().click();

    cy.window().then((win) => {
      win.sessionStorage.setItem("id", "3");
    });

    cy.get("#update_expense_name").type("Updated Test Expense");
    cy.get("#update_expense_amount").type("100");
    cy.get("#update_category").type("Updated Test Category");
    cy.get("#update_expense_date").type("2024-01-28");
    cy.get("#update_description").type("Updated Test Description");

    // Call the function
    cy.window().invoke("updateExpense");

    // Check if the alert was called
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Error updating the Expense. Please try again.");
    });
  });

  it("Should handle missing updated expense data", () => {
    cy.get(".expense-title").first().click();
    cy.get("#update_expense_name").type("Test Expense");
    cy.get("#update_expense_amount").type("100");
    cy.get("#update_category").clear();
    cy.get("#update_expense_date").type("2024-01-28");
    cy.get("#update_description").type("Test Description");

    // Call the function
    cy.window().invoke("updateExpense");

    // Check if the alert was called
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill in all required fields.");
    });
  });

  it("should delete an expense when confirmation is given", () => {
    // Intercept the DELETE request and stub its response
    cy.intercept("DELETE", "/delete-expense/*", {
      statusCode: 200,
      body: { message: "Expense deleted successfully!" },
    }).as("deleteRequest");

    // Visit the page where the deleteExpense function is called
    cy.visit("localhost:5050/instrumented/add-expense.html");

    // Call the deleteExpense function by clicking on a delete icon
    cy.get("#delete").first().click();

    // Check if the confirmation dialog was displayed
    // You can use Cypress's .window() to access the browser's window object
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    // Wait for the DELETE request to complete
    cy.wait("@deleteRequest");

    // Check that the alert message is displayed
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Selected Expense is deleted successfully");
    });

    // Check that the page was reloaded
    cy.url().should("include", "add-expense.html");
  });

  it("should not delete an expense when confirmation is denied", () => {
    // Stub the confirmation dialog to return false
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });

    // Visit the page where the deleteExpense function is called
    cy.visit("localhost:5050/instrumented/add-expense.html");

    // Call the deleteExpense function by clicking on a delete icon
    cy.get(".delete-icon").first().click();

    // Check that the URL was changed to "add-expense.html"
    cy.url().should("include", "add-expense.html");
  });

  it("should handle an error when the server response is not successful", () => {
    // Stub the confirmation dialog to return true
    cy.on("window:confirm", () => true);

    // Intercept the DELETE request and stub an error response
    cy.intercept("DELETE", "/delete-expense/*", {
      statusCode: 500,
      body: { message: "Server error!" },
    }).as("deleteRequest");

    // Visit the page where the deleteExpense function is called
    cy.visit("localhost:5050/instrumented/add-expense.html");

    // Call the deleteExpense function by clicking on a delete icon
    cy.get(".delete-icon").first().click();

    // Wait for the DELETE request to complete
    cy.wait("@deleteRequest");

    // Check that an error alert message is displayed
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Error deleting the selected expense");
    });

    cy.url().should("include", "add-expense.html");
  });

  it("should calculate total expense correctly", () => {
    cy.window().then((win) => {
      // Call the function directly
      win.calculateTotalExpense().then((totalExpense) => {
        expect(totalExpense).to.eq(300); // Total of the mock expenses
      });
    });
  });

  it("should update the DOM with the correct total expense", () => {
    cy.window().then((win) => {
      win.updateTotalExpense();
      cy.wait("@getTransactions");
      cy.get("#totalExpense").should("have.text", "Total Expense: - $300");
    });
  });

  it("should create expense elements in the DOM", () => {
    cy.window().then((win) => {
      cy.wait("@getTransactions");
      cy.get(".expense").should("have.length", 2);
    });
  });
});

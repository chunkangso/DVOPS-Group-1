// Importing required modules from testing libraries and file system
const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;

// Importing functions to be tested from the ExpenseUtil module
const { addExpense, deleteExpense, editExpense } = require("../utils/ExpenseUtil");

// Test suite for expense-related features
describe("Testing expense related features", () => {
  // Path to the JSON file containing expense data
  const expensesFilePath = "utils/transactions.json";
  
  // Variable to store the original content of the JSON file before each test
  var orgContent = "";

  // Hook executed before each test, reading and parsing the original content
  beforeEach(async () => {
    orgContent = await fs.readFile(expensesFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  // Hook executed after each test, restoring the original content to the JSON file
  afterEach(async () => {
    await fs.writeFile(expensesFilePath, JSON.stringify(orgContent), "utf8");
  });

  // Test case: Should add a new expense successfully
  it("Should add a new expense successfully", async () => {
    const req = {
      body: {
        name: "Groceries",
        description: "Weekly grocery shopping",
        amount: 40,
        category: "Food",
        username: "john_doe",
        date: "2023-10-30"
      }
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      // Mocking the 'json' method to check if the response data is as expected
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length + 1);
        expect(data[orgContent.length].name).to.equal(req.body.name);
      },
    };

    // Calling the 'addExpense' function with the mocked request and response objects
    await addExpense(req, res);
  });

  // Test case: Should not be able to add an expense due to incomplete input
  it("Should not be able to add an expense due to incomplete input", async () => {
    const req = {
      body: {
        name: "Groceries",
        description: "Weekly grocery shopping",
        amount: 40,
        category: "Food",
        date: "2023-10-30"
      },
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      // Mocking the 'json' method to check if the response message is present
      json: function (data) {
        expect(data.message).to.not.equal(undefined);
      },
    };

    // Calling the 'addExpense' function with the mocked request and response objects
    await addExpense(req, res);
  });

  // Test case: Should edit an expense successfully
  it("Should edit an expense successfully", async () => {
    const req = {
      params: { id: 1700994740174044 },
      body: {
        name: "Groceries",
        description: "Weekly grocery shopping",
        amount: 40,
        category: "Food",
        username: "john_doe",
        date: "2023-10-30"
      }
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      // Mocking the 'json' method to check if the response message is as expected
      json: function (data) {
        expect(data.message).to.equal('Expense modified successfully!');
      },
    };

    // Calling the 'editExpense' function with the mocked request and response objects
    await editExpense(req, res);
  });

  // Test case: Should not be able to edit an expense due to an invalid ID
  it("Should not be able to edit an expense due to invalid ID", async () => {
    const req = {
      params: { id: 1000 },
      body: {
        name: "Groceries",
        description: "Weekly grocery shopping",
        amount: 40,
        category: "Food",
        username: "john_doe",
        date: "2023-10-30"
      }
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      // Mocking the 'json' method to check if the response message is as expected
      json: function (data) {
        expect(data.message).to.equal('Error occurred, unable to modify!');
      },
    };

    // Calling the 'editExpense' function with the mocked request and response objects
    await editExpense(req, res);
  });

  // Test case: Should delete an expense successfully
  it("Should delete an expense successfully", async () => {
    const req = {
      params: { id: 1700994740174044 },
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      // Mocking the 'json' method to check if the response message is as expected
      json: function (data) {
        expect(data.message).to.equal('Expense deleted successfully!');
      },
    };

    // Calling the 'deleteExpense' function with the mocked request and response objects
    await deleteExpense(req, res);
  });

  // Test case: Should not be able to delete an expense due to an invalid ID
  it("Should not be able to delete an expense due to invalid ID", async () => {
    const req = {
      params: { id: 1000 },
    };

    const res = {
      // Mocking the 'status' method to check if the correct status code is set
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      // Mocking the 'json' method to check if the response message is as expected
      json: function (data) {
        expect(data.message).to.equal('Error occurred, unable to delete!');
      },
    };

    // Calling the 'deleteExpense' function with the mocked request and response objects
    await deleteExpense(req, res);
  });
});
//Testing
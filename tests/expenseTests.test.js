const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { addExpense, deleteExpense, editExpense } = require("../utils/ExpenseUtil");


describe("Testing expense related features", () => {
  const expensesFilePath = "utils/transactions.json";
  var orgContent = "";
  beforeEach(async () => {
    orgContent = await fs.readFile(expensesFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });
  afterEach(async () => {
    await fs.writeFile(expensesFilePath, JSON.stringify(orgContent), "utf8");
  });
  it("Should add a new expense successfully", async () => {
    const req = {
      body:  {
        name: "Groceries",
        description: "Weekly grocery shopping",
        amount: 40,
        category: "Food",
        username: "john_doe",
        date: "2023-10-30"
        }
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length + 1);
        expect(data[orgContent.length].name).to.equal(req.body.name);
      },
    };
    await addExpense(req, res);
  });
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
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.not.equal(undefined);
      },
    };
    await addExpense(req, res);
  });
  it("Should edit an expense successfully", async () => {
    const req = {
      params: { id: 1700950977132679 },
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
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal('Expense modified successfully!');
      },
    };
    await editExpense(req, res);
    
  });
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
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal('Error occurred, unable to modify!');
      },
    };
    await editExpense(req, res);
  });
  it("Should delete an expense successfully", async () => {
    const req = {
      params: { id: 1700950977132679 },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal('Expense deleted successfully!');
      },
    };
    await deleteExpense(req, res);
   });
  
   it("Should not be able to delete an expense due to invalid ID", async () => {
    const req = {
      params: { id: 1000 },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal('Error occurred, unable to delete!');
      },
    };
    await deleteExpense(req, res);
   });
});

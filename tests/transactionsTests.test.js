const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { viewTransactions } = require("../utils/TransactionsUtil"); // Update import

describe("Testing transaction related features", () => {
  // Update description
  const transactionsFilePath = "utils/transactions.json"; // Update file path
  var orgContent = "";

  beforeEach(async () => {
    orgContent = await fs.readFile(transactionsFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(
      transactionsFilePath,
      JSON.stringify(orgContent),
      "utf8"
    );
  });

  it("Should add a new transaction successfully", async () => {
    const req = {
      body: {
        name: "Group 1",
        description: "for lunch",
        amount: "$10",
      },
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

    await addTransaction(req, res); // Update function call
  });

  it("Should not be able to add transaction due to incomplete input", async () => {
    const req = {
      body: {
        name: "Group 1",
        description: "for lunch",
        amount: "$10",
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

    await viewTransactions(req, res); // Update function call
  });
});

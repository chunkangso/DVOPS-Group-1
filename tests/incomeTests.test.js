// Import required modules from testing libraries and file system
const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;


// Import functions to be tested from the TransactionUtil module
const { addIncome, editIncome, deleteIncome } = require("../utils/TransactionUtil");

// Test suite for Income-related features-
describe('Testing Income related features', () => {
    // Path to the JSON file containing income data
    const incomeFilePath = "utils/transactions.json";

    // Variable to store the original content of the JSON file before each test
    var orgContent = "";

    // Hook executed before each test, reading and parsing the original content, this is to prevent messing up the original JSON file
    beforeEach(async () => {
        orgContent = await fs.readFile(incomeFilePath, "utf8");
        orgContent = JSON.parse(orgContent);
    });

    // Hook executed after each test, restoring the original content to the JSON file
    afterEach(async () => {
        await fs.writeFile(incomeFilePath, JSON.stringify(orgContent), "utf8");
    });

    // Test cases: Able to add a new income successfully
    it('Able to add a new income successfully', async () => {
        const req = {
            body: {
                name: "Test Income",
                description: "Correct inputs for testing",
                amount: 6969,
                source: "testing",
                username: "chunkang",
                date: "26-11-2023",
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
            }
        };

        // Call the "addIncome" function with the mocked request and response objects to test
        await addIncome(req, res);
    });

    // Test Case: Unable to add a new income due to incomplete input
    it('Unable to add a new income due to incomplete input', async () => {
        const req = {
            body: {
                name: "Test Income",
                description: "Correct inputs for testing",
                source: "testing",
                username: "chunkang",
                date: "26-11-2023",
            }
        };

        const res = {
            // Mocking the 'status' method to check if the correct status code is set
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            // Mocking the 'json' method to check if the response data is as expected  
            json: function (data) {
                expect(data.message).to.equal("Validation error");
            },
        };

        // Call the "addIncome" function with the mocked request and response objects to test
        await addIncome(req, res);
    });

    // Test Case: Able to edit an income successfully
    it('Able to edit an income successfully', async () => {
        const req = {
            params: { id: 1700988013726289 },
            body: {
                name: "Test edits",
                description: "Editted this through testing case",
                amount: 1,
                source: "Test Edits",
                username: "chunkang",
                date: "26-11-2023",
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
                expect(data.message).to.equal('Income modified successfully!');
            },
        };

        // Call the "editIncome" function with the mocked request and response objects to test
        await editIncome(req, res);
    });

    // Test Case: Unable to edit an income due to an invalid ID
    it('Unable to edit an income due to an invalid ID', async () => {
        const req = {
            params: { id: 6969 },
            body: {
                name: "Test edits",
                description: "Editted this through testing case",
                amount: 1,
                source: "Test Edits",
                username: "chunkang",
                date: "26-11-2023",
            }
        };

        const res = {
            // Mocking the 'status' method to check if the correct status code is set
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            // Mocking the 'json' method to check if the response data is as expected    
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to modify!');
            },
        };

        // Call the "editIncome" function with the mocked request and response objects to test
        await editIncome(req, res);
    });

    // Test Case: Able to delete an income successfully
    it('Able to delete an income successfully', async () => {
        const req = {
            params: { id: 1700988013726289 }
        };

        const res = {
            // Mocking the 'status' method to check if the correct status code is set
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            // Mocking the 'json' method to check if the response data is as expected    
            json: function (data) {
                expect(data.message).to.equal('Income deleted successfully!');
            },
        };

        // Call the "deleteIncome" function with the mocked request and response objects to test
        await deleteIncome(req, res);
    });

    // Test Case: Unable to delete an income due to an invalid ID
    it('Unable to delete an income due to an invalid ID', async () => {
        const req = {
            params: { id: 690696 }
        };

        const res = {
            // Mocking the 'status' method to check if the correct status code is set
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            // Mocking the 'json' method to check if the response data is as expected    
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to delete!');
            },
        };

        // Call the "deleteIncome" function with the mocked request and response objects to test
        await deleteIncome(req, res);
    });

});






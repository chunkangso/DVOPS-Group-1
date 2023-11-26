// Importing necessary modules for testing
const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;

// Importing user utility functions for testing
const { register, login } = require("../utils/UserUtil");

// Test suite for the Register Function
describe("Testing Register Function", () => {
  // Path to the file containing user data
  const usersFilePath = "utils/users.json";
  // Variable to store the original content of the user file
  var orgContent = "";

  // Before each test, read and parse the original content of the user file
  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  // After each test, restore the original content of the user file
  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  // Test case for successful user registration
  it("Should register a new user successfully", async () => {
    // Mock request object with user registration data
    const req = {
      body: {
        email: "mary@gmail.com",
        password: "123456",
      },
    };

    // Mock response object with assertions for successful registration
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data).to.have.lengthOf(orgContent.length + 1);
        expect(data[orgContent.length].email).to.equal(req.body.email);
        expect(data[orgContent.length].password).to.equal(req.body.password);
      },
    };

    // Call the register function with the mock request and response
    await register(req, res);
  });

  // Test case for validation error due to invalid email format
  it("Should show validation error due to email", async () => {
    // Mock request object with invalid email format
    const req = {
      body: {
        email: "simon#gmail.com",
        password: "123",
      },
    };

    // Mock response object with assertions for validation error
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Validation error");
      },
    };

    // Call the register function with the mock request and response
    await register(req, res);
  });

  // Test case for validation error due to password length
  it("Should show validation error due to password length", async () => {
    // Mock request object with a short password
    const req = {
      body: {
        email: "simon@gmail.com",
        password: "123",
      },
    };

    // Mock response object with assertions for validation error
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Validation error");
      },
    };

    // Call the register function with the mock request and response
    await register(req, res);
  });
});

// Test suite for the Login Function
describe("Testing Login Function", () => {
  // Path to the file containing user data
  const usersFilePath = "utils/users.json";
  // Variable to store the original content of the user file
  var orgContent = "";

  // Before each test, read and parse the original content of the user file
  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  // Test case for successful user login
  it("Should login successfully", async () => {
    // Mock request object with valid login credentials
    const req = {
      body: {
        email: orgContent[0].email,
        password: orgContent[0].password,
      },
    };

    // Mock response object with assertions for successful login
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Login successful!");
      },
    };

    // Call the login function with the mock request and response
    await login(req, res);
  });

  // Test case for invalid login credentials
  it("Should show invalid credentials", async () => {
    // Mock request object with invalid password
    const req = {
      body: {
        email: orgContent[0].email,
        password: "abcdefg",
      },
    };

    // Mock response object with assertions for invalid credentials
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };

    // Call the login function with the mock request and response
    await login(req, res);
  });
});

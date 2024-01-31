// Importing required modules and setting up testing environment
const { describe, it } = require("mocha");
const { expect } = require("chai");
const { app, server } = require("../index");
const fs = require("fs").promises;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Describe block for API route testing
describe("Testing API Routes", () => {
  // Path to the users data file
  const usersFilePath = "utils/users.json";
  // Variable to store the original content of the users data file
  var orgContent = "";

  // Before each test, read the original content of the users data file
  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  // After each test, restore the original content of the users data file
  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  // Test case: Register a new user successfully
  it("Should register a new user successfully", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({ email: "james@gmail.com", password: "testpassword" })
      .end((err, res) => {
        // Assertions for the test case
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        // Callback to indicate the end of the test
        done();
        // Close the server after the test
        server.close();
      });
  });

  // Test case: Log in an existing user successfully
  it("Should log in an existing user successfully", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: orgContent[0].email, password: orgContent[0].password })
      .end((err, res) => {
        // Assertions for the test case
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("Login successful!");
        // Callback to indicate the end of the test
        done();
        // Close the server after the test
        server.close();
      });
  });
});

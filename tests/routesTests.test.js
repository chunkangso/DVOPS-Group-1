const { describe, it } = require("mocha");
const { expect } = require("chai");
const { app, server } = require("../index");
const fs = require("fs").promises;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
describe("Testing API Routes", () => {
  const usersFilePath = "utils/users.json";
  var orgContent = "";
  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });
  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });
  it("Should register a new user successfully", (done) => {
    chai
      .request(app)
      .post("/register")
      .send({ email: "james@gmail.com", password: "testpassword" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
        server.close();
      });
  });
  it("Should log in an existing user successfully", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: orgContent[0].email, password: orgContent[0].password })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("Login successful!");
        done();
        server.close();
      });
  });
});

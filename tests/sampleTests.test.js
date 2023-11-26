const { describe, it } = require("mocha");
const { expect } = require("chai");
const { sumTwoNumbers } = require("../utils/sampleFunctions");
describe("Summing up 2 and 3 using sumTwoNumbers function", () => {
  const result = sumTwoNumbers(2, 3);
  it("Should be equal to 5", () => {
    expect(result).to.equal(5);
  });
  it("Should not be equal to 6", () => {
    expect(result).to.not.equal(6);
  });
  it("Should be greater than 0", () => {
    expect(result).to.greaterThan(0);
  });
  it("Should be lesser than 10", () => {
    expect(result).to.lessThan(10);
  });
  it("Should be a number", () => {
    expect(result).to.be.a("number");
  });
});

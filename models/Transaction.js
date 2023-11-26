class Transactions {
  constructor(name, description, amount) {
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.timestamp = new Date().getTime();
    this.random = Math.floor(Math.random() * 1000);
    this.id = this.timestamp + "" + this.random.toString().padStart(3, '0');
  }
}

module.exports = { Transactions };

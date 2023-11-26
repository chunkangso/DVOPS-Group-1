// Class representing an Expense entity
class Expense {
  // Constructor for Expense
  constructor(name, description, amount, category, username, date) {
    this.name = name;               // Name of the expense
    this.description = description; // Description of the expense
    this.amount = amount;           // Amount of the expense
    this.category = category;       // Category of the expense
    this.username = username;       // Username associated with the expense
    this.date = date;               //Date of expense

    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    this.type = "expense"
  }

  
}

// Class representing an Income entity
class Income {
  // Constructor for Income
  constructor(name, description, amount, source, username, date) {
    this.name = name;               // Name of the income
    this.description = description; // Description of the income
    this.amount = amount;           // Amount of the income
    this.source = source;           // Source of the income
    this.username = username;       // Username associated with the income
    this.date = date;               // Date of income

    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    this.type = "income"
  }

}
  // Exporting Expense Class and Income Class
  module.exports = { Expense, Income };

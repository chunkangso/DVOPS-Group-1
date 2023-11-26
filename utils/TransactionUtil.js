// Importing readJSON and writeJSON functions from UserUtil
const { readJSON, writeJSON } = require('./UserUtil');

// Importing Transactions model from the models directory
const { Income } = require('../models/Transaction');

// Controller function to handle the addition of a new resource
async function addIncome(req, res) {
  try {
    // Extracting data from the request body
    const name = req.body.name; // Name of the income 
    const description = req.body.description; // Description of the income
    const amount = req.body.amount; // Amount of the income
    const source = req.body.source; // Source of the income
    const username = req.body.username; // Username associated with the income
    const date = req.body.date;

    // Creating a new Income instance
    const newIncome = new Income(name, description, amount, source, username, date);

    // Writing the new income to the JSON file and getting the updated expenses
    const updatedIncome = await writeJSON(newIncome, "utils/transactions.json");

    // Sending the updated income as the response with a 201 status code
    return res.status(201).json(updatedIncome);
  } catch (error) {
    // Handling errors during the income addition process
    return res.status(500).json({ message: error.message });
  }
}

// Exporting the addIncome function to make it accessible to other parts of the application
module.exports = {
  addIncome
};

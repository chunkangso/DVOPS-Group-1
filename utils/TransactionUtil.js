// Importing readJSON and writeJSON functions from UserUtil
const { readJSON, writeJSON } = require('./UserUtil');

// Importing Transactions model from the models directory
const { Income } = require('../models/Transaction');

// Controller function to handle the viewing of all transactions
async function viewTransactions(req, res) {
  try {
    // Read all transactions from the JSON file using the readJSON utility function
    const allTransactions = await readJSON("utils/transactions.json");

    // Return a success response with a status code of 200 and JSON containing all transactions
    return res.status(200).json(allTransactions);
  } catch (error) {
    // If an error occurs during the process, handle it and return a response with a status code of 500
    return res.status(500).json({ message: error.message });
  }
}

// Controller function to handle the addition of a new income
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

// Controller function to handle the editting of an existing income
async function editIncome(req, res) {
  try {
    // Extracting data from the request body
    const id = req.body.id; // id of the income record
    const name = req.body.name; // Name of the income 
    const description = req.body.description; // Description of the income
    const amount = req.body.amount; // Amount of the income
    const source = req.body.source; // Source of the income
    const username = req.body.username; // Username associated with the income
    const date = req.body.date;

    // Reading all the existing transactions from the JSON file
    const allTransactions = await readJSON('utils/transactions.json');

    // Finding the index of the income to be edited based on its id
    const indexOfIncomeToEdit = allTransactions.findIndex(income => income.id === id);

    // If the income is not found, return a 404 status
    if (indexOfIncomeToEdit === -1) {
      return res.status(404).json({ message: "Income records not found" });
    }

    // Updating the income data
    allTransactions[indexOfIncomeToEdit] = new Income(name, description, amount, source, username, date);

    // Writing the updated income list to the JSON file
    await writeJSON(allTransactions, "utils/transactions.json");


    // Sending the updated income as the response with a 200 status code
    return res.status(200).json(allTransactions[indexOfIncomeToEdit]);
  } catch (error) {
    // Handling errors during the income editing process
    return res.status(500).json({ message: error.message });
  }
}

// Exporting the addIncome function to make it accessible to other parts of the application
module.exports = {
  addIncome, editIncome, viewTransactions,
};

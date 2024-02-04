// Importing the 'fs' module 
const fs = require("fs").promises;

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

    // Default used for adding income unless unit testing
    const simulateError = false;

    // // For unit testing simulation, if not unit testing, continue with income addition logic
    // if (simulateError) {
    //   throw new Error('Simulated error during income addition');
    // }

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

// Controller function to handle the editing of an expense based on its ID
async function editIncome(req, res) {
  try {
    // Extracting parameters from the request
    const id = req.params.id;
    const name = req.body.name; // Name of the income 
    const description = req.body.description; // Description of the income
    const amount = req.body.amount; // Amount of the income
    const source = req.body.source; // Source of the income
    const username = req.body.username; // Username associated with the income
    const date = req.body.date;

    // Reading all income from the JSON file
    const allTransactions = await readJSON('utils/transactions.json');

    // Variable to track if any modification has occurred
    var modified = false;

    // Iterating through all income to find and update the specified income by ID
    for (var i = 0; i < allTransactions.length; i++) {
      var currentIncome = allTransactions[i];
      if (currentIncome.id == id) {
        // Modifying the properties of the matching income
        allTransactions[i].name = name;
        allTransactions[i].description = description;
        allTransactions[i].amount = amount;
        allTransactions[i].source = source;
        allTransactions[i].username = username;
        allTransactions[i].date = date;

        // Setting the 'modified' flag to true
        modified = true;
      }
    }

    // Checking if any modification has occurred
    if (modified) {
      // Writing the updated income back to the JSON file
      await fs.writeFile('utils/transactions.json', JSON.stringify(allTransactions), 'utf8');

      // Sending a success response with a 201 status code
      return res.status(201).json({ message: 'Income modified successfully!' });
    } else {
      // Sending an error response if no modification occurred
      return res.status(500).json({ message: 'Error occurred, unable to modify!' });
    }
  } catch (error) {
    // Handling errors during the expense modification process
    return res.status(500).json({ message: error.message });
  }
}


// Controller function to handle the deletion of an income based on its ID
async function deleteIncome(req, res) {
  try {
    // Extracting the ID parameter from the request
    const id = req.params.id;

    // Reading all incomes from the JSON file
    const allTransactions = await readJSON('utils/transactions.json');

    // Variable to store the index of the income to be deleted
    var index = -1;

    // Iterating through all incomes to find the specified income by ID
    for (var i = 0; i < allTransactions.length; i++) {
      var currentIncome = allTransactions[i];
      if (currentIncome.id == id)
        // Storing the index of the matching income
        index = i;
    }

    // Checking if the specified income was found
    if (index != -1) {
      // Removing the income from the array by its index
      allTransactions.splice(index, 1);

      // Writing the updated incomes back to the JSON file
      await fs.writeFile('utils/transactions.json', JSON.stringify(allTransactions), 'utf8');

      // Sending a success response with a 201 status code
      return res.status(201).json({ message: 'Income deleted successfully!' });
    } else {
      // Sending an error response if the specified income was not found
      return res.status(500).json({ message: 'Error occurred, unable to delete!' });
    }
  } catch (error) {
    // Handling errors during the income deletion process
    return res.status(500).json({ message: error.message });
  }
}


// Exporting the addIncome function to make it accessible to other parts of the application
module.exports = {
  addIncome, editIncome, deleteIncome, viewTransactions,
};

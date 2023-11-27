// Importing the 'fs' module 
const fs = require("fs").promises;
//Importing Expense Class
const { Expense } = require("../models/Transaction");

//Importing required Functions from UserUtil
const {readJSON, writeJSON} = require('./UserUtil')


// Function to add an expense to the JSON file and return the updated expenses
async function addExpense(req, res) {
  try {
    // Extracting necessary properties from the request body
    const name = req.body.name;
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category
    const username = req.body.username
    const date = req.body.date;

    // Creating a new Expense instance
    const newExpense = new Expense(name, description, amount, category, username, date);

    // Writing the new expense to the JSON file and getting the updated expenses
    const updatedExpenses = await writeJSON(newExpense, "utils/transactions.json");

    // Sending the updated expenses as the response with a 201 status code
    return res.status(201).json(updatedExpenses);
  } catch (error) {
    // Handling errors during the expense addition process
    return res.status(500).json({ message: error.message });
  }
}



// function to handle the editing of an expense based on its ID
async function editExpense(req, res) {
    try {
        // Extracting parameters from the request
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        const username = req.body.username;
        const date = req.body.date;

        // Reading all expenses from the JSON file
        const allExpenses = await readJSON('utils/transactions.json');

        // Variable to track if any modification has occurred
        var modified = false;

        // Iterating through all expenses to find and update the specified expense by ID
        for (var i = 0; i < allExpenses.length; i++) {
            var currentExpense = allExpenses[i];
            if (currentExpense.id == id){
                // Modifying the properties of the matching expense
                allExpenses[i].name = name;
                allExpenses[i].description = description;
                allExpenses[i].amount = amount;
                allExpenses[i].category = category;
                allExpenses[i].username = username;
                allExpenses[i].date = date;

                // Setting the 'modified' flag to true
                modified = true;
            }   
        }

        // Checking if any modification has occurred
        if (modified) {
            // Writing the updated expenses back to the JSON file
            await fs.writeFile('utils/transactions.json', JSON.stringify(allExpenses), 'utf8');
            
            // Sending a success response with a 201 status code
            return res.status(201).json({ message: 'Expense modified successfully!' });
        } else {
            // Sending an error response if no modification occurred
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        // Handling errors during the expense modification process
        return res.status(500).json({ message: error.message });
    }
}

// Function to handle the deletion of an expense based on its ID
async function deleteExpense(req, res) {
    try {
        // Extracting the ID parameter from the request
        const id = req.params.id;

        // Reading all expenses from the JSON file
        const allExpenses = await readJSON('utils/transactions.json');

        // Variable to store the index of the expense to be deleted
        var index = -1;

        // Iterating through all expenses to find the specified expense by ID
        for (var i = 0; i < allExpenses.length; i++) {
            var currentExpense = allExpenses[i];
            if (currentExpense.id == id)
                // Storing the index of the matching expense
                index = i;
        }

        // Checking if the specified expense was found
        if (index != -1) {
            // Removing the expense from the array by its index
            allExpenses.splice(index, 1);

            // Writing the updated expenses back to the JSON file
            await fs.writeFile('utils/transactions.json', JSON.stringify(allExpenses), 'utf8');

            // Sending a success response with a 201 status code
            return res.status(201).json({ message: 'Expense deleted successfully!' });
        } else {
            // Sending an error response if the specified expense was not found
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        // Handling errors during the expense deletion process
        return res.status(500).json({ message: error.message });
    }
}



// Exporting functions
module.exports = {
  addExpense,
  editExpense,
  deleteExpense

};

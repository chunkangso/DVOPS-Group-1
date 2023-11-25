// Importing necessary modules
var express = require('express');
var bodyParser = require("body-parser");

// Creating an Express application
var app = express();

// Setting the port to either the environment variable PORT or 5050 if not defined
const PORT = process.env.PORT || 5050;

// Default start page
var startPage = "index.html";

// Using body-parser to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serving static files from the 'public' directory
app.use(express.static("./public"));

// Handling GET requests to the root URL '/'
app.get('/', (req, res) => {
  // Sending the specified start page as the response
  res.sendFile(__dirname + "/public/" + startPage);
});

// Importing the required functions from the 'ExpenseUtil' module
const {addExpense,editExpense,deleteExpense} = require('./utils/ExpenseUtil')
// Handling a POST request to the '/add-expense' endpoint by calling the 'addExpense' function
app.post('/add-expense', addExpense);


// Handling a PUT request to the '/edit-expense' endpoint by calling the 'editExpense' function
app.put("/edit-expense/:id", editExpense)

// Handling a DELETE request to the '/delete-expense' endpoint by calling the 'deleteExpense' function
app.delete("/delete-expense/:id", deleteExpense)

// Listening on the specified port
app.listen(PORT, function () {
  // Logging a message when the server is successfully started
  console.log(`Demo project at: ${PORT}!`);
});
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { register, login } = require("./utils/UserUtil");
app.post("/register", register);
app.post("/login", login);

const { viewTransactions } = require("./utils/TransactionUtil");
app.get("/get-transactions", viewTransactions);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

// Importing the required functions from the 'TransactionUtil' module
const {
  addIncome,
  editIncome,
  deleteIncome,
} = require("./utils/TransactionUtil");
// Handling POST requests to the '/add-income' endpoint by calling the 'addIncome' function
app.post("/add-income", addIncome);
// Handling PUT requests to the '/edit-income' endpoint by calling the 'editIncome' function
app.put("/edit-income/:id", editIncome);
// Handling DELETE requests to the '/delete-income' endpoint by calling the 'deleteIncome' function
app.delete("/delete-income/:id", deleteIncome);

// Importing the required functions from the 'ExpenseUtil' module
const {
  addExpense,
  editExpense,
  deleteExpense,
} = require("./utils/ExpenseUtil");
// Handling a POST request to the '/add-expense' endpoint by calling the 'addExpense' function
app.post("/add-expense", addExpense);

// Handling a PUT request to the '/edit-expense' endpoint by calling the 'editExpense' function
app.put("/edit-expense/:id", editExpense);

// Handling a DELETE request to the '/delete-expense' endpoint by calling the 'deleteExpense' function
app.delete("/delete-expense/:id", deleteExpense);

// Listening on the specified port
const server = app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
module.exports = { app, server };

const { readJSON, writeJSON } = require("./UserUtil");
const { Transaction } = require("../models/Transaction"); // Assuming you have a Transaction model
async function viewTransactions(req, res) {
  try {
    const allTransactions = await readJSON("utils/transactions.json");
    return res.status(200).json(allTransactions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  viewTransactions,
};

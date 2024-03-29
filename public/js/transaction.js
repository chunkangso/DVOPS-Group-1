async function fetchTransactions() {
  try {
    const response = await fetch("/view-transactions");
    const transactions = await response.json();

    let totalExpenses = 0;
    let totalIncomes = 0;
    const transactionsContainer = document.getElementById("recentTransactions");

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        totalExpenses += parseFloat(transaction.amount);
        const transactionElement = document.createElement("div");
        transactionElement.classList.add("transaction");
        transactionElement.innerHTML = `
                    <span>${transaction.name}</span>
                    <span> - $${transaction.amount}</span>
                `;
        transactionsContainer.appendChild(transactionElement);
      } else if (transaction.type === "income") {
        totalIncomes += parseFloat(transaction.amount);
        const transactionElement = document.createElement("div");
        transactionElement.classList.add("transaction");
        transactionElement.innerHTML = `
                    <span>${transaction.name}</span>
                    <span> + $${transaction.amount}</span>
                `;
        transactionsContainer.appendChild(transactionElement);
      }
    });

    document
      .getElementById("expenses")
      .querySelector("p").textContent = `$${totalExpenses}`;
    document
      .getElementById("incomes")
      .querySelector("p").textContent = `$${totalIncomes}`;
  } catch (error) {
    console.error("Error fetching transactions:", error);

    let errorElement = document.getElementById("error");

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.id = "error";

      document.body.appendChild(errorElement);
    }

    errorElement.textContent = "Error fetching transactions: " + error.message;
  }
}

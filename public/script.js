// Retrieve incomes from local storage or initialize an empty array
const incomes = JSON.parse(localStorage.getItem("incomes")) || [];

// Number formatter for currency display
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
});

// DOM elements
const list = document.getElementById("incomeList");
const form = document.getElementById("incomeForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");

// Event listener for form submission
form.addEventListener("submit", addIncome);

// Function to update total income
function updateTotal() {
    const incomeTotal = incomes.reduce((total, trx) => total + trx.amount, 0);

    // Update DOM elements with formatted currency values
    income.textContent = formatter.format(incomeTotal).substring(1);
}


// Function to render the income list
function renderList() {
    list.innerHTML = "";

    status.textContent = "";
    if (incomes.length === 0) {
        status.textContent = "No income found.";
        return;
    }
    incomes.forEach(({ id, name, amount, date }) => {
        const li = document.createElement("li");

        // Populate list item with income details
        li.innerHTML = `
      <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
      </div>

      <div class="amount income">
        <span>${formatter.format(amount)}</span>
      </div>
    
      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteIncome(${id})">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    `;

        // Append list item to the income list
        list.appendChild(li);
    });

}

// Initial rendering of the income list and total
renderList();
updateTotal();

// Function to delete an income by ID
function deleteIncome(id) {
    const index = incomes.findIndex((trx) => trx.id === id);
    incomes.splice(index, 1);

    // Update total, save incomes, and re-render the list
    updateTotal();
    saveIncomes();
    renderList();
}

// Function to add a new income
function addIncome(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);

    // Add new income to the array
    incomes.push({
        id: incomes.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
    });

    // Reset the form
    this.reset();

    // Update total, save incomes, and re-render the list
    updateTotal();
    saveIncomes();
    renderList();
}


// Function to save incomes to local storage
function saveIncomes() {
    // Sort incomes by date in descending order
    incomes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Save incomes to local storage
    localStorage.setItem("incomes", JSON.stringify(incomes));
}

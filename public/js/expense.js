function validateAndAddExpense() {
  const expenseName = document.getElementById("expense_name").value;
  const expenseAmount = parseFloat(
    document.getElementById("expense_amount").value
  );
  const category = document.getElementById("category").value;
  const expenseDate = document.getElementById("expense_date").value;
  const description = document.getElementById("description").value;

  if (!expenseName || !category || !expenseDate || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  if (isNaN(expenseAmount) || expenseAmount <= 0) {
    alert("Expense Amount must be a positive number.");
    return;
  }

  // All input is valid, proceed with adding the expense
  addExpense();
}

function addExpense() {
  var response = "";

  var jsonData = new Object();
  jsonData.name = document.getElementById("expense_name").value;
  jsonData.description = document.getElementById("description").value;
  jsonData.amount = parseFloat(document.getElementById("expense_amount").value);
  jsonData.category = document.getElementById("category").value;
  jsonData.username = "Testing"; //need to change this later
  jsonData.date = document.getElementById("expense_date").value;

  var request = new XMLHttpRequest();

  request.open("POST", "/add-expense", true);
  request.setRequestHeader("Content-Type", "application/json");
  
  request.onload = function () {
    response = JSON.parse(request.responseText);
    var lastExpense = response[response.length - 1]
    if (
      lastExpense.name === jsonData.name &&
      lastExpense.description === jsonData.description &&
      lastExpense.amount === jsonData.amount &&
      lastExpense.category === jsonData.category &&
      lastExpense.username === jsonData.username &&
      lastExpense.date === jsonData.date
    ) {
      alert("Your Expense is added successfully");
      window.location.href = 'add-expense.html';
    } 
 
   

    
  };
  request.send(JSON.stringify(jsonData));
}

function updateExpense() {
  var response = "";
  var selectedId = sessionStorage.getItem("id");

  var jsonData = new Object();
  jsonData.name = document.getElementById("update_expense_name").value;
  jsonData.description = document.getElementById("update_description").value;
  jsonData.amount = parseFloat(
    document.getElementById("update_expense_amount").value
  );
  jsonData.category = document.getElementById("update_category").value;
  jsonData.username = "Testing"; //need to change this later
  jsonData.date = document.getElementById("update_expense_date").value;

  /* istanbul ignore else */
  if (
    !jsonData.name ||
    !jsonData.amount ||
    !jsonData.category ||
    !jsonData.date ||
    !jsonData.description
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  var request = new XMLHttpRequest();
  request.open("PUT", "/edit-expense/" + selectedId, true);
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {
    response = JSON.parse(request.responseText);
 
    /* istanbul ignore else */
    if (response.message == "Expense modified successfully!") {
      alert("Updating the Expense is Successfully");
      window.location.href = "add-expense.html";
    } else {
      alert("Error updating the Expense. Please try again.");
    }
  };
  request.send(JSON.stringify(jsonData));
}

async function getExpenseById(expenseId) {
  const response = await fetch("/get-transactions");
  const data = await response.json();
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    /* istanbul ignore else */
    if (item.id === expenseId) {
      sessionStorage.setItem("id", expenseId);
      sessionStorage.setItem("expense", JSON.stringify(item));
      window.location.href = "update-expense.html";
    }
  }
}
async function fillUpdateForm() {
  const data = JSON.parse(sessionStorage.getItem("expense"));
  document.getElementById("update_expense_name").value = data.name;
  document.getElementById("update_expense_amount").value = data.amount;
  document.getElementById("update_category").value = data.category;
  document.getElementById("update_expense_date").value = data.date;
  document.getElementById("update_description").value = data.description;
}

async function calculateTotalExpense() {
  const response = await fetch("/get-transactions");
  const data = await response.json();
  console.log(data);
  var totalExpense = 0;
  var numbOfExpense = 0;
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    /* istanbul ignore else */
    if (item.type === "expense") {
      totalExpense += item.amount;
      numbOfExpense += 1;
      console.log(totalExpense);

      var expenseElement = document.createElement("div");
      expenseElement.className = "expense";
      expenseElement.id = `expense-${i}`;
      expenseElement.innerHTML = `
      <div class="expense-title" onclick="getExpenseById('${item.id}')">
    <i class="fa fa-arrow-down"></i>
    <strong>${item.name}</strong> 
    <i class="fas fa-trash-alt delete-icon" onclick="deleteExpense(event, '${
      item.id
    }')" id="delete"></i>
  </div>
  <div class="expense-details">
    <p><i class="fas fa-dollar-sign"></i>$${item.amount}</p>
    <p><i class="fas fa-info-circle"></i>${item.description}</p>
    <p><i class="far fa-calendar-alt"></i>${new Date(
      item.date
    ).toLocaleDateString()}</p>
  </div>
      `;
      document.getElementById("expensesContainer").appendChild(expenseElement);
    }
  }
  sessionStorage.setItem("numbOfExpense", numbOfExpense);

  return totalExpense;
}

function updateTotalExpense() {
  calculateTotalExpense().then((totalExpense) => {
    document.getElementById("totalExpense").innerText =
      "Total Expense: - $" + totalExpense;
  });
}

function deleteExpense(event, selectedId) {
  event.stopPropagation();
  const confirmation = confirm("Are you sure you want to delete this expense?");
  /* istanbul ignore else */
  if (confirmation) {
    var response = "";

    var request = new XMLHttpRequest();

    request.open("DELETE", "/delete-expense/" + selectedId, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
      response = JSON.parse(request.responseText);
      console.log("mamayr", response);
      if (response.message == "Expense deleted successfully!") {
        alert("Selected Expense is deleted successfully");
        location.reload();
      } else {
        alert("Error deleting the selected expense");
      }
    };

    request.send();
  } else {
    window.location.href = "add-expense.html";
  }
}

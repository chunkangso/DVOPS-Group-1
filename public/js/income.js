// Function to validate and add income
function validateAndAddIncome() {
    // Retrieve values from input fields
    const incomeName = document.getElementById("income_name").value;
    const incomeAmount = parseFloat(document.getElementById("income_amount").value);
    const source = document.getElementById("source").value;
    const incomeDate = document.getElementById("income_date").value;
    const description = document.getElementById("description").value;

    // Check for empty required fields
    if (!incomeName || !source || !incomeDate || !description) {
        alert("Please fill in all required fields.");
        return;
    }

    // Check if the income amount is a positive number
    if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert("Income Amount must be a positive number.");
        return;
    }

    // All input is valid, proceed with adding the income
    addIncome();
}

// Function to add income
function addIncome() {
    var response = "";

    // Create a JSON object with income details
    var jsonData = {
        name: document.getElementById("income_name").value,
        description: document.getElementById("description").value,
        amount: parseFloat(document.getElementById("income_amount").value),
        source: document.getElementById("source").value,
        username: "Testing", // Need to change this later
        date: document.getElementById("income_date").value
    };

    // Create an XMLHttpRequest object
    var request = new XMLHttpRequest();

    // Configure the request for adding income
    request.open("POST", "/add-income", true);
    request.setRequestHeader("Content-Type", "application/json");

    // Define the behavior on request load
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);
        // Check if the income is added successfully
        var lastIncome = response[response.length - 1];
        if (lastIncome.name === jsonData.name && lastIncome.description === jsonData.description &&
            lastIncome.amount === jsonData.amount && lastIncome.source === jsonData.source &&
            lastIncome.username === jsonData.username && lastIncome.date === jsonData.date) {
            alert("Your Income has been added successfully");
            location.reload();
        } else {
            // Display an error message if adding income fails
            alert("Error adding Income. Please try again.");
        }
        // Clear the notification after 2 seconds
        setTimeout(function () {
            document.getElementById("notificationBox").innerText = "";
            document.getElementById("notificationBox").style.display = "none";
        }, 2000);
    };

    // Send the request with JSON data
    request.send(JSON.stringify(jsonData));
}

// Function to update income
async function updateIncome() {
    var response = "";
    var selectedId = sessionStorage.getItem("id");

    // Create a JSON object with updated income details
    var jsonData = {
        name: document.getElementById("update_income_name").value,
        description: document.getElementById("update_description").value,
        amount: parseFloat(document.getElementById("update_income_amount").value),
        source: document.getElementById("update_source").value,
        username: "Testing", // Need to change this later
        date: document.getElementById("update_income_date").value
    };

    // Validation
    if (!jsonData.name || !jsonData.amount || !jsonData.source || !jsonData.date) {
        alert("Please fill in all required fields.");
        return;
    }

    // Create an XMLHttpRequest object
    var request = new XMLHttpRequest();

    // Configure the request for updating income
    request.open("PUT", "/edit-income/" + selectedId, true);
    request.setRequestHeader("Content-Type", "application/json");

    // Define the behavior on request load
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);
        // Check if the income is updated successfully
        if (response.message == "Income modified successfully!") {
            alert("Income has been updated uccessfully!");
            window.location.href = "add-income.html";
        } else {
            // Display an error message if updating income fails
            alert("An error has occured while updating the Income. Please try again.");
        }
    };

    // Send the request with JSON data
    request.send(JSON.stringify(jsonData));
}

// Function to get income by ID
async function getIncomeById(incomeId) {
    const response = await fetch("/get-transactions");
    const data = await response.json();
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.id === incomeId) {
            sessionStorage.setItem("id", incomeId);
            sessionStorage.setItem("income", JSON.stringify(item));
            window.location.href = "update-income.html";
        }
    }
}

// Function to fill update form with income details
async function fillUpdateForm() {
    const data = JSON.parse(sessionStorage.getItem("income"));
    document.getElementById("update_income_name").value = data.name;
    document.getElementById("update_income_amount").value = data.amount;
    document.getElementById("update_source").value = data.source;
    document.getElementById("update_income_date").value = data.date;
    document.getElementById("update_description").value = data.description;
}

// Function to calculate total income
async function calculateTotalIncome() {
    const response = await fetch("/get-transactions");
    const data = await response.json();
    console.log(data);
    var totalIncome = 0;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.type === "income") {
            totalIncome += item.amount;
            console.log(totalIncome);

            // Create HTML elements for displaying income details
            var incomeElement = document.createElement("div");
            incomeElement.className = "income";
            incomeElement.id = `income-${i}`;
            incomeElement.innerHTML = `
                <div class="income-title" onclick="getIncomeById('${item.id}')">
                    <i class="fa fa-arrow-down"></i>
                    <strong>${item.name}</strong> 
                    <i class="fas fa-trash-alt delete-icon" onclick="deleteIncome(event, '${item.id}')"></i>
                </div>
                <div class="income-details">
                    <p><i class="fas fa-dollar-sign"></i>$${item.amount}</p>
                    <p><i class="fas fa-info-circle"></i>${item.description}</p>
                    <p><i class="far fa-calendar-alt"></i>${new Date(item.date).toLocaleDateString()}</p>
                </div>
            `;
            document.getElementById("incomesContainer").appendChild(incomeElement);
        }
    }

    return totalIncome;
}

// Function to update total income displayed on the page
function updateTotalIncome() {
    calculateTotalIncome().then((totalIncome) => {
        document.getElementById("totalIncome").innerText =
            "Total Income: $" + totalIncome;
    });
}

// Function to delete income
function deleteIncome(event, selectedId) {
    event.stopPropagation();
    const confirmation = confirm("Are you sure you want to delete this income?");

    if (confirmation) {
        var response = "";

        // Create an XMLHttpRequest object
        var request = new XMLHttpRequest();

        // Configure the request for deleting income
        request.open("DELETE", "/delete-income/" + selectedId, true);
        request.setRequestHeader("Content-Type", "application/json");

        // Define the behavior on request load
        request.onload = function () {
            response = JSON.parse(request.responseText);
            console.log(response);
            // Check if the income is deleted successfully
            if (response.message == "Income deleted successfully!") {
                alert("The selected income has been deleted successfully!");
                location.reload();
            } else {
                // Display an error message if deleting income fails
                alert("Error deleting the selected income");
            }
        };

        // Send the request without JSON data for deletion
        request.send();
    } else {
        // Redirect to add-income.html if deletion is canceled
        window.location.href = "add-income.html";
    }
}
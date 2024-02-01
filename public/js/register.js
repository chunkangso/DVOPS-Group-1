function register() {
  var response = "";
  var jsonData = new Object();
  jsonData.email = document.getElementById("email").value;
  jsonData.password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  if (
    jsonData.email == "" ||
    jsonData.password == "" ||
    confirmPassword == ""
  ) {
    document.getElementById("error").innerHTML = "All fields are required!";
    return;
  } else if (jsonData.password != confirmPassword) {
    document.getElementById("error").innerHTML = "Password does not match!";
    return;
  }
  var request = new XMLHttpRequest();
  request.open("POST", "/register", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    if (response.message == undefined) {
      window.location.href = "index.html";
    } else {
      document.getElementById("error").innerHTML = "Authentication failed!";
    }
  };
  request.send(JSON.stringify(jsonData));
}

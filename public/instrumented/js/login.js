function cov_186etf6lva() {
  var path =
    "C:\\Users\\Abhishek\\Desktop\\DVOPS-Group-1 - cypress\\public\\js\\login.js";
  var hash = "5a4b9fc99d0b67510381adcaccd6f7f4dcdd4f2a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\Abhishek\\Desktop\\DVOPS-Group-1 - cypress\\public\\js\\login.js",
    statementMap: {
      0: { start: { line: 2, column: 17 }, end: { line: 2, column: 19 } },
      1: { start: { line: 3, column: 17 }, end: { line: 3, column: 29 } },
      2: { start: { line: 4, column: 2 }, end: { line: 4, column: 58 } },
      3: { start: { line: 5, column: 2 }, end: { line: 5, column: 64 } },
      4: { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } },
      5: { start: { line: 7, column: 4 }, end: { line: 7, column: 76 } },
      6: { start: { line: 8, column: 4 }, end: { line: 8, column: 11 } },
      7: { start: { line: 10, column: 16 }, end: { line: 10, column: 36 } },
      8: { start: { line: 11, column: 2 }, end: { line: 11, column: 39 } },
      9: { start: { line: 12, column: 2 }, end: { line: 12, column: 63 } },
      10: { start: { line: 13, column: 2 }, end: { line: 22, column: 4 } },
      11: { start: { line: 14, column: 4 }, end: { line: 14, column: 48 } },
      12: { start: { line: 15, column: 4 }, end: { line: 15, column: 26 } },
      13: { start: { line: 16, column: 4 }, end: { line: 21, column: 5 } },
      14: { start: { line: 17, column: 6 }, end: { line: 17, column: 54 } },
      15: { start: { line: 18, column: 6 }, end: { line: 18, column: 41 } },
      16: { start: { line: 20, column: 6 }, end: { line: 20, column: 74 } },
      17: { start: { line: 23, column: 2 }, end: { line: 23, column: 41 } },
    },
    fnMap: {
      0: {
        name: "login",
        decl: { start: { line: 1, column: 9 }, end: { line: 1, column: 14 } },
        loc: { start: { line: 1, column: 17 }, end: { line: 24, column: 1 } },
        line: 1,
      },
      1: {
        name: "(anonymous_1)",
        decl: {
          start: { line: 13, column: 19 },
          end: { line: 13, column: 20 },
        },
        loc: { start: { line: 13, column: 31 }, end: { line: 22, column: 3 } },
        line: 13,
      },
    },
    branchMap: {
      0: {
        loc: { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } },
        type: "if",
        locations: [
          { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } },
          { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } },
        ],
        line: 6,
      },
      1: {
        loc: { start: { line: 6, column: 6 }, end: { line: 6, column: 53 } },
        type: "binary-expr",
        locations: [
          { start: { line: 6, column: 6 }, end: { line: 6, column: 26 } },
          { start: { line: 6, column: 30 }, end: { line: 6, column: 53 } },
        ],
        line: 6,
      },
      2: {
        loc: { start: { line: 16, column: 4 }, end: { line: 21, column: 5 } },
        type: "if",
        locations: [
          { start: { line: 16, column: 4 }, end: { line: 21, column: 5 } },
          { start: { line: 16, column: 4 }, end: { line: 21, column: 5 } },
        ],
        line: 16,
      },
    },
    s: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
    },
    f: { 0: 0, 1: 0 },
    b: { 0: [0, 0], 1: [0, 0], 2: [0, 0] },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "5a4b9fc99d0b67510381adcaccd6f7f4dcdd4f2a",
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_186etf6lva = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_186etf6lva();
function login() {
  cov_186etf6lva().f[0]++;
  var response = (cov_186etf6lva().s[0]++, "");
  var jsonData = (cov_186etf6lva().s[1]++, new Object());
  cov_186etf6lva().s[2]++;
  jsonData.email = document.getElementById("email").value;
  cov_186etf6lva().s[3]++;
  jsonData.password = document.getElementById("password").value;
  cov_186etf6lva().s[4]++;
  if (
    (cov_186etf6lva().b[1][0]++, jsonData.email == "") ||
    (cov_186etf6lva().b[1][1]++, jsonData.password == "")
  ) {
    cov_186etf6lva().b[0][0]++;
    cov_186etf6lva().s[5]++;
    document.getElementById("error").innerHTML = "All fields are required!";
    cov_186etf6lva().s[6]++;
    return;
  } else {
    cov_186etf6lva().b[0][1]++;
  }
  var request = (cov_186etf6lva().s[7]++, new XMLHttpRequest());
  cov_186etf6lva().s[8]++;
  request.open("POST", "/login", true);
  cov_186etf6lva().s[9]++;
  request.setRequestHeader("Content-Type", "application/json");
  cov_186etf6lva().s[10]++;
  request.onload = function () {
    cov_186etf6lva().f[1]++;
    cov_186etf6lva().s[11]++;
    response = JSON.parse(request.responseText);
    cov_186etf6lva().s[12]++;
    console.log(response);
    cov_186etf6lva().s[13]++;
    if (response.message == "Login successful!") {
      cov_186etf6lva().b[2][0]++;
      cov_186etf6lva().s[14]++;
      sessionStorage.setItem("email", jsonData.email);
      cov_186etf6lva().s[15]++;
      window.location.href = "view-transactions.html";
    } else {
      cov_186etf6lva().b[2][1]++;
      cov_186etf6lva().s[16]++;
      document.getElementById("error").innerHTML = "Invalid credentials!";
    }
  };
  cov_186etf6lva().s[17]++;
  request.send(JSON.stringify(jsonData));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTg2ZXRmNmx2YSIsImFjdHVhbENvdmVyYWdlIiwibG9naW4iLCJmIiwicmVzcG9uc2UiLCJzIiwianNvbkRhdGEiLCJPYmplY3QiLCJlbWFpbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInBhc3N3b3JkIiwiYiIsImlubmVySFRNTCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25sb2FkIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzZW5kIiwic3RyaW5naWZ5Il0sInNvdXJjZXMiOlsibG9naW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbG9naW4oKSB7XHJcbiAgdmFyIHJlc3BvbnNlID0gXCJcIjtcclxuICB2YXIganNvbkRhdGEgPSBuZXcgT2JqZWN0KCk7XHJcbiAganNvbkRhdGEuZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xyXG4gIGpzb25EYXRhLnBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcclxuICBpZiAoanNvbkRhdGEuZW1haWwgPT0gXCJcIiB8fCBqc29uRGF0YS5wYXNzd29yZCA9PSBcIlwiKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9IFwiQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQhXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBcIi9sb2dpblwiLCB0cnVlKTtcclxuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgIGlmIChyZXNwb25zZS5tZXNzYWdlID09IFwiTG9naW4gc3VjY2Vzc2Z1bCFcIikge1xyXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiZW1haWxcIiwganNvbkRhdGEuZW1haWwpO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaG9tZS5odG1sXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpLmlubmVySFRNTCA9IFwiSW52YWxpZCBjcmVkZW50aWFscyFcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIHJlcXVlc3Quc2VuZChKU09OLnN0cmluZ2lmeShqc29uRGF0YSkpO1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6IndrRkFlWTtBQUFBQSxjQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGNBQUEsR0FmWixRQUFTLENBQUFFLEtBQUtBLENBQUEsQ0FBRyxDQUFBRixjQUFBLEdBQUFHLENBQUEsTUFDZixHQUFJLENBQUFDLFFBQVEsRUFBQUosY0FBQSxHQUFBSyxDQUFBLE1BQUcsRUFBRSxFQUNqQixHQUFJLENBQUFDLFFBQVEsRUFBQU4sY0FBQSxHQUFBSyxDQUFBLE1BQUcsR0FBSSxDQUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFDUCxjQUFBLEdBQUFLLENBQUEsTUFDNUJDLFFBQVEsQ0FBQ0UsS0FBSyxDQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0MsS0FBSyxDQUFDWCxjQUFBLEdBQUFLLENBQUEsTUFDeERDLFFBQVEsQ0FBQ00sUUFBUSxDQUFHSCxRQUFRLENBQUNDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsS0FBSyxDQUFDWCxjQUFBLEdBQUFLLENBQUEsTUFDOUQsR0FBSSxDQUFBTCxjQUFBLEdBQUFhLENBQUEsU0FBQVAsUUFBUSxDQUFDRSxLQUFLLEVBQUksRUFBRSxJQUFBUixjQUFBLEdBQUFhLENBQUEsU0FBSVAsUUFBUSxDQUFDTSxRQUFRLEVBQUksRUFBRSxFQUFFLENBQUFaLGNBQUEsR0FBQWEsQ0FBQSxTQUFBYixjQUFBLEdBQUFLLENBQUEsTUFDbkRJLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxTQUFTLENBQUcsMEJBQTBCLENBQUNkLGNBQUEsR0FBQUssQ0FBQSxNQUN4RSxPQUNGLENBQUMsS0FBQUwsY0FBQSxHQUFBYSxDQUFBLFVBQ0QsR0FBSSxDQUFBRSxPQUFPLEVBQUFmLGNBQUEsR0FBQUssQ0FBQSxNQUFHLEdBQUksQ0FBQVcsY0FBYyxDQUFDLENBQUMsRUFBQ2hCLGNBQUEsR0FBQUssQ0FBQSxNQUNuQ1UsT0FBTyxDQUFDRSxJQUFJLENBQUMsTUFBTSxDQUFFLFFBQVEsQ0FBRSxJQUFJLENBQUMsQ0FBQ2pCLGNBQUEsR0FBQUssQ0FBQSxNQUNyQ1UsT0FBTyxDQUFDRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUUsa0JBQWtCLENBQUMsQ0FBQ2xCLGNBQUEsR0FBQUssQ0FBQSxPQUM3RFUsT0FBTyxDQUFDSSxNQUFNLENBQUcsVUFBWSxDQUFBbkIsY0FBQSxHQUFBRyxDQUFBLE1BQUFILGNBQUEsR0FBQUssQ0FBQSxPQUMzQkQsUUFBUSxDQUFHZ0IsSUFBSSxDQUFDQyxLQUFLLENBQUNOLE9BQU8sQ0FBQ08sWUFBWSxDQUFDLENBQUN0QixjQUFBLEdBQUFLLENBQUEsT0FDNUNrQixPQUFPLENBQUNDLEdBQUcsQ0FBQ3BCLFFBQVEsQ0FBQyxDQUFDSixjQUFBLEdBQUFLLENBQUEsT0FDdEIsR0FBSUQsUUFBUSxDQUFDcUIsT0FBTyxFQUFJLG1CQUFtQixDQUFFLENBQUF6QixjQUFBLEdBQUFhLENBQUEsU0FBQWIsY0FBQSxHQUFBSyxDQUFBLE9BQzNDcUIsY0FBYyxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFFckIsUUFBUSxDQUFDRSxLQUFLLENBQUMsQ0FBQ1IsY0FBQSxHQUFBSyxDQUFBLE9BQ2hEdUIsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksQ0FBRyxXQUFXLENBQ3BDLENBQUMsSUFBTSxDQUFBOUIsY0FBQSxHQUFBYSxDQUFBLFNBQUFiLGNBQUEsR0FBQUssQ0FBQSxPQUNMSSxRQUFRLENBQUNDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQ0ksU0FBUyxDQUFHLHNCQUFzQixDQUNyRSxDQUNGLENBQUMsQ0FBQ2QsY0FBQSxHQUFBSyxDQUFBLE9BQ0ZVLE9BQU8sQ0FBQ2dCLElBQUksQ0FBQ1gsSUFBSSxDQUFDWSxTQUFTLENBQUMxQixRQUFRLENBQUMsQ0FBQyxDQUN4QyJ9

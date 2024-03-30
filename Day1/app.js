const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/html" });
    res.end("<h1>Method Not Allowed</h1>");
    return;
  }

  const route = url.split("/");
  const operation = route[1];
  const nums = route.slice(2).map(Number);

  let result;
  switch (operation) {
    case "add":
      result = sum(nums);
      break;
    case "subtract":
      result = subtract(nums);
      break;
    case "multiply":
      result = multiply(nums);
      break;
    case "divide":
      result = divide(nums);
      break;
    default:
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("<h1>Invalid operation</h1>");
      return;
  }

  if (isNaN(result)) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("<h1>Invalid input</h1>");
    return;
  }

  try {
    fs.appendFileSync("data", `${result}\n`, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      }
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>${result}</h1>`);
  } catch (error) {
    console.error("Error writing to file:", error);
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Internal Server Error</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function sum(nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

function subtract(nums) {
  return nums.reduce((acc, curr) => acc - curr);
}

function multiply(nums) {
  return nums.reduce((acc, curr) => acc * curr, 1);
}

function divide(nums) {
  if (nums.includes(0)) {
    throw new Error("Division by zero");
  }
  return nums.reduce((acc, curr) => acc / curr);
}

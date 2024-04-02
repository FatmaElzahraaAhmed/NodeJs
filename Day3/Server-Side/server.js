const fs = require("fs");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Pages/main.html"));
});

app.get("*/main.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Pages/main.html"));
});

app.get("*/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Styles/style.css"));
});

app.get("*/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Scripts/script.js"));
});

app.get("*/welcome.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client-Side/Pages/welcome.html"));
});

app.get("*/clients.json", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../Client-Side/Assets/clients.json"),
    "utf-8",
    (err, data) => {
      if (!err) {
        res.json(JSON.parse(data));
      }
    }
  );
});

app.post("*/welcome.html", (req, res) => {
  const { name, mobile, addr, email } = req.body;

  if (!name || !mobile || !addr || !email) {
    res.status(400).send("All fields are required");
    return;
  }

  fs.readFile(
    path.join(__dirname, "../Client-Side/Pages/welcome.html"),
    "utf-8",
    (err, welcomeHTML) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const clientData = {
        name,
        mobile,
        addr,
        email,
      };

      fs.readFile(
        path.join(__dirname, "../Client-Side/Assets/clients.json"),
        "utf-8",
        (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
          }

          const clients = JSON.parse(data);
          clients.push(clientData);

          fs.writeFile(
            path.join(__dirname, "../Client-Side/Assets/clients.json"),
            JSON.stringify(clients, null, 2),
            (err) => {
              if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
                return;
              }

              welcomeHTML = welcomeHTML
                .replace("{clientName}", name)
                .replace("{mobile}", mobile)
                .replace("{addr}", addr)
                .replace("{email}", email);

              res.send(welcomeHTML);
            }
          );
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

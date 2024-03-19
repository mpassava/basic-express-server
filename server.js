const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("test_server_db.sqlite3", (err) => {
  if (err) {
    console.log("error connecting to database");
    return;
  }
  console.log("Database Connection Established");
});

const method = require("./middleware/method.js");
const userData = require("./users.json");

app.get("/", method, (req, res) => {
  res.send("Hello API");
});

app.get("/users", method, (req, res) => {
  res.json(userData);
  console.log(Object.getPrototypeOf(res));
});

app.get("/space", method, (req, res) => {
  res.sendFile("/img/space.jpg", { root: "." });
});

app.listen(3000, (err) => {
  if (err) {
    return console.log("Error Starting Server:", err);
  }
  console.log("Listening On Port 3000");
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      return console.error(`Error Closing Database ${err}`);
    }
    console.log("Database Conection Closed");
    process.exit(0);
  });
});

const express = require("express");
const app = express();

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
  res.sendFile('/img/space.jpg', { root: '.'});
})

app.listen(3000, (err) => {
  if (err) {
    console.log("Error Starting Server:", err);
    return;
  }
  console.log("Listening On Port 3000");
});

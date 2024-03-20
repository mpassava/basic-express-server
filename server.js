const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();

const db = new sqlite3.Database("test_server_db.sqlite3", (err) => {
  if (err) {
    console.log("error connecting to database");
    return;
  }
  console.log("Database Connection Established");
});

const method = require("./middleware/method.js");
const userData = require("./users.json");

app.use(express.json());

app
  .route("/")
  .get(method, (req, res) => {
    res.send("Hello API");
  });

app
  .route("/users")
  .get(method, (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(rows);
    });
  })
  .post(method, (req, res) => {
    const { name, username, email, phone } = req.body;

    if (!name || !username || !email || !phone) {
      res.status(400).json({ error: "Missing Required Fields" });
    }

    const query = `INSERT INTO users (name, username, email, phone) VALUES (?,?,?,?)`;
    db.run(query, [name, username, email, phone], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "User Created Successfully", userID: this.lastID });
    });
  });

app
  .route('/users/:id')
  .get(method, (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error Fetching User Data" });
        return;
      }
      if (!row) {
        res.status(404).json({ error: "User Not Found" });
        return;
      }
      res.status(200).json(row);
    });
  });

app
  .route('/space')
  .get(method, (req, res) => {
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

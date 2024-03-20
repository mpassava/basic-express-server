const sqlite3 = require("sqlite3");

const userData = require("./users.json");

const db = new sqlite3.Database("test_server_db.sqlite3");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    email TEXT,
    phone TEXT
  )`);

  const stmt = db.prepare(
    `INSERT INTO users (id, name, username, email, phone) VALUES (?,?,?,?,?)`
  );
  userData.forEach((user) => {
    stmt.run(
      user.id,
      user.name,
      user.username,
      user.email,
      user.phone,
      (err) => {
        if (err) console.error(err.message);
      }
    );
  });
  stmt.finalize();
});

db.close();

console.log("Database Seeded Successfully");

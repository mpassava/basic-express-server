const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(3000, (err) => {
  if (err) {
    console.log("Error Starting Server");
    return;
  }
  console.log("Listening On Port 3000");
});

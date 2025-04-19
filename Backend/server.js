const express = require("express");
require('dotenv').config();
const app = express();


const express = require("express");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Deepak! Your Express.js server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




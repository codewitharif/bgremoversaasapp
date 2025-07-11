// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

connectDB();

// Middleware (optional)
app.use(express.json()); // for parsing application/json
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

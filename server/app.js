const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();

// middleware
app.use(express.json())

app.use("/api/v2/auth", authRoutes);

 module.exports = app;
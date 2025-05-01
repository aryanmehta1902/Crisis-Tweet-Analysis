// Example using Express.js
const express = require('express');
const app = express();

const { exec } = require("child_process");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const csvParser = require("csv-parser");

const prisma = new PrismaClient();

const cors = require('cors');
///////////////////////////////////////////////////////////////////////////////////////
//change this to the links of the python server using the model and the frontend's link
///////////////////////////////////////////////////////////////////////////////////////
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000']
}));
app.use(express.json());

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});
const searchDatabaseRoute = require('./routes/searchDatabaseRoute');
app.use('/search', searchDatabaseRoute);

// Example specifying the port and starting the server
const port = process.env.PORT || 8080; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


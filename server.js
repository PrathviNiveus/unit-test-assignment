const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./dbConfig/db');
const logger = require('./logger/logger');
const userRoutes = require('./route/user');

app.use(express.json());
connectDB();
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`)
});


module.exports = app;

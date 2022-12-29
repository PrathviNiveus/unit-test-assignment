const mongoose = require('mongoose');
const logger = require('../logger/logger');

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        logger.info('DB connected...')
    } catch (error) {
        logger.error(`DB Error: ${error}`)
        process.exit(1);
    }
};

module.exports = connectDB;
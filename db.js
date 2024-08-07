// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('CONNECTED TO MONGODB');
    } catch (error) {
        console.error('ERROR CONNECTING TO MONGODB', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

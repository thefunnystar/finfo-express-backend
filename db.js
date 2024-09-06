const mongoose = require("mongoose");

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB);
        console.log("Database connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
}

module.exports = connectDB;

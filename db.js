const mongoose = require("mongoose");

async function connectDB() {
    const conn = await mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("database conncted");
}

module.exports = connectDB;
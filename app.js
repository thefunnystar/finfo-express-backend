const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); // Make sure to load environment variables early

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const notesRouter = require('./routes/notes');
const connectDB = require('./db.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('contacts', contactsRouter);
// app.use('notes', notesRouter);

// Connect to the database first, then start the server
(async () => {
    try {
        await connectDB(); // Await the database connection
        const port = process.env.PORT || 5000;
        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database");
    }
})();

module.exports = app;

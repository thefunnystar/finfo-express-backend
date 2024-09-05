const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const notesRouter = require('./routes/notes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('contacts', contactsRouter);
app.use('notes', notesRouter);

dotenv.config({ path: './.env' });

const { url } = require("inspector");
const connectDB = require('./db.js');

connectDB();
const port = process.env.PORT || 5000;
const server = backendApp.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

const express = require('express');
const app = express();

const notesRouter = require('./notes');

app.use('/notes', notesRouter);

//Export index.js
module.exports = app;
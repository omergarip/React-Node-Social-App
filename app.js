const express = require('express');
const morgan  = require('morgan');

const app = express();

// Importing routes
const postRoutes = require('./routes/post');

// Middleware
app.use(morgan('dev'));
app.use('/', postRoutes);

const port = 8080;

app.listen(port, () => {
    console.log(`A Node Js API is listening on port ${port}`);
});
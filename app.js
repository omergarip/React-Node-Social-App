const express = require('express');

const app = express();

// Importing routes
const { getPosts } = require('./routes/post');

app.get('/', getPosts);

const port = 8080;

app.listen(port, () => {
    console.log(`A Node Js API is listening on port ${port}`);
});
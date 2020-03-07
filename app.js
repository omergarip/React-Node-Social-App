const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
dotenv.config();

// Connecting to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
	console.log(`DB connection error: ${err.message}`);
});

// Importing routes
const postRoutes = require('./routes/post');

// Middleware
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));
app.use('/', postRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`A Node Js API is listening on port ${port}`);
});

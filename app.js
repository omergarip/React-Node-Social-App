const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
dotenv.config();

// Connecting to DB
mongoose
	.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
	console.log(`DB connection error: ${err.message}`);
});

// Importing routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(morgan('dev'));
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: 'Unauthorized' });
	}
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`A Node Js API is listening on port ${port}`);
});

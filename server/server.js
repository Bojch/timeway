const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const allowHeaders = require('./src/middleware/allowHeaders');

// Our DB Configuration
require('./src/db');

// invoke an instance of express application
const app = express();

// Init allowed headers Middleware
app.use(allowHeaders);

// Init Middleware to allows AJAX requests to skip the Same-origin policy
// and access resources from remote hosts.
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----------------------------------------------------------
// routings
// ----------------------------------------------------------
app.use('/books', require('./src/routes/book.router'));
app.use('/trackings', require('./src/routes/tracking.router'));
app.use('/users', require('./src/routes/user.router'));
app.use('/projects', require('./src/routes/project.router'));

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

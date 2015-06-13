'use strict';

var express  = require('express' );
var mongoose = require('mongoose');
var app      = express();

// Routers
var usersRouter = express.Router();

// Connect DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hippo_dev')

// Load routers
require('./routes/users_routes.js')(usersRouter);

// Assign Routers
app.use(usersRouter);

// Start Server (default port: 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

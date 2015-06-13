'use strict';

var express  = require('express' );
var app      = express();

// Routers
var usersRouter = express.Router();

// Load routers
require('./route/users_routes.js')(usersRouter);

// Assign Routers
app.use(usersRouter);

// Start Server (default port: 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

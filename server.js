'use strict';

var express  = require('express' );
var mongoose = require('mongoose');
var app      = express();

// Routers
var usersRouter = express.Router();
var cardsRouter = express.Router();

// Connect DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hippo_dev');

// Load static assets
app.use(express.static(__dirname + '/build'));

// Load routers
require('./routes/users_routes.js')(usersRouter);
require('./routes/cards_routes')(cardsRouter);

// Assign Routers
app.use(usersRouter);
app.use('/api', cardsRouter);

// Start Server (default port: 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

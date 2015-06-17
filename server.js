'use strict';

var express  = require('express' );
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// Routers
var cardsRouter = express.Router();
var oauth2Router = express.Router();
var usersRouter  = express.Router();

// Connect DB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hippo_dev');

// Initialize passport
app.use(passport.initialize());

// Load Strategies
require('./lib/passport_strategy.js')(passport);

// Load routers
require('./routes/cards_routes.js' )(cardsRouter           );
require('./routes/users_routes.js' )(usersRouter           );
require('./routes/oauth2_routes.js')(oauth2Router, passport);

// Assign Routers
app.use(cardsRouter);
app.use(oauth2Router);
app.use(usersRouter );

// Load static assets
var directory = process.env.WEBPACK_DIRECTORY || 'build';
app.use(express.static(__dirname + '/' + directory));
app.use(express.static('assets'));

// Start Server (default port: 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on port: ', process.env.PORT || 3000);
});

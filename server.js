//includes
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pass = require('./config/passport');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//routes
var routes = require('./app/routes/index');
var auth = require('./app/routes/auth');
var users = require('./app/routes/users');
var roles = require('./app/routes/roles');

var organizations = require('./app/routes/organizations');
var projects = require('./app/routes/projects');
var units = require('./app/routes/units');

//db connection
mongoose.connect('mongodb://localhost/construction');

//set view engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//route to front-end
app.use(express.static(path.join(__dirname, '/public/dist')));

//sessions
app.use(cookieParser());
app.use(session({ 
	secret: 'somesecret',
	resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);
app.use('/roles', roles);

app.use('/organizations', organizations);
app.use('/projects', projects);
app.use('/units', units);

//web server listening
app.listen(8000);
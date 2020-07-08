require('dotenv/config');

var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var bCrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var router = require('./router.js');
var Authrouter = require('./Authrouter.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
const ac = require('./config/access_control');

require('./passport')(passport);

app.use(bodyParser.urlencoded({extended:true}));

// Access public folder from root

app.use('/noty', express.static(__dirname + '/node_modules/noty/'));

app.accessControl = ac;

app.use(function(req, res, next) {
  res.locals.permission = ac;
  next();
});

app.use('/public', express.static('public'));
app.get('/layouts/', function(req, res) {
  res.render('view');
});

app.use(
  session({
    secret: 'alguma senha',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Add Authentication Route file with app
app.use('/', Authrouter); 

//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Add Route file with app
app.use('/', router); 

http.listen(8000, function(){
  console.log('listening on *:8000');
});

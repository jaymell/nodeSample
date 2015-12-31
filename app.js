// Load required packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

// Create our Express application
var app = express();
var exports = module.exports;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

// Add static middleware
var oneDay = 86400000;
var staticFilePath = __dirname + '/public';
app.use(express.static(staticFilePath, {maxAge: oneDay}));

exports.staticFilePath = staticFilePath;
exports.app = app;

var PORT = 80;
console.log('Starting app');
app.listen(PORT);

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const mongoose = require('mongoose');
const {secret, dbURL} = require('./config/main');

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('db connected'));

const api = require('./routes/api');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.enable("trust proxy");
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(session({ secret, resave: false, saveUninitialized: false}));

const configurePassport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({success: false, message});
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
//로그인 관련해서 컨트롤할 폴더
var user = require('./routes/user');
var board = require('./routes/board');
var reply = require('./routes/reply');
var session = require('express-session');

app.use(session({
      secret : 'random',
      name : 'sessionId',
      resave: true,
      saveUninitialized: true
    })
);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', user);
app.use('/board', board);
app.use('/reply', reply);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

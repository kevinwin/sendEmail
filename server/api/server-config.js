// **************** initialize dependencies ****************
var express = require('express');
var bodyParser = require('body-parser');
var handlers = require('./request-handlers.js');

var app = express();

// **************** enable middlewares ****************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// **************** configure routes ****************

app.post('/send', handlers.send);

module.exports = app;

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/test');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var session = require('express-session');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string'
}));

app.get('/api/session/set/:name/:value',
  setSession);

app.get('/api/session/get/:name',
  getSession);

app.get('/api/session/get',
  getSessionAll);

app.get('/api/session/reset',
  resetSession);

function setSession(req, res) {
  var name = req.params['name'];
  var value = req.params['value'];

  req.session[name] = value;
  res.send(value);
  // res.send(session);
}

function getSession(req, res) {
  var name = req.params['name'];
  var value = req.session[name];
  res.send(value);
}

function getSessionAll(req, res) {
  res.send(req.session);
}

function resetSession(req, res) {
  req.session.destroy();
  res.send(200);
}

app.get('/', function (req, res) {
  res.send('Hello world')
});

app.get('/message', function (req, res) {
  res.send('Message');
});

app.get('/message/:theMessage', function (req, res) {
  var theMessage = req.params['theMessage'];
  res.send(theMessage);
});


var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);

require('./services/enrollment.service.server')(app);

app.listen(4000);    // port
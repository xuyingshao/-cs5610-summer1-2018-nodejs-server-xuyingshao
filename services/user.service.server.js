module.exports = function (app) {

  app.get('/api/user', findAllUsers);
  app.post('/api/user', register);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);


  var userModel = require('../models/user/user.model.server');

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }

  function register(req, res) {
    var user = req.body;

    userModel.findUserByUsername(user.username)
      .then(function (data) {
        if (data.length !== 0) {
          res.sendStatus(409);
        } else {
          userModel.createUser(user)
            .then(function (user) {
              req.session['currentUser'] = user;
              res.json(user);
            })
        }
      });
  }

  function profile(req, res) {
    res.json(req.session['currentUser']);
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function login(req, res) {
    var user = req.body;
    userModel.findUserByCredentials(user)
      .then(function (user) {
        if (user === null) {
          res.sendStatus(404);
        }
        else {
          req.session['currentUser'] = user;
          res.json(user);
        }
      })
  }
}
;
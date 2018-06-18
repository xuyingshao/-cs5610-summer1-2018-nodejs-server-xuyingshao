module.exports = function (app) {

  app.post('/api/register', register);
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.get('/api/profile', profile);
  app.put('/api/profile', updateProfile);
  app.delete('/api/profile', deleteProfile);
  app.get('/api/user', findAllUsers);

  var userModel = require('../models/user/user.model.server');

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


  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }


  function profile(req, res) {
    var currentUser = req.session['currentUser'];

    if (currentUser === undefined) {
      res.sendStatus(404);
    }
    else {
      var userId = currentUser._id;
      userModel.findUserById(userId)
        .then(function (users) {
          res.json(users[0]);
        });
    }
  }


  function updateProfile(req, res) {
    // var currentUser = req.session['currentUser'];
    // var userId = currentUser._id;
    var user = req.body;

    userModel.updateUser(user)
      .then(function(response) {
        res.json(response);
      })
  }

  function deleteProfile(req, res) {
    var currentUser = req.session['currentUser'];
    var userId = currentUser._id;

    userModel.deleteProfile(userId)
      .then(function(user) {
        res.json(user);
      })
  }


  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }
};
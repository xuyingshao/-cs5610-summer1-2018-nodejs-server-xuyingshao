var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function findUserByCredentials(user) {
  return userModel.findOne(user, {username: 1});
}

function findUserByUsername(username) {
  return userModel.find({username: username});
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername
};

module.exports = api;
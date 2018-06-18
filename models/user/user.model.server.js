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

function findUserById(userId) {
  return userModel.find({_id: userId});
}

function updateUser(user) {
  return userModel.update({username: user.username},
    {
      $set: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
}

function deleteProfile(userId) {
  return userModel.update({_id: userId}, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  findUserById: findUserById,
  updateUser: updateUser,
  deleteProfile: deleteProfile
};

module.exports = api;
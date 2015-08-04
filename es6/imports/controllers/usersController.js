'use strict';

import User from '../models/users';
import co from 'co';
import config from "../conf/config";

let UserController = {};

UserController.create = (username, password, email, admin) => {
  let user = new User({username: username, password: password, email: email, admin: admin});
  let fn = co(function* () {
    yield user.save().exec();
    console.log('user saved');
    return user;
  });
  return fn;
};

UserController.get = (username, password) => {
  let fn = co(function* () {
    let results = yield User.findOne({username: username, password: password}).exec();

    // Generate Token
    let jwttoken = require('jsonwebtoken');    
    let secret = config.secret;
    let token = jwttoken.sign(results, secret);

    console.log('user get');    
    return {'username': results.username, 'id' : results._id, 'email': results.email, 'admin': results.admin, 'token': token};
  });
  return fn;
};

UserController.getById = (id) => {
  let fn = co(function* () {
    let results = yield User.findOne({_id: id}).exec();
    console.log('user getById');
    return results;
  });
  return fn;
};

UserController.getByUsername = (username) => {
  let fn = co(function* () {
    let results = yield User.findOne({username: username}).exec();
    console.log('user getByUsername');
    return results;
  });
  return fn;
};

UserController.list = () => {
  let fn = co(function* () {
    console.log('users list');
    let results = yield User.find().exec();   
    return results;
  });
  return fn;
};

UserController.update = (id, user) => {
  let fn = co(function* () {
    let newUser = {};
    newUser.username = user.username;
    newUser.email = user.email;

    let results = yield User.findByIdAndUpdate(id, { $set: newUser}, {new: true}).exec();
    return results;   
  });
  return fn;
};

UserController.removeAll = () => {
  let fn = co(function* () {
    let results = yield User.remove().exec();
    console.log('users removed');
    return results;
  });
  return fn;
};

UserController.remove = (id) => {
  let fn = co(function* () {
    let results = yield User.remove({'_id': id}).exec();
    console.log('users removed');
    return results;
  });
  return fn;
};


export default UserController;
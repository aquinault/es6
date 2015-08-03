'use strict';

import User from '../models/users';
import co from 'co';
import config from "../conf/config";

let UserController = {};

UserController.create = (req, res, next) => {
  let user = new User({username: req.body.username, password: req.body.password, email: req.body.email, admin: req.body.admin});
  Co(function* () {
    yield user.save().exec();
    console.log('user saved');
    res.send(user);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

UserController.get = (req, res, next) => {
  Co(function* () {
    let results = yield User.findOne({username: req.body.username, password: req.body.password}).exec();

    // Generate Token
    let jwttoken = require('jsonwebtoken');    
    let secret = config.secret;
    let token = jwttoken.sign(results, secret);

    console.log('user get');
    res.send({'username': results.username, 'id' : results._id, 'email': results.email, 'admin': results.admin, 'token': token});
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

UserController.getById = (req, res, next) => {
  Co(function* () {
    let results = yield User.findOne({_id: req.params.id}).exec();
    console.log('user getById');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

UserController.getByUsername = (req, res, next) => {
  Co(function* () {
    let results = yield User.findOne({username: req.params.username}).exec();
    console.log('user getByUsername');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


UserController.remove = (req, res, next) => {
  Co(function* () {
    let results = yield User.remove({'_id': req.params.id}).exec();
    console.log('users removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


UserController.list = () => {
  var fn = co(function* () {
    console.log('users list');
    let results = yield User.find().exec();   
    return results;
  });
  return fn;
};

UserController.update = (id, user) => {
  console.log("aaa");
  var fn = co(function* () {
    let newUser = {};
    newUser.username = user.username;
    newUser.email = user.email;

    let results = yield User.findByIdAndUpdate(id, { $set: newUser}, {new: true}).exec();
    return results;   
  })
  return fn;
};



UserController.removeAll = (req, res, next) => {
  Co(function* () {
    let results = yield User.remove().exec();
    console.log('users removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

UserController.remove = (req, res, next) => {
  Co(function* () {
    let results = yield User.remove({'_id': req.params.id}).exec();
    console.log('users removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


export default UserController;
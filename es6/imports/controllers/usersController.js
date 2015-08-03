'use strict';

import User from '../models/users';
import Co from 'co';
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


UserController.list = (req, res) => {
  Co(function* () {
    let results = yield User.find().exec();
    console.log('users list');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  });
};

/*
UserController.list = (req, res, next) => {
  Co(function* () {
    let results = yield User.find().exec();
    console.log('users list');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};
*/

//
UserController.update = (req, res) => {
  Co(function* () {
    //{new: true} option return the modified object
    let newObject = Object.assign({}, req.body/*, {admin:false}*/);
    delete newObject.created_at;
    delete newObject.updated_at;
    delete newObject.admin;
    delete newObject.id;

    let results = yield User.findByIdAndUpdate(req.params.id, { $set: newObject}, {new: true}).exec();
    return (results)
  }).then((results) => {
    console.log('user update OK');
    res.send(results);
  }, (err) => {
    console.log('user update KO');
    res.send(422, err);
  });
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
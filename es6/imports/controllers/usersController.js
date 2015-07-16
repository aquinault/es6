'use strict';

import User from '../models/users';
import Co from 'co';

let UsersController = {};

UsersController.create = (req, res, next) => {
  let user = new User({name: req.body.name});
  Co(function* () {
    yield user.save();
    console.log('user saved');
    res.send(user);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

UsersController.list = (req, res, next) => {
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

UsersController.get = (req, res, next) => {
  Co(function* () {
    let results = yield User.findOne({'_id': req.params.id}).exec();
    console.log('user get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

//
UsersController.update = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    let results = yield User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name }}, {new: true}).exec();
    console.log('user get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


UsersController.removeAll = (req, res, next) => {
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

UsersController.remove = (req, res, next) => {
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


export default UsersController;
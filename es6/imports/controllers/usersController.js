'use strict';

import User from '../models/users';
import Co from 'co';

let UsersController = {};

UsersController.create = (req, res, next) => {
  //let user = new User({ name: 'Silence' })
  console.log(req.body);
  console.log(req.body.name);
  //let myUser = JSON.parse(req.body[0]);
  //console.log(req.body[0].name);
  //console.log(myUser.name);


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
  //let user = new User({ name: 'Silence' })
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

UsersController.remove = (req, res, next) => {
  //let user = new User({ name: 'Silence' })
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

export default UsersController;
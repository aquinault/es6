'use strict';

import mongoose from 'mongoose';
import Site from '../models/sites';
import Co from 'co';

let SitesController = {};

// req.body.name
// req.body.user_id
SitesController.create = (req, res, next) => {
  let site = new Site({name: req.body.name, user_id: mongoose.Types.ObjectId(req.body.user_id)});
  Co(function* () {
    yield site.save();
    console.log('site saved');
    res.send(site);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.user_id
SitesController.list = (req, res, next) => {
  Co(function* () {
    let results = yield Site.find({user_id: req.params.user_id}).exec();
    console.log('sites list');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.id
SitesController.get = (req, res, next) => {
  Co(function* () {
    let results = yield Site.findOne({'_id': req.params.id}).exec();
    console.log('site get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.id
// req.body.name
SitesController.update = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    let results = yield Site.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name }}, {new: true}).exec();
    console.log('site get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

SitesController.removeAll = (req, res, next) => {
  Co(function* () {
    let results = yield Site.remove().exec();
    console.log('sites removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.id
SitesController.remove = (req, res, next) => {
  Co(function* () {
    let results = yield Site.remove({'_id': req.params.id}).exec();
    console.log('sites removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


export default SitesController;
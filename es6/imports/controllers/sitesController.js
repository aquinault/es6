'use strict';

import mongoose from 'mongoose';
import Site from '../models/sites';
import co from 'co';

let SitesController = {};

SitesController.create = (name, user_id) => {
  let site = new Site({name: name, user_id: mongoose.Types.ObjectId(user_id)});
  let fn = co(function* () {
    yield site.save().exec();
    console.log('site saved');
    return site;
  });
  return fn;
};

SitesController.list = (user_id) => {
  let fn = co(function* () {
    let results = yield Site.find({user_id: user_id}).exec();
    console.log('sites list');
    return results;
  });
  return fn;
};

// req.params.id
SitesController.get = (id) => {
  let fn = co(function* () {
    let results = yield Site.findOne({'_id': id}).exec();
    console.log('site get');
    return results;
  });
  return fn;
};

// req.params.id
// req.body.name
SitesController.update = (id, site) => {
  let fn = co(function* () {
    let newSite = {};
    newSite.name = site.name;
    let results = yield Site.findByIdAndUpdate(id, { $set: newSite}, {new: true}).exec();
    return results;
  });
  return fn;
};

SitesController.removeAll = () => {
  let fn = co(function* () {
    let results = yield Site.remove().exec();
    console.log('sites removed');
    return results;
  });
  return fn;
};

// req.params.id
SitesController.remove = (id) => {
  let fn = co(function* () {
    let results = yield Site.remove({'_id': id}).exec();
    console.log('sites removed');
    return results;
  });
  return fn;
};


export default SitesController;
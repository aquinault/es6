'use strict';

import mongoose from 'mongoose';
import Site from '../models/sites';
import co from 'co';
import logger from '../conf/logger';

let SitesController = {};

SitesController.create = (name, user_id) => {
  let site = new Site({name: name, user_id: mongoose.Types.ObjectId(user_id)});
  let fn = co(function* () {
    //yield site.save().exec();
    yield site.save();
    logger.info('site saved');
    
    return site;
  });
  
  return fn;
};

SitesController.list = (user_id) => {
  let fn = co(function* () {
    let results = yield Site.find({user_id: user_id}).exec();
    logger.info('sites list');
    
    return results;
  });
  
  return fn;
};

// req.params.id
SitesController.get = (id) => {
  let fn = co(function* () {
    let results = yield Site.findOne({'_id': id}).exec();
    logger.info('site get');
    
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
    logger.info('sites removed');
    
    return results;
  });
  
  return fn;
};

// req.params.id
SitesController.remove = (id) => {
  let fn = co(function* () {
    let results = yield Site.remove({'_id': id}).exec();
    logger.info('sites removed');
    
    return results;
  });
  
  return fn;
};

export default SitesController;

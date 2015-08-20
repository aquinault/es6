'use strict';

import logger from '../conf/logger';
import config from "./config";
import Hit from '../models/hits';
import hitsController from '../controllers/hitsController';
import User from '../models/users';
import usersController from '../controllers/usersController';
import sitesController from '../controllers/sitesController';

import Co from 'co';

// Mongoose
// ---------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

var db = mongoose.connection;
db.on('error', (err) => {
  logger.error( 'MongoDB:' + err);
});
db.once('open', function (callback) {
  // yay!
});



Co(function* () {
  
  // Get user aquinault
  let results = yield usersController.get('aquinault', 'password');
  let user_id = results.data.id;
  logger.info('user_id : ' + user_id);

  // Create site for user
  let results2 = yield sitesController.create('site1', user_id);
  logger.info('results2 : ' + results2);
  let site_id = results2._id;
  logger.info('site_id : ' + site_id);
  
  // Create hits for site
  let ua = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'; 
  let date = new Date();
  let results3 = yield  hitsController.updateTracking(site_id, ua, date);  
  let hit_id = results3._id;
  logger.info('results3 : ' + results3);
  logger.info('hit_id : ' + hit_id);
  
	return 'Well done!';
  }).then((value) => {
    logger.info(value);
    mongoose.connection.close();
  }, (err) => {
    logger.error(err.stack);
    mongoose.connection.close();
});


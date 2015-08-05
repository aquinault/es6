'use strict';

import logger from '../conf/logger';
import config from "./config";
import User from '../models/users';
import Site from '../models/sites';
import Co from 'co';
import faker from 'faker';

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


let users = [{
    username: 'admin', password: 'admin', email: 'admin@admin.fr', admin: true
  }, {
		username: 'aquinault', password: 'password', email: 'aquinault@.fr', admin: true
	}, {
		username: 'user1', password: 'user1', email: 'user1@synabe.com', admin: false
	}];

 Co(function* () {
  yield User.remove();
  logger.info('users removed');

  yield Site.remove();
  logger.info('sites removed');
   
  for(let i = 0; i<users.length; i++) {
    // User
  	let user = new User(users[i]);
  	yield user.save();
  	logger.info('user saved : ' + user.username);

    // User's site
    let site = new Site({name: 'site_' + user.username , user_id: mongoose.Types.ObjectId(user._id)});
    yield site.save();
    logger.info('site saved : ' + site.name);
	}

	// Faker users	https://github.com/marak/Faker.js/
  for(let i = 0; i<2; i++) {
    // User
  	let user = new User({username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email(), admin: false});
  	yield user.save();
  	logger.info('user saved : ' + user.username);

    // User's site
    let site = new Site({name: 'site_' + user.username , user_id: mongoose.Types.ObjectId(user._id)});
    yield site.save();
    logger.info('site saved : ' + site.name);
	}

	return 'Well done!';
  }).then((value) => {
    logger.info(value);
    mongoose.connection.close();
  }, (err) => {
    logger.error(err.stack);
    mongoose.connection.close();
});

  
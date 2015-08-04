'use strict';

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
db.on('error', console.error.bind(console, 'connection error:'));
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
  console.log('users removed');

  yield Site.remove();
  console.log('sites removed');
   
  for(let i = 0; i<users.length; i++) {
    // User
  	let user = new User(users[i]);
  	yield user.save();
  	console.log('user saved : ' + user.username);

    // User's site
    let site = new Site({name: 'site_' + user.username , user_id: mongoose.Types.ObjectId(user._id)});
    yield site.save();
    console.log('site saved : ' + site.name);
	}

	// Faker users	https://github.com/marak/Faker.js/
  for(let i = 0; i<2; i++) {
    // User
  	let user = new User({username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email(), admin: false});
  	yield user.save();
  	console.log('user saved : ' + user.username);

    // User's site
    let site = new Site({name: 'site_' + user.username , user_id: mongoose.Types.ObjectId(user._id)});
    yield site.save();
    console.log('site saved : ' + site.name);
	}

	return 'Well done!';
  }).then((value) => {
    console.log(value);
    mongoose.connection.close();
  }, (err) => {
    console.log(err);
    mongoose.connection.close();
});

  
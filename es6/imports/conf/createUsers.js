'use strict';

import config from "./config";
import User from '../models/users';
import Co from 'co';

// Mongoose
// ---------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});


let user = new User({username: 'admin', password: 'admin', email: 'admin@admin.fr', admin: true});


 Co(function* () {
	yield User.remove();
    console.log('users removed');

    yield user.save();
    console.log('user saved');

	return 'Well done!'
  }).then((value) => {
    console.log(value);
	mongoose.connection.close();
  }, (err) => {
    console.log(err);
	mongoose.connection.close();
  });

  
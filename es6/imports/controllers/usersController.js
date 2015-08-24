'use strict';

import User from '../models/users';
import co from 'co';
import config from "../conf/config";
import logger from '../conf/logger';
import responseFormatter from '../utils/responseFormatter';

let UserController = {};

UserController.create = (username, password, email, admin) => {
  let user = new User({username: username, password: password, email: email, admin: admin});
  let fn = co(function* () {
    yield user.save();
    logger.info('user saved');
    
    return user;
  });
  
  return fn;
};

// Json Api Ref implementation : https://google-styleguide.googlecode.com/svn/trunk/jsoncstyleguide.xml
UserController.get = (username, password) => {
  let fn = co(function* () {
    let results = yield User.findOne({username: username, password: password}).exec();
    if(!results) {
      let json = responseFormatter.error('0.1', 'Authentication failed', {"domain" : "Auth", 
                                                                          "message" : "Username / Password not found"});
      /*
      let json = {
        "apiVersion": "0.1",
        "error": {
          "code": 401,
          "message": "Authentication failed",
          "errors": [{
            "domain": "Auth",
            "message": "Username / Password not found"
          }]          
        }
      }; */
      return json;
    }

    // Generate Token
    let jwttoken = require('jsonwebtoken');    
    let secret = config.secret;
    let token = jwttoken.sign(results, secret);
    logger.info('user get');    
    
    let json = responseFormatter.data('0.1', {"id" : results._id, 
                                              "message" : "User authenticated", 
                                              "username": results.username,
                                              "email": results.email,
                                              "admin": results.admin, 
                                              "token": token });
    /*
    let json = {
      "apiVersion": "0.1",
      "data": {
        "id" : results._id,
        "message": "User authenticated",
        "username": results.username,
        "email": results.email,
        "admin": results.admin, 
        "token": token
      }
    };
    */
    
    return json;
  });
  
  return fn;
};
/*
UserController.get = (username, password) => {
  let fn = co(function* () {

    let results = yield User.findOne({username: username, password: password}).exec();
    console.log('---------');
    console.log(results);
    console.log('---------');
    if(!results) {
      return {'code': 401};
    }

    // Generate Token
    let jwttoken = require('jsonwebtoken');    
    let secret = config.secret;
    let token = jwttoken.sign(results, secret);

    logger.info('user get');    
    return {'username': results.username, 'id' : results._id, 'email': results.email, 'admin': results.admin, 'token': token};
  });
  return fn;
};
*/
UserController.getById = (id) => {
  let fn = co(function* () {
    let results = yield User.findOne({_id: id}).exec();
    logger.info('user getById');
    
    return results;
  });
  
  return fn;
};

UserController.getByUsername = (username) => {
  let fn = co(function* () {
    let results = yield User.findOne({username: username}).exec();
    logger.info('user getByUsername');
    
    return results;
  });
  
  return fn;
};

UserController.list = () => {
  let fn = co(function* () {
    logger.info('users list');
    let results = yield User.find().exec();   
    
    return results;
  });
  
  return fn;
};

UserController.update = (id, user) => {
  let fn = co(function* () {
    let newUser = {};
    newUser.username = user.username;
    newUser.email = user.email;

    let results = yield User.findByIdAndUpdate(id, { $set: newUser}, {new: true}).exec();
    
    return results;   
  });
  
  return fn;
};

UserController.removeAll = () => {
  let fn = co(function* () {
    let results = yield User.remove().exec();
    logger.info('users removed');
    
    return results;
  });
  
  return fn;
};

UserController.remove = (id) => {
  let fn = co(function* () {
    let results = yield User.remove({'_id': id}).exec();
    logger.info('users removed');
    
    return results;
  });
  
  return fn;
};

export default UserController;

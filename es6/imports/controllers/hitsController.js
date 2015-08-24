'use strict';

import logger from '../conf/logger';
import mongoose from 'mongoose';
import Hit from '../models/hits';
import co from 'co';

let SitesController = {};

// req.params.site_index
SitesController.updateTracking = (site_id, ua, date) => {
  let fn = co(function* () {
    //logger.info({id2: req.params.site_id});
    var UAParser = require('ua-parser-js');
    var parser = new UAParser();
    //var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
    logger.info(parser.setUA(ua).getResult());

    let resultParser = parser.setUA(ua).getResult();    

    // Get current year, month, day
    //var date = new Date();
    let currentTime = {
      year : date.getFullYear().toString(),
      month : ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1),
      day : ((date.getDate()) < 10 ? "0" : "") + (date.getDate()),
      hour : (date.getHours() < 10 ? "0" : "") + date.getHours(),
      min : (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    }
    
    logger.info('a');
    // logger.info(currentTime);
    // And update id2 = user_id:year
    let update = {};  
    update['$inc'] = {};
    update['$inc']['views'] = 1;
    update['$inc']['b.'+ resultParser.browser.name.replace(' ', '_') +'.' + resultParser.browser.major] = 1;
    update['$inc']['p.'+ resultParser.os.name.replace(' ', '_') +'.' + resultParser.os.version] = 1;
    update['$set'] = {};
    update['$set']['updated_at'] = date;
    update['$setOnInsert'] = {};
    update['$setOnInsert']['created_at'] = date;
    update['$set']['date'] = currentTime.year;

    logger.info('b');

    logger.info('b1');
    let id2 = site_id + ':' + currentTime.year;
    logger.info('b2');
    logger.info(id2);
    logger.info(update);
    logger.info(resultParser.os);

    let results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    logger.info('c');

    // update id2 = user_id-year-month
    update['$set']['date'] = currentTime.year + '-' + currentTime.month;
    id2 = id2 + '-' + currentTime.month;

    logger.info('c1');

    results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    logger.info('d');

    // update id2 = user_id:year-month-day
    update['$set']['date'] = currentTime.year + '-' + currentTime.month + '-' + currentTime.day;
    id2 = id2 + '-' + currentTime.day;
    results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    // update id2 = user_id:year-month-day-hour
    update['$set']['date'] = currentTime.year + '-' + currentTime.month + '-' + currentTime.day + '-' + currentTime.hour;
    id2 = id2 + '-' + currentTime.hour;
    results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    // update id2 = user_id:year-month-day-hour-min
    update['$set']['date'] = currentTime.year + '-' + currentTime.month + '-' + currentTime.day + '-' + currentTime.hour + '-' + currentTime.min;
    id2 = id2 + '-' + currentTime.min;
    results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    logger.info('hit update');
    
    return results;
  });
  
  return fn;
};

// https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql/memento-des-expressions-regulieres
// RegEx  ^site_id:2014-08-10  -> year, month, day, hour 
// .{2,4}$ End with 2, 3 or 4 caracters 
SitesController.getTraffic = (site_id, date) => {
  let fn = co(function* () {
    let results = yield Hit.find({id2: { $regex: '^' + site_id + ':' + date + '-.{2,4}$'}}).exec();
    
    return results;
  });
  
  return fn;
};

// req.params.user_id
// RegEx  ^site_id -> start with side_id 
SitesController.listBySiteId = (site_id) => {
  let fn = co(function* () {
    let results = yield Hit.find({id2: { $regex: '^' + site_id }}).exec();
    logger.info('hits list');
    
    return results;
  });
  
  return fn;
};

// req.params.id
SitesController.get = (id) => {
  let fn = co(function* () {
    let results = yield Hit.findOne({'_id': id}).exec();
    logger.info('hit get');
    
    return results;
  });
  
  return fn
};

SitesController.removeAll = () => {
  let fn = co(function* () {
    let results = yield Hit.remove().exec();
    logger.info('hits removed');
    
    return results;
  });
  
  return fn;
};

// req.params.id
SitesController.remove = (id) => {
  let fn = co(function* () {
    let results = yield Hit.remove({'_id': id}).exec();
    logger.info('hits removed');
    
    return results;
  });
  
  return fn;
};

export default SitesController;
'use strict';

import mongoose from 'mongoose';
import Hit from '../models/Hits';
import Co from 'co';

let SitesController = {};


// req.params.site_index
SitesController.updateTracking = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    
    /*let data = {
      id2: req.params.site_id,
      browser_name: 'browser',
      platform: 'platform',
      site_id: new mongoose.Types.ObjectId(123),
      user_id: new mongoose.Types.ObjectId(123),
    };
    console.log(data);
    */

    console.log({id2: req.params.site_id});

    var UAParser = require('ua-parser-js');
    var parser = new UAParser();
    var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
    console.log(parser.setUA(ua).getResult());

    let resultParser = parser.setUA(ua).getResult();    


    // Get current year, month, day
    var date = new Date();
    let currentTime = {
      year : date.getFullYear().toString(),
      month : ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1),
      day : ((date.getDate()) < 10 ? "0" : "") + (date.getDate()),
      hour : (date.getHours() < 10 ? "0" : "") + date.getHours(),
      min : (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    }
    

    console.log(currentTime);
    // And update id2 = user_id:year
    let update = {};  
    update['$inc'] = {};
    update['$inc']['views'] = 1;
    update['$inc']['b.'+ resultParser.browser.name +'.' + resultParser.browser.major] = 1;
    update['$inc']['p.'+ resultParser.os.name +'.' + resultParser.os.version] = 1;
    update['$set'] = {};

    update['$set']['date'] = currentTime.year;
    let id2 = req.params.site_id + ':' + currentTime.year;
    let results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

    // update id2 = user_id-year-month
    update['$set']['date'] = currentTime.year + '-' + currentTime.month;
    id2 = id2 + '-' + currentTime.month;
    results = yield Hit.update( {id2: id2} ,update, {upsert: true}).exec();

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


    console.log('hit get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


SitesController.getTraffic = (req, res, next) => {
  Co(function* () {
    console.log({site_id:  req.params.site_id});
    console.log({date :  req.params.date});

    let site_id = req.params.site_id;
    let [year, month, day, hour, min] = req.params.date.split('-');

    const BY_YEAR = Symbol();
    const BY_MONTH = Symbol();
    const BY_DAY = Symbol();
    const BY_HOUR = Symbol();
    const BY_MINUTE = Symbol();
    
    let currentType = {  
        [BY_YEAR]: 0,
        [BY_MONTH]: 1,
        [BY_DAY]: 2,
        [BY_HOUR]: 3,
        [BY_MINUTE]: 4
    };

    let currLength = req.params.date.split('-').length;

    let i = 0, results = {};
    switch(currLength) {          

      case currentType[BY_MINUTE]:
      console.log("BY_MINUTE");
      let minutes = Array.from(new Array(60), (x,i) => site_id + ':' + year + '-' + month + '-' + day + '-' + hour + '-' + (i < 10 ? "0" : "") + i);
      console.log(minutes);
      results = yield Hit.find({'id2': { $in : minutes } }).select('-id2').select('-_id').exec();
      res.send(results);
      break;

      case currentType[BY_HOUR]:
      console.log("BY_HOUR");
      let hours = Array.from(new Array(24), (x,i) => site_id + ':' + year + '-' + month + '-' + day + '-' + (i < 10 ? "0" : "") + i);
      console.log(hours);
      results = yield Hit.find({'id2': { $in : hours } }).select('-id2').select('-_id').exec();
      res.send(results);
      break;

      case currentType[BY_DAY]:
      console.log("BY_DAY");
      let days = Array.from(new Array(31), (x,i) => site_id + ':' + year + '-' + month + '-' + ( (i+1) < 10 ? "0" : "") + (i+1) );
      console.log(days);
      results = yield Hit.find({'id2': { $in : days } }).select('-id2').select('-_id').exec();
      res.send(results);
      break;

      case currentType[BY_MONTH]:
      console.log("BY_MONTH");
      let months = Array.from(new Array(12), (x,i) => site_id + ':' + year + '-' + ((i + 1) < 10 ? "0" : "") + (i + 1) );
      console.log(months);
      results = yield Hit.find({'id2': { $in : months } }).select('-id2').select('-_id').exec();
      res.send(results);
      break;

      case currentType[BY_YEAR]:
      console.log("BY_YEAR");
      let years = Array.from(new Array(10), (x,i) => site_id + ':' + ("201" + i) );
      console.log(years);
      results = yield Hit.find({'id2': { $in : years } }).select('-id2').select('-_id').exec();
      res.send(results);
      break;

    }

  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.id2
// req.body.name
SitesController.update = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    let data = {
      id2: req.params.id2,
      browser_name: 'browser',
      platform: 'platform',
      site_id: new mongoose.Types.ObjectId(123),
      user_id: new mongoose.Types.ObjectId(123),
    };
    console.log(data);
    console.log({id2: req.params.id2});


    var UAParser = require('ua-parser-js');
    var parser = new UAParser();
    var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
    console.log(parser.setUA(ua).getResult());


    let results = yield Hit.update( {id2: req.params.id2} ,{$inc: {visit: 1}}, {upsert: true}).exec();
    console.log('hit get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

// req.params.user_id
SitesController.listByUserId = (req, res, next) => {
  Co(function* () {
    let results = yield Hit.find({user_id: req.params.user_id}).exec();
    console.log('hits list');
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
    let results = yield Hit.findOne({'_id': req.params.id}).exec();
    console.log('hit get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

SitesController.removeAll = (req, res, next) => {
  Co(function* () {
    let results = yield Hit.remove().exec();
    console.log('hits removed');
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
    let results = yield Hit.remove({'_id': req.params.id}).exec();
    console.log('hits removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


export default SitesController;
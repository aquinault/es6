'use strict';

import mongoose from 'mongoose';
import Hit from '../models/Hits';
import Co from 'co';

let SitesController = {};


// req.params.site_index
SitesController.updateTracking = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    let data = {
      id2: req.params.site_id,
      browser_name: 'browser',
      platform: 'platform',
      site_id: new mongoose.Types.ObjectId(123),
      user_id: new mongoose.Types.ObjectId(123),
    };
    console.log(data);
    console.log({id2: req.params.site_id});

    var UAParser = require('ua-parser-js');
    var parser = new UAParser();
    var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
    console.log(parser.setUA(ua).getResult());

    let resultParser = parser.setUA(ua).getResult();    

    var update = {};  
    update['$inc'] = {};
    update['$inc']['browser.'+ resultParser.browser.name +'.' + resultParser.browser.major] = 1;

    //let results = yield Hit.update( {id2: req.params.site_id} ,{$inc: {'browser.Chrome.37': 1}}, {upsert: true}).exec();
    let results = yield Hit.update( {id2: req.params.site_id} ,update, {upsert: true}).exec();

    console.log('hit get');
    res.send(results);
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
'use strict';

import Post from '../models/posts';
import Co from 'co';

let PostsController = {};

PostsController.create = (req, res, next) => {
  let post = new Post({name: req.body.name});
  Co(function* () {
    yield post.save();
    console.log('post saved');
    res.send(post);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

PostsController.list = (req, res, next) => {
  Co(function* () {
    //----------------
    var infos = {
      agent: req.headers['user-agent'], // User Agent we get from headers
      referrer: req.headers['referrer'], //  Likewise for referrer
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress, // Get IP - allow for proxy
      screen: { // Get screen info that we passed in url post data
        width: req.params.width,
        height: req.params.height
      }
    }
    console.log(infos);

    var UAParser = require('ua-parser-js');
    var parser = new UAParser();
    var ua = req.headers['user-agent'];     // user-agent header from an HTTP request
    console.log(parser.setUA(ua).getResult());
    //----------------


    let results = yield Post.find().exec();
    console.log('posts list');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

PostsController.get = (req, res, next) => {
  Co(function* () {
    let results = yield Post.findOne({'_id': req.params.id}).exec();
    console.log('post get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

//
PostsController.update = (req, res, next) => {
  Co(function* () {
    //{new: true} option return the modified object
    let results = yield Post.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name }}, {new: true}).exec();
    console.log('post get');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


PostsController.removeAll = (req, res, next) => {
  Co(function* () {
    let results = yield Post.remove().exec();
    console.log('posts removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};

PostsController.remove = (req, res, next) => {
  Co(function* () {
    let results = yield Post.remove({'_id': req.params.id}).exec();
    console.log('posts removed');
    res.send(results);
  }).then(() => {
    res.send(201)
  }, (err) => {
    res.send(422, err);
  }).then(next);
};


export default PostsController;
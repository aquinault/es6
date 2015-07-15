//main.js
//var ConsoleWrapper = require('./imports/ConsoleWrapper');
//import ConsoleWrapper from "./imports/ConsoleWrapper";

import Api from "./imports/Api";
import {Service1} from "./imports/Service1";
import co from 'co';

var restify = require('restify');
/*
var x = new ConsoleWrapper();
x.speak();
var api = new Api();
api.init();
*/


var service1 = new Service1();
service1.init();
//service1.savePost();

function onerror(err) {
  console.error(err.stack);
}

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());

server.get('/posts/', function (req, res, next) {
	co(function *(){
		let posts = yield service1.findPosts();	
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  		res.end(JSON.stringify(posts));
	  	return next();
	 }).catch(onerror); 	
});

server.del('/posts/', function (req, res, next) {
	co(function *(){
		let posts = yield service1.removePosts();	
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  		res.end(JSON.stringify(posts));
	  	return next();
	 }).catch(onerror); 	
});


server.post('/posts/', function (req, res, next) {
	co(function *(){
		//var newPost = req.body;
		var newPost = JSON.stringify(req.body);
		let posts = yield service1.addPost(newPost);	
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
  		res.end(JSON.stringify(posts));
	  	return next();
	 }).catch(onerror); 	
});



server.get('/echo2/:name', function (req, res, next) {
	res.send(req.params); 
	return next();
});

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});

process.on( 'SIGINT', function() {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

	// Disconnect Mongo
	service1.exit();

	// some other closing procedures go here
	process.exit( );
})

//main.js

import Api from "./imports/Api";
import co from 'co';

import UsersController from "./imports/controllers/usersController";


// Mongoose
// ---------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});
//-----------------------------------------------------------------


// Restify
// ---------------------------------------------------------------
var restify = require('restify');

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
		UsersController.list(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.get('/posts/:id', function (req, res, next) {
	co(function *(){
		UsersController.get(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.put('/posts/:id', function (req, res, next) {
	co(function *(){
		UsersController.update(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.del('/posts/', function (req, res, next) {
	co(function *(){		
		UsersController.removeAll(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.del('/posts/:id', function (req, res, next) {
	co(function *(){		
		UsersController.remove(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.post('/posts/', function (req, res, next) {
	co(function *(){
		UsersController.create(req, res, next);
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
//-----------------------------------------------------------------


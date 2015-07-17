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


// Restify JWT
// ---------------------------------------------------------------
var jwt = require('restify-jwt');
var jwttoken = require('jsonwebtoken');


// API AUTH
// ---------------------------------------------------------------
server.get('/token', (req, res) => {
	var secret = 'shhhhhhared-secret';
	var token = jwttoken.sign({foo: 'bar', admin: true}, secret);

    res.send(token);
    return next();
  });


server.get('/protected', jwt({secret: 'shhhhhhared-secret'}), function(req, res) {
	/* req.headers.authorization = 'Bearer ' + token;*/
	console.log(req.user);
	res.send(req.user);
    /*if (!req.user.admin) return res.send(401);
    res.send(200);*/
  });


// API POSTS
// ---------------------------------------------------------------
server.get('/posts/', (req, res, next) => {
	co(function *(){
		UsersController.list(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.get('/posts/:id', (req, res, next) => {
	co(function *(){
		UsersController.get(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.put('/posts/:id', (req, res, next) => {
	co(function *(){
		UsersController.update(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.del('/posts/', (req, res, next) => {
	co(function *(){		
		UsersController.removeAll(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.del('/posts/:id', (req, res, next) => {
	co(function *(){		
		UsersController.remove(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.post('/posts/', (req, res, next) => {
	co(function *(){
		UsersController.create(req, res, next);
		return next();
	 }).catch(onerror); 	
});


// SOME STUFF
// ---------------------------------------------------------------
server.get('/echo2/:name', (req, res, next) => {
	res.send(req.params); 
	return next();
});

server.listen(8080, () => {
	console.log('%s listening at %s', server.name, server.url);
});

process.on( 'SIGINT', () => {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

	// Disconnect Mongo
	//service1.exit();

	// some other closing procedures go here
	process.exit( );
})
//-----------------------------------------------------------------


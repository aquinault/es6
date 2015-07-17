//main.js

import Api from "./imports/Api";
import co from 'co';
import config from "./imports/conf/config";


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


// API AUTHENTIFICATION
// ---------------------------------------------------------------
import UserController from "./imports/controllers/usersController";

// Create user
server.post('/auth/user/', (req, res, next) => {
	co(function *(){
		UserController.create(req, res, next);
		return next();
	 }).catch(onerror); 	
});

// Delete user
server.del('/auth/user/:id', (req, res, next) => {
	co(function *(){
		UserController.remove(req, res, next);
		return next();
	 }).catch(onerror); 	
});

// Update User
server.put('/auth/users/:id', (req, res, next) => {
	co(function *(){
		UserController.update(req, res, next);
		return next();
	 }).catch(onerror); 	
});

// Login User
server.post('/auth/login/', (req, res, next) => {
	co(function *(){
		UserController.get(req, res, next);
		return next();
	 }).catch(onerror); 	
});

// Verify and Decode Token
server.post('/auth/token/decode/', (req, res) => {
	let secret = config.secret;
	let decoded = jwttoken.decode(req.body.token, {complete: true});
	//console.log(decoded);
	res.send(decoded);
	
    return next();
});

// Decode Token
server.post('/auth/token/verify/', (req, res) => {
	let secret = config.secret;
	let decoded = jwttoken.verify(req.body.token, secret, (err, decoded) => {
		if(err) {
			console.log('Token invalid');
			res.send(422, err);
		} else {
			console.log('Token valid');
			//console.log(decoded);
			res.send(decoded);
		    return next();	
		}
	});	
});


/*
server.get('/token', (req, res) => {
	var secret = 'shhhhhhared-secret';
	var token = jwttoken.sign({foo: 'bar', admin: true}, secret);

    res.send(token);
    return next();
  });
*/

server.get('/protected', jwt({secret: config.secret}), function(req, res) {
	/* req.headers.authorization = 'Bearer ' + token;*/
	console.log(req.user);
	res.send(req.user);
    /*if (!req.user.admin) return res.send(401);
    res.send(200);*/
  });



// API POSTS
// ---------------------------------------------------------------
import PostsController from "./imports/controllers/postsController";

server.get('/posts/', (req, res, next) => {
	co(function *(){
		PostsController.list(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.get('/posts/:id', (req, res, next) => {
	co(function *(){
		PostsController.get(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.put('/posts/:id', (req, res, next) => {
	co(function *(){
		PostsController.update(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.del('/posts/', (req, res, next) => {
	co(function *(){		
		PostsController.removeAll(req, res, next);
		return next();
	 }).catch(onerror); 	
});

server.del('/posts/:id', (req, res, next) => {
	co(function *(){		
		PostsController.remove(req, res, next);
		return next();
	 }).catch(onerror); 	
});


server.post('/posts/', (req, res, next) => {
	co(function *(){
		PostsController.create(req, res, next);
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


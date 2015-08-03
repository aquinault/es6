// main.js
import config from './imports/conf/config';

// Mongoose
// ---------------------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect(config.mongo_url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/* db.once('open', function () {
});
*/
// Restify
// ---------------------------------------------------------------
const restify = require('restify');

const server = restify.createServer({
	name: 'myapp',
	version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());

server.listen(8080, () => {
	console.log('%s listening at %s', server.name, server.url);
});

process.on('SIGINT', () => {
	console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
	// Disconnect Mongo
	// service1.exit();
	// some other closing procedures go here
	process.exit();
});

// API USERS AND AUTHENTIFICATION
// ---------------------------------------------------------------
import UsersApi from './imports/routes/usersApi';
let usersApi = new UsersApi(server);

// API TOKEN
// ---------------------------------------------------------------
import TokenApi from './imports/routes/tokenApi';
let tokenApi = new TokenApi(server);

// API POSTS
// ---------------------------------------------------------------
import PostsApi from './imports/routes/postsApi';
let postsApi = new PostsApi(server);

// API SITES
// ---------------------------------------------------------------
import SitesApi from './imports/routes/sitesApi';
let sitesApi = new SitesApi(server);

// API HITS
// ---------------------------------------------------------------
import HitsApi from './imports/routes/hitsApi';
let hitsApi = new HitsApi(server);


/* server.get('/echo2/:name', (req, res, next) => {
	res.send(req.params); 
	return next();
}); */

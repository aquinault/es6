//main.js
//var ConsoleWrapper = require('./imports/ConsoleWrapper');
import ConsoleWrapper from "./imports/ConsoleWrapper";
import Api from "./imports/Api";

//var restify = require('restify');

var x = new ConsoleWrapper();
x.speak();

var api = new Api();
api.init();


//var restify = require('restify');
/*
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params); 
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
*/
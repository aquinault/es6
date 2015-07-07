//main.js
//var ConsoleWrapper = require('./imports/ConsoleWrapper');
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _importsConsoleWrapper = require("./imports/ConsoleWrapper");

var _importsConsoleWrapper2 = _interopRequireDefault(_importsConsoleWrapper);

var _importsApi = require("./imports/Api");

var _importsApi2 = _interopRequireDefault(_importsApi);

//var restify = require('restify');

var x = new _importsConsoleWrapper2["default"]();
x.speak();

var api = new _importsApi2["default"]();
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
//# sourceMappingURL=main.js.map
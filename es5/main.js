//main.js
//var ConsoleWrapper = require('./imports/ConsoleWrapper');
//import ConsoleWrapper from "./imports/ConsoleWrapper";

"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _importsApi = require("./imports/Api");

var _importsApi2 = _interopRequireDefault(_importsApi);

var _importsService1 = require("./imports/Service1");

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var restify = require("restify");
/*
var x = new ConsoleWrapper();
x.speak();
var api = new Api();
api.init();
*/

var service1 = new _importsService1.Service1();
service1.init();
//service1.savePost();

function onerror(err) {
	console.error(err.stack);
}

var server = restify.createServer({
	name: "myapp",
	version: "1.0.0"
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.sanitizePath());

server.get("/posts/", function (req, res, next) {
	(0, _co2["default"])(regeneratorRuntime.mark(function callee$1$0() {
		var posts;
		return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return service1.findPosts();

				case 2:
					posts = context$2$0.sent;

					res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
					res.end(JSON.stringify(posts));
					return context$2$0.abrupt("return", next());

				case 6:
				case "end":
					return context$2$0.stop();
			}
		}, callee$1$0, this);
	}))["catch"](onerror);
});

server.del("/posts/", function (req, res, next) {
	(0, _co2["default"])(regeneratorRuntime.mark(function callee$1$0() {
		var posts;
		return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return service1.removePosts();

				case 2:
					posts = context$2$0.sent;

					res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
					res.end(JSON.stringify(posts));
					return context$2$0.abrupt("return", next());

				case 6:
				case "end":
					return context$2$0.stop();
			}
		}, callee$1$0, this);
	}))["catch"](onerror);
});

server.post("/posts/", function (req, res, next) {
	(0, _co2["default"])(regeneratorRuntime.mark(function callee$1$0() {
		var posts;
		return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.next = 2;
					return service1.addPost();

				case 2:
					posts = context$2$0.sent;

					res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
					res.end(JSON.stringify(posts));
					return context$2$0.abrupt("return", next());

				case 6:
				case "end":
					return context$2$0.stop();
			}
		}, callee$1$0, this);
	}))["catch"](onerror);
});

server.get("/echo2/:name", function (req, res, next) {
	res.send(req.params);
	return next();
});

server.listen(8080, function () {
	console.log("%s listening at %s", server.name, server.url);
});

process.on("SIGINT", function () {
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");

	// Disconnect Mongo
	service1.exit();

	// some other closing procedures go here
	process.exit();
});
//# sourceMappingURL=main.js.map
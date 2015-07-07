'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var Api = (function () {
		function Api() {
				var debug = arguments[0] === undefined ? false : arguments[0];

				_classCallCheck(this, Api);

				this.name = 'Social API!';
				console.log('Loading ', this.name); //this == the object instance.
		}

		_createClass(Api, [{
				key: 'init',
				value: function init() {
						var server = _restify2['default'].createServer({
								name: 'myapp',
								version: '1.0.0'
						});
						server.use(_restify2['default'].acceptParser(server.acceptable));
						server.use(_restify2['default'].queryParser());
						server.use(_restify2['default'].bodyParser());

						this._api1(server);

						server.listen(8080, function () {
								console.log('%s listening at %s', server.name, server.url);
						});
				}
		}, {
				key: '_api1',
				value: function _api1(server) {
						/*
      server.get('/echo/:name', function (req, res, next) {
      res.send(req.params); 
      return next();
      });*/

						server.get('/echo/:name', function (req, res, next) {
								res.send(req.params);
								return next();
						});
				}
		}]);

		return Api;
})();

module.exports = Api; //set what can be imported from this file
//# sourceMappingURL=../imports/api.js.map
'use strict';

Object.defineProperty(exports, '__esModule', {
		value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _mongorito = require('mongorito');

var _mongorito2 = _interopRequireDefault(_mongorito);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var Model = _mongorito2['default'].Model;

var Post = (function (_Model) {
		function Post() {
				_classCallCheck(this, Post);

				_get(Object.getPrototypeOf(Post.prototype), 'constructor', this).apply(this, arguments);
		}

		_inherits(Post, _Model);

		return Post;
})(Model);

function onerror(err) {
		// log any uncaught errors
		// co will not throw any errors you do not handle!!!
		// HANDLE ALL YOUR ERRORS!!!
		console.error(err.stack);
}

var Service1 = (function () {
		function Service1() {
				var debug = arguments[0] === undefined ? false : arguments[0];

				_classCallCheck(this, Service1);

				this.name = 'Service1 API!';
				console.log('Loading ', this.name); //this == the object instance.
		}

		_createClass(Service1, [{
				key: 'init',
				value: function init() {
						_mongorito2['default'].connect('localhost/blog2');
				}
		}, {
				key: 'findPosts',
				/*
    savePost(){
    co(function *(){
    // yield any promise
    var post = new Post({
      title: 'Node.js with --harmony rocks!',
      body: 'Long post body',
      author: {
          name: 'John Doe'
      }
    });
     		console.log(post.save);
    yield post.save();
    console.log("Saving Post1");		
    }).catch(onerror);
    }  */
				value: regeneratorRuntime.mark(function findPosts() {
						var posts;
						return regeneratorRuntime.wrap(function findPosts$(context$2$0) {
								while (1) switch (context$2$0.prev = context$2$0.next) {
										case 0:
												context$2$0.next = 2;
												return Post.all();

										case 2:
												posts = context$2$0.sent;

												console.log('Find Posts');
												console.log(posts);
												return context$2$0.abrupt('return', posts);

										case 6:
										case 'end':
												return context$2$0.stop();
								}
						}, findPosts, this);
				})
		}, {
				key: 'removePosts',
				value: regeneratorRuntime.mark(function removePosts() {
						var posts;
						return regeneratorRuntime.wrap(function removePosts$(context$2$0) {
								while (1) switch (context$2$0.prev = context$2$0.next) {
										case 0:
												context$2$0.next = 2;
												return Post.remove();

										case 2:
												posts = context$2$0.sent;

												console.log('Remove Posts');
												console.log(posts);
												return context$2$0.abrupt('return', posts);

										case 6:
										case 'end':
												return context$2$0.stop();
								}
						}, removePosts, this);
				})
		}, {
				key: 'addPost',
				value: regeneratorRuntime.mark(function addPost() {
						var post, post2;
						return regeneratorRuntime.wrap(function addPost$(context$2$0) {
								while (1) switch (context$2$0.prev = context$2$0.next) {
										case 0:
												post = new Post({
														title: 'Node.js with --harmony rocks!',
														body: 'Long post body',
														author: {
																name: 'John Doe'
														}
												});
												context$2$0.next = 3;
												return post.save();

										case 3:
												post2 = context$2$0.sent;
												return context$2$0.abrupt('return', post2);

										case 5:
										case 'end':
												return context$2$0.stop();
								}
						}, addPost, this);
				})
		}, {
				key: 'exit',
				value: function exit() {
						_mongorito2['default'].disconnect();
				}
		}]);

		return Service1;
})();

exports.Service1 = Service1;

//module.exports = Service1; //set what can be imported from this file
//# sourceMappingURL=../imports/service1.js.map
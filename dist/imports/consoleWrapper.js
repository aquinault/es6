//imports/ConsoleWrapper.js
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConsoleWrapper = (function () {
    function ConsoleWrapper() {
        var debug = arguments[0] === undefined ? false : arguments[0];

        _classCallCheck(this, ConsoleWrapper);

        this.name = "Console wrapper!";
    }

    _createClass(ConsoleWrapper, [{
        key: "speak",
        value: function speak() {
            //debugger;
            console.log("Hello, I am ", this.name); //this == the object instance.
        }
    }]);

    return ConsoleWrapper;
})();

module.exports = ConsoleWrapper; //set what can be imported from this file
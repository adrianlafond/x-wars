'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xWars = require('./x-wars');

var _xWars2 = _interopRequireDefault(_xWars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _xWars2.default;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
var _config = new WeakMap();

/**
 * TODO: Add docs for @param config.
**/

var XWars = function () {
  function XWars(config) {
    _classCallCheck(this, XWars);

    this.initialize(config);
  }

  _createClass(XWars, [{
    key: 'initialize',
    value: function initialize(config) {
      _config.set(this, (0, _lodash2.default)(config));
    }
  }, {
    key: 'start',
    value: function start() {
      //
    }
  }, {
    key: 'reset',
    value: function reset() {
      //
    }
  }, {
    key: 'quit',
    value: function quit() {
      //
    }
  }, {
    key: 'do',
    value: function _do(action) {
      //
    }
  }, {
    key: 'back',
    value: function back() {
      //
    }
  }, {
    key: 'forward',
    value: function forward() {
      //
    }
  }, {
    key: 'go',
    value: function go(n) {
      //
    }
  }, {
    key: 'set',
    value: function set(prop, val) {
      //
    }
  }, {
    key: 'get',
    value: function get(prop) {
      switch (prop) {
        case 'config':
          return (0, _lodash2.default)(_config.get(this));
      }
    }
  }]);

  return XWars;
}();

exports.default = XWars;

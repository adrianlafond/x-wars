'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = require('./defaults.json');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Config = function () {
  function Config(config) {
    _classCallCheck(this, Config);

    this.config = config;
  }

  _createClass(Config, [{
    key: 'get',
    value: function get(prop) {
      switch (prop) {
        case 'defaults':
          return _defaults2.default;
        default:
          return this.config;
      }
    }
  }, {
    key: 'set',
    value: function set(prop, val) {
      //
    }
  }]);

  return Config;
}();

exports.default = Config;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Game is a decision-making engine that takes input and produces output.
 */
var Game = function Game(config, history) {
  _classCallCheck(this, Game);

  this.config = config;
  this.history = history;
};

exports.default = Game;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * History is a model of all states of the game, current and past.
 */
var History = function History() {
  _classCallCheck(this, History);
};

exports.default = History;
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

var _lodash = require('lodash');

var _config2 = require('./config');

var _config3 = _interopRequireDefault(_config2);

var _game2 = require('./game');

var _game3 = _interopRequireDefault(_game2);

var _history2 = require('./history');

var _history3 = _interopRequireDefault(_history2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Internal private data.
// @see http://2ality.com/2016/01/private-data-classes.html
var _config = new WeakMap();
var _game = new WeakMap();
var _history = new WeakMap();

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
      _config.set(this, new _config3.default((0, _lodash.cloneDeep)(config)));
    }
  }, {
    key: 'start',
    value: function start() {
      var history = _history.set(this, new _history3.default());
      var config = _config.get(this);
      _game.set(this, new _game3.default(config, history));
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
      _config.get(this).set(prop, val);
    }
  }, {
    key: 'get',
    value: function get(prop) {
      switch (prop) {
        case 'config':
          return (0, _lodash.cloneDeep)(_config.get(this));
      }
    }
  }]);

  return XWars;
}();

exports.default = XWars;

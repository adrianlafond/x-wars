'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

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

    this.config = (0, _lodash.assign)({}, (0, _lodash.cloneDeep)(_defaults2.default), (0, _lodash.cloneDeep)(config));
  }

  _createClass(Config, [{
    key: 'get',
    value: function get(prop) {
      switch (prop) {
        case 'defaults':
          return _defaults2.default;
        default:
          return this.config[prop] || this.config;
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _place = require('./place');

var _place2 = _interopRequireDefault(_place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Game is a decision-making engine that takes input and produces output.
 */
var Game = function () {
  function Game(config, history) {
    _classCallCheck(this, Game);

    this.config = config;
    this.history = history;
  }

  _createClass(Game, [{
    key: 'randomPlace',
    value: function randomPlace() {
      var locations = this.config.get('locations');
      var index = Math.floor(Math.random() * locations.length);
      return locations[index];
    }
  }, {
    key: 'start',
    value: function start() {
      var place = new _place2.default(this.randomPlace());
      return place.output();
    }
  }]);

  return Game;
}();

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

  this.data = [];
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Place = function () {
  function Place(place) {
    _classCallCheck(this, Place);

    this.place = place;
  }

  _createClass(Place, [{
    key: 'output',
    value: function output() {
      return {
        place: (0, _lodash.cloneDeep)(this.place)
      };
    }
  }]);

  return Place;
}();

exports.default = Place;
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
      var game = new _game3.default(config, history);
      _game.set(this, game);
      return game.start();
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

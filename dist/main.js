(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory(require("react"));
	else
		root["Component"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goTo = exports.getRouter = exports.initRouter = undefined;

var _director = __webpack_require__(6);

var _director2 = _interopRequireDefault(_director);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DirectorRouter = _director2.default.Router;

var router = null;

function initRouter(routes, config) {
  if (getRouter()) return getRouter();

  router = DirectorRouter(routes);
  router.configure(config);
  router.init();
  return router;
}

function getRouter() {
  return router;
}

function goTo(path) {
  setRouteFix();
  getRouter().setRoute(path);
}

// window.onpopstate pode estar indisponivel 
// durante o load da pagina.
// Por consequencia, redirects imediatos no carregamento
// podem não funcionar
function setRouteFix() {
  // Verifica se já redefiniu
  if (getRouter().setRoute.name === 'customSetRoute') return;

  var oldSetRoute = getRouter().setRoute;
  getRouter().setRoute = function customSetRoute(route) {
    var isDirectorReady = function isDirectorReady(callback) {
      var interval;

      if (window.onpopstate !== null) {
        callback();
        return;
      }
      interval = setInterval(function () {
        if (window.onpopstate !== null) {
          callback();
          clearInterval(interval);
        }
      }, 100);
    };

    isDirectorReady(function () {
      oldSetRoute.call(getRouter(), route);
    });
  };
}

exports.initRouter = initRouter;
exports.getRouter = getRouter;
exports.goTo = goTo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RoutingEngine = __webpack_require__(0);

function redirect(to) {
  (0, _RoutingEngine.goTo)(to);
}

exports.default = redirect;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoutingEngine = __webpack_require__(0);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(evt) {
      evt.preventDefault();

      var to = this.props.to;

      if (!to) return;

      (0, _RoutingEngine.goTo)(to);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          to = _props.to;


      return _react2.default.createElement(
        'a',
        { href: to, className: 'Link ' + (className || ''), onClick: this.handleClick.bind(this) },
        this.props.children
      );
    }
  }]);

  return Link;
}(_react.Component);

exports.default = Link;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = __webpack_require__(13);

var _queryString2 = _interopRequireDefault(_queryString);

var _RoutingEngine = __webpack_require__(0);

var _redirect = __webpack_require__(1);

var _redirect2 = _interopRequireDefault(_redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOT_FOUND_FALLBACK = '/not-found';

function parseRouteParams(path, args) {
  var paramNames = path.split('/').filter(function (item) {
    return item.indexOf(':') === 0;
  });

  var paramsObj = {};
  for (var i = 0; i < paramNames.length; i++) {
    var name = paramNames[i];
    paramsObj[name.substr(1)] = args[i];
  }

  return paramsObj;
}

function getQueryParams() {
  if (!window.location) return null;
  return _queryString2.default.parse(window.location.search);
}

var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(props) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));

    _this.state = {
      viewClass: null,
      route: null,
      params: {}
    };

    if (!props.routes) {
      throw new Error('Provide the router property "routes".');
    }

    if (!props.notFoundPath) {
      throw new Error('Provide the router property "notFoundPath".');
    }
    return _this;
  }

  _createClass(Router, [{
    key: 'execMiddlewares',
    value: function execMiddlewares(injectProps) {
      var _this2 = this;

      if (!this.props.middlewares) return;

      var middlewares = this.props.middlewares;

      var _middlewares = middlewares.slice();

      var shouldStop = false;

      var getArgsList = function getArgsList() {
        return Object.keys(injectProps).map(function (propName) {
          return injectProps[propName];
        });
      };
      var getNextMiddleware = function getNextMiddleware() {
        return _middlewares.shift();
      };
      var execMiddlewareLoop = function execMiddlewareLoop() {
        var middlewareFn = getNextMiddleware();
        if (middlewareFn) {

          var success = middlewareFn.apply(_this2, getArgsList());

          if (success === false) {
            shouldStop = true;
            return;
          } else {
            execMiddlewareLoop();
          }
        }
      };
      execMiddlewareLoop();

      return shouldStop;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this3 = this;

      var props = this.props;
      var injectProps = props.injectProps,
          notFoundPath = props.notFoundPath,
          middlewares = props.middlewares;


      var parsedRoutes = {};
      props.routes.forEach(function (route) {
        parsedRoutes[route.path] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (!route.viewClass) {
            throw new Error('The chosen route "' + route.path + '" should have a "viewClass" property.');
          }

          var params = parseRouteParams(route.path, args);
          var queryParams = getQueryParams();

          // Executa middlewares
          var middlewareProps = { props: injectProps, params: params, queryParams: queryParams, route: route };
          if (_this3.execMiddlewares(middlewareProps) === true) return;

          // Executa o handler da rota
          route.handler && route.handler(_extends({}, injectProps, { params: params, queryParams: queryParams }));

          // Modifica estado -> dispara render
          _this3.setState({ route: route, viewClass: route.viewClass, params: params, queryParams: queryParams });
        };
      });

      (0, _RoutingEngine.initRouter)(parsedRoutes, _extends({
        notfound: function notfound() {
          (0, _redirect2.default)(notFoundPath || NOT_FOUND_FALLBACK);
        },
        html5history: true,
        strict: false
      }, props.config));
    }

    // Adiciona os higher order components

  }, {
    key: 'wrapHOCs',
    value: function wrapHOCs(viewClass) {
      this.props.viewHOCs.forEach(function (hoc) {
        viewClass = hoc(viewClass);
      });

      return viewClass;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          viewClass = _state.viewClass,
          params = _state.params,
          queryParams = _state.queryParams;
      var injectProps = this.props.injectProps;


      if (!viewClass) return null;

      var View = this.wrapHOCs(viewClass);

      return _react2.default.createElement(View, _extends({}, injectProps, { params: params, queryParams: queryParams }));
    }
  }]);

  return Router;
}(_react.Component);

Router.propTypes = {
  routes: _propTypes2.default.array,
  notFoundPath: _propTypes2.default.string,
  injectProps: _propTypes2.default.object,
  middlewares: _propTypes2.default.array,
  viewHOCs: _propTypes2.default.array
};

Router.defaultProps = {
  injectProps: {},
  middlewares: [],
  viewHOCs: []
};

exports.default = Router;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + (typeof encodedURI === 'undefined' ? 'undefined' : _typeof(encodedURI)) + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
// Version 1.2.6
//

(function (exports) {

  /*
   * browser.js: Browser specific functionality for director.
   *
   * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
   * MIT LICENSE
   *
   */

  var dloc = document.location;

  function dlocHashEmpty() {
    // Non-IE browsers return '' when the address bar shows '#'; Director's logic
    // assumes both mean empty.
    return dloc.hash === '' || dloc.hash === '#';
  }

  var listener = {
    mode: 'modern',
    hash: dloc.hash,
    history: false,

    check: function check() {
      var h = dloc.hash;
      if (h != this.hash) {
        this.hash = h;
        this.onHashChanged();
      }
    },

    fire: function fire() {
      if (this.mode === 'modern') {
        this.history === true ? window.onpopstate() : window.onhashchange();
      } else {
        this.onHashChanged();
      }
    },

    init: function init(fn, history) {
      var self = this;
      this.history = history;

      if (!Router.listeners) {
        Router.listeners = [];
      }

      function onchange(onChangeEvent) {
        for (var i = 0, l = Router.listeners.length; i < l; i++) {
          Router.listeners[i](onChangeEvent);
        }
      }

      //note IE8 is being counted as 'modern' because it has the hashchange event
      if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7)) {
        // At least for now HTML5 history is available for 'modern' browsers only
        if (this.history === true) {
          // There is an old bug in Chrome that causes onpopstate to fire even
          // upon initial page load. Since the handler is run manually in init(),
          // this would cause Chrome to run it twise. Currently the only
          // workaround seems to be to set the handler after the initial page load
          // http://code.google.com/p/chromium/issues/detail?id=63040
          setTimeout(function () {
            window.onpopstate = onchange;
          }, 500);
        } else {
          window.onhashchange = onchange;
        }
        this.mode = 'modern';
      } else {
        //
        // IE support, based on a concept by Erik Arvidson ...
        //
        var frame = document.createElement('iframe');
        frame.id = 'state-frame';
        frame.style.display = 'none';
        document.body.appendChild(frame);
        this.writeFrame('');

        if ('onpropertychange' in document && 'attachEvent' in document) {
          document.attachEvent('onpropertychange', function () {
            if (event.propertyName === 'location') {
              self.check();
            }
          });
        }

        window.setInterval(function () {
          self.check();
        }, 50);

        this.onHashChanged = onchange;
        this.mode = 'legacy';
      }

      Router.listeners.push(fn);

      return this.mode;
    },

    destroy: function destroy(fn) {
      if (!Router || !Router.listeners) {
        return;
      }

      var listeners = Router.listeners;

      for (var i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i] === fn) {
          listeners.splice(i, 1);
        }
      }
    },

    setHash: function setHash(s) {
      // Mozilla always adds an entry to the history
      if (this.mode === 'legacy') {
        this.writeFrame(s);
      }

      if (this.history === true) {
        window.history.pushState({}, document.title, s);
        // Fire an onpopstate event manually since pushing does not obviously
        // trigger the pop event.
        this.fire();
      } else {
        dloc.hash = s[0] === '/' ? s : '/' + s;
      }
      return this;
    },

    writeFrame: function writeFrame(s) {
      // IE support...
      var f = document.getElementById('state-frame');
      var d = f.contentDocument || f.contentWindow.document;
      d.open();
      d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
      d.close();
    },

    syncHash: function syncHash() {
      // IE support...
      var s = this._hash;
      if (s != dloc.hash) {
        dloc.hash = s;
      }
      return this;
    },

    onHashChanged: function onHashChanged() {}
  };

  var Router = exports.Router = function (routes) {
    if (!(this instanceof Router)) return new Router(routes);

    this.params = {};
    this.routes = {};
    this.methods = ['on', 'once', 'after', 'before'];
    this.scope = [];
    this._methods = {};

    this._insert = this.insert;
    this.insert = this.insertEx;

    this.historySupport = (window.history != null ? window.history.pushState : null) != null;

    this.configure();
    this.mount(routes || {});
  };

  Router.prototype.init = function (r) {
    var self = this,
        routeTo;
    this.handler = function (onChangeEvent) {
      var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
      var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
      self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
    };

    listener.init(this.handler, this.history);

    if (this.history === false) {
      if (dlocHashEmpty() && r) {
        dloc.hash = r;
      } else if (!dlocHashEmpty()) {
        self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
      }
    } else {
      if (this.convert_hash_in_init) {
        // Use hash as route
        routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
        if (routeTo) {
          window.history.replaceState({}, document.title, routeTo);
        }
      } else {
        // Use canonical url
        routeTo = this.getPath();
      }

      // Router has been initialized, but due to the chrome bug it will not
      // yet actually route HTML5 history state changes. Thus, decide if should route.
      if (routeTo || this.run_in_init === true) {
        this.handler();
      }
    }

    return this;
  };

  Router.prototype.explode = function () {
    var v = this.history === true ? this.getPath() : dloc.hash;
    if (v.charAt(1) === '/') {
      v = v.slice(1);
    }
    return v.slice(1, v.length).split("/");
  };

  Router.prototype.setRoute = function (i, v, val) {
    var url = this.explode();

    if (typeof i === 'number' && typeof v === 'string') {
      url[i] = v;
    } else if (typeof val === 'string') {
      url.splice(i, v, s);
    } else {
      url = [i];
    }

    listener.setHash(url.join('/'));
    return url;
  };

  //
  // ### function insertEx(method, path, route, parent)
  // #### @method {string} Method to insert the specific `route`.
  // #### @path {Array} Parsed path to insert the `route` at.
  // #### @route {Array|function} Route handlers to insert.
  // #### @parent {Object} **Optional** Parent "routes" to insert into.
  // insert a callback that will only occur once per the matched route.
  //
  Router.prototype.insertEx = function (method, path, route, parent) {
    if (method === "once") {
      method = "on";
      route = function (route) {
        var once = false;
        return function () {
          if (once) return;
          once = true;
          return route.apply(this, arguments);
        };
      }(route);
    }
    return this._insert(method, path, route, parent);
  };

  Router.prototype.getRoute = function (v) {
    var ret = v;

    if (typeof v === "number") {
      ret = this.explode()[v];
    } else if (typeof v === "string") {
      var h = this.explode();
      ret = h.indexOf(v);
    } else {
      ret = this.explode();
    }

    return ret;
  };

  Router.prototype.destroy = function () {
    listener.destroy(this.handler);
    return this;
  };

  Router.prototype.getPath = function () {
    var path = window.location.pathname;
    if (path.substr(0, 1) !== '/') {
      path = '/' + path;
    }
    return path;
  };
  function _every(arr, iterator) {
    for (var i = 0; i < arr.length; i += 1) {
      if (iterator(arr[i], i, arr) === false) {
        return;
      }
    }
  }

  function _flatten(arr) {
    var flat = [];
    for (var i = 0, n = arr.length; i < n; i++) {
      flat = flat.concat(arr[i]);
    }
    return flat;
  }

  function _asyncEverySeries(arr, iterator, callback) {
    if (!arr.length) {
      return callback();
    }
    var completed = 0;
    (function iterate() {
      iterator(arr[completed], function (err) {
        if (err || err === false) {
          callback(err);
          callback = function callback() {};
        } else {
          completed += 1;
          if (completed === arr.length) {
            callback();
          } else {
            iterate();
          }
        }
      });
    })();
  }

  function paramifyString(str, params, mod) {
    mod = str;
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        mod = params[param](str);
        if (mod !== str) {
          break;
        }
      }
    }
    return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
  }

  function regifyString(str, params) {
    var matches,
        last = 0,
        out = "";
    while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
      last = matches.index + matches[0].length;
      matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
      out += str.substr(0, matches.index) + matches[0];
    }
    str = out += str.substr(last);
    var captures = str.match(/:([^\/]+)/ig),
        capture,
        length;
    if (captures) {
      length = captures.length;
      for (var i = 0; i < length; i++) {
        capture = captures[i];
        if (capture.slice(0, 2) === "::") {
          str = capture.slice(1);
        } else {
          str = str.replace(capture, paramifyString(capture, params));
        }
      }
    }
    return str;
  }

  function terminator(routes, delimiter, start, stop) {
    var last = 0,
        left = 0,
        right = 0,
        start = (start || "(").toString(),
        stop = (stop || ")").toString(),
        i;
    for (i = 0; i < routes.length; i++) {
      var chunk = routes[i];
      if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
        left = chunk.indexOf(start, last);
        right = chunk.indexOf(stop, last);
        if (~left && !~right || !~left && ~right) {
          var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
          routes = [tmp].concat(routes.slice((i || 1) + 1));
        }
        last = (right > left ? right : left) + 1;
        i = 0;
      } else {
        last = 0;
      }
    }
    return routes;
  }

  var QUERY_SEPARATOR = /\?.*/;

  Router.prototype.configure = function (options) {
    options = options || {};
    for (var i = 0; i < this.methods.length; i++) {
      this._methods[this.methods[i]] = true;
    }
    this.recurse = options.recurse || this.recurse || false;
    this.async = options.async || false;
    this.delimiter = options.delimiter || "/";
    this.strict = typeof options.strict === "undefined" ? true : options.strict;
    this.notfound = options.notfound;
    this.resource = options.resource;
    this.history = options.html5history && this.historySupport || false;
    this.run_in_init = this.history === true && options.run_handler_in_init !== false;
    this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
    this.every = {
      after: options.after || null,
      before: options.before || null,
      on: options.on || null
    };
    return this;
  };

  Router.prototype.param = function (token, matcher) {
    if (token[0] !== ":") {
      token = ":" + token;
    }
    var compiled = new RegExp(token, "g");
    this.params[token] = function (str) {
      return str.replace(compiled, matcher.source || matcher);
    };
    return this;
  };

  Router.prototype.on = Router.prototype.route = function (method, path, route) {
    var self = this;
    if (!route && typeof path == "function") {
      route = path;
      path = method;
      method = "on";
    }
    if (Array.isArray(path)) {
      return path.forEach(function (p) {
        self.on(method, p, route);
      });
    }
    if (path.source) {
      path = path.source.replace(/\\\//ig, "/");
    }
    if (Array.isArray(method)) {
      return method.forEach(function (m) {
        self.on(m.toLowerCase(), path, route);
      });
    }
    path = path.split(new RegExp(this.delimiter));
    path = terminator(path, this.delimiter);
    this.insert(method, this.scope.concat(path), route);
  };

  Router.prototype.path = function (path, routesFn) {
    var self = this,
        length = this.scope.length;
    if (path.source) {
      path = path.source.replace(/\\\//ig, "/");
    }
    path = path.split(new RegExp(this.delimiter));
    path = terminator(path, this.delimiter);
    this.scope = this.scope.concat(path);
    routesFn.call(this, this);
    this.scope.splice(length, path.length);
  };

  Router.prototype.dispatch = function (method, path, callback) {
    var self = this,
        fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""),
        invoked = this._invoked,
        after;
    this._invoked = true;
    if (!fns || fns.length === 0) {
      this.last = [];
      if (typeof this.notfound === "function") {
        this.invoke([this.notfound], {
          method: method,
          path: path
        }, callback);
      }
      return false;
    }
    if (this.recurse === "forward") {
      fns = fns.reverse();
    }
    function updateAndInvoke() {
      self.last = fns.after;
      self.invoke(self.runlist(fns), self, callback);
    }
    after = this.every && this.every.after ? [this.every.after].concat(this.last) : [this.last];
    if (after && after.length > 0 && invoked) {
      if (this.async) {
        this.invoke(after, this, updateAndInvoke);
      } else {
        this.invoke(after, this);
        updateAndInvoke();
      }
      return true;
    }
    updateAndInvoke();
    return true;
  };

  Router.prototype.invoke = function (fns, thisArg, callback) {
    var self = this;
    var _apply2;
    if (this.async) {
      _apply2 = function apply(fn, next) {
        if (Array.isArray(fn)) {
          return _asyncEverySeries(fn, _apply2, next);
        } else if (typeof fn == "function") {
          fn.apply(thisArg, (fns.captures || []).concat(next));
        }
      };
      _asyncEverySeries(fns, _apply2, function () {
        if (callback) {
          callback.apply(thisArg, arguments);
        }
      });
    } else {
      _apply2 = function _apply(fn) {
        if (Array.isArray(fn)) {
          return _every(fn, _apply2);
        } else if (typeof fn === "function") {
          return fn.apply(thisArg, fns.captures || []);
        } else if (typeof fn === "string" && self.resource) {
          self.resource[fn].apply(thisArg, fns.captures || []);
        }
      };
      _every(fns, _apply2);
    }
  };

  Router.prototype.traverse = function (method, path, routes, regexp, filter) {
    var fns = [],
        current,
        exact,
        match,
        next,
        that;
    function filterRoutes(routes) {
      if (!filter) {
        return routes;
      }
      function deepCopy(source) {
        var result = [];
        for (var i = 0; i < source.length; i++) {
          result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
        }
        return result;
      }
      function applyFilter(fns) {
        for (var i = fns.length - 1; i >= 0; i--) {
          if (Array.isArray(fns[i])) {
            applyFilter(fns[i]);
            if (fns[i].length === 0) {
              fns.splice(i, 1);
            }
          } else {
            if (!filter(fns[i])) {
              fns.splice(i, 1);
            }
          }
        }
      }
      var newRoutes = deepCopy(routes);
      newRoutes.matched = routes.matched;
      newRoutes.captures = routes.captures;
      newRoutes.after = routes.after.filter(filter);
      applyFilter(newRoutes);
      return newRoutes;
    }
    if (path === this.delimiter && routes[method]) {
      next = [[routes.before, routes[method]].filter(Boolean)];
      next.after = [routes.after].filter(Boolean);
      next.matched = true;
      next.captures = [];
      return filterRoutes(next);
    }
    for (var r in routes) {
      if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && _typeof(routes[r]) === "object" && !Array.isArray(routes[r]))) {
        current = exact = regexp + this.delimiter + r;
        if (!this.strict) {
          exact += "[" + this.delimiter + "]?";
        }
        match = path.match(new RegExp("^" + exact));
        if (!match) {
          continue;
        }
        if (match[0] && match[0] == path && routes[r][method]) {
          next = [[routes[r].before, routes[r][method]].filter(Boolean)];
          next.after = [routes[r].after].filter(Boolean);
          next.matched = true;
          next.captures = match.slice(1);
          if (this.recurse && routes === this.routes) {
            next.push([routes.before, routes.on].filter(Boolean));
            next.after = next.after.concat([routes.after].filter(Boolean));
          }
          return filterRoutes(next);
        }
        next = this.traverse(method, path, routes[r], current);
        if (next.matched) {
          if (next.length > 0) {
            fns = fns.concat(next);
          }
          if (this.recurse) {
            fns.push([routes[r].before, routes[r].on].filter(Boolean));
            next.after = next.after.concat([routes[r].after].filter(Boolean));
            if (routes === this.routes) {
              fns.push([routes["before"], routes["on"]].filter(Boolean));
              next.after = next.after.concat([routes["after"]].filter(Boolean));
            }
          }
          fns.matched = true;
          fns.captures = next.captures;
          fns.after = next.after;
          return filterRoutes(fns);
        }
      }
    }
    return false;
  };

  Router.prototype.insert = function (method, path, route, parent) {
    var methodType, parentType, isArray, nested, part;
    path = path.filter(function (p) {
      return p && p.length > 0;
    });
    parent = parent || this.routes;
    part = path.shift();
    if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
      part = regifyString(part, this.params);
    }
    if (path.length > 0) {
      parent[part] = parent[part] || {};
      return this.insert(method, path, route, parent[part]);
    }
    if (!part && !path.length && parent === this.routes) {
      methodType = _typeof(parent[method]);
      switch (methodType) {
        case "function":
          parent[method] = [parent[method], route];
          return;
        case "object":
          parent[method].push(route);
          return;
        case "undefined":
          parent[method] = route;
          return;
      }
      return;
    }
    parentType = _typeof(parent[part]);
    isArray = Array.isArray(parent[part]);
    if (parent[part] && !isArray && parentType == "object") {
      methodType = _typeof(parent[part][method]);
      switch (methodType) {
        case "function":
          parent[part][method] = [parent[part][method], route];
          return;
        case "object":
          parent[part][method].push(route);
          return;
        case "undefined":
          parent[part][method] = route;
          return;
      }
    } else if (parentType == "undefined") {
      nested = {};
      nested[method] = route;
      parent[part] = nested;
      return;
    }
    throw new Error("Invalid route context: " + parentType);
  };

  Router.prototype.extend = function (methods) {
    var self = this,
        len = methods.length,
        i;
    function extend(method) {
      self._methods[method] = true;
      self[method] = function () {
        var extra = arguments.length === 1 ? [method, ""] : [method];
        self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
      };
    }
    for (i = 0; i < len; i++) {
      extend(methods[i]);
    }
  };

  Router.prototype.runlist = function (fns) {
    var runlist = this.every && this.every.before ? [this.every.before].concat(_flatten(fns)) : _flatten(fns);
    if (this.every && this.every.on) {
      runlist.push(this.every.on);
    }
    runlist.captures = fns.captures;
    runlist.source = fns.source;
    return runlist;
  };

  Router.prototype.mount = function (routes, path) {
    if (!routes || (typeof routes === 'undefined' ? 'undefined' : _typeof(routes)) !== "object" || Array.isArray(routes)) {
      return;
    }
    var self = this;
    path = path || [];
    if (!Array.isArray(path)) {
      path = path.split(self.delimiter);
    }
    function insertOrMount(route, local) {
      var rename = route,
          parts = route.split(self.delimiter),
          routeType = _typeof(routes[route]),
          isRoute = parts[0] === "" || !self._methods[parts[0]],
          event = isRoute ? "on" : rename;
      if (isRoute) {
        rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [""])[0].length);
        parts.shift();
      }
      if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
        local = local.concat(parts);
        self.mount(routes[route], local);
        return;
      }
      if (isRoute) {
        local = local.concat(rename.split(self.delimiter));
        local = terminator(local, self.delimiter);
      }
      self.insert(event, local, routes[route]);
    }
    for (var route in routes) {
      if (routes.hasOwnProperty(route)) {
        insertOrMount(route, path.slice(0));
      }
    }
  };
})(( false ? 'undefined' : _typeof(exports)) === "object" ? exports : window);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var ReactPropTypesSecret = __webpack_require__(12);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(10)();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var strictUriEncode = __webpack_require__(14);
var objectAssign = __webpack_require__(9);
var decodeComponent = __webpack_require__(5);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
};

exports.parse = function (str, opts) {
	opts = objectAssign({ arrayFormat: 'none' }, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: this.parse(this.extract(str), opts)
	};
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Router = __webpack_require__(4);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Router).default;
  }
});

var _Link = __webpack_require__(3);

Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Link).default;
  }
});

var _redirect = __webpack_require__(1);

Object.defineProperty(exports, 'redirect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_redirect).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map
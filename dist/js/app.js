/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}
	var convertSourceMap = __webpack_require__(12);
	var sourceMapping = convertSourceMap.fromObject(cssMapping).toComment({ multiline: true });
	var sourceURLs = cssMapping.sources.map(function (source) {
		return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
	});
	return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.2.2
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

/**
 * Convert a value to a string that is actually rendered.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number';
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 */
function noop() {}

/**
 * Always return false.
 */
var no = function no() {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || []);
  }, []).join(',');
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
      // possible circular reference
      return a === b;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  };
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: ['component', 'directive', 'filter'],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return (/native code/.test(Ctor.toString())
  );
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function logError(err) {
      console.error(err);
    };
    timerFunc = function timerFunc() {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) {
        setTimeout(noop);
      }
    };
  } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function timerFunc() {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        cb.call(ctx);
      }
      if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      });
    }
  };
}();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

var perf;

if (process.env.NODE_ENV !== 'production') {
  perf = inBrowser && window.performance;
  if (perf && (!perf.mark || !perf.measure)) {
    perf = undefined;
  }
}

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

var warn = noop;
var tip = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + " " + (vm ? formatLocation(formatComponentName(vm)) : ''));
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + " " + (vm ? formatLocation(formatComponentName(vm)) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var formatLocation = function formatLocation(str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return "\n(found in " + str + ")";
  };
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value)) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1(obj, key, val, customSetter) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, childVal) : res;
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function' ? mergeOptions(parent, extendsFrom.options, vm) : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(capitalize).join(', ') + ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.', vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1];
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

function handleError(err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn("Error in " + info + ":", vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err;
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + "referenced during render. Make sure to declare reactive data " + "properties in the data option.", target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode() {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned;
}

function cloneVNodes(vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res;
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') {
      continue;
    }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || '') + "_" + i));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function getFirstComponentChild(children) {
  return children && children.filter(function (c) {
    return c && c.componentOptions;
  })[0];
}

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) && child.data && (name = child.data.slot)) {
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment || node.text === ' ';
}

function resolveScopedSlots(fns) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res;
}

/*  */

var activeInstance = null;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var startTag = "start " + name;
      var endTag = "end " + name;
      perf.mark(startTag);
      var vnode = vm._render();
      perf.mark(endTag);
      perf.measure(name + " render", startTag, endTag);
      perf.mark(startTag);
      vm._update(vnode, hydrating);
      perf.mark(endTag);
      perf.measure(name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  queue.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse(val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || !Object.isExtensible(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch) {
    initWatch(vm, opts.watch);
  }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn("\"" + key + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + keys[i] + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed(target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn("method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("method \"" + key + "\" has already been defined as a prop.", vm);
      }
    }
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
var hooksToMerge = Object.keys(hooks);

function createComponent(Ctor, data, context, children, tag) {
  if (!Ctor) {
    return;
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return;
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children });
  return vnode;
}

function createFunctionalComponent(Ctor, propsData, data, context, children) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function h(a, b, c, d) {
    return createElement(_context, a, b, c, d, true);
  };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function slots() {
      return resolveSlots(children, context);
    }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options);
}

function init(vnode, hydrating, parentElm, refElm) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch(oldVnode, vnode) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  updateChildComponent(child, options.propsData, // updated props
  options.listeners, // updated listeners
  vnode, // new parent vnode
  options.children // new children
  );
}

function insert(vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    activateChildComponent(vnode.componentInstance, true /* direct */);
  }
}

function destroy(vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */);
    }
  }
}

function resolveAsyncComponent(factory, baseCtor, cb) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function resolve(res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function reject(reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved;
  }
}

function extractProps(data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey) || checkProp(res, domProps, key, altKey);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (Ctor = resolveAsset(context.$options, 'components', tag)) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return;
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      slotNodes._rendered = true;
    }
    return slotNodes || fallback;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1;
  } else {
    return keyCodes !== eventKeyCode;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          data[key] = value[key];
        } else {
          var type = data.attrs && data.attrs.type;
          var hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          hash[key] = value[key];
        }
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender(vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };
}

function renderMixin(Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e) : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var inject = vm.$options.inject;
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray ? inject : hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          vm[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      perf.mark('init');
    }

    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false);
      perf.mark('init end');
      perf.measure(vm._name + " init", 'init', 'init end');
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
      }
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (pattern instanceof RegExp) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry(vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created() {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this.cache, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this.cache, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
        return vnode;
      }
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode;
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.2';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (parentNode = parentNode.parent) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class ? [child.class, parent.class] : parent.class
  };
}

function genClassFromData(data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  var res = '';
  if (!value) {
    return res;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if (stringified = stringifyClass(value[i])) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1);
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) {
        res += key + ' ';
      }
    }
    return res.slice(0, -1);
  }
  /* istanbul ignore next */
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isPreTag = function isPreTag(tag) {
  return tag === 'pre';
};

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef(s) {
  return s == null;
}

function isDef(s) {
  return s != null;
}

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.tag === vnode2.tag && vnode1.isComment === vnode2.isComment && !vnode1.data === !vnode2.data;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) {
        cbs[hooks$1[i]].push(modules[j][hooks$1[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) && config.isUnknownElement(tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) {
        i.create(emptyNode, vnode);
      }
      if (i.insert) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key && (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false;
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break;
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false;
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode) {
    if (vnode.tag) {
      return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class && (!oldData || !oldData.staticClass && !oldData.class)) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters(exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) {
        inSingle = false;
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) {
        inDouble = false;
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) {
        inTemplateString = false;
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) {
        inRegex = false;
      }
    } else if (c === 0x7C && // pipe
    exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;break; // "
        case 0x27:
          inSingle = true;break; // '
        case 0x60:
          inTemplateString = true;break; // `
        case 0x28:
          paren++;break; // (
        case 0x29:
          paren--;break; // )
        case 0x5B:
          square++;break; // [
        case 0x5D:
          square--;break; // ]
        case 0x7B:
          curly++;break; // {
        case 0x7D:
          curly--;break; // }
      }
      if (c === 0x2f) {
        // /
        var j = i - 1;
        var p = void 0;
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') {
            break;
          }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression;
}

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + "," + args;
  }
}

/*  */

function baseWarn(msg) {
  console.error("[Vue compiler]: " + msg);
}

function pluckModuleFunction(modules, key) {
  return modules ? modules.map(function (m) {
    return m[key];
  }).filter(function (_) {
    return _;
  }) : [];
}

function addProp(el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr(el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective(el, name, rawName, value, arg, modifiers) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler(el, name, value, modifiers, important) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
}

function getAndRemoveAttr(el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  return val;
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel(el, value, modifiers) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: "(" + value + ")",
    expression: "\"" + value + "\"",
    callback: "function (" + baseValueExpression + ") {" + assignment + "}"
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode(value, assignment) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return value + "=" + assignment;
  } else {
    return "var $$exp = " + modelRs.exp + ", $$idx = " + modelRs.idx + ";" + "if (!Array.isArray($$exp)){" + value + "=" + assignment + "}" + "else{$$exp.splice($$idx, 1, " + assignment + ")}";
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel(val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    };
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  };
}

function next() {
  return str.charCodeAt(++index$1);
}

function eof() {
  return index$1 >= len;
}

function isStringStart(chr) {
  return chr === 0x22 || chr === 0x27;
}

function parseBracket(chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue;
    }
    if (chr === 0x5B) {
      inBracket++;
    }
    if (chr === 0x5D) {
      inBracket--;
    }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break;
    }
  }
}

function parseString(chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break;
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model(el, dir, _warn) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1("<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" + "v-model does not support dynamic input types. Use v-if branches instead.");
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.");
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false;
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.');
  }

  // ensure runtime directive metadata
  return true;
}

function genCheckboxModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" + "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" + "}else{" + value + "=$$c}", null, true);
}

function genRadioModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
  addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + genAssignmentCode(value, assignment);
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel(el, value, modifiers) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', "(" + value + ")");
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1(event, _handler, once, capture) {
  if (once) {
    var oldHandler = _handler;
    var _target = target$1; // save current target element in closure
    _handler = function handler(ev) {
      var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, _handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, _handler, capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, vnode, checkVal) {
  return !elm.composing && (vnode.tag === 'option' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
}

function isDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal;
}

function isInputChanged(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (modifiers && modifiers.number || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal);
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim();
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && prop in testEl.style) {
    return prop;
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style && !oldData.staticStyle && !oldData.style) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return;
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm();
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (!fn) {
    return false;
  }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted(el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function cb() {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple ? binding.value.some(function (v) {
        return hasNoMatchingOption(v, el.options);
      }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false;
    }
  }
  return true;
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  return (/\d-keep-alive$/.test(rawChild.tag) ? h('keep-alive') : null
  );
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag;
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove != null) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if (process.env.NODE_ENV !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode(content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0;
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');

/*  */

var decoder;

function decode(html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent;
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
// attr value double quotes
/"([^"]*)"+/.source,
// attr value, single quotes
/'([^']*)'+/.source,
// attr value, no quotes
/([^\s"'=<>`]+)/.source];
var attribute = new RegExp('^\\s*' + singleAttrIdentifier.source + '(?:\\s*(' + singleAttrAssign.source + ')' + '\\s*(?:' + singleAttrValues.join('|') + '))?');

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr(value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) {
    return decodingMap[match];
  });
}

function parseHTML(html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue;
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue;
        }
      }

      var text = void 0,
          rest$1 = void 0,
          next = void 0;
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (!endTag.test(rest$1) && !startTagOpen.test(rest$1) && !comment.test(rest$1) && !conditionalComment.test(rest$1)) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) {
            break;
          }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text.replace(/<!--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return '';
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn("Mal-formatted tag at end of template: \"" + html + "\"");
      }
      break;
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') {
          delete args[3];
        }
        if (args[4] === '') {
          delete args[4];
        }
        if (args[5] === '') {
          delete args[5];
        }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, options.shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) {
      start = index;
    }
    if (end == null) {
      end = index;
    }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' && (i > pos || !tagName) && options.warn) {
          options.warn("tag <" + stack[i].tag + "> has no matching end tag.");
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

function parseText(text, delimiters) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while (match = tagRE.exec(text)) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push("_s(" + exp + ")");
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+');
}

/*  */

var dirRE = /^v-|^@|^:/;
var onRE = /^@|^v-on:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse(template, options) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function endPre(element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start(tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.');
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints(el) {
        if (process.env.NODE_ENV !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$2("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.');
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$2('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.');
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production' && !warned) {
          warned = true;
          warn$2("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.");
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) {
          // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end() {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars(text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
          warned = true;
          warn$2('Component template requires a root element, rather than just text.');
        }
        return;
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
        return;
      }
      var children = currentParent.children;
      text = inPre || text.trim() ? decodeHTMLCached(text)
      // only preserve whitespace if its not right after a starting tag
      : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root;
}

function processPre(el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs(el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey(el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef(el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor(el) {
  var exp;
  if (exp = getAndRemoveAttr(el, 'v-for')) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2("Invalid v-for expression: " + exp);
      return;
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf(el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.");
  }
}

function findPrevElement(children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.");
      }
      children.pop();
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce(el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot(el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.");
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent(el) {
  var binding;
  if (binding = getBindingAttr(el, 'is')) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs(el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) {
        // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') {
              name = 'innerHTML';
            }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else {
        // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.');
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor(el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

function parseModifiers(name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

function makeAttrsMap(attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

function isForbiddenTag(el) {
  return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug(attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res;
}

function checkForAliasModel(el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.");
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize(root, options) {
  if (!root) {
    return;
  }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1(keys) {
  return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs' + (keys ? ',' + keys : ''));
}

function markStatic$1(node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
      return;
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks(conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic(node) {
  if (node.type === 2) {
    // expression
    return false;
  }
  if (node.type === 3) {
    // text
    return true;
  }
  return !!(node.pre || !node.hasBindings && // no dynamic bindings
  !node.if && !node.for && // not v-if or v-for or v-else
  !isBuiltInTag(node.tag) && // not a built-in
  isPlatformReservedTag(node.tag) && // not a component
  !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}

function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false;
    }
    if (node.for) {
      return true;
    }
  }
  return false;
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function genGuard(condition) {
  return "if(" + condition + ")return null;";
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers(events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + genHandler(name, events[name]) + ",";
  }
  return res.slice(0, -1) + '}';
}

function genHandler(name, handler) {
  if (!handler) {
    return 'function(){}';
  }

  if (Array.isArray(handler)) {
    return "[" + handler.map(function (handler) {
      return genHandler(name, handler);
    }).join(',') + "]";
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression ? handler.value : "function($event){" + handler.value + "}"; // inline statement
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    var handlerCode = isMethodPath ? handler.value + '($event)' : isFunctionExpression ? "(" + handler.value + ")($event)" : handler.value;
    return "function($event){" + code + handlerCode + "}";
  }
}

function genKeyFilter(keys) {
  return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
}

function genFilterCode(key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return "$event.keyCode!==" + keyVal;
  }
  var alias = keyCodes[key];
  return "_k($event.keyCode," + JSON.stringify(key) + (alias ? ',' + JSON.stringify(alias) : '') + ")";
}

/*  */

function bind$1(el, dir) {
  el.wrapData = function (code) {
    return "_b(" + code + ",'" + el.tag + "'," + dir.value + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")";
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate(ast, options) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: "with(this){return " + code + "}",
    staticRenderFns: currentStaticRenderFns
  };
}

function genElement(el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el);
  } else if (el.for && !el.forProcessed) {
    return genFor(el);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el);
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0';
  } else if (el.tag === 'slot') {
    return genSlot(el);
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code;
  }
}

// hoist static sub-trees out
function genStatic(el) {
  el.staticProcessed = true;
  staticRenderFns.push("with(this){return " + genElement(el) + "}");
  return "_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
}

// v-once
function genOnce(el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el);
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break;
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$3("v-once can only be used inside v-for that is keyed. ");
      return genElement(el);
    }
    return "_o(" + genElement(el) + "," + onceCount++ + (key ? "," + key : "") + ")";
  } else {
    return genStatic(el);
  }
}

function genIf(el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice());
}

function genIfConditions(conditions) {
  if (!conditions.length) {
    return '_e()';
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions);
  } else {
    return "" + genTernaryExp(condition.block);
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp(el) {
    return el.once ? genOnce(el) : genElement(el);
  }
}

function genFor(el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
  var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

  if (process.env.NODE_ENV !== 'production' && maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
    warn$3("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + genElement(el) + '})';
}

function genData(el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) {
    data += dirs + ',';
  }

  // key
  if (el.key) {
    data += "key:" + el.key + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + el.ref + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + el.tag + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + genProps(el.attrs) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + genProps(el.props) + "},";
  }
  // event handlers
  if (el.events) {
    data += genHandlers(el.events) + ",";
  }
  if (el.nativeEvents) {
    data += genHandlers(el.nativeEvents, true) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + el.slotTarget + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += genScopedSlots(el.scopedSlots) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data;
}

function genDirectives(el) {
  var dirs = el.directives;
  if (!dirs) {
    return;
  }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']';
  }
}

function genInlineTemplate(el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (el.children.length > 1 || ast.type !== 1)) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
      return "function(){" + code + "}";
    }).join(',') + "]}";
  }
}

function genScopedSlots(slots) {
  return "scopedSlots:_u([" + Object.keys(slots).map(function (key) {
    return genScopedSlot(key, slots[key]);
  }).join(',') + "])";
}

function genScopedSlot(key, el) {
  return "[" + key + ",function(" + String(el.attrsMap.scope) + "){" + "return " + (el.tag === 'template' ? genChildren(el) || 'void 0' : genElement(el)) + "}]";
}

function genChildren(el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
      return genElement(el$1);
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return "[" + children.map(genNode).join(',') + "]" + (normalizationType ? "," + normalizationType : '');
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue;
    }
    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return needsNormalization(c.block);
    })) {
      res = 2;
      break;
    }
    if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return maybeComponent(c.block);
    })) {
      res = 1;
    }
  }
  return res;
}

function needsNormalization(el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}

function maybeComponent(el) {
  return !isPlatformReservedTag$1(el.tag);
}

function genNode(node) {
  if (node.type === 1) {
    return genElement(node);
  } else {
    return genText(node);
  }
}

function genText(text) {
  return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
  : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
}

function genSlot(el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? "," + children : '');
  var attrs = el.attrs && "{" + el.attrs.map(function (a) {
    return camelize(a.name) + ":" + a.value;
  }).join(',') + "}";
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')';
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return "_c(" + componentName + "," + genData(el) + (children ? "," + children : '') + ")";
}

function genProps(props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
  }
  return res.slice(0, -1);
}

// #3895, #4268
function transformSpecialNewlines(text) {
  return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors(ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors;
}

function checkNode(node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, "v-for=\"" + value + "\"", errors);
          } else if (onRE.test(name)) {
            checkEvent(value, name + "=\"" + value + "\"", errors);
          } else {
            checkExpression(value, name + "=\"" + value + "\"", errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent(exp, text, errors) {
  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
  if (keywordMatch) {
    errors.push("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
  }
  checkExpression(exp, text, errors);
}

function checkFor(node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier(ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push("invalid " + type + " \"" + ident + "\" in expression: " + text.trim());
  }
}

function checkExpression(exp, text, errors) {
  try {
    new Function("return " + exp);
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
    } else {
      errors.push("invalid expression: " + text.trim());
    }
  }
}

/*  */

function baseCompile(template, options) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
}

function makeFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop;
  }
}

function createCompiler(baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile(template, options) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(Object.create(baseOptions.directives), options.directives);
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled;
  }

  function compileToFunctions(template, options, vm) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
        }
      }
    }

    // check cache
    var key = options.delimiters ? String(options.delimiters) + template : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key];
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
          return "- " + e;
        }).join('\n') + '\n', vm);
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) {
          return tip(msg, vm);
        });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
          var err = ref.err;
          var code = ref.code;

          return err.toString() + " in\n\n" + code + "\n";
        }).join('\n'), vm);
      }
    }

    return functionCompileCache[key] = res;
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  };
}

/*  */

function transformNode(el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1(el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + el.staticClass + ",";
  }
  if (el.classBinding) {
    data += "class:" + el.classBinding + ",";
  }
  return data;
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1(el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.');
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2(el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + el.staticStyle + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + el.styleBinding + "),";
  }
  return data;
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [klass$1, style$1];

/*  */

function text(el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', "_s(" + dir.value + ")");
  }
}

/*  */

function html(el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', "_s(" + dir.value + ")");
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML;
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
    return this;
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn("Template element not found or is empty: " + options.template, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
        perf.mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && perf) {
        perf.mark('compile end');
        perf.measure(this._name + " compile", 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating);
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// jquery

var _bulma = __webpack_require__(26);

var _bulma2 = _interopRequireDefault(_bulma);

var _styles = __webpack_require__(27);

var _styles2 = _interopRequireDefault(_styles);

var _app = __webpack_require__(18);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(25);

// Styles


// Fire App


// Eeady event
$(document).ready(function () {
    // console.log('ready!');
});

// Custom code
//
//

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'custom-component',
    data: function () {
        return {

            path: '../src/components/component.vue',
            title: 'Imported Goodies',
            content: 'This is a single file <strong>.Vue</strong> component'

        };
    },
    mounted: function () {},
    methods: {}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*! bulma.io v0.3.2 | MIT License | github.com/jgthms/bulma */\n@-webkit-keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n@keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n  }\n}\n\n/*! minireset.css v0.0.2 | MIT License | github.com/jgthms/minireset.css */\nhtml,\nbody,\np,\nol,\nul,\nli,\ndl,\ndt,\ndd,\nblockquote,\nfigure,\nfieldset,\nlegend,\ntextarea,\npre,\niframe,\nhr,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  padding: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: 100%;\n  font-weight: normal;\n}\n\nul {\n  list-style: none;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n* {\n  box-sizing: inherit;\n}\n\n*:before, *:after {\n  box-sizing: inherit;\n}\n\nimg,\nembed,\nobject,\naudio,\nvideo {\n  height: auto;\n  max-width: 100%;\n}\n\niframe {\n  border: 0;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n  text-align: left;\n}\n\nhtml {\n  background-color: white;\n  font-size: 14px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  min-width: 300px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  text-rendering: optimizeLegibility;\n}\n\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nsection {\n  display: block;\n}\n\nbody,\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n}\n\ncode,\npre {\n  -moz-osx-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  font-family: \"Inconsolata\", \"Consolas\", \"Monaco\", monospace;\n}\n\nbody {\n  color: #4a4a4a;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n}\n\na {\n  color: #00d1b2;\n  cursor: pointer;\n  text-decoration: none;\n  -webkit-transition: none 86ms ease-out;\n  transition: none 86ms ease-out;\n}\n\na:hover {\n  color: #363636;\n}\n\ncode {\n  background-color: whitesmoke;\n  color: #ff3860;\n  font-size: 0.8em;\n  font-weight: normal;\n  padding: 0.25em 0.5em 0.25em;\n}\n\nhr {\n  background-color: #dbdbdb;\n  border: none;\n  display: block;\n  height: 1px;\n  margin: 1.5rem 0;\n}\n\nimg {\n  max-width: 100%;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  vertical-align: baseline;\n}\n\nsmall {\n  font-size: 0.8em;\n}\n\nspan {\n  font-style: inherit;\n  font-weight: inherit;\n}\n\nstrong {\n  color: #363636;\n  font-weight: 700;\n}\n\npre {\n  background-color: whitesmoke;\n  color: #4a4a4a;\n  font-size: 0.8em;\n  white-space: pre;\n  word-wrap: normal;\n}\n\npre code {\n  background: none;\n  color: inherit;\n  display: block;\n  font-size: 1em;\n  overflow-x: auto;\n  padding: 1.25rem 1.5rem;\n}\n\ntable {\n  width: 100%;\n}\n\ntable td,\ntable th {\n  text-align: left;\n  vertical-align: top;\n}\n\ntable th {\n  color: #363636;\n}\n\n.is-block {\n  display: block;\n}\n\n@media screen and (max-width: 768px) {\n  .is-block-mobile {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-block-tablet {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-block-tablet-only {\n    display: block !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-block-touch {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-block-desktop {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-block-desktop-only {\n    display: block !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-block-widescreen {\n    display: block !important;\n  }\n}\n\n.is-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n@media screen and (max-width: 768px) {\n  .is-flex-mobile {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-flex-tablet {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-flex-tablet-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-flex-touch {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-flex-desktop {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-flex-desktop-only {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-flex-widescreen {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n}\n\n.is-inline {\n  display: inline;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-mobile {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-tablet {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-tablet-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-touch {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-desktop {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-desktop-only {\n    display: inline !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-widescreen {\n    display: inline !important;\n  }\n}\n\n.is-inline-block {\n  display: inline-block;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-block-mobile {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-block-tablet {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-block-tablet-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-block-touch {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-block-desktop {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-block-desktop-only {\n    display: inline-block !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-block-widescreen {\n    display: inline-block !important;\n  }\n}\n\n.is-inline-flex {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n\n@media screen and (max-width: 768px) {\n  .is-inline-flex-mobile {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-inline-flex-tablet {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-inline-flex-tablet-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-inline-flex-touch {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-inline-flex-desktop {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-inline-flex-desktop-only {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-inline-flex-widescreen {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n.is-clearfix:after {\n  clear: both;\n  content: \" \";\n  display: table;\n}\n\n.is-pulled-left {\n  float: left;\n}\n\n.is-pulled-right {\n  float: right;\n}\n\n.is-clipped {\n  overflow: hidden !important;\n}\n\n.is-overlay {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.has-text-centered {\n  text-align: center;\n}\n\n.has-text-left {\n  text-align: left;\n}\n\n.has-text-right {\n  text-align: right;\n}\n\n.is-hidden {\n  display: none !important;\n}\n\n@media screen and (max-width: 768px) {\n  .is-hidden-mobile {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .is-hidden-tablet {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .is-hidden-tablet-only {\n    display: none !important;\n  }\n}\n\n@media screen and (max-width: 999px) {\n  .is-hidden-touch {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .is-hidden-desktop {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1000px) and (max-width: 1191px) {\n  .is-hidden-desktop-only {\n    display: none !important;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .is-hidden-widescreen {\n    display: none !important;\n  }\n}\n\n.is-disabled {\n  pointer-events: none;\n}\n\n.is-marginless {\n  margin: 0 !important;\n}\n\n.is-paddingless {\n  padding: 0 !important;\n}\n\n.is-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.box {\n  background-color: white;\n  border-radius: 5px;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  display: block;\n  padding: 1.25rem;\n}\n\n.box:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\na.box:hover, a.box:focus {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #00d1b2;\n}\n\na.box:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #00d1b2;\n}\n\n.button {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.button:focus, .button.is-focused, .button:active, .button.is-active {\n  outline: none;\n}\n\n.button[disabled], .button.is-disabled {\n  pointer-events: none;\n}\n\n.button strong {\n  color: inherit;\n}\n\n.button .icon:first-child:not(:last-child) {\n  margin-left: -0.25rem;\n  margin-right: 0.5rem;\n}\n\n.button .icon:last-child:not(:first-child) {\n  margin-left: 0.5rem;\n  margin-right: -0.25rem;\n}\n\n.button .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.25rem);\n  margin-right: calc(-1px + -0.25rem);\n}\n\n.button .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0rem;\n}\n\n.button .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0rem;\n}\n\n.button .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0rem);\n  margin-right: calc(-1px + 0rem);\n}\n\n.button .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.5rem;\n}\n\n.button .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.5rem;\n}\n\n.button .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.5rem);\n  margin-right: calc(-1px + -0.5rem);\n}\n\n.button .icon.is-large:first-child:not(:last-child) {\n  margin-left: -1rem;\n}\n\n.button .icon.is-large:last-child:not(:first-child) {\n  margin-right: -1rem;\n}\n\n.button .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -1rem);\n  margin-right: calc(-1px + -1rem);\n}\n\n.button:hover, .button.is-hovered {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.button:focus, .button.is-focused {\n  border-color: #00d1b2;\n  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n  color: #363636;\n}\n\n.button:active, .button.is-active {\n  border-color: #4a4a4a;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #363636;\n}\n\n.button.is-link {\n  background-color: transparent;\n  border-color: transparent;\n  color: #4a4a4a;\n  text-decoration: underline;\n}\n\n.button.is-link:hover, .button.is-link.is-hovered, .button.is-link:focus, .button.is-link.is-focused, .button.is-link:active, .button.is-link.is-active {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-white {\n  background-color: white;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:hover, .button.is-white.is-hovered {\n  background-color: #f9f9f9;\n  border-color: transparent;\n  color: #0a0a0a;\n}\n\n.button.is-white:focus, .button.is-white.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);\n  color: #0a0a0a;\n}\n\n.button.is-white:active, .button.is-white.is-active {\n  background-color: #f2f2f2;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #0a0a0a;\n}\n\n.button.is-white.is-inverted {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-white.is-inverted:hover {\n  background-color: black;\n}\n\n.button.is-white.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-white.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-white.is-outlined:hover, .button.is-white.is-outlined:focus {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-outlined.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-white.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined:focus {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-black {\n  background-color: #0a0a0a;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:hover, .button.is-black.is-hovered {\n  background-color: #040404;\n  border-color: transparent;\n  color: white;\n}\n\n.button.is-black:focus, .button.is-black.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);\n  color: white;\n}\n\n.button.is-black:active, .button.is-black.is-active {\n  background-color: black;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: white;\n}\n\n.button.is-black.is-inverted {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-black.is-loading:after {\n  border-color: transparent transparent white white !important;\n}\n\n.button.is-black.is-outlined {\n  background-color: transparent;\n  border-color: #0a0a0a;\n  color: #0a0a0a;\n}\n\n.button.is-black.is-outlined:hover, .button.is-black.is-outlined:focus {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.button.is-black.is-outlined.is-loading:after {\n  border-color: transparent transparent #0a0a0a #0a0a0a !important;\n}\n\n.button.is-black.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: white;\n  color: white;\n}\n\n.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined:focus {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.button.is-light {\n  background-color: whitesmoke;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:hover, .button.is-light.is-hovered {\n  background-color: #eeeeee;\n  border-color: transparent;\n  color: #363636;\n}\n\n.button.is-light:focus, .button.is-light.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);\n  color: #363636;\n}\n\n.button.is-light:active, .button.is-light.is-active {\n  background-color: #e8e8e8;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #363636;\n}\n\n.button.is-light.is-inverted {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-light.is-inverted:hover {\n  background-color: #292929;\n}\n\n.button.is-light.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-light.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-light.is-outlined:hover, .button.is-light.is-outlined:focus {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-light.is-outlined.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-light.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined:focus {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-dark {\n  background-color: #363636;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:hover, .button.is-dark.is-hovered {\n  background-color: #2f2f2f;\n  border-color: transparent;\n  color: whitesmoke;\n}\n\n.button.is-dark:focus, .button.is-dark.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);\n  color: whitesmoke;\n}\n\n.button.is-dark:active, .button.is-dark.is-active {\n  background-color: #292929;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: whitesmoke;\n}\n\n.button.is-dark.is-inverted {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-dark.is-inverted:hover {\n  background-color: #e8e8e8;\n}\n\n.button.is-dark.is-loading:after {\n  border-color: transparent transparent whitesmoke whitesmoke !important;\n}\n\n.button.is-dark.is-outlined {\n  background-color: transparent;\n  border-color: #363636;\n  color: #363636;\n}\n\n.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined:focus {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-outlined.is-loading:after {\n  border-color: transparent transparent #363636 #363636 !important;\n}\n\n.button.is-dark.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: whitesmoke;\n  color: whitesmoke;\n}\n\n.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined:focus {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.button.is-primary {\n  background-color: #00d1b2;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-primary:hover, .button.is-primary.is-hovered {\n  background-color: #00c4a7;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-primary:focus, .button.is-primary.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);\n  color: #fff;\n}\n\n.button.is-primary:active, .button.is-primary.is-active {\n  background-color: #00b89c;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-primary.is-inverted {\n  background-color: #fff;\n  color: #00d1b2;\n}\n\n.button.is-primary.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-primary.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-primary.is-outlined {\n  background-color: transparent;\n  border-color: #00d1b2;\n  color: #00d1b2;\n}\n\n.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined:focus {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n}\n\n.button.is-primary.is-outlined.is-loading:after {\n  border-color: transparent transparent #00d1b2 #00d1b2 !important;\n}\n\n.button.is-primary.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #00d1b2;\n}\n\n.button.is-info {\n  background-color: #3273dc;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:hover, .button.is-info.is-hovered {\n  background-color: #276cda;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-info:focus, .button.is-info.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);\n  color: #fff;\n}\n\n.button.is-info:active, .button.is-info.is-active {\n  background-color: #2366d1;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-info.is-inverted {\n  background-color: #fff;\n  color: #3273dc;\n}\n\n.button.is-info.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-info.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-info.is-outlined {\n  background-color: transparent;\n  border-color: #3273dc;\n  color: #3273dc;\n}\n\n.button.is-info.is-outlined:hover, .button.is-info.is-outlined:focus {\n  background-color: #3273dc;\n  border-color: #3273dc;\n  color: #fff;\n}\n\n.button.is-info.is-outlined.is-loading:after {\n  border-color: transparent transparent #3273dc #3273dc !important;\n}\n\n.button.is-info.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #3273dc;\n}\n\n.button.is-success {\n  background-color: #23d160;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:hover, .button.is-success.is-hovered {\n  background-color: #22c65b;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-success:focus, .button.is-success.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);\n  color: #fff;\n}\n\n.button.is-success:active, .button.is-success.is-active {\n  background-color: #20bc56;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-success.is-inverted {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-success.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-success.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-success.is-outlined {\n  background-color: transparent;\n  border-color: #23d160;\n  color: #23d160;\n}\n\n.button.is-success.is-outlined:hover, .button.is-success.is-outlined:focus {\n  background-color: #23d160;\n  border-color: #23d160;\n  color: #fff;\n}\n\n.button.is-success.is-outlined.is-loading:after {\n  border-color: transparent transparent #23d160 #23d160 !important;\n}\n\n.button.is-success.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #23d160;\n}\n\n.button.is-warning {\n  background-color: #ffdd57;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:hover, .button.is-warning.is-hovered {\n  background-color: #ffdb4a;\n  border-color: transparent;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:focus, .button.is-warning.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning:active, .button.is-warning.is-active {\n  background-color: #ffd83d;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-warning.is-inverted:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-loading:after {\n  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;\n}\n\n.button.is-warning.is-outlined {\n  background-color: transparent;\n  border-color: #ffdd57;\n  color: #ffdd57;\n}\n\n.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined:focus {\n  background-color: #ffdd57;\n  border-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-outlined.is-loading:after {\n  border-color: transparent transparent #ffdd57 #ffdd57 !important;\n}\n\n.button.is-warning.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.7);\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined:focus {\n  background-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.button.is-danger {\n  background-color: #ff3860;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:hover, .button.is-danger.is-hovered {\n  background-color: #ff2b56;\n  border-color: transparent;\n  color: #fff;\n}\n\n.button.is-danger:focus, .button.is-danger.is-focused {\n  border-color: transparent;\n  box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);\n  color: #fff;\n}\n\n.button.is-danger:active, .button.is-danger.is-active {\n  background-color: #ff1f4b;\n  border-color: transparent;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n  color: #fff;\n}\n\n.button.is-danger.is-inverted {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-danger.is-inverted:hover {\n  background-color: #f2f2f2;\n}\n\n.button.is-danger.is-loading:after {\n  border-color: transparent transparent #fff #fff !important;\n}\n\n.button.is-danger.is-outlined {\n  background-color: transparent;\n  border-color: #ff3860;\n  color: #ff3860;\n}\n\n.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus {\n  background-color: #ff3860;\n  border-color: #ff3860;\n  color: #fff;\n}\n\n.button.is-danger.is-outlined.is-loading:after {\n  border-color: transparent transparent #ff3860 #ff3860 !important;\n}\n\n.button.is-danger.is-inverted.is-outlined {\n  background-color: transparent;\n  border-color: #fff;\n  color: #fff;\n}\n\n.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined:focus {\n  background-color: #fff;\n  color: #ff3860;\n}\n\n.button.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.button.is-small .icon:first-child:not(:last-child) {\n  margin-left: -0.375rem;\n  margin-right: 0.375rem;\n}\n\n.button.is-small .icon:last-child:not(:first-child) {\n  margin-left: 0.375rem;\n  margin-right: -0.375rem;\n}\n\n.button.is-small .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.375rem);\n  margin-right: calc(-1px + -0.375rem);\n}\n\n.button.is-small .icon.is-small:first-child:not(:last-child) {\n  margin-left: -0.125rem;\n}\n\n.button.is-small .icon.is-small:last-child:not(:first-child) {\n  margin-right: -0.125rem;\n}\n\n.button.is-small .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + -0.125rem);\n  margin-right: calc(-1px + -0.125rem);\n}\n\n.button.is-small .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.625rem;\n}\n\n.button.is-small .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.625rem;\n}\n\n.button.is-small .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.625rem);\n  margin-right: calc(-1px + -0.625rem);\n}\n\n.button.is-small .icon.is-large:first-child:not(:last-child) {\n  margin-left: -1.125rem;\n}\n\n.button.is-small .icon.is-large:last-child:not(:first-child) {\n  margin-right: -1.125rem;\n}\n\n.button.is-small .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -1.125rem);\n  margin-right: calc(-1px + -1.125rem);\n}\n\n.button.is-medium {\n  font-size: 1.25rem;\n}\n\n.button.is-medium .icon:first-child:not(:last-child) {\n  margin-left: -0.125rem;\n  margin-right: 0.625rem;\n}\n\n.button.is-medium .icon:last-child:not(:first-child) {\n  margin-left: 0.625rem;\n  margin-right: -0.125rem;\n}\n\n.button.is-medium .icon:first-child:last-child {\n  margin-left: calc(-1px + -0.125rem);\n  margin-right: calc(-1px + -0.125rem);\n}\n\n.button.is-medium .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0.125rem;\n}\n\n.button.is-medium .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0.125rem;\n}\n\n.button.is-medium .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0.125rem);\n  margin-right: calc(-1px + 0.125rem);\n}\n\n.button.is-medium .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.375rem;\n}\n\n.button.is-medium .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.375rem;\n}\n\n.button.is-medium .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.375rem);\n  margin-right: calc(-1px + -0.375rem);\n}\n\n.button.is-medium .icon.is-large:first-child:not(:last-child) {\n  margin-left: -0.875rem;\n}\n\n.button.is-medium .icon.is-large:last-child:not(:first-child) {\n  margin-right: -0.875rem;\n}\n\n.button.is-medium .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -0.875rem);\n  margin-right: calc(-1px + -0.875rem);\n}\n\n.button.is-large {\n  font-size: 1.5rem;\n}\n\n.button.is-large .icon:first-child:not(:last-child) {\n  margin-left: 0rem;\n  margin-right: 0.75rem;\n}\n\n.button.is-large .icon:last-child:not(:first-child) {\n  margin-left: 0.75rem;\n  margin-right: 0rem;\n}\n\n.button.is-large .icon:first-child:last-child {\n  margin-left: calc(-1px + 0rem);\n  margin-right: calc(-1px + 0rem);\n}\n\n.button.is-large .icon.is-small:first-child:not(:last-child) {\n  margin-left: 0.25rem;\n}\n\n.button.is-large .icon.is-small:last-child:not(:first-child) {\n  margin-right: 0.25rem;\n}\n\n.button.is-large .icon.is-small:first-child:last-child {\n  margin-left: calc(-1px + 0.25rem);\n  margin-right: calc(-1px + 0.25rem);\n}\n\n.button.is-large .icon.is-medium:first-child:not(:last-child) {\n  margin-left: -0.25rem;\n}\n\n.button.is-large .icon.is-medium:last-child:not(:first-child) {\n  margin-right: -0.25rem;\n}\n\n.button.is-large .icon.is-medium:first-child:last-child {\n  margin-left: calc(-1px + -0.25rem);\n  margin-right: calc(-1px + -0.25rem);\n}\n\n.button.is-large .icon.is-large:first-child:not(:last-child) {\n  margin-left: -0.75rem;\n}\n\n.button.is-large .icon.is-large:last-child:not(:first-child) {\n  margin-right: -0.75rem;\n}\n\n.button.is-large .icon.is-large:first-child:last-child {\n  margin-left: calc(-1px + -0.75rem);\n  margin-right: calc(-1px + -0.75rem);\n}\n\n.button[disabled], .button.is-disabled {\n  opacity: 0.5;\n}\n\n.button.is-fullwidth {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n}\n\n.button.is-loading {\n  color: transparent !important;\n  pointer-events: none;\n}\n\n.button.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  left: 50%;\n  margin-left: -8px;\n  margin-top: -8px;\n  position: absolute;\n  top: 50%;\n  position: absolute !important;\n}\n\n.content {\n  color: #4a4a4a;\n}\n\n.content:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.content li + li {\n  margin-top: 0.25em;\n}\n\n.content p:not(:last-child),\n.content ol:not(:last-child),\n.content ul:not(:last-child),\n.content blockquote:not(:last-child),\n.content table:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.content h1,\n.content h2,\n.content h3,\n.content h4,\n.content h5,\n.content h6 {\n  color: #363636;\n  font-weight: 400;\n  line-height: 1.125;\n}\n\n.content h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n\n.content h1:not(:first-child) {\n  margin-top: 1em;\n}\n\n.content h2 {\n  font-size: 1.75em;\n  margin-bottom: 0.5714em;\n}\n\n.content h2:not(:first-child) {\n  margin-top: 1.1428em;\n}\n\n.content h3 {\n  font-size: 1.5em;\n  margin-bottom: 0.6666em;\n}\n\n.content h3:not(:first-child) {\n  margin-top: 1.3333em;\n}\n\n.content h4 {\n  font-size: 1.25em;\n  margin-bottom: 0.8em;\n}\n\n.content h5 {\n  font-size: 1.125em;\n  margin-bottom: 0.8888em;\n}\n\n.content h6 {\n  font-size: 1em;\n  margin-bottom: 1em;\n}\n\n.content blockquote {\n  background-color: whitesmoke;\n  border-left: 5px solid #dbdbdb;\n  padding: 1.25em 1.5em;\n}\n\n.content ol {\n  list-style: decimal outside;\n  margin-left: 2em;\n  margin-right: 2em;\n  margin-top: 1em;\n}\n\n.content ul {\n  list-style: disc outside;\n  margin-left: 2em;\n  margin-right: 2em;\n  margin-top: 1em;\n}\n\n.content ul ul {\n  list-style-type: circle;\n  margin-top: 0.5em;\n}\n\n.content ul ul ul {\n  list-style-type: square;\n}\n\n.content table {\n  width: 100%;\n}\n\n.content table td,\n.content table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.content table th {\n  color: #363636;\n  text-align: left;\n}\n\n.content table tr:hover {\n  background-color: whitesmoke;\n}\n\n.content table thead td,\n.content table thead th {\n  border-width: 0 0 2px;\n  color: #363636;\n}\n\n.content table tfoot td,\n.content table tfoot th {\n  border-width: 2px 0 0;\n  color: #363636;\n}\n\n.content table tbody tr:last-child td,\n.content table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.content.is-small {\n  font-size: 0.75rem;\n}\n\n.content.is-medium {\n  font-size: 1.25rem;\n}\n\n.content.is-large {\n  font-size: 1.5rem;\n}\n\n.input,\n.textarea {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n  max-width: 100%;\n  width: 100%;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  outline: none;\n}\n\n.input[disabled], .input.is-disabled,\n.textarea[disabled],\n.textarea.is-disabled {\n  pointer-events: none;\n}\n\n.input:hover, .input.is-hovered,\n.textarea:hover,\n.textarea.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.input:focus, .input.is-focused, .input:active, .input.is-active,\n.textarea:focus,\n.textarea.is-focused,\n.textarea:active,\n.textarea.is-active {\n  border-color: #00d1b2;\n}\n\n.input[disabled], .input.is-disabled,\n.textarea[disabled],\n.textarea.is-disabled {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  box-shadow: none;\n  color: #7a7a7a;\n}\n\n.input[disabled]::-moz-placeholder, .input.is-disabled::-moz-placeholder,\n.textarea[disabled]::-moz-placeholder,\n.textarea.is-disabled::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]::-webkit-input-placeholder, .input.is-disabled::-webkit-input-placeholder,\n.textarea[disabled]::-webkit-input-placeholder,\n.textarea.is-disabled::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-moz-placeholder, .input.is-disabled:-moz-placeholder,\n.textarea[disabled]:-moz-placeholder,\n.textarea.is-disabled:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[disabled]:-ms-input-placeholder, .input.is-disabled:-ms-input-placeholder,\n.textarea[disabled]:-ms-input-placeholder,\n.textarea.is-disabled:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.input[type=\"search\"],\n.textarea[type=\"search\"] {\n  border-radius: 290486px;\n}\n\n.input.is-white,\n.textarea.is-white {\n  border-color: white;\n}\n\n.input.is-black,\n.textarea.is-black {\n  border-color: #0a0a0a;\n}\n\n.input.is-light,\n.textarea.is-light {\n  border-color: whitesmoke;\n}\n\n.input.is-dark,\n.textarea.is-dark {\n  border-color: #363636;\n}\n\n.input.is-primary,\n.textarea.is-primary {\n  border-color: #00d1b2;\n}\n\n.input.is-info,\n.textarea.is-info {\n  border-color: #3273dc;\n}\n\n.input.is-success,\n.textarea.is-success {\n  border-color: #23d160;\n}\n\n.input.is-warning,\n.textarea.is-warning {\n  border-color: #ffdd57;\n}\n\n.input.is-danger,\n.textarea.is-danger {\n  border-color: #ff3860;\n}\n\n.input.is-small,\n.textarea.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.input.is-medium,\n.textarea.is-medium {\n  font-size: 1.25rem;\n}\n\n.input.is-large,\n.textarea.is-large {\n  font-size: 1.5rem;\n}\n\n.input.is-fullwidth,\n.textarea.is-fullwidth {\n  display: block;\n  width: 100%;\n}\n\n.input.is-inline,\n.textarea.is-inline {\n  display: inline;\n  width: auto;\n}\n\n.textarea {\n  display: block;\n  line-height: 1.25;\n  max-height: 600px;\n  max-width: 100%;\n  min-height: 120px;\n  min-width: 100%;\n  padding: 10px;\n  resize: vertical;\n}\n\n.checkbox,\n.radio {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  position: relative;\n  vertical-align: top;\n}\n\n.checkbox input,\n.radio input {\n  cursor: pointer;\n  margin-right: 0.5em;\n}\n\n.checkbox:hover,\n.radio:hover {\n  color: #363636;\n}\n\n.checkbox.is-disabled,\n.radio.is-disabled {\n  color: #7a7a7a;\n  pointer-events: none;\n}\n\n.checkbox.is-disabled input,\n.radio.is-disabled input {\n  pointer-events: none;\n}\n\n.radio + .radio {\n  margin-left: 0.5em;\n}\n\n.select {\n  display: inline-block;\n  height: 2.5em;\n  position: relative;\n  vertical-align: top;\n}\n\n.select:after {\n  border: 1px solid #00d1b2;\n  border-right: 0;\n  border-top: 0;\n  content: \" \";\n  display: block;\n  height: 0.5em;\n  pointer-events: none;\n  position: absolute;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n  width: 0.5em;\n  margin-top: -0.375em;\n  right: 1.125em;\n  top: 50%;\n  z-index: 4;\n}\n\n.select select {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  background-color: white;\n  border: 1px solid #dbdbdb;\n  color: #363636;\n  cursor: pointer;\n  display: block;\n  font-size: 1em;\n  outline: none;\n  padding-right: 2.5em;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  outline: none;\n}\n\n.select select[disabled], .select select.is-disabled {\n  pointer-events: none;\n}\n\n.select select:hover, .select select.is-hovered {\n  border-color: #b5b5b5;\n}\n\n.select select:focus, .select select.is-focused, .select select:active, .select select.is-active {\n  border-color: #00d1b2;\n}\n\n.select select[disabled], .select select.is-disabled {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  box-shadow: none;\n  color: #7a7a7a;\n}\n\n.select select[disabled]::-moz-placeholder, .select select.is-disabled::-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]::-webkit-input-placeholder, .select select.is-disabled::-webkit-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-moz-placeholder, .select select.is-disabled:-moz-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select[disabled]:-ms-input-placeholder, .select select.is-disabled:-ms-input-placeholder {\n  color: rgba(54, 54, 54, 0.3);\n}\n\n.select select:hover {\n  border-color: #b5b5b5;\n}\n\n.select select::ms-expand {\n  display: none;\n}\n\n.select:hover:after {\n  border-color: #363636;\n}\n\n.select.is-small {\n  border-radius: 2px;\n  font-size: 0.75rem;\n}\n\n.select.is-medium {\n  font-size: 1.25rem;\n}\n\n.select.is-large {\n  font-size: 1.5rem;\n}\n\n.select.is-fullwidth {\n  width: 100%;\n}\n\n.select.is-fullwidth select {\n  width: 100%;\n}\n\n.label {\n  color: #363636;\n  display: block;\n  font-weight: bold;\n}\n\n.label:not(:last-child) {\n  margin-bottom: 0.5em;\n}\n\n.help {\n  display: block;\n  font-size: 0.75rem;\n  margin-top: 5px;\n}\n\n.help.is-white {\n  color: white;\n}\n\n.help.is-black {\n  color: #0a0a0a;\n}\n\n.help.is-light {\n  color: whitesmoke;\n}\n\n.help.is-dark {\n  color: #363636;\n}\n\n.help.is-primary {\n  color: #00d1b2;\n}\n\n.help.is-info {\n  color: #3273dc;\n}\n\n.help.is-success {\n  color: #23d160;\n}\n\n.help.is-warning {\n  color: #ffdd57;\n}\n\n.help.is-danger {\n  color: #ff3860;\n}\n\n@media screen and (max-width: 768px) {\n  .control-label {\n    margin-bottom: 0.5em;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .control-label {\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    margin-right: 1.5em;\n    padding-top: 0.5em;\n    text-align: right;\n  }\n}\n\n.control {\n  position: relative;\n  text-align: left;\n}\n\n.control:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.control.has-addons {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.control.has-addons .button,\n.control.has-addons .input,\n.control.has-addons .select {\n  border-radius: 0;\n  margin-right: -1px;\n  width: auto;\n}\n\n.control.has-addons .button:hover,\n.control.has-addons .input:hover,\n.control.has-addons .select:hover {\n  z-index: 2;\n}\n\n.control.has-addons .button:focus, .control.has-addons .button:active,\n.control.has-addons .input:focus,\n.control.has-addons .input:active,\n.control.has-addons .select:focus,\n.control.has-addons .select:active {\n  z-index: 3;\n}\n\n.control.has-addons .button:first-child,\n.control.has-addons .input:first-child,\n.control.has-addons .select:first-child {\n  border-radius: 3px 0 0 3px;\n}\n\n.control.has-addons .button:first-child select,\n.control.has-addons .input:first-child select,\n.control.has-addons .select:first-child select {\n  border-radius: 3px 0 0 3px;\n}\n\n.control.has-addons .button:last-child,\n.control.has-addons .input:last-child,\n.control.has-addons .select:last-child {\n  border-radius: 0 3px 3px 0;\n}\n\n.control.has-addons .button:last-child select,\n.control.has-addons .input:last-child select,\n.control.has-addons .select:last-child select {\n  border-radius: 0 3px 3px 0;\n}\n\n.control.has-addons .button.is-expanded,\n.control.has-addons .input.is-expanded,\n.control.has-addons .select.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.has-addons .select select:hover {\n  z-index: 2;\n}\n\n.control.has-addons .select select:focus, .control.has-addons .select select:active {\n  z-index: 3;\n}\n\n.control.has-addons.has-addons-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.control.has-addons.has-addons-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.control.has-addons.has-addons-fullwidth .button,\n.control.has-addons.has-addons-fullwidth .input,\n.control.has-addons.has-addons-fullwidth .select {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.has-icon .icon {\n  color: #dbdbdb;\n  pointer-events: none;\n  position: absolute;\n  top: 1.25rem;\n  z-index: 4;\n}\n\n.control.has-icon .input:focus + .icon {\n  color: #7a7a7a;\n}\n\n.control.has-icon .input.is-small + .icon {\n  top: 0.9375rem;\n}\n\n.control.has-icon .input.is-medium + .icon {\n  top: 1.5625rem;\n}\n\n.control.has-icon .input.is-large + .icon {\n  top: 1.875rem;\n}\n\n.control.has-icon:not(.has-icon-right) .icon {\n  left: 1.25rem;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.control.has-icon:not(.has-icon-right) .input {\n  padding-left: 2.5em;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-small + .icon {\n  left: 0.9375rem;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-medium + .icon {\n  left: 1.5625rem;\n}\n\n.control.has-icon:not(.has-icon-right) .input.is-large + .icon {\n  left: 1.875rem;\n}\n\n.control.has-icon.has-icon-right .icon {\n  right: 1.25rem;\n  -webkit-transform: translateX(50%) translateY(-50%);\n          transform: translateX(50%) translateY(-50%);\n}\n\n.control.has-icon.has-icon-right .input {\n  padding-right: 2.5em;\n}\n\n.control.has-icon.has-icon-right .input.is-small + .icon {\n  right: 0.9375rem;\n}\n\n.control.has-icon.has-icon-right .input.is-medium + .icon {\n  right: 1.5625rem;\n}\n\n.control.has-icon.has-icon-right .input.is-large + .icon {\n  right: 1.875rem;\n}\n\n.control.is-grouped {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.control.is-grouped > .control {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.control.is-grouped > .control:not(:last-child) {\n  margin-bottom: 0;\n  margin-right: 0.75rem;\n}\n\n.control.is-grouped > .control.is-expanded {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.control.is-grouped.is-grouped-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.control.is-grouped.is-grouped-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .control.is-horizontal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .control.is-horizontal > .control {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-preferred-size: 0;\n        flex-basis: 0;\n    -webkit-box-flex: 5;\n        -ms-flex-positive: 5;\n            flex-grow: 5;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n}\n\n.control.is-loading:after {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n  position: absolute !important;\n  right: 0.75em;\n  top: 0.75em;\n}\n\n.icon {\n  display: inline-block;\n  font-size: 21px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  text-align: center;\n  vertical-align: top;\n  width: 1.5rem;\n}\n\n.icon .fa {\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.icon.is-small {\n  display: inline-block;\n  font-size: 14px;\n  height: 1rem;\n  line-height: 1rem;\n  text-align: center;\n  vertical-align: top;\n  width: 1rem;\n}\n\n.icon.is-medium {\n  display: inline-block;\n  font-size: 28px;\n  height: 2rem;\n  line-height: 2rem;\n  text-align: center;\n  vertical-align: top;\n  width: 2rem;\n}\n\n.icon.is-large {\n  display: inline-block;\n  font-size: 42px;\n  height: 3rem;\n  line-height: 3rem;\n  text-align: center;\n  vertical-align: top;\n  width: 3rem;\n}\n\n.image {\n  display: block;\n  position: relative;\n}\n\n.image img {\n  display: block;\n  height: auto;\n  width: 100%;\n}\n\n.image.is-square img, .image.is-1by1 img, .image.is-4by3 img, .image.is-3by2 img, .image.is-16by9 img, .image.is-2by1 img {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.image.is-square, .image.is-1by1 {\n  padding-top: 100%;\n}\n\n.image.is-4by3 {\n  padding-top: 75%;\n}\n\n.image.is-3by2 {\n  padding-top: 66.6666%;\n}\n\n.image.is-16by9 {\n  padding-top: 56.25%;\n}\n\n.image.is-2by1 {\n  padding-top: 50%;\n}\n\n.image.is-16x16 {\n  height: 16px;\n  width: 16px;\n}\n\n.image.is-24x24 {\n  height: 24px;\n  width: 24px;\n}\n\n.image.is-32x32 {\n  height: 32px;\n  width: 32px;\n}\n\n.image.is-48x48 {\n  height: 48px;\n  width: 48px;\n}\n\n.image.is-64x64 {\n  height: 64px;\n  width: 64px;\n}\n\n.image.is-96x96 {\n  height: 96px;\n  width: 96px;\n}\n\n.image.is-128x128 {\n  height: 128px;\n  width: 128px;\n}\n\n.notification {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  padding: 1.25rem 2.5rem 1.25rem 1.5rem;\n  position: relative;\n}\n\n.notification:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.notification code,\n.notification pre {\n  background: white;\n}\n\n.notification pre code {\n  background: transparent;\n}\n\n.notification .delete {\n  position: absolute;\n  right: 0.5em;\n  top: 0.5em;\n}\n\n.notification .title,\n.notification .subtitle,\n.notification .content {\n  color: inherit;\n}\n\n.notification.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.notification.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.notification.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.notification.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.notification.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.notification.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.notification.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.notification.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.notification.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.progress {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 290486px;\n  display: block;\n  height: 1rem;\n  overflow: hidden;\n  padding: 0;\n  width: 100%;\n}\n\n.progress:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.progress::-webkit-progress-bar {\n  background-color: #dbdbdb;\n}\n\n.progress::-webkit-progress-value {\n  background-color: #4a4a4a;\n}\n\n.progress::-moz-progress-bar {\n  background-color: #4a4a4a;\n}\n\n.progress.is-white::-webkit-progress-value {\n  background-color: white;\n}\n\n.progress.is-white::-moz-progress-bar {\n  background-color: white;\n}\n\n.progress.is-black::-webkit-progress-value {\n  background-color: #0a0a0a;\n}\n\n.progress.is-black::-moz-progress-bar {\n  background-color: #0a0a0a;\n}\n\n.progress.is-light::-webkit-progress-value {\n  background-color: whitesmoke;\n}\n\n.progress.is-light::-moz-progress-bar {\n  background-color: whitesmoke;\n}\n\n.progress.is-dark::-webkit-progress-value {\n  background-color: #363636;\n}\n\n.progress.is-dark::-moz-progress-bar {\n  background-color: #363636;\n}\n\n.progress.is-primary::-webkit-progress-value {\n  background-color: #00d1b2;\n}\n\n.progress.is-primary::-moz-progress-bar {\n  background-color: #00d1b2;\n}\n\n.progress.is-info::-webkit-progress-value {\n  background-color: #3273dc;\n}\n\n.progress.is-info::-moz-progress-bar {\n  background-color: #3273dc;\n}\n\n.progress.is-success::-webkit-progress-value {\n  background-color: #23d160;\n}\n\n.progress.is-success::-moz-progress-bar {\n  background-color: #23d160;\n}\n\n.progress.is-warning::-webkit-progress-value {\n  background-color: #ffdd57;\n}\n\n.progress.is-warning::-moz-progress-bar {\n  background-color: #ffdd57;\n}\n\n.progress.is-danger::-webkit-progress-value {\n  background-color: #ff3860;\n}\n\n.progress.is-danger::-moz-progress-bar {\n  background-color: #ff3860;\n}\n\n.progress.is-small {\n  height: 0.75rem;\n}\n\n.progress.is-medium {\n  height: 1.25rem;\n}\n\n.progress.is-large {\n  height: 1.5rem;\n}\n\n.table {\n  background-color: white;\n  color: #363636;\n  margin-bottom: 1.5rem;\n  width: 100%;\n}\n\n.table td,\n.table th {\n  border: 1px solid #dbdbdb;\n  border-width: 0 0 1px;\n  padding: 0.5em 0.75em;\n  vertical-align: top;\n}\n\n.table td.is-narrow,\n.table th.is-narrow {\n  white-space: nowrap;\n  width: 1%;\n}\n\n.table th {\n  color: #363636;\n  text-align: left;\n}\n\n.table tr:hover {\n  background-color: #fafafa;\n}\n\n.table thead td,\n.table thead th {\n  border-width: 0 0 2px;\n  color: #7a7a7a;\n}\n\n.table tfoot td,\n.table tfoot th {\n  border-width: 2px 0 0;\n  color: #7a7a7a;\n}\n\n.table tbody tr:last-child td,\n.table tbody tr:last-child th {\n  border-bottom-width: 0;\n}\n\n.table.is-bordered td,\n.table.is-bordered th {\n  border-width: 1px;\n}\n\n.table.is-bordered tr:last-child td,\n.table.is-bordered tr:last-child th {\n  border-bottom-width: 1px;\n}\n\n.table.is-narrow td,\n.table.is-narrow th {\n  padding: 0.25em 0.5em;\n}\n\n.table.is-striped tbody tr:nth-child(even) {\n  background-color: #fafafa;\n}\n\n.table.is-striped tbody tr:nth-child(even):hover {\n  background-color: whitesmoke;\n}\n\n.tag {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  color: #4a4a4a;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 0.75rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  line-height: 1.5;\n  padding-left: 0.875em;\n  padding-right: 0.875em;\n  vertical-align: top;\n  white-space: nowrap;\n}\n\n.tag .delete {\n  margin-left: 0.25em;\n  margin-right: -0.5em;\n}\n\n.tag.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.tag.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.tag.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.tag.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.tag.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.tag.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.tag.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.tag.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.tag.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.tag.is-medium {\n  font-size: 1rem;\n}\n\n.tag.is-large {\n  font-size: 1.25rem;\n}\n\n.title,\n.subtitle {\n  word-break: break-word;\n}\n\n.title:not(:last-child),\n.subtitle:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.title em,\n.title span,\n.subtitle em,\n.subtitle span {\n  font-weight: 300;\n}\n\n.title strong,\n.subtitle strong {\n  font-weight: 500;\n}\n\n.title .tag,\n.subtitle .tag {\n  vertical-align: middle;\n}\n\n.title {\n  color: #363636;\n  font-size: 2rem;\n  font-weight: 300;\n  line-height: 1.125;\n}\n\n.title strong {\n  color: inherit;\n}\n\n.title + .highlight {\n  margin-top: -0.75rem;\n}\n\n.title + .subtitle {\n  margin-top: -1.25rem;\n}\n\n.title.is-1 {\n  font-size: 3.5rem;\n}\n\n.title.is-2 {\n  font-size: 2.75rem;\n}\n\n.title.is-3 {\n  font-size: 2rem;\n}\n\n.title.is-4 {\n  font-size: 1.5rem;\n}\n\n.title.is-5 {\n  font-size: 1.25rem;\n}\n\n.title.is-6 {\n  font-size: 14px;\n}\n\n.subtitle {\n  color: #4a4a4a;\n  font-size: 1.25rem;\n  font-weight: 300;\n  line-height: 1.25;\n}\n\n.subtitle strong {\n  color: #363636;\n}\n\n.subtitle + .title {\n  margin-top: -1.5rem;\n}\n\n.subtitle.is-1 {\n  font-size: 3.5rem;\n}\n\n.subtitle.is-2 {\n  font-size: 2.75rem;\n}\n\n.subtitle.is-3 {\n  font-size: 2rem;\n}\n\n.subtitle.is-4 {\n  font-size: 1.5rem;\n}\n\n.subtitle.is-5 {\n  font-size: 1.25rem;\n}\n\n.subtitle.is-6 {\n  font-size: 14px;\n}\n\n.block:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.container {\n  position: relative;\n}\n\n@media screen and (min-width: 1000px) {\n  .container {\n    margin: 0 auto;\n    max-width: 960px;\n  }\n  .container.is-fluid {\n    margin: 0 20px;\n    max-width: none;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .container {\n    max-width: 1152px;\n  }\n}\n\n.delete {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1rem;\n  height: 20px;\n  outline: none;\n  position: relative;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  vertical-align: top;\n  width: 20px;\n}\n\n.delete:before, .delete:after {\n  background-color: white;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.delete:before {\n  height: 2px;\n  width: 50%;\n}\n\n.delete:after {\n  height: 50%;\n  width: 2px;\n}\n\n.delete:hover, .delete:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.delete:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.delete.is-small {\n  height: 14px;\n  width: 14px;\n}\n\n.delete.is-medium {\n  height: 26px;\n  width: 26px;\n}\n\n.delete.is-large {\n  height: 30px;\n  width: 30px;\n}\n\n.fa {\n  font-size: 21px;\n  text-align: center;\n  vertical-align: top;\n}\n\n.heading {\n  display: block;\n  font-size: 11px;\n  letter-spacing: 1px;\n  margin-bottom: 5px;\n  text-transform: uppercase;\n}\n\n.highlight {\n  font-weight: 400;\n  max-width: 100%;\n  overflow: hidden;\n  padding: 0;\n}\n\n.highlight:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.highlight pre {\n  overflow: auto;\n  max-width: 100%;\n}\n\n.loader {\n  -webkit-animation: spinAround 500ms infinite linear;\n          animation: spinAround 500ms infinite linear;\n  border: 2px solid #dbdbdb;\n  border-radius: 290486px;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  content: \"\";\n  display: block;\n  height: 1rem;\n  position: relative;\n  width: 1rem;\n}\n\n.number {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  border-radius: 290486px;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1.25rem;\n  height: 2em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 1.5rem;\n  min-width: 2.5em;\n  padding: 0.25rem 0.5rem;\n  text-align: center;\n  vertical-align: top;\n}\n\n.card-header {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-header-title {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  font-weight: 700;\n  padding: 0.75rem;\n}\n\n.card-header-icon {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-image {\n  display: block;\n  position: relative;\n}\n\n.card-content {\n  padding: 1.5rem;\n}\n\n.card-content .title + .subtitle {\n  margin-top: -1.5rem;\n}\n\n.card-footer {\n  border-top: 1px solid #dbdbdb;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.card-footer-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.75rem;\n}\n\n.card-footer-item:not(:last-child) {\n  border-right: 1px solid #dbdbdb;\n}\n\n.card {\n  background-color: white;\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\n  color: #4a4a4a;\n  max-width: 100%;\n  position: relative;\n}\n\n.card .media:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.level-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.level-item .title,\n.level-item .subtitle {\n  margin-bottom: 0;\n}\n\n@media screen and (max-width: 768px) {\n  .level-item:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n.level-left,\n.level-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.level-left .level-item:not(:last-child),\n.level-right .level-item:not(:last-child) {\n  margin-right: 0.75rem;\n}\n\n.level-left .level-item.is-flexible,\n.level-right .level-item.is-flexible {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n.level-left {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n@media screen and (max-width: 768px) {\n  .level-left + .level-right {\n    margin-top: 1.5rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .level-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.level-right {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .level-right {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.level {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.level:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.level code {\n  border-radius: 3px;\n}\n\n.level img {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.level.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.level.is-mobile > .level-item:not(:last-child) {\n  margin-bottom: 0;\n}\n\n.level.is-mobile > .level-item:not(.is-narrow) {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n\n@media screen and (min-width: 769px) {\n  .level {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .level > .level-item:not(.is-narrow) {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n  }\n}\n\n.media-left,\n.media-right {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.media-left {\n  margin-right: 1rem;\n}\n\n.media-right {\n  margin-left: 1rem;\n}\n\n.media-content {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  text-align: left;\n}\n\n.media {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: left;\n}\n\n.media .content:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.media .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 0.75rem;\n}\n\n.media .media .content:not(:last-child),\n.media .media .control:not(:last-child) {\n  margin-bottom: 0.5rem;\n}\n\n.media .media .media {\n  padding-top: 0.5rem;\n}\n\n.media .media .media + .media {\n  margin-top: 0.5rem;\n}\n\n.media + .media {\n  border-top: 1px solid rgba(219, 219, 219, 0.5);\n  margin-top: 1rem;\n  padding-top: 1rem;\n}\n\n.media.is-large + .media {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n}\n\n.menu {\n  font-size: 1rem;\n}\n\n.menu-list {\n  line-height: 1.25;\n}\n\n.menu-list a {\n  border-radius: 2px;\n  color: #4a4a4a;\n  display: block;\n  padding: 0.5em 0.75em;\n}\n\n.menu-list a:hover {\n  background-color: whitesmoke;\n  color: #00d1b2;\n}\n\n.menu-list a.is-active {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.menu-list li ul {\n  border-left: 1px solid #dbdbdb;\n  margin: 0.75em;\n  padding-left: 0.75em;\n}\n\n.menu-label {\n  color: #7a7a7a;\n  font-size: 0.8em;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.menu-label:not(:first-child) {\n  margin-top: 1em;\n}\n\n.menu-label:not(:last-child) {\n  margin-bottom: 1em;\n}\n\n.message {\n  background-color: whitesmoke;\n  border-radius: 3px;\n  font-size: 1rem;\n}\n\n.message:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.message.is-white {\n  background-color: white;\n}\n\n.message.is-white .message-header {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.message.is-white .message-body {\n  border-color: white;\n  color: #4d4d4d;\n}\n\n.message.is-black {\n  background-color: #fafafa;\n}\n\n.message.is-black .message-header {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.message.is-black .message-body {\n  border-color: #0a0a0a;\n  color: #090909;\n}\n\n.message.is-light {\n  background-color: #fafafa;\n}\n\n.message.is-light .message-header {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.message.is-light .message-body {\n  border-color: whitesmoke;\n  color: #505050;\n}\n\n.message.is-dark {\n  background-color: #fafafa;\n}\n\n.message.is-dark .message-header {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.message.is-dark .message-body {\n  border-color: #363636;\n  color: #2a2a2a;\n}\n\n.message.is-primary {\n  background-color: #f5fffd;\n}\n\n.message.is-primary .message-header {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.message.is-primary .message-body {\n  border-color: #00d1b2;\n  color: #021310;\n}\n\n.message.is-info {\n  background-color: #f6f9fe;\n}\n\n.message.is-info .message-header {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.message.is-info .message-body {\n  border-color: #3273dc;\n  color: #22509a;\n}\n\n.message.is-success {\n  background-color: #f6fef9;\n}\n\n.message.is-success .message-header {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.message.is-success .message-body {\n  border-color: #23d160;\n  color: #0e301a;\n}\n\n.message.is-warning {\n  background-color: #fffdf5;\n}\n\n.message.is-warning .message-header {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.message.is-warning .message-body {\n  border-color: #ffdd57;\n  color: #3b3108;\n}\n\n.message.is-danger {\n  background-color: #fff5f7;\n}\n\n.message.is-danger .message-header {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.message.is-danger .message-body {\n  border-color: #ff3860;\n  color: #cd0930;\n}\n\n.message-header {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #4a4a4a;\n  border-radius: 3px 3px 0 0;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n  position: relative;\n}\n\n.message-header a,\n.message-header strong {\n  color: inherit;\n}\n\n.message-header a {\n  text-decoration: underline;\n}\n\n.message-header .delete {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  margin-left: 0.75em;\n}\n\n.message-header + .message-body {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-top: none;\n}\n\n.message-body {\n  border: 1px solid #dbdbdb;\n  border-radius: 3px;\n  color: #4a4a4a;\n  padding: 1em 1.25em;\n}\n\n.message-body a,\n.message-body strong {\n  color: inherit;\n}\n\n.message-body a {\n  text-decoration: underline;\n}\n\n.message-body code,\n.message-body pre {\n  background: white;\n}\n\n.message-body pre code {\n  background: transparent;\n}\n\n.modal-background {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: rgba(10, 10, 10, 0.86);\n}\n\n.modal-content,\n.modal-card {\n  margin: 0 20px;\n  max-height: calc(100vh - 160px);\n  overflow: auto;\n  position: relative;\n  width: 100%;\n}\n\n@media screen and (min-width: 769px) {\n  .modal-content,\n  .modal-card {\n    margin: 0 auto;\n    max-height: calc(100vh - 40px);\n    width: 640px;\n  }\n}\n\n.modal-close {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: rgba(10, 10, 10, 0.2);\n  border: none;\n  border-radius: 290486px;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1rem;\n  height: 20px;\n  outline: none;\n  position: relative;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  vertical-align: top;\n  width: 20px;\n  background: none;\n  height: 40px;\n  position: fixed;\n  right: 20px;\n  top: 20px;\n  width: 40px;\n}\n\n.modal-close:before, .modal-close:after {\n  background-color: white;\n  content: \"\";\n  display: block;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n\n.modal-close:before {\n  height: 2px;\n  width: 50%;\n}\n\n.modal-close:after {\n  height: 50%;\n  width: 2px;\n}\n\n.modal-close:hover, .modal-close:focus {\n  background-color: rgba(10, 10, 10, 0.3);\n}\n\n.modal-close:active {\n  background-color: rgba(10, 10, 10, 0.4);\n}\n\n.modal-close.is-small {\n  height: 14px;\n  width: 14px;\n}\n\n.modal-close.is-medium {\n  height: 26px;\n  width: 26px;\n}\n\n.modal-close.is-large {\n  height: 30px;\n  width: 30px;\n}\n\n.modal-card {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  max-height: calc(100vh - 40px);\n  overflow: hidden;\n}\n\n.modal-card-head,\n.modal-card-foot {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: whitesmoke;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 20px;\n  position: relative;\n}\n\n.modal-card-head {\n  border-bottom: 1px solid #dbdbdb;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.modal-card-title {\n  color: #363636;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 1.5rem;\n  line-height: 1;\n}\n\n.modal-card-foot {\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  border-top: 1px solid #dbdbdb;\n}\n\n.modal-card-foot .button:not(:last-child) {\n  margin-right: 10px;\n}\n\n.modal-card-body {\n  -webkit-overflow-scrolling: touch;\n  background-color: white;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  overflow: auto;\n  padding: 20px;\n}\n\n.modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  position: fixed;\n  z-index: 1986;\n}\n\n.modal.is-active {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav-toggle {\n  cursor: pointer;\n  display: block;\n  height: 3.5rem;\n  position: relative;\n  width: 3.5rem;\n}\n\n.nav-toggle span {\n  background-color: #4a4a4a;\n  display: block;\n  height: 1px;\n  left: 50%;\n  margin-left: -7px;\n  position: absolute;\n  top: 50%;\n  -webkit-transition: none 86ms ease-out;\n  transition: none 86ms ease-out;\n  -webkit-transition-property: background, left, opacity, -webkit-transform;\n  transition-property: background, left, opacity, -webkit-transform;\n  transition-property: background, left, opacity, transform;\n  transition-property: background, left, opacity, transform, -webkit-transform;\n  width: 15px;\n}\n\n.nav-toggle span:nth-child(1) {\n  margin-top: -6px;\n}\n\n.nav-toggle span:nth-child(2) {\n  margin-top: -1px;\n}\n\n.nav-toggle span:nth-child(3) {\n  margin-top: 4px;\n}\n\n.nav-toggle:hover {\n  background-color: whitesmoke;\n}\n\n.nav-toggle.is-active span {\n  background-color: #00d1b2;\n}\n\n.nav-toggle.is-active span:nth-child(1) {\n  margin-left: -5px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n}\n\n.nav-toggle.is-active span:nth-child(2) {\n  opacity: 0;\n}\n\n.nav-toggle.is-active span:nth-child(3) {\n  margin-left: -5px;\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n  -webkit-transform-origin: left bottom;\n          transform-origin: left bottom;\n}\n\n@media screen and (min-width: 769px) {\n  .nav-toggle {\n    display: none;\n  }\n}\n\n.nav-item {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  font-size: 1rem;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0.5rem 0.75rem;\n}\n\n.nav-item a {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.nav-item img {\n  max-height: 1.75rem;\n}\n\n.nav-item .button + .button {\n  margin-left: 0.75rem;\n}\n\n.nav-item .tag:first-child:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.nav-item .tag:last-child:not(:first-child) {\n  margin-left: 0.5rem;\n}\n\n@media screen and (max-width: 768px) {\n  .nav-item {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n  }\n}\n\n.nav-item a,\na.nav-item {\n  color: #7a7a7a;\n}\n\n.nav-item a:hover,\na.nav-item:hover {\n  color: #363636;\n}\n\n.nav-item a.is-active,\na.nav-item.is-active {\n  color: #363636;\n}\n\n.nav-item a.is-tab,\na.nav-item.is-tab {\n  border-bottom: 1px solid transparent;\n  border-top: 1px solid transparent;\n  padding-bottom: calc(0.5rem - 1px);\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: calc(0.5rem - 1px);\n}\n\n.nav-item a.is-tab:hover,\na.nav-item.is-tab:hover {\n  border-bottom-color: #00d1b2;\n  border-top-color: transparent;\n}\n\n.nav-item a.is-tab.is-active,\na.nav-item.is-tab.is-active {\n  border-bottom: 3px solid #00d1b2;\n  color: #00d1b2;\n  padding-bottom: calc(0.5rem - 3px);\n}\n\n@media screen and (min-width: 1000px) {\n  .nav-item a.is-brand,\n  a.nav-item.is-brand {\n    padding-left: 0;\n  }\n}\n\n@media screen and (max-width: 768px) {\n  .nav-menu {\n    background-color: white;\n    box-shadow: 0 4px 7px rgba(10, 10, 10, 0.1);\n    left: 0;\n    display: none;\n    right: 0;\n    top: 100%;\n    position: absolute;\n  }\n  .nav-menu .nav-item {\n    border-top: 1px solid rgba(219, 219, 219, 0.5);\n    padding: 0.75rem;\n  }\n  .nav-menu.is-active {\n    display: block;\n  }\n}\n\n@media screen and (min-width: 769px) and (max-width: 999px) {\n  .nav-menu {\n    padding-right: 1.5rem;\n  }\n}\n\n.nav-left,\n.nav-right {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.nav-left {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.nav-center {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.nav-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n@media screen and (min-width: 769px) {\n  .nav-right {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.nav {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  background-color: white;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 3.5rem;\n  position: relative;\n  text-align: center;\n  z-index: 2;\n}\n\n.nav > .container {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 3.5rem;\n  width: 100%;\n}\n\n.nav.has-shadow {\n  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);\n}\n\n.pagination,\n.pagination-list {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link,\n.pagination-ellipsis {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border: none;\n  border-radius: 3px;\n  box-shadow: none;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1rem;\n  height: 2.285em;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  line-height: 1.5;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n  position: relative;\n  vertical-align: top;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  font-size: 0.875rem;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  text-align: center;\n}\n\n.pagination-previous:focus, .pagination-previous.is-focused, .pagination-previous:active, .pagination-previous.is-active,\n.pagination-next:focus,\n.pagination-next.is-focused,\n.pagination-next:active,\n.pagination-next.is-active,\n.pagination-link:focus,\n.pagination-link.is-focused,\n.pagination-link:active,\n.pagination-link.is-active,\n.pagination-ellipsis:focus,\n.pagination-ellipsis.is-focused,\n.pagination-ellipsis:active,\n.pagination-ellipsis.is-active {\n  outline: none;\n}\n\n.pagination-previous[disabled], .pagination-previous.is-disabled,\n.pagination-next[disabled],\n.pagination-next.is-disabled,\n.pagination-link[disabled],\n.pagination-link.is-disabled,\n.pagination-ellipsis[disabled],\n.pagination-ellipsis.is-disabled {\n  pointer-events: none;\n}\n\n.pagination-previous,\n.pagination-next,\n.pagination-link {\n  border: 1px solid #dbdbdb;\n  min-width: 2.5em;\n}\n\n.pagination-previous:hover,\n.pagination-next:hover,\n.pagination-link:hover {\n  border-color: #b5b5b5;\n  color: #363636;\n}\n\n.pagination-previous:focus,\n.pagination-next:focus,\n.pagination-link:focus {\n  border-color: #00d1b2;\n}\n\n.pagination-previous:active,\n.pagination-next:active,\n.pagination-link:active {\n  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);\n}\n\n.pagination-previous[disabled], .pagination-previous.is-disabled,\n.pagination-next[disabled],\n.pagination-next.is-disabled,\n.pagination-link[disabled],\n.pagination-link.is-disabled {\n  background: #dbdbdb;\n  color: #7a7a7a;\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n.pagination-previous,\n.pagination-next {\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n}\n\n.pagination-link.is-current {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n}\n\n.pagination-ellipsis {\n  color: #b5b5b5;\n  pointer-events: none;\n}\n\n.pagination-list li:not(:first-child) {\n  margin-left: 0.375rem;\n}\n\n@media screen and (max-width: 768px) {\n  .pagination {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n  .pagination-previous,\n  .pagination-next {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    width: calc(50% - 0.375rem);\n  }\n  .pagination-next {\n    margin-left: 0.75rem;\n  }\n  .pagination-list {\n    margin-top: 0.75rem;\n  }\n  .pagination-list li {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .pagination-list {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination-previous,\n  .pagination-next {\n    margin-left: 0.75rem;\n  }\n  .pagination-previous {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n  }\n  .pagination.is-centered .pagination-previous {\n    margin-left: 0;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-centered .pagination-list {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n  }\n  .pagination.is-centered .pagination-next {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n  .pagination.is-right .pagination-previous {\n    margin-left: 0;\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .pagination.is-right .pagination-next {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2;\n    margin-right: 0.75rem;\n  }\n  .pagination.is-right .pagination-list {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n  }\n}\n\n.panel {\n  font-size: 1rem;\n}\n\n.panel:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.panel-heading,\n.panel-tabs,\n.panel-block {\n  border-bottom: 1px solid #dbdbdb;\n  border-left: 1px solid #dbdbdb;\n  border-right: 1px solid #dbdbdb;\n}\n\n.panel-heading:first-child,\n.panel-tabs:first-child,\n.panel-block:first-child {\n  border-top: 1px solid #dbdbdb;\n}\n\n.panel-heading {\n  background-color: whitesmoke;\n  border-radius: 3px 3px 0 0;\n  color: #363636;\n  font-size: 1.25em;\n  font-weight: 300;\n  line-height: 1.25;\n  padding: 0.5em 0.75em;\n}\n\n.panel-tabs {\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 0.875em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.panel-tabs a {\n  border-bottom: 1px solid #dbdbdb;\n  margin-bottom: -1px;\n  padding: 0.5em;\n}\n\n.panel-tabs a.is-active {\n  border-bottom-color: #4a4a4a;\n  color: #363636;\n}\n\n.panel-list a {\n  color: #4a4a4a;\n}\n\n.panel-list a:hover {\n  color: #00d1b2;\n}\n\n.panel-block {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #363636;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  padding: 0.5em 0.75em;\n}\n\n.panel-block input[type=\"checkbox\"] {\n  margin-right: 0.75em;\n}\n\n.panel-block > .control {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  width: 100%;\n}\n\n.panel-block.is-active {\n  border-left-color: #00d1b2;\n  color: #363636;\n}\n\n.panel-block.is-active .panel-icon {\n  color: #00d1b2;\n}\n\na.panel-block,\nlabel.panel-block {\n  cursor: pointer;\n}\n\na.panel-block:hover,\nlabel.panel-block:hover {\n  background-color: whitesmoke;\n}\n\n.panel-icon {\n  display: inline-block;\n  font-size: 14px;\n  height: 1em;\n  line-height: 1em;\n  text-align: center;\n  vertical-align: top;\n  width: 1em;\n  color: #7a7a7a;\n  margin-right: 0.75em;\n}\n\n.panel-icon .fa {\n  font-size: inherit;\n  line-height: inherit;\n}\n\n.tabs {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 1rem;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  overflow: hidden;\n  overflow-x: auto;\n  white-space: nowrap;\n}\n\n.tabs:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.tabs a {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbdbdb;\n  color: #4a4a4a;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: -1px;\n  padding: 0.5em 1em;\n  vertical-align: top;\n}\n\n.tabs a:hover {\n  border-bottom-color: #363636;\n  color: #363636;\n}\n\n.tabs li {\n  display: block;\n}\n\n.tabs li.is-active a {\n  border-bottom-color: #00d1b2;\n  color: #00d1b2;\n}\n\n.tabs ul {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbdbdb;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.tabs ul.is-left {\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-center {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0.75em;\n  padding-right: 0.75em;\n}\n\n.tabs ul.is-right {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding-left: 0.75em;\n}\n\n.tabs .icon:first-child {\n  margin-right: 0.5em;\n}\n\n.tabs .icon:last-child {\n  margin-left: 0.5em;\n}\n\n.tabs.is-centered ul {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.tabs.is-right ul {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n\n.tabs.is-boxed a {\n  border: 1px solid transparent;\n  border-radius: 3px 3px 0 0;\n}\n\n.tabs.is-boxed a:hover {\n  background-color: whitesmoke;\n  border-bottom-color: #dbdbdb;\n}\n\n.tabs.is-boxed li.is-active a {\n  background-color: white;\n  border-color: #dbdbdb;\n  border-bottom-color: transparent !important;\n}\n\n.tabs.is-fullwidth li {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.tabs.is-toggle a {\n  border: 1px solid #dbdbdb;\n  margin-bottom: 0;\n  position: relative;\n}\n\n.tabs.is-toggle a:hover {\n  background-color: whitesmoke;\n  border-color: #b5b5b5;\n  z-index: 2;\n}\n\n.tabs.is-toggle li + li {\n  margin-left: -1px;\n}\n\n.tabs.is-toggle li:first-child a {\n  border-radius: 3px 0 0 3px;\n}\n\n.tabs.is-toggle li:last-child a {\n  border-radius: 0 3px 3px 0;\n}\n\n.tabs.is-toggle li.is-active a {\n  background-color: #00d1b2;\n  border-color: #00d1b2;\n  color: #fff;\n  z-index: 1;\n}\n\n.tabs.is-toggle ul {\n  border-bottom: none;\n}\n\n.tabs.is-small {\n  font-size: 0.75rem;\n}\n\n.tabs.is-medium {\n  font-size: 1.25rem;\n}\n\n.tabs.is-large {\n  font-size: 1.5rem;\n}\n\n.column {\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  padding: 0.75rem;\n}\n\n.columns.is-mobile > .column.is-narrow {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n}\n\n.columns.is-mobile > .column.is-full {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-three-quarters {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-two-thirds {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-half {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-one-third {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-one-quarter {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-three-quarters {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-two-thirds {\n  margin-left: 66.6666%;\n}\n\n.columns.is-mobile > .column.is-offset-half {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-one-third {\n  margin-left: 33.3333%;\n}\n\n.columns.is-mobile > .column.is-offset-one-quarter {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-1 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-1 {\n  margin-left: 8.33333%;\n}\n\n.columns.is-mobile > .column.is-2 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-2 {\n  margin-left: 16.66667%;\n}\n\n.columns.is-mobile > .column.is-3 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 25%;\n}\n\n.columns.is-mobile > .column.is-offset-3 {\n  margin-left: 25%;\n}\n\n.columns.is-mobile > .column.is-4 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-4 {\n  margin-left: 33.33333%;\n}\n\n.columns.is-mobile > .column.is-5 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-5 {\n  margin-left: 41.66667%;\n}\n\n.columns.is-mobile > .column.is-6 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 50%;\n}\n\n.columns.is-mobile > .column.is-offset-6 {\n  margin-left: 50%;\n}\n\n.columns.is-mobile > .column.is-7 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-7 {\n  margin-left: 58.33333%;\n}\n\n.columns.is-mobile > .column.is-8 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-8 {\n  margin-left: 66.66667%;\n}\n\n.columns.is-mobile > .column.is-9 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 75%;\n}\n\n.columns.is-mobile > .column.is-offset-9 {\n  margin-left: 75%;\n}\n\n.columns.is-mobile > .column.is-10 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-offset-10 {\n  margin-left: 83.33333%;\n}\n\n.columns.is-mobile > .column.is-11 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-offset-11 {\n  margin-left: 91.66667%;\n}\n\n.columns.is-mobile > .column.is-12 {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 100%;\n}\n\n.columns.is-mobile > .column.is-offset-12 {\n  margin-left: 100%;\n}\n\n@media screen and (max-width: 768px) {\n  .column.is-narrow-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-mobile {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-mobile {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-mobile {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-mobile {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-mobile {\n    margin-left: 25%;\n  }\n  .column.is-1-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-mobile {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-mobile {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-mobile {\n    margin-left: 25%;\n  }\n  .column.is-4-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-mobile {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-mobile {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-mobile {\n    margin-left: 50%;\n  }\n  .column.is-7-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-mobile {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-mobile {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-mobile {\n    margin-left: 75%;\n  }\n  .column.is-10-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-mobile {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-mobile {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-mobile {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-mobile {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .column.is-narrow, .column.is-narrow-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full, .column.is-full-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters, .column.is-three-quarters-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds, .column.is-two-thirds-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half, .column.is-half-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third, .column.is-one-third-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter, .column.is-one-quarter-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half, .column.is-offset-half-tablet {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third, .column.is-offset-one-third-tablet {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {\n    margin-left: 25%;\n  }\n  .column.is-1, .column.is-1-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1, .column.is-offset-1-tablet {\n    margin-left: 8.33333%;\n  }\n  .column.is-2, .column.is-2-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2, .column.is-offset-2-tablet {\n    margin-left: 16.66667%;\n  }\n  .column.is-3, .column.is-3-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3, .column.is-offset-3-tablet {\n    margin-left: 25%;\n  }\n  .column.is-4, .column.is-4-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4, .column.is-offset-4-tablet {\n    margin-left: 33.33333%;\n  }\n  .column.is-5, .column.is-5-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5, .column.is-offset-5-tablet {\n    margin-left: 41.66667%;\n  }\n  .column.is-6, .column.is-6-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6, .column.is-offset-6-tablet {\n    margin-left: 50%;\n  }\n  .column.is-7, .column.is-7-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7, .column.is-offset-7-tablet {\n    margin-left: 58.33333%;\n  }\n  .column.is-8, .column.is-8-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8, .column.is-offset-8-tablet {\n    margin-left: 66.66667%;\n  }\n  .column.is-9, .column.is-9-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9, .column.is-offset-9-tablet {\n    margin-left: 75%;\n  }\n  .column.is-10, .column.is-10-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10, .column.is-offset-10-tablet {\n    margin-left: 83.33333%;\n  }\n  .column.is-11, .column.is-11-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11, .column.is-offset-11-tablet {\n    margin-left: 91.66667%;\n  }\n  .column.is-12, .column.is-12-tablet {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12, .column.is-offset-12-tablet {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .column.is-narrow-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-desktop {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-desktop {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-desktop {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-desktop {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-desktop {\n    margin-left: 25%;\n  }\n  .column.is-1-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-desktop {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-desktop {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-desktop {\n    margin-left: 25%;\n  }\n  .column.is-4-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-desktop {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-desktop {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-desktop {\n    margin-left: 50%;\n  }\n  .column.is-7-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-desktop {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-desktop {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-desktop {\n    margin-left: 75%;\n  }\n  .column.is-10-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-desktop {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-desktop {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-desktop {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-desktop {\n    margin-left: 100%;\n  }\n}\n\n@media screen and (min-width: 1192px) {\n  .column.is-narrow-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n  }\n  .column.is-full-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-three-quarters-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-two-thirds-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.6666%;\n  }\n  .column.is-half-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-one-third-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.3333%;\n  }\n  .column.is-one-quarter-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-three-quarters-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-offset-two-thirds-widescreen {\n    margin-left: 66.6666%;\n  }\n  .column.is-offset-half-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-offset-one-third-widescreen {\n    margin-left: 33.3333%;\n  }\n  .column.is-offset-one-quarter-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-1-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .column.is-offset-1-widescreen {\n    margin-left: 8.33333%;\n  }\n  .column.is-2-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .column.is-offset-2-widescreen {\n    margin-left: 16.66667%;\n  }\n  .column.is-3-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .column.is-offset-3-widescreen {\n    margin-left: 25%;\n  }\n  .column.is-4-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .column.is-offset-4-widescreen {\n    margin-left: 33.33333%;\n  }\n  .column.is-5-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .column.is-offset-5-widescreen {\n    margin-left: 41.66667%;\n  }\n  .column.is-6-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .column.is-offset-6-widescreen {\n    margin-left: 50%;\n  }\n  .column.is-7-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .column.is-offset-7-widescreen {\n    margin-left: 58.33333%;\n  }\n  .column.is-8-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .column.is-offset-8-widescreen {\n    margin-left: 66.66667%;\n  }\n  .column.is-9-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .column.is-offset-9-widescreen {\n    margin-left: 75%;\n  }\n  .column.is-10-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .column.is-offset-10-widescreen {\n    margin-left: 83.33333%;\n  }\n  .column.is-11-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .column.is-offset-11-widescreen {\n    margin-left: 91.66667%;\n  }\n  .column.is-12-widescreen {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n  .column.is-offset-12-widescreen {\n    margin-left: 100%;\n  }\n}\n\n.columns {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.columns:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.columns:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.columns.is-centered {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.columns.is-gapless {\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n}\n\n.columns.is-gapless:last-child {\n  margin-bottom: 0;\n}\n\n.columns.is-gapless:not(:last-child) {\n  margin-bottom: 1.5rem;\n}\n\n.columns.is-gapless > .column {\n  margin: 0;\n  padding: 0;\n}\n\n@media screen and (min-width: 769px) {\n  .columns.is-grid {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n  }\n  .columns.is-grid > .column {\n    max-width: 33.3333%;\n    padding: 0.75rem;\n    width: 33.3333%;\n  }\n  .columns.is-grid > .column + .column {\n    margin-left: 0;\n  }\n}\n\n.columns.is-mobile {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.columns.is-multiline {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.columns.is-vcentered {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n@media screen and (min-width: 769px) {\n  .columns:not(.is-desktop) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n@media screen and (min-width: 1000px) {\n  .columns.is-desktop {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\n\n.tile {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  display: block;\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n  min-height: -webkit-min-content;\n  min-height: -moz-min-content;\n  min-height: min-content;\n}\n\n.tile.is-ancestor {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n  margin-top: -0.75rem;\n}\n\n.tile.is-ancestor:last-child {\n  margin-bottom: -0.75rem;\n}\n\n.tile.is-ancestor:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.tile.is-child {\n  margin: 0 !important;\n}\n\n.tile.is-parent {\n  padding: 0.75rem;\n}\n\n.tile.is-vertical {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.tile.is-vertical > .tile.is-child:not(:last-child) {\n  margin-bottom: 1.5rem !important;\n}\n\n@media screen and (min-width: 769px) {\n  .tile:not(.is-child) {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .tile.is-1 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 8.33333%;\n  }\n  .tile.is-2 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 16.66667%;\n  }\n  .tile.is-3 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 25%;\n  }\n  .tile.is-4 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 33.33333%;\n  }\n  .tile.is-5 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 41.66667%;\n  }\n  .tile.is-6 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 50%;\n  }\n  .tile.is-7 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 58.33333%;\n  }\n  .tile.is-8 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 66.66667%;\n  }\n  .tile.is-9 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 75%;\n  }\n  .tile.is-10 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 83.33333%;\n  }\n  .tile.is-11 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 91.66667%;\n  }\n  .tile.is-12 {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n    width: 100%;\n  }\n}\n\n.hero-video {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.hero-video video {\n  left: 50%;\n  min-height: 100%;\n  min-width: 100%;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n          transform: translate3d(-50%, -50%, 0);\n}\n\n.hero-video.is-transparent {\n  opacity: 0.3;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-video {\n    display: none;\n  }\n}\n\n.hero-buttons {\n  margin-top: 1.5rem;\n}\n\n@media screen and (max-width: 768px) {\n  .hero-buttons .button {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-bottom: 0.75rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero-buttons {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n  .hero-buttons .button:not(:last-child) {\n    margin-right: 1.5rem;\n  }\n}\n\n.hero-head,\n.hero-foot {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n\n.hero-body {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  padding: 3rem 1.5rem;\n}\n\n@media screen and (min-width: 1192px) {\n  .hero-body {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n\n.hero {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  background-color: white;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.hero .nav {\n  background: none;\n  box-shadow: 0 1px 0 rgba(219, 219, 219, 0.3);\n}\n\n.hero .tabs ul {\n  border-bottom: none;\n}\n\n.hero.is-white {\n  background-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-white a,\n.hero.is-white strong {\n  color: inherit;\n}\n\n.hero.is-white .title {\n  color: #0a0a0a;\n}\n\n.hero.is-white .subtitle {\n  color: rgba(10, 10, 10, 0.9);\n}\n\n.hero.is-white .subtitle a,\n.hero.is-white .subtitle strong {\n  color: #0a0a0a;\n}\n\n.hero.is-white .nav {\n  box-shadow: 0 1px 0 rgba(10, 10, 10, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-white .nav-menu {\n    background-color: white;\n  }\n}\n\n.hero.is-white a.nav-item,\n.hero.is-white .nav-item a:not(.button) {\n  color: rgba(10, 10, 10, 0.7);\n}\n\n.hero.is-white a.nav-item:hover, .hero.is-white a.nav-item.is-active,\n.hero.is-white .nav-item a:not(.button):hover,\n.hero.is-white .nav-item a:not(.button).is-active {\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs a {\n  color: #0a0a0a;\n  opacity: 0.9;\n}\n\n.hero.is-white .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-white .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {\n  color: #0a0a0a;\n}\n\n.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {\n  background-color: #0a0a0a;\n  border-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-white.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #e6e6e6 0%, white 71%, white 100%);\n  background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-white .nav-toggle span {\n    background-color: #0a0a0a;\n  }\n  .hero.is-white .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-white .nav-toggle.is-active span {\n    background-color: #0a0a0a;\n  }\n  .hero.is-white .nav-menu .nav-item {\n    border-top-color: rgba(10, 10, 10, 0.2);\n  }\n}\n\n.hero.is-black {\n  background-color: #0a0a0a;\n  color: white;\n}\n\n.hero.is-black a,\n.hero.is-black strong {\n  color: inherit;\n}\n\n.hero.is-black .title {\n  color: white;\n}\n\n.hero.is-black .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-black .subtitle a,\n.hero.is-black .subtitle strong {\n  color: white;\n}\n\n.hero.is-black .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-black .nav-menu {\n    background-color: #0a0a0a;\n  }\n}\n\n.hero.is-black a.nav-item,\n.hero.is-black .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-black a.nav-item:hover, .hero.is-black a.nav-item.is-active,\n.hero.is-black .nav-item a:not(.button):hover,\n.hero.is-black .nav-item a:not(.button).is-active {\n  color: white;\n}\n\n.hero.is-black .tabs a {\n  color: white;\n  opacity: 0.9;\n}\n\n.hero.is-black .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-black .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {\n  color: white;\n}\n\n.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {\n  background-color: white;\n  border-color: white;\n  color: #0a0a0a;\n}\n\n.hero.is-black.is-bold {\n  background-image: -webkit-linear-gradient(309deg, black 0%, #0a0a0a 71%, #181616 100%);\n  background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-black .nav-toggle span {\n    background-color: white;\n  }\n  .hero.is-black .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-black .nav-toggle.is-active span {\n    background-color: white;\n  }\n  .hero.is-black .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-light {\n  background-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-light a,\n.hero.is-light strong {\n  color: inherit;\n}\n\n.hero.is-light .title {\n  color: #363636;\n}\n\n.hero.is-light .subtitle {\n  color: rgba(54, 54, 54, 0.9);\n}\n\n.hero.is-light .subtitle a,\n.hero.is-light .subtitle strong {\n  color: #363636;\n}\n\n.hero.is-light .nav {\n  box-shadow: 0 1px 0 rgba(54, 54, 54, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-light .nav-menu {\n    background-color: whitesmoke;\n  }\n}\n\n.hero.is-light a.nav-item,\n.hero.is-light .nav-item a:not(.button) {\n  color: rgba(54, 54, 54, 0.7);\n}\n\n.hero.is-light a.nav-item:hover, .hero.is-light a.nav-item.is-active,\n.hero.is-light .nav-item a:not(.button):hover,\n.hero.is-light .nav-item a:not(.button).is-active {\n  color: #363636;\n}\n\n.hero.is-light .tabs a {\n  color: #363636;\n  opacity: 0.9;\n}\n\n.hero.is-light .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-light .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {\n  color: #363636;\n}\n\n.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {\n  background-color: #363636;\n  border-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-light.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #dfd8d8 0%, whitesmoke 71%, white 100%);\n  background-image: linear-gradient(141deg, #dfd8d8 0%, whitesmoke 71%, white 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-light .nav-toggle span {\n    background-color: #363636;\n  }\n  .hero.is-light .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-light .nav-toggle.is-active span {\n    background-color: #363636;\n  }\n  .hero.is-light .nav-menu .nav-item {\n    border-top-color: rgba(54, 54, 54, 0.2);\n  }\n}\n\n.hero.is-dark {\n  background-color: #363636;\n  color: whitesmoke;\n}\n\n.hero.is-dark a,\n.hero.is-dark strong {\n  color: inherit;\n}\n\n.hero.is-dark .title {\n  color: whitesmoke;\n}\n\n.hero.is-dark .subtitle {\n  color: rgba(245, 245, 245, 0.9);\n}\n\n.hero.is-dark .subtitle a,\n.hero.is-dark .subtitle strong {\n  color: whitesmoke;\n}\n\n.hero.is-dark .nav {\n  box-shadow: 0 1px 0 rgba(245, 245, 245, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-dark .nav-menu {\n    background-color: #363636;\n  }\n}\n\n.hero.is-dark a.nav-item,\n.hero.is-dark .nav-item a:not(.button) {\n  color: rgba(245, 245, 245, 0.7);\n}\n\n.hero.is-dark a.nav-item:hover, .hero.is-dark a.nav-item.is-active,\n.hero.is-dark .nav-item a:not(.button):hover,\n.hero.is-dark .nav-item a:not(.button).is-active {\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs a {\n  color: whitesmoke;\n  opacity: 0.9;\n}\n\n.hero.is-dark .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {\n  color: whitesmoke;\n}\n\n.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {\n  background-color: whitesmoke;\n  border-color: whitesmoke;\n  color: #363636;\n}\n\n.hero.is-dark.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #1f1919 0%, #363636 71%, #463f3f 100%);\n  background-image: linear-gradient(141deg, #1f1919 0%, #363636 71%, #463f3f 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-dark .nav-toggle span {\n    background-color: whitesmoke;\n  }\n  .hero.is-dark .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-dark .nav-toggle.is-active span {\n    background-color: whitesmoke;\n  }\n  .hero.is-dark .nav-menu .nav-item {\n    border-top-color: rgba(245, 245, 245, 0.2);\n  }\n}\n\n.hero.is-primary {\n  background-color: #00d1b2;\n  color: #fff;\n}\n\n.hero.is-primary a,\n.hero.is-primary strong {\n  color: inherit;\n}\n\n.hero.is-primary .title {\n  color: #fff;\n}\n\n.hero.is-primary .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-primary .subtitle a,\n.hero.is-primary .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-primary .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-primary .nav-menu {\n    background-color: #00d1b2;\n  }\n}\n\n.hero.is-primary a.nav-item,\n.hero.is-primary .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-primary a.nav-item:hover, .hero.is-primary a.nav-item.is-active,\n.hero.is-primary .nav-item a:not(.button):hover,\n.hero.is-primary .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-primary .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-primary .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #00d1b2;\n}\n\n.hero.is-primary.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n  background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-primary .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-primary .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-primary .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-primary .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-info {\n  background-color: #3273dc;\n  color: #fff;\n}\n\n.hero.is-info a,\n.hero.is-info strong {\n  color: inherit;\n}\n\n.hero.is-info .title {\n  color: #fff;\n}\n\n.hero.is-info .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-info .subtitle a,\n.hero.is-info .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-info .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-info .nav-menu {\n    background-color: #3273dc;\n  }\n}\n\n.hero.is-info a.nav-item,\n.hero.is-info .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-info a.nav-item:hover, .hero.is-info a.nav-item.is-active,\n.hero.is-info .nav-item a:not(.button):hover,\n.hero.is-info .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-info .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-info .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-info .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #3273dc;\n}\n\n.hero.is-info.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n  background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-info .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-info .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-info .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-info .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-success {\n  background-color: #23d160;\n  color: #fff;\n}\n\n.hero.is-success a,\n.hero.is-success strong {\n  color: inherit;\n}\n\n.hero.is-success .title {\n  color: #fff;\n}\n\n.hero.is-success .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-success .subtitle a,\n.hero.is-success .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-success .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-success .nav-menu {\n    background-color: #23d160;\n  }\n}\n\n.hero.is-success a.nav-item,\n.hero.is-success .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-success a.nav-item:hover, .hero.is-success a.nav-item.is-active,\n.hero.is-success .nav-item a:not(.button):hover,\n.hero.is-success .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-success .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-success .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-success .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #23d160;\n}\n\n.hero.is-success.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n  background-image: linear-gradient(141deg, #12af2f 0%, #23d160 71%, #2ce28a 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-success .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-success .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-success .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-success .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.hero.is-warning {\n  background-color: #ffdd57;\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a,\n.hero.is-warning strong {\n  color: inherit;\n}\n\n.hero.is-warning .title {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .subtitle {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.hero.is-warning .subtitle a,\n.hero.is-warning .subtitle strong {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .nav {\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-warning .nav-menu {\n    background-color: #ffdd57;\n  }\n}\n\n.hero.is-warning a.nav-item,\n.hero.is-warning .nav-item a:not(.button) {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning a.nav-item:hover, .hero.is-warning a.nav-item.is-active,\n.hero.is-warning .nav-item a:not(.button):hover,\n.hero.is-warning .nav-item a:not(.button).is-active {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs a {\n  color: rgba(0, 0, 0, 0.7);\n  opacity: 0.9;\n}\n\n.hero.is-warning .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  border-color: rgba(0, 0, 0, 0.7);\n  color: #ffdd57;\n}\n\n.hero.is-warning.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n  background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-warning .nav-toggle span {\n    background-color: rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-warning .nav-toggle.is-active span {\n    background-color: rgba(0, 0, 0, 0.7);\n  }\n  .hero.is-warning .nav-menu .nav-item {\n    border-top-color: rgba(0, 0, 0, 0.2);\n  }\n}\n\n.hero.is-danger {\n  background-color: #ff3860;\n  color: #fff;\n}\n\n.hero.is-danger a,\n.hero.is-danger strong {\n  color: inherit;\n}\n\n.hero.is-danger .title {\n  color: #fff;\n}\n\n.hero.is-danger .subtitle {\n  color: rgba(255, 255, 255, 0.9);\n}\n\n.hero.is-danger .subtitle a,\n.hero.is-danger .subtitle strong {\n  color: #fff;\n}\n\n.hero.is-danger .nav {\n  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-danger .nav-menu {\n    background-color: #ff3860;\n  }\n}\n\n.hero.is-danger a.nav-item,\n.hero.is-danger .nav-item a:not(.button) {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.hero.is-danger a.nav-item:hover, .hero.is-danger a.nav-item.is-active,\n.hero.is-danger .nav-item a:not(.button):hover,\n.hero.is-danger .nav-item a:not(.button).is-active {\n  color: #fff;\n}\n\n.hero.is-danger .tabs a {\n  color: #fff;\n  opacity: 0.9;\n}\n\n.hero.is-danger .tabs a:hover {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs li.is-active a {\n  opacity: 1;\n}\n\n.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {\n  color: #fff;\n}\n\n.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {\n  background-color: rgba(10, 10, 10, 0.1);\n}\n\n.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  color: #ff3860;\n}\n\n.hero.is-danger.is-bold {\n  background-image: -webkit-linear-gradient(309deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n  background-image: linear-gradient(141deg, #ff0561 0%, #ff3860 71%, #ff5257 100%);\n}\n\n@media screen and (max-width: 768px) {\n  .hero.is-danger .nav-toggle span {\n    background-color: #fff;\n  }\n  .hero.is-danger .nav-toggle:hover {\n    background-color: rgba(10, 10, 10, 0.1);\n  }\n  .hero.is-danger .nav-toggle.is-active span {\n    background-color: #fff;\n  }\n  .hero.is-danger .nav-menu .nav-item {\n    border-top-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero.is-medium .hero-body {\n    padding-bottom: 9rem;\n    padding-top: 9rem;\n  }\n}\n\n@media screen and (min-width: 769px) {\n  .hero.is-large .hero-body {\n    padding-bottom: 18rem;\n    padding-top: 18rem;\n  }\n}\n\n.hero.is-fullheight {\n  min-height: 100vh;\n}\n\n.hero.is-fullheight .hero-body {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.hero.is-fullheight .hero-body > .container {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n\n.section {\n  background-color: white;\n  padding: 3rem 1.5rem;\n}\n\n@media screen and (min-width: 1000px) {\n  .section.is-medium {\n    padding: 9rem 1.5rem;\n  }\n  .section.is-large {\n    padding: 18rem 1.5rem;\n  }\n}\n\n.footer {\n  background-color: whitesmoke;\n  padding: 3rem 1.5rem 6rem;\n}\n/*# sourceMappingURL=bulma.css.map */", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".flex-center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nbody {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  overflow: hidden;\n  background: #eee;\n  font-family: 'Roboto', sans-serif;\n}\n.myApp-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-flow: column nowrap;\n}\n.myApp-container h1 {\n  font-size: 40px;\n  text-align: center;\n  transition: 700ms;\n}\n.myApp-container .notification {\n  width: 50vw;\n  height: 35vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-flow: column wrap;\n  transition: 1000ms;\n}\n@media screen and (max-width: 1200px) {\n  .myApp-container .notification {\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n  }\n  .myApp-container .notification h1 {\n    font-size: 22px;\n  }\n}\n.myApp-container .notification.all-is-well {\n  box-shadow: 0 0 30px #23d160;\n}\n.myApp-container .notification.all-is-well .result {\n  color: #23d160;\n}\n.myApp-container .notification.all-is-well h1 {\n  color: #1ca54c;\n}\n.myApp-container .notification.not-so-good {\n  box-shadow: 0 0 30px #ff3860;\n}\n.myApp-container .notification.not-so-good .result {\n  color: #ff3860;\n}\n.myApp-container .notification.not-so-good h1 {\n  color: #ff0537;\n}\n.myApp-container .result {\n  font-size: 10vw;\n  transition: color 1000ms ease-out;\n}\n.myApp-container .btn-group {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.myApp-container .btn-group button {\n  margin: 0 24px;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.message[data-v-99ecdc1c] {\n  cursor: pointer;\n  margin-bottom: 24px;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(10);
var ieee754 = __webpack_require__(13);
var isArray = __webpack_require__(14);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* eslint-disable */

// XXXXX: This file should not exist. Working around a core level bug
// that prevents using fs at loaders.
//var fs = require('fs'); // XXX

var path = __webpack_require__(15);

var commentRx = /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/mg;
var mapFileCommentRx =
//Example (Extra space between slashes added to solve Safari bug. Exclude space in production):
//     / /# sourceMappingURL=foo.js.map           /*# sourceMappingURL=foo.js.map */
/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/mg;

function decodeBase64(base64) {
  return new Buffer(base64, 'base64').toString();
}

function stripComment(sm) {
  return sm.split(',').pop();
}

function readFromFileMap(sm, dir) {
  // NOTE: this will only work on the server since it attempts to read the map file

  mapFileCommentRx.lastIndex = 0;
  var r = mapFileCommentRx.exec(sm);

  // for some odd reason //# .. captures in 1 and /* .. */ in 2
  var filename = r[1] || r[2];
  var filepath = path.resolve(dir, filename);

  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    throw new Error('An error occurred while trying to read the map file at ' + filepath + '\n' + e);
  }
}

function Converter(sm, opts) {
  opts = opts || {};

  if (opts.isFileComment) sm = readFromFileMap(sm, opts.commentFileDir);
  if (opts.hasComment) sm = stripComment(sm);
  if (opts.isEncoded) sm = decodeBase64(sm);
  if (opts.isJSON || opts.isEncoded) sm = JSON.parse(sm);

  this.sourcemap = sm;
}

Converter.prototype.toJSON = function (space) {
  return JSON.stringify(this.sourcemap, null, space);
};

Converter.prototype.toBase64 = function () {
  var json = this.toJSON();
  return new Buffer(json).toString('base64');
};

Converter.prototype.toComment = function (options) {
  var base64 = this.toBase64();
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return options && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
};

// returns copy instead of original
Converter.prototype.toObject = function () {
  return JSON.parse(this.toJSON());
};

Converter.prototype.addProperty = function (key, value) {
  if (this.sourcemap.hasOwnProperty(key)) throw new Error('property %s already exists on the sourcemap, use set property instead');
  return this.setProperty(key, value);
};

Converter.prototype.setProperty = function (key, value) {
  this.sourcemap[key] = value;
  return this;
};

Converter.prototype.getProperty = function (key) {
  return this.sourcemap[key];
};

exports.fromObject = function (obj) {
  return new Converter(obj);
};

exports.fromJSON = function (json) {
  return new Converter(json, { isJSON: true });
};

exports.fromBase64 = function (base64) {
  return new Converter(base64, { isEncoded: true });
};

exports.fromComment = function (comment) {
  comment = comment.replace(/^\/\*/g, '//').replace(/\*\/$/g, '');

  return new Converter(comment, { isEncoded: true, hasComment: true });
};

exports.fromMapFileComment = function (comment, dir) {
  return new Converter(comment, { commentFileDir: dir, isFileComment: true, isJSON: true });
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromSource = function (content) {
  var m = content.match(commentRx);
  return m ? exports.fromComment(m.pop()) : null;
};

// Finds last sourcemap comment in file or returns null if none was found
exports.fromMapFileSource = function (content, dir) {
  var m = content.match(mapFileCommentRx);
  return m ? exports.fromMapFileComment(m.pop(), dir) : null;
};

exports.removeComments = function (src) {
  return src.replace(commentRx, '');
};

exports.removeMapFileComments = function (src) {
  return src.replace(mapFileCommentRx, '');
};

exports.generateMapFileComment = function (file, options) {
  var data = 'sourceMappingURL=' + file;
  return options && options.multiline ? '/*# ' + data + ' */' : '//# ' + data;
};

Object.defineProperty(exports, 'commentRegex', {
  get: function getCommentRegex() {
    return commentRx;
  }
});

Object.defineProperty(exports, 'mapFileCommentRegex', {
  get: function getMapFileCommentRegex() {
    return mapFileCommentRx;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).Buffer))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};

      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

var Module = function Module(rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {}, namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {};
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors$1);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) {
    return;
  }

  parent.removeChild(key);
};

function update(targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
        return;
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state;if (state === void 0) state = {};
  var plugins = options.plugins;if (plugins === void 0) plugins = [];
  var strict = options.strict;if (strict === void 0) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) {
    return plugin(this$1);
  });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error("[vuex] unknown mutation type: " + type);
    return;
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if (options && options.silent) {
    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error("[vuex] unknown action type: " + type);
    return;
  }
  return entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
};

Store.prototype.subscribe = function subscribe(fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule) {
  if (typeof path === 'string') {
    path = [path];
  }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors);

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () {
      return fn(store);
    };
    Object.defineProperty(store.getters, key, {
      get: function get() {
        return store._vm[key];
      },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function get() {
        return getNestedState(store.state, path);
      }
    }
  });

  return local;
}

function makeLocalGetters(store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) {
      return;
    }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function get() {
        return store.getters[type];
      },
      enumerable: true
    });
  });

  return gettersProxy;
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler(local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error("[vuex] duplicate getter key: " + type);
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState(state, path) {
  return path.length ? path.reduce(function (state, key) {
    return state[key];
  }, state) : state;
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', "Expects string as the type, but found " + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + ".");

  return { type: type, payload: payload, options: options };
}

function install(_Vue) {
  if (Vue) {
    console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return;
      }
      return this.$store.commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }
      if (!(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return;
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return { key: key, val: key };
  }) : Object.keys(map).map(function (key) {
    return { key: key, val: map[key] };
  });
}

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.2.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

exports.Store = Store;
exports.mapState = mapState;
exports.mapMutations = mapMutations;
exports.mapGetters = mapGetters;
exports.mapActions = mapActions;
exports.default = index_esm;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myApp = undefined;

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _store = __webpack_require__(22);

var _component = __webpack_require__(28);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.debug = true;
_vue2.default.config.devtools = true;

var myApp = exports.myApp = new _vue2.default({
    name: 'myApp',
    template: '#myApp',
    el: '#app', // instance startig container
    components: {
        'my-component': _component2.default
    },
    data: function data() {
        return {};
    },
    computed: {
        result: function result() {
            return _store.myAppData.state.result;
        }
    },
    methods: {
        increment: function increment() {
            _store.myAppData.dispatch('increment');
        },
        decrement: function decrement() {
            _store.myAppData.dispatch('decrement');
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var actions = exports.actions = {
    increment: function increment(context) {
        context.commit('increment');
    },
    decrement: function decrement(context) {
        context.commit('decrement');
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var mutations = exports.mutations = {
    increment: function increment(state) {
        state.result++;
    },
    decrement: function decrement(state) {
        state.result--;
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
var state = exports.state = {
        result: 0
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myAppData = undefined;

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(17);

var _vuex2 = _interopRequireDefault(_vuex);

var _state = __webpack_require__(21);

var _actions = __webpack_require__(19);

var _mutations = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Vuex vault
_vue2.default.use(_vuex2.default);
var myAppData = exports.myAppData = new _vuex2.default.Store({
    state: _state.state,
    mutations: _mutations.mutations,
    actions: _actions.actions
});

// test
myAppData.commit('increment');

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "\"use strict\";\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/*!\n * jQuery JavaScript Library v3.1.1\n * https://jquery.com/\n *\n * Includes Sizzle.js\n * https://sizzlejs.com/\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * https://jquery.org/license\n *\n * Date: 2016-09-22T22:30Z\n */\n(function (global, factory) {\n\n\t\"use strict\";\n\n\tif ((typeof module === \"undefined\" ? \"undefined\" : _typeof(module)) === \"object\" && _typeof(module.exports) === \"object\") {\n\n\t\t// For CommonJS and CommonJS-like environments where a proper `window`\n\t\t// is present, execute the factory and get jQuery.\n\t\t// For environments that do not have a `window` with a `document`\n\t\t// (such as Node.js), expose a factory as module.exports.\n\t\t// This accentuates the need for the creation of a real `window`.\n\t\t// e.g. var jQuery = require(\"jquery\")(window);\n\t\t// See ticket #14549 for more info.\n\t\tmodule.exports = global.document ? factory(global, true) : function (w) {\n\t\t\tif (!w.document) {\n\t\t\t\tthrow new Error(\"jQuery requires a window with a document\");\n\t\t\t}\n\t\t\treturn factory(w);\n\t\t};\n\t} else {\n\t\tfactory(global);\n\t}\n\n\t// Pass this if window is not defined yet\n})(typeof window !== \"undefined\" ? window : undefined, function (window, noGlobal) {\n\n\t// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1\n\t// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode\n\t// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common\n\t// enough that all such attempts are guarded in a try block.\n\t\"use strict\";\n\n\tvar arr = [];\n\n\tvar document = window.document;\n\n\tvar getProto = Object.getPrototypeOf;\n\n\tvar _slice = arr.slice;\n\n\tvar concat = arr.concat;\n\n\tvar push = arr.push;\n\n\tvar indexOf = arr.indexOf;\n\n\tvar class2type = {};\n\n\tvar toString = class2type.toString;\n\n\tvar hasOwn = class2type.hasOwnProperty;\n\n\tvar fnToString = hasOwn.toString;\n\n\tvar ObjectFunctionString = fnToString.call(Object);\n\n\tvar support = {};\n\n\tfunction DOMEval(code, doc) {\n\t\tdoc = doc || document;\n\n\t\tvar script = doc.createElement(\"script\");\n\n\t\tscript.text = code;\n\t\tdoc.head.appendChild(script).parentNode.removeChild(script);\n\t}\n\t/* global Symbol */\n\t// Defining this global in .eslintrc.json would create a danger of using the global\n\t// unguarded in another place, it seems safer to define global only for this module\n\n\n\tvar version = \"3.1.1\",\n\n\n\t// Define a local copy of jQuery\n\tjQuery = function jQuery(selector, context) {\n\n\t\t// The jQuery object is actually just the init constructor 'enhanced'\n\t\t// Need init if jQuery is called (just allow error to be thrown if not included)\n\t\treturn new jQuery.fn.init(selector, context);\n\t},\n\n\n\t// Support: Android <=4.0 only\n\t// Make sure we trim BOM and NBSP\n\trtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\n\n\t// Matches dashed string for camelizing\n\trmsPrefix = /^-ms-/,\n\t    rdashAlpha = /-([a-z])/g,\n\n\n\t// Used by jQuery.camelCase as callback to replace()\n\tfcamelCase = function fcamelCase(all, letter) {\n\t\treturn letter.toUpperCase();\n\t};\n\n\tjQuery.fn = jQuery.prototype = {\n\n\t\t// The current version of jQuery being used\n\t\tjquery: version,\n\n\t\tconstructor: jQuery,\n\n\t\t// The default length of a jQuery object is 0\n\t\tlength: 0,\n\n\t\ttoArray: function toArray() {\n\t\t\treturn _slice.call(this);\n\t\t},\n\n\t\t// Get the Nth element in the matched element set OR\n\t\t// Get the whole matched element set as a clean array\n\t\tget: function get(num) {\n\n\t\t\t// Return all the elements in a clean array\n\t\t\tif (num == null) {\n\t\t\t\treturn _slice.call(this);\n\t\t\t}\n\n\t\t\t// Return just the one element from the set\n\t\t\treturn num < 0 ? this[num + this.length] : this[num];\n\t\t},\n\n\t\t// Take an array of elements and push it onto the stack\n\t\t// (returning the new matched element set)\n\t\tpushStack: function pushStack(elems) {\n\n\t\t\t// Build a new jQuery matched element set\n\t\t\tvar ret = jQuery.merge(this.constructor(), elems);\n\n\t\t\t// Add the old object onto the stack (as a reference)\n\t\t\tret.prevObject = this;\n\n\t\t\t// Return the newly-formed element set\n\t\t\treturn ret;\n\t\t},\n\n\t\t// Execute a callback for every element in the matched set.\n\t\teach: function each(callback) {\n\t\t\treturn jQuery.each(this, callback);\n\t\t},\n\n\t\tmap: function map(callback) {\n\t\t\treturn this.pushStack(jQuery.map(this, function (elem, i) {\n\t\t\t\treturn callback.call(elem, i, elem);\n\t\t\t}));\n\t\t},\n\n\t\tslice: function slice() {\n\t\t\treturn this.pushStack(_slice.apply(this, arguments));\n\t\t},\n\n\t\tfirst: function first() {\n\t\t\treturn this.eq(0);\n\t\t},\n\n\t\tlast: function last() {\n\t\t\treturn this.eq(-1);\n\t\t},\n\n\t\teq: function eq(i) {\n\t\t\tvar len = this.length,\n\t\t\t    j = +i + (i < 0 ? len : 0);\n\t\t\treturn this.pushStack(j >= 0 && j < len ? [this[j]] : []);\n\t\t},\n\n\t\tend: function end() {\n\t\t\treturn this.prevObject || this.constructor();\n\t\t},\n\n\t\t// For internal use only.\n\t\t// Behaves like an Array's method, not like a jQuery method.\n\t\tpush: push,\n\t\tsort: arr.sort,\n\t\tsplice: arr.splice\n\t};\n\n\tjQuery.extend = jQuery.fn.extend = function () {\n\t\tvar options,\n\t\t    name,\n\t\t    src,\n\t\t    copy,\n\t\t    copyIsArray,\n\t\t    clone,\n\t\t    target = arguments[0] || {},\n\t\t    i = 1,\n\t\t    length = arguments.length,\n\t\t    deep = false;\n\n\t\t// Handle a deep copy situation\n\t\tif (typeof target === \"boolean\") {\n\t\t\tdeep = target;\n\n\t\t\t// Skip the boolean and the target\n\t\t\ttarget = arguments[i] || {};\n\t\t\ti++;\n\t\t}\n\n\t\t// Handle case when target is a string or something (possible in deep copy)\n\t\tif ((typeof target === \"undefined\" ? \"undefined\" : _typeof(target)) !== \"object\" && !jQuery.isFunction(target)) {\n\t\t\ttarget = {};\n\t\t}\n\n\t\t// Extend jQuery itself if only one argument is passed\n\t\tif (i === length) {\n\t\t\ttarget = this;\n\t\t\ti--;\n\t\t}\n\n\t\tfor (; i < length; i++) {\n\n\t\t\t// Only deal with non-null/undefined values\n\t\t\tif ((options = arguments[i]) != null) {\n\n\t\t\t\t// Extend the base object\n\t\t\t\tfor (name in options) {\n\t\t\t\t\tsrc = target[name];\n\t\t\t\t\tcopy = options[name];\n\n\t\t\t\t\t// Prevent never-ending loop\n\t\t\t\t\tif (target === copy) {\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Recurse if we're merging plain objects or arrays\n\t\t\t\t\tif (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {\n\n\t\t\t\t\t\tif (copyIsArray) {\n\t\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\t\tclone = src && jQuery.isArray(src) ? src : [];\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tclone = src && jQuery.isPlainObject(src) ? src : {};\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\t\ttarget[name] = jQuery.extend(deep, clone, copy);\n\n\t\t\t\t\t\t// Don't bring in undefined values\n\t\t\t\t\t} else if (copy !== undefined) {\n\t\t\t\t\t\ttarget[name] = copy;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Return the modified object\n\t\treturn target;\n\t};\n\n\tjQuery.extend({\n\n\t\t// Unique for each copy of jQuery on the page\n\t\texpando: \"jQuery\" + (version + Math.random()).replace(/\\D/g, \"\"),\n\n\t\t// Assume jQuery is ready without the ready module\n\t\tisReady: true,\n\n\t\terror: function error(msg) {\n\t\t\tthrow new Error(msg);\n\t\t},\n\n\t\tnoop: function noop() {},\n\n\t\tisFunction: function isFunction(obj) {\n\t\t\treturn jQuery.type(obj) === \"function\";\n\t\t},\n\n\t\tisArray: Array.isArray,\n\n\t\tisWindow: function isWindow(obj) {\n\t\t\treturn obj != null && obj === obj.window;\n\t\t},\n\n\t\tisNumeric: function isNumeric(obj) {\n\n\t\t\t// As of jQuery 3.0, isNumeric is limited to\n\t\t\t// strings and numbers (primitives or objects)\n\t\t\t// that can be coerced to finite numbers (gh-2662)\n\t\t\tvar type = jQuery.type(obj);\n\t\t\treturn (type === \"number\" || type === \"string\") &&\n\n\t\t\t// parseFloat NaNs numeric-cast false positives (\"\")\n\t\t\t// ...but misinterprets leading-number strings, particularly hex literals (\"0x...\")\n\t\t\t// subtraction forces infinities to NaN\n\t\t\t!isNaN(obj - parseFloat(obj));\n\t\t},\n\n\t\tisPlainObject: function isPlainObject(obj) {\n\t\t\tvar proto, Ctor;\n\n\t\t\t// Detect obvious negatives\n\t\t\t// Use toString instead of jQuery.type to catch host objects\n\t\t\tif (!obj || toString.call(obj) !== \"[object Object]\") {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tproto = getProto(obj);\n\n\t\t\t// Objects with no prototype (e.g., `Object.create( null )`) are plain\n\t\t\tif (!proto) {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t\t// Objects with prototype are plain iff they were constructed by a global Object function\n\t\t\tCtor = hasOwn.call(proto, \"constructor\") && proto.constructor;\n\t\t\treturn typeof Ctor === \"function\" && fnToString.call(Ctor) === ObjectFunctionString;\n\t\t},\n\n\t\tisEmptyObject: function isEmptyObject(obj) {\n\n\t\t\t/* eslint-disable no-unused-vars */\n\t\t\t// See https://github.com/eslint/eslint/issues/6125\n\t\t\tvar name;\n\n\t\t\tfor (name in obj) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t},\n\n\t\ttype: function type(obj) {\n\t\t\tif (obj == null) {\n\t\t\t\treturn obj + \"\";\n\t\t\t}\n\n\t\t\t// Support: Android <=2.3 only (functionish RegExp)\n\t\t\treturn (typeof obj === \"undefined\" ? \"undefined\" : _typeof(obj)) === \"object\" || typeof obj === \"function\" ? class2type[toString.call(obj)] || \"object\" : typeof obj === \"undefined\" ? \"undefined\" : _typeof(obj);\n\t\t},\n\n\t\t// Evaluates a script in a global context\n\t\tglobalEval: function globalEval(code) {\n\t\t\tDOMEval(code);\n\t\t},\n\n\t\t// Convert dashed to camelCase; used by the css and data modules\n\t\t// Support: IE <=9 - 11, Edge 12 - 13\n\t\t// Microsoft forgot to hump their vendor prefix (#9572)\n\t\tcamelCase: function camelCase(string) {\n\t\t\treturn string.replace(rmsPrefix, \"ms-\").replace(rdashAlpha, fcamelCase);\n\t\t},\n\n\t\tnodeName: function nodeName(elem, name) {\n\t\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n\t\t},\n\n\t\teach: function each(obj, callback) {\n\t\t\tvar length,\n\t\t\t    i = 0;\n\n\t\t\tif (isArrayLike(obj)) {\n\t\t\t\tlength = obj.length;\n\t\t\t\tfor (; i < length; i++) {\n\t\t\t\t\tif (callback.call(obj[i], i, obj[i]) === false) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tfor (i in obj) {\n\t\t\t\t\tif (callback.call(obj[i], i, obj[i]) === false) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn obj;\n\t\t},\n\n\t\t// Support: Android <=4.0 only\n\t\ttrim: function trim(text) {\n\t\t\treturn text == null ? \"\" : (text + \"\").replace(rtrim, \"\");\n\t\t},\n\n\t\t// results is for internal usage only\n\t\tmakeArray: function makeArray(arr, results) {\n\t\t\tvar ret = results || [];\n\n\t\t\tif (arr != null) {\n\t\t\t\tif (isArrayLike(Object(arr))) {\n\t\t\t\t\tjQuery.merge(ret, typeof arr === \"string\" ? [arr] : arr);\n\t\t\t\t} else {\n\t\t\t\t\tpush.call(ret, arr);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn ret;\n\t\t},\n\n\t\tinArray: function inArray(elem, arr, i) {\n\t\t\treturn arr == null ? -1 : indexOf.call(arr, elem, i);\n\t\t},\n\n\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\tmerge: function merge(first, second) {\n\t\t\tvar len = +second.length,\n\t\t\t    j = 0,\n\t\t\t    i = first.length;\n\n\t\t\tfor (; j < len; j++) {\n\t\t\t\tfirst[i++] = second[j];\n\t\t\t}\n\n\t\t\tfirst.length = i;\n\n\t\t\treturn first;\n\t\t},\n\n\t\tgrep: function grep(elems, callback, invert) {\n\t\t\tvar callbackInverse,\n\t\t\t    matches = [],\n\t\t\t    i = 0,\n\t\t\t    length = elems.length,\n\t\t\t    callbackExpect = !invert;\n\n\t\t\t// Go through the array, only saving the items\n\t\t\t// that pass the validator function\n\t\t\tfor (; i < length; i++) {\n\t\t\t\tcallbackInverse = !callback(elems[i], i);\n\t\t\t\tif (callbackInverse !== callbackExpect) {\n\t\t\t\t\tmatches.push(elems[i]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn matches;\n\t\t},\n\n\t\t// arg is for internal usage only\n\t\tmap: function map(elems, callback, arg) {\n\t\t\tvar length,\n\t\t\t    value,\n\t\t\t    i = 0,\n\t\t\t    ret = [];\n\n\t\t\t// Go through the array, translating each of the items to their new values\n\t\t\tif (isArrayLike(elems)) {\n\t\t\t\tlength = elems.length;\n\t\t\t\tfor (; i < length; i++) {\n\t\t\t\t\tvalue = callback(elems[i], i, arg);\n\n\t\t\t\t\tif (value != null) {\n\t\t\t\t\t\tret.push(value);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Go through every key on the object,\n\t\t\t} else {\n\t\t\t\tfor (i in elems) {\n\t\t\t\t\tvalue = callback(elems[i], i, arg);\n\n\t\t\t\t\tif (value != null) {\n\t\t\t\t\t\tret.push(value);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Flatten any nested arrays\n\t\t\treturn concat.apply([], ret);\n\t\t},\n\n\t\t// A global GUID counter for objects\n\t\tguid: 1,\n\n\t\t// Bind a function to a context, optionally partially applying any\n\t\t// arguments.\n\t\tproxy: function proxy(fn, context) {\n\t\t\tvar tmp, args, proxy;\n\n\t\t\tif (typeof context === \"string\") {\n\t\t\t\ttmp = fn[context];\n\t\t\t\tcontext = fn;\n\t\t\t\tfn = tmp;\n\t\t\t}\n\n\t\t\t// Quick check to determine if target is callable, in the spec\n\t\t\t// this throws a TypeError, but we will just return undefined.\n\t\t\tif (!jQuery.isFunction(fn)) {\n\t\t\t\treturn undefined;\n\t\t\t}\n\n\t\t\t// Simulated bind\n\t\t\targs = _slice.call(arguments, 2);\n\t\t\tproxy = function proxy() {\n\t\t\t\treturn fn.apply(context || this, args.concat(_slice.call(arguments)));\n\t\t\t};\n\n\t\t\t// Set the guid of unique handler to the same of original handler, so it can be removed\n\t\t\tproxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\n\t\t\treturn proxy;\n\t\t},\n\n\t\tnow: Date.now,\n\n\t\t// jQuery.support is not used in Core but other projects attach their\n\t\t// properties to it so it needs to exist.\n\t\tsupport: support\n\t});\n\n\tif (typeof Symbol === \"function\") {\n\t\tjQuery.fn[Symbol.iterator] = arr[Symbol.iterator];\n\t}\n\n\t// Populate the class2type map\n\tjQuery.each(\"Boolean Number String Function Array Date RegExp Object Error Symbol\".split(\" \"), function (i, name) {\n\t\tclass2type[\"[object \" + name + \"]\"] = name.toLowerCase();\n\t});\n\n\tfunction isArrayLike(obj) {\n\n\t\t// Support: real iOS 8.2 only (not reproducible in simulator)\n\t\t// `in` check used to prevent JIT error (gh-2145)\n\t\t// hasOwn isn't used here due to false negatives\n\t\t// regarding Nodelist length in IE\n\t\tvar length = !!obj && \"length\" in obj && obj.length,\n\t\t    type = jQuery.type(obj);\n\n\t\tif (type === \"function\" || jQuery.isWindow(obj)) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn type === \"array\" || length === 0 || typeof length === \"number\" && length > 0 && length - 1 in obj;\n\t}\n\tvar Sizzle =\n\t/*!\n  * Sizzle CSS Selector Engine v2.3.3\n  * https://sizzlejs.com/\n  *\n  * Copyright jQuery Foundation and other contributors\n  * Released under the MIT license\n  * http://jquery.org/license\n  *\n  * Date: 2016-08-08\n  */\n\tfunction (window) {\n\n\t\tvar i,\n\t\t    support,\n\t\t    Expr,\n\t\t    getText,\n\t\t    isXML,\n\t\t    tokenize,\n\t\t    compile,\n\t\t    select,\n\t\t    outermostContext,\n\t\t    sortInput,\n\t\t    hasDuplicate,\n\n\n\t\t// Local document vars\n\t\tsetDocument,\n\t\t    document,\n\t\t    docElem,\n\t\t    documentIsHTML,\n\t\t    rbuggyQSA,\n\t\t    rbuggyMatches,\n\t\t    matches,\n\t\t    contains,\n\n\n\t\t// Instance-specific data\n\t\texpando = \"sizzle\" + 1 * new Date(),\n\t\t    preferredDoc = window.document,\n\t\t    dirruns = 0,\n\t\t    done = 0,\n\t\t    classCache = createCache(),\n\t\t    tokenCache = createCache(),\n\t\t    compilerCache = createCache(),\n\t\t    sortOrder = function sortOrder(a, b) {\n\t\t\tif (a === b) {\n\t\t\t\thasDuplicate = true;\n\t\t\t}\n\t\t\treturn 0;\n\t\t},\n\n\n\t\t// Instance methods\n\t\thasOwn = {}.hasOwnProperty,\n\t\t    arr = [],\n\t\t    pop = arr.pop,\n\t\t    push_native = arr.push,\n\t\t    push = arr.push,\n\t\t    slice = arr.slice,\n\n\t\t// Use a stripped-down indexOf as it's faster than native\n\t\t// https://jsperf.com/thor-indexof-vs-for/5\n\t\tindexOf = function indexOf(list, elem) {\n\t\t\tvar i = 0,\n\t\t\t    len = list.length;\n\t\t\tfor (; i < len; i++) {\n\t\t\t\tif (list[i] === elem) {\n\t\t\t\t\treturn i;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn -1;\n\t\t},\n\t\t    booleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n\n\n\t\t// Regular expressions\n\n\t\t// http://www.w3.org/TR/css3-selectors/#whitespace\n\t\twhitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\n\n\n\t\t// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n\t\tidentifier = \"(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+\",\n\n\n\t\t// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n\t\tattributes = \"\\\\[\" + whitespace + \"*(\" + identifier + \")(?:\" + whitespace +\n\t\t// Operator (capture 2)\n\t\t\"*([*^$|!~]?=)\" + whitespace +\n\t\t// \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\n\t\t\"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace + \"*\\\\]\",\n\t\t    pseudos = \":(\" + identifier + \")(?:\\\\((\" +\n\t\t// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n\t\t// 1. quoted (capture 3; capture 4 or capture 5)\n\t\t\"('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\n\t\t// 2. simple (capture 6)\n\t\t\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\n\t\t// 3. anything else (capture 2)\n\t\t\".*\" + \")\\\\)|)\",\n\n\n\t\t// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n\t\trwhitespace = new RegExp(whitespace + \"+\", \"g\"),\n\t\t    rtrim = new RegExp(\"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\"),\n\t\t    rcomma = new RegExp(\"^\" + whitespace + \"*,\" + whitespace + \"*\"),\n\t\t    rcombinators = new RegExp(\"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\"),\n\t\t    rattributeQuotes = new RegExp(\"=\" + whitespace + \"*([^\\\\]'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\"),\n\t\t    rpseudo = new RegExp(pseudos),\n\t\t    ridentifier = new RegExp(\"^\" + identifier + \"$\"),\n\t\t    matchExpr = {\n\t\t\t\"ID\": new RegExp(\"^#(\" + identifier + \")\"),\n\t\t\t\"CLASS\": new RegExp(\"^\\\\.(\" + identifier + \")\"),\n\t\t\t\"TAG\": new RegExp(\"^(\" + identifier + \"|[*])\"),\n\t\t\t\"ATTR\": new RegExp(\"^\" + attributes),\n\t\t\t\"PSEUDO\": new RegExp(\"^\" + pseudos),\n\t\t\t\"CHILD\": new RegExp(\"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace + \"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace + \"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\"),\n\t\t\t\"bool\": new RegExp(\"^(?:\" + booleans + \")$\", \"i\"),\n\t\t\t// For use in libraries implementing .is()\n\t\t\t// We use this for POS matching in `select`\n\t\t\t\"needsContext\": new RegExp(\"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" + whitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\")\n\t\t},\n\t\t    rinputs = /^(?:input|select|textarea|button)$/i,\n\t\t    rheader = /^h\\d$/i,\n\t\t    rnative = /^[^{]+\\{\\s*\\[native \\w/,\n\n\n\t\t// Easily-parseable/retrievable ID or TAG or CLASS selectors\n\t\trquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\t\t    rsibling = /[+~]/,\n\n\n\t\t// CSS escapes\n\t\t// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n\t\trunescape = new RegExp(\"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\"),\n\t\t    funescape = function funescape(_, escaped, escapedWhitespace) {\n\t\t\tvar high = \"0x\" + escaped - 0x10000;\n\t\t\t// NaN means non-codepoint\n\t\t\t// Support: Firefox<24\n\t\t\t// Workaround erroneous numeric interpretation of +\"0x\"\n\t\t\treturn high !== high || escapedWhitespace ? escaped : high < 0 ?\n\t\t\t// BMP codepoint\n\t\t\tString.fromCharCode(high + 0x10000) :\n\t\t\t// Supplemental Plane codepoint (surrogate pair)\n\t\t\tString.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);\n\t\t},\n\n\n\t\t// CSS string/identifier serialization\n\t\t// https://drafts.csswg.org/cssom/#common-serializing-idioms\n\t\trcssescape = /([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\0-\\x1f\\x7f-\\uFFFF\\w-]/g,\n\t\t    fcssescape = function fcssescape(ch, asCodePoint) {\n\t\t\tif (asCodePoint) {\n\n\t\t\t\t// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER\n\t\t\t\tif (ch === \"\\0\") {\n\t\t\t\t\treturn \"\\uFFFD\";\n\t\t\t\t}\n\n\t\t\t\t// Control characters and (dependent upon position) numbers get escaped as code points\n\t\t\t\treturn ch.slice(0, -1) + \"\\\\\" + ch.charCodeAt(ch.length - 1).toString(16) + \" \";\n\t\t\t}\n\n\t\t\t// Other potentially-special ASCII characters get backslash-escaped\n\t\t\treturn \"\\\\\" + ch;\n\t\t},\n\n\n\t\t// Used for iframes\n\t\t// See setDocument()\n\t\t// Removing the function wrapper causes a \"Permission Denied\"\n\t\t// error in IE\n\t\tunloadHandler = function unloadHandler() {\n\t\t\tsetDocument();\n\t\t},\n\t\t    disabledAncestor = addCombinator(function (elem) {\n\t\t\treturn elem.disabled === true && (\"form\" in elem || \"label\" in elem);\n\t\t}, { dir: \"parentNode\", next: \"legend\" });\n\n\t\t// Optimize for push.apply( _, NodeList )\n\t\ttry {\n\t\t\tpush.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);\n\t\t\t// Support: Android<4.0\n\t\t\t// Detect silently failing push.apply\n\t\t\tarr[preferredDoc.childNodes.length].nodeType;\n\t\t} catch (e) {\n\t\t\tpush = { apply: arr.length ?\n\n\t\t\t\t// Leverage slice if possible\n\t\t\t\tfunction (target, els) {\n\t\t\t\t\tpush_native.apply(target, slice.call(els));\n\t\t\t\t} :\n\n\t\t\t\t// Support: IE<9\n\t\t\t\t// Otherwise append directly\n\t\t\t\tfunction (target, els) {\n\t\t\t\t\tvar j = target.length,\n\t\t\t\t\t    i = 0;\n\t\t\t\t\t// Can't trust NodeList.length\n\t\t\t\t\twhile (target[j++] = els[i++]) {}\n\t\t\t\t\ttarget.length = j - 1;\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\n\t\tfunction Sizzle(selector, context, results, seed) {\n\t\t\tvar m,\n\t\t\t    i,\n\t\t\t    elem,\n\t\t\t    nid,\n\t\t\t    match,\n\t\t\t    groups,\n\t\t\t    newSelector,\n\t\t\t    newContext = context && context.ownerDocument,\n\n\n\t\t\t// nodeType defaults to 9, since context defaults to document\n\t\t\tnodeType = context ? context.nodeType : 9;\n\n\t\t\tresults = results || [];\n\n\t\t\t// Return early from calls with invalid selector or context\n\t\t\tif (typeof selector !== \"string\" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {\n\n\t\t\t\treturn results;\n\t\t\t}\n\n\t\t\t// Try to shortcut find operations (as opposed to filters) in HTML documents\n\t\t\tif (!seed) {\n\n\t\t\t\tif ((context ? context.ownerDocument || context : preferredDoc) !== document) {\n\t\t\t\t\tsetDocument(context);\n\t\t\t\t}\n\t\t\t\tcontext = context || document;\n\n\t\t\t\tif (documentIsHTML) {\n\n\t\t\t\t\t// If the selector is sufficiently simple, try using a \"get*By*\" DOM method\n\t\t\t\t\t// (excepting DocumentFragment context, where the methods don't exist)\n\t\t\t\t\tif (nodeType !== 11 && (match = rquickExpr.exec(selector))) {\n\n\t\t\t\t\t\t// ID selector\n\t\t\t\t\t\tif (m = match[1]) {\n\n\t\t\t\t\t\t\t// Document context\n\t\t\t\t\t\t\tif (nodeType === 9) {\n\t\t\t\t\t\t\t\tif (elem = context.getElementById(m)) {\n\n\t\t\t\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\t\t\t\tif (elem.id === m) {\n\t\t\t\t\t\t\t\t\t\tresults.push(elem);\n\t\t\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t// Element context\n\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\t\t\tif (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {\n\n\t\t\t\t\t\t\t\t\tresults.push(elem);\n\t\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Type selector\n\t\t\t\t\t\t} else if (match[2]) {\n\t\t\t\t\t\t\tpush.apply(results, context.getElementsByTagName(selector));\n\t\t\t\t\t\t\treturn results;\n\n\t\t\t\t\t\t\t// Class selector\n\t\t\t\t\t\t} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {\n\n\t\t\t\t\t\t\tpush.apply(results, context.getElementsByClassName(m));\n\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Take advantage of querySelectorAll\n\t\t\t\t\tif (support.qsa && !compilerCache[selector + \" \"] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {\n\n\t\t\t\t\t\tif (nodeType !== 1) {\n\t\t\t\t\t\t\tnewContext = context;\n\t\t\t\t\t\t\tnewSelector = selector;\n\n\t\t\t\t\t\t\t// qSA looks outside Element context, which is not what we want\n\t\t\t\t\t\t\t// Thanks to Andrew Dupont for this workaround technique\n\t\t\t\t\t\t\t// Support: IE <=8\n\t\t\t\t\t\t\t// Exclude object elements\n\t\t\t\t\t\t} else if (context.nodeName.toLowerCase() !== \"object\") {\n\n\t\t\t\t\t\t\t// Capture the context ID, setting it first if necessary\n\t\t\t\t\t\t\tif (nid = context.getAttribute(\"id\")) {\n\t\t\t\t\t\t\t\tnid = nid.replace(rcssescape, fcssescape);\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcontext.setAttribute(\"id\", nid = expando);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Prefix every selector in the list\n\t\t\t\t\t\t\tgroups = tokenize(selector);\n\t\t\t\t\t\t\ti = groups.length;\n\t\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\t\tgroups[i] = \"#\" + nid + \" \" + toSelector(groups[i]);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tnewSelector = groups.join(\",\");\n\n\t\t\t\t\t\t\t// Expand context for sibling selectors\n\t\t\t\t\t\t\tnewContext = rsibling.test(selector) && testContext(context.parentNode) || context;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (newSelector) {\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tpush.apply(results, newContext.querySelectorAll(newSelector));\n\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t} catch (qsaError) {} finally {\n\t\t\t\t\t\t\t\tif (nid === expando) {\n\t\t\t\t\t\t\t\t\tcontext.removeAttribute(\"id\");\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// All others\n\t\t\treturn select(selector.replace(rtrim, \"$1\"), context, results, seed);\n\t\t}\n\n\t\t/**\n   * Create key-value caches of limited size\n   * @returns {function(string, object)} Returns the Object data after storing it on itself with\n   *\tproperty name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n   *\tdeleting the oldest entry\n   */\n\t\tfunction createCache() {\n\t\t\tvar keys = [];\n\n\t\t\tfunction cache(key, value) {\n\t\t\t\t// Use (key + \" \") to avoid collision with native prototype properties (see Issue #157)\n\t\t\t\tif (keys.push(key + \" \") > Expr.cacheLength) {\n\t\t\t\t\t// Only keep the most recent entries\n\t\t\t\t\tdelete cache[keys.shift()];\n\t\t\t\t}\n\t\t\t\treturn cache[key + \" \"] = value;\n\t\t\t}\n\t\t\treturn cache;\n\t\t}\n\n\t\t/**\n   * Mark a function for special use by Sizzle\n   * @param {Function} fn The function to mark\n   */\n\t\tfunction markFunction(fn) {\n\t\t\tfn[expando] = true;\n\t\t\treturn fn;\n\t\t}\n\n\t\t/**\n   * Support testing using an element\n   * @param {Function} fn Passed the created element and returns a boolean result\n   */\n\t\tfunction assert(fn) {\n\t\t\tvar el = document.createElement(\"fieldset\");\n\n\t\t\ttry {\n\t\t\t\treturn !!fn(el);\n\t\t\t} catch (e) {\n\t\t\t\treturn false;\n\t\t\t} finally {\n\t\t\t\t// Remove from its parent by default\n\t\t\t\tif (el.parentNode) {\n\t\t\t\t\tel.parentNode.removeChild(el);\n\t\t\t\t}\n\t\t\t\t// release memory in IE\n\t\t\t\tel = null;\n\t\t\t}\n\t\t}\n\n\t\t/**\n   * Adds the same handler for all of the specified attrs\n   * @param {String} attrs Pipe-separated list of attributes\n   * @param {Function} handler The method that will be applied\n   */\n\t\tfunction addHandle(attrs, handler) {\n\t\t\tvar arr = attrs.split(\"|\"),\n\t\t\t    i = arr.length;\n\n\t\t\twhile (i--) {\n\t\t\t\tExpr.attrHandle[arr[i]] = handler;\n\t\t\t}\n\t\t}\n\n\t\t/**\n   * Checks document order of two siblings\n   * @param {Element} a\n   * @param {Element} b\n   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n   */\n\t\tfunction siblingCheck(a, b) {\n\t\t\tvar cur = b && a,\n\t\t\t    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;\n\n\t\t\t// Use IE sourceIndex if available on both nodes\n\t\t\tif (diff) {\n\t\t\t\treturn diff;\n\t\t\t}\n\n\t\t\t// Check if b follows a\n\t\t\tif (cur) {\n\t\t\t\twhile (cur = cur.nextSibling) {\n\t\t\t\t\tif (cur === b) {\n\t\t\t\t\t\treturn -1;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn a ? 1 : -1;\n\t\t}\n\n\t\t/**\n   * Returns a function to use in pseudos for input types\n   * @param {String} type\n   */\n\t\tfunction createInputPseudo(type) {\n\t\t\treturn function (elem) {\n\t\t\t\tvar name = elem.nodeName.toLowerCase();\n\t\t\t\treturn name === \"input\" && elem.type === type;\n\t\t\t};\n\t\t}\n\n\t\t/**\n   * Returns a function to use in pseudos for buttons\n   * @param {String} type\n   */\n\t\tfunction createButtonPseudo(type) {\n\t\t\treturn function (elem) {\n\t\t\t\tvar name = elem.nodeName.toLowerCase();\n\t\t\t\treturn (name === \"input\" || name === \"button\") && elem.type === type;\n\t\t\t};\n\t\t}\n\n\t\t/**\n   * Returns a function to use in pseudos for :enabled/:disabled\n   * @param {Boolean} disabled true for :disabled; false for :enabled\n   */\n\t\tfunction createDisabledPseudo(disabled) {\n\n\t\t\t// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable\n\t\t\treturn function (elem) {\n\n\t\t\t\t// Only certain elements can match :enabled or :disabled\n\t\t\t\t// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled\n\t\t\t\t// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled\n\t\t\t\tif (\"form\" in elem) {\n\n\t\t\t\t\t// Check for inherited disabledness on relevant non-disabled elements:\n\t\t\t\t\t// * listed form-associated elements in a disabled fieldset\n\t\t\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#category-listed\n\t\t\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled\n\t\t\t\t\t// * option elements in a disabled optgroup\n\t\t\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled\n\t\t\t\t\t// All such elements have a \"form\" property.\n\t\t\t\t\tif (elem.parentNode && elem.disabled === false) {\n\n\t\t\t\t\t\t// Option elements defer to a parent optgroup if present\n\t\t\t\t\t\tif (\"label\" in elem) {\n\t\t\t\t\t\t\tif (\"label\" in elem.parentNode) {\n\t\t\t\t\t\t\t\treturn elem.parentNode.disabled === disabled;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\treturn elem.disabled === disabled;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Support: IE 6 - 11\n\t\t\t\t\t\t// Use the isDisabled shortcut property to check for disabled fieldset ancestors\n\t\t\t\t\t\treturn elem.isDisabled === disabled ||\n\n\t\t\t\t\t\t// Where there is no isDisabled, check manually\n\t\t\t\t\t\t/* jshint -W018 */\n\t\t\t\t\t\telem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn elem.disabled === disabled;\n\n\t\t\t\t\t// Try to winnow out elements that can't be disabled before trusting the disabled property.\n\t\t\t\t\t// Some victims get caught in our net (label, legend, menu, track), but it shouldn't\n\t\t\t\t\t// even exist on them, let alone have a boolean value.\n\t\t\t\t} else if (\"label\" in elem) {\n\t\t\t\t\treturn elem.disabled === disabled;\n\t\t\t\t}\n\n\t\t\t\t// Remaining elements are neither :enabled nor :disabled\n\t\t\t\treturn false;\n\t\t\t};\n\t\t}\n\n\t\t/**\n   * Returns a function to use in pseudos for positionals\n   * @param {Function} fn\n   */\n\t\tfunction createPositionalPseudo(fn) {\n\t\t\treturn markFunction(function (argument) {\n\t\t\t\targument = +argument;\n\t\t\t\treturn markFunction(function (seed, matches) {\n\t\t\t\t\tvar j,\n\t\t\t\t\t    matchIndexes = fn([], seed.length, argument),\n\t\t\t\t\t    i = matchIndexes.length;\n\n\t\t\t\t\t// Match elements found at the specified indexes\n\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\tif (seed[j = matchIndexes[i]]) {\n\t\t\t\t\t\t\tseed[j] = !(matches[j] = seed[j]);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\n\t\t/**\n   * Checks a node for validity as a Sizzle context\n   * @param {Element|Object=} context\n   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n   */\n\t\tfunction testContext(context) {\n\t\t\treturn context && typeof context.getElementsByTagName !== \"undefined\" && context;\n\t\t}\n\n\t\t// Expose support vars for convenience\n\t\tsupport = Sizzle.support = {};\n\n\t\t/**\n   * Detects XML nodes\n   * @param {Element|Object} elem An element or a document\n   * @returns {Boolean} True iff elem is a non-HTML XML node\n   */\n\t\tisXML = Sizzle.isXML = function (elem) {\n\t\t\t// documentElement is verified for cases where it doesn't yet exist\n\t\t\t// (such as loading iframes in IE - #4833)\n\t\t\tvar documentElement = elem && (elem.ownerDocument || elem).documentElement;\n\t\t\treturn documentElement ? documentElement.nodeName !== \"HTML\" : false;\n\t\t};\n\n\t\t/**\n   * Sets document-related variables once based on the current document\n   * @param {Element|Object} [doc] An element or document object to use to set the document\n   * @returns {Object} Returns the current document\n   */\n\t\tsetDocument = Sizzle.setDocument = function (node) {\n\t\t\tvar hasCompare,\n\t\t\t    subWindow,\n\t\t\t    doc = node ? node.ownerDocument || node : preferredDoc;\n\n\t\t\t// Return early if doc is invalid or already selected\n\t\t\tif (doc === document || doc.nodeType !== 9 || !doc.documentElement) {\n\t\t\t\treturn document;\n\t\t\t}\n\n\t\t\t// Update global variables\n\t\t\tdocument = doc;\n\t\t\tdocElem = document.documentElement;\n\t\t\tdocumentIsHTML = !isXML(document);\n\n\t\t\t// Support: IE 9-11, Edge\n\t\t\t// Accessing iframe documents after unload throws \"permission denied\" errors (jQuery #13936)\n\t\t\tif (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {\n\n\t\t\t\t// Support: IE 11, Edge\n\t\t\t\tif (subWindow.addEventListener) {\n\t\t\t\t\tsubWindow.addEventListener(\"unload\", unloadHandler, false);\n\n\t\t\t\t\t// Support: IE 9 - 10 only\n\t\t\t\t} else if (subWindow.attachEvent) {\n\t\t\t\t\tsubWindow.attachEvent(\"onunload\", unloadHandler);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t/* Attributes\n   ---------------------------------------------------------------------- */\n\n\t\t\t// Support: IE<8\n\t\t\t// Verify that getAttribute really returns attributes and not properties\n\t\t\t// (excepting IE8 booleans)\n\t\t\tsupport.attributes = assert(function (el) {\n\t\t\t\tel.className = \"i\";\n\t\t\t\treturn !el.getAttribute(\"className\");\n\t\t\t});\n\n\t\t\t/* getElement(s)By*\n   ---------------------------------------------------------------------- */\n\n\t\t\t// Check if getElementsByTagName(\"*\") returns only elements\n\t\t\tsupport.getElementsByTagName = assert(function (el) {\n\t\t\t\tel.appendChild(document.createComment(\"\"));\n\t\t\t\treturn !el.getElementsByTagName(\"*\").length;\n\t\t\t});\n\n\t\t\t// Support: IE<9\n\t\t\tsupport.getElementsByClassName = rnative.test(document.getElementsByClassName);\n\n\t\t\t// Support: IE<10\n\t\t\t// Check if getElementById returns elements by name\n\t\t\t// The broken getElementById methods don't pick up programmatically-set names,\n\t\t\t// so use a roundabout getElementsByName test\n\t\t\tsupport.getById = assert(function (el) {\n\t\t\t\tdocElem.appendChild(el).id = expando;\n\t\t\t\treturn !document.getElementsByName || !document.getElementsByName(expando).length;\n\t\t\t});\n\n\t\t\t// ID filter and find\n\t\t\tif (support.getById) {\n\t\t\t\tExpr.filter[\"ID\"] = function (id) {\n\t\t\t\t\tvar attrId = id.replace(runescape, funescape);\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\treturn elem.getAttribute(\"id\") === attrId;\n\t\t\t\t\t};\n\t\t\t\t};\n\t\t\t\tExpr.find[\"ID\"] = function (id, context) {\n\t\t\t\t\tif (typeof context.getElementById !== \"undefined\" && documentIsHTML) {\n\t\t\t\t\t\tvar elem = context.getElementById(id);\n\t\t\t\t\t\treturn elem ? [elem] : [];\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t} else {\n\t\t\t\tExpr.filter[\"ID\"] = function (id) {\n\t\t\t\t\tvar attrId = id.replace(runescape, funescape);\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\tvar node = typeof elem.getAttributeNode !== \"undefined\" && elem.getAttributeNode(\"id\");\n\t\t\t\t\t\treturn node && node.value === attrId;\n\t\t\t\t\t};\n\t\t\t\t};\n\n\t\t\t\t// Support: IE 6 - 7 only\n\t\t\t\t// getElementById is not reliable as a find shortcut\n\t\t\t\tExpr.find[\"ID\"] = function (id, context) {\n\t\t\t\t\tif (typeof context.getElementById !== \"undefined\" && documentIsHTML) {\n\t\t\t\t\t\tvar node,\n\t\t\t\t\t\t    i,\n\t\t\t\t\t\t    elems,\n\t\t\t\t\t\t    elem = context.getElementById(id);\n\n\t\t\t\t\t\tif (elem) {\n\n\t\t\t\t\t\t\t// Verify the id attribute\n\t\t\t\t\t\t\tnode = elem.getAttributeNode(\"id\");\n\t\t\t\t\t\t\tif (node && node.value === id) {\n\t\t\t\t\t\t\t\treturn [elem];\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Fall back on getElementsByName\n\t\t\t\t\t\t\telems = context.getElementsByName(id);\n\t\t\t\t\t\t\ti = 0;\n\t\t\t\t\t\t\twhile (elem = elems[i++]) {\n\t\t\t\t\t\t\t\tnode = elem.getAttributeNode(\"id\");\n\t\t\t\t\t\t\t\tif (node && node.value === id) {\n\t\t\t\t\t\t\t\t\treturn [elem];\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn [];\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t}\n\n\t\t\t// Tag\n\t\t\tExpr.find[\"TAG\"] = support.getElementsByTagName ? function (tag, context) {\n\t\t\t\tif (typeof context.getElementsByTagName !== \"undefined\") {\n\t\t\t\t\treturn context.getElementsByTagName(tag);\n\n\t\t\t\t\t// DocumentFragment nodes don't have gEBTN\n\t\t\t\t} else if (support.qsa) {\n\t\t\t\t\treturn context.querySelectorAll(tag);\n\t\t\t\t}\n\t\t\t} : function (tag, context) {\n\t\t\t\tvar elem,\n\t\t\t\t    tmp = [],\n\t\t\t\t    i = 0,\n\n\t\t\t\t// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too\n\t\t\t\tresults = context.getElementsByTagName(tag);\n\n\t\t\t\t// Filter out possible comments\n\t\t\t\tif (tag === \"*\") {\n\t\t\t\t\twhile (elem = results[i++]) {\n\t\t\t\t\t\tif (elem.nodeType === 1) {\n\t\t\t\t\t\t\ttmp.push(elem);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn tmp;\n\t\t\t\t}\n\t\t\t\treturn results;\n\t\t\t};\n\n\t\t\t// Class\n\t\t\tExpr.find[\"CLASS\"] = support.getElementsByClassName && function (className, context) {\n\t\t\t\tif (typeof context.getElementsByClassName !== \"undefined\" && documentIsHTML) {\n\t\t\t\t\treturn context.getElementsByClassName(className);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\t/* QSA/matchesSelector\n   ---------------------------------------------------------------------- */\n\n\t\t\t// QSA and matchesSelector support\n\n\t\t\t// matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n\t\t\trbuggyMatches = [];\n\n\t\t\t// qSa(:focus) reports false when true (Chrome 21)\n\t\t\t// We allow this because of a bug in IE8/9 that throws an error\n\t\t\t// whenever `document.activeElement` is accessed on an iframe\n\t\t\t// So, we allow :focus to pass through QSA all the time to avoid the IE error\n\t\t\t// See https://bugs.jquery.com/ticket/13378\n\t\t\trbuggyQSA = [];\n\n\t\t\tif (support.qsa = rnative.test(document.querySelectorAll)) {\n\t\t\t\t// Build QSA regex\n\t\t\t\t// Regex strategy adopted from Diego Perini\n\t\t\t\tassert(function (el) {\n\t\t\t\t\t// Select is set to empty string on purpose\n\t\t\t\t\t// This is to test IE's treatment of not explicitly\n\t\t\t\t\t// setting a boolean content attribute,\n\t\t\t\t\t// since its presence should be enough\n\t\t\t\t\t// https://bugs.jquery.com/ticket/12359\n\t\t\t\t\tdocElem.appendChild(el).innerHTML = \"<a id='\" + expando + \"'></a>\" + \"<select id='\" + expando + \"-\\r\\\\' msallowcapture=''>\" + \"<option selected=''></option></select>\";\n\n\t\t\t\t\t// Support: IE8, Opera 11-12.16\n\t\t\t\t\t// Nothing should be selected when empty strings follow ^= or $= or *=\n\t\t\t\t\t// The test attribute must be unknown in Opera but \"safe\" for WinRT\n\t\t\t\t\t// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n\t\t\t\t\tif (el.querySelectorAll(\"[msallowcapture^='']\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\"[*^$]=\" + whitespace + \"*(?:''|\\\"\\\")\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: IE8\n\t\t\t\t\t// Boolean attributes and \"value\" are not treated correctly\n\t\t\t\t\tif (!el.querySelectorAll(\"[selected]\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\"\\\\[\" + whitespace + \"*(?:value|\" + booleans + \")\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+\n\t\t\t\t\tif (!el.querySelectorAll(\"[id~=\" + expando + \"-]\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\"~=\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Webkit/Opera - :checked should return selected option elements\n\t\t\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\t\t\t// IE8 throws error here and will not see later tests\n\t\t\t\t\tif (!el.querySelectorAll(\":checked\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\":checked\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: Safari 8+, iOS 8+\n\t\t\t\t\t// https://bugs.webkit.org/show_bug.cgi?id=136851\n\t\t\t\t\t// In-page `selector#id sibling-combinator selector` fails\n\t\t\t\t\tif (!el.querySelectorAll(\"a#\" + expando + \"+*\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\".#.+[+~]\");\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tassert(function (el) {\n\t\t\t\t\tel.innerHTML = \"<a href='' disabled='disabled'></a>\" + \"<select disabled='disabled'><option/></select>\";\n\n\t\t\t\t\t// Support: Windows 8 Native Apps\n\t\t\t\t\t// The type and name attributes are restricted during .innerHTML assignment\n\t\t\t\t\tvar input = document.createElement(\"input\");\n\t\t\t\t\tinput.setAttribute(\"type\", \"hidden\");\n\t\t\t\t\tel.appendChild(input).setAttribute(\"name\", \"D\");\n\n\t\t\t\t\t// Support: IE8\n\t\t\t\t\t// Enforce case-sensitivity of name attribute\n\t\t\t\t\tif (el.querySelectorAll(\"[name=d]\").length) {\n\t\t\t\t\t\trbuggyQSA.push(\"name\" + whitespace + \"*[*^$|!~]?=\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n\t\t\t\t\t// IE8 throws error here and will not see later tests\n\t\t\t\t\tif (el.querySelectorAll(\":enabled\").length !== 2) {\n\t\t\t\t\t\trbuggyQSA.push(\":enabled\", \":disabled\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: IE9-11+\n\t\t\t\t\t// IE's :disabled selector does not pick up the children of disabled fieldsets\n\t\t\t\t\tdocElem.appendChild(el).disabled = true;\n\t\t\t\t\tif (el.querySelectorAll(\":disabled\").length !== 2) {\n\t\t\t\t\t\trbuggyQSA.push(\":enabled\", \":disabled\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Opera 10-11 does not throw on post-comma invalid pseudos\n\t\t\t\t\tel.querySelectorAll(\"*,:x\");\n\t\t\t\t\trbuggyQSA.push(\",.*:\");\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tif (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {\n\n\t\t\t\tassert(function (el) {\n\t\t\t\t\t// Check to see if it's possible to do matchesSelector\n\t\t\t\t\t// on a disconnected node (IE 9)\n\t\t\t\t\tsupport.disconnectedMatch = matches.call(el, \"*\");\n\n\t\t\t\t\t// This should fail with an exception\n\t\t\t\t\t// Gecko does not error, returns false instead\n\t\t\t\t\tmatches.call(el, \"[s!='']:x\");\n\t\t\t\t\trbuggyMatches.push(\"!=\", pseudos);\n\t\t\t\t});\n\t\t\t}\n\n\t\t\trbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join(\"|\"));\n\t\t\trbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join(\"|\"));\n\n\t\t\t/* Contains\n   ---------------------------------------------------------------------- */\n\t\t\thasCompare = rnative.test(docElem.compareDocumentPosition);\n\n\t\t\t// Element contains another\n\t\t\t// Purposefully self-exclusive\n\t\t\t// As in, an element does not contain itself\n\t\t\tcontains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {\n\t\t\t\tvar adown = a.nodeType === 9 ? a.documentElement : a,\n\t\t\t\t    bup = b && b.parentNode;\n\t\t\t\treturn a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));\n\t\t\t} : function (a, b) {\n\t\t\t\tif (b) {\n\t\t\t\t\twhile (b = b.parentNode) {\n\t\t\t\t\t\tif (b === a) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn false;\n\t\t\t};\n\n\t\t\t/* Sorting\n   ---------------------------------------------------------------------- */\n\n\t\t\t// Document order sorting\n\t\t\tsortOrder = hasCompare ? function (a, b) {\n\n\t\t\t\t// Flag for duplicate removal\n\t\t\t\tif (a === b) {\n\t\t\t\t\thasDuplicate = true;\n\t\t\t\t\treturn 0;\n\t\t\t\t}\n\n\t\t\t\t// Sort on method existence if only one input has compareDocumentPosition\n\t\t\t\tvar compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n\t\t\t\tif (compare) {\n\t\t\t\t\treturn compare;\n\t\t\t\t}\n\n\t\t\t\t// Calculate position if both inputs belong to the same document\n\t\t\t\tcompare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :\n\n\t\t\t\t// Otherwise we know they are disconnected\n\t\t\t\t1;\n\n\t\t\t\t// Disconnected nodes\n\t\t\t\tif (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {\n\n\t\t\t\t\t// Choose the first element that is related to our preferred document\n\t\t\t\t\tif (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {\n\t\t\t\t\t\treturn -1;\n\t\t\t\t\t}\n\t\t\t\t\tif (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {\n\t\t\t\t\t\treturn 1;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Maintain original order\n\t\t\t\t\treturn sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;\n\t\t\t\t}\n\n\t\t\t\treturn compare & 4 ? -1 : 1;\n\t\t\t} : function (a, b) {\n\t\t\t\t// Exit early if the nodes are identical\n\t\t\t\tif (a === b) {\n\t\t\t\t\thasDuplicate = true;\n\t\t\t\t\treturn 0;\n\t\t\t\t}\n\n\t\t\t\tvar cur,\n\t\t\t\t    i = 0,\n\t\t\t\t    aup = a.parentNode,\n\t\t\t\t    bup = b.parentNode,\n\t\t\t\t    ap = [a],\n\t\t\t\t    bp = [b];\n\n\t\t\t\t// Parentless nodes are either documents or disconnected\n\t\t\t\tif (!aup || !bup) {\n\t\t\t\t\treturn a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;\n\n\t\t\t\t\t// If the nodes are siblings, we can do a quick check\n\t\t\t\t} else if (aup === bup) {\n\t\t\t\t\treturn siblingCheck(a, b);\n\t\t\t\t}\n\n\t\t\t\t// Otherwise we need full lists of their ancestors for comparison\n\t\t\t\tcur = a;\n\t\t\t\twhile (cur = cur.parentNode) {\n\t\t\t\t\tap.unshift(cur);\n\t\t\t\t}\n\t\t\t\tcur = b;\n\t\t\t\twhile (cur = cur.parentNode) {\n\t\t\t\t\tbp.unshift(cur);\n\t\t\t\t}\n\n\t\t\t\t// Walk down the tree looking for a discrepancy\n\t\t\t\twhile (ap[i] === bp[i]) {\n\t\t\t\t\ti++;\n\t\t\t\t}\n\n\t\t\t\treturn i ?\n\t\t\t\t// Do a sibling check if the nodes have a common ancestor\n\t\t\t\tsiblingCheck(ap[i], bp[i]) :\n\n\t\t\t\t// Otherwise nodes in our document sort first\n\t\t\t\tap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;\n\t\t\t};\n\n\t\t\treturn document;\n\t\t};\n\n\t\tSizzle.matches = function (expr, elements) {\n\t\t\treturn Sizzle(expr, null, null, elements);\n\t\t};\n\n\t\tSizzle.matchesSelector = function (elem, expr) {\n\t\t\t// Set document vars if needed\n\t\t\tif ((elem.ownerDocument || elem) !== document) {\n\t\t\t\tsetDocument(elem);\n\t\t\t}\n\n\t\t\t// Make sure that attribute selectors are quoted\n\t\t\texpr = expr.replace(rattributeQuotes, \"='$1']\");\n\n\t\t\tif (support.matchesSelector && documentIsHTML && !compilerCache[expr + \" \"] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {\n\n\t\t\t\ttry {\n\t\t\t\t\tvar ret = matches.call(elem, expr);\n\n\t\t\t\t\t// IE 9's matchesSelector returns false on disconnected nodes\n\t\t\t\t\tif (ret || support.disconnectedMatch ||\n\t\t\t\t\t// As well, disconnected nodes are said to be in a document\n\t\t\t\t\t// fragment in IE 9\n\t\t\t\t\telem.document && elem.document.nodeType !== 11) {\n\t\t\t\t\t\treturn ret;\n\t\t\t\t\t}\n\t\t\t\t} catch (e) {}\n\t\t\t}\n\n\t\t\treturn Sizzle(expr, document, null, [elem]).length > 0;\n\t\t};\n\n\t\tSizzle.contains = function (context, elem) {\n\t\t\t// Set document vars if needed\n\t\t\tif ((context.ownerDocument || context) !== document) {\n\t\t\t\tsetDocument(context);\n\t\t\t}\n\t\t\treturn contains(context, elem);\n\t\t};\n\n\t\tSizzle.attr = function (elem, name) {\n\t\t\t// Set document vars if needed\n\t\t\tif ((elem.ownerDocument || elem) !== document) {\n\t\t\t\tsetDocument(elem);\n\t\t\t}\n\n\t\t\tvar fn = Expr.attrHandle[name.toLowerCase()],\n\n\t\t\t// Don't get fooled by Object.prototype properties (jQuery #13807)\n\t\t\tval = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;\n\n\t\t\treturn val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;\n\t\t};\n\n\t\tSizzle.escape = function (sel) {\n\t\t\treturn (sel + \"\").replace(rcssescape, fcssescape);\n\t\t};\n\n\t\tSizzle.error = function (msg) {\n\t\t\tthrow new Error(\"Syntax error, unrecognized expression: \" + msg);\n\t\t};\n\n\t\t/**\n   * Document sorting and removing duplicates\n   * @param {ArrayLike} results\n   */\n\t\tSizzle.uniqueSort = function (results) {\n\t\t\tvar elem,\n\t\t\t    duplicates = [],\n\t\t\t    j = 0,\n\t\t\t    i = 0;\n\n\t\t\t// Unless we *know* we can detect duplicates, assume their presence\n\t\t\thasDuplicate = !support.detectDuplicates;\n\t\t\tsortInput = !support.sortStable && results.slice(0);\n\t\t\tresults.sort(sortOrder);\n\n\t\t\tif (hasDuplicate) {\n\t\t\t\twhile (elem = results[i++]) {\n\t\t\t\t\tif (elem === results[i]) {\n\t\t\t\t\t\tj = duplicates.push(i);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\twhile (j--) {\n\t\t\t\t\tresults.splice(duplicates[j], 1);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Clear input after sorting to release objects\n\t\t\t// See https://github.com/jquery/sizzle/pull/225\n\t\t\tsortInput = null;\n\n\t\t\treturn results;\n\t\t};\n\n\t\t/**\n   * Utility function for retrieving the text value of an array of DOM nodes\n   * @param {Array|Element} elem\n   */\n\t\tgetText = Sizzle.getText = function (elem) {\n\t\t\tvar node,\n\t\t\t    ret = \"\",\n\t\t\t    i = 0,\n\t\t\t    nodeType = elem.nodeType;\n\n\t\t\tif (!nodeType) {\n\t\t\t\t// If no nodeType, this is expected to be an array\n\t\t\t\twhile (node = elem[i++]) {\n\t\t\t\t\t// Do not traverse comment nodes\n\t\t\t\t\tret += getText(node);\n\t\t\t\t}\n\t\t\t} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {\n\t\t\t\t// Use textContent for elements\n\t\t\t\t// innerText usage removed for consistency of new lines (jQuery #11153)\n\t\t\t\tif (typeof elem.textContent === \"string\") {\n\t\t\t\t\treturn elem.textContent;\n\t\t\t\t} else {\n\t\t\t\t\t// Traverse its children\n\t\t\t\t\tfor (elem = elem.firstChild; elem; elem = elem.nextSibling) {\n\t\t\t\t\t\tret += getText(elem);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else if (nodeType === 3 || nodeType === 4) {\n\t\t\t\treturn elem.nodeValue;\n\t\t\t}\n\t\t\t// Do not include comment or processing instruction nodes\n\n\t\t\treturn ret;\n\t\t};\n\n\t\tExpr = Sizzle.selectors = {\n\n\t\t\t// Can be adjusted by the user\n\t\t\tcacheLength: 50,\n\n\t\t\tcreatePseudo: markFunction,\n\n\t\t\tmatch: matchExpr,\n\n\t\t\tattrHandle: {},\n\n\t\t\tfind: {},\n\n\t\t\trelative: {\n\t\t\t\t\">\": { dir: \"parentNode\", first: true },\n\t\t\t\t\" \": { dir: \"parentNode\" },\n\t\t\t\t\"+\": { dir: \"previousSibling\", first: true },\n\t\t\t\t\"~\": { dir: \"previousSibling\" }\n\t\t\t},\n\n\t\t\tpreFilter: {\n\t\t\t\t\"ATTR\": function ATTR(match) {\n\t\t\t\t\tmatch[1] = match[1].replace(runescape, funescape);\n\n\t\t\t\t\t// Move the given value to match[3] whether quoted or unquoted\n\t\t\t\t\tmatch[3] = (match[3] || match[4] || match[5] || \"\").replace(runescape, funescape);\n\n\t\t\t\t\tif (match[2] === \"~=\") {\n\t\t\t\t\t\tmatch[3] = \" \" + match[3] + \" \";\n\t\t\t\t\t}\n\n\t\t\t\t\treturn match.slice(0, 4);\n\t\t\t\t},\n\n\t\t\t\t\"CHILD\": function CHILD(match) {\n\t\t\t\t\t/* matches from matchExpr[\"CHILD\"]\n     \t1 type (only|nth|...)\n     \t2 what (child|of-type)\n     \t3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n     \t4 xn-component of xn+y argument ([+-]?\\d*n|)\n     \t5 sign of xn-component\n     \t6 x of xn-component\n     \t7 sign of y-component\n     \t8 y of y-component\n     */\n\t\t\t\t\tmatch[1] = match[1].toLowerCase();\n\n\t\t\t\t\tif (match[1].slice(0, 3) === \"nth\") {\n\t\t\t\t\t\t// nth-* requires argument\n\t\t\t\t\t\tif (!match[3]) {\n\t\t\t\t\t\t\tSizzle.error(match[0]);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// numeric x and y parameters for Expr.filter.CHILD\n\t\t\t\t\t\t// remember that false/true cast respectively to 0/1\n\t\t\t\t\t\tmatch[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === \"even\" || match[3] === \"odd\"));\n\t\t\t\t\t\tmatch[5] = +(match[7] + match[8] || match[3] === \"odd\");\n\n\t\t\t\t\t\t// other types prohibit arguments\n\t\t\t\t\t} else if (match[3]) {\n\t\t\t\t\t\tSizzle.error(match[0]);\n\t\t\t\t\t}\n\n\t\t\t\t\treturn match;\n\t\t\t\t},\n\n\t\t\t\t\"PSEUDO\": function PSEUDO(match) {\n\t\t\t\t\tvar excess,\n\t\t\t\t\t    unquoted = !match[6] && match[2];\n\n\t\t\t\t\tif (matchExpr[\"CHILD\"].test(match[0])) {\n\t\t\t\t\t\treturn null;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Accept quoted arguments as-is\n\t\t\t\t\tif (match[3]) {\n\t\t\t\t\t\tmatch[2] = match[4] || match[5] || \"\";\n\n\t\t\t\t\t\t// Strip excess characters from unquoted arguments\n\t\t\t\t\t} else if (unquoted && rpseudo.test(unquoted) && (\n\t\t\t\t\t// Get excess from tokenize (recursively)\n\t\t\t\t\texcess = tokenize(unquoted, true)) && (\n\t\t\t\t\t// advance to the next closing parenthesis\n\t\t\t\t\texcess = unquoted.indexOf(\")\", unquoted.length - excess) - unquoted.length)) {\n\n\t\t\t\t\t\t// excess is a negative index\n\t\t\t\t\t\tmatch[0] = match[0].slice(0, excess);\n\t\t\t\t\t\tmatch[2] = unquoted.slice(0, excess);\n\t\t\t\t\t}\n\n\t\t\t\t\t// Return only captures needed by the pseudo filter method (type and argument)\n\t\t\t\t\treturn match.slice(0, 3);\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tfilter: {\n\n\t\t\t\t\"TAG\": function TAG(nodeNameSelector) {\n\t\t\t\t\tvar nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();\n\t\t\t\t\treturn nodeNameSelector === \"*\" ? function () {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t} : function (elem) {\n\t\t\t\t\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n\t\t\t\t\t};\n\t\t\t\t},\n\n\t\t\t\t\"CLASS\": function CLASS(className) {\n\t\t\t\t\tvar pattern = classCache[className + \" \"];\n\n\t\t\t\t\treturn pattern || (pattern = new RegExp(\"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\")) && classCache(className, function (elem) {\n\t\t\t\t\t\treturn pattern.test(typeof elem.className === \"string\" && elem.className || typeof elem.getAttribute !== \"undefined\" && elem.getAttribute(\"class\") || \"\");\n\t\t\t\t\t});\n\t\t\t\t},\n\n\t\t\t\t\"ATTR\": function ATTR(name, operator, check) {\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\tvar result = Sizzle.attr(elem, name);\n\n\t\t\t\t\t\tif (result == null) {\n\t\t\t\t\t\t\treturn operator === \"!=\";\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (!operator) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tresult += \"\";\n\n\t\t\t\t\t\treturn operator === \"=\" ? result === check : operator === \"!=\" ? result !== check : operator === \"^=\" ? check && result.indexOf(check) === 0 : operator === \"*=\" ? check && result.indexOf(check) > -1 : operator === \"$=\" ? check && result.slice(-check.length) === check : operator === \"~=\" ? (\" \" + result.replace(rwhitespace, \" \") + \" \").indexOf(check) > -1 : operator === \"|=\" ? result === check || result.slice(0, check.length + 1) === check + \"-\" : false;\n\t\t\t\t\t};\n\t\t\t\t},\n\n\t\t\t\t\"CHILD\": function CHILD(type, what, argument, first, last) {\n\t\t\t\t\tvar simple = type.slice(0, 3) !== \"nth\",\n\t\t\t\t\t    forward = type.slice(-4) !== \"last\",\n\t\t\t\t\t    ofType = what === \"of-type\";\n\n\t\t\t\t\treturn first === 1 && last === 0 ?\n\n\t\t\t\t\t// Shortcut for :nth-*(n)\n\t\t\t\t\tfunction (elem) {\n\t\t\t\t\t\treturn !!elem.parentNode;\n\t\t\t\t\t} : function (elem, context, xml) {\n\t\t\t\t\t\tvar cache,\n\t\t\t\t\t\t    uniqueCache,\n\t\t\t\t\t\t    outerCache,\n\t\t\t\t\t\t    node,\n\t\t\t\t\t\t    nodeIndex,\n\t\t\t\t\t\t    start,\n\t\t\t\t\t\t    dir = simple !== forward ? \"nextSibling\" : \"previousSibling\",\n\t\t\t\t\t\t    parent = elem.parentNode,\n\t\t\t\t\t\t    name = ofType && elem.nodeName.toLowerCase(),\n\t\t\t\t\t\t    useCache = !xml && !ofType,\n\t\t\t\t\t\t    diff = false;\n\n\t\t\t\t\t\tif (parent) {\n\n\t\t\t\t\t\t\t// :(first|last|only)-(child|of-type)\n\t\t\t\t\t\t\tif (simple) {\n\t\t\t\t\t\t\t\twhile (dir) {\n\t\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\t\twhile (node = node[dir]) {\n\t\t\t\t\t\t\t\t\t\tif (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {\n\n\t\t\t\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t// Reverse direction for :only-* (if we haven't yet done so)\n\t\t\t\t\t\t\t\t\tstart = dir = type === \"only\" && !start && \"nextSibling\";\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tstart = [forward ? parent.firstChild : parent.lastChild];\n\n\t\t\t\t\t\t\t// non-xml :nth-child(...) stores cache data on `parent`\n\t\t\t\t\t\t\tif (forward && useCache) {\n\n\t\t\t\t\t\t\t\t// Seek `elem` from a previously-cached index\n\n\t\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\t\tnode = parent;\n\t\t\t\t\t\t\t\touterCache = node[expando] || (node[expando] = {});\n\n\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\tuniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});\n\n\t\t\t\t\t\t\t\tcache = uniqueCache[type] || [];\n\t\t\t\t\t\t\t\tnodeIndex = cache[0] === dirruns && cache[1];\n\t\t\t\t\t\t\t\tdiff = nodeIndex && cache[2];\n\t\t\t\t\t\t\t\tnode = nodeIndex && parent.childNodes[nodeIndex];\n\n\t\t\t\t\t\t\t\twhile (node = ++nodeIndex && node && node[dir] || (\n\n\t\t\t\t\t\t\t\t// Fallback to seeking `elem` from the start\n\t\t\t\t\t\t\t\tdiff = nodeIndex = 0) || start.pop()) {\n\n\t\t\t\t\t\t\t\t\t// When found, cache indexes on `parent` and break\n\t\t\t\t\t\t\t\t\tif (node.nodeType === 1 && ++diff && node === elem) {\n\t\t\t\t\t\t\t\t\t\tuniqueCache[type] = [dirruns, nodeIndex, diff];\n\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t// Use previously-cached element index if available\n\t\t\t\t\t\t\t\tif (useCache) {\n\t\t\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\t\touterCache = node[expando] || (node[expando] = {});\n\n\t\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\t\tuniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});\n\n\t\t\t\t\t\t\t\t\tcache = uniqueCache[type] || [];\n\t\t\t\t\t\t\t\t\tnodeIndex = cache[0] === dirruns && cache[1];\n\t\t\t\t\t\t\t\t\tdiff = nodeIndex;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t// xml :nth-child(...)\n\t\t\t\t\t\t\t\t// or :nth-last-child(...) or :nth(-last)?-of-type(...)\n\t\t\t\t\t\t\t\tif (diff === false) {\n\t\t\t\t\t\t\t\t\t// Use the same loop as above to seek `elem` from the start\n\t\t\t\t\t\t\t\t\twhile (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {\n\n\t\t\t\t\t\t\t\t\t\tif ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {\n\n\t\t\t\t\t\t\t\t\t\t\t// Cache the index of each encountered element\n\t\t\t\t\t\t\t\t\t\t\tif (useCache) {\n\t\t\t\t\t\t\t\t\t\t\t\touterCache = node[expando] || (node[expando] = {});\n\n\t\t\t\t\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\t\t\t\t\tuniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});\n\n\t\t\t\t\t\t\t\t\t\t\t\tuniqueCache[type] = [dirruns, diff];\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\tif (node === elem) {\n\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Incorporate the offset, then check against cycle size\n\t\t\t\t\t\t\tdiff -= last;\n\t\t\t\t\t\t\treturn diff === first || diff % first === 0 && diff / first >= 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t},\n\n\t\t\t\t\"PSEUDO\": function PSEUDO(pseudo, argument) {\n\t\t\t\t\t// pseudo-class names are case-insensitive\n\t\t\t\t\t// http://www.w3.org/TR/selectors/#pseudo-classes\n\t\t\t\t\t// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n\t\t\t\t\t// Remember that setFilters inherits from pseudos\n\t\t\t\t\tvar args,\n\t\t\t\t\t    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error(\"unsupported pseudo: \" + pseudo);\n\n\t\t\t\t\t// The user may use createPseudo to indicate that\n\t\t\t\t\t// arguments are needed to create the filter function\n\t\t\t\t\t// just as Sizzle does\n\t\t\t\t\tif (fn[expando]) {\n\t\t\t\t\t\treturn fn(argument);\n\t\t\t\t\t}\n\n\t\t\t\t\t// But maintain support for old signatures\n\t\t\t\t\tif (fn.length > 1) {\n\t\t\t\t\t\targs = [pseudo, pseudo, \"\", argument];\n\t\t\t\t\t\treturn Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {\n\t\t\t\t\t\t\tvar idx,\n\t\t\t\t\t\t\t    matched = fn(seed, argument),\n\t\t\t\t\t\t\t    i = matched.length;\n\t\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\t\tidx = indexOf(seed, matched[i]);\n\t\t\t\t\t\t\t\tseed[idx] = !(matches[idx] = matched[i]);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}) : function (elem) {\n\t\t\t\t\t\t\treturn fn(elem, 0, args);\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\n\t\t\t\t\treturn fn;\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tpseudos: {\n\t\t\t\t// Potentially complex pseudos\n\t\t\t\t\"not\": markFunction(function (selector) {\n\t\t\t\t\t// Trim the selector passed to compile\n\t\t\t\t\t// to avoid treating leading and trailing\n\t\t\t\t\t// spaces as combinators\n\t\t\t\t\tvar input = [],\n\t\t\t\t\t    results = [],\n\t\t\t\t\t    matcher = compile(selector.replace(rtrim, \"$1\"));\n\n\t\t\t\t\treturn matcher[expando] ? markFunction(function (seed, matches, context, xml) {\n\t\t\t\t\t\tvar elem,\n\t\t\t\t\t\t    unmatched = matcher(seed, null, xml, []),\n\t\t\t\t\t\t    i = seed.length;\n\n\t\t\t\t\t\t// Match elements unmatched by `matcher`\n\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\tif (elem = unmatched[i]) {\n\t\t\t\t\t\t\t\tseed[i] = !(matches[i] = elem);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}) : function (elem, context, xml) {\n\t\t\t\t\t\tinput[0] = elem;\n\t\t\t\t\t\tmatcher(input, null, xml, results);\n\t\t\t\t\t\t// Don't keep the element (issue #299)\n\t\t\t\t\t\tinput[0] = null;\n\t\t\t\t\t\treturn !results.pop();\n\t\t\t\t\t};\n\t\t\t\t}),\n\n\t\t\t\t\"has\": markFunction(function (selector) {\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\treturn Sizzle(selector, elem).length > 0;\n\t\t\t\t\t};\n\t\t\t\t}),\n\n\t\t\t\t\"contains\": markFunction(function (text) {\n\t\t\t\t\ttext = text.replace(runescape, funescape);\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\treturn (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;\n\t\t\t\t\t};\n\t\t\t\t}),\n\n\t\t\t\t// \"Whether an element is represented by a :lang() selector\n\t\t\t\t// is based solely on the element's language value\n\t\t\t\t// being equal to the identifier C,\n\t\t\t\t// or beginning with the identifier C immediately followed by \"-\".\n\t\t\t\t// The matching of C against the element's language value is performed case-insensitively.\n\t\t\t\t// The identifier C does not have to be a valid language name.\"\n\t\t\t\t// http://www.w3.org/TR/selectors/#lang-pseudo\n\t\t\t\t\"lang\": markFunction(function (lang) {\n\t\t\t\t\t// lang value must be a valid identifier\n\t\t\t\t\tif (!ridentifier.test(lang || \"\")) {\n\t\t\t\t\t\tSizzle.error(\"unsupported lang: \" + lang);\n\t\t\t\t\t}\n\t\t\t\t\tlang = lang.replace(runescape, funescape).toLowerCase();\n\t\t\t\t\treturn function (elem) {\n\t\t\t\t\t\tvar elemLang;\n\t\t\t\t\t\tdo {\n\t\t\t\t\t\t\tif (elemLang = documentIsHTML ? elem.lang : elem.getAttribute(\"xml:lang\") || elem.getAttribute(\"lang\")) {\n\n\t\t\t\t\t\t\t\telemLang = elemLang.toLowerCase();\n\t\t\t\t\t\t\t\treturn elemLang === lang || elemLang.indexOf(lang + \"-\") === 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} while ((elem = elem.parentNode) && elem.nodeType === 1);\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t};\n\t\t\t\t}),\n\n\t\t\t\t// Miscellaneous\n\t\t\t\t\"target\": function target(elem) {\n\t\t\t\t\tvar hash = window.location && window.location.hash;\n\t\t\t\t\treturn hash && hash.slice(1) === elem.id;\n\t\t\t\t},\n\n\t\t\t\t\"root\": function root(elem) {\n\t\t\t\t\treturn elem === docElem;\n\t\t\t\t},\n\n\t\t\t\t\"focus\": function focus(elem) {\n\t\t\t\t\treturn elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n\t\t\t\t},\n\n\t\t\t\t// Boolean properties\n\t\t\t\t\"enabled\": createDisabledPseudo(false),\n\t\t\t\t\"disabled\": createDisabledPseudo(true),\n\n\t\t\t\t\"checked\": function checked(elem) {\n\t\t\t\t\t// In CSS3, :checked should return both checked and selected elements\n\t\t\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\t\t\tvar nodeName = elem.nodeName.toLowerCase();\n\t\t\t\t\treturn nodeName === \"input\" && !!elem.checked || nodeName === \"option\" && !!elem.selected;\n\t\t\t\t},\n\n\t\t\t\t\"selected\": function selected(elem) {\n\t\t\t\t\t// Accessing this property makes selected-by-default\n\t\t\t\t\t// options in Safari work properly\n\t\t\t\t\tif (elem.parentNode) {\n\t\t\t\t\t\telem.parentNode.selectedIndex;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn elem.selected === true;\n\t\t\t\t},\n\n\t\t\t\t// Contents\n\t\t\t\t\"empty\": function empty(elem) {\n\t\t\t\t\t// http://www.w3.org/TR/selectors/#empty-pseudo\n\t\t\t\t\t// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n\t\t\t\t\t//   but not by others (comment: 8; processing instruction: 7; etc.)\n\t\t\t\t\t// nodeType < 6 works because attributes (2) do not appear as children\n\t\t\t\t\tfor (elem = elem.firstChild; elem; elem = elem.nextSibling) {\n\t\t\t\t\t\tif (elem.nodeType < 6) {\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn true;\n\t\t\t\t},\n\n\t\t\t\t\"parent\": function parent(elem) {\n\t\t\t\t\treturn !Expr.pseudos[\"empty\"](elem);\n\t\t\t\t},\n\n\t\t\t\t// Element/input types\n\t\t\t\t\"header\": function header(elem) {\n\t\t\t\t\treturn rheader.test(elem.nodeName);\n\t\t\t\t},\n\n\t\t\t\t\"input\": function input(elem) {\n\t\t\t\t\treturn rinputs.test(elem.nodeName);\n\t\t\t\t},\n\n\t\t\t\t\"button\": function button(elem) {\n\t\t\t\t\tvar name = elem.nodeName.toLowerCase();\n\t\t\t\t\treturn name === \"input\" && elem.type === \"button\" || name === \"button\";\n\t\t\t\t},\n\n\t\t\t\t\"text\": function text(elem) {\n\t\t\t\t\tvar attr;\n\t\t\t\t\treturn elem.nodeName.toLowerCase() === \"input\" && elem.type === \"text\" && (\n\n\t\t\t\t\t// Support: IE<8\n\t\t\t\t\t// New HTML5 attribute values (e.g., \"search\") appear with elem.type === \"text\"\n\t\t\t\t\t(attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === \"text\");\n\t\t\t\t},\n\n\t\t\t\t// Position-in-collection\n\t\t\t\t\"first\": createPositionalPseudo(function () {\n\t\t\t\t\treturn [0];\n\t\t\t\t}),\n\n\t\t\t\t\"last\": createPositionalPseudo(function (matchIndexes, length) {\n\t\t\t\t\treturn [length - 1];\n\t\t\t\t}),\n\n\t\t\t\t\"eq\": createPositionalPseudo(function (matchIndexes, length, argument) {\n\t\t\t\t\treturn [argument < 0 ? argument + length : argument];\n\t\t\t\t}),\n\n\t\t\t\t\"even\": createPositionalPseudo(function (matchIndexes, length) {\n\t\t\t\t\tvar i = 0;\n\t\t\t\t\tfor (; i < length; i += 2) {\n\t\t\t\t\t\tmatchIndexes.push(i);\n\t\t\t\t\t}\n\t\t\t\t\treturn matchIndexes;\n\t\t\t\t}),\n\n\t\t\t\t\"odd\": createPositionalPseudo(function (matchIndexes, length) {\n\t\t\t\t\tvar i = 1;\n\t\t\t\t\tfor (; i < length; i += 2) {\n\t\t\t\t\t\tmatchIndexes.push(i);\n\t\t\t\t\t}\n\t\t\t\t\treturn matchIndexes;\n\t\t\t\t}),\n\n\t\t\t\t\"lt\": createPositionalPseudo(function (matchIndexes, length, argument) {\n\t\t\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\t\t\tfor (; --i >= 0;) {\n\t\t\t\t\t\tmatchIndexes.push(i);\n\t\t\t\t\t}\n\t\t\t\t\treturn matchIndexes;\n\t\t\t\t}),\n\n\t\t\t\t\"gt\": createPositionalPseudo(function (matchIndexes, length, argument) {\n\t\t\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\t\t\tfor (; ++i < length;) {\n\t\t\t\t\t\tmatchIndexes.push(i);\n\t\t\t\t\t}\n\t\t\t\t\treturn matchIndexes;\n\t\t\t\t})\n\t\t\t}\n\t\t};\n\n\t\tExpr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];\n\n\t\t// Add button/input type pseudos\n\t\tfor (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {\n\t\t\tExpr.pseudos[i] = createInputPseudo(i);\n\t\t}\n\t\tfor (i in { submit: true, reset: true }) {\n\t\t\tExpr.pseudos[i] = createButtonPseudo(i);\n\t\t}\n\n\t\t// Easy API for creating new setFilters\n\t\tfunction setFilters() {}\n\t\tsetFilters.prototype = Expr.filters = Expr.pseudos;\n\t\tExpr.setFilters = new setFilters();\n\n\t\ttokenize = Sizzle.tokenize = function (selector, parseOnly) {\n\t\t\tvar matched,\n\t\t\t    match,\n\t\t\t    tokens,\n\t\t\t    type,\n\t\t\t    soFar,\n\t\t\t    groups,\n\t\t\t    preFilters,\n\t\t\t    cached = tokenCache[selector + \" \"];\n\n\t\t\tif (cached) {\n\t\t\t\treturn parseOnly ? 0 : cached.slice(0);\n\t\t\t}\n\n\t\t\tsoFar = selector;\n\t\t\tgroups = [];\n\t\t\tpreFilters = Expr.preFilter;\n\n\t\t\twhile (soFar) {\n\n\t\t\t\t// Comma and first run\n\t\t\t\tif (!matched || (match = rcomma.exec(soFar))) {\n\t\t\t\t\tif (match) {\n\t\t\t\t\t\t// Don't consume trailing commas as valid\n\t\t\t\t\t\tsoFar = soFar.slice(match[0].length) || soFar;\n\t\t\t\t\t}\n\t\t\t\t\tgroups.push(tokens = []);\n\t\t\t\t}\n\n\t\t\t\tmatched = false;\n\n\t\t\t\t// Combinators\n\t\t\t\tif (match = rcombinators.exec(soFar)) {\n\t\t\t\t\tmatched = match.shift();\n\t\t\t\t\ttokens.push({\n\t\t\t\t\t\tvalue: matched,\n\t\t\t\t\t\t// Cast descendant combinators to space\n\t\t\t\t\t\ttype: match[0].replace(rtrim, \" \")\n\t\t\t\t\t});\n\t\t\t\t\tsoFar = soFar.slice(matched.length);\n\t\t\t\t}\n\n\t\t\t\t// Filters\n\t\t\t\tfor (type in Expr.filter) {\n\t\t\t\t\tif ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {\n\t\t\t\t\t\tmatched = match.shift();\n\t\t\t\t\t\ttokens.push({\n\t\t\t\t\t\t\tvalue: matched,\n\t\t\t\t\t\t\ttype: type,\n\t\t\t\t\t\t\tmatches: match\n\t\t\t\t\t\t});\n\t\t\t\t\t\tsoFar = soFar.slice(matched.length);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (!matched) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Return the length of the invalid excess\n\t\t\t// if we're just parsing\n\t\t\t// Otherwise, throw an error or return tokens\n\t\t\treturn parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :\n\t\t\t// Cache the tokens\n\t\t\ttokenCache(selector, groups).slice(0);\n\t\t};\n\n\t\tfunction toSelector(tokens) {\n\t\t\tvar i = 0,\n\t\t\t    len = tokens.length,\n\t\t\t    selector = \"\";\n\t\t\tfor (; i < len; i++) {\n\t\t\t\tselector += tokens[i].value;\n\t\t\t}\n\t\t\treturn selector;\n\t\t}\n\n\t\tfunction addCombinator(matcher, combinator, base) {\n\t\t\tvar dir = combinator.dir,\n\t\t\t    skip = combinator.next,\n\t\t\t    key = skip || dir,\n\t\t\t    checkNonElements = base && key === \"parentNode\",\n\t\t\t    doneName = done++;\n\n\t\t\treturn combinator.first ?\n\t\t\t// Check against closest ancestor/preceding element\n\t\t\tfunction (elem, context, xml) {\n\t\t\t\twhile (elem = elem[dir]) {\n\t\t\t\t\tif (elem.nodeType === 1 || checkNonElements) {\n\t\t\t\t\t\treturn matcher(elem, context, xml);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn false;\n\t\t\t} :\n\n\t\t\t// Check against all ancestor/preceding elements\n\t\t\tfunction (elem, context, xml) {\n\t\t\t\tvar oldCache,\n\t\t\t\t    uniqueCache,\n\t\t\t\t    outerCache,\n\t\t\t\t    newCache = [dirruns, doneName];\n\n\t\t\t\t// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching\n\t\t\t\tif (xml) {\n\t\t\t\t\twhile (elem = elem[dir]) {\n\t\t\t\t\t\tif (elem.nodeType === 1 || checkNonElements) {\n\t\t\t\t\t\t\tif (matcher(elem, context, xml)) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\twhile (elem = elem[dir]) {\n\t\t\t\t\t\tif (elem.nodeType === 1 || checkNonElements) {\n\t\t\t\t\t\t\touterCache = elem[expando] || (elem[expando] = {});\n\n\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\tuniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});\n\n\t\t\t\t\t\t\tif (skip && skip === elem.nodeName.toLowerCase()) {\n\t\t\t\t\t\t\t\telem = elem[dir] || elem;\n\t\t\t\t\t\t\t} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {\n\n\t\t\t\t\t\t\t\t// Assign to newCache so results back-propagate to previous elements\n\t\t\t\t\t\t\t\treturn newCache[2] = oldCache[2];\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t// Reuse newcache so results back-propagate to previous elements\n\t\t\t\t\t\t\t\tuniqueCache[key] = newCache;\n\n\t\t\t\t\t\t\t\t// A match means we're done; a fail means we have to keep checking\n\t\t\t\t\t\t\t\tif (newCache[2] = matcher(elem, context, xml)) {\n\t\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn false;\n\t\t\t};\n\t\t}\n\n\t\tfunction elementMatcher(matchers) {\n\t\t\treturn matchers.length > 1 ? function (elem, context, xml) {\n\t\t\t\tvar i = matchers.length;\n\t\t\t\twhile (i--) {\n\t\t\t\t\tif (!matchers[i](elem, context, xml)) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn true;\n\t\t\t} : matchers[0];\n\t\t}\n\n\t\tfunction multipleContexts(selector, contexts, results) {\n\t\t\tvar i = 0,\n\t\t\t    len = contexts.length;\n\t\t\tfor (; i < len; i++) {\n\t\t\t\tSizzle(selector, contexts[i], results);\n\t\t\t}\n\t\t\treturn results;\n\t\t}\n\n\t\tfunction condense(unmatched, map, filter, context, xml) {\n\t\t\tvar elem,\n\t\t\t    newUnmatched = [],\n\t\t\t    i = 0,\n\t\t\t    len = unmatched.length,\n\t\t\t    mapped = map != null;\n\n\t\t\tfor (; i < len; i++) {\n\t\t\t\tif (elem = unmatched[i]) {\n\t\t\t\t\tif (!filter || filter(elem, context, xml)) {\n\t\t\t\t\t\tnewUnmatched.push(elem);\n\t\t\t\t\t\tif (mapped) {\n\t\t\t\t\t\t\tmap.push(i);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn newUnmatched;\n\t\t}\n\n\t\tfunction setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {\n\t\t\tif (postFilter && !postFilter[expando]) {\n\t\t\t\tpostFilter = setMatcher(postFilter);\n\t\t\t}\n\t\t\tif (postFinder && !postFinder[expando]) {\n\t\t\t\tpostFinder = setMatcher(postFinder, postSelector);\n\t\t\t}\n\t\t\treturn markFunction(function (seed, results, context, xml) {\n\t\t\t\tvar temp,\n\t\t\t\t    i,\n\t\t\t\t    elem,\n\t\t\t\t    preMap = [],\n\t\t\t\t    postMap = [],\n\t\t\t\t    preexisting = results.length,\n\n\n\t\t\t\t// Get initial elements from seed or context\n\t\t\t\telems = seed || multipleContexts(selector || \"*\", context.nodeType ? [context] : context, []),\n\n\n\t\t\t\t// Prefilter to get matcher input, preserving a map for seed-results synchronization\n\t\t\t\tmatcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,\n\t\t\t\t    matcherOut = matcher ?\n\t\t\t\t// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n\t\t\t\tpostFinder || (seed ? preFilter : preexisting || postFilter) ?\n\n\t\t\t\t// ...intermediate processing is necessary\n\t\t\t\t[] :\n\n\t\t\t\t// ...otherwise use results directly\n\t\t\t\tresults : matcherIn;\n\n\t\t\t\t// Find primary matches\n\t\t\t\tif (matcher) {\n\t\t\t\t\tmatcher(matcherIn, matcherOut, context, xml);\n\t\t\t\t}\n\n\t\t\t\t// Apply postFilter\n\t\t\t\tif (postFilter) {\n\t\t\t\t\ttemp = condense(matcherOut, postMap);\n\t\t\t\t\tpostFilter(temp, [], context, xml);\n\n\t\t\t\t\t// Un-match failing elements by moving them back to matcherIn\n\t\t\t\t\ti = temp.length;\n\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\tif (elem = temp[i]) {\n\t\t\t\t\t\t\tmatcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (seed) {\n\t\t\t\t\tif (postFinder || preFilter) {\n\t\t\t\t\t\tif (postFinder) {\n\t\t\t\t\t\t\t// Get the final matcherOut by condensing this intermediate into postFinder contexts\n\t\t\t\t\t\t\ttemp = [];\n\t\t\t\t\t\t\ti = matcherOut.length;\n\t\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\t\tif (elem = matcherOut[i]) {\n\t\t\t\t\t\t\t\t\t// Restore matcherIn since elem is not yet a final match\n\t\t\t\t\t\t\t\t\ttemp.push(matcherIn[i] = elem);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tpostFinder(null, matcherOut = [], temp, xml);\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Move matched elements from seed to results to keep them synchronized\n\t\t\t\t\t\ti = matcherOut.length;\n\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\tif ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {\n\n\t\t\t\t\t\t\t\tseed[temp] = !(results[temp] = elem);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Add elements to results, through postFinder if defined\n\t\t\t\t} else {\n\t\t\t\t\tmatcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);\n\t\t\t\t\tif (postFinder) {\n\t\t\t\t\t\tpostFinder(null, results, matcherOut, xml);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tpush.apply(results, matcherOut);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\tfunction matcherFromTokens(tokens) {\n\t\t\tvar checkContext,\n\t\t\t    matcher,\n\t\t\t    j,\n\t\t\t    len = tokens.length,\n\t\t\t    leadingRelative = Expr.relative[tokens[0].type],\n\t\t\t    implicitRelative = leadingRelative || Expr.relative[\" \"],\n\t\t\t    i = leadingRelative ? 1 : 0,\n\n\n\t\t\t// The foundational matcher ensures that elements are reachable from top-level context(s)\n\t\t\tmatchContext = addCombinator(function (elem) {\n\t\t\t\treturn elem === checkContext;\n\t\t\t}, implicitRelative, true),\n\t\t\t    matchAnyContext = addCombinator(function (elem) {\n\t\t\t\treturn indexOf(checkContext, elem) > -1;\n\t\t\t}, implicitRelative, true),\n\t\t\t    matchers = [function (elem, context, xml) {\n\t\t\t\tvar ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));\n\t\t\t\t// Avoid hanging onto element (issue #299)\n\t\t\t\tcheckContext = null;\n\t\t\t\treturn ret;\n\t\t\t}];\n\n\t\t\tfor (; i < len; i++) {\n\t\t\t\tif (matcher = Expr.relative[tokens[i].type]) {\n\t\t\t\t\tmatchers = [addCombinator(elementMatcher(matchers), matcher)];\n\t\t\t\t} else {\n\t\t\t\t\tmatcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);\n\n\t\t\t\t\t// Return special upon seeing a positional matcher\n\t\t\t\t\tif (matcher[expando]) {\n\t\t\t\t\t\t// Find the next relative operator (if any) for proper handling\n\t\t\t\t\t\tj = ++i;\n\t\t\t\t\t\tfor (; j < len; j++) {\n\t\t\t\t\t\t\tif (Expr.relative[tokens[j].type]) {\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(\n\t\t\t\t\t\t// If the preceding token was a descendant combinator, insert an implicit any-element `*`\n\t\t\t\t\t\ttokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === \" \" ? \"*\" : \"\" })).replace(rtrim, \"$1\"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));\n\t\t\t\t\t}\n\t\t\t\t\tmatchers.push(matcher);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn elementMatcher(matchers);\n\t\t}\n\n\t\tfunction matcherFromGroupMatchers(elementMatchers, setMatchers) {\n\t\t\tvar bySet = setMatchers.length > 0,\n\t\t\t    byElement = elementMatchers.length > 0,\n\t\t\t    superMatcher = function superMatcher(seed, context, xml, results, outermost) {\n\t\t\t\tvar elem,\n\t\t\t\t    j,\n\t\t\t\t    matcher,\n\t\t\t\t    matchedCount = 0,\n\t\t\t\t    i = \"0\",\n\t\t\t\t    unmatched = seed && [],\n\t\t\t\t    setMatched = [],\n\t\t\t\t    contextBackup = outermostContext,\n\n\t\t\t\t// We must always have either seed elements or outermost context\n\t\t\t\telems = seed || byElement && Expr.find[\"TAG\"](\"*\", outermost),\n\n\t\t\t\t// Use integer dirruns iff this is the outermost matcher\n\t\t\t\tdirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,\n\t\t\t\t    len = elems.length;\n\n\t\t\t\tif (outermost) {\n\t\t\t\t\toutermostContext = context === document || context || outermost;\n\t\t\t\t}\n\n\t\t\t\t// Add elements passing elementMatchers directly to results\n\t\t\t\t// Support: IE<9, Safari\n\t\t\t\t// Tolerate NodeList properties (IE: \"length\"; Safari: <number>) matching elements by id\n\t\t\t\tfor (; i !== len && (elem = elems[i]) != null; i++) {\n\t\t\t\t\tif (byElement && elem) {\n\t\t\t\t\t\tj = 0;\n\t\t\t\t\t\tif (!context && elem.ownerDocument !== document) {\n\t\t\t\t\t\t\tsetDocument(elem);\n\t\t\t\t\t\t\txml = !documentIsHTML;\n\t\t\t\t\t\t}\n\t\t\t\t\t\twhile (matcher = elementMatchers[j++]) {\n\t\t\t\t\t\t\tif (matcher(elem, context || document, xml)) {\n\t\t\t\t\t\t\t\tresults.push(elem);\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (outermost) {\n\t\t\t\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Track unmatched elements for set filters\n\t\t\t\t\tif (bySet) {\n\t\t\t\t\t\t// They will have gone through all possible matchers\n\t\t\t\t\t\tif (elem = !matcher && elem) {\n\t\t\t\t\t\t\tmatchedCount--;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Lengthen the array for every element, matched or not\n\t\t\t\t\t\tif (seed) {\n\t\t\t\t\t\t\tunmatched.push(elem);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// `i` is now the count of elements visited above, and adding it to `matchedCount`\n\t\t\t\t// makes the latter nonnegative.\n\t\t\t\tmatchedCount += i;\n\n\t\t\t\t// Apply set filters to unmatched elements\n\t\t\t\t// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`\n\t\t\t\t// equals `i`), unless we didn't visit _any_ elements in the above loop because we have\n\t\t\t\t// no element matchers and no seed.\n\t\t\t\t// Incrementing an initially-string \"0\" `i` allows `i` to remain a string only in that\n\t\t\t\t// case, which will result in a \"00\" `matchedCount` that differs from `i` but is also\n\t\t\t\t// numerically zero.\n\t\t\t\tif (bySet && i !== matchedCount) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\twhile (matcher = setMatchers[j++]) {\n\t\t\t\t\t\tmatcher(unmatched, setMatched, context, xml);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (seed) {\n\t\t\t\t\t\t// Reintegrate element matches to eliminate the need for sorting\n\t\t\t\t\t\tif (matchedCount > 0) {\n\t\t\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\t\t\tif (!(unmatched[i] || setMatched[i])) {\n\t\t\t\t\t\t\t\t\tsetMatched[i] = pop.call(results);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Discard index placeholder values to get only actual matches\n\t\t\t\t\t\tsetMatched = condense(setMatched);\n\t\t\t\t\t}\n\n\t\t\t\t\t// Add matches to results\n\t\t\t\t\tpush.apply(results, setMatched);\n\n\t\t\t\t\t// Seedless set matches succeeding multiple successful matchers stipulate sorting\n\t\t\t\t\tif (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {\n\n\t\t\t\t\t\tSizzle.uniqueSort(results);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Override manipulation of globals by nested matchers\n\t\t\t\tif (outermost) {\n\t\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\t\toutermostContext = contextBackup;\n\t\t\t\t}\n\n\t\t\t\treturn unmatched;\n\t\t\t};\n\n\t\t\treturn bySet ? markFunction(superMatcher) : superMatcher;\n\t\t}\n\n\t\tcompile = Sizzle.compile = function (selector, match /* Internal Use Only */) {\n\t\t\tvar i,\n\t\t\t    setMatchers = [],\n\t\t\t    elementMatchers = [],\n\t\t\t    cached = compilerCache[selector + \" \"];\n\n\t\t\tif (!cached) {\n\t\t\t\t// Generate a function of recursive functions that can be used to check each element\n\t\t\t\tif (!match) {\n\t\t\t\t\tmatch = tokenize(selector);\n\t\t\t\t}\n\t\t\t\ti = match.length;\n\t\t\t\twhile (i--) {\n\t\t\t\t\tcached = matcherFromTokens(match[i]);\n\t\t\t\t\tif (cached[expando]) {\n\t\t\t\t\t\tsetMatchers.push(cached);\n\t\t\t\t\t} else {\n\t\t\t\t\t\telementMatchers.push(cached);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Cache the compiled function\n\t\t\t\tcached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));\n\n\t\t\t\t// Save selector and tokenization\n\t\t\t\tcached.selector = selector;\n\t\t\t}\n\t\t\treturn cached;\n\t\t};\n\n\t\t/**\n   * A low-level selection function that works with Sizzle's compiled\n   *  selector functions\n   * @param {String|Function} selector A selector or a pre-compiled\n   *  selector function built with Sizzle.compile\n   * @param {Element} context\n   * @param {Array} [results]\n   * @param {Array} [seed] A set of elements to match against\n   */\n\t\tselect = Sizzle.select = function (selector, context, results, seed) {\n\t\t\tvar i,\n\t\t\t    tokens,\n\t\t\t    token,\n\t\t\t    type,\n\t\t\t    find,\n\t\t\t    compiled = typeof selector === \"function\" && selector,\n\t\t\t    match = !seed && tokenize(selector = compiled.selector || selector);\n\n\t\t\tresults = results || [];\n\n\t\t\t// Try to minimize operations if there is only one selector in the list and no seed\n\t\t\t// (the latter of which guarantees us context)\n\t\t\tif (match.length === 1) {\n\n\t\t\t\t// Reduce context if the leading compound selector is an ID\n\t\t\t\ttokens = match[0] = match[0].slice(0);\n\t\t\t\tif (tokens.length > 2 && (token = tokens[0]).type === \"ID\" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {\n\n\t\t\t\t\tcontext = (Expr.find[\"ID\"](token.matches[0].replace(runescape, funescape), context) || [])[0];\n\t\t\t\t\tif (!context) {\n\t\t\t\t\t\treturn results;\n\n\t\t\t\t\t\t// Precompiled matchers will still verify ancestry, so step up a level\n\t\t\t\t\t} else if (compiled) {\n\t\t\t\t\t\tcontext = context.parentNode;\n\t\t\t\t\t}\n\n\t\t\t\t\tselector = selector.slice(tokens.shift().value.length);\n\t\t\t\t}\n\n\t\t\t\t// Fetch a seed set for right-to-left matching\n\t\t\t\ti = matchExpr[\"needsContext\"].test(selector) ? 0 : tokens.length;\n\t\t\t\twhile (i--) {\n\t\t\t\t\ttoken = tokens[i];\n\n\t\t\t\t\t// Abort if we hit a combinator\n\t\t\t\t\tif (Expr.relative[type = token.type]) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tif (find = Expr.find[type]) {\n\t\t\t\t\t\t// Search, expanding context for leading sibling combinators\n\t\t\t\t\t\tif (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {\n\n\t\t\t\t\t\t\t// If seed is empty or no tokens remain, we can return early\n\t\t\t\t\t\t\ttokens.splice(i, 1);\n\t\t\t\t\t\t\tselector = seed.length && toSelector(tokens);\n\t\t\t\t\t\t\tif (!selector) {\n\t\t\t\t\t\t\t\tpush.apply(results, seed);\n\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Compile and execute a filtering function if one is not provided\n\t\t\t// Provide `match` to avoid retokenization if we modified the selector above\n\t\t\t(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);\n\t\t\treturn results;\n\t\t};\n\n\t\t// One-time assignments\n\n\t\t// Sort stability\n\t\tsupport.sortStable = expando.split(\"\").sort(sortOrder).join(\"\") === expando;\n\n\t\t// Support: Chrome 14-35+\n\t\t// Always assume duplicates if they aren't passed to the comparison function\n\t\tsupport.detectDuplicates = !!hasDuplicate;\n\n\t\t// Initialize against the default document\n\t\tsetDocument();\n\n\t\t// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n\t\t// Detached nodes confoundingly follow *each other*\n\t\tsupport.sortDetached = assert(function (el) {\n\t\t\t// Should return 1, but returns 4 (following)\n\t\t\treturn el.compareDocumentPosition(document.createElement(\"fieldset\")) & 1;\n\t\t});\n\n\t\t// Support: IE<8\n\t\t// Prevent attribute/property \"interpolation\"\n\t\t// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\n\t\tif (!assert(function (el) {\n\t\t\tel.innerHTML = \"<a href='#'></a>\";\n\t\t\treturn el.firstChild.getAttribute(\"href\") === \"#\";\n\t\t})) {\n\t\t\taddHandle(\"type|href|height|width\", function (elem, name, isXML) {\n\t\t\t\tif (!isXML) {\n\t\t\t\t\treturn elem.getAttribute(name, name.toLowerCase() === \"type\" ? 1 : 2);\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\t// Support: IE<9\n\t\t// Use defaultValue in place of getAttribute(\"value\")\n\t\tif (!support.attributes || !assert(function (el) {\n\t\t\tel.innerHTML = \"<input/>\";\n\t\t\tel.firstChild.setAttribute(\"value\", \"\");\n\t\t\treturn el.firstChild.getAttribute(\"value\") === \"\";\n\t\t})) {\n\t\t\taddHandle(\"value\", function (elem, name, isXML) {\n\t\t\t\tif (!isXML && elem.nodeName.toLowerCase() === \"input\") {\n\t\t\t\t\treturn elem.defaultValue;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\t// Support: IE<9\n\t\t// Use getAttributeNode to fetch booleans when getAttribute lies\n\t\tif (!assert(function (el) {\n\t\t\treturn el.getAttribute(\"disabled\") == null;\n\t\t})) {\n\t\t\taddHandle(booleans, function (elem, name, isXML) {\n\t\t\t\tvar val;\n\t\t\t\tif (!isXML) {\n\t\t\t\t\treturn elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\treturn Sizzle;\n\t}(window);\n\n\tjQuery.find = Sizzle;\n\tjQuery.expr = Sizzle.selectors;\n\n\t// Deprecated\n\tjQuery.expr[\":\"] = jQuery.expr.pseudos;\n\tjQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;\n\tjQuery.text = Sizzle.getText;\n\tjQuery.isXMLDoc = Sizzle.isXML;\n\tjQuery.contains = Sizzle.contains;\n\tjQuery.escapeSelector = Sizzle.escape;\n\n\tvar dir = function dir(elem, _dir, until) {\n\t\tvar matched = [],\n\t\t    truncate = until !== undefined;\n\n\t\twhile ((elem = elem[_dir]) && elem.nodeType !== 9) {\n\t\t\tif (elem.nodeType === 1) {\n\t\t\t\tif (truncate && jQuery(elem).is(until)) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tmatched.push(elem);\n\t\t\t}\n\t\t}\n\t\treturn matched;\n\t};\n\n\tvar _siblings = function _siblings(n, elem) {\n\t\tvar matched = [];\n\n\t\tfor (; n; n = n.nextSibling) {\n\t\t\tif (n.nodeType === 1 && n !== elem) {\n\t\t\t\tmatched.push(n);\n\t\t\t}\n\t\t}\n\n\t\treturn matched;\n\t};\n\n\tvar rneedsContext = jQuery.expr.match.needsContext;\n\n\tvar rsingleTag = /^<([a-z][^\\/\\0>:\\x20\\t\\r\\n\\f]*)[\\x20\\t\\r\\n\\f]*\\/?>(?:<\\/\\1>|)$/i;\n\n\tvar risSimple = /^.[^:#\\[\\.,]*$/;\n\n\t// Implement the identical functionality for filter and not\n\tfunction winnow(elements, qualifier, not) {\n\t\tif (jQuery.isFunction(qualifier)) {\n\t\t\treturn jQuery.grep(elements, function (elem, i) {\n\t\t\t\treturn !!qualifier.call(elem, i, elem) !== not;\n\t\t\t});\n\t\t}\n\n\t\t// Single element\n\t\tif (qualifier.nodeType) {\n\t\t\treturn jQuery.grep(elements, function (elem) {\n\t\t\t\treturn elem === qualifier !== not;\n\t\t\t});\n\t\t}\n\n\t\t// Arraylike of elements (jQuery, arguments, Array)\n\t\tif (typeof qualifier !== \"string\") {\n\t\t\treturn jQuery.grep(elements, function (elem) {\n\t\t\t\treturn indexOf.call(qualifier, elem) > -1 !== not;\n\t\t\t});\n\t\t}\n\n\t\t// Simple selector that can be filtered directly, removing non-Elements\n\t\tif (risSimple.test(qualifier)) {\n\t\t\treturn jQuery.filter(qualifier, elements, not);\n\t\t}\n\n\t\t// Complex selector, compare the two sets, removing non-Elements\n\t\tqualifier = jQuery.filter(qualifier, elements);\n\t\treturn jQuery.grep(elements, function (elem) {\n\t\t\treturn indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;\n\t\t});\n\t}\n\n\tjQuery.filter = function (expr, elems, not) {\n\t\tvar elem = elems[0];\n\n\t\tif (not) {\n\t\t\texpr = \":not(\" + expr + \")\";\n\t\t}\n\n\t\tif (elems.length === 1 && elem.nodeType === 1) {\n\t\t\treturn jQuery.find.matchesSelector(elem, expr) ? [elem] : [];\n\t\t}\n\n\t\treturn jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {\n\t\t\treturn elem.nodeType === 1;\n\t\t}));\n\t};\n\n\tjQuery.fn.extend({\n\t\tfind: function find(selector) {\n\t\t\tvar i,\n\t\t\t    ret,\n\t\t\t    len = this.length,\n\t\t\t    self = this;\n\n\t\t\tif (typeof selector !== \"string\") {\n\t\t\t\treturn this.pushStack(jQuery(selector).filter(function () {\n\t\t\t\t\tfor (i = 0; i < len; i++) {\n\t\t\t\t\t\tif (jQuery.contains(self[i], this)) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}));\n\t\t\t}\n\n\t\t\tret = this.pushStack([]);\n\n\t\t\tfor (i = 0; i < len; i++) {\n\t\t\t\tjQuery.find(selector, self[i], ret);\n\t\t\t}\n\n\t\t\treturn len > 1 ? jQuery.uniqueSort(ret) : ret;\n\t\t},\n\t\tfilter: function filter(selector) {\n\t\t\treturn this.pushStack(winnow(this, selector || [], false));\n\t\t},\n\t\tnot: function not(selector) {\n\t\t\treturn this.pushStack(winnow(this, selector || [], true));\n\t\t},\n\t\tis: function is(selector) {\n\t\t\treturn !!winnow(this,\n\n\t\t\t// If this is a positional/relative selector, check membership in the returned set\n\t\t\t// so $(\"p:first\").is(\"p:last\") won't return true for a doc with two \"p\".\n\t\t\ttypeof selector === \"string\" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;\n\t\t}\n\t});\n\n\t// Initialize a jQuery object\n\n\n\t// A central reference to the root jQuery(document)\n\tvar rootjQuery,\n\n\n\t// A simple way to check for HTML strings\n\t// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n\t// Strict HTML recognition (#11290: must start with <)\n\t// Shortcut simple #id case for speed\n\trquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]+))$/,\n\t    init = jQuery.fn.init = function (selector, context, root) {\n\t\tvar match, elem;\n\n\t\t// HANDLE: $(\"\"), $(null), $(undefined), $(false)\n\t\tif (!selector) {\n\t\t\treturn this;\n\t\t}\n\n\t\t// Method init() accepts an alternate rootjQuery\n\t\t// so migrate can support jQuery.sub (gh-2101)\n\t\troot = root || rootjQuery;\n\n\t\t// Handle HTML strings\n\t\tif (typeof selector === \"string\") {\n\t\t\tif (selector[0] === \"<\" && selector[selector.length - 1] === \">\" && selector.length >= 3) {\n\n\t\t\t\t// Assume that strings that start and end with <> are HTML and skip the regex check\n\t\t\t\tmatch = [null, selector, null];\n\t\t\t} else {\n\t\t\t\tmatch = rquickExpr.exec(selector);\n\t\t\t}\n\n\t\t\t// Match html or make sure no context is specified for #id\n\t\t\tif (match && (match[1] || !context)) {\n\n\t\t\t\t// HANDLE: $(html) -> $(array)\n\t\t\t\tif (match[1]) {\n\t\t\t\t\tcontext = context instanceof jQuery ? context[0] : context;\n\n\t\t\t\t\t// Option to run scripts is true for back-compat\n\t\t\t\t\t// Intentionally let the error be thrown if parseHTML is not present\n\t\t\t\t\tjQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));\n\n\t\t\t\t\t// HANDLE: $(html, props)\n\t\t\t\t\tif (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {\n\t\t\t\t\t\tfor (match in context) {\n\n\t\t\t\t\t\t\t// Properties of context are called as methods if possible\n\t\t\t\t\t\t\tif (jQuery.isFunction(this[match])) {\n\t\t\t\t\t\t\t\tthis[match](context[match]);\n\n\t\t\t\t\t\t\t\t// ...and otherwise set as attributes\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.attr(match, context[match]);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t\t// HANDLE: $(#id)\n\t\t\t\t} else {\n\t\t\t\t\telem = document.getElementById(match[2]);\n\n\t\t\t\t\tif (elem) {\n\n\t\t\t\t\t\t// Inject the element directly into the jQuery object\n\t\t\t\t\t\tthis[0] = elem;\n\t\t\t\t\t\tthis.length = 1;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\n\t\t\t\t// HANDLE: $(expr, $(...))\n\t\t\t} else if (!context || context.jquery) {\n\t\t\t\treturn (context || root).find(selector);\n\n\t\t\t\t// HANDLE: $(expr, context)\n\t\t\t\t// (which is just equivalent to: $(context).find(expr)\n\t\t\t} else {\n\t\t\t\treturn this.constructor(context).find(selector);\n\t\t\t}\n\n\t\t\t// HANDLE: $(DOMElement)\n\t\t} else if (selector.nodeType) {\n\t\t\tthis[0] = selector;\n\t\t\tthis.length = 1;\n\t\t\treturn this;\n\n\t\t\t// HANDLE: $(function)\n\t\t\t// Shortcut for document ready\n\t\t} else if (jQuery.isFunction(selector)) {\n\t\t\treturn root.ready !== undefined ? root.ready(selector) :\n\n\t\t\t// Execute immediately if ready is not present\n\t\t\tselector(jQuery);\n\t\t}\n\n\t\treturn jQuery.makeArray(selector, this);\n\t};\n\n\t// Give the init function the jQuery prototype for later instantiation\n\tinit.prototype = jQuery.fn;\n\n\t// Initialize central reference\n\trootjQuery = jQuery(document);\n\n\tvar rparentsprev = /^(?:parents|prev(?:Until|All))/,\n\n\n\t// Methods guaranteed to produce a unique set when starting from a unique set\n\tguaranteedUnique = {\n\t\tchildren: true,\n\t\tcontents: true,\n\t\tnext: true,\n\t\tprev: true\n\t};\n\n\tjQuery.fn.extend({\n\t\thas: function has(target) {\n\t\t\tvar targets = jQuery(target, this),\n\t\t\t    l = targets.length;\n\n\t\t\treturn this.filter(function () {\n\t\t\t\tvar i = 0;\n\t\t\t\tfor (; i < l; i++) {\n\t\t\t\t\tif (jQuery.contains(this, targets[i])) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tclosest: function closest(selectors, context) {\n\t\t\tvar cur,\n\t\t\t    i = 0,\n\t\t\t    l = this.length,\n\t\t\t    matched = [],\n\t\t\t    targets = typeof selectors !== \"string\" && jQuery(selectors);\n\n\t\t\t// Positional selectors never match, since there's no _selection_ context\n\t\t\tif (!rneedsContext.test(selectors)) {\n\t\t\t\tfor (; i < l; i++) {\n\t\t\t\t\tfor (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {\n\n\t\t\t\t\t\t// Always skip document fragments\n\t\t\t\t\t\tif (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :\n\n\t\t\t\t\t\t// Don't pass non-elements to Sizzle\n\t\t\t\t\t\tcur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {\n\n\t\t\t\t\t\t\tmatched.push(cur);\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);\n\t\t},\n\n\t\t// Determine the position of an element within the set\n\t\tindex: function index(elem) {\n\n\t\t\t// No argument, return index in parent\n\t\t\tif (!elem) {\n\t\t\t\treturn this[0] && this[0].parentNode ? this.first().prevAll().length : -1;\n\t\t\t}\n\n\t\t\t// Index in selector\n\t\t\tif (typeof elem === \"string\") {\n\t\t\t\treturn indexOf.call(jQuery(elem), this[0]);\n\t\t\t}\n\n\t\t\t// Locate the position of the desired element\n\t\t\treturn indexOf.call(this,\n\n\t\t\t// If it receives a jQuery object, the first element is used\n\t\t\telem.jquery ? elem[0] : elem);\n\t\t},\n\n\t\tadd: function add(selector, context) {\n\t\t\treturn this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));\n\t\t},\n\n\t\taddBack: function addBack(selector) {\n\t\t\treturn this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));\n\t\t}\n\t});\n\n\tfunction sibling(cur, dir) {\n\t\twhile ((cur = cur[dir]) && cur.nodeType !== 1) {}\n\t\treturn cur;\n\t}\n\n\tjQuery.each({\n\t\tparent: function parent(elem) {\n\t\t\tvar parent = elem.parentNode;\n\t\t\treturn parent && parent.nodeType !== 11 ? parent : null;\n\t\t},\n\t\tparents: function parents(elem) {\n\t\t\treturn dir(elem, \"parentNode\");\n\t\t},\n\t\tparentsUntil: function parentsUntil(elem, i, until) {\n\t\t\treturn dir(elem, \"parentNode\", until);\n\t\t},\n\t\tnext: function next(elem) {\n\t\t\treturn sibling(elem, \"nextSibling\");\n\t\t},\n\t\tprev: function prev(elem) {\n\t\t\treturn sibling(elem, \"previousSibling\");\n\t\t},\n\t\tnextAll: function nextAll(elem) {\n\t\t\treturn dir(elem, \"nextSibling\");\n\t\t},\n\t\tprevAll: function prevAll(elem) {\n\t\t\treturn dir(elem, \"previousSibling\");\n\t\t},\n\t\tnextUntil: function nextUntil(elem, i, until) {\n\t\t\treturn dir(elem, \"nextSibling\", until);\n\t\t},\n\t\tprevUntil: function prevUntil(elem, i, until) {\n\t\t\treturn dir(elem, \"previousSibling\", until);\n\t\t},\n\t\tsiblings: function siblings(elem) {\n\t\t\treturn _siblings((elem.parentNode || {}).firstChild, elem);\n\t\t},\n\t\tchildren: function children(elem) {\n\t\t\treturn _siblings(elem.firstChild);\n\t\t},\n\t\tcontents: function contents(elem) {\n\t\t\treturn elem.contentDocument || jQuery.merge([], elem.childNodes);\n\t\t}\n\t}, function (name, fn) {\n\t\tjQuery.fn[name] = function (until, selector) {\n\t\t\tvar matched = jQuery.map(this, fn, until);\n\n\t\t\tif (name.slice(-5) !== \"Until\") {\n\t\t\t\tselector = until;\n\t\t\t}\n\n\t\t\tif (selector && typeof selector === \"string\") {\n\t\t\t\tmatched = jQuery.filter(selector, matched);\n\t\t\t}\n\n\t\t\tif (this.length > 1) {\n\n\t\t\t\t// Remove duplicates\n\t\t\t\tif (!guaranteedUnique[name]) {\n\t\t\t\t\tjQuery.uniqueSort(matched);\n\t\t\t\t}\n\n\t\t\t\t// Reverse order for parents* and prev-derivatives\n\t\t\t\tif (rparentsprev.test(name)) {\n\t\t\t\t\tmatched.reverse();\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this.pushStack(matched);\n\t\t};\n\t});\n\tvar rnothtmlwhite = /[^\\x20\\t\\r\\n\\f]+/g;\n\n\t// Convert String-formatted options into Object-formatted ones\n\tfunction createOptions(options) {\n\t\tvar object = {};\n\t\tjQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {\n\t\t\tobject[flag] = true;\n\t\t});\n\t\treturn object;\n\t}\n\n\t/*\n  * Create a callback list using the following parameters:\n  *\n  *\toptions: an optional list of space-separated options that will change how\n  *\t\t\tthe callback list behaves or a more traditional option object\n  *\n  * By default a callback list will act like an event callback list and can be\n  * \"fired\" multiple times.\n  *\n  * Possible options:\n  *\n  *\tonce:\t\t\twill ensure the callback list can only be fired once (like a Deferred)\n  *\n  *\tmemory:\t\t\twill keep track of previous values and will call any callback added\n  *\t\t\t\t\tafter the list has been fired right away with the latest \"memorized\"\n  *\t\t\t\t\tvalues (like a Deferred)\n  *\n  *\tunique:\t\t\twill ensure a callback can only be added once (no duplicate in the list)\n  *\n  *\tstopOnFalse:\tinterrupt callings when a callback returns false\n  *\n  */\n\tjQuery.Callbacks = function (options) {\n\n\t\t// Convert options from String-formatted to Object-formatted if needed\n\t\t// (we check in cache first)\n\t\toptions = typeof options === \"string\" ? createOptions(options) : jQuery.extend({}, options);\n\n\t\tvar // Flag to know if list is currently firing\n\t\tfiring,\n\n\n\t\t// Last fire value for non-forgettable lists\n\t\tmemory,\n\n\n\t\t// Flag to know if list was already fired\n\t\t_fired,\n\n\n\t\t// Flag to prevent firing\n\t\t_locked,\n\n\n\t\t// Actual callback list\n\t\tlist = [],\n\n\n\t\t// Queue of execution data for repeatable lists\n\t\tqueue = [],\n\n\n\t\t// Index of currently firing callback (modified by add/remove as needed)\n\t\tfiringIndex = -1,\n\n\n\t\t// Fire callbacks\n\t\tfire = function fire() {\n\n\t\t\t// Enforce single-firing\n\t\t\t_locked = options.once;\n\n\t\t\t// Execute callbacks for all pending executions,\n\t\t\t// respecting firingIndex overrides and runtime changes\n\t\t\t_fired = firing = true;\n\t\t\tfor (; queue.length; firingIndex = -1) {\n\t\t\t\tmemory = queue.shift();\n\t\t\t\twhile (++firingIndex < list.length) {\n\n\t\t\t\t\t// Run callback and check for early termination\n\t\t\t\t\tif (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {\n\n\t\t\t\t\t\t// Jump to end and forget the data so .add doesn't re-fire\n\t\t\t\t\t\tfiringIndex = list.length;\n\t\t\t\t\t\tmemory = false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Forget the data if we're done with it\n\t\t\tif (!options.memory) {\n\t\t\t\tmemory = false;\n\t\t\t}\n\n\t\t\tfiring = false;\n\n\t\t\t// Clean up if we're done firing for good\n\t\t\tif (_locked) {\n\n\t\t\t\t// Keep an empty list if we have data for future add calls\n\t\t\t\tif (memory) {\n\t\t\t\t\tlist = [];\n\n\t\t\t\t\t// Otherwise, this object is spent\n\t\t\t\t} else {\n\t\t\t\t\tlist = \"\";\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\n\t\t// Actual Callbacks object\n\t\tself = {\n\n\t\t\t// Add a callback or a collection of callbacks to the list\n\t\t\tadd: function add() {\n\t\t\t\tif (list) {\n\n\t\t\t\t\t// If we have memory from a past run, we should fire after adding\n\t\t\t\t\tif (memory && !firing) {\n\t\t\t\t\t\tfiringIndex = list.length - 1;\n\t\t\t\t\t\tqueue.push(memory);\n\t\t\t\t\t}\n\n\t\t\t\t\t(function add(args) {\n\t\t\t\t\t\tjQuery.each(args, function (_, arg) {\n\t\t\t\t\t\t\tif (jQuery.isFunction(arg)) {\n\t\t\t\t\t\t\t\tif (!options.unique || !self.has(arg)) {\n\t\t\t\t\t\t\t\t\tlist.push(arg);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else if (arg && arg.length && jQuery.type(arg) !== \"string\") {\n\n\t\t\t\t\t\t\t\t// Inspect recursively\n\t\t\t\t\t\t\t\tadd(arg);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t})(arguments);\n\n\t\t\t\t\tif (memory && !firing) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Remove a callback from the list\n\t\t\tremove: function remove() {\n\t\t\t\tjQuery.each(arguments, function (_, arg) {\n\t\t\t\t\tvar index;\n\t\t\t\t\twhile ((index = jQuery.inArray(arg, list, index)) > -1) {\n\t\t\t\t\t\tlist.splice(index, 1);\n\n\t\t\t\t\t\t// Handle firing indexes\n\t\t\t\t\t\tif (index <= firingIndex) {\n\t\t\t\t\t\t\tfiringIndex--;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Check if a given callback is in the list.\n\t\t\t// If no argument is given, return whether or not list has callbacks attached.\n\t\t\thas: function has(fn) {\n\t\t\t\treturn fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;\n\t\t\t},\n\n\t\t\t// Remove all callbacks from the list\n\t\t\tempty: function empty() {\n\t\t\t\tif (list) {\n\t\t\t\t\tlist = [];\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Disable .fire and .add\n\t\t\t// Abort any current/pending executions\n\t\t\t// Clear all callbacks and values\n\t\t\tdisable: function disable() {\n\t\t\t\t_locked = queue = [];\n\t\t\t\tlist = memory = \"\";\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tdisabled: function disabled() {\n\t\t\t\treturn !list;\n\t\t\t},\n\n\t\t\t// Disable .fire\n\t\t\t// Also disable .add unless we have memory (since it would have no effect)\n\t\t\t// Abort any pending executions\n\t\t\tlock: function lock() {\n\t\t\t\t_locked = queue = [];\n\t\t\t\tif (!memory && !firing) {\n\t\t\t\t\tlist = memory = \"\";\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tlocked: function locked() {\n\t\t\t\treturn !!_locked;\n\t\t\t},\n\n\t\t\t// Call all callbacks with the given context and arguments\n\t\t\tfireWith: function fireWith(context, args) {\n\t\t\t\tif (!_locked) {\n\t\t\t\t\targs = args || [];\n\t\t\t\t\targs = [context, args.slice ? args.slice() : args];\n\t\t\t\t\tqueue.push(args);\n\t\t\t\t\tif (!firing) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Call all the callbacks with the given arguments\n\t\t\tfire: function fire() {\n\t\t\t\tself.fireWith(this, arguments);\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// To know if the callbacks have already been called at least once\n\t\t\tfired: function fired() {\n\t\t\t\treturn !!_fired;\n\t\t\t}\n\t\t};\n\n\t\treturn self;\n\t};\n\n\tfunction Identity(v) {\n\t\treturn v;\n\t}\n\tfunction Thrower(ex) {\n\t\tthrow ex;\n\t}\n\n\tfunction adoptValue(value, resolve, reject) {\n\t\tvar method;\n\n\t\ttry {\n\n\t\t\t// Check for promise aspect first to privilege synchronous behavior\n\t\t\tif (value && jQuery.isFunction(method = value.promise)) {\n\t\t\t\tmethod.call(value).done(resolve).fail(reject);\n\n\t\t\t\t// Other thenables\n\t\t\t} else if (value && jQuery.isFunction(method = value.then)) {\n\t\t\t\tmethod.call(value, resolve, reject);\n\n\t\t\t\t// Other non-thenables\n\t\t\t} else {\n\n\t\t\t\t// Support: Android 4.0 only\n\t\t\t\t// Strict mode functions invoked without .call/.apply get global-object context\n\t\t\t\tresolve.call(undefined, value);\n\t\t\t}\n\n\t\t\t// For Promises/A+, convert exceptions into rejections\n\t\t\t// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in\n\t\t\t// Deferred#then to conditionally suppress rejection.\n\t\t} catch (value) {\n\n\t\t\t// Support: Android 4.0 only\n\t\t\t// Strict mode functions invoked without .call/.apply get global-object context\n\t\t\treject.call(undefined, value);\n\t\t}\n\t}\n\n\tjQuery.extend({\n\n\t\tDeferred: function Deferred(func) {\n\t\t\tvar tuples = [\n\n\t\t\t// action, add listener, callbacks,\n\t\t\t// ... .then handlers, argument index, [final state]\n\t\t\t[\"notify\", \"progress\", jQuery.Callbacks(\"memory\"), jQuery.Callbacks(\"memory\"), 2], [\"resolve\", \"done\", jQuery.Callbacks(\"once memory\"), jQuery.Callbacks(\"once memory\"), 0, \"resolved\"], [\"reject\", \"fail\", jQuery.Callbacks(\"once memory\"), jQuery.Callbacks(\"once memory\"), 1, \"rejected\"]],\n\t\t\t    _state = \"pending\",\n\t\t\t    _promise = {\n\t\t\t\tstate: function state() {\n\t\t\t\t\treturn _state;\n\t\t\t\t},\n\t\t\t\talways: function always() {\n\t\t\t\t\tdeferred.done(arguments).fail(arguments);\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\t\t\t\t\"catch\": function _catch(fn) {\n\t\t\t\t\treturn _promise.then(null, fn);\n\t\t\t\t},\n\n\t\t\t\t// Keep pipe for back-compat\n\t\t\t\tpipe: function pipe() /* fnDone, fnFail, fnProgress */{\n\t\t\t\t\tvar fns = arguments;\n\n\t\t\t\t\treturn jQuery.Deferred(function (newDefer) {\n\t\t\t\t\t\tjQuery.each(tuples, function (i, tuple) {\n\n\t\t\t\t\t\t\t// Map tuples (progress, done, fail) to arguments (done, fail, progress)\n\t\t\t\t\t\t\tvar fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];\n\n\t\t\t\t\t\t\t// deferred.progress(function() { bind to newDefer or newDefer.notify })\n\t\t\t\t\t\t\t// deferred.done(function() { bind to newDefer or newDefer.resolve })\n\t\t\t\t\t\t\t// deferred.fail(function() { bind to newDefer or newDefer.reject })\n\t\t\t\t\t\t\tdeferred[tuple[1]](function () {\n\t\t\t\t\t\t\t\tvar returned = fn && fn.apply(this, arguments);\n\t\t\t\t\t\t\t\tif (returned && jQuery.isFunction(returned.promise)) {\n\t\t\t\t\t\t\t\t\treturned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tnewDefer[tuple[0] + \"With\"](this, fn ? [returned] : arguments);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t});\n\t\t\t\t\t\tfns = null;\n\t\t\t\t\t}).promise();\n\t\t\t\t},\n\t\t\t\tthen: function then(onFulfilled, onRejected, onProgress) {\n\t\t\t\t\tvar maxDepth = 0;\n\t\t\t\t\tfunction resolve(depth, deferred, handler, special) {\n\t\t\t\t\t\treturn function () {\n\t\t\t\t\t\t\tvar that = this,\n\t\t\t\t\t\t\t    args = arguments,\n\t\t\t\t\t\t\t    mightThrow = function mightThrow() {\n\t\t\t\t\t\t\t\tvar returned, then;\n\n\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.3\n\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-59\n\t\t\t\t\t\t\t\t// Ignore double-resolution attempts\n\t\t\t\t\t\t\t\tif (depth < maxDepth) {\n\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\treturned = handler.apply(that, args);\n\n\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.1\n\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-48\n\t\t\t\t\t\t\t\tif (returned === deferred.promise()) {\n\t\t\t\t\t\t\t\t\tthrow new TypeError(\"Thenable self-resolution\");\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t// Support: Promises/A+ sections 2.3.3.1, 3.5\n\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-54\n\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-75\n\t\t\t\t\t\t\t\t// Retrieve `then` only once\n\t\t\t\t\t\t\t\tthen = returned && (\n\n\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.4\n\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-64\n\t\t\t\t\t\t\t\t// Only check objects and functions for thenability\n\t\t\t\t\t\t\t\t(typeof returned === \"undefined\" ? \"undefined\" : _typeof(returned)) === \"object\" || typeof returned === \"function\") && returned.then;\n\n\t\t\t\t\t\t\t\t// Handle a returned thenable\n\t\t\t\t\t\t\t\tif (jQuery.isFunction(then)) {\n\n\t\t\t\t\t\t\t\t\t// Special processors (notify) just wait for resolution\n\t\t\t\t\t\t\t\t\tif (special) {\n\t\t\t\t\t\t\t\t\t\tthen.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));\n\n\t\t\t\t\t\t\t\t\t\t// Normal processors (resolve) also hook into progress\n\t\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\t\t// ...and disregard older resolution values\n\t\t\t\t\t\t\t\t\t\tmaxDepth++;\n\n\t\t\t\t\t\t\t\t\t\tthen.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t// Handle all other returned values\n\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\t// Only substitute handlers pass on context\n\t\t\t\t\t\t\t\t\t// and multiple values (non-spec behavior)\n\t\t\t\t\t\t\t\t\tif (handler !== Identity) {\n\t\t\t\t\t\t\t\t\t\tthat = undefined;\n\t\t\t\t\t\t\t\t\t\targs = [returned];\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t// Process the value(s)\n\t\t\t\t\t\t\t\t\t// Default process is resolve\n\t\t\t\t\t\t\t\t\t(special || deferred.resolveWith)(that, args);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t},\n\n\n\t\t\t\t\t\t\t// Only normal processors (resolve) catch and reject exceptions\n\t\t\t\t\t\t\tprocess = special ? mightThrow : function () {\n\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\tmightThrow();\n\t\t\t\t\t\t\t\t} catch (e) {\n\n\t\t\t\t\t\t\t\t\tif (jQuery.Deferred.exceptionHook) {\n\t\t\t\t\t\t\t\t\t\tjQuery.Deferred.exceptionHook(e, process.stackTrace);\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.4.1\n\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-61\n\t\t\t\t\t\t\t\t\t// Ignore post-resolution exceptions\n\t\t\t\t\t\t\t\t\tif (depth + 1 >= maxDepth) {\n\n\t\t\t\t\t\t\t\t\t\t// Only substitute handlers pass on context\n\t\t\t\t\t\t\t\t\t\t// and multiple values (non-spec behavior)\n\t\t\t\t\t\t\t\t\t\tif (handler !== Thrower) {\n\t\t\t\t\t\t\t\t\t\t\tthat = undefined;\n\t\t\t\t\t\t\t\t\t\t\targs = [e];\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\tdeferred.rejectWith(that, args);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.1\n\t\t\t\t\t\t\t// https://promisesaplus.com/#point-57\n\t\t\t\t\t\t\t// Re-resolve promises immediately to dodge false rejection from\n\t\t\t\t\t\t\t// subsequent errors\n\t\t\t\t\t\t\tif (depth) {\n\t\t\t\t\t\t\t\tprocess();\n\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t// Call an optional hook to record the stack, in case of exception\n\t\t\t\t\t\t\t\t// since it's otherwise lost when execution goes async\n\t\t\t\t\t\t\t\tif (jQuery.Deferred.getStackHook) {\n\t\t\t\t\t\t\t\t\tprocess.stackTrace = jQuery.Deferred.getStackHook();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\twindow.setTimeout(process);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\n\t\t\t\t\treturn jQuery.Deferred(function (newDefer) {\n\n\t\t\t\t\t\t// progress_handlers.add( ... )\n\t\t\t\t\t\ttuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));\n\n\t\t\t\t\t\t// fulfilled_handlers.add( ... )\n\t\t\t\t\t\ttuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));\n\n\t\t\t\t\t\t// rejected_handlers.add( ... )\n\t\t\t\t\t\ttuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));\n\t\t\t\t\t}).promise();\n\t\t\t\t},\n\n\t\t\t\t// Get a promise for this deferred\n\t\t\t\t// If obj is provided, the promise aspect is added to the object\n\t\t\t\tpromise: function promise(obj) {\n\t\t\t\t\treturn obj != null ? jQuery.extend(obj, _promise) : _promise;\n\t\t\t\t}\n\t\t\t},\n\t\t\t    deferred = {};\n\n\t\t\t// Add list-specific methods\n\t\t\tjQuery.each(tuples, function (i, tuple) {\n\t\t\t\tvar list = tuple[2],\n\t\t\t\t    stateString = tuple[5];\n\n\t\t\t\t// promise.progress = list.add\n\t\t\t\t// promise.done = list.add\n\t\t\t\t// promise.fail = list.add\n\t\t\t\t_promise[tuple[1]] = list.add;\n\n\t\t\t\t// Handle state\n\t\t\t\tif (stateString) {\n\t\t\t\t\tlist.add(function () {\n\n\t\t\t\t\t\t// state = \"resolved\" (i.e., fulfilled)\n\t\t\t\t\t\t// state = \"rejected\"\n\t\t\t\t\t\t_state = stateString;\n\t\t\t\t\t},\n\n\t\t\t\t\t// rejected_callbacks.disable\n\t\t\t\t\t// fulfilled_callbacks.disable\n\t\t\t\t\ttuples[3 - i][2].disable,\n\n\t\t\t\t\t// progress_callbacks.lock\n\t\t\t\t\ttuples[0][2].lock);\n\t\t\t\t}\n\n\t\t\t\t// progress_handlers.fire\n\t\t\t\t// fulfilled_handlers.fire\n\t\t\t\t// rejected_handlers.fire\n\t\t\t\tlist.add(tuple[3].fire);\n\n\t\t\t\t// deferred.notify = function() { deferred.notifyWith(...) }\n\t\t\t\t// deferred.resolve = function() { deferred.resolveWith(...) }\n\t\t\t\t// deferred.reject = function() { deferred.rejectWith(...) }\n\t\t\t\tdeferred[tuple[0]] = function () {\n\t\t\t\t\tdeferred[tuple[0] + \"With\"](this === deferred ? undefined : this, arguments);\n\t\t\t\t\treturn this;\n\t\t\t\t};\n\n\t\t\t\t// deferred.notifyWith = list.fireWith\n\t\t\t\t// deferred.resolveWith = list.fireWith\n\t\t\t\t// deferred.rejectWith = list.fireWith\n\t\t\t\tdeferred[tuple[0] + \"With\"] = list.fireWith;\n\t\t\t});\n\n\t\t\t// Make the deferred a promise\n\t\t\t_promise.promise(deferred);\n\n\t\t\t// Call given func if any\n\t\t\tif (func) {\n\t\t\t\tfunc.call(deferred, deferred);\n\t\t\t}\n\n\t\t\t// All done!\n\t\t\treturn deferred;\n\t\t},\n\n\t\t// Deferred helper\n\t\twhen: function when(singleValue) {\n\t\t\tvar\n\n\t\t\t// count of uncompleted subordinates\n\t\t\tremaining = arguments.length,\n\n\n\t\t\t// count of unprocessed arguments\n\t\t\ti = remaining,\n\n\n\t\t\t// subordinate fulfillment data\n\t\t\tresolveContexts = Array(i),\n\t\t\t    resolveValues = _slice.call(arguments),\n\n\n\t\t\t// the master Deferred\n\t\t\tmaster = jQuery.Deferred(),\n\n\n\t\t\t// subordinate callback factory\n\t\t\tupdateFunc = function updateFunc(i) {\n\t\t\t\treturn function (value) {\n\t\t\t\t\tresolveContexts[i] = this;\n\t\t\t\t\tresolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;\n\t\t\t\t\tif (! --remaining) {\n\t\t\t\t\t\tmaster.resolveWith(resolveContexts, resolveValues);\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t};\n\n\t\t\t// Single- and empty arguments are adopted like Promise.resolve\n\t\t\tif (remaining <= 1) {\n\t\t\t\tadoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);\n\n\t\t\t\t// Use .then() to unwrap secondary thenables (cf. gh-3000)\n\t\t\t\tif (master.state() === \"pending\" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {\n\n\t\t\t\t\treturn master.then();\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Multiple arguments are aggregated like Promise.all array elements\n\t\t\twhile (i--) {\n\t\t\t\tadoptValue(resolveValues[i], updateFunc(i), master.reject);\n\t\t\t}\n\n\t\t\treturn master.promise();\n\t\t}\n\t});\n\n\t// These usually indicate a programmer mistake during development,\n\t// warn about them ASAP rather than swallowing them by default.\n\tvar rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;\n\n\tjQuery.Deferred.exceptionHook = function (error, stack) {\n\n\t\t// Support: IE 8 - 9 only\n\t\t// Console exists when dev tools are open, which can happen at any time\n\t\tif (window.console && window.console.warn && error && rerrorNames.test(error.name)) {\n\t\t\twindow.console.warn(\"jQuery.Deferred exception: \" + error.message, error.stack, stack);\n\t\t}\n\t};\n\n\tjQuery.readyException = function (error) {\n\t\twindow.setTimeout(function () {\n\t\t\tthrow error;\n\t\t});\n\t};\n\n\t// The deferred used on DOM ready\n\tvar readyList = jQuery.Deferred();\n\n\tjQuery.fn.ready = function (fn) {\n\n\t\treadyList.then(fn)\n\n\t\t// Wrap jQuery.readyException in a function so that the lookup\n\t\t// happens at the time of error handling instead of callback\n\t\t// registration.\n\t\t.catch(function (error) {\n\t\t\tjQuery.readyException(error);\n\t\t});\n\n\t\treturn this;\n\t};\n\n\tjQuery.extend({\n\n\t\t// Is the DOM ready to be used? Set to true once it occurs.\n\t\tisReady: false,\n\n\t\t// A counter to track how many items to wait for before\n\t\t// the ready event fires. See #6781\n\t\treadyWait: 1,\n\n\t\t// Hold (or release) the ready event\n\t\tholdReady: function holdReady(hold) {\n\t\t\tif (hold) {\n\t\t\t\tjQuery.readyWait++;\n\t\t\t} else {\n\t\t\t\tjQuery.ready(true);\n\t\t\t}\n\t\t},\n\n\t\t// Handle when the DOM is ready\n\t\tready: function ready(wait) {\n\n\t\t\t// Abort if there are pending holds or we're already ready\n\t\t\tif (wait === true ? --jQuery.readyWait : jQuery.isReady) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Remember that the DOM is ready\n\t\t\tjQuery.isReady = true;\n\n\t\t\t// If a normal DOM Ready event fired, decrement, and wait if need be\n\t\t\tif (wait !== true && --jQuery.readyWait > 0) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// If there are functions bound, to execute\n\t\t\treadyList.resolveWith(document, [jQuery]);\n\t\t}\n\t});\n\n\tjQuery.ready.then = readyList.then;\n\n\t// The ready event handler and self cleanup method\n\tfunction completed() {\n\t\tdocument.removeEventListener(\"DOMContentLoaded\", completed);\n\t\twindow.removeEventListener(\"load\", completed);\n\t\tjQuery.ready();\n\t}\n\n\t// Catch cases where $(document).ready() is called\n\t// after the browser event has already occurred.\n\t// Support: IE <=9 - 10 only\n\t// Older IE sometimes signals \"interactive\" too soon\n\tif (document.readyState === \"complete\" || document.readyState !== \"loading\" && !document.documentElement.doScroll) {\n\n\t\t// Handle it asynchronously to allow scripts the opportunity to delay ready\n\t\twindow.setTimeout(jQuery.ready);\n\t} else {\n\n\t\t// Use the handy event callback\n\t\tdocument.addEventListener(\"DOMContentLoaded\", completed);\n\n\t\t// A fallback to window.onload, that will always work\n\t\twindow.addEventListener(\"load\", completed);\n\t}\n\n\t// Multifunctional method to get and set values of a collection\n\t// The value/s can optionally be executed if it's a function\n\tvar access = function access(elems, fn, key, value, chainable, emptyGet, raw) {\n\t\tvar i = 0,\n\t\t    len = elems.length,\n\t\t    bulk = key == null;\n\n\t\t// Sets many values\n\t\tif (jQuery.type(key) === \"object\") {\n\t\t\tchainable = true;\n\t\t\tfor (i in key) {\n\t\t\t\taccess(elems, fn, i, key[i], true, emptyGet, raw);\n\t\t\t}\n\n\t\t\t// Sets one value\n\t\t} else if (value !== undefined) {\n\t\t\tchainable = true;\n\n\t\t\tif (!jQuery.isFunction(value)) {\n\t\t\t\traw = true;\n\t\t\t}\n\n\t\t\tif (bulk) {\n\n\t\t\t\t// Bulk operations run against the entire set\n\t\t\t\tif (raw) {\n\t\t\t\t\tfn.call(elems, value);\n\t\t\t\t\tfn = null;\n\n\t\t\t\t\t// ...except when executing function values\n\t\t\t\t} else {\n\t\t\t\t\tbulk = fn;\n\t\t\t\t\tfn = function fn(elem, key, value) {\n\t\t\t\t\t\treturn bulk.call(jQuery(elem), value);\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (fn) {\n\t\t\t\tfor (; i < len; i++) {\n\t\t\t\t\tfn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (chainable) {\n\t\t\treturn elems;\n\t\t}\n\n\t\t// Gets\n\t\tif (bulk) {\n\t\t\treturn fn.call(elems);\n\t\t}\n\n\t\treturn len ? fn(elems[0], key) : emptyGet;\n\t};\n\tvar acceptData = function acceptData(owner) {\n\n\t\t// Accepts only:\n\t\t//  - Node\n\t\t//    - Node.ELEMENT_NODE\n\t\t//    - Node.DOCUMENT_NODE\n\t\t//  - Object\n\t\t//    - Any\n\t\treturn owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;\n\t};\n\n\tfunction Data() {\n\t\tthis.expando = jQuery.expando + Data.uid++;\n\t}\n\n\tData.uid = 1;\n\n\tData.prototype = {\n\n\t\tcache: function cache(owner) {\n\n\t\t\t// Check if the owner object already has a cache\n\t\t\tvar value = owner[this.expando];\n\n\t\t\t// If not, create one\n\t\t\tif (!value) {\n\t\t\t\tvalue = {};\n\n\t\t\t\t// We can accept data for non-element nodes in modern browsers,\n\t\t\t\t// but we should not, see #8335.\n\t\t\t\t// Always return an empty object.\n\t\t\t\tif (acceptData(owner)) {\n\n\t\t\t\t\t// If it is a node unlikely to be stringify-ed or looped over\n\t\t\t\t\t// use plain assignment\n\t\t\t\t\tif (owner.nodeType) {\n\t\t\t\t\t\towner[this.expando] = value;\n\n\t\t\t\t\t\t// Otherwise secure it in a non-enumerable property\n\t\t\t\t\t\t// configurable must be true to allow the property to be\n\t\t\t\t\t\t// deleted when data is removed\n\t\t\t\t\t} else {\n\t\t\t\t\t\tObject.defineProperty(owner, this.expando, {\n\t\t\t\t\t\t\tvalue: value,\n\t\t\t\t\t\t\tconfigurable: true\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn value;\n\t\t},\n\t\tset: function set(owner, data, value) {\n\t\t\tvar prop,\n\t\t\t    cache = this.cache(owner);\n\n\t\t\t// Handle: [ owner, key, value ] args\n\t\t\t// Always use camelCase key (gh-2257)\n\t\t\tif (typeof data === \"string\") {\n\t\t\t\tcache[jQuery.camelCase(data)] = value;\n\n\t\t\t\t// Handle: [ owner, { properties } ] args\n\t\t\t} else {\n\n\t\t\t\t// Copy the properties one-by-one to the cache object\n\t\t\t\tfor (prop in data) {\n\t\t\t\t\tcache[jQuery.camelCase(prop)] = data[prop];\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn cache;\n\t\t},\n\t\tget: function get(owner, key) {\n\t\t\treturn key === undefined ? this.cache(owner) :\n\n\t\t\t// Always use camelCase key (gh-2257)\n\t\t\towner[this.expando] && owner[this.expando][jQuery.camelCase(key)];\n\t\t},\n\t\taccess: function access(owner, key, value) {\n\n\t\t\t// In cases where either:\n\t\t\t//\n\t\t\t//   1. No key was specified\n\t\t\t//   2. A string key was specified, but no value provided\n\t\t\t//\n\t\t\t// Take the \"read\" path and allow the get method to determine\n\t\t\t// which value to return, respectively either:\n\t\t\t//\n\t\t\t//   1. The entire cache object\n\t\t\t//   2. The data stored at the key\n\t\t\t//\n\t\t\tif (key === undefined || key && typeof key === \"string\" && value === undefined) {\n\n\t\t\t\treturn this.get(owner, key);\n\t\t\t}\n\n\t\t\t// When the key is not a string, or both a key and value\n\t\t\t// are specified, set or extend (existing objects) with either:\n\t\t\t//\n\t\t\t//   1. An object of properties\n\t\t\t//   2. A key and value\n\t\t\t//\n\t\t\tthis.set(owner, key, value);\n\n\t\t\t// Since the \"set\" path can have two possible entry points\n\t\t\t// return the expected data based on which path was taken[*]\n\t\t\treturn value !== undefined ? value : key;\n\t\t},\n\t\tremove: function remove(owner, key) {\n\t\t\tvar i,\n\t\t\t    cache = owner[this.expando];\n\n\t\t\tif (cache === undefined) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (key !== undefined) {\n\n\t\t\t\t// Support array or space separated string of keys\n\t\t\t\tif (jQuery.isArray(key)) {\n\n\t\t\t\t\t// If key is an array of keys...\n\t\t\t\t\t// We always set camelCase keys, so remove that.\n\t\t\t\t\tkey = key.map(jQuery.camelCase);\n\t\t\t\t} else {\n\t\t\t\t\tkey = jQuery.camelCase(key);\n\n\t\t\t\t\t// If a key with the spaces exists, use it.\n\t\t\t\t\t// Otherwise, create an array by matching non-whitespace\n\t\t\t\t\tkey = key in cache ? [key] : key.match(rnothtmlwhite) || [];\n\t\t\t\t}\n\n\t\t\t\ti = key.length;\n\n\t\t\t\twhile (i--) {\n\t\t\t\t\tdelete cache[key[i]];\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Remove the expando if there's no more data\n\t\t\tif (key === undefined || jQuery.isEmptyObject(cache)) {\n\n\t\t\t\t// Support: Chrome <=35 - 45\n\t\t\t\t// Webkit & Blink performance suffers when deleting properties\n\t\t\t\t// from DOM nodes, so set to undefined instead\n\t\t\t\t// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)\n\t\t\t\tif (owner.nodeType) {\n\t\t\t\t\towner[this.expando] = undefined;\n\t\t\t\t} else {\n\t\t\t\t\tdelete owner[this.expando];\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\thasData: function hasData(owner) {\n\t\t\tvar cache = owner[this.expando];\n\t\t\treturn cache !== undefined && !jQuery.isEmptyObject(cache);\n\t\t}\n\t};\n\tvar dataPriv = new Data();\n\n\tvar dataUser = new Data();\n\n\t//\tImplementation Summary\n\t//\n\t//\t1. Enforce API surface and semantic compatibility with 1.9.x branch\n\t//\t2. Improve the module's maintainability by reducing the storage\n\t//\t\tpaths to a single mechanism.\n\t//\t3. Use the same single mechanism to support \"private\" and \"user\" data.\n\t//\t4. _Never_ expose \"private\" data to user code (TODO: Drop _data, _removeData)\n\t//\t5. Avoid exposing implementation details on user objects (eg. expando properties)\n\t//\t6. Provide a clear path for implementation upgrade to WeakMap in 2014\n\n\tvar rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n\t    rmultiDash = /[A-Z]/g;\n\n\tfunction getData(data) {\n\t\tif (data === \"true\") {\n\t\t\treturn true;\n\t\t}\n\n\t\tif (data === \"false\") {\n\t\t\treturn false;\n\t\t}\n\n\t\tif (data === \"null\") {\n\t\t\treturn null;\n\t\t}\n\n\t\t// Only convert to a number if it doesn't change the string\n\t\tif (data === +data + \"\") {\n\t\t\treturn +data;\n\t\t}\n\n\t\tif (rbrace.test(data)) {\n\t\t\treturn JSON.parse(data);\n\t\t}\n\n\t\treturn data;\n\t}\n\n\tfunction dataAttr(elem, key, data) {\n\t\tvar name;\n\n\t\t// If nothing was found internally, try to fetch any\n\t\t// data from the HTML5 data-* attribute\n\t\tif (data === undefined && elem.nodeType === 1) {\n\t\t\tname = \"data-\" + key.replace(rmultiDash, \"-$&\").toLowerCase();\n\t\t\tdata = elem.getAttribute(name);\n\n\t\t\tif (typeof data === \"string\") {\n\t\t\t\ttry {\n\t\t\t\t\tdata = getData(data);\n\t\t\t\t} catch (e) {}\n\n\t\t\t\t// Make sure we set the data so it isn't changed later\n\t\t\t\tdataUser.set(elem, key, data);\n\t\t\t} else {\n\t\t\t\tdata = undefined;\n\t\t\t}\n\t\t}\n\t\treturn data;\n\t}\n\n\tjQuery.extend({\n\t\thasData: function hasData(elem) {\n\t\t\treturn dataUser.hasData(elem) || dataPriv.hasData(elem);\n\t\t},\n\n\t\tdata: function data(elem, name, _data) {\n\t\t\treturn dataUser.access(elem, name, _data);\n\t\t},\n\n\t\tremoveData: function removeData(elem, name) {\n\t\t\tdataUser.remove(elem, name);\n\t\t},\n\n\t\t// TODO: Now that all calls to _data and _removeData have been replaced\n\t\t// with direct calls to dataPriv methods, these can be deprecated.\n\t\t_data: function _data(elem, name, data) {\n\t\t\treturn dataPriv.access(elem, name, data);\n\t\t},\n\n\t\t_removeData: function _removeData(elem, name) {\n\t\t\tdataPriv.remove(elem, name);\n\t\t}\n\t});\n\n\tjQuery.fn.extend({\n\t\tdata: function data(key, value) {\n\t\t\tvar i,\n\t\t\t    name,\n\t\t\t    data,\n\t\t\t    elem = this[0],\n\t\t\t    attrs = elem && elem.attributes;\n\n\t\t\t// Gets all values\n\t\t\tif (key === undefined) {\n\t\t\t\tif (this.length) {\n\t\t\t\t\tdata = dataUser.get(elem);\n\n\t\t\t\t\tif (elem.nodeType === 1 && !dataPriv.get(elem, \"hasDataAttrs\")) {\n\t\t\t\t\t\ti = attrs.length;\n\t\t\t\t\t\twhile (i--) {\n\n\t\t\t\t\t\t\t// Support: IE 11 only\n\t\t\t\t\t\t\t// The attrs elements can be null (#14894)\n\t\t\t\t\t\t\tif (attrs[i]) {\n\t\t\t\t\t\t\t\tname = attrs[i].name;\n\t\t\t\t\t\t\t\tif (name.indexOf(\"data-\") === 0) {\n\t\t\t\t\t\t\t\t\tname = jQuery.camelCase(name.slice(5));\n\t\t\t\t\t\t\t\t\tdataAttr(elem, name, data[name]);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdataPriv.set(elem, \"hasDataAttrs\", true);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn data;\n\t\t\t}\n\n\t\t\t// Sets multiple values\n\t\t\tif ((typeof key === \"undefined\" ? \"undefined\" : _typeof(key)) === \"object\") {\n\t\t\t\treturn this.each(function () {\n\t\t\t\t\tdataUser.set(this, key);\n\t\t\t\t});\n\t\t\t}\n\n\t\t\treturn access(this, function (value) {\n\t\t\t\tvar data;\n\n\t\t\t\t// The calling jQuery object (element matches) is not empty\n\t\t\t\t// (and therefore has an element appears at this[ 0 ]) and the\n\t\t\t\t// `value` parameter was not undefined. An empty jQuery object\n\t\t\t\t// will result in `undefined` for elem = this[ 0 ] which will\n\t\t\t\t// throw an exception if an attempt to read a data cache is made.\n\t\t\t\tif (elem && value === undefined) {\n\n\t\t\t\t\t// Attempt to get data from the cache\n\t\t\t\t\t// The key will always be camelCased in Data\n\t\t\t\t\tdata = dataUser.get(elem, key);\n\t\t\t\t\tif (data !== undefined) {\n\t\t\t\t\t\treturn data;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Attempt to \"discover\" the data in\n\t\t\t\t\t// HTML5 custom data-* attrs\n\t\t\t\t\tdata = dataAttr(elem, key);\n\t\t\t\t\tif (data !== undefined) {\n\t\t\t\t\t\treturn data;\n\t\t\t\t\t}\n\n\t\t\t\t\t// We tried really hard, but the data doesn't exist.\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t// Set the data...\n\t\t\t\tthis.each(function () {\n\n\t\t\t\t\t// We always store the camelCased key\n\t\t\t\t\tdataUser.set(this, key, value);\n\t\t\t\t});\n\t\t\t}, null, value, arguments.length > 1, null, true);\n\t\t},\n\n\t\tremoveData: function removeData(key) {\n\t\t\treturn this.each(function () {\n\t\t\t\tdataUser.remove(this, key);\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.extend({\n\t\tqueue: function queue(elem, type, data) {\n\t\t\tvar queue;\n\n\t\t\tif (elem) {\n\t\t\t\ttype = (type || \"fx\") + \"queue\";\n\t\t\t\tqueue = dataPriv.get(elem, type);\n\n\t\t\t\t// Speed up dequeue by getting out quickly if this is just a lookup\n\t\t\t\tif (data) {\n\t\t\t\t\tif (!queue || jQuery.isArray(data)) {\n\t\t\t\t\t\tqueue = dataPriv.access(elem, type, jQuery.makeArray(data));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tqueue.push(data);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn queue || [];\n\t\t\t}\n\t\t},\n\n\t\tdequeue: function dequeue(elem, type) {\n\t\t\ttype = type || \"fx\";\n\n\t\t\tvar queue = jQuery.queue(elem, type),\n\t\t\t    startLength = queue.length,\n\t\t\t    fn = queue.shift(),\n\t\t\t    hooks = jQuery._queueHooks(elem, type),\n\t\t\t    next = function next() {\n\t\t\t\tjQuery.dequeue(elem, type);\n\t\t\t};\n\n\t\t\t// If the fx queue is dequeued, always remove the progress sentinel\n\t\t\tif (fn === \"inprogress\") {\n\t\t\t\tfn = queue.shift();\n\t\t\t\tstartLength--;\n\t\t\t}\n\n\t\t\tif (fn) {\n\n\t\t\t\t// Add a progress sentinel to prevent the fx queue from being\n\t\t\t\t// automatically dequeued\n\t\t\t\tif (type === \"fx\") {\n\t\t\t\t\tqueue.unshift(\"inprogress\");\n\t\t\t\t}\n\n\t\t\t\t// Clear up the last queue stop function\n\t\t\t\tdelete hooks.stop;\n\t\t\t\tfn.call(elem, next, hooks);\n\t\t\t}\n\n\t\t\tif (!startLength && hooks) {\n\t\t\t\thooks.empty.fire();\n\t\t\t}\n\t\t},\n\n\t\t// Not public - generate a queueHooks object, or return the current one\n\t\t_queueHooks: function _queueHooks(elem, type) {\n\t\t\tvar key = type + \"queueHooks\";\n\t\t\treturn dataPriv.get(elem, key) || dataPriv.access(elem, key, {\n\t\t\t\tempty: jQuery.Callbacks(\"once memory\").add(function () {\n\t\t\t\t\tdataPriv.remove(elem, [type + \"queue\", key]);\n\t\t\t\t})\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.fn.extend({\n\t\tqueue: function queue(type, data) {\n\t\t\tvar setter = 2;\n\n\t\t\tif (typeof type !== \"string\") {\n\t\t\t\tdata = type;\n\t\t\t\ttype = \"fx\";\n\t\t\t\tsetter--;\n\t\t\t}\n\n\t\t\tif (arguments.length < setter) {\n\t\t\t\treturn jQuery.queue(this[0], type);\n\t\t\t}\n\n\t\t\treturn data === undefined ? this : this.each(function () {\n\t\t\t\tvar queue = jQuery.queue(this, type, data);\n\n\t\t\t\t// Ensure a hooks for this queue\n\t\t\t\tjQuery._queueHooks(this, type);\n\n\t\t\t\tif (type === \"fx\" && queue[0] !== \"inprogress\") {\n\t\t\t\t\tjQuery.dequeue(this, type);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\t\tdequeue: function dequeue(type) {\n\t\t\treturn this.each(function () {\n\t\t\t\tjQuery.dequeue(this, type);\n\t\t\t});\n\t\t},\n\t\tclearQueue: function clearQueue(type) {\n\t\t\treturn this.queue(type || \"fx\", []);\n\t\t},\n\n\t\t// Get a promise resolved when queues of a certain type\n\t\t// are emptied (fx is the type by default)\n\t\tpromise: function promise(type, obj) {\n\t\t\tvar tmp,\n\t\t\t    count = 1,\n\t\t\t    defer = jQuery.Deferred(),\n\t\t\t    elements = this,\n\t\t\t    i = this.length,\n\t\t\t    resolve = function resolve() {\n\t\t\t\tif (! --count) {\n\t\t\t\t\tdefer.resolveWith(elements, [elements]);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tif (typeof type !== \"string\") {\n\t\t\t\tobj = type;\n\t\t\t\ttype = undefined;\n\t\t\t}\n\t\t\ttype = type || \"fx\";\n\n\t\t\twhile (i--) {\n\t\t\t\ttmp = dataPriv.get(elements[i], type + \"queueHooks\");\n\t\t\t\tif (tmp && tmp.empty) {\n\t\t\t\t\tcount++;\n\t\t\t\t\ttmp.empty.add(resolve);\n\t\t\t\t}\n\t\t\t}\n\t\t\tresolve();\n\t\t\treturn defer.promise(obj);\n\t\t}\n\t});\n\tvar pnum = /[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/.source;\n\n\tvar rcssNum = new RegExp(\"^(?:([+-])=|)(\" + pnum + \")([a-z%]*)$\", \"i\");\n\n\tvar cssExpand = [\"Top\", \"Right\", \"Bottom\", \"Left\"];\n\n\tvar isHiddenWithinTree = function isHiddenWithinTree(elem, el) {\n\n\t\t// isHiddenWithinTree might be called from jQuery#filter function;\n\t\t// in that case, element will be second argument\n\t\telem = el || elem;\n\n\t\t// Inline style trumps all\n\t\treturn elem.style.display === \"none\" || elem.style.display === \"\" &&\n\n\t\t// Otherwise, check computed style\n\t\t// Support: Firefox <=43 - 45\n\t\t// Disconnected elements can have computed display: none, so first confirm that elem is\n\t\t// in the document.\n\t\tjQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, \"display\") === \"none\";\n\t};\n\n\tvar swap = function swap(elem, options, callback, args) {\n\t\tvar ret,\n\t\t    name,\n\t\t    old = {};\n\n\t\t// Remember the old values, and insert the new ones\n\t\tfor (name in options) {\n\t\t\told[name] = elem.style[name];\n\t\t\telem.style[name] = options[name];\n\t\t}\n\n\t\tret = callback.apply(elem, args || []);\n\n\t\t// Revert the old values\n\t\tfor (name in options) {\n\t\t\telem.style[name] = old[name];\n\t\t}\n\n\t\treturn ret;\n\t};\n\n\tfunction adjustCSS(elem, prop, valueParts, tween) {\n\t\tvar adjusted,\n\t\t    scale = 1,\n\t\t    maxIterations = 20,\n\t\t    currentValue = tween ? function () {\n\t\t\treturn tween.cur();\n\t\t} : function () {\n\t\t\treturn jQuery.css(elem, prop, \"\");\n\t\t},\n\t\t    initial = currentValue(),\n\t\t    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? \"\" : \"px\"),\n\n\n\t\t// Starting value computation is required for potential unit mismatches\n\t\tinitialInUnit = (jQuery.cssNumber[prop] || unit !== \"px\" && +initial) && rcssNum.exec(jQuery.css(elem, prop));\n\n\t\tif (initialInUnit && initialInUnit[3] !== unit) {\n\n\t\t\t// Trust units reported by jQuery.css\n\t\t\tunit = unit || initialInUnit[3];\n\n\t\t\t// Make sure we update the tween properties later on\n\t\t\tvalueParts = valueParts || [];\n\n\t\t\t// Iteratively approximate from a nonzero starting point\n\t\t\tinitialInUnit = +initial || 1;\n\n\t\t\tdo {\n\n\t\t\t\t// If previous iteration zeroed out, double until we get *something*.\n\t\t\t\t// Use string for doubling so we don't accidentally see scale as unchanged below\n\t\t\t\tscale = scale || \".5\";\n\n\t\t\t\t// Adjust and apply\n\t\t\t\tinitialInUnit = initialInUnit / scale;\n\t\t\t\tjQuery.style(elem, prop, initialInUnit + unit);\n\n\t\t\t\t// Update scale, tolerating zero or NaN from tween.cur()\n\t\t\t\t// Break the loop if scale is unchanged or perfect, or if we've just had enough.\n\t\t\t} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);\n\t\t}\n\n\t\tif (valueParts) {\n\t\t\tinitialInUnit = +initialInUnit || +initial || 0;\n\n\t\t\t// Apply relative offset (+=/-=) if specified\n\t\t\tadjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];\n\t\t\tif (tween) {\n\t\t\t\ttween.unit = unit;\n\t\t\t\ttween.start = initialInUnit;\n\t\t\t\ttween.end = adjusted;\n\t\t\t}\n\t\t}\n\t\treturn adjusted;\n\t}\n\n\tvar defaultDisplayMap = {};\n\n\tfunction getDefaultDisplay(elem) {\n\t\tvar temp,\n\t\t    doc = elem.ownerDocument,\n\t\t    nodeName = elem.nodeName,\n\t\t    display = defaultDisplayMap[nodeName];\n\n\t\tif (display) {\n\t\t\treturn display;\n\t\t}\n\n\t\ttemp = doc.body.appendChild(doc.createElement(nodeName));\n\t\tdisplay = jQuery.css(temp, \"display\");\n\n\t\ttemp.parentNode.removeChild(temp);\n\n\t\tif (display === \"none\") {\n\t\t\tdisplay = \"block\";\n\t\t}\n\t\tdefaultDisplayMap[nodeName] = display;\n\n\t\treturn display;\n\t}\n\n\tfunction showHide(elements, show) {\n\t\tvar display,\n\t\t    elem,\n\t\t    values = [],\n\t\t    index = 0,\n\t\t    length = elements.length;\n\n\t\t// Determine new display value for elements that need to change\n\t\tfor (; index < length; index++) {\n\t\t\telem = elements[index];\n\t\t\tif (!elem.style) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tdisplay = elem.style.display;\n\t\t\tif (show) {\n\n\t\t\t\t// Since we force visibility upon cascade-hidden elements, an immediate (and slow)\n\t\t\t\t// check is required in this first loop unless we have a nonempty display value (either\n\t\t\t\t// inline or about-to-be-restored)\n\t\t\t\tif (display === \"none\") {\n\t\t\t\t\tvalues[index] = dataPriv.get(elem, \"display\") || null;\n\t\t\t\t\tif (!values[index]) {\n\t\t\t\t\t\telem.style.display = \"\";\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (elem.style.display === \"\" && isHiddenWithinTree(elem)) {\n\t\t\t\t\tvalues[index] = getDefaultDisplay(elem);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif (display !== \"none\") {\n\t\t\t\t\tvalues[index] = \"none\";\n\n\t\t\t\t\t// Remember what we're overwriting\n\t\t\t\t\tdataPriv.set(elem, \"display\", display);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Set the display of the elements in a second loop to avoid constant reflow\n\t\tfor (index = 0; index < length; index++) {\n\t\t\tif (values[index] != null) {\n\t\t\t\telements[index].style.display = values[index];\n\t\t\t}\n\t\t}\n\n\t\treturn elements;\n\t}\n\n\tjQuery.fn.extend({\n\t\tshow: function show() {\n\t\t\treturn showHide(this, true);\n\t\t},\n\t\thide: function hide() {\n\t\t\treturn showHide(this);\n\t\t},\n\t\ttoggle: function toggle(state) {\n\t\t\tif (typeof state === \"boolean\") {\n\t\t\t\treturn state ? this.show() : this.hide();\n\t\t\t}\n\n\t\t\treturn this.each(function () {\n\t\t\t\tif (isHiddenWithinTree(this)) {\n\t\t\t\t\tjQuery(this).show();\n\t\t\t\t} else {\n\t\t\t\t\tjQuery(this).hide();\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t});\n\tvar rcheckableType = /^(?:checkbox|radio)$/i;\n\n\tvar rtagName = /<([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]+)/i;\n\n\tvar rscriptType = /^$|\\/(?:java|ecma)script/i;\n\n\t// We have to close these tags to support XHTML (#13200)\n\tvar wrapMap = {\n\n\t\t// Support: IE <=9 only\n\t\toption: [1, \"<select multiple='multiple'>\", \"</select>\"],\n\n\t\t// XHTML parsers do not magically insert elements in the\n\t\t// same way that tag soup parsers do. So we cannot shorten\n\t\t// this by omitting <tbody> or other required elements.\n\t\tthead: [1, \"<table>\", \"</table>\"],\n\t\tcol: [2, \"<table><colgroup>\", \"</colgroup></table>\"],\n\t\ttr: [2, \"<table><tbody>\", \"</tbody></table>\"],\n\t\ttd: [3, \"<table><tbody><tr>\", \"</tr></tbody></table>\"],\n\n\t\t_default: [0, \"\", \"\"]\n\t};\n\n\t// Support: IE <=9 only\n\twrapMap.optgroup = wrapMap.option;\n\n\twrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\n\twrapMap.th = wrapMap.td;\n\n\tfunction getAll(context, tag) {\n\n\t\t// Support: IE <=9 - 11 only\n\t\t// Use typeof to avoid zero-argument method invocation on host objects (#15151)\n\t\tvar ret;\n\n\t\tif (typeof context.getElementsByTagName !== \"undefined\") {\n\t\t\tret = context.getElementsByTagName(tag || \"*\");\n\t\t} else if (typeof context.querySelectorAll !== \"undefined\") {\n\t\t\tret = context.querySelectorAll(tag || \"*\");\n\t\t} else {\n\t\t\tret = [];\n\t\t}\n\n\t\tif (tag === undefined || tag && jQuery.nodeName(context, tag)) {\n\t\t\treturn jQuery.merge([context], ret);\n\t\t}\n\n\t\treturn ret;\n\t}\n\n\t// Mark scripts as having already been evaluated\n\tfunction setGlobalEval(elems, refElements) {\n\t\tvar i = 0,\n\t\t    l = elems.length;\n\n\t\tfor (; i < l; i++) {\n\t\t\tdataPriv.set(elems[i], \"globalEval\", !refElements || dataPriv.get(refElements[i], \"globalEval\"));\n\t\t}\n\t}\n\n\tvar rhtml = /<|&#?\\w+;/;\n\n\tfunction buildFragment(elems, context, scripts, selection, ignored) {\n\t\tvar elem,\n\t\t    tmp,\n\t\t    tag,\n\t\t    wrap,\n\t\t    contains,\n\t\t    j,\n\t\t    fragment = context.createDocumentFragment(),\n\t\t    nodes = [],\n\t\t    i = 0,\n\t\t    l = elems.length;\n\n\t\tfor (; i < l; i++) {\n\t\t\telem = elems[i];\n\n\t\t\tif (elem || elem === 0) {\n\n\t\t\t\t// Add nodes directly\n\t\t\t\tif (jQuery.type(elem) === \"object\") {\n\n\t\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\t\tjQuery.merge(nodes, elem.nodeType ? [elem] : elem);\n\n\t\t\t\t\t// Convert non-html into a text node\n\t\t\t\t} else if (!rhtml.test(elem)) {\n\t\t\t\t\tnodes.push(context.createTextNode(elem));\n\n\t\t\t\t\t// Convert html into DOM nodes\n\t\t\t\t} else {\n\t\t\t\t\ttmp = tmp || fragment.appendChild(context.createElement(\"div\"));\n\n\t\t\t\t\t// Deserialize a standard representation\n\t\t\t\t\ttag = (rtagName.exec(elem) || [\"\", \"\"])[1].toLowerCase();\n\t\t\t\t\twrap = wrapMap[tag] || wrapMap._default;\n\t\t\t\t\ttmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];\n\n\t\t\t\t\t// Descend through wrappers to the right content\n\t\t\t\t\tj = wrap[0];\n\t\t\t\t\twhile (j--) {\n\t\t\t\t\t\ttmp = tmp.lastChild;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\t\tjQuery.merge(nodes, tmp.childNodes);\n\n\t\t\t\t\t// Remember the top-level container\n\t\t\t\t\ttmp = fragment.firstChild;\n\n\t\t\t\t\t// Ensure the created nodes are orphaned (#12392)\n\t\t\t\t\ttmp.textContent = \"\";\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Remove wrapper from fragment\n\t\tfragment.textContent = \"\";\n\n\t\ti = 0;\n\t\twhile (elem = nodes[i++]) {\n\n\t\t\t// Skip elements already in the context collection (trac-4087)\n\t\t\tif (selection && jQuery.inArray(elem, selection) > -1) {\n\t\t\t\tif (ignored) {\n\t\t\t\t\tignored.push(elem);\n\t\t\t\t}\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tcontains = jQuery.contains(elem.ownerDocument, elem);\n\n\t\t\t// Append to fragment\n\t\t\ttmp = getAll(fragment.appendChild(elem), \"script\");\n\n\t\t\t// Preserve script evaluation history\n\t\t\tif (contains) {\n\t\t\t\tsetGlobalEval(tmp);\n\t\t\t}\n\n\t\t\t// Capture executables\n\t\t\tif (scripts) {\n\t\t\t\tj = 0;\n\t\t\t\twhile (elem = tmp[j++]) {\n\t\t\t\t\tif (rscriptType.test(elem.type || \"\")) {\n\t\t\t\t\t\tscripts.push(elem);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn fragment;\n\t}\n\n\t(function () {\n\t\tvar fragment = document.createDocumentFragment(),\n\t\t    div = fragment.appendChild(document.createElement(\"div\")),\n\t\t    input = document.createElement(\"input\");\n\n\t\t// Support: Android 4.0 - 4.3 only\n\t\t// Check state lost if the name is set (#11217)\n\t\t// Support: Windows Web Apps (WWA)\n\t\t// `name` and `type` must use .setAttribute for WWA (#14901)\n\t\tinput.setAttribute(\"type\", \"radio\");\n\t\tinput.setAttribute(\"checked\", \"checked\");\n\t\tinput.setAttribute(\"name\", \"t\");\n\n\t\tdiv.appendChild(input);\n\n\t\t// Support: Android <=4.1 only\n\t\t// Older WebKit doesn't clone checked state correctly in fragments\n\t\tsupport.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;\n\n\t\t// Support: IE <=11 only\n\t\t// Make sure textarea (and checkbox) defaultValue is properly cloned\n\t\tdiv.innerHTML = \"<textarea>x</textarea>\";\n\t\tsupport.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;\n\t})();\n\tvar documentElement = document.documentElement;\n\n\tvar rkeyEvent = /^key/,\n\t    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,\n\t    rtypenamespace = /^([^.]*)(?:\\.(.+)|)/;\n\n\tfunction returnTrue() {\n\t\treturn true;\n\t}\n\n\tfunction returnFalse() {\n\t\treturn false;\n\t}\n\n\t// Support: IE <=9 only\n\t// See #13393 for more info\n\tfunction safeActiveElement() {\n\t\ttry {\n\t\t\treturn document.activeElement;\n\t\t} catch (err) {}\n\t}\n\n\tfunction _on(elem, types, selector, data, fn, one) {\n\t\tvar origFn, type;\n\n\t\t// Types can be a map of types/handlers\n\t\tif ((typeof types === \"undefined\" ? \"undefined\" : _typeof(types)) === \"object\") {\n\n\t\t\t// ( types-Object, selector, data )\n\t\t\tif (typeof selector !== \"string\") {\n\n\t\t\t\t// ( types-Object, data )\n\t\t\t\tdata = data || selector;\n\t\t\t\tselector = undefined;\n\t\t\t}\n\t\t\tfor (type in types) {\n\t\t\t\t_on(elem, type, selector, data, types[type], one);\n\t\t\t}\n\t\t\treturn elem;\n\t\t}\n\n\t\tif (data == null && fn == null) {\n\n\t\t\t// ( types, fn )\n\t\t\tfn = selector;\n\t\t\tdata = selector = undefined;\n\t\t} else if (fn == null) {\n\t\t\tif (typeof selector === \"string\") {\n\n\t\t\t\t// ( types, selector, fn )\n\t\t\t\tfn = data;\n\t\t\t\tdata = undefined;\n\t\t\t} else {\n\n\t\t\t\t// ( types, data, fn )\n\t\t\t\tfn = data;\n\t\t\t\tdata = selector;\n\t\t\t\tselector = undefined;\n\t\t\t}\n\t\t}\n\t\tif (fn === false) {\n\t\t\tfn = returnFalse;\n\t\t} else if (!fn) {\n\t\t\treturn elem;\n\t\t}\n\n\t\tif (one === 1) {\n\t\t\torigFn = fn;\n\t\t\tfn = function fn(event) {\n\n\t\t\t\t// Can use an empty set, since event contains the info\n\t\t\t\tjQuery().off(event);\n\t\t\t\treturn origFn.apply(this, arguments);\n\t\t\t};\n\n\t\t\t// Use same guid so caller can remove using origFn\n\t\t\tfn.guid = origFn.guid || (origFn.guid = jQuery.guid++);\n\t\t}\n\t\treturn elem.each(function () {\n\t\t\tjQuery.event.add(this, types, fn, data, selector);\n\t\t});\n\t}\n\n\t/*\n  * Helper functions for managing events -- not part of the public interface.\n  * Props to Dean Edwards' addEvent library for many of the ideas.\n  */\n\tjQuery.event = {\n\n\t\tglobal: {},\n\n\t\tadd: function add(elem, types, handler, data, selector) {\n\n\t\t\tvar handleObjIn,\n\t\t\t    eventHandle,\n\t\t\t    tmp,\n\t\t\t    events,\n\t\t\t    t,\n\t\t\t    handleObj,\n\t\t\t    special,\n\t\t\t    handlers,\n\t\t\t    type,\n\t\t\t    namespaces,\n\t\t\t    origType,\n\t\t\t    elemData = dataPriv.get(elem);\n\n\t\t\t// Don't attach events to noData or text/comment nodes (but allow plain objects)\n\t\t\tif (!elemData) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Caller can pass in an object of custom data in lieu of the handler\n\t\t\tif (handler.handler) {\n\t\t\t\thandleObjIn = handler;\n\t\t\t\thandler = handleObjIn.handler;\n\t\t\t\tselector = handleObjIn.selector;\n\t\t\t}\n\n\t\t\t// Ensure that invalid selectors throw exceptions at attach time\n\t\t\t// Evaluate against documentElement in case elem is a non-element node (e.g., document)\n\t\t\tif (selector) {\n\t\t\t\tjQuery.find.matchesSelector(documentElement, selector);\n\t\t\t}\n\n\t\t\t// Make sure that the handler has a unique ID, used to find/remove it later\n\t\t\tif (!handler.guid) {\n\t\t\t\thandler.guid = jQuery.guid++;\n\t\t\t}\n\n\t\t\t// Init the element's event structure and main handler, if this is the first\n\t\t\tif (!(events = elemData.events)) {\n\t\t\t\tevents = elemData.events = {};\n\t\t\t}\n\t\t\tif (!(eventHandle = elemData.handle)) {\n\t\t\t\teventHandle = elemData.handle = function (e) {\n\n\t\t\t\t\t// Discard the second event of a jQuery.event.trigger() and\n\t\t\t\t\t// when an event is called after a page has unloaded\n\t\t\t\t\treturn typeof jQuery !== \"undefined\" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;\n\t\t\t\t};\n\t\t\t}\n\n\t\t\t// Handle multiple events separated by a space\n\t\t\ttypes = (types || \"\").match(rnothtmlwhite) || [\"\"];\n\t\t\tt = types.length;\n\t\t\twhile (t--) {\n\t\t\t\ttmp = rtypenamespace.exec(types[t]) || [];\n\t\t\t\ttype = origType = tmp[1];\n\t\t\t\tnamespaces = (tmp[2] || \"\").split(\".\").sort();\n\n\t\t\t\t// There *must* be a type, no attaching namespace-only handlers\n\t\t\t\tif (!type) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t// If event changes its type, use the special event handlers for the changed type\n\t\t\t\tspecial = jQuery.event.special[type] || {};\n\n\t\t\t\t// If selector defined, determine special event api type, otherwise given type\n\t\t\t\ttype = (selector ? special.delegateType : special.bindType) || type;\n\n\t\t\t\t// Update special based on newly reset type\n\t\t\t\tspecial = jQuery.event.special[type] || {};\n\n\t\t\t\t// handleObj is passed to all event handlers\n\t\t\t\thandleObj = jQuery.extend({\n\t\t\t\t\ttype: type,\n\t\t\t\t\torigType: origType,\n\t\t\t\t\tdata: data,\n\t\t\t\t\thandler: handler,\n\t\t\t\t\tguid: handler.guid,\n\t\t\t\t\tselector: selector,\n\t\t\t\t\tneedsContext: selector && jQuery.expr.match.needsContext.test(selector),\n\t\t\t\t\tnamespace: namespaces.join(\".\")\n\t\t\t\t}, handleObjIn);\n\n\t\t\t\t// Init the event handler queue if we're the first\n\t\t\t\tif (!(handlers = events[type])) {\n\t\t\t\t\thandlers = events[type] = [];\n\t\t\t\t\thandlers.delegateCount = 0;\n\n\t\t\t\t\t// Only use addEventListener if the special events handler returns false\n\t\t\t\t\tif (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {\n\n\t\t\t\t\t\tif (elem.addEventListener) {\n\t\t\t\t\t\t\telem.addEventListener(type, eventHandle);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (special.add) {\n\t\t\t\t\tspecial.add.call(elem, handleObj);\n\n\t\t\t\t\tif (!handleObj.handler.guid) {\n\t\t\t\t\t\thandleObj.handler.guid = handler.guid;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Add to the element's handler list, delegates in front\n\t\t\t\tif (selector) {\n\t\t\t\t\thandlers.splice(handlers.delegateCount++, 0, handleObj);\n\t\t\t\t} else {\n\t\t\t\t\thandlers.push(handleObj);\n\t\t\t\t}\n\n\t\t\t\t// Keep track of which events have ever been used, for event optimization\n\t\t\t\tjQuery.event.global[type] = true;\n\t\t\t}\n\t\t},\n\n\t\t// Detach an event or set of events from an element\n\t\tremove: function remove(elem, types, handler, selector, mappedTypes) {\n\n\t\t\tvar j,\n\t\t\t    origCount,\n\t\t\t    tmp,\n\t\t\t    events,\n\t\t\t    t,\n\t\t\t    handleObj,\n\t\t\t    special,\n\t\t\t    handlers,\n\t\t\t    type,\n\t\t\t    namespaces,\n\t\t\t    origType,\n\t\t\t    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);\n\n\t\t\tif (!elemData || !(events = elemData.events)) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Once for each type.namespace in types; type may be omitted\n\t\t\ttypes = (types || \"\").match(rnothtmlwhite) || [\"\"];\n\t\t\tt = types.length;\n\t\t\twhile (t--) {\n\t\t\t\ttmp = rtypenamespace.exec(types[t]) || [];\n\t\t\t\ttype = origType = tmp[1];\n\t\t\t\tnamespaces = (tmp[2] || \"\").split(\".\").sort();\n\n\t\t\t\t// Unbind all events (on this namespace, if provided) for the element\n\t\t\t\tif (!type) {\n\t\t\t\t\tfor (type in events) {\n\t\t\t\t\t\tjQuery.event.remove(elem, type + types[t], handler, selector, true);\n\t\t\t\t\t}\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\tspecial = jQuery.event.special[type] || {};\n\t\t\t\ttype = (selector ? special.delegateType : special.bindType) || type;\n\t\t\t\thandlers = events[type] || [];\n\t\t\t\ttmp = tmp[2] && new RegExp(\"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\");\n\n\t\t\t\t// Remove matching events\n\t\t\t\torigCount = j = handlers.length;\n\t\t\t\twhile (j--) {\n\t\t\t\t\thandleObj = handlers[j];\n\n\t\t\t\t\tif ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === \"**\" && handleObj.selector)) {\n\t\t\t\t\t\thandlers.splice(j, 1);\n\n\t\t\t\t\t\tif (handleObj.selector) {\n\t\t\t\t\t\t\thandlers.delegateCount--;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (special.remove) {\n\t\t\t\t\t\t\tspecial.remove.call(elem, handleObj);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Remove generic event handler if we removed something and no more handlers exist\n\t\t\t\t// (avoids potential for endless recursion during removal of special event handlers)\n\t\t\t\tif (origCount && !handlers.length) {\n\t\t\t\t\tif (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {\n\n\t\t\t\t\t\tjQuery.removeEvent(elem, type, elemData.handle);\n\t\t\t\t\t}\n\n\t\t\t\t\tdelete events[type];\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Remove data and the expando if it's no longer used\n\t\t\tif (jQuery.isEmptyObject(events)) {\n\t\t\t\tdataPriv.remove(elem, \"handle events\");\n\t\t\t}\n\t\t},\n\n\t\tdispatch: function dispatch(nativeEvent) {\n\n\t\t\t// Make a writable jQuery.Event from the native event object\n\t\t\tvar event = jQuery.event.fix(nativeEvent);\n\n\t\t\tvar i,\n\t\t\t    j,\n\t\t\t    ret,\n\t\t\t    matched,\n\t\t\t    handleObj,\n\t\t\t    handlerQueue,\n\t\t\t    args = new Array(arguments.length),\n\t\t\t    handlers = (dataPriv.get(this, \"events\") || {})[event.type] || [],\n\t\t\t    special = jQuery.event.special[event.type] || {};\n\n\t\t\t// Use the fix-ed jQuery.Event rather than the (read-only) native event\n\t\t\targs[0] = event;\n\n\t\t\tfor (i = 1; i < arguments.length; i++) {\n\t\t\t\targs[i] = arguments[i];\n\t\t\t}\n\n\t\t\tevent.delegateTarget = this;\n\n\t\t\t// Call the preDispatch hook for the mapped type, and let it bail if desired\n\t\t\tif (special.preDispatch && special.preDispatch.call(this, event) === false) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Determine handlers\n\t\t\thandlerQueue = jQuery.event.handlers.call(this, event, handlers);\n\n\t\t\t// Run delegates first; they may want to stop propagation beneath us\n\t\t\ti = 0;\n\t\t\twhile ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {\n\t\t\t\tevent.currentTarget = matched.elem;\n\n\t\t\t\tj = 0;\n\t\t\t\twhile ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {\n\n\t\t\t\t\t// Triggered event must either 1) have no namespace, or 2) have namespace(s)\n\t\t\t\t\t// a subset or equal to those in the bound event (both can have no namespace).\n\t\t\t\t\tif (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {\n\n\t\t\t\t\t\tevent.handleObj = handleObj;\n\t\t\t\t\t\tevent.data = handleObj.data;\n\n\t\t\t\t\t\tret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);\n\n\t\t\t\t\t\tif (ret !== undefined) {\n\t\t\t\t\t\t\tif ((event.result = ret) === false) {\n\t\t\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t\t\t\tevent.stopPropagation();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Call the postDispatch hook for the mapped type\n\t\t\tif (special.postDispatch) {\n\t\t\t\tspecial.postDispatch.call(this, event);\n\t\t\t}\n\n\t\t\treturn event.result;\n\t\t},\n\n\t\thandlers: function handlers(event, _handlers) {\n\t\t\tvar i,\n\t\t\t    handleObj,\n\t\t\t    sel,\n\t\t\t    matchedHandlers,\n\t\t\t    matchedSelectors,\n\t\t\t    handlerQueue = [],\n\t\t\t    delegateCount = _handlers.delegateCount,\n\t\t\t    cur = event.target;\n\n\t\t\t// Find delegate handlers\n\t\t\tif (delegateCount &&\n\n\t\t\t// Support: IE <=9\n\t\t\t// Black-hole SVG <use> instance trees (trac-13180)\n\t\t\tcur.nodeType &&\n\n\t\t\t// Support: Firefox <=42\n\t\t\t// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)\n\t\t\t// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click\n\t\t\t// Support: IE 11 only\n\t\t\t// ...but not arrow key \"clicks\" of radio inputs, which can have `button` -1 (gh-2343)\n\t\t\t!(event.type === \"click\" && event.button >= 1)) {\n\n\t\t\t\tfor (; cur !== this; cur = cur.parentNode || this) {\n\n\t\t\t\t\t// Don't check non-elements (#13208)\n\t\t\t\t\t// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)\n\t\t\t\t\tif (cur.nodeType === 1 && !(event.type === \"click\" && cur.disabled === true)) {\n\t\t\t\t\t\tmatchedHandlers = [];\n\t\t\t\t\t\tmatchedSelectors = {};\n\t\t\t\t\t\tfor (i = 0; i < delegateCount; i++) {\n\t\t\t\t\t\t\thandleObj = _handlers[i];\n\n\t\t\t\t\t\t\t// Don't conflict with Object.prototype properties (#13203)\n\t\t\t\t\t\t\tsel = handleObj.selector + \" \";\n\n\t\t\t\t\t\t\tif (matchedSelectors[sel] === undefined) {\n\t\t\t\t\t\t\t\tmatchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (matchedSelectors[sel]) {\n\t\t\t\t\t\t\t\tmatchedHandlers.push(handleObj);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (matchedHandlers.length) {\n\t\t\t\t\t\t\thandlerQueue.push({ elem: cur, handlers: matchedHandlers });\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Add the remaining (directly-bound) handlers\n\t\t\tcur = this;\n\t\t\tif (delegateCount < _handlers.length) {\n\t\t\t\thandlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });\n\t\t\t}\n\n\t\t\treturn handlerQueue;\n\t\t},\n\n\t\taddProp: function addProp(name, hook) {\n\t\t\tObject.defineProperty(jQuery.Event.prototype, name, {\n\t\t\t\tenumerable: true,\n\t\t\t\tconfigurable: true,\n\n\t\t\t\tget: jQuery.isFunction(hook) ? function () {\n\t\t\t\t\tif (this.originalEvent) {\n\t\t\t\t\t\treturn hook(this.originalEvent);\n\t\t\t\t\t}\n\t\t\t\t} : function () {\n\t\t\t\t\tif (this.originalEvent) {\n\t\t\t\t\t\treturn this.originalEvent[name];\n\t\t\t\t\t}\n\t\t\t\t},\n\n\t\t\t\tset: function set(value) {\n\t\t\t\t\tObject.defineProperty(this, name, {\n\t\t\t\t\t\tenumerable: true,\n\t\t\t\t\t\tconfigurable: true,\n\t\t\t\t\t\twritable: true,\n\t\t\t\t\t\tvalue: value\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tfix: function fix(originalEvent) {\n\t\t\treturn originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);\n\t\t},\n\n\t\tspecial: {\n\t\t\tload: {\n\n\t\t\t\t// Prevent triggered image.load events from bubbling to window.load\n\t\t\t\tnoBubble: true\n\t\t\t},\n\t\t\tfocus: {\n\n\t\t\t\t// Fire native event if possible so blur/focus sequence is correct\n\t\t\t\ttrigger: function trigger() {\n\t\t\t\t\tif (this !== safeActiveElement() && this.focus) {\n\t\t\t\t\t\tthis.focus();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tdelegateType: \"focusin\"\n\t\t\t},\n\t\t\tblur: {\n\t\t\t\ttrigger: function trigger() {\n\t\t\t\t\tif (this === safeActiveElement() && this.blur) {\n\t\t\t\t\t\tthis.blur();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tdelegateType: \"focusout\"\n\t\t\t},\n\t\t\tclick: {\n\n\t\t\t\t// For checkbox, fire native event so checked state will be right\n\t\t\t\ttrigger: function trigger() {\n\t\t\t\t\tif (this.type === \"checkbox\" && this.click && jQuery.nodeName(this, \"input\")) {\n\t\t\t\t\t\tthis.click();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t},\n\n\t\t\t\t// For cross-browser consistency, don't fire native .click() on links\n\t\t\t\t_default: function _default(event) {\n\t\t\t\t\treturn jQuery.nodeName(event.target, \"a\");\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tbeforeunload: {\n\t\t\t\tpostDispatch: function postDispatch(event) {\n\n\t\t\t\t\t// Support: Firefox 20+\n\t\t\t\t\t// Firefox doesn't alert if the returnValue field is not set.\n\t\t\t\t\tif (event.result !== undefined && event.originalEvent) {\n\t\t\t\t\t\tevent.originalEvent.returnValue = event.result;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\tjQuery.removeEvent = function (elem, type, handle) {\n\n\t\t// This \"if\" is needed for plain objects\n\t\tif (elem.removeEventListener) {\n\t\t\telem.removeEventListener(type, handle);\n\t\t}\n\t};\n\n\tjQuery.Event = function (src, props) {\n\n\t\t// Allow instantiation without the 'new' keyword\n\t\tif (!(this instanceof jQuery.Event)) {\n\t\t\treturn new jQuery.Event(src, props);\n\t\t}\n\n\t\t// Event object\n\t\tif (src && src.type) {\n\t\t\tthis.originalEvent = src;\n\t\t\tthis.type = src.type;\n\n\t\t\t// Events bubbling up the document may have been marked as prevented\n\t\t\t// by a handler lower down the tree; reflect the correct value.\n\t\t\tthis.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&\n\n\t\t\t// Support: Android <=2.3 only\n\t\t\tsrc.returnValue === false ? returnTrue : returnFalse;\n\n\t\t\t// Create target properties\n\t\t\t// Support: Safari <=6 - 7 only\n\t\t\t// Target should not be a text node (#504, #13143)\n\t\t\tthis.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;\n\n\t\t\tthis.currentTarget = src.currentTarget;\n\t\t\tthis.relatedTarget = src.relatedTarget;\n\n\t\t\t// Event type\n\t\t} else {\n\t\t\tthis.type = src;\n\t\t}\n\n\t\t// Put explicitly provided properties onto the event object\n\t\tif (props) {\n\t\t\tjQuery.extend(this, props);\n\t\t}\n\n\t\t// Create a timestamp if incoming event doesn't have one\n\t\tthis.timeStamp = src && src.timeStamp || jQuery.now();\n\n\t\t// Mark it as fixed\n\t\tthis[jQuery.expando] = true;\n\t};\n\n\t// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n\t// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\n\tjQuery.Event.prototype = {\n\t\tconstructor: jQuery.Event,\n\t\tisDefaultPrevented: returnFalse,\n\t\tisPropagationStopped: returnFalse,\n\t\tisImmediatePropagationStopped: returnFalse,\n\t\tisSimulated: false,\n\n\t\tpreventDefault: function preventDefault() {\n\t\t\tvar e = this.originalEvent;\n\n\t\t\tthis.isDefaultPrevented = returnTrue;\n\n\t\t\tif (e && !this.isSimulated) {\n\t\t\t\te.preventDefault();\n\t\t\t}\n\t\t},\n\t\tstopPropagation: function stopPropagation() {\n\t\t\tvar e = this.originalEvent;\n\n\t\t\tthis.isPropagationStopped = returnTrue;\n\n\t\t\tif (e && !this.isSimulated) {\n\t\t\t\te.stopPropagation();\n\t\t\t}\n\t\t},\n\t\tstopImmediatePropagation: function stopImmediatePropagation() {\n\t\t\tvar e = this.originalEvent;\n\n\t\t\tthis.isImmediatePropagationStopped = returnTrue;\n\n\t\t\tif (e && !this.isSimulated) {\n\t\t\t\te.stopImmediatePropagation();\n\t\t\t}\n\n\t\t\tthis.stopPropagation();\n\t\t}\n\t};\n\n\t// Includes all common event props including KeyEvent and MouseEvent specific props\n\tjQuery.each({\n\t\taltKey: true,\n\t\tbubbles: true,\n\t\tcancelable: true,\n\t\tchangedTouches: true,\n\t\tctrlKey: true,\n\t\tdetail: true,\n\t\teventPhase: true,\n\t\tmetaKey: true,\n\t\tpageX: true,\n\t\tpageY: true,\n\t\tshiftKey: true,\n\t\tview: true,\n\t\t\"char\": true,\n\t\tcharCode: true,\n\t\tkey: true,\n\t\tkeyCode: true,\n\t\tbutton: true,\n\t\tbuttons: true,\n\t\tclientX: true,\n\t\tclientY: true,\n\t\toffsetX: true,\n\t\toffsetY: true,\n\t\tpointerId: true,\n\t\tpointerType: true,\n\t\tscreenX: true,\n\t\tscreenY: true,\n\t\ttargetTouches: true,\n\t\ttoElement: true,\n\t\ttouches: true,\n\n\t\twhich: function which(event) {\n\t\t\tvar button = event.button;\n\n\t\t\t// Add which for key events\n\t\t\tif (event.which == null && rkeyEvent.test(event.type)) {\n\t\t\t\treturn event.charCode != null ? event.charCode : event.keyCode;\n\t\t\t}\n\n\t\t\t// Add which for click: 1 === left; 2 === middle; 3 === right\n\t\t\tif (!event.which && button !== undefined && rmouseEvent.test(event.type)) {\n\t\t\t\tif (button & 1) {\n\t\t\t\t\treturn 1;\n\t\t\t\t}\n\n\t\t\t\tif (button & 2) {\n\t\t\t\t\treturn 3;\n\t\t\t\t}\n\n\t\t\t\tif (button & 4) {\n\t\t\t\t\treturn 2;\n\t\t\t\t}\n\n\t\t\t\treturn 0;\n\t\t\t}\n\n\t\t\treturn event.which;\n\t\t}\n\t}, jQuery.event.addProp);\n\n\t// Create mouseenter/leave events using mouseover/out and event-time checks\n\t// so that event delegation works in jQuery.\n\t// Do the same for pointerenter/pointerleave and pointerover/pointerout\n\t//\n\t// Support: Safari 7 only\n\t// Safari sends mouseenter too often; see:\n\t// https://bugs.chromium.org/p/chromium/issues/detail?id=470258\n\t// for the description of the bug (it existed in older Chrome versions as well).\n\tjQuery.each({\n\t\tmouseenter: \"mouseover\",\n\t\tmouseleave: \"mouseout\",\n\t\tpointerenter: \"pointerover\",\n\t\tpointerleave: \"pointerout\"\n\t}, function (orig, fix) {\n\t\tjQuery.event.special[orig] = {\n\t\t\tdelegateType: fix,\n\t\t\tbindType: fix,\n\n\t\t\thandle: function handle(event) {\n\t\t\t\tvar ret,\n\t\t\t\t    target = this,\n\t\t\t\t    related = event.relatedTarget,\n\t\t\t\t    handleObj = event.handleObj;\n\n\t\t\t\t// For mouseenter/leave call the handler if related is outside the target.\n\t\t\t\t// NB: No relatedTarget if the mouse left/entered the browser window\n\t\t\t\tif (!related || related !== target && !jQuery.contains(target, related)) {\n\t\t\t\t\tevent.type = handleObj.origType;\n\t\t\t\t\tret = handleObj.handler.apply(this, arguments);\n\t\t\t\t\tevent.type = fix;\n\t\t\t\t}\n\t\t\t\treturn ret;\n\t\t\t}\n\t\t};\n\t});\n\n\tjQuery.fn.extend({\n\n\t\ton: function on(types, selector, data, fn) {\n\t\t\treturn _on(this, types, selector, data, fn);\n\t\t},\n\t\tone: function one(types, selector, data, fn) {\n\t\t\treturn _on(this, types, selector, data, fn, 1);\n\t\t},\n\t\toff: function off(types, selector, fn) {\n\t\t\tvar handleObj, type;\n\t\t\tif (types && types.preventDefault && types.handleObj) {\n\n\t\t\t\t// ( event )  dispatched jQuery.Event\n\t\t\t\thandleObj = types.handleObj;\n\t\t\t\tjQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + \".\" + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);\n\t\t\t\treturn this;\n\t\t\t}\n\t\t\tif ((typeof types === \"undefined\" ? \"undefined\" : _typeof(types)) === \"object\") {\n\n\t\t\t\t// ( types-object [, selector] )\n\t\t\t\tfor (type in types) {\n\t\t\t\t\tthis.off(type, selector, types[type]);\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t}\n\t\t\tif (selector === false || typeof selector === \"function\") {\n\n\t\t\t\t// ( types [, fn] )\n\t\t\t\tfn = selector;\n\t\t\t\tselector = undefined;\n\t\t\t}\n\t\t\tif (fn === false) {\n\t\t\t\tfn = returnFalse;\n\t\t\t}\n\t\t\treturn this.each(function () {\n\t\t\t\tjQuery.event.remove(this, types, fn, selector);\n\t\t\t});\n\t\t}\n\t});\n\n\tvar\n\n\t/* eslint-disable max-len */\n\n\t// See https://github.com/eslint/eslint/issues/3229\n\trxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]*)[^>]*)\\/>/gi,\n\n\n\t/* eslint-enable */\n\n\t// Support: IE <=10 - 11, Edge 12 - 13\n\t// In IE/Edge using regex groups here causes severe slowdowns.\n\t// See https://connect.microsoft.com/IE/feedback/details/1736512/\n\trnoInnerhtml = /<script|<style|<link/i,\n\n\n\t// checked=\"checked\" or checked\n\trchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n\t    rscriptTypeMasked = /^true\\/(.*)/,\n\t    rcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g;\n\n\tfunction manipulationTarget(elem, content) {\n\t\tif (jQuery.nodeName(elem, \"table\") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, \"tr\")) {\n\n\t\t\treturn elem.getElementsByTagName(\"tbody\")[0] || elem;\n\t\t}\n\n\t\treturn elem;\n\t}\n\n\t// Replace/restore the type attribute of script elements for safe DOM manipulation\n\tfunction disableScript(elem) {\n\t\telem.type = (elem.getAttribute(\"type\") !== null) + \"/\" + elem.type;\n\t\treturn elem;\n\t}\n\tfunction restoreScript(elem) {\n\t\tvar match = rscriptTypeMasked.exec(elem.type);\n\n\t\tif (match) {\n\t\t\telem.type = match[1];\n\t\t} else {\n\t\t\telem.removeAttribute(\"type\");\n\t\t}\n\n\t\treturn elem;\n\t}\n\n\tfunction cloneCopyEvent(src, dest) {\n\t\tvar i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;\n\n\t\tif (dest.nodeType !== 1) {\n\t\t\treturn;\n\t\t}\n\n\t\t// 1. Copy private data: events, handlers, etc.\n\t\tif (dataPriv.hasData(src)) {\n\t\t\tpdataOld = dataPriv.access(src);\n\t\t\tpdataCur = dataPriv.set(dest, pdataOld);\n\t\t\tevents = pdataOld.events;\n\n\t\t\tif (events) {\n\t\t\t\tdelete pdataCur.handle;\n\t\t\t\tpdataCur.events = {};\n\n\t\t\t\tfor (type in events) {\n\t\t\t\t\tfor (i = 0, l = events[type].length; i < l; i++) {\n\t\t\t\t\t\tjQuery.event.add(dest, type, events[type][i]);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// 2. Copy user data\n\t\tif (dataUser.hasData(src)) {\n\t\t\tudataOld = dataUser.access(src);\n\t\t\tudataCur = jQuery.extend({}, udataOld);\n\n\t\t\tdataUser.set(dest, udataCur);\n\t\t}\n\t}\n\n\t// Fix IE bugs, see support tests\n\tfunction fixInput(src, dest) {\n\t\tvar nodeName = dest.nodeName.toLowerCase();\n\n\t\t// Fails to persist the checked state of a cloned checkbox or radio button.\n\t\tif (nodeName === \"input\" && rcheckableType.test(src.type)) {\n\t\t\tdest.checked = src.checked;\n\n\t\t\t// Fails to return the selected option to the default selected state when cloning options\n\t\t} else if (nodeName === \"input\" || nodeName === \"textarea\") {\n\t\t\tdest.defaultValue = src.defaultValue;\n\t\t}\n\t}\n\n\tfunction domManip(collection, args, callback, ignored) {\n\n\t\t// Flatten any nested arrays\n\t\targs = concat.apply([], args);\n\n\t\tvar fragment,\n\t\t    first,\n\t\t    scripts,\n\t\t    hasScripts,\n\t\t    node,\n\t\t    doc,\n\t\t    i = 0,\n\t\t    l = collection.length,\n\t\t    iNoClone = l - 1,\n\t\t    value = args[0],\n\t\t    isFunction = jQuery.isFunction(value);\n\n\t\t// We can't cloneNode fragments that contain checked, in WebKit\n\t\tif (isFunction || l > 1 && typeof value === \"string\" && !support.checkClone && rchecked.test(value)) {\n\t\t\treturn collection.each(function (index) {\n\t\t\t\tvar self = collection.eq(index);\n\t\t\t\tif (isFunction) {\n\t\t\t\t\targs[0] = value.call(this, index, self.html());\n\t\t\t\t}\n\t\t\t\tdomManip(self, args, callback, ignored);\n\t\t\t});\n\t\t}\n\n\t\tif (l) {\n\t\t\tfragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);\n\t\t\tfirst = fragment.firstChild;\n\n\t\t\tif (fragment.childNodes.length === 1) {\n\t\t\t\tfragment = first;\n\t\t\t}\n\n\t\t\t// Require either new content or an interest in ignored elements to invoke the callback\n\t\t\tif (first || ignored) {\n\t\t\t\tscripts = jQuery.map(getAll(fragment, \"script\"), disableScript);\n\t\t\t\thasScripts = scripts.length;\n\n\t\t\t\t// Use the original fragment for the last item\n\t\t\t\t// instead of the first because it can end up\n\t\t\t\t// being emptied incorrectly in certain situations (#8070).\n\t\t\t\tfor (; i < l; i++) {\n\t\t\t\t\tnode = fragment;\n\n\t\t\t\t\tif (i !== iNoClone) {\n\t\t\t\t\t\tnode = jQuery.clone(node, true, true);\n\n\t\t\t\t\t\t// Keep references to cloned scripts for later restoration\n\t\t\t\t\t\tif (hasScripts) {\n\n\t\t\t\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\t\t\t\tjQuery.merge(scripts, getAll(node, \"script\"));\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tcallback.call(collection[i], node, i);\n\t\t\t\t}\n\n\t\t\t\tif (hasScripts) {\n\t\t\t\t\tdoc = scripts[scripts.length - 1].ownerDocument;\n\n\t\t\t\t\t// Reenable scripts\n\t\t\t\t\tjQuery.map(scripts, restoreScript);\n\n\t\t\t\t\t// Evaluate executable scripts on first document insertion\n\t\t\t\t\tfor (i = 0; i < hasScripts; i++) {\n\t\t\t\t\t\tnode = scripts[i];\n\t\t\t\t\t\tif (rscriptType.test(node.type || \"\") && !dataPriv.access(node, \"globalEval\") && jQuery.contains(doc, node)) {\n\n\t\t\t\t\t\t\tif (node.src) {\n\n\t\t\t\t\t\t\t\t// Optional AJAX dependency, but won't run scripts if not present\n\t\t\t\t\t\t\t\tif (jQuery._evalUrl) {\n\t\t\t\t\t\t\t\t\tjQuery._evalUrl(node.src);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tDOMEval(node.textContent.replace(rcleanScript, \"\"), doc);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn collection;\n\t}\n\n\tfunction _remove(elem, selector, keepData) {\n\t\tvar node,\n\t\t    nodes = selector ? jQuery.filter(selector, elem) : elem,\n\t\t    i = 0;\n\n\t\tfor (; (node = nodes[i]) != null; i++) {\n\t\t\tif (!keepData && node.nodeType === 1) {\n\t\t\t\tjQuery.cleanData(getAll(node));\n\t\t\t}\n\n\t\t\tif (node.parentNode) {\n\t\t\t\tif (keepData && jQuery.contains(node.ownerDocument, node)) {\n\t\t\t\t\tsetGlobalEval(getAll(node, \"script\"));\n\t\t\t\t}\n\t\t\t\tnode.parentNode.removeChild(node);\n\t\t\t}\n\t\t}\n\n\t\treturn elem;\n\t}\n\n\tjQuery.extend({\n\t\thtmlPrefilter: function htmlPrefilter(html) {\n\t\t\treturn html.replace(rxhtmlTag, \"<$1></$2>\");\n\t\t},\n\n\t\tclone: function clone(elem, dataAndEvents, deepDataAndEvents) {\n\t\t\tvar i,\n\t\t\t    l,\n\t\t\t    srcElements,\n\t\t\t    destElements,\n\t\t\t    clone = elem.cloneNode(true),\n\t\t\t    inPage = jQuery.contains(elem.ownerDocument, elem);\n\n\t\t\t// Fix IE cloning issues\n\t\t\tif (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {\n\n\t\t\t\t// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2\n\t\t\t\tdestElements = getAll(clone);\n\t\t\t\tsrcElements = getAll(elem);\n\n\t\t\t\tfor (i = 0, l = srcElements.length; i < l; i++) {\n\t\t\t\t\tfixInput(srcElements[i], destElements[i]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Copy the events from the original to the clone\n\t\t\tif (dataAndEvents) {\n\t\t\t\tif (deepDataAndEvents) {\n\t\t\t\t\tsrcElements = srcElements || getAll(elem);\n\t\t\t\t\tdestElements = destElements || getAll(clone);\n\n\t\t\t\t\tfor (i = 0, l = srcElements.length; i < l; i++) {\n\t\t\t\t\t\tcloneCopyEvent(srcElements[i], destElements[i]);\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tcloneCopyEvent(elem, clone);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Preserve script evaluation history\n\t\t\tdestElements = getAll(clone, \"script\");\n\t\t\tif (destElements.length > 0) {\n\t\t\t\tsetGlobalEval(destElements, !inPage && getAll(elem, \"script\"));\n\t\t\t}\n\n\t\t\t// Return the cloned set\n\t\t\treturn clone;\n\t\t},\n\n\t\tcleanData: function cleanData(elems) {\n\t\t\tvar data,\n\t\t\t    elem,\n\t\t\t    type,\n\t\t\t    special = jQuery.event.special,\n\t\t\t    i = 0;\n\n\t\t\tfor (; (elem = elems[i]) !== undefined; i++) {\n\t\t\t\tif (acceptData(elem)) {\n\t\t\t\t\tif (data = elem[dataPriv.expando]) {\n\t\t\t\t\t\tif (data.events) {\n\t\t\t\t\t\t\tfor (type in data.events) {\n\t\t\t\t\t\t\t\tif (special[type]) {\n\t\t\t\t\t\t\t\t\tjQuery.event.remove(elem, type);\n\n\t\t\t\t\t\t\t\t\t// This is a shortcut to avoid jQuery.event.remove's overhead\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tjQuery.removeEvent(elem, type, data.handle);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Support: Chrome <=35 - 45+\n\t\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\t\telem[dataPriv.expando] = undefined;\n\t\t\t\t\t}\n\t\t\t\t\tif (elem[dataUser.expando]) {\n\n\t\t\t\t\t\t// Support: Chrome <=35 - 45+\n\t\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\t\telem[dataUser.expando] = undefined;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t});\n\n\tjQuery.fn.extend({\n\t\tdetach: function detach(selector) {\n\t\t\treturn _remove(this, selector, true);\n\t\t},\n\n\t\tremove: function remove(selector) {\n\t\t\treturn _remove(this, selector);\n\t\t},\n\n\t\ttext: function text(value) {\n\t\t\treturn access(this, function (value) {\n\t\t\t\treturn value === undefined ? jQuery.text(this) : this.empty().each(function () {\n\t\t\t\t\tif (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {\n\t\t\t\t\t\tthis.textContent = value;\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}, null, value, arguments.length);\n\t\t},\n\n\t\tappend: function append() {\n\t\t\treturn domManip(this, arguments, function (elem) {\n\t\t\t\tif (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {\n\t\t\t\t\tvar target = manipulationTarget(this, elem);\n\t\t\t\t\ttarget.appendChild(elem);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tprepend: function prepend() {\n\t\t\treturn domManip(this, arguments, function (elem) {\n\t\t\t\tif (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {\n\t\t\t\t\tvar target = manipulationTarget(this, elem);\n\t\t\t\t\ttarget.insertBefore(elem, target.firstChild);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tbefore: function before() {\n\t\t\treturn domManip(this, arguments, function (elem) {\n\t\t\t\tif (this.parentNode) {\n\t\t\t\t\tthis.parentNode.insertBefore(elem, this);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tafter: function after() {\n\t\t\treturn domManip(this, arguments, function (elem) {\n\t\t\t\tif (this.parentNode) {\n\t\t\t\t\tthis.parentNode.insertBefore(elem, this.nextSibling);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tempty: function empty() {\n\t\t\tvar elem,\n\t\t\t    i = 0;\n\n\t\t\tfor (; (elem = this[i]) != null; i++) {\n\t\t\t\tif (elem.nodeType === 1) {\n\n\t\t\t\t\t// Prevent memory leaks\n\t\t\t\t\tjQuery.cleanData(getAll(elem, false));\n\n\t\t\t\t\t// Remove any remaining nodes\n\t\t\t\t\telem.textContent = \"\";\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this;\n\t\t},\n\n\t\tclone: function clone(dataAndEvents, deepDataAndEvents) {\n\t\t\tdataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n\t\t\tdeepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\n\t\t\treturn this.map(function () {\n\t\t\t\treturn jQuery.clone(this, dataAndEvents, deepDataAndEvents);\n\t\t\t});\n\t\t},\n\n\t\thtml: function html(value) {\n\t\t\treturn access(this, function (value) {\n\t\t\t\tvar elem = this[0] || {},\n\t\t\t\t    i = 0,\n\t\t\t\t    l = this.length;\n\n\t\t\t\tif (value === undefined && elem.nodeType === 1) {\n\t\t\t\t\treturn elem.innerHTML;\n\t\t\t\t}\n\n\t\t\t\t// See if we can take a shortcut and just use innerHTML\n\t\t\t\tif (typeof value === \"string\" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [\"\", \"\"])[1].toLowerCase()]) {\n\n\t\t\t\t\tvalue = jQuery.htmlPrefilter(value);\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tfor (; i < l; i++) {\n\t\t\t\t\t\t\telem = this[i] || {};\n\n\t\t\t\t\t\t\t// Remove element nodes and prevent memory leaks\n\t\t\t\t\t\t\tif (elem.nodeType === 1) {\n\t\t\t\t\t\t\t\tjQuery.cleanData(getAll(elem, false));\n\t\t\t\t\t\t\t\telem.innerHTML = value;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\telem = 0;\n\n\t\t\t\t\t\t// If using innerHTML throws an exception, use the fallback method\n\t\t\t\t\t} catch (e) {}\n\t\t\t\t}\n\n\t\t\t\tif (elem) {\n\t\t\t\t\tthis.empty().append(value);\n\t\t\t\t}\n\t\t\t}, null, value, arguments.length);\n\t\t},\n\n\t\treplaceWith: function replaceWith() {\n\t\t\tvar ignored = [];\n\n\t\t\t// Make the changes, replacing each non-ignored context element with the new content\n\t\t\treturn domManip(this, arguments, function (elem) {\n\t\t\t\tvar parent = this.parentNode;\n\n\t\t\t\tif (jQuery.inArray(this, ignored) < 0) {\n\t\t\t\t\tjQuery.cleanData(getAll(this));\n\t\t\t\t\tif (parent) {\n\t\t\t\t\t\tparent.replaceChild(elem, this);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Force callback invocation\n\t\t\t}, ignored);\n\t\t}\n\t});\n\n\tjQuery.each({\n\t\tappendTo: \"append\",\n\t\tprependTo: \"prepend\",\n\t\tinsertBefore: \"before\",\n\t\tinsertAfter: \"after\",\n\t\treplaceAll: \"replaceWith\"\n\t}, function (name, original) {\n\t\tjQuery.fn[name] = function (selector) {\n\t\t\tvar elems,\n\t\t\t    ret = [],\n\t\t\t    insert = jQuery(selector),\n\t\t\t    last = insert.length - 1,\n\t\t\t    i = 0;\n\n\t\t\tfor (; i <= last; i++) {\n\t\t\t\telems = i === last ? this : this.clone(true);\n\t\t\t\tjQuery(insert[i])[original](elems);\n\n\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t// .get() because push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\tpush.apply(ret, elems.get());\n\t\t\t}\n\n\t\t\treturn this.pushStack(ret);\n\t\t};\n\t});\n\tvar rmargin = /^margin/;\n\n\tvar rnumnonpx = new RegExp(\"^(\" + pnum + \")(?!px)[a-z%]+$\", \"i\");\n\n\tvar getStyles = function getStyles(elem) {\n\n\t\t// Support: IE <=11 only, Firefox <=30 (#15098, #14150)\n\t\t// IE throws on elements created in popups\n\t\t// FF meanwhile throws on frame elements through \"defaultView.getComputedStyle\"\n\t\tvar view = elem.ownerDocument.defaultView;\n\n\t\tif (!view || !view.opener) {\n\t\t\tview = window;\n\t\t}\n\n\t\treturn view.getComputedStyle(elem);\n\t};\n\n\t(function () {\n\n\t\t// Executing both pixelPosition & boxSizingReliable tests require only one layout\n\t\t// so they're executed at the same time to save the second computation.\n\t\tfunction computeStyleTests() {\n\n\t\t\t// This is a singleton, we need to execute it only once\n\t\t\tif (!div) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tdiv.style.cssText = \"box-sizing:border-box;\" + \"position:relative;display:block;\" + \"margin:auto;border:1px;padding:1px;\" + \"top:1%;width:50%\";\n\t\t\tdiv.innerHTML = \"\";\n\t\t\tdocumentElement.appendChild(container);\n\n\t\t\tvar divStyle = window.getComputedStyle(div);\n\t\t\tpixelPositionVal = divStyle.top !== \"1%\";\n\n\t\t\t// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44\n\t\t\treliableMarginLeftVal = divStyle.marginLeft === \"2px\";\n\t\t\tboxSizingReliableVal = divStyle.width === \"4px\";\n\n\t\t\t// Support: Android 4.0 - 4.3 only\n\t\t\t// Some styles come back with percentage values, even though they shouldn't\n\t\t\tdiv.style.marginRight = \"50%\";\n\t\t\tpixelMarginRightVal = divStyle.marginRight === \"4px\";\n\n\t\t\tdocumentElement.removeChild(container);\n\n\t\t\t// Nullify the div so it wouldn't be stored in the memory and\n\t\t\t// it will also be a sign that checks already performed\n\t\t\tdiv = null;\n\t\t}\n\n\t\tvar pixelPositionVal,\n\t\t    boxSizingReliableVal,\n\t\t    pixelMarginRightVal,\n\t\t    reliableMarginLeftVal,\n\t\t    container = document.createElement(\"div\"),\n\t\t    div = document.createElement(\"div\");\n\n\t\t// Finish early in limited (non-browser) environments\n\t\tif (!div.style) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Support: IE <=9 - 11 only\n\t\t// Style of cloned element affects source element cloned (#8908)\n\t\tdiv.style.backgroundClip = \"content-box\";\n\t\tdiv.cloneNode(true).style.backgroundClip = \"\";\n\t\tsupport.clearCloneStyle = div.style.backgroundClip === \"content-box\";\n\n\t\tcontainer.style.cssText = \"border:0;width:8px;height:0;top:0;left:-9999px;\" + \"padding:0;margin-top:1px;position:absolute\";\n\t\tcontainer.appendChild(div);\n\n\t\tjQuery.extend(support, {\n\t\t\tpixelPosition: function pixelPosition() {\n\t\t\t\tcomputeStyleTests();\n\t\t\t\treturn pixelPositionVal;\n\t\t\t},\n\t\t\tboxSizingReliable: function boxSizingReliable() {\n\t\t\t\tcomputeStyleTests();\n\t\t\t\treturn boxSizingReliableVal;\n\t\t\t},\n\t\t\tpixelMarginRight: function pixelMarginRight() {\n\t\t\t\tcomputeStyleTests();\n\t\t\t\treturn pixelMarginRightVal;\n\t\t\t},\n\t\t\treliableMarginLeft: function reliableMarginLeft() {\n\t\t\t\tcomputeStyleTests();\n\t\t\t\treturn reliableMarginLeftVal;\n\t\t\t}\n\t\t});\n\t})();\n\n\tfunction curCSS(elem, name, computed) {\n\t\tvar width,\n\t\t    minWidth,\n\t\t    maxWidth,\n\t\t    ret,\n\t\t    style = elem.style;\n\n\t\tcomputed = computed || getStyles(elem);\n\n\t\t// Support: IE <=9 only\n\t\t// getPropertyValue is only needed for .css('filter') (#12537)\n\t\tif (computed) {\n\t\t\tret = computed.getPropertyValue(name) || computed[name];\n\n\t\t\tif (ret === \"\" && !jQuery.contains(elem.ownerDocument, elem)) {\n\t\t\t\tret = jQuery.style(elem, name);\n\t\t\t}\n\n\t\t\t// A tribute to the \"awesome hack by Dean Edwards\"\n\t\t\t// Android Browser returns percentage for some values,\n\t\t\t// but width seems to be reliably pixels.\n\t\t\t// This is against the CSSOM draft spec:\n\t\t\t// https://drafts.csswg.org/cssom/#resolved-values\n\t\t\tif (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {\n\n\t\t\t\t// Remember the original values\n\t\t\t\twidth = style.width;\n\t\t\t\tminWidth = style.minWidth;\n\t\t\t\tmaxWidth = style.maxWidth;\n\n\t\t\t\t// Put in the new values to get a computed value out\n\t\t\t\tstyle.minWidth = style.maxWidth = style.width = ret;\n\t\t\t\tret = computed.width;\n\n\t\t\t\t// Revert the changed values\n\t\t\t\tstyle.width = width;\n\t\t\t\tstyle.minWidth = minWidth;\n\t\t\t\tstyle.maxWidth = maxWidth;\n\t\t\t}\n\t\t}\n\n\t\treturn ret !== undefined ?\n\n\t\t// Support: IE <=9 - 11 only\n\t\t// IE returns zIndex value as an integer.\n\t\tret + \"\" : ret;\n\t}\n\n\tfunction addGetHookIf(conditionFn, hookFn) {\n\n\t\t// Define the hook, we'll check on the first run if it's really needed.\n\t\treturn {\n\t\t\tget: function get() {\n\t\t\t\tif (conditionFn()) {\n\n\t\t\t\t\t// Hook not needed (or it's not possible to use it due\n\t\t\t\t\t// to missing dependency), remove it.\n\t\t\t\t\tdelete this.get;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t// Hook needed; redefine it so that the support test is not executed again.\n\t\t\t\treturn (this.get = hookFn).apply(this, arguments);\n\t\t\t}\n\t\t};\n\t}\n\n\tvar\n\n\t// Swappable if display is none or starts with table\n\t// except \"table\", \"table-cell\", or \"table-caption\"\n\t// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n\trdisplayswap = /^(none|table(?!-c[ea]).+)/,\n\t    cssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n\t    cssNormalTransform = {\n\t\tletterSpacing: \"0\",\n\t\tfontWeight: \"400\"\n\t},\n\t    cssPrefixes = [\"Webkit\", \"Moz\", \"ms\"],\n\t    emptyStyle = document.createElement(\"div\").style;\n\n\t// Return a css property mapped to a potentially vendor prefixed property\n\tfunction vendorPropName(name) {\n\n\t\t// Shortcut for names that are not vendor prefixed\n\t\tif (name in emptyStyle) {\n\t\t\treturn name;\n\t\t}\n\n\t\t// Check for vendor prefixed names\n\t\tvar capName = name[0].toUpperCase() + name.slice(1),\n\t\t    i = cssPrefixes.length;\n\n\t\twhile (i--) {\n\t\t\tname = cssPrefixes[i] + capName;\n\t\t\tif (name in emptyStyle) {\n\t\t\t\treturn name;\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction setPositiveNumber(elem, value, subtract) {\n\n\t\t// Any relative (+/-) values have already been\n\t\t// normalized at this point\n\t\tvar matches = rcssNum.exec(value);\n\t\treturn matches ?\n\n\t\t// Guard against undefined \"subtract\", e.g., when used as in cssHooks\n\t\tMath.max(0, matches[2] - (subtract || 0)) + (matches[3] || \"px\") : value;\n\t}\n\n\tfunction augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {\n\t\tvar i,\n\t\t    val = 0;\n\n\t\t// If we already have the right measurement, avoid augmentation\n\t\tif (extra === (isBorderBox ? \"border\" : \"content\")) {\n\t\t\ti = 4;\n\n\t\t\t// Otherwise initialize for horizontal or vertical properties\n\t\t} else {\n\t\t\ti = name === \"width\" ? 1 : 0;\n\t\t}\n\n\t\tfor (; i < 4; i += 2) {\n\n\t\t\t// Both box models exclude margin, so add it if we want it\n\t\t\tif (extra === \"margin\") {\n\t\t\t\tval += jQuery.css(elem, extra + cssExpand[i], true, styles);\n\t\t\t}\n\n\t\t\tif (isBorderBox) {\n\n\t\t\t\t// border-box includes padding, so remove it if we want content\n\t\t\t\tif (extra === \"content\") {\n\t\t\t\t\tval -= jQuery.css(elem, \"padding\" + cssExpand[i], true, styles);\n\t\t\t\t}\n\n\t\t\t\t// At this point, extra isn't border nor margin, so remove border\n\t\t\t\tif (extra !== \"margin\") {\n\t\t\t\t\tval -= jQuery.css(elem, \"border\" + cssExpand[i] + \"Width\", true, styles);\n\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\t// At this point, extra isn't content, so add padding\n\t\t\t\tval += jQuery.css(elem, \"padding\" + cssExpand[i], true, styles);\n\n\t\t\t\t// At this point, extra isn't content nor padding, so add border\n\t\t\t\tif (extra !== \"padding\") {\n\t\t\t\t\tval += jQuery.css(elem, \"border\" + cssExpand[i] + \"Width\", true, styles);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn val;\n\t}\n\n\tfunction getWidthOrHeight(elem, name, extra) {\n\n\t\t// Start with offset property, which is equivalent to the border-box value\n\t\tvar val,\n\t\t    valueIsBorderBox = true,\n\t\t    styles = getStyles(elem),\n\t\t    isBorderBox = jQuery.css(elem, \"boxSizing\", false, styles) === \"border-box\";\n\n\t\t// Support: IE <=11 only\n\t\t// Running getBoundingClientRect on a disconnected node\n\t\t// in IE throws an error.\n\t\tif (elem.getClientRects().length) {\n\t\t\tval = elem.getBoundingClientRect()[name];\n\t\t}\n\n\t\t// Some non-html elements return undefined for offsetWidth, so check for null/undefined\n\t\t// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285\n\t\t// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668\n\t\tif (val <= 0 || val == null) {\n\n\t\t\t// Fall back to computed then uncomputed css if necessary\n\t\t\tval = curCSS(elem, name, styles);\n\t\t\tif (val < 0 || val == null) {\n\t\t\t\tval = elem.style[name];\n\t\t\t}\n\n\t\t\t// Computed unit is not pixels. Stop here and return.\n\t\t\tif (rnumnonpx.test(val)) {\n\t\t\t\treturn val;\n\t\t\t}\n\n\t\t\t// Check for style in case a browser which returns unreliable values\n\t\t\t// for getComputedStyle silently falls back to the reliable elem.style\n\t\t\tvalueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);\n\n\t\t\t// Normalize \"\", auto, and prepare for extra\n\t\t\tval = parseFloat(val) || 0;\n\t\t}\n\n\t\t// Use the active box-sizing model to add/subtract irrelevant styles\n\t\treturn val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? \"border\" : \"content\"), valueIsBorderBox, styles) + \"px\";\n\t}\n\n\tjQuery.extend({\n\n\t\t// Add in style property hooks for overriding the default\n\t\t// behavior of getting and setting a style property\n\t\tcssHooks: {\n\t\t\topacity: {\n\t\t\t\tget: function get(elem, computed) {\n\t\t\t\t\tif (computed) {\n\n\t\t\t\t\t\t// We should always get a number back from opacity\n\t\t\t\t\t\tvar ret = curCSS(elem, \"opacity\");\n\t\t\t\t\t\treturn ret === \"\" ? \"1\" : ret;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\t// Don't automatically add \"px\" to these possibly-unitless properties\n\t\tcssNumber: {\n\t\t\t\"animationIterationCount\": true,\n\t\t\t\"columnCount\": true,\n\t\t\t\"fillOpacity\": true,\n\t\t\t\"flexGrow\": true,\n\t\t\t\"flexShrink\": true,\n\t\t\t\"fontWeight\": true,\n\t\t\t\"lineHeight\": true,\n\t\t\t\"opacity\": true,\n\t\t\t\"order\": true,\n\t\t\t\"orphans\": true,\n\t\t\t\"widows\": true,\n\t\t\t\"zIndex\": true,\n\t\t\t\"zoom\": true\n\t\t},\n\n\t\t// Add in properties whose names you wish to fix before\n\t\t// setting or getting the value\n\t\tcssProps: {\n\t\t\t\"float\": \"cssFloat\"\n\t\t},\n\n\t\t// Get and set the style property on a DOM Node\n\t\tstyle: function style(elem, name, value, extra) {\n\n\t\t\t// Don't set styles on text and comment nodes\n\t\t\tif (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Make sure that we're working with the right name\n\t\t\tvar ret,\n\t\t\t    type,\n\t\t\t    hooks,\n\t\t\t    origName = jQuery.camelCase(name),\n\t\t\t    style = elem.style;\n\n\t\t\tname = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);\n\n\t\t\t// Gets hook for the prefixed version, then unprefixed version\n\t\t\thooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];\n\n\t\t\t// Check if we're setting a value\n\t\t\tif (value !== undefined) {\n\t\t\t\ttype = typeof value === \"undefined\" ? \"undefined\" : _typeof(value);\n\n\t\t\t\t// Convert \"+=\" or \"-=\" to relative numbers (#7345)\n\t\t\t\tif (type === \"string\" && (ret = rcssNum.exec(value)) && ret[1]) {\n\t\t\t\t\tvalue = adjustCSS(elem, name, ret);\n\n\t\t\t\t\t// Fixes bug #9237\n\t\t\t\t\ttype = \"number\";\n\t\t\t\t}\n\n\t\t\t\t// Make sure that null and NaN values aren't set (#7116)\n\t\t\t\tif (value == null || value !== value) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t// If a number was passed in, add the unit (except for certain CSS properties)\n\t\t\t\tif (type === \"number\") {\n\t\t\t\t\tvalue += ret && ret[3] || (jQuery.cssNumber[origName] ? \"\" : \"px\");\n\t\t\t\t}\n\n\t\t\t\t// background-* props affect original clone's values\n\t\t\t\tif (!support.clearCloneStyle && value === \"\" && name.indexOf(\"background\") === 0) {\n\t\t\t\t\tstyle[name] = \"inherit\";\n\t\t\t\t}\n\n\t\t\t\t// If a hook was provided, use that value, otherwise just set the specified value\n\t\t\t\tif (!hooks || !(\"set\" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {\n\n\t\t\t\t\tstyle[name] = value;\n\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\t// If a hook was provided get the non-computed value from there\n\t\t\t\tif (hooks && \"get\" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {\n\n\t\t\t\t\treturn ret;\n\t\t\t\t}\n\n\t\t\t\t// Otherwise just get the value from the style object\n\t\t\t\treturn style[name];\n\t\t\t}\n\t\t},\n\n\t\tcss: function css(elem, name, extra, styles) {\n\t\t\tvar val,\n\t\t\t    num,\n\t\t\t    hooks,\n\t\t\t    origName = jQuery.camelCase(name);\n\n\t\t\t// Make sure that we're working with the right name\n\t\t\tname = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);\n\n\t\t\t// Try prefixed name followed by the unprefixed name\n\t\t\thooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];\n\n\t\t\t// If a hook was provided get the computed value from there\n\t\t\tif (hooks && \"get\" in hooks) {\n\t\t\t\tval = hooks.get(elem, true, extra);\n\t\t\t}\n\n\t\t\t// Otherwise, if a way to get the computed value exists, use that\n\t\t\tif (val === undefined) {\n\t\t\t\tval = curCSS(elem, name, styles);\n\t\t\t}\n\n\t\t\t// Convert \"normal\" to computed value\n\t\t\tif (val === \"normal\" && name in cssNormalTransform) {\n\t\t\t\tval = cssNormalTransform[name];\n\t\t\t}\n\n\t\t\t// Make numeric if forced or a qualifier was provided and val looks numeric\n\t\t\tif (extra === \"\" || extra) {\n\t\t\t\tnum = parseFloat(val);\n\t\t\t\treturn extra === true || isFinite(num) ? num || 0 : val;\n\t\t\t}\n\t\t\treturn val;\n\t\t}\n\t});\n\n\tjQuery.each([\"height\", \"width\"], function (i, name) {\n\t\tjQuery.cssHooks[name] = {\n\t\t\tget: function get(elem, computed, extra) {\n\t\t\t\tif (computed) {\n\n\t\t\t\t\t// Certain elements can have dimension info if we invisibly show them\n\t\t\t\t\t// but it must have a current display style that would benefit\n\t\t\t\t\treturn rdisplayswap.test(jQuery.css(elem, \"display\")) && (\n\n\t\t\t\t\t// Support: Safari 8+\n\t\t\t\t\t// Table columns in Safari have non-zero offsetWidth & zero\n\t\t\t\t\t// getBoundingClientRect().width unless display is changed.\n\t\t\t\t\t// Support: IE <=11 only\n\t\t\t\t\t// Running getBoundingClientRect on a disconnected node\n\t\t\t\t\t// in IE throws an error.\n\t\t\t\t\t!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {\n\t\t\t\t\t\treturn getWidthOrHeight(elem, name, extra);\n\t\t\t\t\t}) : getWidthOrHeight(elem, name, extra);\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tset: function set(elem, value, extra) {\n\t\t\t\tvar matches,\n\t\t\t\t    styles = extra && getStyles(elem),\n\t\t\t\t    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, \"boxSizing\", false, styles) === \"border-box\", styles);\n\n\t\t\t\t// Convert to pixels if value adjustment is needed\n\t\t\t\tif (subtract && (matches = rcssNum.exec(value)) && (matches[3] || \"px\") !== \"px\") {\n\n\t\t\t\t\telem.style[name] = value;\n\t\t\t\t\tvalue = jQuery.css(elem, name);\n\t\t\t\t}\n\n\t\t\t\treturn setPositiveNumber(elem, value, subtract);\n\t\t\t}\n\t\t};\n\t});\n\n\tjQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {\n\t\tif (computed) {\n\t\t\treturn (parseFloat(curCSS(elem, \"marginLeft\")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {\n\t\t\t\treturn elem.getBoundingClientRect().left;\n\t\t\t})) + \"px\";\n\t\t}\n\t});\n\n\t// These hooks are used by animate to expand properties\n\tjQuery.each({\n\t\tmargin: \"\",\n\t\tpadding: \"\",\n\t\tborder: \"Width\"\n\t}, function (prefix, suffix) {\n\t\tjQuery.cssHooks[prefix + suffix] = {\n\t\t\texpand: function expand(value) {\n\t\t\t\tvar i = 0,\n\t\t\t\t    expanded = {},\n\n\n\t\t\t\t// Assumes a single number if not a string\n\t\t\t\tparts = typeof value === \"string\" ? value.split(\" \") : [value];\n\n\t\t\t\tfor (; i < 4; i++) {\n\t\t\t\t\texpanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];\n\t\t\t\t}\n\n\t\t\t\treturn expanded;\n\t\t\t}\n\t\t};\n\n\t\tif (!rmargin.test(prefix)) {\n\t\t\tjQuery.cssHooks[prefix + suffix].set = setPositiveNumber;\n\t\t}\n\t});\n\n\tjQuery.fn.extend({\n\t\tcss: function css(name, value) {\n\t\t\treturn access(this, function (elem, name, value) {\n\t\t\t\tvar styles,\n\t\t\t\t    len,\n\t\t\t\t    map = {},\n\t\t\t\t    i = 0;\n\n\t\t\t\tif (jQuery.isArray(name)) {\n\t\t\t\t\tstyles = getStyles(elem);\n\t\t\t\t\tlen = name.length;\n\n\t\t\t\t\tfor (; i < len; i++) {\n\t\t\t\t\t\tmap[name[i]] = jQuery.css(elem, name[i], false, styles);\n\t\t\t\t\t}\n\n\t\t\t\t\treturn map;\n\t\t\t\t}\n\n\t\t\t\treturn value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);\n\t\t\t}, name, value, arguments.length > 1);\n\t\t}\n\t});\n\n\tfunction Tween(elem, options, prop, end, easing) {\n\t\treturn new Tween.prototype.init(elem, options, prop, end, easing);\n\t}\n\tjQuery.Tween = Tween;\n\n\tTween.prototype = {\n\t\tconstructor: Tween,\n\t\tinit: function init(elem, options, prop, end, easing, unit) {\n\t\t\tthis.elem = elem;\n\t\t\tthis.prop = prop;\n\t\t\tthis.easing = easing || jQuery.easing._default;\n\t\t\tthis.options = options;\n\t\t\tthis.start = this.now = this.cur();\n\t\t\tthis.end = end;\n\t\t\tthis.unit = unit || (jQuery.cssNumber[prop] ? \"\" : \"px\");\n\t\t},\n\t\tcur: function cur() {\n\t\t\tvar hooks = Tween.propHooks[this.prop];\n\n\t\t\treturn hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);\n\t\t},\n\t\trun: function run(percent) {\n\t\t\tvar eased,\n\t\t\t    hooks = Tween.propHooks[this.prop];\n\n\t\t\tif (this.options.duration) {\n\t\t\t\tthis.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);\n\t\t\t} else {\n\t\t\t\tthis.pos = eased = percent;\n\t\t\t}\n\t\t\tthis.now = (this.end - this.start) * eased + this.start;\n\n\t\t\tif (this.options.step) {\n\t\t\t\tthis.options.step.call(this.elem, this.now, this);\n\t\t\t}\n\n\t\t\tif (hooks && hooks.set) {\n\t\t\t\thooks.set(this);\n\t\t\t} else {\n\t\t\t\tTween.propHooks._default.set(this);\n\t\t\t}\n\t\t\treturn this;\n\t\t}\n\t};\n\n\tTween.prototype.init.prototype = Tween.prototype;\n\n\tTween.propHooks = {\n\t\t_default: {\n\t\t\tget: function get(tween) {\n\t\t\t\tvar result;\n\n\t\t\t\t// Use a property on the element directly when it is not a DOM element,\n\t\t\t\t// or when there is no matching style property that exists.\n\t\t\t\tif (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {\n\t\t\t\t\treturn tween.elem[tween.prop];\n\t\t\t\t}\n\n\t\t\t\t// Passing an empty string as a 3rd parameter to .css will automatically\n\t\t\t\t// attempt a parseFloat and fallback to a string if the parse fails.\n\t\t\t\t// Simple values such as \"10px\" are parsed to Float;\n\t\t\t\t// complex values such as \"rotate(1rad)\" are returned as-is.\n\t\t\t\tresult = jQuery.css(tween.elem, tween.prop, \"\");\n\n\t\t\t\t// Empty strings, null, undefined and \"auto\" are converted to 0.\n\t\t\t\treturn !result || result === \"auto\" ? 0 : result;\n\t\t\t},\n\t\t\tset: function set(tween) {\n\n\t\t\t\t// Use step hook for back compat.\n\t\t\t\t// Use cssHook if its there.\n\t\t\t\t// Use .style if available and use plain properties where available.\n\t\t\t\tif (jQuery.fx.step[tween.prop]) {\n\t\t\t\t\tjQuery.fx.step[tween.prop](tween);\n\t\t\t\t} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {\n\t\t\t\t\tjQuery.style(tween.elem, tween.prop, tween.now + tween.unit);\n\t\t\t\t} else {\n\t\t\t\t\ttween.elem[tween.prop] = tween.now;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n\n\t// Support: IE <=9 only\n\t// Panic based approach to setting things on disconnected nodes\n\tTween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n\t\tset: function set(tween) {\n\t\t\tif (tween.elem.nodeType && tween.elem.parentNode) {\n\t\t\t\ttween.elem[tween.prop] = tween.now;\n\t\t\t}\n\t\t}\n\t};\n\n\tjQuery.easing = {\n\t\tlinear: function linear(p) {\n\t\t\treturn p;\n\t\t},\n\t\tswing: function swing(p) {\n\t\t\treturn 0.5 - Math.cos(p * Math.PI) / 2;\n\t\t},\n\t\t_default: \"swing\"\n\t};\n\n\tjQuery.fx = Tween.prototype.init;\n\n\t// Back compat <1.8 extension point\n\tjQuery.fx.step = {};\n\n\tvar fxNow,\n\t    timerId,\n\t    rfxtypes = /^(?:toggle|show|hide)$/,\n\t    rrun = /queueHooks$/;\n\n\tfunction raf() {\n\t\tif (timerId) {\n\t\t\twindow.requestAnimationFrame(raf);\n\t\t\tjQuery.fx.tick();\n\t\t}\n\t}\n\n\t// Animations created synchronously will run synchronously\n\tfunction createFxNow() {\n\t\twindow.setTimeout(function () {\n\t\t\tfxNow = undefined;\n\t\t});\n\t\treturn fxNow = jQuery.now();\n\t}\n\n\t// Generate parameters to create a standard animation\n\tfunction genFx(type, includeWidth) {\n\t\tvar which,\n\t\t    i = 0,\n\t\t    attrs = { height: type };\n\n\t\t// If we include width, step value is 1 to do all cssExpand values,\n\t\t// otherwise step value is 2 to skip over Left and Right\n\t\tincludeWidth = includeWidth ? 1 : 0;\n\t\tfor (; i < 4; i += 2 - includeWidth) {\n\t\t\twhich = cssExpand[i];\n\t\t\tattrs[\"margin\" + which] = attrs[\"padding\" + which] = type;\n\t\t}\n\n\t\tif (includeWidth) {\n\t\t\tattrs.opacity = attrs.width = type;\n\t\t}\n\n\t\treturn attrs;\n\t}\n\n\tfunction createTween(value, prop, animation) {\n\t\tvar tween,\n\t\t    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners[\"*\"]),\n\t\t    index = 0,\n\t\t    length = collection.length;\n\t\tfor (; index < length; index++) {\n\t\t\tif (tween = collection[index].call(animation, prop, value)) {\n\n\t\t\t\t// We're done with this property\n\t\t\t\treturn tween;\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction defaultPrefilter(elem, props, opts) {\n\t\tvar prop,\n\t\t    value,\n\t\t    toggle,\n\t\t    hooks,\n\t\t    oldfire,\n\t\t    propTween,\n\t\t    restoreDisplay,\n\t\t    display,\n\t\t    isBox = \"width\" in props || \"height\" in props,\n\t\t    anim = this,\n\t\t    orig = {},\n\t\t    style = elem.style,\n\t\t    hidden = elem.nodeType && isHiddenWithinTree(elem),\n\t\t    dataShow = dataPriv.get(elem, \"fxshow\");\n\n\t\t// Queue-skipping animations hijack the fx hooks\n\t\tif (!opts.queue) {\n\t\t\thooks = jQuery._queueHooks(elem, \"fx\");\n\t\t\tif (hooks.unqueued == null) {\n\t\t\t\thooks.unqueued = 0;\n\t\t\t\toldfire = hooks.empty.fire;\n\t\t\t\thooks.empty.fire = function () {\n\t\t\t\t\tif (!hooks.unqueued) {\n\t\t\t\t\t\toldfire();\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t}\n\t\t\thooks.unqueued++;\n\n\t\t\tanim.always(function () {\n\n\t\t\t\t// Ensure the complete handler is called before this completes\n\t\t\t\tanim.always(function () {\n\t\t\t\t\thooks.unqueued--;\n\t\t\t\t\tif (!jQuery.queue(elem, \"fx\").length) {\n\t\t\t\t\t\thooks.empty.fire();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\n\t\t// Detect show/hide animations\n\t\tfor (prop in props) {\n\t\t\tvalue = props[prop];\n\t\t\tif (rfxtypes.test(value)) {\n\t\t\t\tdelete props[prop];\n\t\t\t\ttoggle = toggle || value === \"toggle\";\n\t\t\t\tif (value === (hidden ? \"hide\" : \"show\")) {\n\n\t\t\t\t\t// Pretend to be hidden if this is a \"show\" and\n\t\t\t\t\t// there is still data from a stopped show/hide\n\t\t\t\t\tif (value === \"show\" && dataShow && dataShow[prop] !== undefined) {\n\t\t\t\t\t\thidden = true;\n\n\t\t\t\t\t\t// Ignore all other no-op show/hide data\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcontinue;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\torig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);\n\t\t\t}\n\t\t}\n\n\t\t// Bail out if this is a no-op like .hide().hide()\n\t\tpropTween = !jQuery.isEmptyObject(props);\n\t\tif (!propTween && jQuery.isEmptyObject(orig)) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Restrict \"overflow\" and \"display\" styles during box animations\n\t\tif (isBox && elem.nodeType === 1) {\n\n\t\t\t// Support: IE <=9 - 11, Edge 12 - 13\n\t\t\t// Record all 3 overflow attributes because IE does not infer the shorthand\n\t\t\t// from identically-valued overflowX and overflowY\n\t\t\topts.overflow = [style.overflow, style.overflowX, style.overflowY];\n\n\t\t\t// Identify a display type, preferring old show/hide data over the CSS cascade\n\t\t\trestoreDisplay = dataShow && dataShow.display;\n\t\t\tif (restoreDisplay == null) {\n\t\t\t\trestoreDisplay = dataPriv.get(elem, \"display\");\n\t\t\t}\n\t\t\tdisplay = jQuery.css(elem, \"display\");\n\t\t\tif (display === \"none\") {\n\t\t\t\tif (restoreDisplay) {\n\t\t\t\t\tdisplay = restoreDisplay;\n\t\t\t\t} else {\n\n\t\t\t\t\t// Get nonempty value(s) by temporarily forcing visibility\n\t\t\t\t\tshowHide([elem], true);\n\t\t\t\t\trestoreDisplay = elem.style.display || restoreDisplay;\n\t\t\t\t\tdisplay = jQuery.css(elem, \"display\");\n\t\t\t\t\tshowHide([elem]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Animate inline elements as inline-block\n\t\t\tif (display === \"inline\" || display === \"inline-block\" && restoreDisplay != null) {\n\t\t\t\tif (jQuery.css(elem, \"float\") === \"none\") {\n\n\t\t\t\t\t// Restore the original display value at the end of pure show/hide animations\n\t\t\t\t\tif (!propTween) {\n\t\t\t\t\t\tanim.done(function () {\n\t\t\t\t\t\t\tstyle.display = restoreDisplay;\n\t\t\t\t\t\t});\n\t\t\t\t\t\tif (restoreDisplay == null) {\n\t\t\t\t\t\t\tdisplay = style.display;\n\t\t\t\t\t\t\trestoreDisplay = display === \"none\" ? \"\" : display;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tstyle.display = \"inline-block\";\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (opts.overflow) {\n\t\t\tstyle.overflow = \"hidden\";\n\t\t\tanim.always(function () {\n\t\t\t\tstyle.overflow = opts.overflow[0];\n\t\t\t\tstyle.overflowX = opts.overflow[1];\n\t\t\t\tstyle.overflowY = opts.overflow[2];\n\t\t\t});\n\t\t}\n\n\t\t// Implement show/hide animations\n\t\tpropTween = false;\n\t\tfor (prop in orig) {\n\n\t\t\t// General show/hide setup for this element animation\n\t\t\tif (!propTween) {\n\t\t\t\tif (dataShow) {\n\t\t\t\t\tif (\"hidden\" in dataShow) {\n\t\t\t\t\t\thidden = dataShow.hidden;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tdataShow = dataPriv.access(elem, \"fxshow\", { display: restoreDisplay });\n\t\t\t\t}\n\n\t\t\t\t// Store hidden/visible for toggle so `.stop().toggle()` \"reverses\"\n\t\t\t\tif (toggle) {\n\t\t\t\t\tdataShow.hidden = !hidden;\n\t\t\t\t}\n\n\t\t\t\t// Show elements before animating them\n\t\t\t\tif (hidden) {\n\t\t\t\t\tshowHide([elem], true);\n\t\t\t\t}\n\n\t\t\t\t/* eslint-disable no-loop-func */\n\n\t\t\t\tanim.done(function () {\n\n\t\t\t\t\t/* eslint-enable no-loop-func */\n\n\t\t\t\t\t// The final step of a \"hide\" animation is actually hiding the element\n\t\t\t\t\tif (!hidden) {\n\t\t\t\t\t\tshowHide([elem]);\n\t\t\t\t\t}\n\t\t\t\t\tdataPriv.remove(elem, \"fxshow\");\n\t\t\t\t\tfor (prop in orig) {\n\t\t\t\t\t\tjQuery.style(elem, prop, orig[prop]);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\n\t\t\t// Per-property setup\n\t\t\tpropTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);\n\t\t\tif (!(prop in dataShow)) {\n\t\t\t\tdataShow[prop] = propTween.start;\n\t\t\t\tif (hidden) {\n\t\t\t\t\tpropTween.end = propTween.start;\n\t\t\t\t\tpropTween.start = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction propFilter(props, specialEasing) {\n\t\tvar index, name, easing, value, hooks;\n\n\t\t// camelCase, specialEasing and expand cssHook pass\n\t\tfor (index in props) {\n\t\t\tname = jQuery.camelCase(index);\n\t\t\teasing = specialEasing[name];\n\t\t\tvalue = props[index];\n\t\t\tif (jQuery.isArray(value)) {\n\t\t\t\teasing = value[1];\n\t\t\t\tvalue = props[index] = value[0];\n\t\t\t}\n\n\t\t\tif (index !== name) {\n\t\t\t\tprops[name] = value;\n\t\t\t\tdelete props[index];\n\t\t\t}\n\n\t\t\thooks = jQuery.cssHooks[name];\n\t\t\tif (hooks && \"expand\" in hooks) {\n\t\t\t\tvalue = hooks.expand(value);\n\t\t\t\tdelete props[name];\n\n\t\t\t\t// Not quite $.extend, this won't overwrite existing keys.\n\t\t\t\t// Reusing 'index' because we have the correct \"name\"\n\t\t\t\tfor (index in value) {\n\t\t\t\t\tif (!(index in props)) {\n\t\t\t\t\t\tprops[index] = value[index];\n\t\t\t\t\t\tspecialEasing[index] = easing;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tspecialEasing[name] = easing;\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction Animation(elem, properties, options) {\n\t\tvar result,\n\t\t    stopped,\n\t\t    index = 0,\n\t\t    length = Animation.prefilters.length,\n\t\t    deferred = jQuery.Deferred().always(function () {\n\n\t\t\t// Don't match elem in the :animated selector\n\t\t\tdelete tick.elem;\n\t\t}),\n\t\t    tick = function tick() {\n\t\t\tif (stopped) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tvar currentTime = fxNow || createFxNow(),\n\t\t\t    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),\n\n\n\t\t\t// Support: Android 2.3 only\n\t\t\t// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)\n\t\t\ttemp = remaining / animation.duration || 0,\n\t\t\t    percent = 1 - temp,\n\t\t\t    index = 0,\n\t\t\t    length = animation.tweens.length;\n\n\t\t\tfor (; index < length; index++) {\n\t\t\t\tanimation.tweens[index].run(percent);\n\t\t\t}\n\n\t\t\tdeferred.notifyWith(elem, [animation, percent, remaining]);\n\n\t\t\tif (percent < 1 && length) {\n\t\t\t\treturn remaining;\n\t\t\t} else {\n\t\t\t\tdeferred.resolveWith(elem, [animation]);\n\t\t\t\treturn false;\n\t\t\t}\n\t\t},\n\t\t    animation = deferred.promise({\n\t\t\telem: elem,\n\t\t\tprops: jQuery.extend({}, properties),\n\t\t\topts: jQuery.extend(true, {\n\t\t\t\tspecialEasing: {},\n\t\t\t\teasing: jQuery.easing._default\n\t\t\t}, options),\n\t\t\toriginalProperties: properties,\n\t\t\toriginalOptions: options,\n\t\t\tstartTime: fxNow || createFxNow(),\n\t\t\tduration: options.duration,\n\t\t\ttweens: [],\n\t\t\tcreateTween: function createTween(prop, end) {\n\t\t\t\tvar tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);\n\t\t\t\tanimation.tweens.push(tween);\n\t\t\t\treturn tween;\n\t\t\t},\n\t\t\tstop: function stop(gotoEnd) {\n\t\t\t\tvar index = 0,\n\n\n\t\t\t\t// If we are going to the end, we want to run all the tweens\n\t\t\t\t// otherwise we skip this part\n\t\t\t\tlength = gotoEnd ? animation.tweens.length : 0;\n\t\t\t\tif (stopped) {\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t\tstopped = true;\n\t\t\t\tfor (; index < length; index++) {\n\t\t\t\t\tanimation.tweens[index].run(1);\n\t\t\t\t}\n\n\t\t\t\t// Resolve when we played the last frame; otherwise, reject\n\t\t\t\tif (gotoEnd) {\n\t\t\t\t\tdeferred.notifyWith(elem, [animation, 1, 0]);\n\t\t\t\t\tdeferred.resolveWith(elem, [animation, gotoEnd]);\n\t\t\t\t} else {\n\t\t\t\t\tdeferred.rejectWith(elem, [animation, gotoEnd]);\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t}\n\t\t}),\n\t\t    props = animation.props;\n\n\t\tpropFilter(props, animation.opts.specialEasing);\n\n\t\tfor (; index < length; index++) {\n\t\t\tresult = Animation.prefilters[index].call(animation, elem, props, animation.opts);\n\t\t\tif (result) {\n\t\t\t\tif (jQuery.isFunction(result.stop)) {\n\t\t\t\t\tjQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);\n\t\t\t\t}\n\t\t\t\treturn result;\n\t\t\t}\n\t\t}\n\n\t\tjQuery.map(props, createTween, animation);\n\n\t\tif (jQuery.isFunction(animation.opts.start)) {\n\t\t\tanimation.opts.start.call(elem, animation);\n\t\t}\n\n\t\tjQuery.fx.timer(jQuery.extend(tick, {\n\t\t\telem: elem,\n\t\t\tanim: animation,\n\t\t\tqueue: animation.opts.queue\n\t\t}));\n\n\t\t// attach callbacks from options\n\t\treturn animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);\n\t}\n\n\tjQuery.Animation = jQuery.extend(Animation, {\n\n\t\ttweeners: {\n\t\t\t\"*\": [function (prop, value) {\n\t\t\t\tvar tween = this.createTween(prop, value);\n\t\t\t\tadjustCSS(tween.elem, prop, rcssNum.exec(value), tween);\n\t\t\t\treturn tween;\n\t\t\t}]\n\t\t},\n\n\t\ttweener: function tweener(props, callback) {\n\t\t\tif (jQuery.isFunction(props)) {\n\t\t\t\tcallback = props;\n\t\t\t\tprops = [\"*\"];\n\t\t\t} else {\n\t\t\t\tprops = props.match(rnothtmlwhite);\n\t\t\t}\n\n\t\t\tvar prop,\n\t\t\t    index = 0,\n\t\t\t    length = props.length;\n\n\t\t\tfor (; index < length; index++) {\n\t\t\t\tprop = props[index];\n\t\t\t\tAnimation.tweeners[prop] = Animation.tweeners[prop] || [];\n\t\t\t\tAnimation.tweeners[prop].unshift(callback);\n\t\t\t}\n\t\t},\n\n\t\tprefilters: [defaultPrefilter],\n\n\t\tprefilter: function prefilter(callback, prepend) {\n\t\t\tif (prepend) {\n\t\t\t\tAnimation.prefilters.unshift(callback);\n\t\t\t} else {\n\t\t\t\tAnimation.prefilters.push(callback);\n\t\t\t}\n\t\t}\n\t});\n\n\tjQuery.speed = function (speed, easing, fn) {\n\t\tvar opt = speed && (typeof speed === \"undefined\" ? \"undefined\" : _typeof(speed)) === \"object\" ? jQuery.extend({}, speed) : {\n\t\t\tcomplete: fn || !fn && easing || jQuery.isFunction(speed) && speed,\n\t\t\tduration: speed,\n\t\t\teasing: fn && easing || easing && !jQuery.isFunction(easing) && easing\n\t\t};\n\n\t\t// Go to the end state if fx are off or if document is hidden\n\t\tif (jQuery.fx.off || document.hidden) {\n\t\t\topt.duration = 0;\n\t\t} else {\n\t\t\tif (typeof opt.duration !== \"number\") {\n\t\t\t\tif (opt.duration in jQuery.fx.speeds) {\n\t\t\t\t\topt.duration = jQuery.fx.speeds[opt.duration];\n\t\t\t\t} else {\n\t\t\t\t\topt.duration = jQuery.fx.speeds._default;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Normalize opt.queue - true/undefined/null -> \"fx\"\n\t\tif (opt.queue == null || opt.queue === true) {\n\t\t\topt.queue = \"fx\";\n\t\t}\n\n\t\t// Queueing\n\t\topt.old = opt.complete;\n\n\t\topt.complete = function () {\n\t\t\tif (jQuery.isFunction(opt.old)) {\n\t\t\t\topt.old.call(this);\n\t\t\t}\n\n\t\t\tif (opt.queue) {\n\t\t\t\tjQuery.dequeue(this, opt.queue);\n\t\t\t}\n\t\t};\n\n\t\treturn opt;\n\t};\n\n\tjQuery.fn.extend({\n\t\tfadeTo: function fadeTo(speed, to, easing, callback) {\n\n\t\t\t// Show any hidden elements after setting opacity to 0\n\t\t\treturn this.filter(isHiddenWithinTree).css(\"opacity\", 0).show()\n\n\t\t\t// Animate to the value specified\n\t\t\t.end().animate({ opacity: to }, speed, easing, callback);\n\t\t},\n\t\tanimate: function animate(prop, speed, easing, callback) {\n\t\t\tvar empty = jQuery.isEmptyObject(prop),\n\t\t\t    optall = jQuery.speed(speed, easing, callback),\n\t\t\t    doAnimation = function doAnimation() {\n\n\t\t\t\t// Operate on a copy of prop so per-property easing won't be lost\n\t\t\t\tvar anim = Animation(this, jQuery.extend({}, prop), optall);\n\n\t\t\t\t// Empty animations, or finishing resolves immediately\n\t\t\t\tif (empty || dataPriv.get(this, \"finish\")) {\n\t\t\t\t\tanim.stop(true);\n\t\t\t\t}\n\t\t\t};\n\t\t\tdoAnimation.finish = doAnimation;\n\n\t\t\treturn empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);\n\t\t},\n\t\tstop: function stop(type, clearQueue, gotoEnd) {\n\t\t\tvar stopQueue = function stopQueue(hooks) {\n\t\t\t\tvar stop = hooks.stop;\n\t\t\t\tdelete hooks.stop;\n\t\t\t\tstop(gotoEnd);\n\t\t\t};\n\n\t\t\tif (typeof type !== \"string\") {\n\t\t\t\tgotoEnd = clearQueue;\n\t\t\t\tclearQueue = type;\n\t\t\t\ttype = undefined;\n\t\t\t}\n\t\t\tif (clearQueue && type !== false) {\n\t\t\t\tthis.queue(type || \"fx\", []);\n\t\t\t}\n\n\t\t\treturn this.each(function () {\n\t\t\t\tvar dequeue = true,\n\t\t\t\t    index = type != null && type + \"queueHooks\",\n\t\t\t\t    timers = jQuery.timers,\n\t\t\t\t    data = dataPriv.get(this);\n\n\t\t\t\tif (index) {\n\t\t\t\t\tif (data[index] && data[index].stop) {\n\t\t\t\t\t\tstopQueue(data[index]);\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tfor (index in data) {\n\t\t\t\t\t\tif (data[index] && data[index].stop && rrun.test(index)) {\n\t\t\t\t\t\t\tstopQueue(data[index]);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tfor (index = timers.length; index--;) {\n\t\t\t\t\tif (timers[index].elem === this && (type == null || timers[index].queue === type)) {\n\n\t\t\t\t\t\ttimers[index].anim.stop(gotoEnd);\n\t\t\t\t\t\tdequeue = false;\n\t\t\t\t\t\ttimers.splice(index, 1);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Start the next in the queue if the last step wasn't forced.\n\t\t\t\t// Timers currently will call their complete callbacks, which\n\t\t\t\t// will dequeue but only if they were gotoEnd.\n\t\t\t\tif (dequeue || !gotoEnd) {\n\t\t\t\t\tjQuery.dequeue(this, type);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\t\tfinish: function finish(type) {\n\t\t\tif (type !== false) {\n\t\t\t\ttype = type || \"fx\";\n\t\t\t}\n\t\t\treturn this.each(function () {\n\t\t\t\tvar index,\n\t\t\t\t    data = dataPriv.get(this),\n\t\t\t\t    queue = data[type + \"queue\"],\n\t\t\t\t    hooks = data[type + \"queueHooks\"],\n\t\t\t\t    timers = jQuery.timers,\n\t\t\t\t    length = queue ? queue.length : 0;\n\n\t\t\t\t// Enable finishing flag on private data\n\t\t\t\tdata.finish = true;\n\n\t\t\t\t// Empty the queue first\n\t\t\t\tjQuery.queue(this, type, []);\n\n\t\t\t\tif (hooks && hooks.stop) {\n\t\t\t\t\thooks.stop.call(this, true);\n\t\t\t\t}\n\n\t\t\t\t// Look for any active animations, and finish them\n\t\t\t\tfor (index = timers.length; index--;) {\n\t\t\t\t\tif (timers[index].elem === this && timers[index].queue === type) {\n\t\t\t\t\t\ttimers[index].anim.stop(true);\n\t\t\t\t\t\ttimers.splice(index, 1);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Look for any animations in the old queue and finish them\n\t\t\t\tfor (index = 0; index < length; index++) {\n\t\t\t\t\tif (queue[index] && queue[index].finish) {\n\t\t\t\t\t\tqueue[index].finish.call(this);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Turn off finishing flag\n\t\t\t\tdelete data.finish;\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.each([\"toggle\", \"show\", \"hide\"], function (i, name) {\n\t\tvar cssFn = jQuery.fn[name];\n\t\tjQuery.fn[name] = function (speed, easing, callback) {\n\t\t\treturn speed == null || typeof speed === \"boolean\" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);\n\t\t};\n\t});\n\n\t// Generate shortcuts for custom animations\n\tjQuery.each({\n\t\tslideDown: genFx(\"show\"),\n\t\tslideUp: genFx(\"hide\"),\n\t\tslideToggle: genFx(\"toggle\"),\n\t\tfadeIn: { opacity: \"show\" },\n\t\tfadeOut: { opacity: \"hide\" },\n\t\tfadeToggle: { opacity: \"toggle\" }\n\t}, function (name, props) {\n\t\tjQuery.fn[name] = function (speed, easing, callback) {\n\t\t\treturn this.animate(props, speed, easing, callback);\n\t\t};\n\t});\n\n\tjQuery.timers = [];\n\tjQuery.fx.tick = function () {\n\t\tvar timer,\n\t\t    i = 0,\n\t\t    timers = jQuery.timers;\n\n\t\tfxNow = jQuery.now();\n\n\t\tfor (; i < timers.length; i++) {\n\t\t\ttimer = timers[i];\n\n\t\t\t// Checks the timer has not already been removed\n\t\t\tif (!timer() && timers[i] === timer) {\n\t\t\t\ttimers.splice(i--, 1);\n\t\t\t}\n\t\t}\n\n\t\tif (!timers.length) {\n\t\t\tjQuery.fx.stop();\n\t\t}\n\t\tfxNow = undefined;\n\t};\n\n\tjQuery.fx.timer = function (timer) {\n\t\tjQuery.timers.push(timer);\n\t\tif (timer()) {\n\t\t\tjQuery.fx.start();\n\t\t} else {\n\t\t\tjQuery.timers.pop();\n\t\t}\n\t};\n\n\tjQuery.fx.interval = 13;\n\tjQuery.fx.start = function () {\n\t\tif (!timerId) {\n\t\t\ttimerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);\n\t\t}\n\t};\n\n\tjQuery.fx.stop = function () {\n\t\tif (window.cancelAnimationFrame) {\n\t\t\twindow.cancelAnimationFrame(timerId);\n\t\t} else {\n\t\t\twindow.clearInterval(timerId);\n\t\t}\n\n\t\ttimerId = null;\n\t};\n\n\tjQuery.fx.speeds = {\n\t\tslow: 600,\n\t\tfast: 200,\n\n\t\t// Default speed\n\t\t_default: 400\n\t};\n\n\t// Based off of the plugin by Clint Helfers, with permission.\n\t// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/\n\tjQuery.fn.delay = function (time, type) {\n\t\ttime = jQuery.fx ? jQuery.fx.speeds[time] || time : time;\n\t\ttype = type || \"fx\";\n\n\t\treturn this.queue(type, function (next, hooks) {\n\t\t\tvar timeout = window.setTimeout(next, time);\n\t\t\thooks.stop = function () {\n\t\t\t\twindow.clearTimeout(timeout);\n\t\t\t};\n\t\t});\n\t};\n\n\t(function () {\n\t\tvar input = document.createElement(\"input\"),\n\t\t    select = document.createElement(\"select\"),\n\t\t    opt = select.appendChild(document.createElement(\"option\"));\n\n\t\tinput.type = \"checkbox\";\n\n\t\t// Support: Android <=4.3 only\n\t\t// Default value for a checkbox should be \"on\"\n\t\tsupport.checkOn = input.value !== \"\";\n\n\t\t// Support: IE <=11 only\n\t\t// Must access selectedIndex to make default options select\n\t\tsupport.optSelected = opt.selected;\n\n\t\t// Support: IE <=11 only\n\t\t// An input loses its value after becoming a radio\n\t\tinput = document.createElement(\"input\");\n\t\tinput.value = \"t\";\n\t\tinput.type = \"radio\";\n\t\tsupport.radioValue = input.value === \"t\";\n\t})();\n\n\tvar boolHook,\n\t    attrHandle = jQuery.expr.attrHandle;\n\n\tjQuery.fn.extend({\n\t\tattr: function attr(name, value) {\n\t\t\treturn access(this, jQuery.attr, name, value, arguments.length > 1);\n\t\t},\n\n\t\tremoveAttr: function removeAttr(name) {\n\t\t\treturn this.each(function () {\n\t\t\t\tjQuery.removeAttr(this, name);\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.extend({\n\t\tattr: function attr(elem, name, value) {\n\t\t\tvar ret,\n\t\t\t    hooks,\n\t\t\t    nType = elem.nodeType;\n\n\t\t\t// Don't get/set attributes on text, comment and attribute nodes\n\t\t\tif (nType === 3 || nType === 8 || nType === 2) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Fallback to prop when attributes are not supported\n\t\t\tif (typeof elem.getAttribute === \"undefined\") {\n\t\t\t\treturn jQuery.prop(elem, name, value);\n\t\t\t}\n\n\t\t\t// Attribute hooks are determined by the lowercase version\n\t\t\t// Grab necessary hook if one is defined\n\t\t\tif (nType !== 1 || !jQuery.isXMLDoc(elem)) {\n\t\t\t\thooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);\n\t\t\t}\n\n\t\t\tif (value !== undefined) {\n\t\t\t\tif (value === null) {\n\t\t\t\t\tjQuery.removeAttr(elem, name);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (hooks && \"set\" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {\n\t\t\t\t\treturn ret;\n\t\t\t\t}\n\n\t\t\t\telem.setAttribute(name, value + \"\");\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\tif (hooks && \"get\" in hooks && (ret = hooks.get(elem, name)) !== null) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\tret = jQuery.find.attr(elem, name);\n\n\t\t\t// Non-existent attributes return null, we normalize to undefined\n\t\t\treturn ret == null ? undefined : ret;\n\t\t},\n\n\t\tattrHooks: {\n\t\t\ttype: {\n\t\t\t\tset: function set(elem, value) {\n\t\t\t\t\tif (!support.radioValue && value === \"radio\" && jQuery.nodeName(elem, \"input\")) {\n\t\t\t\t\t\tvar val = elem.value;\n\t\t\t\t\t\telem.setAttribute(\"type\", value);\n\t\t\t\t\t\tif (val) {\n\t\t\t\t\t\t\telem.value = val;\n\t\t\t\t\t\t}\n\t\t\t\t\t\treturn value;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tremoveAttr: function removeAttr(elem, value) {\n\t\t\tvar name,\n\t\t\t    i = 0,\n\n\n\t\t\t// Attribute names can contain non-HTML whitespace characters\n\t\t\t// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2\n\t\t\tattrNames = value && value.match(rnothtmlwhite);\n\n\t\t\tif (attrNames && elem.nodeType === 1) {\n\t\t\t\twhile (name = attrNames[i++]) {\n\t\t\t\t\telem.removeAttribute(name);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t});\n\n\t// Hooks for boolean attributes\n\tboolHook = {\n\t\tset: function set(elem, value, name) {\n\t\t\tif (value === false) {\n\n\t\t\t\t// Remove boolean attributes when set to false\n\t\t\t\tjQuery.removeAttr(elem, name);\n\t\t\t} else {\n\t\t\t\telem.setAttribute(name, name);\n\t\t\t}\n\t\t\treturn name;\n\t\t}\n\t};\n\n\tjQuery.each(jQuery.expr.match.bool.source.match(/\\w+/g), function (i, name) {\n\t\tvar getter = attrHandle[name] || jQuery.find.attr;\n\n\t\tattrHandle[name] = function (elem, name, isXML) {\n\t\t\tvar ret,\n\t\t\t    handle,\n\t\t\t    lowercaseName = name.toLowerCase();\n\n\t\t\tif (!isXML) {\n\n\t\t\t\t// Avoid an infinite loop by temporarily removing this function from the getter\n\t\t\t\thandle = attrHandle[lowercaseName];\n\t\t\t\tattrHandle[lowercaseName] = ret;\n\t\t\t\tret = getter(elem, name, isXML) != null ? lowercaseName : null;\n\t\t\t\tattrHandle[lowercaseName] = handle;\n\t\t\t}\n\t\t\treturn ret;\n\t\t};\n\t});\n\n\tvar rfocusable = /^(?:input|select|textarea|button)$/i,\n\t    rclickable = /^(?:a|area)$/i;\n\n\tjQuery.fn.extend({\n\t\tprop: function prop(name, value) {\n\t\t\treturn access(this, jQuery.prop, name, value, arguments.length > 1);\n\t\t},\n\n\t\tremoveProp: function removeProp(name) {\n\t\t\treturn this.each(function () {\n\t\t\t\tdelete this[jQuery.propFix[name] || name];\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.extend({\n\t\tprop: function prop(elem, name, value) {\n\t\t\tvar ret,\n\t\t\t    hooks,\n\t\t\t    nType = elem.nodeType;\n\n\t\t\t// Don't get/set properties on text, comment and attribute nodes\n\t\t\tif (nType === 3 || nType === 8 || nType === 2) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (nType !== 1 || !jQuery.isXMLDoc(elem)) {\n\n\t\t\t\t// Fix name and attach hooks\n\t\t\t\tname = jQuery.propFix[name] || name;\n\t\t\t\thooks = jQuery.propHooks[name];\n\t\t\t}\n\n\t\t\tif (value !== undefined) {\n\t\t\t\tif (hooks && \"set\" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {\n\t\t\t\t\treturn ret;\n\t\t\t\t}\n\n\t\t\t\treturn elem[name] = value;\n\t\t\t}\n\n\t\t\tif (hooks && \"get\" in hooks && (ret = hooks.get(elem, name)) !== null) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\treturn elem[name];\n\t\t},\n\n\t\tpropHooks: {\n\t\t\ttabIndex: {\n\t\t\t\tget: function get(elem) {\n\n\t\t\t\t\t// Support: IE <=9 - 11 only\n\t\t\t\t\t// elem.tabIndex doesn't always return the\n\t\t\t\t\t// correct value when it hasn't been explicitly set\n\t\t\t\t\t// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n\t\t\t\t\t// Use proper attribute retrieval(#12072)\n\t\t\t\t\tvar tabindex = jQuery.find.attr(elem, \"tabindex\");\n\n\t\t\t\t\tif (tabindex) {\n\t\t\t\t\t\treturn parseInt(tabindex, 10);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {\n\t\t\t\t\t\treturn 0;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn -1;\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tpropFix: {\n\t\t\t\"for\": \"htmlFor\",\n\t\t\t\"class\": \"className\"\n\t\t}\n\t});\n\n\t// Support: IE <=11 only\n\t// Accessing the selectedIndex property\n\t// forces the browser to respect setting selected\n\t// on the option\n\t// The getter ensures a default option is selected\n\t// when in an optgroup\n\t// eslint rule \"no-unused-expressions\" is disabled for this code\n\t// since it considers such accessions noop\n\tif (!support.optSelected) {\n\t\tjQuery.propHooks.selected = {\n\t\t\tget: function get(elem) {\n\n\t\t\t\t/* eslint no-unused-expressions: \"off\" */\n\n\t\t\t\tvar parent = elem.parentNode;\n\t\t\t\tif (parent && parent.parentNode) {\n\t\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t\t}\n\t\t\t\treturn null;\n\t\t\t},\n\t\t\tset: function set(elem) {\n\n\t\t\t\t/* eslint no-unused-expressions: \"off\" */\n\n\t\t\t\tvar parent = elem.parentNode;\n\t\t\t\tif (parent) {\n\t\t\t\t\tparent.selectedIndex;\n\n\t\t\t\t\tif (parent.parentNode) {\n\t\t\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n\n\tjQuery.each([\"tabIndex\", \"readOnly\", \"maxLength\", \"cellSpacing\", \"cellPadding\", \"rowSpan\", \"colSpan\", \"useMap\", \"frameBorder\", \"contentEditable\"], function () {\n\t\tjQuery.propFix[this.toLowerCase()] = this;\n\t});\n\n\t// Strip and collapse whitespace according to HTML spec\n\t// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace\n\tfunction stripAndCollapse(value) {\n\t\tvar tokens = value.match(rnothtmlwhite) || [];\n\t\treturn tokens.join(\" \");\n\t}\n\n\tfunction getClass(elem) {\n\t\treturn elem.getAttribute && elem.getAttribute(\"class\") || \"\";\n\t}\n\n\tjQuery.fn.extend({\n\t\taddClass: function addClass(value) {\n\t\t\tvar classes,\n\t\t\t    elem,\n\t\t\t    cur,\n\t\t\t    curValue,\n\t\t\t    clazz,\n\t\t\t    j,\n\t\t\t    finalValue,\n\t\t\t    i = 0;\n\n\t\t\tif (jQuery.isFunction(value)) {\n\t\t\t\treturn this.each(function (j) {\n\t\t\t\t\tjQuery(this).addClass(value.call(this, j, getClass(this)));\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tif (typeof value === \"string\" && value) {\n\t\t\t\tclasses = value.match(rnothtmlwhite) || [];\n\n\t\t\t\twhile (elem = this[i++]) {\n\t\t\t\t\tcurValue = getClass(elem);\n\t\t\t\t\tcur = elem.nodeType === 1 && \" \" + stripAndCollapse(curValue) + \" \";\n\n\t\t\t\t\tif (cur) {\n\t\t\t\t\t\tj = 0;\n\t\t\t\t\t\twhile (clazz = classes[j++]) {\n\t\t\t\t\t\t\tif (cur.indexOf(\" \" + clazz + \" \") < 0) {\n\t\t\t\t\t\t\t\tcur += clazz + \" \";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\t\tfinalValue = stripAndCollapse(cur);\n\t\t\t\t\t\tif (curValue !== finalValue) {\n\t\t\t\t\t\t\telem.setAttribute(\"class\", finalValue);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this;\n\t\t},\n\n\t\tremoveClass: function removeClass(value) {\n\t\t\tvar classes,\n\t\t\t    elem,\n\t\t\t    cur,\n\t\t\t    curValue,\n\t\t\t    clazz,\n\t\t\t    j,\n\t\t\t    finalValue,\n\t\t\t    i = 0;\n\n\t\t\tif (jQuery.isFunction(value)) {\n\t\t\t\treturn this.each(function (j) {\n\t\t\t\t\tjQuery(this).removeClass(value.call(this, j, getClass(this)));\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tif (!arguments.length) {\n\t\t\t\treturn this.attr(\"class\", \"\");\n\t\t\t}\n\n\t\t\tif (typeof value === \"string\" && value) {\n\t\t\t\tclasses = value.match(rnothtmlwhite) || [];\n\n\t\t\t\twhile (elem = this[i++]) {\n\t\t\t\t\tcurValue = getClass(elem);\n\n\t\t\t\t\t// This expression is here for better compressibility (see addClass)\n\t\t\t\t\tcur = elem.nodeType === 1 && \" \" + stripAndCollapse(curValue) + \" \";\n\n\t\t\t\t\tif (cur) {\n\t\t\t\t\t\tj = 0;\n\t\t\t\t\t\twhile (clazz = classes[j++]) {\n\n\t\t\t\t\t\t\t// Remove *all* instances\n\t\t\t\t\t\t\twhile (cur.indexOf(\" \" + clazz + \" \") > -1) {\n\t\t\t\t\t\t\t\tcur = cur.replace(\" \" + clazz + \" \", \" \");\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\t\tfinalValue = stripAndCollapse(cur);\n\t\t\t\t\t\tif (curValue !== finalValue) {\n\t\t\t\t\t\t\telem.setAttribute(\"class\", finalValue);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this;\n\t\t},\n\n\t\ttoggleClass: function toggleClass(value, stateVal) {\n\t\t\tvar type = typeof value === \"undefined\" ? \"undefined\" : _typeof(value);\n\n\t\t\tif (typeof stateVal === \"boolean\" && type === \"string\") {\n\t\t\t\treturn stateVal ? this.addClass(value) : this.removeClass(value);\n\t\t\t}\n\n\t\t\tif (jQuery.isFunction(value)) {\n\t\t\t\treturn this.each(function (i) {\n\t\t\t\t\tjQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);\n\t\t\t\t});\n\t\t\t}\n\n\t\t\treturn this.each(function () {\n\t\t\t\tvar className, i, self, classNames;\n\n\t\t\t\tif (type === \"string\") {\n\n\t\t\t\t\t// Toggle individual class names\n\t\t\t\t\ti = 0;\n\t\t\t\t\tself = jQuery(this);\n\t\t\t\t\tclassNames = value.match(rnothtmlwhite) || [];\n\n\t\t\t\t\twhile (className = classNames[i++]) {\n\n\t\t\t\t\t\t// Check each className given, space separated list\n\t\t\t\t\t\tif (self.hasClass(className)) {\n\t\t\t\t\t\t\tself.removeClass(className);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tself.addClass(className);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Toggle whole class name\n\t\t\t\t} else if (value === undefined || type === \"boolean\") {\n\t\t\t\t\tclassName = getClass(this);\n\t\t\t\t\tif (className) {\n\n\t\t\t\t\t\t// Store className if set\n\t\t\t\t\t\tdataPriv.set(this, \"__className__\", className);\n\t\t\t\t\t}\n\n\t\t\t\t\t// If the element has a class name or if we're passed `false`,\n\t\t\t\t\t// then remove the whole classname (if there was one, the above saved it).\n\t\t\t\t\t// Otherwise bring back whatever was previously saved (if anything),\n\t\t\t\t\t// falling back to the empty string if nothing was stored.\n\t\t\t\t\tif (this.setAttribute) {\n\t\t\t\t\t\tthis.setAttribute(\"class\", className || value === false ? \"\" : dataPriv.get(this, \"__className__\") || \"\");\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\thasClass: function hasClass(selector) {\n\t\t\tvar className,\n\t\t\t    elem,\n\t\t\t    i = 0;\n\n\t\t\tclassName = \" \" + selector + \" \";\n\t\t\twhile (elem = this[i++]) {\n\t\t\t\tif (elem.nodeType === 1 && (\" \" + stripAndCollapse(getClass(elem)) + \" \").indexOf(className) > -1) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn false;\n\t\t}\n\t});\n\n\tvar rreturn = /\\r/g;\n\n\tjQuery.fn.extend({\n\t\tval: function val(value) {\n\t\t\tvar hooks,\n\t\t\t    ret,\n\t\t\t    isFunction,\n\t\t\t    elem = this[0];\n\n\t\t\tif (!arguments.length) {\n\t\t\t\tif (elem) {\n\t\t\t\t\thooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];\n\n\t\t\t\t\tif (hooks && \"get\" in hooks && (ret = hooks.get(elem, \"value\")) !== undefined) {\n\t\t\t\t\t\treturn ret;\n\t\t\t\t\t}\n\n\t\t\t\t\tret = elem.value;\n\n\t\t\t\t\t// Handle most common string cases\n\t\t\t\t\tif (typeof ret === \"string\") {\n\t\t\t\t\t\treturn ret.replace(rreturn, \"\");\n\t\t\t\t\t}\n\n\t\t\t\t\t// Handle cases where value is null/undef or number\n\t\t\t\t\treturn ret == null ? \"\" : ret;\n\t\t\t\t}\n\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tisFunction = jQuery.isFunction(value);\n\n\t\t\treturn this.each(function (i) {\n\t\t\t\tvar val;\n\n\t\t\t\tif (this.nodeType !== 1) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (isFunction) {\n\t\t\t\t\tval = value.call(this, i, jQuery(this).val());\n\t\t\t\t} else {\n\t\t\t\t\tval = value;\n\t\t\t\t}\n\n\t\t\t\t// Treat null/undefined as \"\"; convert numbers to string\n\t\t\t\tif (val == null) {\n\t\t\t\t\tval = \"\";\n\t\t\t\t} else if (typeof val === \"number\") {\n\t\t\t\t\tval += \"\";\n\t\t\t\t} else if (jQuery.isArray(val)) {\n\t\t\t\t\tval = jQuery.map(val, function (value) {\n\t\t\t\t\t\treturn value == null ? \"\" : value + \"\";\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\thooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];\n\n\t\t\t\t// If set returns undefined, fall back to normal setting\n\t\t\t\tif (!hooks || !(\"set\" in hooks) || hooks.set(this, val, \"value\") === undefined) {\n\t\t\t\t\tthis.value = val;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t});\n\n\tjQuery.extend({\n\t\tvalHooks: {\n\t\t\toption: {\n\t\t\t\tget: function get(elem) {\n\n\t\t\t\t\tvar val = jQuery.find.attr(elem, \"value\");\n\t\t\t\t\treturn val != null ? val :\n\n\t\t\t\t\t// Support: IE <=10 - 11 only\n\t\t\t\t\t// option.text throws exceptions (#14686, #14858)\n\t\t\t\t\t// Strip and collapse whitespace\n\t\t\t\t\t// https://html.spec.whatwg.org/#strip-and-collapse-whitespace\n\t\t\t\t\tstripAndCollapse(jQuery.text(elem));\n\t\t\t\t}\n\t\t\t},\n\t\t\tselect: {\n\t\t\t\tget: function get(elem) {\n\t\t\t\t\tvar value,\n\t\t\t\t\t    option,\n\t\t\t\t\t    i,\n\t\t\t\t\t    options = elem.options,\n\t\t\t\t\t    index = elem.selectedIndex,\n\t\t\t\t\t    one = elem.type === \"select-one\",\n\t\t\t\t\t    values = one ? null : [],\n\t\t\t\t\t    max = one ? index + 1 : options.length;\n\n\t\t\t\t\tif (index < 0) {\n\t\t\t\t\t\ti = max;\n\t\t\t\t\t} else {\n\t\t\t\t\t\ti = one ? index : 0;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Loop through all the selected options\n\t\t\t\t\tfor (; i < max; i++) {\n\t\t\t\t\t\toption = options[i];\n\n\t\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t\t// IE8-9 doesn't update selected after form reset (#2551)\n\t\t\t\t\t\tif ((option.selected || i === index) &&\n\n\t\t\t\t\t\t// Don't return options that are disabled or in a disabled optgroup\n\t\t\t\t\t\t!option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, \"optgroup\"))) {\n\n\t\t\t\t\t\t\t// Get the specific value for the option\n\t\t\t\t\t\t\tvalue = jQuery(option).val();\n\n\t\t\t\t\t\t\t// We don't need an array for one selects\n\t\t\t\t\t\t\tif (one) {\n\t\t\t\t\t\t\t\treturn value;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Multi-Selects return an array\n\t\t\t\t\t\t\tvalues.push(value);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn values;\n\t\t\t\t},\n\n\t\t\t\tset: function set(elem, value) {\n\t\t\t\t\tvar optionSet,\n\t\t\t\t\t    option,\n\t\t\t\t\t    options = elem.options,\n\t\t\t\t\t    values = jQuery.makeArray(value),\n\t\t\t\t\t    i = options.length;\n\n\t\t\t\t\twhile (i--) {\n\t\t\t\t\t\toption = options[i];\n\n\t\t\t\t\t\t/* eslint-disable no-cond-assign */\n\n\t\t\t\t\t\tif (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {\n\t\t\t\t\t\t\toptionSet = true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t/* eslint-enable no-cond-assign */\n\t\t\t\t\t}\n\n\t\t\t\t\t// Force browsers to behave consistently when non-matching value is set\n\t\t\t\t\tif (!optionSet) {\n\t\t\t\t\t\telem.selectedIndex = -1;\n\t\t\t\t\t}\n\t\t\t\t\treturn values;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t});\n\n\t// Radios and checkboxes getter/setter\n\tjQuery.each([\"radio\", \"checkbox\"], function () {\n\t\tjQuery.valHooks[this] = {\n\t\t\tset: function set(elem, value) {\n\t\t\t\tif (jQuery.isArray(value)) {\n\t\t\t\t\treturn elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t\tif (!support.checkOn) {\n\t\t\tjQuery.valHooks[this].get = function (elem) {\n\t\t\t\treturn elem.getAttribute(\"value\") === null ? \"on\" : elem.value;\n\t\t\t};\n\t\t}\n\t});\n\n\t// Return jQuery for attributes-only inclusion\n\n\n\tvar rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;\n\n\tjQuery.extend(jQuery.event, {\n\n\t\ttrigger: function trigger(event, data, elem, onlyHandlers) {\n\n\t\t\tvar i,\n\t\t\t    cur,\n\t\t\t    tmp,\n\t\t\t    bubbleType,\n\t\t\t    ontype,\n\t\t\t    handle,\n\t\t\t    special,\n\t\t\t    eventPath = [elem || document],\n\t\t\t    type = hasOwn.call(event, \"type\") ? event.type : event,\n\t\t\t    namespaces = hasOwn.call(event, \"namespace\") ? event.namespace.split(\".\") : [];\n\n\t\t\tcur = tmp = elem = elem || document;\n\n\t\t\t// Don't do events on text and comment nodes\n\t\t\tif (elem.nodeType === 3 || elem.nodeType === 8) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// focus/blur morphs to focusin/out; ensure we're not firing them right now\n\t\t\tif (rfocusMorph.test(type + jQuery.event.triggered)) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (type.indexOf(\".\") > -1) {\n\n\t\t\t\t// Namespaced trigger; create a regexp to match event type in handle()\n\t\t\t\tnamespaces = type.split(\".\");\n\t\t\t\ttype = namespaces.shift();\n\t\t\t\tnamespaces.sort();\n\t\t\t}\n\t\t\tontype = type.indexOf(\":\") < 0 && \"on\" + type;\n\n\t\t\t// Caller can pass in a jQuery.Event object, Object, or just an event type string\n\t\t\tevent = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === \"undefined\" ? \"undefined\" : _typeof(event)) === \"object\" && event);\n\n\t\t\t// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n\t\t\tevent.isTrigger = onlyHandlers ? 2 : 3;\n\t\t\tevent.namespace = namespaces.join(\".\");\n\t\t\tevent.rnamespace = event.namespace ? new RegExp(\"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\") : null;\n\n\t\t\t// Clean up the event in case it is being reused\n\t\t\tevent.result = undefined;\n\t\t\tif (!event.target) {\n\t\t\t\tevent.target = elem;\n\t\t\t}\n\n\t\t\t// Clone any incoming data and prepend the event, creating the handler arg list\n\t\t\tdata = data == null ? [event] : jQuery.makeArray(data, [event]);\n\n\t\t\t// Allow special events to draw outside the lines\n\t\t\tspecial = jQuery.event.special[type] || {};\n\t\t\tif (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Determine event propagation path in advance, per W3C events spec (#9951)\n\t\t\t// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n\t\t\tif (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {\n\n\t\t\t\tbubbleType = special.delegateType || type;\n\t\t\t\tif (!rfocusMorph.test(bubbleType + type)) {\n\t\t\t\t\tcur = cur.parentNode;\n\t\t\t\t}\n\t\t\t\tfor (; cur; cur = cur.parentNode) {\n\t\t\t\t\teventPath.push(cur);\n\t\t\t\t\ttmp = cur;\n\t\t\t\t}\n\n\t\t\t\t// Only add window if we got to document (e.g., not plain obj or detached DOM)\n\t\t\t\tif (tmp === (elem.ownerDocument || document)) {\n\t\t\t\t\teventPath.push(tmp.defaultView || tmp.parentWindow || window);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Fire handlers on the event path\n\t\t\ti = 0;\n\t\t\twhile ((cur = eventPath[i++]) && !event.isPropagationStopped()) {\n\n\t\t\t\tevent.type = i > 1 ? bubbleType : special.bindType || type;\n\n\t\t\t\t// jQuery handler\n\t\t\t\thandle = (dataPriv.get(cur, \"events\") || {})[event.type] && dataPriv.get(cur, \"handle\");\n\t\t\t\tif (handle) {\n\t\t\t\t\thandle.apply(cur, data);\n\t\t\t\t}\n\n\t\t\t\t// Native handler\n\t\t\t\thandle = ontype && cur[ontype];\n\t\t\t\tif (handle && handle.apply && acceptData(cur)) {\n\t\t\t\t\tevent.result = handle.apply(cur, data);\n\t\t\t\t\tif (event.result === false) {\n\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tevent.type = type;\n\n\t\t\t// If nobody prevented the default action, do it now\n\t\t\tif (!onlyHandlers && !event.isDefaultPrevented()) {\n\n\t\t\t\tif ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {\n\n\t\t\t\t\t// Call a native DOM method on the target with the same name as the event.\n\t\t\t\t\t// Don't do default actions on window, that's where global variables be (#6170)\n\t\t\t\t\tif (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {\n\n\t\t\t\t\t\t// Don't re-trigger an onFOO event when we call its FOO() method\n\t\t\t\t\t\ttmp = elem[ontype];\n\n\t\t\t\t\t\tif (tmp) {\n\t\t\t\t\t\t\telem[ontype] = null;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Prevent re-triggering of the same event, since we already bubbled it above\n\t\t\t\t\t\tjQuery.event.triggered = type;\n\t\t\t\t\t\telem[type]();\n\t\t\t\t\t\tjQuery.event.triggered = undefined;\n\n\t\t\t\t\t\tif (tmp) {\n\t\t\t\t\t\t\telem[ontype] = tmp;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn event.result;\n\t\t},\n\n\t\t// Piggyback on a donor event to simulate a different one\n\t\t// Used only for `focus(in | out)` events\n\t\tsimulate: function simulate(type, elem, event) {\n\t\t\tvar e = jQuery.extend(new jQuery.Event(), event, {\n\t\t\t\ttype: type,\n\t\t\t\tisSimulated: true\n\t\t\t});\n\n\t\t\tjQuery.event.trigger(e, null, elem);\n\t\t}\n\n\t});\n\n\tjQuery.fn.extend({\n\n\t\ttrigger: function trigger(type, data) {\n\t\t\treturn this.each(function () {\n\t\t\t\tjQuery.event.trigger(type, data, this);\n\t\t\t});\n\t\t},\n\t\ttriggerHandler: function triggerHandler(type, data) {\n\t\t\tvar elem = this[0];\n\t\t\tif (elem) {\n\t\t\t\treturn jQuery.event.trigger(type, data, elem, true);\n\t\t\t}\n\t\t}\n\t});\n\n\tjQuery.each((\"blur focus focusin focusout resize scroll click dblclick \" + \"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" + \"change select submit keydown keypress keyup contextmenu\").split(\" \"), function (i, name) {\n\n\t\t// Handle event binding\n\t\tjQuery.fn[name] = function (data, fn) {\n\t\t\treturn arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);\n\t\t};\n\t});\n\n\tjQuery.fn.extend({\n\t\thover: function hover(fnOver, fnOut) {\n\t\t\treturn this.mouseenter(fnOver).mouseleave(fnOut || fnOver);\n\t\t}\n\t});\n\n\tsupport.focusin = \"onfocusin\" in window;\n\n\t// Support: Firefox <=44\n\t// Firefox doesn't have focus(in | out) events\n\t// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787\n\t//\n\t// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1\n\t// focus(in | out) events fire after focus & blur events,\n\t// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order\n\t// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857\n\tif (!support.focusin) {\n\t\tjQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function (orig, fix) {\n\n\t\t\t// Attach a single capturing handler on the document while someone wants focusin/focusout\n\t\t\tvar handler = function handler(event) {\n\t\t\t\tjQuery.event.simulate(fix, event.target, jQuery.event.fix(event));\n\t\t\t};\n\n\t\t\tjQuery.event.special[fix] = {\n\t\t\t\tsetup: function setup() {\n\t\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\t    attaches = dataPriv.access(doc, fix);\n\n\t\t\t\t\tif (!attaches) {\n\t\t\t\t\t\tdoc.addEventListener(orig, handler, true);\n\t\t\t\t\t}\n\t\t\t\t\tdataPriv.access(doc, fix, (attaches || 0) + 1);\n\t\t\t\t},\n\t\t\t\tteardown: function teardown() {\n\t\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\t    attaches = dataPriv.access(doc, fix) - 1;\n\n\t\t\t\t\tif (!attaches) {\n\t\t\t\t\t\tdoc.removeEventListener(orig, handler, true);\n\t\t\t\t\t\tdataPriv.remove(doc, fix);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdataPriv.access(doc, fix, attaches);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\t\t});\n\t}\n\tvar location = window.location;\n\n\tvar nonce = jQuery.now();\n\n\tvar rquery = /\\?/;\n\n\t// Cross-browser xml parsing\n\tjQuery.parseXML = function (data) {\n\t\tvar xml;\n\t\tif (!data || typeof data !== \"string\") {\n\t\t\treturn null;\n\t\t}\n\n\t\t// Support: IE 9 - 11 only\n\t\t// IE throws on parseFromString with invalid input.\n\t\ttry {\n\t\t\txml = new window.DOMParser().parseFromString(data, \"text/xml\");\n\t\t} catch (e) {\n\t\t\txml = undefined;\n\t\t}\n\n\t\tif (!xml || xml.getElementsByTagName(\"parsererror\").length) {\n\t\t\tjQuery.error(\"Invalid XML: \" + data);\n\t\t}\n\t\treturn xml;\n\t};\n\n\tvar rbracket = /\\[\\]$/,\n\t    rCRLF = /\\r?\\n/g,\n\t    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n\t    rsubmittable = /^(?:input|select|textarea|keygen)/i;\n\n\tfunction buildParams(prefix, obj, traditional, add) {\n\t\tvar name;\n\n\t\tif (jQuery.isArray(obj)) {\n\n\t\t\t// Serialize array item.\n\t\t\tjQuery.each(obj, function (i, v) {\n\t\t\t\tif (traditional || rbracket.test(prefix)) {\n\n\t\t\t\t\t// Treat each array item as a scalar.\n\t\t\t\t\tadd(prefix, v);\n\t\t\t\t} else {\n\n\t\t\t\t\t// Item is non-scalar (array or object), encode its numeric index.\n\t\t\t\t\tbuildParams(prefix + \"[\" + ((typeof v === \"undefined\" ? \"undefined\" : _typeof(v)) === \"object\" && v != null ? i : \"\") + \"]\", v, traditional, add);\n\t\t\t\t}\n\t\t\t});\n\t\t} else if (!traditional && jQuery.type(obj) === \"object\") {\n\n\t\t\t// Serialize object item.\n\t\t\tfor (name in obj) {\n\t\t\t\tbuildParams(prefix + \"[\" + name + \"]\", obj[name], traditional, add);\n\t\t\t}\n\t\t} else {\n\n\t\t\t// Serialize scalar item.\n\t\t\tadd(prefix, obj);\n\t\t}\n\t}\n\n\t// Serialize an array of form elements or a set of\n\t// key/values into a query string\n\tjQuery.param = function (a, traditional) {\n\t\tvar prefix,\n\t\t    s = [],\n\t\t    add = function add(key, valueOrFunction) {\n\n\t\t\t// If value is a function, invoke it and use its return value\n\t\t\tvar value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;\n\n\t\t\ts[s.length] = encodeURIComponent(key) + \"=\" + encodeURIComponent(value == null ? \"\" : value);\n\t\t};\n\n\t\t// If an array was passed in, assume that it is an array of form elements.\n\t\tif (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {\n\n\t\t\t// Serialize the form elements\n\t\t\tjQuery.each(a, function () {\n\t\t\t\tadd(this.name, this.value);\n\t\t\t});\n\t\t} else {\n\n\t\t\t// If traditional, encode the \"old\" way (the way 1.3.2 or older\n\t\t\t// did it), otherwise encode params recursively.\n\t\t\tfor (prefix in a) {\n\t\t\t\tbuildParams(prefix, a[prefix], traditional, add);\n\t\t\t}\n\t\t}\n\n\t\t// Return the resulting serialization\n\t\treturn s.join(\"&\");\n\t};\n\n\tjQuery.fn.extend({\n\t\tserialize: function serialize() {\n\t\t\treturn jQuery.param(this.serializeArray());\n\t\t},\n\t\tserializeArray: function serializeArray() {\n\t\t\treturn this.map(function () {\n\n\t\t\t\t// Can add propHook for \"elements\" to filter or add form elements\n\t\t\t\tvar elements = jQuery.prop(this, \"elements\");\n\t\t\t\treturn elements ? jQuery.makeArray(elements) : this;\n\t\t\t}).filter(function () {\n\t\t\t\tvar type = this.type;\n\n\t\t\t\t// Use .is( \":disabled\" ) so that fieldset[disabled] works\n\t\t\t\treturn this.name && !jQuery(this).is(\":disabled\") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));\n\t\t\t}).map(function (i, elem) {\n\t\t\t\tvar val = jQuery(this).val();\n\n\t\t\t\tif (val == null) {\n\t\t\t\t\treturn null;\n\t\t\t\t}\n\n\t\t\t\tif (jQuery.isArray(val)) {\n\t\t\t\t\treturn jQuery.map(val, function (val) {\n\t\t\t\t\t\treturn { name: elem.name, value: val.replace(rCRLF, \"\\r\\n\") };\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\treturn { name: elem.name, value: val.replace(rCRLF, \"\\r\\n\") };\n\t\t\t}).get();\n\t\t}\n\t});\n\n\tvar r20 = /%20/g,\n\t    rhash = /#.*$/,\n\t    rantiCache = /([?&])_=[^&]*/,\n\t    rheaders = /^(.*?):[ \\t]*([^\\r\\n]*)$/mg,\n\n\n\t// #7653, #8125, #8152: local protocol detection\n\trlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n\t    rnoContent = /^(?:GET|HEAD)$/,\n\t    rprotocol = /^\\/\\//,\n\n\n\t/* Prefilters\n  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n  * 2) These are called:\n  *    - BEFORE asking for a transport\n  *    - AFTER param serialization (s.data is a string if s.processData is true)\n  * 3) key is the dataType\n  * 4) the catchall symbol \"*\" can be used\n  * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n  */\n\tprefilters = {},\n\n\n\t/* Transports bindings\n  * 1) key is the dataType\n  * 2) the catchall symbol \"*\" can be used\n  * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n  */\n\ttransports = {},\n\n\n\t// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n\tallTypes = \"*/\".concat(\"*\"),\n\n\n\t// Anchor tag for parsing the document origin\n\toriginAnchor = document.createElement(\"a\");\n\toriginAnchor.href = location.href;\n\n\t// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\n\tfunction addToPrefiltersOrTransports(structure) {\n\n\t\t// dataTypeExpression is optional and defaults to \"*\"\n\t\treturn function (dataTypeExpression, func) {\n\n\t\t\tif (typeof dataTypeExpression !== \"string\") {\n\t\t\t\tfunc = dataTypeExpression;\n\t\t\t\tdataTypeExpression = \"*\";\n\t\t\t}\n\n\t\t\tvar dataType,\n\t\t\t    i = 0,\n\t\t\t    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];\n\n\t\t\tif (jQuery.isFunction(func)) {\n\n\t\t\t\t// For each dataType in the dataTypeExpression\n\t\t\t\twhile (dataType = dataTypes[i++]) {\n\n\t\t\t\t\t// Prepend if requested\n\t\t\t\t\tif (dataType[0] === \"+\") {\n\t\t\t\t\t\tdataType = dataType.slice(1) || \"*\";\n\t\t\t\t\t\t(structure[dataType] = structure[dataType] || []).unshift(func);\n\n\t\t\t\t\t\t// Otherwise append\n\t\t\t\t\t} else {\n\t\t\t\t\t\t(structure[dataType] = structure[dataType] || []).push(func);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n\n\t// Base inspection function for prefilters and transports\n\tfunction inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {\n\n\t\tvar inspected = {},\n\t\t    seekingTransport = structure === transports;\n\n\t\tfunction inspect(dataType) {\n\t\t\tvar selected;\n\t\t\tinspected[dataType] = true;\n\t\t\tjQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {\n\t\t\t\tvar dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);\n\t\t\t\tif (typeof dataTypeOrTransport === \"string\" && !seekingTransport && !inspected[dataTypeOrTransport]) {\n\n\t\t\t\t\toptions.dataTypes.unshift(dataTypeOrTransport);\n\t\t\t\t\tinspect(dataTypeOrTransport);\n\t\t\t\t\treturn false;\n\t\t\t\t} else if (seekingTransport) {\n\t\t\t\t\treturn !(selected = dataTypeOrTransport);\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn selected;\n\t\t}\n\n\t\treturn inspect(options.dataTypes[0]) || !inspected[\"*\"] && inspect(\"*\");\n\t}\n\n\t// A special extend for ajax options\n\t// that takes \"flat\" options (not to be deep extended)\n\t// Fixes #9887\n\tfunction ajaxExtend(target, src) {\n\t\tvar key,\n\t\t    deep,\n\t\t    flatOptions = jQuery.ajaxSettings.flatOptions || {};\n\n\t\tfor (key in src) {\n\t\t\tif (src[key] !== undefined) {\n\t\t\t\t(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];\n\t\t\t}\n\t\t}\n\t\tif (deep) {\n\t\t\tjQuery.extend(true, target, deep);\n\t\t}\n\n\t\treturn target;\n\t}\n\n\t/* Handles responses to an ajax request:\n  * - finds the right dataType (mediates between content-type and expected dataType)\n  * - returns the corresponding response\n  */\n\tfunction ajaxHandleResponses(s, jqXHR, responses) {\n\n\t\tvar ct,\n\t\t    type,\n\t\t    finalDataType,\n\t\t    firstDataType,\n\t\t    contents = s.contents,\n\t\t    dataTypes = s.dataTypes;\n\n\t\t// Remove auto dataType and get content-type in the process\n\t\twhile (dataTypes[0] === \"*\") {\n\t\t\tdataTypes.shift();\n\t\t\tif (ct === undefined) {\n\t\t\t\tct = s.mimeType || jqXHR.getResponseHeader(\"Content-Type\");\n\t\t\t}\n\t\t}\n\n\t\t// Check if we're dealing with a known content-type\n\t\tif (ct) {\n\t\t\tfor (type in contents) {\n\t\t\t\tif (contents[type] && contents[type].test(ct)) {\n\t\t\t\t\tdataTypes.unshift(type);\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Check to see if we have a response for the expected dataType\n\t\tif (dataTypes[0] in responses) {\n\t\t\tfinalDataType = dataTypes[0];\n\t\t} else {\n\n\t\t\t// Try convertible dataTypes\n\t\t\tfor (type in responses) {\n\t\t\t\tif (!dataTypes[0] || s.converters[type + \" \" + dataTypes[0]]) {\n\t\t\t\t\tfinalDataType = type;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tif (!firstDataType) {\n\t\t\t\t\tfirstDataType = type;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Or just use first one\n\t\t\tfinalDataType = finalDataType || firstDataType;\n\t\t}\n\n\t\t// If we found a dataType\n\t\t// We add the dataType to the list if needed\n\t\t// and return the corresponding response\n\t\tif (finalDataType) {\n\t\t\tif (finalDataType !== dataTypes[0]) {\n\t\t\t\tdataTypes.unshift(finalDataType);\n\t\t\t}\n\t\t\treturn responses[finalDataType];\n\t\t}\n\t}\n\n\t/* Chain conversions given the request and the original response\n  * Also sets the responseXXX fields on the jqXHR instance\n  */\n\tfunction ajaxConvert(s, response, jqXHR, isSuccess) {\n\t\tvar conv2,\n\t\t    current,\n\t\t    conv,\n\t\t    tmp,\n\t\t    prev,\n\t\t    converters = {},\n\n\n\t\t// Work with a copy of dataTypes in case we need to modify it for conversion\n\t\tdataTypes = s.dataTypes.slice();\n\n\t\t// Create converters map with lowercased keys\n\t\tif (dataTypes[1]) {\n\t\t\tfor (conv in s.converters) {\n\t\t\t\tconverters[conv.toLowerCase()] = s.converters[conv];\n\t\t\t}\n\t\t}\n\n\t\tcurrent = dataTypes.shift();\n\n\t\t// Convert to each sequential dataType\n\t\twhile (current) {\n\n\t\t\tif (s.responseFields[current]) {\n\t\t\t\tjqXHR[s.responseFields[current]] = response;\n\t\t\t}\n\n\t\t\t// Apply the dataFilter if provided\n\t\t\tif (!prev && isSuccess && s.dataFilter) {\n\t\t\t\tresponse = s.dataFilter(response, s.dataType);\n\t\t\t}\n\n\t\t\tprev = current;\n\t\t\tcurrent = dataTypes.shift();\n\n\t\t\tif (current) {\n\n\t\t\t\t// There's only work to do if current dataType is non-auto\n\t\t\t\tif (current === \"*\") {\n\n\t\t\t\t\tcurrent = prev;\n\n\t\t\t\t\t// Convert response if prev dataType is non-auto and differs from current\n\t\t\t\t} else if (prev !== \"*\" && prev !== current) {\n\n\t\t\t\t\t// Seek a direct converter\n\t\t\t\t\tconv = converters[prev + \" \" + current] || converters[\"* \" + current];\n\n\t\t\t\t\t// If none found, seek a pair\n\t\t\t\t\tif (!conv) {\n\t\t\t\t\t\tfor (conv2 in converters) {\n\n\t\t\t\t\t\t\t// If conv2 outputs current\n\t\t\t\t\t\t\ttmp = conv2.split(\" \");\n\t\t\t\t\t\t\tif (tmp[1] === current) {\n\n\t\t\t\t\t\t\t\t// If prev can be converted to accepted input\n\t\t\t\t\t\t\t\tconv = converters[prev + \" \" + tmp[0]] || converters[\"* \" + tmp[0]];\n\t\t\t\t\t\t\t\tif (conv) {\n\n\t\t\t\t\t\t\t\t\t// Condense equivalence converters\n\t\t\t\t\t\t\t\t\tif (conv === true) {\n\t\t\t\t\t\t\t\t\t\tconv = converters[conv2];\n\n\t\t\t\t\t\t\t\t\t\t// Otherwise, insert the intermediate dataType\n\t\t\t\t\t\t\t\t\t} else if (converters[conv2] !== true) {\n\t\t\t\t\t\t\t\t\t\tcurrent = tmp[0];\n\t\t\t\t\t\t\t\t\t\tdataTypes.unshift(tmp[1]);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Apply converter (if not an equivalence)\n\t\t\t\t\tif (conv !== true) {\n\n\t\t\t\t\t\t// Unless errors are allowed to bubble, catch and return them\n\t\t\t\t\t\tif (conv && s.throws) {\n\t\t\t\t\t\t\tresponse = conv(response);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tresponse = conv(response);\n\t\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\tstate: \"parsererror\",\n\t\t\t\t\t\t\t\t\terror: conv ? e : \"No conversion from \" + prev + \" to \" + current\n\t\t\t\t\t\t\t\t};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn { state: \"success\", data: response };\n\t}\n\n\tjQuery.extend({\n\n\t\t// Counter for holding the number of active queries\n\t\tactive: 0,\n\n\t\t// Last-Modified header cache for next request\n\t\tlastModified: {},\n\t\tetag: {},\n\n\t\tajaxSettings: {\n\t\t\turl: location.href,\n\t\t\ttype: \"GET\",\n\t\t\tisLocal: rlocalProtocol.test(location.protocol),\n\t\t\tglobal: true,\n\t\t\tprocessData: true,\n\t\t\tasync: true,\n\t\t\tcontentType: \"application/x-www-form-urlencoded; charset=UTF-8\",\n\n\t\t\t/*\n   timeout: 0,\n   data: null,\n   dataType: null,\n   username: null,\n   password: null,\n   cache: null,\n   throws: false,\n   traditional: false,\n   headers: {},\n   */\n\n\t\t\taccepts: {\n\t\t\t\t\"*\": allTypes,\n\t\t\t\ttext: \"text/plain\",\n\t\t\t\thtml: \"text/html\",\n\t\t\t\txml: \"application/xml, text/xml\",\n\t\t\t\tjson: \"application/json, text/javascript\"\n\t\t\t},\n\n\t\t\tcontents: {\n\t\t\t\txml: /\\bxml\\b/,\n\t\t\t\thtml: /\\bhtml/,\n\t\t\t\tjson: /\\bjson\\b/\n\t\t\t},\n\n\t\t\tresponseFields: {\n\t\t\t\txml: \"responseXML\",\n\t\t\t\ttext: \"responseText\",\n\t\t\t\tjson: \"responseJSON\"\n\t\t\t},\n\n\t\t\t// Data converters\n\t\t\t// Keys separate source (or catchall \"*\") and destination types with a single space\n\t\t\tconverters: {\n\n\t\t\t\t// Convert anything to text\n\t\t\t\t\"* text\": String,\n\n\t\t\t\t// Text to html (true = no transformation)\n\t\t\t\t\"text html\": true,\n\n\t\t\t\t// Evaluate text as a json expression\n\t\t\t\t\"text json\": JSON.parse,\n\n\t\t\t\t// Parse text as xml\n\t\t\t\t\"text xml\": jQuery.parseXML\n\t\t\t},\n\n\t\t\t// For options that shouldn't be deep extended:\n\t\t\t// you can add your own custom options here if\n\t\t\t// and when you create one that shouldn't be\n\t\t\t// deep extended (see ajaxExtend)\n\t\t\tflatOptions: {\n\t\t\t\turl: true,\n\t\t\t\tcontext: true\n\t\t\t}\n\t\t},\n\n\t\t// Creates a full fledged settings object into target\n\t\t// with both ajaxSettings and settings fields.\n\t\t// If target is omitted, writes into ajaxSettings.\n\t\tajaxSetup: function ajaxSetup(target, settings) {\n\t\t\treturn settings ?\n\n\t\t\t// Building a settings object\n\t\t\tajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :\n\n\t\t\t// Extending ajaxSettings\n\t\t\tajaxExtend(jQuery.ajaxSettings, target);\n\t\t},\n\n\t\tajaxPrefilter: addToPrefiltersOrTransports(prefilters),\n\t\tajaxTransport: addToPrefiltersOrTransports(transports),\n\n\t\t// Main method\n\t\tajax: function ajax(url, options) {\n\n\t\t\t// If url is an object, simulate pre-1.5 signature\n\t\t\tif ((typeof url === \"undefined\" ? \"undefined\" : _typeof(url)) === \"object\") {\n\t\t\t\toptions = url;\n\t\t\t\turl = undefined;\n\t\t\t}\n\n\t\t\t// Force options to be an object\n\t\t\toptions = options || {};\n\n\t\t\tvar transport,\n\n\n\t\t\t// URL without anti-cache param\n\t\t\tcacheURL,\n\n\n\t\t\t// Response headers\n\t\t\tresponseHeadersString,\n\t\t\t    responseHeaders,\n\n\n\t\t\t// timeout handle\n\t\t\ttimeoutTimer,\n\n\n\t\t\t// Url cleanup var\n\t\t\turlAnchor,\n\n\n\t\t\t// Request state (becomes false upon send and true upon completion)\n\t\t\tcompleted,\n\n\n\t\t\t// To know if global events are to be dispatched\n\t\t\tfireGlobals,\n\n\n\t\t\t// Loop variable\n\t\t\ti,\n\n\n\t\t\t// uncached part of the url\n\t\t\tuncached,\n\n\n\t\t\t// Create the final options object\n\t\t\ts = jQuery.ajaxSetup({}, options),\n\n\n\t\t\t// Callbacks context\n\t\t\tcallbackContext = s.context || s,\n\n\n\t\t\t// Context for global events is callbackContext if it is a DOM node or jQuery collection\n\t\t\tglobalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,\n\n\n\t\t\t// Deferreds\n\t\t\tdeferred = jQuery.Deferred(),\n\t\t\t    completeDeferred = jQuery.Callbacks(\"once memory\"),\n\n\n\t\t\t// Status-dependent callbacks\n\t\t\t_statusCode = s.statusCode || {},\n\n\n\t\t\t// Headers (they are sent all at once)\n\t\t\trequestHeaders = {},\n\t\t\t    requestHeadersNames = {},\n\n\n\t\t\t// Default abort message\n\t\t\tstrAbort = \"canceled\",\n\n\n\t\t\t// Fake xhr\n\t\t\tjqXHR = {\n\t\t\t\treadyState: 0,\n\n\t\t\t\t// Builds headers hashtable if needed\n\t\t\t\tgetResponseHeader: function getResponseHeader(key) {\n\t\t\t\t\tvar match;\n\t\t\t\t\tif (completed) {\n\t\t\t\t\t\tif (!responseHeaders) {\n\t\t\t\t\t\t\tresponseHeaders = {};\n\t\t\t\t\t\t\twhile (match = rheaders.exec(responseHeadersString)) {\n\t\t\t\t\t\t\t\tresponseHeaders[match[1].toLowerCase()] = match[2];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmatch = responseHeaders[key.toLowerCase()];\n\t\t\t\t\t}\n\t\t\t\t\treturn match == null ? null : match;\n\t\t\t\t},\n\n\t\t\t\t// Raw string\n\t\t\t\tgetAllResponseHeaders: function getAllResponseHeaders() {\n\t\t\t\t\treturn completed ? responseHeadersString : null;\n\t\t\t\t},\n\n\t\t\t\t// Caches the header\n\t\t\t\tsetRequestHeader: function setRequestHeader(name, value) {\n\t\t\t\t\tif (completed == null) {\n\t\t\t\t\t\tname = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;\n\t\t\t\t\t\trequestHeaders[name] = value;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Overrides response content-type header\n\t\t\t\toverrideMimeType: function overrideMimeType(type) {\n\t\t\t\t\tif (completed == null) {\n\t\t\t\t\t\ts.mimeType = type;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Status-dependent callbacks\n\t\t\t\tstatusCode: function statusCode(map) {\n\t\t\t\t\tvar code;\n\t\t\t\t\tif (map) {\n\t\t\t\t\t\tif (completed) {\n\n\t\t\t\t\t\t\t// Execute the appropriate callbacks\n\t\t\t\t\t\t\tjqXHR.always(map[jqXHR.status]);\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t// Lazy-add the new callbacks in a way that preserves old ones\n\t\t\t\t\t\t\tfor (code in map) {\n\t\t\t\t\t\t\t\t_statusCode[code] = [_statusCode[code], map[code]];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Cancel the request\n\t\t\t\tabort: function abort(statusText) {\n\t\t\t\t\tvar finalText = statusText || strAbort;\n\t\t\t\t\tif (transport) {\n\t\t\t\t\t\ttransport.abort(finalText);\n\t\t\t\t\t}\n\t\t\t\t\tdone(0, finalText);\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t};\n\n\t\t\t// Attach deferreds\n\t\t\tdeferred.promise(jqXHR);\n\n\t\t\t// Add protocol if not provided (prefilters might expect it)\n\t\t\t// Handle falsy url in the settings object (#10093: consistency with old signature)\n\t\t\t// We also use the url parameter if available\n\t\t\ts.url = ((url || s.url || location.href) + \"\").replace(rprotocol, location.protocol + \"//\");\n\n\t\t\t// Alias method option to type as per ticket #12004\n\t\t\ts.type = options.method || options.type || s.method || s.type;\n\n\t\t\t// Extract dataTypes list\n\t\t\ts.dataTypes = (s.dataType || \"*\").toLowerCase().match(rnothtmlwhite) || [\"\"];\n\n\t\t\t// A cross-domain request is in order when the origin doesn't match the current origin.\n\t\t\tif (s.crossDomain == null) {\n\t\t\t\turlAnchor = document.createElement(\"a\");\n\n\t\t\t\t// Support: IE <=8 - 11, Edge 12 - 13\n\t\t\t\t// IE throws exception on accessing the href property if url is malformed,\n\t\t\t\t// e.g. http://example.com:80x/\n\t\t\t\ttry {\n\t\t\t\t\turlAnchor.href = s.url;\n\n\t\t\t\t\t// Support: IE <=8 - 11 only\n\t\t\t\t\t// Anchor's host property isn't correctly set when s.url is relative\n\t\t\t\t\turlAnchor.href = urlAnchor.href;\n\t\t\t\t\ts.crossDomain = originAnchor.protocol + \"//\" + originAnchor.host !== urlAnchor.protocol + \"//\" + urlAnchor.host;\n\t\t\t\t} catch (e) {\n\n\t\t\t\t\t// If there is an error parsing the URL, assume it is crossDomain,\n\t\t\t\t\t// it can be rejected by the transport if it is invalid\n\t\t\t\t\ts.crossDomain = true;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Convert data if not already a string\n\t\t\tif (s.data && s.processData && typeof s.data !== \"string\") {\n\t\t\t\ts.data = jQuery.param(s.data, s.traditional);\n\t\t\t}\n\n\t\t\t// Apply prefilters\n\t\t\tinspectPrefiltersOrTransports(prefilters, s, options, jqXHR);\n\n\t\t\t// If request was aborted inside a prefilter, stop there\n\t\t\tif (completed) {\n\t\t\t\treturn jqXHR;\n\t\t\t}\n\n\t\t\t// We can fire global events as of now if asked to\n\t\t\t// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)\n\t\t\tfireGlobals = jQuery.event && s.global;\n\n\t\t\t// Watch for a new set of requests\n\t\t\tif (fireGlobals && jQuery.active++ === 0) {\n\t\t\t\tjQuery.event.trigger(\"ajaxStart\");\n\t\t\t}\n\n\t\t\t// Uppercase the type\n\t\t\ts.type = s.type.toUpperCase();\n\n\t\t\t// Determine if request has content\n\t\t\ts.hasContent = !rnoContent.test(s.type);\n\n\t\t\t// Save the URL in case we're toying with the If-Modified-Since\n\t\t\t// and/or If-None-Match header later on\n\t\t\t// Remove hash to simplify url manipulation\n\t\t\tcacheURL = s.url.replace(rhash, \"\");\n\n\t\t\t// More options handling for requests with no content\n\t\t\tif (!s.hasContent) {\n\n\t\t\t\t// Remember the hash so we can put it back\n\t\t\t\tuncached = s.url.slice(cacheURL.length);\n\n\t\t\t\t// If data is available, append data to url\n\t\t\t\tif (s.data) {\n\t\t\t\t\tcacheURL += (rquery.test(cacheURL) ? \"&\" : \"?\") + s.data;\n\n\t\t\t\t\t// #9682: remove data so that it's not used in an eventual retry\n\t\t\t\t\tdelete s.data;\n\t\t\t\t}\n\n\t\t\t\t// Add or update anti-cache param if needed\n\t\t\t\tif (s.cache === false) {\n\t\t\t\t\tcacheURL = cacheURL.replace(rantiCache, \"$1\");\n\t\t\t\t\tuncached = (rquery.test(cacheURL) ? \"&\" : \"?\") + \"_=\" + nonce++ + uncached;\n\t\t\t\t}\n\n\t\t\t\t// Put hash and anti-cache on the URL that will be requested (gh-1732)\n\t\t\t\ts.url = cacheURL + uncached;\n\n\t\t\t\t// Change '%20' to '+' if this is encoded form body content (gh-2658)\n\t\t\t} else if (s.data && s.processData && (s.contentType || \"\").indexOf(\"application/x-www-form-urlencoded\") === 0) {\n\t\t\t\ts.data = s.data.replace(r20, \"+\");\n\t\t\t}\n\n\t\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\t\tif (s.ifModified) {\n\t\t\t\tif (jQuery.lastModified[cacheURL]) {\n\t\t\t\t\tjqXHR.setRequestHeader(\"If-Modified-Since\", jQuery.lastModified[cacheURL]);\n\t\t\t\t}\n\t\t\t\tif (jQuery.etag[cacheURL]) {\n\t\t\t\t\tjqXHR.setRequestHeader(\"If-None-Match\", jQuery.etag[cacheURL]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Set the correct header, if data is being sent\n\t\t\tif (s.data && s.hasContent && s.contentType !== false || options.contentType) {\n\t\t\t\tjqXHR.setRequestHeader(\"Content-Type\", s.contentType);\n\t\t\t}\n\n\t\t\t// Set the Accepts header for the server, depending on the dataType\n\t\t\tjqXHR.setRequestHeader(\"Accept\", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\") : s.accepts[\"*\"]);\n\n\t\t\t// Check for headers option\n\t\t\tfor (i in s.headers) {\n\t\t\t\tjqXHR.setRequestHeader(i, s.headers[i]);\n\t\t\t}\n\n\t\t\t// Allow custom headers/mimetypes and early abort\n\t\t\tif (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {\n\n\t\t\t\t// Abort if not done already and return\n\t\t\t\treturn jqXHR.abort();\n\t\t\t}\n\n\t\t\t// Aborting is no longer a cancellation\n\t\t\tstrAbort = \"abort\";\n\n\t\t\t// Install callbacks on deferreds\n\t\t\tcompleteDeferred.add(s.complete);\n\t\t\tjqXHR.done(s.success);\n\t\t\tjqXHR.fail(s.error);\n\n\t\t\t// Get transport\n\t\t\ttransport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);\n\n\t\t\t// If no transport, we auto-abort\n\t\t\tif (!transport) {\n\t\t\t\tdone(-1, \"No Transport\");\n\t\t\t} else {\n\t\t\t\tjqXHR.readyState = 1;\n\n\t\t\t\t// Send global event\n\t\t\t\tif (fireGlobals) {\n\t\t\t\t\tglobalEventContext.trigger(\"ajaxSend\", [jqXHR, s]);\n\t\t\t\t}\n\n\t\t\t\t// If request was aborted inside ajaxSend, stop there\n\t\t\t\tif (completed) {\n\t\t\t\t\treturn jqXHR;\n\t\t\t\t}\n\n\t\t\t\t// Timeout\n\t\t\t\tif (s.async && s.timeout > 0) {\n\t\t\t\t\ttimeoutTimer = window.setTimeout(function () {\n\t\t\t\t\t\tjqXHR.abort(\"timeout\");\n\t\t\t\t\t}, s.timeout);\n\t\t\t\t}\n\n\t\t\t\ttry {\n\t\t\t\t\tcompleted = false;\n\t\t\t\t\ttransport.send(requestHeaders, done);\n\t\t\t\t} catch (e) {\n\n\t\t\t\t\t// Rethrow post-completion exceptions\n\t\t\t\t\tif (completed) {\n\t\t\t\t\t\tthrow e;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Propagate others as results\n\t\t\t\t\tdone(-1, e);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Callback for when everything is done\n\t\t\tfunction done(status, nativeStatusText, responses, headers) {\n\t\t\t\tvar isSuccess,\n\t\t\t\t    success,\n\t\t\t\t    error,\n\t\t\t\t    response,\n\t\t\t\t    modified,\n\t\t\t\t    statusText = nativeStatusText;\n\n\t\t\t\t// Ignore repeat invocations\n\t\t\t\tif (completed) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tcompleted = true;\n\n\t\t\t\t// Clear timeout if it exists\n\t\t\t\tif (timeoutTimer) {\n\t\t\t\t\twindow.clearTimeout(timeoutTimer);\n\t\t\t\t}\n\n\t\t\t\t// Dereference transport for early garbage collection\n\t\t\t\t// (no matter how long the jqXHR object will be used)\n\t\t\t\ttransport = undefined;\n\n\t\t\t\t// Cache response headers\n\t\t\t\tresponseHeadersString = headers || \"\";\n\n\t\t\t\t// Set readyState\n\t\t\t\tjqXHR.readyState = status > 0 ? 4 : 0;\n\n\t\t\t\t// Determine if successful\n\t\t\t\tisSuccess = status >= 200 && status < 300 || status === 304;\n\n\t\t\t\t// Get response data\n\t\t\t\tif (responses) {\n\t\t\t\t\tresponse = ajaxHandleResponses(s, jqXHR, responses);\n\t\t\t\t}\n\n\t\t\t\t// Convert no matter what (that way responseXXX fields are always set)\n\t\t\t\tresponse = ajaxConvert(s, response, jqXHR, isSuccess);\n\n\t\t\t\t// If successful, handle type chaining\n\t\t\t\tif (isSuccess) {\n\n\t\t\t\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\t\t\t\tif (s.ifModified) {\n\t\t\t\t\t\tmodified = jqXHR.getResponseHeader(\"Last-Modified\");\n\t\t\t\t\t\tif (modified) {\n\t\t\t\t\t\t\tjQuery.lastModified[cacheURL] = modified;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmodified = jqXHR.getResponseHeader(\"etag\");\n\t\t\t\t\t\tif (modified) {\n\t\t\t\t\t\t\tjQuery.etag[cacheURL] = modified;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// if no content\n\t\t\t\t\tif (status === 204 || s.type === \"HEAD\") {\n\t\t\t\t\t\tstatusText = \"nocontent\";\n\n\t\t\t\t\t\t// if not modified\n\t\t\t\t\t} else if (status === 304) {\n\t\t\t\t\t\tstatusText = \"notmodified\";\n\n\t\t\t\t\t\t// If we have data, let's convert it\n\t\t\t\t\t} else {\n\t\t\t\t\t\tstatusText = response.state;\n\t\t\t\t\t\tsuccess = response.data;\n\t\t\t\t\t\terror = response.error;\n\t\t\t\t\t\tisSuccess = !error;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\n\t\t\t\t\t// Extract error from statusText and normalize for non-aborts\n\t\t\t\t\terror = statusText;\n\t\t\t\t\tif (status || !statusText) {\n\t\t\t\t\t\tstatusText = \"error\";\n\t\t\t\t\t\tif (status < 0) {\n\t\t\t\t\t\t\tstatus = 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Set data for the fake xhr object\n\t\t\t\tjqXHR.status = status;\n\t\t\t\tjqXHR.statusText = (nativeStatusText || statusText) + \"\";\n\n\t\t\t\t// Success/Error\n\t\t\t\tif (isSuccess) {\n\t\t\t\t\tdeferred.resolveWith(callbackContext, [success, statusText, jqXHR]);\n\t\t\t\t} else {\n\t\t\t\t\tdeferred.rejectWith(callbackContext, [jqXHR, statusText, error]);\n\t\t\t\t}\n\n\t\t\t\t// Status-dependent callbacks\n\t\t\t\tjqXHR.statusCode(_statusCode);\n\t\t\t\t_statusCode = undefined;\n\n\t\t\t\tif (fireGlobals) {\n\t\t\t\t\tglobalEventContext.trigger(isSuccess ? \"ajaxSuccess\" : \"ajaxError\", [jqXHR, s, isSuccess ? success : error]);\n\t\t\t\t}\n\n\t\t\t\t// Complete\n\t\t\t\tcompleteDeferred.fireWith(callbackContext, [jqXHR, statusText]);\n\n\t\t\t\tif (fireGlobals) {\n\t\t\t\t\tglobalEventContext.trigger(\"ajaxComplete\", [jqXHR, s]);\n\n\t\t\t\t\t// Handle the global AJAX counter\n\t\t\t\t\tif (! --jQuery.active) {\n\t\t\t\t\t\tjQuery.event.trigger(\"ajaxStop\");\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn jqXHR;\n\t\t},\n\n\t\tgetJSON: function getJSON(url, data, callback) {\n\t\t\treturn jQuery.get(url, data, callback, \"json\");\n\t\t},\n\n\t\tgetScript: function getScript(url, callback) {\n\t\t\treturn jQuery.get(url, undefined, callback, \"script\");\n\t\t}\n\t});\n\n\tjQuery.each([\"get\", \"post\"], function (i, method) {\n\t\tjQuery[method] = function (url, data, callback, type) {\n\n\t\t\t// Shift arguments if data argument was omitted\n\t\t\tif (jQuery.isFunction(data)) {\n\t\t\t\ttype = type || callback;\n\t\t\t\tcallback = data;\n\t\t\t\tdata = undefined;\n\t\t\t}\n\n\t\t\t// The url can be an options object (which then must have .url)\n\t\t\treturn jQuery.ajax(jQuery.extend({\n\t\t\t\turl: url,\n\t\t\t\ttype: method,\n\t\t\t\tdataType: type,\n\t\t\t\tdata: data,\n\t\t\t\tsuccess: callback\n\t\t\t}, jQuery.isPlainObject(url) && url));\n\t\t};\n\t});\n\n\tjQuery._evalUrl = function (url) {\n\t\treturn jQuery.ajax({\n\t\t\turl: url,\n\n\t\t\t// Make this explicit, since user can override this through ajaxSetup (#11264)\n\t\t\ttype: \"GET\",\n\t\t\tdataType: \"script\",\n\t\t\tcache: true,\n\t\t\tasync: false,\n\t\t\tglobal: false,\n\t\t\t\"throws\": true\n\t\t});\n\t};\n\n\tjQuery.fn.extend({\n\t\twrapAll: function wrapAll(html) {\n\t\t\tvar wrap;\n\n\t\t\tif (this[0]) {\n\t\t\t\tif (jQuery.isFunction(html)) {\n\t\t\t\t\thtml = html.call(this[0]);\n\t\t\t\t}\n\n\t\t\t\t// The elements to wrap the target around\n\t\t\t\twrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);\n\n\t\t\t\tif (this[0].parentNode) {\n\t\t\t\t\twrap.insertBefore(this[0]);\n\t\t\t\t}\n\n\t\t\t\twrap.map(function () {\n\t\t\t\t\tvar elem = this;\n\n\t\t\t\t\twhile (elem.firstElementChild) {\n\t\t\t\t\t\telem = elem.firstElementChild;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn elem;\n\t\t\t\t}).append(this);\n\t\t\t}\n\n\t\t\treturn this;\n\t\t},\n\n\t\twrapInner: function wrapInner(html) {\n\t\t\tif (jQuery.isFunction(html)) {\n\t\t\t\treturn this.each(function (i) {\n\t\t\t\t\tjQuery(this).wrapInner(html.call(this, i));\n\t\t\t\t});\n\t\t\t}\n\n\t\t\treturn this.each(function () {\n\t\t\t\tvar self = jQuery(this),\n\t\t\t\t    contents = self.contents();\n\n\t\t\t\tif (contents.length) {\n\t\t\t\t\tcontents.wrapAll(html);\n\t\t\t\t} else {\n\t\t\t\t\tself.append(html);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\twrap: function wrap(html) {\n\t\t\tvar isFunction = jQuery.isFunction(html);\n\n\t\t\treturn this.each(function (i) {\n\t\t\t\tjQuery(this).wrapAll(isFunction ? html.call(this, i) : html);\n\t\t\t});\n\t\t},\n\n\t\tunwrap: function unwrap(selector) {\n\t\t\tthis.parent(selector).not(\"body\").each(function () {\n\t\t\t\tjQuery(this).replaceWith(this.childNodes);\n\t\t\t});\n\t\t\treturn this;\n\t\t}\n\t});\n\n\tjQuery.expr.pseudos.hidden = function (elem) {\n\t\treturn !jQuery.expr.pseudos.visible(elem);\n\t};\n\tjQuery.expr.pseudos.visible = function (elem) {\n\t\treturn !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);\n\t};\n\n\tjQuery.ajaxSettings.xhr = function () {\n\t\ttry {\n\t\t\treturn new window.XMLHttpRequest();\n\t\t} catch (e) {}\n\t};\n\n\tvar xhrSuccessStatus = {\n\n\t\t// File protocol always yields status code 0, assume 200\n\t\t0: 200,\n\n\t\t// Support: IE <=9 only\n\t\t// #1450: sometimes IE returns 1223 when it should be 204\n\t\t1223: 204\n\t},\n\t    xhrSupported = jQuery.ajaxSettings.xhr();\n\n\tsupport.cors = !!xhrSupported && \"withCredentials\" in xhrSupported;\n\tsupport.ajax = xhrSupported = !!xhrSupported;\n\n\tjQuery.ajaxTransport(function (options) {\n\t\tvar _callback, errorCallback;\n\n\t\t// Cross domain only allowed if supported through XMLHttpRequest\n\t\tif (support.cors || xhrSupported && !options.crossDomain) {\n\t\t\treturn {\n\t\t\t\tsend: function send(headers, complete) {\n\t\t\t\t\tvar i,\n\t\t\t\t\t    xhr = options.xhr();\n\n\t\t\t\t\txhr.open(options.type, options.url, options.async, options.username, options.password);\n\n\t\t\t\t\t// Apply custom fields if provided\n\t\t\t\t\tif (options.xhrFields) {\n\t\t\t\t\t\tfor (i in options.xhrFields) {\n\t\t\t\t\t\t\txhr[i] = options.xhrFields[i];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Override mime type if needed\n\t\t\t\t\tif (options.mimeType && xhr.overrideMimeType) {\n\t\t\t\t\t\txhr.overrideMimeType(options.mimeType);\n\t\t\t\t\t}\n\n\t\t\t\t\t// X-Requested-With header\n\t\t\t\t\t// For cross-domain requests, seeing as conditions for a preflight are\n\t\t\t\t\t// akin to a jigsaw puzzle, we simply never set it to be sure.\n\t\t\t\t\t// (it can always be set on a per-request basis or even using ajaxSetup)\n\t\t\t\t\t// For same-domain requests, won't change header if already provided.\n\t\t\t\t\tif (!options.crossDomain && !headers[\"X-Requested-With\"]) {\n\t\t\t\t\t\theaders[\"X-Requested-With\"] = \"XMLHttpRequest\";\n\t\t\t\t\t}\n\n\t\t\t\t\t// Set headers\n\t\t\t\t\tfor (i in headers) {\n\t\t\t\t\t\txhr.setRequestHeader(i, headers[i]);\n\t\t\t\t\t}\n\n\t\t\t\t\t// Callback\n\t\t\t\t\t_callback = function callback(type) {\n\t\t\t\t\t\treturn function () {\n\t\t\t\t\t\t\tif (_callback) {\n\t\t\t\t\t\t\t\t_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;\n\n\t\t\t\t\t\t\t\tif (type === \"abort\") {\n\t\t\t\t\t\t\t\t\txhr.abort();\n\t\t\t\t\t\t\t\t} else if (type === \"error\") {\n\n\t\t\t\t\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t\t\t\t\t// On a manual native abort, IE9 throws\n\t\t\t\t\t\t\t\t\t// errors on any property access that is not readyState\n\t\t\t\t\t\t\t\t\tif (typeof xhr.status !== \"number\") {\n\t\t\t\t\t\t\t\t\t\tcomplete(0, \"error\");\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tcomplete(\n\n\t\t\t\t\t\t\t\t\t\t// File: protocol always yields status 0; see #8605, #14207\n\t\t\t\t\t\t\t\t\t\txhr.status, xhr.statusText);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tcomplete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,\n\n\t\t\t\t\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t\t\t\t\t// IE9 has no XHR2 but throws on binary (trac-11426)\n\t\t\t\t\t\t\t\t\t// For XHR2 non-text, let the caller handle it (gh-2498)\n\t\t\t\t\t\t\t\t\t(xhr.responseType || \"text\") !== \"text\" || typeof xhr.responseText !== \"string\" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t};\n\n\t\t\t\t\t// Listen to events\n\t\t\t\t\txhr.onload = _callback();\n\t\t\t\t\terrorCallback = xhr.onerror = _callback(\"error\");\n\n\t\t\t\t\t// Support: IE 9 only\n\t\t\t\t\t// Use onreadystatechange to replace onabort\n\t\t\t\t\t// to handle uncaught aborts\n\t\t\t\t\tif (xhr.onabort !== undefined) {\n\t\t\t\t\t\txhr.onabort = errorCallback;\n\t\t\t\t\t} else {\n\t\t\t\t\t\txhr.onreadystatechange = function () {\n\n\t\t\t\t\t\t\t// Check readyState before timeout as it changes\n\t\t\t\t\t\t\tif (xhr.readyState === 4) {\n\n\t\t\t\t\t\t\t\t// Allow onerror to be called first,\n\t\t\t\t\t\t\t\t// but that will not handle a native abort\n\t\t\t\t\t\t\t\t// Also, save errorCallback to a variable\n\t\t\t\t\t\t\t\t// as xhr.onerror cannot be accessed\n\t\t\t\t\t\t\t\twindow.setTimeout(function () {\n\t\t\t\t\t\t\t\t\tif (_callback) {\n\t\t\t\t\t\t\t\t\t\terrorCallback();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\n\t\t\t\t\t// Create the abort callback\n\t\t\t\t\t_callback = _callback(\"abort\");\n\n\t\t\t\t\ttry {\n\n\t\t\t\t\t\t// Do send the request (this may raise an exception)\n\t\t\t\t\t\txhr.send(options.hasContent && options.data || null);\n\t\t\t\t\t} catch (e) {\n\n\t\t\t\t\t\t// #14683: Only rethrow if this hasn't been notified as an error yet\n\t\t\t\t\t\tif (_callback) {\n\t\t\t\t\t\t\tthrow e;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t},\n\n\t\t\t\tabort: function abort() {\n\t\t\t\t\tif (_callback) {\n\t\t\t\t\t\t_callback();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t});\n\n\t// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)\n\tjQuery.ajaxPrefilter(function (s) {\n\t\tif (s.crossDomain) {\n\t\t\ts.contents.script = false;\n\t\t}\n\t});\n\n\t// Install script dataType\n\tjQuery.ajaxSetup({\n\t\taccepts: {\n\t\t\tscript: \"text/javascript, application/javascript, \" + \"application/ecmascript, application/x-ecmascript\"\n\t\t},\n\t\tcontents: {\n\t\t\tscript: /\\b(?:java|ecma)script\\b/\n\t\t},\n\t\tconverters: {\n\t\t\t\"text script\": function textScript(text) {\n\t\t\t\tjQuery.globalEval(text);\n\t\t\t\treturn text;\n\t\t\t}\n\t\t}\n\t});\n\n\t// Handle cache's special case and crossDomain\n\tjQuery.ajaxPrefilter(\"script\", function (s) {\n\t\tif (s.cache === undefined) {\n\t\t\ts.cache = false;\n\t\t}\n\t\tif (s.crossDomain) {\n\t\t\ts.type = \"GET\";\n\t\t}\n\t});\n\n\t// Bind script tag hack transport\n\tjQuery.ajaxTransport(\"script\", function (s) {\n\n\t\t// This transport only deals with cross domain requests\n\t\tif (s.crossDomain) {\n\t\t\tvar script, _callback2;\n\t\t\treturn {\n\t\t\t\tsend: function send(_, complete) {\n\t\t\t\t\tscript = jQuery(\"<script>\").prop({\n\t\t\t\t\t\tcharset: s.scriptCharset,\n\t\t\t\t\t\tsrc: s.url\n\t\t\t\t\t}).on(\"load error\", _callback2 = function callback(evt) {\n\t\t\t\t\t\tscript.remove();\n\t\t\t\t\t\t_callback2 = null;\n\t\t\t\t\t\tif (evt) {\n\t\t\t\t\t\t\tcomplete(evt.type === \"error\" ? 404 : 200, evt.type);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\n\t\t\t\t\t// Use native DOM manipulation to avoid our domManip AJAX trickery\n\t\t\t\t\tdocument.head.appendChild(script[0]);\n\t\t\t\t},\n\t\t\t\tabort: function abort() {\n\t\t\t\t\tif (_callback2) {\n\t\t\t\t\t\t_callback2();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t});\n\n\tvar oldCallbacks = [],\n\t    rjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\n\t// Default jsonp settings\n\tjQuery.ajaxSetup({\n\t\tjsonp: \"callback\",\n\t\tjsonpCallback: function jsonpCallback() {\n\t\t\tvar callback = oldCallbacks.pop() || jQuery.expando + \"_\" + nonce++;\n\t\t\tthis[callback] = true;\n\t\t\treturn callback;\n\t\t}\n\t});\n\n\t// Detect, normalize options and install callbacks for jsonp requests\n\tjQuery.ajaxPrefilter(\"json jsonp\", function (s, originalSettings, jqXHR) {\n\n\t\tvar callbackName,\n\t\t    overwritten,\n\t\t    responseContainer,\n\t\t    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? \"url\" : typeof s.data === \"string\" && (s.contentType || \"\").indexOf(\"application/x-www-form-urlencoded\") === 0 && rjsonp.test(s.data) && \"data\");\n\n\t\t// Handle iff the expected data type is \"jsonp\" or we have a parameter to set\n\t\tif (jsonProp || s.dataTypes[0] === \"jsonp\") {\n\n\t\t\t// Get callback name, remembering preexisting value associated with it\n\t\t\tcallbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;\n\n\t\t\t// Insert callback into url or form data\n\t\t\tif (jsonProp) {\n\t\t\t\ts[jsonProp] = s[jsonProp].replace(rjsonp, \"$1\" + callbackName);\n\t\t\t} else if (s.jsonp !== false) {\n\t\t\t\ts.url += (rquery.test(s.url) ? \"&\" : \"?\") + s.jsonp + \"=\" + callbackName;\n\t\t\t}\n\n\t\t\t// Use data converter to retrieve json after script execution\n\t\t\ts.converters[\"script json\"] = function () {\n\t\t\t\tif (!responseContainer) {\n\t\t\t\t\tjQuery.error(callbackName + \" was not called\");\n\t\t\t\t}\n\t\t\t\treturn responseContainer[0];\n\t\t\t};\n\n\t\t\t// Force json dataType\n\t\t\ts.dataTypes[0] = \"json\";\n\n\t\t\t// Install callback\n\t\t\toverwritten = window[callbackName];\n\t\t\twindow[callbackName] = function () {\n\t\t\t\tresponseContainer = arguments;\n\t\t\t};\n\n\t\t\t// Clean-up function (fires after converters)\n\t\t\tjqXHR.always(function () {\n\n\t\t\t\t// If previous value didn't exist - remove it\n\t\t\t\tif (overwritten === undefined) {\n\t\t\t\t\tjQuery(window).removeProp(callbackName);\n\n\t\t\t\t\t// Otherwise restore preexisting value\n\t\t\t\t} else {\n\t\t\t\t\twindow[callbackName] = overwritten;\n\t\t\t\t}\n\n\t\t\t\t// Save back as free\n\t\t\t\tif (s[callbackName]) {\n\n\t\t\t\t\t// Make sure that re-using the options doesn't screw things around\n\t\t\t\t\ts.jsonpCallback = originalSettings.jsonpCallback;\n\n\t\t\t\t\t// Save the callback name for future use\n\t\t\t\t\toldCallbacks.push(callbackName);\n\t\t\t\t}\n\n\t\t\t\t// Call if it was a function and we have a response\n\t\t\t\tif (responseContainer && jQuery.isFunction(overwritten)) {\n\t\t\t\t\toverwritten(responseContainer[0]);\n\t\t\t\t}\n\n\t\t\t\tresponseContainer = overwritten = undefined;\n\t\t\t});\n\n\t\t\t// Delegate to script\n\t\t\treturn \"script\";\n\t\t}\n\t});\n\n\t// Support: Safari 8 only\n\t// In Safari 8 documents created via document.implementation.createHTMLDocument\n\t// collapse sibling forms: the second one becomes a child of the first one.\n\t// Because of that, this security measure has to be disabled in Safari 8.\n\t// https://bugs.webkit.org/show_bug.cgi?id=137337\n\tsupport.createHTMLDocument = function () {\n\t\tvar body = document.implementation.createHTMLDocument(\"\").body;\n\t\tbody.innerHTML = \"<form></form><form></form>\";\n\t\treturn body.childNodes.length === 2;\n\t}();\n\n\t// Argument \"data\" should be string of html\n\t// context (optional): If specified, the fragment will be created in this context,\n\t// defaults to document\n\t// keepScripts (optional): If true, will include scripts passed in the html string\n\tjQuery.parseHTML = function (data, context, keepScripts) {\n\t\tif (typeof data !== \"string\") {\n\t\t\treturn [];\n\t\t}\n\t\tif (typeof context === \"boolean\") {\n\t\t\tkeepScripts = context;\n\t\t\tcontext = false;\n\t\t}\n\n\t\tvar base, parsed, scripts;\n\n\t\tif (!context) {\n\n\t\t\t// Stop scripts or inline event handlers from being executed immediately\n\t\t\t// by using document.implementation\n\t\t\tif (support.createHTMLDocument) {\n\t\t\t\tcontext = document.implementation.createHTMLDocument(\"\");\n\n\t\t\t\t// Set the base href for the created document\n\t\t\t\t// so any parsed elements with URLs\n\t\t\t\t// are based on the document's URL (gh-2965)\n\t\t\t\tbase = context.createElement(\"base\");\n\t\t\t\tbase.href = document.location.href;\n\t\t\t\tcontext.head.appendChild(base);\n\t\t\t} else {\n\t\t\t\tcontext = document;\n\t\t\t}\n\t\t}\n\n\t\tparsed = rsingleTag.exec(data);\n\t\tscripts = !keepScripts && [];\n\n\t\t// Single tag\n\t\tif (parsed) {\n\t\t\treturn [context.createElement(parsed[1])];\n\t\t}\n\n\t\tparsed = buildFragment([data], context, scripts);\n\n\t\tif (scripts && scripts.length) {\n\t\t\tjQuery(scripts).remove();\n\t\t}\n\n\t\treturn jQuery.merge([], parsed.childNodes);\n\t};\n\n\t/**\n  * Load a url into a page\n  */\n\tjQuery.fn.load = function (url, params, callback) {\n\t\tvar selector,\n\t\t    type,\n\t\t    response,\n\t\t    self = this,\n\t\t    off = url.indexOf(\" \");\n\n\t\tif (off > -1) {\n\t\t\tselector = stripAndCollapse(url.slice(off));\n\t\t\turl = url.slice(0, off);\n\t\t}\n\n\t\t// If it's a function\n\t\tif (jQuery.isFunction(params)) {\n\n\t\t\t// We assume that it's the callback\n\t\t\tcallback = params;\n\t\t\tparams = undefined;\n\n\t\t\t// Otherwise, build a param string\n\t\t} else if (params && (typeof params === \"undefined\" ? \"undefined\" : _typeof(params)) === \"object\") {\n\t\t\ttype = \"POST\";\n\t\t}\n\n\t\t// If we have elements to modify, make the request\n\t\tif (self.length > 0) {\n\t\t\tjQuery.ajax({\n\t\t\t\turl: url,\n\n\t\t\t\t// If \"type\" variable is undefined, then \"GET\" method will be used.\n\t\t\t\t// Make value of this field explicit since\n\t\t\t\t// user can override it through ajaxSetup method\n\t\t\t\ttype: type || \"GET\",\n\t\t\t\tdataType: \"html\",\n\t\t\t\tdata: params\n\t\t\t}).done(function (responseText) {\n\n\t\t\t\t// Save response for use in complete callback\n\t\t\t\tresponse = arguments;\n\n\t\t\t\tself.html(selector ?\n\n\t\t\t\t// If a selector was specified, locate the right elements in a dummy div\n\t\t\t\t// Exclude scripts to avoid IE 'Permission Denied' errors\n\t\t\t\tjQuery(\"<div>\").append(jQuery.parseHTML(responseText)).find(selector) :\n\n\t\t\t\t// Otherwise use the full result\n\t\t\t\tresponseText);\n\n\t\t\t\t// If the request succeeds, this function gets \"data\", \"status\", \"jqXHR\"\n\t\t\t\t// but they are ignored because response was set above.\n\t\t\t\t// If it fails, this function gets \"jqXHR\", \"status\", \"error\"\n\t\t\t}).always(callback && function (jqXHR, status) {\n\t\t\t\tself.each(function () {\n\t\t\t\t\tcallback.apply(this, response || [jqXHR.responseText, status, jqXHR]);\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\n\t\treturn this;\n\t};\n\n\t// Attach a bunch of functions for handling common AJAX events\n\tjQuery.each([\"ajaxStart\", \"ajaxStop\", \"ajaxComplete\", \"ajaxError\", \"ajaxSuccess\", \"ajaxSend\"], function (i, type) {\n\t\tjQuery.fn[type] = function (fn) {\n\t\t\treturn this.on(type, fn);\n\t\t};\n\t});\n\n\tjQuery.expr.pseudos.animated = function (elem) {\n\t\treturn jQuery.grep(jQuery.timers, function (fn) {\n\t\t\treturn elem === fn.elem;\n\t\t}).length;\n\t};\n\n\t/**\n  * Gets a window from an element\n  */\n\tfunction getWindow(elem) {\n\t\treturn jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;\n\t}\n\n\tjQuery.offset = {\n\t\tsetOffset: function setOffset(elem, options, i) {\n\t\t\tvar curPosition,\n\t\t\t    curLeft,\n\t\t\t    curCSSTop,\n\t\t\t    curTop,\n\t\t\t    curOffset,\n\t\t\t    curCSSLeft,\n\t\t\t    calculatePosition,\n\t\t\t    position = jQuery.css(elem, \"position\"),\n\t\t\t    curElem = jQuery(elem),\n\t\t\t    props = {};\n\n\t\t\t// Set position first, in-case top/left are set even on static elem\n\t\t\tif (position === \"static\") {\n\t\t\t\telem.style.position = \"relative\";\n\t\t\t}\n\n\t\t\tcurOffset = curElem.offset();\n\t\t\tcurCSSTop = jQuery.css(elem, \"top\");\n\t\t\tcurCSSLeft = jQuery.css(elem, \"left\");\n\t\t\tcalculatePosition = (position === \"absolute\" || position === \"fixed\") && (curCSSTop + curCSSLeft).indexOf(\"auto\") > -1;\n\n\t\t\t// Need to be able to calculate position if either\n\t\t\t// top or left is auto and position is either absolute or fixed\n\t\t\tif (calculatePosition) {\n\t\t\t\tcurPosition = curElem.position();\n\t\t\t\tcurTop = curPosition.top;\n\t\t\t\tcurLeft = curPosition.left;\n\t\t\t} else {\n\t\t\t\tcurTop = parseFloat(curCSSTop) || 0;\n\t\t\t\tcurLeft = parseFloat(curCSSLeft) || 0;\n\t\t\t}\n\n\t\t\tif (jQuery.isFunction(options)) {\n\n\t\t\t\t// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)\n\t\t\t\toptions = options.call(elem, i, jQuery.extend({}, curOffset));\n\t\t\t}\n\n\t\t\tif (options.top != null) {\n\t\t\t\tprops.top = options.top - curOffset.top + curTop;\n\t\t\t}\n\t\t\tif (options.left != null) {\n\t\t\t\tprops.left = options.left - curOffset.left + curLeft;\n\t\t\t}\n\n\t\t\tif (\"using\" in options) {\n\t\t\t\toptions.using.call(elem, props);\n\t\t\t} else {\n\t\t\t\tcurElem.css(props);\n\t\t\t}\n\t\t}\n\t};\n\n\tjQuery.fn.extend({\n\t\toffset: function offset(options) {\n\n\t\t\t// Preserve chaining for setter\n\t\t\tif (arguments.length) {\n\t\t\t\treturn options === undefined ? this : this.each(function (i) {\n\t\t\t\t\tjQuery.offset.setOffset(this, options, i);\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tvar docElem,\n\t\t\t    win,\n\t\t\t    rect,\n\t\t\t    doc,\n\t\t\t    elem = this[0];\n\n\t\t\tif (!elem) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Support: IE <=11 only\n\t\t\t// Running getBoundingClientRect on a\n\t\t\t// disconnected node in IE throws an error\n\t\t\tif (!elem.getClientRects().length) {\n\t\t\t\treturn { top: 0, left: 0 };\n\t\t\t}\n\n\t\t\trect = elem.getBoundingClientRect();\n\n\t\t\t// Make sure element is not hidden (display: none)\n\t\t\tif (rect.width || rect.height) {\n\t\t\t\tdoc = elem.ownerDocument;\n\t\t\t\twin = getWindow(doc);\n\t\t\t\tdocElem = doc.documentElement;\n\n\t\t\t\treturn {\n\t\t\t\t\ttop: rect.top + win.pageYOffset - docElem.clientTop,\n\t\t\t\t\tleft: rect.left + win.pageXOffset - docElem.clientLeft\n\t\t\t\t};\n\t\t\t}\n\n\t\t\t// Return zeros for disconnected and hidden elements (gh-2310)\n\t\t\treturn rect;\n\t\t},\n\n\t\tposition: function position() {\n\t\t\tif (!this[0]) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar offsetParent,\n\t\t\t    offset,\n\t\t\t    elem = this[0],\n\t\t\t    parentOffset = { top: 0, left: 0 };\n\n\t\t\t// Fixed elements are offset from window (parentOffset = {top:0, left: 0},\n\t\t\t// because it is its only offset parent\n\t\t\tif (jQuery.css(elem, \"position\") === \"fixed\") {\n\n\t\t\t\t// Assume getBoundingClientRect is there when computed position is fixed\n\t\t\t\toffset = elem.getBoundingClientRect();\n\t\t\t} else {\n\n\t\t\t\t// Get *real* offsetParent\n\t\t\t\toffsetParent = this.offsetParent();\n\n\t\t\t\t// Get correct offsets\n\t\t\t\toffset = this.offset();\n\t\t\t\tif (!jQuery.nodeName(offsetParent[0], \"html\")) {\n\t\t\t\t\tparentOffset = offsetParent.offset();\n\t\t\t\t}\n\n\t\t\t\t// Add offsetParent borders\n\t\t\t\tparentOffset = {\n\t\t\t\t\ttop: parentOffset.top + jQuery.css(offsetParent[0], \"borderTopWidth\", true),\n\t\t\t\t\tleft: parentOffset.left + jQuery.css(offsetParent[0], \"borderLeftWidth\", true)\n\t\t\t\t};\n\t\t\t}\n\n\t\t\t// Subtract parent offsets and element margins\n\t\t\treturn {\n\t\t\t\ttop: offset.top - parentOffset.top - jQuery.css(elem, \"marginTop\", true),\n\t\t\t\tleft: offset.left - parentOffset.left - jQuery.css(elem, \"marginLeft\", true)\n\t\t\t};\n\t\t},\n\n\t\t// This method will return documentElement in the following cases:\n\t\t// 1) For the element inside the iframe without offsetParent, this method will return\n\t\t//    documentElement of the parent window\n\t\t// 2) For the hidden or detached element\n\t\t// 3) For body or html element, i.e. in case of the html node - it will return itself\n\t\t//\n\t\t// but those exceptions were never presented as a real life use-cases\n\t\t// and might be considered as more preferable results.\n\t\t//\n\t\t// This logic, however, is not guaranteed and can change at any point in the future\n\t\toffsetParent: function offsetParent() {\n\t\t\treturn this.map(function () {\n\t\t\t\tvar offsetParent = this.offsetParent;\n\n\t\t\t\twhile (offsetParent && jQuery.css(offsetParent, \"position\") === \"static\") {\n\t\t\t\t\toffsetParent = offsetParent.offsetParent;\n\t\t\t\t}\n\n\t\t\t\treturn offsetParent || documentElement;\n\t\t\t});\n\t\t}\n\t});\n\n\t// Create scrollLeft and scrollTop methods\n\tjQuery.each({ scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function (method, prop) {\n\t\tvar top = \"pageYOffset\" === prop;\n\n\t\tjQuery.fn[method] = function (val) {\n\t\t\treturn access(this, function (elem, method, val) {\n\t\t\t\tvar win = getWindow(elem);\n\n\t\t\t\tif (val === undefined) {\n\t\t\t\t\treturn win ? win[prop] : elem[method];\n\t\t\t\t}\n\n\t\t\t\tif (win) {\n\t\t\t\t\twin.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);\n\t\t\t\t} else {\n\t\t\t\t\telem[method] = val;\n\t\t\t\t}\n\t\t\t}, method, val, arguments.length);\n\t\t};\n\t});\n\n\t// Support: Safari <=7 - 9.1, Chrome <=37 - 49\n\t// Add the top/left cssHooks using jQuery.fn.position\n\t// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n\t// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347\n\t// getComputedStyle returns percent when specified for top/left/bottom/right;\n\t// rather than make the css module depend on the offset module, just check for it here\n\tjQuery.each([\"top\", \"left\"], function (i, prop) {\n\t\tjQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {\n\t\t\tif (computed) {\n\t\t\t\tcomputed = curCSS(elem, prop);\n\n\t\t\t\t// If curCSS returns percentage, fallback to offset\n\t\t\t\treturn rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + \"px\" : computed;\n\t\t\t}\n\t\t});\n\t});\n\n\t// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\n\tjQuery.each({ Height: \"height\", Width: \"width\" }, function (name, type) {\n\t\tjQuery.each({ padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function (defaultExtra, funcName) {\n\n\t\t\t// Margin is only for outerHeight, outerWidth\n\t\t\tjQuery.fn[funcName] = function (margin, value) {\n\t\t\t\tvar chainable = arguments.length && (defaultExtra || typeof margin !== \"boolean\"),\n\t\t\t\t    extra = defaultExtra || (margin === true || value === true ? \"margin\" : \"border\");\n\n\t\t\t\treturn access(this, function (elem, type, value) {\n\t\t\t\t\tvar doc;\n\n\t\t\t\t\tif (jQuery.isWindow(elem)) {\n\n\t\t\t\t\t\t// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)\n\t\t\t\t\t\treturn funcName.indexOf(\"outer\") === 0 ? elem[\"inner\" + name] : elem.document.documentElement[\"client\" + name];\n\t\t\t\t\t}\n\n\t\t\t\t\t// Get document width or height\n\t\t\t\t\tif (elem.nodeType === 9) {\n\t\t\t\t\t\tdoc = elem.documentElement;\n\n\t\t\t\t\t\t// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],\n\t\t\t\t\t\t// whichever is greatest\n\t\t\t\t\t\treturn Math.max(elem.body[\"scroll\" + name], doc[\"scroll\" + name], elem.body[\"offset\" + name], doc[\"offset\" + name], doc[\"client\" + name]);\n\t\t\t\t\t}\n\n\t\t\t\t\treturn value === undefined ?\n\n\t\t\t\t\t// Get width or height on the element, requesting but not forcing parseFloat\n\t\t\t\t\tjQuery.css(elem, type, extra) :\n\n\t\t\t\t\t// Set width or height on the element\n\t\t\t\t\tjQuery.style(elem, type, value, extra);\n\t\t\t\t}, type, chainable ? margin : undefined, chainable);\n\t\t\t};\n\t\t});\n\t});\n\n\tjQuery.fn.extend({\n\n\t\tbind: function bind(types, data, fn) {\n\t\t\treturn this.on(types, null, data, fn);\n\t\t},\n\t\tunbind: function unbind(types, fn) {\n\t\t\treturn this.off(types, null, fn);\n\t\t},\n\n\t\tdelegate: function delegate(selector, types, data, fn) {\n\t\t\treturn this.on(types, selector, data, fn);\n\t\t},\n\t\tundelegate: function undelegate(selector, types, fn) {\n\n\t\t\t// ( namespace ) or ( selector, types [, fn] )\n\t\t\treturn arguments.length === 1 ? this.off(selector, \"**\") : this.off(types, selector || \"**\", fn);\n\t\t}\n\t});\n\n\tjQuery.parseJSON = JSON.parse;\n\n\t// Register as a named AMD module, since jQuery can be concatenated with other\n\t// files that may use define, but not via a proper concatenation script that\n\t// understands anonymous AMD modules. A named AMD is safest and most robust\n\t// way to register. Lowercase jquery is used because AMD module names are\n\t// derived from file names, and jQuery is normally delivered in a lowercase\n\t// file name. Do this after creating the global so that if an AMD module wants\n\t// to call noConflict to hide this version of jQuery, it will work.\n\n\t// Note that for maximum portability, libraries that are not jQuery should\n\t// declare themselves as anonymous modules, and avoid setting a global if an\n\t// AMD loader is present. jQuery is a special case. For more information, see\n\t// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\n\tif (typeof define === \"function\" && define.amd) {\n\t\tdefine(\"jquery\", [], function () {\n\t\t\treturn jQuery;\n\t\t});\n\t}\n\n\tvar\n\n\t// Map over jQuery in case of overwrite\n\t_jQuery = window.jQuery,\n\n\n\t// Map over the $ in case of overwrite\n\t_$ = window.$;\n\n\tjQuery.noConflict = function (deep) {\n\t\tif (window.$ === jQuery) {\n\t\t\twindow.$ = _$;\n\t\t}\n\n\t\tif (deep && window.jQuery === jQuery) {\n\t\t\twindow.jQuery = _jQuery;\n\t\t}\n\n\t\treturn jQuery;\n\t};\n\n\t// Expose jQuery and $ identifiers, even in AMD\n\t// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n\t// and CommonJS for browser emulators (#13566)\n\tif (!noGlobal) {\n\t\twindow.jQuery = window.$ = jQuery;\n\t}\n\n\treturn jQuery;\n});"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	if (typeof execScript !== "undefined")
		execScript(src);
	else
		eval.call(null, src);
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24)(__webpack_require__(23))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./bulma.css", function() {
			var newContent = require("!!../../css-loader/index.js!./bulma.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/lib/loader.js!./styles.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/lib/loader.js!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(31)

var Component = __webpack_require__(29)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(30),
  /* scopeId */
  "data-v-99ecdc1c",
  /* cssModules */
  null
)
Component.options.__file = "D:\\Dokumenty\\_Freelancing\\___dev_projects\\new\\webSpring-Vue\\src\\components\\component.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] component.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-99ecdc1c", Component.options)
  } else {
    hotAPI.reload("data-v-99ecdc1c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    attrs: {
      "href": _vm.path,
      "title": "Single File Vue Components"
    }
  }, [_c('article', {
    staticClass: "message"
  }, [_c('div', {
    staticClass: "message-header"
  }, [_c('p', [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('div', {
    staticClass: "message-body",
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-99ecdc1c", module.exports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(32)("3abf7fa0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-99ecdc1c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/less-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./component.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-99ecdc1c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/less-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./component.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(16)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
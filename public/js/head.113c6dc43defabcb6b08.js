var head =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		8:0
/******/ 	};
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "113c6dc43defabcb6b08" + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(38);
	__webpack_require__(24);
	
	//exports.init = require('./init');
	exports.login = __webpack_require__(25);
	
	__webpack_require__(26);
	exports.Modal = __webpack_require__(27);
	exports.fontTest = __webpack_require__(28);
	exports.resizeOnload = __webpack_require__(35);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	
	// must use CommonsChunkPlugin
	// to ensure that other modules use exactly this (initialized) client/notify
	__webpack_require__(20).init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function findDelegateTarget(event, selector) {
	  var currentNode = event.target;
	  while (currentNode) {
	    if (currentNode.matches(selector)) {
	      return currentNode;
	    }
	
	    if (currentNode == event.currentTarget) {
	      break;
	    }
	    currentNode = currentNode.parentElement;
	  }
	  return null;
	}
	
	// delegate(table, 'th', click, handler)
	// table
	//   thead
	//     th         ^*
	//       code  <--
	function delegate(topElement, selector, eventName, handler, context) {
	  /* jshint -W040 */
	  topElement.addEventListener(eventName, function (event) {
	    var found = findDelegateTarget(event, selector);
	
	    // .currentTarget is read only, I can not overwrite it to the "found" element
	    // Object.create wrapper would break event.preventDefault()
	    // so, keep in mind:
	    // --> event.currentTarget is always the top-level (delegating) element!
	    // use "this" to get the found target
	
	    event.delegateTarget = found; // use instead of "this" in object methods
	
	    if (found) {
	      // if in context of object, use object as this,
	      handler.call(context || this, event);
	    }
	  });
	}
	
	delegate.delegateMixin = function (obj) {
	  obj.delegate = function (selector, eventName, handler) {
	    delegate(this.elem, selector, eventName, handler, this);
	  };
	};
	
	module.exports = delegate;

/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * For new notification types extend Notification
	 */
	
	var delegate = __webpack_require__(18);
	
	/**
	 * Calculates translateY positions when notifications are added/removed
	 */
	
	var NotificationManager = (function () {
	  function NotificationManager() {
	    var options = arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, NotificationManager);
	
	    this.notifications = [];
	    this.verticalSpace = options.verticalSpace || 8;
	  }
	
	  _createClass(NotificationManager, {
	    register: {
	      value: function register(notification) {
	        var _this = this;
	
	        this.notifications.unshift(notification);
	        setTimeout(function () {
	          return _this.recalculate();
	        }, 20);
	      }
	    },
	    unregister: {
	      value: function unregister(notification) {
	        var idx = this.notifications.indexOf(notification);
	        this.notifications.splice(idx, 1);
	        this.recalculate();
	      }
	    },
	    recalculate: {
	      value: function recalculate() {
	        var _this = this;
	
	        var top = this.verticalSpace;
	        this.notifications.forEach(function (notification) {
	          notification.top = top;
	          top += notification.height + _this.verticalSpace;
	        });
	      }
	    }
	  });
	
	  return NotificationManager;
	})();
	
	var manager;
	
	exports.init = function (options) {
	  manager = new NotificationManager(options);
	};
	
	var Notification = (function () {
	  function Notification(html, type, timeout) {
	    _classCallCheck(this, Notification);
	
	    var elemHtml = "<div class=\"notification notification_popup notification_" + type + "\">\n    <div class=\"notification__content\">" + html + "</div>\n    <button title=\"Закрыть\" class=\"notification__close\"></button></div>";
	
	    document.body.insertAdjacentHTML("beforeEnd", elemHtml);
	
	    this.elem = document.body.lastElementChild;
	
	    switch (timeout) {
	      case undefined:
	        this.timeout = this.TIMEOUT_DEFAULT;
	        break;
	      case "slow":
	        this.timeout = this.TIMEOUT_SLOW;
	        break;
	      case "fast":
	        this.timeout = this.TIMEOUT_FAST;
	        break;
	      default:
	        this.timeout = timeout;
	    }
	
	    manager.register(this);
	    this.setupCloseHandler();
	    this.setupCloseTimeout();
	  }
	
	  _createClass(Notification, {
	    TIMEOUT_DEFAULT: {
	      get: function () {
	        return 2500;
	      }
	    },
	    TIMEOUT_SLOW: {
	      get: function () {
	        return 5000;
	      }
	    },
	    TIMEOUT_FAST: {
	      get: function () {
	        return 1500;
	      }
	    },
	    close: {
	      value: function close() {
	        if (!this.elem.parentNode) {
	          return;
	        } // already closed (by user click?)
	        this.elem.remove();
	        manager.unregister(this);
	      }
	    },
	    setupCloseHandler: {
	      value: function setupCloseHandler() {
	        var _this = this;
	
	        this.delegate(".notification__close", "click", function () {
	          return _this.close();
	        });
	      }
	    },
	    setupCloseTimeout: {
	      value: function setupCloseTimeout() {
	        var _this = this;
	
	        if (this.timeout) {
	          setTimeout(function () {
	            return _this.close();
	          }, this.timeout);
	        }
	      }
	    },
	    height: {
	      get: function () {
	        return this.elem.offsetHeight;
	      }
	    },
	    top: {
	      set: function (value) {
	        this.elem.style.transform = "translateY(" + value + "px)";
	      }
	    }
	  });
	
	  return Notification;
	})();
	
	delegate.delegateMixin(Notification.prototype);
	
	var Info = (function (_Notification) {
	  function Info(html) {
	    _classCallCheck(this, Info);
	
	    _get(Object.getPrototypeOf(Info.prototype), "constructor", this).call(this, html, "info");
	  }
	
	  _inherits(Info, _Notification);
	
	  return Info;
	})(Notification);
	
	exports.Info = Info;
	
	var Warning = (function (_Notification2) {
	  function Warning(html) {
	    _classCallCheck(this, Warning);
	
	    _get(Object.getPrototypeOf(Warning.prototype), "constructor", this).call(this, html, "warning");
	  }
	
	  _inherits(Warning, _Notification2);
	
	  return Warning;
	})(Notification);
	
	exports.Warning = Warning;
	
	var Success = (function (_Notification3) {
	  function Success(html) {
	    _classCallCheck(this, Success);
	
	    _get(Object.getPrototypeOf(Success.prototype), "constructor", this).call(this, html, "success");
	  }
	
	  _inherits(Success, _Notification3);
	
	  return Success;
	})(Notification);
	
	exports.Success = Success;
	
	var Error = exports.Error = (function (_Notification4) {
	  function Error(html) {
	    _classCallCheck(this, Error);
	
	    _get(Object.getPrototypeOf(Error.prototype), "constructor", this).call(this, html, "error");
	  }
	
	  _inherits(Error, _Notification4);
	
	  _createClass(Error, {
	    TIMEOUT_DEFAULT: {
	      get: function () {
	        return 5000;
	      }
	    }
	  });
	
	  return Error;
	})(Notification);
	
	exports.Error = Error;
	
	var Test = exports.Test = (function (_Notification5) {
	  function Test(html) {
	    _classCallCheck(this, Test);
	
	    _get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this, html, "error");
	  }
	
	  _inherits(Test, _Notification5);
	
	  _createClass(Test, {
	    TIMEOUT_DEFAULT: {
	      get: function () {
	        return null;
	      }
	    }
	  });
	
	  return Test;
	})(Notification);
	
	exports.Test = Test;

/***/ },
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Usage:
	//  1) new Spinner({ elem: elem}) -> start/stop()
	//  2) new Spinner() -> somewhere.append(spinner.elem) -> start/stop
	"use strict";
	
	function Spinner(options) {
	  options = options || {};
	  this.elem = options.elem;
	
	  this.size = options.size || "medium";
	  // any class to add to spinner (make spinner special here)
	  this["class"] = options["class"] ? " " + options["class"] : "";
	
	  // any class to add to element (to hide it's content for instance)
	  this.elemClass = options.elemClass;
	
	  if (this.size != "medium" && this.size != "small" && this.size != "large") {
	    throw new Error("Unsupported size: " + this.size);
	  }
	
	  if (!this.elem) {
	    this.elem = document.createElement("div");
	  }
	}
	
	Spinner.prototype.start = function () {
	  if (this.elemClass) {
	    this.elem.classList.toggle(this.elemClass);
	  }
	
	  this.elem.insertAdjacentHTML("beforeend", "<span class=\"spinner spinner_active spinner_" + this.size + this["class"] + "\"><span class=\"spinner__dot spinner__dot_1\"></span><span class=\"spinner__dot spinner__dot_2\"></span><span class=\"spinner__dot spinner__dot_3\"></span></span>");
	};
	
	Spinner.prototype.stop = function () {
	  var spinnerElem = this.elem.querySelector(".spinner");
	  if (!spinnerElem) return; // already stopped or never started
	
	  spinnerElem.remove();
	
	  if (this.elemClass) {
	    this.elem.classList.toggle(this.elemClass);
	  }
	};
	
	module.exports = Spinner;

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// if class ends with _unready then we consider element unusable (yet)
	
	// cancel clicks on <a class="unready"> and <button class="unready">
	"use strict";
	
	document.addEventListener("click", function (event) {
	  var target = event.target;
	  while (target) {
	    if (target.className.match(/_unready\b/)) {
	      event.preventDefault();
	      return;
	    }
	    target = target.parentElement;
	  }
	});
	
	// cancel submits of <form class="unready">
	document.addEventListener("submit", function (event) {
	  if (event.target.className.match(/_unready\b/)) {
	    event.preventDefault();
	  }
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Modal = __webpack_require__(27);
	var Spinner = __webpack_require__(22);
	
	document.addEventListener("click", function (event) {
	  if (!event.target.hasAttribute("data-action-login")) {
	    return;
	  }
	
	  event.preventDefault();
	  login();
	});
	
	function login() {
	  var modal = new Modal();
	  var spinner = new Spinner();
	  modal.setContent(spinner.elem);
	  spinner.start();
	
	  __webpack_require__.e/* nsure */(9, function () {
	    modal.remove();
	    var AuthModal = __webpack_require__(40).AuthModal;
	    new AuthModal();
	  });
	}
	
	module.exports = login;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	document.addEventListener("click", function (e) {
	  if (e.target.hasAttribute("data-action-user-logout")) {
	    e.preventDefault();
	    logout();
	  }
	});
	
	function logout() {
	  var form = document.createElement("form");
	  form.method = "POST";
	  form.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1];
	  document.body.appendChild(form);
	  form.submit();
	}
	
	module.exports = logout;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function Modal() {
	  this.render();
	
	  this.onClick = this.onClick.bind(this);
	  this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
	
	  this.elem.addEventListener("click", this.onClick);
	
	  document.addEventListener("keydown", this.onDocumentKeyDown);
	}
	
	Modal.prototype.render = function () {
	  document.body.insertAdjacentHTML("beforeEnd", "<div class=\"modal\"><div class=\"modal-dialog\"></div></div>");
	  this.elem = document.body.lastChild;
	  this.contentElem = this.elem.lastChild;
	};
	
	Modal.prototype.onClick = function (event) {
	  if (event.target.classList.contains("close-button")) {
	    this.remove();
	  }
	};
	
	Modal.prototype.onDocumentKeyDown = function (event) {
	  if (event.keyCode == 27) {
	    event.preventDefault();
	    this.remove();
	  }
	};
	
	Modal.prototype.showOverlay = function () {
	  this.contentElem.classList.add("modal-overlay_light");
	};
	
	Modal.prototype.hideOverlay = function () {
	  this.contentElem.classList.remove("modal-overlay_light");
	};
	
	Modal.prototype.setContent = function (htmlOrNode) {
	  if (typeof htmlOrNode == "string") {
	    this.contentElem.innerHTML = htmlOrNode;
	  } else {
	    this.contentElem.innerHTML = "";
	    this.contentElem.appendChild(htmlOrNode);
	  }
	  var autofocus = this.contentElem.querySelector("[autofocus]");
	  if (autofocus) autofocus.focus();
	};
	
	Modal.prototype.remove = function () {
	  document.body.removeChild(this.elem);
	  document.removeEventListener("keydown", this.onDocumentKeyDown);
	  this.elem.dispatchEvent(new CustomEvent("modalClose"));
	};
	
	module.exports = Modal;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Избегаем FOUT - простой способ проверки загрузки иконик шрифта.
	 1) Делаем в iconic шрифте один символ с кодом 21 (вместо «!»)
	 В iconmoon
	 http://ilyakantor.ru/screen/2014-09-06_0152.png
	 http://ilyakantor.ru/screen/2014-09-06_0153.png
	
	 Этот шрифт в обычном шрифте (serif) узкий по ширине, а в iconic - нормальный.
	 2) Далее при загрузке создаём <span>!</span> и даём ему fontFamily сначала serif и замеряем ширину, а потом FontIcons, serif.
	 Отлавливаем момент, когда ширина изменится. Это значит шрифт загружен.
	 Можно убрать класс .no-icons и показать иконки.
	 */
	
	"use strict";
	
	module.exports = function () {
	  var elem = document.createElement("span");
	  document.body.appendChild(elem);
	  elem.className = "font-test";
	  elem.style.fontFamily = "serif";
	  var initialWidth = elem.offsetWidth;
	
	  elem.style.fontFamily = "";
	
	  function checkFontLoaded() {
	    if (initialWidth != elem.offsetWidth) {
	      document.body.classList.remove("no-icons");
	    } else {
	      setTimeout(checkFontLoaded, 100);
	    }
	  }
	
	  checkFontLoaded();
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var requestAnimationFrameId;
	
	var DEBUG = false;
	function log() {
	  if (DEBUG) {
	    console.log.apply(console, arguments);
	  }
	}
	
	var TABLET_WIDTH = 840;
	
	(function () {
	
	  // don't handle onscroll more often than animation
	  function onWindowScrollAndResizeThrottled() {
	    log("onWindowScrollAndResizeThrottled", requestAnimationFrameId);
	    if (requestAnimationFrameId) {
	      return;
	    }requestAnimationFrameId = window.requestAnimationFrame(function () {
	      onWindowScrollAndResize();
	      requestAnimationFrameId = null;
	    });
	  }
	
	  window.addEventListener("scroll", onWindowScrollAndResizeThrottled);
	  window.addEventListener("resize", onWindowScrollAndResizeThrottled);
	  document.addEventListener("DOMContentLoaded", onWindowScrollAndResizeThrottled);
	})();
	
	function compactifySidebar() {
	  log("compactifySidebar");
	  var sidebar = document.querySelector(".sidebar");
	
	  var sidebarContent = sidebar.querySelector(".sidebar__content");
	  var sidebarInner = sidebar.querySelector(".sidebar__inner");
	
	  var hasStickyFooter = sidebar.classList.contains("sidebar_sticky-footer");
	  var isCompact = sidebar.classList.contains("sidebar_compact");
	
	  if (isCompact) {
	    var emptySpaceSize;
	    if (hasStickyFooter) {
	      emptySpaceSize = sidebarContent.lastElementChild.getBoundingClientRect().top - sidebarContent.lastElementChild.previousElementSibling.getBoundingClientRect().bottom;
	    } else {
	      emptySpaceSize = sidebarContent.getBoundingClientRect().bottom - sidebarContent.lastElementChild.getBoundingClientRect().bottom;
	    }
	
	    log("decompact?", emptySpaceSize);
	
	    // enough space to occupy the full height in decompacted form without scrollbar
	    if (emptySpaceSize > 150) {
	      sidebar.classList.remove("sidebar_compact");
	    }
	  } else {
	    log(sidebarInner.scrollHeight, sidebarInner.clientHeight);
	    if (sidebarInner.scrollHeight > sidebarInner.clientHeight) {
	      log("compact!");
	      sidebar.classList.add("sidebar_compact");
	    }
	  }
	}
	
	function onWindowScrollAndResize() {
	
	  var sitetoolbar = document.querySelector(".sitetoolbar");
	  if (!sitetoolbar) {
	    log("no sitetoolbar");
	    return; // page in a no-top-nav layout
	  }
	
	  var sitetoolbarHeight = sitetoolbar.offsetHeight;
	
	  var sidebar = document.querySelector(".sidebar");
	
	  if (sidebar) {
	    sidebar.style.top = Math.max(sitetoolbar.getBoundingClientRect().bottom, 0) + "px";
	    compactifySidebar();
	  }
	
	  setUserScaleIfTablet();
	}
	
	function setUserScaleIfTablet() {
	  var isTablet = document.documentElement.clientWidth <= TABLET_WIDTH;
	  var content = document.querySelector("meta[name=\"viewport\"]").content;
	  content = content.replace(/user-scalable=\w+/, "user-scalable=" + (isTablet ? "yes" : "no"));
	  document.querySelector("meta[name=\"viewport\"]").content = content;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	document.addEventListener("click", onSearchClick);
	
	// toggle search on/off, autofocus on input when "on"
	function onSearchClick(event) {
	  var searchToggle = event.target.closest(".sitetoolbar__search-toggle");
	
	  if (searchToggle) {
	    toggle();
	  }
	}
	
	function toggle() {
	  var sitetoolbar = document.querySelector(".sitetoolbar");
	  sitetoolbar.classList.toggle("sitetoolbar_search_open");
	
	  var input = sitetoolbar.querySelector(".sitetoolbar__search-query input");
	  if (sitetoolbar.classList.contains("sitetoolbar_search_open")) {
	    input.focus();
	
	    if (!input.onkeydown) {
	      input.onkeydown = function (e) {
	        if (e.keyCode == 27) {
	          this.value = "";
	          toggle();
	        }
	      };
	    }
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	document.addEventListener("click", onClick);
	
	document.addEventListener("keydown", onKeyDown);
	
	function toggle() {
	
	  document.querySelector(".page").classList.toggle("page_sidebar_on");
	
	  if (document.querySelector(".page").classList.contains("page_sidebar_on")) {
	    delete localStorage.noSidebar;
	  } else {
	    localStorage.noSidebar = 1;
	  }
	}
	
	function onClick(event) {
	  if (event.target.dataset.sidebarToggle === undefined) {
	    return;
	  }toggle();
	}
	
	function onKeyDown(event) {
	  // don't react on Ctrl-> <- if in text
	  if (~["INPUT", "TEXTAREA", "SELECT"].indexOf(document.activeElement.tagName)) {
	    return;
	  }if (event.keyCode != "S".charCodeAt(0)) {
	    return;
	  }if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
	    if (!event.metaKey || !event.altKey) {
	      return;
	    }
	  } else {
	    if (!event.altKey) {
	      return;
	    }
	  }
	
	  toggle();
	  event.preventDefault();
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// navigation starts to work right now
	"use strict";
	
	var onSwipe = __webpack_require__(50);
	var ctrlOrAlt = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
	
	function onKeyDown(event) {
	  // don't react on Ctrl-> <- if in text
	  if (~["INPUT", "TEXTAREA", "SELECT"].indexOf(document.activeElement.tagName)) {
	    return;
	  }if (!event[ctrlOrAlt + "Key"]) {
	    return;
	  }var rel = null;
	  switch (event.keyCode) {
	    case 37:
	      rel = "prev";
	      break;
	    case 39:
	      rel = "next";
	      break;
	    default:
	      return;
	  }
	
	  var link = document.querySelector("link[rel=\"" + rel + "\"]");
	  if (!link) {
	    return;
	  }document.location = link.href;
	  event.preventDefault();
	}
	
	function showHotKeys() {
	  var keyDesc = ctrlOrAlt[0].toUpperCase() + ctrlOrAlt.slice(1);
	
	  var shortcut;
	
	  var next = document.querySelector("link[rel=\"next\"]");
	  if (next) {
	    shortcut = document.querySelector("a[href=\"" + next.getAttribute("href") + "\"] .page__nav-text-shortcut");
	    shortcut.innerHTML = keyDesc + " + <span class=\"page__nav-text-arr\">→</span>";
	  }
	
	  var prev = document.querySelector("link[rel=\"prev\"]");
	  if (prev) {
	    shortcut = document.querySelector("a[href=\"" + prev.getAttribute("href") + "\"] .page__nav-text-shortcut");
	    shortcut.innerHTML = keyDesc + " + <span class=\"page__nav-text-arr\">←</span>";
	  }
	}
	
	onSwipe(document, {
	  onRight: function onRight() {
	    var link = document.querySelector("link[rel=\"prev\"]");
	    if (link) document.location = link.href;
	  },
	  onLeft: function onLeft() {
	    var link = document.querySelector("link[rel=\"next\"]");
	    if (link) document.location = link.href;
	  }
	});
	
	document.addEventListener("keydown", onKeyDown);
	
	document.addEventListener("DOMContentLoaded", showHotKeys);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// add/remove .hover onmouseenter/leave
	// for mobile devices (:hover sticks)
	
	"use strict";
	
	var currentHoverElem;
	
	/*
	function log(e) {
	  console.log(Date.now() % 1e4, e.type);
	}
	
	document.addEventListener("focusin", log, false);
	document.addEventListener("focus", log, false);
	document.addEventListener("touchstart", log, false);
	document.addEventListener("touchend", log, false);
	document.addEventListener("touchcancel", log, false);
	document.addEventListener("touchleave", log, false);
	document.addEventListener("touchmove", log, false);
	document.addEventListener("touch", log, false);
	
	document.addEventListener("pointerup", log, false);
	document.addEventListener("pointerdown", log, false);
	document.addEventListener("pointermove", log, false);
	document.addEventListener("pointercancel", log, false);
	document.addEventListener("mouseover", log, false);
	*/
	document.addEventListener("mouseover", function (event) {
	  var target = event.target.closest("[data-add-class-on-hover]");
	  if (target) {
	    currentHoverElem = target;
	    target.classList.add("hover");
	  }
	});
	
	document.addEventListener("touchend", function (event) {
	  setTimeout(function () {
	    if (currentHoverElem) {
	      currentHoverElem.classList.remove("hover");
	      currentHoverElem = null;
	    }
	  }, 500); // touchstart -> tourchend -> (delay up to 300ms) -> mouseover
	});
	
	document.addEventListener("mouseout", function (event) {
	  if (!currentHoverElem) return;
	
	  if (currentHoverElem.contains(event.relatedTarget)) {
	    return;
	  }
	
	  currentHoverElem.classList.remove("hover");
	  currentHoverElem = null;
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	window.runDemo = function (button) {
	
	  var demoElem;
	  var parent = button;
	
	  /* jshint -W084 */
	  while (parent = parent.parentElement) {
	    demoElem = parent.querySelector("[data-demo]");
	    if (demoElem) break;
	  }
	
	  if (!demoElem) {
	    alert("Ошибка, нет элемента с демо");
	  } else {
	    /* jshint -W061 */
	    eval(demoElem.textContent);
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var iframeResize = __webpack_require__(51);
	var throttle = __webpack_require__(52);
	// track resized iframes in window.onresize
	
	var onResizeQueue = [];
	
	exports.iframe = function (iframe) {
	
	  function resize() {
	    iframeResize.async(iframe, function (err, height) {
	      if (err) console.error(err);
	      if (height) iframe.style.height = height + "px";
	    });
	  }
	
	  resize();
	};
	
	exports.codeTabs = function (iframe) {
	  function hideShowArrows() {
	
	    // add arrows if needed
	    var elem = iframe.closest(".code-tabs");
	    var contentElem = iframe.closest("[data-code-tabs-content]");
	    var switchesElem = elem.querySelector("[data-code-tabs-switches]");
	    var switchesElemItems = switchesElem.firstElementChild;
	
	    if (switchesElemItems.offsetWidth > switchesElem.offsetWidth) {
	      elem.classList.add("code-tabs_scroll");
	    } else {
	      elem.classList.remove("code-tabs_scroll");
	    }
	  }
	
	  hideShowArrows();
	  onResizeQueue.push(hideShowArrows);
	};
	
	window.addEventListener("resize", throttle(function () {
	  onResizeQueue.forEach(function (onResize) {
	    onResize();
	  });
	}, 200));

/***/ },
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(53);

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function onSwipe(elem, options) {
	
	  options = options || {};
	
	  var startX,
	      startY,
	      dist,
	      onRight = options.onRight || function () {},
	      onLeft = options.onLeft || function () {},
	      tolerance = options.tolerance || 100,
	      // maximum vertical distance
	  threshold = options.threshold || 150,
	      //required min distance traveled to be considered swipe
	  allowedTime = options.allowedTime || 500,
	      // maximum time allowed to travel that distance
	  elapsedTime,
	      startTime;
	
	  elem.addEventListener("touchstart", function (e) {
	    var touchobj = e.changedTouches[0];
	    dist = 0;
	    startX = touchobj.pageX;
	    startY = touchobj.pageY;
	    //console.log("start", startX, startY);
	    startTime = Date.now(); // record time when finger first makes contact with surface
	  }, false);
	
	  elem.addEventListener("touchend", function (e) {
	    var touchobj = e.changedTouches[0];
	    dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
	    elapsedTime = Date.now() - startTime; // get time elapsed
	
	    //console.log("end", touchobj.pageX, touchobj.pageY);
	
	    // too much up/down
	    if (Math.abs(touchobj.pageY - startY) > tolerance) return;
	
	    //console.log("time", elapsedTime, allowedTime);
	
	    // too slow
	    if (elapsedTime > allowedTime) return;
	
	    //console.log("threshold", dist, threshold);
	
	    if (dist > threshold) {
	      //console.log("right");
	      onRight(e);
	    }
	
	    if (dist < -threshold) {
	      //console.log("left");
	      onLeft(e);
	    }
	  }, false);
	}
	
	module.exports = onSwipe;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getDocumentHeight = __webpack_require__(72);
	
	function iframeResize(ifrElem, callback) {
	
	  var timeoutTimer = setTimeout(function () {
	    // default height
	    callback(new Error("timeout"));
	  }, 500);
	
	  function done(err, height) {
	    clearTimeout(timeoutTimer);
	
	    callback(err, height);
	  }
	
	  // throw right now if cross-domain
	  try {
	    /* jshint -W030 */
	    (ifrElem.contentDocument || ifrElem.contentWindow.document).body;
	  } catch (e) {
	    iframeResizeCrossDomain(ifrElem, done);
	  }
	
	  // HINT: I shoulnd't move iframe in DOM, because it will reload it's contents when appended/inserted anywhere!
	  // so I create a clone and work on it
	  if (!ifrElem.offsetWidth) {
	    // clone iframe at another place to see the size
	    var cloneIframe = ifrElem.cloneNode(true);
	    cloneIframe.name = "";
	
	    cloneIframe.style.height = "50px";
	    cloneIframe.style.position = "absolute";
	    cloneIframe.style.display = "block";
	    cloneIframe.style.top = "10000px";
	
	    cloneIframe.onload = function () {
	      var height = getDocumentHeight(this.contentDocument);
	      ifrElem.style.display = "block";
	      cloneIframe.remove();
	      done(null, height);
	    };
	
	    document.body.appendChild(cloneIframe);
	    return;
	  }
	
	  ifrElem.style.display = "block";
	  ifrElem.style.height = "1px";
	
	  var height = getDocumentHeight(ifrElem.contentDocument);
	
	  ifrElem.style.height = "";
	  done(null, height);
	}
	
	iframeResize.async = function iframeResizeAsync(iframe, callback) {
	  // delay to let the code inside the iframe finish
	  setTimeout(function () {
	    iframeResize(iframe, callback);
	  }, 0);
	};
	
	function iframeResizeCrossDomain(ifrElem, callback) {
	  throw new Error("Not implemented yet");
	}
	
	module.exports = iframeResize;
	
	/*
	 window.onmessage = function(e) {
	 if (e.origin != "http://ru.lookatcode.com") return;
	 var data = JSON.parse(e.data);
	 if (!data || data.cmd != "resize-iframe") return;
	 var elem = document.getElementsByName(data.name)[0];

	 elem.style.height = +data.height + 10 + "px";
	 var deferred = iframeResizeCrossDomain.deferreds[data.id];
	 deferred.resolve();
	 };

	 function iframeResizeCrossDomain(ifrElem, callback) {

	 setTimeout(function() {
	 callback(new Error("timeout"));
	 }, 500);

	 try {
	 // try to see if resizer can work on this iframe
	 ifrElem.contentWindow.postMessage("test", "http://ru.lookatcode.com");
	 } catch(e) {
	 // iframe from another domain, sorry
	 callback(new Error("the resizer must be from ru.lookatcode.com"));
	 return;
	 }

	 if (!ifrElem.offsetWidth) {
	 // move iframe to another place to resize there
	 var placeholder = document.createElement('span');
	 ifrElem.parentNode.insertBefore(placeholder, ifrElem);
	 document.body.appendChild(ifrElem);
	 }

	 ifrElem.style.display = 'none';

	 var id = "" + Math.random();
	 var message = { cmd: 'resize-iframe', name: ifrElem[0].name, id: id };
	 // TODO
	 iframeResizeCrossDomain.deferreds[id] = deferred;
	 deferred.always(function() {
	 delete iframeResizeCrossDomain.deferreds[id];
	 });

	 var frame = iframeResizeCrossDomain.iframe;
	 if (frame.loaded) {
	 frame.contentWindow.postMessage(JSON.stringify(message), "http://ru.lookatcode.com");
	 } else {
	 frame.on('load', function() {
	 frame.contentWindow.postMessage(JSON.stringify(message), "http://ru.lookatcode.com");
	 });
	 }

	 if (placeholder) {
	 setTimeout(function() {
	 placeholder.replaceWith(ifrElem);
	 }, 20);
	 }

	 return deferred;
	 }

	 iframeResizeCrossDomain.deferreds = {};
	 iframeResizeCrossDomain.iframe = $('<iframe src="http://ru.lookatcode.com/files/iframe-resize.html" style="display:none"></iframe>').prependTo('body');
	 iframeResizeCrossDomain.iframe.on('load', function() {
	 this.loaded = true;
	 });
	 */

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function throttle(func, ms) {
	
	  var isThrottled = false,
	      savedArgs,
	      savedThis;
	
	  function wrapper() {
	
	    if (isThrottled) {
	      savedArgs = arguments;
	      savedThis = this;
	      return;
	    }
	
	    func.apply(this, arguments);
	
	    isThrottled = true;
	
	    setTimeout(function () {
	      isThrottled = false;
	      if (savedArgs) {
	        wrapper.apply(savedThis, savedArgs);
	        savedArgs = savedThis = null;
	      }
	    }, ms);
	  }
	
	  return wrapper;
	}
	
	module.exports = throttle;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//require('./casperjs');
	
	// http://dom.spec.whatwg.org/#mutation-method-macro
	"use strict";
	
	function mutation(nodes) {
	  if (!nodes.length) {
	    throw new Error("DOM Exception 8");
	  } else if (nodes.length === 1) {
	    return typeof nodes[0] === "string" ? document.createTextNode(nodes[0]) : nodes[0];
	  } else {
	    var fragment = document.createDocumentFragment(),
	        length = nodes.length,
	        index = -1,
	        node;
	
	    while (++index < length) {
	      node = nodes[index];
	
	      fragment.appendChild(typeof node === "string" ? document.createTextNode(node) : node);
	    }
	
	    return fragment;
	  }
	}
	
	var methods = {
	  // safari = webkitMatchesSelector
	  matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector,
	  replace: function replace() {
	    if (this.parentNode) {
	      this.parentNode.replaceChild(mutation(arguments), this);
	    }
	  },
	  prepend: function prepend() {
	    this.insertBefore(mutation(arguments), this.firstChild);
	  },
	  append: function append() {
	    this.appendChild(mutation(arguments));
	  },
	  remove: function remove() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      return parentNode.removeChild(this);
	    }
	  },
	  before: function before() {
	    if (this.parentNode) {
	      this.parentNode.insertBefore(mutation(arguments), this);
	    }
	  },
	
	  after: function after() {
	    if (this.parentNode) {
	      this.parentNode.insertBefore(mutation(arguments), this.nextSibling);
	    }
	  },
	  closest: function closest(selector) {
	    var node = this;
	
	    while (node) {
	      if (node.matches(selector)) {
	        return node;
	      } else node = node.parentElement;
	    }
	    return null;
	  }
	};
	
	for (var methodName in methods) {
	  if (!Element.prototype[methodName]) {
	    Element.prototype[methodName] = methods[methodName];
	  }
	}
	
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);

/***/ },
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getScrollbarHeight = __webpack_require__(78);
	var scrollbarHeight;
	
	function getDocumentHeight(doc) {
	  doc = doc || document;
	
	  var height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, doc.body.offsetHeight, doc.documentElement.offsetHeight, doc.body.clientHeight, doc.documentElement.clientHeight);
	
	  if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) {
	    // got a horiz scroll, let's add it
	    if (!scrollbarHeight) scrollbarHeight = getScrollbarHeight();
	    height += scrollbarHeight;
	  }
	
	  return height;
	}
	
	module.exports = getDocumentHeight;

/***/ },
/* 73 */,
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	try {
	  new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
	
	  window.CustomEvent = function (event, params) {
	    var evt;
	    params = params || {
	      bubbles: false,
	      cancelable: false,
	      detail: undefined
	    };
	    evt = document.createEvent("CustomEvent");
	    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	    return evt;
	  };
	
	  CustomEvent.prototype = Object.create(window.Event.prototype);
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// dataset for IE10
	
	"use strict";
	
	if (!document.documentElement.dataset && (!Object.getOwnPropertyDescriptor(Element.prototype, "dataset") || !Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
	  var propDescriptor = {
	    enumerable: true,
	    get: function get() {
	      "use strict";
	      var i,
	          that = this,
	          HTML5_DOMStringMap,
	          attrVal,
	          attrName,
	          propName,
	          attribute,
	          attributes = this.attributes,
	          attsLength = attributes.length,
	          toUpperCase = function toUpperCase(n0) {
	        return n0.charAt(1).toUpperCase();
	      },
	          getter = function getter() {
	        return this;
	      },
	          setter = function setter(attrName, value) {
	        return typeof value !== "undefined" ? this.setAttribute(attrName, value) : this.removeAttribute(attrName);
	      };
	      try {
	        // Simulate DOMStringMap w/accessor support
	        // Test setting accessor on normal object
	        ({}).__defineGetter__("test", function () {});
	        HTML5_DOMStringMap = {};
	      } catch (e1) {
	        // Use a DOM object for IE8
	        HTML5_DOMStringMap = document.createElement("div");
	      }
	      for (i = 0; i < attsLength; i++) {
	        attribute = attributes[i];
	        // Fix: This test really should allow any XML Name without
	        //         colons (and non-uppercase for XHTML)
	        if (attribute && attribute.name && /^data-\w[\w\-]*$/.test(attribute.name)) {
	          attrVal = attribute.value;
	          attrName = attribute.name;
	          // Change to CamelCase
	          propName = attrName.substr(5).replace(/-./g, toUpperCase);
	          try {
	            Object.defineProperty(HTML5_DOMStringMap, propName, {
	              enumerable: this.enumerable,
	              get: getter.bind(attrVal || ""),
	              set: setter.bind(that, attrName)
	            });
	          } catch (e2) {
	            // if accessors are not working
	            HTML5_DOMStringMap[propName] = attrVal;
	          }
	        }
	      }
	      return HTML5_DOMStringMap;
	    }
	  };
	  try {
	    // FF enumerates over element's dataset, but not
	    //   Element.prototype.dataset; IE9 iterates over both
	    Object.defineProperty(Element.prototype, "dataset", propDescriptor);
	  } catch (e) {
	    propDescriptor.enumerable = false; // IE8 does not allow setting to true
	    Object.defineProperty(Element.prototype, "dataset", propDescriptor);
	  }
	}
	
	// FF is empty while IE gives empty object

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	if (document.documentElement.hidden === undefined) {
	  document.head.insertAdjacentHTML("<style> [hidden] { display: none } </style>");
	  Object.defineProperty(Element.prototype, "hidden", {
	    set: function set(value) {
	      this.setAttribute("hidden", value);
	    },
	    get: function get() {
	      return this.getAttribute("hidden");
	    }
	  });
	}

/***/ },
/* 77 */,
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function getScrollbarHeight() {
	  var outer = document.createElement("div");
	  outer.style.cssText = "visibility:hidden;height:100px";
	  if (!document.body) {
	    throw new Error("getScrollbarHeight called to early: no document.body");
	  }
	  document.body.appendChild(outer);
	
	  var widthNoScroll = outer.offsetWidth;
	  // force scrollbars
	  outer.style.overflow = "scroll";
	
	  // add innerdiv
	  var inner = document.createElement("div");
	  inner.style.width = "100%";
	  outer.appendChild(inner);
	
	  var widthWithScroll = inner.offsetWidth;
	
	  // remove divs
	  outer.parentNode.removeChild(outer);
	
	  return widthNoScroll - widthWithScroll;
	}
	
	module.exports = getScrollbarHeight;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTEzYzZkYzQzZGVmYWJjYjZiMDgiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2RlbGVnYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9ub3RpZmljYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NwaW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvdW5yZWFkeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvZm9udFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpdGV0b29sYmFyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ob3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ydW5EZW1vLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L29uU3dpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2lmcmFtZVJlc2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9tb2R1bGVzL2xpYi90aHJvdHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvZG9tLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9kb20vZ2V0RG9jdW1lbnRIZWlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BvbHlmaWxsL2N1c3RvbUV2ZW50LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9oaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2RvbS9nZXRTY3JvbGxiYXJIZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7OztBQzFGQSxvQkFBTyxDQUFDLEVBQWlCLENBQUMsQ0FBQztBQUMzQixvQkFBTyxDQUFDLEVBQVcsQ0FBQyxDQUFDOzs7QUFHckIsUUFBTyxDQUFDLEtBQUssR0FBRyxtQkFBTyxDQUFDLEVBQVMsQ0FBQyxDQUFDOztBQUVuQyxvQkFBTyxDQUFDLEVBQVUsQ0FBQyxDQUFDO0FBQ3BCLFFBQU8sQ0FBQyxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFTLENBQUMsQ0FBQztBQUNu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QUFDdkQsT0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbEIsV0FBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ3pFO0FBQ0QsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWpDLE9BQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7O0FBRXRDLFFBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7O0FBR2hDLE9BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsUUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXpCLE9BQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUd4QyxRQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFcEMsVUFBTyxhQUFhLEdBQUcsZUFBZSxDQUFDO0VBQ3hDOztBQUVELE9BQU0sQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRpZihtb3JlTW9kdWxlc1swXSkge1xuIFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbMF0gPSAwO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQ4OjBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gYW4gYXJyYXkgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXS5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW2NhbGxiYWNrXTtcbiBcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gXHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBcIjExM2M2ZGM0M2RlZmFiY2I2YjA4XCIgKyBcIi5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTEzYzZkYzQzZGVmYWJjYjZiMDhcbiAqKi8iLCJcbnJlcXVpcmUoJ2NsaWVudC9wb2x5ZmlsbCcpO1xucmVxdWlyZSgnLi91bnJlYWR5Jyk7XG5cbi8vZXhwb3J0cy5pbml0ID0gcmVxdWlyZSgnLi9pbml0Jyk7XG5leHBvcnRzLmxvZ2luID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuXG5yZXF1aXJlKCcuL2xvZ291dCcpO1xuZXhwb3J0cy5Nb2RhbCA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcbmV4cG9ydHMuZm9udFRlc3QgPSByZXF1aXJlKCcuL2ZvbnRUZXN0Jyk7XG5leHBvcnRzLnJlc2l6ZU9ubG9hZCA9IHJlcXVpcmUoJy4vcmVzaXplT25sb2FkJyk7XG5yZXF1aXJlKCcuL2xheW91dCcpO1xucmVxdWlyZSgnLi9zaXRldG9vbGJhcicpO1xucmVxdWlyZSgnLi9zaWRlYmFyJyk7XG5yZXF1aXJlKCcuL25hdmlnYXRpb25BcnJvd3MnKTtcbnJlcXVpcmUoJy4vaG92ZXInKTtcbnJlcXVpcmUoJy4vcnVuRGVtbycpO1xuXG4vLyBtdXN0IHVzZSBDb21tb25zQ2h1bmtQbHVnaW5cbi8vIHRvIGVuc3VyZSB0aGF0IG90aGVyIG1vZHVsZXMgdXNlIGV4YWN0bHkgdGhpcyAoaW5pdGlhbGl6ZWQpIGNsaWVudC9ub3RpZnlcbnJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKS5pbml0KCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2luZGV4LmpzXG4gKiovIiwiXG5mdW5jdGlvbiBmaW5kRGVsZWdhdGVUYXJnZXQoZXZlbnQsIHNlbGVjdG9yKSB7XG4gIHZhciBjdXJyZW50Tm9kZSA9IGV2ZW50LnRhcmdldDtcbiAgd2hpbGUgKGN1cnJlbnROb2RlKSB7XG4gICAgaWYgKGN1cnJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnROb2RlID09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIGRlbGVnYXRlKHRhYmxlLCAndGgnLCBjbGljaywgaGFuZGxlcilcbi8vIHRhYmxlXG4vLyAgIHRoZWFkXG4vLyAgICAgdGggICAgICAgICBeKlxuLy8gICAgICAgY29kZSAgPC0tXG5mdW5jdGlvbiBkZWxlZ2F0ZSh0b3BFbGVtZW50LCBzZWxlY3RvciwgZXZlbnROYW1lLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gIC8qIGpzaGludCAtVzA0MCAqL1xuICB0b3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBmb3VuZCA9IGZpbmREZWxlZ2F0ZVRhcmdldChldmVudCwgc2VsZWN0b3IpO1xuXG4gICAgLy8gLmN1cnJlbnRUYXJnZXQgaXMgcmVhZCBvbmx5LCBJIGNhbiBub3Qgb3ZlcndyaXRlIGl0IHRvIHRoZSBcImZvdW5kXCIgZWxlbWVudFxuICAgIC8vIE9iamVjdC5jcmVhdGUgd3JhcHBlciB3b3VsZCBicmVhayBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gc28sIGtlZXAgaW4gbWluZDpcbiAgICAvLyAtLT4gZXZlbnQuY3VycmVudFRhcmdldCBpcyBhbHdheXMgdGhlIHRvcC1sZXZlbCAoZGVsZWdhdGluZykgZWxlbWVudCFcbiAgICAvLyB1c2UgXCJ0aGlzXCIgdG8gZ2V0IHRoZSBmb3VuZCB0YXJnZXRcblxuICAgIGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gZm91bmQ7IC8vIHVzZSBpbnN0ZWFkIG9mIFwidGhpc1wiIGluIG9iamVjdCBtZXRob2RzXG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIC8vIGlmIGluIGNvbnRleHQgb2Ygb2JqZWN0LCB1c2Ugb2JqZWN0IGFzIHRoaXMsXG4gICAgICBoYW5kbGVyLmNhbGwoY29udGV4dCB8fCB0aGlzLCBldmVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICBvYmouZGVsZWdhdGUgPSBmdW5jdGlvbihzZWxlY3RvciwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgZGVsZWdhdGUodGhpcy5lbGVtLCBzZWxlY3RvciwgZXZlbnROYW1lLCBoYW5kbGVyLCB0aGlzKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVsZWdhdGU7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2RlbGVnYXRlLmpzXG4gKiovIiwiLyoqXG4gKiBGb3IgbmV3IG5vdGlmaWNhdGlvbiB0eXBlcyBleHRlbmQgTm90aWZpY2F0aW9uXG4gKi9cblxudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0cmFuc2xhdGVZIHBvc2l0aW9ucyB3aGVuIG5vdGlmaWNhdGlvbnMgYXJlIGFkZGVkL3JlbW92ZWRcbiAqL1xuY2xhc3MgTm90aWZpY2F0aW9uTWFuYWdlciB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XG4gICAgdGhpcy52ZXJ0aWNhbFNwYWNlID0gb3B0aW9ucy52ZXJ0aWNhbFNwYWNlIHx8IDg7XG4gIH1cblxuICByZWdpc3Rlcihub3RpZmljYXRpb24pIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMudW5zaGlmdChub3RpZmljYXRpb24pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWNhbGN1bGF0ZSgpLCAyMCk7XG4gIH1cblxuICB1bnJlZ2lzdGVyKG5vdGlmaWNhdGlvbikge1xuICAgIHZhciBpZHggPSB0aGlzLm5vdGlmaWNhdGlvbnMuaW5kZXhPZihub3RpZmljYXRpb24pO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICByZWNhbGN1bGF0ZSgpIHtcbiAgICB2YXIgdG9wID0gdGhpcy52ZXJ0aWNhbFNwYWNlO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucy5mb3JFYWNoKG5vdGlmaWNhdGlvbiA9PiB7XG4gICAgICBub3RpZmljYXRpb24udG9wID0gdG9wO1xuICAgICAgdG9wICs9IG5vdGlmaWNhdGlvbi5oZWlnaHQgKyB0aGlzLnZlcnRpY2FsU3BhY2U7XG4gICAgfSk7XG4gIH1cblxufVxuXG52YXIgbWFuYWdlcjtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBtYW5hZ2VyID0gbmV3IE5vdGlmaWNhdGlvbk1hbmFnZXIob3B0aW9ucyk7XG59O1xuXG5cbmNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCwgdHlwZSwgdGltZW91dCkge1xuICAgIHZhciBlbGVtSHRtbCA9IGA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uIG5vdGlmaWNhdGlvbl9wb3B1cCBub3RpZmljYXRpb25fJHt0eXBlfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25fX2NvbnRlbnRcIj4ke2h0bWx9PC9kaXY+XG4gICAgPGJ1dHRvbiB0aXRsZT1cItCX0LDQutGA0YvRgtGMXCIgY2xhc3M9XCJub3RpZmljYXRpb25fX2Nsb3NlXCI+PC9idXR0b24+PC9kaXY+YDtcblxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlRW5kXCIsIGVsZW1IdG1sKTtcblxuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmJvZHkubGFzdEVsZW1lbnRDaGlsZDtcblxuICAgIHN3aXRjaCh0aW1lb3V0KSB7XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLlRJTUVPVVRfREVGQVVMVDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Nsb3cnOlxuICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5USU1FT1VUX1NMT1c7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmYXN0JzpcbiAgICAgIHRoaXMudGltZW91dCA9IHRoaXMuVElNRU9VVF9GQVNUO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG5cbiAgICBtYW5hZ2VyLnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuc2V0dXBDbG9zZUhhbmRsZXIoKTtcbiAgICB0aGlzLnNldHVwQ2xvc2VUaW1lb3V0KCk7XG4gIH1cblxuICBnZXQgVElNRU9VVF9ERUZBVUxUKCkge1xuICAgIHJldHVybiAyNTAwO1xuICB9XG5cbiAgZ2V0IFRJTUVPVVRfU0xPVygpIHtcbiAgICByZXR1cm4gNTAwMDtcbiAgfVxuXG4gIGdldCBUSU1FT1VUX0ZBU1QoKSB7XG4gICAgcmV0dXJuIDE1MDA7XG4gIH1cblxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5lbGVtLnBhcmVudE5vZGUpIHJldHVybjsgLy8gYWxyZWFkeSBjbG9zZWQgKGJ5IHVzZXIgY2xpY2s/KVxuICAgIHRoaXMuZWxlbS5yZW1vdmUoKTtcbiAgICBtYW5hZ2VyLnVucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBzZXR1cENsb3NlSGFuZGxlcigpIHtcbiAgICB0aGlzLmRlbGVnYXRlKCcubm90aWZpY2F0aW9uX19jbG9zZScsICdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICBzZXR1cENsb3NlVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy50aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0ub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgc2V0IHRvcCh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgnICsgdmFsdWUgKyAncHgpJztcbiAgfVxuXG59XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oTm90aWZpY2F0aW9uLnByb3RvdHlwZSk7XG5cblxuY2xhc3MgSW5mbyBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICdpbmZvJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLkluZm8gPSBJbmZvO1xuXG5jbGFzcyBXYXJuaW5nIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ3dhcm5pbmcnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuV2FybmluZyA9IFdhcm5pbmc7XG5cbmNsYXNzIFN1Y2Nlc3MgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnc3VjY2VzcycpO1xuICB9XG5cbn1cblxuZXhwb3J0cy5TdWNjZXNzID0gU3VjY2VzcztcblxuZXhwb3J0IGNsYXNzIEVycm9yIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ2Vycm9yJyk7XG4gIH1cblxuXG4gIGdldCBUSU1FT1VUX0RFRkFVTFQoKSB7XG4gICAgcmV0dXJuIDUwMDA7XG4gIH1cblxuXG59XG5cbmV4cG9ydHMuRXJyb3IgPSBFcnJvcjtcblxuZXhwb3J0IGNsYXNzIFRlc3QgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnZXJyb3InKTtcbiAgfVxuXG5cbiAgZ2V0IFRJTUVPVVRfREVGQVVMVCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG5cbn1cblxuZXhwb3J0cy5UZXN0ID0gVGVzdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L25vdGlmaWNhdGlvbi9pbmRleC5qc1xuICoqLyIsIi8vIFVzYWdlOlxuLy8gIDEpIG5ldyBTcGlubmVyKHsgZWxlbTogZWxlbX0pIC0+IHN0YXJ0L3N0b3AoKVxuLy8gIDIpIG5ldyBTcGlubmVyKCkgLT4gc29tZXdoZXJlLmFwcGVuZChzcGlubmVyLmVsZW0pIC0+IHN0YXJ0L3N0b3BcbmZ1bmN0aW9uIFNwaW5uZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5lbGVtID0gb3B0aW9ucy5lbGVtO1xuXG4gIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZSB8fCAnbWVkaXVtJztcbiAgLy8gYW55IGNsYXNzIHRvIGFkZCB0byBzcGlubmVyIChtYWtlIHNwaW5uZXIgc3BlY2lhbCBoZXJlKVxuICB0aGlzLmNsYXNzID0gb3B0aW9ucy5jbGFzcyA/ICgnICcgKyBvcHRpb25zLmNsYXNzKSA6ICcnO1xuXG4gIC8vIGFueSBjbGFzcyB0byBhZGQgdG8gZWxlbWVudCAodG8gaGlkZSBpdCdzIGNvbnRlbnQgZm9yIGluc3RhbmNlKVxuICB0aGlzLmVsZW1DbGFzcyA9IG9wdGlvbnMuZWxlbUNsYXNzO1xuXG4gIGlmICh0aGlzLnNpemUgIT0gJ21lZGl1bScgJiYgdGhpcy5zaXplICE9ICdzbWFsbCcgJiYgdGhpcy5zaXplICE9ICdsYXJnZScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBzaXplOiBcIiArIHRoaXMuc2l6ZSk7XG4gIH1cblxuICBpZiAoIXRoaXMuZWxlbSkge1xuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG59XG5cblNwaW5uZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmVsZW1DbGFzcykge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuZWxlbUNsYXNzKTtcbiAgfVxuXG4gIHRoaXMuZWxlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8c3BhbiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lcl9hY3RpdmUgc3Bpbm5lcl8nICsgdGhpcy5zaXplICsgdGhpcy5jbGFzcyArICdcIj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfMlwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfM1wiPjwvc3Bhbj48L3NwYW4+Jyk7XG59O1xuXG5TcGlubmVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzcGlubmVyRWxlbSA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lcicpO1xuICBpZiAoIXNwaW5uZXJFbGVtKSByZXR1cm47IC8vIGFscmVhZHkgc3RvcHBlZCBvciBuZXZlciBzdGFydGVkXG5cbiAgc3Bpbm5lckVsZW0ucmVtb3ZlKCk7XG5cbiAgaWYgKHRoaXMuZWxlbUNsYXNzKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC50b2dnbGUodGhpcy5lbGVtQ2xhc3MpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5uZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9zcGlubmVyLmpzXG4gKiovIiwiLy8gaWYgY2xhc3MgZW5kcyB3aXRoIF91bnJlYWR5IHRoZW4gd2UgY29uc2lkZXIgZWxlbWVudCB1bnVzYWJsZSAoeWV0KVxuXG5cbi8vIGNhbmNlbCBjbGlja3Mgb24gPGEgY2xhc3M9XCJ1bnJlYWR5XCI+IGFuZCA8YnV0dG9uIGNsYXNzPVwidW5yZWFkeVwiPlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIHdoaWxlICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZS5tYXRjaCgvX3VucmVhZHlcXGIvKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gIH1cbn0pO1xuXG4vLyBjYW5jZWwgc3VibWl0cyBvZiA8Zm9ybSBjbGFzcz1cInVucmVhZHlcIj5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUubWF0Y2goL191bnJlYWR5XFxiLykpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvdW5yZWFkeS5qc1xuICoqLyIsInZhciBNb2RhbCA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcbnZhciBTcGlubmVyID0gcmVxdWlyZSgnY2xpZW50L3NwaW5uZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3Rpb24tbG9naW4nKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGxvZ2luKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBsb2dpbigpIHtcbiAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKCk7XG4gIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIoKTtcbiAgbW9kYWwuc2V0Q29udGVudChzcGlubmVyLmVsZW0pO1xuICBzcGlubmVyLnN0YXJ0KCk7XG5cbiAgcmVxdWlyZS5lbnN1cmUoJ2F1dGgvY2xpZW50JywgZnVuY3Rpb24oKSB7XG4gICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgdmFyIEF1dGhNb2RhbCA9IHJlcXVpcmUoJ2F1dGgvY2xpZW50JykuQXV0aE1vZGFsO1xuICAgIG5ldyBBdXRoTW9kYWwoKTtcbiAgfSwgJ2F1dGhDbGllbnQnKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9sb2dpbi5qc1xuICoqLyIsIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3Rpb24tdXNlci1sb2dvdXQnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsb2dvdXQoKTtcbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gIGZvcm0uYWN0aW9uID0gJy9hdXRoL2xvZ291dD9fY3NyZj0nICsgZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pWzFdO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9sb2dvdXQuanNcbiAqKi8iLCJmdW5jdGlvbiBNb2RhbCgpIHtcbiAgdGhpcy5yZW5kZXIoKTtcblxuICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgdGhpcy5vbkRvY3VtZW50S2V5RG93biA9IHRoaXMub25Eb2N1bWVudEtleURvd24uYmluZCh0aGlzKTtcblxuICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMub25Eb2N1bWVudEtleURvd24pO1xufVxuXG5Nb2RhbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCAnPGRpdiBjbGFzcz1cIm1vZGFsXCI+PGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPjwvZGl2PjwvZGl2PicpO1xuICB0aGlzLmVsZW0gPSBkb2N1bWVudC5ib2R5Lmxhc3RDaGlsZDtcbiAgdGhpcy5jb250ZW50RWxlbSA9IHRoaXMuZWxlbS5sYXN0Q2hpbGQ7XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZS1idXR0b24nKSkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cbn07XG5cblxuTW9kYWwucHJvdG90eXBlLm9uRG9jdW1lbnRLZXlEb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cbn07XG5cbk1vZGFsLnByb3RvdHlwZS5zaG93T3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbnRlbnRFbGVtLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5oaWRlT3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbnRlbnRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24oaHRtbE9yTm9kZSkge1xuICBpZiAodHlwZW9mIGh0bWxPck5vZGUgPT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmlubmVySFRNTCA9IGh0bWxPck5vZGU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jb250ZW50RWxlbS5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmFwcGVuZENoaWxkKGh0bWxPck5vZGUpO1xuICB9XG4gIHZhciBhdXRvZm9jdXMgPSB0aGlzLmNvbnRlbnRFbGVtLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdJyk7XG4gIGlmIChhdXRvZm9jdXMpIGF1dG9mb2N1cy5mb2N1cygpO1xufTtcblxuTW9kYWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuZWxlbSk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMub25Eb2N1bWVudEtleURvd24pO1xuICB0aGlzLmVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJtb2RhbENsb3NlXCIpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL21vZGFsLmpzXG4gKiovIiwiLypcbtCY0LfQsdC10LPQsNC10LwgRk9VVCAtINC/0YDQvtGB0YLQvtC5INGB0L/QvtGB0L7QsSDQv9GA0L7QstC10YDQutC4INC30LDQs9GA0YPQt9C60Lgg0LjQutC+0L3QuNC6INGI0YDQuNGE0YLQsC5cbiAxKSDQlNC10LvQsNC10Lwg0LIgaWNvbmljINGI0YDQuNGE0YLQtSDQvtC00LjQvSDRgdC40LzQstC+0Lsg0YEg0LrQvtC00L7QvCAyMSAo0LLQvNC10YHRgtC+IMKrIcK7KVxuINCSIGljb25tb29uXG4gaHR0cDovL2lseWFrYW50b3IucnUvc2NyZWVuLzIwMTQtMDktMDZfMDE1Mi5wbmdcbiBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNC0wOS0wNl8wMTUzLnBuZ1xuXG4g0K3RgtC+0YIg0YjRgNC40YTRgiDQsiDQvtCx0YvRh9C90L7QvCDRiNGA0LjRhNGC0LUgKHNlcmlmKSDRg9C30LrQuNC5INC/0L4g0YjQuNGA0LjQvdC1LCDQsCDQsiBpY29uaWMgLSDQvdC+0YDQvNCw0LvRjNC90YvQuS5cbiAyKSDQlNCw0LvQtdC1INC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0L7Qt9C00LDRkdC8IDxzcGFuPiE8L3NwYW4+INC4INC00LDRkdC8INC10LzRgyBmb250RmFtaWx5INGB0L3QsNGH0LDQu9CwIHNlcmlmINC4INC30LDQvNC10YDRj9C10Lwg0YjQuNGA0LjQvdGDLCDQsCDQv9C+0YLQvtC8IEZvbnRJY29ucywgc2VyaWYuXG4g0J7RgtC70LDQstC70LjQstCw0LXQvCDQvNC+0LzQtdC90YIsINC60L7Qs9C00LAg0YjQuNGA0LjQvdCwINC40LfQvNC10L3QuNGC0YHRjy4g0K3RgtC+INC30L3QsNGH0LjRgiDRiNGA0LjRhNGCINC30LDQs9GA0YPQttC10L0uXG4g0JzQvtC20L3QviDRg9Cx0YDQsNGC0Ywg0LrQu9Cw0YHRgSAubm8taWNvbnMg0Lgg0L/QvtC60LDQt9Cw0YLRjCDQuNC60L7QvdC60LguXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgZWxlbS5jbGFzc05hbWUgPSAnZm9udC10ZXN0JztcbiAgZWxlbS5zdHlsZS5mb250RmFtaWx5ID0gJ3NlcmlmJztcbiAgdmFyIGluaXRpYWxXaWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG5cbiAgZWxlbS5zdHlsZS5mb250RmFtaWx5ID0gJyc7XG5cbiAgZnVuY3Rpb24gY2hlY2tGb250TG9hZGVkKCkge1xuICAgIGlmIChpbml0aWFsV2lkdGggIT0gZWxlbS5vZmZzZXRXaWR0aCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1pY29ucycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KGNoZWNrRm9udExvYWRlZCwgMTAwKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0ZvbnRMb2FkZWQoKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvZm9udFRlc3QuanNcbiAqKi8iLCJ2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG5cbnZhciBERUJVRyA9IGZhbHNlO1xuZnVuY3Rpb24gbG9nKCkge1xuICBpZiAoREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbnZhciBUQUJMRVRfV0lEVEggPSA4NDA7XG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBkb24ndCBoYW5kbGUgb25zY3JvbGwgbW9yZSBvZnRlbiB0aGFuIGFuaW1hdGlvblxuICBmdW5jdGlvbiBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZCgpIHtcbiAgICBsb2coXCJvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZFwiLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZUlkKSByZXR1cm47XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZSgpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgIH0pO1xuXG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuXG59KSgpO1xuXG5mdW5jdGlvbiBjb21wYWN0aWZ5U2lkZWJhcigpIHtcbiAgbG9nKFwiY29tcGFjdGlmeVNpZGViYXJcIik7XG4gIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICB2YXIgc2lkZWJhckNvbnRlbnQgPSBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19jb250ZW50Jyk7XG4gIHZhciBzaWRlYmFySW5uZXIgPSBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19pbm5lcicpO1xuXG4gIHZhciBoYXNTdGlja3lGb290ZXIgPSBzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9zdGlja3ktZm9vdGVyJyk7XG4gIHZhciBpc0NvbXBhY3QgPSBzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9jb21wYWN0Jyk7XG5cbiAgaWYgKGlzQ29tcGFjdCkge1xuICAgIHZhciBlbXB0eVNwYWNlU2l6ZTtcbiAgICBpZiAoaGFzU3RpY2t5Rm9vdGVyKSB7XG4gICAgICBlbXB0eVNwYWNlU2l6ZSA9IHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC1cbiAgICAgIHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtcHR5U3BhY2VTaXplID0gc2lkZWJhckNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC1cbiAgICAgIHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgIH1cblxuICAgIGxvZyhcImRlY29tcGFjdD9cIiwgZW1wdHlTcGFjZVNpemUpO1xuXG4gICAgLy8gZW5vdWdoIHNwYWNlIHRvIG9jY3VweSB0aGUgZnVsbCBoZWlnaHQgaW4gZGVjb21wYWN0ZWQgZm9ybSB3aXRob3V0IHNjcm9sbGJhclxuICAgIGlmIChlbXB0eVNwYWNlU2l6ZSA+IDE1MCkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX2NvbXBhY3QnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBsb2coc2lkZWJhcklubmVyLnNjcm9sbEhlaWdodCwgc2lkZWJhcklubmVyLmNsaWVudEhlaWdodCk7XG4gICAgaWYgKHNpZGViYXJJbm5lci5zY3JvbGxIZWlnaHQgPiBzaWRlYmFySW5uZXIuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBsb2coXCJjb21wYWN0IVwiKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9jb21wYWN0Jyk7XG4gICAgfVxuICB9XG5cblxufVxuXG5mdW5jdGlvbiBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZSgpIHtcblxuICB2YXIgc2l0ZXRvb2xiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZXRvb2xiYXInKTtcbiAgaWYgKCFzaXRldG9vbGJhcikge1xuICAgIGxvZyhcIm5vIHNpdGV0b29sYmFyXCIpO1xuICAgIHJldHVybjsgLy8gcGFnZSBpbiBhIG5vLXRvcC1uYXYgbGF5b3V0XG4gIH1cblxuICB2YXIgc2l0ZXRvb2xiYXJIZWlnaHQgPSBzaXRldG9vbGJhci5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIGlmIChzaWRlYmFyKSB7XG4gICAgc2lkZWJhci5zdHlsZS50b3AgPSBNYXRoLm1heChzaXRldG9vbGJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20sIDApICsgJ3B4JztcbiAgICBjb21wYWN0aWZ5U2lkZWJhcigpO1xuICB9XG5cbiAgc2V0VXNlclNjYWxlSWZUYWJsZXQoKTtcblxuXG59XG5cbmZ1bmN0aW9uIHNldFVzZXJTY2FsZUlmVGFibGV0KCkge1xuICB2YXIgaXNUYWJsZXQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPD0gVEFCTEVUX1dJRFRIO1xuICB2YXIgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJykuY29udGVudDtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvdXNlci1zY2FsYWJsZT1cXHcrLywgJ3VzZXItc2NhbGFibGU9JyArIChpc1RhYmxldCA/ICd5ZXMnIDogJ25vJykpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ2aWV3cG9ydFwiXScpLmNvbnRlbnQgPSBjb250ZW50O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbGF5b3V0LmpzXG4gKiovIiwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TZWFyY2hDbGljayk7XG5cblxuLy8gdG9nZ2xlIHNlYXJjaCBvbi9vZmYsIGF1dG9mb2N1cyBvbiBpbnB1dCB3aGVuIFwib25cIlxuZnVuY3Rpb24gb25TZWFyY2hDbGljayhldmVudCkge1xuICB2YXIgc2VhcmNoVG9nZ2xlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaXRldG9vbGJhcl9fc2VhcmNoLXRvZ2dsZScpO1xuXG4gIGlmIChzZWFyY2hUb2dnbGUpIHtcbiAgICB0b2dnbGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gIHZhciBzaXRldG9vbGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRldG9vbGJhcicpO1xuICBzaXRldG9vbGJhci5jbGFzc0xpc3QudG9nZ2xlKCdzaXRldG9vbGJhcl9zZWFyY2hfb3BlbicpO1xuXG4gIHZhciBpbnB1dCA9IHNpdGV0b29sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaXRldG9vbGJhcl9fc2VhcmNoLXF1ZXJ5IGlucHV0Jyk7XG4gIGlmIChzaXRldG9vbGJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGV0b29sYmFyX3NlYXJjaF9vcGVuJykpIHtcbiAgICBpbnB1dC5mb2N1cygpO1xuXG4gICAgaWYgKCFpbnB1dC5vbmtleWRvd24pIHtcbiAgICAgIGlucHV0Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvc2l0ZXRvb2xiYXIuanNcbiAqKi8iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5jbGFzc0xpc3QudG9nZ2xlKCdwYWdlX3NpZGViYXJfb24nKTtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2Vfc2lkZWJhcl9vbicpKSB7XG4gICAgZGVsZXRlIGxvY2FsU3RvcmFnZS5ub1NpZGViYXI7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLm5vU2lkZWJhciA9IDE7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBvbkNsaWNrKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQuZGF0YXNldC5zaWRlYmFyVG9nZ2xlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICB0b2dnbGUoKTtcbn1cblxuXG5mdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgLy8gZG9uJ3QgcmVhY3Qgb24gQ3RybC0+IDwtIGlmIGluIHRleHRcbiAgaWYgKH5bJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lKSkgcmV0dXJuO1xuXG4gIGlmIChldmVudC5rZXlDb2RlICE9IFwiU1wiLmNoYXJDb2RlQXQoMCkpIHJldHVybjtcblxuICBpZiAofm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwibWFjIG9zIHhcIikpIHtcbiAgICBpZiAoIWV2ZW50Lm1ldGFLZXkgfHwgIWV2ZW50LmFsdEtleSkgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIGlmICghZXZlbnQuYWx0S2V5KSByZXR1cm47XG4gIH1cblxuICB0b2dnbGUoKTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9zaWRlYmFyLmpzXG4gKiovIiwiLy8gbmF2aWdhdGlvbiBzdGFydHMgdG8gd29yayByaWdodCBub3dcbnZhciBvblN3aXBlID0gcmVxdWlyZSgnY2xpZW50L29uU3dpcGUnKTtcbnZhciBjdHJsT3JBbHQgPSB+bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJtYWMgb3MgeFwiKSA/ICdjdHJsJyA6ICdhbHQnO1xuXG5mdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgLy8gZG9uJ3QgcmVhY3Qgb24gQ3RybC0+IDwtIGlmIGluIHRleHRcbiAgaWYgKH5bJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lKSkgcmV0dXJuO1xuXG4gIGlmICghZXZlbnRbY3RybE9yQWx0ICsgJ0tleSddKSByZXR1cm47XG5cbiAgdmFyIHJlbCA9IG51bGw7XG4gIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICBjYXNlIDB4MjU6XG4gICAgcmVsID0gJ3ByZXYnO1xuICAgIGJyZWFrO1xuICBjYXNlIDB4Mjc6XG4gICAgcmVsID0gJ25leHQnO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCInICsgcmVsICsgJ1wiXScpO1xuICBpZiAoIWxpbmspIHJldHVybjtcblxuICBkb2N1bWVudC5sb2NhdGlvbiA9IGxpbmsuaHJlZjtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxufVxuXG5mdW5jdGlvbiBzaG93SG90S2V5cygpIHtcbiAgdmFyIGtleURlc2MgPSBjdHJsT3JBbHRbMF0udG9VcHBlckNhc2UoKSArIGN0cmxPckFsdC5zbGljZSgxKTtcblxuICB2YXIgc2hvcnRjdXQ7XG5cbiAgdmFyIG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cIm5leHRcIl0nKTtcbiAgaWYgKG5leHQpIHtcbiAgICBzaG9ydGN1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZj1cIicgKyBuZXh0LmdldEF0dHJpYnV0ZSgnaHJlZicpICsgJ1wiXSAucGFnZV9fbmF2LXRleHQtc2hvcnRjdXQnKTtcbiAgICBzaG9ydGN1dC5pbm5lckhUTUwgPSBrZXlEZXNjICsgJyArIDxzcGFuIGNsYXNzPVwicGFnZV9fbmF2LXRleHQtYXJyXCI+4oaSPC9zcGFuPic7XG4gIH1cblxuICB2YXIgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwicHJldlwiXScpO1xuICBpZiAocHJldikge1xuICAgIHNob3J0Y3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwiJyArIHByZXYuZ2V0QXR0cmlidXRlKCdocmVmJykgKyAnXCJdIC5wYWdlX19uYXYtdGV4dC1zaG9ydGN1dCcpO1xuICAgIHNob3J0Y3V0LmlubmVySFRNTCA9IGtleURlc2MgKyAnICsgPHNwYW4gY2xhc3M9XCJwYWdlX19uYXYtdGV4dC1hcnJcIj7ihpA8L3NwYW4+JztcbiAgfVxuXG59XG5cbm9uU3dpcGUoZG9jdW1lbnQsIHtcbiAgb25SaWdodDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cInByZXZcIl0nKTtcbiAgICBpZiAobGluaykgZG9jdW1lbnQubG9jYXRpb24gPSBsaW5rLmhyZWY7XG4gIH0sXG4gIG9uTGVmdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cIm5leHRcIl0nKTtcbiAgICBpZiAobGluaykgZG9jdW1lbnQubG9jYXRpb24gPSBsaW5rLmhyZWY7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNob3dIb3RLZXlzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qc1xuICoqLyIsIi8vIGFkZC9yZW1vdmUgLmhvdmVyIG9ubW91c2VlbnRlci9sZWF2ZVxuLy8gZm9yIG1vYmlsZSBkZXZpY2VzICg6aG92ZXIgc3RpY2tzKVxuXG52YXIgY3VycmVudEhvdmVyRWxlbTtcblxuLypcbmZ1bmN0aW9uIGxvZyhlKSB7XG4gIGNvbnNvbGUubG9nKERhdGUubm93KCkgJSAxZTQsIGUudHlwZSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hsZWF2ZVwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hcIiwgbG9nLCBmYWxzZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbG9nLCBmYWxzZSk7XG4qL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1hZGQtY2xhc3Mtb24taG92ZXJdJyk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBjdXJyZW50SG92ZXJFbGVtID0gdGFyZ2V0O1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xuICB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGlmIChjdXJyZW50SG92ZXJFbGVtKSB7XG4gICAgICBjdXJyZW50SG92ZXJFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gICAgICBjdXJyZW50SG92ZXJFbGVtID0gbnVsbDtcbiAgICB9XG4gIH0sIDUwMCk7IC8vIHRvdWNoc3RhcnQgLT4gdG91cmNoZW5kIC0+IChkZWxheSB1cCB0byAzMDBtcykgLT4gbW91c2VvdmVyXG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihldmVudCkge1xuICBpZiAoIWN1cnJlbnRIb3ZlckVsZW0pIHJldHVybjtcblxuICBpZiAoY3VycmVudEhvdmVyRWxlbS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGN1cnJlbnRIb3ZlckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgY3VycmVudEhvdmVyRWxlbSA9IG51bGw7XG59KTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2hvdmVyLmpzXG4gKiovIiwid2luZG93LnJ1bkRlbW8gPSBmdW5jdGlvbihidXR0b24pIHtcblxuICB2YXIgZGVtb0VsZW07XG4gIHZhciBwYXJlbnQgPSBidXR0b247XG5cbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlKHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgZGVtb0VsZW0gPSBwYXJlbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZGVtb10nKTtcbiAgICBpZiAoZGVtb0VsZW0pIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFkZW1vRWxlbSkge1xuICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwLCDQvdC10YIg0Y3Qu9C10LzQtdC90YLQsCDRgSDQtNC10LzQvlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvKiBqc2hpbnQgLVcwNjEgKi9cbiAgICBldmFsKGRlbW9FbGVtLnRleHRDb250ZW50KTtcbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvcnVuRGVtby5qc1xuICoqLyIsInZhciBpZnJhbWVSZXNpemUgPSByZXF1aXJlKCcuL2lmcmFtZVJlc2l6ZScpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnbGliL3Rocm90dGxlJyk7XG4vLyB0cmFjayByZXNpemVkIGlmcmFtZXMgaW4gd2luZG93Lm9ucmVzaXplXG5cbnZhciBvblJlc2l6ZVF1ZXVlID0gW107XG5cbmV4cG9ydHMuaWZyYW1lID0gZnVuY3Rpb24oaWZyYW1lKSB7XG5cbiAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIGlmcmFtZVJlc2l6ZS5hc3luYyhpZnJhbWUsIGZ1bmN0aW9uKGVyciwgaGVpZ2h0KSB7XG4gICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICBpZiAoaGVpZ2h0KSBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2l6ZSgpO1xufTtcblxuZXhwb3J0cy5jb2RlVGFicyA9IGZ1bmN0aW9uKGlmcmFtZSkge1xuICBmdW5jdGlvbiBoaWRlU2hvd0Fycm93cygpIHtcblxuICAgIC8vIGFkZCBhcnJvd3MgaWYgbmVlZGVkXG4gICAgdmFyIGVsZW0gPSBpZnJhbWUuY2xvc2VzdCgnLmNvZGUtdGFicycpO1xuICAgIHZhciBjb250ZW50RWxlbSA9IGlmcmFtZS5jbG9zZXN0KCdbZGF0YS1jb2RlLXRhYnMtY29udGVudF0nKTtcbiAgICB2YXIgc3dpdGNoZXNFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtc3dpdGNoZXNdJyk7XG4gICAgdmFyIHN3aXRjaGVzRWxlbUl0ZW1zID0gc3dpdGNoZXNFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgaWYgKHN3aXRjaGVzRWxlbUl0ZW1zLm9mZnNldFdpZHRoID4gc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2RlLXRhYnNfc2Nyb2xsJyk7XG4gICAgfVxuXG4gIH1cblxuICBoaWRlU2hvd0Fycm93cygpO1xuICBvblJlc2l6ZVF1ZXVlLnB1c2goaGlkZVNob3dBcnJvd3MpO1xufTtcblxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZShmdW5jdGlvbigpIHtcbiAgb25SZXNpemVRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uKG9uUmVzaXplKSB7XG4gICAgb25SZXNpemUoKTtcbiAgfSk7XG59LCAyMDApKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2luZGV4LmpzXG4gKiovIiwicmVxdWlyZSgnLi9kb20nKTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9pbmRleC5qc1xuICoqLyIsImZ1bmN0aW9uIG9uU3dpcGUoZWxlbSwgb3B0aW9ucykge1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGFydFgsXG4gICAgICBzdGFydFksXG4gICAgICBkaXN0LFxuICAgICAgb25SaWdodCA9IG9wdGlvbnMub25SaWdodCB8fCBmdW5jdGlvbigpIHt9LFxuICAgICAgb25MZWZ0ID0gb3B0aW9ucy5vbkxlZnQgfHwgZnVuY3Rpb24oKXt9LFxuICAgICAgdG9sZXJhbmNlID0gb3B0aW9ucy50b2xlcmFuY2UgfHwgMTAwLCAvLyBtYXhpbXVtIHZlcnRpY2FsIGRpc3RhbmNlXG4gICAgICB0aHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAxNTAsIC8vcmVxdWlyZWQgbWluIGRpc3RhbmNlIHRyYXZlbGVkIHRvIGJlIGNvbnNpZGVyZWQgc3dpcGVcbiAgICAgIGFsbG93ZWRUaW1lID0gb3B0aW9ucy5hbGxvd2VkVGltZSB8fCA1MDAsIC8vIG1heGltdW0gdGltZSBhbGxvd2VkIHRvIHRyYXZlbCB0aGF0IGRpc3RhbmNlXG4gICAgICBlbGFwc2VkVGltZSxcbiAgICAgIHN0YXJ0VGltZTtcblxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICBkaXN0ID0gMDtcbiAgICBzdGFydFggPSB0b3VjaG9iai5wYWdlWDtcbiAgICBzdGFydFkgPSB0b3VjaG9iai5wYWdlWTtcbiAgICAvL2NvbnNvbGUubG9nKFwic3RhcnRcIiwgc3RhcnRYLCBzdGFydFkpO1xuICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7IC8vIHJlY29yZCB0aW1lIHdoZW4gZmluZ2VyIGZpcnN0IG1ha2VzIGNvbnRhY3Qgd2l0aCBzdXJmYWNlXG4gIH0sIGZhbHNlKTtcblxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgZGlzdCA9IHRvdWNob2JqLnBhZ2VYIC0gc3RhcnRYOyAvLyBnZXQgdG90YWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICBlbGFwc2VkVGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7IC8vIGdldCB0aW1lIGVsYXBzZWRcblxuICAgIC8vY29uc29sZS5sb2coXCJlbmRcIiwgdG91Y2hvYmoucGFnZVgsIHRvdWNob2JqLnBhZ2VZKTtcblxuICAgIC8vIHRvbyBtdWNoIHVwL2Rvd25cbiAgICBpZiAoTWF0aC5hYnModG91Y2hvYmoucGFnZVkgLSBzdGFydFkpID4gdG9sZXJhbmNlKSByZXR1cm47XG5cbiAgICAvL2NvbnNvbGUubG9nKFwidGltZVwiLCBlbGFwc2VkVGltZSwgYWxsb3dlZFRpbWUpO1xuXG4gICAgLy8gdG9vIHNsb3dcbiAgICBpZiAoZWxhcHNlZFRpbWUgPiBhbGxvd2VkVGltZSkgcmV0dXJuO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcInRocmVzaG9sZFwiLCBkaXN0LCB0aHJlc2hvbGQpO1xuXG4gICAgaWYgKGRpc3QgPiB0aHJlc2hvbGQpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJyaWdodFwiKTtcbiAgICAgIG9uUmlnaHQoZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpc3QgPCAtdGhyZXNob2xkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgIG9uTGVmdChlKTtcbiAgICB9XG4gIH0sIGZhbHNlKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25Td2lwZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L29uU3dpcGUuanNcbiAqKi8iLCJ2YXIgZ2V0RG9jdW1lbnRIZWlnaHQgPSByZXF1aXJlKCdjbGllbnQvZG9tL2dldERvY3VtZW50SGVpZ2h0Jyk7XG5cbmZ1bmN0aW9uIGlmcmFtZVJlc2l6ZShpZnJFbGVtLCBjYWxsYmFjaykge1xuXG5cbiAgdmFyIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgLy8gZGVmYXVsdCBoZWlnaHRcbiAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgfSwgNTAwKTtcblxuICBmdW5jdGlvbiBkb25lKGVyciwgaGVpZ2h0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcik7XG5cbiAgICBjYWxsYmFjayhlcnIsIGhlaWdodCk7XG4gIH1cblxuICAvLyB0aHJvdyByaWdodCBub3cgaWYgY3Jvc3MtZG9tYWluXG4gIHRyeSB7XG4gICAgLyoganNoaW50IC1XMDMwICovXG4gICAgKGlmckVsZW0uY29udGVudERvY3VtZW50IHx8IGlmckVsZW0uY29udGVudFdpbmRvdy5kb2N1bWVudCkuYm9keTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluKGlmckVsZW0sIGRvbmUpO1xuICB9XG5cblxuICAvLyBISU5UOiBJIHNob3VsbmQndCBtb3ZlIGlmcmFtZSBpbiBET00sIGJlY2F1c2UgaXQgd2lsbCByZWxvYWQgaXQncyBjb250ZW50cyB3aGVuIGFwcGVuZGVkL2luc2VydGVkIGFueXdoZXJlIVxuICAvLyBzbyBJIGNyZWF0ZSBhIGNsb25lIGFuZCB3b3JrIG9uIGl0XG4gIGlmICghaWZyRWxlbS5vZmZzZXRXaWR0aCkge1xuICAgIC8vIGNsb25lIGlmcmFtZSBhdCBhbm90aGVyIHBsYWNlIHRvIHNlZSB0aGUgc2l6ZVxuICAgIHZhciBjbG9uZUlmcmFtZSA9IGlmckVsZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgIGNsb25lSWZyYW1lLm5hbWUgPSBcIlwiO1xuXG4gICAgY2xvbmVJZnJhbWUuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIGNsb25lSWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjbG9uZUlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBjbG9uZUlmcmFtZS5zdHlsZS50b3AgPSAnMTAwMDBweCc7XG5cbiAgICBjbG9uZUlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWlnaHQgPSBnZXREb2N1bWVudEhlaWdodCh0aGlzLmNvbnRlbnREb2N1bWVudCk7XG4gICAgICBpZnJFbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgY2xvbmVJZnJhbWUucmVtb3ZlKCk7XG4gICAgICBkb25lKG51bGwsIGhlaWdodCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvbmVJZnJhbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmckVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGlmckVsZW0uc3R5bGUuaGVpZ2h0ID0gJzFweCc7XG5cbiAgdmFyIGhlaWdodCA9IGdldERvY3VtZW50SGVpZ2h0KGlmckVsZW0uY29udGVudERvY3VtZW50KTtcblxuICBpZnJFbGVtLnN0eWxlLmhlaWdodCA9ICcnO1xuICBkb25lKG51bGwsIGhlaWdodCk7XG59XG5cbmlmcmFtZVJlc2l6ZS5hc3luYyA9IGZ1bmN0aW9uIGlmcmFtZVJlc2l6ZUFzeW5jKGlmcmFtZSwgY2FsbGJhY2spIHtcbiAgLy8gZGVsYXkgdG8gbGV0IHRoZSBjb2RlIGluc2lkZSB0aGUgaWZyYW1lIGZpbmlzaFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGlmcmFtZVJlc2l6ZShpZnJhbWUsIGNhbGxiYWNrKTtcbiAgfSwgMCk7XG59O1xuXG5cbmZ1bmN0aW9uIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluKGlmckVsZW0sIGNhbGxiYWNrKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZCB5ZXRcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWZyYW1lUmVzaXplO1xuXG5cbi8qXG4gd2luZG93Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiBpZiAoZS5vcmlnaW4gIT0gXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIikgcmV0dXJuO1xuIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuIGlmICghZGF0YSB8fCBkYXRhLmNtZCAhPSBcInJlc2l6ZS1pZnJhbWVcIikgcmV0dXJuO1xuIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoZGF0YS5uYW1lKVswXTtcblxuIGVsZW0uc3R5bGUuaGVpZ2h0ID0gK2RhdGEuaGVpZ2h0ICsgMTAgKyBcInB4XCI7XG4gdmFyIGRlZmVycmVkID0gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2RhdGEuaWRdO1xuIGRlZmVycmVkLnJlc29sdmUoKTtcbiB9O1xuXG4gZnVuY3Rpb24gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4oaWZyRWxlbSwgY2FsbGJhY2spIHtcblxuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gY2FsbGJhY2sobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gfSwgNTAwKTtcblxuIHRyeSB7XG4gLy8gdHJ5IHRvIHNlZSBpZiByZXNpemVyIGNhbiB3b3JrIG9uIHRoaXMgaWZyYW1lXG4gaWZyRWxlbS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKFwidGVzdFwiLCBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbVwiKTtcbiB9IGNhdGNoKGUpIHtcbiAvLyBpZnJhbWUgZnJvbSBhbm90aGVyIGRvbWFpbiwgc29ycnlcbiBjYWxsYmFjayhuZXcgRXJyb3IoXCJ0aGUgcmVzaXplciBtdXN0IGJlIGZyb20gcnUubG9va2F0Y29kZS5jb21cIikpO1xuIHJldHVybjtcbiB9XG5cbiBpZiAoIWlmckVsZW0ub2Zmc2V0V2lkdGgpIHtcbiAvLyBtb3ZlIGlmcmFtZSB0byBhbm90aGVyIHBsYWNlIHRvIHJlc2l6ZSB0aGVyZVxuIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiBpZnJFbGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBpZnJFbGVtKTtcbiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmckVsZW0pO1xuIH1cblxuIGlmckVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuIHZhciBpZCA9IFwiXCIgKyBNYXRoLnJhbmRvbSgpO1xuIHZhciBtZXNzYWdlID0geyBjbWQ6ICdyZXNpemUtaWZyYW1lJywgbmFtZTogaWZyRWxlbVswXS5uYW1lLCBpZDogaWQgfTtcbiAvLyBUT0RPXG4gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2lkXSA9IGRlZmVycmVkO1xuIGRlZmVycmVkLmFsd2F5cyhmdW5jdGlvbigpIHtcbiBkZWxldGUgaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2lkXTtcbiB9KTtcblxuIHZhciBmcmFtZSA9IGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmlmcmFtZTtcbiBpZiAoZnJhbWUubG9hZGVkKSB7XG4gZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIik7XG4gfSBlbHNlIHtcbiBmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuIGZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tXCIpO1xuIH0pO1xuIH1cblxuIGlmIChwbGFjZWhvbGRlcikge1xuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gcGxhY2Vob2xkZXIucmVwbGFjZVdpdGgoaWZyRWxlbSk7XG4gfSwgMjApO1xuIH1cblxuIHJldHVybiBkZWZlcnJlZDtcbiB9XG5cbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5kZWZlcnJlZHMgPSB7fTtcbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5pZnJhbWUgPSAkKCc8aWZyYW1lIHNyYz1cImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9maWxlcy9pZnJhbWUtcmVzaXplLmh0bWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvaWZyYW1lPicpLnByZXBlbmRUbygnYm9keScpO1xuIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmlmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiB9KTtcbiAqL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9yZXNpemVPbmxvYWQvaWZyYW1lUmVzaXplLmpzXG4gKiovIiwiXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcykge1xuXG4gIHZhciBpc1Rocm90dGxlZCA9IGZhbHNlLFxuICAgICAgc2F2ZWRBcmdzLFxuICAgICAgc2F2ZWRUaGlzO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG5cbiAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgIHNhdmVkQXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHNhdmVkVGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaXNUaHJvdHRsZWQgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlzVGhyb3R0bGVkID0gZmFsc2U7XG4gICAgICBpZiAoc2F2ZWRBcmdzKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwbHkoc2F2ZWRUaGlzLCBzYXZlZEFyZ3MpO1xuICAgICAgICBzYXZlZEFyZ3MgPSBzYXZlZFRoaXMgPSBudWxsO1xuICAgICAgfVxuICAgIH0sIG1zKTtcbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9tb2R1bGVzL2xpYi90aHJvdHRsZS5qc1xuICoqLyIsIi8vcmVxdWlyZSgnLi9jYXNwZXJqcycpO1xuXG4vLyBodHRwOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jbXV0YXRpb24tbWV0aG9kLW1hY3JvXG5mdW5jdGlvbiBtdXRhdGlvbihub2Rlcykge1xuICBpZiAoIW5vZGVzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRE9NIEV4Y2VwdGlvbiA4Jyk7XG4gIH0gZWxzZSBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBub2Rlc1swXSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2Rlc1swXSkgOiBub2Rlc1swXTtcbiAgfSBlbHNlIHtcbiAgICB2YXJcbiAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgbGVuZ3RoID0gbm9kZXMubGVuZ3RoLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIG5vZGU7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgbm9kZSA9IG5vZGVzW2luZGV4XTtcblxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSkgOiBub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG4gIH1cbn1cblxudmFyIG1ldGhvZHMgPSB7XG4gIC8vIHNhZmFyaSA9IHdlYmtpdE1hdGNoZXNTZWxlY3RvclxuICBtYXRjaGVzOiBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcixcbiAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZSgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMpO1xuICAgIH1cbiAgfSxcbiAgcHJlcGVuZDogZnVuY3Rpb24gcHJlcGVuZCgpIHtcbiAgICB0aGlzLmluc2VydEJlZm9yZShtdXRhdGlvbihhcmd1bWVudHMpLCB0aGlzLmZpcnN0Q2hpbGQpO1xuICB9LFxuICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZCgpIHtcbiAgICB0aGlzLmFwcGVuZENoaWxkKG11dGF0aW9uKGFyZ3VtZW50cykpO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnROb2RlID0gdGhpcy5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gcGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICB9XG4gIH0sXG4gIGJlZm9yZTogZnVuY3Rpb24gYmVmb3JlKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobXV0YXRpb24oYXJndW1lbnRzKSwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIGFmdGVyOiAgIGZ1bmN0aW9uIGFmdGVyKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobXV0YXRpb24oYXJndW1lbnRzKSwgdGhpcy5uZXh0U2libGluZyk7XG4gICAgfVxuICB9LFxuICBjbG9zZXN0OiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHZhciBub2RlID0gdGhpcztcblxuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkgcmV0dXJuIG5vZGU7XG4gICAgICBlbHNlIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5mb3IgKHZhciBtZXRob2ROYW1lIGluIG1ldGhvZHMpIHtcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgIEVsZW1lbnQucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbWV0aG9kc1ttZXRob2ROYW1lXTtcbiAgfVxufVxuXG5yZXF1aXJlKCcuL2N1c3RvbUV2ZW50Jyk7XG5yZXF1aXJlKCcuL2RhdGFzZXQnKTtcbnJlcXVpcmUoJy4vaGlkZGVuJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvZG9tLmpzXG4gKiovIiwidmFyIGdldFNjcm9sbGJhckhlaWdodCA9IHJlcXVpcmUoJy4vZ2V0U2Nyb2xsYmFySGVpZ2h0Jyk7XG52YXIgc2Nyb2xsYmFySGVpZ2h0O1xuXG5mdW5jdGlvbiBnZXREb2N1bWVudEhlaWdodChkb2MpIHtcbiAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG4gIHZhciBoZWlnaHQgPSBNYXRoLm1heChcbiAgICBkb2MuYm9keS5zY3JvbGxIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgIGRvYy5ib2R5Lm9mZnNldEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgZG9jLmJvZHkuY2xpZW50SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICApO1xuXG4gIGlmIChkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoID4gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkge1xuICAgIC8vIGdvdCBhIGhvcml6IHNjcm9sbCwgbGV0J3MgYWRkIGl0XG4gICAgaWYgKCFzY3JvbGxiYXJIZWlnaHQpIHNjcm9sbGJhckhlaWdodCA9IGdldFNjcm9sbGJhckhlaWdodCgpO1xuICAgIGhlaWdodCArPSBzY3JvbGxiYXJIZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERvY3VtZW50SGVpZ2h0O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kb20vZ2V0RG9jdW1lbnRIZWlnaHQuanNcbiAqKi8iLCJcbnRyeSB7XG4gIG5ldyBDdXN0b21FdmVudChcIklFIGhhcyBDdXN0b21FdmVudCwgYnV0IGRvZXNuJ3Qgc3VwcG9ydCBjb25zdHJ1Y3RvclwiKTtcbn0gY2F0Y2ggKGUpIHtcblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbihldmVudCwgcGFyYW1zKSB7XG4gICAgdmFyIGV2dDtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogICAgZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogICAgIHVuZGVmaW5lZFxuICAgIH07XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgIHJldHVybiBldnQ7XG4gIH07XG5cbiAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuRXZlbnQucHJvdG90eXBlKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvY3VzdG9tRXZlbnQuanNcbiAqKi8iLCIvLyBkYXRhc2V0IGZvciBJRTEwXG5cbmlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQgJiZcbiAgICAvLyBGRiBpcyBlbXB0eSB3aGlsZSBJRSBnaXZlcyBlbXB0eSBvYmplY3RcbiAgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcpICB8fFxuICAhT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnKS5nZXQpXG4pIHtcbiAgdmFyIHByb3BEZXNjcmlwdG9yID0ge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICB0aGF0ID0gdGhpcyxcbiAgICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXAsXG4gICAgICAgICAgYXR0clZhbCwgYXR0ck5hbWUsIHByb3BOYW1lLFxuICAgICAgICAgIGF0dHJpYnV0ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgIGF0dHNMZW5ndGggPSBhdHRyaWJ1dGVzLmxlbmd0aCxcbiAgICAgICAgICB0b1VwcGVyQ2FzZSA9IGZ1bmN0aW9uIChuMCkge1xuICAgICAgICAgICAgcmV0dXJuIG4wLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXR0ZXIgPSBmdW5jdGlvbiAoYXR0ck5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpID9cbiAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKSA6XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICB9O1xuICAgICAgdHJ5IHsgLy8gU2ltdWxhdGUgRE9NU3RyaW5nTWFwIHcvYWNjZXNzb3Igc3VwcG9ydFxuICAgICAgICAvLyBUZXN0IHNldHRpbmcgYWNjZXNzb3Igb24gbm9ybWFsIG9iamVjdFxuICAgICAgICAoe30pLl9fZGVmaW5lR2V0dGVyX18oJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgICAgIEhUTUw1X0RPTVN0cmluZ01hcCA9IHt9O1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUxKSB7IC8vIFVzZSBhIERPTSBvYmplY3QgZm9yIElFOFxuICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhdHRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgLy8gRml4OiBUaGlzIHRlc3QgcmVhbGx5IHNob3VsZCBhbGxvdyBhbnkgWE1MIE5hbWUgd2l0aG91dFxuICAgICAgICAvLyAgICAgICAgIGNvbG9ucyAoYW5kIG5vbi11cHBlcmNhc2UgZm9yIFhIVE1MKVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS5uYW1lICYmXG4gICAgICAgICAgKC9eZGF0YS1cXHdbXFx3XFwtXSokLykudGVzdChhdHRyaWJ1dGUubmFtZSkpIHtcbiAgICAgICAgICBhdHRyVmFsID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgIGF0dHJOYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAgICAgLy8gQ2hhbmdlIHRvIENhbWVsQ2FzZVxuICAgICAgICAgIHByb3BOYW1lID0gYXR0ck5hbWUuc3Vic3RyKDUpLnJlcGxhY2UoLy0uL2csIHRvVXBwZXJDYXNlKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUw1X0RPTVN0cmluZ01hcCwgcHJvcE5hbWUsIHtcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdGhpcy5lbnVtZXJhYmxlLFxuICAgICAgICAgICAgICBnZXQ6IGdldHRlci5iaW5kKGF0dHJWYWwgfHwgJycpLFxuICAgICAgICAgICAgICBzZXQ6IHNldHRlci5iaW5kKHRoYXQsIGF0dHJOYW1lKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoIChlMikgeyAvLyBpZiBhY2Nlc3NvcnMgYXJlIG5vdCB3b3JraW5nXG4gICAgICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXBbcHJvcE5hbWVdID0gYXR0clZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBIVE1MNV9ET01TdHJpbmdNYXA7XG4gICAgfVxuICB9O1xuICB0cnkge1xuICAgIC8vIEZGIGVudW1lcmF0ZXMgb3ZlciBlbGVtZW50J3MgZGF0YXNldCwgYnV0IG5vdFxuICAgIC8vICAgRWxlbWVudC5wcm90b3R5cGUuZGF0YXNldDsgSUU5IGl0ZXJhdGVzIG92ZXIgYm90aFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnLCBwcm9wRGVzY3JpcHRvcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBwcm9wRGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7IC8vIElFOCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRvIHRydWVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JywgcHJvcERlc2NyaXB0b3IpO1xuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvZGF0YXNldC5qc1xuICoqLyIsImlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaGlkZGVuID09PSB1bmRlZmluZWQpIHtcbiAgZG9jdW1lbnQuaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoJzxzdHlsZT4gW2hpZGRlbl0geyBkaXNwbGF5OiBub25lIH0gPC9zdHlsZT4nKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCBcImhpZGRlblwiLCB7XG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvaGlkZGVuLmpzXG4gKiovIiwiZnVuY3Rpb24gZ2V0U2Nyb2xsYmFySGVpZ2h0KCkge1xuICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdXRlci5zdHlsZS5jc3NUZXh0ID0gXCJ2aXNpYmlsaXR5OmhpZGRlbjtoZWlnaHQ6MTAwcHhcIjtcbiAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0U2Nyb2xsYmFySGVpZ2h0IGNhbGxlZCB0byBlYXJseTogbm8gZG9jdW1lbnQuYm9keVwiKTtcbiAgfVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xuICAvLyBmb3JjZSBzY3JvbGxiYXJzXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcblxuICAvLyBhZGQgaW5uZXJkaXZcbiAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIHZhciB3aWR0aFdpdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcblxuICAvLyByZW1vdmUgZGl2c1xuICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTY3JvbGxiYXJIZWlnaHQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kb20vZ2V0U2Nyb2xsYmFySGVpZ2h0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiaGVhZC4xMTNjNmRjNDNkZWZhYmNiNmIwOC5qcyJ9
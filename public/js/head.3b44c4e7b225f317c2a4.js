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
/******/ 		7:0
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
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "3b44c4e7b225f317c2a4" + ".js";
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
	
	__webpack_require__(21);
	__webpack_require__(2);
	
	//exports.init = require('./init');
	exports.login = __webpack_require__(3);
	
	__webpack_require__(4);
	exports.Modal = __webpack_require__(5);
	exports.fontTest = __webpack_require__(6);
	exports.resizeOnload = __webpack_require__(13);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	
	// must use CommonsChunkPlugin
	// to ensure that other modules use exactly this (initialized) client/notify
	__webpack_require__(22).init();

/***/ },
/* 1 */,
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Modal = __webpack_require__(5);
	var Spinner = __webpack_require__(29);
	
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
	
	  __webpack_require__.e/* nsure */(8, function () {
	    modal.remove();
	    var AuthModal = __webpack_require__(39).AuthModal;
	    new AuthModal();
	  });
	}
	
	module.exports = login;

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// navigation starts to work right now
	"use strict";
	
	var onSwipe = __webpack_require__(46);
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var iframeResize = __webpack_require__(47);
	var throttle = __webpack_require__(49);
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(48);

/***/ },
/* 22 */
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
	
	var delegate = __webpack_require__(36);
	
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
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
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
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
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
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getDocumentHeight = __webpack_require__(74);
	
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
/* 48 */
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
	
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(73);

/***/ },
/* 49 */
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
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
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
/* 71 */
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
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */,
/* 76 */,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2I0NGM0ZTdiMjI1ZjMxN2MyYTQiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvdW5yZWFkeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvZm9udFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpdGV0b29sYmFyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ob3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ydW5EZW1vLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L25vdGlmaWNhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZGVsZWdhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L29uU3dpcGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2lmcmFtZVJlc2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvZG9tLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvbGliL3Rocm90dGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9jdXN0b21FdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvZGF0YXNldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvaGlkZGVuLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9kb20vZ2V0RG9jdW1lbnRIZWlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2RvbS9nZXRTY3JvbGxiYXJIZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7OztBQzFGQSxvQkFBTyxDQUFDLEVBQWlCLENBQUMsQ0FBQztBQUMzQixvQkFBTyxDQUFDLENBQVcsQ0FBQyxDQUFDOzs7QUFHckIsUUFBTyxDQUFDLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQVMsQ0FBQyxDQUFDOztBQUVuQyxvQkFBTyxDQUFDLENBQVUsQ0FBQyxDQUFDO0FBQ3BCLFFBQU8sQ0FBQyxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxDQUFTLENBQUMsQ0FBQztBQUNu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QUFDdkQsT0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbEIsV0FBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ3pFO0FBQ0QsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRWpDLE9BQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7O0FBRXRDLFFBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7O0FBR2hDLE9BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsUUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFFBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXpCLE9BQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUd4QyxRQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFcEMsVUFBTyxhQUFhLEdBQUcsZUFBZSxDQUFDO0VBQ3hDOztBQUVELE9BQU0sQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRpZihtb3JlTW9kdWxlc1swXSkge1xuIFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbMF0gPSAwO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQ3OjBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gYW4gYXJyYXkgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXS5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW2NhbGxiYWNrXTtcbiBcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gXHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBcIjNiNDRjNGU3YjIyNWYzMTdjMmE0XCIgKyBcIi5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgM2I0NGM0ZTdiMjI1ZjMxN2MyYTRcbiAqKi8iLCJcbnJlcXVpcmUoJ2NsaWVudC9wb2x5ZmlsbCcpO1xucmVxdWlyZSgnLi91bnJlYWR5Jyk7XG5cbi8vZXhwb3J0cy5pbml0ID0gcmVxdWlyZSgnLi9pbml0Jyk7XG5leHBvcnRzLmxvZ2luID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuXG5yZXF1aXJlKCcuL2xvZ291dCcpO1xuZXhwb3J0cy5Nb2RhbCA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcbmV4cG9ydHMuZm9udFRlc3QgPSByZXF1aXJlKCcuL2ZvbnRUZXN0Jyk7XG5leHBvcnRzLnJlc2l6ZU9ubG9hZCA9IHJlcXVpcmUoJy4vcmVzaXplT25sb2FkJyk7XG5yZXF1aXJlKCcuL2xheW91dCcpO1xucmVxdWlyZSgnLi9zaXRldG9vbGJhcicpO1xucmVxdWlyZSgnLi9zaWRlYmFyJyk7XG5yZXF1aXJlKCcuL25hdmlnYXRpb25BcnJvd3MnKTtcbnJlcXVpcmUoJy4vaG92ZXInKTtcbnJlcXVpcmUoJy4vcnVuRGVtbycpO1xuXG4vLyBtdXN0IHVzZSBDb21tb25zQ2h1bmtQbHVnaW5cbi8vIHRvIGVuc3VyZSB0aGF0IG90aGVyIG1vZHVsZXMgdXNlIGV4YWN0bHkgdGhpcyAoaW5pdGlhbGl6ZWQpIGNsaWVudC9ub3RpZnlcbnJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKS5pbml0KCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2luZGV4LmpzXG4gKiovIiwiLy8gaWYgY2xhc3MgZW5kcyB3aXRoIF91bnJlYWR5IHRoZW4gd2UgY29uc2lkZXIgZWxlbWVudCB1bnVzYWJsZSAoeWV0KVxuXG5cbi8vIGNhbmNlbCBjbGlja3Mgb24gPGEgY2xhc3M9XCJ1bnJlYWR5XCI+IGFuZCA8YnV0dG9uIGNsYXNzPVwidW5yZWFkeVwiPlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIHdoaWxlICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTmFtZS5tYXRjaCgvX3VucmVhZHlcXGIvKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gIH1cbn0pO1xuXG4vLyBjYW5jZWwgc3VibWl0cyBvZiA8Zm9ybSBjbGFzcz1cInVucmVhZHlcIj5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUubWF0Y2goL191bnJlYWR5XFxiLykpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvdW5yZWFkeS5qc1xuICoqLyIsInZhciBNb2RhbCA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcbnZhciBTcGlubmVyID0gcmVxdWlyZSgnY2xpZW50L3NwaW5uZXInKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3Rpb24tbG9naW4nKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGxvZ2luKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBsb2dpbigpIHtcbiAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKCk7XG4gIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIoKTtcbiAgbW9kYWwuc2V0Q29udGVudChzcGlubmVyLmVsZW0pO1xuICBzcGlubmVyLnN0YXJ0KCk7XG5cbiAgcmVxdWlyZS5lbnN1cmUoJ2F1dGgvY2xpZW50JywgZnVuY3Rpb24oKSB7XG4gICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgdmFyIEF1dGhNb2RhbCA9IHJlcXVpcmUoJ2F1dGgvY2xpZW50JykuQXV0aE1vZGFsO1xuICAgIG5ldyBBdXRoTW9kYWwoKTtcbiAgfSwgJ2F1dGhDbGllbnQnKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9sb2dpbi5qc1xuICoqLyIsIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3Rpb24tdXNlci1sb2dvdXQnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsb2dvdXQoKTtcbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gIGZvcm0uYWN0aW9uID0gJy9hdXRoL2xvZ291dD9fY3NyZj0nICsgZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pWzFdO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gbG9nb3V0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9sb2dvdXQuanNcbiAqKi8iLCJmdW5jdGlvbiBNb2RhbCgpIHtcbiAgdGhpcy5yZW5kZXIoKTtcblxuICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcbiAgdGhpcy5vbkRvY3VtZW50S2V5RG93biA9IHRoaXMub25Eb2N1bWVudEtleURvd24uYmluZCh0aGlzKTtcblxuICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMub25Eb2N1bWVudEtleURvd24pO1xufVxuXG5Nb2RhbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVFbmQnLCAnPGRpdiBjbGFzcz1cIm1vZGFsXCI+PGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPjwvZGl2PjwvZGl2PicpO1xuICB0aGlzLmVsZW0gPSBkb2N1bWVudC5ib2R5Lmxhc3RDaGlsZDtcbiAgdGhpcy5jb250ZW50RWxlbSA9IHRoaXMuZWxlbS5sYXN0Q2hpbGQ7XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZS1idXR0b24nKSkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cbn07XG5cblxuTW9kYWwucHJvdG90eXBlLm9uRG9jdW1lbnRLZXlEb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cbn07XG5cbk1vZGFsLnByb3RvdHlwZS5zaG93T3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbnRlbnRFbGVtLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5oaWRlT3ZlcmxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNvbnRlbnRFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24oaHRtbE9yTm9kZSkge1xuICBpZiAodHlwZW9mIGh0bWxPck5vZGUgPT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmlubmVySFRNTCA9IGh0bWxPck5vZGU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5jb250ZW50RWxlbS5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmFwcGVuZENoaWxkKGh0bWxPck5vZGUpO1xuICB9XG4gIHZhciBhdXRvZm9jdXMgPSB0aGlzLmNvbnRlbnRFbGVtLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdJyk7XG4gIGlmIChhdXRvZm9jdXMpIGF1dG9mb2N1cy5mb2N1cygpO1xufTtcblxuTW9kYWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuZWxlbSk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMub25Eb2N1bWVudEtleURvd24pO1xuICB0aGlzLmVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJtb2RhbENsb3NlXCIpKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL21vZGFsLmpzXG4gKiovIiwiLypcbtCY0LfQsdC10LPQsNC10LwgRk9VVCAtINC/0YDQvtGB0YLQvtC5INGB0L/QvtGB0L7QsSDQv9GA0L7QstC10YDQutC4INC30LDQs9GA0YPQt9C60Lgg0LjQutC+0L3QuNC6INGI0YDQuNGE0YLQsC5cbiAxKSDQlNC10LvQsNC10Lwg0LIgaWNvbmljINGI0YDQuNGE0YLQtSDQvtC00LjQvSDRgdC40LzQstC+0Lsg0YEg0LrQvtC00L7QvCAyMSAo0LLQvNC10YHRgtC+IMKrIcK7KVxuINCSIGljb25tb29uXG4gaHR0cDovL2lseWFrYW50b3IucnUvc2NyZWVuLzIwMTQtMDktMDZfMDE1Mi5wbmdcbiBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNC0wOS0wNl8wMTUzLnBuZ1xuXG4g0K3RgtC+0YIg0YjRgNC40YTRgiDQsiDQvtCx0YvRh9C90L7QvCDRiNGA0LjRhNGC0LUgKHNlcmlmKSDRg9C30LrQuNC5INC/0L4g0YjQuNGA0LjQvdC1LCDQsCDQsiBpY29uaWMgLSDQvdC+0YDQvNCw0LvRjNC90YvQuS5cbiAyKSDQlNCw0LvQtdC1INC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1INGB0L7Qt9C00LDRkdC8IDxzcGFuPiE8L3NwYW4+INC4INC00LDRkdC8INC10LzRgyBmb250RmFtaWx5INGB0L3QsNGH0LDQu9CwIHNlcmlmINC4INC30LDQvNC10YDRj9C10Lwg0YjQuNGA0LjQvdGDLCDQsCDQv9C+0YLQvtC8IEZvbnRJY29ucywgc2VyaWYuXG4g0J7RgtC70LDQstC70LjQstCw0LXQvCDQvNC+0LzQtdC90YIsINC60L7Qs9C00LAg0YjQuNGA0LjQvdCwINC40LfQvNC10L3QuNGC0YHRjy4g0K3RgtC+INC30L3QsNGH0LjRgiDRiNGA0LjRhNGCINC30LDQs9GA0YPQttC10L0uXG4g0JzQvtC20L3QviDRg9Cx0YDQsNGC0Ywg0LrQu9Cw0YHRgSAubm8taWNvbnMg0Lgg0L/QvtC60LDQt9Cw0YLRjCDQuNC60L7QvdC60LguXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgZWxlbS5jbGFzc05hbWUgPSAnZm9udC10ZXN0JztcbiAgZWxlbS5zdHlsZS5mb250RmFtaWx5ID0gJ3NlcmlmJztcbiAgdmFyIGluaXRpYWxXaWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG5cbiAgZWxlbS5zdHlsZS5mb250RmFtaWx5ID0gJyc7XG5cbiAgZnVuY3Rpb24gY2hlY2tGb250TG9hZGVkKCkge1xuICAgIGlmIChpbml0aWFsV2lkdGggIT0gZWxlbS5vZmZzZXRXaWR0aCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1pY29ucycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KGNoZWNrRm9udExvYWRlZCwgMTAwKTtcbiAgICB9XG4gIH1cblxuICBjaGVja0ZvbnRMb2FkZWQoKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvZm9udFRlc3QuanNcbiAqKi8iLCJ2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQ7XG5cbnZhciBERUJVRyA9IGZhbHNlO1xuZnVuY3Rpb24gbG9nKCkge1xuICBpZiAoREVCVUcpIHtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59XG5cbnZhciBUQUJMRVRfV0lEVEggPSA4NDA7XG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBkb24ndCBoYW5kbGUgb25zY3JvbGwgbW9yZSBvZnRlbiB0aGFuIGFuaW1hdGlvblxuICBmdW5jdGlvbiBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZCgpIHtcbiAgICBsb2coXCJvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZFwiLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZUlkKSByZXR1cm47XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZSgpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgIH0pO1xuXG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQpO1xuXG59KSgpO1xuXG5mdW5jdGlvbiBjb21wYWN0aWZ5U2lkZWJhcigpIHtcbiAgbG9nKFwiY29tcGFjdGlmeVNpZGViYXJcIik7XG4gIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICB2YXIgc2lkZWJhckNvbnRlbnQgPSBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19jb250ZW50Jyk7XG4gIHZhciBzaWRlYmFySW5uZXIgPSBzaWRlYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19pbm5lcicpO1xuXG4gIHZhciBoYXNTdGlja3lGb290ZXIgPSBzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9zdGlja3ktZm9vdGVyJyk7XG4gIHZhciBpc0NvbXBhY3QgPSBzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9jb21wYWN0Jyk7XG5cbiAgaWYgKGlzQ29tcGFjdCkge1xuICAgIHZhciBlbXB0eVNwYWNlU2l6ZTtcbiAgICBpZiAoaGFzU3RpY2t5Rm9vdGVyKSB7XG4gICAgICBlbXB0eVNwYWNlU2l6ZSA9IHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC1cbiAgICAgIHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtcHR5U3BhY2VTaXplID0gc2lkZWJhckNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC1cbiAgICAgIHNpZGViYXJDb250ZW50Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgIH1cblxuICAgIGxvZyhcImRlY29tcGFjdD9cIiwgZW1wdHlTcGFjZVNpemUpO1xuXG4gICAgLy8gZW5vdWdoIHNwYWNlIHRvIG9jY3VweSB0aGUgZnVsbCBoZWlnaHQgaW4gZGVjb21wYWN0ZWQgZm9ybSB3aXRob3V0IHNjcm9sbGJhclxuICAgIGlmIChlbXB0eVNwYWNlU2l6ZSA+IDE1MCkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX2NvbXBhY3QnKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBsb2coc2lkZWJhcklubmVyLnNjcm9sbEhlaWdodCwgc2lkZWJhcklubmVyLmNsaWVudEhlaWdodCk7XG4gICAgaWYgKHNpZGViYXJJbm5lci5zY3JvbGxIZWlnaHQgPiBzaWRlYmFySW5uZXIuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBsb2coXCJjb21wYWN0IVwiKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9jb21wYWN0Jyk7XG4gICAgfVxuICB9XG5cblxufVxuXG5mdW5jdGlvbiBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZSgpIHtcblxuICB2YXIgc2l0ZXRvb2xiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZXRvb2xiYXInKTtcbiAgaWYgKCFzaXRldG9vbGJhcikge1xuICAgIGxvZyhcIm5vIHNpdGV0b29sYmFyXCIpO1xuICAgIHJldHVybjsgLy8gcGFnZSBpbiBhIG5vLXRvcC1uYXYgbGF5b3V0XG4gIH1cblxuICB2YXIgc2l0ZXRvb2xiYXJIZWlnaHQgPSBzaXRldG9vbGJhci5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIGlmIChzaWRlYmFyKSB7XG4gICAgc2lkZWJhci5zdHlsZS50b3AgPSBNYXRoLm1heChzaXRldG9vbGJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20sIDApICsgJ3B4JztcbiAgICBjb21wYWN0aWZ5U2lkZWJhcigpO1xuICB9XG5cbiAgc2V0VXNlclNjYWxlSWZUYWJsZXQoKTtcblxuXG59XG5cbmZ1bmN0aW9uIHNldFVzZXJTY2FsZUlmVGFibGV0KCkge1xuICB2YXIgaXNUYWJsZXQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPD0gVEFCTEVUX1dJRFRIO1xuICB2YXIgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJykuY29udGVudDtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvdXNlci1zY2FsYWJsZT1cXHcrLywgJ3VzZXItc2NhbGFibGU9JyArIChpc1RhYmxldCA/ICd5ZXMnIDogJ25vJykpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ2aWV3cG9ydFwiXScpLmNvbnRlbnQgPSBjb250ZW50O1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbGF5b3V0LmpzXG4gKiovIiwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TZWFyY2hDbGljayk7XG5cblxuLy8gdG9nZ2xlIHNlYXJjaCBvbi9vZmYsIGF1dG9mb2N1cyBvbiBpbnB1dCB3aGVuIFwib25cIlxuZnVuY3Rpb24gb25TZWFyY2hDbGljayhldmVudCkge1xuICB2YXIgc2VhcmNoVG9nZ2xlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zaXRldG9vbGJhcl9fc2VhcmNoLXRvZ2dsZScpO1xuXG4gIGlmIChzZWFyY2hUb2dnbGUpIHtcbiAgICB0b2dnbGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gIHZhciBzaXRldG9vbGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRldG9vbGJhcicpO1xuICBzaXRldG9vbGJhci5jbGFzc0xpc3QudG9nZ2xlKCdzaXRldG9vbGJhcl9zZWFyY2hfb3BlbicpO1xuXG4gIHZhciBpbnB1dCA9IHNpdGV0b29sYmFyLnF1ZXJ5U2VsZWN0b3IoJy5zaXRldG9vbGJhcl9fc2VhcmNoLXF1ZXJ5IGlucHV0Jyk7XG4gIGlmIChzaXRldG9vbGJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGV0b29sYmFyX3NlYXJjaF9vcGVuJykpIHtcbiAgICBpbnB1dC5mb2N1cygpO1xuXG4gICAgaWYgKCFpbnB1dC5vbmtleWRvd24pIHtcbiAgICAgIGlucHV0Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvc2l0ZXRvb2xiYXIuanNcbiAqKi8iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuXG5mdW5jdGlvbiB0b2dnbGUoKSB7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5jbGFzc0xpc3QudG9nZ2xlKCdwYWdlX3NpZGViYXJfb24nKTtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BhZ2Vfc2lkZWJhcl9vbicpKSB7XG4gICAgZGVsZXRlIGxvY2FsU3RvcmFnZS5ub1NpZGViYXI7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLm5vU2lkZWJhciA9IDE7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBvbkNsaWNrKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQuZGF0YXNldC5zaWRlYmFyVG9nZ2xlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICB0b2dnbGUoKTtcbn1cblxuXG5mdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgLy8gZG9uJ3QgcmVhY3Qgb24gQ3RybC0+IDwtIGlmIGluIHRleHRcbiAgaWYgKH5bJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lKSkgcmV0dXJuO1xuXG4gIGlmIChldmVudC5rZXlDb2RlICE9IFwiU1wiLmNoYXJDb2RlQXQoMCkpIHJldHVybjtcblxuICBpZiAofm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwibWFjIG9zIHhcIikpIHtcbiAgICBpZiAoIWV2ZW50Lm1ldGFLZXkgfHwgIWV2ZW50LmFsdEtleSkgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIGlmICghZXZlbnQuYWx0S2V5KSByZXR1cm47XG4gIH1cblxuICB0b2dnbGUoKTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9zaWRlYmFyLmpzXG4gKiovIiwiLy8gbmF2aWdhdGlvbiBzdGFydHMgdG8gd29yayByaWdodCBub3dcbnZhciBvblN3aXBlID0gcmVxdWlyZSgnY2xpZW50L29uU3dpcGUnKTtcbnZhciBjdHJsT3JBbHQgPSB+bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJtYWMgb3MgeFwiKSA/ICdjdHJsJyA6ICdhbHQnO1xuXG5mdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgLy8gZG9uJ3QgcmVhY3Qgb24gQ3RybC0+IDwtIGlmIGluIHRleHRcbiAgaWYgKH5bJ0lOUFVUJywgJ1RFWFRBUkVBJywgJ1NFTEVDVCddLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lKSkgcmV0dXJuO1xuXG4gIGlmICghZXZlbnRbY3RybE9yQWx0ICsgJ0tleSddKSByZXR1cm47XG5cbiAgdmFyIHJlbCA9IG51bGw7XG4gIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICBjYXNlIDB4MjU6XG4gICAgcmVsID0gJ3ByZXYnO1xuICAgIGJyZWFrO1xuICBjYXNlIDB4Mjc6XG4gICAgcmVsID0gJ25leHQnO1xuICAgIGJyZWFrO1xuICBkZWZhdWx0OlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCInICsgcmVsICsgJ1wiXScpO1xuICBpZiAoIWxpbmspIHJldHVybjtcblxuICBkb2N1bWVudC5sb2NhdGlvbiA9IGxpbmsuaHJlZjtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxufVxuXG5mdW5jdGlvbiBzaG93SG90S2V5cygpIHtcbiAgdmFyIGtleURlc2MgPSBjdHJsT3JBbHRbMF0udG9VcHBlckNhc2UoKSArIGN0cmxPckFsdC5zbGljZSgxKTtcblxuICB2YXIgc2hvcnRjdXQ7XG5cbiAgdmFyIG5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cIm5leHRcIl0nKTtcbiAgaWYgKG5leHQpIHtcbiAgICBzaG9ydGN1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZj1cIicgKyBuZXh0LmdldEF0dHJpYnV0ZSgnaHJlZicpICsgJ1wiXSAucGFnZV9fbmF2LXRleHQtc2hvcnRjdXQnKTtcbiAgICBzaG9ydGN1dC5pbm5lckhUTUwgPSBrZXlEZXNjICsgJyArIDxzcGFuIGNsYXNzPVwicGFnZV9fbmF2LXRleHQtYXJyXCI+4oaSPC9zcGFuPic7XG4gIH1cblxuICB2YXIgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwicHJldlwiXScpO1xuICBpZiAocHJldikge1xuICAgIHNob3J0Y3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwiJyArIHByZXYuZ2V0QXR0cmlidXRlKCdocmVmJykgKyAnXCJdIC5wYWdlX19uYXYtdGV4dC1zaG9ydGN1dCcpO1xuICAgIHNob3J0Y3V0LmlubmVySFRNTCA9IGtleURlc2MgKyAnICsgPHNwYW4gY2xhc3M9XCJwYWdlX19uYXYtdGV4dC1hcnJcIj7ihpA8L3NwYW4+JztcbiAgfVxuXG59XG5cbm9uU3dpcGUoZG9jdW1lbnQsIHtcbiAgb25SaWdodDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cInByZXZcIl0nKTtcbiAgICBpZiAobGluaykgZG9jdW1lbnQubG9jYXRpb24gPSBsaW5rLmhyZWY7XG4gIH0sXG4gIG9uTGVmdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cIm5leHRcIl0nKTtcbiAgICBpZiAobGluaykgZG9jdW1lbnQubG9jYXRpb24gPSBsaW5rLmhyZWY7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNob3dIb3RLZXlzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qc1xuICoqLyIsIi8vIGFkZC9yZW1vdmUgLmhvdmVyIG9ubW91c2VlbnRlci9sZWF2ZVxuLy8gZm9yIG1vYmlsZSBkZXZpY2VzICg6aG92ZXIgc3RpY2tzKVxuXG52YXIgY3VycmVudEhvdmVyRWxlbTtcblxuLypcbmZ1bmN0aW9uIGxvZyhlKSB7XG4gIGNvbnNvbGUubG9nKERhdGUubm93KCkgJSAxZTQsIGUudHlwZSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hsZWF2ZVwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hcIiwgbG9nLCBmYWxzZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbG9nLCBmYWxzZSk7XG4qL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1hZGQtY2xhc3Mtb24taG92ZXJdJyk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBjdXJyZW50SG92ZXJFbGVtID0gdGFyZ2V0O1xuICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xuICB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGlmIChjdXJyZW50SG92ZXJFbGVtKSB7XG4gICAgICBjdXJyZW50SG92ZXJFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gICAgICBjdXJyZW50SG92ZXJFbGVtID0gbnVsbDtcbiAgICB9XG4gIH0sIDUwMCk7IC8vIHRvdWNoc3RhcnQgLT4gdG91cmNoZW5kIC0+IChkZWxheSB1cCB0byAzMDBtcykgLT4gbW91c2VvdmVyXG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihldmVudCkge1xuICBpZiAoIWN1cnJlbnRIb3ZlckVsZW0pIHJldHVybjtcblxuICBpZiAoY3VycmVudEhvdmVyRWxlbS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGN1cnJlbnRIb3ZlckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgY3VycmVudEhvdmVyRWxlbSA9IG51bGw7XG59KTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2hvdmVyLmpzXG4gKiovIiwid2luZG93LnJ1bkRlbW8gPSBmdW5jdGlvbihidXR0b24pIHtcblxuICB2YXIgZGVtb0VsZW07XG4gIHZhciBwYXJlbnQgPSBidXR0b247XG5cbiAgLyoganNoaW50IC1XMDg0ICovXG4gIHdoaWxlKHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgZGVtb0VsZW0gPSBwYXJlbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZGVtb10nKTtcbiAgICBpZiAoZGVtb0VsZW0pIGJyZWFrO1xuICB9XG5cbiAgaWYgKCFkZW1vRWxlbSkge1xuICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwLCDQvdC10YIg0Y3Qu9C10LzQtdC90YLQsCDRgSDQtNC10LzQvlwiKTtcbiAgfSBlbHNlIHtcbiAgICAvKiBqc2hpbnQgLVcwNjEgKi9cbiAgICBldmFsKGRlbW9FbGVtLnRleHRDb250ZW50KTtcbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvcnVuRGVtby5qc1xuICoqLyIsInZhciBpZnJhbWVSZXNpemUgPSByZXF1aXJlKCcuL2lmcmFtZVJlc2l6ZScpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnbGliL3Rocm90dGxlJyk7XG4vLyB0cmFjayByZXNpemVkIGlmcmFtZXMgaW4gd2luZG93Lm9ucmVzaXplXG5cbnZhciBvblJlc2l6ZVF1ZXVlID0gW107XG5cbmV4cG9ydHMuaWZyYW1lID0gZnVuY3Rpb24oaWZyYW1lKSB7XG5cbiAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIGlmcmFtZVJlc2l6ZS5hc3luYyhpZnJhbWUsIGZ1bmN0aW9uKGVyciwgaGVpZ2h0KSB7XG4gICAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICBpZiAoaGVpZ2h0KSBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2l6ZSgpO1xufTtcblxuZXhwb3J0cy5jb2RlVGFicyA9IGZ1bmN0aW9uKGlmcmFtZSkge1xuICBmdW5jdGlvbiBoaWRlU2hvd0Fycm93cygpIHtcblxuICAgIC8vIGFkZCBhcnJvd3MgaWYgbmVlZGVkXG4gICAgdmFyIGVsZW0gPSBpZnJhbWUuY2xvc2VzdCgnLmNvZGUtdGFicycpO1xuICAgIHZhciBjb250ZW50RWxlbSA9IGlmcmFtZS5jbG9zZXN0KCdbZGF0YS1jb2RlLXRhYnMtY29udGVudF0nKTtcbiAgICB2YXIgc3dpdGNoZXNFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtc3dpdGNoZXNdJyk7XG4gICAgdmFyIHN3aXRjaGVzRWxlbUl0ZW1zID0gc3dpdGNoZXNFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgaWYgKHN3aXRjaGVzRWxlbUl0ZW1zLm9mZnNldFdpZHRoID4gc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19zY3JvbGwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2RlLXRhYnNfc2Nyb2xsJyk7XG4gICAgfVxuXG4gIH1cblxuICBoaWRlU2hvd0Fycm93cygpO1xuICBvblJlc2l6ZVF1ZXVlLnB1c2goaGlkZVNob3dBcnJvd3MpO1xufTtcblxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZShmdW5jdGlvbigpIHtcbiAgb25SZXNpemVRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uKG9uUmVzaXplKSB7XG4gICAgb25SZXNpemUoKTtcbiAgfSk7XG59LCAyMDApKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2luZGV4LmpzXG4gKiovIiwicmVxdWlyZSgnLi9kb20nKTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogRm9yIG5ldyBub3RpZmljYXRpb24gdHlwZXMgZXh0ZW5kIE5vdGlmaWNhdGlvblxuICovXG5cbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdHJhbnNsYXRlWSBwb3NpdGlvbnMgd2hlbiBub3RpZmljYXRpb25zIGFyZSBhZGRlZC9yZW1vdmVkXG4gKi9cbmNsYXNzIE5vdGlmaWNhdGlvbk1hbmFnZXIge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xuICAgIHRoaXMudmVydGljYWxTcGFjZSA9IG9wdGlvbnMudmVydGljYWxTcGFjZSB8fCA4O1xuICB9XG5cbiAgcmVnaXN0ZXIobm90aWZpY2F0aW9uKSB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zLnVuc2hpZnQobm90aWZpY2F0aW9uKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVjYWxjdWxhdGUoKSwgMjApO1xuICB9XG5cbiAgdW5yZWdpc3Rlcihub3RpZmljYXRpb24pIHtcbiAgICB2YXIgaWR4ID0gdGhpcy5ub3RpZmljYXRpb25zLmluZGV4T2Yobm90aWZpY2F0aW9uKTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICB9XG5cbiAgcmVjYWxjdWxhdGUoKSB7XG4gICAgdmFyIHRvcCA9IHRoaXMudmVydGljYWxTcGFjZTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZm9yRWFjaChub3RpZmljYXRpb24gPT4ge1xuICAgICAgbm90aWZpY2F0aW9uLnRvcCA9IHRvcDtcbiAgICAgIHRvcCArPSBub3RpZmljYXRpb24uaGVpZ2h0ICsgdGhpcy52ZXJ0aWNhbFNwYWNlO1xuICAgIH0pO1xuICB9XG5cbn1cblxudmFyIG1hbmFnZXI7XG5cbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgbWFuYWdlciA9IG5ldyBOb3RpZmljYXRpb25NYW5hZ2VyKG9wdGlvbnMpO1xufTtcblxuXG5jbGFzcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwsIHR5cGUsIHRpbWVvdXQpIHtcbiAgICB2YXIgZWxlbUh0bWwgPSBgPGRpdiBjbGFzcz1cIm5vdGlmaWNhdGlvbiBub3RpZmljYXRpb25fcG9wdXAgbm90aWZpY2F0aW9uXyR7dHlwZX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uX19jb250ZW50XCI+JHtodG1sfTwvZGl2PlxuICAgIDxidXR0b24gdGl0bGU9XCLQl9Cw0LrRgNGL0YLRjFwiIGNsYXNzPVwibm90aWZpY2F0aW9uX19jbG9zZVwiPjwvYnV0dG9uPjwvZGl2PmA7XG5cbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZUVuZFwiLCBlbGVtSHRtbCk7XG5cbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5ib2R5Lmxhc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBzd2l0Y2godGltZW91dCkge1xuICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5USU1FT1VUX0RFRkFVTFQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzbG93JzpcbiAgICAgIHRoaXMudGltZW91dCA9IHRoaXMuVElNRU9VVF9TTE9XO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmFzdCc6XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLlRJTUVPVVRfRkFTVDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cblxuXG4gICAgbWFuYWdlci5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLnNldHVwQ2xvc2VIYW5kbGVyKCk7XG4gICAgdGhpcy5zZXR1cENsb3NlVGltZW91dCgpO1xuICB9XG5cbiAgZ2V0IFRJTUVPVVRfREVGQVVMVCgpIHtcbiAgICByZXR1cm4gMjUwMDtcbiAgfVxuXG4gIGdldCBUSU1FT1VUX1NMT1coKSB7XG4gICAgcmV0dXJuIDUwMDA7XG4gIH1cblxuICBnZXQgVElNRU9VVF9GQVNUKCkge1xuICAgIHJldHVybiAxNTAwO1xuICB9XG5cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuZWxlbS5wYXJlbnROb2RlKSByZXR1cm47IC8vIGFscmVhZHkgY2xvc2VkIChieSB1c2VyIGNsaWNrPylcbiAgICB0aGlzLmVsZW0ucmVtb3ZlKCk7XG4gICAgbWFuYWdlci51bnJlZ2lzdGVyKHRoaXMpO1xuICB9XG5cbiAgc2V0dXBDbG9zZUhhbmRsZXIoKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSgnLm5vdGlmaWNhdGlvbl9fY2xvc2UnLCAnY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICB9XG5cbiAgc2V0dXBDbG9zZVRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMudGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtLm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHNldCB0b3AodmFsdWUpIHtcbiAgICB0aGlzLmVsZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJyArIHZhbHVlICsgJ3B4KSc7XG4gIH1cblxufVxuXG5kZWxlZ2F0ZS5kZWxlZ2F0ZU1peGluKE5vdGlmaWNhdGlvbi5wcm90b3R5cGUpO1xuXG5cbmNsYXNzIEluZm8gZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnaW5mbycpO1xuICB9XG5cbn1cblxuZXhwb3J0cy5JbmZvID0gSW5mbztcblxuY2xhc3MgV2FybmluZyBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICd3YXJuaW5nJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLldhcm5pbmcgPSBXYXJuaW5nO1xuXG5jbGFzcyBTdWNjZXNzIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ3N1Y2Nlc3MnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuU3VjY2VzcyA9IFN1Y2Nlc3M7XG5cbmV4cG9ydCBjbGFzcyBFcnJvciBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICdlcnJvcicpO1xuICB9XG5cblxuICBnZXQgVElNRU9VVF9ERUZBVUxUKCkge1xuICAgIHJldHVybiA1MDAwO1xuICB9XG5cblxufVxuXG5leHBvcnRzLkVycm9yID0gRXJyb3I7XG5cbmV4cG9ydCBjbGFzcyBUZXN0IGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ2Vycm9yJyk7XG4gIH1cblxuXG4gIGdldCBUSU1FT1VUX0RFRkFVTFQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuXG59XG5cbmV4cG9ydHMuVGVzdCA9IFRlc3Q7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9ub3RpZmljYXRpb24vaW5kZXguanNcbiAqKi8iLCIvLyBVc2FnZTpcbi8vICAxKSBuZXcgU3Bpbm5lcih7IGVsZW06IGVsZW19KSAtPiBzdGFydC9zdG9wKClcbi8vICAyKSBuZXcgU3Bpbm5lcigpIC0+IHNvbWV3aGVyZS5hcHBlbmQoc3Bpbm5lci5lbGVtKSAtPiBzdGFydC9zdG9wXG5mdW5jdGlvbiBTcGlubmVyKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuZWxlbSA9IG9wdGlvbnMuZWxlbTtcblxuICB0aGlzLnNpemUgPSBvcHRpb25zLnNpemUgfHwgJ21lZGl1bSc7XG4gIC8vIGFueSBjbGFzcyB0byBhZGQgdG8gc3Bpbm5lciAobWFrZSBzcGlubmVyIHNwZWNpYWwgaGVyZSlcbiAgdGhpcy5jbGFzcyA9IG9wdGlvbnMuY2xhc3MgPyAoJyAnICsgb3B0aW9ucy5jbGFzcykgOiAnJztcblxuICAvLyBhbnkgY2xhc3MgdG8gYWRkIHRvIGVsZW1lbnQgKHRvIGhpZGUgaXQncyBjb250ZW50IGZvciBpbnN0YW5jZSlcbiAgdGhpcy5lbGVtQ2xhc3MgPSBvcHRpb25zLmVsZW1DbGFzcztcblxuICBpZiAodGhpcy5zaXplICE9ICdtZWRpdW0nICYmIHRoaXMuc2l6ZSAhPSAnc21hbGwnICYmIHRoaXMuc2l6ZSAhPSAnbGFyZ2UnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgc2l6ZTogXCIgKyB0aGlzLnNpemUpO1xuICB9XG5cbiAgaWYgKCF0aGlzLmVsZW0pIHtcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgfVxufVxuXG5TcGlubmVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5lbGVtQ2xhc3MpIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmVsZW1DbGFzcyk7XG4gIH1cblxuICB0aGlzLmVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPHNwYW4gY2xhc3M9XCJzcGlubmVyIHNwaW5uZXJfYWN0aXZlIHNwaW5uZXJfJyArIHRoaXMuc2l6ZSArIHRoaXMuY2xhc3MgKyAnXCI+PHNwYW4gY2xhc3M9XCJzcGlubmVyX19kb3Qgc3Bpbm5lcl9fZG90XzFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJzcGlubmVyX19kb3Qgc3Bpbm5lcl9fZG90XzJcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJzcGlubmVyX19kb3Qgc3Bpbm5lcl9fZG90XzNcIj48L3NwYW4+PC9zcGFuPicpO1xufTtcblxuU3Bpbm5lci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3Bpbm5lckVsZW0gPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLnNwaW5uZXInKTtcbiAgaWYgKCFzcGlubmVyRWxlbSkgcmV0dXJuOyAvLyBhbHJlYWR5IHN0b3BwZWQgb3IgbmV2ZXIgc3RhcnRlZFxuXG4gIHNwaW5uZXJFbGVtLnJlbW92ZSgpO1xuXG4gIGlmICh0aGlzLmVsZW1DbGFzcykge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuZWxlbUNsYXNzKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGlubmVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvc3Bpbm5lci5qc1xuICoqLyIsIlxuZnVuY3Rpb24gZmluZERlbGVnYXRlVGFyZ2V0KGV2ZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY3VycmVudE5vZGUgPSBldmVudC50YXJnZXQ7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSkge1xuICAgIGlmIChjdXJyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50Tm9kZSA9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBkZWxlZ2F0ZSh0YWJsZSwgJ3RoJywgY2xpY2ssIGhhbmRsZXIpXG4vLyB0YWJsZVxuLy8gICB0aGVhZFxuLy8gICAgIHRoICAgICAgICAgXipcbi8vICAgICAgIGNvZGUgIDwtLVxuZnVuY3Rpb24gZGVsZWdhdGUodG9wRWxlbWVudCwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xuICAvKiBqc2hpbnQgLVcwNDAgKi9cbiAgdG9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZm91bmQgPSBmaW5kRGVsZWdhdGVUYXJnZXQoZXZlbnQsIHNlbGVjdG9yKTtcblxuICAgIC8vIC5jdXJyZW50VGFyZ2V0IGlzIHJlYWQgb25seSwgSSBjYW4gbm90IG92ZXJ3cml0ZSBpdCB0byB0aGUgXCJmb3VuZFwiIGVsZW1lbnRcbiAgICAvLyBPYmplY3QuY3JlYXRlIHdyYXBwZXIgd291bGQgYnJlYWsgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIC8vIHNvLCBrZWVwIGluIG1pbmQ6XG4gICAgLy8gLS0+IGV2ZW50LmN1cnJlbnRUYXJnZXQgaXMgYWx3YXlzIHRoZSB0b3AtbGV2ZWwgKGRlbGVnYXRpbmcpIGVsZW1lbnQhXG4gICAgLy8gdXNlIFwidGhpc1wiIHRvIGdldCB0aGUgZm91bmQgdGFyZ2V0XG5cbiAgICBldmVudC5kZWxlZ2F0ZVRhcmdldCA9IGZvdW5kOyAvLyB1c2UgaW5zdGVhZCBvZiBcInRoaXNcIiBpbiBvYmplY3QgbWV0aG9kc1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICAvLyBpZiBpbiBjb250ZXh0IG9mIG9iamVjdCwgdXNlIG9iamVjdCBhcyB0aGlzLFxuICAgICAgaGFuZGxlci5jYWxsKGNvbnRleHQgfHwgdGhpcywgZXZlbnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgb2JqLmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGRlbGVnYXRlKHRoaXMuZWxlbSwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgdGhpcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGVnYXRlO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kZWxlZ2F0ZS5qc1xuICoqLyIsImZ1bmN0aW9uIG9uU3dpcGUoZWxlbSwgb3B0aW9ucykge1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGFydFgsXG4gICAgICBzdGFydFksXG4gICAgICBkaXN0LFxuICAgICAgb25SaWdodCA9IG9wdGlvbnMub25SaWdodCB8fCBmdW5jdGlvbigpIHt9LFxuICAgICAgb25MZWZ0ID0gb3B0aW9ucy5vbkxlZnQgfHwgZnVuY3Rpb24oKXt9LFxuICAgICAgdG9sZXJhbmNlID0gb3B0aW9ucy50b2xlcmFuY2UgfHwgMTAwLCAvLyBtYXhpbXVtIHZlcnRpY2FsIGRpc3RhbmNlXG4gICAgICB0aHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAxNTAsIC8vcmVxdWlyZWQgbWluIGRpc3RhbmNlIHRyYXZlbGVkIHRvIGJlIGNvbnNpZGVyZWQgc3dpcGVcbiAgICAgIGFsbG93ZWRUaW1lID0gb3B0aW9ucy5hbGxvd2VkVGltZSB8fCA1MDAsIC8vIG1heGltdW0gdGltZSBhbGxvd2VkIHRvIHRyYXZlbCB0aGF0IGRpc3RhbmNlXG4gICAgICBlbGFwc2VkVGltZSxcbiAgICAgIHN0YXJ0VGltZTtcblxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICBkaXN0ID0gMDtcbiAgICBzdGFydFggPSB0b3VjaG9iai5wYWdlWDtcbiAgICBzdGFydFkgPSB0b3VjaG9iai5wYWdlWTtcbiAgICAvL2NvbnNvbGUubG9nKFwic3RhcnRcIiwgc3RhcnRYLCBzdGFydFkpO1xuICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7IC8vIHJlY29yZCB0aW1lIHdoZW4gZmluZ2VyIGZpcnN0IG1ha2VzIGNvbnRhY3Qgd2l0aCBzdXJmYWNlXG4gIH0sIGZhbHNlKTtcblxuICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgZGlzdCA9IHRvdWNob2JqLnBhZ2VYIC0gc3RhcnRYOyAvLyBnZXQgdG90YWwgZGlzdCB0cmF2ZWxlZCBieSBmaW5nZXIgd2hpbGUgaW4gY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgICBlbGFwc2VkVGltZSA9IERhdGUubm93KCkgLSBzdGFydFRpbWU7IC8vIGdldCB0aW1lIGVsYXBzZWRcblxuICAgIC8vY29uc29sZS5sb2coXCJlbmRcIiwgdG91Y2hvYmoucGFnZVgsIHRvdWNob2JqLnBhZ2VZKTtcblxuICAgIC8vIHRvbyBtdWNoIHVwL2Rvd25cbiAgICBpZiAoTWF0aC5hYnModG91Y2hvYmoucGFnZVkgLSBzdGFydFkpID4gdG9sZXJhbmNlKSByZXR1cm47XG5cbiAgICAvL2NvbnNvbGUubG9nKFwidGltZVwiLCBlbGFwc2VkVGltZSwgYWxsb3dlZFRpbWUpO1xuXG4gICAgLy8gdG9vIHNsb3dcbiAgICBpZiAoZWxhcHNlZFRpbWUgPiBhbGxvd2VkVGltZSkgcmV0dXJuO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcInRocmVzaG9sZFwiLCBkaXN0LCB0aHJlc2hvbGQpO1xuXG4gICAgaWYgKGRpc3QgPiB0aHJlc2hvbGQpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJyaWdodFwiKTtcbiAgICAgIG9uUmlnaHQoZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpc3QgPCAtdGhyZXNob2xkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgIG9uTGVmdChlKTtcbiAgICB9XG4gIH0sIGZhbHNlKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25Td2lwZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L29uU3dpcGUuanNcbiAqKi8iLCJ2YXIgZ2V0RG9jdW1lbnRIZWlnaHQgPSByZXF1aXJlKCdjbGllbnQvZG9tL2dldERvY3VtZW50SGVpZ2h0Jyk7XG5cbmZ1bmN0aW9uIGlmcmFtZVJlc2l6ZShpZnJFbGVtLCBjYWxsYmFjaykge1xuXG5cbiAgdmFyIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgLy8gZGVmYXVsdCBoZWlnaHRcbiAgICBjYWxsYmFjayhuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgfSwgNTAwKTtcblxuICBmdW5jdGlvbiBkb25lKGVyciwgaGVpZ2h0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcik7XG5cbiAgICBjYWxsYmFjayhlcnIsIGhlaWdodCk7XG4gIH1cblxuICAvLyB0aHJvdyByaWdodCBub3cgaWYgY3Jvc3MtZG9tYWluXG4gIHRyeSB7XG4gICAgLyoganNoaW50IC1XMDMwICovXG4gICAgKGlmckVsZW0uY29udGVudERvY3VtZW50IHx8IGlmckVsZW0uY29udGVudFdpbmRvdy5kb2N1bWVudCkuYm9keTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluKGlmckVsZW0sIGRvbmUpO1xuICB9XG5cblxuICAvLyBISU5UOiBJIHNob3VsbmQndCBtb3ZlIGlmcmFtZSBpbiBET00sIGJlY2F1c2UgaXQgd2lsbCByZWxvYWQgaXQncyBjb250ZW50cyB3aGVuIGFwcGVuZGVkL2luc2VydGVkIGFueXdoZXJlIVxuICAvLyBzbyBJIGNyZWF0ZSBhIGNsb25lIGFuZCB3b3JrIG9uIGl0XG4gIGlmICghaWZyRWxlbS5vZmZzZXRXaWR0aCkge1xuICAgIC8vIGNsb25lIGlmcmFtZSBhdCBhbm90aGVyIHBsYWNlIHRvIHNlZSB0aGUgc2l6ZVxuICAgIHZhciBjbG9uZUlmcmFtZSA9IGlmckVsZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgIGNsb25lSWZyYW1lLm5hbWUgPSBcIlwiO1xuXG4gICAgY2xvbmVJZnJhbWUuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIGNsb25lSWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjbG9uZUlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBjbG9uZUlmcmFtZS5zdHlsZS50b3AgPSAnMTAwMDBweCc7XG5cbiAgICBjbG9uZUlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWlnaHQgPSBnZXREb2N1bWVudEhlaWdodCh0aGlzLmNvbnRlbnREb2N1bWVudCk7XG4gICAgICBpZnJFbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgY2xvbmVJZnJhbWUucmVtb3ZlKCk7XG4gICAgICBkb25lKG51bGwsIGhlaWdodCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvbmVJZnJhbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmckVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIGlmckVsZW0uc3R5bGUuaGVpZ2h0ID0gJzFweCc7XG5cbiAgdmFyIGhlaWdodCA9IGdldERvY3VtZW50SGVpZ2h0KGlmckVsZW0uY29udGVudERvY3VtZW50KTtcblxuICBpZnJFbGVtLnN0eWxlLmhlaWdodCA9ICcnO1xuICBkb25lKG51bGwsIGhlaWdodCk7XG59XG5cbmlmcmFtZVJlc2l6ZS5hc3luYyA9IGZ1bmN0aW9uIGlmcmFtZVJlc2l6ZUFzeW5jKGlmcmFtZSwgY2FsbGJhY2spIHtcbiAgLy8gZGVsYXkgdG8gbGV0IHRoZSBjb2RlIGluc2lkZSB0aGUgaWZyYW1lIGZpbmlzaFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGlmcmFtZVJlc2l6ZShpZnJhbWUsIGNhbGxiYWNrKTtcbiAgfSwgMCk7XG59O1xuXG5cbmZ1bmN0aW9uIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluKGlmckVsZW0sIGNhbGxiYWNrKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZCB5ZXRcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWZyYW1lUmVzaXplO1xuXG5cbi8qXG4gd2luZG93Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiBpZiAoZS5vcmlnaW4gIT0gXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIikgcmV0dXJuO1xuIHZhciBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuIGlmICghZGF0YSB8fCBkYXRhLmNtZCAhPSBcInJlc2l6ZS1pZnJhbWVcIikgcmV0dXJuO1xuIHZhciBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoZGF0YS5uYW1lKVswXTtcblxuIGVsZW0uc3R5bGUuaGVpZ2h0ID0gK2RhdGEuaGVpZ2h0ICsgMTAgKyBcInB4XCI7XG4gdmFyIGRlZmVycmVkID0gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2RhdGEuaWRdO1xuIGRlZmVycmVkLnJlc29sdmUoKTtcbiB9O1xuXG4gZnVuY3Rpb24gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4oaWZyRWxlbSwgY2FsbGJhY2spIHtcblxuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gY2FsbGJhY2sobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gfSwgNTAwKTtcblxuIHRyeSB7XG4gLy8gdHJ5IHRvIHNlZSBpZiByZXNpemVyIGNhbiB3b3JrIG9uIHRoaXMgaWZyYW1lXG4gaWZyRWxlbS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKFwidGVzdFwiLCBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbVwiKTtcbiB9IGNhdGNoKGUpIHtcbiAvLyBpZnJhbWUgZnJvbSBhbm90aGVyIGRvbWFpbiwgc29ycnlcbiBjYWxsYmFjayhuZXcgRXJyb3IoXCJ0aGUgcmVzaXplciBtdXN0IGJlIGZyb20gcnUubG9va2F0Y29kZS5jb21cIikpO1xuIHJldHVybjtcbiB9XG5cbiBpZiAoIWlmckVsZW0ub2Zmc2V0V2lkdGgpIHtcbiAvLyBtb3ZlIGlmcmFtZSB0byBhbm90aGVyIHBsYWNlIHRvIHJlc2l6ZSB0aGVyZVxuIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiBpZnJFbGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBpZnJFbGVtKTtcbiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmckVsZW0pO1xuIH1cblxuIGlmckVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuIHZhciBpZCA9IFwiXCIgKyBNYXRoLnJhbmRvbSgpO1xuIHZhciBtZXNzYWdlID0geyBjbWQ6ICdyZXNpemUtaWZyYW1lJywgbmFtZTogaWZyRWxlbVswXS5uYW1lLCBpZDogaWQgfTtcbiAvLyBUT0RPXG4gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2lkXSA9IGRlZmVycmVkO1xuIGRlZmVycmVkLmFsd2F5cyhmdW5jdGlvbigpIHtcbiBkZWxldGUgaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzW2lkXTtcbiB9KTtcblxuIHZhciBmcmFtZSA9IGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmlmcmFtZTtcbiBpZiAoZnJhbWUubG9hZGVkKSB7XG4gZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIik7XG4gfSBlbHNlIHtcbiBmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuIGZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tXCIpO1xuIH0pO1xuIH1cblxuIGlmIChwbGFjZWhvbGRlcikge1xuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gcGxhY2Vob2xkZXIucmVwbGFjZVdpdGgoaWZyRWxlbSk7XG4gfSwgMjApO1xuIH1cblxuIHJldHVybiBkZWZlcnJlZDtcbiB9XG5cbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5kZWZlcnJlZHMgPSB7fTtcbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5pZnJhbWUgPSAkKCc8aWZyYW1lIHNyYz1cImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9maWxlcy9pZnJhbWUtcmVzaXplLmh0bWxcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPjwvaWZyYW1lPicpLnByZXBlbmRUbygnYm9keScpO1xuIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmlmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiB9KTtcbiAqL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9yZXNpemVPbmxvYWQvaWZyYW1lUmVzaXplLmpzXG4gKiovIiwiLy9yZXF1aXJlKCcuL2Nhc3BlcmpzJyk7XG5cbi8vIGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNtdXRhdGlvbi1tZXRob2QtbWFjcm9cbmZ1bmN0aW9uIG11dGF0aW9uKG5vZGVzKSB7XG4gIGlmICghbm9kZXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdET00gRXhjZXB0aW9uIDgnKTtcbiAgfSBlbHNlIGlmIChub2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gdHlwZW9mIG5vZGVzWzBdID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGVzWzBdKSA6IG5vZGVzWzBdO1xuICB9IGVsc2Uge1xuICAgIHZhclxuICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICBsZW5ndGggPSBub2Rlcy5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbm9kZTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBub2RlID0gbm9kZXNbaW5kZXhdO1xuXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKSA6IG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmcmFnbWVudDtcbiAgfVxufVxuXG52YXIgbWV0aG9kcyA9IHtcbiAgLy8gc2FmYXJpID0gd2Via2l0TWF0Y2hlc1NlbGVjdG9yXG4gIG1hdGNoZXM6IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yLFxuICByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKCkge1xuICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobXV0YXRpb24oYXJndW1lbnRzKSwgdGhpcyk7XG4gICAgfVxuICB9LFxuICBwcmVwZW5kOiBmdW5jdGlvbiBwcmVwZW5kKCkge1xuICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMuZmlyc3RDaGlsZCk7XG4gIH0sXG4gIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKCkge1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQobXV0YXRpb24oYXJndW1lbnRzKSk7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudE5vZGUgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgIHJldHVybiBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH1cbiAgfSxcbiAgYmVmb3JlOiBmdW5jdGlvbiBiZWZvcmUoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtdXRhdGlvbihhcmd1bWVudHMpLCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgYWZ0ZXI6ICAgZnVuY3Rpb24gYWZ0ZXIoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtdXRhdGlvbihhcmd1bWVudHMpLCB0aGlzLm5leHRTaWJsaW5nKTtcbiAgICB9XG4gIH0sXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzO1xuXG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSByZXR1cm4gbm9kZTtcbiAgICAgIGVsc2Ugbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmZvciAodmFyIG1ldGhvZE5hbWUgaW4gbWV0aG9kcykge1xuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBtZXRob2RzW21ldGhvZE5hbWVdO1xuICB9XG59XG5cbnJlcXVpcmUoJy4vY3VzdG9tRXZlbnQnKTtcbnJlcXVpcmUoJy4vZGF0YXNldCcpO1xucmVxdWlyZSgnLi9oaWRkZW4nKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9kb20uanNcbiAqKi8iLCJcbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zKSB7XG5cbiAgdmFyIGlzVGhyb3R0bGVkID0gZmFsc2UsXG4gICAgICBzYXZlZEFyZ3MsXG4gICAgICBzYXZlZFRoaXM7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcblxuICAgIGlmIChpc1Rocm90dGxlZCkge1xuICAgICAgc2F2ZWRBcmdzID0gYXJndW1lbnRzO1xuICAgICAgc2F2ZWRUaGlzID0gdGhpcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpc1Rocm90dGxlZCA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaXNUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgIGlmIChzYXZlZEFyZ3MpIHtcbiAgICAgICAgd3JhcHBlci5hcHBseShzYXZlZFRoaXMsIHNhdmVkQXJncyk7XG4gICAgICAgIHNhdmVkQXJncyA9IHNhdmVkVGhpcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL21vZHVsZXMvbGliL3Rocm90dGxlLmpzXG4gKiovIiwiXG50cnkge1xuICBuZXcgQ3VzdG9tRXZlbnQoXCJJRSBoYXMgQ3VzdG9tRXZlbnQsIGJ1dCBkb2Vzbid0IHN1cHBvcnQgY29uc3RydWN0b3JcIik7XG59IGNhdGNoIChlKSB7XG5cbiAgd2luZG93LkN1c3RvbUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIHBhcmFtcykge1xuICAgIHZhciBldnQ7XG4gICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgIGJ1YmJsZXM6ICAgIGZhbHNlLFxuICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICBkZXRhaWw6ICAgICB1bmRlZmluZWRcbiAgICB9O1xuICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9O1xuXG4gIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LkV2ZW50LnByb3RvdHlwZSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2N1c3RvbUV2ZW50LmpzXG4gKiovIiwiLy8gZGF0YXNldCBmb3IgSUUxMFxuXG5pZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0ICYmXG4gICAgLy8gRkYgaXMgZW1wdHkgd2hpbGUgSUUgZ2l2ZXMgZW1wdHkgb2JqZWN0XG4gICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnKSAgfHxcbiAgIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JykuZ2V0KVxuKSB7XG4gIHZhciBwcm9wRGVzY3JpcHRvciA9IHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgdmFyIGksXG4gICAgICAgICAgdGhhdCA9IHRoaXMsXG4gICAgICAgICAgSFRNTDVfRE9NU3RyaW5nTWFwLFxuICAgICAgICAgIGF0dHJWYWwsIGF0dHJOYW1lLCBwcm9wTmFtZSxcbiAgICAgICAgICBhdHRyaWJ1dGUsXG4gICAgICAgICAgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgICAgICBhdHRzTGVuZ3RoID0gYXR0cmlidXRlcy5sZW5ndGgsXG4gICAgICAgICAgdG9VcHBlckNhc2UgPSBmdW5jdGlvbiAobjApIHtcbiAgICAgICAgICAgIHJldHVybiBuMC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0dGVyID0gZnVuY3Rpb24gKGF0dHJOYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSA/XG4gICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCB2YWx1ZSkgOlxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgfTtcbiAgICAgIHRyeSB7IC8vIFNpbXVsYXRlIERPTVN0cmluZ01hcCB3L2FjY2Vzc29yIHN1cHBvcnRcbiAgICAgICAgLy8gVGVzdCBzZXR0aW5nIGFjY2Vzc29yIG9uIG5vcm1hbCBvYmplY3RcbiAgICAgICAgKHt9KS5fX2RlZmluZUdldHRlcl9fKCd0ZXN0JywgZnVuY3Rpb24gKCkge30pO1xuICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXAgPSB7fTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlMSkgeyAvLyBVc2UgYSBET00gb2JqZWN0IGZvciBJRThcbiAgICAgICAgSFRNTDVfRE9NU3RyaW5nTWFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYXR0c0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAgIC8vIEZpeDogVGhpcyB0ZXN0IHJlYWxseSBzaG91bGQgYWxsb3cgYW55IFhNTCBOYW1lIHdpdGhvdXRcbiAgICAgICAgLy8gICAgICAgICBjb2xvbnMgKGFuZCBub24tdXBwZXJjYXNlIGZvciBYSFRNTClcbiAgICAgICAgaWYgKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUubmFtZSAmJlxuICAgICAgICAgICgvXmRhdGEtXFx3W1xcd1xcLV0qJC8pLnRlc3QoYXR0cmlidXRlLm5hbWUpKSB7XG4gICAgICAgICAgYXR0clZhbCA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICBhdHRyTmFtZSA9IGF0dHJpYnV0ZS5uYW1lO1xuICAgICAgICAgIC8vIENoYW5nZSB0byBDYW1lbENhc2VcbiAgICAgICAgICBwcm9wTmFtZSA9IGF0dHJOYW1lLnN1YnN0cig1KS5yZXBsYWNlKC8tLi9nLCB0b1VwcGVyQ2FzZSk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MNV9ET01TdHJpbmdNYXAsIHByb3BOYW1lLCB7XG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRoaXMuZW51bWVyYWJsZSxcbiAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIuYmluZChhdHRyVmFsIHx8ICcnKSxcbiAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIuYmluZCh0aGF0LCBhdHRyTmFtZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZTIpIHsgLy8gaWYgYWNjZXNzb3JzIGFyZSBub3Qgd29ya2luZ1xuICAgICAgICAgICAgSFRNTDVfRE9NU3RyaW5nTWFwW3Byb3BOYW1lXSA9IGF0dHJWYWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gSFRNTDVfRE9NU3RyaW5nTWFwO1xuICAgIH1cbiAgfTtcbiAgdHJ5IHtcbiAgICAvLyBGRiBlbnVtZXJhdGVzIG92ZXIgZWxlbWVudCdzIGRhdGFzZXQsIGJ1dCBub3RcbiAgICAvLyAgIEVsZW1lbnQucHJvdG90eXBlLmRhdGFzZXQ7IElFOSBpdGVyYXRlcyBvdmVyIGJvdGhcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JywgcHJvcERlc2NyaXB0b3IpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcHJvcERlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlOyAvLyBJRTggZG9lcyBub3QgYWxsb3cgc2V0dGluZyB0byB0cnVlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcsIHByb3BEZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2RhdGFzZXQuanNcbiAqKi8iLCJpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmhpZGRlbiA9PT0gdW5kZWZpbmVkKSB7XG4gIGRvY3VtZW50LmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKCc8c3R5bGU+IFtoaWRkZW5dIHsgZGlzcGxheTogbm9uZSB9IDwvc3R5bGU+Jyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgXCJoaWRkZW5cIiwge1xuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCB2YWx1ZSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdoaWRkZW4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2hpZGRlbi5qc1xuICoqLyIsInZhciBnZXRTY3JvbGxiYXJIZWlnaHQgPSByZXF1aXJlKCcuL2dldFNjcm9sbGJhckhlaWdodCcpO1xudmFyIHNjcm9sbGJhckhlaWdodDtcblxuZnVuY3Rpb24gZ2V0RG9jdW1lbnRIZWlnaHQoZG9jKSB7XG4gIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcblxuICB2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoXG4gICAgZG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICBkb2MuYm9keS5vZmZzZXRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgIGRvYy5ib2R5LmNsaWVudEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgKTtcblxuICBpZiAoZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA+IGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHtcbiAgICAvLyBnb3QgYSBob3JpeiBzY3JvbGwsIGxldCdzIGFkZCBpdFxuICAgIGlmICghc2Nyb2xsYmFySGVpZ2h0KSBzY3JvbGxiYXJIZWlnaHQgPSBnZXRTY3JvbGxiYXJIZWlnaHQoKTtcbiAgICBoZWlnaHQgKz0gc2Nyb2xsYmFySGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIGhlaWdodDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREb2N1bWVudEhlaWdodDtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZG9tL2dldERvY3VtZW50SGVpZ2h0LmpzXG4gKiovIiwiZnVuY3Rpb24gZ2V0U2Nyb2xsYmFySGVpZ2h0KCkge1xuICB2YXIgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdXRlci5zdHlsZS5jc3NUZXh0ID0gXCJ2aXNpYmlsaXR5OmhpZGRlbjtoZWlnaHQ6MTAwcHhcIjtcbiAgaWYgKCFkb2N1bWVudC5ib2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0U2Nyb2xsYmFySGVpZ2h0IGNhbGxlZCB0byBlYXJseTogbm8gZG9jdW1lbnQuYm9keVwiKTtcbiAgfVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICB2YXIgd2lkdGhOb1Njcm9sbCA9IG91dGVyLm9mZnNldFdpZHRoO1xuICAvLyBmb3JjZSBzY3JvbGxiYXJzXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjtcblxuICAvLyBhZGQgaW5uZXJkaXZcbiAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaW5uZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIHZhciB3aWR0aFdpdGhTY3JvbGwgPSBpbm5lci5vZmZzZXRXaWR0aDtcblxuICAvLyByZW1vdmUgZGl2c1xuICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICByZXR1cm4gd2lkdGhOb1Njcm9sbCAtIHdpZHRoV2l0aFNjcm9sbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRTY3JvbGxiYXJIZWlnaHQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kb20vZ2V0U2Nyb2xsYmFySGVpZ2h0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiaGVhZC4zYjQ0YzRlN2IyMjVmMzE3YzJhNC5qcyJ9
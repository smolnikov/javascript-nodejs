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
/******/ 		5:0
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
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "7df9e72be2ed3874d51d" + ".js";
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
	
	__webpack_require__(22);
	__webpack_require__(6);
	
	//exports.init = require('./init');
	exports.login = __webpack_require__(7);
	
	__webpack_require__(8);
	exports.Modal = __webpack_require__(9);
	exports.fontTest = __webpack_require__(10);
	exports.resizeOnload = __webpack_require__(18);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	
	// must use CommonsChunkPlugin
	// to ensure that other modules use exactly this (initialized) client/notify
	__webpack_require__(23).init();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// if class ends with _unready then we consider element unusable (yet)
	
	// cancel clicks on <a class="unready"> and <button class="unready">
	"use strict";
	
	document.addEventListener("click", function (event) {
	  var target = event.target;
	  while (target) {
	    if (!target.className.match) return; // click on SVG element in FF, className is an object
	
	    if (target.className.match(/_unready\b/)) {
	      event.preventDefault();
	      return;
	    }
	    target = target.parentElement;
	  }
	});
	
	// cancel submits of <form class="unready">
	document.addEventListener("submit", function (event) {
	  if (!event.target.className.match) return;
	
	  if (event.target.className.match(/_unready\b/)) {
	    event.preventDefault();
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Modal = __webpack_require__(9);
	var Spinner = __webpack_require__(37);
	
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
	
	  __webpack_require__.e/* nsure */(6, function () {
	    modal.remove();
	    var AuthModal = __webpack_require__(42).AuthModal;
	    new AuthModal();
	  });
	}
	
	module.exports = login;

/***/ },
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	document.addEventListener("click", onSearchClick);
	
	var initialized = false;
	
	// toggle search on/off, autofocus on input when "on"
	function onSearchClick(event) {
	  if (!event.target.closest) {
	    return;
	  } // svg
	
	  var searchToggle = event.target.closest(".sitetoolbar__search-toggle");
	
	  if (searchToggle) {
	    if (!initialized) initialize();
	    toggle();
	  }
	}
	
	function initialize() {
	  var sitetoolbar = document.querySelector(".sitetoolbar");
	
	  var input = sitetoolbar.querySelector(".sitetoolbar__search-input input");
	
	  input.onkeydown = function (e) {
	    if (e.keyCode == 27) {
	      this.value = "";
	      toggle();
	    }
	  };
	
	  input.onblur = function (e) {
	    toggle();
	  };
	
	  initialized = true;
	}
	
	function toggle() {
	  var paranja,
	      sitetoolbar = document.querySelector(".sitetoolbar");
	
	  sitetoolbar.classList.toggle("sitetoolbar_search_open");
	
	  var input = sitetoolbar.querySelector(".sitetoolbar__search-input input");
	
	  if (sitetoolbar.classList.contains("sitetoolbar_search_open")) {
	
	    input.focus();
	
	    paranja = document.createElement("div");
	    paranja.className = "sitetoolbar sitetoolbar__search-paranja";
	    paranja.style.top = sitetoolbar.offsetHeight + "px";
	
	    document.body.appendChild(paranja);
	  } else {
	
	    paranja = document.querySelector(".sitetoolbar__search-paranja");
	    paranja.parentNode.removeChild(paranja);
	  }
	}

/***/ },
/* 13 */
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
	  if (event.target.dataset && event.target.dataset.sidebarToggle === undefined) {
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// navigation starts to work right now
	"use strict";
	
	var onSwipe = __webpack_require__(47);
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// current page host
	"use strict";
	
	var baseURI = window.location.host;
	
	document.addEventListener("click", function (e) {
	
	  if (e.isDefaultPrevented()) return;
	
	  // abandon if no active link or link within domain
	  var link = e.target.closest("a");
	  if (!link || baseURI == link.host) return;
	
	  // cancel event and record outbound link
	  e.preventDefault();
	  var href = link.href;
	  window.ga("send", "event", "outbound", "click", href, {
	    hitCallback: loadPage
	  });
	
	  // redirect after one second if recording takes too long
	  setTimeout(loadPage, 1000);
	
	  // redirect to outbound page
	  function loadPage() {
	    document.location = href;
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var iframeResize = __webpack_require__(48);
	var throttle = __webpack_require__(51);
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
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(50);

/***/ },
/* 23 */
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
	
	var delegate = __webpack_require__(27);
	
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
	  function Info(html, timeout) {
	    _classCallCheck(this, Info);
	
	    _get(Object.getPrototypeOf(Info.prototype), "constructor", this).call(this, html, "info", timeout);
	  }
	
	  _inherits(Info, _Notification);
	
	  return Info;
	})(Notification);
	
	exports.Info = Info;
	
	var Warning = (function (_Notification2) {
	  function Warning(html, timeout) {
	    _classCallCheck(this, Warning);
	
	    _get(Object.getPrototypeOf(Warning.prototype), "constructor", this).call(this, html, "warning", timeout);
	  }
	
	  _inherits(Warning, _Notification2);
	
	  return Warning;
	})(Notification);
	
	exports.Warning = Warning;
	
	var Success = (function (_Notification3) {
	  function Success(html, timeout) {
	    _classCallCheck(this, Success);
	
	    _get(Object.getPrototypeOf(Success.prototype), "constructor", this).call(this, html, "success", timeout);
	  }
	
	  _inherits(Success, _Notification3);
	
	  return Success;
	})(Notification);
	
	exports.Success = Success;
	
	var Error = exports.Error = (function (_Notification4) {
	  function Error(html, timeout) {
	    _classCallCheck(this, Error);
	
	    _get(Object.getPrototypeOf(Error.prototype), "constructor", this).call(this, html, "error", timeout);
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
	
	/*
	export class Test extends Notification {

	  constructor(html) {
	    super(html, 'error');
	  }


	  get TIMEOUT_DEFAULT() {
	    return null;
	  }


	}

	exports.Test = Test;
	*/

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
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
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
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
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getDocumentHeight = __webpack_require__(78);
	
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
/* 49 */,
/* 50 */
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
	__webpack_require__(77);

/***/ },
/* 51 */
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
/* 71 */,
/* 72 */,
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// polyfill for old Android
	"use strict";
	
	(function () {
	  var lastTime = 0;
	
	  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = window.setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	
	  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	    clearTimeout(id);
	  };
	})();

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getScrollbarHeight = __webpack_require__(82);
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
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
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
//# sourceMappingURL=head.7df9e72be2ed3874d51d.js.map
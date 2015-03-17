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
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "209be8bfb73faa250661" + ".js";
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
	
	// must use CommonsChunkPlugin
	// to ensure that other modules use exactly this (initialized) client/notify
	__webpack_require__(23).init();
	
	__webpack_require__(17);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// if class ends with _unready then we consider element unusable (yet)
	
	// cancel clicks on <a class="unready"> and <button class="unready">
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
	document.addEventListener("submit", function (e) {
	  if (e.target.className.match(/_unready\b/)) {
	    event.preventDefault();
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Modal = __webpack_require__(9);
	var Spinner = __webpack_require__(36);
	
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
	    var AuthModal = __webpack_require__(41).AuthModal;
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

	"use strict";
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// navigation starts to work right now
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

	"use strict";
	
	// add/remove .hover onmouseenter/leave
	// for mobile devices (:hover sticks)
	
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

	"use strict";
	
	window._trackJs = { token: "8d286dd1cbf744b987a7226ee9a09324" };
	// COPYRIGHT (c) 2015 TrackJS LLC ALL RIGHTS RESERVED
	(function (h, p, k) {
	  "use awesome";if (h.trackJs) h.console && h.console.warn && h.console.warn("TrackJS global conflict");else {
	    var l = function l(a, b, c, d, e) {
	      this.util = a;this.onError = b;this.onFault = c;this.options = e;e.enabled && this.initialize(d);
	    };l.prototype = { initialize: function initialize(a) {
	        a.addEventListener && (this.wrapAndCatch(a.Element.prototype, "addEventListener", 1), this.wrapAndCatch(a.XMLHttpRequest.prototype, "addEventListener", 1), this.wrapRemoveEventListener(a.Element.prototype), this.wrapRemoveEventListener(a.XMLHttpRequest.prototype));
	        this.wrapAndCatch(a, "setTimeout", 0);this.wrapAndCatch(a, "setInterval", 0);
	      }, wrapAndCatch: function wrapAndCatch(a, b, c) {
	        var d = this,
	            e = a[b];d.util.hasFunction(e, "apply") && (a[b] = function () {
	          try {
	            var f = Array.prototype.slice.call(arguments),
	                g = f[c],
	                u,
	                h;if (d.options.bindStack) try {
	              throw Error();
	            } catch (k) {
	              h = k.stack, u = d.util.isoNow();
	            }if ("addEventListener" === b && (this._trackJsEvt || (this._trackJsEvt = new m()), this._trackJsEvt.getWrapped(f[0], g, f[2]))) return;g && d.util.hasFunction(g, "apply") && (f[c] = function () {
	              try {
	                return g.apply(this, arguments);
	              } catch (a) {
	                throw (d.onError("catch", a, { bindTime: u, bindStack: h }), d.util.wrapError(a));
	              }
	            }, "addEventListener" === b && this._trackJsEvt.add(f[0], g, f[2], f[c]));return e.apply(this, f);
	          } catch (l) {
	            a[b] = e, d.onFault(l);
	          }
	        });
	      }, wrapRemoveEventListener: function wrapRemoveEventListener(a) {
	        if (a && a.removeEventListener && this.util.hasFunction(a.removeEventListener, "call")) {
	          var b = a.removeEventListener;a.removeEventListener = function (a, d, e) {
	            if (this._trackJsEvt) {
	              var f = this._trackJsEvt.getWrapped(a, d, e);f && this._trackJsEvt.remove(a, d, e);return b.call(this, a, f, e);
	            }return b.call(this, a, d, e);
	          };
	        }
	      } };var m = function m() {
	      this.events = [];
	    };m.prototype = { add: function add(a, b, c, d) {
	        -1 >= this.indexOf(a, b, c) && this.events.push([a, b, !!c, d]);
	      }, remove: function remove(a, b, c) {
	        a = this.indexOf(a, b, !!c);0 <= a && this.events.splice(a, 1);
	      }, getWrapped: function getWrapped(a, b, c) {
	        a = this.indexOf(a, b, !!c);return 0 <= a ? this.events[a][3] : k;
	      }, indexOf: function indexOf(a, b, c) {
	        for (var d = 0; d < this.events.length; d++) if (this.events[d][0] === a && this.events[d][1] === b && this.events[d][2] === !!c) {
	          return d;
	        }return -1;
	      } };var t = function t(a, b) {
	      this.util = a;this.initCurrent(b);
	    };t.prototype = { current: {}, initOnly: { application: "", enabled: !0, token: !0, callback: { enabled: !0 }, console: { enabled: !0 }, network: { enabled: !0 }, visitor: { enabled: !0 }, window: { enabled: !0 } }, defaults: { application: "", enabled: !0, onError: function onError() {
	          return !0;
	        }, serialize: function serialize(a) {
	          return a === k ? "undefined" : null === a ? "null" : "number" === typeof a && isNaN(a) ? "NaN" : "" === a ? "Empty String" : 0 === a ? "0" : !1 === a ? "false" : a && a.toString ? a.toString() : "unknown";
	        }, sessionId: "", token: "", userId: "", version: "", callback: { enabled: !0,
	          bindStack: !1 }, console: { enabled: !0, display: !0, error: !0, watch: ["log", "debug", "info", "warn", "error"] }, network: { enabled: !0, error: !0 }, visitor: { enabled: !0 }, window: { enabled: !0 } }, initCurrent: function initCurrent(a) {
	        if (this.validate(a, this.defaults, "config", {})) {
	          return (this.current = this.util.extend(this.current, this.defaults, a), !0);
	        }this.current = this.util.extend(this.current, this.defaults);return !1;
	      }, setCurrent: function setCurrent(a) {
	        return this.validate(a, this.defaults, "config", this.initOnly) ? (this.current = this.util.extend(this.current, a), !0) : !1;
	      }, validate: function validate(a, b, c, d) {
	        var e = !0;c = c || "";d = d || {};for (var f in a) if (a.hasOwnProperty(f)) if (b.hasOwnProperty(f)) {
	          var g = typeof b[f];g !== typeof a[f] ? (console.warn(c + "." + f + ": property must be type " + g + "."), e = !1) : "[object Array]" !== Object.prototype.toString.call(a[f]) || this.validateArray(a[f], b[f], c + "." + f) ? "[object Object]" === Object.prototype.toString.call(a[f]) ? e = this.validate(a[f], b[f], c + "." + f, d[f]) : d.hasOwnProperty(f) && (console.warn(c + "." + f + ": property cannot be set after load."), e = !1) : e = !1;
	        } else console.warn(c + "." + f + ": property not supported."), e = !1;return e;
	      }, validateArray: function validateArray(a, b, c) {
	        var d = !0;c = c || "";for (var e = 0; e < a.length; e++) this.util.contains(b, a[e]) || (console.warn(c + "[" + e + "]: invalid value: " + a[e] + "."), d = !1);return d;
	      } };var q = function q(a, b, c, d, e, f, g) {
	      this.util = a;this.log = b;this.onError = c;this.onFault = d;this.serialize = e;g.enabled && (f.console = this.wrapConsoleObject(f.console, g));
	    };q.prototype = { wrapConsoleObject: function wrapConsoleObject(a, b) {
	        a = a || {};var c = a.log || function () {},
	            d = this,
	            e;for (e = 0; e < b.watch.length; e++) (function (e) {
	          var g = a[e] || c;a[e] = function () {
	            try {
	              var a = Array.prototype.slice.call(arguments);d.log.add("c", { timestamp: d.util.isoNow(), severity: e, message: d.serialize(a) });if (b.error && "error" === e) try {
	                throw Error(a[0]);
	              } catch (c) {
	                d.onError("console", c);
	              }b.display && (d.util.hasFunction(g, "apply") ? g.apply(this, a) : g(a[0], a[1], a[2]));
	            } catch (h) {
	              d.onFault(h);
	            }
	          };
	        })(b.watch[e]);return a;
	      }, report: function report() {
	        return this.log.all("c");
	      } };var r = function r(a, b, c, d, e) {
	      this.config = a;this.util = b;this.log = c;this.window = d;this.document = e;this.correlationId = this.token = null;this.initialize();
	    };r.prototype = { initialize: function initialize() {
	        this.token = this.getCustomerToken();this.correlationId = this.getCorrelationId();
	      }, getCustomerToken: function getCustomerToken() {
	        if (this.config.current.token) {
	          return this.config.current.token;
	        }var a = this.document.getElementsByTagName("script");return a[a.length - 1].getAttribute("data-token");
	      }, getCorrelationId: function getCorrelationId() {
	        var a;try {
	          a = this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/, "$1"), a || (a = this.util.uuid(), this.document.cookie = "TrackJS=" + a + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");
	        } catch (b) {
	          a = this.util.uuid();
	        }return a;
	      }, report: function report() {
	        return { application: this.config.current.application, correlationId: this.correlationId, sessionId: this.config.current.sessionId, token: this.token, userId: this.config.current.userId, version: this.config.current.version };
	      } };var s = function s(a) {
	      this.loadedOn = new Date().getTime();this.window = a;
	    };s.prototype = { discoverDependencies: function discoverDependencies() {
	        var a,
	            b = {};this.window.jQuery && (this.window.jQuery.fn && this.window.jQuery.fn.jquery) && (b.jQuery = this.window.jQuery.fn.jquery);this.window.jQuery && (this.window.jQuery.ui && this.window.jQuery.ui.version) && (b.jQueryUI = this.window.jQuery.ui.version);this.window.angular && (this.window.angular.version && this.window.angular.version.full) && (b.angular = this.window.angular.version.full);for (a in this.window) if ("_trackJs" !== a && "_trackJS" !== a && "_trackjs" !== a && "webkitStorageInfo" !== a && "webkitIndexedDB" !== a) try {
	          if (this.window[a]) {
	            var c = this.window[a].version || this.window[a].Version || this.window[a].VERSION;"string" === typeof c && (b[a] = c);
	          }
	        } catch (d) {}return b;
	      }, report: function report() {
	        return { age: new Date().getTime() - this.loadedOn, dependencies: this.discoverDependencies(), userAgent: this.window.navigator.userAgent, viewportHeight: this.window.document.documentElement.clientHeight, viewportWidth: this.window.document.documentElement.clientWidth };
	      } };var v = function v(a) {
	      this.util = a;this.appender = [];this.maxLength = 30;
	    };v.prototype = { all: function all(a) {
	        var b = [],
	            c,
	            d;for (d = 0; d < this.appender.length; d++) (c = this.appender[d]) && c.category === a && b.push(c.value);return b;
	      }, clear: function clear() {
	        this.appender.length = 0;
	      }, truncate: function truncate() {
	        this.appender.length > this.maxLength && (this.appender = this.appender.slice(Math.max(this.appender.length - this.maxLength, 0)));
	      }, add: function add(a, b) {
	        var c = this.util.uuid();this.appender.push({ key: c, category: a, value: b });this.truncate();return c;
	      }, get: function get(a, b) {
	        var c, d;for (d = 0; d < this.appender.length; d++) if ((c = this.appender[d], c.category === a && c.key === b)) {
	          return c.value;
	        }return !1;
	      } };var w = function w(a, b, c, d, e, f) {
	      this.util = a;this.log = b;this.onError = c;this.onFault = d;this.window = e;this.options = f;f.enabled && this.initialize(e);
	    };w.prototype = { initialize: function initialize(a) {
	        a.XMLHttpRequest && this.util.hasFunction(a.XMLHttpRequest.prototype.open, "apply") && this.watchNetworkObject(a.XMLHttpRequest);a.XDomainRequest && this.util.hasFunction(a.XDomainRequest.prototype.open, "apply") && this.watchNetworkObject(a.XDomainRequest);
	      }, watchNetworkObject: function watchNetworkObject(a) {
	        var b = this,
	            c = a.prototype.open,
	            d = a.prototype.send;a.prototype.open = function (a, b) {
	          0 > b.indexOf("localhost:0") && (this._trackJs = { method: a, url: b });return c.apply(this, arguments);
	        };a.prototype.send = function () {
	          try {
	            if (!this._trackJs) return d.apply(this, arguments);this._trackJs.logId = b.log.add("n", { startedOn: b.util.isoNow(), method: this._trackJs.method, url: this._trackJs.url });b.listenForNetworkComplete(this);
	          } catch (a) {
	            b.onFault(a);
	          }return d.apply(this, arguments);
	        };return a;
	      }, listenForNetworkComplete: function listenForNetworkComplete(a) {
	        var b = this;
	        b.window.ProgressEvent && a.addEventListener && a.addEventListener("readystatechange", function () {
	          4 === a.readyState && b.finalizeNetworkEvent(a);
	        }, !0);a.addEventListener ? a.addEventListener("load", function () {
	          b.finalizeNetworkEvent(a);b.checkNetworkFault(a);
	        }, !0) : setTimeout(function () {
	          try {
	            var c = a.onload;a.onload = function () {
	              b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function" === typeof c && b.util.hasFunction(c, "apply") && c.apply(a, arguments);
	            };var d = a.onerror;a.onerror = function () {
	              b.finalizeNetworkEvent(a);
	              b.checkNetworkFault(a);"function" === typeof oldOnError && d.apply(a, arguments);
	            };
	          } catch (e) {
	            b.onFault(e);
	          }
	        }, 0);
	      }, finalizeNetworkEvent: function finalizeNetworkEvent(a) {
	        if (a._trackJs) {
	          var b = this.log.get("n", a._trackJs.logId);b && (b.completedOn = this.util.isoNow(), b.statusCode = 1223 == a.status ? 204 : a.status, b.statusText = 1223 == a.status ? "No Content" : a.statusText);
	        }
	      }, checkNetworkFault: function checkNetworkFault(a) {
	        if (this.options.error && 400 <= a.status && 1223 != a.status) {
	          var b = a._trackJs || {};this.onError("ajax", a.status + " " + a.statusText + ": " + b.method + " " + b.url);
	        }
	      },
	      report: function report() {
	        return this.log.all("n");
	      } };var n = function n(a) {
	      this.util = a;this.disabled = !1;this.throttleStats = { attemptCount: 0, throttledCount: 0, lastAttempt: new Date().getTime() };h.JSON && h.JSON.stringify || (this.disabled = !0);
	    };n.prototype = { errorEndpoint: function errorEndpoint(a, b) {
	        b = (b || "https://capture.trackjs.com/capture") + ("?token=" + a);return this.util.isBrowserIE() ? "//" + b.split("://")[1] : b;
	      }, usageEndpoint: function usageEndpoint(a) {
	        return this.appendObjectAsQuery(a, "https://usage.trackjs.com/usage.gif");
	      }, trackerFaultEndpoint: function trackerFaultEndpoint(a) {
	        return this.appendObjectAsQuery(a, "https://usage.trackjs.com/fault.gif");
	      }, appendObjectAsQuery: function appendObjectAsQuery(a, b) {
	        b += "?";for (var c in a) a.hasOwnProperty(c) && (b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]) + "&");return b;
	      }, getCORSRequest: function getCORSRequest(a, b) {
	        var c = new h.XMLHttpRequest();"withCredentials" in c ? (c.open(a, b), c.setRequestHeader("Content-Type", "text/plain")) : "undefined" !== typeof h.XDomainRequest ? (c = new h.XDomainRequest(), c.open(a, b)) : c = null;return c;
	      }, sendTrackerFault: function sendTrackerFault(a) {
	        this.throttle(a) || (new Image().src = this.trackerFaultEndpoint(a));
	      },
	      sendUsage: function sendUsage(a) {
	        new Image().src = this.usageEndpoint(a);
	      }, sendError: function sendError(a, b) {
	        var c = this;if (!this.disabled && !this.throttle(a)) try {
	          var d = this.getCORSRequest("POST", this.errorEndpoint(b));d.onreadystatechange = function () {
	            4 === d.readyState && 200 !== d.status && (c.disabled = !0);
	          };d._trackJs = k;d.send(h.JSON.stringify(a));
	        } catch (e) {
	          throw (this.disabled = !0, e);
	        }
	      }, throttle: function throttle(a) {
	        var b = new Date().getTime();this.throttleStats.attemptCount++;if (this.throttleStats.lastAttempt + 1000 >= b) {
	          if ((this.throttleStats.lastAttempt = b, 10 < this.throttleStats.attemptCount)) {
	            return (this.throttleStats.throttledCount++, !0);
	          }
	        } else a.throttled = this.throttleStats.throttledCount, this.throttleStats.attemptCount = 0, this.throttleStats.lastAttempt = b, this.throttleStats.throttledCount = 0;return !1;
	      } };var x = function x(a) {
	      this.window = a;
	    };x.prototype = { bind: function bind(a, b) {
	        return function () {
	          return a.apply(b, Array.prototype.slice.call(arguments));
	        };
	      }, contains: function contains(a, b) {
	        var c;for (c = 0; c < a.length; c++) if (a[c] === b) {
	          return !0;
	        }return !1;
	      }, defer: function defer(a, b) {
	        setTimeout(function () {
	          a.apply(b);
	        });
	      },
	      extend: function extend(a) {
	        for (var b, c = Array.prototype.slice.call(arguments, 1), d = 0; d < c.length; d++) for (b in c[d]) null === c[d][b] || c[d][b] === k ? a[b] = c[d][b] : "[object Object]" === Object.prototype.toString.call(c[d][b]) ? (a[b] = a[b] || {}, this.extend(a[b], c[d][b])) : a[b] = c[d][b];return a;
	      }, hasFunction: function hasFunction(a, b) {
	        try {
	          return !!a[b];
	        } catch (c) {
	          return !1;
	        }
	      }, isBrowserIE: function isBrowserIE() {
	        var a = this.window.navigator.userAgent,
	            b = a.match(/Trident\/([\d.]+)/);return b && "7.0" === b[1] ? 11 : (a = a.match(/MSIE ([\d.]+)/)) ? parseInt(a[1], 10) : !1;
	      },
	      isBrowserSupported: function isBrowserSupported() {
	        var a = this.isBrowserIE();return !a || 8 <= a;
	      }, isoNow: function isoNow() {
	        var a = new Date();return a.toISOString ? a.toISOString() : a.getUTCFullYear() + "-" + this.pad(a.getUTCMonth() + 1) + "-" + this.pad(a.getUTCDate()) + "T" + this.pad(a.getUTCHours()) + ":" + this.pad(a.getUTCMinutes()) + ":" + this.pad(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + "Z";
	      }, pad: function pad(a) {
	        a = String(a);1 === a.length && (a = "0" + a);return a;
	      }, uuid: function uuid() {
	        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
	          var b = 16 * Math.random() | 0;return ("x" == a ? b : b & 3 | 8).toString(16);
	        });
	      }, wrapError: function wrapError(a) {
	        if (a.innerError) {
	          return a;
	        }var b = Error("TrackJS Caught: " + (a.message || a));b.description = "TrackJS Caught: " + a.description;b.file = a.file;b.line = a.line || a.lineNumber;b.column = a.column || a.columnNumber;b.stack = a.stack;b.innerError = a;return b;
	      } };var y = function y(a, b, c, d, e, f) {
	      this.util = a;this.log = b;this.onError = c;this.onFault = d;this.options = f;this.document = e;f.enabled && this.initialize(e);
	    };y.prototype = { initialize: function initialize(a) {
	        var b = this.util.bind(this.onDocumentClicked, this),
	            c = this.util.bind(this.onInputChanged, this);a.addEventListener ? (a.addEventListener("click", b, !0), a.addEventListener("blur", c, !0)) : a.attachEvent && (a.attachEvent("onclick", b), a.attachEvent("onfocusout", c));
	      }, onDocumentClicked: function onDocumentClicked(a) {
	        try {
	          var b = this.getElementFromEvent(a);b && b.tagName && (this.isDescribedElement(b, "a") || this.isDescribedElement(b, "button") || this.isDescribedElement(b, "input", ["button", "submit"]) ? this.writeVisitorEvent(b, "click") : this.isDescribedElement(b, "input", ["checkbox", "radio"]) && this.writeVisitorEvent(b, "input", b.value, b.checked));
	        } catch (c) {
	          this.onFault(c);
	        }
	      }, onInputChanged: function onInputChanged(a) {
	        try {
	          var b = this.getElementFromEvent(a);if (b && b.tagName) if (this.isDescribedElement(b, "textarea")) this.writeVisitorEvent(b, "input", b.value);else if (this.isDescribedElement(b, "select") && b.options && b.options.length) this.onSelectInputChanged(b);else this.isDescribedElement(b, "input") && !this.isDescribedElement(b, "input", ["button", "submit", "hidden", "checkbox", "radio"]) && this.writeVisitorEvent(b, "input", b.value);
	        } catch (c) {
	          this.onFault(c);
	        }
	      }, onSelectInputChanged: function onSelectInputChanged(a) {
	        if (a.multiple) for (var b = 0; b < a.options.length; b++) a.options[b].selected && this.writeVisitorEvent(a, "input", a.options[b].value);else 0 <= a.selectedIndex && a.options[a.selectedIndex] && this.writeVisitorEvent(a, "input", a.options[a.selectedIndex].value);
	      }, writeVisitorEvent: function writeVisitorEvent(a, b, c, d) {
	        "password" === this.getElementType(a) && (c = k);this.log.add("v", { timestamp: this.util.isoNow(), action: b, element: { tag: a.tagName.toLowerCase(),
	            attributes: this.getElementAttributes(a), value: this.getMetaValue(c, d) } });
	      }, getElementFromEvent: function getElementFromEvent(a) {
	        return a.target || p.elementFromPoint(a.clientX, a.clientY);
	      }, isDescribedElement: function isDescribedElement(a, b, c) {
	        if (a.tagName.toLowerCase() !== b.toLowerCase()) {
	          return !1;
	        }if (!c) {
	          return !0;
	        }a = this.getElementType(a);for (b = 0; b < c.length; b++) if (c[b] === a) {
	          return !0;
	        }return !1;
	      }, getElementType: function getElementType(a) {
	        return (a.getAttribute("type") || "").toLowerCase();
	      }, getElementAttributes: function getElementAttributes(a) {
	        for (var b = {}, c = 0; c < a.attributes.length; c++) "value" !== a.attributes[c].name.toLowerCase() && (b[a.attributes[c].name] = a.attributes[c].value);return b;
	      }, getMetaValue: function getMetaValue(a, b) {
	        return a === k ? k : { length: a.length, pattern: this.matchInputPattern(a), checked: b };
	      }, matchInputPattern: function matchInputPattern(a) {
	        return "" === a ? "empty" : /^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a) ? "email" : /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a) || /^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a) ? "date" : /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a) ? "usphone" : /^\s*$/.test(a) ? "whitespace" : /^\d*$/.test(a) ? "numeric" : /^[a-zA-Z]*$/.test(a) ? "alpha" : /^[a-zA-Z0-9]*$/.test(a) ? "alphanumeric" : "characters";
	      }, report: function report() {
	        return this.log.all("v");
	      } };var z = function z(a, b, c, d, e) {
	      this.onError = a;this.onFault = b;this.serialize = c;e.enabled && this.watchWindowErrors(d);
	    };z.prototype = { watchWindowErrors: function watchWindowErrors(a) {
	        var b = this;a.onerror = function (a, d, e, f, g) {
	          try {
	            g = g || {}, g.message = g.message || b.serialize(a), g.file = g.file || b.serialize(d), g.line = g.line || parseInt(e, 10) || null, g.column = g.column || parseInt(f, 10) || null, b.onError("window", g);
	          } catch (h) {
	            b.onFault(h);
	          }
	        };
	      } };var A = function A(a, b, c, d, e, f, g, h, k, l, m, n, p, t, q, r) {
	      try {
	        this.window = q, this.document = r, this.util = new m(this.window), this.onError = this.util.bind(this.onError, this), this.onFault = this.util.bind(this.onFault, this), this.serialize = this.util.bind(this.serialize, this), this.transmitter = new l(this.util), this.config = new d(this.util, a), this.log = new h(this.util), this.api = new b(this.config, this.util, this.onError), this.environment = new g(this.window), this.customer = new f(this.config, this.util, this.log, this.window, this.document), this.customer.token && (this.config.current.enabled && this.transmitter.sendUsage({ token: this.customer.token, correlationId: this.customer.correlationId,
	          application: this.config.current.application, x: this.util.uuid() }), this.apiConsoleWatcher = new e(this.util, this.log, this.onError, this.onFault, this.serialize, this.api, this.config.defaults.console), this.windowConsoleWatcher = new e(this.util, this.log, this.onError, this.onFault, this.serialize, this.window, this.config.current.console), this.util.isBrowserSupported() && this.config.current.enabled && (this.callbackWatcher = new c(this.util, this.onError, this.onFault, this.window, this.config.current.callback), this.visitorWatcher = new n(this.util, this.log, this.onError, this.onFault, this.document, this.config.current.visitor), this.networkWatcher = new k(this.util, this.log, this.onError, this.onFault, this.window, this.config.current.network), this.windowWatcher = new p(this.onError, this.onFault, this.serialize, this.window, this.config.current.window)));
	      } catch (s) {
	        this.onFault(s);
	      }
	    };A.prototype = { reveal: function reveal() {
	        if (this.customer.token) {
	          return this.api;
	        }this.window.console && this.window.console.warn && this.window.console.warn("TrackJS could not find a token");
	        return k;
	      }, onError: function onError(a, b, c) {
	        if (this.util.isBrowserSupported() && this.config.current.enabled) try {
	          b = b || {};c = c || { bindStack: null, bindTime: null, force: !1 };var d = b.message || b;if (!d || !d.indexOf || -1 === d.indexOf("TrackJS Caught")) {
	            var e = this.util.extend({}, { bindStack: c.bindStack, bindTime: c.bindTime, column: b.column || b.columnNumber, console: this.windowConsoleWatcher.report(), customer: this.customer.report(), entry: a, environment: this.environment.report(), file: b.file || b.fileName, line: b.line || b.lineNumber, message: c.force ? d : this.serialize(d), network: this.networkWatcher.report(), url: (h.location || "").toString(), stack: b.stack, timestamp: this.util.isoNow(), visitor: this.visitorWatcher.report(), version: "2.1.9" });if (!c.force) try {
	              if (!this.config.current.onError(e, b)) return;
	            } catch (f) {
	              e.console.push({ timestamp: this.util.isoNow(), severity: "error", message: f.message });var g = this;setTimeout(function () {
	                g.onError("catch", f, { force: !0 });
	              }, 0);
	            }this.log.clear();this.transmitter.sendError(e, this.customer.token);
	          }
	        } catch (k) {
	          console.log(k), this.onFault(k);
	        }
	      },
	      onFault: function onFault(a) {
	        var b = this.transmitter || new n();a = a || {};a = { token: this.customer.token, file: a.file || a.fileName, msg: a.message || "unknown", stack: (a.stack || "unknown").substr(0, 500), url: this.window.location, v: "2.1.9", x: this.util.uuid() };b.sendTrackerFault(a);
	      }, serialize: function serialize(a) {
	        if (this.config && this.config.current && this.config.current.serialize) try {
	          return this.config.current.serialize(a);
	        } catch (b) {
	          return (this.onError("catch", b, { force: !0 }), this.util && this.util.hasFunction(a, "toString") ? a.toString() : "unknown");
	        }
	      } };
	    l = new A(h._trackJs || h._trackJS || h._trackjs || {}, function (a, b, c) {
	      return { attempt: function attempt(a, e) {
	          try {
	            var f = Array.prototype.slice.call(arguments, 2);return a.apply(e || this, f);
	          } catch (g) {
	            throw (c("catch", g), b.wrapError(g));
	          }
	        }, configure: function configure(b) {
	          return a.setCurrent(b);
	        }, track: function track(a) {
	          a = a || {};if (!a.stack) try {
	            throw Error(a);
	          } catch (b) {
	            a = b;
	          }c("direct", a);
	        }, watch: function watch(a, e) {
	          return function () {
	            try {
	              var f = Array.prototype.slice.call(arguments, 0);return a.apply(e || this, f);
	            } catch (g) {
	              throw (c("catch", g), b.wrapError(g));
	            }
	          };
	        }, watchAll: function watchAll(a) {
	          var e = Array.prototype.slice.call(arguments, 1),
	              f;for (f in a) "function" === typeof a[f] && (b.contains(e, f) || (function () {
	            var e = a[f];a[f] = function () {
	              try {
	                var a = Array.prototype.slice.call(arguments, 0);return e.apply(this, a);
	              } catch (d) {
	                throw (c("catch", d), b.wrapError(d));
	              }
	            };
	          })());return a;
	        }, version: "2.1.9" };
	    }, l, t, q, r, s, v, w, n, x, y, z, m, h, p);h.trackJs = l.reveal();
	  }
	})(window, document);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Usage:
	//  1) new Spinner({ elem: elem}) -> start/stop()
	//  2) new Spinner() -> somewhere.append(spinner.elem) -> start/stop
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
/* 37 */,
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
	
	var getDocumentHeight = __webpack_require__(75);
	
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

	"use strict";
	
	//require('./casperjs');
	
	// http://dom.spec.whatwg.org/#mutation-method-macro
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
	
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);

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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// dataset for IE10
	
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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var getScrollbarHeight = __webpack_require__(79);
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
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjA5YmU4YmZiNzNmYWEyNTA2NjEiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvdW5yZWFkeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvZm9udFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpdGV0b29sYmFyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ob3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ydW5EZW1vLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3RyYWNrSnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvbm90aWZpY2F0aW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9kZWxlZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvb25Td2lwZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9yZXNpemVPbmxvYWQvaWZyYW1lUmVzaXplLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbW9kdWxlcy9saWIvdGhyb3R0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BvbHlmaWxsL2N1c3RvbUV2ZW50LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9oaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2RvbS9nZXREb2N1bWVudEhlaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZG9tL2dldFNjcm9sbGJhckhlaWdodC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7Ozs7O0FDMUZBLG9CQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDO0FBQzNCLG9CQUFPLENBQUMsQ0FBVyxDQUFDLENBQUM7OztBQUdyQixRQUFPLENBQUMsS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBUyxDQUFDLENBQUM7O0FBRW5DLG9CQUFPLENBQUMsQ0FBVSxDQUFDLENBQUM7QUFDcEIsUUFBTyxDQUFDLEtB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LFNBQVMsR0FBQyxFQUFDLEdBQUcsRUFBQyxhQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUFDLEVBQUMsTUFBTSxFQUFDLGdCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBQyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQUMsRUFBQyxVQUFVLEVBQUMsb0JBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO1FBQUMsRUFBQyxPQUFPLEVBQUMsaUJBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDO0FBQUMsa0JBQU8sQ0FBQyxDQUFDO1VBQUEsT0FBTSxDQUFDLENBQUM7UUFBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsV0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxDQUFDLElBQUksR0FDMWYsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO01BQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsbUJBQVU7QUFBQyxrQkFBTSxDQUFDLENBQUM7VUFBQyxFQUFDLFNBQVMsRUFBQyxtQkFBUyxDQUFDLEVBQUM7QUFBQyxrQkFBTyxDQUFDLEtBQUcsQ0FBQyxHQUFDLFdBQVcsR0FBQyxJQUFJLEtBQUcsQ0FBQyxHQUFDLE1BQU0sR0FBQyxRQUFRLEtBQUcsT0FBTyxDQUFDLElBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxFQUFFLEtBQUcsQ0FBQyxHQUFDLGNBQWMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxTQUFTO1VBQUMsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7QUFDOWYsb0JBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLFdBQVcsRUFBQyxxQkFBUyxDQUFDLEVBQUM7QUFBQyxhQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQztBQUFDLG1CQUFPLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDO1VBQUEsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQztRQUFDLEVBQUMsVUFBVSxFQUFDLG9CQUFTLENBQUMsRUFBQztBQUFDLGdCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBRSxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQzFmLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQztRQUFDLEVBQUMsUUFBUSxFQUFDLGtCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxlQUFJLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsR0FBQywwQkFBMEIsR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLGdCQUFnQixLQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBQyxpQkFBaUIsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLEdBQUMsc0NBQXNDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FDcmYsQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLE1BQUssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsR0FBQywyQkFBMkIsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBQyxFQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFDLG9CQUFvQixHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsV0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7TUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBQyxpQkFBaUIsRUFBQywyQkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBRSxZQUFVLEVBQUU7YUFBQyxDQUFDLEdBQUMsSUFBSTthQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FDQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxlQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxZQUFVO0FBQUMsaUJBQUc7QUFBQyxtQkFBSSxDQUFDLEdBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLEtBQUssSUFBRSxPQUFPLEtBQUcsQ0FBQyxFQUFDLElBQUc7QUFBQyx1QkFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxrQkFBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Y0FBQztZQUFDO1VBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQVU7QUFBQyxnQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsV0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxDQUFD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LENBQUMsZUFBZSxDQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQztBQUFDLFdBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRTtNQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFDLEdBQUcsRUFBQyxhQUFTLENBQUMsRUFBQztBQUFDLGFBQUksQ0FBQyxHQUNDLEVBQUU7YUFBQyxDQUFDO2FBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsUUFBUSxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBQyxFQUFDLEtBQUssRUFBQyxpQkFBVTtBQUFDLGFBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLENBQUM7UUFBQyxFQUFDLFFBQVEsRUFBQyxvQkFBVTtBQUFDLGFBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLEtBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLEVBQUMsR0FBRyxFQUFDLGFBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUFDLEVBQUMsR0FBRyxFQUFDLGFBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBRyxDQUFDLElBQ3IrRCxDQUFDLENBQUMsR0FBRyxLQUFHLENBQUM7QUFBQyxrQkFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO1VBQUEsT0FBTSxDQUFDLENBQUM7UUFBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsV0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7TUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBQyxVQUFVLEVBQUMsb0JBQVMsQ0FBQyxFQUFDO0FBQUMsVUFBQyxDQUFDLGNBQWMsSUFB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QyxDQUFDLE1BQU0sRUFBQztBQUFDLGVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7VUFBQztRQUFDO0FBQzVmLGFBQU0sRUFBQyxrQkFBVTtBQUFDLGdCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQztBQUFDLFdBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsY0FBYyxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLEdBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFHLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7TUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBQyxhQUFhLEVBQUMsdUJBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxxQ0FBcUMsS0FBRyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFDLElBQUksR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7UUFBQyxFQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLEVBQUM7QUFBQyxnQkFBTyxJQUFJLENBQUMs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LEdBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxpQkFBaUIsS0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBQyxFQUFDLFdBQVcsRUFBQyxxQkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBRztBQUFDLGtCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxrQkFBTSxDQUFDLENBQUM7VUFBQztRQUFDLEVBQUMsV0FBVyxFQUFDLHVCQUFVO0FBQUMsYUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUzthQUFDLENBQUMsR0FB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LEVBQUMsQ0FBQyxDQUFDO1lBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxjQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDO1VBQUM7UUFBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsV0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFHO0FBQUMsYUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUM3ZixJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTtBQUMxZixzQkFBVyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksQ0FBQyxvQkFBb0IsR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE1B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SSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FDamdCLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLElBQUc7QUFBQyxtQkFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTTtjQUFDLFFBQU0sQ0FBQyxFQUFDO0FBQUMsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFVO0FBQUMsa0JBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUMsRUFB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QUFDLENBQUMsS0FBSyxFQUFDLElBQUc7QUFBQyxtQkFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxRQUFNLENBQUMsRUFBQztBQUFDLGNBQUMsR0FBQyxDQUFDO1lBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7VUFBQyxFQUFDLEtBQUssRUFBQyxlQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxrQkFBTyxZQUFVO0FBQUMsaUJBQUc7QUFBQyxtQkFBSSxDQUFDLEdBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Y0FBQyxRQUFNLENBQUMsRUFBQztBQUFDLHNCQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztjQUN0ZjtZQUFDO1VBQUMsRUFBQyxRQUFRLEVBQUMsa0JBQVMsQ0FBQyxFQUFDO0FBQUMsZUFBSSxDQUFDLEdBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7ZUFBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFVBQVUsS0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxhQUFVO0FBQUMsaUJBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsWUFBVTtBQUFDLG1CQUFHO0FBQUMscUJBQUksQ0FBQyxHQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxD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SUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFakMsT0FBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFdEMsUUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7QUFHaEMsT0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxRQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDM0IsUUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFekIsT0FBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBR3hDLFFBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVwQyxVQUFPLGFBQWEsR0FBRyxlQUFlLENBQUM7RUFDeEM7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdGlmKG1vcmVNb2R1bGVzWzBdKSB7XG4gXHRcdFx0aW5zdGFsbGVkTW9kdWxlc1swXSA9IDA7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDc6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiBcdFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIFwiMjA5YmU4YmZiNzNmYWEyNTA2NjFcIiArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyMDliZThiZmI3M2ZhYTI1MDY2MVxuICoqLyIsIlxucmVxdWlyZSgnY2xpZW50L3BvbHlmaWxsJyk7XG5yZXF1aXJlKCcuL3VucmVhZHknKTtcblxuLy9leHBvcnRzLmluaXQgPSByZXF1aXJlKCcuL2luaXQnKTtcbmV4cG9ydHMubG9naW4gPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5cbnJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5leHBvcnRzLk1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpO1xuZXhwb3J0cy5mb250VGVzdCA9IHJlcXVpcmUoJy4vZm9udFRlc3QnKTtcbmV4cG9ydHMucmVzaXplT25sb2FkID0gcmVxdWlyZSgnLi9yZXNpemVPbmxvYWQnKTtcbnJlcXVpcmUoJy4vbGF5b3V0Jyk7XG5yZXF1aXJlKCcuL3NpdGV0b29sYmFyJyk7XG5yZXF1aXJlKCcuL3NpZGViYXInKTtcbnJlcXVpcmUoJy4vbmF2aWdhdGlvbkFycm93cycpO1xucmVxdWlyZSgnLi9ob3ZlcicpO1xucmVxdWlyZSgnLi9ydW5EZW1vJyk7XG5cbi8vIG11c3QgdXNlIENvbW1vbnNDaHVua1BsdWdpblxuLy8gdG8gZW5zdXJlIHRoYXQgb3RoZXIgbW9kdWxlcyB1c2UgZXhhY3RseSB0aGlzIChpbml0aWFsaXplZCkgY2xpZW50L25vdGlmeVxucmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpLmluaXQoKTtcblxucmVxdWlyZSgnLi90cmFja0pzJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9pbmRleC5qc1xuICoqLyIsIi8vIGlmIGNsYXNzIGVuZHMgd2l0aCBfdW5yZWFkeSB0aGVuIHdlIGNvbnNpZGVyIGVsZW1lbnQgdW51c2FibGUgKHlldClcblxuXG4vLyBjYW5jZWwgY2xpY2tzIG9uIDxhIGNsYXNzPVwidW5yZWFkeVwiPiBhbmQgPGJ1dHRvbiBjbGFzcz1cInVucmVhZHlcIj5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUubWF0Y2goL191bnJlYWR5XFxiLykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICB9XG59KTtcblxuLy8gY2FuY2VsIHN1Ym1pdHMgb2YgPGZvcm0gY2xhc3M9XCJ1bnJlYWR5XCI+XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZS5tYXRjaCgvX3VucmVhZHlcXGIvKSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC91bnJlYWR5LmpzXG4gKiovIiwidmFyIE1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpO1xudmFyIFNwaW5uZXIgPSByZXF1aXJlKCdjbGllbnQvc3Bpbm5lcicpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGlvbi1sb2dpbicpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgbG9naW4oKTtcblxufSk7XG5cbmZ1bmN0aW9uIGxvZ2luKCkge1xuICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoKTtcbiAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcigpO1xuICBtb2RhbC5zZXRDb250ZW50KHNwaW5uZXIuZWxlbSk7XG4gIHNwaW5uZXIuc3RhcnQoKTtcblxuICByZXF1aXJlLmVuc3VyZSgnYXV0aC9jbGllbnQnLCBmdW5jdGlvbigpIHtcbiAgICBtb2RhbC5yZW1vdmUoKTtcbiAgICB2YXIgQXV0aE1vZGFsID0gcmVxdWlyZSgnYXV0aC9jbGllbnQnKS5BdXRoTW9kYWw7XG4gICAgbmV3IEF1dGhNb2RhbCgpO1xuICB9LCAnYXV0aENsaWVudCcpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9naW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2xvZ2luLmpzXG4gKiovIiwiXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGlvbi11c2VyLWxvZ291dCcpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxvZ291dCgpO1xuICB9XG59KTtcblxuXG5mdW5jdGlvbiBsb2dvdXQoKSB7XG4gIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgZm9ybS5hY3Rpb24gPSAnL2F1dGgvbG9nb3V0P19jc3JmPScgKyBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLylbMV07XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIGZvcm0uc3VibWl0KCk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dvdXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2xvZ291dC5qc1xuICoqLyIsImZ1bmN0aW9uIE1vZGFsKCkge1xuICB0aGlzLnJlbmRlcigpO1xuXG4gIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICB0aGlzLm9uRG9jdW1lbnRLZXlEb3duID0gdGhpcy5vbkRvY3VtZW50S2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5vbkRvY3VtZW50S2V5RG93bik7XG59XG5cbk1vZGFsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZUVuZCcsICc8ZGl2IGNsYXNzPVwibW9kYWxcIj48ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+PC9kaXY+PC9kaXY+Jyk7XG4gIHRoaXMuZWxlbSA9IGRvY3VtZW50LmJvZHkubGFzdENoaWxkO1xuICB0aGlzLmNvbnRlbnRFbGVtID0gdGhpcy5lbGVtLmxhc3RDaGlsZDtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlLWJ1dHRvbicpKSB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgfVxufTtcblxuXG5Nb2RhbC5wcm90b3R5cGUub25Eb2N1bWVudEtleURvd24gPSBmdW5jdGlvbihldmVudCkge1xuICBpZiAoZXZlbnQua2V5Q29kZSA9PSAyNykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgfVxufTtcblxuTW9kYWwucHJvdG90eXBlLnNob3dPdmVybGF5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29udGVudEVsZW0uY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3ZlcmxheV9saWdodCcpO1xufTtcblxuTW9kYWwucHJvdG90eXBlLmhpZGVPdmVybGF5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29udGVudEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtb3ZlcmxheV9saWdodCcpO1xufTtcblxuTW9kYWwucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbihodG1sT3JOb2RlKSB7XG4gIGlmICh0eXBlb2YgaHRtbE9yTm9kZSA9PSAnc3RyaW5nJykge1xuICAgIHRoaXMuY29udGVudEVsZW0uaW5uZXJIVE1MID0gaHRtbE9yTm9kZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmNvbnRlbnRFbGVtLmlubmVySFRNTCA9ICcnO1xuICAgIHRoaXMuY29udGVudEVsZW0uYXBwZW5kQ2hpbGQoaHRtbE9yTm9kZSk7XG4gIH1cbiAgdmFyIGF1dG9mb2N1cyA9IHRoaXMuY29udGVudEVsZW0ucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10nKTtcbiAgaWYgKGF1dG9mb2N1cykgYXV0b2ZvY3VzLmZvY3VzKCk7XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5vbkRvY3VtZW50S2V5RG93bik7XG4gIHRoaXMuZWxlbS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIm1vZGFsQ2xvc2VcIikpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbW9kYWwuanNcbiAqKi8iLCIvKlxu0JjQt9Cx0LXQs9Cw0LXQvCBGT1VUIC0g0L/RgNC+0YHRgtC+0Lkg0YHQv9C+0YHQvtCxINC/0YDQvtCy0LXRgNC60Lgg0LfQsNCz0YDRg9C30LrQuCDQuNC60L7QvdC40Log0YjRgNC40YTRgtCwLlxuIDEpINCU0LXQu9Cw0LXQvCDQsiBpY29uaWMg0YjRgNC40YTRgtC1INC+0LTQuNC9INGB0LjQvNCy0L7QuyDRgSDQutC+0LTQvtC8IDIxICjQstC80LXRgdGC0L4gwqshwrspXG4g0JIgaWNvbm1vb25cbiBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNC0wOS0wNl8wMTUyLnBuZ1xuIGh0dHA6Ly9pbHlha2FudG9yLnJ1L3NjcmVlbi8yMDE0LTA5LTA2XzAxNTMucG5nXG5cbiDQrdGC0L7RgiDRiNGA0LjRhNGCINCyINC+0LHRi9GH0L3QvtC8INGI0YDQuNGE0YLQtSAoc2VyaWYpINGD0LfQutC40Lkg0L/QviDRiNC40YDQuNC90LUsINCwINCyIGljb25pYyAtINC90L7RgNC80LDQu9GM0L3Ri9C5LlxuIDIpINCU0LDQu9C10LUg0L/RgNC4INC30LDQs9GA0YPQt9C60LUg0YHQvtC30LTQsNGR0LwgPHNwYW4+ITwvc3Bhbj4g0Lgg0LTQsNGR0Lwg0LXQvNGDIGZvbnRGYW1pbHkg0YHQvdCw0YfQsNC70LAgc2VyaWYg0Lgg0LfQsNC80LXRgNGP0LXQvCDRiNC40YDQuNC90YMsINCwINC/0L7RgtC+0LwgRm9udEljb25zLCBzZXJpZi5cbiDQntGC0LvQsNCy0LvQuNCy0LDQtdC8INC80L7QvNC10L3Rgiwg0LrQvtCz0LTQsCDRiNC40YDQuNC90LAg0LjQt9C80LXQvdC40YLRgdGPLiDQrdGC0L4g0LfQvdCw0YfQuNGCINGI0YDQuNGE0YIg0LfQsNCz0YDRg9C20LXQvS5cbiDQnNC+0LbQvdC+INGD0LHRgNCw0YLRjCDQutC70LDRgdGBIC5uby1pY29ucyDQuCDQv9C+0LrQsNC30LDRgtGMINC40LrQvtC90LrQuC5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICBlbGVtLmNsYXNzTmFtZSA9ICdmb250LXRlc3QnO1xuICBlbGVtLnN0eWxlLmZvbnRGYW1pbHkgPSAnc2VyaWYnO1xuICB2YXIgaW5pdGlhbFdpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcblxuICBlbGVtLnN0eWxlLmZvbnRGYW1pbHkgPSAnJztcblxuICBmdW5jdGlvbiBjaGVja0ZvbnRMb2FkZWQoKSB7XG4gICAgaWYgKGluaXRpYWxXaWR0aCAhPSBlbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLWljb25zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoY2hlY2tGb250TG9hZGVkLCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9udExvYWRlZCgpO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9mb250VGVzdC5qc1xuICoqLyIsInZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZDtcblxudmFyIERFQlVHID0gZmFsc2U7XG5mdW5jdGlvbiBsb2coKSB7XG4gIGlmIChERUJVRykge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxudmFyIFRBQkxFVF9XSURUSCA9IDg0MDtcblxuKGZ1bmN0aW9uKCkge1xuXG4gIC8vIGRvbid0IGhhbmRsZSBvbnNjcm9sbCBtb3JlIG9mdGVuIHRoYW4gYW5pbWF0aW9uXG4gIGZ1bmN0aW9uIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplVGhyb3R0bGVkKCkge1xuICAgIGxvZyhcIm9uV2luZG93U2Nyb2xsQW5kUmVzaXplVGhyb3R0bGVkXCIsIHJlcXVlc3RBbmltYXRpb25GcmFtZUlkKTtcbiAgICBpZiAocmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQpIHJldHVybjtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCA9IG51bGw7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBvbldpbmRvd1Njcm9sbEFuZFJlc2l6ZVRocm90dGxlZCk7XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIGNvbXBhY3RpZnlTaWRlYmFyKCkge1xuICBsb2coXCJjb21wYWN0aWZ5U2lkZWJhclwiKTtcbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIHZhciBzaWRlYmFyQ29udGVudCA9IHNpZGViYXIucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX2NvbnRlbnQnKTtcbiAgdmFyIHNpZGViYXJJbm5lciA9IHNpZGViYXIucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX2lubmVyJyk7XG5cbiAgdmFyIGhhc1N0aWNreUZvb3RlciA9IHNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyX3N0aWNreS1mb290ZXInKTtcbiAgdmFyIGlzQ29tcGFjdCA9IHNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyX2NvbXBhY3QnKTtcblxuICBpZiAoaXNDb21wYWN0KSB7XG4gICAgdmFyIGVtcHR5U3BhY2VTaXplO1xuICAgIGlmIChoYXNTdGlja3lGb290ZXIpIHtcbiAgICAgIGVtcHR5U3BhY2VTaXplID0gc2lkZWJhckNvbnRlbnQubGFzdEVsZW1lbnRDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLVxuICAgICAgc2lkZWJhckNvbnRlbnQubGFzdEVsZW1lbnRDaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1wdHlTcGFjZVNpemUgPSBzaWRlYmFyQ29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gLVxuICAgICAgc2lkZWJhckNvbnRlbnQubGFzdEVsZW1lbnRDaGlsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG4gICAgfVxuXG4gICAgbG9nKFwiZGVjb21wYWN0P1wiLCBlbXB0eVNwYWNlU2l6ZSk7XG5cbiAgICAvLyBlbm91Z2ggc3BhY2UgdG8gb2NjdXB5IHRoZSBmdWxsIGhlaWdodCBpbiBkZWNvbXBhY3RlZCBmb3JtIHdpdGhvdXQgc2Nyb2xsYmFyXG4gICAgaWYgKGVtcHR5U3BhY2VTaXplID4gMTUwKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXJfY29tcGFjdCcpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGxvZyhzaWRlYmFySW5uZXIuc2Nyb2xsSGVpZ2h0LCBzaWRlYmFySW5uZXIuY2xpZW50SGVpZ2h0KTtcbiAgICBpZiAoc2lkZWJhcklubmVyLnNjcm9sbEhlaWdodCA+IHNpZGViYXJJbm5lci5jbGllbnRIZWlnaHQpIHtcbiAgICAgIGxvZyhcImNvbXBhY3QhXCIpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX2NvbXBhY3QnKTtcbiAgICB9XG4gIH1cblxuXG59XG5cbmZ1bmN0aW9uIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplKCkge1xuXG4gIHZhciBzaXRldG9vbGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRldG9vbGJhcicpO1xuICBpZiAoIXNpdGV0b29sYmFyKSB7XG4gICAgbG9nKFwibm8gc2l0ZXRvb2xiYXJcIik7XG4gICAgcmV0dXJuOyAvLyBwYWdlIGluIGEgbm8tdG9wLW5hdiBsYXlvdXRcbiAgfVxuXG4gIHZhciBzaXRldG9vbGJhckhlaWdodCA9IHNpdGV0b29sYmFyLm9mZnNldEhlaWdodDtcblxuICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgaWYgKHNpZGViYXIpIHtcbiAgICBzaWRlYmFyLnN0eWxlLnRvcCA9IE1hdGgubWF4KHNpdGV0b29sYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSwgMCkgKyAncHgnO1xuICAgIGNvbXBhY3RpZnlTaWRlYmFyKCk7XG4gIH1cblxuICBzZXRVc2VyU2NhbGVJZlRhYmxldCgpO1xuXG5cbn1cblxuZnVuY3Rpb24gc2V0VXNlclNjYWxlSWZUYWJsZXQoKSB7XG4gIHZhciBpc1RhYmxldCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8PSBUQUJMRVRfV0lEVEg7XG4gIHZhciBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKS5jb250ZW50O1xuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC91c2VyLXNjYWxhYmxlPVxcdysvLCAndXNlci1zY2FsYWJsZT0nICsgKGlzVGFibGV0ID8gJ3llcycgOiAnbm8nKSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJykuY29udGVudCA9IGNvbnRlbnQ7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9sYXlvdXQuanNcbiAqKi8iLCJcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblNlYXJjaENsaWNrKTtcblxuXG4vLyB0b2dnbGUgc2VhcmNoIG9uL29mZiwgYXV0b2ZvY3VzIG9uIGlucHV0IHdoZW4gXCJvblwiXG5mdW5jdGlvbiBvblNlYXJjaENsaWNrKGV2ZW50KSB7XG4gIHZhciBzZWFyY2hUb2dnbGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNpdGV0b29sYmFyX19zZWFyY2gtdG9nZ2xlJyk7XG5cbiAgaWYgKHNlYXJjaFRvZ2dsZSkge1xuICAgIHRvZ2dsZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgdmFyIHNpdGV0b29sYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGV0b29sYmFyJyk7XG4gIHNpdGV0b29sYmFyLmNsYXNzTGlzdC50b2dnbGUoJ3NpdGV0b29sYmFyX3NlYXJjaF9vcGVuJyk7XG5cbiAgdmFyIGlucHV0ID0gc2l0ZXRvb2xiYXIucXVlcnlTZWxlY3RvcignLnNpdGV0b29sYmFyX19zZWFyY2gtcXVlcnkgaW5wdXQnKTtcbiAgaWYgKHNpdGV0b29sYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2l0ZXRvb2xiYXJfc2VhcmNoX29wZW4nKSkge1xuICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICBpZiAoIWlucHV0Lm9ua2V5ZG93bikge1xuICAgICAgaW5wdXQub25rZXlkb3duID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9zaXRldG9vbGJhci5qc1xuICoqLyIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG5cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmNsYXNzTGlzdC50b2dnbGUoJ3BhZ2Vfc2lkZWJhcl9vbicpO1xuXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmNsYXNzTGlzdC5jb250YWlucygncGFnZV9zaWRlYmFyX29uJykpIHtcbiAgICBkZWxldGUgbG9jYWxTdG9yYWdlLm5vU2lkZWJhcjtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbFN0b3JhZ2Uubm9TaWRlYmFyID0gMTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5kYXRhc2V0LnNpZGViYXJUb2dnbGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIHRvZ2dsZSgpO1xufVxuXG5cbmZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAvLyBkb24ndCByZWFjdCBvbiBDdHJsLT4gPC0gaWYgaW4gdGV4dFxuICBpZiAoflsnSU5QVVQnLCAnVEVYVEFSRUEnLCAnU0VMRUNUJ10uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUpKSByZXR1cm47XG5cbiAgaWYgKGV2ZW50LmtleUNvZGUgIT0gXCJTXCIuY2hhckNvZGVBdCgwKSkgcmV0dXJuO1xuXG4gIGlmICh+bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJtYWMgb3MgeFwiKSkge1xuICAgIGlmICghZXZlbnQubWV0YUtleSB8fCAhZXZlbnQuYWx0S2V5KSByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFldmVudC5hbHRLZXkpIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZSgpO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3NpZGViYXIuanNcbiAqKi8iLCIvLyBuYXZpZ2F0aW9uIHN0YXJ0cyB0byB3b3JrIHJpZ2h0IG5vd1xudmFyIG9uU3dpcGUgPSByZXF1aXJlKCdjbGllbnQvb25Td2lwZScpO1xudmFyIGN0cmxPckFsdCA9IH5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIm1hYyBvcyB4XCIpID8gJ2N0cmwnIDogJ2FsdCc7XG5cbmZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAvLyBkb24ndCByZWFjdCBvbiBDdHJsLT4gPC0gaWYgaW4gdGV4dFxuICBpZiAoflsnSU5QVVQnLCAnVEVYVEFSRUEnLCAnU0VMRUNUJ10uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUpKSByZXR1cm47XG5cbiAgaWYgKCFldmVudFtjdHJsT3JBbHQgKyAnS2V5J10pIHJldHVybjtcblxuICB2YXIgcmVsID0gbnVsbDtcbiAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gIGNhc2UgMHgyNTpcbiAgICByZWwgPSAncHJldic7XG4gICAgYnJlYWs7XG4gIGNhc2UgMHgyNzpcbiAgICByZWwgPSAnbmV4dCc7XG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cIicgKyByZWwgKyAnXCJdJyk7XG4gIGlmICghbGluaykgcmV0dXJuO1xuXG4gIGRvY3VtZW50LmxvY2F0aW9uID0gbGluay5ocmVmO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG59XG5cbmZ1bmN0aW9uIHNob3dIb3RLZXlzKCkge1xuICB2YXIga2V5RGVzYyA9IGN0cmxPckFsdFswXS50b1VwcGVyQ2FzZSgpICsgY3RybE9yQWx0LnNsaWNlKDEpO1xuXG4gIHZhciBzaG9ydGN1dDtcblxuICB2YXIgbmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwibmV4dFwiXScpO1xuICBpZiAobmV4dCkge1xuICAgIHNob3J0Y3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYVtocmVmPVwiJyArIG5leHQuZ2V0QXR0cmlidXRlKCdocmVmJykgKyAnXCJdIC5wYWdlX19uYXYtdGV4dC1zaG9ydGN1dCcpO1xuICAgIHNob3J0Y3V0LmlubmVySFRNTCA9IGtleURlc2MgKyAnICsgPHNwYW4gY2xhc3M9XCJwYWdlX19uYXYtdGV4dC1hcnJcIj7ihpI8L3NwYW4+JztcbiAgfVxuXG4gIHZhciBwcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJwcmV2XCJdJyk7XG4gIGlmIChwcmV2KSB7XG4gICAgc2hvcnRjdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2hyZWY9XCInICsgcHJldi5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSArICdcIl0gLnBhZ2VfX25hdi10ZXh0LXNob3J0Y3V0Jyk7XG4gICAgc2hvcnRjdXQuaW5uZXJIVE1MID0ga2V5RGVzYyArICcgKyA8c3BhbiBjbGFzcz1cInBhZ2VfX25hdi10ZXh0LWFyclwiPuKGkDwvc3Bhbj4nO1xuICB9XG5cbn1cblxub25Td2lwZShkb2N1bWVudCwge1xuICBvblJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwicHJldlwiXScpO1xuICAgIGlmIChsaW5rKSBkb2N1bWVudC5sb2NhdGlvbiA9IGxpbmsuaHJlZjtcbiAgfSxcbiAgb25MZWZ0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwibmV4dFwiXScpO1xuICAgIGlmIChsaW5rKSBkb2N1bWVudC5sb2NhdGlvbiA9IGxpbmsuaHJlZjtcbiAgfVxufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2hvd0hvdEtleXMpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9uYXZpZ2F0aW9uQXJyb3dzLmpzXG4gKiovIiwiLy8gYWRkL3JlbW92ZSAuaG92ZXIgb25tb3VzZWVudGVyL2xlYXZlXG4vLyBmb3IgbW9iaWxlIGRldmljZXMgKDpob3ZlciBzdGlja3MpXG5cbnZhciBjdXJyZW50SG92ZXJFbGVtO1xuXG4vKlxuZnVuY3Rpb24gbG9nKGUpIHtcbiAgY29uc29sZS5sb2coRGF0ZS5ub3coKSAlIDFlNCwgZS50eXBlKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGxlYXZlXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaFwiLCBsb2csIGZhbHNlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBsb2csIGZhbHNlKTtcbiovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbihldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWFkZC1jbGFzcy1vbi1ob3Zlcl0nKTtcbiAgaWYgKHRhcmdldCkge1xuICAgIGN1cnJlbnRIb3ZlckVsZW0gPSB0YXJnZXQ7XG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyJyk7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgaWYgKGN1cnJlbnRIb3ZlckVsZW0pIHtcbiAgICAgIGN1cnJlbnRIb3ZlckVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcbiAgICAgIGN1cnJlbnRIb3ZlckVsZW0gPSBudWxsO1xuICAgIH1cbiAgfSwgNTAwKTsgLy8gdG91Y2hzdGFydCAtPiB0b3VyY2hlbmQgLT4gKGRlbGF5IHVwIHRvIDMwMG1zKSAtPiBtb3VzZW92ZXJcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmICghY3VycmVudEhvdmVyRWxlbSkgcmV0dXJuO1xuXG4gIGlmIChjdXJyZW50SG92ZXJFbGVtLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3VycmVudEhvdmVyRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpO1xuICBjdXJyZW50SG92ZXJFbGVtID0gbnVsbDtcbn0pO1xuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvaG92ZXIuanNcbiAqKi8iLCJ3aW5kb3cucnVuRGVtbyA9IGZ1bmN0aW9uKGJ1dHRvbikge1xuXG4gIHZhciBkZW1vRWxlbTtcbiAgdmFyIHBhcmVudCA9IGJ1dHRvbjtcblxuICAvKiBqc2hpbnQgLVcwODQgKi9cbiAgd2hpbGUocGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICBkZW1vRWxlbSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kZW1vXScpO1xuICAgIGlmIChkZW1vRWxlbSkgYnJlYWs7XG4gIH1cblxuICBpZiAoIWRlbW9FbGVtKSB7XG4gICAgYWxlcnQoXCLQntGI0LjQsdC60LAsINC90LXRgiDRjdC70LXQvNC10L3RgtCwINGBINC00LXQvNC+XCIpO1xuICB9IGVsc2Uge1xuICAgIC8qIGpzaGludCAtVzA2MSAqL1xuICAgIGV2YWwoZGVtb0VsZW0udGV4dENvbnRlbnQpO1xuICB9XG5cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9ydW5EZW1vLmpzXG4gKiovIiwiXG53aW5kb3cuX3RyYWNrSnMgPSB7IHRva2VuOiAnOGQyODZkZDFjYmY3NDRiOTg3YTcyMjZlZTlhMDkzMjQnIH07XG4vLyBDT1BZUklHSFQgKGMpIDIwMTUgVHJhY2tKUyBMTEMgQUxMIFJJR0hUUyBSRVNFUlZFRFxuKGZ1bmN0aW9uKGgscCxrKXtcInVzZSBhd2Vzb21lXCI7aWYoaC50cmFja0pzKWguY29uc29sZSYmaC5jb25zb2xlLndhcm4mJmguY29uc29sZS53YXJuKFwiVHJhY2tKUyBnbG9iYWwgY29uZmxpY3RcIik7ZWxzZXt2YXIgbD1mdW5jdGlvbihhLGIsYyxkLGUpe3RoaXMudXRpbD1hO3RoaXMub25FcnJvcj1iO3RoaXMub25GYXVsdD1jO3RoaXMub3B0aW9ucz1lO2UuZW5hYmxlZCYmdGhpcy5pbml0aWFsaXplKGQpfTtsLnByb3RvdHlwZT17aW5pdGlhbGl6ZTpmdW5jdGlvbihhKXthLmFkZEV2ZW50TGlzdGVuZXImJih0aGlzLndyYXBBbmRDYXRjaChhLkVsZW1lbnQucHJvdG90eXBlLFwiYWRkRXZlbnRMaXN0ZW5lclwiLDEpLHRoaXMud3JhcEFuZENhdGNoKGEuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLFwiYWRkRXZlbnRMaXN0ZW5lclwiLDEpLHRoaXMud3JhcFJlbW92ZUV2ZW50TGlzdGVuZXIoYS5FbGVtZW50LnByb3RvdHlwZSksdGhpcy53cmFwUmVtb3ZlRXZlbnRMaXN0ZW5lcihhLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSkpO1xuICB0aGlzLndyYXBBbmRDYXRjaChhLFwic2V0VGltZW91dFwiLDApO3RoaXMud3JhcEFuZENhdGNoKGEsXCJzZXRJbnRlcnZhbFwiLDApfSx3cmFwQW5kQ2F0Y2g6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMsZT1hW2JdO2QudXRpbC5oYXNGdW5jdGlvbihlLFwiYXBwbHlcIikmJihhW2JdPWZ1bmN0aW9uKCl7dHJ5e3ZhciBmPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksZz1mW2NdLHUsaDtpZihkLm9wdGlvbnMuYmluZFN0YWNrKXRyeXt0aHJvdyBFcnJvcigpO31jYXRjaChrKXtoPWsuc3RhY2ssdT1kLnV0aWwuaXNvTm93KCl9aWYoXCJhZGRFdmVudExpc3RlbmVyXCI9PT1iJiYodGhpcy5fdHJhY2tKc0V2dHx8KHRoaXMuX3RyYWNrSnNFdnQ9bmV3IG0pLHRoaXMuX3RyYWNrSnNFdnQuZ2V0V3JhcHBlZChmWzBdLGcsZlsyXSkpKXJldHVybjtnJiZkLnV0aWwuaGFzRnVuY3Rpb24oZyxcImFwcGx5XCIpJiYoZltjXT1mdW5jdGlvbigpe3RyeXtyZXR1cm4gZy5hcHBseSh0aGlzLFxuICBhcmd1bWVudHMpfWNhdGNoKGEpe3Rocm93IGQub25FcnJvcihcImNhdGNoXCIsYSx7YmluZFRpbWU6dSxiaW5kU3RhY2s6aH0pLGQudXRpbC53cmFwRXJyb3IoYSk7fX0sXCJhZGRFdmVudExpc3RlbmVyXCI9PT1iJiZ0aGlzLl90cmFja0pzRXZ0LmFkZChmWzBdLGcsZlsyXSxmW2NdKSk7cmV0dXJuIGUuYXBwbHkodGhpcyxmKX1jYXRjaChsKXthW2JdPWUsZC5vbkZhdWx0KGwpfX0pfSx3cmFwUmVtb3ZlRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihhKXtpZihhJiZhLnJlbW92ZUV2ZW50TGlzdGVuZXImJnRoaXMudXRpbC5oYXNGdW5jdGlvbihhLnJlbW92ZUV2ZW50TGlzdGVuZXIsXCJjYWxsXCIpKXt2YXIgYj1hLnJlbW92ZUV2ZW50TGlzdGVuZXI7YS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsZCxlKXtpZih0aGlzLl90cmFja0pzRXZ0KXt2YXIgZj10aGlzLl90cmFja0pzRXZ0LmdldFdyYXBwZWQoYSxkLGUpO2YmJnRoaXMuX3RyYWNrSnNFdnQucmVtb3ZlKGEsZCxlKTtyZXR1cm4gYi5jYWxsKHRoaXMsXG4gIGEsZixlKX1yZXR1cm4gYi5jYWxsKHRoaXMsYSxkLGUpfX19fTt2YXIgbT1mdW5jdGlvbigpe3RoaXMuZXZlbnRzPVtdfTttLnByb3RvdHlwZT17YWRkOmZ1bmN0aW9uKGEsYixjLGQpey0xPj10aGlzLmluZGV4T2YoYSxiLGMpJiZ0aGlzLmV2ZW50cy5wdXNoKFthLGIsISFjLGRdKX0scmVtb3ZlOmZ1bmN0aW9uKGEsYixjKXthPXRoaXMuaW5kZXhPZihhLGIsISFjKTswPD1hJiZ0aGlzLmV2ZW50cy5zcGxpY2UoYSwxKX0sZ2V0V3JhcHBlZDpmdW5jdGlvbihhLGIsYyl7YT10aGlzLmluZGV4T2YoYSxiLCEhYyk7cmV0dXJuIDA8PWE/dGhpcy5ldmVudHNbYV1bM106a30saW5kZXhPZjpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPTA7ZDx0aGlzLmV2ZW50cy5sZW5ndGg7ZCsrKWlmKHRoaXMuZXZlbnRzW2RdWzBdPT09YSYmdGhpcy5ldmVudHNbZF1bMV09PT1iJiZ0aGlzLmV2ZW50c1tkXVsyXT09PSEhYylyZXR1cm4gZDtyZXR1cm4tMX19O3ZhciB0PWZ1bmN0aW9uKGEsYil7dGhpcy51dGlsPVxuICBhO3RoaXMuaW5pdEN1cnJlbnQoYil9O3QucHJvdG90eXBlPXtjdXJyZW50Ont9LGluaXRPbmx5OnthcHBsaWNhdGlvbjpcIlwiLGVuYWJsZWQ6ITAsdG9rZW46ITAsY2FsbGJhY2s6e2VuYWJsZWQ6ITB9LGNvbnNvbGU6e2VuYWJsZWQ6ITB9LG5ldHdvcms6e2VuYWJsZWQ6ITB9LHZpc2l0b3I6e2VuYWJsZWQ6ITB9LHdpbmRvdzp7ZW5hYmxlZDohMH19LGRlZmF1bHRzOnthcHBsaWNhdGlvbjpcIlwiLGVuYWJsZWQ6ITAsb25FcnJvcjpmdW5jdGlvbigpe3JldHVybiEwfSxzZXJpYWxpemU6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1rP1widW5kZWZpbmVkXCI6bnVsbD09PWE/XCJudWxsXCI6XCJudW1iZXJcIj09PXR5cGVvZiBhJiZpc05hTihhKT9cIk5hTlwiOlwiXCI9PT1hP1wiRW1wdHkgU3RyaW5nXCI6MD09PWE/XCIwXCI6ITE9PT1hP1wiZmFsc2VcIjphJiZhLnRvU3RyaW5nP2EudG9TdHJpbmcoKTpcInVua25vd25cIn0sc2Vzc2lvbklkOlwiXCIsdG9rZW46XCJcIix1c2VySWQ6XCJcIix2ZXJzaW9uOlwiXCIsY2FsbGJhY2s6e2VuYWJsZWQ6ITAsXG4gIGJpbmRTdGFjazohMX0sY29uc29sZTp7ZW5hYmxlZDohMCxkaXNwbGF5OiEwLGVycm9yOiEwLHdhdGNoOltcImxvZ1wiLFwiZGVidWdcIixcImluZm9cIixcIndhcm5cIixcImVycm9yXCJdfSxuZXR3b3JrOntlbmFibGVkOiEwLGVycm9yOiEwfSx2aXNpdG9yOntlbmFibGVkOiEwfSx3aW5kb3c6e2VuYWJsZWQ6ITB9fSxpbml0Q3VycmVudDpmdW5jdGlvbihhKXtpZih0aGlzLnZhbGlkYXRlKGEsdGhpcy5kZWZhdWx0cyxcImNvbmZpZ1wiLHt9KSlyZXR1cm4gdGhpcy5jdXJyZW50PXRoaXMudXRpbC5leHRlbmQodGhpcy5jdXJyZW50LHRoaXMuZGVmYXVsdHMsYSksITA7dGhpcy5jdXJyZW50PXRoaXMudXRpbC5leHRlbmQodGhpcy5jdXJyZW50LHRoaXMuZGVmYXVsdHMpO3JldHVybiExfSxzZXRDdXJyZW50OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnZhbGlkYXRlKGEsdGhpcy5kZWZhdWx0cyxcImNvbmZpZ1wiLHRoaXMuaW5pdE9ubHkpPyh0aGlzLmN1cnJlbnQ9dGhpcy51dGlsLmV4dGVuZCh0aGlzLmN1cnJlbnQsXG4gIGEpLCEwKTohMX0sdmFsaWRhdGU6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9ITA7Yz1jfHxcIlwiO2Q9ZHx8e307Zm9yKHZhciBmIGluIGEpaWYoYS5oYXNPd25Qcm9wZXJ0eShmKSlpZihiLmhhc093blByb3BlcnR5KGYpKXt2YXIgZz10eXBlb2YgYltmXTtnIT09dHlwZW9mIGFbZl0/KGNvbnNvbGUud2FybihjK1wiLlwiK2YrXCI6IHByb3BlcnR5IG11c3QgYmUgdHlwZSBcIitnK1wiLlwiKSxlPSExKTpcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYVtmXSl8fHRoaXMudmFsaWRhdGVBcnJheShhW2ZdLGJbZl0sYytcIi5cIitmKT9cIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFbZl0pP2U9dGhpcy52YWxpZGF0ZShhW2ZdLGJbZl0sYytcIi5cIitmLGRbZl0pOmQuaGFzT3duUHJvcGVydHkoZikmJihjb25zb2xlLndhcm4oYytcIi5cIitmK1wiOiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IGFmdGVyIGxvYWQuXCIpLGU9ITEpOlxuICBlPSExfWVsc2UgY29uc29sZS53YXJuKGMrXCIuXCIrZitcIjogcHJvcGVydHkgbm90IHN1cHBvcnRlZC5cIiksZT0hMTtyZXR1cm4gZX0sdmFsaWRhdGVBcnJheTpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9ITA7Yz1jfHxcIlwiO2Zvcih2YXIgZT0wO2U8YS5sZW5ndGg7ZSsrKXRoaXMudXRpbC5jb250YWlucyhiLGFbZV0pfHwoY29uc29sZS53YXJuKGMrXCJbXCIrZStcIl06IGludmFsaWQgdmFsdWU6IFwiK2FbZV0rXCIuXCIpLGQ9ITEpO3JldHVybiBkfX07dmFyIHE9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dGhpcy51dGlsPWE7dGhpcy5sb2c9Yjt0aGlzLm9uRXJyb3I9Yzt0aGlzLm9uRmF1bHQ9ZDt0aGlzLnNlcmlhbGl6ZT1lO2cuZW5hYmxlZCYmKGYuY29uc29sZT10aGlzLndyYXBDb25zb2xlT2JqZWN0KGYuY29uc29sZSxnKSl9O3EucHJvdG90eXBlPXt3cmFwQ29uc29sZU9iamVjdDpmdW5jdGlvbihhLGIpe2E9YXx8e307dmFyIGM9YS5sb2d8fGZ1bmN0aW9uKCl7fSxkPXRoaXMsZTtmb3IoZT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDtlPGIud2F0Y2gubGVuZ3RoO2UrKykoZnVuY3Rpb24oZSl7dmFyIGc9YVtlXXx8YzthW2VdPWZ1bmN0aW9uKCl7dHJ5e3ZhciBhPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7ZC5sb2cuYWRkKFwiY1wiLHt0aW1lc3RhbXA6ZC51dGlsLmlzb05vdygpLHNldmVyaXR5OmUsbWVzc2FnZTpkLnNlcmlhbGl6ZShhKX0pO2lmKGIuZXJyb3ImJlwiZXJyb3JcIj09PWUpdHJ5e3Rocm93IEVycm9yKGFbMF0pO31jYXRjaChjKXtkLm9uRXJyb3IoXCJjb25zb2xlXCIsYyl9Yi5kaXNwbGF5JiYoZC51dGlsLmhhc0Z1bmN0aW9uKGcsXCJhcHBseVwiKT9nLmFwcGx5KHRoaXMsYSk6ZyhhWzBdLGFbMV0sYVsyXSkpfWNhdGNoKGgpe2Qub25GYXVsdChoKX19fSkoYi53YXRjaFtlXSk7cmV0dXJuIGF9LHJlcG9ydDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxvZy5hbGwoXCJjXCIpfX07dmFyIHI9ZnVuY3Rpb24oYSxiLGMsZCxlKXt0aGlzLmNvbmZpZz1hO3RoaXMudXRpbD1iO3RoaXMubG9nPVxuICBjO3RoaXMud2luZG93PWQ7dGhpcy5kb2N1bWVudD1lO3RoaXMuY29ycmVsYXRpb25JZD10aGlzLnRva2VuPW51bGw7dGhpcy5pbml0aWFsaXplKCl9O3IucHJvdG90eXBlPXtpbml0aWFsaXplOmZ1bmN0aW9uKCl7dGhpcy50b2tlbj10aGlzLmdldEN1c3RvbWVyVG9rZW4oKTt0aGlzLmNvcnJlbGF0aW9uSWQ9dGhpcy5nZXRDb3JyZWxhdGlvbklkKCl9LGdldEN1c3RvbWVyVG9rZW46ZnVuY3Rpb24oKXtpZih0aGlzLmNvbmZpZy5jdXJyZW50LnRva2VuKXJldHVybiB0aGlzLmNvbmZpZy5jdXJyZW50LnRva2VuO3ZhciBhPXRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7cmV0dXJuIGFbYS5sZW5ndGgtMV0uZ2V0QXR0cmlidXRlKFwiZGF0YS10b2tlblwiKX0sZ2V0Q29ycmVsYXRpb25JZDpmdW5jdGlvbigpe3ZhciBhO3RyeXthPXRoaXMuZG9jdW1lbnQuY29va2llLnJlcGxhY2UoLyg/Oig/Ol58Lio7XFxzKilUcmFja0pTXFxzKlxcPVxccyooW147XSopLiokKXxeLiokLyxcbiAgXCIkMVwiKSxhfHwoYT10aGlzLnV0aWwudXVpZCgpLHRoaXMuZG9jdW1lbnQuY29va2llPVwiVHJhY2tKUz1cIithK1wiOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgR01UOyBwYXRoPS9cIil9Y2F0Y2goYil7YT10aGlzLnV0aWwudXVpZCgpfXJldHVybiBhfSxyZXBvcnQ6ZnVuY3Rpb24oKXtyZXR1cm57YXBwbGljYXRpb246dGhpcy5jb25maWcuY3VycmVudC5hcHBsaWNhdGlvbixjb3JyZWxhdGlvbklkOnRoaXMuY29ycmVsYXRpb25JZCxzZXNzaW9uSWQ6dGhpcy5jb25maWcuY3VycmVudC5zZXNzaW9uSWQsdG9rZW46dGhpcy50b2tlbix1c2VySWQ6dGhpcy5jb25maWcuY3VycmVudC51c2VySWQsdmVyc2lvbjp0aGlzLmNvbmZpZy5jdXJyZW50LnZlcnNpb259fX07dmFyIHM9ZnVuY3Rpb24oYSl7dGhpcy5sb2FkZWRPbj0obmV3IERhdGUpLmdldFRpbWUoKTt0aGlzLndpbmRvdz1hfTtzLnByb3RvdHlwZT17ZGlzY292ZXJEZXBlbmRlbmNpZXM6ZnVuY3Rpb24oKXt2YXIgYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYj17fTt0aGlzLndpbmRvdy5qUXVlcnkmJih0aGlzLndpbmRvdy5qUXVlcnkuZm4mJnRoaXMud2luZG93LmpRdWVyeS5mbi5qcXVlcnkpJiYoYi5qUXVlcnk9dGhpcy53aW5kb3cualF1ZXJ5LmZuLmpxdWVyeSk7dGhpcy53aW5kb3cualF1ZXJ5JiYodGhpcy53aW5kb3cualF1ZXJ5LnVpJiZ0aGlzLndpbmRvdy5qUXVlcnkudWkudmVyc2lvbikmJihiLmpRdWVyeVVJPXRoaXMud2luZG93LmpRdWVyeS51aS52ZXJzaW9uKTt0aGlzLndpbmRvdy5hbmd1bGFyJiYodGhpcy53aW5kb3cuYW5ndWxhci52ZXJzaW9uJiZ0aGlzLndpbmRvdy5hbmd1bGFyLnZlcnNpb24uZnVsbCkmJihiLmFuZ3VsYXI9dGhpcy53aW5kb3cuYW5ndWxhci52ZXJzaW9uLmZ1bGwpO2ZvcihhIGluIHRoaXMud2luZG93KWlmKFwiX3RyYWNrSnNcIiE9PWEmJlwiX3RyYWNrSlNcIiE9PWEmJlwiX3RyYWNranNcIiE9PWEmJlwid2Via2l0U3RvcmFnZUluZm9cIiE9PWEmJlwid2Via2l0SW5kZXhlZERCXCIhPT1hKXRyeXtpZih0aGlzLndpbmRvd1thXSl7dmFyIGM9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5kb3dbYV0udmVyc2lvbnx8dGhpcy53aW5kb3dbYV0uVmVyc2lvbnx8dGhpcy53aW5kb3dbYV0uVkVSU0lPTjtcInN0cmluZ1wiPT09dHlwZW9mIGMmJihiW2FdPWMpfX1jYXRjaChkKXt9cmV0dXJuIGJ9LHJlcG9ydDpmdW5jdGlvbigpe3JldHVybnthZ2U6KG5ldyBEYXRlKS5nZXRUaW1lKCktdGhpcy5sb2FkZWRPbixkZXBlbmRlbmNpZXM6dGhpcy5kaXNjb3ZlckRlcGVuZGVuY2llcygpLHVzZXJBZ2VudDp0aGlzLndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LHZpZXdwb3J0SGVpZ2h0OnRoaXMud2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsdmlld3BvcnRXaWR0aDp0aGlzLndpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh9fX07dmFyIHY9ZnVuY3Rpb24oYSl7dGhpcy51dGlsPWE7dGhpcy5hcHBlbmRlcj1bXTt0aGlzLm1heExlbmd0aD0zMH07di5wcm90b3R5cGU9e2FsbDpmdW5jdGlvbihhKXt2YXIgYj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSxjLGQ7Zm9yKGQ9MDtkPHRoaXMuYXBwZW5kZXIubGVuZ3RoO2QrKykoYz10aGlzLmFwcGVuZGVyW2RdKSYmYy5jYXRlZ29yeT09PWEmJmIucHVzaChjLnZhbHVlKTtyZXR1cm4gYn0sY2xlYXI6ZnVuY3Rpb24oKXt0aGlzLmFwcGVuZGVyLmxlbmd0aD0wfSx0cnVuY2F0ZTpmdW5jdGlvbigpe3RoaXMuYXBwZW5kZXIubGVuZ3RoPnRoaXMubWF4TGVuZ3RoJiYodGhpcy5hcHBlbmRlcj10aGlzLmFwcGVuZGVyLnNsaWNlKE1hdGgubWF4KHRoaXMuYXBwZW5kZXIubGVuZ3RoLXRoaXMubWF4TGVuZ3RoLDApKSl9LGFkZDpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMudXRpbC51dWlkKCk7dGhpcy5hcHBlbmRlci5wdXNoKHtrZXk6YyxjYXRlZ29yeTphLHZhbHVlOmJ9KTt0aGlzLnRydW5jYXRlKCk7cmV0dXJuIGN9LGdldDpmdW5jdGlvbihhLGIpe3ZhciBjLGQ7Zm9yKGQ9MDtkPHRoaXMuYXBwZW5kZXIubGVuZ3RoO2QrKylpZihjPXRoaXMuYXBwZW5kZXJbZF0sYy5jYXRlZ29yeT09PWEmJlxuICBjLmtleT09PWIpcmV0dXJuIGMudmFsdWU7cmV0dXJuITF9fTt2YXIgdz1mdW5jdGlvbihhLGIsYyxkLGUsZil7dGhpcy51dGlsPWE7dGhpcy5sb2c9Yjt0aGlzLm9uRXJyb3I9Yzt0aGlzLm9uRmF1bHQ9ZDt0aGlzLndpbmRvdz1lO3RoaXMub3B0aW9ucz1mO2YuZW5hYmxlZCYmdGhpcy5pbml0aWFsaXplKGUpfTt3LnByb3RvdHlwZT17aW5pdGlhbGl6ZTpmdW5jdGlvbihhKXthLlhNTEh0dHBSZXF1ZXN0JiZ0aGlzLnV0aWwuaGFzRnVuY3Rpb24oYS5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbixcImFwcGx5XCIpJiZ0aGlzLndhdGNoTmV0d29ya09iamVjdChhLlhNTEh0dHBSZXF1ZXN0KTthLlhEb21haW5SZXF1ZXN0JiZ0aGlzLnV0aWwuaGFzRnVuY3Rpb24oYS5YRG9tYWluUmVxdWVzdC5wcm90b3R5cGUub3BlbixcImFwcGx5XCIpJiZ0aGlzLndhdGNoTmV0d29ya09iamVjdChhLlhEb21haW5SZXF1ZXN0KX0sd2F0Y2hOZXR3b3JrT2JqZWN0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYz1hLnByb3RvdHlwZS5vcGVuLGQ9YS5wcm90b3R5cGUuc2VuZDthLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKGEsYil7MD5iLmluZGV4T2YoXCJsb2NhbGhvc3Q6MFwiKSYmKHRoaXMuX3RyYWNrSnM9e21ldGhvZDphLHVybDpifSk7cmV0dXJuIGMuYXBwbHkodGhpcyxhcmd1bWVudHMpfTthLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKCl7dHJ5e2lmKCF0aGlzLl90cmFja0pzKXJldHVybiBkLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt0aGlzLl90cmFja0pzLmxvZ0lkPWIubG9nLmFkZChcIm5cIix7c3RhcnRlZE9uOmIudXRpbC5pc29Ob3coKSxtZXRob2Q6dGhpcy5fdHJhY2tKcy5tZXRob2QsdXJsOnRoaXMuX3RyYWNrSnMudXJsfSk7Yi5saXN0ZW5Gb3JOZXR3b3JrQ29tcGxldGUodGhpcyl9Y2F0Y2goYSl7Yi5vbkZhdWx0KGEpfXJldHVybiBkLmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGF9LGxpc3RlbkZvck5ldHdvcmtDb21wbGV0ZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzO1xuICBiLndpbmRvdy5Qcm9ncmVzc0V2ZW50JiZhLmFkZEV2ZW50TGlzdGVuZXImJmEuYWRkRXZlbnRMaXN0ZW5lcihcInJlYWR5c3RhdGVjaGFuZ2VcIixmdW5jdGlvbigpezQ9PT1hLnJlYWR5U3RhdGUmJmIuZmluYWxpemVOZXR3b3JrRXZlbnQoYSl9LCEwKTthLmFkZEV2ZW50TGlzdGVuZXI/YS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7Yi5maW5hbGl6ZU5ldHdvcmtFdmVudChhKTtiLmNoZWNrTmV0d29ya0ZhdWx0KGEpfSwhMCk6c2V0VGltZW91dChmdW5jdGlvbigpe3RyeXt2YXIgYz1hLm9ubG9hZDthLm9ubG9hZD1mdW5jdGlvbigpe2IuZmluYWxpemVOZXR3b3JrRXZlbnQoYSk7Yi5jaGVja05ldHdvcmtGYXVsdChhKTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgYyYmYi51dGlsLmhhc0Z1bmN0aW9uKGMsXCJhcHBseVwiKSYmYy5hcHBseShhLGFyZ3VtZW50cyl9O3ZhciBkPWEub25lcnJvcjthLm9uZXJyb3I9ZnVuY3Rpb24oKXtiLmZpbmFsaXplTmV0d29ya0V2ZW50KGEpO1xuICAgIGIuY2hlY2tOZXR3b3JrRmF1bHQoYSk7XCJmdW5jdGlvblwiPT09dHlwZW9mIG9sZE9uRXJyb3ImJmQuYXBwbHkoYSxhcmd1bWVudHMpfX1jYXRjaChlKXtiLm9uRmF1bHQoZSl9fSwwKX0sZmluYWxpemVOZXR3b3JrRXZlbnQ6ZnVuY3Rpb24oYSl7aWYoYS5fdHJhY2tKcyl7dmFyIGI9dGhpcy5sb2cuZ2V0KFwiblwiLGEuX3RyYWNrSnMubG9nSWQpO2ImJihiLmNvbXBsZXRlZE9uPXRoaXMudXRpbC5pc29Ob3coKSxiLnN0YXR1c0NvZGU9MTIyMz09YS5zdGF0dXM/MjA0OmEuc3RhdHVzLGIuc3RhdHVzVGV4dD0xMjIzPT1hLnN0YXR1cz9cIk5vIENvbnRlbnRcIjphLnN0YXR1c1RleHQpfX0sY2hlY2tOZXR3b3JrRmF1bHQ6ZnVuY3Rpb24oYSl7aWYodGhpcy5vcHRpb25zLmVycm9yJiY0MDA8PWEuc3RhdHVzJiYxMjIzIT1hLnN0YXR1cyl7dmFyIGI9YS5fdHJhY2tKc3x8e307dGhpcy5vbkVycm9yKFwiYWpheFwiLGEuc3RhdHVzK1wiIFwiK2Euc3RhdHVzVGV4dCtcIjogXCIrYi5tZXRob2QrXCIgXCIrYi51cmwpfX0sXG4gIHJlcG9ydDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxvZy5hbGwoXCJuXCIpfX07dmFyIG49ZnVuY3Rpb24oYSl7dGhpcy51dGlsPWE7dGhpcy5kaXNhYmxlZD0hMTt0aGlzLnRocm90dGxlU3RhdHM9e2F0dGVtcHRDb3VudDowLHRocm90dGxlZENvdW50OjAsbGFzdEF0dGVtcHQ6KG5ldyBEYXRlKS5nZXRUaW1lKCl9O2guSlNPTiYmaC5KU09OLnN0cmluZ2lmeXx8KHRoaXMuZGlzYWJsZWQ9ITApfTtuLnByb3RvdHlwZT17ZXJyb3JFbmRwb2ludDpmdW5jdGlvbihhLGIpe2I9KGJ8fFwiaHR0cHM6Ly9jYXB0dXJlLnRyYWNranMuY29tL2NhcHR1cmVcIikrKFwiP3Rva2VuPVwiK2EpO3JldHVybiB0aGlzLnV0aWwuaXNCcm93c2VySUUoKT9cIi8vXCIrYi5zcGxpdChcIjovL1wiKVsxXTpifSx1c2FnZUVuZHBvaW50OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmFwcGVuZE9iamVjdEFzUXVlcnkoYSxcImh0dHBzOi8vdXNhZ2UudHJhY2tqcy5jb20vdXNhZ2UuZ2lmXCIpfSx0cmFja2VyRmF1bHRFbmRwb2ludDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5hcHBlbmRPYmplY3RBc1F1ZXJ5KGEsXG4gIFwiaHR0cHM6Ly91c2FnZS50cmFja2pzLmNvbS9mYXVsdC5naWZcIil9LGFwcGVuZE9iamVjdEFzUXVlcnk6ZnVuY3Rpb24oYSxiKXtiKz1cIj9cIjtmb3IodmFyIGMgaW4gYSlhLmhhc093blByb3BlcnR5KGMpJiYoYis9ZW5jb2RlVVJJQ29tcG9uZW50KGMpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChhW2NdKStcIiZcIik7cmV0dXJuIGJ9LGdldENPUlNSZXF1ZXN0OmZ1bmN0aW9uKGEsYil7dmFyIGM9bmV3IGguWE1MSHR0cFJlcXVlc3Q7XCJ3aXRoQ3JlZGVudGlhbHNcImluIGM/KGMub3BlbihhLGIpLGMuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwidGV4dC9wbGFpblwiKSk6XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBoLlhEb21haW5SZXF1ZXN0PyhjPW5ldyBoLlhEb21haW5SZXF1ZXN0LGMub3BlbihhLGIpKTpjPW51bGw7cmV0dXJuIGN9LHNlbmRUcmFja2VyRmF1bHQ6ZnVuY3Rpb24oYSl7dGhpcy50aHJvdHRsZShhKXx8KChuZXcgSW1hZ2UpLnNyYz10aGlzLnRyYWNrZXJGYXVsdEVuZHBvaW50KGEpKX0sXG4gIHNlbmRVc2FnZTpmdW5jdGlvbihhKXsobmV3IEltYWdlKS5zcmM9dGhpcy51c2FnZUVuZHBvaW50KGEpfSxzZW5kRXJyb3I6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO2lmKCF0aGlzLmRpc2FibGVkJiYhdGhpcy50aHJvdHRsZShhKSl0cnl7dmFyIGQ9dGhpcy5nZXRDT1JTUmVxdWVzdChcIlBPU1RcIix0aGlzLmVycm9yRW5kcG9pbnQoYikpO2Qub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ND09PWQucmVhZHlTdGF0ZSYmMjAwIT09ZC5zdGF0dXMmJihjLmRpc2FibGVkPSEwKX07ZC5fdHJhY2tKcz1rO2Quc2VuZChoLkpTT04uc3RyaW5naWZ5KGEpKX1jYXRjaChlKXt0aHJvdyB0aGlzLmRpc2FibGVkPSEwLGU7fX0sdGhyb3R0bGU6ZnVuY3Rpb24oYSl7dmFyIGI9KG5ldyBEYXRlKS5nZXRUaW1lKCk7dGhpcy50aHJvdHRsZVN0YXRzLmF0dGVtcHRDb3VudCsrO2lmKHRoaXMudGhyb3R0bGVTdGF0cy5sYXN0QXR0ZW1wdCsxRTM+PWIpe2lmKHRoaXMudGhyb3R0bGVTdGF0cy5sYXN0QXR0ZW1wdD1cbiAgICAgIGIsMTA8dGhpcy50aHJvdHRsZVN0YXRzLmF0dGVtcHRDb3VudClyZXR1cm4gdGhpcy50aHJvdHRsZVN0YXRzLnRocm90dGxlZENvdW50KyssITB9ZWxzZSBhLnRocm90dGxlZD10aGlzLnRocm90dGxlU3RhdHMudGhyb3R0bGVkQ291bnQsdGhpcy50aHJvdHRsZVN0YXRzLmF0dGVtcHRDb3VudD0wLHRoaXMudGhyb3R0bGVTdGF0cy5sYXN0QXR0ZW1wdD1iLHRoaXMudGhyb3R0bGVTdGF0cy50aHJvdHRsZWRDb3VudD0wO3JldHVybiExfX07dmFyIHg9ZnVuY3Rpb24oYSl7dGhpcy53aW5kb3c9YX07eC5wcm90b3R5cGU9e2JpbmQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShiLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfX0sY29udGFpbnM6ZnVuY3Rpb24oYSxiKXt2YXIgYztmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWlmKGFbY109PT1iKXJldHVybiEwO3JldHVybiExfSxkZWZlcjpmdW5jdGlvbihhLGIpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthLmFwcGx5KGIpfSl9LFxuICBleHRlbmQ6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGQ9MDtkPGMubGVuZ3RoO2QrKylmb3IoYiBpbiBjW2RdKW51bGw9PT1jW2RdW2JdfHxjW2RdW2JdPT09az9hW2JdPWNbZF1bYl06XCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjW2RdW2JdKT8oYVtiXT1hW2JdfHx7fSx0aGlzLmV4dGVuZChhW2JdLGNbZF1bYl0pKTphW2JdPWNbZF1bYl07cmV0dXJuIGF9LGhhc0Z1bmN0aW9uOmZ1bmN0aW9uKGEsYil7dHJ5e3JldHVybiEhYVtiXX1jYXRjaChjKXtyZXR1cm4hMX19LGlzQnJvd3NlcklFOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy53aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxiPWEubWF0Y2goL1RyaWRlbnRcXC8oW1xcZC5dKykvKTtyZXR1cm4gYiYmXCI3LjBcIj09PWJbMV0/MTE6KGE9YS5tYXRjaCgvTVNJRSAoW1xcZC5dKykvKSk/cGFyc2VJbnQoYVsxXSwxMCk6ITF9LFxuICBpc0Jyb3dzZXJTdXBwb3J0ZWQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmlzQnJvd3NlcklFKCk7cmV0dXJuIWF8fDg8PWF9LGlzb05vdzpmdW5jdGlvbigpe3ZhciBhPW5ldyBEYXRlO3JldHVybiBhLnRvSVNPU3RyaW5nP2EudG9JU09TdHJpbmcoKTphLmdldFVUQ0Z1bGxZZWFyKCkrXCItXCIrdGhpcy5wYWQoYS5nZXRVVENNb250aCgpKzEpK1wiLVwiK3RoaXMucGFkKGEuZ2V0VVRDRGF0ZSgpKStcIlRcIit0aGlzLnBhZChhLmdldFVUQ0hvdXJzKCkpK1wiOlwiK3RoaXMucGFkKGEuZ2V0VVRDTWludXRlcygpKStcIjpcIit0aGlzLnBhZChhLmdldFVUQ1NlY29uZHMoKSkrXCIuXCIrU3RyaW5nKChhLmdldFVUQ01pbGxpc2Vjb25kcygpLzFFMykudG9GaXhlZCgzKSkuc2xpY2UoMiw1KStcIlpcIn0scGFkOmZ1bmN0aW9uKGEpe2E9U3RyaW5nKGEpOzE9PT1hLmxlbmd0aCYmKGE9XCIwXCIrYSk7cmV0dXJuIGF9LHV1aWQ6ZnVuY3Rpb24oKXtyZXR1cm5cInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiLnJlcGxhY2UoL1t4eV0vZyxcbiAgICBmdW5jdGlvbihhKXt2YXIgYj0xNipNYXRoLnJhbmRvbSgpfDA7cmV0dXJuKFwieFwiPT1hP2I6YiYzfDgpLnRvU3RyaW5nKDE2KX0pfSx3cmFwRXJyb3I6ZnVuY3Rpb24oYSl7aWYoYS5pbm5lckVycm9yKXJldHVybiBhO3ZhciBiPUVycm9yKFwiVHJhY2tKUyBDYXVnaHQ6IFwiKyhhLm1lc3NhZ2V8fGEpKTtiLmRlc2NyaXB0aW9uPVwiVHJhY2tKUyBDYXVnaHQ6IFwiK2EuZGVzY3JpcHRpb247Yi5maWxlPWEuZmlsZTtiLmxpbmU9YS5saW5lfHxhLmxpbmVOdW1iZXI7Yi5jb2x1bW49YS5jb2x1bW58fGEuY29sdW1uTnVtYmVyO2Iuc3RhY2s9YS5zdGFjaztiLmlubmVyRXJyb3I9YTtyZXR1cm4gYn19O3ZhciB5PWZ1bmN0aW9uKGEsYixjLGQsZSxmKXt0aGlzLnV0aWw9YTt0aGlzLmxvZz1iO3RoaXMub25FcnJvcj1jO3RoaXMub25GYXVsdD1kO3RoaXMub3B0aW9ucz1mO3RoaXMuZG9jdW1lbnQ9ZTtmLmVuYWJsZWQmJnRoaXMuaW5pdGlhbGl6ZShlKX07eS5wcm90b3R5cGU9e2luaXRpYWxpemU6ZnVuY3Rpb24oYSl7dmFyIGI9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXRpbC5iaW5kKHRoaXMub25Eb2N1bWVudENsaWNrZWQsdGhpcyksYz10aGlzLnV0aWwuYmluZCh0aGlzLm9uSW5wdXRDaGFuZ2VkLHRoaXMpO2EuYWRkRXZlbnRMaXN0ZW5lcj8oYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixiLCEwKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsYywhMCkpOmEuYXR0YWNoRXZlbnQmJihhLmF0dGFjaEV2ZW50KFwib25jbGlja1wiLGIpLGEuYXR0YWNoRXZlbnQoXCJvbmZvY3Vzb3V0XCIsYykpfSxvbkRvY3VtZW50Q2xpY2tlZDpmdW5jdGlvbihhKXt0cnl7dmFyIGI9dGhpcy5nZXRFbGVtZW50RnJvbUV2ZW50KGEpO2ImJmIudGFnTmFtZSYmKHRoaXMuaXNEZXNjcmliZWRFbGVtZW50KGIsXCJhXCIpfHx0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFwiYnV0dG9uXCIpfHx0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFwiaW5wdXRcIixbXCJidXR0b25cIixcInN1Ym1pdFwiXSk/dGhpcy53cml0ZVZpc2l0b3JFdmVudChiLFwiY2xpY2tcIik6dGhpcy5pc0Rlc2NyaWJlZEVsZW1lbnQoYixcbiAgXCJpbnB1dFwiLFtcImNoZWNrYm94XCIsXCJyYWRpb1wiXSkmJnRoaXMud3JpdGVWaXNpdG9yRXZlbnQoYixcImlucHV0XCIsYi52YWx1ZSxiLmNoZWNrZWQpKX1jYXRjaChjKXt0aGlzLm9uRmF1bHQoYyl9fSxvbklucHV0Q2hhbmdlZDpmdW5jdGlvbihhKXt0cnl7dmFyIGI9dGhpcy5nZXRFbGVtZW50RnJvbUV2ZW50KGEpO2lmKGImJmIudGFnTmFtZSlpZih0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFwidGV4dGFyZWFcIikpdGhpcy53cml0ZVZpc2l0b3JFdmVudChiLFwiaW5wdXRcIixiLnZhbHVlKTtlbHNlIGlmKHRoaXMuaXNEZXNjcmliZWRFbGVtZW50KGIsXCJzZWxlY3RcIikmJmIub3B0aW9ucyYmYi5vcHRpb25zLmxlbmd0aCl0aGlzLm9uU2VsZWN0SW5wdXRDaGFuZ2VkKGIpO2Vsc2UgdGhpcy5pc0Rlc2NyaWJlZEVsZW1lbnQoYixcImlucHV0XCIpJiYhdGhpcy5pc0Rlc2NyaWJlZEVsZW1lbnQoYixcImlucHV0XCIsW1wiYnV0dG9uXCIsXCJzdWJtaXRcIixcImhpZGRlblwiLFwiY2hlY2tib3hcIixcInJhZGlvXCJdKSYmXG50aGlzLndyaXRlVmlzaXRvckV2ZW50KGIsXCJpbnB1dFwiLGIudmFsdWUpfWNhdGNoKGMpe3RoaXMub25GYXVsdChjKX19LG9uU2VsZWN0SW5wdXRDaGFuZ2VkOmZ1bmN0aW9uKGEpe2lmKGEubXVsdGlwbGUpZm9yKHZhciBiPTA7YjxhLm9wdGlvbnMubGVuZ3RoO2IrKylhLm9wdGlvbnNbYl0uc2VsZWN0ZWQmJnRoaXMud3JpdGVWaXNpdG9yRXZlbnQoYSxcImlucHV0XCIsYS5vcHRpb25zW2JdLnZhbHVlKTtlbHNlIDA8PWEuc2VsZWN0ZWRJbmRleCYmYS5vcHRpb25zW2Euc2VsZWN0ZWRJbmRleF0mJnRoaXMud3JpdGVWaXNpdG9yRXZlbnQoYSxcImlucHV0XCIsYS5vcHRpb25zW2Euc2VsZWN0ZWRJbmRleF0udmFsdWUpfSx3cml0ZVZpc2l0b3JFdmVudDpmdW5jdGlvbihhLGIsYyxkKXtcInBhc3N3b3JkXCI9PT10aGlzLmdldEVsZW1lbnRUeXBlKGEpJiYoYz1rKTt0aGlzLmxvZy5hZGQoXCJ2XCIse3RpbWVzdGFtcDp0aGlzLnV0aWwuaXNvTm93KCksYWN0aW9uOmIsZWxlbWVudDp7dGFnOmEudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICBhdHRyaWJ1dGVzOnRoaXMuZ2V0RWxlbWVudEF0dHJpYnV0ZXMoYSksdmFsdWU6dGhpcy5nZXRNZXRhVmFsdWUoYyxkKX19KX0sZ2V0RWxlbWVudEZyb21FdmVudDpmdW5jdGlvbihhKXtyZXR1cm4gYS50YXJnZXR8fHAuZWxlbWVudEZyb21Qb2ludChhLmNsaWVudFgsYS5jbGllbnRZKX0saXNEZXNjcmliZWRFbGVtZW50OmZ1bmN0aW9uKGEsYixjKXtpZihhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSE9PWIudG9Mb3dlckNhc2UoKSlyZXR1cm4hMTtpZighYylyZXR1cm4hMDthPXRoaXMuZ2V0RWxlbWVudFR5cGUoYSk7Zm9yKGI9MDtiPGMubGVuZ3RoO2IrKylpZihjW2JdPT09YSlyZXR1cm4hMDtyZXR1cm4hMX0sZ2V0RWxlbWVudFR5cGU6ZnVuY3Rpb24oYSl7cmV0dXJuKGEuZ2V0QXR0cmlidXRlKFwidHlwZVwiKXx8XCJcIikudG9Mb3dlckNhc2UoKX0sZ2V0RWxlbWVudEF0dHJpYnV0ZXM6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXt9LGM9MDtjPGEuYXR0cmlidXRlcy5sZW5ndGg7YysrKVwidmFsdWVcIiE9PVxuYS5hdHRyaWJ1dGVzW2NdLm5hbWUudG9Mb3dlckNhc2UoKSYmKGJbYS5hdHRyaWJ1dGVzW2NdLm5hbWVdPWEuYXR0cmlidXRlc1tjXS52YWx1ZSk7cmV0dXJuIGJ9LGdldE1ldGFWYWx1ZTpmdW5jdGlvbihhLGIpe3JldHVybiBhPT09az9rOntsZW5ndGg6YS5sZW5ndGgscGF0dGVybjp0aGlzLm1hdGNoSW5wdXRQYXR0ZXJuKGEpLGNoZWNrZWQ6Yn19LG1hdGNoSW5wdXRQYXR0ZXJuOmZ1bmN0aW9uKGEpe3JldHVyblwiXCI9PT1hP1wiZW1wdHlcIjovXlthLXowLTkhIyQlJicqKz0/Xl9ge3x9fi1dKyg/OlxcLlthLXowLTkhIyQlJicqKz0/Xl9ge3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT8kLy50ZXN0KGEpP1wiZW1haWxcIjovXigwP1sxLTldfFsxMl1bMC05XXwzWzAxXSlbXFwvXFwtXSgwP1sxLTldfDFbMDEyXSlbXFwvXFwtXVxcZHs0fSQvLnRlc3QoYSl8fC9eKFxcZHs0fVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdChhKT9cbiAgXCJkYXRlXCI6L14oPzooPzpcXCs/MVxccyooPzpbLi1dXFxzKik/KT8oPzpcXChcXHMqKFsyLTldMVswMi05XXxbMi05XVswMi04XTF8WzItOV1bMDItOF1bMDItOV0pXFxzKlxcKXwoWzItOV0xWzAyLTldfFsyLTldWzAyLThdMXxbMi05XVswMi04XVswMi05XSkpXFxzKig/OlsuLV1cXHMqKT8pPyhbMi05XTFbMDItOV18WzItOV1bMDItOV0xfFsyLTldWzAyLTldezJ9KVxccyooPzpbLi1dXFxzKik/KFswLTldezR9KSg/OlxccyooPzojfHhcXC4/fGV4dFxcLj98ZXh0ZW5zaW9uKVxccyooXFxkKykpPyQvLnRlc3QoYSk/XCJ1c3Bob25lXCI6L15cXHMqJC8udGVzdChhKT9cIndoaXRlc3BhY2VcIjovXlxcZCokLy50ZXN0KGEpP1wibnVtZXJpY1wiOi9eW2EtekEtWl0qJC8udGVzdChhKT9cImFscGhhXCI6L15bYS16QS1aMC05XSokLy50ZXN0KGEpP1wiYWxwaGFudW1lcmljXCI6XCJjaGFyYWN0ZXJzXCJ9LHJlcG9ydDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxvZy5hbGwoXCJ2XCIpfX07dmFyIHo9ZnVuY3Rpb24oYSxiLGMsZCxlKXt0aGlzLm9uRXJyb3I9XG4gIGE7dGhpcy5vbkZhdWx0PWI7dGhpcy5zZXJpYWxpemU9YztlLmVuYWJsZWQmJnRoaXMud2F0Y2hXaW5kb3dFcnJvcnMoZCl9O3oucHJvdG90eXBlPXt3YXRjaFdpbmRvd0Vycm9yczpmdW5jdGlvbihhKXt2YXIgYj10aGlzO2Eub25lcnJvcj1mdW5jdGlvbihhLGQsZSxmLGcpe3RyeXtnPWd8fHt9LGcubWVzc2FnZT1nLm1lc3NhZ2V8fGIuc2VyaWFsaXplKGEpLGcuZmlsZT1nLmZpbGV8fGIuc2VyaWFsaXplKGQpLGcubGluZT1nLmxpbmV8fHBhcnNlSW50KGUsMTApfHxudWxsLGcuY29sdW1uPWcuY29sdW1ufHxwYXJzZUludChmLDEwKXx8bnVsbCxiLm9uRXJyb3IoXCJ3aW5kb3dcIixnKX1jYXRjaChoKXtiLm9uRmF1bHQoaCl9fX19O3ZhciBBPWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcsaCxrLGwsbSxuLHAsdCxxLHIpe3RyeXt0aGlzLndpbmRvdz1xLHRoaXMuZG9jdW1lbnQ9cix0aGlzLnV0aWw9bmV3IG0odGhpcy53aW5kb3cpLHRoaXMub25FcnJvcj10aGlzLnV0aWwuYmluZCh0aGlzLm9uRXJyb3IsXG4gIHRoaXMpLHRoaXMub25GYXVsdD10aGlzLnV0aWwuYmluZCh0aGlzLm9uRmF1bHQsdGhpcyksdGhpcy5zZXJpYWxpemU9dGhpcy51dGlsLmJpbmQodGhpcy5zZXJpYWxpemUsdGhpcyksdGhpcy50cmFuc21pdHRlcj1uZXcgbCh0aGlzLnV0aWwpLHRoaXMuY29uZmlnPW5ldyBkKHRoaXMudXRpbCxhKSx0aGlzLmxvZz1uZXcgaCh0aGlzLnV0aWwpLHRoaXMuYXBpPW5ldyBiKHRoaXMuY29uZmlnLHRoaXMudXRpbCx0aGlzLm9uRXJyb3IpLHRoaXMuZW52aXJvbm1lbnQ9bmV3IGcodGhpcy53aW5kb3cpLHRoaXMuY3VzdG9tZXI9bmV3IGYodGhpcy5jb25maWcsdGhpcy51dGlsLHRoaXMubG9nLHRoaXMud2luZG93LHRoaXMuZG9jdW1lbnQpLHRoaXMuY3VzdG9tZXIudG9rZW4mJih0aGlzLmNvbmZpZy5jdXJyZW50LmVuYWJsZWQmJnRoaXMudHJhbnNtaXR0ZXIuc2VuZFVzYWdlKHt0b2tlbjp0aGlzLmN1c3RvbWVyLnRva2VuLGNvcnJlbGF0aW9uSWQ6dGhpcy5jdXN0b21lci5jb3JyZWxhdGlvbklkLFxuICBhcHBsaWNhdGlvbjp0aGlzLmNvbmZpZy5jdXJyZW50LmFwcGxpY2F0aW9uLHg6dGhpcy51dGlsLnV1aWQoKX0pLHRoaXMuYXBpQ29uc29sZVdhdGNoZXI9bmV3IGUodGhpcy51dGlsLHRoaXMubG9nLHRoaXMub25FcnJvcix0aGlzLm9uRmF1bHQsdGhpcy5zZXJpYWxpemUsdGhpcy5hcGksdGhpcy5jb25maWcuZGVmYXVsdHMuY29uc29sZSksdGhpcy53aW5kb3dDb25zb2xlV2F0Y2hlcj1uZXcgZSh0aGlzLnV0aWwsdGhpcy5sb2csdGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLnNlcmlhbGl6ZSx0aGlzLndpbmRvdyx0aGlzLmNvbmZpZy5jdXJyZW50LmNvbnNvbGUpLHRoaXMudXRpbC5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSYmdGhpcy5jb25maWcuY3VycmVudC5lbmFibGVkJiYodGhpcy5jYWxsYmFja1dhdGNoZXI9bmV3IGModGhpcy51dGlsLHRoaXMub25FcnJvcix0aGlzLm9uRmF1bHQsdGhpcy53aW5kb3csdGhpcy5jb25maWcuY3VycmVudC5jYWxsYmFjayksdGhpcy52aXNpdG9yV2F0Y2hlcj1cbiAgbmV3IG4odGhpcy51dGlsLHRoaXMubG9nLHRoaXMub25FcnJvcix0aGlzLm9uRmF1bHQsdGhpcy5kb2N1bWVudCx0aGlzLmNvbmZpZy5jdXJyZW50LnZpc2l0b3IpLHRoaXMubmV0d29ya1dhdGNoZXI9bmV3IGsodGhpcy51dGlsLHRoaXMubG9nLHRoaXMub25FcnJvcix0aGlzLm9uRmF1bHQsdGhpcy53aW5kb3csdGhpcy5jb25maWcuY3VycmVudC5uZXR3b3JrKSx0aGlzLndpbmRvd1dhdGNoZXI9bmV3IHAodGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLnNlcmlhbGl6ZSx0aGlzLndpbmRvdyx0aGlzLmNvbmZpZy5jdXJyZW50LndpbmRvdykpKX1jYXRjaChzKXt0aGlzLm9uRmF1bHQocyl9fTtBLnByb3RvdHlwZT17cmV2ZWFsOmZ1bmN0aW9uKCl7aWYodGhpcy5jdXN0b21lci50b2tlbilyZXR1cm4gdGhpcy5hcGk7dGhpcy53aW5kb3cuY29uc29sZSYmdGhpcy53aW5kb3cuY29uc29sZS53YXJuJiZ0aGlzLndpbmRvdy5jb25zb2xlLndhcm4oXCJUcmFja0pTIGNvdWxkIG5vdCBmaW5kIGEgdG9rZW5cIik7XG4gIHJldHVybiBrfSxvbkVycm9yOmZ1bmN0aW9uKGEsYixjKXtpZih0aGlzLnV0aWwuaXNCcm93c2VyU3VwcG9ydGVkKCkmJnRoaXMuY29uZmlnLmN1cnJlbnQuZW5hYmxlZCl0cnl7Yj1ifHx7fTtjPWN8fHtiaW5kU3RhY2s6bnVsbCxiaW5kVGltZTpudWxsLGZvcmNlOiExfTt2YXIgZD1iLm1lc3NhZ2V8fGI7aWYoIWR8fCFkLmluZGV4T2Z8fC0xPT09ZC5pbmRleE9mKFwiVHJhY2tKUyBDYXVnaHRcIikpe3ZhciBlPXRoaXMudXRpbC5leHRlbmQoe30se2JpbmRTdGFjazpjLmJpbmRTdGFjayxiaW5kVGltZTpjLmJpbmRUaW1lLGNvbHVtbjpiLmNvbHVtbnx8Yi5jb2x1bW5OdW1iZXIsY29uc29sZTp0aGlzLndpbmRvd0NvbnNvbGVXYXRjaGVyLnJlcG9ydCgpLGN1c3RvbWVyOnRoaXMuY3VzdG9tZXIucmVwb3J0KCksZW50cnk6YSxlbnZpcm9ubWVudDp0aGlzLmVudmlyb25tZW50LnJlcG9ydCgpLGZpbGU6Yi5maWxlfHxiLmZpbGVOYW1lLGxpbmU6Yi5saW5lfHxiLmxpbmVOdW1iZXIsbWVzc2FnZTpjLmZvcmNlP1xuICBkOnRoaXMuc2VyaWFsaXplKGQpLG5ldHdvcms6dGhpcy5uZXR3b3JrV2F0Y2hlci5yZXBvcnQoKSx1cmw6KGgubG9jYXRpb258fFwiXCIpLnRvU3RyaW5nKCksc3RhY2s6Yi5zdGFjayx0aW1lc3RhbXA6dGhpcy51dGlsLmlzb05vdygpLHZpc2l0b3I6dGhpcy52aXNpdG9yV2F0Y2hlci5yZXBvcnQoKSx2ZXJzaW9uOlwiMi4xLjlcIn0pO2lmKCFjLmZvcmNlKXRyeXtpZighdGhpcy5jb25maWcuY3VycmVudC5vbkVycm9yKGUsYikpcmV0dXJufWNhdGNoKGYpe2UuY29uc29sZS5wdXNoKHt0aW1lc3RhbXA6dGhpcy51dGlsLmlzb05vdygpLHNldmVyaXR5OlwiZXJyb3JcIixtZXNzYWdlOmYubWVzc2FnZX0pO3ZhciBnPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe2cub25FcnJvcihcImNhdGNoXCIsZix7Zm9yY2U6ITB9KX0sMCl9dGhpcy5sb2cuY2xlYXIoKTt0aGlzLnRyYW5zbWl0dGVyLnNlbmRFcnJvcihlLHRoaXMuY3VzdG9tZXIudG9rZW4pfX1jYXRjaChrKXtjb25zb2xlLmxvZyhrKSx0aGlzLm9uRmF1bHQoayl9fSxcbiAgb25GYXVsdDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLnRyYW5zbWl0dGVyfHxuZXcgbjthPWF8fHt9O2E9e3Rva2VuOnRoaXMuY3VzdG9tZXIudG9rZW4sZmlsZTphLmZpbGV8fGEuZmlsZU5hbWUsbXNnOmEubWVzc2FnZXx8XCJ1bmtub3duXCIsc3RhY2s6KGEuc3RhY2t8fFwidW5rbm93blwiKS5zdWJzdHIoMCw1MDApLHVybDp0aGlzLndpbmRvdy5sb2NhdGlvbix2OlwiMi4xLjlcIix4OnRoaXMudXRpbC51dWlkKCl9O2Iuc2VuZFRyYWNrZXJGYXVsdChhKX0sc2VyaWFsaXplOmZ1bmN0aW9uKGEpe2lmKHRoaXMuY29uZmlnJiZ0aGlzLmNvbmZpZy5jdXJyZW50JiZ0aGlzLmNvbmZpZy5jdXJyZW50LnNlcmlhbGl6ZSl0cnl7cmV0dXJuIHRoaXMuY29uZmlnLmN1cnJlbnQuc2VyaWFsaXplKGEpfWNhdGNoKGIpe3JldHVybiB0aGlzLm9uRXJyb3IoXCJjYXRjaFwiLGIse2ZvcmNlOiEwfSksdGhpcy51dGlsJiZ0aGlzLnV0aWwuaGFzRnVuY3Rpb24oYSxcInRvU3RyaW5nXCIpP2EudG9TdHJpbmcoKTpcInVua25vd25cIn19fTtcbiAgbD1uZXcgQShoLl90cmFja0pzfHxoLl90cmFja0pTfHxoLl90cmFja2pzfHx7fSxmdW5jdGlvbihhLGIsYyl7cmV0dXJue2F0dGVtcHQ6ZnVuY3Rpb24oYSxlKXt0cnl7dmFyIGY9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDIpO3JldHVybiBhLmFwcGx5KGV8fHRoaXMsZil9Y2F0Y2goZyl7dGhyb3cgYyhcImNhdGNoXCIsZyksYi53cmFwRXJyb3IoZyk7fX0sY29uZmlndXJlOmZ1bmN0aW9uKGIpe3JldHVybiBhLnNldEN1cnJlbnQoYil9LHRyYWNrOmZ1bmN0aW9uKGEpe2E9YXx8e307aWYoIWEuc3RhY2spdHJ5e3Rocm93IEVycm9yKGEpO31jYXRjaChiKXthPWJ9YyhcImRpcmVjdFwiLGEpfSx3YXRjaDpmdW5jdGlvbihhLGUpe3JldHVybiBmdW5jdGlvbigpe3RyeXt2YXIgZj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMCk7cmV0dXJuIGEuYXBwbHkoZXx8dGhpcyxmKX1jYXRjaChnKXt0aHJvdyBjKFwiY2F0Y2hcIixnKSxiLndyYXBFcnJvcihnKTtcbiAgfX19LHdhdGNoQWxsOmZ1bmN0aW9uKGEpe3ZhciBlPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxmO2ZvcihmIGluIGEpXCJmdW5jdGlvblwiPT09dHlwZW9mIGFbZl0mJihiLmNvbnRhaW5zKGUsZil8fGZ1bmN0aW9uKCl7dmFyIGU9YVtmXTthW2ZdPWZ1bmN0aW9uKCl7dHJ5e3ZhciBhPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywwKTtyZXR1cm4gZS5hcHBseSh0aGlzLGEpfWNhdGNoKGQpe3Rocm93IGMoXCJjYXRjaFwiLGQpLGIud3JhcEVycm9yKGQpO319fSgpKTtyZXR1cm4gYX0sdmVyc2lvbjpcIjIuMS45XCJ9fSxsLHQscSxyLHMsdix3LG4seCx5LHosbSxoLHApO2gudHJhY2tKcz1sLnJldmVhbCgpfX0pKHdpbmRvdyxkb2N1bWVudCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC90cmFja0pzLmpzXG4gKiovIiwidmFyIGlmcmFtZVJlc2l6ZSA9IHJlcXVpcmUoJy4vaWZyYW1lUmVzaXplJyk7XG52YXIgdGhyb3R0bGUgPSByZXF1aXJlKCdsaWIvdGhyb3R0bGUnKTtcbi8vIHRyYWNrIHJlc2l6ZWQgaWZyYW1lcyBpbiB3aW5kb3cub25yZXNpemVcblxudmFyIG9uUmVzaXplUXVldWUgPSBbXTtcblxuZXhwb3J0cy5pZnJhbWUgPSBmdW5jdGlvbihpZnJhbWUpIHtcblxuICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgaWZyYW1lUmVzaXplLmFzeW5jKGlmcmFtZSwgZnVuY3Rpb24oZXJyLCBoZWlnaHQpIHtcbiAgICAgIGlmIChlcnIpIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIGlmIChoZWlnaHQpIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzaXplKCk7XG59O1xuXG5leHBvcnRzLmNvZGVUYWJzID0gZnVuY3Rpb24oaWZyYW1lKSB7XG4gIGZ1bmN0aW9uIGhpZGVTaG93QXJyb3dzKCkge1xuXG4gICAgLy8gYWRkIGFycm93cyBpZiBuZWVkZWRcbiAgICB2YXIgZWxlbSA9IGlmcmFtZS5jbG9zZXN0KCcuY29kZS10YWJzJyk7XG4gICAgdmFyIGNvbnRlbnRFbGVtID0gaWZyYW1lLmNsb3Nlc3QoJ1tkYXRhLWNvZGUtdGFicy1jb250ZW50XScpO1xuICAgIHZhciBzd2l0Y2hlc0VsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1zd2l0Y2hlc10nKTtcbiAgICB2YXIgc3dpdGNoZXNFbGVtSXRlbXMgPSBzd2l0Y2hlc0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBpZiAoc3dpdGNoZXNFbGVtSXRlbXMub2Zmc2V0V2lkdGggPiBzd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnY29kZS10YWJzX3Njcm9sbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvZGUtdGFic19zY3JvbGwnKTtcbiAgICB9XG5cbiAgfVxuXG4gIGhpZGVTaG93QXJyb3dzKCk7XG4gIG9uUmVzaXplUXVldWUucHVzaChoaWRlU2hvd0Fycm93cyk7XG59O1xuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlKGZ1bmN0aW9uKCkge1xuICBvblJlc2l6ZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24ob25SZXNpemUpIHtcbiAgICBvblJlc2l6ZSgpO1xuICB9KTtcbn0sIDIwMCkpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9yZXNpemVPbmxvYWQvaW5kZXguanNcbiAqKi8iLCJyZXF1aXJlKCcuL2RvbScpO1xuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBGb3IgbmV3IG5vdGlmaWNhdGlvbiB0eXBlcyBleHRlbmQgTm90aWZpY2F0aW9uXG4gKi9cblxudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0cmFuc2xhdGVZIHBvc2l0aW9ucyB3aGVuIG5vdGlmaWNhdGlvbnMgYXJlIGFkZGVkL3JlbW92ZWRcbiAqL1xuY2xhc3MgTm90aWZpY2F0aW9uTWFuYWdlciB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XG4gICAgdGhpcy52ZXJ0aWNhbFNwYWNlID0gb3B0aW9ucy52ZXJ0aWNhbFNwYWNlIHx8IDg7XG4gIH1cblxuICByZWdpc3Rlcihub3RpZmljYXRpb24pIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMudW5zaGlmdChub3RpZmljYXRpb24pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWNhbGN1bGF0ZSgpLCAyMCk7XG4gIH1cblxuICB1bnJlZ2lzdGVyKG5vdGlmaWNhdGlvbikge1xuICAgIHZhciBpZHggPSB0aGlzLm5vdGlmaWNhdGlvbnMuaW5kZXhPZihub3RpZmljYXRpb24pO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gIH1cblxuICByZWNhbGN1bGF0ZSgpIHtcbiAgICB2YXIgdG9wID0gdGhpcy52ZXJ0aWNhbFNwYWNlO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucy5mb3JFYWNoKG5vdGlmaWNhdGlvbiA9PiB7XG4gICAgICBub3RpZmljYXRpb24udG9wID0gdG9wO1xuICAgICAgdG9wICs9IG5vdGlmaWNhdGlvbi5oZWlnaHQgKyB0aGlzLnZlcnRpY2FsU3BhY2U7XG4gICAgfSk7XG4gIH1cblxufVxuXG52YXIgbWFuYWdlcjtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBtYW5hZ2VyID0gbmV3IE5vdGlmaWNhdGlvbk1hbmFnZXIob3B0aW9ucyk7XG59O1xuXG5cbmNsYXNzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCwgdHlwZSwgdGltZW91dCkge1xuICAgIHZhciBlbGVtSHRtbCA9IGA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uIG5vdGlmaWNhdGlvbl9wb3B1cCBub3RpZmljYXRpb25fJHt0eXBlfVwiPlxuICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25fX2NvbnRlbnRcIj4ke2h0bWx9PC9kaXY+XG4gICAgPGJ1dHRvbiB0aXRsZT1cItCX0LDQutGA0YvRgtGMXCIgY2xhc3M9XCJub3RpZmljYXRpb25fX2Nsb3NlXCI+PC9idXR0b24+PC9kaXY+YDtcblxuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlRW5kXCIsIGVsZW1IdG1sKTtcblxuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmJvZHkubGFzdEVsZW1lbnRDaGlsZDtcblxuICAgIHN3aXRjaCh0aW1lb3V0KSB7XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLlRJTUVPVVRfREVGQVVMVDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Nsb3cnOlxuICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5USU1FT1VUX1NMT1c7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmYXN0JzpcbiAgICAgIHRoaXMudGltZW91dCA9IHRoaXMuVElNRU9VVF9GQVNUO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG5cbiAgICBtYW5hZ2VyLnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuc2V0dXBDbG9zZUhhbmRsZXIoKTtcbiAgICB0aGlzLnNldHVwQ2xvc2VUaW1lb3V0KCk7XG4gIH1cblxuICBnZXQgVElNRU9VVF9ERUZBVUxUKCkge1xuICAgIHJldHVybiAyNTAwO1xuICB9XG5cbiAgZ2V0IFRJTUVPVVRfU0xPVygpIHtcbiAgICByZXR1cm4gNTAwMDtcbiAgfVxuXG4gIGdldCBUSU1FT1VUX0ZBU1QoKSB7XG4gICAgcmV0dXJuIDE1MDA7XG4gIH1cblxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5lbGVtLnBhcmVudE5vZGUpIHJldHVybjsgLy8gYWxyZWFkeSBjbG9zZWQgKGJ5IHVzZXIgY2xpY2s/KVxuICAgIHRoaXMuZWxlbS5yZW1vdmUoKTtcbiAgICBtYW5hZ2VyLnVucmVnaXN0ZXIodGhpcyk7XG4gIH1cblxuICBzZXR1cENsb3NlSGFuZGxlcigpIHtcbiAgICB0aGlzLmRlbGVnYXRlKCcubm90aWZpY2F0aW9uX19jbG9zZScsICdjbGljaycsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICBzZXR1cENsb3NlVGltZW91dCgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy50aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmVsZW0ub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgc2V0IHRvcCh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgnICsgdmFsdWUgKyAncHgpJztcbiAgfVxuXG59XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oTm90aWZpY2F0aW9uLnByb3RvdHlwZSk7XG5cblxuY2xhc3MgSW5mbyBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICdpbmZvJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLkluZm8gPSBJbmZvO1xuXG5jbGFzcyBXYXJuaW5nIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ3dhcm5pbmcnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuV2FybmluZyA9IFdhcm5pbmc7XG5cbmNsYXNzIFN1Y2Nlc3MgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnc3VjY2VzcycpO1xuICB9XG5cbn1cblxuZXhwb3J0cy5TdWNjZXNzID0gU3VjY2VzcztcblxuZXhwb3J0IGNsYXNzIEVycm9yIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ2Vycm9yJyk7XG4gIH1cblxuXG4gIGdldCBUSU1FT1VUX0RFRkFVTFQoKSB7XG4gICAgcmV0dXJuIDUwMDA7XG4gIH1cblxuXG59XG5cbmV4cG9ydHMuRXJyb3IgPSBFcnJvcjtcblxuZXhwb3J0IGNsYXNzIFRlc3QgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnZXJyb3InKTtcbiAgfVxuXG5cbiAgZ2V0IFRJTUVPVVRfREVGQVVMVCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG5cbn1cblxuZXhwb3J0cy5UZXN0ID0gVGVzdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L25vdGlmaWNhdGlvbi9pbmRleC5qc1xuICoqLyIsIlxuZnVuY3Rpb24gZmluZERlbGVnYXRlVGFyZ2V0KGV2ZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY3VycmVudE5vZGUgPSBldmVudC50YXJnZXQ7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSkge1xuICAgIGlmIChjdXJyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50Tm9kZSA9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBkZWxlZ2F0ZSh0YWJsZSwgJ3RoJywgY2xpY2ssIGhhbmRsZXIpXG4vLyB0YWJsZVxuLy8gICB0aGVhZFxuLy8gICAgIHRoICAgICAgICAgXipcbi8vICAgICAgIGNvZGUgIDwtLVxuZnVuY3Rpb24gZGVsZWdhdGUodG9wRWxlbWVudCwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xuICAvKiBqc2hpbnQgLVcwNDAgKi9cbiAgdG9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZm91bmQgPSBmaW5kRGVsZWdhdGVUYXJnZXQoZXZlbnQsIHNlbGVjdG9yKTtcblxuICAgIC8vIC5jdXJyZW50VGFyZ2V0IGlzIHJlYWQgb25seSwgSSBjYW4gbm90IG92ZXJ3cml0ZSBpdCB0byB0aGUgXCJmb3VuZFwiIGVsZW1lbnRcbiAgICAvLyBPYmplY3QuY3JlYXRlIHdyYXBwZXIgd291bGQgYnJlYWsgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIC8vIHNvLCBrZWVwIGluIG1pbmQ6XG4gICAgLy8gLS0+IGV2ZW50LmN1cnJlbnRUYXJnZXQgaXMgYWx3YXlzIHRoZSB0b3AtbGV2ZWwgKGRlbGVnYXRpbmcpIGVsZW1lbnQhXG4gICAgLy8gdXNlIFwidGhpc1wiIHRvIGdldCB0aGUgZm91bmQgdGFyZ2V0XG5cbiAgICBldmVudC5kZWxlZ2F0ZVRhcmdldCA9IGZvdW5kOyAvLyB1c2UgaW5zdGVhZCBvZiBcInRoaXNcIiBpbiBvYmplY3QgbWV0aG9kc1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICAvLyBpZiBpbiBjb250ZXh0IG9mIG9iamVjdCwgdXNlIG9iamVjdCBhcyB0aGlzLFxuICAgICAgaGFuZGxlci5jYWxsKGNvbnRleHQgfHwgdGhpcywgZXZlbnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgb2JqLmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGRlbGVnYXRlKHRoaXMuZWxlbSwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgdGhpcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGVnYXRlO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kZWxlZ2F0ZS5qc1xuICoqLyIsIi8vIFVzYWdlOlxuLy8gIDEpIG5ldyBTcGlubmVyKHsgZWxlbTogZWxlbX0pIC0+IHN0YXJ0L3N0b3AoKVxuLy8gIDIpIG5ldyBTcGlubmVyKCkgLT4gc29tZXdoZXJlLmFwcGVuZChzcGlubmVyLmVsZW0pIC0+IHN0YXJ0L3N0b3BcbmZ1bmN0aW9uIFNwaW5uZXIob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5lbGVtID0gb3B0aW9ucy5lbGVtO1xuXG4gIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZSB8fCAnbWVkaXVtJztcbiAgLy8gYW55IGNsYXNzIHRvIGFkZCB0byBzcGlubmVyIChtYWtlIHNwaW5uZXIgc3BlY2lhbCBoZXJlKVxuICB0aGlzLmNsYXNzID0gb3B0aW9ucy5jbGFzcyA/ICgnICcgKyBvcHRpb25zLmNsYXNzKSA6ICcnO1xuXG4gIC8vIGFueSBjbGFzcyB0byBhZGQgdG8gZWxlbWVudCAodG8gaGlkZSBpdCdzIGNvbnRlbnQgZm9yIGluc3RhbmNlKVxuICB0aGlzLmVsZW1DbGFzcyA9IG9wdGlvbnMuZWxlbUNsYXNzO1xuXG4gIGlmICh0aGlzLnNpemUgIT0gJ21lZGl1bScgJiYgdGhpcy5zaXplICE9ICdzbWFsbCcgJiYgdGhpcy5zaXplICE9ICdsYXJnZScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBzaXplOiBcIiArIHRoaXMuc2l6ZSk7XG4gIH1cblxuICBpZiAoIXRoaXMuZWxlbSkge1xuICAgIHRoaXMuZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG59XG5cblNwaW5uZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmVsZW1DbGFzcykge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuZWxlbUNsYXNzKTtcbiAgfVxuXG4gIHRoaXMuZWxlbS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8c3BhbiBjbGFzcz1cInNwaW5uZXIgc3Bpbm5lcl9hY3RpdmUgc3Bpbm5lcl8nICsgdGhpcy5zaXplICsgdGhpcy5jbGFzcyArICdcIj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfMVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfMlwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInNwaW5uZXJfX2RvdCBzcGlubmVyX19kb3RfM1wiPjwvc3Bhbj48L3NwYW4+Jyk7XG59O1xuXG5TcGlubmVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzcGlubmVyRWxlbSA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lcicpO1xuICBpZiAoIXNwaW5uZXJFbGVtKSByZXR1cm47IC8vIGFscmVhZHkgc3RvcHBlZCBvciBuZXZlciBzdGFydGVkXG5cbiAgc3Bpbm5lckVsZW0ucmVtb3ZlKCk7XG5cbiAgaWYgKHRoaXMuZWxlbUNsYXNzKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC50b2dnbGUodGhpcy5lbGVtQ2xhc3MpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwaW5uZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9zcGlubmVyLmpzXG4gKiovIiwiZnVuY3Rpb24gb25Td2lwZShlbGVtLCBvcHRpb25zKSB7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHN0YXJ0WCxcbiAgICAgIHN0YXJ0WSxcbiAgICAgIGRpc3QsXG4gICAgICBvblJpZ2h0ID0gb3B0aW9ucy5vblJpZ2h0IHx8IGZ1bmN0aW9uKCkge30sXG4gICAgICBvbkxlZnQgPSBvcHRpb25zLm9uTGVmdCB8fCBmdW5jdGlvbigpe30sXG4gICAgICB0b2xlcmFuY2UgPSBvcHRpb25zLnRvbGVyYW5jZSB8fCAxMDAsIC8vIG1heGltdW0gdmVydGljYWwgZGlzdGFuY2VcbiAgICAgIHRocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8IDE1MCwgLy9yZXF1aXJlZCBtaW4gZGlzdGFuY2UgdHJhdmVsZWQgdG8gYmUgY29uc2lkZXJlZCBzd2lwZVxuICAgICAgYWxsb3dlZFRpbWUgPSBvcHRpb25zLmFsbG93ZWRUaW1lIHx8IDUwMCwgLy8gbWF4aW11bSB0aW1lIGFsbG93ZWQgdG8gdHJhdmVsIHRoYXQgZGlzdGFuY2VcbiAgICAgIGVsYXBzZWRUaW1lLFxuICAgICAgc3RhcnRUaW1lO1xuXG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIGRpc3QgPSAwO1xuICAgIHN0YXJ0WCA9IHRvdWNob2JqLnBhZ2VYO1xuICAgIHN0YXJ0WSA9IHRvdWNob2JqLnBhZ2VZO1xuICAgIC8vY29uc29sZS5sb2coXCJzdGFydFwiLCBzdGFydFgsIHN0YXJ0WSk7XG4gICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTsgLy8gcmVjb3JkIHRpbWUgd2hlbiBmaW5nZXIgZmlyc3QgbWFrZXMgY29udGFjdCB3aXRoIHN1cmZhY2VcbiAgfSwgZmFsc2UpO1xuXG4gIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICBkaXN0ID0gdG91Y2hvYmoucGFnZVggLSBzdGFydFg7IC8vIGdldCB0b3RhbCBkaXN0IHRyYXZlbGVkIGJ5IGZpbmdlciB3aGlsZSBpbiBjb250YWN0IHdpdGggc3VyZmFjZVxuICAgIGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTsgLy8gZ2V0IHRpbWUgZWxhcHNlZFxuXG4gICAgLy9jb25zb2xlLmxvZyhcImVuZFwiLCB0b3VjaG9iai5wYWdlWCwgdG91Y2hvYmoucGFnZVkpO1xuXG4gICAgLy8gdG9vIG11Y2ggdXAvZG93blxuICAgIGlmIChNYXRoLmFicyh0b3VjaG9iai5wYWdlWSAtIHN0YXJ0WSkgPiB0b2xlcmFuY2UpIHJldHVybjtcblxuICAgIC8vY29uc29sZS5sb2coXCJ0aW1lXCIsIGVsYXBzZWRUaW1lLCBhbGxvd2VkVGltZSk7XG5cbiAgICAvLyB0b28gc2xvd1xuICAgIGlmIChlbGFwc2VkVGltZSA+IGFsbG93ZWRUaW1lKSByZXR1cm47XG5cbiAgICAvL2NvbnNvbGUubG9nKFwidGhyZXNob2xkXCIsIGRpc3QsIHRocmVzaG9sZCk7XG5cbiAgICBpZiAoZGlzdCA+IHRocmVzaG9sZCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcInJpZ2h0XCIpO1xuICAgICAgb25SaWdodChlKTtcbiAgICB9XG5cbiAgICBpZiAoZGlzdCA8IC10aHJlc2hvbGQpIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJsZWZ0XCIpO1xuICAgICAgb25MZWZ0KGUpO1xuICAgIH1cbiAgfSwgZmFsc2UpXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvblN3aXBlO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvb25Td2lwZS5qc1xuICoqLyIsInZhciBnZXREb2N1bWVudEhlaWdodCA9IHJlcXVpcmUoJ2NsaWVudC9kb20vZ2V0RG9jdW1lbnRIZWlnaHQnKTtcblxuZnVuY3Rpb24gaWZyYW1lUmVzaXplKGlmckVsZW0sIGNhbGxiYWNrKSB7XG5cblxuICB2YXIgdGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAvLyBkZWZhdWx0IGhlaWdodFxuICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuICB9LCA1MDApO1xuXG4gIGZ1bmN0aW9uIGRvbmUoZXJyLCBoZWlnaHQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKTtcblxuICAgIGNhbGxiYWNrKGVyciwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8vIHRocm93IHJpZ2h0IG5vdyBpZiBjcm9zcy1kb21haW5cbiAgdHJ5IHtcbiAgICAvKiBqc2hpbnQgLVcwMzAgKi9cbiAgICAoaWZyRWxlbS5jb250ZW50RG9jdW1lbnQgfHwgaWZyRWxlbS5jb250ZW50V2luZG93LmRvY3VtZW50KS5ib2R5O1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4oaWZyRWxlbSwgZG9uZSk7XG4gIH1cblxuXG4gIC8vIEhJTlQ6IEkgc2hvdWxuZCd0IG1vdmUgaWZyYW1lIGluIERPTSwgYmVjYXVzZSBpdCB3aWxsIHJlbG9hZCBpdCdzIGNvbnRlbnRzIHdoZW4gYXBwZW5kZWQvaW5zZXJ0ZWQgYW55d2hlcmUhXG4gIC8vIHNvIEkgY3JlYXRlIGEgY2xvbmUgYW5kIHdvcmsgb24gaXRcbiAgaWYgKCFpZnJFbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgLy8gY2xvbmUgaWZyYW1lIGF0IGFub3RoZXIgcGxhY2UgdG8gc2VlIHRoZSBzaXplXG4gICAgdmFyIGNsb25lSWZyYW1lID0gaWZyRWxlbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgY2xvbmVJZnJhbWUubmFtZSA9IFwiXCI7XG5cbiAgICBjbG9uZUlmcmFtZS5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgY2xvbmVJZnJhbWUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNsb25lSWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGNsb25lSWZyYW1lLnN0eWxlLnRvcCA9ICcxMDAwMHB4JztcblxuICAgIGNsb25lSWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhlaWdodCA9IGdldERvY3VtZW50SGVpZ2h0KHRoaXMuY29udGVudERvY3VtZW50KTtcbiAgICAgIGlmckVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBjbG9uZUlmcmFtZS5yZW1vdmUoKTtcbiAgICAgIGRvbmUobnVsbCwgaGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9uZUlmcmFtZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWZyRWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgaWZyRWxlbS5zdHlsZS5oZWlnaHQgPSAnMXB4JztcblxuICB2YXIgaGVpZ2h0ID0gZ2V0RG9jdW1lbnRIZWlnaHQoaWZyRWxlbS5jb250ZW50RG9jdW1lbnQpO1xuXG4gIGlmckVsZW0uc3R5bGUuaGVpZ2h0ID0gJyc7XG4gIGRvbmUobnVsbCwgaGVpZ2h0KTtcbn1cblxuaWZyYW1lUmVzaXplLmFzeW5jID0gZnVuY3Rpb24gaWZyYW1lUmVzaXplQXN5bmMoaWZyYW1lLCBjYWxsYmFjaykge1xuICAvLyBkZWxheSB0byBsZXQgdGhlIGNvZGUgaW5zaWRlIHRoZSBpZnJhbWUgZmluaXNoXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgaWZyYW1lUmVzaXplKGlmcmFtZSwgY2FsbGJhY2spO1xuICB9LCAwKTtcbn07XG5cblxuZnVuY3Rpb24gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4oaWZyRWxlbSwgY2FsbGJhY2spIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkIHlldFwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZnJhbWVSZXNpemU7XG5cblxuLypcbiB3aW5kb3cub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuIGlmIChlLm9yaWdpbiAhPSBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbVwiKSByZXR1cm47XG4gdmFyIGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gaWYgKCFkYXRhIHx8IGRhdGEuY21kICE9IFwicmVzaXplLWlmcmFtZVwiKSByZXR1cm47XG4gdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShkYXRhLm5hbWUpWzBdO1xuXG4gZWxlbS5zdHlsZS5oZWlnaHQgPSArZGF0YS5oZWlnaHQgKyAxMCArIFwicHhcIjtcbiB2YXIgZGVmZXJyZWQgPSBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5kZWZlcnJlZHNbZGF0YS5pZF07XG4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuIH07XG5cbiBmdW5jdGlvbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbihpZnJFbGVtLCBjYWxsYmFjaykge1xuXG4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiBjYWxsYmFjayhuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiB9LCA1MDApO1xuXG4gdHJ5IHtcbiAvLyB0cnkgdG8gc2VlIGlmIHJlc2l6ZXIgY2FuIHdvcmsgb24gdGhpcyBpZnJhbWVcbiBpZnJFbGVtLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoXCJ0ZXN0XCIsIFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tXCIpO1xuIH0gY2F0Y2goZSkge1xuIC8vIGlmcmFtZSBmcm9tIGFub3RoZXIgZG9tYWluLCBzb3JyeVxuIGNhbGxiYWNrKG5ldyBFcnJvcihcInRoZSByZXNpemVyIG11c3QgYmUgZnJvbSBydS5sb29rYXRjb2RlLmNvbVwiKSk7XG4gcmV0dXJuO1xuIH1cblxuIGlmICghaWZyRWxlbS5vZmZzZXRXaWR0aCkge1xuIC8vIG1vdmUgaWZyYW1lIHRvIGFub3RoZXIgcGxhY2UgdG8gcmVzaXplIHRoZXJlXG4gdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuIGlmckVsZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIGlmckVsZW0pO1xuIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyRWxlbSk7XG4gfVxuXG4gaWZyRWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gdmFyIGlkID0gXCJcIiArIE1hdGgucmFuZG9tKCk7XG4gdmFyIG1lc3NhZ2UgPSB7IGNtZDogJ3Jlc2l6ZS1pZnJhbWUnLCBuYW1lOiBpZnJFbGVtWzBdLm5hbWUsIGlkOiBpZCB9O1xuIC8vIFRPRE9cbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5kZWZlcnJlZHNbaWRdID0gZGVmZXJyZWQ7XG4gZGVmZXJyZWQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuIGRlbGV0ZSBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5kZWZlcnJlZHNbaWRdO1xuIH0pO1xuXG4gdmFyIGZyYW1lID0gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uaWZyYW1lO1xuIGlmIChmcmFtZS5sb2FkZWQpIHtcbiBmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLCBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbVwiKTtcbiB9IGVsc2Uge1xuIGZyYW1lLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIik7XG4gfSk7XG4gfVxuXG4gaWYgKHBsYWNlaG9sZGVyKSB7XG4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiBwbGFjZWhvbGRlci5yZXBsYWNlV2l0aChpZnJFbGVtKTtcbiB9LCAyMCk7XG4gfVxuXG4gcmV0dXJuIGRlZmVycmVkO1xuIH1cblxuIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmRlZmVycmVkcyA9IHt9O1xuIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmlmcmFtZSA9ICQoJzxpZnJhbWUgc3JjPVwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tL2ZpbGVzL2lmcmFtZS1yZXNpemUuaHRtbFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+PC9pZnJhbWU+JykucHJlcGVuZFRvKCdib2R5Jyk7XG4gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uaWZyYW1lLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gdGhpcy5sb2FkZWQgPSB0cnVlO1xuIH0pO1xuICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZC9pZnJhbWVSZXNpemUuanNcbiAqKi8iLCIvL3JlcXVpcmUoJy4vY2FzcGVyanMnKTtcblxuLy8gaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI211dGF0aW9uLW1ldGhvZC1tYWNyb1xuZnVuY3Rpb24gbXV0YXRpb24obm9kZXMpIHtcbiAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RPTSBFeGNlcHRpb24gOCcpO1xuICB9IGVsc2UgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB0eXBlb2Ygbm9kZXNbMF0gPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZXNbMF0pIDogbm9kZXNbMF07XG4gIH0gZWxzZSB7XG4gICAgdmFyXG4gICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgIGxlbmd0aCA9IG5vZGVzLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBub2RlO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIG5vZGUgPSBub2Rlc1tpbmRleF07XG5cbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpIDogbm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYWdtZW50O1xuICB9XG59XG5cbnZhciBtZXRob2RzID0ge1xuICAvLyBzYWZhcmkgPSB3ZWJraXRNYXRjaGVzU2VsZWN0b3JcbiAgbWF0Y2hlczogRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IsXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtdXRhdGlvbihhcmd1bWVudHMpLCB0aGlzKTtcbiAgICB9XG4gIH0sXG4gIHByZXBlbmQ6IGZ1bmN0aW9uIHByZXBlbmQoKSB7XG4gICAgdGhpcy5pbnNlcnRCZWZvcmUobXV0YXRpb24oYXJndW1lbnRzKSwgdGhpcy5maXJzdENoaWxkKTtcbiAgfSxcbiAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoKSB7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChtdXRhdGlvbihhcmd1bWVudHMpKTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9LFxuICBiZWZvcmU6IGZ1bmN0aW9uIGJlZm9yZSgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBhZnRlcjogICBmdW5jdGlvbiBhZnRlcigpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMubmV4dFNpYmxpbmcpO1xuICAgIH1cbiAgfSxcbiAgY2xvc2VzdDogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXM7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHJldHVybiBub2RlO1xuICAgICAgZWxzZSBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBtZXRob2RzKSB7XG4gIGlmICghRWxlbWVudC5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG1ldGhvZHNbbWV0aG9kTmFtZV07XG4gIH1cbn1cblxucmVxdWlyZSgnLi9jdXN0b21FdmVudCcpO1xucmVxdWlyZSgnLi9kYXRhc2V0Jyk7XG5yZXF1aXJlKCcuL2hpZGRlbicpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2RvbS5qc1xuICoqLyIsIlxuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbXMpIHtcblxuICB2YXIgaXNUaHJvdHRsZWQgPSBmYWxzZSxcbiAgICAgIHNhdmVkQXJncyxcbiAgICAgIHNhdmVkVGhpcztcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuXG4gICAgaWYgKGlzVGhyb3R0bGVkKSB7XG4gICAgICBzYXZlZEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBzYXZlZFRoaXMgPSB0aGlzO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlzVGhyb3R0bGVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbW9kdWxlcy9saWIvdGhyb3R0bGUuanNcbiAqKi8iLCJcbnRyeSB7XG4gIG5ldyBDdXN0b21FdmVudChcIklFIGhhcyBDdXN0b21FdmVudCwgYnV0IGRvZXNuJ3Qgc3VwcG9ydCBjb25zdHJ1Y3RvclwiKTtcbn0gY2F0Y2ggKGUpIHtcblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbihldmVudCwgcGFyYW1zKSB7XG4gICAgdmFyIGV2dDtcbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogICAgZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogICAgIHVuZGVmaW5lZFxuICAgIH07XG4gICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgIHJldHVybiBldnQ7XG4gIH07XG5cbiAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuRXZlbnQucHJvdG90eXBlKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvY3VzdG9tRXZlbnQuanNcbiAqKi8iLCIvLyBkYXRhc2V0IGZvciBJRTEwXG5cbmlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQgJiZcbiAgICAvLyBGRiBpcyBlbXB0eSB3aGlsZSBJRSBnaXZlcyBlbXB0eSBvYmplY3RcbiAgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcpICB8fFxuICAhT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnKS5nZXQpXG4pIHtcbiAgdmFyIHByb3BEZXNjcmlwdG9yID0ge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICB0aGF0ID0gdGhpcyxcbiAgICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXAsXG4gICAgICAgICAgYXR0clZhbCwgYXR0ck5hbWUsIHByb3BOYW1lLFxuICAgICAgICAgIGF0dHJpYnV0ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgIGF0dHNMZW5ndGggPSBhdHRyaWJ1dGVzLmxlbmd0aCxcbiAgICAgICAgICB0b1VwcGVyQ2FzZSA9IGZ1bmN0aW9uIChuMCkge1xuICAgICAgICAgICAgcmV0dXJuIG4wLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXR0ZXIgPSBmdW5jdGlvbiAoYXR0ck5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpID9cbiAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKSA6XG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICB9O1xuICAgICAgdHJ5IHsgLy8gU2ltdWxhdGUgRE9NU3RyaW5nTWFwIHcvYWNjZXNzb3Igc3VwcG9ydFxuICAgICAgICAvLyBUZXN0IHNldHRpbmcgYWNjZXNzb3Igb24gbm9ybWFsIG9iamVjdFxuICAgICAgICAoe30pLl9fZGVmaW5lR2V0dGVyX18oJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgICAgIEhUTUw1X0RPTVN0cmluZ01hcCA9IHt9O1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUxKSB7IC8vIFVzZSBhIERPTSBvYmplY3QgZm9yIElFOFxuICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhdHRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgLy8gRml4OiBUaGlzIHRlc3QgcmVhbGx5IHNob3VsZCBhbGxvdyBhbnkgWE1MIE5hbWUgd2l0aG91dFxuICAgICAgICAvLyAgICAgICAgIGNvbG9ucyAoYW5kIG5vbi11cHBlcmNhc2UgZm9yIFhIVE1MKVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS5uYW1lICYmXG4gICAgICAgICAgKC9eZGF0YS1cXHdbXFx3XFwtXSokLykudGVzdChhdHRyaWJ1dGUubmFtZSkpIHtcbiAgICAgICAgICBhdHRyVmFsID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgIGF0dHJOYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAgICAgLy8gQ2hhbmdlIHRvIENhbWVsQ2FzZVxuICAgICAgICAgIHByb3BOYW1lID0gYXR0ck5hbWUuc3Vic3RyKDUpLnJlcGxhY2UoLy0uL2csIHRvVXBwZXJDYXNlKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUw1X0RPTVN0cmluZ01hcCwgcHJvcE5hbWUsIHtcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdGhpcy5lbnVtZXJhYmxlLFxuICAgICAgICAgICAgICBnZXQ6IGdldHRlci5iaW5kKGF0dHJWYWwgfHwgJycpLFxuICAgICAgICAgICAgICBzZXQ6IHNldHRlci5iaW5kKHRoYXQsIGF0dHJOYW1lKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoIChlMikgeyAvLyBpZiBhY2Nlc3NvcnMgYXJlIG5vdCB3b3JraW5nXG4gICAgICAgICAgICBIVE1MNV9ET01TdHJpbmdNYXBbcHJvcE5hbWVdID0gYXR0clZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBIVE1MNV9ET01TdHJpbmdNYXA7XG4gICAgfVxuICB9O1xuICB0cnkge1xuICAgIC8vIEZGIGVudW1lcmF0ZXMgb3ZlciBlbGVtZW50J3MgZGF0YXNldCwgYnV0IG5vdFxuICAgIC8vICAgRWxlbWVudC5wcm90b3R5cGUuZGF0YXNldDsgSUU5IGl0ZXJhdGVzIG92ZXIgYm90aFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnLCBwcm9wRGVzY3JpcHRvcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBwcm9wRGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7IC8vIElFOCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRvIHRydWVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JywgcHJvcERlc2NyaXB0b3IpO1xuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvZGF0YXNldC5qc1xuICoqLyIsImlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaGlkZGVuID09PSB1bmRlZmluZWQpIHtcbiAgZG9jdW1lbnQuaGVhZC5pbnNlcnRBZGphY2VudEhUTUwoJzxzdHlsZT4gW2hpZGRlbl0geyBkaXNwbGF5OiBub25lIH0gPC9zdHlsZT4nKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCBcImhpZGRlblwiLCB7XG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHZhbHVlKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hpZGRlbicpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvaGlkZGVuLmpzXG4gKiovIiwidmFyIGdldFNjcm9sbGJhckhlaWdodCA9IHJlcXVpcmUoJy4vZ2V0U2Nyb2xsYmFySGVpZ2h0Jyk7XG52YXIgc2Nyb2xsYmFySGVpZ2h0O1xuXG5mdW5jdGlvbiBnZXREb2N1bWVudEhlaWdodChkb2MpIHtcbiAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG4gIHZhciBoZWlnaHQgPSBNYXRoLm1heChcbiAgICBkb2MuYm9keS5zY3JvbGxIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgIGRvYy5ib2R5Lm9mZnNldEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgZG9jLmJvZHkuY2xpZW50SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICApO1xuXG4gIGlmIChkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoID4gZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkge1xuICAgIC8vIGdvdCBhIGhvcml6IHNjcm9sbCwgbGV0J3MgYWRkIGl0XG4gICAgaWYgKCFzY3JvbGxiYXJIZWlnaHQpIHNjcm9sbGJhckhlaWdodCA9IGdldFNjcm9sbGJhckhlaWdodCgpO1xuICAgIGhlaWdodCArPSBzY3JvbGxiYXJIZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldERvY3VtZW50SGVpZ2h0O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kb20vZ2V0RG9jdW1lbnRIZWlnaHQuanNcbiAqKi8iLCJmdW5jdGlvbiBnZXRTY3JvbGxiYXJIZWlnaHQoKSB7XG4gIHZhciBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG91dGVyLnN0eWxlLmNzc1RleHQgPSBcInZpc2liaWxpdHk6aGlkZGVuO2hlaWdodDoxMDBweFwiO1xuICBpZiAoIWRvY3VtZW50LmJvZHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRTY3JvbGxiYXJIZWlnaHQgY2FsbGVkIHRvIGVhcmx5OiBubyBkb2N1bWVudC5ib2R5XCIpO1xuICB9XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuXG4gIHZhciB3aWR0aE5vU2Nyb2xsID0gb3V0ZXIub2Zmc2V0V2lkdGg7XG4gIC8vIGZvcmNlIHNjcm9sbGJhcnNcbiAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSBcInNjcm9sbFwiO1xuXG4gIC8vIGFkZCBpbm5lcmRpdlxuICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbm5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG5cbiAgdmFyIHdpZHRoV2l0aFNjcm9sbCA9IGlubmVyLm9mZnNldFdpZHRoO1xuXG4gIC8vIHJlbW92ZSBkaXZzXG4gIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gIHJldHVybiB3aWR0aE5vU2Nyb2xsIC0gd2lkdGhXaXRoU2Nyb2xsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFNjcm9sbGJhckhlaWdodDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2RvbS9nZXRTY3JvbGxiYXJIZWlnaHQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJoZWFkLjIwOWJlOGJmYjczZmFhMjUwNjYxLmpzIn0=
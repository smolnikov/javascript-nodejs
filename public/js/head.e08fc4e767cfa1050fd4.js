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

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		7:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

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
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "e08fc4e767cfa1050fd4" + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(22);
	__webpack_require__(2);

	//exports.init = require('./init');
	exports.login = __webpack_require__(3);

	__webpack_require__(4);
	exports.Modal = __webpack_require__(5);
	exports.fontTest = __webpack_require__(6);
	exports.resizeOnload = __webpack_require__(14);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);

	// must use CommonsChunkPlugin
	// to ensure that other modules use exactly this (initialized) client/notify
	__webpack_require__(23).init();

	__webpack_require__(13);

/***/ },
/* 1 */,
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Modal = __webpack_require__(5);
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
/* 11 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var iframeResize = __webpack_require__(48);
	var throttle = __webpack_require__(50);
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(51);

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
/* 51 */
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
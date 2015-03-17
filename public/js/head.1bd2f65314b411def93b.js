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
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + "1bd2f65314b411def93b" + ".js";
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
	
	__webpack_require__(28);
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
	__webpack_require__(29).init();
	
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
	    var AuthModal = __webpack_require__(43).AuthModal;
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
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
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(54);

/***/ },
/* 29 */
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
	
	var delegate = __webpack_require__(25);
	
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
	
	var getDocumentHeight = __webpack_require__(76);
	
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
/* 50 */,
/* 51 */,
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
/* 53 */,
/* 54 */
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
	
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);

/***/ },
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWJkMmY2NTMxNGI0MTFkZWY5M2IiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvdW5yZWFkeS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvZm9udFRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbGF5b3V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpdGV0b29sYmFyLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvbmF2aWdhdGlvbkFycm93cy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ob3Zlci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9ydW5EZW1vLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9oZWFkL3RyYWNrSnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9kZWxlZ2F0ZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L25vdGlmaWNhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvb25Td2lwZS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaGVhZC9yZXNpemVPbmxvYWQvaWZyYW1lUmVzaXplLmpzIiwid2VicGFjazovLy8uL21vZHVsZXMvbGliL3Rocm90dGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BvbHlmaWxsL2N1c3RvbUV2ZW50LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wb2x5ZmlsbC9oaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2RvbS9nZXREb2N1bWVudEhlaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZG9tL2dldFNjcm9sbGJhckhlaWdodC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7Ozs7O0FDMUZBLG9CQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDO0FBQzNCLG9CQUFPLENBQUMsQ0FBVyxDQUFDLENBQUM7OztBQUdyQixRQUFPLENBQUMsS0FBSyxHQUFHLG1CQUFPLENBQUMsQ0FBUyxDQUFDLENBQUM7O0FBRW5DLG9CQUFPLENBQUMsQ0FBVSxDQUFDLENBQUM7QUFDcEIsUUFBTyxDQUFDLEtB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UyxHQUFDLEVBQUMsR0FBRyxFQUFDLGFBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBQyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsRUFBQyxNQUFNLEVBQUMsZ0JBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFBQyxFQUFDLFVBQVUsRUFBQyxvQkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7UUFBQyxFQUFDLE9BQU8sRUFBQyxpQkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7QUFBQyxrQkFBTyxDQUFDLENBQUM7VUFBQSxPQUFNLENBQUMsQ0FBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFJLENBQUMsSUFBSSxHQUMxZixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7TUFBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxtQkFBVTtBQUFDLGtCQUFNLENBQUMsQ0FBQztVQUFDLEVBQUMsU0FBUyxFQUFDLG1CQUFTLENBQUMsRUFBQztBQUFDLGtCQUFPLENBQUMsS0FBRyxDQUFDLEdBQUMsV0FBVyxHQUFDLElBQUksS0FBRyxDQUFDLEdBQUMsTUFBTSxHQUFDLFFBQVEsS0FBRyxPQUFPLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLEVBQUUsS0FBRyxDQUFDLEdBQUMsY0FBYyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxPQUFPLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFDLFNBQVM7VUFBQyxFQUFDLFNBQVMsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztBQUM5ZixvQkFBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsV0FBVyxFQUFDLHFCQUFTLENBQUMsRUFBQztBQUFDLGFBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxDQUFDO0FBQUMsbUJBQU8sSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUM7VUFBQSxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO1FBQUMsRUFBQyxVQUFVLEVBQUMsb0JBQVMsQ0FBQyxFQUFDO0FBQUMsZ0JBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDMWYsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDO1FBQUMsRUFBQyxRQUFRLEVBQUMsa0JBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLGVBQUksQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFDLDBCQUEwQixHQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsZ0JBQWdCLEtBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLGlCQUFpQixLQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsR0FBQyxzQ0FBc0MsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUNyZixDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsTUFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFDLDJCQUEyQixDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLEVBQUMsYUFBYSxFQUFDLHVCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLEdBQUMsb0JBQW9CLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztNQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFDLGlCQUFpQixFQUFDLDJCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFDLEdBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFFLFlBQVUsRUFBRTthQUFDLENBQUMsR0FBQyxJQUFJO2FBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUNDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLFlBQVU7QUFBQyxpQkFBRztBQUFDLG1CQUFJLENBQUMsR0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsS0FBSyxJQUFFLE9BQU8sS0FBRyxDQUFDLEVBQUMsSUFBRztBQUFDLHVCQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxRQUFNLENBQUMsRUFBQztBQUFDLGtCQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Y0FBQyxRQUFNLENBQUMsRUFBQztBQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztjQUFDO1lBQUM7VUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFBQyxFQUFDLE1BQU0sRUFBQyxrQkFBVTtBQUFDLGdCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUN6K0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtNQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFDLFVBQVUsRUFBQyxzQkFBVTtBQUFDLGFBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFBQyxFQUFDLGdCQUFnQixFQUFDLDRCQUFVO0FBQUMsYUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQUMsa0JBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1VBQUEsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFBQyxFQUFDLGdCQUFnQixFQUFDLDRCQUFVO0FBQUMsYUFBSSxDQUFDLENBQUMsSUFBRztBQUFDLFlBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0RBQWdELEVBQzNmLElBQUksQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBQyxVQUFVLEdBQUMsQ0FBQyxHQUFDLGlEQUFpRCxDQUFDO1VBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxZQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7VUFBQyxPQUFPLENBQUM7UUFBQyxFQUFDLE1BQU0sRUFBQyxrQkFBVTtBQUFDLGdCQUFNLEVBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQztBQUFDLFdBQUksQ0FBQyxRQUFRLEdBQUUsSUFBSSxJQUFJLEdBQUUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDO01BQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUMsb0JBQW9CLEVBQUMsZ0NBQVU7QUFBQyxhQUFJLENBQUM7YUFDRCxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBRyxDQUFDLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBRyxVQUFVLEtBQUcsQ0FBQyxJQUFFLFVBQVUsS0FBRyxDQUFDLElBQUUsVUFBVSxLQUFHLENBQUMsSUFBRSxtQkFBbUIsS0FBRyxDQUFDLElBQUUsaUJBQWlCLEtBQUcsQ0FBQyxFQUFDLElBQUc7QUFBQyxlQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxpQkFBSSxDQUFDLEdBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFHLE9BQU8sQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7WUFBQztVQUFDLFFBQU0sQ0FBQyxFQUFDLEVBQUUsT0FBTyxDQUFDO1FBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQVU7QUFBQyxnQkFBTSxFQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRSxPQUFPLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFDO1FBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFDLFdBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxFQUFFO01BQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUMsR0FBRyxFQUFDLGFBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxDQUFDLEdBQ0MsRUFBRTthQUFDLENBQUM7YUFBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxRQUFRLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLEVBQUMsS0FBSyxFQUFDLGlCQUFVO0FBQUMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQztRQUFDLEVBQUMsUUFBUSxFQUFDLG9CQUFVO0FBQUMsYUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsS0FBRyxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsRUFBQyxHQUFHLEVBQUMsYUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQUMsRUFBQyxHQUFHLEVBQUMsYUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxLQUFHLENBQUMsSUFDcitELENBQUMsQ0FBQyxHQUFHLEtBQUcsQ0FBQztBQUFDLGtCQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7VUFBQSxPQUFNLENBQUMsQ0FBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztNQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFDLFVBQVUsRUFBQyxvQkFBUyxDQUFDLEVBQUM7QUFBQyxVQUFDLENBQUMsY0FBYyxJQUFFLElB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QUMsTUFBTSxFQUFDO0FBQUMsZUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztVQUFDO1FBQUM7QUFDNWYsYUFBTSxFQUFDLGtCQUFVO0FBQUMsZ0JBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFDLFdBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxjQUFjLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksR0FBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztNQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLHFDQUFxQyxLQUFHLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQztRQUFDLEVBQUMsYUFBYSxFQUFDLHVCQUFTLENBQUMsRUFBQztBQUFDLGdCQUFPLElBQUksQ0FBQyxtQkFB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QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLGlCQUFpQixLQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUFDLEVBQUMsV0FBVyxFQUFDLHFCQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFHO0FBQUMsa0JBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxRQUFNLENBQUMsRUFBQztBQUFDLGtCQUFNLENBQUMsQ0FBQztVQUFDO1FBQUMsRUFBQyxXQUFXLEVBQUMsdUJBQVU7QUFBQyxhQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTO2FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQUM7QUFDcmYseUJBQWtCLEVBQUMsOEJBQVU7QUFBQyxhQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTSxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQztRQUFDLEVBQUMsTUFBTSxFQUFDLGtCQUFVO0FBQUMsYUFBSSxDQUFDLEdBQUMsSUFBSSxJQUFJLEdBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsR0FBQyxJQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxHQUFHO1FBQUMsRUFB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QyxDQUFDLENBQUM7WUFBQyxRQUFNLENBQUMsRUFBQztBQUFDLGNBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUM7VUFBQztRQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxXQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQUc7QUFBQyxhQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQzdmLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO0FBQzFmLHNCQUFXLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxDQUFDLG9CQUFvQixHQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsTUFBTSxF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QUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsS0FBSyxHQUNqZ0IsQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsSUFBRztBQUFDLG1CQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFNO2NBQUMsUUFBTSxDQUFDLEVBQUM7QUFBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVU7QUFBQyxrQkFBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVB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SUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFakMsT0FBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7QUFFdEMsUUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOzs7QUFHaEMsT0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxRQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDM0IsUUFBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFekIsT0FBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBR3hDLFFBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVwQyxVQUFPLGFBQWEsR0FBRyxlQUFlLENBQUM7RUFDeEM7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBfbmFtZV9cIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdGlmKG1vcmVNb2R1bGVzWzBdKSB7XG4gXHRcdFx0aW5zdGFsbGVkTW9kdWxlc1swXSA9IDA7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDc6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiBcdFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIFwiMWJkMmY2NTMxNGI0MTFkZWY5M2JcIiArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxYmQyZjY1MzE0YjQxMWRlZjkzYlxuICoqLyIsIlxucmVxdWlyZSgnY2xpZW50L3BvbHlmaWxsJyk7XG5yZXF1aXJlKCcuL3VucmVhZHknKTtcblxuLy9leHBvcnRzLmluaXQgPSByZXF1aXJlKCcuL2luaXQnKTtcbmV4cG9ydHMubG9naW4gPSByZXF1aXJlKCcuL2xvZ2luJyk7XG5cbnJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5leHBvcnRzLk1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpO1xuZXhwb3J0cy5mb250VGVzdCA9IHJlcXVpcmUoJy4vZm9udFRlc3QnKTtcbmV4cG9ydHMucmVzaXplT25sb2FkID0gcmVxdWlyZSgnLi9yZXNpemVPbmxvYWQnKTtcbnJlcXVpcmUoJy4vbGF5b3V0Jyk7XG5yZXF1aXJlKCcuL3NpdGV0b29sYmFyJyk7XG5yZXF1aXJlKCcuL3NpZGViYXInKTtcbnJlcXVpcmUoJy4vbmF2aWdhdGlvbkFycm93cycpO1xucmVxdWlyZSgnLi9ob3ZlcicpO1xucmVxdWlyZSgnLi9ydW5EZW1vJyk7XG5cbi8vIG11c3QgdXNlIENvbW1vbnNDaHVua1BsdWdpblxuLy8gdG8gZW5zdXJlIHRoYXQgb3RoZXIgbW9kdWxlcyB1c2UgZXhhY3RseSB0aGlzIChpbml0aWFsaXplZCkgY2xpZW50L25vdGlmeVxucmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpLmluaXQoKTtcblxucmVxdWlyZSgnLi90cmFja0pzJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9pbmRleC5qc1xuICoqLyIsIi8vIGlmIGNsYXNzIGVuZHMgd2l0aCBfdW5yZWFkeSB0aGVuIHdlIGNvbnNpZGVyIGVsZW1lbnQgdW51c2FibGUgKHlldClcblxuXG4vLyBjYW5jZWwgY2xpY2tzIG9uIDxhIGNsYXNzPVwidW5yZWFkeVwiPiBhbmQgPGJ1dHRvbiBjbGFzcz1cInVucmVhZHlcIj5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICB3aGlsZSAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5jbGFzc05hbWUubWF0Y2goL191bnJlYWR5XFxiLykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICB9XG59KTtcblxuLy8gY2FuY2VsIHN1Ym1pdHMgb2YgPGZvcm0gY2xhc3M9XCJ1bnJlYWR5XCI+XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lLm1hdGNoKC9fdW5yZWFkeVxcYi8pKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3VucmVhZHkuanNcbiAqKi8iLCJ2YXIgTW9kYWwgPSByZXF1aXJlKCcuL21vZGFsJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICBpZiAoIWV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uLWxvZ2luJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBsb2dpbigpO1xuXG59KTtcblxuZnVuY3Rpb24gbG9naW4oKSB7XG4gIHZhciBtb2RhbCA9IG5ldyBNb2RhbCgpO1xuICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKCk7XG4gIG1vZGFsLnNldENvbnRlbnQoc3Bpbm5lci5lbGVtKTtcbiAgc3Bpbm5lci5zdGFydCgpO1xuXG4gIHJlcXVpcmUuZW5zdXJlKCdhdXRoL2NsaWVudCcsIGZ1bmN0aW9uKCkge1xuICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgIHZhciBBdXRoTW9kYWwgPSByZXF1aXJlKCdhdXRoL2NsaWVudCcpLkF1dGhNb2RhbDtcbiAgICBuZXcgQXV0aE1vZGFsKCk7XG4gIH0sICdhdXRoQ2xpZW50Jyk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2dpbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbG9naW4uanNcbiAqKi8iLCJcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uLXVzZXItbG9nb3V0JykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9nb3V0KCk7XG4gIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICBmb3JtLmFjdGlvbiA9ICcvYXV0aC9sb2dvdXQ/X2NzcmY9JyArIGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvWFNSRi1UT0tFTj0oW1xcdy1dKykvKVsxXTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvbG9nb3V0LmpzXG4gKiovIiwiZnVuY3Rpb24gTW9kYWwoKSB7XG4gIHRoaXMucmVuZGVyKCk7XG5cbiAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gIHRoaXMub25Eb2N1bWVudEtleURvd24gPSB0aGlzLm9uRG9jdW1lbnRLZXlEb3duLmJpbmQodGhpcyk7XG5cbiAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLm9uRG9jdW1lbnRLZXlEb3duKTtcbn1cblxuTW9kYWwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlRW5kJywgJzxkaXYgY2xhc3M9XCJtb2RhbFwiPjxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj48L2Rpdj48L2Rpdj4nKTtcbiAgdGhpcy5lbGVtID0gZG9jdW1lbnQuYm9keS5sYXN0Q2hpbGQ7XG4gIHRoaXMuY29udGVudEVsZW0gPSB0aGlzLmVsZW0ubGFzdENoaWxkO1xufTtcblxuTW9kYWwucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UtYnV0dG9uJykpIHtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICB9XG59O1xuXG5cbk1vZGFsLnByb3RvdHlwZS5vbkRvY3VtZW50S2V5RG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnJlbW92ZSgpO1xuICB9XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUuc2hvd092ZXJsYXkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb250ZW50RWxlbS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUuaGlkZU92ZXJsYXkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb250ZW50RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG59O1xuXG5Nb2RhbC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uKGh0bWxPck5vZGUpIHtcbiAgaWYgKHR5cGVvZiBodG1sT3JOb2RlID09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5jb250ZW50RWxlbS5pbm5lckhUTUwgPSBodG1sT3JOb2RlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuY29udGVudEVsZW0uaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5jb250ZW50RWxlbS5hcHBlbmRDaGlsZChodG1sT3JOb2RlKTtcbiAgfVxuICB2YXIgYXV0b2ZvY3VzID0gdGhpcy5jb250ZW50RWxlbS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXScpO1xuICBpZiAoYXV0b2ZvY3VzKSBhdXRvZm9jdXMuZm9jdXMoKTtcbn07XG5cbk1vZGFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmVsZW0pO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLm9uRG9jdW1lbnRLZXlEb3duKTtcbiAgdGhpcy5lbGVtLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwibW9kYWxDbG9zZVwiKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9tb2RhbC5qc1xuICoqLyIsIi8qXG7QmNC30LHQtdCz0LDQtdC8IEZPVVQgLSDQv9GA0L7RgdGC0L7QuSDRgdC/0L7RgdC+0LEg0L/RgNC+0LLQtdGA0LrQuCDQt9Cw0LPRgNGD0LfQutC4INC40LrQvtC90LjQuiDRiNGA0LjRhNGC0LAuXG4gMSkg0JTQtdC70LDQtdC8INCyIGljb25pYyDRiNGA0LjRhNGC0LUg0L7QtNC40L0g0YHQuNC80LLQvtC7INGBINC60L7QtNC+0LwgMjEgKNCy0LzQtdGB0YLQviDCqyHCuylcbiDQkiBpY29ubW9vblxuIGh0dHA6Ly9pbHlha2FudG9yLnJ1L3NjcmVlbi8yMDE0LTA5LTA2XzAxNTIucG5nXG4gaHR0cDovL2lseWFrYW50b3IucnUvc2NyZWVuLzIwMTQtMDktMDZfMDE1My5wbmdcblxuINCt0YLQvtGCINGI0YDQuNGE0YIg0LIg0L7QsdGL0YfQvdC+0Lwg0YjRgNC40YTRgtC1IChzZXJpZikg0YPQt9C60LjQuSDQv9C+INGI0LjRgNC40L3QtSwg0LAg0LIgaWNvbmljIC0g0L3QvtGA0LzQsNC70YzQvdGL0LkuXG4gMikg0JTQsNC70LXQtSDQv9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDRgdC+0LfQtNCw0ZHQvCA8c3Bhbj4hPC9zcGFuPiDQuCDQtNCw0ZHQvCDQtdC80YMgZm9udEZhbWlseSDRgdC90LDRh9Cw0LvQsCBzZXJpZiDQuCDQt9Cw0LzQtdGA0Y/QtdC8INGI0LjRgNC40L3Rgywg0LAg0L/QvtGC0L7QvCBGb250SWNvbnMsIHNlcmlmLlxuINCe0YLQu9Cw0LLQu9C40LLQsNC10Lwg0LzQvtC80LXQvdGCLCDQutC+0LPQtNCwINGI0LjRgNC40L3QsCDQuNC30LzQtdC90LjRgtGB0Y8uINCt0YLQviDQt9C90LDRh9C40YIg0YjRgNC40YTRgiDQt9Cw0LPRgNGD0LbQtdC9LlxuINCc0L7QttC90L4g0YPQsdGA0LDRgtGMINC60LvQsNGB0YEgLm5vLWljb25zINC4INC/0L7QutCw0LfQsNGC0Ywg0LjQutC+0L3QutC4LlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gIGVsZW0uY2xhc3NOYW1lID0gJ2ZvbnQtdGVzdCc7XG4gIGVsZW0uc3R5bGUuZm9udEZhbWlseSA9ICdzZXJpZic7XG4gIHZhciBpbml0aWFsV2lkdGggPSBlbGVtLm9mZnNldFdpZHRoO1xuXG4gIGVsZW0uc3R5bGUuZm9udEZhbWlseSA9ICcnO1xuXG4gIGZ1bmN0aW9uIGNoZWNrRm9udExvYWRlZCgpIHtcbiAgICBpZiAoaW5pdGlhbFdpZHRoICE9IGVsZW0ub2Zmc2V0V2lkdGgpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8taWNvbnMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dChjaGVja0ZvbnRMb2FkZWQsIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tGb250TG9hZGVkKCk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2ZvbnRUZXN0LmpzXG4gKiovIiwidmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUlkO1xuXG52YXIgREVCVUcgPSBmYWxzZTtcbmZ1bmN0aW9uIGxvZygpIHtcbiAgaWYgKERFQlVHKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG52YXIgVEFCTEVUX1dJRFRIID0gODQwO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgLy8gZG9uJ3QgaGFuZGxlIG9uc2Nyb2xsIG1vcmUgb2Z0ZW4gdGhhbiBhbmltYXRpb25cbiAgZnVuY3Rpb24gb25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWQoKSB7XG4gICAgbG9nKFwib25XaW5kb3dTY3JvbGxBbmRSZXNpemVUaHJvdHRsZWRcIiwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQpO1xuICAgIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWVJZCkgcmV0dXJuO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgb25XaW5kb3dTY3JvbGxBbmRSZXNpemUoKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUlkID0gbnVsbDtcbiAgICB9KTtcblxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplVGhyb3R0bGVkKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplVGhyb3R0bGVkKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG9uV2luZG93U2Nyb2xsQW5kUmVzaXplVGhyb3R0bGVkKTtcblxufSkoKTtcblxuZnVuY3Rpb24gY29tcGFjdGlmeVNpZGViYXIoKSB7XG4gIGxvZyhcImNvbXBhY3RpZnlTaWRlYmFyXCIpO1xuICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgdmFyIHNpZGViYXJDb250ZW50ID0gc2lkZWJhci5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fY29udGVudCcpO1xuICB2YXIgc2lkZWJhcklubmVyID0gc2lkZWJhci5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9faW5uZXInKTtcblxuICB2YXIgaGFzU3RpY2t5Rm9vdGVyID0gc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXJfc3RpY2t5LWZvb3RlcicpO1xuICB2YXIgaXNDb21wYWN0ID0gc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXJfY29tcGFjdCcpO1xuXG4gIGlmIChpc0NvbXBhY3QpIHtcbiAgICB2YXIgZW1wdHlTcGFjZVNpemU7XG4gICAgaWYgKGhhc1N0aWNreUZvb3Rlcikge1xuICAgICAgZW1wdHlTcGFjZVNpemUgPSBzaWRlYmFyQ29udGVudC5sYXN0RWxlbWVudENoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtXG4gICAgICBzaWRlYmFyQ29udGVudC5sYXN0RWxlbWVudENoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbXB0eVNwYWNlU2l6ZSA9IHNpZGViYXJDb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtXG4gICAgICBzaWRlYmFyQ29udGVudC5sYXN0RWxlbWVudENoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcbiAgICB9XG5cbiAgICBsb2coXCJkZWNvbXBhY3Q/XCIsIGVtcHR5U3BhY2VTaXplKTtcblxuICAgIC8vIGVub3VnaCBzcGFjZSB0byBvY2N1cHkgdGhlIGZ1bGwgaGVpZ2h0IGluIGRlY29tcGFjdGVkIGZvcm0gd2l0aG91dCBzY3JvbGxiYXJcbiAgICBpZiAoZW1wdHlTcGFjZVNpemUgPiAxNTApIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhcl9jb21wYWN0Jyk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgbG9nKHNpZGViYXJJbm5lci5zY3JvbGxIZWlnaHQsIHNpZGViYXJJbm5lci5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChzaWRlYmFySW5uZXIuc2Nyb2xsSGVpZ2h0ID4gc2lkZWJhcklubmVyLmNsaWVudEhlaWdodCkge1xuICAgICAgbG9nKFwiY29tcGFjdCFcIik7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfY29tcGFjdCcpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuZnVuY3Rpb24gb25XaW5kb3dTY3JvbGxBbmRSZXNpemUoKSB7XG5cbiAgdmFyIHNpdGV0b29sYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGV0b29sYmFyJyk7XG4gIGlmICghc2l0ZXRvb2xiYXIpIHtcbiAgICBsb2coXCJubyBzaXRldG9vbGJhclwiKTtcbiAgICByZXR1cm47IC8vIHBhZ2UgaW4gYSBuby10b3AtbmF2IGxheW91dFxuICB9XG5cbiAgdmFyIHNpdGV0b29sYmFySGVpZ2h0ID0gc2l0ZXRvb2xiYXIub2Zmc2V0SGVpZ2h0O1xuXG4gIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICBpZiAoc2lkZWJhcikge1xuICAgIHNpZGViYXIuc3R5bGUudG9wID0gTWF0aC5tYXgoc2l0ZXRvb2xiYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tLCAwKSArICdweCc7XG4gICAgY29tcGFjdGlmeVNpZGViYXIoKTtcbiAgfVxuXG4gIHNldFVzZXJTY2FsZUlmVGFibGV0KCk7XG5cblxufVxuXG5mdW5jdGlvbiBzZXRVc2VyU2NhbGVJZlRhYmxldCgpIHtcbiAgdmFyIGlzVGFibGV0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDw9IFRBQkxFVF9XSURUSDtcbiAgdmFyIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ2aWV3cG9ydFwiXScpLmNvbnRlbnQ7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL3VzZXItc2NhbGFibGU9XFx3Ky8sICd1c2VyLXNjYWxhYmxlPScgKyAoaXNUYWJsZXQgPyAneWVzJyA6ICdubycpKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKS5jb250ZW50ID0gY29udGVudDtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL2xheW91dC5qc1xuICoqLyIsIlxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uU2VhcmNoQ2xpY2spO1xuXG5cbi8vIHRvZ2dsZSBzZWFyY2ggb24vb2ZmLCBhdXRvZm9jdXMgb24gaW5wdXQgd2hlbiBcIm9uXCJcbmZ1bmN0aW9uIG9uU2VhcmNoQ2xpY2soZXZlbnQpIHtcbiAgdmFyIHNlYXJjaFRvZ2dsZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2l0ZXRvb2xiYXJfX3NlYXJjaC10b2dnbGUnKTtcblxuICBpZiAoc2VhcmNoVG9nZ2xlKSB7XG4gICAgdG9nZ2xlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICB2YXIgc2l0ZXRvb2xiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZXRvb2xiYXInKTtcbiAgc2l0ZXRvb2xiYXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2l0ZXRvb2xiYXJfc2VhcmNoX29wZW4nKTtcblxuICB2YXIgaW5wdXQgPSBzaXRldG9vbGJhci5xdWVyeVNlbGVjdG9yKCcuc2l0ZXRvb2xiYXJfX3NlYXJjaC1xdWVyeSBpbnB1dCcpO1xuICBpZiAoc2l0ZXRvb2xiYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaXRldG9vbGJhcl9zZWFyY2hfb3BlbicpKSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcblxuICAgIGlmICghaW5wdXQub25rZXlkb3duKSB7XG4gICAgICBpbnB1dC5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB0b2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3NpdGV0b29sYmFyLmpzXG4gKiovIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcblxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuY2xhc3NMaXN0LnRvZ2dsZSgncGFnZV9zaWRlYmFyX29uJyk7XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdlX3NpZGViYXJfb24nKSkge1xuICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2Uubm9TaWRlYmFyO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5ub1NpZGViYXIgPSAxO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICBpZiAoZXZlbnQudGFyZ2V0LmRhdGFzZXQuc2lkZWJhclRvZ2dsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgdG9nZ2xlKCk7XG59XG5cblxuZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gIC8vIGRvbid0IHJlYWN0IG9uIEN0cmwtPiA8LSBpZiBpbiB0ZXh0XG4gIGlmICh+WydJTlBVVCcsICdURVhUQVJFQScsICdTRUxFQ1QnXS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZSkpIHJldHVybjtcblxuICBpZiAoZXZlbnQua2V5Q29kZSAhPSBcIlNcIi5jaGFyQ29kZUF0KDApKSByZXR1cm47XG5cbiAgaWYgKH5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIm1hYyBvcyB4XCIpKSB7XG4gICAgaWYgKCFldmVudC5tZXRhS2V5IHx8ICFldmVudC5hbHRLZXkpIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWV2ZW50LmFsdEtleSkgcmV0dXJuO1xuICB9XG5cbiAgdG9nZ2xlKCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvc2lkZWJhci5qc1xuICoqLyIsIi8vIG5hdmlnYXRpb24gc3RhcnRzIHRvIHdvcmsgcmlnaHQgbm93XG52YXIgb25Td2lwZSA9IHJlcXVpcmUoJ2NsaWVudC9vblN3aXBlJyk7XG52YXIgY3RybE9yQWx0ID0gfm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwibWFjIG9zIHhcIikgPyAnY3RybCcgOiAnYWx0JztcblxuZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gIC8vIGRvbid0IHJlYWN0IG9uIEN0cmwtPiA8LSBpZiBpbiB0ZXh0XG4gIGlmICh+WydJTlBVVCcsICdURVhUQVJFQScsICdTRUxFQ1QnXS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZSkpIHJldHVybjtcblxuICBpZiAoIWV2ZW50W2N0cmxPckFsdCArICdLZXknXSkgcmV0dXJuO1xuXG4gIHZhciByZWwgPSBudWxsO1xuICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgY2FzZSAweDI1OlxuICAgIHJlbCA9ICdwcmV2JztcbiAgICBicmVhaztcbiAgY2FzZSAweDI3OlxuICAgIHJlbCA9ICduZXh0JztcbiAgICBicmVhaztcbiAgZGVmYXVsdDpcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbcmVsPVwiJyArIHJlbCArICdcIl0nKTtcbiAgaWYgKCFsaW5rKSByZXR1cm47XG5cbiAgZG9jdW1lbnQubG9jYXRpb24gPSBsaW5rLmhyZWY7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbn1cblxuZnVuY3Rpb24gc2hvd0hvdEtleXMoKSB7XG4gIHZhciBrZXlEZXNjID0gY3RybE9yQWx0WzBdLnRvVXBwZXJDYXNlKCkgKyBjdHJsT3JBbHQuc2xpY2UoMSk7XG5cbiAgdmFyIHNob3J0Y3V0O1xuXG4gIHZhciBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJuZXh0XCJdJyk7XG4gIGlmIChuZXh0KSB7XG4gICAgc2hvcnRjdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhW2hyZWY9XCInICsgbmV4dC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSArICdcIl0gLnBhZ2VfX25hdi10ZXh0LXNob3J0Y3V0Jyk7XG4gICAgc2hvcnRjdXQuaW5uZXJIVE1MID0ga2V5RGVzYyArICcgKyA8c3BhbiBjbGFzcz1cInBhZ2VfX25hdi10ZXh0LWFyclwiPuKGkjwvc3Bhbj4nO1xuICB9XG5cbiAgdmFyIHByZXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW3JlbD1cInByZXZcIl0nKTtcbiAgaWYgKHByZXYpIHtcbiAgICBzaG9ydGN1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZj1cIicgKyBwcmV2LmdldEF0dHJpYnV0ZSgnaHJlZicpICsgJ1wiXSAucGFnZV9fbmF2LXRleHQtc2hvcnRjdXQnKTtcbiAgICBzaG9ydGN1dC5pbm5lckhUTUwgPSBrZXlEZXNjICsgJyArIDxzcGFuIGNsYXNzPVwicGFnZV9fbmF2LXRleHQtYXJyXCI+4oaQPC9zcGFuPic7XG4gIH1cblxufVxuXG5vblN3aXBlKGRvY3VtZW50LCB7XG4gIG9uUmlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJwcmV2XCJdJyk7XG4gICAgaWYgKGxpbmspIGRvY3VtZW50LmxvY2F0aW9uID0gbGluay5ocmVmO1xuICB9LFxuICBvbkxlZnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1tyZWw9XCJuZXh0XCJdJyk7XG4gICAgaWYgKGxpbmspIGRvY3VtZW50LmxvY2F0aW9uID0gbGluay5ocmVmO1xuICB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzaG93SG90S2V5cyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL25hdmlnYXRpb25BcnJvd3MuanNcbiAqKi8iLCIvLyBhZGQvcmVtb3ZlIC5ob3ZlciBvbm1vdXNlZW50ZXIvbGVhdmVcbi8vIGZvciBtb2JpbGUgZGV2aWNlcyAoOmhvdmVyIHN0aWNrcylcblxudmFyIGN1cnJlbnRIb3ZlckVsZW07XG5cbi8qXG5mdW5jdGlvbiBsb2coZSkge1xuICBjb25zb2xlLmxvZyhEYXRlLm5vdygpICUgMWU0LCBlLnR5cGUpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBsb2csIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobGVhdmVcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoXCIsIGxvZywgZmFsc2UpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJtb3ZlXCIsIGxvZywgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIiwgbG9nLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGxvZywgZmFsc2UpO1xuKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtYWRkLWNsYXNzLW9uLWhvdmVyXScpO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgY3VycmVudEhvdmVyRWxlbSA9IHRhcmdldDtcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaG92ZXInKTtcbiAgfVxufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZiAoY3VycmVudEhvdmVyRWxlbSkge1xuICAgICAgY3VycmVudEhvdmVyRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpO1xuICAgICAgY3VycmVudEhvdmVyRWxlbSA9IG51bGw7XG4gICAgfVxuICB9LCA1MDApOyAvLyB0b3VjaHN0YXJ0IC0+IHRvdXJjaGVuZCAtPiAoZGVsYXkgdXAgdG8gMzAwbXMpIC0+IG1vdXNlb3ZlclxufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKCFjdXJyZW50SG92ZXJFbGVtKSByZXR1cm47XG5cbiAgaWYgKGN1cnJlbnRIb3ZlckVsZW0uY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjdXJyZW50SG92ZXJFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XG4gIGN1cnJlbnRIb3ZlckVsZW0gPSBudWxsO1xufSk7XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaGVhZC9ob3Zlci5qc1xuICoqLyIsIndpbmRvdy5ydW5EZW1vID0gZnVuY3Rpb24oYnV0dG9uKSB7XG5cbiAgdmFyIGRlbW9FbGVtO1xuICB2YXIgcGFyZW50ID0gYnV0dG9uO1xuXG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZShwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudCkge1xuICAgIGRlbW9FbGVtID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRlbW9dJyk7XG4gICAgaWYgKGRlbW9FbGVtKSBicmVhaztcbiAgfVxuXG4gIGlmICghZGVtb0VsZW0pIHtcbiAgICBhbGVydChcItCe0YjQuNCx0LrQsCwg0L3QtdGCINGN0LvQtdC80LXQvdGC0LAg0YEg0LTQtdC80L5cIik7XG4gIH0gZWxzZSB7XG4gICAgLyoganNoaW50IC1XMDYxICovXG4gICAgZXZhbChkZW1vRWxlbS50ZXh0Q29udGVudCk7XG4gIH1cblxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3J1bkRlbW8uanNcbiAqKi8iLCJcbndpbmRvdy5fdHJhY2tKcyA9IHsgdG9rZW46ICc4ZDI4NmRkMWNiZjc0NGI5ODdhNzIyNmVlOWEwOTMyNCcgfTtcbi8vIENPUFlSSUdIVCAoYykgMjAxNSBUcmFja0pTIExMQyBBTEwgUklHSFRTIFJFU0VSVkVEXG4oZnVuY3Rpb24oaCxwLGspe1widXNlIGF3ZXNvbWVcIjtpZihoLnRyYWNrSnMpaC5jb25zb2xlJiZoLmNvbnNvbGUud2FybiYmaC5jb25zb2xlLndhcm4oXCJUcmFja0pTIGdsb2JhbCBjb25mbGljdFwiKTtlbHNle3ZhciBsPWZ1bmN0aW9uKGEsYixjLGQsZSl7dGhpcy51dGlsPWE7dGhpcy5vbkVycm9yPWI7dGhpcy5vbkZhdWx0PWM7dGhpcy5vcHRpb25zPWU7ZS5lbmFibGVkJiZ0aGlzLmluaXRpYWxpemUoZCl9O2wucHJvdG90eXBlPXtpbml0aWFsaXplOmZ1bmN0aW9uKGEpe2EuYWRkRXZlbnRMaXN0ZW5lciYmKHRoaXMud3JhcEFuZENhdGNoKGEuRWxlbWVudC5wcm90b3R5cGUsXCJhZGRFdmVudExpc3RlbmVyXCIsMSksdGhpcy53cmFwQW5kQ2F0Y2goYS5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsXCJhZGRFdmVudExpc3RlbmVyXCIsMSksdGhpcy53cmFwUmVtb3ZlRXZlbnRMaXN0ZW5lcihhLkVsZW1lbnQucHJvdG90eXBlKSx0aGlzLndyYXBSZW1vdmVFdmVudExpc3RlbmVyKGEuWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlKSk7XG4gIHRoaXMud3JhcEFuZENhdGNoKGEsXCJzZXRUaW1lb3V0XCIsMCk7dGhpcy53cmFwQW5kQ2F0Y2goYSxcInNldEludGVydmFsXCIsMCl9LHdyYXBBbmRDYXRjaDpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcyxlPWFbYl07ZC51dGlsLmhhc0Z1bmN0aW9uKGUsXCJhcHBseVwiKSYmKGFbYl09ZnVuY3Rpb24oKXt0cnl7dmFyIGY9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxnPWZbY10sdSxoO2lmKGQub3B0aW9ucy5iaW5kU3RhY2spdHJ5e3Rocm93IEVycm9yKCk7fWNhdGNoKGspe2g9ay5zdGFjayx1PWQudXRpbC5pc29Ob3coKX1pZihcImFkZEV2ZW50TGlzdGVuZXJcIj09PWImJih0aGlzLl90cmFja0pzRXZ0fHwodGhpcy5fdHJhY2tKc0V2dD1uZXcgbSksdGhpcy5fdHJhY2tKc0V2dC5nZXRXcmFwcGVkKGZbMF0sZyxmWzJdKSkpcmV0dXJuO2cmJmQudXRpbC5oYXNGdW5jdGlvbihnLFwiYXBwbHlcIikmJihmW2NdPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBnLmFwcGx5KHRoaXMsXG4gIGFyZ3VtZW50cyl9Y2F0Y2goYSl7dGhyb3cgZC5vbkVycm9yKFwiY2F0Y2hcIixhLHtiaW5kVGltZTp1LGJpbmRTdGFjazpofSksZC51dGlsLndyYXBFcnJvcihhKTt9fSxcImFkZEV2ZW50TGlzdGVuZXJcIj09PWImJnRoaXMuX3RyYWNrSnNFdnQuYWRkKGZbMF0sZyxmWzJdLGZbY10pKTtyZXR1cm4gZS5hcHBseSh0aGlzLGYpfWNhdGNoKGwpe2FbYl09ZSxkLm9uRmF1bHQobCl9fSl9LHdyYXBSZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEpe2lmKGEmJmEucmVtb3ZlRXZlbnRMaXN0ZW5lciYmdGhpcy51dGlsLmhhc0Z1bmN0aW9uKGEucmVtb3ZlRXZlbnRMaXN0ZW5lcixcImNhbGxcIikpe3ZhciBiPWEucmVtb3ZlRXZlbnRMaXN0ZW5lcjthLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oYSxkLGUpe2lmKHRoaXMuX3RyYWNrSnNFdnQpe3ZhciBmPXRoaXMuX3RyYWNrSnNFdnQuZ2V0V3JhcHBlZChhLGQsZSk7ZiYmdGhpcy5fdHJhY2tKc0V2dC5yZW1vdmUoYSxkLGUpO3JldHVybiBiLmNhbGwodGhpcyxcbiAgYSxmLGUpfXJldHVybiBiLmNhbGwodGhpcyxhLGQsZSl9fX19O3ZhciBtPWZ1bmN0aW9uKCl7dGhpcy5ldmVudHM9W119O20ucHJvdG90eXBlPXthZGQ6ZnVuY3Rpb24oYSxiLGMsZCl7LTE+PXRoaXMuaW5kZXhPZihhLGIsYykmJnRoaXMuZXZlbnRzLnB1c2goW2EsYiwhIWMsZF0pfSxyZW1vdmU6ZnVuY3Rpb24oYSxiLGMpe2E9dGhpcy5pbmRleE9mKGEsYiwhIWMpOzA8PWEmJnRoaXMuZXZlbnRzLnNwbGljZShhLDEpfSxnZXRXcmFwcGVkOmZ1bmN0aW9uKGEsYixjKXthPXRoaXMuaW5kZXhPZihhLGIsISFjKTtyZXR1cm4gMDw9YT90aGlzLmV2ZW50c1thXVszXTprfSxpbmRleE9mOmZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9MDtkPHRoaXMuZXZlbnRzLmxlbmd0aDtkKyspaWYodGhpcy5ldmVudHNbZF1bMF09PT1hJiZ0aGlzLmV2ZW50c1tkXVsxXT09PWImJnRoaXMuZXZlbnRzW2RdWzJdPT09ISFjKXJldHVybiBkO3JldHVybi0xfX07dmFyIHQ9ZnVuY3Rpb24oYSxiKXt0aGlzLnV0aWw9XG4gIGE7dGhpcy5pbml0Q3VycmVudChiKX07dC5wcm90b3R5cGU9e2N1cnJlbnQ6e30saW5pdE9ubHk6e2FwcGxpY2F0aW9uOlwiXCIsZW5hYmxlZDohMCx0b2tlbjohMCxjYWxsYmFjazp7ZW5hYmxlZDohMH0sY29uc29sZTp7ZW5hYmxlZDohMH0sbmV0d29yazp7ZW5hYmxlZDohMH0sdmlzaXRvcjp7ZW5hYmxlZDohMH0sd2luZG93OntlbmFibGVkOiEwfX0sZGVmYXVsdHM6e2FwcGxpY2F0aW9uOlwiXCIsZW5hYmxlZDohMCxvbkVycm9yOmZ1bmN0aW9uKCl7cmV0dXJuITB9LHNlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gYT09PWs/XCJ1bmRlZmluZWRcIjpudWxsPT09YT9cIm51bGxcIjpcIm51bWJlclwiPT09dHlwZW9mIGEmJmlzTmFOKGEpP1wiTmFOXCI6XCJcIj09PWE/XCJFbXB0eSBTdHJpbmdcIjowPT09YT9cIjBcIjohMT09PWE/XCJmYWxzZVwiOmEmJmEudG9TdHJpbmc/YS50b1N0cmluZygpOlwidW5rbm93blwifSxzZXNzaW9uSWQ6XCJcIix0b2tlbjpcIlwiLHVzZXJJZDpcIlwiLHZlcnNpb246XCJcIixjYWxsYmFjazp7ZW5hYmxlZDohMCxcbiAgYmluZFN0YWNrOiExfSxjb25zb2xlOntlbmFibGVkOiEwLGRpc3BsYXk6ITAsZXJyb3I6ITAsd2F0Y2g6W1wibG9nXCIsXCJkZWJ1Z1wiLFwiaW5mb1wiLFwid2FyblwiLFwiZXJyb3JcIl19LG5ldHdvcms6e2VuYWJsZWQ6ITAsZXJyb3I6ITB9LHZpc2l0b3I6e2VuYWJsZWQ6ITB9LHdpbmRvdzp7ZW5hYmxlZDohMH19LGluaXRDdXJyZW50OmZ1bmN0aW9uKGEpe2lmKHRoaXMudmFsaWRhdGUoYSx0aGlzLmRlZmF1bHRzLFwiY29uZmlnXCIse30pKXJldHVybiB0aGlzLmN1cnJlbnQ9dGhpcy51dGlsLmV4dGVuZCh0aGlzLmN1cnJlbnQsdGhpcy5kZWZhdWx0cyxhKSwhMDt0aGlzLmN1cnJlbnQ9dGhpcy51dGlsLmV4dGVuZCh0aGlzLmN1cnJlbnQsdGhpcy5kZWZhdWx0cyk7cmV0dXJuITF9LHNldEN1cnJlbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMudmFsaWRhdGUoYSx0aGlzLmRlZmF1bHRzLFwiY29uZmlnXCIsdGhpcy5pbml0T25seSk/KHRoaXMuY3VycmVudD10aGlzLnV0aWwuZXh0ZW5kKHRoaXMuY3VycmVudCxcbiAgYSksITApOiExfSx2YWxpZGF0ZTpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT0hMDtjPWN8fFwiXCI7ZD1kfHx7fTtmb3IodmFyIGYgaW4gYSlpZihhLmhhc093blByb3BlcnR5KGYpKWlmKGIuaGFzT3duUHJvcGVydHkoZikpe3ZhciBnPXR5cGVvZiBiW2ZdO2chPT10eXBlb2YgYVtmXT8oY29uc29sZS53YXJuKGMrXCIuXCIrZitcIjogcHJvcGVydHkgbXVzdCBiZSB0eXBlIFwiK2crXCIuXCIpLGU9ITEpOlwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhW2ZdKXx8dGhpcy52YWxpZGF0ZUFycmF5KGFbZl0sYltmXSxjK1wiLlwiK2YpP1wiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYVtmXSk/ZT10aGlzLnZhbGlkYXRlKGFbZl0sYltmXSxjK1wiLlwiK2YsZFtmXSk6ZC5oYXNPd25Qcm9wZXJ0eShmKSYmKGNvbnNvbGUud2FybihjK1wiLlwiK2YrXCI6IHByb3BlcnR5IGNhbm5vdCBiZSBzZXQgYWZ0ZXIgbG9hZC5cIiksZT0hMSk6XG4gIGU9ITF9ZWxzZSBjb25zb2xlLndhcm4oYytcIi5cIitmK1wiOiBwcm9wZXJ0eSBub3Qgc3VwcG9ydGVkLlwiKSxlPSExO3JldHVybiBlfSx2YWxpZGF0ZUFycmF5OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD0hMDtjPWN8fFwiXCI7Zm9yKHZhciBlPTA7ZTxhLmxlbmd0aDtlKyspdGhpcy51dGlsLmNvbnRhaW5zKGIsYVtlXSl8fChjb25zb2xlLndhcm4oYytcIltcIitlK1wiXTogaW52YWxpZCB2YWx1ZTogXCIrYVtlXStcIi5cIiksZD0hMSk7cmV0dXJuIGR9fTt2YXIgcT1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt0aGlzLnV0aWw9YTt0aGlzLmxvZz1iO3RoaXMub25FcnJvcj1jO3RoaXMub25GYXVsdD1kO3RoaXMuc2VyaWFsaXplPWU7Zy5lbmFibGVkJiYoZi5jb25zb2xlPXRoaXMud3JhcENvbnNvbGVPYmplY3QoZi5jb25zb2xlLGcpKX07cS5wcm90b3R5cGU9e3dyYXBDb25zb2xlT2JqZWN0OmZ1bmN0aW9uKGEsYil7YT1hfHx7fTt2YXIgYz1hLmxvZ3x8ZnVuY3Rpb24oKXt9LGQ9dGhpcyxlO2ZvcihlPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwO2U8Yi53YXRjaC5sZW5ndGg7ZSsrKShmdW5jdGlvbihlKXt2YXIgZz1hW2VdfHxjO2FbZV09ZnVuY3Rpb24oKXt0cnl7dmFyIGE9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtkLmxvZy5hZGQoXCJjXCIse3RpbWVzdGFtcDpkLnV0aWwuaXNvTm93KCksc2V2ZXJpdHk6ZSxtZXNzYWdlOmQuc2VyaWFsaXplKGEpfSk7aWYoYi5lcnJvciYmXCJlcnJvclwiPT09ZSl0cnl7dGhyb3cgRXJyb3IoYVswXSk7fWNhdGNoKGMpe2Qub25FcnJvcihcImNvbnNvbGVcIixjKX1iLmRpc3BsYXkmJihkLnV0aWwuaGFzRnVuY3Rpb24oZyxcImFwcGx5XCIpP2cuYXBwbHkodGhpcyxhKTpnKGFbMF0sYVsxXSxhWzJdKSl9Y2F0Y2goaCl7ZC5vbkZhdWx0KGgpfX19KShiLndhdGNoW2VdKTtyZXR1cm4gYX0scmVwb3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubG9nLmFsbChcImNcIil9fTt2YXIgcj1mdW5jdGlvbihhLGIsYyxkLGUpe3RoaXMuY29uZmlnPWE7dGhpcy51dGlsPWI7dGhpcy5sb2c9XG4gIGM7dGhpcy53aW5kb3c9ZDt0aGlzLmRvY3VtZW50PWU7dGhpcy5jb3JyZWxhdGlvbklkPXRoaXMudG9rZW49bnVsbDt0aGlzLmluaXRpYWxpemUoKX07ci5wcm90b3R5cGU9e2luaXRpYWxpemU6ZnVuY3Rpb24oKXt0aGlzLnRva2VuPXRoaXMuZ2V0Q3VzdG9tZXJUb2tlbigpO3RoaXMuY29ycmVsYXRpb25JZD10aGlzLmdldENvcnJlbGF0aW9uSWQoKX0sZ2V0Q3VzdG9tZXJUb2tlbjpmdW5jdGlvbigpe2lmKHRoaXMuY29uZmlnLmN1cnJlbnQudG9rZW4pcmV0dXJuIHRoaXMuY29uZmlnLmN1cnJlbnQudG9rZW47dmFyIGE9dGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtyZXR1cm4gYVthLmxlbmd0aC0xXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRva2VuXCIpfSxnZXRDb3JyZWxhdGlvbklkOmZ1bmN0aW9uKCl7dmFyIGE7dHJ5e2E9dGhpcy5kb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKVRyYWNrSlNcXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiQvLFxuICBcIiQxXCIpLGF8fChhPXRoaXMudXRpbC51dWlkKCksdGhpcy5kb2N1bWVudC5jb29raWU9XCJUcmFja0pTPVwiK2ErXCI7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVQ7IHBhdGg9L1wiKX1jYXRjaChiKXthPXRoaXMudXRpbC51dWlkKCl9cmV0dXJuIGF9LHJlcG9ydDpmdW5jdGlvbigpe3JldHVybnthcHBsaWNhdGlvbjp0aGlzLmNvbmZpZy5jdXJyZW50LmFwcGxpY2F0aW9uLGNvcnJlbGF0aW9uSWQ6dGhpcy5jb3JyZWxhdGlvbklkLHNlc3Npb25JZDp0aGlzLmNvbmZpZy5jdXJyZW50LnNlc3Npb25JZCx0b2tlbjp0aGlzLnRva2VuLHVzZXJJZDp0aGlzLmNvbmZpZy5jdXJyZW50LnVzZXJJZCx2ZXJzaW9uOnRoaXMuY29uZmlnLmN1cnJlbnQudmVyc2lvbn19fTt2YXIgcz1mdW5jdGlvbihhKXt0aGlzLmxvYWRlZE9uPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3RoaXMud2luZG93PWF9O3MucHJvdG90eXBlPXtkaXNjb3ZlckRlcGVuZGVuY2llczpmdW5jdGlvbigpe3ZhciBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiPXt9O3RoaXMud2luZG93LmpRdWVyeSYmKHRoaXMud2luZG93LmpRdWVyeS5mbiYmdGhpcy53aW5kb3cualF1ZXJ5LmZuLmpxdWVyeSkmJihiLmpRdWVyeT10aGlzLndpbmRvdy5qUXVlcnkuZm4uanF1ZXJ5KTt0aGlzLndpbmRvdy5qUXVlcnkmJih0aGlzLndpbmRvdy5qUXVlcnkudWkmJnRoaXMud2luZG93LmpRdWVyeS51aS52ZXJzaW9uKSYmKGIualF1ZXJ5VUk9dGhpcy53aW5kb3cualF1ZXJ5LnVpLnZlcnNpb24pO3RoaXMud2luZG93LmFuZ3VsYXImJih0aGlzLndpbmRvdy5hbmd1bGFyLnZlcnNpb24mJnRoaXMud2luZG93LmFuZ3VsYXIudmVyc2lvbi5mdWxsKSYmKGIuYW5ndWxhcj10aGlzLndpbmRvdy5hbmd1bGFyLnZlcnNpb24uZnVsbCk7Zm9yKGEgaW4gdGhpcy53aW5kb3cpaWYoXCJfdHJhY2tKc1wiIT09YSYmXCJfdHJhY2tKU1wiIT09YSYmXCJfdHJhY2tqc1wiIT09YSYmXCJ3ZWJraXRTdG9yYWdlSW5mb1wiIT09YSYmXCJ3ZWJraXRJbmRleGVkREJcIiE9PWEpdHJ5e2lmKHRoaXMud2luZG93W2FdKXt2YXIgYz1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpbmRvd1thXS52ZXJzaW9ufHx0aGlzLndpbmRvd1thXS5WZXJzaW9ufHx0aGlzLndpbmRvd1thXS5WRVJTSU9OO1wic3RyaW5nXCI9PT10eXBlb2YgYyYmKGJbYV09Yyl9fWNhdGNoKGQpe31yZXR1cm4gYn0scmVwb3J0OmZ1bmN0aW9uKCl7cmV0dXJue2FnZToobmV3IERhdGUpLmdldFRpbWUoKS10aGlzLmxvYWRlZE9uLGRlcGVuZGVuY2llczp0aGlzLmRpc2NvdmVyRGVwZW5kZW5jaWVzKCksdXNlckFnZW50OnRoaXMud2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsdmlld3BvcnRIZWlnaHQ6dGhpcy53aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCx2aWV3cG9ydFdpZHRoOnRoaXMud2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aH19fTt2YXIgdj1mdW5jdGlvbihhKXt0aGlzLnV0aWw9YTt0aGlzLmFwcGVuZGVyPVtdO3RoaXMubWF4TGVuZ3RoPTMwfTt2LnByb3RvdHlwZT17YWxsOmZ1bmN0aW9uKGEpe3ZhciBiPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdLGMsZDtmb3IoZD0wO2Q8dGhpcy5hcHBlbmRlci5sZW5ndGg7ZCsrKShjPXRoaXMuYXBwZW5kZXJbZF0pJiZjLmNhdGVnb3J5PT09YSYmYi5wdXNoKGMudmFsdWUpO3JldHVybiBifSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuYXBwZW5kZXIubGVuZ3RoPTB9LHRydW5jYXRlOmZ1bmN0aW9uKCl7dGhpcy5hcHBlbmRlci5sZW5ndGg+dGhpcy5tYXhMZW5ndGgmJih0aGlzLmFwcGVuZGVyPXRoaXMuYXBwZW5kZXIuc2xpY2UoTWF0aC5tYXgodGhpcy5hcHBlbmRlci5sZW5ndGgtdGhpcy5tYXhMZW5ndGgsMCkpKX0sYWRkOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy51dGlsLnV1aWQoKTt0aGlzLmFwcGVuZGVyLnB1c2goe2tleTpjLGNhdGVnb3J5OmEsdmFsdWU6Yn0pO3RoaXMudHJ1bmNhdGUoKTtyZXR1cm4gY30sZ2V0OmZ1bmN0aW9uKGEsYil7dmFyIGMsZDtmb3IoZD0wO2Q8dGhpcy5hcHBlbmRlci5sZW5ndGg7ZCsrKWlmKGM9dGhpcy5hcHBlbmRlcltkXSxjLmNhdGVnb3J5PT09YSYmXG4gIGMua2V5PT09YilyZXR1cm4gYy52YWx1ZTtyZXR1cm4hMX19O3ZhciB3PWZ1bmN0aW9uKGEsYixjLGQsZSxmKXt0aGlzLnV0aWw9YTt0aGlzLmxvZz1iO3RoaXMub25FcnJvcj1jO3RoaXMub25GYXVsdD1kO3RoaXMud2luZG93PWU7dGhpcy5vcHRpb25zPWY7Zi5lbmFibGVkJiZ0aGlzLmluaXRpYWxpemUoZSl9O3cucHJvdG90eXBlPXtpbml0aWFsaXplOmZ1bmN0aW9uKGEpe2EuWE1MSHR0cFJlcXVlc3QmJnRoaXMudXRpbC5oYXNGdW5jdGlvbihhLlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuLFwiYXBwbHlcIikmJnRoaXMud2F0Y2hOZXR3b3JrT2JqZWN0KGEuWE1MSHR0cFJlcXVlc3QpO2EuWERvbWFpblJlcXVlc3QmJnRoaXMudXRpbC5oYXNGdW5jdGlvbihhLlhEb21haW5SZXF1ZXN0LnByb3RvdHlwZS5vcGVuLFwiYXBwbHlcIikmJnRoaXMud2F0Y2hOZXR3b3JrT2JqZWN0KGEuWERvbWFpblJlcXVlc3QpfSx3YXRjaE5ldHdvcmtPYmplY3Q6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjPWEucHJvdG90eXBlLm9wZW4sZD1hLnByb3RvdHlwZS5zZW5kO2EucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oYSxiKXswPmIuaW5kZXhPZihcImxvY2FsaG9zdDowXCIpJiYodGhpcy5fdHJhY2tKcz17bWV0aG9kOmEsdXJsOmJ9KTtyZXR1cm4gYy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O2EucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oKXt0cnl7aWYoIXRoaXMuX3RyYWNrSnMpcmV0dXJuIGQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3RoaXMuX3RyYWNrSnMubG9nSWQ9Yi5sb2cuYWRkKFwiblwiLHtzdGFydGVkT246Yi51dGlsLmlzb05vdygpLG1ldGhvZDp0aGlzLl90cmFja0pzLm1ldGhvZCx1cmw6dGhpcy5fdHJhY2tKcy51cmx9KTtiLmxpc3RlbkZvck5ldHdvcmtDb21wbGV0ZSh0aGlzKX1jYXRjaChhKXtiLm9uRmF1bHQoYSl9cmV0dXJuIGQuYXBwbHkodGhpcyxhcmd1bWVudHMpfTtyZXR1cm4gYX0sbGlzdGVuRm9yTmV0d29ya0NvbXBsZXRlOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7XG4gIGIud2luZG93LlByb2dyZXNzRXZlbnQmJmEuYWRkRXZlbnRMaXN0ZW5lciYmYS5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGZ1bmN0aW9uKCl7ND09PWEucmVhZHlTdGF0ZSYmYi5maW5hbGl6ZU5ldHdvcmtFdmVudChhKX0sITApO2EuYWRkRXZlbnRMaXN0ZW5lcj9hLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtiLmZpbmFsaXplTmV0d29ya0V2ZW50KGEpO2IuY2hlY2tOZXR3b3JrRmF1bHQoYSl9LCEwKTpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dHJ5e3ZhciBjPWEub25sb2FkO2Eub25sb2FkPWZ1bmN0aW9uKCl7Yi5maW5hbGl6ZU5ldHdvcmtFdmVudChhKTtiLmNoZWNrTmV0d29ya0ZhdWx0KGEpO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBjJiZiLnV0aWwuaGFzRnVuY3Rpb24oYyxcImFwcGx5XCIpJiZjLmFwcGx5KGEsYXJndW1lbnRzKX07dmFyIGQ9YS5vbmVycm9yO2Eub25lcnJvcj1mdW5jdGlvbigpe2IuZmluYWxpemVOZXR3b3JrRXZlbnQoYSk7XG4gICAgYi5jaGVja05ldHdvcmtGYXVsdChhKTtcImZ1bmN0aW9uXCI9PT10eXBlb2Ygb2xkT25FcnJvciYmZC5hcHBseShhLGFyZ3VtZW50cyl9fWNhdGNoKGUpe2Iub25GYXVsdChlKX19LDApfSxmaW5hbGl6ZU5ldHdvcmtFdmVudDpmdW5jdGlvbihhKXtpZihhLl90cmFja0pzKXt2YXIgYj10aGlzLmxvZy5nZXQoXCJuXCIsYS5fdHJhY2tKcy5sb2dJZCk7YiYmKGIuY29tcGxldGVkT249dGhpcy51dGlsLmlzb05vdygpLGIuc3RhdHVzQ29kZT0xMjIzPT1hLnN0YXR1cz8yMDQ6YS5zdGF0dXMsYi5zdGF0dXNUZXh0PTEyMjM9PWEuc3RhdHVzP1wiTm8gQ29udGVudFwiOmEuc3RhdHVzVGV4dCl9fSxjaGVja05ldHdvcmtGYXVsdDpmdW5jdGlvbihhKXtpZih0aGlzLm9wdGlvbnMuZXJyb3ImJjQwMDw9YS5zdGF0dXMmJjEyMjMhPWEuc3RhdHVzKXt2YXIgYj1hLl90cmFja0pzfHx7fTt0aGlzLm9uRXJyb3IoXCJhamF4XCIsYS5zdGF0dXMrXCIgXCIrYS5zdGF0dXNUZXh0K1wiOiBcIitiLm1ldGhvZCtcIiBcIitiLnVybCl9fSxcbiAgcmVwb3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubG9nLmFsbChcIm5cIil9fTt2YXIgbj1mdW5jdGlvbihhKXt0aGlzLnV0aWw9YTt0aGlzLmRpc2FibGVkPSExO3RoaXMudGhyb3R0bGVTdGF0cz17YXR0ZW1wdENvdW50OjAsdGhyb3R0bGVkQ291bnQ6MCxsYXN0QXR0ZW1wdDoobmV3IERhdGUpLmdldFRpbWUoKX07aC5KU09OJiZoLkpTT04uc3RyaW5naWZ5fHwodGhpcy5kaXNhYmxlZD0hMCl9O24ucHJvdG90eXBlPXtlcnJvckVuZHBvaW50OmZ1bmN0aW9uKGEsYil7Yj0oYnx8XCJodHRwczovL2NhcHR1cmUudHJhY2tqcy5jb20vY2FwdHVyZVwiKSsoXCI/dG9rZW49XCIrYSk7cmV0dXJuIHRoaXMudXRpbC5pc0Jyb3dzZXJJRSgpP1wiLy9cIitiLnNwbGl0KFwiOi8vXCIpWzFdOmJ9LHVzYWdlRW5kcG9pbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYXBwZW5kT2JqZWN0QXNRdWVyeShhLFwiaHR0cHM6Ly91c2FnZS50cmFja2pzLmNvbS91c2FnZS5naWZcIil9LHRyYWNrZXJGYXVsdEVuZHBvaW50OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmFwcGVuZE9iamVjdEFzUXVlcnkoYSxcbiAgXCJodHRwczovL3VzYWdlLnRyYWNranMuY29tL2ZhdWx0LmdpZlwiKX0sYXBwZW5kT2JqZWN0QXNRdWVyeTpmdW5jdGlvbihhLGIpe2IrPVwiP1wiO2Zvcih2YXIgYyBpbiBhKWEuaGFzT3duUHJvcGVydHkoYykmJihiKz1lbmNvZGVVUklDb21wb25lbnQoYykrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGFbY10pK1wiJlwiKTtyZXR1cm4gYn0sZ2V0Q09SU1JlcXVlc3Q6ZnVuY3Rpb24oYSxiKXt2YXIgYz1uZXcgaC5YTUxIdHRwUmVxdWVzdDtcIndpdGhDcmVkZW50aWFsc1wiaW4gYz8oYy5vcGVuKGEsYiksYy5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXCJ0ZXh0L3BsYWluXCIpKTpcInVuZGVmaW5lZFwiIT09dHlwZW9mIGguWERvbWFpblJlcXVlc3Q/KGM9bmV3IGguWERvbWFpblJlcXVlc3QsYy5vcGVuKGEsYikpOmM9bnVsbDtyZXR1cm4gY30sc2VuZFRyYWNrZXJGYXVsdDpmdW5jdGlvbihhKXt0aGlzLnRocm90dGxlKGEpfHwoKG5ldyBJbWFnZSkuc3JjPXRoaXMudHJhY2tlckZhdWx0RW5kcG9pbnQoYSkpfSxcbiAgc2VuZFVzYWdlOmZ1bmN0aW9uKGEpeyhuZXcgSW1hZ2UpLnNyYz10aGlzLnVzYWdlRW5kcG9pbnQoYSl9LHNlbmRFcnJvcjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7aWYoIXRoaXMuZGlzYWJsZWQmJiF0aGlzLnRocm90dGxlKGEpKXRyeXt2YXIgZD10aGlzLmdldENPUlNSZXF1ZXN0KFwiUE9TVFwiLHRoaXMuZXJyb3JFbmRwb2ludChiKSk7ZC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXs0PT09ZC5yZWFkeVN0YXRlJiYyMDAhPT1kLnN0YXR1cyYmKGMuZGlzYWJsZWQ9ITApfTtkLl90cmFja0pzPWs7ZC5zZW5kKGguSlNPTi5zdHJpbmdpZnkoYSkpfWNhdGNoKGUpe3Rocm93IHRoaXMuZGlzYWJsZWQ9ITAsZTt9fSx0aHJvdHRsZTpmdW5jdGlvbihhKXt2YXIgYj0obmV3IERhdGUpLmdldFRpbWUoKTt0aGlzLnRocm90dGxlU3RhdHMuYXR0ZW1wdENvdW50Kys7aWYodGhpcy50aHJvdHRsZVN0YXRzLmxhc3RBdHRlbXB0KzFFMz49Yil7aWYodGhpcy50aHJvdHRsZVN0YXRzLmxhc3RBdHRlbXB0PVxuICAgICAgYiwxMDx0aGlzLnRocm90dGxlU3RhdHMuYXR0ZW1wdENvdW50KXJldHVybiB0aGlzLnRocm90dGxlU3RhdHMudGhyb3R0bGVkQ291bnQrKywhMH1lbHNlIGEudGhyb3R0bGVkPXRoaXMudGhyb3R0bGVTdGF0cy50aHJvdHRsZWRDb3VudCx0aGlzLnRocm90dGxlU3RhdHMuYXR0ZW1wdENvdW50PTAsdGhpcy50aHJvdHRsZVN0YXRzLmxhc3RBdHRlbXB0PWIsdGhpcy50aHJvdHRsZVN0YXRzLnRocm90dGxlZENvdW50PTA7cmV0dXJuITF9fTt2YXIgeD1mdW5jdGlvbihhKXt0aGlzLndpbmRvdz1hfTt4LnByb3RvdHlwZT17YmluZDpmdW5jdGlvbihhLGIpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBhLmFwcGx5KGIsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9fSxjb250YWluczpmdW5jdGlvbihhLGIpe3ZhciBjO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspaWYoYVtjXT09PWIpcmV0dXJuITA7cmV0dXJuITF9LGRlZmVyOmZ1bmN0aW9uKGEsYil7c2V0VGltZW91dChmdW5jdGlvbigpe2EuYXBwbHkoYil9KX0sXG4gIGV4dGVuZDpmdW5jdGlvbihhKXtmb3IodmFyIGIsYz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSksZD0wO2Q8Yy5sZW5ndGg7ZCsrKWZvcihiIGluIGNbZF0pbnVsbD09PWNbZF1bYl18fGNbZF1bYl09PT1rP2FbYl09Y1tkXVtiXTpcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNbZF1bYl0pPyhhW2JdPWFbYl18fHt9LHRoaXMuZXh0ZW5kKGFbYl0sY1tkXVtiXSkpOmFbYl09Y1tkXVtiXTtyZXR1cm4gYX0saGFzRnVuY3Rpb246ZnVuY3Rpb24oYSxiKXt0cnl7cmV0dXJuISFhW2JdfWNhdGNoKGMpe3JldHVybiExfX0saXNCcm93c2VySUU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LGI9YS5tYXRjaCgvVHJpZGVudFxcLyhbXFxkLl0rKS8pO3JldHVybiBiJiZcIjcuMFwiPT09YlsxXT8xMTooYT1hLm1hdGNoKC9NU0lFIChbXFxkLl0rKS8pKT9wYXJzZUludChhWzFdLDEwKTohMX0sXG4gIGlzQnJvd3NlclN1cHBvcnRlZDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuaXNCcm93c2VySUUoKTtyZXR1cm4hYXx8ODw9YX0saXNvTm93OmZ1bmN0aW9uKCl7dmFyIGE9bmV3IERhdGU7cmV0dXJuIGEudG9JU09TdHJpbmc/YS50b0lTT1N0cmluZygpOmEuZ2V0VVRDRnVsbFllYXIoKStcIi1cIit0aGlzLnBhZChhLmdldFVUQ01vbnRoKCkrMSkrXCItXCIrdGhpcy5wYWQoYS5nZXRVVENEYXRlKCkpK1wiVFwiK3RoaXMucGFkKGEuZ2V0VVRDSG91cnMoKSkrXCI6XCIrdGhpcy5wYWQoYS5nZXRVVENNaW51dGVzKCkpK1wiOlwiK3RoaXMucGFkKGEuZ2V0VVRDU2Vjb25kcygpKStcIi5cIitTdHJpbmcoKGEuZ2V0VVRDTWlsbGlzZWNvbmRzKCkvMUUzKS50b0ZpeGVkKDMpKS5zbGljZSgyLDUpK1wiWlwifSxwYWQ6ZnVuY3Rpb24oYSl7YT1TdHJpbmcoYSk7MT09PWEubGVuZ3RoJiYoYT1cIjBcIithKTtyZXR1cm4gYX0sdXVpZDpmdW5jdGlvbigpe3JldHVyblwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCIucmVwbGFjZSgvW3h5XS9nLFxuICAgIGZ1bmN0aW9uKGEpe3ZhciBiPTE2Kk1hdGgucmFuZG9tKCl8MDtyZXR1cm4oXCJ4XCI9PWE/YjpiJjN8OCkudG9TdHJpbmcoMTYpfSl9LHdyYXBFcnJvcjpmdW5jdGlvbihhKXtpZihhLmlubmVyRXJyb3IpcmV0dXJuIGE7dmFyIGI9RXJyb3IoXCJUcmFja0pTIENhdWdodDogXCIrKGEubWVzc2FnZXx8YSkpO2IuZGVzY3JpcHRpb249XCJUcmFja0pTIENhdWdodDogXCIrYS5kZXNjcmlwdGlvbjtiLmZpbGU9YS5maWxlO2IubGluZT1hLmxpbmV8fGEubGluZU51bWJlcjtiLmNvbHVtbj1hLmNvbHVtbnx8YS5jb2x1bW5OdW1iZXI7Yi5zdGFjaz1hLnN0YWNrO2IuaW5uZXJFcnJvcj1hO3JldHVybiBifX07dmFyIHk9ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3RoaXMudXRpbD1hO3RoaXMubG9nPWI7dGhpcy5vbkVycm9yPWM7dGhpcy5vbkZhdWx0PWQ7dGhpcy5vcHRpb25zPWY7dGhpcy5kb2N1bWVudD1lO2YuZW5hYmxlZCYmdGhpcy5pbml0aWFsaXplKGUpfTt5LnByb3RvdHlwZT17aW5pdGlhbGl6ZTpmdW5jdGlvbihhKXt2YXIgYj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51dGlsLmJpbmQodGhpcy5vbkRvY3VtZW50Q2xpY2tlZCx0aGlzKSxjPXRoaXMudXRpbC5iaW5kKHRoaXMub25JbnB1dENoYW5nZWQsdGhpcyk7YS5hZGRFdmVudExpc3RlbmVyPyhhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGIsITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIixjLCEwKSk6YS5hdHRhY2hFdmVudCYmKGEuYXR0YWNoRXZlbnQoXCJvbmNsaWNrXCIsYiksYS5hdHRhY2hFdmVudChcIm9uZm9jdXNvdXRcIixjKSl9LG9uRG9jdW1lbnRDbGlja2VkOmZ1bmN0aW9uKGEpe3RyeXt2YXIgYj10aGlzLmdldEVsZW1lbnRGcm9tRXZlbnQoYSk7YiYmYi50YWdOYW1lJiYodGhpcy5pc0Rlc2NyaWJlZEVsZW1lbnQoYixcImFcIil8fHRoaXMuaXNEZXNjcmliZWRFbGVtZW50KGIsXCJidXR0b25cIil8fHRoaXMuaXNEZXNjcmliZWRFbGVtZW50KGIsXCJpbnB1dFwiLFtcImJ1dHRvblwiLFwic3VibWl0XCJdKT90aGlzLndyaXRlVmlzaXRvckV2ZW50KGIsXCJjbGlja1wiKTp0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFxuICBcImlucHV0XCIsW1wiY2hlY2tib3hcIixcInJhZGlvXCJdKSYmdGhpcy53cml0ZVZpc2l0b3JFdmVudChiLFwiaW5wdXRcIixiLnZhbHVlLGIuY2hlY2tlZCkpfWNhdGNoKGMpe3RoaXMub25GYXVsdChjKX19LG9uSW5wdXRDaGFuZ2VkOmZ1bmN0aW9uKGEpe3RyeXt2YXIgYj10aGlzLmdldEVsZW1lbnRGcm9tRXZlbnQoYSk7aWYoYiYmYi50YWdOYW1lKWlmKHRoaXMuaXNEZXNjcmliZWRFbGVtZW50KGIsXCJ0ZXh0YXJlYVwiKSl0aGlzLndyaXRlVmlzaXRvckV2ZW50KGIsXCJpbnB1dFwiLGIudmFsdWUpO2Vsc2UgaWYodGhpcy5pc0Rlc2NyaWJlZEVsZW1lbnQoYixcInNlbGVjdFwiKSYmYi5vcHRpb25zJiZiLm9wdGlvbnMubGVuZ3RoKXRoaXMub25TZWxlY3RJbnB1dENoYW5nZWQoYik7ZWxzZSB0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFwiaW5wdXRcIikmJiF0aGlzLmlzRGVzY3JpYmVkRWxlbWVudChiLFwiaW5wdXRcIixbXCJidXR0b25cIixcInN1Ym1pdFwiLFwiaGlkZGVuXCIsXCJjaGVja2JveFwiLFwicmFkaW9cIl0pJiZcbnRoaXMud3JpdGVWaXNpdG9yRXZlbnQoYixcImlucHV0XCIsYi52YWx1ZSl9Y2F0Y2goYyl7dGhpcy5vbkZhdWx0KGMpfX0sb25TZWxlY3RJbnB1dENoYW5nZWQ6ZnVuY3Rpb24oYSl7aWYoYS5tdWx0aXBsZSlmb3IodmFyIGI9MDtiPGEub3B0aW9ucy5sZW5ndGg7YisrKWEub3B0aW9uc1tiXS5zZWxlY3RlZCYmdGhpcy53cml0ZVZpc2l0b3JFdmVudChhLFwiaW5wdXRcIixhLm9wdGlvbnNbYl0udmFsdWUpO2Vsc2UgMDw9YS5zZWxlY3RlZEluZGV4JiZhLm9wdGlvbnNbYS5zZWxlY3RlZEluZGV4XSYmdGhpcy53cml0ZVZpc2l0b3JFdmVudChhLFwiaW5wdXRcIixhLm9wdGlvbnNbYS5zZWxlY3RlZEluZGV4XS52YWx1ZSl9LHdyaXRlVmlzaXRvckV2ZW50OmZ1bmN0aW9uKGEsYixjLGQpe1wicGFzc3dvcmRcIj09PXRoaXMuZ2V0RWxlbWVudFR5cGUoYSkmJihjPWspO3RoaXMubG9nLmFkZChcInZcIix7dGltZXN0YW1wOnRoaXMudXRpbC5pc29Ob3coKSxhY3Rpb246YixlbGVtZW50Ont0YWc6YS50YWdOYW1lLnRvTG93ZXJDYXNlKCksXG4gIGF0dHJpYnV0ZXM6dGhpcy5nZXRFbGVtZW50QXR0cmlidXRlcyhhKSx2YWx1ZTp0aGlzLmdldE1ldGFWYWx1ZShjLGQpfX0pfSxnZXRFbGVtZW50RnJvbUV2ZW50OmZ1bmN0aW9uKGEpe3JldHVybiBhLnRhcmdldHx8cC5lbGVtZW50RnJvbVBvaW50KGEuY2xpZW50WCxhLmNsaWVudFkpfSxpc0Rlc2NyaWJlZEVsZW1lbnQ6ZnVuY3Rpb24oYSxiLGMpe2lmKGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpIT09Yi50b0xvd2VyQ2FzZSgpKXJldHVybiExO2lmKCFjKXJldHVybiEwO2E9dGhpcy5nZXRFbGVtZW50VHlwZShhKTtmb3IoYj0wO2I8Yy5sZW5ndGg7YisrKWlmKGNbYl09PT1hKXJldHVybiEwO3JldHVybiExfSxnZXRFbGVtZW50VHlwZTpmdW5jdGlvbihhKXtyZXR1cm4oYS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpfHxcIlwiKS50b0xvd2VyQ2FzZSgpfSxnZXRFbGVtZW50QXR0cmlidXRlczpmdW5jdGlvbihhKXtmb3IodmFyIGI9e30sYz0wO2M8YS5hdHRyaWJ1dGVzLmxlbmd0aDtjKyspXCJ2YWx1ZVwiIT09XG5hLmF0dHJpYnV0ZXNbY10ubmFtZS50b0xvd2VyQ2FzZSgpJiYoYlthLmF0dHJpYnV0ZXNbY10ubmFtZV09YS5hdHRyaWJ1dGVzW2NdLnZhbHVlKTtyZXR1cm4gYn0sZ2V0TWV0YVZhbHVlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9PT1rP2s6e2xlbmd0aDphLmxlbmd0aCxwYXR0ZXJuOnRoaXMubWF0Y2hJbnB1dFBhdHRlcm4oYSksY2hlY2tlZDpifX0sbWF0Y2hJbnB1dFBhdHRlcm46ZnVuY3Rpb24oYSl7cmV0dXJuXCJcIj09PWE/XCJlbXB0eVwiOi9eW2EtejAtOSEjJCUmJyorPT9eX2B7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorPT9eX2B7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pPyQvLnRlc3QoYSk/XCJlbWFpbFwiOi9eKDA/WzEtOV18WzEyXVswLTldfDNbMDFdKVtcXC9cXC1dKDA/WzEtOV18MVswMTJdKVtcXC9cXC1dXFxkezR9JC8udGVzdChhKXx8L14oXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0wP1sxLTldfFsxMl1bMC05XXwzWzAxXSkkLy50ZXN0KGEpP1xuICBcImRhdGVcIjovXig/Oig/OlxcKz8xXFxzKig/OlsuLV1cXHMqKT8pPyg/OlxcKFxccyooWzItOV0xWzAyLTldfFsyLTldWzAyLThdMXxbMi05XVswMi04XVswMi05XSlcXHMqXFwpfChbMi05XTFbMDItOV18WzItOV1bMDItOF0xfFsyLTldWzAyLThdWzAyLTldKSlcXHMqKD86Wy4tXVxccyopPyk/KFsyLTldMVswMi05XXxbMi05XVswMi05XTF8WzItOV1bMDItOV17Mn0pXFxzKig/OlsuLV1cXHMqKT8oWzAtOV17NH0pKD86XFxzKig/OiN8eFxcLj98ZXh0XFwuP3xleHRlbnNpb24pXFxzKihcXGQrKSk/JC8udGVzdChhKT9cInVzcGhvbmVcIjovXlxccyokLy50ZXN0KGEpP1wid2hpdGVzcGFjZVwiOi9eXFxkKiQvLnRlc3QoYSk/XCJudW1lcmljXCI6L15bYS16QS1aXSokLy50ZXN0KGEpP1wiYWxwaGFcIjovXlthLXpBLVowLTldKiQvLnRlc3QoYSk/XCJhbHBoYW51bWVyaWNcIjpcImNoYXJhY3RlcnNcIn0scmVwb3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubG9nLmFsbChcInZcIil9fTt2YXIgej1mdW5jdGlvbihhLGIsYyxkLGUpe3RoaXMub25FcnJvcj1cbiAgYTt0aGlzLm9uRmF1bHQ9Yjt0aGlzLnNlcmlhbGl6ZT1jO2UuZW5hYmxlZCYmdGhpcy53YXRjaFdpbmRvd0Vycm9ycyhkKX07ei5wcm90b3R5cGU9e3dhdGNoV2luZG93RXJyb3JzOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7YS5vbmVycm9yPWZ1bmN0aW9uKGEsZCxlLGYsZyl7dHJ5e2c9Z3x8e30sZy5tZXNzYWdlPWcubWVzc2FnZXx8Yi5zZXJpYWxpemUoYSksZy5maWxlPWcuZmlsZXx8Yi5zZXJpYWxpemUoZCksZy5saW5lPWcubGluZXx8cGFyc2VJbnQoZSwxMCl8fG51bGwsZy5jb2x1bW49Zy5jb2x1bW58fHBhcnNlSW50KGYsMTApfHxudWxsLGIub25FcnJvcihcIndpbmRvd1wiLGcpfWNhdGNoKGgpe2Iub25GYXVsdChoKX19fX07dmFyIEE9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyxoLGssbCxtLG4scCx0LHEscil7dHJ5e3RoaXMud2luZG93PXEsdGhpcy5kb2N1bWVudD1yLHRoaXMudXRpbD1uZXcgbSh0aGlzLndpbmRvdyksdGhpcy5vbkVycm9yPXRoaXMudXRpbC5iaW5kKHRoaXMub25FcnJvcixcbiAgdGhpcyksdGhpcy5vbkZhdWx0PXRoaXMudXRpbC5iaW5kKHRoaXMub25GYXVsdCx0aGlzKSx0aGlzLnNlcmlhbGl6ZT10aGlzLnV0aWwuYmluZCh0aGlzLnNlcmlhbGl6ZSx0aGlzKSx0aGlzLnRyYW5zbWl0dGVyPW5ldyBsKHRoaXMudXRpbCksdGhpcy5jb25maWc9bmV3IGQodGhpcy51dGlsLGEpLHRoaXMubG9nPW5ldyBoKHRoaXMudXRpbCksdGhpcy5hcGk9bmV3IGIodGhpcy5jb25maWcsdGhpcy51dGlsLHRoaXMub25FcnJvciksdGhpcy5lbnZpcm9ubWVudD1uZXcgZyh0aGlzLndpbmRvdyksdGhpcy5jdXN0b21lcj1uZXcgZih0aGlzLmNvbmZpZyx0aGlzLnV0aWwsdGhpcy5sb2csdGhpcy53aW5kb3csdGhpcy5kb2N1bWVudCksdGhpcy5jdXN0b21lci50b2tlbiYmKHRoaXMuY29uZmlnLmN1cnJlbnQuZW5hYmxlZCYmdGhpcy50cmFuc21pdHRlci5zZW5kVXNhZ2Uoe3Rva2VuOnRoaXMuY3VzdG9tZXIudG9rZW4sY29ycmVsYXRpb25JZDp0aGlzLmN1c3RvbWVyLmNvcnJlbGF0aW9uSWQsXG4gIGFwcGxpY2F0aW9uOnRoaXMuY29uZmlnLmN1cnJlbnQuYXBwbGljYXRpb24seDp0aGlzLnV0aWwudXVpZCgpfSksdGhpcy5hcGlDb25zb2xlV2F0Y2hlcj1uZXcgZSh0aGlzLnV0aWwsdGhpcy5sb2csdGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLnNlcmlhbGl6ZSx0aGlzLmFwaSx0aGlzLmNvbmZpZy5kZWZhdWx0cy5jb25zb2xlKSx0aGlzLndpbmRvd0NvbnNvbGVXYXRjaGVyPW5ldyBlKHRoaXMudXRpbCx0aGlzLmxvZyx0aGlzLm9uRXJyb3IsdGhpcy5vbkZhdWx0LHRoaXMuc2VyaWFsaXplLHRoaXMud2luZG93LHRoaXMuY29uZmlnLmN1cnJlbnQuY29uc29sZSksdGhpcy51dGlsLmlzQnJvd3NlclN1cHBvcnRlZCgpJiZ0aGlzLmNvbmZpZy5jdXJyZW50LmVuYWJsZWQmJih0aGlzLmNhbGxiYWNrV2F0Y2hlcj1uZXcgYyh0aGlzLnV0aWwsdGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLndpbmRvdyx0aGlzLmNvbmZpZy5jdXJyZW50LmNhbGxiYWNrKSx0aGlzLnZpc2l0b3JXYXRjaGVyPVxuICBuZXcgbih0aGlzLnV0aWwsdGhpcy5sb2csdGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLmRvY3VtZW50LHRoaXMuY29uZmlnLmN1cnJlbnQudmlzaXRvciksdGhpcy5uZXR3b3JrV2F0Y2hlcj1uZXcgayh0aGlzLnV0aWwsdGhpcy5sb2csdGhpcy5vbkVycm9yLHRoaXMub25GYXVsdCx0aGlzLndpbmRvdyx0aGlzLmNvbmZpZy5jdXJyZW50Lm5ldHdvcmspLHRoaXMud2luZG93V2F0Y2hlcj1uZXcgcCh0aGlzLm9uRXJyb3IsdGhpcy5vbkZhdWx0LHRoaXMuc2VyaWFsaXplLHRoaXMud2luZG93LHRoaXMuY29uZmlnLmN1cnJlbnQud2luZG93KSkpfWNhdGNoKHMpe3RoaXMub25GYXVsdChzKX19O0EucHJvdG90eXBlPXtyZXZlYWw6ZnVuY3Rpb24oKXtpZih0aGlzLmN1c3RvbWVyLnRva2VuKXJldHVybiB0aGlzLmFwaTt0aGlzLndpbmRvdy5jb25zb2xlJiZ0aGlzLndpbmRvdy5jb25zb2xlLndhcm4mJnRoaXMud2luZG93LmNvbnNvbGUud2FybihcIlRyYWNrSlMgY291bGQgbm90IGZpbmQgYSB0b2tlblwiKTtcbiAgcmV0dXJuIGt9LG9uRXJyb3I6ZnVuY3Rpb24oYSxiLGMpe2lmKHRoaXMudXRpbC5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSYmdGhpcy5jb25maWcuY3VycmVudC5lbmFibGVkKXRyeXtiPWJ8fHt9O2M9Y3x8e2JpbmRTdGFjazpudWxsLGJpbmRUaW1lOm51bGwsZm9yY2U6ITF9O3ZhciBkPWIubWVzc2FnZXx8YjtpZighZHx8IWQuaW5kZXhPZnx8LTE9PT1kLmluZGV4T2YoXCJUcmFja0pTIENhdWdodFwiKSl7dmFyIGU9dGhpcy51dGlsLmV4dGVuZCh7fSx7YmluZFN0YWNrOmMuYmluZFN0YWNrLGJpbmRUaW1lOmMuYmluZFRpbWUsY29sdW1uOmIuY29sdW1ufHxiLmNvbHVtbk51bWJlcixjb25zb2xlOnRoaXMud2luZG93Q29uc29sZVdhdGNoZXIucmVwb3J0KCksY3VzdG9tZXI6dGhpcy5jdXN0b21lci5yZXBvcnQoKSxlbnRyeTphLGVudmlyb25tZW50OnRoaXMuZW52aXJvbm1lbnQucmVwb3J0KCksZmlsZTpiLmZpbGV8fGIuZmlsZU5hbWUsbGluZTpiLmxpbmV8fGIubGluZU51bWJlcixtZXNzYWdlOmMuZm9yY2U/XG4gIGQ6dGhpcy5zZXJpYWxpemUoZCksbmV0d29yazp0aGlzLm5ldHdvcmtXYXRjaGVyLnJlcG9ydCgpLHVybDooaC5sb2NhdGlvbnx8XCJcIikudG9TdHJpbmcoKSxzdGFjazpiLnN0YWNrLHRpbWVzdGFtcDp0aGlzLnV0aWwuaXNvTm93KCksdmlzaXRvcjp0aGlzLnZpc2l0b3JXYXRjaGVyLnJlcG9ydCgpLHZlcnNpb246XCIyLjEuOVwifSk7aWYoIWMuZm9yY2UpdHJ5e2lmKCF0aGlzLmNvbmZpZy5jdXJyZW50Lm9uRXJyb3IoZSxiKSlyZXR1cm59Y2F0Y2goZil7ZS5jb25zb2xlLnB1c2goe3RpbWVzdGFtcDp0aGlzLnV0aWwuaXNvTm93KCksc2V2ZXJpdHk6XCJlcnJvclwiLG1lc3NhZ2U6Zi5tZXNzYWdlfSk7dmFyIGc9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Zy5vbkVycm9yKFwiY2F0Y2hcIixmLHtmb3JjZTohMH0pfSwwKX10aGlzLmxvZy5jbGVhcigpO3RoaXMudHJhbnNtaXR0ZXIuc2VuZEVycm9yKGUsdGhpcy5jdXN0b21lci50b2tlbil9fWNhdGNoKGspe2NvbnNvbGUubG9nKGspLHRoaXMub25GYXVsdChrKX19LFxuICBvbkZhdWx0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMudHJhbnNtaXR0ZXJ8fG5ldyBuO2E9YXx8e307YT17dG9rZW46dGhpcy5jdXN0b21lci50b2tlbixmaWxlOmEuZmlsZXx8YS5maWxlTmFtZSxtc2c6YS5tZXNzYWdlfHxcInVua25vd25cIixzdGFjazooYS5zdGFja3x8XCJ1bmtub3duXCIpLnN1YnN0cigwLDUwMCksdXJsOnRoaXMud2luZG93LmxvY2F0aW9uLHY6XCIyLjEuOVwiLHg6dGhpcy51dGlsLnV1aWQoKX07Yi5zZW5kVHJhY2tlckZhdWx0KGEpfSxzZXJpYWxpemU6ZnVuY3Rpb24oYSl7aWYodGhpcy5jb25maWcmJnRoaXMuY29uZmlnLmN1cnJlbnQmJnRoaXMuY29uZmlnLmN1cnJlbnQuc2VyaWFsaXplKXRyeXtyZXR1cm4gdGhpcy5jb25maWcuY3VycmVudC5zZXJpYWxpemUoYSl9Y2F0Y2goYil7cmV0dXJuIHRoaXMub25FcnJvcihcImNhdGNoXCIsYix7Zm9yY2U6ITB9KSx0aGlzLnV0aWwmJnRoaXMudXRpbC5oYXNGdW5jdGlvbihhLFwidG9TdHJpbmdcIik/YS50b1N0cmluZygpOlwidW5rbm93blwifX19O1xuICBsPW5ldyBBKGguX3RyYWNrSnN8fGguX3RyYWNrSlN8fGguX3RyYWNranN8fHt9LGZ1bmN0aW9uKGEsYixjKXtyZXR1cm57YXR0ZW1wdDpmdW5jdGlvbihhLGUpe3RyeXt2YXIgZj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGEuYXBwbHkoZXx8dGhpcyxmKX1jYXRjaChnKXt0aHJvdyBjKFwiY2F0Y2hcIixnKSxiLndyYXBFcnJvcihnKTt9fSxjb25maWd1cmU6ZnVuY3Rpb24oYil7cmV0dXJuIGEuc2V0Q3VycmVudChiKX0sdHJhY2s6ZnVuY3Rpb24oYSl7YT1hfHx7fTtpZighYS5zdGFjayl0cnl7dGhyb3cgRXJyb3IoYSk7fWNhdGNoKGIpe2E9Yn1jKFwiZGlyZWN0XCIsYSl9LHdhdGNoOmZ1bmN0aW9uKGEsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dHJ5e3ZhciBmPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywwKTtyZXR1cm4gYS5hcHBseShlfHx0aGlzLGYpfWNhdGNoKGcpe3Rocm93IGMoXCJjYXRjaFwiLGcpLGIud3JhcEVycm9yKGcpO1xuICB9fX0sd2F0Y2hBbGw6ZnVuY3Rpb24oYSl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGY7Zm9yKGYgaW4gYSlcImZ1bmN0aW9uXCI9PT10eXBlb2YgYVtmXSYmKGIuY29udGFpbnMoZSxmKXx8ZnVuY3Rpb24oKXt2YXIgZT1hW2ZdO2FbZl09ZnVuY3Rpb24oKXt0cnl7dmFyIGE9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO3JldHVybiBlLmFwcGx5KHRoaXMsYSl9Y2F0Y2goZCl7dGhyb3cgYyhcImNhdGNoXCIsZCksYi53cmFwRXJyb3IoZCk7fX19KCkpO3JldHVybiBhfSx2ZXJzaW9uOlwiMi4xLjlcIn19LGwsdCxxLHIscyx2LHcsbix4LHkseixtLGgscCk7aC50cmFja0pzPWwucmV2ZWFsKCl9fSkod2luZG93LGRvY3VtZW50KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3RyYWNrSnMuanNcbiAqKi8iLCJ2YXIgaWZyYW1lUmVzaXplID0gcmVxdWlyZSgnLi9pZnJhbWVSZXNpemUnKTtcbnZhciB0aHJvdHRsZSA9IHJlcXVpcmUoJ2xpYi90aHJvdHRsZScpO1xuLy8gdHJhY2sgcmVzaXplZCBpZnJhbWVzIGluIHdpbmRvdy5vbnJlc2l6ZVxuXG52YXIgb25SZXNpemVRdWV1ZSA9IFtdO1xuXG5leHBvcnRzLmlmcmFtZSA9IGZ1bmN0aW9uKGlmcmFtZSkge1xuXG4gIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICBpZnJhbWVSZXNpemUuYXN5bmMoaWZyYW1lLCBmdW5jdGlvbihlcnIsIGhlaWdodCkge1xuICAgICAgaWYgKGVycikgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgaWYgKGhlaWdodCkgaWZyYW1lLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgfSk7XG4gIH1cblxuICByZXNpemUoKTtcbn07XG5cbmV4cG9ydHMuY29kZVRhYnMgPSBmdW5jdGlvbihpZnJhbWUpIHtcbiAgZnVuY3Rpb24gaGlkZVNob3dBcnJvd3MoKSB7XG5cbiAgICAvLyBhZGQgYXJyb3dzIGlmIG5lZWRlZFxuICAgIHZhciBlbGVtID0gaWZyYW1lLmNsb3Nlc3QoJy5jb2RlLXRhYnMnKTtcbiAgICB2YXIgY29udGVudEVsZW0gPSBpZnJhbWUuY2xvc2VzdCgnW2RhdGEtY29kZS10YWJzLWNvbnRlbnRdJyk7XG4gICAgdmFyIHN3aXRjaGVzRWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29kZS10YWJzLXN3aXRjaGVzXScpO1xuICAgIHZhciBzd2l0Y2hlc0VsZW1JdGVtcyA9IHN3aXRjaGVzRWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIGlmIChzd2l0Y2hlc0VsZW1JdGVtcy5vZmZzZXRXaWR0aCA+IHN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfc2Nyb2xsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX3Njcm9sbCcpO1xuICAgIH1cblxuICB9XG5cbiAgaGlkZVNob3dBcnJvd3MoKTtcbiAgb25SZXNpemVRdWV1ZS5wdXNoKGhpZGVTaG93QXJyb3dzKTtcbn07XG5cblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGUoZnVuY3Rpb24oKSB7XG4gIG9uUmVzaXplUXVldWUuZm9yRWFjaChmdW5jdGlvbihvblJlc2l6ZSkge1xuICAgIG9uUmVzaXplKCk7XG4gIH0pO1xufSwgMjAwKSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZC9pbmRleC5qc1xuICoqLyIsIlxuZnVuY3Rpb24gZmluZERlbGVnYXRlVGFyZ2V0KGV2ZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY3VycmVudE5vZGUgPSBldmVudC50YXJnZXQ7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSkge1xuICAgIGlmIChjdXJyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50Tm9kZSA9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBkZWxlZ2F0ZSh0YWJsZSwgJ3RoJywgY2xpY2ssIGhhbmRsZXIpXG4vLyB0YWJsZVxuLy8gICB0aGVhZFxuLy8gICAgIHRoICAgICAgICAgXipcbi8vICAgICAgIGNvZGUgIDwtLVxuZnVuY3Rpb24gZGVsZWdhdGUodG9wRWxlbWVudCwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgY29udGV4dCkge1xuICAvKiBqc2hpbnQgLVcwNDAgKi9cbiAgdG9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZm91bmQgPSBmaW5kRGVsZWdhdGVUYXJnZXQoZXZlbnQsIHNlbGVjdG9yKTtcblxuICAgIC8vIC5jdXJyZW50VGFyZ2V0IGlzIHJlYWQgb25seSwgSSBjYW4gbm90IG92ZXJ3cml0ZSBpdCB0byB0aGUgXCJmb3VuZFwiIGVsZW1lbnRcbiAgICAvLyBPYmplY3QuY3JlYXRlIHdyYXBwZXIgd291bGQgYnJlYWsgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIC8vIHNvLCBrZWVwIGluIG1pbmQ6XG4gICAgLy8gLS0+IGV2ZW50LmN1cnJlbnRUYXJnZXQgaXMgYWx3YXlzIHRoZSB0b3AtbGV2ZWwgKGRlbGVnYXRpbmcpIGVsZW1lbnQhXG4gICAgLy8gdXNlIFwidGhpc1wiIHRvIGdldCB0aGUgZm91bmQgdGFyZ2V0XG5cbiAgICBldmVudC5kZWxlZ2F0ZVRhcmdldCA9IGZvdW5kOyAvLyB1c2UgaW5zdGVhZCBvZiBcInRoaXNcIiBpbiBvYmplY3QgbWV0aG9kc1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICAvLyBpZiBpbiBjb250ZXh0IG9mIG9iamVjdCwgdXNlIG9iamVjdCBhcyB0aGlzLFxuICAgICAgaGFuZGxlci5jYWxsKGNvbnRleHQgfHwgdGhpcywgZXZlbnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgb2JqLmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGRlbGVnYXRlKHRoaXMuZWxlbSwgc2VsZWN0b3IsIGV2ZW50TmFtZSwgaGFuZGxlciwgdGhpcyk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlbGVnYXRlO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9kZWxlZ2F0ZS5qc1xuICoqLyIsInJlcXVpcmUoJy4vZG9tJyk7XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcG9seWZpbGwvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIEZvciBuZXcgbm90aWZpY2F0aW9uIHR5cGVzIGV4dGVuZCBOb3RpZmljYXRpb25cbiAqL1xuXG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRyYW5zbGF0ZVkgcG9zaXRpb25zIHdoZW4gbm90aWZpY2F0aW9ucyBhcmUgYWRkZWQvcmVtb3ZlZFxuICovXG5jbGFzcyBOb3RpZmljYXRpb25NYW5hZ2VyIHtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnZlcnRpY2FsU3BhY2UgPSBvcHRpb25zLnZlcnRpY2FsU3BhY2UgfHwgODtcbiAgfVxuXG4gIHJlZ2lzdGVyKG5vdGlmaWNhdGlvbikge1xuICAgIHRoaXMubm90aWZpY2F0aW9ucy51bnNoaWZ0KG5vdGlmaWNhdGlvbik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlY2FsY3VsYXRlKCksIDIwKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIobm90aWZpY2F0aW9uKSB7XG4gICAgdmFyIGlkeCA9IHRoaXMubm90aWZpY2F0aW9ucy5pbmRleE9mKG5vdGlmaWNhdGlvbik7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgfVxuXG4gIHJlY2FsY3VsYXRlKCkge1xuICAgIHZhciB0b3AgPSB0aGlzLnZlcnRpY2FsU3BhY2U7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zLmZvckVhY2gobm90aWZpY2F0aW9uID0+IHtcbiAgICAgIG5vdGlmaWNhdGlvbi50b3AgPSB0b3A7XG4gICAgICB0b3AgKz0gbm90aWZpY2F0aW9uLmhlaWdodCArIHRoaXMudmVydGljYWxTcGFjZTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbnZhciBtYW5hZ2VyO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG1hbmFnZXIgPSBuZXcgTm90aWZpY2F0aW9uTWFuYWdlcihvcHRpb25zKTtcbn07XG5cblxuY2xhc3MgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sLCB0eXBlLCB0aW1lb3V0KSB7XG4gICAgdmFyIGVsZW1IdG1sID0gYDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb24gbm90aWZpY2F0aW9uX3BvcHVwIG5vdGlmaWNhdGlvbl8ke3R5cGV9XCI+XG4gICAgPGRpdiBjbGFzcz1cIm5vdGlmaWNhdGlvbl9fY29udGVudFwiPiR7aHRtbH08L2Rpdj5cbiAgICA8YnV0dG9uIHRpdGxlPVwi0JfQsNC60YDRi9GC0YxcIiBjbGFzcz1cIm5vdGlmaWNhdGlvbl9fY2xvc2VcIj48L2J1dHRvbj48L2Rpdj5gO1xuXG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVFbmRcIiwgZWxlbUh0bWwpO1xuXG4gICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuYm9keS5sYXN0RWxlbWVudENoaWxkO1xuXG4gICAgc3dpdGNoKHRpbWVvdXQpIHtcbiAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgIHRoaXMudGltZW91dCA9IHRoaXMuVElNRU9VVF9ERUZBVUxUO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2xvdyc6XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLlRJTUVPVVRfU0xPVztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Zhc3QnOlxuICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5USU1FT1VUX0ZBU1Q7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG5cblxuICAgIG1hbmFnZXIucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5zZXR1cENsb3NlSGFuZGxlcigpO1xuICAgIHRoaXMuc2V0dXBDbG9zZVRpbWVvdXQoKTtcbiAgfVxuXG4gIGdldCBUSU1FT1VUX0RFRkFVTFQoKSB7XG4gICAgcmV0dXJuIDI1MDA7XG4gIH1cblxuICBnZXQgVElNRU9VVF9TTE9XKCkge1xuICAgIHJldHVybiA1MDAwO1xuICB9XG5cbiAgZ2V0IFRJTUVPVVRfRkFTVCgpIHtcbiAgICByZXR1cm4gMTUwMDtcbiAgfVxuXG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmVsZW0ucGFyZW50Tm9kZSkgcmV0dXJuOyAvLyBhbHJlYWR5IGNsb3NlZCAoYnkgdXNlciBjbGljaz8pXG4gICAgdGhpcy5lbGVtLnJlbW92ZSgpO1xuICAgIG1hbmFnZXIudW5yZWdpc3Rlcih0aGlzKTtcbiAgfVxuXG4gIHNldHVwQ2xvc2VIYW5kbGVyKCkge1xuICAgIHRoaXMuZGVsZWdhdGUoJy5ub3RpZmljYXRpb25fX2Nsb3NlJywgJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIHNldHVwQ2xvc2VUaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbS5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBzZXQgdG9wKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKCcgKyB2YWx1ZSArICdweCknO1xuICB9XG5cbn1cblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihOb3RpZmljYXRpb24ucHJvdG90eXBlKTtcblxuXG5jbGFzcyBJbmZvIGV4dGVuZHMgTm90aWZpY2F0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihodG1sKSB7XG4gICAgc3VwZXIoaHRtbCwgJ2luZm8nKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuSW5mbyA9IEluZm87XG5cbmNsYXNzIFdhcm5pbmcgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnd2FybmluZycpO1xuICB9XG5cbn1cblxuZXhwb3J0cy5XYXJuaW5nID0gV2FybmluZztcblxuY2xhc3MgU3VjY2VzcyBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICdzdWNjZXNzJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLlN1Y2Nlc3MgPSBTdWNjZXNzO1xuXG5leHBvcnQgY2xhc3MgRXJyb3IgZXh0ZW5kcyBOb3RpZmljYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKGh0bWwpIHtcbiAgICBzdXBlcihodG1sLCAnZXJyb3InKTtcbiAgfVxuXG5cbiAgZ2V0IFRJTUVPVVRfREVGQVVMVCgpIHtcbiAgICByZXR1cm4gNTAwMDtcbiAgfVxuXG5cbn1cblxuZXhwb3J0cy5FcnJvciA9IEVycm9yO1xuXG5leHBvcnQgY2xhc3MgVGVzdCBleHRlbmRzIE5vdGlmaWNhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoaHRtbCkge1xuICAgIHN1cGVyKGh0bWwsICdlcnJvcicpO1xuICB9XG5cblxuICBnZXQgVElNRU9VVF9ERUZBVUxUKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cblxufVxuXG5leHBvcnRzLlRlc3QgPSBUZXN0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvbm90aWZpY2F0aW9uL2luZGV4LmpzXG4gKiovIiwiLy8gVXNhZ2U6XG4vLyAgMSkgbmV3IFNwaW5uZXIoeyBlbGVtOiBlbGVtfSkgLT4gc3RhcnQvc3RvcCgpXG4vLyAgMikgbmV3IFNwaW5uZXIoKSAtPiBzb21ld2hlcmUuYXBwZW5kKHNwaW5uZXIuZWxlbSkgLT4gc3RhcnQvc3RvcFxuZnVuY3Rpb24gU3Bpbm5lcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLmVsZW0gPSBvcHRpb25zLmVsZW07XG5cbiAgdGhpcy5zaXplID0gb3B0aW9ucy5zaXplIHx8ICdtZWRpdW0nO1xuICAvLyBhbnkgY2xhc3MgdG8gYWRkIHRvIHNwaW5uZXIgKG1ha2Ugc3Bpbm5lciBzcGVjaWFsIGhlcmUpXG4gIHRoaXMuY2xhc3MgPSBvcHRpb25zLmNsYXNzID8gKCcgJyArIG9wdGlvbnMuY2xhc3MpIDogJyc7XG5cbiAgLy8gYW55IGNsYXNzIHRvIGFkZCB0byBlbGVtZW50ICh0byBoaWRlIGl0J3MgY29udGVudCBmb3IgaW5zdGFuY2UpXG4gIHRoaXMuZWxlbUNsYXNzID0gb3B0aW9ucy5lbGVtQ2xhc3M7XG5cbiAgaWYgKHRoaXMuc2l6ZSAhPSAnbWVkaXVtJyAmJiB0aGlzLnNpemUgIT0gJ3NtYWxsJyAmJiB0aGlzLnNpemUgIT0gJ2xhcmdlJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHNpemU6IFwiICsgdGhpcy5zaXplKTtcbiAgfVxuXG4gIGlmICghdGhpcy5lbGVtKSB7XG4gICAgdGhpcy5lbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIH1cbn1cblxuU3Bpbm5lci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZWxlbUNsYXNzKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC50b2dnbGUodGhpcy5lbGVtQ2xhc3MpO1xuICB9XG5cbiAgdGhpcy5lbGVtLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgJzxzcGFuIGNsYXNzPVwic3Bpbm5lciBzcGlubmVyX2FjdGl2ZSBzcGlubmVyXycgKyB0aGlzLnNpemUgKyB0aGlzLmNsYXNzICsgJ1wiPjxzcGFuIGNsYXNzPVwic3Bpbm5lcl9fZG90IHNwaW5uZXJfX2RvdF8xXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwic3Bpbm5lcl9fZG90IHNwaW5uZXJfX2RvdF8yXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwic3Bpbm5lcl9fZG90IHNwaW5uZXJfX2RvdF8zXCI+PC9zcGFuPjwvc3Bhbj4nKTtcbn07XG5cblNwaW5uZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNwaW5uZXJFbGVtID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyJyk7XG4gIGlmICghc3Bpbm5lckVsZW0pIHJldHVybjsgLy8gYWxyZWFkeSBzdG9wcGVkIG9yIG5ldmVyIHN0YXJ0ZWRcblxuICBzcGlubmVyRWxlbS5yZW1vdmUoKTtcblxuICBpZiAodGhpcy5lbGVtQ2xhc3MpIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmVsZW1DbGFzcyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3Bpbm5lcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3NwaW5uZXIuanNcbiAqKi8iLCJmdW5jdGlvbiBvblN3aXBlKGVsZW0sIG9wdGlvbnMpIHtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgc3RhcnRYLFxuICAgICAgc3RhcnRZLFxuICAgICAgZGlzdCxcbiAgICAgIG9uUmlnaHQgPSBvcHRpb25zLm9uUmlnaHQgfHwgZnVuY3Rpb24oKSB7fSxcbiAgICAgIG9uTGVmdCA9IG9wdGlvbnMub25MZWZ0IHx8IGZ1bmN0aW9uKCl7fSxcbiAgICAgIHRvbGVyYW5jZSA9IG9wdGlvbnMudG9sZXJhbmNlIHx8IDEwMCwgLy8gbWF4aW11bSB2ZXJ0aWNhbCBkaXN0YW5jZVxuICAgICAgdGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMTUwLCAvL3JlcXVpcmVkIG1pbiBkaXN0YW5jZSB0cmF2ZWxlZCB0byBiZSBjb25zaWRlcmVkIHN3aXBlXG4gICAgICBhbGxvd2VkVGltZSA9IG9wdGlvbnMuYWxsb3dlZFRpbWUgfHwgNTAwLCAvLyBtYXhpbXVtIHRpbWUgYWxsb3dlZCB0byB0cmF2ZWwgdGhhdCBkaXN0YW5jZVxuICAgICAgZWxhcHNlZFRpbWUsXG4gICAgICBzdGFydFRpbWU7XG5cbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgZGlzdCA9IDA7XG4gICAgc3RhcnRYID0gdG91Y2hvYmoucGFnZVg7XG4gICAgc3RhcnRZID0gdG91Y2hvYmoucGFnZVk7XG4gICAgLy9jb25zb2xlLmxvZyhcInN0YXJ0XCIsIHN0YXJ0WCwgc3RhcnRZKTtcbiAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpOyAvLyByZWNvcmQgdGltZSB3aGVuIGZpbmdlciBmaXJzdCBtYWtlcyBjb250YWN0IHdpdGggc3VyZmFjZVxuICB9LCBmYWxzZSk7XG5cbiAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIGRpc3QgPSB0b3VjaG9iai5wYWdlWCAtIHN0YXJ0WDsgLy8gZ2V0IHRvdGFsIGRpc3QgdHJhdmVsZWQgYnkgZmluZ2VyIHdoaWxlIGluIGNvbnRhY3Qgd2l0aCBzdXJmYWNlXG4gICAgZWxhcHNlZFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lOyAvLyBnZXQgdGltZSBlbGFwc2VkXG5cbiAgICAvL2NvbnNvbGUubG9nKFwiZW5kXCIsIHRvdWNob2JqLnBhZ2VYLCB0b3VjaG9iai5wYWdlWSk7XG5cbiAgICAvLyB0b28gbXVjaCB1cC9kb3duXG4gICAgaWYgKE1hdGguYWJzKHRvdWNob2JqLnBhZ2VZIC0gc3RhcnRZKSA+IHRvbGVyYW5jZSkgcmV0dXJuO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcInRpbWVcIiwgZWxhcHNlZFRpbWUsIGFsbG93ZWRUaW1lKTtcblxuICAgIC8vIHRvbyBzbG93XG4gICAgaWYgKGVsYXBzZWRUaW1lID4gYWxsb3dlZFRpbWUpIHJldHVybjtcblxuICAgIC8vY29uc29sZS5sb2coXCJ0aHJlc2hvbGRcIiwgZGlzdCwgdGhyZXNob2xkKTtcblxuICAgIGlmIChkaXN0ID4gdGhyZXNob2xkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwicmlnaHRcIik7XG4gICAgICBvblJpZ2h0KGUpO1xuICAgIH1cblxuICAgIGlmIChkaXN0IDwgLXRocmVzaG9sZCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcImxlZnRcIik7XG4gICAgICBvbkxlZnQoZSk7XG4gICAgfVxuICB9LCBmYWxzZSlcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9uU3dpcGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9vblN3aXBlLmpzXG4gKiovIiwidmFyIGdldERvY3VtZW50SGVpZ2h0ID0gcmVxdWlyZSgnY2xpZW50L2RvbS9nZXREb2N1bWVudEhlaWdodCcpO1xuXG5mdW5jdGlvbiBpZnJhbWVSZXNpemUoaWZyRWxlbSwgY2FsbGJhY2spIHtcblxuXG4gIHZhciB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIC8vIGRlZmF1bHQgaGVpZ2h0XG4gICAgY2FsbGJhY2sobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gIH0sIDUwMCk7XG5cbiAgZnVuY3Rpb24gZG9uZShlcnIsIGhlaWdodCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpO1xuXG4gICAgY2FsbGJhY2soZXJyLCBoZWlnaHQpO1xuICB9XG5cbiAgLy8gdGhyb3cgcmlnaHQgbm93IGlmIGNyb3NzLWRvbWFpblxuICB0cnkge1xuICAgIC8qIGpzaGludCAtVzAzMCAqL1xuICAgIChpZnJFbGVtLmNvbnRlbnREb2N1bWVudCB8fCBpZnJFbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQpLmJvZHk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbihpZnJFbGVtLCBkb25lKTtcbiAgfVxuXG5cbiAgLy8gSElOVDogSSBzaG91bG5kJ3QgbW92ZSBpZnJhbWUgaW4gRE9NLCBiZWNhdXNlIGl0IHdpbGwgcmVsb2FkIGl0J3MgY29udGVudHMgd2hlbiBhcHBlbmRlZC9pbnNlcnRlZCBhbnl3aGVyZSFcbiAgLy8gc28gSSBjcmVhdGUgYSBjbG9uZSBhbmQgd29yayBvbiBpdFxuICBpZiAoIWlmckVsZW0ub2Zmc2V0V2lkdGgpIHtcbiAgICAvLyBjbG9uZSBpZnJhbWUgYXQgYW5vdGhlciBwbGFjZSB0byBzZWUgdGhlIHNpemVcbiAgICB2YXIgY2xvbmVJZnJhbWUgPSBpZnJFbGVtLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjbG9uZUlmcmFtZS5uYW1lID0gXCJcIjtcblxuICAgIGNsb25lSWZyYW1lLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBjbG9uZUlmcmFtZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY2xvbmVJZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgY2xvbmVJZnJhbWUuc3R5bGUudG9wID0gJzEwMDAwcHgnO1xuXG4gICAgY2xvbmVJZnJhbWUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gZ2V0RG9jdW1lbnRIZWlnaHQodGhpcy5jb250ZW50RG9jdW1lbnQpO1xuICAgICAgaWZyRWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIGNsb25lSWZyYW1lLnJlbW92ZSgpO1xuICAgICAgZG9uZShudWxsLCBoZWlnaHQpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lSWZyYW1lKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZnJFbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBpZnJFbGVtLnN0eWxlLmhlaWdodCA9ICcxcHgnO1xuXG4gIHZhciBoZWlnaHQgPSBnZXREb2N1bWVudEhlaWdodChpZnJFbGVtLmNvbnRlbnREb2N1bWVudCk7XG5cbiAgaWZyRWxlbS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgZG9uZShudWxsLCBoZWlnaHQpO1xufVxuXG5pZnJhbWVSZXNpemUuYXN5bmMgPSBmdW5jdGlvbiBpZnJhbWVSZXNpemVBc3luYyhpZnJhbWUsIGNhbGxiYWNrKSB7XG4gIC8vIGRlbGF5IHRvIGxldCB0aGUgY29kZSBpbnNpZGUgdGhlIGlmcmFtZSBmaW5pc2hcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZnJhbWVSZXNpemUoaWZyYW1lLCBjYWxsYmFjayk7XG4gIH0sIDApO1xufTtcblxuXG5mdW5jdGlvbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbihpZnJFbGVtLCBjYWxsYmFjaykge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQgeWV0XCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlmcmFtZVJlc2l6ZTtcblxuXG4vKlxuIHdpbmRvdy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gaWYgKGUub3JpZ2luICE9IFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tXCIpIHJldHVybjtcbiB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiBpZiAoIWRhdGEgfHwgZGF0YS5jbWQgIT0gXCJyZXNpemUtaWZyYW1lXCIpIHJldHVybjtcbiB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGRhdGEubmFtZSlbMF07XG5cbiBlbGVtLnN0eWxlLmhlaWdodCA9ICtkYXRhLmhlaWdodCArIDEwICsgXCJweFwiO1xuIHZhciBkZWZlcnJlZCA9IGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmRlZmVycmVkc1tkYXRhLmlkXTtcbiBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gfTtcblxuIGZ1bmN0aW9uIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluKGlmckVsZW0sIGNhbGxiYWNrKSB7XG5cbiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuIGNhbGxiYWNrKG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuIH0sIDUwMCk7XG5cbiB0cnkge1xuIC8vIHRyeSB0byBzZWUgaWYgcmVzaXplciBjYW4gd29yayBvbiB0aGlzIGlmcmFtZVxuIGlmckVsZW0uY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShcInRlc3RcIiwgXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb21cIik7XG4gfSBjYXRjaChlKSB7XG4gLy8gaWZyYW1lIGZyb20gYW5vdGhlciBkb21haW4sIHNvcnJ5XG4gY2FsbGJhY2sobmV3IEVycm9yKFwidGhlIHJlc2l6ZXIgbXVzdCBiZSBmcm9tIHJ1Lmxvb2thdGNvZGUuY29tXCIpKTtcbiByZXR1cm47XG4gfVxuXG4gaWYgKCFpZnJFbGVtLm9mZnNldFdpZHRoKSB7XG4gLy8gbW92ZSBpZnJhbWUgdG8gYW5vdGhlciBwbGFjZSB0byByZXNpemUgdGhlcmVcbiB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gaWZyRWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgaWZyRWxlbSk7XG4gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJFbGVtKTtcbiB9XG5cbiBpZnJFbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiB2YXIgaWQgPSBcIlwiICsgTWF0aC5yYW5kb20oKTtcbiB2YXIgbWVzc2FnZSA9IHsgY21kOiAncmVzaXplLWlmcmFtZScsIG5hbWU6IGlmckVsZW1bMF0ubmFtZSwgaWQ6IGlkIH07XG4gLy8gVE9ET1xuIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmRlZmVycmVkc1tpZF0gPSBkZWZlcnJlZDtcbiBkZWZlcnJlZC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gZGVsZXRlIGlmcmFtZVJlc2l6ZUNyb3NzRG9tYWluLmRlZmVycmVkc1tpZF07XG4gfSk7XG5cbiB2YXIgZnJhbWUgPSBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5pZnJhbWU7XG4gaWYgKGZyYW1lLmxvYWRlZCkge1xuIGZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tXCIpO1xuIH0gZWxzZSB7XG4gZnJhbWUub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiBmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLCBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbVwiKTtcbiB9KTtcbiB9XG5cbiBpZiAocGxhY2Vob2xkZXIpIHtcbiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuIHBsYWNlaG9sZGVyLnJlcGxhY2VXaXRoKGlmckVsZW0pO1xuIH0sIDIwKTtcbiB9XG5cbiByZXR1cm4gZGVmZXJyZWQ7XG4gfVxuXG4gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uZGVmZXJyZWRzID0ge307XG4gaWZyYW1lUmVzaXplQ3Jvc3NEb21haW4uaWZyYW1lID0gJCgnPGlmcmFtZSBzcmM9XCJodHRwOi8vcnUubG9va2F0Y29kZS5jb20vZmlsZXMvaWZyYW1lLXJlc2l6ZS5odG1sXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48L2lmcmFtZT4nKS5wcmVwZW5kVG8oJ2JvZHknKTtcbiBpZnJhbWVSZXNpemVDcm9zc0RvbWFpbi5pZnJhbWUub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiB0aGlzLmxvYWRlZCA9IHRydWU7XG4gfSk7XG4gKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hlYWQvcmVzaXplT25sb2FkL2lmcmFtZVJlc2l6ZS5qc1xuICoqLyIsIlxuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbXMpIHtcblxuICB2YXIgaXNUaHJvdHRsZWQgPSBmYWxzZSxcbiAgICAgIHNhdmVkQXJncyxcbiAgICAgIHNhdmVkVGhpcztcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuXG4gICAgaWYgKGlzVGhyb3R0bGVkKSB7XG4gICAgICBzYXZlZEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBzYXZlZFRoaXMgPSB0aGlzO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlzVGhyb3R0bGVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbW9kdWxlcy9saWIvdGhyb3R0bGUuanNcbiAqKi8iLCIvL3JlcXVpcmUoJy4vY2FzcGVyanMnKTtcblxuLy8gaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI211dGF0aW9uLW1ldGhvZC1tYWNyb1xuZnVuY3Rpb24gbXV0YXRpb24obm9kZXMpIHtcbiAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RPTSBFeGNlcHRpb24gOCcpO1xuICB9IGVsc2UgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiB0eXBlb2Ygbm9kZXNbMF0gPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZXNbMF0pIDogbm9kZXNbMF07XG4gIH0gZWxzZSB7XG4gICAgdmFyXG4gICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgIGxlbmd0aCA9IG5vZGVzLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBub2RlO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIG5vZGUgPSBub2Rlc1tpbmRleF07XG5cbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpIDogbm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYWdtZW50O1xuICB9XG59XG5cbnZhciBtZXRob2RzID0ge1xuICAvLyBzYWZhcmkgPSB3ZWJraXRNYXRjaGVzU2VsZWN0b3JcbiAgbWF0Y2hlczogRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IsXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtdXRhdGlvbihhcmd1bWVudHMpLCB0aGlzKTtcbiAgICB9XG4gIH0sXG4gIHByZXBlbmQ6IGZ1bmN0aW9uIHByZXBlbmQoKSB7XG4gICAgdGhpcy5pbnNlcnRCZWZvcmUobXV0YXRpb24oYXJndW1lbnRzKSwgdGhpcy5maXJzdENoaWxkKTtcbiAgfSxcbiAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoKSB7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChtdXRhdGlvbihhcmd1bWVudHMpKTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGFyZW50Tm9kZSA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9LFxuICBiZWZvcmU6IGZ1bmN0aW9uIGJlZm9yZSgpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMpO1xuICAgIH1cbiAgfSxcblxuICBhZnRlcjogICBmdW5jdGlvbiBhZnRlcigpIHtcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG11dGF0aW9uKGFyZ3VtZW50cyksIHRoaXMubmV4dFNpYmxpbmcpO1xuICAgIH1cbiAgfSxcbiAgY2xvc2VzdDogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXM7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHJldHVybiBub2RlO1xuICAgICAgZWxzZSBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBtZXRob2RzKSB7XG4gIGlmICghRWxlbWVudC5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG1ldGhvZHNbbWV0aG9kTmFtZV07XG4gIH1cbn1cblxucmVxdWlyZSgnLi9jdXN0b21FdmVudCcpO1xucmVxdWlyZSgnLi9kYXRhc2V0Jyk7XG5yZXF1aXJlKCcuL2hpZGRlbicpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3BvbHlmaWxsL2RvbS5qc1xuICoqLyIsIlxudHJ5IHtcbiAgbmV3IEN1c3RvbUV2ZW50KFwiSUUgaGFzIEN1c3RvbUV2ZW50LCBidXQgZG9lc24ndCBzdXBwb3J0IGNvbnN0cnVjdG9yXCIpO1xufSBjYXRjaCAoZSkge1xuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICB2YXIgZXZ0O1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiAgICBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiAgICAgdW5kZWZpbmVkXG4gICAgfTtcbiAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfTtcblxuICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHdpbmRvdy5FdmVudC5wcm90b3R5cGUpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9jdXN0b21FdmVudC5qc1xuICoqLyIsIi8vIGRhdGFzZXQgZm9yIElFMTBcblxuaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGF0YXNldCAmJlxuICAgIC8vIEZGIGlzIGVtcHR5IHdoaWxlIElFIGdpdmVzIGVtcHR5IG9iamVjdFxuICAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRWxlbWVudC5wcm90b3R5cGUsICdkYXRhc2V0JykgIHx8XG4gICFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcpLmdldClcbikge1xuICB2YXIgcHJvcERlc2NyaXB0b3IgPSB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIHZhciBpLFxuICAgICAgICAgIHRoYXQgPSB0aGlzLFxuICAgICAgICAgIEhUTUw1X0RPTVN0cmluZ01hcCxcbiAgICAgICAgICBhdHRyVmFsLCBhdHRyTmFtZSwgcHJvcE5hbWUsXG4gICAgICAgICAgYXR0cmlidXRlLFxuICAgICAgICAgIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgYXR0c0xlbmd0aCA9IGF0dHJpYnV0ZXMubGVuZ3RoLFxuICAgICAgICAgIHRvVXBwZXJDYXNlID0gZnVuY3Rpb24gKG4wKSB7XG4gICAgICAgICAgICByZXR1cm4gbjAuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldHRlciA9IGZ1bmN0aW9uIChhdHRyTmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgP1xuICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpIDpcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgIH07XG4gICAgICB0cnkgeyAvLyBTaW11bGF0ZSBET01TdHJpbmdNYXAgdy9hY2Nlc3NvciBzdXBwb3J0XG4gICAgICAgIC8vIFRlc3Qgc2V0dGluZyBhY2Nlc3NvciBvbiBub3JtYWwgb2JqZWN0XG4gICAgICAgICh7fSkuX19kZWZpbmVHZXR0ZXJfXygndGVzdCcsIGZ1bmN0aW9uICgpIHt9KTtcbiAgICAgICAgSFRNTDVfRE9NU3RyaW5nTWFwID0ge307XG4gICAgICB9XG4gICAgICBjYXRjaCAoZTEpIHsgLy8gVXNlIGEgRE9NIG9iamVjdCBmb3IgSUU4XG4gICAgICAgIEhUTUw1X0RPTVN0cmluZ01hcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IGF0dHNMZW5ndGg7IGkrKykge1xuICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgICAvLyBGaXg6IFRoaXMgdGVzdCByZWFsbHkgc2hvdWxkIGFsbG93IGFueSBYTUwgTmFtZSB3aXRob3V0XG4gICAgICAgIC8vICAgICAgICAgY29sb25zIChhbmQgbm9uLXVwcGVyY2FzZSBmb3IgWEhUTUwpXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlLm5hbWUgJiZcbiAgICAgICAgICAoL15kYXRhLVxcd1tcXHdcXC1dKiQvKS50ZXN0KGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgICAgIGF0dHJWYWwgPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgYXR0ck5hbWUgPSBhdHRyaWJ1dGUubmFtZTtcbiAgICAgICAgICAvLyBDaGFuZ2UgdG8gQ2FtZWxDYXNlXG4gICAgICAgICAgcHJvcE5hbWUgPSBhdHRyTmFtZS5zdWJzdHIoNSkucmVwbGFjZSgvLS4vZywgdG9VcHBlckNhc2UpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTDVfRE9NU3RyaW5nTWFwLCBwcm9wTmFtZSwge1xuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0aGlzLmVudW1lcmFibGUsXG4gICAgICAgICAgICAgIGdldDogZ2V0dGVyLmJpbmQoYXR0clZhbCB8fCAnJyksXG4gICAgICAgICAgICAgIHNldDogc2V0dGVyLmJpbmQodGhhdCwgYXR0ck5hbWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2ggKGUyKSB7IC8vIGlmIGFjY2Vzc29ycyBhcmUgbm90IHdvcmtpbmdcbiAgICAgICAgICAgIEhUTUw1X0RPTVN0cmluZ01hcFtwcm9wTmFtZV0gPSBhdHRyVmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIEhUTUw1X0RPTVN0cmluZ01hcDtcbiAgICB9XG4gIH07XG4gIHRyeSB7XG4gICAgLy8gRkYgZW51bWVyYXRlcyBvdmVyIGVsZW1lbnQncyBkYXRhc2V0LCBidXQgbm90XG4gICAgLy8gICBFbGVtZW50LnByb3RvdHlwZS5kYXRhc2V0OyBJRTkgaXRlcmF0ZXMgb3ZlciBib3RoXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVsZW1lbnQucHJvdG90eXBlLCAnZGF0YXNldCcsIHByb3BEZXNjcmlwdG9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHByb3BEZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTsgLy8gSUU4IGRvZXMgbm90IGFsbG93IHNldHRpbmcgdG8gdHJ1ZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50LnByb3RvdHlwZSwgJ2RhdGFzZXQnLCBwcm9wRGVzY3JpcHRvcik7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9kYXRhc2V0LmpzXG4gKiovIiwiaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5oaWRkZW4gPT09IHVuZGVmaW5lZCkge1xuICBkb2N1bWVudC5oZWFkLmluc2VydEFkamFjZW50SFRNTCgnPHN0eWxlPiBbaGlkZGVuXSB7IGRpc3BsYXk6IG5vbmUgfSA8L3N0eWxlPicpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudC5wcm90b3R5cGUsIFwiaGlkZGVuXCIsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgdmFsdWUpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGlkZGVuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wb2x5ZmlsbC9oaWRkZW4uanNcbiAqKi8iLCJ2YXIgZ2V0U2Nyb2xsYmFySGVpZ2h0ID0gcmVxdWlyZSgnLi9nZXRTY3JvbGxiYXJIZWlnaHQnKTtcbnZhciBzY3JvbGxiYXJIZWlnaHQ7XG5cbmZ1bmN0aW9uIGdldERvY3VtZW50SGVpZ2h0KGRvYykge1xuICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG5cbiAgdmFyIGhlaWdodCA9IE1hdGgubWF4KFxuICAgIGRvYy5ib2R5LnNjcm9sbEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgZG9jLmJvZHkub2Zmc2V0SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICBkb2MuYm9keS5jbGllbnRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICk7XG5cbiAgaWYgKGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPiBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7XG4gICAgLy8gZ290IGEgaG9yaXogc2Nyb2xsLCBsZXQncyBhZGQgaXRcbiAgICBpZiAoIXNjcm9sbGJhckhlaWdodCkgc2Nyb2xsYmFySGVpZ2h0ID0gZ2V0U2Nyb2xsYmFySGVpZ2h0KCk7XG4gICAgaGVpZ2h0ICs9IHNjcm9sbGJhckhlaWdodDtcbiAgfVxuXG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RG9jdW1lbnRIZWlnaHQ7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2RvbS9nZXREb2N1bWVudEhlaWdodC5qc1xuICoqLyIsImZ1bmN0aW9uIGdldFNjcm9sbGJhckhlaWdodCgpIHtcbiAgdmFyIG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3V0ZXIuc3R5bGUuY3NzVGV4dCA9IFwidmlzaWJpbGl0eTpoaWRkZW47aGVpZ2h0OjEwMHB4XCI7XG4gIGlmICghZG9jdW1lbnQuYm9keSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdldFNjcm9sbGJhckhlaWdodCBjYWxsZWQgdG8gZWFybHk6IG5vIGRvY3VtZW50LmJvZHlcIik7XG4gIH1cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgdmFyIHdpZHRoTm9TY3JvbGwgPSBvdXRlci5vZmZzZXRXaWR0aDtcbiAgLy8gZm9yY2Ugc2Nyb2xsYmFyc1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7XG5cbiAgLy8gYWRkIGlubmVyZGl2XG4gIHZhciBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlubmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcblxuICB2YXIgd2lkdGhXaXRoU2Nyb2xsID0gaW5uZXIub2Zmc2V0V2lkdGg7XG5cbiAgLy8gcmVtb3ZlIGRpdnNcbiAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgcmV0dXJuIHdpZHRoTm9TY3JvbGwgLSB3aWR0aFdpdGhTY3JvbGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0U2Nyb2xsYmFySGVpZ2h0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZG9tL2dldFNjcm9sbGJhckhlaWdodC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImhlYWQuMWJkMmY2NTMxNGI0MTFkZWY5M2IuanMifQ==
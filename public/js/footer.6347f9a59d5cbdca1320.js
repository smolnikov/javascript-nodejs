var footer =
webpackJsonp_name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	//require('./preventDocumentScroll');
	"use strict";
	
	var showLinkType = __webpack_require__(18);
	var load2x = __webpack_require__(19);
	var trackSticky = __webpack_require__(20);
	
	__webpack_require__(39).init();
	
	exports.init = function () {
	  showLinkType();
	
	  if (window.devicePixelRatio > 1) {
	    load2x();
	  }
	
	  window.addEventListener("scroll", trackSticky);
	  trackSticky();
	};
	
	exports.trackSticky = trackSticky;

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var hoverIntent = __webpack_require__(48);
	
	module.exports = function () {
	
	  var tooltipSpan = null;
	  var shiftX = 8;
	  var shiftY = 10;
	
	  function updatePosition(event) {
	    var left = event.clientX + shiftX;
	    if (left + tooltipSpan.offsetWidth > document.documentElement.clientWidth) {
	      // if beyond the right document border
	      // mirror to the left
	      left = Math.max(0, event.clientX - shiftX - tooltipSpan.offsetWidth);
	    }
	    tooltipSpan.style.left = left + "px";
	
	    var top = event.clientY + shiftY;
	    if (top + tooltipSpan.offsetHeight > document.documentElement.clientHeight) {
	      top = Math.max(0, event.clientY - shiftY - tooltipSpan.offsetHeight);
	    }
	
	    tooltipSpan.style.top = top + "px";
	  }
	
	  // we show tooltip element for any link hover, but few of them actually get styled
	  function onOver(event) {
	    var target = event.target.closest("a, [data-tooltip]");
	
	    if (!target) {
	      return;
	    } // links inside toolbars need no tooltips
	    if (target.tagName == "A" && target.closest(".toolbar")) {
	      return;
	    }tooltipSpan = document.createElement("span");
	    tooltipSpan.className = "link__type";
	
	    if (target.getAttribute("data-tooltip")) {
	      tooltipSpan.setAttribute("data-tooltip", target.getAttribute("data-tooltip"));
	    } else {
	      tooltipSpan.setAttribute("data-url", target.getAttribute("href"));
	    }
	
	    document.body.appendChild(tooltipSpan);
	    updatePosition(event);
	
	    document.addEventListener("mousemove", updatePosition);
	  }
	
	  function onOut() {
	    if (!tooltipSpan) {
	      return;
	    }document.removeEventListener("mousemove", updatePosition);
	    tooltipSpan.remove();
	    tooltipSpan = null;
	  }
	
	  hoverIntent("a,[data-tooltip]", onOver, onOut);
	};

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	
	  var figurePngs = document.querySelectorAll("figure img[src$=\".png\"]");
	
	  for (var i = 0; i < figurePngs.length; i++) {
	    (function () {
	      var png = figurePngs[i];
	
	      // load @2x version (must exist)
	      png.onload = function () {
	        delete this.onload;
	        if (this.src.match(/@2x.png$/)) return;
	
	        var png2x = new Image();
	        png2x.onload = function () {
	          console.log(this.src);
	          if (this.width && this.height) {
	            png.src = this.src;
	          }
	        };
	        png2x.src = this.src.replace(".png", "@2x.png");
	      };
	      if (png.complete) png.onload();
	    })();
	  }
	};

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = trackSticky;
	
	function trackSticky() {
	
	  var stickyElems = document.querySelectorAll("[data-sticky]");
	
	  for (var i = 0; i < stickyElems.length; i++) {
	    var stickyElem = stickyElems[i];
	    var container = stickyElem.dataset.sticky ? document.querySelector(stickyElem.dataset.sticky) : document.body;
	
	    if (stickyElem.getBoundingClientRect().top < 0) {
	      // become fixed
	      if (stickyElem.style.cssText) {
	        // already fixed
	        // inertia: happens when scrolled fast too much to bottom
	        // http://ilyakantor.ru/screen/2015-02-24_1555.swf
	        return;
	      }
	
	      var savedLeft = stickyElem.getBoundingClientRect().left;
	      var placeholder = createPlaceholder(stickyElem);
	
	      stickyElem.parentNode.insertBefore(placeholder, stickyElem);
	
	      container.appendChild(stickyElem);
	      stickyElem.classList.add("sticky");
	      stickyElem.style.position = "fixed";
	      stickyElem.style.top = 0;
	      stickyElem.style.left = savedLeft + "px";
	      // zIndex < 1000, because it must be under an overlay,
	      // e.g. sitemap must show over the progress bar
	      stickyElem.style.zIndex = 101;
	      stickyElem.style.background = "white"; // non-transparent to cover the text
	      stickyElem.style.margin = 0;
	      stickyElem.style.width = placeholder.offsetWidth + "px"; // keep same width as before
	      stickyElem.placeholder = placeholder;
	    } else if (stickyElem.placeholder && stickyElem.placeholder.getBoundingClientRect().top > 0) {
	      // become non-fixed
	      stickyElem.style.cssText = "";
	      stickyElem.classList.remove("sticky");
	      stickyElem.placeholder.parentNode.insertBefore(stickyElem, stickyElem.placeholder);
	      stickyElem.placeholder.remove();
	
	      stickyElem.placeholder = null;
	    }
	  }
	}
	
	/**
	 * Creates a placeholder w/ same size & margin
	 * @param elem
	 * @returns {*|!HTMLElement}
	 */
	function createPlaceholder(elem) {
	  var placeholder = document.createElement("div");
	  var style = getComputedStyle(elem);
	  placeholder.style.width = elem.offsetWidth + "px";
	  placeholder.style.marginLeft = style.marginLeft;
	  placeholder.style.marginRight = style.marginRight;
	  placeholder.style.height = elem.offsetHeight + "px";
	  placeholder.style.marginBottom = style.marginBottom;
	  placeholder.style.marginTop = style.marginTop;
	  return placeholder;
	}

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(22);
	var getCsrfCookie = __webpack_require__(36);
	// Wrapper about XHR
	// # Global Events
	// triggers document.loadstart/loadend on communication start/end
	//    --> unless options.noGlobalEvents is set
	//
	// # Events
	// triggers fail/success on load end:
	//    --> by default status=200 is ok, the others are failures
	//    --> options.normalStatuses = [201,409] allow given statuses
	//    --> fail event has .reason field
	//    --> success event has .result field
	//
	// # JSON
	//    --> send(object) calls JSON.stringify
	//    --> adds Accept: json (we want json) by default, unless options.raw
	// if options.json or server returned json content type
	//    --> autoparse json
	//    --> fail if error
	//
	// # CSRF
	//    --> requests sends header X-XSRF-TOKEN from cookie
	
	function xhr(options) {
	
	  var request = new XMLHttpRequest();
	
	  var method = options.method || "GET";
	
	  var body = options.body;
	  var url = options.url;
	
	  request.open(method, url, options.sync ? false : true);
	
	  request.method = method;
	
	  // token/header names same as angular $http for easier interop
	  var csrfCookie = getCsrfCookie();
	  if (csrfCookie && !options.skipCsrf) {
	    request.setRequestHeader("X-XSRF-TOKEN", csrfCookie);
	  }
	
	  if (({}).toString.call(body) == "[object Object]") {
	    // must be OPENed to setRequestHeader
	    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    body = JSON.stringify(body);
	  }
	
	  if (!options.noGlobalEvents) {
	    request.addEventListener("loadstart", function (event) {
	      var e = wrapEvent("xhrstart", event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("loadend", function (event) {
	      var e = wrapEvent("xhrend", event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("success", function (event) {
	      var e = wrapEvent("xhrsuccess", event);
	      e.result = event.result;
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("fail", function (event) {
	      var e = wrapEvent("xhrfail", event);
	      e.reason = event.reason;
	      document.dispatchEvent(e);
	    });
	  }
	
	  if (!options.raw) {
	    // means we want json
	    request.setRequestHeader("Accept", "application/json");
	  }
	
	  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
	  var normalStatuses = options.normalStatuses || [200];
	
	  function wrapEvent(name, e) {
	    var event = new CustomEvent(name);
	    event.originalEvent = e;
	    return event;
	  }
	
	  function fail(reason, originalEvent) {
	    var e = wrapEvent("fail", originalEvent);
	    e.reason = reason;
	    request.dispatchEvent(e);
	  }
	
	  function success(result, originalEvent) {
	    var e = wrapEvent("success", originalEvent);
	    e.result = result;
	    request.dispatchEvent(e);
	  }
	
	  request.addEventListener("error", function (e) {
	    fail("Ошибка связи с сервером.", e);
	  });
	
	  request.addEventListener("timeout", function (e) {
	    fail("Превышено максимально допустимое время ожидания ответа от сервера.", e);
	  });
	
	  request.addEventListener("abort", function (e) {
	    fail("Запрос был прерван.", e);
	  });
	
	  request.addEventListener("load", function (e) {
	    if (!request.status) {
	      // does that ever happen?
	      fail("Не получен ответ от сервера.", e);
	      return;
	    }
	
	    if (normalStatuses.indexOf(request.status) == -1) {
	      fail("Ошибка на стороне сервера (код " + request.status + "), попытайтесь позднее", e);
	      return;
	    }
	
	    var result = request.responseText;
	    var contentType = request.getResponseHeader("Content-Type");
	    if (contentType.match(/^application\/json/) || options.json) {
	      // autoparse json if WANT or RECEIVED json
	      try {
	        result = JSON.parse(result);
	      } catch (e) {
	        fail("Некорректный формат ответа от сервера", e);
	        return;
	      }
	    }
	
	    success(result, e);
	  });
	
	  // defer to let other handlers be assigned
	  setTimeout(function () {
	    var timeStart = Date.now();
	
	    request.send(body);
	
	    request.addEventListener("loadend", function () {
	      window.ga("send", "timing", "xhr", method + " " + url, Date.now() - timeStart);
	    });
	  }, 0);
	
	  return request;
	}
	
	function addUrlParam(url, name, value) {
	  var param = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	  if (~url.indexOf("?")) {
	    return url + "&" + param;
	  } else {
	    return url + "?" + param;
	  }
	}
	
	document.addEventListener("xhrfail", function (event) {
	  new notification.Error(event.reason);
	});
	
	module.exports = xhr;

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Spinner = __webpack_require__(35);
	var xhr = __webpack_require__(27);
	var notification = __webpack_require__(22);
	
	function init() {
	  document.onsubmit = function (e) {
	    if (e.target.hasAttribute("data-newsletter-subscribe-form")) {
	      e.preventDefault();
	      submitSubscribeForm(e.target);
	    }
	  };
	}
	
	function submitSubscribeForm(form) {
	
	  if (!form.elements.email.value) {
	    return;
	  }
	
	  var request = xhr({
	    method: "POST",
	    url: form.action,
	    body: {
	      email: form.elements.email.value,
	      slug: form.elements.slug.value
	    }
	  });
	
	  var submitButton = form.querySelector("[type=\"submit\"]");
	
	  var spinner = new Spinner({
	    elem: submitButton,
	    size: "small",
	    elemClass: "button_loading"
	  });
	  spinner.start();
	  submitButton.disabled = true;
	
	  request.addEventListener("loadend", function () {
	    spinner.stop();
	    submitButton.disabled = false;
	  });
	
	  request.addEventListener("success", function (event) {
	    if (this.status == 200) {
	      new notification.Success(event.result.message);
	    } else {
	      new notification.Error(event.result.message);
	    }
	  });
	}
	
	exports.init = init;

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var lastPageX = Infinity,
	    lastPageY = Infinity,
	    lastTime = Date.now();
	
	var elementOver;
	
	var elementHoverOver;
	
	var speedTolerance = 0.2;
	
	var handlers = {};
	
	function hoverIntent(selector, over, out) {
	  handlers[selector] = { over: over, out: out };
	}
	
	document.addEventListener("mousemove", mousemove);
	document.addEventListener("mouseout", mouseout);
	
	function mousemove(event) {
	  if (elementHoverOver) {
	    return;
	  }var distance = Math.sqrt(Math.pow(event.pageX - lastPageX, 2) + Math.pow(event.pageY - lastPageY, 2));
	  var speed = distance / (Date.now() - lastTime);
	
	  // slow down => call over(), get the element of interest,
	  // then out() when leaving it
	  if (speed < speedTolerance) {
	    //console.log("speed", speed);
	    var elem = document.elementFromPoint(event.clientX, event.clientY);
	    if (!elem) {
	      return;
	    } // the coords are out of window (happens)
	    if (elem != elementOver) {
	      for (var selector in handlers) {
	        var closest = elem.closest(selector);
	        if (closest) {
	          //console.log("over ", closest);
	          elementHoverOver = { elem: closest, out: handlers[selector].out };
	          handlers[selector].over(event);
	        }
	      }
	      elementOver = elem;
	    }
	  }
	
	  lastPageX = event.pageX;
	  lastPageY = event.pageY;
	  lastTime = Date.now();
	}
	
	function mouseout(event) {
	  if (!elementHoverOver) {
	    return;
	  }var parent = event.relatedTarget;
	  while (parent) {
	    if (parent == elementHoverOver.elem) {
	      //console.log("mouseout false", event.target, elementHoverOver.elem);
	      // still under elementHoverOver
	      return;
	    }
	    parent = parent.parentElement;
	  }
	
	  var out = elementHoverOver.out;
	  elementHoverOver = null;
	  out(event);
	}
	
	module.exports = hoverIntent;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvc2hvd0xpbmtUeXBlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvbG9hZDJ4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC90cmFja1N0aWNreS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQveGhyLmpzPzY4NTIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanM/ZDEyYSIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9uZXdzbGV0dGVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaG92ZXJJbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsS0FBSSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFnQixDQUFDLENBQUM7QUFDN0MsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxFQUFVLENBQUMsQ0FBQztBQUNqQyxLQUFJLFdBQVcsR0FBRyxtQkFBTyxDQUFDLEVBQW9CLENBQUMsQ0FBQzs7QUFFaEQsb0JBQU8sQ0FBQyxFQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRXBDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUN4QixlQUFZLEVBQUUsQ0FBQzs7QUFFZixPQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUU7QUFDL0IsV0FBTSxFQUFFLENBQUM7SUFDVjs7QUFFRCxTQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLGNBQVcsRUFBRSxDQUFDO0VBQ2YsQ0FBQzs7QUFFRixRQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQzs7Ozs7Ozs7O0FDbEJqQyxLQUFJLFdBQVcsR0FBRyxtQkFBTyxDQUFDLEVBQW9CLENBQUMsQ0FBQzs7QUFFaEQsT0FBTSxDQUFDLE9BQU8sR0FBRyxZQUFX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LENBQUM7QUFDeEIsTUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBRVo7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3JlcXVpcmUoJy4vcHJldmVudERvY3VtZW50U2Nyb2xsJyk7XG52YXIgc2hvd0xpbmtUeXBlID0gcmVxdWlyZSgnLi9zaG93TGlua1R5cGUnKTtcbnZhciBsb2FkMnggPSByZXF1aXJlKCcuL2xvYWQyeCcpO1xudmFyIHRyYWNrU3RpY2t5ID0gcmVxdWlyZSgnY2xpZW50L3RyYWNrU3RpY2t5Jyk7XG5cbnJlcXVpcmUoJ25ld3NsZXR0ZXIvY2xpZW50JykuaW5pdCgpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgc2hvd0xpbmtUeXBlKCk7XG5cbiAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuICAgIGxvYWQyeCgpO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU3RpY2t5KTtcbiAgdHJhY2tTdGlja3koKTtcbn07XG5cbmV4cG9ydHMudHJhY2tTdGlja3kgPSB0cmFja1N0aWNreTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9mb290ZXIvaW5kZXguanNcbiAqKi8iLCJ2YXIgaG92ZXJJbnRlbnQgPSByZXF1aXJlKCdjbGllbnQvaG92ZXJJbnRlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgdG9vbHRpcFNwYW4gPSBudWxsO1xuICB2YXIgc2hpZnRYID0gODtcbiAgdmFyIHNoaWZ0WSA9IDEwO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGxlZnQgPSBldmVudC5jbGllbnRYICsgc2hpZnRYO1xuICAgIGlmIChsZWZ0ICsgdG9vbHRpcFNwYW4ub2Zmc2V0V2lkdGggPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHsgLy8gaWYgYmV5b25kIHRoZSByaWdodCBkb2N1bWVudCBib3JkZXJcbiAgICAgIC8vIG1pcnJvciB0byB0aGUgbGVmdFxuICAgICAgbGVmdCA9IE1hdGgubWF4KDAsIGV2ZW50LmNsaWVudFggLSBzaGlmdFggLSB0b29sdGlwU3Bhbi5vZmZzZXRXaWR0aCk7XG4gICAgfVxuICAgIHRvb2x0aXBTcGFuLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcblxuICAgIHZhciB0b3AgPSBldmVudC5jbGllbnRZICsgc2hpZnRZO1xuICAgIGlmICh0b3AgKyB0b29sdGlwU3Bhbi5vZmZzZXRIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICB0b3AgPSBNYXRoLm1heCgwLCBldmVudC5jbGllbnRZIC0gc2hpZnRZIC0gdG9vbHRpcFNwYW4ub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG5cbiAgICB0b29sdGlwU3Bhbi5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICB9XG5cblxuXG4gIC8vIHdlIHNob3cgdG9vbHRpcCBlbGVtZW50IGZvciBhbnkgbGluayBob3ZlciwgYnV0IGZldyBvZiB0aGVtIGFjdHVhbGx5IGdldCBzdHlsZWRcbiAgZnVuY3Rpb24gb25PdmVyKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhLCBbZGF0YS10b29sdGlwXScpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHJldHVybjtcblxuICAgIC8vIGxpbmtzIGluc2lkZSB0b29sYmFycyBuZWVkIG5vIHRvb2x0aXBzXG4gICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdBJyAmJiB0YXJnZXQuY2xvc2VzdCgnLnRvb2xiYXInKSkgcmV0dXJuO1xuXG4gICAgdG9vbHRpcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdG9vbHRpcFNwYW4uY2xhc3NOYW1lID0gJ2xpbmtfX3R5cGUnO1xuXG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpKSB7XG4gICAgICB0b29sdGlwU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcsIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9vbHRpcFNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXVybCcsIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwU3Bhbik7XG4gICAgdXBkYXRlUG9zaXRpb24oZXZlbnQpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdXBkYXRlUG9zaXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25PdXQoKSB7XG4gICAgaWYgKCF0b29sdGlwU3BhbikgcmV0dXJuO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdXBkYXRlUG9zaXRpb24pO1xuICAgIHRvb2x0aXBTcGFuLnJlbW92ZSgpO1xuICAgIHRvb2x0aXBTcGFuID0gbnVsbDtcbiAgfVxuXG4gIGhvdmVySW50ZW50KCdhLFtkYXRhLXRvb2x0aXBdJywgb25PdmVyLCBvbk91dCk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9mb290ZXIvc2hvd0xpbmtUeXBlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBsZXQgZmlndXJlUG5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ZpZ3VyZSBpbWdbc3JjJD1cIi5wbmdcIl0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZ3VyZVBuZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcG5nID0gZmlndXJlUG5nc1tpXTtcblxuICAgIC8vIGxvYWQgQDJ4IHZlcnNpb24gKG11c3QgZXhpc3QpXG4gICAgcG5nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHRoaXMub25sb2FkO1xuICAgICAgaWYgKHRoaXMuc3JjLm1hdGNoKC9AMngucG5nJC8pKSByZXR1cm47XG5cbiAgICAgIGxldCBwbmcyeCA9IG5ldyBJbWFnZSgpO1xuICAgICAgcG5nMngub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3JjKTtcbiAgICAgICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICBwbmcuc3JjID0gdGhpcy5zcmM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBwbmcyeC5zcmMgPSB0aGlzLnNyYy5yZXBsYWNlKCcucG5nJywgJ0AyeC5wbmcnKTtcbiAgICB9O1xuICAgIGlmIChwbmcuY29tcGxldGUpIHBuZy5vbmxvYWQoKTtcblxuICB9XG5cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZm9vdGVyL2xvYWQyeC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gdHJhY2tTdGlja3k7XG5cblxuZnVuY3Rpb24gdHJhY2tTdGlja3koKSB7XG5cbiAgdmFyIHN0aWNreUVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3RpY2t5XScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2t5RWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3RpY2t5RWxlbSA9IHN0aWNreUVsZW1zW2ldO1xuICAgIHZhciBjb250YWluZXIgPSBzdGlja3lFbGVtLmRhdGFzZXQuc3RpY2t5ID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RpY2t5RWxlbS5kYXRhc2V0LnN0aWNreSkgOiBkb2N1bWVudC5ib2R5O1xuXG4gICAgaWYgKHN0aWNreUVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgMCkge1xuICAgICAgLy8gYmVjb21lIGZpeGVkXG4gICAgICBpZiAoc3RpY2t5RWxlbS5zdHlsZS5jc3NUZXh0KSB7XG4gICAgICAgIC8vIGFscmVhZHkgZml4ZWRcbiAgICAgICAgLy8gaW5lcnRpYTogaGFwcGVucyB3aGVuIHNjcm9sbGVkIGZhc3QgdG9vIG11Y2ggdG8gYm90dG9tXG4gICAgICAgIC8vIGh0dHA6Ly9pbHlha2FudG9yLnJ1L3NjcmVlbi8yMDE1LTAyLTI0XzE1NTUuc3dmXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNhdmVkTGVmdCA9IHN0aWNreUVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHZhciBwbGFjZWhvbGRlciA9IGNyZWF0ZVBsYWNlaG9sZGVyKHN0aWNreUVsZW0pO1xuXG4gICAgICBzdGlja3lFbGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBzdGlja3lFbGVtKTtcblxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHN0aWNreUVsZW0pO1xuICAgICAgc3RpY2t5RWxlbS5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS50b3AgPSAwO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5sZWZ0ID0gc2F2ZWRMZWZ0ICsgJ3B4JztcbiAgICAgIC8vIHpJbmRleCA8IDEwMDAsIGJlY2F1c2UgaXQgbXVzdCBiZSB1bmRlciBhbiBvdmVybGF5LFxuICAgICAgLy8gZS5nLiBzaXRlbWFwIG11c3Qgc2hvdyBvdmVyIHRoZSBwcm9ncmVzcyBiYXJcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuekluZGV4ID0gMTAxO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJzsgLy8gbm9uLXRyYW5zcGFyZW50IHRvIGNvdmVyIHRoZSB0ZXh0XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLndpZHRoID0gcGxhY2Vob2xkZXIub2Zmc2V0V2lkdGggKyAncHgnOyAvLyBrZWVwIHNhbWUgd2lkdGggYXMgYmVmb3JlXG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfSBlbHNlIGlmIChzdGlja3lFbGVtLnBsYWNlaG9sZGVyICYmIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gMCkge1xuICAgICAgLy8gYmVjb21lIG5vbi1maXhlZFxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5jc3NUZXh0ID0gJyc7XG4gICAgICBzdGlja3lFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3N0aWNreScpO1xuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdGlja3lFbGVtLCBzdGlja3lFbGVtLnBsYWNlaG9sZGVyKTtcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIucmVtb3ZlKCk7XG5cbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHBsYWNlaG9sZGVyIHcvIHNhbWUgc2l6ZSAmIG1hcmdpblxuICogQHBhcmFtIGVsZW1cbiAqIEByZXR1cm5zIHsqfCFIVE1MRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXIoZWxlbSkge1xuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgcGxhY2Vob2xkZXIuc3R5bGUud2lkdGggPSBlbGVtLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luTGVmdCA9IHN0eWxlLm1hcmdpbkxlZnQ7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gc3R5bGUubWFyZ2luUmlnaHQ7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLmhlaWdodCA9IGVsZW0ub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luQm90dG9tID0gc3R5bGUubWFyZ2luQm90dG9tO1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5Ub3AgPSBzdHlsZS5tYXJnaW5Ub3A7XG4gIHJldHVybiBwbGFjZWhvbGRlcjtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC90cmFja1N0aWNreS5qc1xuICoqLyIsInZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG52YXIgZ2V0Q3NyZkNvb2tpZSA9IHJlcXVpcmUoJ2NsaWVudC9nZXRDc3JmQ29va2llJyk7XG4vLyBXcmFwcGVyIGFib3V0IFhIUlxuLy8gIyBHbG9iYWwgRXZlbnRzXG4vLyB0cmlnZ2VycyBkb2N1bWVudC5sb2Fkc3RhcnQvbG9hZGVuZCBvbiBjb21tdW5pY2F0aW9uIHN0YXJ0L2VuZFxuLy8gICAgLS0+IHVubGVzcyBvcHRpb25zLm5vR2xvYmFsRXZlbnRzIGlzIHNldFxuLy9cbi8vICMgRXZlbnRzXG4vLyB0cmlnZ2VycyBmYWlsL3N1Y2Nlc3Mgb24gbG9hZCBlbmQ6XG4vLyAgICAtLT4gYnkgZGVmYXVsdCBzdGF0dXM9MjAwIGlzIG9rLCB0aGUgb3RoZXJzIGFyZSBmYWlsdXJlc1xuLy8gICAgLS0+IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgPSBbMjAxLDQwOV0gYWxsb3cgZ2l2ZW4gc3RhdHVzZXNcbi8vICAgIC0tPiBmYWlsIGV2ZW50IGhhcyAucmVhc29uIGZpZWxkXG4vLyAgICAtLT4gc3VjY2VzcyBldmVudCBoYXMgLnJlc3VsdCBmaWVsZFxuLy9cbi8vICMgSlNPTlxuLy8gICAgLS0+IHNlbmQob2JqZWN0KSBjYWxscyBKU09OLnN0cmluZ2lmeVxuLy8gICAgLS0+IGFkZHMgQWNjZXB0OiBqc29uICh3ZSB3YW50IGpzb24pIGJ5IGRlZmF1bHQsIHVubGVzcyBvcHRpb25zLnJhd1xuLy8gaWYgb3B0aW9ucy5qc29uIG9yIHNlcnZlciByZXR1cm5lZCBqc29uIGNvbnRlbnQgdHlwZVxuLy8gICAgLS0+IGF1dG9wYXJzZSBqc29uXG4vLyAgICAtLT4gZmFpbCBpZiBlcnJvclxuLy9cbi8vICMgQ1NSRlxuLy8gICAgLS0+IHJlcXVlc3RzIHNlbmRzIGhlYWRlciBYLVhTUkYtVE9LRU4gZnJvbSBjb29raWVcblxuZnVuY3Rpb24geGhyKG9wdGlvbnMpIHtcblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHZhciBtZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuXG4gIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5zeW5jID8gZmFsc2UgOiB0cnVlKTtcblxuICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcblxuICAvLyB0b2tlbi9oZWFkZXIgbmFtZXMgc2FtZSBhcyBhbmd1bGFyICRodHRwIGZvciBlYXNpZXIgaW50ZXJvcFxuICB2YXIgY3NyZkNvb2tpZSA9IGdldENzcmZDb29raWUoKTtcbiAgaWYgKGNzcmZDb29raWUgJiYgIW9wdGlvbnMuc2tpcENzcmYpIHtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJYLVhTUkYtVE9LRU5cIiwgY3NyZkNvb2tpZSk7XG4gIH1cblxuICBpZiAoe30udG9TdHJpbmcuY2FsbChib2R5KSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIG11c3QgYmUgT1BFTmVkIHRvIHNldFJlcXVlc3RIZWFkZXJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cblxuICBpZiAoIW9wdGlvbnMubm9HbG9iYWxFdmVudHMpIHtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdGFydCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmVuZCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN1Y2Nlc3MnLCBldmVudCk7XG4gICAgICBlLnJlc3VsdCA9IGV2ZW50LnJlc3VsdDtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmZhaWwnLCBldmVudCk7XG4gICAgICBlLnJlYXNvbiA9IGV2ZW50LnJlYXNvbjtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucmF3KSB7IC8vIG1lYW5zIHdlIHdhbnQganNvblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIH1cblxuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuXG4gIHZhciBub3JtYWxTdGF0dXNlcyA9IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgfHwgWzIwMF07XG5cbiAgZnVuY3Rpb24gd3JhcEV2ZW50KG5hbWUsIGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSk7XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudCA9IGU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFpbChyZWFzb24sIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcImZhaWxcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZWFzb24gPSByZWFzb247XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcInN1Y2Nlc3NcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZXN1bHQgPSByZXN1bHQ7XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgZmFpbChcItCe0YjQuNCx0LrQsCDRgdCy0Y/Qt9C4INGBINGB0LXRgNCy0LXRgNC+0LwuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQn9GA0LXQstGL0YjQtdC90L4g0LzQsNC60YHQuNC80LDQu9GM0L3QviDQtNC+0L/Rg9GB0YLQuNC80L7QtSDQstGA0LXQvNGPINC+0LbQuNC00LDQvdC40Y8g0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0JfQsNC/0YDQvtGBINCx0YvQuyDQv9GA0LXRgNCy0LDQvS5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0LnN0YXR1cykgeyAvLyBkb2VzIHRoYXQgZXZlciBoYXBwZW4/XG4gICAgICBmYWlsKFwi0J3QtSDQv9C+0LvRg9GH0LXQvSDQvtGC0LLQtdGCINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxTdGF0dXNlcy5pbmRleE9mKHJlcXVlc3Quc3RhdHVzKSA9PSAtMSkge1xuICAgICAgZmFpbChcItCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwICjQutC+0LQgXCIgKyByZXF1ZXN0LnN0YXR1cyArIFwiKSwg0L/QvtC/0YvRgtCw0LnRgtC10YHRjCDQv9C+0LfQtNC90LXQtVwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICBpZiAoY29udGVudFR5cGUubWF0Y2goL15hcHBsaWNhdGlvblxcL2pzb24vKSB8fCBvcHRpb25zLmpzb24pIHsgLy8gYXV0b3BhcnNlIGpzb24gaWYgV0FOVCBvciBSRUNFSVZFRCBqc29uXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXCIsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VjY2VzcyhyZXN1bHQsIGUpO1xuICB9KTtcblxuICAvLyBkZWZlciB0byBsZXQgb3RoZXIgaGFuZGxlcnMgYmUgYXNzaWduZWRcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJlcXVlc3Quc2VuZChib2R5KTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LmdhKCdzZW5kJywgJ3RpbWluZycsICd4aHInLCBtZXRob2QgKyAnICcgKyB1cmwsIERhdGUubm93KCkgLSB0aW1lU3RhcnQpO1xuICAgIH0pO1xuICB9LCAwKTtcblxuXG5cblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5mdW5jdGlvbiBhZGRVcmxQYXJhbSh1cmwsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwYXJhbSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIGlmICh+dXJsLmluZGV4T2YoJz8nKSkge1xuICAgIHJldHVybiB1cmwgKyAnJicgKyBwYXJhbTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXJsICsgJz8nICsgcGFyYW07XG4gIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd4aHJmYWlsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZWFzb24pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB4aHI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC94aHIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY3NyZkNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvWFNSRi1UT0tFTj0oW1xcdy1dKykvKTtcbiAgcmV0dXJuIGNzcmZDb29raWUgPyBjc3JmQ29va2llWzFdIDogbnVsbDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2dldENzcmZDb29raWUuanNcbiAqKi8iLCJ2YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG52YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgZG9jdW1lbnQub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRhdGEtbmV3c2xldHRlci1zdWJzY3JpYmUtZm9ybVwiKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3VibWl0U3Vic2NyaWJlRm9ybShlLnRhcmdldCk7XG4gICAgfVxuICB9O1xuXG59XG5cbmZ1bmN0aW9uIHN1Ym1pdFN1YnNjcmliZUZvcm0oZm9ybSkge1xuXG4gIGlmICghZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3QgPSB4aHIoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogICAgZm9ybS5hY3Rpb24sXG4gICAgYm9keTogICB7XG4gICAgICBlbWFpbDogZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgIHNsdWc6IGZvcm0uZWxlbWVudHMuc2x1Zy52YWx1ZVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKTtcblxuICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICBlbGVtOiAgICAgIHN1Ym1pdEJ1dHRvbixcbiAgICBzaXplOiAgICAgICdzbWFsbCcsXG4gICAgZWxlbUNsYXNzOiAnYnV0dG9uX2xvYWRpbmcnXG4gIH0pO1xuICBzcGlubmVyLnN0YXJ0KCk7XG4gIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgKCk9PiB7XG4gICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgbmV3IG5vdGlmaWNhdGlvbi5TdWNjZXNzKGV2ZW50LnJlc3VsdC5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZXN1bHQubWVzc2FnZSk7XG4gICAgfVxuICB9KTtcblxuXG59XG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL25ld3NsZXR0ZXIvY2xpZW50L2luZGV4LmpzXG4gKiovIiwiXG52YXIgbGFzdFBhZ2VYID0gSW5maW5pdHksIGxhc3RQYWdlWSA9IEluZmluaXR5LCBsYXN0VGltZSA9IERhdGUubm93KCk7XG5cbnZhciBlbGVtZW50T3ZlcjtcblxudmFyIGVsZW1lbnRIb3Zlck92ZXI7XG5cbnZhciBzcGVlZFRvbGVyYW5jZSA9IDAuMjtcblxudmFyIGhhbmRsZXJzID0ge307XG5cbmZ1bmN0aW9uIGhvdmVySW50ZW50KHNlbGVjdG9yLCBvdmVyLCBvdXQpIHtcbiAgaGFuZGxlcnNbc2VsZWN0b3JdID0ge292ZXI6IG92ZXIsIG91dDogb3V0fTtcbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBtb3VzZW91dCk7XG5cbmZ1bmN0aW9uIG1vdXNlbW92ZShldmVudCkge1xuICBpZiAoZWxlbWVudEhvdmVyT3ZlcikgcmV0dXJuO1xuXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhldmVudC5wYWdlWCAtIGxhc3RQYWdlWCwgMikgKyBNYXRoLnBvdyhldmVudC5wYWdlWSAtIGxhc3RQYWdlWSwgMikpO1xuICB2YXIgc3BlZWQgPSBkaXN0YW5jZSAvIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG4gIC8vIHNsb3cgZG93biA9PiBjYWxsIG92ZXIoKSwgZ2V0IHRoZSBlbGVtZW50IG9mIGludGVyZXN0LFxuICAvLyB0aGVuIG91dCgpIHdoZW4gbGVhdmluZyBpdFxuICBpZiAoc3BlZWQgPCBzcGVlZFRvbGVyYW5jZSkge1xuICAgIC8vY29uc29sZS5sb2coXCJzcGVlZFwiLCBzcGVlZCk7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIGlmICghZWxlbSkgcmV0dXJuOyAvLyB0aGUgY29vcmRzIGFyZSBvdXQgb2Ygd2luZG93IChoYXBwZW5zKVxuICAgIGlmIChlbGVtICE9IGVsZW1lbnRPdmVyKSB7XG4gICAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBoYW5kbGVycykge1xuICAgICAgICB2YXIgY2xvc2VzdCA9IGVsZW0uY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChjbG9zZXN0KSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm92ZXIgXCIsIGNsb3Nlc3QpO1xuICAgICAgICAgIGVsZW1lbnRIb3Zlck92ZXIgPSB7IGVsZW06IGNsb3Nlc3QsIG91dDogaGFuZGxlcnNbc2VsZWN0b3JdLm91dH07XG4gICAgICAgICAgaGFuZGxlcnNbc2VsZWN0b3JdLm92ZXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbGVtZW50T3ZlciA9IGVsZW07XG4gICAgfVxuICB9XG5cbiAgbGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gIGxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICBsYXN0VGltZSA9IERhdGUubm93KCk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VvdXQoZXZlbnQpIHtcbiAgaWYgKCFlbGVtZW50SG92ZXJPdmVyKSByZXR1cm47XG5cbiAgdmFyIHBhcmVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gIHdoaWxlKHBhcmVudCkge1xuICAgIGlmIChwYXJlbnQgPT0gZWxlbWVudEhvdmVyT3Zlci5lbGVtKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwibW91c2VvdXQgZmFsc2VcIiwgZXZlbnQudGFyZ2V0LCBlbGVtZW50SG92ZXJPdmVyLmVsZW0pO1xuICAgICAgLy8gc3RpbGwgdW5kZXIgZWxlbWVudEhvdmVyT3ZlclxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgfVxuXG5cbiAgdmFyIG91dCA9IGVsZW1lbnRIb3Zlck92ZXIub3V0O1xuICBlbGVtZW50SG92ZXJPdmVyID0gbnVsbDtcbiAgb3V0KGV2ZW50KTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvdmVySW50ZW50O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hvdmVySW50ZW50LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9vdGVyLjYzNDdmOWE1OWQ1Y2JkY2ExMzIwLmpzIn0=
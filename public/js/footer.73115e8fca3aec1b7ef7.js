var footer =
webpackJsonp_name_([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	//require('./preventDocumentScroll');
	"use strict";
	
	var showLinkType = __webpack_require__(34);
	var load2x = __webpack_require__(35);
	var trackSticky = __webpack_require__(36);
	
	__webpack_require__(42).init();
	
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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(19);
	var getCsrfCookie = __webpack_require__(28);
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
	    request.send(body);
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

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var hoverIntent = __webpack_require__(53);
	
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

/***/ 35:
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

/***/ 36:
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

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Spinner = __webpack_require__(26);
	var xhr = __webpack_require__(27);
	var notification = __webpack_require__(19);
	
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

/***/ 53:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanM/ZDEyYSoiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2Zvb3Rlci9zaG93TGlua1R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2Zvb3Rlci9sb2FkMnguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3RyYWNrU3RpY2t5LmpzPzgxYjkiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvbmV3c2xldHRlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hvdmVySW50ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsRUFBZ0IsQ0FBQyxDQUFDO0FBQzdDLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsRUFBVSxDQUFDLENBQUM7QUFDakMsS0FBSSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxFQUFvQixDQUFDLENBQUM7O0FBRWhELG9CQUFPLENBQUMsRUFBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVwQyxRQUFPLENBQUMsSUFBSSxHQUFHLFlBQVc7QUFDeEIsZUFBWSxFQUFFLENBQUM7O0FBRWYsT0FBSSxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLFdBQU0sRUFBRSxDQUFDO0lBQ1Y7O0FBRUQsU0FBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMvQyxjQUFXLEVBQUUsQ0FBQztFQUNmLENBQUM7O0FBRUYsUUFBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLEM7Ozs7Ozs7OztBQ2xCakMsS0FBSSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFxQixDQUFDLENBQUM7QUFDbEQsS0FBSSxhQUFhLEdBQUcsbUJB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R0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLGFBQUksT0FBTyxFQUFFOztBQUVYLDJCQUFnQixHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDO0FBQ2pFLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ2hDO1FBQ0Y7QUFDRCxrQkFBVyxHQUFHLElBQUksQ0FBQztNQUNwQjtJQUNGOztBQUVELFlBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3hCLFlBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3hCLFdBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7RUFFdkI7O0FBRUQsVUFBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3ZCLE9BQUksQ0FBQyxnQkFBZ0I7QUFBRSxZQUFPO0lBRTlCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDakMsVUFBTSxNQUFNLEVBQUU7QUFDWixTQUFJLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7OztBQUduQyxjQUFPO01BQ1I7QUFDRCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUMvQjs7QUFHRCxPQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7QUFDL0IsbUJBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUVaOztBQUVELE9BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLy9yZXF1aXJlKCcuL3ByZXZlbnREb2N1bWVudFNjcm9sbCcpO1xudmFyIHNob3dMaW5rVHlwZSA9IHJlcXVpcmUoJy4vc2hvd0xpbmtUeXBlJyk7XG52YXIgbG9hZDJ4ID0gcmVxdWlyZSgnLi9sb2FkMngnKTtcbnZhciB0cmFja1N0aWNreSA9IHJlcXVpcmUoJ2NsaWVudC90cmFja1N0aWNreScpO1xuXG5yZXF1aXJlKCduZXdzbGV0dGVyL2NsaWVudCcpLmluaXQoKTtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHNob3dMaW5rVHlwZSgpO1xuXG4gIGlmICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEpIHtcbiAgICBsb2FkMngoKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1N0aWNreSk7XG4gIHRyYWNrU3RpY2t5KCk7XG59O1xuXG5leHBvcnRzLnRyYWNrU3RpY2t5ID0gdHJhY2tTdGlja3k7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzXG4gKiovIiwidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpXG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuICB9LCAwKTtcblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3JmQ29va2llID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pO1xuICByZXR1cm4gY3NyZkNvb2tpZSA/IGNzcmZDb29raWVbMV0gOiBudWxsO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qc1xuICoqLyIsInZhciBob3ZlckludGVudCA9IHJlcXVpcmUoJ2NsaWVudC9ob3ZlckludGVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciB0b29sdGlwU3BhbiA9IG51bGw7XG4gIHZhciBzaGlmdFggPSA4O1xuICB2YXIgc2hpZnRZID0gMTA7XG5cbiAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24oZXZlbnQpIHtcbiAgICB2YXIgbGVmdCA9IGV2ZW50LmNsaWVudFggKyBzaGlmdFg7XG4gICAgaWYgKGxlZnQgKyB0b29sdGlwU3Bhbi5vZmZzZXRXaWR0aCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgeyAvLyBpZiBiZXlvbmQgdGhlIHJpZ2h0IGRvY3VtZW50IGJvcmRlclxuICAgICAgLy8gbWlycm9yIHRvIHRoZSBsZWZ0XG4gICAgICBsZWZ0ID0gTWF0aC5tYXgoMCwgZXZlbnQuY2xpZW50WCAtIHNoaWZ0WCAtIHRvb2x0aXBTcGFuLm9mZnNldFdpZHRoKTtcbiAgICB9XG4gICAgdG9vbHRpcFNwYW4uc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuXG4gICAgdmFyIHRvcCA9IGV2ZW50LmNsaWVudFkgKyBzaGlmdFk7XG4gICAgaWYgKHRvcCArIHRvb2x0aXBTcGFuLm9mZnNldEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgIHRvcCA9IE1hdGgubWF4KDAsIGV2ZW50LmNsaWVudFkgLSBzaGlmdFkgLSB0b29sdGlwU3Bhbi5vZmZzZXRIZWlnaHQpO1xuICAgIH1cblxuICAgIHRvb2x0aXBTcGFuLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gIH1cblxuXG5cbiAgLy8gd2Ugc2hvdyB0b29sdGlwIGVsZW1lbnQgZm9yIGFueSBsaW5rIGhvdmVyLCBidXQgZmV3IG9mIHRoZW0gYWN0dWFsbHkgZ2V0IHN0eWxlZFxuICBmdW5jdGlvbiBvbk92ZXIoZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2EsIFtkYXRhLXRvb2x0aXBdJyk7XG5cbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgLy8gbGlua3MgaW5zaWRlIHRvb2xiYXJzIG5lZWQgbm8gdG9vbHRpcHNcbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0EnICYmIHRhcmdldC5jbG9zZXN0KCcudG9vbGJhcicpKSByZXR1cm47XG5cbiAgICB0b29sdGlwU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0b29sdGlwU3Bhbi5jbGFzc05hbWUgPSAnbGlua19fdHlwZSc7XG5cbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJykpIHtcbiAgICAgIHRvb2x0aXBTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b29sdGlwU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdXJsJywgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvb2x0aXBTcGFuKTtcbiAgICB1cGRhdGVQb3NpdGlvbihldmVudCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGVQb3NpdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk91dCgpIHtcbiAgICBpZiAoIXRvb2x0aXBTcGFuKSByZXR1cm47XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGVQb3NpdGlvbik7XG4gICAgdG9vbHRpcFNwYW4ucmVtb3ZlKCk7XG4gICAgdG9vbHRpcFNwYW4gPSBudWxsO1xuICB9XG5cbiAgaG92ZXJJbnRlbnQoJ2EsW2RhdGEtdG9vbHRpcF0nLCBvbk92ZXIsIG9uT3V0KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2Zvb3Rlci9zaG93TGlua1R5cGUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIGxldCBmaWd1cmVQbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZmlndXJlIGltZ1tzcmMkPVwiLnBuZ1wiXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZmlndXJlUG5ncy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBwbmcgPSBmaWd1cmVQbmdzW2ldO1xuXG4gICAgLy8gbG9hZCBAMnggdmVyc2lvbiAobXVzdCBleGlzdClcbiAgICBwbmcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgdGhpcy5vbmxvYWQ7XG4gICAgICBpZiAodGhpcy5zcmMubWF0Y2goL0AyeC5wbmckLykpIHJldHVybjtcblxuICAgICAgbGV0IHBuZzJ4ID0gbmV3IEltYWdlKCk7XG4gICAgICBwbmcyeC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zcmMpO1xuICAgICAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodCkge1xuICAgICAgICAgIHBuZy5zcmMgPSB0aGlzLnNyYztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHBuZzJ4LnNyYyA9IHRoaXMuc3JjLnJlcGxhY2UoJy5wbmcnLCAnQDJ4LnBuZycpO1xuICAgIH07XG4gICAgaWYgKHBuZy5jb21wbGV0ZSkgcG5nLm9ubG9hZCgpO1xuXG4gIH1cblxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9mb290ZXIvbG9hZDJ4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cmFja1N0aWNreTtcblxuXG5mdW5jdGlvbiB0cmFja1N0aWNreSgpIHtcblxuICB2YXIgc3RpY2t5RWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdGlja3ldJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGlja3lFbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzdGlja3lFbGVtID0gc3RpY2t5RWxlbXNbaV07XG4gICAgdmFyIGNvbnRhaW5lciA9IHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kgP1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3lFbGVtLmRhdGFzZXQuc3RpY2t5KSA6IGRvY3VtZW50LmJvZHk7XG5cbiAgICBpZiAoc3RpY2t5RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XG4gICAgICAvLyBiZWNvbWUgZml4ZWRcbiAgICAgIGlmIChzdGlja3lFbGVtLnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgLy8gYWxyZWFkeSBmaXhlZFxuICAgICAgICAvLyBpbmVydGlhOiBoYXBwZW5zIHdoZW4gc2Nyb2xsZWQgZmFzdCB0b28gbXVjaCB0byBib3R0b21cbiAgICAgICAgLy8gaHR0cDovL2lseWFrYW50b3IucnUvc2NyZWVuLzIwMTUtMDItMjRfMTU1NS5zd2ZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2F2ZWRMZWZ0ID0gc3RpY2t5RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gY3JlYXRlUGxhY2Vob2xkZXIoc3RpY2t5RWxlbSk7XG5cbiAgICAgIHN0aWNreUVsZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHN0aWNreUVsZW0pO1xuXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RpY2t5RWxlbSk7XG4gICAgICBzdGlja3lFbGVtLmNsYXNzTGlzdC5hZGQoJ3N0aWNreScpO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmxlZnQgPSBzYXZlZExlZnQgKyAncHgnO1xuICAgICAgLy8gekluZGV4IDwgMTAwMCwgYmVjYXVzZSBpdCBtdXN0IGJlIHVuZGVyIGFuIG92ZXJsYXksXG4gICAgICAvLyBlLmcuIHNpdGVtYXAgbXVzdCBzaG93IG92ZXIgdGhlIHByb2dyZXNzIGJhclxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS56SW5kZXggPSAxMDE7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnOyAvLyBub24tdHJhbnNwYXJlbnQgdG8gY292ZXIgdGhlIHRleHRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubWFyZ2luID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUud2lkdGggPSBwbGFjZWhvbGRlci5vZmZzZXRXaWR0aCArICdweCc7IC8vIGtlZXAgc2FtZSB3aWR0aCBhcyBiZWZvcmVcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9IGVsc2UgaWYgKHN0aWNreUVsZW0ucGxhY2Vob2xkZXIgJiYgc3RpY2t5RWxlbS5wbGFjZWhvbGRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiAwKSB7XG4gICAgICAvLyBiZWNvbWUgbm9uLWZpeGVkXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmNzc1RleHQgPSAnJztcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0aWNreUVsZW0sIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIpO1xuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlci5yZW1vdmUoKTtcblxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcGxhY2Vob2xkZXIgdy8gc2FtZSBzaXplICYgbWFyZ2luXG4gKiBAcGFyYW0gZWxlbVxuICogQHJldHVybnMgeyp8IUhUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlcihlbGVtKSB7XG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICBwbGFjZWhvbGRlci5zdHlsZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGggKyAncHgnO1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5MZWZ0ID0gc3R5bGUubWFyZ2luTGVmdDtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luUmlnaHQgPSBzdHlsZS5tYXJnaW5SaWdodDtcbiAgcGxhY2Vob2xkZXIuc3R5bGUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBzdHlsZS5tYXJnaW5Cb3R0b207XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpblRvcCA9IHN0eWxlLm1hcmdpblRvcDtcbiAgcmV0dXJuIHBsYWNlaG9sZGVyO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3RyYWNrU3RpY2t5LmpzXG4gKiovIiwidmFyIFNwaW5uZXIgPSByZXF1aXJlKCdjbGllbnQvc3Bpbm5lcicpO1xudmFyIHhociA9IHJlcXVpcmUoJ2NsaWVudC94aHInKTtcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGRvY3VtZW50Lm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkYXRhLW5ld3NsZXR0ZXItc3Vic2NyaWJlLWZvcm1cIikpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN1Ym1pdFN1YnNjcmliZUZvcm0oZS50YXJnZXQpO1xuICAgIH1cbiAgfTtcblxufVxuXG5mdW5jdGlvbiBzdWJtaXRTdWJzY3JpYmVGb3JtKGZvcm0pIHtcblxuICBpZiAoIWZvcm0uZWxlbWVudHMuZW1haWwudmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0ID0geGhyKHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICAgIGZvcm0uYWN0aW9uLFxuICAgIGJvZHk6ICAge1xuICAgICAgZW1haWw6IGZvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICBzbHVnOiBmb3JtLmVsZW1lbnRzLnNsdWcudmFsdWVcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBzdWJtaXRCdXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJyk7XG5cbiAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcih7XG4gICAgZWxlbTogICAgICBzdWJtaXRCdXR0b24sXG4gICAgc2l6ZTogICAgICAnc21hbGwnLFxuICAgIGVsZW1DbGFzczogJ2J1dHRvbl9sb2FkaW5nJ1xuICB9KTtcbiAgc3Bpbm5lci5zdGFydCgpO1xuICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsICgpPT4ge1xuICAgIHNwaW5uZXIuc3RvcCgpO1xuICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIG5ldyBub3RpZmljYXRpb24uU3VjY2VzcyhldmVudC5yZXN1bHQubWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVzdWx0Lm1lc3NhZ2UpO1xuICAgIH1cbiAgfSk7XG5cblxufVxuXG5leHBvcnRzLmluaXQgPSBpbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9uZXdzbGV0dGVyL2NsaWVudC9pbmRleC5qc1xuICoqLyIsIlxudmFyIGxhc3RQYWdlWCA9IEluZmluaXR5LCBsYXN0UGFnZVkgPSBJbmZpbml0eSwgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG52YXIgZWxlbWVudE92ZXI7XG5cbnZhciBlbGVtZW50SG92ZXJPdmVyO1xuXG52YXIgc3BlZWRUb2xlcmFuY2UgPSAwLjI7XG5cbnZhciBoYW5kbGVycyA9IHt9O1xuXG5mdW5jdGlvbiBob3ZlckludGVudChzZWxlY3Rvciwgb3Zlciwgb3V0KSB7XG4gIGhhbmRsZXJzW3NlbGVjdG9yXSA9IHtvdmVyOiBvdmVyLCBvdXQ6IG91dH07XG59XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgbW91c2VvdXQpO1xuXG5mdW5jdGlvbiBtb3VzZW1vdmUoZXZlbnQpIHtcbiAgaWYgKGVsZW1lbnRIb3Zlck92ZXIpIHJldHVybjtcblxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZXZlbnQucGFnZVggLSBsYXN0UGFnZVgsIDIpICsgTWF0aC5wb3coZXZlbnQucGFnZVkgLSBsYXN0UGFnZVksIDIpKTtcbiAgdmFyIHNwZWVkID0gZGlzdGFuY2UgLyAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuICAvLyBzbG93IGRvd24gPT4gY2FsbCBvdmVyKCksIGdldCB0aGUgZWxlbWVudCBvZiBpbnRlcmVzdCxcbiAgLy8gdGhlbiBvdXQoKSB3aGVuIGxlYXZpbmcgaXRcbiAgaWYgKHNwZWVkIDwgc3BlZWRUb2xlcmFuY2UpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwic3BlZWRcIiwgc3BlZWQpO1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjsgLy8gdGhlIGNvb3JkcyBhcmUgb3V0IG9mIHdpbmRvdyAoaGFwcGVucylcbiAgICBpZiAoZWxlbSAhPSBlbGVtZW50T3Zlcikge1xuICAgICAgZm9yICh2YXIgc2VsZWN0b3IgaW4gaGFuZGxlcnMpIHtcbiAgICAgICAgdmFyIGNsb3Nlc3QgPSBlbGVtLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJvdmVyIFwiLCBjbG9zZXN0KTtcbiAgICAgICAgICBlbGVtZW50SG92ZXJPdmVyID0geyBlbGVtOiBjbG9zZXN0LCBvdXQ6IGhhbmRsZXJzW3NlbGVjdG9yXS5vdXR9O1xuICAgICAgICAgIGhhbmRsZXJzW3NlbGVjdG9yXS5vdmVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxlbWVudE92ZXIgPSBlbGVtO1xuICAgIH1cbiAgfVxuXG4gIGxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICBsYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlb3V0KGV2ZW50KSB7XG4gIGlmICghZWxlbWVudEhvdmVyT3ZlcikgcmV0dXJuO1xuXG4gIHZhciBwYXJlbnQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICB3aGlsZShwYXJlbnQpIHtcbiAgICBpZiAocGFyZW50ID09IGVsZW1lbnRIb3Zlck92ZXIuZWxlbSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIm1vdXNlb3V0IGZhbHNlXCIsIGV2ZW50LnRhcmdldCwgZWxlbWVudEhvdmVyT3Zlci5lbGVtKTtcbiAgICAgIC8vIHN0aWxsIHVuZGVyIGVsZW1lbnRIb3Zlck92ZXJcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuXG4gIHZhciBvdXQgPSBlbGVtZW50SG92ZXJPdmVyLm91dDtcbiAgZWxlbWVudEhvdmVyT3ZlciA9IG51bGw7XG4gIG91dChldmVudCk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob3ZlckludGVudDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9ob3ZlckludGVudC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImZvb3Rlci43MzExNWU4ZmNhM2FlYzFiN2VmNy5qcyJ9
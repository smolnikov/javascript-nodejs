var footer =
webpackJsonp_name_([4],{

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

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(19);
	var getCsrfCookie = __webpack_require__(33);
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

/***/ 33:
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
	
	var hoverIntent = __webpack_require__(50);
	
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
	
	var Spinner = __webpack_require__(32);
	var xhr = __webpack_require__(30);
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

/***/ 50:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qcz9kMTJhIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvc2hvd0xpbmtUeXBlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvbG9hZDJ4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC90cmFja1N0aWNreS5qcyIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9uZXdzbGV0dGVyL2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaG92ZXJJbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsS0FBSSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxFQUFnQixDQUFDLENBQUM7QUFDN0MsS0FBSSxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxFQUFVLENBQUMsQ0FBQztBQUNqQyxLQUFJLFdBQVcsR0FBRyxtQkFBTyxDQUFDLEVBQW9CLENBQUMsQ0FBQzs7QUFFaEQsb0JBQU8sQ0FBQyxFQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRXBDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUN4QixlQUFZLEVBQUUsQ0FBQzs7QUFFZixPQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUU7QUFDL0IsV0FBTSxFQUFFLENBQUM7SUFDVjs7QUFFRCxTQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLGNBQVcsRUFBRSxDQUFDO0VBQ2YsQ0FBQzs7QUFFRixRQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQzs7Ozs7Ozs7O0FDbEJqQyxLQUFJLFlBQVksR0FBRyxtQkFBTyxDQUFDLEVBQXFCLENBQUMsQ0FBQztBQUNsRCxLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFD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LENBQUM7QUFDeEIsTUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBRVo7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3JlcXVpcmUoJy4vcHJldmVudERvY3VtZW50U2Nyb2xsJyk7XG52YXIgc2hvd0xpbmtUeXBlID0gcmVxdWlyZSgnLi9zaG93TGlua1R5cGUnKTtcbnZhciBsb2FkMnggPSByZXF1aXJlKCcuL2xvYWQyeCcpO1xudmFyIHRyYWNrU3RpY2t5ID0gcmVxdWlyZSgnY2xpZW50L3RyYWNrU3RpY2t5Jyk7XG5cbnJlcXVpcmUoJ25ld3NsZXR0ZXIvY2xpZW50JykuaW5pdCgpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgc2hvd0xpbmtUeXBlKCk7XG5cbiAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuICAgIGxvYWQyeCgpO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU3RpY2t5KTtcbiAgdHJhY2tTdGlja3koKTtcbn07XG5cbmV4cG9ydHMudHJhY2tTdGlja3kgPSB0cmFja1N0aWNreTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9mb290ZXIvaW5kZXguanNcbiAqKi8iLCJ2YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGdldENzcmZDb29raWUgPSByZXF1aXJlKCdjbGllbnQvZ2V0Q3NyZkNvb2tpZScpO1xuLy8gV3JhcHBlciBhYm91dCBYSFJcbi8vICMgR2xvYmFsIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZG9jdW1lbnQubG9hZHN0YXJ0L2xvYWRlbmQgb24gY29tbXVuaWNhdGlvbiBzdGFydC9lbmRcbi8vICAgIC0tPiB1bmxlc3Mgb3B0aW9ucy5ub0dsb2JhbEV2ZW50cyBpcyBzZXRcbi8vXG4vLyAjIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZmFpbC9zdWNjZXNzIG9uIGxvYWQgZW5kOlxuLy8gICAgLS0+IGJ5IGRlZmF1bHQgc3RhdHVzPTIwMCBpcyBvaywgdGhlIG90aGVycyBhcmUgZmFpbHVyZXNcbi8vICAgIC0tPiBvcHRpb25zLm5vcm1hbFN0YXR1c2VzID0gWzIwMSw0MDldIGFsbG93IGdpdmVuIHN0YXR1c2VzXG4vLyAgICAtLT4gZmFpbCBldmVudCBoYXMgLnJlYXNvbiBmaWVsZFxuLy8gICAgLS0+IHN1Y2Nlc3MgZXZlbnQgaGFzIC5yZXN1bHQgZmllbGRcbi8vXG4vLyAjIEpTT05cbi8vICAgIC0tPiBzZW5kKG9iamVjdCkgY2FsbHMgSlNPTi5zdHJpbmdpZnlcbi8vICAgIC0tPiBhZGRzIEFjY2VwdDoganNvbiAod2Ugd2FudCBqc29uKSBieSBkZWZhdWx0LCB1bmxlc3Mgb3B0aW9ucy5yYXdcbi8vIGlmIG9wdGlvbnMuanNvbiBvciBzZXJ2ZXIgcmV0dXJuZWQganNvbiBjb250ZW50IHR5cGVcbi8vICAgIC0tPiBhdXRvcGFyc2UganNvblxuLy8gICAgLS0+IGZhaWwgaWYgZXJyb3Jcbi8vXG4vLyAjIENTUkZcbi8vICAgIC0tPiByZXF1ZXN0cyBzZW5kcyBoZWFkZXIgWC1YU1JGLVRPS0VOIGZyb20gY29va2llXG5cbmZ1bmN0aW9uIHhocihvcHRpb25zKSB7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB2YXIgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybDtcblxuICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuc3luYyA/IGZhbHNlIDogdHJ1ZSk7XG5cbiAgcmVxdWVzdC5tZXRob2QgPSBtZXRob2Q7XG5cbiAgLy8gdG9rZW4vaGVhZGVyIG5hbWVzIHNhbWUgYXMgYW5ndWxhciAkaHR0cCBmb3IgZWFzaWVyIGludGVyb3BcbiAgdmFyIGNzcmZDb29raWUgPSBnZXRDc3JmQ29va2llKCk7XG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVTdGFydCA9IERhdGUubm93KCk7XG5cbiAgICByZXF1ZXN0LnNlbmQoYm9keSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5nYSgnc2VuZCcsICd0aW1pbmcnLCAneGhyJywgbWV0aG9kICsgJyAnICsgdXJsLCBEYXRlLm5vdygpIC0gdGltZVN0YXJ0KTtcbiAgICB9KTtcbiAgfSwgMCk7XG5cblxuXG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG5cbn1cblxuZnVuY3Rpb24gYWRkVXJsUGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgcGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICBpZiAofnVybC5pbmRleE9mKCc/JykpIHtcbiAgICByZXR1cm4gdXJsICsgJyYnICsgcGFyYW07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVybCArICc/JyArIHBhcmFtO1xuICB9XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigneGhyZmFpbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVhc29uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geGhyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQveGhyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNzcmZDb29raWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLyk7XG4gIHJldHVybiBjc3JmQ29va2llID8gY3NyZkNvb2tpZVsxXSA6IG51bGw7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9nZXRDc3JmQ29va2llLmpzXG4gKiovIiwidmFyIGhvdmVySW50ZW50ID0gcmVxdWlyZSgnY2xpZW50L2hvdmVySW50ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHRvb2x0aXBTcGFuID0gbnVsbDtcbiAgdmFyIHNoaWZ0WCA9IDg7XG4gIHZhciBzaGlmdFkgPSAxMDtcblxuICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbihldmVudCkge1xuICAgIHZhciBsZWZ0ID0gZXZlbnQuY2xpZW50WCArIHNoaWZ0WDtcbiAgICBpZiAobGVmdCArIHRvb2x0aXBTcGFuLm9mZnNldFdpZHRoID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7IC8vIGlmIGJleW9uZCB0aGUgcmlnaHQgZG9jdW1lbnQgYm9yZGVyXG4gICAgICAvLyBtaXJyb3IgdG8gdGhlIGxlZnRcbiAgICAgIGxlZnQgPSBNYXRoLm1heCgwLCBldmVudC5jbGllbnRYIC0gc2hpZnRYIC0gdG9vbHRpcFNwYW4ub2Zmc2V0V2lkdGgpO1xuICAgIH1cbiAgICB0b29sdGlwU3Bhbi5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG5cbiAgICB2YXIgdG9wID0gZXZlbnQuY2xpZW50WSArIHNoaWZ0WTtcbiAgICBpZiAodG9wICsgdG9vbHRpcFNwYW4ub2Zmc2V0SGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgdG9wID0gTWF0aC5tYXgoMCwgZXZlbnQuY2xpZW50WSAtIHNoaWZ0WSAtIHRvb2x0aXBTcGFuLm9mZnNldEhlaWdodCk7XG4gICAgfVxuXG4gICAgdG9vbHRpcFNwYW4uc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgfVxuXG5cblxuICAvLyB3ZSBzaG93IHRvb2x0aXAgZWxlbWVudCBmb3IgYW55IGxpbmsgaG92ZXIsIGJ1dCBmZXcgb2YgdGhlbSBhY3R1YWxseSBnZXQgc3R5bGVkXG4gIGZ1bmN0aW9uIG9uT3ZlcihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYSwgW2RhdGEtdG9vbHRpcF0nKTtcblxuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAvLyBsaW5rcyBpbnNpZGUgdG9vbGJhcnMgbmVlZCBubyB0b29sdGlwc1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnQScgJiYgdGFyZ2V0LmNsb3Nlc3QoJy50b29sYmFyJykpIHJldHVybjtcblxuICAgIHRvb2x0aXBTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRvb2x0aXBTcGFuLmNsYXNzTmFtZSA9ICdsaW5rX190eXBlJztcblxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKSkge1xuICAgICAgdG9vbHRpcFNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvb2x0aXBTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9vbHRpcFNwYW4pO1xuICAgIHVwZGF0ZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uT3V0KCkge1xuICAgIGlmICghdG9vbHRpcFNwYW4pIHJldHVybjtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB0b29sdGlwU3Bhbi5yZW1vdmUoKTtcbiAgICB0b29sdGlwU3BhbiA9IG51bGw7XG4gIH1cblxuICBob3ZlckludGVudCgnYSxbZGF0YS10b29sdGlwXScsIG9uT3Zlciwgb25PdXQpO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZm9vdGVyL3Nob3dMaW5rVHlwZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgbGV0IGZpZ3VyZVBuZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmaWd1cmUgaW1nW3NyYyQ9XCIucG5nXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWd1cmVQbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHBuZyA9IGZpZ3VyZVBuZ3NbaV07XG5cbiAgICAvLyBsb2FkIEAyeCB2ZXJzaW9uIChtdXN0IGV4aXN0KVxuICAgIHBuZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm9ubG9hZDtcbiAgICAgIGlmICh0aGlzLnNyYy5tYXRjaCgvQDJ4LnBuZyQvKSkgcmV0dXJuO1xuXG4gICAgICBsZXQgcG5nMnggPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHBuZzJ4Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNyYyk7XG4gICAgICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgcG5nLnNyYyA9IHRoaXMuc3JjO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcG5nMnguc3JjID0gdGhpcy5zcmMucmVwbGFjZSgnLnBuZycsICdAMngucG5nJyk7XG4gICAgfTtcbiAgICBpZiAocG5nLmNvbXBsZXRlKSBwbmcub25sb2FkKCk7XG5cbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2Zvb3Rlci9sb2FkMnguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYWNrU3RpY2t5O1xuXG5cbmZ1bmN0aW9uIHRyYWNrU3RpY2t5KCkge1xuXG4gIHZhciBzdGlja3lFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0aWNreV0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNreUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN0aWNreUVsZW0gPSBzdGlja3lFbGVtc1tpXTtcbiAgICB2YXIgY29udGFpbmVyID0gc3RpY2t5RWxlbS5kYXRhc2V0LnN0aWNreSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kpIDogZG9jdW1lbnQuYm9keTtcblxuICAgIGlmIChzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDApIHtcbiAgICAgIC8vIGJlY29tZSBmaXhlZFxuICAgICAgaWYgKHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAvLyBhbHJlYWR5IGZpeGVkXG4gICAgICAgIC8vIGluZXJ0aWE6IGhhcHBlbnMgd2hlbiBzY3JvbGxlZCBmYXN0IHRvbyBtdWNoIHRvIGJvdHRvbVxuICAgICAgICAvLyBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNS0wMi0yNF8xNTU1LnN3ZlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYXZlZExlZnQgPSBzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjcmVhdGVQbGFjZWhvbGRlcihzdGlja3lFbGVtKTtcblxuICAgICAgc3RpY2t5RWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgc3RpY2t5RWxlbSk7XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGlja3lFbGVtKTtcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubGVmdCA9IHNhdmVkTGVmdCArICdweCc7XG4gICAgICAvLyB6SW5kZXggPCAxMDAwLCBiZWNhdXNlIGl0IG11c3QgYmUgdW5kZXIgYW4gb3ZlcmxheSxcbiAgICAgIC8vIGUuZy4gc2l0ZW1hcCBtdXN0IHNob3cgb3ZlciB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnpJbmRleCA9IDEwMTtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7IC8vIG5vbi10cmFuc3BhcmVudCB0byBjb3ZlciB0aGUgdGV4dFxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5tYXJnaW4gPSAwO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS53aWR0aCA9IHBsYWNlaG9sZGVyLm9mZnNldFdpZHRoICsgJ3B4JzsgLy8ga2VlcCBzYW1lIHdpZHRoIGFzIGJlZm9yZVxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH0gZWxzZSBpZiAoc3RpY2t5RWxlbS5wbGFjZWhvbGRlciAmJiBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDApIHtcbiAgICAgIC8vIGJlY29tZSBub24tZml4ZWRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgICAgc3RpY2t5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RpY2t5RWxlbSwgc3RpY2t5RWxlbS5wbGFjZWhvbGRlcik7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xuXG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGFjZWhvbGRlciB3LyBzYW1lIHNpemUgJiBtYXJnaW5cbiAqIEBwYXJhbSBlbGVtXG4gKiBAcmV0dXJucyB7KnwhSFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKGVsZW0pIHtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkxlZnQgPSBzdHlsZS5tYXJnaW5MZWZ0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5SaWdodCA9IHN0eWxlLm1hcmdpblJpZ2h0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IHN0eWxlLm1hcmdpbkJvdHRvbTtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luVG9wID0gc3R5bGUubWFyZ2luVG9wO1xuICByZXR1cm4gcGxhY2Vob2xkZXI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvdHJhY2tTdGlja3kuanNcbiAqKi8iLCJ2YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG52YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgZG9jdW1lbnQub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRhdGEtbmV3c2xldHRlci1zdWJzY3JpYmUtZm9ybVwiKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc3VibWl0U3Vic2NyaWJlRm9ybShlLnRhcmdldCk7XG4gICAgfVxuICB9O1xuXG59XG5cbmZ1bmN0aW9uIHN1Ym1pdFN1YnNjcmliZUZvcm0oZm9ybSkge1xuXG4gIGlmICghZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3QgPSB4aHIoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogICAgZm9ybS5hY3Rpb24sXG4gICAgYm9keTogICB7XG4gICAgICBlbWFpbDogZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSxcbiAgICAgIHNsdWc6IGZvcm0uZWxlbWVudHMuc2x1Zy52YWx1ZVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKTtcblxuICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICBlbGVtOiAgICAgIHN1Ym1pdEJ1dHRvbixcbiAgICBzaXplOiAgICAgICdzbWFsbCcsXG4gICAgZWxlbUNsYXNzOiAnYnV0dG9uX2xvYWRpbmcnXG4gIH0pO1xuICBzcGlubmVyLnN0YXJ0KCk7XG4gIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgKCk9PiB7XG4gICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgbmV3IG5vdGlmaWNhdGlvbi5TdWNjZXNzKGV2ZW50LnJlc3VsdC5tZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZXN1bHQubWVzc2FnZSk7XG4gICAgfVxuICB9KTtcblxuXG59XG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL25ld3NsZXR0ZXIvY2xpZW50L2luZGV4LmpzXG4gKiovIiwiXG52YXIgbGFzdFBhZ2VYID0gSW5maW5pdHksIGxhc3RQYWdlWSA9IEluZmluaXR5LCBsYXN0VGltZSA9IERhdGUubm93KCk7XG5cbnZhciBlbGVtZW50T3ZlcjtcblxudmFyIGVsZW1lbnRIb3Zlck92ZXI7XG5cbnZhciBzcGVlZFRvbGVyYW5jZSA9IDAuMjtcblxudmFyIGhhbmRsZXJzID0ge307XG5cbmZ1bmN0aW9uIGhvdmVySW50ZW50KHNlbGVjdG9yLCBvdmVyLCBvdXQpIHtcbiAgaGFuZGxlcnNbc2VsZWN0b3JdID0ge292ZXI6IG92ZXIsIG91dDogb3V0fTtcbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmUpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBtb3VzZW91dCk7XG5cbmZ1bmN0aW9uIG1vdXNlbW92ZShldmVudCkge1xuICBpZiAoZWxlbWVudEhvdmVyT3ZlcikgcmV0dXJuO1xuXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhldmVudC5wYWdlWCAtIGxhc3RQYWdlWCwgMikgKyBNYXRoLnBvdyhldmVudC5wYWdlWSAtIGxhc3RQYWdlWSwgMikpO1xuICB2YXIgc3BlZWQgPSBkaXN0YW5jZSAvIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG4gIC8vIHNsb3cgZG93biA9PiBjYWxsIG92ZXIoKSwgZ2V0IHRoZSBlbGVtZW50IG9mIGludGVyZXN0LFxuICAvLyB0aGVuIG91dCgpIHdoZW4gbGVhdmluZyBpdFxuICBpZiAoc3BlZWQgPCBzcGVlZFRvbGVyYW5jZSkge1xuICAgIC8vY29uc29sZS5sb2coXCJzcGVlZFwiLCBzcGVlZCk7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgIGlmICghZWxlbSkgcmV0dXJuOyAvLyB0aGUgY29vcmRzIGFyZSBvdXQgb2Ygd2luZG93IChoYXBwZW5zKVxuICAgIGlmIChlbGVtICE9IGVsZW1lbnRPdmVyKSB7XG4gICAgICBmb3IgKHZhciBzZWxlY3RvciBpbiBoYW5kbGVycykge1xuICAgICAgICB2YXIgY2xvc2VzdCA9IGVsZW0uY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgICAgIGlmIChjbG9zZXN0KSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIm92ZXIgXCIsIGNsb3Nlc3QpO1xuICAgICAgICAgIGVsZW1lbnRIb3Zlck92ZXIgPSB7IGVsZW06IGNsb3Nlc3QsIG91dDogaGFuZGxlcnNbc2VsZWN0b3JdLm91dH07XG4gICAgICAgICAgaGFuZGxlcnNbc2VsZWN0b3JdLm92ZXIoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbGVtZW50T3ZlciA9IGVsZW07XG4gICAgfVxuICB9XG5cbiAgbGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gIGxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICBsYXN0VGltZSA9IERhdGUubm93KCk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VvdXQoZXZlbnQpIHtcbiAgaWYgKCFlbGVtZW50SG92ZXJPdmVyKSByZXR1cm47XG5cbiAgdmFyIHBhcmVudCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gIHdoaWxlKHBhcmVudCkge1xuICAgIGlmIChwYXJlbnQgPT0gZWxlbWVudEhvdmVyT3Zlci5lbGVtKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwibW91c2VvdXQgZmFsc2VcIiwgZXZlbnQudGFyZ2V0LCBlbGVtZW50SG92ZXJPdmVyLmVsZW0pO1xuICAgICAgLy8gc3RpbGwgdW5kZXIgZWxlbWVudEhvdmVyT3ZlclxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgfVxuXG5cbiAgdmFyIG91dCA9IGVsZW1lbnRIb3Zlck92ZXIub3V0O1xuICBlbGVtZW50SG92ZXJPdmVyID0gbnVsbDtcbiAgb3V0KGV2ZW50KTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhvdmVySW50ZW50O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2hvdmVySW50ZW50LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9vdGVyLjRmYTA2MmMxZTBhZDk0MzJlODc0LmpzIn0=
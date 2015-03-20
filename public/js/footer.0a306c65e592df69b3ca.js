var footer =
webpackJsonp_name_([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	//require('./preventDocumentScroll');
	"use strict";
	
	var showLinkType = __webpack_require__(14);
	var load2x = __webpack_require__(15);
	var trackSticky = __webpack_require__(16);
	
	__webpack_require__(37).init();
	
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

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var hoverIntent = __webpack_require__(47);
	
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

/***/ 15:
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

/***/ 16:
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

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(22);
	var getCsrfCookie = __webpack_require__(31);
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

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Spinner = __webpack_require__(29);
	var xhr = __webpack_require__(30);
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

/***/ 47:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvc2hvd0xpbmtUeXBlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9mb290ZXIvbG9hZDJ4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC90cmFja1N0aWNreS5qcz84MWI5Iiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanM/ZDEyYSoiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvbmV3c2xldHRlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2hvdmVySW50ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsRUFBZ0IsQ0FBQyxDQUFDO0FBQzdDLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsRUFBVSxDQUFDLENBQUM7QUFDakMsS0FBSSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxFQUFvQixDQUFDLENBQUM7O0FBRWhELG9CQUFPLENBQUMsRUFBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVwQyxRQUFPLENBQUMsSUFBSSxHQUFHLFlBQVc7QUFDeEIsZUFBWSxFQUFFLENBQUM7O0FBRWYsT0FBSSxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO0FBQy9CLFdBQU0sRUFBRSxDQUFDO0lBQ1Y7O0FBRUQsU0FBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMvQyxjQUFXLEVBQUUsQ0FBQztFQUNmLENBQUM7O0FBRUYsUUFBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLEM7Ozs7Ozs7OztBQ2xCakMsS0FBSSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxFQUFvQixDQUFDLENBQUM7O0FBRWhELE9BQU0sQ0FBQyxPQUFPLEdB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R0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLGFBQUksT0FBTyxFQUFFOztBQUVYLDJCQUFnQixHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDO0FBQ2pFLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ2hDO1FBQ0Y7QUFDRCxrQkFBVyxHQUFHLElBQUksQ0FBQztNQUNwQjtJQUNGOztBQUVELFlBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3hCLFlBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3hCLFdBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7RUFFdkI7O0FBRUQsVUFBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3ZCLE9BQUksQ0FBQyxnQkFBZ0I7QUFBRSxZQUFPO0lBRTlCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDakMsVUFBTSxNQUFNLEVBQUU7QUFDWixTQUFJLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7OztBQUduQyxjQUFPO01BQ1I7QUFDRCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUMvQjs7QUFHRCxPQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7QUFDL0IsbUJBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUVaOztBQUVELE9BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLy9yZXF1aXJlKCcuL3ByZXZlbnREb2N1bWVudFNjcm9sbCcpO1xudmFyIHNob3dMaW5rVHlwZSA9IHJlcXVpcmUoJy4vc2hvd0xpbmtUeXBlJyk7XG52YXIgbG9hZDJ4ID0gcmVxdWlyZSgnLi9sb2FkMngnKTtcbnZhciB0cmFja1N0aWNreSA9IHJlcXVpcmUoJ2NsaWVudC90cmFja1N0aWNreScpO1xuXG5yZXF1aXJlKCduZXdzbGV0dGVyL2NsaWVudCcpLmluaXQoKTtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHNob3dMaW5rVHlwZSgpO1xuXG4gIGlmICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEpIHtcbiAgICBsb2FkMngoKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0cmFja1N0aWNreSk7XG4gIHRyYWNrU3RpY2t5KCk7XG59O1xuXG5leHBvcnRzLnRyYWNrU3RpY2t5ID0gdHJhY2tTdGlja3k7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZm9vdGVyL2luZGV4LmpzXG4gKiovIiwidmFyIGhvdmVySW50ZW50ID0gcmVxdWlyZSgnY2xpZW50L2hvdmVySW50ZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHRvb2x0aXBTcGFuID0gbnVsbDtcbiAgdmFyIHNoaWZ0WCA9IDg7XG4gIHZhciBzaGlmdFkgPSAxMDtcblxuICBmdW5jdGlvbiB1cGRhdGVQb3NpdGlvbihldmVudCkge1xuICAgIHZhciBsZWZ0ID0gZXZlbnQuY2xpZW50WCArIHNoaWZ0WDtcbiAgICBpZiAobGVmdCArIHRvb2x0aXBTcGFuLm9mZnNldFdpZHRoID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7IC8vIGlmIGJleW9uZCB0aGUgcmlnaHQgZG9jdW1lbnQgYm9yZGVyXG4gICAgICAvLyBtaXJyb3IgdG8gdGhlIGxlZnRcbiAgICAgIGxlZnQgPSBNYXRoLm1heCgwLCBldmVudC5jbGllbnRYIC0gc2hpZnRYIC0gdG9vbHRpcFNwYW4ub2Zmc2V0V2lkdGgpO1xuICAgIH1cbiAgICB0b29sdGlwU3Bhbi5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG5cbiAgICB2YXIgdG9wID0gZXZlbnQuY2xpZW50WSArIHNoaWZ0WTtcbiAgICBpZiAodG9wICsgdG9vbHRpcFNwYW4ub2Zmc2V0SGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgdG9wID0gTWF0aC5tYXgoMCwgZXZlbnQuY2xpZW50WSAtIHNoaWZ0WSAtIHRvb2x0aXBTcGFuLm9mZnNldEhlaWdodCk7XG4gICAgfVxuXG4gICAgdG9vbHRpcFNwYW4uc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgfVxuXG5cblxuICAvLyB3ZSBzaG93IHRvb2x0aXAgZWxlbWVudCBmb3IgYW55IGxpbmsgaG92ZXIsIGJ1dCBmZXcgb2YgdGhlbSBhY3R1YWxseSBnZXQgc3R5bGVkXG4gIGZ1bmN0aW9uIG9uT3ZlcihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYSwgW2RhdGEtdG9vbHRpcF0nKTtcblxuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAvLyBsaW5rcyBpbnNpZGUgdG9vbGJhcnMgbmVlZCBubyB0b29sdGlwc1xuICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PSAnQScgJiYgdGFyZ2V0LmNsb3Nlc3QoJy50b29sYmFyJykpIHJldHVybjtcblxuICAgIHRvb2x0aXBTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRvb2x0aXBTcGFuLmNsYXNzTmFtZSA9ICdsaW5rX190eXBlJztcblxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKSkge1xuICAgICAgdG9vbHRpcFNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvb2x0aXBTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS11cmwnLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9vbHRpcFNwYW4pO1xuICAgIHVwZGF0ZVBvc2l0aW9uKGV2ZW50KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uT3V0KCkge1xuICAgIGlmICghdG9vbHRpcFNwYW4pIHJldHVybjtcblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZVBvc2l0aW9uKTtcbiAgICB0b29sdGlwU3Bhbi5yZW1vdmUoKTtcbiAgICB0b29sdGlwU3BhbiA9IG51bGw7XG4gIH1cblxuICBob3ZlckludGVudCgnYSxbZGF0YS10b29sdGlwXScsIG9uT3Zlciwgb25PdXQpO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZm9vdGVyL3Nob3dMaW5rVHlwZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgbGV0IGZpZ3VyZVBuZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmaWd1cmUgaW1nW3NyYyQ9XCIucG5nXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWd1cmVQbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHBuZyA9IGZpZ3VyZVBuZ3NbaV07XG5cbiAgICAvLyBsb2FkIEAyeCB2ZXJzaW9uIChtdXN0IGV4aXN0KVxuICAgIHBuZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLm9ubG9hZDtcbiAgICAgIGlmICh0aGlzLnNyYy5tYXRjaCgvQDJ4LnBuZyQvKSkgcmV0dXJuO1xuXG4gICAgICBsZXQgcG5nMnggPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHBuZzJ4Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNyYyk7XG4gICAgICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgcG5nLnNyYyA9IHRoaXMuc3JjO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcG5nMnguc3JjID0gdGhpcy5zcmMucmVwbGFjZSgnLnBuZycsICdAMngucG5nJyk7XG4gICAgfTtcbiAgICBpZiAocG5nLmNvbXBsZXRlKSBwbmcub25sb2FkKCk7XG5cbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2Zvb3Rlci9sb2FkMnguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYWNrU3RpY2t5O1xuXG5cbmZ1bmN0aW9uIHRyYWNrU3RpY2t5KCkge1xuXG4gIHZhciBzdGlja3lFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0aWNreV0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNreUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN0aWNreUVsZW0gPSBzdGlja3lFbGVtc1tpXTtcbiAgICB2YXIgY29udGFpbmVyID0gc3RpY2t5RWxlbS5kYXRhc2V0LnN0aWNreSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kpIDogZG9jdW1lbnQuYm9keTtcblxuICAgIGlmIChzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDApIHtcbiAgICAgIC8vIGJlY29tZSBmaXhlZFxuICAgICAgaWYgKHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAvLyBhbHJlYWR5IGZpeGVkXG4gICAgICAgIC8vIGluZXJ0aWE6IGhhcHBlbnMgd2hlbiBzY3JvbGxlZCBmYXN0IHRvbyBtdWNoIHRvIGJvdHRvbVxuICAgICAgICAvLyBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNS0wMi0yNF8xNTU1LnN3ZlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYXZlZExlZnQgPSBzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjcmVhdGVQbGFjZWhvbGRlcihzdGlja3lFbGVtKTtcblxuICAgICAgc3RpY2t5RWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgc3RpY2t5RWxlbSk7XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGlja3lFbGVtKTtcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubGVmdCA9IHNhdmVkTGVmdCArICdweCc7XG4gICAgICAvLyB6SW5kZXggPCAxMDAwLCBiZWNhdXNlIGl0IG11c3QgYmUgdW5kZXIgYW4gb3ZlcmxheSxcbiAgICAgIC8vIGUuZy4gc2l0ZW1hcCBtdXN0IHNob3cgb3ZlciB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnpJbmRleCA9IDEwMTtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7IC8vIG5vbi10cmFuc3BhcmVudCB0byBjb3ZlciB0aGUgdGV4dFxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5tYXJnaW4gPSAwO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS53aWR0aCA9IHBsYWNlaG9sZGVyLm9mZnNldFdpZHRoICsgJ3B4JzsgLy8ga2VlcCBzYW1lIHdpZHRoIGFzIGJlZm9yZVxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH0gZWxzZSBpZiAoc3RpY2t5RWxlbS5wbGFjZWhvbGRlciAmJiBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDApIHtcbiAgICAgIC8vIGJlY29tZSBub24tZml4ZWRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgICAgc3RpY2t5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RpY2t5RWxlbSwgc3RpY2t5RWxlbS5wbGFjZWhvbGRlcik7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xuXG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGFjZWhvbGRlciB3LyBzYW1lIHNpemUgJiBtYXJnaW5cbiAqIEBwYXJhbSBlbGVtXG4gKiBAcmV0dXJucyB7KnwhSFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKGVsZW0pIHtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkxlZnQgPSBzdHlsZS5tYXJnaW5MZWZ0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5SaWdodCA9IHN0eWxlLm1hcmdpblJpZ2h0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IHN0eWxlLm1hcmdpbkJvdHRvbTtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luVG9wID0gc3R5bGUubWFyZ2luVG9wO1xuICByZXR1cm4gcGxhY2Vob2xkZXI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvdHJhY2tTdGlja3kuanNcbiAqKi8iLCJ2YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGdldENzcmZDb29raWUgPSByZXF1aXJlKCdjbGllbnQvZ2V0Q3NyZkNvb2tpZScpO1xuLy8gV3JhcHBlciBhYm91dCBYSFJcbi8vICMgR2xvYmFsIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZG9jdW1lbnQubG9hZHN0YXJ0L2xvYWRlbmQgb24gY29tbXVuaWNhdGlvbiBzdGFydC9lbmRcbi8vICAgIC0tPiB1bmxlc3Mgb3B0aW9ucy5ub0dsb2JhbEV2ZW50cyBpcyBzZXRcbi8vXG4vLyAjIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZmFpbC9zdWNjZXNzIG9uIGxvYWQgZW5kOlxuLy8gICAgLS0+IGJ5IGRlZmF1bHQgc3RhdHVzPTIwMCBpcyBvaywgdGhlIG90aGVycyBhcmUgZmFpbHVyZXNcbi8vICAgIC0tPiBvcHRpb25zLm5vcm1hbFN0YXR1c2VzID0gWzIwMSw0MDldIGFsbG93IGdpdmVuIHN0YXR1c2VzXG4vLyAgICAtLT4gZmFpbCBldmVudCBoYXMgLnJlYXNvbiBmaWVsZFxuLy8gICAgLS0+IHN1Y2Nlc3MgZXZlbnQgaGFzIC5yZXN1bHQgZmllbGRcbi8vXG4vLyAjIEpTT05cbi8vICAgIC0tPiBzZW5kKG9iamVjdCkgY2FsbHMgSlNPTi5zdHJpbmdpZnlcbi8vICAgIC0tPiBhZGRzIEFjY2VwdDoganNvbiAod2Ugd2FudCBqc29uKSBieSBkZWZhdWx0LCB1bmxlc3Mgb3B0aW9ucy5yYXdcbi8vIGlmIG9wdGlvbnMuanNvbiBvciBzZXJ2ZXIgcmV0dXJuZWQganNvbiBjb250ZW50IHR5cGVcbi8vICAgIC0tPiBhdXRvcGFyc2UganNvblxuLy8gICAgLS0+IGZhaWwgaWYgZXJyb3Jcbi8vXG4vLyAjIENTUkZcbi8vICAgIC0tPiByZXF1ZXN0cyBzZW5kcyBoZWFkZXIgWC1YU1JGLVRPS0VOIGZyb20gY29va2llXG5cbmZ1bmN0aW9uIHhocihvcHRpb25zKSB7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB2YXIgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybDtcblxuICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuc3luYyA/IGZhbHNlIDogdHJ1ZSk7XG5cbiAgcmVxdWVzdC5tZXRob2QgPSBtZXRob2Q7XG5cbiAgLy8gdG9rZW4vaGVhZGVyIG5hbWVzIHNhbWUgYXMgYW5ndWxhciAkaHR0cCBmb3IgZWFzaWVyIGludGVyb3BcbiAgdmFyIGNzcmZDb29raWUgPSBnZXRDc3JmQ29va2llKClcbiAgaWYgKGNzcmZDb29raWUgJiYgIW9wdGlvbnMuc2tpcENzcmYpIHtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJYLVhTUkYtVE9LRU5cIiwgY3NyZkNvb2tpZSk7XG4gIH1cblxuICBpZiAoe30udG9TdHJpbmcuY2FsbChib2R5KSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIG11c3QgYmUgT1BFTmVkIHRvIHNldFJlcXVlc3RIZWFkZXJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cblxuICBpZiAoIW9wdGlvbnMubm9HbG9iYWxFdmVudHMpIHtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdGFydCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmVuZCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN1Y2Nlc3MnLCBldmVudCk7XG4gICAgICBlLnJlc3VsdCA9IGV2ZW50LnJlc3VsdDtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmZhaWwnLCBldmVudCk7XG4gICAgICBlLnJlYXNvbiA9IGV2ZW50LnJlYXNvbjtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucmF3KSB7IC8vIG1lYW5zIHdlIHdhbnQganNvblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIH1cblxuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuXG4gIHZhciBub3JtYWxTdGF0dXNlcyA9IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgfHwgWzIwMF07XG5cbiAgZnVuY3Rpb24gd3JhcEV2ZW50KG5hbWUsIGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSk7XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudCA9IGU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFpbChyZWFzb24sIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcImZhaWxcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZWFzb24gPSByZWFzb247XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcInN1Y2Nlc3NcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZXN1bHQgPSByZXN1bHQ7XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgZmFpbChcItCe0YjQuNCx0LrQsCDRgdCy0Y/Qt9C4INGBINGB0LXRgNCy0LXRgNC+0LwuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQn9GA0LXQstGL0YjQtdC90L4g0LzQsNC60YHQuNC80LDQu9GM0L3QviDQtNC+0L/Rg9GB0YLQuNC80L7QtSDQstGA0LXQvNGPINC+0LbQuNC00LDQvdC40Y8g0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0JfQsNC/0YDQvtGBINCx0YvQuyDQv9GA0LXRgNCy0LDQvS5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0LnN0YXR1cykgeyAvLyBkb2VzIHRoYXQgZXZlciBoYXBwZW4/XG4gICAgICBmYWlsKFwi0J3QtSDQv9C+0LvRg9GH0LXQvSDQvtGC0LLQtdGCINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxTdGF0dXNlcy5pbmRleE9mKHJlcXVlc3Quc3RhdHVzKSA9PSAtMSkge1xuICAgICAgZmFpbChcItCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwICjQutC+0LQgXCIgKyByZXF1ZXN0LnN0YXR1cyArIFwiKSwg0L/QvtC/0YvRgtCw0LnRgtC10YHRjCDQv9C+0LfQtNC90LXQtVwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICBpZiAoY29udGVudFR5cGUubWF0Y2goL15hcHBsaWNhdGlvblxcL2pzb24vKSB8fCBvcHRpb25zLmpzb24pIHsgLy8gYXV0b3BhcnNlIGpzb24gaWYgV0FOVCBvciBSRUNFSVZFRCBqc29uXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXCIsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VjY2VzcyhyZXN1bHQsIGUpO1xuICB9KTtcblxuICAvLyBkZWZlciB0byBsZXQgb3RoZXIgaGFuZGxlcnMgYmUgYXNzaWduZWRcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICByZXF1ZXN0LnNlbmQoYm9keSk7XG4gIH0sIDApO1xuXG4gIHJldHVybiByZXF1ZXN0O1xuXG59XG5cblxuZnVuY3Rpb24gYWRkVXJsUGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgcGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICBpZiAofnVybC5pbmRleE9mKCc/JykpIHtcbiAgICByZXR1cm4gdXJsICsgJyYnICsgcGFyYW07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVybCArICc/JyArIHBhcmFtO1xuICB9XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigneGhyZmFpbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVhc29uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geGhyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQveGhyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNzcmZDb29raWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLyk7XG4gIHJldHVybiBjc3JmQ29va2llID8gY3NyZkNvb2tpZVsxXSA6IG51bGw7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9nZXRDc3JmQ29va2llLmpzXG4gKiovIiwidmFyIFNwaW5uZXIgPSByZXF1aXJlKCdjbGllbnQvc3Bpbm5lcicpO1xudmFyIHhociA9IHJlcXVpcmUoJ2NsaWVudC94aHInKTtcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGRvY3VtZW50Lm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkYXRhLW5ld3NsZXR0ZXItc3Vic2NyaWJlLWZvcm1cIikpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN1Ym1pdFN1YnNjcmliZUZvcm0oZS50YXJnZXQpO1xuICAgIH1cbiAgfTtcblxufVxuXG5mdW5jdGlvbiBzdWJtaXRTdWJzY3JpYmVGb3JtKGZvcm0pIHtcblxuICBpZiAoIWZvcm0uZWxlbWVudHMuZW1haWwudmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0ID0geGhyKHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICAgIGZvcm0uYWN0aW9uLFxuICAgIGJvZHk6ICAge1xuICAgICAgZW1haWw6IGZvcm0uZWxlbWVudHMuZW1haWwudmFsdWUsXG4gICAgICBzbHVnOiBmb3JtLmVsZW1lbnRzLnNsdWcudmFsdWVcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBzdWJtaXRCdXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJyk7XG5cbiAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcih7XG4gICAgZWxlbTogICAgICBzdWJtaXRCdXR0b24sXG4gICAgc2l6ZTogICAgICAnc21hbGwnLFxuICAgIGVsZW1DbGFzczogJ2J1dHRvbl9sb2FkaW5nJ1xuICB9KTtcbiAgc3Bpbm5lci5zdGFydCgpO1xuICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsICgpPT4ge1xuICAgIHNwaW5uZXIuc3RvcCgpO1xuICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIG5ldyBub3RpZmljYXRpb24uU3VjY2VzcyhldmVudC5yZXN1bHQubWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVzdWx0Lm1lc3NhZ2UpO1xuICAgIH1cbiAgfSk7XG5cblxufVxuXG5leHBvcnRzLmluaXQgPSBpbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9uZXdzbGV0dGVyL2NsaWVudC9pbmRleC5qc1xuICoqLyIsIlxudmFyIGxhc3RQYWdlWCA9IEluZmluaXR5LCBsYXN0UGFnZVkgPSBJbmZpbml0eSwgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG52YXIgZWxlbWVudE92ZXI7XG5cbnZhciBlbGVtZW50SG92ZXJPdmVyO1xuXG52YXIgc3BlZWRUb2xlcmFuY2UgPSAwLjI7XG5cbnZhciBoYW5kbGVycyA9IHt9O1xuXG5mdW5jdGlvbiBob3ZlckludGVudChzZWxlY3Rvciwgb3Zlciwgb3V0KSB7XG4gIGhhbmRsZXJzW3NlbGVjdG9yXSA9IHtvdmVyOiBvdmVyLCBvdXQ6IG91dH07XG59XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgbW91c2VvdXQpO1xuXG5mdW5jdGlvbiBtb3VzZW1vdmUoZXZlbnQpIHtcbiAgaWYgKGVsZW1lbnRIb3Zlck92ZXIpIHJldHVybjtcblxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZXZlbnQucGFnZVggLSBsYXN0UGFnZVgsIDIpICsgTWF0aC5wb3coZXZlbnQucGFnZVkgLSBsYXN0UGFnZVksIDIpKTtcbiAgdmFyIHNwZWVkID0gZGlzdGFuY2UgLyAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuICAvLyBzbG93IGRvd24gPT4gY2FsbCBvdmVyKCksIGdldCB0aGUgZWxlbWVudCBvZiBpbnRlcmVzdCxcbiAgLy8gdGhlbiBvdXQoKSB3aGVuIGxlYXZpbmcgaXRcbiAgaWYgKHNwZWVkIDwgc3BlZWRUb2xlcmFuY2UpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwic3BlZWRcIiwgc3BlZWQpO1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICBpZiAoIWVsZW0pIHJldHVybjsgLy8gdGhlIGNvb3JkcyBhcmUgb3V0IG9mIHdpbmRvdyAoaGFwcGVucylcbiAgICBpZiAoZWxlbSAhPSBlbGVtZW50T3Zlcikge1xuICAgICAgZm9yICh2YXIgc2VsZWN0b3IgaW4gaGFuZGxlcnMpIHtcbiAgICAgICAgdmFyIGNsb3Nlc3QgPSBlbGVtLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJvdmVyIFwiLCBjbG9zZXN0KTtcbiAgICAgICAgICBlbGVtZW50SG92ZXJPdmVyID0geyBlbGVtOiBjbG9zZXN0LCBvdXQ6IGhhbmRsZXJzW3NlbGVjdG9yXS5vdXR9O1xuICAgICAgICAgIGhhbmRsZXJzW3NlbGVjdG9yXS5vdmVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxlbWVudE92ZXIgPSBlbGVtO1xuICAgIH1cbiAgfVxuXG4gIGxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICBsYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG59XG5cbmZ1bmN0aW9uIG1vdXNlb3V0KGV2ZW50KSB7XG4gIGlmICghZWxlbWVudEhvdmVyT3ZlcikgcmV0dXJuO1xuXG4gIHZhciBwYXJlbnQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICB3aGlsZShwYXJlbnQpIHtcbiAgICBpZiAocGFyZW50ID09IGVsZW1lbnRIb3Zlck92ZXIuZWxlbSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIm1vdXNlb3V0IGZhbHNlXCIsIGV2ZW50LnRhcmdldCwgZWxlbWVudEhvdmVyT3Zlci5lbGVtKTtcbiAgICAgIC8vIHN0aWxsIHVuZGVyIGVsZW1lbnRIb3Zlck92ZXJcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuXG4gIHZhciBvdXQgPSBlbGVtZW50SG92ZXJPdmVyLm91dDtcbiAgZWxlbWVudEhvdmVyT3ZlciA9IG51bGw7XG4gIG91dChldmVudCk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBob3ZlckludGVudDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9ob3ZlckludGVudC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImZvb3Rlci4wYTMwNmM2NWU1OTJkZjY5YjNjYS5qcyJ9
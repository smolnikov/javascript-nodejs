var ebook =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var OrderForm = __webpack_require__(37);
	
	exports.init = function () {
	
	  var orderForm = document.querySelector("[data-order-form]");
	  if (orderForm) {
	    new OrderForm({
	      elem: orderForm
	    });
	  }
	};

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.init = function () {
	
	  relinkToHeaders();
	
	  replaceSlashesInFragments();
	};
	
	// Internal links like /object
	// In Ebook article headers get id=url, e.g h2(id=/object)
	// Task headers also get similar urls
	//   a(href=/object) should go to a(href=#/object) (if exists)
	function relinkToHeaders() {
	
	  var internalLinks = document.querySelectorAll("a[href^=\"/\"]");
	
	  for (var i = 0; i < internalLinks.length; i++) {
	    var link = internalLinks[i];
	    if (document.getElementById(link.getAttribute("href"))) {
	      link.setAttribute("href", "#" + link.getAttribute("href"));
	    }
	  }
	}
	
	// quick fix for ebook-converter issue
	// http://www.mobileread.com/forums/showthread.php?p=3044812#post3044812
	// contrary to http://tools.ietf.org/html/rfc3986
	// forbids / in fragments https://github.com/kovidgoyal/calibre/blob/ef09e886b3d95d6de5c76ad3a179694ae75c65f4/src/calibre/ebooks/conversion/plugins/epub_output.py#L350-L359
	function replaceSlashesInFragments() {
	
	  var internalLinks = document.querySelectorAll("a[href^=\"#\"]");
	
	  for (var i = 0; i < internalLinks.length; i++) {
	    var link = internalLinks[i];
	    link.setAttribute("href", link.getAttribute("href").replace(/\//g, "-"));
	  }
	
	  var elems = document.querySelectorAll("[id]");
	
	  for (var i = 0; i < elems.length; i++) {
	    var elem = elems[i];
	    elem.id = elem.id.replace(/\//g, "-");
	  }
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

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var xhr = __webpack_require__(27);
	var notification = __webpack_require__(22);
	var delegate = __webpack_require__(26);
	var Spinner = __webpack_require__(35);
	
	var OrderForm = (function () {
	  function OrderForm(options) {
	    var _this = this;
	
	    _classCallCheck(this, OrderForm);
	
	    this.elem = options.elem;
	
	    this.elem.addEventListener("submit", function (e) {
	      return e.preventDefault();
	    });
	
	    // many buttons with paymentMethods, onSubmit doesn't give a way to learn which one is pressed
	    // so I listen to onclick
	    this.delegate("[name=\"paymentMethod\"]", "click", function (e) {
	      return _this.onPaymentMethodClick(e);
	    });
	
	    this.delegate("[data-order-payment-change]", "click", function (e) {
	      e.preventDefault();
	      this.elem.querySelector("[data-order-form-step-payment]").style.display = "block";
	      this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none";
	      this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
	    });
	  }
	
	  _createClass(OrderForm, {
	    onPaymentMethodClick: {
	      value: function onPaymentMethodClick(e) {
	
	        var data = {
	          orderNumber: window.orderNumber,
	          orderTemplate: window.orderTemplate,
	          paymentMethod: e.delegateTarget.value
	        };
	
	        if (this.elem.elements.email) {
	          if (!this.elem.elements.email.value) {
	            new notification.Error("Введите email.");
	            this.elem.elements.email.focus();
	            return;
	          } else {
	            data.email = this.elem.elements.email.value;
	          }
	        }
	
	        // response status must be 200
	        var request = xhr({
	          method: "POST",
	          url: "/payments/common/checkout",
	          normalStatuses: [200, 403],
	          body: data
	        });
	
	        var onEnd = this.startRequestIndication();
	
	        request.addEventListener("success", function (event) {
	
	          if (this.status == 403) {
	            new notification.Error("<p>" + (event.result.description || event.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>");
	            onEnd();
	            return;
	          }
	
	          var result = event.result;
	
	          if (result.form) {
	            // don't stop the spinner while submitting the form to the payment system!
	            // (still in progress)
	            var container = document.createElement("div");
	            container.hidden = true;
	            container.innerHTML = result.form;
	            document.body.appendChild(container);
	            container.firstChild.submit();
	          } else {
	            console.error(result);
	            onEnd();
	            new notification.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
	          }
	        });
	
	        request.addEventListener("fail", onEnd);
	      }
	    },
	    request: {
	      value: (function (_request) {
	        var _requestWrapper = function request(_x) {
	          return _request.apply(this, arguments);
	        };
	
	        _requestWrapper.toString = function () {
	          return _request.toString();
	        };
	
	        return _requestWrapper;
	      })(function (options) {
	        var request = xhr(options);
	
	        request.addEventListener("loadstart", (function () {
	          var onEnd = this.startRequestIndication();
	          request.addEventListener("loadend", onEnd);
	        }).bind(this));
	
	        return request;
	      })
	    },
	    startRequestIndication: {
	      value: function startRequestIndication() {
	
	        var paymentMethodElem = this.elem.querySelector(".pay-method");
	        paymentMethodElem.classList.add("modal-overlay_light");
	
	        var spinner = new Spinner({
	          elem: paymentMethodElem,
	          size: "medium",
	          "class": "pay-method__spinner"
	        });
	        spinner.start();
	
	        return function onEnd() {
	          paymentMethodElem.classList.remove("modal-overlay_light");
	          if (spinner) spinner.stop();
	        };
	      }
	    }
	  });
	
	  return OrderForm;
	})();
	
	delegate.delegateMixin(OrderForm.prototype);
	
	module.exports = OrderForm;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9lYm9vay9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L2Vib29rLmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvZWJvb2svY2xpZW50L29yZGVyRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7O0FBRXZDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFHeEIsT0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzVELE9BQUksU0FBUyxFQUFFO0FBQ2IsU0FBSSxTQUFTLENBQUM7QUFDWixXQUFJLEVBQUUsU0FBUztNQUNoQixDQUFDLENBQUM7SUFDSjtFQUVGLEM7Ozs7Ozs7OztBQ1pELFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFFeEIsa0JBQWUsRUFBRSxDQUFDOztBQUVsQiw0QkFBeUIsRUFBRSxDQUFDO0VBRTdCLENBQUM7Ozs7OztBQU1GLFVBQVMsZUFBZSxHQUFHOztBQUV6QixPQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWMsQ0FBQyxDQUFDOztBQUU5RCxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxTQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsU0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUN0RCxXQUFJLENBQUMsWUFBWSxDQUFD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QyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRTVDLE9BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE9yZGVyRm9ybSA9IHJlcXVpcmUoJy4vb3JkZXJGb3JtJyk7XG5cbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgdmFyIG9yZGVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm1dJyk7XG4gIGlmIChvcmRlckZvcm0pIHtcbiAgICBuZXcgT3JkZXJGb3JtKHtcbiAgICAgIGVsZW06IG9yZGVyRm9ybVxuICAgIH0pO1xuICB9XG5cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9lYm9vay9jbGllbnQvaW5kZXguanNcbiAqKi8iLCJleHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICByZWxpbmtUb0hlYWRlcnMoKTtcblxuICByZXBsYWNlU2xhc2hlc0luRnJhZ21lbnRzKCk7XG5cbn07XG5cbi8vIEludGVybmFsIGxpbmtzIGxpa2UgL29iamVjdFxuLy8gSW4gRWJvb2sgYXJ0aWNsZSBoZWFkZXJzIGdldCBpZD11cmwsIGUuZyBoMihpZD0vb2JqZWN0KVxuLy8gVGFzayBoZWFkZXJzIGFsc28gZ2V0IHNpbWlsYXIgdXJsc1xuLy8gICBhKGhyZWY9L29iamVjdCkgc2hvdWxkIGdvIHRvIGEoaHJlZj0jL29iamVjdCkgKGlmIGV4aXN0cylcbmZ1bmN0aW9uIHJlbGlua1RvSGVhZGVycygpIHtcblxuICB2YXIgaW50ZXJuYWxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIvXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcm5hbExpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBpbnRlcm5hbExpbmtzW2ldO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKSkge1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICB9XG4gIH1cblxufVxuXG4vLyBxdWljayBmaXggZm9yIGVib29rLWNvbnZlcnRlciBpc3N1ZVxuLy8gaHR0cDovL3d3dy5tb2JpbGVyZWFkLmNvbS9mb3J1bXMvc2hvd3RocmVhZC5waHA/cD0zMDQ0ODEyI3Bvc3QzMDQ0ODEyXG4vLyBjb250cmFyeSB0byBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2XG4vLyBmb3JiaWRzIC8gaW4gZnJhZ21lbnRzIGh0dHBzOi8vZ2l0aHViLmNvbS9rb3ZpZGdveWFsL2NhbGlicmUvYmxvYi9lZjA5ZTg4NmIzZDk1ZDZkZTVjNzZhZDNhMTc5Njk0YWU3NWM2NWY0L3NyYy9jYWxpYnJlL2Vib29rcy9jb252ZXJzaW9uL3BsdWdpbnMvZXB1Yl9vdXRwdXQucHkjTDM1MC1MMzU5XG5mdW5jdGlvbiByZXBsYWNlU2xhc2hlc0luRnJhZ21lbnRzKCkge1xuXG4gIHZhciBpbnRlcm5hbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGludGVybmFsTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbGluayA9IGludGVybmFsTGlua3NbaV07XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnJlcGxhY2UoL1xcLy9nLCAnLScpKTtcbiAgfVxuXG4gIHZhciBlbGVtcyA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbGVtID0gZWxlbXNbaV07XG4gICAgZWxlbS5pZCA9IGVsZW0uaWQucmVwbGFjZSgvXFwvL2csICctJyk7XG4gIH1cblxuXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvZWJvb2suanNcbiAqKi8iLCJ2YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGdldENzcmZDb29raWUgPSByZXF1aXJlKCdjbGllbnQvZ2V0Q3NyZkNvb2tpZScpO1xuLy8gV3JhcHBlciBhYm91dCBYSFJcbi8vICMgR2xvYmFsIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZG9jdW1lbnQubG9hZHN0YXJ0L2xvYWRlbmQgb24gY29tbXVuaWNhdGlvbiBzdGFydC9lbmRcbi8vICAgIC0tPiB1bmxlc3Mgb3B0aW9ucy5ub0dsb2JhbEV2ZW50cyBpcyBzZXRcbi8vXG4vLyAjIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZmFpbC9zdWNjZXNzIG9uIGxvYWQgZW5kOlxuLy8gICAgLS0+IGJ5IGRlZmF1bHQgc3RhdHVzPTIwMCBpcyBvaywgdGhlIG90aGVycyBhcmUgZmFpbHVyZXNcbi8vICAgIC0tPiBvcHRpb25zLm5vcm1hbFN0YXR1c2VzID0gWzIwMSw0MDldIGFsbG93IGdpdmVuIHN0YXR1c2VzXG4vLyAgICAtLT4gZmFpbCBldmVudCBoYXMgLnJlYXNvbiBmaWVsZFxuLy8gICAgLS0+IHN1Y2Nlc3MgZXZlbnQgaGFzIC5yZXN1bHQgZmllbGRcbi8vXG4vLyAjIEpTT05cbi8vICAgIC0tPiBzZW5kKG9iamVjdCkgY2FsbHMgSlNPTi5zdHJpbmdpZnlcbi8vICAgIC0tPiBhZGRzIEFjY2VwdDoganNvbiAod2Ugd2FudCBqc29uKSBieSBkZWZhdWx0LCB1bmxlc3Mgb3B0aW9ucy5yYXdcbi8vIGlmIG9wdGlvbnMuanNvbiBvciBzZXJ2ZXIgcmV0dXJuZWQganNvbiBjb250ZW50IHR5cGVcbi8vICAgIC0tPiBhdXRvcGFyc2UganNvblxuLy8gICAgLS0+IGZhaWwgaWYgZXJyb3Jcbi8vXG4vLyAjIENTUkZcbi8vICAgIC0tPiByZXF1ZXN0cyBzZW5kcyBoZWFkZXIgWC1YU1JGLVRPS0VOIGZyb20gY29va2llXG5cbmZ1bmN0aW9uIHhocihvcHRpb25zKSB7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB2YXIgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybDtcblxuICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuc3luYyA/IGZhbHNlIDogdHJ1ZSk7XG5cbiAgcmVxdWVzdC5tZXRob2QgPSBtZXRob2Q7XG5cbiAgLy8gdG9rZW4vaGVhZGVyIG5hbWVzIHNhbWUgYXMgYW5ndWxhciAkaHR0cCBmb3IgZWFzaWVyIGludGVyb3BcbiAgdmFyIGNzcmZDb29raWUgPSBnZXRDc3JmQ29va2llKCk7XG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVTdGFydCA9IERhdGUubm93KCk7XG5cbiAgICByZXF1ZXN0LnNlbmQoYm9keSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5nYSgnc2VuZCcsICd0aW1pbmcnLCAneGhyJywgbWV0aG9kICsgJyAnICsgdXJsLCBEYXRlLm5vdygpIC0gdGltZVN0YXJ0KTtcbiAgICB9KTtcbiAgfSwgMCk7XG5cblxuXG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG5cbn1cblxuZnVuY3Rpb24gYWRkVXJsUGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgcGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICBpZiAofnVybC5pbmRleE9mKCc/JykpIHtcbiAgICByZXR1cm4gdXJsICsgJyYnICsgcGFyYW07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVybCArICc/JyArIHBhcmFtO1xuICB9XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigneGhyZmFpbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVhc29uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geGhyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQveGhyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNzcmZDb29raWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLyk7XG4gIHJldHVybiBjc3JmQ29va2llID8gY3NyZkNvb2tpZVsxXSA6IG51bGw7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9nZXRDc3JmQ29va2llLmpzXG4gKiovIiwidmFyIHhociA9IHJlcXVpcmUoJ2NsaWVudC94aHInKTtcbnZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBTcGlubmVyID0gcmVxdWlyZSgnY2xpZW50L3NwaW5uZXInKTtcblxuXG5jbGFzcyBPcmRlckZvcm0ge1xuXG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZWxlbSA9IG9wdGlvbnMuZWxlbTtcblxuICAgIHRoaXMuZWxlbS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAgIC8vIG1hbnkgYnV0dG9ucyB3aXRoIHBheW1lbnRNZXRob2RzLCBvblN1Ym1pdCBkb2Vzbid0IGdpdmUgYSB3YXkgdG8gbGVhcm4gd2hpY2ggb25lIGlzIHByZXNzZWRcbiAgICAvLyBzbyBJIGxpc3RlbiB0byBvbmNsaWNrXG4gICAgdGhpcy5kZWxlZ2F0ZSgnW25hbWU9XCJwYXltZW50TWV0aG9kXCJdJywgJ2NsaWNrJywgKGUpID0+IHRoaXMub25QYXltZW50TWV0aG9kQ2xpY2soZSkpO1xuXG4gICAgdGhpcy5kZWxlZ2F0ZSgnW2RhdGEtb3JkZXItcGF5bWVudC1jaGFuZ2VdJywgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm0tc3RlcC1wYXltZW50XScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm0tc3RlcC1jb25maXJtXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItZm9ybS1zdGVwLXJlY2VpcHRdJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KTtcbiAgfVxuXG4gIG9uUGF5bWVudE1ldGhvZENsaWNrKGUpIHtcblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgb3JkZXJOdW1iZXI6ICAgd2luZG93Lm9yZGVyTnVtYmVyLFxuICAgICAgb3JkZXJUZW1wbGF0ZTogd2luZG93Lm9yZGVyVGVtcGxhdGUsXG4gICAgICBwYXltZW50TWV0aG9kOiBlLmRlbGVnYXRlVGFyZ2V0LnZhbHVlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwpIHtcbiAgICAgIGlmICghdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLnZhbHVlKSB7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCLQktCy0LXQtNC40YLQtSBlbWFpbC5cIik7XG4gICAgICAgIHRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbC5mb2N1cygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLmVtYWlsID0gdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gcmVzcG9uc2Ugc3RhdHVzIG11c3QgYmUgMjAwXG4gICAgdmFyIHJlcXVlc3QgPSB4aHIoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6ICAgICcvcGF5bWVudHMvY29tbW9uL2NoZWNrb3V0JyxcbiAgICAgIG5vcm1hbFN0YXR1c2VzOiBbMjAwLCA0MDNdLFxuICAgICAgYm9keTogICBkYXRhXG4gICAgfSk7XG5cbiAgICB2YXIgb25FbmQgPSB0aGlzLnN0YXJ0UmVxdWVzdEluZGljYXRpb24oKTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSA0MDMpIHtcbiAgICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihcIjxwPlwiICsgKGV2ZW50LnJlc3VsdC5kZXNjcmlwdGlvbiB8fCBldmVudC5yZXN1bHQubWVzc2FnZSkgKyBcIjwvcD48cD7Qn9C+0LbQsNC70YPQudGB0YLQsCwg0L3QsNGH0L3QuNGC0LUg0L7RhNC+0YDQvNC70LXQvdC40LUg0LfQsNC90L7QstC+LjwvcD48cD7QldGB0LvQuCDQstGLINGB0YfQuNGC0LDQtdGC0LUsINGH0YLQviDQvdCwINGB0LXRgNCy0LXRgNC1INC+0YjQuNCx0LrQsCAmbWRhc2g7INGB0LLRj9C20LjRgtC10YHRjCDRgdC+IDxhIGhyZWY9J21haWx0bzpvcmRlcnNAamF2YXNjcmlwdC5ydSc+0YHQu9GD0LbQsdC+0Lkg0L/QvtC00LTQtdGA0LbQutC4PC9hPi48L3A+XCIpO1xuICAgICAgICBvbkVuZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBldmVudC5yZXN1bHQ7XG5cbiAgICAgIGlmIChyZXN1bHQuZm9ybSkge1xuICAgICAgICAvLyBkb24ndCBzdG9wIHRoZSBzcGlubmVyIHdoaWxlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gdG8gdGhlIHBheW1lbnQgc3lzdGVtIVxuICAgICAgICAvLyAoc3RpbGwgaW4gcHJvZ3Jlc3MpXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSByZXN1bHQuZm9ybTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuZmlyc3RDaGlsZC5zdWJtaXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgb25FbmQoKTtcbiAgICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihcItCe0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1LCDRgdCy0Y/QttC40YLQtdGB0Ywg0YHQviA8YSBocmVmPSdtYWlsdG86b3JkZXJzQGphdmFzY3JpcHQucnUnPtGB0LvRg9C20LHQvtC5INC/0L7QtNC00LXRgNC20LrQuDwvYT4uXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgb25FbmQpO1xuICB9XG5cblxuICByZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICB2YXIgcmVxdWVzdCA9IHhocihvcHRpb25zKTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb25FbmQgPSB0aGlzLnN0YXJ0UmVxdWVzdEluZGljYXRpb24oKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIG9uRW5kKTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBzdGFydFJlcXVlc3RJbmRpY2F0aW9uKCkge1xuXG4gICAgdmFyIHBheW1lbnRNZXRob2RFbGVtID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy5wYXktbWV0aG9kJyk7XG4gICAgcGF5bWVudE1ldGhvZEVsZW0uY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3ZlcmxheV9saWdodCcpO1xuXG4gICAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcih7XG4gICAgICBlbGVtOiAgcGF5bWVudE1ldGhvZEVsZW0sXG4gICAgICBzaXplOiAgJ21lZGl1bScsXG4gICAgICBjbGFzczogJ3BheS1tZXRob2RfX3NwaW5uZXInXG4gICAgfSk7XG4gICAgc3Bpbm5lci5zdGFydCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9uRW5kKCkge1xuICAgICAgcGF5bWVudE1ldGhvZEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtb3ZlcmxheV9saWdodCcpO1xuICAgICAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuc3RvcCgpO1xuICAgIH07XG5cbiAgfVxuXG5cbn1cblxuXG5kZWxlZ2F0ZS5kZWxlZ2F0ZU1peGluKE9yZGVyRm9ybS5wcm90b3R5cGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9yZGVyRm9ybTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvZWJvb2svY2xpZW50L29yZGVyRm9ybS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImVib29rLjJhYTljNjkzOTA1NjhkNjM2YWIwLmpzIn0=
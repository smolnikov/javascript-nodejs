var ebook =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var OrderForm = __webpack_require__(40);
	
	exports.init = function () {
	
	  var orderForm = document.querySelector("[data-order-form]");
	  if (orderForm) {
	    new OrderForm({
	      elem: orderForm
	    });
	  }
	};

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

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 35:
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

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var xhr = __webpack_require__(30);
	var notification = __webpack_require__(22);
	var delegate = __webpack_require__(36);
	var Spinner = __webpack_require__(29);
	
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
	          orderTemplate: this.elem.querySelector("input[name=\"orderTemplate\"]:checked").value,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9lYm9vay9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3hoci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qcyIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvZWJvb2suanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvZWJvb2svY2xpZW50L29yZGVyRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7O0FBRXZDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFHeEIsT0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzVELE9BQUksU0FBUyxFQUFFO0FBQ2IsU0FBSSxTQUFTLENBQUM7QUFDWixXQUFJLEVBQUUsU0FBUztNQUNoQixDQUFDLENBQUM7SUFDSjtFQUVGLEM7Ozs7Ozs7OztBQ1pELEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDO0FBQ2xELEtBQUksYUFBYSxHQUFHLG1CQUFPLENBQUMsRUFBc0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCcEQsVUFBUyxHQUFHLENBQUMsT0FBTyxFQUFFOztBQUVwQixPQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOztBQUVuQyxPQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQzs7QUFFckMsT0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN4QixPQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUV0QixVQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFL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VUF6R0csU0FBUzs7O0FBK0dmLFNBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU1QyxPQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBPcmRlckZvcm0gPSByZXF1aXJlKCcuL29yZGVyRm9ybScpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXG4gIHZhciBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtXScpO1xuICBpZiAob3JkZXJGb3JtKSB7XG4gICAgbmV3IE9yZGVyRm9ybSh7XG4gICAgICBlbGVtOiBvcmRlckZvcm1cbiAgICB9KTtcbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvZWJvb2svY2xpZW50L2luZGV4LmpzXG4gKiovIiwidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpO1xuICBpZiAoY3NyZkNvb2tpZSAmJiAhb3B0aW9ucy5za2lwQ3NyZikge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIlgtWFNSRi1UT0tFTlwiLCBjc3JmQ29va2llKTtcbiAgfVxuXG4gIGlmICh7fS50b1N0cmluZy5jYWxsKGJvZHkpID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gbXVzdCBiZSBPUEVOZWQgdG8gc2V0UmVxdWVzdEhlYWRlclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcbiAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuXG4gIGlmICghb3B0aW9ucy5ub0dsb2JhbEV2ZW50cykge1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN0YXJ0JywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZW5kJywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3VjY2VzcycsIGV2ZW50KTtcbiAgICAgIGUucmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZmFpbCcsIGV2ZW50KTtcbiAgICAgIGUucmVhc29uID0gZXZlbnQucmVhc29uO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5yYXcpIHsgLy8gbWVhbnMgd2Ugd2FudCBqc29uXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgfVxuXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsIFwiWE1MSHR0cFJlcXVlc3RcIik7XG5cbiAgdmFyIG5vcm1hbFN0YXR1c2VzID0gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyB8fCBbMjAwXTtcblxuICBmdW5jdGlvbiB3cmFwRXZlbnQobmFtZSwgZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lKTtcbiAgICBldmVudC5vcmlnaW5hbEV2ZW50ID0gZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBmYWlsKHJlYXNvbiwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwiZmFpbFwiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwic3VjY2Vzc1wiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlc3VsdCA9IHJlc3VsdDtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J7RiNC40LHQutCwINGB0LLRj9C30Lgg0YEg0YHQtdGA0LLQtdGA0L7QvC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCf0YDQtdCy0YvRiNC10L3QviDQvNCw0LrRgdC40LzQsNC70YzQvdC+INC00L7Qv9GD0YHRgtC40LzQvtC1INCy0YDQtdC80Y8g0L7QttC40LTQsNC90LjRjyDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQl9Cw0L/RgNC+0YEg0LHRi9C7INC/0YDQtdGA0LLQsNC9LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBlID0+IHtcbiAgICBpZiAoIXJlcXVlc3Quc3RhdHVzKSB7IC8vIGRvZXMgdGhhdCBldmVyIGhhcHBlbj9cbiAgICAgIGZhaWwoXCLQndC1INC/0L7Qu9GD0YfQtdC9INC+0YLQstC10YIg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbFN0YXR1c2VzLmluZGV4T2YocmVxdWVzdC5zdGF0dXMpID09IC0xKSB7XG4gICAgICBmYWlsKFwi0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAgKNC60L7QtCBcIiArIHJlcXVlc3Quc3RhdHVzICsgXCIpLCDQv9C+0L/Ri9GC0LDQudGC0LXRgdGMINC/0L7Qt9C00L3QtdC1XCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICB2YXIgY29udGVudFR5cGUgPSByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgIGlmIChjb250ZW50VHlwZS5tYXRjaCgvXmFwcGxpY2F0aW9uXFwvanNvbi8pIHx8IG9wdGlvbnMuanNvbikgeyAvLyBhdXRvcGFyc2UganNvbiBpZiBXQU5UIG9yIFJFQ0VJVkVEIGpzb25cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LBcIiwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdWNjZXNzKHJlc3VsdCwgZSk7XG4gIH0pO1xuXG4gIC8vIGRlZmVyIHRvIGxldCBvdGhlciBoYW5kbGVycyBiZSBhc3NpZ25lZFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAndGltaW5nJywgJ3hocicsIG1ldGhvZCArICcgJyArIHVybCwgRGF0ZS5ub3coKSAtIHRpbWVTdGFydCk7XG4gICAgfSk7XG4gIH0sIDApO1xuXG5cblxuXG4gIHJldHVybiByZXF1ZXN0O1xuXG59XG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3JmQ29va2llID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pO1xuICByZXR1cm4gY3NyZkNvb2tpZSA/IGNzcmZDb29raWVbMV0gOiBudWxsO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qc1xuICoqLyIsImV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIHJlbGlua1RvSGVhZGVycygpO1xuXG4gIHJlcGxhY2VTbGFzaGVzSW5GcmFnbWVudHMoKTtcblxufTtcblxuLy8gSW50ZXJuYWwgbGlua3MgbGlrZSAvb2JqZWN0XG4vLyBJbiBFYm9vayBhcnRpY2xlIGhlYWRlcnMgZ2V0IGlkPXVybCwgZS5nIGgyKGlkPS9vYmplY3QpXG4vLyBUYXNrIGhlYWRlcnMgYWxzbyBnZXQgc2ltaWxhciB1cmxzXG4vLyAgIGEoaHJlZj0vb2JqZWN0KSBzaG91bGQgZ28gdG8gYShocmVmPSMvb2JqZWN0KSAoaWYgZXhpc3RzKVxuZnVuY3Rpb24gcmVsaW5rVG9IZWFkZXJzKCkge1xuXG4gIHZhciBpbnRlcm5hbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIi9cIl0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGludGVybmFsTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbGluayA9IGludGVybmFsTGlua3NbaV07XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykpKSB7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyArIGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIH1cbiAgfVxuXG59XG5cbi8vIHF1aWNrIGZpeCBmb3IgZWJvb2stY29udmVydGVyIGlzc3VlXG4vLyBodHRwOi8vd3d3Lm1vYmlsZXJlYWQuY29tL2ZvcnVtcy9zaG93dGhyZWFkLnBocD9wPTMwNDQ4MTIjcG9zdDMwNDQ4MTJcbi8vIGNvbnRyYXJ5IHRvIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODZcbi8vIGZvcmJpZHMgLyBpbiBmcmFnbWVudHMgaHR0cHM6Ly9naXRodWIuY29tL2tvdmlkZ295YWwvY2FsaWJyZS9ibG9iL2VmMDllODg2YjNkOTVkNmRlNWM3NmFkM2ExNzk2OTRhZTc1YzY1ZjQvc3JjL2NhbGlicmUvZWJvb2tzL2NvbnZlcnNpb24vcGx1Z2lucy9lcHViX291dHB1dC5weSNMMzUwLUwzNTlcbmZ1bmN0aW9uIHJlcGxhY2VTbGFzaGVzSW5GcmFnbWVudHMoKSB7XG5cbiAgdmFyIGludGVybmFsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJuYWxMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5rID0gaW50ZXJuYWxMaW5rc1tpXTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykucmVwbGFjZSgvXFwvL2csICctJykpO1xuICB9XG5cbiAgdmFyIGVsZW1zID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGVsZW0gPSBlbGVtc1tpXTtcbiAgICBlbGVtLmlkID0gZWxlbS5pZC5yZXBsYWNlKC9cXC8vZywgJy0nKTtcbiAgfVxuXG5cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC9lYm9vay5qc1xuICoqLyIsInZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG5cblxuY2xhc3MgT3JkZXJGb3JtIHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsZW0gPSBvcHRpb25zLmVsZW07XG5cbiAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvLyBtYW55IGJ1dHRvbnMgd2l0aCBwYXltZW50TWV0aG9kcywgb25TdWJtaXQgZG9lc24ndCBnaXZlIGEgd2F5IHRvIGxlYXJuIHdoaWNoIG9uZSBpcyBwcmVzc2VkXG4gICAgLy8gc28gSSBsaXN0ZW4gdG8gb25jbGlja1xuICAgIHRoaXMuZGVsZWdhdGUoJ1tuYW1lPVwicGF5bWVudE1ldGhvZFwiXScsICdjbGljaycsIChlKSA9PiB0aGlzLm9uUGF5bWVudE1ldGhvZENsaWNrKGUpKTtcblxuICAgIHRoaXMuZGVsZWdhdGUoJ1tkYXRhLW9yZGVyLXBheW1lbnQtY2hhbmdlXScsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtcGF5bWVudF0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtY29uZmlybV0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm0tc3RlcC1yZWNlaXB0XScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBvblBheW1lbnRNZXRob2RDbGljayhlKSB7XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIG9yZGVyTnVtYmVyOiAgIHdpbmRvdy5vcmRlck51bWJlcixcbiAgICAgIG9yZGVyVGVtcGxhdGU6IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwib3JkZXJUZW1wbGF0ZVwiXTpjaGVja2VkJykudmFsdWUsXG4gICAgICBwYXltZW50TWV0aG9kOiBlLmRlbGVnYXRlVGFyZ2V0LnZhbHVlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwpIHtcbiAgICAgIGlmICghdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLnZhbHVlKSB7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCLQktCy0LXQtNC40YLQtSBlbWFpbC5cIik7XG4gICAgICAgIHRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbC5mb2N1cygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLmVtYWlsID0gdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc3BvbnNlIHN0YXR1cyBtdXN0IGJlIDIwMFxuICAgIHZhciByZXF1ZXN0ID0geGhyKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAgICAnL3BheW1lbnRzL2NvbW1vbi9jaGVja291dCcsXG4gICAgICBub3JtYWxTdGF0dXNlczogWzIwMCwgNDAzXSxcbiAgICAgIGJvZHk6ICAgZGF0YVxuICAgIH0pO1xuXG4gICAgdmFyIG9uRW5kID0gdGhpcy5zdGFydFJlcXVlc3RJbmRpY2F0aW9uKCk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zdGF0dXMgPT0gNDAzKSB7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCI8cD5cIiArIChldmVudC5yZXN1bHQuZGVzY3JpcHRpb24gfHwgZXZlbnQucmVzdWx0Lm1lc3NhZ2UpICsgXCI8L3A+PHA+0J/QvtC20LDQu9GD0LnRgdGC0LAsINC90LDRh9C90LjRgtC1INC+0YTQvtGA0LzQu9C10L3QuNC1INC30LDQvdC+0LLQvi48L3A+PHA+0JXRgdC70Lgg0LLRiyDRgdGH0LjRgtCw0LXRgtC1LCDRh9GC0L4g0L3QsCDRgdC10YDQstC10YDQtSDQvtGI0LjQsdC60LAgJm1kYXNoOyDRgdCy0Y/QttC40YLQtdGB0Ywg0YHQviA8YSBocmVmPSdtYWlsdG86b3JkZXJzQGphdmFzY3JpcHQucnUnPtGB0LvRg9C20LHQvtC5INC/0L7QtNC00LXRgNC20LrQuDwvYT4uPC9wPlwiKTtcbiAgICAgICAgb25FbmQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuXG4gICAgICBpZiAocmVzdWx0LmZvcm0pIHtcbiAgICAgICAgLy8gZG9uJ3Qgc3RvcCB0aGUgc3Bpbm5lciB3aGlsZSBzdWJtaXR0aW5nIHRoZSBmb3JtIHRvIHRoZSBwYXltZW50IHN5c3RlbSFcbiAgICAgICAgLy8gKHN0aWxsIGluIHByb2dyZXNzKVxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gcmVzdWx0LmZvcm07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmZpcnN0Q2hpbGQuc3VibWl0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdCk7XG4gICAgICAgIG9uRW5kKCk7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtSwg0YHQstGP0LbQuNGC0LXRgdGMINGB0L4gPGEgaHJlZj0nbWFpbHRvOm9yZGVyc0BqYXZhc2NyaXB0LnJ1Jz7RgdC70YPQttCx0L7QuSDQv9C+0LTQtNC10YDQttC60Lg8L2E+LlwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIG9uRW5kKTtcbiAgfVxuXG5cbiAgcmVxdWVzdChvcHRpb25zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB4aHIob3B0aW9ucyk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9uRW5kID0gdGhpcy5zdGFydFJlcXVlc3RJbmRpY2F0aW9uKCk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBvbkVuZCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgc3RhcnRSZXF1ZXN0SW5kaWNhdGlvbigpIHtcblxuICAgIHZhciBwYXltZW50TWV0aG9kRWxlbSA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcucGF5LW1ldGhvZCcpO1xuICAgIHBheW1lbnRNZXRob2RFbGVtLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcblxuICAgIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIoe1xuICAgICAgZWxlbTogIHBheW1lbnRNZXRob2RFbGVtLFxuICAgICAgc2l6ZTogICdtZWRpdW0nLFxuICAgICAgY2xhc3M6ICdwYXktbWV0aG9kX19zcGlubmVyJ1xuICAgIH0pO1xuICAgIHNwaW5uZXIuc3RhcnQoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBvbkVuZCgpIHtcbiAgICAgIHBheW1lbnRNZXRob2RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbiAgICAgIGlmIChzcGlubmVyKSBzcGlubmVyLnN0b3AoKTtcbiAgICB9O1xuXG4gIH1cblxuXG59XG5cblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihPcmRlckZvcm0ucHJvdG90eXBlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPcmRlckZvcm07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL2Vib29rL2NsaWVudC9vcmRlckZvcm0uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJlYm9vay4zYjQ0YzRlN2IyMjVmMzE3YzJhNC5qcyJ9
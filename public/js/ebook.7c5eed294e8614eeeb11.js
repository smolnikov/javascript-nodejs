var ebook =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var OrderForm = __webpack_require__(39);
	
	exports.init = function () {
	
	  var orderForm = document.querySelector("[data-order-form]");
	  if (orderForm) {
	    new OrderForm({
	      elem: orderForm
	    });
	  }
	};

/***/ },

/***/ 23:
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

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(34);
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var xhr = __webpack_require__(25);
	var notification = __webpack_require__(34);
	var delegate = __webpack_require__(24);
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
	          paymentMethod: e.delegateTarget.value
	        };
	
	        if (window.orderNumber) {
	          data.orderNumber = window.orderNumber;
	        } else {
	          var chooser = this.elem.querySelector("input[name=\"orderTemplate\"]:checked");
	          data.orderTemplate = chooser.value;
	          data.amount = chooser.dataset.amount; // for stats
	        }
	
	        if (this.elem.elements.email) {
	          if (!this.elem.elements.email.value) {
	            window.ga("send", "event", "payment", "checkout-no-email", "ebook");
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
	
	        if (data.orderTemplate) {
	          window.ga("ec:addProduct", {
	            id: "ebook",
	            variant: data.orderTemplate,
	            price: data.amount,
	            quantity: 1
	          });
	        }
	
	        window.ga("ec:setAction", "checkout", {
	          step: 1,
	          option: data.paymentMethod
	        });
	
	        window.ga("send", "event", "payment", "checkout", "ebook");
	        window.ga("send", "event", "payment", "checkout-method-" + data.paymentMethod, "ebook");
	
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
	
	            window.ga("ec:setAction", "purchase", {
	              id: result.orderNumber
	            });
	
	            var container = document.createElement("div");
	            container.hidden = true;
	            container.innerHTML = result.form;
	            document.body.appendChild(container);
	
	            window.ga("send", "event", "payment", "purchase", "ebook", {
	              hitCallback: function hitCallback() {
	                container.firstChild.submit();
	              }
	            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9lYm9vay9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L2Vib29rLmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvZWJvb2svY2xpZW50L29yZGVyRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7O0FBRXZDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFHeEIsT0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzVELE9BQUksU0FBUyxFQUFFO0FBQ2IsU0FBSSxTQUFTLENBQUM7QUFDWixXQUFJLEVBQUUsU0FBUztNQUNoQixDQUFDLENBQUM7SUFDSjtFQUVGLEM7Ozs7Ozs7OztBQ1pELFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFFeEIsa0JBQWUsRUFBRSxDQUFDOztBQUVsQiw0QkFBeUIsRUFBRSxDQUFDO0VBRTdCLENBQUM7Ozs7OztBQU1GLFVBQVMsZUFBZSxHQUFHOztBQUV6QixPQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWMsQ0FBQyxDQUFDOztBQUU5RCxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxTQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsU0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUN0RCxXQUFJLENBQUMsWUFBWSxDQUFD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LGVBQUksT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztVQUM3QixDQUFDO1FBRUg7Ozs7VUEzSUcsU0FBUzs7O0FBaUpmLFNBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU1QyxPQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBPcmRlckZvcm0gPSByZXF1aXJlKCcuL29yZGVyRm9ybScpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXG4gIHZhciBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtXScpO1xuICBpZiAob3JkZXJGb3JtKSB7XG4gICAgbmV3IE9yZGVyRm9ybSh7XG4gICAgICBlbGVtOiBvcmRlckZvcm1cbiAgICB9KTtcbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvZWJvb2svY2xpZW50L2luZGV4LmpzXG4gKiovIiwiZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgcmVsaW5rVG9IZWFkZXJzKCk7XG5cbiAgcmVwbGFjZVNsYXNoZXNJbkZyYWdtZW50cygpO1xuXG59O1xuXG4vLyBJbnRlcm5hbCBsaW5rcyBsaWtlIC9vYmplY3Rcbi8vIEluIEVib29rIGFydGljbGUgaGVhZGVycyBnZXQgaWQ9dXJsLCBlLmcgaDIoaWQ9L29iamVjdClcbi8vIFRhc2sgaGVhZGVycyBhbHNvIGdldCBzaW1pbGFyIHVybHNcbi8vICAgYShocmVmPS9vYmplY3QpIHNob3VsZCBnbyB0byBhKGhyZWY9Iy9vYmplY3QpIChpZiBleGlzdHMpXG5mdW5jdGlvbiByZWxpbmtUb0hlYWRlcnMoKSB7XG5cbiAgdmFyIGludGVybmFsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiL1wiXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJuYWxMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5rID0gaW50ZXJuYWxMaW5rc1tpXTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpIHtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgfVxuICB9XG5cbn1cblxuLy8gcXVpY2sgZml4IGZvciBlYm9vay1jb252ZXJ0ZXIgaXNzdWVcbi8vIGh0dHA6Ly93d3cubW9iaWxlcmVhZC5jb20vZm9ydW1zL3Nob3d0aHJlYWQucGhwP3A9MzA0NDgxMiNwb3N0MzA0NDgxMlxuLy8gY29udHJhcnkgdG8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NlxuLy8gZm9yYmlkcyAvIGluIGZyYWdtZW50cyBodHRwczovL2dpdGh1Yi5jb20va292aWRnb3lhbC9jYWxpYnJlL2Jsb2IvZWYwOWU4ODZiM2Q5NWQ2ZGU1Yzc2YWQzYTE3OTY5NGFlNzVjNjVmNC9zcmMvY2FsaWJyZS9lYm9va3MvY29udmVyc2lvbi9wbHVnaW5zL2VwdWJfb3V0cHV0LnB5I0wzNTAtTDM1OVxuZnVuY3Rpb24gcmVwbGFjZVNsYXNoZXNJbkZyYWdtZW50cygpIHtcblxuICB2YXIgaW50ZXJuYWxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcm5hbExpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBpbnRlcm5hbExpbmtzW2ldO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKC9cXC8vZywgJy0nKSk7XG4gIH1cblxuICB2YXIgZWxlbXMgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIGVsZW0uaWQgPSBlbGVtLmlkLnJlcGxhY2UoL1xcLy9nLCAnLScpO1xuICB9XG5cblxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L2Vib29rLmpzXG4gKiovIiwidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpO1xuICBpZiAoY3NyZkNvb2tpZSAmJiAhb3B0aW9ucy5za2lwQ3NyZikge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIlgtWFNSRi1UT0tFTlwiLCBjc3JmQ29va2llKTtcbiAgfVxuXG4gIGlmICh7fS50b1N0cmluZy5jYWxsKGJvZHkpID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gbXVzdCBiZSBPUEVOZWQgdG8gc2V0UmVxdWVzdEhlYWRlclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcbiAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuXG4gIGlmICghb3B0aW9ucy5ub0dsb2JhbEV2ZW50cykge1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN0YXJ0JywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZW5kJywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3VjY2VzcycsIGV2ZW50KTtcbiAgICAgIGUucmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZmFpbCcsIGV2ZW50KTtcbiAgICAgIGUucmVhc29uID0gZXZlbnQucmVhc29uO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5yYXcpIHsgLy8gbWVhbnMgd2Ugd2FudCBqc29uXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgfVxuXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsIFwiWE1MSHR0cFJlcXVlc3RcIik7XG5cbiAgdmFyIG5vcm1hbFN0YXR1c2VzID0gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyB8fCBbMjAwXTtcblxuICBmdW5jdGlvbiB3cmFwRXZlbnQobmFtZSwgZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lKTtcbiAgICBldmVudC5vcmlnaW5hbEV2ZW50ID0gZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBmYWlsKHJlYXNvbiwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwiZmFpbFwiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwic3VjY2Vzc1wiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlc3VsdCA9IHJlc3VsdDtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J7RiNC40LHQutCwINGB0LLRj9C30Lgg0YEg0YHQtdGA0LLQtdGA0L7QvC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCf0YDQtdCy0YvRiNC10L3QviDQvNCw0LrRgdC40LzQsNC70YzQvdC+INC00L7Qv9GD0YHRgtC40LzQvtC1INCy0YDQtdC80Y8g0L7QttC40LTQsNC90LjRjyDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQl9Cw0L/RgNC+0YEg0LHRi9C7INC/0YDQtdGA0LLQsNC9LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBlID0+IHtcbiAgICBpZiAoIXJlcXVlc3Quc3RhdHVzKSB7IC8vIGRvZXMgdGhhdCBldmVyIGhhcHBlbj9cbiAgICAgIGZhaWwoXCLQndC1INC/0L7Qu9GD0YfQtdC9INC+0YLQstC10YIg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbFN0YXR1c2VzLmluZGV4T2YocmVxdWVzdC5zdGF0dXMpID09IC0xKSB7XG4gICAgICBmYWlsKFwi0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAgKNC60L7QtCBcIiArIHJlcXVlc3Quc3RhdHVzICsgXCIpLCDQv9C+0L/Ri9GC0LDQudGC0LXRgdGMINC/0L7Qt9C00L3QtdC1XCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICB2YXIgY29udGVudFR5cGUgPSByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgIGlmIChjb250ZW50VHlwZS5tYXRjaCgvXmFwcGxpY2F0aW9uXFwvanNvbi8pIHx8IG9wdGlvbnMuanNvbikgeyAvLyBhdXRvcGFyc2UganNvbiBpZiBXQU5UIG9yIFJFQ0VJVkVEIGpzb25cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LBcIiwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdWNjZXNzKHJlc3VsdCwgZSk7XG4gIH0pO1xuXG4gIC8vIGRlZmVyIHRvIGxldCBvdGhlciBoYW5kbGVycyBiZSBhc3NpZ25lZFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAndGltaW5nJywgJ3hocicsIG1ldGhvZCArICcgJyArIHVybCwgRGF0ZS5ub3coKSAtIHRpbWVTdGFydCk7XG4gICAgfSk7XG4gIH0sIDApO1xuXG5cblxuXG4gIHJldHVybiByZXF1ZXN0O1xuXG59XG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3JmQ29va2llID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pO1xuICByZXR1cm4gY3NyZkNvb2tpZSA/IGNzcmZDb29raWVbMV0gOiBudWxsO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qc1xuICoqLyIsInZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG5cblxuY2xhc3MgT3JkZXJGb3JtIHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsZW0gPSBvcHRpb25zLmVsZW07XG5cbiAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvLyBtYW55IGJ1dHRvbnMgd2l0aCBwYXltZW50TWV0aG9kcywgb25TdWJtaXQgZG9lc24ndCBnaXZlIGEgd2F5IHRvIGxlYXJuIHdoaWNoIG9uZSBpcyBwcmVzc2VkXG4gICAgLy8gc28gSSBsaXN0ZW4gdG8gb25jbGlja1xuICAgIHRoaXMuZGVsZWdhdGUoJ1tuYW1lPVwicGF5bWVudE1ldGhvZFwiXScsICdjbGljaycsIChlKSA9PiB0aGlzLm9uUGF5bWVudE1ldGhvZENsaWNrKGUpKTtcblxuICAgIHRoaXMuZGVsZWdhdGUoJ1tkYXRhLW9yZGVyLXBheW1lbnQtY2hhbmdlXScsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtcGF5bWVudF0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtY29uZmlybV0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm0tc3RlcC1yZWNlaXB0XScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBvblBheW1lbnRNZXRob2RDbGljayhlKSB7XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIHBheW1lbnRNZXRob2Q6IGUuZGVsZWdhdGVUYXJnZXQudmFsdWVcbiAgICB9O1xuXG4gICAgaWYgKHdpbmRvdy5vcmRlck51bWJlcikge1xuICAgICAgZGF0YS5vcmRlck51bWJlciA9IHdpbmRvdy5vcmRlck51bWJlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNob29zZXIgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm9yZGVyVGVtcGxhdGVcIl06Y2hlY2tlZCcpO1xuICAgICAgZGF0YS5vcmRlclRlbXBsYXRlID0gY2hvb3Nlci52YWx1ZTtcbiAgICAgIGRhdGEuYW1vdW50ID0gY2hvb3Nlci5kYXRhc2V0LmFtb3VudDsgLy8gZm9yIHN0YXRzXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbCkge1xuICAgICAgaWYgKCF0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwudmFsdWUpIHtcbiAgICAgICAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgJ3BheW1lbnQnLCAnY2hlY2tvdXQtbm8tZW1haWwnLCAnZWJvb2snKTtcbiAgICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihcItCS0LLQtdC00LjRgtC1IGVtYWlsLlwiKTtcbiAgICAgICAgdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEuZW1haWwgPSB0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzcG9uc2Ugc3RhdHVzIG11c3QgYmUgMjAwXG4gICAgdmFyIHJlcXVlc3QgPSB4aHIoe1xuICAgICAgbWV0aG9kOiAgICAgICAgICdQT1NUJyxcbiAgICAgIHVybDogICAgICAgICAgICAnL3BheW1lbnRzL2NvbW1vbi9jaGVja291dCcsXG4gICAgICBub3JtYWxTdGF0dXNlczogWzIwMCwgNDAzXSxcbiAgICAgIGJvZHk6ICAgICAgICAgICBkYXRhXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0YS5vcmRlclRlbXBsYXRlKSB7XG4gICAgICB3aW5kb3cuZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICAgIGlkOiAgICAgICAnZWJvb2snLFxuICAgICAgICB2YXJpYW50OiAgZGF0YS5vcmRlclRlbXBsYXRlLFxuICAgICAgICBwcmljZTogICAgZGF0YS5hbW91bnQsXG4gICAgICAgIHF1YW50aXR5OiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB3aW5kb3cuZ2EoJ2VjOnNldEFjdGlvbicsICdjaGVja291dCcsIHtcbiAgICAgIHN0ZXA6IDEsXG4gICAgICBvcHRpb246IGRhdGEucGF5bWVudE1ldGhvZFxuICAgIH0pO1xuXG4gICAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgJ3BheW1lbnQnLCAnY2hlY2tvdXQnLCAnZWJvb2snKTtcbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCAncGF5bWVudCcsICdjaGVja291dC1tZXRob2QtJyArIGRhdGEucGF5bWVudE1ldGhvZCwgJ2Vib29rJyk7XG5cbiAgICB2YXIgb25FbmQgPSB0aGlzLnN0YXJ0UmVxdWVzdEluZGljYXRpb24oKTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSA0MDMpIHtcbiAgICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihcIjxwPlwiICsgKGV2ZW50LnJlc3VsdC5kZXNjcmlwdGlvbiB8fCBldmVudC5yZXN1bHQubWVzc2FnZSkgKyBcIjwvcD48cD7Qn9C+0LbQsNC70YPQudGB0YLQsCwg0L3QsNGH0L3QuNGC0LUg0L7RhNC+0YDQvNC70LXQvdC40LUg0LfQsNC90L7QstC+LjwvcD48cD7QldGB0LvQuCDQstGLINGB0YfQuNGC0LDQtdGC0LUsINGH0YLQviDQvdCwINGB0LXRgNCy0LXRgNC1INC+0YjQuNCx0LrQsCAmbWRhc2g7INGB0LLRj9C20LjRgtC10YHRjCDRgdC+IDxhIGhyZWY9J21haWx0bzpvcmRlcnNAamF2YXNjcmlwdC5ydSc+0YHQu9GD0LbQsdC+0Lkg0L/QvtC00LTQtdGA0LbQutC4PC9hPi48L3A+XCIpO1xuICAgICAgICBvbkVuZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBldmVudC5yZXN1bHQ7XG5cbiAgICAgIGlmIChyZXN1bHQuZm9ybSkge1xuICAgICAgICAvLyBkb24ndCBzdG9wIHRoZSBzcGlubmVyIHdoaWxlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gdG8gdGhlIHBheW1lbnQgc3lzdGVtIVxuICAgICAgICAvLyAoc3RpbGwgaW4gcHJvZ3Jlc3MpXG5cbiAgICAgICAgd2luZG93LmdhKCdlYzpzZXRBY3Rpb24nLCAncHVyY2hhc2UnLCB7XG4gICAgICAgICAgaWQ6IHJlc3VsdC5vcmRlck51bWJlclxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gcmVzdWx0LmZvcm07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCAncGF5bWVudCcsICdwdXJjaGFzZScsICdlYm9vaycsIHtcbiAgICAgICAgICBoaXRDYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb250YWluZXIuZmlyc3RDaGlsZC5zdWJtaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQpO1xuICAgICAgICBvbkVuZCgpO1xuICAgICAgICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKFwi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LUsINGB0LLRj9C20LjRgtC10YHRjCDRgdC+IDxhIGhyZWY9J21haWx0bzpvcmRlcnNAamF2YXNjcmlwdC5ydSc+0YHQu9GD0LbQsdC+0Lkg0L/QvtC00LTQtdGA0LbQutC4PC9hPi5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBvbkVuZCk7XG4gIH1cblxuXG4gIHJlcXVlc3Qob3B0aW9ucykge1xuICAgIHZhciByZXF1ZXN0ID0geGhyKG9wdGlvbnMpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvbkVuZCA9IHRoaXMuc3RhcnRSZXF1ZXN0SW5kaWNhdGlvbigpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgb25FbmQpO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHN0YXJ0UmVxdWVzdEluZGljYXRpb24oKSB7XG5cbiAgICB2YXIgcGF5bWVudE1ldGhvZEVsZW0gPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLnBheS1tZXRob2QnKTtcbiAgICBwYXltZW50TWV0aG9kRWxlbS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG5cbiAgICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICAgIGVsZW06ICBwYXltZW50TWV0aG9kRWxlbSxcbiAgICAgIHNpemU6ICAnbWVkaXVtJyxcbiAgICAgIGNsYXNzOiAncGF5LW1ldGhvZF9fc3Bpbm5lcidcbiAgICB9KTtcbiAgICBzcGlubmVyLnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gb25FbmQoKSB7XG4gICAgICBwYXltZW50TWV0aG9kRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG4gICAgICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5zdG9wKCk7XG4gICAgfTtcblxuICB9XG5cblxufVxuXG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oT3JkZXJGb3JtLnByb3RvdHlwZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT3JkZXJGb3JtO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9lYm9vay9jbGllbnQvb3JkZXJGb3JtLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZWJvb2suN2M1ZWVkMjk0ZTg2MTRlZWViMTEuanMifQ==
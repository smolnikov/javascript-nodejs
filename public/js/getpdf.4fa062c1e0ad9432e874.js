var getpdf =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var OrderForm = __webpack_require__(38);
	
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

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var xhr = __webpack_require__(30);
	var notification = __webpack_require__(19);
	var delegate = __webpack_require__(29);
	var Spinner = __webpack_require__(32);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9nZXRwZGYvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvZ2V0cGRmL2NsaWVudC9vcmRlckZvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxLQUFJLFNBQVMsR0FBRyxtQkFBTyxDQUFDLEVBQWEsQ0FBQyxDQUFDOztBQUV2QyxRQUFPLENBQUMsSUFBSSxHQUFHLFlBQVc7O0FBR3hCLE9BQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM1RCxPQUFJLFNBQVMsRUFBRTtBQUNiLFNBQUksU0FBUyxDQUFDO0FBQ1osV0FBSSxFQUFFLFNBQVM7TUFDaEIsQ0FBQyxDQUFDO0lBQ0o7RUFFRixDOzs7Ozs7Ozs7QUNaRCxLQUFJLFlBQVksR0FBRyxtQkFBTyxDQUFDLEVBQXFCLENBQUMsQ0FBQztBQUNsRCxLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFDLEVBQXNCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QnBELFVBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRTs7QUFFcEIsT0FBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQzs7QUFFbkMsT0FBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7O0FBRXJDLE9BQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDeEIsT0FBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFdEIsVUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDOztBQUV2RCxVQUFPLENBQUMsTUFBTSxHQUFH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QUFXLEVBQUUsYUFBVztBQUMvQyxlQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUMxQyxrQkFBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztVQUM1QyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUVkLGdCQUFPLE9BQU8sQ0FBQztRQUNoQjs7QUFFRCwyQkFBc0I7Y0FBQSxrQ0FBRzs7QUFFdkIsYUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvRCwwQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRXZELGFBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDO0FBQ3hCLGVBQUksRUFBRyxpQkFBaUI7QUFDeEIsZUFBSSxFQUFHLFFBQVE7QUFDZixvQkFBTyxxQkFBcUI7VUFDN0IsQ0FBQyxDQUFDO0FBQ0gsZ0JBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFaEIsZ0JBQU8sU0FBUyxLQUFLLEdBQUc7QUFDdEIsNEJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzFELGVBQUksT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztVQUM3QixDQUFDO1FBRUg7Ozs7VUExR0csU0FBUzs7O0FBZ0hmLFNBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU1QyxPQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBPcmRlckZvcm0gPSByZXF1aXJlKCcuL29yZGVyRm9ybScpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXG4gIHZhciBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtXScpO1xuICBpZiAob3JkZXJGb3JtKSB7XG4gICAgbmV3IE9yZGVyRm9ybSh7XG4gICAgICBlbGVtOiBvcmRlckZvcm1cbiAgICB9KTtcbiAgfVxuXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvZ2V0cGRmL2NsaWVudC9pbmRleC5qc1xuICoqLyIsInZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG52YXIgZ2V0Q3NyZkNvb2tpZSA9IHJlcXVpcmUoJ2NsaWVudC9nZXRDc3JmQ29va2llJyk7XG4vLyBXcmFwcGVyIGFib3V0IFhIUlxuLy8gIyBHbG9iYWwgRXZlbnRzXG4vLyB0cmlnZ2VycyBkb2N1bWVudC5sb2Fkc3RhcnQvbG9hZGVuZCBvbiBjb21tdW5pY2F0aW9uIHN0YXJ0L2VuZFxuLy8gICAgLS0+IHVubGVzcyBvcHRpb25zLm5vR2xvYmFsRXZlbnRzIGlzIHNldFxuLy9cbi8vICMgRXZlbnRzXG4vLyB0cmlnZ2VycyBmYWlsL3N1Y2Nlc3Mgb24gbG9hZCBlbmQ6XG4vLyAgICAtLT4gYnkgZGVmYXVsdCBzdGF0dXM9MjAwIGlzIG9rLCB0aGUgb3RoZXJzIGFyZSBmYWlsdXJlc1xuLy8gICAgLS0+IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgPSBbMjAxLDQwOV0gYWxsb3cgZ2l2ZW4gc3RhdHVzZXNcbi8vICAgIC0tPiBmYWlsIGV2ZW50IGhhcyAucmVhc29uIGZpZWxkXG4vLyAgICAtLT4gc3VjY2VzcyBldmVudCBoYXMgLnJlc3VsdCBmaWVsZFxuLy9cbi8vICMgSlNPTlxuLy8gICAgLS0+IHNlbmQob2JqZWN0KSBjYWxscyBKU09OLnN0cmluZ2lmeVxuLy8gICAgLS0+IGFkZHMgQWNjZXB0OiBqc29uICh3ZSB3YW50IGpzb24pIGJ5IGRlZmF1bHQsIHVubGVzcyBvcHRpb25zLnJhd1xuLy8gaWYgb3B0aW9ucy5qc29uIG9yIHNlcnZlciByZXR1cm5lZCBqc29uIGNvbnRlbnQgdHlwZVxuLy8gICAgLS0+IGF1dG9wYXJzZSBqc29uXG4vLyAgICAtLT4gZmFpbCBpZiBlcnJvclxuLy9cbi8vICMgQ1NSRlxuLy8gICAgLS0+IHJlcXVlc3RzIHNlbmRzIGhlYWRlciBYLVhTUkYtVE9LRU4gZnJvbSBjb29raWVcblxuZnVuY3Rpb24geGhyKG9wdGlvbnMpIHtcblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHZhciBtZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuXG4gIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5zeW5jID8gZmFsc2UgOiB0cnVlKTtcblxuICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcblxuICAvLyB0b2tlbi9oZWFkZXIgbmFtZXMgc2FtZSBhcyBhbmd1bGFyICRodHRwIGZvciBlYXNpZXIgaW50ZXJvcFxuICB2YXIgY3NyZkNvb2tpZSA9IGdldENzcmZDb29raWUoKTtcbiAgaWYgKGNzcmZDb29raWUgJiYgIW9wdGlvbnMuc2tpcENzcmYpIHtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJYLVhTUkYtVE9LRU5cIiwgY3NyZkNvb2tpZSk7XG4gIH1cblxuICBpZiAoe30udG9TdHJpbmcuY2FsbChib2R5KSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIG11c3QgYmUgT1BFTmVkIHRvIHNldFJlcXVlc3RIZWFkZXJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cblxuICBpZiAoIW9wdGlvbnMubm9HbG9iYWxFdmVudHMpIHtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdGFydCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmVuZCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN1Y2Nlc3MnLCBldmVudCk7XG4gICAgICBlLnJlc3VsdCA9IGV2ZW50LnJlc3VsdDtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmZhaWwnLCBldmVudCk7XG4gICAgICBlLnJlYXNvbiA9IGV2ZW50LnJlYXNvbjtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucmF3KSB7IC8vIG1lYW5zIHdlIHdhbnQganNvblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIH1cblxuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuXG4gIHZhciBub3JtYWxTdGF0dXNlcyA9IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgfHwgWzIwMF07XG5cbiAgZnVuY3Rpb24gd3JhcEV2ZW50KG5hbWUsIGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSk7XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudCA9IGU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFpbChyZWFzb24sIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcImZhaWxcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZWFzb24gPSByZWFzb247XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcInN1Y2Nlc3NcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZXN1bHQgPSByZXN1bHQ7XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgZmFpbChcItCe0YjQuNCx0LrQsCDRgdCy0Y/Qt9C4INGBINGB0LXRgNCy0LXRgNC+0LwuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQn9GA0LXQstGL0YjQtdC90L4g0LzQsNC60YHQuNC80LDQu9GM0L3QviDQtNC+0L/Rg9GB0YLQuNC80L7QtSDQstGA0LXQvNGPINC+0LbQuNC00LDQvdC40Y8g0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0JfQsNC/0YDQvtGBINCx0YvQuyDQv9GA0LXRgNCy0LDQvS5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0LnN0YXR1cykgeyAvLyBkb2VzIHRoYXQgZXZlciBoYXBwZW4/XG4gICAgICBmYWlsKFwi0J3QtSDQv9C+0LvRg9GH0LXQvSDQvtGC0LLQtdGCINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxTdGF0dXNlcy5pbmRleE9mKHJlcXVlc3Quc3RhdHVzKSA9PSAtMSkge1xuICAgICAgZmFpbChcItCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwICjQutC+0LQgXCIgKyByZXF1ZXN0LnN0YXR1cyArIFwiKSwg0L/QvtC/0YvRgtCw0LnRgtC10YHRjCDQv9C+0LfQtNC90LXQtVwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICBpZiAoY29udGVudFR5cGUubWF0Y2goL15hcHBsaWNhdGlvblxcL2pzb24vKSB8fCBvcHRpb25zLmpzb24pIHsgLy8gYXV0b3BhcnNlIGpzb24gaWYgV0FOVCBvciBSRUNFSVZFRCBqc29uXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXCIsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VjY2VzcyhyZXN1bHQsIGUpO1xuICB9KTtcblxuICAvLyBkZWZlciB0byBsZXQgb3RoZXIgaGFuZGxlcnMgYmUgYXNzaWduZWRcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJlcXVlc3Quc2VuZChib2R5KTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LmdhKCdzZW5kJywgJ3RpbWluZycsICd4aHInLCBtZXRob2QgKyAnICcgKyB1cmwsIERhdGUubm93KCkgLSB0aW1lU3RhcnQpO1xuICAgIH0pO1xuICB9LCAwKTtcblxuXG5cblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5mdW5jdGlvbiBhZGRVcmxQYXJhbSh1cmwsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwYXJhbSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIGlmICh+dXJsLmluZGV4T2YoJz8nKSkge1xuICAgIHJldHVybiB1cmwgKyAnJicgKyBwYXJhbTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXJsICsgJz8nICsgcGFyYW07XG4gIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd4aHJmYWlsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZWFzb24pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB4aHI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC94aHIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY3NyZkNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvWFNSRi1UT0tFTj0oW1xcdy1dKykvKTtcbiAgcmV0dXJuIGNzcmZDb29raWUgPyBjc3JmQ29va2llWzFdIDogbnVsbDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2dldENzcmZDb29raWUuanNcbiAqKi8iLCJ2YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xudmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xudmFyIFNwaW5uZXIgPSByZXF1aXJlKCdjbGllbnQvc3Bpbm5lcicpO1xuXG5cbmNsYXNzIE9yZGVyRm9ybSB7XG5cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5lbGVtID0gb3B0aW9ucy5lbGVtO1xuXG4gICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgLy8gbWFueSBidXR0b25zIHdpdGggcGF5bWVudE1ldGhvZHMsIG9uU3VibWl0IGRvZXNuJ3QgZ2l2ZSBhIHdheSB0byBsZWFybiB3aGljaCBvbmUgaXMgcHJlc3NlZFxuICAgIC8vIHNvIEkgbGlzdGVuIHRvIG9uY2xpY2tcbiAgICB0aGlzLmRlbGVnYXRlKCdbbmFtZT1cInBheW1lbnRNZXRob2RcIl0nLCAnY2xpY2snLCAoZSkgPT4gdGhpcy5vblBheW1lbnRNZXRob2RDbGljayhlKSk7XG5cbiAgICB0aGlzLmRlbGVnYXRlKCdbZGF0YS1vcmRlci1wYXltZW50LWNoYW5nZV0nLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItZm9ybS1zdGVwLXBheW1lbnRdJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItZm9ybS1zdGVwLWNvbmZpcm1dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtcmVjZWlwdF0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0pO1xuICB9XG5cbiAgb25QYXltZW50TWV0aG9kQ2xpY2soZSkge1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBvcmRlck51bWJlcjogICB3aW5kb3cub3JkZXJOdW1iZXIsXG4gICAgICBvcmRlclRlbXBsYXRlOiB3aW5kb3cub3JkZXJUZW1wbGF0ZSxcbiAgICAgIHBheW1lbnRNZXRob2Q6IGUuZGVsZWdhdGVUYXJnZXQudmFsdWVcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbCkge1xuICAgICAgaWYgKCF0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwudmFsdWUpIHtcbiAgICAgICAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihcItCS0LLQtdC00LjRgtC1IGVtYWlsLlwiKTtcbiAgICAgICAgdGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsLmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEuZW1haWwgPSB0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyByZXNwb25zZSBzdGF0dXMgbXVzdCBiZSAyMDBcbiAgICB2YXIgcmVxdWVzdCA9IHhocih7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogICAgJy9wYXltZW50cy9jb21tb24vY2hlY2tvdXQnLFxuICAgICAgbm9ybWFsU3RhdHVzZXM6IFsyMDAsIDQwM10sXG4gICAgICBib2R5OiAgIGRhdGFcbiAgICB9KTtcblxuICAgIHZhciBvbkVuZCA9IHRoaXMuc3RhcnRSZXF1ZXN0SW5kaWNhdGlvbigpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDQwMykge1xuICAgICAgICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKFwiPHA+XCIgKyAoZXZlbnQucmVzdWx0LmRlc2NyaXB0aW9uIHx8IGV2ZW50LnJlc3VsdC5tZXNzYWdlKSArIFwiPC9wPjxwPtCf0L7QttCw0LvRg9C50YHRgtCwLCDQvdCw0YfQvdC40YLQtSDQvtGE0L7RgNC80LvQtdC90LjQtSDQt9Cw0L3QvtCy0L4uPC9wPjxwPtCV0YHQu9C4INCy0Ysg0YHRh9C40YLQsNC10YLQtSwg0YfRgtC+INC90LAg0YHQtdGA0LLQtdGA0LUg0L7RiNC40LHQutCwICZtZGFzaDsg0YHQstGP0LbQuNGC0LXRgdGMINGB0L4gPGEgaHJlZj0nbWFpbHRvOm9yZGVyc0BqYXZhc2NyaXB0LnJ1Jz7RgdC70YPQttCx0L7QuSDQv9C+0LTQtNC10YDQttC60Lg8L2E+LjwvcD5cIik7XG4gICAgICAgIG9uRW5kKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdCA9IGV2ZW50LnJlc3VsdDtcblxuICAgICAgaWYgKHJlc3VsdC5mb3JtKSB7XG4gICAgICAgIC8vIGRvbid0IHN0b3AgdGhlIHNwaW5uZXIgd2hpbGUgc3VibWl0dGluZyB0aGUgZm9ybSB0byB0aGUgcGF5bWVudCBzeXN0ZW0hXG4gICAgICAgIC8vIChzdGlsbCBpbiBwcm9ncmVzcylcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHJlc3VsdC5mb3JtO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5maXJzdENoaWxkLnN1Ym1pdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQpO1xuICAgICAgICBvbkVuZCgpO1xuICAgICAgICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKFwi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LUsINGB0LLRj9C20LjRgtC10YHRjCDRgdC+IDxhIGhyZWY9J21haWx0bzpvcmRlcnNAamF2YXNjcmlwdC5ydSc+0YHQu9GD0LbQsdC+0Lkg0L/QvtC00LTQtdGA0LbQutC4PC9hPi5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBvbkVuZCk7XG4gIH1cblxuXG4gIHJlcXVlc3Qob3B0aW9ucykge1xuICAgIHZhciByZXF1ZXN0ID0geGhyKG9wdGlvbnMpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvbkVuZCA9IHRoaXMuc3RhcnRSZXF1ZXN0SW5kaWNhdGlvbigpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgb25FbmQpO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHN0YXJ0UmVxdWVzdEluZGljYXRpb24oKSB7XG5cbiAgICB2YXIgcGF5bWVudE1ldGhvZEVsZW0gPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLnBheS1tZXRob2QnKTtcbiAgICBwYXltZW50TWV0aG9kRWxlbS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG5cbiAgICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICAgIGVsZW06ICBwYXltZW50TWV0aG9kRWxlbSxcbiAgICAgIHNpemU6ICAnbWVkaXVtJyxcbiAgICAgIGNsYXNzOiAncGF5LW1ldGhvZF9fc3Bpbm5lcidcbiAgICB9KTtcbiAgICBzcGlubmVyLnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gb25FbmQoKSB7XG4gICAgICBwYXltZW50TWV0aG9kRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vdmVybGF5X2xpZ2h0Jyk7XG4gICAgICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5zdG9wKCk7XG4gICAgfTtcblxuICB9XG5cblxufVxuXG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oT3JkZXJGb3JtLnByb3RvdHlwZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gT3JkZXJGb3JtO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9nZXRwZGYvY2xpZW50L29yZGVyRm9ybS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImdldHBkZi40ZmEwNjJjMWUwYWQ5NDMyZTg3NC5qcyJ9
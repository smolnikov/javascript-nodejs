var getpdf =
webpackJsonp_name_([1],{

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

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var notification = __webpack_require__(23);
	var getCsrfCookie = __webpack_require__(37);
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

/***/ 37:
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

	var xhr = __webpack_require__(28);
	var notification = __webpack_require__(23);
	var delegate = __webpack_require__(27);
	var Spinner = __webpack_require__(36);

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
var ebook =
webpackJsonp_name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var OrderForm = __webpack_require__(29);
	
	exports.init = function () {
	
	  var orderForm = document.querySelector("[data-order-form]");
	  if (orderForm) {
	    new OrderForm({
	      elem: orderForm
	    });
	  }
	};

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var xhr = __webpack_require__(34);
	var notification = __webpack_require__(22);
	var delegate = __webpack_require__(33);
	var Spinner = __webpack_require__(37);
	
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

/***/ },

/***/ 32:
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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(22);
	var getCsrfCookie = __webpack_require__(38);
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

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9lYm9vay9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvZWJvb2svY2xpZW50L29yZGVyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvZWJvb2suanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3hoci5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLEtBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBYSxDQUFDLENBQUM7O0FBRXZDLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFHeEIsT0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzVELE9BQUksU0FBUyxFQUFFO0FBQ2IsU0FBSSxTQUFTLENBQUM7QUFDWixXQUFJLEVBQUUsU0FBUztNQUNoQixDQUFDLENBQUM7SUFDSjtFQUVGLEM7Ozs7Ozs7Ozs7Ozs7QUNaRCxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLEVBQVksQ0FBQyxDQUFDO0FBQ2hDLEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDO0FBQ2xELEtBQUksUUFBUSxHQUFHLG1CQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDO0FBQzFDLEtBQUksT0FBTyxHQUFHLG1CQUFPLENBQUMsRUFBZ0IsQ0FBQyxDQUFDOztLQUdsQyxTQUFTO0FBR0YsWUFIUCxTQUFTLENBR0QsT0FBTyxFQUFFOzs7MkJBSGpCLFNBQVM7O0FBSVgsU0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV6QixTQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUM7Y0FBSyxDQUFDLENBQUMsY0FBYyxFQUFFO01BQUEsQ0FBQyxDQUFDOzs7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QUM5RCxVQUFPLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0VBQzFDLEMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgT3JkZXJGb3JtID0gcmVxdWlyZSgnLi9vcmRlckZvcm0nKTtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cblxuICB2YXIgb3JkZXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItZm9ybV0nKTtcbiAgaWYgKG9yZGVyRm9ybSkge1xuICAgIG5ldyBPcmRlckZvcm0oe1xuICAgICAgZWxlbTogb3JkZXJGb3JtXG4gICAgfSk7XG4gIH1cblxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL2Vib29rL2NsaWVudC9pbmRleC5qc1xuICoqLyIsInZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG52YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG5cblxuY2xhc3MgT3JkZXJGb3JtIHtcblxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0aGlzLmVsZW0gPSBvcHRpb25zLmVsZW07XG5cbiAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvLyBtYW55IGJ1dHRvbnMgd2l0aCBwYXltZW50TWV0aG9kcywgb25TdWJtaXQgZG9lc24ndCBnaXZlIGEgd2F5IHRvIGxlYXJuIHdoaWNoIG9uZSBpcyBwcmVzc2VkXG4gICAgLy8gc28gSSBsaXN0ZW4gdG8gb25jbGlja1xuICAgIHRoaXMuZGVsZWdhdGUoJ1tuYW1lPVwicGF5bWVudE1ldGhvZFwiXScsICdjbGljaycsIChlKSA9PiB0aGlzLm9uUGF5bWVudE1ldGhvZENsaWNrKGUpKTtcblxuICAgIHRoaXMuZGVsZWdhdGUoJ1tkYXRhLW9yZGVyLXBheW1lbnQtY2hhbmdlXScsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtcGF5bWVudF0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci1mb3JtLXN0ZXAtY29uZmlybV0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLWZvcm0tc3RlcC1yZWNlaXB0XScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBvblBheW1lbnRNZXRob2RDbGljayhlKSB7XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIG9yZGVyTnVtYmVyOiAgIHdpbmRvdy5vcmRlck51bWJlcixcbiAgICAgIG9yZGVyVGVtcGxhdGU6IHdpbmRvdy5vcmRlclRlbXBsYXRlLFxuICAgICAgcGF5bWVudE1ldGhvZDogZS5kZWxlZ2F0ZVRhcmdldC52YWx1ZVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5lbGVtLmVsZW1lbnRzLmVtYWlsKSB7XG4gICAgICBpZiAoIXRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbC52YWx1ZSkge1xuICAgICAgICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKFwi0JLQstC10LTQuNGC0LUgZW1haWwuXCIpO1xuICAgICAgICB0aGlzLmVsZW0uZWxlbWVudHMuZW1haWwuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5lbWFpbCA9IHRoaXMuZWxlbS5lbGVtZW50cy5lbWFpbC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHJlc3BvbnNlIHN0YXR1cyBtdXN0IGJlIDIwMFxuICAgIHZhciByZXF1ZXN0ID0geGhyKHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAgICAnL3BheW1lbnRzL2NvbW1vbi9jaGVja291dCcsXG4gICAgICBub3JtYWxTdGF0dXNlczogWzIwMCwgNDAzXSxcbiAgICAgIGJvZHk6ICAgZGF0YVxuICAgIH0pO1xuXG4gICAgdmFyIG9uRW5kID0gdGhpcy5zdGFydFJlcXVlc3RJbmRpY2F0aW9uKCk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICBpZiAodGhpcy5zdGF0dXMgPT0gNDAzKSB7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCI8cD5cIiArIChldmVudC5yZXN1bHQuZGVzY3JpcHRpb24gfHwgZXZlbnQucmVzdWx0Lm1lc3NhZ2UpICsgXCI8L3A+PHA+0J/QvtC20LDQu9GD0LnRgdGC0LAsINC90LDRh9C90LjRgtC1INC+0YTQvtGA0LzQu9C10L3QuNC1INC30LDQvdC+0LLQvi48L3A+PHA+0JXRgdC70Lgg0LLRiyDRgdGH0LjRgtCw0LXRgtC1LCDRh9GC0L4g0L3QsCDRgdC10YDQstC10YDQtSDQvtGI0LjQsdC60LAgJm1kYXNoOyDRgdCy0Y/QttC40YLQtdGB0Ywg0YHQviA8YSBocmVmPSdtYWlsdG86b3JkZXJzQGphdmFzY3JpcHQucnUnPtGB0LvRg9C20LHQvtC5INC/0L7QtNC00LXRgNC20LrQuDwvYT4uPC9wPlwiKTtcbiAgICAgICAgb25FbmQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuXG4gICAgICBpZiAocmVzdWx0LmZvcm0pIHtcbiAgICAgICAgLy8gZG9uJ3Qgc3RvcCB0aGUgc3Bpbm5lciB3aGlsZSBzdWJtaXR0aW5nIHRoZSBmb3JtIHRvIHRoZSBwYXltZW50IHN5c3RlbSFcbiAgICAgICAgLy8gKHN0aWxsIGluIHByb2dyZXNzKVxuICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gcmVzdWx0LmZvcm07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmZpcnN0Q2hpbGQuc3VibWl0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKHJlc3VsdCk7XG4gICAgICAgIG9uRW5kKCk7XG4gICAgICAgIG5ldyBub3RpZmljYXRpb24uRXJyb3IoXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtSwg0YHQstGP0LbQuNGC0LXRgdGMINGB0L4gPGEgaHJlZj0nbWFpbHRvOm9yZGVyc0BqYXZhc2NyaXB0LnJ1Jz7RgdC70YPQttCx0L7QuSDQv9C+0LTQtNC10YDQttC60Lg8L2E+LlwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIG9uRW5kKTtcbiAgfVxuXG5cbiAgcmVxdWVzdChvcHRpb25zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB4aHIob3B0aW9ucyk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9uRW5kID0gdGhpcy5zdGFydFJlcXVlc3RJbmRpY2F0aW9uKCk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBvbkVuZCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgc3RhcnRSZXF1ZXN0SW5kaWNhdGlvbigpIHtcblxuICAgIHZhciBwYXltZW50TWV0aG9kRWxlbSA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcucGF5LW1ldGhvZCcpO1xuICAgIHBheW1lbnRNZXRob2RFbGVtLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcblxuICAgIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIoe1xuICAgICAgZWxlbTogIHBheW1lbnRNZXRob2RFbGVtLFxuICAgICAgc2l6ZTogICdtZWRpdW0nLFxuICAgICAgY2xhc3M6ICdwYXktbWV0aG9kX19zcGlubmVyJ1xuICAgIH0pO1xuICAgIHNwaW5uZXIuc3RhcnQoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBvbkVuZCgpIHtcbiAgICAgIHBheW1lbnRNZXRob2RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW92ZXJsYXlfbGlnaHQnKTtcbiAgICAgIGlmIChzcGlubmVyKSBzcGlubmVyLnN0b3AoKTtcbiAgICB9O1xuXG4gIH1cblxuXG59XG5cblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihPcmRlckZvcm0ucHJvdG90eXBlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPcmRlckZvcm07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL2Vib29rL2NsaWVudC9vcmRlckZvcm0uanNcbiAqKi8iLCJleHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICByZWxpbmtUb0hlYWRlcnMoKTtcblxuICByZXBsYWNlU2xhc2hlc0luRnJhZ21lbnRzKCk7XG5cbn07XG5cbi8vIEludGVybmFsIGxpbmtzIGxpa2UgL29iamVjdFxuLy8gSW4gRWJvb2sgYXJ0aWNsZSBoZWFkZXJzIGdldCBpZD11cmwsIGUuZyBoMihpZD0vb2JqZWN0KVxuLy8gVGFzayBoZWFkZXJzIGFsc28gZ2V0IHNpbWlsYXIgdXJsc1xuLy8gICBhKGhyZWY9L29iamVjdCkgc2hvdWxkIGdvIHRvIGEoaHJlZj0jL29iamVjdCkgKGlmIGV4aXN0cylcbmZ1bmN0aW9uIHJlbGlua1RvSGVhZGVycygpIHtcblxuICB2YXIgaW50ZXJuYWxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIvXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcm5hbExpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBpbnRlcm5hbExpbmtzW2ldO1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKSkge1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICB9XG4gIH1cblxufVxuXG4vLyBxdWljayBmaXggZm9yIGVib29rLWNvbnZlcnRlciBpc3N1ZVxuLy8gaHR0cDovL3d3dy5tb2JpbGVyZWFkLmNvbS9mb3J1bXMvc2hvd3RocmVhZC5waHA/cD0zMDQ0ODEyI3Bvc3QzMDQ0ODEyXG4vLyBjb250cmFyeSB0byBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2XG4vLyBmb3JiaWRzIC8gaW4gZnJhZ21lbnRzIGh0dHBzOi8vZ2l0aHViLmNvbS9rb3ZpZGdveWFsL2NhbGlicmUvYmxvYi9lZjA5ZTg4NmIzZDk1ZDZkZTVjNzZhZDNhMTc5Njk0YWU3NWM2NWY0L3NyYy9jYWxpYnJlL2Vib29rcy9jb252ZXJzaW9uL3BsdWdpbnMvZXB1Yl9vdXRwdXQucHkjTDM1MC1MMzU5XG5mdW5jdGlvbiByZXBsYWNlU2xhc2hlc0luRnJhZ21lbnRzKCkge1xuXG4gIHZhciBpbnRlcm5hbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGludGVybmFsTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbGluayA9IGludGVybmFsTGlua3NbaV07XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnJlcGxhY2UoL1xcLy9nLCAnLScpKTtcbiAgfVxuXG4gIHZhciBlbGVtcyA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbGVtID0gZWxlbXNbaV07XG4gICAgZWxlbS5pZCA9IGVsZW0uaWQucmVwbGFjZSgvXFwvL2csICctJyk7XG4gIH1cblxuXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvZWJvb2suanNcbiAqKi8iLCJ2YXIgbm90aWZpY2F0aW9uID0gcmVxdWlyZSgnY2xpZW50L25vdGlmaWNhdGlvbicpO1xudmFyIGdldENzcmZDb29raWUgPSByZXF1aXJlKCdjbGllbnQvZ2V0Q3NyZkNvb2tpZScpO1xuLy8gV3JhcHBlciBhYm91dCBYSFJcbi8vICMgR2xvYmFsIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZG9jdW1lbnQubG9hZHN0YXJ0L2xvYWRlbmQgb24gY29tbXVuaWNhdGlvbiBzdGFydC9lbmRcbi8vICAgIC0tPiB1bmxlc3Mgb3B0aW9ucy5ub0dsb2JhbEV2ZW50cyBpcyBzZXRcbi8vXG4vLyAjIEV2ZW50c1xuLy8gdHJpZ2dlcnMgZmFpbC9zdWNjZXNzIG9uIGxvYWQgZW5kOlxuLy8gICAgLS0+IGJ5IGRlZmF1bHQgc3RhdHVzPTIwMCBpcyBvaywgdGhlIG90aGVycyBhcmUgZmFpbHVyZXNcbi8vICAgIC0tPiBvcHRpb25zLm5vcm1hbFN0YXR1c2VzID0gWzIwMSw0MDldIGFsbG93IGdpdmVuIHN0YXR1c2VzXG4vLyAgICAtLT4gZmFpbCBldmVudCBoYXMgLnJlYXNvbiBmaWVsZFxuLy8gICAgLS0+IHN1Y2Nlc3MgZXZlbnQgaGFzIC5yZXN1bHQgZmllbGRcbi8vXG4vLyAjIEpTT05cbi8vICAgIC0tPiBzZW5kKG9iamVjdCkgY2FsbHMgSlNPTi5zdHJpbmdpZnlcbi8vICAgIC0tPiBhZGRzIEFjY2VwdDoganNvbiAod2Ugd2FudCBqc29uKSBieSBkZWZhdWx0LCB1bmxlc3Mgb3B0aW9ucy5yYXdcbi8vIGlmIG9wdGlvbnMuanNvbiBvciBzZXJ2ZXIgcmV0dXJuZWQganNvbiBjb250ZW50IHR5cGVcbi8vICAgIC0tPiBhdXRvcGFyc2UganNvblxuLy8gICAgLS0+IGZhaWwgaWYgZXJyb3Jcbi8vXG4vLyAjIENTUkZcbi8vICAgIC0tPiByZXF1ZXN0cyBzZW5kcyBoZWFkZXIgWC1YU1JGLVRPS0VOIGZyb20gY29va2llXG5cbmZ1bmN0aW9uIHhocihvcHRpb25zKSB7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB2YXIgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybDtcblxuICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuc3luYyA/IGZhbHNlIDogdHJ1ZSk7XG5cbiAgcmVxdWVzdC5tZXRob2QgPSBtZXRob2Q7XG5cbiAgLy8gdG9rZW4vaGVhZGVyIG5hbWVzIHNhbWUgYXMgYW5ndWxhciAkaHR0cCBmb3IgZWFzaWVyIGludGVyb3BcbiAgdmFyIGNzcmZDb29raWUgPSBnZXRDc3JmQ29va2llKCk7XG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVTdGFydCA9IERhdGUubm93KCk7XG5cbiAgICByZXF1ZXN0LnNlbmQoYm9keSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5nYSgnc2VuZCcsICd0aW1pbmcnLCAneGhyJywgbWV0aG9kICsgJyAnICsgdXJsLCBEYXRlLm5vdygpIC0gdGltZVN0YXJ0KTtcbiAgICB9KTtcbiAgfSwgMCk7XG5cblxuXG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG5cbn1cblxuZnVuY3Rpb24gYWRkVXJsUGFyYW0odXJsLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgcGFyYW0gPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICBpZiAofnVybC5pbmRleE9mKCc/JykpIHtcbiAgICByZXR1cm4gdXJsICsgJyYnICsgcGFyYW07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVybCArICc/JyArIHBhcmFtO1xuICB9XG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigneGhyZmFpbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIG5ldyBub3RpZmljYXRpb24uRXJyb3IoZXZlbnQucmVhc29uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0geGhyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQveGhyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNzcmZDb29raWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLyk7XG4gIHJldHVybiBjc3JmQ29va2llID8gY3NyZkNvb2tpZVsxXSA6IG51bGw7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9nZXRDc3JmQ29va2llLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZWJvb2suNWQ0NWExNDJiNGUwOGJlYTEwNGQuanMifQ==
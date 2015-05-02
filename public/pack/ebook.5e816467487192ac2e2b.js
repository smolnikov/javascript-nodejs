var ebook =
webpackJsonp_name_([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var OrderForm = __webpack_require__(145);
	
	exports.init = function () {
	
	  var orderForm = document.querySelector('[data-order-form]');
	  if (orderForm) {
	    new OrderForm({
	      elem: orderForm
	    });
	  }
	};

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var notification = __webpack_require__(128);
	var getCsrfCookie = __webpack_require__(163);
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
	
	  var method = options.method || 'GET';
	
	  var body = options.body;
	  var url = options.url;
	
	  request.open(method, url, options.sync ? false : true);
	
	  request.method = method;
	
	  // token/header names same as angular $http for easier interop
	  var csrfCookie = getCsrfCookie();
	  if (csrfCookie && !options.skipCsrf) {
	    request.setRequestHeader('X-XSRF-TOKEN', csrfCookie);
	  }
	
	  if (({}).toString.call(body) == '[object Object]') {
	    // must be OPENed to setRequestHeader
	    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	    body = JSON.stringify(body);
	  }
	
	  if (!options.noDocumentEvents) {
	    request.addEventListener('loadstart', function (event) {
	      request.timeStart = Date.now();
	      var e = wrapEvent('xhrstart', event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener('loadend', function (event) {
	      var e = wrapEvent('xhrend', event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener('success', function (event) {
	      var e = wrapEvent('xhrsuccess', event);
	      e.result = event.result;
	      document.dispatchEvent(e);
	    });
	    request.addEventListener('fail', function (event) {
	      var e = wrapEvent('xhrfail', event);
	      e.reason = event.reason;
	      document.dispatchEvent(e);
	    });
	  }
	
	  if (!options.raw) {
	    // means we want json
	    request.setRequestHeader('Accept', 'application/json');
	  }
	
	  request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	
	  var normalStatuses = options.normalStatuses || [200];
	
	  function wrapEvent(name, e) {
	    var event = new CustomEvent(name);
	    event.originalEvent = e;
	    return event;
	  }
	
	  function fail(reason, originalEvent) {
	    var e = wrapEvent('fail', originalEvent);
	    e.reason = reason;
	    request.dispatchEvent(e);
	  }
	
	  function success(result, originalEvent) {
	    var e = wrapEvent('success', originalEvent);
	    e.result = result;
	    request.dispatchEvent(e);
	  }
	
	  request.addEventListener('error', function (e) {
	    fail('Ошибка связи с сервером.', e);
	  });
	
	  request.addEventListener('timeout', function (e) {
	    fail('Превышено максимально допустимое время ожидания ответа от сервера.', e);
	  });
	
	  request.addEventListener('abort', function (e) {
	    fail('Запрос был прерван.', e);
	  });
	
	  request.addEventListener('load', function (e) {
	    if (!request.status) {
	      // does that ever happen?
	      fail('Не получен ответ от сервера.', e);
	      return;
	    }
	
	    if (normalStatuses.indexOf(request.status) == -1) {
	      fail('Ошибка на стороне сервера (код ' + request.status + '), попытайтесь позднее', e);
	      return;
	    }
	
	    var result = request.responseText;
	    var contentType = request.getResponseHeader('Content-Type');
	    if (contentType.match(/^application\/json/) || options.json) {
	      // autoparse json if WANT or RECEIVED json
	      try {
	        result = JSON.parse(result);
	      } catch (e) {
	        fail('Некорректный формат ответа от сервера', e);
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
	
	document.addEventListener('xhrfail', function (event) {
	  new notification.Error(event.reason);
	});
	
	module.exports = xhr;

/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var xhr = __webpack_require__(133);
	var notification = __webpack_require__(128);
	var delegate = __webpack_require__(132);
	var FormPayment = __webpack_require__(171).FormPayment;
	var Spinner = __webpack_require__(144);
	var Modal = __webpack_require__(114);
	
	var OrderForm = (function () {
	  function OrderForm(options) {
	    var _this = this;
	
	    _classCallCheck(this, OrderForm);
	
	    this.elem = options.elem;
	
	    this.product = 'ebook';
	
	    this.elem.addEventListener('submit', function (e) {
	      return _this.onSubmit(e);
	    });
	
	    this.delegate('[data-order-payment-change]', 'click', function (e) {
	      e.preventDefault();
	      this.elem.querySelector('[data-order-form-step-payment]').style.display = 'block';
	      this.elem.querySelector('[data-order-form-step-confirm]').style.display = 'none';
	      this.elem.querySelector('[data-order-form-step-receipt]').style.display = 'none';
	    });
	
	    this.delegate('.complex-form__extract .extract__item', 'click', function (e) {
	      e.delegateTarget.querySelector('[type="radio"]').checked = true;
	    });
	  }
	
	  _createClass(OrderForm, [{
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      event.preventDefault();
	      new FormPayment(this, this.elem.querySelector('.pay-method')).submit();
	    }
	  }, {
	    key: 'getOrderData',
	
	    // return orderData or nothing if validation failed
	    value: function getOrderData() {
	      var orderData = {};
	
	      if (window.orderNumber) {
	        orderData.orderNumber = window.orderNumber;
	      } else {
	        var chooser = this.elem.querySelector('input[name="orderTemplate"]:checked');
	        orderData.orderTemplate = chooser.value;
	        orderData.amount = chooser.dataset.amount; // for stats
	      }
	
	      if (this.elem.elements.email) {
	        if (!this.elem.elements.email.value) {
	          window.ga('send', 'event', 'payment', 'checkout-no-email', 'ebook');
	          window.metrika.reachGoal('CHECKOUT-NO-EMAIL', { product: 'ebook' });
	          new notification.Error('Введите email.');
	          this.elem.elements.email.scrollIntoView();
	          setTimeout(function () {
	            window.scrollBy(0, -200);
	          }, 0);
	          this.elem.elements.email.focus();
	          return;
	        } else {
	          orderData.email = this.elem.elements.email.value;
	        }
	      }
	
	      return orderData;
	    }
	  }]);
	
	  return OrderForm;
	})();
	
	delegate.delegateMixin(OrderForm.prototype);
	
	module.exports = OrderForm;

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.FormPayment = __webpack_require__(201);

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var notification = __webpack_require__(128);
	var xhr = __webpack_require__(133);
	var Spinner = __webpack_require__(144);
	var Modal = __webpack_require__(114);
	
	/**
	 * Get data from orderForm.getOrderData()
	 * process payment, ask for more data if needed
	 */
	
	var FormPayment = (function () {
	  function FormPayment(orderForm, paymentMethodElem) {
	    _classCallCheck(this, FormPayment);
	
	    this.orderForm = orderForm;
	    this.paymentMethodElem = paymentMethodElem;
	  }
	
	  _createClass(FormPayment, [{
	    key: 'request',
	    value: function request(options) {
	      var request = xhr(options);
	
	      request.addEventListener('loadstart', (function () {
	        var onEnd = this.startRequestIndication();
	        request.addEventListener('loadend', onEnd);
	      }).bind(this));
	
	      return request;
	    }
	  }, {
	    key: 'startRequestIndication',
	    value: function startRequestIndication() {
	      var _this = this;
	
	      this.paymentMethodElem.classList.add('modal-overlay_light');
	
	      var spinner = new Spinner({
	        elem: this.paymentMethodElem,
	        size: 'medium',
	        'class': 'pay-method__spinner'
	      });
	      spinner.start();
	
	      return function () {
	        _this.paymentMethodElem.classList.remove('modal-overlay_light');
	        if (spinner) spinner.stop();
	      };
	    }
	  }, {
	    key: 'readPaymentData',
	    value: function readPaymentData() {
	      var paymentData = {};
	
	      [].forEach.call(this.paymentMethodElem.querySelectorAll('input,select,textarea'), function (elem) {
	        if ((elem.type == 'radio' || elem.type == 'checkbox') && !elem.checked) return;
	        paymentData[elem.name] = elem.value;
	      });
	
	      return paymentData;
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this2 = this;
	
	      var orderData = this.orderForm.getOrderData();
	      if (!orderData) {
	        return;
	      }var paymentData = this.readPaymentData();
	
	      if (!paymentData.paymentMethod) {
	        new notification.Error('Выберите метод оплаты.');
	        return;
	      }
	
	      if (paymentData.paymentMethod == 'invoice' && !paymentData.invoiceCompanyName) {
	        new notification.Error('Укажите название компании.');
	        this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
	        return;
	      }
	
	      for (var key in paymentData) {
	        orderData[key] = paymentData[key];
	      }
	
	      // response status must be 200
	      var request = xhr({
	        method: 'POST',
	        url: '/payments/common/checkout',
	        normalStatuses: [200, 403, 400],
	        body: orderData
	      });
	
	      if (orderData.orderTemplate) {
	        window.ga('ec:addProduct', {
	          id: this.orderForm.product,
	          variant: orderData.orderTemplate,
	          price: orderData.amount,
	          quantity: 1
	        });
	      }
	
	      window.ga('ec:setAction', 'checkout', {
	        step: 1,
	        option: orderData.paymentMethod
	      });
	
	      window.metrika.reachGoal('CHECKOUT', {
	        product: this.orderForm.product,
	        method: orderData.paymentMethod,
	        price: orderData.amount
	      });
	
	      window.ga('send', 'event', 'payment', 'checkout', 'ebook');
	      window.ga('send', 'event', 'payment', 'checkout-method-' + orderData.paymentMethod, this.orderForm.product);
	
	      var onEnd = this.startRequestIndication();
	
	      request.addEventListener('success', function (event) {
	
	        if (request.status == 403) {
	          new notification.Error('<p>' + (event.result.description || event.result.message) + '</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href=\'mailto:orders@javascript.ru\'>службой поддержки</a>.</p>');
	          onEnd();
	          return;
	        }
	
	        if (request.status == 400) {
	          new notification.Error('<p>' + event.result.message + '</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href=\'mailto:orders@javascript.ru\'>службой поддержки</a>.</p>');
	          onEnd();
	          return;
	        }
	
	        var result = event.result;
	
	        if (result.form) {
	          // don't stop the spinner while submitting the form to the payment system!
	          // (still in progress)
	
	          window.ga('ec:setAction', 'purchase', {
	            id: result.orderNumber
	          });
	
	          var container = document.createElement('div');
	          container.hidden = true;
	          container.innerHTML = result.form;
	          document.body.appendChild(container);
	
	          // submit form after GA or after 500ms, which one comes sooner
	          var submitForm = function submitForm() {
	            if (!submitForm.called) {
	              submitForm.called = true;
	              container.firstChild.submit();
	            }
	          };
	
	          window.ga('send', 'event', 'payment', 'purchase', 'ebook', {
	            hitCallback: submitForm
	          });
	          setTimeout(submitForm, 500);
	
	          window.metrika.reachGoal('PURCHASE', {
	            product: _this2.orderForm.product,
	            method: orderData.paymentMethod,
	            price: orderData.amount,
	            number: result.orderNumber
	          });
	        } else {
	          console.error(result);
	          onEnd();
	          new notification.Error('Ошибка на сервере, свяжитесь со <a href=\'mailto:orders@javascript.ru\'>службой поддержки</a>.');
	        }
	      });
	
	      request.addEventListener('fail', onEnd);
	    }
	  }]);
	
	  return FormPayment;
	})();
	
	module.exports = FormPayment;

/***/ }

});
//# sourceMappingURL=ebook.5e816467487192ac2e2b.js.map
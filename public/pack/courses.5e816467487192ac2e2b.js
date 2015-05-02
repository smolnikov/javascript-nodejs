var courses =
webpackJsonp_name_([14],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SignupWidget = __webpack_require__(207);
	
	exports.init = function () {
	
	  var signupWidget = document.querySelector('[data-elem="signup"]');
	  if (signupWidget) {
	    new SignupWidget({
	      elem: signupWidget
	    });
	  }
	};

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

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

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bem = __webpack_require__(210)();
	var thumb = __webpack_require__(164).thumb;
	
	module.exports = function (template, locals) {
	  locals = locals ? Object.create(locals) : {};
	  addStandardHelpers(locals);
	
	  return template(locals);
	};
	
	function addStandardHelpers(locals) {
	  locals.bem = bem;
	
	  locals.thumb = thumb;
	}

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.thumb = function (url, width, height) {
	  // sometimes this may be called without url
	  if (!url) return url;
	
	  var pixelRatio = window.devicePixelRatio;
	
	  // return pixelRatio times larger image for retina
	  width *= pixelRatio;
	  height *= pixelRatio;
	
	  var modifier = width <= 160 && height <= 160 ? 't' : width <= 320 && height <= 320 ? 'm' : width <= 640 && height <= 640 ? 'i' : width <= 1024 && height <= 1024 ? 'h' : '';
	
	  return url.slice(0, url.lastIndexOf('.')) + modifier + url.slice(url.lastIndexOf('.'));
	};

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.FormPayment = __webpack_require__(201);

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) : val && typeof val === 'object' ? Object.keys(val).filter(function (key) {
	    return val[key];
	  }) : [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' + 'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' + 'ISO form after 2.0.0');
	    }
	    return ' ' + key + '=\'' + JSON.stringify(val).replace(/'/g, '&apos;') + '\'';
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse) {
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i],
	          val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	exports.escape = function escape(html) {
	  var result = String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	  if (result === '' + html) {
	    return html;
	  } else {
	    return result;
	  }
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str) {
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(91).readFileSync(filename, 'utf8');
	  } catch (ex) {
	    rethrow(err, null, lineno);
	  }
	  var context = 3,
	      lines = str.split('\n'),
	      start = Math.max(lineno - context, 0),
	      end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i) {
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

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

/***/ },

/***/ 207:
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
	var ParticipantsForm = __webpack_require__(208);
	var ContactForm = __webpack_require__(209);
	var pluralize = __webpack_require__(211);
	
	var SignupWidget = (function () {
	  function SignupWidget(options) {
	    var _this = this;
	
	    _classCallCheck(this, SignupWidget);
	
	    this.elem = options.elem;
	
	    this.product = 'course';
	
	    this.elems = {};
	
	    [].forEach.call(this.elem.querySelectorAll('[data-elem]'), function (el) {
	      _this.elems[el.getAttribute('data-elem')] = el;
	    });
	
	    if (this.elems.participants) {
	      var participantsForm = new ParticipantsForm({
	        elem: this.elems.participants
	      });
	
	      participantsForm.elem.addEventListener('select', this.onParticipantsFormSelect.bind(this));
	
	      this.elems.receiptParticipantsEditLink.onclick = function (e) {
	        e.preventDefault();
	        _this.goStep1();
	      };
	    }
	
	    if (this.elems.contact) {
	
	      var contactForm = this.contactForm = new ContactForm({
	        elem: this.elems.contact
	      });
	
	      contactForm.elem.addEventListener('select', this.onContactFormSelect.bind(this));
	
	      this.elems.receiptContactEditLink.onclick = function (e) {
	        e.preventDefault();
	        _this.goStep2();
	      };
	    }
	
	    this.elems.payment.onsubmit = this.onPaymentSubmit.bind(this);
	
	    /*
	    this.delegate('[data-order-payment-change]', 'click', (e) => {
	      e.preventDefault();
	      this.elem.className = this.elem.className.replace(/courses-register_step_\d/, '');
	      this.elem.classList.add('courses-register_step_3');
	    });
	    */
	  }
	
	  _createClass(SignupWidget, [{
	    key: 'onPaymentSubmit',
	    value: function onPaymentSubmit() {
	      event.preventDefault();
	      new FormPayment(this, this.elem.querySelector('.pay-method')).submit();
	    }
	  }, {
	    key: 'goStep1',
	    value: function goStep1() {
	      this.elem.className = this.elem.className.replace(/courses-register_step_\d/, '');
	      this.elem.classList.add('courses-register_step_1');
	    }
	  }, {
	    key: 'goStep2',
	    value: function goStep2() {
	      this.elem.className = this.elem.className.replace(/courses-register_step_\d/, '');
	      this.elem.classList.add('courses-register_step_2');
	
	      this.elems.receiptTitle.innerHTML = 'Участие в курсе для ' + this.participantsInfo.count + '\n      ' + pluralize(this.participantsInfo.count, 'человека', 'человек', 'человек');
	
	      this.elems.receiptAmount.innerHTML = window.groupInfo.price * this.participantsInfo.count;
	
	      this.contactForm.focus();
	    }
	  }, {
	    key: 'goStep3',
	    value: function goStep3() {
	      this.elem.className = this.elem.className.replace(/courses-register_step_\d/, '');
	      this.elem.classList.add('courses-register_step_3');
	
	      this.elems.receiptContactName.innerHTML = this.contactInfo.name;
	      this.elems.receiptContactPhone.innerHTML = this.contactInfo.phone;
	    }
	  }, {
	    key: 'onParticipantsFormSelect',
	    value: function onParticipantsFormSelect(event) {
	      this.participantsInfo = event.detail;
	      this.goStep2();
	    }
	  }, {
	    key: 'onContactFormSelect',
	    value: function onContactFormSelect(event) {
	      this.contactInfo = event.detail;
	      this.goStep3();
	    }
	  }, {
	    key: 'getOrderData',
	
	    // return orderData or nothing if validation failed
	    value: function getOrderData() {
	
	      var orderData = {};
	
	      if (window.orderNumber) {
	        orderData.orderNumber = window.orderNumber;
	      } else {
	        orderData.slug = window.groupInfo.slug;
	        orderData.orderTemplate = 'course';
	        orderData.contactName = this.contactInfo.name;
	        orderData.contactPhone = this.contactInfo.phone;
	        orderData.count = this.participantsInfo.count;
	        orderData.emails = this.participantsInfo.emails;
	      }
	
	      return orderData;
	    }
	  }, {
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
	
	      var paymentMethodElem = this.elem.querySelector('.pay-method');
	      paymentMethodElem.classList.add('modal-overlay_light');
	
	      var spinner = new Spinner({
	        elem: paymentMethodElem,
	        size: 'medium',
	        'class': 'pay-method__spinner'
	      });
	      spinner.start();
	
	      return function onEnd() {
	        paymentMethodElem.classList.remove('modal-overlay_light');
	        if (spinner) spinner.stop();
	      };
	    }
	  }]);
	
	  return SignupWidget;
	})();
	
	delegate.delegateMixin(SignupWidget.prototype);
	
	module.exports = SignupWidget;

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var delegate = __webpack_require__(132);
	var participantsItem = __webpack_require__(212);
	var notification = __webpack_require__(128);
	
	var clientRender = __webpack_require__(141);
	
	var ParticipantsForm = (function () {
	  function ParticipantsForm(options) {
	    var _this = this;
	
	    _classCallCheck(this, ParticipantsForm);
	
	    this.elem = options.elem;
	
	    this.elems = {};
	    [].forEach.call(this.elem.querySelectorAll('[data-elem]'), function (el) {
	      _this.elems[el.getAttribute('data-elem')] = el;
	    });
	
	    this.elem.onsubmit = this.onSubmit.bind(this);
	
	    this.elems.participantsDecreaseButton.onclick = this.onParticipantsDecreaseButtonClick.bind(this);
	    this.elems.participantsDecreaseButton.onmousedown = function () {
	      return false;
	    };
	    this.elems.participantsIncreaseButton.onclick = this.onParticipantsIncreaseButtonClick.bind(this);
	    this.elems.participantsIncreaseButton.onmousedown = function () {
	      return false;
	    };
	
	    this.elems.participantsCountInput.onkeydown = function (e) {
	      // Enter does not submit the form
	      if (e.keyCode == 13 && e.target.tagName == 'INPUT') {
	        e.preventDefault();
	        e.target.blur();
	      }
	    };
	
	    this.elems.participantsCountInput.onchange = this.onParticipantsCountInputChange.bind(this);
	    this.elems.participantsIsSelf.onchange = this.onParticipantsIsSelfChange.bind(this);
	
	    this.elems.participantsAddList.onchange = function (e) {
	      _this.validateParticipantItemInput(e.target);
	    };
	
	    this.elems.participantsAddList.onkeydown = function (e) {
	      // Enter does not submit the form
	      if (e.keyCode == 13 && e.target.tagName == 'INPUT') {
	        e.preventDefault();
	        e.target.blur();
	      }
	    };
	  }
	
	  _createClass(ParticipantsForm, [{
	    key: 'validateParticipantItemInput',
	    value: function validateParticipantItemInput(input) {
	      var valid = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(input.value);
	      if (valid) {
	        input.parentNode.classList.remove('text-input_invalid');
	      } else {
	        input.parentNode.classList.add('text-input_invalid');
	      }
	    }
	  }, {
	    key: 'onParticipantsDecreaseButtonClick',
	    value: function onParticipantsDecreaseButtonClick(event) {
	      this.setCount(this.elems.participantsCountInput.value - 1);
	    }
	  }, {
	    key: 'onParticipantsIncreaseButtonClick',
	    value: function onParticipantsIncreaseButtonClick(event) {
	      this.setCount(+this.elems.participantsCountInput.value + 1);
	    }
	  }, {
	    key: 'onParticipantsCountInputChange',
	    value: function onParticipantsCountInputChange(event) {
	      this.setCount(this.elems.participantsCountInput.value);
	    }
	  }, {
	    key: 'onParticipantsIsSelfChange',
	    value: function onParticipantsIsSelfChange(event) {
	      this.setCount(this.elems.participantsCountInput.value);
	    }
	  }, {
	    key: 'setCount',
	    value: function setCount(count) {
	      count = parseInt(count) || 0;
	
	      var max = +this.elems.participantsCountInput.getAttribute('max');
	      this.elems.participantsDecreaseButton.disabled = count <= 1;
	      this.elems.participantsIncreaseButton.disabled = count >= max;
	
	      this.elems.participantsCountInput.value = count;
	
	      var invalid = count < 1 || count > max;
	      if (invalid) {
	        this.elems.participantsCountInput.parentNode.classList.add('text-input_invalid');
	        return;
	      }
	
	      // render price
	      this.elems.participantsAmount.innerHTML = window.groupInfo.price * count;
	      this.elems.participantsAmountUsd.innerHTML = Math.round(window.groupInfo.price * count / window.rateUsdRub);
	      this.elems.participantsCountInput.parentNode.classList.remove('text-input_invalid');
	
	      // show/hide participants box
	      if (!this.elems.participantsIsSelf.checked || count > 1) {
	        this.elems.participantsAddBox.classList.add('course-add-participants_visible');
	      } else {
	        this.elems.participantsAddBox.classList.remove('course-add-participants_visible');
	      }
	
	      // add/remove participant items
	      while (this.elems.participantsAddList.children.length > count) {
	        this.elems.participantsAddList.lastElementChild.remove();
	      }
	
	      while (this.elems.participantsAddList.children.length < count) {
	        var item = clientRender(participantsItem);
	        this.elems.participantsAddList.insertAdjacentHTML('beforeEnd', item);
	      }
	
	      // current visitor is the first item
	      var firstParticipantItem = this.elems.participantsAddList.firstElementChild.querySelector('input');
	
	      if (this.elems.participantsIsSelf.checked) {
	        firstParticipantItem.disabled = true;
	        firstParticipantItem.value = window.currentUser.email;
	      } else {
	        firstParticipantItem.disabled = false;
	        firstParticipantItem.value = '';
	      }
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      event.preventDefault();
	
	      try {
	        if (this.elems.participantsCountInput.parentNode.classList.contains('text-input_invalid')) {
	          throw new InvalidError();
	        }
	
	        var count = +this.elems.participantsCountInput.value;
	
	        var emails = [];
	        if (this.elems.participantsListEnabled.checked) {
	          [].forEach.call(this.elems.participantsAddList.querySelectorAll('input'), function (input) {
	            if (!input.value) return;
	            if (input.parentNode.classList.contains('text-input_invalid')) {
	              throw new InvalidError();
	            }
	            emails.push(input.value);
	          });
	        } else {
	          if (this.elems.participantsIsSelf.checked) {
	            emails.push(window.currentUser.email);
	          }
	        }
	
	        this.elem.dispatchEvent(new CustomEvent('select', {
	          detail: {
	            count: count,
	            emails: emails
	          }
	        }));
	      } catch (e) {
	        if (e instanceof InvalidError) {
	          new notification.Error('Исправьте, пожалуйста, ошибки.');
	        } else {
	          throw e;
	        }
	      }
	    }
	  }]);
	
	  return ParticipantsForm;
	})();
	
	function InvalidError(message) {
	  this.name = 'InvalidError';
	  this.message = message;
	}
	
	InvalidError.prototype = Object.create(Error.prototype);
	InvalidError.prototype.constructor = InvalidError;
	
	delegate.delegateMixin(ParticipantsForm.prototype);
	
	module.exports = ParticipantsForm;

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var delegate = __webpack_require__(132);
	
	var ContactForm = (function () {
	  function ContactForm(options) {
	    var _this = this;
	
	    _classCallCheck(this, ContactForm);
	
	    this.elem = options.elem;
	
	    this.elems = {};
	    [].forEach.call(this.elem.querySelectorAll('[data-elem]'), function (el) {
	      _this.elems[el.getAttribute('data-elem')] = el;
	    });
	
	    this.elem.onsubmit = this.onSubmit.bind(this);
	  }
	
	  _createClass(ContactForm, [{
	    key: 'focus',
	    value: function focus() {
	      this.elems.contactName.focus();
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      event.preventDefault();
	
	      this.elem.dispatchEvent(new CustomEvent('select', {
	        detail: {
	          name: this.elems.contactName.value,
	          phone: this.elems.contactPhone.value
	        }
	      }));
	    }
	  }]);
	
	  return ContactForm;
	})();
	
	module.exports = ContactForm;

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	// Adapted from bemto.jade, copyright(c) 2012 Roman Komarov <kizu@kizu.ru>
	
	/* jshint -W106 */
	
	'use strict';
	
	var jade = __webpack_require__(199);
	
	module.exports = function (settings) {
	  settings = settings || {};
	
	  settings.prefix = settings.prefix || '';
	  settings.element = settings.element || '__';
	  settings.modifier = settings.modifier || '_';
	
	  return function (buf, bem_chain, tag, isElement) {
	    //console.log("-->", arguments);
	    var block = this.block;
	    var attributes = this.attributes || {};
	
	    if (!attributes['class'] && tag && !isElement) {
	      throw new Error('Block without class: ' + tag);
	    }
	
	    // Rewriting the class for elements and modifiers
	    if (attributes['class']) {
	      var bem_classes = attributes['class'];
	
	      if (bem_classes instanceof Array) {
	        bem_classes = bem_classes.join(' ');
	      }
	      bem_classes = bem_classes.split(' ');
	
	      var bem_block;
	      try {
	        bem_block = bem_classes[0].match(new RegExp('^(((?!' + settings.element + '|' + settings.modifier + ').)+)'))[1];
	      } catch (e) {
	        throw new Error('Incorrect bem class: ' + bem_classes[0]);
	      }
	
	      if (!isElement) {
	        bem_chain[bem_chain.length] = bem_block;
	      } else {
	        bem_classes[0] = bem_chain[bem_chain.length - 1] + settings.element + bem_classes[0];
	      }
	
	      var current_block = (isElement ? bem_chain[bem_chain.length - 1] + settings.element : '') + bem_block;
	
	      // Adding the block if there is only modifier and/or element
	      if (bem_classes.indexOf(current_block) === -1) {
	        bem_classes[bem_classes.length] = current_block;
	      }
	
	      for (var i = 0; i < bem_classes.length; i++) {
	        var klass = bem_classes[i];
	
	        if (klass.match(new RegExp('^(?!' + settings.element + ')' + settings.modifier))) {
	          // Expanding the modifiers
	          bem_classes[i] = current_block + klass;
	        } else if (klass.match(new RegExp('^' + settings.element))) {
	          //- Expanding the mixed in elements
	          if (bem_chain[bem_chain.length - 2]) {
	            bem_classes[i] = bem_chain[bem_chain.length - 2] + klass;
	          } else {
	            bem_classes[i] = bem_chain[bem_chain.length - 1] + klass;
	          }
	        }
	
	        // Adding prefixes
	        if (bem_classes[i].match(new RegExp('^' + current_block + '($|(?=' + settings.element + '|' + settings.modifier + '))'))) {
	          bem_classes[i] = settings.prefix + bem_classes[i];
	        }
	      }
	
	      // Write modified classes to attributes in the correct order
	      attributes['class'] = bem_classes.sort().join(' ');
	    }
	
	    bem_tag(buf, block, attributes, bem_chain, tag);
	
	    // Closing actions (remove the current block from the chain)
	    if (!isElement) {
	      bem_chain.pop();
	    }
	  };
	
	  // used for tweaking what tag we are throwing and do we need to wrap anything here
	  function bem_tag(buf, block, attributes, bem_chain, tag) {
	    // rewriting tag name on different contexts
	    var newTag = tag || 'div';
	
	    switch (newTag) {
	      case 'img':
	        // If there is no title we don't need it to show even if there is some alt
	        if (attributes.alt && !attributes.title) {
	          attributes.title = '';
	        }
	        // If we have title, we must have it in alt if it's not set
	        if (attributes.title && !attributes.alt) {
	          attributes.alt = attributes.title;
	        }
	        if (!attributes.alt) {
	          attributes.alt = '';
	        }
	        break;
	      case 'input':
	        if (!attributes.type) {
	          attributes.type = 'text';
	        }
	        break;
	      case 'html':
	        buf.push('<!DOCTYPE HTML>');
	        break;
	      case 'a':
	        if (!attributes.href) {
	          attributes.href = '#';
	        }
	    }
	
	    buf.push('<' + newTag + jade.attrs(jade.merge([attributes]), true) + '>');
	
	    if (block) block();
	
	    if (['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(newTag) == -1) {
	      buf.push('</' + newTag + '>');
	    }
	  }
	};

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function getPluralType(n) {
	  if (n % 10 == 1 && n % 100 != 11) {
	    return 'one';
	  }
	  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) && n == Math.floor(n)) {
	    return 'few';
	  }
	  if (n % 10 === 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14 && n == Math.floor(n)) {
	    return 'many';
	  }
	  return 'other';
	}
	
	// pluralize(10, 'груша', 'груши', 'груш')
	function pluralize(count, strOne, strFew, strMany) {
	
	  var type = getPluralType(count);
	
	  switch (type) {
	    case 'one':
	      return strOne;
	    case 'few':
	      return strFew;
	    case 'many':
	      return strMany;
	    default:
	      throw new Error('Unsupported count: ' + count);
	  }
	}
	
	module.exports = pluralize;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(199);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (bem) {
	buf.push("");
	var bem_chain = [];
	jade_mixins["b"] = function(tag, isElement, noBlockClass){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	bem.call(this, buf, bem_chain, tag, isElement, noBlockClass)
	};
	
	
	
	
	
	
	
	
	
	jade_mixins["e"] = function(tag){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	jade_mixins["b"].call({
	block: function(){
	block && block();
	},
	attributes: jade.merge([attributes])
	}, tag, true);
	};
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Участник");
	},
	attributes: {"class": "participant-n"}
	}, 'span');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"placeholder": "email","name": "email","type": "email","class": "control"}
	}, 'input');
	jade_mixins["e"].call({
	block: function(){
	buf.push("введите корректный email");
	},
	attributes: {"class": "err"}
	}, 'span');
	},
	attributes: {"class": "text-input"}
	}, 'span');
	},
	attributes: {"class": "participant"}
	}, 'label');
	},
	attributes: {"class": "course-add-participants-item"}
	}, 'li');}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined));;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=courses.5e816467487192ac2e2b.js.map
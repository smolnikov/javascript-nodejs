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
	
	var bem = __webpack_require__(169)();
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
	      return e.preventDefault();
	    });
	
	    // many buttons with paymentMethods, onSubmit doesn't give a way to learn which one is pressed
	    // so I listen to onclick
	    this.delegate('[name="paymentMethod"]', 'click', function (e) {
	      return _this.onPaymentMethodClick(e);
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
	  }, {
	    key: 'onPaymentMethodClick',
	    value: function onPaymentMethodClick(e) {
	      var paymentMethod = e.delegateTarget.value;
	
	      new FormPayment(paymentMethod, this).submit();
	    }
	  }, {
	    key: 'request',
	    value: (function (_request) {
	      function request(_x) {
	        return _request.apply(this, arguments);
	      }
	
	      request.toString = function () {
	        return _request.toString();
	      };
	
	      return request;
	    })(function (options) {
	      var request = xhr(options);
	
	      request.addEventListener('loadstart', (function () {
	        var onEnd = this.startRequestIndication();
	        request.addEventListener('loadend', onEnd);
	      }).bind(this));
	
	      return request;
	    })
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

/***/ 169:
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
	  settings.default_tag = settings.default_tag || 'div';
	
	  return function (buf, bem_chain, bem_chain_contexts, tag, isElement) {
	    //console.log("-->", arguments);
	    var block = this.block;
	    var attributes = this.attributes || {};
	
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
	        bem_classes[0] = bem_classes[0];
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
	
	    bem_tag(buf, block, attributes, bem_chain, bem_chain_contexts, tag);
	
	    // Closing actions (remove the current block from the chain)
	    if (!isElement) {
	      bem_chain.pop();
	    }
	    bem_chain_contexts.pop();
	  };
	
	  // used for tweaking what tag we are throwing and do we need to wrap anything here
	  function bem_tag(buf, block, attributes, bem_chain, bem_chain_contexts, tag) {
	    // rewriting tag name on different contexts
	    var newTag = tag || settings.default_tag;
	    var contextIndex = bem_chain_contexts.length;
	
	    //Checks for contexts if no tag given
	    //console.log(bem_chain_contexts, tag);
	    if (!tag) {
	      if (bem_chain_contexts[contextIndex - 1] === 'inline') {
	        newTag = 'span';
	      } else if (bem_chain_contexts[contextIndex - 1] === 'list') {
	        newTag = 'li';
	      }
	
	      //Attributes context checks
	      if (attributes.href) {
	        newTag = 'a';
	      } else if (attributes['for']) {
	        newTag = 'label';
	      } else if (attributes.src) {
	        newTag = 'img';
	      }
	    }
	
	    //Contextual wrappers
	    if (bem_chain_contexts[contextIndex - 1] === 'list' && newTag !== 'li') {
	      buf.push('<li>');
	    } else if (bem_chain_contexts[contextIndex - 1] !== 'list' && bem_chain_contexts[contextIndex - 1] !== 'pseudo-list' && newTag === 'li') {
	      buf.push('<ul>');
	      bem_chain_contexts[bem_chain_contexts.length] = 'pseudo-list';
	    } else if (bem_chain_contexts[contextIndex - 1] === 'pseudo-list' && newTag !== 'li') {
	      buf.push('</ul>');
	      bem_chain_contexts.pop();
	    }
	
	    //Setting context
	    if (['a', 'abbr', 'acronym', 'b', 'br', 'code', 'em', 'font', 'i', 'img', 'ins', 'kbd', 'map', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'label', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(newTag) !== -1) {
	      bem_chain_contexts[bem_chain_contexts.length] = 'inline';
	    } else if (['ul', 'ol'].indexOf(newTag) !== -1) {
	      bem_chain_contexts[bem_chain_contexts.length] = 'list';
	    } else {
	      bem_chain_contexts[bem_chain_contexts.length] = 'block';
	    }
	
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
	
	    // Closing all the wrapper tails
	    if (bem_chain_contexts[contextIndex - 1] === 'list' && newTag != 'li') {
	      buf.push('</li>');
	    }
	  }
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
	
	var clientRender = __webpack_require__(141);
	
	var paypalCurrencyForm = __webpack_require__(205);
	
	/**
	 * Get data from orderForm.getOrderData()
	 * process payment, ask for more data if needed
	 */
	
	var FormPayment = (function () {
	  function FormPayment(paymentMethod, orderForm) {
	    _classCallCheck(this, FormPayment);
	
	    this.paymentMethod = paymentMethod;
	    this.orderForm = orderForm;
	  }
	
	  _createClass(FormPayment, [{
	    key: 'submit',
	    value: function submit() {
	      var orderData = this.orderForm.getOrderData();
	      if (!orderData) {
	        return;
	      }orderData.paymentMethod = this.paymentMethod;
	
	      if (this.paymentMethod == 'paypal') {
	        this.submitPaypalOrder(orderData);
	        return;
	      }
	
	      this.submitOrder(orderData);
	    }
	  }, {
	    key: 'submitPaypalOrder',
	    value: function submitPaypalOrder(orderData) {
	
	      var modal = new Modal();
	      modal.setContent(clientRender(paypalCurrencyForm));
	
	      var self = this;
	      modal.elem.querySelector('form').onsubmit = function (event) {
	        event.preventDefault();
	        orderData.currency = this.elements.currency.value;
	        modal.remove();
	        self.submitOrder(orderData);
	      };
	    }
	  }, {
	    key: 'submitOrder',
	    value: function submitOrder(orderData) {
	      var _this = this;
	
	      // response status must be 200
	      var request = xhr({
	        method: 'POST',
	        url: '/payments/common/checkout',
	        normalStatuses: [200, 403],
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
	
	      var onEnd = this.orderForm.startRequestIndication();
	
	      request.addEventListener('success', function (event) {
	
	        if (request.status == 403) {
	          new notification.Error('<p>' + (event.result.description || event.result.message) + '</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href=\'mailto:orders@javascript.ru\'>службой поддержки</a>.</p>');
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
	          var submitForm = (function (_submitForm) {
	            function submitForm() {
	              return _submitForm.apply(this, arguments);
	            }
	
	            submitForm.toString = function () {
	              return _submitForm.toString();
	            };
	
	            return submitForm;
	          })(function () {
	            if (!submitForm.called) {
	              submitForm.called = true;
	              container.firstChild.submit();
	            }
	          });
	
	          window.ga('send', 'event', 'payment', 'purchase', 'ebook', {
	            hitCallback: submitForm
	          });
	          setTimeout(submitForm, 500);
	
	          window.metrika.reachGoal('PURCHASE', {
	            product: _this.orderForm.product,
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

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(199);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (bem) {
	buf.push("");
	var bem_chain = [];
	var bem_chain_contexts = ['block'];
	jade_mixins["b"] = function(tag, isElement, noBlockClass){
	var block = (this && this.block), attributes = (this && this.attributes) || {};
	bem.call(this, buf, bem_chain, bem_chain_contexts, tag, isElement, noBlockClass)
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
	buf.push("Выберите валюту");
	},
	attributes: {"class": "title"}
	}, 'h2');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["b"].call({
	block: function(){
	// iterate ['RUB', 'USD', 'EUR']
	;(function(){
	  var $$obj = ['RUB', 'USD', 'EUR'];
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var currency = $$obj[$index];
	
	jade_mixins["e"].call({
	block: function(){
	buf.push(jade.escape(null == (jade_interp = currency) ? "" : jade_interp));
	},
	attributes: {"value": jade.escape(currency)}
	}, 'option');
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var currency = $$obj[$index];
	
	jade_mixins["e"].call({
	block: function(){
	buf.push(jade.escape(null == (jade_interp = currency) ? "" : jade_interp));
	},
	attributes: {"value": jade.escape(currency)}
	}, 'option');
	    }
	
	  }
	}).call(this);
	
	},
	attributes: {"name": "currency","class": "input-select"}
	}, 'select');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Если у вас Российский Paypal-аккаунт, вы можете оплатить только в RUB.");
	},
	attributes: {"class": "note"}
	}, 'p');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Оплатить на PayPal");
	},
	attributes: {"class": "text"}
	}, 'span');
	},
	attributes: {"type": "submit","class": "button _action"}
	}, 'button');
	jade_mixins["e"].call({
	block: function(){
	buf.push("Отмена");
	},
	attributes: {"class": "close-link modal__close"}
	}, 'a');
	},
	attributes: {"class": "line _submit"}
	});
	},
	attributes: {"name": "paypal-currency-form","class": "form"}
	}, 'form');
	},
	attributes: {"class": "paypal-currency-form"}
	});}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined));;return buf.join("");
	}

/***/ }

});
//# sourceMappingURL=ebook.70003865371518b4488f.js.map
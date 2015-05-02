var nodejsScreencast =
webpackJsonp_name_([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Modal = __webpack_require__(114);
	var courseForm = __webpack_require__(154);
	var clientRender = __webpack_require__(141);
	var newsletter = __webpack_require__(149);
	
	exports.init = function () {
	  initList();
	
	  var form = document.querySelector('[data-newsletter-subscribe-form]');
	
	  form.onsubmit = function (event) {
	    event.preventDefault();
	    newsletter.submitSubscribeForm(form);
	  };
	
	  var link = document.querySelector('[data-nodejs-screencast-top-subscribe]');
	
	  link.onclick = function (event) {
	    var modal = new Modal();
	    modal.setContent(clientRender(courseForm));
	
	    var form = modal.elem.querySelector('form');
	    form.setAttribute('data-newsletter-subscribe-form', 'nodejs-top');
	    form.onsubmit = function (event) {
	      event.preventDefault();
	      newsletter.submitSubscribeForm(form, function () {
	        modal.remove();
	      });
	    };
	
	    event.preventDefault();
	  };
	};
	
	function initList() {
	  var lis = document.querySelectorAll('li[mnemo]');
	
	  for (var i = 0; i < lis.length; i++) {
	    var li = lis[i];
	    var mnemo = li.getAttribute('mnemo');
	
	    li.insertAdjacentHTML('beforeEnd', '<div class="lessons-list__download">' + '<div class="lessons-list__popup">' + '<ul class="lessons-list__popup-list">' + '<li class="lessons-list__popup-item">' + '<a href="/nodejs-screencast/nodejs-mp4-low/' + mnemo + '.mp4">Компактный размер</a>' + '</li>' + '<li class="lessons-list__popup-item">' + '<a href="/nodejs-screencast/nodejs-mp4/' + mnemo + '.mp4">Высокое качество</a>' + '</li>' + '</ul>' + '</div>' + '</div>');
	  }
	}

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

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Spinner = __webpack_require__(144);
	var xhr = __webpack_require__(133);
	var notification = __webpack_require__(128);
	
	function init() {}
	
	function submitSubscribeForm(form, onSuccess) {
	
	  if (!form.elements.email.value) {
	    return;
	  }
	
	  var request = xhr({
	    method: 'POST',
	    url: form.action,
	    body: {
	      email: form.elements.email.value,
	      slug: form.elements.slug.value
	    }
	  });
	
	  var submitButton = form.querySelector('[type="submit"]');
	
	  var spinner = new Spinner({
	    elem: submitButton,
	    size: 'small',
	    elemClass: 'button_loading'
	  });
	  spinner.start();
	  submitButton.disabled = true;
	
	  request.addEventListener('loadend', function () {
	    spinner.stop();
	    submitButton.disabled = false;
	  });
	
	  var formLabel = form.getAttribute('data-newsletter-subscribe-form');
	
	  request.addEventListener('success', function (event) {
	    if (this.status == 200) {
	
	      window.metrika.reachGoal('NEWSLETTER-SUBSCRIBE', {
	        form: formLabel
	      });
	      window.ga('send', 'event', 'newsletter', 'subscribe', formLabel);
	
	      new notification.Success(event.result.message, 'slow');
	      onSuccess && onSuccess();
	    } else {
	
	      window.metrika.reachGoal('NEWSLETTER-SUBSCRIBE-FAIL', {
	        form: formLabel
	      });
	      window.ga('send', 'event', 'newsletter', 'subscribe-fail', formLabel);
	
	      new notification.Error(event.result.message);
	    }
	  });
	}
	
	exports.init = init;
	exports.submitSubscribeForm = submitSubscribeForm;

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(199);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (bem, user) {
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
	buf.push("Курс и новые выпуски скринкаста по Node.JS");
	},
	attributes: {"class": "title"}
	}, "h3");
	jade_mixins["e"].call({
	block: function(){
	buf.push("Время от времени я провожу онлайн-курс по Node.JS / IO.JS.");
	},
	attributes: {"class": "text"}
	}, "p");
	jade_mixins["e"].call({
	block: function(){
	buf.push("Курс &mdash; это практика, решение задач на Node.JS, изучение современной разработки на нём.");
	}
	}, "p");
	jade_mixins["e"].call({
	block: function(){
	buf.push("Пришлю уведомление с деталями программы, когда будет открыта запись, и вы сможете решить, интересно ли это вам. Также уведомление будет при новых выпусках скринкаста.");
	}
	}, "p");
	jade_mixins["e"].call({
	block: function(){
	buf.push("<input type=\"hidden\" value=\"nodejs\" name=\"slug\"/>");
	if ( user)
	{
	buf.push("<input type=\"hidden\"" + (jade.attr("value", user.email, true, false)) + " name=\"email\"/>");
	}
	else
	{
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"type": "email","placeholder": "me@mail.com","name": "email","data-modal-autofocus": true,"required": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input"}
	});
	}
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Уведомите меня");
	},
	attributes: {"class": "text"}
	}, "span");
	},
	attributes: {"type": "submit","class": "button _action"}
	}, "button");
	},
	attributes: {"data-newsletter-subscribe-form": "nodejs-bottom","onsubmit": "return false","action": "/newsletter/subscribe","method": "POST","class": "form"}
	}, "form");
	},
	attributes: {"class": "course-form"}
	});}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return buf.join("");
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

/***/ }

});
//# sourceMappingURL=nodejsScreencast.5e816467487192ac2e2b.js.map
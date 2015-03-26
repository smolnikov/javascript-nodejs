webpackJsonp_name_([6],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(23);
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

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.AuthModal = __webpack_require__(56);

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.thumb = function (url, width, height) {
	  // sometimes this may be called without url
	  if (!url) return url;
	
	  var pixelRatio = window.devicePixelRatio;
	
	  // return pixelRatio times larger image for retina
	  width *= pixelRatio;
	  height *= pixelRatio;
	
	  var modifier = width <= 160 && height <= 160 ? "t" : width <= 320 && height <= 320 ? "m" : width <= 640 && height <= 640 ? "i" : width <= 1024 && height <= 1024 ? "h" : "";
	
	  return url.slice(0, url.lastIndexOf(".")) + modifier + url.slice(url.lastIndexOf("."));
	};

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var xhr = __webpack_require__(28);
	
	var delegate = __webpack_require__(27);
	var Modal = __webpack_require__(9);
	var Spinner = __webpack_require__(37);
	
	var loginForm = __webpack_require__(83);
	var registerForm = __webpack_require__(84);
	var forgotForm = __webpack_require__(85);
	
	var clientRender = __webpack_require__(81);
	
	/**
	 * Options:
	 *   - callback: function to be called after successful login (by default - go to successRedirect)
	 *   - message: form message to be shown when the login form appears ("Log in to leave the comment")
	 *   - successRedirect: the page to redirect (current page by default)
	 *       - after immediate login
	 *       - after registration for "confirm email" link
	 */
	function AuthModal(options) {
	  Modal.apply(this, arguments);
	  options = options || {};
	
	  if (!options.successRedirect) {
	    options.successRedirect = window.location.href;
	  }
	
	  var self = this;
	  if (!options.callback) {
	    options.callback = function () {
	      self.successRedirect();
	    };
	  }
	
	  this.options = options;
	  this.setContent(clientRender(loginForm));
	
	  if (options.message) {
	    this.showFormMessage(options.message, "info");
	  }
	
	  this.initEventHandlers();
	}
	AuthModal.prototype = Object.create(Modal.prototype);
	
	delegate.delegateMixin(AuthModal.prototype);
	
	AuthModal.prototype.successRedirect = function () {
	  if (window.location.href == this.options.successRedirect) {
	    window.location.reload();
	  } else {
	    window.location.href = this.options.successRedirect;
	  }
	};
	
	AuthModal.prototype.clearFormMessages = function () {
	  /*
	   remove error for this notation:
	   span.text-input.text-input_invalid.login-form__input
	   input.text-input__control#password(type="password", name="password")
	   span.text-inpuxt__err Пароли не совпадают
	   */
	  [].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function (elem) {
	    elem.classList.remove("text-input_invalid");
	  });
	
	  [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function (elem) {
	    elem.remove();
	  });
	
	  // clear form-wide notification
	  this.elem.querySelector("[data-notification]").innerHTML = "";
	};
	
	AuthModal.prototype.request = function (options) {
	  var request = xhr(options);
	
	  request.addEventListener("loadstart", (function () {
	    var onEnd = this.startRequestIndication();
	    request.addEventListener("loadend", onEnd);
	  }).bind(this));
	
	  return request;
	};
	
	AuthModal.prototype.startRequestIndication = function () {
	  this.showOverlay();
	  var self = this;
	
	  var submitButton = this.elem.querySelector("[type=\"submit\"]");
	
	  if (submitButton) {
	    var spinner = new Spinner({
	      elem: submitButton,
	      size: "small",
	      "class": "submit-button__spinner",
	      elemClass: "submit-button_progress"
	    });
	    spinner.start();
	  }
	
	  return function onEnd() {
	    self.hideOverlay();
	    if (spinner) spinner.stop();
	  };
	};
	
	AuthModal.prototype.initEventHandlers = function () {
	
	  this.delegate("[data-switch=\"register-form\"]", "click", function (e) {
	    e.preventDefault();
	    this.setContent(clientRender(registerForm));
	  });
	
	  this.delegate("[data-switch=\"login-form\"]", "click", function (e) {
	    e.preventDefault();
	    this.setContent(clientRender(loginForm));
	  });
	
	  this.delegate("[data-switch=\"forgot-form\"]", "click", function (e) {
	    e.preventDefault();
	
	    // move currently entered email into forgotForm
	    var oldEmailInput = this.elem.querySelector("[type=\"email\"]");
	    this.setContent(clientRender(forgotForm));
	    var newEmailInput = this.elem.querySelector("[type=\"email\"]");
	    newEmailInput.value = oldEmailInput.value;
	  });
	
	  this.delegate("[data-form=\"login\"]", "submit", function (event) {
	    event.preventDefault();
	    this.submitLoginForm(event.target);
	  });
	
	  this.delegate("[data-form=\"register\"]", "submit", function (event) {
	    event.preventDefault();
	    this.submitRegisterForm(event.target);
	  });
	
	  this.delegate("[data-form=\"forgot\"]", "submit", function (event) {
	    event.preventDefault();
	    this.submitForgotForm(event.target);
	  });
	
	  this.delegate("[data-provider]", "click", function (event) {
	    event.preventDefault();
	    this.openAuthPopup("/auth/login/" + event.delegateTarget.dataset.provider);
	  });
	
	  this.delegate("[data-action-verify-email]", "click", function (event) {
	    event.preventDefault();
	
	    var payload = new FormData();
	    var email = event.delegateTarget.dataset.actionVerifyEmail;
	    payload.append("email", email);
	
	    var request = this.request({
	      method: "POST",
	      url: "/auth/reverify",
	      body: payload
	    });
	
	    var self = this;
	    request.addEventListener("success", function (event) {
	
	      if (this.status == 200) {
	        self.showFormMessage("\n        <p>Письмо-подтверждение отправлено ещё раз.</p>\n        <p><a href='#' data-action-verify-email='" + email + "'>перезапросить подтверждение.</a></p>\n        ", "success");
	      } else {
	        self.showFormMessage(event.result, "error");
	      }
	    });
	  });
	};
	
	AuthModal.prototype.submitRegisterForm = function (form) {
	
	  this.clearFormMessages();
	
	  var hasErrors = false;
	  if (!form.elements.email.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.email, "Введите, пожалуста, email.");
	  }
	
	  if (!form.elements.displayName.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.displayName, "Введите, пожалуста, имя пользователя.");
	  }
	
	  if (!form.elements.password.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.password, "Введите, пожалуста, пароль.");
	  }
	
	  if (hasErrors) return;
	
	  var payload = new FormData(form);
	  payload.append("successRedirect", this.options.successRedirect);
	
	  var request = this.request({
	    method: "POST",
	    url: "/auth/register",
	    normalStatuses: [201, 400],
	    body: payload
	  });
	
	  var self = this;
	  request.addEventListener("success", function (event) {
	
	    if (this.status == 201) {
	      self.setContent(clientRender(loginForm));
	      self.showFormMessage("<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p>" + "<p><a href='#' data-action-verify-email='" + form.elements.email.value + "'>перезапросить подтверждение.</a></p>", "success");
	      return;
	    }
	
	    if (this.status == 400) {
	      debugger;
	      for (var field in event.result.errors) {
	        self.showInputError(form.elements[field], event.result.errors[field]);
	      }
	      return;
	    }
	
	    self.showFormMessage("Неизвестный статус ответа сервера", "error");
	  });
	};
	
	AuthModal.prototype.submitForgotForm = function (form) {
	
	  this.clearFormMessages();
	
	  var hasErrors = false;
	  if (!form.elements.email.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.email, "Введите, пожалуста, email.");
	  }
	
	  if (hasErrors) return;
	
	  var payload = new FormData(form);
	  payload.append("successRedirect", this.options.successRedirect);
	
	  var request = this.request({
	    method: "POST",
	    url: "/auth/forgot",
	    normalStatuses: [200, 404],
	    body: payload
	  });
	
	  var self = this;
	  request.addEventListener("success", function (event) {
	
	    if (this.status == 200) {
	      self.setContent(clientRender(loginForm));
	      self.showFormMessage(event.result, "success");
	    } else if (this.status == 404) {
	      self.showFormMessage(event.result, "error");
	    }
	  });
	};
	
	AuthModal.prototype.showInputError = function (input, error) {
	  input.parentNode.classList.add("text-input_invalid");
	  var errorSpan = document.createElement("span");
	  errorSpan.className = "text-input__err";
	  errorSpan.innerHTML = error;
	  input.parentNode.appendChild(errorSpan);
	};
	
	AuthModal.prototype.showFormMessage = function (message, type) {
	  if (message.indexOf("<p>") !== 0) {
	    message = "<p>" + message + "</p>";
	  }
	
	  if (["info", "error", "warning", "success"].indexOf(type) == -1) {
	    throw new Error("Unsupported type: " + type);
	  }
	
	  var container = document.createElement("div");
	  container.className = "login-form__" + type;
	  container.innerHTML = message;
	
	  this.elem.querySelector("[data-notification]").innerHTML = "";
	  this.elem.querySelector("[data-notification]").appendChild(container);
	};
	
	AuthModal.prototype.submitLoginForm = function (form) {
	
	  this.clearFormMessages();
	
	  var hasErrors = false;
	  if (!form.elements.login.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.login, "Введите, пожалуста, имя или email.");
	  }
	
	  if (!form.elements.password.value) {
	    hasErrors = true;
	    this.showInputError(form.elements.password, "Введите, пожалуста, пароль.");
	  }
	
	  if (hasErrors) return;
	
	  var request = this.request({
	    method: "POST",
	    url: "/auth/login/local",
	    normalStatuses: [200, 401],
	    body: new FormData(form)
	  });
	
	  var self = this;
	  request.addEventListener("success", function (event) {
	
	    if (this.status != 200) {
	      self.onAuthFailure(event.result.message);
	      return;
	    }
	
	    self.onAuthSuccess(event.result.user);
	  });
	};
	
	AuthModal.prototype.openAuthPopup = function (url) {
	  if (this.authPopup && !this.authPopup.closed) {
	    this.authPopup.close(); // close old popup if any
	  }
	  var width = 800,
	      height = 600;
	  var top = (window.outerHeight - height) / 2;
	  var left = (window.outerWidth - width) / 2;
	  window.authModal = this;
	  this.authPopup = window.open(url, "authModal", "width=" + width + ",height=" + height + ",scrollbars=0,top=" + top + ",left=" + left);
	};
	
	/*
	 все обработчики авторизации (включая Facebook из popup-а и локальный)
	 в итоге триггерят один из этих каллбэков
	 */
	AuthModal.prototype.onAuthSuccess = function (user) {
	  window.currentUser = user;
	  this.options.callback();
	};
	
	AuthModal.prototype.onAuthFailure = function (errorMessage) {
	  this.showFormMessage(errorMessage || "Отказ в авторизации.", "error");
	};
	
	module.exports = AuthModal;

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var bem = __webpack_require__(87)();
	var thumb = __webpack_require__(52).thumb;
	
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

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(89);
	
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
	jade_mixins["b"].call({
	attributes: {"type": "button","title": "закрыть","class": "close-button __close"}
	}, 'button');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Вход в систему");
	},
	attributes: {"class": "title"}
	}, 'h4');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("регистрация");
	},
	attributes: {"type": "button","data-switch": "register-form","class": "button-link __register"}
	}, 'button');
	},
	attributes: {"class": "header-aside"}
	});
	},
	attributes: {"class": "line __header"}
	});
	jade_mixins["e"].call({
	attributes: {"data-notification": true,"class": "line __notification"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Email:");
	},
	attributes: {"for": "login","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "login","name": "login","type": "email","autofocus": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Пароль:");
	},
	attributes: {"for": "password","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "password","type": "password","name": "password","class": "control"}
	}, 'input');
	jade_mixins["e"].call({
	block: function(){
	buf.push("Забыли?");
	},
	attributes: {"type": "button","data-switch": "forgot-form","class": "aside __forgot __button-link"}
	}, 'button');
	},
	attributes: {"class": "text-input _with-aside __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Войти");
	},
	attributes: {"class": "text"}
	}, 'span');
	},
	attributes: {"type": "submit","class": "submit-button _small __submit"}
	}, 'button');
	},
	attributes: {"class": "line __footer"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Вход через социальные сети");
	},
	attributes: {"class": "social-logins-title"}
	}, 'h5');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Facebook");
	},
	attributes: {"data-provider": "facebook","class": "social-login _facebook __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Google+");
	},
	attributes: {"data-provider": "google","class": "social-login _google __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Вконтакте");
	},
	attributes: {"data-provider": "vkontakte","class": "social-login _vkontakte __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Github");
	},
	attributes: {"data-provider": "github","class": "social-login _github __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Яндекс");
	},
	attributes: {"data-provider": "yandex","class": "social-login _yandex __social-login"}
	}, 'button');
	},
	attributes: {"class": "line __social-logins"}
	});
	},
	attributes: {"action": "#","class": "form"}
	}, 'form');
	},
	attributes: {"data-form": "login","class": "login-form"}
	});}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined));;return buf.join("");
	}

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(89);
	
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
	jade_mixins["b"].call({
	attributes: {"type": "button","title": "закрыть","class": "close-button __close"}
	}, 'button');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Регистрация");
	},
	attributes: {"class": "title"}
	}, 'h4');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("вход");
	},
	attributes: {"type": "button","data-switch": "login-form","class": "button-link"}
	}, 'button');
	},
	attributes: {"class": "header-aside"}
	});
	},
	attributes: {"class": "line __header"}
	});
	jade_mixins["e"].call({
	attributes: {"data-notification": true,"class": "line __notification"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Email:");
	},
	attributes: {"for": "register-email","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "register-email","name": "email","type": "email","required": true,"autofocus": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Имя пользователя:");
	},
	attributes: {"for": "register-displayName","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "register-displayName","name": "displayName","required": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Пароль:");
	},
	attributes: {"for": "register-password","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "register-password","type": "password","name": "password","required": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Зарегистрироваться");
	},
	attributes: {"class": "text"}
	}, 'span');
	},
	attributes: {"type": "submit","class": "submit-button _small submit"}
	}, 'button');
	},
	attributes: {"class": "line __footer"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Вход через социальные сети");
	},
	attributes: {"class": "social-logins-title"}
	}, 'h5');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Facebook");
	},
	attributes: {"data-provider": "facebook","class": "social-login _facebook __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Google+");
	},
	attributes: {"data-provider": "google","class": "social-login _google __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Вконтакте");
	},
	attributes: {"data-provider": "vkontakte","class": "social-login _vkontakte __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Github");
	},
	attributes: {"data-provider": "github","class": "social-login _github __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Яндекс");
	},
	attributes: {"data-provider": "yandex","class": "social-login _yandex __social-login"}
	}, 'button');
	},
	attributes: {"class": "line __social-logins"}
	});
	},
	attributes: {"action": "#","data-form": "register","class": "form"}
	}, 'form');
	},
	attributes: {"class": "login-form"}
	});}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined));;return buf.join("");
	}

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(89);
	
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
	jade_mixins["b"].call({
	attributes: {"type": "button","title": "закрыть","class": "close-button __close"}
	}, 'button');
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Восстановление пароля");
	},
	attributes: {"class": "title"}
	}, 'h4');
	},
	attributes: {"class": "line __header"}
	});
	jade_mixins["e"].call({
	attributes: {"data-notification": true,"class": "line __notification"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Email:");
	},
	attributes: {"for": "forgot-email","class": "label"}
	}, 'label');
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	attributes: {"id": "forgot-email","name": "email","type": "email","autofocus": true,"class": "control"}
	}, 'input');
	},
	attributes: {"class": "text-input __input"}
	}, 'span');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["b"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Восстановить пароль");
	},
	attributes: {"class": "text"}
	}, 'span');
	},
	attributes: {"type": "submit","class": "submit-button _small __submit"}
	}, 'button');
	},
	attributes: {"class": "line"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Вход");
	},
	attributes: {"type": "button","data-switch": "login-form","class": "button-link"}
	}, 'button');
	buf.push(" ");
	jade_mixins["e"].call({
	block: function(){
	buf.push("/");
	},
	attributes: {"class": "separator"}
	}, 'span');
	buf.push(" ");
	jade_mixins["e"].call({
	block: function(){
	buf.push("Регистрация");
	},
	attributes: {"data-switch": "register-form","class": "button-link"}
	}, 'button');
	},
	attributes: {"class": "line __footer"}
	});
	jade_mixins["e"].call({
	block: function(){
	jade_mixins["e"].call({
	block: function(){
	buf.push("Вход через социальные сети");
	},
	attributes: {"class": "social-logins-title"}
	}, 'h5');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Facebook");
	},
	attributes: {"data-provider": "facebook","class": "social-login _facebook __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Google+");
	},
	attributes: {"data-provider": "google","class": "social-login _google __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Вконтакте");
	},
	attributes: {"data-provider": "vkontakte","class": "social-login _vkontakte __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Github");
	},
	attributes: {"data-provider": "github","class": "social-login _github __social-login"}
	}, 'button');
	buf.push(" ");
	jade_mixins["b"].call({
	block: function(){
	buf.push("Яндекс");
	},
	attributes: {"data-provider": "yandex","class": "social-login _yandex __social-login"}
	}, 'button');
	},
	attributes: {"class": "line __social-logins"}
	});
	},
	attributes: {"action": "#","data-form": "forgot","class": "form"}
	}, 'form');
	},
	attributes: {"class": "login-form"}
	});}.call(this,"bem" in locals_for_with?locals_for_with.bem:typeof bem!=="undefined"?bem:undefined));;return buf.join("");
	}

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	// Adapted from bemto.jade, copyright(c) 2012 Roman Komarov <kizu@kizu.ru>
	
	/* jshint -W106 */
	
	"use strict";
	
	var jade = __webpack_require__(89);
	
	module.exports = function (settings) {
	  settings = settings || {};
	
	  settings.prefix = settings.prefix || "";
	  settings.element = settings.element || "__";
	  settings.modifier = settings.modifier || "_";
	  settings.default_tag = settings.default_tag || "div";
	
	  return function (buf, bem_chain, bem_chain_contexts, tag, isElement) {
	    //console.log("-->", arguments);
	    var block = this.block;
	    var attributes = this.attributes || {};
	
	    // Rewriting the class for elements and modifiers
	    if (attributes["class"]) {
	      var bem_classes = attributes["class"];
	
	      if (bem_classes instanceof Array) {
	        bem_classes = bem_classes.join(" ");
	      }
	      bem_classes = bem_classes.split(" ");
	
	      var bem_block;
	      try {
	        bem_block = bem_classes[0].match(new RegExp("^(((?!" + settings.element + "|" + settings.modifier + ").)+)"))[1];
	      } catch (e) {
	        throw new Error("Incorrect bem class: " + bem_classes[0]);
	      }
	
	      if (!isElement) {
	        bem_chain[bem_chain.length] = bem_block;
	        bem_classes[0] = bem_classes[0];
	      } else {
	        bem_classes[0] = bem_chain[bem_chain.length - 1] + settings.element + bem_classes[0];
	      }
	
	      var current_block = (isElement ? bem_chain[bem_chain.length - 1] + settings.element : "") + bem_block;
	
	      // Adding the block if there is only modifier and/or element
	      if (bem_classes.indexOf(current_block) === -1) {
	        bem_classes[bem_classes.length] = current_block;
	      }
	
	      for (var i = 0; i < bem_classes.length; i++) {
	        var klass = bem_classes[i];
	
	        if (klass.match(new RegExp("^(?!" + settings.element + ")" + settings.modifier))) {
	          // Expanding the modifiers
	          bem_classes[i] = current_block + klass;
	        } else if (klass.match(new RegExp("^" + settings.element))) {
	          //- Expanding the mixed in elements
	          if (bem_chain[bem_chain.length - 2]) {
	            bem_classes[i] = bem_chain[bem_chain.length - 2] + klass;
	          } else {
	            bem_classes[i] = bem_chain[bem_chain.length - 1] + klass;
	          }
	        }
	
	        // Adding prefixes
	        if (bem_classes[i].match(new RegExp("^" + current_block + "($|(?=" + settings.element + "|" + settings.modifier + "))"))) {
	          bem_classes[i] = settings.prefix + bem_classes[i];
	        }
	      }
	
	      // Write modified classes to attributes in the correct order
	      attributes["class"] = bem_classes.sort().join(" ");
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
	      if (bem_chain_contexts[contextIndex - 1] === "inline") {
	        newTag = "span";
	      } else if (bem_chain_contexts[contextIndex - 1] === "list") {
	        newTag = "li";
	      }
	
	      //Attributes context checks
	      if (attributes.href) {
	        newTag = "a";
	      } else if (attributes["for"]) {
	        newTag = "label";
	      } else if (attributes.src) {
	        newTag = "img";
	      }
	    }
	
	    //Contextual wrappers
	    if (bem_chain_contexts[contextIndex - 1] === "list" && newTag !== "li") {
	      buf.push("<li>");
	    } else if (bem_chain_contexts[contextIndex - 1] !== "list" && bem_chain_contexts[contextIndex - 1] !== "pseudo-list" && newTag === "li") {
	      buf.push("<ul>");
	      bem_chain_contexts[bem_chain_contexts.length] = "pseudo-list";
	    } else if (bem_chain_contexts[contextIndex - 1] === "pseudo-list" && newTag !== "li") {
	      buf.push("</ul>");
	      bem_chain_contexts.pop();
	    }
	
	    //Setting context
	    if (["a", "abbr", "acronym", "b", "br", "code", "em", "font", "i", "img", "ins", "kbd", "map", "samp", "small", "span", "strong", "sub", "sup", "label", "p", "h1", "h2", "h3", "h4", "h5", "h6"].indexOf(newTag) !== -1) {
	      bem_chain_contexts[bem_chain_contexts.length] = "inline";
	    } else if (["ul", "ol"].indexOf(newTag) !== -1) {
	      bem_chain_contexts[bem_chain_contexts.length] = "list";
	    } else {
	      bem_chain_contexts[bem_chain_contexts.length] = "block";
	    }
	
	    switch (newTag) {
	      case "img":
	        // If there is no title we don't need it to show even if there is some alt
	        if (attributes.alt && !attributes.title) {
	          attributes.title = "";
	        }
	        // If we have title, we must have it in alt if it's not set
	        if (attributes.title && !attributes.alt) {
	          attributes.alt = attributes.title;
	        }
	        if (!attributes.alt) {
	          attributes.alt = "";
	        }
	        break;
	      case "input":
	        if (!attributes.type) {
	          attributes.type = "text";
	        }
	        break;
	      case "html":
	        buf.push("<!DOCTYPE HTML>");
	        break;
	      case "a":
	        if (!attributes.href) {
	          attributes.href = "#";
	        }
	    }
	
	    buf.push("<" + newTag + jade.attrs(jade.merge([attributes]), true) + ">");
	
	    if (block) block();
	
	    if (["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"].indexOf(newTag) == -1) {
	      buf.push("</" + newTag + ">");
	    }
	
	    // Closing all the wrapper tails
	    if (bem_chain_contexts[contextIndex - 1] === "list" && newTag != "li") {
	      buf.push("</li>");
	    }
	  }
	};

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	  var ac = a["class"];
	  var bc = b["class"];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a["class"] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != "class") {
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
	  return val != null && val !== "";
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) : val && typeof val === "object" ? Object.keys(val).filter(function (key) {
	    return val[key];
	  }) : [val]).filter(nulls).join(" ");
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
	    return " class=\"" + text + "\"";
	  } else {
	    return "";
	  }
	};
	
	exports.style = function (val) {
	  if (val && typeof val === "object") {
	    return Object.keys(val).map(function (style) {
	      return style + ":" + val[style];
	    }).join(";");
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
	  if (key === "style") {
	    val = exports.style(val);
	  }
	  if ("boolean" == typeof val || null == val) {
	    if (val) {
	      return " " + (terse ? key : key + "=\"" + key + "\"");
	    } else {
	      return "";
	    }
	  } else if (0 == key.indexOf("data") && "string" != typeof val) {
	    if (JSON.stringify(val).indexOf("&") !== -1) {
	      console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes " + "will be escaped to `&amp;`");
	    };
	    if (val && typeof val.toISOString === "function") {
	      console.warn("Jade will eliminate the double quotes around dates in " + "ISO form after 2.0.0");
	    }
	    return " " + key + "='" + JSON.stringify(val).replace(/'/g, "&apos;") + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === "function") {
	      console.warn("Jade will stringify dates in ISO form after 2.0.0");
	    }
	    return " " + key + "=\"" + exports.escape(val) + "\"";
	  } else {
	    if (val && typeof val.toISOString === "function") {
	      console.warn("Jade will stringify dates in ISO form after 2.0.0");
	    }
	    return " " + key + "=\"" + val + "\"";
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
	
	      if ("class" == key) {
	        if (val = joinClasses(val)) {
	          buf.push(" " + key + "=\"" + val + "\"");
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join("");
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	exports.escape = function escape(html) {
	  var result = String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	  if (result === "" + html) {
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
	  if ((typeof window != "undefined" || !filename) && !str) {
	    err.message += " on line " + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(91).readFileSync(filename, "utf8");
	  } catch (ex) {
	    rethrow(err, null, lineno);
	  }
	  var context = 3,
	      lines = str.split("\n"),
	      start = Math.max(lineno - context, 0),
	      end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i) {
	    var curr = i + start + 1;
	    return (curr == lineno ? "  > " : "    ") + curr + "| " + line;
	  }).join("\n");
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || "Jade") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	  throw err;
	};

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ }

});
//# sourceMappingURL=6.7df9e72be2ed3874d51d.js.map
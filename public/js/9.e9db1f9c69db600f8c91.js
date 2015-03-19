webpackJsonp_name_([9],{

/***/ 24:
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

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.AuthModal = __webpack_require__(55);

/***/ },

/***/ 49:
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

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var xhr = __webpack_require__(24);
	
	var delegate = __webpack_require__(23);
	var Modal = __webpack_require__(5);
	var Spinner = __webpack_require__(32);
	
	var loginForm = __webpack_require__(79);
	var registerForm = __webpack_require__(80);
	var forgotForm = __webpack_require__(81);
	
	var clientRender = __webpack_require__(77);
	
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
	        self.showFormMessage("\n        <p>Письмо-подтверждение отправлено ещё раз.</p>\n        <p><a href='#' data-action-verify-email='" + email + "'>перезапросить подтверждение.</a></p>\"\n        ", "success");
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

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var bem = __webpack_require__(82)();
	var thumb = __webpack_require__(49).thumb;
	
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

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(84);
	
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

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(84);
	
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

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(84);
	
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

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	// Adapted from bemto.jade, copyright(c) 2012 Roman Komarov <kizu@kizu.ru>
	
	/* jshint -W106 */
	
	"use strict";
	
	var jade = __webpack_require__(84);
	
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

/***/ 84:
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
	    str = str || __webpack_require__(85).readFileSync(filename, "utf8");
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

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQveGhyLmpzPzY4NTIqKiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qcz9kMTJhKioiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvYXV0aC9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2ltYWdlLmpzPzhkYTkiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvYXV0aC9jbGllbnQvYXV0aE1vZGFsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jbGllbnRSZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvYXV0aC90ZW1wbGF0ZXMvbG9naW4tZm9ybS5qYWRlIiwid2VicGFjazovLy8uL2hhbmRsZXJzL2F1dGgvdGVtcGxhdGVzL3JlZ2lzdGVyLWZvcm0uamFkZSIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9hdXRoL3RlbXBsYXRlcy9mb3Jnb3QtZm9ybS5qYWRlIiwid2VicGFjazovLy8uL34vYmVtLWphZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9qYWRlL2xpYi9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcyAoaWdub3JlZCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsRUFBcUIsQ0FBQyxDQUFDO0FBQ2xELEtBQUksYUFBYSxHQUFHLG1CQUFPLENBQUMsRUFBc0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCcEQsVUFBUyxHQUFHLENBQUMsT0FBTyxFQUFFOztBQUVwQixPQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOztBQUVuQyxPQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQzs7QUFFckMsT0FBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN4QixPQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztB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O0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDLEdBQUcsa0dBQWtHO0FBQ3RHLEU7Ozs7Ozs7QUNoTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLG1DQUFtQyxFQUFFO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQSxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0QsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUMsR0FBRyxrR0FBa0c7QUFDdEcsRTs7Ozs7OztBQzdMQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsbUNBQW1DLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0EsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGNBQWE7QUFDYixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRCxFQUFDO0FBQ0QsY0FBYTtBQUNiLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNELEVBQUM7QUFDRCxjQUFhO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNB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QUksQ0FBQztJQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdkLE1BQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLE1BQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLElBQUksTUFBTSxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQzdDLElBQUksR0FBRyxPQUFPLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUMsU0FBTSxHQUFHLENBQUM7RUFDWCxDOzs7Ozs7O0FDdk9ELGdCIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpXG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuICB9LCAwKTtcblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3JmQ29va2llID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pO1xuICByZXR1cm4gY3NyZkNvb2tpZSA/IGNzcmZDb29raWVbMV0gOiBudWxsO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qc1xuICoqLyIsImV4cG9ydHMuQXV0aE1vZGFsID0gcmVxdWlyZSgnLi9hdXRoTW9kYWwnKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvYXV0aC9jbGllbnQvaW5kZXguanNcbiAqKi8iLCJcbmV4cG9ydHMudGh1bWIgPSBmdW5jdGlvbih1cmwsIHdpZHRoLCBoZWlnaHQpIHtcbiAgLy8gc29tZXRpbWVzIHRoaXMgbWF5IGJlIGNhbGxlZCB3aXRob3V0IHVybFxuICBpZiAoIXVybCkgcmV0dXJuIHVybDtcblxuICB2YXIgcGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuXG4gIC8vIHJldHVybiBwaXhlbFJhdGlvIHRpbWVzIGxhcmdlciBpbWFnZSBmb3IgcmV0aW5hXG4gIHdpZHRoICo9IHBpeGVsUmF0aW87XG4gIGhlaWdodCAqPSBwaXhlbFJhdGlvO1xuXG4gIHZhciBtb2RpZmllciA9ICh3aWR0aCA8PSAxNjAgJiYgaGVpZ2h0IDw9IDE2MCkgPyAndCcgOlxuICAgICh3aWR0aCA8PSAzMjAgJiYgaGVpZ2h0IDw9IDMyMCkgPyAnbScgOlxuICAgICAgKHdpZHRoIDw9IDY0MCAmJiBoZWlnaHQgPD0gNjQwKSA/ICdpJyA6XG4gICAgICAgICh3aWR0aCA8PSAxMDI0ICYmIGhlaWdodCA8PSAxMDI0KSA/ICdoJyA6ICcnO1xuXG4gIHJldHVybiB1cmwuc2xpY2UoMCwgdXJsLmxhc3RJbmRleE9mKCcuJykpICsgbW9kaWZpZXIgKyB1cmwuc2xpY2UodXJsLmxhc3RJbmRleE9mKCcuJykpO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaW1hZ2UuanNcbiAqKi8iLCJ2YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xuXG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBNb2RhbCA9IHJlcXVpcmUoJ2NsaWVudC9oZWFkL21vZGFsJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG5cblxudmFyIGxvZ2luRm9ybSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9sb2dpbi1mb3JtLmphZGUnKTtcbnZhciByZWdpc3RlckZvcm0gPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvcmVnaXN0ZXItZm9ybS5qYWRlJyk7XG52YXIgZm9yZ290Rm9ybSA9IHJlcXVpcmUoJy4uL3RlbXBsYXRlcy9mb3Jnb3QtZm9ybS5qYWRlJyk7XG5cbnZhciBjbGllbnRSZW5kZXIgPSByZXF1aXJlKCdjbGllbnQvY2xpZW50UmVuZGVyJyk7XG5cbi8qKlxuICogT3B0aW9uczpcbiAqICAgLSBjYWxsYmFjazogZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGFmdGVyIHN1Y2Nlc3NmdWwgbG9naW4gKGJ5IGRlZmF1bHQgLSBnbyB0byBzdWNjZXNzUmVkaXJlY3QpXG4gKiAgIC0gbWVzc2FnZTogZm9ybSBtZXNzYWdlIHRvIGJlIHNob3duIHdoZW4gdGhlIGxvZ2luIGZvcm0gYXBwZWFycyAoXCJMb2cgaW4gdG8gbGVhdmUgdGhlIGNvbW1lbnRcIilcbiAqICAgLSBzdWNjZXNzUmVkaXJlY3Q6IHRoZSBwYWdlIHRvIHJlZGlyZWN0IChjdXJyZW50IHBhZ2UgYnkgZGVmYXVsdClcbiAqICAgICAgIC0gYWZ0ZXIgaW1tZWRpYXRlIGxvZ2luXG4gKiAgICAgICAtIGFmdGVyIHJlZ2lzdHJhdGlvbiBmb3IgXCJjb25maXJtIGVtYWlsXCIgbGlua1xuICovXG5mdW5jdGlvbiBBdXRoTW9kYWwob3B0aW9ucykge1xuICBNb2RhbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoIW9wdGlvbnMuc3VjY2Vzc1JlZGlyZWN0KSB7XG4gICAgb3B0aW9ucy5zdWNjZXNzUmVkaXJlY3QgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgfVxuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKCFvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgb3B0aW9ucy5jYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5zdWNjZXNzUmVkaXJlY3QoKTtcbiAgICB9O1xuICB9XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5zZXRDb250ZW50KGNsaWVudFJlbmRlcihsb2dpbkZvcm0pKTtcblxuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5zaG93Rm9ybU1lc3NhZ2Uob3B0aW9ucy5tZXNzYWdlLCAnaW5mbycpO1xuICB9XG5cbiAgdGhpcy5pbml0RXZlbnRIYW5kbGVycygpO1xufVxuQXV0aE1vZGFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTW9kYWwucHJvdG90eXBlKTtcblxuXG5kZWxlZ2F0ZS5kZWxlZ2F0ZU1peGluKEF1dGhNb2RhbC5wcm90b3R5cGUpO1xuXG5BdXRoTW9kYWwucHJvdG90eXBlLnN1Y2Nlc3NSZWRpcmVjdCA9IGZ1bmN0aW9uKCkge1xuICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYgPT0gdGhpcy5vcHRpb25zLnN1Y2Nlc3NSZWRpcmVjdCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMub3B0aW9ucy5zdWNjZXNzUmVkaXJlY3Q7XG4gIH1cbn07XG5cbkF1dGhNb2RhbC5wcm90b3R5cGUuY2xlYXJGb3JtTWVzc2FnZXMgPSBmdW5jdGlvbigpIHtcbiAgLypcbiAgIHJlbW92ZSBlcnJvciBmb3IgdGhpcyBub3RhdGlvbjpcbiAgIHNwYW4udGV4dC1pbnB1dC50ZXh0LWlucHV0X2ludmFsaWQubG9naW4tZm9ybV9faW5wdXRcbiAgIGlucHV0LnRleHQtaW5wdXRfX2NvbnRyb2wjcGFzc3dvcmQodHlwZT1cInBhc3N3b3JkXCIsIG5hbWU9XCJwYXNzd29yZFwiKVxuICAgc3Bhbi50ZXh0LWlucHV4dF9fZXJyINCf0LDRgNC+0LvQuCDQvdC1INGB0L7QstC/0LDQtNCw0Y7RglxuICAgKi9cbiAgW10uZm9yRWFjaC5jYWxsKHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dC1pbnB1dF9pbnZhbGlkJyksIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaW5wdXRfaW52YWxpZCcpO1xuICB9KTtcblxuICBbXS5mb3JFYWNoLmNhbGwodGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0LWlucHV0X19lcnInKSwgZnVuY3Rpb24oZWxlbSkge1xuICAgIGVsZW0ucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIC8vIGNsZWFyIGZvcm0td2lkZSBub3RpZmljYXRpb25cbiAgdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5vdGlmaWNhdGlvbl0nKS5pbm5lckhUTUwgPSAnJztcbn07XG5cbkF1dGhNb2RhbC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIHJlcXVlc3QgPSB4aHIob3B0aW9ucyk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgb25FbmQgPSB0aGlzLnN0YXJ0UmVxdWVzdEluZGljYXRpb24oKTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBvbkVuZCk7XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG5BdXRoTW9kYWwucHJvdG90eXBlLnN0YXJ0UmVxdWVzdEluZGljYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cInN1Ym1pdFwiXScpO1xuXG4gIGlmIChzdWJtaXRCdXR0b24pIHtcbiAgICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICAgIGVsZW06ICAgICAgc3VibWl0QnV0dG9uLFxuICAgICAgc2l6ZTogICAgICAnc21hbGwnLFxuICAgICAgY2xhc3M6ICAgICAnc3VibWl0LWJ1dHRvbl9fc3Bpbm5lcicsXG4gICAgICBlbGVtQ2xhc3M6ICdzdWJtaXQtYnV0dG9uX3Byb2dyZXNzJ1xuICAgIH0pO1xuICAgIHNwaW5uZXIuc3RhcnQoKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBvbkVuZCgpIHtcbiAgICBzZWxmLmhpZGVPdmVybGF5KCk7XG4gICAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuc3RvcCgpO1xuICB9O1xuXG59O1xuXG5BdXRoTW9kYWwucHJvdG90eXBlLmluaXRFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG5cbiAgdGhpcy5kZWxlZ2F0ZSgnW2RhdGEtc3dpdGNoPVwicmVnaXN0ZXItZm9ybVwiXScsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRDb250ZW50KGNsaWVudFJlbmRlcihyZWdpc3RlckZvcm0pKTtcbiAgfSk7XG5cbiAgdGhpcy5kZWxlZ2F0ZSgnW2RhdGEtc3dpdGNoPVwibG9naW4tZm9ybVwiXScsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRDb250ZW50KGNsaWVudFJlbmRlcihsb2dpbkZvcm0pKTtcbiAgfSk7XG5cbiAgdGhpcy5kZWxlZ2F0ZSgnW2RhdGEtc3dpdGNoPVwiZm9yZ290LWZvcm1cIl0nLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gbW92ZSBjdXJyZW50bHkgZW50ZXJlZCBlbWFpbCBpbnRvIGZvcmdvdEZvcm1cbiAgICB2YXIgb2xkRW1haWxJbnB1dCA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cImVtYWlsXCJdJyk7XG4gICAgdGhpcy5zZXRDb250ZW50KGNsaWVudFJlbmRlcihmb3Jnb3RGb3JtKSk7XG4gICAgdmFyIG5ld0VtYWlsSW5wdXQgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJlbWFpbFwiXScpO1xuICAgIG5ld0VtYWlsSW5wdXQudmFsdWUgPSBvbGRFbWFpbElucHV0LnZhbHVlO1xuICB9KTtcblxuXG4gIHRoaXMuZGVsZWdhdGUoJ1tkYXRhLWZvcm09XCJsb2dpblwiXScsICdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdWJtaXRMb2dpbkZvcm0oZXZlbnQudGFyZ2V0KTtcbiAgfSk7XG5cblxuICB0aGlzLmRlbGVnYXRlKCdbZGF0YS1mb3JtPVwicmVnaXN0ZXJcIl0nLCAnc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3VibWl0UmVnaXN0ZXJGb3JtKGV2ZW50LnRhcmdldCk7XG4gIH0pO1xuXG4gIHRoaXMuZGVsZWdhdGUoJ1tkYXRhLWZvcm09XCJmb3Jnb3RcIl0nLCAnc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3VibWl0Rm9yZ290Rm9ybShldmVudC50YXJnZXQpO1xuICB9KTtcblxuICB0aGlzLmRlbGVnYXRlKFwiW2RhdGEtcHJvdmlkZXJdXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMub3BlbkF1dGhQb3B1cCgnL2F1dGgvbG9naW4vJyArIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LmRhdGFzZXQucHJvdmlkZXIpO1xuICB9KTtcblxuICB0aGlzLmRlbGVnYXRlKCdbZGF0YS1hY3Rpb24tdmVyaWZ5LWVtYWlsXScsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBwYXlsb2FkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgdmFyIGVtYWlsID0gZXZlbnQuZGVsZWdhdGVUYXJnZXQuZGF0YXNldC5hY3Rpb25WZXJpZnlFbWFpbDtcbiAgICBwYXlsb2FkLmFwcGVuZChcImVtYWlsXCIsIGVtYWlsKTtcblxuICAgIHZhciByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiAgICAnL2F1dGgvcmV2ZXJpZnknLFxuICAgICAgYm9keTogcGF5bG9hZFxuICAgIH0pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgc2VsZi5zaG93Rm9ybU1lc3NhZ2UoYFxuICAgICAgICA8cD7Qn9C40YHRjNC80L4t0L/QvtC00YLQstC10YDQttC00LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4g0LXRidGRINGA0LDQty48L3A+XG4gICAgICAgIDxwPjxhIGhyZWY9JyMnIGRhdGEtYWN0aW9uLXZlcmlmeS1lbWFpbD0nJHtlbWFpbH0nPtC/0LXRgNC10LfQsNC/0YDQvtGB0LjRgtGMINC/0L7QtNGC0LLQtdGA0LbQtNC10L3QuNC1LjwvYT48L3A+XCJcbiAgICAgICAgYCwgJ3N1Y2Nlc3MnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuc2hvd0Zvcm1NZXNzYWdlKGV2ZW50LnJlc3VsdCwgJ2Vycm9yJyk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9KTtcbn07XG5cbkF1dGhNb2RhbC5wcm90b3R5cGUuc3VibWl0UmVnaXN0ZXJGb3JtID0gZnVuY3Rpb24oZm9ybSkge1xuXG4gIHRoaXMuY2xlYXJGb3JtTWVzc2FnZXMoKTtcblxuICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gIGlmICghZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSkge1xuICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgdGhpcy5zaG93SW5wdXRFcnJvcihmb3JtLmVsZW1lbnRzLmVtYWlsLCAn0JLQstC10LTQuNGC0LUsINC/0L7QttCw0LvRg9GB0YLQsCwgZW1haWwuJyk7XG4gIH1cblxuICBpZiAoIWZvcm0uZWxlbWVudHMuZGlzcGxheU5hbWUudmFsdWUpIHtcbiAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0lucHV0RXJyb3IoZm9ybS5lbGVtZW50cy5kaXNwbGF5TmFtZSwgJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPRgdGC0LAsINC40LzRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8uJyk7XG4gIH1cblxuICBpZiAoIWZvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUpIHtcbiAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0lucHV0RXJyb3IoZm9ybS5lbGVtZW50cy5wYXNzd29yZCwgJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPRgdGC0LAsINC/0LDRgNC+0LvRjC4nKTtcbiAgfVxuXG4gIGlmIChoYXNFcnJvcnMpIHJldHVybjtcblxuICB2YXIgcGF5bG9hZCA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgcGF5bG9hZC5hcHBlbmQoXCJzdWNjZXNzUmVkaXJlY3RcIiwgdGhpcy5vcHRpb25zLnN1Y2Nlc3NSZWRpcmVjdCk7XG5cbiAgdmFyIHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogICAgICAgICAgJ1BPU1QnLFxuICAgIHVybDogICAgICAgICAgICAgJy9hdXRoL3JlZ2lzdGVyJyxcbiAgICBub3JtYWxTdGF0dXNlczogWzIwMSwgNDAwXSxcbiAgICBib2R5OiBwYXlsb2FkXG4gIH0pO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDEpIHtcbiAgICAgIHNlbGYuc2V0Q29udGVudChjbGllbnRSZW5kZXIobG9naW5Gb3JtKSk7XG4gICAgICBzZWxmLnNob3dGb3JtTWVzc2FnZShcbiAgICAgICAgICBcIjxwPtChINCw0LTRgNC10YHQsCBub3RpZnlAamF2YXNjcmlwdC5ydSDQvtGC0L/RgNCw0LLQu9C10L3QviDQv9C40YHRjNC80L4g0YHQviDRgdGB0YvQu9C60L7QuS3Qv9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtdC8LjwvcD5cIiArXG4gICAgICAgICAgXCI8cD48YSBocmVmPScjJyBkYXRhLWFjdGlvbi12ZXJpZnktZW1haWw9J1wiICsgZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSArIFwiJz7Qv9C10YDQtdC30LDQv9GA0L7RgdC40YLRjCDQv9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtS48L2E+PC9wPlwiLFxuICAgICAgICAnc3VjY2VzcydcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdHVzID09IDQwMCkge1xuICAgICAgZGVidWdnZXI7XG4gICAgICBmb3IgKHZhciBmaWVsZCBpbiBldmVudC5yZXN1bHQuZXJyb3JzKSB7XG4gICAgICAgIHNlbGYuc2hvd0lucHV0RXJyb3IoZm9ybS5lbGVtZW50c1tmaWVsZF0sIGV2ZW50LnJlc3VsdC5lcnJvcnNbZmllbGRdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZWxmLnNob3dGb3JtTWVzc2FnZShcItCd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0YHRgtCw0YLRg9GBINC+0YLQstC10YLQsCDRgdC10YDQstC10YDQsFwiLCAnZXJyb3InKTtcbiAgfSk7XG5cbn07XG5cblxuQXV0aE1vZGFsLnByb3RvdHlwZS5zdWJtaXRGb3Jnb3RGb3JtID0gZnVuY3Rpb24oZm9ybSkge1xuXG4gIHRoaXMuY2xlYXJGb3JtTWVzc2FnZXMoKTtcblxuICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gIGlmICghZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZSkge1xuICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgdGhpcy5zaG93SW5wdXRFcnJvcihmb3JtLmVsZW1lbnRzLmVtYWlsLCAn0JLQstC10LTQuNGC0LUsINC/0L7QttCw0LvRg9GB0YLQsCwgZW1haWwuJyk7XG4gIH1cblxuICBpZiAoaGFzRXJyb3JzKSByZXR1cm47XG5cbiAgdmFyIHBheWxvYWQgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gIHBheWxvYWQuYXBwZW5kKFwic3VjY2Vzc1JlZGlyZWN0XCIsIHRoaXMub3B0aW9ucy5zdWNjZXNzUmVkaXJlY3QpO1xuXG4gIHZhciByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICAgICcvYXV0aC9mb3Jnb3QnLFxuICAgIG5vcm1hbFN0YXR1c2VzOiBbMjAwLCA0MDRdLFxuICAgIGJvZHk6IHBheWxvYWRcbiAgfSk7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgc2VsZi5zZXRDb250ZW50KGNsaWVudFJlbmRlcihsb2dpbkZvcm0pKTtcbiAgICAgIHNlbGYuc2hvd0Zvcm1NZXNzYWdlKGV2ZW50LnJlc3VsdCwgJ3N1Y2Nlc3MnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDQwNCkge1xuICAgICAgc2VsZi5zaG93Rm9ybU1lc3NhZ2UoZXZlbnQucmVzdWx0LCAnZXJyb3InKTtcbiAgICB9XG4gIH0pO1xuXG59O1xuXG5cbkF1dGhNb2RhbC5wcm90b3R5cGUuc2hvd0lucHV0RXJyb3IgPSBmdW5jdGlvbihpbnB1dCwgZXJyb3IpIHtcbiAgaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd0ZXh0LWlucHV0X2ludmFsaWQnKTtcbiAgdmFyIGVycm9yU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZXJyb3JTcGFuLmNsYXNzTmFtZSA9ICd0ZXh0LWlucHV0X19lcnInO1xuICBlcnJvclNwYW4uaW5uZXJIVE1MID0gZXJyb3I7XG4gIGlucHV0LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZXJyb3JTcGFuKTtcbn07XG5cbkF1dGhNb2RhbC5wcm90b3R5cGUuc2hvd0Zvcm1NZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSkge1xuICBpZiAobWVzc2FnZS5pbmRleE9mKCc8cD4nKSAhPT0gMCkge1xuICAgIG1lc3NhZ2UgPSAnPHA+JyArIG1lc3NhZ2UgKyAnPC9wPic7XG4gIH1cblxuICBpZiAoWydpbmZvJywgJ2Vycm9yJywgJ3dhcm5pbmcnLCAnc3VjY2VzcyddLmluZGV4T2YodHlwZSkgPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCB0eXBlOiBcIiArIHR5cGUpO1xuICB9XG5cbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuY2xhc3NOYW1lID0gJ2xvZ2luLWZvcm1fXycgKyB0eXBlO1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gbWVzc2FnZTtcblxuICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtbm90aWZpY2F0aW9uXScpLmlubmVySFRNTCA9ICcnO1xuICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtbm90aWZpY2F0aW9uXScpLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG59O1xuXG5BdXRoTW9kYWwucHJvdG90eXBlLnN1Ym1pdExvZ2luRm9ybSA9IGZ1bmN0aW9uKGZvcm0pIHtcblxuICB0aGlzLmNsZWFyRm9ybU1lc3NhZ2VzKCk7XG5cbiAgdmFyIGhhc0Vycm9ycyA9IGZhbHNlO1xuICBpZiAoIWZvcm0uZWxlbWVudHMubG9naW4udmFsdWUpIHtcbiAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0lucHV0RXJyb3IoZm9ybS5lbGVtZW50cy5sb2dpbiwgJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPRgdGC0LAsINC40LzRjyDQuNC70LggZW1haWwuJyk7XG4gIH1cblxuICBpZiAoIWZvcm0uZWxlbWVudHMucGFzc3dvcmQudmFsdWUpIHtcbiAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgIHRoaXMuc2hvd0lucHV0RXJyb3IoZm9ybS5lbGVtZW50cy5wYXNzd29yZCwgJ9CS0LLQtdC00LjRgtC1LCDQv9C+0LbQsNC70YPRgdGC0LAsINC/0LDRgNC+0LvRjC4nKTtcbiAgfVxuXG4gIGlmIChoYXNFcnJvcnMpIHJldHVybjtcblxuICB2YXIgcmVxdWVzdCA9IHRoaXMucmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAgICAnL2F1dGgvbG9naW4vbG9jYWwnLFxuICAgIG5vcm1hbFN0YXR1c2VzOiBbMjAwLCA0MDFdLFxuICAgIGJvZHk6IG5ldyBGb3JtRGF0YShmb3JtKVxuICB9KTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICBpZiAodGhpcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICBzZWxmLm9uQXV0aEZhaWx1cmUoZXZlbnQucmVzdWx0Lm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYub25BdXRoU3VjY2VzcyhldmVudC5yZXN1bHQudXNlcik7XG4gIH0pO1xuXG59O1xuXG5BdXRoTW9kYWwucHJvdG90eXBlLm9wZW5BdXRoUG9wdXAgPSBmdW5jdGlvbih1cmwpIHtcbiAgaWYgKHRoaXMuYXV0aFBvcHVwICYmICF0aGlzLmF1dGhQb3B1cC5jbG9zZWQpIHtcbiAgICB0aGlzLmF1dGhQb3B1cC5jbG9zZSgpOyAvLyBjbG9zZSBvbGQgcG9wdXAgaWYgYW55XG4gIH1cbiAgdmFyIHdpZHRoID0gODAwLCBoZWlnaHQgPSA2MDA7XG4gIHZhciB0b3AgPSAod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gIHZhciBsZWZ0ID0gKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMjtcbiAgd2luZG93LmF1dGhNb2RhbCA9IHRoaXM7XG4gIHRoaXMuYXV0aFBvcHVwID0gd2luZG93Lm9wZW4odXJsLCAnYXV0aE1vZGFsJywgJ3dpZHRoPScgKyB3aWR0aCArICcsaGVpZ2h0PScgKyBoZWlnaHQgKyAnLHNjcm9sbGJhcnM9MCx0b3A9JyArIHRvcCArICcsbGVmdD0nICsgbGVmdCk7XG59O1xuXG4vKlxuINCy0YHQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4INCw0LLRgtC+0YDQuNC30LDRhtC40LggKNCy0LrQu9GO0YfQsNGPIEZhY2Vib29rINC40LcgcG9wdXAt0LAg0Lgg0LvQvtC60LDQu9GM0L3Ri9C5KVxuINCyINC40YLQvtCz0LUg0YLRgNC40LPQs9C10YDRj9GCINC+0LTQuNC9INC40Lcg0Y3RgtC40YUg0LrQsNC70LvQsdGN0LrQvtCyXG4gKi9cbkF1dGhNb2RhbC5wcm90b3R5cGUub25BdXRoU3VjY2VzcyA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgd2luZG93LmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgdGhpcy5vcHRpb25zLmNhbGxiYWNrKCk7XG59O1xuXG5cbkF1dGhNb2RhbC5wcm90b3R5cGUub25BdXRoRmFpbHVyZSA9IGZ1bmN0aW9uKGVycm9yTWVzc2FnZSkge1xuICB0aGlzLnNob3dGb3JtTWVzc2FnZShlcnJvck1lc3NhZ2UgfHwgXCLQntGC0LrQsNC3INCyINCw0LLRgtC+0YDQuNC30LDRhtC40LguXCIsICdlcnJvcicpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dGhNb2RhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvYXV0aC9jbGllbnQvYXV0aE1vZGFsLmpzXG4gKiovIiwidmFyIGJlbSA9IHJlcXVpcmUoJ2JlbS1qYWRlJykoKTtcbnZhciB0aHVtYiA9IHJlcXVpcmUoJ2NsaWVudC9pbWFnZScpLnRodW1iO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBsb2NhbHMpIHtcbiAgbG9jYWxzID0gbG9jYWxzID8gT2JqZWN0LmNyZWF0ZShsb2NhbHMpIDoge307XG4gIGFkZFN0YW5kYXJkSGVscGVycyhsb2NhbHMpO1xuXG4gIHJldHVybiB0ZW1wbGF0ZShsb2NhbHMpO1xufTtcblxuZnVuY3Rpb24gYWRkU3RhbmRhcmRIZWxwZXJzKGxvY2Fscykge1xuICBsb2NhbHMuYmVtID0gYmVtO1xuXG4gIGxvY2Fscy50aHVtYiA9IHRodW1iO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9jbGllbnRSZW5kZXIuanNcbiAqKi8iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCIvcm9vdC9qYXZhc2NyaXB0LW5vZGVqcy9ub2RlX21vZHVsZXMvamFkZS9saWIvcnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGJlbSkge1xuYnVmLnB1c2goXCJcIik7XG52YXIgYmVtX2NoYWluID0gW107XG52YXIgYmVtX2NoYWluX2NvbnRleHRzID0gWydibG9jayddO1xuamFkZV9taXhpbnNbXCJiXCJdID0gZnVuY3Rpb24odGFnLCBpc0VsZW1lbnQsIG5vQmxvY2tDbGFzcyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5iZW0uY2FsbCh0aGlzLCBidWYsIGJlbV9jaGFpbiwgYmVtX2NoYWluX2NvbnRleHRzLCB0YWcsIGlzRWxlbWVudCwgbm9CbG9ja0NsYXNzKVxufTtcblxuXG5cblxuXG5cblxuXG5cbmphZGVfbWl4aW5zW1wiZVwiXSA9IGZ1bmN0aW9uKHRhZyl7XG52YXIgYmxvY2sgPSAodGhpcyAmJiB0aGlzLmJsb2NrKSwgYXR0cmlidXRlcyA9ICh0aGlzICYmIHRoaXMuYXR0cmlidXRlcykgfHwge307XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJsb2NrICYmIGJsb2NrKCk7XG59LFxuYXR0cmlidXRlczogamFkZS5tZXJnZShbYXR0cmlidXRlc10pXG59LCB0YWcsIHRydWUpO1xufTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5hdHRyaWJ1dGVzOiB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsXCJ0aXRsZVwiOiBcItC30LDQutGA0YvRgtGMXCIsXCJjbGFzc1wiOiBcImNsb3NlLWJ1dHRvbiBfX2Nsb3NlXCJ9XG59LCAnYnV0dG9uJyk7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQktGF0L7QtCDQsiDRgdC40YHRgtC10LzRg1wiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInRpdGxlXCJ9XG59LCAnaDQnKTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItGA0LXQs9C40YHRgtGA0LDRhtC40Y9cIik7XG59LFxuYXR0cmlidXRlczoge1widHlwZVwiOiBcImJ1dHRvblwiLFwiZGF0YS1zd2l0Y2hcIjogXCJyZWdpc3Rlci1mb3JtXCIsXCJjbGFzc1wiOiBcImJ1dHRvbi1saW5rIF9fcmVnaXN0ZXJcIn1cbn0sICdidXR0b24nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImhlYWRlci1hc2lkZVwifVxufSk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lIF9faGVhZGVyXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImRhdGEtbm90aWZpY2F0aW9uXCI6IHRydWUsXCJjbGFzc1wiOiBcImxpbmUgX19ub3RpZmljYXRpb25cIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiRW1haWw6XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImZvclwiOiBcImxvZ2luXCIsXCJjbGFzc1wiOiBcImxhYmVsXCJ9XG59LCAnbGFiZWwnKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYXR0cmlidXRlczoge1wiaWRcIjogXCJsb2dpblwiLFwibmFtZVwiOiBcImxvZ2luXCIsXCJ0eXBlXCI6IFwiZW1haWxcIixcImF1dG9mb2N1c1wiOiB0cnVlLFwiY2xhc3NcIjogXCJjb250cm9sXCJ9XG59LCAnaW5wdXQnKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInRleHQtaW5wdXQgX19pbnB1dFwifVxufSwgJ3NwYW4nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmVcIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0J/QsNGA0L7Qu9GMOlwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJmb3JcIjogXCJwYXNzd29yZFwiLFwiY2xhc3NcIjogXCJsYWJlbFwifVxufSwgJ2xhYmVsJyk7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImlkXCI6IFwicGFzc3dvcmRcIixcInR5cGVcIjogXCJwYXNzd29yZFwiLFwibmFtZVwiOiBcInBhc3N3b3JkXCIsXCJjbGFzc1wiOiBcImNvbnRyb2xcIn1cbn0sICdpbnB1dCcpO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCX0LDQsdGL0LvQuD9cIik7XG59LFxuYXR0cmlidXRlczoge1widHlwZVwiOiBcImJ1dHRvblwiLFwiZGF0YS1zd2l0Y2hcIjogXCJmb3Jnb3QtZm9ybVwiLFwiY2xhc3NcIjogXCJhc2lkZSBfX2ZvcmdvdCBfX2J1dHRvbi1saW5rXCJ9XG59LCAnYnV0dG9uJyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0ZXh0LWlucHV0IF93aXRoLWFzaWRlIF9faW5wdXRcIn1cbn0sICdzcGFuJyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0JLQvtC50YLQuFwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInRleHRcIn1cbn0sICdzcGFuJyk7XG59LFxuYXR0cmlidXRlczoge1widHlwZVwiOiBcInN1Ym1pdFwiLFwiY2xhc3NcIjogXCJzdWJtaXQtYnV0dG9uIF9zbWFsbCBfX3N1Ym1pdFwifVxufSwgJ2J1dHRvbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwibGluZSBfX2Zvb3RlclwifVxufSk7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQktGF0L7QtCDRh9C10YDQtdC3INGB0L7RhtC40LDQu9GM0L3Ri9C1INGB0LXRgtC4XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwic29jaWFsLWxvZ2lucy10aXRsZVwifVxufSwgJ2g1Jyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiRmFjZWJvb2tcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcImZhY2Vib29rXCIsXCJjbGFzc1wiOiBcInNvY2lhbC1sb2dpbiBfZmFjZWJvb2sgX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCJHb29nbGUrXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtcHJvdmlkZXJcIjogXCJnb29nbGVcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF9nb29nbGUgX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQktC60L7QvdGC0LDQutGC0LVcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcInZrb250YWt0ZVwiLFwiY2xhc3NcIjogXCJzb2NpYWwtbG9naW4gX3Zrb250YWt0ZSBfX3NvY2lhbC1sb2dpblwifVxufSwgJ2J1dHRvbicpO1xuYnVmLnB1c2goXCIgXCIpO1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIkdpdGh1YlwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJkYXRhLXByb3ZpZGVyXCI6IFwiZ2l0aHViXCIsXCJjbGFzc1wiOiBcInNvY2lhbC1sb2dpbiBfZ2l0aHViIF9fc29jaWFsLWxvZ2luXCJ9XG59LCAnYnV0dG9uJyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0K/QvdC00LXQutGBXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtcHJvdmlkZXJcIjogXCJ5YW5kZXhcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF95YW5kZXggX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmUgX19zb2NpYWwtbG9naW5zXCJ9XG59KTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJhY3Rpb25cIjogXCIjXCIsXCJjbGFzc1wiOiBcImZvcm1cIn1cbn0sICdmb3JtJyk7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1mb3JtXCI6IFwibG9naW5cIixcImNsYXNzXCI6IFwibG9naW4tZm9ybVwifVxufSk7fS5jYWxsKHRoaXMsXCJiZW1cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmJlbTp0eXBlb2YgYmVtIT09XCJ1bmRlZmluZWRcIj9iZW06dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaGFuZGxlcnMvYXV0aC90ZW1wbGF0ZXMvbG9naW4tZm9ybS5qYWRlXG4gKiogbW9kdWxlIGlkID0gNzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gOVxuICoqLyIsInZhciBqYWRlID0gcmVxdWlyZShcIi9yb290L2phdmFzY3JpcHQtbm9kZWpzL25vZGVfbW9kdWxlcy9qYWRlL2xpYi9ydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYmVtKSB7XG5idWYucHVzaChcIlwiKTtcbnZhciBiZW1fY2hhaW4gPSBbXTtcbnZhciBiZW1fY2hhaW5fY29udGV4dHMgPSBbJ2Jsb2NrJ107XG5qYWRlX21peGluc1tcImJcIl0gPSBmdW5jdGlvbih0YWcsIGlzRWxlbWVudCwgbm9CbG9ja0NsYXNzKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmJlbS5jYWxsKHRoaXMsIGJ1ZiwgYmVtX2NoYWluLCBiZW1fY2hhaW5fY29udGV4dHMsIHRhZywgaXNFbGVtZW50LCBub0Jsb2NrQ2xhc3MpXG59O1xuXG5cblxuXG5cblxuXG5cblxuamFkZV9taXhpbnNbXCJlXCJdID0gZnVuY3Rpb24odGFnKXtcbnZhciBibG9jayA9ICh0aGlzICYmIHRoaXMuYmxvY2spLCBhdHRyaWJ1dGVzID0gKHRoaXMgJiYgdGhpcy5hdHRyaWJ1dGVzKSB8fCB7fTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYmxvY2sgJiYgYmxvY2soKTtcbn0sXG5hdHRyaWJ1dGVzOiBqYWRlLm1lcmdlKFthdHRyaWJ1dGVzXSlcbn0sIHRhZywgdHJ1ZSk7XG59O1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcInR5cGVcIjogXCJidXR0b25cIixcInRpdGxlXCI6IFwi0LfQsNC60YDRi9GC0YxcIixcImNsYXNzXCI6IFwiY2xvc2UtYnV0dG9uIF9fY2xvc2VcIn1cbn0sICdidXR0b24nKTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCg0LXQs9C40YHRgtGA0LDRhtC40Y9cIik7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0aXRsZVwifVxufSwgJ2g0Jyk7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQstGF0L7QtFwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJ0eXBlXCI6IFwiYnV0dG9uXCIsXCJkYXRhLXN3aXRjaFwiOiBcImxvZ2luLWZvcm1cIixcImNsYXNzXCI6IFwiYnV0dG9uLWxpbmtcIn1cbn0sICdidXR0b24nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImhlYWRlci1hc2lkZVwifVxufSk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lIF9faGVhZGVyXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImRhdGEtbm90aWZpY2F0aW9uXCI6IHRydWUsXCJjbGFzc1wiOiBcImxpbmUgX19ub3RpZmljYXRpb25cIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiRW1haWw6XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImZvclwiOiBcInJlZ2lzdGVyLWVtYWlsXCIsXCJjbGFzc1wiOiBcImxhYmVsXCJ9XG59LCAnbGFiZWwnKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYXR0cmlidXRlczoge1wiaWRcIjogXCJyZWdpc3Rlci1lbWFpbFwiLFwibmFtZVwiOiBcImVtYWlsXCIsXCJ0eXBlXCI6IFwiZW1haWxcIixcInJlcXVpcmVkXCI6IHRydWUsXCJhdXRvZm9jdXNcIjogdHJ1ZSxcImNsYXNzXCI6IFwiY29udHJvbFwifVxufSwgJ2lucHV0Jyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0ZXh0LWlucHV0IF9faW5wdXRcIn1cbn0sICdzcGFuJyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCY0LzRjyDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y86XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImZvclwiOiBcInJlZ2lzdGVyLWRpc3BsYXlOYW1lXCIsXCJjbGFzc1wiOiBcImxhYmVsXCJ9XG59LCAnbGFiZWwnKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYXR0cmlidXRlczoge1wiaWRcIjogXCJyZWdpc3Rlci1kaXNwbGF5TmFtZVwiLFwibmFtZVwiOiBcImRpc3BsYXlOYW1lXCIsXCJyZXF1aXJlZFwiOiB0cnVlLFwiY2xhc3NcIjogXCJjb250cm9sXCJ9XG59LCAnaW5wdXQnKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInRleHQtaW5wdXQgX19pbnB1dFwifVxufSwgJ3NwYW4nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmVcIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0J/QsNGA0L7Qu9GMOlwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJmb3JcIjogXCJyZWdpc3Rlci1wYXNzd29yZFwiLFwiY2xhc3NcIjogXCJsYWJlbFwifVxufSwgJ2xhYmVsJyk7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImlkXCI6IFwicmVnaXN0ZXItcGFzc3dvcmRcIixcInR5cGVcIjogXCJwYXNzd29yZFwiLFwibmFtZVwiOiBcInBhc3N3b3JkXCIsXCJyZXF1aXJlZFwiOiB0cnVlLFwiY2xhc3NcIjogXCJjb250cm9sXCJ9XG59LCAnaW5wdXQnKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInRleHQtaW5wdXQgX19pbnB1dFwifVxufSwgJ3NwYW4nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmVcIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y9cIik7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0ZXh0XCJ9XG59LCAnc3BhbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcInR5cGVcIjogXCJzdWJtaXRcIixcImNsYXNzXCI6IFwic3VibWl0LWJ1dHRvbiBfc21hbGwgc3VibWl0XCJ9XG59LCAnYnV0dG9uJyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lIF9fZm9vdGVyXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCS0YXQvtC0INGH0LXRgNC10Lcg0YHQvtGG0LjQsNC70YzQvdGL0LUg0YHQtdGC0LhcIik7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJzb2NpYWwtbG9naW5zLXRpdGxlXCJ9XG59LCAnaDUnKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCJGYWNlYm9va1wiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJkYXRhLXByb3ZpZGVyXCI6IFwiZmFjZWJvb2tcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF9mYWNlYm9vayBfX3NvY2lhbC1sb2dpblwifVxufSwgJ2J1dHRvbicpO1xuYnVmLnB1c2goXCIgXCIpO1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIkdvb2dsZStcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcImdvb2dsZVwiLFwiY2xhc3NcIjogXCJzb2NpYWwtbG9naW4gX2dvb2dsZSBfX3NvY2lhbC1sb2dpblwifVxufSwgJ2J1dHRvbicpO1xuYnVmLnB1c2goXCIgXCIpO1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCS0LrQvtC90YLQsNC60YLQtVwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJkYXRhLXByb3ZpZGVyXCI6IFwidmtvbnRha3RlXCIsXCJjbGFzc1wiOiBcInNvY2lhbC1sb2dpbiBfdmtvbnRha3RlIF9fc29jaWFsLWxvZ2luXCJ9XG59LCAnYnV0dG9uJyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiR2l0aHViXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtcHJvdmlkZXJcIjogXCJnaXRodWJcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF9naXRodWIgX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQr9C90LTQtdC60YFcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcInlhbmRleFwiLFwiY2xhc3NcIjogXCJzb2NpYWwtbG9naW4gX3lhbmRleCBfX3NvY2lhbC1sb2dpblwifVxufSwgJ2J1dHRvbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwibGluZSBfX3NvY2lhbC1sb2dpbnNcIn1cbn0pO1xufSxcbmF0dHJpYnV0ZXM6IHtcImFjdGlvblwiOiBcIiNcIixcImRhdGEtZm9ybVwiOiBcInJlZ2lzdGVyXCIsXCJjbGFzc1wiOiBcImZvcm1cIn1cbn0sICdmb3JtJyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsb2dpbi1mb3JtXCJ9XG59KTt9LmNhbGwodGhpcyxcImJlbVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYmVtOnR5cGVvZiBiZW0hPT1cInVuZGVmaW5lZFwiP2JlbTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9oYW5kbGVycy9hdXRoL3RlbXBsYXRlcy9yZWdpc3Rlci1mb3JtLmphZGVcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSA5XG4gKiovIiwidmFyIGphZGUgPSByZXF1aXJlKFwiL3Jvb3QvamF2YXNjcmlwdC1ub2RlanMvbm9kZV9tb2R1bGVzL2phZGUvbGliL3J1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChiZW0pIHtcbmJ1Zi5wdXNoKFwiXCIpO1xudmFyIGJlbV9jaGFpbiA9IFtdO1xudmFyIGJlbV9jaGFpbl9jb250ZXh0cyA9IFsnYmxvY2snXTtcbmphZGVfbWl4aW5zW1wiYlwiXSA9IGZ1bmN0aW9uKHRhZywgaXNFbGVtZW50LCBub0Jsb2NrQ2xhc3Mpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuYmVtLmNhbGwodGhpcywgYnVmLCBiZW1fY2hhaW4sIGJlbV9jaGFpbl9jb250ZXh0cywgdGFnLCBpc0VsZW1lbnQsIG5vQmxvY2tDbGFzcylcbn07XG5cblxuXG5cblxuXG5cblxuXG5qYWRlX21peGluc1tcImVcIl0gPSBmdW5jdGlvbih0YWcpe1xudmFyIGJsb2NrID0gKHRoaXMgJiYgdGhpcy5ibG9jayksIGF0dHJpYnV0ZXMgPSAodGhpcyAmJiB0aGlzLmF0dHJpYnV0ZXMpIHx8IHt9O1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5ibG9jayAmJiBibG9jaygpO1xufSxcbmF0dHJpYnV0ZXM6IGphZGUubWVyZ2UoW2F0dHJpYnV0ZXNdKVxufSwgdGFnLCB0cnVlKTtcbn07XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYXR0cmlidXRlczoge1widHlwZVwiOiBcImJ1dHRvblwiLFwidGl0bGVcIjogXCLQt9Cw0LrRgNGL0YLRjFwiLFwiY2xhc3NcIjogXCJjbG9zZS1idXR0b24gX19jbG9zZVwifVxufSwgJ2J1dHRvbicpO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0JLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtSDQv9Cw0YDQvtC70Y9cIik7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0aXRsZVwifVxufSwgJ2g0Jyk7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJsaW5lIF9faGVhZGVyXCJ9XG59KTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImRhdGEtbm90aWZpY2F0aW9uXCI6IHRydWUsXCJjbGFzc1wiOiBcImxpbmUgX19ub3RpZmljYXRpb25cIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiRW1haWw6XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImZvclwiOiBcImZvcmdvdC1lbWFpbFwiLFwiY2xhc3NcIjogXCJsYWJlbFwifVxufSwgJ2xhYmVsJyk7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmF0dHJpYnV0ZXM6IHtcImlkXCI6IFwiZm9yZ290LWVtYWlsXCIsXCJuYW1lXCI6IFwiZW1haWxcIixcInR5cGVcIjogXCJlbWFpbFwiLFwiYXV0b2ZvY3VzXCI6IHRydWUsXCJjbGFzc1wiOiBcImNvbnRyb2xcIn1cbn0sICdpbnB1dCcpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwidGV4dC1pbnB1dCBfX2lucHV0XCJ9XG59LCAnc3BhbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwibGluZVwifVxufSk7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcItCS0L7RgdGB0YLQsNC90L7QstC40YLRjCDQv9Cw0YDQvtC70YxcIik7XG59LFxuYXR0cmlidXRlczoge1wiY2xhc3NcIjogXCJ0ZXh0XCJ9XG59LCAnc3BhbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcInR5cGVcIjogXCJzdWJtaXRcIixcImNsYXNzXCI6IFwic3VibWl0LWJ1dHRvbiBfc21hbGwgX19zdWJtaXRcIn1cbn0sICdidXR0b24nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmVcIn1cbn0pO1xuamFkZV9taXhpbnNbXCJlXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0JLRhdC+0LRcIik7XG59LFxuYXR0cmlidXRlczoge1widHlwZVwiOiBcImJ1dHRvblwiLFwiZGF0YS1zd2l0Y2hcIjogXCJsb2dpbi1mb3JtXCIsXCJjbGFzc1wiOiBcImJ1dHRvbi1saW5rXCJ9XG59LCAnYnV0dG9uJyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiL1wiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcInNlcGFyYXRvclwifVxufSwgJ3NwYW4nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQoNC10LPQuNGB0YLRgNCw0YbQuNGPXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtc3dpdGNoXCI6IFwicmVnaXN0ZXItZm9ybVwiLFwiY2xhc3NcIjogXCJidXR0b24tbGlua1wifVxufSwgJ2J1dHRvbicpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwibGluZSBfX2Zvb3RlclwifVxufSk7XG5qYWRlX21peGluc1tcImVcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmphZGVfbWl4aW5zW1wiZVwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQktGF0L7QtCDRh9C10YDQtdC3INGB0L7RhtC40LDQu9GM0L3Ri9C1INGB0LXRgtC4XCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImNsYXNzXCI6IFwic29jaWFsLWxvZ2lucy10aXRsZVwifVxufSwgJ2g1Jyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwiRmFjZWJvb2tcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcImZhY2Vib29rXCIsXCJjbGFzc1wiOiBcInNvY2lhbC1sb2dpbiBfZmFjZWJvb2sgX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCJHb29nbGUrXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtcHJvdmlkZXJcIjogXCJnb29nbGVcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF9nb29nbGUgX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbmJ1Zi5wdXNoKFwiIFwiKTtcbmphZGVfbWl4aW5zW1wiYlwiXS5jYWxsKHtcbmJsb2NrOiBmdW5jdGlvbigpe1xuYnVmLnB1c2goXCLQktC60L7QvdGC0LDQutGC0LVcIik7XG59LFxuYXR0cmlidXRlczoge1wiZGF0YS1wcm92aWRlclwiOiBcInZrb250YWt0ZVwiLFwiY2xhc3NcIjogXCJzb2NpYWwtbG9naW4gX3Zrb250YWt0ZSBfX3NvY2lhbC1sb2dpblwifVxufSwgJ2J1dHRvbicpO1xuYnVmLnB1c2goXCIgXCIpO1xuamFkZV9taXhpbnNbXCJiXCJdLmNhbGwoe1xuYmxvY2s6IGZ1bmN0aW9uKCl7XG5idWYucHVzaChcIkdpdGh1YlwiKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJkYXRhLXByb3ZpZGVyXCI6IFwiZ2l0aHViXCIsXCJjbGFzc1wiOiBcInNvY2lhbC1sb2dpbiBfZ2l0aHViIF9fc29jaWFsLWxvZ2luXCJ9XG59LCAnYnV0dG9uJyk7XG5idWYucHVzaChcIiBcIik7XG5qYWRlX21peGluc1tcImJcIl0uY2FsbCh7XG5ibG9jazogZnVuY3Rpb24oKXtcbmJ1Zi5wdXNoKFwi0K/QvdC00LXQutGBXCIpO1xufSxcbmF0dHJpYnV0ZXM6IHtcImRhdGEtcHJvdmlkZXJcIjogXCJ5YW5kZXhcIixcImNsYXNzXCI6IFwic29jaWFsLWxvZ2luIF95YW5kZXggX19zb2NpYWwtbG9naW5cIn1cbn0sICdidXR0b24nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxpbmUgX19zb2NpYWwtbG9naW5zXCJ9XG59KTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJhY3Rpb25cIjogXCIjXCIsXCJkYXRhLWZvcm1cIjogXCJmb3Jnb3RcIixcImNsYXNzXCI6IFwiZm9ybVwifVxufSwgJ2Zvcm0nKTtcbn0sXG5hdHRyaWJ1dGVzOiB7XCJjbGFzc1wiOiBcImxvZ2luLWZvcm1cIn1cbn0pO30uY2FsbCh0aGlzLFwiYmVtXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5iZW06dHlwZW9mIGJlbSE9PVwidW5kZWZpbmVkXCI/YmVtOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2hhbmRsZXJzL2F1dGgvdGVtcGxhdGVzL2ZvcmdvdC1mb3JtLmphZGVcbiAqKiBtb2R1bGUgaWQgPSA4MVxuICoqIG1vZHVsZSBjaHVua3MgPSA5XG4gKiovIiwiLy8gQWRhcHRlZCBmcm9tIGJlbXRvLmphZGUsIGNvcHlyaWdodChjKSAyMDEyIFJvbWFuIEtvbWFyb3YgPGtpenVAa2l6dS5ydT5cblxuLyoganNoaW50IC1XMTA2ICovXG5cbnZhciBqYWRlID0gcmVxdWlyZSgnamFkZS9saWIvcnVudGltZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG5cbiAgc2V0dGluZ3MucHJlZml4ID0gc2V0dGluZ3MucHJlZml4IHx8ICcnO1xuICBzZXR0aW5ncy5lbGVtZW50ID0gc2V0dGluZ3MuZWxlbWVudCB8fCAnX18nO1xuICBzZXR0aW5ncy5tb2RpZmllciA9IHNldHRpbmdzLm1vZGlmaWVyIHx8ICdfJztcbiAgc2V0dGluZ3MuZGVmYXVsdF90YWcgPSBzZXR0aW5ncy5kZWZhdWx0X3RhZyB8fCAnZGl2JztcblxuICByZXR1cm4gZnVuY3Rpb24oYnVmLCBiZW1fY2hhaW4sIGJlbV9jaGFpbl9jb250ZXh0cywgdGFnLCBpc0VsZW1lbnQpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwiLS0+XCIsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGJsb2NrID0gdGhpcy5ibG9jaztcbiAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcyB8fCB7fTtcblxuICAgIC8vIFJld3JpdGluZyB0aGUgY2xhc3MgZm9yIGVsZW1lbnRzIGFuZCBtb2RpZmllcnNcbiAgICBpZiAoYXR0cmlidXRlcy5jbGFzcykge1xuICAgICAgdmFyIGJlbV9jbGFzc2VzID0gYXR0cmlidXRlcy5jbGFzcztcblxuICAgICAgaWYgKGJlbV9jbGFzc2VzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgYmVtX2NsYXNzZXMgPSBiZW1fY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICB9XG4gICAgICBiZW1fY2xhc3NlcyA9IGJlbV9jbGFzc2VzLnNwbGl0KCcgJyk7XG5cbiAgICAgIHZhciBiZW1fYmxvY2s7XG4gICAgICB0cnkge1xuICAgICAgICBiZW1fYmxvY2sgPSBiZW1fY2xhc3Nlc1swXS5tYXRjaChuZXcgUmVnRXhwKCdeKCgoPyEnICsgc2V0dGluZ3MuZWxlbWVudCArICd8JyArIHNldHRpbmdzLm1vZGlmaWVyICsgJykuKSspJykpWzFdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgYmVtIGNsYXNzOiBcIiArIGJlbV9jbGFzc2VzWzBdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0VsZW1lbnQpIHtcbiAgICAgICAgYmVtX2NoYWluW2JlbV9jaGFpbi5sZW5ndGhdID0gYmVtX2Jsb2NrO1xuICAgICAgICBiZW1fY2xhc3Nlc1swXSA9IGJlbV9jbGFzc2VzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmVtX2NsYXNzZXNbMF0gPSBiZW1fY2hhaW5bYmVtX2NoYWluLmxlbmd0aCAtIDFdICsgc2V0dGluZ3MuZWxlbWVudCArIGJlbV9jbGFzc2VzWzBdO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudF9ibG9jayA9IChpc0VsZW1lbnQgPyBiZW1fY2hhaW5bYmVtX2NoYWluLmxlbmd0aCAtIDFdICsgc2V0dGluZ3MuZWxlbWVudCA6ICcnKSArIGJlbV9ibG9jaztcblxuICAgICAgLy8gQWRkaW5nIHRoZSBibG9jayBpZiB0aGVyZSBpcyBvbmx5IG1vZGlmaWVyIGFuZC9vciBlbGVtZW50XG4gICAgICBpZiAoYmVtX2NsYXNzZXMuaW5kZXhPZihjdXJyZW50X2Jsb2NrKSA9PT0gLTEpIHtcbiAgICAgICAgYmVtX2NsYXNzZXNbYmVtX2NsYXNzZXMubGVuZ3RoXSA9IGN1cnJlbnRfYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmVtX2NsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtsYXNzID0gYmVtX2NsYXNzZXNbaV07XG5cbiAgICAgICAgaWYgKGtsYXNzLm1hdGNoKG5ldyBSZWdFeHAoJ14oPyEnICsgc2V0dGluZ3MuZWxlbWVudCArICcpJyArIHNldHRpbmdzLm1vZGlmaWVyKSkpIHtcbiAgICAgICAgICAvLyBFeHBhbmRpbmcgdGhlIG1vZGlmaWVyc1xuICAgICAgICAgIGJlbV9jbGFzc2VzW2ldID0gY3VycmVudF9ibG9jayArIGtsYXNzO1xuICAgICAgICB9IGVsc2UgaWYgKGtsYXNzLm1hdGNoKG5ldyBSZWdFeHAoJ14nICsgc2V0dGluZ3MuZWxlbWVudCkpKSB7XG4gICAgICAgICAgLy8tIEV4cGFuZGluZyB0aGUgbWl4ZWQgaW4gZWxlbWVudHNcbiAgICAgICAgICBpZiAoYmVtX2NoYWluW2JlbV9jaGFpbi5sZW5ndGggLSAyXSkge1xuICAgICAgICAgICAgYmVtX2NsYXNzZXNbaV0gPSBiZW1fY2hhaW5bYmVtX2NoYWluLmxlbmd0aCAtIDJdICsga2xhc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlbV9jbGFzc2VzW2ldID0gYmVtX2NoYWluW2JlbV9jaGFpbi5sZW5ndGggLSAxXSArIGtsYXNzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZGluZyBwcmVmaXhlc1xuICAgICAgICBpZiAoYmVtX2NsYXNzZXNbaV0ubWF0Y2gobmV3IFJlZ0V4cCgnXicgKyBjdXJyZW50X2Jsb2NrICsgJygkfCg/PScgKyBzZXR0aW5ncy5lbGVtZW50ICsgJ3wnICsgc2V0dGluZ3MubW9kaWZpZXIgKyAnKSknKSkpIHtcbiAgICAgICAgICBiZW1fY2xhc3Nlc1tpXSA9IHNldHRpbmdzLnByZWZpeCArIGJlbV9jbGFzc2VzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFdyaXRlIG1vZGlmaWVkIGNsYXNzZXMgdG8gYXR0cmlidXRlcyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgICAgYXR0cmlidXRlcy5jbGFzcyA9IGJlbV9jbGFzc2VzLnNvcnQoKS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgYmVtX3RhZyhidWYsIGJsb2NrLCBhdHRyaWJ1dGVzLCBiZW1fY2hhaW4sIGJlbV9jaGFpbl9jb250ZXh0cywgdGFnKTtcblxuICAgIC8vIENsb3NpbmcgYWN0aW9ucyAocmVtb3ZlIHRoZSBjdXJyZW50IGJsb2NrIGZyb20gdGhlIGNoYWluKVxuICAgIGlmICghaXNFbGVtZW50KSB7XG4gICAgICBiZW1fY2hhaW4ucG9wKCk7XG4gICAgfVxuICAgIGJlbV9jaGFpbl9jb250ZXh0cy5wb3AoKTtcbiAgfTtcblxuXG4gIC8vIHVzZWQgZm9yIHR3ZWFraW5nIHdoYXQgdGFnIHdlIGFyZSB0aHJvd2luZyBhbmQgZG8gd2UgbmVlZCB0byB3cmFwIGFueXRoaW5nIGhlcmVcbiAgZnVuY3Rpb24gYmVtX3RhZyhidWYsIGJsb2NrLCBhdHRyaWJ1dGVzLCBiZW1fY2hhaW4sIGJlbV9jaGFpbl9jb250ZXh0cywgdGFnKSB7XG4gICAgLy8gcmV3cml0aW5nIHRhZyBuYW1lIG9uIGRpZmZlcmVudCBjb250ZXh0c1xuICAgIHZhciBuZXdUYWcgPSB0YWcgfHwgc2V0dGluZ3MuZGVmYXVsdF90YWc7XG4gICAgdmFyIGNvbnRleHRJbmRleCA9IGJlbV9jaGFpbl9jb250ZXh0cy5sZW5ndGg7XG5cbiAgICAvL0NoZWNrcyBmb3IgY29udGV4dHMgaWYgbm8gdGFnIGdpdmVuXG4gICAgLy9jb25zb2xlLmxvZyhiZW1fY2hhaW5fY29udGV4dHMsIHRhZyk7XG4gICAgaWYgKCF0YWcpIHtcbiAgICAgIGlmIChiZW1fY2hhaW5fY29udGV4dHNbY29udGV4dEluZGV4IC0gMV0gPT09ICdpbmxpbmUnKSB7XG4gICAgICAgIG5ld1RhZyA9ICdzcGFuJztcbiAgICAgIH0gZWxzZSBpZiAoYmVtX2NoYWluX2NvbnRleHRzW2NvbnRleHRJbmRleCAtIDFdID09PSAnbGlzdCcpIHtcbiAgICAgICAgbmV3VGFnID0gJ2xpJztcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgICAvL0F0dHJpYnV0ZXMgY29udGV4dCBjaGVja3NcbiAgICAgIGlmIChhdHRyaWJ1dGVzLmhyZWYpIHtcbiAgICAgICAgbmV3VGFnID0gJ2EnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVzLmZvcikge1xuICAgICAgICBuZXdUYWcgPSAnbGFiZWwnO1xuICAgICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVzLnNyYykge1xuICAgICAgICBuZXdUYWcgPSAnaW1nJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL0NvbnRleHR1YWwgd3JhcHBlcnNcbiAgICBpZiAoYmVtX2NoYWluX2NvbnRleHRzW2NvbnRleHRJbmRleCAtIDFdID09PSAnbGlzdCcgJiYgbmV3VGFnICE9PSAnbGknKSB7XG4gICAgICBidWYucHVzaCgnPGxpPicpO1xuICAgIH0gZWxzZSBpZiAoYmVtX2NoYWluX2NvbnRleHRzW2NvbnRleHRJbmRleCAtIDFdICE9PSAnbGlzdCcgJiYgYmVtX2NoYWluX2NvbnRleHRzW2NvbnRleHRJbmRleCAtIDFdICE9PSAncHNldWRvLWxpc3QnICYmIG5ld1RhZyA9PT0gJ2xpJykge1xuICAgICAgYnVmLnB1c2goJzx1bD4nKTtcbiAgICAgIGJlbV9jaGFpbl9jb250ZXh0c1tiZW1fY2hhaW5fY29udGV4dHMubGVuZ3RoXSA9ICdwc2V1ZG8tbGlzdCc7XG4gICAgfSBlbHNlIGlmIChiZW1fY2hhaW5fY29udGV4dHNbY29udGV4dEluZGV4IC0gMV0gPT09ICdwc2V1ZG8tbGlzdCcgJiYgbmV3VGFnICE9PSAnbGknKSB7XG4gICAgICBidWYucHVzaCgnPC91bD4nKTtcbiAgICAgIGJlbV9jaGFpbl9jb250ZXh0cy5wb3AoKTtcbiAgICB9XG5cbiAgICAvL1NldHRpbmcgY29udGV4dFxuICAgIGlmIChbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2InLCAnYnInLCAnY29kZScsICdlbScsICdmb250JywgJ2knLCAnaW1nJywgJ2lucycsICdrYmQnLCAnbWFwJywgJ3NhbXAnLCAnc21hbGwnLCAnc3BhbicsICdzdHJvbmcnLCAnc3ViJywgJ3N1cCcsICdsYWJlbCcsICdwJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10uaW5kZXhPZihuZXdUYWcpICE9PSAtMSkge1xuICAgICAgYmVtX2NoYWluX2NvbnRleHRzW2JlbV9jaGFpbl9jb250ZXh0cy5sZW5ndGhdID0gJ2lubGluZSc7XG4gICAgfSBlbHNlIGlmIChbJ3VsJywgJ29sJ10uaW5kZXhPZihuZXdUYWcpICE9PSAtMSkge1xuICAgICAgYmVtX2NoYWluX2NvbnRleHRzW2JlbV9jaGFpbl9jb250ZXh0cy5sZW5ndGhdID0gJ2xpc3QnO1xuICAgIH0gZWxzZSB7XG4gICAgICBiZW1fY2hhaW5fY29udGV4dHNbYmVtX2NoYWluX2NvbnRleHRzLmxlbmd0aF0gPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHN3aXRjaCAobmV3VGFnKSB7XG4gICAgY2FzZSAnaW1nJzpcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHRpdGxlIHdlIGRvbid0IG5lZWQgaXQgdG8gc2hvdyBldmVuIGlmIHRoZXJlIGlzIHNvbWUgYWx0XG4gICAgICBpZiAoYXR0cmlidXRlcy5hbHQgJiYgIWF0dHJpYnV0ZXMudGl0bGUpIHtcbiAgICAgICAgYXR0cmlidXRlcy50aXRsZSA9ICcnO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgaGF2ZSB0aXRsZSwgd2UgbXVzdCBoYXZlIGl0IGluIGFsdCBpZiBpdCdzIG5vdCBzZXRcbiAgICAgIGlmIChhdHRyaWJ1dGVzLnRpdGxlICYmICFhdHRyaWJ1dGVzLmFsdCkge1xuICAgICAgICBhdHRyaWJ1dGVzLmFsdCA9IGF0dHJpYnV0ZXMudGl0bGU7XG4gICAgICB9XG4gICAgICBpZiAoIWF0dHJpYnV0ZXMuYWx0KSB7XG4gICAgICAgIGF0dHJpYnV0ZXMuYWx0ID0gJyc7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbnB1dCc6XG4gICAgICBpZiAoIWF0dHJpYnV0ZXMudHlwZSkge1xuICAgICAgICBhdHRyaWJ1dGVzLnR5cGUgPSBcInRleHRcIjtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgYnVmLnB1c2goJzwhRE9DVFlQRSBIVE1MPicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYSc6XG4gICAgICBpZiAoIWF0dHJpYnV0ZXMuaHJlZikge1xuICAgICAgICBhdHRyaWJ1dGVzLmhyZWYgPSAnIyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnVmLnB1c2goJzwnICsgbmV3VGFnICsgamFkZS5hdHRycyhqYWRlLm1lcmdlKFthdHRyaWJ1dGVzXSksIHRydWUpICsgXCI+XCIpO1xuXG4gICAgaWYgKGJsb2NrKSBibG9jaygpO1xuXG4gICAgaWYgKFsnYXJlYScsICdiYXNlJywgJ2JyJywgJ2NvbCcsICdlbWJlZCcsICdocicsICdpbWcnLCAnaW5wdXQnLCAna2V5Z2VuJywgJ2xpbmsnLCAnbWVudWl0ZW0nLCAnbWV0YScsICdwYXJhbScsICdzb3VyY2UnLCAndHJhY2snLCAnd2JyJ10uaW5kZXhPZihuZXdUYWcpID09IC0xKSB7XG4gICAgICBidWYucHVzaCgnPC8nICsgbmV3VGFnICsgJz4nKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIGFsbCB0aGUgd3JhcHBlciB0YWlsc1xuICAgIGlmIChiZW1fY2hhaW5fY29udGV4dHNbY29udGV4dEluZGV4IC0gMV0gPT09ICdsaXN0JyAmJiBuZXdUYWcgIT0gJ2xpJykge1xuICAgICAgYnVmLnB1c2goJzwvbGk+Jyk7XG4gICAgfVxuICB9XG5cblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9iZW0tamFkZS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vamFkZS9saWIvcnVudGltZS5qc1xuICoqLyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZnMgKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gODVcbiAqKiBtb2R1bGUgY2h1bmtzID0gOVxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjkuZTlkYjFmOWM2OWRiNjAwZjhjOTEuanMifQ==
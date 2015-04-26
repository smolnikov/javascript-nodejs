webpackJsonp_name_([ 7 ], {
91: function() {},
133: function(e, t, n) {
"use strict";
function i(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var i = t("fail", n);
i.reason = e, r.dispatchEvent(i);
}
function i(e, n) {
var i = t("success", n);
i.result = e, r.dispatchEvent(i);
}
var r = new XMLHttpRequest(), a = e.method || "GET", s = e.body, l = e.url;
r.open(a, l, e.sync ? !1 : !0), r.method = a;
var c = o();
c && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(s) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
r.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), r.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), r.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), r.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(r.status)) return void n("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее", t);
var o = r.responseText, a = r.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
o = JSON.parse(o);
} catch (t) {
return void n("Некорректный формат ответа от сервера", t);
}
i(o, t);
}), setTimeout(function() {
r.send(s);
}, 0), r;
}
var r = n(128), o = n(163);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = i;
},
141: function(e, t, n) {
"use strict";
function i(e) {
e.bem = r, e.thumb = o;
}
var r = n(210)(), o = n(164).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, i(t), e(t);
};
},
148: function(e, t, n) {
"use strict";
t.AuthModal = n(170);
},
163: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
164: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var i = window.devicePixelRatio;
t *= i, n *= i;
var r = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + r + e.slice(e.lastIndexOf("."));
};
},
170: function(e, t, n) {
"use strict";
function i(e) {
a.apply(this, arguments), e = e || {}, e.successRedirect || (e.successRedirect = window.location.href);
this.options = e, this.setContent(p(l)), e.message && this.showFormMessage(e.message, "info"), 
this.initEventHandlers();
}
var r = n(133), o = n(132), a = n(114), s = n(144), l = n(196), c = n(197), u = n(198), p = n(141);
i.prototype = Object.create(a.prototype), o.delegateMixin(i.prototype), i.prototype.render = function() {
a.prototype.render.apply(this, arguments), this.elem.classList.add("login-form-modal");
}, i.prototype.successRedirect = function() {
window.location.href == this.options.successRedirect ? window.location.reload() : window.location.href = this.options.successRedirect;
}, i.prototype.clearFormMessages = function() {
[].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function(e) {
e.classList.remove("text-input_invalid");
}), [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function(e) {
e.remove();
}), this.elem.querySelector("[data-notification]").innerHTML = "";
}, i.prototype.request = function(e) {
var t = r(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
}, i.prototype.startRequestIndication = function() {
this.showOverlay();
var e = this, t = this.elem.querySelector('[type="submit"]');
if (t) {
var n = new s({
elem: t,
size: "small",
"class": "",
elemClass: "button_loading"
});
n.start();
}
return function() {
e.hideOverlay(), n && n.stop();
};
}, i.prototype.initEventHandlers = function() {
this.delegate('[data-switch="register-form"]', "click", function(e) {
e.preventDefault(), this.setContent(p(c));
}), this.delegate('[data-switch="login-form"]', "click", function(e) {
e.preventDefault(), this.setContent(p(l));
}), this.delegate('[data-switch="forgot-form"]', "click", function(e) {
e.preventDefault();
var t = this.elem.querySelector('[type="email"]');
this.setContent(p(u));
var n = this.elem.querySelector('[type="email"]');
n.value = t.value;
}), this.delegate('[data-form="login"]', "submit", function(e) {
e.preventDefault(), this.submitLoginForm(e.target);
}), this.delegate('[data-form="register"]', "submit", function(e) {
e.preventDefault(), this.submitRegisterForm(e.target);
}), this.delegate('[data-form="forgot"]', "submit", function(e) {
e.preventDefault(), this.submitForgotForm(e.target);
}), this.delegate("[data-provider]", "click", function(e) {
e.preventDefault(), this.openAuthPopup("/auth/login/" + e.delegateTarget.dataset.provider);
}), this.delegate("[data-action-verify-email]", "click", function(e) {
e.preventDefault();
var t = new FormData(), n = e.delegateTarget.dataset.actionVerifyEmail;
t.append("email", n);
var i = this.request({
method: "POST",
url: "/auth/reverify",
body: t
}), r = this;
i.addEventListener("success", function(e) {
200 == this.status ? r.showFormMessage("\n        <p>Письмо-подтверждение отправлено ещё раз.</p>\n        <p><a href='#' data-action-verify-email='" + n + "'>перезапросить подтверждение.</a></p>\n        ", "success") : r.showFormMessage(e.result, "error");
});
});
}, i.prototype.submitRegisterForm = function(e) {
this.clearFormMessages();
var t = !1;
if (e.elements.email.value || (t = !0, this.showInputError(e.elements.email, "Введите, пожалуста, email.")), 
e.elements.displayName.value || (t = !0, this.showInputError(e.elements.displayName, "Введите, пожалуста, имя пользователя.")), 
e.elements.password.value || (t = !0, this.showInputError(e.elements.password, "Введите, пожалуста, пароль.")), 
!t) {
var n = new FormData(e);
n.append("successRedirect", this.options.successRedirect);
var i = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: n
}), r = this;
i.addEventListener("success", function(t) {
if (201 == this.status) return r.setContent(p(l)), void r.showFormMessage("<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + e.elements.email.value + "'>перезапросить подтверждение.</a></p>", "success");
if (400 != this.status) r.showFormMessage("Неизвестный статус ответа сервера", "error"); else for (var n in t.result.errors) r.showInputError(e.elements[n], t.result.errors[n]);
});
}
}, i.prototype.submitForgotForm = function(e) {
this.clearFormMessages();
var t = !1;
if (e.elements.email.value || (t = !0, this.showInputError(e.elements.email, "Введите, пожалуста, email.")), 
!t) {
var n = new FormData(e);
n.append("successRedirect", this.options.successRedirect);
var i = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404 ],
body: n
}), r = this;
i.addEventListener("success", function(e) {
200 == this.status ? (r.setContent(p(l)), r.showFormMessage(e.result, "success")) : 404 == this.status && r.showFormMessage(e.result, "error");
});
}
}, i.prototype.showInputError = function(e, t) {
e.parentNode.classList.add("text-input_invalid");
var n = document.createElement("span");
n.className = "text-input__err", n.innerHTML = t, e.parentNode.appendChild(n);
}, i.prototype.showFormMessage = function(e, t) {
if (0 !== e.indexOf("<p>") && (e = "<p>" + e + "</p>"), -1 == [ "info", "error", "warning", "success" ].indexOf(t)) throw Error("Unsupported type: " + t);
var n = document.createElement("div");
n.className = "login-form__" + t, n.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(n);
}, i.prototype.submitLoginForm = function(e) {
var t = this;
this.clearFormMessages();
var n = !1;
if (e.elements.email.value || (n = !0, this.showInputError(e.elements.email, "Введите, пожалуста, email.")), 
e.elements.password.value || (n = !0, this.showInputError(e.elements.password, "Введите, пожалуста, пароль.")), 
!n) {
var i = r({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(e)
}), o = this.startRequestIndication();
i.addEventListener("success", function(e) {
return 401 == i.status ? (o(), void t.onAuthFailure(e.result.message)) : void (t.options.callback ? (o(), 
t.onAuthSuccess(e.result.user)) : t.onAuthSuccess(e.result.user));
}), i.addEventListener("fail", function(e) {
o(), t.onAuthFailure(e.reason);
});
}
}, i.prototype.openAuthPopup = function(e) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var t = 800, n = 600, i = (window.outerHeight - n) / 2, r = (window.outerWidth - t) / 2;
window.authModal = this, this.authPopup = window.open(e, "authModal", "width=" + t + ",height=" + n + ",scrollbars=0,top=" + i + ",left=" + r);
}, i.prototype.onAuthSuccess = function(e) {
window.currentUser = e, this.options.callback ? this.options.callback() : this.successRedirect();
}, i.prototype.onAuthFailure = function(e) {
this.showFormMessage(e || "Отказ в авторизации.", "error");
}, e.exports = i;
},
196: function(e, t, n) {
var i = n(199);
e.exports = function(e) {
var t = [], n = {}, r = e || {};
return function(e) {
t.push("");
var r = [];
n.b = function(n, i, o) {
this && this.block, this && this.attributes || {};
e.call(this, t, r, n, i, o);
}, n.e = function(e) {
var t = this && this.block, r = this && this.attributes || {};
n.b.call({
block: function() {
t && t();
},
attributes: i.merge([ r ])
}, e, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Вход в систему");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("регистрация");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "auth-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), n.e.call({
block: function() {
t.push("Забыли?");
},
attributes: {
type: "button",
"data-switch": "forgot-form",
"class": "aside __forgot __button-link"
}
}, "button");
},
attributes: {
"class": "text-input _with-aside __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
t.push("Войти");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action"
}
}, "button"), n.e.call({
block: function() {
t.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), t.push(" "), n.b.call({
block: function() {
t.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"class": "form"
}
}, "form");
},
attributes: {
"data-form": "login",
"class": "login-form"
}
});
}.call(this, "bem" in r ? r.bem : "undefined" != typeof bem ? bem : void 0), t.join("");
};
},
197: function(e, t, n) {
var i = n(199);
e.exports = function(e) {
var t = [], n = {}, r = e || {};
return function(e) {
t.push("");
var r = [];
n.b = function(n, i, o) {
this && this.block, this && this.attributes || {};
e.call(this, t, r, n, i, o);
}, n.e = function(e) {
var t = this && this.block, r = this && this.attributes || {};
n.b.call({
block: function() {
t && t();
},
attributes: i.merge([ r ])
}, e, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-email",
name: "email",
type: "email",
required: !0,
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-displayName",
name: "displayName",
required: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-password",
type: "password",
name: "password",
required: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
t.push("Зарегистрироваться");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action submit"
}
}, "button"), n.e.call({
block: function() {
t.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
t.push('Регистрируясь, вы принимаете <a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), t.push(" "), n.b.call({
block: function() {
t.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"data-form": "register",
"class": "form"
}
}, "form");
},
attributes: {
"class": "login-form"
}
});
}.call(this, "bem" in r ? r.bem : "undefined" != typeof bem ? bem : void 0), t.join("");
};
},
198: function(e, t, n) {
var i = n(199);
e.exports = function(e) {
var t = [], n = {}, r = e || {};
return function(e) {
t.push("");
var r = [];
n.b = function(n, i, o) {
this && this.block, this && this.attributes || {};
e.call(this, t, r, n, i, o);
}, n.e = function(e) {
var t = this && this.block, r = this && this.attributes || {};
n.b.call({
block: function() {
t && t();
},
attributes: i.merge([ r ])
}, e, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "forgot-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
t.push("Восстановить пароль");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action __submit"
}
}, "button");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), t.push(" "), n.e.call({
block: function() {
t.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), t.push(" "), n.e.call({
block: function() {
t.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), n.e.call({
block: function() {
t.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), t.push(" "), n.b.call({
block: function() {
t.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), t.push(" "), n.b.call({
block: function() {
t.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"data-form": "forgot",
"class": "form"
}
}, "form");
},
attributes: {
"class": "login-form"
}
});
}.call(this, "bem" in r ? r.bem : "undefined" != typeof bem ? bem : void 0), t.join("");
};
},
199: function(e, t, n) {
"use strict";
function i(e) {
return null != e && "" !== e;
}
function r(e) {
return (Array.isArray(e) ? e.map(r) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(i).join(" ");
}
t.merge = function o(e, t) {
if (1 === arguments.length) {
for (var n = e[0], r = 1; r < e.length; r++) n = o(n, e[r]);
return n;
}
var a = e.class, s = t.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
e.class = a.concat(s).filter(i));
for (var l in t) "class" != l && (e[l] = t[l]);
return e;
}, t.joinClasses = r, t.cls = function(e, n) {
for (var i = [], o = 0; o < e.length; o++) i.push(n && n[o] ? t.escape(r([ e[o] ])) : r(e[o]));
var a = r(i);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, i, r) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (r ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : i ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var i = [], o = Object.keys(e);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], l = e[s];
"class" == s ? (l = r(l)) && i.push(" " + s + '="' + l + '"') : i.push(t.attr(s, l, !1, n));
}
return i.join("");
}, t.escape = function(e) {
var t = (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return t === "" + e ? e : t;
}, t.rethrow = function a(e, t, i, r) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || r)) throw e.message += " on line " + i, 
e;
try {
r = r || n(91).readFileSync(t, "utf8");
} catch (o) {
a(e, null, i);
}
var s = 3, l = r.split("\n"), c = Math.max(i - s, 0), u = Math.min(l.length, i + s), s = l.slice(c, u).map(function(e, t) {
var n = t + c + 1;
return (n == i ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + i + "\n" + s + "\n\n" + e.message, 
e;
};
},
210: function(e, t, n) {
"use strict";
var i = n(199);
e.exports = function(e) {
function t(e, t, n, r, o) {
var a = o || "div";
switch (a) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
e.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
e.push("<" + a + i.attrs(i.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && e.push("</" + a + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, i, r, o) {
var a = this.block, s = this.attributes || {};
if (s.class) {
var l = s.class;
l instanceof Array && (l = l.join(" ")), l = l.split(" ");
var c;
try {
c = l[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + l[0]);
}
o ? l[0] = i[i.length - 1] + e.element + l[0] : (i[i.length] = c, l[0] = l[0]);
var p = (o ? i[i.length - 1] + e.element : "") + c;
-1 === l.indexOf(p) && (l[l.length] = p);
for (var d = 0; d < l.length; d++) {
var f = l[d];
f.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? l[d] = p + f : f.match(RegExp("^" + e.element)) && (i[i.length - 2] ? l[d] = i[i.length - 2] + f : l[d] = i[i.length - 1] + f), 
l[d].match(RegExp("^" + p + "($|(?=" + e.element + "|" + e.modifier + "))")) && (l[d] = e.prefix + l[d]);
}
s.class = l.sort().join(" ");
}
t(n, a, s, i, r), o || i.pop();
};
};
}
});
//# sourceMappingURL=authClient-7.3923ccec08c011037b87.js.map
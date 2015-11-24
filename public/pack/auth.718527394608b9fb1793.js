var auth = webpackJsonp_name_([ 17, 2 ], {
0: function(t, e, s) {
"use strict";
function n() {
var t = new i(window.authOptions);
document.getElementById("auth-form").appendChild(t.getElem());
}
e.AuthModal = s(152);
var i = s(154);
n();
},
116: function(t, e) {},
150: function(t, e) {
"use strict";
function s(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
s.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, s.prototype.stop = function() {
var t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, t.exports = s;
},
152: function(t, e, s) {
"use strict";
function n(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function i(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
t.prototype = Object.create(e && e.prototype, {
constructor: {
value: t,
enumerable: !1,
writable: !0,
configurable: !0
}
}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}
var a = function() {
function t(t, e) {
for (var s = 0; s < e.length; s++) {
var n = e[s];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(t, n.key, n);
}
}
return function(e, s, n) {
return s && t(e.prototype, s), n && t(e, n), e;
};
}(), o = function(t, e, s) {
for (var n = !0; n; ) {
var i = t, a = e, o = s;
n = !1, null === i && (i = Function.prototype);
var l = Object.getOwnPropertyDescriptor(i, a);
if (void 0 !== l) {
if ("value" in l) return l.value;
var r = l.get;
if (void 0 === r) return;
return r.call(o);
}
var c = Object.getPrototypeOf(i);
if (null === c) return;
t = c, e = a, s = o, n = !0, l = c = void 0;
}
}, l = s(153), r = s(154), c = function(t) {
function e(t) {
n(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {}, this.options.inModal = !0;
var s = new r(this.options);
this.setContent(s.getElem());
}
return i(e, t), a(e, [ {
key: "render",
value: function() {
o(Object.getPrototypeOf(e.prototype), "render", this).call(this), this.elem.classList.add("login-form-modal");
}
} ]), e;
}(l);
t.exports = c;
},
154: function(t, e, s) {
"use strict";
function n(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function t(t, e) {
for (var s = 0; s < e.length; s++) {
var n = e[s];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(t, n.key, n);
}
}
return function(e, s, n) {
return s && t(e.prototype, s), n && t(e, n), e;
};
}(), a = s(155), o = s(148), l = s(150), r = s(157), c = s(159), u = s(160), p = s(161), f = function() {
function t(e) {
n(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return i(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = p(r, this.options), 
this.options.message && this.showFormMessage(this.options.message), this.initEventHandlers();
}
}, {
key: "getElem",
value: function() {
return this.elem || this.render(), this.elem;
}
}, {
key: "successRedirect",
value: function() {
window.location.href == this.options.successRedirect ? window.location.reload() : window.location.href = this.options.successRedirect;
}
}, {
key: "clearFormMessages",
value: function() {
[].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function(t) {
t.classList.remove("text-input_invalid");
}), [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function(t) {
t.remove();
}), this.elem.querySelector("[data-notification]").innerHTML = "";
}
}, {
key: "request",
value: function e(t) {
var e = a(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}
}, {
key: "startRequestIndication",
value: function() {
this.elem.classList.add("modal-overlay_light");
var t = this, e = this.elem.querySelector('[type="submit"]');
if (e) {
var s = new l({
elem: e,
size: "small",
"class": "",
elemClass: "button_loading"
});
s.start();
}
return function() {
t.elem.classList.remove("modal-overlay_light"), s && s.stop();
};
}
}, {
key: "initEventHandlers",
value: function() {
this.delegate('[data-switch="register-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = p(c, this.options);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = p(r, this.options);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = p(u, this.options);
var s = this.elem.querySelector('[type="email"]');
s.value = e.value;
}), this.delegate('[data-form="login"]', "submit", function(t) {
t.preventDefault(), this.submitLoginForm(t.target);
}), this.delegate('[data-form="register"]', "submit", function(t) {
t.preventDefault(), this.submitRegisterForm(t.target);
}), this.delegate('[data-form="forgot"]', "submit", function(t) {
t.preventDefault(), this.submitForgotForm(t.target);
}), this.delegate("[data-provider]", "click", function(t) {
t.preventDefault(), this.openAuthPopup("/auth/login/" + t.delegateTarget.dataset.provider);
}), this.delegate("[data-action-verify-email]", "click", function(t) {
t.preventDefault();
var e = new FormData(), s = t.delegateTarget.dataset.actionVerifyEmail;
e.append("email", s);
var n = this.request({
method: "POST",
url: "/auth/reverify",
body: e
}), i = this;
n.addEventListener("success", function(t) {
200 == this.status ? i.showFormMessage({
html: "\n            <p>Письмо-подтверждение отправлено ещё раз.</p>\n            <p><a href='#' data-action-verify-email='" + s + "'>перезапросить подтверждение.</a></p>\n            ",
type: "success"
}) : i.showFormMessage({
type: "error",
html: t.result
});
});
});
}
}, {
key: "submitRegisterForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.displayName.value || (e = !0, this.showInputError(t.elements.displayName, "Введите, пожалуста, имя пользователя.")), 
t.elements.password.value || (e = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!e) {
var s = new FormData(t);
s.append("successRedirect", this.options.successRedirect);
var n = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: s
}), i = this;
n.addEventListener("success", function(e) {
if (201 == this.status) return i.elem.innerHTML = p(r, i.options), void i.showFormMessage({
html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>",
type: "success"
});
if (400 != this.status) i.showFormMessage({
html: "Неизвестный статус ответа сервера",
type: "error"
}); else for (var s in e.result.errors) i.showInputError(t.elements[s], e.result.errors[s]);
});
}
}
}, {
key: "submitForgotForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
!e) {
var s = new FormData(t);
s.append("successRedirect", this.options.successRedirect);
var n = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404, 403 ],
body: s
}), i = this;
n.addEventListener("success", function(t) {
200 == this.status ? (i.elem.innerHTML = p(r, i.options), i.showFormMessage({
html: t.result,
type: "success"
})) : 404 == this.status ? i.showFormMessage({
html: t.result,
type: "error"
}) : 403 == this.status && i.showFormMessage({
html: t.result.message || "Действие запрещено.",
type: "error"
});
});
}
}
}, {
key: "showInputError",
value: function(t, e) {
t.parentNode.classList.add("text-input_invalid");
var s = document.createElement("span");
s.className = "text-input__err", s.innerHTML = e, t.parentNode.appendChild(s);
}
}, {
key: "showFormMessage",
value: function(t) {
var e = t.html;
0 !== e.indexOf("<p>") && (e = "<p>" + e + "</p>");
var s = t.type;
if (-1 == [ "info", "error", "warning", "success" ].indexOf(s)) throw Error("Unsupported type: " + s);
var n = document.createElement("div");
n.className = "login-form__" + s, n.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(n);
}
}, {
key: "submitLoginForm",
value: function(t) {
var e = this;
this.clearFormMessages();
var s = !1;
if (t.elements.email.value || (s = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.password.value || (s = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!s) {
var n = a({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(t)
}), i = this.startRequestIndication();
n.addEventListener("success", function(t) {
return 401 == n.status ? (i(), void e.onAuthFailure(t.result.message)) : void (e.options.callback ? (i(), 
e.onAuthSuccess(t.result.user)) : e.onAuthSuccess(t.result.user));
}), n.addEventListener("fail", function(t) {
i(), e.onAuthFailure(t.reason);
});
}
}
}, {
key: "openAuthPopup",
value: function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, s = 600, n = (window.outerHeight - s) / 2, i = (window.outerWidth - e) / 2;
window.authForm = this, this.authPopup = window.open(t, "authForm", "width=" + e + ",height=" + s + ",scrollbars=0,top=" + n + ",left=" + i);
}
}, {
key: "onAuthSuccess",
value: function(t) {
window.currentUser = t, this.options.callback ? this.options.callback() : this.successRedirect();
}
}, {
key: "onAuthFailure",
value: function(t) {
this.showFormMessage({
html: t || "Отказ в авторизации.",
type: "error"
});
}
} ]), t;
}();
o.delegateMixin(f.prototype), t.exports = f;
},
155: function(t, e, s) {
"use strict";
function n(t) {
function e(t, e) {
var s = new CustomEvent(t);
return s.originalEvent = e, s;
}
function s(t, s) {
var n = e("fail", s);
n.reason = t, i.dispatchEvent(n);
}
function n(t, s) {
var n = e("success", s);
n.result = t, i.dispatchEvent(n);
}
var i = new XMLHttpRequest(), o = t.method || "GET", l = t.body, r = t.url;
i.open(o, r, t.sync ? !1 : !0), i.method = o;
var c = a();
c && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(l) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
l = JSON.stringify(l)), t.noDocumentEvents || (i.addEventListener("loadstart", function(t) {
i.timeStart = Date.now();
var s = e("xhrstart", t);
document.dispatchEvent(s);
}), i.addEventListener("loadend", function(t) {
var s = e("xhrend", t);
document.dispatchEvent(s);
}), i.addEventListener("success", function(t) {
var s = e("xhrsuccess", t);
s.result = t.result, document.dispatchEvent(s);
}), i.addEventListener("fail", function(t) {
var s = e("xhrfail", t);
s.reason = t.reason, document.dispatchEvent(s);
})), t.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
s("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
s("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
s("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void s("Не получен ответ от сервера.", e);
if (-1 == u.indexOf(i.status)) return void s("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", e);
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
a = JSON.parse(a);
} catch (e) {
return void s("Некорректный формат ответа от сервера.", e);
}
n(a, e);
}), setTimeout(function() {
i.send(l);
}, 0), i;
}
var i = s(147), a = s(156);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = n;
},
156: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
157: function(t, e, s) {
var n = s(158);
t.exports = function(t) {
var e, s = [], i = {}, a = t || {};
return function(t, a) {
s.push("");
var o = [];
i.b = e = function(e, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, n, i);
}, i.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: n.merge([ s ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
a ? i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("регистрация");
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
}) : (s.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), i.e.call({
block: function() {
s.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), s.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
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
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), i.e.call({
block: function() {
s.push("Забыли?");
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
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
s.push("Войти");
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
}, "button"), a && i.e.call({
block: function() {
s.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Яндекс");
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
"class": "body"
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
"class": (e = [ !0 ], n.joinClasses([ [ "login-form", a ? "_modal" : "_inline" ] ].map(n.joinClasses).map(function(t, s) {
return e[s] ? n.escape(t) : t;
})))
}
});
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in a ? a.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
158: function(t, e, s) {
"use strict";
function n(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(n).join(" ");
}
function a(t) {
return l[t] || t;
}
function o(t) {
var e = (t + "").replace(r, a);
return e === "" + t ? t : e;
}
e.merge = function c(t, e) {
if (1 === arguments.length) {
for (var s = t[0], i = 1; i < t.length; i++) s = c(s, t[i]);
return s;
}
var a = t.class, o = e.class;
(a || o) && (a = a || [], o = o || [], Array.isArray(a) || (a = [ a ]), Array.isArray(o) || (o = [ o ]), 
t.class = a.concat(o).filter(n));
for (var l in e) "class" != l && (t[l] = e[l]);
return t;
}, e.joinClasses = i, e.cls = function(t, s) {
for (var n = [], a = 0; a < t.length; a++) s && s[a] ? n.push(e.escape(i([ t[a] ]))) : n.push(i(t[a]));
var o = i(n);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, s, n, i) {
return "style" === t && (s = e.style(s)), "boolean" == typeof s || null == s ? s ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof s ? (-1 !== JSON.stringify(s).indexOf("&"), 
s && "function" == typeof s.toISOString, " " + t + "='" + JSON.stringify(s).replace(/'/g, "&apos;") + "'") : n ? (s && "function" == typeof s.toISOString, 
" " + t + '="' + e.escape(s) + '"') : (s && "function" == typeof s.toISOString, 
" " + t + '="' + s + '"');
}, e.attrs = function(t, s) {
var n = [], a = Object.keys(t);
if (a.length) for (var o = 0; o < a.length; ++o) {
var l = a[o], r = t[l];
"class" == l ? (r = i(r)) && n.push(" " + l + '="' + r + '"') : n.push(e.attr(l, r, !1, s));
}
return n.join("");
};
var l = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, r = /[&<>"]/g;
e.escape = o, e.rethrow = function u(t, e, n, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + n, 
t;
try {
i = i || s(116).readFileSync(e, "utf8");
} catch (a) {
u(t, null, n);
}
var o = 3, l = i.split("\n"), r = Math.max(n - o, 0), c = Math.min(l.length, n + o), o = l.slice(r, c).map(function(t, e) {
var s = e + r + 1;
return (s == n ? "  > " : "    ") + s + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + n + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
159: function(t, e, s) {
var n = s(158);
t.exports = function(t) {
var e, s = [], i = {}, a = t || {};
return function(t, a) {
s.push("");
var o = [];
i.b = e = function(e, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, n, i);
}, i.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: n.merge([ s ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
a ? i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("вход");
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
}) : (s.push("<p>Если у вас уже есть аккаунт, вы можете&nbsp;"), i.e.call({
block: function() {
s.push("войти");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), s.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
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
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
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
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
attributes: {
id: "register-password",
type: "password",
name: "password",
required: !0,
minlength: "4",
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
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
s.push("Зарегистрироваться");
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
}, "button"), a && i.e.call({
block: function() {
s.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
s.push("Регистрируясь, вы принимаете" + n.escape(null == (e = " ") ? "" : e) + '<a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Яндекс");
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
"class": "body"
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
"class": (e = [ !0 ], n.joinClasses([ [ "login-form", a ? "_modal" : "_inline" ] ].map(n.joinClasses).map(function(t, s) {
return e[s] ? n.escape(t) : t;
})))
}
});
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in a ? a.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
160: function(t, e, s) {
var n = s(158);
t.exports = function(t) {
var e, s = [], i = {}, a = t || {};
return function(t, a) {
s.push("");
var o = [];
i.b = e = function(e, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, n, i);
}, i.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: n.merge([ s ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
a ? i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}) : (s.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), i.e.call({
block: function() {
s.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), s.push("</p>")), i.e.call({
block: function() {
i.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), i.b.call({
block: function() {
i.e.call({
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
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
s.push("Восстановить пароль");
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
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.e.call({
block: function() {
s.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), s.push(n.escape(null == (e = " ") ? "" : e)), i.e.call({
block: function() {
s.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), a && i.e.call({
block: function() {
s.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), i.e.call({
block: function() {
i.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(n.escape(null == (e = " ") ? "" : e)), i.b.call({
block: function() {
s.push("Яндекс");
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
"class": "body"
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
"class": (e = [ !0 ], n.joinClasses([ [ "login-form", a ? "_modal" : "_inline" ] ].map(n.joinClasses).map(function(t, s) {
return e[s] ? n.escape(t) : t;
})))
}
});
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in a ? a.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
161: function(t, e, s) {
"use strict";
function n(t) {
t.bem = i, t.thumb = a;
}
var i = s(162)(), a = s(163).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, n(e), t(e);
};
},
162: function(t, e, s) {
"use strict";
var n = s(158);
t.exports = function(t) {
function e(t, e, s, i, a) {
var o = a || "div";
switch (o) {
case "img":
s.alt && !s.title && (s.title = ""), s.title && !s.alt && (s.alt = s.title), s.alt || (s.alt = "");
break;

case "input":
s.type || (s.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
s.href || (s.href = "#");
}
t.push("<" + o + n.attrs(n.merge([ s ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(s, n, i, a) {
var o = this.block, l = this.attributes || {};
if (!l.class && i && !a) throw Error("Block without class: " + i);
if (l.class) {
var r = l.class;
r instanceof Array && (r = r.join(" ")), r = r.split(" ");
var c;
try {
c = r[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + r[0]);
}
a ? r[0] = n[n.length - 1] + t.element + r[0] : n[n.length] = c;
var p = (a ? n[n.length - 1] + t.element : "") + c;
-1 === r.indexOf(p) && (r[r.length] = p);
for (var f = 0; f < r.length; f++) {
var h = r[f];
h.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? r[f] = p + h : h.match(RegExp("^" + t.element)) && (n[n.length - 2] ? r[f] = n[n.length - 2] + h : r[f] = n[n.length - 1] + h), 
r[f].match(RegExp("^" + p + "($|(?=" + t.element + "|" + t.modifier + "))")) && (r[f] = t.prefix + r[f]);
}
l.class = r.sort().join(" ");
}
e(s, o, l, n, i), a || n.pop();
};
};
},
163: function(t, e) {
"use strict";
e.thumb = function(t, e, s) {
if (!t) return t;
var n = window.devicePixelRatio;
e *= n, s *= n;
var i = 160 >= e && 160 >= s ? "t" : 320 >= e && 320 >= s ? "m" : 640 >= e && 640 >= s ? "i" : 1024 >= e && 1024 >= s ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
}
});
//# sourceMappingURL=auth.718527394608b9fb1793.js.map
webpackJsonp_name_([ 2 ], {
116: function(t, e) {},
152: function(t, e, s) {
"use strict";
function i(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function a(t, e) {
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
var n = function() {
function t(t, e) {
for (var s = 0; s < e.length; s++) {
var i = e[s];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(t, i.key, i);
}
}
return function(e, s, i) {
return s && t(e.prototype, s), i && t(e, i), e;
};
}(), o = function(t, e, s) {
for (var i = !0; i; ) {
var a = t, n = e, o = s;
i = !1, null === a && (a = Function.prototype);
var l = Object.getOwnPropertyDescriptor(a, n);
if (void 0 !== l) {
if ("value" in l) return l.value;
var r = l.get;
if (void 0 === r) return;
return r.call(o);
}
var c = Object.getPrototypeOf(a);
if (null === c) return;
t = c, e = n, s = o, i = !0, l = c = void 0;
}
}, l = s(153), r = s(154), c = function(t) {
function e(t) {
i(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {}, this.options.inModal = !0;
var s = new r(this.options);
this.setContent(s.getElem());
}
return a(e, t), n(e, [ {
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
function i(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var a = function() {
function t(t, e) {
for (var s = 0; s < e.length; s++) {
var i = e[s];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(t, i.key, i);
}
}
return function(e, s, i) {
return s && t(e.prototype, s), i && t(e, i), e;
};
}(), n = s(155), o = s(148), l = s(150), r = s(157), c = s(159), u = s(160), b = s(161), p = function() {
function t(e) {
i(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return a(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = b(r, this.options), 
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
var e = n(t);
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
t.preventDefault(), this.elem.innerHTML = b(c, this.options);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = b(r, this.options);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = b(u, this.options);
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
var i = this.request({
method: "POST",
url: "/auth/reverify",
body: e
}), a = this;
i.addEventListener("success", function(t) {
200 == this.status ? a.showFormMessage({
html: "\n            <p>Письмо-подтверждение отправлено ещё раз.</p>\n            <p><a href='#' data-action-verify-email='" + s + "'>перезапросить подтверждение.</a></p>\n            ",
type: "success"
}) : a.showFormMessage({
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
var i = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: s
}), a = this;
i.addEventListener("success", function(e) {
if (201 == this.status) return a.elem.innerHTML = b(r, a.options), void a.showFormMessage({
html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>",
type: "success"
});
if (400 != this.status) a.showFormMessage({
html: "Неизвестный статус ответа сервера",
type: "error"
}); else for (var s in e.result.errors) a.showInputError(t.elements[s], e.result.errors[s]);
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
var i = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404, 403 ],
body: s
}), a = this;
i.addEventListener("success", function(t) {
200 == this.status ? (a.elem.innerHTML = b(r, a.options), a.showFormMessage({
html: t.result,
type: "success"
})) : 404 == this.status ? a.showFormMessage({
html: t.result,
type: "error"
}) : 403 == this.status && a.showFormMessage({
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
var i = document.createElement("div");
i.className = "login-form__" + s, i.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(i);
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
var i = n({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(t)
}), a = this.startRequestIndication();
i.addEventListener("success", function(t) {
return 401 == i.status ? (a(), void e.onAuthFailure(t.result.message)) : void (e.options.callback ? (a(), 
e.onAuthSuccess(t.result.user)) : e.onAuthSuccess(t.result.user));
}), i.addEventListener("fail", function(t) {
a(), e.onAuthFailure(t.reason);
});
}
}
}, {
key: "openAuthPopup",
value: function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, s = 600, i = (window.outerHeight - s) / 2, a = (window.outerWidth - e) / 2;
window.authForm = this, this.authPopup = window.open(t, "authForm", "width=" + e + ",height=" + s + ",scrollbars=0,top=" + i + ",left=" + a);
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
o.delegateMixin(p.prototype), t.exports = p;
},
157: function(t, e, s) {
var i = s(158);
t.exports = function(t) {
var e, s = [], a = {}, n = t || {};
return function(t, n) {
s.push("");
var o = [];
a.b = e = function(e, i, a) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, i, a);
}, a.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: i.merge([ s ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
n ? a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), a.e.call({
block: function() {
a.e.call({
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
}) : (s.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), a.e.call({
block: function() {
s.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), s.push("</p>")), a.e.call({
block: function() {
a.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), a.e.call({
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
}), a.e.call({
block: function() {
a.b.call({
block: function() {
a.e.call({
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
}, "button"), n && a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
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
"class": (e = [ !0 ], i.joinClasses([ [ "login-form", n ? "_modal" : "_inline" ] ].map(i.joinClasses).map(function(t, s) {
return e[s] ? i.escape(t) : t;
})))
}
});
}.call(this, "bem" in n ? n.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in n ? n.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
158: function(t, e, s) {
"use strict";
function i(t) {
return null != t && "" !== t;
}
function a(t) {
return (Array.isArray(t) ? t.map(a) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(i).join(" ");
}
function n(t) {
return l[t] || t;
}
function o(t) {
var e = (t + "").replace(r, n);
return e === "" + t ? t : e;
}
e.merge = function c(t, e) {
if (1 === arguments.length) {
for (var s = t[0], a = 1; a < t.length; a++) s = c(s, t[a]);
return s;
}
var n = t.class, o = e.class;
(n || o) && (n = n || [], o = o || [], Array.isArray(n) || (n = [ n ]), Array.isArray(o) || (o = [ o ]), 
t.class = n.concat(o).filter(i));
for (var l in e) "class" != l && (t[l] = e[l]);
return t;
}, e.joinClasses = a, e.cls = function(t, s) {
for (var i = [], n = 0; n < t.length; n++) s && s[n] ? i.push(e.escape(a([ t[n] ]))) : i.push(a(t[n]));
var o = a(i);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, s, i, a) {
return "style" === t && (s = e.style(s)), "boolean" == typeof s || null == s ? s ? " " + (a ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof s ? (-1 !== JSON.stringify(s).indexOf("&"), 
s && "function" == typeof s.toISOString, " " + t + "='" + JSON.stringify(s).replace(/'/g, "&apos;") + "'") : i ? (s && "function" == typeof s.toISOString, 
" " + t + '="' + e.escape(s) + '"') : (s && "function" == typeof s.toISOString, 
" " + t + '="' + s + '"');
}, e.attrs = function(t, s) {
var i = [], n = Object.keys(t);
if (n.length) for (var o = 0; o < n.length; ++o) {
var l = n[o], r = t[l];
"class" == l ? (r = a(r)) && i.push(" " + l + '="' + r + '"') : i.push(e.attr(l, r, !1, s));
}
return i.join("");
};
var l = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, r = /[&<>"]/g;
e.escape = o, e.rethrow = function u(t, e, i, a) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || a)) throw t.message += " on line " + i, 
t;
try {
a = a || s(116).readFileSync(e, "utf8");
} catch (n) {
u(t, null, i);
}
var o = 3, l = a.split("\n"), r = Math.max(i - o, 0), c = Math.min(l.length, i + o), o = l.slice(r, c).map(function(t, e) {
var s = e + r + 1;
return (s == i ? "  > " : "    ") + s + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + i + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
159: function(t, e, s) {
var i = s(158);
t.exports = function(t) {
var e, s = [], a = {}, n = t || {};
return function(t, n) {
s.push("");
var o = [];
a.b = e = function(e, i, a) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, i, a);
}, a.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: i.merge([ s ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
n ? a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), a.e.call({
block: function() {
a.e.call({
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
}) : (s.push("<p>Если у вас уже есть аккаунт, вы можете&nbsp;"), a.e.call({
block: function() {
s.push("войти");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), s.push("</p>")), a.e.call({
block: function() {
a.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.b.call({
block: function() {
a.e.call({
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
}, "button"), n && a.e.call({
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
}), a.e.call({
block: function() {
s.push("Регистрируясь, вы принимаете" + i.escape(null == (e = " ") ? "" : e) + '<a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
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
"class": (e = [ !0 ], i.joinClasses([ [ "login-form", n ? "_modal" : "_inline" ] ].map(i.joinClasses).map(function(t, s) {
return e[s] ? i.escape(t) : t;
})))
}
});
}.call(this, "bem" in n ? n.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in n ? n.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
160: function(t, e, s) {
var i = s(158);
t.exports = function(t) {
var e, s = [], a = {}, n = t || {};
return function(t, n) {
s.push("");
var o = [];
a.b = e = function(e, i, a) {
this && this.block, this && this.attributes || {};
t.call(this, s, o, e, i, a);
}, a.e = e = function(t) {
var e = this && this.block, s = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: i.merge([ s ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
n ? a.e.call({
block: function() {
a.e.call({
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
}) : (s.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), a.e.call({
block: function() {
s.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), s.push("</p>")), a.e.call({
block: function() {
a.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.b.call({
block: function() {
a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.e.call({
block: function() {
s.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), s.push(i.escape(null == (e = " ") ? "" : e)), a.e.call({
block: function() {
s.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), n && a.e.call({
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
}), a.e.call({
block: function() {
a.e.call({
block: function() {
s.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
s.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), s.push(i.escape(null == (e = " ") ? "" : e)), a.b.call({
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
"class": (e = [ !0 ], i.joinClasses([ [ "login-form", n ? "_modal" : "_inline" ] ].map(i.joinClasses).map(function(t, s) {
return e[s] ? i.escape(t) : t;
})))
}
});
}.call(this, "bem" in n ? n.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in n ? n.inModal : "undefined" != typeof inModal ? inModal : void 0), 
s.join("");
};
},
161: function(t, e, s) {
"use strict";
function i(t) {
t.bem = a, t.thumb = n;
}
var a = s(162)(), n = s(163).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, i(e), t(e);
};
},
162: function(t, e, s) {
"use strict";
var i = s(158);
t.exports = function(t) {
function e(t, e, s, a, n) {
var o = n || "div";
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
t.push("<" + o + i.attrs(i.merge([ s ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(s, i, a, n) {
var o = this.block, l = this.attributes || {};
if (!l.class && a && !n) throw Error("Block without class: " + a);
if (l.class) {
var r = l.class;
r instanceof Array && (r = r.join(" ")), r = r.split(" ");
var c;
try {
c = r[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + r[0]);
}
n ? r[0] = i[i.length - 1] + t.element + r[0] : i[i.length] = c;
var b = (n ? i[i.length - 1] + t.element : "") + c;
-1 === r.indexOf(b) && (r[r.length] = b);
for (var p = 0; p < r.length; p++) {
var f = r[p];
f.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? r[p] = b + f : f.match(RegExp("^" + t.element)) && (i[i.length - 2] ? r[p] = i[i.length - 2] + f : r[p] = i[i.length - 1] + f), 
r[p].match(RegExp("^" + b + "($|(?=" + t.element + "|" + t.modifier + "))")) && (r[p] = t.prefix + r[p]);
}
l.class = r.sort().join(" ");
}
e(s, o, l, i, a), n || i.pop();
};
};
},
163: function(t, e) {
"use strict";
e.thumb = function(t, e, s) {
if (!t) return t;
var i = window.devicePixelRatio;
e *= i, s *= i;
var a = 160 >= e && 160 >= s ? "t" : 320 >= e && 320 >= s ? "m" : 640 >= e && 640 >= s ? "i" : 1024 >= e && 1024 >= s ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + a + t.slice(t.lastIndexOf("."));
};
}
});
//# sourceMappingURL=authClient-2.718527394608b9fb1793.js.map
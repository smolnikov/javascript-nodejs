webpackJsonp_name_([ 2 ], {
28: function(t, e, s) {
"use strict";
function n(t) {
function e(t, e) {
var s = new CustomEvent(t);
return s.originalEvent = e, s;
}
function s(t, s) {
var n = e("fail", s);
n.reason = t, a.dispatchEvent(n);
}
function n(t, s) {
var n = e("success", s);
n.result = t, a.dispatchEvent(n);
}
var a = new XMLHttpRequest(), o = t.method || "GET", r = t.body, l = t.url;
a.open(o, l, t.sync ? !1 : !0), a.method = o;
var c = i();
c && !t.skipCsrf && a.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(r) && (a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), t.noDocumentEvents || (a.addEventListener("loadstart", function(t) {
a.timeStart = Date.now();
var s = e("xhrstart", t);
document.dispatchEvent(s);
}), a.addEventListener("loadend", function(t) {
var s = e("xhrend", t);
document.dispatchEvent(s);
}), a.addEventListener("success", function(t) {
var s = e("xhrsuccess", t);
s.result = t.result, document.dispatchEvent(s);
}), a.addEventListener("fail", function(t) {
var s = e("xhrfail", t);
s.reason = t.reason, document.dispatchEvent(s);
})), t.raw || a.setRequestHeader("Accept", "application/json"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = t.normalStatuses || [ 200 ];
return a.addEventListener("error", function(t) {
s("Ошибка связи с сервером.", t);
}), a.addEventListener("timeout", function(t) {
s("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), a.addEventListener("abort", function(t) {
s("Запрос был прерван.", t);
}), a.addEventListener("load", function(e) {
if (!a.status) return void s("Не получен ответ от сервера.", e);
if (-1 == u.indexOf(a.status)) return void s("Ошибка на стороне сервера (код " + a.status + "), попытайтесь позднее", e);
var i = a.responseText, o = a.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
i = JSON.parse(i);
} catch (e) {
return void s("Некорректный формат ответа от сервера", e);
}
n(i, e);
}), setTimeout(function() {
a.send(r);
}, 0), a;
}
var a = s(23), i = s(77);
document.addEventListener("xhrfail", function(t) {
new a.Error(t.reason);
}), t.exports = n;
},
49: function(t, e, s) {
"use strict";
function n(t) {
t.bem = a, t.thumb = i;
}
var a = s(78)(), i = s(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, n(e), t(e);
};
},
56: function(t, e) {
"use strict";
e.thumb = function(t, e, s) {
if (!t) return t;
var n = window.devicePixelRatio;
e *= n, s *= n;
var a = 160 >= e && 160 >= s ? "t" : 320 >= e && 320 >= s ? "m" : 640 >= e && 640 >= s ? "i" : 1024 >= e && 1024 >= s ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + a + t.slice(t.lastIndexOf("."));
};
},
59: function(t, e, s) {
"use strict";
e.AuthModal = s(84);
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
78: function(t, e, s) {
"use strict";
var n = s(108);
t.exports = function(t) {
function e(t, e, s, a, i) {
var o = i || "div";
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
function(s, n, a, i) {
var o = this.block, r = this.attributes || {};
if (!r.class && a && !i) throw Error("Block without class: " + a);
if (r.class) {
var l = r.class;
l instanceof Array && (l = l.join(" ")), l = l.split(" ");
var c;
try {
c = l[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + l[0]);
}
i ? l[0] = n[n.length - 1] + t.element + l[0] : n[n.length] = c;
var f = (i ? n[n.length - 1] + t.element : "") + c;
-1 === l.indexOf(f) && (l[l.length] = f);
for (var d = 0; d < l.length; d++) {
var p = l[d];
p.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? l[d] = f + p : p.match(RegExp("^" + t.element)) && (n[n.length - 2] ? l[d] = n[n.length - 2] + p : l[d] = n[n.length - 1] + p), 
l[d].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (l[d] = t.prefix + l[d]);
}
r.class = l.sort().join(" ");
}
e(s, o, r, n, a), i || n.pop();
};
};
},
84: function(t, e, s) {
"use strict";
function n(t) {
o.apply(this, arguments), t = t || {}, t.successRedirect || (t.successRedirect = window.location.href);
this.options = t, this.setContent(f(l)), t.message && this.showFormMessage(t.message, "info"), 
this.initEventHandlers();
}
var a = s(28), i = s(27), o = s(10), r = s(53), l = s(113), c = s(114), u = s(115), f = s(49);
n.prototype = Object.create(o.prototype), i.delegateMixin(n.prototype), n.prototype.render = function() {
o.prototype.render.apply(this, arguments), this.elem.classList.add("login-form-modal");
}, n.prototype.successRedirect = function() {
window.location.href == this.options.successRedirect ? window.location.reload() : window.location.href = this.options.successRedirect;
}, n.prototype.clearFormMessages = function() {
[].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function(t) {
t.classList.remove("text-input_invalid");
}), [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function(t) {
t.remove();
}), this.elem.querySelector("[data-notification]").innerHTML = "";
}, n.prototype.request = function(t) {
var e = a(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}, n.prototype.startRequestIndication = function() {
this.showOverlay();
var t = this, e = this.elem.querySelector('[type="submit"]');
if (e) {
var s = new r({
elem: e,
size: "small",
"class": "",
elemClass: "button_loading"
});
s.start();
}
return function() {
t.hideOverlay(), s && s.stop();
};
}, n.prototype.initEventHandlers = function() {
this.delegate('[data-switch="register-form"]', "click", function(t) {
t.preventDefault(), this.setContent(f(c));
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.setContent(f(l));
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.setContent(f(u));
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
}), a = this;
n.addEventListener("success", function(t) {
200 == this.status ? a.showFormMessage("\n        <p>Письмо-подтверждение отправлено ещё раз.</p>\n        <p><a href='#' data-action-verify-email='" + s + "'>перезапросить подтверждение.</a></p>\n        ", "success") : a.showFormMessage(t.result, "error");
});
});
}, n.prototype.submitRegisterForm = function(t) {
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
}), a = this;
n.addEventListener("success", function(e) {
if (201 == this.status) return a.setContent(f(l)), void a.showFormMessage("<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>", "success");
if (400 != this.status) a.showFormMessage("Неизвестный статус ответа сервера", "error"); else for (var s in e.result.errors) a.showInputError(t.elements[s], e.result.errors[s]);
});
}
}, n.prototype.submitForgotForm = function(t) {
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
}), a = this;
n.addEventListener("success", function(t) {
200 == this.status ? (a.setContent(f(l)), a.showFormMessage(t.result, "success")) : 404 == this.status ? a.showFormMessage(t.result, "error") : 403 == this.status && a.showFormMessage(t.result.message || "Действие запрещено.", "error");
});
}
}, n.prototype.showInputError = function(t, e) {
t.parentNode.classList.add("text-input_invalid");
var s = document.createElement("span");
s.className = "text-input__err", s.innerHTML = e, t.parentNode.appendChild(s);
}, n.prototype.showFormMessage = function(t, e) {
if (0 !== t.indexOf("<p>") && (t = "<p>" + t + "</p>"), -1 == [ "info", "error", "warning", "success" ].indexOf(e)) throw Error("Unsupported type: " + e);
var s = document.createElement("div");
s.className = "login-form__" + e, s.innerHTML = t, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(s);
}, n.prototype.submitLoginForm = function(t) {
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
}, n.prototype.openAuthPopup = function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, s = 600, n = (window.outerHeight - s) / 2, a = (window.outerWidth - e) / 2;
window.authModal = this, this.authPopup = window.open(t, "authModal", "width=" + e + ",height=" + s + ",scrollbars=0,top=" + n + ",left=" + a);
}, n.prototype.onAuthSuccess = function(t) {
window.currentUser = t, this.options.callback ? this.options.callback() : this.successRedirect();
}, n.prototype.onAuthFailure = function(t) {
this.showFormMessage(t || "Отказ в авторизации.", "error");
}, t.exports = n;
},
108: function(t, e, s) {
"use strict";
function n(t) {
return null != t && "" !== t;
}
function a(t) {
return (Array.isArray(t) ? t.map(a) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(n).join(" ");
}
e.merge = function i(t, e) {
if (1 === arguments.length) {
for (var s = t[0], a = 1; a < t.length; a++) s = i(s, t[a]);
return s;
}
var o = t.class, r = e.class;
(o || r) && (o = o || [], r = r || [], Array.isArray(o) || (o = [ o ]), Array.isArray(r) || (r = [ r ]), 
t.class = o.concat(r).filter(n));
for (var l in e) "class" != l && (t[l] = e[l]);
return t;
}, e.joinClasses = a, e.cls = function(t, s) {
for (var n = [], i = 0; i < t.length; i++) s && s[i] ? n.push(e.escape(a([ t[i] ]))) : n.push(a(t[i]));
var o = a(n);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, s, n, a) {
return "style" === t && (s = e.style(s)), "boolean" == typeof s || null == s ? s ? " " + (a ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof s ? (-1 !== JSON.stringify(s).indexOf("&"), 
s && "function" == typeof s.toISOString, " " + t + "='" + JSON.stringify(s).replace(/'/g, "&apos;") + "'") : n ? (s && "function" == typeof s.toISOString, 
" " + t + '="' + e.escape(s) + '"') : (s && "function" == typeof s.toISOString, 
" " + t + '="' + s + '"');
}, e.attrs = function(t, s) {
var n = [], i = Object.keys(t);
if (i.length) for (var o = 0; o < i.length; ++o) {
var r = i[o], l = t[r];
"class" == r ? (l = a(l)) && n.push(" " + r + '="' + l + '"') : n.push(e.attr(r, l, !1, s));
}
return n.join("");
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function o(t, e, n, a) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || a)) throw t.message += " on line " + n, 
t;
try {
a = a || s(116).readFileSync(e, "utf8");
} catch (i) {
o(t, null, n);
}
var r = 3, l = a.split("\n"), c = Math.max(n - r, 0), u = Math.min(l.length, n + r), r = l.slice(c, u).map(function(t, e) {
var s = e + c + 1;
return (s == n ? "  > " : "    ") + s + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + n + "\n" + r + "\n\n" + t.message, 
t;
};
},
113: function(t, e, s) {
var n = s(108);
t.exports = function(t) {
var e = [], s = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
s.b = function(s, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, s, n, i);
}, s.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
s.b.call({
block: function() {
e && e();
},
attributes: n.merge([ a ])
}, t, !0);
}, s.b.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Вход в систему");
},
attributes: {
"class": "title"
}
}, "h4"), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("регистрация");
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
}), s.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
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
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), s.e.call({
block: function() {
e.push("Забыли?");
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
}), s.e.call({
block: function() {
s.b.call({
block: function() {
s.e.call({
block: function() {
e.push("Войти");
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
}, "button"), s.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), s.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Яндекс");
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
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
114: function(t, e, s) {
var n = s(108);
t.exports = function(t) {
var e = [], s = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
s.b = function(s, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, s, n, i);
}, s.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
s.b.call({
block: function() {
e && e();
},
attributes: n.merge([ a ])
}, t, !0);
}, s.b.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("вход");
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
}), s.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
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
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
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
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
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
}), s.e.call({
block: function() {
s.b.call({
block: function() {
s.e.call({
block: function() {
e.push("Зарегистрироваться");
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
}, "button"), s.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), s.e.call({
block: function() {
e.push('Регистрируясь, вы принимаете <a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), s.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Яндекс");
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
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
115: function(t, e, s) {
var n = s(108);
t.exports = function(t) {
var e = [], s = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
s.b = function(s, n, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, s, n, i);
}, s.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
s.b.call({
block: function() {
e && e();
},
attributes: n.merge([ a ])
}, t, !0);
}, s.b.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}), s.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), s.b.call({
block: function() {
s.e.call({
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
}), s.e.call({
block: function() {
s.b.call({
block: function() {
s.e.call({
block: function() {
e.push("Восстановить пароль");
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
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), e.push(" "), s.e.call({
block: function() {
e.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), e.push(" "), s.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), s.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), s.e.call({
block: function() {
s.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), s.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), s.b.call({
block: function() {
e.push("Яндекс");
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
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
116: function() {}
});
//# sourceMappingURL=authClient-2.1596ada92cf8abbe2606.js.map
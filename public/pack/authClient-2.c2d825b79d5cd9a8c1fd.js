webpackJsonp_name_([ 2 ], {
28: function(t, e, n) {
"use strict";
function s(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var s = e("fail", n);
s.reason = t, a.dispatchEvent(s);
}
function s(t, n) {
var s = e("success", n);
s.result = t, a.dispatchEvent(s);
}
var a = new XMLHttpRequest(), o = t.method || "GET", l = t.body, r = t.url;
a.open(o, r, t.sync ? !1 : !0), a.method = o;
var c = i();
c && !t.skipCsrf && a.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(l) && (a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
l = JSON.stringify(l)), t.noDocumentEvents || (a.addEventListener("loadstart", function(t) {
a.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), a.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), a.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), a.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || a.setRequestHeader("Accept", "application/json"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = t.normalStatuses || [ 200 ];
return a.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), a.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), a.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), a.addEventListener("load", function(e) {
if (!a.status) return void n("Не получен ответ от сервера.", e);
if (-1 == u.indexOf(a.status)) return void n("Ошибка на стороне сервера (код " + a.status + "), попытайтесь позднее.", e);
var i = a.responseText, o = a.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
i = JSON.parse(i);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
s(i, e);
}), setTimeout(function() {
a.send(l);
}, 0), a;
}
var a = n(23), i = n(77);
document.addEventListener("xhrfail", function(t) {
new a.Error(t.reason);
}), t.exports = s;
},
49: function(t, e, n) {
"use strict";
function s(t) {
t.bem = a, t.thumb = i;
}
var a = n(78)(), i = n(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, s(e), t(e);
};
},
56: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var s = window.devicePixelRatio;
e *= s, n *= s;
var a = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + a + t.slice(t.lastIndexOf("."));
};
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
78: function(t, e, n) {
"use strict";
var s = n(108);
t.exports = function(t) {
function e(t, e, n, a, i) {
var o = i || "div";
switch (o) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
t.push("<" + o + s.attrs(s.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, s, a, i) {
var o = this.block, l = this.attributes || {};
if (!l.class && a && !i) throw Error("Block without class: " + a);
if (l.class) {
var r = l.class;
r instanceof Array && (r = r.join(" ")), r = r.split(" ");
var c;
try {
c = r[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + r[0]);
}
i ? r[0] = s[s.length - 1] + t.element + r[0] : s[s.length] = c;
var f = (i ? s[s.length - 1] + t.element : "") + c;
-1 === r.indexOf(f) && (r[r.length] = f);
for (var p = 0; p < r.length; p++) {
var d = r[p];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? r[p] = f + d : d.match(RegExp("^" + t.element)) && (s[s.length - 2] ? r[p] = s[s.length - 2] + d : r[p] = s[s.length - 1] + d), 
r[p].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (r[p] = t.prefix + r[p]);
}
l.class = r.sort().join(" ");
}
e(n, o, l, s, a), i || s.pop();
};
};
},
84: function(t, e, n) {
"use strict";
function s(t, e) {
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
var i = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var s = e[n];
s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
Object.defineProperty(t, s.key, s);
}
}
return function(e, n, s) {
return n && t(e.prototype, n), s && t(e, s), e;
};
}(), o = function(t, e, n) {
for (var s = !0; s; ) {
var a = t, i = e, o = n;
l = c = r = void 0, s = !1, null === a && (a = Function.prototype);
var l = Object.getOwnPropertyDescriptor(a, i);
if (void 0 !== l) {
if ("value" in l) return l.value;
var r = l.get;
return void 0 === r ? void 0 : r.call(o);
}
var c = Object.getPrototypeOf(a);
if (null === c) return void 0;
t = c, e = i, n = o, s = !0;
}
}, l = n(10), r = n(128), c = function(t) {
function e(t) {
s(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {}, this.options.inModal = !0;
var n = new r(this.options);
this.setContent(n.getElem());
}
return a(e, t), i(e, [ {
key: "render",
value: function() {
o(Object.getPrototypeOf(e.prototype), "render", this).call(this), this.elem.classList.add("login-form-modal");
}
} ]), e;
}(l);
t.exports = c;
},
108: function(t, e, n) {
"use strict";
function s(t) {
return null != t && "" !== t;
}
function a(t) {
return (Array.isArray(t) ? t.map(a) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(s).join(" ");
}
function i(t) {
return l[t] || t;
}
function o(t) {
var e = (t + "").replace(r, i);
return e === "" + t ? t : e;
}
e.merge = function c(t, e) {
if (1 === arguments.length) {
for (var n = t[0], a = 1; a < t.length; a++) n = c(n, t[a]);
return n;
}
var i = t.class, o = e.class;
(i || o) && (i = i || [], o = o || [], Array.isArray(i) || (i = [ i ]), Array.isArray(o) || (o = [ o ]), 
t.class = i.concat(o).filter(s));
for (var l in e) "class" != l && (t[l] = e[l]);
return t;
}, e.joinClasses = a, e.cls = function(t, n) {
for (var s = [], i = 0; i < t.length; i++) n && n[i] ? s.push(e.escape(a([ t[i] ]))) : s.push(a(t[i]));
var o = a(s);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, s, a) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (a ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : s ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var s = [], i = Object.keys(t);
if (i.length) for (var o = 0; o < i.length; ++o) {
var l = i[o], r = t[l];
"class" == l ? (r = a(r)) && s.push(" " + l + '="' + r + '"') : s.push(e.attr(l, r, !1, n));
}
return s.join("");
};
var l = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, r = /[&<>"]/g;
e.escape = o, e.rethrow = function u(t, e, s, a) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || a)) throw t.message += " on line " + s, 
t;
try {
a = a || n(116).readFileSync(e, "utf8");
} catch (i) {
u(t, null, s);
}
var o = 3, l = a.split("\n"), r = Math.max(s - o, 0), c = Math.min(l.length, s + o), o = l.slice(r, c).map(function(t, e) {
var n = e + r + 1;
return (n == s ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + s + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
113: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e, n = [], a = {}, i = t || {};
return function(t, i) {
n.push("");
var o = [];
a.b = e = function(e, s, a) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, s, a);
}, a.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: s.merge([ n ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
i ? a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("регистрация");
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
}) : (n.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), a.e.call({
block: function() {
n.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), n.push("</p>")), a.e.call({
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
n.push("Email:");
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
n.push("Пароль:");
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
n.push("Забыли?");
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
n.push("Войти");
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
}, "button"), i && a.e.call({
block: function() {
n.push("Отмена");
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
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Яндекс");
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
"class": (e = [ !0 ], s.joinClasses([ [ "login-form", i ? "_modal" : "_inline" ] ].map(s.joinClasses).map(function(t, n) {
return e[n] ? s.escape(t) : t;
})))
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in i ? i.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
114: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e, n = [], a = {}, i = t || {};
return function(t, i) {
n.push("");
var o = [];
a.b = e = function(e, s, a) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, s, a);
}, a.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: s.merge([ n ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
i ? a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("вход");
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
}) : (n.push("<p>Если у вас уже есть аккаунт, вы можете&nbsp;"), a.e.call({
block: function() {
n.push("войти");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), n.push("</p>")), a.e.call({
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
n.push("Email:");
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
n.push("Имя пользователя:");
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
n.push("Пароль:");
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
n.push("Зарегистрироваться");
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
}, "button"), i && a.e.call({
block: function() {
n.push("Отмена");
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
n.push("Регистрируясь, вы принимаете" + s.escape(null == (e = " ") ? "" : e) + '<a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Яндекс");
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
"class": (e = [ !0 ], s.joinClasses([ [ "login-form", i ? "_modal" : "_inline" ] ].map(s.joinClasses).map(function(t, n) {
return e[n] ? s.escape(t) : t;
})))
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in i ? i.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
115: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e, n = [], a = {}, i = t || {};
return function(t, i) {
n.push("");
var o = [];
a.b = e = function(e, s, a) {
this && this.block, this && this.attributes || {};
t.call(this, n, o, e, s, a);
}, a.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
a.b.call({
block: function() {
e && e();
},
attributes: s.merge([ n ])
}, t, !0);
}, a.b.call({
block: function() {
a.e.call({
block: function() {
i ? a.e.call({
block: function() {
a.e.call({
block: function() {
n.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}) : (n.push("<p>Если у вас еще нет аккаунта, вы можете&nbsp;"), a.e.call({
block: function() {
n.push("зарегистрироваться");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button"), n.push("</p>")), a.e.call({
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
n.push("Email:");
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
n.push("Восстановить пароль");
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
n.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.e.call({
block: function() {
n.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), n.push(s.escape(null == (e = " ") ? "" : e)), a.e.call({
block: function() {
n.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), i && a.e.call({
block: function() {
n.push("Отмена");
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
n.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), n.push(s.escape(null == (e = " ") ? "" : e)), a.b.call({
block: function() {
n.push("Яндекс");
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
"class": (e = [ !0 ], s.joinClasses([ [ "login-form", i ? "_modal" : "_inline" ] ].map(s.joinClasses).map(function(t, n) {
return e[n] ? s.escape(t) : t;
})))
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0, "inModal" in i ? i.inModal : "undefined" != typeof inModal ? inModal : void 0), 
n.join("");
};
},
116: function() {},
128: function(t, e, n) {
"use strict";
function s(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var a = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var s = e[n];
s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
Object.defineProperty(t, s.key, s);
}
}
return function(e, n, s) {
return n && t(e.prototype, n), s && t(e, s), e;
};
}(), i = n(28), o = n(27), l = n(53), r = n(113), c = n(114), u = n(115), f = n(49), p = function() {
function t(e) {
s(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return a(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = f(r, this.options), 
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
var e = i(t);
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
var n = new l({
elem: e,
size: "small",
"class": "",
elemClass: "button_loading"
});
n.start();
}
return function() {
t.elem.classList.remove("modal-overlay_light"), n && n.stop();
};
}
}, {
key: "initEventHandlers",
value: function() {
this.delegate('[data-switch="register-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = f(c, this.options);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = f(r, this.options);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = f(u, this.options);
var n = this.elem.querySelector('[type="email"]');
n.value = e.value;
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
var e = new FormData(), n = t.delegateTarget.dataset.actionVerifyEmail;
e.append("email", n);
var s = this.request({
method: "POST",
url: "/auth/reverify",
body: e
}), a = this;
s.addEventListener("success", function(t) {
200 == this.status ? a.showFormMessage({
html: "\n            <p>Письмо-подтверждение отправлено ещё раз.</p>\n            <p><a href='#' data-action-verify-email='" + n + "'>перезапросить подтверждение.</a></p>\n            ",
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
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var s = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: n
}), a = this;
s.addEventListener("success", function(e) {
if (201 == this.status) return a.elem.innerHTML = f(r, a.options), void a.showFormMessage({
html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>",
type: "success"
});
if (400 != this.status) a.showFormMessage({
html: "Неизвестный статус ответа сервера",
type: "error"
}); else for (var n in e.result.errors) a.showInputError(t.elements[n], e.result.errors[n]);
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
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var s = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404, 403 ],
body: n
}), a = this;
s.addEventListener("success", function(t) {
200 == this.status ? (a.elem.innerHTML = f(r, a.options), a.showFormMessage({
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
var n = document.createElement("span");
n.className = "text-input__err", n.innerHTML = e, t.parentNode.appendChild(n);
}
}, {
key: "showFormMessage",
value: function(t) {
var e = t.html;
0 !== e.indexOf("<p>") && (e = "<p>" + e + "</p>");
var n = t.type;
if (-1 == [ "info", "error", "warning", "success" ].indexOf(n)) throw Error("Unsupported type: " + n);
var s = document.createElement("div");
s.className = "login-form__" + n, s.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(s);
}
}, {
key: "submitLoginForm",
value: function(t) {
var e = this;
this.clearFormMessages();
var n = !1;
if (t.elements.email.value || (n = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.password.value || (n = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!n) {
var s = i({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(t)
}), a = this.startRequestIndication();
s.addEventListener("success", function(t) {
return 401 == s.status ? (a(), void e.onAuthFailure(t.result.message)) : void (e.options.callback ? (a(), 
e.onAuthSuccess(t.result.user)) : e.onAuthSuccess(t.result.user));
}), s.addEventListener("fail", function(t) {
a(), e.onAuthFailure(t.reason);
});
}
}
}, {
key: "openAuthPopup",
value: function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, n = 600, s = (window.outerHeight - n) / 2, a = (window.outerWidth - e) / 2;
window.authForm = this, this.authPopup = window.open(t, "authForm", "width=" + e + ",height=" + n + ",scrollbars=0,top=" + s + ",left=" + a);
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
}
});
//# sourceMappingURL=authClient-2.c2d825b79d5cd9a8c1fd.js.map
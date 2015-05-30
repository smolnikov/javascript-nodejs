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
var a = new XMLHttpRequest(), o = t.method || "GET", r = t.body, l = t.url;
a.open(o, l, t.sync ? !1 : !0), a.method = o;
var c = i();
c && !t.skipCsrf && a.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(r) && (a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), t.noDocumentEvents || (a.addEventListener("loadstart", function(t) {
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
if (-1 == u.indexOf(a.status)) return void n("Ошибка на стороне сервера (код " + a.status + "), попытайтесь позднее", e);
var i = a.responseText, o = a.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
i = JSON.parse(i);
} catch (e) {
return void n("Некорректный формат ответа от сервера", e);
}
s(i, e);
}), setTimeout(function() {
a.send(r);
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
i ? l[0] = s[s.length - 1] + t.element + l[0] : s[s.length] = c;
var f = (i ? s[s.length - 1] + t.element : "") + c;
-1 === l.indexOf(f) && (l[l.length] = f);
for (var b = 0; b < l.length; b++) {
var d = l[b];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? l[b] = f + d : d.match(RegExp("^" + t.element)) && (s[s.length - 2] ? l[b] = s[s.length - 2] + d : l[b] = s[s.length - 1] + d), 
l[b].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (l[b] = t.prefix + l[b]);
}
r.class = l.sort().join(" ");
}
e(n, o, r, s, a), i || s.pop();
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
}), e && (t.__proto__ = e);
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
r = c = l = void 0, s = !1;
var r = Object.getOwnPropertyDescriptor(a, i);
if (void 0 !== r) {
if ("value" in r) return r.value;
var l = r.get;
return void 0 === l ? void 0 : l.call(o);
}
var c = Object.getPrototypeOf(a);
if (null === c) return void 0;
t = c, e = i, n = o, s = !0;
}
}, r = n(10), l = n(128), c = function(t) {
function e(t) {
s(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {};
var n = new l(this.options);
this.setContent(n.getElem());
}
return a(e, t), i(e, [ {
key: "render",
value: function() {
o(Object.getPrototypeOf(e.prototype), "render", this).call(this), this.elem.classList.add("login-form-modal");
}
} ]), e;
}(r);
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
e.merge = function i(t, e) {
if (1 === arguments.length) {
for (var n = t[0], a = 1; a < t.length; a++) n = i(n, t[a]);
return n;
}
var o = t.class, r = e.class;
(o || r) && (o = o || [], r = r || [], Array.isArray(o) || (o = [ o ]), Array.isArray(r) || (r = [ r ]), 
t.class = o.concat(r).filter(s));
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
var r = i[o], l = t[r];
"class" == r ? (l = a(l)) && s.push(" " + r + '="' + l + '"') : s.push(e.attr(r, l, !1, n));
}
return s.join("");
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function o(t, e, s, a) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || a)) throw t.message += " on line " + s, 
t;
try {
a = a || n(116).readFileSync(e, "utf8");
} catch (i) {
o(t, null, s);
}
var r = 3, l = a.split("\n"), c = Math.max(s - r, 0), u = Math.min(l.length, s + r), r = l.slice(c, u).map(function(t, e) {
var n = e + c + 1;
return (n == s ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + s + "\n" + r + "\n\n" + t.message, 
t;
};
},
113: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e = [], n = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
n.b = function(n, s, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, n, s, i);
}, n.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: s.merge([ a ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
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
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
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
e.push("Пароль:");
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
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
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
}, "button"), n.e.call({
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
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
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
114: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e = [], n = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
n.b = function(n, s, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, n, s, i);
}, n.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: s.merge([ a ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
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
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
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
e.push("Имя пользователя:");
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
e.push("Пароль:");
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
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
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
}, "button"), n.e.call({
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
}), n.e.call({
block: function() {
e.push('Регистрируясь, вы принимаете <a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
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
115: function(t, e, n) {
var s = n(108);
t.exports = function(t) {
var e = [], n = {}, a = t || {};
return function(t) {
e.push("");
var a = [];
n.b = function(n, s, i) {
this && this.block, this && this.attributes || {};
t.call(this, e, a, n, s, i);
}, n.e = function(t) {
var e = this && this.block, a = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: s.merge([ a ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
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
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
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
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), e.push(" "), n.e.call({
block: function() {
e.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), e.push(" "), n.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), n.e.call({
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
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
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
}(), i = n(28), o = n(27), r = n(53), l = n(113), c = n(114), u = n(115), f = n(49), b = function() {
function t(e) {
s(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return a(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = f(l), this.options.message && this.showFormMessage(this.options.message), 
this.initEventHandlers();
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
var n = new r({
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
t.preventDefault(), this.elem.innerHTML = f(c);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = f(l);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = f(u);
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
if (201 == this.status) return a.elem.innerHTML = f(l), void a.showFormMessage({
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
200 == this.status ? (a.elem.innerHTML = f(l), a.showFormMessage({
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
o.delegateMixin(b.prototype), t.exports = b;
}
});
//# sourceMappingURL=authClient-2.258747a8aab739d1b709.js.map
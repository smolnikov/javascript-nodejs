var webpackScreencast = webpackJsonp_name_([ 23 ], {
0: function(e, t, n) {
"use strict";
function s() {
r(), i();
}
function i() {
var e = document.querySelector("[data-newsletter-subscribe-form]");
e && (e.onsubmit = function(t) {
t.preventDefault(), u.submitSubscribeForm(e);
});
}
function r() {
for (var e = document.querySelectorAll("li[data-mnemo]"), t = 0; t < e.length; t++) {
var n = e[t], s = n.getAttribute("data-mnemo");
n.insertAdjacentHTML("beforeEnd", '<div class="lessons-list__download"><div class="lessons-list__popup"><ul class="lessons-list__popup-list"><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4-low/' + s + '.mp4">Компактный размер</a></li><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4/' + s + '.mp4">Высокое качество</a></li></ul></div></div>');
}
for (var i = document.querySelectorAll("a[data-video-id]"), t = 0; t < i.length; t++) {
var r = i[t];
r.onclick = function(e) {
e.preventDefault();
var t = this.getAttribute("data-video-id");
window.ga("send", "event", "webpack-screencast", "open", t, {
hitCallback: d(function() {
a(t);
})
});
};
}
}
function a(e) {
for (var t = [ {
width: 0,
height: 0
}, {
width: 640,
height: 360
}, {
width: 853,
height: 480
}, {
width: 1280,
height: 720
} ], n = 0; n < t.length && !(document.documentElement.clientHeight < t[n].height || document.documentElement.clientWidth < t[n].width); n++) ;
n--;
var s = t[n].width, i = t[n].height;
if (0 === n) window.location.href = "//www.youtube.com/watch?v=" + e; else {
var r = new l();
if (r.setContent('<div id="player"></div>'), r.elem.addEventListener("modal-remove", function() {
c && (c.destroy(), c = null);
}), window.YT) o(e, s, i); else {
var a = document.createElement("script");
a.src = "https://www.youtube.com/iframe_api", document.head.appendChild(a), window.onYouTubeIframeAPIReady = function() {
o(e, s, i), delete window.onYouTubeIframeAPIReady;
};
}
}
}
function o(e, t, n) {
c && c.destroy(), c = new window.YT.Player("player", {
height: n,
width: t,
videoId: e,
events: {
onReady: function() {
c.playVideo();
},
onStateChange: function(s) {
document.querySelectorAll("[data-video-id]");
if (1 == s.data && (c.videoId = e), 0 == s.data) for (var i = document.querySelectorAll("[data-video-id]"), r = 0; r < i.length; r++) {
var a = i[r];
if (a.getAttribute("data-video-id") == c.videoId) {
var l = i[r + 1] && i[r + 1].getAttribute("data-video-id");
l && o(l, t, n);
break;
}
}
}
}
});
}
var c, l = n(153), u = (n(161), n(164)), d = n(209);
s();
},
116: function(e, t) {},
150: function(e, t) {
"use strict";
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
var e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, e.exports = n;
},
155: function(e, t, n) {
"use strict";
function s(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var s = t("fail", n);
s.reason = e, i.dispatchEvent(s);
}
function s(e, n) {
var s = t("success", n);
s.result = e, i.dispatchEvent(s);
}
var i = new XMLHttpRequest(), a = e.method || "GET", o = e.body, c = e.url;
i.open(a, c, e.sync ? !1 : !0), i.method = a;
var l = r();
l && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", l), "[object Object]" == {}.toString.call(o) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
o = JSON.stringify(o)), e.noDocumentEvents || (i.addEventListener("loadstart", function(e) {
i.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), i.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", t);
var r = i.responseText, a = i.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
s(r, t);
}), setTimeout(function() {
i.send(o);
}, 0), i;
}
var i = n(147), r = n(156);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = s;
},
156: function(e, t) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
158: function(e, t, n) {
"use strict";
function s(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(s).join(" ");
}
function r(e) {
return o[e] || e;
}
function a(e) {
var t = (e + "").replace(c, r);
return t === "" + e ? e : t;
}
t.merge = function l(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = l(n, e[i]);
return n;
}
var r = e.class, a = t.class;
(r || a) && (r = r || [], a = a || [], Array.isArray(r) || (r = [ r ]), Array.isArray(a) || (a = [ a ]), 
e.class = r.concat(a).filter(s));
for (var o in t) "class" != o && (e[o] = t[o]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var s = [], r = 0; r < e.length; r++) n && n[r] ? s.push(t.escape(i([ e[r] ]))) : s.push(i(e[r]));
var a = i(s);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, s, i) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : s ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var s = [], r = Object.keys(e);
if (r.length) for (var a = 0; a < r.length; ++a) {
var o = r[a], c = e[o];
"class" == o ? (c = i(c)) && s.push(" " + o + '="' + c + '"') : s.push(t.attr(o, c, !1, n));
}
return s.join("");
};
var o = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
t.escape = a, t.rethrow = function u(e, t, s, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + s, 
e;
try {
i = i || n(116).readFileSync(t, "utf8");
} catch (r) {
u(e, null, s);
}
var a = 3, o = i.split("\n"), c = Math.max(s - a, 0), l = Math.min(o.length, s + a), a = o.slice(c, l).map(function(e, t) {
var n = t + c + 1;
return (n == s ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + s + "\n" + a + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
},
161: function(e, t, n) {
"use strict";
function s(e) {
e.bem = i, e.thumb = r;
}
var i = n(162)(), r = n(163).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, s(t), e(t);
};
},
162: function(e, t, n) {
"use strict";
var s = n(158);
e.exports = function(e) {
function t(e, t, n, i, r) {
var a = r || "div";
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
e.push("<" + a + s.attrs(s.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && e.push("</" + a + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, s, i, r) {
var a = this.block, o = this.attributes || {};
if (!o.class && i && !r) throw Error("Block without class: " + i);
if (o.class) {
var c = o.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var l;
try {
l = c[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + c[0]);
}
r ? c[0] = s[s.length - 1] + e.element + c[0] : s[s.length] = l;
var d = (r ? s[s.length - 1] + e.element : "") + l;
-1 === c.indexOf(d) && (c[c.length] = d);
for (var f = 0; f < c.length; f++) {
var m = c[f];
m.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? c[f] = d + m : m.match(RegExp("^" + e.element)) && (s[s.length - 2] ? c[f] = s[s.length - 2] + m : c[f] = s[s.length - 1] + m), 
c[f].match(RegExp("^" + d + "($|(?=" + e.element + "|" + e.modifier + "))")) && (c[f] = e.prefix + c[f]);
}
o.class = c.sort().join(" ");
}
t(n, a, o, s, i), r || s.pop();
};
};
},
163: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var s = window.devicePixelRatio;
t *= s, n *= s;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
},
164: function(e, t, n) {
"use strict";
function s(e, t) {
if (e.elements.email.value) {
var n = e.elements.slug, s = [];
if (n.length) for (var o = 0; o < n.length; o++) {
var c = n[o];
c.checked && s.push(c.value);
} else s.push(n.value);
if (!s.length) return void new a.Info("Выберите рассылки из списка.");
var l = {
email: e.elements.email.value,
slug: s
}, u = r({
method: "POST",
url: e.action,
body: l
}), d = e.querySelector('[type="submit"]'), f = new i({
elem: d,
size: "small",
elemClass: "button_loading"
});
f.start(), d.disabled = !0, u.addEventListener("loadend", function() {
f.stop(), d.disabled = !1;
});
var m = e.getAttribute("data-newsletter-subscribe-form");
u.addEventListener("success", function(n) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: m
}), window.ga("send", "event", "newsletter", "subscribe", m), new a.Success(n.result.message, "slow"), 
e.elements.email.value = "", t && t()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: m
}), window.ga("send", "event", "newsletter", "subscribe-fail", m), new a.Error(n.result.message));
});
}
}
var i = n(150), r = n(155), a = n(147);
t.submitSubscribeForm = s;
},
209: function(e, t) {
"use strict";
e.exports = function(e) {
function t() {
t.wasCalled || (t.wasCalled = !0, e());
}
return setTimeout(t, 500), t;
};
}
});
//# sourceMappingURL=webpackScreencast.ab47d31a5bdad3ba4b57.js.map
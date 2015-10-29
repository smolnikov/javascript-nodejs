var webpackScreencast = webpackJsonp_name_([ 23 ], {
0: function(t, e, n) {
"use strict";
function r() {
a(), i();
}
function i() {
var t = document.querySelector("[data-newsletter-subscribe-form]");
t && (t.onsubmit = function(e) {
e.preventDefault(), l.submitSubscribeForm(t);
});
}
function a() {
for (var t = document.querySelectorAll("li[data-mnemo]"), e = 0; e < t.length; e++) {
var n = t[e], r = n.getAttribute("data-mnemo");
n.insertAdjacentHTML("beforeEnd", '<div class="lessons-list__download"><div class="lessons-list__popup"><ul class="lessons-list__popup-list"><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4-low/' + r + '.mp4">Компактный размер</a></li><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4/' + r + '.mp4">Высокое качество</a></li></ul></div></div>');
}
for (var i = document.querySelectorAll("a[data-video-id]"), e = 0; e < i.length; e++) {
var a = i[e];
a.onclick = function(t) {
t.preventDefault();
var e = this.getAttribute("data-video-id");
window.ga("send", "event", "webpack-screencast", "open", e, {
hitCallback: h(function() {
o(e);
})
});
};
}
}
function o(t) {
for (var e = [ {
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
} ], n = 0; n < e.length && !(document.documentElement.clientHeight < e[n].height || document.documentElement.clientWidth < e[n].width); n++) ;
n--;
var r = e[n].width, i = e[n].height;
if (0 === n) window.location.href = "//www.youtube.com/watch?v=" + t; else {
var a = new u();
if (a.setContent('<div id="player"></div>'), a.elem.addEventListener("modal-remove", function() {
c && (c.destroy(), c = null);
}), window.YT) s(t, r, i); else {
var o = document.createElement("script");
o.src = "https://www.youtube.com/iframe_api", document.head.appendChild(o), window.onYouTubeIframeAPIReady = function() {
s(t, r, i), delete window.onYouTubeIframeAPIReady;
};
}
}
}
function s(t, e, n) {
c && c.destroy(), c = new window.YT.Player("player", {
height: n,
width: e,
videoId: t,
events: {
onReady: function() {
c.playVideo();
},
onStateChange: function(r) {
document.querySelectorAll("[data-video-id]");
if (1 == r.data && (c.videoId = t), 0 == r.data) for (var i = document.querySelectorAll("[data-video-id]"), a = 0; a < i.length; a++) {
var o = i[a];
if (o.getAttribute("data-video-id") == c.videoId) {
var u = i[a + 1] && i[a + 1].getAttribute("data-video-id");
u && s(u, e, n);
break;
}
}
}
}
});
}
var c, u = n(10), l = (n(49), n(60)), h = n(50);
r();
},
28: function(t, e, n) {
"use strict";
function r(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var r = e("fail", n);
r.reason = t, i.dispatchEvent(r);
}
function r(t, n) {
var r = e("success", n);
r.result = t, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), o = t.method || "GET", s = t.body, c = t.url;
i.open(o, c, t.sync ? !1 : !0), i.method = o;
var u = a();
u && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), t.noDocumentEvents || (i.addEventListener("loadstart", function(t) {
i.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), i.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void n("Не получен ответ от сервера.", e);
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", e);
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
a = JSON.parse(a);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(a, e);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(23), a = n(77);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
49: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.thumb = a;
}
var i = n(78)(), a = n(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
50: function(t) {
"use strict";
t.exports = function(t) {
function e() {
e.wasCalled || (e.wasCalled = !0, t());
}
return setTimeout(e, 500), e;
};
},
56: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
60: function(t, e, n) {
"use strict";
function r(t, e) {
if (t.elements.email.value) {
var n = t.elements.slug, r = [];
if (n.length) for (var s = 0; s < n.length; s++) {
var c = n[s];
c.checked && r.push(c.value);
} else r.push(n.value);
if (!r.length) return void new o.Info("Выберите рассылки из списка.");
var u = {
email: t.elements.email.value,
slug: r
}, l = a({
method: "POST",
url: t.action,
body: u
}), h = t.querySelector('[type="submit"]'), f = new i({
elem: h,
size: "small",
elemClass: "button_loading"
});
f.start(), h.disabled = !0, l.addEventListener("loadend", function() {
f.stop(), h.disabled = !1;
});
var d = t.getAttribute("data-newsletter-subscribe-form");
l.addEventListener("success", function(n) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: d
}), window.ga("send", "event", "newsletter", "subscribe", d), new o.Success(n.result.message, "slow"), 
t.elements.email.value = "", e && e()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: d
}), window.ga("send", "event", "newsletter", "subscribe-fail", d), new o.Error(n.result.message));
});
}
}
var i = n(53), a = n(28), o = n(23);
e.submitSubscribeForm = r;
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
var r = n(108);
t.exports = function(t) {
function e(t, e, n, i, a) {
var o = a || "div";
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
t.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, a) {
var o = this.block, s = this.attributes || {};
if (!s.class && i && !a) throw Error("Block without class: " + i);
if (s.class) {
var c = s.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var u;
try {
u = c[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + c[0]);
}
a ? c[0] = r[r.length - 1] + t.element + c[0] : r[r.length] = u;
var h = (a ? r[r.length - 1] + t.element : "") + u;
-1 === c.indexOf(h) && (c[c.length] = h);
for (var f = 0; f < c.length; f++) {
var d = c[f];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? c[f] = h + d : d.match(RegExp("^" + t.element)) && (r[r.length - 2] ? c[f] = r[r.length - 2] + d : c[f] = r[r.length - 1] + d), 
c[f].match(RegExp("^" + h + "($|(?=" + t.element + "|" + t.modifier + "))")) && (c[f] = t.prefix + c[f]);
}
s.class = c.sort().join(" ");
}
e(n, o, s, r, i), a || r.pop();
};
};
},
108: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function a(t) {
return s[t] || t;
}
function o(t) {
var e = (t + "").replace(c, a);
return e === "" + t ? t : e;
}
e.merge = function u(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = u(n, t[i]);
return n;
}
var a = t.class, o = e.class;
(a || o) && (a = a || [], o = o || [], Array.isArray(a) || (a = [ a ]), Array.isArray(o) || (o = [ o ]), 
t.class = a.concat(o).filter(r));
for (var s in e) "class" != s && (t[s] = e[s]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], a = 0; a < t.length; a++) n && n[a] ? r.push(e.escape(i([ t[a] ]))) : r.push(i(t[a]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], a = Object.keys(t);
if (a.length) for (var o = 0; o < a.length; ++o) {
var s = a[o], c = t[s];
"class" == s ? (c = i(c)) && r.push(" " + s + '="' + c + '"') : r.push(e.attr(s, c, !1, n));
}
return r.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
e.escape = o, e.rethrow = function l(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (a) {
l(t, null, r);
}
var o = 3, s = i.split("\n"), c = Math.max(r - o, 0), u = Math.min(s.length, r + o), o = s.slice(c, u).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
116: function() {}
});
//# sourceMappingURL=webpackScreencast.48bffc950a9d6db0a82b.js.map
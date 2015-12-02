var webpackScreencast = webpackJsonp_name_([ 23 ], {
0: function(e, t, n) {
"use strict";
function r() {
a(), i();
}
function i() {
var e = document.querySelector("[data-newsletter-subscribe-form]");
e && (e.onsubmit = function(t) {
t.preventDefault(), l.submitSubscribeForm(e);
});
}
function a() {
for (var e = document.querySelectorAll("li[data-mnemo]"), t = 0; t < e.length; t++) {
var n = e[t], r = n.getAttribute("data-mnemo");
n.insertAdjacentHTML("beforeEnd", '<div class="lessons-list__download"><div class="lessons-list__popup"><ul class="lessons-list__popup-list"><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4-low/' + r + '.mp4">Компактный размер</a></li><li class="lessons-list__popup-item"><a data-track-outbound href="/webpack-screencast/webpack-mp4/' + r + '.mp4">Высокое качество</a></li></ul></div></div>');
}
for (var i = document.querySelectorAll("a[data-video-id]"), t = 0; t < i.length; t++) {
var a = i[t];
a.onclick = function(e) {
e.preventDefault();
var t = this.getAttribute("data-video-id");
window.ga("send", "event", "webpack-screencast", "open", t, {
hitCallback: d(function() {
s(t);
})
});
};
}
}
function s(e) {
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
var r = t[n].width, i = t[n].height;
if (0 === n) window.location.href = "//www.youtube.com/watch?v=" + e; else {
var a = new u();
if (a.setContent('<div id="player"></div>'), a.elem.addEventListener("modal-remove", function() {
c && (c.destroy(), c = null);
}), window.YT) o(e, r, i); else {
var s = document.createElement("script");
s.src = "https://www.youtube.com/iframe_api", document.head.appendChild(s), window.onYouTubeIframeAPIReady = function() {
o(e, r, i), delete window.onYouTubeIframeAPIReady;
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
onStateChange: function(r) {
document.querySelectorAll("[data-video-id]");
if (1 == r.data && (c.videoId = e), 0 == r.data) for (var i = document.querySelectorAll("[data-video-id]"), a = 0; a < i.length; a++) {
var s = i[a];
if (s.getAttribute("data-video-id") == c.videoId) {
var u = i[a + 1] && i[a + 1].getAttribute("data-video-id");
u && o(u, t, n);
break;
}
}
}
}
});
}
var c, u = n(153), l = (n(161), n(164)), d = n(209);
r();
},
116: function(e, t) {},
155: function(e, t, n) {
"use strict";
function r(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var r = t("fail", n);
r.reason = e, i.dispatchEvent(r);
}
function r(e, n) {
var r = t("success", n);
r.result = e, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), s = e.method || "GET", o = e.body, c = e.url;
i.open(s, c, e.sync ? !1 : !0), i.method = s;
var u = a();
u && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(o) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
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
var l = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void n("Не получен ответ от сервера.", t);
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", t);
var a = i.responseText, s = i.getResponseHeader("Content-Type");
if (s.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
r(a, t);
}), setTimeout(function() {
i.send(o);
}, 0), i;
}
var i = n(147), a = n(156);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = r;
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
function r(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(r).join(" ");
}
function a(e) {
return o[e] || e;
}
function s(e) {
var t = (e + "").replace(c, a);
return t === "" + e ? e : t;
}
t.merge = function u(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = u(n, e[i]);
return n;
}
var a = e.class, s = t.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
e.class = a.concat(s).filter(r));
for (var o in t) "class" != o && (e[o] = t[o]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var r = [], a = 0; a < e.length; a++) n && n[a] ? r.push(t.escape(i([ e[a] ]))) : r.push(i(e[a]));
var s = i(r);
return s.length ? ' class="' + s + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, r, i) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var r = [], a = Object.keys(e);
if (a.length) for (var s = 0; s < a.length; ++s) {
var o = a[s], c = e[o];
"class" == o ? (c = i(c)) && r.push(" " + o + '="' + c + '"') : r.push(t.attr(o, c, !1, n));
}
return r.join("");
};
var o = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
t.escape = s, t.rethrow = function l(e, t, r, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + r, 
e;
try {
i = i || n(116).readFileSync(t, "utf8");
} catch (a) {
l(e, null, r);
}
var s = 3, o = i.split("\n"), c = Math.max(r - s, 0), u = Math.min(o.length, r + s), s = o.slice(c, u).map(function(e, t) {
var n = t + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + s + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
},
161: function(e, t, n) {
"use strict";
function r(e) {
e.bem = i, e.thumb = a;
}
var i = n(162)(), a = n(163).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, r(t), e(t);
};
},
162: function(e, t, n) {
"use strict";
var r = n(158);
e.exports = function(e) {
function t(e, t, n, i, a) {
var s = a || "div";
switch (s) {
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
e.push("<" + s + r.attrs(r.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(s) && e.push("</" + s + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, r, i, a) {
var s = this.block, o = this.attributes || {};
if (!o.class && i && !a) throw Error("Block without class: " + i);
if (o.class) {
var c = o.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var u;
try {
u = c[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + c[0]);
}
a ? c[0] = r[r.length - 1] + e.element + c[0] : r[r.length] = u;
var d = (a ? r[r.length - 1] + e.element : "") + u;
-1 === c.indexOf(d) && (c[c.length] = d);
for (var f = 0; f < c.length; f++) {
var m = c[f];
m.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? c[f] = d + m : m.match(RegExp("^" + e.element)) && (r[r.length - 2] ? c[f] = r[r.length - 2] + m : c[f] = r[r.length - 1] + m), 
c[f].match(RegExp("^" + d + "($|(?=" + e.element + "|" + e.modifier + "))")) && (c[f] = e.prefix + c[f]);
}
o.class = c.sort().join(" ");
}
t(n, s, o, r, i), a || r.pop();
};
};
},
163: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var r = window.devicePixelRatio;
t *= r, n *= r;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
},
164: function(e, t, n) {
"use strict";
function r(e, t) {
if (e.elements.email.value) {
var n = e.elements.slug, r = [];
if (n.length) for (var o = 0; o < n.length; o++) {
var c = n[o];
c.checked && r.push(c.value);
} else r.push(n.value);
if (!r.length) return void new s.Info("Выберите рассылки из списка.");
var u = {
email: e.elements.email.value,
slug: r
}, l = a({
method: "POST",
url: e.action,
body: u
}), d = e.querySelector('[type="submit"]'), f = new i({
elem: d,
size: "small",
elemClass: "button_loading"
});
f.start(), d.disabled = !0, l.addEventListener("loadend", function() {
f.stop(), d.disabled = !1;
});
var m = e.getAttribute("data-newsletter-subscribe-form");
l.addEventListener("success", function(n) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: m
}), window.ga("send", "event", "newsletter", "subscribe", m), new s.Success(n.result.message, "slow"), 
e.elements.email.value = "", t && t()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: m
}), window.ga("send", "event", "newsletter", "subscribe-fail", m), new s.Error(n.result.message));
});
}
}
var i = n(150), a = n(155), s = n(147);
t.submitSubscribeForm = r;
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
//# sourceMappingURL=webpackScreencast.0b1cdc4c1007886084a3.js.map
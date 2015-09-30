var coursesCourse = webpackJsonp_name_([ 1 ], {
0: function(e, t, n) {
"use strict";
function s() {
var e = document.querySelector("[data-newsletter-subscribe-form]");
e && (e.onsubmit = function(t) {
t.preventDefault(), a.submitSubscribeForm(e);
});
}
function r() {
var e = document.querySelector("[data-group-signup-link]");
e && (e.onclick = function(t) {
if (!window.currentUser) {
t.preventDefault();
var s = new o({
elem: e,
size: "small",
"class": "submit-button__spinner",
elemClass: "submit-button_progress"
});
s.start(), n.e(2, function() {
s.stop();
var t = n(84);
new t({
callback: function() {
window.location.href = e.href;
}
});
});
}
});
}
var a = n(60), o = n(53);
n(28);
s(), r();
},
28: function(e, t, n) {
"use strict";
function s(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var s = t("fail", n);
s.reason = e, r.dispatchEvent(s);
}
function s(e, n) {
var s = t("success", n);
s.result = e, r.dispatchEvent(s);
}
var r = new XMLHttpRequest(), o = e.method || "GET", i = e.body, u = e.url;
r.open(o, u, e.sync ? !1 : !0), r.method = o;
var c = a();
c && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(i) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
i = JSON.stringify(i)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
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
var d = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void n("Не получен ответ от сервера.", t);
if (-1 == d.indexOf(r.status)) return void n("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее.", t);
var a = r.responseText, o = r.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
s(a, t);
}), setTimeout(function() {
r.send(i);
}, 0), r;
}
var r = n(23), a = n(77);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = s;
},
60: function(e, t, n) {
"use strict";
function s(e, t) {
if (e.elements.email.value) {
var n = a({
method: "POST",
url: e.action,
body: {
email: e.elements.email.value,
slug: e.elements.slug.value
}
}), s = e.querySelector('[type="submit"]'), i = new r({
elem: s,
size: "small",
elemClass: "button_loading"
});
i.start(), s.disabled = !0, n.addEventListener("loadend", function() {
i.stop(), s.disabled = !1;
});
var u = e.getAttribute("data-newsletter-subscribe-form");
n.addEventListener("success", function(e) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: u
}), window.ga("send", "event", "newsletter", "subscribe", u), new o.Success(e.result.message, "slow"), 
t && t()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: u
}), window.ga("send", "event", "newsletter", "subscribe-fail", u), new o.Error(e.result.message));
});
}
}
var r = n(53), a = n(28), o = n(23);
t.submitSubscribeForm = s;
},
77: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
}
});
//# sourceMappingURL=coursesCourse.c038d53f6a22e815fe59.js.map
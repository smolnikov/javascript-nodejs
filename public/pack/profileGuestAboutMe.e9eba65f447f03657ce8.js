var profileGuestAboutMe = webpackJsonp_name_([ 22 ], {
0: function(t, e, n) {
"use strict";
function r() {
new i(window.FEEDBACK_LIST_INIT);
}
var i = n(134);
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
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
134: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), a = n(28), o = function() {
function t(e) {
var n = this, i = e.elem, a = e.filter;
r(this, t), this.elem = i, this.container = i.querySelector("[data-feedback-container]"), 
this.baseUrl = "/courses/feedback-fetch", this.reset(a), window.addEventListener("scroll", function(t) {
return n.onScroll(t);
});
}
return i(t, [ {
key: "reset",
value: function(t) {
this.filter = t, this.count = 0, this.total = null, this.hasMore = !0, this.container.innerHTML = "", 
this.load();
}
}, {
key: "onScroll",
value: function() {
this.hasMore && this.container.getBoundingClientRect().bottom <= document.documentElement.clientHeight && !this.isLoading && this.load();
}
}, {
key: "load",
value: function() {
var t = this, e = this.baseUrl + "?skip=" + this.count + "&needTotal=" + (null === this.total ? 1 : 0);
for (var n in this.filter) e += "&" + n + "=" + this.filter[n];
var r = a({
method: "GET",
json: !0,
url: e
});
this.elem.classList.add("course-feedbacks_loading"), this.isLoading = !0, r.addEventListener("loadend", function() {
t.isLoading = !1, t.elem.classList.remove("course-feedbacks_loading");
}), r.addEventListener("success", function(e) {
void 0 !== e.result.total && (t.total = e.result.total), e.result.count ? (t.container.insertAdjacentHTML("beforeEnd", e.result.html), 
t.count += e.result.count) : t.count || (t.container.innerHTML = '<p style="text-align:center">Таких отзывов пока нет.</p>'), 
e.result.hasMore === !1 && (t.hasMore = !1), t.elem.dispatchEvent(new CustomEvent("feedbackChange", {
bubbles: !0,
detail: {
loader: t
}
}));
});
}
} ]), t;
}();
t.exports = o;
}
});
//# sourceMappingURL=profileGuestAboutMe.e9eba65f447f03657ce8.js.map
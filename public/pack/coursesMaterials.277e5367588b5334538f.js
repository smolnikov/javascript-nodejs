var coursesMaterials = webpackJsonp_name_([ 16 ], {
0: function(t, e, n) {
"use strict";
function s() {
r();
}
function r() {
var t = document.querySelector("[data-should-notify-materials]"), e = t.closest("form");
t.onchange = function() {
var t = a({
method: "PATCH",
url: e.action,
body: {
id: e.elements.id.value,
shouldNotifyMaterials: e.elements.shouldNotifyMaterials.checked
}
});
t.addEventListener("success", function(t) {
new o.Success("Настройка сохранена.");
});
};
}
var a = n(155), o = n(147);
s();
},
155: function(t, e, n) {
"use strict";
function s(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var s = e("fail", n);
s.reason = t, r.dispatchEvent(s);
}
function s(t, n) {
var s = e("success", n);
s.result = t, r.dispatchEvent(s);
}
var r = new XMLHttpRequest(), o = t.method || "GET", i = t.body, c = t.url;
r.open(o, c, t.sync ? !1 : !0), r.method = o;
var u = a();
u && !t.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(i) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
i = JSON.stringify(i)), t.noDocumentEvents || (r.addEventListener("loadstart", function(t) {
r.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), r.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), r.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), r.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var d = t.normalStatuses || [ 200 ];
return r.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), r.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), r.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), r.addEventListener("load", function(e) {
if (!r.status) return void n("Не получен ответ от сервера.", e);
if (-1 == d.indexOf(r.status)) return void n("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее.", e);
var a = r.responseText, o = r.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
a = JSON.parse(a);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
s(a, e);
}), setTimeout(function() {
r.send(i);
}, 0), r;
}
var r = n(147), a = n(156);
document.addEventListener("xhrfail", function(t) {
new r.Error(t.reason);
}), t.exports = s;
},
156: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
}
});
//# sourceMappingURL=coursesMaterials.277e5367588b5334538f.js.map
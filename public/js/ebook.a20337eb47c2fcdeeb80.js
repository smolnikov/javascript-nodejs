var ebook = webpackJsonp_name_([ 1 ], {
0: function(e, t, n) {
"use strict";
var r = n(39);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new r({
elem: e
});
};
},
26: function(e, t) {
"use strict";
function n() {
for (var e = document.querySelectorAll('a[href^="/"]'), t = 0; t < e.length; t++) {
var n = e[t];
document.getElementById(n.getAttribute("href")) && n.setAttribute("href", "#" + n.getAttribute("href"));
}
}
function r() {
for (var e = document.querySelectorAll('a[href^="#"]'), t = 0; t < e.length; t++) {
var n = e[t];
n.setAttribute("href", n.getAttribute("href").replace(/\//g, "-"));
}
for (var r = document.querySelectorAll("[id]"), t = 0; t < r.length; t++) {
var o = r[t];
o.id = o.id.replace(/\//g, "-");
}
}
t.init = function() {
n(), r();
};
},
28: function(e, t, n) {
"use strict";
function r(e) {
function t(e) {
window.metrika.reachGoal("XHR-" + e.toUpperCase(), {
time: Date.now() - i.timeStart,
method: i.method,
url: i.url,
status: i.status + ""
});
}
function n(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function r(e, t) {
var r = n("fail", t);
r.reason = e, i.dispatchEvent(r);
}
function o(e, t) {
var r = n("success", t);
r.result = e, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), s = e.method || "GET", u = e.body, c = e.url;
i.open(s, c, e.sync ? !1 : !0), i.method = s;
var d = a();
d && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", d), "[object Object]" == {}.toString.call(u) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
u = JSON.stringify(u)), i.addEventListener("loadstart", function(e) {
i.timeStart = Date.now(), t(e.type);
var r = n("xhrstart", e);
document.dispatchEvent(r);
}), i.addEventListener("loadend", function(e) {
t(e.type);
var r = n("xhrend", e);
document.dispatchEvent(r);
}), i.addEventListener("success", function(e) {
t(e.type);
var r = n("xhrsuccess", e);
r.result = e.result, document.dispatchEvent(r);
}), i.addEventListener("fail", function(e) {
t(e.type);
var r = n("xhrfail", e);
r.reason = e.reason, document.dispatchEvent(r);
}), e.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
r("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
r("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
r("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void r("Не получен ответ от сервера.", t);
if (-1 == l.indexOf(i.status)) return void r("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", t);
var n = i.responseText, a = i.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
n = JSON.parse(n);
} catch (t) {
return void r("Некорректный формат ответа от сервера", t);
}
o(n, t);
}), setTimeout(function() {
i.send(u);
}, 0), i;
}
var o = n(23), a = n(38);
document.addEventListener("xhrfail", function(e) {
new o.Error(e.reason);
}), e.exports = r;
},
38: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
39: function(e, t, n) {
"use strict";
var r = function() {
function e(e, t) {
for (var n in t) {
var r = t[n];
r.configurable = !0, r.value && (r.writable = !0);
}
Object.defineProperties(e, t);
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), o = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, a = n(28), i = n(23), s = n(27), u = n(37), c = function() {
function e(t) {
var n = this;
o(this, e), this.elem = t.elem, this.elem.addEventListener("submit", function(e) {
return e.preventDefault();
}), this.delegate('[name="paymentMethod"]', "click", function(e) {
return n.onPaymentMethodClick(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
});
}
return r(e, {
onPaymentMethodClick: {
value: function(e) {
var t = {
paymentMethod: e.delegateTarget.value
};
if (window.orderNumber) t.orderNumber = window.orderNumber; else {
var n = this.elem.querySelector('input[name="orderTemplate"]:checked');
t.orderTemplate = n.value, t.amount = n.dataset.amount;
}
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return window.ga("send", "event", "payment", "checkout-no-email", "ebook"), 
window.metrika.reachGoal("CHECKOUT-NO-EMAIL", {
product: "ebook"
}), new i.Error("Введите email."), void this.elem.elements.email.focus();
t.email = this.elem.elements.email.value;
}
var r = a({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403 ],
body: t
});
t.orderTemplate && window.ga("ec:addProduct", {
id: "ebook",
variant: t.orderTemplate,
price: t.amount,
quantity: 1
}), window.ga("ec:setAction", "checkout", {
step: 1,
option: t.paymentMethod
}), window.metrika.reachGoal("CHECKOUT", {
product: "ebook",
method: t.paymentMethod,
price: t.amount
}), window.ga("send", "event", "payment", "checkout", "ebook"), window.ga("send", "event", "payment", "checkout-method-" + t.paymentMethod, "ebook");
var o = this.startRequestIndication();
r.addEventListener("success", function(e) {
if (403 == this.status) return new i.Error("<p>" + (e.result.description || e.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void o();
var n = e.result;
if (n.form) {
window.ga("ec:setAction", "purchase", {
id: n.orderNumber
});
var r = document.createElement("div");
r.hidden = !0, r.innerHTML = n.form, document.body.appendChild(r), window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: function() {
r.firstChild.submit();
}
}), window.metrika.reachGoal("PURCHASE", {
product: "ebook",
method: t.paymentMethod,
price: t.amount,
number: n.orderNumber
});
} else o(), new i.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), r.addEventListener("fail", o);
}
},
request: {
value: function(e) {
var t = function() {
return e.apply(this, arguments);
};
return t.toString = function() {
return "" + e;
}, t;
}(function(e) {
var t = a(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
})
},
startRequestIndication: {
value: function() {
var e = this.elem.querySelector(".pay-method");
e.classList.add("modal-overlay_light");
var t = new u({
elem: e,
size: "medium",
"class": "pay-method__spinner"
});
return t.start(), function() {
e.classList.remove("modal-overlay_light"), t && t.stop();
};
}
}
}), e;
}();
s.delegateMixin(c.prototype), e.exports = c;
}
});
//# sourceMappingURL=ebook.a20337eb47c2fcdeeb80.js.map
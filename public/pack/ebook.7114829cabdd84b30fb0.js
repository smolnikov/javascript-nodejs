var ebook = webpackJsonp_name_([ 1 ], {
0: function(e, t, o) {
"use strict";
var i = o(32);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new i({
elem: e
});
};
},
32: function(e, t, o) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, n = function() {
function e(e, t) {
for (var o = 0; o < t.length; o++) {
var i = t[o];
i.enumerable = i.enumerable || !1, i.configurable = !0, i.value && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, o, i) {
return o && e(t.prototype, o), i && e(t, i), t;
};
}(), r = o(34), a = o(23), l = o(40), s = o(33), p = function() {
function e(t) {
var o = this;
i(this, e), this.elem = t.elem, this.elem.addEventListener("submit", function(e) {
return e.preventDefault();
}), this.delegate('[name="paymentMethod"]', "click", function(e) {
return o.onPaymentMethodClick(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
});
}
return n(e, [ {
key: "onPaymentMethodClick",
value: function(e) {
var t = {
paymentMethod: e.delegateTarget.value
};
if (window.orderNumber) t.orderNumber = window.orderNumber; else {
var o = this.elem.querySelector('input[name="orderTemplate"]:checked');
t.orderTemplate = o.value, t.amount = o.dataset.amount;
}
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return window.ga("send", "event", "payment", "checkout-no-email", "ebook"), 
window.metrika.reachGoal("CHECKOUT-NO-EMAIL", {
product: "ebook"
}), new a.Error("Введите email."), void this.elem.elements.email.focus();
t.email = this.elem.elements.email.value;
}
var i = r({
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
var n = this.startRequestIndication();
i.addEventListener("success", function(e) {
if (403 == this.status) return new a.Error("<p>" + (e.result.description || e.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void n();
var o = e.result;
if (o.form) {
window.ga("ec:setAction", "purchase", {
id: o.orderNumber
});
var i = document.createElement("div");
i.hidden = !0, i.innerHTML = o.form, document.body.appendChild(i);
var r = function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + t;
}, t;
}(function() {
r.called || (r.called = !0, i.firstChild.submit());
});
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: r
}), setTimeout(r, 500), window.metrika.reachGoal("PURCHASE", {
product: "ebook",
method: t.paymentMethod,
price: t.amount,
number: o.orderNumber
});
} else n(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), i.addEventListener("fail", n);
}
}, {
key: "request",
value: function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + t;
}, t;
}(function(e) {
var t = r(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
})
}, {
key: "startRequestIndication",
value: function() {
var e = this.elem.querySelector(".pay-method");
e.classList.add("modal-overlay_light");
var t = new s({
elem: e,
size: "medium",
"class": "pay-method__spinner"
});
return t.start(), function() {
e.classList.remove("modal-overlay_light"), t && t.stop();
};
}
} ]), e;
}();
l.delegateMixin(p.prototype), e.exports = p;
},
34: function(e, t, o) {
"use strict";
function i(e) {
function t(e, t) {
var o = new CustomEvent(e);
return o.originalEvent = t, o;
}
function o(e, o) {
var i = t("fail", o);
i.reason = e, n.dispatchEvent(i);
}
function i(e, o) {
var i = t("success", o);
i.result = e, n.dispatchEvent(i);
}
var n = new XMLHttpRequest(), a = e.method || "GET", l = e.body, s = e.url;
n.open(a, s, e.sync ? !1 : !0), n.method = a;
var p = r();
p && !e.skipCsrf && n.setRequestHeader("X-XSRF-TOKEN", p), "[object Object]" == {}.toString.call(l) && (n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
l = JSON.stringify(l)), n.addEventListener("loadstart", function(e) {
n.timeStart = Date.now();
var o = t("xhrstart", e);
document.dispatchEvent(o);
}), n.addEventListener("loadend", function(e) {
var o = t("xhrend", e);
document.dispatchEvent(o);
}), n.addEventListener("success", function(e) {
var o = t("xhrsuccess", e);
o.result = e.result, document.dispatchEvent(o);
}), n.addEventListener("fail", function(e) {
var o = t("xhrfail", e);
o.reason = e.reason, document.dispatchEvent(o);
}), e.raw || n.setRequestHeader("Accept", "application/json"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var _ = e.normalStatuses || [ 200 ];
return n.addEventListener("error", function(e) {
o("Ошибка связи с сервером.", e);
}), n.addEventListener("timeout", function(e) {
o("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), n.addEventListener("abort", function(e) {
o("Запрос был прерван.", e);
}), n.addEventListener("load", function(t) {
if (!n.status) return void o("Не получен ответ от сервера.", t);
if (-1 == _.indexOf(n.status)) return void o("Ошибка на стороне сервера (код " + n.status + "), попытайтесь позднее", t);
var r = n.responseText, a = n.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (t) {
return void o("Некорректный формат ответа от сервера", t);
}
i(r, t);
}), setTimeout(function() {
n.send(l);
}, 0), n;
}
var n = o(23), r = o(35);
document.addEventListener("xhrfail", function(e) {
new n.Error(e.reason);
}), e.exports = i;
},
35: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
39: function(e, t) {
"use strict";
function o() {
for (var e = document.querySelectorAll('a[href^="/"]'), t = 0; t < e.length; t++) {
var o = e[t];
document.getElementById(o.getAttribute("href")) && o.setAttribute("href", "#" + o.getAttribute("href"));
}
}
function i() {
for (var e = document.querySelectorAll('a[href^="#"]'), t = 0; t < e.length; t++) {
var o = e[t];
o.setAttribute("href", o.getAttribute("href").replace(/\//g, "-"));
}
for (var i = document.querySelectorAll("[id]"), t = 0; t < i.length; t++) {
var n = i[t];
n.id = n.id.replace(/\//g, "-");
}
}
t.init = function() {
o(), i();
};
}
});
//# sourceMappingURL=ebook.7114829cabdd84b30fb0.js.map
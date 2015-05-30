var ebook = webpackJsonp_name_([ 8 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = document.querySelector("[data-order-form]");
t && new i({
elem: t
});
}
var i = n(55);
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
var i = new XMLHttpRequest(), o = t.method || "GET", s = t.body, u = t.url;
i.open(o, u, t.sync ? !1 : !0), i.method = o;
var c = a();
c && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
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
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", e);
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
a = JSON.parse(a);
} catch (e) {
return void n("Некорректный формат ответа от сервера", e);
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
55: function(t, e, n) {
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
}(), a = (n(28), n(23)), o = n(27), s = n(85).FormPayment, u = (n(53), n(10), function() {
function t(e) {
var n = this;
r(this, t), this.elem = e.elem, this.product = "ebook", this.elem.addEventListener("submit", function(t) {
return n.onSubmit(t);
}), this.delegate("[data-order-payment-change]", "click", function(t) {
t.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate(".complex-form__extract .extract__item", "click", function(t) {
t.delegateTarget.querySelector('[type="radio"]').checked = !0;
});
}
return i(t, [ {
key: "onSubmit",
value: function(t) {
t.preventDefault(), new s(this, this.elem.querySelector(".pay-method")).submit();
}
}, {
key: "getOrderData",
value: function() {
var t = {};
if (window.orderNumber) t.orderNumber = window.orderNumber; else {
var e = this.elem.querySelector('input[name="orderTemplate"]:checked');
t.orderTemplate = e.value, t.amount = e.dataset.amount;
}
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return window.ga("send", "event", "payment", "checkout-no-email", "ebook"), 
window.metrika.reachGoal("CHECKOUT-NO-EMAIL", {
product: "ebook"
}), new a.Error("Введите email."), this.elem.elements.email.scrollIntoView(), setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.email.focus();
t.email = this.elem.elements.email.value;
}
return t;
}
} ]), t;
}());
o.delegateMixin(u.prototype), t.exports = u;
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
85: function(t, e, n) {
"use strict";
e.FormPayment = n(118);
},
118: function(t, e, n) {
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
}(), a = n(23), o = n(28), s = n(53), u = (n(10), function() {
function t(e, n) {
r(this, t), this.orderForm = e, this.paymentMethodElem = n;
}
return i(t, [ {
key: "request",
value: function e(t) {
var e = o(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}
}, {
key: "startRequestIndication",
value: function() {
var t = this;
this.paymentMethodElem.classList.add("modal-overlay_light");
var e = new s({
elem: this.paymentMethodElem,
size: "medium",
"class": "pay-method__spinner"
});
return e.start(), function() {
t.paymentMethodElem.classList.remove("modal-overlay_light"), e && e.stop();
};
}
}, {
key: "readPaymentData",
value: function() {
var t = {};
return [].forEach.call(this.paymentMethodElem.querySelectorAll("input,select,textarea"), function(e) {
("radio" != e.type && "checkbox" != e.type || e.checked) && (t[e.name] = e.value);
}), t;
}
}, {
key: "submit",
value: function() {
var t = this, e = this.orderForm.getOrderData();
if (e) {
var n = this.readPaymentData();
if (!n.paymentMethod) return void new a.Error("Выберите метод оплаты.");
if ("invoice" == n.paymentMethod && !n.invoiceCompanyName) return new a.Error("Укажите название компании."), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (var r in n) e[r] = n[r];
var i = window.location.search.match(/[?&]code=(\w+)/);
i && (e.discountCode = i[1]);
var s = o({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403, 400 ],
body: e
});
e.orderTemplate && window.ga("ec:addProduct", {
id: this.orderForm.product,
variant: e.orderTemplate,
price: e.amount,
quantity: 1
}), window.ga("ec:setAction", "checkout", {
step: 1,
option: e.paymentMethod
}), window.metrika.reachGoal("CHECKOUT", {
product: this.orderForm.product,
method: e.paymentMethod,
price: e.amount
}), window.ga("send", "event", "payment", "checkout", "ebook"), window.ga("send", "event", "payment", "checkout-method-" + e.paymentMethod, this.orderForm.product);
var u = this.startRequestIndication();
s.addEventListener("success", function(n) {
if (403 == s.status) return new a.Error("<p>" + (n.result.description || n.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void u();
if (400 == s.status) return new a.Error("<p>" + n.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void u();
var r = n.result;
if (r.form) {
window.ga("ec:setAction", "purchase", {
id: r.orderNumber
});
var i = document.createElement("div");
i.hidden = !0, i.innerHTML = r.form, document.body.appendChild(i);
var o = function c() {
c.called || (c.called = !0, i.firstChild.submit());
};
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: o
}), setTimeout(o, 500), window.metrika.reachGoal("PURCHASE", {
product: t.orderForm.product,
method: e.paymentMethod,
price: e.amount,
number: r.orderNumber
});
} else u(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), s.addEventListener("fail", u);
}
}
} ]), t;
}());
t.exports = u;
}
});
//# sourceMappingURL=ebook.258747a8aab739d1b709.js.map
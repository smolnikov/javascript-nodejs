var ebook = webpackJsonp_name_([ 8 ], {
0: function(e, t, n) {
"use strict";
function r() {
var e = document.querySelector("[data-order-form]");
e && new i({
elem: e
});
}
var i = n(55);
r();
},
28: function(e, t, n) {
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
var i = new XMLHttpRequest(), o = e.method || "GET", s = e.body, u = e.url;
i.open(o, u, e.sync ? !1 : !0), i.method = o;
var c = a();
c && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (i.addEventListener("loadstart", function(e) {
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
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
r(a, t);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(23), a = n(77);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = r;
},
55: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), a = (n(28), n(23)), o = n(27), s = n(85).FormPayment, u = (n(53), n(10), function() {
function e(t) {
var n = this;
r(this, e), this.elem = t.elem, this.product = "ebook", this.elem.addEventListener("submit", function(e) {
return n.onSubmit(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate(".complex-form__extract .extract__item", "click", function(e) {
e.delegateTarget.querySelector('[type="radio"]').checked = !0;
});
}
return i(e, [ {
key: "onSubmit",
value: function(e) {
e.preventDefault(), new s(this, this.elem).submit();
}
}, {
key: "getOrderData",
value: function() {
var e = {};
if (window.orderNumber) e.orderNumber = window.orderNumber; else {
var t = this.elem.querySelector('input[name="orderTemplate"]:checked');
e.orderTemplate = t.value, e.amount = t.dataset.amount;
}
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return window.ga("send", "event", "payment", "checkout-no-email", "ebook"), 
window.metrika.reachGoal("CHECKOUT-NO-EMAIL", {
product: "ebook"
}), new a.Error("Введите email."), this.elem.elements.email.scrollIntoView(), setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.email.focus();
e.email = this.elem.elements.email.value;
}
return e;
}
} ]), e;
}());
o.delegateMixin(u.prototype), e.exports = u;
},
77: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
85: function(e, t, n) {
"use strict";
t.FormPayment = n(118);
},
118: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), a = n(23), o = n(28), s = n(53), u = (n(10), function() {
function e(t, n) {
r(this, e), this.orderForm = t, this.paymentMethodElem = n;
}
return i(e, [ {
key: "request",
value: function t(e) {
var t = o(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
}
}, {
key: "startRequestIndication",
value: function() {
var e = this;
this.paymentMethodElem.classList.add("modal-overlay_light");
var t = new s({
elem: this.paymentMethodElem.querySelector('[type="submit"]'),
size: "small",
"class": "",
elemClass: "button_loading"
});
return t.start(), function() {
e.paymentMethodElem.classList.remove("modal-overlay_light"), t && t.stop();
};
}
}, {
key: "readPaymentData",
value: function() {
var e = {};
return [].forEach.call(this.paymentMethodElem.querySelectorAll("input,select,textarea"), function(t) {
("radio" != t.type && "checkbox" != t.type || t.checked) && (e[t.name] = t.value);
}), e;
}
}, {
key: "submit",
value: function() {
var e = this, t = this.orderForm.getOrderData();
if (t) {
var n = this.readPaymentData();
if (!n.paymentMethod) return void new a.Error("Выберите метод оплаты.");
if ("invoice" == n.paymentMethod && !n.invoiceCompanyName) return new a.Error("Укажите название компании."), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (var r in n) t[r] = n[r];
var i = window.location.search.match(/[?&]code=(\w+)/);
i && (t.discountCode = i[1]);
var s = o({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403, 400 ],
body: t
});
t.orderTemplate && window.ga("ec:addProduct", {
id: this.orderForm.product,
variant: t.orderTemplate,
price: t.amount,
quantity: 1
}), window.ga("ec:setAction", "checkout", {
step: 1,
option: t.paymentMethod
}), window.metrika.reachGoal("CHECKOUT", {
product: this.orderForm.product,
method: t.paymentMethod,
price: t.amount
}), window.ga("send", "event", "payment", "checkout", "ebook"), window.ga("send", "event", "payment", "checkout-method-" + t.paymentMethod, this.orderForm.product);
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
product: e.orderForm.product,
method: t.paymentMethod,
price: t.amount,
number: r.orderNumber
});
} else u(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), s.addEventListener("fail", u);
}
}
} ]), e;
}());
e.exports = u;
}
});
//# sourceMappingURL=ebook.dee2d4004348e8a2de9f.js.map
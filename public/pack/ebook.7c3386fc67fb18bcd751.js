var ebook = webpackJsonp_name_([ 1 ], {
0: function(e, t, r) {
"use strict";
var n = r(280);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new n({
elem: e
});
};
},
256: function(e, t, r) {
"use strict";
function n(e) {
function t(e, t) {
var r = new CustomEvent(e);
return r.originalEvent = t, r;
}
function r(e, r) {
var n = t("fail", r);
n.reason = e, o.dispatchEvent(n);
}
function n(e, r) {
var n = t("success", r);
n.result = e, o.dispatchEvent(n);
}
var o = new XMLHttpRequest(), i = e.method || "GET", s = e.body, c = e.url;
o.open(i, c, e.sync ? !1 : !0), o.method = i;
var u = a();
u && !e.skipCsrf && o.setRequestHeader("X-XSRF-TOKEN", u), "[object Object]" == {}.toString.call(s) && (o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (o.addEventListener("loadstart", function(e) {
o.timeStart = Date.now();
var r = t("xhrstart", e);
document.dispatchEvent(r);
}), o.addEventListener("loadend", function(e) {
var r = t("xhrend", e);
document.dispatchEvent(r);
}), o.addEventListener("success", function(e) {
var r = t("xhrsuccess", e);
r.result = e.result, document.dispatchEvent(r);
}), o.addEventListener("fail", function(e) {
var r = t("xhrfail", e);
r.reason = e.reason, document.dispatchEvent(r);
})), e.raw || o.setRequestHeader("Accept", "application/json"), o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var d = e.normalStatuses || [ 200 ];
return o.addEventListener("error", function(e) {
r("Ошибка связи с сервером.", e);
}), o.addEventListener("timeout", function(e) {
r("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), o.addEventListener("abort", function(e) {
r("Запрос был прерван.", e);
}), o.addEventListener("load", function(t) {
if (!o.status) return void r("Не получен ответ от сервера.", t);
if (-1 == d.indexOf(o.status)) return void r("Ошибка на стороне сервера (код " + o.status + "), попытайтесь позднее", t);
var a = o.responseText, i = o.getResponseHeader("Content-Type");
if (i.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void r("Некорректный формат ответа от сервера", t);
}
n(a, t);
}), setTimeout(function() {
o.send(s);
}, 0), o;
}
var o = r(251), a = r(291);
document.addEventListener("xhrfail", function(e) {
new o.Error(e.reason);
}), e.exports = n;
},
280: function(e, t, r) {
"use strict";
function n(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var o = function() {
function e(e, t) {
for (var r = 0; r < t.length; r++) {
var n = t[r];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(e, n.key, n);
}
}
return function(t, r, n) {
return r && e(t.prototype, r), n && e(t, n), t;
};
}(), a = (r(256), r(251)), i = r(255), s = r(297).FormPayment, c = (r(278), r(237), 
function() {
function e(t) {
var r = this;
n(this, e), this.elem = t.elem, this.product = "ebook", this.elem.addEventListener("submit", function(e) {
return r.onSubmit(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate(".complex-form__extract .extract__item", "click", function(e) {
e.delegateTarget.querySelector('[type="radio"]').checked = !0;
});
}
return o(e, [ {
key: "onSubmit",
value: function(e) {
e.preventDefault(), new s(this, this.elem.querySelector(".pay-method")).submit();
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
i.delegateMixin(c.prototype), e.exports = c;
},
291: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
297: function(e, t, r) {
"use strict";
t.FormPayment = r(306);
},
306: function(e, t, r) {
"use strict";
function n(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var o = function() {
function e(e, t) {
for (var r = 0; r < t.length; r++) {
var n = t[r];
n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
Object.defineProperty(e, n.key, n);
}
}
return function(t, r, n) {
return r && e(t.prototype, r), n && e(t, n), t;
};
}(), a = r(251), i = r(256), s = r(278), c = (r(237), function() {
function e(t, r) {
n(this, e), this.orderForm = t, this.paymentMethodElem = r;
}
return o(e, [ {
key: "request",
value: function t(e) {
var t = i(e);
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
elem: this.paymentMethodElem,
size: "medium",
"class": "pay-method__spinner"
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
var r = this.readPaymentData();
if (!r.paymentMethod) return void new a.Error("Выберите метод оплаты.");
if ("invoice" == r.paymentMethod && !r.invoiceCompanyName) return new a.Error("Укажите название компании."), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (var n in r) t[n] = r[n];
var o = i({
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
var s = this.startRequestIndication();
o.addEventListener("success", function(r) {
if (403 == o.status) return new a.Error("<p>" + (r.result.description || r.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
if (400 == o.status) return new a.Error("<p>" + r.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
var n = r.result;
if (n.form) {
window.ga("ec:setAction", "purchase", {
id: n.orderNumber
});
var i = document.createElement("div");
i.hidden = !0, i.innerHTML = n.form, document.body.appendChild(i);
var c = function u() {
u.called || (u.called = !0, i.firstChild.submit());
};
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: c
}), setTimeout(c, 500), window.metrika.reachGoal("PURCHASE", {
product: e.orderForm.product,
method: t.paymentMethod,
price: t.amount,
number: n.orderNumber
});
} else s(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), o.addEventListener("fail", s);
}
}
} ]), e;
}());
e.exports = c;
}
});
//# sourceMappingURL=ebook.7c3386fc67fb18bcd751.js.map
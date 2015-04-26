var ebook = webpackJsonp_name_([ 1 ], {
0: function(e, t, o) {
"use strict";
var i = o(145);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new i({
elem: e
});
};
},
133: function(e, t, o) {
"use strict";
function i(e) {
function t(e, t) {
var o = new CustomEvent(e);
return o.originalEvent = t, o;
}
function o(e, o) {
var i = t("fail", o);
i.reason = e, r.dispatchEvent(i);
}
function i(e, o) {
var i = t("success", o);
i.result = e, r.dispatchEvent(i);
}
var r = new XMLHttpRequest(), n = e.method || "GET", s = e.body, l = e.url;
r.open(n, l, e.sync ? !1 : !0), r.method = n;
var p = a();
p && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", p), "[object Object]" == {}.toString.call(s) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
r.timeStart = Date.now();
var o = t("xhrstart", e);
document.dispatchEvent(o);
}), r.addEventListener("loadend", function(e) {
var o = t("xhrend", e);
document.dispatchEvent(o);
}), r.addEventListener("success", function(e) {
var o = t("xhrsuccess", e);
o.result = e.result, document.dispatchEvent(o);
}), r.addEventListener("fail", function(e) {
var o = t("xhrfail", e);
o.reason = e.reason, document.dispatchEvent(o);
})), e.raw || r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var _ = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
o("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
o("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
o("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void o("Не получен ответ от сервера.", t);
if (-1 == _.indexOf(r.status)) return void o("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее", t);
var a = r.responseText, n = r.getResponseHeader("Content-Type");
if (n.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void o("Некорректный формат ответа от сервера", t);
}
i(a, t);
}), setTimeout(function() {
r.send(s);
}, 0), r;
}
var r = o(128), a = o(163);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = i;
},
145: function(e, t, o) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, r = function() {
function e(e, t) {
for (var o = 0; o < t.length; o++) {
var i = t[o];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, o, i) {
return o && e(t.prototype, o), i && e(t, i), t;
};
}(), a = (o(133), o(128)), n = o(132), s = o(171).FormPayment, l = (o(144), o(114), 
function() {
function e(t) {
var o = this;
i(this, e), this.elem = t.elem, this.product = "ebook", this.elem.addEventListener("submit", function(e) {
return o.onSubmit(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate(".complex-form__extract .extract__item", "click", function(e) {
e.delegateTarget.querySelector('[type="radio"]').checked = !0;
});
}
return r(e, [ {
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
n.delegateMixin(l.prototype), e.exports = l;
},
163: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
171: function(e, t, o) {
"use strict";
t.FormPayment = o(201);
},
201: function(e, t, o) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, r = function() {
function e(e, t) {
for (var o = 0; o < t.length; o++) {
var i = t[o];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, o, i) {
return o && e(t.prototype, o), i && e(t, i), t;
};
}(), a = o(128), n = o(133), s = o(144), l = (o(114), function() {
function e(t, o) {
i(this, e), this.orderForm = t, this.paymentMethodElem = o;
}
return r(e, [ {
key: "request",
value: function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + e;
}, t;
}(function(e) {
var t = n(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
})
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
var o = this.readPaymentData();
if (!o.paymentMethod) return void new a.Error("Выберите метод оплаты.");
for (var i in o) t[i] = o[i];
var r = n({
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
r.addEventListener("success", function(o) {
if (403 == r.status) return new a.Error("<p>" + (o.result.description || o.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
if (400 == r.status) return new a.Error("<p>" + o.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
var i = o.result;
if (i.form) {
window.ga("ec:setAction", "purchase", {
id: i.orderNumber
});
var n = document.createElement("div");
n.hidden = !0, n.innerHTML = i.form, document.body.appendChild(n);
var l = function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + e;
}, t;
}(function() {
l.called || (l.called = !0, n.firstChild.submit());
});
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: l
}), setTimeout(l, 500), window.metrika.reachGoal("PURCHASE", {
product: e.orderForm.product,
method: t.paymentMethod,
price: t.amount,
number: i.orderNumber
});
} else s(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), r.addEventListener("fail", s);
}
}
} ]), e;
}());
e.exports = l;
}
});
//# sourceMappingURL=ebook.9b712457774fa114e7cc.js.map
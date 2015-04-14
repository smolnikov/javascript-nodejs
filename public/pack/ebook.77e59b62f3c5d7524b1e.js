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
31: function(e, t, o) {
"use strict";
function i(e) {
e.bem = n, e.thumb = r;
}
var n = o(58)(), r = o(54).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, i(t), e(t);
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
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, o, i) {
return o && e(t.prototype, o), i && e(t, i), t;
};
}(), r = o(34), a = o(23), l = o(40), s = o(98).FormPayment, p = o(33), _ = (o(12), 
function() {
function e(t) {
var o = this;
i(this, e), this.elem = t.elem, this.product = "ebook", this.elem.addEventListener("submit", function(e) {
return e.preventDefault();
}), this.delegate('[name="paymentMethod"]', "click", function(e) {
return o.onPaymentMethodClick(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
}), this.delegate(".complex-form__extract .extract__item", "click", function(e) {
e.delegateTarget.querySelector('[type="radio"]').checked = !0;
});
}
return n(e, [ {
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
}, {
key: "onPaymentMethodClick",
value: function(e) {
var t = e.delegateTarget.value;
new s(t, this).submit();
}
}, {
key: "request",
value: function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + e;
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
var t = new p({
elem: e,
size: "medium",
"class": "pay-method__spinner"
});
return t.start(), function() {
e.classList.remove("modal-overlay_light"), t && t.stop();
};
}
} ]), e;
}());
l.delegateMixin(_.prototype), e.exports = _;
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
l = JSON.stringify(l)), e.noDocumentEvents || (n.addEventListener("loadstart", function(e) {
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
})), e.raw || n.setRequestHeader("Accept", "application/json"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
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
54: function(e, t) {
"use strict";
t.thumb = function(e, t, o) {
if (!e) return e;
var i = window.devicePixelRatio;
t *= i, o *= i;
var n = 160 >= t && 160 >= o ? "t" : 320 >= t && 320 >= o ? "m" : 640 >= t && 640 >= o ? "i" : 1024 >= t && 1024 >= o ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + n + e.slice(e.lastIndexOf("."));
};
},
58: function(e, t, o) {
"use strict";
var i = o(88);
e.exports = function(e) {
function t(t, o, n, r, a, l) {
var s = l || e.default_tag, p = a.length;
switch (l || ("inline" === a[p - 1] ? s = "span" : "list" === a[p - 1] && (s = "li"), 
n.href ? s = "a" : n.for ? s = "label" : n.src && (s = "img")), "list" === a[p - 1] && "li" !== s ? t.push("<li>") : "list" !== a[p - 1] && "pseudo-list" !== a[p - 1] && "li" === s ? (t.push("<ul>"), 
a[a.length] = "pseudo-list") : "pseudo-list" === a[p - 1] && "li" !== s && (t.push("</ul>"), 
a.pop()), a[a.length] = -1 !== [ "a", "abbr", "acronym", "b", "br", "code", "em", "font", "i", "img", "ins", "kbd", "map", "samp", "small", "span", "strong", "sub", "sup", "label", "p", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf(s) ? "inline" : -1 !== [ "ul", "ol" ].indexOf(s) ? "list" : "block", 
s) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
t.push("<" + s + i.attrs(i.merge([ n ]), !0) + ">"), o && o(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(s) && t.push("</" + s + ">"), 
"list" === a[p - 1] && "li" != s && t.push("</li>");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
e.default_tag = e.default_tag || "div", function(o, i, n, r, a) {
var l = this.block, s = this.attributes || {};
if (s.class) {
var p = s.class;
p instanceof Array && (p = p.join(" ")), p = p.split(" ");
var _;
try {
_ = p[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (d) {
throw Error("Incorrect bem class: " + p[0]);
}
a ? p[0] = i[i.length - 1] + e.element + p[0] : (i[i.length] = _, p[0] = p[0]);
var c = (a ? i[i.length - 1] + e.element : "") + _;
-1 === p.indexOf(c) && (p[p.length] = c);
for (var b = 0; b < p.length; b++) {
var f = p[b];
f.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? p[b] = c + f : f.match(RegExp("^" + e.element)) && (p[b] = i[i.length - 2] ? i[i.length - 2] + f : i[i.length - 1] + f), 
p[b].match(RegExp("^" + c + "($|(?=" + e.element + "|" + e.modifier + "))")) && (p[b] = e.prefix + p[b]);
}
s.class = p.sort().join(" ");
}
t(o, l, s, i, n, r), a || i.pop(), n.pop();
};
};
},
88: function(e, t, o) {
"use strict";
function i(e) {
return null != e && "" !== e;
}
function n(e) {
return (Array.isArray(e) ? e.map(n) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(i).join(" ");
}
t.merge = function r(e, t) {
if (1 === arguments.length) {
for (var o = e[0], n = 1; n < e.length; n++) o = r(o, e[n]);
return o;
}
var a = e.class, l = t.class;
(a || l) && (a = a || [], l = l || [], Array.isArray(a) || (a = [ a ]), Array.isArray(l) || (l = [ l ]), 
e.class = a.concat(l).filter(i));
for (var s in t) "class" != s && (e[s] = t[s]);
return e;
}, t.joinClasses = n, t.cls = function(e, o) {
for (var i = [], r = 0; r < e.length; r++) i.push(o && o[r] ? t.escape(n([ e[r] ])) : n(e[r]));
var a = n(i);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, o, i, n) {
return "style" === e && (o = t.style(o)), "boolean" == typeof o || null == o ? o ? " " + (n ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof o ? (-1 !== JSON.stringify(o).indexOf("&"), 
o && "function" == typeof o.toISOString, " " + e + "='" + JSON.stringify(o).replace(/'/g, "&apos;") + "'") : i ? (o && "function" == typeof o.toISOString, 
" " + e + '="' + t.escape(o) + '"') : (o && "function" == typeof o.toISOString, 
" " + e + '="' + o + '"');
}, t.attrs = function(e, o) {
var i = [], r = Object.keys(e);
if (r.length) for (var a = 0; a < r.length; ++a) {
var l = r[a], s = e[l];
"class" == l ? (s = n(s)) && i.push(" " + l + '="' + s + '"') : i.push(t.attr(l, s, !1, o));
}
return i.join("");
}, t.escape = function(e) {
var t = (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return t === "" + e ? e : t;
}, t.rethrow = function a(e, t, i, n) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || n)) throw e.message += " on line " + i, 
e;
try {
n = n || o(91).readFileSync(t, "utf8");
} catch (r) {
a(e, null, i);
}
var l = 3, s = n.split("\n"), p = Math.max(i - l, 0), _ = Math.min(s.length, i + l), l = s.slice(p, _).map(function(e, t) {
var o = t + p + 1;
return (o == i ? "  > " : "    ") + o + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + i + "\n" + l + "\n\n" + e.message, 
e;
};
},
91: function() {},
98: function(e, t, o) {
"use strict";
t.FormPayment = o(99);
},
99: function(e, t, o) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, n = function() {
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
}(), r = o(23), a = o(34), l = (o(33), o(12)), s = o(31), p = o(100), _ = function() {
function e(t, o) {
i(this, e), this.paymentMethod = t, this.orderForm = o;
}
return n(e, [ {
key: "submit",
value: function() {
var e = this.orderForm.getOrderData();
if (e) return e.paymentMethod = this.paymentMethod, "paypal" == this.paymentMethod ? void this.submitPaypalOrder(e) : void this.submitOrder(e);
}
}, {
key: "submitPaypalOrder",
value: function(e) {
var t = new l();
t.setContent(s(p));
var o = this;
t.elem.querySelector("form").onsubmit = function(i) {
i.preventDefault(), e.currency = this.elements.currency.value, t.remove(), o.submitOrder(e);
};
}
}, {
key: "submitOrder",
value: function(e) {
var t = this, o = a({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403 ],
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
var i = this.orderForm.startRequestIndication();
o.addEventListener("success", function(n) {
if (403 == o.status) return new r.Error("<p>" + (n.result.description || n.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void i();
var a = n.result;
if (a.form) {
window.ga("ec:setAction", "purchase", {
id: a.orderNumber
});
var l = document.createElement("div");
l.hidden = !0, l.innerHTML = a.form, document.body.appendChild(l);
var s = function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + e;
}, t;
}(function() {
s.called || (s.called = !0, l.firstChild.submit());
});
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: s
}), setTimeout(s, 500), window.metrika.reachGoal("PURCHASE", {
product: t.orderForm.product,
method: e.paymentMethod,
price: e.amount,
number: a.orderNumber
});
} else i(), new r.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), o.addEventListener("fail", i);
}
} ]), e;
}();
e.exports = _;
},
100: function(e, t, o) {
var i = o(88);
e.exports = function(e) {
var t, o = [], n = {}, r = e || {};
return function(e) {
o.push("");
var r = [], a = [ "block" ];
n.b = function(t, i, n) {
this && this.block, this && this.attributes || {};
e.call(this, o, r, a, t, i, n);
}, n.e = function(e) {
var t = this && this.block, o = this && this.attributes || {};
n.b.call({
block: function() {
t && t();
},
attributes: i.merge([ o ])
}, e, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
o.push("Выберите валюту");
},
attributes: {
"class": "title"
}
}, "h2"), n.e.call({
block: function() {
n.e.call({
block: function() {
n.b.call({
block: function() {
(function() {
var e = [ "RUB", "USD", "EUR" ];
if ("number" == typeof e.length) for (var r = 0, a = e.length; a > r; r++) {
var l = e[r];
n.e.call({
block: function() {
o.push(i.escape(null == (t = l) ? "" : t));
},
attributes: {
value: i.escape(l)
}
}, "option");
} else {
var a = 0;
for (var r in e) {
a++;
var l = e[r];
n.e.call({
block: function() {
o.push(i.escape(null == (t = l) ? "" : t));
},
attributes: {
value: i.escape(l)
}
}, "option");
}
}
}).call(this);
},
attributes: {
name: "currency",
"class": "input-select"
}
}, "select");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
o.push("Если у вас Российский Paypal-аккаунт, вы можете оплатить только в RUB.");
},
attributes: {
"class": "note"
}
}, "p");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
o.push("Оплатить на PayPal");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action"
}
}, "button"), n.e.call({
block: function() {
o.push("Отмена");
},
attributes: {
"class": "close-link modal__close"
}
}, "a");
},
attributes: {
"class": "line _submit"
}
});
},
attributes: {
name: "paypal-currency-form",
"class": "form"
}
}, "form");
},
attributes: {
"class": "paypal-currency-form"
}
});
}.call(this, "bem" in r ? r.bem : "undefined" != typeof bem ? bem : void 0), o.join("");
};
}
});
//# sourceMappingURL=ebook.77e59b62f3c5d7524b1e.js.map
var invoice = webpackJsonp_name_([ 11 ], {
0: function(e, t, n) {
"use strict";
var i = n(101);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new i({
elem: e
});
};
},
31: function(e, t, n) {
"use strict";
function i(e) {
e.bem = r, e.thumb = o;
}
var r = n(58)(), o = n(54).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, i(t), e(t);
};
},
34: function(e, t, n) {
"use strict";
function i(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var i = t("fail", n);
i.reason = e, r.dispatchEvent(i);
}
function i(e, n) {
var i = t("success", n);
i.result = e, r.dispatchEvent(i);
}
var r = new XMLHttpRequest(), a = e.method || "GET", s = e.body, l = e.url;
r.open(a, l, e.sync ? !1 : !0), r.method = a;
var c = o();
c && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(s) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
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
var u = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(r.status)) return void n("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее", t);
var o = r.responseText, a = r.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
o = JSON.parse(o);
} catch (t) {
return void n("Некорректный формат ответа от сервера", t);
}
i(o, t);
}), setTimeout(function() {
r.send(s);
}, 0), r;
}
var r = n(23), o = n(35);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
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
t.thumb = function(e, t, n) {
if (!e) return e;
var i = window.devicePixelRatio;
t *= i, n *= i;
var r = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + r + e.slice(e.lastIndexOf("."));
};
},
58: function(e, t, n) {
"use strict";
var i = n(88);
e.exports = function(e) {
function t(t, n, r, o, a, s) {
var l = s || e.default_tag, c = a.length;
switch (s || ("inline" === a[c - 1] ? l = "span" : "list" === a[c - 1] && (l = "li"), 
r.href ? l = "a" : r.for ? l = "label" : r.src && (l = "img")), "list" === a[c - 1] && "li" !== l ? t.push("<li>") : "list" !== a[c - 1] && "pseudo-list" !== a[c - 1] && "li" === l ? (t.push("<ul>"), 
a[a.length] = "pseudo-list") : "pseudo-list" === a[c - 1] && "li" !== l && (t.push("</ul>"), 
a.pop()), a[a.length] = -1 !== [ "a", "abbr", "acronym", "b", "br", "code", "em", "font", "i", "img", "ins", "kbd", "map", "samp", "small", "span", "strong", "sub", "sup", "label", "p", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf(l) ? "inline" : -1 !== [ "ul", "ol" ].indexOf(l) ? "list" : "block", 
l) {
case "img":
r.alt && !r.title && (r.title = ""), r.title && !r.alt && (r.alt = r.title), r.alt || (r.alt = "");
break;

case "input":
r.type || (r.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
r.href || (r.href = "#");
}
t.push("<" + l + i.attrs(i.merge([ r ]), !0) + ">"), n && n(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(l) && t.push("</" + l + ">"), 
"list" === a[c - 1] && "li" != l && t.push("</li>");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
e.default_tag = e.default_tag || "div", function(n, i, r, o, a) {
var s = this.block, l = this.attributes || {};
if (l.class) {
var c = l.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var u;
try {
u = c[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (p) {
throw Error("Incorrect bem class: " + c[0]);
}
a ? c[0] = i[i.length - 1] + e.element + c[0] : (i[i.length] = u, c[0] = c[0]);
var d = (a ? i[i.length - 1] + e.element : "") + u;
-1 === c.indexOf(d) && (c[c.length] = d);
for (var f = 0; f < c.length; f++) {
var h = c[f];
h.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? c[f] = d + h : h.match(RegExp("^" + e.element)) && (c[f] = i[i.length - 2] ? i[i.length - 2] + h : i[i.length - 1] + h), 
c[f].match(RegExp("^" + d + "($|(?=" + e.element + "|" + e.modifier + "))")) && (c[f] = e.prefix + c[f]);
}
l.class = c.sort().join(" ");
}
t(n, s, l, i, r, o), a || i.pop(), r.pop();
};
};
},
88: function(e, t, n) {
"use strict";
function i(e) {
return null != e && "" !== e;
}
function r(e) {
return (Array.isArray(e) ? e.map(r) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(i).join(" ");
}
t.merge = function o(e, t) {
if (1 === arguments.length) {
for (var n = e[0], r = 1; r < e.length; r++) n = o(n, e[r]);
return n;
}
var a = e.class, s = t.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
e.class = a.concat(s).filter(i));
for (var l in t) "class" != l && (e[l] = t[l]);
return e;
}, t.joinClasses = r, t.cls = function(e, n) {
for (var i = [], o = 0; o < e.length; o++) i.push(n && n[o] ? t.escape(r([ e[o] ])) : r(e[o]));
var a = r(i);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, i, r) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (r ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : i ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var i = [], o = Object.keys(e);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], l = e[s];
"class" == s ? (l = r(l)) && i.push(" " + s + '="' + l + '"') : i.push(t.attr(s, l, !1, n));
}
return i.join("");
}, t.escape = function(e) {
var t = (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return t === "" + e ? e : t;
}, t.rethrow = function a(e, t, i, r) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || r)) throw e.message += " on line " + i, 
e;
try {
r = r || n(91).readFileSync(t, "utf8");
} catch (o) {
a(e, null, i);
}
var s = 3, l = r.split("\n"), c = Math.max(i - s, 0), u = Math.min(l.length, i + s), s = l.slice(c, u).map(function(e, t) {
var n = t + c + 1;
return (n == i ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + i + "\n" + s + "\n\n" + e.message, 
e;
};
},
91: function() {},
98: function(e, t, n) {
"use strict";
t.FormPayment = n(99);
},
99: function(e, t, n) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, r = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, n, i) {
return n && e(t.prototype, n), i && e(t, i), t;
};
}(), o = n(23), a = n(34), s = (n(33), n(12)), l = n(31), c = n(100), u = function() {
function e(t, n) {
i(this, e), this.paymentMethod = t, this.orderForm = n;
}
return r(e, [ {
key: "submit",
value: function() {
var e = this.orderForm.getOrderData();
if (e) return e.paymentMethod = this.paymentMethod, "paypal" == this.paymentMethod ? void this.submitPaypalOrder(e) : void this.submitOrder(e);
}
}, {
key: "submitPaypalOrder",
value: function(e) {
var t = new s();
t.setContent(l(c));
var n = this;
t.elem.querySelector("form").onsubmit = function(i) {
i.preventDefault(), e.currency = this.elements.currency.value, t.remove(), n.submitOrder(e);
};
}
}, {
key: "submitOrder",
value: function(e) {
var t = this, n = a({
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
n.addEventListener("success", function(r) {
if (403 == n.status) return new o.Error("<p>" + (r.result.description || r.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void i();
var a = r.result;
if (a.form) {
window.ga("ec:setAction", "purchase", {
id: a.orderNumber
});
var s = document.createElement("div");
s.hidden = !0, s.innerHTML = a.form, document.body.appendChild(s);
var l = function(e) {
function t() {
return e.apply(this, arguments);
}
return t.toString = function() {
return "" + e;
}, t;
}(function() {
l.called || (l.called = !0, s.firstChild.submit());
});
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: l
}), setTimeout(l, 500), window.metrika.reachGoal("PURCHASE", {
product: t.orderForm.product,
method: e.paymentMethod,
price: e.amount,
number: a.orderNumber
});
} else i(), new o.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), n.addEventListener("fail", i);
}
} ]), e;
}();
e.exports = u;
},
100: function(e, t, n) {
var i = n(88);
e.exports = function(e) {
var t, n = [], r = {}, o = e || {};
return function(e) {
n.push("");
var o = [], a = [ "block" ];
r.b = function(t, i, r) {
this && this.block, this && this.attributes || {};
e.call(this, n, o, a, t, i, r);
}, r.e = function(e) {
var t = this && this.block, n = this && this.attributes || {};
r.b.call({
block: function() {
t && t();
},
attributes: i.merge([ n ])
}, e, !0);
}, r.b.call({
block: function() {
r.e.call({
block: function() {
n.push("Выберите валюту");
},
attributes: {
"class": "title"
}
}, "h2"), r.e.call({
block: function() {
r.e.call({
block: function() {
r.b.call({
block: function() {
(function() {
var e = [ "RUB", "USD", "EUR" ];
if ("number" == typeof e.length) for (var o = 0, a = e.length; a > o; o++) {
var s = e[o];
r.e.call({
block: function() {
n.push(i.escape(null == (t = s) ? "" : t));
},
attributes: {
value: i.escape(s)
}
}, "option");
} else {
var a = 0;
for (var o in e) {
a++;
var s = e[o];
r.e.call({
block: function() {
n.push(i.escape(null == (t = s) ? "" : t));
},
attributes: {
value: i.escape(s)
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
}), r.e.call({
block: function() {
r.e.call({
block: function() {
n.push("Если у вас Российский Paypal-аккаунт, вы можете оплатить только в RUB.");
},
attributes: {
"class": "note"
}
}, "p");
},
attributes: {
"class": "line"
}
}), r.e.call({
block: function() {
r.b.call({
block: function() {
r.e.call({
block: function() {
n.push("Оплатить на PayPal");
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
}, "button"), r.e.call({
block: function() {
n.push("Отмена");
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
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0), n.join("");
};
},
101: function(e, t, n) {
"use strict";
var i = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, r = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
Object.defineProperty(e, i.key, i);
}
}
return function(t, n, i) {
return n && e(t.prototype, n), i && e(t, i), t;
};
}(), o = n(34), a = n(23), s = n(40), l = n(98).FormPayment, c = n(33), u = (n(12), 
function() {
function e(t) {
var n = this;
i(this, e), this.elem = t.elem, this.product = "invoice", this.elem.addEventListener("submit", function(e) {
return e.preventDefault();
}), this.delegate('[name="paymentMethod"]', "click", function(e) {
return n.onPaymentMethodClick(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
});
}
return r(e, [ {
key: "getOrderData",
value: function() {
var e = {};
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return new a.Error("Введите email."), this.elem.elements.email.scrollIntoView(), 
setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.email.focus();
e.email = this.elem.elements.email.value;
}
if (!this.elem.elements.invoiceNumber.value) return new a.Error("Введите номер счета javascript.ru."), 
this.elem.elements.invoiceNumber.scrollIntoView(), setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.invoiceNumber.focus();
if (e.invoiceNumber = this.elem.elements.invoiceNumber.value, window.orderNumber) e.orderNumber = window.orderNumber; else if (e.orderTemplate = "invoice", 
e.amount = this.elem.elements.amount.value, !e.amount) return new a.Error("Введите сумму."), 
this.elem.elements.amount.scrollIntoView(), setTimeout(function() {
window.scrollBy(0, -200);
}, 0), void this.elem.elements.amount.focus();
return e;
}
}, {
key: "onPaymentMethodClick",
value: function(e) {
var t = e.delegateTarget.value;
new l(t, this).submit();
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
var t = o(e);
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
var t = new c({
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
s.delegateMixin(u.prototype), e.exports = u;
}
});
//# sourceMappingURL=invoice.77e59b62f3c5d7524b1e.js.map
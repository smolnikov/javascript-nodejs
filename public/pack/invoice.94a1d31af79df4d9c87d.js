var invoice = webpackJsonp_name_([ 11 ], {
0: function(e, t, n) {
"use strict";
var r = n(146);
t.init = function() {
var e = document.querySelector("[data-order-form]");
e && new r({
elem: e
});
};
},
91: function() {},
133: function(e, t, n) {
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
var i = new XMLHttpRequest(), a = e.method || "GET", s = e.body, l = e.url;
i.open(a, l, e.sync ? !1 : !0), i.method = a;
var c = o();
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
var u = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", t);
var o = i.responseText, a = i.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
o = JSON.parse(o);
} catch (t) {
return void n("Некорректный формат ответа от сервера", t);
}
r(o, t);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(128), o = n(163);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = r;
},
141: function(e, t, n) {
"use strict";
function r(e) {
e.bem = i, e.thumb = o;
}
var i = n(169)(), o = n(164).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, r(t), e(t);
};
},
146: function(e, t, n) {
"use strict";
var r = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, i = function() {
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
}(), o = n(133), a = n(128), s = n(132), l = n(171).FormPayment, c = n(144), u = (n(114), 
function() {
function e(t) {
var n = this;
r(this, e), this.elem = t.elem, this.product = "invoice", this.elem.addEventListener("submit", function(e) {
return e.preventDefault();
}), this.delegate('[name="paymentMethod"]', "click", function(e) {
return n.onPaymentMethodClick(e);
}), this.delegate("[data-order-payment-change]", "click", function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
});
}
return i(e, [ {
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
},
163: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
164: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var r = window.devicePixelRatio;
t *= r, n *= r;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
},
169: function(e, t, n) {
"use strict";
var r = n(199);
e.exports = function(e) {
function t(t, n, i, o, a, s) {
var l = s || e.default_tag, c = a.length;
switch (s || ("inline" === a[c - 1] ? l = "span" : "list" === a[c - 1] && (l = "li"), 
i.href ? l = "a" : i.for ? l = "label" : i.src && (l = "img")), "list" === a[c - 1] && "li" !== l ? t.push("<li>") : "list" !== a[c - 1] && "pseudo-list" !== a[c - 1] && "li" === l ? (t.push("<ul>"), 
a[a.length] = "pseudo-list") : "pseudo-list" === a[c - 1] && "li" !== l && (t.push("</ul>"), 
a.pop()), -1 !== [ "a", "abbr", "acronym", "b", "br", "code", "em", "font", "i", "img", "ins", "kbd", "map", "samp", "small", "span", "strong", "sub", "sup", "label", "p", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf(l) ? a[a.length] = "inline" : -1 !== [ "ul", "ol" ].indexOf(l) ? a[a.length] = "list" : a[a.length] = "block", 
l) {
case "img":
i.alt && !i.title && (i.title = ""), i.title && !i.alt && (i.alt = i.title), i.alt || (i.alt = "");
break;

case "input":
i.type || (i.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
i.href || (i.href = "#");
}
t.push("<" + l + r.attrs(r.merge([ i ]), !0) + ">"), n && n(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(l) && t.push("</" + l + ">"), 
"list" === a[c - 1] && "li" != l && t.push("</li>");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
e.default_tag = e.default_tag || "div", function(n, r, i, o, a) {
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
a ? c[0] = r[r.length - 1] + e.element + c[0] : (r[r.length] = u, c[0] = c[0]);
var d = (a ? r[r.length - 1] + e.element : "") + u;
-1 === c.indexOf(d) && (c[c.length] = d);
for (var f = 0; f < c.length; f++) {
var h = c[f];
h.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? c[f] = d + h : h.match(RegExp("^" + e.element)) && (r[r.length - 2] ? c[f] = r[r.length - 2] + h : c[f] = r[r.length - 1] + h), 
c[f].match(RegExp("^" + d + "($|(?=" + e.element + "|" + e.modifier + "))")) && (c[f] = e.prefix + c[f]);
}
l.class = c.sort().join(" ");
}
t(n, s, l, r, i, o), a || r.pop(), i.pop();
};
};
},
171: function(e, t, n) {
"use strict";
t.FormPayment = n(201);
},
199: function(e, t, n) {
"use strict";
function r(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(r).join(" ");
}
t.merge = function o(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = o(n, e[i]);
return n;
}
var a = e.class, s = t.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
e.class = a.concat(s).filter(r));
for (var l in t) "class" != l && (e[l] = t[l]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var r = [], o = 0; o < e.length; o++) r.push(n && n[o] ? t.escape(i([ e[o] ])) : i(e[o]));
var a = i(r);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, r, i) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var r = [], o = Object.keys(e);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], l = e[s];
"class" == s ? (l = i(l)) && r.push(" " + s + '="' + l + '"') : r.push(t.attr(s, l, !1, n));
}
return r.join("");
}, t.escape = function(e) {
var t = (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return t === "" + e ? e : t;
}, t.rethrow = function a(e, t, r, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + r, 
e;
try {
i = i || n(91).readFileSync(t, "utf8");
} catch (o) {
a(e, null, r);
}
var s = 3, l = i.split("\n"), c = Math.max(r - s, 0), u = Math.min(l.length, r + s), s = l.slice(c, u).map(function(e, t) {
var n = t + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + s + "\n\n" + e.message, 
e;
};
},
201: function(e, t, n) {
"use strict";
var r = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, i = function() {
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
}(), o = n(128), a = n(133), s = (n(144), n(114)), l = n(141), c = n(205), u = function() {
function e(t, n) {
r(this, e), this.paymentMethod = t, this.orderForm = n;
}
return i(e, [ {
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
t.elem.querySelector("form").onsubmit = function(r) {
r.preventDefault(), e.currency = this.elements.currency.value, t.remove(), n.submitOrder(e);
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
var r = this.orderForm.startRequestIndication();
n.addEventListener("success", function(i) {
if (403 == n.status) return new o.Error("<p>" + (i.result.description || i.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void r();
var a = i.result;
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
} else r(), new o.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), n.addEventListener("fail", r);
}
} ]), e;
}();
e.exports = u;
},
205: function(e, t, n) {
var r = n(199);
e.exports = function(e) {
var t, n = [], i = {}, o = e || {};
return function(e) {
n.push("");
var o = [], a = [ "block" ];
i.b = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, o, a, t, r, i);
}, i.e = function(e) {
var t = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
t && t();
},
attributes: r.merge([ n ])
}, e, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Выберите валюту");
},
attributes: {
"class": "title"
}
}, "h2"), i.e.call({
block: function() {
i.e.call({
block: function() {
i.b.call({
block: function() {
(function() {
var e = [ "RUB", "USD", "EUR" ];
if ("number" == typeof e.length) for (var o = 0, a = e.length; a > o; o++) {
var s = e[o];
i.e.call({
block: function() {
n.push(r.escape(null == (t = s) ? "" : t));
},
attributes: {
value: r.escape(s)
}
}, "option");
} else {
var a = 0;
for (var o in e) {
a++;
var s = e[o];
i.e.call({
block: function() {
n.push(r.escape(null == (t = s) ? "" : t));
},
attributes: {
value: r.escape(s)
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
}), i.e.call({
block: function() {
i.e.call({
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
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
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
}, "button"), i.e.call({
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
}
});
//# sourceMappingURL=invoice.94a1d31af79df4d9c87d.js.map
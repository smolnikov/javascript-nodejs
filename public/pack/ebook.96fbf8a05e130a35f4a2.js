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
91: function() {},
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
var r = new XMLHttpRequest(), a = e.method || "GET", l = e.body, s = e.url;
r.open(a, s, e.sync ? !1 : !0), r.method = a;
var p = n();
p && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", p), "[object Object]" == {}.toString.call(l) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
l = JSON.stringify(l)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
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
var n = r.responseText, a = r.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || e.json) try {
n = JSON.parse(n);
} catch (t) {
return void o("Некорректный формат ответа от сервера", t);
}
i(n, t);
}), setTimeout(function() {
r.send(l);
}, 0), r;
}
var r = o(128), n = o(163);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = i;
},
141: function(e, t, o) {
"use strict";
function i(e) {
e.bem = r, e.thumb = n;
}
var r = o(169)(), n = o(164).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, i(t), e(t);
};
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
}(), n = o(133), a = o(128), l = o(132), s = o(171).FormPayment, p = o(144), _ = (o(114), 
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
return r(e, [ {
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
var t = n(e);
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
163: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
164: function(e, t) {
"use strict";
t.thumb = function(e, t, o) {
if (!e) return e;
var i = window.devicePixelRatio;
t *= i, o *= i;
var r = 160 >= t && 160 >= o ? "t" : 320 >= t && 320 >= o ? "m" : 640 >= t && 640 >= o ? "i" : 1024 >= t && 1024 >= o ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + r + e.slice(e.lastIndexOf("."));
};
},
169: function(e, t, o) {
"use strict";
var i = o(199);
e.exports = function(e) {
function t(t, o, r, n, a, l) {
var s = l || e.default_tag, p = a.length;
switch (l || ("inline" === a[p - 1] ? s = "span" : "list" === a[p - 1] && (s = "li"), 
r.href ? s = "a" : r.for ? s = "label" : r.src && (s = "img")), "list" === a[p - 1] && "li" !== s ? t.push("<li>") : "list" !== a[p - 1] && "pseudo-list" !== a[p - 1] && "li" === s ? (t.push("<ul>"), 
a[a.length] = "pseudo-list") : "pseudo-list" === a[p - 1] && "li" !== s && (t.push("</ul>"), 
a.pop()), -1 !== [ "a", "abbr", "acronym", "b", "br", "code", "em", "font", "i", "img", "ins", "kbd", "map", "samp", "small", "span", "strong", "sub", "sup", "label", "p", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf(s) ? a[a.length] = "inline" : -1 !== [ "ul", "ol" ].indexOf(s) ? a[a.length] = "list" : a[a.length] = "block", 
s) {
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
t.push("<" + s + i.attrs(i.merge([ r ]), !0) + ">"), o && o(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(s) && t.push("</" + s + ">"), 
"list" === a[p - 1] && "li" != s && t.push("</li>");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
e.default_tag = e.default_tag || "div", function(o, i, r, n, a) {
var l = this.block, s = this.attributes || {};
if (s.class) {
var p = s.class;
p instanceof Array && (p = p.join(" ")), p = p.split(" ");
var _;
try {
_ = p[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (c) {
throw Error("Incorrect bem class: " + p[0]);
}
a ? p[0] = i[i.length - 1] + e.element + p[0] : (i[i.length] = _, p[0] = p[0]);
var d = (a ? i[i.length - 1] + e.element : "") + _;
-1 === p.indexOf(d) && (p[p.length] = d);
for (var b = 0; b < p.length; b++) {
var f = p[b];
f.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? p[b] = d + f : f.match(RegExp("^" + e.element)) && (i[i.length - 2] ? p[b] = i[i.length - 2] + f : p[b] = i[i.length - 1] + f), 
p[b].match(RegExp("^" + d + "($|(?=" + e.element + "|" + e.modifier + "))")) && (p[b] = e.prefix + p[b]);
}
s.class = p.sort().join(" ");
}
t(o, l, s, i, r, n), a || i.pop(), r.pop();
};
};
},
171: function(e, t, o) {
"use strict";
t.FormPayment = o(201);
},
199: function(e, t, o) {
"use strict";
function i(e) {
return null != e && "" !== e;
}
function r(e) {
return (Array.isArray(e) ? e.map(r) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(i).join(" ");
}
t.merge = function n(e, t) {
if (1 === arguments.length) {
for (var o = e[0], r = 1; r < e.length; r++) o = n(o, e[r]);
return o;
}
var a = e.class, l = t.class;
(a || l) && (a = a || [], l = l || [], Array.isArray(a) || (a = [ a ]), Array.isArray(l) || (l = [ l ]), 
e.class = a.concat(l).filter(i));
for (var s in t) "class" != s && (e[s] = t[s]);
return e;
}, t.joinClasses = r, t.cls = function(e, o) {
for (var i = [], n = 0; n < e.length; n++) i.push(o && o[n] ? t.escape(r([ e[n] ])) : r(e[n]));
var a = r(i);
return a.length ? ' class="' + a + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, o, i, r) {
return "style" === e && (o = t.style(o)), "boolean" == typeof o || null == o ? o ? " " + (r ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof o ? (-1 !== JSON.stringify(o).indexOf("&"), 
o && "function" == typeof o.toISOString, " " + e + "='" + JSON.stringify(o).replace(/'/g, "&apos;") + "'") : i ? (o && "function" == typeof o.toISOString, 
" " + e + '="' + t.escape(o) + '"') : (o && "function" == typeof o.toISOString, 
" " + e + '="' + o + '"');
}, t.attrs = function(e, o) {
var i = [], n = Object.keys(e);
if (n.length) for (var a = 0; a < n.length; ++a) {
var l = n[a], s = e[l];
"class" == l ? (s = r(s)) && i.push(" " + l + '="' + s + '"') : i.push(t.attr(l, s, !1, o));
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
r = r || o(91).readFileSync(t, "utf8");
} catch (n) {
a(e, null, i);
}
var l = 3, s = r.split("\n"), p = Math.max(i - l, 0), _ = Math.min(s.length, i + l), l = s.slice(p, _).map(function(e, t) {
var o = t + p + 1;
return (o == i ? "  > " : "    ") + o + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + i + "\n" + l + "\n\n" + e.message, 
e;
};
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
}(), n = o(128), a = o(133), l = (o(144), o(114)), s = o(141), p = o(205), _ = function() {
function e(t, o) {
i(this, e), this.paymentMethod = t, this.orderForm = o;
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
o.addEventListener("success", function(r) {
if (403 == o.status) return new n.Error("<p>" + (r.result.description || r.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void i();
var a = r.result;
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
} else i(), new n.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), o.addEventListener("fail", i);
}
} ]), e;
}();
e.exports = _;
},
205: function(e, t, o) {
var i = o(199);
e.exports = function(e) {
var t, o = [], r = {}, n = e || {};
return function(e) {
o.push("");
var n = [], a = [ "block" ];
r.b = function(t, i, r) {
this && this.block, this && this.attributes || {};
e.call(this, o, n, a, t, i, r);
}, r.e = function(e) {
var t = this && this.block, o = this && this.attributes || {};
r.b.call({
block: function() {
t && t();
},
attributes: i.merge([ o ])
}, e, !0);
}, r.b.call({
block: function() {
r.e.call({
block: function() {
o.push("Выберите валюту");
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
if ("number" == typeof e.length) for (var n = 0, a = e.length; a > n; n++) {
var l = e[n];
r.e.call({
block: function() {
o.push(i.escape(null == (t = l) ? "" : t));
},
attributes: {
value: i.escape(l)
}
}, "option");
} else {
var a = 0;
for (var n in e) {
a++;
var l = e[n];
r.e.call({
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
}), r.e.call({
block: function() {
r.e.call({
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
}), r.e.call({
block: function() {
r.b.call({
block: function() {
r.e.call({
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
}, "button"), r.e.call({
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
}.call(this, "bem" in n ? n.bem : "undefined" != typeof bem ? bem : void 0), o.join("");
};
}
});
//# sourceMappingURL=ebook.96fbf8a05e130a35f4a2.js.map
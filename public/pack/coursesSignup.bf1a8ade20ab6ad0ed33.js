var coursesSignup = webpackJsonp_name_([ 7 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = document.querySelector('[data-elem="signup"]');
t && new i({
elem: t
});
}
var i = n(57);
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
49: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.thumb = a;
}
var i = n(78)(), a = n(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
54: function(t) {
"use strict";
function e(t) {
return t % 10 == 1 && t % 100 != 11 ? "one" : t % 10 >= 2 && 4 >= t % 10 && (12 > t % 100 || t % 100 > 14) && t == Math.floor(t) ? "few" : t % 10 === 0 || t % 10 >= 5 && 9 >= t % 10 || t % 100 >= 11 && 14 >= t % 100 && t == Math.floor(t) ? "many" : "other";
}
function n(t, n, r, i) {
var a = e(t);
switch (a) {
case "one":
return n;

case "few":
return r;

case "many":
return i;

default:
throw Error("Unsupported count: " + t);
}
}
t.exports = n;
},
56: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
57: function(t, e, n) {
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
}(), a = n(28), o = (n(23), n(27)), s = n(85).FormPayment, u = n(53), c = (n(10), 
n(73)), l = n(74), f = n(54), h = function() {
function t(e) {
var n = this;
if (r(this, t), this.elem = e.elem, this.product = "course", this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(t) {
n.elems[t.getAttribute("data-elem")] = t;
}), this.elems.participants) {
var i = new c({
elem: this.elems.participants
});
i.elem.addEventListener("select", this.onParticipantsFormSelect.bind(this)), this.elems.receiptParticipantsEditLink.onclick = function(t) {
t.preventDefault(), n.goStep1();
};
}
if (this.elems.contact) {
var a = this.contactForm = new l({
elem: this.elems.contact
});
a.elem.addEventListener("select", this.onContactFormSelect.bind(this)), this.elems.receiptContactEditLink.onclick = function(t) {
t.preventDefault(), n.goStep2();
};
}
this.elems.payment.onsubmit = this.onPaymentSubmit.bind(this);
}
return i(t, [ {
key: "onPaymentSubmit",
value: function() {
event.preventDefault(), new s(this, this.elem.querySelector(".pay-method")).submit();
}
}, {
key: "goStep1",
value: function() {
this.elem.className = this.elem.className.replace(/courses-register_step_\d/, ""), 
this.elem.classList.add("courses-register_step_1");
}
}, {
key: "goStep2",
value: function() {
this.elem.className = this.elem.className.replace(/courses-register_step_\d/, ""), 
this.elem.classList.add("courses-register_step_2"), this.elems.receiptTitle.innerHTML = "Участие в курсе для " + this.participantsInfo.count + "\n      " + f(this.participantsInfo.count, "человека", "человек", "человек"), 
this.elems.receiptAmount.innerHTML = window.groupInfo.price * this.participantsInfo.count, 
this.contactForm.focus();
}
}, {
key: "goStep3",
value: function() {
this.elem.className = this.elem.className.replace(/courses-register_step_\d/, ""), 
this.elem.classList.add("courses-register_step_3"), this.elems.receiptContactName.innerHTML = this.contactInfo.name, 
this.elems.receiptContactPhone.innerHTML = this.contactInfo.phone;
}
}, {
key: "onParticipantsFormSelect",
value: function(t) {
this.participantsInfo = t.detail, this.goStep2();
}
}, {
key: "onContactFormSelect",
value: function(t) {
this.contactInfo = t.detail, this.goStep3();
}
}, {
key: "getOrderData",
value: function() {
var t = {};
return window.orderNumber ? t.orderNumber = window.orderNumber : (t.slug = window.groupInfo.slug, 
t.orderTemplate = "course", t.contactName = this.contactInfo.name, t.contactPhone = this.contactInfo.phone, 
t.count = this.participantsInfo.count, t.emails = this.participantsInfo.emails), 
t;
}
}, {
key: "request",
value: function e(t) {
var e = a(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}
}, {
key: "startRequestIndication",
value: function() {
var t = this.elem.querySelector(".pay-method");
t.classList.add("modal-overlay_light");
var e = new u({
elem: t,
size: "medium",
"class": "pay-method__spinner"
});
return e.start(), function() {
t.classList.remove("modal-overlay_light"), e && e.stop();
};
}
} ]), t;
}();
o.delegateMixin(h.prototype), t.exports = h;
},
73: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function i(t) {
this.name = "InvalidError", this.message = t;
}
var a = function() {
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
}(), o = n(27), s = n(110), u = n(23), c = n(49), l = function() {
function t(e) {
var n = this;
r(this, t), this.elem = e.elem, this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(t) {
n.elems[t.getAttribute("data-elem")] = t;
}), this.elem.onsubmit = this.onSubmit.bind(this), this.elems.participantsDecreaseButton.onclick = this.onParticipantsDecreaseButtonClick.bind(this), 
this.elems.participantsDecreaseButton.onmousedown = function() {
return !1;
}, this.elems.participantsIncreaseButton.onclick = this.onParticipantsIncreaseButtonClick.bind(this), 
this.elems.participantsIncreaseButton.onmousedown = function() {
return !1;
}, this.elems.participantsCountInput.onkeydown = function(t) {
13 == t.keyCode && "INPUT" == t.target.tagName && (t.preventDefault(), t.target.blur());
}, this.elems.participantsCountInput.onchange = this.onParticipantsCountInputChange.bind(this), 
this.elems.participantsIsSelf.onchange = this.onParticipantsIsSelfChange.bind(this), 
this.elems.participantsAddList.onchange = function(t) {
n.validateParticipantItemInput(t.target);
}, this.elems.participantsAddList.onkeydown = function(t) {
13 == t.keyCode && "INPUT" == t.target.tagName && (t.preventDefault(), t.target.blur());
};
}
return a(t, [ {
key: "validateParticipantItemInput",
value: function(t) {
var e = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(t.value);
e ? t.parentNode.classList.remove("text-input_invalid") : t.parentNode.classList.add("text-input_invalid");
}
}, {
key: "onParticipantsDecreaseButtonClick",
value: function() {
this.setCount(this.elems.participantsCountInput.value - 1);
}
}, {
key: "onParticipantsIncreaseButtonClick",
value: function() {
this.setCount(+this.elems.participantsCountInput.value + 1);
}
}, {
key: "onParticipantsCountInputChange",
value: function() {
this.setCount(this.elems.participantsCountInput.value);
}
}, {
key: "onParticipantsIsSelfChange",
value: function() {
this.setCount(this.elems.participantsCountInput.value);
}
}, {
key: "setCount",
value: function(t) {
t = parseInt(t) || 0;
var e = +this.elems.participantsCountInput.getAttribute("max");
this.elems.participantsDecreaseButton.disabled = 1 >= t, this.elems.participantsIncreaseButton.disabled = t >= e, 
this.elems.participantsCountInput.value = t;
var n = 1 > t || t > e;
if (n) return void this.elems.participantsCountInput.parentNode.classList.add("text-input_invalid");
for (this.elems.participantsAmount.innerHTML = window.groupInfo.price * t, this.elems.participantsAmountUsd.innerHTML = Math.round(window.groupInfo.price * t / window.rateUsdRub), 
this.elems.participantsCountInput.parentNode.classList.remove("text-input_invalid"), 
!this.elems.participantsIsSelf.checked || t > 1 ? this.elems.participantsAddBox.classList.add("course-add-participants_visible") : this.elems.participantsAddBox.classList.remove("course-add-participants_visible"); this.elems.participantsAddList.children.length > t; ) this.elems.participantsAddList.lastElementChild.remove();
for (;this.elems.participantsAddList.children.length < t; ) {
var r = c(s);
this.elems.participantsAddList.insertAdjacentHTML("beforeEnd", r);
}
var i = this.elems.participantsAddList.firstElementChild.querySelector("input");
this.elems.participantsIsSelf.checked ? (i.disabled = !0, i.value = window.currentUser.email) : (i.disabled = !1, 
i.value = "");
}
}, {
key: "onSubmit",
value: function(t) {
t.preventDefault();
try {
if (this.elems.participantsCountInput.parentNode.classList.contains("text-input_invalid")) throw new i();
var e = +this.elems.participantsCountInput.value, n = [];
this.elems.participantsListEnabled.checked ? [].forEach.call(this.elems.participantsAddList.querySelectorAll("input"), function(t) {
if (t.value) {
if (t.parentNode.classList.contains("text-input_invalid")) throw new i();
n.push(t.value);
}
}) : this.elems.participantsIsSelf.checked && n.push(window.currentUser.email), 
this.elem.dispatchEvent(new CustomEvent("select", {
detail: {
count: e,
emails: n
}
}));
} catch (r) {
if (!(r instanceof i)) throw r;
new u.Error("Исправьте, пожалуйста, ошибки.");
}
}
} ]), t;
}();
i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, o.delegateMixin(l.prototype), 
t.exports = l;
},
74: function(t, e, n) {
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
}(), a = (n(27), function() {
function t(e) {
var n = this;
r(this, t), this.elem = e.elem, this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(t) {
n.elems[t.getAttribute("data-elem")] = t;
}), this.elem.onsubmit = this.onSubmit.bind(this);
}
return i(t, [ {
key: "focus",
value: function() {
this.elems.contactName.focus();
}
}, {
key: "onSubmit",
value: function(t) {
t.preventDefault(), this.elem.dispatchEvent(new CustomEvent("select", {
detail: {
name: this.elems.contactName.value,
phone: this.elems.contactPhone.value
}
}));
}
} ]), t;
}());
t.exports = a;
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
78: function(t, e, n) {
"use strict";
var r = n(108);
t.exports = function(t) {
function e(t, e, n, i, a) {
var o = a || "div";
switch (o) {
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
t.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, a) {
var o = this.block, s = this.attributes || {};
if (!s.class && i && !a) throw Error("Block without class: " + i);
if (s.class) {
var u = s.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var c;
try {
c = u[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
a ? u[0] = r[r.length - 1] + t.element + u[0] : r[r.length] = c;
var f = (a ? r[r.length - 1] + t.element : "") + c;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var h = 0; h < u.length; h++) {
var p = u[h];
p.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? u[h] = f + p : p.match(RegExp("^" + t.element)) && (r[r.length - 2] ? u[h] = r[r.length - 2] + p : u[h] = r[r.length - 1] + p), 
u[h].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (u[h] = t.prefix + u[h]);
}
s.class = u.sort().join(" ");
}
e(n, o, s, r, i), a || r.pop();
};
};
},
85: function(t, e, n) {
"use strict";
e.FormPayment = n(118);
},
108: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
e.merge = function a(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = a(n, t[i]);
return n;
}
var o = t.class, s = e.class;
(o || s) && (o = o || [], s = s || [], Array.isArray(o) || (o = [ o ]), Array.isArray(s) || (s = [ s ]), 
t.class = o.concat(s).filter(r));
for (var u in e) "class" != u && (t[u] = e[u]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], a = 0; a < t.length; a++) n && n[a] ? r.push(e.escape(i([ t[a] ]))) : r.push(i(t[a]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], a = Object.keys(t);
if (a.length) for (var o = 0; o < a.length; ++o) {
var s = a[o], u = t[s];
"class" == s ? (u = i(u)) && r.push(" " + s + '="' + u + '"') : r.push(e.attr(s, u, !1, n));
}
return r.join("");
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function o(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (a) {
o(t, null, r);
}
var s = 3, u = i.split("\n"), c = Math.max(r - s, 0), l = Math.min(u.length, r + s), s = u.slice(c, l).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + s + "\n\n" + t.message, 
t;
};
},
110: function(t, e, n) {
var r = n(108);
t.exports = function(t) {
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, a) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, a);
}, n.e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: r.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Участник");
},
attributes: {
"class": "participant-n"
}
}, "span"), n.b.call({
block: function() {
n.e.call({
attributes: {
placeholder: "email",
name: "email",
type: "email",
"class": "control"
}
}, "input"), n.e.call({
block: function() {
e.push("введите корректный email");
},
attributes: {
"class": "err"
}
}, "span");
},
attributes: {
"class": "text-input"
}
}, "span");
},
attributes: {
"class": "participant"
}
}, "label");
},
attributes: {
"class": "course-add-participants-item"
}
}, "li");
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
116: function() {},
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
var i = o({
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
var s = this.startRequestIndication();
i.addEventListener("success", function(n) {
if (403 == i.status) return new a.Error("<p>" + (n.result.description || n.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
if (400 == i.status) return new a.Error("<p>" + n.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
var r = n.result;
if (r.form) {
window.ga("ec:setAction", "purchase", {
id: r.orderNumber
});
var o = document.createElement("div");
o.hidden = !0, o.innerHTML = r.form, document.body.appendChild(o);
var u = function c() {
c.called || (c.called = !0, o.firstChild.submit());
};
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: u
}), setTimeout(u, 500), window.metrika.reachGoal("PURCHASE", {
product: t.orderForm.product,
method: e.paymentMethod,
price: e.amount,
number: r.orderNumber
});
} else s(), new a.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), i.addEventListener("fail", s);
}
}
} ]), t;
}());
t.exports = u;
}
});
//# sourceMappingURL=coursesSignup.bf1a8ade20ab6ad0ed33.js.map
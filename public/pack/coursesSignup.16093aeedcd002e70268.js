var coursesSignup = webpackJsonp_name_([ 7 ], {
0: function(e, t, n) {
"use strict";
function r() {
var e = document.querySelector('[data-elem="signup"]');
e && new i({
elem: e
});
}
var i = n(57);
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
49: function(e, t, n) {
"use strict";
function r(e) {
e.bem = i, e.thumb = a;
}
var i = n(78)(), a = n(56).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, r(t), e(t);
};
},
54: function(e) {
"use strict";
function t(e) {
return e % 10 == 1 && e % 100 != 11 ? "one" : e % 10 >= 2 && 4 >= e % 10 && (12 > e % 100 || e % 100 > 14) && e == Math.floor(e) ? "few" : e % 10 === 0 || e % 10 >= 5 && 9 >= e % 10 || e % 100 >= 11 && 14 >= e % 100 && e == Math.floor(e) ? "many" : "other";
}
function n(e, n, r, i) {
var a = t(e);
switch (a) {
case "one":
return n;

case "few":
return r;

case "many":
return i;

default:
throw Error("Unsupported count: " + e);
}
}
e.exports = n;
},
56: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var r = window.devicePixelRatio;
t *= r, n *= r;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
},
57: function(e, t, n) {
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
}(), a = n(28), o = (n(23), n(27)), s = n(85).FormPayment, u = n(53), c = (n(10), 
n(73)), l = n(74), f = n(54), p = function() {
function e(t) {
var n = this;
if (r(this, e), this.elem = t.elem, this.product = "course", this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(e) {
n.elems[e.getAttribute("data-elem")] = e;
}), this.elems.participants) {
var i = new c({
elem: this.elems.participants
});
i.elem.addEventListener("select", this.onParticipantsFormSelect.bind(this)), this.elems.receiptParticipantsEditLink.onclick = function(e) {
e.preventDefault(), n.goStep1();
};
}
if (this.elems.contact) {
var a = this.contactForm = new l({
elem: this.elems.contact
});
a.elem.addEventListener("contact-submit", this.onContactFormSelect.bind(this)), 
this.elems.receiptContactEditLink.onclick = function(e) {
e.preventDefault(), n.goStep2();
};
}
this.elems.payment.onsubmit = this.onPaymentSubmit.bind(this);
}
return i(e, [ {
key: "onPaymentSubmit",
value: function(e) {
e.preventDefault(), new s(this, this.elem.querySelector('[data-elem="payment"]')).submit();
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
value: function(e) {
this.participantsInfo = e.detail, this.goStep2();
}
}, {
key: "onContactFormSelect",
value: function(e) {
this.contactInfo = e.detail, this.goStep3();
}
}, {
key: "getOrderData",
value: function() {
var e = {};
return window.orderNumber ? e.orderNumber = window.orderNumber : (e.slug = window.groupInfo.slug, 
e.orderTemplate = "course", e.contactName = this.contactInfo.name, e.contactPhone = this.contactInfo.phone, 
e.count = this.participantsInfo.count, e.emails = this.participantsInfo.emails), 
e;
}
}, {
key: "request",
value: function t(e) {
var t = a(e);
return t.addEventListener("loadstart", function() {
var e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
}
}, {
key: "startRequestIndication",
value: function() {
var e = this.elem.querySelector(".pay-method");
e.classList.add("modal-overlay_light");
var t = new u({
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
o.delegateMixin(p.prototype), e.exports = p;
},
73: function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e) {
this.name = "InvalidError", this.message = e;
}
var a = function() {
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
}(), o = n(27), s = n(110), u = n(23), c = n(49), l = function() {
function e(t) {
var n = this;
r(this, e), this.elem = t.elem, this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(e) {
n.elems[e.getAttribute("data-elem")] = e;
}), this.elem.onsubmit = this.onSubmit.bind(this), this.elems.participantsDecreaseButton.onclick = this.onParticipantsDecreaseButtonClick.bind(this), 
this.elems.participantsDecreaseButton.onmousedown = function() {
return !1;
}, this.elems.participantsIncreaseButton.onclick = this.onParticipantsIncreaseButtonClick.bind(this), 
this.elems.participantsIncreaseButton.onmousedown = function() {
return !1;
}, this.elems.participantsCountInput.onkeydown = function(e) {
13 == e.keyCode && "INPUT" == e.target.tagName && (e.preventDefault(), e.target.blur());
}, this.elems.participantsCountInput.onchange = this.onParticipantsCountInputChange.bind(this), 
this.elems.participantsIsSelf.onchange = this.onParticipantsIsSelfChange.bind(this), 
this.elems.participantsAddList.onchange = function(e) {
n.validateParticipantItemInput(e.target);
}, this.elems.participantsAddList.onkeydown = function(e) {
13 == e.keyCode && "INPUT" == e.target.tagName && (e.preventDefault(), e.target.blur());
};
}
return a(e, [ {
key: "validateParticipantItemInput",
value: function(e) {
var t = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(e.value);
t ? e.parentNode.classList.remove("text-input_invalid") : e.parentNode.classList.add("text-input_invalid");
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
value: function(e) {
e = parseInt(e) || 0;
var t = +this.elems.participantsCountInput.getAttribute("max");
this.elems.participantsDecreaseButton.disabled = 1 >= e, this.elems.participantsIncreaseButton.disabled = e >= t, 
this.elems.participantsCountInput.value = e;
var n = 1 > e || e > t;
if (n) return void this.elems.participantsCountInput.parentNode.classList.add("text-input_invalid");
for (this.elems.participantsAmount.innerHTML = window.groupInfo.price * e, this.elems.participantsAmountUsd.innerHTML = Math.round(window.groupInfo.price * e / window.rateUsdRub), 
this.elems.participantsCountInput.parentNode.classList.remove("text-input_invalid"), 
!this.elems.participantsIsSelf.checked || e > 1 ? this.elems.participantsAddBox.classList.add("course-add-participants_visible") : this.elems.participantsAddBox.classList.remove("course-add-participants_visible"); this.elems.participantsAddList.children.length > e; ) this.elems.participantsAddList.lastElementChild.remove();
for (;this.elems.participantsAddList.children.length < e; ) {
var r = c(s);
this.elems.participantsAddList.insertAdjacentHTML("beforeEnd", r);
}
var i = this.elems.participantsAddList.firstElementChild.querySelector("input");
this.elems.participantsIsSelf.checked ? (i.disabled = !0, i.value = window.currentUser.email) : (i.disabled = !1, 
i.value = "");
}
}, {
key: "onSubmit",
value: function(e) {
e.preventDefault();
try {
if (this.elems.participantsCountInput.parentNode.classList.contains("text-input_invalid")) throw new i();
var t = +this.elems.participantsCountInput.value, n = [];
this.elems.participantsListEnabled.checked ? [].forEach.call(this.elems.participantsAddList.querySelectorAll("input"), function(e) {
if (e.value) {
if (e.parentNode.classList.contains("text-input_invalid")) throw new i();
n.push(e.value);
}
}) : this.elems.participantsIsSelf.checked && n.push(window.currentUser.email), 
this.elem.dispatchEvent(new CustomEvent("select", {
detail: {
count: t,
emails: n
}
}));
} catch (r) {
if (!(r instanceof i)) throw r;
new u.Error("Исправьте, пожалуйста, ошибки.");
}
}
} ]), e;
}();
i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, o.delegateMixin(l.prototype), 
e.exports = l;
},
74: function(e, t, n) {
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
}(), a = (n(27), function() {
function e(t) {
var n = this;
r(this, e), this.elem = t.elem, this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(e) {
n.elems[e.getAttribute("data-elem")] = e;
}), this.elem.onsubmit = this.onSubmit.bind(this);
}
return i(e, [ {
key: "focus",
value: function() {
this.elems.contactName.focus();
}
}, {
key: "onSubmit",
value: function(e) {
e.preventDefault(), this.elem.dispatchEvent(new CustomEvent("contact-submit", {
detail: {
name: this.elems.contactName.value,
phone: this.elems.contactPhone.value
}
}));
}
} ]), e;
}());
e.exports = a;
},
77: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
78: function(e, t, n) {
"use strict";
var r = n(108);
e.exports = function(e) {
function t(e, t, n, i, a) {
var o = a || "div";
switch (o) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
e.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
e.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && e.push("</" + o + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, r, i, a) {
var o = this.block, s = this.attributes || {};
if (!s.class && i && !a) throw Error("Block without class: " + i);
if (s.class) {
var u = s.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var c;
try {
c = u[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
a ? u[0] = r[r.length - 1] + e.element + u[0] : r[r.length] = c;
var f = (a ? r[r.length - 1] + e.element : "") + c;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var p = 0; p < u.length; p++) {
var h = u[p];
h.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? u[p] = f + h : h.match(RegExp("^" + e.element)) && (r[r.length - 2] ? u[p] = r[r.length - 2] + h : u[p] = r[r.length - 1] + h), 
u[p].match(RegExp("^" + f + "($|(?=" + e.element + "|" + e.modifier + "))")) && (u[p] = e.prefix + u[p]);
}
s.class = u.sort().join(" ");
}
t(n, o, s, r, i), a || r.pop();
};
};
},
85: function(e, t, n) {
"use strict";
t.FormPayment = n(118);
},
108: function(e, t, n) {
"use strict";
function r(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(r).join(" ");
}
function a(e) {
return s[e] || e;
}
function o(e) {
var t = (e + "").replace(u, a);
return t === "" + e ? e : t;
}
t.merge = function c(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = c(n, e[i]);
return n;
}
var a = e.class, o = t.class;
(a || o) && (a = a || [], o = o || [], Array.isArray(a) || (a = [ a ]), Array.isArray(o) || (o = [ o ]), 
e.class = a.concat(o).filter(r));
for (var s in t) "class" != s && (e[s] = t[s]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var r = [], a = 0; a < e.length; a++) n && n[a] ? r.push(t.escape(i([ e[a] ]))) : r.push(i(e[a]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
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
var r = [], a = Object.keys(e);
if (a.length) for (var o = 0; o < a.length; ++o) {
var s = a[o], u = e[s];
"class" == s ? (u = i(u)) && r.push(" " + s + '="' + u + '"') : r.push(t.attr(s, u, !1, n));
}
return r.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
t.escape = o, t.rethrow = function l(e, t, r, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + r, 
e;
try {
i = i || n(116).readFileSync(t, "utf8");
} catch (a) {
l(e, null, r);
}
var o = 3, s = i.split("\n"), u = Math.max(r - o, 0), c = Math.min(s.length, r + o), o = s.slice(u, c).map(function(e, t) {
var n = t + u + 1;
return (n == r ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + o + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
},
110: function(e, t, n) {
var r = n(108);
e.exports = function(e) {
var t, n = [], i = {}, a = e || {};
return function(e) {
n.push("");
var a = [];
i.b = t = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, a, t, r, i);
}, i.e = t = function(e) {
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
i.e.call({
block: function() {
n.push("Участник");
},
attributes: {
"class": "participant-n"
}
}, "span"), i.b.call({
block: function() {
i.e.call({
attributes: {
placeholder: "email",
name: "email",
type: "email",
"class": "control"
}
}, "input"), i.e.call({
block: function() {
n.push("введите корректный email");
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
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0), n.join("");
};
},
116: function() {},
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
//# sourceMappingURL=coursesSignup.16093aeedcd002e70268.js.map
var courses = webpackJsonp_name_([ 14 ], {
0: function(e, t, n) {
"use strict";
var i = n(281);
t.init = function() {
var e = document.querySelector('[data-elem="signup"]');
e && new i({
elem: e
});
};
},
91: function() {},
212: function(e, t, n) {
var i = n(304);
e.exports = function(e) {
var t = [], n = {}, r = e || {};
return function(e) {
t.push("");
var r = [];
n.b = function(n, i, o) {
this && this.block, this && this.attributes || {};
e.call(this, t, r, n, i, o);
}, n.e = function(e) {
var t = this && this.block, r = this && this.attributes || {};
n.b.call({
block: function() {
t && t();
},
attributes: i.merge([ r ])
}, e, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
t.push("Участник");
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
t.push("введите корректный email");
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
}.call(this, "bem" in r ? r.bem : "undefined" != typeof bem ? bem : void 0), t.join("");
};
},
256: function(e, t, n) {
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
var r = n(251), o = n(291);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = i;
},
275: function(e, t, n) {
"use strict";
function i(e) {
e.bem = r, e.thumb = o;
}
var r = n(293)(), o = n(292).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, i(t), e(t);
};
},
279: function(e) {
"use strict";
function t(e) {
return e % 10 == 1 && e % 100 != 11 ? "one" : e % 10 >= 2 && 4 >= e % 10 && (12 > e % 100 || e % 100 > 14) && e == Math.floor(e) ? "few" : e % 10 === 0 || e % 10 >= 5 && 9 >= e % 10 || e % 100 >= 11 && 14 >= e % 100 && e == Math.floor(e) ? "many" : "other";
}
function n(e, n, i, r) {
var o = t(e);
switch (o) {
case "one":
return n;

case "few":
return i;

case "many":
return r;

default:
throw Error("Unsupported count: " + e);
}
}
e.exports = n;
},
281: function(e, t, n) {
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
}(), o = n(256), a = (n(251), n(255)), s = n(297).FormPayment, l = n(278), c = (n(237), 
n(287)), u = n(288), p = n(279), d = function() {
function e(t) {
var n = this;
if (i(this, e), this.elem = t.elem, this.product = "course", this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(e) {
n.elems[e.getAttribute("data-elem")] = e;
}), this.elems.participants) {
var r = new c({
elem: this.elems.participants
});
r.elem.addEventListener("select", this.onParticipantsFormSelect.bind(this)), this.elems.receiptParticipantsEditLink.onclick = function(e) {
e.preventDefault(), n.goStep1();
};
}
if (this.elems.contact) {
var o = this.contactForm = new u({
elem: this.elems.contact
});
o.elem.addEventListener("select", this.onContactFormSelect.bind(this)), this.elems.receiptContactEditLink.onclick = function(e) {
e.preventDefault(), n.goStep2();
};
}
this.elems.payment.onsubmit = this.onPaymentSubmit.bind(this);
}
return r(e, [ {
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
this.elem.classList.add("courses-register_step_2"), this.elems.receiptTitle.innerHTML = "Участие в курсе для " + this.participantsInfo.count + "\n      " + p(this.participantsInfo.count, "человека", "человек", "человек"), 
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
var t = o(e);
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
var t = new l({
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
a.delegateMixin(d.prototype), e.exports = d;
},
287: function(e, t, n) {
"use strict";
function i(e) {
this.name = "InvalidError", this.message = e;
}
var r = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, o = function() {
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
}(), a = n(255), s = n(212), l = n(251), c = n(275), u = function() {
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
return o(e, [ {
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
var i = c(s);
this.elems.participantsAddList.insertAdjacentHTML("beforeEnd", i);
}
var r = this.elems.participantsAddList.firstElementChild.querySelector("input");
this.elems.participantsIsSelf.checked ? (r.disabled = !0, r.value = window.currentUser.email) : (r.disabled = !1, 
r.value = "");
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
new l.Error("Исправьте, пожалуйста, ошибки.");
}
}
} ]), e;
}();
i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, a.delegateMixin(u.prototype), 
e.exports = u;
},
288: function(e, t, n) {
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
}(), o = (n(255), function() {
function e(t) {
var n = this;
i(this, e), this.elem = t.elem, this.elems = {}, [].forEach.call(this.elem.querySelectorAll("[data-elem]"), function(e) {
n.elems[e.getAttribute("data-elem")] = e;
}), this.elem.onsubmit = this.onSubmit.bind(this);
}
return r(e, [ {
key: "focus",
value: function() {
this.elems.contactName.focus();
}
}, {
key: "onSubmit",
value: function(e) {
e.preventDefault(), this.elem.dispatchEvent(new CustomEvent("select", {
detail: {
name: this.elems.contactName.value,
phone: this.elems.contactPhone.value
}
}));
}
} ]), e;
}());
e.exports = o;
},
291: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
292: function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var i = window.devicePixelRatio;
t *= i, n *= i;
var r = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + r + e.slice(e.lastIndexOf("."));
};
},
293: function(e, t, n) {
"use strict";
var i = n(304);
e.exports = function(e) {
function t(e, t, n, r, o) {
var a = o || "div";
switch (a) {
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
e.push("<" + a + i.attrs(i.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && e.push("</" + a + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, i, r, o) {
var a = this.block, s = this.attributes || {};
if (!s.class && r && !o) throw Error("Block without class: " + r);
if (s.class) {
var l = s.class;
l instanceof Array && (l = l.join(" ")), l = l.split(" ");
var c;
try {
c = l[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + l[0]);
}
o ? l[0] = i[i.length - 1] + e.element + l[0] : i[i.length] = c;
var p = (o ? i[i.length - 1] + e.element : "") + c;
-1 === l.indexOf(p) && (l[l.length] = p);
for (var d = 0; d < l.length; d++) {
var f = l[d];
f.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? l[d] = p + f : f.match(RegExp("^" + e.element)) && (i[i.length - 2] ? l[d] = i[i.length - 2] + f : l[d] = i[i.length - 1] + f), 
l[d].match(RegExp("^" + p + "($|(?=" + e.element + "|" + e.modifier + "))")) && (l[d] = e.prefix + l[d]);
}
s.class = l.sort().join(" ");
}
t(n, a, s, i, r), o || i.pop();
};
};
},
297: function(e, t, n) {
"use strict";
t.FormPayment = n(306);
},
304: function(e, t, n) {
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
306: function(e, t, n) {
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
}(), o = n(251), a = n(256), s = n(278), l = (n(237), function() {
function e(t, n) {
i(this, e), this.orderForm = t, this.paymentMethodElem = n;
}
return r(e, [ {
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
var n = this.readPaymentData();
if (!n.paymentMethod) return void new o.Error("Выберите метод оплаты.");
if ("invoice" == n.paymentMethod && !n.invoiceCompanyName) return new o.Error("Укажите название компании."), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (var i in n) t[i] = n[i];
var r = a({
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
r.addEventListener("success", function(n) {
if (403 == r.status) return new o.Error("<p>" + (n.result.description || n.result.message) + "</p><p>Пожалуйста, начните оформление заново.</p><p>Если вы считаете, что на сервере ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
if (400 == r.status) return new o.Error("<p>" + n.result.message + "</p><p>Если вы считаете, что произошла ошибка &mdash; свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.</p>"), 
void s();
var i = n.result;
if (i.form) {
window.ga("ec:setAction", "purchase", {
id: i.orderNumber
});
var a = document.createElement("div");
a.hidden = !0, a.innerHTML = i.form, document.body.appendChild(a);
var l = function c() {
c.called || (c.called = !0, a.firstChild.submit());
};
window.ga("send", "event", "payment", "purchase", "ebook", {
hitCallback: l
}), setTimeout(l, 500), window.metrika.reachGoal("PURCHASE", {
product: e.orderForm.product,
method: t.paymentMethod,
price: t.amount,
number: i.orderNumber
});
} else s(), new o.Error("Ошибка на сервере, свяжитесь со <a href='mailto:orders@javascript.ru'>службой поддержки</a>.");
}), r.addEventListener("fail", s);
}
}
} ]), e;
}());
e.exports = l;
}
});
//# sourceMappingURL=courses.e1a7d2c005377696f0c7.js.map
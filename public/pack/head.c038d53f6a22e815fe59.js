var head = function(t) {
function e(n) {
if (r[n]) return r[n].exports;
var i = r[n] = {
exports: {},
id: n,
loaded: !1
};
return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
}
var n = window.webpackJsonp_name_;
window.webpackJsonp_name_ = function(a, o) {
for (var s, u, c = 0, l = []; c < a.length; c++) u = a[c], i[u] && l.push.apply(l, i[u]), 
i[u] = 0;
for (s in o) t[s] = o[s];
for (n && n(a, o); l.length; ) l.shift().call(null, e);
return o[0] ? (r[0] = 0, e(0)) : void 0;
};
var r = {}, i = {
14: 0
};
return e.e = function(t, n) {
if (0 === i[t]) return n.call(null, e);
if (void 0 !== i[t]) i[t].push(n); else {
i[t] = [ n ];
var r = document.getElementsByTagName("head")[0], a = document.createElement("script");
a.type = "text/javascript", a.charset = "utf-8", a.async = !0, a.src = e.p + "" + ({
"0": "search",
"1": "coursesCourse",
"2": "authClient",
"3": "footer",
"4": "angular",
"5": "tutorial",
"6": "ebookExtras",
"7": "coursesSignup",
"8": "ebook",
"9": "nodejsScreencast",
"10": "profile",
"11": "coursesParticipantDetails",
"12": "about",
"13": "quiz",
"16": "coursesMaterials",
"17": "auth",
"18": "coursesFrontpage",
"19": "coursesFeedbackEdit",
"20": "coursesFeedbackList",
"21": "coursesFeedbackShow",
"22": "profileGuestAboutMe"
}[t] || t) + "-" + t + ".c038d53f6a22e815fe59.js", r.appendChild(a);
}
}, e.m = t, e.c = r, e.p = "/pack/", e(0);
}({
0: function(t, e, n) {
"use strict";
n(133), n(22);
try {
window.localStorage.testProperty = 1, delete window.localStorage.testProperty;
} catch (r) {
try {
window.localStorage = {};
} catch (r) {}
}
n(7), e.login = n(8), n(9), e.Modal = n(10), e.fontTest = n(11), e.resizeOnload = n(18), 
n(12), n(13), n(14), n(15), n(16), n(17), n(23).init();
},
7: function() {
"use strict";
document.addEventListener("click", function(t) {
for (var e = t.target; e; ) {
if (!e.className.match) return;
if (e.className.match(/_unready\b/)) return void t.preventDefault();
e = e.parentElement;
}
}), document.addEventListener("submit", function(t) {
t.target.className.match && t.target.className.match(/_unready\b/) && t.preventDefault();
});
},
8: function(t, e, n) {
"use strict";
function r() {
var t = new i({
hasClose: !1,
mixClass: "login-modal"
}), e = new a();
t.setContent(e.elem), e.start(), n.e(2, function() {
t.remove();
var e = n(84);
new e();
});
}
var i = n(10), a = n(53);
document.addEventListener("click", function(t) {
t.target.hasAttribute("data-action-login") && (t.preventDefault(), r());
}), t.exports = r;
},
9: function(t) {
"use strict";
function e() {
var t = document.createElement("form");
t.method = "POST", t.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1], 
document.body.appendChild(t), t.submit();
}
document.addEventListener("click", function(t) {
t.target.hasAttribute("data-action-user-logout") && (t.preventDefault(), e());
}), t.exports = e;
},
10: function(t) {
"use strict";
function e(t) {
t = t || {}, this.render(), this.setHasClose(void 0 === t.hasClose ? !0 : t.hasClose), 
this.onClick = this.onClick.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), 
this.elem.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onDocumentKeyDown);
}
e.prototype.setHasClose = function(t) {
this._hasClose = t, this._hasClose ? this.elem.classList.add("modal__has-close") : this.elem.classList.remove("modal__has-close");
}, e.prototype.render = function() {
document.body.insertAdjacentHTML("beforeEnd", '<div class="modal"><div class="modal__dialog"><button class="close-button modal__close" title="закрыть"></button><div class="modal__content"></div></div></div>'), 
document.body.classList.add("paranja-open"), this.elem = document.body.lastChild, 
this.contentElem = this.elem.querySelector(".modal__content");
}, e.prototype.onClick = function(t) {
t.target.classList.contains("modal__close") && (this.remove(), t.preventDefault());
}, e.prototype.onDocumentKeyDown = function(t) {
27 == t.keyCode && (t.preventDefault(), this.remove());
}, e.prototype.showOverlay = function() {
this.contentElem.classList.add("modal-overlay_light");
}, e.prototype.hideOverlay = function() {
this.contentElem.classList.remove("modal-overlay_light");
}, e.prototype.setContent = function(t) {
"string" == typeof t ? this.contentElem.innerHTML = t : (this.contentElem.innerHTML = "", 
this.contentElem.appendChild(t));
var e = this.contentElem.querySelector("[data-modal-autofocus],[autofocus]");
e && e.focus();
}, e.prototype.remove = function() {
document.body.classList.remove("paranja-open"), document.body.removeChild(this.elem), 
document.removeEventListener("keydown", this.onDocumentKeyDown), this.elem.dispatchEvent(new CustomEvent("modal-remove"));
}, t.exports = e;
},
11: function(t) {
"use strict";
t.exports = function() {
function t() {
n != e.offsetWidth ? document.body.classList.remove("no-icons") : setTimeout(t, 100);
}
var e = document.createElement("span");
document.body.appendChild(e), e.className = "font-test", e.style.fontFamily = "serif";
var n = e.offsetWidth;
e.style.fontFamily = "", t();
};
},
12: function() {
"use strict";
function t() {}
function e() {
t("compactifySidebar");
var e = document.querySelector(".sidebar"), n = e.querySelector(".sidebar__content"), r = e.querySelector(".sidebar__inner"), i = e.classList.contains("sidebar_sticky-footer"), a = e.classList.contains("sidebar_compact");
if (a) {
var o;
o = i ? n.lastElementChild.getBoundingClientRect().top - n.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : n.getBoundingClientRect().bottom - n.lastElementChild.getBoundingClientRect().bottom, 
t("decompact?", o), o > 150 && e.classList.remove("sidebar_compact");
} else t(r.scrollHeight, r.clientHeight), r.scrollHeight > r.clientHeight && (t("compact!"), 
e.classList.add("sidebar_compact"));
}
function n() {
var n = document.querySelector(".sitetoolbar");
if (!n) return void t("no sitetoolbar");
var i = document.querySelector(".sidebar");
i && (i.style.top = Math.max(n.getBoundingClientRect().bottom, 0) + "px", e()), 
r();
}
function r() {
var t = document.documentElement.clientWidth <= a, e = document.querySelector('meta[name="viewport"]').content;
e = e.replace(/user-scalable=\w+/, "user-scalable=" + (t ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = e;
}
var i, a = 840;
!function() {
function e() {
t("onWindowScrollAndResizeThrottled", i), i || (i = window.requestAnimationFrame(function() {
n(), i = null;
}));
}
window.addEventListener("scroll", e), window.addEventListener("resize", e), document.addEventListener("DOMContentLoaded", e);
}();
},
13: function() {
"use strict";
function t(t) {
if (t.target.closest) {
var i = t.target.closest(a + "__search-toggle");
i && (r || e(), n());
}
}
function e() {
var t, e = document.querySelector(a), i = e.querySelector(a + "__search-input input"), o = e.querySelector(a + "__find");
o.onmousedown = function() {
t = !0;
}, i.onkeydown = function(t) {
27 == t.keyCode && (this.value = "", n());
}, i.onblur = function() {
!t && n();
}, r = !0;
}
function n() {
var t, e = document.querySelector(a);
e.classList.toggle(i + "_search_open");
var n = e.querySelector(a + "__search-input input");
e.classList.contains(i + "_search_open") ? (n.focus(), t = document.createElement("div"), 
t.className = "search-paranja", t.style.top = e.offsetHeight + "px", document.body.appendChild(t), 
document.body.classList.add("paranja-open")) : (t = document.querySelector(".search-paranja"), 
t.parentNode.removeChild(t), document.body.classList.remove("paranja-open"));
}
document.addEventListener("click", t);
var r = !1, i = "ru" === document.documentElement.lang ? "sitetoolbar" : "sitetoolbar-light", a = "." + i;
},
14: function() {
"use strict";
function t() {
var t = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), t && t.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
function e(e) {
e.target.hasAttribute("data-sidebar-toggle") && t();
}
function n(e) {
if (!(document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) || e.keyCode != "S".charCodeAt(0))) {
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!e.metaKey || !e.altKey) return;
} else if (!e.altKey) return;
t(), e.preventDefault();
}
}
document.addEventListener("click", e), document.addEventListener("keydown", n);
},
15: function(t, e, n) {
"use strict";
function r(t) {
if ((!document.activeElement || !~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) && t[o + "Key"]) {
var e = null;
switch (t.keyCode) {
case 37:
e = "prev";
break;

case 39:
e = "next";
break;

default:
return;
}
var n = document.querySelector('link[rel="' + e + '"]');
n && (document.location = n.href, t.preventDefault());
}
}
function i() {
var t, e = o[0].toUpperCase() + o.slice(1), n = document.querySelector('link[rel="next"]');
n && (t = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = e + ' + <span class="page__nav-text-arr">→</span>');
var r = document.querySelector('link[rel="prev"]');
r && (t = document.querySelector('a[href="' + r.getAttribute("href") + '"] .page__nav-text-shortcut'), 
t.innerHTML = e + ' + <span class="page__nav-text-arr">←</span>');
}
var a = n(69), o = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
a(document, {
onRight: function() {
var t = document.querySelector('link[rel="prev"]');
t && (document.location = t.href);
},
onLeft: function() {
var t = document.querySelector('link[rel="next"]');
t && (document.location = t.href);
}
}), document.addEventListener("keydown", r), document.addEventListener("DOMContentLoaded", i);
},
16: function() {
"use strict";
var t;
document.addEventListener("mouseover", function(e) {
var n = e.target.closest("[data-add-class-on-hover]") || e.target.closest(".button");
n && (t = n, n.classList.add("hover"));
}), document.addEventListener("touchend", function() {
setTimeout(function() {
t && (t.classList.remove("hover"), t = null);
}, 500);
}), document.addEventListener("mouseout", function(e) {
t && (t.contains(e.relatedTarget) || (t.classList.remove("hover"), t = null));
}), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) || document.documentElement.classList.add("working-hover");
},
17: function() {
"use strict";
var t = window.location.host;
document.addEventListener("click", function(e) {
function n() {
document.location = i;
}
if (1 == e.which && !e.defaultPrevented) {
var r = e.target.closest && e.target.closest("a");
if (r && (t != r.host || r.hasAttribute("data-track-outbound")) && ~[ "_self", "_top", "_parent" ].indexOf(r.target) && !(e.shiftKey || e.ctrlKey || e.altKey)) {
e.preventDefault();
var i = r.href;
window.ga("send", "event", "outbound", "click", i, {
hitCallback: n
}), setTimeout(n, 500);
}
}
});
},
18: function(t, e, n) {
"use strict";
var r = n(70), i = n(76), a = [];
e.iframe = function(t) {
function e() {
r.async(t, function(e, n) {
n && (t.style.height = n + "px");
});
}
e();
}, e.codeTabs = function(t) {
function e() {
var e = t.closest(".code-tabs"), n = (t.closest("[data-code-tabs-content]"), e.querySelector("[data-code-tabs-switches]")), r = n.firstElementChild;
r.offsetWidth > n.offsetWidth ? e.classList.add("code-tabs_scroll") : e.classList.remove("code-tabs_scroll");
}
e(), a.push(e);
}, window.addEventListener("resize", i(function() {
a.forEach(function(t) {
t();
});
}, 200));
},
22: function(t, e, n) {
"use strict";
n(75);
},
23: function(t, e, n) {
"use strict";
function r(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
t.prototype = Object.create(e && e.prototype, {
constructor: {
value: t,
enumerable: !1,
writable: !0,
configurable: !0
}
}), e && (t.__proto__ = e);
}
function i(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
Object.defineProperty(e, "__esModule", {
value: !0
});
var a, o = function(t, e, n) {
for (var r = !0; r; ) {
var i = t, a = e, o = n;
s = c = u = void 0, r = !1, null === i && (i = Function.prototype);
var s = Object.getOwnPropertyDescriptor(i, a);
if (void 0 !== s) {
if ("value" in s) return s.value;
var u = s.get;
return void 0 === u ? void 0 : u.call(o);
}
var c = Object.getPrototypeOf(i);
if (null === c) return void 0;
t = c, e = a, n = o, r = !0;
}
}, s = function() {
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
}(), u = n(27), c = function() {
function t() {
var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
i(this, t), this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
return s(t, [ {
key: "register",
value: function(t) {
var e = this;
this.notifications.unshift(t), setTimeout(function() {
return e.recalculate();
}, 20);
}
}, {
key: "unregister",
value: function(t) {
var e = this.notifications.indexOf(t);
this.notifications.splice(e, 1), this.recalculate();
}
}, {
key: "recalculate",
value: function() {
var t = this, e = this.verticalSpace;
this.notifications.forEach(function(n) {
n.top = e, e += n.height + t.verticalSpace;
});
}
} ]), t;
}();
e.init = function(t) {
a = new c(t);
};
var l = function() {
function t(e, n, r) {
i(this, t);
var o = '<div class="notification notification_popup notification_' + n + '">\n    <div class="notification__content">' + e + '</div>\n    <button title="Закрыть" class="notification__close"></button></div>';
switch (document.body.insertAdjacentHTML("beforeEnd", o), this.elem = document.body.lastElementChild, 
r) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = r;
}
a.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return s(t, [ {
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), a.unregister(this));
}
}, {
key: "setupCloseHandler",
value: function() {
var t = this;
this.delegate(".notification__close", "click", function() {
return t.close();
});
}
}, {
key: "setupCloseTimeout",
value: function() {
var t = this;
this.timeout && setTimeout(function() {
return t.close();
}, this.timeout);
}
}, {
key: "TIMEOUT_DEFAULT",
get: function() {
return 2500;
}
}, {
key: "TIMEOUT_SLOW",
get: function() {
return 5e3;
}
}, {
key: "TIMEOUT_FAST",
get: function() {
return 1500;
}
}, {
key: "height",
get: function() {
return this.elem.offsetHeight;
}
}, {
key: "top",
set: function(t) {
this.elem.style.transform = "translateY(" + t + "px)";
}
} ]), t;
}();
u.delegateMixin(l.prototype);
var f = function(t) {
function e(t, n) {
i(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, "info", n);
}
return r(e, t), e;
}(l);
e.Info = f;
var h = function(t) {
function e(t, n) {
i(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, "warning", n);
}
return r(e, t), e;
}(l);
e.Warning = h;
var d = function(t) {
function e(t, n) {
i(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, "success", n);
}
return r(e, t), e;
}(l);
e.Success = d;
var p = function(t) {
function e(t, n) {
i(this, e), o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t, "error", n);
}
return r(e, t), s(e, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), e;
}(l);
e.Error = p, e.Error = p;
},
27: function(t) {
"use strict";
function e(t, e) {
for (var n = t.target; n; ) {
if (n.matches(e)) return n;
if (n == t.currentTarget) break;
n = n.parentElement;
}
return null;
}
function n(t, n, r, i, a) {
t.addEventListener(r, function(t) {
var r = e(t, n);
t.delegateTarget = r, r && i.call(a || this, t);
});
}
n.delegateMixin = function(t) {
t.delegate = function(t, e, r) {
n(this.elem, t, e, r, this);
};
}, t.exports = n;
},
53: function(t) {
"use strict";
function e(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
e.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, e.prototype.stop = function() {
var t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, t.exports = e;
},
69: function(t) {
"use strict";
function e(t, e) {
e = e || {};
var n, r, i, a, o, s = e.onRight || function() {}, u = e.onLeft || function() {}, c = e.tolerance || 50, l = e.threshold || 150, f = e.allowedTime || 500;
t.addEventListener("touchstart", function(t) {
var e = t.changedTouches[0];
i = 0, n = e.pageX, r = e.pageY, o = Date.now();
}), t.addEventListener("touchend", function(t) {
var e = t.changedTouches[0];
if (i = e.pageX - n, a = Date.now() - o, !(Math.abs(e.pageY - r) > c || a > f)) {
for (var h = !1, d = t.target; d != document.body; ) {
if (d.scrollWidth > d.clientWidth) {
h = !0;
break;
}
d = d.parentElement;
}
h || (i > l && s(t), -l > i && u(t));
}
});
}
t.exports = e;
},
70: function(t, e, n) {
"use strict";
function r(t, e) {
function n(t, n) {
clearTimeout(r), e(t, n);
}
var r = setTimeout(function() {
e(Error("timeout"));
}, 500);
try {
(t.contentDocument || t.contentWindow.document).body;
} catch (o) {
i(t, n);
}
if (!t.offsetWidth) {
var s = t.cloneNode(!0);
return s.name = "", s.style.height = "50px", s.style.position = "absolute", s.style.display = "block", 
s.style.top = "10000px", s.onload = function() {
var e = a(this.contentDocument);
t.style.display = "block", s.remove(), n(null, e);
}, void document.body.appendChild(s);
}
t.style.display = "block", t.style.height = "1px";
var u = a(t.contentDocument);
t.style.height = "", n(null, u);
}
function i() {
throw Error("Not implemented yet");
}
var a = n(107);
r.async = function(t, e) {
setTimeout(function() {
r(t, e);
}, 0);
}, t.exports = r;
},
75: function(t, e, n) {
"use strict";
function r(t) {
if (t.length) {
if (1 === t.length) return "string" == typeof t[0] ? document.createTextNode(t[0]) : t[0];
for (var e, n = document.createDocumentFragment(), r = t.length, i = -1; ++i < r; ) e = t[i], 
n.appendChild("string" == typeof e ? document.createTextNode(e) : e);
return n;
}
throw Error("DOM Exception 8");
}
var i = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
replace: function() {
this.parentNode && this.parentNode.replaceChild(r(arguments), this);
},
prepend: function() {
this.insertBefore(r(arguments), this.firstChild);
},
append: function() {
this.appendChild(r(arguments));
},
remove: function() {
var t = this.parentNode;
return t ? t.removeChild(this) : void 0;
},
before: function() {
this.parentNode && this.parentNode.insertBefore(r(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(r(arguments), this.nextSibling);
},
closest: function(t) {
for (var e = this; e; ) {
if (e.matches && e.matches(t)) return e;
e = e.parentElement;
}
return null;
}
};
for (var a in i) Element.prototype[a] || (Element.prototype[a] = i[a]);
n(103), n(104), n(105), n(106);
},
76: function(t) {
"use strict";
function e(t, e) {
function n() {
return a ? (r = arguments, void (i = this)) : (t.apply(this, arguments), a = !0, 
void setTimeout(function() {
a = !1, r && (n.apply(i, r), r = i = null);
}, e));
}
var r, i, a = !1;
return n;
}
t.exports = e;
},
103: function() {
"use strict";
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (t) {
window.CustomEvent = function(t, e) {
var n;
return e = e || {
bubbles: !1,
cancelable: !1,
detail: void 0
}, n = document.createEvent("CustomEvent"), n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), 
n;
}, CustomEvent.prototype = Object.create(window.Event.prototype);
}
},
104: function() {
"use strict";
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
var t = {
enumerable: !0,
get: function() {
var t, e, n, r, i, a, o = this, s = this.attributes, u = s.length, c = function(t) {
return t.charAt(1).toUpperCase();
}, l = function() {
return this;
}, f = function(t, e) {
return void 0 !== e ? this.setAttribute(t, e) : this.removeAttribute(t);
};
try {
({}).__defineGetter__("test", function() {}), e = {};
} catch (h) {
e = document.createElement("div");
}
for (t = 0; u > t; t++) if (a = s[t], a && a.name && /^data-\w[\w\-]*$/.test(a.name)) {
n = a.value, r = a.name, i = r.substr(5).replace(/-./g, c);
try {
Object.defineProperty(e, i, {
enumerable: this.enumerable,
get: l.bind(n || ""),
set: f.bind(o, r)
});
} catch (d) {
e[i] = n;
}
}
return e;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", t);
} catch (e) {
t.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", t);
}
}
},
105: function() {
"use strict";
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("beforeEnd", "<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(t) {
this.setAttribute("hidden", t);
},
get: function() {
return this.getAttribute("hidden");
}
}));
},
106: function() {
"use strict";
!function() {
var t = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
var n = new Date().getTime(), r = Math.max(0, 16 - (n - t)), i = window.setTimeout(function() {
e(n + r);
}, r);
return t = n + r, i;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
clearTimeout(t);
});
}();
},
107: function(t, e, n) {
"use strict";
function r(t) {
t = t || document;
var e = Math.max(t.body.scrollHeight, t.documentElement.scrollHeight, t.body.offsetHeight, t.documentElement.offsetHeight, t.body.clientHeight, t.documentElement.clientHeight);
return t.documentElement.scrollWidth > t.documentElement.clientWidth && (i || (i = a()), 
e += i), e;
}
var i, a = n(121);
t.exports = r;
},
121: function(t) {
"use strict";
function e() {
var t = document.createElement("div");
if (t.style.cssText = "visibility:hidden;height:100px", !document.body) throw Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(t);
var e = t.offsetWidth;
t.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", t.appendChild(n);
var r = n.offsetWidth;
return t.parentNode.removeChild(t), e - r;
}
t.exports = e;
},
133: function() {}
});
//# sourceMappingURL=head.c038d53f6a22e815fe59.js.map
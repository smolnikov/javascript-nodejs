var head = function(e) {
function t(n) {
if (o[n]) return o[n].exports;
var i = o[n] = {
exports: {},
id: n,
loaded: !1
};
return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
}
var n = window.webpackJsonp_name_;
window.webpackJsonp_name_ = function(r, s) {
for (var a, c, u = 0, l = []; u < r.length; u++) c = r[u], i[c] && l.push.apply(l, i[c]), 
i[c] = 0;
for (a in s) e[a] = s[a];
for (n && n(r, s); l.length; ) l.shift().call(null, t);
return s[0] ? (o[0] = 0, t(0)) : void 0;
};
var o = {}, i = {
14: 0
};
return t.e = function(e, n) {
if (0 === i[e]) return n.call(null, t);
if (void 0 !== i[e]) i[e].push(n); else {
i[e] = [ n ];
var o = document.getElementsByTagName("head")[0], r = document.createElement("script");
r.type = "text/javascript", r.charset = "utf-8", r.async = !0, r.src = t.p + "" + ({
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
"22": "profileGuestAboutMe",
"23": "webpackScreencast",
"24": "donate"
}[e] || e) + "-" + e + ".465b690baef0b44a5ea6.js", o.appendChild(r);
}
}, t.m = e, t.c = o, t.p = "/pack/", t(0);
}({
0: function(e, t, n) {
"use strict";
n(186), n(187);
try {
window.localStorage.testProperty = 1, delete window.localStorage.testProperty;
} catch (o) {
try {
window.localStorage = {};
} catch (o) {}
}
n(193), t.login = n(194), n(195), t.Modal = n(153), t.fontTest = n(196), t.resizeOnload = n(197), 
n(202), n(203), n(204), n(205), n(207), n(208), n(147).init();
},
147: function(e, t, n) {
"use strict";
function o(e, t) {
if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
e.prototype = Object.create(t && t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
Object.defineProperty(t, "__esModule", {
value: !0
});
var r, s = function(e, t, n) {
for (var o = !0; o; ) {
var i = e, r = t, s = n;
o = !1, null === i && (i = Function.prototype);
var a = Object.getOwnPropertyDescriptor(i, r);
if (void 0 !== a) {
if ("value" in a) return a.value;
var c = a.get;
if (void 0 === c) return;
return c.call(s);
}
var u = Object.getPrototypeOf(i);
if (null === u) return;
e = u, t = r, n = s, o = !0, a = u = void 0;
}
}, a = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var o = t[n];
o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
Object.defineProperty(e, o.key, o);
}
}
return function(t, n, o) {
return n && e(t.prototype, n), o && e(t, o), t;
};
}(), c = n(148), u = function() {
function e() {
var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
i(this, e), this.notifications = [], this.verticalSpace = t.verticalSpace || 8;
}
return a(e, [ {
key: "register",
value: function(e) {
var t = this;
this.notifications.unshift(e), setTimeout(function() {
return t.recalculate();
}, 20);
}
}, {
key: "unregister",
value: function(e) {
var t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
}, {
key: "recalculate",
value: function() {
var e = this, t = this.verticalSpace;
this.notifications.forEach(function(n) {
n.top = t, t += n.height + e.verticalSpace;
});
}
} ]), e;
}();
t.init = function(e) {
r = new u(e);
};
var l = function() {
function e(t, n, o) {
i(this, e);
var s = '<div class="notification notification_popup notification_' + n + '">\n    <div class="notification__content">' + t + '</div>\n    <button title="Закрыть" class="notification__close"></button></div>';
switch (document.body.insertAdjacentHTML("beforeEnd", s), this.elem = document.body.lastElementChild, 
o) {
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
this.timeout = o;
}
r.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return a(e, [ {
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), r.unregister(this));
}
}, {
key: "setupCloseHandler",
value: function() {
var e = this;
this.delegate(".notification__close", "click", function() {
return e.close();
});
}
}, {
key: "setupCloseTimeout",
value: function() {
var e = this;
this.timeout && setTimeout(function() {
return e.close();
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
set: function(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
} ]), e;
}();
c.delegateMixin(l.prototype);
var d = function(e) {
function t(e, n) {
i(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "info", n);
}
return o(t, e), t;
}(l);
t.Info = d;
var m = function(e) {
function t(e, n) {
i(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "warning", n);
}
return o(t, e), t;
}(l);
t.Warning = m;
var f = function(e) {
function t(e, n) {
i(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "success", n);
}
return o(t, e), t;
}(l);
t.Success = f;
var h = function(e) {
function t(e, n) {
i(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "error", n);
}
return o(t, e), a(t, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), t;
}(l);
t.Error = h, t.Error = h;
},
148: function(e, t) {
"use strict";
function n(e, t) {
for (var n = e.target; n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}
function o(e, t, o, i, r) {
e.addEventListener(o, function(e) {
var o = n(e, t);
e.delegateTarget = o, o && i.call(r || this, e);
});
}
o.delegateMixin = function(e) {
e.delegate = function(e, t, n) {
o(this.elem, e, t, n, this);
};
}, e.exports = o;
},
150: function(e, t) {
"use strict";
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
var e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, e.exports = n;
},
153: function(e, t) {
"use strict";
function n(e) {
e = e || {}, this.render(), this.setHasClose(void 0 === e.hasClose ? !0 : e.hasClose), 
this.onClick = this.onClick.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), 
this.elem.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onDocumentKeyDown);
}
n.prototype.setHasClose = function(e) {
this._hasClose = e, this._hasClose ? this.elem.classList.add("modal__has-close") : this.elem.classList.remove("modal__has-close");
}, n.prototype.render = function() {
document.body.insertAdjacentHTML("beforeEnd", '<div class="modal"><div class="modal__dialog"><button class="close-button modal__close" title="закрыть"></button><div class="modal__content"></div></div></div>'), 
document.body.classList.add("paranja-open"), this.elem = document.body.lastChild, 
this.contentElem = this.elem.querySelector(".modal__content");
}, n.prototype.onClick = function(e) {
e.target.classList.contains("modal__close") && (this.remove(), e.preventDefault());
}, n.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, n.prototype.showOverlay = function() {
this.contentElem.classList.add("modal-overlay_light");
}, n.prototype.hideOverlay = function() {
this.contentElem.classList.remove("modal-overlay_light");
}, n.prototype.setContent = function(e) {
"string" == typeof e ? this.contentElem.innerHTML = e : (this.contentElem.innerHTML = "", 
this.contentElem.appendChild(e));
var t = this.contentElem.querySelector("[data-modal-autofocus],[autofocus]");
t && t.focus();
}, n.prototype.remove = function() {
document.body.classList.remove("paranja-open"), document.body.removeChild(this.elem), 
document.removeEventListener("keydown", this.onDocumentKeyDown), this.elem.dispatchEvent(new CustomEvent("modal-remove"));
}, e.exports = n;
},
186: function(e, t) {},
187: function(e, t, n) {
"use strict";
n(188);
},
188: function(e, t, n) {
"use strict";
function o(e) {
if (e.length) {
if (1 === e.length) return "string" == typeof e[0] ? document.createTextNode(e[0]) : e[0];
for (var t, n = document.createDocumentFragment(), o = e.length, i = -1; ++i < o; ) t = e[i], 
n.appendChild("string" == typeof t ? document.createTextNode(t) : t);
return n;
}
throw Error("DOM Exception 8");
}
var i = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
replace: function() {
this.parentNode && this.parentNode.replaceChild(o(arguments), this);
},
prepend: function() {
this.insertBefore(o(arguments), this.firstChild);
},
append: function() {
this.appendChild(o(arguments));
},
remove: function() {
var e = this.parentNode;
return e ? e.removeChild(this) : void 0;
},
before: function() {
this.parentNode && this.parentNode.insertBefore(o(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(o(arguments), this.nextSibling);
},
closest: function(e) {
for (var t = this; t; ) {
if (t.matches && t.matches(e)) return t;
t = t.parentElement;
}
return null;
}
};
for (var r in i) Element.prototype[r] || (Element.prototype[r] = i[r]);
n(189), n(190), n(191), n(192);
},
189: function(e, t) {
"use strict";
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (n) {
window.CustomEvent = function(e, t) {
var n;
return t = t || {
bubbles: !1,
cancelable: !1,
detail: void 0
}, n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), 
n;
}, CustomEvent.prototype = Object.create(window.Event.prototype);
}
},
190: function(e, t) {
"use strict";
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
var n = {
enumerable: !0,
get: function() {
var e, t, n, o, i, r, s = this, a = this.attributes, c = a.length, u = function(e) {
return e.charAt(1).toUpperCase();
}, l = function() {
return this;
}, d = function(e, t) {
return void 0 !== t ? this.setAttribute(e, t) : this.removeAttribute(e);
};
try {
({}).__defineGetter__("test", function() {}), t = {};
} catch (m) {
t = document.createElement("div");
}
for (e = 0; c > e; e++) if (r = a[e], r && r.name && /^data-\w[\w\-]*$/.test(r.name)) {
n = r.value, o = r.name, i = o.substr(5).replace(/-./g, u);
try {
Object.defineProperty(t, i, {
enumerable: this.enumerable,
get: l.bind(n || ""),
set: d.bind(s, o)
});
} catch (f) {
t[i] = n;
}
}
return t;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", n);
} catch (o) {
n.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", n);
}
}
},
191: function(e, t) {
"use strict";
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("beforeEnd", "<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(e) {
this.setAttribute("hidden", e);
},
get: function() {
return this.getAttribute("hidden");
}
}));
},
192: function(e, t) {
"use strict";
!function() {
var e = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
var o = new Date().getTime(), i = Math.max(0, 16 - (o - e)), r = window.setTimeout(function() {
t(o + i);
}, i);
return e = o + i, r;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
clearTimeout(e);
});
}();
},
193: function(e, t) {
"use strict";
document.addEventListener("click", function(e) {
for (var t = e.target; t; ) {
if (!t.className.match) return;
if (t.className.match(/_unready\b/)) return void e.preventDefault();
t = t.parentElement;
}
}), document.addEventListener("submit", function(e) {
e.target.className.match && e.target.className.match(/_unready\b/) && e.preventDefault();
});
},
194: function(e, t, n) {
"use strict";
function o() {
var e = new i({
hasClose: !1,
mixClass: "login-modal"
}), t = new r();
e.setContent(t.elem), t.start(), n.e(2, function() {
e.remove();
var t = n(152);
new t();
});
}
var i = n(153), r = n(150);
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-login") && (e.preventDefault(), o());
}), e.exports = o;
},
195: function(e, t) {
"use strict";
function n() {
var e = document.createElement("form");
e.method = "POST", e.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1], 
document.body.appendChild(e), e.submit();
}
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-user-logout") && (e.preventDefault(), n());
}), e.exports = n;
},
196: function(e, t) {
"use strict";
e.exports = function() {
function e() {
n != t.offsetWidth ? document.body.classList.remove("no-icons") : setTimeout(e, 100);
}
var t = document.createElement("span");
document.body.appendChild(t), t.className = "font-test", t.style.fontFamily = "serif";
var n = t.offsetWidth;
t.style.fontFamily = "", e();
};
},
197: function(e, t, n) {
"use strict";
var o = n(198), i = n(201), r = [];
t.iframe = function(e) {
function t() {
o.async(e, function(t, n) {
n && (e.style.height = n + "px");
});
}
t();
}, t.codeTabs = function(e) {
function t() {
var t = e.closest(".code-tabs"), n = (e.closest("[data-code-tabs-content]"), t.querySelector("[data-code-tabs-switches]")), o = n.firstElementChild;
o.offsetWidth > n.offsetWidth ? t.classList.add("code-tabs_scroll") : t.classList.remove("code-tabs_scroll");
}
t(), r.push(t);
}, window.addEventListener("resize", i(function() {
r.forEach(function(e) {
e();
});
}, 200));
},
198: function(e, t, n) {
"use strict";
function o(e, t) {
function n(e, n) {
clearTimeout(o), t(e, n);
}
var o = setTimeout(function() {
t(Error("timeout"));
}, 500);
try {
(e.contentDocument || e.contentWindow.document).body;
} catch (s) {
i(e, n);
}
if (!e.offsetWidth) {
var a = e.cloneNode(!0);
return a.name = "", a.style.height = "50px", a.style.position = "absolute", a.style.display = "block", 
a.style.top = "10000px", a.onload = function() {
var t = r(this.contentDocument);
e.style.display = "block", a.remove(), n(null, t);
}, void document.body.appendChild(a);
}
e.style.display = "block", e.style.height = "1px";
var c = r(e.contentDocument);
e.style.height = "", n(null, c);
}
function i(e, t) {
throw Error("Not implemented yet");
}
var r = n(199);
o.async = function(e, t) {
setTimeout(function() {
o(e, t);
}, 0);
}, e.exports = o;
},
199: function(e, t, n) {
"use strict";
function o(e) {
e = e || document;
var t = Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight);
return e.documentElement.scrollWidth > e.documentElement.clientWidth && (i || (i = r()), 
t += i), t;
}
var i, r = n(200);
e.exports = o;
},
200: function(e, t) {
"use strict";
function n() {
var e = document.createElement("div");
if (e.style.cssText = "visibility:hidden;height:100px", !document.body) throw Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(e);
var t = e.offsetWidth;
e.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", e.appendChild(n);
var o = n.offsetWidth;
return e.parentNode.removeChild(e), t - o;
}
e.exports = n;
},
201: function(e, t) {
"use strict";
function n(e, t) {
function n() {
return r ? (o = arguments, void (i = this)) : (e.apply(this, arguments), r = !0, 
void setTimeout(function() {
r = !1, o && (n.apply(i, o), o = i = null);
}, t));
}
var o, i, r = !1;
return n;
}
e.exports = n;
},
202: function(e, t) {
"use strict";
function n() {}
function o() {
n("compactifySidebar");
var e = document.querySelector(".sidebar"), t = e.querySelector(".sidebar__content"), o = e.querySelector(".sidebar__inner"), i = e.classList.contains("sidebar_sticky-footer"), r = e.classList.contains("sidebar_compact");
if (r) {
var s;
s = i ? t.lastElementChild.getBoundingClientRect().top - t.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : t.getBoundingClientRect().bottom - t.lastElementChild.getBoundingClientRect().bottom, 
n("decompact?", s), s > 150 && e.classList.remove("sidebar_compact");
} else n(o.scrollHeight, o.clientHeight), o.scrollHeight > o.clientHeight && (n("compact!"), 
e.classList.add("sidebar_compact"));
}
function i() {
var e = "ru" === document.documentElement.lang ? ".sitetoolbar" : ".sitetoolbar-light", t = document.querySelector(e);
if (!t) return void n("no sitetoolbar");
var i = document.querySelector(".sidebar");
i && (i.style.top = Math.max(t.getBoundingClientRect().bottom, 0) + "px", o()), 
r();
}
function r() {
var e = document.documentElement.clientWidth <= a, t = document.querySelector('meta[name="viewport"]').content;
t = t.replace(/user-scalable=\w+/, "user-scalable=" + (e ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = t;
}
var s, a = 840;
!function() {
function e() {
n("onWindowScrollAndResizeThrottled", s), s || (s = window.requestAnimationFrame(function() {
i(), s = null;
}));
}
window.addEventListener("scroll", e), window.addEventListener("resize", e), document.addEventListener("DOMContentLoaded", e);
}();
},
203: function(e, t) {
"use strict";
function n(e) {
if (e.target.closest) {
var t = e.target.closest(a + "__search-toggle");
t && (r || o(), i());
}
}
function o() {
var e, t = document.querySelector(a), n = t.querySelector(a + "__search-input input"), o = t.querySelector(a + "__find");
o.onmousedown = function(t) {
e = !0;
}, n.onkeydown = function(e) {
27 == e.keyCode && (this.value = "", i());
}, n.onblur = function(t) {
!e && i();
}, r = !0;
}
function i() {
var e, t = document.querySelector(a);
t.classList.toggle(s + "_search_open");
var n = t.querySelector(a + "__search-input input");
t.classList.contains(s + "_search_open") ? (n.focus(), e = document.createElement("div"), 
e.className = "search-paranja", e.style.top = t.offsetHeight + "px", document.body.appendChild(e), 
document.body.classList.add("paranja-open")) : (e = document.querySelector(".search-paranja"), 
e.parentNode.removeChild(e), document.body.classList.remove("paranja-open"));
}
document.addEventListener("click", n);
var r = !1, s = "ru" === document.documentElement.lang ? "sitetoolbar" : "sitetoolbar-light", a = "." + s;
},
204: function(e, t) {
"use strict";
function n() {
var e = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), e && e.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
function o(e) {
e.target.hasAttribute("data-sidebar-toggle") && n();
}
function i(e) {
if (!(document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) || e.keyCode != "S".charCodeAt(0))) {
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!e.metaKey || !e.altKey) return;
} else if (!e.altKey) return;
n(), e.preventDefault();
}
}
document.addEventListener("click", o), document.addEventListener("keydown", i);
},
205: function(e, t, n) {
"use strict";
function o(e) {
if ((!document.activeElement || !~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) && e[s + "Key"]) {
var t = null;
switch (e.keyCode) {
case 37:
t = "prev";
break;

case 39:
t = "next";
break;

default:
return;
}
var n = document.querySelector('link[rel="' + t + '"]');
n && (document.location = n.href, e.preventDefault());
}
}
function i() {
var e, t = s[0].toUpperCase() + s.slice(1), n = document.querySelector('link[rel="next"]');
n && (e = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">→</span>');
var o = document.querySelector('link[rel="prev"]');
o && (e = document.querySelector('a[href="' + o.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">←</span>');
}
var r = n(206), s = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
r(document, {
onRight: function() {
var e = document.querySelector('link[rel="prev"]');
e && (document.location = e.href);
},
onLeft: function() {
var e = document.querySelector('link[rel="next"]');
e && (document.location = e.href);
}
}), document.addEventListener("keydown", o), document.addEventListener("DOMContentLoaded", i);
},
206: function(e, t) {
"use strict";
function n(e, t) {
t = t || {};
var n, o, i, r, s, a = t.onRight || function() {}, c = t.onLeft || function() {}, u = t.tolerance || 50, l = t.threshold || 150, d = t.allowedTime || 500;
e.addEventListener("touchstart", function(e) {
var t = e.changedTouches[0];
i = 0, n = t.pageX, o = t.pageY, s = Date.now();
}), e.addEventListener("touchend", function(e) {
var t = e.changedTouches[0];
if (i = t.pageX - n, r = Date.now() - s, !(Math.abs(t.pageY - o) > u || r > d)) {
for (var m = !1, f = e.target; f != document.body; ) {
if (f.scrollWidth > f.clientWidth) {
m = !0;
break;
}
f = f.parentElement;
}
m || (i > l && a(e), -l > i && c(e));
}
});
}
e.exports = n;
},
207: function(e, t) {
"use strict";
var n;
document.addEventListener("mouseover", function(e) {
var t = e.target.closest("[data-add-class-on-hover]") || e.target.closest(".button");
t && (n = t, t.classList.add("hover"));
}), document.addEventListener("touchend", function(e) {
setTimeout(function() {
n && (n.classList.remove("hover"), n = null);
}, 500);
}), document.addEventListener("mouseout", function(e) {
n && (n.contains(e.relatedTarget) || (n.classList.remove("hover"), n = null));
}), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) || document.documentElement.classList.add("working-hover");
},
208: function(e, t) {
"use strict";
var n = window.location.host;
document.addEventListener("click", function(e) {
function t() {
document.location = i;
}
if (1 == e.which && !e.defaultPrevented) {
var o = e.target.closest && e.target.closest("a");
if (o && (n != o.host || o.hasAttribute("data-track-outbound")) && ~[ "_self", "_top", "_parent" ].indexOf(o.target) && !(e.shiftKey || e.ctrlKey || e.altKey)) {
e.preventDefault();
var i = o.href;
window.ga("send", "event", "outbound", "click", i, {
hitCallback: t
}), setTimeout(t, 500);
}
}
});
}
});
//# sourceMappingURL=head.465b690baef0b44a5ea6.js.map
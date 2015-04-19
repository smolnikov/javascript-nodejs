var head = function(e) {
function t(n) {
if (i[n]) return i[n].exports;
var r = i[n] = {
exports: {},
id: n,
loaded: !1
};
return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
}
var n = window.webpackJsonp_name_;
window.webpackJsonp_name_ = function(o, a) {
for (var s, l, c = 0, u = []; c < o.length; c++) l = o[c], r[l] && u.push.apply(u, r[l]), 
r[l] = 0;
for (s in a) e[s] = a[s];
for (n && n(o, a); u.length; ) u.shift().call(null, t);
return a[0] ? (i[0] = 0, t(0)) : void 0;
};
var i = {}, r = {
6: 0
};
return t.e = function(e, n) {
if (0 === r[e]) return n.call(null, t);
if (void 0 !== r[e]) r[e].push(n); else {
r[e] = [ n ];
var i = document.getElementsByTagName("head")[0], o = document.createElement("script");
o.type = "text/javascript", o.charset = "utf-8", o.async = !0, o.src = t.p + "" + ({
"0": "search",
"1": "ebook",
"2": "tutorial",
"3": "footer",
"4": "angular",
"5": "nodejsScreencast",
"7": "authClient",
"8": "profile",
"10": "quiz",
"12": "about",
"13": "ebookExtras"
}[e] || e) + "-" + e + ".e949916dcdef497773db.js", i.appendChild(o);
}
}, t.m = e, t.c = i, t.p = "/pack/", t(0);
}({
0: function(e, t, n) {
"use strict";
n(157), n(127), window.localStorage || (window.localStorage = {}), n(111), t.login = n(112), 
n(113), t.Modal = n(114), t.fontTest = n(115), t.resizeOnload = n(123), n(116), 
n(117), n(118), n(119), n(120), n(121), n(122), n(128).init();
},
111: function() {
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
112: function(e, t, n) {
"use strict";
function i() {
var e = new r({
hasClose: !1,
mixClass: "login-modal"
}), t = new o();
e.setContent(t.elem), t.start(), n.e(7, function() {
e.remove();
var t = n(148).AuthModal;
new t();
});
}
var r = n(114), o = n(144);
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-login") && (e.preventDefault(), i());
}), e.exports = i;
},
113: function(e) {
"use strict";
function t() {
var e = document.createElement("form");
e.method = "POST", e.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1], 
document.body.appendChild(e), e.submit();
}
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-user-logout") && (e.preventDefault(), t());
}), e.exports = t;
},
114: function(e) {
"use strict";
function t(e) {
e = e || {}, this.render(), this.setHasClose(void 0 === e.hasClose ? !0 : e.hasClose), 
this.onClick = this.onClick.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), 
this.elem.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onDocumentKeyDown);
}
t.prototype.setHasClose = function(e) {
this._hasClose = e, this._hasClose ? this.elem.classList.add("modal__has-close") : this.elem.classList.remove("modal__has-close");
}, t.prototype.render = function() {
document.body.insertAdjacentHTML("beforeEnd", '<div class="modal"><div class="modal__dialog"><button class="close-button modal__close" title="закрыть"></button><div class="modal__content"></div></div></div>'), 
document.body.classList.add("paranja-open"), this.elem = document.body.lastChild, 
this.contentElem = this.elem.querySelector(".modal__content");
}, t.prototype.onClick = function(e) {
e.target.classList.contains("modal__close") && this.remove();
}, t.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, t.prototype.showOverlay = function() {
this.contentElem.classList.add("modal-overlay_light");
}, t.prototype.hideOverlay = function() {
this.contentElem.classList.remove("modal-overlay_light");
}, t.prototype.setContent = function(e) {
"string" == typeof e ? this.contentElem.innerHTML = e : (this.contentElem.innerHTML = "", 
this.contentElem.appendChild(e));
var t = this.contentElem.querySelector("[data-modal-autofocus],[autofocus]");
t && t.focus();
}, t.prototype.remove = function() {
document.body.classList.remove("paranja-open"), document.body.removeChild(this.elem), 
document.removeEventListener("keydown", this.onDocumentKeyDown);
}, e.exports = t;
},
115: function(e) {
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
116: function() {
"use strict";
function e() {}
function t() {
e("compactifySidebar");
var t = document.querySelector(".sidebar"), n = t.querySelector(".sidebar__content"), i = t.querySelector(".sidebar__inner"), r = t.classList.contains("sidebar_sticky-footer"), o = t.classList.contains("sidebar_compact");
if (o) {
var a;
a = r ? n.lastElementChild.getBoundingClientRect().top - n.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : n.getBoundingClientRect().bottom - n.lastElementChild.getBoundingClientRect().bottom, 
e("decompact?", a), a > 150 && t.classList.remove("sidebar_compact");
} else e(i.scrollHeight, i.clientHeight), i.scrollHeight > i.clientHeight && (e("compact!"), 
t.classList.add("sidebar_compact"));
}
function n() {
var n = document.querySelector(".sitetoolbar");
if (!n) return void e("no sitetoolbar");
var r = (n.offsetHeight, document.querySelector(".sidebar"));
r && (r.style.top = Math.max(n.getBoundingClientRect().bottom, 0) + "px", t()), 
i();
}
function i() {
var e = document.documentElement.clientWidth <= o, t = document.querySelector('meta[name="viewport"]').content;
t = t.replace(/user-scalable=\w+/, "user-scalable=" + (e ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = t;
}
var r, o = 840;
!function() {
function t() {
e("onWindowScrollAndResizeThrottled", r), r || (r = window.requestAnimationFrame(function() {
n(), r = null;
}));
}
window.addEventListener("scroll", t), window.addEventListener("resize", t), document.addEventListener("DOMContentLoaded", t);
}();
},
117: function() {
"use strict";
function e(e) {
if (e.target.closest) {
var r = e.target.closest(".sitetoolbar__search-toggle");
r && (i || t(), n());
}
}
function t() {
var e, t = document.querySelector(".sitetoolbar"), r = t.querySelector(".sitetoolbar__search-input input"), o = t.querySelector(".sitetoolbar__find");
o.onmousedown = function() {
e = !0;
}, r.onkeydown = function(e) {
27 == e.keyCode && (this.value = "", n());
}, r.onblur = function() {
!e && n();
}, i = !0;
}
function n() {
var e, t = document.querySelector(".sitetoolbar");
t.classList.toggle("sitetoolbar_search_open");
var n = t.querySelector(".sitetoolbar__search-input input");
t.classList.contains("sitetoolbar_search_open") ? (n.focus(), e = document.createElement("div"), 
e.className = "sitetoolbar sitetoolbar__search-paranja", e.style.top = t.offsetHeight + "px", 
document.body.appendChild(e), document.body.classList.add("paranja-open")) : (e = document.querySelector(".sitetoolbar__search-paranja"), 
e.parentNode.removeChild(e), document.body.classList.remove("paranja-open"));
}
document.addEventListener("click", e);
var i = !1;
},
118: function() {
"use strict";
function e() {
var e = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), e && e.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
function t(t) {
t.target.hasAttribute("data-sidebar-toggle") && e();
}
function n(t) {
if (!~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) && t.keyCode == "S".charCodeAt(0)) {
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!t.metaKey || !t.altKey) return;
} else if (!t.altKey) return;
e(), t.preventDefault();
}
}
document.addEventListener("click", t), document.addEventListener("keydown", n);
},
119: function(e, t, n) {
"use strict";
function i(e) {
if (!~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) && e[a + "Key"]) {
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
function r() {
var e, t = a[0].toUpperCase() + a.slice(1), n = document.querySelector('link[rel="next"]');
n && (e = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">→</span>');
var i = document.querySelector('link[rel="prev"]');
i && (e = document.querySelector('a[href="' + i.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">←</span>');
}
var o = n(158), a = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
o(document, {
onRight: function() {
var e = document.querySelector('link[rel="prev"]');
e && (document.location = e.href);
},
onLeft: function() {
var e = document.querySelector('link[rel="next"]');
e && (document.location = e.href);
}
}), document.addEventListener("keydown", i), document.addEventListener("DOMContentLoaded", r);
},
120: function() {
"use strict";
var e;
document.addEventListener("mouseover", function(t) {
var n = t.target.closest("[data-add-class-on-hover]");
n && (e = n, n.classList.add("hover"));
}), document.addEventListener("touchend", function() {
setTimeout(function() {
e && (e.classList.remove("hover"), e = null);
}, 500);
}), document.addEventListener("mouseout", function(t) {
e && (e.contains(t.relatedTarget) || (e.classList.remove("hover"), e = null));
});
},
121: function(module, exports, __webpack_require__) {
"use strict";
window.runDemo = function(button) {
for (var demoElem, parent = button; (parent = parent.parentElement) && !(demoElem = parent.querySelector("[data-demo]")); ) ;
demoElem ? eval(demoElem.textContent) : alert("Ошибка, нет элемента с демо");
};
},
122: function() {
"use strict";
var e = window.location.host;
document.addEventListener("click", function(t) {
function n() {
document.location = r;
}
if (1 == t.which && !t.defaultPrevented) {
var i = t.target.closest && t.target.closest("a");
if (i && e != i.host && ~[ "_self", "_top", "_parent" ].indexOf(i.target) && !(t.shiftKey || t.ctrlKey || t.altKey)) {
t.preventDefault();
var r = i.href;
window.ga("send", "event", "outbound", "click", r, {
hitCallback: n
}), setTimeout(n, 500);
}
}
});
},
123: function(e, t, n) {
"use strict";
var i = n(159), r = n(162), o = [];
t.iframe = function(e) {
function t() {
i.async(e, function(t, n) {
n && (e.style.height = n + "px");
});
}
t();
}, t.codeTabs = function(e) {
function t() {
var t = e.closest(".code-tabs"), n = (e.closest("[data-code-tabs-content]"), t.querySelector("[data-code-tabs-switches]")), i = n.firstElementChild;
i.offsetWidth > n.offsetWidth ? t.classList.add("code-tabs_scroll") : t.classList.remove("code-tabs_scroll");
}
t(), o.push(t);
}, window.addEventListener("resize", r(function() {
o.forEach(function(e) {
e();
});
}, 200));
},
127: function(e, t, n) {
"use strict";
n(161);
},
128: function(e, t, n) {
"use strict";
var i = function m(e, t, n) {
var i = Object.getOwnPropertyDescriptor(e, t);
if (void 0 === i) {
var r = Object.getPrototypeOf(e);
return null === r ? void 0 : m(r, t, n);
}
if ("value" in i) return i.value;
var o = i.get;
return void 0 === o ? void 0 : o.call(n);
}, r = function(e, t) {
if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
e.prototype = Object.create(t && t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
}), t && (e.__proto__ = t);
}, o = function(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}, a = function() {
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
}();
Object.defineProperty(t, "__esModule", {
value: !0
});
var s, l = n(132), c = function() {
function e() {
var t = void 0 === arguments[0] ? {} : arguments[0];
o(this, e), this.notifications = [], this.verticalSpace = t.verticalSpace || 8;
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
s = new c(e);
};
var u = function() {
function e(t, n, i) {
o(this, e);
var r = '<div class="notification notification_popup notification_' + n + '">\n    <div class="notification__content">' + t + '</div>\n    <button title="Закрыть" class="notification__close"></button></div>';
switch (document.body.insertAdjacentHTML("beforeEnd", r), this.elem = document.body.lastElementChild, 
i) {
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
this.timeout = i;
}
s.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return a(e, [ {
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
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), s.unregister(this));
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
l.delegateMixin(u.prototype);
var p = function(e) {
function t(e, n) {
o(this, t), i(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "info", n);
}
return r(t, e), t;
}(u);
t.Info = p;
var d = function(e) {
function t(e, n) {
o(this, t), i(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "warning", n);
}
return r(t, e), t;
}(u);
t.Warning = d;
var f = function(e) {
function t(e, n) {
o(this, t), i(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "success", n);
}
return r(t, e), t;
}(u);
t.Success = f;
var h = function(e) {
function t(e, n) {
o(this, t), i(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "error", n);
}
return r(t, e), a(t, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), t;
}(u);
t.Error = h, t.Error = h;
},
132: function(e) {
"use strict";
function t(e, t) {
for (var n = e.target; n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}
function n(e, n, i, r, o) {
e.addEventListener(i, function(e) {
var i = t(e, n);
e.delegateTarget = i, i && r.call(o || this, e);
});
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, i) {
n(this.elem, e, t, i, this);
};
}, e.exports = n;
},
144: function(e) {
"use strict";
function t(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
t.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, t.prototype.stop = function() {
var e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, e.exports = t;
},
157: function() {},
158: function(e) {
"use strict";
function t(e, t) {
t = t || {};
var n, i, r, o, a, s = t.onRight || function() {}, l = t.onLeft || function() {}, c = t.tolerance || 50, u = t.threshold || 150, p = t.allowedTime || 500;
e.addEventListener("touchstart", function(e) {
var t = e.changedTouches[0];
r = 0, n = t.pageX, i = t.pageY, a = Date.now();
}), e.addEventListener("touchend", function(e) {
var t = e.changedTouches[0];
r = t.pageX - n, o = Date.now() - a, Math.abs(t.pageY - i) > c || o > p || (r > u && s(e), 
-u > r && l(e));
});
}
e.exports = t;
},
159: function(e, t, n) {
"use strict";
function i(e, t) {
function n(e, n) {
clearTimeout(i), t(e, n);
}
var i = setTimeout(function() {
t(Error("timeout"));
}, 500);
try {
(e.contentDocument || e.contentWindow.document).body;
} catch (a) {
r(e, n);
}
if (!e.offsetWidth) {
var s = e.cloneNode(!0);
return s.name = "", s.style.height = "50px", s.style.position = "absolute", s.style.display = "block", 
s.style.top = "10000px", s.onload = function() {
var t = o(this.contentDocument);
e.style.display = "block", s.remove(), n(null, t);
}, void document.body.appendChild(s);
}
e.style.display = "block", e.style.height = "1px";
var l = o(e.contentDocument);
e.style.height = "", n(null, l);
}
function r() {
throw Error("Not implemented yet");
}
var o = n(193);
i.async = function(e, t) {
setTimeout(function() {
i(e, t);
}, 0);
}, e.exports = i;
},
161: function(e, t, n) {
"use strict";
function i(e) {
if (e.length) {
if (1 === e.length) return "string" == typeof e[0] ? document.createTextNode(e[0]) : e[0];
for (var t, n = document.createDocumentFragment(), i = e.length, r = -1; ++r < i; ) t = e[r], 
n.appendChild("string" == typeof t ? document.createTextNode(t) : t);
return n;
}
throw Error("DOM Exception 8");
}
var r = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector,
replace: function() {
this.parentNode && this.parentNode.replaceChild(i(arguments), this);
},
prepend: function() {
this.insertBefore(i(arguments), this.firstChild);
},
append: function() {
this.appendChild(i(arguments));
},
remove: function() {
var e = this.parentNode;
return e ? e.removeChild(this) : void 0;
},
before: function() {
this.parentNode && this.parentNode.insertBefore(i(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(i(arguments), this.nextSibling);
},
closest: function(e) {
for (var t = this; t; ) {
if (t.matches(e)) return t;
t = t.parentElement;
}
return null;
}
};
for (var o in r) Element.prototype[o] || (Element.prototype[o] = r[o]);
n(189), n(190), n(191), n(192);
},
162: function(e) {
"use strict";
function t(e, t) {
function n() {
return o ? (i = arguments, void (r = this)) : (e.apply(this, arguments), o = !0, 
void setTimeout(function() {
o = !1, i && (n.apply(r, i), i = r = null);
}, t));
}
var i, r, o = !1;
return n;
}
e.exports = t;
},
189: function() {
"use strict";
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (e) {
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
190: function() {
"use strict";
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
var e = {
enumerable: !0,
get: function() {
var e, t, n, i, r, o, a = this, s = this.attributes, l = s.length, c = function(e) {
return e.charAt(1).toUpperCase();
}, u = function() {
return this;
}, p = function(e, t) {
return void 0 !== t ? this.setAttribute(e, t) : this.removeAttribute(e);
};
try {
({}).__defineGetter__("test", function() {}), t = {};
} catch (d) {
t = document.createElement("div");
}
for (e = 0; l > e; e++) if (o = s[e], o && o.name && /^data-\w[\w\-]*$/.test(o.name)) {
n = o.value, i = o.name, r = i.substr(5).replace(/-./g, c);
try {
Object.defineProperty(t, r, {
enumerable: this.enumerable,
get: u.bind(n || ""),
set: p.bind(a, i)
});
} catch (f) {
t[r] = n;
}
}
return t;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", e);
} catch (t) {
e.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", e);
}
}
},
191: function() {
"use strict";
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(e) {
this.setAttribute("hidden", e);
},
get: function() {
return this.getAttribute("hidden");
}
}));
},
192: function() {
"use strict";
!function() {
var e = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
var n = new Date().getTime(), i = Math.max(0, 16 - (n - e)), r = window.setTimeout(function() {
t(n + i);
}, i);
return e = n + i, r;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
clearTimeout(e);
});
}();
},
193: function(e, t, n) {
"use strict";
function i(e) {
e = e || document;
var t = Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight);
return e.documentElement.scrollWidth > e.documentElement.clientWidth && (r || (r = o()), 
t += r), t;
}
var r, o = n(202);
e.exports = i;
},
202: function(e) {
"use strict";
function t() {
var e = document.createElement("div");
if (e.style.cssText = "visibility:hidden;height:100px", !document.body) throw Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(e);
var t = e.offsetWidth;
e.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", e.appendChild(n);
var i = n.offsetWidth;
return e.parentNode.removeChild(e), t - i;
}
e.exports = t;
}
});
//# sourceMappingURL=head.e949916dcdef497773db.js.map
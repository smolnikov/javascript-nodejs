var footer = webpackJsonp_name_([ 3 ], {
0: function(t, e, n) {
"use strict";
function s() {
a(), window.devicePixelRatio > 1 && i(), window.addEventListener("scroll", o), o();
}
var a = n(19), i = n(20), o = n(21);
s();
},
19: function(t, e, n) {
"use strict";
var s = n(71);
t.exports = function() {
function t(t) {
var e = t.clientX + i;
e + a.offsetWidth > document.documentElement.clientWidth && (e = Math.max(0, t.clientX - i - a.offsetWidth)), 
a.style.left = e + "px";
var n = t.clientY + o;
n + a.offsetHeight > document.documentElement.clientHeight && (n = Math.max(0, t.clientY - o - a.offsetHeight)), 
a.style.top = n + "px";
}
function e(e) {
if (e.target.closest) {
var n = e.target.closest("a, [data-tooltip]");
n && ("A" == n.tagName && n.closest(".toolbar") || (a = document.createElement("span"), 
a.className = "link__type", n.getAttribute("data-tooltip") ? a.setAttribute("data-tooltip", n.getAttribute("data-tooltip")) : a.setAttribute("data-url", n.getAttribute("href")), 
document.body.appendChild(a), t(e), document.addEventListener("mousemove", t)));
}
}
function n() {
a && (document.removeEventListener("mousemove", t), a.remove(), a = null);
}
var a = null, i = 8, o = 10;
s("a,[data-tooltip]", e, n);
};
},
20: function(t) {
"use strict";
t.exports = function() {
for (var t = document.querySelectorAll('figure img[src$=".png"]'), e = function() {
var e = t[n];
e.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var t = new Image();
t.onload = function() {
this.width && this.height && (e.src = this.src);
}, t.src = this.src.replace(".png", "@2x.png");
}
}, e.complete && e.onload();
}, n = 0; n < t.length; n++) e();
};
},
21: function(t) {
"use strict";
function e() {
for (var t = document.querySelectorAll("[data-sticky]"), e = 0; e < t.length; e++) {
var s = t[e], a = s.dataset.sticky ? document.querySelector(s.dataset.sticky) : document.body;
if (s.getBoundingClientRect().top < 0) {
if (s.style.cssText) return;
var i = s.getBoundingClientRect().left, o = n(s);
s.parentNode.insertBefore(o, s), a.appendChild(s), s.classList.add("sticky"), s.style.position = "fixed", 
s.style.top = 0, s.style.left = i + "px", s.style.zIndex = 101, s.style.background = "white", 
s.style.margin = 0, s.style.width = o.offsetWidth + "px", s.placeholder = o;
} else s.placeholder && s.placeholder.getBoundingClientRect().top > 0 && (s.style.cssText = "", 
s.classList.remove("sticky"), s.placeholder.parentNode.insertBefore(s, s.placeholder), 
s.placeholder.remove(), s.placeholder = null);
}
}
function n(t) {
var e = document.createElement("div"), n = getComputedStyle(t);
return e.style.width = t.offsetWidth + "px", e.style.marginLeft = n.marginLeft, 
e.style.marginRight = n.marginRight, e.style.height = t.offsetHeight + "px", e.style.marginBottom = n.marginBottom, 
e.style.marginTop = n.marginTop, e;
}
t.exports = e;
},
71: function(t) {
"use strict";
function e(t, e, n) {
u[t] = {
over: e,
out: n
};
}
function n(t) {
if (!i) {
var e = Math.sqrt(Math.pow(t.pageX - o, 2) + Math.pow(t.pageY - r, 2)), n = e / (Date.now() - l);
if (c > n) {
var s = document.elementFromPoint(t.clientX, t.clientY);
if (!s) return;
if (s != a) {
for (var f in u) {
var d = s.closest(f);
d && (i = {
elem: d,
out: u[f].out
}, u[f].over(t));
}
a = s;
}
}
o = t.pageX, r = t.pageY, l = Date.now();
}
}
function s(t) {
if (i) {
for (var e = t.relatedTarget; e; ) {
if (e == i.elem) return;
e = e.parentElement;
}
var n = i.out;
i = null, n(t);
}
}
var a, i, o = 1 / 0, r = 1 / 0, l = Date.now(), c = .2, u = {};
document.addEventListener("mousemove", n), document.addEventListener("mouseout", s), 
t.exports = e;
}
});
//# sourceMappingURL=footer.258747a8aab739d1b709.js.map
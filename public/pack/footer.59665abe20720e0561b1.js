var footer = webpackJsonp_name_([ 3 ], {
0: function(t, e, n) {
"use strict";
function s() {
i(), window.devicePixelRatio > 1 && o(), window.addEventListener("scroll", a), a();
}
var i = n(19), o = n(20), a = n(21);
s();
},
19: function(t, e, n) {
"use strict";
var s = n(71);
t.exports = function() {
function t(t) {
var e = t.clientX + o;
e + i.offsetWidth > document.documentElement.clientWidth && (e = Math.max(0, t.clientX - o - i.offsetWidth)), 
i.style.left = e + "px";
var n = t.clientY + a;
n + i.offsetHeight > document.documentElement.clientHeight && (n = Math.max(0, t.clientY - a - i.offsetHeight)), 
i.style.top = n + "px";
}
function e(e) {
if (e.target.closest) {
var n = e.target.closest("a, [data-tooltip]");
n && ("A" == n.tagName && n.closest(".toolbar") || (i = document.createElement("span"), 
i.className = "link__type", n.getAttribute("data-tooltip") ? i.setAttribute("data-tooltip", n.getAttribute("data-tooltip")) : i.setAttribute("data-url", n.getAttribute("href")), 
document.body.appendChild(i), t(e), document.addEventListener("mousemove", t)));
}
}
function n() {
i && (document.removeEventListener("mousemove", t), i.remove(), i = null);
}
var i = null, o = 8, a = 10;
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
var s = t[e], i = s.dataset.sticky ? document.querySelector(s.dataset.sticky) : document.body;
if (s.getBoundingClientRect().top < 0) {
if (s.style.cssText) return;
var o = s.getBoundingClientRect().left, a = n(s);
s.parentNode.insertBefore(a, s), i.appendChild(s), s.classList.add("sticky"), s.style.position = "fixed", 
s.style.top = 0, s.style.left = o + "px", s.style.zIndex = 101, s.style.background = "white", 
s.style.margin = 0, s.style.width = a.offsetWidth + "px", s.placeholder = a;
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
if (!o) {
var e = Math.sqrt(Math.pow(t.pageX - a, 2) + Math.pow(t.pageY - r, 2)), n = e / (Date.now() - l);
if (c > n) {
var s = document.elementFromPoint(t.clientX, t.clientY);
if (!s) return;
if (s != i) {
for (var f in u) {
var d = s.closest(f);
d && (o = {
elem: d,
out: u[f].out
}, u[f].over(t));
}
i = s;
}
}
a = t.pageX, r = t.pageY, l = Date.now();
}
}
function s(t) {
if (o) {
for (var e = t.relatedTarget; e; ) {
if (e == o.elem) return;
e = e.parentElement;
}
var n = o.out;
o = null, n(t);
}
}
var i, o, a = 1 / 0, r = 1 / 0, l = Date.now(), c = .2, u = {};
document.addEventListener("mousemove", n), document.addEventListener("mouseout", s), 
t.exports = e;
}
});
//# sourceMappingURL=footer.59665abe20720e0561b1.js.map
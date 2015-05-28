var footer = webpackJsonp_name_([ 3 ], {
0: function(t, e, s) {
"use strict";
function n() {
o(), window.devicePixelRatio > 1 && a(), window.addEventListener("scroll", i), i();
}
var o = s(19), a = s(20), i = s(21);
n();
},
19: function(t, e, s) {
"use strict";
var n = s(71);
t.exports = function() {
function t(t) {
var e = t.clientX + a;
e + o.offsetWidth > document.documentElement.clientWidth && (e = Math.max(0, t.clientX - a - o.offsetWidth)), 
o.style.left = e + "px";
var s = t.clientY + i;
s + o.offsetHeight > document.documentElement.clientHeight && (s = Math.max(0, t.clientY - i - o.offsetHeight)), 
o.style.top = s + "px";
}
function e(e) {
if (e.target.closest) {
var s = e.target.closest("a, [data-tooltip]");
s && ("A" == s.tagName && s.closest(".toolbar") || (o = document.createElement("span"), 
o.className = "link__type", s.getAttribute("data-tooltip") ? o.setAttribute("data-tooltip", s.getAttribute("data-tooltip")) : o.setAttribute("data-url", s.getAttribute("href")), 
document.body.appendChild(o), t(e), document.addEventListener("mousemove", t)));
}
}
function s() {
o && (document.removeEventListener("mousemove", t), o.remove(), o = null);
}
var o = null, a = 8, i = 10;
n("a,[data-tooltip]", e, s);
};
},
20: function(t) {
"use strict";
t.exports = function() {
for (var t = document.querySelectorAll('figure img[src$=".png"]'), e = function() {
var e = t[s];
e.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var t = new Image();
t.onload = function() {
this.width && this.height && (e.src = this.src);
}, t.src = this.src.replace(".png", "@2x.png");
}
}, e.complete && e.onload();
}, s = 0; s < t.length; s++) e();
};
},
21: function(t) {
"use strict";
function e() {
for (var t = document.querySelectorAll("[data-sticky]"), e = 0; e < t.length; e++) {
var n = t[e], o = n.dataset.sticky ? document.querySelector(n.dataset.sticky) : document.body;
if (n.getBoundingClientRect().top < 0) {
if (n.style.cssText) return;
var a = n.getBoundingClientRect().left, i = s(n);
n.parentNode.insertBefore(i, n), o.appendChild(n), n.classList.add("sticky"), n.style.position = "fixed", 
n.style.top = 0, n.style.left = a + "px", n.style.zIndex = 101, n.style.background = "white", 
n.style.margin = 0, n.style.width = i.offsetWidth + "px", n.placeholder = i;
} else n.placeholder && n.placeholder.getBoundingClientRect().top > 0 && (n.style.cssText = "", 
n.classList.remove("sticky"), n.placeholder.parentNode.insertBefore(n, n.placeholder), 
n.placeholder.remove(), n.placeholder = null);
}
}
function s(t) {
var e = document.createElement("div"), s = getComputedStyle(t);
return e.style.width = t.offsetWidth + "px", e.style.marginLeft = s.marginLeft, 
e.style.marginRight = s.marginRight, e.style.height = t.offsetHeight + "px", e.style.marginBottom = s.marginBottom, 
e.style.marginTop = s.marginTop, e;
}
t.exports = e;
},
71: function(t) {
"use strict";
function e(t, e, s) {
u[t] = {
over: e,
out: s
};
}
function s(t) {
if (!a) {
var e = Math.sqrt(Math.pow(t.pageX - i, 2) + Math.pow(t.pageY - r, 2)), s = e / (Date.now() - l);
if (c > s) {
var n = document.elementFromPoint(t.clientX, t.clientY);
if (!n) return;
if (n != o) {
for (var d in u) {
var f = n.closest(d);
f && (a = {
elem: f,
out: u[d].out
}, u[d].over(t));
}
o = n;
}
}
i = t.pageX, r = t.pageY, l = Date.now();
}
}
function n(t) {
if (a) {
for (var e = t.relatedTarget; e; ) {
if (e == a.elem) return;
e = e.parentElement;
}
var s = a.out;
a = null, s(t);
}
}
var o, a, i = 1 / 0, r = 1 / 0, l = Date.now(), c = .2, u = {};
document.addEventListener("mousemove", s), document.addEventListener("mouseout", n), 
t.exports = e;
}
});
//# sourceMappingURL=footer.5ad16807a9c845ecc68f.js.map
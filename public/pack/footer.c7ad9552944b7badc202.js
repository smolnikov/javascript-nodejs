var footer = webpackJsonp_name_([ 3 ], {
0: function(t, e, o) {
"use strict";
function n() {
i(), window.devicePixelRatio > 1 && r(), window.addEventListener("scroll", a), a();
}
var i = o(182), r = o(184), a = o(185);
n();
},
182: function(t, e, o) {
"use strict";
var n = o(183);
t.exports = function() {
function t(t) {
var e = t.clientX + r;
e + i.offsetWidth > document.documentElement.clientWidth && (e = Math.max(0, t.clientX - r - i.offsetWidth)), 
i.style.left = e + "px";
var o = t.clientY + a;
o + i.offsetHeight > document.documentElement.clientHeight && (o = Math.max(0, t.clientY - a - i.offsetHeight)), 
i.style.top = o + "px";
}
function e(e) {
if (e.target.closest) {
var o = e.target.closest("a, [data-tooltip]");
o && ("A" == o.tagName && o.closest(".toolbar") || (i = document.createElement("span"), 
i.className = "link__type", o.getAttribute("data-tooltip") ? i.setAttribute("data-tooltip", o.getAttribute("data-tooltip")) : i.setAttribute("data-url", o.getAttribute("href")), 
document.body.appendChild(i), t(e), document.addEventListener("mousemove", t)));
}
}
function o() {
i && (document.removeEventListener("mousemove", t), i.remove(), i = null);
}
var i = null, r = 8, a = 10;
n("a,[data-tooltip]", e, o);
};
},
183: function(t, e) {
"use strict";
function o(t, e, o) {
u[t] = {
over: e,
out: o
};
}
function n(t) {
if (!a) {
var e = Math.sqrt(Math.pow(t.pageX - l, 2) + Math.pow(t.pageY - s, 2)), o = e / (Date.now() - c);
if (d > o) {
var n = document.elementFromPoint(t.clientX, t.clientY);
if (!n) return;
if (n != r) {
for (var i in u) {
var f = n.closest(i);
f && (a = {
elem: f,
out: u[i].out
}, u[i].over(t));
}
r = n;
}
}
l = t.pageX, s = t.pageY, c = Date.now();
}
}
function i(t) {
if (a) {
for (var e = t.relatedTarget; e; ) {
if (e == a.elem) return;
e = e.parentElement;
}
var o = a.out;
a = null, o(t);
}
}
var r, a, l = 1 / 0, s = 1 / 0, c = Date.now(), d = .2, u = {};
document.addEventListener("mousemove", n), document.addEventListener("mouseout", i), 
t.exports = o;
},
184: function(t, e) {
"use strict";
t.exports = function() {
for (var t = document.querySelectorAll('figure img[src$=".png"]'), e = function() {
var e = t[o];
e.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var t = new Image();
t.onload = function() {
this.width && this.height && (e.src = this.src);
}, t.src = this.src.replace(".png", "@2x.png");
}
}, e.complete && e.onload();
}, o = 0; o < t.length; o++) e();
};
},
185: function(t, e) {
"use strict";
function o() {
for (var t = document.querySelectorAll("[data-sticky]"), e = 0; e < t.length; e++) {
var o = t[e], i = o.dataset.sticky ? document.querySelector(o.dataset.sticky) : document.body;
if (o.getBoundingClientRect().top < 0) {
if (o.style.cssText) return;
var r = o.getBoundingClientRect().left, a = n(o);
o.parentNode.insertBefore(a, o), i.appendChild(o), o.classList.add("sticky"), o.style.position = "fixed", 
o.style.top = 0, o.style.left = r + "px", o.style.zIndex = 101, o.style.background = "white", 
o.style.margin = 0, o.style.width = a.offsetWidth + "px", o.placeholder = a;
} else o.placeholder && o.placeholder.getBoundingClientRect().top > 0 && (o.style.cssText = "", 
o.classList.remove("sticky"), o.placeholder.parentNode.insertBefore(o, o.placeholder), 
o.placeholder.remove(), o.placeholder = null);
}
}
function n(t) {
var e = document.createElement("div"), o = getComputedStyle(t);
return e.style.width = t.offsetWidth + "px", e.style.marginLeft = o.marginLeft, 
e.style.marginRight = o.marginRight, e.style.height = t.offsetHeight + "px", e.style.marginBottom = o.marginBottom, 
e.style.marginTop = o.marginTop, e;
}
t.exports = o;
}
});
//# sourceMappingURL=footer.c7ad9552944b7badc202.js.map
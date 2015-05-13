var footer = webpackJsonp_name_([ 3 ], {
0: function(e, t, n) {
"use strict";
var a = n(247), r = n(248), i = n(249);
t.init = function() {
a(), window.devicePixelRatio > 1 && r(), window.addEventListener("scroll", i), i();
}, t.trackSticky = i;
},
247: function(e, t, n) {
"use strict";
var a = n(286);
e.exports = function() {
function e(e) {
var t = e.clientX + i;
t + r.offsetWidth > document.documentElement.clientWidth && (t = Math.max(0, e.clientX - i - r.offsetWidth)), 
r.style.left = t + "px";
var n = e.clientY + o;
n + r.offsetHeight > document.documentElement.clientHeight && (n = Math.max(0, e.clientY - o - r.offsetHeight)), 
r.style.top = n + "px";
}
function t(t) {
if (t.target.closest) {
var n = t.target.closest("a, [data-tooltip]");
n && ("A" == n.tagName && n.closest(".toolbar") || (r = document.createElement("span"), 
r.className = "link__type", n.getAttribute("data-tooltip") ? r.setAttribute("data-tooltip", n.getAttribute("data-tooltip")) : r.setAttribute("data-url", n.getAttribute("href")), 
document.body.appendChild(r), e(t), document.addEventListener("mousemove", e)));
}
}
function n() {
r && (document.removeEventListener("mousemove", e), r.remove(), r = null);
}
var r = null, i = 8, o = 10;
a("a,[data-tooltip]", t, n);
};
},
248: function(e) {
"use strict";
e.exports = function() {
for (var e = document.querySelectorAll('figure img[src$=".png"]'), t = function() {
var t = e[n];
t.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var e = new Image();
e.onload = function() {
this.width && this.height && (t.src = this.src);
}, e.src = this.src.replace(".png", "@2x.png");
}
}, t.complete && t.onload();
}, n = 0; n < e.length; n++) t();
};
},
249: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var a = e[t], r = a.dataset.sticky ? document.querySelector(a.dataset.sticky) : document.body;
if (a.getBoundingClientRect().top < 0) {
if (a.style.cssText) return;
var i = a.getBoundingClientRect().left, o = n(a);
a.parentNode.insertBefore(o, a), r.appendChild(a), a.classList.add("sticky"), a.style.position = "fixed", 
a.style.top = 0, a.style.left = i + "px", a.style.zIndex = 101, a.style.background = "white", 
a.style.margin = 0, a.style.width = o.offsetWidth + "px", a.placeholder = o;
} else a.placeholder && a.placeholder.getBoundingClientRect().top > 0 && (a.style.cssText = "", 
a.classList.remove("sticky"), a.placeholder.parentNode.insertBefore(a, a.placeholder), 
a.placeholder.remove(), a.placeholder = null);
}
}
function n(e) {
var t = document.createElement("div"), n = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = n.marginLeft, 
t.style.marginRight = n.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = n.marginBottom, 
t.style.marginTop = n.marginTop, t;
}
e.exports = t;
},
286: function(e) {
"use strict";
function t(e, t, n) {
u[e] = {
over: t,
out: n
};
}
function n(e) {
if (!i) {
var t = Math.sqrt(Math.pow(e.pageX - o, 2) + Math.pow(e.pageY - s, 2)), n = t / (Date.now() - l);
if (c > n) {
var a = document.elementFromPoint(e.clientX, e.clientY);
if (!a) return;
if (a != r) {
for (var d in u) {
var p = a.closest(d);
p && (i = {
elem: p,
out: u[d].out
}, u[d].over(e));
}
r = a;
}
}
o = e.pageX, s = e.pageY, l = Date.now();
}
}
function a(e) {
if (i) {
for (var t = e.relatedTarget; t; ) {
if (t == i.elem) return;
t = t.parentElement;
}
var n = i.out;
i = null, n(e);
}
}
var r, i, o = 1 / 0, s = 1 / 0, l = Date.now(), c = .2, u = {};
document.addEventListener("mousemove", n), document.addEventListener("mouseout", a), 
e.exports = t;
}
});
//# sourceMappingURL=footer.a2992011de92e4d217f9.js.map
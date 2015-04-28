var footer = webpackJsonp_name_([ 3 ], {
0: function(e, t, o) {
"use strict";
var i = o(124), r = o(125), n = o(126);
t.init = function() {
i(), window.devicePixelRatio > 1 && r(), window.addEventListener("scroll", n), n();
}, t.trackSticky = n;
},
124: function(e, t, o) {
"use strict";
var i = o(160);
e.exports = function() {
function e(e) {
var t = e.clientX + n;
t + r.offsetWidth > document.documentElement.clientWidth && (t = Math.max(0, e.clientX - n - r.offsetWidth)), 
r.style.left = t + "px";
var o = e.clientY + a;
o + r.offsetHeight > document.documentElement.clientHeight && (o = Math.max(0, e.clientY - a - r.offsetHeight)), 
r.style.top = o + "px";
}
function t(t) {
if (t.target.closest) {
var o = t.target.closest("a, [data-tooltip]");
o && ("A" == o.tagName && o.closest(".toolbar") || (r = document.createElement("span"), 
r.className = "link__type", o.getAttribute("data-tooltip") ? r.setAttribute("data-tooltip", o.getAttribute("data-tooltip")) : r.setAttribute("data-url", o.getAttribute("href")), 
document.body.appendChild(r), e(t), document.addEventListener("mousemove", e)));
}
}
function o() {
r && (document.removeEventListener("mousemove", e), r.remove(), r = null);
}
var r = null, n = 8, a = 10;
i("a,[data-tooltip]", t, o);
};
},
125: function(e) {
"use strict";
e.exports = function() {
for (var e = document.querySelectorAll('figure img[src$=".png"]'), t = function() {
var t = e[o];
t.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var e = new Image();
e.onload = function() {
this.width && this.height && (t.src = this.src);
}, e.src = this.src.replace(".png", "@2x.png");
}
}, t.complete && t.onload();
}, o = 0; o < e.length; o++) t();
};
},
126: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var i = e[t], r = i.dataset.sticky ? document.querySelector(i.dataset.sticky) : document.body;
if (i.getBoundingClientRect().top < 0) {
if (i.style.cssText) return;
var n = i.getBoundingClientRect().left, a = o(i);
i.parentNode.insertBefore(a, i), r.appendChild(i), i.classList.add("sticky"), i.style.position = "fixed", 
i.style.top = 0, i.style.left = n + "px", i.style.zIndex = 101, i.style.background = "white", 
i.style.margin = 0, i.style.width = a.offsetWidth + "px", i.placeholder = a;
} else i.placeholder && i.placeholder.getBoundingClientRect().top > 0 && (i.style.cssText = "", 
i.classList.remove("sticky"), i.placeholder.parentNode.insertBefore(i, i.placeholder), 
i.placeholder.remove(), i.placeholder = null);
}
}
function o(e) {
var t = document.createElement("div"), o = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = o.marginLeft, 
t.style.marginRight = o.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = o.marginBottom, 
t.style.marginTop = o.marginTop, t;
}
e.exports = t;
},
160: function(e) {
"use strict";
function t(e, t, o) {
c[e] = {
over: t,
out: o
};
}
function o(e) {
if (!n) {
var t = Math.sqrt(Math.pow(e.pageX - a, 2) + Math.pow(e.pageY - s, 2)), o = t / (Date.now() - l);
if (p > o) {
var i = document.elementFromPoint(e.clientX, e.clientY);
if (!i) return;
if (i != r) {
for (var d in c) {
var _ = i.closest(d);
_ && (n = {
elem: _,
out: c[d].out
}, c[d].over(e));
}
r = i;
}
}
a = e.pageX, s = e.pageY, l = Date.now();
}
}
function i(e) {
if (n) {
for (var t = e.relatedTarget; t; ) {
if (t == n.elem) return;
t = t.parentElement;
}
var o = n.out;
n = null, o(e);
}
}
var r, n, a = 1 / 0, s = 1 / 0, l = Date.now(), p = .2, c = {};
document.addEventListener("mousemove", o), document.addEventListener("mouseout", i), 
e.exports = t;
}
});
//# sourceMappingURL=footer.dc578189d5ad0ade294c.js.map
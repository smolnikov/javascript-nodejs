var footer = webpackJsonp_name_([ 3 ], {
0: function(e, t, o) {
"use strict";
var i = o(2), n = o(3), a = o(4);
t.init = function() {
i(), window.devicePixelRatio > 1 && n(), window.addEventListener("scroll", a), a();
}, t.trackSticky = a;
},
2: function(e, t, o) {
"use strict";
var i = o(49);
e.exports = function() {
function e(e) {
var t = e.clientX + a;
t + n.offsetWidth > document.documentElement.clientWidth && (t = Math.max(0, e.clientX - a - n.offsetWidth)), 
n.style.left = t + "px";
var o = e.clientY + r;
o + n.offsetHeight > document.documentElement.clientHeight && (o = Math.max(0, e.clientY - r - n.offsetHeight)), 
n.style.top = o + "px";
}
function t(t) {
if (t.target.closest) {
var o = t.target.closest("a, [data-tooltip]");
o && ("A" == o.tagName && o.closest(".toolbar") || (n = document.createElement("span"), 
n.className = "link__type", o.getAttribute("data-tooltip") ? n.setAttribute("data-tooltip", o.getAttribute("data-tooltip")) : n.setAttribute("data-url", o.getAttribute("href")), 
document.body.appendChild(n), e(t), document.addEventListener("mousemove", e)));
}
}
function o() {
n && (document.removeEventListener("mousemove", e), n.remove(), n = null);
}
var n = null, a = 8, r = 10;
i("a,[data-tooltip]", t, o);
};
},
3: function(e) {
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
4: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var i = e[t], n = i.dataset.sticky ? document.querySelector(i.dataset.sticky) : document.body;
if (i.getBoundingClientRect().top < 0) {
if (i.style.cssText) return;
var a = i.getBoundingClientRect().left, r = o(i);
i.parentNode.insertBefore(r, i), n.appendChild(i), i.classList.add("sticky"), i.style.position = "fixed", 
i.style.top = 0, i.style.left = a + "px", i.style.zIndex = 101, i.style.background = "white", 
i.style.margin = 0, i.style.width = r.offsetWidth + "px", i.placeholder = r;
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
49: function(e) {
"use strict";
function t(e, t, o) {
c[e] = {
over: t,
out: o
};
}
function o(e) {
if (!a) {
var t = Math.sqrt(Math.pow(e.pageX - r, 2) + Math.pow(e.pageY - s, 2)), o = t / (Date.now() - l);
if (p > o) {
var i = document.elementFromPoint(e.clientX, e.clientY);
if (!i) return;
if (i != n) {
for (var d in c) {
var _ = i.closest(d);
_ && (a = {
elem: _,
out: c[d].out
}, c[d].over(e));
}
n = i;
}
}
r = e.pageX, s = e.pageY, l = Date.now();
}
}
function i(e) {
if (a) {
for (var t = e.relatedTarget; t; ) {
if (t == a.elem) return;
t = t.parentElement;
}
var o = a.out;
a = null, o(e);
}
}
var n, a, r = 1 / 0, s = 1 / 0, l = Date.now(), p = .2, c = {};
document.addEventListener("mousemove", o), document.addEventListener("mouseout", i), 
e.exports = t;
}
});
//# sourceMappingURL=footer.40520d084aa52fbb1263.js.map
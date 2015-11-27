webpackJsonp_name_([ 6 ], {
244: function(e, t) {
"use strict";
function r() {
for (var e = document.querySelectorAll('a[href^="/"]'), t = 0; t < e.length; t++) {
var r = e[t];
document.getElementById(r.getAttribute("href")) && r.setAttribute("href", "#" + r.getAttribute("href"));
}
}
function n() {
for (var e = document.querySelectorAll('a[href^="#"]'), t = 0; t < e.length; t++) {
var r = e[t];
r.setAttribute("href", r.getAttribute("href").replace(/\//g, "-"));
}
for (var n = document.querySelectorAll("[id]"), t = 0; t < n.length; t++) {
var u = n[t];
u.id = u.id.replace(/\//g, "-");
}
}
t.init = function() {
r(), n();
};
}
});
//# sourceMappingURL=ebookExtras-6.ab47d31a5bdad3ba4b57.js.map
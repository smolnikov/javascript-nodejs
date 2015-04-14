webpackJsonp_name_([ 13 ], {
106: function(e, t) {
"use strict";
function n() {
for (var e = document.querySelectorAll('a[href^="/"]'), t = 0; t < e.length; t++) {
var n = e[t];
document.getElementById(n.getAttribute("href")) && n.setAttribute("href", "#" + n.getAttribute("href"));
}
}
function i() {
for (var e = document.querySelectorAll('a[href^="#"]'), t = 0; t < e.length; t++) {
var n = e[t];
n.setAttribute("href", n.getAttribute("href").replace(/\//g, "-"));
}
for (var i = document.querySelectorAll("[id]"), t = 0; t < i.length; t++) {
var r = i[t];
r.id = r.id.replace(/\//g, "-");
}
}
t.init = function() {
n(), i();
};
}
});
//# sourceMappingURL=ebookExtras-13.77e59b62f3c5d7524b1e.js.map
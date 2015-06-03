webpackJsonp_name_([ 6 ], {
26: function(e, t) {
"use strict";
function n() {
for (var e = document.querySelectorAll('a[href^="/"]'), t = 0; t < e.length; t++) {
var n = e[t];
document.getElementById(n.getAttribute("href")) && n.setAttribute("href", "#" + n.getAttribute("href"));
}
}
function r() {
for (var e = document.querySelectorAll('a[href^="#"]'), t = 0; t < e.length; t++) {
var n = e[t];
n.setAttribute("href", n.getAttribute("href").replace(/\//g, "-"));
}
for (var r = document.querySelectorAll("[id]"), t = 0; t < r.length; t++) {
var i = r[t];
i.id = i.id.replace(/\//g, "-");
}
}
t.init = function() {
n(), r();
};
}
});
//# sourceMappingURL=ebookExtras-6.a031b373f4a91a6ea736.js.map
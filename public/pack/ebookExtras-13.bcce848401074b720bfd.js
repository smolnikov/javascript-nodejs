webpackJsonp_name_([ 13 ], {
254: function(t, e) {
"use strict";
function n() {
for (var t = document.querySelectorAll('a[href^="/"]'), e = 0; e < t.length; e++) {
var n = t[e];
document.getElementById(n.getAttribute("href")) && n.setAttribute("href", "#" + n.getAttribute("href"));
}
}
function r() {
for (var t = document.querySelectorAll('a[href^="#"]'), e = 0; e < t.length; e++) {
var n = t[e];
n.setAttribute("href", n.getAttribute("href").replace(/\//g, "-"));
}
for (var r = document.querySelectorAll("[id]"), e = 0; e < r.length; e++) {
var i = r[e];
i.id = i.id.replace(/\//g, "-");
}
}
e.init = function() {
n(), r();
};
}
});
//# sourceMappingURL=ebookExtras-13.bcce848401074b720bfd.js.map
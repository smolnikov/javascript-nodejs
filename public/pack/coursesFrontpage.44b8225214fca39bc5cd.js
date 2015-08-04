var coursesFrontpage = webpackJsonp_name_([ 18 ], [ function() {
"use strict";
function t() {
function t() {
n.style.transform = "translateX(" + -o + "px)", 0 === o ? e.classList.add("participants-logos__slider_disable_left") : e.classList.remove("participants-logos__slider_disable_left"), 
o == n.scrollWidth - n.clientWidth ? e.classList.add("participants-logos__slider_disable_right") : e.classList.remove("participants-logos__slider_disable_right");
}
var e = document.querySelector("[data-participants-slider]"), n = e.querySelector("ul"), r = e.querySelector(".participants-logos__arr_left"), i = e.querySelector(".participants-logos__arr_right"), o = 0;
t(), r.onclick = function() {
o -= n.clientWidth, 0 > o && (o = 0), t();
}, i.onclick = function() {
o = Math.min(o + n.clientWidth, n.scrollWidth - n.clientWidth), t();
};
}
t();
} ]);
//# sourceMappingURL=coursesFrontpage.44b8225214fca39bc5cd.js.map
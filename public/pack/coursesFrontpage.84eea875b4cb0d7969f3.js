var coursesFrontpage = webpackJsonp_name_([ 18 ], [ function() {
"use strict";
function t() {
function t() {
n.style.transform = "translateX(" + -a + "px)", 0 === a ? e.classList.add("participants-logos__slider_disable_left") : e.classList.remove("participants-logos__slider_disable_left"), 
a == n.scrollWidth - n.clientWidth ? e.classList.add("participants-logos__slider_disable_right") : e.classList.remove("participants-logos__slider_disable_right");
}
var e = document.querySelector("[data-participants-slider]"), n = e.querySelector("ul"), r = e.querySelector(".participants-logos__arr_left"), i = e.querySelector(".participants-logos__arr_right"), a = 0;
t(), r.onclick = function() {
a -= n.clientWidth, 0 > a && (a = 0), t();
}, i.onclick = function() {
a = Math.min(a + n.clientWidth, n.scrollWidth - n.clientWidth), t();
};
}
t();
} ]);
//# sourceMappingURL=coursesFrontpage.84eea875b4cb0d7969f3.js.map
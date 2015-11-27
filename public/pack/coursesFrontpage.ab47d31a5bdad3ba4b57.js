var coursesFrontpage = webpackJsonp_name_([ 18 ], [ function(t, i) {
"use strict";
function s() {
function t() {
s.style.transform = "translateX(" + -r + "px)", 0 === r ? i.classList.add("participants-logos__slider_disable_left") : i.classList.remove("participants-logos__slider_disable_left"), 
r == s.scrollWidth - s.clientWidth ? i.classList.add("participants-logos__slider_disable_right") : i.classList.remove("participants-logos__slider_disable_right");
}
var i = document.querySelector("[data-participants-slider]"), s = i.querySelector("ul"), e = i.querySelector(".participants-logos__arr_left"), l = i.querySelector(".participants-logos__arr_right"), r = 0;
t(), e.onclick = function() {
r -= s.clientWidth, 0 > r && (r = 0), t();
}, l.onclick = function() {
r = Math.min(r + s.clientWidth, s.scrollWidth - s.clientWidth), t();
};
}
s();
} ]);
//# sourceMappingURL=coursesFrontpage.ab47d31a5bdad3ba4b57.js.map
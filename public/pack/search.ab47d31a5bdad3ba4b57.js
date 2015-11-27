var search = webpackJsonp_name_([ 0 ], [ function(e, r) {
"use strict";
function t() {
function e() {
o.getBoundingClientRect().top <= n ? (r.classList.contains("search-form_hidden") && (t.value = o.value), 
r.classList.remove("search-form_hidden")) : (r.classList.contains("search-form_hidden") || (o.value = t.value), 
r.classList.add("search-form_hidden"));
}
var r = document.querySelector(".search-form_fixed"), t = r.querySelector(".search-form__query .text-input__control"), o = document.querySelector(".search-form:not(.search-form_fixed) .search-form__query .text-input__control"), n = parseInt(getComputedStyle(r, "").paddingTop);
window.addEventListener("scroll", e), e();
}
t();
} ]);
//# sourceMappingURL=search.ab47d31a5bdad3ba4b57.js.map
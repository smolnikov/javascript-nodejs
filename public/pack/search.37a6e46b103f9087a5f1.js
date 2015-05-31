var search = webpackJsonp_name_([ 0 ], [ function() {
"use strict";
function e() {
function e() {
o.getBoundingClientRect().top <= n ? (r.classList.contains("search-form_hidden") && (t.value = o.value), 
r.classList.remove("search-form_hidden")) : (r.classList.contains("search-form_hidden") || (o.value = t.value), 
r.classList.add("search-form_hidden"));
}
var r = document.querySelector(".search-form_fixed"), t = r.querySelector(".search-form__query .text-input__control"), o = document.querySelector(".search-form:not(.search-form_fixed) .search-form__query .text-input__control"), n = parseInt(getComputedStyle(r, "").paddingTop);
window.addEventListener("scroll", e), e();
}
e();
} ]);
//# sourceMappingURL=search.37a6e46b103f9087a5f1.js.map
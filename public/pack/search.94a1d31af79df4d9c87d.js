var search = webpackJsonp_name_([ 0 ], [ function(e, t) {
"use strict";
t.init = function() {
function e() {
i.getBoundingClientRect().top <= r ? (t.classList.contains("search-form_hidden") && (o.value = i.value), 
t.classList.remove("search-form_hidden")) : (t.classList.contains("search-form_hidden") || (i.value = o.value), 
t.classList.add("search-form_hidden"));
}
var t = document.querySelector(".search-form_fixed"), o = t.querySelector(".search-form__query .text-input__control"), i = document.querySelector(".search-form:not(.search-form_fixed) .search-form__query .text-input__control"), r = parseInt(getComputedStyle(t, "").paddingTop);
window.addEventListener("scroll", e), e();
};
} ]);
//# sourceMappingURL=search.94a1d31af79df4d9c87d.js.map
var tutorial = webpackJsonp_name_([ 2 ], {
0: function(e, t, o) {
"use strict";
function i() {
function e() {
var e = document.getElementsByClassName("sidebar__navigation-link_active");
e[0] && e[0].classList.remove("sidebar__navigation-link_active");
for (var t = document.getElementsByTagName("h2"), o = 0; o < t.length; o++) {
var i = t[o];
if (i.getBoundingClientRect().top > 1) break;
}
if (o--, o >= 0) {
var n = t[o].firstElementChild && t[o].firstElementChild.getAttribute("href"), a = document.querySelector('.sidebar__navigation-link a[href="' + n + '"]');
n && a && a.classList.add("sidebar__navigation-link_active");
}
}
document.addEventListener("DOMContentLoaded", function() {
e(), window.addEventListener("scroll", e);
});
}
function n() {
r(document, ".task__solution", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), r(document, ".task__answer-close", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), r(document, ".task__step-show", "click", function(e) {
e.target.closest(".task__step").classList.toggle("task__step_open");
});
}
function a() {
r(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function(e) {
var t = e.delegateTarget, o = t.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
o && o != t.parentNode && o.classList.remove("lessons-list__lesson_open"), t.parentNode.classList.toggle("lessons-list__lesson_open"), 
e.preventDefault();
});
}
var r = o(132), s = o(143), l = (o(133), o(129));
t.init = function() {
n(), a(), i(), r(document, '[data-action="tutorial-map"]', "click", function(e) {
new l(), e.preventDefault();
}), s.init(), window.ebookType && o.e(13, function() {
o(131).init();
});
}, t.TutorialMap = o(130);
},
126: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var i = e[t], n = i.dataset.sticky ? document.querySelector(i.dataset.sticky) : document.body;
if (i.getBoundingClientRect().top < 0) {
if (i.style.cssText) return;
var a = i.getBoundingClientRect().left, r = o(i);
i.parentNode.insertBefore(r, i), n.appendChild(i), i.classList.add("sticky"), i.style.position = "fixed", 
i.style.top = 0, i.style.left = a + "px", i.style.zIndex = 101, i.style.background = "white", 
i.style.margin = 0, i.style.width = r.offsetWidth + "px", i.placeholder = r;
} else i.placeholder && i.placeholder.getBoundingClientRect().top > 0 && (i.style.cssText = "", 
i.classList.remove("sticky"), i.placeholder.parentNode.insertBefore(i, i.placeholder), 
i.placeholder.remove(), i.placeholder = null);
}
}
function o(e) {
var t = document.createElement("div"), o = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = o.marginLeft, 
t.style.marginRight = o.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = o.marginBottom, 
t.style.marginTop = o.marginTop, t;
}
e.exports = t;
},
129: function(e, t, o) {
"use strict";
function i() {
var e = this, t = new r({
hasClose: !1
}), o = new s();
t.setContent(o.elem), o.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
var i = n({
url: "/tutorial/map"
});
i.addEventListener("success", function(o) {
t.remove(), document.body.insertAdjacentHTML("beforeEnd", '<div class="tutorial-map-overlay"></div>'), 
e.elem = document.body.lastChild, e.elem.innerHTML = o.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
e.elem.addEventListener("click", function(t) {
t.target.classList.contains("tutorial-map-overlay__close") && e.remove();
}), document.addEventListener("keydown", e.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
e.elem.addEventListener("scroll", p), new l(e.elem.firstElementChild);
}), i.addEventListener("fail", function() {
return t.remove();
});
}
var n = o(133), a = o(132), r = o(114), s = o(144), l = o(130), p = o(126);
a.delegateMixin(i.prototype), i.prototype.remove = function() {
this.elem.remove(), document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}, i.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, e.exports = i;
},
130: function(e, t, o) {
"use strict";
function i(e) {
var t = this;
this.elem = e, this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +localStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.layoutSwitch = this.elem.querySelector("[data-tutorial-map-layout-switch]");
var o = +localStorage.isMapSingleColumn;
this.layoutSwitch.querySelector('[value="0"]').checked = !o, this.layoutSwitch.querySelector('[value="1"]').checked = o, 
this.updateLayout(), this.layoutSwitch.onchange = this.onLayoutSwitchChange.bind(this), 
this.filterInput.oninput = this.onFilterInput.bind(this), this.filterInput.onkeydown = this.onFilterKeydown.bind(this), 
this.elem.querySelector(".close-button").onclick = function() {
t.filterInput.value = "", t.showClearButton(!1), t.filter("");
}, this.chaptersCollapsed = JSON.parse(localStorage.tutorialMapChapters || "{}"), 
this.showChaptersCollapsed(), this.delegate(".tutorial-map__item > .tutorial-map__link", "click", function(e) {
e.preventDefault();
var t = e.delegateTarget.getAttribute("href");
this.chaptersCollapsed[t] ? delete this.chaptersCollapsed[t] : this.chaptersCollapsed[t] = 1, 
localStorage.tutorialMapChapters = JSON.stringify(this.chaptersCollapsed), this.showChaptersCollapsed();
});
var i = this.elem.querySelector('[href="' + location.pathname + '"]');
i && i.classList.add("tutorial-map__link_active"), this.filterInput.focus();
}
function n(e, t) {
for (var o = 0, i = 0; o < e.length && i < t.length; ) e[o] == t[i] ? (o++, i++) : o++;
return i == t.length;
}
var a = o(162), r = o(132);
i.prototype.showChaptersCollapsed = function() {
for (var e = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"), t = 0; t < e.length; t++) {
var o = e[t];
this.chaptersCollapsed[o.getAttribute("href")] ? o.parentNode.classList.add("tutorial-map__item_collapsed") : o.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}, i.prototype.onLayoutSwitchChange = function() {
this.updateLayout();
}, i.prototype.updateLayout = function() {
var e = +this.elem.querySelector('[name="map-layout"]:checked').value;
e ? this.elem.classList.add("tutorial-map_singlecol") : this.elem.classList.remove("tutorial-map_singlecol"), 
localStorage.isMapSingleColumn = e ? "1" : "0";
}, i.prototype.updateShowTasks = function() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
localStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}, i.prototype.onFilterInput = function(e) {
this.showClearButton(e.target.value), this.throttleFilter(e.target.value);
}, i.prototype.onFilterKeydown = function(e) {
27 == e.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}, i.prototype.showClearButton = function(e) {
e ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}, i.prototype.focus = function() {
this.elem.tabIndex = -1, this.elem.focus();
}, i.prototype.filter = function(e) {
function t(t) {
return n(t.querySelector("a").innerHTML.toLowerCase(), e.replace(/\s/g, ""));
}
e = e.toLowerCase();
for (var o = this.showTasksCheckbox.checked, i = (this.elem.querySelectorAll(".tutorial-map-link"), 
this.elem.querySelectorAll(".tutorial-map__item")), a = 0; a < i.length; a++) {
var r = i[a], s = r.querySelectorAll(".tutorial-map__sub-item"), l = Array.prototype.reduce.call(s, function(e, i) {
var n = !1;
if (o) {
var a = i.querySelectorAll(".tutorial-map__sub-sub-item");
n = Array.prototype.reduce.call(a, function(e, o) {
var i = t(o);
return o.hidden = !i, e || i;
}, !1);
}
var r = n || t(i);
return i.hidden = !r, e || r;
}, !1);
r.hidden = !(l || t(r));
}
}, i.prototype.throttleFilter = a(i.prototype.filter, 200), r.delegateMixin(i.prototype), 
e.exports = i;
},
133: function(e, t, o) {
"use strict";
function i(e) {
function t(e, t) {
var o = new CustomEvent(e);
return o.originalEvent = t, o;
}
function o(e, o) {
var i = t("fail", o);
i.reason = e, n.dispatchEvent(i);
}
function i(e, o) {
var i = t("success", o);
i.result = e, n.dispatchEvent(i);
}
var n = new XMLHttpRequest(), r = e.method || "GET", s = e.body, l = e.url;
n.open(r, l, e.sync ? !1 : !0), n.method = r;
var p = a();
p && !e.skipCsrf && n.setRequestHeader("X-XSRF-TOKEN", p), "[object Object]" == {}.toString.call(s) && (n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (n.addEventListener("loadstart", function(e) {
n.timeStart = Date.now();
var o = t("xhrstart", e);
document.dispatchEvent(o);
}), n.addEventListener("loadend", function(e) {
var o = t("xhrend", e);
document.dispatchEvent(o);
}), n.addEventListener("success", function(e) {
var o = t("xhrsuccess", e);
o.result = e.result, document.dispatchEvent(o);
}), n.addEventListener("fail", function(e) {
var o = t("xhrfail", e);
o.reason = e.reason, document.dispatchEvent(o);
})), e.raw || n.setRequestHeader("Accept", "application/json"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var c = e.normalStatuses || [ 200 ];
return n.addEventListener("error", function(e) {
o("Ошибка связи с сервером.", e);
}), n.addEventListener("timeout", function(e) {
o("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), n.addEventListener("abort", function(e) {
o("Запрос был прерван.", e);
}), n.addEventListener("load", function(t) {
if (!n.status) return void o("Не получен ответ от сервера.", t);
if (-1 == c.indexOf(n.status)) return void o("Ошибка на стороне сервера (код " + n.status + "), попытайтесь позднее", t);
var a = n.responseText, r = n.getResponseHeader("Content-Type");
if (r.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void o("Некорректный формат ответа от сервера", t);
}
i(a, t);
}), setTimeout(function() {
n.send(s);
}, 0), n;
}
var n = o(128), a = o(163);
document.addEventListener("xhrfail", function(e) {
new n.Error(e.reason);
}), e.exports = i;
},
143: function(e, t, o) {
"use strict";
function i(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), o = 0; o < t.length; o++) {
var i = t[o];
new r(i), i.setAttribute("data-prism-done", "1");
}
}
function n(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), o = 0; o < t.length; o++) new s(t[o]), 
t[o].setAttribute("data-prism-done", "1");
}
function a(e) {
i(e), n(e);
}
o(173), o(174), o(175), o(176), o(177), o(178), o(179), o(180), o(181), o(182), 
o(183), o(184), o(185), o(186), o(187), Prism.tokenTag = "code";
var r = o(165), s = o(166);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
a(document);
});
}, t.highlight = a;
},
163: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
165: function(e, t, o) {
"use strict";
function i(e) {
function t() {
var e = f.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(b, "https://ru.lookatcode.com/showjs");
}
function o() {
var t;
if (g && e.hasAttribute("data-refresh") && (g.remove(), g = null), g || (g = e.querySelector(".code-result")), 
g) t = g.querySelector("iframe"); else {
if (g = document.createElement("div"), g.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var o = +e.getAttribute("data-demo-height");
t.style.height = o + "px";
}
g.appendChild(t), e.appendChild(g);
}
if (x) {
var i = t.contentDocument || t.contentWindow.document;
i.open(), i.write(c(b)), i.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(i.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || r.iframe(t), w && e.hasAttribute("data-autorun") || s(g) || g.scrollIntoView(!1);
} else {
var n = document.createElement("form");
n.style.display = "none", n.method = "POST", n.enctype = "multipart/form-data", 
n.action = "https://ru.lookatcode.com/showhtml", n.target = t.name;
var a = document.createElement("textarea");
a.name = "code", a.value = c(b), n.appendChild(a), t.parentNode.insertBefore(n, t.nextSibling), 
n.submit(), n.remove(), w && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || r.iframe(t), s(g) || g.scrollIntoView(!1);
});
}
}
function i() {
if (x) try {
window.eval.call(window, b);
} catch (o) {
alert("Ошибка: " + o.message);
} else e.hasAttribute("data-refresh") && f && (f.remove(), f = null), f ? t() : (f = document.createElement("iframe"), 
f.className = "js-frame", f.src = "https://ru.lookatcode.com/showjs", f.style.width = 0, 
f.style.height = 0, f.style.border = "none", f.onload = function() {
t();
}, document.body.appendChild(f));
}
function p() {
var e;
if (h) e = c(b); else {
var t = b.replace(/^/gim, "    ");
e = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + t + "\n  </script>\n</body>\n\n</html>";
}
var o = document.createElement("form");
o.action = "http://plnkr.co/edit/?p=preview", o.method = "POST", o.target = "_blank", 
document.body.appendChild(o);
var i = document.createElement("textarea");
i.name = "files[index.html]", i.value = e, o.appendChild(i);
var n = document.createElement("input");
n.name = "description", n.value = "Fork from " + window.location, o.appendChild(n), 
o.submit(), o.remove();
}
function c() {
var e = b.toLowerCase(), t = e.match("<body>"), o = e.match("</body>"), i = e.match("<html>"), n = e.match("</html>"), a = e.match(/^\s*<!doctype/);
if (a) return b;
var r = b;
return i || (r = "<html>\n" + r), n || (r += "\n</html>"), t || (r = r.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
o || (r = r.replace("</html>", "\n</body>\n</html>")), r = "<!DOCTYPE HTML>\n" + r;
}
function d() {
m ? i() : o(), w = !1;
}
var _ = e.querySelector("pre"), u = _.querySelector("code"), b = u.textContent;
Prism.highlightElement(u), l(_), n(_, e.getAttribute("data-highlight-block")), a(_, e.getAttribute("data-highlight-inline"));
var f, g, m = _.classList.contains("language-javascript"), h = _.classList.contains("language-markup"), x = +e.getAttribute("data-trusted"), w = !0;
if (m || h) {
var k = e.querySelector('[data-action="run"]');
k && (k.onclick = function() {
return this.blur(), d(), !1;
});
var y = e.querySelector('[data-action="edit"]');
y && (y.onclick = function() {
return this.blur(), p(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(d, 100));
}
}
function n(e, t) {
if (t) for (var o, i = t.replace(/\s+/g, "").split(","), n = 0; o = i[n++]; ) {
o = o.split("-");
var a = +o[0], r = +o[1] || a, s = '<code class="block-highlight" data-start="' + a + '" data-end="' + r + '">' + Array(a + 1).join("\n") + '<code class="mask">' + Array(r - a + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", s);
}
}
function a(e, t) {
var o = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var i = 0; i < t.length; i++) {
var n = t[i].split(":"), a = +n[0], r = n[1].split("-"), s = +r[0], l = +r[1], p = '<code class="inline-highlight">' + Array(a + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(l - s + 1).join(" ") + "</code></code>";
o.insertAdjacentHTML("afterBegin", p);
}
}
var r = o(123), s = o(195), l = o(194);
e.exports = i;
},
166: function(e, t, o) {
"use strict";
function i(e) {
window.ebookType || (this.elem = e, this.translateX = 0, this.switchesElem = e.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = e.querySelector("[data-code-tabs-left]"), 
this.arrowRight = e.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = function(e) {
e.preventDefault(), this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.arrowRight.onclick = function(e) {
e.preventDefault(), this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.delegate(".code-tabs__switch", "click", this.onSwitchClick));
}
var n = o(132), a = o(194);
i.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, o = e.delegateTarget.parentNode.children, i = this.elem.querySelector("[data-code-tabs-content]").children, n = 0; n < o.length; n++) {
var a = o[n], r = i[n];
a == e.delegateTarget ? (t = n, r.classList.add("code-tabs__section_current"), a.classList.add("code-tabs__switch_current")) : (r.classList.remove("code-tabs__section_current"), 
a.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(i[t]));
}, i.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), o = t.querySelector("code");
Prism.highlightElement(o), a(t), e.highlighted = !0;
}
}, i.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, n.delegateMixin(i.prototype), e.exports = i;
},
173: function(e) {
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var t = function() {
var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, o = self.Prism = {
util: {
encode: function(e) {
return e instanceof i ? new i(e.type, o.util.encode(e.content), e.alias) : "Array" === o.util.type(e) ? e.map(o.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
},
clone: function(e) {
var t = o.util.type(e);
switch (t) {
case "Object":
var i = {};
for (var n in e) e.hasOwnProperty(n) && (i[n] = o.util.clone(e[n]));
return i;

case "Array":
return e.slice();
}
return e;
}
},
languages: {
extend: function(e, t) {
var i = o.util.clone(o.languages[e]);
for (var n in t) i[n] = t[n];
return i;
},
insertBefore: function(e, t, i, n) {
n = n || o.languages;
var a = n[e];
if (2 == arguments.length) {
i = arguments[1];
for (var r in i) i.hasOwnProperty(r) && (a[r] = i[r]);
return a;
}
var s = {};
for (var l in a) if (a.hasOwnProperty(l)) {
if (l == t) for (var r in i) i.hasOwnProperty(r) && (s[r] = i[r]);
s[l] = a[l];
}
return o.languages.DFS(o.languages, function(t, o) {
o === n[e] && t != e && (this[t] = s);
}), n[e] = s;
},
DFS: function(e, t, i) {
for (var n in e) e.hasOwnProperty(n) && (t.call(e, n, e[n], i || n), "Object" === o.util.type(e[n]) ? o.languages.DFS(e[n], t) : "Array" === o.util.type(e[n]) && o.languages.DFS(e[n], t, n));
}
},
highlightAll: function(e, t) {
for (var i, n = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), a = 0; i = n[a++]; ) o.highlightElement(i, e === !0, t);
},
highlightElement: function(t, n, a) {
for (var r, s, l = t; l && !e.test(l.className); ) l = l.parentNode;
if (l && (r = (l.className.match(e) || [ , "" ])[1], s = o.languages[r]), s) {
t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + r, 
l = t.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + r);
var p = t.textContent;
if (p) {
var c = {
element: t,
language: r,
grammar: s,
code: p
};
if (o.hooks.run("before-highlight", c), n && self.Worker) {
var d = new Worker(o.filename);
d.onmessage = function(e) {
c.highlightedCode = i.stringify(JSON.parse(e.data), r), o.hooks.run("before-insert", c), 
c.element.innerHTML = c.highlightedCode, a && a.call(c.element), o.hooks.run("after-highlight", c);
}, d.postMessage(JSON.stringify({
language: c.language,
code: c.code
}));
} else c.highlightedCode = o.highlight(c.code, c.grammar, c.language), o.hooks.run("before-insert", c), 
c.element.innerHTML = c.highlightedCode, a && a.call(t), o.hooks.run("after-highlight", c);
}
}
},
highlight: function(e, t, n) {
var a = o.tokenize(e, t);
return i.stringify(o.util.encode(a), n);
},
tokenize: function(e, t) {
var i = o.Token, n = [ e ], a = t.rest;
if (a) {
for (var r in a) t[r] = a[r];
delete t.rest;
}
e: for (var r in t) if (t.hasOwnProperty(r) && t[r]) {
var s = t[r];
s = "Array" === o.util.type(s) ? s : [ s ];
for (var l = 0; l < s.length; ++l) {
var p = s[l], c = p.inside, d = !!p.lookbehind, _ = 0, u = p.alias;
p = p.pattern || p;
for (var b = 0; b < n.length; b++) {
var f = n[b];
if (n.length > e.length) break e;
if (!(f instanceof i)) {
p.lastIndex = 0;
var g = p.exec(f);
if (g) {
d && (_ = g[1].length);
var m = g.index - 1 + _, g = g[0].slice(_), h = g.length, x = m + h, w = f.slice(0, m + 1), k = f.slice(x + 1), y = [ b, 1 ];
w && y.push(w);
var v = new i(r, c ? o.tokenize(g, c) : g, u);
y.push(v), k && y.push(k), Array.prototype.splice.apply(n, y);
}
}
}
}
}
return n;
},
hooks: {
all: {},
add: function(e, t) {
var i = o.hooks.all;
i[e] = i[e] || [], i[e].push(t);
},
run: function(e, t) {
var i = o.hooks.all[e];
if (i && i.length) for (var n, a = 0; n = i[a++]; ) n(t);
}
}
}, i = o.Token = function(e, t, o) {
this.type = e, this.content = t, this.alias = o;
};
if (i.stringify = function(e, n, a) {
if ("string" == typeof e) return e;
if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function(t) {
return i.stringify(t, n, e);
}).join("");
var r = {
type: e.type,
content: i.stringify(e.content, n, a),
tag: t.tokenTag || "span",
classes: [ "token", e.type ],
attributes: {},
language: n,
parent: a
};
if ("comment" == r.type && (r.attributes.spellcheck = "true"), e.alias) {
var s = "Array" === o.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(r.classes, s);
}
o.hooks.run("wrap", r);
var l = "";
for (var p in r.attributes) l += p + '="' + (r.attributes[p] || "") + '"';
return "<" + r.tag + ' class="' + r.classes.join(" ") + '" ' + l + ">" + r.content + "</" + r.tag + ">";
}, !self.document) return self.addEventListener ? (self.addEventListener("message", function(e) {
var t = JSON.parse(e.data), i = t.language, n = t.code;
self.postMessage(JSON.stringify(o.util.encode(o.tokenize(n, o.languages[i])))), 
self.close();
}, !1), self.Prism) : self.Prism;
var n = document.getElementsByTagName("script");
return n = n[n.length - 1], n && (o.filename = n.src, document.addEventListener && !n.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", o.highlightAll)), 
self.Prism;
}();
void 0 !== e && e.exports && (e.exports = t);
},
174: function() {
Prism.languages.markup = {
comment: /<!--[\w\W]*?-->/g,
prolog: /<\?.+?\?>/,
doctype: /<!DOCTYPE.+?>/,
cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
tag: {
pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
inside: {
tag: {
pattern: /^<\/?[\w:-]+/i,
inside: {
punctuation: /^<\/?/,
namespace: /^[\w-]+?:/
}
},
"attr-value": {
pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
inside: {
punctuation: /=|>|"/g
}
},
punctuation: /\/?>/g,
"attr-name": {
pattern: /[\w:-]+/g,
inside: {
namespace: /^[\w-]+?:/
}
}
}
},
entity: /\&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
});
},
175: function() {
Prism.languages.css = {
comment: /\/\*[\w\W]*?\*\//g,
atrule: {
pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
inside: {
punctuation: /[;:]/g
}
},
url: /url\((["']?).*?\1\)/gi,
selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
property: /(\b|\B)[\w-]+(?=\s*:)/gi,
string: /("|')(\\?.)*?\1/g,
important: /\B!important\b/gi,
punctuation: /[\{\};:]/g,
"function": /[-a-z0-9]+(?=\()/gi
}, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
style: {
pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
inside: {
tag: {
pattern: /<style[\w\W]*?>|<\/style>/gi,
inside: Prism.languages.markup.tag.inside
},
rest: Prism.languages.css
},
alias: "language-css"
}
}), Prism.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /\s*style=("|').+?\1/gi,
inside: {
"attr-name": {
pattern: /^\s*style/gi,
inside: Prism.languages.markup.tag.inside
},
punctuation: /^\s*=\s*['"]|['"]\s*$/,
"attr-value": {
pattern: /.+/gi,
inside: Prism.languages.css
}
},
alias: "language-css"
}
}, Prism.languages.markup.tag));
},
176: function() {
Prism.languages.css.selector = {
pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
inside: {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
"pseudo-class": /:[-\w]+(?:\(.*\))?/g,
"class": /\.[-:\.\w]+/g,
id: /#[-:\.\w]+/g
}
}, Prism.languages.insertBefore("css", "function", {
hexcode: /#[\da-f]{3,6}/gi,
entity: /\\[\da-f]{1,8}/gi,
number: /[\d%\.]+/g
});
},
177: function() {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
lookbehind: !0
} ],
string: /("|')(\\?.)*?\1/g,
"class-name": {
pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
lookbehind: !0,
inside: {
punctuation: /(\.|\\)/
}
},
keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
"boolean": /\b(true|false)\b/g,
"function": {
pattern: /[a-z0-9_]+\(/gi,
inside: {
punctuation: /\(/
}
},
number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
ignore: /&(lt|gt|amp);/gi,
punctuation: /[{}[\];(),.:]/g
};
},
178: function() {
Prism.languages.javascript = Prism.languages.extend("clike", {
keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,
"function": /(?!\d)[a-z0-9_$]+(?=\()/gi
}), Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
lookbehind: !0
}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
script: {
pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
inside: {
tag: {
pattern: /<script[\w\W]*?>|<\/script>/gi,
inside: Prism.languages.markup.tag.inside
},
rest: Prism.languages.javascript
},
alias: "language-javascript"
}
});
},
179: function() {
!function(e) {
var t = /#(?!\{).+/g, o = {
pattern: /#\{[^}]+\}/g,
alias: "variable"
};
e.languages.coffeescript = e.languages.extend("javascript", {
comment: t,
string: [ /'(?:\\?[\s\S])*?'/g, {
pattern: /"(?:\\?[\s\S])*?"/g,
inside: {
interpolation: o
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/g,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), e.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/g,
alias: "comment"
},
"block-regex": {
pattern: /\/{3}[\s\S]*?\/{3}/,
alias: "regex",
inside: {
comment: t,
interpolation: o
}
}
}), e.languages.insertBefore("coffeescript", "string", {
"inline-javascript": {
pattern: /`(?:\\?[\s\S])*?`/g,
inside: {
delimiter: {
pattern: /^`|`$/g,
alias: "punctuation"
},
rest: e.languages.javascript
}
},
"multiline-string": [ {
pattern: /'''[\s\S]*?'''/,
alias: "string"
}, {
pattern: /"""[\s\S]*?"""/,
alias: "string",
inside: {
interpolation: o
}
} ]
}), e.languages.insertBefore("coffeescript", "keyword", {
property: /(?!\d)\w+(?=\s*:(?!:))/g
});
}(Prism);
},
180: function() {
Prism.languages.http = {
"request-line": {
pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/g,
inside: {
property: /^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/g,
"attr-name": /:\w+/g
}
},
"response-status": {
pattern: /^HTTP\/1.[01] [0-9]+.*/g,
inside: {
property: /[0-9]+[A-Z\s-]+$/gi
}
},
keyword: /^[\w-]+:(?=.+)/gm
};
var e = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var t in e) if (e[t]) {
var o = {};
o[t] = {
pattern: RegExp("(content-type:\\s*" + t + "[\\w\\W]*?)\\n\\n[\\w\\W]*", "gi"),
lookbehind: !0,
inside: {
rest: e[t]
}
}, Prism.languages.insertBefore("http", "keyword", o);
}
},
181: function() {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
lookbehind: !0
},
atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,
url: /([-a-z]+-)*url(?=\()/gi,
selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}), Prism.languages.insertBefore("scss", "property", {
variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}), Prism.languages.insertBefore("scss", "function", {
placeholder: /%[-_\w]+/i,
statement: /\B!(default|optional)\b/gi,
"boolean": /\b(true|false)\b/g,
"null": /\b(null)\b/g,
operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
});
},
182: function() {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,
lookbehind: !0
},
string: {
pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/g,
lookbehind: !0
},
variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g,
"function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/gi,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
"boolean": /\b(?:TRUE|FALSE|NULL)\b/gi,
number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,
operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi,
punctuation: /[;[\]()`,.]/g
};
},
183: function() {
Prism.languages.php = Prism.languages.extend("clike", {
keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,
constant: /\b[A-Z0-9_]{2,}\b/g,
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,
lookbehind: !0
}
}), Prism.languages.insertBefore("php", "keyword", {
delimiter: /(\?>|<\?php|<\?)/gi,
variable: /(\$\w+)\b/gi,
"package": {
pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
lookbehind: !0,
inside: {
punctuation: /\\/
}
}
}), Prism.languages.insertBefore("php", "operator", {
property: {
pattern: /(->)[\w]+/g,
lookbehind: !0
}
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
"php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(t) {
return e.tokenStack.push(t), "{{{PHP" + e.tokenStack.length + "}}}";
}));
}), Prism.hooks.add("before-insert", function(e) {
"php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function(e) {
if ("php" === e.language) {
for (var t, o = 0; t = e.tokenStack[o]; o++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (o + 1) + "}}}", Prism.highlight(t, e.grammar, "php"));
e.element.innerHTML = e.highlightedCode;
}
}), Prism.hooks.add("wrap", function(e) {
"php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
markup: {
pattern: /<[^?]\/?(.*?)>/g,
inside: Prism.languages.markup
},
php: /\{\{\{PHP[0-9]+\}\}\}/g
}));
},
184: function() {
Prism.languages.insertBefore("php", "variable", {
"this": /\$this/g,
global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,
scope: {
pattern: /\b[\w\\]+::/g,
inside: {
keyword: /(static|self|parent)/,
punctuation: /(::|\\)/
}
}
});
},
185: function() {
Prism.languages.python = {
comment: {
pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
lookbehind: !0
},
string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/g,
keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
"boolean": /\b(True|False)\b/g,
number: /\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/gi,
operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
ignore: /&(lt|gt|amp);/gi,
punctuation: /[{}[\];(),.:]/g
};
},
186: function() {
Prism.languages.ruby = Prism.languages.extend("clike", {
comment: /#[^\r\n]*(\r?\n|$)/g,
keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
}), Prism.languages.insertBefore("ruby", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
lookbehind: !0
},
variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});
},
187: function() {
Prism.languages.java = Prism.languages.extend("clike", {
keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/gi,
operator: {
pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/gm,
lookbehind: !0
}
});
},
194: function(e) {
"use strict";
function t(e) {
var t, o = 1 + e.innerHTML.split("\n").length, i = Array(o);
i = i.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", 
t.innerHTML = i, e.hasAttribute("data-start") && (e.style.counterReset = "linenumber " + +e.dataset.start - 1), 
e.appendChild(t);
}
e.exports = t;
},
195: function(e) {
"use strict";
function t(e) {
var t = e.getBoundingClientRect(), o = 0;
if (t.top < 0) o = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
o = window.innerHeight - top;
}
return o > 10;
}
e.exports = t;
}
});
//# sourceMappingURL=tutorial.e949916dcdef497773db.js.map
var quiz = webpackJsonp_name_([ 13 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = document.querySelector("[data-quiz-question-form]");
t && a(t);
var e = document.querySelector("[data-quiz-result-save-form]");
e && i(e), u.init();
}
function i(t) {
function e() {
var e = t.querySelector('[type="submit"]'), i = new o({
elem: e,
size: "small",
"class": "submit-button__spinner",
elemClass: "submit-button_progress"
});
i.start(), n.e(2, function() {
i.stop();
var t = n(84);
new t({
callback: r
});
});
}
function r() {
function e() {
i.stop(), r.disabled = !1;
}
var n = s({
method: "POST",
url: t.action
}), r = t.querySelector('[type="submit"]'), i = new o({
elem: r,
size: "small",
elemClass: "button_loading"
});
i.start(), r.disabled = !0, n.addEventListener("loadend", e), n.addEventListener("success", function() {
new c.Success("Результат сохранён в профиле! <a href='/profile/" + window.currentUser.profileName + "/quiz'>Перейти в профиль</a>.", "slow");
});
}
t.onsubmit = function(t) {
return t.preventDefault(), window.currentUser ? void r() : void e();
};
}
function a(t) {
function e() {
for (var e = t.elements.type.value, n = t.elements.answer, r = [], i = 0; i < n.length; i++) n[i].checked && r.push(+n[i].value);
return "single" == e && (r = r[0]), r;
}
t.onchange = function() {
var n = e();
switch (t.elements.type.value) {
case "single":
t.querySelector('[type="submit"]').disabled = void 0 === n;
break;

case "multi":
t.querySelector('[type="submit"]').disabled = n.length ? !1 : !0;
break;

default:
throw Error("unknown type");
}
}, t.onsubmit = function(n) {
function r() {
l.stop(), c.disabled = !1;
}
n.preventDefault();
var i = e(), a = s({
method: "POST",
url: t.action,
body: {
answer: i
}
}), c = t.querySelector('[type="submit"]'), l = new o({
elem: c,
size: "small",
elemClass: "button_loading"
});
l.start(), c.disabled = !0, a.addEventListener("fail", r), a.addEventListener("success", function(e) {
e.result.reload ? window.location.reload() : e.result.html ? (r(), document.querySelector(".quiz-timeline .quiz-timeline__number_current").classList.remove("quiz-timeline__number_current"), 
document.querySelectorAll(".quiz-timeline span")[e.result.questionNumber].classList.add("quiz-timeline__number_current"), 
document.querySelector(".quiz-tablet-timeline__num").innerHTML = "&nbsp;" + (e.result.questionNumber + 1) + "&nbsp;", 
t.innerHTML = e.result.html, u.highlight(t)) : r();
});
};
}
n(131);
var o = n(53), s = n(28), u = n(52), c = n(23);
r();
},
28: function(t, e, n) {
"use strict";
function r(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var r = e("fail", n);
r.reason = t, i.dispatchEvent(r);
}
function r(t, n) {
var r = e("success", n);
r.result = t, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), o = t.method || "GET", s = t.body, u = t.url;
i.open(o, u, t.sync ? !1 : !0), i.method = o;
var c = a();
c && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), t.noDocumentEvents || (i.addEventListener("loadstart", function(t) {
i.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), i.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var l = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void n("Не получен ответ от сервера.", e);
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", e);
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || t.json) try {
a = JSON.parse(a);
} catch (e) {
return void n("Некорректный формат ответа от сервера.", e);
}
r(a, e);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(23), a = n(77);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
52: function(t, e, n) {
"use strict";
function r(t) {
for (var e = t.querySelectorAll(".code-example:not([data-prism-done])"), n = 0; n < e.length; n++) {
var r = e[n];
new o(r), r.setAttribute("data-prism-done", "1");
}
}
function i(t) {
for (var e = t.querySelectorAll("div.code-tabs:not([data-prism-done])"), n = 0; n < e.length; n++) new s(e[n]), 
e[n].setAttribute("data-prism-done", "1");
}
function a(t) {
r(t), i(t);
}
n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), 
n(99), n(100), n(101), Prism.tokenTag = "code";
var o = n(79), s = n(80);
e.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
a(document);
});
}, e.highlight = a;
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
79: function(t, e, n) {
"use strict";
function r(t) {
function e() {
var t = b.contentWindow;
return "function" != typeof t.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void t.postMessage(p, "https://ru.lookatcode.com/showjs");
}
function n() {
var e;
if ($ && t.hasAttribute("data-refresh") && ($.remove(), $ = null), $ || ($ = t.querySelector(".code-result")), 
$) e = $.querySelector("iframe"); else {
if ($ = document.createElement("div"), $.className = "code-result code-example__result", 
e = document.createElement("iframe"), e.name = "frame-" + Math.random(), e.className = "code-result__iframe", 
"0" === t.getAttribute("data-demo-height")) e.style.display = "none"; else if (t.hasAttribute("data-demo-height")) {
var n = +t.getAttribute("data-demo-height");
e.style.height = n + "px";
}
$.appendChild(e), t.appendChild($);
}
if (g) {
var r = e.contentDocument || e.contentWindow.document;
r.open(), r.write(l(p)), r.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(r.querySelectorAll("script"), function(t) {
t.remove();
});
}, 2e3), t.hasAttribute("data-demo-height") || o.iframe(e), w && t.hasAttribute("data-autorun") || s($) || $.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = e.name;
var a = document.createElement("textarea");
a.name = "code", a.value = l(p), i.appendChild(a), e.parentNode.insertBefore(i, e.nextSibling), 
i.submit(), i.remove(), w && t.hasAttribute("data-autorun") || (e.onload = function() {
t.hasAttribute("data-demo-height") || o.iframe(e), s($) || $.scrollIntoView(!1);
});
}
}
function r() {
if (g) try {
window.eval.call(window, p);
} catch (n) {
alert("Ошибка: " + n.message);
} else t.hasAttribute("data-refresh") && b && (b.remove(), b = null), b ? e() : (b = document.createElement("iframe"), 
b.className = "js-frame", b.src = "https://ru.lookatcode.com/showjs", b.style.width = 0, 
b.style.height = 0, b.style.border = "none", b.onload = function() {
e();
}, document.body.appendChild(b));
}
function c() {
var t;
if (v) t = l(p); else {
var e = p.replace(/^/gim, "    ");
t = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + e + "\n  </script>\n</body>\n\n</html>";
}
var n = document.createElement("form");
n.action = "http://plnkr.co/edit/?p=preview", n.method = "POST", n.target = "_blank", 
document.body.appendChild(n);
var r = document.createElement("textarea");
r.name = "files[index.html]", r.value = t, n.appendChild(r);
var i = document.createElement("input");
i.name = "description", i.value = "Fork from " + window.location, n.appendChild(i), 
n.submit(), n.remove();
}
function l() {
var t = p.toLowerCase(), e = t.match("<body>"), n = t.match("</body>"), r = t.match("<html>"), i = t.match("</html>"), a = t.match(/^\s*<!doctype/);
if (a) return p;
var o = p;
return r || (o = "<html>\n" + o), i || (o += "\n</html>"), e || (o = o.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
n || (o = o.replace("</html>", "\n</body>\n</html>")), o = "<!DOCTYPE HTML>\n" + o;
}
function f() {
m ? r() : n(), w = !1;
}
var h = t.querySelector("pre"), d = h.querySelector("code"), p = d.textContent;
Prism.highlightElement(d), u(h), i(h, t.getAttribute("data-highlight-block")), a(h, t.getAttribute("data-highlight-inline"));
var m = h.classList.contains("language-javascript"), v = h.classList.contains("language-markup"), g = +t.getAttribute("data-trusted"), y = +t.getAttribute("data-no-strict");
!y && m && (p = "'use strict';\n" + p);
var b, $, w = !0;
if (m || v) {
var E = t.querySelector('[data-action="run"]');
E && (E.onclick = function() {
return this.blur(), f(), !1;
});
var S = t.querySelector('[data-action="edit"]');
S && (S.onclick = function() {
return this.blur(), c(), !1;
}), t.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == t.getAttribute("data-autorun") ? t.querySelector("iframe").remove() : setTimeout(f, 100));
}
}
function i(t, e) {
if (e) for (var n, r = e.replace(/\s+/g, "").split(","), i = 0; n = r[i++]; ) {
n = n.split("-");
var a = +n[0], o = +n[1] || a, s = '<code class="block-highlight" data-start="' + a + '" data-end="' + o + '">' + Array(a + 1).join("\n") + '<code class="mask">' + Array(o - a + 2).join("\n") + "</code></code>";
t.insertAdjacentHTML("afterBegin", s);
}
}
function a(t, e) {
var n = t.querySelector('code[class*="language-"]');
e = e ? e.split(",") : [];
for (var r = 0; r < e.length; r++) {
var i = e[r].split(":"), a = +i[0], o = i[1].split("-"), s = +o[0], u = +o[1], c = '<code class="inline-highlight">' + Array(a + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(u - s + 1).join(" ") + "</code></code>";
n.insertAdjacentHTML("afterBegin", c);
}
}
var o = n(18), s = n(112), u = n(109);
t.exports = r;
},
80: function(t, e, n) {
"use strict";
function r(t) {
window.ebookType || (this.elem = t, this.translateX = 0, this.switchesElem = t.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = t.querySelector("[data-code-tabs-left]"), 
this.arrowRight = t.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = function(t) {
t.preventDefault(), this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.arrowRight.onclick = function(t) {
t.preventDefault(), this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.delegate(".code-tabs__switch", "click", this.onSwitchClick));
}
var i = n(27), a = n(109);
r.prototype.onSwitchClick = function(t) {
t.preventDefault();
for (var e, n = t.delegateTarget.parentNode.children, r = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < n.length; i++) {
var a = n[i], o = r[i];
a == t.delegateTarget ? (e = i, o.classList.add("code-tabs__section_current"), a.classList.add("code-tabs__switch_current")) : (o.classList.remove("code-tabs__section_current"), 
a.classList.remove("code-tabs__switch_current"));
}
0 === e ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(r[e]));
}, r.prototype.highlightTab = function(t) {
if (!t.highlighted) {
var e = t.querySelector("pre"), n = e.querySelector("code");
Prism.highlightElement(n), a(e), t.highlighted = !0;
}
}, r.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, i.delegateMixin(r.prototype), t.exports = r;
},
87: function(t) {
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var e = function() {
var t = /\blang(?:uage)?-(?!\*)(\w+)\b/i, e = self.Prism = {
util: {
encode: function(t) {
return t instanceof n ? new n(t.type, e.util.encode(t.content), t.alias) : "Array" === e.util.type(t) ? t.map(e.util.encode) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(t) {
return Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];
},
clone: function(t) {
var n = e.util.type(t);
switch (n) {
case "Object":
var r = {};
for (var i in t) t.hasOwnProperty(i) && (r[i] = e.util.clone(t[i]));
return r;

case "Array":
return t.map(function(t) {
return e.util.clone(t);
});
}
return t;
}
},
languages: {
extend: function(t, n) {
var r = e.util.clone(e.languages[t]);
for (var i in n) r[i] = n[i];
return r;
},
insertBefore: function(t, n, r, i) {
i = i || e.languages;
var a = i[t];
if (2 == arguments.length) {
r = arguments[1];
for (var o in r) r.hasOwnProperty(o) && (a[o] = r[o]);
return a;
}
var s = {};
for (var u in a) if (a.hasOwnProperty(u)) {
if (u == n) for (var o in r) r.hasOwnProperty(o) && (s[o] = r[o]);
s[u] = a[u];
}
return e.languages.DFS(e.languages, function(e, n) {
n === i[t] && e != t && (this[e] = s);
}), i[t] = s;
},
DFS: function(t, n, r) {
for (var i in t) t.hasOwnProperty(i) && (n.call(t, i, t[i], r || i), "Object" === e.util.type(t[i]) ? e.languages.DFS(t[i], n) : "Array" === e.util.type(t[i]) && e.languages.DFS(t[i], n, i));
}
},
highlightAll: function(t, n) {
for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), a = 0; r = i[a++]; ) e.highlightElement(r, t === !0, n);
},
highlightElement: function(r, i, a) {
for (var o, s, u = r; u && !t.test(u.className); ) u = u.parentNode;
if (u && (o = (u.className.match(t) || [ , "" ])[1], s = e.languages[o]), r.className = r.className.replace(t, "").replace(/\s+/g, " ") + " language-" + o, 
u = r.parentNode, /pre/i.test(u.nodeName) && (u.className = u.className.replace(t, "").replace(/\s+/g, " ") + " language-" + o), 
s) {
var c = r.textContent;
if (c) {
c = c.replace(/^(?:\r?\n|\r)/, "");
var l = {
element: r,
language: o,
grammar: s,
code: c
};
if (e.hooks.run("before-highlight", l), i && self.Worker) {
var f = new Worker(e.filename);
f.onmessage = function(t) {
l.highlightedCode = n.stringify(JSON.parse(t.data), o), e.hooks.run("before-insert", l), 
l.element.innerHTML = l.highlightedCode, a && a.call(l.element), e.hooks.run("after-highlight", l);
}, f.postMessage(JSON.stringify({
language: l.language,
code: l.code
}));
} else l.highlightedCode = e.highlight(l.code, l.grammar, l.language), e.hooks.run("before-insert", l), 
l.element.innerHTML = l.highlightedCode, a && a.call(r), e.hooks.run("after-highlight", l);
}
}
},
highlight: function(t, r, i) {
var a = e.tokenize(t, r);
return n.stringify(e.util.encode(a), i);
},
tokenize: function(t, n) {
var r = e.Token, i = [ t ], a = n.rest;
if (a) {
for (var o in a) n[o] = a[o];
delete n.rest;
}
t: for (var o in n) if (n.hasOwnProperty(o) && n[o]) {
var s = n[o];
s = "Array" === e.util.type(s) ? s : [ s ];
for (var u = 0; u < s.length; ++u) {
var c = s[u], l = c.inside, f = !!c.lookbehind, h = 0, d = c.alias;
c = c.pattern || c;
for (var p = 0; p < i.length; p++) {
var m = i[p];
if (i.length > t.length) break t;
if (!(m instanceof r)) {
c.lastIndex = 0;
var v = c.exec(m);
if (v) {
f && (h = v[1].length);
var g = v.index - 1 + h, v = v[0].slice(h), y = v.length, b = g + y, $ = m.slice(0, g + 1), w = m.slice(b + 1), E = [ p, 1 ];
$ && E.push($);
var S = new r(o, l ? e.tokenize(v, l) : v, d);
E.push(S), w && E.push(w), Array.prototype.splice.apply(i, E);
}
}
}
}
}
return i;
},
hooks: {
all: {},
add: function(t, n) {
var r = e.hooks.all;
r[t] = r[t] || [], r[t].push(n);
},
run: function(t, n) {
var r = e.hooks.all[t];
if (r && r.length) for (var i, a = 0; i = r[a++]; ) i(n);
}
}
}, n = e.Token = function(t, e, n) {
this.type = t, this.content = e, this.alias = n;
};
if (n.stringify = function(t, r, i) {
if ("string" == typeof t) return t;
if ("Array" === e.util.type(t)) return t.map(function(e) {
return n.stringify(e, r, t);
}).join("");
var a = {
type: t.type,
content: n.stringify(t.content, r, i),
tag: "span",
classes: [ "token", t.type ],
attributes: {},
language: r,
parent: i
};
if ("comment" == a.type && (a.attributes.spellcheck = "true"), t.alias) {
var o = "Array" === e.util.type(t.alias) ? t.alias : [ t.alias ];
Array.prototype.push.apply(a.classes, o);
}
e.hooks.run("wrap", a);
var s = "";
for (var u in a.attributes) s += u + '="' + (a.attributes[u] || "") + '"';
return "<" + a.tag + ' class="' + a.classes.join(" ") + '" ' + s + ">" + a.content + "</" + a.tag + ">";
}, !self.document) return self.addEventListener ? (self.addEventListener("message", function(t) {
var n = JSON.parse(t.data), r = n.language, i = n.code;
self.postMessage(JSON.stringify(e.util.encode(e.tokenize(i, e.languages[r])))), 
self.close();
}, !1), self.Prism) : self.Prism;
var r = document.getElementsByTagName("script");
return r = r[r.length - 1], r && (e.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", e.highlightAll)), 
self.Prism;
}();
void 0 !== t && t.exports && (t.exports = e);
},
88: function() {
Prism.languages.markup = {
comment: /<!--[\w\W]*?-->/,
prolog: /<\?.+?\?>/,
doctype: /<!DOCTYPE.+?>/,
cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
tag: {
pattern: /<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/i,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
inside: {
punctuation: /=|>|"/
}
},
punctuation: /\/?>/,
"attr-name": {
pattern: /[^\s>\/]+/,
inside: {
namespace: /^[^\s>\/:]+:/
}
}
}
},
entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(t) {
"entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
});
},
89: function() {
Prism.languages.css = {
comment: /\/\*[\w\W]*?\*\//,
atrule: {
pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
inside: {
punctuation: /[;:]/
}
},
url: /url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/i,
selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/,
string: /("|')(\\\n|\\?.)*?\1/,
property: /(\b|\B)[\w-]+(?=\s*:)/i,
important: /\B!important\b/i,
punctuation: /[\{\};:]/,
"function": /[-a-z0-9]+(?=\()/i
}, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
style: {
pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
inside: {
tag: {
pattern: /<style[\w\W]*?>|<\/style>/i,
inside: Prism.languages.markup.tag.inside
},
rest: Prism.languages.css
},
alias: "language-css"
}
}), Prism.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /\s*style=("|').*?\1/i,
inside: {
"attr-name": {
pattern: /^\s*style/i,
inside: Prism.languages.markup.tag.inside
},
punctuation: /^\s*=\s*['"]|['"]\s*$/,
"attr-value": {
pattern: /.+/i,
inside: Prism.languages.css
}
},
alias: "language-css"
}
}, Prism.languages.markup.tag));
},
90: function() {
Prism.languages.css.selector = {
pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
inside: {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
"pseudo-class": /:[-\w]+(?:\(.*\))?/,
"class": /\.[-:\.\w]+/,
id: /#[-:\.\w]+/
}
}, Prism.languages.insertBefore("css", "function", {
hexcode: /#[\da-f]{3,6}/i,
entity: /\\[\da-f]{1,8}/i,
number: /[\d%\.]+/
});
},
91: function() {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: !0
} ],
string: /("|')(\\[\s\S]|(?!\1)[^\\\r\n])*\1/,
"class-name": {
pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /(\.|\\)/
}
},
keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
"boolean": /\b(true|false)\b/,
"function": {
pattern: /[a-z0-9_]+\(/i,
inside: {
punctuation: /\(/
}
},
number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
ignore: /&(lt|gt|amp);/i,
punctuation: /[{}[\];(),.:]/
};
},
92: function() {
Prism.languages.javascript = Prism.languages.extend("clike", {
keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
"function": /(?!\d)[a-z0-9_$]+(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
}
}), Prism.languages.insertBefore("javascript", "class-name", {
"template-string": {
pattern: /`(?:\\`|\\?[^`])*`/,
inside: {
interpolation: {
pattern: /\$\{[^}]+\}/,
inside: {
"interpolation-punctuation": {
pattern: /^\$\{|\}$/,
alias: "punctuation"
},
rest: Prism.languages.javascript
}
},
string: /[\s\S]+/
}
}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
script: {
pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
inside: {
tag: {
pattern: /<script[\w\W]*?>|<\/script>/i,
inside: Prism.languages.markup.tag.inside
},
rest: Prism.languages.javascript
},
alias: "language-javascript"
}
});
},
93: function() {
!function(t) {
var e = /#(?!\{).+/, n = {
pattern: /#\{[^}]+\}/,
alias: "variable"
};
t.languages.coffeescript = t.languages.extend("javascript", {
comment: e,
string: [ /'(?:\\?[\s\S])*?'/, {
pattern: /"(?:\\?[\s\S])*?"/,
inside: {
interpolation: n
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), t.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/,
alias: "comment"
},
"block-regex": {
pattern: /\/{3}[\s\S]*?\/{3}/,
alias: "regex",
inside: {
comment: e,
interpolation: n
}
}
}), t.languages.insertBefore("coffeescript", "string", {
"inline-javascript": {
pattern: /`(?:\\?[\s\S])*?`/,
inside: {
delimiter: {
pattern: /^`|`$/,
alias: "punctuation"
},
rest: t.languages.javascript
}
},
"multiline-string": [ {
pattern: /'''[\s\S]*?'''/,
alias: "string"
}, {
pattern: /"""[\s\S]*?"""/,
alias: "string",
inside: {
interpolation: n
}
} ]
}), t.languages.insertBefore("coffeescript", "keyword", {
property: /(?!\d)\w+(?=\s*:(?!:))/
});
}(Prism);
},
94: function() {
Prism.languages.http = {
"request-line": {
pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/,
inside: {
property: /^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] [0-9]+.*/,
inside: {
property: /[0-9]+[A-Z\s-]+$/i
}
},
keyword: /^[\w-]+:(?=.+)/m
};
var t = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var e in t) if (t[e]) {
var n = {};
n[e] = {
pattern: RegExp("(content-type:\\s*" + e + "[\\w\\W]*?)\\n\\n[\\w\\W]*", "i"),
lookbehind: !0,
inside: {
rest: t[e]
}
}, Prism.languages.insertBefore("http", "keyword", n);
}
},
95: function() {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/,
lookbehind: !0
},
atrule: /@[\w-]+(?=\s+(\(|\{|;))/i,
url: /([-a-z]+-)*url(?=\()/i,
selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
}), Prism.languages.insertBefore("scss", "property", {
variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
}), Prism.languages.insertBefore("scss", "function", {
placeholder: /%[-_\w]+/i,
statement: /\B!(default|optional)\b/i,
"boolean": /\b(true|false)\b/,
"null": /\b(null)\b/,
operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/
});
},
96: function() {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/,
lookbehind: !0
},
string: {
pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/,
lookbehind: !0
},
variable: /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/,
"function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/i,
"boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b-?(0x)?\d*\.?[\da-f]+\b/,
operator: /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//i,
punctuation: /[;[\]()`,.]/
};
},
97: function() {
Prism.languages.php = Prism.languages.extend("clike", {
keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
constant: /\b[A-Z0-9_]{2,}\b/,
comment: {
pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/).*?(\r?\n|$))/,
lookbehind: !0
}
}), Prism.languages.insertBefore("php", "class-name", {
"shell-comment": {
pattern: /(^|[^\\])#.*?(\r?\n|$)/,
lookbehind: !0,
alias: "comment"
}
}), Prism.languages.insertBefore("php", "keyword", {
delimiter: /(\?>|<\?php|<\?)/i,
variable: /(\$\w+)\b/i,
"package": {
pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
lookbehind: !0,
inside: {
punctuation: /\\/
}
}
}), Prism.languages.insertBefore("php", "operator", {
property: {
pattern: /(->)[\w]+/,
lookbehind: !0
}
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(t) {
"php" === t.language && (t.tokenStack = [], t.backupCode = t.code, t.code = t.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(e) {
return t.tokenStack.push(e), "{{{PHP" + t.tokenStack.length + "}}}";
}));
}), Prism.hooks.add("before-insert", function(t) {
"php" === t.language && (t.code = t.backupCode, delete t.backupCode);
}), Prism.hooks.add("after-highlight", function(t) {
if ("php" === t.language) {
for (var e, n = 0; e = t.tokenStack[n]; n++) t.highlightedCode = t.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(e, t.grammar, "php"));
t.element.innerHTML = t.highlightedCode;
}
}), Prism.hooks.add("wrap", function(t) {
"php" === t.language && "markup" === t.type && (t.content = t.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
markup: {
pattern: /<[^?]\/?(.*?)>/,
inside: Prism.languages.markup
},
php: /\{\{\{PHP[0-9]+\}\}\}/
}));
},
98: function() {
Prism.languages.insertBefore("php", "variable", {
"this": /\$this/,
global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
scope: {
pattern: /\b[\w\\]+::/,
inside: {
keyword: /(static|self|parent)/,
punctuation: /(::|\\)/
}
}
});
},
99: function() {
Prism.languages.python = {
comment: {
pattern: /(^|[^\\])#.*?(\r?\n|$)/,
lookbehind: !0
},
string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,
"function": {
pattern: /((^|\s)def[ \t]+)([a-zA-Z_][a-zA-Z0-9_]*(?=\())/g,
lookbehind: !0
},
keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
"boolean": /\b(True|False)\b/,
number: /\b-?(0[bo])?(?:(\d|0x[a-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
operator: /[-+]|<=?|>=?|!|={1,2}|&{1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/,
punctuation: /[{}[\];(),.:]/
};
},
100: function() {
Prism.languages.ruby = Prism.languages.extend("clike", {
comment: /#[^\r\n]*(\r?\n|$)/,
keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/
}), Prism.languages.insertBefore("ruby", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
},
variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/,
symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/
});
},
101: function() {
Prism.languages.java = Prism.languages.extend("clike", {
keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/i,
operator: {
pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/m,
lookbehind: !0
}
});
},
109: function(t) {
"use strict";
function e(t) {
var e, n = 1 + t.innerHTML.split("\n").length, r = Array(n);
r = r.join("<span></span>"), e = document.createElement("span"), e.className = "line-numbers-rows", 
e.innerHTML = r, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + +t.dataset.start - 1), 
t.appendChild(e);
}
t.exports = e;
},
112: function(t) {
"use strict";
function e(t) {
var e = t.getBoundingClientRect(), n = 0;
if (e.top < 0) n = e.bottom; else {
if (!(e.bottom > window.innerHeight)) return !0;
n = window.innerHeight - top;
}
return n > 10;
}
t.exports = e;
},
131: function() {}
});
//# sourceMappingURL=quiz.84eea875b4cb0d7969f3.js.map
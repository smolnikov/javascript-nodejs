var tutorial = webpackJsonp_name_([ 5 ], {
0: function(module, exports, __webpack_require__) {
"use strict";
function init() {
initTaskButtons(), initFolderList(), initSidebarHighlight(), initNewsletterForm(), 
delegate(document, '[data-action="tutorial-map"]', "click", function(e) {
1 == e.which && (e.preventDefault(), showTutorialMapModal());
}), prism.init(), window.ebookType && __webpack_require__.e(6, function() {
__webpack_require__(244).init();
});
var e = document.querySelector(".tutorial-map");
e ? new TutorialMap(e) : /[&?]map\b/.test(location.href) && showTutorialMapModal();
}
function initNewsletterForm() {
var e = document.querySelector("[data-newsletter-subscribe-form]");
e && (e.onsubmit = function(t) {
t.preventDefault(), newsletter.submitSubscribeForm(e);
});
}
function showTutorialMapModal() {
/[&?]map\b/.test(location.href) || window.history.replaceState(null, null, ~location.href.indexOf("?") ? location.href + "&map" : location.href + "?map");
var e = new TutorialMapModal();
e.elem.addEventListener("tutorial-map-remove", function() {
window.history.replaceState(null, null, location.href.replace(/[&?]map\b/, ""));
});
}
function initSidebarHighlight() {
function e() {
var e = document.getElementsByClassName("sidebar__navigation-link_active");
e[0] && e[0].classList.remove("sidebar__navigation-link_active");
for (var t = document.getElementsByTagName("h2"), n = 0; n < t.length; n++) {
var a = t[n];
if (a.getBoundingClientRect().top > 1) break;
}
if (n--, n >= 0) {
var i = t[n].firstElementChild && t[n].firstElementChild.getAttribute("href"), r = document.querySelector('.sidebar__navigation-link a[href="' + i + '"]');
i && r && r.classList.add("sidebar__navigation-link_active");
}
}
document.addEventListener("DOMContentLoaded", function() {
e(), window.addEventListener("scroll", e);
});
}
function initTaskButtons() {
delegate(document, ".task__solution", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), delegate(document, ".task__answer-close", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), delegate(document, ".task__step-show", "click", function(e) {
e.target.closest(".task__step").classList.toggle("task__step_open");
});
}
function initFolderList() {
delegate(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function(e) {
var t = e.delegateTarget, n = t.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
n && n != t.parentNode && n.classList.remove("lessons-list__lesson_open"), t.parentNode.classList.toggle("lessons-list__lesson_open"), 
e.preventDefault();
});
}
var delegate = __webpack_require__(148), prism = __webpack_require__(237), xhr = __webpack_require__(155), TutorialMapModal = __webpack_require__(242), TutorialMap = __webpack_require__(243), newsletter = __webpack_require__(164);
window.runDemo = function(button) {
for (var demoElem, parent = button; (parent = parent.parentElement) && !(demoElem = parent.querySelector("[data-demo]")); ) ;
demoElem ? eval(demoElem.textContent) : alert("Ошибка, нет элемента с демо");
}, init();
},
87: function(e, t) {
var n = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}, a = function() {
var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, t = n.Prism = {
util: {
encode: function(e) {
return e instanceof a ? new a(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
},
clone: function(e) {
var n = t.util.type(e);
switch (n) {
case "Object":
var a = {};
for (var i in e) e.hasOwnProperty(i) && (a[i] = t.util.clone(e[i]));
return a;

case "Array":
return e.map && e.map(function(e) {
return t.util.clone(e);
});
}
return e;
}
},
languages: {
extend: function(e, n) {
var a = t.util.clone(t.languages[e]);
for (var i in n) a[i] = n[i];
return a;
},
insertBefore: function(e, n, a, i) {
i = i || t.languages;
var r = i[e];
if (2 == arguments.length) {
a = arguments[1];
for (var s in a) a.hasOwnProperty(s) && (r[s] = a[s]);
return r;
}
var o = {};
for (var l in r) if (r.hasOwnProperty(l)) {
if (l == n) for (var s in a) a.hasOwnProperty(s) && (o[s] = a[s]);
o[l] = r[l];
}
return t.languages.DFS(t.languages, function(t, n) {
n === i[e] && t != e && (this[t] = o);
}), i[e] = o;
},
DFS: function(e, n, a) {
for (var i in e) e.hasOwnProperty(i) && (n.call(e, i, e[i], a || i), "Object" === t.util.type(e[i]) ? t.languages.DFS(e[i], n) : "Array" === t.util.type(e[i]) && t.languages.DFS(e[i], n, i));
}
},
plugins: {},
highlightAll: function(e, n) {
for (var a, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), r = 0; a = i[r++]; ) t.highlightElement(a, e === !0, n);
},
highlightElement: function(a, i, r) {
for (var s, o, l = a; l && !e.test(l.className); ) l = l.parentNode;
l && (s = (l.className.match(e) || [ , "" ])[1], o = t.languages[s]), a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s, 
l = a.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s);
var c = a.textContent, u = {
element: a,
language: s,
grammar: o,
code: c
};
if (!c || !o) return void t.hooks.run("complete", u);
if (t.hooks.run("before-highlight", u), i && n.Worker) {
var d = new Worker(t.filename);
d.onmessage = function(e) {
u.highlightedCode = e.data, t.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, 
r && r.call(u.element), t.hooks.run("after-highlight", u), t.hooks.run("complete", u);
}, d.postMessage(JSON.stringify({
language: u.language,
code: u.code,
immediateClose: !0
}));
} else u.highlightedCode = t.highlight(u.code, u.grammar, u.language), t.hooks.run("before-insert", u), 
u.element.innerHTML = u.highlightedCode, r && r.call(a), t.hooks.run("after-highlight", u), 
t.hooks.run("complete", u);
},
highlight: function(e, n, i) {
var r = t.tokenize(e, n);
return a.stringify(t.util.encode(r), i);
},
tokenize: function(e, n, a) {
var i = t.Token, r = [ e ], s = n.rest;
if (s) {
for (var o in s) n[o] = s[o];
delete n.rest;
}
e: for (var o in n) if (n.hasOwnProperty(o) && n[o]) {
var l = n[o];
l = "Array" === t.util.type(l) ? l : [ l ];
for (var c = 0; c < l.length; ++c) {
var u = l[c], d = u.inside, p = !!u.lookbehind, h = 0, m = u.alias;
u = u.pattern || u;
for (var g = 0; g < r.length; g++) {
var f = r[g];
if (r.length > e.length) break e;
if (!(f instanceof i)) {
u.lastIndex = 0;
var E = u.exec(f);
if (E) {
p && (h = E[1].length);
var b = E.index - 1 + h, E = E[0].slice(h), T = E.length, v = b + T, w = f.slice(0, b + 1), y = f.slice(v + 1), S = [ g, 1 ];
w && S.push(w);
var A = new i(o, d ? t.tokenize(E, d) : E, m);
S.push(A), y && S.push(y), Array.prototype.splice.apply(r, S);
}
}
}
}
}
return r;
},
hooks: {
all: {},
add: function(e, n) {
var a = t.hooks.all;
a[e] = a[e] || [], a[e].push(n);
},
run: function(e, n) {
var a = t.hooks.all[e];
if (a && a.length) for (var i, r = 0; i = a[r++]; ) i(n);
}
}
}, a = t.Token = function(e, t, n) {
this.type = e, this.content = t, this.alias = n;
};
if (a.stringify = function(e, n, i) {
if ("string" == typeof e) return e;
if ("Array" === t.util.type(e)) return e.map(function(t) {
return a.stringify(t, n, e);
}).join("");
var r = {
type: e.type,
content: a.stringify(e.content, n, i),
tag: "span",
classes: [ "token", e.type ],
attributes: {},
language: n,
parent: i
};
if ("comment" == r.type && (r.attributes.spellcheck = "true"), e.alias) {
var s = "Array" === t.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(r.classes, s);
}
t.hooks.run("wrap", r);
var o = "";
for (var l in r.attributes) o += (o ? " " : "") + l + '="' + (r.attributes[l] || "") + '"';
return "<" + r.tag + ' class="' + r.classes.join(" ") + '" ' + o + ">" + r.content + "</" + r.tag + ">";
}, !n.document) return n.addEventListener ? (n.addEventListener("message", function(e) {
var a = JSON.parse(e.data), i = a.language, r = a.code, s = a.immediateClose;
n.postMessage(t.highlight(r, t.languages[i], i)), s && n.close();
}, !1), n.Prism) : n.Prism;
var i = document.getElementsByTagName("script");
return i = i[i.length - 1], i && (t.filename = i.src, document.addEventListener && !i.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), 
n.Prism;
}();
void 0 !== e && e.exports && (e.exports = a), "undefined" != typeof global && (global.Prism = a);
},
88: function(e, t) {
Prism.languages.markup = {
comment: /<!--[\w\W]*?-->/,
prolog: /<\?[\w\W]+?\?>/,
doctype: /<!DOCTYPE[\w\W]+?>/,
cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
tag: {
pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
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
punctuation: /[=>"']/
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
}, Prism.hooks.add("wrap", function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, 
Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
},
89: function(e, t) {
Prism.languages.css = {
comment: /\/\*[\w\W]*?\*\//,
atrule: {
pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
inside: {
rule: /@[\w-]+/
}
},
url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
property: /(\b|\B)[\w-]+(?=\s*:)/i,
important: /\B!important\b/i,
"function": /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), 
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
style: {
pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
lookbehind: !0,
inside: Prism.languages.css,
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
90: function(e, t) {
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
91: function(e, t) {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: !0
} ],
string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
"class-name": {
pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /(\.|\\)/
}
},
keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
"boolean": /\b(true|false)\b/,
"function": /[a-z0-9_]+(?=\()/i,
number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
punctuation: /[{}[\];(),.:]/
};
},
92: function(e, t) {
Prism.languages.javascript = Prism.languages.extend("clike", {
keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
"function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
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
pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
lookbehind: !0,
inside: Prism.languages.javascript,
alias: "language-javascript"
}
}), Prism.languages.js = Prism.languages.javascript;
},
93: function(e, t) {
!function(e) {
var t = /#(?!\{).+/, n = {
pattern: /#\{[^}]+\}/,
alias: "variable"
};
e.languages.coffeescript = e.languages.extend("javascript", {
comment: t,
string: [ /'(?:\\?[^\\])*?'/, {
pattern: /"(?:\\?[^\\])*?"/,
inside: {
interpolation: n
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), e.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/,
alias: "comment"
},
"block-regex": {
pattern: /\/{3}[\s\S]*?\/{3}/,
alias: "regex",
inside: {
comment: t,
interpolation: n
}
}
}), e.languages.insertBefore("coffeescript", "string", {
"inline-javascript": {
pattern: /`(?:\\?[\s\S])*?`/,
inside: {
delimiter: {
pattern: /^`|`$/,
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
interpolation: n
}
} ]
}), e.languages.insertBefore("coffeescript", "keyword", {
property: /(?!\d)\w+(?=\s*:(?!:))/
});
}(Prism);
},
94: function(e, t) {
Prism.languages.http = {
"request-line": {
pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
inside: {
property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] [0-9]+.*/m,
inside: {
property: {
pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
lookbehind: !0
}
}
},
"header-name": {
pattern: /^[\w-]+:(?=.)/m,
alias: "keyword"
}
};
var n = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var a in n) if (n[a]) {
var i = {};
i[a] = {
pattern: RegExp("(content-type:\\s*" + a + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
lookbehind: !0,
inside: {
rest: n[a]
}
}, Prism.languages.insertBefore("http", "header-name", i);
}
},
95: function(e, t) {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
},
atrule: {
pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
inside: {
rule: /@[\w-]+/
}
},
url: /(?:[-a-z]+-)*url(?=\()/i,
selector: {
pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
inside: {
placeholder: /%[-_\w]+/
}
}
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: [ /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
pattern: /( +)(?:from|through)(?= )/,
lookbehind: !0
} ]
}), Prism.languages.insertBefore("scss", "property", {
variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
placeholder: {
pattern: /%[-_\w]+/,
alias: "selector"
},
statement: /\B!(?:default|optional)\b/i,
"boolean": /\b(?:true|false)\b/,
"null": /\bnull\b/,
operator: {
pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
lookbehind: !0
}
}), Prism.languages.scss.atrule.inside.rest = Prism.util.clone(Prism.languages.scss);
},
96: function(e, t) {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
lookbehind: !0
},
string: {
pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
lookbehind: !0
},
variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
"function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
"boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
punctuation: /[;[\]()`,.]/
};
},
97: function(e, t) {
Prism.languages.php = Prism.languages.extend("clike", {
keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
constant: /\b[A-Z0-9_]{2,}\b/,
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
}
}), Prism.languages.insertBefore("php", "class-name", {
"shell-comment": {
pattern: /(^|[^\\])#.*/,
lookbehind: !0,
alias: "comment"
}
}), Prism.languages.insertBefore("php", "keyword", {
delimiter: /\?>|<\?(?:php)?/i,
variable: /\$\w+\b/i,
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
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
"php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(t) {
return e.tokenStack.push(t), "{{{PHP" + e.tokenStack.length + "}}}";
}));
}), Prism.hooks.add("before-insert", function(e) {
"php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function(e) {
if ("php" === e.language) {
for (var t, n = 0; t = e.tokenStack[n]; n++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(t, e.grammar, "php").replace(/\$/g, "$$$$"));
e.element.innerHTML = e.highlightedCode;
}
}), Prism.hooks.add("wrap", function(e) {
"php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
markup: {
pattern: /<[^?]\/?(.*?)>/,
inside: Prism.languages.markup
},
php: /\{\{\{PHP[0-9]+\}\}\}/
}));
},
98: function(e, t) {
Prism.languages.insertBefore("php", "variable", {
"this": /\$this\b/,
global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
scope: {
pattern: /\b[\w\\]+::/,
inside: {
keyword: /(static|self|parent)/,
punctuation: /(::|\\)/
}
}
});
},
99: function(e, t) {
Prism.languages.python = {
"triple-quoted-string": {
pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
alias: "string"
},
comment: {
pattern: /(^|[^\\])#.*/,
lookbehind: !0
},
string: /("|')(?:\\?.)*?\1/,
"function": {
pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
lookbehind: !0
},
"class-name": {
pattern: /(\bclass\s+)[a-z0-9_]+/i,
lookbehind: !0
},
keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
"boolean": /\b(?:True|False)\b/,
number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
punctuation: /[{}[\];(),.:]/
};
},
100: function(e, t) {
!function(e) {
e.languages.ruby = e.languages.extend("clike", {
comment: /#(?!\{[^\r\n]*?\}).*/,
keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
});
var t = {
pattern: /#\{[^}]+\}/,
inside: {
delimiter: {
pattern: /^#\{|\}$/,
alias: "tag"
},
rest: e.util.clone(e.languages.ruby)
}
};
e.languages.insertBefore("ruby", "keyword", {
regex: [ {
pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
} ],
variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.insertBefore("ruby", "number", {
builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.ruby.string = [ {
pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
inside: {
interpolation: t
}
}, {
pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
inside: {
interpolation: t
}
} ];
}(Prism);
},
101: function(e, t) {
Prism.languages.java = Prism.languages.extend("clike", {
keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
operator: {
pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
lookbehind: !0
}
});
},
155: function(e, t, n) {
"use strict";
function a(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var a = t("fail", n);
a.reason = e, i.dispatchEvent(a);
}
function a(e, n) {
var a = t("success", n);
a.result = e, i.dispatchEvent(a);
}
var i = new XMLHttpRequest(), s = e.method || "GET", o = e.body, l = e.url;
i.open(s, l, e.sync ? !1 : !0), i.method = s;
var c = r();
c && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(o) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
o = JSON.stringify(o)), e.noDocumentEvents || (i.addEventListener("loadstart", function(e) {
i.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), i.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", t);
var r = i.responseText, s = i.getResponseHeader("Content-Type");
if (s.match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
a(r, t);
}), setTimeout(function() {
i.send(o);
}, 0), i;
}
var i = n(147), r = n(156);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = a;
},
156: function(e, t) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
164: function(e, t, n) {
"use strict";
function a(e, t) {
if (e.elements.email.value) {
var n = e.elements.slug, a = [];
if (n.length) for (var o = 0; o < n.length; o++) {
var l = n[o];
l.checked && a.push(l.value);
} else a.push(n.value);
if (!a.length) return void new s.Info("Выберите рассылки из списка.");
var c = {
email: e.elements.email.value,
slug: a
}, u = r({
method: "POST",
url: e.action,
body: c
}), d = e.querySelector('[type="submit"]'), p = new i({
elem: d,
size: "small",
elemClass: "button_loading"
});
p.start(), d.disabled = !0, u.addEventListener("loadend", function() {
p.stop(), d.disabled = !1;
});
var h = e.getAttribute("data-newsletter-subscribe-form");
u.addEventListener("success", function(n) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe", h), new s.Success(n.result.message, "slow"), 
e.elements.email.value = "", t && t()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe-fail", h), new s.Error(n.result.message));
});
}
}
var i = n(150), r = n(155), s = n(147);
t.submitSubscribeForm = a;
},
185: function(e, t) {
"use strict";
function n() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var n = e[t], i = n.dataset.sticky ? document.querySelector(n.dataset.sticky) : document.body;
if (n.getBoundingClientRect().top < 0) {
if (n.style.cssText) return;
var r = n.getBoundingClientRect().left, s = a(n);
n.parentNode.insertBefore(s, n), i.appendChild(n), n.classList.add("sticky"), n.style.position = "fixed", 
n.style.top = 0, n.style.left = r + "px", n.style.zIndex = 101, n.style.background = "white", 
n.style.margin = 0, n.style.width = s.offsetWidth + "px", n.placeholder = s;
} else n.placeholder && n.placeholder.getBoundingClientRect().top > 0 && (n.style.cssText = "", 
n.classList.remove("sticky"), n.placeholder.parentNode.insertBefore(n, n.placeholder), 
n.placeholder.remove(), n.placeholder = null);
}
}
function a(e) {
var t = document.createElement("div"), n = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = n.marginLeft, 
t.style.marginRight = n.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = n.marginBottom, 
t.style.marginTop = n.marginTop, t;
}
e.exports = n;
},
237: function(e, t, n) {
"use strict";
function a(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), n = 0; n < t.length; n++) {
var a = t[n];
new s(a), a.setAttribute("data-prism-done", "1");
}
}
function i(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), n = 0; n < t.length; n++) new o(t[n]), 
t[n].setAttribute("data-prism-done", "1");
}
function r(e) {
a(e), i(e);
}
n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), 
n(99), n(100), n(101), Prism.tokenTag = "code";
var s = n(238), o = n(241);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
r(document);
});
}, t.highlight = r;
},
238: function(e, t, n) {
"use strict";
function a(e) {
function t() {
var e = v.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(g, "https://ru.lookatcode.com/showjs");
}
function n() {
var t;
if (w && e.hasAttribute("data-refresh") && (w.remove(), w = null), w || (w = e.querySelector(".code-result")), 
w) t = w.querySelector("iframe"); else {
if (w = document.createElement("div"), w.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var n = +e.getAttribute("data-demo-height");
t.style.height = n + "px";
}
w.appendChild(t), e.appendChild(w);
}
if (b) {
var a = t.contentDocument || t.contentWindow.document;
a.open(), a.write(d(g)), a.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(a.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || s.iframe(t), y && e.hasAttribute("data-autorun") || o(w) || w.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = t.name;
var r = document.createElement("textarea");
r.name = "code", r.value = d(g), i.appendChild(r), t.parentNode.insertBefore(i, t.nextSibling), 
i.submit(), i.remove(), y && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || s.iframe(t), o(w) || w.scrollIntoView(!1);
});
}
}
function a(e) {
var t = document.createElement("script");
t.text = e, document.head.appendChild(t).parentNode.removeChild(t);
}
function c() {
if (b) {
if (e.hasAttribute("data-autorun")) return void a(g);
try {
window.eval.call(window, g);
} catch (n) {
alert("Ошибка: " + n.message);
}
} else e.hasAttribute("data-refresh") && v && (v.remove(), v = null), v ? t() : (v = document.createElement("iframe"), 
v.className = "js-frame", v.src = "https://ru.lookatcode.com/showjs", v.style.width = 0, 
v.style.height = 0, v.style.border = "none", v.onload = function() {
t();
}, document.body.appendChild(v));
}
function u() {
var e;
if (E) e = d(g); else {
var t = g.replace(/^/gim, "    ");
e = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + t + "\n  </script>\n</body>\n\n</html>";
}
var n = document.createElement("form");
n.action = "http://plnkr.co/edit/?p=preview", n.method = "POST", n.target = "_blank", 
document.body.appendChild(n);
var a = document.createElement("textarea");
a.name = "files[index.html]", a.value = e, n.appendChild(a);
var i = document.createElement("input");
i.name = "description", i.value = "Fork from " + window.location, n.appendChild(i), 
n.submit(), n.remove();
}
function d() {
var e = g.toLowerCase(), t = e.match("<body>"), n = e.match("</body>"), a = e.match("<html>"), i = e.match("</html>"), r = e.match(/^\s*<!doctype/);
if (r) return g;
var s = g;
return a || (s = "<html>\n" + s), i || (s += "\n</html>"), t || (s = s.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
n || (s = s.replace("</html>", "\n</body>\n</html>")), s = "<!DOCTYPE HTML>\n" + s;
}
function p() {
f ? c() : n(), y = !1;
}
var h = e.querySelector("pre"), m = h.querySelector("code"), g = m.textContent;
Prism.highlightElement(m), l(h), i(h, e.getAttribute("data-highlight-block")), r(h, e.getAttribute("data-highlight-inline"));
var f = h.classList.contains("language-javascript"), E = h.classList.contains("language-markup"), b = +e.getAttribute("data-trusted"), T = +e.getAttribute("data-no-strict");
!T && f && (g = "'use strict';\n" + g);
var v, w, y = !0;
if (f || E) {
var S = e.querySelector('[data-action="run"]');
S && (S.onclick = function() {
return this.blur(), p(), !1;
});
var A = e.querySelector('[data-action="edit"]');
A && (A.onclick = function() {
return this.blur(), u(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(p, 100));
}
}
function i(e, t) {
if (t) for (var n, a = t.replace(/\s+/g, "").split(","), i = 0; n = a[i++]; ) {
n = n.split("-");
var r = +n[0], s = +n[1] || r, o = '<code class="block-highlight" data-start="' + r + '" data-end="' + s + '">' + Array(r + 1).join("\n") + '<code class="mask">' + Array(s - r + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", o);
}
}
function r(e, t) {
var n = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var a = 0; a < t.length; a++) {
var i = t[a].split(":"), r = +i[0], s = i[1].split("-"), o = +s[0], l = +s[1], c = '<code class="inline-highlight">' + Array(r + 1).join("\n") + Array(o + 1).join(" ") + '<code class="mask">' + Array(l - o + 1).join(" ") + "</code></code>";
n.insertAdjacentHTML("afterBegin", c);
}
}
var s = n(197), o = n(239), l = n(240);
e.exports = a;
},
239: function(e, t) {
"use strict";
function n(e) {
var t = e.getBoundingClientRect(), n = 0;
if (t.top < 0) n = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
n = window.innerHeight - top;
}
return n > 10;
}
e.exports = n;
},
240: function(e, t) {
"use strict";
function n(e) {
var t, n = 1 + e.innerHTML.split("\n").length, a = Array(n);
a = a.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", 
t.innerHTML = a, e.hasAttribute("data-start") && (e.style.counterReset = "linenumber " + +e.dataset.start - 1), 
e.appendChild(t);
}
e.exports = n;
},
241: function(e, t, n) {
"use strict";
function a(e) {
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
var i = n(148), r = n(240);
a.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, n = e.delegateTarget.parentNode.children, a = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < n.length; i++) {
var r = n[i], s = a[i];
r == e.delegateTarget ? (t = i, s.classList.add("code-tabs__section_current"), r.classList.add("code-tabs__switch_current")) : (s.classList.remove("code-tabs__section_current"), 
r.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(a[t]));
}, a.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), n = t.querySelector("code");
Prism.highlightElement(n), r(t), e.highlighted = !0;
}
}, a.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, i.delegateMixin(a.prototype), e.exports = a;
},
242: function(e, t, n) {
"use strict";
function a() {
var e = this;
this.elem = document.createElement("div"), document.body.appendChild(this.elem);
var t = new s({
hasClose: !1
}), n = new o();
t.setContent(n.elem), n.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
var a = i({
url: "/tutorial/map"
});
a.addEventListener("success", function(n) {
t.remove(), e.elem.innerHTML = '<div class="tutorial-map-overlay"></div>', e.mapElem = e.elem.firstChild, 
e.mapElem.innerHTML = n.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
e.mapElem.addEventListener("click", function(t) {
t.target.classList.contains("tutorial-map-overlay__close") && e.remove();
}), document.addEventListener("keydown", e.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
e.mapElem.addEventListener("scroll", c), new l(e.mapElem.firstElementChild);
}), a.addEventListener("fail", function() {
return t.remove();
});
}
var i = n(155), r = n(148), s = n(153), o = n(150), l = n(243), c = n(185);
r.delegateMixin(a.prototype), a.prototype.remove = function() {
this.elem.dispatchEvent(new CustomEvent("tutorial-map-remove")), this.elem.remove(), 
document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}, a.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, e.exports = a;
},
243: function(e, t, n) {
"use strict";
function a(e) {
var t = this;
this.elem = e, this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +localStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.layoutSwitch = this.elem.querySelector("[data-tutorial-map-layout-switch]");
var n = +localStorage.isMapSingleColumn;
this.layoutSwitch.querySelector('[value="0"]').checked = !n, this.layoutSwitch.querySelector('[value="1"]').checked = n, 
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
var a = this.elem.querySelector('[href="' + location.pathname + '"]');
a && a.classList.add("tutorial-map__link_active"), this.filterInput.focus();
}
function i(e, t) {
for (var n = 0, a = 0; n < e.length && a < t.length; ) e[n] == t[a] ? (n++, a++) : n++;
return a == t.length;
}
var r = n(201), s = n(148);
a.prototype.showChaptersCollapsed = function() {
for (var e = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"), t = 0; t < e.length; t++) {
var n = e[t];
this.chaptersCollapsed[n.getAttribute("href")] ? n.parentNode.classList.add("tutorial-map__item_collapsed") : n.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}, a.prototype.onLayoutSwitchChange = function(e) {
this.updateLayout();
}, a.prototype.updateLayout = function() {
var e = +this.elem.querySelector('[name="map-layout"]:checked').value;
e ? this.elem.classList.add("tutorial-map_singlecol") : this.elem.classList.remove("tutorial-map_singlecol"), 
localStorage.isMapSingleColumn = e ? "1" : "0";
}, a.prototype.updateShowTasks = function() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
localStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}, a.prototype.onFilterInput = function(e) {
this.showClearButton(e.target.value), this.throttleFilter(e.target.value);
}, a.prototype.onFilterKeydown = function(e) {
27 == e.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}, a.prototype.showClearButton = function(e) {
e ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}, a.prototype.focus = function() {
this.elem.tabIndex = -1, this.elem.focus();
}, a.prototype.filter = function(e) {
function t(t) {
return i(t.querySelector("a").innerHTML.toLowerCase(), e.replace(/\s/g, ""));
}
e = e.toLowerCase();
for (var n = this.showTasksCheckbox.checked, a = (this.elem.querySelectorAll(".tutorial-map-link"), 
this.elem.querySelectorAll(".tutorial-map__item")), r = 0; r < a.length; r++) {
var s = a[r], o = s.querySelectorAll(".tutorial-map__sub-item"), l = Array.prototype.reduce.call(o, function(e, a) {
var i = !1;
if (n) {
var r = a.querySelectorAll(".tutorial-map__sub-sub-item");
i = Array.prototype.reduce.call(r, function(e, n) {
var a = t(n);
return n.hidden = !a, e || a;
}, !1);
}
var s = i || t(a);
return a.hidden = !s, e || s;
}, !1);
s.hidden = !(l || t(s));
}
}, a.prototype.throttleFilter = r(a.prototype.filter, 200), s.delegateMixin(a.prototype), 
e.exports = a;
}
});
//# sourceMappingURL=tutorial.0b1cdc4c1007886084a3.js.map
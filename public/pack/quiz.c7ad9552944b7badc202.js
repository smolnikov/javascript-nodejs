var quiz = webpackJsonp_name_([ 13 ], {
0: function(e, t, n) {
"use strict";
function a() {
var e = document.querySelector("[data-quiz-question-form]");
e && i(e);
var t = document.querySelector("[data-quiz-result-save-form]");
t && r(t), l.init();
}
function r(e) {
function t() {
var t = e.querySelector('[type="submit"]'), r = new s({
elem: t,
size: "small",
"class": "submit-button__spinner",
elemClass: "submit-button_progress"
});
r.start(), n.e(2, function() {
r.stop();
var e = n(152);
new e({
callback: a
});
});
}
function a() {
function t() {
r.stop(), a.disabled = !1;
}
var n = o({
method: "POST",
url: e.action
}), a = e.querySelector('[type="submit"]'), r = new s({
elem: a,
size: "small",
elemClass: "button_loading"
});
r.start(), a.disabled = !0, n.addEventListener("loadend", t), n.addEventListener("success", function(e) {
new c.Success("Результат сохранён в профиле! <a href='/profile/" + window.currentUser.profileName + "/quiz'>Перейти в профиль</a>.", "slow");
});
}
e.onsubmit = function(e) {
return e.preventDefault(), window.currentUser ? void a() : void t();
};
}
function i(e) {
function t() {
for (var t = e.elements.type.value, n = e.elements.answer, a = [], r = 0; r < n.length; r++) n[r].checked && a.push(+n[r].value);
return "single" == t && (a = a[0]), a;
}
e.onchange = function() {
var n = t();
switch (e.elements.type.value) {
case "single":
e.querySelector('[type="submit"]').disabled = void 0 === n;
break;

case "multi":
e.querySelector('[type="submit"]').disabled = n.length ? !1 : !0;
break;

default:
throw Error("unknown type");
}
}, e.onsubmit = function(n) {
function a() {
u.stop(), c.disabled = !1;
}
n.preventDefault();
var r = t(), i = o({
method: "POST",
url: e.action,
body: {
answer: r
}
}), c = e.querySelector('[type="submit"]'), u = new s({
elem: c,
size: "small",
elemClass: "button_loading"
});
u.start(), c.disabled = !0, i.addEventListener("fail", a), i.addEventListener("success", function(t) {
t.result.reload ? window.location.reload() : t.result.html ? (a(), document.querySelector(".quiz-timeline .quiz-timeline__number_current").classList.remove("quiz-timeline__number_current"), 
document.querySelectorAll(".quiz-timeline span")[t.result.questionNumber].classList.add("quiz-timeline__number_current"), 
document.querySelector(".quiz-tablet-timeline__num").innerHTML = "&nbsp;" + (t.result.questionNumber + 1) + "&nbsp;", 
e.innerHTML = t.result.html, l.highlight(e)) : a();
});
};
}
n(236);
var s = n(150), o = n(155), l = n(237), c = n(147);
a();
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
for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
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
for (var r in n) a[r] = n[r];
return a;
},
insertBefore: function(e, n, a, r) {
r = r || t.languages;
var i = r[e];
if (2 == arguments.length) {
a = arguments[1];
for (var s in a) a.hasOwnProperty(s) && (i[s] = a[s]);
return i;
}
var o = {};
for (var l in i) if (i.hasOwnProperty(l)) {
if (l == n) for (var s in a) a.hasOwnProperty(s) && (o[s] = a[s]);
o[l] = i[l];
}
return t.languages.DFS(t.languages, function(t, n) {
n === r[e] && t != e && (this[t] = o);
}), r[e] = o;
},
DFS: function(e, n, a) {
for (var r in e) e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r));
}
},
plugins: {},
highlightAll: function(e, n) {
for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++]; ) t.highlightElement(a, e === !0, n);
},
highlightElement: function(a, r, i) {
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
if (t.hooks.run("before-highlight", u), r && n.Worker) {
var d = new Worker(t.filename);
d.onmessage = function(e) {
u.highlightedCode = e.data, t.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, 
i && i.call(u.element), t.hooks.run("after-highlight", u), t.hooks.run("complete", u);
}, d.postMessage(JSON.stringify({
language: u.language,
code: u.code,
immediateClose: !0
}));
} else u.highlightedCode = t.highlight(u.code, u.grammar, u.language), t.hooks.run("before-insert", u), 
u.element.innerHTML = u.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", u), 
t.hooks.run("complete", u);
},
highlight: function(e, n, r) {
var i = t.tokenize(e, n);
return a.stringify(t.util.encode(i), r);
},
tokenize: function(e, n, a) {
var r = t.Token, i = [ e ], s = n.rest;
if (s) {
for (var o in s) n[o] = s[o];
delete n.rest;
}
e: for (var o in n) if (n.hasOwnProperty(o) && n[o]) {
var l = n[o];
l = "Array" === t.util.type(l) ? l : [ l ];
for (var c = 0; c < l.length; ++c) {
var u = l[c], d = u.inside, p = !!u.lookbehind, m = 0, h = u.alias;
u = u.pattern || u;
for (var g = 0; g < i.length; g++) {
var f = i[g];
if (i.length > e.length) break e;
if (!(f instanceof r)) {
u.lastIndex = 0;
var E = u.exec(f);
if (E) {
p && (m = E[1].length);
var b = E.index - 1 + m, E = E[0].slice(m), T = E.length, A = b + T, S = f.slice(0, b + 1), v = f.slice(A + 1), w = [ g, 1 ];
S && w.push(S);
var y = new r(o, d ? t.tokenize(E, d) : E, h);
w.push(y), v && w.push(v), Array.prototype.splice.apply(i, w);
}
}
}
}
}
return i;
},
hooks: {
all: {},
add: function(e, n) {
var a = t.hooks.all;
a[e] = a[e] || [], a[e].push(n);
},
run: function(e, n) {
var a = t.hooks.all[e];
if (a && a.length) for (var r, i = 0; r = a[i++]; ) r(n);
}
}
}, a = t.Token = function(e, t, n) {
this.type = e, this.content = t, this.alias = n;
};
if (a.stringify = function(e, n, r) {
if ("string" == typeof e) return e;
if ("Array" === t.util.type(e)) return e.map(function(t) {
return a.stringify(t, n, e);
}).join("");
var i = {
type: e.type,
content: a.stringify(e.content, n, r),
tag: "span",
classes: [ "token", e.type ],
attributes: {},
language: n,
parent: r
};
if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
var s = "Array" === t.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(i.classes, s);
}
t.hooks.run("wrap", i);
var o = "";
for (var l in i.attributes) o += (o ? " " : "") + l + '="' + (i.attributes[l] || "") + '"';
return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">";
}, !n.document) return n.addEventListener ? (n.addEventListener("message", function(e) {
var a = JSON.parse(e.data), r = a.language, i = a.code, s = a.immediateClose;
n.postMessage(t.highlight(i, t.languages[r], r)), s && n.close();
}, !1), n.Prism) : n.Prism;
var r = document.getElementsByTagName("script");
return r = r[r.length - 1], r && (t.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), 
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
var r = {};
r[a] = {
pattern: RegExp("(content-type:\\s*" + a + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
lookbehind: !0,
inside: {
rest: n[a]
}
}, Prism.languages.insertBefore("http", "header-name", r);
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
a.reason = e, r.dispatchEvent(a);
}
function a(e, n) {
var a = t("success", n);
a.result = e, r.dispatchEvent(a);
}
var r = new XMLHttpRequest(), s = e.method || "GET", o = e.body, l = e.url;
r.open(s, l, e.sync ? !1 : !0), r.method = s;
var c = i();
c && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", c), "[object Object]" == {}.toString.call(o) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
o = JSON.stringify(o)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
r.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), r.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), r.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), r.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void n("Не получен ответ от сервера.", t);
if (-1 == u.indexOf(r.status)) return void n("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее.", t);
var i = r.responseText, s = r.getResponseHeader("Content-Type");
if (s.match(/^application\/json/) || e.json) try {
i = JSON.parse(i);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
a(i, t);
}), setTimeout(function() {
r.send(o);
}, 0), r;
}
var r = n(147), i = n(156);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = a;
},
156: function(e, t) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
236: function(e, t) {},
237: function(e, t, n) {
"use strict";
function a(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), n = 0; n < t.length; n++) {
var a = t[n];
new s(a), a.setAttribute("data-prism-done", "1");
}
}
function r(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), n = 0; n < t.length; n++) new o(t[n]), 
t[n].setAttribute("data-prism-done", "1");
}
function i(e) {
a(e), r(e);
}
n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), 
n(99), n(100), n(101), Prism.tokenTag = "code";
var s = n(238), o = n(241);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
i(document);
});
}, t.highlight = i;
},
238: function(e, t, n) {
"use strict";
function a(e) {
function t() {
var e = A.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(g, "https://ru.lookatcode.com/showjs");
}
function n() {
var t;
if (S && e.hasAttribute("data-refresh") && (S.remove(), S = null), S || (S = e.querySelector(".code-result")), 
S) t = S.querySelector("iframe"); else {
if (S = document.createElement("div"), S.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var n = +e.getAttribute("data-demo-height");
t.style.height = n + "px";
}
S.appendChild(t), e.appendChild(S);
}
if (b) {
var a = t.contentDocument || t.contentWindow.document;
a.open(), a.write(d(g)), a.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(a.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || s.iframe(t), v && e.hasAttribute("data-autorun") || o(S) || S.scrollIntoView(!1);
} else {
var r = document.createElement("form");
r.style.display = "none", r.method = "POST", r.enctype = "multipart/form-data", 
r.action = "https://ru.lookatcode.com/showhtml", r.target = t.name;
var i = document.createElement("textarea");
i.name = "code", i.value = d(g), r.appendChild(i), t.parentNode.insertBefore(r, t.nextSibling), 
r.submit(), r.remove(), v && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || s.iframe(t), o(S) || S.scrollIntoView(!1);
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
} else e.hasAttribute("data-refresh") && A && (A.remove(), A = null), A ? t() : (A = document.createElement("iframe"), 
A.className = "js-frame", A.src = "https://ru.lookatcode.com/showjs", A.style.width = 0, 
A.style.height = 0, A.style.border = "none", A.onload = function() {
t();
}, document.body.appendChild(A));
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
var r = document.createElement("input");
r.name = "description", r.value = "Fork from " + window.location, n.appendChild(r), 
n.submit(), n.remove();
}
function d() {
var e = g.toLowerCase(), t = e.match("<body>"), n = e.match("</body>"), a = e.match("<html>"), r = e.match("</html>"), i = e.match(/^\s*<!doctype/);
if (i) return g;
var s = g;
return a || (s = "<html>\n" + s), r || (s += "\n</html>"), t || (s = s.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
n || (s = s.replace("</html>", "\n</body>\n</html>")), s = "<!DOCTYPE HTML>\n" + s;
}
function p() {
f ? c() : n(), v = !1;
}
var m = e.querySelector("pre"), h = m.querySelector("code"), g = h.textContent;
Prism.highlightElement(h), l(m), r(m, e.getAttribute("data-highlight-block")), i(m, e.getAttribute("data-highlight-inline"));
var f = m.classList.contains("language-javascript"), E = m.classList.contains("language-markup"), b = +e.getAttribute("data-trusted"), T = +e.getAttribute("data-no-strict");
!T && f && (g = "'use strict';\n" + g);
var A, S, v = !0;
if (f || E) {
var w = e.querySelector('[data-action="run"]');
w && (w.onclick = function() {
return this.blur(), p(), !1;
});
var y = e.querySelector('[data-action="edit"]');
y && (y.onclick = function() {
return this.blur(), u(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(p, 100));
}
}
function r(e, t) {
if (t) for (var n, a = t.replace(/\s+/g, "").split(","), r = 0; n = a[r++]; ) {
n = n.split("-");
var i = +n[0], s = +n[1] || i, o = '<code class="block-highlight" data-start="' + i + '" data-end="' + s + '">' + Array(i + 1).join("\n") + '<code class="mask">' + Array(s - i + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", o);
}
}
function i(e, t) {
var n = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var a = 0; a < t.length; a++) {
var r = t[a].split(":"), i = +r[0], s = r[1].split("-"), o = +s[0], l = +s[1], c = '<code class="inline-highlight">' + Array(i + 1).join("\n") + Array(o + 1).join(" ") + '<code class="mask">' + Array(l - o + 1).join(" ") + "</code></code>";
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
var r = n(148), i = n(240);
a.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, n = e.delegateTarget.parentNode.children, a = this.elem.querySelector("[data-code-tabs-content]").children, r = 0; r < n.length; r++) {
var i = n[r], s = a[r];
i == e.delegateTarget ? (t = r, s.classList.add("code-tabs__section_current"), i.classList.add("code-tabs__switch_current")) : (s.classList.remove("code-tabs__section_current"), 
i.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(a[t]));
}, a.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), n = t.querySelector("code");
Prism.highlightElement(n), i(t), e.highlighted = !0;
}
}, a.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, r.delegateMixin(a.prototype), e.exports = a;
}
});
//# sourceMappingURL=quiz.c7ad9552944b7badc202.js.map
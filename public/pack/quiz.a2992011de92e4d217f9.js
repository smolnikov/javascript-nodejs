var quiz = webpackJsonp_name_([ 10 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = document.querySelector("[data-quiz-question-form]");
t && o(t);
var e = document.querySelector("[data-quiz-result-save-form]");
e && i(e), u.init();
}
function i(t) {
function e() {
var e = t.querySelector('[type="submit"]'), i = new a({
elem: e,
size: "small",
"class": "submit-button__spinner",
elemClass: "submit-button_progress"
});
i.start(), n.e(7, function() {
i.stop();
var t = n(282).AuthModal;
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
}), r = t.querySelector('[type="submit"]'), i = new a({
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
function o(t) {
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
var i = e(), o = s({
method: "POST",
url: t.action,
body: {
answer: i
}
}), c = t.querySelector('[type="submit"]'), l = new a({
elem: c,
size: "small",
elemClass: "button_loading"
});
l.start(), c.disabled = !0, o.addEventListener("fail", r), o.addEventListener("success", function(e) {
e.result.reload ? window.location.reload() : e.result.html ? (r(), document.querySelector(".quiz-timeline .quiz-timeline__number_current").classList.remove("quiz-timeline__number_current"), 
document.querySelectorAll(".quiz-timeline span")[e.result.questionNumber].classList.add("quiz-timeline__number_current"), 
document.querySelector(".quiz-tablet-timeline__num").innerHTML = "&nbsp;" + (e.result.questionNumber + 1) + "&nbsp;", 
t.innerHTML = e.result.html, u.highlight(t)) : r();
});
};
}
n(156);
var a = n(278), s = n(256), u = n(277), c = n(251);
e.init = r;
},
156: function() {},
173: function(t) {
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var e = function() {
var t = /\blang(?:uage)?-(?!\*)(\w+)\b/i, n = self.Prism = {
util: {
encode: function(t) {
return t instanceof r ? new r(t.type, n.util.encode(t.content), t.alias) : "Array" === n.util.type(t) ? t.map(n.util.encode) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(t) {
return Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];
},
clone: function(t) {
var e = n.util.type(t);
switch (e) {
case "Object":
var r = {};
for (var i in t) t.hasOwnProperty(i) && (r[i] = n.util.clone(t[i]));
return r;

case "Array":
return t.slice();
}
return t;
}
},
languages: {
extend: function(t, e) {
var r = n.util.clone(n.languages[t]);
for (var i in e) r[i] = e[i];
return r;
},
insertBefore: function(t, e, r, i) {
i = i || n.languages;
var o = i[t];
if (2 == arguments.length) {
r = arguments[1];
for (var a in r) r.hasOwnProperty(a) && (o[a] = r[a]);
return o;
}
var s = {};
for (var u in o) if (o.hasOwnProperty(u)) {
if (u == e) for (var a in r) r.hasOwnProperty(a) && (s[a] = r[a]);
s[u] = o[u];
}
return n.languages.DFS(n.languages, function(e, n) {
n === i[t] && e != t && (this[e] = s);
}), i[t] = s;
},
DFS: function(t, e, r) {
for (var i in t) t.hasOwnProperty(i) && (e.call(t, i, t[i], r || i), "Object" === n.util.type(t[i]) ? n.languages.DFS(t[i], e) : "Array" === n.util.type(t[i]) && n.languages.DFS(t[i], e, i));
}
},
highlightAll: function(t, e) {
for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), o = 0; r = i[o++]; ) n.highlightElement(r, t === !0, e);
},
highlightElement: function(e, i, o) {
for (var a, s, u = e; u && !t.test(u.className); ) u = u.parentNode;
if (u && (a = (u.className.match(t) || [ , "" ])[1], s = n.languages[a]), s) {
e.className = e.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a, 
u = e.parentNode, /pre/i.test(u.nodeName) && (u.className = u.className.replace(t, "").replace(/\s+/g, " ") + " language-" + a);
var c = e.textContent;
if (c) {
var l = {
element: e,
language: a,
grammar: s,
code: c
};
if (n.hooks.run("before-highlight", l), i && self.Worker) {
var f = new Worker(n.filename);
f.onmessage = function(t) {
l.highlightedCode = r.stringify(JSON.parse(t.data), a), n.hooks.run("before-insert", l), 
l.element.innerHTML = l.highlightedCode, o && o.call(l.element), n.hooks.run("after-highlight", l);
}, f.postMessage(JSON.stringify({
language: l.language,
code: l.code
}));
} else l.highlightedCode = n.highlight(l.code, l.grammar, l.language), n.hooks.run("before-insert", l), 
l.element.innerHTML = l.highlightedCode, o && o.call(e), n.hooks.run("after-highlight", l);
}
}
},
highlight: function(t, e, i) {
var o = n.tokenize(t, e);
return r.stringify(n.util.encode(o), i);
},
tokenize: function(t, e) {
var r = n.Token, i = [ t ], o = e.rest;
if (o) {
for (var a in o) e[a] = o[a];
delete e.rest;
}
t: for (var a in e) if (e.hasOwnProperty(a) && e[a]) {
var s = e[a];
s = "Array" === n.util.type(s) ? s : [ s ];
for (var u = 0; u < s.length; ++u) {
var c = s[u], l = c.inside, f = !!c.lookbehind, d = 0, h = c.alias;
c = c.pattern || c;
for (var p = 0; p < i.length; p++) {
var m = i[p];
if (i.length > t.length) break t;
if (!(m instanceof r)) {
c.lastIndex = 0;
var g = c.exec(m);
if (g) {
f && (d = g[1].length);
var v = g.index - 1 + d, g = g[0].slice(d), y = g.length, $ = v + y, b = m.slice(0, v + 1), w = m.slice($ + 1), E = [ p, 1 ];
b && E.push(b);
var S = new r(a, l ? n.tokenize(g, l) : g, h);
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
add: function(t, e) {
var r = n.hooks.all;
r[t] = r[t] || [], r[t].push(e);
},
run: function(t, e) {
var r = n.hooks.all[t];
if (r && r.length) for (var i, o = 0; i = r[o++]; ) i(e);
}
}
}, r = n.Token = function(t, e, n) {
this.type = t, this.content = e, this.alias = n;
};
if (r.stringify = function(t, i, o) {
if ("string" == typeof t) return t;
if ("[object Array]" == Object.prototype.toString.call(t)) return t.map(function(e) {
return r.stringify(e, i, t);
}).join("");
var a = {
type: t.type,
content: r.stringify(t.content, i, o),
tag: e.tokenTag || "span",
classes: [ "token", t.type ],
attributes: {},
language: i,
parent: o
};
if ("comment" == a.type && (a.attributes.spellcheck = "true"), t.alias) {
var s = "Array" === n.util.type(t.alias) ? t.alias : [ t.alias ];
Array.prototype.push.apply(a.classes, s);
}
n.hooks.run("wrap", a);
var u = "";
for (var c in a.attributes) u += c + '="' + (a.attributes[c] || "") + '"';
return "<" + a.tag + ' class="' + a.classes.join(" ") + '" ' + u + ">" + a.content + "</" + a.tag + ">";
}, !self.document) return self.addEventListener ? (self.addEventListener("message", function(t) {
var e = JSON.parse(t.data), r = e.language, i = e.code;
self.postMessage(JSON.stringify(n.util.encode(n.tokenize(i, n.languages[r])))), 
self.close();
}, !1), self.Prism) : self.Prism;
var i = document.getElementsByTagName("script");
return i = i[i.length - 1], i && (n.filename = i.src, document.addEventListener && !i.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), 
self.Prism;
}();
void 0 !== t && t.exports && (t.exports = e);
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
}, Prism.hooks.add("wrap", function(t) {
"entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"));
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
!function(t) {
var e = /#(?!\{).+/g, n = {
pattern: /#\{[^}]+\}/g,
alias: "variable"
};
t.languages.coffeescript = t.languages.extend("javascript", {
comment: e,
string: [ /'(?:\\?[\s\S])*?'/g, {
pattern: /"(?:\\?[\s\S])*?"/g,
inside: {
interpolation: n
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/g,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), t.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/g,
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
pattern: /`(?:\\?[\s\S])*?`/g,
inside: {
delimiter: {
pattern: /^`|`$/g,
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
var t = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var e in t) if (t[e]) {
var n = {};
n[e] = {
pattern: RegExp("(content-type:\\s*" + e + "[\\w\\W]*?)\\n\\n[\\w\\W]*", "gi"),
lookbehind: !0,
inside: {
rest: t[e]
}
}, Prism.languages.insertBefore("http", "keyword", n);
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
256: function(t, e, n) {
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
var i = new XMLHttpRequest(), a = t.method || "GET", s = t.body, u = t.url;
i.open(a, u, t.sync ? !1 : !0), i.method = a;
var c = o();
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
if (-1 == l.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", e);
var o = i.responseText, a = i.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || t.json) try {
o = JSON.parse(o);
} catch (e) {
return void n("Некорректный формат ответа от сервера", e);
}
r(o, e);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(251), o = n(291);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
277: function(t, e, n) {
"use strict";
function r(t) {
for (var e = t.querySelectorAll(".code-example:not([data-prism-done])"), n = 0; n < e.length; n++) {
var r = e[n];
new a(r), r.setAttribute("data-prism-done", "1");
}
}
function i(t) {
for (var e = t.querySelectorAll("div.code-tabs:not([data-prism-done])"), n = 0; n < e.length; n++) new s(e[n]), 
e[n].setAttribute("data-prism-done", "1");
}
function o(t) {
r(t), i(t);
}
n(173), n(174), n(175), n(176), n(177), n(178), n(179), n(180), n(181), n(182), 
n(183), n(184), n(185), n(186), n(187), Prism.tokenTag = "code";
var a = n(294), s = n(295);
e.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
o(document);
});
}, e.highlight = o;
},
291: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
294: function(t, e, n) {
"use strict";
function r(t) {
function e() {
var t = m.contentWindow;
return "function" != typeof t.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void t.postMessage(p, "https://ru.lookatcode.com/showjs");
}
function n() {
var e;
if (g && t.hasAttribute("data-refresh") && (g.remove(), g = null), g || (g = t.querySelector(".code-result")), 
g) e = g.querySelector("iframe"); else {
if (g = document.createElement("div"), g.className = "code-result code-example__result", 
e = document.createElement("iframe"), e.name = "frame-" + Math.random(), e.className = "code-result__iframe", 
"0" === t.getAttribute("data-demo-height")) e.style.display = "none"; else if (t.hasAttribute("data-demo-height")) {
var n = +t.getAttribute("data-demo-height");
e.style.height = n + "px";
}
g.appendChild(e), t.appendChild(g);
}
if ($) {
var r = e.contentDocument || e.contentWindow.document;
r.open(), r.write(l(p)), r.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(r.querySelectorAll("script"), function(t) {
t.remove();
});
}, 2e3), t.hasAttribute("data-demo-height") || a.iframe(e), b && t.hasAttribute("data-autorun") || s(g) || g.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = e.name;
var o = document.createElement("textarea");
o.name = "code", o.value = l(p), i.appendChild(o), e.parentNode.insertBefore(i, e.nextSibling), 
i.submit(), i.remove(), b && t.hasAttribute("data-autorun") || (e.onload = function() {
t.hasAttribute("data-demo-height") || a.iframe(e), s(g) || g.scrollIntoView(!1);
});
}
}
function r() {
if ($) try {
window.eval.call(window, p);
} catch (n) {
alert("Ошибка: " + n.message);
} else t.hasAttribute("data-refresh") && m && (m.remove(), m = null), m ? e() : (m = document.createElement("iframe"), 
m.className = "js-frame", m.src = "https://ru.lookatcode.com/showjs", m.style.width = 0, 
m.style.height = 0, m.style.border = "none", m.onload = function() {
e();
}, document.body.appendChild(m));
}
function c() {
var t;
if (y) t = l(p); else {
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
var t = p.toLowerCase(), e = t.match("<body>"), n = t.match("</body>"), r = t.match("<html>"), i = t.match("</html>"), o = t.match(/^\s*<!doctype/);
if (o) return p;
var a = p;
return r || (a = "<html>\n" + a), i || (a += "\n</html>"), e || (a = a.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
n || (a = a.replace("</html>", "\n</body>\n</html>")), a = "<!DOCTYPE HTML>\n" + a;
}
function f() {
v ? r() : n(), b = !1;
}
var d = t.querySelector("pre"), h = d.querySelector("code"), p = h.textContent;
Prism.highlightElement(h), u(d), i(d, t.getAttribute("data-highlight-block")), o(d, t.getAttribute("data-highlight-inline"));
var m, g, v = d.classList.contains("language-javascript"), y = d.classList.contains("language-markup"), $ = +t.getAttribute("data-trusted"), b = !0;
if (v || y) {
var w = t.querySelector('[data-action="run"]');
w && (w.onclick = function() {
return this.blur(), f(), !1;
});
var E = t.querySelector('[data-action="edit"]');
E && (E.onclick = function() {
return this.blur(), c(), !1;
}), t.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == t.getAttribute("data-autorun") ? t.querySelector("iframe").remove() : setTimeout(f, 100));
}
}
function i(t, e) {
if (e) for (var n, r = e.replace(/\s+/g, "").split(","), i = 0; n = r[i++]; ) {
n = n.split("-");
var o = +n[0], a = +n[1] || o, s = '<code class="block-highlight" data-start="' + o + '" data-end="' + a + '">' + Array(o + 1).join("\n") + '<code class="mask">' + Array(a - o + 2).join("\n") + "</code></code>";
t.insertAdjacentHTML("afterBegin", s);
}
}
function o(t, e) {
var n = t.querySelector('code[class*="language-"]');
e = e ? e.split(",") : [];
for (var r = 0; r < e.length; r++) {
var i = e[r].split(":"), o = +i[0], a = i[1].split("-"), s = +a[0], u = +a[1], c = '<code class="inline-highlight">' + Array(o + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(u - s + 1).join(" ") + "</code></code>";
n.insertAdjacentHTML("afterBegin", c);
}
}
var a = n(246), s = n(305), u = n(303);
t.exports = r;
},
295: function(t, e, n) {
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
var i = n(255), o = n(303);
r.prototype.onSwitchClick = function(t) {
t.preventDefault();
for (var e, n = t.delegateTarget.parentNode.children, r = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < n.length; i++) {
var o = n[i], a = r[i];
o == t.delegateTarget ? (e = i, a.classList.add("code-tabs__section_current"), o.classList.add("code-tabs__switch_current")) : (a.classList.remove("code-tabs__section_current"), 
o.classList.remove("code-tabs__switch_current"));
}
0 === e ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(r[e]));
}, r.prototype.highlightTab = function(t) {
if (!t.highlighted) {
var e = t.querySelector("pre"), n = e.querySelector("code");
Prism.highlightElement(n), o(e), t.highlighted = !0;
}
}, r.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, i.delegateMixin(r.prototype), t.exports = r;
},
303: function(t) {
"use strict";
function e(t) {
var e, n = 1 + t.innerHTML.split("\n").length, r = Array(n);
r = r.join("<span></span>"), e = document.createElement("span"), e.className = "line-numbers-rows", 
e.innerHTML = r, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + +t.dataset.start - 1), 
t.appendChild(e);
}
t.exports = e;
},
305: function(t) {
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
}
});
//# sourceMappingURL=quiz.a2992011de92e4d217f9.js.map
var tutorial = webpackJsonp_name_([ 2 ], {
0: function(e, t, i) {
"use strict";
function o() {
function e() {
var e = document.getElementsByClassName("sidebar__navigation-link_active");
e[0] && e[0].classList.remove("sidebar__navigation-link_active");
for (var t = document.getElementsByTagName("h2"), i = 0; i < t.length; i++) {
var o = t[i];
if (o.getBoundingClientRect().top > 1) break;
}
if (i--, i >= 0) {
var r = t[i].firstElementChild && t[i].firstElementChild.getAttribute("href"), a = document.querySelector('.sidebar__navigation-link a[href="' + r + '"]');
r && a && a.classList.add("sidebar__navigation-link_active");
}
}
document.addEventListener("DOMContentLoaded", function() {
e(), window.addEventListener("scroll", e);
});
}
function r() {
n(document, ".task__solution", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), n(document, ".task__answer-close", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), n(document, ".task__step-show", "click", function(e) {
e.target.closest(".task__step").classList.toggle("task__step_open");
});
}
function a() {
n(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function(e) {
var t = e.delegateTarget, i = t.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
i && i != t.parentNode && i.classList.remove("lessons-list__lesson_open"), t.parentNode.classList.toggle("lessons-list__lesson_open"), 
e.preventDefault();
});
}
var n = i(255), s = i(277), l = (i(256), i(252));
t.init = function() {
r(), a(), o(), n(document, '[data-action="tutorial-map"]', "click", function(e) {
new l(), e.preventDefault();
}), s.init(), window.ebookType && i.e(13, function() {
i(254).init();
});
}, t.TutorialMap = i(253);
},
173: function(e) {
self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {};
var t = function() {
var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, i = self.Prism = {
util: {
encode: function(e) {
return e instanceof o ? new o(e.type, i.util.encode(e.content), e.alias) : "Array" === i.util.type(e) ? e.map(i.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
},
clone: function(e) {
var t = i.util.type(e);
switch (t) {
case "Object":
var o = {};
for (var r in e) e.hasOwnProperty(r) && (o[r] = i.util.clone(e[r]));
return o;

case "Array":
return e.slice();
}
return e;
}
},
languages: {
extend: function(e, t) {
var o = i.util.clone(i.languages[e]);
for (var r in t) o[r] = t[r];
return o;
},
insertBefore: function(e, t, o, r) {
r = r || i.languages;
var a = r[e];
if (2 == arguments.length) {
o = arguments[1];
for (var n in o) o.hasOwnProperty(n) && (a[n] = o[n]);
return a;
}
var s = {};
for (var l in a) if (a.hasOwnProperty(l)) {
if (l == t) for (var n in o) o.hasOwnProperty(n) && (s[n] = o[n]);
s[l] = a[l];
}
return i.languages.DFS(i.languages, function(t, i) {
i === r[e] && t != e && (this[t] = s);
}), r[e] = s;
},
DFS: function(e, t, o) {
for (var r in e) e.hasOwnProperty(r) && (t.call(e, r, e[r], o || r), "Object" === i.util.type(e[r]) ? i.languages.DFS(e[r], t) : "Array" === i.util.type(e[r]) && i.languages.DFS(e[r], t, r));
}
},
highlightAll: function(e, t) {
for (var o, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), a = 0; o = r[a++]; ) i.highlightElement(o, e === !0, t);
},
highlightElement: function(t, r, a) {
for (var n, s, l = t; l && !e.test(l.className); ) l = l.parentNode;
if (l && (n = (l.className.match(e) || [ , "" ])[1], s = i.languages[n]), s) {
t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + n, 
l = t.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + n);
var p = t.textContent;
if (p) {
var c = {
element: t,
language: n,
grammar: s,
code: p
};
if (i.hooks.run("before-highlight", c), r && self.Worker) {
var d = new Worker(i.filename);
d.onmessage = function(e) {
c.highlightedCode = o.stringify(JSON.parse(e.data), n), i.hooks.run("before-insert", c), 
c.element.innerHTML = c.highlightedCode, a && a.call(c.element), i.hooks.run("after-highlight", c);
}, d.postMessage(JSON.stringify({
language: c.language,
code: c.code
}));
} else c.highlightedCode = i.highlight(c.code, c.grammar, c.language), i.hooks.run("before-insert", c), 
c.element.innerHTML = c.highlightedCode, a && a.call(t), i.hooks.run("after-highlight", c);
}
}
},
highlight: function(e, t, r) {
var a = i.tokenize(e, t);
return o.stringify(i.util.encode(a), r);
},
tokenize: function(e, t) {
var o = i.Token, r = [ e ], a = t.rest;
if (a) {
for (var n in a) t[n] = a[n];
delete t.rest;
}
e: for (var n in t) if (t.hasOwnProperty(n) && t[n]) {
var s = t[n];
s = "Array" === i.util.type(s) ? s : [ s ];
for (var l = 0; l < s.length; ++l) {
var p = s[l], c = p.inside, d = !!p.lookbehind, _ = 0, u = p.alias;
p = p.pattern || p;
for (var b = 0; b < r.length; b++) {
var f = r[b];
if (r.length > e.length) break e;
if (!(f instanceof o)) {
p.lastIndex = 0;
var m = p.exec(f);
if (m) {
d && (_ = m[1].length);
var g = m.index - 1 + _, m = m[0].slice(_), x = m.length, h = g + x, w = f.slice(0, g + 1), k = f.slice(h + 1), y = [ b, 1 ];
w && y.push(w);
var v = new o(n, c ? i.tokenize(m, c) : m, u);
y.push(v), k && y.push(k), Array.prototype.splice.apply(r, y);
}
}
}
}
}
return r;
},
hooks: {
all: {},
add: function(e, t) {
var o = i.hooks.all;
o[e] = o[e] || [], o[e].push(t);
},
run: function(e, t) {
var o = i.hooks.all[e];
if (o && o.length) for (var r, a = 0; r = o[a++]; ) r(t);
}
}
}, o = i.Token = function(e, t, i) {
this.type = e, this.content = t, this.alias = i;
};
if (o.stringify = function(e, r, a) {
if ("string" == typeof e) return e;
if ("[object Array]" == Object.prototype.toString.call(e)) return e.map(function(t) {
return o.stringify(t, r, e);
}).join("");
var n = {
type: e.type,
content: o.stringify(e.content, r, a),
tag: t.tokenTag || "span",
classes: [ "token", e.type ],
attributes: {},
language: r,
parent: a
};
if ("comment" == n.type && (n.attributes.spellcheck = "true"), e.alias) {
var s = "Array" === i.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(n.classes, s);
}
i.hooks.run("wrap", n);
var l = "";
for (var p in n.attributes) l += p + '="' + (n.attributes[p] || "") + '"';
return "<" + n.tag + ' class="' + n.classes.join(" ") + '" ' + l + ">" + n.content + "</" + n.tag + ">";
}, !self.document) return self.addEventListener ? (self.addEventListener("message", function(e) {
var t = JSON.parse(e.data), o = t.language, r = t.code;
self.postMessage(JSON.stringify(i.util.encode(i.tokenize(r, i.languages[o])))), 
self.close();
}, !1), self.Prism) : self.Prism;
var r = document.getElementsByTagName("script");
return r = r[r.length - 1], r && (i.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", i.highlightAll)), 
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
var t = /#(?!\{).+/g, i = {
pattern: /#\{[^}]+\}/g,
alias: "variable"
};
e.languages.coffeescript = e.languages.extend("javascript", {
comment: t,
string: [ /'(?:\\?[\s\S])*?'/g, {
pattern: /"(?:\\?[\s\S])*?"/g,
inside: {
interpolation: i
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
interpolation: i
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
interpolation: i
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
var i = {};
i[t] = {
pattern: RegExp("(content-type:\\s*" + t + "[\\w\\W]*?)\\n\\n[\\w\\W]*", "gi"),
lookbehind: !0,
inside: {
rest: e[t]
}
}, Prism.languages.insertBefore("http", "keyword", i);
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
for (var t, i = 0; t = e.tokenStack[i]; i++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (i + 1) + "}}}", Prism.highlight(t, e.grammar, "php"));
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
249: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var o = e[t], r = o.dataset.sticky ? document.querySelector(o.dataset.sticky) : document.body;
if (o.getBoundingClientRect().top < 0) {
if (o.style.cssText) return;
var a = o.getBoundingClientRect().left, n = i(o);
o.parentNode.insertBefore(n, o), r.appendChild(o), o.classList.add("sticky"), o.style.position = "fixed", 
o.style.top = 0, o.style.left = a + "px", o.style.zIndex = 101, o.style.background = "white", 
o.style.margin = 0, o.style.width = n.offsetWidth + "px", o.placeholder = n;
} else o.placeholder && o.placeholder.getBoundingClientRect().top > 0 && (o.style.cssText = "", 
o.classList.remove("sticky"), o.placeholder.parentNode.insertBefore(o, o.placeholder), 
o.placeholder.remove(), o.placeholder = null);
}
}
function i(e) {
var t = document.createElement("div"), i = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = i.marginLeft, 
t.style.marginRight = i.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = i.marginBottom, 
t.style.marginTop = i.marginTop, t;
}
e.exports = t;
},
252: function(e, t, i) {
"use strict";
function o() {
var e = this, t = new n({
hasClose: !1
}), i = new s();
t.setContent(i.elem), i.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
var o = r({
url: "/tutorial/map"
});
o.addEventListener("success", function(i) {
t.remove(), document.body.insertAdjacentHTML("beforeEnd", '<div class="tutorial-map-overlay"></div>'), 
e.elem = document.body.lastChild, e.elem.innerHTML = i.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
e.elem.addEventListener("click", function(t) {
t.target.classList.contains("tutorial-map-overlay__close") && e.remove();
}), document.addEventListener("keydown", e.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
e.elem.addEventListener("scroll", p), new l(e.elem.firstElementChild);
}), o.addEventListener("fail", function() {
return t.remove();
});
}
var r = i(256), a = i(255), n = i(237), s = i(278), l = i(253), p = i(249);
a.delegateMixin(o.prototype), o.prototype.remove = function() {
this.elem.remove(), document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}, o.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, e.exports = o;
},
253: function(e, t, i) {
"use strict";
function o(e) {
var t = this;
this.elem = e, this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +localStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.layoutSwitch = this.elem.querySelector("[data-tutorial-map-layout-switch]");
var i = +localStorage.isMapSingleColumn;
this.layoutSwitch.querySelector('[value="0"]').checked = !i, this.layoutSwitch.querySelector('[value="1"]').checked = i, 
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
var o = this.elem.querySelector('[href="' + location.pathname + '"]');
o && o.classList.add("tutorial-map__link_active"), this.filterInput.focus();
}
function r(e, t) {
for (var i = 0, o = 0; i < e.length && o < t.length; ) e[i] == t[o] ? (i++, o++) : i++;
return o == t.length;
}
var a = i(290), n = i(255);
o.prototype.showChaptersCollapsed = function() {
for (var e = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"), t = 0; t < e.length; t++) {
var i = e[t];
this.chaptersCollapsed[i.getAttribute("href")] ? i.parentNode.classList.add("tutorial-map__item_collapsed") : i.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}, o.prototype.onLayoutSwitchChange = function() {
this.updateLayout();
}, o.prototype.updateLayout = function() {
var e = +this.elem.querySelector('[name="map-layout"]:checked').value;
e ? this.elem.classList.add("tutorial-map_singlecol") : this.elem.classList.remove("tutorial-map_singlecol"), 
localStorage.isMapSingleColumn = e ? "1" : "0";
}, o.prototype.updateShowTasks = function() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
localStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}, o.prototype.onFilterInput = function(e) {
this.showClearButton(e.target.value), this.throttleFilter(e.target.value);
}, o.prototype.onFilterKeydown = function(e) {
27 == e.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}, o.prototype.showClearButton = function(e) {
e ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}, o.prototype.focus = function() {
this.elem.tabIndex = -1, this.elem.focus();
}, o.prototype.filter = function(e) {
function t(t) {
return r(t.querySelector("a").innerHTML.toLowerCase(), e.replace(/\s/g, ""));
}
e = e.toLowerCase();
for (var i = this.showTasksCheckbox.checked, o = (this.elem.querySelectorAll(".tutorial-map-link"), 
this.elem.querySelectorAll(".tutorial-map__item")), a = 0; a < o.length; a++) {
var n = o[a], s = n.querySelectorAll(".tutorial-map__sub-item"), l = Array.prototype.reduce.call(s, function(e, o) {
var r = !1;
if (i) {
var a = o.querySelectorAll(".tutorial-map__sub-sub-item");
r = Array.prototype.reduce.call(a, function(e, i) {
var o = t(i);
return i.hidden = !o, e || o;
}, !1);
}
var n = r || t(o);
return o.hidden = !n, e || n;
}, !1);
n.hidden = !(l || t(n));
}
}, o.prototype.throttleFilter = a(o.prototype.filter, 200), n.delegateMixin(o.prototype), 
e.exports = o;
},
256: function(e, t, i) {
"use strict";
function o(e) {
function t(e, t) {
var i = new CustomEvent(e);
return i.originalEvent = t, i;
}
function i(e, i) {
var o = t("fail", i);
o.reason = e, r.dispatchEvent(o);
}
function o(e, i) {
var o = t("success", i);
o.result = e, r.dispatchEvent(o);
}
var r = new XMLHttpRequest(), n = e.method || "GET", s = e.body, l = e.url;
r.open(n, l, e.sync ? !1 : !0), r.method = n;
var p = a();
p && !e.skipCsrf && r.setRequestHeader("X-XSRF-TOKEN", p), "[object Object]" == {}.toString.call(s) && (r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (r.addEventListener("loadstart", function(e) {
r.timeStart = Date.now();
var i = t("xhrstart", e);
document.dispatchEvent(i);
}), r.addEventListener("loadend", function(e) {
var i = t("xhrend", e);
document.dispatchEvent(i);
}), r.addEventListener("success", function(e) {
var i = t("xhrsuccess", e);
i.result = e.result, document.dispatchEvent(i);
}), r.addEventListener("fail", function(e) {
var i = t("xhrfail", e);
i.reason = e.reason, document.dispatchEvent(i);
})), e.raw || r.setRequestHeader("Accept", "application/json"), r.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var c = e.normalStatuses || [ 200 ];
return r.addEventListener("error", function(e) {
i("Ошибка связи с сервером.", e);
}), r.addEventListener("timeout", function(e) {
i("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), r.addEventListener("abort", function(e) {
i("Запрос был прерван.", e);
}), r.addEventListener("load", function(t) {
if (!r.status) return void i("Не получен ответ от сервера.", t);
if (-1 == c.indexOf(r.status)) return void i("Ошибка на стороне сервера (код " + r.status + "), попытайтесь позднее", t);
var a = r.responseText, n = r.getResponseHeader("Content-Type");
if (n.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void i("Некорректный формат ответа от сервера", t);
}
o(a, t);
}), setTimeout(function() {
r.send(s);
}, 0), r;
}
var r = i(251), a = i(291);
document.addEventListener("xhrfail", function(e) {
new r.Error(e.reason);
}), e.exports = o;
},
277: function(e, t, i) {
"use strict";
function o(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), i = 0; i < t.length; i++) {
var o = t[i];
new n(o), o.setAttribute("data-prism-done", "1");
}
}
function r(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), i = 0; i < t.length; i++) new s(t[i]), 
t[i].setAttribute("data-prism-done", "1");
}
function a(e) {
o(e), r(e);
}
i(173), i(174), i(175), i(176), i(177), i(178), i(179), i(180), i(181), i(182), 
i(183), i(184), i(185), i(186), i(187), Prism.tokenTag = "code";
var n = i(294), s = i(295);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
a(document);
});
}, t.highlight = a;
},
291: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
294: function(e, t, i) {
"use strict";
function o(e) {
function t() {
var e = f.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(b, "https://ru.lookatcode.com/showjs");
}
function i() {
var t;
if (m && e.hasAttribute("data-refresh") && (m.remove(), m = null), m || (m = e.querySelector(".code-result")), 
m) t = m.querySelector("iframe"); else {
if (m = document.createElement("div"), m.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var i = +e.getAttribute("data-demo-height");
t.style.height = i + "px";
}
m.appendChild(t), e.appendChild(m);
}
if (h) {
var o = t.contentDocument || t.contentWindow.document;
o.open(), o.write(c(b)), o.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(o.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || n.iframe(t), w && e.hasAttribute("data-autorun") || s(m) || m.scrollIntoView(!1);
} else {
var r = document.createElement("form");
r.style.display = "none", r.method = "POST", r.enctype = "multipart/form-data", 
r.action = "https://ru.lookatcode.com/showhtml", r.target = t.name;
var a = document.createElement("textarea");
a.name = "code", a.value = c(b), r.appendChild(a), t.parentNode.insertBefore(r, t.nextSibling), 
r.submit(), r.remove(), w && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || n.iframe(t), s(m) || m.scrollIntoView(!1);
});
}
}
function o() {
if (h) try {
window.eval.call(window, b);
} catch (i) {
alert("Ошибка: " + i.message);
} else e.hasAttribute("data-refresh") && f && (f.remove(), f = null), f ? t() : (f = document.createElement("iframe"), 
f.className = "js-frame", f.src = "https://ru.lookatcode.com/showjs", f.style.width = 0, 
f.style.height = 0, f.style.border = "none", f.onload = function() {
t();
}, document.body.appendChild(f));
}
function p() {
var e;
if (x) e = c(b); else {
var t = b.replace(/^/gim, "    ");
e = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + t + "\n  </script>\n</body>\n\n</html>";
}
var i = document.createElement("form");
i.action = "http://plnkr.co/edit/?p=preview", i.method = "POST", i.target = "_blank", 
document.body.appendChild(i);
var o = document.createElement("textarea");
o.name = "files[index.html]", o.value = e, i.appendChild(o);
var r = document.createElement("input");
r.name = "description", r.value = "Fork from " + window.location, i.appendChild(r), 
i.submit(), i.remove();
}
function c() {
var e = b.toLowerCase(), t = e.match("<body>"), i = e.match("</body>"), o = e.match("<html>"), r = e.match("</html>"), a = e.match(/^\s*<!doctype/);
if (a) return b;
var n = b;
return o || (n = "<html>\n" + n), r || (n += "\n</html>"), t || (n = n.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
i || (n = n.replace("</html>", "\n</body>\n</html>")), n = "<!DOCTYPE HTML>\n" + n;
}
function d() {
g ? o() : i(), w = !1;
}
var _ = e.querySelector("pre"), u = _.querySelector("code"), b = u.textContent;
Prism.highlightElement(u), l(_), r(_, e.getAttribute("data-highlight-block")), a(_, e.getAttribute("data-highlight-inline"));
var f, m, g = _.classList.contains("language-javascript"), x = _.classList.contains("language-markup"), h = +e.getAttribute("data-trusted"), w = !0;
if (g || x) {
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
function r(e, t) {
if (t) for (var i, o = t.replace(/\s+/g, "").split(","), r = 0; i = o[r++]; ) {
i = i.split("-");
var a = +i[0], n = +i[1] || a, s = '<code class="block-highlight" data-start="' + a + '" data-end="' + n + '">' + Array(a + 1).join("\n") + '<code class="mask">' + Array(n - a + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", s);
}
}
function a(e, t) {
var i = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var o = 0; o < t.length; o++) {
var r = t[o].split(":"), a = +r[0], n = r[1].split("-"), s = +n[0], l = +n[1], p = '<code class="inline-highlight">' + Array(a + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(l - s + 1).join(" ") + "</code></code>";
i.insertAdjacentHTML("afterBegin", p);
}
}
var n = i(246), s = i(305), l = i(303);
e.exports = o;
},
295: function(e, t, i) {
"use strict";
function o(e) {
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
var r = i(255), a = i(303);
o.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, i = e.delegateTarget.parentNode.children, o = this.elem.querySelector("[data-code-tabs-content]").children, r = 0; r < i.length; r++) {
var a = i[r], n = o[r];
a == e.delegateTarget ? (t = r, n.classList.add("code-tabs__section_current"), a.classList.add("code-tabs__switch_current")) : (n.classList.remove("code-tabs__section_current"), 
a.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(o[t]));
}, o.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), i = t.querySelector("code");
Prism.highlightElement(i), a(t), e.highlighted = !0;
}
}, o.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, r.delegateMixin(o.prototype), e.exports = o;
},
303: function(e) {
"use strict";
function t(e) {
var t, i = 1 + e.innerHTML.split("\n").length, o = Array(i);
o = o.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", 
t.innerHTML = o, e.hasAttribute("data-start") && (e.style.counterReset = "linenumber " + +e.dataset.start - 1), 
e.appendChild(t);
}
e.exports = t;
},
305: function(e) {
"use strict";
function t(e) {
var t = e.getBoundingClientRect(), i = 0;
if (t.top < 0) i = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
i = window.innerHeight - top;
}
return i > 10;
}
e.exports = t;
}
});
//# sourceMappingURL=tutorial.448f6b082c56dfa2216b.js.map
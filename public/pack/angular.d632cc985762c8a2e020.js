var angular = webpackJsonp_name_([ 4 ], {
0: function(t, e, n) {
"use strict";
t.exports = n(3), n(61), n(62), n(63), n(4), n(5), n(6), n(64), n(58);
},
3: function(t, e, n) {
"use strict";
t.exports = n(82);
},
4: function(t, e, n) {
"use strict";
var r = n(23), i = n(3);
i.module("global403Interceptor", []).factory("http403Interceptor", [ "$q", "$log", function(t, e) {
return {
response: function(e) {
return e || t.when(e);
},
responseError: function(n) {
return e.error("error with status " + n.status), e.error(n), 401 == n.status ? new r.Error("Нет авторизации: вы вышли с сайта?") : n.status >= 500 ? new r.Error("Ошибка " + n.status + " на стороне сервера. Попытайтесь позднее.") : n.status || new r.Error("Сетевая ошибка. Нет связи?"), 
t.reject(n);
}
};
} ]).config([ "$provide", "$httpProvider", function(t, e) {
return e.interceptors.push("http403Interceptor");
} ]);
},
5: function(t, e, n) {
"use strict";
var r = n(53), i = n(3);
i.module("progress", []).directive("progressSpinner", function() {
return {
restrict: "A",
link: function(t, e, n) {
var i = t.$eval(n.progressSpinner) || {};
i.elem = e[0];
var o = new r(i);
t.$watch(n.progress, function(t) {
t ? o.start() : o.stop();
});
}
};
}).directive("progressOverlay", function() {
return {
restrict: "A",
link: function(t, e, n) {
var r = t.$eval(n.progressOverlay) || {}, i = r.type || "light";
t.$watch(n.progress, function(t) {
t ? e.addClass("modal-overlay_" + i) : e.removeClass("modal-overlay_" + i);
});
}
};
});
},
6: function(t, e, n) {
"use strict";
var r = n(3);
r.module("focusOn", []).directive("focusOn", [ "$timeout", function(t) {
return {
scope: {
trigger: "=focusOn"
},
link: function(e, n) {
e.$watch("trigger", function(e) {
e && t(function() {
n[0].focus();
});
});
}
};
} ]);
},
58: function() {
!function() {
angular.module("ajoslin.promise-tracker").config([ "$httpProvider", function(t) {
t.interceptors.push([ "$q", "promiseTracker", function(t) {
return {
request: function(e) {
return e.tracker && (angular.isArray(e.tracker) || (e.tracker = [ e.tracker ]), 
e.$promiseTrackerDeferred = e.$promiseTrackerDeferred || [], angular.forEach(e.tracker, function(t) {
var n = t.createPromise();
e.$promiseTrackerDeferred.push(n);
})), t.when(e);
},
response: function(e) {
return e.config && e.config.$promiseTrackerDeferred && angular.forEach(e.config.$promiseTrackerDeferred, function(t) {
t.resolve(e);
}), t.when(e);
},
responseError: function(e) {
return e.config && e.config.$promiseTrackerDeferred && angular.forEach(e.config.$promiseTrackerDeferred, function(t) {
t.reject(e);
}), t.reject(e);
}
};
} ]);
} ]);
}();
},
61: function() {
/**
	 * @license AngularJS v1.3.15
	 * (c) 2010-2014 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t && "hasOwnProperty" !== t && s.test("." + t);
}
function i(t, e) {
if (!r(e)) throw a("badmember", 'Dotted member path "@{0}" is invalid.', e);
for (var i = e.split("."), o = 0, s = i.length; s > o && t !== n; o++) {
var u = i[o];
t = null !== t ? t[u] : n;
}
return t;
}
function o(t, n) {
n = n || {}, e.forEach(n, function(t, e) {
delete n[e];
});
for (var r in t) !t.hasOwnProperty(r) || "$" === r.charAt(0) && "$" === r.charAt(1) || (n[r] = t[r]);
return n;
}
var a = e.$$minErr("$resource"), s = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
e.module("ngResource", [ "ng" ]).provider("$resource", function() {
var t = this;
this.defaults = {
stripTrailingSlashes: !0,
actions: {
get: {
method: "GET"
},
save: {
method: "POST"
},
query: {
method: "GET",
isArray: !0
},
remove: {
method: "DELETE"
},
"delete": {
method: "DELETE"
}
}
}, this.$get = [ "$http", "$q", function(r, s) {
function u(t) {
return c(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
}
function c(t, e) {
return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, e ? "%20" : "+");
}
function l(e, n) {
this.template = e, this.defaults = d({}, t.defaults, n), this.urlParams = {};
}
function f(u, c, m, g) {
function y(t, e) {
var n = {};
return e = d({}, c, e), p(e, function(e, r) {
v(e) && (e = e()), n[r] = e && e.charAt && "@" == e.charAt(0) ? i(t, e.substr(1)) : e;
}), n;
}
function b(t) {
return t.resource;
}
function w(t) {
o(t || {}, this);
}
var x = new l(u, g);
return m = d({}, t.defaults.actions, m), w.prototype.toJSON = function() {
var t = d({}, this);
return delete t.$promise, delete t.$resolved, t;
}, p(m, function(t, i) {
var u = /^(POST|PUT|PATCH)$/i.test(t.method);
w[i] = function(c, l, f, m) {
var g, k, E, S = {};
switch (arguments.length) {
case 4:
E = m, k = f;

case 3:
case 2:
if (!v(l)) {
S = c, g = l, k = f;
break;
}
if (v(c)) {
k = c, E = l;
break;
}
k = l, E = f;

case 1:
v(c) ? k = c : u ? g = c : S = c;
break;

case 0:
break;

default:
throw a("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length);
}
var C = this instanceof w, A = C ? g : t.isArray ? [] : new w(g), O = {}, _ = t.interceptor && t.interceptor.response || b, T = t.interceptor && t.interceptor.responseError || n;
p(t, function(t, e) {
"params" != e && "isArray" != e && "interceptor" != e && (O[e] = $(t));
}), u && (O.data = g), x.setUrlParams(O, d({}, y(g, t.params || {}), S), t.url);
var M = r(O).then(function(n) {
var r = n.data, s = A.$promise;
if (r) {
if (e.isArray(r) !== !!t.isArray) throw a("badcfg", "Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2}", i, t.isArray ? "array" : "object", e.isArray(r) ? "array" : "object");
t.isArray ? (A.length = 0, p(r, function(t) {
"object" == typeof t ? A.push(new w(t)) : A.push(t);
})) : (o(r, A), A.$promise = s);
}
return A.$resolved = !0, n.resource = A, n;
}, function(t) {
return A.$resolved = !0, (E || h)(t), s.reject(t);
});
return M = M.then(function(t) {
var e = _(t);
return (k || h)(e, t.headers), e;
}, T), C ? M : (A.$promise = M, A.$resolved = !1, A);
}, w.prototype["$" + i] = function(t, e, n) {
v(t) && (n = e, e = t, t = {});
var r = w[i].call(this, t, this, e, n);
return r.$promise || r;
};
}), w.bind = function(t) {
return f(u, d({}, c, t), m);
}, w;
}
var h = e.noop, p = e.forEach, d = e.extend, $ = e.copy, v = e.isFunction;
return l.prototype = {
setUrlParams: function(t, n, r) {
var i, o, s = this, c = r || s.template, l = s.urlParams = {};
p(c.split(/\W/), function(t) {
if ("hasOwnProperty" === t) throw a("badname", "hasOwnProperty is not a valid parameter name.");
!RegExp("^\\d+$").test(t) && t && RegExp("(^|[^\\\\]):" + t + "(\\W|$)").test(c) && (l[t] = !0);
}), c = c.replace(/\\:/g, ":"), n = n || {}, p(s.urlParams, function(t, r) {
i = n.hasOwnProperty(r) ? n[r] : s.defaults[r], e.isDefined(i) && null !== i ? (o = u(i), 
c = c.replace(RegExp(":" + r + "(\\W|$)", "g"), function(t, e) {
return o + e;
})) : c = c.replace(RegExp("(/?):" + r + "(\\W|$)", "g"), function(t, e, n) {
return "/" == n.charAt(0) ? n : e + n;
});
}), s.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/"), c = c.replace(/\/\.(?=\w+($|\?))/, "."), 
t.url = c.replace(/\/\\\./, "/."), p(n, function(e, n) {
s.urlParams[n] || (t.params = t.params || {}, t.params[n] = e);
});
}
}, f;
} ];
});
}(window, window.angular);
},
62: function() {
/**
	 * @license AngularJS v1.3.15
	 * (c) 2010-2014 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e) {
"use strict";
e.module("ngMessages", []).directive("ngMessages", [ "$compile", "$animate", "$templateRequest", function(t, n, r) {
var i = "ng-active", o = "ng-inactive";
return {
restrict: "AE",
controller: function() {
this.$renderNgMessageClasses = e.noop;
var t = [];
this.registerMessage = function(e, n) {
for (var r = 0; r < t.length; r++) if (t[r].type == n.type) {
if (e != r) {
var i = t[e];
t[e] = t[r], e < t.length ? t[r] = i : t.splice(0, r);
}
return;
}
t.splice(e, 0, n);
}, this.renderMessages = function(n, r) {
function i(t) {
return null !== t && t !== !1 && t;
}
n = n || {};
var o;
e.forEach(t, function(t) {
o && !r || !i(n[t.type]) ? t.detach() : (t.attach(), o = !0);
}), this.renderElementClasses(o);
};
},
require: "ngMessages",
link: function(a, s, u, c) {
c.renderElementClasses = function(t) {
t ? n.setClass(s, i, o) : n.setClass(s, o, i);
};
var l, f = e.isString(u.ngMessagesMultiple) || e.isString(u.multiple), h = u.ngMessages || u.for;
a.$watchCollection(h, function(t) {
l = t, c.renderMessages(t, f);
});
var p = u.ngMessagesInclude || u.include;
p && r(p).then(function(n) {
var r, i = e.element("<div/>").html(n);
e.forEach(i.children(), function(n) {
n = e.element(n), r ? r.after(n) : s.prepend(n), r = n, t(n)(a);
}), c.renderMessages(l, f);
});
}
};
} ]).directive("ngMessage", [ "$animate", function(t) {
var e = 8;
return {
require: "^ngMessages",
transclude: "element",
terminal: !0,
restrict: "AE",
link: function(n, r, i, o, a) {
for (var s, u, c = r[0], l = c.parentNode, f = 0, h = 0; f < l.childNodes.length; f++) {
var p = l.childNodes[f];
if (p.nodeType == e && p.nodeValue.indexOf("ngMessage") >= 0) {
if (p === c) {
s = h;
break;
}
h++;
}
}
o.registerMessage(s, {
type: i.ngMessage || i.when,
attach: function() {
u || a(n, function(e) {
t.enter(e, null, r), u = e;
});
},
detach: function() {
u && (t.leave(u), u = null);
}
});
}
};
} ]);
}(window, window.angular);
},
63: function(t, e) {
/**
	 * State-based routing for AngularJS
	 * @version v0.2.15
	 * @link http://angular-ui.github.com/
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
void 0 !== t && void 0 !== e && t.exports === e && (t.exports = "ui.router"), function(t, e, n) {
"use strict";
function r(t, e) {
return I(new (I(function() {}, {
prototype: t
}))(), e);
}
function i(t) {
return V(arguments, function(e) {
e !== t && V(e, function(e, n) {
t.hasOwnProperty(n) || (t[n] = e);
});
}), t;
}
function o(t, e) {
var n = [];
for (var r in t.path) {
if (t.path[r] !== e.path[r]) break;
n.push(t.path[r]);
}
return n;
}
function a(t) {
if (Object.keys) return Object.keys(t);
var e = [];
return V(t, function(t, n) {
e.push(n);
}), e;
}
function s(t, e) {
if (Array.prototype.indexOf) return t.indexOf(e, +arguments[2] || 0);
var n = t.length >>> 0, r = +arguments[2] || 0;
for (r = 0 > r ? Math.ceil(r) : Math.floor(r), 0 > r && (r += n); n > r; r++) if (r in t && t[r] === e) return r;
return -1;
}
function u(t, e, n, r) {
var i, u = o(n, r), c = {}, l = [];
for (var f in u) if (u[f].params && (i = a(u[f].params), i.length)) for (var h in i) s(l, i[h]) >= 0 || (l.push(i[h]), 
c[i[h]] = t[i[h]]);
return I({}, c, e);
}
function c(t, e, n) {
if (!n) {
n = [];
for (var r in t) n.push(r);
}
for (var i = 0; i < n.length; i++) {
var o = n[i];
if (t[o] != e[o]) return !1;
}
return !0;
}
function l(t, e) {
var n = {};
return V(t, function(t) {
n[t] = e[t];
}), n;
}
function f(t) {
var e = {}, n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
return V(n, function(n) {
n in t && (e[n] = t[n]);
}), e;
}
function h(t) {
var e = {}, n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
for (var r in t) -1 == s(n, r) && (e[r] = t[r]);
return e;
}
function p(t, e) {
var n = D(t), r = n ? [] : {};
return V(t, function(t, i) {
e(t, i) && (r[n ? r.length : i] = t);
}), r;
}
function d(t, e) {
var n = D(t) ? [] : {};
return V(t, function(t, r) {
n[r] = e(t, r);
}), n;
}
function $(t, e) {
var r = 1, o = 2, u = {}, c = [], l = u, f = I(t.when(u), {
$$promises: u,
$$values: u
});
this.study = function(u) {
function p(t, n) {
if (g[n] !== o) {
if (m.push(n), g[n] === r) throw m.splice(0, s(m, n)), Error("Cyclic dependency: " + m.join(" -> "));
if (g[n] = r, q(t)) v.push(n, [ function() {
return e.get(t);
} ], c); else {
var i = e.annotate(t);
V(i, function(t) {
t !== n && u.hasOwnProperty(t) && p(u[t], t);
}), v.push(n, t, i);
}
m.pop(), g[n] = o;
}
}
function d(t) {
return N(t) && t.then && t.$$promises;
}
if (!N(u)) throw Error("'invocables' must be an object");
var $ = a(u || {}), v = [], m = [], g = {};
return V(u, p), u = m = g = null, function(r, o, a) {
function s() {
--b || (w || i(y, o.$$values), m.$$values = y, m.$$promises = m.$$promises || !0, 
delete m.$$inheritedValues, p.resolve(y));
}
function u(t) {
m.$$failure = t, p.reject(t);
}
function c(n, i, o) {
function c(t) {
f.reject(t), u(t);
}
function l() {
if (!P(m.$$failure)) try {
f.resolve(e.invoke(i, a, y)), f.promise.then(function(t) {
y[n] = t, s();
}, c);
} catch (t) {
c(t);
}
}
var f = t.defer(), h = 0;
V(o, function(t) {
g.hasOwnProperty(t) && !r.hasOwnProperty(t) && (h++, g[t].then(function(e) {
y[t] = e, --h || l();
}, c));
}), h || l(), g[n] = f.promise;
}
if (d(r) && a === n && (a = o, o = r, r = null), r) {
if (!N(r)) throw Error("'locals' must be an object");
} else r = l;
if (o) {
if (!d(o)) throw Error("'parent' must be a promise returned by $resolve.resolve()");
} else o = f;
var p = t.defer(), m = p.promise, g = m.$$promises = {}, y = I({}, r), b = 1 + v.length / 3, w = !1;
if (P(o.$$failure)) return u(o.$$failure), m;
o.$$inheritedValues && i(y, h(o.$$inheritedValues, $)), I(g, o.$$promises), o.$$values ? (w = i(y, h(o.$$values, $)), 
m.$$inheritedValues = h(o.$$values, $), s()) : (o.$$inheritedValues && (m.$$inheritedValues = h(o.$$inheritedValues, $)), 
o.then(s, u));
for (var x = 0, k = v.length; k > x; x += 3) r.hasOwnProperty(v[x]) ? s() : c(v[x], v[x + 1], v[x + 2]);
return m;
};
}, this.resolve = function(t, e, n, r) {
return this.study(t)(e, n, r);
};
}
function v(t, e, n) {
this.fromConfig = function(t, e, n) {
return P(t.template) ? this.fromString(t.template, e) : P(t.templateUrl) ? this.fromUrl(t.templateUrl, e) : P(t.templateProvider) ? this.fromProvider(t.templateProvider, e, n) : null;
}, this.fromString = function(t, e) {
return R(t) ? t(e) : t;
}, this.fromUrl = function(n, r) {
return R(n) && (n = n(r)), null == n ? null : t.get(n, {
cache: e,
headers: {
Accept: "text/html"
}
}).then(function(t) {
return t.data;
});
}, this.fromProvider = function(t, e, r) {
return n.invoke(t, null, r || {
params: e
});
};
}
function m(t, e, i) {
function o(e, n, r, i) {
if (v.push(e), d[e]) return d[e];
if (!/^\w+(-+\w+)*(?:\[\])?$/.test(e)) throw Error("Invalid parameter name '" + e + "' in pattern '" + t + "'");
if ($[e]) throw Error("Duplicate parameter name '" + e + "' in pattern '" + t + "'");
return $[e] = new L.Param(e, n, r, i), $[e];
}
function a(t, e, n, r) {
var i = [ "", "" ], o = t.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
if (!e) return o;
switch (n) {
case !1:
i = [ "(", ")" + (r ? "?" : "") ];
break;

case !0:
i = [ "?(", ")?" ];
break;

default:
i = [ "(" + n + "|", ")?" ];
}
return o + i[0] + e + i[1];
}
function s(i, o) {
var a, s, u, c, l;
return a = i[2] || i[3], l = e.params[a], u = t.substring(h, i.index), s = o ? i[4] : i[4] || ("*" == i[1] ? ".*" : null), 
c = L.type(s || "string") || r(L.type("string"), {
pattern: RegExp(s, e.caseInsensitive ? "i" : n)
}), {
id: a,
regexp: s,
segment: u,
type: c,
cfg: l
};
}
e = I({
params: {}
}, N(e) ? e : {});
var u, c = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = "^", h = 0, p = this.segments = [], d = i ? i.params : {}, $ = this.params = i ? i.params.$$new() : new L.ParamSet(), v = [];
this.source = t;
for (var m, g, y; (u = c.exec(t)) && (m = s(u, !1), !(m.segment.indexOf("?") >= 0)); ) g = o(m.id, m.type, m.cfg, "path"), 
f += a(m.segment, g.type.pattern.source, g.squash, g.isOptional), p.push(m.segment), 
h = c.lastIndex;
y = t.substring(h);
var b = y.indexOf("?");
if (b >= 0) {
var w = this.sourceSearch = y.substring(b);
if (y = y.substring(0, b), this.sourcePath = t.substring(0, h + b), w.length > 0) for (h = 0; u = l.exec(w); ) m = s(u, !0), 
g = o(m.id, m.type, m.cfg, "search"), h = c.lastIndex;
} else this.sourcePath = t, this.sourceSearch = "";
f += a(y) + (e.strict === !1 ? "/?" : "") + "$", p.push(y), this.regexp = RegExp(f, e.caseInsensitive ? "i" : n), 
this.prefix = p[0], this.$$paramNames = v;
}
function g(t) {
I(this, t);
}
function y() {
function t(t) {
return null != t ? ("" + t).replace(/\//g, "%2F") : t;
}
function i(t) {
return null != t ? ("" + t).replace(/%2F/g, "/") : t;
}
function o() {
return {
strict: $,
caseInsensitive: h
};
}
function u(t) {
return R(t) || D(t) && R(t[t.length - 1]);
}
function c() {
for (;x.length; ) {
var t = x.shift();
if (t.pattern) throw Error("You cannot override a type's .pattern at runtime.");
e.extend(b[t.name], f.invoke(t.def));
}
}
function l(t) {
I(this, t || {});
}
L = this;
var f, h = !1, $ = !0, v = !1, b = {}, w = !0, x = [], k = {
string: {
encode: t,
decode: i,
is: function(t) {
return null == t || !P(t) || "string" == typeof t;
},
pattern: /[^\/]*/
},
"int": {
encode: t,
decode: function(t) {
return parseInt(t, 10);
},
is: function(t) {
return P(t) && this.decode("" + t) === t;
},
pattern: /\d+/
},
bool: {
encode: function(t) {
return t ? 1 : 0;
},
decode: function(t) {
return 0 !== parseInt(t, 10);
},
is: function(t) {
return t === !0 || t === !1;
},
pattern: /0|1/
},
date: {
encode: function(t) {
return this.is(t) ? [ t.getFullYear(), ("0" + (t.getMonth() + 1)).slice(-2), ("0" + t.getDate()).slice(-2) ].join("-") : n;
},
decode: function(t) {
if (this.is(t)) return t;
var e = this.capture.exec(t);
return e ? new Date(e[1], e[2] - 1, e[3]) : n;
},
is: function(t) {
return t instanceof Date && !isNaN(t.valueOf());
},
equals: function(t, e) {
return this.is(t) && this.is(e) && t.toISOString() === e.toISOString();
},
pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
},
json: {
encode: e.toJson,
decode: e.fromJson,
is: e.isObject,
equals: e.equals,
pattern: /[^\/]*/
},
any: {
encode: e.identity,
decode: e.identity,
equals: e.equals,
pattern: /.*/
}
};
y.$$getDefaultValue = function(t) {
if (!u(t.value)) return t.value;
if (!f) throw Error("Injectable functions cannot be called at configuration time");
return f.invoke(t.value);
}, this.caseInsensitive = function(t) {
return P(t) && (h = t), h;
}, this.strictMode = function(t) {
return P(t) && ($ = t), $;
}, this.defaultSquashPolicy = function(t) {
if (!P(t)) return v;
if (t !== !0 && t !== !1 && !q(t)) throw Error("Invalid squash policy: " + t + ". Valid policies: false, true, arbitrary-string");
return v = t, t;
}, this.compile = function(t, e) {
return new m(t, I(o(), e));
}, this.isMatcher = function(t) {
if (!N(t)) return !1;
var e = !0;
return V(m.prototype, function(n, r) {
R(n) && (e = e && P(t[r]) && R(t[r]));
}), e;
}, this.type = function(t, e, n) {
if (!P(e)) return b[t];
if (b.hasOwnProperty(t)) throw Error("A type named '" + t + "' has already been defined.");
return b[t] = new g(I({
name: t
}, e)), n && (x.push({
name: t,
def: n
}), w || c()), this;
}, V(k, function(t, e) {
b[e] = new g(I({
name: e
}, t));
}), b = r(b, {}), this.$get = [ "$injector", function(t) {
return f = t, w = !1, c(), V(k, function(t, e) {
b[e] || (b[e] = new g(t));
}), this;
} ], this.Param = function(t, e, r, i) {
function o(t) {
var e = N(t) ? a(t) : [], n = -1 === s(e, "value") && -1 === s(e, "type") && -1 === s(e, "squash") && -1 === s(e, "array");
return n && (t = {
value: t
}), t.$$fn = u(t.value) ? t.value : function() {
return t.value;
}, t;
}
function c(e, n, r) {
if (e.type && n) throw Error("Param '" + t + "' has two type configurations.");
return n ? n : e.type ? e.type instanceof g ? e.type : new g(e.type) : "config" === r ? b.any : b.string;
}
function l() {
var e = {
array: "search" === i ? "auto" : !1
}, n = t.match(/\[\]$/) ? {
array: !0
} : {};
return I(e, n, r).array;
}
function h(t, e) {
var n = t.squash;
if (!e || n === !1) return !1;
if (!P(n) || null == n) return v;
if (n === !0 || q(n)) return n;
throw Error("Invalid squash policy: '" + n + "'. Valid policies: false, true, or arbitrary string");
}
function $(t, e, r, i) {
var o, a, u = [ {
from: "",
to: r || e ? n : ""
}, {
from: null,
to: r || e ? n : ""
} ];
return o = D(t.replace) ? t.replace : [], q(i) && o.push({
from: i,
to: n
}), a = d(o, function(t) {
return t.from;
}), p(u, function(t) {
return -1 === s(a, t.from);
}).concat(o);
}
function m() {
if (!f) throw Error("Injectable functions cannot be called at configuration time");
var t = f.invoke(r.$$fn);
if (null !== t && t !== n && !x.type.is(t)) throw Error("Default value (" + t + ") for parameter '" + x.id + "' is not an instance of Type (" + x.type.name + ")");
return t;
}
function y(t) {
function e(t) {
return function(e) {
return e.from === t;
};
}
function n(t) {
var n = d(p(x.replace, e(t)), function(t) {
return t.to;
});
return n.length ? n[0] : t;
}
return t = n(t), P(t) ? x.type.$normalize(t) : m();
}
function w() {
return "{Param:" + t + " " + e + " squash: '" + S + "' optional: " + E + "}";
}
var x = this;
r = o(r), e = c(r, e, i);
var k = l();
e = k ? e.$asArray(k, "search" === i) : e, "string" !== e.name || k || "path" !== i || r.value !== n || (r.value = "");
var E = r.value !== n, S = h(r, E), C = $(r, k, E, S);
I(this, {
id: t,
type: e,
location: i,
array: k,
squash: S,
replace: C,
isOptional: E,
value: y,
dynamic: n,
config: r,
toString: w
});
}, l.prototype = {
$$new: function() {
return r(this, I(new l(), {
$$parent: this
}));
},
$$keys: function() {
for (var t = [], e = [], n = this, r = a(l.prototype); n; ) e.push(n), n = n.$$parent;
return e.reverse(), V(e, function(e) {
V(a(e), function(e) {
-1 === s(t, e) && -1 === s(r, e) && t.push(e);
});
}), t;
},
$$values: function(t) {
var e = {}, n = this;
return V(n.$$keys(), function(r) {
e[r] = n[r].value(t && t[r]);
}), e;
},
$$equals: function(t, e) {
var n = !0, r = this;
return V(r.$$keys(), function(i) {
var o = t && t[i], a = e && e[i];
r[i].type.equals(o, a) || (n = !1);
}), n;
},
$$validates: function(t) {
var r, i, o, a, s, u = this.$$keys();
for (r = 0; r < u.length && (i = this[u[r]], o = t[u[r]], o !== n && null !== o || !i.isOptional); r++) {
if (a = i.type.$normalize(o), !i.type.is(a)) return !1;
if (s = i.type.encode(a), e.isString(s) && !i.type.pattern.exec(s)) return !1;
}
return !0;
},
$$parent: n
}, this.ParamSet = l;
}
function b(t, r) {
function i(t) {
var e = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(t.source);
return null != e ? e[1].replace(/\\(.)/g, "$1") : "";
}
function o(t, e) {
return t.replace(/\$(\$|\d{1,2})/, function(t, n) {
return e["$" === n ? 0 : +n];
});
}
function a(t, e, n) {
if (!n) return !1;
var r = t.invoke(e, e, {
$match: n
});
return P(r) ? r : !0;
}
function s(r, i, o, a) {
function s(t, e, n) {
return "/" === $ ? t : e ? $.slice(0, -1) + t : n ? $.slice(1) + t : t;
}
function h(t) {
function e(t) {
var e = t(o, r);
return e ? (q(e) && r.replace().url(e), !0) : !1;
}
if (!t || !t.defaultPrevented) {
d && r.url() === d;
d = n;
var i, a = c.length;
for (i = 0; a > i; i++) if (e(c[i])) return;
l && e(l);
}
}
function p() {
return u = u || i.$on("$locationChangeSuccess", h);
}
var d, $ = a.baseHref(), v = r.url();
return f || p(), {
sync: function() {
h();
},
listen: function() {
return p();
},
update: function(t) {
return t ? (v = r.url(), n) : (r.url() !== v && (r.url(v), r.replace()), n);
},
push: function(t, e, i) {
var o = t.format(e || {});
null !== o && e && e["#"] && (o += "#" + e["#"]), r.url(o), d = i && i.$$avoidResync ? r.url() : n, 
i && i.replace && r.replace();
},
href: function(n, i, o) {
if (!n.validates(i)) return null;
var a = t.html5Mode();
e.isObject(a) && (a = a.enabled);
var u = n.format(i);
if (o = o || {}, a || null === u || (u = "#" + t.hashPrefix() + u), null !== u && i && i["#"] && (u += "#" + i["#"]), 
u = s(u, a, o.absolute), !o.absolute || !u) return u;
var c = !a && u ? "/" : "", l = r.port();
return l = 80 === l || 443 === l ? "" : ":" + l, r.protocol() + "://" + r.host() + l + c + u;
}
};
}
var u, c = [], l = null, f = !1;
this.rule = function(t) {
if (!R(t)) throw Error("'rule' must be a function");
return c.push(t), this;
}, this.otherwise = function(t) {
if (q(t)) {
var e = t;
t = function() {
return e;
};
} else if (!R(t)) throw Error("'rule' must be a function");
return l = t, this;
}, this.when = function(t, e) {
var n, s = q(e);
if (q(t) && (t = r.compile(t)), !s && !R(e) && !D(e)) throw Error("invalid 'handler' in when()");
var u = {
matcher: function(t, e) {
return s && (n = r.compile(e), e = [ "$match", function(t) {
return n.format(t);
} ]), I(function(n, r) {
return a(n, e, t.exec(r.path(), r.search()));
}, {
prefix: q(t.prefix) ? t.prefix : ""
});
},
regex: function(t, e) {
if (t.global || t.sticky) throw Error("when() RegExp must not be global or sticky");
return s && (n = e, e = [ "$match", function(t) {
return o(n, t);
} ]), I(function(n, r) {
return a(n, e, t.exec(r.path()));
}, {
prefix: i(t)
});
}
}, c = {
matcher: r.isMatcher(t),
regex: t instanceof RegExp
};
for (var l in c) if (c[l]) return this.rule(u[l](t, e));
throw Error("invalid 'what' in when()");
}, this.deferIntercept = function(t) {
t === n && (t = !0), f = t;
}, this.$get = s, s.$inject = [ "$location", "$rootScope", "$injector", "$browser" ];
}
function w(t, i) {
function o(t) {
return 0 === t.indexOf(".") || 0 === t.indexOf("^");
}
function h(t, e) {
if (!t) return n;
var r = q(t), i = r ? t : t.name, a = o(i);
if (a) {
if (!e) throw Error("No reference point given for path '" + i + "'");
e = h(e);
for (var s = i.split("."), u = 0, c = s.length, l = e; c > u; u++) if ("" !== s[u] || 0 !== u) {
if ("^" !== s[u]) break;
if (!l.parent) throw Error("Path '" + i + "' not valid for state '" + e.name + "'");
l = l.parent;
} else l = e;
s = s.slice(u).join("."), i = l.name + (l.name && s ? "." : "") + s;
}
var f = S[i];
return !f || !r && (r || f !== t && f.self !== t) ? n : f;
}
function p(t, e) {
C[t] || (C[t] = []), C[t].push(e);
}
function $(t) {
for (var e = C[t] || []; e.length; ) v(e.shift());
}
function v(e) {
e = r(e, {
self: e,
resolve: e.resolve || {},
toString: function() {
return this.name;
}
});
var n = e.name;
if (!q(n) || n.indexOf("@") >= 0) throw Error("State must have a valid name");
if (S.hasOwnProperty(n)) throw Error("State '" + n + "'' is already defined");
var i = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : q(e.parent) ? e.parent : N(e.parent) && q(e.parent.name) ? e.parent.name : "";
if (i && !S[i]) return p(i, e.self);
for (var o in O) R(O[o]) && (e[o] = O[o](e, O.$delegates[o]));
return S[n] = e, !e[A] && e.url && t.when(e.url, [ "$match", "$stateParams", function(t, n) {
E.$current.navigable == e && c(t, n) || E.transitionTo(e, t, {
inherit: !0,
location: !1
});
} ]), $(n), e;
}
function m(t) {
return t.indexOf("*") > -1;
}
function g(t) {
for (var e = t.split("."), n = E.$current.name.split("."), r = 0, i = e.length; i > r; r++) "*" === e[r] && (n[r] = "*");
return "**" === e[0] && (n = n.slice(s(n, e[1])), n.unshift("**")), "**" === e[e.length - 1] && (n.splice(s(n, e[e.length - 2]) + 1, Number.MAX_VALUE), 
n.push("**")), e.length != n.length ? !1 : n.join("") === e.join("");
}
function y(t, e) {
return q(t) && !P(e) ? O[t] : R(e) && q(t) ? (O[t] && !O.$delegates[t] && (O.$delegates[t] = O[t]), 
O[t] = e, this) : this;
}
function b(t, e) {
return N(t) ? e = t : e.name = t, v(e), this;
}
function w(t, i, o, s, f, p, $) {
function v(e, n, r, o) {
var a = t.$broadcast("$stateNotFound", e, n, r);
if (a.defaultPrevented) return $.update(), C;
if (!a.retry) return null;
if (o.$retry) return $.update(), O;
var s = E.transition = i.when(a.retry);
return s.then(function() {
return s !== E.transition ? b : (e.options.$retry = !0, E.transitionTo(e.to, e.toParams, e.options));
}, function() {
return C;
}), $.update(), s;
}
function y(t, n, r, a, u, c) {
function h() {
var n = [];
return V(t.views, function(r, i) {
var a = r.resolve && r.resolve !== t.resolve ? r.resolve : {};
a.$template = [ function() {
return o.load(i, {
view: r,
locals: u.globals,
params: p,
notify: c.notify
}) || "";
} ], n.push(f.resolve(a, u.globals, u.resolve, t).then(function(n) {
if (R(r.controllerProvider) || D(r.controllerProvider)) {
var o = e.extend({}, a, u.globals);
n.$$controller = s.invoke(r.controllerProvider, null, o);
} else n.$$controller = r.controller;
n.$$state = t, n.$$controllerAs = r.controllerAs, u[i] = n;
}));
}), i.all(n).then(function() {
return u.globals;
});
}
var p = r ? n : l(t.params.$$keys(), n), d = {
$stateParams: p
};
u.resolve = f.resolve(t.resolve, d, u.resolve, t);
var $ = [ u.resolve.then(function(t) {
u.globals = t;
}) ];
return a && $.push(a), i.all($).then(h).then(function() {
return u;
});
}
var b = i.reject(Error("transition superseded")), w = i.reject(Error("transition prevented")), C = i.reject(Error("transition aborted")), O = i.reject(Error("transition failed"));
return k.locals = {
resolve: null,
globals: {
$stateParams: {}
}
}, E = {
params: {},
current: k.self,
$current: k,
transition: null
}, E.reload = function(t) {
return E.transitionTo(E.current, p, {
reload: t || !0,
inherit: !1,
notify: !0
});
}, E.go = function(t, e, n) {
return E.transitionTo(t, e, I({
inherit: !0,
relative: E.$current
}, n));
}, E.transitionTo = function(e, n, o) {
n = n || {}, o = I({
location: !0,
inherit: !1,
relative: null,
notify: !0,
reload: !1,
$retry: !1
}, o || {});
var a, c = E.$current, f = E.params, d = c.path, m = h(e, o.relative), g = n["#"];
if (!P(m)) {
var S = {
to: e,
toParams: n,
options: o
}, C = v(S, c.self, f, o);
if (C) return C;
if (e = S.to, n = S.toParams, o = S.options, m = h(e, o.relative), !P(m)) {
if (!o.relative) throw Error("No such state '" + e + "'");
throw Error("Could not resolve '" + e + "' from state '" + o.relative + "'");
}
}
if (m[A]) throw Error("Cannot transition to abstract state '" + e + "'");
if (o.inherit && (n = u(p, n || {}, E.$current, m)), !m.params.$$validates(n)) return O;
n = m.params.$$values(n), e = m;
var _ = e.path, T = 0, M = _[T], j = k.locals, R = [];
if (o.reload) {
if (q(o.reload) || N(o.reload)) {
if (N(o.reload) && !o.reload.name) throw Error("Invalid reload state object");
var D = o.reload === !0 ? d[0] : h(o.reload);
if (o.reload && !D) throw Error("No such reload state '" + (q(o.reload) ? o.reload : o.reload.name) + "'");
for (;M && M === d[T] && M !== D; ) j = R[T] = M.locals, T++, M = _[T];
}
} else for (;M && M === d[T] && M.ownParams.$$equals(n, f); ) j = R[T] = M.locals, 
T++, M = _[T];
if (x(e, n, c, f, j, o)) return g && (n["#"] = g), E.params = n, F(E.params, p), 
o.location && e.navigable && e.navigable.url && ($.push(e.navigable.url, n, {
$$avoidResync: !0,
replace: "replace" === o.location
}), $.update(!0)), E.transition = null, i.when(E.current);
if (n = l(e.params.$$keys(), n || {}), o.notify && t.$broadcast("$stateChangeStart", e.self, n, c.self, f).defaultPrevented) return t.$broadcast("$stateChangeCancel", e.self, n, c.self, f), 
$.update(), w;
for (var V = i.when(j), L = T; L < _.length; L++, M = _[L]) j = R[L] = r(j), V = y(M, n, M === e, V, j, o);
var U = E.transition = V.then(function() {
var r, i, a;
if (E.transition !== U) return b;
for (r = d.length - 1; r >= T; r--) a = d[r], a.self.onExit && s.invoke(a.self.onExit, a.self, a.locals.globals), 
a.locals = null;
for (r = T; r < _.length; r++) i = _[r], i.locals = R[r], i.self.onEnter && s.invoke(i.self.onEnter, i.self, i.locals.globals);
return g && (n["#"] = g), E.transition !== U ? b : (E.$current = e, E.current = e.self, 
E.params = n, F(E.params, p), E.transition = null, o.location && e.navigable && $.push(e.navigable.url, e.navigable.locals.globals.$stateParams, {
$$avoidResync: !0,
replace: "replace" === o.location
}), o.notify && t.$broadcast("$stateChangeSuccess", e.self, n, c.self, f), $.update(!0), 
E.current);
}, function(r) {
return E.transition !== U ? b : (E.transition = null, a = t.$broadcast("$stateChangeError", e.self, n, c.self, f, r), 
a.defaultPrevented || $.update(), i.reject(r));
});
return U;
}, E.is = function(t, e, r) {
r = I({
relative: E.$current
}, r || {});
var i = h(t, r.relative);
return P(i) ? E.$current !== i ? !1 : e ? c(i.params.$$values(e), p) : !0 : n;
}, E.includes = function(t, e, r) {
if (r = I({
relative: E.$current
}, r || {}), q(t) && m(t)) {
if (!g(t)) return !1;
t = E.$current.name;
}
var i = h(t, r.relative);
return P(i) ? P(E.$current.includes[i.name]) ? e ? c(i.params.$$values(e), p, a(e)) : !0 : !1 : n;
}, E.href = function(t, e, r) {
r = I({
lossy: !0,
inherit: !0,
absolute: !1,
relative: E.$current
}, r || {});
var i = h(t, r.relative);
if (!P(i)) return null;
r.inherit && (e = u(p, e || {}, E.$current, i));
var o = i && r.lossy ? i.navigable : i;
return o && o.url !== n && null !== o.url ? $.href(o.url, l(i.params.$$keys().concat("#"), e || {}), {
absolute: r.absolute
}) : null;
}, E.get = function(t, e) {
if (0 === arguments.length) return d(a(S), function(t) {
return S[t].self;
});
var n = h(t, e || E.$current);
return n && n.self ? n.self : null;
}, E;
}
function x(t, e, r, i, o, a) {
function s(t, e, n) {
function r(e) {
return "search" != t.params[e].location;
}
var i = t.params.$$keys().filter(r), o = f.apply({}, [ t.params ].concat(i)), a = new L.ParamSet(o);
return a.$$equals(e, n);
}
return !a.reload && t === r && (o === r.locals || t.self.reloadOnSearch === !1 && s(r, i, e)) ? !0 : n;
}
var k, E, S = {}, C = {}, A = "abstract", O = {
parent: function(t) {
if (P(t.parent) && t.parent) return h(t.parent);
var e = /^(.+)\.[^.]+$/.exec(t.name);
return e ? h(e[1]) : k;
},
data: function(t) {
return t.parent && t.parent.data && (t.data = t.self.data = I({}, t.parent.data, t.data)), 
t.data;
},
url: function(t) {
var e = t.url, n = {
params: t.params || {}
};
if (q(e)) return "^" == e.charAt(0) ? i.compile(e.substring(1), n) : (t.parent.navigable || k).url.concat(e, n);
if (!e || i.isMatcher(e)) return e;
throw Error("Invalid url '" + e + "' in state '" + t + "'");
},
navigable: function(t) {
return t.url ? t : t.parent ? t.parent.navigable : null;
},
ownParams: function(t) {
var e = t.url && t.url.params || new L.ParamSet();
return V(t.params || {}, function(t, n) {
e[n] || (e[n] = new L.Param(n, null, t, "config"));
}), e;
},
params: function(t) {
return t.parent && t.parent.params ? I(t.parent.params.$$new(), t.ownParams) : new L.ParamSet();
},
views: function(t) {
var e = {};
return V(P(t.views) ? t.views : {
"": t
}, function(n, r) {
r.indexOf("@") < 0 && (r += "@" + t.parent.name), e[r] = n;
}), e;
},
path: function(t) {
return t.parent ? t.parent.path.concat(t) : [];
},
includes: function(t) {
var e = t.parent ? I({}, t.parent.includes) : {};
return e[t.name] = !0, e;
},
$delegates: {}
};
k = v({
name: "",
url: "^",
views: null,
"abstract": !0
}), k.navigable = null, this.decorator = y, this.state = b, this.$get = w, w.$inject = [ "$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory" ];
}
function x() {
function t(t, e) {
return {
load: function(n, r) {
var i, o = {
template: null,
controller: null,
view: null,
locals: null,
notify: !0,
async: !0,
params: {}
};
return r = I(o, r), r.view && (i = e.fromConfig(r.view, r.params, r.locals)), i && r.notify && t.$broadcast("$viewContentLoading", r), 
i;
}
};
}
this.$get = t, t.$inject = [ "$rootScope", "$templateFactory" ];
}
function k() {
var t = !1;
this.useAnchorScroll = function() {
t = !0;
}, this.$get = [ "$anchorScroll", "$timeout", function(e, n) {
return t ? e : function(t) {
return n(function() {
t[0].scrollIntoView();
}, 0, !1);
};
} ];
}
function E(t, n, r, i) {
function o() {
return n.has ? function(t) {
return n.has(t) ? n.get(t) : null;
} : function(t) {
try {
return n.get(t);
} catch (e) {
return null;
}
};
}
function a(t, e) {
var n = function() {
return {
enter: function(t, e, n) {
e.after(t), n();
},
leave: function(t, e) {
t.remove(), e();
}
};
};
if (c) return {
enter: function(t, e, n) {
var r = c.enter(t, null, e, n);
r && r.then && r.then(n);
},
leave: function(t, e) {
var n = c.leave(t, e);
n && n.then && n.then(e);
}
};
if (u) {
var r = u && u(e, t);
return {
enter: function(t, e, n) {
r.enter(t, null, e), n();
},
leave: function(t, e) {
r.leave(t), e();
}
};
}
return n();
}
var s = o(), u = s("$animator"), c = s("$animate"), l = {
restrict: "ECA",
terminal: !0,
priority: 400,
transclude: "element",
compile: function(n, o, s) {
return function(n, o, u) {
function c() {
f && (f.remove(), f = null), p && (p.$destroy(), p = null), h && (m.leave(h, function() {
f = null;
}), f = h, h = null);
}
function l(a) {
var l, f = C(n, u, o, i), g = f && t.$current && t.$current.locals[f];
if (a || g !== d) {
l = n.$new(), d = t.$current.locals[f];
var y = s(l, function(t) {
m.enter(t, o, function() {
p && p.$emit("$viewContentAnimationEnded"), (e.isDefined(v) && !v || n.$eval(v)) && r(t);
}), c();
});
h = y, p = l, p.$emit("$viewContentLoaded"), p.$eval($);
}
}
var f, h, p, d, $ = u.onload || "", v = u.autoscroll, m = a(u, n);
n.$on("$stateChangeSuccess", function() {
l(!1);
}), n.$on("$viewContentLoading", function() {
l(!1);
}), l(!0);
};
}
};
return l;
}
function S(t, e, n, r) {
return {
restrict: "ECA",
priority: -400,
compile: function(i) {
var o = i.html();
return function(i, a, s) {
var u = n.$current, c = C(i, s, a, r), l = u && u.locals[c];
if (l) {
a.data("$uiView", {
name: c,
state: l.$$state
}), a.html(l.$template ? l.$template : o);
var f = t(a.contents());
if (l.$$controller) {
l.$scope = i, l.$element = a;
var h = e(l.$$controller, l);
l.$$controllerAs && (i[l.$$controllerAs] = h), a.data("$ngControllerController", h), 
a.children().data("$ngControllerController", h);
}
f(i);
}
};
}
};
}
function C(t, e, n, r) {
var i = r(e.uiView || e.name || "")(t), o = n.inheritedData("$uiView");
return i.indexOf("@") >= 0 ? i : i + "@" + (o ? o.state.name : "");
}
function A(t, e) {
var n, r = t.match(/^\s*({[^}]*})\s*$/);
if (r && (t = e + "(" + r[1] + ")"), n = t.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), 
!n || 4 !== n.length) throw Error("Invalid state ref '" + t + "'");
return {
state: n[1],
paramExpr: n[3] || null
};
}
function O(t) {
var e = t.parent().inheritedData("$uiView");
return e && e.state && e.state.name ? e.state : n;
}
function _(t, r) {
var i = [ "location", "inherit", "reload", "absolute" ];
return {
restrict: "A",
require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
link: function(o, a, s, u) {
var c = A(s.uiSref, t.current.name), l = null, f = O(a) || t.$current, h = "[object SVGAnimatedString]" === Object.prototype.toString.call(a.prop("href")) ? "xlink:href" : "href", p = null, d = "A" === a.prop("tagName").toUpperCase(), $ = "FORM" === a[0].nodeName, v = $ ? "action" : h, m = !0, g = {
relative: f,
inherit: !0
}, y = o.$eval(s.uiSrefOpts) || {};
e.forEach(i, function(t) {
t in y && (g[t] = y[t]);
});
var b = function(r) {
if (r && (l = e.copy(r)), m) {
p = t.href(c.state, l, g);
var i = u[1] || u[0];
return i && i.$$addStateInfo(c.state, l), null === p ? (m = !1, !1) : (s.$set(v, p), 
n);
}
};
c.paramExpr && (o.$watch(c.paramExpr, function(t) {
t !== l && b(t);
}, !0), l = e.copy(o.$eval(c.paramExpr))), b(), $ || a.bind("click", function(e) {
var n = e.which || e.button;
if (!(n > 1 || e.ctrlKey || e.metaKey || e.shiftKey || a.attr("target"))) {
var i = r(function() {
t.go(c.state, l, g);
});
e.preventDefault();
var o = d && !p ? 1 : 0;
e.preventDefault = function() {
o-- <= 0 && r.cancel(i);
};
}
});
}
};
}
function T(t, e, r) {
return {
restrict: "A",
controller: [ "$scope", "$element", "$attrs", function(e, i, o) {
function a() {
s() ? i.addClass(c) : i.removeClass(c);
}
function s() {
for (var t = 0; t < l.length; t++) if (u(l[t].state, l[t].params)) return !0;
return !1;
}
function u(e, r) {
return n !== o.uiSrefActiveEq ? t.is(e.name, r) : t.includes(e.name, r);
}
var c, l = [];
c = r(o.uiSrefActiveEq || o.uiSrefActive || "", !1)(e), this.$$addStateInfo = function(e, n) {
var r = t.get(e, O(i));
l.push({
state: r || {
name: e
},
params: n
}), a();
}, e.$on("$stateChangeSuccess", a);
} ]
};
}
function M(t) {
var e = function(e) {
return t.is(e);
};
return e.$stateful = !0, e;
}
function j(t) {
var e = function(e) {
return t.includes(e);
};
return e.$stateful = !0, e;
}
var P = e.isDefined, R = e.isFunction, q = e.isString, N = e.isObject, D = e.isArray, V = e.forEach, I = e.extend, F = e.copy;
e.module("ui.router.util", [ "ng" ]), e.module("ui.router.router", [ "ui.router.util" ]), 
e.module("ui.router.state", [ "ui.router.router", "ui.router.util" ]), e.module("ui.router", [ "ui.router.state" ]), 
e.module("ui.router.compat", [ "ui.router" ]), $.$inject = [ "$q", "$injector" ], 
e.module("ui.router.util").service("$resolve", $), v.$inject = [ "$http", "$templateCache", "$injector" ], 
e.module("ui.router.util").service("$templateFactory", v);
var L;
m.prototype.concat = function(t, e) {
var n = {
caseInsensitive: L.caseInsensitive(),
strict: L.strictMode(),
squash: L.defaultSquashPolicy()
};
return new m(this.sourcePath + t + this.sourceSearch, I(n, e), this);
}, m.prototype.toString = function() {
return this.source;
}, m.prototype.exec = function(t, e) {
function n(t) {
function e(t) {
return t.split("").reverse().join("");
}
function n(t) {
return t.replace(/\\-/g, "-");
}
var r = e(t).split(/-(?!\\)/), i = d(r, e);
return d(i, n).reverse();
}
var r = this.regexp.exec(t);
if (!r) return null;
e = e || {};
var i, o, a, s = this.parameters(), u = s.length, c = this.segments.length - 1, l = {};
if (c !== r.length - 1) throw Error("Unbalanced capture group in route '" + this.source + "'");
for (i = 0; c > i; i++) {
a = s[i];
var f = this.params[a], h = r[i + 1];
for (o = 0; o < f.replace; o++) f.replace[o].from === h && (h = f.replace[o].to);
h && f.array === !0 && (h = n(h)), l[a] = f.value(h);
}
for (;u > i; i++) a = s[i], l[a] = this.params[a].value(e[a]);
return l;
}, m.prototype.parameters = function(t) {
return P(t) ? this.params[t] || null : this.$$paramNames;
}, m.prototype.validates = function(t) {
return this.params.$$validates(t);
}, m.prototype.format = function(t) {
function e(t) {
return encodeURIComponent(t).replace(/-/g, function(t) {
return "%5C%" + t.charCodeAt(0).toString(16).toUpperCase();
});
}
t = t || {};
var n = this.segments, r = this.parameters(), i = this.params;
if (!this.validates(t)) return null;
var o, a = !1, s = n.length - 1, u = r.length, c = n[0];
for (o = 0; u > o; o++) {
var l = s > o, f = r[o], h = i[f], p = h.value(t[f]), $ = h.isOptional && h.type.equals(h.value(), p), v = $ ? h.squash : !1, m = h.type.encode(p);
if (l) {
var g = n[o + 1];
if (v === !1) null != m && (c += D(m) ? d(m, e).join("-") : encodeURIComponent(m)), 
c += g; else if (v === !0) {
var y = c.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
c += g.match(y)[1];
} else q(v) && (c += v + g);
} else {
if (null == m || $ && v !== !1) continue;
D(m) || (m = [ m ]), m = d(m, encodeURIComponent).join("&" + f + "="), c += (a ? "&" : "?") + (f + "=" + m), 
a = !0;
}
}
return c;
}, g.prototype.is = function() {
return !0;
}, g.prototype.encode = function(t) {
return t;
}, g.prototype.decode = function(t) {
return t;
}, g.prototype.equals = function(t, e) {
return t == e;
}, g.prototype.$subPattern = function() {
var t = "" + this.pattern;
return t.substr(1, t.length - 2);
}, g.prototype.pattern = /.*/, g.prototype.toString = function() {
return "{Type:" + this.name + "}";
}, g.prototype.$normalize = function(t) {
return this.is(t) ? t : this.decode(t);
}, g.prototype.$asArray = function(t, e) {
function r(t, e) {
function r(t, e) {
return function() {
return t[e].apply(t, arguments);
};
}
function i(t) {
return D(t) ? t : P(t) ? [ t ] : [];
}
function o(t) {
switch (t.length) {
case 0:
return n;

case 1:
return "auto" === e ? t[0] : t;

default:
return t;
}
}
function a(t) {
return !t;
}
function s(t, e) {
return function(n) {
n = i(n);
var r = d(n, t);
return e === !0 ? 0 === p(r, a).length : o(r);
};
}
function u(t) {
return function(e, n) {
var r = i(e), o = i(n);
if (r.length !== o.length) return !1;
for (var a = 0; a < r.length; a++) if (!t(r[a], o[a])) return !1;
return !0;
};
}
this.encode = s(r(t, "encode")), this.decode = s(r(t, "decode")), this.is = s(r(t, "is"), !0), 
this.equals = u(r(t, "equals")), this.pattern = t.pattern, this.$normalize = s(r(t, "$normalize")), 
this.name = t.name, this.$arrayMode = e;
}
if (!t) return this;
if ("auto" === t && !e) throw Error("'auto' array mode is for query parameters only");
return new r(this, t);
}, e.module("ui.router.util").provider("$urlMatcherFactory", y), e.module("ui.router.util").run([ "$urlMatcherFactory", function() {} ]), 
b.$inject = [ "$locationProvider", "$urlMatcherFactoryProvider" ], e.module("ui.router.router").provider("$urlRouter", b), 
w.$inject = [ "$urlRouterProvider", "$urlMatcherFactoryProvider" ], e.module("ui.router.state").value("$stateParams", {}).provider("$state", w), 
x.$inject = [], e.module("ui.router.state").provider("$view", x), e.module("ui.router.state").provider("$uiViewScroll", k), 
E.$inject = [ "$state", "$injector", "$uiViewScroll", "$interpolate" ], S.$inject = [ "$compile", "$controller", "$state", "$interpolate" ], 
e.module("ui.router.state").directive("uiView", E), e.module("ui.router.state").directive("uiView", S), 
_.$inject = [ "$state", "$timeout" ], T.$inject = [ "$state", "$stateParams", "$interpolate" ], 
e.module("ui.router.state").directive("uiSref", _).directive("uiSrefActive", T).directive("uiSrefActiveEq", T), 
M.$inject = [ "$state" ], j.$inject = [ "$state" ], e.module("ui.router.state").filter("isState", M).filter("includedByState", j);
}(window, window.angular);
},
64: function() {
!function() {
angular.module("ajoslin.promise-tracker", []).provider("promiseTracker", function() {
this.$get = [ "$q", "$timeout", function(t, e) {
function n(t) {
t && e.cancel(t);
}
return function r(i) {
if (!(this instanceof r)) return new r(i);
i = i || {};
var o, a, s = [], u = this, c = i.minDuration, l = i.activationDelay;
u.active = function() {
return a ? !1 : s.length > 0;
}, u.tracking = function() {
return s.length > 0;
}, u.destroy = u.cancel = function() {
o = n(o), a = n(a);
for (var t = s.length - 1; t >= 0; t--) s[t].resolve();
s.length = 0;
}, u.createPromise = function() {
function r() {
c && (o = e(angular.noop, c));
}
function i() {
return function() {
(o || t.when()).then(function() {
var t = s.indexOf(u);
s.splice(t, 1), 0 === s.length && (a = n(a));
});
};
}
var u = t.defer();
return s.push(u), 1 === s.length && (l ? a = e(function() {
a = n(a), r();
}, l) : r()), u.promise.then(i(!1), i(!0)), u;
}, u.addPromise = function(e) {
if (e = e && (e.$promise || e) || {}, !e.then) throw Error("promiseTracker#addPromise expects a promise object!");
var n = u.createPromise();
return e.then(function(t) {
return n.resolve(t), t;
}, function(e) {
return n.reject(e), t.reject(e);
}), n;
};
};
} ];
});
}();
},
82: function(t) {
/**
	 * @license AngularJS v1.3.15
	 * (c) 2010-2014 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e, n) {
"use strict";
function r(t, e) {
return e = e || Error, function() {
var n, r, i = arguments[0], o = "[" + (t ? t + ":" : "") + i + "] ", a = arguments[1], s = arguments;
for (n = o + a.replace(/\{\d+\}/g, function(t) {
var e = +t.slice(1, -1);
return e + 2 < s.length ? ht(s[e + 2]) : t;
}), n = n + "\nhttp://errors.angularjs.org/1.3.15/" + (t ? t + "/" : "") + i, r = 2; r < arguments.length; r++) n = n + (2 == r ? "?" : "&") + "p" + (r - 2) + "=" + encodeURIComponent(ht(arguments[r]));
return new e(n);
};
}
function i(t) {
if (null == t || S(t)) return !1;
var e = t.length;
return t.nodeType === yr && e ? !0 : b(t) || hr(t) || 0 === e || "number" == typeof e && e > 0 && e - 1 in t;
}
function o(t, e, n) {
var r, a;
if (t) if (k(t)) for (r in t) "prototype" == r || "length" == r || "name" == r || t.hasOwnProperty && !t.hasOwnProperty(r) || e.call(n, t[r], r, t); else if (hr(t) || i(t)) {
var s = "object" != typeof t;
for (r = 0, a = t.length; a > r; r++) (s || r in t) && e.call(n, t[r], r, t);
} else if (t.forEach && t.forEach !== o) t.forEach(e, n, t); else for (r in t) t.hasOwnProperty(r) && e.call(n, t[r], r, t);
return t;
}
function a(t) {
return Object.keys(t).sort();
}
function s(t, e, n) {
for (var r = a(t), i = 0; i < r.length; i++) e.call(n, t[r[i]], r[i]);
return r;
}
function u(t) {
return function(e, n) {
t(n, e);
};
}
function c() {
return ++lr;
}
function l(t, e) {
e ? t.$$hashKey = e : delete t.$$hashKey;
}
function f(t) {
for (var e = t.$$hashKey, n = 1, r = arguments.length; r > n; n++) {
var i = arguments[n];
if (i) for (var o = Object.keys(i), a = 0, s = o.length; s > a; a++) {
var u = o[a];
t[u] = i[u];
}
}
return l(t, e), t;
}
function h(t) {
return parseInt(t, 10);
}
function p(t, e) {
return f(Object.create(t), e);
}
function d() {}
function $(t) {
return t;
}
function v(t) {
return function() {
return t;
};
}
function m(t) {
return n === t;
}
function g(t) {
return n !== t;
}
function y(t) {
return null !== t && "object" == typeof t;
}
function b(t) {
return "string" == typeof t;
}
function w(t) {
return "number" == typeof t;
}
function x(t) {
return "[object Date]" === sr.call(t);
}
function k(t) {
return "function" == typeof t;
}
function E(t) {
return "[object RegExp]" === sr.call(t);
}
function S(t) {
return t && t.window === t;
}
function C(t) {
return t && t.$evalAsync && t.$watch;
}
function A(t) {
return "[object File]" === sr.call(t);
}
function O(t) {
return "[object FormData]" === sr.call(t);
}
function _(t) {
return "[object Blob]" === sr.call(t);
}
function T(t) {
return "boolean" == typeof t;
}
function M(t) {
return t && k(t.then);
}
function j(t) {
return !(!t || !(t.nodeName || t.prop && t.attr && t.find));
}
function P(t) {
var e, n = {}, r = t.split(",");
for (e = 0; e < r.length; e++) n[r[e]] = !0;
return n;
}
function R(t) {
return Xn(t.nodeName || t[0] && t[0].nodeName);
}
function q(t, e) {
var n = t.indexOf(e);
return n >= 0 && t.splice(n, 1), e;
}
function N(t, e, n, r) {
if (S(t) || C(t)) throw ur("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
if (e) {
if (t === e) throw ur("cpi", "Can't copy! Source and destination are identical.");
if (n = n || [], r = r || [], y(t)) {
var i = n.indexOf(t);
if (-1 !== i) return r[i];
n.push(t), r.push(e);
}
var a;
if (hr(t)) {
e.length = 0;
for (var s = 0; s < t.length; s++) a = N(t[s], null, n, r), y(t[s]) && (n.push(t[s]), 
r.push(a)), e.push(a);
} else {
var u = e.$$hashKey;
hr(e) ? e.length = 0 : o(e, function(t, n) {
delete e[n];
});
for (var c in t) t.hasOwnProperty(c) && (a = N(t[c], null, n, r), y(t[c]) && (n.push(t[c]), 
r.push(a)), e[c] = a);
l(e, u);
}
} else if (e = t, t) if (hr(t)) e = N(t, [], n, r); else if (x(t)) e = new Date(t.getTime()); else if (E(t)) e = RegExp(t.source, ("" + t).match(/[^\/]*$/)[0]), 
e.lastIndex = t.lastIndex; else if (y(t)) {
var f = Object.create(Object.getPrototypeOf(t));
e = N(t, f, n, r);
}
return e;
}
function D(t, e) {
if (hr(t)) {
e = e || [];
for (var n = 0, r = t.length; r > n; n++) e[n] = t[n];
} else if (y(t)) {
e = e || {};
for (var i in t) ("$" !== i.charAt(0) || "$" !== i.charAt(1)) && (e[i] = t[i]);
}
return e || t;
}
function V(t, e) {
if (t === e) return !0;
if (null === t || null === e) return !1;
if (t !== t && e !== e) return !0;
var r, i, o, a = typeof t, s = typeof e;
if (a == s && "object" == a) {
if (!hr(t)) {
if (x(t)) return x(e) ? V(t.getTime(), e.getTime()) : !1;
if (E(t)) return E(e) ? "" + t == "" + e : !1;
if (C(t) || C(e) || S(t) || S(e) || hr(e) || x(e) || E(e)) return !1;
o = {};
for (i in t) if ("$" !== i.charAt(0) && !k(t[i])) {
if (!V(t[i], e[i])) return !1;
o[i] = !0;
}
for (i in e) if (!o.hasOwnProperty(i) && "$" !== i.charAt(0) && e[i] !== n && !k(e[i])) return !1;
return !0;
}
if (!hr(e)) return !1;
if ((r = t.length) == e.length) {
for (i = 0; r > i; i++) if (!V(t[i], e[i])) return !1;
return !0;
}
}
return !1;
}
function I(t, e, n) {
return t.concat(ir.call(e, n));
}
function F(t, e) {
return ir.call(t, e || 0);
}
function L(t, e) {
var n = arguments.length > 2 ? F(arguments, 2) : [];
return !k(e) || e instanceof RegExp ? e : n.length ? function() {
return arguments.length ? e.apply(t, I(n, arguments, 0)) : e.apply(t, n);
} : function() {
return arguments.length ? e.apply(t, arguments) : e.call(t);
};
}
function U(t, r) {
var i = r;
return "string" == typeof t && "$" === t.charAt(0) && "$" === t.charAt(1) ? i = n : S(r) ? i = "$WINDOW" : r && e === r ? i = "$DOCUMENT" : C(r) && (i = "$SCOPE"), 
i;
}
function H(t, e) {
return n === t ? n : (w(e) || (e = e ? 2 : null), JSON.stringify(t, U, e));
}
function B(t) {
return b(t) ? JSON.parse(t) : t;
}
function z(t) {
t = er(t).clone();
try {
t.empty();
} catch (e) {}
var n = er("<div>").append(t).html();
try {
return t[0].nodeType === br ? Xn(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(t, e) {
return "<" + Xn(e);
});
} catch (e) {
return Xn(n);
}
}
function G(t) {
try {
return decodeURIComponent(t);
} catch (e) {}
}
function W(t) {
var e, n, r = {};
return o((t || "").split("&"), function(t) {
if (t && (e = t.replace(/\+/g, "%20").split("="), n = G(e[0]), g(n))) {
var i = g(e[1]) ? G(e[1]) : !0;
Yn.call(r, n) ? hr(r[n]) ? r[n].push(i) : r[n] = [ r[n], i ] : r[n] = i;
}
}), r;
}
function J(t) {
var e = [];
return o(t, function(t, n) {
hr(t) ? o(t, function(t) {
e.push(Y(n, !0) + (t === !0 ? "" : "=" + Y(t, !0)));
}) : e.push(Y(n, !0) + (t === !0 ? "" : "=" + Y(t, !0)));
}), e.length ? e.join("&") : "";
}
function X(t) {
return Y(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
}
function Y(t, e) {
return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, e ? "%20" : "+");
}
function K(t, e) {
var n, r, i = vr.length;
for (t = er(t), r = 0; i > r; ++r) if (n = vr[r] + e, b(n = t.attr(n))) return n;
return null;
}
function Z(t, e) {
var n, r, i = {};
o(vr, function(e) {
var i = e + "app";
!n && t.hasAttribute && t.hasAttribute(i) && (n = t, r = t.getAttribute(i));
}), o(vr, function(e) {
var i, o = e + "app";
!n && (i = t.querySelector("[" + o.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(o));
}), n && (i.strictDi = null !== K(n, "strict-di"), e(n, r ? [ r ] : [], i));
}
function Q(r, i, a) {
y(a) || (a = {});
var s = {
strictDi: !1
};
a = f(s, a);
var u = function() {
if (r = er(r), r.injector()) {
var t = r[0] === e ? "document" : z(r);
throw ur("btstrpd", "App Already Bootstrapped with this Element '{0}'", t.replace(/</, "&lt;").replace(/>/, "&gt;"));
}
i = i || [], i.unshift([ "$provide", function(t) {
t.value("$rootElement", r);
} ]), a.debugInfoEnabled && i.push([ "$compileProvider", function(t) {
t.debugInfoEnabled(!0);
} ]), i.unshift("ng");
var n = Bt(i, a.strictDi);
return n.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(t, e, n, r) {
t.$apply(function() {
e.data("$injector", r), n(e)(t);
});
} ]), n;
}, c = /^NG_ENABLE_DEBUG_INFO!/, l = /^NG_DEFER_BOOTSTRAP!/;
return t && c.test(t.name) && (a.debugInfoEnabled = !0, t.name = t.name.replace(c, "")), 
t && !l.test(t.name) ? u() : (t.name = t.name.replace(l, ""), cr.resumeBootstrap = function(t) {
return o(t, function(t) {
i.push(t);
}), u();
}, k(cr.resumeDeferredBootstrap) && cr.resumeDeferredBootstrap(), n);
}
function tt() {
t.name = "NG_ENABLE_DEBUG_INFO!" + t.name, t.location.reload();
}
function et(t) {
var e = cr.element(t).injector();
if (!e) throw ur("test", "no injector found for element argument to getTestability");
return e.get("$$testability");
}
function nt(t, e) {
return e = e || "_", t.replace(mr, function(t, n) {
return (n ? e : "") + t.toLowerCase();
});
}
function rt() {
var e;
gr || (nr = t.jQuery, nr && nr.fn.on ? (er = nr, f(nr.fn, {
scope: Vr.scope,
isolateScope: Vr.isolateScope,
controller: Vr.controller,
injector: Vr.injector,
inheritedData: Vr.inheritedData
}), e = nr.cleanData, nr.cleanData = function(t) {
var n;
if (fr) fr = !1; else for (var r, i = 0; null != (r = t[i]); i++) n = nr._data(r, "events"), 
n && n.$destroy && nr(r).triggerHandler("$destroy");
e(t);
}) : er = bt, cr.element = er, gr = !0);
}
function it(t, e, n) {
if (!t) throw ur("areq", "Argument '{0}' is {1}", e || "?", n || "required");
return t;
}
function ot(t, e, n) {
return n && hr(t) && (t = t[t.length - 1]), it(k(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" : typeof t)), 
t;
}
function at(t, e) {
if ("hasOwnProperty" === t) throw ur("badname", "hasOwnProperty is not a valid {0} name", e);
}
function st(t, e, n) {
if (!e) return t;
for (var r, i = e.split("."), o = t, a = i.length, s = 0; a > s; s++) r = i[s], 
t && (t = (o = t)[r]);
return !n && k(t) ? L(o, t) : t;
}
function ut(t) {
var e = t[0], n = t[t.length - 1], r = [ e ];
do {
if (e = e.nextSibling, !e) break;
r.push(e);
} while (e !== n);
return er(r);
}
function ct() {
return Object.create(null);
}
function lt(t) {
function e(t, e, n) {
return t[e] || (t[e] = n());
}
var n = r("$injector"), i = r("ng"), o = e(t, "angular", Object);
return o.$$minErr = o.$$minErr || r, e(o, "module", function() {
var t = {};
return function(r, o, a) {
var s = function(t, e) {
if ("hasOwnProperty" === t) throw i("badname", "hasOwnProperty is not a valid {0} name", e);
};
return s(r, "module"), o && t.hasOwnProperty(r) && (t[r] = null), e(t, r, function() {
function t(t, n, r, i) {
return i || (i = e), function() {
return i[r || "push"]([ t, n, arguments ]), c;
};
}
if (!o) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
var e = [], i = [], s = [], u = t("$injector", "invoke", "push", i), c = {
_invokeQueue: e,
_configBlocks: i,
_runBlocks: s,
requires: o,
name: r,
provider: t("$provide", "provider"),
factory: t("$provide", "factory"),
service: t("$provide", "service"),
value: t("$provide", "value"),
constant: t("$provide", "constant", "unshift"),
animation: t("$animateProvider", "register"),
filter: t("$filterProvider", "register"),
controller: t("$controllerProvider", "register"),
directive: t("$compileProvider", "directive"),
config: u,
run: function(t) {
return s.push(t), this;
}
};
return a && u(a), c;
});
};
});
}
function ft(t) {
var e = [];
return JSON.stringify(t, function(t, n) {
if (n = U(t, n), y(n)) {
if (e.indexOf(n) >= 0) return "<<already seen>>";
e.push(n);
}
return n;
});
}
function ht(t) {
return "function" == typeof t ? ("" + t).replace(/ \{[\s\S]*$/, "") : n === t ? "undefined" : "string" != typeof t ? ft(t) : t;
}
function pt(e) {
f(e, {
bootstrap: Q,
copy: N,
extend: f,
equals: V,
element: er,
forEach: o,
injector: Bt,
noop: d,
bind: L,
toJson: H,
fromJson: B,
identity: $,
isUndefined: m,
isDefined: g,
isString: b,
isFunction: k,
isObject: y,
isNumber: w,
isElement: j,
isArray: hr,
version: Er,
isDate: x,
lowercase: Xn,
uppercase: Kn,
callbacks: {
counter: 0
},
getTestability: et,
$$minErr: r,
$$csp: $r,
reloadWithDebugInfo: tt
}), rr = lt(t);
try {
rr("ngLocale");
} catch (n) {
rr("ngLocale", []).provider("$locale", ve);
}
rr("ng", [ "ngLocale" ], [ "$provide", function(t) {
t.provider({
$$sanitizeUri: Je
}), t.provider("$compile", Kt).directive({
a: Ti,
input: Wi,
textarea: Wi,
form: qi,
script: Do,
select: Fo,
style: Uo,
option: Lo,
ngBind: Yi,
ngBindHtml: Zi,
ngBindTemplate: Ki,
ngClass: to,
ngClassEven: no,
ngClassOdd: eo,
ngCloak: ro,
ngController: io,
ngForm: Ni,
ngHide: Mo,
ngIf: so,
ngInclude: uo,
ngInit: lo,
ngNonBindable: So,
ngPluralize: Co,
ngRepeat: Ao,
ngShow: To,
ngStyle: jo,
ngSwitch: Po,
ngSwitchWhen: Ro,
ngSwitchDefault: qo,
ngOptions: Io,
ngTransclude: No,
ngModel: xo,
ngList: fo,
ngChange: Qi,
pattern: Bo,
ngPattern: Bo,
required: Ho,
ngRequired: Ho,
minlength: Go,
ngMinlength: Go,
maxlength: zo,
ngMaxlength: zo,
ngValue: Xi,
ngModelOptions: Eo
}).directive({
ngInclude: co
}).directive(Mi).directive(oo), t.provider({
$anchorScroll: zt,
$animate: Jr,
$browser: Jt,
$cacheFactory: Xt,
$controller: ee,
$document: ne,
$exceptionHandler: re,
$filter: sn,
$interpolate: de,
$interval: $e,
$http: le,
$httpBackend: he,
$location: Te,
$log: Me,
$parse: Ue,
$rootScope: We,
$q: He,
$$q: Be,
$sce: Ze,
$sceDelegate: Ke,
$sniffer: Qe,
$templateCache: Yt,
$templateRequest: tn,
$$testability: en,
$timeout: nn,
$window: an,
$$rAF: Ge,
$$asyncCallback: Gt,
$$jqLite: It
});
} ]);
}
function dt() {
return ++Cr;
}
function $t(t) {
return t.replace(_r, function(t, e, n, r) {
return r ? n.toUpperCase() : n;
}).replace(Tr, "Moz$1");
}
function vt(t) {
return !Rr.test(t);
}
function mt(t) {
var e = t.nodeType;
return e === yr || !e || e === xr;
}
function gt(t, e) {
var n, r, i, a, s = e.createDocumentFragment(), u = [];
if (vt(t)) u.push(e.createTextNode(t)); else {
for (n = n || s.appendChild(e.createElement("div")), r = (qr.exec(t) || [ "", "" ])[1].toLowerCase(), 
i = Dr[r] || Dr._default, n.innerHTML = i[1] + t.replace(Nr, "<$1></$2>") + i[2], 
a = i[0]; a--; ) n = n.lastChild;
u = I(u, n.childNodes), n = s.firstChild, n.textContent = "";
}
return s.textContent = "", s.innerHTML = "", o(u, function(t) {
s.appendChild(t);
}), s;
}
function yt(t, n) {
n = n || e;
var r;
return (r = Pr.exec(t)) ? [ n.createElement(r[1]) ] : (r = gt(t, n)) ? r.childNodes : [];
}
function bt(t) {
if (t instanceof bt) return t;
var e;
if (b(t) && (t = pr(t), e = !0), !(this instanceof bt)) {
if (e && "<" != t.charAt(0)) throw jr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
return new bt(t);
}
e ? Tt(this, yt(t)) : Tt(this, t);
}
function wt(t) {
return t.cloneNode(!0);
}
function xt(t, e) {
if (e || Et(t), t.querySelectorAll) for (var n = t.querySelectorAll("*"), r = 0, i = n.length; i > r; r++) Et(n[r]);
}
function kt(t, e, n, r) {
if (g(r)) throw jr("offargs", "jqLite#off() does not support the `selector` argument");
var i = St(t), a = i && i.events, s = i && i.handle;
if (s) if (e) o(e.split(" "), function(e) {
if (g(n)) {
var r = a[e];
if (q(r || [], n), r && r.length > 0) return;
}
Or(t, e, s), delete a[e];
}); else for (e in a) "$destroy" !== e && Or(t, e, s), delete a[e];
}
function Et(t, e) {
var r = t.ng339, i = r && Sr[r];
if (i) {
if (e) return delete i.data[e], n;
i.handle && (i.events.$destroy && i.handle({}, "$destroy"), kt(t)), delete Sr[r], 
t.ng339 = n;
}
}
function St(t, e) {
var r = t.ng339, i = r && Sr[r];
return e && !i && (t.ng339 = r = dt(), i = Sr[r] = {
events: {},
data: {},
handle: n
}), i;
}
function Ct(t, e, n) {
if (mt(t)) {
var r = g(n), i = !r && e && !y(e), o = !e, a = St(t, !i), s = a && a.data;
if (r) s[e] = n; else {
if (o) return s;
if (i) return s && s[e];
f(s, e);
}
}
}
function At(t, e) {
return t.getAttribute ? (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1 : !1;
}
function Ot(t, e) {
e && t.setAttribute && o(e.split(" "), function(e) {
t.setAttribute("class", pr((" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + pr(e) + " ", " ")));
});
}
function _t(t, e) {
if (e && t.setAttribute) {
var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
o(e.split(" "), function(t) {
t = pr(t), -1 === n.indexOf(" " + t + " ") && (n += t + " ");
}), t.setAttribute("class", pr(n));
}
}
function Tt(t, e) {
if (e) if (e.nodeType) t[t.length++] = e; else {
var n = e.length;
if ("number" == typeof n && e.window !== e) {
if (n) for (var r = 0; n > r; r++) t[t.length++] = e[r];
} else t[t.length++] = e;
}
}
function Mt(t, e) {
return jt(t, "$" + (e || "ngController") + "Controller");
}
function jt(t, e, r) {
t.nodeType == xr && (t = t.documentElement);
for (var i = hr(e) ? e : [ e ]; t; ) {
for (var o = 0, a = i.length; a > o; o++) if ((r = er.data(t, i[o])) !== n) return r;
t = t.parentNode || t.nodeType === kr && t.host;
}
}
function Pt(t) {
for (xt(t, !0); t.firstChild; ) t.removeChild(t.firstChild);
}
function Rt(t, e) {
e || xt(t);
var n = t.parentNode;
n && n.removeChild(t);
}
function qt(e, n) {
n = n || t, "complete" === n.document.readyState ? n.setTimeout(e) : er(n).on("load", e);
}
function Nt(t, e) {
var n = Ir[e.toLowerCase()];
return n && Fr[R(t)] && n;
}
function Dt(t, e) {
var n = t.nodeName;
return ("INPUT" === n || "TEXTAREA" === n) && Lr[e];
}
function Vt(t, e) {
var n = function(n, r) {
n.isDefaultPrevented = function() {
return n.defaultPrevented;
};
var i = e[r || n.type], o = i ? i.length : 0;
if (o) {
if (m(n.immediatePropagationStopped)) {
var a = n.stopImmediatePropagation;
n.stopImmediatePropagation = function() {
n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n);
};
}
n.isImmediatePropagationStopped = function() {
return n.immediatePropagationStopped === !0;
}, o > 1 && (i = D(i));
for (var s = 0; o > s; s++) n.isImmediatePropagationStopped() || i[s].call(t, n);
}
};
return n.elem = t, n;
}
function It() {
this.$get = function() {
return f(bt, {
hasClass: function(t, e) {
return t.attr && (t = t[0]), At(t, e);
},
addClass: function(t, e) {
return t.attr && (t = t[0]), _t(t, e);
},
removeClass: function(t, e) {
return t.attr && (t = t[0]), Ot(t, e);
}
});
};
}
function Ft(t, e) {
var n = t && t.$$hashKey;
if (n) return "function" == typeof n && (n = t.$$hashKey()), n;
var r = typeof t;
return n = "function" == r || "object" == r && null !== t ? t.$$hashKey = r + ":" + (e || c)() : r + ":" + t;
}
function Lt(t, e) {
if (e) {
var n = 0;
this.nextUid = function() {
return ++n;
};
}
o(t, this.put, this);
}
function Ut(t) {
var e = ("" + t).replace(zr, ""), n = e.match(Ur);
return n ? "function(" + (n[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
}
function Ht(t, e, n) {
var r, i, a, s;
if ("function" == typeof t) {
if (!(r = t.$inject)) {
if (r = [], t.length) {
if (e) throw b(n) && n || (n = t.name || Ut(t)), Gr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
i = ("" + t).replace(zr, ""), a = i.match(Ur), o(a[1].split(Hr), function(t) {
t.replace(Br, function(t, e, n) {
r.push(n);
});
});
}
t.$inject = r;
}
} else hr(t) ? (s = t.length - 1, ot(t[s], "fn"), r = t.slice(0, s)) : ot(t, "fn", !0);
return r;
}
function Bt(t, e) {
function r(t) {
return function(e, r) {
return y(e) ? (o(e, u(t)), n) : t(e, r);
};
}
function i(t, e) {
if (at(t, "service"), (k(e) || hr(e)) && (e = C.instantiate(e)), !e.$get) throw Gr("pget", "Provider '{0}' must define $get factory method.", t);
return S[t + w] = e;
}
function a(t, e) {
return function() {
var n = O.invoke(e, this);
if (m(n)) throw Gr("undef", "Provider '{0}' must return a value from $get factory method.", t);
return n;
};
}
function s(t, e, n) {
return i(t, {
$get: n !== !1 ? a(t, e) : e
});
}
function c(t, e) {
return s(t, [ "$injector", function(t) {
return t.instantiate(e);
} ]);
}
function l(t, e) {
return s(t, v(e), !1);
}
function f(t, e) {
at(t, "constant"), S[t] = e, A[t] = e;
}
function h(t, e) {
var n = C.get(t + w), r = n.$get;
n.$get = function() {
var t = O.invoke(r, n);
return O.invoke(e, null, {
$delegate: t
});
};
}
function p(t) {
var e, n = [];
return o(t, function(t) {
function r(t) {
var e, n;
for (e = 0, n = t.length; n > e; e++) {
var r = t[e], i = C.get(r[0]);
i[r[1]].apply(i, r[2]);
}
}
if (!E.get(t)) {
E.put(t, !0);
try {
b(t) ? (e = rr(t), n = n.concat(p(e.requires)).concat(e._runBlocks), r(e._invokeQueue), 
r(e._configBlocks)) : k(t) ? n.push(C.invoke(t)) : hr(t) ? n.push(C.invoke(t)) : ot(t, "module");
} catch (i) {
throw hr(t) && (t = t[t.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), 
Gr("modulerr", "Failed to instantiate module {0} due to:\n{1}", t, i.stack || i.message || i);
}
}
}), n;
}
function $(t, n) {
function r(e, r) {
if (t.hasOwnProperty(e)) {
if (t[e] === g) throw Gr("cdep", "Circular dependency found: {0}", e + " <- " + x.join(" <- "));
return t[e];
}
try {
return x.unshift(e), t[e] = g, t[e] = n(e, r);
} catch (i) {
throw t[e] === g && delete t[e], i;
} finally {
x.shift();
}
}
function i(t, n, i, o) {
"string" == typeof i && (o = i, i = null);
var a, s, u, c = [], l = Bt.$$annotate(t, e, o);
for (s = 0, a = l.length; a > s; s++) {
if (u = l[s], "string" != typeof u) throw Gr("itkn", "Incorrect injection token! Expected service name as string, got {0}", u);
c.push(i && i.hasOwnProperty(u) ? i[u] : r(u, o));
}
return hr(t) && (t = t[a]), t.apply(n, c);
}
function o(t, e, n) {
var r = Object.create((hr(t) ? t[t.length - 1] : t).prototype || null), o = i(t, r, e, n);
return y(o) || k(o) ? o : r;
}
return {
invoke: i,
instantiate: o,
get: r,
annotate: Bt.$$annotate,
has: function(e) {
return S.hasOwnProperty(e + w) || t.hasOwnProperty(e);
}
};
}
e = e === !0;
var g = {}, w = "Provider", x = [], E = new Lt([], !0), S = {
$provide: {
provider: r(i),
factory: r(s),
service: r(c),
value: r(l),
constant: r(f),
decorator: h
}
}, C = S.$injector = $(S, function(t, e) {
throw cr.isString(e) && x.push(e), Gr("unpr", "Unknown provider: {0}", x.join(" <- "));
}), A = {}, O = A.$injector = $(A, function(t, e) {
var r = C.get(t + w, e);
return O.invoke(r.$get, r, n, t);
});
return o(p(t), function(t) {
O.invoke(t || d);
}), O;
}
function zt() {
var t = !0;
this.disableAutoScrolling = function() {
t = !1;
}, this.$get = [ "$window", "$location", "$rootScope", function(e, r, i) {
function o(t) {
var e = null;
return Array.prototype.some.call(t, function(t) {
return "a" === R(t) ? (e = t, !0) : n;
}), e;
}
function a() {
var t = u.yOffset;
if (k(t)) t = t(); else if (j(t)) {
var n = t[0], r = e.getComputedStyle(n);
t = "fixed" !== r.position ? 0 : n.getBoundingClientRect().bottom;
} else w(t) || (t = 0);
return t;
}
function s(t) {
if (t) {
t.scrollIntoView();
var n = a();
if (n) {
var r = t.getBoundingClientRect().top;
e.scrollBy(0, r - n);
}
} else e.scrollTo(0, 0);
}
function u() {
var t, e = r.hash();
e ? (t = c.getElementById(e)) ? s(t) : (t = o(c.getElementsByName(e))) ? s(t) : "top" === e && s(null) : s(null);
}
var c = e.document;
return t && i.$watch(function() {
return r.hash();
}, function(t, e) {
(t !== e || "" !== t) && qt(function() {
i.$evalAsync(u);
});
}), u;
} ];
}
function Gt() {
this.$get = [ "$$rAF", "$timeout", function(t, e) {
return t.supported ? function(e) {
return t(e);
} : function(t) {
return e(t, 0, !1);
};
} ];
}
function Wt(t, e, r, i) {
function a(t) {
try {
t.apply(null, F(arguments, 1));
} finally {
if (E--, 0 === E) for (;S.length; ) try {
S.pop()();
} catch (e) {
r.error(e);
}
}
}
function s(t) {
var e = t.indexOf("#");
return -1 === e ? "" : t.substr(e + 1);
}
function u(t, e) {
!function n() {
o(A, function(t) {
t();
}), C = e(n, t);
}();
}
function c() {
f(), h();
}
function l() {
try {
return y.state;
} catch (t) {}
}
function f() {
O = l(), O = m(O) ? null : O, V(O, q) && (O = q), q = O;
}
function h() {
(T !== $.url() || _ !== O) && (T = $.url(), _ = O, o(P, function(t) {
t($.url(), O);
}));
}
function p(t) {
try {
return decodeURIComponent(t);
} catch (e) {
return t;
}
}
var $ = this, v = e[0], g = t.location, y = t.history, w = t.setTimeout, x = t.clearTimeout, k = {};
$.isMock = !1;
var E = 0, S = [];
$.$$completeOutstandingRequest = a, $.$$incOutstandingRequestCount = function() {
E++;
}, $.notifyWhenNoOutstandingRequests = function(t) {
o(A, function(t) {
t();
}), 0 === E ? t() : S.push(t);
};
var C, A = [];
$.addPollFn = function(t) {
return m(C) && u(100, w), A.push(t), t;
};
var O, _, T = g.href, M = e.find("base"), j = null;
f(), _ = O, $.url = function(e, n, r) {
if (m(r) && (r = null), g !== t.location && (g = t.location), y !== t.history && (y = t.history), 
e) {
var o = _ === r;
if (T === e && (!i.history || o)) return $;
var a = T && we(T) === we(e);
return T = e, _ = r, !i.history || a && o ? (a || (j = e), n ? g.replace(e) : a ? g.hash = s(e) : g.href = e) : (y[n ? "replaceState" : "pushState"](r, "", e), 
f(), _ = O), $;
}
return j || g.href.replace(/%27/g, "'");
}, $.state = function() {
return O;
};
var P = [], R = !1, q = null;
$.onUrlChange = function(e) {
return R || (i.history && er(t).on("popstate", c), er(t).on("hashchange", c), R = !0), 
P.push(e), e;
}, $.$$checkUrlChange = h, $.baseHref = function() {
var t = M.attr("href");
return t ? t.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
};
var N = {}, D = "", I = $.baseHref();
$.cookies = function(t, e) {
var i, o, a, s, u;
if (!t) {
if (v.cookie !== D) for (D = v.cookie, o = D.split("; "), N = {}, s = 0; s < o.length; s++) a = o[s], 
u = a.indexOf("="), u > 0 && (t = p(a.substring(0, u)), N[t] === n && (N[t] = p(a.substring(u + 1))));
return N;
}
e === n ? v.cookie = encodeURIComponent(t) + "=;path=" + I + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : b(e) && (i = (v.cookie = encodeURIComponent(t) + "=" + encodeURIComponent(e) + ";path=" + I).length + 1, 
i > 4096 && r.warn("Cookie '" + t + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"));
}, $.defer = function(t, e) {
var n;
return E++, n = w(function() {
delete k[n], a(t);
}, e || 0), k[n] = !0, n;
}, $.defer.cancel = function(t) {
return k[t] ? (delete k[t], x(t), a(d), !0) : !1;
};
}
function Jt() {
this.$get = [ "$window", "$log", "$sniffer", "$document", function(t, e, n, r) {
return new Wt(t, r, e, n);
} ];
}
function Xt() {
this.$get = function() {
function t(t, n) {
function i(t) {
t != h && (p ? p == t && (p = t.n) : p = t, o(t.n, t.p), o(t, h), h = t, h.n = null);
}
function o(t, e) {
t != e && (t && (t.p = e), e && (e.n = t));
}
if (t in e) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
var a = 0, s = f({}, n, {
id: t
}), u = {}, c = n && n.capacity || Number.MAX_VALUE, l = {}, h = null, p = null;
return e[t] = {
put: function(t, e) {
if (c < Number.MAX_VALUE) {
var n = l[t] || (l[t] = {
key: t
});
i(n);
}
if (!m(e)) return t in u || a++, u[t] = e, a > c && this.remove(p.key), e;
},
get: function(t) {
if (c < Number.MAX_VALUE) {
var e = l[t];
if (!e) return;
i(e);
}
return u[t];
},
remove: function(t) {
if (c < Number.MAX_VALUE) {
var e = l[t];
if (!e) return;
e == h && (h = e.p), e == p && (p = e.n), o(e.n, e.p), delete l[t];
}
delete u[t], a--;
},
removeAll: function() {
u = {}, a = 0, l = {}, h = p = null;
},
destroy: function() {
u = null, s = null, l = null, delete e[t];
},
info: function() {
return f({}, s, {
size: a
});
}
};
}
var e = {};
return t.info = function() {
var t = {};
return o(e, function(e, n) {
t[n] = e.info();
}), t;
}, t.get = function(t) {
return e[t];
}, t;
};
}
function Yt() {
this.$get = [ "$cacheFactory", function(t) {
return t("templates");
} ];
}
function Kt(t, r) {
function i(t, e) {
var n = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, r = {};
return o(t, function(t, i) {
var o = t.match(n);
if (!o) throw Xr("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", e, i, t);
r[i] = {
mode: o[1][0],
collection: "*" === o[2],
optional: "?" === o[3],
attrName: o[4] || i
};
}), r;
}
var a = {}, s = "Directive", c = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, l = /(([\w\-]+)(?:\:([^;]+))?;?)/, h = P("ngSrc,ngSrcset,src,srcset"), m = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, w = /^(on[a-z]+|formaction)$/;
this.directive = function E(e, n) {
return at(e, "directive"), b(e) ? (it(n, "directiveFactory"), a.hasOwnProperty(e) || (a[e] = [], 
t.factory(e + s, [ "$injector", "$exceptionHandler", function(t, n) {
var r = [];
return o(a[e], function(o, a) {
try {
var s = t.invoke(o);
k(s) ? s = {
compile: v(s)
} : !s.compile && s.link && (s.compile = v(s.link)), s.priority = s.priority || 0, 
s.index = a, s.name = s.name || e, s.require = s.require || s.controller && s.name, 
s.restrict = s.restrict || "EA", y(s.scope) && (s.$$isolateBindings = i(s.scope, s.name)), 
r.push(s);
} catch (u) {
n(u);
}
}), r;
} ])), a[e].push(n)) : o(e, u(E)), this;
}, this.aHrefSanitizationWhitelist = function(t) {
return g(t) ? (r.aHrefSanitizationWhitelist(t), this) : r.aHrefSanitizationWhitelist();
}, this.imgSrcSanitizationWhitelist = function(t) {
return g(t) ? (r.imgSrcSanitizationWhitelist(t), this) : r.imgSrcSanitizationWhitelist();
};
var x = !0;
this.debugInfoEnabled = function(t) {
return g(t) ? (x = t, this) : x;
}, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(t, r, i, u, v, g, E, S, A, O, _) {
function T(t, e) {
try {
t.addClass(e);
} catch (n) {}
}
function M(t, e, n, r, i) {
t instanceof er || (t = er(t)), o(t, function(e, n) {
e.nodeType == br && e.nodeValue.match(/\S+/) && (t[n] = er(e).wrap("<span></span>").parent()[0]);
});
var a = P(t, e, t, n, r, i);
M.$$addScopeClass(t);
var s = null;
return function(e, n, r) {
it(e, "scope"), r = r || {};
var i = r.parentBoundTranscludeFn, o = r.transcludeControllers, u = r.futureParentElement;
i && i.$$boundTransclude && (i = i.$$boundTransclude), s || (s = j(u));
var c;
if (c = "html" !== s ? er(Z(s, er("<div>").append(t).html())) : n ? Vr.clone.call(t) : t, 
o) for (var l in o) c.data("$" + l + "Controller", o[l].instance);
return M.$$addScopeInfo(c, e), n && n(c, e), a && a(e, c, c, i), c;
};
}
function j(t) {
var e = t && t[0];
return e && "foreignobject" !== R(e) && ("" + e).match(/SVG/) ? "svg" : "html";
}
function P(t, e, r, i, o, a) {
function s(t, r, i, o) {
var a, s, u, c, l, f, h, p, v;
if (d) {
var m = r.length;
for (v = Array(m), l = 0; l < $.length; l += 3) h = $[l], v[h] = r[h];
} else v = r;
for (l = 0, f = $.length; f > l; ) u = v[$[l++]], a = $[l++], s = $[l++], a ? (a.scope ? (c = t.$new(), 
M.$$addScopeInfo(er(u), c)) : c = t, p = a.transcludeOnThisElement ? N(t, a.transclude, o, a.elementTranscludeOnThisElement) : !a.templateOnThisElement && o ? o : !o && e ? N(t, e) : null, 
a(s, c, u, i, p)) : s && s(t, u.childNodes, n, o);
}
for (var u, c, l, f, h, p, d, $ = [], v = 0; v < t.length; v++) u = new at(), c = D(t[v], [], u, 0 === v ? i : n, o), 
l = c.length ? U(c, t[v], u, e, r, null, [], [], a) : null, l && l.scope && M.$$addScopeClass(u.$$element), 
h = l && l.terminal || !(f = t[v].childNodes) || !f.length ? null : P(f, l ? (l.transcludeOnThisElement || !l.templateOnThisElement) && l.transclude : e), 
(l || h) && ($.push(v, l, h), p = !0, d = d || l), a = null;
return p ? s : null;
}
function N(t, e, n) {
var r = function(r, i, o, a, s) {
return r || (r = t.$new(!1, s), r.$$transcluded = !0), e(r, i, {
parentBoundTranscludeFn: n,
transcludeControllers: o,
futureParentElement: a
});
};
return r;
}
function D(t, e, n, r, i) {
var o, a, s = t.nodeType, u = n.$attr;
switch (s) {
case yr:
B(e, Zt(R(t)), "E", r, i);
for (var f, h, p, d, $, v, m = t.attributes, g = 0, w = m && m.length; w > g; g++) {
var x = !1, k = !1;
f = m[g], h = f.name, $ = pr(f.value), d = Zt(h), (v = ft.test(d)) && (h = h.replace(Yr, "").substr(8).replace(/_(.)/g, function(t, e) {
return e.toUpperCase();
}));
var E = d.replace(/(Start|End)$/, "");
G(E) && d === E + "Start" && (x = h, k = h.substr(0, h.length - 5) + "end", h = h.substr(0, h.length - 6)), 
p = Zt(h.toLowerCase()), u[p] = h, (v || !n.hasOwnProperty(p)) && (n[p] = $, Nt(t, p) && (n[p] = !0)), 
tt(t, e, $, p, v), B(e, p, "A", r, i, x, k);
}
if (a = t.className, y(a) && (a = a.animVal), b(a) && "" !== a) for (;o = l.exec(a); ) p = Zt(o[2]), 
B(e, p, "C", r, i) && (n[p] = pr(o[3])), a = a.substr(o.index + o[0].length);
break;

case br:
K(e, t.nodeValue);
break;

case wr:
try {
o = c.exec(t.nodeValue), o && (p = Zt(o[1]), B(e, p, "M", r, i) && (n[p] = pr(o[2])));
} catch (S) {}
}
return e.sort(X), e;
}
function I(t, e, n) {
var r = [], i = 0;
if (e && t.hasAttribute && t.hasAttribute(e)) {
do {
if (!t) throw Xr("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", e, n);
t.nodeType == yr && (t.hasAttribute(e) && i++, t.hasAttribute(n) && i--), r.push(t), 
t = t.nextSibling;
} while (i > 0);
} else r.push(t);
return er(r);
}
function L(t, e, n) {
return function(r, i, o, a, s) {
return i = I(i[0], e, n), t(r, i, o, a, s);
};
}
function U(t, a, s, u, c, l, f, h, p) {
function d(t, e, n, r) {
t && (n && (t = L(t, n, r)), t.require = S.require, t.directiveName = A, (R === S || S.$$isolateScope) && (t = rt(t, {
isolateScope: !0
})), f.push(t)), e && (n && (e = L(e, n, r)), e.require = S.require, e.directiveName = A, 
(R === S || S.$$isolateScope) && (e = rt(e, {
isolateScope: !0
})), h.push(e));
}
function $(t, e, n, r) {
var i, a, s = "data", u = !1, c = n;
if (b(e)) {
if (a = e.match(m), e = e.substring(a[0].length), a[3] && (a[1] ? a[3] = null : a[1] = a[3]), 
"^" === a[1] ? s = "inheritedData" : "^^" === a[1] && (s = "inheritedData", c = n.parent()), 
"?" === a[2] && (u = !0), i = null, r && "data" === s && (i = r[e]) && (i = i.instance), 
i = i || c[s]("$" + e + "Controller"), !i && !u) throw Xr("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, t);
return i || null;
}
return hr(e) && (i = [], o(e, function(e) {
i.push($(t, e, n, r));
})), i;
}
function w(t, e, i, u, c) {
function l(t, e, r) {
var i;
return C(t) || (r = e, e = t, t = n), G && (i = w), r || (r = G ? k.parent() : k), 
c(t, e, i, r, _);
}
var p, d, m, y, b, w, x, k, S;
if (a === i ? (S = s, k = s.$$element) : (k = er(i), S = new at(k, s)), R && (b = e.$new(!0)), 
c && (x = l, x.$$boundTransclude = c), P && (E = {}, w = {}, o(P, function(t) {
var n, r = {
$scope: t === R || t.$$isolateScope ? b : e,
$element: k,
$attrs: S,
$transclude: x
};
y = t.controller, "@" == y && (y = S[t.name]), n = g(y, r, !0, t.controllerAs), 
w[t.name] = n, G || k.data("$" + t.name + "Controller", n.instance), E[t.name] = n;
})), R) {
M.$$addScopeInfo(k, b, !0, !(q && (q === R || q === R.$$originalDirective))), M.$$addScopeClass(k, !0);
var A = E && E[R.name], O = b;
A && A.identifier && R.bindToController === !0 && (O = A.instance), o(b.$$isolateBindings = R.$$isolateBindings, function(t, n) {
var i, o, a, s, u = t.attrName, c = t.optional, l = t.mode;
switch (l) {
case "@":
S.$observe(u, function(t) {
O[n] = t;
}), S.$$observers[u].$$scope = e, S[u] && (O[n] = r(S[u])(e));
break;

case "=":
if (c && !S[u]) return;
o = v(S[u]), s = o.literal ? V : function(t, e) {
return t === e || t !== t && e !== e;
}, a = o.assign || function() {
throw i = O[n] = o(e), Xr("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", S[u], R.name);
}, i = O[n] = o(e);
var f = function(t) {
return s(t, O[n]) || (s(t, i) ? a(e, t = O[n]) : O[n] = t), i = t;
};
f.$stateful = !0;
var h;
h = t.collection ? e.$watchCollection(S[u], f) : e.$watch(v(S[u], f), null, o.literal), 
b.$on("$destroy", h);
break;

case "&":
o = v(S[u]), O[n] = function(t) {
return o(e, t);
};
}
});
}
for (E && (o(E, function(t) {
t();
}), E = null), p = 0, d = f.length; d > p; p++) m = f[p], ot(m, m.isolateScope ? b : e, k, S, m.require && $(m.directiveName, m.require, k, w), x);
var _ = e;
for (R && (R.template || null === R.templateUrl) && (_ = b), t && t(_, i.childNodes, n, c), 
p = h.length - 1; p >= 0; p--) m = h[p], ot(m, m.isolateScope ? b : e, k, S, m.require && $(m.directiveName, m.require, k, w), x);
}
p = p || {};
for (var x, E, S, A, O, _, T, j = -Number.MAX_VALUE, P = p.controllerDirectives, R = p.newIsolateScopeDirective, q = p.templateDirective, N = p.nonTlbTranscludeDirective, U = !1, B = !1, G = p.hasElementTranscludeDirective, X = s.$$element = er(a), K = l, Q = u, tt = 0, nt = t.length; nt > tt; tt++) {
S = t[tt];
var it = S.$$start, st = S.$$end;
if (it && (X = I(a, it, st)), O = n, j > S.priority) break;
if ((T = S.scope) && (S.templateUrl || (y(T) ? (Y("new/isolated scope", R || x, S, X), 
R = S) : Y("new/isolated scope", R, S, X)), x = x || S), A = S.name, !S.templateUrl && S.controller && (T = S.controller, 
P = P || {}, Y("'" + A + "' controller", P[A], S, X), P[A] = S), (T = S.transclude) && (U = !0, 
S.$$tlb || (Y("transclusion", N, S, X), N = S), "element" == T ? (G = !0, j = S.priority, 
O = X, X = s.$$element = er(e.createComment(" " + A + ": " + s[A] + " ")), a = X[0], 
et(c, F(O), a), Q = M(O, u, j, K && K.name, {
nonTlbTranscludeDirective: N
})) : (O = er(wt(a)).contents(), X.empty(), Q = M(O, u))), S.template) if (B = !0, 
Y("template", q, S, X), q = S, T = k(S.template) ? S.template(X, s) : S.template, 
T = lt(T), S.replace) {
if (K = S, O = vt(T) ? [] : te(Z(S.templateNamespace, pr(T))), a = O[0], 1 != O.length || a.nodeType !== yr) throw Xr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", A, "");
et(c, X, a);
var ut = {
$attr: {}
}, ct = D(a, [], ut), ft = t.splice(tt + 1, t.length - (tt + 1));
R && H(ct), t = t.concat(ct).concat(ft), W(s, ut), nt = t.length;
} else X.html(T);
if (S.templateUrl) B = !0, Y("template", q, S, X), q = S, S.replace && (K = S), 
w = J(t.splice(tt, t.length - tt), X, s, c, U && Q, f, h, {
controllerDirectives: P,
newIsolateScopeDirective: R,
templateDirective: q,
nonTlbTranscludeDirective: N
}), nt = t.length; else if (S.compile) try {
_ = S.compile(X, s, Q), k(_) ? d(null, _, it, st) : _ && d(_.pre, _.post, it, st);
} catch (ht) {
i(ht, z(X));
}
S.terminal && (w.terminal = !0, j = Math.max(j, S.priority));
}
return w.scope = x && x.scope === !0, w.transcludeOnThisElement = U, w.elementTranscludeOnThisElement = G, 
w.templateOnThisElement = B, w.transclude = Q, p.hasElementTranscludeDirective = G, 
w;
}
function H(t) {
for (var e = 0, n = t.length; n > e; e++) t[e] = p(t[e], {
$$isolateScope: !0
});
}
function B(e, r, o, u, c, l, f) {
if (r === c) return null;
var h = null;
if (a.hasOwnProperty(r)) for (var d, $ = t.get(r + s), v = 0, m = $.length; m > v; v++) try {
d = $[v], (u === n || u > d.priority) && -1 != d.restrict.indexOf(o) && (l && (d = p(d, {
$$start: l,
$$end: f
})), e.push(d), h = d);
} catch (g) {
i(g);
}
return h;
}
function G(e) {
if (a.hasOwnProperty(e)) for (var n, r = t.get(e + s), i = 0, o = r.length; o > i; i++) if (n = r[i], 
n.multiElement) return !0;
return !1;
}
function W(t, e) {
var n = e.$attr, r = t.$attr, i = t.$$element;
o(t, function(r, i) {
"$" != i.charAt(0) && (e[i] && e[i] !== r && (r += ("style" === i ? ";" : " ") + e[i]), 
t.$set(i, r, !0, n[i]));
}), o(e, function(e, o) {
"class" == o ? (T(i, e), t.class = (t.class ? t.class + " " : "") + e) : "style" == o ? (i.attr("style", i.attr("style") + ";" + e), 
t.style = (t.style ? t.style + ";" : "") + e) : "$" == o.charAt(0) || t.hasOwnProperty(o) || (t[o] = e, 
r[o] = n[o]);
});
}
function J(t, e, n, r, i, a, s, c) {
var l, f, h = [], d = e[0], $ = t.shift(), v = p($, {
templateUrl: null,
transclude: null,
replace: null,
$$originalDirective: $
}), m = k($.templateUrl) ? $.templateUrl(e, n) : $.templateUrl, g = $.templateNamespace;
return e.empty(), u(A.getTrustedResourceUrl(m)).then(function(u) {
var p, b, w, x;
if (u = lt(u), $.replace) {
if (w = vt(u) ? [] : te(Z(g, pr(u))), p = w[0], 1 != w.length || p.nodeType !== yr) throw Xr("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $.name, m);
b = {
$attr: {}
}, et(r, e, p);
var k = D(p, [], b);
y($.scope) && H(k), t = k.concat(t), W(n, b);
} else p = d, e.html(u);
for (t.unshift(v), l = U(t, p, n, i, e, $, a, s, c), o(r, function(t, n) {
t == p && (r[n] = e[0]);
}), f = P(e[0].childNodes, i); h.length; ) {
var E = h.shift(), S = h.shift(), C = h.shift(), A = h.shift(), O = e[0];
if (!E.$$destroyed) {
if (S !== d) {
var _ = S.className;
c.hasElementTranscludeDirective && $.replace || (O = wt(p)), et(C, er(S), O), T(er(O), _);
}
x = l.transcludeOnThisElement ? N(E, l.transclude, A) : A, l(f, E, O, r, x);
}
}
h = null;
}), function(t, e, n, r, i) {
var o = i;
e.$$destroyed || (h ? h.push(e, n, r, o) : (l.transcludeOnThisElement && (o = N(e, l.transclude, i)), 
l(f, e, n, r, o)));
};
}
function X(t, e) {
var n = e.priority - t.priority;
return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index;
}
function Y(t, e, n, r) {
if (e) throw Xr("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", e.name, n.name, t, z(r));
}
function K(t, e) {
var n = r(e, !0);
n && t.push({
priority: 0,
compile: function(t) {
var e = t.parent(), r = !!e.length;
return r && M.$$addBindingClass(e), function(t, e) {
var i = e.parent();
r || M.$$addBindingClass(i), M.$$addBindingInfo(i, n.expressions), t.$watch(n, function(t) {
e[0].nodeValue = t;
});
};
}
});
}
function Z(t, n) {
switch (t = Xn(t || "html")) {
case "svg":
case "math":
var r = e.createElement("div");
return r.innerHTML = "<" + t + ">" + n + "</" + t + ">", r.childNodes[0].childNodes;

default:
return n;
}
}
function Q(t, e) {
if ("srcdoc" == e) return A.HTML;
var r = R(t);
return "xlinkHref" == e || "form" == r && "action" == e || "img" != r && ("src" == e || "ngSrc" == e) ? A.RESOURCE_URL : n;
}
function tt(t, e, n, i, o) {
var a = Q(t, i);
o = h[i] || o;
var s = r(n, !0, a, o);
if (s) {
if ("multiple" === i && "select" === R(t)) throw Xr("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", z(t));
e.push({
priority: 100,
compile: function() {
return {
pre: function(t, e, u) {
var c = u.$$observers || (u.$$observers = {});
if (w.test(i)) throw Xr("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
var l = u[i];
l !== n && (s = l && r(l, !0, a, o), n = l), s && (u[i] = s(t), (c[i] || (c[i] = [])).$$inter = !0, 
(u.$$observers && u.$$observers[i].$$scope || t).$watch(s, function(t, e) {
"class" === i && t != e ? u.$updateClass(t, e) : u.$set(i, t);
}));
}
};
}
});
}
}
function et(t, n, r) {
var i, o, a = n[0], s = n.length, u = a.parentNode;
if (t) for (i = 0, o = t.length; o > i; i++) if (t[i] == a) {
t[i++] = r;
for (var c = i, l = c + s - 1, f = t.length; f > c; c++, l++) f > l ? t[c] = t[l] : delete t[c];
t.length -= s - 1, t.context === a && (t.context = r);
break;
}
u && u.replaceChild(r, a);
var h = e.createDocumentFragment();
h.appendChild(a), er(r).data(er(a).data()), nr ? (fr = !0, nr.cleanData([ a ])) : delete er.cache[a[er.expando]];
for (var p = 1, d = n.length; d > p; p++) {
var $ = n[p];
er($).remove(), h.appendChild($), delete n[p];
}
n[0] = r, n.length = 1;
}
function rt(t, e) {
return f(function() {
return t.apply(null, arguments);
}, t, e);
}
function ot(t, e, n, r, o, a) {
try {
t(e, n, r, o, a);
} catch (s) {
i(s, z(n));
}
}
var at = function(t, e) {
if (e) {
var n, r, i, o = Object.keys(e);
for (n = 0, r = o.length; r > n; n++) i = o[n], this[i] = e[i];
} else this.$attr = {};
this.$$element = t;
};
at.prototype = {
$normalize: Zt,
$addClass: function(t) {
t && t.length > 0 && O.addClass(this.$$element, t);
},
$removeClass: function(t) {
t && t.length > 0 && O.removeClass(this.$$element, t);
},
$updateClass: function(t, e) {
var n = Qt(t, e);
n && n.length && O.addClass(this.$$element, n);
var r = Qt(e, t);
r && r.length && O.removeClass(this.$$element, r);
},
$set: function(t, e, r, a) {
var s, u = this.$$element[0], c = Nt(u, t), l = Dt(u, t), f = t;
if (c ? (this.$$element.prop(t, e), a = c) : l && (this[l] = e, f = l), this[t] = e, 
a ? this.$attr[t] = a : (a = this.$attr[t], a || (this.$attr[t] = a = nt(t, "-"))), 
s = R(this.$$element), "a" === s && "href" === t || "img" === s && "src" === t) this[t] = e = _(e, "src" === t); else if ("img" === s && "srcset" === t) {
for (var h = "", p = pr(e), d = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, $ = /\s/.test(p) ? d : /(,)/, v = p.split($), m = Math.floor(v.length / 2), g = 0; m > g; g++) {
var y = 2 * g;
h += _(pr(v[y]), !0), h += " " + pr(v[y + 1]);
}
var b = pr(v[2 * g]).split(/\s/);
h += _(pr(b[0]), !0), 2 === b.length && (h += " " + pr(b[1])), this[t] = e = h;
}
r !== !1 && (null === e || e === n ? this.$$element.removeAttr(a) : this.$$element.attr(a, e));
var w = this.$$observers;
w && o(w[f], function(t) {
try {
t(e);
} catch (n) {
i(n);
}
});
},
$observe: function(t, e) {
var n = this, r = n.$$observers || (n.$$observers = ct()), i = r[t] || (r[t] = []);
return i.push(e), E.$evalAsync(function() {
!i.$$inter && n.hasOwnProperty(t) && e(n[t]);
}), function() {
q(i, e);
};
}
};
var st = r.startSymbol(), ut = r.endSymbol(), lt = "{{" == st || "}}" == ut ? $ : function(t) {
return t.replace(/\{\{/g, st).replace(/}}/g, ut);
}, ft = /^ngAttr[A-Z]/;
return M.$$addBindingInfo = x ? function(t, e) {
var n = t.data("$binding") || [];
hr(e) ? n = n.concat(e) : n.push(e), t.data("$binding", n);
} : d, M.$$addBindingClass = x ? function(t) {
T(t, "ng-binding");
} : d, M.$$addScopeInfo = x ? function(t, e, n, r) {
var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
t.data(i, e);
} : d, M.$$addScopeClass = x ? function(t, e) {
T(t, e ? "ng-isolate-scope" : "ng-scope");
} : d, M;
} ];
}
function Zt(t) {
return $t(t.replace(Yr, ""));
}
function Qt(t, e) {
var n = "", r = t.split(/\s+/), i = e.split(/\s+/);
t: for (var o = 0; o < r.length; o++) {
for (var a = r[o], s = 0; s < i.length; s++) if (a == i[s]) continue t;
n += (n.length > 0 ? " " : "") + a;
}
return n;
}
function te(t) {
t = er(t);
var e = t.length;
if (1 >= e) return t;
for (;e--; ) {
var n = t[e];
n.nodeType === wr && or.call(t, e, 1);
}
return t;
}
function ee() {
var t = {}, e = !1, i = /^(\S+)(\s+as\s+(\w+))?$/;
this.register = function(e, n) {
at(e, "controller"), y(e) ? f(t, e) : t[e] = n;
}, this.allowGlobals = function() {
e = !0;
}, this.$get = [ "$injector", "$window", function(o, a) {
function s(t, e, n, i) {
if (!t || !y(t.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, e);
t.$scope[e] = n;
}
return function(r, u, c, l) {
var h, p, d, $;
if (c = c === !0, l && b(l) && ($ = l), b(r)) {
if (p = r.match(i), !p) throw Kr("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
d = p[1], $ = $ || p[3], r = t.hasOwnProperty(d) ? t[d] : st(u.$scope, d, !0) || (e ? st(a, d, !0) : n), 
ot(r, d, !0);
}
if (c) {
var v = (hr(r) ? r[r.length - 1] : r).prototype;
return h = Object.create(v || null), $ && s(u, $, h, d || r.name), f(function() {
return o.invoke(r, h, u, d), h;
}, {
instance: h,
identifier: $
});
}
return h = o.instantiate(r, u, d), $ && s(u, $, h, d || r.name), h;
};
} ];
}
function ne() {
this.$get = [ "$window", function(t) {
return er(t.document);
} ];
}
function re() {
this.$get = [ "$log", function(t) {
return function() {
t.error.apply(t, arguments);
};
} ];
}
function ie(t, e) {
if (b(t)) {
var n = t.replace(ni, "").trim();
if (n) {
var r = e("Content-Type");
(r && 0 === r.indexOf(Zr) || oe(n)) && (t = B(n));
}
}
return t;
}
function oe(t) {
var e = t.match(ti);
return e && ei[e[0]].test(t);
}
function ae(t) {
var e, n, r, i = ct();
return t ? (o(t.split("\n"), function(t) {
r = t.indexOf(":"), e = Xn(pr(t.substr(0, r))), n = pr(t.substr(r + 1)), e && (i[e] = i[e] ? i[e] + ", " + n : n);
}), i) : i;
}
function se(t) {
var e = y(t) ? t : n;
return function(n) {
if (e || (e = ae(t)), n) {
var r = e[Xn(n)];
return r === void 0 && (r = null), r;
}
return e;
};
}
function ue(t, e, n, r) {
return k(r) ? r(t, e, n) : (o(r, function(r) {
t = r(t, e, n);
}), t);
}
function ce(t) {
return t >= 200 && 300 > t;
}
function le() {
var t = this.defaults = {
transformResponse: [ ie ],
transformRequest: [ function(t) {
return !y(t) || A(t) || _(t) || O(t) ? t : H(t);
} ],
headers: {
common: {
Accept: "application/json, text/plain, */*"
},
post: D(Qr),
put: D(Qr),
patch: D(Qr)
},
xsrfCookieName: "XSRF-TOKEN",
xsrfHeaderName: "X-XSRF-TOKEN"
}, e = !1;
this.useApplyAsync = function(t) {
return g(t) ? (e = !!t, this) : e;
};
var i = this.interceptors = [];
this.$get = [ "$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, u, c, l, h, p) {
function d(e) {
function i(t) {
var e = f({}, t);
return t.data ? e.data = ue(t.data, t.headers, t.status, u.transformResponse) : e.data = t.data, 
ce(t.status) ? e : h.reject(e);
}
function a(t) {
var e, n = {};
return o(t, function(t, r) {
k(t) ? (e = t(), null != e && (n[r] = e)) : n[r] = t;
}), n;
}
function s(e) {
var n, r, i, o = t.headers, s = f({}, e.headers);
o = f({}, o.common, o[Xn(e.method)]);
t: for (n in o) {
r = Xn(n);
for (i in s) if (Xn(i) === r) continue t;
s[n] = o[n];
}
return a(s);
}
if (!cr.isObject(e)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", e);
var u = f({
method: "get",
transformRequest: t.transformRequest,
transformResponse: t.transformResponse
}, e);
u.headers = s(e), u.method = Kn(u.method);
var c = function(e) {
var r = e.headers, a = ue(e.data, se(r), n, e.transformRequest);
return m(a) && o(r, function(t, e) {
"content-type" === Xn(e) && delete r[e];
}), m(e.withCredentials) && !m(t.withCredentials) && (e.withCredentials = t.withCredentials), 
w(e, a).then(i, i);
}, l = [ c, n ], p = h.when(u);
for (o(C, function(t) {
(t.request || t.requestError) && l.unshift(t.request, t.requestError), (t.response || t.responseError) && l.push(t.response, t.responseError);
}); l.length; ) {
var d = l.shift(), $ = l.shift();
p = p.then(d, $);
}
return p.success = function(t) {
return p.then(function(e) {
t(e.data, e.status, e.headers, u);
}), p;
}, p.error = function(t) {
return p.then(null, function(e) {
t(e.data, e.status, e.headers, u);
}), p;
}, p;
}
function $() {
o(arguments, function(t) {
d[t] = function(e, n) {
return d(f(n || {}, {
method: t,
url: e
}));
};
});
}
function v() {
o(arguments, function(t) {
d[t] = function(e, n, r) {
return d(f(r || {}, {
method: t,
url: e,
data: n
}));
};
});
}
function w(r, i) {
function o(t, n, r, i) {
function o() {
s(n, t, r, i);
}
p && (ce(t) ? p.put(x, [ t, n, ae(r), i ]) : p.remove(x)), e ? l.$applyAsync(o) : (o(), 
l.$$phase || l.$apply());
}
function s(t, e, n, i) {
e = Math.max(e, 0), (ce(e) ? v.resolve : v.reject)({
data: t,
status: e,
headers: se(n),
config: r,
statusText: i
});
}
function c(t) {
s(t.data, t.status, D(t.headers()), t.statusText);
}
function f() {
var t = d.pendingRequests.indexOf(r);
-1 !== t && d.pendingRequests.splice(t, 1);
}
var p, $, v = h.defer(), b = v.promise, w = r.headers, x = E(r.url, r.params);
if (d.pendingRequests.push(r), b.then(f, f), !r.cache && !t.cache || r.cache === !1 || "GET" !== r.method && "JSONP" !== r.method || (p = y(r.cache) ? r.cache : y(t.cache) ? t.cache : S), 
p && ($ = p.get(x), g($) ? M($) ? $.then(c, c) : hr($) ? s($[1], $[0], D($[2]), $[3]) : s($, 200, {}, "OK") : p.put(x, b)), 
m($)) {
var k = on(r.url) ? u.cookies()[r.xsrfCookieName || t.xsrfCookieName] : n;
k && (w[r.xsrfHeaderName || t.xsrfHeaderName] = k), a(r.method, x, i, o, w, r.timeout, r.withCredentials, r.responseType);
}
return b;
}
function E(t, e) {
if (!e) return t;
var n = [];
return s(e, function(t, e) {
null === t || m(t) || (hr(t) || (t = [ t ]), o(t, function(t) {
y(t) && (t = x(t) ? t.toISOString() : H(t)), n.push(Y(e) + "=" + Y(t));
}));
}), n.length > 0 && (t += (-1 == t.indexOf("?") ? "?" : "&") + n.join("&")), t;
}
var S = c("$http"), C = [];
return o(i, function(t) {
C.unshift(b(t) ? p.get(t) : p.invoke(t));
}), d.pendingRequests = [], $("get", "delete", "head", "jsonp"), v("post", "put", "patch"), 
d.defaults = t, d;
} ];
}
function fe() {
return new t.XMLHttpRequest();
}
function he() {
this.$get = [ "$browser", "$window", "$document", function(t, e, n) {
return pe(t, fe, t.defer, e.angular.callbacks, n[0]);
} ];
}
function pe(t, e, r, i, a) {
function s(t, e, n) {
var r = a.createElement("script"), o = null;
return r.type = "text/javascript", r.src = t, r.async = !0, o = function(t) {
Or(r, "load", o), Or(r, "error", o), a.body.removeChild(r), r = null;
var s = -1, u = "unknown";
t && ("load" !== t.type || i[e].called || (t = {
type: "error"
}), u = t.type, s = "error" === t.type ? 404 : 200), n && n(s, u);
}, Ar(r, "load", o), Ar(r, "error", o), a.body.appendChild(r), o;
}
return function(a, u, c, l, f, h, p, $) {
function v() {
b && b(), w && w.abort();
}
function m(e, i, o, a, s) {
E !== n && r.cancel(E), b = w = null, e(i, o, a, s), t.$$completeOutstandingRequest(d);
}
if (t.$$incOutstandingRequestCount(), u = u || t.url(), "jsonp" == Xn(a)) {
var y = "_" + (i.counter++).toString(36);
i[y] = function(t) {
i[y].data = t, i[y].called = !0;
};
var b = s(u.replace("JSON_CALLBACK", "angular.callbacks." + y), y, function(t, e) {
m(l, t, i[y].data, "", e), i[y] = d;
});
} else {
var w = e();
w.open(a, u, !0), o(f, function(t, e) {
g(t) && w.setRequestHeader(e, t);
}), w.onload = function() {
var t = w.statusText || "", e = "response" in w ? w.response : w.responseText, n = 1223 === w.status ? 204 : w.status;
0 === n && (n = e ? 200 : "file" == rn(u).protocol ? 404 : 0), m(l, n, e, w.getAllResponseHeaders(), t);
};
var x = function() {
m(l, -1, null, null, "");
};
if (w.onerror = x, w.onabort = x, p && (w.withCredentials = !0), $) try {
w.responseType = $;
} catch (k) {
if ("json" !== $) throw k;
}
w.send(c || null);
}
if (h > 0) var E = r(v, h); else M(h) && h.then(v);
};
}
function de() {
var t = "{{", e = "}}";
this.startSymbol = function(e) {
return e ? (t = e, this) : t;
}, this.endSymbol = function(t) {
return t ? (e = t, this) : e;
}, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(n, r, i) {
function o(t) {
return "\\\\\\" + t;
}
function a(o, a, h, p) {
function d(n) {
return n.replace(c, t).replace(l, e);
}
function $(t) {
try {
return t = _(t), p && !g(t) ? t : T(t);
} catch (e) {
var n = ri("interr", "Can't interpolate: {0}\n{1}", o, "" + e);
r(n);
}
}
p = !!p;
for (var v, y, b, w = 0, x = [], E = [], S = o.length, C = [], A = []; S > w; ) {
if (-1 == (v = o.indexOf(t, w)) || -1 == (y = o.indexOf(e, v + s))) {
w !== S && C.push(d(o.substring(w)));
break;
}
w !== v && C.push(d(o.substring(w, v))), b = o.substring(v + s, y), x.push(b), E.push(n(b, $)), 
w = y + u, A.push(C.length), C.push("");
}
if (h && C.length > 1) throw ri("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", o);
if (!a || x.length) {
var O = function(t) {
for (var e = 0, n = x.length; n > e; e++) {
if (p && m(t[e])) return;
C[A[e]] = t[e];
}
return C.join("");
}, _ = function(t) {
return h ? i.getTrusted(h, t) : i.valueOf(t);
}, T = function(t) {
if (null == t) return "";
switch (typeof t) {
case "string":
break;

case "number":
t = "" + t;
break;

default:
t = H(t);
}
return t;
};
return f(function(t) {
var e = 0, n = x.length, i = Array(n);
try {
for (;n > e; e++) i[e] = E[e](t);
return O(i);
} catch (a) {
var s = ri("interr", "Can't interpolate: {0}\n{1}", o, "" + a);
r(s);
}
}, {
exp: o,
expressions: x,
$$watchDelegate: function(t, e, n) {
var r;
return t.$watchGroup(E, function(n, i) {
var o = O(n);
k(e) && e.call(this, o, n !== i ? r : o, t), r = o;
}, n);
}
});
}
}
var s = t.length, u = e.length, c = RegExp(t.replace(/./g, o), "g"), l = RegExp(e.replace(/./g, o), "g");
return a.startSymbol = function() {
return t;
}, a.endSymbol = function() {
return e;
}, a;
} ];
}
function $e() {
this.$get = [ "$rootScope", "$window", "$q", "$$q", function(t, e, n, r) {
function i(i, a, s, u) {
var c = e.setInterval, l = e.clearInterval, f = 0, h = g(u) && !u, p = (h ? r : n).defer(), d = p.promise;
return s = g(s) ? s : 0, d.then(null, null, i), d.$$intervalId = c(function() {
p.notify(f++), s > 0 && f >= s && (p.resolve(f), l(d.$$intervalId), delete o[d.$$intervalId]), 
h || t.$apply();
}, a), o[d.$$intervalId] = p, d;
}
var o = {};
return i.cancel = function(t) {
return t && t.$$intervalId in o ? (o[t.$$intervalId].reject("canceled"), e.clearInterval(t.$$intervalId), 
delete o[t.$$intervalId], !0) : !1;
}, i;
} ];
}
function ve() {
this.$get = function() {
return {
id: "en-us",
NUMBER_FORMATS: {
DECIMAL_SEP: ".",
GROUP_SEP: ",",
PATTERNS: [ {
minInt: 1,
minFrac: 0,
maxFrac: 3,
posPre: "",
posSuf: "",
negPre: "-",
negSuf: "",
gSize: 3,
lgSize: 3
}, {
minInt: 1,
minFrac: 2,
maxFrac: 2,
posPre: "¤",
posSuf: "",
negPre: "(¤",
negSuf: ")",
gSize: 3,
lgSize: 3
} ],
CURRENCY_SYM: "$"
},
DATETIME_FORMATS: {
MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
AMPMS: [ "AM", "PM" ],
medium: "MMM d, y h:mm:ss a",
"short": "M/d/yy h:mm a",
fullDate: "EEEE, MMMM d, y",
longDate: "MMMM d, y",
mediumDate: "MMM d, y",
shortDate: "M/d/yy",
mediumTime: "h:mm:ss a",
shortTime: "h:mm a",
ERANAMES: [ "Before Christ", "Anno Domini" ],
ERAS: [ "BC", "AD" ]
},
pluralCat: function(t) {
return 1 === t ? "one" : "other";
}
};
};
}
function me(t) {
for (var e = t.split("/"), n = e.length; n--; ) e[n] = X(e[n]);
return e.join("/");
}
function ge(t, e) {
var n = rn(t);
e.$$protocol = n.protocol, e.$$host = n.hostname, e.$$port = h(n.port) || oi[n.protocol] || null;
}
function ye(t, e) {
var n = "/" !== t.charAt(0);
n && (t = "/" + t);
var r = rn(t);
e.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), 
e.$$search = W(r.search), e.$$hash = decodeURIComponent(r.hash), e.$$path && "/" != e.$$path.charAt(0) && (e.$$path = "/" + e.$$path);
}
function be(t, e) {
return 0 === e.indexOf(t) ? e.substr(t.length) : n;
}
function we(t) {
var e = t.indexOf("#");
return -1 == e ? t : t.substr(0, e);
}
function xe(t) {
return t.replace(/(#.+)|#$/, "$1");
}
function ke(t) {
return t.substr(0, we(t).lastIndexOf("/") + 1);
}
function Ee(t) {
return t.substring(0, t.indexOf("/", t.indexOf("//") + 2));
}
function Se(t, e) {
this.$$html5 = !0, e = e || "";
var r = ke(t);
ge(t, this), this.$$parse = function(t) {
var e = be(r, t);
if (!b(e)) throw ai("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
ye(e, this), this.$$path || (this.$$path = "/"), this.$$compose();
}, this.$$compose = function() {
var t = J(this.$$search), e = this.$$hash ? "#" + X(this.$$hash) : "";
this.$$url = me(this.$$path) + (t ? "?" + t : "") + e, this.$$absUrl = r + this.$$url.substr(1);
}, this.$$parseLinkUrl = function(i, o) {
if (o && "#" === o[0]) return this.hash(o.slice(1)), !0;
var a, s, u;
return (a = be(t, i)) !== n ? (s = a, u = (a = be(e, a)) !== n ? r + (be("/", a) || a) : t + s) : (a = be(r, i)) !== n ? u = r + a : r == i + "/" && (u = r), 
u && this.$$parse(u), !!u;
};
}
function Ce(t, e) {
var n = ke(t);
ge(t, this), this.$$parse = function(r) {
function i(t, e, n) {
var r, i = /^\/[A-Z]:(\/.*)/;
return 0 === e.indexOf(n) && (e = e.replace(n, "")), i.exec(e) ? t : (r = i.exec(t), 
r ? r[1] : t);
}
var o, a = be(t, r) || be(n, r);
"#" === a.charAt(0) ? (o = be(e, a), m(o) && (o = a)) : o = this.$$html5 ? a : "", 
ye(o, this), this.$$path = i(this.$$path, o, t), this.$$compose();
}, this.$$compose = function() {
var n = J(this.$$search), r = this.$$hash ? "#" + X(this.$$hash) : "";
this.$$url = me(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = t + (this.$$url ? e + this.$$url : "");
}, this.$$parseLinkUrl = function(e) {
return we(t) == we(e) ? (this.$$parse(e), !0) : !1;
};
}
function Ae(t, e) {
this.$$html5 = !0, Ce.apply(this, arguments);
var n = ke(t);
this.$$parseLinkUrl = function(r, i) {
if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
var o, a;
return t == we(r) ? o = r : (a = be(n, r)) ? o = t + e + a : n === r + "/" && (o = n), 
o && this.$$parse(o), !!o;
}, this.$$compose = function() {
var n = J(this.$$search), r = this.$$hash ? "#" + X(this.$$hash) : "";
this.$$url = me(this.$$path) + (n ? "?" + n : "") + r, this.$$absUrl = t + e + this.$$url;
};
}
function Oe(t) {
return function() {
return this[t];
};
}
function _e(t, e) {
return function(n) {
return m(n) ? this[t] : (this[t] = e(n), this.$$compose(), this);
};
}
function Te() {
var t = "", e = {
enabled: !1,
requireBase: !0,
rewriteLinks: !0
};
this.hashPrefix = function(e) {
return g(e) ? (t = e, this) : t;
}, this.html5Mode = function(t) {
return T(t) ? (e.enabled = t, this) : y(t) ? (T(t.enabled) && (e.enabled = t.enabled), 
T(t.requireBase) && (e.requireBase = t.requireBase), T(t.rewriteLinks) && (e.rewriteLinks = t.rewriteLinks), 
this) : e;
}, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(n, r, i, o, a) {
function s(t, e, n) {
var i = c.url(), o = c.$$state;
try {
r.url(t, e, n), c.$$state = r.state();
} catch (a) {
throw c.url(i), c.$$state = o, a;
}
}
function u(t, e) {
n.$broadcast("$locationChangeSuccess", c.absUrl(), t, c.$$state, e);
}
var c, l, f, h = r.baseHref(), p = r.url();
if (e.enabled) {
if (!h && e.requireBase) throw ai("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
f = Ee(p) + (h || "/"), l = i.history ? Se : Ae;
} else f = we(p), l = Ce;
c = new l(f, "#" + t), c.$$parseLinkUrl(p, p), c.$$state = r.state();
var d = /^\s*(javascript|mailto):/i;
o.on("click", function(t) {
if (e.rewriteLinks && !t.ctrlKey && !t.metaKey && !t.shiftKey && 2 != t.which && 2 != t.button) {
for (var i = er(t.target); "a" !== R(i[0]); ) if (i[0] === o[0] || !(i = i.parent())[0]) return;
var s = i.prop("href"), u = i.attr("href") || i.attr("xlink:href");
y(s) && "" + s == "[object SVGAnimatedString]" && (s = rn(s.animVal).href), d.test(s) || !s || i.attr("target") || t.isDefaultPrevented() || c.$$parseLinkUrl(s, u) && (t.preventDefault(), 
c.absUrl() != r.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0));
}
}), xe(c.absUrl()) != xe(p) && r.url(c.absUrl(), !0);
var $ = !0;
return r.onUrlChange(function(t, e) {
n.$evalAsync(function() {
var r, i = c.absUrl(), o = c.$$state;
c.$$parse(t), c.$$state = e, r = n.$broadcast("$locationChangeStart", t, i, e, o).defaultPrevented, 
c.absUrl() === t && (r ? (c.$$parse(i), c.$$state = o, s(i, !1, o)) : ($ = !1, u(i, o)));
}), n.$$phase || n.$digest();
}), n.$watch(function() {
var t = xe(r.url()), e = xe(c.absUrl()), o = r.state(), a = c.$$replace, l = t !== e || c.$$html5 && i.history && o !== c.$$state;
($ || l) && ($ = !1, n.$evalAsync(function() {
var e = c.absUrl(), r = n.$broadcast("$locationChangeStart", e, t, c.$$state, o).defaultPrevented;
c.absUrl() === e && (r ? (c.$$parse(t), c.$$state = o) : (l && s(e, a, o === c.$$state ? null : c.$$state), 
u(t, o)));
})), c.$$replace = !1;
}), c;
} ];
}
function Me() {
var t = !0, e = this;
this.debugEnabled = function(e) {
return g(e) ? (t = e, this) : t;
}, this.$get = [ "$window", function(n) {
function r(t) {
return t instanceof Error && (t.stack ? t = t.message && -1 === t.stack.indexOf(t.message) ? "Error: " + t.message + "\n" + t.stack : t.stack : t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), 
t;
}
function i(t) {
var e = n.console || {}, i = e[t] || e.log || d, a = !1;
try {
a = !!i.apply;
} catch (s) {}
return a ? function() {
var t = [];
return o(arguments, function(e) {
t.push(r(e));
}), i.apply(e, t);
} : function(t, e) {
i(t, null == e ? "" : e);
};
}
return {
log: i("log"),
info: i("info"),
warn: i("warn"),
error: i("error"),
debug: function() {
var n = i("debug");
return function() {
t && n.apply(e, arguments);
};
}()
};
} ];
}
function je(t, e) {
if ("__defineGetter__" === t || "__defineSetter__" === t || "__lookupGetter__" === t || "__lookupSetter__" === t || "__proto__" === t) throw ui("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", e);
return t;
}
function Pe(t, e) {
if (t) {
if (t.constructor === t) throw ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
if (t.window === t) throw ui("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", e);
if (t.children && (t.nodeName || t.prop && t.attr && t.find)) throw ui("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", e);
if (t === Object) throw ui("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", e);
}
return t;
}
function Re(t, e) {
if (t) {
if (t.constructor === t) throw ui("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
if (t === ci || t === li || t === fi) throw ui("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", e);
}
}
function qe(t) {
return t.constant;
}
function Ne(t, e, n, r, i) {
Pe(t, i), Pe(e, i);
for (var o, a = n.split("."), s = 0; a.length > 1; s++) {
o = je(a.shift(), i);
var u = 0 === s && e && e[o] || t[o];
u || (u = {}, t[o] = u), t = Pe(u, i);
}
return o = je(a.shift(), i), Pe(t[o], i), t[o] = r, r;
}
function De(t) {
return "constructor" == t;
}
function Ve(t, e, r, i, o, a, s) {
je(t, a), je(e, a), je(r, a), je(i, a), je(o, a);
var u = function(t) {
return Pe(t, a);
}, c = s || De(t) ? u : $, l = s || De(e) ? u : $, f = s || De(r) ? u : $, h = s || De(i) ? u : $, p = s || De(o) ? u : $;
return function(a, s) {
var u = s && s.hasOwnProperty(t) ? s : a;
return null == u ? u : (u = c(u[t]), e ? null == u ? n : (u = l(u[e]), r ? null == u ? n : (u = f(u[r]), 
i ? null == u ? n : (u = h(u[i]), o ? null == u ? n : u = p(u[o]) : u) : u) : u) : u);
};
}
function Ie(t, e) {
return function(n, r) {
return t(n, r, Pe, e);
};
}
function Fe(t, e, r) {
var i = e.expensiveChecks, a = i ? gi : mi, s = a[t];
if (s) return s;
var u = t.split("."), c = u.length;
if (e.csp) s = 6 > c ? Ve(u[0], u[1], u[2], u[3], u[4], r, i) : function(t, e) {
var o, a = 0;
do o = Ve(u[a++], u[a++], u[a++], u[a++], u[a++], r, i)(t, e), e = n, t = o; while (c > a);
return o;
}; else {
var l = "";
i && (l += "s = eso(s, fe);\nl = eso(l, fe);\n");
var f = i;
o(u, function(t, e) {
je(t, r);
var n = (e ? "s" : '((l&&l.hasOwnProperty("' + t + '"))?l:s)') + "." + t;
(i || De(t)) && (n = "eso(" + n + ", fe)", f = !0), l += "if(s == null) return undefined;\ns=" + n + ";\n";
}), l += "return s;";
var h = Function("s", "l", "eso", "fe", l);
h.toString = v(l), f && (h = Ie(h, r)), s = h;
}
return s.sharedGetter = !0, s.assign = function(e, n, r) {
return Ne(e, r, t, n, t);
}, a[t] = s, s;
}
function Le(t) {
return k(t.valueOf) ? t.valueOf() : yi.call(t);
}
function Ue() {
var t = ct(), e = ct();
this.$get = [ "$filter", "$sniffer", function(n, r) {
function i(t) {
var e = t;
return t.sharedGetter && (e = function(e, n) {
return t(e, n);
}, e.literal = t.literal, e.constant = t.constant, e.assign = t.assign), e;
}
function a(t, e) {
for (var n = 0, r = t.length; r > n; n++) {
var i = t[n];
i.constant || (i.inputs ? a(i.inputs, e) : -1 === e.indexOf(i) && e.push(i));
}
return e;
}
function s(t, e) {
return null == t || null == e ? t === e : "object" == typeof t && (t = Le(t), "object" == typeof t) ? !1 : t === e || t !== t && e !== e;
}
function u(t, e, n, r) {
var i, o = r.$$inputs || (r.$$inputs = a(r.inputs, []));
if (1 === o.length) {
var u = s;
return o = o[0], t.$watch(function(t) {
var e = o(t);
return s(e, u) || (i = r(t), u = e && Le(e)), i;
}, e, n);
}
for (var c = [], l = 0, f = o.length; f > l; l++) c[l] = s;
return t.$watch(function(t) {
for (var e = !1, n = 0, a = o.length; a > n; n++) {
var u = o[n](t);
(e || (e = !s(u, c[n]))) && (c[n] = u && Le(u));
}
return e && (i = r(t)), i;
}, e, n);
}
function c(t, e, n, r) {
var i, o;
return i = t.$watch(function(t) {
return r(t);
}, function(t, n, r) {
o = t, k(e) && e.apply(this, arguments), g(t) && r.$$postDigest(function() {
g(o) && i();
});
}, n);
}
function l(t, e, n, r) {
function i(t) {
var e = !0;
return o(t, function(t) {
g(t) || (e = !1);
}), e;
}
var a, s;
return a = t.$watch(function(t) {
return r(t);
}, function(t, n, r) {
s = t, k(e) && e.call(this, t, n, r), i(t) && r.$$postDigest(function() {
i(s) && a();
});
}, n);
}
function f(t, e, n, r) {
var i;
return i = t.$watch(function(t) {
return r(t);
}, function() {
k(e) && e.apply(this, arguments), i();
}, n);
}
function h(t, e) {
if (!e) return t;
var n = t.$$watchDelegate, r = n !== l && n !== c, i = r ? function(n, r) {
var i = t(n, r);
return e(i, n, r);
} : function(n, r) {
var i = t(n, r), o = e(i, n, r);
return g(i) ? o : i;
};
return t.$$watchDelegate && t.$$watchDelegate !== u ? i.$$watchDelegate = t.$$watchDelegate : e.$stateful || (i.$$watchDelegate = u, 
i.inputs = [ t ]), i;
}
var p = {
csp: r.csp,
expensiveChecks: !1
}, $ = {
csp: r.csp,
expensiveChecks: !0
};
return function(r, o, a) {
var s, v, m;
switch (typeof r) {
case "string":
m = r = r.trim();
var g = a ? e : t;
if (s = g[m], !s) {
":" === r.charAt(0) && ":" === r.charAt(1) && (v = !0, r = r.substring(2));
var y = a ? $ : p, b = new $i(y), w = new vi(b, n, y);
s = w.parse(r), s.constant ? s.$$watchDelegate = f : v ? (s = i(s), s.$$watchDelegate = s.literal ? l : c) : s.inputs && (s.$$watchDelegate = u), 
g[m] = s;
}
return h(s, o);

case "function":
return h(r, o);

default:
return h(d, o);
}
};
} ];
}
function He() {
this.$get = [ "$rootScope", "$exceptionHandler", function(t, e) {
return ze(function(e) {
t.$evalAsync(e);
}, e);
} ];
}
function Be() {
this.$get = [ "$browser", "$exceptionHandler", function(t, e) {
return ze(function(e) {
t.defer(e);
}, e);
} ];
}
function ze(t, e) {
function i(t, e, n) {
function r(e) {
return function(n) {
i || (i = !0, e.call(t, n));
};
}
var i = !1;
return [ r(e), r(n) ];
}
function a() {
this.$$state = {
status: 0
};
}
function s(t, e) {
return function(n) {
e.call(t, n);
};
}
function u(t) {
var r, i, o;
o = t.pending, t.processScheduled = !1, t.pending = n;
for (var a = 0, s = o.length; s > a; ++a) {
i = o[a][0], r = o[a][t.status];
try {
k(r) ? i.resolve(r(t.value)) : 1 === t.status ? i.resolve(t.value) : i.reject(t.value);
} catch (u) {
i.reject(u), e(u);
}
}
}
function c(e) {
!e.processScheduled && e.pending && (e.processScheduled = !0, t(function() {
u(e);
}));
}
function l() {
this.promise = new a(), this.resolve = s(this, this.resolve), this.reject = s(this, this.reject), 
this.notify = s(this, this.notify);
}
function f(t) {
var e = new l(), n = 0, r = hr(t) ? [] : {};
return o(t, function(t, i) {
n++, m(t).then(function(t) {
r.hasOwnProperty(i) || (r[i] = t, --n || e.resolve(r));
}, function(t) {
r.hasOwnProperty(i) || e.reject(t);
});
}), 0 === n && e.resolve(r), e.promise;
}
var h = r("$q", TypeError), p = function() {
return new l();
};
a.prototype = {
then: function(t, e, n) {
var r = new l();
return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([ r, t, e, n ]), 
this.$$state.status > 0 && c(this.$$state), r.promise;
},
"catch": function(t) {
return this.then(null, t);
},
"finally": function(t, e) {
return this.then(function(e) {
return v(e, !0, t);
}, function(e) {
return v(e, !1, t);
}, e);
}
}, l.prototype = {
resolve: function(t) {
this.promise.$$state.status || (t === this.promise ? this.$$reject(h("qcycle", "Expected promise to be resolved with value other than itself '{0}'", t)) : this.$$resolve(t));
},
$$resolve: function(t) {
var n, r;
r = i(this, this.$$resolve, this.$$reject);
try {
(y(t) || k(t)) && (n = t && t.then), k(n) ? (this.promise.$$state.status = -1, n.call(t, r[0], r[1], this.notify)) : (this.promise.$$state.value = t, 
this.promise.$$state.status = 1, c(this.promise.$$state));
} catch (o) {
r[1](o), e(o);
}
},
reject: function(t) {
this.promise.$$state.status || this.$$reject(t);
},
$$reject: function(t) {
this.promise.$$state.value = t, this.promise.$$state.status = 2, c(this.promise.$$state);
},
notify: function(n) {
var r = this.promise.$$state.pending;
this.promise.$$state.status <= 0 && r && r.length && t(function() {
for (var t, i, o = 0, a = r.length; a > o; o++) {
i = r[o][0], t = r[o][3];
try {
i.notify(k(t) ? t(n) : n);
} catch (s) {
e(s);
}
}
});
}
};
var d = function(t) {
var e = new l();
return e.reject(t), e.promise;
}, $ = function(t, e) {
var n = new l();
return e ? n.resolve(t) : n.reject(t), n.promise;
}, v = function(t, e, n) {
var r = null;
try {
k(n) && (r = n());
} catch (i) {
return $(i, !1);
}
return M(r) ? r.then(function() {
return $(t, e);
}, function(t) {
return $(t, !1);
}) : $(t, e);
}, m = function(t, e, n, r) {
var i = new l();
return i.resolve(t), i.promise.then(e, n, r);
}, g = function b(t) {
function e(t) {
r.resolve(t);
}
function n(t) {
r.reject(t);
}
if (!k(t)) throw h("norslvr", "Expected resolverFn, got '{0}'", t);
if (!(this instanceof b)) return new b(t);
var r = new l();
return t(e, n), r.promise;
};
return g.defer = p, g.reject = d, g.when = m, g.all = f, g;
}
function Ge() {
this.$get = [ "$window", "$timeout", function(t, e) {
var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame, r = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame, i = !!n, o = i ? function(t) {
var e = n(t);
return function() {
r(e);
};
} : function(t) {
var n = e(t, 16.66, !1);
return function() {
e.cancel(n);
};
};
return o.supported = i, o;
} ];
}
function We() {
function t(t) {
function e() {
this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = c(), 
this.$$ChildScope = null;
}
return e.prototype = t, e;
}
var e = 10, n = r("$rootScope"), a = null, s = null;
this.digestTtl = function(t) {
return arguments.length && (e = t), e;
}, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(r, u, l, f) {
function h(t) {
t.currentScope.$$destroyed = !0;
}
function p() {
this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
this.$$isolateBindings = null;
}
function $(t) {
if (E.$$phase) throw n("inprog", "{0} already in progress", E.$$phase);
E.$$phase = t;
}
function v() {
E.$$phase = null;
}
function g(t, e, n) {
do t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n]; while (t = t.$parent);
}
function b() {}
function w() {
for (;A.length; ) try {
A.shift()();
} catch (t) {
u(t);
}
s = null;
}
function x() {
null === s && (s = f.defer(function() {
E.$apply(w);
}));
}
p.prototype = {
constructor: p,
$new: function(e, n) {
var r;
return n = n || this, e ? (r = new p(), r.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = t(this)), 
r = new this.$$ChildScope()), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, 
n.$$childTail = r) : n.$$childHead = n.$$childTail = r, (e || n != this) && r.$on("$destroy", h), 
r;
},
$watch: function(t, e, n) {
var r = l(t);
if (r.$$watchDelegate) return r.$$watchDelegate(this, e, n, r);
var i = this, o = i.$$watchers, s = {
fn: e,
last: b,
get: r,
exp: t,
eq: !!n
};
return a = null, k(e) || (s.fn = d), o || (o = i.$$watchers = []), o.unshift(s), 
function() {
q(o, s), a = null;
};
},
$watchGroup: function(t, e) {
function n() {
u = !1, c ? (c = !1, e(i, i, s)) : e(i, r, s);
}
var r = Array(t.length), i = Array(t.length), a = [], s = this, u = !1, c = !0;
if (!t.length) {
var l = !0;
return s.$evalAsync(function() {
l && e(i, i, s);
}), function() {
l = !1;
};
}
return 1 === t.length ? this.$watch(t[0], function(t, n, o) {
i[0] = t, r[0] = n, e(i, t === n ? i : r, o);
}) : (o(t, function(t, e) {
var o = s.$watch(t, function(t, o) {
i[e] = t, r[e] = o, u || (u = !0, s.$evalAsync(n));
});
a.push(o);
}), function() {
for (;a.length; ) a.shift()();
});
},
$watchCollection: function(t, e) {
function n(t) {
o = t;
var e, n, r, s, u;
if (!m(o)) {
if (y(o)) if (i(o)) {
a !== p && (a = p, v = a.length = 0, f++), e = o.length, v !== e && (f++, a.length = v = e);
for (var c = 0; e > c; c++) u = a[c], s = o[c], r = u !== u && s !== s, r || u === s || (f++, 
a[c] = s);
} else {
a !== d && (a = d = {}, v = 0, f++), e = 0;
for (n in o) o.hasOwnProperty(n) && (e++, s = o[n], u = a[n], n in a ? (r = u !== u && s !== s, 
r || u === s || (f++, a[n] = s)) : (v++, a[n] = s, f++));
if (v > e) {
f++;
for (n in a) o.hasOwnProperty(n) || (v--, delete a[n]);
}
} else a !== o && (a = o, f++);
return f;
}
}
function r() {
if ($ ? ($ = !1, e(o, o, u)) : e(o, s, u), c) if (y(o)) if (i(o)) {
s = Array(o.length);
for (var t = 0; t < o.length; t++) s[t] = o[t];
} else {
s = {};
for (var n in o) Yn.call(o, n) && (s[n] = o[n]);
} else s = o;
}
n.$stateful = !0;
var o, a, s, u = this, c = e.length > 1, f = 0, h = l(t, n), p = [], d = {}, $ = !0, v = 0;
return this.$watch(h, r);
},
$digest: function() {
var t, r, i, o, c, l, h, p, d, m, g = e, y = this, x = [];
$("$digest"), f.$$checkUrlChange(), this === E && null !== s && (f.defer.cancel(s), 
w()), a = null;
do {
for (l = !1, p = y; S.length; ) {
try {
m = S.shift(), m.scope.$eval(m.expression, m.locals);
} catch (A) {
u(A);
}
a = null;
}
t: do {
if (o = p.$$watchers) for (c = o.length; c--; ) try {
if (t = o[c]) if ((r = t.get(p)) === (i = t.last) || (t.eq ? V(r, i) : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i))) {
if (t === a) {
l = !1;
break t;
}
} else l = !0, a = t, t.last = t.eq ? N(r, null) : r, t.fn(r, i === b ? r : i, p), 
5 > g && (d = 4 - g, x[d] || (x[d] = []), x[d].push({
msg: k(t.exp) ? "fn: " + (t.exp.name || "" + t.exp) : t.exp,
newVal: r,
oldVal: i
}));
} catch (A) {
u(A);
}
if (!(h = p.$$childHead || p !== y && p.$$nextSibling)) for (;p !== y && !(h = p.$$nextSibling); ) p = p.$parent;
} while (p = h);
if ((l || S.length) && !g--) throw v(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, x);
} while (l || S.length);
for (v(); C.length; ) try {
C.shift()();
} catch (A) {
u(A);
}
},
$destroy: function() {
if (!this.$$destroyed) {
var t = this.$parent;
if (this.$broadcast("$destroy"), this.$$destroyed = !0, this !== E) {
for (var e in this.$$listenerCount) g(this, this.$$listenerCount[e], e);
t.$$childHead == this && (t.$$childHead = this.$$nextSibling), t.$$childTail == this && (t.$$childTail = this.$$prevSibling), 
this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = d, 
this.$on = this.$watch = this.$watchGroup = function() {
return d;
}, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
}
}
},
$eval: function(t, e) {
return l(t)(this, e);
},
$evalAsync: function(t, e) {
E.$$phase || S.length || f.defer(function() {
S.length && E.$digest();
}), S.push({
scope: this,
expression: t,
locals: e
});
},
$$postDigest: function(t) {
C.push(t);
},
$apply: function(t) {
try {
return $("$apply"), this.$eval(t);
} catch (e) {
u(e);
} finally {
v();
try {
E.$digest();
} catch (e) {
throw u(e), e;
}
}
},
$applyAsync: function(t) {
function e() {
n.$eval(t);
}
var n = this;
t && A.push(e), x();
},
$on: function(t, e) {
var n = this.$$listeners[t];
n || (this.$$listeners[t] = n = []), n.push(e);
var r = this;
do r.$$listenerCount[t] || (r.$$listenerCount[t] = 0), r.$$listenerCount[t]++; while (r = r.$parent);
var i = this;
return function() {
var r = n.indexOf(e);
-1 !== r && (n[r] = null, g(i, 1, t));
};
},
$emit: function(t) {
var e, n, r, i = [], o = this, a = !1, s = {
name: t,
targetScope: o,
stopPropagation: function() {
a = !0;
},
preventDefault: function() {
s.defaultPrevented = !0;
},
defaultPrevented: !1
}, c = I([ s ], arguments, 1);
do {
for (e = o.$$listeners[t] || i, s.currentScope = o, n = 0, r = e.length; r > n; n++) if (e[n]) try {
e[n].apply(null, c);
} catch (l) {
u(l);
} else e.splice(n, 1), n--, r--;
if (a) return s.currentScope = null, s;
o = o.$parent;
} while (o);
return s.currentScope = null, s;
},
$broadcast: function(t) {
var e = this, n = e, r = e, i = {
name: t,
targetScope: e,
preventDefault: function() {
i.defaultPrevented = !0;
},
defaultPrevented: !1
};
if (!e.$$listenerCount[t]) return i;
for (var o, a, s, c = I([ i ], arguments, 1); n = r; ) {
for (i.currentScope = n, o = n.$$listeners[t] || [], a = 0, s = o.length; s > a; a++) if (o[a]) try {
o[a].apply(null, c);
} catch (l) {
u(l);
} else o.splice(a, 1), a--, s--;
if (!(r = n.$$listenerCount[t] && n.$$childHead || n !== e && n.$$nextSibling)) for (;n !== e && !(r = n.$$nextSibling); ) n = n.$parent;
}
return i.currentScope = null, i;
}
};
var E = new p(), S = E.$$asyncQueue = [], C = E.$$postDigestQueue = [], A = E.$$applyAsyncQueue = [];
return E;
} ];
}
function Je() {
var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist = function(e) {
return g(e) ? (t = e, this) : t;
}, this.imgSrcSanitizationWhitelist = function(t) {
return g(t) ? (e = t, this) : e;
}, this.$get = function() {
return function(n, r) {
var i, o = r ? e : t;
return i = rn(n).href, "" === i || i.match(o) ? n : "unsafe:" + i;
};
};
}
function Xe(t) {
if ("self" === t) return t;
if (b(t)) {
if (t.indexOf("***") > -1) throw bi("iwcard", "Illegal sequence *** in string matcher.  String: {0}", t);
return t = dr(t).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + t + "$");
}
if (E(t)) return RegExp("^" + t.source + "$");
throw bi("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
}
function Ye(t) {
var e = [];
return g(t) && o(t, function(t) {
e.push(Xe(t));
}), e;
}
function Ke() {
this.SCE_CONTEXTS = wi;
var t = [ "self" ], e = [];
this.resourceUrlWhitelist = function(e) {
return arguments.length && (t = Ye(e)), t;
}, this.resourceUrlBlacklist = function(t) {
return arguments.length && (e = Ye(t)), e;
}, this.$get = [ "$injector", function(r) {
function i(t, e) {
return "self" === t ? on(e) : !!t.exec(e.href);
}
function o(n) {
var r, o, a = rn("" + n), s = !1;
for (r = 0, o = t.length; o > r; r++) if (i(t[r], a)) {
s = !0;
break;
}
if (s) for (r = 0, o = e.length; o > r; r++) if (i(e[r], a)) {
s = !1;
break;
}
return s;
}
function a(t) {
var e = function(t) {
this.$$unwrapTrustedValue = function() {
return t;
};
};
return t && (e.prototype = new t()), e.prototype.valueOf = function() {
return this.$$unwrapTrustedValue();
}, e.prototype.toString = function() {
return "" + this.$$unwrapTrustedValue();
}, e;
}
function s(t, e) {
var r = h.hasOwnProperty(t) ? h[t] : null;
if (!r) throw bi("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", t, e);
if (null === e || e === n || "" === e) return e;
if ("string" != typeof e) throw bi("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", t);
return new r(e);
}
function u(t) {
return t instanceof f ? t.$$unwrapTrustedValue() : t;
}
function c(t, e) {
if (null === e || e === n || "" === e) return e;
var r = h.hasOwnProperty(t) ? h[t] : null;
if (r && e instanceof r) return e.$$unwrapTrustedValue();
if (t === wi.RESOURCE_URL) {
if (o(e)) return e;
throw bi("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", "" + e);
}
if (t === wi.HTML) return l(e);
throw bi("unsafe", "Attempting to use an unsafe value in a safe context.");
}
var l = function() {
throw bi("unsafe", "Attempting to use an unsafe value in a safe context.");
};
r.has("$sanitize") && (l = r.get("$sanitize"));
var f = a(), h = {};
return h[wi.HTML] = a(f), h[wi.CSS] = a(f), h[wi.URL] = a(f), h[wi.JS] = a(f), h[wi.RESOURCE_URL] = a(h[wi.URL]), 
{
trustAs: s,
getTrusted: c,
valueOf: u
};
} ];
}
function Ze() {
var t = !0;
this.enabled = function(e) {
return arguments.length && (t = !!e), t;
}, this.$get = [ "$parse", "$sceDelegate", function(e, n) {
if (t && 8 > tr) throw bi("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
var r = D(wi);
r.isEnabled = function() {
return t;
}, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, t || (r.trustAs = r.getTrusted = function(t, e) {
return e;
}, r.valueOf = $), r.parseAs = function(t, n) {
var i = e(n);
return i.literal && i.constant ? i : e(n, function(e) {
return r.getTrusted(t, e);
});
};
var i = r.parseAs, a = r.getTrusted, s = r.trustAs;
return o(wi, function(t, e) {
var n = Xn(e);
r[$t("parse_as_" + n)] = function(e) {
return i(t, e);
}, r[$t("get_trusted_" + n)] = function(e) {
return a(t, e);
}, r[$t("trust_as_" + n)] = function(e) {
return s(t, e);
};
}), r;
} ];
}
function Qe() {
this.$get = [ "$window", "$document", function(t, e) {
var n, r, i = {}, o = h((/android (\d+)/.exec(Xn((t.navigator || {}).userAgent)) || [])[1]), a = /Boxee/i.test((t.navigator || {}).userAgent), s = e[0] || {}, u = /^(Moz|webkit|ms)(?=[A-Z])/, c = s.body && s.body.style, l = !1, f = !1;
if (c) {
for (var p in c) if (r = u.exec(p)) {
n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
break;
}
n || (n = "WebkitOpacity" in c && "webkit"), l = !!("transition" in c || n + "Transition" in c), 
f = !!("animation" in c || n + "Animation" in c), !o || l && f || (l = b(s.body.style.webkitTransition), 
f = b(s.body.style.webkitAnimation));
}
return {
history: !(!t.history || !t.history.pushState || 4 > o || a),
hasEvent: function(t) {
if ("input" === t && 11 >= tr) return !1;
if (m(i[t])) {
var e = s.createElement("div");
i[t] = "on" + t in e;
}
return i[t];
},
csp: $r(),
vendorPrefix: n,
transitions: l,
animations: f,
android: o
};
} ];
}
function tn() {
this.$get = [ "$templateCache", "$http", "$q", function(t, e, n) {
function r(i, o) {
function a(t) {
if (!o) throw Xr("tpload", "Failed to load template: {0}", i);
return n.reject(t);
}
r.totalPendingRequests++;
var s = e.defaults && e.defaults.transformResponse;
hr(s) ? s = s.filter(function(t) {
return t !== ie;
}) : s === ie && (s = null);
var u = {
cache: t,
transformResponse: s
};
return e.get(i, u).finally(function() {
r.totalPendingRequests--;
}).then(function(t) {
return t.data;
}, a);
}
return r.totalPendingRequests = 0, r;
} ];
}
function en() {
this.$get = [ "$rootScope", "$browser", "$location", function(t, e, n) {
var r = {};
return r.findBindings = function(t, e, n) {
var r = t.getElementsByClassName("ng-binding"), i = [];
return o(r, function(t) {
var r = cr.element(t).data("$binding");
r && o(r, function(r) {
if (n) {
var o = RegExp("(^|\\s)" + dr(e) + "(\\s|\\||$)");
o.test(r) && i.push(t);
} else -1 != r.indexOf(e) && i.push(t);
});
}), i;
}, r.findModels = function(t, e, n) {
for (var r = [ "ng-", "data-ng-", "ng\\:" ], i = 0; i < r.length; ++i) {
var o = n ? "=" : "*=", a = "[" + r[i] + "model" + o + '"' + e + '"]', s = t.querySelectorAll(a);
if (s.length) return s;
}
}, r.getLocation = function() {
return n.url();
}, r.setLocation = function(e) {
e !== n.url() && (n.url(e), t.$digest());
}, r.whenStable = function(t) {
e.notifyWhenNoOutstandingRequests(t);
}, r;
} ];
}
function nn() {
this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(t, e, n, r, i) {
function o(o, s, u) {
var c, l = g(u) && !u, f = (l ? r : n).defer(), h = f.promise;
return c = e.defer(function() {
try {
f.resolve(o());
} catch (e) {
f.reject(e), i(e);
} finally {
delete a[h.$$timeoutId];
}
l || t.$apply();
}, s), h.$$timeoutId = c, a[c] = f, h;
}
var a = {};
return o.cancel = function(t) {
return t && t.$$timeoutId in a ? (a[t.$$timeoutId].reject("canceled"), delete a[t.$$timeoutId], 
e.defer.cancel(t.$$timeoutId)) : !1;
}, o;
} ];
}
function rn(t) {
var e = t;
return tr && (xi.setAttribute("href", e), e = xi.href), xi.setAttribute("href", e), 
{
href: xi.href,
protocol: xi.protocol ? xi.protocol.replace(/:$/, "") : "",
host: xi.host,
search: xi.search ? xi.search.replace(/^\?/, "") : "",
hash: xi.hash ? xi.hash.replace(/^#/, "") : "",
hostname: xi.hostname,
port: xi.port,
pathname: "/" === xi.pathname.charAt(0) ? xi.pathname : "/" + xi.pathname
};
}
function on(t) {
var e = b(t) ? rn(t) : t;
return e.protocol === ki.protocol && e.host === ki.host;
}
function an() {
this.$get = v(t);
}
function sn(t) {
function e(r, i) {
if (y(r)) {
var a = {};
return o(r, function(t, n) {
a[n] = e(n, t);
}), a;
}
return t.factory(r + n, i);
}
var n = "Filter";
this.register = e, this.$get = [ "$injector", function(t) {
return function(e) {
return t.get(e + n);
};
} ], e("currency", fn), e("date", En), e("filter", un), e("json", Sn), e("limitTo", Cn), 
e("lowercase", Oi), e("number", hn), e("orderBy", An), e("uppercase", _i);
}
function un() {
return function(t, e, n) {
if (!hr(t)) return t;
var r, i;
switch (typeof e) {
case "function":
r = e;
break;

case "boolean":
case "number":
case "string":
i = !0;

case "object":
r = cn(e, n, i);
break;

default:
return t;
}
return t.filter(r);
};
}
function cn(t, e, n) {
var r, i = y(t) && "$" in t;
return e === !0 ? e = V : k(e) || (e = function(t, e) {
return y(t) || y(e) ? !1 : (t = Xn("" + t), e = Xn("" + e), -1 !== t.indexOf(e));
}), r = function(r) {
return i && !y(r) ? ln(r, t.$, e, !1) : ln(r, t, e, n);
};
}
function ln(t, e, n, r, i) {
var o = null !== t ? typeof t : "null", a = null !== e ? typeof e : "null";
if ("string" === a && "!" === e.charAt(0)) return !ln(t, e.substring(1), n, r);
if (hr(t)) return t.some(function(t) {
return ln(t, e, n, r);
});
switch (o) {
case "object":
var s;
if (r) {
for (s in t) if ("$" !== s.charAt(0) && ln(t[s], e, n, !0)) return !0;
return i ? !1 : ln(t, e, n, !1);
}
if ("object" === a) {
for (s in e) {
var u = e[s];
if (!k(u) && !m(u)) {
var c = "$" === s, l = c ? t : t[s];
if (!ln(l, u, n, c, c)) return !1;
}
}
return !0;
}
return n(t, e);

case "function":
return !1;

default:
return n(t, e);
}
}
function fn(t) {
var e = t.NUMBER_FORMATS;
return function(t, n, r) {
return m(n) && (n = e.CURRENCY_SYM), m(r) && (r = e.PATTERNS[1].maxFrac), null == t ? t : pn(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, r).replace(/\u00A4/g, n);
};
}
function hn(t) {
var e = t.NUMBER_FORMATS;
return function(t, n) {
return null == t ? t : pn(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n);
};
}
function pn(t, e, n, r, i) {
if (!isFinite(t) || y(t)) return "";
var o = 0 > t;
t = Math.abs(t);
var a = t + "", s = "", u = [], c = !1;
if (-1 !== a.indexOf("e")) {
var l = a.match(/([\d\.]+)e(-?)(\d+)/);
l && "-" == l[2] && l[3] > i + 1 ? t = 0 : (s = a, c = !0);
}
if (c) i > 0 && 1 > t && (s = t.toFixed(i), t = parseFloat(s)); else {
var f = (a.split(Ei)[1] || "").length;
m(i) && (i = Math.min(Math.max(e.minFrac, f), e.maxFrac)), t = +("" + Math.round(+("" + t + "e" + i)) + "e" + -i);
var h = ("" + t).split(Ei), p = h[0];
h = h[1] || "";
var d, $ = 0, v = e.lgSize, g = e.gSize;
if (p.length >= v + g) for ($ = p.length - v, d = 0; $ > d; d++) ($ - d) % g === 0 && 0 !== d && (s += n), 
s += p.charAt(d);
for (d = $; d < p.length; d++) (p.length - d) % v === 0 && 0 !== d && (s += n), 
s += p.charAt(d);
for (;h.length < i; ) h += "0";
i && "0" !== i && (s += r + h.substr(0, i));
}
return 0 === t && (o = !1), u.push(o ? e.negPre : e.posPre, s, o ? e.negSuf : e.posSuf), 
u.join("");
}
function dn(t, e, n) {
var r = "";
for (0 > t && (r = "-", t = -t), t = "" + t; t.length < e; ) t = "0" + t;
return n && (t = t.substr(t.length - e)), r + t;
}
function $n(t, e, n, r) {
return n = n || 0, function(i) {
var o = i["get" + t]();
return (n > 0 || o > -n) && (o += n), 0 === o && -12 == n && (o = 12), dn(o, e, r);
};
}
function vn(t, e) {
return function(n, r) {
var i = n["get" + t](), o = Kn(e ? "SHORT" + t : t);
return r[o][i];
};
}
function mn(t) {
var e = -1 * t.getTimezoneOffset(), n = e >= 0 ? "+" : "";
return n += dn(Math[e > 0 ? "floor" : "ceil"](e / 60), 2) + dn(Math.abs(e % 60), 2);
}
function gn(t) {
var e = new Date(t, 0, 1).getDay();
return new Date(t, 0, (4 >= e ? 5 : 12) - e);
}
function yn(t) {
return new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay()));
}
function bn(t) {
return function(e) {
var n = gn(e.getFullYear()), r = yn(e), i = +r - +n, o = 1 + Math.round(i / 6048e5);
return dn(o, t);
};
}
function wn(t, e) {
return t.getHours() < 12 ? e.AMPMS[0] : e.AMPMS[1];
}
function xn(t, e) {
return t.getFullYear() <= 0 ? e.ERAS[0] : e.ERAS[1];
}
function kn(t, e) {
return t.getFullYear() <= 0 ? e.ERANAMES[0] : e.ERANAMES[1];
}
function En(t) {
function e(t) {
var e;
if (e = t.match(n)) {
var r = new Date(0), i = 0, o = 0, a = e[8] ? r.setUTCFullYear : r.setFullYear, s = e[8] ? r.setUTCHours : r.setHours;
e[9] && (i = h(e[9] + e[10]), o = h(e[9] + e[11])), a.call(r, h(e[1]), h(e[2]) - 1, h(e[3]));
var u = h(e[4] || 0) - i, c = h(e[5] || 0) - o, l = h(e[6] || 0), f = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
return s.call(r, u, c, l, f), r;
}
return t;
}
var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(n, r, i) {
var a, s, u = "", c = [];
if (r = r || "mediumDate", r = t.DATETIME_FORMATS[r] || r, b(n) && (n = Ai.test(n) ? h(n) : e(n)), 
w(n) && (n = new Date(n)), !x(n)) return n;
for (;r; ) s = Ci.exec(r), s ? (c = I(c, s, 1), r = c.pop()) : (c.push(r), r = null);
return i && "UTC" === i && (n = new Date(n.getTime()), n.setMinutes(n.getMinutes() + n.getTimezoneOffset())), 
o(c, function(e) {
a = Si[e], u += a ? a(n, t.DATETIME_FORMATS) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
}), u;
};
}
function Sn() {
return function(t, e) {
return m(e) && (e = 2), H(t, e);
};
}
function Cn() {
return function(t, e) {
return w(t) && (t = "" + t), hr(t) || b(t) ? (e = Math.abs(+e) === 1 / 0 ? +e : h(e), 
e ? e > 0 ? t.slice(0, e) : t.slice(e) : b(t) ? "" : []) : t;
};
}
function An(t) {
return function(e, n, r) {
function o(t, e) {
for (var r = 0; r < n.length; r++) {
var i = n[r](t, e);
if (0 !== i) return i;
}
return 0;
}
function a(t, e) {
return e ? function(e, n) {
return t(n, e);
} : t;
}
function s(t) {
switch (typeof t) {
case "number":
case "boolean":
case "string":
return !0;

default:
return !1;
}
}
function u(t) {
return null === t ? "null" : "function" == typeof t.valueOf && (t = t.valueOf(), 
s(t)) ? t : "function" == typeof t.toString && (t = "" + t, s(t)) ? t : "";
}
function c(t, e) {
var n = typeof t, r = typeof e;
return n === r && "object" === n && (t = u(t), e = u(e)), n === r ? ("string" === n && (t = t.toLowerCase(), 
e = e.toLowerCase()), t === e ? 0 : e > t ? -1 : 1) : r > n ? -1 : 1;
}
return i(e) ? (n = hr(n) ? n : [ n ], 0 === n.length && (n = [ "+" ]), n = n.map(function(e) {
var n = !1, r = e || $;
if (b(e)) {
if (("+" == e.charAt(0) || "-" == e.charAt(0)) && (n = "-" == e.charAt(0), e = e.substring(1)), 
"" === e) return a(c, n);
if (r = t(e), r.constant) {
var i = r();
return a(function(t, e) {
return c(t[i], e[i]);
}, n);
}
}
return a(function(t, e) {
return c(r(t), r(e));
}, n);
}), ir.call(e).sort(a(o, r))) : e;
};
}
function On(t) {
return k(t) && (t = {
link: t
}), t.restrict = t.restrict || "AC", v(t);
}
function _n(t, e) {
t.$name = e;
}
function Tn(t, e, r, i, a) {
var s = this, u = [], c = s.$$parentForm = t.parent().controller("form") || ji;
s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = a(e.name || e.ngForm || "")(r), 
s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, 
c.$addControl(s), s.$rollbackViewValue = function() {
o(u, function(t) {
t.$rollbackViewValue();
});
}, s.$commitViewValue = function() {
o(u, function(t) {
t.$commitViewValue();
});
}, s.$addControl = function(t) {
at(t.$name, "input"), u.push(t), t.$name && (s[t.$name] = t);
}, s.$$renameControl = function(t, e) {
var n = t.$name;
s[n] === t && delete s[n], s[e] = t, t.$name = e;
}, s.$removeControl = function(t) {
t.$name && s[t.$name] === t && delete s[t.$name], o(s.$pending, function(e, n) {
s.$setValidity(n, null, t);
}), o(s.$error, function(e, n) {
s.$setValidity(n, null, t);
}), o(s.$$success, function(e, n) {
s.$setValidity(n, null, t);
}), q(u, t);
}, zn({
ctrl: this,
$element: t,
set: function(t, e, n) {
var r = t[e];
if (r) {
var i = r.indexOf(n);
-1 === i && r.push(n);
} else t[e] = [ n ];
},
unset: function(t, e, n) {
var r = t[e];
r && (q(r, n), 0 === r.length && delete t[e]);
},
parentForm: c,
$animate: i
}), s.$setDirty = function() {
i.removeClass(t, $o), i.addClass(t, vo), s.$dirty = !0, s.$pristine = !1, c.$setDirty();
}, s.$setPristine = function() {
i.setClass(t, $o, vo + " " + Pi), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, 
o(u, function(t) {
t.$setPristine();
});
}, s.$setUntouched = function() {
o(u, function(t) {
t.$setUntouched();
});
}, s.$setSubmitted = function() {
i.addClass(t, Pi), s.$submitted = !0, c.$setSubmitted();
};
}
function Mn(t) {
t.$formatters.push(function(e) {
return t.$isEmpty(e) ? e : "" + e;
});
}
function jn(t, e, n, r, i, o) {
Pn(t, e, n, r, i, o), Mn(r);
}
function Pn(t, e, n, r, i, o) {
var a = Xn(e[0].type);
if (!i.android) {
var s = !1;
e.on("compositionstart", function() {
s = !0;
}), e.on("compositionend", function() {
s = !1, u();
});
}
var u = function(t) {
if (c && (o.defer.cancel(c), c = null), !s) {
var i = e.val(), u = t && t.type;
"password" === a || n.ngTrim && "false" === n.ngTrim || (i = pr(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, u);
}
};
if (i.hasEvent("input")) e.on("input", u); else {
var c, l = function(t, e, n) {
c || (c = o.defer(function() {
c = null, e && e.value === n || u(t);
}));
};
e.on("keydown", function(t) {
var e = t.keyCode;
91 === e || e > 15 && 19 > e || e >= 37 && 40 >= e || l(t, this, this.value);
}), i.hasEvent("paste") && e.on("paste cut", l);
}
e.on("change", u), r.$render = function() {
e.val(r.$isEmpty(r.$viewValue) ? "" : r.$viewValue);
};
}
function Rn(t, e) {
if (x(t)) return t;
if (b(t)) {
Hi.lastIndex = 0;
var n = Hi.exec(t);
if (n) {
var r = +n[1], i = +n[2], o = 0, a = 0, s = 0, u = 0, c = gn(r), l = 7 * (i - 1);
return e && (o = e.getHours(), a = e.getMinutes(), s = e.getSeconds(), u = e.getMilliseconds()), 
new Date(r, 0, c.getDate() + l, o, a, s, u);
}
}
return NaN;
}
function qn(t, e) {
return function(n, r) {
var i, a;
if (x(n)) return n;
if (b(n)) {
if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), 
Di.test(n)) return new Date(n);
if (t.lastIndex = 0, i = t.exec(n)) return i.shift(), a = r ? {
yyyy: r.getFullYear(),
MM: r.getMonth() + 1,
dd: r.getDate(),
HH: r.getHours(),
mm: r.getMinutes(),
ss: r.getSeconds(),
sss: r.getMilliseconds() / 1e3
} : {
yyyy: 1970,
MM: 1,
dd: 1,
HH: 0,
mm: 0,
ss: 0,
sss: 0
}, o(i, function(t, n) {
n < e.length && (a[e[n]] = +t);
}), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0);
}
return NaN;
};
}
function Nn(t, e, r, i) {
return function(o, a, s, u, c, l, f) {
function h(t) {
return t && !(t.getTime && t.getTime() !== t.getTime());
}
function p(t) {
return g(t) ? x(t) ? t : r(t) : n;
}
Dn(o, a, s, u), Pn(o, a, s, u, c, l);
var d, $ = u && u.$options && u.$options.timezone;
if (u.$$parserName = t, u.$parsers.push(function(t) {
if (u.$isEmpty(t)) return null;
if (e.test(t)) {
var i = r(t, d);
return "UTC" === $ && i.setMinutes(i.getMinutes() - i.getTimezoneOffset()), i;
}
return n;
}), u.$formatters.push(function(t) {
if (t && !x(t)) throw bo("datefmt", "Expected `{0}` to be a date", t);
if (h(t)) {
if (d = t, d && "UTC" === $) {
var e = 6e4 * d.getTimezoneOffset();
d = new Date(d.getTime() + e);
}
return f("date")(t, i, $);
}
return d = null, "";
}), g(s.min) || s.ngMin) {
var v;
u.$validators.min = function(t) {
return !h(t) || m(v) || r(t) >= v;
}, s.$observe("min", function(t) {
v = p(t), u.$validate();
});
}
if (g(s.max) || s.ngMax) {
var y;
u.$validators.max = function(t) {
return !h(t) || m(y) || r(t) <= y;
}, s.$observe("max", function(t) {
y = p(t), u.$validate();
});
}
};
}
function Dn(t, e, r, i) {
var o = e[0], a = i.$$hasNativeValidators = y(o.validity);
a && i.$parsers.push(function(t) {
var r = e.prop(Jn) || {};
return r.badInput && !r.typeMismatch ? n : t;
});
}
function Vn(t, e, r, i, o, a) {
if (Dn(t, e, r, i), Pn(t, e, r, i, o, a), i.$$parserName = "number", i.$parsers.push(function(t) {
return i.$isEmpty(t) ? null : Fi.test(t) ? parseFloat(t) : n;
}), i.$formatters.push(function(t) {
if (!i.$isEmpty(t)) {
if (!w(t)) throw bo("numfmt", "Expected `{0}` to be a number", t);
t = "" + t;
}
return t;
}), g(r.min) || r.ngMin) {
var s;
i.$validators.min = function(t) {
return i.$isEmpty(t) || m(s) || t >= s;
}, r.$observe("min", function(t) {
g(t) && !w(t) && (t = parseFloat(t, 10)), s = w(t) && !isNaN(t) ? t : n, i.$validate();
});
}
if (g(r.max) || r.ngMax) {
var u;
i.$validators.max = function(t) {
return i.$isEmpty(t) || m(u) || u >= t;
}, r.$observe("max", function(t) {
g(t) && !w(t) && (t = parseFloat(t, 10)), u = w(t) && !isNaN(t) ? t : n, i.$validate();
});
}
}
function In(t, e, n, r, i, o) {
Pn(t, e, n, r, i, o), Mn(r), r.$$parserName = "url", r.$validators.url = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || Vi.test(n);
};
}
function Fn(t, e, n, r, i, o) {
Pn(t, e, n, r, i, o), Mn(r), r.$$parserName = "email", r.$validators.email = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || Ii.test(n);
};
}
function Ln(t, e, n, r) {
m(n.name) && e.attr("name", c());
var i = function(t) {
e[0].checked && r.$setViewValue(n.value, t && t.type);
};
e.on("click", i), r.$render = function() {
var t = n.value;
e[0].checked = t == r.$viewValue;
}, n.$observe("value", r.$render);
}
function Un(t, e, n, i, o) {
var a;
if (g(i)) {
if (a = t(i), !a.constant) throw r("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, i);
return a(e);
}
return o;
}
function Hn(t, e, n, r, i, o, a, s) {
var u = Un(s, t, "ngTrueValue", n.ngTrueValue, !0), c = Un(s, t, "ngFalseValue", n.ngFalseValue, !1), l = function(t) {
r.$setViewValue(e[0].checked, t && t.type);
};
e.on("click", l), r.$render = function() {
e[0].checked = r.$viewValue;
}, r.$isEmpty = function(t) {
return t === !1;
}, r.$formatters.push(function(t) {
return V(t, u);
}), r.$parsers.push(function(t) {
return t ? u : c;
});
}
function Bn(t, e) {
return t = "ngClass" + t, [ "$animate", function(n) {
function r(t, e) {
var n = [];
t: for (var r = 0; r < t.length; r++) {
for (var i = t[r], o = 0; o < e.length; o++) if (i == e[o]) continue t;
n.push(i);
}
return n;
}
function i(t) {
if (hr(t)) return t;
if (b(t)) return t.split(" ");
if (y(t)) {
var e = [];
return o(t, function(t, n) {
t && (e = e.concat(n.split(" ")));
}), e;
}
return t;
}
return {
restrict: "AC",
link: function(a, s, u) {
function c(t) {
var e = f(t, 1);
u.$addClass(e);
}
function l(t) {
var e = f(t, -1);
u.$removeClass(e);
}
function f(t, e) {
var n = s.data("$classCounts") || {}, r = [];
return o(t, function(t) {
(e > 0 || n[t]) && (n[t] = (n[t] || 0) + e, n[t] === +(e > 0) && r.push(t));
}), s.data("$classCounts", n), r.join(" ");
}
function h(t, e) {
var i = r(e, t), o = r(t, e);
i = f(i, 1), o = f(o, -1), i && i.length && n.addClass(s, i), o && o.length && n.removeClass(s, o);
}
function p(t) {
if (e === !0 || a.$index % 2 === e) {
var n = i(t || []);
if (d) {
if (!V(t, d)) {
var r = i(d);
h(r, n);
}
} else c(n);
}
d = D(t);
}
var d;
a.$watch(u[t], p, !0), u.$observe("class", function() {
p(a.$eval(u[t]));
}), "ngClass" !== t && a.$watch("$index", function(n, r) {
var o = 1 & n;
if (o !== (1 & r)) {
var s = i(a.$eval(u[t]));
o === e ? c(s) : l(s);
}
});
}
};
} ];
}
function zn(t) {
function e(t, e, u) {
e === n ? r("$pending", t, u) : i("$pending", t, u), T(e) ? e ? (f(s.$error, t, u), 
l(s.$$success, t, u)) : (l(s.$error, t, u), f(s.$$success, t, u)) : (f(s.$error, t, u), 
f(s.$$success, t, u)), s.$pending ? (o(yo, !0), s.$valid = s.$invalid = n, a("", null)) : (o(yo, !1), 
s.$valid = Gn(s.$error), s.$invalid = !s.$valid, a("", s.$valid));
var c;
c = s.$pending && s.$pending[t] ? n : s.$error[t] ? !1 : s.$$success[t] ? !0 : null, 
a(t, c), h.$setValidity(t, c, s);
}
function r(t, e, n) {
s[t] || (s[t] = {}), l(s[t], e, n);
}
function i(t, e, r) {
s[t] && f(s[t], e, r), Gn(s[t]) && (s[t] = n);
}
function o(t, e) {
e && !c[t] ? (p.addClass(u, t), c[t] = !0) : !e && c[t] && (p.removeClass(u, t), 
c[t] = !1);
}
function a(t, e) {
t = t ? "-" + nt(t, "-") : "", o(ho + t, e === !0), o(po + t, e === !1);
}
var s = t.ctrl, u = t.$element, c = {}, l = t.set, f = t.unset, h = t.parentForm, p = t.$animate;
c[po] = !(c[ho] = u.hasClass(ho)), s.$setValidity = e;
}
function Gn(t) {
if (t) for (var e in t) return !1;
return !0;
}
var Wn = /^\/(.+)\/([a-z]*)$/, Jn = "validity", Xn = function(t) {
return b(t) ? t.toLowerCase() : t;
}, Yn = Object.prototype.hasOwnProperty, Kn = function(t) {
return b(t) ? t.toUpperCase() : t;
}, Zn = function(t) {
return b(t) ? t.replace(/[A-Z]/g, function(t) {
return String.fromCharCode(32 | t.charCodeAt(0));
}) : t;
}, Qn = function(t) {
return b(t) ? t.replace(/[a-z]/g, function(t) {
return String.fromCharCode(-33 & t.charCodeAt(0));
}) : t;
};
"i" !== "I".toLowerCase() && (Xn = Zn, Kn = Qn);
var tr, er, nr, rr, ir = [].slice, or = [].splice, ar = [].push, sr = Object.prototype.toString, ur = r("ng"), cr = t.angular || (t.angular = {}), lr = 0;
tr = e.documentMode, d.$inject = [], $.$inject = [];
var fr, hr = Array.isArray, pr = function(t) {
return b(t) ? t.trim() : t;
}, dr = function(t) {
return t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
}, $r = function() {
if (g($r.isActive_)) return $r.isActive_;
var t = !(!e.querySelector("[ng-csp]") && !e.querySelector("[data-ng-csp]"));
if (!t) try {
Function("");
} catch (n) {
t = !0;
}
return $r.isActive_ = t;
}, vr = [ "ng-", "data-ng-", "ng:", "x-ng-" ], mr = /[A-Z]/g, gr = !1, yr = 1, br = 3, wr = 8, xr = 9, kr = 11, Er = {
full: "1.3.15",
major: 1,
minor: 3,
dot: 15,
codeName: "locality-filtration"
};
bt.expando = "ng339";
var Sr = bt.cache = {}, Cr = 1, Ar = function(t, e, n) {
t.addEventListener(e, n, !1);
}, Or = function(t, e, n) {
t.removeEventListener(e, n, !1);
};
bt._data = function(t) {
return this.cache[t[this.expando]] || {};
};
var _r = /([\:\-\_]+(.))/g, Tr = /^moz([A-Z])/, Mr = {
mouseleave: "mouseout",
mouseenter: "mouseover"
}, jr = r("jqLite"), Pr = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Rr = /<|&#?\w+;/, qr = /<([\w:]+)/, Nr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Dr = {
option: [ 1, '<select multiple="multiple">', "</select>" ],
thead: [ 1, "<table>", "</table>" ],
col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default: [ 0, "", "" ]
};
Dr.optgroup = Dr.option, Dr.tbody = Dr.tfoot = Dr.colgroup = Dr.caption = Dr.thead, 
Dr.th = Dr.td;
var Vr = bt.prototype = {
ready: function(n) {
function r() {
i || (i = !0, n());
}
var i = !1;
"complete" === e.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), bt(t).on("load", r));
},
toString: function() {
var t = [];
return o(this, function(e) {
t.push("" + e);
}), "[" + t.join(", ") + "]";
},
eq: function(t) {
return er(t >= 0 ? this[t] : this[this.length + t]);
},
length: 0,
push: ar,
sort: [].sort,
splice: [].splice
}, Ir = {};
o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(t) {
Ir[Xn(t)] = t;
});
var Fr = {};
o("input,select,option,textarea,button,form,details".split(","), function(t) {
Fr[t] = !0;
});
var Lr = {
ngMinlength: "minlength",
ngMaxlength: "maxlength",
ngMin: "min",
ngMax: "max",
ngPattern: "pattern"
};
o({
data: Ct,
removeData: Et
}, function(t, e) {
bt[e] = t;
}), o({
data: Ct,
inheritedData: jt,
scope: function(t) {
return er.data(t, "$scope") || jt(t.parentNode || t, [ "$isolateScope", "$scope" ]);
},
isolateScope: function(t) {
return er.data(t, "$isolateScope") || er.data(t, "$isolateScopeNoTemplate");
},
controller: Mt,
injector: function(t) {
return jt(t, "$injector");
},
removeAttr: function(t, e) {
t.removeAttribute(e);
},
hasClass: At,
css: function(t, e, r) {
return e = $t(e), g(r) ? (t.style[e] = r, n) : t.style[e];
},
attr: function(t, e, r) {
var i = Xn(e);
if (Ir[i]) {
if (!g(r)) return t[e] || (t.attributes.getNamedItem(e) || d).specified ? i : n;
r ? (t[e] = !0, t.setAttribute(e, i)) : (t[e] = !1, t.removeAttribute(i));
} else if (g(r)) t.setAttribute(e, r); else if (t.getAttribute) {
var o = t.getAttribute(e, 2);
return null === o ? n : o;
}
},
prop: function(t, e, r) {
return g(r) ? (t[e] = r, n) : t[e];
},
text: function() {
function t(t, e) {
if (m(e)) {
var n = t.nodeType;
return n === yr || n === br ? t.textContent : "";
}
t.textContent = e;
}
return t.$dv = "", t;
}(),
val: function(t, e) {
if (m(e)) {
if (t.multiple && "select" === R(t)) {
var n = [];
return o(t.options, function(t) {
t.selected && n.push(t.value || t.text);
}), 0 === n.length ? null : n;
}
return t.value;
}
t.value = e;
},
html: function(t, e) {
return m(e) ? t.innerHTML : (xt(t, !0), t.innerHTML = e, n);
},
empty: Pt
}, function(t, e) {
bt.prototype[e] = function(e, r) {
var i, o, a = this.length;
if (t !== Pt && (2 == t.length && t !== At && t !== Mt ? e : r) === n) {
if (y(e)) {
for (i = 0; a > i; i++) if (t === Ct) t(this[i], e); else for (o in e) t(this[i], o, e[o]);
return this;
}
for (var s = t.$dv, u = s === n ? Math.min(a, 1) : a, c = 0; u > c; c++) {
var l = t(this[c], e, r);
s = s ? s + l : l;
}
return s;
}
for (i = 0; a > i; i++) t(this[i], e, r);
return this;
};
}), o({
removeData: Et,
on: function Wo(t, e, n, r) {
if (g(r)) throw jr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
if (mt(t)) {
var i = St(t, !0), o = i.events, a = i.handle;
a || (a = i.handle = Vt(t, o));
for (var s = e.indexOf(" ") >= 0 ? e.split(" ") : [ e ], u = s.length; u--; ) {
e = s[u];
var c = o[e];
c || (o[e] = [], "mouseenter" === e || "mouseleave" === e ? Wo(t, Mr[e], function(t) {
var n = this, r = t.relatedTarget;
(!r || r !== n && !n.contains(r)) && a(t, e);
}) : "$destroy" !== e && Ar(t, e, a), c = o[e]), c.push(n);
}
}
},
off: kt,
one: function(t, e, n) {
t = er(t), t.on(e, function r() {
t.off(e, n), t.off(e, r);
}), t.on(e, n);
},
replaceWith: function(t, e) {
var n, r = t.parentNode;
xt(t), o(new bt(e), function(e) {
n ? r.insertBefore(e, n.nextSibling) : r.replaceChild(e, t), n = e;
});
},
children: function(t) {
var e = [];
return o(t.childNodes, function(t) {
t.nodeType === yr && e.push(t);
}), e;
},
contents: function(t) {
return t.contentDocument || t.childNodes || [];
},
append: function(t, e) {
var n = t.nodeType;
if (n === yr || n === kr) {
e = new bt(e);
for (var r = 0, i = e.length; i > r; r++) {
var o = e[r];
t.appendChild(o);
}
}
},
prepend: function(t, e) {
if (t.nodeType === yr) {
var n = t.firstChild;
o(new bt(e), function(e) {
t.insertBefore(e, n);
});
}
},
wrap: function(t, e) {
e = er(e).eq(0).clone()[0];
var n = t.parentNode;
n && n.replaceChild(e, t), e.appendChild(t);
},
remove: Rt,
detach: function(t) {
Rt(t, !0);
},
after: function(t, e) {
var n = t, r = t.parentNode;
e = new bt(e);
for (var i = 0, o = e.length; o > i; i++) {
var a = e[i];
r.insertBefore(a, n.nextSibling), n = a;
}
},
addClass: _t,
removeClass: Ot,
toggleClass: function(t, e, n) {
e && o(e.split(" "), function(e) {
var r = n;
m(r) && (r = !At(t, e)), (r ? _t : Ot)(t, e);
});
},
parent: function(t) {
var e = t.parentNode;
return e && e.nodeType !== kr ? e : null;
},
next: function(t) {
return t.nextElementSibling;
},
find: function(t, e) {
return t.getElementsByTagName ? t.getElementsByTagName(e) : [];
},
clone: wt,
triggerHandler: function(t, e, n) {
var r, i, a, s = e.type || e, u = St(t), c = u && u.events, l = c && c[s];
l && (r = {
preventDefault: function() {
this.defaultPrevented = !0;
},
isDefaultPrevented: function() {
return this.defaultPrevented === !0;
},
stopImmediatePropagation: function() {
this.immediatePropagationStopped = !0;
},
isImmediatePropagationStopped: function() {
return this.immediatePropagationStopped === !0;
},
stopPropagation: d,
type: s,
target: t
}, e.type && (r = f(r, e)), i = D(l), a = n ? [ r ].concat(n) : [ r ], o(i, function(e) {
r.isImmediatePropagationStopped() || e.apply(t, a);
}));
}
}, function(t, e) {
bt.prototype[e] = function(e, n, r) {
for (var i, o = 0, a = this.length; a > o; o++) m(i) ? (i = t(this[o], e, n, r), 
g(i) && (i = er(i))) : Tt(i, t(this[o], e, n, r));
return g(i) ? i : this;
}, bt.prototype.bind = bt.prototype.on, bt.prototype.unbind = bt.prototype.off;
}), Lt.prototype = {
put: function(t, e) {
this[Ft(t, this.nextUid)] = e;
},
get: function(t) {
return this[Ft(t, this.nextUid)];
},
remove: function(t) {
var e = this[t = Ft(t, this.nextUid)];
return delete this[t], e;
}
};
var Ur = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Hr = /,/, Br = /^\s*(_?)(\S+?)\1\s*$/, zr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Gr = r("$injector");
Bt.$$annotate = Ht;
var Wr = r("$animate"), Jr = [ "$provide", function(t) {
this.$$selectors = {}, this.register = function(e, n) {
var r = e + "-animation";
if (e && "." != e.charAt(0)) throw Wr("notcsel", "Expecting class selector starting with '.' got '{0}'.", e);
this.$$selectors[e.substr(1)] = r, t.factory(r, n);
}, this.classNameFilter = function(t) {
return 1 === arguments.length && (this.$$classNameFilter = t instanceof RegExp ? t : null), 
this.$$classNameFilter;
}, this.$get = [ "$$q", "$$asyncCallback", "$rootScope", function(t, e, n) {
function r(e) {
var r, i = t.defer();
return i.promise.$$cancelFn = function() {
r && r();
}, n.$$postDigest(function() {
r = e(function() {
i.resolve();
});
}), i.promise;
}
function i(t, e) {
var n = [], r = [], i = ct();
return o((t.attr("class") || "").split(/\s+/), function(t) {
i[t] = !0;
}), o(e, function(t, e) {
var o = i[e];
t === !1 && o ? r.push(e) : t !== !0 || o || n.push(e);
}), n.length + r.length > 0 && [ n.length ? n : null, r.length ? r : null ];
}
function a(t, e, n) {
for (var r = 0, i = e.length; i > r; ++r) {
var o = e[r];
t[o] = n;
}
}
function s() {
return c || (c = t.defer(), e(function() {
c.resolve(), c = null;
})), c.promise;
}
function u(t, e) {
if (cr.isObject(e)) {
var n = f(e.from || {}, e.to || {});
t.css(n);
}
}
var c;
return {
animate: function(t, e, n) {
return u(t, {
from: e,
to: n
}), s();
},
enter: function(t, e, n, r) {
return u(t, r), n ? n.after(t) : e.prepend(t), s();
},
leave: function(t, e) {
return u(t, e), t.remove(), s();
},
move: function(t, e, n, r) {
return this.enter(t, e, n, r);
},
addClass: function(t, e, n) {
return this.setClass(t, e, [], n);
},
$$addClassImmediately: function(t, e, n) {
return t = er(t), e = b(e) ? e : hr(e) ? e.join(" ") : "", o(t, function(t) {
_t(t, e);
}), u(t, n), s();
},
removeClass: function(t, e, n) {
return this.setClass(t, [], e, n);
},
$$removeClassImmediately: function(t, e, n) {
return t = er(t), e = b(e) ? e : hr(e) ? e.join(" ") : "", o(t, function(t) {
Ot(t, e);
}), u(t, n), s();
},
setClass: function(t, e, n, o) {
var s = this, u = "$$animateClasses", c = !1;
t = er(t);
var l = t.data(u);
l ? o && l.options && (l.options = cr.extend(l.options || {}, o)) : (l = {
classes: {},
options: o
}, c = !0);
var f = l.classes;
return e = hr(e) ? e : e.split(" "), n = hr(n) ? n : n.split(" "), a(f, e, !0), 
a(f, n, !1), c && (l.promise = r(function(e) {
var n = t.data(u);
if (t.removeData(u), n) {
var r = i(t, n.classes);
r && s.$$setClassImmediately(t, r[0], r[1], n.options);
}
e();
}), t.data(u, l)), l.promise;
},
$$setClassImmediately: function(t, e, n, r) {
return e && this.$$addClassImmediately(t, e), n && this.$$removeClassImmediately(t, n), 
u(t, r), s();
},
enabled: d,
cancel: d
};
} ];
} ], Xr = r("$compile");
Kt.$inject = [ "$provide", "$$sanitizeUriProvider" ];
var Yr = /^((?:x|data)[\:\-_])/i, Kr = r("$controller"), Zr = "application/json", Qr = {
"Content-Type": Zr + ";charset=utf-8"
}, ti = /^\[|^\{(?!\{)/, ei = {
"[": /]$/,
"{": /}$/
}, ni = /^\)\]\}',?\n/, ri = r("$interpolate"), ii = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, oi = {
http: 80,
https: 443,
ftp: 21
}, ai = r("$location"), si = {
$$html5: !1,
$$replace: !1,
absUrl: Oe("$$absUrl"),
url: function(t) {
if (m(t)) return this.$$url;
var e = ii.exec(t);
return (e[1] || "" === t) && this.path(decodeURIComponent(e[1])), (e[2] || e[1] || "" === t) && this.search(e[3] || ""), 
this.hash(e[5] || ""), this;
},
protocol: Oe("$$protocol"),
host: Oe("$$host"),
port: Oe("$$port"),
path: _e("$$path", function(t) {
return t = null !== t ? "" + t : "", "/" == t.charAt(0) ? t : "/" + t;
}),
search: function(t, e) {
switch (arguments.length) {
case 0:
return this.$$search;

case 1:
if (b(t) || w(t)) t = "" + t, this.$$search = W(t); else {
if (!y(t)) throw ai("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
t = N(t, {}), o(t, function(e, n) {
null == e && delete t[n];
}), this.$$search = t;
}
break;

default:
m(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e;
}
return this.$$compose(), this;
},
hash: _e("$$hash", function(t) {
return null !== t ? "" + t : "";
}),
replace: function() {
return this.$$replace = !0, this;
}
};
o([ Ae, Ce, Se ], function(t) {
t.prototype = Object.create(si), t.prototype.state = function(e) {
if (!arguments.length) return this.$$state;
if (t !== Se || !this.$$html5) throw ai("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
return this.$$state = m(e) ? null : e, this;
};
});
var ui = r("$parse"), ci = Function.prototype.call, li = Function.prototype.apply, fi = Function.prototype.bind, hi = ct();
o({
"null": function() {
return null;
},
"true": function() {
return !0;
},
"false": function() {
return !1;
},
undefined: function() {}
}, function(t, e) {
t.constant = t.literal = t.sharedGetter = !0, hi[e] = t;
}), hi.this = function(t) {
return t;
}, hi.this.sharedGetter = !0;
var pi = f(ct(), {
"+": function(t, e, r, i) {
return r = r(t, e), i = i(t, e), g(r) ? g(i) ? r + i : r : g(i) ? i : n;
},
"-": function(t, e, n, r) {
return n = n(t, e), r = r(t, e), (g(n) ? n : 0) - (g(r) ? r : 0);
},
"*": function(t, e, n, r) {
return n(t, e) * r(t, e);
},
"/": function(t, e, n, r) {
return n(t, e) / r(t, e);
},
"%": function(t, e, n, r) {
return n(t, e) % r(t, e);
},
"===": function(t, e, n, r) {
return n(t, e) === r(t, e);
},
"!==": function(t, e, n, r) {
return n(t, e) !== r(t, e);
},
"==": function(t, e, n, r) {
return n(t, e) == r(t, e);
},
"!=": function(t, e, n, r) {
return n(t, e) != r(t, e);
},
"<": function(t, e, n, r) {
return n(t, e) < r(t, e);
},
">": function(t, e, n, r) {
return n(t, e) > r(t, e);
},
"<=": function(t, e, n, r) {
return n(t, e) <= r(t, e);
},
">=": function(t, e, n, r) {
return n(t, e) >= r(t, e);
},
"&&": function(t, e, n, r) {
return n(t, e) && r(t, e);
},
"||": function(t, e, n, r) {
return n(t, e) || r(t, e);
},
"!": function(t, e, n) {
return !n(t, e);
},
"=": !0,
"|": !0
}), di = {
n: "\n",
f: "\f",
r: "\r",
t: "	",
v: "",
"'": "'",
'"': '"'
}, $i = function(t) {
this.options = t;
};
$i.prototype = {
constructor: $i,
lex: function(t) {
for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
var e = this.text.charAt(this.index);
if ('"' === e || "'" === e) this.readString(e); else if (this.isNumber(e) || "." === e && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(e)) this.readIdent(); else if (this.is(e, "(){}[].,;:?")) this.tokens.push({
index: this.index,
text: e
}), this.index++; else if (this.isWhitespace(e)) this.index++; else {
var n = e + this.peek(), r = n + this.peek(2), i = pi[e], o = pi[n], a = pi[r];
if (i || o || a) {
var s = a ? r : o ? n : e;
this.tokens.push({
index: this.index,
text: s,
operator: !0
}), this.index += s.length;
} else this.throwError("Unexpected next character ", this.index, this.index + 1);
}
}
return this.tokens;
},
is: function(t, e) {
return -1 !== e.indexOf(t);
},
peek: function(t) {
var e = t || 1;
return this.index + e < this.text.length ? this.text.charAt(this.index + e) : !1;
},
isNumber: function(t) {
return t >= "0" && "9" >= t && "string" == typeof t;
},
isWhitespace: function(t) {
return " " === t || "\r" === t || "	" === t || "\n" === t || "" === t || " " === t;
},
isIdent: function(t) {
return t >= "a" && "z" >= t || t >= "A" && "Z" >= t || "_" === t || "$" === t;
},
isExpOperator: function(t) {
return "-" === t || "+" === t || this.isNumber(t);
},
throwError: function(t, e, n) {
n = n || this.index;
var r = g(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" : " " + n;
throw ui("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", t, r, this.text);
},
readNumber: function() {
for (var t = "", e = this.index; this.index < this.text.length; ) {
var n = Xn(this.text.charAt(this.index));
if ("." == n || this.isNumber(n)) t += n; else {
var r = this.peek();
if ("e" == n && this.isExpOperator(r)) t += n; else if (this.isExpOperator(n) && r && this.isNumber(r) && "e" == t.charAt(t.length - 1)) t += n; else {
if (!this.isExpOperator(n) || r && this.isNumber(r) || "e" != t.charAt(t.length - 1)) break;
this.throwError("Invalid exponent");
}
}
this.index++;
}
this.tokens.push({
index: e,
text: t,
constant: !0,
value: +t
});
},
readIdent: function() {
for (var t = this.index; this.index < this.text.length; ) {
var e = this.text.charAt(this.index);
if (!this.isIdent(e) && !this.isNumber(e)) break;
this.index++;
}
this.tokens.push({
index: t,
text: this.text.slice(t, this.index),
identifier: !0
});
},
readString: function(t) {
var e = this.index;
this.index++;
for (var r = "", i = t, o = !1; this.index < this.text.length; ) {
var a = this.text.charAt(this.index);
if (i += a, o) {
if ("u" === a) {
var s = this.text.substring(this.index + 1, this.index + 5);
s.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + s + "]"), 
this.index += 4, r += String.fromCharCode(parseInt(s, 16));
} else {
var u = di[a];
r += u || a;
}
o = !1;
} else if ("\\" === a) o = !0; else {
if (a === t) return this.index++, this.tokens.push({
index: e,
text: i,
constant: !0,
value: r
}), n;
r += a;
}
this.index++;
}
this.throwError("Unterminated quote", e);
}
};
var vi = function(t, e, n) {
this.lexer = t, this.$filter = e, this.options = n;
};
vi.ZERO = f(function() {
return 0;
}, {
sharedGetter: !0,
constant: !0
}), vi.prototype = {
constructor: vi,
parse: function(t) {
this.text = t, this.tokens = this.lexer.lex(t);
var e = this.statements();
return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
e.literal = !!e.literal, e.constant = !!e.constant, e;
},
primary: function() {
var t;
this.expect("(") ? (t = this.filterChain(), this.consume(")")) : this.expect("[") ? t = this.arrayDeclaration() : this.expect("{") ? t = this.object() : this.peek().identifier && this.peek().text in hi ? t = hi[this.consume().text] : this.peek().identifier ? t = this.identifier() : this.peek().constant ? t = this.constant() : this.throwError("not a primary expression", this.peek());
for (var e, n; e = this.expect("(", "[", "."); ) "(" === e.text ? (t = this.functionCall(t, n), 
n = null) : "[" === e.text ? (n = t, t = this.objectIndex(t)) : "." === e.text ? (n = t, 
t = this.fieldAccess(t)) : this.throwError("IMPOSSIBLE");
return t;
},
throwError: function(t, e) {
throw ui("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", e.text, t, e.index + 1, this.text, this.text.substring(e.index));
},
peekToken: function() {
if (0 === this.tokens.length) throw ui("ueoe", "Unexpected end of expression: {0}", this.text);
return this.tokens[0];
},
peek: function(t, e, n, r) {
return this.peekAhead(0, t, e, n, r);
},
peekAhead: function(t, e, n, r, i) {
if (this.tokens.length > t) {
var o = this.tokens[t], a = o.text;
if (a === e || a === n || a === r || a === i || !e && !n && !r && !i) return o;
}
return !1;
},
expect: function(t, e, n, r) {
var i = this.peek(t, e, n, r);
return i ? (this.tokens.shift(), i) : !1;
},
consume: function(t) {
if (0 === this.tokens.length) throw ui("ueoe", "Unexpected end of expression: {0}", this.text);
var e = this.expect(t);
return e || this.throwError("is unexpected, expecting [" + t + "]", this.peek()), 
e;
},
unaryFn: function(t, e) {
var n = pi[t];
return f(function(t, r) {
return n(t, r, e);
}, {
constant: e.constant,
inputs: [ e ]
});
},
binaryFn: function(t, e, n, r) {
var i = pi[e];
return f(function(e, r) {
return i(e, r, t, n);
}, {
constant: t.constant && n.constant,
inputs: !r && [ t, n ]
});
},
identifier: function() {
for (var t = this.consume().text; this.peek(".") && this.peekAhead(1).identifier && !this.peekAhead(2, "("); ) t += this.consume().text + this.consume().text;
return Fe(t, this.options, this.text);
},
constant: function() {
var t = this.consume().value;
return f(function() {
return t;
}, {
constant: !0,
literal: !0
});
},
statements: function() {
for (var t = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && t.push(this.filterChain()), 
!this.expect(";")) return 1 === t.length ? t[0] : function(e, n) {
for (var r, i = 0, o = t.length; o > i; i++) r = t[i](e, n);
return r;
};
},
filterChain: function() {
for (var t, e = this.expression(); t = this.expect("|"); ) e = this.filter(e);
return e;
},
filter: function(t) {
var e, r, i = this.$filter(this.consume().text);
if (this.peek(":")) for (e = [], r = []; this.expect(":"); ) e.push(this.expression());
var o = [ t ].concat(e || []);
return f(function(o, a) {
var s = t(o, a);
if (r) {
r[0] = s;
for (var u = e.length; u--; ) r[u + 1] = e[u](o, a);
return i.apply(n, r);
}
return i(s);
}, {
constant: !i.$stateful && o.every(qe),
inputs: !i.$stateful && o
});
},
expression: function() {
return this.assignment();
},
assignment: function() {
var t, e, n = this.ternary();
return (e = this.expect("=")) ? (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, e.index) + "] can not be assigned to", e), 
t = this.ternary(), f(function(e, r) {
return n.assign(e, t(e, r), r);
}, {
inputs: [ n, t ]
})) : n;
},
ternary: function() {
var t, e, n = this.logicalOR();
if ((e = this.expect("?")) && (t = this.assignment(), this.consume(":"))) {
var r = this.assignment();
return f(function(e, i) {
return n(e, i) ? t(e, i) : r(e, i);
}, {
constant: n.constant && t.constant && r.constant
});
}
return n;
},
logicalOR: function() {
for (var t, e = this.logicalAND(); t = this.expect("||"); ) e = this.binaryFn(e, t.text, this.logicalAND(), !0);
return e;
},
logicalAND: function() {
for (var t, e = this.equality(); t = this.expect("&&"); ) e = this.binaryFn(e, t.text, this.equality(), !0);
return e;
},
equality: function() {
for (var t, e = this.relational(); t = this.expect("==", "!=", "===", "!=="); ) e = this.binaryFn(e, t.text, this.relational());
return e;
},
relational: function() {
for (var t, e = this.additive(); t = this.expect("<", ">", "<=", ">="); ) e = this.binaryFn(e, t.text, this.additive());
return e;
},
additive: function() {
for (var t, e = this.multiplicative(); t = this.expect("+", "-"); ) e = this.binaryFn(e, t.text, this.multiplicative());
return e;
},
multiplicative: function() {
for (var t, e = this.unary(); t = this.expect("*", "/", "%"); ) e = this.binaryFn(e, t.text, this.unary());
return e;
},
unary: function() {
var t;
return this.expect("+") ? this.primary() : (t = this.expect("-")) ? this.binaryFn(vi.ZERO, t.text, this.unary()) : (t = this.expect("!")) ? this.unaryFn(t.text, this.unary()) : this.primary();
},
fieldAccess: function(t) {
var e = this.identifier();
return f(function(r, i, o) {
var a = o || t(r, i);
return null == a ? n : e(a);
}, {
assign: function(n, r, i) {
var o = t(n, i);
return o || t.assign(n, o = {}, i), e.assign(o, r);
}
});
},
objectIndex: function(t) {
var e = this.text, r = this.expression();
return this.consume("]"), f(function(i, o) {
var a, s = t(i, o), u = r(i, o);
return je(u, e), s ? a = Pe(s[u], e) : n;
}, {
assign: function(n, i, o) {
var a = je(r(n, o), e), s = Pe(t(n, o), e);
return s || t.assign(n, s = {}, o), s[a] = i;
}
});
},
functionCall: function(t, e) {
var r = [];
if (")" !== this.peekToken().text) do r.push(this.expression()); while (this.expect(","));
this.consume(")");
var i = this.text, o = r.length ? [] : null;
return function(a, s) {
var u = e ? e(a, s) : g(e) ? n : a, c = t(a, s, u) || d;
if (o) for (var l = r.length; l--; ) o[l] = Pe(r[l](a, s), i);
Pe(u, i), Re(c, i);
var f = c.apply ? c.apply(u, o) : c(o[0], o[1], o[2], o[3], o[4]);
return o && (o.length = 0), Pe(f, i);
};
},
arrayDeclaration: function() {
var t = [];
if ("]" !== this.peekToken().text) do {
if (this.peek("]")) break;
t.push(this.expression());
} while (this.expect(","));
return this.consume("]"), f(function(e, n) {
for (var r = [], i = 0, o = t.length; o > i; i++) r.push(t[i](e, n));
return r;
}, {
literal: !0,
constant: t.every(qe),
inputs: t
});
},
object: function() {
var t = [], e = [];
if ("}" !== this.peekToken().text) do {
if (this.peek("}")) break;
var n = this.consume();
n.constant ? t.push(n.value) : n.identifier ? t.push(n.text) : this.throwError("invalid key", n), 
this.consume(":"), e.push(this.expression());
} while (this.expect(","));
return this.consume("}"), f(function(n, r) {
for (var i = {}, o = 0, a = e.length; a > o; o++) i[t[o]] = e[o](n, r);
return i;
}, {
literal: !0,
constant: e.every(qe),
inputs: e
});
}
};
var mi = ct(), gi = ct(), yi = Object.prototype.valueOf, bi = r("$sce"), wi = {
HTML: "html",
CSS: "css",
URL: "url",
RESOURCE_URL: "resourceUrl",
JS: "js"
}, Xr = r("$compile"), xi = e.createElement("a"), ki = rn(t.location.href);
sn.$inject = [ "$provide" ], fn.$inject = [ "$locale" ], hn.$inject = [ "$locale" ];
var Ei = ".", Si = {
yyyy: $n("FullYear", 4),
yy: $n("FullYear", 2, 0, !0),
y: $n("FullYear", 1),
MMMM: vn("Month"),
MMM: vn("Month", !0),
MM: $n("Month", 2, 1),
M: $n("Month", 1, 1),
dd: $n("Date", 2),
d: $n("Date", 1),
HH: $n("Hours", 2),
H: $n("Hours", 1),
hh: $n("Hours", 2, -12),
h: $n("Hours", 1, -12),
mm: $n("Minutes", 2),
m: $n("Minutes", 1),
ss: $n("Seconds", 2),
s: $n("Seconds", 1),
sss: $n("Milliseconds", 3),
EEEE: vn("Day"),
EEE: vn("Day", !0),
a: wn,
Z: mn,
ww: bn(2),
w: bn(1),
G: xn,
GG: xn,
GGG: xn,
GGGG: kn
}, Ci = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, Ai = /^\-?\d+$/;
En.$inject = [ "$locale" ];
var Oi = v(Xn), _i = v(Kn);
An.$inject = [ "$parse" ];
var Ti = v({
restrict: "E",
compile: function(t, e) {
return e.href || e.xlinkHref || e.name ? n : function(t, e) {
if ("a" === e[0].nodeName.toLowerCase()) {
var n = "[object SVGAnimatedString]" === sr.call(e.prop("href")) ? "xlink:href" : "href";
e.on("click", function(t) {
e.attr(n) || t.preventDefault();
});
}
};
}
}), Mi = {};
o(Ir, function(t, e) {
if ("multiple" != t) {
var n = Zt("ng-" + e);
Mi[n] = function() {
return {
restrict: "A",
priority: 100,
link: function(t, r, i) {
t.$watch(i[n], function(t) {
i.$set(e, !!t);
});
}
};
};
}
}), o(Lr, function(t, e) {
Mi[e] = function() {
return {
priority: 100,
link: function(t, r, i) {
if ("ngPattern" === e && "/" == i.ngPattern.charAt(0)) {
var o = i.ngPattern.match(Wn);
if (o) return i.$set("ngPattern", RegExp(o[1], o[2])), n;
}
t.$watch(i[e], function(t) {
i.$set(e, t);
});
}
};
};
}), o([ "src", "srcset", "href" ], function(t) {
var e = Zt("ng-" + t);
Mi[e] = function() {
return {
priority: 99,
link: function(r, i, o) {
var a = t, s = t;
"href" === t && "[object SVGAnimatedString]" === sr.call(i.prop("href")) && (s = "xlinkHref", 
o.$attr[s] = "xlink:href", a = null), o.$observe(e, function(e) {
return e ? (o.$set(s, e), tr && a && i.prop(a, o[s]), n) : ("href" === t && o.$set(s, null), 
n);
});
}
};
};
});
var ji = {
$addControl: d,
$$renameControl: _n,
$removeControl: d,
$setValidity: d,
$setDirty: d,
$setPristine: d,
$setSubmitted: d
}, Pi = "ng-submitted";
Tn.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
var Ri = function(t) {
return [ "$timeout", function(e) {
var r = {
name: "form",
restrict: t ? "EAC" : "E",
controller: Tn,
compile: function(r, i) {
r.addClass($o).addClass(ho);
var o = i.name ? "name" : t && i.ngForm ? "ngForm" : !1;
return {
pre: function(t, r, i, a) {
if (!("action" in i)) {
var s = function(e) {
t.$apply(function() {
a.$commitViewValue(), a.$setSubmitted();
}), e.preventDefault();
};
Ar(r[0], "submit", s), r.on("$destroy", function() {
e(function() {
Or(r[0], "submit", s);
}, 0, !1);
});
}
var u = a.$$parentForm;
o && (Ne(t, null, a.$name, a, a.$name), i.$observe(o, function(e) {
a.$name !== e && (Ne(t, null, a.$name, n, a.$name), u.$$renameControl(a, e), Ne(t, null, a.$name, a, a.$name));
})), r.on("$destroy", function() {
u.$removeControl(a), o && Ne(t, null, i[o], n, a.$name), f(a, ji);
});
}
};
}
};
return r;
} ];
}, qi = Ri(), Ni = Ri(!0), Di = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, Vi = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Ii = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, Fi = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Li = /^(\d{4})-(\d{2})-(\d{2})$/, Ui = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Hi = /^(\d{4})-W(\d\d)$/, Bi = /^(\d{4})-(\d\d)$/, zi = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Gi = {
text: jn,
date: Nn("date", Li, qn(Li, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
"datetime-local": Nn("datetimelocal", Ui, qn(Ui, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
time: Nn("time", zi, qn(zi, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
week: Nn("week", Hi, Rn, "yyyy-Www"),
month: Nn("month", Bi, qn(Bi, [ "yyyy", "MM" ]), "yyyy-MM"),
number: Vn,
url: In,
email: Fn,
radio: Ln,
checkbox: Hn,
hidden: d,
button: d,
submit: d,
reset: d,
file: d
}, Wi = [ "$browser", "$sniffer", "$filter", "$parse", function(t, e, n, r) {
return {
restrict: "E",
require: [ "?ngModel" ],
link: {
pre: function(i, o, a, s) {
s[0] && (Gi[Xn(a.type)] || Gi.text)(i, o, a, s[0], e, t, n, r);
}
}
};
} ], Ji = /^(true|false|\d+)$/, Xi = function() {
return {
restrict: "A",
priority: 100,
compile: function(t, e) {
return Ji.test(e.ngValue) ? function(t, e, n) {
n.$set("value", t.$eval(n.ngValue));
} : function(t, e, n) {
t.$watch(n.ngValue, function(t) {
n.$set("value", t);
});
};
}
};
}, Yi = [ "$compile", function(t) {
return {
restrict: "AC",
compile: function(e) {
return t.$$addBindingClass(e), function(e, r, i) {
t.$$addBindingInfo(r, i.ngBind), r = r[0], e.$watch(i.ngBind, function(t) {
r.textContent = t === n ? "" : t;
});
};
}
};
} ], Ki = [ "$interpolate", "$compile", function(t, e) {
return {
compile: function(r) {
return e.$$addBindingClass(r), function(r, i, o) {
var a = t(i.attr(o.$attr.ngBindTemplate));
e.$$addBindingInfo(i, a.expressions), i = i[0], o.$observe("ngBindTemplate", function(t) {
i.textContent = t === n ? "" : t;
});
};
}
};
} ], Zi = [ "$sce", "$parse", "$compile", function(t, e, n) {
return {
restrict: "A",
compile: function(r, i) {
var o = e(i.ngBindHtml), a = e(i.ngBindHtml, function(t) {
return "" + (t || "");
});
return n.$$addBindingClass(r), function(e, r, i) {
n.$$addBindingInfo(r, i.ngBindHtml), e.$watch(a, function() {
r.html(t.getTrustedHtml(o(e)) || "");
});
};
}
};
} ], Qi = v({
restrict: "A",
require: "ngModel",
link: function(t, e, n, r) {
r.$viewChangeListeners.push(function() {
t.$eval(n.ngChange);
});
}
}), to = Bn("", !0), eo = Bn("Odd", 0), no = Bn("Even", 1), ro = On({
compile: function(t, e) {
e.$set("ngCloak", n), t.removeClass("ng-cloak");
}
}), io = [ function() {
return {
restrict: "A",
scope: !0,
controller: "@",
priority: 500
};
} ], oo = {}, ao = {
blur: !0,
focus: !0
};
o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(t) {
var e = Zt("ng-" + t);
oo[e] = [ "$parse", "$rootScope", function(n, r) {
return {
restrict: "A",
compile: function(i, o) {
var a = n(o[e], null, !0);
return function(e, n) {
n.on(t, function(n) {
var i = function() {
a(e, {
$event: n
});
};
ao[t] && r.$$phase ? e.$evalAsync(i) : e.$apply(i);
});
};
}
};
} ];
});
var so = [ "$animate", function(t) {
return {
multiElement: !0,
transclude: "element",
priority: 600,
terminal: !0,
restrict: "A",
$$tlb: !0,
link: function(n, r, i, o, a) {
var s, u, c;
n.$watch(i.ngIf, function(n) {
n ? u || a(function(n, o) {
u = o, n[n.length++] = e.createComment(" end ngIf: " + i.ngIf + " "), s = {
clone: n
}, t.enter(n, r.parent(), r);
}) : (c && (c.remove(), c = null), u && (u.$destroy(), u = null), s && (c = ut(s.clone), 
t.leave(c).then(function() {
c = null;
}), s = null));
});
}
};
} ], uo = [ "$templateRequest", "$anchorScroll", "$animate", "$sce", function(t, e, n, r) {
return {
restrict: "ECA",
priority: 400,
terminal: !0,
transclude: "element",
controller: cr.noop,
compile: function(i, o) {
var a = o.ngInclude || o.src, s = o.onload || "", u = o.autoscroll;
return function(i, o, c, l, f) {
var h, p, d, $ = 0, v = function() {
p && (p.remove(), p = null), h && (h.$destroy(), h = null), d && (n.leave(d).then(function() {
p = null;
}), p = d, d = null);
};
i.$watch(r.parseAsResourceUrl(a), function(r) {
var a = function() {
!g(u) || u && !i.$eval(u) || e();
}, c = ++$;
r ? (t(r, !0).then(function(t) {
if (c === $) {
var e = i.$new();
l.template = t;
var u = f(e, function(t) {
v(), n.enter(t, null, o).then(a);
});
h = e, d = u, h.$emit("$includeContentLoaded", r), i.$eval(s);
}
}, function() {
c === $ && (v(), i.$emit("$includeContentError", r));
}), i.$emit("$includeContentRequested", r)) : (v(), l.template = null);
});
};
}
};
} ], co = [ "$compile", function(t) {
return {
restrict: "ECA",
priority: -400,
require: "ngInclude",
link: function(r, i, o, a) {
return /SVG/.test("" + i[0]) ? (i.empty(), t(gt(a.template, e).childNodes)(r, function(t) {
i.append(t);
}, {
futureParentElement: i
}), n) : (i.html(a.template), t(i.contents())(r), n);
}
};
} ], lo = On({
priority: 450,
compile: function() {
return {
pre: function(t, e, n) {
t.$eval(n.ngInit);
}
};
}
}), fo = function() {
return {
restrict: "A",
priority: 100,
require: "ngModel",
link: function(t, e, r, i) {
var a = e.attr(r.$attr.ngList) || ", ", s = "false" !== r.ngTrim, u = s ? pr(a) : a, c = function(t) {
if (!m(t)) {
var e = [];
return t && o(t.split(u), function(t) {
t && e.push(s ? pr(t) : t);
}), e;
}
};
i.$parsers.push(c), i.$formatters.push(function(t) {
return hr(t) ? t.join(a) : n;
}), i.$isEmpty = function(t) {
return !t || !t.length;
};
}
};
}, ho = "ng-valid", po = "ng-invalid", $o = "ng-pristine", vo = "ng-dirty", mo = "ng-untouched", go = "ng-touched", yo = "ng-pending", bo = new r("ngModel"), wo = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(t, e, r, i, a, s, u, c, l, f) {
this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, 
this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
this.$pending = n, this.$name = f(r.name || "", !1)(t);
var h, p = a(r.ngModel), $ = p.assign, v = p, y = $, b = null, x = this;
this.$$setOptions = function(t) {
if (x.$options = t, t && t.getterSetter) {
var e = a(r.ngModel + "()"), n = a(r.ngModel + "($$$p)");
v = function(t) {
var n = p(t);
return k(n) && (n = e(t)), n;
}, y = function(t) {
k(p(t)) ? n(t, {
$$$p: x.$modelValue
}) : $(t, x.$modelValue);
};
} else if (!p.assign) throw bo("nonassign", "Expression '{0}' is non-assignable. Element: {1}", r.ngModel, z(i));
}, this.$render = d, this.$isEmpty = function(t) {
return m(t) || "" === t || null === t || t !== t;
};
var E = i.inheritedData("$formController") || ji, S = 0;
zn({
ctrl: this,
$element: i,
set: function(t, e) {
t[e] = !0;
},
unset: function(t, e) {
delete t[e];
},
parentForm: E,
$animate: s
}), this.$setPristine = function() {
x.$dirty = !1, x.$pristine = !0, s.removeClass(i, vo), s.addClass(i, $o);
}, this.$setDirty = function() {
x.$dirty = !0, x.$pristine = !1, s.removeClass(i, $o), s.addClass(i, vo), E.$setDirty();
}, this.$setUntouched = function() {
x.$touched = !1, x.$untouched = !0, s.setClass(i, mo, go);
}, this.$setTouched = function() {
x.$touched = !0, x.$untouched = !1, s.setClass(i, go, mo);
}, this.$rollbackViewValue = function() {
u.cancel(b), x.$viewValue = x.$$lastCommittedViewValue, x.$render();
}, this.$validate = function() {
if (!w(x.$modelValue) || !isNaN(x.$modelValue)) {
var t = x.$$lastCommittedViewValue, e = x.$$rawModelValue, r = x.$valid, i = x.$modelValue, o = x.$options && x.$options.allowInvalid;
x.$$runValidators(e, t, function(t) {
o || r === t || (x.$modelValue = t ? e : n, x.$modelValue !== i && x.$$writeModelToScope());
});
}
}, this.$$runValidators = function(t, e, r) {
function i() {
var t = x.$$parserName || "parse";
return h !== n ? (h || (o(x.$validators, function(t, e) {
u(e, null);
}), o(x.$asyncValidators, function(t, e) {
u(e, null);
})), u(t, h), h) : (u(t, null), !0);
}
function a() {
var n = !0;
return o(x.$validators, function(r, i) {
var o = r(t, e);
n = n && o, u(i, o);
}), n ? !0 : (o(x.$asyncValidators, function(t, e) {
u(e, null);
}), !1);
}
function s() {
var r = [], i = !0;
o(x.$asyncValidators, function(o, a) {
var s = o(t, e);
if (!M(s)) throw bo("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
u(a, n), r.push(s.then(function() {
u(a, !0);
}, function() {
i = !1, u(a, !1);
}));
}), r.length ? l.all(r).then(function() {
c(i);
}, d) : c(!0);
}
function u(t, e) {
f === S && x.$setValidity(t, e);
}
function c(t) {
f === S && r(t);
}
S++;
var f = S;
return i() && a() ? (s(), n) : (c(!1), n);
}, this.$commitViewValue = function() {
var t = x.$viewValue;
u.cancel(b), (x.$$lastCommittedViewValue !== t || "" === t && x.$$hasNativeValidators) && (x.$$lastCommittedViewValue = t, 
x.$pristine && this.$setDirty(), this.$$parseAndValidate());
}, this.$$parseAndValidate = function() {
function e() {
x.$modelValue !== a && x.$$writeModelToScope();
}
var r = x.$$lastCommittedViewValue, i = r;
if (h = m(i) ? n : !0) for (var o = 0; o < x.$parsers.length; o++) if (i = x.$parsers[o](i), 
m(i)) {
h = !1;
break;
}
w(x.$modelValue) && isNaN(x.$modelValue) && (x.$modelValue = v(t));
var a = x.$modelValue, s = x.$options && x.$options.allowInvalid;
x.$$rawModelValue = i, s && (x.$modelValue = i, e()), x.$$runValidators(i, x.$$lastCommittedViewValue, function(t) {
s || (x.$modelValue = t ? i : n, e());
});
}, this.$$writeModelToScope = function() {
y(t, x.$modelValue), o(x.$viewChangeListeners, function(t) {
try {
t();
} catch (n) {
e(n);
}
});
}, this.$setViewValue = function(t, e) {
x.$viewValue = t, (!x.$options || x.$options.updateOnDefault) && x.$$debounceViewValueCommit(e);
}, this.$$debounceViewValueCommit = function(e) {
var n, r = 0, i = x.$options;
i && g(i.debounce) && (n = i.debounce, w(n) ? r = n : w(n[e]) ? r = n[e] : w(n.default) && (r = n.default)), 
u.cancel(b), r ? b = u(function() {
x.$commitViewValue();
}, r) : c.$$phase ? x.$commitViewValue() : t.$apply(function() {
x.$commitViewValue();
});
}, t.$watch(function() {
var e = v(t);
if (e !== x.$modelValue) {
x.$modelValue = x.$$rawModelValue = e, h = n;
for (var r = x.$formatters, i = r.length, o = e; i--; ) o = r[i](o);
x.$viewValue !== o && (x.$viewValue = x.$$lastCommittedViewValue = o, x.$render(), 
x.$$runValidators(e, o, d));
}
return e;
});
} ], xo = [ "$rootScope", function(t) {
return {
restrict: "A",
require: [ "ngModel", "^?form", "^?ngModelOptions" ],
controller: wo,
priority: 1,
compile: function(e) {
return e.addClass($o).addClass(mo).addClass(ho), {
pre: function(t, e, n, r) {
var i = r[0], o = r[1] || ji;
i.$$setOptions(r[2] && r[2].$options), o.$addControl(i), n.$observe("name", function(t) {
i.$name !== t && o.$$renameControl(i, t);
}), t.$on("$destroy", function() {
o.$removeControl(i);
});
},
post: function(e, n, r, i) {
var o = i[0];
o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function(t) {
o.$$debounceViewValueCommit(t && t.type);
}), n.on("blur", function() {
o.$touched || (t.$$phase ? e.$evalAsync(o.$setTouched) : e.$apply(o.$setTouched));
});
}
};
}
};
} ], ko = /(\s+|^)default(\s+|$)/, Eo = function() {
return {
restrict: "A",
controller: [ "$scope", "$attrs", function(t, e) {
var r = this;
this.$options = t.$eval(e.ngModelOptions), this.$options.updateOn !== n ? (this.$options.updateOnDefault = !1, 
this.$options.updateOn = pr(this.$options.updateOn.replace(ko, function() {
return r.$options.updateOnDefault = !0, " ";
}))) : this.$options.updateOnDefault = !0;
} ]
};
}, So = On({
terminal: !0,
priority: 1e3
}), Co = [ "$locale", "$interpolate", function(t, e) {
var n = /{}/g, r = /^when(Minus)?(.+)$/;
return {
restrict: "EA",
link: function(i, a, s) {
function u(t) {
a.text(t || "");
}
var c, l = s.count, f = s.$attr.when && a.attr(s.$attr.when), h = s.offset || 0, p = i.$eval(f) || {}, d = {}, $ = e.startSymbol(), v = e.endSymbol(), m = $ + l + "-" + h + v, g = cr.noop;
o(s, function(t, e) {
var n = r.exec(e);
if (n) {
var i = (n[1] ? "-" : "") + Xn(n[2]);
p[i] = a.attr(s.$attr[e]);
}
}), o(p, function(t, r) {
d[r] = e(t.replace(n, m));
}), i.$watch(l, function(e) {
var n = parseFloat(e), r = isNaN(n);
r || n in p || (n = t.pluralCat(n - h)), n === c || r && isNaN(c) || (g(), g = i.$watch(d[n], u), 
c = n);
});
}
};
} ], Ao = [ "$parse", "$animate", function(t, a) {
var s = "$$NG_REMOVED", u = r("ngRepeat"), c = function(t, e, n, r, i, o, a) {
t[n] = r, i && (t[i] = o), t.$index = e, t.$first = 0 === e, t.$last = e === a - 1, 
t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & e));
}, l = function(t) {
return t.clone[0];
}, f = function(t) {
return t.clone[t.clone.length - 1];
};
return {
restrict: "A",
multiElement: !0,
transclude: "element",
priority: 1e3,
terminal: !0,
$$tlb: !0,
compile: function(r, h) {
var p = h.ngRepeat, d = e.createComment(" end ngRepeat: " + p + " "), $ = p.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if (!$) throw u("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", p);
var v = $[1], m = $[2], g = $[3], y = $[4];
if ($ = v.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !$) throw u("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", v);
var b = $[3] || $[1], w = $[2];
if (g && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(g) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(g))) throw u("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", g);
var x, k, E, S, C = {
$id: Ft
};
return y ? x = t(y) : (E = function(t, e) {
return Ft(e);
}, S = function(t) {
return t;
}), function(t, e, r, h, $) {
x && (k = function(e, n, r) {
return w && (C[w] = e), C[b] = n, C.$index = r, x(t, C);
});
var v = ct();
t.$watchCollection(m, function(r) {
var h, m, y, x, C, A, O, _, T, M, j, P, R = e[0], q = ct();
if (g && (t[g] = r), i(r)) T = r, _ = k || E; else {
_ = k || S, T = [];
for (var N in r) r.hasOwnProperty(N) && "$" != N.charAt(0) && T.push(N);
T.sort();
}
for (x = T.length, j = Array(x), h = 0; x > h; h++) if (C = r === T ? h : T[h], 
A = r[C], O = _(C, A, h), v[O]) M = v[O], delete v[O], q[O] = M, j[h] = M; else {
if (q[O]) throw o(j, function(t) {
t && t.scope && (v[t.id] = t);
}), u("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", p, O, A);
j[h] = {
id: O,
scope: n,
clone: n
}, q[O] = !0;
}
for (var D in v) {
if (M = v[D], P = ut(M.clone), a.leave(P), P[0].parentNode) for (h = 0, m = P.length; m > h; h++) P[h][s] = !0;
M.scope.$destroy();
}
for (h = 0; x > h; h++) if (C = r === T ? h : T[h], A = r[C], M = j[h], M.scope) {
y = R;
do y = y.nextSibling; while (y && y[s]);
l(M) != y && a.move(ut(M.clone), null, er(R)), R = f(M), c(M.scope, h, b, A, w, C, x);
} else $(function(t, e) {
M.scope = e;
var n = d.cloneNode(!1);
t[t.length++] = n, a.enter(t, null, er(R)), R = n, M.clone = t, q[M.id] = M, c(M.scope, h, b, A, w, C, x);
});
v = q;
});
};
}
};
} ], Oo = "ng-hide", _o = "ng-hide-animate", To = [ "$animate", function(t) {
return {
restrict: "A",
multiElement: !0,
link: function(e, n, r) {
e.$watch(r.ngShow, function(e) {
t[e ? "removeClass" : "addClass"](n, Oo, {
tempClasses: _o
});
});
}
};
} ], Mo = [ "$animate", function(t) {
return {
restrict: "A",
multiElement: !0,
link: function(e, n, r) {
e.$watch(r.ngHide, function(e) {
t[e ? "addClass" : "removeClass"](n, Oo, {
tempClasses: _o
});
});
}
};
} ], jo = On(function(t, e, n) {
t.$watchCollection(n.ngStyle, function(t, n) {
n && t !== n && o(n, function(t, n) {
e.css(n, "");
}), t && e.css(t);
});
}), Po = [ "$animate", function(t) {
return {
restrict: "EA",
require: "ngSwitch",
controller: [ "$scope", function() {
this.cases = {};
} ],
link: function(n, r, i, a) {
var s = i.ngSwitch || i.on, u = [], c = [], l = [], f = [], h = function(t, e) {
return function() {
t.splice(e, 1);
};
};
n.$watch(s, function(n) {
var r, i;
for (r = 0, i = l.length; i > r; ++r) t.cancel(l[r]);
for (l.length = 0, r = 0, i = f.length; i > r; ++r) {
var s = ut(c[r].clone);
f[r].$destroy();
var p = l[r] = t.leave(s);
p.then(h(l, r));
}
c.length = 0, f.length = 0, (u = a.cases["!" + n] || a.cases["?"]) && o(u, function(n) {
n.transclude(function(r, i) {
f.push(i);
var o = n.element;
r[r.length++] = e.createComment(" end ngSwitchWhen: ");
var a = {
clone: r
};
c.push(a), t.enter(r, o.parent(), o);
});
});
});
}
};
} ], Ro = On({
transclude: "element",
priority: 1200,
require: "^ngSwitch",
multiElement: !0,
link: function(t, e, n, r, i) {
r.cases["!" + n.ngSwitchWhen] = r.cases["!" + n.ngSwitchWhen] || [], r.cases["!" + n.ngSwitchWhen].push({
transclude: i,
element: e
});
}
}), qo = On({
transclude: "element",
priority: 1200,
require: "^ngSwitch",
multiElement: !0,
link: function(t, e, n, r, i) {
r.cases["?"] = r.cases["?"] || [], r.cases["?"].push({
transclude: i,
element: e
});
}
}), No = On({
restrict: "EAC",
link: function(t, e, n, i, o) {
if (!o) throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", z(e));
o(function(t) {
e.empty(), e.append(t);
});
}
}), Do = [ "$templateCache", function(t) {
return {
restrict: "E",
terminal: !0,
compile: function(e, n) {
if ("text/ng-template" == n.type) {
var r = n.id, i = e[0].text;
t.put(r, i);
}
}
};
} ], Vo = r("ngOptions"), Io = v({
restrict: "A",
terminal: !0
}), Fo = [ "$compile", "$parse", function(t, r) {
var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, s = {
$setViewValue: d
};
return {
restrict: "E",
require: [ "select", "?ngModel" ],
controller: [ "$element", "$scope", "$attrs", function(t, e, n) {
var r, i, o = this, a = {}, u = s;
o.databound = n.ngModel, o.init = function(t, e, n) {
u = t, r = e, i = n;
}, o.addOption = function(e, n) {
at(e, '"option value"'), a[e] = !0, u.$viewValue == e && (t.val(e), i.parent() && i.remove()), 
n && n[0].hasAttribute("selected") && (n[0].selected = !0);
}, o.removeOption = function(t) {
this.hasOption(t) && (delete a[t], u.$viewValue === t && this.renderUnknownOption(t));
}, o.renderUnknownOption = function(e) {
var n = "? " + Ft(e) + " ?";
i.val(n), t.prepend(i), t.val(n), i.prop("selected", !0);
}, o.hasOption = function(t) {
return a.hasOwnProperty(t);
}, e.$on("$destroy", function() {
o.renderUnknownOption = d;
});
} ],
link: function(s, u, c, l) {
function f(t, e, n, r) {
n.$render = function() {
var t = n.$viewValue;
r.hasOption(t) ? (S.parent() && S.remove(), e.val(t), "" === t && d.prop("selected", !0)) : m(t) && d ? e.val("") : r.renderUnknownOption(t);
}, e.on("change", function() {
t.$apply(function() {
S.parent() && S.remove(), n.$setViewValue(e.val());
});
});
}
function h(t, e, n) {
var r;
n.$render = function() {
var t = new Lt(n.$viewValue);
o(e.find("option"), function(e) {
e.selected = g(t.get(e.value));
});
}, t.$watch(function() {
V(r, n.$viewValue) || (r = D(n.$viewValue), n.$render());
}), e.on("change", function() {
t.$apply(function() {
var t = [];
o(e.find("option"), function(e) {
e.selected && t.push(e.value);
}), n.$setViewValue(t);
});
});
}
function p(e, s, u) {
function c(t, n, r) {
return V[A] = r, T && (V[T] = n), t(e, V);
}
function l() {
e.$apply(function() {
var t, n = P(e) || [];
if (y) t = [], o(s.val(), function(e) {
e = q ? N[e] : e, t.push(f(e, n[e]));
}); else {
var r = q ? N[s.val()] : s.val();
t = f(r, n[r]);
}
u.$setViewValue(t), m();
});
}
function f(t, e) {
if ("?" === t) return n;
if ("" === t) return null;
var r = _ ? _ : j;
return c(r, t, e);
}
function h() {
var t, n = P(e);
if (n && hr(n)) {
t = Array(n.length);
for (var r = 0, i = n.length; i > r; r++) t[r] = c(C, r, n[r]);
return t;
}
if (n) {
t = {};
for (var o in n) n.hasOwnProperty(o) && (t[o] = c(C, o, n[o]));
}
return t;
}
function p(t) {
var e;
if (y) if (q && hr(t)) {
e = new Lt([]);
for (var n = 0; n < t.length; n++) e.put(c(q, null, t[n]), !0);
} else e = new Lt(t); else q && (t = c(q, null, t));
return function(n, r) {
var i;
return i = q ? q : _ ? _ : j, y ? g(e.remove(c(i, n, r))) : t === c(i, n, r);
};
}
function d() {
x || (e.$$postDigest(m), x = !0);
}
function v(t, e, n) {
t[e] = t[e] || 0, t[e] += n ? 1 : -1;
}
function m() {
x = !1;
var t, n, r, i, l, f, h, d, m, b, S, A, O, _, j, R, I, F = {
"": []
}, L = [ "" ], U = u.$viewValue, H = P(e) || [], B = T ? a(H) : H, z = {}, G = p(U), W = !1;
for (N = {}, A = 0; b = B.length, b > A; A++) h = A, T && (h = B[A], "$" === h.charAt(0)) || (d = H[h], 
t = c(M, h, d) || "", (n = F[t]) || (n = F[t] = [], L.push(t)), O = G(h, d), W = W || O, 
R = c(C, h, d), R = g(R) ? R : "", I = q ? q(e, V) : T ? B[A] : A, q && (N[I] = h), 
n.push({
id: I,
label: R,
selected: O
}));
for (y || (w || null === U ? F[""].unshift({
id: "",
label: "",
selected: !W
}) : W || F[""].unshift({
id: "?",
label: "",
selected: !0
})), S = 0, m = L.length; m > S; S++) {
for (t = L[S], n = F[t], D.length <= S ? (i = {
element: E.clone().attr("label", t),
label: n.label
}, l = [ i ], D.push(l), s.append(i.element)) : (l = D[S], i = l[0], i.label != t && i.element.attr("label", i.label = t)), 
_ = null, A = 0, b = n.length; b > A; A++) r = n[A], (f = l[A + 1]) ? (_ = f.element, 
f.label !== r.label && (v(z, f.label, !1), v(z, r.label, !0), _.text(f.label = r.label), 
_.prop("label", f.label)), f.id !== r.id && _.val(f.id = r.id), _[0].selected !== r.selected && (_.prop("selected", f.selected = r.selected), 
tr && _.prop("selected", f.selected))) : ("" === r.id && w ? j = w : (j = k.clone()).val(r.id).prop("selected", r.selected).attr("selected", r.selected).prop("label", r.label).text(r.label), 
l.push(f = {
element: j,
label: r.label,
id: r.id,
selected: r.selected
}), v(z, r.label, !0), _ ? _.after(j) : i.element.append(j), _ = j);
for (A++; l.length > A; ) r = l.pop(), v(z, r.label, !1), r.element.remove();
}
for (;D.length > S; ) {
for (n = D.pop(), A = 1; A < n.length; ++A) v(z, n[A].label, !1);
n[0].element.remove();
}
o(z, function(t, e) {
t > 0 ? $.addOption(e) : 0 > t && $.removeOption(e);
});
}
var S;
if (!(S = b.match(i))) throw Vo("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", b, z(s));
var C = r(S[2] || S[1]), A = S[4] || S[6], O = / as /.test(S[0]) && S[1], _ = O ? r(O) : null, T = S[5], M = r(S[3] || ""), j = r(S[2] ? S[1] : A), P = r(S[7]), R = S[8], q = R ? r(S[8]) : null, N = {}, D = [ [ {
element: s,
label: ""
} ] ], V = {};
w && (t(w)(e), w.removeClass("ng-scope"), w.remove()), s.empty(), s.on("change", l), 
u.$render = m, e.$watchCollection(P, d), e.$watchCollection(h, d), y && e.$watchCollection(function() {
return u.$modelValue;
}, d);
}
if (l[1]) {
for (var d, $ = l[0], v = l[1], y = c.multiple, b = c.ngOptions, w = !1, x = !1, k = er(e.createElement("option")), E = er(e.createElement("optgroup")), S = k.clone(), C = 0, A = u.children(), O = A.length; O > C; C++) if ("" === A[C].value) {
d = w = A.eq(C);
break;
}
$.init(v, w, S), y && (v.$isEmpty = function(t) {
return !t || 0 === t.length;
}), b ? p(s, u, v) : y ? h(s, u, v) : f(s, u, v, $);
}
}
};
} ], Lo = [ "$interpolate", function(t) {
var e = {
addOption: d,
removeOption: d
};
return {
restrict: "E",
priority: 100,
compile: function(n, r) {
if (m(r.value)) {
var i = t(n.text(), !0);
i || r.$set("value", n.text());
}
return function(t, n, r) {
var o = "$selectController", a = n.parent(), s = a.data(o) || a.parent().data(o);
s && s.databound || (s = e), i ? t.$watch(i, function(t, e) {
r.$set("value", t), e !== t && s.removeOption(e), s.addOption(t, n);
}) : s.addOption(r.value, n), n.on("$destroy", function() {
s.removeOption(r.value);
});
};
}
};
} ], Uo = v({
restrict: "E",
terminal: !1
}), Ho = function() {
return {
restrict: "A",
require: "?ngModel",
link: function(t, e, n, r) {
r && (n.required = !0, r.$validators.required = function(t, e) {
return !n.required || !r.$isEmpty(e);
}, n.$observe("required", function() {
r.$validate();
}));
}
};
}, Bo = function() {
return {
restrict: "A",
require: "?ngModel",
link: function(t, e, i, o) {
if (o) {
var a, s = i.ngPattern || i.pattern;
i.$observe("pattern", function(t) {
if (b(t) && t.length > 0 && (t = RegExp("^" + t + "$")), t && !t.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, t, z(e));
a = t || n, o.$validate();
}), o.$validators.pattern = function(t) {
return o.$isEmpty(t) || m(a) || a.test(t);
};
}
}
};
}, zo = function() {
return {
restrict: "A",
require: "?ngModel",
link: function(t, e, n, r) {
if (r) {
var i = -1;
n.$observe("maxlength", function(t) {
var e = h(t);
i = isNaN(e) ? -1 : e, r.$validate();
}), r.$validators.maxlength = function(t, e) {
return 0 > i || r.$isEmpty(e) || e.length <= i;
};
}
}
};
}, Go = function() {
return {
restrict: "A",
require: "?ngModel",
link: function(t, e, n, r) {
if (r) {
var i = 0;
n.$observe("minlength", function(t) {
i = h(t) || 0, r.$validate();
}), r.$validators.minlength = function(t, e) {
return r.$isEmpty(e) || e.length >= i;
};
}
}
};
};
t.angular.bootstrap || (rt(), pt(cr), er(e).ready(function() {
Z(e, Q);
}));
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'), 
t.exports = angular;
}
});
//# sourceMappingURL=angular.d632cc985762c8a2e020.js.map
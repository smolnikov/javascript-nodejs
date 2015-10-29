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
	 * @license AngularJS v1.4.7
	 * (c) 2010-2015 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t && "hasOwnProperty" !== t && s.test("." + t);
}
function i(t, i) {
if (!r(i)) throw a("badmember", 'Dotted member path "@{0}" is invalid.', i);
for (var o = i.split("."), s = 0, u = o.length; u > s && e.isDefined(t); s++) {
var c = o[s];
t = null !== t ? t[c] : n;
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
var a = e.$$minErr("$resource"), s = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;
e.module("ngResource", [ "ng" ]).provider("$resource", function() {
var t = /^https?:\/\/[^\/]*/, r = this;
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
}, this.$get = [ "$http", "$q", function(s, u) {
function c(t) {
return l(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
}
function l(t, e) {
return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, e ? "%20" : "+");
}
function f(t, e) {
this.template = t, this.defaults = $({}, r.defaults, e), this.urlParams = {};
}
function p(t, c, l, g) {
function y(t, e) {
var n = {};
return e = $({}, c, e), d(e, function(e, r) {
v(e) && (e = e()), n[r] = e && e.charAt && "@" == e.charAt(0) ? i(t, e.substr(1)) : e;
}), n;
}
function b(t) {
return t.resource;
}
function w(t) {
o(t || {}, this);
}
var x = new f(t, g);
return l = $({}, r.defaults.actions, l), w.prototype.toJSON = function() {
var t = $({}, this);
return delete t.$promise, delete t.$resolved, t;
}, d(l, function(t, r) {
var i = /^(POST|PUT|PATCH)$/i.test(t.method);
w[r] = function(c, l, f, p) {
var g, E, k, S = {};
switch (arguments.length) {
case 4:
k = p, E = f;

case 3:
case 2:
if (!v(l)) {
S = c, g = l, E = f;
break;
}
if (v(c)) {
E = c, k = l;
break;
}
E = l, k = f;

case 1:
v(c) ? E = c : i ? g = c : S = c;
break;

case 0:
break;

default:
throw a("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length);
}
var C = this instanceof w, A = C ? g : t.isArray ? [] : new w(g), O = {}, M = t.interceptor && t.interceptor.response || b, _ = t.interceptor && t.interceptor.responseError || n;
d(t, function(t, e) {
"params" != e && "isArray" != e && "interceptor" != e && (O[e] = m(t));
}), i && (O.data = g), x.setUrlParams(O, $({}, y(g, t.params || {}), S), t.url);
var T = s(O).then(function(n) {
var i = n.data, s = A.$promise;
if (i) {
if (e.isArray(i) !== !!t.isArray) throw a("badcfg", "Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})", r, t.isArray ? "array" : "object", e.isArray(i) ? "array" : "object", O.method, O.url);
t.isArray ? (A.length = 0, d(i, function(t) {
"object" == typeof t ? A.push(new w(t)) : A.push(t);
})) : (o(i, A), A.$promise = s);
}
return A.$resolved = !0, n.resource = A, n;
}, function(t) {
return A.$resolved = !0, (k || h)(t), u.reject(t);
});
return T = T.then(function(t) {
var e = M(t);
return (E || h)(e, t.headers), e;
}, _), C ? T : (A.$promise = T, A.$resolved = !1, A);
}, w.prototype["$" + r] = function(t, e, n) {
v(t) && (n = e, e = t, t = {});
var i = w[r].call(this, t, this, e, n);
return i.$promise || i;
};
}), w.bind = function(e) {
return p(t, $({}, c, e), l);
}, w;
}
var h = e.noop, d = e.forEach, $ = e.extend, m = e.copy, v = e.isFunction;
return f.prototype = {
setUrlParams: function(n, r, i) {
var o, s, u = this, l = i || u.template, f = "", p = u.urlParams = {};
d(l.split(/\W/), function(t) {
if ("hasOwnProperty" === t) throw a("badname", "hasOwnProperty is not a valid parameter name.");
!RegExp("^\\d+$").test(t) && t && RegExp("(^|[^\\\\]):" + t + "(\\W|$)").test(l) && (p[t] = !0);
}), l = l.replace(/\\:/g, ":"), l = l.replace(t, function(t) {
return f = t, "";
}), r = r || {}, d(u.urlParams, function(t, n) {
o = r.hasOwnProperty(n) ? r[n] : u.defaults[n], e.isDefined(o) && null !== o ? (s = c(o), 
l = l.replace(RegExp(":" + n + "(\\W|$)", "g"), function(t, e) {
return s + e;
})) : l = l.replace(RegExp("(/?):" + n + "(\\W|$)", "g"), function(t, e, n) {
return "/" == n.charAt(0) ? n : e + n;
});
}), u.defaults.stripTrailingSlashes && (l = l.replace(/\/+$/, "") || "/"), l = l.replace(/\/\.(?=\w+($|\?))/, "."), 
n.url = f + l.replace(/\/\\\./, "/."), d(r, function(t, e) {
u.urlParams[e] || (n.params = n.params || {}, n.params[e] = t);
});
}
}, p;
} ];
});
}(window, window.angular);
},
62: function() {
/**
	 * @license AngularJS v1.4.7
	 * (c) 2010-2015 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e, n) {
"use strict";
function r() {
function t(t, e) {
return t ? i(t) ? t.indexOf(e) >= 0 : t.hasOwnProperty(e) : n;
}
return [ "$animate", function(e) {
return {
restrict: "AE",
transclude: "element",
terminal: !0,
require: "^^ngMessages",
link: function(n, r, o, a, s) {
var u, c = r[0], l = o.ngMessage || o.when, f = o.ngMessageExp || o.whenExp, p = function(t) {
u = t ? i(t) ? t : t.split(/[\s,]+/) : null, a.reRender();
};
f ? (p(n.$eval(f)), n.$watchCollection(f, p)) : p(l);
var h, d;
a.register(c, d = {
test: function(e) {
return t(u, e);
},
attach: function() {
h || s(n, function(t) {
e.enter(t, null, r), h = t;
var n = h.$$attachId = a.getAttachId();
h.on("$destroy", function() {
h && h.$$attachId === n && (a.deregister(c), d.detach());
});
});
},
detach: function() {
if (h) {
var t = h;
h = null, e.leave(t);
}
}
});
}
};
} ];
}
var i = e.isArray, o = e.forEach, a = e.isString, s = e.element;
e.module("ngMessages", []).directive("ngMessages", [ "$animate", function(t) {
function e(t, e) {
return a(e) && 0 === e.length || n(t.$eval(e));
}
function n(t) {
return a(t) ? t.length : !!t;
}
var r = "ng-active", i = "ng-inactive";
return {
require: "ngMessages",
restrict: "AE",
controller: [ "$element", "$scope", "$attrs", function(a, s, u) {
function c(t, e) {
for (var n = e, r = []; n && n !== t; ) {
var i = n.$$ngMessageNode;
if (i && i.length) return v[i];
n.childNodes.length && -1 == r.indexOf(n) ? (r.push(n), n = n.childNodes[n.childNodes.length - 1]) : n = n.previousSibling || n.parentNode;
}
}
function l(t, e, n) {
var r = v[n];
if (p.head) {
var i = c(t, e);
i ? (r.next = i.next, i.next = r) : (r.next = p.head, p.head = r);
} else p.head = r;
}
function f(t, e, n) {
var r = v[n], i = c(t, e);
i ? i.next = r.next : p.head = r.next;
}
var p = this, h = 0, d = 0;
this.getAttachId = function() {
return d++;
};
var $, m, v = this.messages = {};
this.render = function(c) {
c = c || {}, $ = !1, m = c;
for (var l = e(s, u.ngMessagesMultiple) || e(s, u.multiple), f = [], h = {}, d = p.head, v = !1, g = 0; null != d; ) {
g++;
var y = d.message, b = !1;
v || o(c, function(t, e) {
if (!b && n(t) && y.test(e)) {
if (h[e]) return;
h[e] = !0, b = !0, y.attach();
}
}), b ? v = !l : f.push(y), d = d.next;
}
o(f, function(t) {
t.detach();
}), f.length !== g ? t.setClass(a, r, i) : t.setClass(a, i, r);
}, s.$watchCollection(u.ngMessages || u.for, p.render), this.reRender = function() {
$ || ($ = !0, s.$evalAsync(function() {
$ && m && p.render(m);
}));
}, this.register = function(t, e) {
var n = "" + h;
v[n] = {
message: e
}, l(a[0], t, n), t.$$ngMessageNode = n, h++, p.reRender();
}, this.deregister = function(t) {
var e = t.$$ngMessageNode;
delete t.$$ngMessageNode, f(a[0], t, e), delete v[e], p.reRender();
};
} ]
};
} ]).directive("ngMessagesInclude", [ "$templateRequest", "$document", "$compile", function(t, e, n) {
return {
restrict: "AE",
require: "^^ngMessages",
link: function(r, i, o) {
var a = o.ngMessagesInclude || o.src;
t(a).then(function(t) {
n(t)(r, function(t) {
i.after(t);
var n = s(e[0].createComment(" ngMessagesInclude: " + a + " "));
i.after(n), i.remove();
});
});
}
};
} ]).directive("ngMessage", r("AE")).directive("ngMessageExp", r("A"));
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
return D(new (D(function() {}, {
prototype: t
}))(), e);
}
function i(t) {
return q(arguments, function(e) {
e !== t && q(e, function(e, n) {
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
return q(t, function(t, n) {
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
for (var f in u) if (u[f].params && (i = a(u[f].params), i.length)) for (var p in i) s(l, i[p]) >= 0 || (l.push(i[p]), 
c[i[p]] = t[i[p]]);
return D({}, c, e);
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
return q(t, function(t) {
n[t] = e[t];
}), n;
}
function f(t) {
var e = {}, n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
return q(n, function(n) {
n in t && (e[n] = t[n]);
}), e;
}
function p(t) {
var e = {}, n = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
for (var r in t) -1 == s(n, r) && (e[r] = t[r]);
return e;
}
function h(t, e) {
var n = I(t), r = n ? [] : {};
return q(t, function(t, i) {
e(t, i) && (r[n ? r.length : i] = t);
}), r;
}
function d(t, e) {
var n = I(t) ? [] : {};
return q(t, function(t, r) {
n[r] = e(t, r);
}), n;
}
function $(t, e) {
var r = 1, o = 2, u = {}, c = [], l = u, f = D(t.when(u), {
$$promises: u,
$$values: u
});
this.study = function(u) {
function h(t, n) {
if (g[n] !== o) {
if (v.push(n), g[n] === r) throw v.splice(0, s(v, n)), Error("Cyclic dependency: " + v.join(" -> "));
if (g[n] = r, V(t)) m.push(n, [ function() {
return e.get(t);
} ], c); else {
var i = e.annotate(t);
q(i, function(t) {
t !== n && u.hasOwnProperty(t) && h(u[t], t);
}), m.push(n, t, i);
}
v.pop(), g[n] = o;
}
}
function d(t) {
return R(t) && t.then && t.$$promises;
}
if (!R(u)) throw Error("'invocables' must be an object");
var $ = a(u || {}), m = [], v = [], g = {};
return q(u, h), u = v = g = null, function(r, o, a) {
function s() {
--b || (w || i(y, o.$$values), v.$$values = y, v.$$promises = v.$$promises || !0, 
delete v.$$inheritedValues, h.resolve(y));
}
function u(t) {
v.$$failure = t, h.reject(t);
}
function c(n, i, o) {
function c(t) {
f.reject(t), u(t);
}
function l() {
if (!P(v.$$failure)) try {
f.resolve(e.invoke(i, a, y)), f.promise.then(function(t) {
y[n] = t, s();
}, c);
} catch (t) {
c(t);
}
}
var f = t.defer(), p = 0;
q(o, function(t) {
g.hasOwnProperty(t) && !r.hasOwnProperty(t) && (p++, g[t].then(function(e) {
y[t] = e, --p || l();
}, c));
}), p || l(), g[n] = f.promise;
}
if (d(r) && a === n && (a = o, o = r, r = null), r) {
if (!R(r)) throw Error("'locals' must be an object");
} else r = l;
if (o) {
if (!d(o)) throw Error("'parent' must be a promise returned by $resolve.resolve()");
} else o = f;
var h = t.defer(), v = h.promise, g = v.$$promises = {}, y = D({}, r), b = 1 + m.length / 3, w = !1;
if (P(o.$$failure)) return u(o.$$failure), v;
o.$$inheritedValues && i(y, p(o.$$inheritedValues, $)), D(g, o.$$promises), o.$$values ? (w = i(y, p(o.$$values, $)), 
v.$$inheritedValues = p(o.$$values, $), s()) : (o.$$inheritedValues && (v.$$inheritedValues = p(o.$$inheritedValues, $)), 
o.then(s, u));
for (var x = 0, E = m.length; E > x; x += 3) r.hasOwnProperty(m[x]) ? s() : c(m[x], m[x + 1], m[x + 2]);
return v;
};
}, this.resolve = function(t, e, n, r) {
return this.study(t)(e, n, r);
};
}
function m(t, e, n) {
this.fromConfig = function(t, e, n) {
return P(t.template) ? this.fromString(t.template, e) : P(t.templateUrl) ? this.fromUrl(t.templateUrl, e) : P(t.templateProvider) ? this.fromProvider(t.templateProvider, e, n) : null;
}, this.fromString = function(t, e) {
return N(t) ? t(e) : t;
}, this.fromUrl = function(n, r) {
return N(n) && (n = n(r)), null == n ? null : t.get(n, {
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
function v(t, e, i) {
function o(e, n, r, i) {
if (m.push(e), d[e]) return d[e];
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
return a = i[2] || i[3], l = e.params[a], u = t.substring(p, i.index), s = o ? i[4] : i[4] || ("*" == i[1] ? ".*" : null), 
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
e = D({
params: {}
}, R(e) ? e : {});
var u, c = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, f = "^", p = 0, h = this.segments = [], d = i ? i.params : {}, $ = this.params = i ? i.params.$$new() : new L.ParamSet(), m = [];
this.source = t;
for (var v, g, y; (u = c.exec(t)) && (v = s(u, !1), !(v.segment.indexOf("?") >= 0)); ) g = o(v.id, v.type, v.cfg, "path"), 
f += a(v.segment, g.type.pattern.source, g.squash, g.isOptional), h.push(v.segment), 
p = c.lastIndex;
y = t.substring(p);
var b = y.indexOf("?");
if (b >= 0) {
var w = this.sourceSearch = y.substring(b);
if (y = y.substring(0, b), this.sourcePath = t.substring(0, p + b), w.length > 0) for (p = 0; u = l.exec(w); ) v = s(u, !0), 
g = o(v.id, v.type, v.cfg, "search"), p = c.lastIndex;
} else this.sourcePath = t, this.sourceSearch = "";
f += a(y) + (e.strict === !1 ? "/?" : "") + "$", h.push(y), this.regexp = RegExp(f, e.caseInsensitive ? "i" : n), 
this.prefix = h[0], this.$$paramNames = m;
}
function g(t) {
D(this, t);
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
caseInsensitive: p
};
}
function u(t) {
return N(t) || I(t) && N(t[t.length - 1]);
}
function c() {
for (;x.length; ) {
var t = x.shift();
if (t.pattern) throw Error("You cannot override a type's .pattern at runtime.");
e.extend(b[t.name], f.invoke(t.def));
}
}
function l(t) {
D(this, t || {});
}
L = this;
var f, p = !1, $ = !0, m = !1, b = {}, w = !0, x = [], E = {
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
return P(t) && (p = t), p;
}, this.strictMode = function(t) {
return P(t) && ($ = t), $;
}, this.defaultSquashPolicy = function(t) {
if (!P(t)) return m;
if (t !== !0 && t !== !1 && !V(t)) throw Error("Invalid squash policy: " + t + ". Valid policies: false, true, arbitrary-string");
return m = t, t;
}, this.compile = function(t, e) {
return new v(t, D(o(), e));
}, this.isMatcher = function(t) {
if (!R(t)) return !1;
var e = !0;
return q(v.prototype, function(n, r) {
N(n) && (e = e && P(t[r]) && N(t[r]));
}), e;
}, this.type = function(t, e, n) {
if (!P(e)) return b[t];
if (b.hasOwnProperty(t)) throw Error("A type named '" + t + "' has already been defined.");
return b[t] = new g(D({
name: t
}, e)), n && (x.push({
name: t,
def: n
}), w || c()), this;
}, q(E, function(t, e) {
b[e] = new g(D({
name: e
}, t));
}), b = r(b, {}), this.$get = [ "$injector", function(t) {
return f = t, w = !1, c(), q(E, function(t, e) {
b[e] || (b[e] = new g(t));
}), this;
} ], this.Param = function(t, e, r, i) {
function o(t) {
var e = R(t) ? a(t) : [], n = -1 === s(e, "value") && -1 === s(e, "type") && -1 === s(e, "squash") && -1 === s(e, "array");
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
return D(e, n, r).array;
}
function p(t, e) {
var n = t.squash;
if (!e || n === !1) return !1;
if (!P(n) || null == n) return m;
if (n === !0 || V(n)) return n;
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
return o = I(t.replace) ? t.replace : [], V(i) && o.push({
from: i,
to: n
}), a = d(o, function(t) {
return t.from;
}), h(u, function(t) {
return -1 === s(a, t.from);
}).concat(o);
}
function v() {
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
var n = d(h(x.replace, e(t)), function(t) {
return t.to;
});
return n.length ? n[0] : t;
}
return t = n(t), P(t) ? x.type.$normalize(t) : v();
}
function w() {
return "{Param:" + t + " " + e + " squash: '" + S + "' optional: " + k + "}";
}
var x = this;
r = o(r), e = c(r, e, i);
var E = l();
e = E ? e.$asArray(E, "search" === i) : e, "string" !== e.name || E || "path" !== i || r.value !== n || (r.value = "");
var k = r.value !== n, S = p(r, k), C = $(r, E, k, S);
D(this, {
id: t,
type: e,
location: i,
array: E,
squash: S,
replace: C,
isOptional: k,
value: y,
dynamic: n,
config: r,
toString: w
});
}, l.prototype = {
$$new: function() {
return r(this, D(new l(), {
$$parent: this
}));
},
$$keys: function() {
for (var t = [], e = [], n = this, r = a(l.prototype); n; ) e.push(n), n = n.$$parent;
return e.reverse(), q(e, function(e) {
q(a(e), function(e) {
-1 === s(t, e) && -1 === s(r, e) && t.push(e);
});
}), t;
},
$$values: function(t) {
var e = {}, n = this;
return q(n.$$keys(), function(r) {
e[r] = n[r].value(t && t[r]);
}), e;
},
$$equals: function(t, e) {
var n = !0, r = this;
return q(r.$$keys(), function(i) {
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
function p(t) {
function e(t) {
var e = t(o, r);
return e ? (V(e) && r.replace().url(e), !0) : !1;
}
if (!t || !t.defaultPrevented) {
d && r.url() === d;
d = n;
var i, a = c.length;
for (i = 0; a > i; i++) if (e(c[i])) return;
l && e(l);
}
}
function h() {
return u = u || i.$on("$locationChangeSuccess", p);
}
var d, $ = a.baseHref(), m = r.url();
return f || h(), {
sync: function() {
p();
},
listen: function() {
return h();
},
update: function(t) {
return t ? (m = r.url(), n) : (r.url() !== m && (r.url(m), r.replace()), n);
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
if (!N(t)) throw Error("'rule' must be a function");
return c.push(t), this;
}, this.otherwise = function(t) {
if (V(t)) {
var e = t;
t = function() {
return e;
};
} else if (!N(t)) throw Error("'rule' must be a function");
return l = t, this;
}, this.when = function(t, e) {
var n, s = V(e);
if (V(t) && (t = r.compile(t)), !s && !N(e) && !I(e)) throw Error("invalid 'handler' in when()");
var u = {
matcher: function(t, e) {
return s && (n = r.compile(e), e = [ "$match", function(t) {
return n.format(t);
} ]), D(function(n, r) {
return a(n, e, t.exec(r.path(), r.search()));
}, {
prefix: V(t.prefix) ? t.prefix : ""
});
},
regex: function(t, e) {
if (t.global || t.sticky) throw Error("when() RegExp must not be global or sticky");
return s && (n = e, e = [ "$match", function(t) {
return o(n, t);
} ]), D(function(n, r) {
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
function p(t, e) {
if (!t) return n;
var r = V(t), i = r ? t : t.name, a = o(i);
if (a) {
if (!e) throw Error("No reference point given for path '" + i + "'");
e = p(e);
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
function h(t, e) {
C[t] || (C[t] = []), C[t].push(e);
}
function $(t) {
for (var e = C[t] || []; e.length; ) m(e.shift());
}
function m(e) {
e = r(e, {
self: e,
resolve: e.resolve || {},
toString: function() {
return this.name;
}
});
var n = e.name;
if (!V(n) || n.indexOf("@") >= 0) throw Error("State must have a valid name");
if (S.hasOwnProperty(n)) throw Error("State '" + n + "'' is already defined");
var i = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : V(e.parent) ? e.parent : R(e.parent) && V(e.parent.name) ? e.parent.name : "";
if (i && !S[i]) return h(i, e.self);
for (var o in O) N(O[o]) && (e[o] = O[o](e, O.$delegates[o]));
return S[n] = e, !e[A] && e.url && t.when(e.url, [ "$match", "$stateParams", function(t, n) {
k.$current.navigable == e && c(t, n) || k.transitionTo(e, t, {
inherit: !0,
location: !1
});
} ]), $(n), e;
}
function v(t) {
return t.indexOf("*") > -1;
}
function g(t) {
for (var e = t.split("."), n = k.$current.name.split("."), r = 0, i = e.length; i > r; r++) "*" === e[r] && (n[r] = "*");
return "**" === e[0] && (n = n.slice(s(n, e[1])), n.unshift("**")), "**" === e[e.length - 1] && (n.splice(s(n, e[e.length - 2]) + 1, Number.MAX_VALUE), 
n.push("**")), e.length != n.length ? !1 : n.join("") === e.join("");
}
function y(t, e) {
return V(t) && !P(e) ? O[t] : N(e) && V(t) ? (O[t] && !O.$delegates[t] && (O.$delegates[t] = O[t]), 
O[t] = e, this) : this;
}
function b(t, e) {
return R(t) ? e = t : e.name = t, m(e), this;
}
function w(t, i, o, s, f, h, $) {
function m(e, n, r, o) {
var a = t.$broadcast("$stateNotFound", e, n, r);
if (a.defaultPrevented) return $.update(), C;
if (!a.retry) return null;
if (o.$retry) return $.update(), O;
var s = k.transition = i.when(a.retry);
return s.then(function() {
return s !== k.transition ? b : (e.options.$retry = !0, k.transitionTo(e.to, e.toParams, e.options));
}, function() {
return C;
}), $.update(), s;
}
function y(t, n, r, a, u, c) {
function p() {
var n = [];
return q(t.views, function(r, i) {
var a = r.resolve && r.resolve !== t.resolve ? r.resolve : {};
a.$template = [ function() {
return o.load(i, {
view: r,
locals: u.globals,
params: h,
notify: c.notify
}) || "";
} ], n.push(f.resolve(a, u.globals, u.resolve, t).then(function(n) {
if (N(r.controllerProvider) || I(r.controllerProvider)) {
var o = e.extend({}, a, u.globals);
n.$$controller = s.invoke(r.controllerProvider, null, o);
} else n.$$controller = r.controller;
n.$$state = t, n.$$controllerAs = r.controllerAs, u[i] = n;
}));
}), i.all(n).then(function() {
return u.globals;
});
}
var h = r ? n : l(t.params.$$keys(), n), d = {
$stateParams: h
};
u.resolve = f.resolve(t.resolve, d, u.resolve, t);
var $ = [ u.resolve.then(function(t) {
u.globals = t;
}) ];
return a && $.push(a), i.all($).then(p).then(function() {
return u;
});
}
var b = i.reject(Error("transition superseded")), w = i.reject(Error("transition prevented")), C = i.reject(Error("transition aborted")), O = i.reject(Error("transition failed"));
return E.locals = {
resolve: null,
globals: {
$stateParams: {}
}
}, k = {
params: {},
current: E.self,
$current: E,
transition: null
}, k.reload = function(t) {
return k.transitionTo(k.current, h, {
reload: t || !0,
inherit: !1,
notify: !0
});
}, k.go = function(t, e, n) {
return k.transitionTo(t, e, D({
inherit: !0,
relative: k.$current
}, n));
}, k.transitionTo = function(e, n, o) {
n = n || {}, o = D({
location: !0,
inherit: !1,
relative: null,
notify: !0,
reload: !1,
$retry: !1
}, o || {});
var a, c = k.$current, f = k.params, d = c.path, v = p(e, o.relative), g = n["#"];
if (!P(v)) {
var S = {
to: e,
toParams: n,
options: o
}, C = m(S, c.self, f, o);
if (C) return C;
if (e = S.to, n = S.toParams, o = S.options, v = p(e, o.relative), !P(v)) {
if (!o.relative) throw Error("No such state '" + e + "'");
throw Error("Could not resolve '" + e + "' from state '" + o.relative + "'");
}
}
if (v[A]) throw Error("Cannot transition to abstract state '" + e + "'");
if (o.inherit && (n = u(h, n || {}, k.$current, v)), !v.params.$$validates(n)) return O;
n = v.params.$$values(n), e = v;
var M = e.path, _ = 0, T = M[_], j = E.locals, N = [];
if (o.reload) {
if (V(o.reload) || R(o.reload)) {
if (R(o.reload) && !o.reload.name) throw Error("Invalid reload state object");
var I = o.reload === !0 ? d[0] : p(o.reload);
if (o.reload && !I) throw Error("No such reload state '" + (V(o.reload) ? o.reload : o.reload.name) + "'");
for (;T && T === d[_] && T !== I; ) j = N[_] = T.locals, _++, T = M[_];
}
} else for (;T && T === d[_] && T.ownParams.$$equals(n, f); ) j = N[_] = T.locals, 
_++, T = M[_];
if (x(e, n, c, f, j, o)) return g && (n["#"] = g), k.params = n, F(k.params, h), 
o.location && e.navigable && e.navigable.url && ($.push(e.navigable.url, n, {
$$avoidResync: !0,
replace: "replace" === o.location
}), $.update(!0)), k.transition = null, i.when(k.current);
if (n = l(e.params.$$keys(), n || {}), o.notify && t.$broadcast("$stateChangeStart", e.self, n, c.self, f).defaultPrevented) return t.$broadcast("$stateChangeCancel", e.self, n, c.self, f), 
$.update(), w;
for (var q = i.when(j), L = _; L < M.length; L++, T = M[L]) j = N[L] = r(j), q = y(T, n, T === e, q, j, o);
var U = k.transition = q.then(function() {
var r, i, a;
if (k.transition !== U) return b;
for (r = d.length - 1; r >= _; r--) a = d[r], a.self.onExit && s.invoke(a.self.onExit, a.self, a.locals.globals), 
a.locals = null;
for (r = _; r < M.length; r++) i = M[r], i.locals = N[r], i.self.onEnter && s.invoke(i.self.onEnter, i.self, i.locals.globals);
return g && (n["#"] = g), k.transition !== U ? b : (k.$current = e, k.current = e.self, 
k.params = n, F(k.params, h), k.transition = null, o.location && e.navigable && $.push(e.navigable.url, e.navigable.locals.globals.$stateParams, {
$$avoidResync: !0,
replace: "replace" === o.location
}), o.notify && t.$broadcast("$stateChangeSuccess", e.self, n, c.self, f), $.update(!0), 
k.current);
}, function(r) {
return k.transition !== U ? b : (k.transition = null, a = t.$broadcast("$stateChangeError", e.self, n, c.self, f, r), 
a.defaultPrevented || $.update(), i.reject(r));
});
return U;
}, k.is = function(t, e, r) {
r = D({
relative: k.$current
}, r || {});
var i = p(t, r.relative);
return P(i) ? k.$current !== i ? !1 : e ? c(i.params.$$values(e), h) : !0 : n;
}, k.includes = function(t, e, r) {
if (r = D({
relative: k.$current
}, r || {}), V(t) && v(t)) {
if (!g(t)) return !1;
t = k.$current.name;
}
var i = p(t, r.relative);
return P(i) ? P(k.$current.includes[i.name]) ? e ? c(i.params.$$values(e), h, a(e)) : !0 : !1 : n;
}, k.href = function(t, e, r) {
r = D({
lossy: !0,
inherit: !0,
absolute: !1,
relative: k.$current
}, r || {});
var i = p(t, r.relative);
if (!P(i)) return null;
r.inherit && (e = u(h, e || {}, k.$current, i));
var o = i && r.lossy ? i.navigable : i;
return o && o.url !== n && null !== o.url ? $.href(o.url, l(i.params.$$keys().concat("#"), e || {}), {
absolute: r.absolute
}) : null;
}, k.get = function(t, e) {
if (0 === arguments.length) return d(a(S), function(t) {
return S[t].self;
});
var n = p(t, e || k.$current);
return n && n.self ? n.self : null;
}, k;
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
var E, k, S = {}, C = {}, A = "abstract", O = {
parent: function(t) {
if (P(t.parent) && t.parent) return p(t.parent);
var e = /^(.+)\.[^.]+$/.exec(t.name);
return e ? p(e[1]) : E;
},
data: function(t) {
return t.parent && t.parent.data && (t.data = t.self.data = D({}, t.parent.data, t.data)), 
t.data;
},
url: function(t) {
var e = t.url, n = {
params: t.params || {}
};
if (V(e)) return "^" == e.charAt(0) ? i.compile(e.substring(1), n) : (t.parent.navigable || E).url.concat(e, n);
if (!e || i.isMatcher(e)) return e;
throw Error("Invalid url '" + e + "' in state '" + t + "'");
},
navigable: function(t) {
return t.url ? t : t.parent ? t.parent.navigable : null;
},
ownParams: function(t) {
var e = t.url && t.url.params || new L.ParamSet();
return q(t.params || {}, function(t, n) {
e[n] || (e[n] = new L.Param(n, null, t, "config"));
}), e;
},
params: function(t) {
return t.parent && t.parent.params ? D(t.parent.params.$$new(), t.ownParams) : new L.ParamSet();
},
views: function(t) {
var e = {};
return q(P(t.views) ? t.views : {
"": t
}, function(n, r) {
r.indexOf("@") < 0 && (r += "@" + t.parent.name), e[r] = n;
}), e;
},
path: function(t) {
return t.parent ? t.parent.path.concat(t) : [];
},
includes: function(t) {
var e = t.parent ? D({}, t.parent.includes) : {};
return e[t.name] = !0, e;
},
$delegates: {}
};
E = m({
name: "",
url: "^",
views: null,
"abstract": !0
}), E.navigable = null, this.decorator = y, this.state = b, this.$get = w, w.$inject = [ "$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory" ];
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
return r = D(o, r), r.view && (i = e.fromConfig(r.view, r.params, r.locals)), i && r.notify && t.$broadcast("$viewContentLoading", r), 
i;
}
};
}
this.$get = t, t.$inject = [ "$rootScope", "$templateFactory" ];
}
function E() {
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
function k(t, n, r, i) {
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
f && (f.remove(), f = null), h && (h.$destroy(), h = null), p && (v.leave(p, function() {
f = null;
}), f = p, p = null);
}
function l(a) {
var l, f = C(n, u, o, i), g = f && t.$current && t.$current.locals[f];
if (a || g !== d) {
l = n.$new(), d = t.$current.locals[f];
var y = s(l, function(t) {
v.enter(t, o, function() {
h && h.$emit("$viewContentAnimationEnded"), (e.isDefined(m) && !m || n.$eval(m)) && r(t);
}), c();
});
p = y, h = l, h.$emit("$viewContentLoaded"), h.$eval($);
}
}
var f, p, h, d, $ = u.onload || "", m = u.autoscroll, v = a(u, n);
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
var p = e(l.$$controller, l);
l.$$controllerAs && (i[l.$$controllerAs] = p), a.data("$ngControllerController", p), 
a.children().data("$ngControllerController", p);
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
function M(t, r) {
var i = [ "location", "inherit", "reload", "absolute" ];
return {
restrict: "A",
require: [ "?^uiSrefActive", "?^uiSrefActiveEq" ],
link: function(o, a, s, u) {
var c = A(s.uiSref, t.current.name), l = null, f = O(a) || t.$current, p = "[object SVGAnimatedString]" === Object.prototype.toString.call(a.prop("href")) ? "xlink:href" : "href", h = null, d = "A" === a.prop("tagName").toUpperCase(), $ = "FORM" === a[0].nodeName, m = $ ? "action" : p, v = !0, g = {
relative: f,
inherit: !0
}, y = o.$eval(s.uiSrefOpts) || {};
e.forEach(i, function(t) {
t in y && (g[t] = y[t]);
});
var b = function(r) {
if (r && (l = e.copy(r)), v) {
h = t.href(c.state, l, g);
var i = u[1] || u[0];
return i && i.$$addStateInfo(c.state, l), null === h ? (v = !1, !1) : (s.$set(m, h), 
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
var o = d && !h ? 1 : 0;
e.preventDefault = function() {
o-- <= 0 && r.cancel(i);
};
}
});
}
};
}
function _(t, e, r) {
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
function T(t) {
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
var P = e.isDefined, N = e.isFunction, V = e.isString, R = e.isObject, I = e.isArray, q = e.forEach, D = e.extend, F = e.copy;
e.module("ui.router.util", [ "ng" ]), e.module("ui.router.router", [ "ui.router.util" ]), 
e.module("ui.router.state", [ "ui.router.router", "ui.router.util" ]), e.module("ui.router", [ "ui.router.state" ]), 
e.module("ui.router.compat", [ "ui.router" ]), $.$inject = [ "$q", "$injector" ], 
e.module("ui.router.util").service("$resolve", $), m.$inject = [ "$http", "$templateCache", "$injector" ], 
e.module("ui.router.util").service("$templateFactory", m);
var L;
v.prototype.concat = function(t, e) {
var n = {
caseInsensitive: L.caseInsensitive(),
strict: L.strictMode(),
squash: L.defaultSquashPolicy()
};
return new v(this.sourcePath + t + this.sourceSearch, D(n, e), this);
}, v.prototype.toString = function() {
return this.source;
}, v.prototype.exec = function(t, e) {
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
var f = this.params[a], p = r[i + 1];
for (o = 0; o < f.replace; o++) f.replace[o].from === p && (p = f.replace[o].to);
p && f.array === !0 && (p = n(p)), l[a] = f.value(p);
}
for (;u > i; i++) a = s[i], l[a] = this.params[a].value(e[a]);
return l;
}, v.prototype.parameters = function(t) {
return P(t) ? this.params[t] || null : this.$$paramNames;
}, v.prototype.validates = function(t) {
return this.params.$$validates(t);
}, v.prototype.format = function(t) {
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
var l = s > o, f = r[o], p = i[f], h = p.value(t[f]), $ = p.isOptional && p.type.equals(p.value(), h), m = $ ? p.squash : !1, v = p.type.encode(h);
if (l) {
var g = n[o + 1];
if (m === !1) null != v && (c += I(v) ? d(v, e).join("-") : encodeURIComponent(v)), 
c += g; else if (m === !0) {
var y = c.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
c += g.match(y)[1];
} else V(m) && (c += m + g);
} else {
if (null == v || $ && m !== !1) continue;
I(v) || (v = [ v ]), v = d(v, encodeURIComponent).join("&" + f + "="), c += (a ? "&" : "?") + (f + "=" + v), 
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
return I(t) ? t : P(t) ? [ t ] : [];
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
return e === !0 ? 0 === h(r, a).length : o(r);
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
x.$inject = [], e.module("ui.router.state").provider("$view", x), e.module("ui.router.state").provider("$uiViewScroll", E), 
k.$inject = [ "$state", "$injector", "$uiViewScroll", "$interpolate" ], S.$inject = [ "$compile", "$controller", "$state", "$interpolate" ], 
e.module("ui.router.state").directive("uiView", k), e.module("ui.router.state").directive("uiView", S), 
M.$inject = [ "$state", "$timeout" ], _.$inject = [ "$state", "$stateParams", "$interpolate" ], 
e.module("ui.router.state").directive("uiSref", M).directive("uiSrefActive", _).directive("uiSrefActiveEq", _), 
T.$inject = [ "$state" ], j.$inject = [ "$state" ], e.module("ui.router.state").filter("isState", T).filter("includedByState", j);
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
	 * @license AngularJS v1.4.7
	 * (c) 2010-2015 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
!function(t, e, n) {
"use strict";
function r(t, e) {
return e = e || Error, function() {
var n, r, i = 2, o = arguments, a = o[0], s = "[" + (t ? t + ":" : "") + a + "] ", u = o[1];
for (s += u.replace(/\{\d+\}/g, function(t) {
var e = +t.slice(1, -1), n = e + i;
return n < o.length ? yt(o[n]) : t;
}), s += "\nhttp://errors.angularjs.org/1.4.7/" + (t ? t + "/" : "") + a, r = i, 
n = "?"; r < o.length; r++, n = "&") s += n + "p" + (r - i) + "=" + encodeURIComponent(yt(o[r]));
return new e(s);
};
}
function i(t) {
if (null == t || O(t)) return !1;
var e = "length" in Object(t) && t.length;
return t.nodeType === Gr && e ? !0 : E(t) || qr(t) || 0 === e || "number" == typeof e && e > 0 && e - 1 in t;
}
function o(t, e, n) {
var r, a;
if (t) if (C(t)) for (r in t) "prototype" == r || "length" == r || "name" == r || t.hasOwnProperty && !t.hasOwnProperty(r) || e.call(n, t[r], r, t); else if (qr(t) || i(t)) {
var s = "object" != typeof t;
for (r = 0, a = t.length; a > r; r++) (s || r in t) && e.call(n, t[r], r, t);
} else if (t.forEach && t.forEach !== o) t.forEach(e, n, t); else if (x(t)) for (r in t) e.call(n, t[r], r, t); else if ("function" == typeof t.hasOwnProperty) for (r in t) t.hasOwnProperty(r) && e.call(n, t[r], r, t); else for (r in t) wr.call(t, r) && e.call(n, t[r], r, t);
return t;
}
function a(t, e, n) {
for (var r = Object.keys(t).sort(), i = 0; i < r.length; i++) e.call(n, t[r[i]], r[i]);
return r;
}
function s(t) {
return function(e, n) {
t(n, e);
};
}
function u() {
return ++Rr;
}
function c(t, e) {
e ? t.$$hashKey = e : delete t.$$hashKey;
}
function l(t, e, n) {
for (var r = t.$$hashKey, i = 0, o = e.length; o > i; ++i) {
var a = e[i];
if (w(a) || C(a)) for (var s = Object.keys(a), u = 0, f = s.length; f > u; u++) {
var p = s[u], h = a[p];
n && w(h) ? S(h) ? t[p] = new Date(h.valueOf()) : A(h) ? t[p] = RegExp(h) : (w(t[p]) || (t[p] = qr(h) ? [] : {}), 
l(t[p], [ h ], !0)) : t[p] = h;
}
}
return c(t, r), t;
}
function f(t) {
return l(t, Mr.call(arguments, 1), !1);
}
function p(t) {
return l(t, Mr.call(arguments, 1), !0);
}
function h(t) {
return parseInt(t, 10);
}
function d(t, e) {
return f(Object.create(t), e);
}
function $() {}
function m(t) {
return t;
}
function v(t) {
return function() {
return t;
};
}
function g(t) {
return C(t.toString) && t.toString !== Object.prototype.toString;
}
function y(t) {
return n === t;
}
function b(t) {
return n !== t;
}
function w(t) {
return null !== t && "object" == typeof t;
}
function x(t) {
return null !== t && "object" == typeof t && !Pr(t);
}
function E(t) {
return "string" == typeof t;
}
function k(t) {
return "number" == typeof t;
}
function S(t) {
return "[object Date]" === jr.call(t);
}
function C(t) {
return "function" == typeof t;
}
function A(t) {
return "[object RegExp]" === jr.call(t);
}
function O(t) {
return t && t.window === t;
}
function M(t) {
return t && t.$evalAsync && t.$watch;
}
function _(t) {
return "[object File]" === jr.call(t);
}
function T(t) {
return "[object FormData]" === jr.call(t);
}
function j(t) {
return "[object Blob]" === jr.call(t);
}
function P(t) {
return "boolean" == typeof t;
}
function N(t) {
return t && C(t.then);
}
function V(t) {
return Dr.test(jr.call(t));
}
function R(t) {
return !(!t || !(t.nodeName || t.prop && t.attr && t.find));
}
function I(t) {
var e, n = {}, r = t.split(",");
for (e = 0; e < r.length; e++) n[r[e]] = !0;
return n;
}
function q(t) {
return br(t.nodeName || t[0] && t[0].nodeName);
}
function D(t, e) {
var n = t.indexOf(e);
return n >= 0 && t.splice(n, 1), n;
}
function F(t, e, n, r) {
if (O(t) || M(t)) throw Nr("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
if (V(e)) throw Nr("cpta", "Can't copy! TypedArray destination cannot be mutated.");
if (e) {
if (t === e) throw Nr("cpi", "Can't copy! Source and destination are identical.");
n = n || [], r = r || [], w(t) && (n.push(t), r.push(e));
var i;
if (qr(t)) {
e.length = 0;
for (var a = 0; a < t.length; a++) e.push(F(t[a], null, n, r));
} else {
var s = e.$$hashKey;
if (qr(e) ? e.length = 0 : o(e, function(t, n) {
delete e[n];
}), x(t)) for (i in t) e[i] = F(t[i], null, n, r); else if (t && "function" == typeof t.hasOwnProperty) for (i in t) t.hasOwnProperty(i) && (e[i] = F(t[i], null, n, r)); else for (i in t) wr.call(t, i) && (e[i] = F(t[i], null, n, r));
c(e, s);
}
} else if (e = t, w(t)) {
var u;
if (n && -1 !== (u = n.indexOf(t))) return r[u];
if (qr(t)) return F(t, [], n, r);
if (V(t)) e = new t.constructor(t); else if (S(t)) e = new Date(t.getTime()); else if (A(t)) e = RegExp(t.source, ("" + t).match(/[^\/]*$/)[0]), 
e.lastIndex = t.lastIndex; else {
if (!C(t.cloneNode)) {
var l = Object.create(Pr(t));
return F(t, l, n, r);
}
e = t.cloneNode(!0);
}
r && (n.push(t), r.push(e));
}
return e;
}
function L(t, e) {
if (qr(t)) {
e = e || [];
for (var n = 0, r = t.length; r > n; n++) e[n] = t[n];
} else if (w(t)) {
e = e || {};
for (var i in t) ("$" !== i.charAt(0) || "$" !== i.charAt(1)) && (e[i] = t[i]);
}
return e || t;
}
function U(t, e) {
if (t === e) return !0;
if (null === t || null === e) return !1;
if (t !== t && e !== e) return !0;
var n, r, i, o = typeof t, a = typeof e;
if (o == a && "object" == o) {
if (!qr(t)) {
if (S(t)) return S(e) ? U(t.getTime(), e.getTime()) : !1;
if (A(t)) return A(e) ? "" + t == "" + e : !1;
if (M(t) || M(e) || O(t) || O(e) || qr(e) || S(e) || A(e)) return !1;
i = mt();
for (r in t) if ("$" !== r.charAt(0) && !C(t[r])) {
if (!U(t[r], e[r])) return !1;
i[r] = !0;
}
for (r in e) if (!(r in i) && "$" !== r.charAt(0) && b(e[r]) && !C(e[r])) return !1;
return !0;
}
if (!qr(e)) return !1;
if ((n = t.length) == e.length) {
for (r = 0; n > r; r++) if (!U(t[r], e[r])) return !1;
return !0;
}
}
return !1;
}
function H(t, e, n) {
return t.concat(Mr.call(e, n));
}
function B(t, e) {
return Mr.call(t, e || 0);
}
function z(t, e) {
var n = arguments.length > 2 ? B(arguments, 2) : [];
return !C(e) || e instanceof RegExp ? e : n.length ? function() {
return arguments.length ? e.apply(t, H(n, arguments, 0)) : e.apply(t, n);
} : function() {
return arguments.length ? e.apply(t, arguments) : e.call(t);
};
}
function W(t, r) {
var i = r;
return "string" == typeof t && "$" === t.charAt(0) && "$" === t.charAt(1) ? i = n : O(r) ? i = "$WINDOW" : r && e === r ? i = "$DOCUMENT" : M(r) && (i = "$SCOPE"), 
i;
}
function G(t, e) {
return n === t ? n : (k(e) || (e = e ? 2 : null), JSON.stringify(t, W, e));
}
function J(t) {
return E(t) ? JSON.parse(t) : t;
}
function X(t, e) {
var n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
return isNaN(n) ? e : n;
}
function Y(t, e) {
return t = new Date(t.getTime()), t.setMinutes(t.getMinutes() + e), t;
}
function K(t, e, n) {
n = n ? -1 : 1;
var r = X(e, t.getTimezoneOffset());
return Y(t, n * (r - t.getTimezoneOffset()));
}
function Z(t) {
t = Cr(t).clone();
try {
t.empty();
} catch (e) {}
var n = Cr("<div>").append(t).html();
try {
return t[0].nodeType === Xr ? br(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(t, e) {
return "<" + br(e);
});
} catch (e) {
return br(n);
}
}
function Q(t) {
try {
return decodeURIComponent(t);
} catch (e) {}
}
function tt(t) {
var e = {};
return o((t || "").split("&"), function(t) {
var n, r, i;
t && (r = t = t.replace(/\+/g, "%20"), n = t.indexOf("="), -1 !== n && (r = t.substring(0, n), 
i = t.substring(n + 1)), r = Q(r), b(r) && (i = b(i) ? Q(i) : !0, wr.call(e, r) ? qr(e[r]) ? e[r].push(i) : e[r] = [ e[r], i ] : e[r] = i));
}), e;
}
function et(t) {
var e = [];
return o(t, function(t, n) {
qr(t) ? o(t, function(t) {
e.push(rt(n, !0) + (t === !0 ? "" : "=" + rt(t, !0)));
}) : e.push(rt(n, !0) + (t === !0 ? "" : "=" + rt(t, !0)));
}), e.length ? e.join("&") : "";
}
function nt(t) {
return rt(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+");
}
function rt(t, e) {
return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, e ? "%20" : "+");
}
function it(t, e) {
var n, r, i = Br.length;
for (r = 0; i > r; ++r) if (n = Br[r] + e, E(n = t.getAttribute(n))) return n;
return null;
}
function ot(t, e) {
var n, r, i = {};
o(Br, function(e) {
var i = e + "app";
!n && t.hasAttribute && t.hasAttribute(i) && (n = t, r = t.getAttribute(i));
}), o(Br, function(e) {
var i, o = e + "app";
!n && (i = t.querySelector("[" + o.replace(":", "\\:") + "]")) && (n = i, r = i.getAttribute(o));
}), n && (i.strictDi = null !== it(n, "strict-di"), e(n, r ? [ r ] : [], i));
}
function at(r, i, a) {
w(a) || (a = {});
var s = {
strictDi: !1
};
a = f(s, a);
var u = function() {
if (r = Cr(r), r.injector()) {
var t = r[0] === e ? "document" : Z(r);
throw Nr("btstrpd", "App Already Bootstrapped with this Element '{0}'", t.replace(/</, "&lt;").replace(/>/, "&gt;"));
}
i = i || [], i.unshift([ "$provide", function(t) {
t.value("$rootElement", r);
} ]), a.debugInfoEnabled && i.push([ "$compileProvider", function(t) {
t.debugInfoEnabled(!0);
} ]), i.unshift("ng");
var n = Zt(i, a.strictDi);
return n.invoke([ "$rootScope", "$rootElement", "$compile", "$injector", function(t, e, n, r) {
t.$apply(function() {
e.data("$injector", r), n(e)(t);
});
} ]), n;
}, c = /^NG_ENABLE_DEBUG_INFO!/, l = /^NG_DEFER_BOOTSTRAP!/;
return t && c.test(t.name) && (a.debugInfoEnabled = !0, t.name = t.name.replace(c, "")), 
t && !l.test(t.name) ? u() : (t.name = t.name.replace(l, ""), Vr.resumeBootstrap = function(t) {
return o(t, function(t) {
i.push(t);
}), u();
}, C(Vr.resumeDeferredBootstrap) && Vr.resumeDeferredBootstrap(), n);
}
function st() {
t.name = "NG_ENABLE_DEBUG_INFO!" + t.name, t.location.reload();
}
function ut(t) {
var e = Vr.element(t).injector();
if (!e) throw Nr("test", "no injector found for element argument to getTestability");
return e.get("$$testability");
}
function ct(t, e) {
return e = e || "_", t.replace(zr, function(t, n) {
return (n ? e : "") + t.toLowerCase();
});
}
function lt() {
var e;
if (!Wr) {
var r = Hr();
Ar = y(r) ? t.jQuery : r ? t[r] : n, Ar && Ar.fn.on ? (Cr = Ar, f(Ar.fn, {
scope: hi.scope,
isolateScope: hi.isolateScope,
controller: hi.controller,
injector: hi.injector,
inheritedData: hi.inheritedData
}), e = Ar.cleanData, Ar.cleanData = function(t) {
var n;
if (Ir) Ir = !1; else for (var r, i = 0; null != (r = t[i]); i++) n = Ar._data(r, "events"), 
n && n.$destroy && Ar(r).triggerHandler("$destroy");
e(t);
}) : Cr = Ot, Vr.element = Cr, Wr = !0;
}
}
function ft(t, e, n) {
if (!t) throw Nr("areq", "Argument '{0}' is {1}", e || "?", n || "required");
return t;
}
function pt(t, e, n) {
return n && qr(t) && (t = t[t.length - 1]), ft(C(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" : typeof t)), 
t;
}
function ht(t, e) {
if ("hasOwnProperty" === t) throw Nr("badname", "hasOwnProperty is not a valid {0} name", e);
}
function dt(t, e, n) {
if (!e) return t;
for (var r, i = e.split("."), o = t, a = i.length, s = 0; a > s; s++) r = i[s], 
t && (t = (o = t)[r]);
return !n && C(t) ? z(o, t) : t;
}
function $t(t) {
for (var e, n = t[0], r = t[t.length - 1], i = 1; n !== r && (n = n.nextSibling); i++) (e || t[i] !== n) && (e || (e = Cr(Mr.call(t, 0, i))), 
e.push(n));
return e || t;
}
function mt() {
return Object.create(null);
}
function vt(t) {
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
function t(t, e, n, r) {
return r || (r = i), function() {
return r[n || "push"]([ t, e, arguments ]), l;
};
}
function e(t, e) {
return function(n, o) {
return o && C(o) && (o.$$moduleName = r), i.push([ t, e, arguments ]), l;
};
}
if (!o) throw n("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", r);
var i = [], s = [], u = [], c = t("$injector", "invoke", "push", s), l = {
_invokeQueue: i,
_configBlocks: s,
_runBlocks: u,
requires: o,
name: r,
provider: e("$provide", "provider"),
factory: e("$provide", "factory"),
service: e("$provide", "service"),
value: t("$provide", "value"),
constant: t("$provide", "constant", "unshift"),
decorator: e("$provide", "decorator"),
animation: e("$animateProvider", "register"),
filter: e("$filterProvider", "register"),
controller: e("$controllerProvider", "register"),
directive: e("$compileProvider", "directive"),
config: c,
run: function(t) {
return u.push(t), this;
}
};
return a && c(a), l;
});
};
});
}
function gt(t) {
var e = [];
return JSON.stringify(t, function(t, n) {
if (n = W(t, n), w(n)) {
if (e.indexOf(n) >= 0) return "...";
e.push(n);
}
return n;
});
}
function yt(t) {
return "function" == typeof t ? ("" + t).replace(/ \{[\s\S]*$/, "") : y(t) ? "undefined" : "string" != typeof t ? gt(t) : t;
}
function bt(e) {
f(e, {
bootstrap: at,
copy: F,
extend: f,
merge: p,
equals: U,
element: Cr,
forEach: o,
injector: Zt,
noop: $,
bind: z,
toJson: G,
fromJson: J,
identity: m,
isUndefined: y,
isDefined: b,
isString: E,
isFunction: C,
isObject: w,
isNumber: k,
isElement: R,
isArray: qr,
version: Qr,
isDate: S,
lowercase: br,
uppercase: xr,
callbacks: {
counter: 0
},
getTestability: ut,
$$minErr: r,
$$csp: Ur,
reloadWithDebugInfo: st
}), (Or = vt(t))("ng", [ "ngLocale" ], [ "$provide", function(t) {
t.provider({
$$sanitizeUri: vn
}), t.provider("$compile", ue).directive({
a: ho,
input: To,
textarea: To,
form: yo,
script: Ea,
select: Ca,
style: Oa,
option: Aa,
ngBind: No,
ngBindHtml: Ro,
ngBindTemplate: Vo,
ngClass: qo,
ngClassEven: Fo,
ngClassOdd: Do,
ngCloak: Lo,
ngController: Uo,
ngForm: bo,
ngHide: va,
ngIf: zo,
ngInclude: Wo,
ngInit: Jo,
ngNonBindable: ua,
ngPluralize: pa,
ngRepeat: ha,
ngShow: ma,
ngStyle: ga,
ngSwitch: ya,
ngSwitchWhen: ba,
ngSwitchDefault: wa,
ngOptions: fa,
ngTransclude: xa,
ngModel: oa,
ngList: Xo,
ngChange: Io,
pattern: _a,
ngPattern: _a,
required: Ma,
ngRequired: Ma,
minlength: ja,
ngMinlength: ja,
maxlength: Ta,
ngMaxlength: Ta,
ngValue: Po,
ngModelOptions: sa
}).directive({
ngInclude: Go
}).directive($o).directive(Ho), t.provider({
$anchorScroll: Qt,
$animate: Oi,
$animateCss: Mi,
$$animateQueue: Ai,
$$AnimateRunner: Ci,
$browser: oe,
$cacheFactory: ae,
$controller: he,
$document: de,
$exceptionHandler: $e,
$filter: Tn,
$$forceReflow: Ni,
$interpolate: Me,
$interval: _e,
$http: Se,
$httpParamSerializer: ve,
$httpParamSerializerJQLike: ge,
$httpBackend: Ae,
$xhrFactory: Ce,
$location: Be,
$log: ze,
$parse: fn,
$rootScope: mn,
$q: pn,
$$q: hn,
$sce: wn,
$sceDelegate: bn,
$sniffer: xn,
$templateCache: se,
$templateRequest: En,
$$testability: kn,
$timeout: Sn,
$window: On,
$$rAF: $n,
$$jqLite: Gt,
$$HashMap: vi,
$$cookieReader: _n
});
} ]);
}
function wt() {
return ++ei;
}
function xt(t) {
return t.replace(ii, function(t, e, n, r) {
return r ? n.toUpperCase() : n;
}).replace(oi, "Moz$1");
}
function Et(t) {
return !ci.test(t);
}
function kt(t) {
var e = t.nodeType;
return e === Gr || !e || e === Kr;
}
function St(t) {
for (var e in ti[t.ng339]) return !0;
return !1;
}
function Ct(t, e) {
var n, r, i, a, s = e.createDocumentFragment(), u = [];
if (Et(t)) u.push(e.createTextNode(t)); else {
for (n = n || s.appendChild(e.createElement("div")), r = (li.exec(t) || [ "", "" ])[1].toLowerCase(), 
i = pi[r] || pi._default, n.innerHTML = i[1] + t.replace(fi, "<$1></$2>") + i[2], 
a = i[0]; a--; ) n = n.lastChild;
u = H(u, n.childNodes), n = s.firstChild, n.textContent = "";
}
return s.textContent = "", s.innerHTML = "", o(u, function(t) {
s.appendChild(t);
}), s;
}
function At(t, n) {
n = n || e;
var r;
return (r = ui.exec(t)) ? [ n.createElement(r[1]) ] : (r = Ct(t, n)) ? r.childNodes : [];
}
function Ot(t) {
if (t instanceof Ot) return t;
var e;
if (E(t) && (t = Fr(t), e = !0), !(this instanceof Ot)) {
if (e && "<" != t.charAt(0)) throw si("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
return new Ot(t);
}
e ? qt(this, At(t)) : qt(this, t);
}
function Mt(t) {
return t.cloneNode(!0);
}
function _t(t, e) {
if (e || jt(t), t.querySelectorAll) for (var n = t.querySelectorAll("*"), r = 0, i = n.length; i > r; r++) jt(n[r]);
}
function Tt(t, e, n, r) {
if (b(r)) throw si("offargs", "jqLite#off() does not support the `selector` argument");
var i = Pt(t), a = i && i.events, s = i && i.handle;
if (s) if (e) o(e.split(" "), function(e) {
if (b(n)) {
var r = a[e];
if (D(r || [], n), r && r.length > 0) return;
}
ri(t, e, s), delete a[e];
}); else for (e in a) "$destroy" !== e && ri(t, e, s), delete a[e];
}
function jt(t, e) {
var r = t.ng339, i = r && ti[r];
if (i) {
if (e) return delete i.data[e], n;
i.handle && (i.events.$destroy && i.handle({}, "$destroy"), Tt(t)), delete ti[r], 
t.ng339 = n;
}
}
function Pt(t, e) {
var r = t.ng339, i = r && ti[r];
return e && !i && (t.ng339 = r = wt(), i = ti[r] = {
events: {},
data: {},
handle: n
}), i;
}
function Nt(t, e, n) {
if (kt(t)) {
var r = b(n), i = !r && e && !w(e), o = !e, a = Pt(t, !i), s = a && a.data;
if (r) s[e] = n; else {
if (o) return s;
if (i) return s && s[e];
f(s, e);
}
}
}
function Vt(t, e) {
return t.getAttribute ? (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1 : !1;
}
function Rt(t, e) {
e && t.setAttribute && o(e.split(" "), function(e) {
t.setAttribute("class", Fr((" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Fr(e) + " ", " ")));
});
}
function It(t, e) {
if (e && t.setAttribute) {
var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
o(e.split(" "), function(t) {
t = Fr(t), -1 === n.indexOf(" " + t + " ") && (n += t + " ");
}), t.setAttribute("class", Fr(n));
}
}
function qt(t, e) {
if (e) if (e.nodeType) t[t.length++] = e; else {
var n = e.length;
if ("number" == typeof n && e.window !== e) {
if (n) for (var r = 0; n > r; r++) t[t.length++] = e[r];
} else t[t.length++] = e;
}
}
function Dt(t, e) {
return Ft(t, "$" + (e || "ngController") + "Controller");
}
function Ft(t, e, n) {
t.nodeType == Kr && (t = t.documentElement);
for (var r = qr(e) ? e : [ e ]; t; ) {
for (var i = 0, o = r.length; o > i; i++) if (b(n = Cr.data(t, r[i]))) return n;
t = t.parentNode || t.nodeType === Zr && t.host;
}
}
function Lt(t) {
for (_t(t, !0); t.firstChild; ) t.removeChild(t.firstChild);
}
function Ut(t, e) {
e || _t(t);
var n = t.parentNode;
n && n.removeChild(t);
}
function Ht(e, n) {
n = n || t, "complete" === n.document.readyState ? n.setTimeout(e) : Cr(n).on("load", e);
}
function Bt(t, e) {
var n = di[e.toLowerCase()];
return n && $i[q(t)] && n;
}
function zt(t) {
return mi[t];
}
function Wt(t, e) {
var n = function(n, r) {
n.isDefaultPrevented = function() {
return n.defaultPrevented;
};
var i = e[r || n.type], o = i ? i.length : 0;
if (o) {
if (y(n.immediatePropagationStopped)) {
var a = n.stopImmediatePropagation;
n.stopImmediatePropagation = function() {
n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n);
};
}
n.isImmediatePropagationStopped = function() {
return n.immediatePropagationStopped === !0;
}, o > 1 && (i = L(i));
for (var s = 0; o > s; s++) n.isImmediatePropagationStopped() || i[s].call(t, n);
}
};
return n.elem = t, n;
}
function Gt() {
this.$get = function() {
return f(Ot, {
hasClass: function(t, e) {
return t.attr && (t = t[0]), Vt(t, e);
},
addClass: function(t, e) {
return t.attr && (t = t[0]), It(t, e);
},
removeClass: function(t, e) {
return t.attr && (t = t[0]), Rt(t, e);
}
});
};
}
function Jt(t, e) {
var n = t && t.$$hashKey;
if (n) return "function" == typeof n && (n = t.$$hashKey()), n;
var r = typeof t;
return n = "function" == r || "object" == r && null !== t ? t.$$hashKey = r + ":" + (e || u)() : r + ":" + t;
}
function Xt(t, e) {
if (e) {
var n = 0;
this.nextUid = function() {
return ++n;
};
}
o(t, this.put, this);
}
function Yt(t) {
var e = ("" + t).replace(wi, ""), n = e.match(gi);
return n ? "function(" + (n[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn";
}
function Kt(t, e, n) {
var r, i, a, s;
if ("function" == typeof t) {
if (!(r = t.$inject)) {
if (r = [], t.length) {
if (e) throw E(n) && n || (n = t.name || Yt(t)), xi("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
i = ("" + t).replace(wi, ""), a = i.match(gi), o(a[1].split(yi), function(t) {
t.replace(bi, function(t, e, n) {
r.push(n);
});
});
}
t.$inject = r;
}
} else qr(t) ? (s = t.length - 1, pt(t[s], "fn"), r = t.slice(0, s)) : pt(t, "fn", !0);
return r;
}
function Zt(t, e) {
function r(t) {
return function(e, r) {
return w(e) ? (o(e, s(t)), n) : t(e, r);
};
}
function i(t, e) {
if (ht(t, "service"), (C(e) || qr(e)) && (e = k.instantiate(e)), !e.$get) throw xi("pget", "Provider '{0}' must define $get factory method.", t);
return x[t + m] = e;
}
function a(t, e) {
return function() {
var n = A.invoke(e, this);
if (y(n)) throw xi("undef", "Provider '{0}' must return a value from $get factory method.", t);
return n;
};
}
function u(t, e, n) {
return i(t, {
$get: n !== !1 ? a(t, e) : e
});
}
function c(t, e) {
return u(t, [ "$injector", function(t) {
return t.instantiate(e);
} ]);
}
function l(t, e) {
return u(t, v(e), !1);
}
function f(t, e) {
ht(t, "constant"), x[t] = e, S[t] = e;
}
function p(t, e) {
var n = k.get(t + m), r = n.$get;
n.$get = function() {
var t = A.invoke(r, n);
return A.invoke(e, null, {
$delegate: t
});
};
}
function h(t) {
ft(y(t) || qr(t), "modulesToLoad", "not an array");
var e, n = [];
return o(t, function(t) {
function r(t) {
var e, n;
for (e = 0, n = t.length; n > e; e++) {
var r = t[e], i = k.get(r[0]);
i[r[1]].apply(i, r[2]);
}
}
if (!b.get(t)) {
b.put(t, !0);
try {
E(t) ? (e = Or(t), n = n.concat(h(e.requires)).concat(e._runBlocks), r(e._invokeQueue), 
r(e._configBlocks)) : C(t) ? n.push(k.invoke(t)) : qr(t) ? n.push(k.invoke(t)) : pt(t, "module");
} catch (i) {
throw qr(t) && (t = t[t.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), 
xi("modulerr", "Failed to instantiate module {0} due to:\n{1}", t, i.stack || i.message || i);
}
}
}), n;
}
function d(t, n) {
function r(e, r) {
if (t.hasOwnProperty(e)) {
if (t[e] === $) throw xi("cdep", "Circular dependency found: {0}", e + " <- " + g.join(" <- "));
return t[e];
}
try {
return g.unshift(e), t[e] = $, t[e] = n(e, r);
} catch (i) {
throw t[e] === $ && delete t[e], i;
} finally {
g.shift();
}
}
function i(t, n, i, o) {
"string" == typeof i && (o = i, i = null);
var a, s, u, c = [], l = Zt.$$annotate(t, e, o);
for (s = 0, a = l.length; a > s; s++) {
if (u = l[s], "string" != typeof u) throw xi("itkn", "Incorrect injection token! Expected service name as string, got {0}", u);
c.push(i && i.hasOwnProperty(u) ? i[u] : r(u, o));
}
return qr(t) && (t = t[a]), t.apply(n, c);
}
function o(t, e, n) {
var r = Object.create((qr(t) ? t[t.length - 1] : t).prototype || null), o = i(t, r, e, n);
return w(o) || C(o) ? o : r;
}
return {
invoke: i,
instantiate: o,
get: r,
annotate: Zt.$$annotate,
has: function(e) {
return x.hasOwnProperty(e + m) || t.hasOwnProperty(e);
}
};
}
e = e === !0;
var $ = {}, m = "Provider", g = [], b = new Xt([], !0), x = {
$provide: {
provider: r(i),
factory: r(u),
service: r(c),
value: r(l),
constant: r(f),
decorator: p
}
}, k = x.$injector = d(x, function(t, e) {
throw Vr.isString(e) && g.push(e), xi("unpr", "Unknown provider: {0}", g.join(" <- "));
}), S = {}, A = S.$injector = d(S, function(t, e) {
var r = k.get(t + m, e);
return A.invoke(r.$get, r, n, t);
});
return o(h(t), function(t) {
t && A.invoke(t);
}), A;
}
function Qt() {
var t = !0;
this.disableAutoScrolling = function() {
t = !1;
}, this.$get = [ "$window", "$location", "$rootScope", function(e, r, i) {
function o(t) {
var e = null;
return Array.prototype.some.call(t, function(t) {
return "a" === q(t) ? (e = t, !0) : n;
}), e;
}
function a() {
var t = u.yOffset;
if (C(t)) t = t(); else if (R(t)) {
var n = t[0], r = e.getComputedStyle(n);
t = "fixed" !== r.position ? 0 : n.getBoundingClientRect().bottom;
} else k(t) || (t = 0);
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
function u(t) {
t = E(t) ? t : r.hash();
var e;
t ? (e = c.getElementById(t)) ? s(e) : (e = o(c.getElementsByName(t))) ? s(e) : "top" === t && s(null) : s(null);
}
var c = e.document;
return t && i.$watch(function() {
return r.hash();
}, function(t, e) {
(t !== e || "" !== t) && Ht(function() {
i.$evalAsync(u);
});
}), u;
} ];
}
function te(t, e) {
return t || e ? t ? e ? (qr(t) && (t = t.join(" ")), qr(e) && (e = e.join(" ")), 
t + " " + e) : t : e : "";
}
function ee(t) {
for (var e = 0; e < t.length; e++) {
var n = t[e];
if (n.nodeType === ki) return n;
}
}
function ne(t) {
E(t) && (t = t.split(" "));
var e = mt();
return o(t, function(t) {
t.length && (e[t] = !0);
}), e;
}
function re(t) {
return w(t) ? t : {};
}
function ie(t, e, n, r) {
function i(t) {
try {
t.apply(null, B(arguments, 1));
} finally {
if (g--, 0 === g) for (;b.length; ) try {
b.pop()();
} catch (e) {
n.error(e);
}
}
}
function a(t) {
var e = t.indexOf("#");
return -1 === e ? "" : t.substr(e);
}
function s() {
S = null, c(), l();
}
function u() {
try {
return h.state;
} catch (t) {}
}
function c() {
w = u(), w = y(w) ? null : w, U(w, O) && (w = O), O = w;
}
function l() {
(E !== f.url() || x !== w) && (E = f.url(), x = w, o(C, function(t) {
t(f.url(), w);
}));
}
var f = this, p = (e[0], t.location), h = t.history, d = t.setTimeout, m = t.clearTimeout, v = {};
f.isMock = !1;
var g = 0, b = [];
f.$$completeOutstandingRequest = i, f.$$incOutstandingRequestCount = function() {
g++;
}, f.notifyWhenNoOutstandingRequests = function(t) {
0 === g ? t() : b.push(t);
};
var w, x, E = p.href, k = e.find("base"), S = null;
c(), x = w, f.url = function(e, n, i) {
if (y(i) && (i = null), p !== t.location && (p = t.location), h !== t.history && (h = t.history), 
e) {
var o = x === i;
if (E === e && (!r.history || o)) return f;
var s = E && Ve(E) === Ve(e);
return E = e, x = i, !r.history || s && o ? ((!s || S) && (S = e), n ? p.replace(e) : s ? p.hash = a(e) : p.href = e, 
p.href !== e && (S = e)) : (h[n ? "replaceState" : "pushState"](i, "", e), c(), 
x = w), f;
}
return S || p.href.replace(/%27/g, "'");
}, f.state = function() {
return w;
};
var C = [], A = !1, O = null;
f.onUrlChange = function(e) {
return A || (r.history && Cr(t).on("popstate", s), Cr(t).on("hashchange", s), A = !0), 
C.push(e), e;
}, f.$$applicationDestroyed = function() {
Cr(t).off("hashchange popstate", s);
}, f.$$checkUrlChange = l, f.baseHref = function() {
var t = k.attr("href");
return t ? t.replace(/^(https?\:)?\/\/[^\/]*/, "") : "";
}, f.defer = function(t, e) {
var n;
return g++, n = d(function() {
delete v[n], i(t);
}, e || 0), v[n] = !0, n;
}, f.defer.cancel = function(t) {
return v[t] ? (delete v[t], m(t), i($), !0) : !1;
};
}
function oe() {
this.$get = [ "$window", "$log", "$sniffer", "$document", function(t, e, n, r) {
return new ie(t, r, e, n);
} ];
}
function ae() {
this.$get = function() {
function t(t, n) {
function i(t) {
t != p && (h ? h == t && (h = t.n) : h = t, o(t.n, t.p), o(t, p), p = t, p.n = null);
}
function o(t, e) {
t != e && (t && (t.p = e), e && (e.n = t));
}
if (t in e) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
var a = 0, s = f({}, n, {
id: t
}), u = {}, c = n && n.capacity || Number.MAX_VALUE, l = {}, p = null, h = null;
return e[t] = {
put: function(t, e) {
if (!y(e)) {
if (c < Number.MAX_VALUE) {
var n = l[t] || (l[t] = {
key: t
});
i(n);
}
return t in u || a++, u[t] = e, a > c && this.remove(h.key), e;
}
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
e == p && (p = e.p), e == h && (h = e.n), o(e.n, e.p), delete l[t];
}
delete u[t], a--;
},
removeAll: function() {
u = {}, a = 0, l = {}, p = h = null;
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
function se() {
this.$get = [ "$cacheFactory", function(t) {
return t("templates");
} ];
}
function ue(t, r) {
function i(t, e, n) {
var r = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/, i = {};
return o(t, function(t, o) {
var a = t.match(r);
if (!a) throw _i("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", e, o, t, n ? "controller bindings definition" : "isolate scope definition");
i[o] = {
mode: a[1][0],
collection: "*" === a[2],
optional: "?" === a[3],
attrName: a[4] || o
};
}), i;
}
function a(t, e) {
var n = {
isolateScope: null,
bindToController: null
};
if (w(t.scope) && (t.bindToController === !0 ? (n.bindToController = i(t.scope, e, !0), 
n.isolateScope = {}) : n.isolateScope = i(t.scope, e, !1)), w(t.bindToController) && (n.bindToController = i(t.bindToController, e, !0)), 
w(n.bindToController)) {
var r = t.controller, o = t.controllerAs;
if (!r) throw _i("noctrl", "Cannot bind to controller without directive '{0}'s controller.", e);
if (!pe(r, o)) throw _i("noident", "Cannot bind to controller without identifier for directive '{0}'.", e);
}
return n;
}
function u(t) {
var e = t.charAt(0);
if (!e || e !== br(e)) throw _i("baddir", "Directive name '{0}' is invalid. The first character must be a lowercase letter", t);
if (t !== t.trim()) throw _i("baddir", "Directive name '{0}' is invalid. The name should not contain leading or trailing whitespaces", t);
}
var c = {}, l = "Directive", p = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/, h = /(([\w\-]+)(?:\:([^;]+))?;?)/, g = I("ngSrc,ngSrcset,src,srcset"), x = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, k = /^(on[a-z]+|formaction)$/;
this.directive = function A(e, n) {
return ht(e, "directive"), E(e) ? (u(e), ft(n, "directiveFactory"), c.hasOwnProperty(e) || (c[e] = [], 
t.factory(e + l, [ "$injector", "$exceptionHandler", function(t, n) {
var r = [];
return o(c[e], function(i, o) {
try {
var s = t.invoke(i);
C(s) ? s = {
compile: v(s)
} : !s.compile && s.link && (s.compile = v(s.link)), s.priority = s.priority || 0, 
s.index = o, s.name = s.name || e, s.require = s.require || s.controller && s.name, 
s.restrict = s.restrict || "EA";
var u = s.$$bindings = a(s, s.name);
w(u.isolateScope) && (s.$$isolateBindings = u.isolateScope), s.$$moduleName = i.$$moduleName, 
r.push(s);
} catch (c) {
n(c);
}
}), r;
} ])), c[e].push(n)) : o(e, s(A)), this;
}, this.aHrefSanitizationWhitelist = function(t) {
return b(t) ? (r.aHrefSanitizationWhitelist(t), this) : r.aHrefSanitizationWhitelist();
}, this.imgSrcSanitizationWhitelist = function(t) {
return b(t) ? (r.imgSrcSanitizationWhitelist(t), this) : r.imgSrcSanitizationWhitelist();
};
var S = !0;
this.debugInfoEnabled = function(t) {
return b(t) ? (S = t, this) : S;
}, this.$get = [ "$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(t, r, i, a, s, u, v, b, A, O, _) {
function T(t, e) {
try {
t.addClass(e);
} catch (n) {}
}
function j(t, e, n, r, i) {
t instanceof Cr || (t = Cr(t)), o(t, function(e, n) {
e.nodeType == Xr && e.nodeValue.match(/\S+/) && (t[n] = Cr(e).wrap("<span></span>").parent()[0]);
});
var a = N(t, e, t, n, r, i);
j.$$addScopeClass(t);
var s = null;
return function(e, n, r) {
ft(e, "scope"), r = r || {};
var i = r.parentBoundTranscludeFn, o = r.transcludeControllers, u = r.futureParentElement;
i && i.$$boundTransclude && (i = i.$$boundTransclude), s || (s = P(u));
var c;
if (c = "html" !== s ? Cr(Q(s, Cr("<div>").append(t).html())) : n ? hi.clone.call(t) : t, 
o) for (var l in o) c.data("$" + l + "Controller", o[l].instance);
return j.$$addScopeInfo(c, e), n && n(c, e), a && a(e, c, c, i), c;
};
}
function P(t) {
var e = t && t[0];
return e && "foreignobject" !== q(e) && ("" + e).match(/SVG/) ? "svg" : "html";
}
function N(t, e, r, i, o, a) {
function s(t, r, i, o) {
var a, s, u, c, l, f, p, h, m;
if (d) {
var v = r.length;
for (m = Array(v), l = 0; l < $.length; l += 3) p = $[l], m[p] = r[p];
} else m = r;
for (l = 0, f = $.length; f > l; ) if (u = m[$[l++]], a = $[l++], s = $[l++], a) {
if (a.scope) {
c = t.$new(), j.$$addScopeInfo(Cr(u), c);
var g = a.$$destroyBindings;
g && (a.$$destroyBindings = null, c.$on("$destroyed", g));
} else c = t;
h = a.transcludeOnThisElement ? V(t, a.transclude, o) : !a.templateOnThisElement && o ? o : !o && e ? V(t, e) : null, 
a(s, c, u, i, h, a);
} else s && s(t, u.childNodes, n, o);
}
for (var u, c, l, f, p, h, d, $ = [], m = 0; m < t.length; m++) u = new at(), c = R(t[m], [], u, 0 === m ? i : n, o), 
l = c.length ? L(c, t[m], u, e, r, null, [], [], a) : null, l && l.scope && j.$$addScopeClass(u.$$element), 
p = l && l.terminal || !(f = t[m].childNodes) || !f.length ? null : N(f, l ? (l.transcludeOnThisElement || !l.templateOnThisElement) && l.transclude : e), 
(l || p) && ($.push(m, l, p), h = !0, d = d || l), a = null;
return h ? s : null;
}
function V(t, e, n) {
var r = function(r, i, o, a, s) {
return r || (r = t.$new(!1, s), r.$$transcluded = !0), e(r, i, {
parentBoundTranscludeFn: n,
transcludeControllers: o,
futureParentElement: a
});
};
return r;
}
function R(t, e, n, r, i) {
var o, a, s = t.nodeType, u = n.$attr;
switch (s) {
case Gr:
z(e, ce(q(t)), "E", r, i);
for (var c, l, f, d, $, m, v = t.attributes, g = 0, y = v && v.length; y > g; g++) {
var b = !1, x = !1;
c = v[g], l = c.name, $ = Fr(c.value), d = ce(l), (m = pt.test(d)) && (l = l.replace(Ti, "").substr(8).replace(/_(.)/g, function(t, e) {
return e.toUpperCase();
}));
var k = d.replace(/(Start|End)$/, "");
W(k) && d === k + "Start" && (b = l, x = l.substr(0, l.length - 5) + "end", l = l.substr(0, l.length - 6)), 
f = ce(l.toLowerCase()), u[f] = l, (m || !n.hasOwnProperty(f)) && (n[f] = $, Bt(t, f) && (n[f] = !0)), 
et(t, e, $, f, m), z(e, f, "A", r, i, b, x);
}
if (a = t.className, w(a) && (a = a.animVal), E(a) && "" !== a) for (;o = h.exec(a); ) f = ce(o[2]), 
z(e, f, "C", r, i) && (n[f] = Fr(o[3])), a = a.substr(o.index + o[0].length);
break;

case Xr:
if (11 === Sr) for (;t.parentNode && t.nextSibling && t.nextSibling.nodeType === Xr; ) t.nodeValue = t.nodeValue + t.nextSibling.nodeValue, 
t.parentNode.removeChild(t.nextSibling);
K(e, t.nodeValue);
break;

case Yr:
try {
o = p.exec(t.nodeValue), o && (f = ce(o[1]), z(e, f, "M", r, i) && (n[f] = Fr(o[2])));
} catch (S) {}
}
return e.sort(X), e;
}
function I(t, e, n) {
var r = [], i = 0;
if (e && t.hasAttribute && t.hasAttribute(e)) {
do {
if (!t) throw _i("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", e, n);
t.nodeType == Gr && (t.hasAttribute(e) && i++, t.hasAttribute(n) && i--), r.push(t), 
t = t.nextSibling;
} while (i > 0);
} else r.push(t);
return Cr(r);
}
function F(t, e, n) {
return function(r, i, o, a, s) {
return i = I(i[0], e, n), t(r, i, o, a, s);
};
}
function L(t, r, o, a, s, c, l, f, p) {
function h(t, e, n, r) {
t && (n && (t = F(t, n, r)), t.require = v.require, t.directiveName = g, (_ === v || v.$$isolateScope) && (t = rt(t, {
isolateScope: !0
})), l.push(t)), e && (n && (e = F(e, n, r)), e.require = v.require, e.directiveName = g, 
(_ === v || v.$$isolateScope) && (e = rt(e, {
isolateScope: !0
})), f.push(e));
}
function d(t, e, n, r) {
var i;
if (E(e)) {
var o = e.match(x), a = e.substring(o[0].length), s = o[1] || o[3], u = "?" === o[2];
if ("^^" === s ? n = n.parent() : (i = r && r[a], i = i && i.instance), !i) {
var c = "$" + a + "Controller";
i = s ? n.inheritedData(c) : n.data(c);
}
if (!i && !u) throw _i("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, t);
} else if (qr(e)) {
i = [];
for (var l = 0, f = e.length; f > l; l++) i[l] = d(t, e[l], n, r);
}
return i || null;
}
function $(t, e, n, r, i, o) {
var a = mt();
for (var s in r) {
var c = r[s], l = {
$scope: c === _ || c.$$isolateScope ? i : o,
$element: t,
$attrs: e,
$transclude: n
}, f = c.controller;
"@" == f && (f = e[c.name]);
var p = u(f, l, !0, c.controllerAs);
a[c.name] = p, q || t.data("$" + c.name + "Controller", p.instance);
}
return a;
}
function m(t, e, i, a, s, u) {
function c(t, e, r) {
var i;
return M(t) || (r = e, e = t, t = n), q && (i = y), r || (r = q ? w.parent() : w), 
s(t, e, i, r, P);
}
var p, h, m, v, g, y, b, w, x;
if (r === i ? (x = o, w = o.$$element) : (w = Cr(i), x = new at(w, o)), _ && (g = e.$new(!0)), 
s && (b = c, b.$$boundTransclude = s), O && (y = $(w, x, b, O, g, e)), _ && (j.$$addScopeInfo(w, g, !0, !(T && (T === _ || T === _.$$originalDirective))), 
j.$$addScopeClass(w, !0), g.$$isolateBindings = _.$$isolateBindings, ot(e, x, g, g.$$isolateBindings, _, g)), 
y) {
var E, k, S = _ || A;
S && y[S.name] && (E = S.$$bindings.bindToController, v = y[S.name], v && v.identifier && E && (k = v, 
u.$$destroyBindings = ot(e, x, v.instance, E, S)));
for (p in y) {
v = y[p];
var C = v();
C !== v.instance && (v.instance = C, w.data("$" + p + "Controller", C), v === k && (u.$$destroyBindings(), 
u.$$destroyBindings = ot(e, x, C, E, S)));
}
}
for (p = 0, h = l.length; h > p; p++) m = l[p], it(m, m.isolateScope ? g : e, w, x, m.require && d(m.directiveName, m.require, w, y), b);
var P = e;
for (_ && (_.template || null === _.templateUrl) && (P = g), t && t(P, i.childNodes, n, s), 
p = f.length - 1; p >= 0; p--) m = f[p], it(m, m.isolateScope ? g : e, w, x, m.require && d(m.directiveName, m.require, w, y), b);
}
p = p || {};
for (var v, g, y, b, k, S = -Number.MAX_VALUE, A = p.newScopeDirective, O = p.controllerDirectives, _ = p.newIsolateScopeDirective, T = p.templateDirective, P = p.nonTlbTranscludeDirective, N = !1, V = !1, q = p.hasElementTranscludeDirective, D = o.$$element = Cr(r), L = c, U = a, z = 0, W = t.length; W > z; z++) {
v = t[z];
var X = v.$$start, K = v.$$end;
if (X && (D = I(r, X, K)), y = n, S > v.priority) break;
if ((k = v.scope) && (v.templateUrl || (w(k) ? (Y("new/isolated scope", _ || A, v, D), 
_ = v) : Y("new/isolated scope", _, v, D)), A = A || v), g = v.name, !v.templateUrl && v.controller && (k = v.controller, 
O = O || mt(), Y("'" + g + "' controller", O[g], v, D), O[g] = v), (k = v.transclude) && (N = !0, 
v.$$tlb || (Y("transclusion", P, v, D), P = v), "element" == k ? (q = !0, S = v.priority, 
y = D, D = o.$$element = Cr(e.createComment(" " + g + ": " + o[g] + " ")), r = D[0], 
nt(s, B(y), r), U = j(y, a, S, L && L.name, {
nonTlbTranscludeDirective: P
})) : (y = Cr(Mt(r)).contents(), D.empty(), U = j(y, a))), v.template) if (V = !0, 
Y("template", T, v, D), T = v, k = C(v.template) ? v.template(D, o) : v.template, 
k = lt(k), v.replace) {
if (L = v, y = Et(k) ? [] : fe(Q(v.templateNamespace, Fr(k))), r = y[0], 1 != y.length || r.nodeType !== Gr) throw _i("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", g, "");
nt(s, D, r);
var tt = {
$attr: {}
}, et = R(r, [], tt), st = t.splice(z + 1, t.length - (z + 1));
_ && H(et), t = t.concat(et).concat(st), G(o, tt), W = t.length;
} else D.html(k);
if (v.templateUrl) V = !0, Y("template", T, v, D), T = v, v.replace && (L = v), 
m = J(t.splice(z, t.length - z), D, o, s, N && U, l, f, {
controllerDirectives: O,
newScopeDirective: A !== v && A,
newIsolateScopeDirective: _,
templateDirective: T,
nonTlbTranscludeDirective: P
}), W = t.length; else if (v.compile) try {
b = v.compile(D, o, U), C(b) ? h(null, b, X, K) : b && h(b.pre, b.post, X, K);
} catch (ut) {
i(ut, Z(D));
}
v.terminal && (m.terminal = !0, S = Math.max(S, v.priority));
}
return m.scope = A && A.scope === !0, m.transcludeOnThisElement = N, m.templateOnThisElement = V, 
m.transclude = U, p.hasElementTranscludeDirective = q, m;
}
function H(t) {
for (var e = 0, n = t.length; n > e; e++) t[e] = d(t[e], {
$$isolateScope: !0
});
}
function z(e, n, r, o, a, s, u) {
if (n === a) return null;
var f = null;
if (c.hasOwnProperty(n)) for (var p, h = t.get(n + l), $ = 0, m = h.length; m > $; $++) try {
p = h[$], (y(o) || o > p.priority) && -1 != p.restrict.indexOf(r) && (s && (p = d(p, {
$$start: s,
$$end: u
})), e.push(p), f = p);
} catch (v) {
i(v);
}
return f;
}
function W(e) {
if (c.hasOwnProperty(e)) for (var n, r = t.get(e + l), i = 0, o = r.length; o > i; i++) if (n = r[i], 
n.multiElement) return !0;
return !1;
}
function G(t, e) {
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
function J(t, e, n, r, i, s, u, c) {
var l, f, p = [], h = e[0], $ = t.shift(), m = d($, {
templateUrl: null,
transclude: null,
replace: null,
$$originalDirective: $
}), v = C($.templateUrl) ? $.templateUrl(e, n) : $.templateUrl, g = $.templateNamespace;
return e.empty(), a(v).then(function(a) {
var d, y, b, x;
if (a = lt(a), $.replace) {
if (b = Et(a) ? [] : fe(Q(g, Fr(a))), d = b[0], 1 != b.length || d.nodeType !== Gr) throw _i("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", $.name, v);
y = {
$attr: {}
}, nt(r, e, d);
var E = R(d, [], y);
w($.scope) && H(E), t = E.concat(t), G(n, y);
} else d = h, e.html(a);
for (t.unshift(m), l = L(t, d, n, i, e, $, s, u, c), o(r, function(t, n) {
t == d && (r[n] = e[0]);
}), f = N(e[0].childNodes, i); p.length; ) {
var k = p.shift(), S = p.shift(), C = p.shift(), A = p.shift(), O = e[0];
if (!k.$$destroyed) {
if (S !== h) {
var M = S.className;
c.hasElementTranscludeDirective && $.replace || (O = Mt(d)), nt(C, Cr(S), O), T(Cr(O), M);
}
x = l.transcludeOnThisElement ? V(k, l.transclude, A) : A, l(f, k, O, r, x, l);
}
}
p = null;
}), function(t, e, n, r, i) {
var o = i;
e.$$destroyed || (p ? p.push(e, n, r, o) : (l.transcludeOnThisElement && (o = V(e, l.transclude, i)), 
l(f, e, n, r, o, l)));
};
}
function X(t, e) {
var n = e.priority - t.priority;
return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index;
}
function Y(t, e, n, r) {
function i(t) {
return t ? " (module: " + t + ")" : "";
}
if (e) throw _i("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", e.name, i(e.$$moduleName), n.name, i(n.$$moduleName), t, Z(r));
}
function K(t, e) {
var n = r(e, !0);
n && t.push({
priority: 0,
compile: function(t) {
var e = t.parent(), r = !!e.length;
return r && j.$$addBindingClass(e), function(t, e) {
var i = e.parent();
r || j.$$addBindingClass(i), j.$$addBindingInfo(i, n.expressions), t.$watch(n, function(t) {
e[0].nodeValue = t;
});
};
}
});
}
function Q(t, n) {
switch (t = br(t || "html")) {
case "svg":
case "math":
var r = e.createElement("div");
return r.innerHTML = "<" + t + ">" + n + "</" + t + ">", r.childNodes[0].childNodes;

default:
return n;
}
}
function tt(t, e) {
if ("srcdoc" == e) return A.HTML;
var r = q(t);
return "xlinkHref" == e || "form" == r && "action" == e || "img" != r && ("src" == e || "ngSrc" == e) ? A.RESOURCE_URL : n;
}
function et(t, e, n, i, o) {
var a = tt(t, i);
o = g[i] || o;
var s = r(n, !0, a, o);
if (s) {
if ("multiple" === i && "select" === q(t)) throw _i("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", Z(t));
e.push({
priority: 100,
compile: function() {
return {
pre: function(t, e, u) {
var c = u.$$observers || (u.$$observers = mt());
if (k.test(i)) throw _i("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
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
function nt(t, n, r) {
var i, o, a = n[0], s = n.length, u = a.parentNode;
if (t) for (i = 0, o = t.length; o > i; i++) if (t[i] == a) {
t[i++] = r;
for (var c = i, l = c + s - 1, f = t.length; f > c; c++, l++) f > l ? t[c] = t[l] : delete t[c];
t.length -= s - 1, t.context === a && (t.context = r);
break;
}
u && u.replaceChild(r, a);
var p = e.createDocumentFragment();
p.appendChild(a), Cr.hasData(a) && (Cr(r).data(Cr(a).data()), Ar ? (Ir = !0, Ar.cleanData([ a ])) : delete Cr.cache[a[Cr.expando]]);
for (var h = 1, d = n.length; d > h; h++) {
var $ = n[h];
Cr($).remove(), p.appendChild($), delete n[h];
}
n[0] = r, n.length = 1;
}
function rt(t, e) {
return f(function() {
return t.apply(null, arguments);
}, t, e);
}
function it(t, e, n, r, o, a) {
try {
t(e, n, r, o, a);
} catch (s) {
i(s, Z(n));
}
}
function ot(t, e, n, i, a, u) {
var c;
o(i, function(i, o) {
var u, l, f, p, h = i.attrName, d = i.optional, m = i.mode;
switch (m) {
case "@":
d || wr.call(e, h) || (n[o] = e[h] = void 0), e.$observe(h, function(t) {
E(t) && (n[o] = t);
}), e.$$observers[h].$$scope = t, E(e[h]) && (n[o] = r(e[h])(t));
break;

case "=":
if (!wr.call(e, h)) {
if (d) break;
e[h] = void 0;
}
if (d && !e[h]) break;
l = s(e[h]), p = l.literal ? U : function(t, e) {
return t === e || t !== t && e !== e;
}, f = l.assign || function() {
throw u = n[o] = l(t), _i("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", e[h], a.name);
}, u = n[o] = l(t);
var v = function(e) {
return p(e, n[o]) || (p(e, u) ? f(t, e = n[o]) : n[o] = e), u = e;
};
v.$stateful = !0;
var g;
g = i.collection ? t.$watchCollection(e[h], v) : t.$watch(s(e[h], v), null, l.literal), 
c = c || [], c.push(g);
break;

case "&":
if (l = e.hasOwnProperty(h) ? s(e[h]) : $, l === $ && d) break;
n[o] = function(e) {
return l(t, e);
};
}
});
var l = c ? function() {
for (var t = 0, e = c.length; e > t; ++t) c[t]();
} : $;
return u && l !== $ ? (u.$on("$destroy", l), $) : l;
}
var at = function(t, e) {
if (e) {
var n, r, i, o = Object.keys(e);
for (n = 0, r = o.length; r > n; n++) i = o[n], this[i] = e[i];
} else this.$attr = {};
this.$$element = t;
};
at.prototype = {
$normalize: ce,
$addClass: function(t) {
t && t.length > 0 && O.addClass(this.$$element, t);
},
$removeClass: function(t) {
t && t.length > 0 && O.removeClass(this.$$element, t);
},
$updateClass: function(t, e) {
var n = le(t, e);
n && n.length && O.addClass(this.$$element, n);
var r = le(e, t);
r && r.length && O.removeClass(this.$$element, r);
},
$set: function(t, e, n, r) {
var a, s = this.$$element[0], u = Bt(s, t), c = zt(t), l = t;
if (u ? (this.$$element.prop(t, e), r = u) : c && (this[c] = e, l = c), this[t] = e, 
r ? this.$attr[t] = r : (r = this.$attr[t], r || (this.$attr[t] = r = ct(t, "-"))), 
a = q(this.$$element), "a" === a && "href" === t || "img" === a && "src" === t) this[t] = e = _(e, "src" === t); else if ("img" === a && "srcset" === t) {
for (var f = "", p = Fr(e), h = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, d = /\s/.test(p) ? h : /(,)/, $ = p.split(d), m = Math.floor($.length / 2), v = 0; m > v; v++) {
var g = 2 * v;
f += _(Fr($[g]), !0), f += " " + Fr($[g + 1]);
}
var b = Fr($[2 * v]).split(/\s/);
f += _(Fr(b[0]), !0), 2 === b.length && (f += " " + Fr(b[1])), this[t] = e = f;
}
n !== !1 && (null === e || y(e) ? this.$$element.removeAttr(r) : this.$$element.attr(r, e));
var w = this.$$observers;
w && o(w[l], function(t) {
try {
t(e);
} catch (n) {
i(n);
}
});
},
$observe: function(t, e) {
var n = this, r = n.$$observers || (n.$$observers = mt()), i = r[t] || (r[t] = []);
return i.push(e), v.$evalAsync(function() {
i.$$inter || !n.hasOwnProperty(t) || y(n[t]) || e(n[t]);
}), function() {
D(i, e);
};
}
};
var st = r.startSymbol(), ut = r.endSymbol(), lt = "{{" == st || "}}" == ut ? m : function(t) {
return t.replace(/\{\{/g, st).replace(/}}/g, ut);
}, pt = /^ngAttr[A-Z]/;
return j.$$addBindingInfo = S ? function(t, e) {
var n = t.data("$binding") || [];
qr(e) ? n = n.concat(e) : n.push(e), t.data("$binding", n);
} : $, j.$$addBindingClass = S ? function(t) {
T(t, "ng-binding");
} : $, j.$$addScopeInfo = S ? function(t, e, n, r) {
var i = n ? r ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
t.data(i, e);
} : $, j.$$addScopeClass = S ? function(t, e) {
T(t, e ? "ng-isolate-scope" : "ng-scope");
} : $, j;
} ];
}
function ce(t) {
return xt(t.replace(Ti, ""));
}
function le(t, e) {
var n = "", r = t.split(/\s+/), i = e.split(/\s+/);
t: for (var o = 0; o < r.length; o++) {
for (var a = r[o], s = 0; s < i.length; s++) if (a == i[s]) continue t;
n += (n.length > 0 ? " " : "") + a;
}
return n;
}
function fe(t) {
t = Cr(t);
var e = t.length;
if (1 >= e) return t;
for (;e--; ) {
var n = t[e];
n.nodeType === Yr && _r.call(t, e, 1);
}
return t;
}
function pe(t, e) {
if (e && E(e)) return e;
if (E(t)) {
var n = Pi.exec(t);
if (n) return n[3];
}
}
function he() {
var t = {}, e = !1;
this.register = function(e, n) {
ht(e, "controller"), w(e) ? f(t, e) : t[e] = n;
}, this.allowGlobals = function() {
e = !0;
}, this.$get = [ "$injector", "$window", function(i, o) {
function a(t, e, n, i) {
if (!t || !w(t.$scope)) throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", i, e);
t.$scope[e] = n;
}
return function(r, s, u, c) {
var l, p, h, d;
if (u = u === !0, c && E(c) && (d = c), E(r)) {
if (p = r.match(Pi), !p) throw ji("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", r);
h = p[1], d = d || p[3], r = t.hasOwnProperty(h) ? t[h] : dt(s.$scope, h, !0) || (e ? dt(o, h, !0) : n), 
pt(r, h, !0);
}
if (u) {
var $ = (qr(r) ? r[r.length - 1] : r).prototype;
l = Object.create($ || null), d && a(s, d, l, h || r.name);
var m;
return m = f(function() {
var t = i.invoke(r, l, s, h);
return t !== l && (w(t) || C(t)) && (l = t, d && a(s, d, l, h || r.name)), l;
}, {
instance: l,
identifier: d
});
}
return l = i.instantiate(r, s, h), d && a(s, d, l, h || r.name), l;
};
} ];
}
function de() {
this.$get = [ "$window", function(t) {
return Cr(t.document);
} ];
}
function $e() {
this.$get = [ "$log", function(t) {
return function() {
t.error.apply(t, arguments);
};
} ];
}
function me(t) {
return w(t) ? S(t) ? t.toISOString() : G(t) : t;
}
function ve() {
this.$get = function() {
return function(t) {
if (!t) return "";
var e = [];
return a(t, function(t, n) {
null === t || y(t) || (qr(t) ? o(t, function(t) {
e.push(rt(n) + "=" + rt(me(t)));
}) : e.push(rt(n) + "=" + rt(me(t))));
}), e.join("&");
};
};
}
function ge() {
this.$get = function() {
return function(t) {
function e(t, r, i) {
null === t || y(t) || (qr(t) ? o(t, function(t, n) {
e(t, r + "[" + (w(t) ? n : "") + "]");
}) : w(t) && !S(t) ? a(t, function(t, n) {
e(t, r + (i ? "" : "[") + n + (i ? "" : "]"));
}) : n.push(rt(r) + "=" + rt(me(t))));
}
if (!t) return "";
var n = [];
return e(t, "", !0), n.join("&");
};
};
}
function ye(t, e) {
if (E(t)) {
var n = t.replace(Di, "").trim();
if (n) {
var r = e("Content-Type");
(r && 0 === r.indexOf(Vi) || be(n)) && (t = J(n));
}
}
return t;
}
function be(t) {
var e = t.match(Ii);
return e && qi[e[0]].test(t);
}
function we(t) {
function e(t, e) {
t && (r[t] = r[t] ? r[t] + ", " + e : e);
}
var n, r = mt();
return E(t) ? o(t.split("\n"), function(t) {
n = t.indexOf(":"), e(br(Fr(t.substr(0, n))), Fr(t.substr(n + 1)));
}) : w(t) && o(t, function(t, n) {
e(br(n), Fr(t));
}), r;
}
function xe(t) {
var e;
return function(n) {
if (e || (e = we(t)), n) {
var r = e[br(n)];
return r === void 0 && (r = null), r;
}
return e;
};
}
function Ee(t, e, n, r) {
return C(r) ? r(t, e, n) : (o(r, function(r) {
t = r(t, e, n);
}), t);
}
function ke(t) {
return t >= 200 && 300 > t;
}
function Se() {
var t = this.defaults = {
transformResponse: [ ye ],
transformRequest: [ function(t) {
return !w(t) || _(t) || j(t) || T(t) ? t : G(t);
} ],
headers: {
common: {
Accept: "application/json, text/plain, */*"
},
post: L(Ri),
put: L(Ri),
patch: L(Ri)
},
xsrfCookieName: "XSRF-TOKEN",
xsrfHeaderName: "X-XSRF-TOKEN",
paramSerializer: "$httpParamSerializer"
}, e = !1;
this.useApplyAsync = function(t) {
return b(t) ? (e = !!t, this) : e;
};
var i = !0;
this.useLegacyPromiseExtensions = function(t) {
return b(t) ? (i = !!t, this) : i;
};
var a = this.interceptors = [];
this.$get = [ "$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function(s, u, c, l, p, h) {
function d(e) {
function a(t) {
var e = f({}, t);
return t.data ? e.data = Ee(t.data, t.headers, t.status, c.transformResponse) : e.data = t.data, 
ke(t.status) ? e : p.reject(e);
}
function s(t, e) {
var n, r = {};
return o(t, function(t, i) {
C(t) ? (n = t(e), null != n && (r[i] = n)) : r[i] = t;
}), r;
}
function u(e) {
var n, r, i, o = t.headers, a = f({}, e.headers);
o = f({}, o.common, o[br(e.method)]);
t: for (n in o) {
r = br(n);
for (i in a) if (br(i) === r) continue t;
a[n] = o[n];
}
return s(a, L(e));
}
if (!Vr.isObject(e)) throw r("$http")("badreq", "Http request configuration must be an object.  Received: {0}", e);
var c = f({
method: "get",
transformRequest: t.transformRequest,
transformResponse: t.transformResponse,
paramSerializer: t.paramSerializer
}, e);
c.headers = u(e), c.method = xr(c.method), c.paramSerializer = E(c.paramSerializer) ? h.get(c.paramSerializer) : c.paramSerializer;
var l = function(e) {
var r = e.headers, i = Ee(e.data, xe(r), n, e.transformRequest);
return y(i) && o(r, function(t, e) {
"content-type" === br(e) && delete r[e];
}), y(e.withCredentials) && !y(t.withCredentials) && (e.withCredentials = t.withCredentials), 
v(e, i).then(a, a);
}, d = [ l, n ], $ = p.when(c);
for (o(k, function(t) {
(t.request || t.requestError) && d.unshift(t.request, t.requestError), (t.response || t.responseError) && d.push(t.response, t.responseError);
}); d.length; ) {
var m = d.shift(), g = d.shift();
$ = $.then(m, g);
}
return i ? ($.success = function(t) {
return pt(t, "fn"), $.then(function(e) {
t(e.data, e.status, e.headers, c);
}), $;
}, $.error = function(t) {
return pt(t, "fn"), $.then(null, function(e) {
t(e.data, e.status, e.headers, c);
}), $;
}) : ($.success = Li("success"), $.error = Li("error")), $;
}
function $() {
o(arguments, function(t) {
d[t] = function(e, n) {
return d(f({}, n || {}, {
method: t,
url: e
}));
};
});
}
function m() {
o(arguments, function(t) {
d[t] = function(e, n, r) {
return d(f({}, r || {}, {
method: t,
url: e,
data: n
}));
};
});
}
function v(r, i) {
function o(t, n, r, i) {
function o() {
a(n, t, r, i);
}
h && (ke(t) ? h.put(k, [ t, n, we(r), i ]) : h.remove(k)), e ? l.$applyAsync(o) : (o(), 
l.$$phase || l.$apply());
}
function a(t, e, n, i) {
e = e >= -1 ? e : 0, (ke(e) ? m.resolve : m.reject)({
data: t,
status: e,
headers: xe(n),
config: r,
statusText: i
});
}
function c(t) {
a(t.data, t.status, L(t.headers()), t.statusText);
}
function f() {
var t = d.pendingRequests.indexOf(r);
-1 !== t && d.pendingRequests.splice(t, 1);
}
var h, $, m = p.defer(), v = m.promise, E = r.headers, k = g(r.url, r.paramSerializer(r.params));
if (d.pendingRequests.push(r), v.then(f, f), !r.cache && !t.cache || r.cache === !1 || "GET" !== r.method && "JSONP" !== r.method || (h = w(r.cache) ? r.cache : w(t.cache) ? t.cache : x), 
h && ($ = h.get(k), b($) ? N($) ? $.then(c, c) : qr($) ? a($[1], $[0], L($[2]), $[3]) : a($, 200, {}, "OK") : h.put(k, v)), 
y($)) {
var S = An(r.url) ? u()[r.xsrfCookieName || t.xsrfCookieName] : n;
S && (E[r.xsrfHeaderName || t.xsrfHeaderName] = S), s(r.method, k, i, o, E, r.timeout, r.withCredentials, r.responseType);
}
return v;
}
function g(t, e) {
return e.length > 0 && (t += (-1 == t.indexOf("?") ? "?" : "&") + e), t;
}
var x = c("$http");
t.paramSerializer = E(t.paramSerializer) ? h.get(t.paramSerializer) : t.paramSerializer;
var k = [];
return o(a, function(t) {
k.unshift(E(t) ? h.get(t) : h.invoke(t));
}), d.pendingRequests = [], $("get", "delete", "head", "jsonp"), m("post", "put", "patch"), 
d.defaults = t, d;
} ];
}
function Ce() {
this.$get = function() {
return function() {
return new t.XMLHttpRequest();
};
};
}
function Ae() {
this.$get = [ "$browser", "$window", "$document", "$xhrFactory", function(t, e, n, r) {
return Oe(t, r, t.defer, e.angular.callbacks, n[0]);
} ];
}
function Oe(t, e, n, r, i) {
function a(t, e, n) {
var o = i.createElement("script"), a = null;
return o.type = "text/javascript", o.src = t, o.async = !0, a = function(t) {
ri(o, "load", a), ri(o, "error", a), i.body.removeChild(o), o = null;
var s = -1, u = "unknown";
t && ("load" !== t.type || r[e].called || (t = {
type: "error"
}), u = t.type, s = "error" === t.type ? 404 : 200), n && n(s, u);
}, ni(o, "load", a), ni(o, "error", a), i.body.appendChild(o), a;
}
return function(i, s, u, c, l, f, p, h) {
function d() {
g && g(), w && w.abort();
}
function m(e, r, i, o, a) {
b(k) && n.cancel(k), g = w = null, e(r, i, o, a), t.$$completeOutstandingRequest($);
}
if (t.$$incOutstandingRequestCount(), s = s || t.url(), "jsonp" == br(i)) {
var v = "_" + (r.counter++).toString(36);
r[v] = function(t) {
r[v].data = t, r[v].called = !0;
};
var g = a(s.replace("JSON_CALLBACK", "angular.callbacks." + v), v, function(t, e) {
m(c, t, r[v].data, "", e), r[v] = $;
});
} else {
var w = e(i, s);
w.open(i, s, !0), o(l, function(t, e) {
b(t) && w.setRequestHeader(e, t);
}), w.onload = function() {
var t = w.statusText || "", e = "response" in w ? w.response : w.responseText, n = 1223 === w.status ? 204 : w.status;
0 === n && (n = e ? 200 : "file" == Cn(s).protocol ? 404 : 0), m(c, n, e, w.getAllResponseHeaders(), t);
};
var x = function() {
m(c, -1, null, null, "");
};
if (w.onerror = x, w.onabort = x, p && (w.withCredentials = !0), h) try {
w.responseType = h;
} catch (E) {
if ("json" !== h) throw E;
}
w.send(y(u) ? null : u);
}
if (f > 0) var k = n(d, f); else N(f) && f.then(d);
};
}
function Me() {
var t = "{{", e = "}}";
this.startSymbol = function(e) {
return e ? (t = e, this) : t;
}, this.endSymbol = function(t) {
return t ? (e = t, this) : e;
}, this.$get = [ "$parse", "$exceptionHandler", "$sce", function(n, r, i) {
function o(t) {
return "\\\\\\" + t;
}
function a(n) {
return n.replace(p, t).replace(h, e);
}
function s(t) {
if (null == t) return "";
switch (typeof t) {
case "string":
break;

case "number":
t = "" + t;
break;

default:
t = G(t);
}
return t;
}
function u(o, u, p, h) {
function d(t) {
try {
return t = O(t), h && !b(t) ? t : s(t);
} catch (e) {
r(Ui.interr(o, e));
}
}
h = !!h;
for (var $, m, v, g = 0, w = [], x = [], E = o.length, k = [], S = []; E > g; ) {
if (-1 == ($ = o.indexOf(t, g)) || -1 == (m = o.indexOf(e, $ + c))) {
g !== E && k.push(a(o.substring(g)));
break;
}
g !== $ && k.push(a(o.substring(g, $))), v = o.substring($ + c, m), w.push(v), x.push(n(v, d)), 
g = m + l, S.push(k.length), k.push("");
}
if (p && k.length > 1 && Ui.throwNoconcat(o), !u || w.length) {
var A = function(t) {
for (var e = 0, n = w.length; n > e; e++) {
if (h && y(t[e])) return;
k[S[e]] = t[e];
}
return k.join("");
}, O = function(t) {
return p ? i.getTrusted(p, t) : i.valueOf(t);
};
return f(function(t) {
var e = 0, n = w.length, i = Array(n);
try {
for (;n > e; e++) i[e] = x[e](t);
return A(i);
} catch (a) {
r(Ui.interr(o, a));
}
}, {
exp: o,
expressions: w,
$$watchDelegate: function(t, e) {
var n;
return t.$watchGroup(x, function(r, i) {
var o = A(r);
C(e) && e.call(this, o, r !== i ? n : o, t), n = o;
});
}
});
}
}
var c = t.length, l = e.length, p = RegExp(t.replace(/./g, o), "g"), h = RegExp(e.replace(/./g, o), "g");
return u.startSymbol = function() {
return t;
}, u.endSymbol = function() {
return e;
}, u;
} ];
}
function _e() {
this.$get = [ "$rootScope", "$window", "$q", "$$q", function(t, e, n, r) {
function i(i, a, s, u) {
var c = arguments.length > 4, l = c ? B(arguments, 4) : [], f = e.setInterval, p = e.clearInterval, h = 0, d = b(u) && !u, $ = (d ? r : n).defer(), m = $.promise;
return s = b(s) ? s : 0, m.then(null, null, c ? function() {
i.apply(null, l);
} : i), m.$$intervalId = f(function() {
$.notify(h++), s > 0 && h >= s && ($.resolve(h), p(m.$$intervalId), delete o[m.$$intervalId]), 
d || t.$apply();
}, a), o[m.$$intervalId] = $, m;
}
var o = {};
return i.cancel = function(t) {
return t && t.$$intervalId in o ? (o[t.$$intervalId].reject("canceled"), e.clearInterval(t.$$intervalId), 
delete o[t.$$intervalId], !0) : !1;
}, i;
} ];
}
function Te(t) {
for (var e = t.split("/"), n = e.length; n--; ) e[n] = nt(e[n]);
return e.join("/");
}
function je(t, e) {
var n = Cn(t);
e.$$protocol = n.protocol, e.$$host = n.hostname, e.$$port = h(n.port) || Bi[n.protocol] || null;
}
function Pe(t, e) {
var n = "/" !== t.charAt(0);
n && (t = "/" + t);
var r = Cn(t);
e.$$path = decodeURIComponent(n && "/" === r.pathname.charAt(0) ? r.pathname.substring(1) : r.pathname), 
e.$$search = tt(r.search), e.$$hash = decodeURIComponent(r.hash), e.$$path && "/" != e.$$path.charAt(0) && (e.$$path = "/" + e.$$path);
}
function Ne(t, e) {
return 0 === e.indexOf(t) ? e.substr(t.length) : n;
}
function Ve(t) {
var e = t.indexOf("#");
return -1 == e ? t : t.substr(0, e);
}
function Re(t) {
return t.replace(/(#.+)|#$/, "$1");
}
function Ie(t) {
return t.substr(0, Ve(t).lastIndexOf("/") + 1);
}
function qe(t) {
return t.substring(0, t.indexOf("/", t.indexOf("//") + 2));
}
function De(t, e, n) {
this.$$html5 = !0, n = n || "", je(t, this), this.$$parse = function(t) {
var n = Ne(e, t);
if (!E(n)) throw zi("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, e);
Pe(n, this), this.$$path || (this.$$path = "/"), this.$$compose();
}, this.$$compose = function() {
var t = et(this.$$search), n = this.$$hash ? "#" + nt(this.$$hash) : "";
this.$$url = Te(this.$$path) + (t ? "?" + t : "") + n, this.$$absUrl = e + this.$$url.substr(1);
}, this.$$parseLinkUrl = function(r, i) {
if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
var o, a, s;
return b(o = Ne(t, r)) ? (a = o, s = b(o = Ne(n, o)) ? e + (Ne("/", o) || o) : t + a) : b(o = Ne(e, r)) ? s = e + o : e == r + "/" && (s = e), 
s && this.$$parse(s), !!s;
};
}
function Fe(t, e, n) {
je(t, this), this.$$parse = function(r) {
function i(t, e, n) {
var r, i = /^\/[A-Z]:(\/.*)/;
return 0 === e.indexOf(n) && (e = e.replace(n, "")), i.exec(e) ? t : (r = i.exec(t), 
r ? r[1] : t);
}
var o, a = Ne(t, r) || Ne(e, r);
y(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a : (o = "", y(a) && (t = r, this.replace())) : (o = Ne(n, a), 
y(o) && (o = a)), Pe(o, this), this.$$path = i(this.$$path, o, t), this.$$compose();
}, this.$$compose = function() {
var e = et(this.$$search), r = this.$$hash ? "#" + nt(this.$$hash) : "";
this.$$url = Te(this.$$path) + (e ? "?" + e : "") + r, this.$$absUrl = t + (this.$$url ? n + this.$$url : "");
}, this.$$parseLinkUrl = function(e) {
return Ve(t) == Ve(e) ? (this.$$parse(e), !0) : !1;
};
}
function Le(t, e, n) {
this.$$html5 = !0, Fe.apply(this, arguments), this.$$parseLinkUrl = function(r, i) {
if (i && "#" === i[0]) return this.hash(i.slice(1)), !0;
var o, a;
return t == Ve(r) ? o = r : (a = Ne(e, r)) ? o = t + n + a : e === r + "/" && (o = e), 
o && this.$$parse(o), !!o;
}, this.$$compose = function() {
var e = et(this.$$search), r = this.$$hash ? "#" + nt(this.$$hash) : "";
this.$$url = Te(this.$$path) + (e ? "?" + e : "") + r, this.$$absUrl = t + n + this.$$url;
};
}
function Ue(t) {
return function() {
return this[t];
};
}
function He(t, e) {
return function(n) {
return y(n) ? this[t] : (this[t] = e(n), this.$$compose(), this);
};
}
function Be() {
var t = "", e = {
enabled: !1,
requireBase: !0,
rewriteLinks: !0
};
this.hashPrefix = function(e) {
return b(e) ? (t = e, this) : t;
}, this.html5Mode = function(t) {
return P(t) ? (e.enabled = t, this) : w(t) ? (P(t.enabled) && (e.enabled = t.enabled), 
P(t.requireBase) && (e.requireBase = t.requireBase), P(t.rewriteLinks) && (e.rewriteLinks = t.rewriteLinks), 
this) : e;
}, this.$get = [ "$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(r, i, o, a, s) {
function u(t, e, n) {
var r = l.url(), o = l.$$state;
try {
i.url(t, e, n), l.$$state = i.state();
} catch (a) {
throw l.url(r), l.$$state = o, a;
}
}
function c(t, e) {
r.$broadcast("$locationChangeSuccess", l.absUrl(), t, l.$$state, e);
}
var l, f, p, h = i.baseHref(), d = i.url();
if (e.enabled) {
if (!h && e.requireBase) throw zi("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
p = qe(d) + (h || "/"), f = o.history ? De : Le;
} else p = Ve(d), f = Fe;
var $ = Ie(p);
l = new f(p, $, "#" + t), l.$$parseLinkUrl(d, d), l.$$state = i.state();
var m = /^\s*(javascript|mailto):/i;
a.on("click", function(t) {
if (e.rewriteLinks && !t.ctrlKey && !t.metaKey && !t.shiftKey && 2 != t.which && 2 != t.button) {
for (var n = Cr(t.target); "a" !== q(n[0]); ) if (n[0] === a[0] || !(n = n.parent())[0]) return;
var o = n.prop("href"), u = n.attr("href") || n.attr("xlink:href");
w(o) && "" + o == "[object SVGAnimatedString]" && (o = Cn(o.animVal).href), m.test(o) || !o || n.attr("target") || t.isDefaultPrevented() || l.$$parseLinkUrl(o, u) && (t.preventDefault(), 
l.absUrl() != i.url() && (r.$apply(), s.angular["ff-684208-preventDefault"] = !0));
}
}), Re(l.absUrl()) != Re(d) && i.url(l.absUrl(), !0);
var v = !0;
return i.onUrlChange(function(t, e) {
return y(Ne($, t)) ? (s.location.href = t, n) : (r.$evalAsync(function() {
var n, i = l.absUrl(), o = l.$$state;
l.$$parse(t), l.$$state = e, n = r.$broadcast("$locationChangeStart", t, i, e, o).defaultPrevented, 
l.absUrl() === t && (n ? (l.$$parse(i), l.$$state = o, u(i, !1, o)) : (v = !1, c(i, o)));
}), r.$$phase || r.$digest(), n);
}), r.$watch(function() {
var t = Re(i.url()), e = Re(l.absUrl()), n = i.state(), a = l.$$replace, s = t !== e || l.$$html5 && o.history && n !== l.$$state;
(v || s) && (v = !1, r.$evalAsync(function() {
var e = l.absUrl(), i = r.$broadcast("$locationChangeStart", e, t, l.$$state, n).defaultPrevented;
l.absUrl() === e && (i ? (l.$$parse(t), l.$$state = n) : (s && u(e, a, n === l.$$state ? null : l.$$state), 
c(t, n)));
})), l.$$replace = !1;
}), l;
} ];
}
function ze() {
var t = !0, e = this;
this.debugEnabled = function(e) {
return b(e) ? (t = e, this) : t;
}, this.$get = [ "$window", function(n) {
function r(t) {
return t instanceof Error && (t.stack ? t = t.message && -1 === t.stack.indexOf(t.message) ? "Error: " + t.message + "\n" + t.stack : t.stack : t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), 
t;
}
function i(t) {
var e = n.console || {}, i = e[t] || e.log || $, a = !1;
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
function We(t, e) {
if ("__defineGetter__" === t || "__defineSetter__" === t || "__lookupGetter__" === t || "__lookupSetter__" === t || "__proto__" === t) throw Gi("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", e);
return t;
}
function Ge(t, e) {
if (t += "", !E(t)) throw Gi("iseccst", "Cannot convert object to primitive value! Expression: {0}", e);
return t;
}
function Je(t, e) {
if (t) {
if (t.constructor === t) throw Gi("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
if (t.window === t) throw Gi("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", e);
if (t.children && (t.nodeName || t.prop && t.attr && t.find)) throw Gi("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", e);
if (t === Object) throw Gi("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", e);
}
return t;
}
function Xe(t, e) {
if (t) {
if (t.constructor === t) throw Gi("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
if (t === Ji || t === Xi || t === Yi) throw Gi("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", e);
}
}
function Ye(t, e) {
if (t && (t === 0..constructor || t === (!1).constructor || t === "".constructor || t === {}.constructor || t === [].constructor || t === Function.constructor)) throw Gi("isecaf", "Assigning to a constructor is disallowed! Expression: {0}", e);
}
function Ke(t, e) {
return n !== t ? t : e;
}
function Ze(t, e) {
return n === t ? e : n === e ? t : t + e;
}
function Qe(t, e) {
var n = t(e);
return !n.$stateful;
}
function tn(t, e) {
var n, r;
switch (t.type) {
case to.Program:
n = !0, o(t.body, function(t) {
tn(t.expression, e), n = n && t.expression.constant;
}), t.constant = n;
break;

case to.Literal:
t.constant = !0, t.toWatch = [];
break;

case to.UnaryExpression:
tn(t.argument, e), t.constant = t.argument.constant, t.toWatch = t.argument.toWatch;
break;

case to.BinaryExpression:
tn(t.left, e), tn(t.right, e), t.constant = t.left.constant && t.right.constant, 
t.toWatch = t.left.toWatch.concat(t.right.toWatch);
break;

case to.LogicalExpression:
tn(t.left, e), tn(t.right, e), t.constant = t.left.constant && t.right.constant, 
t.toWatch = t.constant ? [] : [ t ];
break;

case to.ConditionalExpression:
tn(t.test, e), tn(t.alternate, e), tn(t.consequent, e), t.constant = t.test.constant && t.alternate.constant && t.consequent.constant, 
t.toWatch = t.constant ? [] : [ t ];
break;

case to.Identifier:
t.constant = !1, t.toWatch = [ t ];
break;

case to.MemberExpression:
tn(t.object, e), t.computed && tn(t.property, e), t.constant = t.object.constant && (!t.computed || t.property.constant), 
t.toWatch = [ t ];
break;

case to.CallExpression:
n = t.filter ? Qe(e, t.callee.name) : !1, r = [], o(t.arguments, function(t) {
tn(t, e), n = n && t.constant, t.constant || r.push.apply(r, t.toWatch);
}), t.constant = n, t.toWatch = t.filter && Qe(e, t.callee.name) ? r : [ t ];
break;

case to.AssignmentExpression:
tn(t.left, e), tn(t.right, e), t.constant = t.left.constant && t.right.constant, 
t.toWatch = [ t ];
break;

case to.ArrayExpression:
n = !0, r = [], o(t.elements, function(t) {
tn(t, e), n = n && t.constant, t.constant || r.push.apply(r, t.toWatch);
}), t.constant = n, t.toWatch = r;
break;

case to.ObjectExpression:
n = !0, r = [], o(t.properties, function(t) {
tn(t.value, e), n = n && t.value.constant, t.value.constant || r.push.apply(r, t.value.toWatch);
}), t.constant = n, t.toWatch = r;
break;

case to.ThisExpression:
t.constant = !1, t.toWatch = [];
}
}
function en(t) {
if (1 == t.length) {
var e = t[0].expression, r = e.toWatch;
return 1 !== r.length ? r : r[0] !== e ? r : n;
}
}
function nn(t) {
return t.type === to.Identifier || t.type === to.MemberExpression;
}
function rn(t) {
return 1 === t.body.length && nn(t.body[0].expression) ? {
type: to.AssignmentExpression,
left: t.body[0].expression,
right: {
type: to.NGValueParameter
},
operator: "="
} : n;
}
function on(t) {
return 0 === t.body.length || 1 === t.body.length && (t.body[0].expression.type === to.Literal || t.body[0].expression.type === to.ArrayExpression || t.body[0].expression.type === to.ObjectExpression);
}
function an(t) {
return t.constant;
}
function sn(t, e) {
this.astBuilder = t, this.$filter = e;
}
function un(t, e) {
this.astBuilder = t, this.$filter = e;
}
function cn(t) {
return "constructor" == t;
}
function ln(t) {
return C(t.valueOf) ? t.valueOf() : no.call(t);
}
function fn() {
var t = mt(), e = mt();
this.$get = [ "$filter", function(r) {
function i(t, e) {
return null == t || null == e ? t === e : "object" == typeof t && (t = ln(t), "object" == typeof t) ? !1 : t === e || t !== t && e !== e;
}
function a(t, e, r, o, a) {
var s, u = o.inputs;
if (1 === u.length) {
var c = i;
return u = u[0], t.$watch(function(t) {
var e = u(t);
return i(e, c) || (s = o(t, n, n, [ e ]), c = e && ln(e)), s;
}, e, r, a);
}
for (var l = [], f = [], p = 0, h = u.length; h > p; p++) l[p] = i, f[p] = null;
return t.$watch(function(t) {
for (var e = !1, r = 0, a = u.length; a > r; r++) {
var c = u[r](t);
(e || (e = !i(c, l[r]))) && (f[r] = c, l[r] = c && ln(c));
}
return e && (s = o(t, n, n, f)), s;
}, e, r, a);
}
function s(t, e, n, r) {
var i, o;
return i = t.$watch(function(t) {
return r(t);
}, function(t, n, r) {
o = t, C(e) && e.apply(this, arguments), b(t) && r.$$postDigest(function() {
b(o) && i();
});
}, n);
}
function u(t, e, n, r) {
function i(t) {
var e = !0;
return o(t, function(t) {
b(t) || (e = !1);
}), e;
}
var a, s;
return a = t.$watch(function(t) {
return r(t);
}, function(t, n, r) {
s = t, C(e) && e.call(this, t, n, r), i(t) && r.$$postDigest(function() {
i(s) && a();
});
}, n);
}
function c(t, e, n, r) {
var i;
return i = t.$watch(function(t) {
return r(t);
}, function() {
C(e) && e.apply(this, arguments), i();
}, n);
}
function l(t, e) {
if (!e) return t;
var n = t.$$watchDelegate, r = n !== u && n !== s, i = r ? function(n, r, i, o) {
var a = t(n, r, i, o);
return e(a, n, r);
} : function(n, r, i, o) {
var a = t(n, r, i, o), s = e(a, n, r);
return b(a) ? s : a;
};
return t.$$watchDelegate && t.$$watchDelegate !== a ? i.$$watchDelegate = t.$$watchDelegate : e.$stateful || (i.$$watchDelegate = a, 
i.inputs = t.inputs ? t.inputs : [ t ]), i;
}
var f = Ur().noUnsafeEval, p = {
csp: f,
expensiveChecks: !1
}, h = {
csp: f,
expensiveChecks: !0
};
return function(n, i, o) {
var f, d, m;
switch (typeof n) {
case "string":
n = n.trim(), m = n;
var v = o ? e : t;
if (f = v[m], !f) {
":" === n.charAt(0) && ":" === n.charAt(1) && (d = !0, n = n.substring(2));
var g = o ? h : p, y = new Qi(g), b = new eo(y, r, g);
f = b.parse(n), f.constant ? f.$$watchDelegate = c : d ? f.$$watchDelegate = f.literal ? u : s : f.inputs && (f.$$watchDelegate = a), 
v[m] = f;
}
return l(f, i);

case "function":
return l(n, i);

default:
return $;
}
};
} ];
}
function pn() {
this.$get = [ "$rootScope", "$exceptionHandler", function(t, e) {
return dn(function(e) {
t.$evalAsync(e);
}, e);
} ];
}
function hn() {
this.$get = [ "$browser", "$exceptionHandler", function(t, e) {
return dn(function(e) {
t.defer(e);
}, e);
} ];
}
function dn(t, e) {
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
C(r) ? i.resolve(r(t.value)) : 1 === t.status ? i.resolve(t.value) : i.reject(t.value);
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
function p(t) {
var e = new l(), n = 0, r = qr(t) ? [] : {};
return o(t, function(t, i) {
n++, g(t).then(function(t) {
r.hasOwnProperty(i) || (r[i] = t, --n || e.resolve(r));
}, function(t) {
r.hasOwnProperty(i) || e.reject(t);
});
}), 0 === n && e.resolve(r), e.promise;
}
var h = r("$q", TypeError), d = function() {
return new l();
};
f(a.prototype, {
then: function(t, e, n) {
if (y(t) && y(e) && y(n)) return this;
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
}), f(l.prototype, {
resolve: function(t) {
this.promise.$$state.status || (t === this.promise ? this.$$reject(h("qcycle", "Expected promise to be resolved with value other than itself '{0}'", t)) : this.$$resolve(t));
},
$$resolve: function(t) {
var n, r;
r = i(this, this.$$resolve, this.$$reject);
try {
(w(t) || C(t)) && (n = t && t.then), C(n) ? (this.promise.$$state.status = -1, n.call(t, r[0], r[1], this.notify)) : (this.promise.$$state.value = t, 
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
i.notify(C(t) ? t(n) : n);
} catch (s) {
e(s);
}
}
});
}
});
var $ = function(t) {
var e = new l();
return e.reject(t), e.promise;
}, m = function(t, e) {
var n = new l();
return e ? n.resolve(t) : n.reject(t), n.promise;
}, v = function(t, e, n) {
var r = null;
try {
C(n) && (r = n());
} catch (i) {
return m(i, !1);
}
return N(r) ? r.then(function() {
return m(t, e);
}, function(t) {
return m(t, !1);
}) : m(t, e);
}, g = function(t, e, n, r) {
var i = new l();
return i.resolve(t), i.promise.then(e, n, r);
}, b = g, x = function E(t) {
function e(t) {
r.resolve(t);
}
function n(t) {
r.reject(t);
}
if (!C(t)) throw h("norslvr", "Expected resolverFn, got '{0}'", t);
if (!(this instanceof E)) return new E(t);
var r = new l();
return t(e, n), r.promise;
};
return x.defer = d, x.reject = $, x.when = g, x.resolve = b, x.all = p, x;
}
function $n() {
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
function mn() {
function t(t) {
function e() {
this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, 
this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = u(), 
this.$$ChildScope = null;
}
return e.prototype = t, e;
}
var e = 10, n = r("$rootScope"), a = null, s = null;
this.digestTtl = function(t) {
return arguments.length && (e = t), e;
}, this.$get = [ "$injector", "$exceptionHandler", "$parse", "$browser", function(r, c, l, f) {
function p(t) {
t.currentScope.$$destroyed = !0;
}
function h() {
this.$id = u(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, 
this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, 
this.$$watchersCount = 0, this.$$isolateBindings = null;
}
function d(t) {
if (k.$$phase) throw n("inprog", "{0} already in progress", k.$$phase);
k.$$phase = t;
}
function m() {
k.$$phase = null;
}
function v(t, e) {
do t.$$watchersCount += e; while (t = t.$parent);
}
function g(t, e, n) {
do t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n]; while (t = t.$parent);
}
function b() {}
function x() {
for (;O.length; ) try {
O.shift()();
} catch (t) {
c(t);
}
s = null;
}
function E() {
null === s && (s = f.defer(function() {
k.$apply(x);
}));
}
h.prototype = {
constructor: h,
$new: function(e, n) {
var r;
return n = n || this, e ? (r = new h(), r.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = t(this)), 
r = new this.$$ChildScope()), r.$parent = n, r.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = r, 
n.$$childTail = r) : n.$$childHead = n.$$childTail = r, (e || n != this) && r.$on("$destroy", p), 
r;
},
$watch: function(t, e, n, r) {
var i = l(t);
if (i.$$watchDelegate) return i.$$watchDelegate(this, e, n, i, t);
var o = this, s = o.$$watchers, u = {
fn: e,
last: b,
get: i,
exp: r || t,
eq: !!n
};
return a = null, C(e) || (u.fn = $), s || (s = o.$$watchers = []), s.unshift(u), 
v(this, 1), function() {
D(s, u) >= 0 && v(o, -1), a = null;
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
if (!y(o)) {
if (w(o)) if (i(o)) {
a !== h && (a = h, m = a.length = 0, f++), e = o.length, m !== e && (f++, a.length = m = e);
for (var c = 0; e > c; c++) u = a[c], s = o[c], r = u !== u && s !== s, r || u === s || (f++, 
a[c] = s);
} else {
a !== d && (a = d = {}, m = 0, f++), e = 0;
for (n in o) wr.call(o, n) && (e++, s = o[n], u = a[n], n in a ? (r = u !== u && s !== s, 
r || u === s || (f++, a[n] = s)) : (m++, a[n] = s, f++));
if (m > e) {
f++;
for (n in a) wr.call(o, n) || (m--, delete a[n]);
}
} else a !== o && (a = o, f++);
return f;
}
}
function r() {
if ($ ? ($ = !1, e(o, o, u)) : e(o, s, u), c) if (w(o)) if (i(o)) {
s = Array(o.length);
for (var t = 0; t < o.length; t++) s[t] = o[t];
} else {
s = {};
for (var n in o) wr.call(o, n) && (s[n] = o[n]);
} else s = o;
}
n.$stateful = !0;
var o, a, s, u = this, c = e.length > 1, f = 0, p = l(t, n), h = [], d = {}, $ = !0, m = 0;
return this.$watch(p, r);
},
$digest: function() {
var t, r, i, o, u, l, p, h, $, v, g = e, y = this, w = [];
d("$digest"), f.$$checkUrlChange(), this === k && null !== s && (f.defer.cancel(s), 
x()), a = null;
do {
for (l = !1, h = y; S.length; ) {
try {
v = S.shift(), v.scope.$eval(v.expression, v.locals);
} catch (E) {
c(E);
}
a = null;
}
t: do {
if (o = h.$$watchers) for (u = o.length; u--; ) try {
if (t = o[u]) if ((r = t.get(h)) === (i = t.last) || (t.eq ? U(r, i) : "number" == typeof r && "number" == typeof i && isNaN(r) && isNaN(i))) {
if (t === a) {
l = !1;
break t;
}
} else l = !0, a = t, t.last = t.eq ? F(r, null) : r, t.fn(r, i === b ? r : i, h), 
5 > g && ($ = 4 - g, w[$] || (w[$] = []), w[$].push({
msg: C(t.exp) ? "fn: " + (t.exp.name || "" + t.exp) : t.exp,
newVal: r,
oldVal: i
}));
} catch (E) {
c(E);
}
if (!(p = h.$$watchersCount && h.$$childHead || h !== y && h.$$nextSibling)) for (;h !== y && !(p = h.$$nextSibling); ) h = h.$parent;
} while (h = p);
if ((l || S.length) && !g--) throw m(), n("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, w);
} while (l || S.length);
for (m(); A.length; ) try {
A.shift()();
} catch (E) {
c(E);
}
},
$destroy: function() {
if (!this.$$destroyed) {
var t = this.$parent;
this.$broadcast("$destroy"), this.$$destroyed = !0, this === k && f.$$applicationDestroyed(), 
v(this, -this.$$watchersCount);
for (var e in this.$$listenerCount) g(this, this.$$listenerCount[e], e);
t && t.$$childHead == this && (t.$$childHead = this.$$nextSibling), t && t.$$childTail == this && (t.$$childTail = this.$$prevSibling), 
this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), 
this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = $, 
this.$on = this.$watch = this.$watchGroup = function() {
return $;
}, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null;
}
},
$eval: function(t, e) {
return l(t)(this, e);
},
$evalAsync: function(t, e) {
k.$$phase || S.length || f.defer(function() {
S.length && k.$digest();
}), S.push({
scope: this,
expression: t,
locals: e
});
},
$$postDigest: function(t) {
A.push(t);
},
$apply: function(t) {
try {
d("$apply");
try {
return this.$eval(t);
} finally {
m();
}
} catch (e) {
c(e);
} finally {
try {
k.$digest();
} catch (e) {
throw c(e), e;
}
}
},
$applyAsync: function(t) {
function e() {
n.$eval(t);
}
var n = this;
t && O.push(e), E();
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
}, u = H([ s ], arguments, 1);
do {
for (e = o.$$listeners[t] || i, s.currentScope = o, n = 0, r = e.length; r > n; n++) if (e[n]) try {
e[n].apply(null, u);
} catch (l) {
c(l);
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
for (var o, a, s, u = H([ i ], arguments, 1); n = r; ) {
for (i.currentScope = n, o = n.$$listeners[t] || [], a = 0, s = o.length; s > a; a++) if (o[a]) try {
o[a].apply(null, u);
} catch (l) {
c(l);
} else o.splice(a, 1), a--, s--;
if (!(r = n.$$listenerCount[t] && n.$$childHead || n !== e && n.$$nextSibling)) for (;n !== e && !(r = n.$$nextSibling); ) n = n.$parent;
}
return i.currentScope = null, i;
}
};
var k = new h(), S = k.$$asyncQueue = [], A = k.$$postDigestQueue = [], O = k.$$applyAsyncQueue = [];
return k;
} ];
}
function vn() {
var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist = function(e) {
return b(e) ? (t = e, this) : t;
}, this.imgSrcSanitizationWhitelist = function(t) {
return b(t) ? (e = t, this) : e;
}, this.$get = function() {
return function(n, r) {
var i, o = r ? e : t;
return i = Cn(n).href, "" === i || i.match(o) ? n : "unsafe:" + i;
};
};
}
function gn(t) {
if ("self" === t) return t;
if (E(t)) {
if (t.indexOf("***") > -1) throw ro("iwcard", "Illegal sequence *** in string matcher.  String: {0}", t);
return t = Lr(t).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + t + "$");
}
if (A(t)) return RegExp("^" + t.source + "$");
throw ro("imatcher", 'Matchers may only be "self", string patterns or RegExp objects');
}
function yn(t) {
var e = [];
return b(t) && o(t, function(t) {
e.push(gn(t));
}), e;
}
function bn() {
this.SCE_CONTEXTS = io;
var t = [ "self" ], e = [];
this.resourceUrlWhitelist = function(e) {
return arguments.length && (t = yn(e)), t;
}, this.resourceUrlBlacklist = function(t) {
return arguments.length && (e = yn(t)), e;
}, this.$get = [ "$injector", function(n) {
function r(t, e) {
return "self" === t ? An(e) : !!t.exec(e.href);
}
function i(n) {
var i, o, a = Cn("" + n), s = !1;
for (i = 0, o = t.length; o > i; i++) if (r(t[i], a)) {
s = !0;
break;
}
if (s) for (i = 0, o = e.length; o > i; i++) if (r(e[i], a)) {
s = !1;
break;
}
return s;
}
function o(t) {
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
function a(t, e) {
var n = f.hasOwnProperty(t) ? f[t] : null;
if (!n) throw ro("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", t, e);
if (null === e || y(e) || "" === e) return e;
if ("string" != typeof e) throw ro("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", t);
return new n(e);
}
function s(t) {
return t instanceof l ? t.$$unwrapTrustedValue() : t;
}
function u(t, e) {
if (null === e || y(e) || "" === e) return e;
var n = f.hasOwnProperty(t) ? f[t] : null;
if (n && e instanceof n) return e.$$unwrapTrustedValue();
if (t === io.RESOURCE_URL) {
if (i(e)) return e;
throw ro("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", "" + e);
}
if (t === io.HTML) return c(e);
throw ro("unsafe", "Attempting to use an unsafe value in a safe context.");
}
var c = function() {
throw ro("unsafe", "Attempting to use an unsafe value in a safe context.");
};
n.has("$sanitize") && (c = n.get("$sanitize"));
var l = o(), f = {};
return f[io.HTML] = o(l), f[io.CSS] = o(l), f[io.URL] = o(l), f[io.JS] = o(l), f[io.RESOURCE_URL] = o(f[io.URL]), 
{
trustAs: a,
getTrusted: u,
valueOf: s
};
} ];
}
function wn() {
var t = !0;
this.enabled = function(e) {
return arguments.length && (t = !!e), t;
}, this.$get = [ "$parse", "$sceDelegate", function(e, n) {
if (t && 8 > Sr) throw ro("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
var r = L(io);
r.isEnabled = function() {
return t;
}, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, t || (r.trustAs = r.getTrusted = function(t, e) {
return e;
}, r.valueOf = m), r.parseAs = function(t, n) {
var i = e(n);
return i.literal && i.constant ? i : e(n, function(e) {
return r.getTrusted(t, e);
});
};
var i = r.parseAs, a = r.getTrusted, s = r.trustAs;
return o(io, function(t, e) {
var n = br(e);
r[xt("parse_as_" + n)] = function(e) {
return i(t, e);
}, r[xt("get_trusted_" + n)] = function(e) {
return a(t, e);
}, r[xt("trust_as_" + n)] = function(e) {
return s(t, e);
};
}), r;
} ];
}
function xn() {
this.$get = [ "$window", "$document", function(t, e) {
var n, r, i = {}, o = h((/android (\d+)/.exec(br((t.navigator || {}).userAgent)) || [])[1]), a = /Boxee/i.test((t.navigator || {}).userAgent), s = e[0] || {}, u = /^(Moz|webkit|ms)(?=[A-Z])/, c = s.body && s.body.style, l = !1, f = !1;
if (c) {
for (var p in c) if (r = u.exec(p)) {
n = r[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
break;
}
n || (n = "WebkitOpacity" in c && "webkit"), l = !!("transition" in c || n + "Transition" in c), 
f = !!("animation" in c || n + "Animation" in c), !o || l && f || (l = E(c.webkitTransition), 
f = E(c.webkitAnimation));
}
return {
history: !(!t.history || !t.history.pushState || 4 > o || a),
hasEvent: function(t) {
if ("input" === t && 11 >= Sr) return !1;
if (y(i[t])) {
var e = s.createElement("div");
i[t] = "on" + t in e;
}
return i[t];
},
csp: Ur(),
vendorPrefix: n,
transitions: l,
animations: f,
android: o
};
} ];
}
function En() {
this.$get = [ "$templateCache", "$http", "$q", "$sce", function(t, e, n, r) {
function i(o, a) {
function s(t) {
if (!a) throw _i("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", o, t.status, t.statusText);
return n.reject(t);
}
i.totalPendingRequests++, E(o) && t.get(o) || (o = r.getTrustedResourceUrl(o));
var u = e.defaults && e.defaults.transformResponse;
qr(u) ? u = u.filter(function(t) {
return t !== ye;
}) : u === ye && (u = null);
var c = {
cache: t,
transformResponse: u
};
return e.get(o, c).finally(function() {
i.totalPendingRequests--;
}).then(function(e) {
return t.put(o, e.data), e.data;
}, s);
}
return i.totalPendingRequests = 0, i;
} ];
}
function kn() {
this.$get = [ "$rootScope", "$browser", "$location", function(t, e, n) {
var r = {};
return r.findBindings = function(t, e, n) {
var r = t.getElementsByClassName("ng-binding"), i = [];
return o(r, function(t) {
var r = Vr.element(t).data("$binding");
r && o(r, function(r) {
if (n) {
var o = RegExp("(^|\\s)" + Lr(e) + "(\\s|\\||$)");
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
function Sn() {
this.$get = [ "$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(t, e, n, r, i) {
function o(o, s, u) {
C(o) || (u = s, s = o, o = $);
var c, l = B(arguments, 3), f = b(u) && !u, p = (f ? r : n).defer(), h = p.promise;
return c = e.defer(function() {
try {
p.resolve(o.apply(null, l));
} catch (e) {
p.reject(e), i(e);
} finally {
delete a[h.$$timeoutId];
}
f || t.$apply();
}, s), h.$$timeoutId = c, a[c] = p, h;
}
var a = {};
return o.cancel = function(t) {
return t && t.$$timeoutId in a ? (a[t.$$timeoutId].reject("canceled"), delete a[t.$$timeoutId], 
e.defer.cancel(t.$$timeoutId)) : !1;
}, o;
} ];
}
function Cn(t) {
var e = t;
return Sr && (oo.setAttribute("href", e), e = oo.href), oo.setAttribute("href", e), 
{
href: oo.href,
protocol: oo.protocol ? oo.protocol.replace(/:$/, "") : "",
host: oo.host,
search: oo.search ? oo.search.replace(/^\?/, "") : "",
hash: oo.hash ? oo.hash.replace(/^#/, "") : "",
hostname: oo.hostname,
port: oo.port,
pathname: "/" === oo.pathname.charAt(0) ? oo.pathname : "/" + oo.pathname
};
}
function An(t) {
var e = E(t) ? Cn(t) : t;
return e.protocol === ao.protocol && e.host === ao.host;
}
function On() {
this.$get = v(t);
}
function Mn(t) {
function e(t) {
try {
return decodeURIComponent(t);
} catch (e) {
return t;
}
}
var n = t[0] || {}, r = {}, i = "";
return function() {
var t, o, a, s, u, c = n.cookie || "";
if (c !== i) for (i = c, t = i.split("; "), r = {}, a = 0; a < t.length; a++) o = t[a], 
s = o.indexOf("="), s > 0 && (u = e(o.substring(0, s)), y(r[u]) && (r[u] = e(o.substring(s + 1))));
return r;
};
}
function _n() {
this.$get = Mn;
}
function Tn(t) {
function e(r, i) {
if (w(r)) {
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
} ], e("currency", Rn), e("date", Xn), e("filter", jn), e("json", Yn), e("limitTo", Kn), 
e("lowercase", fo), e("number", In), e("orderBy", Zn), e("uppercase", po);
}
function jn() {
return function(t, e, n) {
if (!i(t)) {
if (null == t) return t;
throw r("filter")("notarray", "Expected array but received: {0}", t);
}
var o, a, s = Vn(e);
switch (s) {
case "function":
o = e;
break;

case "boolean":
case "null":
case "number":
case "string":
a = !0;

case "object":
o = Pn(e, n, a);
break;

default:
return t;
}
return Array.prototype.filter.call(t, o);
};
}
function Pn(t, e, n) {
var r, i = w(t) && "$" in t;
return e === !0 ? e = U : C(e) || (e = function(t, e) {
return y(t) ? !1 : null === t || null === e ? t === e : w(e) || w(t) && !g(t) ? !1 : (t = br("" + t), 
e = br("" + e), -1 !== t.indexOf(e));
}), r = function(r) {
return i && !w(r) ? Nn(r, t.$, e, !1) : Nn(r, t, e, n);
};
}
function Nn(t, e, n, r, i) {
var o = Vn(t), a = Vn(e);
if ("string" === a && "!" === e.charAt(0)) return !Nn(t, e.substring(1), n, r);
if (qr(t)) return t.some(function(t) {
return Nn(t, e, n, r);
});
switch (o) {
case "object":
var s;
if (r) {
for (s in t) if ("$" !== s.charAt(0) && Nn(t[s], e, n, !0)) return !0;
return i ? !1 : Nn(t, e, n, !1);
}
if ("object" === a) {
for (s in e) {
var u = e[s];
if (!C(u) && !y(u)) {
var c = "$" === s, l = c ? t : t[s];
if (!Nn(l, u, n, c, c)) return !1;
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
function Vn(t) {
return null === t ? "null" : typeof t;
}
function Rn(t) {
var e = t.NUMBER_FORMATS;
return function(t, n, r) {
return y(n) && (n = e.CURRENCY_SYM), y(r) && (r = e.PATTERNS[1].maxFrac), null == t ? t : qn(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, r).replace(/\u00A4/g, n);
};
}
function In(t) {
var e = t.NUMBER_FORMATS;
return function(t, n) {
return null == t ? t : qn(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n);
};
}
function qn(t, e, n, r, i) {
if (w(t)) return "";
var o = 0 > t;
t = Math.abs(t);
var a = t === 1 / 0;
if (!a && !isFinite(t)) return "";
var s = t + "", u = "", c = !1, l = [];
if (a && (u = "∞"), !a && -1 !== s.indexOf("e")) {
var f = s.match(/([\d\.]+)e(-?)(\d+)/);
f && "-" == f[2] && f[3] > i + 1 ? t = 0 : (u = s, c = !0);
}
if (a || c) i > 0 && 1 > t && (u = t.toFixed(i), t = parseFloat(u), u = u.replace(so, r)); else {
var p = (s.split(so)[1] || "").length;
y(i) && (i = Math.min(Math.max(e.minFrac, p), e.maxFrac)), t = +("" + Math.round(+("" + t + "e" + i)) + "e" + -i);
var h = ("" + t).split(so), d = h[0];
h = h[1] || "";
var $, m = 0, v = e.lgSize, g = e.gSize;
if (d.length >= v + g) for (m = d.length - v, $ = 0; m > $; $++) (m - $) % g === 0 && 0 !== $ && (u += n), 
u += d.charAt($);
for ($ = m; $ < d.length; $++) (d.length - $) % v === 0 && 0 !== $ && (u += n), 
u += d.charAt($);
for (;h.length < i; ) h += "0";
i && "0" !== i && (u += r + h.substr(0, i));
}
return 0 === t && (o = !1), l.push(o ? e.negPre : e.posPre, u, o ? e.negSuf : e.posSuf), 
l.join("");
}
function Dn(t, e, n) {
var r = "";
for (0 > t && (r = "-", t = -t), t = "" + t; t.length < e; ) t = "0" + t;
return n && (t = t.substr(t.length - e)), r + t;
}
function Fn(t, e, n, r) {
return n = n || 0, function(i) {
var o = i["get" + t]();
return (n > 0 || o > -n) && (o += n), 0 === o && -12 == n && (o = 12), Dn(o, e, r);
};
}
function Ln(t, e) {
return function(n, r) {
var i = n["get" + t](), o = xr(e ? "SHORT" + t : t);
return r[o][i];
};
}
function Un(t, e, n) {
var r = -1 * n, i = r >= 0 ? "+" : "";
return i += Dn(Math[r > 0 ? "floor" : "ceil"](r / 60), 2) + Dn(Math.abs(r % 60), 2);
}
function Hn(t) {
var e = new Date(t, 0, 1).getDay();
return new Date(t, 0, (4 >= e ? 5 : 12) - e);
}
function Bn(t) {
return new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay()));
}
function zn(t) {
return function(e) {
var n = Hn(e.getFullYear()), r = Bn(e), i = +r - +n, o = 1 + Math.round(i / 6048e5);
return Dn(o, t);
};
}
function Wn(t, e) {
return t.getHours() < 12 ? e.AMPMS[0] : e.AMPMS[1];
}
function Gn(t, e) {
return t.getFullYear() <= 0 ? e.ERAS[0] : e.ERAS[1];
}
function Jn(t, e) {
return t.getFullYear() <= 0 ? e.ERANAMES[0] : e.ERANAMES[1];
}
function Xn(t) {
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
if (r = r || "mediumDate", r = t.DATETIME_FORMATS[r] || r, E(n) && (n = lo.test(n) ? h(n) : e(n)), 
k(n) && (n = new Date(n)), !S(n) || !isFinite(n.getTime())) return n;
for (;r; ) s = co.exec(r), s ? (c = H(c, s, 1), r = c.pop()) : (c.push(r), r = null);
var l = n.getTimezoneOffset();
return i && (l = X(i, n.getTimezoneOffset()), n = K(n, i, !0)), o(c, function(e) {
a = uo[e], u += a ? a(n, t.DATETIME_FORMATS, l) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'");
}), u;
};
}
function Yn() {
return function(t, e) {
return y(e) && (e = 2), G(t, e);
};
}
function Kn() {
return function(t, e, n) {
return e = Math.abs(+e) === 1 / 0 ? +e : h(e), isNaN(e) ? t : (k(t) && (t = "" + t), 
qr(t) || E(t) ? (n = !n || isNaN(n) ? 0 : h(n), n = 0 > n && n >= -t.length ? t.length + n : n, 
e >= 0 ? t.slice(n, n + e) : 0 === n ? t.slice(e, t.length) : t.slice(Math.max(0, n + e), n)) : t);
};
}
function Zn(t) {
function e(e, n) {
return n = n ? -1 : 1, e.map(function(e) {
var r = 1, i = m;
if (C(e)) i = e; else if (E(e) && (("+" == e.charAt(0) || "-" == e.charAt(0)) && (r = "-" == e.charAt(0) ? -1 : 1, 
e = e.substring(1)), "" !== e && (i = t(e), i.constant))) {
var o = i();
i = function(t) {
return t[o];
};
}
return {
get: i,
descending: r * n
};
});
}
function n(t) {
switch (typeof t) {
case "number":
case "boolean":
case "string":
return !0;

default:
return !1;
}
}
function r(t, e) {
return "function" == typeof t.valueOf && (t = t.valueOf(), n(t)) ? t : g(t) && (t = "" + t, 
n(t)) ? t : e;
}
function o(t, e) {
var n = typeof t;
return null === t ? (n = "string", t = "null") : "string" === n ? t = t.toLowerCase() : "object" === n && (t = r(t, e)), 
{
value: t,
type: n
};
}
function a(t, e) {
var n = 0;
return t.type === e.type ? t.value !== e.value && (n = t.value < e.value ? -1 : 1) : n = t.type < e.type ? -1 : 1, 
n;
}
return function(t, n, r) {
function s(t, e) {
return {
value: t,
predicateValues: c.map(function(n) {
return o(n.get(t), e);
})
};
}
function u(t, e) {
for (var n = 0, r = 0, i = c.length; i > r && !(n = a(t.predicateValues[r], e.predicateValues[r]) * c[r].descending); ++r) ;
return n;
}
if (!i(t)) return t;
qr(n) || (n = [ n ]), 0 === n.length && (n = [ "+" ]);
var c = e(n, r);
c.push({
get: function() {
return {};
},
descending: r ? -1 : 1
});
var l = Array.prototype.map.call(t, s);
return l.sort(u), t = l.map(function(t) {
return t.value;
});
};
}
function Qn(t) {
return C(t) && (t = {
link: t
}), t.restrict = t.restrict || "AC", v(t);
}
function tr(t, e) {
t.$name = e;
}
function er(t, e, r, i, a) {
var s = this, u = [];
s.$error = {}, s.$$success = {}, s.$pending = n, s.$name = a(e.name || e.ngForm || "")(r), 
s.$dirty = !1, s.$pristine = !0, s.$valid = !0, s.$invalid = !1, s.$submitted = !1, 
s.$$parentForm = mo, s.$rollbackViewValue = function() {
o(u, function(t) {
t.$rollbackViewValue();
});
}, s.$commitViewValue = function() {
o(u, function(t) {
t.$commitViewValue();
});
}, s.$addControl = function(t) {
ht(t.$name, "input"), u.push(t), t.$name && (s[t.$name] = t), t.$$parentForm = s;
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
}), D(u, t), t.$$parentForm = mo;
}, mr({
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
r && (D(r, n), 0 === r.length && delete t[e]);
},
$animate: i
}), s.$setDirty = function() {
i.removeClass(t, Zo), i.addClass(t, Qo), s.$dirty = !0, s.$pristine = !1, s.$$parentForm.$setDirty();
}, s.$setPristine = function() {
i.setClass(t, Zo, Qo + " " + vo), s.$dirty = !1, s.$pristine = !0, s.$submitted = !1, 
o(u, function(t) {
t.$setPristine();
});
}, s.$setUntouched = function() {
o(u, function(t) {
t.$setUntouched();
});
}, s.$setSubmitted = function() {
i.addClass(t, vo), s.$submitted = !0, s.$$parentForm.$setSubmitted();
};
}
function nr(t) {
t.$formatters.push(function(e) {
return t.$isEmpty(e) ? e : "" + e;
});
}
function rr(t, e, n, r, i, o) {
ir(t, e, n, r, i, o), nr(r);
}
function ir(t, e, n, r, i, o) {
var a = br(e[0].type);
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
"password" === a || n.ngTrim && "false" === n.ngTrim || (i = Fr(i)), (r.$viewValue !== i || "" === i && r.$$hasNativeValidators) && r.$setViewValue(i, u);
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
var t = r.$isEmpty(r.$viewValue) ? "" : r.$viewValue;
e.val() !== t && e.val(t);
};
}
function or(t, e) {
if (S(t)) return t;
if (E(t)) {
Ao.lastIndex = 0;
var n = Ao.exec(t);
if (n) {
var r = +n[1], i = +n[2], o = 0, a = 0, s = 0, u = 0, c = Hn(r), l = 7 * (i - 1);
return e && (o = e.getHours(), a = e.getMinutes(), s = e.getSeconds(), u = e.getMilliseconds()), 
new Date(r, 0, c.getDate() + l, o, a, s, u);
}
}
return NaN;
}
function ar(t, e) {
return function(n, r) {
var i, a;
if (S(n)) return n;
if (E(n)) {
if ('"' == n.charAt(0) && '"' == n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), 
wo.test(n)) return new Date(n);
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
function sr(t, e, r, i) {
return function(o, a, s, u, c, l, f) {
function p(t) {
return t && !(t.getTime && t.getTime() !== t.getTime());
}
function h(t) {
return b(t) && !S(t) ? r(t) || n : t;
}
ur(o, a, s, u), ir(o, a, s, u, c, l);
var d, $ = u && u.$options && u.$options.timezone;
if (u.$$parserName = t, u.$parsers.push(function(t) {
if (u.$isEmpty(t)) return null;
if (e.test(t)) {
var i = r(t, d);
return $ && (i = K(i, $)), i;
}
return n;
}), u.$formatters.push(function(t) {
if (t && !S(t)) throw ra("datefmt", "Expected `{0}` to be a date", t);
return p(t) ? (d = t, d && $ && (d = K(d, $, !0)), f("date")(t, i, $)) : (d = null, 
"");
}), b(s.min) || s.ngMin) {
var m;
u.$validators.min = function(t) {
return !p(t) || y(m) || r(t) >= m;
}, s.$observe("min", function(t) {
m = h(t), u.$validate();
});
}
if (b(s.max) || s.ngMax) {
var v;
u.$validators.max = function(t) {
return !p(t) || y(v) || r(t) <= v;
}, s.$observe("max", function(t) {
v = h(t), u.$validate();
});
}
};
}
function ur(t, e, r, i) {
var o = e[0], a = i.$$hasNativeValidators = w(o.validity);
a && i.$parsers.push(function(t) {
var r = e.prop(yr) || {};
return r.badInput && !r.typeMismatch ? n : t;
});
}
function cr(t, e, r, i, o, a) {
if (ur(t, e, r, i), ir(t, e, r, i, o, a), i.$$parserName = "number", i.$parsers.push(function(t) {
return i.$isEmpty(t) ? null : ko.test(t) ? parseFloat(t) : n;
}), i.$formatters.push(function(t) {
if (!i.$isEmpty(t)) {
if (!k(t)) throw ra("numfmt", "Expected `{0}` to be a number", t);
t = "" + t;
}
return t;
}), b(r.min) || r.ngMin) {
var s;
i.$validators.min = function(t) {
return i.$isEmpty(t) || y(s) || t >= s;
}, r.$observe("min", function(t) {
b(t) && !k(t) && (t = parseFloat(t, 10)), s = k(t) && !isNaN(t) ? t : n, i.$validate();
});
}
if (b(r.max) || r.ngMax) {
var u;
i.$validators.max = function(t) {
return i.$isEmpty(t) || y(u) || u >= t;
}, r.$observe("max", function(t) {
b(t) && !k(t) && (t = parseFloat(t, 10)), u = k(t) && !isNaN(t) ? t : n, i.$validate();
});
}
}
function lr(t, e, n, r, i, o) {
ir(t, e, n, r, i, o), nr(r), r.$$parserName = "url", r.$validators.url = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || xo.test(n);
};
}
function fr(t, e, n, r, i, o) {
ir(t, e, n, r, i, o), nr(r), r.$$parserName = "email", r.$validators.email = function(t, e) {
var n = t || e;
return r.$isEmpty(n) || Eo.test(n);
};
}
function pr(t, e, n, r) {
y(n.name) && e.attr("name", u());
var i = function(t) {
e[0].checked && r.$setViewValue(n.value, t && t.type);
};
e.on("click", i), r.$render = function() {
var t = n.value;
e[0].checked = t == r.$viewValue;
}, n.$observe("value", r.$render);
}
function hr(t, e, n, r, i) {
var o;
if (b(r)) {
if (o = t(r), !o.constant) throw ra("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, r);
return o(e);
}
return i;
}
function dr(t, e, n, r, i, o, a, s) {
var u = hr(s, t, "ngTrueValue", n.ngTrueValue, !0), c = hr(s, t, "ngFalseValue", n.ngFalseValue, !1), l = function(t) {
r.$setViewValue(e[0].checked, t && t.type);
};
e.on("click", l), r.$render = function() {
e[0].checked = r.$viewValue;
}, r.$isEmpty = function(t) {
return t === !1;
}, r.$formatters.push(function(t) {
return U(t, u);
}), r.$parsers.push(function(t) {
return t ? u : c;
});
}
function $r(t, e) {
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
var e = [];
return qr(t) ? (o(t, function(t) {
e = e.concat(i(t));
}), e) : E(t) ? t.split(" ") : w(t) ? (o(t, function(t, n) {
t && (e = e.concat(n.split(" ")));
}), e) : t;
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
var n = s.data("$classCounts") || mt(), r = [];
return o(t, function(t) {
(e > 0 || n[t]) && (n[t] = (n[t] || 0) + e, n[t] === +(e > 0) && r.push(t));
}), s.data("$classCounts", n), r.join(" ");
}
function p(t, e) {
var i = r(e, t), o = r(t, e);
i = f(i, 1), o = f(o, -1), i && i.length && n.addClass(s, i), o && o.length && n.removeClass(s, o);
}
function h(t) {
if (e === !0 || a.$index % 2 === e) {
var n = i(t || []);
if (d) {
if (!U(t, d)) {
var r = i(d);
p(r, n);
}
} else c(n);
}
d = L(t);
}
var d;
a.$watch(u[t], h, !0), u.$observe("class", function() {
h(a.$eval(u[t]));
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
function mr(t) {
function e(t, e, u) {
y(e) ? r("$pending", t, u) : i("$pending", t, u), P(e) ? e ? (f(s.$error, t, u), 
l(s.$$success, t, u)) : (l(s.$error, t, u), f(s.$$success, t, u)) : (f(s.$error, t, u), 
f(s.$$success, t, u)), s.$pending ? (o(na, !0), s.$valid = s.$invalid = n, a("", null)) : (o(na, !1), 
s.$valid = vr(s.$error), s.$invalid = !s.$valid, a("", s.$valid));
var c;
c = s.$pending && s.$pending[t] ? n : s.$error[t] ? !1 : s.$$success[t] ? !0 : null, 
a(t, c), s.$$parentForm.$setValidity(t, c, s);
}
function r(t, e, n) {
s[t] || (s[t] = {}), l(s[t], e, n);
}
function i(t, e, r) {
s[t] && f(s[t], e, r), vr(s[t]) && (s[t] = n);
}
function o(t, e) {
e && !c[t] ? (p.addClass(u, t), c[t] = !0) : !e && c[t] && (p.removeClass(u, t), 
c[t] = !1);
}
function a(t, e) {
t = t ? "-" + ct(t, "-") : "", o(Yo + t, e === !0), o(Ko + t, e === !1);
}
var s = t.ctrl, u = t.$element, c = {}, l = t.set, f = t.unset, p = t.$animate;
c[Ko] = !(c[Yo] = u.hasClass(Yo)), s.$setValidity = e;
}
function vr(t) {
if (t) for (var e in t) if (t.hasOwnProperty(e)) return !1;
return !0;
}
var gr = /^\/(.+)\/([a-z]*)$/, yr = "validity", br = function(t) {
return E(t) ? t.toLowerCase() : t;
}, wr = Object.prototype.hasOwnProperty, xr = function(t) {
return E(t) ? t.toUpperCase() : t;
}, Er = function(t) {
return E(t) ? t.replace(/[A-Z]/g, function(t) {
return String.fromCharCode(32 | t.charCodeAt(0));
}) : t;
}, kr = function(t) {
return E(t) ? t.replace(/[a-z]/g, function(t) {
return String.fromCharCode(-33 & t.charCodeAt(0));
}) : t;
};
"i" !== "I".toLowerCase() && (br = Er, xr = kr);
var Sr, Cr, Ar, Or, Mr = [].slice, _r = [].splice, Tr = [].push, jr = Object.prototype.toString, Pr = Object.getPrototypeOf, Nr = r("ng"), Vr = t.angular || (t.angular = {}), Rr = 0;
Sr = e.documentMode, $.$inject = [], m.$inject = [];
var Ir, qr = Array.isArray, Dr = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/, Fr = function(t) {
return E(t) ? t.trim() : t;
}, Lr = function(t) {
return t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
}, Ur = function() {
function t() {
try {
return Function(""), !1;
} catch (t) {
return !0;
}
}
if (!b(Ur.rules)) {
var n = e.querySelector("[ng-csp]") || e.querySelector("[data-ng-csp]");
if (n) {
var r = n.getAttribute("ng-csp") || n.getAttribute("data-ng-csp");
Ur.rules = {
noUnsafeEval: !r || -1 !== r.indexOf("no-unsafe-eval"),
noInlineStyle: !r || -1 !== r.indexOf("no-inline-style")
};
} else Ur.rules = {
noUnsafeEval: t(),
noInlineStyle: !1
};
}
return Ur.rules;
}, Hr = function() {
if (b(Hr.name_)) return Hr.name_;
var t, n, r, i, o = Br.length;
for (n = 0; o > n; ++n) if (r = Br[n], t = e.querySelector("[" + r.replace(":", "\\:") + "jq]")) {
i = t.getAttribute(r + "jq");
break;
}
return Hr.name_ = i;
}, Br = [ "ng-", "data-ng-", "ng:", "x-ng-" ], zr = /[A-Z]/g, Wr = !1, Gr = 1, Jr = 2, Xr = 3, Yr = 8, Kr = 9, Zr = 11, Qr = {
full: "1.4.7",
major: 1,
minor: 4,
dot: 7,
codeName: "dark-luminescence"
};
Ot.expando = "ng339";
var ti = Ot.cache = {}, ei = 1, ni = function(t, e, n) {
t.addEventListener(e, n, !1);
}, ri = function(t, e, n) {
t.removeEventListener(e, n, !1);
};
Ot._data = function(t) {
return this.cache[t[this.expando]] || {};
};
var ii = /([\:\-\_]+(.))/g, oi = /^moz([A-Z])/, ai = {
mouseleave: "mouseout",
mouseenter: "mouseover"
}, si = r("jqLite"), ui = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, ci = /<|&#?\w+;/, li = /<([\w:-]+)/, fi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, pi = {
option: [ 1, '<select multiple="multiple">', "</select>" ],
thead: [ 1, "<table>", "</table>" ],
col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default: [ 0, "", "" ]
};
pi.optgroup = pi.option, pi.tbody = pi.tfoot = pi.colgroup = pi.caption = pi.thead, 
pi.th = pi.td;
var hi = Ot.prototype = {
ready: function(n) {
function r() {
i || (i = !0, n());
}
var i = !1;
"complete" === e.readyState ? setTimeout(r) : (this.on("DOMContentLoaded", r), Ot(t).on("load", r));
},
toString: function() {
var t = [];
return o(this, function(e) {
t.push("" + e);
}), "[" + t.join(", ") + "]";
},
eq: function(t) {
return Cr(t >= 0 ? this[t] : this[this.length + t]);
},
length: 0,
push: Tr,
sort: [].sort,
splice: [].splice
}, di = {};
o("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(t) {
di[br(t)] = t;
});
var $i = {};
o("input,select,option,textarea,button,form,details".split(","), function(t) {
$i[t] = !0;
});
var mi = {
ngMinlength: "minlength",
ngMaxlength: "maxlength",
ngMin: "min",
ngMax: "max",
ngPattern: "pattern"
};
o({
data: Nt,
removeData: jt,
hasData: St
}, function(t, e) {
Ot[e] = t;
}), o({
data: Nt,
inheritedData: Ft,
scope: function(t) {
return Cr.data(t, "$scope") || Ft(t.parentNode || t, [ "$isolateScope", "$scope" ]);
},
isolateScope: function(t) {
return Cr.data(t, "$isolateScope") || Cr.data(t, "$isolateScopeNoTemplate");
},
controller: Dt,
injector: function(t) {
return Ft(t, "$injector");
},
removeAttr: function(t, e) {
t.removeAttribute(e);
},
hasClass: Vt,
css: function(t, e, r) {
return e = xt(e), b(r) ? (t.style[e] = r, n) : t.style[e];
},
attr: function(t, e, r) {
var i = t.nodeType;
if (i !== Xr && i !== Jr && i !== Yr) {
var o = br(e);
if (di[o]) {
if (!b(r)) return t[e] || (t.attributes.getNamedItem(e) || $).specified ? o : n;
r ? (t[e] = !0, t.setAttribute(e, o)) : (t[e] = !1, t.removeAttribute(o));
} else if (b(r)) t.setAttribute(e, r); else if (t.getAttribute) {
var a = t.getAttribute(e, 2);
return null === a ? n : a;
}
}
},
prop: function(t, e, r) {
return b(r) ? (t[e] = r, n) : t[e];
},
text: function() {
function t(t, e) {
if (y(e)) {
var n = t.nodeType;
return n === Gr || n === Xr ? t.textContent : "";
}
t.textContent = e;
}
return t.$dv = "", t;
}(),
val: function(t, e) {
if (y(e)) {
if (t.multiple && "select" === q(t)) {
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
return y(e) ? t.innerHTML : (_t(t, !0), t.innerHTML = e, n);
},
empty: Lt
}, function(t, e) {
Ot.prototype[e] = function(e, n) {
var r, i, o = this.length;
if (t !== Lt && y(2 == t.length && t !== Vt && t !== Dt ? e : n)) {
if (w(e)) {
for (r = 0; o > r; r++) if (t === Nt) t(this[r], e); else for (i in e) t(this[r], i, e[i]);
return this;
}
for (var a = t.$dv, s = y(a) ? Math.min(o, 1) : o, u = 0; s > u; u++) {
var c = t(this[u], e, n);
a = a ? a + c : c;
}
return a;
}
for (r = 0; o > r; r++) t(this[r], e, n);
return this;
};
}), o({
removeData: jt,
on: function Pa(t, e, n, r) {
if (b(r)) throw si("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
if (kt(t)) {
var i = Pt(t, !0), o = i.events, a = i.handle;
a || (a = i.handle = Wt(t, o));
for (var s = e.indexOf(" ") >= 0 ? e.split(" ") : [ e ], u = s.length; u--; ) {
e = s[u];
var c = o[e];
c || (o[e] = [], "mouseenter" === e || "mouseleave" === e ? Pa(t, ai[e], function(t) {
var n = this, r = t.relatedTarget;
(!r || r !== n && !n.contains(r)) && a(t, e);
}) : "$destroy" !== e && ni(t, e, a), c = o[e]), c.push(n);
}
}
},
off: Tt,
one: function(t, e, n) {
t = Cr(t), t.on(e, function r() {
t.off(e, n), t.off(e, r);
}), t.on(e, n);
},
replaceWith: function(t, e) {
var n, r = t.parentNode;
_t(t), o(new Ot(e), function(e) {
n ? r.insertBefore(e, n.nextSibling) : r.replaceChild(e, t), n = e;
});
},
children: function(t) {
var e = [];
return o(t.childNodes, function(t) {
t.nodeType === Gr && e.push(t);
}), e;
},
contents: function(t) {
return t.contentDocument || t.childNodes || [];
},
append: function(t, e) {
var n = t.nodeType;
if (n === Gr || n === Zr) {
e = new Ot(e);
for (var r = 0, i = e.length; i > r; r++) {
var o = e[r];
t.appendChild(o);
}
}
},
prepend: function(t, e) {
if (t.nodeType === Gr) {
var n = t.firstChild;
o(new Ot(e), function(e) {
t.insertBefore(e, n);
});
}
},
wrap: function(t, e) {
e = Cr(e).eq(0).clone()[0];
var n = t.parentNode;
n && n.replaceChild(e, t), e.appendChild(t);
},
remove: Ut,
detach: function(t) {
Ut(t, !0);
},
after: function(t, e) {
var n = t, r = t.parentNode;
e = new Ot(e);
for (var i = 0, o = e.length; o > i; i++) {
var a = e[i];
r.insertBefore(a, n.nextSibling), n = a;
}
},
addClass: It,
removeClass: Rt,
toggleClass: function(t, e, n) {
e && o(e.split(" "), function(e) {
var r = n;
y(r) && (r = !Vt(t, e)), (r ? It : Rt)(t, e);
});
},
parent: function(t) {
var e = t.parentNode;
return e && e.nodeType !== Zr ? e : null;
},
next: function(t) {
return t.nextElementSibling;
},
find: function(t, e) {
return t.getElementsByTagName ? t.getElementsByTagName(e) : [];
},
clone: Mt,
triggerHandler: function(t, e, n) {
var r, i, a, s = e.type || e, u = Pt(t), c = u && u.events, l = c && c[s];
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
stopPropagation: $,
type: s,
target: t
}, e.type && (r = f(r, e)), i = L(l), a = n ? [ r ].concat(n) : [ r ], o(i, function(e) {
r.isImmediatePropagationStopped() || e.apply(t, a);
}));
}
}, function(t, e) {
Ot.prototype[e] = function(e, n, r) {
for (var i, o = 0, a = this.length; a > o; o++) y(i) ? (i = t(this[o], e, n, r), 
b(i) && (i = Cr(i))) : qt(i, t(this[o], e, n, r));
return b(i) ? i : this;
}, Ot.prototype.bind = Ot.prototype.on, Ot.prototype.unbind = Ot.prototype.off;
}), Xt.prototype = {
put: function(t, e) {
this[Jt(t, this.nextUid)] = e;
},
get: function(t) {
return this[Jt(t, this.nextUid)];
},
remove: function(t) {
var e = this[t = Jt(t, this.nextUid)];
return delete this[t], e;
}
};
var vi = [ function() {
this.$get = [ function() {
return Xt;
} ];
} ], gi = /^[^\(]*\(\s*([^\)]*)\)/m, yi = /,/, bi = /^\s*(_?)(\S+?)\1\s*$/, wi = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, xi = r("$injector");
Zt.$$annotate = Kt;
var Ei = r("$animate"), ki = 1, Si = "ng-animate", Ci = function() {
this.$get = [ "$q", "$$rAF", function(t, e) {
function n() {}
return n.all = $, n.chain = $, n.prototype = {
end: $,
cancel: $,
resume: $,
pause: $,
complete: $,
then: function(n, r) {
return t(function(t) {
e(function() {
t();
});
}).then(n, r);
}
}, n;
} ];
}, Ai = function() {
var t = new Xt(), e = [];
this.$get = [ "$$AnimateRunner", "$rootScope", function(n, r) {
function i(t, e, n) {
var r = !1;
return e && (e = E(e) ? e.split(" ") : qr(e) ? e : [], o(e, function(e) {
e && (r = !0, t[e] = n);
})), r;
}
function a() {
o(e, function(e) {
var n = t.get(e);
if (n) {
var r = ne(e.attr("class")), i = "", a = "";
o(n, function(t, e) {
var n = !!r[e];
t !== n && (t ? i += (i.length ? " " : "") + e : a += (a.length ? " " : "") + e);
}), o(e, function(t) {
i && It(t, i), a && Rt(t, a);
}), t.remove(e);
}
}), e.length = 0;
}
function s(n, o, s) {
var u = t.get(n) || {}, c = i(u, o, !0), l = i(u, s, !1);
(c || l) && (t.put(n, u), e.push(n), 1 === e.length && r.$$postDigest(a));
}
return {
enabled: $,
on: $,
off: $,
pin: $,
push: function(t, e, r, i) {
return i && i(), r = r || {}, r.from && t.css(r.from), r.to && t.css(r.to), (r.addClass || r.removeClass) && s(t, r.addClass, r.removeClass), 
new n();
}
};
} ];
}, Oi = [ "$provide", function(t) {
var e = this;
this.$$registeredAnimations = Object.create(null), this.register = function(n, r) {
if (n && "." !== n.charAt(0)) throw Ei("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
var i = n + "-animation";
e.$$registeredAnimations[n.substr(1)] = i, t.factory(i, r);
}, this.classNameFilter = function(t) {
if (1 === arguments.length && (this.$$classNameFilter = t instanceof RegExp ? t : null, 
this.$$classNameFilter)) {
var e = RegExp("(\\s+|\\/)" + Si + "(\\s+|\\/)");
if (e.test("" + this.$$classNameFilter)) throw Ei("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Si);
}
return this.$$classNameFilter;
}, this.$get = [ "$$animateQueue", function(t) {
function e(t, e, n) {
if (n) {
var r = ee(n);
!r || r.parentNode || r.previousElementSibling || (n = null);
}
n ? n.after(t) : e.prepend(t);
}
return {
on: t.on,
off: t.off,
pin: t.pin,
enabled: t.enabled,
cancel: function(t) {
t.end && t.end();
},
enter: function(n, r, i, o) {
return r = r && Cr(r), i = i && Cr(i), r = r || i.parent(), e(n, r, i), t.push(n, "enter", re(o));
},
move: function(n, r, i, o) {
return r = r && Cr(r), i = i && Cr(i), r = r || i.parent(), e(n, r, i), t.push(n, "move", re(o));
},
leave: function(e, n) {
return t.push(e, "leave", re(n), function() {
e.remove();
});
},
addClass: function(e, n, r) {
return r = re(r), r.addClass = te(r.addclass, n), t.push(e, "addClass", r);
},
removeClass: function(e, n, r) {
return r = re(r), r.removeClass = te(r.removeClass, n), t.push(e, "removeClass", r);
},
setClass: function(e, n, r, i) {
return i = re(i), i.addClass = te(i.addClass, n), i.removeClass = te(i.removeClass, r), 
t.push(e, "setClass", i);
},
animate: function(e, n, r, i, o) {
return o = re(o), o.from = o.from ? f(o.from, n) : n, o.to = o.to ? f(o.to, r) : r, 
i = i || "ng-inline-animate", o.tempClasses = te(o.tempClasses, i), t.push(e, "animate", o);
}
};
} ];
} ], Mi = function() {
this.$get = [ "$$rAF", "$q", function(t, e) {
var n = function() {};
return n.prototype = {
done: function(t) {
this.defer && this.defer[t === !0 ? "reject" : "resolve"]();
},
end: function() {
this.done();
},
cancel: function() {
this.done(!0);
},
getPromise: function() {
return this.defer || (this.defer = e.defer()), this.defer.promise;
},
then: function(t, e) {
return this.getPromise().then(t, e);
},
"catch": function(t) {
return this.getPromise().catch(t);
},
"finally": function(t) {
return this.getPromise().finally(t);
}
}, function(e, r) {
function i() {
return t(function() {
o(), a || s.done(), a = !0;
}), s;
}
function o() {
r.addClass && (e.addClass(r.addClass), r.addClass = null), r.removeClass && (e.removeClass(r.removeClass), 
r.removeClass = null), r.to && (e.css(r.to), r.to = null);
}
r.cleanupStyles && (r.from = r.to = null), r.from && (e.css(r.from), r.from = null);
var a, s = new n();
return {
start: i,
end: i
};
};
} ];
}, _i = r("$compile");
ue.$inject = [ "$provide", "$$sanitizeUriProvider" ];
var Ti = /^((?:x|data)[\:\-_])/i, ji = r("$controller"), Pi = /^(\S+)(\s+as\s+(\w+))?$/, Ni = function() {
this.$get = [ "$document", function(t) {
return function(e) {
return e ? !e.nodeType && e instanceof Cr && (e = e[0]) : e = t[0].body, e.offsetWidth + 1;
};
} ];
}, Vi = "application/json", Ri = {
"Content-Type": Vi + ";charset=utf-8"
}, Ii = /^\[|^\{(?!\{)/, qi = {
"[": /]$/,
"{": /}$/
}, Di = /^\)\]\}',?\n/, Fi = r("$http"), Li = function(t) {
return function() {
throw Fi("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", t);
};
}, Ui = Vr.$interpolateMinErr = r("$interpolate");
Ui.throwNoconcat = function(t) {
throw Ui("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", t);
}, Ui.interr = function(t, e) {
return Ui("interr", "Can't interpolate: {0}\n{1}", t, "" + e);
};
var Hi = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Bi = {
http: 80,
https: 443,
ftp: 21
}, zi = r("$location"), Wi = {
$$html5: !1,
$$replace: !1,
absUrl: Ue("$$absUrl"),
url: function(t) {
if (y(t)) return this.$$url;
var e = Hi.exec(t);
return (e[1] || "" === t) && this.path(decodeURIComponent(e[1])), (e[2] || e[1] || "" === t) && this.search(e[3] || ""), 
this.hash(e[5] || ""), this;
},
protocol: Ue("$$protocol"),
host: Ue("$$host"),
port: Ue("$$port"),
path: He("$$path", function(t) {
return t = null !== t ? "" + t : "", "/" == t.charAt(0) ? t : "/" + t;
}),
search: function(t, e) {
switch (arguments.length) {
case 0:
return this.$$search;

case 1:
if (E(t) || k(t)) t = "" + t, this.$$search = tt(t); else {
if (!w(t)) throw zi("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
t = F(t, {}), o(t, function(e, n) {
null == e && delete t[n];
}), this.$$search = t;
}
break;

default:
y(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e;
}
return this.$$compose(), this;
},
hash: He("$$hash", function(t) {
return null !== t ? "" + t : "";
}),
replace: function() {
return this.$$replace = !0, this;
}
};
o([ Le, Fe, De ], function(t) {
t.prototype = Object.create(Wi), t.prototype.state = function(e) {
if (!arguments.length) return this.$$state;
if (t !== De || !this.$$html5) throw zi("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
return this.$$state = y(e) ? null : e, this;
};
});
var Gi = r("$parse"), Ji = Function.prototype.call, Xi = Function.prototype.apply, Yi = Function.prototype.bind, Ki = mt();
o("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function(t) {
Ki[t] = !0;
});
var Zi = {
n: "\n",
f: "\f",
r: "\r",
t: "	",
v: "",
"'": "'",
'"': '"'
}, Qi = function(t) {
this.options = t;
};
Qi.prototype = {
constructor: Qi,
lex: function(t) {
for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length; ) {
var e = this.text.charAt(this.index);
if ('"' === e || "'" === e) this.readString(e); else if (this.isNumber(e) || "." === e && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdent(e)) this.readIdent(); else if (this.is(e, "(){}[].,;:?")) this.tokens.push({
index: this.index,
text: e
}), this.index++; else if (this.isWhitespace(e)) this.index++; else {
var n = e + this.peek(), r = n + this.peek(2), i = Ki[e], o = Ki[n], a = Ki[r];
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
var r = b(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" : " " + n;
throw Gi("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", t, r, this.text);
},
readNumber: function() {
for (var t = "", e = this.index; this.index < this.text.length; ) {
var n = br(this.text.charAt(this.index));
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
var u = Zi[a];
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
var to = function(t, e) {
this.lexer = t, this.options = e;
};
to.Program = "Program", to.ExpressionStatement = "ExpressionStatement", to.AssignmentExpression = "AssignmentExpression", 
to.ConditionalExpression = "ConditionalExpression", to.LogicalExpression = "LogicalExpression", 
to.BinaryExpression = "BinaryExpression", to.UnaryExpression = "UnaryExpression", 
to.CallExpression = "CallExpression", to.MemberExpression = "MemberExpression", 
to.Identifier = "Identifier", to.Literal = "Literal", to.ArrayExpression = "ArrayExpression", 
to.Property = "Property", to.ObjectExpression = "ObjectExpression", to.ThisExpression = "ThisExpression", 
to.NGValueParameter = "NGValueParameter", to.prototype = {
ast: function(t) {
this.text = t, this.tokens = this.lexer.lex(t);
var e = this.program();
return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), 
e;
},
program: function() {
for (var t = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && t.push(this.expressionStatement()), 
!this.expect(";")) return {
type: to.Program,
body: t
};
},
expressionStatement: function() {
return {
type: to.ExpressionStatement,
expression: this.filterChain()
};
},
filterChain: function() {
for (var t, e = this.expression(); t = this.expect("|"); ) e = this.filter(e);
return e;
},
expression: function() {
return this.assignment();
},
assignment: function() {
var t = this.ternary();
return this.expect("=") && (t = {
type: to.AssignmentExpression,
left: t,
right: this.assignment(),
operator: "="
}), t;
},
ternary: function() {
var t, e, n = this.logicalOR();
return this.expect("?") && (t = this.expression(), this.consume(":")) ? (e = this.expression(), 
{
type: to.ConditionalExpression,
test: n,
alternate: t,
consequent: e
}) : n;
},
logicalOR: function() {
for (var t = this.logicalAND(); this.expect("||"); ) t = {
type: to.LogicalExpression,
operator: "||",
left: t,
right: this.logicalAND()
};
return t;
},
logicalAND: function() {
for (var t = this.equality(); this.expect("&&"); ) t = {
type: to.LogicalExpression,
operator: "&&",
left: t,
right: this.equality()
};
return t;
},
equality: function() {
for (var t, e = this.relational(); t = this.expect("==", "!=", "===", "!=="); ) e = {
type: to.BinaryExpression,
operator: t.text,
left: e,
right: this.relational()
};
return e;
},
relational: function() {
for (var t, e = this.additive(); t = this.expect("<", ">", "<=", ">="); ) e = {
type: to.BinaryExpression,
operator: t.text,
left: e,
right: this.additive()
};
return e;
},
additive: function() {
for (var t, e = this.multiplicative(); t = this.expect("+", "-"); ) e = {
type: to.BinaryExpression,
operator: t.text,
left: e,
right: this.multiplicative()
};
return e;
},
multiplicative: function() {
for (var t, e = this.unary(); t = this.expect("*", "/", "%"); ) e = {
type: to.BinaryExpression,
operator: t.text,
left: e,
right: this.unary()
};
return e;
},
unary: function() {
var t;
return (t = this.expect("+", "-", "!")) ? {
type: to.UnaryExpression,
operator: t.text,
prefix: !0,
argument: this.unary()
} : this.primary();
},
primary: function() {
var t;
this.expect("(") ? (t = this.filterChain(), this.consume(")")) : this.expect("[") ? t = this.arrayDeclaration() : this.expect("{") ? t = this.object() : this.constants.hasOwnProperty(this.peek().text) ? t = F(this.constants[this.consume().text]) : this.peek().identifier ? t = this.identifier() : this.peek().constant ? t = this.constant() : this.throwError("not a primary expression", this.peek());
for (var e; e = this.expect("(", "[", "."); ) "(" === e.text ? (t = {
type: to.CallExpression,
callee: t,
arguments: this.parseArguments()
}, this.consume(")")) : "[" === e.text ? (t = {
type: to.MemberExpression,
object: t,
property: this.expression(),
computed: !0
}, this.consume("]")) : "." === e.text ? t = {
type: to.MemberExpression,
object: t,
property: this.identifier(),
computed: !1
} : this.throwError("IMPOSSIBLE");
return t;
},
filter: function(t) {
for (var e = [ t ], n = {
type: to.CallExpression,
callee: this.identifier(),
arguments: e,
filter: !0
}; this.expect(":"); ) e.push(this.expression());
return n;
},
parseArguments: function() {
var t = [];
if (")" !== this.peekToken().text) do t.push(this.expression()); while (this.expect(","));
return t;
},
identifier: function() {
var t = this.consume();
return t.identifier || this.throwError("is not a valid identifier", t), {
type: to.Identifier,
name: t.text
};
},
constant: function() {
return {
type: to.Literal,
value: this.consume().value
};
},
arrayDeclaration: function() {
var t = [];
if ("]" !== this.peekToken().text) do {
if (this.peek("]")) break;
t.push(this.expression());
} while (this.expect(","));
return this.consume("]"), {
type: to.ArrayExpression,
elements: t
};
},
object: function() {
var t, e = [];
if ("}" !== this.peekToken().text) do {
if (this.peek("}")) break;
t = {
type: to.Property,
kind: "init"
}, this.peek().constant ? t.key = this.constant() : this.peek().identifier ? t.key = this.identifier() : this.throwError("invalid key", this.peek()), 
this.consume(":"), t.value = this.expression(), e.push(t);
} while (this.expect(","));
return this.consume("}"), {
type: to.ObjectExpression,
properties: e
};
},
throwError: function(t, e) {
throw Gi("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", e.text, t, e.index + 1, this.text, this.text.substring(e.index));
},
consume: function(t) {
if (0 === this.tokens.length) throw Gi("ueoe", "Unexpected end of expression: {0}", this.text);
var e = this.expect(t);
return e || this.throwError("is unexpected, expecting [" + t + "]", this.peek()), 
e;
},
peekToken: function() {
if (0 === this.tokens.length) throw Gi("ueoe", "Unexpected end of expression: {0}", this.text);
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
constants: {
"true": {
type: to.Literal,
value: !0
},
"false": {
type: to.Literal,
value: !1
},
"null": {
type: to.Literal,
value: null
},
undefined: {
type: to.Literal,
value: n
},
"this": {
type: to.ThisExpression
}
}
}, sn.prototype = {
compile: function(t, e) {
var r = this, i = this.astBuilder.ast(t);
this.state = {
nextId: 0,
filters: {},
expensiveChecks: e,
fn: {
vars: [],
body: [],
own: {}
},
assign: {
vars: [],
body: [],
own: {}
},
inputs: []
}, tn(i, r.$filter);
var a, s = "";
if (this.stage = "assign", a = rn(i)) {
this.state.computing = "assign";
var u = this.nextId();
this.recurse(a, u), this.return_(u), s = "fn.assign=" + this.generateFunction("assign", "s,v,l");
}
var c = en(i.body);
r.stage = "inputs", o(c, function(t, e) {
var n = "fn" + e;
r.state[n] = {
vars: [],
body: [],
own: {}
}, r.state.computing = n;
var i = r.nextId();
r.recurse(t, i), r.return_(i), r.state.inputs.push(n), t.watchId = e;
}), this.state.computing = "fn", this.stage = "main", this.recurse(i);
var l = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + s + this.watchFns() + "return fn;", f = Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", l)(this.$filter, We, Je, Xe, Ge, Ye, Ke, Ze, t);
return this.state = this.stage = n, f.literal = on(i), f.constant = an(i), f;
},
USE: "use",
STRICT: "strict",
watchFns: function() {
var t = [], e = this.state.inputs, n = this;
return o(e, function(e) {
t.push("var " + e + "=" + n.generateFunction(e, "s"));
}), e.length && t.push("fn.inputs=[" + e.join(",") + "];"), t.join("");
},
generateFunction: function(t, e) {
return "function(" + e + "){" + this.varsPrefix(t) + this.body(t) + "};";
},
filterPrefix: function() {
var t = [], e = this;
return o(this.state.filters, function(n, r) {
t.push(n + "=$filter(" + e.escape(r) + ")");
}), t.length ? "var " + t.join(",") + ";" : "";
},
varsPrefix: function(t) {
return this.state[t].vars.length ? "var " + this.state[t].vars.join(",") + ";" : "";
},
body: function(t) {
return this.state[t].body.join("");
},
recurse: function(t, e, r, i, a, s) {
var u, c, l, f, p = this;
if (i = i || $, !s && b(t.watchId)) return e = e || this.nextId(), this.if_("i", this.lazyAssign(e, this.computedMember("i", t.watchId)), this.lazyRecurse(t, e, r, i, a, !0)), 
n;
switch (t.type) {
case to.Program:
o(t.body, function(e, r) {
p.recurse(e.expression, n, n, function(t) {
c = t;
}), r !== t.body.length - 1 ? p.current().body.push(c, ";") : p.return_(c);
});
break;

case to.Literal:
f = this.escape(t.value), this.assign(e, f), i(f);
break;

case to.UnaryExpression:
this.recurse(t.argument, n, n, function(t) {
c = t;
}), f = t.operator + "(" + this.ifDefined(c, 0) + ")", this.assign(e, f), i(f);
break;

case to.BinaryExpression:
this.recurse(t.left, n, n, function(t) {
u = t;
}), this.recurse(t.right, n, n, function(t) {
c = t;
}), f = "+" === t.operator ? this.plus(u, c) : "-" === t.operator ? this.ifDefined(u, 0) + t.operator + this.ifDefined(c, 0) : "(" + u + ")" + t.operator + "(" + c + ")", 
this.assign(e, f), i(f);
break;

case to.LogicalExpression:
e = e || this.nextId(), p.recurse(t.left, e), p.if_("&&" === t.operator ? e : p.not(e), p.lazyRecurse(t.right, e)), 
i(e);
break;

case to.ConditionalExpression:
e = e || this.nextId(), p.recurse(t.test, e), p.if_(e, p.lazyRecurse(t.alternate, e), p.lazyRecurse(t.consequent, e)), 
i(e);
break;

case to.Identifier:
e = e || this.nextId(), r && (r.context = "inputs" === p.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", t.name) + "?l:s"), 
r.computed = !1, r.name = t.name), We(t.name), p.if_("inputs" === p.stage || p.not(p.getHasOwnProperty("l", t.name)), function() {
p.if_("inputs" === p.stage || "s", function() {
a && 1 !== a && p.if_(p.not(p.nonComputedMember("s", t.name)), p.lazyAssign(p.nonComputedMember("s", t.name), "{}")), 
p.assign(e, p.nonComputedMember("s", t.name));
});
}, e && p.lazyAssign(e, p.nonComputedMember("l", t.name))), (p.state.expensiveChecks || cn(t.name)) && p.addEnsureSafeObject(e), 
i(e);
break;

case to.MemberExpression:
u = r && (r.context = this.nextId()) || this.nextId(), e = e || this.nextId(), p.recurse(t.object, u, n, function() {
p.if_(p.notNull(u), function() {
t.computed ? (c = p.nextId(), p.recurse(t.property, c), p.getStringValue(c), p.addEnsureSafeMemberName(c), 
a && 1 !== a && p.if_(p.not(p.computedMember(u, c)), p.lazyAssign(p.computedMember(u, c), "{}")), 
f = p.ensureSafeObject(p.computedMember(u, c)), p.assign(e, f), r && (r.computed = !0, 
r.name = c)) : (We(t.property.name), a && 1 !== a && p.if_(p.not(p.nonComputedMember(u, t.property.name)), p.lazyAssign(p.nonComputedMember(u, t.property.name), "{}")), 
f = p.nonComputedMember(u, t.property.name), (p.state.expensiveChecks || cn(t.property.name)) && (f = p.ensureSafeObject(f)), 
p.assign(e, f), r && (r.computed = !1, r.name = t.property.name));
}, function() {
p.assign(e, "undefined");
}), i(e);
}, !!a);
break;

case to.CallExpression:
e = e || this.nextId(), t.filter ? (c = p.filter(t.callee.name), l = [], o(t.arguments, function(t) {
var e = p.nextId();
p.recurse(t, e), l.push(e);
}), f = c + "(" + l.join(",") + ")", p.assign(e, f), i(e)) : (c = p.nextId(), u = {}, 
l = [], p.recurse(t.callee, c, u, function() {
p.if_(p.notNull(c), function() {
p.addEnsureSafeFunction(c), o(t.arguments, function(t) {
p.recurse(t, p.nextId(), n, function(t) {
l.push(p.ensureSafeObject(t));
});
}), u.name ? (p.state.expensiveChecks || p.addEnsureSafeObject(u.context), f = p.member(u.context, u.name, u.computed) + "(" + l.join(",") + ")") : f = c + "(" + l.join(",") + ")", 
f = p.ensureSafeObject(f), p.assign(e, f);
}, function() {
p.assign(e, "undefined");
}), i(e);
}));
break;

case to.AssignmentExpression:
if (c = this.nextId(), u = {}, !nn(t.left)) throw Gi("lval", "Trying to assing a value to a non l-value");
this.recurse(t.left, n, u, function() {
p.if_(p.notNull(u.context), function() {
p.recurse(t.right, c), p.addEnsureSafeObject(p.member(u.context, u.name, u.computed)), 
p.addEnsureSafeAssignContext(u.context), f = p.member(u.context, u.name, u.computed) + t.operator + c, 
p.assign(e, f), i(e || f);
});
}, 1);
break;

case to.ArrayExpression:
l = [], o(t.elements, function(t) {
p.recurse(t, p.nextId(), n, function(t) {
l.push(t);
});
}), f = "[" + l.join(",") + "]", this.assign(e, f), i(f);
break;

case to.ObjectExpression:
l = [], o(t.properties, function(t) {
p.recurse(t.value, p.nextId(), n, function(e) {
l.push(p.escape(t.key.type === to.Identifier ? t.key.name : "" + t.key.value) + ":" + e);
});
}), f = "{" + l.join(",") + "}", this.assign(e, f), i(f);
break;

case to.ThisExpression:
this.assign(e, "s"), i("s");
break;

case to.NGValueParameter:
this.assign(e, "v"), i("v");
}
},
getHasOwnProperty: function(t, e) {
var n = t + "." + e, r = this.current().own;
return r.hasOwnProperty(n) || (r[n] = this.nextId(!1, t + "&&(" + this.escape(e) + " in " + t + ")")), 
r[n];
},
assign: function(t, e) {
return t ? (this.current().body.push(t, "=", e, ";"), t) : n;
},
filter: function(t) {
return this.state.filters.hasOwnProperty(t) || (this.state.filters[t] = this.nextId(!0)), 
this.state.filters[t];
},
ifDefined: function(t, e) {
return "ifDefined(" + t + "," + this.escape(e) + ")";
},
plus: function(t, e) {
return "plus(" + t + "," + e + ")";
},
return_: function(t) {
this.current().body.push("return ", t, ";");
},
if_: function(t, e, n) {
if (t === !0) e(); else {
var r = this.current().body;
r.push("if(", t, "){"), e(), r.push("}"), n && (r.push("else{"), n(), r.push("}"));
}
},
not: function(t) {
return "!(" + t + ")";
},
notNull: function(t) {
return t + "!=null";
},
nonComputedMember: function(t, e) {
return t + "." + e;
},
computedMember: function(t, e) {
return t + "[" + e + "]";
},
member: function(t, e, n) {
return n ? this.computedMember(t, e) : this.nonComputedMember(t, e);
},
addEnsureSafeObject: function(t) {
this.current().body.push(this.ensureSafeObject(t), ";");
},
addEnsureSafeMemberName: function(t) {
this.current().body.push(this.ensureSafeMemberName(t), ";");
},
addEnsureSafeFunction: function(t) {
this.current().body.push(this.ensureSafeFunction(t), ";");
},
addEnsureSafeAssignContext: function(t) {
this.current().body.push(this.ensureSafeAssignContext(t), ";");
},
ensureSafeObject: function(t) {
return "ensureSafeObject(" + t + ",text)";
},
ensureSafeMemberName: function(t) {
return "ensureSafeMemberName(" + t + ",text)";
},
ensureSafeFunction: function(t) {
return "ensureSafeFunction(" + t + ",text)";
},
getStringValue: function(t) {
this.assign(t, "getStringValue(" + t + ",text)");
},
ensureSafeAssignContext: function(t) {
return "ensureSafeAssignContext(" + t + ",text)";
},
lazyRecurse: function(t, e, n, r, i, o) {
var a = this;
return function() {
a.recurse(t, e, n, r, i, o);
};
},
lazyAssign: function(t, e) {
var n = this;
return function() {
n.assign(t, e);
};
},
stringEscapeRegex: /[^ a-zA-Z0-9]/g,
stringEscapeFn: function(t) {
return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
},
escape: function(t) {
if (E(t)) return "'" + t.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
if (k(t)) return "" + t;
if (t === !0) return "true";
if (t === !1) return "false";
if (null === t) return "null";
if (n === t) return "undefined";
throw Gi("esc", "IMPOSSIBLE");
},
nextId: function(t, e) {
var n = "v" + this.state.nextId++;
return t || this.current().vars.push(n + (e ? "=" + e : "")), n;
},
current: function() {
return this.state[this.state.computing];
}
}, un.prototype = {
compile: function(t, e) {
var n = this, r = this.astBuilder.ast(t);
this.expression = t, this.expensiveChecks = e, tn(r, n.$filter);
var i, a;
(i = rn(r)) && (a = this.recurse(i));
var s, u = en(r.body);
u && (s = [], o(u, function(t, e) {
var r = n.recurse(t);
t.input = r, s.push(r), t.watchId = e;
}));
var c = [];
o(r.body, function(t) {
c.push(n.recurse(t.expression));
});
var l = 0 === r.body.length ? function() {} : 1 === r.body.length ? c[0] : function(t, e) {
var n;
return o(c, function(r) {
n = r(t, e);
}), n;
};
return a && (l.assign = function(t, e, n) {
return a(t, n, e);
}), s && (l.inputs = s), l.literal = on(r), l.constant = an(r), l;
},
recurse: function(t, e, r) {
var i, a, s, u = this;
if (t.input) return this.inputs(t.input, t.watchId);
switch (t.type) {
case to.Literal:
return this.value(t.value, e);

case to.UnaryExpression:
return a = this.recurse(t.argument), this["unary" + t.operator](a, e);

case to.BinaryExpression:
return i = this.recurse(t.left), a = this.recurse(t.right), this["binary" + t.operator](i, a, e);

case to.LogicalExpression:
return i = this.recurse(t.left), a = this.recurse(t.right), this["binary" + t.operator](i, a, e);

case to.ConditionalExpression:
return this["ternary?:"](this.recurse(t.test), this.recurse(t.alternate), this.recurse(t.consequent), e);

case to.Identifier:
return We(t.name, u.expression), u.identifier(t.name, u.expensiveChecks || cn(t.name), e, r, u.expression);

case to.MemberExpression:
return i = this.recurse(t.object, !1, !!r), t.computed || (We(t.property.name, u.expression), 
a = t.property.name), t.computed && (a = this.recurse(t.property)), t.computed ? this.computedMember(i, a, e, r, u.expression) : this.nonComputedMember(i, a, u.expensiveChecks, e, r, u.expression);

case to.CallExpression:
return s = [], o(t.arguments, function(t) {
s.push(u.recurse(t));
}), t.filter && (a = this.$filter(t.callee.name)), t.filter || (a = this.recurse(t.callee, !0)), 
t.filter ? function(t, r, i, o) {
for (var u = [], c = 0; c < s.length; ++c) u.push(s[c](t, r, i, o));
var l = a.apply(n, u, o);
return e ? {
context: n,
name: n,
value: l
} : l;
} : function(t, n, r, i) {
var o, c = a(t, n, r, i);
if (null != c.value) {
Je(c.context, u.expression), Xe(c.value, u.expression);
for (var l = [], f = 0; f < s.length; ++f) l.push(Je(s[f](t, n, r, i), u.expression));
o = Je(c.value.apply(c.context, l), u.expression);
}
return e ? {
value: o
} : o;
};

case to.AssignmentExpression:
return i = this.recurse(t.left, !0, 1), a = this.recurse(t.right), function(t, n, r, o) {
var s = i(t, n, r, o), c = a(t, n, r, o);
return Je(s.value, u.expression), Ye(s.context), s.context[s.name] = c, e ? {
value: c
} : c;
};

case to.ArrayExpression:
return s = [], o(t.elements, function(t) {
s.push(u.recurse(t));
}), function(t, n, r, i) {
for (var o = [], a = 0; a < s.length; ++a) o.push(s[a](t, n, r, i));
return e ? {
value: o
} : o;
};

case to.ObjectExpression:
return s = [], o(t.properties, function(t) {
s.push({
key: t.key.type === to.Identifier ? t.key.name : "" + t.key.value,
value: u.recurse(t.value)
});
}), function(t, n, r, i) {
for (var o = {}, a = 0; a < s.length; ++a) o[s[a].key] = s[a].value(t, n, r, i);
return e ? {
value: o
} : o;
};

case to.ThisExpression:
return function(t) {
return e ? {
value: t
} : t;
};

case to.NGValueParameter:
return function(t, n, r) {
return e ? {
value: r
} : r;
};
}
},
"unary+": function(t, e) {
return function(n, r, i, o) {
var a = t(n, r, i, o);
return a = b(a) ? +a : 0, e ? {
value: a
} : a;
};
},
"unary-": function(t, e) {
return function(n, r, i, o) {
var a = t(n, r, i, o);
return a = b(a) ? -a : 0, e ? {
value: a
} : a;
};
},
"unary!": function(t, e) {
return function(n, r, i, o) {
var a = !t(n, r, i, o);
return e ? {
value: a
} : a;
};
},
"binary+": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a), u = e(r, i, o, a), c = Ze(s, u);
return n ? {
value: c
} : c;
};
},
"binary-": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a), u = e(r, i, o, a), c = (b(s) ? s : 0) - (b(u) ? u : 0);
return n ? {
value: c
} : c;
};
},
"binary*": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) * e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary/": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) / e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary%": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) % e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary===": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) === e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary!==": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) !== e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary==": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) == e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary!=": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) != e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary<": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) < e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary>": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) > e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary<=": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) <= e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary>=": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) >= e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary&&": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) && e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"binary||": function(t, e, n) {
return function(r, i, o, a) {
var s = t(r, i, o, a) || e(r, i, o, a);
return n ? {
value: s
} : s;
};
},
"ternary?:": function(t, e, n, r) {
return function(i, o, a, s) {
var u = t(i, o, a, s) ? e(i, o, a, s) : n(i, o, a, s);
return r ? {
value: u
} : u;
};
},
value: function(t, e) {
return function() {
return e ? {
context: n,
name: n,
value: t
} : t;
};
},
identifier: function(t, e, r, i, o) {
return function(a, s) {
var u = s && t in s ? s : a;
i && 1 !== i && u && !u[t] && (u[t] = {});
var c = u ? u[t] : n;
return e && Je(c, o), r ? {
context: u,
name: t,
value: c
} : c;
};
},
computedMember: function(t, e, n, r, i) {
return function(o, a, s, u) {
var c, l, f = t(o, a, s, u);
return null != f && (c = e(o, a, s, u), c = Ge(c), We(c, i), r && 1 !== r && f && !f[c] && (f[c] = {}), 
l = f[c], Je(l, i)), n ? {
context: f,
name: c,
value: l
} : l;
};
},
nonComputedMember: function(t, e, r, i, o, a) {
return function(s, u, c, l) {
var f = t(s, u, c, l);
o && 1 !== o && f && !f[e] && (f[e] = {});
var p = null != f ? f[e] : n;
return (r || cn(e)) && Je(p, a), i ? {
context: f,
name: e,
value: p
} : p;
};
},
inputs: function(t, e) {
return function(n, r, i, o) {
return o ? o[e] : t(n, r, i);
};
}
};
var eo = function(t, e, n) {
this.lexer = t, this.$filter = e, this.options = n, this.ast = new to(this.lexer), 
this.astCompiler = n.csp ? new un(this.ast, e) : new sn(this.ast, e);
};
eo.prototype = {
constructor: eo,
parse: function(t) {
return this.astCompiler.compile(t, this.options.expensiveChecks);
}
};
var no = (mt(), mt(), Object.prototype.valueOf), ro = r("$sce"), io = {
HTML: "html",
CSS: "css",
URL: "url",
RESOURCE_URL: "resourceUrl",
JS: "js"
}, _i = r("$compile"), oo = e.createElement("a"), ao = Cn(t.location.href);
Mn.$inject = [ "$document" ], Tn.$inject = [ "$provide" ], Rn.$inject = [ "$locale" ], 
In.$inject = [ "$locale" ];
var so = ".", uo = {
yyyy: Fn("FullYear", 4),
yy: Fn("FullYear", 2, 0, !0),
y: Fn("FullYear", 1),
MMMM: Ln("Month"),
MMM: Ln("Month", !0),
MM: Fn("Month", 2, 1),
M: Fn("Month", 1, 1),
dd: Fn("Date", 2),
d: Fn("Date", 1),
HH: Fn("Hours", 2),
H: Fn("Hours", 1),
hh: Fn("Hours", 2, -12),
h: Fn("Hours", 1, -12),
mm: Fn("Minutes", 2),
m: Fn("Minutes", 1),
ss: Fn("Seconds", 2),
s: Fn("Seconds", 1),
sss: Fn("Milliseconds", 3),
EEEE: Ln("Day"),
EEE: Ln("Day", !0),
a: Wn,
Z: Un,
ww: zn(2),
w: zn(1),
G: Gn,
GG: Gn,
GGG: Gn,
GGGG: Jn
}, co = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, lo = /^\-?\d+$/;
Xn.$inject = [ "$locale" ];
var fo = v(br), po = v(xr);
Zn.$inject = [ "$parse" ];
var ho = v({
restrict: "E",
compile: function(t, e) {
return e.href || e.xlinkHref ? n : function(t, e) {
if ("a" === e[0].nodeName.toLowerCase()) {
var n = "[object SVGAnimatedString]" === jr.call(e.prop("href")) ? "xlink:href" : "href";
e.on("click", function(t) {
e.attr(n) || t.preventDefault();
});
}
};
}
}), $o = {};
o(di, function(t, e) {
function n(t, n, i) {
t.$watch(i[r], function(t) {
i.$set(e, !!t);
});
}
if ("multiple" != t) {
var r = ce("ng-" + e), i = n;
"checked" === t && (i = function(t, e, i) {
i.ngModel !== i[r] && n(t, e, i);
}), $o[r] = function() {
return {
restrict: "A",
priority: 100,
link: i
};
};
}
}), o(mi, function(t, e) {
$o[e] = function() {
return {
priority: 100,
link: function(t, r, i) {
if ("ngPattern" === e && "/" == i.ngPattern.charAt(0)) {
var o = i.ngPattern.match(gr);
if (o) return i.$set("ngPattern", RegExp(o[1], o[2])), n;
}
t.$watch(i[e], function(t) {
i.$set(e, t);
});
}
};
};
}), o([ "src", "srcset", "href" ], function(t) {
var e = ce("ng-" + t);
$o[e] = function() {
return {
priority: 99,
link: function(r, i, o) {
var a = t, s = t;
"href" === t && "[object SVGAnimatedString]" === jr.call(i.prop("href")) && (s = "xlinkHref", 
o.$attr[s] = "xlink:href", a = null), o.$observe(e, function(e) {
return e ? (o.$set(s, e), Sr && a && i.prop(a, o[s]), n) : ("href" === t && o.$set(s, null), 
n);
});
}
};
};
});
var mo = {
$addControl: $,
$$renameControl: tr,
$removeControl: $,
$setValidity: $,
$setDirty: $,
$setPristine: $,
$setSubmitted: $
}, vo = "ng-submitted";
er.$inject = [ "$element", "$attrs", "$scope", "$animate", "$interpolate" ];
var go = function(t) {
return [ "$timeout", "$parse", function(e, r) {
function i(t) {
return "" === t ? r('this[""]').assign : r(t).assign || $;
}
var o = {
name: "form",
restrict: t ? "EAC" : "E",
require: [ "form", "^^?form" ],
controller: er,
compile: function(r, o) {
r.addClass(Zo).addClass(Yo);
var a = o.name ? "name" : t && o.ngForm ? "ngForm" : !1;
return {
pre: function(t, r, o, s) {
var u = s[0];
if (!("action" in o)) {
var c = function(e) {
t.$apply(function() {
u.$commitViewValue(), u.$setSubmitted();
}), e.preventDefault();
};
ni(r[0], "submit", c), r.on("$destroy", function() {
e(function() {
ri(r[0], "submit", c);
}, 0, !1);
});
}
var l = s[1] || u.$$parentForm;
l.$addControl(u);
var p = a ? i(u.$name) : $;
a && (p(t, u), o.$observe(a, function(e) {
u.$name !== e && (p(t, n), u.$$parentForm.$$renameControl(u, e), (p = i(u.$name))(t, u));
})), r.on("$destroy", function() {
u.$$parentForm.$removeControl(u), p(t, n), f(u, mo);
});
}
};
}
};
return o;
} ];
}, yo = go(), bo = go(!0), wo = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/, xo = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Eo = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, ko = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, So = /^(\d{4})-(\d{2})-(\d{2})$/, Co = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, Ao = /^(\d{4})-W(\d\d)$/, Oo = /^(\d{4})-(\d\d)$/, Mo = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, _o = {
text: rr,
date: sr("date", So, ar(So, [ "yyyy", "MM", "dd" ]), "yyyy-MM-dd"),
"datetime-local": sr("datetimelocal", Co, ar(Co, [ "yyyy", "MM", "dd", "HH", "mm", "ss", "sss" ]), "yyyy-MM-ddTHH:mm:ss.sss"),
time: sr("time", Mo, ar(Mo, [ "HH", "mm", "ss", "sss" ]), "HH:mm:ss.sss"),
week: sr("week", Ao, or, "yyyy-Www"),
month: sr("month", Oo, ar(Oo, [ "yyyy", "MM" ]), "yyyy-MM"),
number: cr,
url: lr,
email: fr,
radio: pr,
checkbox: dr,
hidden: $,
button: $,
submit: $,
reset: $,
file: $
}, To = [ "$browser", "$sniffer", "$filter", "$parse", function(t, e, n, r) {
return {
restrict: "E",
require: [ "?ngModel" ],
link: {
pre: function(i, o, a, s) {
s[0] && (_o[br(a.type)] || _o.text)(i, o, a, s[0], e, t, n, r);
}
}
};
} ], jo = /^(true|false|\d+)$/, Po = function() {
return {
restrict: "A",
priority: 100,
compile: function(t, e) {
return jo.test(e.ngValue) ? function(t, e, n) {
n.$set("value", t.$eval(n.ngValue));
} : function(t, e, n) {
t.$watch(n.ngValue, function(t) {
n.$set("value", t);
});
};
}
};
}, No = [ "$compile", function(t) {
return {
restrict: "AC",
compile: function(e) {
return t.$$addBindingClass(e), function(e, n, r) {
t.$$addBindingInfo(n, r.ngBind), n = n[0], e.$watch(r.ngBind, function(t) {
n.textContent = y(t) ? "" : t;
});
};
}
};
} ], Vo = [ "$interpolate", "$compile", function(t, e) {
return {
compile: function(n) {
return e.$$addBindingClass(n), function(n, r, i) {
var o = t(r.attr(i.$attr.ngBindTemplate));
e.$$addBindingInfo(r, o.expressions), r = r[0], i.$observe("ngBindTemplate", function(t) {
r.textContent = y(t) ? "" : t;
});
};
}
};
} ], Ro = [ "$sce", "$parse", "$compile", function(t, e, n) {
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
} ], Io = v({
restrict: "A",
require: "ngModel",
link: function(t, e, n, r) {
r.$viewChangeListeners.push(function() {
t.$eval(n.ngChange);
});
}
}), qo = $r("", !0), Do = $r("Odd", 0), Fo = $r("Even", 1), Lo = Qn({
compile: function(t, e) {
e.$set("ngCloak", n), t.removeClass("ng-cloak");
}
}), Uo = [ function() {
return {
restrict: "A",
scope: !0,
controller: "@",
priority: 500
};
} ], Ho = {}, Bo = {
blur: !0,
focus: !0
};
o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(t) {
var e = ce("ng-" + t);
Ho[e] = [ "$parse", "$rootScope", function(n, r) {
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
Bo[t] && r.$$phase ? e.$evalAsync(i) : e.$apply(i);
});
};
}
};
} ];
});
var zo = [ "$animate", function(t) {
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
}) : (c && (c.remove(), c = null), u && (u.$destroy(), u = null), s && (c = $t(s.clone), 
t.leave(c).then(function() {
c = null;
}), s = null));
});
}
};
} ], Wo = [ "$templateRequest", "$anchorScroll", "$animate", function(t, e, n) {
return {
restrict: "ECA",
priority: 400,
terminal: !0,
transclude: "element",
controller: Vr.noop,
compile: function(r, i) {
var o = i.ngInclude || i.src, a = i.onload || "", s = i.autoscroll;
return function(r, i, u, c, l) {
var f, p, h, d = 0, $ = function() {
p && (p.remove(), p = null), f && (f.$destroy(), f = null), h && (n.leave(h).then(function() {
p = null;
}), p = h, h = null);
};
r.$watch(o, function(o) {
var u = function() {
!b(s) || s && !r.$eval(s) || e();
}, p = ++d;
o ? (t(o, !0).then(function(t) {
if (p === d) {
var e = r.$new();
c.template = t;
var s = l(e, function(t) {
$(), n.enter(t, null, i).then(u);
});
f = e, h = s, f.$emit("$includeContentLoaded", o), r.$eval(a);
}
}, function() {
p === d && ($(), r.$emit("$includeContentError", o));
}), r.$emit("$includeContentRequested", o)) : ($(), c.template = null);
});
};
}
};
} ], Go = [ "$compile", function(t) {
return {
restrict: "ECA",
priority: -400,
require: "ngInclude",
link: function(r, i, o, a) {
return /SVG/.test("" + i[0]) ? (i.empty(), t(Ct(a.template, e).childNodes)(r, function(t) {
i.append(t);
}, {
futureParentElement: i
}), n) : (i.html(a.template), t(i.contents())(r), n);
}
};
} ], Jo = Qn({
priority: 450,
compile: function() {
return {
pre: function(t, e, n) {
t.$eval(n.ngInit);
}
};
}
}), Xo = function() {
return {
restrict: "A",
priority: 100,
require: "ngModel",
link: function(t, e, r, i) {
var a = e.attr(r.$attr.ngList) || ", ", s = "false" !== r.ngTrim, u = s ? Fr(a) : a, c = function(t) {
if (!y(t)) {
var e = [];
return t && o(t.split(u), function(t) {
t && e.push(s ? Fr(t) : t);
}), e;
}
};
i.$parsers.push(c), i.$formatters.push(function(t) {
return qr(t) ? t.join(a) : n;
}), i.$isEmpty = function(t) {
return !t || !t.length;
};
}
};
}, Yo = "ng-valid", Ko = "ng-invalid", Zo = "ng-pristine", Qo = "ng-dirty", ta = "ng-untouched", ea = "ng-touched", na = "ng-pending", ra = r("ngModel"), ia = [ "$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(t, e, r, i, a, s, u, c, l, f) {
this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = n, 
this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], 
this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, 
this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, 
this.$pending = n, this.$name = f(r.name || "", !1)(t), this.$$parentForm = mo;
var p, h = a(r.ngModel), d = h.assign, m = h, v = d, g = null, w = this;
this.$$setOptions = function(t) {
if (w.$options = t, t && t.getterSetter) {
var e = a(r.ngModel + "()"), n = a(r.ngModel + "($$$p)");
m = function(t) {
var n = h(t);
return C(n) && (n = e(t)), n;
}, v = function(t) {
C(h(t)) ? n(t, {
$$$p: w.$modelValue
}) : d(t, w.$modelValue);
};
} else if (!h.assign) throw ra("nonassign", "Expression '{0}' is non-assignable. Element: {1}", r.ngModel, Z(i));
}, this.$render = $, this.$isEmpty = function(t) {
return y(t) || "" === t || null === t || t !== t;
};
var x = 0;
mr({
ctrl: this,
$element: i,
set: function(t, e) {
t[e] = !0;
},
unset: function(t, e) {
delete t[e];
},
$animate: s
}), this.$setPristine = function() {
w.$dirty = !1, w.$pristine = !0, s.removeClass(i, Qo), s.addClass(i, Zo);
}, this.$setDirty = function() {
w.$dirty = !0, w.$pristine = !1, s.removeClass(i, Zo), s.addClass(i, Qo), w.$$parentForm.$setDirty();
}, this.$setUntouched = function() {
w.$touched = !1, w.$untouched = !0, s.setClass(i, ta, ea);
}, this.$setTouched = function() {
w.$touched = !0, w.$untouched = !1, s.setClass(i, ea, ta);
}, this.$rollbackViewValue = function() {
u.cancel(g), w.$viewValue = w.$$lastCommittedViewValue, w.$render();
}, this.$validate = function() {
if (!k(w.$modelValue) || !isNaN(w.$modelValue)) {
var t = w.$$lastCommittedViewValue, e = w.$$rawModelValue, r = w.$valid, i = w.$modelValue, o = w.$options && w.$options.allowInvalid;
w.$$runValidators(e, t, function(t) {
o || r === t || (w.$modelValue = t ? e : n, w.$modelValue !== i && w.$$writeModelToScope());
});
}
}, this.$$runValidators = function(t, e, r) {
function i() {
var t = w.$$parserName || "parse";
return y(p) ? (u(t, null), !0) : (p || (o(w.$validators, function(t, e) {
u(e, null);
}), o(w.$asyncValidators, function(t, e) {
u(e, null);
})), u(t, p), p);
}
function a() {
var n = !0;
return o(w.$validators, function(r, i) {
var o = r(t, e);
n = n && o, u(i, o);
}), n ? !0 : (o(w.$asyncValidators, function(t, e) {
u(e, null);
}), !1);
}
function s() {
var r = [], i = !0;
o(w.$asyncValidators, function(o, a) {
var s = o(t, e);
if (!N(s)) throw ra("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", s);
u(a, n), r.push(s.then(function() {
u(a, !0);
}, function() {
i = !1, u(a, !1);
}));
}), r.length ? l.all(r).then(function() {
c(i);
}, $) : c(!0);
}
function u(t, e) {
f === x && w.$setValidity(t, e);
}
function c(t) {
f === x && r(t);
}
x++;
var f = x;
return i() && a() ? (s(), n) : (c(!1), n);
}, this.$commitViewValue = function() {
var t = w.$viewValue;
u.cancel(g), (w.$$lastCommittedViewValue !== t || "" === t && w.$$hasNativeValidators) && (w.$$lastCommittedViewValue = t, 
w.$pristine && this.$setDirty(), this.$$parseAndValidate());
}, this.$$parseAndValidate = function() {
function e() {
w.$modelValue !== a && w.$$writeModelToScope();
}
var r = w.$$lastCommittedViewValue, i = r;
if (p = y(i) ? n : !0) for (var o = 0; o < w.$parsers.length; o++) if (i = w.$parsers[o](i), 
y(i)) {
p = !1;
break;
}
k(w.$modelValue) && isNaN(w.$modelValue) && (w.$modelValue = m(t));
var a = w.$modelValue, s = w.$options && w.$options.allowInvalid;
w.$$rawModelValue = i, s && (w.$modelValue = i, e()), w.$$runValidators(i, w.$$lastCommittedViewValue, function(t) {
s || (w.$modelValue = t ? i : n, e());
});
}, this.$$writeModelToScope = function() {
v(t, w.$modelValue), o(w.$viewChangeListeners, function(t) {
try {
t();
} catch (n) {
e(n);
}
});
}, this.$setViewValue = function(t, e) {
w.$viewValue = t, (!w.$options || w.$options.updateOnDefault) && w.$$debounceViewValueCommit(e);
}, this.$$debounceViewValueCommit = function(e) {
var n, r = 0, i = w.$options;
i && b(i.debounce) && (n = i.debounce, k(n) ? r = n : k(n[e]) ? r = n[e] : k(n.default) && (r = n.default)), 
u.cancel(g), r ? g = u(function() {
w.$commitViewValue();
}, r) : c.$$phase ? w.$commitViewValue() : t.$apply(function() {
w.$commitViewValue();
});
}, t.$watch(function() {
var e = m(t);
if (e !== w.$modelValue && (w.$modelValue === w.$modelValue || e === e)) {
w.$modelValue = w.$$rawModelValue = e, p = n;
for (var r = w.$formatters, i = r.length, o = e; i--; ) o = r[i](o);
w.$viewValue !== o && (w.$viewValue = w.$$lastCommittedViewValue = o, w.$render(), 
w.$$runValidators(e, o, $));
}
return e;
});
} ], oa = [ "$rootScope", function(t) {
return {
restrict: "A",
require: [ "ngModel", "^?form", "^?ngModelOptions" ],
controller: ia,
priority: 1,
compile: function(e) {
return e.addClass(Zo).addClass(ta).addClass(Yo), {
pre: function(t, e, n, r) {
var i = r[0], o = r[1] || i.$$parentForm;
i.$$setOptions(r[2] && r[2].$options), o.$addControl(i), n.$observe("name", function(t) {
i.$name !== t && i.$$parentForm.$$renameControl(i, t);
}), t.$on("$destroy", function() {
i.$$parentForm.$removeControl(i);
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
} ], aa = /(\s+|^)default(\s+|$)/, sa = function() {
return {
restrict: "A",
controller: [ "$scope", "$attrs", function(t, e) {
var n = this;
this.$options = F(t.$eval(e.ngModelOptions)), b(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, 
this.$options.updateOn = Fr(this.$options.updateOn.replace(aa, function() {
return n.$options.updateOnDefault = !0, " ";
}))) : this.$options.updateOnDefault = !0;
} ]
};
}, ua = Qn({
terminal: !0,
priority: 1e3
}), ca = r("ngOptions"), la = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, fa = [ "$compile", "$parse", function(t, r) {
function a(t, e, n) {
function o(t, e, n, r, i) {
this.selectValue = t, this.viewValue = e, this.label = n, this.group = r, this.disabled = i;
}
function a(t) {
var e;
if (!c && i(t)) e = t; else {
e = [];
for (var n in t) t.hasOwnProperty(n) && "$" !== n.charAt(0) && e.push(n);
}
return e;
}
var s = t.match(la);
if (!s) throw ca("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", t, Z(e));
var u = s[5] || s[7], c = s[6], l = / as /.test(s[0]) && s[1], f = s[9], p = r(s[2] ? s[1] : u), h = l && r(l), d = h || p, $ = f && r(f), m = f ? function(t, e) {
return $(n, e);
} : function(t) {
return Jt(t);
}, v = function(t, e) {
return m(t, E(t, e));
}, g = r(s[2] || s[1]), y = r(s[3] || ""), b = r(s[4] || ""), w = r(s[8]), x = {}, E = c ? function(t, e) {
return x[c] = e, x[u] = t, x;
} : function(t) {
return x[u] = t, x;
};
return {
trackBy: f,
getTrackByValue: v,
getWatchables: r(w, function(t) {
var e = [];
t = t || [];
for (var r = a(t), i = r.length, o = 0; i > o; o++) {
var u = t === r ? o : r[o], c = (t[u], E(t[u], u)), l = m(t[u], c);
if (e.push(l), s[2] || s[1]) {
var f = g(n, c);
e.push(f);
}
if (s[4]) {
var p = b(n, c);
e.push(p);
}
}
return e;
}),
getOptions: function() {
for (var t = [], e = {}, r = w(n) || [], i = a(r), s = i.length, u = 0; s > u; u++) {
var c = r === i ? u : i[u], l = r[c], p = E(l, c), h = d(n, p), $ = m(h, p), x = g(n, p), k = y(n, p), S = b(n, p), C = new o($, h, x, k, S);
t.push(C), e[$] = C;
}
return {
items: t,
selectValueMap: e,
getOptionFromViewValue: function(t) {
return e[v(t)];
},
getViewValueFromOption: function(t) {
return f ? Vr.copy(t.viewValue) : t.viewValue;
}
};
}
};
}
var s = e.createElement("option"), u = e.createElement("optgroup");
return {
restrict: "A",
terminal: !0,
require: [ "select", "?ngModel" ],
link: function(e, r, i, c) {
function l(t, e) {
t.element = e, e.disabled = t.disabled, t.label !== e.label && (e.label = t.label, 
e.textContent = t.label), t.value !== e.value && (e.value = t.selectValue);
}
function f(t, e, n, r) {
var i;
return e && br(e.nodeName) === n ? i = e : (i = r.cloneNode(!1), e ? t.insertBefore(i, e) : t.appendChild(i)), 
i;
}
function p(t) {
for (var e; t; ) e = t.nextSibling, Ut(t), t = e;
}
function h(t) {
var e = m && m[0], n = E && E[0];
if (e || n) for (;t && (t === e || t === n || e && e.nodeType === Yr); ) t = t.nextSibling;
return t;
}
function d() {
var t = k && v.readValue();
k = S.getOptions();
var e = {}, n = r[0].firstChild;
if (x && r.prepend(m), n = h(n), k.items.forEach(function(t) {
var i, o, a;
t.group ? (i = e[t.group], i || (o = f(r[0], n, "optgroup", u), n = o.nextSibling, 
o.label = t.group, i = e[t.group] = {
groupElement: o,
currentOptionElement: o.firstChild
}), a = f(i.groupElement, i.currentOptionElement, "option", s), l(t, a), i.currentOptionElement = a.nextSibling) : (a = f(r[0], n, "option", s), 
l(t, a), n = a.nextSibling);
}), Object.keys(e).forEach(function(t) {
p(e[t].currentOptionElement);
}), p(n), $.$render(), !$.$isEmpty(t)) {
var i = v.readValue();
(S.trackBy ? U(t, i) : t === i) || ($.$setViewValue(i), $.$render());
}
}
var $ = c[1];
if ($) {
for (var m, v = c[0], g = i.multiple, y = 0, b = r.children(), w = b.length; w > y; y++) if ("" === b[y].value) {
m = b.eq(y);
break;
}
var x = !!m, E = Cr(s.cloneNode(!1));
E.val("?");
var k, S = a(i.ngOptions, r, e), C = function() {
x || r.prepend(m), r.val(""), m.prop("selected", !0), m.attr("selected", !0);
}, A = function() {
x || m.remove();
}, O = function() {
r.prepend(E), r.val("?"), E.prop("selected", !0), E.attr("selected", !0);
}, M = function() {
E.remove();
};
g ? ($.$isEmpty = function(t) {
return !t || 0 === t.length;
}, v.writeValue = function(t) {
k.items.forEach(function(t) {
t.element.selected = !1;
}), t && t.forEach(function(t) {
var e = k.getOptionFromViewValue(t);
e && !e.disabled && (e.element.selected = !0);
});
}, v.readValue = function() {
var t = r.val() || [], e = [];
return o(t, function(t) {
var n = k.selectValueMap[t];
n && !n.disabled && e.push(k.getViewValueFromOption(n));
}), e;
}, S.trackBy && e.$watchCollection(function() {
return qr($.$viewValue) ? $.$viewValue.map(function(t) {
return S.getTrackByValue(t);
}) : n;
}, function() {
$.$render();
})) : (v.writeValue = function(t) {
var e = k.getOptionFromViewValue(t);
e && !e.disabled ? r[0].value !== e.selectValue && (M(), A(), r[0].value = e.selectValue, 
e.element.selected = !0, e.element.setAttribute("selected", "selected")) : null === t || x ? (M(), 
C()) : (A(), O());
}, v.readValue = function() {
var t = k.selectValueMap[r.val()];
return t && !t.disabled ? (A(), M(), k.getViewValueFromOption(t)) : null;
}, S.trackBy && e.$watch(function() {
return S.getTrackByValue($.$viewValue);
}, function() {
$.$render();
})), x ? (m.remove(), t(m)(e), m.removeClass("ng-scope")) : m = Cr(s.cloneNode(!1)), 
d(), e.$watchCollection(S.getWatchables, d);
}
}
};
} ], pa = [ "$locale", "$interpolate", "$log", function(t, e, n) {
var r = /{}/g, i = /^when(Minus)?(.+)$/;
return {
link: function(a, s, u) {
function c(t) {
s.text(t || "");
}
var l, f = u.count, p = u.$attr.when && s.attr(u.$attr.when), h = u.offset || 0, d = a.$eval(p) || {}, m = {}, v = e.startSymbol(), g = e.endSymbol(), b = v + f + "-" + h + g, w = Vr.noop;
o(u, function(t, e) {
var n = i.exec(e);
if (n) {
var r = (n[1] ? "-" : "") + br(n[2]);
d[r] = s.attr(u.$attr[e]);
}
}), o(d, function(t, n) {
m[n] = e(t.replace(r, b));
}), a.$watch(f, function(e) {
var r = parseFloat(e), i = isNaN(r);
if (i || r in d || (r = t.pluralCat(r - h)), r !== l && !(i && k(l) && isNaN(l))) {
w();
var o = m[r];
y(o) ? (null != e && n.debug("ngPluralize: no rule defined for '" + r + "' in " + p), 
w = $, c()) : w = a.$watch(o, c), l = r;
}
});
}
};
} ], ha = [ "$parse", "$animate", function(t, a) {
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
compile: function(r, p) {
var h = p.ngRepeat, d = e.createComment(" end ngRepeat: " + h + " "), $ = h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
if (!$) throw u("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", h);
var m = $[1], v = $[2], g = $[3], y = $[4];
if ($ = m.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !$) throw u("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", m);
var b = $[3] || $[1], w = $[2];
if (g && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(g) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(g))) throw u("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", g);
var x, E, k, S, C = {
$id: Jt
};
return y ? x = t(y) : (k = function(t, e) {
return Jt(e);
}, S = function(t) {
return t;
}), function(t, e, r, p, $) {
x && (E = function(e, n, r) {
return w && (C[w] = e), C[b] = n, C.$index = r, x(t, C);
});
var m = mt();
t.$watchCollection(v, function(r) {
var p, v, y, x, C, A, O, M, _, T, j, P, N = e[0], V = mt();
if (g && (t[g] = r), i(r)) _ = r, M = E || k; else {
M = E || S, _ = [];
for (var R in r) wr.call(r, R) && "$" !== R.charAt(0) && _.push(R);
}
for (x = _.length, j = Array(x), p = 0; x > p; p++) if (C = r === _ ? p : _[p], 
A = r[C], O = M(C, A, p), m[O]) T = m[O], delete m[O], V[O] = T, j[p] = T; else {
if (V[O]) throw o(j, function(t) {
t && t.scope && (m[t.id] = t);
}), u("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", h, O, A);
j[p] = {
id: O,
scope: n,
clone: n
}, V[O] = !0;
}
for (var I in m) {
if (T = m[I], P = $t(T.clone), a.leave(P), P[0].parentNode) for (p = 0, v = P.length; v > p; p++) P[p][s] = !0;
T.scope.$destroy();
}
for (p = 0; x > p; p++) if (C = r === _ ? p : _[p], A = r[C], T = j[p], T.scope) {
y = N;
do y = y.nextSibling; while (y && y[s]);
l(T) != y && a.move($t(T.clone), null, Cr(N)), N = f(T), c(T.scope, p, b, A, w, C, x);
} else $(function(t, e) {
T.scope = e;
var n = d.cloneNode(!1);
t[t.length++] = n, a.enter(t, null, Cr(N)), N = n, T.clone = t, V[T.id] = T, c(T.scope, p, b, A, w, C, x);
});
m = V;
});
};
}
};
} ], da = "ng-hide", $a = "ng-hide-animate", ma = [ "$animate", function(t) {
return {
restrict: "A",
multiElement: !0,
link: function(e, n, r) {
e.$watch(r.ngShow, function(e) {
t[e ? "removeClass" : "addClass"](n, da, {
tempClasses: $a
});
});
}
};
} ], va = [ "$animate", function(t) {
return {
restrict: "A",
multiElement: !0,
link: function(e, n, r) {
e.$watch(r.ngHide, function(e) {
t[e ? "addClass" : "removeClass"](n, da, {
tempClasses: $a
});
});
}
};
} ], ga = Qn(function(t, e, n) {
t.$watch(n.ngStyle, function(t, n) {
n && t !== n && o(n, function(t, n) {
e.css(n, "");
}), t && e.css(t);
}, !0);
}), ya = [ "$animate", function(t) {
return {
require: "ngSwitch",
controller: [ "$scope", function() {
this.cases = {};
} ],
link: function(n, r, i, a) {
var s = i.ngSwitch || i.on, u = [], c = [], l = [], f = [], p = function(t, e) {
return function() {
t.splice(e, 1);
};
};
n.$watch(s, function(n) {
var r, i;
for (r = 0, i = l.length; i > r; ++r) t.cancel(l[r]);
for (l.length = 0, r = 0, i = f.length; i > r; ++r) {
var s = $t(c[r].clone);
f[r].$destroy();
var h = l[r] = t.leave(s);
h.then(p(l, r));
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
} ], ba = Qn({
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
}), wa = Qn({
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
}), xa = Qn({
restrict: "EAC",
link: function(t, e, n, i, o) {
if (!o) throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", Z(e));
o(function(t) {
e.empty(), e.append(t);
});
}
}), Ea = [ "$templateCache", function(t) {
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
} ], ka = {
$setViewValue: $,
$render: $
}, Sa = [ "$element", "$scope", "$attrs", function(t, r) {
var i = this, o = new Xt();
i.ngModelCtrl = ka, i.unknownOption = Cr(e.createElement("option")), i.renderUnknownOption = function(e) {
var n = "? " + Jt(e) + " ?";
i.unknownOption.val(n), t.prepend(i.unknownOption), t.val(n);
}, r.$on("$destroy", function() {
i.renderUnknownOption = $;
}), i.removeUnknownOption = function() {
i.unknownOption.parent() && i.unknownOption.remove();
}, i.readValue = function() {
return i.removeUnknownOption(), t.val();
}, i.writeValue = function(e) {
i.hasOption(e) ? (i.removeUnknownOption(), t.val(e), "" === e && i.emptyOption.prop("selected", !0)) : null == e && i.emptyOption ? (i.removeUnknownOption(), 
t.val("")) : i.renderUnknownOption(e);
}, i.addOption = function(t, e) {
ht(t, '"option value"'), "" === t && (i.emptyOption = e);
var n = o.get(t) || 0;
o.put(t, n + 1);
}, i.removeOption = function(t) {
var e = o.get(t);
e && (1 === e ? (o.remove(t), "" === t && (i.emptyOption = n)) : o.put(t, e - 1));
}, i.hasOption = function(t) {
return !!o.get(t);
};
} ], Ca = function() {
return {
restrict: "E",
require: [ "select", "?ngModel" ],
controller: Sa,
link: function(t, e, n, r) {
var i = r[1];
if (i) {
var a = r[0];
if (a.ngModelCtrl = i, i.$render = function() {
a.writeValue(i.$viewValue);
}, e.on("change", function() {
t.$apply(function() {
i.$setViewValue(a.readValue());
});
}), n.multiple) {
a.readValue = function() {
var t = [];
return o(e.find("option"), function(e) {
e.selected && t.push(e.value);
}), t;
}, a.writeValue = function(t) {
var n = new Xt(t);
o(e.find("option"), function(t) {
t.selected = b(n.get(t.value));
});
};
var s, u = NaN;
t.$watch(function() {
u !== i.$viewValue || U(s, i.$viewValue) || (s = L(i.$viewValue), i.$render()), 
u = i.$viewValue;
}), i.$isEmpty = function(t) {
return !t || 0 === t.length;
};
}
}
}
};
}, Aa = [ "$interpolate", function(t) {
function e(t) {
t[0].hasAttribute("selected") && (t[0].selected = !0);
}
return {
restrict: "E",
priority: 100,
compile: function(n, r) {
if (b(r.value)) var i = t(r.value, !0); else {
var o = t(n.text(), !0);
o || r.$set("value", n.text());
}
return function(t, n, r) {
function a(t) {
c.addOption(t, n), c.ngModelCtrl.$render(), e(n);
}
var s = "$selectController", u = n.parent(), c = u.data(s) || u.parent().data(s);
if (c && c.ngModelCtrl) {
if (i) {
var l;
r.$observe("value", function(t) {
b(l) && c.removeOption(l), l = t, a(t);
});
} else o ? t.$watch(o, function(t, e) {
r.$set("value", t), e !== t && c.removeOption(e), a(t);
}) : a(r.value);
n.on("$destroy", function() {
c.removeOption(r.value), c.ngModelCtrl.$render();
});
}
};
}
};
} ], Oa = v({
restrict: "E",
terminal: !1
}), Ma = function() {
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
}, _a = function() {
return {
restrict: "A",
require: "?ngModel",
link: function(t, e, i, o) {
if (o) {
var a, s = i.ngPattern || i.pattern;
i.$observe("pattern", function(t) {
if (E(t) && t.length > 0 && (t = RegExp("^" + t + "$")), t && !t.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, t, Z(e));
a = t || n, o.$validate();
}), o.$validators.pattern = function(t, e) {
return o.$isEmpty(e) || y(a) || a.test(e);
};
}
}
};
}, Ta = function() {
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
}, ja = function() {
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
t.angular.bootstrap || (lt(), bt(Vr), Vr.module("ngLocale", [], [ "$provide", function(t) {
function e(t) {
t += "";
var e = t.indexOf(".");
return -1 == e ? 0 : t.length - e - 1;
}
function r(t, r) {
var i = r;
n === i && (i = Math.min(e(t), 3));
var o = Math.pow(10, i), a = (t * o | 0) % o;
return {
v: i,
f: a
};
}
var i = {
ZERO: "zero",
ONE: "one",
TWO: "two",
FEW: "few",
MANY: "many",
OTHER: "other"
};
t.value("$locale", {
DATETIME_FORMATS: {
AMPMS: [ "AM", "PM" ],
DAY: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
ERANAMES: [ "Before Christ", "Anno Domini" ],
ERAS: [ "BC", "AD" ],
FIRSTDAYOFWEEK: 6,
MONTH: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
SHORTDAY: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
SHORTMONTH: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
WEEKENDRANGE: [ 5, 6 ],
fullDate: "EEEE, MMMM d, y",
longDate: "MMMM d, y",
medium: "MMM d, y h:mm:ss a",
mediumDate: "MMM d, y",
mediumTime: "h:mm:ss a",
"short": "M/d/yy h:mm a",
shortDate: "M/d/yy",
shortTime: "h:mm a"
},
NUMBER_FORMATS: {
CURRENCY_SYM: "$",
DECIMAL_SEP: ".",
GROUP_SEP: ",",
PATTERNS: [ {
gSize: 3,
lgSize: 3,
maxFrac: 3,
minFrac: 0,
minInt: 1,
negPre: "-",
negSuf: "",
posPre: "",
posSuf: ""
}, {
gSize: 3,
lgSize: 3,
maxFrac: 2,
minFrac: 2,
minInt: 1,
negPre: "-¤",
negSuf: "",
posPre: "¤",
posSuf: ""
} ]
},
id: "en-us",
pluralCat: function(t, e) {
var n = 0 | t, o = r(t, e);
return 1 == n && 0 == o.v ? i.ONE : i.OTHER;
}
});
} ]), Cr(e).ready(function() {
ot(e, at);
}));
}(window, document), !window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'), 
t.exports = angular;
}
});
//# sourceMappingURL=angular.48bffc950a9d6db0a82b.js.map
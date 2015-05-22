var coursesParticipantDetails = webpackJsonp_name_([ 11 ], {
0: function(t, e, n) {
"use strict";
function r() {
i();
}
function i() {
var t = document.querySelector("[data-photo-load]");
t && new o({
elem: t
});
}
function o(t) {
function e(t) {
var e = new FormData();
e.append("photo", t);
var o = c({
method: "POST",
url: "/imgur/upload",
body: e,
normalStatuses: [ 200, 400 ]
});
o.addEventListener("loadstart", r), o.addEventListener("loadend", i), o.addEventListener("fail", function(t) {
new u.Error("Ошибка загрузки: " + t.reason);
}), o.addEventListener("success", function(t) {
400 == o.status ? new u.Error("Неверный тип файла или изображение повреждено.") : n(t.result);
});
}
function n(t) {
h.style.backgroundImage = "url('" + a(t.link, 64, 64) + "')", d.value = t.imgurId;
}
function r() {
p.start(), o.classList.add("modal-overlay_light");
}
function i() {
p.stop(), o.classList.remove("modal-overlay_light");
}
var o = t.elem, f = o.querySelector("a"), h = o.querySelector("div"), d = o.querySelector("input");
f.onclick = function(t) {
t.preventDefault(), s({
minSize: 160,
onSuccess: e
});
};
var p = new l({
elem: h,
size: "small"
});
}
var a = n(57).thumb, s = n(1).promptSquarePhoto, u = n(24), c = n(29), l = n(54);
r();
},
1: function(t, e, n) {
"use strict";
e.promptSquarePhoto = n(82);
},
29: function(t, e, n) {
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
var i = n(24), o = n(78);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
50: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.thumb = o;
}
var i = n(79)(), o = n(57).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
57: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
78: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
79: function(t, e, n) {
"use strict";
var r = n(109);
t.exports = function(t) {
function e(t, e, n, i, o) {
var a = o || "div";
switch (a) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
t.push("<" + a + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && t.push("</" + a + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, o) {
var a = this.block, s = this.attributes || {};
if (!s.class && i && !o) throw Error("Block without class: " + i);
if (s.class) {
var u = s.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var c;
try {
c = u[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
o ? u[0] = r[r.length - 1] + t.element + u[0] : r[r.length] = c;
var f = (o ? r[r.length - 1] + t.element : "") + c;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var h = 0; h < u.length; h++) {
var d = u[h];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? u[h] = f + d : d.match(RegExp("^" + t.element)) && (r[r.length - 2] ? u[h] = r[r.length - 2] + d : u[h] = r[r.length - 1] + d), 
u[h].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (u[h] = t.prefix + u[h]);
}
s.class = u.sort().join(" ");
}
e(n, a, s, r, i), o || r.pop();
};
};
},
82: function(t, e, n) {
"use strict";
var r = n(24), i = n(112);
t.exports = function(t) {
var e = t.minSize, n = t.onSuccess, o = document.createElement("input");
o.type = "file", o.accept = "image/*", o.onchange = function() {
o.remove();
var t = new FileReader(), a = o.files[0];
t.onload = function(t) {
var o = new Image();
o.onload = function() {
o.height < e || o.width < e ? new r.Error("Изображение должно иметь размер " + e + "x" + e + " или больше") : o.width == o.height ? n(a) : i(o, function(t) {
n(t);
});
}, o.onerror = function() {
new r.Error("Ошибка при загрузке или изображдение повреждено.");
}, o.src = t.target.result;
}, t.readAsDataURL(a);
}, o.hidden = !0, document.body.appendChild(o), o.click();
};
},
109: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
e.merge = function o(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = o(n, t[i]);
return n;
}
var a = t.class, s = e.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
t.class = a.concat(s).filter(r));
for (var u in e) "class" != u && (t[u] = e[u]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], o = 0; o < t.length; o++) n && n[o] ? r.push(e.escape(i([ t[o] ]))) : r.push(i(t[o]));
var a = i(r);
return a.length ? ' class="' + a + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], o = Object.keys(t);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], u = t[s];
"class" == s ? (u = i(u)) && r.push(" " + s + '="' + u + '"') : r.push(e.attr(s, u, !1, n));
}
return r.join("");
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function a(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(117).readFileSync(e, "utf8");
} catch (o) {
a(t, null, r);
}
var s = 3, u = i.split("\n"), c = Math.max(r - s, 0), l = Math.min(u.length, r + s), s = u.slice(c, l).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + s + "\n\n" + t.message, 
t;
};
},
112: function(t, e, n) {
"use strict";
var r = n(11), i = n(120), o = n(50), a = e.PhotoCut = n(121);
n(125), t.exports = function(t, e) {
function n() {
var t = f.getCanvasSelection();
if (t) {
var n = document.createElement("canvas");
n.width = t.size, n.height = t.size, n.getContext("2d").drawImage(t.source, t.x, t.y, t.size, t.size, 0, 0, t.size, t.size), 
s.remove(), n.toBlob(function(t) {
e(t);
}, "image/jpeg");
}
}
var s = new r();
s.setContent(o(i));
var u = s.elem.querySelector(".photo-cut__canvas");
u.focus();
for (var c = s.elem.querySelectorAll(".photo-cut__selection-canvas"), l = 0; l < c.length; l++) c[l].width = c[l].offsetWidth, 
c[l].height = c[l].offsetHeight;
var f = new a(u, {
maxImageSize: 300
});
f.setImage(t), u.addEventListener("selection", function() {
for (var t = f.getCanvasSelection(), e = 0; e < c.length; e++) {
var n = c[e];
n.getContext("2d").clearRect(0, 0, n.width, n.height), t && n.getContext("2d").drawImage(t.source, t.x, t.y, t.size, t.size, 0, 0, n.width, n.height);
}
}), f.setSelection({
x: .1 * u.width,
size: .8 * Math.min(f.width, f.height),
y: .1 * u.height
}), s.elem.querySelector('[data-action="rotate-right"]').addEventListener("click", function() {
return f.rotate(1);
}), s.elem.querySelector("[data-form]").addEventListener("submit", function(t) {
t.preventDefault(), n();
}), u.addEventListener("submit", function() {
n();
});
};
},
117: function() {},
120: function(t, e, n) {
var r = n(109);
t.exports = function(t) {
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, o) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, o);
}, n.e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: r.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
e.push("Выберите миниатюру");
},
attributes: {
"class": "title"
}
}, "h1"), n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
attributes: {
tabindex: "-1",
"class": "canvas"
}
}, "canvas"), n.e.call({
attributes: {
type: "button",
"data-action": "rotate-right",
"class": "rotate"
}
}, "button");
},
attributes: {
"class": "canvas-wrapper"
}
});
},
attributes: {
"class": "main"
}
}), n.e.call({
block: function() {
n.e.call({
attributes: {
"class": "selection-canvas"
}
}, "canvas"), n.e.call({
attributes: {
"class": "selection-canvas _small"
}
}, "canvas");
},
attributes: {
"class": "result"
}
});
},
attributes: {
"class": "layout"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
e.push("Сохранить");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action"
}
}, "button"), n.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
href: "#",
"class": "close-link modal__close"
}
}, "a");
},
attributes: {
"class": "submit"
}
});
},
attributes: {
"data-form": !0
}
}, "form");
},
attributes: {
"class": "photo-cut"
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
121: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), o = n(126), a = function() {
function t(e) {
var n = this, i = void 0 === arguments[1] ? {} : arguments[1], o = i.maxImageSize;
r(this, t), this.maxImageSize = o || 200, this.canvas = e, this.canvas.onmousedown = function(t) {
return n.onMouseDown(t);
}, this.canvas.onmouseup = function(t) {
return n.onMouseUp(t);
}, this.canvas.onkeydown = function(t) {
return n.onKeyDown(t);
}, document.addEventListener("mousemove", function(t) {
return n.onMouseMove(t);
}), this.ctx = e.getContext("2d"), this.state = !1, this.mouseDownShift = null, 
this.selectionStartCoords = null, this.rotation = 0, this.selection = null, this.cornerSize = 5;
}
return i(t, [ {
key: "setImage",
value: function(t) {
this.img = t, this.scale = Math.min(this.maxImageSize / t.width, this.maxImageSize / t.height), 
this.fullImageCanvas = document.createElement("canvas"), this.fullImageCtx = this.fullImageCanvas.getContext("2d"), 
this.renderFullImageRotated(), this.render();
}
}, {
key: "getEventCoordsRelativeCanvasImage",
value: function(t) {
return {
x: t.clientX - this.canvas.getBoundingClientRect().left - this.cornerSize,
y: t.clientY - this.canvas.getBoundingClientRect().top - this.cornerSize
};
}
}, {
key: "onKeyDown",
value: function(t) {
this.selection && (13 == t.keyCode && this.canvas.dispatchEvent(new CustomEvent("submit")), 
40 == t.keyCode && (this.selection.bottom < this.height && this.setSelection({
y: this.selection.y + 1
}), t.preventDefault()), 38 == t.keyCode && (this.selection.y > 0 && this.setSelection({
y: this.selection.y - 1
}), t.preventDefault()), 37 == t.keyCode && (this.selection.x > 0 && this.setSelection({
x: this.selection.x - 1
}), t.preventDefault()), 39 == t.keyCode && (this.selection.right < this.width && this.setSelection({
x: this.selection.x + 1
}), t.preventDefault()));
}
}, {
key: "onMouseDown",
value: function(t) {
t.preventDefault();
var e = this.getEventCoordsRelativeCanvasImage(t), n = this.findCoordsInSelection(e);
switch (n) {
case "inside":
this.state = "moving", this.mouseDownShift = {
x: e.x - this.selection.x,
y: e.y - this.selection.y
};
break;

case "outside":
this.setSelection(null), this.state = "selecting", this.selectionStartCoords = e;
break;

case "nw":
case "ne":
case "sw":
case "se":
this.state = "modifying";
break;

default:
throw Error("Must never reach here");
}
}
}, {
key: "findCoordsInSelection",
value: function(t) {
return this.selection ? Math.abs(t.x - this.selection.x) < this.cornerSize && Math.abs(t.y - this.selection.y) < this.cornerSize ? "nw" : Math.abs(t.x - this.selection.x) < this.cornerSize && Math.abs(t.y - this.selection.bottom) < this.cornerSize ? "sw" : Math.abs(t.x - this.selection.right) < this.cornerSize && Math.abs(t.y - this.selection.bottom) < this.cornerSize ? "se" : Math.abs(t.x - this.selection.right) < this.cornerSize && Math.abs(t.y - this.selection.y) < this.cornerSize ? "ne" : t.x >= this.selection.x && t.x <= this.selection.right && t.y >= this.selection.y && t.y <= this.selection.bottom ? "inside" : "outside" : "outside";
}
}, {
key: "onMouseMove",
value: function(t) {
var e = this.getEventCoordsRelativeCanvasImage(t);
switch (e.x < 0 && (e.x = 0), e.x > this.width && (e.x = this.width), e.y < 0 && (e.y = 0), 
e.y > this.height && (e.y = this.height), this.state) {
case !1:
this.showCursorAtCoords(e);
break;

case "moving":
this.moveSelection(e);
break;

case "selecting":
this.createSelection(e);
break;

case "modifying":
this.modifySelection(e);
break;

default:
throw Error("Must never reach here");
}
}
}, {
key: "showCursorAtCoords",
value: function(t) {
var e = this.findCoordsInSelection(t);
"outside" == e ? this.canvas.style.cursor = "crosshair" : "inside" == e ? this.canvas.style.cursor = "move" : this.canvas.style.cursor = e + "-resize";
}
}, {
key: "modifySelection",
value: function(t) {
var e = this.selection.center, n = t.x < e.x && t.y < e.y ? "nw" : t.x < e.x && t.y >= e.y ? "sw" : t.x > e.x && t.y < e.y ? "ne" : "se";
switch (n) {
case "nw":
this.selectionStartCoords = {
x: this.selection.right,
y: this.selection.bottom
};
break;

case "ne":
this.selectionStartCoords = {
x: this.selection.x,
y: this.selection.bottom
};
break;

case "sw":
this.selectionStartCoords = {
x: this.selection.right,
y: this.selection.y
};
break;

case "se":
this.selectionStartCoords = {
x: this.selection.x,
y: this.selection.y
};
}
this.createSelection(t);
}
}, {
key: "moveSelection",
value: function(t) {
var e = Math.min(t.x - this.mouseDownShift.x, this.width - this.selection.size), n = Math.min(t.y - this.mouseDownShift.y, this.height - this.selection.size);
0 > e && (e = 0), 0 > n && (n = 0), this.setSelection({
x: e,
y: n,
size: this.selection.size
}), this.canvas.style.cursor = "move";
}
}, {
key: "setSelection",
value: function(t) {
t ? (t = Object.create(t), this.selection && (t.x = t.x || this.selection.x, t.y = t.y || this.selection.y, 
t.size = t.size || this.selection.size), this.selection = new o(t)) : this.selection = null, 
this.render(), this.canvas.dispatchEvent(new CustomEvent("selection", {
bubbles: !0
}));
}
}, {
key: "createSelection",
value: function(t) {
var e = Math.max(Math.abs(this.selectionStartCoords.x - t.x), Math.abs(this.selectionStartCoords.y - t.y)), n = {};
t.x >= this.selectionStartCoords.x ? t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "se-resize", 
n.size = Math.min(e, this.height - this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "ne-resize", 
n.size = Math.min(e, this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y - n.size) : t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "sw-resize", 
n.size = Math.min(e, this.selectionStartCoords.x, this.height - this.selectionStartCoords.y), 
n.x = this.selectionStartCoords.x - n.size, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "nw-resize", 
n.size = Math.min(e, this.selectionStartCoords.x, this.selectionStartCoords.y), 
n.x = this.selectionStartCoords.x - n.size, n.y = this.selectionStartCoords.y - n.size), 
this.setSelection(n);
}
}, {
key: "onMouseUp",
value: function() {
this.state && (this.state = !1, this.selection && this.selection.size < 2 * this.cornerSize + 2 && this.setSelection(null), 
this.render());
}
}, {
key: "renderFullImageRotated",
value: function() {
this.rotation % 2 === 0 ? (this.fullImageCanvas.width = this.img.width, this.fullImageCanvas.height = this.img.height) : (this.fullImageCanvas.height = this.img.width, 
this.fullImageCanvas.width = this.img.height), this.fullImageCtx.translate(this.fullImageCanvas.width / 2, this.fullImageCanvas.height / 2), 
this.fullImageCtx.rotate(this.rotation * Math.PI / 2), this.fullImageCtx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2, this.img.width, this.img.height), 
this.fullImageCtx.rotate(-this.rotation * Math.PI / 2), this.fullImageCtx.translate(-this.fullImageCanvas.width / 2, -this.fullImageCanvas.heigh / 2);
}
}, {
key: "rotate",
value: function() {
this.rotation++, this.state = !1, this.renderFullImageRotated(), this.render(), 
this.selection && this.setSelection({
x: this.width - this.selection.bottom,
y: this.selection.x
}), this.canvas.focus();
}
}, {
key: "render",
value: function() {
if (this.width = this.fullImageCanvas.width * this.scale, this.height = this.fullImageCanvas.height * this.scale, 
this.canvas.width = this.width + 2 * this.cornerSize, this.canvas.height = this.height + 2 * this.cornerSize, 
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.translate(this.cornerSize, this.cornerSize), 
this.ctx.drawImage(this.fullImageCanvas, 0, 0, this.width, this.height), this.selection && this.selection.size) {
var t = Math.floor(this.selection.x), e = Math.floor(this.selection.y), n = Math.ceil(this.selection.size);
this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", this.ctx.fillRect(0, 0, this.width, e), 
this.ctx.fillRect(0, e, t, this.height - e), this.ctx.fillRect(t + n, e, this.width - (t + n), n), 
this.ctx.fillRect(t, e + n, this.width - t, this.height - (e + n)), this.renderCorner("nw"), 
this.renderCorner("ne"), this.renderCorner("sw"), this.renderCorner("se");
}
this.ctx.translate(-this.cornerSize, -this.cornerSize);
}
}, {
key: "renderCorner",
value: function(t) {
var e;
switch (t) {
case "nw":
e = {
x: this.selection.x - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "ne":
e = {
x: this.selection.right - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "sw":
e = {
x: this.selection.x - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
break;

case "se":
e = {
x: this.selection.right - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
}
e.width = 2 * this.cornerSize, e.height = 2 * this.cornerSize, this.state ? ("modifying" == this.state || "selecting" == this.state) && this.selectionStartCoords.x >= e.x && this.selectionStartCoords.y >= e.y && this.selectionStartCoords.x <= e.x + e.width && this.selectionStartCoords.y <= e.y + e.height ? this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)", 
this.ctx.fillRect(e.x, e.y, e.width, e.height);
}
}, {
key: "getCanvasSelection",
value: function() {
return this.selection ? {
source: this.fullImageCanvas,
x: this.selection.x / this.scale,
y: this.selection.y / this.scale,
size: this.selection.size / this.scale
} : null;
}
} ]), t;
}();
t.exports = a;
},
125: function(t, e, n) {
var r;
!function(i) {
"use strict";
var o = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype, a = i.Blob && function() {
try {
return !!new Blob();
} catch (t) {
return !1;
}
}(), s = a && i.Uint8Array && function() {
try {
return 100 === new Blob([ new Uint8Array(100) ]).size;
} catch (t) {
return !1;
}
}(), u = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder, c = (a || u) && i.atob && i.ArrayBuffer && i.Uint8Array && function(t) {
var e, n, r, i, o, c;
for (e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), 
n = new ArrayBuffer(e.length), r = new Uint8Array(n), i = 0; i < e.length; i += 1) r[i] = e.charCodeAt(i);
return o = t.split(",")[0].split(":")[1].split(";")[0], a ? new Blob([ s ? r : n ], {
type: o
}) : (c = new u(), c.append(n), c.getBlob(o));
};
i.HTMLCanvasElement && !o.toBlob && (o.mozGetAsFile ? o.toBlob = function(t, e, n) {
t(n && o.toDataURL && c ? c(this.toDataURL(e, n)) : this.mozGetAsFile("blob", e));
} : o.toDataURL && c && (o.toBlob = function(t, e, n) {
t(c(this.toDataURL(e, n)));
})), r = function() {
return c;
}.call(e, n, e, t), !(void 0 !== r && (t.exports = r));
}(window);
},
126: function(t) {
"use strict";
function e(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var n = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), r = function() {
function t(n) {
var r = n.x, i = n.y, o = n.size;
e(this, t), this.x = r, this.y = i, this.size = o;
}
return n(t, [ {
key: "bottom",
get: function() {
return this.y + this.size;
}
}, {
key: "right",
get: function() {
return this.x + this.size;
}
}, {
key: "center",
get: function() {
return {
x: this.x + this.size / 2,
y: this.y + this.size / 2
};
}
} ]), t;
}();
t.exports = r;
}
});
//# sourceMappingURL=coursesParticipantDetails.99bca40ef6d3902badf3.js.map
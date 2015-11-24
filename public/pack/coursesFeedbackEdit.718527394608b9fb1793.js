var coursesFeedbackEdit = webpackJsonp_name_([ 19 ], {
0: function(t, e, i) {
"use strict";
function s() {
n();
}
function n() {
var t = document.querySelector("[data-feedback-form]");
t.onsubmit = function(e) {
var i = [].filter.call(t.querySelectorAll('[name="stars"]'), function(t) {
return t.checked;
});
return i.length ? t.elements.content.value ? void 0 : (new a.Error("Вы забыли написать текст отзыва."), 
t.elements.content.scrollIntoView(), window.scrollBy(0, -100), void e.preventDefault()) : (new a.Success("Поставьте, пожалуйста, курсу оценку."), 
document.querySelector(".rating-chooser").parentNode.scrollIntoView(), window.scrollBy(0, -100), 
void e.preventDefault());
};
var e = t.querySelector("[data-photo-load]");
new r({
elem: e,
onSuccess: function(i) {
t.querySelector(".course-feedback__userpic-img").src = o(i.link, 86, 86), e.querySelector("i").style.backgroundImage = "url('" + o(i.link, 64, 64) + "')", 
e.querySelector("input").value = i.imgurId;
},
onLoadStart: function() {
e.classList.add("modal-overlay_light"), t.querySelector('button[type="submit"]').disabled = !0;
},
onLoadEnd: function() {
e.classList.remove("modal-overlay_light"), t.querySelector('button[type="submit"]').disabled = !1;
}
});
}
var o = i(163).thumb, r = i(165), a = i(147);
s();
},
116: function(t, e) {},
124: function(t, e, i) {
var s;
!function(n) {
"use strict";
var o = n.HTMLCanvasElement && n.HTMLCanvasElement.prototype, r = n.Blob && function() {
try {
return !!new Blob();
} catch (t) {
return !1;
}
}(), a = r && n.Uint8Array && function() {
try {
return 100 === new Blob([ new Uint8Array(100) ]).size;
} catch (t) {
return !1;
}
}(), c = n.BlobBuilder || n.WebKitBlobBuilder || n.MozBlobBuilder || n.MSBlobBuilder, l = (r || c) && n.atob && n.ArrayBuffer && n.Uint8Array && function(t) {
var e, i, s, n, o, l;
for (e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), 
i = new ArrayBuffer(e.length), s = new Uint8Array(i), n = 0; n < e.length; n += 1) s[n] = e.charCodeAt(n);
return o = t.split(",")[0].split(":")[1].split(";")[0], r ? new Blob([ a ? s : i ], {
type: o
}) : (l = new c(), l.append(i), l.getBlob(o));
};
n.HTMLCanvasElement && !o.toBlob && (o.mozGetAsFile ? o.toBlob = function(t, e, i) {
t(i && o.toDataURL && l ? l(this.toDataURL(e, i)) : this.mozGetAsFile("blob", e));
} : o.toDataURL && l && (o.toBlob = function(t, e, i) {
t(l(this.toDataURL(e, i)));
})), s = function() {
return l;
}.call(e, i, e, t), !(void 0 !== s && (t.exports = s));
}(window);
},
150: function(t, e) {
"use strict";
function i(t) {
if (t = t || {}, this.elem = t.elem, this.size = t.size || "medium", this.class = t.class ? " " + t.class : "", 
this.elemClass = t.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
i.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, i.prototype.stop = function() {
var t = this.elem.querySelector(".spinner");
t && (t.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, t.exports = i;
},
155: function(t, e, i) {
"use strict";
function s(t) {
function e(t, e) {
var i = new CustomEvent(t);
return i.originalEvent = e, i;
}
function i(t, i) {
var s = e("fail", i);
s.reason = t, n.dispatchEvent(s);
}
function s(t, i) {
var s = e("success", i);
s.result = t, n.dispatchEvent(s);
}
var n = new XMLHttpRequest(), r = t.method || "GET", a = t.body, c = t.url;
n.open(r, c, t.sync ? !1 : !0), n.method = r;
var l = o();
l && !t.skipCsrf && n.setRequestHeader("X-XSRF-TOKEN", l), "[object Object]" == {}.toString.call(a) && (n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
a = JSON.stringify(a)), t.noDocumentEvents || (n.addEventListener("loadstart", function(t) {
n.timeStart = Date.now();
var i = e("xhrstart", t);
document.dispatchEvent(i);
}), n.addEventListener("loadend", function(t) {
var i = e("xhrend", t);
document.dispatchEvent(i);
}), n.addEventListener("success", function(t) {
var i = e("xhrsuccess", t);
i.result = t.result, document.dispatchEvent(i);
}), n.addEventListener("fail", function(t) {
var i = e("xhrfail", t);
i.reason = t.reason, document.dispatchEvent(i);
})), t.raw || n.setRequestHeader("Accept", "application/json"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var h = t.normalStatuses || [ 200 ];
return n.addEventListener("error", function(t) {
i("Ошибка связи с сервером.", t);
}), n.addEventListener("timeout", function(t) {
i("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), n.addEventListener("abort", function(t) {
i("Запрос был прерван.", t);
}), n.addEventListener("load", function(e) {
if (!n.status) return void i("Не получен ответ от сервера.", e);
if (-1 == h.indexOf(n.status)) return void i("Ошибка на стороне сервера (код " + n.status + "), попытайтесь позднее.", e);
var o = n.responseText, r = n.getResponseHeader("Content-Type");
if (r.match(/^application\/json/) || t.json) try {
o = JSON.parse(o);
} catch (e) {
return void i("Некорректный формат ответа от сервера.", e);
}
s(o, e);
}), setTimeout(function() {
n.send(a);
}, 0), n;
}
var n = i(147), o = i(156);
document.addEventListener("xhrfail", function(t) {
new n.Error(t.reason);
}), t.exports = s;
},
156: function(t, e) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
158: function(t, e, i) {
"use strict";
function s(t) {
return null != t && "" !== t;
}
function n(t) {
return (Array.isArray(t) ? t.map(n) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(s).join(" ");
}
function o(t) {
return a[t] || t;
}
function r(t) {
var e = (t + "").replace(c, o);
return e === "" + t ? t : e;
}
e.merge = function l(t, e) {
if (1 === arguments.length) {
for (var i = t[0], n = 1; n < t.length; n++) i = l(i, t[n]);
return i;
}
var o = t.class, r = e.class;
(o || r) && (o = o || [], r = r || [], Array.isArray(o) || (o = [ o ]), Array.isArray(r) || (r = [ r ]), 
t.class = o.concat(r).filter(s));
for (var a in e) "class" != a && (t[a] = e[a]);
return t;
}, e.joinClasses = n, e.cls = function(t, i) {
for (var s = [], o = 0; o < t.length; o++) i && i[o] ? s.push(e.escape(n([ t[o] ]))) : s.push(n(t[o]));
var r = n(s);
return r.length ? ' class="' + r + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, i, s, n) {
return "style" === t && (i = e.style(i)), "boolean" == typeof i || null == i ? i ? " " + (n ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof i ? (-1 !== JSON.stringify(i).indexOf("&"), 
i && "function" == typeof i.toISOString, " " + t + "='" + JSON.stringify(i).replace(/'/g, "&apos;") + "'") : s ? (i && "function" == typeof i.toISOString, 
" " + t + '="' + e.escape(i) + '"') : (i && "function" == typeof i.toISOString, 
" " + t + '="' + i + '"');
}, e.attrs = function(t, i) {
var s = [], o = Object.keys(t);
if (o.length) for (var r = 0; r < o.length; ++r) {
var a = o[r], c = t[a];
"class" == a ? (c = n(c)) && s.push(" " + a + '="' + c + '"') : s.push(e.attr(a, c, !1, i));
}
return s.join("");
};
var a = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, c = /[&<>"]/g;
e.escape = r, e.rethrow = function h(t, e, s, n) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || n)) throw t.message += " on line " + s, 
t;
try {
n = n || i(116).readFileSync(e, "utf8");
} catch (o) {
h(t, null, s);
}
var r = 3, a = n.split("\n"), c = Math.max(s - r, 0), l = Math.min(a.length, s + r), r = a.slice(c, l).map(function(t, e) {
var i = e + c + 1;
return (i == s ? "  > " : "    ") + i + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + s + "\n" + r + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
},
161: function(t, e, i) {
"use strict";
function s(t) {
t.bem = n, t.thumb = o;
}
var n = i(162)(), o = i(163).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, s(e), t(e);
};
},
162: function(t, e, i) {
"use strict";
var s = i(158);
t.exports = function(t) {
function e(t, e, i, n, o) {
var r = o || "div";
switch (r) {
case "img":
i.alt && !i.title && (i.title = ""), i.title && !i.alt && (i.alt = i.title), i.alt || (i.alt = "");
break;

case "input":
i.type || (i.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
i.href || (i.href = "#");
}
t.push("<" + r + s.attrs(s.merge([ i ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(r) && t.push("</" + r + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(i, s, n, o) {
var r = this.block, a = this.attributes || {};
if (!a.class && n && !o) throw Error("Block without class: " + n);
if (a.class) {
var c = a.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var l;
try {
l = c[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (h) {
throw Error("Incorrect bem class: " + c[0]);
}
o ? c[0] = s[s.length - 1] + t.element + c[0] : s[s.length] = l;
var u = (o ? s[s.length - 1] + t.element : "") + l;
-1 === c.indexOf(u) && (c[c.length] = u);
for (var d = 0; d < c.length; d++) {
var f = c[d];
f.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? c[d] = u + f : f.match(RegExp("^" + t.element)) && (s[s.length - 2] ? c[d] = s[s.length - 2] + f : c[d] = s[s.length - 1] + f), 
c[d].match(RegExp("^" + u + "($|(?=" + t.element + "|" + t.modifier + "))")) && (c[d] = t.prefix + c[d]);
}
a.class = c.sort().join(" ");
}
e(i, r, a, s, n), o || s.pop();
};
};
},
163: function(t, e) {
"use strict";
e.thumb = function(t, e, i) {
if (!t) return t;
var s = window.devicePixelRatio;
e *= s, i *= s;
var n = 160 >= e && 160 >= i ? "t" : 320 >= e && 320 >= i ? "m" : 640 >= e && 640 >= i ? "i" : 1024 >= e && 1024 >= i ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + n + t.slice(t.lastIndexOf("."));
};
},
165: function(t, e, i) {
"use strict";
function s(t) {
function e(t) {
var e = new FormData();
e.append("photo", t);
var i = r({
method: "POST",
url: "/imgur/upload",
body: e,
noDocumentEvents: !0,
normalStatuses: [ 200, 400 ]
});
i.addEventListener("loadstart", function() {
d.start(), c();
}), i.addEventListener("loadend", function() {
d.stop(), l();
}), i.addEventListener("fail", function(t) {
new o.Error("Ошибка загрузки: " + t.reason);
}), i.addEventListener("success", function(t) {
400 == i.status ? new o.Error("Неверный тип файла или изображение повреждено.") : s(t.result);
});
}
var i = t.elem, s = t.onSuccess, c = t.onLoadStart, l = t.onLoadEnd, h = i.querySelector("a"), u = i.querySelector("i");
i.querySelector("input");
h.onclick = function(t) {
t.preventDefault(), n({
minSize: 160,
onSuccess: e
});
};
var d = new a({
elem: u,
size: "small"
});
}
var n = i(166).promptSquarePhoto, o = i(147), r = i(155), a = i(150);
t.exports = s;
},
166: function(t, e, i) {
"use strict";
e.promptSquarePhoto = i(167);
},
167: function(t, e, i) {
"use strict";
var s = i(147), n = i(168);
t.exports = function(t) {
var e = t.minSize, i = t.onSuccess, o = document.createElement("input");
o.type = "file", o.accept = "image/*", o.onchange = function() {
o.remove();
var t = new FileReader(), r = o.files[0];
t.onload = function(t) {
var o = new Image();
o.onload = function() {
o.height < e || o.width < e ? new s.Error("Изображение должно иметь размер " + e + "x" + e + " или больше") : o.width == o.height ? i(r) : n(o, function(t) {
i(t);
});
}, o.onerror = function() {
new s.Error("Ошибка при загрузке или изображдение повреждено.");
}, o.src = t.target.result;
}, t.readAsDataURL(r);
}, o.hidden = !0, document.body.appendChild(o), o.click();
};
},
168: function(t, e, i) {
"use strict";
var s = i(153), n = i(169), o = i(161), r = e.PhotoCut = i(170);
i(124), t.exports = function(t, e) {
function i() {
var t = u.getCanvasSelection();
if (t) {
var i = document.createElement("canvas");
i.width = t.size, i.height = t.size, i.getContext("2d").drawImage(t.source, t.x, t.y, t.size, t.size, 0, 0, t.size, t.size), 
a.remove(), i.toBlob(function(t) {
e(t);
}, "image/jpeg");
}
}
var a = new s();
a.setContent(o(n));
var c = a.elem.querySelector(".photo-cut__canvas");
c.focus();
for (var l = a.elem.querySelectorAll(".photo-cut__selection-canvas"), h = 0; h < l.length; h++) l[h].width = l[h].offsetWidth, 
l[h].height = l[h].offsetHeight;
var u = new r(c, {
maxImageSize: 300
});
u.setImage(t), c.addEventListener("selection", function(t) {
for (var e = u.getCanvasSelection(), i = 0; i < l.length; i++) {
var s = l[i];
s.getContext("2d").clearRect(0, 0, s.width, s.height), e && s.getContext("2d").drawImage(e.source, e.x, e.y, e.size, e.size, 0, 0, s.width, s.height);
}
}), u.setSelection({
x: .1 * c.width,
size: .8 * Math.min(u.width, u.height),
y: .1 * c.height
}), a.elem.querySelector('[data-action="rotate-right"]').addEventListener("click", function() {
return u.rotate(1);
}), a.elem.querySelector("[data-form]").addEventListener("submit", function(t) {
t.preventDefault(), i();
}), c.addEventListener("submit", function(t) {
i();
});
};
},
169: function(t, e, i) {
var s = i(158);
t.exports = function(t) {
var e, i = [], n = {}, o = t || {};
return function(t) {
i.push("");
var o = [];
n.b = e = function(e, s, n) {
this && this.block, this && this.attributes || {};
t.call(this, i, o, e, s, n);
}, n.e = e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: s.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
i.push("Выберите миниатюру");
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
i.push("Сохранить");
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
i.push("Отмена");
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
}.call(this, "bem" in o ? o.bem : "undefined" != typeof bem ? bem : void 0), i.join("");
};
},
170: function(t, e, i) {
"use strict";
function s(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var n = function() {
function t(t, e) {
for (var i = 0; i < e.length; i++) {
var s = e[i];
s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
Object.defineProperty(t, s.key, s);
}
}
return function(e, i, s) {
return i && t(e.prototype, i), s && t(e, s), e;
};
}(), o = i(171), r = function() {
function t(e) {
var i = this, n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = n.maxImageSize;
s(this, t), this.maxImageSize = o || 200, this.canvas = e, this.canvas.onmousedown = function(t) {
return i.onMouseDown(t);
}, this.canvas.onmouseup = function(t) {
return i.onMouseUp(t);
}, this.canvas.onkeydown = function(t) {
return i.onKeyDown(t);
}, document.addEventListener("mousemove", function(t) {
return i.onMouseMove(t);
}), this.ctx = e.getContext("2d"), this.state = !1, this.mouseDownShift = null, 
this.selectionStartCoords = null, this.rotation = 0, this.selection = null, this.cornerSize = 5;
}
return n(t, [ {
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
var e = this.getEventCoordsRelativeCanvasImage(t), i = this.findCoordsInSelection(e);
switch (i) {
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
var e = this.selection.center, i = t.x < e.x && t.y < e.y ? "nw" : t.x < e.x && t.y >= e.y ? "sw" : t.x > e.x && t.y < e.y ? "ne" : "se";
switch (i) {
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
var e = Math.min(t.x - this.mouseDownShift.x, this.width - this.selection.size), i = Math.min(t.y - this.mouseDownShift.y, this.height - this.selection.size);
0 > e && (e = 0), 0 > i && (i = 0), this.setSelection({
x: e,
y: i,
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
var e = Math.max(Math.abs(this.selectionStartCoords.x - t.x), Math.abs(this.selectionStartCoords.y - t.y)), i = {};
t.x >= this.selectionStartCoords.x ? t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "se-resize", 
i.size = Math.min(e, this.height - this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
i.x = this.selectionStartCoords.x, i.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "ne-resize", 
i.size = Math.min(e, this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
i.x = this.selectionStartCoords.x, i.y = this.selectionStartCoords.y - i.size) : t.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "sw-resize", 
i.size = Math.min(e, this.selectionStartCoords.x, this.height - this.selectionStartCoords.y), 
i.x = this.selectionStartCoords.x - i.size, i.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "nw-resize", 
i.size = Math.min(e, this.selectionStartCoords.x, this.selectionStartCoords.y), 
i.x = this.selectionStartCoords.x - i.size, i.y = this.selectionStartCoords.y - i.size), 
this.setSelection(i);
}
}, {
key: "onMouseUp",
value: function(t) {
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
var t = Math.floor(this.selection.x), e = Math.floor(this.selection.y), i = Math.ceil(this.selection.size);
this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", this.ctx.fillRect(0, 0, this.width, e), 
this.ctx.fillRect(0, e, t, this.height - e), this.ctx.fillRect(t + i, e, this.width - (t + i), i), 
this.ctx.fillRect(t, e + i, this.width - t, this.height - (e + i)), this.renderCorner("nw"), 
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
t.exports = r;
},
171: function(t, e) {
"use strict";
function i(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var s = function() {
function t(t, e) {
for (var i = 0; i < e.length; i++) {
var s = e[i];
s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
Object.defineProperty(t, s.key, s);
}
}
return function(e, i, s) {
return i && t(e.prototype, i), s && t(e, s), e;
};
}(), n = function() {
function t(e) {
var s = e.x, n = e.y, o = e.size;
i(this, t), this.x = s, this.y = n, this.size = o;
}
return s(t, [ {
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
t.exports = n;
}
});
//# sourceMappingURL=coursesFeedbackEdit.718527394608b9fb1793.js.map
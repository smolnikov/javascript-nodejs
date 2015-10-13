var profile = webpackJsonp_name_([ 10 ], [ function(t, e, n) {
"use strict";
var r = n(2), i = (n(23), n(48)), a = n(54), o = r.module("profile", [ "ui.router", "ngResource", "global403Interceptor", "ajoslin.promise-tracker", "progress", "focusOn", "ngMessages" ]);
n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41), 
n(29), n(42), n(43), n(44), n(45), n(46), n(47), o.filter("unsafe_html", [ "$sce", function(t) {
return function(e) {
return t.trustAsHtml(e);
};
} ]).filter("capitalize", function() {
return function(t) {
return t[0].toUpperCase() + t.slice(1);
};
}).filter("longDate", function() {
return function(t, e) {
return t = i(t), void 0 !== e && (t = t.utcOffset(e)), t.format("D MMMM YYYY в LT");
};
}).filter("shortDate", function() {
return function(t, e) {
return t = i(t), void 0 !== e && (t = t.utcOffset(e)), t.format("D MMM YYYY");
};
}).filter("quizDuration", function() {
return function(t) {
var e = Math.round(t / 1e3);
return i.duration(e, "seconds").humanize();
};
}).filter("pluralize", function() {
return a;
}).filter("trust_html", [ "$sce", function(t) {
return function(e) {
return e = t.trustAsHtml(e);
};
} ]);
}, function(t, e, n) {
"use strict";
e.promptSquarePhoto = n(81);
}, function(t) {
t.exports = angular;
}, , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").config([ "$locationProvider", "$stateProvider", "$urlRouterProvider", function(t, e, n) {
t.html5Mode(!0), n.otherwise("/"), e.state("root", {
"abstract": !0,
resolve: {
me: [ "Me", function(t) {
return t.get();
} ]
},
templateUrl: "/profile/templates/partials/root",
controller: "ProfileRootCtrl"
});
var r = {
"root.aboutme": {
url: "/",
title: "Публичный профиль",
templateUrl: "/profile/templates/partials/aboutme",
controller: "ProfileAboutMeCtrl"
},
"root.account": {
url: "/account",
title: "Аккаунт",
templateUrl: "/profile/templates/partials/account",
controller: "ProfileAccountCtrl"
},
"root.quiz": {
url: "/quiz",
title: "Тесты",
templateUrl: "/profile/templates/partials/quiz",
controller: "ProfileQuizResultsCtrl",
resolve: {
quizResults: [ "QuizResults", function(t) {
return t.query();
} ]
}
},
"root.orders": {
url: "/orders",
title: "Заказы",
templateUrl: "/profile/templates/partials/orders",
controller: "ProfileOrdersCtrl",
resolve: {
orders: [ "Orders", function(t) {
return t.query();
} ]
}
},
"root.courses": {
url: "/courses",
title: "Курсы",
templateUrl: "/profile/templates/partials/courseGroups",
controller: "ProfileCourseGroupsCtrl",
resolve: {
courseGroups: [ "CourseGroups", function(t) {
return t.query();
} ]
}
}
};
for (var i in r) e.state(i, r[i]);
} ]);
}, function(t, e, n) {
"use strict";
var r = n(23), i = n(2), a = n(135);
i.module("profile").directive("profileField", [ "promiseTracker", "$http", "$timeout", function(t, e, n) {
return {
templateUrl: "/profile/templates/partials/profileField",
scope: {
title: "@fieldTitle",
name: "@fieldName",
formatValue: "=?fieldFormatValue",
value: "=fieldValue"
},
replace: !0,
transclude: !0,
link: function(o, s, u, c, l) {
o.formatValue || (o.formatValue = function(t) {
return "" === t || null === t || void 0 === t ? t : a(t);
}), o.loadingTracker = t(), o.edit = function(t) {
t.target.closest("a") || this.editing || (this.editing = !0, this.editingValue = this.value);
}, o.submit = function() {
var t = this;
if (!this.form.$invalid) {
if (this.value == this.editingValue) return this.editing = !1, void (this.editingValue = "");
var n = new FormData();
n.append(this.name, this.editingValue), e({
method: "PATCH",
url: "/users/me",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: n
}).then(function() {
if ("displayName" == t.name) new r.Success("Ваше имя пользователя изменено.", "slow"); else if ("email" == t.name) new r.Warning("Требуется подтвердить смену email, проверьте почту.", "slow"); else if ("profileName" == t.name) {
new r.Success("Ваш профиль доступен по новому адресу, страница будет перезагружена");
var e = t.editingValue;
setTimeout(function() {
window.location.href = "/profile/" + e + "/account";
}, 2e3);
} else new r.Success("Информация обновлена.");
t.editing = !1, t.value = t.editingValue, t.editingValue = "";
}, function(t) {
400 == t.status ? new r.Error(t.data.message) : 409 == t.status ? new r.Error(t.data.message) : new r.Error("Ошибка загрузки, статус " + t.status);
});
}
}, o.cancel = function() {
var t = this;
this.editing && n(function() {
t.editing = !1, t.editingValue = "";
});
}, l(o, function(t) {
s[0].querySelector("[control-transclude]").append(t[0]);
});
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("orderParticipants", [ "promiseTracker", "$http", "$timeout", function(t, e) {
return {
templateUrl: "/profile/templates/partials/orderParticipants",
scope: {
order: "="
},
replace: !0,
link: function(n) {
function a(t) {
for (var e = [], r = 0; r < t.participants.length; r++) {
var i = t.participants[r], a = !n.participants.some(function(t) {
return t.email == i.email;
});
a && e.push(i.email);
}
return e;
}
for (n.participants = i.copy(n.order.participants); n.participants.length != n.order.count; ) n.participants.push({
inGroup: !1,
email: ""
});
n.loadingTracker = t(), n.onEmailKeyDown = function(t) {
if (13 == t.keyCode) {
var e = t.target.name.split("_");
e.push(+e.pop() + 1), e = e.join("_");
var n = document.getElementById(e);
n && n.focus();
}
}, n.submit = function() {
if (!this.participantsForm.$invalid) {
if ("success" == n.order.status) {
var t = a(n.order), o = confirm("Вы удалили участников, которые получили приглашения на курс: " + t + ".\nПри продолжении их приглашения станут недействительными.\nПродолжить?");
if (!o) return;
}
var s = new FormData();
s.append("orderNumber", n.order.number);
var u = n.participants.map(function(t) {
return t.inGroup ? void 0 : t.email;
}).filter(Boolean);
s.append("emails", u), e({
method: "PATCH",
url: "/payments/common/order",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: s
}).then(function(t) {
new r.Success(t.data), n.order.participants = i.copy(n.participants);
}, function(t) {
400 == t.status ? new r.Error(t.data.message) : new r.Error("Ошибка загрузки, статус " + t.status);
});
}
};
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("orderContact", [ "promiseTracker", "$http", "$timeout", function(t, e) {
return {
templateUrl: "/profile/templates/partials/orderContact",
scope: {
order: "="
},
replace: !0,
link: function(n) {
n.contactName = n.order.contactName, n.contactPhone = n.order.contactPhone, n.loadingTracker = t(), 
n.submit = function() {
if (!this.contactForm.$invalid) {
var t = new FormData();
t.append("orderNumber", n.order.number), t.append("contactName", n.contactName), 
t.append("contactPhone", n.contactPhone), e({
method: "PATCH",
url: "/payments/common/order",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: t
}).then(function() {
new r.Success("Информация обновлена."), n.order.contactName = n.contactName, n.order.contactPhone = n.contactPhone;
}, function(t) {
400 == t.status ? new r.Error(t.data.message) : new r.Error("Ошибка загрузки, статус " + t.status);
});
}
};
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = n(23), i = n(2), a = n(56).thumb, o = n(1).promptSquarePhoto;
i.module("profile").directive("profilePhoto", [ "promiseTracker", "$http", function(t, e) {
return {
templateUrl: "/profile/templates/partials/profilePhoto",
scope: {
photo: "=",
teachesCourses: "="
},
replace: !0,
link: function(n) {
function a(t) {
var a = new FormData();
a.append("photo", t), e({
method: "POST",
url: "/imgur/upload",
headers: {
"Content-Type": void 0
},
tracker: n.loadingTracker,
transformRequest: i.identity,
data: a
}).then(function(t) {
return e({
method: "PATCH",
url: "/users/me",
tracker: n.loadingTracker,
data: {
photoId: t.data.imgurId
}
});
}).then(function(t) {
n.photo = t.data.photo, new r.Success("Изображение обновлено.");
}, function(t) {
400 == t.status && new r.Error("Неверный тип файла или изображение повреждено.");
});
}
n.loadingTracker = t(), n.changePhoto = function() {
o({
minSize: 160,
onSuccess: a
});
};
}
};
} ]).filter("thumb", function() {
return a;
});
}, function(t, e, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("profilePassword", [ "promiseTracker", "$http", "$timeout", function(t, e, n) {
return {
templateUrl: "/profile/templates/partials/profilePassword",
scope: {
hasPassword: "="
},
replace: !0,
link: function(a, o) {
a.password = "", a.passwordOld = "", a.loadingTracker = t(), a.edit = function() {
this.editing || (this.editing = !0, n(function() {
var t = o[0].elements[a.hasPassword ? "passwordOld" : "password"];
t.focus();
}));
}, a.submit = function() {
if (!a.form.$invalid) {
var t = new FormData();
t.append("password", this.password), t.append("passwordOld", this.passwordOld), 
e({
method: "PATCH",
url: "/users/me",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: t
}).then(function() {
new r.Success("Пароль обновлён."), a.editing = !1, a.hasPassword = !0, a.password = "", 
a.passwordOld = "", a.form.$setPristine();
}, function(t) {
400 == t.status ? new r.Error(t.data.message || t.data.errors.password) : new r.Error("Ошибка загрузки, статус " + t.status);
});
}
}, a.cancel = function() {
var t = this;
this.editing && n(function() {
t.editing = !1;
});
};
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = (n(23), n(2));
n(72), r.module("profile").directive("profileAuthProviders", [ "promiseTracker", "$http", "authPopup", "Me", function(t, e, n, r) {
return {
templateUrl: "/profile/templates/partials/profileAuthProviders",
replace: !0,
link: function(t) {
t.connect = function(e) {
arguments;
n("/auth/connect/" + e, function() {
t.me = r.get();
}, function() {});
}, t.connected = function(e) {
var n = !1;
return t.me.providers ? (t.me.providers.forEach(function(t) {
t.name == e && (n = !0);
}), n) : !1;
};
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").directive("dateValidator", function() {
return {
require: "ngModel",
link: function(t, e, n, r) {
r.$validators.date = function(t, e) {
var n = t || e;
if (!n) return !0;
var r = n.split(".");
if (3 != r.length) return !1;
var i = new Date(r[2], r[1] - 1, r[0]);
return 4 != r[2].length ? !1 : i.getFullYear() == r[2] && i.getMonth() == r[1] - 1 && i.getDate() == r[0];
};
}
};
});
}, function(t, e, n) {
"use strict";
var r = (n(23), n(2)), i = n(48);
r.module("profile").directive("dateRangeValidator", function() {
return {
require: "ngModel",
link: function(t, e, n, r) {
var a = n.dateRangeValidator.split("-"), o = a[0] ? i(a[0], "DD.MM.YYYY").toDate() : new Date(), s = a[1] ? i(a[1], "DD.MM.YYYY").toDate() : new Date();
r.$validators.dateRange = function(t, e) {
var n = t || e;
if (!n) return !0;
var r = n.split(".");
if (3 != r.length) return !1;
var i = new Date(r[2], r[1] - 1, r[0]);
return 4 != r[2].length ? !1 : i >= o && s >= i;
};
}
};
});
}, function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile");
r.module("profile").factory("Me", [ "$resource", function(t) {
return t("/users/me", {}, {
get: {
method: "GET",
transformResponse: function(t) {
return t = JSON.parse(t), t.created = new Date(t.created), t;
}
}
});
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").factory("QuizResults", [ "$resource", function(t) {
return t("/quiz/results/user/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(t) {
return t = JSON.parse(t), t.forEach(function(t) {
t.created = new Date(t.created);
}), t;
}
}
});
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").factory("Orders", [ "$resource", function(t) {
return t("/payments/common/orders/user/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(t) {
return t = JSON.parse(t), t.forEach(function(t) {
t.created = new Date(t.created), t.countDetails = {
free: t.count - t.participants.length,
busy: t.participants.length,
inGroup: t.participants.filter(function(t) {
return t.inGroup;
}).length
};
}), t;
}
}
});
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").factory("CourseGroups", [ "$resource", function(t) {
return t("/courses/profile/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(t) {
return t = JSON.parse(t), t.forEach(function(t) {
t.dateStart = new Date(t.dateStart), t.dateEnd = new Date(t.dateEnd);
}), t;
}
}
});
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = r.module("profile");
i.controller("ProfileRootCtrl", [ "$scope", "$state", "$timeout", "$http", "me", "promiseTracker", function(t, e, n, r, i, a) {
t.me = i, t.loadingTracker = a();
var o = [ "root.aboutme", "root.account" ];
window.currentUser.profileTabsEnabled.forEach(function(t) {
o.push("root." + t);
}), t.tabs = o.map(function(t) {
var n = e.get(t);
return {
title: n.title,
name: n.name,
url: n.url
};
});
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = n(23), a = (n(48), r.module("profile"));
a.controller("ProfileOrdersCtrl", [ "$scope", "$http", "$window", "orders", function(t, e, n, a) {
t.orders = a, t.changePayment = function(t) {
n.location.href = "/courses/orders/" + t.number + "?changePayment=1";
}, t.cancelOrder = function(t) {
var n = confirm("Заказ будет отменён, без возможности восстановления. Продолжать?");
if (n) {
var o = new FormData();
o.append("orderNumber", t.number), e({
method: "DELETE",
url: "/payments/common/order",
headers: {
"Content-Type": void 0
},
transformRequest: r.identity,
data: o
}).then(function() {
a.splice(a.indexOf(t), 1), new i.Success("Заказ удалён.");
}, function(t) {
400 == t.status ? new i.Error(t.data.message) : new i.Error("Ошибка загрузки, статус " + t.status);
});
}
};
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = (n(23), r.module("profile"));
i.controller("ProfileCourseGroupsCtrl", [ "$scope", "$http", "$window", "courseGroups", function(t, e, n, r) {
t.courseGroups = r;
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = r.module("profile");
n(136);
i.controller("ProfileAboutMeCtrl", [ "$scope", "me", function(t, e) {
t.me = e, t.renderParagraphsAndLinks = n(136);
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = r.module("profile");
i.controller("ProfileQuizResultsCtrl", [ "$scope", "quizResults", function(t, e) {
t.quizResults = e;
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = n(23), a = (n(48), r.module("profile"));
a.controller("ProfileAccountCtrl", [ "$scope", "$http", "me", "Me", function(t, e, n, a) {
t.me = n, t.remove = function() {
var a = confirm(n.displayName + " (" + n.email + ") - удалить пользователя без возможности восстановления?");
a && e({
method: "DELETE",
url: "/users/me",
tracker: t.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: r.identity,
data: new FormData()
}).then(function() {
new i.Success("Пользователь удалён."), setTimeout(function() {
window.location.href = "/";
}, 1500);
}, function(t) {
new i.Error("Ошибка загрузки, статус " + t.status);
});
}, t.removeProvider = function(n) {
var r = confirm(n + " - удалить привязку?");
r && e({
method: "POST",
url: "/auth/disconnect/" + n,
tracker: this.loadingTracker
}).then(function() {
t.me = a.get();
}, function(t) {
new i.Error("Ошибка загрузки, статус " + t.status);
});
};
} ]);
}, function(t, e, n) {
"use strict";
n(83), t.exports = n(86);
}, function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.thumb = a;
}
var i = n(78)(), a = n(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
}, , , , , function(t) {
"use strict";
function e(t) {
return t % 10 == 1 && t % 100 != 11 ? "one" : t % 10 >= 2 && 4 >= t % 10 && (12 > t % 100 || t % 100 > 14) && t == Math.floor(t) ? "few" : t % 10 === 0 || t % 10 >= 5 && 9 >= t % 10 || t % 100 >= 11 && 14 >= t % 100 && t == Math.floor(t) ? "many" : "other";
}
function n(t, n, r, i) {
var a = e(t);
switch (a) {
case "one":
return n;

case "few":
return r;

case "many":
return i;

default:
throw Error("Unsupported count: " + t);
}
}
t.exports = n;
}, , function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
}, , , , , , , , , , , , , , , , function(t, e, n) {
"use strict";
var r = n(2);
r.module("profile").service("authPopup", function() {
var t;
return function(e, n, r) {
t && !t.closed && t.close();
var i = 800, a = 600, o = (window.outerHeight - a) / 2, s = (window.outerWidth - i) / 2;
window.authForm = {
onAuthSuccess: n,
onAuthFailure: r
}, t = window.open(e, "authForm", "width=" + i + ",height=" + a + ",scrollbars=0,top=" + o + ",left=" + s);
};
});
}, , , , , , function(t, e, n) {
"use strict";
var r = n(108);
t.exports = function(t) {
function e(t, e, n, i, a) {
var o = a || "div";
switch (o) {
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
t.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && t.push("</" + o + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, a) {
var o = this.block, s = this.attributes || {};
if (!s.class && i && !a) throw Error("Block without class: " + i);
if (s.class) {
var u = s.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var c;
try {
c = u[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
a ? u[0] = r[r.length - 1] + t.element + u[0] : r[r.length] = c;
var f = (a ? r[r.length - 1] + t.element : "") + c;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var h = 0; h < u.length; h++) {
var d = u[h];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? u[h] = f + d : d.match(RegExp("^" + t.element)) && (r[r.length - 2] ? u[h] = r[r.length - 2] + d : u[h] = r[r.length - 1] + d), 
u[h].match(RegExp("^" + f + "($|(?=" + t.element + "|" + t.modifier + "))")) && (u[h] = t.prefix + u[h]);
}
s.class = u.sort().join(" ");
}
e(n, o, s, r, i), a || r.pop();
};
};
}, , , function(t, e, n) {
"use strict";
var r = n(23), i = n(111);
t.exports = function(t) {
var e = t.minSize, n = t.onSuccess, a = document.createElement("input");
a.type = "file", a.accept = "image/*", a.onchange = function() {
a.remove();
var t = new FileReader(), o = a.files[0];
t.onload = function(t) {
var a = new Image();
a.onload = function() {
a.height < e || a.width < e ? new r.Error("Изображение должно иметь размер " + e + "x" + e + " или больше") : a.width == a.height ? n(o) : i(a, function(t) {
n(t);
});
}, a.onerror = function() {
new r.Error("Ошибка при загрузке или изображдение повреждено.");
}, a.src = t.target.result;
}, t.readAsDataURL(o);
}, a.hidden = !0, document.body.appendChild(a), a.click();
};
}, , function(t, e, n) {
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
!function(t, e) {
e(n(86));
}(this, function(t) {
"use strict";
function e(t, e) {
var n = t.split("_");
return e % 10 === 1 && e % 100 !== 11 ? n[0] : e % 10 >= 2 && 4 >= e % 10 && (10 > e % 100 || e % 100 >= 20) ? n[1] : n[2];
}
function n(t, n, r) {
var i = {
mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
hh: "час_часа_часов",
dd: "день_дня_дней",
MM: "месяц_месяца_месяцев",
yy: "год_года_лет"
};
return "m" === r ? n ? "минута" : "минуту" : t + " " + e(i[r], +t);
}
function r(t, e) {
var n = {
nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
}, r = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(e) ? "accusative" : "nominative";
return n[r][t.month()];
}
function i(t, e) {
var n = {
nominative: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
accusative: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
}, r = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(e) ? "accusative" : "nominative";
return n[r][t.month()];
}
function a(t, e) {
var n = {
nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
}, r = /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/.test(e) ? "accusative" : "nominative";
return n[r][t.day()];
}
var o = t.defineLocale("ru", {
months: r,
monthsShort: i,
weekdays: a,
weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
monthsParse: [ /^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[й|я]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i ],
longDateFormat: {
LT: "HH:mm",
LTS: "HH:mm:ss",
L: "DD.MM.YYYY",
LL: "D MMMM YYYY г.",
LLL: "D MMMM YYYY г., HH:mm",
LLLL: "dddd, D MMMM YYYY г., HH:mm"
},
calendar: {
sameDay: "[Сегодня в] LT",
nextDay: "[Завтра в] LT",
lastDay: "[Вчера в] LT",
nextWeek: function() {
return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
},
lastWeek: function(t) {
if (t.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
switch (this.day()) {
case 0:
return "[В прошлое] dddd [в] LT";

case 1:
case 2:
case 4:
return "[В прошлый] dddd [в] LT";

case 3:
case 5:
case 6:
return "[В прошлую] dddd [в] LT";
}
},
sameElse: "L"
},
relativeTime: {
future: "через %s",
past: "%s назад",
s: "несколько секунд",
m: n,
mm: n,
h: "час",
hh: n,
d: "день",
dd: n,
M: "месяц",
MM: n,
y: "год",
yy: n
},
meridiemParse: /ночи|утра|дня|вечера/i,
isPM: function(t) {
return /^(дня|вечера)$/.test(t);
},
meridiem: function(t) {
return 4 > t ? "ночи" : 12 > t ? "утра" : 17 > t ? "дня" : "вечера";
},
ordinalParse: /\d{1,2}-(й|го|я)/,
ordinal: function(t, e) {
switch (e) {
case "M":
case "d":
case "DDD":
return t + "-й";

case "D":
return t + "-го";

case "w":
case "W":
return t + "-я";

default:
return t;
}
},
week: {
dow: 1,
doy: 7
}
});
return o;
});
}, , , function(t, e, n) {
(function(t) {
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(e, n) {
t.exports = n();
}(this, function() {
"use strict";
function e() {
return Ln.apply(null, arguments);
}
function n(t) {
Ln = t;
}
function r(t) {
return "[object Array]" === Object.prototype.toString.call(t);
}
function i(t) {
return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
}
function a(t, e) {
var n, r = [];
for (n = 0; n < t.length; ++n) r.push(e(t[n], n));
return r;
}
function o(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}
function s(t, e) {
for (var n in e) o(e, n) && (t[n] = e[n]);
return o(e, "toString") && (t.toString = e.toString), o(e, "valueOf") && (t.valueOf = e.valueOf), 
t;
}
function u(t, e, n, r) {
return At(t, e, n, r, !0).utc();
}
function c() {
return {
empty: !1,
unusedTokens: [],
unusedInput: [],
overflow: -2,
charsLeftOver: 0,
nullInput: !1,
invalidMonth: null,
invalidFormat: !1,
userInvalidated: !1,
iso: !1
};
}
function l(t) {
return null == t._pf && (t._pf = c()), t._pf;
}
function f(t) {
if (null == t._isValid) {
var e = l(t);
t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), 
t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour);
}
return t._isValid;
}
function h(t) {
var e = u(NaN);
return null != t ? s(l(e), t) : l(e).userInvalidated = !0, e;
}
function d(t, e) {
var n, r, i;
if (void 0 !== e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), 
void 0 !== e._i && (t._i = e._i), void 0 !== e._f && (t._f = e._f), void 0 !== e._l && (t._l = e._l), 
void 0 !== e._strict && (t._strict = e._strict), void 0 !== e._tzm && (t._tzm = e._tzm), 
void 0 !== e._isUTC && (t._isUTC = e._isUTC), void 0 !== e._offset && (t._offset = e._offset), 
void 0 !== e._pf && (t._pf = l(e)), void 0 !== e._locale && (t._locale = e._locale), 
Rn.length > 0) for (n in Rn) r = Rn[n], i = e[r], void 0 !== i && (t[r] = i);
return t;
}
function p(t) {
d(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), jn === !1 && (jn = !0, 
e.updateOffset(this), jn = !1);
}
function m(t) {
return t instanceof p || null != t && null != t._isAMomentObject;
}
function v(t) {
return 0 > t ? Math.ceil(t) : Math.floor(t);
}
function g(t) {
var e = +t, n = 0;
return 0 !== e && isFinite(e) && (n = v(e)), n;
}
function y(t, e, n) {
var r, i = Math.min(t.length, e.length), a = Math.abs(t.length - e.length), o = 0;
for (r = 0; i > r; r++) (n && t[r] !== e[r] || !n && g(t[r]) !== g(e[r])) && o++;
return o + a;
}
function $() {}
function b(t) {
return t ? t.toLowerCase().replace("_", "-") : t;
}
function w(t) {
for (var e, n, r, i, a = 0; a < t.length; ) {
for (i = b(t[a]).split("-"), e = i.length, n = b(t[a + 1]), n = n ? n.split("-") : null; e > 0; ) {
if (r = E(i.slice(0, e).join("-"))) return r;
if (n && n.length >= e && y(i, n, !0) >= e - 1) break;
e--;
}
a++;
}
return null;
}
function E(e) {
var n = null;
if (!qn[e] && void 0 !== t && t && t.exports) try {
n = Nn._abbr, !function() {
var t = Error('Cannot find module "./locale"');
throw t.code = "MODULE_NOT_FOUND", t;
}(), k(n);
} catch (r) {}
return qn[e];
}
function k(t, e) {
var n;
return t && (n = void 0 === e ? x(t) : S(t, e), n && (Nn = n)), Nn._abbr;
}
function S(t, e) {
return null !== e ? (e.abbr = t, qn[t] = qn[t] || new $(), qn[t].set(e), k(t), qn[t]) : (delete qn[t], 
null);
}
function x(t) {
var e;
if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Nn;
if (!r(t)) {
if (e = E(t)) return e;
t = [ t ];
}
return w(t);
}
function _(t, e) {
var n = t.toLowerCase();
Fn[n] = Fn[n + "s"] = Fn[e] = t;
}
function C(t) {
return "string" == typeof t ? Fn[t] || Fn[t.toLowerCase()] : void 0;
}
function T(t) {
var e, n, r = {};
for (n in t) o(t, n) && (e = C(n), e && (r[e] = t[n]));
return r;
}
function A(t, n) {
return function(r) {
return null != r ? (O(this, t, r), e.updateOffset(this, n), this) : M(this, t);
};
}
function M(t, e) {
return t._d["get" + (t._isUTC ? "UTC" : "") + e]();
}
function O(t, e, n) {
return t._d["set" + (t._isUTC ? "UTC" : "") + e](n);
}
function D(t, e) {
var n;
if ("object" == typeof t) for (n in t) this.set(n, t[n]); else if (t = C(t), "function" == typeof this[t]) return this[t](e);
return this;
}
function I(t, e, n) {
var r = "" + Math.abs(t), i = e - r.length, a = t >= 0;
return (a ? n ? "+" : "" : "-") + ("" + Math.pow(10, Math.max(0, i))).substr(1) + r;
}
function P(t, e, n, r) {
var i = r;
"string" == typeof r && (i = function() {
return this[r]();
}), t && (Bn[t] = i), e && (Bn[e[0]] = function() {
return I(i.apply(this, arguments), e[1], e[2]);
}), n && (Bn[n] = function() {
return this.localeData().ordinal(i.apply(this, arguments), t);
});
}
function L(t) {
return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
}
function N(t) {
var e, n, r = t.match(Un);
for (e = 0, n = r.length; n > e; e++) Bn[r[e]] ? r[e] = Bn[r[e]] : r[e] = L(r[e]);
return function(i) {
var a = "";
for (e = 0; n > e; e++) a += r[e] instanceof Function ? r[e].call(i, t) : r[e];
return a;
};
}
function R(t, e) {
return t.isValid() ? (e = j(e, t.localeData()), Vn[e] = Vn[e] || N(e), Vn[e](t)) : t.localeData().invalidDate();
}
function j(t, e) {
function n(t) {
return e.longDateFormat(t) || t;
}
var r = 5;
for (Hn.lastIndex = 0; r >= 0 && Hn.test(t); ) t = t.replace(Hn, n), Hn.lastIndex = 0, 
r -= 1;
return t;
}
function q(t) {
return "function" == typeof t && "[object Function]" === Object.prototype.toString.call(t);
}
function F(t, e, n) {
ar[t] = q(e) ? e : function(t) {
return t && n ? n : e;
};
}
function U(t, e) {
return o(ar, t) ? ar[t](e._strict, e._locale) : RegExp(H(t));
}
function H(t) {
return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, r, i) {
return e || n || r || i;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function V(t, e) {
var n, r = e;
for ("string" == typeof t && (t = [ t ]), "number" == typeof e && (r = function(t, n) {
n[e] = g(t);
}), n = 0; n < t.length; n++) or[t[n]] = r;
}
function B(t, e) {
V(t, function(t, n, r, i) {
r._w = r._w || {}, e(t, r._w, r, i);
});
}
function Y(t, e, n) {
null != e && o(or, t) && or[t](e, n._a, n, t);
}
function z(t, e) {
return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
}
function W(t) {
return this._months[t.month()];
}
function G(t) {
return this._monthsShort[t.month()];
}
function X(t, e, n) {
var r, i, a;
for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
r = 0; 12 > r; r++) {
if (i = u([ 2e3, r ]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), 
this._shortMonthsParse[r] = RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), 
n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), 
this._monthsParse[r] = RegExp(a.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[r].test(t)) return r;
if (n && "MMM" === e && this._shortMonthsParse[r].test(t)) return r;
if (!n && this._monthsParse[r].test(t)) return r;
}
}
function J(t, e) {
var n;
return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (n = Math.min(t.date(), z(t.year(), e)), 
t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t);
}
function K(t) {
return null != t ? (J(this, t), e.updateOffset(this, !0), this) : M(this, "Month");
}
function Z() {
return z(this.year(), this.month());
}
function Q(t) {
var e, n = t._a;
return n && -2 === l(t).overflow && (e = n[ur] < 0 || n[ur] > 11 ? ur : n[cr] < 1 || n[cr] > z(n[sr], n[ur]) ? cr : n[lr] < 0 || n[lr] > 24 || 24 === n[lr] && (0 !== n[fr] || 0 !== n[hr] || 0 !== n[dr]) ? lr : n[fr] < 0 || n[fr] > 59 ? fr : n[hr] < 0 || n[hr] > 59 ? hr : n[dr] < 0 || n[dr] > 999 ? dr : -1, 
l(t)._overflowDayOfYear && (sr > e || e > cr) && (e = cr), l(t).overflow = e), t;
}
function tt(t) {
e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn;
}
function et(t, e) {
var n = !0;
return s(function() {
return n && (tt(t + "\n" + Error().stack), n = !1), e.apply(this, arguments);
}, e);
}
function nt(t, e) {
vr[t] || (tt(e), vr[t] = !0);
}
function rt(t) {
var e, n, r = t._i, i = gr.exec(r);
if (i) {
for (l(t).iso = !0, e = 0, n = yr.length; n > e; e++) if (yr[e][1].exec(r)) {
t._f = yr[e][0];
break;
}
for (e = 0, n = $r.length; n > e; e++) if ($r[e][1].exec(r)) {
t._f += (i[6] || " ") + $r[e][0];
break;
}
r.match(nr) && (t._f += "Z"), Et(t);
} else t._isValid = !1;
}
function it(t) {
var n = br.exec(t._i);
return null !== n ? void (t._d = new Date(+n[1])) : (rt(t), void (t._isValid === !1 && (delete t._isValid, 
e.createFromInputFallback(t))));
}
function at(t, e, n, r, i, a, o) {
var s = new Date(t, e, n, r, i, a, o);
return 1970 > t && s.setFullYear(t), s;
}
function ot(t) {
var e = new Date(Date.UTC.apply(null, arguments));
return 1970 > t && e.setUTCFullYear(t), e;
}
function st(t) {
return ut(t) ? 366 : 365;
}
function ut(t) {
return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
}
function ct() {
return ut(this.year());
}
function lt(t, e, n) {
var r, i = n - e, a = n - t.day();
return a > i && (a -= 7), i - 7 > a && (a += 7), r = Mt(t).add(a, "d"), {
week: Math.ceil(r.dayOfYear() / 7),
year: r.year()
};
}
function ft(t) {
return lt(t, this._week.dow, this._week.doy).week;
}
function ht() {
return this._week.dow;
}
function dt() {
return this._week.doy;
}
function pt(t) {
var e = this.localeData().week(this);
return null == t ? e : this.add(7 * (t - e), "d");
}
function mt(t) {
var e = lt(this, 1, 4).week;
return null == t ? e : this.add(7 * (t - e), "d");
}
function vt(t, e, n, r, i) {
var a, o = 6 + i - r, s = ot(t, 0, 1 + o), u = s.getUTCDay();
return i > u && (u += 7), n = null != n ? 1 * n : i, a = 1 + o + 7 * (e - 1) - u + n, 
{
year: a > 0 ? t : t - 1,
dayOfYear: a > 0 ? a : st(t - 1) + a
};
}
function gt(t) {
var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == t ? e : this.add(t - e, "d");
}
function yt(t, e, n) {
return null != t ? t : null != e ? e : n;
}
function $t(t) {
var e = new Date();
return t._useUTC ? [ e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() ] : [ e.getFullYear(), e.getMonth(), e.getDate() ];
}
function bt(t) {
var e, n, r, i, a = [];
if (!t._d) {
for (r = $t(t), t._w && null == t._a[cr] && null == t._a[ur] && wt(t), t._dayOfYear && (i = yt(t._a[sr], r[sr]), 
t._dayOfYear > st(i) && (l(t)._overflowDayOfYear = !0), n = ot(i, 0, t._dayOfYear), 
t._a[ur] = n.getUTCMonth(), t._a[cr] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = a[e] = r[e];
for (;7 > e; e++) t._a[e] = a[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
24 === t._a[lr] && 0 === t._a[fr] && 0 === t._a[hr] && 0 === t._a[dr] && (t._nextDay = !0, 
t._a[lr] = 0), t._d = (t._useUTC ? ot : at).apply(null, a), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), 
t._nextDay && (t._a[lr] = 24);
}
}
function wt(t) {
var e, n, r, i, a, o, s;
e = t._w, null != e.GG || null != e.W || null != e.E ? (a = 1, o = 4, n = yt(e.GG, t._a[sr], lt(Mt(), 1, 4).year), 
r = yt(e.W, 1), i = yt(e.E, 1)) : (a = t._locale._week.dow, o = t._locale._week.doy, 
n = yt(e.gg, t._a[sr], lt(Mt(), a, o).year), r = yt(e.w, 1), null != e.d ? (i = e.d, 
a > i && ++r) : i = null != e.e ? e.e + a : a), s = vt(n, r, i, o, a), t._a[sr] = s.year, 
t._dayOfYear = s.dayOfYear;
}
function Et(t) {
if (t._f === e.ISO_8601) return void rt(t);
t._a = [], l(t).empty = !0;
var n, r, i, a, o, s = "" + t._i, u = s.length, c = 0;
for (i = j(t._f, t._locale).match(Un) || [], n = 0; n < i.length; n++) a = i[n], 
r = (s.match(U(a, t)) || [])[0], r && (o = s.substr(0, s.indexOf(r)), o.length > 0 && l(t).unusedInput.push(o), 
s = s.slice(s.indexOf(r) + r.length), c += r.length), Bn[a] ? (r ? l(t).empty = !1 : l(t).unusedTokens.push(a), 
Y(a, r, t)) : t._strict && !r && l(t).unusedTokens.push(a);
l(t).charsLeftOver = u - c, s.length > 0 && l(t).unusedInput.push(s), l(t).bigHour === !0 && t._a[lr] <= 12 && t._a[lr] > 0 && (l(t).bigHour = void 0), 
t._a[lr] = kt(t._locale, t._a[lr], t._meridiem), bt(t), Q(t);
}
function kt(t, e, n) {
var r;
return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (r = t.isPM(n), 
r && 12 > e && (e += 12), r || 12 !== e || (e = 0), e) : e;
}
function St(t) {
var e, n, r, i, a;
if (0 === t._f.length) return l(t).invalidFormat = !0, void (t._d = new Date(NaN));
for (i = 0; i < t._f.length; i++) a = 0, e = d({}, t), null != t._useUTC && (e._useUTC = t._useUTC), 
e._f = t._f[i], Et(e), f(e) && (a += l(e).charsLeftOver, a += 10 * l(e).unusedTokens.length, 
l(e).score = a, (null == r || r > a) && (r = a, n = e));
s(t, n || e);
}
function xt(t) {
if (!t._d) {
var e = T(t._i);
t._a = [ e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond ], 
bt(t);
}
}
function _t(t) {
var e = new p(Q(Ct(t)));
return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
}
function Ct(t) {
var e = t._i, n = t._f;
return t._locale = t._locale || x(t._l), null === e || void 0 === n && "" === e ? h({
nullInput: !0
}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), m(e) ? new p(Q(e)) : (r(n) ? St(t) : n ? Et(t) : i(e) ? t._d = e : Tt(t), 
t));
}
function Tt(t) {
var n = t._i;
void 0 === n ? t._d = new Date() : i(n) ? t._d = new Date(+n) : "string" == typeof n ? it(t) : r(n) ? (t._a = a(n.slice(0), function(t) {
return parseInt(t, 10);
}), bt(t)) : "object" == typeof n ? xt(t) : "number" == typeof n ? t._d = new Date(n) : e.createFromInputFallback(t);
}
function At(t, e, n, r, i) {
var a = {};
return "boolean" == typeof n && (r = n, n = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, 
a._l = n, a._i = t, a._f = e, a._strict = r, _t(a);
}
function Mt(t, e, n, r) {
return At(t, e, n, r, !1);
}
function Ot(t, e) {
var n, i;
if (1 === e.length && r(e[0]) && (e = e[0]), !e.length) return Mt();
for (n = e[0], i = 1; i < e.length; ++i) (!e[i].isValid() || e[i][t](n)) && (n = e[i]);
return n;
}
function Dt() {
var t = [].slice.call(arguments, 0);
return Ot("isBefore", t);
}
function It() {
var t = [].slice.call(arguments, 0);
return Ot("isAfter", t);
}
function Pt(t) {
var e = T(t), n = e.year || 0, r = e.quarter || 0, i = e.month || 0, a = e.week || 0, o = e.day || 0, s = e.hour || 0, u = e.minute || 0, c = e.second || 0, l = e.millisecond || 0;
this._milliseconds = +l + 1e3 * c + 6e4 * u + 36e5 * s, this._days = +o + 7 * a, 
this._months = +i + 3 * r + 12 * n, this._data = {}, this._locale = x(), this._bubble();
}
function Lt(t) {
return t instanceof Pt;
}
function Nt(t, e) {
P(t, 0, 0, function() {
var t = this.utcOffset(), n = "+";
return 0 > t && (t = -t, n = "-"), n + I(~~(t / 60), 2) + e + I(~~t % 60, 2);
});
}
function Rt(t) {
var e = (t || "").match(nr) || [], n = e[e.length - 1] || [], r = (n + "").match(xr) || [ "-", 0, 0 ], i = +(60 * r[1]) + g(r[2]);
return "+" === r[0] ? i : -i;
}
function jt(t, n) {
var r, a;
return n._isUTC ? (r = n.clone(), a = (m(t) || i(t) ? +t : +Mt(t)) - +r, r._d.setTime(+r._d + a), 
e.updateOffset(r, !1), r) : Mt(t).local();
}
function qt(t) {
return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
}
function Ft(t, n) {
var r, i = this._offset || 0;
return null != t ? ("string" == typeof t && (t = Rt(t)), Math.abs(t) < 16 && (t = 60 * t), 
!this._isUTC && n && (r = qt(this)), this._offset = t, this._isUTC = !0, null != r && this.add(r, "m"), 
i !== t && (!n || this._changeInProgress ? ne(this, Kt(t - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
e.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? i : qt(this);
}
function Ut(t, e) {
return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
}
function Ht(t) {
return this.utcOffset(0, t);
}
function Vt(t) {
return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(qt(this), "m")), 
this;
}
function Bt() {
return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Rt(this._i)), 
this;
}
function Yt(t) {
return t = t ? Mt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0;
}
function zt() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Wt() {
if (void 0 !== this._isDSTShifted) return this._isDSTShifted;
var t = {};
if (d(t, this), t = Ct(t), t._a) {
var e = t._isUTC ? u(t._a) : Mt(t._a);
this._isDSTShifted = this.isValid() && y(t._a, e.toArray()) > 0;
} else this._isDSTShifted = !1;
return this._isDSTShifted;
}
function Gt() {
return !this._isUTC;
}
function Xt() {
return this._isUTC;
}
function Jt() {
return this._isUTC && 0 === this._offset;
}
function Kt(t, e) {
var n, r, i, a = t, s = null;
return Lt(t) ? a = {
ms: t._milliseconds,
d: t._days,
M: t._months
} : "number" == typeof t ? (a = {}, e ? a[e] = t : a.milliseconds = t) : (s = _r.exec(t)) ? (n = "-" === s[1] ? -1 : 1, 
a = {
y: 0,
d: g(s[cr]) * n,
h: g(s[lr]) * n,
m: g(s[fr]) * n,
s: g(s[hr]) * n,
ms: g(s[dr]) * n
}) : (s = Cr.exec(t)) ? (n = "-" === s[1] ? -1 : 1, a = {
y: Zt(s[2], n),
M: Zt(s[3], n),
d: Zt(s[4], n),
h: Zt(s[5], n),
m: Zt(s[6], n),
s: Zt(s[7], n),
w: Zt(s[8], n)
}) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (i = te(Mt(a.from), Mt(a.to)), 
a = {}, a.ms = i.milliseconds, a.M = i.months), r = new Pt(a), Lt(t) && o(t, "_locale") && (r._locale = t._locale), 
r;
}
function Zt(t, e) {
var n = t && parseFloat(t.replace(",", "."));
return (isNaN(n) ? 0 : n) * e;
}
function Qt(t, e) {
var n = {
milliseconds: 0,
months: 0
};
return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, 
n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
}
function te(t, e) {
var n;
return e = jt(e, t), t.isBefore(e) ? n = Qt(t, e) : (n = Qt(e, t), n.milliseconds = -n.milliseconds, 
n.months = -n.months), n;
}
function ee(t, e) {
return function(n, r) {
var i, a;
return null === r || isNaN(+r) || (nt(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), 
a = n, n = r, r = a), n = "string" == typeof n ? +n : n, i = Kt(n, r), ne(this, i, t), 
this;
};
}
function ne(t, n, r, i) {
var a = n._milliseconds, o = n._days, s = n._months;
i = null == i ? !0 : i, a && t._d.setTime(+t._d + a * r), o && O(t, "Date", M(t, "Date") + o * r), 
s && J(t, M(t, "Month") + s * r), i && e.updateOffset(t, o || s);
}
function re(t, e) {
var n = t || Mt(), r = jt(n, this).startOf("day"), i = this.diff(r, "days", !0), a = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
return this.format(e && e[a] || this.localeData().calendar(a, this, Mt(n)));
}
function ie() {
return new p(this);
}
function ae(t, e) {
var n;
return e = C(void 0 !== e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Mt(t), 
+this > +t) : (n = m(t) ? +t : +Mt(t), n < +this.clone().startOf(e));
}
function oe(t, e) {
var n;
return e = C(void 0 !== e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Mt(t), 
+t > +this) : (n = m(t) ? +t : +Mt(t), +this.clone().endOf(e) < n);
}
function se(t, e, n) {
return this.isAfter(t, n) && this.isBefore(e, n);
}
function ue(t, e) {
var n;
return e = C(e || "millisecond"), "millisecond" === e ? (t = m(t) ? t : Mt(t), +this === +t) : (n = +Mt(t), 
+this.clone().startOf(e) <= n && n <= +this.clone().endOf(e));
}
function ce(t, e, n) {
var r, i, a = jt(t, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
return e = C(e), "year" === e || "month" === e || "quarter" === e ? (i = le(this, a), 
"quarter" === e ? i /= 3 : "year" === e && (i /= 12)) : (r = this - a, i = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? (r - o) / 864e5 : "week" === e ? (r - o) / 6048e5 : r), 
n ? i : v(i);
}
function le(t, e) {
var n, r, i = 12 * (e.year() - t.year()) + (e.month() - t.month()), a = t.clone().add(i, "months");
return 0 > e - a ? (n = t.clone().add(i - 1, "months"), r = (e - a) / (a - n)) : (n = t.clone().add(i + 1, "months"), 
r = (e - a) / (n - a)), -(i + r);
}
function fe() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function he() {
var t = this.clone().utc();
return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : R(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : R(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function de(t) {
var n = R(this, t || e.defaultFormat);
return this.localeData().postformat(n);
}
function pe(t, e) {
return this.isValid() ? Kt({
to: this,
from: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function me(t) {
return this.from(Mt(), t);
}
function ve(t, e) {
return this.isValid() ? Kt({
from: this,
to: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function ge(t) {
return this.to(Mt(), t);
}
function ye(t) {
var e;
return void 0 === t ? this._locale._abbr : (e = x(t), null != e && (this._locale = e), 
this);
}
function $e() {
return this._locale;
}
function be(t) {
switch (t = C(t)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), 
this;
}
function we(t) {
return t = C(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms");
}
function Ee() {
return +this._d - 6e4 * (this._offset || 0);
}
function ke() {
return Math.floor(+this / 1e3);
}
function Se() {
return this._offset ? new Date(+this) : this._d;
}
function xe() {
var t = this;
return [ t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond() ];
}
function _e() {
var t = this;
return {
years: t.year(),
months: t.month(),
date: t.date(),
hours: t.hours(),
minutes: t.minutes(),
seconds: t.seconds(),
milliseconds: t.milliseconds()
};
}
function Ce() {
return f(this);
}
function Te() {
return s({}, l(this));
}
function Ae() {
return l(this).overflow;
}
function Me(t, e) {
P(0, [ t, t.length ], 0, e);
}
function Oe(t, e, n) {
return lt(Mt([ t, 11, 31 + e - n ]), e, n).week;
}
function De(t) {
var e = lt(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
return null == t ? e : this.add(t - e, "y");
}
function Ie(t) {
var e = lt(this, 1, 4).year;
return null == t ? e : this.add(t - e, "y");
}
function Pe() {
return Oe(this.year(), 1, 4);
}
function Le() {
var t = this.localeData()._week;
return Oe(this.year(), t.dow, t.doy);
}
function Ne(t) {
return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
}
function Re(t, e) {
return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10);
}
function je(t) {
return this._weekdays[t.day()];
}
function qe(t) {
return this._weekdaysShort[t.day()];
}
function Fe(t) {
return this._weekdaysMin[t.day()];
}
function Ue(t) {
var e, n, r;
for (this._weekdaysParse = this._weekdaysParse || [], e = 0; 7 > e; e++) if (this._weekdaysParse[e] || (n = Mt([ 2e3, 1 ]).day(e), 
r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
this._weekdaysParse[e] = RegExp(r.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e;
}
function He(t) {
var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
return null != t ? (t = Re(t, this.localeData()), this.add(t - e, "d")) : e;
}
function Ve(t) {
var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == t ? e : this.add(t - e, "d");
}
function Be(t) {
return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7);
}
function Ye(t, e) {
P(t, 0, 0, function() {
return this.localeData().meridiem(this.hours(), this.minutes(), e);
});
}
function ze(t, e) {
return e._meridiemParse;
}
function We(t) {
return "p" === (t + "").toLowerCase().charAt(0);
}
function Ge(t, e, n) {
return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
function Xe(t, e) {
e[dr] = g(1e3 * ("0." + t));
}
function Je() {
return this._isUTC ? "UTC" : "";
}
function Ke() {
return this._isUTC ? "Coordinated Universal Time" : "";
}
function Ze(t) {
return Mt(1e3 * t);
}
function Qe() {
return Mt.apply(null, arguments).parseZone();
}
function tn(t, e, n) {
var r = this._calendar[t];
return "function" == typeof r ? r.call(e, n) : r;
}
function en(t) {
var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(t) {
return t.slice(1);
}), this._longDateFormat[t]);
}
function nn() {
return this._invalidDate;
}
function rn(t) {
return this._ordinal.replace("%d", t);
}
function an(t) {
return t;
}
function on(t, e, n, r) {
var i = this._relativeTime[n];
return "function" == typeof i ? i(t, e, n, r) : i.replace(/%d/i, t);
}
function sn(t, e) {
var n = this._relativeTime[t > 0 ? "future" : "past"];
return "function" == typeof n ? n(e) : n.replace(/%s/i, e);
}
function un(t) {
var e, n;
for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e;
this._ordinalParseLenient = RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
}
function cn(t, e, n, r) {
var i = x(), a = u().set(r, e);
return i[n](a, t);
}
function ln(t, e, n, r, i) {
if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return cn(t, e, n, i);
var a, o = [];
for (a = 0; r > a; a++) o[a] = cn(t, a, n, i);
return o;
}
function fn(t, e) {
return ln(t, e, "months", 12, "month");
}
function hn(t, e) {
return ln(t, e, "monthsShort", 12, "month");
}
function dn(t, e) {
return ln(t, e, "weekdays", 7, "day");
}
function pn(t, e) {
return ln(t, e, "weekdaysShort", 7, "day");
}
function mn(t, e) {
return ln(t, e, "weekdaysMin", 7, "day");
}
function vn() {
var t = this._data;
return this._milliseconds = Jr(this._milliseconds), this._days = Jr(this._days), 
this._months = Jr(this._months), t.milliseconds = Jr(t.milliseconds), t.seconds = Jr(t.seconds), 
t.minutes = Jr(t.minutes), t.hours = Jr(t.hours), t.months = Jr(t.months), t.years = Jr(t.years), 
this;
}
function gn(t, e, n, r) {
var i = Kt(e, n);
return t._milliseconds += r * i._milliseconds, t._days += r * i._days, t._months += r * i._months, 
t._bubble();
}
function yn(t, e) {
return gn(this, t, e, 1);
}
function $n(t, e) {
return gn(this, t, e, -1);
}
function bn(t) {
return 0 > t ? Math.floor(t) : Math.ceil(t);
}
function wn() {
var t, e, n, r, i, a = this._milliseconds, o = this._days, s = this._months, u = this._data;
return a >= 0 && o >= 0 && s >= 0 || 0 >= a && 0 >= o && 0 >= s || (a += 864e5 * bn(kn(s) + o), 
o = 0, s = 0), u.milliseconds = a % 1e3, t = v(a / 1e3), u.seconds = t % 60, e = v(t / 60), 
u.minutes = e % 60, n = v(e / 60), u.hours = n % 24, o += v(n / 24), i = v(En(o)), 
s += i, o -= bn(kn(i)), r = v(s / 12), s %= 12, u.days = o, u.months = s, u.years = r, 
this;
}
function En(t) {
return 4800 * t / 146097;
}
function kn(t) {
return 146097 * t / 4800;
}
function Sn(t) {
var e, n, r = this._milliseconds;
if (t = C(t), "month" === t || "year" === t) return e = this._days + r / 864e5, 
n = this._months + En(e), "month" === t ? n : n / 12;
switch (e = this._days + Math.round(kn(this._months)), t) {
case "week":
return e / 7 + r / 6048e5;

case "day":
return e + r / 864e5;

case "hour":
return 24 * e + r / 36e5;

case "minute":
return 1440 * e + r / 6e4;

case "second":
return 86400 * e + r / 1e3;

case "millisecond":
return Math.floor(864e5 * e) + r;

default:
throw Error("Unknown unit " + t);
}
}
function xn() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12);
}
function _n(t) {
return function() {
return this.as(t);
};
}
function Cn(t) {
return t = C(t), this[t + "s"]();
}
function Tn(t) {
return function() {
return this._data[t];
};
}
function An() {
return v(this.days() / 7);
}
function Mn(t, e, n, r, i) {
return i.relativeTime(e || 1, !!n, t, r);
}
function On(t, e, n) {
var r = Kt(t).abs(), i = hi(r.as("s")), a = hi(r.as("m")), o = hi(r.as("h")), s = hi(r.as("d")), u = hi(r.as("M")), c = hi(r.as("y")), l = i < di.s && [ "s", i ] || 1 === a && [ "m" ] || a < di.m && [ "mm", a ] || 1 === o && [ "h" ] || o < di.h && [ "hh", o ] || 1 === s && [ "d" ] || s < di.d && [ "dd", s ] || 1 === u && [ "M" ] || u < di.M && [ "MM", u ] || 1 === c && [ "y" ] || [ "yy", c ];
return l[2] = e, l[3] = +t > 0, l[4] = n, Mn.apply(null, l);
}
function Dn(t, e) {
return void 0 === di[t] ? !1 : void 0 === e ? di[t] : (di[t] = e, !0);
}
function In(t) {
var e = this.localeData(), n = On(this, !t, e);
return t && (n = e.pastFuture(+this, n)), e.postformat(n);
}
function Pn() {
var t, e, n, r = pi(this._milliseconds) / 1e3, i = pi(this._days), a = pi(this._months);
t = v(r / 60), e = v(t / 60), r %= 60, t %= 60, n = v(a / 12), a %= 12;
var o = n, s = a, u = i, c = e, l = t, f = r, h = this.asSeconds();
return h ? (0 > h ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (u ? u + "D" : "") + (c || l || f ? "T" : "") + (c ? c + "H" : "") + (l ? l + "M" : "") + (f ? f + "S" : "") : "P0D";
}
var Ln, Nn, Rn = e.momentProperties = [], jn = !1, qn = {}, Fn = {}, Un = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Hn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Vn = {}, Bn = {}, Yn = /\d/, zn = /\d\d/, Wn = /\d{3}/, Gn = /\d{4}/, Xn = /[+-]?\d{6}/, Jn = /\d\d?/, Kn = /\d{1,3}/, Zn = /\d{1,4}/, Qn = /[+-]?\d{1,6}/, tr = /\d+/, er = /[+-]?\d+/, nr = /Z|[+-]\d\d:?\d\d/gi, rr = /[+-]?\d+(\.\d{1,3})?/, ir = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ar = {}, or = {}, sr = 0, ur = 1, cr = 2, lr = 3, fr = 4, hr = 5, dr = 6;
P("M", [ "MM", 2 ], "Mo", function() {
return this.month() + 1;
}), P("MMM", 0, 0, function(t) {
return this.localeData().monthsShort(this, t);
}), P("MMMM", 0, 0, function(t) {
return this.localeData().months(this, t);
}), _("month", "M"), F("M", Jn), F("MM", Jn, zn), F("MMM", ir), F("MMMM", ir), V([ "M", "MM" ], function(t, e) {
e[ur] = g(t) - 1;
}), V([ "MMM", "MMMM" ], function(t, e, n, r) {
var i = n._locale.monthsParse(t, r, n._strict);
null != i ? e[ur] = i : l(n).invalidMonth = t;
});
var pr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), mr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), vr = {};
e.suppressDeprecationWarnings = !1;
var gr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, yr = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], $r = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], br = /^\/?Date\((\-?\d+)/i;
e.createFromInputFallback = et("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
}), P(0, [ "YY", 2 ], 0, function() {
return this.year() % 100;
}), P(0, [ "YYYY", 4 ], 0, "year"), P(0, [ "YYYYY", 5 ], 0, "year"), P(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
_("year", "y"), F("Y", er), F("YY", Jn, zn), F("YYYY", Zn, Gn), F("YYYYY", Qn, Xn), 
F("YYYYYY", Qn, Xn), V([ "YYYYY", "YYYYYY" ], sr), V("YYYY", function(t, n) {
n[sr] = 2 === t.length ? e.parseTwoDigitYear(t) : g(t);
}), V("YY", function(t, n) {
n[sr] = e.parseTwoDigitYear(t);
}), e.parseTwoDigitYear = function(t) {
return g(t) + (g(t) > 68 ? 1900 : 2e3);
};
var wr = A("FullYear", !1);
P("w", [ "ww", 2 ], "wo", "week"), P("W", [ "WW", 2 ], "Wo", "isoWeek"), _("week", "w"), 
_("isoWeek", "W"), F("w", Jn), F("ww", Jn, zn), F("W", Jn), F("WW", Jn, zn), B([ "w", "ww", "W", "WW" ], function(t, e, n, r) {
e[r.substr(0, 1)] = g(t);
});
var Er = {
dow: 0,
doy: 6
};
P("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), _("dayOfYear", "DDD"), F("DDD", Kn), 
F("DDDD", Wn), V([ "DDD", "DDDD" ], function(t, e, n) {
n._dayOfYear = g(t);
}), e.ISO_8601 = function() {};
var kr = et("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
var t = Mt.apply(null, arguments);
return this > t ? this : t;
}), Sr = et("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
var t = Mt.apply(null, arguments);
return t > this ? this : t;
});
Nt("Z", ":"), Nt("ZZ", ""), F("Z", nr), F("ZZ", nr), V([ "Z", "ZZ" ], function(t, e, n) {
n._useUTC = !0, n._tzm = Rt(t);
});
var xr = /([\+\-]|\d\d)/gi;
e.updateOffset = function() {};
var _r = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Cr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
Kt.fn = Pt.prototype;
var Tr = ee(1, "add"), Ar = ee(-1, "subtract");
e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
var Mr = et("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
return void 0 === t ? this.localeData() : this.locale(t);
});
P(0, [ "gg", 2 ], 0, function() {
return this.weekYear() % 100;
}), P(0, [ "GG", 2 ], 0, function() {
return this.isoWeekYear() % 100;
}), Me("gggg", "weekYear"), Me("ggggg", "weekYear"), Me("GGGG", "isoWeekYear"), 
Me("GGGGG", "isoWeekYear"), _("weekYear", "gg"), _("isoWeekYear", "GG"), F("G", er), 
F("g", er), F("GG", Jn, zn), F("gg", Jn, zn), F("GGGG", Zn, Gn), F("gggg", Zn, Gn), 
F("GGGGG", Qn, Xn), F("ggggg", Qn, Xn), B([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(t, e, n, r) {
e[r.substr(0, 2)] = g(t);
}), B([ "gg", "GG" ], function(t, n, r, i) {
n[i] = e.parseTwoDigitYear(t);
}), P("Q", 0, 0, "quarter"), _("quarter", "Q"), F("Q", Yn), V("Q", function(t, e) {
e[ur] = 3 * (g(t) - 1);
}), P("D", [ "DD", 2 ], "Do", "date"), _("date", "D"), F("D", Jn), F("DD", Jn, zn), 
F("Do", function(t, e) {
return t ? e._ordinalParse : e._ordinalParseLenient;
}), V([ "D", "DD" ], cr), V("Do", function(t, e) {
e[cr] = g(t.match(Jn)[0], 10);
});
var Or = A("Date", !0);
P("d", 0, "do", "day"), P("dd", 0, 0, function(t) {
return this.localeData().weekdaysMin(this, t);
}), P("ddd", 0, 0, function(t) {
return this.localeData().weekdaysShort(this, t);
}), P("dddd", 0, 0, function(t) {
return this.localeData().weekdays(this, t);
}), P("e", 0, 0, "weekday"), P("E", 0, 0, "isoWeekday"), _("day", "d"), _("weekday", "e"), 
_("isoWeekday", "E"), F("d", Jn), F("e", Jn), F("E", Jn), F("dd", ir), F("ddd", ir), 
F("dddd", ir), B([ "dd", "ddd", "dddd" ], function(t, e, n) {
var r = n._locale.weekdaysParse(t);
null != r ? e.d = r : l(n).invalidWeekday = t;
}), B([ "d", "e", "E" ], function(t, e, n, r) {
e[r] = g(t);
});
var Dr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Ir = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Pr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
P("H", [ "HH", 2 ], 0, "hour"), P("h", [ "hh", 2 ], 0, function() {
return this.hours() % 12 || 12;
}), Ye("a", !0), Ye("A", !1), _("hour", "h"), F("a", ze), F("A", ze), F("H", Jn), 
F("h", Jn), F("HH", Jn, zn), F("hh", Jn, zn), V([ "H", "HH" ], lr), V([ "a", "A" ], function(t, e, n) {
n._isPm = n._locale.isPM(t), n._meridiem = t;
}), V([ "h", "hh" ], function(t, e, n) {
e[lr] = g(t), l(n).bigHour = !0;
});
var Lr = /[ap]\.?m?\.?/i, Nr = A("Hours", !0);
P("m", [ "mm", 2 ], 0, "minute"), _("minute", "m"), F("m", Jn), F("mm", Jn, zn), 
V([ "m", "mm" ], fr);
var Rr = A("Minutes", !1);
P("s", [ "ss", 2 ], 0, "second"), _("second", "s"), F("s", Jn), F("ss", Jn, zn), 
V([ "s", "ss" ], hr);
var jr = A("Seconds", !1);
P("S", 0, 0, function() {
return ~~(this.millisecond() / 100);
}), P(0, [ "SS", 2 ], 0, function() {
return ~~(this.millisecond() / 10);
}), P(0, [ "SSS", 3 ], 0, "millisecond"), P(0, [ "SSSS", 4 ], 0, function() {
return 10 * this.millisecond();
}), P(0, [ "SSSSS", 5 ], 0, function() {
return 100 * this.millisecond();
}), P(0, [ "SSSSSS", 6 ], 0, function() {
return 1e3 * this.millisecond();
}), P(0, [ "SSSSSSS", 7 ], 0, function() {
return 1e4 * this.millisecond();
}), P(0, [ "SSSSSSSS", 8 ], 0, function() {
return 1e5 * this.millisecond();
}), P(0, [ "SSSSSSSSS", 9 ], 0, function() {
return 1e6 * this.millisecond();
}), _("millisecond", "ms"), F("S", Kn, Yn), F("SS", Kn, zn), F("SSS", Kn, Wn);
var qr;
for (qr = "SSSS"; qr.length <= 9; qr += "S") F(qr, tr);
for (qr = "S"; qr.length <= 9; qr += "S") V(qr, Xe);
var Fr = A("Milliseconds", !1);
P("z", 0, 0, "zoneAbbr"), P("zz", 0, 0, "zoneName");
var Ur = p.prototype;
Ur.add = Tr, Ur.calendar = re, Ur.clone = ie, Ur.diff = ce, Ur.endOf = we, Ur.format = de, 
Ur.from = pe, Ur.fromNow = me, Ur.to = ve, Ur.toNow = ge, Ur.get = D, Ur.invalidAt = Ae, 
Ur.isAfter = ae, Ur.isBefore = oe, Ur.isBetween = se, Ur.isSame = ue, Ur.isValid = Ce, 
Ur.lang = Mr, Ur.locale = ye, Ur.localeData = $e, Ur.max = Sr, Ur.min = kr, Ur.parsingFlags = Te, 
Ur.set = D, Ur.startOf = be, Ur.subtract = Ar, Ur.toArray = xe, Ur.toObject = _e, 
Ur.toDate = Se, Ur.toISOString = he, Ur.toJSON = he, Ur.toString = fe, Ur.unix = ke, 
Ur.valueOf = Ee, Ur.year = wr, Ur.isLeapYear = ct, Ur.weekYear = De, Ur.isoWeekYear = Ie, 
Ur.quarter = Ur.quarters = Ne, Ur.month = K, Ur.daysInMonth = Z, Ur.week = Ur.weeks = pt, 
Ur.isoWeek = Ur.isoWeeks = mt, Ur.weeksInYear = Le, Ur.isoWeeksInYear = Pe, Ur.date = Or, 
Ur.day = Ur.days = He, Ur.weekday = Ve, Ur.isoWeekday = Be, Ur.dayOfYear = gt, Ur.hour = Ur.hours = Nr, 
Ur.minute = Ur.minutes = Rr, Ur.second = Ur.seconds = jr, Ur.millisecond = Ur.milliseconds = Fr, 
Ur.utcOffset = Ft, Ur.utc = Ht, Ur.local = Vt, Ur.parseZone = Bt, Ur.hasAlignedHourOffset = Yt, 
Ur.isDST = zt, Ur.isDSTShifted = Wt, Ur.isLocal = Gt, Ur.isUtcOffset = Xt, Ur.isUtc = Jt, 
Ur.isUTC = Jt, Ur.zoneAbbr = Je, Ur.zoneName = Ke, Ur.dates = et("dates accessor is deprecated. Use date instead.", Or), 
Ur.months = et("months accessor is deprecated. Use month instead", K), Ur.years = et("years accessor is deprecated. Use year instead", wr), 
Ur.zone = et("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ut);
var Hr = Ur, Vr = {
sameDay: "[Today at] LT",
nextDay: "[Tomorrow at] LT",
nextWeek: "dddd [at] LT",
lastDay: "[Yesterday at] LT",
lastWeek: "[Last] dddd [at] LT",
sameElse: "L"
}, Br = {
LTS: "h:mm:ss A",
LT: "h:mm A",
L: "MM/DD/YYYY",
LL: "MMMM D, YYYY",
LLL: "MMMM D, YYYY h:mm A",
LLLL: "dddd, MMMM D, YYYY h:mm A"
}, Yr = "Invalid date", zr = "%d", Wr = /\d{1,2}/, Gr = {
future: "in %s",
past: "%s ago",
s: "a few seconds",
m: "a minute",
mm: "%d minutes",
h: "an hour",
hh: "%d hours",
d: "a day",
dd: "%d days",
M: "a month",
MM: "%d months",
y: "a year",
yy: "%d years"
}, Xr = $.prototype;
Xr._calendar = Vr, Xr.calendar = tn, Xr._longDateFormat = Br, Xr.longDateFormat = en, 
Xr._invalidDate = Yr, Xr.invalidDate = nn, Xr._ordinal = zr, Xr.ordinal = rn, Xr._ordinalParse = Wr, 
Xr.preparse = an, Xr.postformat = an, Xr._relativeTime = Gr, Xr.relativeTime = on, 
Xr.pastFuture = sn, Xr.set = un, Xr.months = W, Xr._months = pr, Xr.monthsShort = G, 
Xr._monthsShort = mr, Xr.monthsParse = X, Xr.week = ft, Xr._week = Er, Xr.firstDayOfYear = dt, 
Xr.firstDayOfWeek = ht, Xr.weekdays = je, Xr._weekdays = Dr, Xr.weekdaysMin = Fe, 
Xr._weekdaysMin = Pr, Xr.weekdaysShort = qe, Xr._weekdaysShort = Ir, Xr.weekdaysParse = Ue, 
Xr.isPM = We, Xr._meridiemParse = Lr, Xr.meridiem = Ge, k("en", {
ordinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal: function(t) {
var e = t % 10, n = 1 === g(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
return t + n;
}
}), e.lang = et("moment.lang is deprecated. Use moment.locale instead.", k), e.langData = et("moment.langData is deprecated. Use moment.localeData instead.", x);
var Jr = Math.abs, Kr = _n("ms"), Zr = _n("s"), Qr = _n("m"), ti = _n("h"), ei = _n("d"), ni = _n("w"), ri = _n("M"), ii = _n("y"), ai = Tn("milliseconds"), oi = Tn("seconds"), si = Tn("minutes"), ui = Tn("hours"), ci = Tn("days"), li = Tn("months"), fi = Tn("years"), hi = Math.round, di = {
s: 45,
m: 45,
h: 22,
d: 26,
M: 11
}, pi = Math.abs, mi = Pt.prototype;
mi.abs = vn, mi.add = yn, mi.subtract = $n, mi.as = Sn, mi.asMilliseconds = Kr, 
mi.asSeconds = Zr, mi.asMinutes = Qr, mi.asHours = ti, mi.asDays = ei, mi.asWeeks = ni, 
mi.asMonths = ri, mi.asYears = ii, mi.valueOf = xn, mi._bubble = wn, mi.get = Cn, 
mi.milliseconds = ai, mi.seconds = oi, mi.minutes = si, mi.hours = ui, mi.days = ci, 
mi.weeks = An, mi.months = li, mi.years = fi, mi.humanize = In, mi.toISOString = Pn, 
mi.toString = Pn, mi.toJSON = Pn, mi.locale = ye, mi.localeData = $e, mi.toIsoString = et("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Pn), 
mi.lang = Mr, P("X", 0, 0, "unix"), P("x", 0, 0, "valueOf"), F("x", er), F("X", rr), 
V("X", function(t, e, n) {
n._d = new Date(1e3 * parseFloat(t, 10));
}), V("x", function(t, e, n) {
n._d = new Date(g(t));
}), e.version = "2.10.6", n(Mt), e.fn = Hr, e.min = Dt, e.max = It, e.utc = u, e.unix = Ze, 
e.months = fn, e.isDate = i, e.locale = k, e.invalid = h, e.duration = Kt, e.isMoment = m, 
e.weekdays = dn, e.parseZone = Qe, e.localeData = x, e.isDuration = Lt, e.monthsShort = hn, 
e.weekdaysMin = mn, e.defineLocale = S, e.weekdaysShort = pn, e.normalizeUnits = C, 
e.relativeTimeThreshold = Dn;
var vi = e;
return vi;
});
}).call(e, n(123)(t));
}, , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
function a(t) {
return s[t] || t;
}
function o(t) {
var e = (t + "").replace(u, a);
return e === "" + t ? t : e;
}
e.merge = function c(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = c(n, t[i]);
return n;
}
var a = t.class, o = e.class;
(a || o) && (a = a || [], o = o || [], Array.isArray(a) || (a = [ a ]), Array.isArray(o) || (o = [ o ]), 
t.class = a.concat(o).filter(r));
for (var s in e) "class" != s && (t[s] = e[s]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], a = 0; a < t.length; a++) n && n[a] ? r.push(e.escape(i([ t[a] ]))) : r.push(i(t[a]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
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
var r = [], a = Object.keys(t);
if (a.length) for (var o = 0; o < a.length; ++o) {
var s = a[o], u = t[s];
"class" == s ? (u = i(u)) && r.push(" " + s + '="' + u + '"') : r.push(e.attr(s, u, !1, n));
}
return r.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
e.escape = o, e.rethrow = function l(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (a) {
l(t, null, r);
}
var o = 3, s = i.split("\n"), u = Math.max(r - o, 0), c = Math.min(s.length, r + o), o = s.slice(u, c).map(function(t, e) {
var n = e + u + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + o + "\n\n" + t.message, 
t;
}, e.DebugItem = function(t, e) {
this.lineno = t, this.filename = e;
};
}, , , function(t, e, n) {
"use strict";
var r = n(10), i = n(119), a = n(49), o = e.PhotoCut = n(120);
n(124), t.exports = function(t, e) {
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
s.setContent(a(i));
var u = s.elem.querySelector(".photo-cut__canvas");
u.focus();
for (var c = s.elem.querySelectorAll(".photo-cut__selection-canvas"), l = 0; l < c.length; l++) c[l].width = c[l].offsetWidth, 
c[l].height = c[l].offsetHeight;
var f = new o(u, {
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
}, , , , , function() {}, , , function(t, e, n) {
var r = n(108);
t.exports = function(t) {
var e, n = [], i = {}, a = t || {};
return function(t) {
n.push("");
var a = [];
i.b = e = function(e, r, i) {
this && this.block, this && this.attributes || {};
t.call(this, n, a, e, r, i);
}, i.e = e = function(t) {
var e = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
e && e();
},
attributes: r.merge([ n ])
}, t, !0);
}, i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Выберите миниатюру");
},
attributes: {
"class": "title"
}
}, "h1"), i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
block: function() {
i.e.call({
attributes: {
tabindex: "-1",
"class": "canvas"
}
}, "canvas"), i.e.call({
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
}), i.e.call({
block: function() {
i.e.call({
attributes: {
"class": "selection-canvas"
}
}, "canvas"), i.e.call({
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
}), i.e.call({
block: function() {
i.b.call({
block: function() {
i.e.call({
block: function() {
n.push("Сохранить");
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
}, "button"), i.e.call({
block: function() {
n.push("Отмена");
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
}.call(this, "bem" in a ? a.bem : "undefined" != typeof bem ? bem : void 0), n.join("");
};
}, function(t, e, n) {
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
}(), a = n(125), o = function() {
function t(e) {
var n = this, i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = i.maxImageSize;
r(this, t), this.maxImageSize = a || 200, this.canvas = e, this.canvas.onmousedown = function(t) {
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
t.size = t.size || this.selection.size), this.selection = new a(t)) : this.selection = null, 
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
t.exports = o;
}, , , function(t) {
"use strict";
t.exports = function(t) {
return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], 
t.webpackPolyfill = 1), t;
};
}, function(t, e, n) {
var r;
!function(i) {
"use strict";
var a = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype, o = i.Blob && function() {
try {
return !!new Blob();
} catch (t) {
return !1;
}
}(), s = o && i.Uint8Array && function() {
try {
return 100 === new Blob([ new Uint8Array(100) ]).size;
} catch (t) {
return !1;
}
}(), u = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder, c = (o || u) && i.atob && i.ArrayBuffer && i.Uint8Array && function(t) {
var e, n, r, i, a, c;
for (e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), 
n = new ArrayBuffer(e.length), r = new Uint8Array(n), i = 0; i < e.length; i += 1) r[i] = e.charCodeAt(i);
return a = t.split(",")[0].split(":")[1].split(";")[0], o ? new Blob([ s ? r : n ], {
type: a
}) : (c = new u(), c.append(n), c.getBlob(a));
};
i.HTMLCanvasElement && !a.toBlob && (a.mozGetAsFile ? a.toBlob = function(t, e, n) {
t(n && a.toDataURL && c ? c(this.toDataURL(e, n)) : this.mozGetAsFile("blob", e));
} : a.toDataURL && c && (a.toBlob = function(t, e, n) {
t(c(this.toDataURL(e, n)));
})), r = function() {
return c;
}.call(e, n, e, t), !(void 0 !== r && (t.exports = r));
}(window);
}, function(t) {
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
var r = n.x, i = n.y, a = n.size;
e(this, t), this.x = r, this.y = i, this.size = a;
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
}, , , , , , , , , , function(t) {
"use strict";
t.exports = function(t) {
return (t + "").replace(/&([^#]|#[^0-9]?|#x[^0-9]?|$)/g, "&amp;$1").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
}, function(t, e, n) {
"use strict";
function r(t, e) {
return i(t) ? "" : (t = t.replace(/"/g, "&quot;"), '<a href="' + t + '">' + e + "</a>");
}
function i(t) {
t = t.replace(/[\x00-\x20]+/g, ""), t = t.replace(/<\!\-\-.*?\-\-\>/g, "");
var e = t.match(/^([a-zA-Z]+)\:/);
if (!e) return !1;
var n = e[1].toLowerCase();
return "http" != n && "https" != n && "mailto" != n ? !0 : !1;
}
var a = n(135);
t.exports = function(t) {
return t ? (t = a(t), t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(t, e, n) {
return r(n, e);
}), t = t.replace(/https?:\/\/(?:[\w\d-]+\.?)+(?:\/[\w\d-]*)?/g, function(e, n) {
return '"' == t[n - 1] ? e : r(e, e);
}), t = t.replace(/\n\s*\n/g, "</p><p>"), "<p>" + t + "</p>") : "";
};
} ]);
//# sourceMappingURL=profile.8e0b8f6726af0fe76178.js.map
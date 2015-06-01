var profile = webpackJsonp_name_([ 10 ], [ function(t, e, n) {
"use strict";
var r = n(2), i = (n(23), n(48)), a = n(54), o = r.module("profile", [ "ui.router", "ngResource", "global403Interceptor", "ajoslin.promise-tracker", "progress", "focusOn", "ngMessages" ]);
n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41), 
n(29), n(42), n(43), n(44), n(45), n(46), n(47), o.filter("capitalize", function() {
return function(t) {
return t[0].toUpperCase() + t.slice(1);
};
}).filter("longDate", function() {
return function(t) {
return i(t).format("D MMMM YYYY в LT");
};
}).filter("shortDate", function() {
return function(t) {
return i(t).format("D MMM YYYY");
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
var r = n(23), i = n(2);
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
link: function(a, o, s, u, c) {
a.formatValue || (a.formatValue = function(t) {
return t;
}), a.loadingTracker = t(), a.edit = function() {
this.editing || (this.editing = !0, this.editingValue = this.value);
}, a.submit = function() {
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
if ("displayName" == t.name) new r.Success("Изменение имени везде произойдёт после перезагрузки страницы.", "slow"); else if ("email" == t.name) new r.Warning("Требуется подтвердить смену email, проверьте почту.", "slow"); else if ("profileName" == t.name) {
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
}, a.cancel = function() {
var t = this;
this.editing && n(function() {
t.editing = !1, t.editingValue = "";
});
}, c(a, function(t) {
o[0].querySelector("[control-transclude]").append(t[0]);
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
photo: "="
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
var r = n(2), i = (n(23), n(48), r.module("profile"));
i.controller("ProfileCourseGroupsCtrl", [ "$scope", "$http", "$window", "courseGroups", function(t, e, n, r) {
t.courseGroups = r;
} ]);
}, function(t, e, n) {
"use strict";
var r = n(2), i = r.module("profile");
i.controller("ProfileAboutMeCtrl", [ "$scope", "me", function(t, e) {
t.me = e;
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
var a = confirm("" + n.displayName + " (" + n.email + ") - удалить пользователя без возможности восстановления?");
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
var r = confirm("" + n + " - удалить привязку?");
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
LTS: "LT:ss",
L: "DD.MM.YYYY",
LL: "D MMMM YYYY г.",
LLL: "D MMMM YYYY г., LT",
LLLL: "dddd, D MMMM YYYY г., LT"
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
//! version : 2.10.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(e, n) {
t.exports = n();
}(this, function() {
"use strict";
function e() {
return Mn.apply(null, arguments);
}
function n(t) {
Mn = t;
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
return _t(t, e, n, r, !0).utc();
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
t._isValid = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.nullInput && !e.invalidFormat && !e.userInvalidated, 
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
In.length > 0) for (n in In) r = In[n], i = e[r], void 0 !== i && (t[r] = i);
return t;
}
function p(t) {
d(this, t), this._d = new Date(+t._d), Ln === !1 && (Ln = !0, e.updateOffset(this), 
Ln = !1);
}
function m(t) {
return t instanceof p || null != t && null != t._isAMomentObject;
}
function v(t) {
var e = +t, n = 0;
return 0 !== e && isFinite(e) && (n = e >= 0 ? Math.floor(e) : Math.ceil(e)), n;
}
function g(t, e, n) {
var r, i = Math.min(t.length, e.length), a = Math.abs(t.length - e.length), o = 0;
for (r = 0; i > r; r++) (n && t[r] !== e[r] || !n && v(t[r]) !== v(e[r])) && o++;
return o + a;
}
function y() {}
function $(t) {
return t ? t.toLowerCase().replace("_", "-") : t;
}
function b(t) {
for (var e, n, r, i, a = 0; a < t.length; ) {
for (i = $(t[a]).split("-"), e = i.length, n = $(t[a + 1]), n = n ? n.split("-") : null; e > 0; ) {
if (r = w(i.slice(0, e).join("-"))) return r;
if (n && n.length >= e && g(i, n, !0) >= e - 1) break;
e--;
}
a++;
}
return null;
}
function w(e) {
var n = null;
if (!Pn[e] && void 0 !== t && t && t.exports) try {
n = Dn._abbr, !function() {
var t = Error('Cannot find module "./locale"');
throw t.code = "MODULE_NOT_FOUND", t;
}(), E(n);
} catch (r) {}
return Pn[e];
}
function E(t, e) {
var n;
return t && (n = void 0 === e ? x(t) : k(t, e), n && (Dn = n)), Dn._abbr;
}
function k(t, e) {
return null !== e ? (e.abbr = t, Pn[t] || (Pn[t] = new y()), Pn[t].set(e), E(t), 
Pn[t]) : (delete Pn[t], null);
}
function x(t) {
var e;
if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Dn;
if (!r(t)) {
if (e = w(t)) return e;
t = [ t ];
}
return b(t);
}
function S(t, e) {
var n = t.toLowerCase();
Nn[n] = Nn[n + "s"] = Nn[e] = t;
}
function _(t) {
return "string" == typeof t ? Nn[t] || Nn[t.toLowerCase()] : void 0;
}
function C(t) {
var e, n, r = {};
for (n in t) o(t, n) && (e = _(n), e && (r[e] = t[n]));
return r;
}
function T(t, n) {
return function(r) {
return null != r ? (O(this, t, r), e.updateOffset(this, n), this) : A(this, t);
};
}
function A(t, e) {
return t._d["get" + (t._isUTC ? "UTC" : "") + e]();
}
function O(t, e, n) {
return t._d["set" + (t._isUTC ? "UTC" : "") + e](n);
}
function M(t, e) {
var n;
if ("object" == typeof t) for (n in t) this.set(n, t[n]); else if (t = _(t), "function" == typeof this[t]) return this[t](e);
return this;
}
function D(t, e, n) {
for (var r = "" + Math.abs(t), i = t >= 0; r.length < e; ) r = "0" + r;
return (i ? n ? "+" : "" : "-") + r;
}
function I(t, e, n, r) {
var i = r;
"string" == typeof r && (i = function() {
return this[r]();
}), t && (Fn[t] = i), e && (Fn[e[0]] = function() {
return D(i.apply(this, arguments), e[1], e[2]);
}), n && (Fn[n] = function() {
return this.localeData().ordinal(i.apply(this, arguments), t);
});
}
function L(t) {
return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
}
function P(t) {
var e, n, r = t.match(Rn);
for (e = 0, n = r.length; n > e; e++) Fn[r[e]] ? r[e] = Fn[r[e]] : r[e] = L(r[e]);
return function(i) {
var a = "";
for (e = 0; n > e; e++) a += r[e] instanceof Function ? r[e].call(i, t) : r[e];
return a;
};
}
function N(t, e) {
return t.isValid() ? (e = R(e, t.localeData()), qn[e] || (qn[e] = P(e)), qn[e](t)) : t.localeData().invalidDate();
}
function R(t, e) {
function n(t) {
return e.longDateFormat(t) || t;
}
var r = 5;
for (jn.lastIndex = 0; r >= 0 && jn.test(t); ) t = t.replace(jn, n), jn.lastIndex = 0, 
r -= 1;
return t;
}
function j(t, e, n) {
er[t] = "function" == typeof e ? e : function(t) {
return t && n ? n : e;
};
}
function q(t, e) {
return o(er, t) ? er[t](e._strict, e._locale) : RegExp(F(t));
}
function F(t) {
return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, r, i) {
return e || n || r || i;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function U(t, e) {
var n, r = e;
for ("string" == typeof t && (t = [ t ]), "number" == typeof e && (r = function(t, n) {
n[e] = v(t);
}), n = 0; n < t.length; n++) nr[t[n]] = r;
}
function H(t, e) {
U(t, function(t, n, r, i) {
r._w = r._w || {}, e(t, r._w, r, i);
});
}
function V(t, e, n) {
null != e && o(nr, t) && nr[t](e, n._a, n, t);
}
function B(t, e) {
return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
}
function Y(t) {
return this._months[t.month()];
}
function z(t) {
return this._monthsShort[t.month()];
}
function W(t, e, n) {
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
function G(t, e) {
var n;
return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (n = Math.min(t.date(), B(t.year(), e)), 
t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t);
}
function X(t) {
return null != t ? (G(this, t), e.updateOffset(this, !0), this) : A(this, "Month");
}
function J() {
return B(this.year(), this.month());
}
function K(t) {
var e, n = t._a;
return n && -2 === l(t).overflow && (e = n[ir] < 0 || n[ir] > 11 ? ir : n[ar] < 1 || n[ar] > B(n[rr], n[ir]) ? ar : n[or] < 0 || n[or] > 24 || 24 === n[or] && (0 !== n[sr] || 0 !== n[ur] || 0 !== n[cr]) ? or : n[sr] < 0 || n[sr] > 59 ? sr : n[ur] < 0 || n[ur] > 59 ? ur : n[cr] < 0 || n[cr] > 999 ? cr : -1, 
l(t)._overflowDayOfYear && (rr > e || e > ar) && (e = ar), l(t).overflow = e), t;
}
function Z(t) {
e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn;
}
function Q(t, e) {
var n = !0, r = t + "\n" + Error().stack;
return s(function() {
return n && (Z(r), n = !1), e.apply(this, arguments);
}, e);
}
function tt(t, e) {
hr[t] || (Z(e), hr[t] = !0);
}
function et(t) {
var e, n, r = t._i, i = dr.exec(r);
if (i) {
for (l(t).iso = !0, e = 0, n = pr.length; n > e; e++) if (pr[e][1].exec(r)) {
t._f = pr[e][0] + (i[6] || " ");
break;
}
for (e = 0, n = mr.length; n > e; e++) if (mr[e][1].exec(r)) {
t._f += mr[e][0];
break;
}
r.match(Zn) && (t._f += "Z"), bt(t);
} else t._isValid = !1;
}
function nt(t) {
var n = vr.exec(t._i);
return null !== n ? void (t._d = new Date(+n[1])) : (et(t), void (t._isValid === !1 && (delete t._isValid, 
e.createFromInputFallback(t))));
}
function rt(t, e, n, r, i, a, o) {
var s = new Date(t, e, n, r, i, a, o);
return 1970 > t && s.setFullYear(t), s;
}
function it(t) {
var e = new Date(Date.UTC.apply(null, arguments));
return 1970 > t && e.setUTCFullYear(t), e;
}
function at(t) {
return ot(t) ? 366 : 365;
}
function ot(t) {
return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
}
function st() {
return ot(this.year());
}
function ut(t, e, n) {
var r, i = n - e, a = n - t.day();
return a > i && (a -= 7), i - 7 > a && (a += 7), r = Ct(t).add(a, "d"), {
week: Math.ceil(r.dayOfYear() / 7),
year: r.year()
};
}
function ct(t) {
return ut(t, this._week.dow, this._week.doy).week;
}
function lt() {
return this._week.dow;
}
function ft() {
return this._week.doy;
}
function ht(t) {
var e = this.localeData().week(this);
return null == t ? e : this.add(7 * (t - e), "d");
}
function dt(t) {
var e = ut(this, 1, 4).week;
return null == t ? e : this.add(7 * (t - e), "d");
}
function pt(t, e, n, r, i) {
var a, o, s = it(t, 0, 1).getUTCDay();
return s = 0 === s ? 7 : s, n = null != n ? n : i, a = i - s + (s > r ? 7 : 0) - (i > s ? 7 : 0), 
o = 7 * (e - 1) + (n - i) + a + 1, {
year: o > 0 ? t : t - 1,
dayOfYear: o > 0 ? o : at(t - 1) + o
};
}
function mt(t) {
var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == t ? e : this.add(t - e, "d");
}
function vt(t, e, n) {
return null != t ? t : null != e ? e : n;
}
function gt(t) {
var e = new Date();
return t._useUTC ? [ e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() ] : [ e.getFullYear(), e.getMonth(), e.getDate() ];
}
function yt(t) {
var e, n, r, i, a = [];
if (!t._d) {
for (r = gt(t), t._w && null == t._a[ar] && null == t._a[ir] && $t(t), t._dayOfYear && (i = vt(t._a[rr], r[rr]), 
t._dayOfYear > at(i) && (l(t)._overflowDayOfYear = !0), n = it(i, 0, t._dayOfYear), 
t._a[ir] = n.getUTCMonth(), t._a[ar] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = a[e] = r[e];
for (;7 > e; e++) t._a[e] = a[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
24 === t._a[or] && 0 === t._a[sr] && 0 === t._a[ur] && 0 === t._a[cr] && (t._nextDay = !0, 
t._a[or] = 0), t._d = (t._useUTC ? it : rt).apply(null, a), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), 
t._nextDay && (t._a[or] = 24);
}
}
function $t(t) {
var e, n, r, i, a, o, s;
e = t._w, null != e.GG || null != e.W || null != e.E ? (a = 1, o = 4, n = vt(e.GG, t._a[rr], ut(Ct(), 1, 4).year), 
r = vt(e.W, 1), i = vt(e.E, 1)) : (a = t._locale._week.dow, o = t._locale._week.doy, 
n = vt(e.gg, t._a[rr], ut(Ct(), a, o).year), r = vt(e.w, 1), null != e.d ? (i = e.d, 
a > i && ++r) : i = null != e.e ? e.e + a : a), s = pt(n, r, i, o, a), t._a[rr] = s.year, 
t._dayOfYear = s.dayOfYear;
}
function bt(t) {
if (t._f === e.ISO_8601) return void et(t);
t._a = [], l(t).empty = !0;
var n, r, i, a, o, s = "" + t._i, u = s.length, c = 0;
for (i = R(t._f, t._locale).match(Rn) || [], n = 0; n < i.length; n++) a = i[n], 
r = (s.match(q(a, t)) || [])[0], r && (o = s.substr(0, s.indexOf(r)), o.length > 0 && l(t).unusedInput.push(o), 
s = s.slice(s.indexOf(r) + r.length), c += r.length), Fn[a] ? (r ? l(t).empty = !1 : l(t).unusedTokens.push(a), 
V(a, r, t)) : t._strict && !r && l(t).unusedTokens.push(a);
l(t).charsLeftOver = u - c, s.length > 0 && l(t).unusedInput.push(s), l(t).bigHour === !0 && t._a[or] <= 12 && t._a[or] > 0 && (l(t).bigHour = void 0), 
t._a[or] = wt(t._locale, t._a[or], t._meridiem), yt(t), K(t);
}
function wt(t, e, n) {
var r;
return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (r = t.isPM(n), 
r && 12 > e && (e += 12), r || 12 !== e || (e = 0), e) : e;
}
function Et(t) {
var e, n, r, i, a;
if (0 === t._f.length) return l(t).invalidFormat = !0, void (t._d = new Date(NaN));
for (i = 0; i < t._f.length; i++) a = 0, e = d({}, t), null != t._useUTC && (e._useUTC = t._useUTC), 
e._f = t._f[i], bt(e), f(e) && (a += l(e).charsLeftOver, a += 10 * l(e).unusedTokens.length, 
l(e).score = a, (null == r || r > a) && (r = a, n = e));
s(t, n || e);
}
function kt(t) {
if (!t._d) {
var e = C(t._i);
t._a = [ e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond ], 
yt(t);
}
}
function xt(t) {
var e, n = t._i, a = t._f;
return t._locale = t._locale || x(t._l), null === n || void 0 === a && "" === n ? h({
nullInput: !0
}) : ("string" == typeof n && (t._i = n = t._locale.preparse(n)), m(n) ? new p(K(n)) : (r(a) ? Et(t) : a ? bt(t) : i(n) ? t._d = n : St(t), 
e = new p(K(t)), e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e));
}
function St(t) {
var n = t._i;
void 0 === n ? t._d = new Date() : i(n) ? t._d = new Date(+n) : "string" == typeof n ? nt(t) : r(n) ? (t._a = a(n.slice(0), function(t) {
return parseInt(t, 10);
}), yt(t)) : "object" == typeof n ? kt(t) : "number" == typeof n ? t._d = new Date(n) : e.createFromInputFallback(t);
}
function _t(t, e, n, r, i) {
var a = {};
return "boolean" == typeof n && (r = n, n = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, 
a._l = n, a._i = t, a._f = e, a._strict = r, xt(a);
}
function Ct(t, e, n, r) {
return _t(t, e, n, r, !1);
}
function Tt(t, e) {
var n, i;
if (1 === e.length && r(e[0]) && (e = e[0]), !e.length) return Ct();
for (n = e[0], i = 1; i < e.length; ++i) e[i][t](n) && (n = e[i]);
return n;
}
function At() {
var t = [].slice.call(arguments, 0);
return Tt("isBefore", t);
}
function Ot() {
var t = [].slice.call(arguments, 0);
return Tt("isAfter", t);
}
function Mt(t) {
var e = C(t), n = e.year || 0, r = e.quarter || 0, i = e.month || 0, a = e.week || 0, o = e.day || 0, s = e.hour || 0, u = e.minute || 0, c = e.second || 0, l = e.millisecond || 0;
this._milliseconds = +l + 1e3 * c + 6e4 * u + 36e5 * s, this._days = +o + 7 * a, 
this._months = +i + 3 * r + 12 * n, this._data = {}, this._locale = x(), this._bubble();
}
function Dt(t) {
return t instanceof Mt;
}
function It(t, e) {
I(t, 0, 0, function() {
var t = this.utcOffset(), n = "+";
return 0 > t && (t = -t, n = "-"), n + D(~~(t / 60), 2) + e + D(~~t % 60, 2);
});
}
function Lt(t) {
var e = (t || "").match(Zn) || [], n = e[e.length - 1] || [], r = (n + "").match(wr) || [ "-", 0, 0 ], i = +(60 * r[1]) + v(r[2]);
return "+" === r[0] ? i : -i;
}
function Pt(t, n) {
var r, a;
return n._isUTC ? (r = n.clone(), a = (m(t) || i(t) ? +t : +Ct(t)) - +r, r._d.setTime(+r._d + a), 
e.updateOffset(r, !1), r) : Ct(t).local();
}
function Nt(t) {
return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
}
function Rt(t, n) {
var r, i = this._offset || 0;
return null != t ? ("string" == typeof t && (t = Lt(t)), Math.abs(t) < 16 && (t = 60 * t), 
!this._isUTC && n && (r = Nt(this)), this._offset = t, this._isUTC = !0, null != r && this.add(r, "m"), 
i !== t && (!n || this._changeInProgress ? Qt(this, Gt(t - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
e.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? i : Nt(this);
}
function jt(t, e) {
return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
}
function qt(t) {
return this.utcOffset(0, t);
}
function Ft(t) {
return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Nt(this), "m")), 
this;
}
function Ut() {
return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Lt(this._i)), 
this;
}
function Ht(t) {
return t = t ? Ct(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0;
}
function Vt() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Bt() {
if (this._a) {
var t = this._isUTC ? u(this._a) : Ct(this._a);
return this.isValid() && g(this._a, t.toArray()) > 0;
}
return !1;
}
function Yt() {
return !this._isUTC;
}
function zt() {
return this._isUTC;
}
function Wt() {
return this._isUTC && 0 === this._offset;
}
function Gt(t, e) {
var n, r, i, a = t, s = null;
return Dt(t) ? a = {
ms: t._milliseconds,
d: t._days,
M: t._months
} : "number" == typeof t ? (a = {}, e ? a[e] = t : a.milliseconds = t) : (s = Er.exec(t)) ? (n = "-" === s[1] ? -1 : 1, 
a = {
y: 0,
d: v(s[ar]) * n,
h: v(s[or]) * n,
m: v(s[sr]) * n,
s: v(s[ur]) * n,
ms: v(s[cr]) * n
}) : (s = kr.exec(t)) ? (n = "-" === s[1] ? -1 : 1, a = {
y: Xt(s[2], n),
M: Xt(s[3], n),
d: Xt(s[4], n),
h: Xt(s[5], n),
m: Xt(s[6], n),
s: Xt(s[7], n),
w: Xt(s[8], n)
}) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (i = Kt(Ct(a.from), Ct(a.to)), 
a = {}, a.ms = i.milliseconds, a.M = i.months), r = new Mt(a), Dt(t) && o(t, "_locale") && (r._locale = t._locale), 
r;
}
function Xt(t, e) {
var n = t && parseFloat(t.replace(",", "."));
return (isNaN(n) ? 0 : n) * e;
}
function Jt(t, e) {
var n = {
milliseconds: 0,
months: 0
};
return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, 
n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
}
function Kt(t, e) {
var n;
return e = Pt(e, t), t.isBefore(e) ? n = Jt(t, e) : (n = Jt(e, t), n.milliseconds = -n.milliseconds, 
n.months = -n.months), n;
}
function Zt(t, e) {
return function(n, r) {
var i, a;
return null === r || isNaN(+r) || (tt(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), 
a = n, n = r, r = a), n = "string" == typeof n ? +n : n, i = Gt(n, r), Qt(this, i, t), 
this;
};
}
function Qt(t, n, r, i) {
var a = n._milliseconds, o = n._days, s = n._months;
i = null == i ? !0 : i, a && t._d.setTime(+t._d + a * r), o && O(t, "Date", A(t, "Date") + o * r), 
s && G(t, A(t, "Month") + s * r), i && e.updateOffset(t, o || s);
}
function te(t) {
var e = t || Ct(), n = Pt(e, this).startOf("day"), r = this.diff(n, "days", !0), i = -6 > r ? "sameElse" : -1 > r ? "lastWeek" : 0 > r ? "lastDay" : 1 > r ? "sameDay" : 2 > r ? "nextDay" : 7 > r ? "nextWeek" : "sameElse";
return this.format(this.localeData().calendar(i, this, Ct(e)));
}
function ee() {
return new p(this);
}
function ne(t, e) {
var n;
return e = _(void 0 !== e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Ct(t), 
+this > +t) : (n = m(t) ? +t : +Ct(t), n < +this.clone().startOf(e));
}
function re(t, e) {
var n;
return e = _(void 0 !== e ? e : "millisecond"), "millisecond" === e ? (t = m(t) ? t : Ct(t), 
+t > +this) : (n = m(t) ? +t : +Ct(t), +this.clone().endOf(e) < n);
}
function ie(t, e, n) {
return this.isAfter(t, n) && this.isBefore(e, n);
}
function ae(t, e) {
var n;
return e = _(e || "millisecond"), "millisecond" === e ? (t = m(t) ? t : Ct(t), +this === +t) : (n = +Ct(t), 
+this.clone().startOf(e) <= n && n <= +this.clone().endOf(e));
}
function oe(t) {
return 0 > t ? Math.ceil(t) : Math.floor(t);
}
function se(t, e, n) {
var r, i, a = Pt(t, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
return e = _(e), "year" === e || "month" === e || "quarter" === e ? (i = ue(this, a), 
"quarter" === e ? i /= 3 : "year" === e && (i /= 12)) : (r = this - a, i = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? (r - o) / 864e5 : "week" === e ? (r - o) / 6048e5 : r), 
n ? i : oe(i);
}
function ue(t, e) {
var n, r, i = 12 * (e.year() - t.year()) + (e.month() - t.month()), a = t.clone().add(i, "months");
return 0 > e - a ? (n = t.clone().add(i - 1, "months"), r = (e - a) / (a - n)) : (n = t.clone().add(i + 1, "months"), 
r = (e - a) / (n - a)), -(i + r);
}
function ce() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function le() {
var t = this.clone().utc();
return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : N(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function fe(t) {
var n = N(this, t || e.defaultFormat);
return this.localeData().postformat(n);
}
function he(t, e) {
return this.isValid() ? Gt({
to: this,
from: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function de(t) {
return this.from(Ct(), t);
}
function pe(t, e) {
return this.isValid() ? Gt({
from: this,
to: t
}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
}
function me(t) {
return this.to(Ct(), t);
}
function ve(t) {
var e;
return void 0 === t ? this._locale._abbr : (e = x(t), null != e && (this._locale = e), 
this);
}
function ge() {
return this._locale;
}
function ye(t) {
switch (t = _(t)) {
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
function $e(t) {
return t = _(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms");
}
function be() {
return +this._d - 6e4 * (this._offset || 0);
}
function we() {
return Math.floor(+this / 1e3);
}
function Ee() {
return this._offset ? new Date(+this) : this._d;
}
function ke() {
var t = this;
return [ t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond() ];
}
function xe() {
return f(this);
}
function Se() {
return s({}, l(this));
}
function _e() {
return l(this).overflow;
}
function Ce(t, e) {
I(0, [ t, t.length ], 0, e);
}
function Te(t, e, n) {
return ut(Ct([ t, 11, 31 + e - n ]), e, n).week;
}
function Ae(t) {
var e = ut(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
return null == t ? e : this.add(t - e, "y");
}
function Oe(t) {
var e = ut(this, 1, 4).year;
return null == t ? e : this.add(t - e, "y");
}
function Me() {
return Te(this.year(), 1, 4);
}
function De() {
var t = this.localeData()._week;
return Te(this.year(), t.dow, t.doy);
}
function Ie(t) {
return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
}
function Le(t, e) {
if ("string" == typeof t) if (isNaN(t)) {
if (t = e.weekdaysParse(t), "number" != typeof t) return null;
} else t = parseInt(t, 10);
return t;
}
function Pe(t) {
return this._weekdays[t.day()];
}
function Ne(t) {
return this._weekdaysShort[t.day()];
}
function Re(t) {
return this._weekdaysMin[t.day()];
}
function je(t) {
var e, n, r;
for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++) if (this._weekdaysParse[e] || (n = Ct([ 2e3, 1 ]).day(e), 
r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
this._weekdaysParse[e] = RegExp(r.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e;
}
function qe(t) {
var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
return null != t ? (t = Le(t, this.localeData()), this.add(t - e, "d")) : e;
}
function Fe(t) {
var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == t ? e : this.add(t - e, "d");
}
function Ue(t) {
return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7);
}
function He(t, e) {
I(t, 0, 0, function() {
return this.localeData().meridiem(this.hours(), this.minutes(), e);
});
}
function Ve(t, e) {
return e._meridiemParse;
}
function Be(t) {
return "p" === (t + "").toLowerCase().charAt(0);
}
function Ye(t, e, n) {
return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
function ze(t) {
I(0, [ t, 3 ], 0, "millisecond");
}
function We() {
return this._isUTC ? "UTC" : "";
}
function Ge() {
return this._isUTC ? "Coordinated Universal Time" : "";
}
function Xe(t) {
return Ct(1e3 * t);
}
function Je() {
return Ct.apply(null, arguments).parseZone();
}
function Ke(t, e, n) {
var r = this._calendar[t];
return "function" == typeof r ? r.call(e, n) : r;
}
function Ze(t) {
var e = this._longDateFormat[t];
return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
return t.slice(1);
}), this._longDateFormat[t] = e), e;
}
function Qe() {
return this._invalidDate;
}
function tn(t) {
return this._ordinal.replace("%d", t);
}
function en(t) {
return t;
}
function nn(t, e, n, r) {
var i = this._relativeTime[n];
return "function" == typeof i ? i(t, e, n, r) : i.replace(/%d/i, t);
}
function rn(t, e) {
var n = this._relativeTime[t > 0 ? "future" : "past"];
return "function" == typeof n ? n(e) : n.replace(/%s/i, e);
}
function an(t) {
var e, n;
for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e;
this._ordinalParseLenient = RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
}
function on(t, e, n, r) {
var i = x(), a = u().set(r, e);
return i[n](a, t);
}
function sn(t, e, n, r, i) {
if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return on(t, e, n, i);
var a, o = [];
for (a = 0; r > a; a++) o[a] = on(t, a, n, i);
return o;
}
function un(t, e) {
return sn(t, e, "months", 12, "month");
}
function cn(t, e) {
return sn(t, e, "monthsShort", 12, "month");
}
function ln(t, e) {
return sn(t, e, "weekdays", 7, "day");
}
function fn(t, e) {
return sn(t, e, "weekdaysShort", 7, "day");
}
function hn(t, e) {
return sn(t, e, "weekdaysMin", 7, "day");
}
function dn() {
var t = this._data;
return this._milliseconds = Yr(this._milliseconds), this._days = Yr(this._days), 
this._months = Yr(this._months), t.milliseconds = Yr(t.milliseconds), t.seconds = Yr(t.seconds), 
t.minutes = Yr(t.minutes), t.hours = Yr(t.hours), t.months = Yr(t.months), t.years = Yr(t.years), 
this;
}
function pn(t, e, n, r) {
var i = Gt(e, n);
return t._milliseconds += r * i._milliseconds, t._days += r * i._days, t._months += r * i._months, 
t._bubble();
}
function mn(t, e) {
return pn(this, t, e, 1);
}
function vn(t, e) {
return pn(this, t, e, -1);
}
function gn() {
var t, e, n, r = this._milliseconds, i = this._days, a = this._months, o = this._data, s = 0;
return o.milliseconds = r % 1e3, t = oe(r / 1e3), o.seconds = t % 60, e = oe(t / 60), 
o.minutes = e % 60, n = oe(e / 60), o.hours = n % 24, i += oe(n / 24), s = oe(yn(i)), 
i -= oe($n(s)), a += oe(i / 30), i %= 30, s += oe(a / 12), a %= 12, o.days = i, 
o.months = a, o.years = s, this;
}
function yn(t) {
return 400 * t / 146097;
}
function $n(t) {
return 146097 * t / 400;
}
function bn(t) {
var e, n, r = this._milliseconds;
if (t = _(t), "month" === t || "year" === t) return e = this._days + r / 864e5, 
n = this._months + 12 * yn(e), "month" === t ? n : n / 12;
switch (e = this._days + Math.round($n(this._months / 12)), t) {
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
function wn() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12);
}
function En(t) {
return function() {
return this.as(t);
};
}
function kn(t) {
return t = _(t), this[t + "s"]();
}
function xn(t) {
return function() {
return this._data[t];
};
}
function Sn() {
return oe(this.days() / 7);
}
function _n(t, e, n, r, i) {
return i.relativeTime(e || 1, !!n, t, r);
}
function Cn(t, e, n) {
var r = Gt(t).abs(), i = si(r.as("s")), a = si(r.as("m")), o = si(r.as("h")), s = si(r.as("d")), u = si(r.as("M")), c = si(r.as("y")), l = i < ui.s && [ "s", i ] || 1 === a && [ "m" ] || a < ui.m && [ "mm", a ] || 1 === o && [ "h" ] || o < ui.h && [ "hh", o ] || 1 === s && [ "d" ] || s < ui.d && [ "dd", s ] || 1 === u && [ "M" ] || u < ui.M && [ "MM", u ] || 1 === c && [ "y" ] || [ "yy", c ];
return l[2] = e, l[3] = +t > 0, l[4] = n, _n.apply(null, l);
}
function Tn(t, e) {
return void 0 === ui[t] ? !1 : void 0 === e ? ui[t] : (ui[t] = e, !0);
}
function An(t) {
var e = this.localeData(), n = Cn(this, !t, e);
return t && (n = e.pastFuture(+this, n)), e.postformat(n);
}
function On() {
var t = ci(this.years()), e = ci(this.months()), n = ci(this.days()), r = ci(this.hours()), i = ci(this.minutes()), a = ci(this.seconds() + this.milliseconds() / 1e3), o = this.asSeconds();
return o ? (0 > o ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (n ? n + "D" : "") + (r || i || a ? "T" : "") + (r ? r + "H" : "") + (i ? i + "M" : "") + (a ? a + "S" : "") : "P0D";
}
var Mn, Dn, In = e.momentProperties = [], Ln = !1, Pn = {}, Nn = {}, Rn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, jn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, qn = {}, Fn = {}, Un = /\d/, Hn = /\d\d/, Vn = /\d{3}/, Bn = /\d{4}/, Yn = /[+-]?\d{6}/, zn = /\d\d?/, Wn = /\d{1,3}/, Gn = /\d{1,4}/, Xn = /[+-]?\d{1,6}/, Jn = /\d+/, Kn = /[+-]?\d+/, Zn = /Z|[+-]\d\d:?\d\d/gi, Qn = /[+-]?\d+(\.\d{1,3})?/, tr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, er = {}, nr = {}, rr = 0, ir = 1, ar = 2, or = 3, sr = 4, ur = 5, cr = 6;
I("M", [ "MM", 2 ], "Mo", function() {
return this.month() + 1;
}), I("MMM", 0, 0, function(t) {
return this.localeData().monthsShort(this, t);
}), I("MMMM", 0, 0, function(t) {
return this.localeData().months(this, t);
}), S("month", "M"), j("M", zn), j("MM", zn, Hn), j("MMM", tr), j("MMMM", tr), U([ "M", "MM" ], function(t, e) {
e[ir] = v(t) - 1;
}), U([ "MMM", "MMMM" ], function(t, e, n, r) {
var i = n._locale.monthsParse(t, r, n._strict);
null != i ? e[ir] = i : l(n).invalidMonth = t;
});
var lr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), fr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), hr = {};
e.suppressDeprecationWarnings = !1;
var dr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, pr = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], mr = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], vr = /^\/?Date\((\-?\d+)/i;
e.createFromInputFallback = Q("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
}), I(0, [ "YY", 2 ], 0, function() {
return this.year() % 100;
}), I(0, [ "YYYY", 4 ], 0, "year"), I(0, [ "YYYYY", 5 ], 0, "year"), I(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
S("year", "y"), j("Y", Kn), j("YY", zn, Hn), j("YYYY", Gn, Bn), j("YYYYY", Xn, Yn), 
j("YYYYYY", Xn, Yn), U([ "YYYY", "YYYYY", "YYYYYY" ], rr), U("YY", function(t, n) {
n[rr] = e.parseTwoDigitYear(t);
}), e.parseTwoDigitYear = function(t) {
return v(t) + (v(t) > 68 ? 1900 : 2e3);
};
var gr = T("FullYear", !1);
I("w", [ "ww", 2 ], "wo", "week"), I("W", [ "WW", 2 ], "Wo", "isoWeek"), S("week", "w"), 
S("isoWeek", "W"), j("w", zn), j("ww", zn, Hn), j("W", zn), j("WW", zn, Hn), H([ "w", "ww", "W", "WW" ], function(t, e, n, r) {
e[r.substr(0, 1)] = v(t);
});
var yr = {
dow: 0,
doy: 6
};
I("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), S("dayOfYear", "DDD"), j("DDD", Wn), 
j("DDDD", Vn), U([ "DDD", "DDDD" ], function(t, e, n) {
n._dayOfYear = v(t);
}), e.ISO_8601 = function() {};
var $r = Q("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
var t = Ct.apply(null, arguments);
return this > t ? this : t;
}), br = Q("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
var t = Ct.apply(null, arguments);
return t > this ? this : t;
});
It("Z", ":"), It("ZZ", ""), j("Z", Zn), j("ZZ", Zn), U([ "Z", "ZZ" ], function(t, e, n) {
n._useUTC = !0, n._tzm = Lt(t);
});
var wr = /([\+\-]|\d\d)/gi;
e.updateOffset = function() {};
var Er = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, kr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
Gt.fn = Mt.prototype;
var xr = Zt(1, "add"), Sr = Zt(-1, "subtract");
e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
var _r = Q("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
return void 0 === t ? this.localeData() : this.locale(t);
});
I(0, [ "gg", 2 ], 0, function() {
return this.weekYear() % 100;
}), I(0, [ "GG", 2 ], 0, function() {
return this.isoWeekYear() % 100;
}), Ce("gggg", "weekYear"), Ce("ggggg", "weekYear"), Ce("GGGG", "isoWeekYear"), 
Ce("GGGGG", "isoWeekYear"), S("weekYear", "gg"), S("isoWeekYear", "GG"), j("G", Kn), 
j("g", Kn), j("GG", zn, Hn), j("gg", zn, Hn), j("GGGG", Gn, Bn), j("gggg", Gn, Bn), 
j("GGGGG", Xn, Yn), j("ggggg", Xn, Yn), H([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(t, e, n, r) {
e[r.substr(0, 2)] = v(t);
}), H([ "gg", "GG" ], function(t, n, r, i) {
n[i] = e.parseTwoDigitYear(t);
}), I("Q", 0, 0, "quarter"), S("quarter", "Q"), j("Q", Un), U("Q", function(t, e) {
e[ir] = 3 * (v(t) - 1);
}), I("D", [ "DD", 2 ], "Do", "date"), S("date", "D"), j("D", zn), j("DD", zn, Hn), 
j("Do", function(t, e) {
return t ? e._ordinalParse : e._ordinalParseLenient;
}), U([ "D", "DD" ], ar), U("Do", function(t, e) {
e[ar] = v(t.match(zn)[0], 10);
});
var Cr = T("Date", !0);
I("d", 0, "do", "day"), I("dd", 0, 0, function(t) {
return this.localeData().weekdaysMin(this, t);
}), I("ddd", 0, 0, function(t) {
return this.localeData().weekdaysShort(this, t);
}), I("dddd", 0, 0, function(t) {
return this.localeData().weekdays(this, t);
}), I("e", 0, 0, "weekday"), I("E", 0, 0, "isoWeekday"), S("day", "d"), S("weekday", "e"), 
S("isoWeekday", "E"), j("d", zn), j("e", zn), j("E", zn), j("dd", tr), j("ddd", tr), 
j("dddd", tr), H([ "dd", "ddd", "dddd" ], function(t, e, n) {
var r = n._locale.weekdaysParse(t);
null != r ? e.d = r : l(n).invalidWeekday = t;
}), H([ "d", "e", "E" ], function(t, e, n, r) {
e[r] = v(t);
});
var Tr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Ar = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Or = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
I("H", [ "HH", 2 ], 0, "hour"), I("h", [ "hh", 2 ], 0, function() {
return this.hours() % 12 || 12;
}), He("a", !0), He("A", !1), S("hour", "h"), j("a", Ve), j("A", Ve), j("H", zn), 
j("h", zn), j("HH", zn, Hn), j("hh", zn, Hn), U([ "H", "HH" ], or), U([ "a", "A" ], function(t, e, n) {
n._isPm = n._locale.isPM(t), n._meridiem = t;
}), U([ "h", "hh" ], function(t, e, n) {
e[or] = v(t), l(n).bigHour = !0;
});
var Mr = /[ap]\.?m?\.?/i, Dr = T("Hours", !0);
I("m", [ "mm", 2 ], 0, "minute"), S("minute", "m"), j("m", zn), j("mm", zn, Hn), 
U([ "m", "mm" ], sr);
var Ir = T("Minutes", !1);
I("s", [ "ss", 2 ], 0, "second"), S("second", "s"), j("s", zn), j("ss", zn, Hn), 
U([ "s", "ss" ], ur);
var Lr = T("Seconds", !1);
I("S", 0, 0, function() {
return ~~(this.millisecond() / 100);
}), I(0, [ "SS", 2 ], 0, function() {
return ~~(this.millisecond() / 10);
}), ze("SSS"), ze("SSSS"), S("millisecond", "ms"), j("S", Wn, Un), j("SS", Wn, Hn), 
j("SSS", Wn, Vn), j("SSSS", Jn), U([ "S", "SS", "SSS", "SSSS" ], function(t, e) {
e[cr] = v(1e3 * ("0." + t));
});
var Pr = T("Milliseconds", !1);
I("z", 0, 0, "zoneAbbr"), I("zz", 0, 0, "zoneName");
var Nr = p.prototype;
Nr.add = xr, Nr.calendar = te, Nr.clone = ee, Nr.diff = se, Nr.endOf = $e, Nr.format = fe, 
Nr.from = he, Nr.fromNow = de, Nr.to = pe, Nr.toNow = me, Nr.get = M, Nr.invalidAt = _e, 
Nr.isAfter = ne, Nr.isBefore = re, Nr.isBetween = ie, Nr.isSame = ae, Nr.isValid = xe, 
Nr.lang = _r, Nr.locale = ve, Nr.localeData = ge, Nr.max = br, Nr.min = $r, Nr.parsingFlags = Se, 
Nr.set = M, Nr.startOf = ye, Nr.subtract = Sr, Nr.toArray = ke, Nr.toDate = Ee, 
Nr.toISOString = le, Nr.toJSON = le, Nr.toString = ce, Nr.unix = we, Nr.valueOf = be, 
Nr.year = gr, Nr.isLeapYear = st, Nr.weekYear = Ae, Nr.isoWeekYear = Oe, Nr.quarter = Nr.quarters = Ie, 
Nr.month = X, Nr.daysInMonth = J, Nr.week = Nr.weeks = ht, Nr.isoWeek = Nr.isoWeeks = dt, 
Nr.weeksInYear = De, Nr.isoWeeksInYear = Me, Nr.date = Cr, Nr.day = Nr.days = qe, 
Nr.weekday = Fe, Nr.isoWeekday = Ue, Nr.dayOfYear = mt, Nr.hour = Nr.hours = Dr, 
Nr.minute = Nr.minutes = Ir, Nr.second = Nr.seconds = Lr, Nr.millisecond = Nr.milliseconds = Pr, 
Nr.utcOffset = Rt, Nr.utc = qt, Nr.local = Ft, Nr.parseZone = Ut, Nr.hasAlignedHourOffset = Ht, 
Nr.isDST = Vt, Nr.isDSTShifted = Bt, Nr.isLocal = Yt, Nr.isUtcOffset = zt, Nr.isUtc = Wt, 
Nr.isUTC = Wt, Nr.zoneAbbr = We, Nr.zoneName = Ge, Nr.dates = Q("dates accessor is deprecated. Use date instead.", Cr), 
Nr.months = Q("months accessor is deprecated. Use month instead", X), Nr.years = Q("years accessor is deprecated. Use year instead", gr), 
Nr.zone = Q("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", jt);
var Rr = Nr, jr = {
sameDay: "[Today at] LT",
nextDay: "[Tomorrow at] LT",
nextWeek: "dddd [at] LT",
lastDay: "[Yesterday at] LT",
lastWeek: "[Last] dddd [at] LT",
sameElse: "L"
}, qr = {
LTS: "h:mm:ss A",
LT: "h:mm A",
L: "MM/DD/YYYY",
LL: "MMMM D, YYYY",
LLL: "MMMM D, YYYY LT",
LLLL: "dddd, MMMM D, YYYY LT"
}, Fr = "Invalid date", Ur = "%d", Hr = /\d{1,2}/, Vr = {
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
}, Br = y.prototype;
Br._calendar = jr, Br.calendar = Ke, Br._longDateFormat = qr, Br.longDateFormat = Ze, 
Br._invalidDate = Fr, Br.invalidDate = Qe, Br._ordinal = Ur, Br.ordinal = tn, Br._ordinalParse = Hr, 
Br.preparse = en, Br.postformat = en, Br._relativeTime = Vr, Br.relativeTime = nn, 
Br.pastFuture = rn, Br.set = an, Br.months = Y, Br._months = lr, Br.monthsShort = z, 
Br._monthsShort = fr, Br.monthsParse = W, Br.week = ct, Br._week = yr, Br.firstDayOfYear = ft, 
Br.firstDayOfWeek = lt, Br.weekdays = Pe, Br._weekdays = Tr, Br.weekdaysMin = Re, 
Br._weekdaysMin = Or, Br.weekdaysShort = Ne, Br._weekdaysShort = Ar, Br.weekdaysParse = je, 
Br.isPM = Be, Br._meridiemParse = Mr, Br.meridiem = Ye, E("en", {
ordinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal: function(t) {
var e = t % 10, n = 1 === v(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
return t + n;
}
}), e.lang = Q("moment.lang is deprecated. Use moment.locale instead.", E), e.langData = Q("moment.langData is deprecated. Use moment.localeData instead.", x);
var Yr = Math.abs, zr = En("ms"), Wr = En("s"), Gr = En("m"), Xr = En("h"), Jr = En("d"), Kr = En("w"), Zr = En("M"), Qr = En("y"), ti = xn("milliseconds"), ei = xn("seconds"), ni = xn("minutes"), ri = xn("hours"), ii = xn("days"), ai = xn("months"), oi = xn("years"), si = Math.round, ui = {
s: 45,
m: 45,
h: 22,
d: 26,
M: 11
}, ci = Math.abs, li = Mt.prototype;
li.abs = dn, li.add = mn, li.subtract = vn, li.as = bn, li.asMilliseconds = zr, 
li.asSeconds = Wr, li.asMinutes = Gr, li.asHours = Xr, li.asDays = Jr, li.asWeeks = Kr, 
li.asMonths = Zr, li.asYears = Qr, li.valueOf = wn, li._bubble = gn, li.get = kn, 
li.milliseconds = ti, li.seconds = ei, li.minutes = ni, li.hours = ri, li.days = ii, 
li.weeks = Sn, li.months = ai, li.years = oi, li.humanize = An, li.toISOString = On, 
li.toString = On, li.toJSON = On, li.locale = ve, li.localeData = ge, li.toIsoString = Q("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", On), 
li.lang = _r, I("X", 0, 0, "unix"), I("x", 0, 0, "valueOf"), j("x", Kn), j("X", Qn), 
U("X", function(t, e, n) {
n._d = new Date(1e3 * parseFloat(t, 10));
}), U("x", function(t, e, n) {
n._d = new Date(v(t));
}), e.version = "2.10.3", n(Ct), e.fn = Rr, e.min = At, e.max = Ot, e.utc = u, e.unix = Xe, 
e.months = un, e.isDate = i, e.locale = E, e.invalid = h, e.duration = Gt, e.isMoment = m, 
e.weekdays = ln, e.parseZone = Je, e.localeData = x, e.isDuration = Dt, e.monthsShort = cn, 
e.weekdaysMin = hn, e.defineLocale = k, e.weekdaysShort = fn, e.normalizeUnits = _, 
e.relativeTimeThreshold = Tn;
var fi = e;
return fi;
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
e.merge = function a(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = a(n, t[i]);
return n;
}
var o = t.class, s = e.class;
(o || s) && (o = o || [], s = s || [], Array.isArray(o) || (o = [ o ]), Array.isArray(s) || (s = [ s ]), 
t.class = o.concat(s).filter(r));
for (var u in e) "class" != u && (t[u] = e[u]);
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
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function o(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (a) {
o(t, null, r);
}
var s = 3, u = i.split("\n"), c = Math.max(r - s, 0), l = Math.min(u.length, r + s), s = u.slice(c, l).map(function(t, e) {
var n = e + c + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + s + "\n\n" + t.message, 
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
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, a) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, a);
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
var n = this, i = void 0 === arguments[1] ? {} : arguments[1], a = i.maxImageSize;
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
} ]);
//# sourceMappingURL=profile.8c1fc9516d3eb8c72269.js.map
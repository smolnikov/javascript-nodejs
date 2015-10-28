var profile = webpackJsonp_name_([ 10 ], [ function(e, t, n) {
"use strict";
var r = n(2), i = (n(23), n(48)), a = n(54), o = r.module("profile", [ "ui.router", "ngResource", "global403Interceptor", "ajoslin.promise-tracker", "progress", "focusOn", "ngMessages" ]);
n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41), 
n(29), n(42), n(43), n(44), n(45), n(46), n(47), o.filter("unsafe_html", [ "$sce", function(e) {
return function(t) {
return e.trustAsHtml(t);
};
} ]).filter("capitalize", function() {
return function(e) {
return e[0].toUpperCase() + e.slice(1);
};
}).filter("longDate", function() {
return function(e, t) {
return e = i(e), void 0 !== t && (e = e.utcOffset(t)), e.format("D MMMM YYYY в LT");
};
}).filter("shortDate", function() {
return function(e, t) {
return e = i(e), void 0 !== t && (e = e.utcOffset(t)), e.format("D MMM YYYY");
};
}).filter("quizDuration", function() {
return function(e) {
var t = Math.round(e / 1e3);
return i.duration(t, "seconds").humanize();
};
}).filter("pluralize", function() {
return a;
}).filter("trust_html", [ "$sce", function(e) {
return function(t) {
return t = e.trustAsHtml(t);
};
} ]);
}, function(e, t, n) {
"use strict";
t.promptSquarePhoto = n(81);
}, function(e) {
e.exports = angular;
}, , , , , , , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").config([ "$locationProvider", "$stateProvider", "$urlRouterProvider", function(e, t, n) {
e.html5Mode(!0), n.otherwise("/"), t.state("root", {
"abstract": !0,
resolve: {
me: [ "Me", function(e) {
return e.get();
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
quizResults: [ "QuizResults", function(e) {
return e.query();
} ]
}
},
"root.orders": {
url: "/orders",
title: "Заказы",
templateUrl: "/profile/templates/partials/orders",
controller: "ProfileOrdersCtrl",
resolve: {
orders: [ "Orders", function(e) {
return e.query();
} ]
}
},
"root.courses": {
url: "/courses",
title: "Курсы",
templateUrl: "/profile/templates/partials/courseGroups",
controller: "ProfileCourseGroupsCtrl",
resolve: {
courseGroups: [ "CourseGroups", function(e) {
return e.query();
} ]
}
}
};
for (var i in r) t.state(i, r[i]);
} ]);
}, function(e, t, n) {
"use strict";
var r = n(23), i = n(2), a = n(135);
i.module("profile").directive("profileField", [ "promiseTracker", "$http", "$timeout", function(e, t, n) {
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
o.formatValue || (o.formatValue = function(e) {
return "" === e || null === e || void 0 === e ? e : a(e);
}), o.loadingTracker = e(), o.edit = function(e) {
e.target.closest("a") || this.editing || (this.editing = !0, this.editingValue = this.value);
}, o.submit = function() {
var e = this;
if (!this.form.$invalid) {
if (this.value == this.editingValue) return this.editing = !1, void (this.editingValue = "");
var n = new FormData();
n.append(this.name, this.editingValue), t({
method: "PATCH",
url: "/users/me",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: n
}).then(function() {
if ("displayName" == e.name) new r.Success("Ваше имя пользователя изменено.", "slow"); else if ("email" == e.name) new r.Warning("Требуется подтвердить смену email, проверьте почту.", "slow"); else if ("profileName" == e.name) {
new r.Success("Ваш профиль доступен по новому адресу, страница будет перезагружена");
var t = e.editingValue;
setTimeout(function() {
window.location.href = "/profile/" + t + "/account";
}, 2e3);
} else new r.Success("Информация обновлена.");
e.editing = !1, e.value = e.editingValue, e.editingValue = "";
}, function(e) {
400 == e.status ? new r.Error(e.data.message) : 409 == e.status ? new r.Error(e.data.message) : new r.Error("Ошибка загрузки, статус " + e.status);
});
}
}, o.cancel = function() {
var e = this;
this.editing && n(function() {
e.editing = !1, e.editingValue = "";
});
}, l(o, function(e) {
s[0].querySelector("[control-transclude]").append(e[0]);
});
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("orderParticipants", [ "promiseTracker", "$http", "$timeout", function(e, t) {
return {
templateUrl: "/profile/templates/partials/orderParticipants",
scope: {
order: "="
},
replace: !0,
link: function(n) {
function a(e) {
for (var t = [], r = 0; r < e.participants.length; r++) {
var i = e.participants[r], a = !n.participants.some(function(e) {
return e.email == i.email;
});
a && t.push(i.email);
}
return t;
}
for (n.participants = i.copy(n.order.participants); n.participants.length != n.order.count; ) n.participants.push({
inGroup: !1,
email: ""
});
n.loadingTracker = e(), n.onEmailKeyDown = function(e) {
if (13 == e.keyCode) {
var t = e.target.name.split("_");
t.push(+t.pop() + 1), t = t.join("_");
var n = document.getElementById(t);
n && n.focus();
}
}, n.submit = function() {
if (!this.participantsForm.$invalid) {
if ("success" == n.order.status) {
var e = a(n.order), o = confirm("Вы удалили участников, которые получили приглашения на курс: " + e + ".\nПри продолжении их приглашения станут недействительными.\nПродолжить?");
if (!o) return;
}
var s = new FormData();
s.append("orderNumber", n.order.number);
var u = n.participants.map(function(e) {
return e.inGroup ? void 0 : e.email;
}).filter(Boolean);
s.append("emails", u), t({
method: "PATCH",
url: "/payments/common/order",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: s
}).then(function(e) {
new r.Success(e.data), n.order.participants = i.copy(n.participants);
}, function(e) {
400 == e.status ? new r.Error(e.data.message) : new r.Error("Ошибка загрузки, статус " + e.status);
});
}
};
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("orderContact", [ "promiseTracker", "$http", "$timeout", function(e, t) {
return {
templateUrl: "/profile/templates/partials/orderContact",
scope: {
order: "="
},
replace: !0,
link: function(n) {
n.contactName = n.order.contactName, n.contactPhone = n.order.contactPhone, n.loadingTracker = e(), 
n.submit = function() {
if (!this.contactForm.$invalid) {
var e = new FormData();
e.append("orderNumber", n.order.number), e.append("contactName", n.contactName), 
e.append("contactPhone", n.contactPhone), t({
method: "PATCH",
url: "/payments/common/order",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: e
}).then(function() {
new r.Success("Информация обновлена."), n.order.contactName = n.contactName, n.order.contactPhone = n.contactPhone;
}, function(e) {
400 == e.status ? new r.Error(e.data.message) : new r.Error("Ошибка загрузки, статус " + e.status);
});
}
};
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = n(23), i = n(2), a = n(56).thumb, o = n(1).promptSquarePhoto;
i.module("profile").directive("profilePhoto", [ "promiseTracker", "$http", function(e, t) {
return {
templateUrl: "/profile/templates/partials/profilePhoto",
scope: {
photo: "=",
teachesCourses: "="
},
replace: !0,
link: function(n) {
function a(e) {
var a = new FormData();
a.append("photo", e), t({
method: "POST",
url: "/imgur/upload",
headers: {
"Content-Type": void 0
},
tracker: n.loadingTracker,
transformRequest: i.identity,
data: a
}).then(function(e) {
return t({
method: "PATCH",
url: "/users/me",
tracker: n.loadingTracker,
data: {
photoId: e.data.imgurId
}
});
}).then(function(e) {
n.photo = e.data.photo, new r.Success("Изображение обновлено.");
}, function(e) {
400 == e.status && new r.Error("Неверный тип файла или изображение повреждено.");
});
}
n.loadingTracker = e(), n.changePhoto = function() {
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
}, function(e, t, n) {
"use strict";
var r = n(23), i = n(2);
i.module("profile").directive("profilePassword", [ "promiseTracker", "$http", "$timeout", function(e, t, n) {
return {
templateUrl: "/profile/templates/partials/profilePassword",
scope: {
hasPassword: "="
},
replace: !0,
link: function(a, o) {
a.password = "", a.passwordOld = "", a.loadingTracker = e(), a.edit = function() {
this.editing || (this.editing = !0, n(function() {
var e = o[0].elements[a.hasPassword ? "passwordOld" : "password"];
e.focus();
}));
}, a.submit = function() {
if (!a.form.$invalid) {
var e = new FormData();
e.append("password", this.password), e.append("passwordOld", this.passwordOld), 
t({
method: "PATCH",
url: "/users/me",
tracker: this.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: i.identity,
data: e
}).then(function() {
new r.Success("Пароль обновлён."), a.editing = !1, a.hasPassword = !0, a.password = "", 
a.passwordOld = "", a.form.$setPristine();
}, function(e) {
400 == e.status ? new r.Error(e.data.message || e.data.errors.password) : new r.Error("Ошибка загрузки, статус " + e.status);
});
}
}, a.cancel = function() {
var e = this;
this.editing && n(function() {
e.editing = !1;
});
};
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = (n(23), n(2));
n(72), r.module("profile").directive("profileAuthProviders", [ "promiseTracker", "$http", "authPopup", "Me", function(e, t, n, r) {
return {
templateUrl: "/profile/templates/partials/profileAuthProviders",
replace: !0,
link: function(e) {
e.connect = function(t) {
arguments;
n("/auth/connect/" + t, function() {
e.me = r.get();
}, function() {});
}, e.connected = function(t) {
var n = !1;
return e.me.providers ? (e.me.providers.forEach(function(e) {
e.name == t && (n = !0);
}), n) : !1;
};
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").directive("dateValidator", function() {
return {
require: "ngModel",
link: function(e, t, n, r) {
r.$validators.date = function(e, t) {
var n = e || t;
if (!n) return !0;
var r = n.split(".");
if (3 != r.length) return !1;
var i = new Date(r[2], r[1] - 1, r[0]);
return 4 != r[2].length ? !1 : i.getFullYear() == r[2] && i.getMonth() == r[1] - 1 && i.getDate() == r[0];
};
}
};
});
}, function(e, t, n) {
"use strict";
var r = (n(23), n(2)), i = n(48);
r.module("profile").directive("dateRangeValidator", function() {
return {
require: "ngModel",
link: function(e, t, n, r) {
var a = n.dateRangeValidator.split("-"), o = a[0] ? i(a[0], "DD.MM.YYYY").toDate() : new Date(), s = a[1] ? i(a[1], "DD.MM.YYYY").toDate() : new Date();
r.$validators.dateRange = function(e, t) {
var n = e || t;
if (!n) return !0;
var r = n.split(".");
if (3 != r.length) return !1;
var i = new Date(r[2], r[1] - 1, r[0]);
return 4 != r[2].length ? !1 : i >= o && s >= i;
};
}
};
});
}, function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile");
r.module("profile").factory("Me", [ "$resource", function(e) {
return e("/users/me", {}, {
get: {
method: "GET",
transformResponse: function(e) {
return e = JSON.parse(e), e.created = new Date(e.created), e;
}
}
});
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").factory("QuizResults", [ "$resource", function(e) {
return e("/quiz/results/user/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(e) {
return e = JSON.parse(e), e.forEach(function(e) {
e.created = new Date(e.created);
}), e;
}
}
});
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").factory("Orders", [ "$resource", function(e) {
return e("/payments/common/orders/user/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(e) {
return e = JSON.parse(e), e.forEach(function(e) {
e.created = new Date(e.created), e.countDetails = {
free: e.count - e.participants.length,
busy: e.participants.length,
inGroup: e.participants.filter(function(e) {
return e.inGroup;
}).length
};
}), e;
}
}
});
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").factory("CourseGroups", [ "$resource", function(e) {
return e("/courses/profile/" + window.currentUser.id, {}, {
query: {
method: "GET",
isArray: !0,
transformResponse: function(e) {
return e = JSON.parse(e), e.forEach(function(e) {
e.dateStart = new Date(e.dateStart), e.dateEnd = new Date(e.dateEnd);
}), e;
}
}
});
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = r.module("profile");
i.controller("ProfileRootCtrl", [ "$scope", "$state", "$timeout", "$http", "me", "promiseTracker", function(e, t, n, r, i, a) {
e.me = i, e.loadingTracker = a();
var o = [ "root.aboutme", "root.account" ];
window.currentUser.profileTabsEnabled.forEach(function(e) {
o.push("root." + e);
}), e.tabs = o.map(function(e) {
var n = t.get(e);
return {
title: n.title,
name: n.name,
url: n.url
};
});
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = n(23), a = (n(48), r.module("profile"));
a.controller("ProfileOrdersCtrl", [ "$scope", "$http", "$window", "orders", function(e, t, n, a) {
e.orders = a, e.changePayment = function(e) {
n.location.href = "/courses/orders/" + e.number + "?changePayment=1";
}, e.cancelOrder = function(e) {
var n = confirm("Заказ будет отменён, без возможности восстановления. Продолжать?");
if (n) {
var o = new FormData();
o.append("orderNumber", e.number), t({
method: "DELETE",
url: "/payments/common/order",
headers: {
"Content-Type": void 0
},
transformRequest: r.identity,
data: o
}).then(function() {
a.splice(a.indexOf(e), 1), new i.Success("Заказ удалён.");
}, function(e) {
400 == e.status ? new i.Error(e.data.message) : new i.Error("Ошибка загрузки, статус " + e.status);
});
}
};
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = (n(23), r.module("profile"));
i.controller("ProfileCourseGroupsCtrl", [ "$scope", "$http", "$window", "courseGroups", function(e, t, n, r) {
e.courseGroups = r;
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = r.module("profile");
n(136);
i.controller("ProfileAboutMeCtrl", [ "$scope", "me", function(e, t) {
e.me = t, e.renderParagraphsAndLinks = n(136);
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = r.module("profile");
i.controller("ProfileQuizResultsCtrl", [ "$scope", "quizResults", function(e, t) {
e.quizResults = t;
} ]);
}, function(e, t, n) {
"use strict";
var r = n(2), i = n(23), a = (n(48), r.module("profile"));
a.controller("ProfileAccountCtrl", [ "$scope", "$http", "me", "Me", function(e, t, n, a) {
e.me = n, e.remove = function() {
var a = confirm(n.displayName + " (" + n.email + ") - удалить пользователя без возможности восстановления?");
a && t({
method: "DELETE",
url: "/users/me",
tracker: e.loadingTracker,
headers: {
"Content-Type": void 0
},
transformRequest: r.identity,
data: new FormData()
}).then(function() {
new i.Success("Пользователь удалён."), setTimeout(function() {
window.location.href = "/";
}, 1500);
}, function(e) {
new i.Error("Ошибка загрузки, статус " + e.status);
});
}, e.removeProvider = function(n) {
var r = confirm(n + " - удалить привязку?");
r && t({
method: "POST",
url: "/auth/disconnect/" + n,
tracker: this.loadingTracker
}).then(function() {
e.me = a.get();
}, function(e) {
new i.Error("Ошибка загрузки, статус " + e.status);
});
};
} ]);
}, function(e, t, n) {
"use strict";
n(83), e.exports = n(86);
}, function(e, t, n) {
"use strict";
function r(e) {
e.bem = i, e.thumb = a;
}
var i = n(78)(), a = n(56).thumb;
e.exports = function(e, t) {
return t = t ? Object.create(t) : {}, r(t), e(t);
};
}, , , , , function(e) {
"use strict";
function t(e) {
return e % 10 == 1 && e % 100 != 11 ? "one" : e % 10 >= 2 && 4 >= e % 10 && (12 > e % 100 || e % 100 > 14) && e == Math.floor(e) ? "few" : e % 10 === 0 || e % 10 >= 5 && 9 >= e % 10 || e % 100 >= 11 && 14 >= e % 100 && e == Math.floor(e) ? "many" : "other";
}
function n(e, n, r, i) {
var a = t(e);
switch (a) {
case "one":
return n;

case "few":
return r;

case "many":
return i;

default:
throw Error("Unsupported count: " + e);
}
}
e.exports = n;
}, , function(e, t) {
"use strict";
t.thumb = function(e, t, n) {
if (!e) return e;
var r = window.devicePixelRatio;
t *= r, n *= r;
var i = 160 >= t && 160 >= n ? "t" : 320 >= t && 320 >= n ? "m" : 640 >= t && 640 >= n ? "i" : 1024 >= t && 1024 >= n ? "h" : "";
return e.slice(0, e.lastIndexOf(".")) + i + e.slice(e.lastIndexOf("."));
};
}, , , , , , , , , , , , , , , , function(e, t, n) {
"use strict";
var r = n(2);
r.module("profile").service("authPopup", function() {
var e;
return function(t, n, r) {
e && !e.closed && e.close();
var i = 800, a = 600, o = (window.outerHeight - a) / 2, s = (window.outerWidth - i) / 2;
window.authForm = {
onAuthSuccess: n,
onAuthFailure: r
}, e = window.open(t, "authForm", "width=" + i + ",height=" + a + ",scrollbars=0,top=" + o + ",left=" + s);
};
});
}, , , , , , function(e, t, n) {
"use strict";
var r = n(108);
e.exports = function(e) {
function t(e, t, n, i, a) {
var o = a || "div";
switch (o) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
e.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
e.push("<" + o + r.attrs(r.merge([ n ]), !0) + ">"), t && t(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(o) && e.push("</" + o + ">");
}
return e = e || {}, e.prefix = e.prefix || "", e.element = e.element || "__", e.modifier = e.modifier || "_", 
function(n, r, i, a) {
var o = this.block, s = this.attributes || {};
if (!s.class && i && !a) throw Error("Block without class: " + i);
if (s.class) {
var u = s.class;
u instanceof Array && (u = u.join(" ")), u = u.split(" ");
var c;
try {
c = u[0].match(RegExp("^(((?!" + e.element + "|" + e.modifier + ").)+)"))[1];
} catch (l) {
throw Error("Incorrect bem class: " + u[0]);
}
a ? u[0] = r[r.length - 1] + e.element + u[0] : r[r.length] = c;
var f = (a ? r[r.length - 1] + e.element : "") + c;
-1 === u.indexOf(f) && (u[u.length] = f);
for (var h = 0; h < u.length; h++) {
var d = u[h];
d.match(RegExp("^(?!" + e.element + ")" + e.modifier)) ? u[h] = f + d : d.match(RegExp("^" + e.element)) && (r[r.length - 2] ? u[h] = r[r.length - 2] + d : u[h] = r[r.length - 1] + d), 
u[h].match(RegExp("^" + f + "($|(?=" + e.element + "|" + e.modifier + "))")) && (u[h] = e.prefix + u[h]);
}
s.class = u.sort().join(" ");
}
t(n, o, s, r, i), a || r.pop();
};
};
}, , , function(e, t, n) {
"use strict";
var r = n(23), i = n(111);
e.exports = function(e) {
var t = e.minSize, n = e.onSuccess, a = document.createElement("input");
a.type = "file", a.accept = "image/*", a.onchange = function() {
a.remove();
var e = new FileReader(), o = a.files[0];
e.onload = function(e) {
var a = new Image();
a.onload = function() {
a.height < t || a.width < t ? new r.Error("Изображение должно иметь размер " + t + "x" + t + " или больше") : a.width == a.height ? n(o) : i(a, function(e) {
n(e);
});
}, a.onerror = function() {
new r.Error("Ошибка при загрузке или изображдение повреждено.");
}, a.src = e.target.result;
}, e.readAsDataURL(o);
}, a.hidden = !0, document.body.appendChild(a), a.click();
};
}, , function(e, t, n) {
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
!function(e, t) {
t(n(86));
}(this, function(e) {
"use strict";
function t(e, t) {
var n = e.split("_");
return t % 10 === 1 && t % 100 !== 11 ? n[0] : t % 10 >= 2 && 4 >= t % 10 && (10 > t % 100 || t % 100 >= 20) ? n[1] : n[2];
}
function n(e, n, r) {
var i = {
mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
hh: "час_часа_часов",
dd: "день_дня_дней",
MM: "месяц_месяца_месяцев",
yy: "год_года_лет"
};
return "m" === r ? n ? "минута" : "минуту" : e + " " + t(i[r], +e);
}
function r(e, t) {
var n = {
nominative: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
accusative: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_")
}, r = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" : "nominative";
return n[r][e.month()];
}
function i(e, t) {
var n = {
nominative: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
accusative: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_")
}, r = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/.test(t) ? "accusative" : "nominative";
return n[r][e.month()];
}
function a(e, t) {
var n = {
nominative: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
accusative: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_")
}, r = /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/.test(t) ? "accusative" : "nominative";
return n[r][e.day()];
}
var o = e.defineLocale("ru", {
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
lastWeek: function(e) {
if (e.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
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
isPM: function(e) {
return /^(дня|вечера)$/.test(e);
},
meridiem: function(e) {
return 4 > e ? "ночи" : 12 > e ? "утра" : 17 > e ? "дня" : "вечера";
},
ordinalParse: /\d{1,2}-(й|го|я)/,
ordinal: function(e, t) {
switch (t) {
case "M":
case "d":
case "DDD":
return e + "-й";

case "D":
return e + "-го";

case "w":
case "W":
return e + "-я";

default:
return e;
}
},
week: {
dow: 1,
doy: 7
}
});
return o;
});
}, , , function(e, t, n) {
(function(e) {
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(t, n) {
e.exports = n();
}(this, function() {
"use strict";
function t() {
return Ln.apply(null, arguments);
}
function n(e) {
Ln = e;
}
function r(e) {
return "[object Array]" === Object.prototype.toString.call(e);
}
function i(e) {
return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e);
}
function a(e, t) {
var n, r = [];
for (n = 0; n < e.length; ++n) r.push(t(e[n], n));
return r;
}
function o(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}
function s(e, t) {
for (var n in t) o(t, n) && (e[n] = t[n]);
return o(t, "toString") && (e.toString = t.toString), o(t, "valueOf") && (e.valueOf = t.valueOf), 
e;
}
function u(e, t, n, r) {
return Ae(e, t, n, r, !0).utc();
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
function l(e) {
return null == e._pf && (e._pf = c()), e._pf;
}
function f(e) {
if (null == e._isValid) {
var t = l(e);
e._isValid = !(isNaN(e._d.getTime()) || !(t.overflow < 0) || t.empty || t.invalidMonth || t.invalidWeekday || t.nullInput || t.invalidFormat || t.userInvalidated), 
e._strict && (e._isValid = e._isValid && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour);
}
return e._isValid;
}
function h(e) {
var t = u(NaN);
return null != e ? s(l(t), e) : l(t).userInvalidated = !0, t;
}
function d(e, t) {
var n, r, i;
if (void 0 !== t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject), 
void 0 !== t._i && (e._i = t._i), void 0 !== t._f && (e._f = t._f), void 0 !== t._l && (e._l = t._l), 
void 0 !== t._strict && (e._strict = t._strict), void 0 !== t._tzm && (e._tzm = t._tzm), 
void 0 !== t._isUTC && (e._isUTC = t._isUTC), void 0 !== t._offset && (e._offset = t._offset), 
void 0 !== t._pf && (e._pf = l(t)), void 0 !== t._locale && (e._locale = t._locale), 
Rn.length > 0) for (n in Rn) r = Rn[n], i = t[r], void 0 !== i && (e[r] = i);
return e;
}
function p(e) {
d(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), jn === !1 && (jn = !0, 
t.updateOffset(this), jn = !1);
}
function m(e) {
return e instanceof p || null != e && null != e._isAMomentObject;
}
function v(e) {
return 0 > e ? Math.ceil(e) : Math.floor(e);
}
function g(e) {
var t = +e, n = 0;
return 0 !== t && isFinite(t) && (n = v(t)), n;
}
function $(e, t, n) {
var r, i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), o = 0;
for (r = 0; i > r; r++) (n && e[r] !== t[r] || !n && g(e[r]) !== g(t[r])) && o++;
return o + a;
}
function y() {}
function b(e) {
return e ? e.toLowerCase().replace("_", "-") : e;
}
function w(e) {
for (var t, n, r, i, a = 0; a < e.length; ) {
for (i = b(e[a]).split("-"), t = i.length, n = b(e[a + 1]), n = n ? n.split("-") : null; t > 0; ) {
if (r = E(i.slice(0, t).join("-"))) return r;
if (n && n.length >= t && $(i, n, !0) >= t - 1) break;
t--;
}
a++;
}
return null;
}
function E(t) {
var n = null;
if (!qn[t] && void 0 !== e && e && e.exports) try {
n = Nn._abbr, !function() {
var e = Error('Cannot find module "./locale"');
throw e.code = "MODULE_NOT_FOUND", e;
}(), S(n);
} catch (r) {}
return qn[t];
}
function S(e, t) {
var n;
return e && (n = void 0 === t ? k(e) : x(e, t), n && (Nn = n)), Nn._abbr;
}
function x(e, t) {
return null !== t ? (t.abbr = e, qn[e] = qn[e] || new y(), qn[e].set(t), S(e), qn[e]) : (delete qn[e], 
null);
}
function k(e) {
var t;
if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e) return Nn;
if (!r(e)) {
if (t = E(e)) return t;
e = [ e ];
}
return w(e);
}
function _(e, t) {
var n = e.toLowerCase();
Fn[n] = Fn[n + "s"] = Fn[t] = e;
}
function C(e) {
return "string" == typeof e ? Fn[e] || Fn[e.toLowerCase()] : void 0;
}
function T(e) {
var t, n, r = {};
for (n in e) o(e, n) && (t = C(n), t && (r[t] = e[n]));
return r;
}
function A(e, n) {
return function(r) {
return null != r ? (O(this, e, r), t.updateOffset(this, n), this) : M(this, e);
};
}
function M(e, t) {
return e._d["get" + (e._isUTC ? "UTC" : "") + t]();
}
function O(e, t, n) {
return e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
}
function D(e, t) {
var n;
if ("object" == typeof e) for (n in e) this.set(n, e[n]); else if (e = C(e), "function" == typeof this[e]) return this[e](t);
return this;
}
function I(e, t, n) {
var r = "" + Math.abs(e), i = t - r.length, a = e >= 0;
return (a ? n ? "+" : "" : "-") + ("" + Math.pow(10, Math.max(0, i))).substr(1) + r;
}
function P(e, t, n, r) {
var i = r;
"string" == typeof r && (i = function() {
return this[r]();
}), e && (Bn[e] = i), t && (Bn[t[0]] = function() {
return I(i.apply(this, arguments), t[1], t[2]);
}), n && (Bn[n] = function() {
return this.localeData().ordinal(i.apply(this, arguments), e);
});
}
function L(e) {
return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function N(e) {
var t, n, r = e.match(Un);
for (t = 0, n = r.length; n > t; t++) Bn[r[t]] ? r[t] = Bn[r[t]] : r[t] = L(r[t]);
return function(i) {
var a = "";
for (t = 0; n > t; t++) a += r[t] instanceof Function ? r[t].call(i, e) : r[t];
return a;
};
}
function R(e, t) {
return e.isValid() ? (t = j(t, e.localeData()), Vn[t] = Vn[t] || N(t), Vn[t](e)) : e.localeData().invalidDate();
}
function j(e, t) {
function n(e) {
return t.longDateFormat(e) || e;
}
var r = 5;
for (Hn.lastIndex = 0; r >= 0 && Hn.test(e); ) e = e.replace(Hn, n), Hn.lastIndex = 0, 
r -= 1;
return e;
}
function q(e) {
return "function" == typeof e && "[object Function]" === Object.prototype.toString.call(e);
}
function F(e, t, n) {
ar[e] = q(t) ? t : function(e) {
return e && n ? n : t;
};
}
function U(e, t) {
return o(ar, e) ? ar[e](t._strict, t._locale) : RegExp(H(e));
}
function H(e) {
return e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, i) {
return t || n || r || i;
}).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function V(e, t) {
var n, r = t;
for ("string" == typeof e && (e = [ e ]), "number" == typeof t && (r = function(e, n) {
n[t] = g(e);
}), n = 0; n < e.length; n++) or[e[n]] = r;
}
function B(e, t) {
V(e, function(e, n, r, i) {
r._w = r._w || {}, t(e, r._w, r, i);
});
}
function Y(e, t, n) {
null != t && o(or, e) && or[e](t, n._a, n, e);
}
function z(e, t) {
return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
}
function W(e) {
return this._months[e.month()];
}
function G(e) {
return this._monthsShort[e.month()];
}
function X(e, t, n) {
var r, i, a;
for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
r = 0; 12 > r; r++) {
if (i = u([ 2e3, r ]), n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = RegExp("^" + this.months(i, "").replace(".", "") + "$", "i"), 
this._shortMonthsParse[r] = RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$", "i")), 
n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), 
this._monthsParse[r] = RegExp(a.replace(".", ""), "i")), n && "MMMM" === t && this._longMonthsParse[r].test(e)) return r;
if (n && "MMM" === t && this._shortMonthsParse[r].test(e)) return r;
if (!n && this._monthsParse[r].test(e)) return r;
}
}
function J(e, t) {
var n;
return "string" == typeof t && (t = e.localeData().monthsParse(t), "number" != typeof t) ? e : (n = Math.min(e.date(), z(e.year(), t)), 
e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n), e);
}
function K(e) {
return null != e ? (J(this, e), t.updateOffset(this, !0), this) : M(this, "Month");
}
function Z() {
return z(this.year(), this.month());
}
function Q(e) {
var t, n = e._a;
return n && -2 === l(e).overflow && (t = n[ur] < 0 || n[ur] > 11 ? ur : n[cr] < 1 || n[cr] > z(n[sr], n[ur]) ? cr : n[lr] < 0 || n[lr] > 24 || 24 === n[lr] && (0 !== n[fr] || 0 !== n[hr] || 0 !== n[dr]) ? lr : n[fr] < 0 || n[fr] > 59 ? fr : n[hr] < 0 || n[hr] > 59 ? hr : n[dr] < 0 || n[dr] > 999 ? dr : -1, 
l(e)._overflowDayOfYear && (sr > t || t > cr) && (t = cr), l(e).overflow = t), e;
}
function ee(e) {
t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn;
}
function te(e, t) {
var n = !0;
return s(function() {
return n && (ee(e + "\n" + Error().stack), n = !1), t.apply(this, arguments);
}, t);
}
function ne(e, t) {
vr[e] || (ee(t), vr[e] = !0);
}
function re(e) {
var t, n, r = e._i, i = gr.exec(r);
if (i) {
for (l(e).iso = !0, t = 0, n = $r.length; n > t; t++) if ($r[t][1].exec(r)) {
e._f = $r[t][0];
break;
}
for (t = 0, n = yr.length; n > t; t++) if (yr[t][1].exec(r)) {
e._f += (i[6] || " ") + yr[t][0];
break;
}
r.match(nr) && (e._f += "Z"), Ee(e);
} else e._isValid = !1;
}
function ie(e) {
var n = br.exec(e._i);
return null !== n ? void (e._d = new Date(+n[1])) : (re(e), void (e._isValid === !1 && (delete e._isValid, 
t.createFromInputFallback(e))));
}
function ae(e, t, n, r, i, a, o) {
var s = new Date(e, t, n, r, i, a, o);
return 1970 > e && s.setFullYear(e), s;
}
function oe(e) {
var t = new Date(Date.UTC.apply(null, arguments));
return 1970 > e && t.setUTCFullYear(e), t;
}
function se(e) {
return ue(e) ? 366 : 365;
}
function ue(e) {
return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
}
function ce() {
return ue(this.year());
}
function le(e, t, n) {
var r, i = n - t, a = n - e.day();
return a > i && (a -= 7), i - 7 > a && (a += 7), r = Me(e).add(a, "d"), {
week: Math.ceil(r.dayOfYear() / 7),
year: r.year()
};
}
function fe(e) {
return le(e, this._week.dow, this._week.doy).week;
}
function he() {
return this._week.dow;
}
function de() {
return this._week.doy;
}
function pe(e) {
var t = this.localeData().week(this);
return null == e ? t : this.add(7 * (e - t), "d");
}
function me(e) {
var t = le(this, 1, 4).week;
return null == e ? t : this.add(7 * (e - t), "d");
}
function ve(e, t, n, r, i) {
var a, o = 6 + i - r, s = oe(e, 0, 1 + o), u = s.getUTCDay();
return i > u && (u += 7), n = null != n ? 1 * n : i, a = 1 + o + 7 * (t - 1) - u + n, 
{
year: a > 0 ? e : e - 1,
dayOfYear: a > 0 ? a : se(e - 1) + a
};
}
function ge(e) {
var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == e ? t : this.add(e - t, "d");
}
function $e(e, t, n) {
return null != e ? e : null != t ? t : n;
}
function ye(e) {
var t = new Date();
return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] : [ t.getFullYear(), t.getMonth(), t.getDate() ];
}
function be(e) {
var t, n, r, i, a = [];
if (!e._d) {
for (r = ye(e), e._w && null == e._a[cr] && null == e._a[ur] && we(e), e._dayOfYear && (i = $e(e._a[sr], r[sr]), 
e._dayOfYear > se(i) && (l(e)._overflowDayOfYear = !0), n = oe(i, 0, e._dayOfYear), 
e._a[ur] = n.getUTCMonth(), e._a[cr] = n.getUTCDate()), t = 0; 3 > t && null == e._a[t]; ++t) e._a[t] = a[t] = r[t];
for (;7 > t; t++) e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
24 === e._a[lr] && 0 === e._a[fr] && 0 === e._a[hr] && 0 === e._a[dr] && (e._nextDay = !0, 
e._a[lr] = 0), e._d = (e._useUTC ? oe : ae).apply(null, a), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), 
e._nextDay && (e._a[lr] = 24);
}
}
function we(e) {
var t, n, r, i, a, o, s;
t = e._w, null != t.GG || null != t.W || null != t.E ? (a = 1, o = 4, n = $e(t.GG, e._a[sr], le(Me(), 1, 4).year), 
r = $e(t.W, 1), i = $e(t.E, 1)) : (a = e._locale._week.dow, o = e._locale._week.doy, 
n = $e(t.gg, e._a[sr], le(Me(), a, o).year), r = $e(t.w, 1), null != t.d ? (i = t.d, 
a > i && ++r) : i = null != t.e ? t.e + a : a), s = ve(n, r, i, o, a), e._a[sr] = s.year, 
e._dayOfYear = s.dayOfYear;
}
function Ee(e) {
if (e._f === t.ISO_8601) return void re(e);
e._a = [], l(e).empty = !0;
var n, r, i, a, o, s = "" + e._i, u = s.length, c = 0;
for (i = j(e._f, e._locale).match(Un) || [], n = 0; n < i.length; n++) a = i[n], 
r = (s.match(U(a, e)) || [])[0], r && (o = s.substr(0, s.indexOf(r)), o.length > 0 && l(e).unusedInput.push(o), 
s = s.slice(s.indexOf(r) + r.length), c += r.length), Bn[a] ? (r ? l(e).empty = !1 : l(e).unusedTokens.push(a), 
Y(a, r, e)) : e._strict && !r && l(e).unusedTokens.push(a);
l(e).charsLeftOver = u - c, s.length > 0 && l(e).unusedInput.push(s), l(e).bigHour === !0 && e._a[lr] <= 12 && e._a[lr] > 0 && (l(e).bigHour = void 0), 
e._a[lr] = Se(e._locale, e._a[lr], e._meridiem), be(e), Q(e);
}
function Se(e, t, n) {
var r;
return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n), 
r && 12 > t && (t += 12), r || 12 !== t || (t = 0), t) : t;
}
function xe(e) {
var t, n, r, i, a;
if (0 === e._f.length) return l(e).invalidFormat = !0, void (e._d = new Date(NaN));
for (i = 0; i < e._f.length; i++) a = 0, t = d({}, e), null != e._useUTC && (t._useUTC = e._useUTC), 
t._f = e._f[i], Ee(t), f(t) && (a += l(t).charsLeftOver, a += 10 * l(t).unusedTokens.length, 
l(t).score = a, (null == r || r > a) && (r = a, n = t));
s(e, n || t);
}
function ke(e) {
if (!e._d) {
var t = T(e._i);
e._a = [ t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond ], 
be(e);
}
}
function _e(e) {
var t = new p(Q(Ce(e)));
return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t;
}
function Ce(e) {
var t = e._i, n = e._f;
return e._locale = e._locale || k(e._l), null === t || void 0 === n && "" === t ? h({
nullInput: !0
}) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), m(t) ? new p(Q(t)) : (r(n) ? xe(e) : n ? Ee(e) : i(t) ? e._d = t : Te(e), 
e));
}
function Te(e) {
var n = e._i;
void 0 === n ? e._d = new Date() : i(n) ? e._d = new Date(+n) : "string" == typeof n ? ie(e) : r(n) ? (e._a = a(n.slice(0), function(e) {
return parseInt(e, 10);
}), be(e)) : "object" == typeof n ? ke(e) : "number" == typeof n ? e._d = new Date(n) : t.createFromInputFallback(e);
}
function Ae(e, t, n, r, i) {
var a = {};
return "boolean" == typeof n && (r = n, n = void 0), a._isAMomentObject = !0, a._useUTC = a._isUTC = i, 
a._l = n, a._i = e, a._f = t, a._strict = r, _e(a);
}
function Me(e, t, n, r) {
return Ae(e, t, n, r, !1);
}
function Oe(e, t) {
var n, i;
if (1 === t.length && r(t[0]) && (t = t[0]), !t.length) return Me();
for (n = t[0], i = 1; i < t.length; ++i) (!t[i].isValid() || t[i][e](n)) && (n = t[i]);
return n;
}
function De() {
var e = [].slice.call(arguments, 0);
return Oe("isBefore", e);
}
function Ie() {
var e = [].slice.call(arguments, 0);
return Oe("isAfter", e);
}
function Pe(e) {
var t = T(e), n = t.year || 0, r = t.quarter || 0, i = t.month || 0, a = t.week || 0, o = t.day || 0, s = t.hour || 0, u = t.minute || 0, c = t.second || 0, l = t.millisecond || 0;
this._milliseconds = +l + 1e3 * c + 6e4 * u + 36e5 * s, this._days = +o + 7 * a, 
this._months = +i + 3 * r + 12 * n, this._data = {}, this._locale = k(), this._bubble();
}
function Le(e) {
return e instanceof Pe;
}
function Ne(e, t) {
P(e, 0, 0, function() {
var e = this.utcOffset(), n = "+";
return 0 > e && (e = -e, n = "-"), n + I(~~(e / 60), 2) + t + I(~~e % 60, 2);
});
}
function Re(e) {
var t = (e || "").match(nr) || [], n = t[t.length - 1] || [], r = (n + "").match(kr) || [ "-", 0, 0 ], i = +(60 * r[1]) + g(r[2]);
return "+" === r[0] ? i : -i;
}
function je(e, n) {
var r, a;
return n._isUTC ? (r = n.clone(), a = (m(e) || i(e) ? +e : +Me(e)) - +r, r._d.setTime(+r._d + a), 
t.updateOffset(r, !1), r) : Me(e).local();
}
function qe(e) {
return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
}
function Fe(e, n) {
var r, i = this._offset || 0;
return null != e ? ("string" == typeof e && (e = Re(e)), Math.abs(e) < 16 && (e = 60 * e), 
!this._isUTC && n && (r = qe(this)), this._offset = e, this._isUTC = !0, null != r && this.add(r, "m"), 
i !== e && (!n || this._changeInProgress ? nt(this, Ke(e - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? i : qe(this);
}
function Ue(e, t) {
return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
}
function He(e) {
return this.utcOffset(0, e);
}
function Ve(e) {
return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(qe(this), "m")), 
this;
}
function Be() {
return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Re(this._i)), 
this;
}
function Ye(e) {
return e = e ? Me(e).utcOffset() : 0, (this.utcOffset() - e) % 60 === 0;
}
function ze() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function We() {
if (void 0 !== this._isDSTShifted) return this._isDSTShifted;
var e = {};
if (d(e, this), e = Ce(e), e._a) {
var t = e._isUTC ? u(e._a) : Me(e._a);
this._isDSTShifted = this.isValid() && $(e._a, t.toArray()) > 0;
} else this._isDSTShifted = !1;
return this._isDSTShifted;
}
function Ge() {
return !this._isUTC;
}
function Xe() {
return this._isUTC;
}
function Je() {
return this._isUTC && 0 === this._offset;
}
function Ke(e, t) {
var n, r, i, a = e, s = null;
return Le(e) ? a = {
ms: e._milliseconds,
d: e._days,
M: e._months
} : "number" == typeof e ? (a = {}, t ? a[t] = e : a.milliseconds = e) : (s = _r.exec(e)) ? (n = "-" === s[1] ? -1 : 1, 
a = {
y: 0,
d: g(s[cr]) * n,
h: g(s[lr]) * n,
m: g(s[fr]) * n,
s: g(s[hr]) * n,
ms: g(s[dr]) * n
}) : (s = Cr.exec(e)) ? (n = "-" === s[1] ? -1 : 1, a = {
y: Ze(s[2], n),
M: Ze(s[3], n),
d: Ze(s[4], n),
h: Ze(s[5], n),
m: Ze(s[6], n),
s: Ze(s[7], n),
w: Ze(s[8], n)
}) : null == a ? a = {} : "object" == typeof a && ("from" in a || "to" in a) && (i = et(Me(a.from), Me(a.to)), 
a = {}, a.ms = i.milliseconds, a.M = i.months), r = new Pe(a), Le(e) && o(e, "_locale") && (r._locale = e._locale), 
r;
}
function Ze(e, t) {
var n = e && parseFloat(e.replace(",", "."));
return (isNaN(n) ? 0 : n) * t;
}
function Qe(e, t) {
var n = {
milliseconds: 0,
months: 0
};
return n.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(n.months, "M").isAfter(t) && --n.months, 
n.milliseconds = +t - +e.clone().add(n.months, "M"), n;
}
function et(e, t) {
var n;
return t = je(t, e), e.isBefore(t) ? n = Qe(e, t) : (n = Qe(t, e), n.milliseconds = -n.milliseconds, 
n.months = -n.months), n;
}
function tt(e, t) {
return function(n, r) {
var i, a;
return null === r || isNaN(+r) || (ne(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), 
a = n, n = r, r = a), n = "string" == typeof n ? +n : n, i = Ke(n, r), nt(this, i, e), 
this;
};
}
function nt(e, n, r, i) {
var a = n._milliseconds, o = n._days, s = n._months;
i = null == i ? !0 : i, a && e._d.setTime(+e._d + a * r), o && O(e, "Date", M(e, "Date") + o * r), 
s && J(e, M(e, "Month") + s * r), i && t.updateOffset(e, o || s);
}
function rt(e, t) {
var n = e || Me(), r = je(n, this).startOf("day"), i = this.diff(r, "days", !0), a = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
return this.format(t && t[a] || this.localeData().calendar(a, this, Me(n)));
}
function it() {
return new p(this);
}
function at(e, t) {
var n;
return t = C(void 0 !== t ? t : "millisecond"), "millisecond" === t ? (e = m(e) ? e : Me(e), 
+this > +e) : (n = m(e) ? +e : +Me(e), n < +this.clone().startOf(t));
}
function ot(e, t) {
var n;
return t = C(void 0 !== t ? t : "millisecond"), "millisecond" === t ? (e = m(e) ? e : Me(e), 
+e > +this) : (n = m(e) ? +e : +Me(e), +this.clone().endOf(t) < n);
}
function st(e, t, n) {
return this.isAfter(e, n) && this.isBefore(t, n);
}
function ut(e, t) {
var n;
return t = C(t || "millisecond"), "millisecond" === t ? (e = m(e) ? e : Me(e), +this === +e) : (n = +Me(e), 
+this.clone().startOf(t) <= n && n <= +this.clone().endOf(t));
}
function ct(e, t, n) {
var r, i, a = je(e, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
return t = C(t), "year" === t || "month" === t || "quarter" === t ? (i = lt(this, a), 
"quarter" === t ? i /= 3 : "year" === t && (i /= 12)) : (r = this - a, i = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r), 
n ? i : v(i);
}
function lt(e, t) {
var n, r, i = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(i, "months");
return 0 > t - a ? (n = e.clone().add(i - 1, "months"), r = (t - a) / (a - n)) : (n = e.clone().add(i + 1, "months"), 
r = (t - a) / (n - a)), -(i + r);
}
function ft() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function ht() {
var e = this.clone().utc();
return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : R(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : R(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function dt(e) {
var n = R(this, e || t.defaultFormat);
return this.localeData().postformat(n);
}
function pt(e, t) {
return this.isValid() ? Ke({
to: this,
from: e
}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function mt(e) {
return this.from(Me(), e);
}
function vt(e, t) {
return this.isValid() ? Ke({
from: this,
to: e
}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
}
function gt(e) {
return this.to(Me(), e);
}
function $t(e) {
var t;
return void 0 === e ? this._locale._abbr : (t = k(e), null != t && (this._locale = t), 
this);
}
function yt() {
return this._locale;
}
function bt(e) {
switch (e = C(e)) {
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
return "week" === e && this.weekday(0), "isoWeek" === e && this.isoWeekday(1), "quarter" === e && this.month(3 * Math.floor(this.month() / 3)), 
this;
}
function wt(e) {
return e = C(e), void 0 === e || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms");
}
function Et() {
return +this._d - 6e4 * (this._offset || 0);
}
function St() {
return Math.floor(+this / 1e3);
}
function xt() {
return this._offset ? new Date(+this) : this._d;
}
function kt() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond() ];
}
function _t() {
var e = this;
return {
years: e.year(),
months: e.month(),
date: e.date(),
hours: e.hours(),
minutes: e.minutes(),
seconds: e.seconds(),
milliseconds: e.milliseconds()
};
}
function Ct() {
return f(this);
}
function Tt() {
return s({}, l(this));
}
function At() {
return l(this).overflow;
}
function Mt(e, t) {
P(0, [ e, e.length ], 0, t);
}
function Ot(e, t, n) {
return le(Me([ e, 11, 31 + t - n ]), t, n).week;
}
function Dt(e) {
var t = le(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
return null == e ? t : this.add(e - t, "y");
}
function It(e) {
var t = le(this, 1, 4).year;
return null == e ? t : this.add(e - t, "y");
}
function Pt() {
return Ot(this.year(), 1, 4);
}
function Lt() {
var e = this.localeData()._week;
return Ot(this.year(), e.dow, e.doy);
}
function Nt(e) {
return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
}
function Rt(e, t) {
return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e), "number" == typeof e ? e : null) : parseInt(e, 10);
}
function jt(e) {
return this._weekdays[e.day()];
}
function qt(e) {
return this._weekdaysShort[e.day()];
}
function Ft(e) {
return this._weekdaysMin[e.day()];
}
function Ut(e) {
var t, n, r;
for (this._weekdaysParse = this._weekdaysParse || [], t = 0; 7 > t; t++) if (this._weekdaysParse[t] || (n = Me([ 2e3, 1 ]).day(t), 
r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), 
this._weekdaysParse[t] = RegExp(r.replace(".", ""), "i")), this._weekdaysParse[t].test(e)) return t;
}
function Ht(e) {
var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
return null != e ? (e = Rt(e, this.localeData()), this.add(e - t, "d")) : t;
}
function Vt(e) {
var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == e ? t : this.add(e - t, "d");
}
function Bt(e) {
return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7);
}
function Yt(e, t) {
P(e, 0, 0, function() {
return this.localeData().meridiem(this.hours(), this.minutes(), t);
});
}
function zt(e, t) {
return t._meridiemParse;
}
function Wt(e) {
return "p" === (e + "").toLowerCase().charAt(0);
}
function Gt(e, t, n) {
return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
}
function Xt(e, t) {
t[dr] = g(1e3 * ("0." + e));
}
function Jt() {
return this._isUTC ? "UTC" : "";
}
function Kt() {
return this._isUTC ? "Coordinated Universal Time" : "";
}
function Zt(e) {
return Me(1e3 * e);
}
function Qt() {
return Me.apply(null, arguments).parseZone();
}
function en(e, t, n) {
var r = this._calendar[e];
return "function" == typeof r ? r.call(t, n) : r;
}
function tn(e) {
var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
return e.slice(1);
}), this._longDateFormat[e]);
}
function nn() {
return this._invalidDate;
}
function rn(e) {
return this._ordinal.replace("%d", e);
}
function an(e) {
return e;
}
function on(e, t, n, r) {
var i = this._relativeTime[n];
return "function" == typeof i ? i(e, t, n, r) : i.replace(/%d/i, e);
}
function sn(e, t) {
var n = this._relativeTime[e > 0 ? "future" : "past"];
return "function" == typeof n ? n(t) : n.replace(/%s/i, t);
}
function un(e) {
var t, n;
for (n in e) t = e[n], "function" == typeof t ? this[n] = t : this["_" + n] = t;
this._ordinalParseLenient = RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
}
function cn(e, t, n, r) {
var i = k(), a = u().set(r, t);
return i[n](a, e);
}
function ln(e, t, n, r, i) {
if ("number" == typeof e && (t = e, e = void 0), e = e || "", null != t) return cn(e, t, n, i);
var a, o = [];
for (a = 0; r > a; a++) o[a] = cn(e, a, n, i);
return o;
}
function fn(e, t) {
return ln(e, t, "months", 12, "month");
}
function hn(e, t) {
return ln(e, t, "monthsShort", 12, "month");
}
function dn(e, t) {
return ln(e, t, "weekdays", 7, "day");
}
function pn(e, t) {
return ln(e, t, "weekdaysShort", 7, "day");
}
function mn(e, t) {
return ln(e, t, "weekdaysMin", 7, "day");
}
function vn() {
var e = this._data;
return this._milliseconds = Jr(this._milliseconds), this._days = Jr(this._days), 
this._months = Jr(this._months), e.milliseconds = Jr(e.milliseconds), e.seconds = Jr(e.seconds), 
e.minutes = Jr(e.minutes), e.hours = Jr(e.hours), e.months = Jr(e.months), e.years = Jr(e.years), 
this;
}
function gn(e, t, n, r) {
var i = Ke(t, n);
return e._milliseconds += r * i._milliseconds, e._days += r * i._days, e._months += r * i._months, 
e._bubble();
}
function $n(e, t) {
return gn(this, e, t, 1);
}
function yn(e, t) {
return gn(this, e, t, -1);
}
function bn(e) {
return 0 > e ? Math.floor(e) : Math.ceil(e);
}
function wn() {
var e, t, n, r, i, a = this._milliseconds, o = this._days, s = this._months, u = this._data;
return a >= 0 && o >= 0 && s >= 0 || 0 >= a && 0 >= o && 0 >= s || (a += 864e5 * bn(Sn(s) + o), 
o = 0, s = 0), u.milliseconds = a % 1e3, e = v(a / 1e3), u.seconds = e % 60, t = v(e / 60), 
u.minutes = t % 60, n = v(t / 60), u.hours = n % 24, o += v(n / 24), i = v(En(o)), 
s += i, o -= bn(Sn(i)), r = v(s / 12), s %= 12, u.days = o, u.months = s, u.years = r, 
this;
}
function En(e) {
return 4800 * e / 146097;
}
function Sn(e) {
return 146097 * e / 4800;
}
function xn(e) {
var t, n, r = this._milliseconds;
if (e = C(e), "month" === e || "year" === e) return t = this._days + r / 864e5, 
n = this._months + En(t), "month" === e ? n : n / 12;
switch (t = this._days + Math.round(Sn(this._months)), e) {
case "week":
return t / 7 + r / 6048e5;

case "day":
return t + r / 864e5;

case "hour":
return 24 * t + r / 36e5;

case "minute":
return 1440 * t + r / 6e4;

case "second":
return 86400 * t + r / 1e3;

case "millisecond":
return Math.floor(864e5 * t) + r;

default:
throw Error("Unknown unit " + e);
}
}
function kn() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12);
}
function _n(e) {
return function() {
return this.as(e);
};
}
function Cn(e) {
return e = C(e), this[e + "s"]();
}
function Tn(e) {
return function() {
return this._data[e];
};
}
function An() {
return v(this.days() / 7);
}
function Mn(e, t, n, r, i) {
return i.relativeTime(t || 1, !!n, e, r);
}
function On(e, t, n) {
var r = Ke(e).abs(), i = hi(r.as("s")), a = hi(r.as("m")), o = hi(r.as("h")), s = hi(r.as("d")), u = hi(r.as("M")), c = hi(r.as("y")), l = i < di.s && [ "s", i ] || 1 === a && [ "m" ] || a < di.m && [ "mm", a ] || 1 === o && [ "h" ] || o < di.h && [ "hh", o ] || 1 === s && [ "d" ] || s < di.d && [ "dd", s ] || 1 === u && [ "M" ] || u < di.M && [ "MM", u ] || 1 === c && [ "y" ] || [ "yy", c ];
return l[2] = t, l[3] = +e > 0, l[4] = n, Mn.apply(null, l);
}
function Dn(e, t) {
return void 0 === di[e] ? !1 : void 0 === t ? di[e] : (di[e] = t, !0);
}
function In(e) {
var t = this.localeData(), n = On(this, !e, t);
return e && (n = t.pastFuture(+this, n)), t.postformat(n);
}
function Pn() {
var e, t, n, r = pi(this._milliseconds) / 1e3, i = pi(this._days), a = pi(this._months);
e = v(r / 60), t = v(e / 60), r %= 60, e %= 60, n = v(a / 12), a %= 12;
var o = n, s = a, u = i, c = t, l = e, f = r, h = this.asSeconds();
return h ? (0 > h ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (u ? u + "D" : "") + (c || l || f ? "T" : "") + (c ? c + "H" : "") + (l ? l + "M" : "") + (f ? f + "S" : "") : "P0D";
}
var Ln, Nn, Rn = t.momentProperties = [], jn = !1, qn = {}, Fn = {}, Un = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Hn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Vn = {}, Bn = {}, Yn = /\d/, zn = /\d\d/, Wn = /\d{3}/, Gn = /\d{4}/, Xn = /[+-]?\d{6}/, Jn = /\d\d?/, Kn = /\d{1,3}/, Zn = /\d{1,4}/, Qn = /[+-]?\d{1,6}/, er = /\d+/, tr = /[+-]?\d+/, nr = /Z|[+-]\d\d:?\d\d/gi, rr = /[+-]?\d+(\.\d{1,3})?/, ir = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ar = {}, or = {}, sr = 0, ur = 1, cr = 2, lr = 3, fr = 4, hr = 5, dr = 6;
P("M", [ "MM", 2 ], "Mo", function() {
return this.month() + 1;
}), P("MMM", 0, 0, function(e) {
return this.localeData().monthsShort(this, e);
}), P("MMMM", 0, 0, function(e) {
return this.localeData().months(this, e);
}), _("month", "M"), F("M", Jn), F("MM", Jn, zn), F("MMM", ir), F("MMMM", ir), V([ "M", "MM" ], function(e, t) {
t[ur] = g(e) - 1;
}), V([ "MMM", "MMMM" ], function(e, t, n, r) {
var i = n._locale.monthsParse(e, r, n._strict);
null != i ? t[ur] = i : l(n).invalidMonth = e;
});
var pr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), mr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), vr = {};
t.suppressDeprecationWarnings = !1;
var gr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, $r = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], yr = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], br = /^\/?Date\((\-?\d+)/i;
t.createFromInputFallback = te("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
}), P(0, [ "YY", 2 ], 0, function() {
return this.year() % 100;
}), P(0, [ "YYYY", 4 ], 0, "year"), P(0, [ "YYYYY", 5 ], 0, "year"), P(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
_("year", "y"), F("Y", tr), F("YY", Jn, zn), F("YYYY", Zn, Gn), F("YYYYY", Qn, Xn), 
F("YYYYYY", Qn, Xn), V([ "YYYYY", "YYYYYY" ], sr), V("YYYY", function(e, n) {
n[sr] = 2 === e.length ? t.parseTwoDigitYear(e) : g(e);
}), V("YY", function(e, n) {
n[sr] = t.parseTwoDigitYear(e);
}), t.parseTwoDigitYear = function(e) {
return g(e) + (g(e) > 68 ? 1900 : 2e3);
};
var wr = A("FullYear", !1);
P("w", [ "ww", 2 ], "wo", "week"), P("W", [ "WW", 2 ], "Wo", "isoWeek"), _("week", "w"), 
_("isoWeek", "W"), F("w", Jn), F("ww", Jn, zn), F("W", Jn), F("WW", Jn, zn), B([ "w", "ww", "W", "WW" ], function(e, t, n, r) {
t[r.substr(0, 1)] = g(e);
});
var Er = {
dow: 0,
doy: 6
};
P("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), _("dayOfYear", "DDD"), F("DDD", Kn), 
F("DDDD", Wn), V([ "DDD", "DDDD" ], function(e, t, n) {
n._dayOfYear = g(e);
}), t.ISO_8601 = function() {};
var Sr = te("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
var e = Me.apply(null, arguments);
return this > e ? this : e;
}), xr = te("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
var e = Me.apply(null, arguments);
return e > this ? this : e;
});
Ne("Z", ":"), Ne("ZZ", ""), F("Z", nr), F("ZZ", nr), V([ "Z", "ZZ" ], function(e, t, n) {
n._useUTC = !0, n._tzm = Re(e);
});
var kr = /([\+\-]|\d\d)/gi;
t.updateOffset = function() {};
var _r = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Cr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
Ke.fn = Pe.prototype;
var Tr = tt(1, "add"), Ar = tt(-1, "subtract");
t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
var Mr = te("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
return void 0 === e ? this.localeData() : this.locale(e);
});
P(0, [ "gg", 2 ], 0, function() {
return this.weekYear() % 100;
}), P(0, [ "GG", 2 ], 0, function() {
return this.isoWeekYear() % 100;
}), Mt("gggg", "weekYear"), Mt("ggggg", "weekYear"), Mt("GGGG", "isoWeekYear"), 
Mt("GGGGG", "isoWeekYear"), _("weekYear", "gg"), _("isoWeekYear", "GG"), F("G", tr), 
F("g", tr), F("GG", Jn, zn), F("gg", Jn, zn), F("GGGG", Zn, Gn), F("gggg", Zn, Gn), 
F("GGGGG", Qn, Xn), F("ggggg", Qn, Xn), B([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(e, t, n, r) {
t[r.substr(0, 2)] = g(e);
}), B([ "gg", "GG" ], function(e, n, r, i) {
n[i] = t.parseTwoDigitYear(e);
}), P("Q", 0, 0, "quarter"), _("quarter", "Q"), F("Q", Yn), V("Q", function(e, t) {
t[ur] = 3 * (g(e) - 1);
}), P("D", [ "DD", 2 ], "Do", "date"), _("date", "D"), F("D", Jn), F("DD", Jn, zn), 
F("Do", function(e, t) {
return e ? t._ordinalParse : t._ordinalParseLenient;
}), V([ "D", "DD" ], cr), V("Do", function(e, t) {
t[cr] = g(e.match(Jn)[0], 10);
});
var Or = A("Date", !0);
P("d", 0, "do", "day"), P("dd", 0, 0, function(e) {
return this.localeData().weekdaysMin(this, e);
}), P("ddd", 0, 0, function(e) {
return this.localeData().weekdaysShort(this, e);
}), P("dddd", 0, 0, function(e) {
return this.localeData().weekdays(this, e);
}), P("e", 0, 0, "weekday"), P("E", 0, 0, "isoWeekday"), _("day", "d"), _("weekday", "e"), 
_("isoWeekday", "E"), F("d", Jn), F("e", Jn), F("E", Jn), F("dd", ir), F("ddd", ir), 
F("dddd", ir), B([ "dd", "ddd", "dddd" ], function(e, t, n) {
var r = n._locale.weekdaysParse(e);
null != r ? t.d = r : l(n).invalidWeekday = e;
}), B([ "d", "e", "E" ], function(e, t, n, r) {
t[r] = g(e);
});
var Dr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Ir = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Pr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
P("H", [ "HH", 2 ], 0, "hour"), P("h", [ "hh", 2 ], 0, function() {
return this.hours() % 12 || 12;
}), Yt("a", !0), Yt("A", !1), _("hour", "h"), F("a", zt), F("A", zt), F("H", Jn), 
F("h", Jn), F("HH", Jn, zn), F("hh", Jn, zn), V([ "H", "HH" ], lr), V([ "a", "A" ], function(e, t, n) {
n._isPm = n._locale.isPM(e), n._meridiem = e;
}), V([ "h", "hh" ], function(e, t, n) {
t[lr] = g(e), l(n).bigHour = !0;
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
for (qr = "SSSS"; qr.length <= 9; qr += "S") F(qr, er);
for (qr = "S"; qr.length <= 9; qr += "S") V(qr, Xt);
var Fr = A("Milliseconds", !1);
P("z", 0, 0, "zoneAbbr"), P("zz", 0, 0, "zoneName");
var Ur = p.prototype;
Ur.add = Tr, Ur.calendar = rt, Ur.clone = it, Ur.diff = ct, Ur.endOf = wt, Ur.format = dt, 
Ur.from = pt, Ur.fromNow = mt, Ur.to = vt, Ur.toNow = gt, Ur.get = D, Ur.invalidAt = At, 
Ur.isAfter = at, Ur.isBefore = ot, Ur.isBetween = st, Ur.isSame = ut, Ur.isValid = Ct, 
Ur.lang = Mr, Ur.locale = $t, Ur.localeData = yt, Ur.max = xr, Ur.min = Sr, Ur.parsingFlags = Tt, 
Ur.set = D, Ur.startOf = bt, Ur.subtract = Ar, Ur.toArray = kt, Ur.toObject = _t, 
Ur.toDate = xt, Ur.toISOString = ht, Ur.toJSON = ht, Ur.toString = ft, Ur.unix = St, 
Ur.valueOf = Et, Ur.year = wr, Ur.isLeapYear = ce, Ur.weekYear = Dt, Ur.isoWeekYear = It, 
Ur.quarter = Ur.quarters = Nt, Ur.month = K, Ur.daysInMonth = Z, Ur.week = Ur.weeks = pe, 
Ur.isoWeek = Ur.isoWeeks = me, Ur.weeksInYear = Lt, Ur.isoWeeksInYear = Pt, Ur.date = Or, 
Ur.day = Ur.days = Ht, Ur.weekday = Vt, Ur.isoWeekday = Bt, Ur.dayOfYear = ge, Ur.hour = Ur.hours = Nr, 
Ur.minute = Ur.minutes = Rr, Ur.second = Ur.seconds = jr, Ur.millisecond = Ur.milliseconds = Fr, 
Ur.utcOffset = Fe, Ur.utc = He, Ur.local = Ve, Ur.parseZone = Be, Ur.hasAlignedHourOffset = Ye, 
Ur.isDST = ze, Ur.isDSTShifted = We, Ur.isLocal = Ge, Ur.isUtcOffset = Xe, Ur.isUtc = Je, 
Ur.isUTC = Je, Ur.zoneAbbr = Jt, Ur.zoneName = Kt, Ur.dates = te("dates accessor is deprecated. Use date instead.", Or), 
Ur.months = te("months accessor is deprecated. Use month instead", K), Ur.years = te("years accessor is deprecated. Use year instead", wr), 
Ur.zone = te("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ue);
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
}, Xr = y.prototype;
Xr._calendar = Vr, Xr.calendar = en, Xr._longDateFormat = Br, Xr.longDateFormat = tn, 
Xr._invalidDate = Yr, Xr.invalidDate = nn, Xr._ordinal = zr, Xr.ordinal = rn, Xr._ordinalParse = Wr, 
Xr.preparse = an, Xr.postformat = an, Xr._relativeTime = Gr, Xr.relativeTime = on, 
Xr.pastFuture = sn, Xr.set = un, Xr.months = W, Xr._months = pr, Xr.monthsShort = G, 
Xr._monthsShort = mr, Xr.monthsParse = X, Xr.week = fe, Xr._week = Er, Xr.firstDayOfYear = de, 
Xr.firstDayOfWeek = he, Xr.weekdays = jt, Xr._weekdays = Dr, Xr.weekdaysMin = Ft, 
Xr._weekdaysMin = Pr, Xr.weekdaysShort = qt, Xr._weekdaysShort = Ir, Xr.weekdaysParse = Ut, 
Xr.isPM = Wt, Xr._meridiemParse = Lr, Xr.meridiem = Gt, S("en", {
ordinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal: function(e) {
var t = e % 10, n = 1 === g(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
return e + n;
}
}), t.lang = te("moment.lang is deprecated. Use moment.locale instead.", S), t.langData = te("moment.langData is deprecated. Use moment.localeData instead.", k);
var Jr = Math.abs, Kr = _n("ms"), Zr = _n("s"), Qr = _n("m"), ei = _n("h"), ti = _n("d"), ni = _n("w"), ri = _n("M"), ii = _n("y"), ai = Tn("milliseconds"), oi = Tn("seconds"), si = Tn("minutes"), ui = Tn("hours"), ci = Tn("days"), li = Tn("months"), fi = Tn("years"), hi = Math.round, di = {
s: 45,
m: 45,
h: 22,
d: 26,
M: 11
}, pi = Math.abs, mi = Pe.prototype;
mi.abs = vn, mi.add = $n, mi.subtract = yn, mi.as = xn, mi.asMilliseconds = Kr, 
mi.asSeconds = Zr, mi.asMinutes = Qr, mi.asHours = ei, mi.asDays = ti, mi.asWeeks = ni, 
mi.asMonths = ri, mi.asYears = ii, mi.valueOf = kn, mi._bubble = wn, mi.get = Cn, 
mi.milliseconds = ai, mi.seconds = oi, mi.minutes = si, mi.hours = ui, mi.days = ci, 
mi.weeks = An, mi.months = li, mi.years = fi, mi.humanize = In, mi.toISOString = Pn, 
mi.toString = Pn, mi.toJSON = Pn, mi.locale = $t, mi.localeData = yt, mi.toIsoString = te("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Pn), 
mi.lang = Mr, P("X", 0, 0, "unix"), P("x", 0, 0, "valueOf"), F("x", tr), F("X", rr), 
V("X", function(e, t, n) {
n._d = new Date(1e3 * parseFloat(e, 10));
}), V("x", function(e, t, n) {
n._d = new Date(g(e));
}), t.version = "2.10.6", n(Me), t.fn = Hr, t.min = De, t.max = Ie, t.utc = u, t.unix = Zt, 
t.months = fn, t.isDate = i, t.locale = S, t.invalid = h, t.duration = Ke, t.isMoment = m, 
t.weekdays = dn, t.parseZone = Qt, t.localeData = k, t.isDuration = Le, t.monthsShort = hn, 
t.weekdaysMin = mn, t.defineLocale = x, t.weekdaysShort = pn, t.normalizeUnits = C, 
t.relativeTimeThreshold = Dn;
var vi = t;
return vi;
});
}).call(t, n(123)(e));
}, , , , , , , , , , , , , , , , , , , , , , function(e, t, n) {
"use strict";
function r(e) {
return null != e && "" !== e;
}
function i(e) {
return (Array.isArray(e) ? e.map(i) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
return e[t];
}) : [ e ]).filter(r).join(" ");
}
function a(e) {
return s[e] || e;
}
function o(e) {
var t = (e + "").replace(u, a);
return t === "" + e ? e : t;
}
t.merge = function c(e, t) {
if (1 === arguments.length) {
for (var n = e[0], i = 1; i < e.length; i++) n = c(n, e[i]);
return n;
}
var a = e.class, o = t.class;
(a || o) && (a = a || [], o = o || [], Array.isArray(a) || (a = [ a ]), Array.isArray(o) || (o = [ o ]), 
e.class = a.concat(o).filter(r));
for (var s in t) "class" != s && (e[s] = t[s]);
return e;
}, t.joinClasses = i, t.cls = function(e, n) {
for (var r = [], a = 0; a < e.length; a++) n && n[a] ? r.push(t.escape(i([ e[a] ]))) : r.push(i(e[a]));
var o = i(r);
return o.length ? ' class="' + o + '"' : "";
}, t.style = function(e) {
return e && "object" == typeof e ? Object.keys(e).map(function(t) {
return t + ":" + e[t];
}).join(";") : e;
}, t.attr = function(e, n, r, i) {
return "style" === e && (n = t.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + e + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + e + '="' + t.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + e + '="' + n + '"');
}, t.attrs = function(e, n) {
var r = [], a = Object.keys(e);
if (a.length) for (var o = 0; o < a.length; ++o) {
var s = a[o], u = e[s];
"class" == s ? (u = i(u)) && r.push(" " + s + '="' + u + '"') : r.push(t.attr(s, u, !1, n));
}
return r.join("");
};
var s = {
"&": "&amp;",
"<": "&lt;",
">": "&gt;",
'"': "&quot;"
}, u = /[&<>"]/g;
t.escape = o, t.rethrow = function l(e, t, r, i) {
if (!(e instanceof Error)) throw e;
if (!("undefined" == typeof window && t || i)) throw e.message += " on line " + r, 
e;
try {
i = i || n(116).readFileSync(t, "utf8");
} catch (a) {
l(e, null, r);
}
var o = 3, s = i.split("\n"), u = Math.max(r - o, 0), c = Math.min(s.length, r + o), o = s.slice(u, c).map(function(e, t) {
var n = t + u + 1;
return (n == r ? "  > " : "    ") + n + "| " + e;
}).join("\n");
throw e.path = t, e.message = (t || "Jade") + ":" + r + "\n" + o + "\n\n" + e.message, 
e;
}, t.DebugItem = function(e, t) {
this.lineno = e, this.filename = t;
};
}, , , function(e, t, n) {
"use strict";
var r = n(10), i = n(119), a = n(49), o = t.PhotoCut = n(120);
n(124), e.exports = function(e, t) {
function n() {
var e = f.getCanvasSelection();
if (e) {
var n = document.createElement("canvas");
n.width = e.size, n.height = e.size, n.getContext("2d").drawImage(e.source, e.x, e.y, e.size, e.size, 0, 0, e.size, e.size), 
s.remove(), n.toBlob(function(e) {
t(e);
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
f.setImage(e), u.addEventListener("selection", function() {
for (var e = f.getCanvasSelection(), t = 0; t < c.length; t++) {
var n = c[t];
n.getContext("2d").clearRect(0, 0, n.width, n.height), e && n.getContext("2d").drawImage(e.source, e.x, e.y, e.size, e.size, 0, 0, n.width, n.height);
}
}), f.setSelection({
x: .1 * u.width,
size: .8 * Math.min(f.width, f.height),
y: .1 * u.height
}), s.elem.querySelector('[data-action="rotate-right"]').addEventListener("click", function() {
return f.rotate(1);
}), s.elem.querySelector("[data-form]").addEventListener("submit", function(e) {
e.preventDefault(), n();
}), u.addEventListener("submit", function() {
n();
});
};
}, , , , , function() {}, , , function(e, t, n) {
var r = n(108);
e.exports = function(e) {
var t, n = [], i = {}, a = e || {};
return function(e) {
n.push("");
var a = [];
i.b = t = function(t, r, i) {
this && this.block, this && this.attributes || {};
e.call(this, n, a, t, r, i);
}, i.e = t = function(e) {
var t = this && this.block, n = this && this.attributes || {};
i.b.call({
block: function() {
t && t();
},
attributes: r.merge([ n ])
}, e, !0);
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
}, function(e, t, n) {
"use strict";
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), a = n(125), o = function() {
function e(t) {
var n = this, i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = i.maxImageSize;
r(this, e), this.maxImageSize = a || 200, this.canvas = t, this.canvas.onmousedown = function(e) {
return n.onMouseDown(e);
}, this.canvas.onmouseup = function(e) {
return n.onMouseUp(e);
}, this.canvas.onkeydown = function(e) {
return n.onKeyDown(e);
}, document.addEventListener("mousemove", function(e) {
return n.onMouseMove(e);
}), this.ctx = t.getContext("2d"), this.state = !1, this.mouseDownShift = null, 
this.selectionStartCoords = null, this.rotation = 0, this.selection = null, this.cornerSize = 5;
}
return i(e, [ {
key: "setImage",
value: function(e) {
this.img = e, this.scale = Math.min(this.maxImageSize / e.width, this.maxImageSize / e.height), 
this.fullImageCanvas = document.createElement("canvas"), this.fullImageCtx = this.fullImageCanvas.getContext("2d"), 
this.renderFullImageRotated(), this.render();
}
}, {
key: "getEventCoordsRelativeCanvasImage",
value: function(e) {
return {
x: e.clientX - this.canvas.getBoundingClientRect().left - this.cornerSize,
y: e.clientY - this.canvas.getBoundingClientRect().top - this.cornerSize
};
}
}, {
key: "onKeyDown",
value: function(e) {
this.selection && (13 == e.keyCode && this.canvas.dispatchEvent(new CustomEvent("submit")), 
40 == e.keyCode && (this.selection.bottom < this.height && this.setSelection({
y: this.selection.y + 1
}), e.preventDefault()), 38 == e.keyCode && (this.selection.y > 0 && this.setSelection({
y: this.selection.y - 1
}), e.preventDefault()), 37 == e.keyCode && (this.selection.x > 0 && this.setSelection({
x: this.selection.x - 1
}), e.preventDefault()), 39 == e.keyCode && (this.selection.right < this.width && this.setSelection({
x: this.selection.x + 1
}), e.preventDefault()));
}
}, {
key: "onMouseDown",
value: function(e) {
e.preventDefault();
var t = this.getEventCoordsRelativeCanvasImage(e), n = this.findCoordsInSelection(t);
switch (n) {
case "inside":
this.state = "moving", this.mouseDownShift = {
x: t.x - this.selection.x,
y: t.y - this.selection.y
};
break;

case "outside":
this.setSelection(null), this.state = "selecting", this.selectionStartCoords = t;
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
value: function(e) {
return this.selection ? Math.abs(e.x - this.selection.x) < this.cornerSize && Math.abs(e.y - this.selection.y) < this.cornerSize ? "nw" : Math.abs(e.x - this.selection.x) < this.cornerSize && Math.abs(e.y - this.selection.bottom) < this.cornerSize ? "sw" : Math.abs(e.x - this.selection.right) < this.cornerSize && Math.abs(e.y - this.selection.bottom) < this.cornerSize ? "se" : Math.abs(e.x - this.selection.right) < this.cornerSize && Math.abs(e.y - this.selection.y) < this.cornerSize ? "ne" : e.x >= this.selection.x && e.x <= this.selection.right && e.y >= this.selection.y && e.y <= this.selection.bottom ? "inside" : "outside" : "outside";
}
}, {
key: "onMouseMove",
value: function(e) {
var t = this.getEventCoordsRelativeCanvasImage(e);
switch (t.x < 0 && (t.x = 0), t.x > this.width && (t.x = this.width), t.y < 0 && (t.y = 0), 
t.y > this.height && (t.y = this.height), this.state) {
case !1:
this.showCursorAtCoords(t);
break;

case "moving":
this.moveSelection(t);
break;

case "selecting":
this.createSelection(t);
break;

case "modifying":
this.modifySelection(t);
break;

default:
throw Error("Must never reach here");
}
}
}, {
key: "showCursorAtCoords",
value: function(e) {
var t = this.findCoordsInSelection(e);
"outside" == t ? this.canvas.style.cursor = "crosshair" : "inside" == t ? this.canvas.style.cursor = "move" : this.canvas.style.cursor = t + "-resize";
}
}, {
key: "modifySelection",
value: function(e) {
var t = this.selection.center, n = e.x < t.x && e.y < t.y ? "nw" : e.x < t.x && e.y >= t.y ? "sw" : e.x > t.x && e.y < t.y ? "ne" : "se";
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
this.createSelection(e);
}
}, {
key: "moveSelection",
value: function(e) {
var t = Math.min(e.x - this.mouseDownShift.x, this.width - this.selection.size), n = Math.min(e.y - this.mouseDownShift.y, this.height - this.selection.size);
0 > t && (t = 0), 0 > n && (n = 0), this.setSelection({
x: t,
y: n,
size: this.selection.size
}), this.canvas.style.cursor = "move";
}
}, {
key: "setSelection",
value: function(e) {
e ? (e = Object.create(e), this.selection && (e.x = e.x || this.selection.x, e.y = e.y || this.selection.y, 
e.size = e.size || this.selection.size), this.selection = new a(e)) : this.selection = null, 
this.render(), this.canvas.dispatchEvent(new CustomEvent("selection", {
bubbles: !0
}));
}
}, {
key: "createSelection",
value: function(e) {
var t = Math.max(Math.abs(this.selectionStartCoords.x - e.x), Math.abs(this.selectionStartCoords.y - e.y)), n = {};
e.x >= this.selectionStartCoords.x ? e.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "se-resize", 
n.size = Math.min(t, this.height - this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "ne-resize", 
n.size = Math.min(t, this.selectionStartCoords.y, this.width - this.selectionStartCoords.x), 
n.x = this.selectionStartCoords.x, n.y = this.selectionStartCoords.y - n.size) : e.y >= this.selectionStartCoords.y ? (this.canvas.style.cursor = "sw-resize", 
n.size = Math.min(t, this.selectionStartCoords.x, this.height - this.selectionStartCoords.y), 
n.x = this.selectionStartCoords.x - n.size, n.y = this.selectionStartCoords.y) : (this.canvas.style.cursor = "nw-resize", 
n.size = Math.min(t, this.selectionStartCoords.x, this.selectionStartCoords.y), 
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
var e = Math.floor(this.selection.x), t = Math.floor(this.selection.y), n = Math.ceil(this.selection.size);
this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)", this.ctx.fillRect(0, 0, this.width, t), 
this.ctx.fillRect(0, t, e, this.height - t), this.ctx.fillRect(e + n, t, this.width - (e + n), n), 
this.ctx.fillRect(e, t + n, this.width - e, this.height - (t + n)), this.renderCorner("nw"), 
this.renderCorner("ne"), this.renderCorner("sw"), this.renderCorner("se");
}
this.ctx.translate(-this.cornerSize, -this.cornerSize);
}
}, {
key: "renderCorner",
value: function(e) {
var t;
switch (e) {
case "nw":
t = {
x: this.selection.x - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "ne":
t = {
x: this.selection.right - this.cornerSize,
y: this.selection.y - this.cornerSize
};
break;

case "sw":
t = {
x: this.selection.x - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
break;

case "se":
t = {
x: this.selection.right - this.cornerSize,
y: this.selection.bottom - this.cornerSize
};
}
t.width = 2 * this.cornerSize, t.height = 2 * this.cornerSize, this.state ? ("modifying" == this.state || "selecting" == this.state) && this.selectionStartCoords.x >= t.x && this.selectionStartCoords.y >= t.y && this.selectionStartCoords.x <= t.x + t.width && this.selectionStartCoords.y <= t.y + t.height ? this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)" : this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)", 
this.ctx.fillRect(t.x, t.y, t.width, t.height);
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
} ]), e;
}();
e.exports = o;
}, , , function(e) {
"use strict";
e.exports = function(e) {
return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], 
e.webpackPolyfill = 1), e;
};
}, function(e, t, n) {
var r;
!function(i) {
"use strict";
var a = i.HTMLCanvasElement && i.HTMLCanvasElement.prototype, o = i.Blob && function() {
try {
return !!new Blob();
} catch (e) {
return !1;
}
}(), s = o && i.Uint8Array && function() {
try {
return 100 === new Blob([ new Uint8Array(100) ]).size;
} catch (e) {
return !1;
}
}(), u = i.BlobBuilder || i.WebKitBlobBuilder || i.MozBlobBuilder || i.MSBlobBuilder, c = (o || u) && i.atob && i.ArrayBuffer && i.Uint8Array && function(e) {
var t, n, r, i, a, c;
for (t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), 
n = new ArrayBuffer(t.length), r = new Uint8Array(n), i = 0; i < t.length; i += 1) r[i] = t.charCodeAt(i);
return a = e.split(",")[0].split(":")[1].split(";")[0], o ? new Blob([ s ? r : n ], {
type: a
}) : (c = new u(), c.append(n), c.getBlob(a));
};
i.HTMLCanvasElement && !a.toBlob && (a.mozGetAsFile ? a.toBlob = function(e, t, n) {
e(n && a.toDataURL && c ? c(this.toDataURL(t, n)) : this.mozGetAsFile("blob", t));
} : a.toDataURL && c && (a.toBlob = function(e, t, n) {
e(c(this.toDataURL(t, n)));
})), r = function() {
return c;
}.call(t, n, t, e), !(void 0 !== r && (e.exports = r));
}(window);
}, function(e) {
"use strict";
function t(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var n = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), r = function() {
function e(n) {
var r = n.x, i = n.y, a = n.size;
t(this, e), this.x = r, this.y = i, this.size = a;
}
return n(e, [ {
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
} ]), e;
}();
e.exports = r;
}, , , , , , , , , , function(e) {
"use strict";
e.exports = function(e) {
return (e + "").replace(/&([^#]|#[^0-9]?|#x[^0-9]?|$)/g, "&amp;$1").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
}, function(e, t, n) {
"use strict";
function r(e, t) {
return i(e) ? "" : (e = e.replace(/"/g, "&quot;"), '<a href="' + e + '">' + t + "</a>");
}
function i(e) {
e = e.replace(/[\x00-\x20]+/g, ""), e = e.replace(/<\!\-\-.*?\-\-\>/g, "");
var t = e.match(/^([a-zA-Z]+)\:/);
if (!t) return !1;
var n = t[1].toLowerCase();
return "http" != n && "https" != n && "mailto" != n ? !0 : !1;
}
var a = n(135);
e.exports = function(e) {
return e ? (e = a(e), e = e.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(e, t, n) {
return r(n, t);
}), e = e.replace(/https?:\/\/(?:[\w\d-]+\.?)+(?:\/[\w\d-]*)?/g, function(t, n) {
return '"' == e[n - 1] ? t : r(t, t);
}), e = e.replace(/\n\s*\n/g, "</p><p>"), "<p>" + e + "</p>") : "";
};
} ]);
//# sourceMappingURL=profile.c107b0e8b2cba2529505.js.map
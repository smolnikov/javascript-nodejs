var footer = webpackJsonp_name_([ 2 ], {
    0: function(e, t, n) {
        "use strict";
        var r = n(19), o = n(20), a = n(21);
        n(41).init(), t.init = function() {
            r(), window.devicePixelRatio > 1 && o(), window.addEventListener("scroll", a), a();
        }, t.trackSticky = a;
    },
    19: function(e, t, n) {
        "use strict";
        var r = n(49);
        e.exports = function() {
            function e(e) {
                var t = e.clientX + a;
                t + o.offsetWidth > document.documentElement.clientWidth && (t = Math.max(0, e.clientX - a - o.offsetWidth)), 
                o.style.left = t + "px";
                var n = e.clientY + i;
                n + o.offsetHeight > document.documentElement.clientHeight && (n = Math.max(0, e.clientY - i - o.offsetHeight)), 
                o.style.top = n + "px";
            }
            function t(t) {
                var n = t.target.closest("a, [data-tooltip]");
                n && ("A" == n.tagName && n.closest(".toolbar") || (o = document.createElement("span"), 
                o.className = "link__type", n.getAttribute("data-tooltip") ? o.setAttribute("data-tooltip", n.getAttribute("data-tooltip")) : o.setAttribute("data-url", n.getAttribute("href")), 
                document.body.appendChild(o), e(t), document.addEventListener("mousemove", e)));
            }
            function n() {
                o && (document.removeEventListener("mousemove", e), o.remove(), o = null);
            }
            var o = null, a = 8, i = 10;
            r("a,[data-tooltip]", t, n);
        };
    },
    20: function(e) {
        "use strict";
        e.exports = function() {
            for (var e = document.querySelectorAll('figure img[src$=".png"]'), t = 0; t < e.length; t++) !function() {
                var n = e[t];
                n.onload = function() {
                    if (delete this.onload, !this.src.match(/@2x.png$/)) {
                        var e = new Image();
                        e.onload = function() {
                            this.width && this.height && (n.src = this.src);
                        }, e.src = this.src.replace(".png", "@2x.png");
                    }
                }, n.complete && n.onload();
            }();
        };
    },
    21: function(e) {
        "use strict";
        function t() {
            for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
                var r = e[t], o = r.dataset.sticky ? document.querySelector(r.dataset.sticky) : document.body;
                if (r.getBoundingClientRect().top < 0) {
                    if (r.style.cssText) return;
                    var a = r.getBoundingClientRect().left, i = n(r);
                    r.parentNode.insertBefore(i, r), o.appendChild(r), r.classList.add("sticky"), r.style.position = "fixed", 
                    r.style.top = 0, r.style.left = a + "px", r.style.zIndex = 101, r.style.background = "white", 
                    r.style.margin = 0, r.style.width = i.offsetWidth + "px", r.placeholder = i;
                } else r.placeholder && r.placeholder.getBoundingClientRect().top > 0 && (r.style.cssText = "", 
                r.classList.remove("sticky"), r.placeholder.parentNode.insertBefore(r, r.placeholder), 
                r.placeholder.remove(), r.placeholder = null);
            }
        }
        function n(e) {
            var t = document.createElement("div"), n = getComputedStyle(e);
            return t.style.width = e.offsetWidth + "px", t.style.marginLeft = n.marginLeft, 
            t.style.marginRight = n.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = n.marginBottom, 
            t.style.marginTop = n.marginTop, t;
        }
        e.exports = t;
    },
    28: function(e, t, n) {
        "use strict";
        function r(e) {
            function t(e) {
                window.metrika.reachGoal("XHR-" + e.toUpperCase(), {
                    time: Date.now() - i.timeStart,
                    method: i.method,
                    url: i.url,
                    status: i.status + ""
                });
            }
            function n(e, t) {
                var n = new CustomEvent(e);
                return n.originalEvent = t, n;
            }
            function r(e, t) {
                var r = n("fail", t);
                r.reason = e, i.dispatchEvent(r);
            }
            function o(e, t) {
                var r = n("success", t);
                r.result = e, i.dispatchEvent(r);
            }
            var i = new XMLHttpRequest(), s = e.method || "GET", c = e.body, u = e.url;
            i.open(s, u, e.sync ? !1 : !0), i.method = s;
            var d = a();
            d && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", d), "[object Object]" == {}.toString.call(c) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
            c = JSON.stringify(c)), i.addEventListener("loadstart", function(e) {
                i.timeStart = Date.now(), t(e.type);
                var r = n("xhrstart", e);
                document.dispatchEvent(r);
            }), i.addEventListener("loadend", function(e) {
                t(e.type);
                var r = n("xhrend", e);
                document.dispatchEvent(r);
            }), i.addEventListener("success", function(e) {
                t(e.type);
                var r = n("xhrsuccess", e);
                r.result = e.result, document.dispatchEvent(r);
            }), i.addEventListener("fail", function(e) {
                t(e.type);
                var r = n("xhrfail", e);
                r.reason = e.reason, document.dispatchEvent(r);
            }), e.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var l = e.normalStatuses || [ 200 ];
            return i.addEventListener("error", function(e) {
                r("Ошибка связи с сервером.", e);
            }), i.addEventListener("timeout", function(e) {
                r("Превышено максимально допустимое время ожидания ответа от сервера.", e);
            }), i.addEventListener("abort", function(e) {
                r("Запрос был прерван.", e);
            }), i.addEventListener("load", function(t) {
                if (!i.status) return void r("Не получен ответ от сервера.", t);
                if (-1 == l.indexOf(i.status)) return void r("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", t);
                var n = i.responseText, a = i.getResponseHeader("Content-Type");
                if (a.match(/^application\/json/) || e.json) try {
                    n = JSON.parse(n);
                } catch (t) {
                    return void r("Некорректный формат ответа от сервера", t);
                }
                o(n, t);
            }), setTimeout(function() {
                i.send(c);
            }, 0), i;
        }
        var o = n(23), a = n(38);
        document.addEventListener("xhrfail", function(e) {
            new o.Error(e.reason);
        }), e.exports = r;
    },
    38: function(e) {
        "use strict";
        e.exports = function() {
            var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
            return e ? e[1] : null;
        };
    },
    41: function(e, t, n) {
        "use strict";
        function r() {
            document.onsubmit = function(e) {
                e.target.hasAttribute("data-newsletter-subscribe-form") && (e.preventDefault(), 
                o(e.target));
            };
        }
        function o(e) {
            if (e.elements.email.value) {
                var t = i({
                    method: "POST",
                    url: e.action,
                    body: {
                        email: e.elements.email.value,
                        slug: e.elements.slug.value
                    }
                }), n = e.querySelector('[type="submit"]'), r = new a({
                    elem: n,
                    size: "small",
                    elemClass: "button_loading"
                });
                r.start(), n.disabled = !0, t.addEventListener("loadend", function() {
                    r.stop(), n.disabled = !1;
                }), t.addEventListener("success", function(e) {
                    200 == this.status ? new s.Success(e.result.message) : new s.Error(e.result.message);
                });
            }
        }
        var a = n(37), i = n(28), s = n(23);
        t.init = r;
    },
    49: function(e) {
        "use strict";
        function t(e, t, n) {
            d[e] = {
                over: t,
                out: n
            };
        }
        function n(e) {
            if (!a) {
                var t = Math.sqrt(Math.pow(e.pageX - i, 2) + Math.pow(e.pageY - s, 2)), n = t / (Date.now() - c);
                if (u > n) {
                    var r = document.elementFromPoint(e.clientX, e.clientY);
                    if (!r) return;
                    if (r != o) {
                        for (var l in d) {
                            var m = r.closest(l);
                            m && (a = {
                                elem: m,
                                out: d[l].out
                            }, d[l].over(e));
                        }
                        o = r;
                    }
                }
                i = e.pageX, s = e.pageY, c = Date.now();
            }
        }
        function r(e) {
            if (a) {
                for (var t = e.relatedTarget; t; ) {
                    if (t == a.elem) return;
                    t = t.parentElement;
                }
                var n = a.out;
                a = null, n(e);
            }
        }
        var o, a, i = 1 / 0, s = 1 / 0, c = Date.now(), u = .2, d = {};
        document.addEventListener("mousemove", n), document.addEventListener("mouseout", r), 
        e.exports = t;
    }
});
//# sourceMappingURL=footer.a20337eb47c2fcdeeb80.js.map
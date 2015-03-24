var tutorial =
webpackJsonp_name_([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var delegate = __webpack_require__(36);
	var prism = __webpack_require__(32);
	var xhr = __webpack_require__(30);
	var TutorialMapModal = __webpack_require__(33);
	
	exports.init = function () {
	
	  initTaskButtons();
	  initFolderList();
	
	  initSidebarHighlight();
	
	  delegate(document, "[data-action=\"tutorial-map\"]", "click", function (event) {
	    new TutorialMapModal();
	    event.preventDefault();
	  });
	
	  prism.init();
	
	  if (window.isEbook) {
	    __webpack_require__.e/* nsure */(2, function () {
	      __webpack_require__(35).init();
	    });
	  }
	};
	
	exports.TutorialMap = __webpack_require__(34);
	
	function initSidebarHighlight() {
	
	  function highlight() {
	
	    var current = document.getElementsByClassName("sidebar__navigation-link_active");
	    if (current[0]) current[0].classList.remove("sidebar__navigation-link_active");
	
	    var h2s = document.getElementsByTagName("h2");
	    for (var i = 0; i < h2s.length; i++) {
	      var h2 = h2s[i];
	      // first in-page header
	      if (h2.getBoundingClientRect().top > 0) break;
	    }
	    i--; // we need the one before it (currently reading)
	
	    if (i >= 0) {
	      var href = h2s[i].firstElementChild && h2s[i].firstElementChild.getAttribute("href");
	      var li = document.querySelector(".sidebar__navigation-link a[href=\"" + href + "\"]");
	      if (href && li) {
	        li.classList.add("sidebar__navigation-link_active");
	      }
	    }
	  }
	
	  document.addEventListener("DOMContentLoaded", function () {
	    highlight();
	
	    window.addEventListener("scroll", highlight);
	  });
	}
	
	function initTaskButtons() {
	  // solution button
	  delegate(document, ".task__solution", "click", function (event) {
	    event.target.closest(".task").classList.toggle("task__answer_open");
	  });
	
	  // close solution button
	  delegate(document, ".task__answer-close", "click", function (event) {
	    event.target.closest(".task").classList.toggle("task__answer_open");
	  });
	
	  // every step button (if any steps)
	  delegate(document, ".task__step-show", "click", function (event) {
	    event.target.closest(".task__step").classList.toggle("task__step_open");
	  });
	}
	
	function initFolderList() {
	  delegate(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function (event) {
	    var link = event.delegateTarget;
	    var openFolder = link.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
	    // close the previous open folder (thus making an accordion)
	    if (openFolder && openFolder != link.parentNode) {
	      openFolder.classList.remove("lessons-list__lesson_open");
	    }
	    link.parentNode.classList.toggle("lessons-list__lesson_open");
	    event.preventDefault();
	  });
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = trackSticky;
	
	function trackSticky() {
	
	  var stickyElems = document.querySelectorAll("[data-sticky]");
	
	  for (var i = 0; i < stickyElems.length; i++) {
	    var stickyElem = stickyElems[i];
	    var container = stickyElem.dataset.sticky ? document.querySelector(stickyElem.dataset.sticky) : document.body;
	
	    if (stickyElem.getBoundingClientRect().top < 0) {
	      // become fixed
	      if (stickyElem.style.cssText) {
	        // already fixed
	        // inertia: happens when scrolled fast too much to bottom
	        // http://ilyakantor.ru/screen/2015-02-24_1555.swf
	        return;
	      }
	
	      var savedLeft = stickyElem.getBoundingClientRect().left;
	      var placeholder = createPlaceholder(stickyElem);
	
	      stickyElem.parentNode.insertBefore(placeholder, stickyElem);
	
	      container.appendChild(stickyElem);
	      stickyElem.classList.add("sticky");
	      stickyElem.style.position = "fixed";
	      stickyElem.style.top = 0;
	      stickyElem.style.left = savedLeft + "px";
	      // zIndex < 1000, because it must be under an overlay,
	      // e.g. sitemap must show over the progress bar
	      stickyElem.style.zIndex = 101;
	      stickyElem.style.background = "white"; // non-transparent to cover the text
	      stickyElem.style.margin = 0;
	      stickyElem.style.width = placeholder.offsetWidth + "px"; // keep same width as before
	      stickyElem.placeholder = placeholder;
	    } else if (stickyElem.placeholder && stickyElem.placeholder.getBoundingClientRect().top > 0) {
	      // become non-fixed
	      stickyElem.style.cssText = "";
	      stickyElem.classList.remove("sticky");
	      stickyElem.placeholder.parentNode.insertBefore(stickyElem, stickyElem.placeholder);
	      stickyElem.placeholder.remove();
	
	      stickyElem.placeholder = null;
	    }
	  }
	}
	
	/**
	 * Creates a placeholder w/ same size & margin
	 * @param elem
	 * @returns {*|!HTMLElement}
	 */
	function createPlaceholder(elem) {
	  var placeholder = document.createElement("div");
	  var style = getComputedStyle(elem);
	  placeholder.style.width = elem.offsetWidth + "px";
	  placeholder.style.marginLeft = style.marginLeft;
	  placeholder.style.marginRight = style.marginRight;
	  placeholder.style.height = elem.offsetHeight + "px";
	  placeholder.style.marginBottom = style.marginBottom;
	  placeholder.style.marginTop = style.marginTop;
	  return placeholder;
	}

/***/ },
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(22);
	var getCsrfCookie = __webpack_require__(31);
	// Wrapper about XHR
	// # Global Events
	// triggers document.loadstart/loadend on communication start/end
	//    --> unless options.noGlobalEvents is set
	//
	// # Events
	// triggers fail/success on load end:
	//    --> by default status=200 is ok, the others are failures
	//    --> options.normalStatuses = [201,409] allow given statuses
	//    --> fail event has .reason field
	//    --> success event has .result field
	//
	// # JSON
	//    --> send(object) calls JSON.stringify
	//    --> adds Accept: json (we want json) by default, unless options.raw
	// if options.json or server returned json content type
	//    --> autoparse json
	//    --> fail if error
	//
	// # CSRF
	//    --> requests sends header X-XSRF-TOKEN from cookie
	
	function xhr(options) {
	
	  var request = new XMLHttpRequest();
	
	  var method = options.method || "GET";
	
	  var body = options.body;
	  var url = options.url;
	
	  request.open(method, url, options.sync ? false : true);
	
	  request.method = method;
	
	  // token/header names same as angular $http for easier interop
	  var csrfCookie = getCsrfCookie();
	  if (csrfCookie && !options.skipCsrf) {
	    request.setRequestHeader("X-XSRF-TOKEN", csrfCookie);
	  }
	
	  if (({}).toString.call(body) == "[object Object]") {
	    // must be OPENed to setRequestHeader
	    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    body = JSON.stringify(body);
	  }
	
	  if (!options.noGlobalEvents) {
	    request.addEventListener("loadstart", function (event) {
	      var e = wrapEvent("xhrstart", event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("loadend", function (event) {
	      var e = wrapEvent("xhrend", event);
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("success", function (event) {
	      var e = wrapEvent("xhrsuccess", event);
	      e.result = event.result;
	      document.dispatchEvent(e);
	    });
	    request.addEventListener("fail", function (event) {
	      var e = wrapEvent("xhrfail", event);
	      e.reason = event.reason;
	      document.dispatchEvent(e);
	    });
	  }
	
	  if (!options.raw) {
	    // means we want json
	    request.setRequestHeader("Accept", "application/json");
	  }
	
	  request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
	  var normalStatuses = options.normalStatuses || [200];
	
	  function wrapEvent(name, e) {
	    var event = new CustomEvent(name);
	    event.originalEvent = e;
	    return event;
	  }
	
	  function fail(reason, originalEvent) {
	    var e = wrapEvent("fail", originalEvent);
	    e.reason = reason;
	    request.dispatchEvent(e);
	  }
	
	  function success(result, originalEvent) {
	    var e = wrapEvent("success", originalEvent);
	    e.result = result;
	    request.dispatchEvent(e);
	  }
	
	  request.addEventListener("error", function (e) {
	    fail("Ошибка связи с сервером.", e);
	  });
	
	  request.addEventListener("timeout", function (e) {
	    fail("Превышено максимально допустимое время ожидания ответа от сервера.", e);
	  });
	
	  request.addEventListener("abort", function (e) {
	    fail("Запрос был прерван.", e);
	  });
	
	  request.addEventListener("load", function (e) {
	    if (!request.status) {
	      // does that ever happen?
	      fail("Не получен ответ от сервера.", e);
	      return;
	    }
	
	    if (normalStatuses.indexOf(request.status) == -1) {
	      fail("Ошибка на стороне сервера (код " + request.status + "), попытайтесь позднее", e);
	      return;
	    }
	
	    var result = request.responseText;
	    var contentType = request.getResponseHeader("Content-Type");
	    if (contentType.match(/^application\/json/) || options.json) {
	      // autoparse json if WANT or RECEIVED json
	      try {
	        result = JSON.parse(result);
	      } catch (e) {
	        fail("Некорректный формат ответа от сервера", e);
	        return;
	      }
	    }
	
	    success(result, e);
	  });
	
	  // defer to let other handlers be assigned
	  setTimeout(function () {
	    var timeStart = Date.now();
	
	    request.send(body);
	
	    request.addEventListener("loadend", function () {
	      window.ga("send", "timing", "xhr", method + " " + url, Date.now() - timeStart);
	    });
	  }, 0);
	
	  return request;
	}
	
	function addUrlParam(url, name, value) {
	  var param = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	  if (~url.indexOf("?")) {
	    return url + "&" + param;
	  } else {
	    return url + "?" + param;
	  }
	}
	
	document.addEventListener("xhrfail", function (event) {
	  new notification.Error(event.reason);
	});
	
	module.exports = xhr;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(70);
	
	Prism.tokenTag = "code"; // for iBooks to use monospace font
	
	var CodeBox = __webpack_require__(52);
	var CodeTabsBox = __webpack_require__(53);
	
	function initCodeBoxes(container) {
	
	  // highlight inline
	  var codeExampleElems = container.querySelectorAll(".code-example:not([data-prism-done])");
	
	  for (var i = 0; i < codeExampleElems.length; i++) {
	    var codeExampleElem = codeExampleElems[i];
	    new CodeBox(codeExampleElem);
	    codeExampleElem.setAttribute("data-prism-done", "1");
	  }
	}
	
	function initCodeTabsBox(container) {
	
	  var elems = container.querySelectorAll("div.code-tabs:not([data-prism-done])");
	
	  for (var i = 0; i < elems.length; i++) {
	    new CodeTabsBox(elems[i]);
	    elems[i].setAttribute("data-prism-done", "1");
	  }
	}
	
	exports.init = function () {
	
	  document.removeEventListener("DOMContentLoaded", Prism.highlightAll);
	
	  document.addEventListener("DOMContentLoaded", function () {
	    highlight(document);
	  });
	};
	
	function highlight(elem) {
	  initCodeBoxes(elem);
	  initCodeTabsBox(elem);
	}
	
	exports.highlight = highlight;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var xhr = __webpack_require__(30);
	
	var delegate = __webpack_require__(36);
	var Modal = __webpack_require__(5);
	var Spinner = __webpack_require__(29);
	var TutorialMap = __webpack_require__(34);
	var trackSticky = __webpack_require__(20);
	
	/**
	 * Options:
	 *   - callback: function to be called after successful login (by default - go to successRedirect)
	 *   - message: form message to be shown when the login form appears ("Log in to leave the comment")
	 *   - successRedirect: the page to redirect (current page by default)
	 *       - after immediate login
	 *       - after registration for "confirm email" link
	 */
	function TutorialMapModal() {
	  Modal.apply(this, arguments);
	
	  var spinner = new Spinner();
	  this.setContent(spinner.elem);
	  spinner.start();
	
	  var request = this.request({
	    url: "/tutorial/map"
	  });
	
	  var self = this;
	
	  request.addEventListener("success", function (event) {
	    var wrapper = document.createElement("div");
	    wrapper.className = "tutorial-map-overlay";
	    wrapper.innerHTML = event.result + "<button class=\"close-button tutorial-map-overlay__close\"></button>";
	    document.body.classList.add("tutorial-map_on");
	    self.setContent(wrapper);
	
	    wrapper.addEventListener("scroll", trackSticky);
	
	    new TutorialMap(self.contentElem.firstElementChild);
	  });
	
	  request.addEventListener("fail", function () {
	    self.remove();
	  });
	}
	
	TutorialMapModal.prototype = Object.create(Modal.prototype);
	
	delegate.delegateMixin(TutorialMapModal.prototype);
	
	TutorialMapModal.prototype.remove = function () {
	  Modal.prototype.remove.apply(this, arguments);
	  document.body.classList.remove("tutorial-map_on");
	};
	
	TutorialMapModal.prototype.request = function (options) {
	  var request = xhr(options);
	
	  return request;
	};
	
	module.exports = TutorialMapModal;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var throttle = __webpack_require__(49);
	var delegate = __webpack_require__(36);
	
	function TutorialMap(elem) {
	  var _this = this;
	
	  this.elem = elem;
	
	  this.showTasksCheckbox = elem.querySelector("[data-tutorial-map-show-tasks]");
	  this.showTasksCheckbox.checked = +localStorage.showTasksCheckbox;
	
	  this.updateShowTasks();
	
	  this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this);
	
	  this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]");
	  this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input");
	
	  this.layoutSwitch = this.elem.querySelector("[data-tutorial-map-layout-switch]");
	  var isMapSingleColumn = +localStorage.isMapSingleColumn;
	  this.layoutSwitch.querySelector("[value=\"0\"]").checked = !isMapSingleColumn;
	  this.layoutSwitch.querySelector("[value=\"1\"]").checked = isMapSingleColumn;
	  this.updateLayout();
	  this.layoutSwitch.onchange = this.onLayoutSwitchChange.bind(this);
	
	  this.filterInput.oninput = this.onFilterInput.bind(this);
	  this.filterInput.onkeydown = this.onFilterKeydown.bind(this);
	
	  this.elem.querySelector(".close-button").onclick = function () {
	    _this.filterInput.value = "";
	    _this.showClearButton(false);
	    _this.filter("");
	  };
	
	  this.chaptersCollapsed = JSON.parse(localStorage.tutorialMapChapters || "{}");
	  this.showChaptersCollapsed();
	
	  this.delegate(".tutorial-map__item > .tutorial-map__link", "click", function (event) {
	    event.preventDefault();
	    var href = event.delegateTarget.getAttribute("href");
	    if (this.chaptersCollapsed[href]) {
	      delete this.chaptersCollapsed[href];
	    } else {
	      this.chaptersCollapsed[href] = 1;
	    }
	    localStorage.tutorialMapChapters = JSON.stringify(this.chaptersCollapsed);
	    this.showChaptersCollapsed();
	  });
	
	  var activeLink = this.elem.querySelector("[href=\"" + location.pathname + "\"]");
	  if (activeLink) {
	    activeLink.classList.add("tutorial-map__link_active");
	  }
	
	  this.focus();
	}
	
	TutorialMap.prototype.showChaptersCollapsed = function () {
	  var links = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link");
	  for (var i = 0; i < links.length; i++) {
	    var link = links[i];
	
	    if (this.chaptersCollapsed[link.getAttribute("href")]) {
	      link.parentNode.classList.add("tutorial-map__item_collapsed");
	    } else {
	      link.parentNode.classList.remove("tutorial-map__item_collapsed");
	    }
	  }
	};
	
	TutorialMap.prototype.onLayoutSwitchChange = function (event) {
	  this.updateLayout();
	};
	
	TutorialMap.prototype.updateLayout = function () {
	  var isMapSingleColumn = +this.elem.querySelector("[name=\"map-layout\"]:checked").value;
	  if (isMapSingleColumn) {
	    this.elem.classList.add("tutorial-map_singlecol");
	  } else {
	    this.elem.classList.remove("tutorial-map_singlecol");
	  }
	
	  localStorage.isMapSingleColumn = isMapSingleColumn ? "1" : "0";
	};
	
	TutorialMap.prototype.updateShowTasks = function () {
	  if (this.showTasksCheckbox.checked) {
	    this.elem.classList.add("tutorial-map_show-tasks");
	  } else {
	    this.elem.classList.remove("tutorial-map_show-tasks");
	  }
	
	  localStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
	};
	
	TutorialMap.prototype.onFilterInput = function (event) {
	  this.showClearButton(event.target.value);
	  this.throttleFilter(event.target.value);
	};
	
	TutorialMap.prototype.onFilterKeydown = function (event) {
	  if (event.keyCode == 27) {
	    // escape
	    this.filterInput.value = "";
	    this.showClearButton(false);
	    this.filter("");
	  }
	};
	
	TutorialMap.prototype.showClearButton = function (show) {
	  if (show) {
	    this.textInputBlock.classList.add("text-input_clear-button");
	  } else {
	    this.textInputBlock.classList.remove("text-input_clear-button");
	  }
	};
	
	// focus on the map itself, to allow immediate scrolling with arrow up/down keys
	TutorialMap.prototype.focus = function () {
	  this.elem.tabIndex = -1;
	  this.elem.focus();
	};
	
	TutorialMap.prototype.filter = function (value) {
	  value = value.toLowerCase();
	  var showingTasks = this.showTasksCheckbox.checked;
	
	  var links = this.elem.querySelectorAll(".tutorial-map-link");
	
	  var topItems = this.elem.querySelectorAll(".tutorial-map__item");
	
	  function checkLiMatch(li) {
	    return isSubSequence(li.querySelector("a").innerHTML.toLowerCase(), value.replace(/\s/g, ""));
	  }
	
	  // an item is shown if any of its children is shown OR it's link matches the filter
	  for (var i = 0; i < topItems.length; i++) {
	    var li = topItems[i];
	    var subItems = li.querySelectorAll(".tutorial-map__sub-item");
	
	    var childMatch = Array.prototype.reduce.call(subItems, function (prevValue, subItem) {
	
	      var childMatch = false;
	
	      if (showingTasks) {
	        var subItems = subItem.querySelectorAll(".tutorial-map__sub-sub-item");
	        childMatch = Array.prototype.reduce.call(subItems, function (prevValue, subItem) {
	          var match = checkLiMatch(subItem);
	          subItem.hidden = !match;
	          return prevValue || match;
	        }, false);
	      }
	
	      var match = childMatch || checkLiMatch(subItem);
	      //console.log(subItem, match);
	      subItem.hidden = !match;
	
	      return prevValue || match;
	    }, false);
	
	    li.hidden = !(childMatch || checkLiMatch(li));
	  }
	};
	
	TutorialMap.prototype.throttleFilter = throttle(TutorialMap.prototype.filter, 200);
	delegate.delegateMixin(TutorialMap.prototype);
	
	function isSubSequence(str1, str2) {
	  var i = 0;
	  var j = 0;
	  while (i < str1.length && j < str2.length) {
	    if (str1[i] == str2[j]) {
	      i++;
	      j++;
	    } else {
	      i++;
	    }
	  }
	  return j == str2.length;
	}
	
	module.exports = TutorialMap;

/***/ },
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var resizeOnload = __webpack_require__(13);
	var isScrolledIntoView = __webpack_require__(76);
	var addLineNumbers = __webpack_require__(75);
	
	function CodeBox(elem) {
	
	  var preElem = elem.querySelector("pre");
	  var codeElem = preElem.querySelector("code");
	  var code = codeElem.textContent;
	
	  Prism.highlightElement(codeElem);
	  addLineNumbers(preElem);
	
	  addBlockHighlight(preElem, elem.dataset.highlightBlock);
	  addInlineHighlight(preElem, elem.dataset.highlightInline);
	
	  var isJS = preElem.classList.contains("language-javascript");
	  var isHTML = preElem.classList.contains("language-markup");
	  var isTrusted = elem.dataset.trusted;
	  var jsFrame;
	  var htmlResult;
	  var isFirstRun = true;
	
	  if (!isJS && !isHTML) {
	    return;
	  }var runElem = elem.querySelector("[data-action=\"run\"]");
	  if (runElem) {
	    runElem.onclick = function () {
	      this.blur();
	      run();
	      return false;
	    };
	  }
	
	  var editElem = elem.querySelector("[data-action=\"edit\"]");
	  if (editElem) {
	    editElem.onclick = function () {
	      this.blur();
	      edit();
	      return false;
	    };
	  }
	
	  // some code can't be executed by epub engine
	  if (elem.dataset.autorun !== undefined) {
	    if (window.ebookFormat == "epub" && elem.dataset.autorun == "no-epub") {
	      elem.querySelector("iframe").remove();
	    } else {
	      // timeout should be small, around 10ms, or remove it to make crawler process the autorun
	      setTimeout(run, 1000);
	    }
	  }
	
	  function postJSFrame() {
	    var win = jsFrame[0].contentWindow;
	    if (typeof win.postMessage != "function") {
	      alert("Извините, запуск кода требует более современный браузер");
	      return;
	    }
	    win.postMessage(code, "http://ru.lookatcode.com/showjs");
	  }
	
	  function runHTML() {
	
	    var frame;
	
	    if (htmlResult && elem.dataset.refresh) {
	      htmlResult.remove();
	      htmlResult = null;
	    }
	
	    if (!htmlResult) {
	      // take from HTML if exists there (in markup when autorun is specified)
	      htmlResult = elem.querySelector(".code-result");
	    }
	
	    if (!htmlResult) {
	      // otherwise create (or recreate if refresh)
	      htmlResult = document.createElement("div");
	      htmlResult.className = "code-result code-example__result";
	
	      frame = document.createElement("iframe");
	      frame.name = "frame-" + Math.random();
	      frame.className = "code-result__iframe";
	
	      if (elem.dataset.demoHeight === "0") {
	        // this html has nothing to show
	        frame.style.display = "none";
	      } else if (elem.dataset.demoHeight) {
	        var height = +elem.dataset.demoHeight;
	        frame.style.height = height + "px";
	      }
	      htmlResult.appendChild(frame);
	
	      elem.appendChild(htmlResult);
	    } else {
	      frame = htmlResult.querySelector("iframe");
	    }
	
	    if (isTrusted) {
	      var doc = frame.contentDocument || frame.contentWindow.document;
	
	      doc.open();
	      doc.write(normalizeHtml(code));
	      doc.close();
	
	      if (elem.dataset.demoHeight === undefined) {
	        resizeOnload.iframe(frame);
	      }
	
	      if (!(isFirstRun && elem.dataset.autorun !== undefined)) {
	        if (!isScrolledIntoView(htmlResult)) {
	          htmlResult.scrollIntoView(false);
	        }
	      }
	    } else {
	      var form = document.createElement("form");
	      form.style.display = "none";
	      form.method = "POST";
	      form.enctype = "multipart/form-data";
	      form.action = "http://ru.lookatcode.com/showhtml";
	      form.target = frame.name;
	
	      var textarea = document.createElement("textarea");
	      textarea.name = "code";
	      textarea.value = normalizeHtml(code);
	      form.appendChild(textarea);
	
	      frame.parentNode.insertBefore(form, frame.nextSibling);
	      form.submit();
	      form.remove();
	
	      if (!(isFirstRun && elem.dataset.autorun !== undefined)) {
	        frame.onload = function () {
	
	          if (elem.dataset.demoHeight === undefined) {
	            resizeOnload.iframe(frame);
	          }
	
	          if (!isScrolledIntoView(htmlResult)) {
	            htmlResult.scrollIntoView(false);
	          }
	        };
	      }
	    }
	  }
	
	  function runJS() {
	
	    if (isTrusted) {
	
	      try {
	        /* jshint -W061 */
	        window.eval.call(window, code);
	      } catch (e) {
	        console.error(e);
	        alert("Ошибка: " + e.message);
	      }
	    } else {
	
	      if (elem.dataset.refresh && jsFrame) {
	        jsFrame.remove();
	        jsFrame = null;
	      }
	
	      if (!jsFrame) {
	        // create iframe for js
	        jsFrame = document.createElement("iframe");
	        jsFrame.className = "js-frame";
	        jsFrame.src = "http://ru.lookatcode.com/showjs";
	        jsFrame.style.width = 0;
	        jsFrame.style.height = 0;
	        jsFrame.style.border = "none";
	        jsFrame.onload = function () {
	          postJSFrame();
	        };
	        document.body.appendChild(jsFrame);
	      } else {
	        postJSFrame();
	      }
	    }
	  }
	
	  function edit() {
	
	    var html;
	    if (isHTML) {
	      html = normalizeHtml(code);
	    } else {
	      var codeIndented = code.replace(/^/gim, "    ");
	      html = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + codeIndented + "\n  </script>\n</body>\n\n</html>";
	    }
	
	    var form = document.createElement("form");
	    form.action = "http://plnkr.co/edit/?p=preview";
	    form.method = "POST";
	    form.target = "_blank";
	
	    document.body.appendChild(form);
	
	    var textarea = document.createElement("textarea");
	    textarea.name = "files[index.html]";
	    textarea.value = html;
	    form.appendChild(textarea);
	
	    var input = document.createElement("input");
	    input.name = "description";
	    input.value = "Fork from " + window.location;
	    form.appendChild(input);
	
	    form.submit();
	    form.remove();
	  }
	
	  function normalizeHtml() {
	    var codeLc = code.toLowerCase();
	    var hasBodyStart = codeLc.match("<body>");
	    var hasBodyEnd = codeLc.match("</body>");
	    var hasHtmlStart = codeLc.match("<html>");
	    var hasHtmlEnd = codeLc.match("</html>");
	
	    var hasDocType = codeLc.match(/^\s*<!doctype/);
	
	    if (hasDocType) {
	      return code;
	    }
	
	    var result = code;
	
	    if (!hasHtmlStart) {
	      result = "<html>\n" + result;
	    }
	
	    if (!hasHtmlEnd) {
	      result = result + "\n</html>";
	    }
	
	    if (!hasBodyStart) {
	      result = result.replace("<html>", "<html>\n<head>\n  <meta charset=\"utf-8\">\n</head><body>\n");
	    }
	
	    if (!hasBodyEnd) {
	      result = result.replace("</html>", "\n</body>\n</html>");
	    }
	
	    result = "<!DOCTYPE HTML>\n" + result;
	
	    return result;
	  }
	
	  function run() {
	    if (isJS) {
	      runJS();
	    } else {
	      runHTML();
	    }
	    isFirstRun = false;
	  }
	}
	
	function addBlockHighlight(pre, lines) {
	
	  if (!lines) {
	    return;
	  }
	
	  var ranges = lines.replace(/\s+/g, "").split(",");
	
	  /*jshint -W084 */
	  for (var i = 0, range; range = ranges[i++];) {
	    range = range.split("-");
	
	    var start = +range[0],
	        end = +range[1] || start;
	
	    var mask = "<code class=\"block-highlight\" data-start=\"" + start + "\" data-end=\"" + end + "\">" + new Array(start + 1).join("\n") + "<code class=\"mask\">" + new Array(end - start + 2).join("\n") + "</code></code>";
	
	    pre.insertAdjacentHTML("afterBegin", mask);
	  }
	}
	
	function addInlineHighlight(pre, ranges) {
	
	  // select code with the language text, not block-highlighter
	  var codeElem = pre.querySelector("code[class*=\"language-\"]");
	
	  ranges = ranges ? ranges.split(",") : [];
	
	  for (var i = 0; i < ranges.length; i++) {
	    var piece = ranges[i].split(":");
	    var lineNum = +piece[0],
	        strRange = piece[1].split("-");
	    var start = +strRange[0],
	        end = +strRange[1];
	    var mask = "<code class=\"inline-highlight\">" + new Array(lineNum + 1).join("\n") + new Array(start + 1).join(" ") + "<code class=\"mask\">" + new Array(end - start + 1).join(" ") + "</code></code>";
	
	    codeElem.insertAdjacentHTML("afterBegin", mask);
	  }
	}
	
	module.exports = CodeBox;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var delegate = __webpack_require__(36);
	var addLineNumbers = __webpack_require__(75);
	
	function CodeTabsBox(elem) {
	  if (window.isEbook) {
	    return;
	  }
	
	  this.elem = elem;
	  this.translateX = 0;
	
	  this.switchesElem = elem.querySelector("[data-code-tabs-switches]");
	  this.switchesElemItems = this.switchesElem.firstElementChild;
	  this.arrowLeft = elem.querySelector("[data-code-tabs-left]");
	  this.arrowRight = elem.querySelector("[data-code-tabs-right]");
	
	  this.arrowLeft.onclick = (function (e) {
	    e.preventDefault();
	
	    this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth);
	    this.renderTranslate();
	  }).bind(this);
	
	  this.arrowRight.onclick = (function (e) {
	    e.preventDefault();
	
	    this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth);
	    this.renderTranslate();
	  }).bind(this);
	
	  this.delegate(".code-tabs__switch", "click", this.onSwitchClick);
	}
	
	CodeTabsBox.prototype.onSwitchClick = function (e) {
	  e.preventDefault();
	
	  var siblings = e.delegateTarget.parentNode.children;
	  var tabs = this.elem.querySelector("[data-code-tabs-content]").children;
	
	  var selectedIndex;
	  for (var i = 0; i < siblings.length; i++) {
	    var switchElem = siblings[i];
	    var tabElem = tabs[i];
	    if (switchElem == e.delegateTarget) {
	      selectedIndex = i;
	      tabElem.classList.add("code-tabs__section_current");
	      switchElem.classList.add("code-tabs__switch_current");
	    } else {
	      tabElem.classList.remove("code-tabs__section_current");
	      switchElem.classList.remove("code-tabs__switch_current");
	    }
	  }
	
	  if (selectedIndex === 0) {
	    this.elem.classList.add("code-tabs_result_on");
	  } else {
	    this.elem.classList.remove("code-tabs_result_on");
	
	    this.highlightTab(tabs[selectedIndex]);
	  }
	};
	
	CodeTabsBox.prototype.highlightTab = function (tab) {
	  if (tab.highlighted) return;
	  var preElem = tab.querySelector("pre");
	  var codeElem = preElem.querySelector("code");
	  Prism.highlightElement(codeElem);
	  addLineNumbers(preElem);
	  tab.highlighted = true;
	};
	
	CodeTabsBox.prototype.renderTranslate = function () {
	  this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)";
	  if (this.translateX === 0) {
	    this.arrowLeft.setAttribute("disabled", "");
	  } else {
	    this.arrowLeft.removeAttribute("disabled");
	  }
	
	  if (this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth) {
	    this.arrowRight.setAttribute("disabled", "");
	  } else {
	    this.arrowRight.removeAttribute("disabled");
	  }
	};
	
	delegate.delegateMixin(CodeTabsBox.prototype);
	
	module.exports = CodeTabsBox;

/***/ },
/* 54 */,
/* 55 */,
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
		);
	
	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 * MIT license http://www.opensource.org/licenses/mit-license.php/
	 * @author Lea Verou http://lea.verou.me
	 */
	
	var Prism = (function(){
	
	// Private helper vars
	var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
	
	var _ = self.Prism = {
		util: {
			encode: function (tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},
	
			type: function (o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},
	
			// Deep clone a language definition (e.g. to extend it)
			clone: function (o) {
				var type = _.util.type(o);
	
				switch (type) {
					case 'Object':
						var clone = {};
	
						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key]);
							}
						}
	
						return clone;
	
					case 'Array':
						return o.slice();
				}
	
				return o;
			}
		},
	
		languages: {
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);
	
				for (var key in redef) {
					lang[key] = redef[key];
				}
	
				return lang;
			},
	
			/**
			 * Insert a token before another token in a language literal
			 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
			 * we cannot just provide an object, we need anobject and a key.
			 * @param inside The key (or language id) of the parent
			 * @param before The key to insert before. If not provided, the function appends instead.
			 * @param insert Object with the key/value pairs to insert
			 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];
				
				if (arguments.length == 2) {
					insert = arguments[1];
					
					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}
					
					return grammar;
				}
				
				var ret = {};
	
				for (var token in grammar) {
	
					if (grammar.hasOwnProperty(token)) {
	
						if (token == before) {
	
							for (var newToken in insert) {
	
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}
	
						ret[token] = grammar[token];
					}
				}
				
				// Update references in other language definitions
				_.languages.DFS(_.languages, function(key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});
	
				return root[inside] = ret;
			},
	
			// Traverse a language definition with Depth First Search
			DFS: function(o, callback, type) {
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);
	
						if (_.util.type(o[i]) === 'Object') {
							_.languages.DFS(o[i], callback);
						}
						else if (_.util.type(o[i]) === 'Array') {
							_.languages.DFS(o[i], callback, i);
						}
					}
				}
			}
		},
	
		highlightAll: function(async, callback) {
			var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
	
			for (var i=0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, callback);
			}
		},
	
		highlightElement: function(element, async, callback) {
			// Find language
			var language, grammar, parent = element;
	
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}
	
			if (parent) {
				language = (parent.className.match(lang) || [,''])[1];
				grammar = _.languages[language];
			}
	
			if (!grammar) {
				return;
			}
	
			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
	
			// Set language on the parent, for styling
			parent = element.parentNode;
	
			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
	
			var code = element.textContent;
	
			if(!code) {
				return;
			}
	
			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};
	
			_.hooks.run('before-highlight', env);
	
			if (async && self.Worker) {
				var worker = new Worker(_.filename);
	
				worker.onmessage = function(evt) {
					env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);
	
					_.hooks.run('before-insert', env);
	
					env.element.innerHTML = env.highlightedCode;
	
					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
				};
	
				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code
				}));
			}
			else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language)
	
				_.hooks.run('before-insert', env);
	
				env.element.innerHTML = env.highlightedCode;
	
				callback && callback.call(element);
	
				_.hooks.run('after-highlight', env);
			}
		},
	
		highlight: function (text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},
	
		tokenize: function(text, grammar, language) {
			var Token = _.Token;
	
			var strarr = [text];
	
			var rest = grammar.rest;
	
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}
	
				delete grammar.rest;
			}
	
			tokenloop: for (var token in grammar) {
				if(!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}
	
				var patterns = grammar[token];
				patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];
	
				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
						inside = pattern.inside,
						lookbehind = !!pattern.lookbehind,
						lookbehindLength = 0,
						alias = pattern.alias;
	
					pattern = pattern.pattern || pattern;
	
					for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop
	
						var str = strarr[i];
	
						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							break tokenloop;
						}
	
						if (str instanceof Token) {
							continue;
						}
	
						pattern.lastIndex = 0;
	
						var match = pattern.exec(str);
	
						if (match) {
							if(lookbehind) {
								lookbehindLength = match[1].length;
							}
	
							var from = match.index - 1 + lookbehindLength,
								match = match[0].slice(lookbehindLength),
								len = match.length,
								to = from + len,
								before = str.slice(0, from + 1),
								after = str.slice(to + 1);
	
							var args = [i, 1];
	
							if (before) {
								args.push(before);
							}
	
							var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias);
	
							args.push(wrapped);
	
							if (after) {
								args.push(after);
							}
	
							Array.prototype.splice.apply(strarr, args);
						}
					}
				}
			}
	
			return strarr;
		},
	
		hooks: {
			all: {},
	
			add: function (name, callback) {
				var hooks = _.hooks.all;
	
				hooks[name] = hooks[name] || [];
	
				hooks[name].push(callback);
			},
	
			run: function (name, env) {
				var callbacks = _.hooks.all[name];
	
				if (!callbacks || !callbacks.length) {
					return;
				}
	
				for (var i=0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};
	
	var Token = _.Token = function(type, content, alias) {
		this.type = type;
		this.content = content;
		this.alias = alias;
	};
	
	Token.stringify = function(o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}
	
		if (Object.prototype.toString.call(o) == '[object Array]') {
			return o.map(function(element) {
				return Token.stringify(element, language, o);
			}).join('');
		}
	
		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: Prism.tokenTag || 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};
	
		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}
	
		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}
	
		_.hooks.run('wrap', env);
	
		var attributes = '';
	
		for (var name in env.attributes) {
			attributes += name + '="' + (env.attributes[name] || '') + '"';
		}
	
		return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
	
	};
	
	if (!self.document) {
		if (!self.addEventListener) {
			// in Node.js
			return self.Prism;
		}
	 	// In worker
		self.addEventListener('message', function(evt) {
			var message = JSON.parse(evt.data),
			    lang = message.language,
			    code = message.code;
	
			self.postMessage(JSON.stringify(_.util.encode(_.tokenize(code, _.languages[lang]))));
			self.close();
		}, false);
	
		return self.Prism;
	}
	
	// Get current script and highlight
	var script = document.getElementsByTagName('script');
	
	script = script[script.length - 1];
	
	if (script) {
		_.filename = script.src;
	
		if (document.addEventListener && !script.hasAttribute('data-manual')) {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
	
	return self.Prism;
	
	})();
	
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Prism;
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.markup = {
		'comment': /<!--[\w\W]*?-->/g,
		'prolog': /<\?.+?\?>/,
		'doctype': /<!DOCTYPE.+?>/,
		'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
		'tag': {
			pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
			inside: {
				'tag': {
					pattern: /^<\/?[\w:-]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[\w-]+?:/
					}
				},
				'attr-value': {
					pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
					inside: {
						'punctuation': /=|>|"/g
					}
				},
				'punctuation': /\/?>/g,
				'attr-name': {
					pattern: /[\w:-]+/g,
					inside: {
						'namespace': /^[\w-]+?:/
					}
				}
	
			}
		},
		'entity': /\&#?[\da-z]{1,8};/gi
	};
	
	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function(env) {
	
		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.css = {
		'comment': /\/\*[\w\W]*?\*\//g,
		'atrule': {
			pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
			inside: {
				'punctuation': /[;:]/g
			}
		},
		'url': /url\((["']?).*?\1\)/gi,
		'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
		'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
		'string': /("|')(\\?.)*?\1/g,
		'important': /\B!important\b/gi,
		'punctuation': /[\{\};:]/g,
		'function': /[-a-z0-9]+(?=\()/ig
	};
	
	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
				inside: {
					'tag': {
						pattern: /<style[\w\W]*?>|<\/style>/ig,
						inside: Prism.languages.markup.tag.inside
					},
					rest: Prism.languages.css
				},
				alias: 'language-css'
			}
		});
		
		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|').+?\1/ig,
				inside: {
					'attr-name': {
						pattern: /^\s*style/ig,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/gi,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.css.selector = {
		pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
		inside: {
			'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
			'pseudo-class': /:[-\w]+(?:\(.*\))?/g,
			'class': /\.[-:\.\w]+/g,
			'id': /#[-:\.\w]+/g
		}
	};
	
	Prism.languages.insertBefore('css', 'function', {
		'hexcode': /#[\da-f]{3,6}/gi,
		'entity': /\\[\da-f]{1,8}/gi,
		'number': /[\d%\.]+/g
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
				lookbehind: true
			}
		],
		'string': /("|')(\\?.)*?\1/g,
		'class-name': {
			pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
			lookbehind: true,
			inside: {
				punctuation: /(\.|\\)/
			}
		},
		'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
		'boolean': /\b(true|false)\b/g,
		'function': {
			pattern: /[a-z0-9_]+\(/ig,
			inside: {
				punctuation: /\(/
			}
		},
		'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
		'operator': /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
		'ignore': /&(lt|gt|amp);/gi,
		'punctuation': /[{}[\];(),.:]/g
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
		'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,
		'function': /(?!\d)[a-z0-9_$]+(?=\()/ig
	});
	
	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
			lookbehind: true
		}
	});
	
	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/ig,
				inside: {
					'tag': {
						pattern: /<script[\w\W]*?>|<\/script>/ig,
						inside: Prism.languages.markup.tag.inside
					},
					rest: Prism.languages.javascript
				},
				alias: 'language-javascript'
			}
		});
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	(function(Prism) {
	
	// Ignore comments starting with { to privilege string interpolation highlighting
	var comment = /#(?!\{).+/g,
	    interpolation = {
	    	pattern: /#\{[^}]+\}/g,
	    	alias: 'variable'
	    };
	
	Prism.languages.coffeescript = Prism.languages.extend('javascript', {
		'comment': comment,
		'string': [
	
			// Strings are multiline
			/'(?:\\?[\s\S])*?'/g,
	
			{
				// Strings are multiline
				pattern: /"(?:\\?[\s\S])*?"/g,
				inside: {
					'interpolation': interpolation
				}
			}
		],
		'keyword': /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/g,
		'class-member': {
			pattern: /@(?!\d)\w+/,
			alias: 'variable'
		}
	});
	
	Prism.languages.insertBefore('coffeescript', 'comment', {
		'multiline-comment': {
			pattern: /###[\s\S]+?###/g,
			alias: 'comment'
		},
	
		// Block regexp can contain comments and interpolation
		'block-regex': {
			pattern: /\/{3}[\s\S]*?\/{3}/,
			alias: 'regex',
			inside: {
				'comment': comment,
				'interpolation': interpolation
			}
		}
	});
	
	Prism.languages.insertBefore('coffeescript', 'string', {
		'inline-javascript': {
			pattern: /`(?:\\?[\s\S])*?`/g,
			inside: {
				'delimiter': {
					pattern: /^`|`$/g,
					alias: 'punctuation'
				},
				rest: Prism.languages.javascript
			}
		},
	
		// Block strings
		'multiline-string': [
			{
				pattern: /'''[\s\S]*?'''/,
				alias: 'string'
			},
			{
				pattern: /"""[\s\S]*?"""/,
				alias: 'string',
				inside: {
					interpolation: interpolation
				}
			}
		]
	
	});
	
	Prism.languages.insertBefore('coffeescript', 'keyword', {
		// Object property
		'property': /(?!\d)\w+(?=\s*:(?!:))/g
	});
	
	}(Prism));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.http = {
	    'request-line': {
	        pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/g,
	        inside: {
	            // HTTP Verb
	            property: /^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/g,
	            // Path or query argument
	            'attr-name': /:\w+/g
	        }
	    },
	    'response-status': {
	        pattern: /^HTTP\/1.[01] [0-9]+.*/g,
	        inside: {
	            // Status, e.g. 200 OK
	            property: /[0-9]+[A-Z\s-]+$/ig
	        }
	    },
	    // HTTP header name
	    keyword: /^[\w-]+:(?=.+)/gm
	};
	
	// Create a mapping of Content-Type headers to language definitions
	var httpLanguages = {
	    'application/json': Prism.languages.javascript,
	    'application/xml': Prism.languages.markup,
	    'text/xml': Prism.languages.markup,
	    'text/html': Prism.languages.markup
	};
	
	// Insert each content type parser that has its associated language
	// currently loaded.
	for (var contentType in httpLanguages) {
	    if (httpLanguages[contentType]) {
	        var options = {};
	        options[contentType] = {
	            pattern: new RegExp('(content-type:\\s*' + contentType + '[\\w\\W]*?)\\n\\n[\\w\\W]*', 'gi'),
	            lookbehind: true,
	            inside: {
	                rest: httpLanguages[contentType]
	            }
	        };
	        Prism.languages.insertBefore('http', 'keyword', options);
	    }
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.scss = Prism.languages.extend('css', {
		'comment': {
			pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
			lookbehind: true
		},
		// aturle is just the @***, not the entire rule (to highlight var & stuffs)
		// + add ability to highlight number & unit for media queries
		'atrule': /@[\w-]+(?=\s+(\(|\{|;))/gi,
		// url, compassified
		'url': /([-a-z]+-)*url(?=\()/gi,
		// CSS selector regex is not appropriate for Sass
		// since there can be lot more things (var, @ directive, nesting..)
		// a selector must start at the end of a property or after a brace (end of other rules or nesting)
		// it can contain some caracters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
		// the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
		// can "pass" as a selector- e.g: proper#{$erty})
		// this one was ard to do, so please be careful if you edit this one :)
		'selector': /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm
	});
	
	Prism.languages.insertBefore('scss', 'atrule', {
		'keyword': /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i
	});
	
	Prism.languages.insertBefore('scss', 'property', {
		// var and interpolated vars
		'variable': /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i
	});
	
	Prism.languages.insertBefore('scss', 'function', {
		'placeholder': /%[-_\w]+/i,
		'statement': /\B!(default|optional)\b/gi,
		'boolean': /\b(true|false)\b/g,
		'null': /\b(null)\b/g,
		'operator': /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g
	});


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.sql= { 
		'comment': {
			pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,
			lookbehind: true
		},
		'string' : {
			pattern: /(^|[^@])("|')(\\?[\s\S])*?\2/g,
			lookbehind: true
		},
		'variable': /@[\w.$]+|@("|'|`)(\\?[\s\S])+?\1/g,
		'function': /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/ig, // Should we highlight user defined functions too?
		'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMP(?:ORARY)?|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
		'boolean': /\b(?:TRUE|FALSE|NULL)\b/gi,
		'number': /\b-?(0x)?\d*\.?[\da-f]+\b/g,
		'operator': /\b(?:ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|[=<>]{1,2}|(&){1,2}|\|?\||\?|\*|\//gi,
		'punctuation': /[;[\]()`,.]/g
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
	 * Modified by Miles Johnson: http://milesj.me
	 *
	 * Supports the following:
	 * 		- Extends clike syntax
	 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
	 * 		- Smarter constant and function matching
	 *
	 * Adds the following new token classes:
	 * 		constant, delimiter, variable, function, package
	 */
	
	Prism.languages.php = Prism.languages.extend('clike', {
		'keyword': /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/ig,
		'constant': /\b[A-Z0-9_]{2,}\b/g,
		'comment': {
			pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,
			lookbehind: true
		}
	});
	
	Prism.languages.insertBefore('php', 'keyword', {
		'delimiter': /(\?>|<\?php|<\?)/ig,
		'variable': /(\$\w+)\b/ig,
		'package': {
			pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
			lookbehind: true,
			inside: {
				punctuation: /\\/
			}
		}
	});
	
	// Must be defined after the function pattern
	Prism.languages.insertBefore('php', 'operator', {
		'property': {
			pattern: /(->)[\w]+/g,
			lookbehind: true
		}
	});
	
	// Add HTML support of the markup language exists
	if (Prism.languages.markup) {
	
		// Tokenize all inline PHP blocks that are wrapped in <?php ?>
		// This allows for easy PHP + markup highlighting
		Prism.hooks.add('before-highlight', function(env) {
			if (env.language !== 'php') {
				return;
			}
	
			env.tokenStack = [];
	
			env.backupCode = env.code;
			env.code = env.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/ig, function(match) {
				env.tokenStack.push(match);
	
				return '{{{PHP' + env.tokenStack.length + '}}}';
			});
		});
	
		// Restore env.code for other plugins (e.g. line-numbers)
		Prism.hooks.add('before-insert', function(env) {
			if (env.language === 'php') {
				env.code = env.backupCode;
				delete env.backupCode;
			}
		});
	
		// Re-insert the tokens after highlighting
		Prism.hooks.add('after-highlight', function(env) {
			if (env.language !== 'php') {
				return;
			}
	
			for (var i = 0, t; t = env.tokenStack[i]; i++) {
				env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php'));
			}
	
			env.element.innerHTML = env.highlightedCode;
		});
	
		// Wrap tokens in classes that are missing them
		Prism.hooks.add('wrap', function(env) {
			if (env.language === 'php' && env.type === 'markup') {
				env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, "<span class=\"token php\">$1</span>");
			}
		});
	
		// Add the rules before all others
		Prism.languages.insertBefore('php', 'comment', {
			'markup': {
				pattern: /<[^?]\/?(.*?)>/g,
				inside: Prism.languages.markup
			},
			'php': /\{\{\{PHP[0-9]+\}\}\}/g
		});
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.insertBefore('php', 'variable', {
		'this': /\$this/g,
		'global': /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,
		'scope': {
			pattern: /\b[\w\\]+::/g,
			inside: {
				keyword: /(static|self|parent)/,
				punctuation: /(::|\\)/
			}
		}
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.python= { 
		'comment': {
			pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
			lookbehind: true
		},
		'string': /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/g,
		'keyword' : /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
		'boolean' : /\b(True|False)\b/g,
		'number' : /\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/gi,
		'operator' : /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
		'ignore' : /&(lt|gt|amp);/gi,
		'punctuation' : /[{}[\];(),.:]/g
	};
	


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Original by Samuel Flores
	 *
	 * Adds the following new token classes:
	 * 		constant, builtin, variable, symbol, regex
	 */
	Prism.languages.ruby = Prism.languages.extend('clike', {
		'comment': /#[^\r\n]*(\r?\n|$)/g,
		'keyword': /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
		'builtin': /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
		'constant': /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
	});
	
	Prism.languages.insertBefore('ruby', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
			lookbehind: true
		},
		'variable': /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
		'symbol': /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
	});


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	Prism.languages.java = Prism.languages.extend('clike', {
		'keyword': /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
		'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\b\d*\.?\d+\b/gi,
		'operator': {
			pattern: /(^|[^\.])(?:\+=|\+\+?|-=|--?|!=?|<{1,2}=?|>{1,3}=?|==?|&=|&&?|\|=|\|\|?|\?|\*=?|\/=?|%=?|\^=?|:|~)/gm,
			lookbehind: true
		}
	});

/***/ },
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function addLineNumbers(pre) {
	
	  var linesNum = 1 + pre.innerHTML.split("\n").length;
	  var lineNumbersWrapper;
	
	  var lines = new Array(linesNum);
	  lines = lines.join("<span></span>");
	
	  lineNumbersWrapper = document.createElement("span");
	  lineNumbersWrapper.className = "line-numbers-rows";
	  lineNumbersWrapper.innerHTML = lines;
	
	  if (pre.hasAttribute("data-start")) {
	    pre.style.counterReset = "linenumber " + Number(pre.dataset.start) - 1;
	  }
	
	  pre.appendChild(lineNumbersWrapper);
	}
	
	module.exports = addLineNumbers;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function isScrolledIntoView(elem) {
	  var coords = elem.getBoundingClientRect();
	
	  var visibleHeight = 0;
	
	  if (coords.top < 0) {
	    visibleHeight = coords.bottom;
	  } else if (coords.bottom > window.innerHeight) {
	    visibleHeight = window.innerHeight - top;
	  } else {
	    return true;
	  }
	
	  return visibleHeight > 10;
	}
	
	module.exports = isScrolledIntoView;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3RyYWNrU3RpY2t5LmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qcz9kMTJhIiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvdHV0b3JpYWxNYXBNb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvdHV0b3JpYWxNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2NvZGVCb3guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2NvZGVUYWJzQm94LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MtZXh0cmFzLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29mZmVlc2NyaXB0LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zcWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC1leHRyYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcHJpc20vYWRkTGluZU51bWJlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2lzU2Nyb2xsZWRJbnRvVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsS0FBSSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxFQUFpQixDQUFDLENBQUM7QUFDMUMsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFjLENBQUMsQ0FBQztBQUNwQyxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLEVBQVksQ0FBQyxDQUFDO0FBQ2hDLEtBQUksZ0JBQWdCLEdBQUcsbUJBQU8sQ0FBQyxFQUFvQixDQUFDLENBQUM7O0FBRXJELFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFHeEIsa0JBQWUsRUFBRSxDQUFDO0FBQ2xCLGlCQUFjLEVBQUUsQ0FBQzs7QUFFakIsdUJBQW9CLEVBQUUsQ0FBQzs7QUFFdkIsV0FBUSxDQUFDLFFBQVEsRUFBRSxnQ0FBOEIsRUFBRSxPQUFPLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDMUUsU0FBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3ZCLFVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUM7O0FBRUgsUUFBSyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUViLE9BQUksTUFBTSxD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a0JBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDN0Msa0JBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUMxQyxNQUFNO0FBQ0wsWUFBTyxJQUFJLENBQUM7SUFDYjs7QUFFRCxVQUFPLGFBQWEsR0FBRyxFQUFFLENBQUM7RUFDM0I7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xudmFyIHByaXNtID0gcmVxdWlyZSgnY2xpZW50L3ByaXNtJyk7XG52YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xudmFyIFR1dG9yaWFsTWFwTW9kYWwgPSByZXF1aXJlKCcuL3R1dG9yaWFsTWFwTW9kYWwnKTtcblxuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cblxuICBpbml0VGFza0J1dHRvbnMoKTtcbiAgaW5pdEZvbGRlckxpc3QoKTtcblxuICBpbml0U2lkZWJhckhpZ2hsaWdodCgpO1xuXG4gIGRlbGVnYXRlKGRvY3VtZW50LCAnW2RhdGEtYWN0aW9uPVwidHV0b3JpYWwtbWFwXCJdJywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBuZXcgVHV0b3JpYWxNYXBNb2RhbCgpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIHByaXNtLmluaXQoKTtcblxuICBpZiAod2luZG93LmlzRWJvb2spIHtcbiAgICByZXF1aXJlLmVuc3VyZSgnLi9lYm9vaycsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVxdWlyZSgnLi9lYm9vaycpLmluaXQoKTtcbiAgICB9LCAnZWJvb2snKTtcbiAgfVxufTtcblxuZXhwb3J0cy5UdXRvcmlhbE1hcCA9IHJlcXVpcmUoJy4vdHV0b3JpYWxNYXAnKTtcblxuZnVuY3Rpb24gaW5pdFNpZGViYXJIaWdobGlnaHQoKSB7XG5cbiAgZnVuY3Rpb24gaGlnaGxpZ2h0KCkge1xuXG4gICAgdmFyIGN1cnJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaWRlYmFyX19uYXZpZ2F0aW9uLWxpbmtfYWN0aXZlJyk7XG4gICAgaWYgKGN1cnJlbnRbMF0pIGN1cnJlbnRbMF0uY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhcl9fbmF2aWdhdGlvbi1saW5rX2FjdGl2ZScpO1xuXG4gICAgdmFyIGgycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaDJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaDIgPSBoMnNbaV07XG4gICAgICAvLyBmaXJzdCBpbi1wYWdlIGhlYWRlclxuICAgICAgaWYgKGgyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDApIGJyZWFrO1xuICAgIH1cbiAgICBpLS07IC8vIHdlIG5lZWQgdGhlIG9uZSBiZWZvcmUgaXQgKGN1cnJlbnRseSByZWFkaW5nKVxuXG4gICAgaWYgKGk+PTApIHtcbiAgICAgIHZhciBocmVmID0gaDJzW2ldLmZpcnN0RWxlbWVudENoaWxkICYmIGgyc1tpXS5maXJzdEVsZW1lbnRDaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHZhciBsaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19uYXZpZ2F0aW9uLWxpbmsgYVtocmVmPVwiJyArIGhyZWYgKyAnXCJdJyk7XG4gICAgICBpZiAoaHJlZiAmJiBsaSkge1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX19uYXZpZ2F0aW9uLWxpbmtfYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaGlnaGxpZ2h0KCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGlnaGxpZ2h0KTtcbiAgfSk7XG5cblxufVxuXG5cbmZ1bmN0aW9uIGluaXRUYXNrQnV0dG9ucygpIHtcbiAgLy8gc29sdXRpb24gYnV0dG9uXG4gIGRlbGVnYXRlKGRvY3VtZW50LCAnLnRhc2tfX3NvbHV0aW9uJywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2snKS5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19hbnN3ZXJfb3BlbicpO1xuICB9KTtcblxuICAvLyBjbG9zZSBzb2x1dGlvbiBidXR0b25cbiAgZGVsZWdhdGUoZG9jdW1lbnQsICcudGFza19fYW5zd2VyLWNsb3NlJywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2snKS5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19hbnN3ZXJfb3BlbicpO1xuICB9KTtcblxuICAvLyBldmVyeSBzdGVwIGJ1dHRvbiAoaWYgYW55IHN0ZXBzKVxuICBkZWxlZ2F0ZShkb2N1bWVudCwgJy50YXNrX19zdGVwLXNob3cnLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFza19fc3RlcCcpLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX3N0ZXBfb3BlbicpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdEZvbGRlckxpc3QoKSB7XG4gIGRlbGVnYXRlKGRvY3VtZW50LCAnLmxlc3NvbnMtbGlzdF9fbGVzc29uX2xldmVsXzEgPiAubGVzc29ucy1saXN0X19saW5rJywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgbGluayA9IGV2ZW50LmRlbGVnYXRlVGFyZ2V0O1xuICAgIHZhciBvcGVuRm9sZGVyID0gbGluay5jbG9zZXN0KCcubGVzc29ucy1saXN0JykucXVlcnlTZWxlY3RvcignLmxlc3NvbnMtbGlzdF9fbGVzc29uX29wZW4nKTtcbiAgICAvLyBjbG9zZSB0aGUgcHJldmlvdXMgb3BlbiBmb2xkZXIgKHRodXMgbWFraW5nIGFuIGFjY29yZGlvbilcbiAgICBpZiAob3BlbkZvbGRlciAmJiBvcGVuRm9sZGVyICE9IGxpbmsucGFyZW50Tm9kZSkge1xuICAgICAgb3BlbkZvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdsZXNzb25zLWxpc3RfX2xlc3Nvbl9vcGVuJyk7XG4gICAgfVxuICAgIGxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdsZXNzb25zLWxpc3RfX2xlc3Nvbl9vcGVuJyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cmFja1N0aWNreTtcblxuXG5mdW5jdGlvbiB0cmFja1N0aWNreSgpIHtcblxuICB2YXIgc3RpY2t5RWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdGlja3ldJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGlja3lFbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzdGlja3lFbGVtID0gc3RpY2t5RWxlbXNbaV07XG4gICAgdmFyIGNvbnRhaW5lciA9IHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kgP1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGlja3lFbGVtLmRhdGFzZXQuc3RpY2t5KSA6IGRvY3VtZW50LmJvZHk7XG5cbiAgICBpZiAoc3RpY2t5RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XG4gICAgICAvLyBiZWNvbWUgZml4ZWRcbiAgICAgIGlmIChzdGlja3lFbGVtLnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgLy8gYWxyZWFkeSBmaXhlZFxuICAgICAgICAvLyBpbmVydGlhOiBoYXBwZW5zIHdoZW4gc2Nyb2xsZWQgZmFzdCB0b28gbXVjaCB0byBib3R0b21cbiAgICAgICAgLy8gaHR0cDovL2lseWFrYW50b3IucnUvc2NyZWVuLzIwMTUtMDItMjRfMTU1NS5zd2ZcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2F2ZWRMZWZ0ID0gc3RpY2t5RWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gY3JlYXRlUGxhY2Vob2xkZXIoc3RpY2t5RWxlbSk7XG5cbiAgICAgIHN0aWNreUVsZW0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIHN0aWNreUVsZW0pO1xuXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RpY2t5RWxlbSk7XG4gICAgICBzdGlja3lFbGVtLmNsYXNzTGlzdC5hZGQoJ3N0aWNreScpO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmxlZnQgPSBzYXZlZExlZnQgKyAncHgnO1xuICAgICAgLy8gekluZGV4IDwgMTAwMCwgYmVjYXVzZSBpdCBtdXN0IGJlIHVuZGVyIGFuIG92ZXJsYXksXG4gICAgICAvLyBlLmcuIHNpdGVtYXAgbXVzdCBzaG93IG92ZXIgdGhlIHByb2dyZXNzIGJhclxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS56SW5kZXggPSAxMDE7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnOyAvLyBub24tdHJhbnNwYXJlbnQgdG8gY292ZXIgdGhlIHRleHRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubWFyZ2luID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUud2lkdGggPSBwbGFjZWhvbGRlci5vZmZzZXRXaWR0aCArICdweCc7IC8vIGtlZXAgc2FtZSB3aWR0aCBhcyBiZWZvcmVcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICB9IGVsc2UgaWYgKHN0aWNreUVsZW0ucGxhY2Vob2xkZXIgJiYgc3RpY2t5RWxlbS5wbGFjZWhvbGRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiAwKSB7XG4gICAgICAvLyBiZWNvbWUgbm9uLWZpeGVkXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLmNzc1RleHQgPSAnJztcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0aWNreUVsZW0sIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIpO1xuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlci5yZW1vdmUoKTtcblxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcGxhY2Vob2xkZXIgdy8gc2FtZSBzaXplICYgbWFyZ2luXG4gKiBAcGFyYW0gZWxlbVxuICogQHJldHVybnMgeyp8IUhUTUxFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVQbGFjZWhvbGRlcihlbGVtKSB7XG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICBwbGFjZWhvbGRlci5zdHlsZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGggKyAncHgnO1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5MZWZ0ID0gc3R5bGUubWFyZ2luTGVmdDtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luUmlnaHQgPSBzdHlsZS5tYXJnaW5SaWdodDtcbiAgcGxhY2Vob2xkZXIuc3R5bGUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSBzdHlsZS5tYXJnaW5Cb3R0b207XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpblRvcCA9IHN0eWxlLm1hcmdpblRvcDtcbiAgcmV0dXJuIHBsYWNlaG9sZGVyO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3RyYWNrU3RpY2t5LmpzXG4gKiovIiwidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpO1xuICBpZiAoY3NyZkNvb2tpZSAmJiAhb3B0aW9ucy5za2lwQ3NyZikge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIlgtWFNSRi1UT0tFTlwiLCBjc3JmQ29va2llKTtcbiAgfVxuXG4gIGlmICh7fS50b1N0cmluZy5jYWxsKGJvZHkpID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gbXVzdCBiZSBPUEVOZWQgdG8gc2V0UmVxdWVzdEhlYWRlclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcbiAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuXG4gIGlmICghb3B0aW9ucy5ub0dsb2JhbEV2ZW50cykge1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN0YXJ0JywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZW5kJywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3VjY2VzcycsIGV2ZW50KTtcbiAgICAgIGUucmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZmFpbCcsIGV2ZW50KTtcbiAgICAgIGUucmVhc29uID0gZXZlbnQucmVhc29uO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5yYXcpIHsgLy8gbWVhbnMgd2Ugd2FudCBqc29uXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgfVxuXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsIFwiWE1MSHR0cFJlcXVlc3RcIik7XG5cbiAgdmFyIG5vcm1hbFN0YXR1c2VzID0gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyB8fCBbMjAwXTtcblxuICBmdW5jdGlvbiB3cmFwRXZlbnQobmFtZSwgZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lKTtcbiAgICBldmVudC5vcmlnaW5hbEV2ZW50ID0gZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBmYWlsKHJlYXNvbiwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwiZmFpbFwiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwic3VjY2Vzc1wiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlc3VsdCA9IHJlc3VsdDtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J7RiNC40LHQutCwINGB0LLRj9C30Lgg0YEg0YHQtdGA0LLQtdGA0L7QvC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCf0YDQtdCy0YvRiNC10L3QviDQvNCw0LrRgdC40LzQsNC70YzQvdC+INC00L7Qv9GD0YHRgtC40LzQvtC1INCy0YDQtdC80Y8g0L7QttC40LTQsNC90LjRjyDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQl9Cw0L/RgNC+0YEg0LHRi9C7INC/0YDQtdGA0LLQsNC9LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBlID0+IHtcbiAgICBpZiAoIXJlcXVlc3Quc3RhdHVzKSB7IC8vIGRvZXMgdGhhdCBldmVyIGhhcHBlbj9cbiAgICAgIGZhaWwoXCLQndC1INC/0L7Qu9GD0YfQtdC9INC+0YLQstC10YIg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbFN0YXR1c2VzLmluZGV4T2YocmVxdWVzdC5zdGF0dXMpID09IC0xKSB7XG4gICAgICBmYWlsKFwi0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAgKNC60L7QtCBcIiArIHJlcXVlc3Quc3RhdHVzICsgXCIpLCDQv9C+0L/Ri9GC0LDQudGC0LXRgdGMINC/0L7Qt9C00L3QtdC1XCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICB2YXIgY29udGVudFR5cGUgPSByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgIGlmIChjb250ZW50VHlwZS5tYXRjaCgvXmFwcGxpY2F0aW9uXFwvanNvbi8pIHx8IG9wdGlvbnMuanNvbikgeyAvLyBhdXRvcGFyc2UganNvbiBpZiBXQU5UIG9yIFJFQ0VJVkVEIGpzb25cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LBcIiwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdWNjZXNzKHJlc3VsdCwgZSk7XG4gIH0pO1xuXG4gIC8vIGRlZmVyIHRvIGxldCBvdGhlciBoYW5kbGVycyBiZSBhc3NpZ25lZFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAndGltaW5nJywgJ3hocicsIG1ldGhvZCArICcgJyArIHVybCwgRGF0ZS5ub3coKSAtIHRpbWVTdGFydCk7XG4gICAgfSk7XG4gIH0sIDApO1xuXG5cblxuXG4gIHJldHVybiByZXF1ZXN0O1xuXG59XG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjc3JmQ29va2llID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9YU1JGLVRPS0VOPShbXFx3LV0rKS8pO1xuICByZXR1cm4gY3NyZkNvb2tpZSA/IGNzcmZDb29raWVbMV0gOiBudWxsO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvZ2V0Q3NyZkNvb2tpZS5qc1xuICoqLyIsInJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLWV4dHJhcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLWV4dHJhcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhLmpzJyk7XG5cblByaXNtLnRva2VuVGFnID0gJ2NvZGUnOyAvLyBmb3IgaUJvb2tzIHRvIHVzZSBtb25vc3BhY2UgZm9udFxuXG52YXIgQ29kZUJveCA9IHJlcXVpcmUoJy4vY29kZUJveCcpO1xudmFyIENvZGVUYWJzQm94ID0gcmVxdWlyZSgnLi9jb2RlVGFic0JveCcpO1xuXG5mdW5jdGlvbiBpbml0Q29kZUJveGVzKGNvbnRhaW5lcikge1xuXG4gIC8vIGhpZ2hsaWdodCBpbmxpbmVcbiAgdmFyIGNvZGVFeGFtcGxlRWxlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNvZGUtZXhhbXBsZTpub3QoW2RhdGEtcHJpc20tZG9uZV0pJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlRXhhbXBsZUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNvZGVFeGFtcGxlRWxlbSA9IGNvZGVFeGFtcGxlRWxlbXNbaV07XG4gICAgbmV3IENvZGVCb3goY29kZUV4YW1wbGVFbGVtKTtcbiAgICBjb2RlRXhhbXBsZUVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByaXNtLWRvbmUnLCAnMScpO1xuICB9XG5cbn1cblxuXG5mdW5jdGlvbiBpbml0Q29kZVRhYnNCb3goY29udGFpbmVyKSB7XG5cbiAgdmFyIGVsZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5jb2RlLXRhYnM6bm90KFtkYXRhLXByaXNtLWRvbmVdKScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBuZXcgQ29kZVRhYnNCb3goZWxlbXNbaV0pO1xuICAgIGVsZW1zW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlzbS1kb25lJywgJzEnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgUHJpc20uaGlnaGxpZ2h0QWxsKTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaGlnaGxpZ2h0KGRvY3VtZW50KTtcbiAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodChlbGVtKSB7XG4gIGluaXRDb2RlQm94ZXMoZWxlbSk7XG4gIGluaXRDb2RlVGFic0JveChlbGVtKTtcbn1cblxuZXhwb3J0cy5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vaW5kZXguanNcbiAqKi8iLCJ2YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xuXG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBNb2RhbCA9IHJlcXVpcmUoJ2NsaWVudC9oZWFkL21vZGFsJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG52YXIgVHV0b3JpYWxNYXAgPSByZXF1aXJlKCcuL3R1dG9yaWFsTWFwJyk7XG52YXIgdHJhY2tTdGlja3kgPSByZXF1aXJlKCdjbGllbnQvdHJhY2tTdGlja3knKTtcblxuLyoqXG4gKiBPcHRpb25zOlxuICogICAtIGNhbGxiYWNrOiBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpbiAoYnkgZGVmYXVsdCAtIGdvIHRvIHN1Y2Nlc3NSZWRpcmVjdClcbiAqICAgLSBtZXNzYWdlOiBmb3JtIG1lc3NhZ2UgdG8gYmUgc2hvd24gd2hlbiB0aGUgbG9naW4gZm9ybSBhcHBlYXJzIChcIkxvZyBpbiB0byBsZWF2ZSB0aGUgY29tbWVudFwiKVxuICogICAtIHN1Y2Nlc3NSZWRpcmVjdDogdGhlIHBhZ2UgdG8gcmVkaXJlY3QgKGN1cnJlbnQgcGFnZSBieSBkZWZhdWx0KVxuICogICAgICAgLSBhZnRlciBpbW1lZGlhdGUgbG9naW5cbiAqICAgICAgIC0gYWZ0ZXIgcmVnaXN0cmF0aW9uIGZvciBcImNvbmZpcm0gZW1haWxcIiBsaW5rXG4gKi9cbmZ1bmN0aW9uIFR1dG9yaWFsTWFwTW9kYWwoKSB7XG4gIE1vZGFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcigpO1xuICB0aGlzLnNldENvbnRlbnQoc3Bpbm5lci5lbGVtKTtcbiAgc3Bpbm5lci5zdGFydCgpO1xuXG4gIHZhciByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0KHtcbiAgICB1cmw6ICcvdHV0b3JpYWwvbWFwJ1xuICB9KTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLW1hcC1vdmVybGF5JztcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9IGV2ZW50LnJlc3VsdCArICc8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnV0dG9uIHR1dG9yaWFsLW1hcC1vdmVybGF5X19jbG9zZVwiPjwvYnV0dG9uPic7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfb24nKTtcbiAgICBzZWxmLnNldENvbnRlbnQod3JhcHBlcik7XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU3RpY2t5KTtcblxuICAgIG5ldyBUdXRvcmlhbE1hcChzZWxmLmNvbnRlbnRFbGVtLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5yZW1vdmUoKTtcbiAgfSk7XG5cbn1cblxuVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE1vZGFsLnByb3RvdHlwZSk7XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUpO1xuXG5UdXRvcmlhbE1hcE1vZGFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLW1hcF9vbicpO1xufTtcblxuVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIHJlcXVlc3QgPSB4aHIob3B0aW9ucyk7XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFR1dG9yaWFsTWFwTW9kYWw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC90dXRvcmlhbE1hcE1vZGFsLmpzXG4gKiovIiwidmFyIHRocm90dGxlID0gcmVxdWlyZSgnbGliL3Rocm90dGxlJyk7XG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcblxuZnVuY3Rpb24gVHV0b3JpYWxNYXAoZWxlbSkge1xuICB0aGlzLmVsZW0gPSBlbGVtO1xuXG4gIHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3ggPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXR1dG9yaWFsLW1hcC1zaG93LXRhc2tzXScpO1xuICB0aGlzLnNob3dUYXNrc0NoZWNrYm94LmNoZWNrZWQgPSArbG9jYWxTdG9yYWdlLnNob3dUYXNrc0NoZWNrYm94O1xuXG4gIHRoaXMudXBkYXRlU2hvd1Rhc2tzKCk7XG5cbiAgdGhpcy5zaG93VGFza3NDaGVja2JveC5vbmNoYW5nZSA9IHRoaXMudXBkYXRlU2hvd1Rhc2tzLmJpbmQodGhpcyk7XG5cbiAgdGhpcy5maWx0ZXJJbnB1dCA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS10dXRvcmlhbC1tYXAtZmlsdGVyXScpO1xuICB0aGlzLnRleHRJbnB1dEJsb2NrID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy50dXRvcmlhbC1tYXBfX2ZpbHRlciAudGV4dC1pbnB1dCcpO1xuXG4gIHRoaXMubGF5b3V0U3dpdGNoID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXR1dG9yaWFsLW1hcC1sYXlvdXQtc3dpdGNoXScpO1xuICB2YXIgaXNNYXBTaW5nbGVDb2x1bW4gPSArbG9jYWxTdG9yYWdlLmlzTWFwU2luZ2xlQ29sdW1uO1xuICB0aGlzLmxheW91dFN3aXRjaC5xdWVyeVNlbGVjdG9yKCdbdmFsdWU9XCIwXCJdJykuY2hlY2tlZCA9ICFpc01hcFNpbmdsZUNvbHVtbjtcbiAgdGhpcy5sYXlvdXRTd2l0Y2gucXVlcnlTZWxlY3RvcignW3ZhbHVlPVwiMVwiXScpLmNoZWNrZWQgPSBpc01hcFNpbmdsZUNvbHVtbjtcbiAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbiAgdGhpcy5sYXlvdXRTd2l0Y2gub25jaGFuZ2UgPSB0aGlzLm9uTGF5b3V0U3dpdGNoQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgdGhpcy5maWx0ZXJJbnB1dC5vbmlucHV0ID0gdGhpcy5vbkZpbHRlcklucHV0LmJpbmQodGhpcyk7XG4gIHRoaXMuZmlsdGVySW5wdXQub25rZXlkb3duID0gdGhpcy5vbkZpbHRlcktleWRvd24uYmluZCh0aGlzKTtcblxuICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5maWx0ZXJJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuc2hvd0NsZWFyQnV0dG9uKGZhbHNlKTtcbiAgICB0aGlzLmZpbHRlcignJyk7XG4gIH07XG5cbiAgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnR1dG9yaWFsTWFwQ2hhcHRlcnMgfHwgXCJ7fVwiKTtcbiAgdGhpcy5zaG93Q2hhcHRlcnNDb2xsYXBzZWQoKTtcblxuICB0aGlzLmRlbGVnYXRlKCcudHV0b3JpYWwtbWFwX19pdGVtID4gLnR1dG9yaWFsLW1hcF9fbGluaycsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaHJlZiA9IGV2ZW50LmRlbGVnYXRlVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICh0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2hyZWZdKSB7XG4gICAgICBkZWxldGUgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZFtocmVmXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZFtocmVmXSA9IDE7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS50dXRvcmlhbE1hcENoYXB0ZXJzID0gSlNPTi5zdHJpbmdpZnkodGhpcy5jaGFwdGVyc0NvbGxhcHNlZCk7XG4gICAgdGhpcy5zaG93Q2hhcHRlcnNDb2xsYXBzZWQoKTtcbiAgfSk7XG5cbiAgdmFyIGFjdGl2ZUxpbmsgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2hyZWY9XCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCJdJyk7XG4gIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfX2xpbmtfYWN0aXZlJyk7XG4gIH1cblxuICB0aGlzLmZvY3VzKCk7XG5cbn1cblxuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuc2hvd0NoYXB0ZXJzQ29sbGFwc2VkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsaW5rcyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCcudHV0b3JpYWwtbWFwX19pdGVtID4gLnR1dG9yaWFsLW1hcF9fbGluaycpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBsaW5rc1tpXTtcblxuICAgIGlmICh0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2xpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyldKSB7XG4gICAgICBsaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndHV0b3JpYWwtbWFwX19pdGVtX2NvbGxhcHNlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndHV0b3JpYWwtbWFwX19pdGVtX2NvbGxhcHNlZCcpO1xuICAgIH1cbiAgfVxufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLm9uTGF5b3V0U3dpdGNoQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbn07XG5cblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXNNYXBTaW5nbGVDb2x1bW4gPSArdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibWFwLWxheW91dFwiXTpjaGVja2VkJykudmFsdWU7XG4gIGlmIChpc01hcFNpbmdsZUNvbHVtbikge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfc2luZ2xlY29sJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLW1hcF9zaW5nbGVjb2wnKTtcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5pc01hcFNpbmdsZUNvbHVtbiA9IGlzTWFwU2luZ2xlQ29sdW1uID8gXCIxXCIgOiBcIjBcIjtcbn07XG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS51cGRhdGVTaG93VGFza3MgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3guY2hlY2tlZCkge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfc2hvdy10YXNrcycpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd0dXRvcmlhbC1tYXBfc2hvdy10YXNrcycpO1xuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNob3dUYXNrc0NoZWNrYm94ID0gdGhpcy5zaG93VGFza3NDaGVja2JveC5jaGVja2VkID8gXCIxXCIgOiBcIjBcIjtcbn07XG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS5vbkZpbHRlcklucHV0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5zaG93Q2xlYXJCdXR0b24oZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgdGhpcy50aHJvdHRsZUZpbHRlcihldmVudC50YXJnZXQudmFsdWUpO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLm9uRmlsdGVyS2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7IC8vIGVzY2FwZVxuICAgIHRoaXMuZmlsdGVySW5wdXQudmFsdWUgPSAnJztcbiAgICB0aGlzLnNob3dDbGVhckJ1dHRvbihmYWxzZSk7XG4gICAgdGhpcy5maWx0ZXIoJycpO1xuICB9XG59O1xuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuc2hvd0NsZWFyQnV0dG9uID0gZnVuY3Rpb24oc2hvdykge1xuICBpZiAoc2hvdykge1xuICAgIHRoaXMudGV4dElucHV0QmxvY2suY2xhc3NMaXN0LmFkZCgndGV4dC1pbnB1dF9jbGVhci1idXR0b24nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRleHRJbnB1dEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaW5wdXRfY2xlYXItYnV0dG9uJyk7XG4gIH1cbn07XG5cbi8vIGZvY3VzIG9uIHRoZSBtYXAgaXRzZWxmLCB0byBhbGxvdyBpbW1lZGlhdGUgc2Nyb2xsaW5nIHdpdGggYXJyb3cgdXAvZG93biBrZXlzXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtLnRhYkluZGV4ID0gLTE7XG4gIHRoaXMuZWxlbS5mb2N1cygpO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgdmFyIHNob3dpbmdUYXNrcyA9IHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3guY2hlY2tlZDtcblxuICB2YXIgbGlua3MgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvckFsbCgnLnR1dG9yaWFsLW1hcC1saW5rJyk7XG5cbiAgdmFyIHRvcEl0ZW1zID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX2l0ZW0nKTtcblxuICBmdW5jdGlvbiBjaGVja0xpTWF0Y2gobGkpIHtcbiAgICByZXR1cm4gaXNTdWJTZXF1ZW5jZShsaS5xdWVyeVNlbGVjdG9yKCdhJykuaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCksIHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykpO1xuICB9XG5cbiAgLy8gYW4gaXRlbSBpcyBzaG93biBpZiBhbnkgb2YgaXRzIGNoaWxkcmVuIGlzIHNob3duIE9SIGl0J3MgbGluayBtYXRjaGVzIHRoZSBmaWx0ZXJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3BJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaSA9IHRvcEl0ZW1zW2ldO1xuICAgIHZhciBzdWJJdGVtcyA9IGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX3N1Yi1pdGVtJyk7XG5cbiAgICB2YXIgY2hpbGRNYXRjaCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChzdWJJdGVtcywgZnVuY3Rpb24ocHJldlZhbHVlLCBzdWJJdGVtKSB7XG5cbiAgICAgIHZhciBjaGlsZE1hdGNoID0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG93aW5nVGFza3MpIHtcbiAgICAgICAgdmFyIHN1Ykl0ZW1zID0gc3ViSXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcudHV0b3JpYWwtbWFwX19zdWItc3ViLWl0ZW0nKTtcbiAgICAgICAgY2hpbGRNYXRjaCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChzdWJJdGVtcywgZnVuY3Rpb24ocHJldlZhbHVlLCBzdWJJdGVtKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gY2hlY2tMaU1hdGNoKHN1Ykl0ZW0pO1xuICAgICAgICAgIHN1Ykl0ZW0uaGlkZGVuID0gIW1hdGNoO1xuICAgICAgICAgIHJldHVybiBwcmV2VmFsdWUgfHwgbWF0Y2g7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gY2hpbGRNYXRjaCB8fCBjaGVja0xpTWF0Y2goc3ViSXRlbSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHN1Ykl0ZW0sIG1hdGNoKTtcbiAgICAgIHN1Ykl0ZW0uaGlkZGVuID0gIW1hdGNoO1xuXG4gICAgICByZXR1cm4gcHJldlZhbHVlIHx8IG1hdGNoO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGxpLmhpZGRlbiA9ICEoY2hpbGRNYXRjaCB8fCBjaGVja0xpTWF0Y2gobGkpKTtcblxuICB9XG5cbn07XG5cblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLnRocm90dGxlRmlsdGVyID0gdGhyb3R0bGUoVHV0b3JpYWxNYXAucHJvdG90eXBlLmZpbHRlciwgMjAwKTtcbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oVHV0b3JpYWxNYXAucHJvdG90eXBlKTtcblxuXG5mdW5jdGlvbiBpc1N1YlNlcXVlbmNlKHN0cjEsIHN0cjIpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgaiA9IDA7XG4gIHdoaWxlIChpIDwgc3RyMS5sZW5ndGggJiYgaiA8IHN0cjIubGVuZ3RoKSB7XG4gICAgaWYgKHN0cjFbaV0gPT0gc3RyMltqXSkge1xuICAgICAgaSsrO1xuICAgICAgaisrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBqID09IHN0cjIubGVuZ3RoO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVHV0b3JpYWxNYXA7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC90dXRvcmlhbE1hcC5qc1xuICoqLyIsInZhciByZXNpemVPbmxvYWQgPSByZXF1aXJlKCdjbGllbnQvaGVhZC9yZXNpemVPbmxvYWQnKTtcbnZhciBpc1Njcm9sbGVkSW50b1ZpZXcgPSByZXF1aXJlKCdjbGllbnQvaXNTY3JvbGxlZEludG9WaWV3Jyk7XG52YXIgYWRkTGluZU51bWJlcnMgPSByZXF1aXJlKCcuL2FkZExpbmVOdW1iZXJzJyk7XG5cbmZ1bmN0aW9uIENvZGVCb3goZWxlbSkge1xuXG4gIHZhciBwcmVFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdwcmUnKTtcbiAgdmFyIGNvZGVFbGVtID0gcHJlRWxlbS5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG4gIHZhciBjb2RlID0gY29kZUVsZW0udGV4dENvbnRlbnQ7XG5cbiAgUHJpc20uaGlnaGxpZ2h0RWxlbWVudChjb2RlRWxlbSk7XG4gIGFkZExpbmVOdW1iZXJzKHByZUVsZW0pO1xuXG4gIGFkZEJsb2NrSGlnaGxpZ2h0KHByZUVsZW0sIGVsZW0uZGF0YXNldC5oaWdobGlnaHRCbG9jayk7XG4gIGFkZElubGluZUhpZ2hsaWdodChwcmVFbGVtLCBlbGVtLmRhdGFzZXQuaGlnaGxpZ2h0SW5saW5lKTtcblxuICB2YXIgaXNKUyA9IHByZUVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdsYW5ndWFnZS1qYXZhc2NyaXB0Jyk7XG4gIHZhciBpc0hUTUwgPSBwcmVFbGVtLmNsYXNzTGlzdC5jb250YWlucygnbGFuZ3VhZ2UtbWFya3VwJyk7XG4gIHZhciBpc1RydXN0ZWQgPSBlbGVtLmRhdGFzZXQudHJ1c3RlZDtcbiAgdmFyIGpzRnJhbWU7XG4gIHZhciBodG1sUmVzdWx0O1xuICB2YXIgaXNGaXJzdFJ1biA9IHRydWU7XG5cbiAgaWYgKCFpc0pTICYmICFpc0hUTUwpIHJldHVybjtcblxuICB2YXIgcnVuRWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtYWN0aW9uPVwicnVuXCJdJyk7XG4gIGlmIChydW5FbGVtKSB7XG4gICAgcnVuRWxlbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJsdXIoKTtcbiAgICAgIHJ1bigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cblxuICB2YXIgZWRpdEVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGlvbj1cImVkaXRcIl0nKTtcbiAgaWYgKGVkaXRFbGVtKSB7XG4gICAgZWRpdEVsZW0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICBlZGl0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIC8vIHNvbWUgY29kZSBjYW4ndCBiZSBleGVjdXRlZCBieSBlcHViIGVuZ2luZVxuICBpZiAoZWxlbS5kYXRhc2V0LmF1dG9ydW4gIT09IHVuZGVmaW5lZCkge1xuICAgIGlmKHdpbmRvdy5lYm9va0Zvcm1hdCA9PSAnZXB1YicgJiYgZWxlbS5kYXRhc2V0LmF1dG9ydW4gPT0gJ25vLWVwdWInKSB7XG4gICAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aW1lb3V0IHNob3VsZCBiZSBzbWFsbCwgYXJvdW5kIDEwbXMsIG9yIHJlbW92ZSBpdCB0byBtYWtlIGNyYXdsZXIgcHJvY2VzcyB0aGUgYXV0b3J1blxuICAgICAgc2V0VGltZW91dChydW4sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc3RKU0ZyYW1lKCkge1xuICAgIHZhciB3aW4gPSBqc0ZyYW1lWzBdLmNvbnRlbnRXaW5kb3c7XG4gICAgaWYgKHR5cGVvZiB3aW4ucG9zdE1lc3NhZ2UgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYWxlcnQoXCLQmNC30LLQuNC90LjRgtC1LCDQt9Cw0L/Rg9GB0Log0LrQvtC00LAg0YLRgNC10LHRg9C10YIg0LHQvtC70LXQtSDRgdC+0LLRgNC10LzQtdC90L3Ri9C5INCx0YDQsNGD0LfQtdGAXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW4ucG9zdE1lc3NhZ2UoY29kZSwgJ2h0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9zaG93anMnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkhUTUwoKSB7XG5cbiAgICB2YXIgZnJhbWU7XG5cbiAgICBpZiAoaHRtbFJlc3VsdCAmJiBlbGVtLmRhdGFzZXQucmVmcmVzaCkge1xuICAgICAgaHRtbFJlc3VsdC5yZW1vdmUoKTtcbiAgICAgIGh0bWxSZXN1bHQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghaHRtbFJlc3VsdCkge1xuICAgICAgLy8gdGFrZSBmcm9tIEhUTUwgaWYgZXhpc3RzIHRoZXJlIChpbiBtYXJrdXAgd2hlbiBhdXRvcnVuIGlzIHNwZWNpZmllZClcbiAgICAgIGh0bWxSZXN1bHQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJy5jb2RlLXJlc3VsdCcpO1xuICAgIH1cblxuICAgIGlmICghaHRtbFJlc3VsdCkge1xuICAgICAgLy8gb3RoZXJ3aXNlIGNyZWF0ZSAob3IgcmVjcmVhdGUgaWYgcmVmcmVzaClcbiAgICAgIGh0bWxSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGh0bWxSZXN1bHQuY2xhc3NOYW1lID0gXCJjb2RlLXJlc3VsdCBjb2RlLWV4YW1wbGVfX3Jlc3VsdFwiO1xuXG4gICAgICBmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgZnJhbWUubmFtZSA9ICdmcmFtZS0nICsgTWF0aC5yYW5kb20oKTtcbiAgICAgIGZyYW1lLmNsYXNzTmFtZSA9ICdjb2RlLXJlc3VsdF9faWZyYW1lJztcblxuICAgICAgaWYgKGVsZW0uZGF0YXNldC5kZW1vSGVpZ2h0ID09PSBcIjBcIikge1xuICAgICAgICAvLyB0aGlzIGh0bWwgaGFzIG5vdGhpbmcgdG8gc2hvd1xuICAgICAgICBmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIGlmIChlbGVtLmRhdGFzZXQuZGVtb0hlaWdodCkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gK2VsZW0uZGF0YXNldC5kZW1vSGVpZ2h0O1xuICAgICAgICBmcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgfVxuICAgICAgaHRtbFJlc3VsdC5hcHBlbmRDaGlsZChmcmFtZSk7XG5cbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoaHRtbFJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyYW1lID0gaHRtbFJlc3VsdC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNUcnVzdGVkKSB7XG4gICAgICB2YXIgZG9jID0gZnJhbWUuY29udGVudERvY3VtZW50IHx8IGZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG5cbiAgICAgIGRvYy5vcGVuKCk7XG4gICAgICBkb2Mud3JpdGUobm9ybWFsaXplSHRtbChjb2RlKSk7XG4gICAgICBkb2MuY2xvc2UoKTtcblxuICAgICAgaWYgKGVsZW0uZGF0YXNldC5kZW1vSGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzaXplT25sb2FkLmlmcmFtZShmcmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKGlzRmlyc3RSdW4gJiYgZWxlbS5kYXRhc2V0LmF1dG9ydW4gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgaWYgKCFpc1Njcm9sbGVkSW50b1ZpZXcoaHRtbFJlc3VsdCkpIHtcbiAgICAgICAgICBodG1sUmVzdWx0LnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICBmb3JtLmVuY3R5cGUgPSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjtcbiAgICAgIGZvcm0uYWN0aW9uID0gXCJodHRwOi8vcnUubG9va2F0Y29kZS5jb20vc2hvd2h0bWxcIjtcbiAgICAgIGZvcm0udGFyZ2V0ID0gZnJhbWUubmFtZTtcblxuICAgICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgIHRleHRhcmVhLm5hbWUgPSAnY29kZSc7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IG5vcm1hbGl6ZUh0bWwoY29kZSk7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKHRleHRhcmVhKTtcblxuICAgICAgZnJhbWUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZm9ybSwgZnJhbWUubmV4dFNpYmxpbmcpO1xuICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgIGZvcm0ucmVtb3ZlKCk7XG5cbiAgICAgIGlmICghKGlzRmlyc3RSdW4gJiYgZWxlbS5kYXRhc2V0LmF1dG9ydW4gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgZnJhbWUub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzaXplT25sb2FkLmlmcmFtZShmcmFtZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpc1Njcm9sbGVkSW50b1ZpZXcoaHRtbFJlc3VsdCkpIHtcbiAgICAgICAgICAgIGh0bWxSZXN1bHQuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkpTKCkge1xuXG4gICAgaWYgKGlzVHJ1c3RlZCkge1xuXG4gICAgICB0cnkge1xuICAgICAgICAvKiBqc2hpbnQgLVcwNjEgKi9cbiAgICAgICAgd2luZG93W1wiZXZhbFwiXS5jYWxsKHdpbmRvdywgY29kZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIGFsZXJ0KFwi0J7RiNC40LHQutCwOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAoZWxlbS5kYXRhc2V0LnJlZnJlc2ggJiYganNGcmFtZSkge1xuICAgICAgICBqc0ZyYW1lLnJlbW92ZSgpO1xuICAgICAgICBqc0ZyYW1lID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFqc0ZyYW1lKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBpZnJhbWUgZm9yIGpzXG4gICAgICAgIGpzRnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAganNGcmFtZS5jbGFzc05hbWUgPSAnanMtZnJhbWUnO1xuICAgICAgICBqc0ZyYW1lLnNyYyA9ICdodHRwOi8vcnUubG9va2F0Y29kZS5jb20vc2hvd2pzJztcbiAgICAgICAganNGcmFtZS5zdHlsZS53aWR0aCA9IDA7XG4gICAgICAgIGpzRnJhbWUuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgICAganNGcmFtZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICAgIGpzRnJhbWUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcG9zdEpTRnJhbWUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChqc0ZyYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc3RKU0ZyYW1lKCk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0KCkge1xuXG4gICAgdmFyIGh0bWw7XG4gICAgaWYgKGlzSFRNTCkge1xuICAgICAgaHRtbCA9IG5vcm1hbGl6ZUh0bWwoY29kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb2RlSW5kZW50ZWQgPSBjb2RlLnJlcGxhY2UoL14vZ2ltLCAnICAgICcpO1xuICAgICAgaHRtbCA9ICc8IURPQ1RZUEUgaHRtbD5cXG48aHRtbD5cXG5cXG48Ym9keT5cXG4gIDxzY3JpcHQ+XFxuJyArIGNvZGVJbmRlbnRlZCArICdcXG4gIDwvc2NyaXB0PlxcbjwvYm9keT5cXG5cXG48L2h0bWw+JztcbiAgICB9XG5cbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLmFjdGlvbiA9IFwiaHR0cDovL3BsbmtyLmNvL2VkaXQvP3A9cHJldmlld1wiO1xuICAgIGZvcm0ubWV0aG9kID0gXCJQT1NUXCI7XG4gICAgZm9ybS50YXJnZXQgPSBcIl9ibGFua1wiO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIHZhciB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgdGV4dGFyZWEubmFtZSA9IFwiZmlsZXNbaW5kZXguaHRtbF1cIjtcbiAgICB0ZXh0YXJlYS52YWx1ZSA9IGh0bWw7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XG5cbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0Lm5hbWUgPSBcImRlc2NyaXB0aW9uXCI7XG4gICAgaW5wdXQudmFsdWUgPSBcIkZvcmsgZnJvbSBcIiArIHdpbmRvdy5sb2NhdGlvbjtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgIGZvcm0uc3VibWl0KCk7XG4gICAgZm9ybS5yZW1vdmUoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplSHRtbCgpIHtcbiAgICB2YXIgY29kZUxjID0gY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBoYXNCb2R5U3RhcnQgPSBjb2RlTGMubWF0Y2goJzxib2R5PicpO1xuICAgIHZhciBoYXNCb2R5RW5kID0gY29kZUxjLm1hdGNoKCc8L2JvZHk+Jyk7XG4gICAgdmFyIGhhc0h0bWxTdGFydCA9IGNvZGVMYy5tYXRjaCgnPGh0bWw+Jyk7XG4gICAgdmFyIGhhc0h0bWxFbmQgPSBjb2RlTGMubWF0Y2goJzwvaHRtbD4nKTtcblxuICAgIHZhciBoYXNEb2NUeXBlID0gY29kZUxjLm1hdGNoKC9eXFxzKjwhZG9jdHlwZS8pO1xuXG4gICAgaWYgKGhhc0RvY1R5cGUpIHtcbiAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBjb2RlO1xuXG4gICAgaWYgKCFoYXNIdG1sU3RhcnQpIHtcbiAgICAgIHJlc3VsdCA9ICc8aHRtbD5cXG4nICsgcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghaGFzSHRtbEVuZCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgJ1xcbjwvaHRtbD4nO1xuICAgIH1cblxuICAgIGlmICghaGFzQm9keVN0YXJ0KSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgnPGh0bWw+JywgJzxodG1sPlxcbjxoZWFkPlxcbiAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XFxuPC9oZWFkPjxib2R5PlxcbicpO1xuICAgIH1cblxuICAgIGlmICghaGFzQm9keUVuZCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJzwvaHRtbD4nLCAnXFxuPC9ib2R5PlxcbjwvaHRtbD4nKTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSAnPCFET0NUWVBFIEhUTUw+XFxuJyArIHJlc3VsdDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHJ1bigpIHtcbiAgICBpZiAoaXNKUykge1xuICAgICAgcnVuSlMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcnVuSFRNTCgpO1xuICAgIH1cbiAgICBpc0ZpcnN0UnVuID0gZmFsc2U7XG4gIH1cblxuXG59XG5cblxuZnVuY3Rpb24gYWRkQmxvY2tIaWdobGlnaHQocHJlLCBsaW5lcykge1xuXG4gIGlmICghbGluZXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcmFuZ2VzID0gbGluZXMucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcblxuICAvKmpzaGludCAtVzA4NCAqL1xuICBmb3IgKHZhciBpID0gMCwgcmFuZ2U7IHJhbmdlID0gcmFuZ2VzW2krK107KSB7XG4gICAgcmFuZ2UgPSByYW5nZS5zcGxpdCgnLScpO1xuXG4gICAgdmFyIHN0YXJ0ID0gK3JhbmdlWzBdLFxuICAgICAgICBlbmQgPSArcmFuZ2VbMV0gfHwgc3RhcnQ7XG5cblxuICAgIHZhciBtYXNrID0gJzxjb2RlIGNsYXNzPVwiYmxvY2staGlnaGxpZ2h0XCIgZGF0YS1zdGFydD1cIicgKyBzdGFydCArICdcIiBkYXRhLWVuZD1cIicgKyBlbmQgKyAnXCI+JyArXG4gICAgICBuZXcgQXJyYXkoc3RhcnQgKyAxKS5qb2luKCdcXG4nKSArXG4gICAgICAnPGNvZGUgY2xhc3M9XCJtYXNrXCI+JyArIG5ldyBBcnJheShlbmQgLSBzdGFydCArIDIpLmpvaW4oJ1xcbicpICsgJzwvY29kZT48L2NvZGU+JztcblxuICAgIHByZS5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlckJlZ2luXCIsIG1hc2spO1xuICB9XG5cbn1cblxuXG5mdW5jdGlvbiBhZGRJbmxpbmVIaWdobGlnaHQocHJlLCByYW5nZXMpIHtcblxuICAvLyBzZWxlY3QgY29kZSB3aXRoIHRoZSBsYW5ndWFnZSB0ZXh0LCBub3QgYmxvY2staGlnaGxpZ2h0ZXJcbiAgdmFyIGNvZGVFbGVtID0gcHJlLnF1ZXJ5U2VsZWN0b3IoJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdJyk7XG5cbiAgcmFuZ2VzID0gcmFuZ2VzID8gcmFuZ2VzLnNwbGl0KFwiLFwiKSA6IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBpZWNlID0gcmFuZ2VzW2ldLnNwbGl0KCc6Jyk7XG4gICAgdmFyIGxpbmVOdW0gPSArcGllY2VbMF0sIHN0clJhbmdlID0gcGllY2VbMV0uc3BsaXQoJy0nKTtcbiAgICB2YXIgc3RhcnQgPSArc3RyUmFuZ2VbMF0sIGVuZCA9ICtzdHJSYW5nZVsxXTtcbiAgICB2YXIgbWFzayA9ICc8Y29kZSBjbGFzcz1cImlubGluZS1oaWdobGlnaHRcIj4nICtcbiAgICAgIG5ldyBBcnJheShsaW5lTnVtICsgMSkuam9pbignXFxuJykgK1xuICAgICAgbmV3IEFycmF5KHN0YXJ0ICsgMSkuam9pbignICcpICtcbiAgICAgICc8Y29kZSBjbGFzcz1cIm1hc2tcIj4nICsgbmV3IEFycmF5KGVuZCAtIHN0YXJ0ICsgMSkuam9pbignICcpICsgJzwvY29kZT48L2NvZGU+JztcblxuICAgIGNvZGVFbGVtLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyQmVnaW5cIiwgbWFzayk7XG4gIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENvZGVCb3g7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wcmlzbS9jb2RlQm94LmpzXG4gKiovIiwidmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG52YXIgYWRkTGluZU51bWJlcnMgPSByZXF1aXJlKCcuL2FkZExpbmVOdW1iZXJzJyk7XG5cbmZ1bmN0aW9uIENvZGVUYWJzQm94KGVsZW0pIHtcbiAgaWYgKHdpbmRvdy5pc0Vib29rKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lbGVtID0gZWxlbTtcbiAgdGhpcy50cmFuc2xhdGVYID0gMDtcblxuICB0aGlzLnN3aXRjaGVzRWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29kZS10YWJzLXN3aXRjaGVzXScpO1xuICB0aGlzLnN3aXRjaGVzRWxlbUl0ZW1zID0gdGhpcy5zd2l0Y2hlc0VsZW0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHRoaXMuYXJyb3dMZWZ0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtbGVmdF0nKTtcbiAgdGhpcy5hcnJvd1JpZ2h0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtcmlnaHRdJyk7XG5cblxuICB0aGlzLmFycm93TGVmdC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMudHJhbnNsYXRlWCA9IE1hdGgubWF4KDAsIHRoaXMudHJhbnNsYXRlWCAtIHRoaXMuc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLnJlbmRlclRyYW5zbGF0ZSgpO1xuICB9LmJpbmQodGhpcyk7XG5cblxuICB0aGlzLmFycm93UmlnaHQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZVggPSBNYXRoLm1pbih0aGlzLnRyYW5zbGF0ZVggK3RoaXMuc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoLCB0aGlzLnN3aXRjaGVzRWxlbUl0ZW1zLm9mZnNldFdpZHRoIC0gdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNsYXRlKCk7XG4gIH0uYmluZCh0aGlzKTtcblxuICB0aGlzLmRlbGVnYXRlKCcuY29kZS10YWJzX19zd2l0Y2gnLCAnY2xpY2snLCB0aGlzLm9uU3dpdGNoQ2xpY2spO1xufVxuXG5Db2RlVGFic0JveC5wcm90b3R5cGUub25Td2l0Y2hDbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHZhciBzaWJsaW5ncyA9IGUuZGVsZWdhdGVUYXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbjtcbiAgdmFyIHRhYnMgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29kZS10YWJzLWNvbnRlbnRdJykuY2hpbGRyZW47XG5cblxuICB2YXIgc2VsZWN0ZWRJbmRleDtcbiAgZm9yKHZhciBpPTA7IGk8c2libGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3dpdGNoRWxlbSA9IHNpYmxpbmdzW2ldO1xuICAgIHZhciB0YWJFbGVtID0gdGFic1tpXTtcbiAgICBpZiAoc3dpdGNoRWxlbSA9PSBlLmRlbGVnYXRlVGFyZ2V0KSB7XG4gICAgICBzZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgIHRhYkVsZW0uY2xhc3NMaXN0LmFkZCgnY29kZS10YWJzX19zZWN0aW9uX2N1cnJlbnQnKTtcbiAgICAgIHN3aXRjaEVsZW0uY2xhc3NMaXN0LmFkZCgnY29kZS10YWJzX19zd2l0Y2hfY3VycmVudCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YWJFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvZGUtdGFic19fc2VjdGlvbl9jdXJyZW50Jyk7XG4gICAgICBzd2l0Y2hFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvZGUtdGFic19fc3dpdGNoX2N1cnJlbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfcmVzdWx0X29uJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvZGUtdGFic19yZXN1bHRfb24nKTtcblxuICAgIHRoaXMuaGlnaGxpZ2h0VGFiKHRhYnNbc2VsZWN0ZWRJbmRleF0pO1xuICB9XG5cbn07XG5cblxuQ29kZVRhYnNCb3gucHJvdG90eXBlLmhpZ2hsaWdodFRhYiA9IGZ1bmN0aW9uKHRhYikge1xuICBpZiAodGFiLmhpZ2hsaWdodGVkKSByZXR1cm47XG4gIHZhciBwcmVFbGVtID0gdGFiLnF1ZXJ5U2VsZWN0b3IoJ3ByZScpO1xuICB2YXIgY29kZUVsZW0gPSBwcmVFbGVtLnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcbiAgUHJpc20uaGlnaGxpZ2h0RWxlbWVudChjb2RlRWxlbSk7XG4gIGFkZExpbmVOdW1iZXJzKHByZUVsZW0pO1xuICB0YWIuaGlnaGxpZ2h0ZWQgPSB0cnVlO1xufTtcblxuQ29kZVRhYnNCb3gucHJvdG90eXBlLnJlbmRlclRyYW5zbGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN3aXRjaGVzRWxlbUl0ZW1zLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKC0nICsgdGhpcy50cmFuc2xhdGVYICsgJ3B4KSc7XG4gIGlmICh0aGlzLnRyYW5zbGF0ZVggPT09IDApIHtcbiAgICB0aGlzLmFycm93TGVmdC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXJyb3dMZWZ0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG4gIGlmICh0aGlzLnRyYW5zbGF0ZVggPT09IHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMub2Zmc2V0V2lkdGggLSB0aGlzLnN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCkge1xuICAgIHRoaXMuYXJyb3dSaWdodC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXJyb3dSaWdodC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxufTtcblxuXG5kZWxlZ2F0ZS5kZWxlZ2F0ZU1peGluKENvZGVUYWJzQm94LnByb3RvdHlwZSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlVGFic0JveDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2NvZGVUYWJzQm94LmpzXG4gKiovIiwic2VsZiA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcblx0PyB3aW5kb3cgICAvLyBpZiBpbiBicm93c2VyXG5cdDogKFxuXHRcdCh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSlcblx0XHQ/IHNlbGYgLy8gaWYgaW4gd29ya2VyXG5cdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKiBNSVQgbGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocC9cbiAqIEBhdXRob3IgTGVhIFZlcm91IGh0dHA6Ly9sZWEudmVyb3UubWVcbiAqL1xuXG52YXIgUHJpc20gPSAoZnVuY3Rpb24oKXtcblxuLy8gUHJpdmF0ZSBoZWxwZXIgdmFyc1xudmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oPyFcXCopKFxcdyspXFxiL2k7XG5cbnZhciBfID0gc2VsZi5QcmlzbSA9IHtcblx0dXRpbDoge1xuXHRcdGVuY29kZTogZnVuY3Rpb24gKHRva2Vucykge1xuXHRcdFx0aWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIF8udXRpbC5lbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0fSBlbHNlIGlmIChfLnV0aWwudHlwZSh0b2tlbnMpID09PSAnQXJyYXknKSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKF8udXRpbC5lbmNvZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLm1hdGNoKC9cXFtvYmplY3QgKFxcdyspXFxdLylbMV07XG5cdFx0fSxcblxuXHRcdC8vIERlZXAgY2xvbmUgYSBsYW5ndWFnZSBkZWZpbml0aW9uIChlLmcuIHRvIGV4dGVuZCBpdClcblx0XHRjbG9uZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHZhciB0eXBlID0gXy51dGlsLnR5cGUobyk7XG5cblx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0XHRcdHZhciBjbG9uZSA9IHt9O1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVba2V5XSA9IF8udXRpbC5jbG9uZShvW2tleV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBjbG9uZTtcblxuXHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0cmV0dXJuIG8uc2xpY2UoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHR9LFxuXG5cdGxhbmd1YWdlczoge1xuXHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHJlZGVmKSB7XG5cdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBsYW5nO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBJbnNlcnQgYSB0b2tlbiBiZWZvcmUgYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGxpdGVyYWxcblx0XHQgKiBBcyB0aGlzIG5lZWRzIHRvIHJlY3JlYXRlIHRoZSBvYmplY3QgKHdlIGNhbm5vdCBhY3R1YWxseSBpbnNlcnQgYmVmb3JlIGtleXMgaW4gb2JqZWN0IGxpdGVyYWxzKSxcblx0XHQgKiB3ZSBjYW5ub3QganVzdCBwcm92aWRlIGFuIG9iamVjdCwgd2UgbmVlZCBhbm9iamVjdCBhbmQgYSBrZXkuXG5cdFx0ICogQHBhcmFtIGluc2lkZSBUaGUga2V5IChvciBsYW5ndWFnZSBpZCkgb2YgdGhlIHBhcmVudFxuXHRcdCAqIEBwYXJhbSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLiBJZiBub3QgcHJvdmlkZWQsIHRoZSBmdW5jdGlvbiBhcHBlbmRzIGluc3RlYWQuXG5cdFx0ICogQHBhcmFtIGluc2VydCBPYmplY3Qgd2l0aCB0aGUga2V5L3ZhbHVlIHBhaXJzIHRvIGluc2VydFxuXHRcdCAqIEBwYXJhbSByb290IFRoZSBvYmplY3QgdGhhdCBjb250YWlucyBgaW5zaWRlYC4gSWYgZXF1YWwgdG8gUHJpc20ubGFuZ3VhZ2VzLCBpdCBjYW4gYmUgb21pdHRlZC5cblx0XHQgKi9cblx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChpbnNpZGUsIGJlZm9yZSwgaW5zZXJ0LCByb290KSB7XG5cdFx0XHRyb290ID0gcm9vdCB8fCBfLmxhbmd1YWdlcztcblx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRcdGluc2VydCA9IGFyZ3VtZW50c1sxXTtcblx0XHRcdFx0XG5cdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRncmFtbWFyW25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gZ3JhbW1hcjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cblx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRpZiAodG9rZW4gPT0gYmVmb3JlKSB7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIG5ld1Rva2VuIGluIGluc2VydCkge1xuXG5cdFx0XHRcdFx0XHRcdGlmIChpbnNlcnQuaGFzT3duUHJvcGVydHkobmV3VG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IHJvb3RbaW5zaWRlXSAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0dGhpc1trZXldID0gcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHJvb3RbaW5zaWRlXSA9IHJldDtcblx0XHR9LFxuXG5cdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0REZTOiBmdW5jdGlvbihvLCBjYWxsYmFjaywgdHlwZSkge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0aWYgKF8udXRpbC50eXBlKG9baV0pID09PSAnT2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKG9baV0sIGNhbGxiYWNrKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoXy51dGlsLnR5cGUob1tpXSkgPT09ICdBcnJheScpIHtcblx0XHRcdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhvW2ldLCBjYWxsYmFjaywgaSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24oYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnKTtcblxuXHRcdGZvciAodmFyIGk9MCwgZWxlbWVudDsgZWxlbWVudCA9IGVsZW1lbnRzW2krK107KSB7XG5cdFx0XHRfLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCwgYXN5bmMgPT09IHRydWUsIGNhbGxiYWNrKTtcblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0Ly8gRmluZCBsYW5ndWFnZVxuXHRcdHZhciBsYW5ndWFnZSwgZ3JhbW1hciwgcGFyZW50ID0gZWxlbWVudDtcblxuXHRcdHdoaWxlIChwYXJlbnQgJiYgIWxhbmcudGVzdChwYXJlbnQuY2xhc3NOYW1lKSkge1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0aWYgKHBhcmVudCkge1xuXHRcdFx0bGFuZ3VhZ2UgPSAocGFyZW50LmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbLCcnXSlbMV07XG5cdFx0XHRncmFtbWFyID0gXy5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXHRcdH1cblxuXHRcdGlmICghZ3JhbW1hcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgZWxlbWVudCwgaWYgbm90IHByZXNlbnRcblx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0cGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG5cdFx0aWYgKC9wcmUvaS50ZXN0KHBhcmVudC5ub2RlTmFtZSkpIHtcblx0XHRcdHBhcmVudC5jbGFzc05hbWUgPSBwYXJlbnQuY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXHRcdH1cblxuXHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdGlmKCFjb2RlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdGVsZW1lbnQ6IGVsZW1lbnQsXG5cdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0Y29kZTogY29kZVxuXHRcdH07XG5cblx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRpZiAoYXN5bmMgJiYgc2VsZi5Xb3JrZXIpIHtcblx0XHRcdHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKF8uZmlsZW5hbWUpO1xuXG5cdFx0XHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBUb2tlbi5zdHJpbmdpZnkoSlNPTi5wYXJzZShldnQuZGF0YSksIGxhbmd1YWdlKTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVudi5lbGVtZW50KTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHR9O1xuXG5cdFx0XHR3b3JrZXIucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRsYW5ndWFnZTogZW52Lmxhbmd1YWdlLFxuXHRcdFx0XHRjb2RlOiBlbnYuY29kZVxuXHRcdFx0fSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSlcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgdG9rZW5zID0gXy50b2tlbml6ZSh0ZXh0LCBncmFtbWFyKTtcblx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUodG9rZW5zKSwgbGFuZ3VhZ2UpO1xuXHR9LFxuXG5cdHRva2VuaXplOiBmdW5jdGlvbih0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdHZhciBUb2tlbiA9IF8uVG9rZW47XG5cblx0XHR2YXIgc3RyYXJyID0gW3RleHRdO1xuXG5cdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cblx0XHRpZiAocmVzdCkge1xuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRncmFtbWFyW3Rva2VuXSA9IHJlc3RbdG9rZW5dO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdH1cblxuXHRcdHRva2VubG9vcDogZm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRwYXR0ZXJucyA9IChfLnV0aWwudHlwZShwYXR0ZXJucykgPT09IFwiQXJyYXlcIikgPyBwYXR0ZXJucyA6IFtwYXR0ZXJuc107XG5cblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuc1tqXSxcblx0XHRcdFx0XHRpbnNpZGUgPSBwYXR0ZXJuLmluc2lkZSxcblx0XHRcdFx0XHRsb29rYmVoaW5kID0gISFwYXR0ZXJuLmxvb2tiZWhpbmQsXG5cdFx0XHRcdFx0bG9va2JlaGluZExlbmd0aCA9IDAsXG5cdFx0XHRcdFx0YWxpYXMgPSBwYXR0ZXJuLmFsaWFzO1xuXG5cdFx0XHRcdHBhdHRlcm4gPSBwYXR0ZXJuLnBhdHRlcm4gfHwgcGF0dGVybjtcblxuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGk8c3RyYXJyLmxlbmd0aDsgaSsrKSB7IC8vIERvbuKAmXQgY2FjaGUgbGVuZ3RoIGFzIGl0IGNoYW5nZXMgZHVyaW5nIHRoZSBsb29wXG5cblx0XHRcdFx0XHR2YXIgc3RyID0gc3RyYXJyW2ldO1xuXG5cdFx0XHRcdFx0aWYgKHN0cmFyci5sZW5ndGggPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Ly8gU29tZXRoaW5nIHdlbnQgdGVycmlibHkgd3JvbmcsIEFCT1JULCBBQk9SVCFcblx0XHRcdFx0XHRcdGJyZWFrIHRva2VubG9vcDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoc3RyIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHBhdHRlcm4ubGFzdEluZGV4ID0gMDtcblxuXHRcdFx0XHRcdHZhciBtYXRjaCA9IHBhdHRlcm4uZXhlYyhzdHIpO1xuXG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHRpZihsb29rYmVoaW5kKSB7XG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmcm9tID0gbWF0Y2guaW5kZXggLSAxICsgbG9va2JlaGluZExlbmd0aCxcblx0XHRcdFx0XHRcdFx0bWF0Y2ggPSBtYXRjaFswXS5zbGljZShsb29rYmVoaW5kTGVuZ3RoKSxcblx0XHRcdFx0XHRcdFx0bGVuID0gbWF0Y2gubGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHR0byA9IGZyb20gKyBsZW4sXG5cdFx0XHRcdFx0XHRcdGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tICsgMSksXG5cdFx0XHRcdFx0XHRcdGFmdGVyID0gc3RyLnNsaWNlKHRvICsgMSk7XG5cblx0XHRcdFx0XHRcdHZhciBhcmdzID0gW2ksIDFdO1xuXG5cdFx0XHRcdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3MucHVzaChiZWZvcmUpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlPyBfLnRva2VuaXplKG1hdGNoLCBpbnNpZGUpIDogbWF0Y2gsIGFsaWFzKTtcblxuXHRcdFx0XHRcdFx0YXJncy5wdXNoKHdyYXBwZWQpO1xuXG5cdFx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdFx0YXJncy5wdXNoKGFmdGVyKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShzdHJhcnIsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBzdHJhcnI7XG5cdH0sXG5cblx0aG9va3M6IHtcblx0XHRhbGw6IHt9LFxuXG5cdFx0YWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRob29rc1tuYW1lXS5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0cnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG5cdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaT0wLCBjYWxsYmFjazsgY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXTspIHtcblx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbnZhciBUb2tlbiA9IF8uVG9rZW4gPSBmdW5jdGlvbih0eXBlLCBjb250ZW50LCBhbGlhcykge1xuXHR0aGlzLnR5cGUgPSB0eXBlO1xuXHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHR0aGlzLmFsaWFzID0gYWxpYXM7XG59O1xuXG5Ub2tlbi5zdHJpbmdpZnkgPSBmdW5jdGlvbihvLCBsYW5ndWFnZSwgcGFyZW50KSB7XG5cdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBvO1xuXHR9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG5cdFx0cmV0dXJuIG8ubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoZWxlbWVudCwgbGFuZ3VhZ2UsIG8pO1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0dmFyIGVudiA9IHtcblx0XHR0eXBlOiBvLnR5cGUsXG5cdFx0Y29udGVudDogVG9rZW4uc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UsIHBhcmVudCksXG5cdFx0dGFnOiBQcmlzbS50b2tlblRhZyB8fCAnc3BhbicsXG5cdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0YXR0cmlidXRlczoge30sXG5cdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdHBhcmVudDogcGFyZW50XG5cdH07XG5cblx0aWYgKGVudi50eXBlID09ICdjb21tZW50Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWydzcGVsbGNoZWNrJ10gPSAndHJ1ZSc7XG5cdH1cblxuXHRpZiAoby5hbGlhcykge1xuXHRcdHZhciBhbGlhc2VzID0gXy51dGlsLnR5cGUoby5hbGlhcykgPT09ICdBcnJheScgPyBvLmFsaWFzIDogW28uYWxpYXNdO1xuXHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0fVxuXG5cdF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcblxuXHR2YXIgYXR0cmlidXRlcyA9ICcnO1xuXG5cdGZvciAodmFyIG5hbWUgaW4gZW52LmF0dHJpYnV0ZXMpIHtcblx0XHRhdHRyaWJ1dGVzICs9IG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykgKyAnXCInO1xuXHR9XG5cblx0cmV0dXJuICc8JyArIGVudi50YWcgKyAnIGNsYXNzPVwiJyArIGVudi5jbGFzc2VzLmpvaW4oJyAnKSArICdcIiAnICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cbn07XG5cbmlmICghc2VsZi5kb2N1bWVudCkge1xuXHRpZiAoIXNlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdC8vIGluIE5vZGUuanNcblx0XHRyZXR1cm4gc2VsZi5QcmlzbTtcblx0fVxuIFx0Ly8gSW4gd29ya2VyXG5cdHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGV2dCkge1xuXHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSksXG5cdFx0ICAgIGxhbmcgPSBtZXNzYWdlLmxhbmd1YWdlLFxuXHRcdCAgICBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXG5cdFx0c2VsZi5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeShfLnV0aWwuZW5jb2RlKF8udG9rZW5pemUoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10pKSkpO1xuXHRcdHNlbGYuY2xvc2UoKTtcblx0fSwgZmFsc2UpO1xuXG5cdHJldHVybiBzZWxmLlByaXNtO1xufVxuXG4vLyBHZXQgY3VycmVudCBzY3JpcHQgYW5kIGhpZ2hsaWdodFxudmFyIHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblxuc2NyaXB0ID0gc2NyaXB0W3NjcmlwdC5sZW5ndGggLSAxXTtcblxuaWYgKHNjcmlwdCkge1xuXHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAmJiAhc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBfLmhpZ2hsaWdodEFsbCk7XG5cdH1cbn1cblxucmV0dXJuIHNlbGYuUHJpc207XG5cbn0pKCk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMubWFya3VwID0ge1xuXHQnY29tbWVudCc6IC88IS0tW1xcd1xcV10qPy0tPi9nLFxuXHQncHJvbG9nJzogLzxcXD8uKz9cXD8+Lyxcblx0J2RvY3R5cGUnOiAvPCFET0NUWVBFLis/Pi8sXG5cdCdjZGF0YSc6IC88IVxcW0NEQVRBXFxbW1xcd1xcV10qP11dPi9pLFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvP1tcXHc6LV0rXFxzKig/OlxccytbXFx3Oi1dKyg/Oj0oPzooXCJ8JykoXFxcXD9bXFx3XFxXXSkqP1xcMXxbXlxccydcIj49XSspKT9cXHMqKSpcXC8/Pi9naSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXFx3Oi1dKy9pLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXjxcXC8/Lyxcblx0XHRcdFx0XHQnbmFtZXNwYWNlJzogL15bXFx3LV0rPzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz0oPzooJ3xcIilbXFx3XFxXXSo/KFxcMSl8W15cXHM+XSspL2dpLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvPXw+fFwiL2dcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9cXC8/Pi9nLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1tcXHc6LV0rL2csXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXltcXHctXSs/Oi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogL1xcJiM/W1xcZGEtel17MSw4fTsvZ2lcbn07XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbihlbnYpIHtcblxuXHRpZiAoZW52LnR5cGUgPT09ICdlbnRpdHknKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3RpdGxlJ10gPSBlbnYuY29udGVudC5yZXBsYWNlKC8mYW1wOy8sICcmJyk7XG5cdH1cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5jc3MgPSB7XG5cdCdjb21tZW50JzogL1xcL1xcKltcXHdcXFddKj9cXCpcXC8vZyxcblx0J2F0cnVsZSc6IHtcblx0XHRwYXR0ZXJuOiAvQFtcXHctXSs/Lio/KDt8KD89XFxzKnspKS9naSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bOzpdL2dcblx0XHR9XG5cdH0sXG5cdCd1cmwnOiAvdXJsXFwoKFtcIiddPykuKj9cXDFcXCkvZ2ksXG5cdCdzZWxlY3Rvcic6IC9bXlxce1xcfVxcc11bXlxce1xcfTtdKig/PVxccypcXHspL2csXG5cdCdwcm9wZXJ0eSc6IC8oXFxifFxcQilbXFx3LV0rKD89XFxzKjopL2lnLFxuXHQnc3RyaW5nJzogLyhcInwnKShcXFxcPy4pKj9cXDEvZyxcblx0J2ltcG9ydGFudCc6IC9cXEIhaW1wb3J0YW50XFxiL2dpLFxuXHQncHVuY3R1YXRpb24nOiAvW1xce1xcfTs6XS9nLFxuXHQnZnVuY3Rpb24nOiAvWy1hLXowLTldKyg/PVxcKCkvaWdcbn07XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICd0YWcnLCB7XG5cdFx0J3N0eWxlJzoge1xuXHRcdFx0cGF0dGVybjogLzxzdHlsZVtcXHdcXFddKj8+W1xcd1xcV10qPzxcXC9zdHlsZT4vaWcsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvPHN0eWxlW1xcd1xcV10qPz58PFxcL3N0eWxlPi9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHR9LFxuXHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1jc3MnXG5cdFx0fVxuXHR9KTtcblx0XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuXHRcdCdzdHlsZS1hdHRyJzoge1xuXHRcdFx0cGF0dGVybjogL1xccypzdHlsZT0oXCJ8JykuKz9cXDEvaWcsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxccypzdHlsZS9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXlxccyo9XFxzKlsnXCJdfFsnXCJdXFxzKiQvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvLisvZ2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0sIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNzcy5zZWxlY3RvciA9IHtcblx0cGF0dGVybjogL1teXFx7XFx9XFxzXVteXFx7XFx9XSooPz1cXHMqXFx7KS9nLFxuXHRpbnNpZGU6IHtcblx0XHQncHNldWRvLWVsZW1lbnQnOiAvOig/OmFmdGVyfGJlZm9yZXxmaXJzdC1sZXR0ZXJ8Zmlyc3QtbGluZXxzZWxlY3Rpb24pfDo6Wy1cXHddKy9nLFxuXHRcdCdwc2V1ZG8tY2xhc3MnOiAvOlstXFx3XSsoPzpcXCguKlxcKSk/L2csXG5cdFx0J2NsYXNzJzogL1xcLlstOlxcLlxcd10rL2csXG5cdFx0J2lkJzogLyNbLTpcXC5cXHddKy9nXG5cdH1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NzcycsICdmdW5jdGlvbicsIHtcblx0J2hleGNvZGUnOiAvI1tcXGRhLWZdezMsNn0vZ2ksXG5cdCdlbnRpdHknOiAvXFxcXFtcXGRhLWZdezEsOH0vZ2ksXG5cdCdudW1iZXInOiAvW1xcZCVcXC5dKy9nXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLWV4dHJhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5jbGlrZSA9IHtcblx0J2NvbW1lbnQnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwqW1xcd1xcV10qP1xcKlxcLy9nLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qPyhcXHI/XFxufCQpL2csXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQnc3RyaW5nJzogLyhcInwnKShcXFxcPy4pKj9cXDEvZyxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLygoPzooPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfHRyYWl0fGluc3RhbmNlb2Z8bmV3KVxccyspfCg/OmNhdGNoXFxzK1xcKCkpW2EtejAtOV9cXC5cXFxcXSsvaWcsXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdHB1bmN0dWF0aW9uOiAvKFxcLnxcXFxcKS9cblx0XHR9XG5cdH0sXG5cdCdrZXl3b3JkJzogL1xcYihpZnxlbHNlfHdoaWxlfGRvfGZvcnxyZXR1cm58aW58aW5zdGFuY2VvZnxmdW5jdGlvbnxuZXd8dHJ5fHRocm93fGNhdGNofGZpbmFsbHl8bnVsbHxicmVha3xjb250aW51ZSlcXGIvZyxcblx0J2Jvb2xlYW4nOiAvXFxiKHRydWV8ZmFsc2UpXFxiL2csXG5cdCdmdW5jdGlvbic6IHtcblx0XHRwYXR0ZXJuOiAvW2EtejAtOV9dK1xcKC9pZyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdHB1bmN0dWF0aW9uOiAvXFwoL1xuXHRcdH1cblx0fSxcblx0J251bWJlcic6IC9cXGItPygweFtcXGRBLUZhLWZdK3xcXGQqXFwuP1xcZCsoW0VlXS0/XFxkKyk/KVxcYi9nLFxuXHQnb3BlcmF0b3InOiAvWy0rXXsxLDJ9fCF8PD0/fD49P3w9ezEsM318JnsxLDJ9fFxcfD9cXHx8XFw/fFxcKnxcXC98XFx+fFxcXnxcXCUvZyxcblx0J2lnbm9yZSc6IC8mKGx0fGd0fGFtcCk7L2dpLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vZ1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYihicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRydWV8dHJ5fHR5cGVvZnx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi9nLFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4W1xcZEEtRmEtZl0rfFxcZCpcXC4/XFxkKyhbRWVdWystXT9cXGQrKT98TmFOfC0/SW5maW5pdHkpXFxiL2csXG5cdCdmdW5jdGlvbic6IC8oPyFcXGQpW2EtejAtOV8kXSsoPz1cXCgpL2lnXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogLyhefFteL10pXFwvKD8hXFwvKShcXFsuKz9dfFxcXFwufFteL1xcclxcbl0pK1xcL1tnaW1dezAsM30oPz1cXHMqKCR8W1xcclxcbiwuO30pXSkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ3RhZycsIHtcblx0XHQnc2NyaXB0Jzoge1xuXHRcdFx0cGF0dGVybjogLzxzY3JpcHRbXFx3XFxXXSo/PltcXHdcXFddKj88XFwvc2NyaXB0Pi9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQndGFnJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC88c2NyaXB0W1xcd1xcV10qPz58PFxcL3NjcmlwdD4vaWcsXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWphdmFzY3JpcHQnXG5cdFx0fVxuXHR9KTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiKGZ1bmN0aW9uKFByaXNtKSB7XG5cbi8vIElnbm9yZSBjb21tZW50cyBzdGFydGluZyB3aXRoIHsgdG8gcHJpdmlsZWdlIHN0cmluZyBpbnRlcnBvbGF0aW9uIGhpZ2hsaWdodGluZ1xudmFyIGNvbW1lbnQgPSAvIyg/IVxceykuKy9nLFxuICAgIGludGVycG9sYXRpb24gPSB7XG4gICAgXHRwYXR0ZXJuOiAvI1xce1tefV0rXFx9L2csXG4gICAgXHRhbGlhczogJ3ZhcmlhYmxlJ1xuICAgIH07XG5cblByaXNtLmxhbmd1YWdlcy5jb2ZmZWVzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdqYXZhc2NyaXB0Jywge1xuXHQnY29tbWVudCc6IGNvbW1lbnQsXG5cdCdzdHJpbmcnOiBbXG5cblx0XHQvLyBTdHJpbmdzIGFyZSBtdWx0aWxpbmVcblx0XHQvJyg/OlxcXFw/W1xcc1xcU10pKj8nL2csXG5cblx0XHR7XG5cdFx0XHQvLyBTdHJpbmdzIGFyZSBtdWx0aWxpbmVcblx0XHRcdHBhdHRlcm46IC9cIig/OlxcXFw/W1xcc1xcU10pKj9cIi9nLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvblxuXHRcdFx0fVxuXHRcdH1cblx0XSxcblx0J2tleXdvcmQnOiAvXFxiKGFuZHxicmVha3xieXxjYXRjaHxjbGFzc3xjb250aW51ZXxkZWJ1Z2dlcnxkZWxldGV8ZG98ZWFjaHxlbHNlfGV4dGVuZHxleHRlbmRzfGZhbHNlfGZpbmFsbHl8Zm9yfGlmfGlufGluc3RhbmNlb2Z8aXN8aXNudHxsZXR8bG9vcHxuYW1lc3BhY2V8bmV3fG5vfG5vdHxudWxsfG9mfG9mZnxvbnxvcnxvd258cmV0dXJufHN1cGVyfHN3aXRjaHx0aGVufHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHVuZGVmaW5lZHx1bmxlc3N8dW50aWx8d2hlbnx3aGlsZXx3aW5kb3d8d2l0aHx5ZXN8eWllbGQpXFxiL2csXG5cdCdjbGFzcy1tZW1iZXInOiB7XG5cdFx0cGF0dGVybjogL0AoPyFcXGQpXFx3Ky8sXG5cdFx0YWxpYXM6ICd2YXJpYWJsZSdcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdjb21tZW50Jywge1xuXHQnbXVsdGlsaW5lLWNvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyMjI1tcXHNcXFNdKz8jIyMvZyxcblx0XHRhbGlhczogJ2NvbW1lbnQnXG5cdH0sXG5cblx0Ly8gQmxvY2sgcmVnZXhwIGNhbiBjb250YWluIGNvbW1lbnRzIGFuZCBpbnRlcnBvbGF0aW9uXG5cdCdibG9jay1yZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvXFwvezN9W1xcc1xcU10qP1xcL3szfS8sXG5cdFx0YWxpYXM6ICdyZWdleCcsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnY29tbWVudCc6IGNvbW1lbnQsXG5cdFx0XHQnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb25cblx0XHR9XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjb2ZmZWVzY3JpcHQnLCAnc3RyaW5nJywge1xuXHQnaW5saW5lLWphdmFzY3JpcHQnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcP1tcXHNcXFNdKSo/YC9nLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2RlbGltaXRlcic6IHtcblx0XHRcdFx0cGF0dGVybjogL15gfGAkL2csXG5cdFx0XHRcdGFsaWFzOiAncHVuY3R1YXRpb24nXG5cdFx0XHR9LFxuXHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9XG5cdH0sXG5cblx0Ly8gQmxvY2sgc3RyaW5nc1xuXHQnbXVsdGlsaW5lLXN0cmluZyc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvJycnW1xcc1xcU10qPycnJy8sXG5cdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC9cIlwiXCJbXFxzXFxTXSo/XCJcIlwiLyxcblx0XHRcdGFsaWFzOiAnc3RyaW5nJyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRpbnRlcnBvbGF0aW9uOiBpbnRlcnBvbGF0aW9uXG5cdFx0XHR9XG5cdFx0fVxuXHRdXG5cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjb2ZmZWVzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0Ly8gT2JqZWN0IHByb3BlcnR5XG5cdCdwcm9wZXJ0eSc6IC8oPyFcXGQpXFx3Kyg/PVxccyo6KD8hOikpL2dcbn0pO1xuXG59KFByaXNtKSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdC5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5odHRwID0ge1xuICAgICdyZXF1ZXN0LWxpbmUnOiB7XG4gICAgICAgIHBhdHRlcm46IC9eKFBPU1R8R0VUfFBVVHxERUxFVEV8T1BUSU9OU3xQQVRDSHxUUkFDRXxDT05ORUNUKVxcYlxcc2h0dHBzPzpcXC9cXC9cXFMrXFxzSFRUUFxcL1swLTkuXSsvZyxcbiAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAvLyBIVFRQIFZlcmJcbiAgICAgICAgICAgIHByb3BlcnR5OiAvXlxcYihQT1NUfEdFVHxQVVR8REVMRVRFfE9QVElPTlN8UEFUQ0h8VFJBQ0V8Q09OTkVDVClcXGIvZyxcbiAgICAgICAgICAgIC8vIFBhdGggb3IgcXVlcnkgYXJndW1lbnRcbiAgICAgICAgICAgICdhdHRyLW5hbWUnOiAvOlxcdysvZ1xuICAgICAgICB9XG4gICAgfSxcbiAgICAncmVzcG9uc2Utc3RhdHVzJzoge1xuICAgICAgICBwYXR0ZXJuOiAvXkhUVFBcXC8xLlswMV0gWzAtOV0rLiovZyxcbiAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAvLyBTdGF0dXMsIGUuZy4gMjAwIE9LXG4gICAgICAgICAgICBwcm9wZXJ0eTogL1swLTldK1tBLVpcXHMtXSskL2lnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIEhUVFAgaGVhZGVyIG5hbWVcbiAgICBrZXl3b3JkOiAvXltcXHctXSs6KD89LispL2dtXG59O1xuXG4vLyBDcmVhdGUgYSBtYXBwaW5nIG9mIENvbnRlbnQtVHlwZSBoZWFkZXJzIHRvIGxhbmd1YWdlIGRlZmluaXRpb25zXG52YXIgaHR0cExhbmd1YWdlcyA9IHtcbiAgICAnYXBwbGljYXRpb24vanNvbic6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0LFxuICAgICdhcHBsaWNhdGlvbi94bWwnOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLFxuICAgICd0ZXh0L3htbCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAsXG4gICAgJ3RleHQvaHRtbCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXBcbn07XG5cbi8vIEluc2VydCBlYWNoIGNvbnRlbnQgdHlwZSBwYXJzZXIgdGhhdCBoYXMgaXRzIGFzc29jaWF0ZWQgbGFuZ3VhZ2Vcbi8vIGN1cnJlbnRseSBsb2FkZWQuXG5mb3IgKHZhciBjb250ZW50VHlwZSBpbiBodHRwTGFuZ3VhZ2VzKSB7XG4gICAgaWYgKGh0dHBMYW5ndWFnZXNbY29udGVudFR5cGVdKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgIG9wdGlvbnNbY29udGVudFR5cGVdID0ge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnKGNvbnRlbnQtdHlwZTpcXFxccyonICsgY29udGVudFR5cGUgKyAnW1xcXFx3XFxcXFddKj8pXFxcXG5cXFxcbltcXFxcd1xcXFxXXSonLCAnZ2knKSxcbiAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICByZXN0OiBodHRwTGFuZ3VhZ2VzW2NvbnRlbnRUeXBlXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdodHRwJywgJ2tleXdvcmQnLCBvcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taHR0cC5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5zY3NzID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY3NzJywge1xuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSkoXFwvXFwqW1xcd1xcV10qP1xcKlxcL3xcXC9cXC8uKj8oXFxyP1xcbnwkKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdC8vIGF0dXJsZSBpcyBqdXN0IHRoZSBAKioqLCBub3QgdGhlIGVudGlyZSBydWxlICh0byBoaWdobGlnaHQgdmFyICYgc3R1ZmZzKVxuXHQvLyArIGFkZCBhYmlsaXR5IHRvIGhpZ2hsaWdodCBudW1iZXIgJiB1bml0IGZvciBtZWRpYSBxdWVyaWVzXG5cdCdhdHJ1bGUnOiAvQFtcXHctXSsoPz1cXHMrKFxcKHxcXHt8OykpL2dpLFxuXHQvLyB1cmwsIGNvbXBhc3NpZmllZFxuXHQndXJsJzogLyhbLWEtel0rLSkqdXJsKD89XFwoKS9naSxcblx0Ly8gQ1NTIHNlbGVjdG9yIHJlZ2V4IGlzIG5vdCBhcHByb3ByaWF0ZSBmb3IgU2Fzc1xuXHQvLyBzaW5jZSB0aGVyZSBjYW4gYmUgbG90IG1vcmUgdGhpbmdzICh2YXIsIEAgZGlyZWN0aXZlLCBuZXN0aW5nLi4pXG5cdC8vIGEgc2VsZWN0b3IgbXVzdCBzdGFydCBhdCB0aGUgZW5kIG9mIGEgcHJvcGVydHkgb3IgYWZ0ZXIgYSBicmFjZSAoZW5kIG9mIG90aGVyIHJ1bGVzIG9yIG5lc3RpbmcpXG5cdC8vIGl0IGNhbiBjb250YWluIHNvbWUgY2FyYWN0ZXJzIHRoYXQgYXJlbid0IHVzZWQgZm9yIGRlZmluaW5nIHJ1bGVzIG9yIGVuZCBvZiBzZWxlY3RvciwgJiAocGFyZW50IHNlbGVjdG9yKSwgb3IgaW50ZXJwb2xhdGVkIHZhcmlhYmxlXG5cdC8vIHRoZSBlbmQgb2YgYSBzZWxlY3RvciBpcyBmb3VuZCB3aGVuIHRoZXJlIGlzIG5vIHJ1bGVzIGluIGl0ICgge30gb3Ige1xcc30pIG9yIGlmIHRoZXJlIGlzIGEgcHJvcGVydHkgKGJlY2F1c2UgYW4gaW50ZXJwb2xhdGVkIHZhclxuXHQvLyBjYW4gXCJwYXNzXCIgYXMgYSBzZWxlY3Rvci0gZS5nOiBwcm9wZXIjeyRlcnR5fSlcblx0Ly8gdGhpcyBvbmUgd2FzIGFyZCB0byBkbywgc28gcGxlYXNlIGJlIGNhcmVmdWwgaWYgeW91IGVkaXQgdGhpcyBvbmUgOilcblx0J3NlbGVjdG9yJzogLyhbXkA7XFx7XFx9XFwoXFwpXT8oW15AO1xce1xcfVxcKFxcKV18JnxcXCNcXHtcXCRbLV9cXHddK1xcfSkrKSg/PVxccypcXHsoXFx9fFxcc3xbXlxcfV0rKDp8XFx7KVteXFx9XSspKS9nbVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnYXRydWxlJywge1xuXHQna2V5d29yZCc6IC9AKGlmfGVsc2UgaWZ8ZWxzZXxmb3J8ZWFjaHx3aGlsZXxpbXBvcnR8ZXh0ZW5kfGRlYnVnfHdhcm58bWl4aW58aW5jbHVkZXxmdW5jdGlvbnxyZXR1cm58Y29udGVudCl8KD89QGZvclxccytcXCRbLV9cXHddK1xccykrZnJvbS9pXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdwcm9wZXJ0eScsIHtcblx0Ly8gdmFyIGFuZCBpbnRlcnBvbGF0ZWQgdmFyc1xuXHQndmFyaWFibGUnOiAvKChcXCRbLV9cXHddKyl8KCNcXHtcXCRbLV9cXHddK1xcfSkpL2lcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQncGxhY2Vob2xkZXInOiAvJVstX1xcd10rL2ksXG5cdCdzdGF0ZW1lbnQnOiAvXFxCIShkZWZhdWx0fG9wdGlvbmFsKVxcYi9naSxcblx0J2Jvb2xlYW4nOiAvXFxiKHRydWV8ZmFsc2UpXFxiL2csXG5cdCdudWxsJzogL1xcYihudWxsKVxcYi9nLFxuXHQnb3BlcmF0b3InOiAvXFxzKyhbLStdezEsMn18PXsxLDJ9fCE9fFxcfD9cXHx8XFw/fFxcKnxcXC98XFwlKVxccysvZ1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5zcWw9IHsgXG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKShcXC9cXCpbXFx3XFxXXSo/XFwqXFwvfCgoLS0pfChcXC9cXC8pfCMpLio/KFxccj9cXG58JCkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnc3RyaW5nJyA6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15AXSkoXCJ8JykoXFxcXD9bXFxzXFxTXSkqP1xcMi9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0J3ZhcmlhYmxlJzogL0BbXFx3LiRdK3xAKFwifCd8YCkoXFxcXD9bXFxzXFxTXSkrP1xcMS9nLFxuXHQnZnVuY3Rpb24nOiAvXFxiKD86Q09VTlR8U1VNfEFWR3xNSU58TUFYfEZJUlNUfExBU1R8VUNBU0V8TENBU0V8TUlEfExFTnxST1VORHxOT1d8Rk9STUFUKSg/PVxccypcXCgpL2lnLCAvLyBTaG91bGQgd2UgaGlnaGxpZ2h0IHVzZXIgZGVmaW5lZCBmdW5jdGlvbnMgdG9vP1xuXHQna2V5d29yZCc6IC9cXGIoPzpBQ1RJT058QUREfEFGVEVSfEFMR09SSVRITXxBTFRFUnxBTkFMWVpFfEFQUExZfEFTfEFTQ3xBVVRIT1JJWkFUSU9OfEJBQ0tVUHxCREJ8QkVHSU58QkVSS0VMRVlEQnxCSUdJTlR8QklOQVJZfEJJVHxCTE9CfEJPT0x8Qk9PTEVBTnxCUkVBS3xCUk9XU0V8QlRSRUV8QlVMS3xCWXxDQUxMfENBU0NBREV8Q0FTQ0FERUR8Q0FTRXxDSEFJTnxDSEFSIFZBUllJTkd8Q0hBUkFDVEVSIFZBUllJTkd8Q0hFQ0t8Q0hFQ0tQT0lOVHxDTE9TRXxDTFVTVEVSRUR8Q09BTEVTQ0V8Q09MVU1OfENPTFVNTlN8Q09NTUVOVHxDT01NSVR8Q09NTUlUVEVEfENPTVBVVEV8Q09OTkVDVHxDT05TSVNURU5UfENPTlNUUkFJTlR8Q09OVEFJTlN8Q09OVEFJTlNUQUJMRXxDT05USU5VRXxDT05WRVJUfENSRUFURXxDUk9TU3xDVVJSRU5UfENVUlJFTlRfREFURXxDVVJSRU5UX1RJTUV8Q1VSUkVOVF9USU1FU1RBTVB8Q1VSUkVOVF9VU0VSfENVUlNPUnxEQVRBfERBVEFCQVNFfERBVEFCQVNFU3xEQVRFVElNRXxEQkNDfERFQUxMT0NBVEV8REVDfERFQ0lNQUx8REVDTEFSRXxERUZBVUxUfERFRklORVJ8REVMQVlFRHxERUxFVEV8REVOWXxERVNDfERFU0NSSUJFfERFVEVSTUlOSVNUSUN8RElTQUJMRXxESVNDQVJEfERJU0t8RElTVElOQ1R8RElTVElOQ1RST1d8RElTVFJJQlVURUR8RE98RE9VQkxFfERPVUJMRSBQUkVDSVNJT058RFJPUHxEVU1NWXxEVU1QfERVTVBGSUxFfERVUExJQ0FURSBLRVl8RUxTRXxFTkFCTEV8RU5DTE9TRUQgQll8RU5EfEVOR0lORXxFTlVNfEVSUkxWTHxFUlJPUlN8RVNDQVBFfEVTQ0FQRUQgQll8RVhDRVBUfEVYRUN8RVhFQ1VURXxFWElUfEVYUExBSU58RVhURU5ERUR8RkVUQ0h8RklFTERTfEZJTEV8RklMTEZBQ1RPUnxGSVJTVHxGSVhFRHxGTE9BVHxGT0xMT1dJTkd8Rk9SfEZPUiBFQUNIIFJPV3xGT1JDRXxGT1JFSUdOfEZSRUVURVhUfEZSRUVURVhUVEFCTEV8RlJPTXxGVUxMfEZVTkNUSU9OfEdFT01FVFJZfEdFT01FVFJZQ09MTEVDVElPTnxHTE9CQUx8R09UT3xHUkFOVHxHUk9VUHxIQU5ETEVSfEhBU0h8SEFWSU5HfEhPTERMT0NLfElERU5USVRZfElERU5USVRZX0lOU0VSVHxJREVOVElUWUNPTHxJRnxJR05PUkV8SU1QT1JUfElOREVYfElORklMRXxJTk5FUnxJTk5PREJ8SU5PVVR8SU5TRVJUfElOVHxJTlRFR0VSfElOVEVSU0VDVHxJTlRPfElOVk9LRVJ8SVNPTEFUSU9OIExFVkVMfEpPSU58S0VZfEtFWVN8S0lMTHxMQU5HVUFHRSBTUUx8TEFTVHxMRUZUfExJTUlUfExJTkVOT3xMSU5FU3xMSU5FU1RSSU5HfExPQUR8TE9DQUx8TE9DS3xMT05HQkxPQnxMT05HVEVYVHxNQVRDSHxNQVRDSEVEfE1FRElVTUJMT0J8TUVESVVNSU5UfE1FRElVTVRFWFR8TUVSR0V8TUlERExFSU5UfE1PRElGSUVTIFNRTCBEQVRBfE1PRElGWXxNVUxUSUxJTkVTVFJJTkd8TVVMVElQT0lOVHxNVUxUSVBPTFlHT058TkFUSU9OQUx8TkFUSU9OQUwgQ0hBUiBWQVJZSU5HfE5BVElPTkFMIENIQVJBQ1RFUnxOQVRJT05BTCBDSEFSQUNURVIgVkFSWUlOR3xOQVRJT05BTCBWQVJDSEFSfE5BVFVSQUx8TkNIQVJ8TkNIQVIgVkFSQ0hBUnxORVhUfE5PfE5PIFNRTHxOT0NIRUNLfE5PQ1lDTEV8Tk9OQ0xVU1RFUkVEfE5VTExJRnxOVU1FUklDfE9GfE9GRnxPRkZTRVRTfE9OfE9QRU58T1BFTkRBVEFTT1VSQ0V8T1BFTlFVRVJZfE9QRU5ST1dTRVR8T1BUSU1JWkV8T1BUSU9OfE9QVElPTkFMTFl8T1JERVJ8T1VUfE9VVEVSfE9VVEZJTEV8T1ZFUnxQQVJUSUFMfFBBUlRJVElPTnxQRVJDRU5UfFBJVk9UfFBMQU58UE9JTlR8UE9MWUdPTnxQUkVDRURJTkd8UFJFQ0lTSU9OfFBSRVZ8UFJJTUFSWXxQUklOVHxQUklWSUxFR0VTfFBST0N8UFJPQ0VEVVJFfFBVQkxJQ3xQVVJHRXxRVUlDS3xSQUlTRVJST1J8UkVBRHxSRUFEUyBTUUwgREFUQXxSRUFEVEVYVHxSRUFMfFJFQ09ORklHVVJFfFJFRkVSRU5DRVN8UkVMRUFTRXxSRU5BTUV8UkVQRUFUQUJMRXxSRVBMSUNBVElPTnxSRVFVSVJFfFJFU1RPUkV8UkVTVFJJQ1R8UkVUVVJOfFJFVFVSTlN8UkVWT0tFfFJJR0hUfFJPTExCQUNLfFJPVVRJTkV8Uk9XQ09VTlR8Uk9XR1VJRENPTHxST1dTP3xSVFJFRXxSVUxFfFNBVkV8U0FWRVBPSU5UfFNDSEVNQXxTRUxFQ1R8U0VSSUFMfFNFUklBTElaQUJMRXxTRVNTSU9OfFNFU1NJT05fVVNFUnxTRVR8U0VUVVNFUnxTSEFSRSBNT0RFfFNIT1d8U0hVVERPV058U0lNUExFfFNNQUxMSU5UfFNOQVBTSE9UfFNPTUV8U09OQU1FfFNUQVJUfFNUQVJUSU5HIEJZfFNUQVRJU1RJQ1N8U1RBVFVTfFNUUklQRUR8U1lTVEVNX1VTRVJ8VEFCTEV8VEFCTEVTfFRBQkxFU1BBQ0V8VEVNUCg/Ok9SQVJZKT98VEVNUFRBQkxFfFRFUk1JTkFURUQgQll8VEVYVHxURVhUU0laRXxUSEVOfFRJTUVTVEFNUHxUSU5ZQkxPQnxUSU5ZSU5UfFRJTllURVhUfFRPfFRPUHxUUkFOfFRSQU5TQUNUSU9OfFRSQU5TQUNUSU9OU3xUUklHR0VSfFRSVU5DQVRFfFRTRVFVQUx8VFlQRXxUWVBFU3xVTkJPVU5ERUR8VU5DT01NSVRURUR8VU5ERUZJTkVEfFVOSU9OfFVOUElWT1R8VVBEQVRFfFVQREFURVRFWFR8VVNBR0V8VVNFfFVTRVJ8VVNJTkd8VkFMVUV8VkFMVUVTfFZBUkJJTkFSWXxWQVJDSEFSfFZBUkNIQVJBQ1RFUnxWQVJZSU5HfFZJRVd8V0FJVEZPUnxXQVJOSU5HU3xXSEVOfFdIRVJFfFdISUxFfFdJVEh8V0lUSCBST0xMVVB8V0lUSElOfFdPUkt8V1JJVEV8V1JJVEVURVhUKVxcYi9naSxcblx0J2Jvb2xlYW4nOiAvXFxiKD86VFJVRXxGQUxTRXxOVUxMKVxcYi9naSxcblx0J251bWJlcic6IC9cXGItPygweCk/XFxkKlxcLj9bXFxkYS1mXStcXGIvZyxcblx0J29wZXJhdG9yJzogL1xcYig/OkFMTHxBTkR8QU5ZfEJFVFdFRU58RVhJU1RTfElOfExJS0V8Tk9UfE9SfElTfFVOSVFVRXxDSEFSQUNURVIgU0VUfENPTExBVEV8RElWfE9GRlNFVHxSRUdFWFB8UkxJS0V8U09VTkRTIExJS0V8WE9SKVxcYnxbLStdezF9fCF8Wz08Pl17MSwyfXwoJil7MSwyfXxcXHw/XFx8fFxcP3xcXCp8XFwvL2dpLFxuXHQncHVuY3R1YXRpb24nOiAvWztbXFxdKClgLC5dL2dcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5qc1xuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIi8qKlxuICogT3JpZ2luYWwgYnkgQWFyb24gSGFydW46IGh0dHA6Ly9hYWhhY3JlYXRpdmUuY29tLzIwMTIvMDcvMzEvcGhwLXN5bnRheC1oaWdobGlnaHRpbmctcHJpc20vXG4gKiBNb2RpZmllZCBieSBNaWxlcyBKb2huc29uOiBodHRwOi8vbWlsZXNqLm1lXG4gKlxuICogU3VwcG9ydHMgdGhlIGZvbGxvd2luZzpcbiAqIFx0XHQtIEV4dGVuZHMgY2xpa2Ugc3ludGF4XG4gKiBcdFx0LSBTdXBwb3J0IGZvciBQSFAgNS4zKyAobmFtZXNwYWNlcywgdHJhaXRzLCBnZW5lcmF0b3JzLCBldGMpXG4gKiBcdFx0LSBTbWFydGVyIGNvbnN0YW50IGFuZCBmdW5jdGlvbiBtYXRjaGluZ1xuICpcbiAqIEFkZHMgdGhlIGZvbGxvd2luZyBuZXcgdG9rZW4gY2xhc3NlczpcbiAqIFx0XHRjb25zdGFudCwgZGVsaW1pdGVyLCB2YXJpYWJsZSwgZnVuY3Rpb24sIHBhY2thZ2VcbiAqL1xuXG5QcmlzbS5sYW5ndWFnZXMucGhwID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYihhbmR8b3J8eG9yfGFycmF5fGFzfGJyZWFrfGNhc2V8Y2Z1bmN0aW9ufGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlY2xhcmV8ZGVmYXVsdHxkaWV8ZG98ZWxzZXxlbHNlaWZ8ZW5kZGVjbGFyZXxlbmRmb3J8ZW5kZm9yZWFjaHxlbmRpZnxlbmRzd2l0Y2h8ZW5kd2hpbGV8ZXh0ZW5kc3xmb3J8Zm9yZWFjaHxmdW5jdGlvbnxpbmNsdWRlfGluY2x1ZGVfb25jZXxnbG9iYWx8aWZ8bmV3fHJldHVybnxzdGF0aWN8c3dpdGNofHVzZXxyZXF1aXJlfHJlcXVpcmVfb25jZXx2YXJ8d2hpbGV8YWJzdHJhY3R8aW50ZXJmYWNlfHB1YmxpY3xpbXBsZW1lbnRzfHByaXZhdGV8cHJvdGVjdGVkfHBhcmVudHx0aHJvd3xudWxsfGVjaG98cHJpbnR8dHJhaXR8bmFtZXNwYWNlfGZpbmFsfHlpZWxkfGdvdG98aW5zdGFuY2VvZnxmaW5hbGx5fHRyeXxjYXRjaClcXGIvaWcsXG5cdCdjb25zdGFudCc6IC9cXGJbQS1aMC05X117Mix9XFxiL2csXG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKShcXC9cXCpbXFx3XFxXXSo/XFwqXFwvfChefFteOl0pKFxcL1xcL3wjKS4qPyhcXHI/XFxufCQpKS9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdrZXl3b3JkJywge1xuXHQnZGVsaW1pdGVyJzogLyhcXD8+fDxcXD9waHB8PFxcPykvaWcsXG5cdCd2YXJpYWJsZSc6IC8oXFwkXFx3KylcXGIvaWcsXG5cdCdwYWNrYWdlJzoge1xuXHRcdHBhdHRlcm46IC8oXFxcXHxuYW1lc3BhY2VcXHMrfHVzZVxccyspW1xcd1xcXFxdKy9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHRwdW5jdHVhdGlvbjogL1xcXFwvXG5cdFx0fVxuXHR9XG59KTtcblxuLy8gTXVzdCBiZSBkZWZpbmVkIGFmdGVyIHRoZSBmdW5jdGlvbiBwYXR0ZXJuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdwaHAnLCAnb3BlcmF0b3InLCB7XG5cdCdwcm9wZXJ0eSc6IHtcblx0XHRwYXR0ZXJuOiAvKC0+KVtcXHddKy9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fVxufSk7XG5cbi8vIEFkZCBIVE1MIHN1cHBvcnQgb2YgdGhlIG1hcmt1cCBsYW5ndWFnZSBleGlzdHNcbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cblx0Ly8gVG9rZW5pemUgYWxsIGlubGluZSBQSFAgYmxvY2tzIHRoYXQgYXJlIHdyYXBwZWQgaW4gPD9waHAgPz5cblx0Ly8gVGhpcyBhbGxvd3MgZm9yIGVhc3kgUEhQICsgbWFya3VwIGhpZ2hsaWdodGluZ1xuXHRQcmlzbS5ob29rcy5hZGQoJ2JlZm9yZS1oaWdobGlnaHQnLCBmdW5jdGlvbihlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlICE9PSAncGhwJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGVudi50b2tlblN0YWNrID0gW107XG5cblx0XHRlbnYuYmFja3VwQ29kZSA9IGVudi5jb2RlO1xuXHRcdGVudi5jb2RlID0gZW52LmNvZGUucmVwbGFjZSgvKD86PFxcP3BocHw8XFw/KVtcXHdcXFddKj8oPzpcXD8+KS9pZywgZnVuY3Rpb24obWF0Y2gpIHtcblx0XHRcdGVudi50b2tlblN0YWNrLnB1c2gobWF0Y2gpO1xuXG5cdFx0XHRyZXR1cm4gJ3t7e1BIUCcgKyBlbnYudG9rZW5TdGFjay5sZW5ndGggKyAnfX19Jztcblx0XHR9KTtcblx0fSk7XG5cblx0Ly8gUmVzdG9yZSBlbnYuY29kZSBmb3Igb3RoZXIgcGx1Z2lucyAoZS5nLiBsaW5lLW51bWJlcnMpXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWluc2VydCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgPT09ICdwaHAnKSB7XG5cdFx0XHRlbnYuY29kZSA9IGVudi5iYWNrdXBDb2RlO1xuXHRcdFx0ZGVsZXRlIGVudi5iYWNrdXBDb2RlO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gUmUtaW5zZXJ0IHRoZSB0b2tlbnMgYWZ0ZXIgaGlnaGxpZ2h0aW5nXG5cdFByaXNtLmhvb2tzLmFkZCgnYWZ0ZXItaGlnaGxpZ2h0JywgZnVuY3Rpb24oZW52KSB7XG5cdFx0aWYgKGVudi5sYW5ndWFnZSAhPT0gJ3BocCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMCwgdDsgdCA9IGVudi50b2tlblN0YWNrW2ldOyBpKyspIHtcblx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlLnJlcGxhY2UoJ3t7e1BIUCcgKyAoaSArIDEpICsgJ319fScsIFByaXNtLmhpZ2hsaWdodCh0LCBlbnYuZ3JhbW1hciwgJ3BocCcpKTtcblx0XHR9XG5cblx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXHR9KTtcblxuXHQvLyBXcmFwIHRva2VucyBpbiBjbGFzc2VzIHRoYXQgYXJlIG1pc3NpbmcgdGhlbVxuXHRQcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbihlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlID09PSAncGhwJyAmJiBlbnYudHlwZSA9PT0gJ21hcmt1cCcpIHtcblx0XHRcdGVudi5jb250ZW50ID0gZW52LmNvbnRlbnQucmVwbGFjZSgvKFxce1xce1xce1BIUFswLTldK1xcfVxcfVxcfSkvZywgXCI8c3BhbiBjbGFzcz1cXFwidG9rZW4gcGhwXFxcIj4kMTwvc3Bhbj5cIik7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBBZGQgdGhlIHJ1bGVzIGJlZm9yZSBhbGwgb3RoZXJzXG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdjb21tZW50Jywge1xuXHRcdCdtYXJrdXAnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvPFteP11cXC8/KC4qPyk+L2csXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXBcblx0XHR9LFxuXHRcdCdwaHAnOiAvXFx7XFx7XFx7UEhQWzAtOV0rXFx9XFx9XFx9L2dcblx0fSk7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLmpzXG4gKiogbW9kdWxlIGlkID0gNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ3ZhcmlhYmxlJywge1xuXHQndGhpcyc6IC9cXCR0aGlzL2csXG5cdCdnbG9iYWwnOiAvXFwkXz8oR0xPQkFMU3xTRVJWRVJ8R0VUfFBPU1R8RklMRVN8UkVRVUVTVHxTRVNTSU9OfEVOVnxDT09LSUV8SFRUUF9SQVdfUE9TVF9EQVRBfGFyZ2N8YXJndnxwaHBfZXJyb3Jtc2d8aHR0cF9yZXNwb25zZV9oZWFkZXIpL2csXG5cdCdzY29wZSc6IHtcblx0XHRwYXR0ZXJuOiAvXFxiW1xcd1xcXFxdKzo6L2csXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHRrZXl3b3JkOiAvKHN0YXRpY3xzZWxmfHBhcmVudCkvLFxuXHRcdFx0cHVuY3R1YXRpb246IC8oOjp8XFxcXCkvXG5cdFx0fVxuXHR9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLWV4dHJhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5weXRob249IHsgXG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKSMuKj8oXFxyP1xcbnwkKS9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0J3N0cmluZyc6IC9cIlwiXCJbXFxzXFxTXSs/XCJcIlwifCcnJ1tcXHNcXFNdKz8nJyd8KFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQna2V5d29yZCcgOiAvXFxiKGFzfGFzc2VydHxicmVha3xjbGFzc3xjb250aW51ZXxkZWZ8ZGVsfGVsaWZ8ZWxzZXxleGNlcHR8ZXhlY3xmaW5hbGx5fGZvcnxmcm9tfGdsb2JhbHxpZnxpbXBvcnR8aW58aXN8bGFtYmRhfHBhc3N8cHJpbnR8cmFpc2V8cmV0dXJufHRyeXx3aGlsZXx3aXRofHlpZWxkKVxcYi9nLFxuXHQnYm9vbGVhbicgOiAvXFxiKFRydWV8RmFsc2UpXFxiL2csXG5cdCdudW1iZXInIDogL1xcYi0/KDBbYm94XSk/KD86W1xcZGEtZl0rXFwuP1xcZCp8XFwuXFxkKykoPzplWystXT9cXGQrKT9qP1xcYi9naSxcblx0J29wZXJhdG9yJyA6IC9bLStdezEsMn18PT8mbHQ7fD0/Jmd0O3whfD17MSwyfXwoJil7MSwyfXwoJmFtcDspezEsMn18XFx8P1xcfHxcXD98XFwqfFxcL3x+fFxcXnwlfFxcYihvcnxhbmR8bm90KVxcYi9nLFxuXHQnaWdub3JlJyA6IC8mKGx0fGd0fGFtcCk7L2dpLFxuXHQncHVuY3R1YXRpb24nIDogL1t7fVtcXF07KCksLjpdL2dcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24uanNcbiAqKiBtb2R1bGUgaWQgPSA2OFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCIvKipcbiAqIE9yaWdpbmFsIGJ5IFNhbXVlbCBGbG9yZXNcbiAqXG4gKiBBZGRzIHRoZSBmb2xsb3dpbmcgbmV3IHRva2VuIGNsYXNzZXM6XG4gKiBcdFx0Y29uc3RhbnQsIGJ1aWx0aW4sIHZhcmlhYmxlLCBzeW1ib2wsIHJlZ2V4XG4gKi9cblByaXNtLmxhbmd1YWdlcy5ydWJ5ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdjb21tZW50JzogLyNbXlxcclxcbl0qKFxccj9cXG58JCkvZyxcblx0J2tleXdvcmQnOiAvXFxiKGFsaWFzfGFuZHxCRUdJTnxiZWdpbnxicmVha3xjYXNlfGNsYXNzfGRlZnxkZWZpbmVfbWV0aG9kfGRlZmluZWR8ZG98ZWFjaHxlbHNlfGVsc2lmfEVORHxlbmR8ZW5zdXJlfGZhbHNlfGZvcnxpZnxpbnxtb2R1bGV8bmV3fG5leHR8bmlsfG5vdHxvcnxyYWlzZXxyZWRvfHJlcXVpcmV8cmVzY3VlfHJldHJ5fHJldHVybnxzZWxmfHN1cGVyfHRoZW58dGhyb3d8dHJ1ZXx1bmRlZnx1bmxlc3N8dW50aWx8d2hlbnx3aGlsZXx5aWVsZClcXGIvZyxcblx0J2J1aWx0aW4nOiAvXFxiKEFycmF5fEJpZ251bXxCaW5kaW5nfENsYXNzfENvbnRpbnVhdGlvbnxEaXJ8RXhjZXB0aW9ufEZhbHNlQ2xhc3N8RmlsZXxTdGF0fEZpbGV8Rml4bnVtfEZsb2FkfEhhc2h8SW50ZWdlcnxJT3xNYXRjaERhdGF8TWV0aG9kfE1vZHVsZXxOaWxDbGFzc3xOdW1lcmljfE9iamVjdHxQcm9jfFJhbmdlfFJlZ2V4cHxTdHJpbmd8U3RydWN0fFRNU3xTeW1ib2x8VGhyZWFkR3JvdXB8VGhyZWFkfFRpbWV8VHJ1ZUNsYXNzKVxcYi8sXG5cdCdjb25zdGFudCc6IC9cXGJbQS1aXVthLXpBLVpfMC05XSpbPyFdP1xcYi9nXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncnVieScsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogLyhefFteL10pXFwvKD8hXFwvKShcXFsuKz9dfFxcXFwufFteL1xcclxcbl0pK1xcL1tnaW1dezAsM30oPz1cXHMqKCR8W1xcclxcbiwuO30pXSkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQndmFyaWFibGUnOiAvW0AkXStcXGJbYS16QS1aX11bYS16QS1aXzAtOV0qWz8hXT9cXGIvZyxcblx0J3N5bWJvbCc6IC86XFxiW2EtekEtWl9dW2EtekEtWl8wLTldKls/IV0/XFxiL2dcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkuanNcbiAqKiBtb2R1bGUgaWQgPSA2OVxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuamF2YSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQna2V5d29yZCc6IC9cXGIoYWJzdHJhY3R8Y29udGludWV8Zm9yfG5ld3xzd2l0Y2h8YXNzZXJ0fGRlZmF1bHR8Z290b3xwYWNrYWdlfHN5bmNocm9uaXplZHxib29sZWFufGRvfGlmfHByaXZhdGV8dGhpc3xicmVha3xkb3VibGV8aW1wbGVtZW50c3xwcm90ZWN0ZWR8dGhyb3d8Ynl0ZXxlbHNlfGltcG9ydHxwdWJsaWN8dGhyb3dzfGNhc2V8ZW51bXxpbnN0YW5jZW9mfHJldHVybnx0cmFuc2llbnR8Y2F0Y2h8ZXh0ZW5kc3xpbnR8c2hvcnR8dHJ5fGNoYXJ8ZmluYWx8aW50ZXJmYWNlfHN0YXRpY3x2b2lkfGNsYXNzfGZpbmFsbHl8bG9uZ3xzdHJpY3RmcHx2b2xhdGlsZXxjb25zdHxmbG9hdHxuYXRpdmV8c3VwZXJ8d2hpbGUpXFxiL2csXG5cdCdudW1iZXInOiAvXFxiMGJbMDFdK1xcYnxcXGIweFtcXGRhLWZdKlxcLj9bXFxkYS1mcFxcLV0rXFxifFxcYlxcZCpcXC4/XFxkK1tlXT9bXFxkXSpbZGZdXFxifFxcYlxcZCpcXC4/XFxkK1xcYi9naSxcblx0J29wZXJhdG9yJzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcLl0pKD86XFwrPXxcXCtcXCs/fC09fC0tP3whPT98PHsxLDJ9PT98PnsxLDN9PT98PT0/fCY9fCYmP3xcXHw9fFxcfFxcfD98XFw/fFxcKj0/fFxcLz0/fCU9P3xcXF49P3w6fH4pL2dtLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCJcbmZ1bmN0aW9uIGFkZExpbmVOdW1iZXJzKHByZSkge1xuXG4gIHZhciBsaW5lc051bSA9ICgxICsgcHJlLmlubmVySFRNTC5zcGxpdCgnXFxuJykubGVuZ3RoKTtcbiAgdmFyIGxpbmVOdW1iZXJzV3JhcHBlcjtcblxuICB2YXIgbGluZXMgPSBuZXcgQXJyYXkobGluZXNOdW0pO1xuICBsaW5lcyA9IGxpbmVzLmpvaW4oJzxzcGFuPjwvc3Bhbj4nKTtcblxuICBsaW5lTnVtYmVyc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxpbmVOdW1iZXJzV3JhcHBlci5jbGFzc05hbWUgPSAnbGluZS1udW1iZXJzLXJvd3MnO1xuICBsaW5lTnVtYmVyc1dyYXBwZXIuaW5uZXJIVE1MID0gbGluZXM7XG5cbiAgaWYgKHByZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQnKSkge1xuICAgIHByZS5zdHlsZS5jb3VudGVyUmVzZXQgPSAnbGluZW51bWJlciAnICsgTnVtYmVyKHByZS5kYXRhc2V0LnN0YXJ0KSAtIDE7XG4gIH1cblxuICBwcmUuYXBwZW5kQ2hpbGQobGluZU51bWJlcnNXcmFwcGVyKTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZExpbmVOdW1iZXJzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vYWRkTGluZU51bWJlcnMuanNcbiAqKi8iLCJcbmZ1bmN0aW9uIGlzU2Nyb2xsZWRJbnRvVmlldyhlbGVtKSB7XG4gIHZhciBjb29yZHMgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHZhciB2aXNpYmxlSGVpZ2h0ID0gMDtcblxuICBpZiAoY29vcmRzLnRvcCA8IDApIHtcbiAgICB2aXNpYmxlSGVpZ2h0ID0gY29vcmRzLmJvdHRvbTtcbiAgfSBlbHNlIGlmIChjb29yZHMuYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgdmlzaWJsZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB2aXNpYmxlSGVpZ2h0ID4gMTA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTY3JvbGxlZEludG9WaWV3O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvaXNTY3JvbGxlZEludG9WaWV3LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoidHV0b3JpYWwuM2I0NGM0ZTdiMjI1ZjMxN2MyYTQuanMifQ==
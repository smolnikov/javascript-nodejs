var tutorial =
webpackJsonp_name_([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var delegate = __webpack_require__(27);
	var prism = __webpack_require__(35);
	var xhr = __webpack_require__(28);
	var TutorialMapModal = __webpack_require__(24);
	
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
	    __webpack_require__.e/* nsure */(6, function () {
	      __webpack_require__(26).init();
	    });
	  }
	};
	
	exports.TutorialMap = __webpack_require__(25);
	
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
/* 20 */,
/* 21 */
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
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var xhr = __webpack_require__(28);
	
	var delegate = __webpack_require__(27);
	var Modal = __webpack_require__(9);
	var Spinner = __webpack_require__(36);
	var TutorialMap = __webpack_require__(25);
	var trackSticky = __webpack_require__(21);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var throttle = __webpack_require__(51);
	var delegate = __webpack_require__(27);
	
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
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(23);
	var getCsrfCookie = __webpack_require__(37);
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
	    request.send(body);
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
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	__webpack_require__(71);
	
	Prism.tokenTag = "code"; // for iBooks to use monospace font
	
	var CodeBox = __webpack_require__(53);
	var CodeTabsBox = __webpack_require__(54);
	
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
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },
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
/* 52 */,
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var resizeOnload = __webpack_require__(18);
	var isScrolledIntoView = __webpack_require__(77);
	var addLineNumbers = __webpack_require__(76);
	
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var delegate = __webpack_require__(27);
	var addLineNumbers = __webpack_require__(76);
	
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
/* 55 */,
/* 56 */,
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
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
/* 77 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3RyYWNrU3RpY2t5LmpzPzgxYjkiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9nZXRDc3JmQ29va2llLmpzP2QxMmEqIiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9jb2RlQm94LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9jb2RlVGFic0JveC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLWV4dHJhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNjc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAtZXh0cmFzLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ydWJ5LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2FkZExpbmVOdW1iZXJzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLEtBQUksUUFBUSxHQUFHLG1CQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDO0FBQzFDLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBYyxDQUFDLENBQUM7QUFDcEMsS0FBSSxHQUFHLEdBQUcsbUJBQU8sQ0FBQyxFQUFZLENBQUMsQ0FBQztBQUNoQyxLQUFJLGdCQUFnQixHQUFHLG1CQUFPLENBQUMsRUFBb0IsQ0FBQyxDQUFDOztBQUVyRCxRQUFPLENBQUMsSUFBSSxHQUFHLFlBQVc7O0FBR3hCLGtCQUFlLEVBQUUsQ0FBQztBQUNsQixpQkFBYyxFQUFFLENBQUM7O0FBRWpCLHVCQUFvQixFQUFFLENBQUM7O0FBRXZCLFdBQVEsQ0FBQyxRQUFRLEVBQUUsZ0NBQThCLEVBQUUsT0FBTyxFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzFFLFNBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUN2QixVQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDOztBQUVILFFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFYixPQUFJ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QTtBQUNBO0FBQ0EsT0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKLHVDQUFzQyxzQkFBc0I7QUFDNUQ7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQSx5QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtB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QUFHLGtCQUFrQixDIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRlbGVnYXRlID0gcmVxdWlyZSgnY2xpZW50L2RlbGVnYXRlJyk7XG52YXIgcHJpc20gPSByZXF1aXJlKCdjbGllbnQvcHJpc20nKTtcbnZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG52YXIgVHV0b3JpYWxNYXBNb2RhbCA9IHJlcXVpcmUoJy4vdHV0b3JpYWxNYXBNb2RhbCcpO1xuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuXG4gIGluaXRUYXNrQnV0dG9ucygpO1xuICBpbml0Rm9sZGVyTGlzdCgpO1xuXG4gIGluaXRTaWRlYmFySGlnaGxpZ2h0KCk7XG5cbiAgZGVsZWdhdGUoZG9jdW1lbnQsICdbZGF0YS1hY3Rpb249XCJ0dXRvcmlhbC1tYXBcIl0nLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIG5ldyBUdXRvcmlhbE1hcE1vZGFsKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgcHJpc20uaW5pdCgpO1xuXG4gIGlmICh3aW5kb3cuaXNFYm9vaykge1xuICAgIHJlcXVpcmUuZW5zdXJlKCcuL2Vib29rJywgZnVuY3Rpb24oKSB7XG4gICAgICByZXF1aXJlKCcuL2Vib29rJykuaW5pdCgpO1xuICAgIH0sICdlYm9vaycpO1xuICB9XG59O1xuXG5leHBvcnRzLlR1dG9yaWFsTWFwID0gcmVxdWlyZSgnLi90dXRvcmlhbE1hcCcpO1xuXG5mdW5jdGlvbiBpbml0U2lkZWJhckhpZ2hsaWdodCgpIHtcblxuICBmdW5jdGlvbiBoaWdobGlnaHQoKSB7XG5cbiAgICB2YXIgY3VycmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpZGViYXJfX25hdmlnYXRpb24tbGlua19hY3RpdmUnKTtcbiAgICBpZiAoY3VycmVudFswXSkgY3VycmVudFswXS5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX19uYXZpZ2F0aW9uLWxpbmtfYWN0aXZlJyk7XG5cbiAgICB2YXIgaDJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2gyJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoMnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoMiA9IGgyc1tpXTtcbiAgICAgIC8vIGZpcnN0IGluLXBhZ2UgaGVhZGVyXG4gICAgICBpZiAoaDIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gMCkgYnJlYWs7XG4gICAgfVxuICAgIGktLTsgLy8gd2UgbmVlZCB0aGUgb25lIGJlZm9yZSBpdCAoY3VycmVudGx5IHJlYWRpbmcpXG5cbiAgICBpZiAoaT49MCkge1xuICAgICAgdmFyIGhyZWYgPSBoMnNbaV0uZmlyc3RFbGVtZW50Q2hpbGQgJiYgaDJzW2ldLmZpcnN0RWxlbWVudENoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgdmFyIGxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX25hdmlnYXRpb24tbGluayBhW2hyZWY9XCInICsgaHJlZiArICdcIl0nKTtcbiAgICAgIGlmIChocmVmICYmIGxpKSB7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfX25hdmlnYXRpb24tbGlua19hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBoaWdobGlnaHQoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoaWdobGlnaHQpO1xuICB9KTtcblxuXG59XG5cblxuZnVuY3Rpb24gaW5pdFRhc2tCdXR0b25zKCkge1xuICAvLyBzb2x1dGlvbiBidXR0b25cbiAgZGVsZWdhdGUoZG9jdW1lbnQsICcudGFza19fc29sdXRpb24nLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFzaycpLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX2Fuc3dlcl9vcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGNsb3NlIHNvbHV0aW9uIGJ1dHRvblxuICBkZWxlZ2F0ZShkb2N1bWVudCwgJy50YXNrX19hbnN3ZXItY2xvc2UnLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFzaycpLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfX2Fuc3dlcl9vcGVuJyk7XG4gIH0pO1xuXG4gIC8vIGV2ZXJ5IHN0ZXAgYnV0dG9uIChpZiBhbnkgc3RlcHMpXG4gIGRlbGVnYXRlKGRvY3VtZW50LCAnLnRhc2tfX3N0ZXAtc2hvdycsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50YXNrX19zdGVwJykuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fc3RlcF9vcGVuJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0Rm9sZGVyTGlzdCgpIHtcbiAgZGVsZWdhdGUoZG9jdW1lbnQsICcubGVzc29ucy1saXN0X19sZXNzb25fbGV2ZWxfMSA+IC5sZXNzb25zLWxpc3RfX2xpbmsnLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBsaW5rID0gZXZlbnQuZGVsZWdhdGVUYXJnZXQ7XG4gICAgdmFyIG9wZW5Gb2xkZXIgPSBsaW5rLmNsb3Nlc3QoJy5sZXNzb25zLWxpc3QnKS5xdWVyeVNlbGVjdG9yKCcubGVzc29ucy1saXN0X19sZXNzb25fb3BlbicpO1xuICAgIC8vIGNsb3NlIHRoZSBwcmV2aW91cyBvcGVuIGZvbGRlciAodGh1cyBtYWtpbmcgYW4gYWNjb3JkaW9uKVxuICAgIGlmIChvcGVuRm9sZGVyICYmIG9wZW5Gb2xkZXIgIT0gbGluay5wYXJlbnROb2RlKSB7XG4gICAgICBvcGVuRm9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xlc3NvbnMtbGlzdF9fbGVzc29uX29wZW4nKTtcbiAgICB9XG4gICAgbGluay5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2xlc3NvbnMtbGlzdF9fbGVzc29uX29wZW4nKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYWNrU3RpY2t5O1xuXG5cbmZ1bmN0aW9uIHRyYWNrU3RpY2t5KCkge1xuXG4gIHZhciBzdGlja3lFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0aWNreV0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNreUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN0aWNreUVsZW0gPSBzdGlja3lFbGVtc1tpXTtcbiAgICB2YXIgY29udGFpbmVyID0gc3RpY2t5RWxlbS5kYXRhc2V0LnN0aWNreSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kpIDogZG9jdW1lbnQuYm9keTtcblxuICAgIGlmIChzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDApIHtcbiAgICAgIC8vIGJlY29tZSBmaXhlZFxuICAgICAgaWYgKHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAvLyBhbHJlYWR5IGZpeGVkXG4gICAgICAgIC8vIGluZXJ0aWE6IGhhcHBlbnMgd2hlbiBzY3JvbGxlZCBmYXN0IHRvbyBtdWNoIHRvIGJvdHRvbVxuICAgICAgICAvLyBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNS0wMi0yNF8xNTU1LnN3ZlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYXZlZExlZnQgPSBzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjcmVhdGVQbGFjZWhvbGRlcihzdGlja3lFbGVtKTtcblxuICAgICAgc3RpY2t5RWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgc3RpY2t5RWxlbSk7XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGlja3lFbGVtKTtcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubGVmdCA9IHNhdmVkTGVmdCArICdweCc7XG4gICAgICAvLyB6SW5kZXggPCAxMDAwLCBiZWNhdXNlIGl0IG11c3QgYmUgdW5kZXIgYW4gb3ZlcmxheSxcbiAgICAgIC8vIGUuZy4gc2l0ZW1hcCBtdXN0IHNob3cgb3ZlciB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnpJbmRleCA9IDEwMTtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7IC8vIG5vbi10cmFuc3BhcmVudCB0byBjb3ZlciB0aGUgdGV4dFxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5tYXJnaW4gPSAwO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS53aWR0aCA9IHBsYWNlaG9sZGVyLm9mZnNldFdpZHRoICsgJ3B4JzsgLy8ga2VlcCBzYW1lIHdpZHRoIGFzIGJlZm9yZVxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH0gZWxzZSBpZiAoc3RpY2t5RWxlbS5wbGFjZWhvbGRlciAmJiBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDApIHtcbiAgICAgIC8vIGJlY29tZSBub24tZml4ZWRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgICAgc3RpY2t5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RpY2t5RWxlbSwgc3RpY2t5RWxlbS5wbGFjZWhvbGRlcik7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xuXG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGFjZWhvbGRlciB3LyBzYW1lIHNpemUgJiBtYXJnaW5cbiAqIEBwYXJhbSBlbGVtXG4gKiBAcmV0dXJucyB7KnwhSFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKGVsZW0pIHtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkxlZnQgPSBzdHlsZS5tYXJnaW5MZWZ0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5SaWdodCA9IHN0eWxlLm1hcmdpblJpZ2h0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IHN0eWxlLm1hcmdpbkJvdHRvbTtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luVG9wID0gc3R5bGUubWFyZ2luVG9wO1xuICByZXR1cm4gcGxhY2Vob2xkZXI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvdHJhY2tTdGlja3kuanNcbiAqKi8iLCJ2YXIgeGhyID0gcmVxdWlyZSgnY2xpZW50L3hocicpO1xuXG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBNb2RhbCA9IHJlcXVpcmUoJ2NsaWVudC9oZWFkL21vZGFsJyk7XG52YXIgU3Bpbm5lciA9IHJlcXVpcmUoJ2NsaWVudC9zcGlubmVyJyk7XG52YXIgVHV0b3JpYWxNYXAgPSByZXF1aXJlKCcuL3R1dG9yaWFsTWFwJyk7XG52YXIgdHJhY2tTdGlja3kgPSByZXF1aXJlKCdjbGllbnQvdHJhY2tTdGlja3knKTtcblxuLyoqXG4gKiBPcHRpb25zOlxuICogICAtIGNhbGxiYWNrOiBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpbiAoYnkgZGVmYXVsdCAtIGdvIHRvIHN1Y2Nlc3NSZWRpcmVjdClcbiAqICAgLSBtZXNzYWdlOiBmb3JtIG1lc3NhZ2UgdG8gYmUgc2hvd24gd2hlbiB0aGUgbG9naW4gZm9ybSBhcHBlYXJzIChcIkxvZyBpbiB0byBsZWF2ZSB0aGUgY29tbWVudFwiKVxuICogICAtIHN1Y2Nlc3NSZWRpcmVjdDogdGhlIHBhZ2UgdG8gcmVkaXJlY3QgKGN1cnJlbnQgcGFnZSBieSBkZWZhdWx0KVxuICogICAgICAgLSBhZnRlciBpbW1lZGlhdGUgbG9naW5cbiAqICAgICAgIC0gYWZ0ZXIgcmVnaXN0cmF0aW9uIGZvciBcImNvbmZpcm0gZW1haWxcIiBsaW5rXG4gKi9cbmZ1bmN0aW9uIFR1dG9yaWFsTWFwTW9kYWwoKSB7XG4gIE1vZGFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgdmFyIHNwaW5uZXIgPSBuZXcgU3Bpbm5lcigpO1xuICB0aGlzLnNldENvbnRlbnQoc3Bpbm5lci5lbGVtKTtcbiAgc3Bpbm5lci5zdGFydCgpO1xuXG4gIHZhciByZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0KHtcbiAgICB1cmw6ICcvdHV0b3JpYWwvbWFwJ1xuICB9KTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ3R1dG9yaWFsLW1hcC1vdmVybGF5JztcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9IGV2ZW50LnJlc3VsdCArICc8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnV0dG9uIHR1dG9yaWFsLW1hcC1vdmVybGF5X19jbG9zZVwiPjwvYnV0dG9uPic7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfb24nKTtcbiAgICBzZWxmLnNldENvbnRlbnQod3JhcHBlcik7XG5cbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyYWNrU3RpY2t5KTtcblxuICAgIG5ldyBUdXRvcmlhbE1hcChzZWxmLmNvbnRlbnRFbGVtLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5yZW1vdmUoKTtcbiAgfSk7XG5cbn1cblxuVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE1vZGFsLnByb3RvdHlwZSk7XG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUpO1xuXG5UdXRvcmlhbE1hcE1vZGFsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLW1hcF9vbicpO1xufTtcblxuVHV0b3JpYWxNYXBNb2RhbC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIHJlcXVlc3QgPSB4aHIob3B0aW9ucyk7XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFR1dG9yaWFsTWFwTW9kYWw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC90dXRvcmlhbE1hcE1vZGFsLmpzXG4gKiovIiwidmFyIHRocm90dGxlID0gcmVxdWlyZSgnbGliL3Rocm90dGxlJyk7XG52YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcblxuZnVuY3Rpb24gVHV0b3JpYWxNYXAoZWxlbSkge1xuICB0aGlzLmVsZW0gPSBlbGVtO1xuXG4gIHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3ggPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXR1dG9yaWFsLW1hcC1zaG93LXRhc2tzXScpO1xuICB0aGlzLnNob3dUYXNrc0NoZWNrYm94LmNoZWNrZWQgPSArbG9jYWxTdG9yYWdlLnNob3dUYXNrc0NoZWNrYm94O1xuXG4gIHRoaXMudXBkYXRlU2hvd1Rhc2tzKCk7XG5cbiAgdGhpcy5zaG93VGFza3NDaGVja2JveC5vbmNoYW5nZSA9IHRoaXMudXBkYXRlU2hvd1Rhc2tzLmJpbmQodGhpcyk7XG5cbiAgdGhpcy5maWx0ZXJJbnB1dCA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS10dXRvcmlhbC1tYXAtZmlsdGVyXScpO1xuICB0aGlzLnRleHRJbnB1dEJsb2NrID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy50dXRvcmlhbC1tYXBfX2ZpbHRlciAudGV4dC1pbnB1dCcpO1xuXG4gIHRoaXMubGF5b3V0U3dpdGNoID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXR1dG9yaWFsLW1hcC1sYXlvdXQtc3dpdGNoXScpO1xuICB2YXIgaXNNYXBTaW5nbGVDb2x1bW4gPSArbG9jYWxTdG9yYWdlLmlzTWFwU2luZ2xlQ29sdW1uO1xuICB0aGlzLmxheW91dFN3aXRjaC5xdWVyeVNlbGVjdG9yKCdbdmFsdWU9XCIwXCJdJykuY2hlY2tlZCA9ICFpc01hcFNpbmdsZUNvbHVtbjtcbiAgdGhpcy5sYXlvdXRTd2l0Y2gucXVlcnlTZWxlY3RvcignW3ZhbHVlPVwiMVwiXScpLmNoZWNrZWQgPSBpc01hcFNpbmdsZUNvbHVtbjtcbiAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbiAgdGhpcy5sYXlvdXRTd2l0Y2gub25jaGFuZ2UgPSB0aGlzLm9uTGF5b3V0U3dpdGNoQ2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgdGhpcy5maWx0ZXJJbnB1dC5vbmlucHV0ID0gdGhpcy5vbkZpbHRlcklucHV0LmJpbmQodGhpcyk7XG4gIHRoaXMuZmlsdGVySW5wdXQub25rZXlkb3duID0gdGhpcy5vbkZpbHRlcktleWRvd24uYmluZCh0aGlzKTtcblxuICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5maWx0ZXJJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuc2hvd0NsZWFyQnV0dG9uKGZhbHNlKTtcbiAgICB0aGlzLmZpbHRlcignJyk7XG4gIH07XG5cbiAgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnR1dG9yaWFsTWFwQ2hhcHRlcnMgfHwgXCJ7fVwiKTtcbiAgdGhpcy5zaG93Q2hhcHRlcnNDb2xsYXBzZWQoKTtcblxuICB0aGlzLmRlbGVnYXRlKCcudHV0b3JpYWwtbWFwX19pdGVtID4gLnR1dG9yaWFsLW1hcF9fbGluaycsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaHJlZiA9IGV2ZW50LmRlbGVnYXRlVGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICh0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2hyZWZdKSB7XG4gICAgICBkZWxldGUgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZFtocmVmXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jaGFwdGVyc0NvbGxhcHNlZFtocmVmXSA9IDE7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS50dXRvcmlhbE1hcENoYXB0ZXJzID0gSlNPTi5zdHJpbmdpZnkodGhpcy5jaGFwdGVyc0NvbGxhcHNlZCk7XG4gICAgdGhpcy5zaG93Q2hhcHRlcnNDb2xsYXBzZWQoKTtcbiAgfSk7XG5cbiAgdmFyIGFjdGl2ZUxpbmsgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2hyZWY9XCInICsgbG9jYXRpb24ucGF0aG5hbWUgKyAnXCJdJyk7XG4gIGlmIChhY3RpdmVMaW5rKSB7XG4gICAgYWN0aXZlTGluay5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfX2xpbmtfYWN0aXZlJyk7XG4gIH1cblxuICB0aGlzLmZvY3VzKCk7XG5cbn1cblxuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuc2hvd0NoYXB0ZXJzQ29sbGFwc2VkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsaW5rcyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCcudHV0b3JpYWwtbWFwX19pdGVtID4gLnR1dG9yaWFsLW1hcF9fbGluaycpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBsaW5rc1tpXTtcblxuICAgIGlmICh0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2xpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyldKSB7XG4gICAgICBsaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndHV0b3JpYWwtbWFwX19pdGVtX2NvbGxhcHNlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndHV0b3JpYWwtbWFwX19pdGVtX2NvbGxhcHNlZCcpO1xuICAgIH1cbiAgfVxufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLm9uTGF5b3V0U3dpdGNoQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy51cGRhdGVMYXlvdXQoKTtcbn07XG5cblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXNNYXBTaW5nbGVDb2x1bW4gPSArdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwibWFwLWxheW91dFwiXTpjaGVja2VkJykudmFsdWU7XG4gIGlmIChpc01hcFNpbmdsZUNvbHVtbikge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfc2luZ2xlY29sJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLW1hcF9zaW5nbGVjb2wnKTtcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5pc01hcFNpbmdsZUNvbHVtbiA9IGlzTWFwU2luZ2xlQ29sdW1uID8gXCIxXCIgOiBcIjBcIjtcbn07XG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS51cGRhdGVTaG93VGFza3MgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3guY2hlY2tlZCkge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfc2hvdy10YXNrcycpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd0dXRvcmlhbC1tYXBfc2hvdy10YXNrcycpO1xuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNob3dUYXNrc0NoZWNrYm94ID0gdGhpcy5zaG93VGFza3NDaGVja2JveC5jaGVja2VkID8gXCIxXCIgOiBcIjBcIjtcbn07XG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS5vbkZpbHRlcklucHV0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgdGhpcy5zaG93Q2xlYXJCdXR0b24oZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgdGhpcy50aHJvdHRsZUZpbHRlcihldmVudC50YXJnZXQudmFsdWUpO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLm9uRmlsdGVyS2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7IC8vIGVzY2FwZVxuICAgIHRoaXMuZmlsdGVySW5wdXQudmFsdWUgPSAnJztcbiAgICB0aGlzLnNob3dDbGVhckJ1dHRvbihmYWxzZSk7XG4gICAgdGhpcy5maWx0ZXIoJycpO1xuICB9XG59O1xuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuc2hvd0NsZWFyQnV0dG9uID0gZnVuY3Rpb24oc2hvdykge1xuICBpZiAoc2hvdykge1xuICAgIHRoaXMudGV4dElucHV0QmxvY2suY2xhc3NMaXN0LmFkZCgndGV4dC1pbnB1dF9jbGVhci1idXR0b24nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRleHRJbnB1dEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaW5wdXRfY2xlYXItYnV0dG9uJyk7XG4gIH1cbn07XG5cbi8vIGZvY3VzIG9uIHRoZSBtYXAgaXRzZWxmLCB0byBhbGxvdyBpbW1lZGlhdGUgc2Nyb2xsaW5nIHdpdGggYXJyb3cgdXAvZG93biBrZXlzXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtLnRhYkluZGV4ID0gLTE7XG4gIHRoaXMuZWxlbS5mb2N1cygpO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgdmFyIHNob3dpbmdUYXNrcyA9IHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3guY2hlY2tlZDtcblxuICB2YXIgbGlua3MgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvckFsbCgnLnR1dG9yaWFsLW1hcC1saW5rJyk7XG5cbiAgdmFyIHRvcEl0ZW1zID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX2l0ZW0nKTtcblxuICBmdW5jdGlvbiBjaGVja0xpTWF0Y2gobGkpIHtcbiAgICByZXR1cm4gaXNTdWJTZXF1ZW5jZShsaS5xdWVyeVNlbGVjdG9yKCdhJykuaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCksIHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJykpO1xuICB9XG5cbiAgLy8gYW4gaXRlbSBpcyBzaG93biBpZiBhbnkgb2YgaXRzIGNoaWxkcmVuIGlzIHNob3duIE9SIGl0J3MgbGluayBtYXRjaGVzIHRoZSBmaWx0ZXJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3BJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaSA9IHRvcEl0ZW1zW2ldO1xuICAgIHZhciBzdWJJdGVtcyA9IGxpLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX3N1Yi1pdGVtJyk7XG5cbiAgICB2YXIgY2hpbGRNYXRjaCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChzdWJJdGVtcywgZnVuY3Rpb24ocHJldlZhbHVlLCBzdWJJdGVtKSB7XG5cbiAgICAgIHZhciBjaGlsZE1hdGNoID0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG93aW5nVGFza3MpIHtcbiAgICAgICAgdmFyIHN1Ykl0ZW1zID0gc3ViSXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcudHV0b3JpYWwtbWFwX19zdWItc3ViLWl0ZW0nKTtcbiAgICAgICAgY2hpbGRNYXRjaCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChzdWJJdGVtcywgZnVuY3Rpb24ocHJldlZhbHVlLCBzdWJJdGVtKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gY2hlY2tMaU1hdGNoKHN1Ykl0ZW0pO1xuICAgICAgICAgIHN1Ykl0ZW0uaGlkZGVuID0gIW1hdGNoO1xuICAgICAgICAgIHJldHVybiBwcmV2VmFsdWUgfHwgbWF0Y2g7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gY2hpbGRNYXRjaCB8fCBjaGVja0xpTWF0Y2goc3ViSXRlbSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHN1Ykl0ZW0sIG1hdGNoKTtcbiAgICAgIHN1Ykl0ZW0uaGlkZGVuID0gIW1hdGNoO1xuXG4gICAgICByZXR1cm4gcHJldlZhbHVlIHx8IG1hdGNoO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGxpLmhpZGRlbiA9ICEoY2hpbGRNYXRjaCB8fCBjaGVja0xpTWF0Y2gobGkpKTtcblxuICB9XG5cbn07XG5cblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLnRocm90dGxlRmlsdGVyID0gdGhyb3R0bGUoVHV0b3JpYWxNYXAucHJvdG90eXBlLmZpbHRlciwgMjAwKTtcbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oVHV0b3JpYWxNYXAucHJvdG90eXBlKTtcblxuXG5mdW5jdGlvbiBpc1N1YlNlcXVlbmNlKHN0cjEsIHN0cjIpIHtcbiAgdmFyIGkgPSAwO1xuICB2YXIgaiA9IDA7XG4gIHdoaWxlIChpIDwgc3RyMS5sZW5ndGggJiYgaiA8IHN0cjIubGVuZ3RoKSB7XG4gICAgaWYgKHN0cjFbaV0gPT0gc3RyMltqXSkge1xuICAgICAgaSsrO1xuICAgICAgaisrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBqID09IHN0cjIubGVuZ3RoO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVHV0b3JpYWxNYXA7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC90dXRvcmlhbE1hcC5qc1xuICoqLyIsInZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG52YXIgZ2V0Q3NyZkNvb2tpZSA9IHJlcXVpcmUoJ2NsaWVudC9nZXRDc3JmQ29va2llJyk7XG4vLyBXcmFwcGVyIGFib3V0IFhIUlxuLy8gIyBHbG9iYWwgRXZlbnRzXG4vLyB0cmlnZ2VycyBkb2N1bWVudC5sb2Fkc3RhcnQvbG9hZGVuZCBvbiBjb21tdW5pY2F0aW9uIHN0YXJ0L2VuZFxuLy8gICAgLS0+IHVubGVzcyBvcHRpb25zLm5vR2xvYmFsRXZlbnRzIGlzIHNldFxuLy9cbi8vICMgRXZlbnRzXG4vLyB0cmlnZ2VycyBmYWlsL3N1Y2Nlc3Mgb24gbG9hZCBlbmQ6XG4vLyAgICAtLT4gYnkgZGVmYXVsdCBzdGF0dXM9MjAwIGlzIG9rLCB0aGUgb3RoZXJzIGFyZSBmYWlsdXJlc1xuLy8gICAgLS0+IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgPSBbMjAxLDQwOV0gYWxsb3cgZ2l2ZW4gc3RhdHVzZXNcbi8vICAgIC0tPiBmYWlsIGV2ZW50IGhhcyAucmVhc29uIGZpZWxkXG4vLyAgICAtLT4gc3VjY2VzcyBldmVudCBoYXMgLnJlc3VsdCBmaWVsZFxuLy9cbi8vICMgSlNPTlxuLy8gICAgLS0+IHNlbmQob2JqZWN0KSBjYWxscyBKU09OLnN0cmluZ2lmeVxuLy8gICAgLS0+IGFkZHMgQWNjZXB0OiBqc29uICh3ZSB3YW50IGpzb24pIGJ5IGRlZmF1bHQsIHVubGVzcyBvcHRpb25zLnJhd1xuLy8gaWYgb3B0aW9ucy5qc29uIG9yIHNlcnZlciByZXR1cm5lZCBqc29uIGNvbnRlbnQgdHlwZVxuLy8gICAgLS0+IGF1dG9wYXJzZSBqc29uXG4vLyAgICAtLT4gZmFpbCBpZiBlcnJvclxuLy9cbi8vICMgQ1NSRlxuLy8gICAgLS0+IHJlcXVlc3RzIHNlbmRzIGhlYWRlciBYLVhTUkYtVE9LRU4gZnJvbSBjb29raWVcblxuZnVuY3Rpb24geGhyKG9wdGlvbnMpIHtcblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHZhciBtZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuXG4gIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5zeW5jID8gZmFsc2UgOiB0cnVlKTtcblxuICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcblxuICAvLyB0b2tlbi9oZWFkZXIgbmFtZXMgc2FtZSBhcyBhbmd1bGFyICRodHRwIGZvciBlYXNpZXIgaW50ZXJvcFxuICB2YXIgY3NyZkNvb2tpZSA9IGdldENzcmZDb29raWUoKVxuICBpZiAoY3NyZkNvb2tpZSAmJiAhb3B0aW9ucy5za2lwQ3NyZikge1xuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIlgtWFNSRi1UT0tFTlwiLCBjc3JmQ29va2llKTtcbiAgfVxuXG4gIGlmICh7fS50b1N0cmluZy5jYWxsKGJvZHkpID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gbXVzdCBiZSBPUEVOZWQgdG8gc2V0UmVxdWVzdEhlYWRlclxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcbiAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuXG4gIGlmICghb3B0aW9ucy5ub0dsb2JhbEV2ZW50cykge1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN0YXJ0JywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZW5kJywgZXZlbnQpO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3VjY2VzcycsIGV2ZW50KTtcbiAgICAgIGUucmVzdWx0ID0gZXZlbnQucmVzdWx0O1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyZmFpbCcsIGV2ZW50KTtcbiAgICAgIGUucmVhc29uID0gZXZlbnQucmVhc29uO1xuICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5yYXcpIHsgLy8gbWVhbnMgd2Ugd2FudCBqc29uXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgfVxuXG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsIFwiWE1MSHR0cFJlcXVlc3RcIik7XG5cbiAgdmFyIG5vcm1hbFN0YXR1c2VzID0gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyB8fCBbMjAwXTtcblxuICBmdW5jdGlvbiB3cmFwRXZlbnQobmFtZSwgZSkge1xuICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lKTtcbiAgICBldmVudC5vcmlnaW5hbEV2ZW50ID0gZTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBmYWlsKHJlYXNvbiwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwiZmFpbFwiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWNjZXNzKHJlc3VsdCwgb3JpZ2luYWxFdmVudCkge1xuICAgIHZhciBlID0gd3JhcEV2ZW50KFwic3VjY2Vzc1wiLCBvcmlnaW5hbEV2ZW50KTtcbiAgICBlLnJlc3VsdCA9IHJlc3VsdDtcbiAgICByZXF1ZXN0LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J7RiNC40LHQutCwINGB0LLRj9C30Lgg0YEg0YHQtdGA0LLQtdGA0L7QvC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCf0YDQtdCy0YvRiNC10L3QviDQvNCw0LrRgdC40LzQsNC70YzQvdC+INC00L7Qv9GD0YHRgtC40LzQvtC1INCy0YDQtdC80Y8g0L7QttC40LTQsNC90LjRjyDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQl9Cw0L/RgNC+0YEg0LHRi9C7INC/0YDQtdGA0LLQsNC9LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBlID0+IHtcbiAgICBpZiAoIXJlcXVlc3Quc3RhdHVzKSB7IC8vIGRvZXMgdGhhdCBldmVyIGhhcHBlbj9cbiAgICAgIGZhaWwoXCLQndC1INC/0L7Qu9GD0YfQtdC9INC+0YLQstC10YIg0L7RgiDRgdC10YDQstC10YDQsC5cIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbFN0YXR1c2VzLmluZGV4T2YocmVxdWVzdC5zdGF0dXMpID09IC0xKSB7XG4gICAgICBmYWlsKFwi0J7RiNC40LHQutCwINC90LAg0YHRgtC+0YDQvtC90LUg0YHQtdGA0LLQtdGA0LAgKNC60L7QtCBcIiArIHJlcXVlc3Quc3RhdHVzICsgXCIpLCDQv9C+0L/Ri9GC0LDQudGC0LXRgdGMINC/0L7Qt9C00L3QtdC1XCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICB2YXIgY29udGVudFR5cGUgPSByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuICAgIGlmIChjb250ZW50VHlwZS5tYXRjaCgvXmFwcGxpY2F0aW9uXFwvanNvbi8pIHx8IG9wdGlvbnMuanNvbikgeyAvLyBhdXRvcGFyc2UganNvbiBpZiBXQU5UIG9yIFJFQ0VJVkVEIGpzb25cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChcItCd0LXQutC+0YDRgNC10LrRgtC90YvQuSDRhNC+0YDQvNCw0YIg0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LBcIiwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdWNjZXNzKHJlc3VsdCwgZSk7XG4gIH0pO1xuXG4gIC8vIGRlZmVyIHRvIGxldCBvdGhlciBoYW5kbGVycyBiZSBhc3NpZ25lZFxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHJlcXVlc3Quc2VuZChib2R5KTtcbiAgfSwgMCk7XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG5cbn1cblxuXG5mdW5jdGlvbiBhZGRVcmxQYXJhbSh1cmwsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwYXJhbSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIGlmICh+dXJsLmluZGV4T2YoJz8nKSkge1xuICAgIHJldHVybiB1cmwgKyAnJicgKyBwYXJhbTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXJsICsgJz8nICsgcGFyYW07XG4gIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd4aHJmYWlsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZWFzb24pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB4aHI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC94aHIuanNcbiAqKi8iLCJyZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy1leHRyYXMuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb2ZmZWVzY3JpcHQuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC1leHRyYXMuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24uanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ydWJ5LmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5qcycpO1xuXG5QcmlzbS50b2tlblRhZyA9ICdjb2RlJzsgLy8gZm9yIGlCb29rcyB0byB1c2UgbW9ub3NwYWNlIGZvbnRcblxudmFyIENvZGVCb3ggPSByZXF1aXJlKCcuL2NvZGVCb3gnKTtcbnZhciBDb2RlVGFic0JveCA9IHJlcXVpcmUoJy4vY29kZVRhYnNCb3gnKTtcblxuZnVuY3Rpb24gaW5pdENvZGVCb3hlcyhjb250YWluZXIpIHtcblxuICAvLyBoaWdobGlnaHQgaW5saW5lXG4gIHZhciBjb2RlRXhhbXBsZUVsZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2RlLWV4YW1wbGU6bm90KFtkYXRhLXByaXNtLWRvbmVdKScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZUV4YW1wbGVFbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjb2RlRXhhbXBsZUVsZW0gPSBjb2RlRXhhbXBsZUVsZW1zW2ldO1xuICAgIG5ldyBDb2RlQm94KGNvZGVFeGFtcGxlRWxlbSk7XG4gICAgY29kZUV4YW1wbGVFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlzbS1kb25lJywgJzEnKTtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gaW5pdENvZGVUYWJzQm94KGNvbnRhaW5lcikge1xuXG4gIHZhciBlbGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYuY29kZS10YWJzOm5vdChbZGF0YS1wcmlzbS1kb25lXSknKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgbmV3IENvZGVUYWJzQm94KGVsZW1zW2ldKTtcbiAgICBlbGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpc20tZG9uZScsICcxJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFByaXNtLmhpZ2hsaWdodEFsbCk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGhpZ2hsaWdodChkb2N1bWVudCk7XG4gIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBoaWdobGlnaHQoZWxlbSkge1xuICBpbml0Q29kZUJveGVzKGVsZW0pO1xuICBpbml0Q29kZVRhYnNCb3goZWxlbSk7XG59XG5cbmV4cG9ydHMuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNzcmZDb29raWUgPSBkb2N1bWVudC5jb29raWUubWF0Y2goL1hTUkYtVE9LRU49KFtcXHctXSspLyk7XG4gIHJldHVybiBjc3JmQ29va2llID8gY3NyZkNvb2tpZVsxXSA6IG51bGw7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9nZXRDc3JmQ29va2llLmpzXG4gKiovIiwidmFyIHJlc2l6ZU9ubG9hZCA9IHJlcXVpcmUoJ2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZCcpO1xudmFyIGlzU2Nyb2xsZWRJbnRvVmlldyA9IHJlcXVpcmUoJ2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJy4vYWRkTGluZU51bWJlcnMnKTtcblxuZnVuY3Rpb24gQ29kZUJveChlbGVtKSB7XG5cbiAgdmFyIHByZUVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3ByZScpO1xuICB2YXIgY29kZUVsZW0gPSBwcmVFbGVtLnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcbiAgdmFyIGNvZGUgPSBjb2RlRWxlbS50ZXh0Q29udGVudDtcblxuICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNvZGVFbGVtKTtcbiAgYWRkTGluZU51bWJlcnMocHJlRWxlbSk7XG5cbiAgYWRkQmxvY2tIaWdobGlnaHQocHJlRWxlbSwgZWxlbS5kYXRhc2V0LmhpZ2hsaWdodEJsb2NrKTtcbiAgYWRkSW5saW5lSGlnaGxpZ2h0KHByZUVsZW0sIGVsZW0uZGF0YXNldC5oaWdobGlnaHRJbmxpbmUpO1xuXG4gIHZhciBpc0pTID0gcHJlRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKTtcbiAgdmFyIGlzSFRNTCA9IHByZUVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdsYW5ndWFnZS1tYXJrdXAnKTtcbiAgdmFyIGlzVHJ1c3RlZCA9IGVsZW0uZGF0YXNldC50cnVzdGVkO1xuICB2YXIganNGcmFtZTtcbiAgdmFyIGh0bWxSZXN1bHQ7XG4gIHZhciBpc0ZpcnN0UnVuID0gdHJ1ZTtcblxuICBpZiAoIWlzSlMgJiYgIWlzSFRNTCkgcmV0dXJuO1xuXG4gIHZhciBydW5FbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb249XCJydW5cIl0nKTtcbiAgaWYgKHJ1bkVsZW0pIHtcbiAgICBydW5FbGVtLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgcnVuKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBlZGl0RWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtYWN0aW9uPVwiZWRpdFwiXScpO1xuICBpZiAoZWRpdEVsZW0pIHtcbiAgICBlZGl0RWxlbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJsdXIoKTtcbiAgICAgIGVkaXQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gc29tZSBjb2RlIGNhbid0IGJlIGV4ZWN1dGVkIGJ5IGVwdWIgZW5naW5lXG4gIGlmIChlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYod2luZG93LmVib29rRm9ybWF0ID09ICdlcHViJyAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biA9PSAnbm8tZXB1YicpIHtcbiAgICAgIGVsZW0ucXVlcnlTZWxlY3RvcignaWZyYW1lJykucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRpbWVvdXQgc2hvdWxkIGJlIHNtYWxsLCBhcm91bmQgMTBtcywgb3IgcmVtb3ZlIGl0IHRvIG1ha2UgY3Jhd2xlciBwcm9jZXNzIHRoZSBhdXRvcnVuXG4gICAgICBzZXRUaW1lb3V0KHJ1biwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcG9zdEpTRnJhbWUoKSB7XG4gICAgdmFyIHdpbiA9IGpzRnJhbWVbMF0uY29udGVudFdpbmRvdztcbiAgICBpZiAodHlwZW9mIHdpbi5wb3N0TWVzc2FnZSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICBhbGVydChcItCY0LfQstC40L3QuNGC0LUsINC30LDQv9GD0YHQuiDQutC+0LTQsCDRgtGA0LXQsdGD0LXRgiDQsdC+0LvQtdC1INGB0L7QstGA0LXQvNC10L3QvdGL0Lkg0LHRgNCw0YPQt9C10YBcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbi5wb3N0TWVzc2FnZShjb2RlLCAnaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tL3Nob3dqcycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuSFRNTCgpIHtcblxuICAgIHZhciBmcmFtZTtcblxuICAgIGlmIChodG1sUmVzdWx0ICYmIGVsZW0uZGF0YXNldC5yZWZyZXNoKSB7XG4gICAgICBodG1sUmVzdWx0LnJlbW92ZSgpO1xuICAgICAgaHRtbFJlc3VsdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFodG1sUmVzdWx0KSB7XG4gICAgICAvLyB0YWtlIGZyb20gSFRNTCBpZiBleGlzdHMgdGhlcmUgKGluIG1hcmt1cCB3aGVuIGF1dG9ydW4gaXMgc3BlY2lmaWVkKVxuICAgICAgaHRtbFJlc3VsdCA9IGVsZW0ucXVlcnlTZWxlY3RvcignLmNvZGUtcmVzdWx0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFodG1sUmVzdWx0KSB7XG4gICAgICAvLyBvdGhlcndpc2UgY3JlYXRlIChvciByZWNyZWF0ZSBpZiByZWZyZXNoKVxuICAgICAgaHRtbFJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaHRtbFJlc3VsdC5jbGFzc05hbWUgPSBcImNvZGUtcmVzdWx0IGNvZGUtZXhhbXBsZV9fcmVzdWx0XCI7XG5cbiAgICAgIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBmcmFtZS5uYW1lID0gJ2ZyYW1lLScgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgZnJhbWUuY2xhc3NOYW1lID0gJ2NvZGUtcmVzdWx0X19pZnJhbWUnO1xuXG4gICAgICBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQgPT09IFwiMFwiKSB7XG4gICAgICAgIC8vIHRoaXMgaHRtbCBoYXMgbm90aGluZyB0byBzaG93XG4gICAgICAgIGZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0uZGF0YXNldC5kZW1vSGVpZ2h0KSB7XG4gICAgICAgIHZhciBoZWlnaHQgPSArZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQ7XG4gICAgICAgIGZyYW1lLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICB9XG4gICAgICBodG1sUmVzdWx0LmFwcGVuZENoaWxkKGZyYW1lKTtcblxuICAgICAgZWxlbS5hcHBlbmRDaGlsZChodG1sUmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJhbWUgPSBodG1sUmVzdWx0LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuICAgIH1cblxuICAgIGlmIChpc1RydXN0ZWQpIHtcbiAgICAgIHZhciBkb2MgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQgfHwgZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcblxuICAgICAgZG9jLm9wZW4oKTtcbiAgICAgIGRvYy53cml0ZShub3JtYWxpemVIdG1sKGNvZGUpKTtcbiAgICAgIGRvYy5jbG9zZSgpO1xuXG4gICAgICBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXNpemVPbmxvYWQuaWZyYW1lKGZyYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoaXNGaXJzdFJ1biAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBpZiAoIWlzU2Nyb2xsZWRJbnRvVmlldyhodG1sUmVzdWx0KSkge1xuICAgICAgICAgIGh0bWxSZXN1bHQuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGZvcm0uZW5jdHlwZSA9IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiO1xuICAgICAgZm9ybS5hY3Rpb24gPSBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9zaG93aHRtbFwiO1xuICAgICAgZm9ybS50YXJnZXQgPSBmcmFtZS5uYW1lO1xuXG4gICAgICB2YXIgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgdGV4dGFyZWEubmFtZSA9ICdjb2RlJztcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gbm9ybWFsaXplSHRtbChjb2RlKTtcbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgICBmcmFtZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmb3JtLCBmcmFtZS5uZXh0U2libGluZyk7XG4gICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcblxuICAgICAgaWYgKCEoaXNGaXJzdFJ1biAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmIChlbGVtLmRhdGFzZXQuZGVtb0hlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNpemVPbmxvYWQuaWZyYW1lKGZyYW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU2Nyb2xsZWRJbnRvVmlldyhodG1sUmVzdWx0KSkge1xuICAgICAgICAgICAgaHRtbFJlc3VsdC5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcnVuSlMoKSB7XG5cbiAgICBpZiAoaXNUcnVzdGVkKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8qIGpzaGludCAtVzA2MSAqL1xuICAgICAgICB3aW5kb3dbXCJldmFsXCJdLmNhbGwod2luZG93LCBjb2RlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LA6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChlbGVtLmRhdGFzZXQucmVmcmVzaCAmJiBqc0ZyYW1lKSB7XG4gICAgICAgIGpzRnJhbWUucmVtb3ZlKCk7XG4gICAgICAgIGpzRnJhbWUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWpzRnJhbWUpIHtcbiAgICAgICAgLy8gY3JlYXRlIGlmcmFtZSBmb3IganNcbiAgICAgICAganNGcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBqc0ZyYW1lLmNsYXNzTmFtZSA9ICdqcy1mcmFtZSc7XG4gICAgICAgIGpzRnJhbWUuc3JjID0gJ2h0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9zaG93anMnO1xuICAgICAgICBqc0ZyYW1lLnN0eWxlLndpZHRoID0gMDtcbiAgICAgICAganNGcmFtZS5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgICBqc0ZyYW1lLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgICAganNGcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBwb3N0SlNGcmFtZSgpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRnJhbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdEpTRnJhbWUoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXQoKSB7XG5cbiAgICB2YXIgaHRtbDtcbiAgICBpZiAoaXNIVE1MKSB7XG4gICAgICBodG1sID0gbm9ybWFsaXplSHRtbChjb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvZGVJbmRlbnRlZCA9IGNvZGUucmVwbGFjZSgvXi9naW0sICcgICAgJyk7XG4gICAgICBodG1sID0gJzwhRE9DVFlQRSBodG1sPlxcbjxodG1sPlxcblxcbjxib2R5PlxcbiAgPHNjcmlwdD5cXG4nICsgY29kZUluZGVudGVkICsgJ1xcbiAgPC9zY3JpcHQ+XFxuPC9ib2R5PlxcblxcbjwvaHRtbD4nO1xuICAgIH1cblxuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uYWN0aW9uID0gXCJodHRwOi8vcGxua3IuY28vZWRpdC8/cD1wcmV2aWV3XCI7XG4gICAgZm9ybS5tZXRob2QgPSBcIlBPU1RcIjtcbiAgICBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS5uYW1lID0gXCJmaWxlc1tpbmRleC5odG1sXVwiO1xuICAgIHRleHRhcmVhLnZhbHVlID0gaHRtbDtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRleHRhcmVhKTtcblxuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQubmFtZSA9IFwiZGVzY3JpcHRpb25cIjtcbiAgICBpbnB1dC52YWx1ZSA9IFwiRm9yayBmcm9tIFwiICsgd2luZG93LmxvY2F0aW9uO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgICBmb3JtLnJlbW92ZSgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBub3JtYWxpemVIdG1sKCkge1xuICAgIHZhciBjb2RlTGMgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGhhc0JvZHlTdGFydCA9IGNvZGVMYy5tYXRjaCgnPGJvZHk+Jyk7XG4gICAgdmFyIGhhc0JvZHlFbmQgPSBjb2RlTGMubWF0Y2goJzwvYm9keT4nKTtcbiAgICB2YXIgaGFzSHRtbFN0YXJ0ID0gY29kZUxjLm1hdGNoKCc8aHRtbD4nKTtcbiAgICB2YXIgaGFzSHRtbEVuZCA9IGNvZGVMYy5tYXRjaCgnPC9odG1sPicpO1xuXG4gICAgdmFyIGhhc0RvY1R5cGUgPSBjb2RlTGMubWF0Y2goL15cXHMqPCFkb2N0eXBlLyk7XG5cbiAgICBpZiAoaGFzRG9jVHlwZSkge1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGNvZGU7XG5cbiAgICBpZiAoIWhhc0h0bWxTdGFydCkge1xuICAgICAgcmVzdWx0ID0gJzxodG1sPlxcbicgKyByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNIdG1sRW5kKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgKyAnXFxuPC9odG1sPic7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNCb2R5U3RhcnQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCc8aHRtbD4nLCAnPGh0bWw+XFxuPGhlYWQ+XFxuICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cXG48L2hlYWQ+PGJvZHk+XFxuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNCb2R5RW5kKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgnPC9odG1sPicsICdcXG48L2JvZHk+XFxuPC9odG1sPicpO1xuICAgIH1cblxuICAgIHJlc3VsdCA9ICc8IURPQ1RZUEUgSFRNTD5cXG4nICsgcmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcnVuKCkge1xuICAgIGlmIChpc0pTKSB7XG4gICAgICBydW5KUygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBydW5IVE1MKCk7XG4gICAgfVxuICAgIGlzRmlyc3RSdW4gPSBmYWxzZTtcbiAgfVxuXG5cbn1cblxuXG5mdW5jdGlvbiBhZGRCbG9ja0hpZ2hsaWdodChwcmUsIGxpbmVzKSB7XG5cbiAgaWYgKCFsaW5lcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciByYW5nZXMgPSBsaW5lcy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xuXG4gIC8qanNoaW50IC1XMDg0ICovXG4gIGZvciAodmFyIGkgPSAwLCByYW5nZTsgcmFuZ2UgPSByYW5nZXNbaSsrXTspIHtcbiAgICByYW5nZSA9IHJhbmdlLnNwbGl0KCctJyk7XG5cbiAgICB2YXIgc3RhcnQgPSArcmFuZ2VbMF0sXG4gICAgICAgIGVuZCA9ICtyYW5nZVsxXSB8fCBzdGFydDtcblxuXG4gICAgdmFyIG1hc2sgPSAnPGNvZGUgY2xhc3M9XCJibG9jay1oaWdobGlnaHRcIiBkYXRhLXN0YXJ0PVwiJyArIHN0YXJ0ICsgJ1wiIGRhdGEtZW5kPVwiJyArIGVuZCArICdcIj4nICtcbiAgICAgIG5ldyBBcnJheShzdGFydCArIDEpLmpvaW4oJ1xcbicpICtcbiAgICAgICc8Y29kZSBjbGFzcz1cIm1hc2tcIj4nICsgbmV3IEFycmF5KGVuZCAtIHN0YXJ0ICsgMikuam9pbignXFxuJykgKyAnPC9jb2RlPjwvY29kZT4nO1xuXG4gICAgcHJlLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyQmVnaW5cIiwgbWFzayk7XG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIGFkZElubGluZUhpZ2hsaWdodChwcmUsIHJhbmdlcykge1xuXG4gIC8vIHNlbGVjdCBjb2RlIHdpdGggdGhlIGxhbmd1YWdlIHRleHQsIG5vdCBibG9jay1oaWdobGlnaHRlclxuICB2YXIgY29kZUVsZW0gPSBwcmUucXVlcnlTZWxlY3RvcignY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0nKTtcblxuICByYW5nZXMgPSByYW5nZXMgPyByYW5nZXMuc3BsaXQoXCIsXCIpIDogW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGllY2UgPSByYW5nZXNbaV0uc3BsaXQoJzonKTtcbiAgICB2YXIgbGluZU51bSA9ICtwaWVjZVswXSwgc3RyUmFuZ2UgPSBwaWVjZVsxXS5zcGxpdCgnLScpO1xuICAgIHZhciBzdGFydCA9ICtzdHJSYW5nZVswXSwgZW5kID0gK3N0clJhbmdlWzFdO1xuICAgIHZhciBtYXNrID0gJzxjb2RlIGNsYXNzPVwiaW5saW5lLWhpZ2hsaWdodFwiPicgK1xuICAgICAgbmV3IEFycmF5KGxpbmVOdW0gKyAxKS5qb2luKCdcXG4nKSArXG4gICAgICBuZXcgQXJyYXkoc3RhcnQgKyAxKS5qb2luKCcgJykgK1xuICAgICAgJzxjb2RlIGNsYXNzPVwibWFza1wiPicgKyBuZXcgQXJyYXkoZW5kIC0gc3RhcnQgKyAxKS5qb2luKCcgJykgKyAnPC9jb2RlPjwvY29kZT4nO1xuXG4gICAgY29kZUVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJCZWdpblwiLCBtYXNrKTtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29kZUJveDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2NvZGVCb3guanNcbiAqKi8iLCJ2YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJy4vYWRkTGluZU51bWJlcnMnKTtcblxuZnVuY3Rpb24gQ29kZVRhYnNCb3goZWxlbSkge1xuICBpZiAod2luZG93LmlzRWJvb2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmVsZW0gPSBlbGVtO1xuICB0aGlzLnRyYW5zbGF0ZVggPSAwO1xuXG4gIHRoaXMuc3dpdGNoZXNFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtc3dpdGNoZXNdJyk7XG4gIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMgPSB0aGlzLnN3aXRjaGVzRWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgdGhpcy5hcnJvd0xlZnQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1sZWZ0XScpO1xuICB0aGlzLmFycm93UmlnaHQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1yaWdodF0nKTtcblxuXG4gIHRoaXMuYXJyb3dMZWZ0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy50cmFuc2xhdGVYID0gTWF0aC5tYXgoMCwgdGhpcy50cmFuc2xhdGVYIC0gdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNsYXRlKCk7XG4gIH0uYmluZCh0aGlzKTtcblxuXG4gIHRoaXMuYXJyb3dSaWdodC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMudHJhbnNsYXRlWCA9IE1hdGgubWluKHRoaXMudHJhbnNsYXRlWCArdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgsIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMub2Zmc2V0V2lkdGggLSB0aGlzLnN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCk7XG4gICAgdGhpcy5yZW5kZXJUcmFuc2xhdGUoKTtcbiAgfS5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuZGVsZWdhdGUoJy5jb2RlLXRhYnNfX3N3aXRjaCcsICdjbGljaycsIHRoaXMub25Td2l0Y2hDbGljayk7XG59XG5cbkNvZGVUYWJzQm94LnByb3RvdHlwZS5vblN3aXRjaENsaWNrID0gZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIHNpYmxpbmdzID0gZS5kZWxlZ2F0ZVRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICB2YXIgdGFicyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtY29udGVudF0nKS5jaGlsZHJlbjtcblxuXG4gIHZhciBzZWxlY3RlZEluZGV4O1xuICBmb3IodmFyIGk9MDsgaTxzaWJsaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzd2l0Y2hFbGVtID0gc2libGluZ3NbaV07XG4gICAgdmFyIHRhYkVsZW0gPSB0YWJzW2ldO1xuICAgIGlmIChzd2l0Y2hFbGVtID09IGUuZGVsZWdhdGVUYXJnZXQpIHtcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgdGFiRWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfX3NlY3Rpb25fY3VycmVudCcpO1xuICAgICAgc3dpdGNoRWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfX3N3aXRjaF9jdXJyZW50Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhYkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX19zZWN0aW9uX2N1cnJlbnQnKTtcbiAgICAgIHN3aXRjaEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX19zd2l0Y2hfY3VycmVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19yZXN1bHRfb24nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX3Jlc3VsdF9vbicpO1xuXG4gICAgdGhpcy5oaWdobGlnaHRUYWIodGFic1tzZWxlY3RlZEluZGV4XSk7XG4gIH1cblxufTtcblxuXG5Db2RlVGFic0JveC5wcm90b3R5cGUuaGlnaGxpZ2h0VGFiID0gZnVuY3Rpb24odGFiKSB7XG4gIGlmICh0YWIuaGlnaGxpZ2h0ZWQpIHJldHVybjtcbiAgdmFyIHByZUVsZW0gPSB0YWIucXVlcnlTZWxlY3RvcigncHJlJyk7XG4gIHZhciBjb2RlRWxlbSA9IHByZUVsZW0ucXVlcnlTZWxlY3RvcignY29kZScpO1xuICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNvZGVFbGVtKTtcbiAgYWRkTGluZU51bWJlcnMocHJlRWxlbSk7XG4gIHRhYi5oaWdobGlnaHRlZCA9IHRydWU7XG59O1xuXG5Db2RlVGFic0JveC5wcm90b3R5cGUucmVuZGVyVHJhbnNsYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyB0aGlzLnRyYW5zbGF0ZVggKyAncHgpJztcbiAgaWYgKHRoaXMudHJhbnNsYXRlWCA9PT0gMCkge1xuICAgIHRoaXMuYXJyb3dMZWZ0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcnJvd0xlZnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgaWYgKHRoaXMudHJhbnNsYXRlWCA9PT0gdGhpcy5zd2l0Y2hlc0VsZW1JdGVtcy5vZmZzZXRXaWR0aCAtIHRoaXMuc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgdGhpcy5hcnJvd1JpZ2h0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcnJvd1JpZ2h0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG59O1xuXG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oQ29kZVRhYnNCb3gucHJvdG90eXBlKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENvZGVUYWJzQm94O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vY29kZVRhYnNCb3guanNcbiAqKi8iLCJzZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqIE1JVCBsaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwL1xuICogQGF1dGhvciBMZWEgVmVyb3UgaHR0cDovL2xlYS52ZXJvdS5tZVxuICovXG5cbnZhciBQcmlzbSA9IChmdW5jdGlvbigpe1xuXG4vLyBQcml2YXRlIGhlbHBlciB2YXJzXG52YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LSg/IVxcKikoXFx3KylcXGIvaTtcblxudmFyIF8gPSBzZWxmLlByaXNtID0ge1xuXHR1dGlsOiB7XG5cdFx0ZW5jb2RlOiBmdW5jdGlvbiAodG9rZW5zKSB7XG5cdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUb2tlbih0b2tlbnMudHlwZSwgXy51dGlsLmVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHR9IGVsc2UgaWYgKF8udXRpbC50eXBlKHRva2VucykgPT09ICdBcnJheScpIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoXy51dGlsLmVuY29kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dHlwZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xcW29iamVjdCAoXFx3KylcXF0vKVsxXTtcblx0XHR9LFxuXG5cdFx0Ly8gRGVlcCBjbG9uZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gKGUuZy4gdG8gZXh0ZW5kIGl0KVxuXHRcdGNsb25lOiBmdW5jdGlvbiAobykge1xuXHRcdFx0dmFyIHR5cGUgPSBfLnV0aWwudHlwZShvKTtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0dmFyIGNsb25lID0ge307XG5cblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gXy51dGlsLmNsb25lKG9ba2V5XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGNsb25lO1xuXG5cdFx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0XHRyZXR1cm4gby5zbGljZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdH0sXG5cblx0bGFuZ3VhZ2VzOiB7XG5cdFx0ZXh0ZW5kOiBmdW5jdGlvbiAoaWQsIHJlZGVmKSB7XG5cdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0bGFuZ1trZXldID0gcmVkZWZba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydCBhIHRva2VuIGJlZm9yZSBhbm90aGVyIHRva2VuIGluIGEgbGFuZ3VhZ2UgbGl0ZXJhbFxuXHRcdCAqIEFzIHRoaXMgbmVlZHMgdG8gcmVjcmVhdGUgdGhlIG9iamVjdCAod2UgY2Fubm90IGFjdHVhbGx5IGluc2VydCBiZWZvcmUga2V5cyBpbiBvYmplY3QgbGl0ZXJhbHMpLFxuXHRcdCAqIHdlIGNhbm5vdCBqdXN0IHByb3ZpZGUgYW4gb2JqZWN0LCB3ZSBuZWVkIGFub2JqZWN0IGFuZCBhIGtleS5cblx0XHQgKiBAcGFyYW0gaW5zaWRlIFRoZSBrZXkgKG9yIGxhbmd1YWdlIGlkKSBvZiB0aGUgcGFyZW50XG5cdFx0ICogQHBhcmFtIGJlZm9yZSBUaGUga2V5IHRvIGluc2VydCBiZWZvcmUuIElmIG5vdCBwcm92aWRlZCwgdGhlIGZ1bmN0aW9uIGFwcGVuZHMgaW5zdGVhZC5cblx0XHQgKiBAcGFyYW0gaW5zZXJ0IE9iamVjdCB3aXRoIHRoZSBrZXkvdmFsdWUgcGFpcnMgdG8gaW5zZXJ0XG5cdFx0ICogQHBhcmFtIHJvb3QgVGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGBpbnNpZGVgLiBJZiBlcXVhbCB0byBQcmlzbS5sYW5ndWFnZXMsIGl0IGNhbiBiZSBvbWl0dGVkLlxuXHRcdCAqL1xuXHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdHJvb3QgPSByb290IHx8IF8ubGFuZ3VhZ2VzO1xuXHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHRcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcblx0XHRcdFx0aW5zZXJ0ID0gYXJndW1lbnRzWzFdO1xuXHRcdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdGdyYW1tYXJbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBncmFtbWFyO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR2YXIgcmV0ID0ge307XG5cblx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblxuXHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBVcGRhdGUgcmVmZXJlbmNlcyBpbiBvdGhlciBsYW5ndWFnZSBkZWZpbml0aW9uc1xuXHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gcm9vdFtpbnNpZGVdICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcm9vdFtpbnNpZGVdID0gcmV0O1xuXHRcdH0sXG5cblx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRERlM6IGZ1bmN0aW9uKG8sIGNhbGxiYWNrLCB0eXBlKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG8sIGksIG9baV0sIHR5cGUgfHwgaSk7XG5cblx0XHRcdFx0XHRpZiAoXy51dGlsLnR5cGUob1tpXSkgPT09ICdPYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRfLmxhbmd1YWdlcy5ERlMob1tpXSwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChfLnV0aWwudHlwZShvW2ldKSA9PT0gJ0FycmF5Jykge1xuXHRcdFx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKG9baV0sIGNhbGxiYWNrLCBpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbihhc3luYywgY2FsbGJhY2spIHtcblx0XHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZScpO1xuXG5cdFx0Zm9yICh2YXIgaT0wLCBlbGVtZW50OyBlbGVtZW50ID0gZWxlbWVudHNbaSsrXTspIHtcblx0XHRcdF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgY2FsbGJhY2spO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0dmFyIGxhbmd1YWdlLCBncmFtbWFyLCBwYXJlbnQgPSBlbGVtZW50O1xuXG5cdFx0d2hpbGUgKHBhcmVudCAmJiAhbGFuZy50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRsYW5ndWFnZSA9IChwYXJlbnQuY2xhc3NOYW1lLm1hdGNoKGxhbmcpIHx8IFssJyddKVsxXTtcblx0XHRcdGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG5cdFx0fVxuXG5cdFx0aWYgKCFncmFtbWFyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cblx0XHRpZiAoL3ByZS9pLnRlc3QocGFyZW50Lm5vZGVOYW1lKSkge1xuXHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0aWYoIWNvZGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRjb2RlOiBjb2RlXG5cdFx0fTtcblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdGlmIChhc3luYyAmJiBzZWxmLldvcmtlcikge1xuXHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IFRva2VuLnN0cmluZ2lmeShKU09OLnBhcnNlKGV2dC5kYXRhKSwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdH07XG5cblx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGU6IGVudi5jb2RlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZWxlbWVudCk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdHZhciB0b2tlbnMgPSBfLnRva2VuaXplKHRleHQsIGdyYW1tYXIpO1xuXHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZSh0b2tlbnMpLCBsYW5ndWFnZSk7XG5cdH0sXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIFRva2VuID0gXy5Ub2tlbjtcblxuXHRcdHZhciBzdHJhcnIgPSBbdGV4dF07XG5cblx0XHR2YXIgcmVzdCA9IGdyYW1tYXIucmVzdDtcblxuXHRcdGlmIChyZXN0KSB7XG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHR9XG5cblx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0fVxuXG5cdFx0dG9rZW5sb29wOiBmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZighZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGF0dGVybnMgPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdHBhdHRlcm5zID0gKF8udXRpbC50eXBlKHBhdHRlcm5zKSA9PT0gXCJBcnJheVwiKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR2YXIgcGF0dGVybiA9IHBhdHRlcm5zW2pdLFxuXHRcdFx0XHRcdGluc2lkZSA9IHBhdHRlcm4uaW5zaWRlLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQgPSAhIXBhdHRlcm4ubG9va2JlaGluZCxcblx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gMCxcblx0XHRcdFx0XHRhbGlhcyA9IHBhdHRlcm4uYWxpYXM7XG5cblx0XHRcdFx0cGF0dGVybiA9IHBhdHRlcm4ucGF0dGVybiB8fCBwYXR0ZXJuO1xuXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaTxzdHJhcnIubGVuZ3RoOyBpKyspIHsgLy8gRG9u4oCZdCBjYWNoZSBsZW5ndGggYXMgaXQgY2hhbmdlcyBkdXJpbmcgdGhlIGxvb3BcblxuXHRcdFx0XHRcdHZhciBzdHIgPSBzdHJhcnJbaV07XG5cblx0XHRcdFx0XHRpZiAoc3RyYXJyLmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0YnJlYWsgdG9rZW5sb29wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cGF0dGVybi5sYXN0SW5kZXggPSAwO1xuXG5cdFx0XHRcdFx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHN0cik7XG5cblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdGlmKGxvb2tiZWhpbmQpIHtcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZExlbmd0aCA9IG1hdGNoWzFdLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleCAtIDEgKyBsb29rYmVoaW5kTGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpLFxuXHRcdFx0XHRcdFx0XHRsZW4gPSBtYXRjaC5sZW5ndGgsXG5cdFx0XHRcdFx0XHRcdHRvID0gZnJvbSArIGxlbixcblx0XHRcdFx0XHRcdFx0YmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20gKyAxKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXIgPSBzdHIuc2xpY2UodG8gKyAxKTtcblxuXHRcdFx0XHRcdFx0dmFyIGFyZ3MgPSBbaSwgMV07XG5cblx0XHRcdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0YXJncy5wdXNoKGJlZm9yZSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciB3cmFwcGVkID0gbmV3IFRva2VuKHRva2VuLCBpbnNpZGU/IF8udG9rZW5pemUobWF0Y2gsIGluc2lkZSkgOiBtYXRjaCwgYWxpYXMpO1xuXG5cdFx0XHRcdFx0XHRhcmdzLnB1c2god3JhcHBlZCk7XG5cblx0XHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0XHRhcmdzLnB1c2goYWZ0ZXIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHN0cmFyciwgYXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0cmFycjtcblx0fSxcblxuXHRob29rczoge1xuXHRcdGFsbDoge30sXG5cblx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGhvb2tzID0gXy5ob29rcy5hbGw7XG5cblx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdHZhciBjYWxsYmFja3MgPSBfLmhvb2tzLmFsbFtuYW1lXTtcblxuXHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciBpPTAsIGNhbGxiYWNrOyBjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdOykge1xuXHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxudmFyIFRva2VuID0gXy5Ub2tlbiA9IGZ1bmN0aW9uKHR5cGUsIGNvbnRlbnQsIGFsaWFzKSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdHRoaXMuYWxpYXMgPSBhbGlhcztcbn07XG5cblRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKG8sIGxhbmd1YWdlLCBwYXJlbnQpIHtcblx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG87XG5cdH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRyZXR1cm4gby5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShlbGVtZW50LCBsYW5ndWFnZSwgbyk7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHR2YXIgZW52ID0ge1xuXHRcdHR5cGU6IG8udHlwZSxcblx0XHRjb250ZW50OiBUb2tlbi5zdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSwgcGFyZW50KSxcblx0XHR0YWc6IFByaXNtLnRva2VuVGFnIHx8ICdzcGFuJyxcblx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0fTtcblxuXHRpZiAoZW52LnR5cGUgPT0gJ2NvbW1lbnQnKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3NwZWxsY2hlY2snXSA9ICd0cnVlJztcblx0fVxuXG5cdGlmIChvLmFsaWFzKSB7XG5cdFx0dmFyIGFsaWFzZXMgPSBfLnV0aWwudHlwZShvLmFsaWFzKSA9PT0gJ0FycmF5JyA/IG8uYWxpYXMgOiBbby5hbGlhc107XG5cdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHR9XG5cblx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdHZhciBhdHRyaWJ1dGVzID0gJyc7XG5cblx0Zm9yICh2YXIgbmFtZSBpbiBlbnYuYXR0cmlidXRlcykge1xuXHRcdGF0dHJpYnV0ZXMgKz0gbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKSArICdcIic7XG5cdH1cblxuXHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiICcgKyBhdHRyaWJ1dGVzICsgJz4nICsgZW52LmNvbnRlbnQgKyAnPC8nICsgZW52LnRhZyArICc+JztcblxufTtcblxuaWYgKCFzZWxmLmRvY3VtZW50KSB7XG5cdGlmICghc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdHJldHVybiBzZWxmLlByaXNtO1xuXHR9XG4gXHQvLyBJbiB3b3JrZXJcblx0c2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZ0KSB7XG5cdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2dC5kYXRhKSxcblx0XHQgICAgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2UsXG5cdFx0ICAgIGNvZGUgPSBtZXNzYWdlLmNvZGU7XG5cblx0XHRzZWxmLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoXy50b2tlbml6ZShjb2RlLCBfLmxhbmd1YWdlc1tsYW5nXSkpKSk7XG5cdFx0c2VsZi5jbG9zZSgpO1xuXHR9LCBmYWxzZSk7XG5cblx0cmV0dXJuIHNlbGYuUHJpc207XG59XG5cbi8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG52YXIgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5zY3JpcHQgPSBzY3JpcHRbc2NyaXB0Lmxlbmd0aCAtIDFdO1xuXG5pZiAoc2NyaXB0KSB7XG5cdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmICFzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIF8uaGlnaGxpZ2h0QWxsKTtcblx0fVxufVxuXG5yZXR1cm4gc2VsZi5QcmlzbTtcblxufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDUgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50JzogLzwhLS1bXFx3XFxXXSo/LS0+L2csXG5cdCdwcm9sb2cnOiAvPFxcPy4rP1xcPz4vLFxuXHQnZG9jdHlwZSc6IC88IURPQ1RZUEUuKz8+Lyxcblx0J2NkYXRhJzogLzwhXFxbQ0RBVEFcXFtbXFx3XFxXXSo/XV0+L2ksXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/W1xcdzotXStcXHMqKD86XFxzK1tcXHc6LV0rKD86PSg/OihcInwnKShcXFxcP1tcXHdcXFddKSo/XFwxfFteXFxzJ1wiPj1dKykpP1xccyopKlxcLz8+L2dpLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1tcXHc6LV0rL2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXltcXHctXSs/Oi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPSg/OignfFwiKVtcXHdcXFddKj8oXFwxKXxbXlxccz5dKykvZ2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC89fD58XCIvZ1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+L2csXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW1xcdzotXSsvZyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW1xcdy1dKz86L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiAvXFwmIz9bXFxkYS16XXsxLDh9Oy9naVxufTtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcd1xcV10qP1xcKlxcLy9nLFxuXHQnYXRydWxlJzoge1xuXHRcdHBhdHRlcm46IC9AW1xcdy1dKz8uKj8oO3woPz1cXHMqeykpL2dpLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1s7Ol0vZ1xuXHRcdH1cblx0fSxcblx0J3VybCc6IC91cmxcXCgoW1wiJ10/KS4qP1xcMVxcKS9naSxcblx0J3NlbGVjdG9yJzogL1teXFx7XFx9XFxzXVteXFx7XFx9O10qKD89XFxzKlxceykvZyxcblx0J3Byb3BlcnR5JzogLyhcXGJ8XFxCKVtcXHctXSsoPz1cXHMqOikvaWcsXG5cdCdzdHJpbmcnOiAvKFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQnaW1wb3J0YW50JzogL1xcQiFpbXBvcnRhbnRcXGIvZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9bXFx7XFx9OzpdL2csXG5cdCdmdW5jdGlvbic6IC9bLWEtejAtOV0rKD89XFwoKS9pZ1xufTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ3RhZycsIHtcblx0XHQnc3R5bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvPHN0eWxlW1xcd1xcV10qPz5bXFx3XFxXXSo/PFxcL3N0eWxlPi9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQndGFnJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC88c3R5bGVbXFx3XFxXXSo/Pnw8XFwvc3R5bGU+L2lnLFxuXHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0pO1xuXHRcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnaW5zaWRlJywgJ2F0dHItdmFsdWUnLCB7XG5cdFx0J3N0eWxlLWF0dHInOiB7XG5cdFx0XHRwYXR0ZXJuOiAvXFxzKnN0eWxlPShcInwnKS4rP1xcMS9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9eXFxzKnN0eWxlL2lnLFxuXHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFxzKj1cXHMqWydcIl18WydcIl1cXHMqJC8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8uKy9naSxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtY3NzJ1xuXHRcdH1cblx0fSwgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSA1IDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuY3NzLnNlbGVjdG9yID0ge1xuXHRwYXR0ZXJuOiAvW15cXHtcXH1cXHNdW15cXHtcXH1dKig/PVxccypcXHspL2csXG5cdGluc2lkZToge1xuXHRcdCdwc2V1ZG8tZWxlbWVudCc6IC86KD86YWZ0ZXJ8YmVmb3JlfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfHNlbGVjdGlvbil8OjpbLVxcd10rL2csXG5cdFx0J3BzZXVkby1jbGFzcyc6IC86Wy1cXHddKyg/OlxcKC4qXFwpKT8vZyxcblx0XHQnY2xhc3MnOiAvXFwuWy06XFwuXFx3XSsvZyxcblx0XHQnaWQnOiAvI1stOlxcLlxcd10rL2dcblx0fVxufTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQnaGV4Y29kZSc6IC8jW1xcZGEtZl17Myw2fS9naSxcblx0J2VudGl0eSc6IC9cXFxcW1xcZGEtZl17MSw4fS9naSxcblx0J251bWJlcic6IC9bXFxkJVxcLl0rL2dcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MtZXh0cmFzLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFx3XFxXXSo/XFwqXFwvL2csXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLio/KFxccj9cXG58JCkvZyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiAvKFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Oig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzKyl8KD86Y2F0Y2hcXHMrXFwoKSlbYS16MC05X1xcLlxcXFxdKy9pZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC8oXFwufFxcXFwpL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKGlmfGVsc2V8d2hpbGV8ZG98Zm9yfHJldHVybnxpbnxpbnN0YW5jZW9mfGZ1bmN0aW9ufG5ld3x0cnl8dGhyb3d8Y2F0Y2h8ZmluYWxseXxudWxsfGJyZWFrfGNvbnRpbnVlKVxcYi9nLFxuXHQnYm9vbGVhbic6IC9cXGIodHJ1ZXxmYWxzZSlcXGIvZyxcblx0J2Z1bmN0aW9uJzoge1xuXHRcdHBhdHRlcm46IC9bYS16MC05X10rXFwoL2lnLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC9cXCgvXG5cdFx0fVxuXHR9LFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4W1xcZEEtRmEtZl0rfFxcZCpcXC4/XFxkKyhbRWVdLT9cXGQrKT8pXFxiL2csXG5cdCdvcGVyYXRvcic6IC9bLStdezEsMn18IXw8PT98Pj0/fD17MSwzfXwmezEsMn18XFx8P1xcfHxcXD98XFwqfFxcL3xcXH58XFxefFxcJS9nLFxuXHQnaWdub3JlJzogLyYobHR8Z3R8YW1wKTsvZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9nXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZhbHNlfGZpbmFsbHl8Zm9yfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiL2csXG5cdCdudW1iZXInOiAvXFxiLT8oMHhbXFxkQS1GYS1mXSt8XFxkKlxcLj9cXGQrKFtFZV1bKy1dP1xcZCspP3xOYU58LT9JbmZpbml0eSlcXGIvZyxcblx0J2Z1bmN0aW9uJzogLyg/IVxcZClbYS16MC05XyRdKyg/PVxcKCkvaWdcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAndGFnJywge1xuXHRcdCdzY3JpcHQnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvPHNjcmlwdFtcXHdcXFddKj8+W1xcd1xcV10qPzxcXC9zY3JpcHQ+L2lnLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLzxzY3JpcHRbXFx3XFxXXSo/Pnw8XFwvc2NyaXB0Pi9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtamF2YXNjcmlwdCdcblx0XHR9XG5cdH0pO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSA1IDlcbiAqKi8iLCIoZnVuY3Rpb24oUHJpc20pIHtcblxuLy8gSWdub3JlIGNvbW1lbnRzIHN0YXJ0aW5nIHdpdGggeyB0byBwcml2aWxlZ2Ugc3RyaW5nIGludGVycG9sYXRpb24gaGlnaGxpZ2h0aW5nXG52YXIgY29tbWVudCA9IC8jKD8hXFx7KS4rL2csXG4gICAgaW50ZXJwb2xhdGlvbiA9IHtcbiAgICBcdHBhdHRlcm46IC8jXFx7W159XStcXH0vZyxcbiAgICBcdGFsaWFzOiAndmFyaWFibGUnXG4gICAgfTtcblxuUHJpc20ubGFuZ3VhZ2VzLmNvZmZlZXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2phdmFzY3JpcHQnLCB7XG5cdCdjb21tZW50JzogY29tbWVudCxcblx0J3N0cmluZyc6IFtcblxuXHRcdC8vIFN0cmluZ3MgYXJlIG11bHRpbGluZVxuXHRcdC8nKD86XFxcXD9bXFxzXFxTXSkqPycvZyxcblxuXHRcdHtcblx0XHRcdC8vIFN0cmluZ3MgYXJlIG11bHRpbGluZVxuXHRcdFx0cGF0dGVybjogL1wiKD86XFxcXD9bXFxzXFxTXSkqP1wiL2csXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uXG5cdFx0XHR9XG5cdFx0fVxuXHRdLFxuXHQna2V5d29yZCc6IC9cXGIoYW5kfGJyZWFrfGJ5fGNhdGNofGNsYXNzfGNvbnRpbnVlfGRlYnVnZ2VyfGRlbGV0ZXxkb3xlYWNofGVsc2V8ZXh0ZW5kfGV4dGVuZHN8ZmFsc2V8ZmluYWxseXxmb3J8aWZ8aW58aW5zdGFuY2VvZnxpc3xpc250fGxldHxsb29wfG5hbWVzcGFjZXxuZXd8bm98bm90fG51bGx8b2Z8b2ZmfG9ufG9yfG93bnxyZXR1cm58c3VwZXJ8c3dpdGNofHRoZW58dGhpc3x0aHJvd3x0cnVlfHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHdpbmRvd3x3aXRofHllc3x5aWVsZClcXGIvZyxcblx0J2NsYXNzLW1lbWJlcic6IHtcblx0XHRwYXR0ZXJuOiAvQCg/IVxcZClcXHcrLyxcblx0XHRhbGlhczogJ3ZhcmlhYmxlJ1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY29mZmVlc2NyaXB0JywgJ2NvbW1lbnQnLCB7XG5cdCdtdWx0aWxpbmUtY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvIyMjW1xcc1xcU10rPyMjIy9nLFxuXHRcdGFsaWFzOiAnY29tbWVudCdcblx0fSxcblxuXHQvLyBCbG9jayByZWdleHAgY2FuIGNvbnRhaW4gY29tbWVudHMgYW5kIGludGVycG9sYXRpb25cblx0J2Jsb2NrLXJlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IC9cXC97M31bXFxzXFxTXSo/XFwvezN9Lyxcblx0XHRhbGlhczogJ3JlZ2V4Jyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdjb21tZW50JzogY29tbWVudCxcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvblxuXHRcdH1cblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCdpbmxpbmUtamF2YXNjcmlwdCc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFw/W1xcc1xcU10pKj9gL2csXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnZGVsaW1pdGVyJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvZyxcblx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdH0sXG5cdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0fSxcblxuXHQvLyBCbG9jayBzdHJpbmdzXG5cdCdtdWx0aWxpbmUtc3RyaW5nJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8nJydbXFxzXFxTXSo/JycnLyxcblx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogL1wiXCJcIltcXHNcXFNdKj9cIlwiXCIvLFxuXHRcdFx0YWxpYXM6ICdzdHJpbmcnLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdGludGVycG9sYXRpb246IGludGVycG9sYXRpb25cblx0XHRcdH1cblx0XHR9XG5cdF1cblxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQvLyBPYmplY3QgcHJvcGVydHlcblx0J3Byb3BlcnR5JzogLyg/IVxcZClcXHcrKD89XFxzKjooPyE6KSkvZ1xufSk7XG5cbn0oUHJpc20pKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29mZmVlc2NyaXB0LmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmh0dHAgPSB7XG4gICAgJ3JlcXVlc3QtbGluZSc6IHtcbiAgICAgICAgcGF0dGVybjogL14oUE9TVHxHRVR8UFVUfERFTEVURXxPUFRJT05TfFBBVENIfFRSQUNFfENPTk5FQ1QpXFxiXFxzaHR0cHM/OlxcL1xcL1xcUytcXHNIVFRQXFwvWzAtOS5dKy9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIEhUVFAgVmVyYlxuICAgICAgICAgICAgcHJvcGVydHk6IC9eXFxiKFBPU1R8R0VUfFBVVHxERUxFVEV8T1BUSU9OU3xQQVRDSHxUUkFDRXxDT05ORUNUKVxcYi9nLFxuICAgICAgICAgICAgLy8gUGF0aCBvciBxdWVyeSBhcmd1bWVudFxuICAgICAgICAgICAgJ2F0dHItbmFtZSc6IC86XFx3Ky9nXG4gICAgICAgIH1cbiAgICB9LFxuICAgICdyZXNwb25zZS1zdGF0dXMnOiB7XG4gICAgICAgIHBhdHRlcm46IC9eSFRUUFxcLzEuWzAxXSBbMC05XSsuKi9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIFN0YXR1cywgZS5nLiAyMDAgT0tcbiAgICAgICAgICAgIHByb3BlcnR5OiAvWzAtOV0rW0EtWlxccy1dKyQvaWdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gSFRUUCBoZWFkZXIgbmFtZVxuICAgIGtleXdvcmQ6IC9eW1xcdy1dKzooPz0uKykvZ21cbn07XG5cbi8vIENyZWF0ZSBhIG1hcHBpbmcgb2YgQ29udGVudC1UeXBlIGhlYWRlcnMgdG8gbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcbnZhciBodHRwTGFuZ3VhZ2VzID0ge1xuICAgICdhcHBsaWNhdGlvbi9qc29uJzogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAsXG4gICAgJ3RleHQveG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCxcbiAgICAndGV4dC9odG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxufTtcblxuLy8gSW5zZXJ0IGVhY2ggY29udGVudCB0eXBlIHBhcnNlciB0aGF0IGhhcyBpdHMgYXNzb2NpYXRlZCBsYW5ndWFnZVxuLy8gY3VycmVudGx5IGxvYWRlZC5cbmZvciAodmFyIGNvbnRlbnRUeXBlIGluIGh0dHBMYW5ndWFnZXMpIHtcbiAgICBpZiAoaHR0cExhbmd1YWdlc1tjb250ZW50VHlwZV0pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9uc1tjb250ZW50VHlwZV0gPSB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCcoY29udGVudC10eXBlOlxcXFxzKicgKyBjb250ZW50VHlwZSArICdbXFxcXHdcXFxcV10qPylcXFxcblxcXFxuW1xcXFx3XFxcXFddKicsICdnaScpLFxuICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgIHJlc3Q6IGh0dHBMYW5ndWFnZXNbY29udGVudFR5cGVdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2h0dHAnLCAna2V5d29yZCcsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnNjc3MgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKShcXC9cXCpbXFx3XFxXXSo/XFwqXFwvfFxcL1xcLy4qPyhcXHI/XFxufCQpKS9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0Ly8gYXR1cmxlIGlzIGp1c3QgdGhlIEAqKiosIG5vdCB0aGUgZW50aXJlIHJ1bGUgKHRvIGhpZ2hsaWdodCB2YXIgJiBzdHVmZnMpXG5cdC8vICsgYWRkIGFiaWxpdHkgdG8gaGlnaGxpZ2h0IG51bWJlciAmIHVuaXQgZm9yIG1lZGlhIHF1ZXJpZXNcblx0J2F0cnVsZSc6IC9AW1xcdy1dKyg/PVxccysoXFwofFxce3w7KSkvZ2ksXG5cdC8vIHVybCwgY29tcGFzc2lmaWVkXG5cdCd1cmwnOiAvKFstYS16XSstKSp1cmwoPz1cXCgpL2dpLFxuXHQvLyBDU1Mgc2VsZWN0b3IgcmVnZXggaXMgbm90IGFwcHJvcHJpYXRlIGZvciBTYXNzXG5cdC8vIHNpbmNlIHRoZXJlIGNhbiBiZSBsb3QgbW9yZSB0aGluZ3MgKHZhciwgQCBkaXJlY3RpdmUsIG5lc3RpbmcuLilcblx0Ly8gYSBzZWxlY3RvciBtdXN0IHN0YXJ0IGF0IHRoZSBlbmQgb2YgYSBwcm9wZXJ0eSBvciBhZnRlciBhIGJyYWNlIChlbmQgb2Ygb3RoZXIgcnVsZXMgb3IgbmVzdGluZylcblx0Ly8gaXQgY2FuIGNvbnRhaW4gc29tZSBjYXJhY3RlcnMgdGhhdCBhcmVuJ3QgdXNlZCBmb3IgZGVmaW5pbmcgcnVsZXMgb3IgZW5kIG9mIHNlbGVjdG9yLCAmIChwYXJlbnQgc2VsZWN0b3IpLCBvciBpbnRlcnBvbGF0ZWQgdmFyaWFibGVcblx0Ly8gdGhlIGVuZCBvZiBhIHNlbGVjdG9yIGlzIGZvdW5kIHdoZW4gdGhlcmUgaXMgbm8gcnVsZXMgaW4gaXQgKCB7fSBvciB7XFxzfSkgb3IgaWYgdGhlcmUgaXMgYSBwcm9wZXJ0eSAoYmVjYXVzZSBhbiBpbnRlcnBvbGF0ZWQgdmFyXG5cdC8vIGNhbiBcInBhc3NcIiBhcyBhIHNlbGVjdG9yLSBlLmc6IHByb3BlciN7JGVydHl9KVxuXHQvLyB0aGlzIG9uZSB3YXMgYXJkIHRvIGRvLCBzbyBwbGVhc2UgYmUgY2FyZWZ1bCBpZiB5b3UgZWRpdCB0aGlzIG9uZSA6KVxuXHQnc2VsZWN0b3InOiAvKFteQDtcXHtcXH1cXChcXCldPyhbXkA7XFx7XFx9XFwoXFwpXXwmfFxcI1xce1xcJFstX1xcd10rXFx9KSspKD89XFxzKlxceyhcXH18XFxzfFteXFx9XSsoOnxcXHspW15cXH1dKykpL2dtXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdhdHJ1bGUnLCB7XG5cdCdrZXl3b3JkJzogL0AoaWZ8ZWxzZSBpZnxlbHNlfGZvcnxlYWNofHdoaWxlfGltcG9ydHxleHRlbmR8ZGVidWd8d2FybnxtaXhpbnxpbmNsdWRlfGZ1bmN0aW9ufHJldHVybnxjb250ZW50KXwoPz1AZm9yXFxzK1xcJFstX1xcd10rXFxzKStmcm9tL2lcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ3Byb3BlcnR5Jywge1xuXHQvLyB2YXIgYW5kIGludGVycG9sYXRlZCB2YXJzXG5cdCd2YXJpYWJsZSc6IC8oKFxcJFstX1xcd10rKXwoI1xce1xcJFstX1xcd10rXFx9KSkvaVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnZnVuY3Rpb24nLCB7XG5cdCdwbGFjZWhvbGRlcic6IC8lWy1fXFx3XSsvaSxcblx0J3N0YXRlbWVudCc6IC9cXEIhKGRlZmF1bHR8b3B0aW9uYWwpXFxiL2dpLFxuXHQnYm9vbGVhbic6IC9cXGIodHJ1ZXxmYWxzZSlcXGIvZyxcblx0J251bGwnOiAvXFxiKG51bGwpXFxiL2csXG5cdCdvcGVyYXRvcic6IC9cXHMrKFstK117MSwyfXw9ezEsMn18IT18XFx8P1xcfHxcXD98XFwqfFxcL3xcXCUpXFxzKy9nXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzLmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnNxbD0geyBcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKFxcL1xcKltcXHdcXFddKj9cXCpcXC98KCgtLSl8KFxcL1xcLyl8IykuKj8oXFxyP1xcbnwkKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdzdHJpbmcnIDoge1xuXHRcdHBhdHRlcm46IC8oXnxbXkBdKShcInwnKShcXFxcP1tcXHNcXFNdKSo/XFwyL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQndmFyaWFibGUnOiAvQFtcXHcuJF0rfEAoXCJ8J3xgKShcXFxcP1tcXHNcXFNdKSs/XFwxL2csXG5cdCdmdW5jdGlvbic6IC9cXGIoPzpDT1VOVHxTVU18QVZHfE1JTnxNQVh8RklSU1R8TEFTVHxVQ0FTRXxMQ0FTRXxNSUR8TEVOfFJPVU5EfE5PV3xGT1JNQVQpKD89XFxzKlxcKCkvaWcsIC8vIFNob3VsZCB3ZSBoaWdobGlnaHQgdXNlciBkZWZpbmVkIGZ1bmN0aW9ucyB0b28/XG5cdCdrZXl3b3JkJzogL1xcYig/OkFDVElPTnxBRER8QUZURVJ8QUxHT1JJVEhNfEFMVEVSfEFOQUxZWkV8QVBQTFl8QVN8QVNDfEFVVEhPUklaQVRJT058QkFDS1VQfEJEQnxCRUdJTnxCRVJLRUxFWURCfEJJR0lOVHxCSU5BUll8QklUfEJMT0J8Qk9PTHxCT09MRUFOfEJSRUFLfEJST1dTRXxCVFJFRXxCVUxLfEJZfENBTEx8Q0FTQ0FERXxDQVNDQURFRHxDQVNFfENIQUlOfENIQVIgVkFSWUlOR3xDSEFSQUNURVIgVkFSWUlOR3xDSEVDS3xDSEVDS1BPSU5UfENMT1NFfENMVVNURVJFRHxDT0FMRVNDRXxDT0xVTU58Q09MVU1OU3xDT01NRU5UfENPTU1JVHxDT01NSVRURUR8Q09NUFVURXxDT05ORUNUfENPTlNJU1RFTlR8Q09OU1RSQUlOVHxDT05UQUlOU3xDT05UQUlOU1RBQkxFfENPTlRJTlVFfENPTlZFUlR8Q1JFQVRFfENST1NTfENVUlJFTlR8Q1VSUkVOVF9EQVRFfENVUlJFTlRfVElNRXxDVVJSRU5UX1RJTUVTVEFNUHxDVVJSRU5UX1VTRVJ8Q1VSU09SfERBVEF8REFUQUJBU0V8REFUQUJBU0VTfERBVEVUSU1FfERCQ0N8REVBTExPQ0FURXxERUN8REVDSU1BTHxERUNMQVJFfERFRkFVTFR8REVGSU5FUnxERUxBWUVEfERFTEVURXxERU5ZfERFU0N8REVTQ1JJQkV8REVURVJNSU5JU1RJQ3xESVNBQkxFfERJU0NBUkR8RElTS3xESVNUSU5DVHxESVNUSU5DVFJPV3xESVNUUklCVVRFRHxET3xET1VCTEV8RE9VQkxFIFBSRUNJU0lPTnxEUk9QfERVTU1ZfERVTVB8RFVNUEZJTEV8RFVQTElDQVRFIEtFWXxFTFNFfEVOQUJMRXxFTkNMT1NFRCBCWXxFTkR8RU5HSU5FfEVOVU18RVJSTFZMfEVSUk9SU3xFU0NBUEV8RVNDQVBFRCBCWXxFWENFUFR8RVhFQ3xFWEVDVVRFfEVYSVR8RVhQTEFJTnxFWFRFTkRFRHxGRVRDSHxGSUVMRFN8RklMRXxGSUxMRkFDVE9SfEZJUlNUfEZJWEVEfEZMT0FUfEZPTExPV0lOR3xGT1J8Rk9SIEVBQ0ggUk9XfEZPUkNFfEZPUkVJR058RlJFRVRFWFR8RlJFRVRFWFRUQUJMRXxGUk9NfEZVTEx8RlVOQ1RJT058R0VPTUVUUll8R0VPTUVUUllDT0xMRUNUSU9OfEdMT0JBTHxHT1RPfEdSQU5UfEdST1VQfEhBTkRMRVJ8SEFTSHxIQVZJTkd8SE9MRExPQ0t8SURFTlRJVFl8SURFTlRJVFlfSU5TRVJUfElERU5USVRZQ09MfElGfElHTk9SRXxJTVBPUlR8SU5ERVh8SU5GSUxFfElOTkVSfElOTk9EQnxJTk9VVHxJTlNFUlR8SU5UfElOVEVHRVJ8SU5URVJTRUNUfElOVE98SU5WT0tFUnxJU09MQVRJT04gTEVWRUx8Sk9JTnxLRVl8S0VZU3xLSUxMfExBTkdVQUdFIFNRTHxMQVNUfExFRlR8TElNSVR8TElORU5PfExJTkVTfExJTkVTVFJJTkd8TE9BRHxMT0NBTHxMT0NLfExPTkdCTE9CfExPTkdURVhUfE1BVENIfE1BVENIRUR8TUVESVVNQkxPQnxNRURJVU1JTlR8TUVESVVNVEVYVHxNRVJHRXxNSURETEVJTlR8TU9ESUZJRVMgU1FMIERBVEF8TU9ESUZZfE1VTFRJTElORVNUUklOR3xNVUxUSVBPSU5UfE1VTFRJUE9MWUdPTnxOQVRJT05BTHxOQVRJT05BTCBDSEFSIFZBUllJTkd8TkFUSU9OQUwgQ0hBUkFDVEVSfE5BVElPTkFMIENIQVJBQ1RFUiBWQVJZSU5HfE5BVElPTkFMIFZBUkNIQVJ8TkFUVVJBTHxOQ0hBUnxOQ0hBUiBWQVJDSEFSfE5FWFR8Tk98Tk8gU1FMfE5PQ0hFQ0t8Tk9DWUNMRXxOT05DTFVTVEVSRUR8TlVMTElGfE5VTUVSSUN8T0Z8T0ZGfE9GRlNFVFN8T058T1BFTnxPUEVOREFUQVNPVVJDRXxPUEVOUVVFUll8T1BFTlJPV1NFVHxPUFRJTUlaRXxPUFRJT058T1BUSU9OQUxMWXxPUkRFUnxPVVR8T1VURVJ8T1VURklMRXxPVkVSfFBBUlRJQUx8UEFSVElUSU9OfFBFUkNFTlR8UElWT1R8UExBTnxQT0lOVHxQT0xZR09OfFBSRUNFRElOR3xQUkVDSVNJT058UFJFVnxQUklNQVJZfFBSSU5UfFBSSVZJTEVHRVN8UFJPQ3xQUk9DRURVUkV8UFVCTElDfFBVUkdFfFFVSUNLfFJBSVNFUlJPUnxSRUFEfFJFQURTIFNRTCBEQVRBfFJFQURURVhUfFJFQUx8UkVDT05GSUdVUkV8UkVGRVJFTkNFU3xSRUxFQVNFfFJFTkFNRXxSRVBFQVRBQkxFfFJFUExJQ0FUSU9OfFJFUVVJUkV8UkVTVE9SRXxSRVNUUklDVHxSRVRVUk58UkVUVVJOU3xSRVZPS0V8UklHSFR8Uk9MTEJBQ0t8Uk9VVElORXxST1dDT1VOVHxST1dHVUlEQ09MfFJPV1M/fFJUUkVFfFJVTEV8U0FWRXxTQVZFUE9JTlR8U0NIRU1BfFNFTEVDVHxTRVJJQUx8U0VSSUFMSVpBQkxFfFNFU1NJT058U0VTU0lPTl9VU0VSfFNFVHxTRVRVU0VSfFNIQVJFIE1PREV8U0hPV3xTSFVURE9XTnxTSU1QTEV8U01BTExJTlR8U05BUFNIT1R8U09NRXxTT05BTUV8U1RBUlR8U1RBUlRJTkcgQll8U1RBVElTVElDU3xTVEFUVVN8U1RSSVBFRHxTWVNURU1fVVNFUnxUQUJMRXxUQUJMRVN8VEFCTEVTUEFDRXxURU1QKD86T1JBUlkpP3xURU1QVEFCTEV8VEVSTUlOQVRFRCBCWXxURVhUfFRFWFRTSVpFfFRIRU58VElNRVNUQU1QfFRJTllCTE9CfFRJTllJTlR8VElOWVRFWFR8VE98VE9QfFRSQU58VFJBTlNBQ1RJT058VFJBTlNBQ1RJT05TfFRSSUdHRVJ8VFJVTkNBVEV8VFNFUVVBTHxUWVBFfFRZUEVTfFVOQk9VTkRFRHxVTkNPTU1JVFRFRHxVTkRFRklORUR8VU5JT058VU5QSVZPVHxVUERBVEV8VVBEQVRFVEVYVHxVU0FHRXxVU0V8VVNFUnxVU0lOR3xWQUxVRXxWQUxVRVN8VkFSQklOQVJZfFZBUkNIQVJ8VkFSQ0hBUkFDVEVSfFZBUllJTkd8VklFV3xXQUlURk9SfFdBUk5JTkdTfFdIRU58V0hFUkV8V0hJTEV8V0lUSHxXSVRIIFJPTExVUHxXSVRISU58V09SS3xXUklURXxXUklURVRFWFQpXFxiL2dpLFxuXHQnYm9vbGVhbic6IC9cXGIoPzpUUlVFfEZBTFNFfE5VTEwpXFxiL2dpLFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4KT9cXGQqXFwuP1tcXGRhLWZdK1xcYi9nLFxuXHQnb3BlcmF0b3InOiAvXFxiKD86QUxMfEFORHxBTll8QkVUV0VFTnxFWElTVFN8SU58TElLRXxOT1R8T1J8SVN8VU5JUVVFfENIQVJBQ1RFUiBTRVR8Q09MTEFURXxESVZ8T0ZGU0VUfFJFR0VYUHxSTElLRXxTT1VORFMgTElLRXxYT1IpXFxifFstK117MX18IXxbPTw+XXsxLDJ9fCgmKXsxLDJ9fFxcfD9cXHx8XFw/fFxcKnxcXC8vZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9bO1tcXF0oKWAsLl0vZ1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzXG4gKiogbW9kdWxlIGlkID0gNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiLyoqXG4gKiBPcmlnaW5hbCBieSBBYXJvbiBIYXJ1bjogaHR0cDovL2FhaGFjcmVhdGl2ZS5jb20vMjAxMi8wNy8zMS9waHAtc3ludGF4LWhpZ2hsaWdodGluZy1wcmlzbS9cbiAqIE1vZGlmaWVkIGJ5IE1pbGVzIEpvaG5zb246IGh0dHA6Ly9taWxlc2oubWVcbiAqXG4gKiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nOlxuICogXHRcdC0gRXh0ZW5kcyBjbGlrZSBzeW50YXhcbiAqIFx0XHQtIFN1cHBvcnQgZm9yIFBIUCA1LjMrIChuYW1lc3BhY2VzLCB0cmFpdHMsIGdlbmVyYXRvcnMsIGV0YylcbiAqIFx0XHQtIFNtYXJ0ZXIgY29uc3RhbnQgYW5kIGZ1bmN0aW9uIG1hdGNoaW5nXG4gKlxuICogQWRkcyB0aGUgZm9sbG93aW5nIG5ldyB0b2tlbiBjbGFzc2VzOlxuICogXHRcdGNvbnN0YW50LCBkZWxpbWl0ZXIsIHZhcmlhYmxlLCBmdW5jdGlvbiwgcGFja2FnZVxuICovXG5cblByaXNtLmxhbmd1YWdlcy5waHAgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKGFuZHxvcnx4b3J8YXJyYXl8YXN8YnJlYWt8Y2FzZXxjZnVuY3Rpb258Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVjbGFyZXxkZWZhdWx0fGRpZXxkb3xlbHNlfGVsc2VpZnxlbmRkZWNsYXJlfGVuZGZvcnxlbmRmb3JlYWNofGVuZGlmfGVuZHN3aXRjaHxlbmR3aGlsZXxleHRlbmRzfGZvcnxmb3JlYWNofGZ1bmN0aW9ufGluY2x1ZGV8aW5jbHVkZV9vbmNlfGdsb2JhbHxpZnxuZXd8cmV0dXJufHN0YXRpY3xzd2l0Y2h8dXNlfHJlcXVpcmV8cmVxdWlyZV9vbmNlfHZhcnx3aGlsZXxhYnN0cmFjdHxpbnRlcmZhY2V8cHVibGljfGltcGxlbWVudHN8cHJpdmF0ZXxwcm90ZWN0ZWR8cGFyZW50fHRocm93fG51bGx8ZWNob3xwcmludHx0cmFpdHxuYW1lc3BhY2V8ZmluYWx8eWllbGR8Z290b3xpbnN0YW5jZW9mfGZpbmFsbHl8dHJ5fGNhdGNoKVxcYi9pZyxcblx0J2NvbnN0YW50JzogL1xcYltBLVowLTlfXXsyLH1cXGIvZyxcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKFxcL1xcKltcXHdcXFddKj9cXCpcXC98KF58W146XSkoXFwvXFwvfCMpLio/KFxccj9cXG58JCkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2tleXdvcmQnLCB7XG5cdCdkZWxpbWl0ZXInOiAvKFxcPz58PFxcP3BocHw8XFw/KS9pZyxcblx0J3ZhcmlhYmxlJzogLyhcXCRcXHcrKVxcYi9pZyxcblx0J3BhY2thZ2UnOiB7XG5cdFx0cGF0dGVybjogLyhcXFxcfG5hbWVzcGFjZVxccyt8dXNlXFxzKylbXFx3XFxcXF0rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdHB1bmN0dWF0aW9uOiAvXFxcXC9cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBNdXN0IGJlIGRlZmluZWQgYWZ0ZXIgdGhlIGZ1bmN0aW9uIHBhdHRlcm5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdvcGVyYXRvcicsIHtcblx0J3Byb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oLT4pW1xcd10rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuLy8gQWRkIEhUTUwgc3VwcG9ydCBvZiB0aGUgbWFya3VwIGxhbmd1YWdlIGV4aXN0c1xuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblxuXHQvLyBUb2tlbml6ZSBhbGwgaW5saW5lIFBIUCBibG9ja3MgdGhhdCBhcmUgd3JhcHBlZCBpbiA8P3BocCA/PlxuXHQvLyBUaGlzIGFsbG93cyBmb3IgZWFzeSBQSFAgKyBtYXJrdXAgaGlnaGxpZ2h0aW5nXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgIT09ICdwaHAnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZW52LnRva2VuU3RhY2sgPSBbXTtcblxuXHRcdGVudi5iYWNrdXBDb2RlID0gZW52LmNvZGU7XG5cdFx0ZW52LmNvZGUgPSBlbnYuY29kZS5yZXBsYWNlKC8oPzo8XFw/cGhwfDxcXD8pW1xcd1xcV10qPyg/OlxcPz4pL2lnLCBmdW5jdGlvbihtYXRjaCkge1xuXHRcdFx0ZW52LnRva2VuU3RhY2sucHVzaChtYXRjaCk7XG5cblx0XHRcdHJldHVybiAne3t7UEhQJyArIGVudi50b2tlblN0YWNrLmxlbmd0aCArICd9fX0nO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBSZXN0b3JlIGVudi5jb2RlIGZvciBvdGhlciBwbHVnaW5zIChlLmcuIGxpbmUtbnVtYmVycylcblx0UHJpc20uaG9va3MuYWRkKCdiZWZvcmUtaW5zZXJ0JywgZnVuY3Rpb24oZW52KSB7XG5cdFx0aWYgKGVudi5sYW5ndWFnZSA9PT0gJ3BocCcpIHtcblx0XHRcdGVudi5jb2RlID0gZW52LmJhY2t1cENvZGU7XG5cdFx0XHRkZWxldGUgZW52LmJhY2t1cENvZGU7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBSZS1pbnNlcnQgdGhlIHRva2VucyBhZnRlciBoaWdobGlnaHRpbmdcblx0UHJpc20uaG9va3MuYWRkKCdhZnRlci1oaWdobGlnaHQnLCBmdW5jdGlvbihlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlICE9PSAncGhwJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwLCB0OyB0ID0gZW52LnRva2VuU3RhY2tbaV07IGkrKykge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGVudi5oaWdobGlnaHRlZENvZGUucmVwbGFjZSgne3t7UEhQJyArIChpICsgMSkgKyAnfX19JywgUHJpc20uaGlnaGxpZ2h0KHQsIGVudi5ncmFtbWFyLCAncGhwJykpO1xuXHRcdH1cblxuXHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cdH0pO1xuXG5cdC8vIFdyYXAgdG9rZW5zIGluIGNsYXNzZXMgdGhhdCBhcmUgbWlzc2luZyB0aGVtXG5cdFByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgPT09ICdwaHAnICYmIGVudi50eXBlID09PSAnbWFya3VwJykge1xuXHRcdFx0ZW52LmNvbnRlbnQgPSBlbnYuY29udGVudC5yZXBsYWNlKC8oXFx7XFx7XFx7UEhQWzAtOV0rXFx9XFx9XFx9KS9nLCBcIjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwaHBcXFwiPiQxPC9zcGFuPlwiKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEFkZCB0aGUgcnVsZXMgYmVmb3JlIGFsbCBvdGhlcnNcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2NvbW1lbnQnLCB7XG5cdFx0J21hcmt1cCc6IHtcblx0XHRcdHBhdHRlcm46IC88W14/XVxcLz8oLio/KT4vZyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxuXHRcdH0sXG5cdFx0J3BocCc6IC9cXHtcXHtcXHtQSFBbMC05XStcXH1cXH1cXH0vZ1xuXHR9KTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAuanNcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSA1IDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdwaHAnLCAndmFyaWFibGUnLCB7XG5cdCd0aGlzJzogL1xcJHRoaXMvZyxcblx0J2dsb2JhbCc6IC9cXCRfPyhHTE9CQUxTfFNFUlZFUnxHRVR8UE9TVHxGSUxFU3xSRVFVRVNUfFNFU1NJT058RU5WfENPT0tJRXxIVFRQX1JBV19QT1NUX0RBVEF8YXJnY3xhcmd2fHBocF9lcnJvcm1zZ3xodHRwX3Jlc3BvbnNlX2hlYWRlcikvZyxcblx0J3Njb3BlJzoge1xuXHRcdHBhdHRlcm46IC9cXGJbXFx3XFxcXF0rOjovZyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdGtleXdvcmQ6IC8oc3RhdGljfHNlbGZ8cGFyZW50KS8sXG5cdFx0XHRwdW5jdHVhdGlvbjogLyg6OnxcXFxcKS9cblx0XHR9XG5cdH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAtZXh0cmFzLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gNSA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnB5dGhvbj0geyBcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pIy4qPyhcXHI/XFxufCQpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnc3RyaW5nJzogL1wiXCJcIltcXHNcXFNdKz9cIlwiXCJ8JycnW1xcc1xcU10rPycnJ3woXCJ8JykoXFxcXD8uKSo/XFwxL2csXG5cdCdrZXl3b3JkJyA6IC9cXGIoYXN8YXNzZXJ0fGJyZWFrfGNsYXNzfGNvbnRpbnVlfGRlZnxkZWx8ZWxpZnxlbHNlfGV4Y2VwdHxleGVjfGZpbmFsbHl8Zm9yfGZyb218Z2xvYmFsfGlmfGltcG9ydHxpbnxpc3xsYW1iZGF8cGFzc3xwcmludHxyYWlzZXxyZXR1cm58dHJ5fHdoaWxlfHdpdGh8eWllbGQpXFxiL2csXG5cdCdib29sZWFuJyA6IC9cXGIoVHJ1ZXxGYWxzZSlcXGIvZyxcblx0J251bWJlcicgOiAvXFxiLT8oMFtib3hdKT8oPzpbXFxkYS1mXStcXC4/XFxkKnxcXC5cXGQrKSg/OmVbKy1dP1xcZCspP2o/XFxiL2dpLFxuXHQnb3BlcmF0b3InIDogL1stK117MSwyfXw9PyZsdDt8PT8mZ3Q7fCF8PXsxLDJ9fCgmKXsxLDJ9fCgmYW1wOyl7MSwyfXxcXHw/XFx8fFxcP3xcXCp8XFwvfH58XFxefCV8XFxiKG9yfGFuZHxub3QpXFxiL2csXG5cdCdpZ25vcmUnIDogLyYobHR8Z3R8YW1wKTsvZ2ksXG5cdCdwdW5jdHVhdGlvbicgOiAvW3t9W1xcXTsoKSwuOl0vZ1xufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDUgOVxuICoqLyIsIi8qKlxuICogT3JpZ2luYWwgYnkgU2FtdWVsIEZsb3Jlc1xuICpcbiAqIEFkZHMgdGhlIGZvbGxvd2luZyBuZXcgdG9rZW4gY2xhc3NlczpcbiAqIFx0XHRjb25zdGFudCwgYnVpbHRpbiwgdmFyaWFibGUsIHN5bWJvbCwgcmVnZXhcbiAqL1xuUHJpc20ubGFuZ3VhZ2VzLnJ1YnkgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NvbW1lbnQnOiAvI1teXFxyXFxuXSooXFxyP1xcbnwkKS9nLFxuXHQna2V5d29yZCc6IC9cXGIoYWxpYXN8YW5kfEJFR0lOfGJlZ2lufGJyZWFrfGNhc2V8Y2xhc3N8ZGVmfGRlZmluZV9tZXRob2R8ZGVmaW5lZHxkb3xlYWNofGVsc2V8ZWxzaWZ8RU5EfGVuZHxlbnN1cmV8ZmFsc2V8Zm9yfGlmfGlufG1vZHVsZXxuZXd8bmV4dHxuaWx8bm90fG9yfHJhaXNlfHJlZG98cmVxdWlyZXxyZXNjdWV8cmV0cnl8cmV0dXJufHNlbGZ8c3VwZXJ8dGhlbnx0aHJvd3x0cnVlfHVuZGVmfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHlpZWxkKVxcYi9nLFxuXHQnYnVpbHRpbic6IC9cXGIoQXJyYXl8QmlnbnVtfEJpbmRpbmd8Q2xhc3N8Q29udGludWF0aW9ufERpcnxFeGNlcHRpb258RmFsc2VDbGFzc3xGaWxlfFN0YXR8RmlsZXxGaXhudW18RmxvYWR8SGFzaHxJbnRlZ2VyfElPfE1hdGNoRGF0YXxNZXRob2R8TW9kdWxlfE5pbENsYXNzfE51bWVyaWN8T2JqZWN0fFByb2N8UmFuZ2V8UmVnZXhwfFN0cmluZ3xTdHJ1Y3R8VE1TfFN5bWJvbHxUaHJlYWRHcm91cHxUaHJlYWR8VGltZXxUcnVlQ2xhc3MpXFxiLyxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdW2EtekEtWl8wLTldKls/IV0/XFxiL2dcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdydWJ5JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCd2YXJpYWJsZSc6IC9bQCRdK1xcYlthLXpBLVpfXVthLXpBLVpfMC05XSpbPyFdP1xcYi9nLFxuXHQnc3ltYm9sJzogLzpcXGJbYS16QS1aX11bYS16QS1aXzAtOV0qWz8hXT9cXGIvZ1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDUgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5qYXZhID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYihhYnN0cmFjdHxjb250aW51ZXxmb3J8bmV3fHN3aXRjaHxhc3NlcnR8ZGVmYXVsdHxnb3RvfHBhY2thZ2V8c3luY2hyb25pemVkfGJvb2xlYW58ZG98aWZ8cHJpdmF0ZXx0aGlzfGJyZWFrfGRvdWJsZXxpbXBsZW1lbnRzfHByb3RlY3RlZHx0aHJvd3xieXRlfGVsc2V8aW1wb3J0fHB1YmxpY3x0aHJvd3N8Y2FzZXxlbnVtfGluc3RhbmNlb2Z8cmV0dXJufHRyYW5zaWVudHxjYXRjaHxleHRlbmRzfGludHxzaG9ydHx0cnl8Y2hhcnxmaW5hbHxpbnRlcmZhY2V8c3RhdGljfHZvaWR8Y2xhc3N8ZmluYWxseXxsb25nfHN0cmljdGZwfHZvbGF0aWxlfGNvbnN0fGZsb2F0fG5hdGl2ZXxzdXBlcnx3aGlsZSlcXGIvZyxcblx0J251bWJlcic6IC9cXGIwYlswMV0rXFxifFxcYjB4W1xcZGEtZl0qXFwuP1tcXGRhLWZwXFwtXStcXGJ8XFxiXFxkKlxcLj9cXGQrW2VdP1tcXGRdKltkZl1cXGJ8XFxiXFxkKlxcLj9cXGQrXFxiL2dpLFxuXHQnb3BlcmF0b3InOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFwuXSkoPzpcXCs9fFxcK1xcKz98LT18LS0/fCE9P3w8ezEsMn09P3w+ezEsM309P3w9PT98Jj18JiY/fFxcfD18XFx8XFx8P3xcXD98XFwqPT98XFwvPT98JT0/fFxcXj0/fDp8fikvZ20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5qc1xuICoqIG1vZHVsZSBpZCA9IDcxXG4gKiogbW9kdWxlIGNodW5rcyA9IDUgOVxuICoqLyIsIlxuZnVuY3Rpb24gYWRkTGluZU51bWJlcnMocHJlKSB7XG5cbiAgdmFyIGxpbmVzTnVtID0gKDEgKyBwcmUuaW5uZXJIVE1MLnNwbGl0KCdcXG4nKS5sZW5ndGgpO1xuICB2YXIgbGluZU51bWJlcnNXcmFwcGVyO1xuXG4gIHZhciBsaW5lcyA9IG5ldyBBcnJheShsaW5lc051bSk7XG4gIGxpbmVzID0gbGluZXMuam9pbignPHNwYW4+PC9zcGFuPicpO1xuXG4gIGxpbmVOdW1iZXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGluZU51bWJlcnNXcmFwcGVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtcm93cyc7XG4gIGxpbmVOdW1iZXJzV3JhcHBlci5pbm5lckhUTUwgPSBsaW5lcztcblxuICBpZiAocHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdGFydCcpKSB7XG4gICAgcHJlLnN0eWxlLmNvdW50ZXJSZXNldCA9ICdsaW5lbnVtYmVyICcgKyBOdW1iZXIocHJlLmRhdGFzZXQuc3RhcnQpIC0gMTtcbiAgfVxuXG4gIHByZS5hcHBlbmRDaGlsZChsaW5lTnVtYmVyc1dyYXBwZXIpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTGluZU51bWJlcnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wcmlzbS9hZGRMaW5lTnVtYmVycy5qc1xuICoqLyIsIlxuZnVuY3Rpb24gaXNTY3JvbGxlZEludG9WaWV3KGVsZW0pIHtcbiAgdmFyIGNvb3JkcyA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgdmFyIHZpc2libGVIZWlnaHQgPSAwO1xuXG4gIGlmIChjb29yZHMudG9wIDwgMCkge1xuICAgIHZpc2libGVIZWlnaHQgPSBjb29yZHMuYm90dG9tO1xuICB9IGVsc2UgaWYgKGNvb3Jkcy5ib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICB2aXNpYmxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHZpc2libGVIZWlnaHQgPiAxMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Njcm9sbGVkSW50b1ZpZXc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJ0dXRvcmlhbC4yMDliZThiZmI3M2ZhYTI1MDY2MS5qcyJ9
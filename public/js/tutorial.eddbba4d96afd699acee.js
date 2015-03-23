var tutorial =
webpackJsonp_name_([6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var delegate = __webpack_require__(29);
	var prism = __webpack_require__(31);
	var xhr = __webpack_require__(30);
	var TutorialMapModal = __webpack_require__(26);
	
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
	    __webpack_require__.e/* nsure */(7, function () {
	      __webpack_require__(28).init();
	    });
	  }
	};
	
	exports.TutorialMap = __webpack_require__(27);
	
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
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var xhr = __webpack_require__(30);
	
	var delegate = __webpack_require__(29);
	var Modal = __webpack_require__(9);
	var Spinner = __webpack_require__(32);
	var TutorialMap = __webpack_require__(27);
	var trackSticky = __webpack_require__(36);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var throttle = __webpack_require__(47);
	var delegate = __webpack_require__(29);
	
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
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notification = __webpack_require__(19);
	var getCsrfCookie = __webpack_require__(33);
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
/* 31 */
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
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function () {
	  var csrfCookie = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
	  return csrfCookie ? csrfCookie[1] : null;
	};

/***/ },
/* 34 */,
/* 35 */,
/* 36 */
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
	
	var resizeOnload = __webpack_require__(17);
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
	
	var delegate = __webpack_require__(29);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC94aHIuanM/Njg1MioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9nZXRDc3JmQ29va2llLmpzP2QxMmEqIiwid2VicGFjazovLy8uL2NsaWVudC90cmFja1N0aWNreS5qcz84MWI5Iiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9jb2RlQm94LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9jb2RlVGFic0JveC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLWV4dHJhcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNjc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAtZXh0cmFzLmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ydWJ5LmpzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3ByaXNtL2FkZExpbmVOdW1iZXJzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLEtBQUksUUFBUSxHQUFHLG1CQUFPLENBQUMsRUFBaUIsQ0FBQyxDQUFDO0FBQzFDLEtBQUksS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBYyxDQUFDLENBQUM7QUFDcEMsS0FBSSxHQUFHLEdBQUcsbUJBQU8sQ0FBQyxFQUFZLENBQUMsQ0FBQztBQUNoQyxLQUFJLGdCQUFnQixHQUFHLG1CQUFPLENBQUMsRUFBb0IsQ0FBQyxDQUFDOztBQUVyRCxRQUFPLENBQUMsSUFBSSxHQUFHLFlBQVc7O0FBR3hCLGtCQUFlLEVBQUUsQ0FBQztBQUNsQixpQkFBYyxFQUFFLENBQUM7O0FBRWpCLHVCQUFvQixFQUFFLENBQUM7O0FBRXZCLFdBQVEsQ0FBQyxRQUFRLEVBQUUsZ0NBQThCLEVBQUUsT0FBTyxFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzFFLFNBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUN2QixVQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDOztBQUVILFFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFYixPQUFJ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QUcsa0JBQWtCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBwcmlzbSA9IHJlcXVpcmUoJ2NsaWVudC9wcmlzbScpO1xudmFyIHhociA9IHJlcXVpcmUoJ2NsaWVudC94aHInKTtcbnZhciBUdXRvcmlhbE1hcE1vZGFsID0gcmVxdWlyZSgnLi90dXRvcmlhbE1hcE1vZGFsJyk7XG5cbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgaW5pdFRhc2tCdXR0b25zKCk7XG4gIGluaXRGb2xkZXJMaXN0KCk7XG5cbiAgaW5pdFNpZGViYXJIaWdobGlnaHQoKTtcblxuICBkZWxlZ2F0ZShkb2N1bWVudCwgJ1tkYXRhLWFjdGlvbj1cInR1dG9yaWFsLW1hcFwiXScsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbmV3IFR1dG9yaWFsTWFwTW9kYWwoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBwcmlzbS5pbml0KCk7XG5cbiAgaWYgKHdpbmRvdy5pc0Vib29rKSB7XG4gICAgcmVxdWlyZS5lbnN1cmUoJy4vZWJvb2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlcXVpcmUoJy4vZWJvb2snKS5pbml0KCk7XG4gICAgfSwgJ2Vib29rJyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuVHV0b3JpYWxNYXAgPSByZXF1aXJlKCcuL3R1dG9yaWFsTWFwJyk7XG5cbmZ1bmN0aW9uIGluaXRTaWRlYmFySGlnaGxpZ2h0KCkge1xuXG4gIGZ1bmN0aW9uIGhpZ2hsaWdodCgpIHtcblxuICAgIHZhciBjdXJyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2lkZWJhcl9fbmF2aWdhdGlvbi1saW5rX2FjdGl2ZScpO1xuICAgIGlmIChjdXJyZW50WzBdKSBjdXJyZW50WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXJfX25hdmlnYXRpb24tbGlua19hY3RpdmUnKTtcblxuICAgIHZhciBoMnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDInKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGgycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGgyID0gaDJzW2ldO1xuICAgICAgLy8gZmlyc3QgaW4tcGFnZSBoZWFkZXJcbiAgICAgIGlmIChoMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiAwKSBicmVhaztcbiAgICB9XG4gICAgaS0tOyAvLyB3ZSBuZWVkIHRoZSBvbmUgYmVmb3JlIGl0IChjdXJyZW50bHkgcmVhZGluZylcblxuICAgIGlmIChpPj0wKSB7XG4gICAgICB2YXIgaHJlZiA9IGgyc1tpXS5maXJzdEVsZW1lbnRDaGlsZCAmJiBoMnNbaV0uZmlyc3RFbGVtZW50Q2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICB2YXIgbGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fbmF2aWdhdGlvbi1saW5rIGFbaHJlZj1cIicgKyBocmVmICsgJ1wiXScpO1xuICAgICAgaWYgKGhyZWYgJiYgbGkpIHtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9fbmF2aWdhdGlvbi1saW5rX2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGhpZ2hsaWdodCgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhpZ2hsaWdodCk7XG4gIH0pO1xuXG5cbn1cblxuXG5mdW5jdGlvbiBpbml0VGFza0J1dHRvbnMoKSB7XG4gIC8vIHNvbHV0aW9uIGJ1dHRvblxuICBkZWxlZ2F0ZShkb2N1bWVudCwgJy50YXNrX19zb2x1dGlvbicsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50YXNrJykuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fYW5zd2VyX29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gY2xvc2Ugc29sdXRpb24gYnV0dG9uXG4gIGRlbGVnYXRlKGRvY3VtZW50LCAnLnRhc2tfX2Fuc3dlci1jbG9zZScsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50YXNrJykuY2xhc3NMaXN0LnRvZ2dsZSgndGFza19fYW5zd2VyX29wZW4nKTtcbiAgfSk7XG5cbiAgLy8gZXZlcnkgc3RlcCBidXR0b24gKGlmIGFueSBzdGVwcylcbiAgZGVsZWdhdGUoZG9jdW1lbnQsICcudGFza19fc3RlcC1zaG93JywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2tfX3N0ZXAnKS5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX19zdGVwX29wZW4nKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRGb2xkZXJMaXN0KCkge1xuICBkZWxlZ2F0ZShkb2N1bWVudCwgJy5sZXNzb25zLWxpc3RfX2xlc3Nvbl9sZXZlbF8xID4gLmxlc3NvbnMtbGlzdF9fbGluaycsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGxpbmsgPSBldmVudC5kZWxlZ2F0ZVRhcmdldDtcbiAgICB2YXIgb3BlbkZvbGRlciA9IGxpbmsuY2xvc2VzdCgnLmxlc3NvbnMtbGlzdCcpLnF1ZXJ5U2VsZWN0b3IoJy5sZXNzb25zLWxpc3RfX2xlc3Nvbl9vcGVuJyk7XG4gICAgLy8gY2xvc2UgdGhlIHByZXZpb3VzIG9wZW4gZm9sZGVyICh0aHVzIG1ha2luZyBhbiBhY2NvcmRpb24pXG4gICAgaWYgKG9wZW5Gb2xkZXIgJiYgb3BlbkZvbGRlciAhPSBsaW5rLnBhcmVudE5vZGUpIHtcbiAgICAgIG9wZW5Gb2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGVzc29ucy1saXN0X19sZXNzb25fb3BlbicpO1xuICAgIH1cbiAgICBsaW5rLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnbGVzc29ucy1saXN0X19sZXNzb25fb3BlbicpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2hhbmRsZXJzL3R1dG9yaWFsL2NsaWVudC9pbmRleC5qc1xuICoqLyIsInZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG5cbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xudmFyIE1vZGFsID0gcmVxdWlyZSgnY2xpZW50L2hlYWQvbW9kYWwnKTtcbnZhciBTcGlubmVyID0gcmVxdWlyZSgnY2xpZW50L3NwaW5uZXInKTtcbnZhciBUdXRvcmlhbE1hcCA9IHJlcXVpcmUoJy4vdHV0b3JpYWxNYXAnKTtcbnZhciB0cmFja1N0aWNreSA9IHJlcXVpcmUoJ2NsaWVudC90cmFja1N0aWNreScpO1xuXG4vKipcbiAqIE9wdGlvbnM6XG4gKiAgIC0gY2FsbGJhY2s6IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhZnRlciBzdWNjZXNzZnVsIGxvZ2luIChieSBkZWZhdWx0IC0gZ28gdG8gc3VjY2Vzc1JlZGlyZWN0KVxuICogICAtIG1lc3NhZ2U6IGZvcm0gbWVzc2FnZSB0byBiZSBzaG93biB3aGVuIHRoZSBsb2dpbiBmb3JtIGFwcGVhcnMgKFwiTG9nIGluIHRvIGxlYXZlIHRoZSBjb21tZW50XCIpXG4gKiAgIC0gc3VjY2Vzc1JlZGlyZWN0OiB0aGUgcGFnZSB0byByZWRpcmVjdCAoY3VycmVudCBwYWdlIGJ5IGRlZmF1bHQpXG4gKiAgICAgICAtIGFmdGVyIGltbWVkaWF0ZSBsb2dpblxuICogICAgICAgLSBhZnRlciByZWdpc3RyYXRpb24gZm9yIFwiY29uZmlybSBlbWFpbFwiIGxpbmtcbiAqL1xuZnVuY3Rpb24gVHV0b3JpYWxNYXBNb2RhbCgpIHtcbiAgTW9kYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKCk7XG4gIHRoaXMuc2V0Q29udGVudChzcGlubmVyLmVsZW0pO1xuICBzcGlubmVyLnN0YXJ0KCk7XG5cbiAgdmFyIHJlcXVlc3QgPSB0aGlzLnJlcXVlc3Qoe1xuICAgIHVybDogJy90dXRvcmlhbC9tYXAnXG4gIH0pO1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSAndHV0b3JpYWwtbWFwLW92ZXJsYXknO1xuICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gZXZlbnQucmVzdWx0ICsgJzxidXR0b24gY2xhc3M9XCJjbG9zZS1idXR0b24gdHV0b3JpYWwtbWFwLW92ZXJsYXlfX2Nsb3NlXCI+PC9idXR0b24+JztcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFsLW1hcF9vbicpO1xuICAgIHNlbGYuc2V0Q29udGVudCh3cmFwcGVyKTtcblxuICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJhY2tTdGlja3kpO1xuXG4gICAgbmV3IFR1dG9yaWFsTWFwKHNlbGYuY29udGVudEVsZW0uZmlyc3RFbGVtZW50Q2hpbGQpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLnJlbW92ZSgpO1xuICB9KTtcblxufVxuXG5UdXRvcmlhbE1hcE1vZGFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoTW9kYWwucHJvdG90eXBlKTtcblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihUdXRvcmlhbE1hcE1vZGFsLnByb3RvdHlwZSk7XG5cblR1dG9yaWFsTWFwTW9kYWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBNb2RhbC5wcm90b3R5cGUucmVtb3ZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgndHV0b3JpYWwtbWFwX29uJyk7XG59O1xuXG5UdXRvcmlhbE1hcE1vZGFsLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgcmVxdWVzdCA9IHhocihvcHRpb25zKTtcblxuICByZXR1cm4gcmVxdWVzdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHV0b3JpYWxNYXBNb2RhbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwTW9kYWwuanNcbiAqKi8iLCJ2YXIgdGhyb3R0bGUgPSByZXF1aXJlKCdsaWIvdGhyb3R0bGUnKTtcbnZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xuXG5mdW5jdGlvbiBUdXRvcmlhbE1hcChlbGVtKSB7XG4gIHRoaXMuZWxlbSA9IGVsZW07XG5cbiAgdGhpcy5zaG93VGFza3NDaGVja2JveCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtdHV0b3JpYWwtbWFwLXNob3ctdGFza3NdJyk7XG4gIHRoaXMuc2hvd1Rhc2tzQ2hlY2tib3guY2hlY2tlZCA9ICtsb2NhbFN0b3JhZ2Uuc2hvd1Rhc2tzQ2hlY2tib3g7XG5cbiAgdGhpcy51cGRhdGVTaG93VGFza3MoKTtcblxuICB0aGlzLnNob3dUYXNrc0NoZWNrYm94Lm9uY2hhbmdlID0gdGhpcy51cGRhdGVTaG93VGFza3MuYmluZCh0aGlzKTtcblxuICB0aGlzLmZpbHRlcklucHV0ID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXR1dG9yaWFsLW1hcC1maWx0ZXJdJyk7XG4gIHRoaXMudGV4dElucHV0QmxvY2sgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLnR1dG9yaWFsLW1hcF9fZmlsdGVyIC50ZXh0LWlucHV0Jyk7XG5cbiAgdGhpcy5sYXlvdXRTd2l0Y2ggPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtdHV0b3JpYWwtbWFwLWxheW91dC1zd2l0Y2hdJyk7XG4gIHZhciBpc01hcFNpbmdsZUNvbHVtbiA9ICtsb2NhbFN0b3JhZ2UuaXNNYXBTaW5nbGVDb2x1bW47XG4gIHRoaXMubGF5b3V0U3dpdGNoLnF1ZXJ5U2VsZWN0b3IoJ1t2YWx1ZT1cIjBcIl0nKS5jaGVja2VkID0gIWlzTWFwU2luZ2xlQ29sdW1uO1xuICB0aGlzLmxheW91dFN3aXRjaC5xdWVyeVNlbGVjdG9yKCdbdmFsdWU9XCIxXCJdJykuY2hlY2tlZCA9IGlzTWFwU2luZ2xlQ29sdW1uO1xuICB0aGlzLnVwZGF0ZUxheW91dCgpO1xuICB0aGlzLmxheW91dFN3aXRjaC5vbmNoYW5nZSA9IHRoaXMub25MYXlvdXRTd2l0Y2hDaGFuZ2UuYmluZCh0aGlzKTtcblxuICB0aGlzLmZpbHRlcklucHV0Lm9uaW5wdXQgPSB0aGlzLm9uRmlsdGVySW5wdXQuYmluZCh0aGlzKTtcbiAgdGhpcy5maWx0ZXJJbnB1dC5vbmtleWRvd24gPSB0aGlzLm9uRmlsdGVyS2V5ZG93bi5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJykub25jbGljayA9ICgpID0+IHtcbiAgICB0aGlzLmZpbHRlcklucHV0LnZhbHVlID0gJyc7XG4gICAgdGhpcy5zaG93Q2xlYXJCdXR0b24oZmFsc2UpO1xuICAgIHRoaXMuZmlsdGVyKCcnKTtcbiAgfTtcblxuICB0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UudHV0b3JpYWxNYXBDaGFwdGVycyB8fCBcInt9XCIpO1xuICB0aGlzLnNob3dDaGFwdGVyc0NvbGxhcHNlZCgpO1xuXG4gIHRoaXMuZGVsZWdhdGUoJy50dXRvcmlhbC1tYXBfX2l0ZW0gPiAudHV0b3JpYWwtbWFwX19saW5rJywgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBocmVmID0gZXZlbnQuZGVsZWdhdGVUYXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgaWYgKHRoaXMuY2hhcHRlcnNDb2xsYXBzZWRbaHJlZl0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2hyZWZdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkW2hyZWZdID0gMTtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnR1dG9yaWFsTWFwQ2hhcHRlcnMgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmNoYXB0ZXJzQ29sbGFwc2VkKTtcbiAgICB0aGlzLnNob3dDaGFwdGVyc0NvbGxhcHNlZCgpO1xuICB9KTtcblxuICB2YXIgYWN0aXZlTGluayA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbaHJlZj1cIicgKyBsb2NhdGlvbi5wYXRobmFtZSArICdcIl0nKTtcbiAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFsLW1hcF9fbGlua19hY3RpdmUnKTtcbiAgfVxuXG4gIHRoaXMuZm9jdXMoKTtcblxufVxuXG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS5zaG93Q2hhcHRlcnNDb2xsYXBzZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxpbmtzID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX2l0ZW0gPiAudHV0b3JpYWwtbWFwX19saW5rJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbGluayA9IGxpbmtzW2ldO1xuXG4gICAgaWYgKHRoaXMuY2hhcHRlcnNDb2xsYXBzZWRbbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKV0pIHtcbiAgICAgIGxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd0dXRvcmlhbC1tYXBfX2l0ZW1fY29sbGFwc2VkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmsucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd0dXRvcmlhbC1tYXBfX2l0ZW1fY29sbGFwc2VkJyk7XG4gICAgfVxuICB9XG59O1xuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUub25MYXlvdXRTd2l0Y2hDaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICB0aGlzLnVwZGF0ZUxheW91dCgpO1xufTtcblxuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpc01hcFNpbmdsZUNvbHVtbiA9ICt0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignW25hbWU9XCJtYXAtbGF5b3V0XCJdOmNoZWNrZWQnKS52YWx1ZTtcbiAgaWYgKGlzTWFwU2luZ2xlQ29sdW1uKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFsLW1hcF9zaW5nbGVjb2wnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZSgndHV0b3JpYWwtbWFwX3NpbmdsZWNvbCcpO1xuICB9XG5cbiAgbG9jYWxTdG9yYWdlLmlzTWFwU2luZ2xlQ29sdW1uID0gaXNNYXBTaW5nbGVDb2x1bW4gPyBcIjFcIiA6IFwiMFwiO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLnVwZGF0ZVNob3dUYXNrcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zaG93VGFza3NDaGVja2JveC5jaGVja2VkKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ3R1dG9yaWFsLW1hcF9zaG93LXRhc2tzJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3R1dG9yaWFsLW1hcF9zaG93LXRhc2tzJyk7XG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2hvd1Rhc2tzQ2hlY2tib3ggPSB0aGlzLnNob3dUYXNrc0NoZWNrYm94LmNoZWNrZWQgPyBcIjFcIiA6IFwiMFwiO1xufTtcblxuVHV0b3JpYWxNYXAucHJvdG90eXBlLm9uRmlsdGVySW5wdXQgPSBmdW5jdGlvbihldmVudCkge1xuICB0aGlzLnNob3dDbGVhckJ1dHRvbihldmVudC50YXJnZXQudmFsdWUpO1xuICB0aGlzLnRocm90dGxlRmlsdGVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XG59O1xuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUub25GaWx0ZXJLZXlkb3duID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHsgLy8gZXNjYXBlXG4gICAgdGhpcy5maWx0ZXJJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuc2hvd0NsZWFyQnV0dG9uKGZhbHNlKTtcbiAgICB0aGlzLmZpbHRlcignJyk7XG4gIH1cbn07XG5cblR1dG9yaWFsTWFwLnByb3RvdHlwZS5zaG93Q2xlYXJCdXR0b24gPSBmdW5jdGlvbihzaG93KSB7XG4gIGlmIChzaG93KSB7XG4gICAgdGhpcy50ZXh0SW5wdXRCbG9jay5jbGFzc0xpc3QuYWRkKCd0ZXh0LWlucHV0X2NsZWFyLWJ1dHRvbicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudGV4dElucHV0QmxvY2suY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1pbnB1dF9jbGVhci1idXR0b24nKTtcbiAgfVxufTtcblxuLy8gZm9jdXMgb24gdGhlIG1hcCBpdHNlbGYsIHRvIGFsbG93IGltbWVkaWF0ZSBzY3JvbGxpbmcgd2l0aCBhcnJvdyB1cC9kb3duIGtleXNcblR1dG9yaWFsTWFwLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW0udGFiSW5kZXggPSAtMTtcbiAgdGhpcy5lbGVtLmZvY3VzKCk7XG59O1xuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgc2hvd2luZ1Rhc2tzID0gdGhpcy5zaG93VGFza3NDaGVja2JveC5jaGVja2VkO1xuXG4gIHZhciBsaW5rcyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCcudHV0b3JpYWwtbWFwLWxpbmsnKTtcblxuICB2YXIgdG9wSXRlbXMgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvckFsbCgnLnR1dG9yaWFsLW1hcF9faXRlbScpO1xuXG4gIGZ1bmN0aW9uIGNoZWNrTGlNYXRjaChsaSkge1xuICAgIHJldHVybiBpc1N1YlNlcXVlbmNlKGxpLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5pbm5lckhUTUwudG9Mb3dlckNhc2UoKSwgdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKSk7XG4gIH1cblxuICAvLyBhbiBpdGVtIGlzIHNob3duIGlmIGFueSBvZiBpdHMgY2hpbGRyZW4gaXMgc2hvd24gT1IgaXQncyBsaW5rIG1hdGNoZXMgdGhlIGZpbHRlclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRvcEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpID0gdG9wSXRlbXNbaV07XG4gICAgdmFyIHN1Ykl0ZW1zID0gbGkucXVlcnlTZWxlY3RvckFsbCgnLnR1dG9yaWFsLW1hcF9fc3ViLWl0ZW0nKTtcblxuICAgIHZhciBjaGlsZE1hdGNoID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKHN1Ykl0ZW1zLCBmdW5jdGlvbihwcmV2VmFsdWUsIHN1Ykl0ZW0pIHtcblxuICAgICAgdmFyIGNoaWxkTWF0Y2ggPSBmYWxzZTtcblxuICAgICAgaWYgKHNob3dpbmdUYXNrcykge1xuICAgICAgICB2YXIgc3ViSXRlbXMgPSBzdWJJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50dXRvcmlhbC1tYXBfX3N1Yi1zdWItaXRlbScpO1xuICAgICAgICBjaGlsZE1hdGNoID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKHN1Ykl0ZW1zLCBmdW5jdGlvbihwcmV2VmFsdWUsIHN1Ykl0ZW0pIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBjaGVja0xpTWF0Y2goc3ViSXRlbSk7XG4gICAgICAgICAgc3ViSXRlbS5oaWRkZW4gPSAhbWF0Y2g7XG4gICAgICAgICAgcmV0dXJuIHByZXZWYWx1ZSB8fCBtYXRjaDtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBjaGlsZE1hdGNoIHx8IGNoZWNrTGlNYXRjaChzdWJJdGVtKTtcbiAgICAgIC8vY29uc29sZS5sb2coc3ViSXRlbSwgbWF0Y2gpO1xuICAgICAgc3ViSXRlbS5oaWRkZW4gPSAhbWF0Y2g7XG5cbiAgICAgIHJldHVybiBwcmV2VmFsdWUgfHwgbWF0Y2g7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgbGkuaGlkZGVuID0gIShjaGlsZE1hdGNoIHx8IGNoZWNrTGlNYXRjaChsaSkpO1xuXG4gIH1cblxufTtcblxuXG5UdXRvcmlhbE1hcC5wcm90b3R5cGUudGhyb3R0bGVGaWx0ZXIgPSB0aHJvdHRsZShUdXRvcmlhbE1hcC5wcm90b3R5cGUuZmlsdGVyLCAyMDApO1xuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihUdXRvcmlhbE1hcC5wcm90b3R5cGUpO1xuXG5cbmZ1bmN0aW9uIGlzU3ViU2VxdWVuY2Uoc3RyMSwgc3RyMikge1xuICB2YXIgaSA9IDA7XG4gIHZhciBqID0gMDtcbiAgd2hpbGUgKGkgPCBzdHIxLmxlbmd0aCAmJiBqIDwgc3RyMi5sZW5ndGgpIHtcbiAgICBpZiAoc3RyMVtpXSA9PSBzdHIyW2pdKSB7XG4gICAgICBpKys7XG4gICAgICBqKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGogPT0gc3RyMi5sZW5ndGg7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBUdXRvcmlhbE1hcDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L3R1dG9yaWFsTWFwLmpzXG4gKiovIiwidmFyIG5vdGlmaWNhdGlvbiA9IHJlcXVpcmUoJ2NsaWVudC9ub3RpZmljYXRpb24nKTtcbnZhciBnZXRDc3JmQ29va2llID0gcmVxdWlyZSgnY2xpZW50L2dldENzcmZDb29raWUnKTtcbi8vIFdyYXBwZXIgYWJvdXQgWEhSXG4vLyAjIEdsb2JhbCBFdmVudHNcbi8vIHRyaWdnZXJzIGRvY3VtZW50LmxvYWRzdGFydC9sb2FkZW5kIG9uIGNvbW11bmljYXRpb24gc3RhcnQvZW5kXG4vLyAgICAtLT4gdW5sZXNzIG9wdGlvbnMubm9HbG9iYWxFdmVudHMgaXMgc2V0XG4vL1xuLy8gIyBFdmVudHNcbi8vIHRyaWdnZXJzIGZhaWwvc3VjY2VzcyBvbiBsb2FkIGVuZDpcbi8vICAgIC0tPiBieSBkZWZhdWx0IHN0YXR1cz0yMDAgaXMgb2ssIHRoZSBvdGhlcnMgYXJlIGZhaWx1cmVzXG4vLyAgICAtLT4gb3B0aW9ucy5ub3JtYWxTdGF0dXNlcyA9IFsyMDEsNDA5XSBhbGxvdyBnaXZlbiBzdGF0dXNlc1xuLy8gICAgLS0+IGZhaWwgZXZlbnQgaGFzIC5yZWFzb24gZmllbGRcbi8vICAgIC0tPiBzdWNjZXNzIGV2ZW50IGhhcyAucmVzdWx0IGZpZWxkXG4vL1xuLy8gIyBKU09OXG4vLyAgICAtLT4gc2VuZChvYmplY3QpIGNhbGxzIEpTT04uc3RyaW5naWZ5XG4vLyAgICAtLT4gYWRkcyBBY2NlcHQ6IGpzb24gKHdlIHdhbnQganNvbikgYnkgZGVmYXVsdCwgdW5sZXNzIG9wdGlvbnMucmF3XG4vLyBpZiBvcHRpb25zLmpzb24gb3Igc2VydmVyIHJldHVybmVkIGpzb24gY29udGVudCB0eXBlXG4vLyAgICAtLT4gYXV0b3BhcnNlIGpzb25cbi8vICAgIC0tPiBmYWlsIGlmIGVycm9yXG4vL1xuLy8gIyBDU1JGXG4vLyAgICAtLT4gcmVxdWVzdHMgc2VuZHMgaGVhZGVyIFgtWFNSRi1UT0tFTiBmcm9tIGNvb2tpZVxuXG5mdW5jdGlvbiB4aHIob3B0aW9ucykge1xuXG4gIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgdmFyIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cbiAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLnN5bmMgPyBmYWxzZSA6IHRydWUpO1xuXG4gIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIHRva2VuL2hlYWRlciBuYW1lcyBzYW1lIGFzIGFuZ3VsYXIgJGh0dHAgZm9yIGVhc2llciBpbnRlcm9wXG4gIHZhciBjc3JmQ29va2llID0gZ2V0Q3NyZkNvb2tpZSgpXG4gIGlmIChjc3JmQ29va2llICYmICFvcHRpb25zLnNraXBDc3JmKSB7XG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1YU1JGLVRPS0VOXCIsIGNzcmZDb29raWUpO1xuICB9XG5cbiAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoYm9keSkgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyBtdXN0IGJlIE9QRU5lZCB0byBzZXRSZXF1ZXN0SGVhZGVyXG4gICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgfVxuXG5cbiAgaWYgKCFvcHRpb25zLm5vR2xvYmFsRXZlbnRzKSB7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBldmVudCA9PiB7XG4gICAgICB2YXIgZSA9IHdyYXBFdmVudCgneGhyc3RhcnQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJlbmQnLCBldmVudCk7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdWNjZXNzJywgZXZlbnQpO1xuICAgICAgZS5yZXN1bHQgPSBldmVudC5yZXN1bHQ7XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZmFpbCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJmYWlsJywgZXZlbnQpO1xuICAgICAgZS5yZWFzb24gPSBldmVudC5yZWFzb247XG4gICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLnJhdykgeyAvLyBtZWFucyB3ZSB3YW50IGpzb25cbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB9XG5cbiAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgXCJYTUxIdHRwUmVxdWVzdFwiKTtcblxuICB2YXIgbm9ybWFsU3RhdHVzZXMgPSBvcHRpb25zLm5vcm1hbFN0YXR1c2VzIHx8IFsyMDBdO1xuXG4gIGZ1bmN0aW9uIHdyYXBFdmVudChuYW1lLCBlKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQgPSBlO1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhaWwocmVhc29uLCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJmYWlsXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVhc29uID0gcmVhc29uO1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2Nlc3MocmVzdWx0LCBvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSB3cmFwRXZlbnQoXCJzdWNjZXNzXCIsIG9yaWdpbmFsRXZlbnQpO1xuICAgIGUucmVzdWx0ID0gcmVzdWx0O1xuICAgIHJlcXVlc3QuZGlzcGF0Y2hFdmVudChlKTtcbiAgfVxuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0YHQstGP0LfQuCDRgSDRgdC10YDQstC10YDQvtC8LlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0J/RgNC10LLRi9GI0LXQvdC+INC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNC+0LUg0LLRgNC10LzRjyDQvtC20LjQtNCw0L3QuNGPINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgfSk7XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZSA9PiB7XG4gICAgZmFpbChcItCX0LDQv9GA0L7RgSDQsdGL0Lsg0L/RgNC10YDQstCw0L0uXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGUgPT4ge1xuICAgIGlmICghcmVxdWVzdC5zdGF0dXMpIHsgLy8gZG9lcyB0aGF0IGV2ZXIgaGFwcGVuP1xuICAgICAgZmFpbChcItCd0LUg0L/QvtC70YPRh9C10L0g0L7RgtCy0LXRgiDQvtGCINGB0LXRgNCy0LXRgNCwLlwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsU3RhdHVzZXMuaW5kZXhPZihyZXF1ZXN0LnN0YXR1cykgPT0gLTEpIHtcbiAgICAgIGZhaWwoXCLQntGI0LjQsdC60LAg0L3QsCDRgdGC0L7RgNC+0L3QtSDRgdC10YDQstC10YDQsCAo0LrQvtC0IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiksINC/0L7Qv9GL0YLQsNC50YLQtdGB0Ywg0L/QvtC30LTQvdC10LVcIiwgZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgIHZhciBjb250ZW50VHlwZSA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoXCJDb250ZW50LVR5cGVcIik7XG4gICAgaWYgKGNvbnRlbnRUeXBlLm1hdGNoKC9eYXBwbGljYXRpb25cXC9qc29uLykgfHwgb3B0aW9ucy5qc29uKSB7IC8vIGF1dG9wYXJzZSBqc29uIGlmIFdBTlQgb3IgUkVDRUlWRUQganNvblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQvtGC0LLQtdGC0LAg0L7RgiDRgdC10YDQstC10YDQsFwiLCBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1Y2Nlc3MocmVzdWx0LCBlKTtcbiAgfSk7XG5cbiAgLy8gZGVmZXIgdG8gbGV0IG90aGVyIGhhbmRsZXJzIGJlIGFzc2lnbmVkXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgcmVxdWVzdC5zZW5kKGJvZHkpO1xuICB9LCAwKTtcblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZFVybFBhcmFtKHVybCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHBhcmFtID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgaWYgKH51cmwuaW5kZXhPZignPycpKSB7XG4gICAgcmV0dXJuIHVybCArICcmJyArIHBhcmFtO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cmwgKyAnPycgKyBwYXJhbTtcbiAgfVxuXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3hocmZhaWwnLCBmdW5jdGlvbihldmVudCkge1xuICBuZXcgbm90aWZpY2F0aW9uLkVycm9yKGV2ZW50LnJlYXNvbik7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHhocjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3hoci5qc1xuICoqLyIsInJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLWV4dHJhcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvZmZlZXNjcmlwdC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLWV4dHJhcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhLmpzJyk7XG5cblByaXNtLnRva2VuVGFnID0gJ2NvZGUnOyAvLyBmb3IgaUJvb2tzIHRvIHVzZSBtb25vc3BhY2UgZm9udFxuXG52YXIgQ29kZUJveCA9IHJlcXVpcmUoJy4vY29kZUJveCcpO1xudmFyIENvZGVUYWJzQm94ID0gcmVxdWlyZSgnLi9jb2RlVGFic0JveCcpO1xuXG5mdW5jdGlvbiBpbml0Q29kZUJveGVzKGNvbnRhaW5lcikge1xuXG4gIC8vIGhpZ2hsaWdodCBpbmxpbmVcbiAgdmFyIGNvZGVFeGFtcGxlRWxlbXMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNvZGUtZXhhbXBsZTpub3QoW2RhdGEtcHJpc20tZG9uZV0pJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlRXhhbXBsZUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNvZGVFeGFtcGxlRWxlbSA9IGNvZGVFeGFtcGxlRWxlbXNbaV07XG4gICAgbmV3IENvZGVCb3goY29kZUV4YW1wbGVFbGVtKTtcbiAgICBjb2RlRXhhbXBsZUVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByaXNtLWRvbmUnLCAnMScpO1xuICB9XG5cbn1cblxuXG5mdW5jdGlvbiBpbml0Q29kZVRhYnNCb3goY29udGFpbmVyKSB7XG5cbiAgdmFyIGVsZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5jb2RlLXRhYnM6bm90KFtkYXRhLXByaXNtLWRvbmVdKScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBuZXcgQ29kZVRhYnNCb3goZWxlbXNbaV0pO1xuICAgIGVsZW1zW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlzbS1kb25lJywgJzEnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgUHJpc20uaGlnaGxpZ2h0QWxsKTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaGlnaGxpZ2h0KGRvY3VtZW50KTtcbiAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodChlbGVtKSB7XG4gIGluaXRDb2RlQm94ZXMoZWxlbSk7XG4gIGluaXRDb2RlVGFic0JveChlbGVtKTtcbn1cblxuZXhwb3J0cy5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY3NyZkNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvWFNSRi1UT0tFTj0oW1xcdy1dKykvKTtcbiAgcmV0dXJuIGNzcmZDb29raWUgPyBjc3JmQ29va2llWzFdIDogbnVsbDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2dldENzcmZDb29raWUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYWNrU3RpY2t5O1xuXG5cbmZ1bmN0aW9uIHRyYWNrU3RpY2t5KCkge1xuXG4gIHZhciBzdGlja3lFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0aWNreV0nKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0aWNreUVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN0aWNreUVsZW0gPSBzdGlja3lFbGVtc1tpXTtcbiAgICB2YXIgY29udGFpbmVyID0gc3RpY2t5RWxlbS5kYXRhc2V0LnN0aWNreSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreUVsZW0uZGF0YXNldC5zdGlja3kpIDogZG9jdW1lbnQuYm9keTtcblxuICAgIGlmIChzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDApIHtcbiAgICAgIC8vIGJlY29tZSBmaXhlZFxuICAgICAgaWYgKHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAvLyBhbHJlYWR5IGZpeGVkXG4gICAgICAgIC8vIGluZXJ0aWE6IGhhcHBlbnMgd2hlbiBzY3JvbGxlZCBmYXN0IHRvbyBtdWNoIHRvIGJvdHRvbVxuICAgICAgICAvLyBodHRwOi8vaWx5YWthbnRvci5ydS9zY3JlZW4vMjAxNS0wMi0yNF8xNTU1LnN3ZlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzYXZlZExlZnQgPSBzdGlja3lFbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICB2YXIgcGxhY2Vob2xkZXIgPSBjcmVhdGVQbGFjZWhvbGRlcihzdGlja3lFbGVtKTtcblxuICAgICAgc3RpY2t5RWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgc3RpY2t5RWxlbSk7XG5cbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdGlja3lFbGVtKTtcbiAgICAgIHN0aWNreUVsZW0uY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUubGVmdCA9IHNhdmVkTGVmdCArICdweCc7XG4gICAgICAvLyB6SW5kZXggPCAxMDAwLCBiZWNhdXNlIGl0IG11c3QgYmUgdW5kZXIgYW4gb3ZlcmxheSxcbiAgICAgIC8vIGUuZy4gc2l0ZW1hcCBtdXN0IHNob3cgb3ZlciB0aGUgcHJvZ3Jlc3MgYmFyXG4gICAgICBzdGlja3lFbGVtLnN0eWxlLnpJbmRleCA9IDEwMTtcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7IC8vIG5vbi10cmFuc3BhcmVudCB0byBjb3ZlciB0aGUgdGV4dFxuICAgICAgc3RpY2t5RWxlbS5zdHlsZS5tYXJnaW4gPSAwO1xuICAgICAgc3RpY2t5RWxlbS5zdHlsZS53aWR0aCA9IHBsYWNlaG9sZGVyLm9mZnNldFdpZHRoICsgJ3B4JzsgLy8ga2VlcCBzYW1lIHdpZHRoIGFzIGJlZm9yZVxuICAgICAgc3RpY2t5RWxlbS5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgIH0gZWxzZSBpZiAoc3RpY2t5RWxlbS5wbGFjZWhvbGRlciAmJiBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDApIHtcbiAgICAgIC8vIGJlY29tZSBub24tZml4ZWRcbiAgICAgIHN0aWNreUVsZW0uc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgICAgc3RpY2t5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcbiAgICAgIHN0aWNreUVsZW0ucGxhY2Vob2xkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RpY2t5RWxlbSwgc3RpY2t5RWxlbS5wbGFjZWhvbGRlcik7XG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyLnJlbW92ZSgpO1xuXG4gICAgICBzdGlja3lFbGVtLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGFjZWhvbGRlciB3LyBzYW1lIHNpemUgJiBtYXJnaW5cbiAqIEBwYXJhbSBlbGVtXG4gKiBAcmV0dXJucyB7KnwhSFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBsYWNlaG9sZGVyKGVsZW0pIHtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkxlZnQgPSBzdHlsZS5tYXJnaW5MZWZ0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5tYXJnaW5SaWdodCA9IHN0eWxlLm1hcmdpblJpZ2h0O1xuICBwbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodCArICdweCc7XG4gIHBsYWNlaG9sZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IHN0eWxlLm1hcmdpbkJvdHRvbTtcbiAgcGxhY2Vob2xkZXIuc3R5bGUubWFyZ2luVG9wID0gc3R5bGUubWFyZ2luVG9wO1xuICByZXR1cm4gcGxhY2Vob2xkZXI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvdHJhY2tTdGlja3kuanNcbiAqKi8iLCJ2YXIgcmVzaXplT25sb2FkID0gcmVxdWlyZSgnY2xpZW50L2hlYWQvcmVzaXplT25sb2FkJyk7XG52YXIgaXNTY3JvbGxlZEludG9WaWV3ID0gcmVxdWlyZSgnY2xpZW50L2lzU2Nyb2xsZWRJbnRvVmlldycpO1xudmFyIGFkZExpbmVOdW1iZXJzID0gcmVxdWlyZSgnLi9hZGRMaW5lTnVtYmVycycpO1xuXG5mdW5jdGlvbiBDb2RlQm94KGVsZW0pIHtcblxuICB2YXIgcHJlRWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcigncHJlJyk7XG4gIHZhciBjb2RlRWxlbSA9IHByZUVsZW0ucXVlcnlTZWxlY3RvcignY29kZScpO1xuICB2YXIgY29kZSA9IGNvZGVFbGVtLnRleHRDb250ZW50O1xuXG4gIFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoY29kZUVsZW0pO1xuICBhZGRMaW5lTnVtYmVycyhwcmVFbGVtKTtcblxuICBhZGRCbG9ja0hpZ2hsaWdodChwcmVFbGVtLCBlbGVtLmRhdGFzZXQuaGlnaGxpZ2h0QmxvY2spO1xuICBhZGRJbmxpbmVIaWdobGlnaHQocHJlRWxlbSwgZWxlbS5kYXRhc2V0LmhpZ2hsaWdodElubGluZSk7XG5cbiAgdmFyIGlzSlMgPSBwcmVFbGVtLmNsYXNzTGlzdC5jb250YWlucygnbGFuZ3VhZ2UtamF2YXNjcmlwdCcpO1xuICB2YXIgaXNIVE1MID0gcHJlRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2xhbmd1YWdlLW1hcmt1cCcpO1xuICB2YXIgaXNUcnVzdGVkID0gZWxlbS5kYXRhc2V0LnRydXN0ZWQ7XG4gIHZhciBqc0ZyYW1lO1xuICB2YXIgaHRtbFJlc3VsdDtcbiAgdmFyIGlzRmlyc3RSdW4gPSB0cnVlO1xuXG4gIGlmICghaXNKUyAmJiAhaXNIVE1MKSByZXR1cm47XG5cbiAgdmFyIHJ1bkVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGlvbj1cInJ1blwiXScpO1xuICBpZiAocnVuRWxlbSkge1xuICAgIHJ1bkVsZW0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICBydW4oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGVkaXRFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb249XCJlZGl0XCJdJyk7XG4gIGlmIChlZGl0RWxlbSkge1xuICAgIGVkaXRFbGVtLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgZWRpdCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBzb21lIGNvZGUgY2FuJ3QgYmUgZXhlY3V0ZWQgYnkgZXB1YiBlbmdpbmVcbiAgaWYgKGVsZW0uZGF0YXNldC5hdXRvcnVuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZih3aW5kb3cuZWJvb2tGb3JtYXQgPT0gJ2VwdWInICYmIGVsZW0uZGF0YXNldC5hdXRvcnVuID09ICduby1lcHViJykge1xuICAgICAgZWxlbS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGltZW91dCBzaG91bGQgYmUgc21hbGwsIGFyb3VuZCAxMG1zLCBvciByZW1vdmUgaXQgdG8gbWFrZSBjcmF3bGVyIHByb2Nlc3MgdGhlIGF1dG9ydW5cbiAgICAgIHNldFRpbWVvdXQocnVuLCAxMDAwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwb3N0SlNGcmFtZSgpIHtcbiAgICB2YXIgd2luID0ganNGcmFtZVswXS5jb250ZW50V2luZG93O1xuICAgIGlmICh0eXBlb2Ygd2luLnBvc3RNZXNzYWdlICE9ICdmdW5jdGlvbicpIHtcbiAgICAgIGFsZXJ0KFwi0JjQt9Cy0LjQvdC40YLQtSwg0LfQsNC/0YPRgdC6INC60L7QtNCwINGC0YDQtdCx0YPQtdGCINCx0L7Qu9C10LUg0YHQvtCy0YDQtdC80LXQvdC90YvQuSDQsdGA0LDRg9C30LXRgFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luLnBvc3RNZXNzYWdlKGNvZGUsICdodHRwOi8vcnUubG9va2F0Y29kZS5jb20vc2hvd2pzJyk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5IVE1MKCkge1xuXG4gICAgdmFyIGZyYW1lO1xuXG4gICAgaWYgKGh0bWxSZXN1bHQgJiYgZWxlbS5kYXRhc2V0LnJlZnJlc2gpIHtcbiAgICAgIGh0bWxSZXN1bHQucmVtb3ZlKCk7XG4gICAgICBodG1sUmVzdWx0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIWh0bWxSZXN1bHQpIHtcbiAgICAgIC8vIHRha2UgZnJvbSBIVE1MIGlmIGV4aXN0cyB0aGVyZSAoaW4gbWFya3VwIHdoZW4gYXV0b3J1biBpcyBzcGVjaWZpZWQpXG4gICAgICBodG1sUmVzdWx0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCcuY29kZS1yZXN1bHQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWh0bWxSZXN1bHQpIHtcbiAgICAgIC8vIG90aGVyd2lzZSBjcmVhdGUgKG9yIHJlY3JlYXRlIGlmIHJlZnJlc2gpXG4gICAgICBodG1sUmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBodG1sUmVzdWx0LmNsYXNzTmFtZSA9IFwiY29kZS1yZXN1bHQgY29kZS1leGFtcGxlX19yZXN1bHRcIjtcblxuICAgICAgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGZyYW1lLm5hbWUgPSAnZnJhbWUtJyArIE1hdGgucmFuZG9tKCk7XG4gICAgICBmcmFtZS5jbGFzc05hbWUgPSAnY29kZS1yZXN1bHRfX2lmcmFtZSc7XG5cbiAgICAgIGlmIChlbGVtLmRhdGFzZXQuZGVtb0hlaWdodCA9PT0gXCIwXCIpIHtcbiAgICAgICAgLy8gdGhpcyBodG1sIGhhcyBub3RoaW5nIHRvIHNob3dcbiAgICAgICAgZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9ICtlbGVtLmRhdGFzZXQuZGVtb0hlaWdodDtcbiAgICAgICAgZnJhbWUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgIH1cbiAgICAgIGh0bWxSZXN1bHQuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuXG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGh0bWxSZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFtZSA9IGh0bWxSZXN1bHQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzVHJ1c3RlZCkge1xuICAgICAgdmFyIGRvYyA9IGZyYW1lLmNvbnRlbnREb2N1bWVudCB8fCBmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuXG4gICAgICBkb2Mub3BlbigpO1xuICAgICAgZG9jLndyaXRlKG5vcm1hbGl6ZUh0bWwoY29kZSkpO1xuICAgICAgZG9jLmNsb3NlKCk7XG5cbiAgICAgIGlmIChlbGVtLmRhdGFzZXQuZGVtb0hlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc2l6ZU9ubG9hZC5pZnJhbWUoZnJhbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShpc0ZpcnN0UnVuICYmIGVsZW0uZGF0YXNldC5hdXRvcnVuICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIGlmICghaXNTY3JvbGxlZEludG9WaWV3KGh0bWxSZXN1bHQpKSB7XG4gICAgICAgICAgaHRtbFJlc3VsdC5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICAgICAgZm9ybS5lbmN0eXBlID0gXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI7XG4gICAgICBmb3JtLmFjdGlvbiA9IFwiaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tL3Nob3dodG1sXCI7XG4gICAgICBmb3JtLnRhcmdldCA9IGZyYW1lLm5hbWU7XG5cbiAgICAgIHZhciB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICB0ZXh0YXJlYS5uYW1lID0gJ2NvZGUnO1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSBub3JtYWxpemVIdG1sKGNvZGUpO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XG5cbiAgICAgIGZyYW1lLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZvcm0sIGZyYW1lLm5leHRTaWJsaW5nKTtcbiAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICBmb3JtLnJlbW92ZSgpO1xuXG4gICAgICBpZiAoIShpc0ZpcnN0UnVuICYmIGVsZW0uZGF0YXNldC5hdXRvcnVuICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIGZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKGVsZW0uZGF0YXNldC5kZW1vSGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc2l6ZU9ubG9hZC5pZnJhbWUoZnJhbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaXNTY3JvbGxlZEludG9WaWV3KGh0bWxSZXN1bHQpKSB7XG4gICAgICAgICAgICBodG1sUmVzdWx0LnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBydW5KUygpIHtcblxuICAgIGlmIChpc1RydXN0ZWQpIHtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLyoganNoaW50IC1XMDYxICovXG4gICAgICAgIHdpbmRvd1tcImV2YWxcIl0uY2FsbCh3aW5kb3csIGNvZGUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICBhbGVydChcItCe0YjQuNCx0LrQsDogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKGVsZW0uZGF0YXNldC5yZWZyZXNoICYmIGpzRnJhbWUpIHtcbiAgICAgICAganNGcmFtZS5yZW1vdmUoKTtcbiAgICAgICAganNGcmFtZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghanNGcmFtZSkge1xuICAgICAgICAvLyBjcmVhdGUgaWZyYW1lIGZvciBqc1xuICAgICAgICBqc0ZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGpzRnJhbWUuY2xhc3NOYW1lID0gJ2pzLWZyYW1lJztcbiAgICAgICAganNGcmFtZS5zcmMgPSAnaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tL3Nob3dqcyc7XG4gICAgICAgIGpzRnJhbWUuc3R5bGUud2lkdGggPSAwO1xuICAgICAgICBqc0ZyYW1lLnN0eWxlLmhlaWdodCA9IDA7XG4gICAgICAgIGpzRnJhbWUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgICBqc0ZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBvc3RKU0ZyYW1lKCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoanNGcmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3N0SlNGcmFtZSgpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZWRpdCgpIHtcblxuICAgIHZhciBodG1sO1xuICAgIGlmIChpc0hUTUwpIHtcbiAgICAgIGh0bWwgPSBub3JtYWxpemVIdG1sKGNvZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29kZUluZGVudGVkID0gY29kZS5yZXBsYWNlKC9eL2dpbSwgJyAgICAnKTtcbiAgICAgIGh0bWwgPSAnPCFET0NUWVBFIGh0bWw+XFxuPGh0bWw+XFxuXFxuPGJvZHk+XFxuICA8c2NyaXB0PlxcbicgKyBjb2RlSW5kZW50ZWQgKyAnXFxuICA8L3NjcmlwdD5cXG48L2JvZHk+XFxuXFxuPC9odG1sPic7XG4gICAgfVxuXG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5hY3Rpb24gPSBcImh0dHA6Ly9wbG5rci5jby9lZGl0Lz9wPXByZXZpZXdcIjtcbiAgICBmb3JtLm1ldGhvZCA9IFwiUE9TVFwiO1xuICAgIGZvcm0udGFyZ2V0ID0gXCJfYmxhbmtcIjtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICB2YXIgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHRleHRhcmVhLm5hbWUgPSBcImZpbGVzW2luZGV4Lmh0bWxdXCI7XG4gICAgdGV4dGFyZWEudmFsdWUgPSBodG1sO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5uYW1lID0gXCJkZXNjcmlwdGlvblwiO1xuICAgIGlucHV0LnZhbHVlID0gXCJGb3JrIGZyb20gXCIgKyB3aW5kb3cubG9jYXRpb247XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIGZvcm0ucmVtb3ZlKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUh0bWwoKSB7XG4gICAgdmFyIGNvZGVMYyA9IGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgaGFzQm9keVN0YXJ0ID0gY29kZUxjLm1hdGNoKCc8Ym9keT4nKTtcbiAgICB2YXIgaGFzQm9keUVuZCA9IGNvZGVMYy5tYXRjaCgnPC9ib2R5PicpO1xuICAgIHZhciBoYXNIdG1sU3RhcnQgPSBjb2RlTGMubWF0Y2goJzxodG1sPicpO1xuICAgIHZhciBoYXNIdG1sRW5kID0gY29kZUxjLm1hdGNoKCc8L2h0bWw+Jyk7XG5cbiAgICB2YXIgaGFzRG9jVHlwZSA9IGNvZGVMYy5tYXRjaCgvXlxccyo8IWRvY3R5cGUvKTtcblxuICAgIGlmIChoYXNEb2NUeXBlKSB7XG4gICAgICByZXR1cm4gY29kZTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gY29kZTtcblxuICAgIGlmICghaGFzSHRtbFN0YXJ0KSB7XG4gICAgICByZXN1bHQgPSAnPGh0bWw+XFxuJyArIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWhhc0h0bWxFbmQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCArICdcXG48L2h0bWw+JztcbiAgICB9XG5cbiAgICBpZiAoIWhhc0JvZHlTdGFydCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJzxodG1sPicsICc8aHRtbD5cXG48aGVhZD5cXG4gIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxcbjwvaGVhZD48Ym9keT5cXG4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWhhc0JvZHlFbmQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCc8L2h0bWw+JywgJ1xcbjwvYm9keT5cXG48L2h0bWw+Jyk7XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gJzwhRE9DVFlQRSBIVE1MPlxcbicgKyByZXN1bHQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICBmdW5jdGlvbiBydW4oKSB7XG4gICAgaWYgKGlzSlMpIHtcbiAgICAgIHJ1bkpTKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJ1bkhUTUwoKTtcbiAgICB9XG4gICAgaXNGaXJzdFJ1biA9IGZhbHNlO1xuICB9XG5cblxufVxuXG5cbmZ1bmN0aW9uIGFkZEJsb2NrSGlnaGxpZ2h0KHByZSwgbGluZXMpIHtcblxuICBpZiAoIWxpbmVzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJhbmdlcyA9IGxpbmVzLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XG5cbiAgLypqc2hpbnQgLVcwODQgKi9cbiAgZm9yICh2YXIgaSA9IDAsIHJhbmdlOyByYW5nZSA9IHJhbmdlc1tpKytdOykge1xuICAgIHJhbmdlID0gcmFuZ2Uuc3BsaXQoJy0nKTtcblxuICAgIHZhciBzdGFydCA9ICtyYW5nZVswXSxcbiAgICAgICAgZW5kID0gK3JhbmdlWzFdIHx8IHN0YXJ0O1xuXG5cbiAgICB2YXIgbWFzayA9ICc8Y29kZSBjbGFzcz1cImJsb2NrLWhpZ2hsaWdodFwiIGRhdGEtc3RhcnQ9XCInICsgc3RhcnQgKyAnXCIgZGF0YS1lbmQ9XCInICsgZW5kICsgJ1wiPicgK1xuICAgICAgbmV3IEFycmF5KHN0YXJ0ICsgMSkuam9pbignXFxuJykgK1xuICAgICAgJzxjb2RlIGNsYXNzPVwibWFza1wiPicgKyBuZXcgQXJyYXkoZW5kIC0gc3RhcnQgKyAyKS5qb2luKCdcXG4nKSArICc8L2NvZGU+PC9jb2RlPic7XG5cbiAgICBwcmUuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJCZWdpblwiLCBtYXNrKTtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gYWRkSW5saW5lSGlnaGxpZ2h0KHByZSwgcmFuZ2VzKSB7XG5cbiAgLy8gc2VsZWN0IGNvZGUgd2l0aCB0aGUgbGFuZ3VhZ2UgdGV4dCwgbm90IGJsb2NrLWhpZ2hsaWdodGVyXG4gIHZhciBjb2RlRWxlbSA9IHByZS5xdWVyeVNlbGVjdG9yKCdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXScpO1xuXG4gIHJhbmdlcyA9IHJhbmdlcyA/IHJhbmdlcy5zcGxpdChcIixcIikgOiBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwaWVjZSA9IHJhbmdlc1tpXS5zcGxpdCgnOicpO1xuICAgIHZhciBsaW5lTnVtID0gK3BpZWNlWzBdLCBzdHJSYW5nZSA9IHBpZWNlWzFdLnNwbGl0KCctJyk7XG4gICAgdmFyIHN0YXJ0ID0gK3N0clJhbmdlWzBdLCBlbmQgPSArc3RyUmFuZ2VbMV07XG4gICAgdmFyIG1hc2sgPSAnPGNvZGUgY2xhc3M9XCJpbmxpbmUtaGlnaGxpZ2h0XCI+JyArXG4gICAgICBuZXcgQXJyYXkobGluZU51bSArIDEpLmpvaW4oJ1xcbicpICtcbiAgICAgIG5ldyBBcnJheShzdGFydCArIDEpLmpvaW4oJyAnKSArXG4gICAgICAnPGNvZGUgY2xhc3M9XCJtYXNrXCI+JyArIG5ldyBBcnJheShlbmQgLSBzdGFydCArIDEpLmpvaW4oJyAnKSArICc8L2NvZGU+PC9jb2RlPic7XG5cbiAgICBjb2RlRWxlbS5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlckJlZ2luXCIsIG1hc2spO1xuICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlQm94O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vY29kZUJveC5qc1xuICoqLyIsInZhciBkZWxlZ2F0ZSA9IHJlcXVpcmUoJ2NsaWVudC9kZWxlZ2F0ZScpO1xudmFyIGFkZExpbmVOdW1iZXJzID0gcmVxdWlyZSgnLi9hZGRMaW5lTnVtYmVycycpO1xuXG5mdW5jdGlvbiBDb2RlVGFic0JveChlbGVtKSB7XG4gIGlmICh3aW5kb3cuaXNFYm9vaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZWxlbSA9IGVsZW07XG4gIHRoaXMudHJhbnNsYXRlWCA9IDA7XG5cbiAgdGhpcy5zd2l0Y2hlc0VsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1zd2l0Y2hlc10nKTtcbiAgdGhpcy5zd2l0Y2hlc0VsZW1JdGVtcyA9IHRoaXMuc3dpdGNoZXNFbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuICB0aGlzLmFycm93TGVmdCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29kZS10YWJzLWxlZnRdJyk7XG4gIHRoaXMuYXJyb3dSaWdodCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29kZS10YWJzLXJpZ2h0XScpO1xuXG5cbiAgdGhpcy5hcnJvd0xlZnQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLnRyYW5zbGF0ZVggPSBNYXRoLm1heCgwLCB0aGlzLnRyYW5zbGF0ZVggLSB0aGlzLnN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCk7XG4gICAgdGhpcy5yZW5kZXJUcmFuc2xhdGUoKTtcbiAgfS5iaW5kKHRoaXMpO1xuXG5cbiAgdGhpcy5hcnJvd1JpZ2h0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy50cmFuc2xhdGVYID0gTWF0aC5taW4odGhpcy50cmFuc2xhdGVYICt0aGlzLnN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCwgdGhpcy5zd2l0Y2hlc0VsZW1JdGVtcy5vZmZzZXRXaWR0aCAtIHRoaXMuc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLnJlbmRlclRyYW5zbGF0ZSgpO1xuICB9LmJpbmQodGhpcyk7XG5cbiAgdGhpcy5kZWxlZ2F0ZSgnLmNvZGUtdGFic19fc3dpdGNoJywgJ2NsaWNrJywgdGhpcy5vblN3aXRjaENsaWNrKTtcbn1cblxuQ29kZVRhYnNCb3gucHJvdG90eXBlLm9uU3dpdGNoQ2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICB2YXIgc2libGluZ3MgPSBlLmRlbGVnYXRlVGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW47XG4gIHZhciB0YWJzID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1jb250ZW50XScpLmNoaWxkcmVuO1xuXG5cbiAgdmFyIHNlbGVjdGVkSW5kZXg7XG4gIGZvcih2YXIgaT0wOyBpPHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN3aXRjaEVsZW0gPSBzaWJsaW5nc1tpXTtcbiAgICB2YXIgdGFiRWxlbSA9IHRhYnNbaV07XG4gICAgaWYgKHN3aXRjaEVsZW0gPT0gZS5kZWxlZ2F0ZVRhcmdldCkge1xuICAgICAgc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICB0YWJFbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19fc2VjdGlvbl9jdXJyZW50Jyk7XG4gICAgICBzd2l0Y2hFbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19fc3dpdGNoX2N1cnJlbnQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFiRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2RlLXRhYnNfX3NlY3Rpb25fY3VycmVudCcpO1xuICAgICAgc3dpdGNoRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2RlLXRhYnNfX3N3aXRjaF9jdXJyZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNlbGVjdGVkSW5kZXggPT09IDApIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCgnY29kZS10YWJzX3Jlc3VsdF9vbicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2RlLXRhYnNfcmVzdWx0X29uJyk7XG5cbiAgICB0aGlzLmhpZ2hsaWdodFRhYih0YWJzW3NlbGVjdGVkSW5kZXhdKTtcbiAgfVxuXG59O1xuXG5cbkNvZGVUYWJzQm94LnByb3RvdHlwZS5oaWdobGlnaHRUYWIgPSBmdW5jdGlvbih0YWIpIHtcbiAgaWYgKHRhYi5oaWdobGlnaHRlZCkgcmV0dXJuO1xuICB2YXIgcHJlRWxlbSA9IHRhYi5xdWVyeVNlbGVjdG9yKCdwcmUnKTtcbiAgdmFyIGNvZGVFbGVtID0gcHJlRWxlbS5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG4gIFByaXNtLmhpZ2hsaWdodEVsZW1lbnQoY29kZUVsZW0pO1xuICBhZGRMaW5lTnVtYmVycyhwcmVFbGVtKTtcbiAgdGFiLmhpZ2hsaWdodGVkID0gdHJ1ZTtcbn07XG5cbkNvZGVUYWJzQm94LnByb3RvdHlwZS5yZW5kZXJUcmFuc2xhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zd2l0Y2hlc0VsZW1JdGVtcy5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgtJyArIHRoaXMudHJhbnNsYXRlWCArICdweCknO1xuICBpZiAodGhpcy50cmFuc2xhdGVYID09PSAwKSB7XG4gICAgdGhpcy5hcnJvd0xlZnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFycm93TGVmdC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cblxuICBpZiAodGhpcy50cmFuc2xhdGVYID09PSB0aGlzLnN3aXRjaGVzRWxlbUl0ZW1zLm9mZnNldFdpZHRoIC0gdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgpIHtcbiAgICB0aGlzLmFycm93UmlnaHQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFycm93UmlnaHQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbn07XG5cblxuZGVsZWdhdGUuZGVsZWdhdGVNaXhpbihDb2RlVGFic0JveC5wcm90b3R5cGUpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29kZVRhYnNCb3g7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wcmlzbS9jb2RlVGFic0JveC5qc1xuICoqLyIsInNlbGYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cdD8gd2luZG93ICAgLy8gaWYgaW4gYnJvd3NlclxuXHQ6IChcblx0XHQodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpXG5cdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdDoge30gICAvLyBpZiBpbiBub2RlIGpzXG5cdCk7XG5cbi8qKlxuICogUHJpc206IExpZ2h0d2VpZ2h0LCByb2J1c3QsIGVsZWdhbnQgc3ludGF4IGhpZ2hsaWdodGluZ1xuICogTUlUIGxpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHAvXG4gKiBAYXV0aG9yIExlYSBWZXJvdSBodHRwOi8vbGVhLnZlcm91Lm1lXG4gKi9cblxudmFyIFByaXNtID0gKGZ1bmN0aW9uKCl7XG5cbi8vIFByaXZhdGUgaGVscGVyIHZhcnNcbnZhciBsYW5nID0gL1xcYmxhbmcoPzp1YWdlKT8tKD8hXFwqKShcXHcrKVxcYi9pO1xuXG52YXIgXyA9IHNlbGYuUHJpc20gPSB7XG5cdHV0aWw6IHtcblx0XHRlbmNvZGU6IGZ1bmN0aW9uICh0b2tlbnMpIHtcblx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBfLnV0aWwuZW5jb2RlKHRva2Vucy5jb250ZW50KSwgdG9rZW5zLmFsaWFzKTtcblx0XHRcdH0gZWxzZSBpZiAoXy51dGlsLnR5cGUodG9rZW5zKSA9PT0gJ0FycmF5Jykge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLm1hcChfLnV0aWwuZW5jb2RlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0b2tlbnMucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcrKVxcXS8pWzFdO1xuXHRcdH0sXG5cblx0XHQvLyBEZWVwIGNsb25lIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiAoZS5nLiB0byBleHRlbmQgaXQpXG5cdFx0Y2xvbmU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHR2YXIgdHlwZSA9IF8udXRpbC50eXBlKG8pO1xuXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHR2YXIgY2xvbmUgPSB7fTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBfLnV0aWwuY2xvbmUob1trZXldKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gY2xvbmU7XG5cblx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdHJldHVybiBvLnNsaWNlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvO1xuXHRcdH1cblx0fSxcblxuXHRsYW5ndWFnZXM6IHtcblx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdHZhciBsYW5nID0gXy51dGlsLmNsb25lKF8ubGFuZ3VhZ2VzW2lkXSk7XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbGFuZztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5zZXJ0IGEgdG9rZW4gYmVmb3JlIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBsaXRlcmFsXG5cdFx0ICogQXMgdGhpcyBuZWVkcyB0byByZWNyZWF0ZSB0aGUgb2JqZWN0ICh3ZSBjYW5ub3QgYWN0dWFsbHkgaW5zZXJ0IGJlZm9yZSBrZXlzIGluIG9iamVjdCBsaXRlcmFscyksXG5cdFx0ICogd2UgY2Fubm90IGp1c3QgcHJvdmlkZSBhbiBvYmplY3QsIHdlIG5lZWQgYW5vYmplY3QgYW5kIGEga2V5LlxuXHRcdCAqIEBwYXJhbSBpbnNpZGUgVGhlIGtleSAob3IgbGFuZ3VhZ2UgaWQpIG9mIHRoZSBwYXJlbnRcblx0XHQgKiBAcGFyYW0gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS4gSWYgbm90IHByb3ZpZGVkLCB0aGUgZnVuY3Rpb24gYXBwZW5kcyBpbnN0ZWFkLlxuXHRcdCAqIEBwYXJhbSBpbnNlcnQgT2JqZWN0IHdpdGggdGhlIGtleS92YWx1ZSBwYWlycyB0byBpbnNlcnRcblx0XHQgKiBAcGFyYW0gcm9vdCBUaGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYGluc2lkZWAuIElmIGVxdWFsIHRvIFByaXNtLmxhbmd1YWdlcywgaXQgY2FuIGJlIG9taXR0ZWQuXG5cdFx0ICovXG5cdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0cm9vdCA9IHJvb3QgfHwgXy5sYW5ndWFnZXM7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xuXHRcdFx0XHRpbnNlcnQgPSBhcmd1bWVudHNbMV07XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0Z3JhbW1hcltuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGdyYW1tYXI7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXG5cdFx0XHRcdGlmIChncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXG5cdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0W3Rva2VuXSA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRfLmxhbmd1YWdlcy5ERlMoXy5sYW5ndWFnZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSByb290W2luc2lkZV0gJiYga2V5ICE9IGluc2lkZSkge1xuXHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByb290W2luc2lkZV0gPSByZXQ7XG5cdFx0fSxcblxuXHRcdC8vIFRyYXZlcnNlIGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiB3aXRoIERlcHRoIEZpcnN0IFNlYXJjaFxuXHRcdERGUzogZnVuY3Rpb24obywgY2FsbGJhY2ssIHR5cGUpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gbykge1xuXHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdGlmIChfLnV0aWwudHlwZShvW2ldKSA9PT0gJ09iamVjdCcpIHtcblx0XHRcdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhvW2ldLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKF8udXRpbC50eXBlKG9baV0pID09PSAnQXJyYXknKSB7XG5cdFx0XHRcdFx0XHRfLmxhbmd1YWdlcy5ERlMob1tpXSwgY2FsbGJhY2ssIGkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHRBbGw6IGZ1bmN0aW9uKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdLCBbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIGNvZGUsIGNvZGVbY2xhc3MqPVwibGFuZy1cIl0sIFtjbGFzcyo9XCJsYW5nLVwiXSBjb2RlJyk7XG5cblx0XHRmb3IgKHZhciBpPTAsIGVsZW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50c1tpKytdOykge1xuXHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBjYWxsYmFjayk7XG5cdFx0fVxuXHR9LFxuXG5cdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHR2YXIgbGFuZ3VhZ2UsIGdyYW1tYXIsIHBhcmVudCA9IGVsZW1lbnQ7XG5cblx0XHR3aGlsZSAocGFyZW50ICYmICFsYW5nLnRlc3QocGFyZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdGxhbmd1YWdlID0gKHBhcmVudC5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywnJ10pWzFdO1xuXHRcdFx0Z3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblx0XHR9XG5cblx0XHRpZiAoIWdyYW1tYXIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdC8vIFNldCBsYW5ndWFnZSBvbiB0aGUgcGFyZW50LCBmb3Igc3R5bGluZ1xuXHRcdHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuXHRcdGlmICgvcHJlL2kudGVzdChwYXJlbnQubm9kZU5hbWUpKSB7XG5cdFx0XHRwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblx0XHR9XG5cblx0XHR2YXIgY29kZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG5cblx0XHRpZighY29kZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBlbnYgPSB7XG5cdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdGNvZGU6IGNvZGVcblx0XHR9O1xuXG5cdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0aWYgKGFzeW5jICYmIHNlbGYuV29ya2VyKSB7XG5cdFx0XHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcblxuXHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gVG9rZW4uc3RyaW5naWZ5KEpTT04ucGFyc2UoZXZ0LmRhdGEpLCBsYW5ndWFnZSk7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdFx0fTtcblxuXHRcdFx0d29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0Y29kZTogZW52LmNvZGVcblx0XHRcdH0pKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRlbnYuaGlnaGxpZ2h0ZWRDb2RlID0gXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpXG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbGVtZW50KTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0fVxuXHR9LFxuXG5cdGhpZ2hsaWdodDogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIHRva2VucyA9IF8udG9rZW5pemUodGV4dCwgZ3JhbW1hcik7XG5cdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShfLnV0aWwuZW5jb2RlKHRva2VucyksIGxhbmd1YWdlKTtcblx0fSxcblxuXHR0b2tlbml6ZTogZnVuY3Rpb24odGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHR2YXIgVG9rZW4gPSBfLlRva2VuO1xuXG5cdFx0dmFyIHN0cmFyciA9IFt0ZXh0XTtcblxuXHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXG5cdFx0aWYgKHJlc3QpIHtcblx0XHRcdGZvciAodmFyIHRva2VuIGluIHJlc3QpIHtcblx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIGdyYW1tYXIucmVzdDtcblx0XHR9XG5cblx0XHR0b2tlbmxvb3A6IGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdGlmKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSAoXy51dGlsLnR5cGUocGF0dGVybnMpID09PSBcIkFycmF5XCIpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybnNbal0sXG5cdFx0XHRcdFx0aW5zaWRlID0gcGF0dGVybi5pbnNpZGUsXG5cdFx0XHRcdFx0bG9va2JlaGluZCA9ICEhcGF0dGVybi5sb29rYmVoaW5kLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmRMZW5ndGggPSAwLFxuXHRcdFx0XHRcdGFsaWFzID0gcGF0dGVybi5hbGlhcztcblxuXHRcdFx0XHRwYXR0ZXJuID0gcGF0dGVybi5wYXR0ZXJuIHx8IHBhdHRlcm47XG5cblx0XHRcdFx0Zm9yICh2YXIgaT0wOyBpPHN0cmFyci5sZW5ndGg7IGkrKykgeyAvLyBEb27igJl0IGNhY2hlIGxlbmd0aCBhcyBpdCBjaGFuZ2VzIGR1cmluZyB0aGUgbG9vcFxuXG5cdFx0XHRcdFx0dmFyIHN0ciA9IHN0cmFycltpXTtcblxuXHRcdFx0XHRcdGlmIChzdHJhcnIubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRicmVhayB0b2tlbmxvb3A7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG5cblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMoc3RyKTtcblxuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0aWYobG9va2JlaGluZCkge1xuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4IC0gMSArIGxvb2tiZWhpbmRMZW5ndGgsXG5cdFx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCksXG5cdFx0XHRcdFx0XHRcdGxlbiA9IG1hdGNoLmxlbmd0aCxcblx0XHRcdFx0XHRcdFx0dG8gPSBmcm9tICsgbGVuLFxuXHRcdFx0XHRcdFx0XHRiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSArIDEpLFxuXHRcdFx0XHRcdFx0XHRhZnRlciA9IHN0ci5zbGljZSh0byArIDEpO1xuXG5cdFx0XHRcdFx0XHR2YXIgYXJncyA9IFtpLCAxXTtcblxuXHRcdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0XHRhcmdzLnB1c2goYmVmb3JlKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZT8gXy50b2tlbml6ZShtYXRjaCwgaW5zaWRlKSA6IG1hdGNoLCBhbGlhcyk7XG5cblx0XHRcdFx0XHRcdGFyZ3MucHVzaCh3cmFwcGVkKTtcblxuXHRcdFx0XHRcdFx0aWYgKGFmdGVyKSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3MucHVzaChhZnRlcik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoc3RyYXJyLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3RyYXJyO1xuXHR9LFxuXG5cdGhvb2tzOiB7XG5cdFx0YWxsOiB7fSxcblxuXHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0aG9va3NbbmFtZV0gPSBob29rc1tuYW1lXSB8fCBbXTtcblxuXHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblxuXHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRpZiAoIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGk9MCwgY2FsbGJhY2s7IGNhbGxiYWNrID0gY2FsbGJhY2tzW2krK107KSB7XG5cdFx0XHRcdGNhbGxiYWNrKGVudik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgVG9rZW4gPSBfLlRva2VuID0gZnVuY3Rpb24odHlwZSwgY29udGVudCwgYWxpYXMpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0dGhpcy5hbGlhcyA9IGFsaWFzO1xufTtcblxuVG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24obywgbGFuZ3VhZ2UsIHBhcmVudCkge1xuXHRpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gbztcblx0fVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdHJldHVybiBvLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KGVsZW1lbnQsIGxhbmd1YWdlLCBvKTtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdHZhciBlbnYgPSB7XG5cdFx0dHlwZTogby50eXBlLFxuXHRcdGNvbnRlbnQ6IFRva2VuLnN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlLCBwYXJlbnQpLFxuXHRcdHRhZzogUHJpc20udG9rZW5UYWcgfHwgJ3NwYW4nLFxuXHRcdGNsYXNzZXM6IFsndG9rZW4nLCBvLnR5cGVdLFxuXHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHR9O1xuXG5cdGlmIChlbnYudHlwZSA9PSAnY29tbWVudCcpIHtcblx0XHRlbnYuYXR0cmlidXRlc1snc3BlbGxjaGVjayddID0gJ3RydWUnO1xuXHR9XG5cblx0aWYgKG8uYWxpYXMpIHtcblx0XHR2YXIgYWxpYXNlcyA9IF8udXRpbC50eXBlKG8uYWxpYXMpID09PSAnQXJyYXknID8gby5hbGlhcyA6IFtvLmFsaWFzXTtcblx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShlbnYuY2xhc3NlcywgYWxpYXNlcyk7XG5cdH1cblxuXHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblxuXHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0YXR0cmlidXRlcyArPSBuYW1lICsgJz1cIicgKyAoZW52LmF0dHJpYnV0ZXNbbmFtZV0gfHwgJycpICsgJ1wiJztcblx0fVxuXG5cdHJldHVybiAnPCcgKyBlbnYudGFnICsgJyBjbGFzcz1cIicgKyBlbnYuY2xhc3Nlcy5qb2luKCcgJykgKyAnXCIgJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXG59O1xuXG5pZiAoIXNlbGYuZG9jdW1lbnQpIHtcblx0aWYgKCFzZWxmLmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHQvLyBpbiBOb2RlLmpzXG5cdFx0cmV0dXJuIHNlbGYuUHJpc207XG5cdH1cbiBcdC8vIEluIHdvcmtlclxuXHRzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihldnQpIHtcblx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpLFxuXHRcdCAgICBsYW5nID0gbWVzc2FnZS5sYW5ndWFnZSxcblx0XHQgICAgY29kZSA9IG1lc3NhZ2UuY29kZTtcblxuXHRcdHNlbGYucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZShfLnRva2VuaXplKGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddKSkpKTtcblx0XHRzZWxmLmNsb3NlKCk7XG5cdH0sIGZhbHNlKTtcblxuXHRyZXR1cm4gc2VsZi5QcmlzbTtcbn1cblxuLy8gR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcbnZhciBzY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cbnNjcmlwdCA9IHNjcmlwdFtzY3JpcHQubGVuZ3RoIC0gMV07XG5cbmlmIChzY3JpcHQpIHtcblx0Xy5maWxlbmFtZSA9IHNjcmlwdC5zcmM7XG5cblx0aWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJiYgIXNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgXy5oaWdobGlnaHRBbGwpO1xuXHR9XG59XG5cbnJldHVybiBzZWxmLlByaXNtO1xuXG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcmlzbTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50JzogLzwhLS1bXFx3XFxXXSo/LS0+L2csXG5cdCdwcm9sb2cnOiAvPFxcPy4rP1xcPz4vLFxuXHQnZG9jdHlwZSc6IC88IURPQ1RZUEUuKz8+Lyxcblx0J2NkYXRhJzogLzwhXFxbQ0RBVEFcXFtbXFx3XFxXXSo/XV0+L2ksXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/W1xcdzotXStcXHMqKD86XFxzK1tcXHc6LV0rKD86PSg/OihcInwnKShcXFxcP1tcXHdcXFddKSo/XFwxfFteXFxzJ1wiPj1dKykpP1xccyopKlxcLz8+L2dpLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1tcXHc6LV0rL2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXltcXHctXSs/Oi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPSg/OignfFwiKVtcXHdcXFddKj8oXFwxKXxbXlxccz5dKykvZ2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC89fD58XCIvZ1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+L2csXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW1xcdzotXSsvZyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW1xcdy1dKz86L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiAvXFwmIz9bXFxkYS16XXsxLDh9Oy9naVxufTtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5jc3MgPSB7XG5cdCdjb21tZW50JzogL1xcL1xcKltcXHdcXFddKj9cXCpcXC8vZyxcblx0J2F0cnVsZSc6IHtcblx0XHRwYXR0ZXJuOiAvQFtcXHctXSs/Lio/KDt8KD89XFxzKnspKS9naSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bOzpdL2dcblx0XHR9XG5cdH0sXG5cdCd1cmwnOiAvdXJsXFwoKFtcIiddPykuKj9cXDFcXCkvZ2ksXG5cdCdzZWxlY3Rvcic6IC9bXlxce1xcfVxcc11bXlxce1xcfTtdKig/PVxccypcXHspL2csXG5cdCdwcm9wZXJ0eSc6IC8oXFxifFxcQilbXFx3LV0rKD89XFxzKjopL2lnLFxuXHQnc3RyaW5nJzogLyhcInwnKShcXFxcPy4pKj9cXDEvZyxcblx0J2ltcG9ydGFudCc6IC9cXEIhaW1wb3J0YW50XFxiL2dpLFxuXHQncHVuY3R1YXRpb24nOiAvW1xce1xcfTs6XS9nLFxuXHQnZnVuY3Rpb24nOiAvWy1hLXowLTldKyg/PVxcKCkvaWdcbn07XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICd0YWcnLCB7XG5cdFx0J3N0eWxlJzoge1xuXHRcdFx0cGF0dGVybjogLzxzdHlsZVtcXHdcXFddKj8+W1xcd1xcV10qPzxcXC9zdHlsZT4vaWcsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvPHN0eWxlW1xcd1xcV10qPz58PFxcL3N0eWxlPi9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHR9LFxuXHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1jc3MnXG5cdFx0fVxuXHR9KTtcblx0XG5cdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuXHRcdCdzdHlsZS1hdHRyJzoge1xuXHRcdFx0cGF0dGVybjogL1xccypzdHlsZT0oXCJ8JykuKz9cXDEvaWcsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxccypzdHlsZS9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXlxccyo9XFxzKlsnXCJdfFsnXCJdXFxzKiQvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvLisvZ2ksXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0sIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5jc3Muc2VsZWN0b3IgPSB7XG5cdHBhdHRlcm46IC9bXlxce1xcfVxcc11bXlxce1xcfV0qKD89XFxzKlxceykvZyxcblx0aW5zaWRlOiB7XG5cdFx0J3BzZXVkby1lbGVtZW50JzogLzooPzphZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8c2VsZWN0aW9uKXw6OlstXFx3XSsvZyxcblx0XHQncHNldWRvLWNsYXNzJzogLzpbLVxcd10rKD86XFwoLipcXCkpPy9nLFxuXHRcdCdjbGFzcyc6IC9cXC5bLTpcXC5cXHddKy9nLFxuXHRcdCdpZCc6IC8jWy06XFwuXFx3XSsvZ1xuXHR9XG59O1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjc3MnLCAnZnVuY3Rpb24nLCB7XG5cdCdoZXhjb2RlJzogLyNbXFxkYS1mXXszLDZ9L2dpLFxuXHQnZW50aXR5JzogL1xcXFxbXFxkYS1mXXsxLDh9L2dpLFxuXHQnbnVtYmVyJzogL1tcXGQlXFwuXSsvZ1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy1leHRyYXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSA2IDEwXG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFx3XFxXXSo/XFwqXFwvL2csXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLio/KFxccj9cXG58JCkvZyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiAvKFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Oig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzKyl8KD86Y2F0Y2hcXHMrXFwoKSlbYS16MC05X1xcLlxcXFxdKy9pZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC8oXFwufFxcXFwpL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKGlmfGVsc2V8d2hpbGV8ZG98Zm9yfHJldHVybnxpbnxpbnN0YW5jZW9mfGZ1bmN0aW9ufG5ld3x0cnl8dGhyb3d8Y2F0Y2h8ZmluYWxseXxudWxsfGJyZWFrfGNvbnRpbnVlKVxcYi9nLFxuXHQnYm9vbGVhbic6IC9cXGIodHJ1ZXxmYWxzZSlcXGIvZyxcblx0J2Z1bmN0aW9uJzoge1xuXHRcdHBhdHRlcm46IC9bYS16MC05X10rXFwoL2lnLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC9cXCgvXG5cdFx0fVxuXHR9LFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4W1xcZEEtRmEtZl0rfFxcZCpcXC4/XFxkKyhbRWVdLT9cXGQrKT8pXFxiL2csXG5cdCdvcGVyYXRvcic6IC9bLStdezEsMn18IXw8PT98Pj0/fD17MSwzfXwmezEsMn18XFx8P1xcfHxcXD98XFwqfFxcL3xcXH58XFxefFxcJS9nLFxuXHQnaWdub3JlJzogLyYobHR8Z3R8YW1wKTsvZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9nXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYihicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRydWV8dHJ5fHR5cGVvZnx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi9nLFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4W1xcZEEtRmEtZl0rfFxcZCpcXC4/XFxkKyhbRWVdWystXT9cXGQrKT98TmFOfC0/SW5maW5pdHkpXFxiL2csXG5cdCdmdW5jdGlvbic6IC8oPyFcXGQpW2EtejAtOV8kXSsoPz1cXCgpL2lnXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0cGF0dGVybjogLyhefFteL10pXFwvKD8hXFwvKShcXFsuKz9dfFxcXFwufFteL1xcclxcbl0pK1xcL1tnaW1dezAsM30oPz1cXHMqKCR8W1xcclxcbiwuO30pXSkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ3RhZycsIHtcblx0XHQnc2NyaXB0Jzoge1xuXHRcdFx0cGF0dGVybjogLzxzY3JpcHRbXFx3XFxXXSo/PltcXHdcXFddKj88XFwvc2NyaXB0Pi9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQndGFnJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC88c2NyaXB0W1xcd1xcV10qPz58PFxcL3NjcmlwdD4vaWcsXG5cdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5pbnNpZGVcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWphdmFzY3JpcHQnXG5cdFx0fVxuXHR9KTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIihmdW5jdGlvbihQcmlzbSkge1xuXG4vLyBJZ25vcmUgY29tbWVudHMgc3RhcnRpbmcgd2l0aCB7IHRvIHByaXZpbGVnZSBzdHJpbmcgaW50ZXJwb2xhdGlvbiBoaWdobGlnaHRpbmdcbnZhciBjb21tZW50ID0gLyMoPyFcXHspLisvZyxcbiAgICBpbnRlcnBvbGF0aW9uID0ge1xuICAgIFx0cGF0dGVybjogLyNcXHtbXn1dK1xcfS9nLFxuICAgIFx0YWxpYXM6ICd2YXJpYWJsZSdcbiAgICB9O1xuXG5QcmlzbS5sYW5ndWFnZXMuY29mZmVlc2NyaXB0ID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnamF2YXNjcmlwdCcsIHtcblx0J2NvbW1lbnQnOiBjb21tZW50LFxuXHQnc3RyaW5nJzogW1xuXG5cdFx0Ly8gU3RyaW5ncyBhcmUgbXVsdGlsaW5lXG5cdFx0LycoPzpcXFxcP1tcXHNcXFNdKSo/Jy9nLFxuXG5cdFx0e1xuXHRcdFx0Ly8gU3RyaW5ncyBhcmUgbXVsdGlsaW5lXG5cdFx0XHRwYXR0ZXJuOiAvXCIoPzpcXFxcP1tcXHNcXFNdKSo/XCIvZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb25cblx0XHRcdH1cblx0XHR9XG5cdF0sXG5cdCdrZXl3b3JkJzogL1xcYihhbmR8YnJlYWt8Ynl8Y2F0Y2h8Y2xhc3N8Y29udGludWV8ZGVidWdnZXJ8ZGVsZXRlfGRvfGVhY2h8ZWxzZXxleHRlbmR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxpZnxpbnxpbnN0YW5jZW9mfGlzfGlzbnR8bGV0fGxvb3B8bmFtZXNwYWNlfG5ld3xub3xub3R8bnVsbHxvZnxvZmZ8b258b3J8b3dufHJldHVybnxzdXBlcnxzd2l0Y2h8dGhlbnx0aGlzfHRocm93fHRydWV8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dW5sZXNzfHVudGlsfHdoZW58d2hpbGV8d2luZG93fHdpdGh8eWVzfHlpZWxkKVxcYi9nLFxuXHQnY2xhc3MtbWVtYmVyJzoge1xuXHRcdHBhdHRlcm46IC9AKD8hXFxkKVxcdysvLFxuXHRcdGFsaWFzOiAndmFyaWFibGUnXG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdjb2ZmZWVzY3JpcHQnLCAnY29tbWVudCcsIHtcblx0J211bHRpbGluZS1jb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8jIyNbXFxzXFxTXSs/IyMjL2csXG5cdFx0YWxpYXM6ICdjb21tZW50J1xuXHR9LFxuXG5cdC8vIEJsb2NrIHJlZ2V4cCBjYW4gY29udGFpbiBjb21tZW50cyBhbmQgaW50ZXJwb2xhdGlvblxuXHQnYmxvY2stcmVnZXgnOiB7XG5cdFx0cGF0dGVybjogL1xcL3szfVtcXHNcXFNdKj9cXC97M30vLFxuXHRcdGFsaWFzOiAncmVnZXgnLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2NvbW1lbnQnOiBjb21tZW50LFxuXHRcdFx0J2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uXG5cdFx0fVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY29mZmVlc2NyaXB0JywgJ3N0cmluZycsIHtcblx0J2lubGluZS1qYXZhc2NyaXB0Jzoge1xuXHRcdHBhdHRlcm46IC9gKD86XFxcXD9bXFxzXFxTXSkqP2AvZyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdkZWxpbWl0ZXInOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eYHxgJC9nLFxuXHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0fSxcblx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEJsb2NrIHN0cmluZ3Ncblx0J211bHRpbGluZS1zdHJpbmcnOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLycnJ1tcXHNcXFNdKj8nJycvLFxuXHRcdFx0YWxpYXM6ICdzdHJpbmcnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvXCJcIlwiW1xcc1xcU10qP1wiXCJcIi8sXG5cdFx0XHRhbGlhczogJ3N0cmluZycsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0aW50ZXJwb2xhdGlvbjogaW50ZXJwb2xhdGlvblxuXHRcdFx0fVxuXHRcdH1cblx0XVxuXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY29mZmVlc2NyaXB0JywgJ2tleXdvcmQnLCB7XG5cdC8vIE9iamVjdCBwcm9wZXJ0eVxuXHQncHJvcGVydHknOiAvKD8hXFxkKVxcdysoPz1cXHMqOig/ITopKS9nXG59KTtcblxufShQcmlzbSkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb2ZmZWVzY3JpcHQuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSA2IDEwXG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmh0dHAgPSB7XG4gICAgJ3JlcXVlc3QtbGluZSc6IHtcbiAgICAgICAgcGF0dGVybjogL14oUE9TVHxHRVR8UFVUfERFTEVURXxPUFRJT05TfFBBVENIfFRSQUNFfENPTk5FQ1QpXFxiXFxzaHR0cHM/OlxcL1xcL1xcUytcXHNIVFRQXFwvWzAtOS5dKy9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIEhUVFAgVmVyYlxuICAgICAgICAgICAgcHJvcGVydHk6IC9eXFxiKFBPU1R8R0VUfFBVVHxERUxFVEV8T1BUSU9OU3xQQVRDSHxUUkFDRXxDT05ORUNUKVxcYi9nLFxuICAgICAgICAgICAgLy8gUGF0aCBvciBxdWVyeSBhcmd1bWVudFxuICAgICAgICAgICAgJ2F0dHItbmFtZSc6IC86XFx3Ky9nXG4gICAgICAgIH1cbiAgICB9LFxuICAgICdyZXNwb25zZS1zdGF0dXMnOiB7XG4gICAgICAgIHBhdHRlcm46IC9eSFRUUFxcLzEuWzAxXSBbMC05XSsuKi9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIFN0YXR1cywgZS5nLiAyMDAgT0tcbiAgICAgICAgICAgIHByb3BlcnR5OiAvWzAtOV0rW0EtWlxccy1dKyQvaWdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gSFRUUCBoZWFkZXIgbmFtZVxuICAgIGtleXdvcmQ6IC9eW1xcdy1dKzooPz0uKykvZ21cbn07XG5cbi8vIENyZWF0ZSBhIG1hcHBpbmcgb2YgQ29udGVudC1UeXBlIGhlYWRlcnMgdG8gbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcbnZhciBodHRwTGFuZ3VhZ2VzID0ge1xuICAgICdhcHBsaWNhdGlvbi9qc29uJzogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAsXG4gICAgJ3RleHQveG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCxcbiAgICAndGV4dC9odG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxufTtcblxuLy8gSW5zZXJ0IGVhY2ggY29udGVudCB0eXBlIHBhcnNlciB0aGF0IGhhcyBpdHMgYXNzb2NpYXRlZCBsYW5ndWFnZVxuLy8gY3VycmVudGx5IGxvYWRlZC5cbmZvciAodmFyIGNvbnRlbnRUeXBlIGluIGh0dHBMYW5ndWFnZXMpIHtcbiAgICBpZiAoaHR0cExhbmd1YWdlc1tjb250ZW50VHlwZV0pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9uc1tjb250ZW50VHlwZV0gPSB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCcoY29udGVudC10eXBlOlxcXFxzKicgKyBjb250ZW50VHlwZSArICdbXFxcXHdcXFxcV10qPylcXFxcblxcXFxuW1xcXFx3XFxcXFddKicsICdnaScpLFxuICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgIHJlc3Q6IGh0dHBMYW5ndWFnZXNbY29udGVudFR5cGVdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2h0dHAnLCAna2V5d29yZCcsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5zY3NzID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY3NzJywge1xuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSkoXFwvXFwqW1xcd1xcV10qP1xcKlxcL3xcXC9cXC8uKj8oXFxyP1xcbnwkKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdC8vIGF0dXJsZSBpcyBqdXN0IHRoZSBAKioqLCBub3QgdGhlIGVudGlyZSBydWxlICh0byBoaWdobGlnaHQgdmFyICYgc3R1ZmZzKVxuXHQvLyArIGFkZCBhYmlsaXR5IHRvIGhpZ2hsaWdodCBudW1iZXIgJiB1bml0IGZvciBtZWRpYSBxdWVyaWVzXG5cdCdhdHJ1bGUnOiAvQFtcXHctXSsoPz1cXHMrKFxcKHxcXHt8OykpL2dpLFxuXHQvLyB1cmwsIGNvbXBhc3NpZmllZFxuXHQndXJsJzogLyhbLWEtel0rLSkqdXJsKD89XFwoKS9naSxcblx0Ly8gQ1NTIHNlbGVjdG9yIHJlZ2V4IGlzIG5vdCBhcHByb3ByaWF0ZSBmb3IgU2Fzc1xuXHQvLyBzaW5jZSB0aGVyZSBjYW4gYmUgbG90IG1vcmUgdGhpbmdzICh2YXIsIEAgZGlyZWN0aXZlLCBuZXN0aW5nLi4pXG5cdC8vIGEgc2VsZWN0b3IgbXVzdCBzdGFydCBhdCB0aGUgZW5kIG9mIGEgcHJvcGVydHkgb3IgYWZ0ZXIgYSBicmFjZSAoZW5kIG9mIG90aGVyIHJ1bGVzIG9yIG5lc3RpbmcpXG5cdC8vIGl0IGNhbiBjb250YWluIHNvbWUgY2FyYWN0ZXJzIHRoYXQgYXJlbid0IHVzZWQgZm9yIGRlZmluaW5nIHJ1bGVzIG9yIGVuZCBvZiBzZWxlY3RvciwgJiAocGFyZW50IHNlbGVjdG9yKSwgb3IgaW50ZXJwb2xhdGVkIHZhcmlhYmxlXG5cdC8vIHRoZSBlbmQgb2YgYSBzZWxlY3RvciBpcyBmb3VuZCB3aGVuIHRoZXJlIGlzIG5vIHJ1bGVzIGluIGl0ICgge30gb3Ige1xcc30pIG9yIGlmIHRoZXJlIGlzIGEgcHJvcGVydHkgKGJlY2F1c2UgYW4gaW50ZXJwb2xhdGVkIHZhclxuXHQvLyBjYW4gXCJwYXNzXCIgYXMgYSBzZWxlY3Rvci0gZS5nOiBwcm9wZXIjeyRlcnR5fSlcblx0Ly8gdGhpcyBvbmUgd2FzIGFyZCB0byBkbywgc28gcGxlYXNlIGJlIGNhcmVmdWwgaWYgeW91IGVkaXQgdGhpcyBvbmUgOilcblx0J3NlbGVjdG9yJzogLyhbXkA7XFx7XFx9XFwoXFwpXT8oW15AO1xce1xcfVxcKFxcKV18JnxcXCNcXHtcXCRbLV9cXHddK1xcfSkrKSg/PVxccypcXHsoXFx9fFxcc3xbXlxcfV0rKDp8XFx7KVteXFx9XSspKS9nbVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnYXRydWxlJywge1xuXHQna2V5d29yZCc6IC9AKGlmfGVsc2UgaWZ8ZWxzZXxmb3J8ZWFjaHx3aGlsZXxpbXBvcnR8ZXh0ZW5kfGRlYnVnfHdhcm58bWl4aW58aW5jbHVkZXxmdW5jdGlvbnxyZXR1cm58Y29udGVudCl8KD89QGZvclxccytcXCRbLV9cXHddK1xccykrZnJvbS9pXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdwcm9wZXJ0eScsIHtcblx0Ly8gdmFyIGFuZCBpbnRlcnBvbGF0ZWQgdmFyc1xuXHQndmFyaWFibGUnOiAvKChcXCRbLV9cXHddKyl8KCNcXHtcXCRbLV9cXHddK1xcfSkpL2lcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQncGxhY2Vob2xkZXInOiAvJVstX1xcd10rL2ksXG5cdCdzdGF0ZW1lbnQnOiAvXFxCIShkZWZhdWx0fG9wdGlvbmFsKVxcYi9naSxcblx0J2Jvb2xlYW4nOiAvXFxiKHRydWV8ZmFsc2UpXFxiL2csXG5cdCdudWxsJzogL1xcYihudWxsKVxcYi9nLFxuXHQnb3BlcmF0b3InOiAvXFxzKyhbLStdezEsMn18PXsxLDJ9fCE9fFxcfD9cXHx8XFw/fFxcKnxcXC98XFwlKVxccysvZ1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDYgMTBcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuc3FsPSB7IFxuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSkoXFwvXFwqW1xcd1xcV10qP1xcKlxcL3woKC0tKXwoXFwvXFwvKXwjKS4qPyhcXHI/XFxufCQpKS9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0J3N0cmluZycgOiB7XG5cdFx0cGF0dGVybjogLyhefFteQF0pKFwifCcpKFxcXFw/W1xcc1xcU10pKj9cXDIvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCd2YXJpYWJsZSc6IC9AW1xcdy4kXSt8QChcInwnfGApKFxcXFw/W1xcc1xcU10pKz9cXDEvZyxcblx0J2Z1bmN0aW9uJzogL1xcYig/OkNPVU5UfFNVTXxBVkd8TUlOfE1BWHxGSVJTVHxMQVNUfFVDQVNFfExDQVNFfE1JRHxMRU58Uk9VTkR8Tk9XfEZPUk1BVCkoPz1cXHMqXFwoKS9pZywgLy8gU2hvdWxkIHdlIGhpZ2hsaWdodCB1c2VyIGRlZmluZWQgZnVuY3Rpb25zIHRvbz9cblx0J2tleXdvcmQnOiAvXFxiKD86QUNUSU9OfEFERHxBRlRFUnxBTEdPUklUSE18QUxURVJ8QU5BTFlaRXxBUFBMWXxBU3xBU0N8QVVUSE9SSVpBVElPTnxCQUNLVVB8QkRCfEJFR0lOfEJFUktFTEVZREJ8QklHSU5UfEJJTkFSWXxCSVR8QkxPQnxCT09MfEJPT0xFQU58QlJFQUt8QlJPV1NFfEJUUkVFfEJVTEt8Qll8Q0FMTHxDQVNDQURFfENBU0NBREVEfENBU0V8Q0hBSU58Q0hBUiBWQVJZSU5HfENIQVJBQ1RFUiBWQVJZSU5HfENIRUNLfENIRUNLUE9JTlR8Q0xPU0V8Q0xVU1RFUkVEfENPQUxFU0NFfENPTFVNTnxDT0xVTU5TfENPTU1FTlR8Q09NTUlUfENPTU1JVFRFRHxDT01QVVRFfENPTk5FQ1R8Q09OU0lTVEVOVHxDT05TVFJBSU5UfENPTlRBSU5TfENPTlRBSU5TVEFCTEV8Q09OVElOVUV8Q09OVkVSVHxDUkVBVEV8Q1JPU1N8Q1VSUkVOVHxDVVJSRU5UX0RBVEV8Q1VSUkVOVF9USU1FfENVUlJFTlRfVElNRVNUQU1QfENVUlJFTlRfVVNFUnxDVVJTT1J8REFUQXxEQVRBQkFTRXxEQVRBQkFTRVN8REFURVRJTUV8REJDQ3xERUFMTE9DQVRFfERFQ3xERUNJTUFMfERFQ0xBUkV8REVGQVVMVHxERUZJTkVSfERFTEFZRUR8REVMRVRFfERFTll8REVTQ3xERVNDUklCRXxERVRFUk1JTklTVElDfERJU0FCTEV8RElTQ0FSRHxESVNLfERJU1RJTkNUfERJU1RJTkNUUk9XfERJU1RSSUJVVEVEfERPfERPVUJMRXxET1VCTEUgUFJFQ0lTSU9OfERST1B8RFVNTVl8RFVNUHxEVU1QRklMRXxEVVBMSUNBVEUgS0VZfEVMU0V8RU5BQkxFfEVOQ0xPU0VEIEJZfEVORHxFTkdJTkV8RU5VTXxFUlJMVkx8RVJST1JTfEVTQ0FQRXxFU0NBUEVEIEJZfEVYQ0VQVHxFWEVDfEVYRUNVVEV8RVhJVHxFWFBMQUlOfEVYVEVOREVEfEZFVENIfEZJRUxEU3xGSUxFfEZJTExGQUNUT1J8RklSU1R8RklYRUR8RkxPQVR8Rk9MTE9XSU5HfEZPUnxGT1IgRUFDSCBST1d8Rk9SQ0V8Rk9SRUlHTnxGUkVFVEVYVHxGUkVFVEVYVFRBQkxFfEZST018RlVMTHxGVU5DVElPTnxHRU9NRVRSWXxHRU9NRVRSWUNPTExFQ1RJT058R0xPQkFMfEdPVE98R1JBTlR8R1JPVVB8SEFORExFUnxIQVNIfEhBVklOR3xIT0xETE9DS3xJREVOVElUWXxJREVOVElUWV9JTlNFUlR8SURFTlRJVFlDT0x8SUZ8SUdOT1JFfElNUE9SVHxJTkRFWHxJTkZJTEV8SU5ORVJ8SU5OT0RCfElOT1VUfElOU0VSVHxJTlR8SU5URUdFUnxJTlRFUlNFQ1R8SU5UT3xJTlZPS0VSfElTT0xBVElPTiBMRVZFTHxKT0lOfEtFWXxLRVlTfEtJTEx8TEFOR1VBR0UgU1FMfExBU1R8TEVGVHxMSU1JVHxMSU5FTk98TElORVN8TElORVNUUklOR3xMT0FEfExPQ0FMfExPQ0t8TE9OR0JMT0J8TE9OR1RFWFR8TUFUQ0h8TUFUQ0hFRHxNRURJVU1CTE9CfE1FRElVTUlOVHxNRURJVU1URVhUfE1FUkdFfE1JRERMRUlOVHxNT0RJRklFUyBTUUwgREFUQXxNT0RJRll8TVVMVElMSU5FU1RSSU5HfE1VTFRJUE9JTlR8TVVMVElQT0xZR09OfE5BVElPTkFMfE5BVElPTkFMIENIQVIgVkFSWUlOR3xOQVRJT05BTCBDSEFSQUNURVJ8TkFUSU9OQUwgQ0hBUkFDVEVSIFZBUllJTkd8TkFUSU9OQUwgVkFSQ0hBUnxOQVRVUkFMfE5DSEFSfE5DSEFSIFZBUkNIQVJ8TkVYVHxOT3xOTyBTUUx8Tk9DSEVDS3xOT0NZQ0xFfE5PTkNMVVNURVJFRHxOVUxMSUZ8TlVNRVJJQ3xPRnxPRkZ8T0ZGU0VUU3xPTnxPUEVOfE9QRU5EQVRBU09VUkNFfE9QRU5RVUVSWXxPUEVOUk9XU0VUfE9QVElNSVpFfE9QVElPTnxPUFRJT05BTExZfE9SREVSfE9VVHxPVVRFUnxPVVRGSUxFfE9WRVJ8UEFSVElBTHxQQVJUSVRJT058UEVSQ0VOVHxQSVZPVHxQTEFOfFBPSU5UfFBPTFlHT058UFJFQ0VESU5HfFBSRUNJU0lPTnxQUkVWfFBSSU1BUll8UFJJTlR8UFJJVklMRUdFU3xQUk9DfFBST0NFRFVSRXxQVUJMSUN8UFVSR0V8UVVJQ0t8UkFJU0VSUk9SfFJFQUR8UkVBRFMgU1FMIERBVEF8UkVBRFRFWFR8UkVBTHxSRUNPTkZJR1VSRXxSRUZFUkVOQ0VTfFJFTEVBU0V8UkVOQU1FfFJFUEVBVEFCTEV8UkVQTElDQVRJT058UkVRVUlSRXxSRVNUT1JFfFJFU1RSSUNUfFJFVFVSTnxSRVRVUk5TfFJFVk9LRXxSSUdIVHxST0xMQkFDS3xST1VUSU5FfFJPV0NPVU5UfFJPV0dVSURDT0x8Uk9XUz98UlRSRUV8UlVMRXxTQVZFfFNBVkVQT0lOVHxTQ0hFTUF8U0VMRUNUfFNFUklBTHxTRVJJQUxJWkFCTEV8U0VTU0lPTnxTRVNTSU9OX1VTRVJ8U0VUfFNFVFVTRVJ8U0hBUkUgTU9ERXxTSE9XfFNIVVRET1dOfFNJTVBMRXxTTUFMTElOVHxTTkFQU0hPVHxTT01FfFNPTkFNRXxTVEFSVHxTVEFSVElORyBCWXxTVEFUSVNUSUNTfFNUQVRVU3xTVFJJUEVEfFNZU1RFTV9VU0VSfFRBQkxFfFRBQkxFU3xUQUJMRVNQQUNFfFRFTVAoPzpPUkFSWSk/fFRFTVBUQUJMRXxURVJNSU5BVEVEIEJZfFRFWFR8VEVYVFNJWkV8VEhFTnxUSU1FU1RBTVB8VElOWUJMT0J8VElOWUlOVHxUSU5ZVEVYVHxUT3xUT1B8VFJBTnxUUkFOU0FDVElPTnxUUkFOU0FDVElPTlN8VFJJR0dFUnxUUlVOQ0FURXxUU0VRVUFMfFRZUEV8VFlQRVN8VU5CT1VOREVEfFVOQ09NTUlUVEVEfFVOREVGSU5FRHxVTklPTnxVTlBJVk9UfFVQREFURXxVUERBVEVURVhUfFVTQUdFfFVTRXxVU0VSfFVTSU5HfFZBTFVFfFZBTFVFU3xWQVJCSU5BUll8VkFSQ0hBUnxWQVJDSEFSQUNURVJ8VkFSWUlOR3xWSUVXfFdBSVRGT1J8V0FSTklOR1N8V0hFTnxXSEVSRXxXSElMRXxXSVRIfFdJVEggUk9MTFVQfFdJVEhJTnxXT1JLfFdSSVRFfFdSSVRFVEVYVClcXGIvZ2ksXG5cdCdib29sZWFuJzogL1xcYig/OlRSVUV8RkFMU0V8TlVMTClcXGIvZ2ksXG5cdCdudW1iZXInOiAvXFxiLT8oMHgpP1xcZCpcXC4/W1xcZGEtZl0rXFxiL2csXG5cdCdvcGVyYXRvcic6IC9cXGIoPzpBTEx8QU5EfEFOWXxCRVRXRUVOfEVYSVNUU3xJTnxMSUtFfE5PVHxPUnxJU3xVTklRVUV8Q0hBUkFDVEVSIFNFVHxDT0xMQVRFfERJVnxPRkZTRVR8UkVHRVhQfFJMSUtFfFNPVU5EUyBMSUtFfFhPUilcXGJ8Wy0rXXsxfXwhfFs9PD5dezEsMn18KCYpezEsMn18XFx8P1xcfHxcXD98XFwqfFxcLy9naSxcblx0J3B1bmN0dWF0aW9uJzogL1s7W1xcXSgpYCwuXS9nXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zcWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSA2IDEwXG4gKiovIiwiLyoqXG4gKiBPcmlnaW5hbCBieSBBYXJvbiBIYXJ1bjogaHR0cDovL2FhaGFjcmVhdGl2ZS5jb20vMjAxMi8wNy8zMS9waHAtc3ludGF4LWhpZ2hsaWdodGluZy1wcmlzbS9cbiAqIE1vZGlmaWVkIGJ5IE1pbGVzIEpvaG5zb246IGh0dHA6Ly9taWxlc2oubWVcbiAqXG4gKiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nOlxuICogXHRcdC0gRXh0ZW5kcyBjbGlrZSBzeW50YXhcbiAqIFx0XHQtIFN1cHBvcnQgZm9yIFBIUCA1LjMrIChuYW1lc3BhY2VzLCB0cmFpdHMsIGdlbmVyYXRvcnMsIGV0YylcbiAqIFx0XHQtIFNtYXJ0ZXIgY29uc3RhbnQgYW5kIGZ1bmN0aW9uIG1hdGNoaW5nXG4gKlxuICogQWRkcyB0aGUgZm9sbG93aW5nIG5ldyB0b2tlbiBjbGFzc2VzOlxuICogXHRcdGNvbnN0YW50LCBkZWxpbWl0ZXIsIHZhcmlhYmxlLCBmdW5jdGlvbiwgcGFja2FnZVxuICovXG5cblByaXNtLmxhbmd1YWdlcy5waHAgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKGFuZHxvcnx4b3J8YXJyYXl8YXN8YnJlYWt8Y2FzZXxjZnVuY3Rpb258Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVjbGFyZXxkZWZhdWx0fGRpZXxkb3xlbHNlfGVsc2VpZnxlbmRkZWNsYXJlfGVuZGZvcnxlbmRmb3JlYWNofGVuZGlmfGVuZHN3aXRjaHxlbmR3aGlsZXxleHRlbmRzfGZvcnxmb3JlYWNofGZ1bmN0aW9ufGluY2x1ZGV8aW5jbHVkZV9vbmNlfGdsb2JhbHxpZnxuZXd8cmV0dXJufHN0YXRpY3xzd2l0Y2h8dXNlfHJlcXVpcmV8cmVxdWlyZV9vbmNlfHZhcnx3aGlsZXxhYnN0cmFjdHxpbnRlcmZhY2V8cHVibGljfGltcGxlbWVudHN8cHJpdmF0ZXxwcm90ZWN0ZWR8cGFyZW50fHRocm93fG51bGx8ZWNob3xwcmludHx0cmFpdHxuYW1lc3BhY2V8ZmluYWx8eWllbGR8Z290b3xpbnN0YW5jZW9mfGZpbmFsbHl8dHJ5fGNhdGNoKVxcYi9pZyxcblx0J2NvbnN0YW50JzogL1xcYltBLVowLTlfXXsyLH1cXGIvZyxcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKFxcL1xcKltcXHdcXFddKj9cXCpcXC98KF58W146XSkoXFwvXFwvfCMpLio/KFxccj9cXG58JCkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2tleXdvcmQnLCB7XG5cdCdkZWxpbWl0ZXInOiAvKFxcPz58PFxcP3BocHw8XFw/KS9pZyxcblx0J3ZhcmlhYmxlJzogLyhcXCRcXHcrKVxcYi9pZyxcblx0J3BhY2thZ2UnOiB7XG5cdFx0cGF0dGVybjogLyhcXFxcfG5hbWVzcGFjZVxccyt8dXNlXFxzKylbXFx3XFxcXF0rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdHB1bmN0dWF0aW9uOiAvXFxcXC9cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBNdXN0IGJlIGRlZmluZWQgYWZ0ZXIgdGhlIGZ1bmN0aW9uIHBhdHRlcm5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdvcGVyYXRvcicsIHtcblx0J3Byb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oLT4pW1xcd10rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuLy8gQWRkIEhUTUwgc3VwcG9ydCBvZiB0aGUgbWFya3VwIGxhbmd1YWdlIGV4aXN0c1xuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblxuXHQvLyBUb2tlbml6ZSBhbGwgaW5saW5lIFBIUCBibG9ja3MgdGhhdCBhcmUgd3JhcHBlZCBpbiA8P3BocCA/PlxuXHQvLyBUaGlzIGFsbG93cyBmb3IgZWFzeSBQSFAgKyBtYXJrdXAgaGlnaGxpZ2h0aW5nXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgIT09ICdwaHAnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZW52LnRva2VuU3RhY2sgPSBbXTtcblxuXHRcdGVudi5iYWNrdXBDb2RlID0gZW52LmNvZGU7XG5cdFx0ZW52LmNvZGUgPSBlbnYuY29kZS5yZXBsYWNlKC8oPzo8XFw/cGhwfDxcXD8pW1xcd1xcV10qPyg/OlxcPz4pL2lnLCBmdW5jdGlvbihtYXRjaCkge1xuXHRcdFx0ZW52LnRva2VuU3RhY2sucHVzaChtYXRjaCk7XG5cblx0XHRcdHJldHVybiAne3t7UEhQJyArIGVudi50b2tlblN0YWNrLmxlbmd0aCArICd9fX0nO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBSZXN0b3JlIGVudi5jb2RlIGZvciBvdGhlciBwbHVnaW5zIChlLmcuIGxpbmUtbnVtYmVycylcblx0UHJpc20uaG9va3MuYWRkKCdiZWZvcmUtaW5zZXJ0JywgZnVuY3Rpb24oZW52KSB7XG5cdFx0aWYgKGVudi5sYW5ndWFnZSA9PT0gJ3BocCcpIHtcblx0XHRcdGVudi5jb2RlID0gZW52LmJhY2t1cENvZGU7XG5cdFx0XHRkZWxldGUgZW52LmJhY2t1cENvZGU7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBSZS1pbnNlcnQgdGhlIHRva2VucyBhZnRlciBoaWdobGlnaHRpbmdcblx0UHJpc20uaG9va3MuYWRkKCdhZnRlci1oaWdobGlnaHQnLCBmdW5jdGlvbihlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlICE9PSAncGhwJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwLCB0OyB0ID0gZW52LnRva2VuU3RhY2tbaV07IGkrKykge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGVudi5oaWdobGlnaHRlZENvZGUucmVwbGFjZSgne3t7UEhQJyArIChpICsgMSkgKyAnfX19JywgUHJpc20uaGlnaGxpZ2h0KHQsIGVudi5ncmFtbWFyLCAncGhwJykpO1xuXHRcdH1cblxuXHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cdH0pO1xuXG5cdC8vIFdyYXAgdG9rZW5zIGluIGNsYXNzZXMgdGhhdCBhcmUgbWlzc2luZyB0aGVtXG5cdFByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgPT09ICdwaHAnICYmIGVudi50eXBlID09PSAnbWFya3VwJykge1xuXHRcdFx0ZW52LmNvbnRlbnQgPSBlbnYuY29udGVudC5yZXBsYWNlKC8oXFx7XFx7XFx7UEhQWzAtOV0rXFx9XFx9XFx9KS9nLCBcIjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwaHBcXFwiPiQxPC9zcGFuPlwiKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEFkZCB0aGUgcnVsZXMgYmVmb3JlIGFsbCBvdGhlcnNcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2NvbW1lbnQnLCB7XG5cdFx0J21hcmt1cCc6IHtcblx0XHRcdHBhdHRlcm46IC88W14/XVxcLz8oLio/KT4vZyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxuXHRcdH0sXG5cdFx0J3BocCc6IC9cXHtcXHtcXHtQSFBbMC05XStcXH1cXH1cXH0vZ1xuXHR9KTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSA2IDEwXG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ3ZhcmlhYmxlJywge1xuXHQndGhpcyc6IC9cXCR0aGlzL2csXG5cdCdnbG9iYWwnOiAvXFwkXz8oR0xPQkFMU3xTRVJWRVJ8R0VUfFBPU1R8RklMRVN8UkVRVUVTVHxTRVNTSU9OfEVOVnxDT09LSUV8SFRUUF9SQVdfUE9TVF9EQVRBfGFyZ2N8YXJndnxwaHBfZXJyb3Jtc2d8aHR0cF9yZXNwb25zZV9oZWFkZXIpL2csXG5cdCdzY29wZSc6IHtcblx0XHRwYXR0ZXJuOiAvXFxiW1xcd1xcXFxdKzo6L2csXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHRrZXl3b3JkOiAvKHN0YXRpY3xzZWxmfHBhcmVudCkvLFxuXHRcdFx0cHVuY3R1YXRpb246IC8oOjp8XFxcXCkvXG5cdFx0fVxuXHR9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLWV4dHJhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDYgMTBcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMucHl0aG9uPSB7IFxuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSkjLio/KFxccj9cXG58JCkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdzdHJpbmcnOiAvXCJcIlwiW1xcc1xcU10rP1wiXCJcInwnJydbXFxzXFxTXSs/JycnfChcInwnKShcXFxcPy4pKj9cXDEvZyxcblx0J2tleXdvcmQnIDogL1xcYihhc3xhc3NlcnR8YnJlYWt8Y2xhc3N8Y29udGludWV8ZGVmfGRlbHxlbGlmfGVsc2V8ZXhjZXB0fGV4ZWN8ZmluYWxseXxmb3J8ZnJvbXxnbG9iYWx8aWZ8aW1wb3J0fGlufGlzfGxhbWJkYXxwYXNzfHByaW50fHJhaXNlfHJldHVybnx0cnl8d2hpbGV8d2l0aHx5aWVsZClcXGIvZyxcblx0J2Jvb2xlYW4nIDogL1xcYihUcnVlfEZhbHNlKVxcYi9nLFxuXHQnbnVtYmVyJyA6IC9cXGItPygwW2JveF0pPyg/OltcXGRhLWZdK1xcLj9cXGQqfFxcLlxcZCspKD86ZVsrLV0/XFxkKyk/aj9cXGIvZ2ksXG5cdCdvcGVyYXRvcicgOiAvWy0rXXsxLDJ9fD0/Jmx0O3w9PyZndDt8IXw9ezEsMn18KCYpezEsMn18KCZhbXA7KXsxLDJ9fFxcfD9cXHx8XFw/fFxcKnxcXC98fnxcXF58JXxcXGIob3J8YW5kfG5vdClcXGIvZyxcblx0J2lnbm9yZScgOiAvJihsdHxndHxhbXApOy9naSxcblx0J3B1bmN0dWF0aW9uJyA6IC9be31bXFxdOygpLC46XS9nXG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gNiAxMFxuICoqLyIsIi8qKlxuICogT3JpZ2luYWwgYnkgU2FtdWVsIEZsb3Jlc1xuICpcbiAqIEFkZHMgdGhlIGZvbGxvd2luZyBuZXcgdG9rZW4gY2xhc3NlczpcbiAqIFx0XHRjb25zdGFudCwgYnVpbHRpbiwgdmFyaWFibGUsIHN5bWJvbCwgcmVnZXhcbiAqL1xuUHJpc20ubGFuZ3VhZ2VzLnJ1YnkgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NvbW1lbnQnOiAvI1teXFxyXFxuXSooXFxyP1xcbnwkKS9nLFxuXHQna2V5d29yZCc6IC9cXGIoYWxpYXN8YW5kfEJFR0lOfGJlZ2lufGJyZWFrfGNhc2V8Y2xhc3N8ZGVmfGRlZmluZV9tZXRob2R8ZGVmaW5lZHxkb3xlYWNofGVsc2V8ZWxzaWZ8RU5EfGVuZHxlbnN1cmV8ZmFsc2V8Zm9yfGlmfGlufG1vZHVsZXxuZXd8bmV4dHxuaWx8bm90fG9yfHJhaXNlfHJlZG98cmVxdWlyZXxyZXNjdWV8cmV0cnl8cmV0dXJufHNlbGZ8c3VwZXJ8dGhlbnx0aHJvd3x0cnVlfHVuZGVmfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHlpZWxkKVxcYi9nLFxuXHQnYnVpbHRpbic6IC9cXGIoQXJyYXl8QmlnbnVtfEJpbmRpbmd8Q2xhc3N8Q29udGludWF0aW9ufERpcnxFeGNlcHRpb258RmFsc2VDbGFzc3xGaWxlfFN0YXR8RmlsZXxGaXhudW18RmxvYWR8SGFzaHxJbnRlZ2VyfElPfE1hdGNoRGF0YXxNZXRob2R8TW9kdWxlfE5pbENsYXNzfE51bWVyaWN8T2JqZWN0fFByb2N8UmFuZ2V8UmVnZXhwfFN0cmluZ3xTdHJ1Y3R8VE1TfFN5bWJvbHxUaHJlYWRHcm91cHxUaHJlYWR8VGltZXxUcnVlQ2xhc3MpXFxiLyxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdW2EtekEtWl8wLTldKls/IV0/XFxiL2dcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdydWJ5JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCd2YXJpYWJsZSc6IC9bQCRdK1xcYlthLXpBLVpfXVthLXpBLVpfMC05XSpbPyFdP1xcYi9nLFxuXHQnc3ltYm9sJzogLzpcXGJbYS16QS1aX11bYS16QS1aXzAtOV0qWz8hXT9cXGIvZ1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDYgMTBcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuamF2YSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQna2V5d29yZCc6IC9cXGIoYWJzdHJhY3R8Y29udGludWV8Zm9yfG5ld3xzd2l0Y2h8YXNzZXJ0fGRlZmF1bHR8Z290b3xwYWNrYWdlfHN5bmNocm9uaXplZHxib29sZWFufGRvfGlmfHByaXZhdGV8dGhpc3xicmVha3xkb3VibGV8aW1wbGVtZW50c3xwcm90ZWN0ZWR8dGhyb3d8Ynl0ZXxlbHNlfGltcG9ydHxwdWJsaWN8dGhyb3dzfGNhc2V8ZW51bXxpbnN0YW5jZW9mfHJldHVybnx0cmFuc2llbnR8Y2F0Y2h8ZXh0ZW5kc3xpbnR8c2hvcnR8dHJ5fGNoYXJ8ZmluYWx8aW50ZXJmYWNlfHN0YXRpY3x2b2lkfGNsYXNzfGZpbmFsbHl8bG9uZ3xzdHJpY3RmcHx2b2xhdGlsZXxjb25zdHxmbG9hdHxuYXRpdmV8c3VwZXJ8d2hpbGUpXFxiL2csXG5cdCdudW1iZXInOiAvXFxiMGJbMDFdK1xcYnxcXGIweFtcXGRhLWZdKlxcLj9bXFxkYS1mcFxcLV0rXFxifFxcYlxcZCpcXC4/XFxkK1tlXT9bXFxkXSpbZGZdXFxifFxcYlxcZCpcXC4/XFxkK1xcYi9naSxcblx0J29wZXJhdG9yJzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcLl0pKD86XFwrPXxcXCtcXCs/fC09fC0tP3whPT98PHsxLDJ9PT98PnsxLDN9PT98PT0/fCY9fCYmP3xcXHw9fFxcfFxcfD98XFw/fFxcKj0/fFxcLz0/fCU9P3xcXF49P3w6fH4pL2dtLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fVxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSA2IDEwXG4gKiovIiwiXG5mdW5jdGlvbiBhZGRMaW5lTnVtYmVycyhwcmUpIHtcblxuICB2YXIgbGluZXNOdW0gPSAoMSArIHByZS5pbm5lckhUTUwuc3BsaXQoJ1xcbicpLmxlbmd0aCk7XG4gIHZhciBsaW5lTnVtYmVyc1dyYXBwZXI7XG5cbiAgdmFyIGxpbmVzID0gbmV3IEFycmF5KGxpbmVzTnVtKTtcbiAgbGluZXMgPSBsaW5lcy5qb2luKCc8c3Bhbj48L3NwYW4+Jyk7XG5cbiAgbGluZU51bWJlcnNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBsaW5lTnVtYmVyc1dyYXBwZXIuY2xhc3NOYW1lID0gJ2xpbmUtbnVtYmVycy1yb3dzJztcbiAgbGluZU51bWJlcnNXcmFwcGVyLmlubmVySFRNTCA9IGxpbmVzO1xuXG4gIGlmIChwcmUuaGFzQXR0cmlidXRlKCdkYXRhLXN0YXJ0JykpIHtcbiAgICBwcmUuc3R5bGUuY291bnRlclJlc2V0ID0gJ2xpbmVudW1iZXIgJyArIE51bWJlcihwcmUuZGF0YXNldC5zdGFydCkgLSAxO1xuICB9XG5cbiAgcHJlLmFwcGVuZENoaWxkKGxpbmVOdW1iZXJzV3JhcHBlcik7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRMaW5lTnVtYmVycztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2FkZExpbmVOdW1iZXJzLmpzXG4gKiovIiwiXG5mdW5jdGlvbiBpc1Njcm9sbGVkSW50b1ZpZXcoZWxlbSkge1xuICB2YXIgY29vcmRzID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICB2YXIgdmlzaWJsZUhlaWdodCA9IDA7XG5cbiAgaWYgKGNvb3Jkcy50b3AgPCAwKSB7XG4gICAgdmlzaWJsZUhlaWdodCA9IGNvb3Jkcy5ib3R0b207XG4gIH0gZWxzZSBpZiAoY29vcmRzLmJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgIHZpc2libGVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3A7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdmlzaWJsZUhlaWdodCA+IDEwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU2Nyb2xsZWRJbnRvVmlldztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2lzU2Nyb2xsZWRJbnRvVmlldy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InR1dG9yaWFsLmVkZGJiYTRkOTZhZmQ2OTlhY2VlLmpzIn0=
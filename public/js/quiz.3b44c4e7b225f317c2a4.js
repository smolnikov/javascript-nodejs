var quiz =
webpackJsonp_name_([9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Spinner = __webpack_require__(29);
	var xhr = __webpack_require__(30);
	var getCsrfCookie = __webpack_require__(31);
	var prism = __webpack_require__(32);
	
	function init() {
	  var quizQuestionForm = document.querySelector("[data-quiz-question-form]");
	
	  if (quizQuestionForm) {
	    initQuizForm(quizQuestionForm);
	  }
	
	  var quizResultSaveForm = document.querySelector("[data-quiz-result-save-form]");
	
	  if (quizResultSaveForm) {
	    initQuizResultSaveForm(quizResultSaveForm);
	  }
	
	  prism.init();
	}
	
	function initQuizResultSaveForm(form) {
	  form.onsubmit = function (e) {
	
	    if (window.currentUser) {
	      // normal submit => profile
	      return;
	    }
	
	    e.preventDefault();
	
	    authAndSubmit();
	  };
	
	  function authAndSubmit() {
	
	    // let's authorize first
	    var submitButton = form.querySelector("[type=\"submit\"]");
	
	    var spinner = new Spinner({
	      elem: submitButton,
	      size: "small",
	      "class": "submit-button__spinner",
	      elemClass: "submit-button_progress"
	    });
	    spinner.start();
	
	    __webpack_require__.e/* nsure */(8, function () {
	      spinner.stop();
	      var AuthModal = __webpack_require__(39).AuthModal;
	      new AuthModal({
	        callback: function callback() {
	          var csrf = getCsrfCookie();
	          form.elements._csrf.value = csrf;
	          form.submit();
	        }
	      });
	    });
	  }
	}
	
	function initQuizForm(form) {
	
	  function getValue() {
	    var type = form.elements.type.value;
	
	    var answerElems = form.elements.answer;
	
	    var value = [];
	
	    for (var i = 0; i < answerElems.length; i++) {
	      if (answerElems[i].checked) {
	        value.push(+answerElems[i].value);
	      }
	    }
	
	    if (type == "single") {
	      value = value[0];
	    }
	
	    return value;
	  }
	
	  form.onchange = function () {
	    var value = getValue();
	
	    switch (form.elements.type.value) {
	      case "single":
	        form.querySelector("[type=\"submit\"]").disabled = value === undefined;
	        break;
	      case "multi":
	        form.querySelector("[type=\"submit\"]").disabled = value.length ? false : true;
	        break;
	      default:
	        throw new Error("unknown type");
	    }
	  };
	
	  form.onsubmit = function (event) {
	    event.preventDefault();
	    var value = getValue();
	
	    var request = xhr({
	      method: "POST",
	      url: form.action,
	      body: {
	        answer: value
	      }
	    });
	
	    var submitButton = form.querySelector("[type=\"submit\"]");
	
	    var spinner = new Spinner({
	      elem: submitButton,
	      size: "small",
	      elemClass: "button_loading"
	    });
	    spinner.start();
	    submitButton.disabled = true;
	
	    request.addEventListener("loadend", function () {
	      spinner.stop();
	    });
	
	    request.addEventListener("fail", function () {
	      return submitButton.disabled = false;
	    });
	    request.addEventListener("success", function (event) {
	      if (event.result.reload) {
	        window.location.reload();
	      } else if (event.result.html) {
	        document.querySelector(".quiz-timeline .quiz-timeline__number_current").classList.remove("quiz-timeline__number_current");
	
	        document.querySelectorAll(".quiz-timeline span")[event.result.questionNumber].classList.add("quiz-timeline__number_current");
	
	        form.innerHTML = event.result.html;
	        prism.highlight(form);
	      } else {
	        console.error("Bad response", event.result);
	      }
	    });
	  };
	}
	
	exports.init = init;

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
/* 33 */,
/* 34 */,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy9xdWl6L2NsaWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQveGhyLmpzPzY4NTIqKioiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2dldENzcmZDb29raWUuanM/ZDEyYSoqKiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcHJpc20vaW5kZXguanM/ZDcyYiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcHJpc20vY29kZUJveC5qcz8zZDcxIiwid2VicGFjazovLy8uL2NsaWVudC9wcmlzbS9jb2RlVGFic0JveC5qcz82MjNmIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM/YmNlMSIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXAuanM/NzRmZSIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanM/ZmE2MCIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MtZXh0cmFzLmpzPzNlZjQiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY2xpa2UuanM/N2IxMSIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzPzYyMWIiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29mZmVlc2NyaXB0LmpzPzE2MWEiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taHR0cC5qcz9lZTdhIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNjc3MuanM/YzNiMCIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zcWwuanM/YTQ4ZSIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAuanM/YzZkZSIsIndlYnBhY2s6Ly8vLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAtZXh0cmFzLmpzPzE1MjAiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uLmpzP2Q1NjkiLCJ3ZWJwYWNrOi8vLy4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5qcz83M2UzIiwid2VicGFjazovLy8uL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEuanM/Y2NhYyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcHJpc20vYWRkTGluZU51bWJlcnMuanM/ODcwZCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvaXNTY3JvbGxlZEludG9WaWV3LmpzPzA2NTUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLEtBQUksT0FBTyxHQUFHLG1CQUFPLENBQUMsRUFBZ0IsQ0FBQyxDQUFDO0FBQ3hDLEtBQUksR0FBRyxHQUFHLG1CQUFPLENBQUMsRUFBWSxDQUFDLENBQUM7QUFDaEMsS0FBSSxhQUFhLEdBQUcsbUJBQU8sQ0FBQyxFQUFzQixDQUFDLENBQUM7QUFDcEQsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFjLENBQUMsQ0FBQzs7QUFFcEMsVUFBUyxJQUFJLEdBQUc7QUFDZCxPQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFM0UsT0FBSSxnQkFBZ0IsRUFBRTtBQUNwQixpQkFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEM7O0FBRUQsT0FBSSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7O0FBRWhGLE9BQUksa0JBQWtCLEVBQUU7QUFDdEIsMkJBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1Qzs7QUFHRCxRQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7RUFDZDs7QUFFRCxVQUFTLHNCQUFzQixDQUFDLElBQUksRUFBRTtB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Ozs7Ozs7QUNwQi9CLFVBQVMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO0FBQ2hDLE9BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztBQUUxQyxPQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7O0FBRXRCLE9BQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7QUFDbEIsa0JBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDN0Msa0JBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUMxQyxNQUFNO0FBQ0wsWUFBTyxJQUFJLENBQUM7SUFDYjs7QUFFRCxVQUFPLGFBQWEsR0FBRyxFQUFFLENBQUM7RUFDM0I7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTcGlubmVyID0gcmVxdWlyZSgnY2xpZW50L3NwaW5uZXInKTtcbnZhciB4aHIgPSByZXF1aXJlKCdjbGllbnQveGhyJyk7XG52YXIgZ2V0Q3NyZkNvb2tpZSA9IHJlcXVpcmUoJ2NsaWVudC9nZXRDc3JmQ29va2llJyk7XG52YXIgcHJpc20gPSByZXF1aXJlKCdjbGllbnQvcHJpc20nKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdmFyIHF1aXpRdWVzdGlvbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6LXF1ZXN0aW9uLWZvcm1dJyk7XG5cbiAgaWYgKHF1aXpRdWVzdGlvbkZvcm0pIHtcbiAgICBpbml0UXVpekZvcm0ocXVpelF1ZXN0aW9uRm9ybSk7XG4gIH1cblxuICB2YXIgcXVpelJlc3VsdFNhdmVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpei1yZXN1bHQtc2F2ZS1mb3JtXScpO1xuXG4gIGlmIChxdWl6UmVzdWx0U2F2ZUZvcm0pIHtcbiAgICBpbml0UXVpelJlc3VsdFNhdmVGb3JtKHF1aXpSZXN1bHRTYXZlRm9ybSk7XG4gIH1cblxuXG4gIHByaXNtLmluaXQoKTtcbn1cblxuZnVuY3Rpb24gaW5pdFF1aXpSZXN1bHRTYXZlRm9ybShmb3JtKSB7XG4gIGZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG5cbiAgICBpZiAod2luZG93LmN1cnJlbnRVc2VyKSB7XG4gICAgICAvLyBub3JtYWwgc3VibWl0ID0+IHByb2ZpbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBhdXRoQW5kU3VibWl0KCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gYXV0aEFuZFN1Ym1pdCgpIHtcblxuICAgIC8vIGxldCdzIGF1dGhvcml6ZSBmaXJzdFxuICAgIHZhciBzdWJtaXRCdXR0b24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJyk7XG5cbiAgICB2YXIgc3Bpbm5lciA9IG5ldyBTcGlubmVyKHtcbiAgICAgIGVsZW06ICAgICAgc3VibWl0QnV0dG9uLFxuICAgICAgc2l6ZTogICAgICAnc21hbGwnLFxuICAgICAgY2xhc3M6ICAgICAnc3VibWl0LWJ1dHRvbl9fc3Bpbm5lcicsXG4gICAgICBlbGVtQ2xhc3M6ICdzdWJtaXQtYnV0dG9uX3Byb2dyZXNzJ1xuICAgIH0pO1xuICAgIHNwaW5uZXIuc3RhcnQoKTtcblxuICAgIHJlcXVpcmUuZW5zdXJlKCdhdXRoL2NsaWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgICB2YXIgQXV0aE1vZGFsID0gcmVxdWlyZSgnYXV0aC9jbGllbnQnKS5BdXRoTW9kYWw7XG4gICAgICBuZXcgQXV0aE1vZGFsKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjc3JmID0gZ2V0Q3NyZkNvb2tpZSgpO1xuICAgICAgICAgIGZvcm0uZWxlbWVudHMuX2NzcmYudmFsdWUgPSBjc3JmO1xuICAgICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sICdhdXRoQ2xpZW50Jyk7XG5cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGluaXRRdWl6Rm9ybShmb3JtKSB7XG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgdmFyIHR5cGUgPSBmb3JtLmVsZW1lbnRzLnR5cGUudmFsdWU7XG5cbiAgICB2YXIgYW5zd2VyRWxlbXMgPSBmb3JtLmVsZW1lbnRzLmFuc3dlcjtcblxuICAgIHZhciB2YWx1ZSA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbnN3ZXJFbGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFuc3dlckVsZW1zW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUucHVzaCgrYW5zd2VyRWxlbXNbaV0udmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlID09ICdzaW5nbGUnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlWzBdO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGZvcm0ub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZSgpO1xuXG4gICAgc3dpdGNoKGZvcm0uZWxlbWVudHMudHlwZS52YWx1ZSkge1xuICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJykuZGlzYWJsZWQgPSAodmFsdWUgPT09IHVuZGVmaW5lZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtdWx0aSc6XG4gICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJykuZGlzYWJsZWQgPSB2YWx1ZS5sZW5ndGggPyBmYWxzZSA6IHRydWU7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlXCIpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKCk7XG5cbiAgICB2YXIgcmVxdWVzdCA9IHhocih7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVybDogICAgZm9ybS5hY3Rpb24sXG4gICAgICBib2R5OiAgIHtcbiAgICAgICAgYW5zd2VyOiB2YWx1ZVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKTtcblxuICAgIHZhciBzcGlubmVyID0gbmV3IFNwaW5uZXIoe1xuICAgICAgZWxlbTogICAgICBzdWJtaXRCdXR0b24sXG4gICAgICBzaXplOiAgICAgICdzbWFsbCcsXG4gICAgICBlbGVtQ2xhc3M6ICdidXR0b25fbG9hZGluZydcbiAgICB9KTtcbiAgICBzcGlubmVyLnN0YXJ0KCk7XG4gICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsICgpPT4ge1xuICAgICAgc3Bpbm5lci5zdG9wKCk7XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZhaWwnLCAoKSA9PiBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQucmVzdWx0LnJlbG9hZCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnJlc3VsdC5odG1sKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5xdWl6LXRpbWVsaW5lIC5xdWl6LXRpbWVsaW5lX19udW1iZXJfY3VycmVudCcpXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ3F1aXotdGltZWxpbmVfX251bWJlcl9jdXJyZW50Jyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnF1aXotdGltZWxpbmUgc3BhbicpW2V2ZW50LnJlc3VsdC5xdWVzdGlvbk51bWJlcl1cbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZCgncXVpei10aW1lbGluZV9fbnVtYmVyX2N1cnJlbnQnKTtcblxuICAgICAgICBmb3JtLmlubmVySFRNTCA9IGV2ZW50LnJlc3VsdC5odG1sO1xuICAgICAgICBwcmlzbS5oaWdobGlnaHQoZm9ybSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiQmFkIHJlc3BvbnNlXCIsIGV2ZW50LnJlc3VsdCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICB9O1xuXG59XG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9oYW5kbGVycy9xdWl6L2NsaWVudC9pbmRleC5qc1xuICoqLyIsInZhciBub3RpZmljYXRpb24gPSByZXF1aXJlKCdjbGllbnQvbm90aWZpY2F0aW9uJyk7XG52YXIgZ2V0Q3NyZkNvb2tpZSA9IHJlcXVpcmUoJ2NsaWVudC9nZXRDc3JmQ29va2llJyk7XG4vLyBXcmFwcGVyIGFib3V0IFhIUlxuLy8gIyBHbG9iYWwgRXZlbnRzXG4vLyB0cmlnZ2VycyBkb2N1bWVudC5sb2Fkc3RhcnQvbG9hZGVuZCBvbiBjb21tdW5pY2F0aW9uIHN0YXJ0L2VuZFxuLy8gICAgLS0+IHVubGVzcyBvcHRpb25zLm5vR2xvYmFsRXZlbnRzIGlzIHNldFxuLy9cbi8vICMgRXZlbnRzXG4vLyB0cmlnZ2VycyBmYWlsL3N1Y2Nlc3Mgb24gbG9hZCBlbmQ6XG4vLyAgICAtLT4gYnkgZGVmYXVsdCBzdGF0dXM9MjAwIGlzIG9rLCB0aGUgb3RoZXJzIGFyZSBmYWlsdXJlc1xuLy8gICAgLS0+IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgPSBbMjAxLDQwOV0gYWxsb3cgZ2l2ZW4gc3RhdHVzZXNcbi8vICAgIC0tPiBmYWlsIGV2ZW50IGhhcyAucmVhc29uIGZpZWxkXG4vLyAgICAtLT4gc3VjY2VzcyBldmVudCBoYXMgLnJlc3VsdCBmaWVsZFxuLy9cbi8vICMgSlNPTlxuLy8gICAgLS0+IHNlbmQob2JqZWN0KSBjYWxscyBKU09OLnN0cmluZ2lmeVxuLy8gICAgLS0+IGFkZHMgQWNjZXB0OiBqc29uICh3ZSB3YW50IGpzb24pIGJ5IGRlZmF1bHQsIHVubGVzcyBvcHRpb25zLnJhd1xuLy8gaWYgb3B0aW9ucy5qc29uIG9yIHNlcnZlciByZXR1cm5lZCBqc29uIGNvbnRlbnQgdHlwZVxuLy8gICAgLS0+IGF1dG9wYXJzZSBqc29uXG4vLyAgICAtLT4gZmFpbCBpZiBlcnJvclxuLy9cbi8vICMgQ1NSRlxuLy8gICAgLS0+IHJlcXVlc3RzIHNlbmRzIGhlYWRlciBYLVhTUkYtVE9LRU4gZnJvbSBjb29raWVcblxuZnVuY3Rpb24geGhyKG9wdGlvbnMpIHtcblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHZhciBtZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuXG4gIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5zeW5jID8gZmFsc2UgOiB0cnVlKTtcblxuICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcblxuICAvLyB0b2tlbi9oZWFkZXIgbmFtZXMgc2FtZSBhcyBhbmd1bGFyICRodHRwIGZvciBlYXNpZXIgaW50ZXJvcFxuICB2YXIgY3NyZkNvb2tpZSA9IGdldENzcmZDb29raWUoKTtcbiAgaWYgKGNzcmZDb29raWUgJiYgIW9wdGlvbnMuc2tpcENzcmYpIHtcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJYLVhTUkYtVE9LRU5cIiwgY3NyZkNvb2tpZSk7XG4gIH1cblxuICBpZiAoe30udG9TdHJpbmcuY2FsbChib2R5KSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIG11c3QgYmUgT1BFTmVkIHRvIHNldFJlcXVlc3RIZWFkZXJcbiAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cblxuICBpZiAoIW9wdGlvbnMubm9HbG9iYWxFdmVudHMpIHtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGV2ZW50ID0+IHtcbiAgICAgIHZhciBlID0gd3JhcEV2ZW50KCd4aHJzdGFydCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmVuZCcsIGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocnN1Y2Nlc3MnLCBldmVudCk7XG4gICAgICBlLnJlc3VsdCA9IGV2ZW50LnJlc3VsdDtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdmYWlsJywgZXZlbnQgPT4ge1xuICAgICAgdmFyIGUgPSB3cmFwRXZlbnQoJ3hocmZhaWwnLCBldmVudCk7XG4gICAgICBlLnJlYXNvbiA9IGV2ZW50LnJlYXNvbjtcbiAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMucmF3KSB7IC8vIG1lYW5zIHdlIHdhbnQganNvblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIH1cblxuICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCBcIlhNTEh0dHBSZXF1ZXN0XCIpO1xuXG4gIHZhciBub3JtYWxTdGF0dXNlcyA9IG9wdGlvbnMubm9ybWFsU3RhdHVzZXMgfHwgWzIwMF07XG5cbiAgZnVuY3Rpb24gd3JhcEV2ZW50KG5hbWUsIGUpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSk7XG4gICAgZXZlbnQub3JpZ2luYWxFdmVudCA9IGU7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFpbChyZWFzb24sIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcImZhaWxcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZWFzb24gPSByZWFzb247XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICB2YXIgZSA9IHdyYXBFdmVudChcInN1Y2Nlc3NcIiwgb3JpZ2luYWxFdmVudCk7XG4gICAgZS5yZXN1bHQgPSByZXN1bHQ7XG4gICAgcmVxdWVzdC5kaXNwYXRjaEV2ZW50KGUpO1xuICB9XG5cbiAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgZmFpbChcItCe0YjQuNCx0LrQsCDRgdCy0Y/Qt9C4INGBINGB0LXRgNCy0LXRgNC+0LwuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIGUgPT4ge1xuICAgIGZhaWwoXCLQn9GA0LXQstGL0YjQtdC90L4g0LzQsNC60YHQuNC80LDQu9GM0L3QviDQtNC+0L/Rg9GB0YLQuNC80L7QtSDQstGA0LXQvNGPINC+0LbQuNC00LDQvdC40Y8g0L7RgtCy0LXRgtCwINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICB9KTtcblxuICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBlID0+IHtcbiAgICBmYWlsKFwi0JfQsNC/0YDQvtGBINCx0YvQuyDQv9GA0LXRgNCy0LDQvS5cIiwgZSk7XG4gIH0pO1xuXG4gIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZSA9PiB7XG4gICAgaWYgKCFyZXF1ZXN0LnN0YXR1cykgeyAvLyBkb2VzIHRoYXQgZXZlciBoYXBwZW4/XG4gICAgICBmYWlsKFwi0J3QtSDQv9C+0LvRg9GH0LXQvSDQvtGC0LLQtdGCINC+0YIg0YHQtdGA0LLQtdGA0LAuXCIsIGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxTdGF0dXNlcy5pbmRleE9mKHJlcXVlc3Quc3RhdHVzKSA9PSAtMSkge1xuICAgICAgZmFpbChcItCe0YjQuNCx0LrQsCDQvdCwINGB0YLQvtGA0L7QvdC1INGB0LXRgNCy0LXRgNCwICjQutC+0LQgXCIgKyByZXF1ZXN0LnN0YXR1cyArIFwiKSwg0L/QvtC/0YvRgtCw0LnRgtC10YHRjCDQv9C+0LfQtNC90LXQtVwiLCBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKTtcbiAgICBpZiAoY29udGVudFR5cGUubWF0Y2goL15hcHBsaWNhdGlvblxcL2pzb24vKSB8fCBvcHRpb25zLmpzb24pIHsgLy8gYXV0b3BhcnNlIGpzb24gaWYgV0FOVCBvciBSRUNFSVZFRCBqc29uXG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC+0YLQstC10YLQsCDQvtGCINGB0LXRgNCy0LXRgNCwXCIsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VjY2VzcyhyZXN1bHQsIGUpO1xuICB9KTtcblxuICAvLyBkZWZlciB0byBsZXQgb3RoZXIgaGFuZGxlcnMgYmUgYXNzaWduZWRcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZVN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJlcXVlc3Quc2VuZChib2R5KTtcblxuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LmdhKCdzZW5kJywgJ3RpbWluZycsICd4aHInLCBtZXRob2QgKyAnICcgKyB1cmwsIERhdGUubm93KCkgLSB0aW1lU3RhcnQpO1xuICAgIH0pO1xuICB9LCAwKTtcblxuXG5cblxuICByZXR1cm4gcmVxdWVzdDtcblxufVxuXG5mdW5jdGlvbiBhZGRVcmxQYXJhbSh1cmwsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwYXJhbSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIGlmICh+dXJsLmluZGV4T2YoJz8nKSkge1xuICAgIHJldHVybiB1cmwgKyAnJicgKyBwYXJhbTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdXJsICsgJz8nICsgcGFyYW07XG4gIH1cblxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd4aHJmYWlsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgbmV3IG5vdGlmaWNhdGlvbi5FcnJvcihldmVudC5yZWFzb24pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB4aHI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC94aHIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY3NyZkNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvWFNSRi1UT0tFTj0oW1xcdy1dKykvKTtcbiAgcmV0dXJuIGNzcmZDb29raWUgPyBjc3JmQ29va2llWzFdIDogbnVsbDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L2dldENzcmZDb29raWUuanNcbiAqKi8iLCJyZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy1leHRyYXMuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb2ZmZWVzY3JpcHQuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC5qcycpO1xucmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBocC1leHRyYXMuanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24uanMnKTtcbnJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ydWJ5LmpzJyk7XG5yZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5qcycpO1xuXG5QcmlzbS50b2tlblRhZyA9ICdjb2RlJzsgLy8gZm9yIGlCb29rcyB0byB1c2UgbW9ub3NwYWNlIGZvbnRcblxudmFyIENvZGVCb3ggPSByZXF1aXJlKCcuL2NvZGVCb3gnKTtcbnZhciBDb2RlVGFic0JveCA9IHJlcXVpcmUoJy4vY29kZVRhYnNCb3gnKTtcblxuZnVuY3Rpb24gaW5pdENvZGVCb3hlcyhjb250YWluZXIpIHtcblxuICAvLyBoaWdobGlnaHQgaW5saW5lXG4gIHZhciBjb2RlRXhhbXBsZUVsZW1zID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2RlLWV4YW1wbGU6bm90KFtkYXRhLXByaXNtLWRvbmVdKScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZUV4YW1wbGVFbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjb2RlRXhhbXBsZUVsZW0gPSBjb2RlRXhhbXBsZUVsZW1zW2ldO1xuICAgIG5ldyBDb2RlQm94KGNvZGVFeGFtcGxlRWxlbSk7XG4gICAgY29kZUV4YW1wbGVFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlzbS1kb25lJywgJzEnKTtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gaW5pdENvZGVUYWJzQm94KGNvbnRhaW5lcikge1xuXG4gIHZhciBlbGVtcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdkaXYuY29kZS10YWJzOm5vdChbZGF0YS1wcmlzbS1kb25lXSknKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgbmV3IENvZGVUYWJzQm94KGVsZW1zW2ldKTtcbiAgICBlbGVtc1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJpc20tZG9uZScsICcxJyk7XG4gIH1cblxufVxuXG5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFByaXNtLmhpZ2hsaWdodEFsbCk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGhpZ2hsaWdodChkb2N1bWVudCk7XG4gIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBoaWdobGlnaHQoZWxlbSkge1xuICBpbml0Q29kZUJveGVzKGVsZW0pO1xuICBpbml0Q29kZVRhYnNCb3goZWxlbSk7XG59XG5cbmV4cG9ydHMuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2luZGV4LmpzXG4gKiovIiwidmFyIHJlc2l6ZU9ubG9hZCA9IHJlcXVpcmUoJ2NsaWVudC9oZWFkL3Jlc2l6ZU9ubG9hZCcpO1xudmFyIGlzU2Nyb2xsZWRJbnRvVmlldyA9IHJlcXVpcmUoJ2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJy4vYWRkTGluZU51bWJlcnMnKTtcblxuZnVuY3Rpb24gQ29kZUJveChlbGVtKSB7XG5cbiAgdmFyIHByZUVsZW0gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ3ByZScpO1xuICB2YXIgY29kZUVsZW0gPSBwcmVFbGVtLnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcbiAgdmFyIGNvZGUgPSBjb2RlRWxlbS50ZXh0Q29udGVudDtcblxuICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNvZGVFbGVtKTtcbiAgYWRkTGluZU51bWJlcnMocHJlRWxlbSk7XG5cbiAgYWRkQmxvY2tIaWdobGlnaHQocHJlRWxlbSwgZWxlbS5kYXRhc2V0LmhpZ2hsaWdodEJsb2NrKTtcbiAgYWRkSW5saW5lSGlnaGxpZ2h0KHByZUVsZW0sIGVsZW0uZGF0YXNldC5oaWdobGlnaHRJbmxpbmUpO1xuXG4gIHZhciBpc0pTID0gcHJlRWxlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2xhbmd1YWdlLWphdmFzY3JpcHQnKTtcbiAgdmFyIGlzSFRNTCA9IHByZUVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdsYW5ndWFnZS1tYXJrdXAnKTtcbiAgdmFyIGlzVHJ1c3RlZCA9IGVsZW0uZGF0YXNldC50cnVzdGVkO1xuICB2YXIganNGcmFtZTtcbiAgdmFyIGh0bWxSZXN1bHQ7XG4gIHZhciBpc0ZpcnN0UnVuID0gdHJ1ZTtcblxuICBpZiAoIWlzSlMgJiYgIWlzSFRNTCkgcmV0dXJuO1xuXG4gIHZhciBydW5FbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hY3Rpb249XCJydW5cIl0nKTtcbiAgaWYgKHJ1bkVsZW0pIHtcbiAgICBydW5FbGVtLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgcnVuKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBlZGl0RWxlbSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtYWN0aW9uPVwiZWRpdFwiXScpO1xuICBpZiAoZWRpdEVsZW0pIHtcbiAgICBlZGl0RWxlbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJsdXIoKTtcbiAgICAgIGVkaXQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gc29tZSBjb2RlIGNhbid0IGJlIGV4ZWN1dGVkIGJ5IGVwdWIgZW5naW5lXG4gIGlmIChlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYod2luZG93LmVib29rRm9ybWF0ID09ICdlcHViJyAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biA9PSAnbm8tZXB1YicpIHtcbiAgICAgIGVsZW0ucXVlcnlTZWxlY3RvcignaWZyYW1lJykucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRpbWVvdXQgc2hvdWxkIGJlIHNtYWxsLCBhcm91bmQgMTBtcywgb3IgcmVtb3ZlIGl0IHRvIG1ha2UgY3Jhd2xlciBwcm9jZXNzIHRoZSBhdXRvcnVuXG4gICAgICBzZXRUaW1lb3V0KHJ1biwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcG9zdEpTRnJhbWUoKSB7XG4gICAgdmFyIHdpbiA9IGpzRnJhbWVbMF0uY29udGVudFdpbmRvdztcbiAgICBpZiAodHlwZW9mIHdpbi5wb3N0TWVzc2FnZSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICBhbGVydChcItCY0LfQstC40L3QuNGC0LUsINC30LDQv9GD0YHQuiDQutC+0LTQsCDRgtGA0LXQsdGD0LXRgiDQsdC+0LvQtdC1INGB0L7QstGA0LXQvNC10L3QvdGL0Lkg0LHRgNCw0YPQt9C10YBcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbi5wb3N0TWVzc2FnZShjb2RlLCAnaHR0cDovL3J1Lmxvb2thdGNvZGUuY29tL3Nob3dqcycpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuSFRNTCgpIHtcblxuICAgIHZhciBmcmFtZTtcblxuICAgIGlmIChodG1sUmVzdWx0ICYmIGVsZW0uZGF0YXNldC5yZWZyZXNoKSB7XG4gICAgICBodG1sUmVzdWx0LnJlbW92ZSgpO1xuICAgICAgaHRtbFJlc3VsdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFodG1sUmVzdWx0KSB7XG4gICAgICAvLyB0YWtlIGZyb20gSFRNTCBpZiBleGlzdHMgdGhlcmUgKGluIG1hcmt1cCB3aGVuIGF1dG9ydW4gaXMgc3BlY2lmaWVkKVxuICAgICAgaHRtbFJlc3VsdCA9IGVsZW0ucXVlcnlTZWxlY3RvcignLmNvZGUtcmVzdWx0Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFodG1sUmVzdWx0KSB7XG4gICAgICAvLyBvdGhlcndpc2UgY3JlYXRlIChvciByZWNyZWF0ZSBpZiByZWZyZXNoKVxuICAgICAgaHRtbFJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaHRtbFJlc3VsdC5jbGFzc05hbWUgPSBcImNvZGUtcmVzdWx0IGNvZGUtZXhhbXBsZV9fcmVzdWx0XCI7XG5cbiAgICAgIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBmcmFtZS5uYW1lID0gJ2ZyYW1lLScgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgZnJhbWUuY2xhc3NOYW1lID0gJ2NvZGUtcmVzdWx0X19pZnJhbWUnO1xuXG4gICAgICBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQgPT09IFwiMFwiKSB7XG4gICAgICAgIC8vIHRoaXMgaHRtbCBoYXMgbm90aGluZyB0byBzaG93XG4gICAgICAgIGZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0uZGF0YXNldC5kZW1vSGVpZ2h0KSB7XG4gICAgICAgIHZhciBoZWlnaHQgPSArZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQ7XG4gICAgICAgIGZyYW1lLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICB9XG4gICAgICBodG1sUmVzdWx0LmFwcGVuZENoaWxkKGZyYW1lKTtcblxuICAgICAgZWxlbS5hcHBlbmRDaGlsZChodG1sUmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJhbWUgPSBodG1sUmVzdWx0LnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xuICAgIH1cblxuICAgIGlmIChpc1RydXN0ZWQpIHtcbiAgICAgIHZhciBkb2MgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQgfHwgZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcblxuICAgICAgZG9jLm9wZW4oKTtcbiAgICAgIGRvYy53cml0ZShub3JtYWxpemVIdG1sKGNvZGUpKTtcbiAgICAgIGRvYy5jbG9zZSgpO1xuXG4gICAgICBpZiAoZWxlbS5kYXRhc2V0LmRlbW9IZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXNpemVPbmxvYWQuaWZyYW1lKGZyYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoaXNGaXJzdFJ1biAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBpZiAoIWlzU2Nyb2xsZWRJbnRvVmlldyhodG1sUmVzdWx0KSkge1xuICAgICAgICAgIGh0bWxSZXN1bHQuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGZvcm0uZW5jdHlwZSA9IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiO1xuICAgICAgZm9ybS5hY3Rpb24gPSBcImh0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9zaG93aHRtbFwiO1xuICAgICAgZm9ybS50YXJnZXQgPSBmcmFtZS5uYW1lO1xuXG4gICAgICB2YXIgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgdGV4dGFyZWEubmFtZSA9ICdjb2RlJztcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gbm9ybWFsaXplSHRtbChjb2RlKTtcbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuXG4gICAgICBmcmFtZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmb3JtLCBmcmFtZS5uZXh0U2libGluZyk7XG4gICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgICAgZm9ybS5yZW1vdmUoKTtcblxuICAgICAgaWYgKCEoaXNGaXJzdFJ1biAmJiBlbGVtLmRhdGFzZXQuYXV0b3J1biAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmIChlbGVtLmRhdGFzZXQuZGVtb0hlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNpemVPbmxvYWQuaWZyYW1lKGZyYW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWlzU2Nyb2xsZWRJbnRvVmlldyhodG1sUmVzdWx0KSkge1xuICAgICAgICAgICAgaHRtbFJlc3VsdC5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcnVuSlMoKSB7XG5cbiAgICBpZiAoaXNUcnVzdGVkKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8qIGpzaGludCAtVzA2MSAqL1xuICAgICAgICB3aW5kb3dbXCJldmFsXCJdLmNhbGwod2luZG93LCBjb2RlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgYWxlcnQoXCLQntGI0LjQsdC60LA6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChlbGVtLmRhdGFzZXQucmVmcmVzaCAmJiBqc0ZyYW1lKSB7XG4gICAgICAgIGpzRnJhbWUucmVtb3ZlKCk7XG4gICAgICAgIGpzRnJhbWUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWpzRnJhbWUpIHtcbiAgICAgICAgLy8gY3JlYXRlIGlmcmFtZSBmb3IganNcbiAgICAgICAganNGcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBqc0ZyYW1lLmNsYXNzTmFtZSA9ICdqcy1mcmFtZSc7XG4gICAgICAgIGpzRnJhbWUuc3JjID0gJ2h0dHA6Ly9ydS5sb29rYXRjb2RlLmNvbS9zaG93anMnO1xuICAgICAgICBqc0ZyYW1lLnN0eWxlLndpZHRoID0gMDtcbiAgICAgICAganNGcmFtZS5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgICBqc0ZyYW1lLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgICAganNGcmFtZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBwb3N0SlNGcmFtZSgpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRnJhbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdEpTRnJhbWUoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXQoKSB7XG5cbiAgICB2YXIgaHRtbDtcbiAgICBpZiAoaXNIVE1MKSB7XG4gICAgICBodG1sID0gbm9ybWFsaXplSHRtbChjb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvZGVJbmRlbnRlZCA9IGNvZGUucmVwbGFjZSgvXi9naW0sICcgICAgJyk7XG4gICAgICBodG1sID0gJzwhRE9DVFlQRSBodG1sPlxcbjxodG1sPlxcblxcbjxib2R5PlxcbiAgPHNjcmlwdD5cXG4nICsgY29kZUluZGVudGVkICsgJ1xcbiAgPC9zY3JpcHQ+XFxuPC9ib2R5PlxcblxcbjwvaHRtbD4nO1xuICAgIH1cblxuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uYWN0aW9uID0gXCJodHRwOi8vcGxua3IuY28vZWRpdC8/cD1wcmV2aWV3XCI7XG4gICAgZm9ybS5tZXRob2QgPSBcIlBPU1RcIjtcbiAgICBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS5uYW1lID0gXCJmaWxlc1tpbmRleC5odG1sXVwiO1xuICAgIHRleHRhcmVhLnZhbHVlID0gaHRtbDtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRleHRhcmVhKTtcblxuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQubmFtZSA9IFwiZGVzY3JpcHRpb25cIjtcbiAgICBpbnB1dC52YWx1ZSA9IFwiRm9yayBmcm9tIFwiICsgd2luZG93LmxvY2F0aW9uO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgICBmb3JtLnJlbW92ZSgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBub3JtYWxpemVIdG1sKCkge1xuICAgIHZhciBjb2RlTGMgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGhhc0JvZHlTdGFydCA9IGNvZGVMYy5tYXRjaCgnPGJvZHk+Jyk7XG4gICAgdmFyIGhhc0JvZHlFbmQgPSBjb2RlTGMubWF0Y2goJzwvYm9keT4nKTtcbiAgICB2YXIgaGFzSHRtbFN0YXJ0ID0gY29kZUxjLm1hdGNoKCc8aHRtbD4nKTtcbiAgICB2YXIgaGFzSHRtbEVuZCA9IGNvZGVMYy5tYXRjaCgnPC9odG1sPicpO1xuXG4gICAgdmFyIGhhc0RvY1R5cGUgPSBjb2RlTGMubWF0Y2goL15cXHMqPCFkb2N0eXBlLyk7XG5cbiAgICBpZiAoaGFzRG9jVHlwZSkge1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGNvZGU7XG5cbiAgICBpZiAoIWhhc0h0bWxTdGFydCkge1xuICAgICAgcmVzdWx0ID0gJzxodG1sPlxcbicgKyByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNIdG1sRW5kKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgKyAnXFxuPC9odG1sPic7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNCb2R5U3RhcnQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCc8aHRtbD4nLCAnPGh0bWw+XFxuPGhlYWQ+XFxuICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cXG48L2hlYWQ+PGJvZHk+XFxuJyk7XG4gICAgfVxuXG4gICAgaWYgKCFoYXNCb2R5RW5kKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgnPC9odG1sPicsICdcXG48L2JvZHk+XFxuPC9odG1sPicpO1xuICAgIH1cblxuICAgIHJlc3VsdCA9ICc8IURPQ1RZUEUgSFRNTD5cXG4nICsgcmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcnVuKCkge1xuICAgIGlmIChpc0pTKSB7XG4gICAgICBydW5KUygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBydW5IVE1MKCk7XG4gICAgfVxuICAgIGlzRmlyc3RSdW4gPSBmYWxzZTtcbiAgfVxuXG5cbn1cblxuXG5mdW5jdGlvbiBhZGRCbG9ja0hpZ2hsaWdodChwcmUsIGxpbmVzKSB7XG5cbiAgaWYgKCFsaW5lcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciByYW5nZXMgPSBsaW5lcy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xuXG4gIC8qanNoaW50IC1XMDg0ICovXG4gIGZvciAodmFyIGkgPSAwLCByYW5nZTsgcmFuZ2UgPSByYW5nZXNbaSsrXTspIHtcbiAgICByYW5nZSA9IHJhbmdlLnNwbGl0KCctJyk7XG5cbiAgICB2YXIgc3RhcnQgPSArcmFuZ2VbMF0sXG4gICAgICAgIGVuZCA9ICtyYW5nZVsxXSB8fCBzdGFydDtcblxuXG4gICAgdmFyIG1hc2sgPSAnPGNvZGUgY2xhc3M9XCJibG9jay1oaWdobGlnaHRcIiBkYXRhLXN0YXJ0PVwiJyArIHN0YXJ0ICsgJ1wiIGRhdGEtZW5kPVwiJyArIGVuZCArICdcIj4nICtcbiAgICAgIG5ldyBBcnJheShzdGFydCArIDEpLmpvaW4oJ1xcbicpICtcbiAgICAgICc8Y29kZSBjbGFzcz1cIm1hc2tcIj4nICsgbmV3IEFycmF5KGVuZCAtIHN0YXJ0ICsgMikuam9pbignXFxuJykgKyAnPC9jb2RlPjwvY29kZT4nO1xuXG4gICAgcHJlLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyQmVnaW5cIiwgbWFzayk7XG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIGFkZElubGluZUhpZ2hsaWdodChwcmUsIHJhbmdlcykge1xuXG4gIC8vIHNlbGVjdCBjb2RlIHdpdGggdGhlIGxhbmd1YWdlIHRleHQsIG5vdCBibG9jay1oaWdobGlnaHRlclxuICB2YXIgY29kZUVsZW0gPSBwcmUucXVlcnlTZWxlY3RvcignY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0nKTtcblxuICByYW5nZXMgPSByYW5nZXMgPyByYW5nZXMuc3BsaXQoXCIsXCIpIDogW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGllY2UgPSByYW5nZXNbaV0uc3BsaXQoJzonKTtcbiAgICB2YXIgbGluZU51bSA9ICtwaWVjZVswXSwgc3RyUmFuZ2UgPSBwaWVjZVsxXS5zcGxpdCgnLScpO1xuICAgIHZhciBzdGFydCA9ICtzdHJSYW5nZVswXSwgZW5kID0gK3N0clJhbmdlWzFdO1xuICAgIHZhciBtYXNrID0gJzxjb2RlIGNsYXNzPVwiaW5saW5lLWhpZ2hsaWdodFwiPicgK1xuICAgICAgbmV3IEFycmF5KGxpbmVOdW0gKyAxKS5qb2luKCdcXG4nKSArXG4gICAgICBuZXcgQXJyYXkoc3RhcnQgKyAxKS5qb2luKCcgJykgK1xuICAgICAgJzxjb2RlIGNsYXNzPVwibWFza1wiPicgKyBuZXcgQXJyYXkoZW5kIC0gc3RhcnQgKyAxKS5qb2luKCcgJykgKyAnPC9jb2RlPjwvY29kZT4nO1xuXG4gICAgY29kZUVsZW0uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJCZWdpblwiLCBtYXNrKTtcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29kZUJveDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY2xpZW50L3ByaXNtL2NvZGVCb3guanNcbiAqKi8iLCJ2YXIgZGVsZWdhdGUgPSByZXF1aXJlKCdjbGllbnQvZGVsZWdhdGUnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJy4vYWRkTGluZU51bWJlcnMnKTtcblxuZnVuY3Rpb24gQ29kZVRhYnNCb3goZWxlbSkge1xuICBpZiAod2luZG93LmlzRWJvb2spIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmVsZW0gPSBlbGVtO1xuICB0aGlzLnRyYW5zbGF0ZVggPSAwO1xuXG4gIHRoaXMuc3dpdGNoZXNFbGVtID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtc3dpdGNoZXNdJyk7XG4gIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMgPSB0aGlzLnN3aXRjaGVzRWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgdGhpcy5hcnJvd0xlZnQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1sZWZ0XScpO1xuICB0aGlzLmFycm93UmlnaHQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvZGUtdGFicy1yaWdodF0nKTtcblxuXG4gIHRoaXMuYXJyb3dMZWZ0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy50cmFuc2xhdGVYID0gTWF0aC5tYXgoMCwgdGhpcy50cmFuc2xhdGVYIC0gdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgpO1xuICAgIHRoaXMucmVuZGVyVHJhbnNsYXRlKCk7XG4gIH0uYmluZCh0aGlzKTtcblxuXG4gIHRoaXMuYXJyb3dSaWdodC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMudHJhbnNsYXRlWCA9IE1hdGgubWluKHRoaXMudHJhbnNsYXRlWCArdGhpcy5zd2l0Y2hlc0VsZW0ub2Zmc2V0V2lkdGgsIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMub2Zmc2V0V2lkdGggLSB0aGlzLnN3aXRjaGVzRWxlbS5vZmZzZXRXaWR0aCk7XG4gICAgdGhpcy5yZW5kZXJUcmFuc2xhdGUoKTtcbiAgfS5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuZGVsZWdhdGUoJy5jb2RlLXRhYnNfX3N3aXRjaCcsICdjbGljaycsIHRoaXMub25Td2l0Y2hDbGljayk7XG59XG5cbkNvZGVUYWJzQm94LnByb3RvdHlwZS5vblN3aXRjaENsaWNrID0gZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdmFyIHNpYmxpbmdzID0gZS5kZWxlZ2F0ZVRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICB2YXIgdGFicyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2RlLXRhYnMtY29udGVudF0nKS5jaGlsZHJlbjtcblxuXG4gIHZhciBzZWxlY3RlZEluZGV4O1xuICBmb3IodmFyIGk9MDsgaTxzaWJsaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzd2l0Y2hFbGVtID0gc2libGluZ3NbaV07XG4gICAgdmFyIHRhYkVsZW0gPSB0YWJzW2ldO1xuICAgIGlmIChzd2l0Y2hFbGVtID09IGUuZGVsZWdhdGVUYXJnZXQpIHtcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgdGFiRWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfX3NlY3Rpb25fY3VycmVudCcpO1xuICAgICAgc3dpdGNoRWxlbS5jbGFzc0xpc3QuYWRkKCdjb2RlLXRhYnNfX3N3aXRjaF9jdXJyZW50Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhYkVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX19zZWN0aW9uX2N1cnJlbnQnKTtcbiAgICAgIHN3aXRjaEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX19zd2l0Y2hfY3VycmVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2NvZGUtdGFic19yZXN1bHRfb24nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29kZS10YWJzX3Jlc3VsdF9vbicpO1xuXG4gICAgdGhpcy5oaWdobGlnaHRUYWIodGFic1tzZWxlY3RlZEluZGV4XSk7XG4gIH1cblxufTtcblxuXG5Db2RlVGFic0JveC5wcm90b3R5cGUuaGlnaGxpZ2h0VGFiID0gZnVuY3Rpb24odGFiKSB7XG4gIGlmICh0YWIuaGlnaGxpZ2h0ZWQpIHJldHVybjtcbiAgdmFyIHByZUVsZW0gPSB0YWIucXVlcnlTZWxlY3RvcigncHJlJyk7XG4gIHZhciBjb2RlRWxlbSA9IHByZUVsZW0ucXVlcnlTZWxlY3RvcignY29kZScpO1xuICBQcmlzbS5oaWdobGlnaHRFbGVtZW50KGNvZGVFbGVtKTtcbiAgYWRkTGluZU51bWJlcnMocHJlRWxlbSk7XG4gIHRhYi5oaWdobGlnaHRlZCA9IHRydWU7XG59O1xuXG5Db2RlVGFic0JveC5wcm90b3R5cGUucmVuZGVyVHJhbnNsYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3dpdGNoZXNFbGVtSXRlbXMuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoLScgKyB0aGlzLnRyYW5zbGF0ZVggKyAncHgpJztcbiAgaWYgKHRoaXMudHJhbnNsYXRlWCA9PT0gMCkge1xuICAgIHRoaXMuYXJyb3dMZWZ0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcnJvd0xlZnQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICB9XG5cbiAgaWYgKHRoaXMudHJhbnNsYXRlWCA9PT0gdGhpcy5zd2l0Y2hlc0VsZW1JdGVtcy5vZmZzZXRXaWR0aCAtIHRoaXMuc3dpdGNoZXNFbGVtLm9mZnNldFdpZHRoKSB7XG4gICAgdGhpcy5hcnJvd1JpZ2h0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcnJvd1JpZ2h0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgfVxuXG59O1xuXG5cbmRlbGVnYXRlLmRlbGVnYXRlTWl4aW4oQ29kZVRhYnNCb3gucHJvdG90eXBlKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IENvZGVUYWJzQm94O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9jbGllbnQvcHJpc20vY29kZVRhYnNCb3guanNcbiAqKi8iLCJzZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdD8gc2VsZiAvLyBpZiBpbiB3b3JrZXJcblx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqIE1JVCBsaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwL1xuICogQGF1dGhvciBMZWEgVmVyb3UgaHR0cDovL2xlYS52ZXJvdS5tZVxuICovXG5cbnZhciBQcmlzbSA9IChmdW5jdGlvbigpe1xuXG4vLyBQcml2YXRlIGhlbHBlciB2YXJzXG52YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LSg/IVxcKikoXFx3KylcXGIvaTtcblxudmFyIF8gPSBzZWxmLlByaXNtID0ge1xuXHR1dGlsOiB7XG5cdFx0ZW5jb2RlOiBmdW5jdGlvbiAodG9rZW5zKSB7XG5cdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUb2tlbih0b2tlbnMudHlwZSwgXy51dGlsLmVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHR9IGVsc2UgaWYgKF8udXRpbC50eXBlKHRva2VucykgPT09ICdBcnJheScpIHtcblx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoXy51dGlsLmVuY29kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dHlwZTogZnVuY3Rpb24gKG8pIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xcW29iamVjdCAoXFx3KylcXF0vKVsxXTtcblx0XHR9LFxuXG5cdFx0Ly8gRGVlcCBjbG9uZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gKGUuZy4gdG8gZXh0ZW5kIGl0KVxuXHRcdGNsb25lOiBmdW5jdGlvbiAobykge1xuXHRcdFx0dmFyIHR5cGUgPSBfLnV0aWwudHlwZShvKTtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0dmFyIGNsb25lID0ge307XG5cblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gXy51dGlsLmNsb25lKG9ba2V5XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGNsb25lO1xuXG5cdFx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0XHRyZXR1cm4gby5zbGljZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdH0sXG5cblx0bGFuZ3VhZ2VzOiB7XG5cdFx0ZXh0ZW5kOiBmdW5jdGlvbiAoaWQsIHJlZGVmKSB7XG5cdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0bGFuZ1trZXldID0gcmVkZWZba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydCBhIHRva2VuIGJlZm9yZSBhbm90aGVyIHRva2VuIGluIGEgbGFuZ3VhZ2UgbGl0ZXJhbFxuXHRcdCAqIEFzIHRoaXMgbmVlZHMgdG8gcmVjcmVhdGUgdGhlIG9iamVjdCAod2UgY2Fubm90IGFjdHVhbGx5IGluc2VydCBiZWZvcmUga2V5cyBpbiBvYmplY3QgbGl0ZXJhbHMpLFxuXHRcdCAqIHdlIGNhbm5vdCBqdXN0IHByb3ZpZGUgYW4gb2JqZWN0LCB3ZSBuZWVkIGFub2JqZWN0IGFuZCBhIGtleS5cblx0XHQgKiBAcGFyYW0gaW5zaWRlIFRoZSBrZXkgKG9yIGxhbmd1YWdlIGlkKSBvZiB0aGUgcGFyZW50XG5cdFx0ICogQHBhcmFtIGJlZm9yZSBUaGUga2V5IHRvIGluc2VydCBiZWZvcmUuIElmIG5vdCBwcm92aWRlZCwgdGhlIGZ1bmN0aW9uIGFwcGVuZHMgaW5zdGVhZC5cblx0XHQgKiBAcGFyYW0gaW5zZXJ0IE9iamVjdCB3aXRoIHRoZSBrZXkvdmFsdWUgcGFpcnMgdG8gaW5zZXJ0XG5cdFx0ICogQHBhcmFtIHJvb3QgVGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGBpbnNpZGVgLiBJZiBlcXVhbCB0byBQcmlzbS5sYW5ndWFnZXMsIGl0IGNhbiBiZSBvbWl0dGVkLlxuXHRcdCAqL1xuXHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdHJvb3QgPSByb290IHx8IF8ubGFuZ3VhZ2VzO1xuXHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHRcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcblx0XHRcdFx0aW5zZXJ0ID0gYXJndW1lbnRzWzFdO1xuXHRcdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdGdyYW1tYXJbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBncmFtbWFyO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR2YXIgcmV0ID0ge307XG5cblx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblxuXHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBVcGRhdGUgcmVmZXJlbmNlcyBpbiBvdGhlciBsYW5ndWFnZSBkZWZpbml0aW9uc1xuXHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gcm9vdFtpbnNpZGVdICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcm9vdFtpbnNpZGVdID0gcmV0O1xuXHRcdH0sXG5cblx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRERlM6IGZ1bmN0aW9uKG8sIGNhbGxiYWNrLCB0eXBlKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG8sIGksIG9baV0sIHR5cGUgfHwgaSk7XG5cblx0XHRcdFx0XHRpZiAoXy51dGlsLnR5cGUob1tpXSkgPT09ICdPYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRfLmxhbmd1YWdlcy5ERlMob1tpXSwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChfLnV0aWwudHlwZShvW2ldKSA9PT0gJ0FycmF5Jykge1xuXHRcdFx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKG9baV0sIGNhbGxiYWNrLCBpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbihhc3luYywgY2FsbGJhY2spIHtcblx0XHR2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZScpO1xuXG5cdFx0Zm9yICh2YXIgaT0wLCBlbGVtZW50OyBlbGVtZW50ID0gZWxlbWVudHNbaSsrXTspIHtcblx0XHRcdF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgY2FsbGJhY2spO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0dmFyIGxhbmd1YWdlLCBncmFtbWFyLCBwYXJlbnQgPSBlbGVtZW50O1xuXG5cdFx0d2hpbGUgKHBhcmVudCAmJiAhbGFuZy50ZXN0KHBhcmVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHRsYW5ndWFnZSA9IChwYXJlbnQuY2xhc3NOYW1lLm1hdGNoKGxhbmcpIHx8IFssJyddKVsxXTtcblx0XHRcdGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG5cdFx0fVxuXG5cdFx0aWYgKCFncmFtbWFyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cblx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cblx0XHRpZiAoL3ByZS9pLnRlc3QocGFyZW50Lm5vZGVOYW1lKSkge1xuXHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0fVxuXG5cdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0aWYoIWNvZGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZSxcblx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRjb2RlOiBjb2RlXG5cdFx0fTtcblxuXHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdGlmIChhc3luYyAmJiBzZWxmLldvcmtlcikge1xuXHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IFRva2VuLnN0cmluZ2lmeShKU09OLnBhcnNlKGV2dC5kYXRhKSwgbGFuZ3VhZ2UpO1xuXG5cdFx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaW5zZXJ0JywgZW52KTtcblxuXHRcdFx0XHRlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuXG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdH07XG5cblx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdGxhbmd1YWdlOiBlbnYubGFuZ3VhZ2UsXG5cdFx0XHRcdGNvZGU6IGVudi5jb2RlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IF8uaGlnaGxpZ2h0KGVudi5jb2RlLCBlbnYuZ3JhbW1hciwgZW52Lmxhbmd1YWdlKVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZWxlbWVudCk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci1oaWdobGlnaHQnLCBlbnYpO1xuXHRcdH1cblx0fSxcblxuXHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdHZhciB0b2tlbnMgPSBfLnRva2VuaXplKHRleHQsIGdyYW1tYXIpO1xuXHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZSh0b2tlbnMpLCBsYW5ndWFnZSk7XG5cdH0sXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKHRleHQsIGdyYW1tYXIsIGxhbmd1YWdlKSB7XG5cdFx0dmFyIFRva2VuID0gXy5Ub2tlbjtcblxuXHRcdHZhciBzdHJhcnIgPSBbdGV4dF07XG5cblx0XHR2YXIgcmVzdCA9IGdyYW1tYXIucmVzdDtcblxuXHRcdGlmIChyZXN0KSB7XG5cdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHR9XG5cblx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0fVxuXG5cdFx0dG9rZW5sb29wOiBmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZighZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikgfHwgIWdyYW1tYXJbdG9rZW5dKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcGF0dGVybnMgPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdHBhdHRlcm5zID0gKF8udXRpbC50eXBlKHBhdHRlcm5zKSA9PT0gXCJBcnJheVwiKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR2YXIgcGF0dGVybiA9IHBhdHRlcm5zW2pdLFxuXHRcdFx0XHRcdGluc2lkZSA9IHBhdHRlcm4uaW5zaWRlLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQgPSAhIXBhdHRlcm4ubG9va2JlaGluZCxcblx0XHRcdFx0XHRsb29rYmVoaW5kTGVuZ3RoID0gMCxcblx0XHRcdFx0XHRhbGlhcyA9IHBhdHRlcm4uYWxpYXM7XG5cblx0XHRcdFx0cGF0dGVybiA9IHBhdHRlcm4ucGF0dGVybiB8fCBwYXR0ZXJuO1xuXG5cdFx0XHRcdGZvciAodmFyIGk9MDsgaTxzdHJhcnIubGVuZ3RoOyBpKyspIHsgLy8gRG9u4oCZdCBjYWNoZSBsZW5ndGggYXMgaXQgY2hhbmdlcyBkdXJpbmcgdGhlIGxvb3BcblxuXHRcdFx0XHRcdHZhciBzdHIgPSBzdHJhcnJbaV07XG5cblx0XHRcdFx0XHRpZiAoc3RyYXJyLmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0YnJlYWsgdG9rZW5sb29wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cGF0dGVybi5sYXN0SW5kZXggPSAwO1xuXG5cdFx0XHRcdFx0dmFyIG1hdGNoID0gcGF0dGVybi5leGVjKHN0cik7XG5cblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdGlmKGxvb2tiZWhpbmQpIHtcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZExlbmd0aCA9IG1hdGNoWzFdLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleCAtIDEgKyBsb29rYmVoaW5kTGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpLFxuXHRcdFx0XHRcdFx0XHRsZW4gPSBtYXRjaC5sZW5ndGgsXG5cdFx0XHRcdFx0XHRcdHRvID0gZnJvbSArIGxlbixcblx0XHRcdFx0XHRcdFx0YmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20gKyAxKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXIgPSBzdHIuc2xpY2UodG8gKyAxKTtcblxuXHRcdFx0XHRcdFx0dmFyIGFyZ3MgPSBbaSwgMV07XG5cblx0XHRcdFx0XHRcdGlmIChiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0YXJncy5wdXNoKGJlZm9yZSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciB3cmFwcGVkID0gbmV3IFRva2VuKHRva2VuLCBpbnNpZGU/IF8udG9rZW5pemUobWF0Y2gsIGluc2lkZSkgOiBtYXRjaCwgYWxpYXMpO1xuXG5cdFx0XHRcdFx0XHRhcmdzLnB1c2god3JhcHBlZCk7XG5cblx0XHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0XHRhcmdzLnB1c2goYWZ0ZXIpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHN0cmFyciwgYXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0cmFycjtcblx0fSxcblxuXHRob29rczoge1xuXHRcdGFsbDoge30sXG5cblx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGhvb2tzID0gXy5ob29rcy5hbGw7XG5cblx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdHZhciBjYWxsYmFja3MgPSBfLmhvb2tzLmFsbFtuYW1lXTtcblxuXHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciBpPTAsIGNhbGxiYWNrOyBjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdOykge1xuXHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxudmFyIFRva2VuID0gXy5Ub2tlbiA9IGZ1bmN0aW9uKHR5cGUsIGNvbnRlbnQsIGFsaWFzKSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdHRoaXMuYWxpYXMgPSBhbGlhcztcbn07XG5cblRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKG8sIGxhbmd1YWdlLCBwYXJlbnQpIHtcblx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG87XG5cdH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09ICdbb2JqZWN0IEFycmF5XScpIHtcblx0XHRyZXR1cm4gby5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIFRva2VuLnN0cmluZ2lmeShlbGVtZW50LCBsYW5ndWFnZSwgbyk7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHR2YXIgZW52ID0ge1xuXHRcdHR5cGU6IG8udHlwZSxcblx0XHRjb250ZW50OiBUb2tlbi5zdHJpbmdpZnkoby5jb250ZW50LCBsYW5ndWFnZSwgcGFyZW50KSxcblx0XHR0YWc6IFByaXNtLnRva2VuVGFnIHx8ICdzcGFuJyxcblx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0fTtcblxuXHRpZiAoZW52LnR5cGUgPT0gJ2NvbW1lbnQnKSB7XG5cdFx0ZW52LmF0dHJpYnV0ZXNbJ3NwZWxsY2hlY2snXSA9ICd0cnVlJztcblx0fVxuXG5cdGlmIChvLmFsaWFzKSB7XG5cdFx0dmFyIGFsaWFzZXMgPSBfLnV0aWwudHlwZShvLmFsaWFzKSA9PT0gJ0FycmF5JyA/IG8uYWxpYXMgOiBbby5hbGlhc107XG5cdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHR9XG5cblx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdHZhciBhdHRyaWJ1dGVzID0gJyc7XG5cblx0Zm9yICh2YXIgbmFtZSBpbiBlbnYuYXR0cmlidXRlcykge1xuXHRcdGF0dHJpYnV0ZXMgKz0gbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKSArICdcIic7XG5cdH1cblxuXHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiICcgKyBhdHRyaWJ1dGVzICsgJz4nICsgZW52LmNvbnRlbnQgKyAnPC8nICsgZW52LnRhZyArICc+JztcblxufTtcblxuaWYgKCFzZWxmLmRvY3VtZW50KSB7XG5cdGlmICghc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdHJldHVybiBzZWxmLlByaXNtO1xuXHR9XG4gXHQvLyBJbiB3b3JrZXJcblx0c2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZ0KSB7XG5cdFx0dmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2dC5kYXRhKSxcblx0XHQgICAgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2UsXG5cdFx0ICAgIGNvZGUgPSBtZXNzYWdlLmNvZGU7XG5cblx0XHRzZWxmLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoXy50b2tlbml6ZShjb2RlLCBfLmxhbmd1YWdlc1tsYW5nXSkpKSk7XG5cdFx0c2VsZi5jbG9zZSgpO1xuXHR9LCBmYWxzZSk7XG5cblx0cmV0dXJuIHNlbGYuUHJpc207XG59XG5cbi8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG52YXIgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuXG5zY3JpcHQgPSBzY3JpcHRbc2NyaXB0Lmxlbmd0aCAtIDFdO1xuXG5pZiAoc2NyaXB0KSB7XG5cdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmICFzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIF8uaGlnaGxpZ2h0QWxsKTtcblx0fVxufVxuXG5yZXR1cm4gc2VsZi5QcmlzbTtcblxufSkoKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50JzogLzwhLS1bXFx3XFxXXSo/LS0+L2csXG5cdCdwcm9sb2cnOiAvPFxcPy4rP1xcPz4vLFxuXHQnZG9jdHlwZSc6IC88IURPQ1RZUEUuKz8+Lyxcblx0J2NkYXRhJzogLzwhXFxbQ0RBVEFcXFtbXFx3XFxXXSo/XV0+L2ksXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/W1xcdzotXStcXHMqKD86XFxzK1tcXHc6LV0rKD86PSg/OihcInwnKShcXFxcP1tcXHdcXFddKSo/XFwxfFteXFxzJ1wiPj1dKykpP1xccyopKlxcLz8+L2dpLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1tcXHc6LV0rL2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXltcXHctXSs/Oi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPSg/OignfFwiKVtcXHdcXFddKj8oXFwxKXxbXlxccz5dKykvZ2ksXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC89fD58XCIvZ1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+L2csXG5cdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvW1xcdzotXSsvZyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW1xcdy1dKz86L1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0sXG5cdCdlbnRpdHknOiAvXFwmIz9bXFxkYS16XXsxLDh9Oy9naVxufTtcblxuLy8gUGx1Z2luIHRvIG1ha2UgZW50aXR5IHRpdGxlIHNob3cgdGhlIHJlYWwgZW50aXR5LCBpZGVhIGJ5IFJvbWFuIEtvbWFyb3ZcblByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNzcyA9IHtcblx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcd1xcV10qP1xcKlxcLy9nLFxuXHQnYXRydWxlJzoge1xuXHRcdHBhdHRlcm46IC9AW1xcdy1dKz8uKj8oO3woPz1cXHMqeykpL2dpLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1s7Ol0vZ1xuXHRcdH1cblx0fSxcblx0J3VybCc6IC91cmxcXCgoW1wiJ10/KS4qP1xcMVxcKS9naSxcblx0J3NlbGVjdG9yJzogL1teXFx7XFx9XFxzXVteXFx7XFx9O10qKD89XFxzKlxceykvZyxcblx0J3Byb3BlcnR5JzogLyhcXGJ8XFxCKVtcXHctXSsoPz1cXHMqOikvaWcsXG5cdCdzdHJpbmcnOiAvKFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQnaW1wb3J0YW50JzogL1xcQiFpbXBvcnRhbnRcXGIvZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9bXFx7XFx9OzpdL2csXG5cdCdmdW5jdGlvbic6IC9bLWEtejAtOV0rKD89XFwoKS9pZ1xufTtcblxuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ3RhZycsIHtcblx0XHQnc3R5bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvPHN0eWxlW1xcd1xcV10qPz5bXFx3XFxXXSo/PFxcL3N0eWxlPi9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQndGFnJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC88c3R5bGVbXFx3XFxXXSo/Pnw8XFwvc3R5bGU+L2lnLFxuXHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdH0sXG5cdFx0XHRhbGlhczogJ2xhbmd1YWdlLWNzcydcblx0XHR9XG5cdH0pO1xuXHRcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnaW5zaWRlJywgJ2F0dHItdmFsdWUnLCB7XG5cdFx0J3N0eWxlLWF0dHInOiB7XG5cdFx0XHRwYXR0ZXJuOiAvXFxzKnN0eWxlPShcInwnKS4rP1xcMS9pZyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9eXFxzKnN0eWxlL2lnLFxuXHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFxzKj1cXHMqWydcIl18WydcIl1cXHMqJC8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8uKy9naSxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5jc3Ncblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtY3NzJ1xuXHRcdH1cblx0fSwgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuY3NzLnNlbGVjdG9yID0ge1xuXHRwYXR0ZXJuOiAvW15cXHtcXH1cXHNdW15cXHtcXH1dKig/PVxccypcXHspL2csXG5cdGluc2lkZToge1xuXHRcdCdwc2V1ZG8tZWxlbWVudCc6IC86KD86YWZ0ZXJ8YmVmb3JlfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfHNlbGVjdGlvbil8OjpbLVxcd10rL2csXG5cdFx0J3BzZXVkby1jbGFzcyc6IC86Wy1cXHddKyg/OlxcKC4qXFwpKT8vZyxcblx0XHQnY2xhc3MnOiAvXFwuWy06XFwuXFx3XSsvZyxcblx0XHQnaWQnOiAvI1stOlxcLlxcd10rL2dcblx0fVxufTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQnaGV4Y29kZSc6IC8jW1xcZGEtZl17Myw2fS9naSxcblx0J2VudGl0eSc6IC9cXFxcW1xcZGEtZl17MSw4fS9naSxcblx0J251bWJlcic6IC9bXFxkJVxcLl0rL2dcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MtZXh0cmFzLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFx3XFxXXSo/XFwqXFwvL2csXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcOl0pXFwvXFwvLio/KFxccj9cXG58JCkvZyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiAvKFwifCcpKFxcXFw/LikqP1xcMS9nLFxuXHQnY2xhc3MtbmFtZSc6IHtcblx0XHRwYXR0ZXJuOiAvKCg/Oig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8dHJhaXR8aW5zdGFuY2VvZnxuZXcpXFxzKyl8KD86Y2F0Y2hcXHMrXFwoKSlbYS16MC05X1xcLlxcXFxdKy9pZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC8oXFwufFxcXFwpL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKGlmfGVsc2V8d2hpbGV8ZG98Zm9yfHJldHVybnxpbnxpbnN0YW5jZW9mfGZ1bmN0aW9ufG5ld3x0cnl8dGhyb3d8Y2F0Y2h8ZmluYWxseXxudWxsfGJyZWFrfGNvbnRpbnVlKVxcYi9nLFxuXHQnYm9vbGVhbic6IC9cXGIodHJ1ZXxmYWxzZSlcXGIvZyxcblx0J2Z1bmN0aW9uJzoge1xuXHRcdHBhdHRlcm46IC9bYS16MC05X10rXFwoL2lnLFxuXHRcdGluc2lkZToge1xuXHRcdFx0cHVuY3R1YXRpb246IC9cXCgvXG5cdFx0fVxuXHR9LFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4W1xcZEEtRmEtZl0rfFxcZCpcXC4/XFxkKyhbRWVdLT9cXGQrKT8pXFxiL2csXG5cdCdvcGVyYXRvcic6IC9bLStdezEsMn18IXw8PT98Pj0/fD17MSwzfXwmezEsMn18XFx8P1xcfHxcXD98XFwqfFxcL3xcXH58XFxefFxcJS9nLFxuXHQnaWdub3JlJzogLyYobHR8Z3R8YW1wKTsvZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9nXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZhbHNlfGZpbmFsbHl8Zm9yfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpXFxiL2csXG5cdCdudW1iZXInOiAvXFxiLT8oMHhbXFxkQS1GYS1mXSt8XFxkKlxcLj9cXGQrKFtFZV1bKy1dP1xcZCspP3xOYU58LT9JbmZpbml0eSlcXGIvZyxcblx0J2Z1bmN0aW9uJzogLyg/IVxcZClbYS16MC05XyRdKyg/PVxcKCkvaWdcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAndGFnJywge1xuXHRcdCdzY3JpcHQnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvPHNjcmlwdFtcXHdcXFddKj8+W1xcd1xcV10qPzxcXC9zY3JpcHQ+L2lnLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLzxzY3JpcHRbXFx3XFxXXSo/Pnw8XFwvc2NyaXB0Pi9pZyxcblx0XHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtamF2YXNjcmlwdCdcblx0XHR9XG5cdH0pO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCIoZnVuY3Rpb24oUHJpc20pIHtcblxuLy8gSWdub3JlIGNvbW1lbnRzIHN0YXJ0aW5nIHdpdGggeyB0byBwcml2aWxlZ2Ugc3RyaW5nIGludGVycG9sYXRpb24gaGlnaGxpZ2h0aW5nXG52YXIgY29tbWVudCA9IC8jKD8hXFx7KS4rL2csXG4gICAgaW50ZXJwb2xhdGlvbiA9IHtcbiAgICBcdHBhdHRlcm46IC8jXFx7W159XStcXH0vZyxcbiAgICBcdGFsaWFzOiAndmFyaWFibGUnXG4gICAgfTtcblxuUHJpc20ubGFuZ3VhZ2VzLmNvZmZlZXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2phdmFzY3JpcHQnLCB7XG5cdCdjb21tZW50JzogY29tbWVudCxcblx0J3N0cmluZyc6IFtcblxuXHRcdC8vIFN0cmluZ3MgYXJlIG11bHRpbGluZVxuXHRcdC8nKD86XFxcXD9bXFxzXFxTXSkqPycvZyxcblxuXHRcdHtcblx0XHRcdC8vIFN0cmluZ3MgYXJlIG11bHRpbGluZVxuXHRcdFx0cGF0dGVybjogL1wiKD86XFxcXD9bXFxzXFxTXSkqP1wiL2csXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uXG5cdFx0XHR9XG5cdFx0fVxuXHRdLFxuXHQna2V5d29yZCc6IC9cXGIoYW5kfGJyZWFrfGJ5fGNhdGNofGNsYXNzfGNvbnRpbnVlfGRlYnVnZ2VyfGRlbGV0ZXxkb3xlYWNofGVsc2V8ZXh0ZW5kfGV4dGVuZHN8ZmFsc2V8ZmluYWxseXxmb3J8aWZ8aW58aW5zdGFuY2VvZnxpc3xpc250fGxldHxsb29wfG5hbWVzcGFjZXxuZXd8bm98bm90fG51bGx8b2Z8b2ZmfG9ufG9yfG93bnxyZXR1cm58c3VwZXJ8c3dpdGNofHRoZW58dGhpc3x0aHJvd3x0cnVlfHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHdpbmRvd3x3aXRofHllc3x5aWVsZClcXGIvZyxcblx0J2NsYXNzLW1lbWJlcic6IHtcblx0XHRwYXR0ZXJuOiAvQCg/IVxcZClcXHcrLyxcblx0XHRhbGlhczogJ3ZhcmlhYmxlJ1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY29mZmVlc2NyaXB0JywgJ2NvbW1lbnQnLCB7XG5cdCdtdWx0aWxpbmUtY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvIyMjW1xcc1xcU10rPyMjIy9nLFxuXHRcdGFsaWFzOiAnY29tbWVudCdcblx0fSxcblxuXHQvLyBCbG9jayByZWdleHAgY2FuIGNvbnRhaW4gY29tbWVudHMgYW5kIGludGVycG9sYXRpb25cblx0J2Jsb2NrLXJlZ2V4Jzoge1xuXHRcdHBhdHRlcm46IC9cXC97M31bXFxzXFxTXSo/XFwvezN9Lyxcblx0XHRhbGlhczogJ3JlZ2V4Jyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdjb21tZW50JzogY29tbWVudCxcblx0XHRcdCdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvblxuXHRcdH1cblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCdpbmxpbmUtamF2YXNjcmlwdCc6IHtcblx0XHRwYXR0ZXJuOiAvYCg/OlxcXFw/W1xcc1xcU10pKj9gL2csXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnZGVsaW1pdGVyJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvZyxcblx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdH0sXG5cdFx0XHRyZXN0OiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0fSxcblxuXHQvLyBCbG9jayBzdHJpbmdzXG5cdCdtdWx0aWxpbmUtc3RyaW5nJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8nJydbXFxzXFxTXSo/JycnLyxcblx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogL1wiXCJcIltcXHNcXFNdKj9cIlwiXCIvLFxuXHRcdFx0YWxpYXM6ICdzdHJpbmcnLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdGludGVycG9sYXRpb246IGludGVycG9sYXRpb25cblx0XHRcdH1cblx0XHR9XG5cdF1cblxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NvZmZlZXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQvLyBPYmplY3QgcHJvcGVydHlcblx0J3Byb3BlcnR5JzogLyg/IVxcZClcXHcrKD89XFxzKjooPyE6KSkvZ1xufSk7XG5cbn0oUHJpc20pKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29mZmVlc2NyaXB0LmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLmh0dHAgPSB7XG4gICAgJ3JlcXVlc3QtbGluZSc6IHtcbiAgICAgICAgcGF0dGVybjogL14oUE9TVHxHRVR8UFVUfERFTEVURXxPUFRJT05TfFBBVENIfFRSQUNFfENPTk5FQ1QpXFxiXFxzaHR0cHM/OlxcL1xcL1xcUytcXHNIVFRQXFwvWzAtOS5dKy9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIEhUVFAgVmVyYlxuICAgICAgICAgICAgcHJvcGVydHk6IC9eXFxiKFBPU1R8R0VUfFBVVHxERUxFVEV8T1BUSU9OU3xQQVRDSHxUUkFDRXxDT05ORUNUKVxcYi9nLFxuICAgICAgICAgICAgLy8gUGF0aCBvciBxdWVyeSBhcmd1bWVudFxuICAgICAgICAgICAgJ2F0dHItbmFtZSc6IC86XFx3Ky9nXG4gICAgICAgIH1cbiAgICB9LFxuICAgICdyZXNwb25zZS1zdGF0dXMnOiB7XG4gICAgICAgIHBhdHRlcm46IC9eSFRUUFxcLzEuWzAxXSBbMC05XSsuKi9nLFxuICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgIC8vIFN0YXR1cywgZS5nLiAyMDAgT0tcbiAgICAgICAgICAgIHByb3BlcnR5OiAvWzAtOV0rW0EtWlxccy1dKyQvaWdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gSFRUUCBoZWFkZXIgbmFtZVxuICAgIGtleXdvcmQ6IC9eW1xcdy1dKzooPz0uKykvZ21cbn07XG5cbi8vIENyZWF0ZSBhIG1hcHBpbmcgb2YgQ29udGVudC1UeXBlIGhlYWRlcnMgdG8gbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcbnZhciBodHRwTGFuZ3VhZ2VzID0ge1xuICAgICdhcHBsaWNhdGlvbi9qc29uJzogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsXG4gICAgJ2FwcGxpY2F0aW9uL3htbCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAsXG4gICAgJ3RleHQveG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCxcbiAgICAndGV4dC9odG1sJzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxufTtcblxuLy8gSW5zZXJ0IGVhY2ggY29udGVudCB0eXBlIHBhcnNlciB0aGF0IGhhcyBpdHMgYXNzb2NpYXRlZCBsYW5ndWFnZVxuLy8gY3VycmVudGx5IGxvYWRlZC5cbmZvciAodmFyIGNvbnRlbnRUeXBlIGluIGh0dHBMYW5ndWFnZXMpIHtcbiAgICBpZiAoaHR0cExhbmd1YWdlc1tjb250ZW50VHlwZV0pIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9uc1tjb250ZW50VHlwZV0gPSB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCcoY29udGVudC10eXBlOlxcXFxzKicgKyBjb250ZW50VHlwZSArICdbXFxcXHdcXFxcV10qPylcXFxcblxcXFxuW1xcXFx3XFxcXFddKicsICdnaScpLFxuICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgIHJlc3Q6IGh0dHBMYW5ndWFnZXNbY29udGVudFR5cGVdXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2h0dHAnLCAna2V5d29yZCcsIG9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnNjc3MgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKShcXC9cXCpbXFx3XFxXXSo/XFwqXFwvfFxcL1xcLy4qPyhcXHI/XFxufCQpKS9nLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0fSxcblx0Ly8gYXR1cmxlIGlzIGp1c3QgdGhlIEAqKiosIG5vdCB0aGUgZW50aXJlIHJ1bGUgKHRvIGhpZ2hsaWdodCB2YXIgJiBzdHVmZnMpXG5cdC8vICsgYWRkIGFiaWxpdHkgdG8gaGlnaGxpZ2h0IG51bWJlciAmIHVuaXQgZm9yIG1lZGlhIHF1ZXJpZXNcblx0J2F0cnVsZSc6IC9AW1xcdy1dKyg/PVxccysoXFwofFxce3w7KSkvZ2ksXG5cdC8vIHVybCwgY29tcGFzc2lmaWVkXG5cdCd1cmwnOiAvKFstYS16XSstKSp1cmwoPz1cXCgpL2dpLFxuXHQvLyBDU1Mgc2VsZWN0b3IgcmVnZXggaXMgbm90IGFwcHJvcHJpYXRlIGZvciBTYXNzXG5cdC8vIHNpbmNlIHRoZXJlIGNhbiBiZSBsb3QgbW9yZSB0aGluZ3MgKHZhciwgQCBkaXJlY3RpdmUsIG5lc3RpbmcuLilcblx0Ly8gYSBzZWxlY3RvciBtdXN0IHN0YXJ0IGF0IHRoZSBlbmQgb2YgYSBwcm9wZXJ0eSBvciBhZnRlciBhIGJyYWNlIChlbmQgb2Ygb3RoZXIgcnVsZXMgb3IgbmVzdGluZylcblx0Ly8gaXQgY2FuIGNvbnRhaW4gc29tZSBjYXJhY3RlcnMgdGhhdCBhcmVuJ3QgdXNlZCBmb3IgZGVmaW5pbmcgcnVsZXMgb3IgZW5kIG9mIHNlbGVjdG9yLCAmIChwYXJlbnQgc2VsZWN0b3IpLCBvciBpbnRlcnBvbGF0ZWQgdmFyaWFibGVcblx0Ly8gdGhlIGVuZCBvZiBhIHNlbGVjdG9yIGlzIGZvdW5kIHdoZW4gdGhlcmUgaXMgbm8gcnVsZXMgaW4gaXQgKCB7fSBvciB7XFxzfSkgb3IgaWYgdGhlcmUgaXMgYSBwcm9wZXJ0eSAoYmVjYXVzZSBhbiBpbnRlcnBvbGF0ZWQgdmFyXG5cdC8vIGNhbiBcInBhc3NcIiBhcyBhIHNlbGVjdG9yLSBlLmc6IHByb3BlciN7JGVydHl9KVxuXHQvLyB0aGlzIG9uZSB3YXMgYXJkIHRvIGRvLCBzbyBwbGVhc2UgYmUgY2FyZWZ1bCBpZiB5b3UgZWRpdCB0aGlzIG9uZSA6KVxuXHQnc2VsZWN0b3InOiAvKFteQDtcXHtcXH1cXChcXCldPyhbXkA7XFx7XFx9XFwoXFwpXXwmfFxcI1xce1xcJFstX1xcd10rXFx9KSspKD89XFxzKlxceyhcXH18XFxzfFteXFx9XSsoOnxcXHspW15cXH1dKykpL2dtXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdhdHJ1bGUnLCB7XG5cdCdrZXl3b3JkJzogL0AoaWZ8ZWxzZSBpZnxlbHNlfGZvcnxlYWNofHdoaWxlfGltcG9ydHxleHRlbmR8ZGVidWd8d2FybnxtaXhpbnxpbmNsdWRlfGZ1bmN0aW9ufHJldHVybnxjb250ZW50KXwoPz1AZm9yXFxzK1xcJFstX1xcd10rXFxzKStmcm9tL2lcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ3Byb3BlcnR5Jywge1xuXHQvLyB2YXIgYW5kIGludGVycG9sYXRlZCB2YXJzXG5cdCd2YXJpYWJsZSc6IC8oKFxcJFstX1xcd10rKXwoI1xce1xcJFstX1xcd10rXFx9KSkvaVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnZnVuY3Rpb24nLCB7XG5cdCdwbGFjZWhvbGRlcic6IC8lWy1fXFx3XSsvaSxcblx0J3N0YXRlbWVudCc6IC9cXEIhKGRlZmF1bHR8b3B0aW9uYWwpXFxiL2dpLFxuXHQnYm9vbGVhbic6IC9cXGIodHJ1ZXxmYWxzZSlcXGIvZyxcblx0J251bGwnOiAvXFxiKG51bGwpXFxiL2csXG5cdCdvcGVyYXRvcic6IC9cXHMrKFstK117MSwyfXw9ezEsMn18IT18XFx8P1xcfHxcXD98XFwqfFxcL3xcXCUpXFxzKy9nXG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzLmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnNxbD0geyBcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKFxcL1xcKltcXHdcXFddKj9cXCpcXC98KCgtLSl8KFxcL1xcLyl8IykuKj8oXFxyP1xcbnwkKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdzdHJpbmcnIDoge1xuXHRcdHBhdHRlcm46IC8oXnxbXkBdKShcInwnKShcXFxcP1tcXHNcXFNdKSo/XFwyL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQndmFyaWFibGUnOiAvQFtcXHcuJF0rfEAoXCJ8J3xgKShcXFxcP1tcXHNcXFNdKSs/XFwxL2csXG5cdCdmdW5jdGlvbic6IC9cXGIoPzpDT1VOVHxTVU18QVZHfE1JTnxNQVh8RklSU1R8TEFTVHxVQ0FTRXxMQ0FTRXxNSUR8TEVOfFJPVU5EfE5PV3xGT1JNQVQpKD89XFxzKlxcKCkvaWcsIC8vIFNob3VsZCB3ZSBoaWdobGlnaHQgdXNlciBkZWZpbmVkIGZ1bmN0aW9ucyB0b28/XG5cdCdrZXl3b3JkJzogL1xcYig/OkFDVElPTnxBRER8QUZURVJ8QUxHT1JJVEhNfEFMVEVSfEFOQUxZWkV8QVBQTFl8QVN8QVNDfEFVVEhPUklaQVRJT058QkFDS1VQfEJEQnxCRUdJTnxCRVJLRUxFWURCfEJJR0lOVHxCSU5BUll8QklUfEJMT0J8Qk9PTHxCT09MRUFOfEJSRUFLfEJST1dTRXxCVFJFRXxCVUxLfEJZfENBTEx8Q0FTQ0FERXxDQVNDQURFRHxDQVNFfENIQUlOfENIQVIgVkFSWUlOR3xDSEFSQUNURVIgVkFSWUlOR3xDSEVDS3xDSEVDS1BPSU5UfENMT1NFfENMVVNURVJFRHxDT0FMRVNDRXxDT0xVTU58Q09MVU1OU3xDT01NRU5UfENPTU1JVHxDT01NSVRURUR8Q09NUFVURXxDT05ORUNUfENPTlNJU1RFTlR8Q09OU1RSQUlOVHxDT05UQUlOU3xDT05UQUlOU1RBQkxFfENPTlRJTlVFfENPTlZFUlR8Q1JFQVRFfENST1NTfENVUlJFTlR8Q1VSUkVOVF9EQVRFfENVUlJFTlRfVElNRXxDVVJSRU5UX1RJTUVTVEFNUHxDVVJSRU5UX1VTRVJ8Q1VSU09SfERBVEF8REFUQUJBU0V8REFUQUJBU0VTfERBVEVUSU1FfERCQ0N8REVBTExPQ0FURXxERUN8REVDSU1BTHxERUNMQVJFfERFRkFVTFR8REVGSU5FUnxERUxBWUVEfERFTEVURXxERU5ZfERFU0N8REVTQ1JJQkV8REVURVJNSU5JU1RJQ3xESVNBQkxFfERJU0NBUkR8RElTS3xESVNUSU5DVHxESVNUSU5DVFJPV3xESVNUUklCVVRFRHxET3xET1VCTEV8RE9VQkxFIFBSRUNJU0lPTnxEUk9QfERVTU1ZfERVTVB8RFVNUEZJTEV8RFVQTElDQVRFIEtFWXxFTFNFfEVOQUJMRXxFTkNMT1NFRCBCWXxFTkR8RU5HSU5FfEVOVU18RVJSTFZMfEVSUk9SU3xFU0NBUEV8RVNDQVBFRCBCWXxFWENFUFR8RVhFQ3xFWEVDVVRFfEVYSVR8RVhQTEFJTnxFWFRFTkRFRHxGRVRDSHxGSUVMRFN8RklMRXxGSUxMRkFDVE9SfEZJUlNUfEZJWEVEfEZMT0FUfEZPTExPV0lOR3xGT1J8Rk9SIEVBQ0ggUk9XfEZPUkNFfEZPUkVJR058RlJFRVRFWFR8RlJFRVRFWFRUQUJMRXxGUk9NfEZVTEx8RlVOQ1RJT058R0VPTUVUUll8R0VPTUVUUllDT0xMRUNUSU9OfEdMT0JBTHxHT1RPfEdSQU5UfEdST1VQfEhBTkRMRVJ8SEFTSHxIQVZJTkd8SE9MRExPQ0t8SURFTlRJVFl8SURFTlRJVFlfSU5TRVJUfElERU5USVRZQ09MfElGfElHTk9SRXxJTVBPUlR8SU5ERVh8SU5GSUxFfElOTkVSfElOTk9EQnxJTk9VVHxJTlNFUlR8SU5UfElOVEVHRVJ8SU5URVJTRUNUfElOVE98SU5WT0tFUnxJU09MQVRJT04gTEVWRUx8Sk9JTnxLRVl8S0VZU3xLSUxMfExBTkdVQUdFIFNRTHxMQVNUfExFRlR8TElNSVR8TElORU5PfExJTkVTfExJTkVTVFJJTkd8TE9BRHxMT0NBTHxMT0NLfExPTkdCTE9CfExPTkdURVhUfE1BVENIfE1BVENIRUR8TUVESVVNQkxPQnxNRURJVU1JTlR8TUVESVVNVEVYVHxNRVJHRXxNSURETEVJTlR8TU9ESUZJRVMgU1FMIERBVEF8TU9ESUZZfE1VTFRJTElORVNUUklOR3xNVUxUSVBPSU5UfE1VTFRJUE9MWUdPTnxOQVRJT05BTHxOQVRJT05BTCBDSEFSIFZBUllJTkd8TkFUSU9OQUwgQ0hBUkFDVEVSfE5BVElPTkFMIENIQVJBQ1RFUiBWQVJZSU5HfE5BVElPTkFMIFZBUkNIQVJ8TkFUVVJBTHxOQ0hBUnxOQ0hBUiBWQVJDSEFSfE5FWFR8Tk98Tk8gU1FMfE5PQ0hFQ0t8Tk9DWUNMRXxOT05DTFVTVEVSRUR8TlVMTElGfE5VTUVSSUN8T0Z8T0ZGfE9GRlNFVFN8T058T1BFTnxPUEVOREFUQVNPVVJDRXxPUEVOUVVFUll8T1BFTlJPV1NFVHxPUFRJTUlaRXxPUFRJT058T1BUSU9OQUxMWXxPUkRFUnxPVVR8T1VURVJ8T1VURklMRXxPVkVSfFBBUlRJQUx8UEFSVElUSU9OfFBFUkNFTlR8UElWT1R8UExBTnxQT0lOVHxQT0xZR09OfFBSRUNFRElOR3xQUkVDSVNJT058UFJFVnxQUklNQVJZfFBSSU5UfFBSSVZJTEVHRVN8UFJPQ3xQUk9DRURVUkV8UFVCTElDfFBVUkdFfFFVSUNLfFJBSVNFUlJPUnxSRUFEfFJFQURTIFNRTCBEQVRBfFJFQURURVhUfFJFQUx8UkVDT05GSUdVUkV8UkVGRVJFTkNFU3xSRUxFQVNFfFJFTkFNRXxSRVBFQVRBQkxFfFJFUExJQ0FUSU9OfFJFUVVJUkV8UkVTVE9SRXxSRVNUUklDVHxSRVRVUk58UkVUVVJOU3xSRVZPS0V8UklHSFR8Uk9MTEJBQ0t8Uk9VVElORXxST1dDT1VOVHxST1dHVUlEQ09MfFJPV1M/fFJUUkVFfFJVTEV8U0FWRXxTQVZFUE9JTlR8U0NIRU1BfFNFTEVDVHxTRVJJQUx8U0VSSUFMSVpBQkxFfFNFU1NJT058U0VTU0lPTl9VU0VSfFNFVHxTRVRVU0VSfFNIQVJFIE1PREV8U0hPV3xTSFVURE9XTnxTSU1QTEV8U01BTExJTlR8U05BUFNIT1R8U09NRXxTT05BTUV8U1RBUlR8U1RBUlRJTkcgQll8U1RBVElTVElDU3xTVEFUVVN8U1RSSVBFRHxTWVNURU1fVVNFUnxUQUJMRXxUQUJMRVN8VEFCTEVTUEFDRXxURU1QKD86T1JBUlkpP3xURU1QVEFCTEV8VEVSTUlOQVRFRCBCWXxURVhUfFRFWFRTSVpFfFRIRU58VElNRVNUQU1QfFRJTllCTE9CfFRJTllJTlR8VElOWVRFWFR8VE98VE9QfFRSQU58VFJBTlNBQ1RJT058VFJBTlNBQ1RJT05TfFRSSUdHRVJ8VFJVTkNBVEV8VFNFUVVBTHxUWVBFfFRZUEVTfFVOQk9VTkRFRHxVTkNPTU1JVFRFRHxVTkRFRklORUR8VU5JT058VU5QSVZPVHxVUERBVEV8VVBEQVRFVEVYVHxVU0FHRXxVU0V8VVNFUnxVU0lOR3xWQUxVRXxWQUxVRVN8VkFSQklOQVJZfFZBUkNIQVJ8VkFSQ0hBUkFDVEVSfFZBUllJTkd8VklFV3xXQUlURk9SfFdBUk5JTkdTfFdIRU58V0hFUkV8V0hJTEV8V0lUSHxXSVRIIFJPTExVUHxXSVRISU58V09SS3xXUklURXxXUklURVRFWFQpXFxiL2dpLFxuXHQnYm9vbGVhbic6IC9cXGIoPzpUUlVFfEZBTFNFfE5VTEwpXFxiL2dpLFxuXHQnbnVtYmVyJzogL1xcYi0/KDB4KT9cXGQqXFwuP1tcXGRhLWZdK1xcYi9nLFxuXHQnb3BlcmF0b3InOiAvXFxiKD86QUxMfEFORHxBTll8QkVUV0VFTnxFWElTVFN8SU58TElLRXxOT1R8T1J8SVN8VU5JUVVFfENIQVJBQ1RFUiBTRVR8Q09MTEFURXxESVZ8T0ZGU0VUfFJFR0VYUHxSTElLRXxTT1VORFMgTElLRXxYT1IpXFxifFstK117MX18IXxbPTw+XXsxLDJ9fCgmKXsxLDJ9fFxcfD9cXHx8XFw/fFxcKnxcXC8vZ2ksXG5cdCdwdW5jdHVhdGlvbic6IC9bO1tcXF0oKWAsLl0vZ1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiLyoqXG4gKiBPcmlnaW5hbCBieSBBYXJvbiBIYXJ1bjogaHR0cDovL2FhaGFjcmVhdGl2ZS5jb20vMjAxMi8wNy8zMS9waHAtc3ludGF4LWhpZ2hsaWdodGluZy1wcmlzbS9cbiAqIE1vZGlmaWVkIGJ5IE1pbGVzIEpvaG5zb246IGh0dHA6Ly9taWxlc2oubWVcbiAqXG4gKiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nOlxuICogXHRcdC0gRXh0ZW5kcyBjbGlrZSBzeW50YXhcbiAqIFx0XHQtIFN1cHBvcnQgZm9yIFBIUCA1LjMrIChuYW1lc3BhY2VzLCB0cmFpdHMsIGdlbmVyYXRvcnMsIGV0YylcbiAqIFx0XHQtIFNtYXJ0ZXIgY29uc3RhbnQgYW5kIGZ1bmN0aW9uIG1hdGNoaW5nXG4gKlxuICogQWRkcyB0aGUgZm9sbG93aW5nIG5ldyB0b2tlbiBjbGFzc2VzOlxuICogXHRcdGNvbnN0YW50LCBkZWxpbWl0ZXIsIHZhcmlhYmxlLCBmdW5jdGlvbiwgcGFja2FnZVxuICovXG5cblByaXNtLmxhbmd1YWdlcy5waHAgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2tleXdvcmQnOiAvXFxiKGFuZHxvcnx4b3J8YXJyYXl8YXN8YnJlYWt8Y2FzZXxjZnVuY3Rpb258Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVjbGFyZXxkZWZhdWx0fGRpZXxkb3xlbHNlfGVsc2VpZnxlbmRkZWNsYXJlfGVuZGZvcnxlbmRmb3JlYWNofGVuZGlmfGVuZHN3aXRjaHxlbmR3aGlsZXxleHRlbmRzfGZvcnxmb3JlYWNofGZ1bmN0aW9ufGluY2x1ZGV8aW5jbHVkZV9vbmNlfGdsb2JhbHxpZnxuZXd8cmV0dXJufHN0YXRpY3xzd2l0Y2h8dXNlfHJlcXVpcmV8cmVxdWlyZV9vbmNlfHZhcnx3aGlsZXxhYnN0cmFjdHxpbnRlcmZhY2V8cHVibGljfGltcGxlbWVudHN8cHJpdmF0ZXxwcm90ZWN0ZWR8cGFyZW50fHRocm93fG51bGx8ZWNob3xwcmludHx0cmFpdHxuYW1lc3BhY2V8ZmluYWx8eWllbGR8Z290b3xpbnN0YW5jZW9mfGZpbmFsbHl8dHJ5fGNhdGNoKVxcYi9pZyxcblx0J2NvbnN0YW50JzogL1xcYltBLVowLTlfXXsyLH1cXGIvZyxcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pKFxcL1xcKltcXHdcXFddKj9cXCpcXC98KF58W146XSkoXFwvXFwvfCMpLio/KFxccj9cXG58JCkpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2tleXdvcmQnLCB7XG5cdCdkZWxpbWl0ZXInOiAvKFxcPz58PFxcP3BocHw8XFw/KS9pZyxcblx0J3ZhcmlhYmxlJzogLyhcXCRcXHcrKVxcYi9pZyxcblx0J3BhY2thZ2UnOiB7XG5cdFx0cGF0dGVybjogLyhcXFxcfG5hbWVzcGFjZVxccyt8dXNlXFxzKylbXFx3XFxcXF0rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdHB1bmN0dWF0aW9uOiAvXFxcXC9cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBNdXN0IGJlIGRlZmluZWQgYWZ0ZXIgdGhlIGZ1bmN0aW9uIHBhdHRlcm5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdvcGVyYXRvcicsIHtcblx0J3Byb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oLT4pW1xcd10rL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuLy8gQWRkIEhUTUwgc3VwcG9ydCBvZiB0aGUgbWFya3VwIGxhbmd1YWdlIGV4aXN0c1xuaWYgKFByaXNtLmxhbmd1YWdlcy5tYXJrdXApIHtcblxuXHQvLyBUb2tlbml6ZSBhbGwgaW5saW5lIFBIUCBibG9ja3MgdGhhdCBhcmUgd3JhcHBlZCBpbiA8P3BocCA/PlxuXHQvLyBUaGlzIGFsbG93cyBmb3IgZWFzeSBQSFAgKyBtYXJrdXAgaGlnaGxpZ2h0aW5nXG5cdFByaXNtLmhvb2tzLmFkZCgnYmVmb3JlLWhpZ2hsaWdodCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgIT09ICdwaHAnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZW52LnRva2VuU3RhY2sgPSBbXTtcblxuXHRcdGVudi5iYWNrdXBDb2RlID0gZW52LmNvZGU7XG5cdFx0ZW52LmNvZGUgPSBlbnYuY29kZS5yZXBsYWNlKC8oPzo8XFw/cGhwfDxcXD8pW1xcd1xcV10qPyg/OlxcPz4pL2lnLCBmdW5jdGlvbihtYXRjaCkge1xuXHRcdFx0ZW52LnRva2VuU3RhY2sucHVzaChtYXRjaCk7XG5cblx0XHRcdHJldHVybiAne3t7UEhQJyArIGVudi50b2tlblN0YWNrLmxlbmd0aCArICd9fX0nO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBSZXN0b3JlIGVudi5jb2RlIGZvciBvdGhlciBwbHVnaW5zIChlLmcuIGxpbmUtbnVtYmVycylcblx0UHJpc20uaG9va3MuYWRkKCdiZWZvcmUtaW5zZXJ0JywgZnVuY3Rpb24oZW52KSB7XG5cdFx0aWYgKGVudi5sYW5ndWFnZSA9PT0gJ3BocCcpIHtcblx0XHRcdGVudi5jb2RlID0gZW52LmJhY2t1cENvZGU7XG5cdFx0XHRkZWxldGUgZW52LmJhY2t1cENvZGU7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBSZS1pbnNlcnQgdGhlIHRva2VucyBhZnRlciBoaWdobGlnaHRpbmdcblx0UHJpc20uaG9va3MuYWRkKCdhZnRlci1oaWdobGlnaHQnLCBmdW5jdGlvbihlbnYpIHtcblx0XHRpZiAoZW52Lmxhbmd1YWdlICE9PSAncGhwJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwLCB0OyB0ID0gZW52LnRva2VuU3RhY2tbaV07IGkrKykge1xuXHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGVudi5oaWdobGlnaHRlZENvZGUucmVwbGFjZSgne3t7UEhQJyArIChpICsgMSkgKyAnfX19JywgUHJpc20uaGlnaGxpZ2h0KHQsIGVudi5ncmFtbWFyLCAncGhwJykpO1xuXHRcdH1cblxuXHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cdH0pO1xuXG5cdC8vIFdyYXAgdG9rZW5zIGluIGNsYXNzZXMgdGhhdCBhcmUgbWlzc2luZyB0aGVtXG5cdFByaXNtLmhvb2tzLmFkZCgnd3JhcCcsIGZ1bmN0aW9uKGVudikge1xuXHRcdGlmIChlbnYubGFuZ3VhZ2UgPT09ICdwaHAnICYmIGVudi50eXBlID09PSAnbWFya3VwJykge1xuXHRcdFx0ZW52LmNvbnRlbnQgPSBlbnYuY29udGVudC5yZXBsYWNlKC8oXFx7XFx7XFx7UEhQWzAtOV0rXFx9XFx9XFx9KS9nLCBcIjxzcGFuIGNsYXNzPVxcXCJ0b2tlbiBwaHBcXFwiPiQxPC9zcGFuPlwiKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIEFkZCB0aGUgcnVsZXMgYmVmb3JlIGFsbCBvdGhlcnNcblx0UHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2NvbW1lbnQnLCB7XG5cdFx0J21hcmt1cCc6IHtcblx0XHRcdHBhdHRlcm46IC88W14/XVxcLz8oLio/KT4vZyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFxuXHRcdH0sXG5cdFx0J3BocCc6IC9cXHtcXHtcXHtQSFBbMC05XStcXH1cXH1cXH0vZ1xuXHR9KTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDlcbiAqKi8iLCJQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdwaHAnLCAndmFyaWFibGUnLCB7XG5cdCd0aGlzJzogL1xcJHRoaXMvZyxcblx0J2dsb2JhbCc6IC9cXCRfPyhHTE9CQUxTfFNFUlZFUnxHRVR8UE9TVHxGSUxFU3xSRVFVRVNUfFNFU1NJT058RU5WfENPT0tJRXxIVFRQX1JBV19QT1NUX0RBVEF8YXJnY3xhcmd2fHBocF9lcnJvcm1zZ3xodHRwX3Jlc3BvbnNlX2hlYWRlcikvZyxcblx0J3Njb3BlJzoge1xuXHRcdHBhdHRlcm46IC9cXGJbXFx3XFxcXF0rOjovZyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdGtleXdvcmQ6IC8oc3RhdGljfHNlbGZ8cGFyZW50KS8sXG5cdFx0XHRwdW5jdHVhdGlvbjogLyg6OnxcXFxcKS9cblx0XHR9XG5cdH1cbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAtZXh0cmFzLmpzXG4gKiogbW9kdWxlIGlkID0gNjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA5XG4gKiovIiwiUHJpc20ubGFuZ3VhZ2VzLnB5dGhvbj0geyBcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pIy4qPyhcXHI/XFxufCQpL2csXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnc3RyaW5nJzogL1wiXCJcIltcXHNcXFNdKz9cIlwiXCJ8JycnW1xcc1xcU10rPycnJ3woXCJ8JykoXFxcXD8uKSo/XFwxL2csXG5cdCdrZXl3b3JkJyA6IC9cXGIoYXN8YXNzZXJ0fGJyZWFrfGNsYXNzfGNvbnRpbnVlfGRlZnxkZWx8ZWxpZnxlbHNlfGV4Y2VwdHxleGVjfGZpbmFsbHl8Zm9yfGZyb218Z2xvYmFsfGlmfGltcG9ydHxpbnxpc3xsYW1iZGF8cGFzc3xwcmludHxyYWlzZXxyZXR1cm58dHJ5fHdoaWxlfHdpdGh8eWllbGQpXFxiL2csXG5cdCdib29sZWFuJyA6IC9cXGIoVHJ1ZXxGYWxzZSlcXGIvZyxcblx0J251bWJlcicgOiAvXFxiLT8oMFtib3hdKT8oPzpbXFxkYS1mXStcXC4/XFxkKnxcXC5cXGQrKSg/OmVbKy1dP1xcZCspP2o/XFxiL2dpLFxuXHQnb3BlcmF0b3InIDogL1stK117MSwyfXw9PyZsdDt8PT8mZ3Q7fCF8PXsxLDJ9fCgmKXsxLDJ9fCgmYW1wOyl7MSwyfXxcXHw/XFx8fFxcP3xcXCp8XFwvfH58XFxefCV8XFxiKG9yfGFuZHxub3QpXFxiL2csXG5cdCdpZ25vcmUnIDogLyYobHR8Z3R8YW1wKTsvZ2ksXG5cdCdwdW5jdHVhdGlvbicgOiAvW3t9W1xcXTsoKSwuOl0vZ1xufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIi8qKlxuICogT3JpZ2luYWwgYnkgU2FtdWVsIEZsb3Jlc1xuICpcbiAqIEFkZHMgdGhlIGZvbGxvd2luZyBuZXcgdG9rZW4gY2xhc3NlczpcbiAqIFx0XHRjb25zdGFudCwgYnVpbHRpbiwgdmFyaWFibGUsIHN5bWJvbCwgcmVnZXhcbiAqL1xuUHJpc20ubGFuZ3VhZ2VzLnJ1YnkgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NvbW1lbnQnOiAvI1teXFxyXFxuXSooXFxyP1xcbnwkKS9nLFxuXHQna2V5d29yZCc6IC9cXGIoYWxpYXN8YW5kfEJFR0lOfGJlZ2lufGJyZWFrfGNhc2V8Y2xhc3N8ZGVmfGRlZmluZV9tZXRob2R8ZGVmaW5lZHxkb3xlYWNofGVsc2V8ZWxzaWZ8RU5EfGVuZHxlbnN1cmV8ZmFsc2V8Zm9yfGlmfGlufG1vZHVsZXxuZXd8bmV4dHxuaWx8bm90fG9yfHJhaXNlfHJlZG98cmVxdWlyZXxyZXNjdWV8cmV0cnl8cmV0dXJufHNlbGZ8c3VwZXJ8dGhlbnx0aHJvd3x0cnVlfHVuZGVmfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHlpZWxkKVxcYi9nLFxuXHQnYnVpbHRpbic6IC9cXGIoQXJyYXl8QmlnbnVtfEJpbmRpbmd8Q2xhc3N8Q29udGludWF0aW9ufERpcnxFeGNlcHRpb258RmFsc2VDbGFzc3xGaWxlfFN0YXR8RmlsZXxGaXhudW18RmxvYWR8SGFzaHxJbnRlZ2VyfElPfE1hdGNoRGF0YXxNZXRob2R8TW9kdWxlfE5pbENsYXNzfE51bWVyaWN8T2JqZWN0fFByb2N8UmFuZ2V8UmVnZXhwfFN0cmluZ3xTdHJ1Y3R8VE1TfFN5bWJvbHxUaHJlYWRHcm91cHxUaHJlYWR8VGltZXxUcnVlQ2xhc3MpXFxiLyxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdW2EtekEtWl8wLTldKls/IV0/XFxiL2dcbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdydWJ5JywgJ2tleXdvcmQnLCB7XG5cdCdyZWdleCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCd2YXJpYWJsZSc6IC9bQCRdK1xcYlthLXpBLVpfXVthLXpBLVpfMC05XSpbPyFdP1xcYi9nLFxuXHQnc3ltYm9sJzogLzpcXGJbYS16QS1aX11bYS16QS1aXzAtOV0qWz8hXT9cXGIvZ1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlByaXNtLmxhbmd1YWdlcy5qYXZhID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY2xpa2UnLCB7XG5cdCdrZXl3b3JkJzogL1xcYihhYnN0cmFjdHxjb250aW51ZXxmb3J8bmV3fHN3aXRjaHxhc3NlcnR8ZGVmYXVsdHxnb3RvfHBhY2thZ2V8c3luY2hyb25pemVkfGJvb2xlYW58ZG98aWZ8cHJpdmF0ZXx0aGlzfGJyZWFrfGRvdWJsZXxpbXBsZW1lbnRzfHByb3RlY3RlZHx0aHJvd3xieXRlfGVsc2V8aW1wb3J0fHB1YmxpY3x0aHJvd3N8Y2FzZXxlbnVtfGluc3RhbmNlb2Z8cmV0dXJufHRyYW5zaWVudHxjYXRjaHxleHRlbmRzfGludHxzaG9ydHx0cnl8Y2hhcnxmaW5hbHxpbnRlcmZhY2V8c3RhdGljfHZvaWR8Y2xhc3N8ZmluYWxseXxsb25nfHN0cmljdGZwfHZvbGF0aWxlfGNvbnN0fGZsb2F0fG5hdGl2ZXxzdXBlcnx3aGlsZSlcXGIvZyxcblx0J251bWJlcic6IC9cXGIwYlswMV0rXFxifFxcYjB4W1xcZGEtZl0qXFwuP1tcXGRhLWZwXFwtXStcXGJ8XFxiXFxkKlxcLj9cXGQrW2VdP1tcXGRdKltkZl1cXGJ8XFxiXFxkKlxcLj9cXGQrXFxiL2dpLFxuXHQnb3BlcmF0b3InOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFwuXSkoPzpcXCs9fFxcK1xcKz98LT18LS0/fCE9P3w8ezEsMn09P3w+ezEsM309P3w9PT98Jj18JiY/fFxcfD18XFx8XFx8P3xcXD98XFwqPT98XFwvPT98JT0/fFxcXj0/fDp8fikvZ20sXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOVxuICoqLyIsIlxuZnVuY3Rpb24gYWRkTGluZU51bWJlcnMocHJlKSB7XG5cbiAgdmFyIGxpbmVzTnVtID0gKDEgKyBwcmUuaW5uZXJIVE1MLnNwbGl0KCdcXG4nKS5sZW5ndGgpO1xuICB2YXIgbGluZU51bWJlcnNXcmFwcGVyO1xuXG4gIHZhciBsaW5lcyA9IG5ldyBBcnJheShsaW5lc051bSk7XG4gIGxpbmVzID0gbGluZXMuam9pbignPHNwYW4+PC9zcGFuPicpO1xuXG4gIGxpbmVOdW1iZXJzV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGluZU51bWJlcnNXcmFwcGVyLmNsYXNzTmFtZSA9ICdsaW5lLW51bWJlcnMtcm93cyc7XG4gIGxpbmVOdW1iZXJzV3JhcHBlci5pbm5lckhUTUwgPSBsaW5lcztcblxuICBpZiAocHJlLmhhc0F0dHJpYnV0ZSgnZGF0YS1zdGFydCcpKSB7XG4gICAgcHJlLnN0eWxlLmNvdW50ZXJSZXNldCA9ICdsaW5lbnVtYmVyICcgKyBOdW1iZXIocHJlLmRhdGFzZXQuc3RhcnQpIC0gMTtcbiAgfVxuXG4gIHByZS5hcHBlbmRDaGlsZChsaW5lTnVtYmVyc1dyYXBwZXIpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTGluZU51bWJlcnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9wcmlzbS9hZGRMaW5lTnVtYmVycy5qc1xuICoqLyIsIlxuZnVuY3Rpb24gaXNTY3JvbGxlZEludG9WaWV3KGVsZW0pIHtcbiAgdmFyIGNvb3JkcyA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgdmFyIHZpc2libGVIZWlnaHQgPSAwO1xuXG4gIGlmIChjb29yZHMudG9wIDwgMCkge1xuICAgIHZpc2libGVIZWlnaHQgPSBjb29yZHMuYm90dG9tO1xuICB9IGVsc2UgaWYgKGNvb3Jkcy5ib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICB2aXNpYmxlSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHZpc2libGVIZWlnaHQgPiAxMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Njcm9sbGVkSW50b1ZpZXc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2NsaWVudC9pc1Njcm9sbGVkSW50b1ZpZXcuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJxdWl6LjNiNDRjNGU3YjIyNWYzMTdjMmE0LmpzIn0=
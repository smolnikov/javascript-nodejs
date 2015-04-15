var footer =
webpackJsonp_name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	//require('./preventDocumentScroll');
	'use strict';
	
	var showLinkType = __webpack_require__(124);
	var load2x = __webpack_require__(125);
	var trackSticky = __webpack_require__(126);
	
	//require('newsletter/client').init();
	
	exports.init = function () {
	  showLinkType();
	
	  if (window.devicePixelRatio > 1) {
	    load2x();
	  }
	
	  window.addEventListener('scroll', trackSticky);
	  trackSticky();
	};
	
	exports.trackSticky = trackSticky;

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hoverIntent = __webpack_require__(160);
	
	module.exports = function () {
	
	  var tooltipSpan = null;
	  var shiftX = 8;
	  var shiftY = 10;
	
	  function updatePosition(event) {
	    var left = event.clientX + shiftX;
	    if (left + tooltipSpan.offsetWidth > document.documentElement.clientWidth) {
	      // if beyond the right document border
	      // mirror to the left
	      left = Math.max(0, event.clientX - shiftX - tooltipSpan.offsetWidth);
	    }
	    tooltipSpan.style.left = left + 'px';
	
	    var top = event.clientY + shiftY;
	    if (top + tooltipSpan.offsetHeight > document.documentElement.clientHeight) {
	      top = Math.max(0, event.clientY - shiftY - tooltipSpan.offsetHeight);
	    }
	
	    tooltipSpan.style.top = top + 'px';
	  }
	
	  // we show tooltip element for any link hover, but few of them actually get styled
	  function onOver(event) {
	    if (!event.target.closest) {
	      return;
	    } // over svg
	    var target = event.target.closest('a, [data-tooltip]');
	
	    if (!target) {
	      return;
	    } // links inside toolbars need no tooltips
	    if (target.tagName == 'A' && target.closest('.toolbar')) {
	      return;
	    }tooltipSpan = document.createElement('span');
	    tooltipSpan.className = 'link__type';
	
	    if (target.getAttribute('data-tooltip')) {
	      tooltipSpan.setAttribute('data-tooltip', target.getAttribute('data-tooltip'));
	    } else {
	      tooltipSpan.setAttribute('data-url', target.getAttribute('href'));
	    }
	
	    document.body.appendChild(tooltipSpan);
	    updatePosition(event);
	
	    document.addEventListener('mousemove', updatePosition);
	  }
	
	  function onOut() {
	    if (!tooltipSpan) {
	      return;
	    }document.removeEventListener('mousemove', updatePosition);
	    tooltipSpan.remove();
	    tooltipSpan = null;
	  }
	
	  hoverIntent('a,[data-tooltip]', onOver, onOut);
	};

/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
	
	  var figurePngs = document.querySelectorAll('figure img[src$=".png"]');
	
	  var _loop = function () {
	    var png = figurePngs[i];
	
	    // load @2x version (must exist)
	    png.onload = function () {
	      this.onload = null;
	      if (this.src.match(/@2x.png$/)) return;
	
	      var png2x = new Image();
	      png2x.onload = function () {
	        //console.log(this.src);
	        if (this.width && this.height) {
	          png.src = this.src;
	        }
	      };
	      png2x.src = this.src.replace('.png', '@2x.png');
	    };
	    if (png.complete) png.onload();
	  };
	
	  for (var i = 0; i < figurePngs.length; i++) {
	    _loop();
	  }
	};

/***/ },

/***/ 126:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = trackSticky;
	
	function trackSticky() {
	
	  var stickyElems = document.querySelectorAll('[data-sticky]');
	
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
	      stickyElem.classList.add('sticky');
	      stickyElem.style.position = 'fixed';
	      stickyElem.style.top = 0;
	      stickyElem.style.left = savedLeft + 'px';
	      // zIndex < 1000, because it must be under an overlay,
	      // e.g. sitemap must show over the progress bar
	      stickyElem.style.zIndex = 101;
	      stickyElem.style.background = 'white'; // non-transparent to cover the text
	      stickyElem.style.margin = 0;
	      stickyElem.style.width = placeholder.offsetWidth + 'px'; // keep same width as before
	      stickyElem.placeholder = placeholder;
	    } else if (stickyElem.placeholder && stickyElem.placeholder.getBoundingClientRect().top > 0) {
	      // become non-fixed
	      stickyElem.style.cssText = '';
	      stickyElem.classList.remove('sticky');
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
	  var placeholder = document.createElement('div');
	  var style = getComputedStyle(elem);
	  placeholder.style.width = elem.offsetWidth + 'px';
	  placeholder.style.marginLeft = style.marginLeft;
	  placeholder.style.marginRight = style.marginRight;
	  placeholder.style.height = elem.offsetHeight + 'px';
	  placeholder.style.marginBottom = style.marginBottom;
	  placeholder.style.marginTop = style.marginTop;
	  return placeholder;
	}

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lastPageX = Infinity,
	    lastPageY = Infinity,
	    lastTime = Date.now();
	
	var elementOver;
	
	var elementHoverOver;
	
	var speedTolerance = 0.2;
	
	var handlers = {};
	
	function hoverIntent(selector, over, out) {
	  handlers[selector] = { over: over, out: out };
	}
	
	document.addEventListener('mousemove', mousemove);
	document.addEventListener('mouseout', mouseout);
	
	function mousemove(event) {
	  if (elementHoverOver) {
	    return;
	  }var distance = Math.sqrt(Math.pow(event.pageX - lastPageX, 2) + Math.pow(event.pageY - lastPageY, 2));
	  var speed = distance / (Date.now() - lastTime);
	
	  // slow down => call over(), get the element of interest,
	  // then out() when leaving it
	  if (speed < speedTolerance) {
	    //console.log("speed", speed);
	    var elem = document.elementFromPoint(event.clientX, event.clientY);
	    if (!elem) {
	      return;
	    } // the coords are out of window (happens)
	    if (elem != elementOver) {
	      for (var selector in handlers) {
	        var closest = elem.closest(selector);
	        if (closest) {
	          //console.log("over ", closest);
	          elementHoverOver = { elem: closest, out: handlers[selector].out };
	          handlers[selector].over(event);
	        }
	      }
	      elementOver = elem;
	    }
	  }
	
	  lastPageX = event.pageX;
	  lastPageY = event.pageY;
	  lastTime = Date.now();
	}
	
	function mouseout(event) {
	  if (!elementHoverOver) {
	    return;
	  }var parent = event.relatedTarget;
	  while (parent) {
	    if (parent == elementHoverOver.elem) {
	      //console.log("mouseout false", event.target, elementHoverOver.elem);
	      // still under elementHoverOver
	      return;
	    }
	    parent = parent.parentElement;
	  }
	
	  var out = elementHoverOver.out;
	  elementHoverOver = null;
	  out(event);
	}
	
	module.exports = hoverIntent;

/***/ }

});
//# sourceMappingURL=footer.e6b038d57b458eea1405.js.map
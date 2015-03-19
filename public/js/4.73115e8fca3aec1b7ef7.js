webpackJsonp_name_([4],{

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.init = function () {
	
	  relinkToHeaders();
	
	  replaceSlashesInFragments();
	};
	
	// Internal links like /object
	// In Ebook article headers get id=url, e.g h2(id=/object)
	// Task headers also get similar urls
	//   a(href=/object) should go to a(href=#/object) (if exists)
	function relinkToHeaders() {
	
	  var internalLinks = document.querySelectorAll("a[href^=\"/\"]");
	
	  for (var i = 0; i < internalLinks.length; i++) {
	    var link = internalLinks[i];
	    if (document.getElementById(link.getAttribute("href"))) {
	      link.setAttribute("href", "#" + link.getAttribute("href"));
	    }
	  }
	}
	
	// quick fix for ebook-converter issue
	// http://www.mobileread.com/forums/showthread.php?p=3044812#post3044812
	// contrary to http://tools.ietf.org/html/rfc3986
	// forbids / in fragments https://github.com/kovidgoyal/calibre/blob/ef09e886b3d95d6de5c76ad3a179694ae75c65f4/src/calibre/ebooks/conversion/plugins/epub_output.py#L350-L359
	function replaceSlashesInFragments() {
	
	  var internalLinks = document.querySelectorAll("a[href^=\"#\"]");
	
	  for (var i = 0; i < internalLinks.length; i++) {
	    var link = internalLinks[i];
	    link.setAttribute("href", link.getAttribute("href").replace(/\//g, "-"));
	  }
	
	  var elems = document.querySelectorAll("[id]");
	
	  for (var i = 0; i < elems.length; i++) {
	    var elem = elems[i];
	    elem.id = elem.id.replace(/\//g, "-");
	  }
	}

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9oYW5kbGVycy90dXRvcmlhbC9jbGllbnQvZWJvb2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLFFBQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVzs7QUFFeEIsa0JBQWUsRUFBRSxDQUFDOztBQUVsQiw0QkFBeUIsRUFBRSxDQUFDO0VBRTdCLENBQUM7Ozs7OztBQU1GLFVBQVMsZUFBZSxHQUFHOztBQUV6QixPQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWMsQ0FBQyxDQUFDOztBQUU5RCxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxTQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsU0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUN0RCxXQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO01BQzVEO0lBQ0Y7RUFFRjs7Ozs7O0FBTUQsVUFBUyx5QkFBeUIsR0FBRzs7QUFFbkMsT0FBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFjLENBQUMsQ0FBQzs7QUFFOUQsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsU0FBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFNBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFFOztBQUVELE9BQUksS0FBSyxHQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFL0MsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsU0FBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgcmVsaW5rVG9IZWFkZXJzKCk7XG5cbiAgcmVwbGFjZVNsYXNoZXNJbkZyYWdtZW50cygpO1xuXG59O1xuXG4vLyBJbnRlcm5hbCBsaW5rcyBsaWtlIC9vYmplY3Rcbi8vIEluIEVib29rIGFydGljbGUgaGVhZGVycyBnZXQgaWQ9dXJsLCBlLmcgaDIoaWQ9L29iamVjdClcbi8vIFRhc2sgaGVhZGVycyBhbHNvIGdldCBzaW1pbGFyIHVybHNcbi8vICAgYShocmVmPS9vYmplY3QpIHNob3VsZCBnbyB0byBhKGhyZWY9Iy9vYmplY3QpIChpZiBleGlzdHMpXG5mdW5jdGlvbiByZWxpbmtUb0hlYWRlcnMoKSB7XG5cbiAgdmFyIGludGVybmFsTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiL1wiXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW50ZXJuYWxMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBsaW5rID0gaW50ZXJuYWxMaW5rc1tpXTtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkpIHtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgfVxuICB9XG5cbn1cblxuLy8gcXVpY2sgZml4IGZvciBlYm9vay1jb252ZXJ0ZXIgaXNzdWVcbi8vIGh0dHA6Ly93d3cubW9iaWxlcmVhZC5jb20vZm9ydW1zL3Nob3d0aHJlYWQucGhwP3A9MzA0NDgxMiNwb3N0MzA0NDgxMlxuLy8gY29udHJhcnkgdG8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NlxuLy8gZm9yYmlkcyAvIGluIGZyYWdtZW50cyBodHRwczovL2dpdGh1Yi5jb20va292aWRnb3lhbC9jYWxpYnJlL2Jsb2IvZWYwOWU4ODZiM2Q5NWQ2ZGU1Yzc2YWQzYTE3OTY5NGFlNzVjNjVmNC9zcmMvY2FsaWJyZS9lYm9va3MvY29udmVyc2lvbi9wbHVnaW5zL2VwdWJfb3V0cHV0LnB5I0wzNTAtTDM1OVxuZnVuY3Rpb24gcmVwbGFjZVNsYXNoZXNJbkZyYWdtZW50cygpIHtcblxuICB2YXIgaW50ZXJuYWxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZl49XCIjXCJdJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnRlcm5hbExpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGxpbmsgPSBpbnRlcm5hbExpbmtzW2ldO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKC9cXC8vZywgJy0nKSk7XG4gIH1cblxuICB2YXIgZWxlbXMgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXScpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIGVsZW0uaWQgPSBlbGVtLmlkLnJlcGxhY2UoL1xcLy9nLCAnLScpO1xuICB9XG5cblxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaGFuZGxlcnMvdHV0b3JpYWwvY2xpZW50L2Vib29rLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiNC43MzExNWU4ZmNhM2FlYzFiN2VmNy5qcyJ9
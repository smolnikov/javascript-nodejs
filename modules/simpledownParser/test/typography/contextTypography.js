'use strict';
var contextTypography = require('../../typography/contextTypography');
var config = require('config');

let LQ = config.lang == 'ru' ? '«' : '“';
let RQ = config.lang == 'ru' ? '»' : '”';

describe("contextTypography", function() {

  it("doesn't wrap table tags & headers in p", function() {
    var table = '<h1>test</h1>\n<table>\n<thead>\n<tr>\n  <td>\n1\n</td>\n</tr>\n</thead>\n<tbody>\n<tr>\n  <td\n>2</td>\n</tr>\n</tbody>\n<tfoot>\n<tr>\n<td>\n3\n</td>\n</tr>\n</tfoot>\n</table>';

    contextTypography(table).replace(/\n/g, '').should.be.eql("<h1>test</h1><table><thead><tr><td>1</td></tr></thead><tbody><tr><td>2</td></tr></tbody><tfoot><tr><td>3</td></tr></tfoot></table>");
  });

  it("doesn't wrap ul/li lists with attrs in p", function() {
    var list = '<ul class="test">\n<li class="me">\n1\n</li>\n</ul>';

    contextTypography(list).replace(/\n/g, '').should.be.eql("<ul class=\"test\"><li class=\"me\">1</li></ul>");
  });

  it("no context typography inside pre or script", function() {
    var html = '<pre>"help"</pre><script>var a = "b"</script>';

    contextTypography(html).replace(/\n/g, '').should.be.eql(html);
  });

  it("converts a single line to <p>single line</p>", function() {
    contextTypography("single line").should.be.eql("<p>single line</p>");
  });

  it("converts empty text to empty text", function() {
    contextTypography("").should.be.eql("");
  });

  it("converts double \\n to <p>", function() {
    contextTypography("line1\n\nline2").should.be.eql("<p>line1</p>\n<p>line2</p>");
  });

  it("converts 2 or more \\n to single <p>", function() {
    contextTypography("line1\n\n\n\n\nline2").should.be.eql("<p>line1</p>\n<p>line2</p>");
  });

  it("doesn't insert <p> between block tags", function() {
    var html = "<div> ... </div>\n\n<table> ... </table>";
    contextTypography(html).replace(/\n/g, '').should.be.eql(html.replace(/\n/g, ''));
  });

  it("merges newlines with spaces inbetween", function() {
    contextTypography("line1\n\n    \n\n\nline2").should.be.eql("<p>line1</p>\n<p>line2</p>");
  });

  it("converts quotes", function() {
    contextTypography('"my text"').should.be.eql(config.lang == 'ru' ? '<p>«my text»</p>' : '<p>“my text”</p>');
    contextTypography('"мой текст"').should.be.eql(config.lang == 'ru' ? '<p>«мой текст»</p>' : '<p>“мой текст”</p>');

    contextTypography('"<span>1</span> и <span>2</span>".').should.be.eql(
      `<p>${LQ}<span>1</span> и <span>2</span>${RQ}.</p>`
    );
  });

  it("wraps text in <p>", function() {
    contextTypography('text').should.be.eql('<p>text</p>');
  });

  it("converts quotes in tags", function() {
    var text = '<h3 class="a">"my"</h3>';
    contextTypography(text).should.be.eql(`<h3 class="a">${config.lang == 'ru' ? '«my»' : '“my”'}</h3>`);
  });


/*
  describe("wraps <img> with <figure> if on blank line", function() {

    it("wraps <img>", function* () {
      contextTypography("<img src=\"1.jpg\">").should.be.eql("<figure><img src=\"1.jpg\"></figure>");
    });

    it("works only if spaces are around", function* () {
      contextTypography("   \t<img src=\"1.jpg\">\t  ").should.be.eql("<figure><img src=\"1.jpg\"></figure>");
    });

    it("doesn't touch img if it's in text", function* () {
      contextTypography("text <img src=\"1.jpg\">").should.be.eql("<p>text <img src=\"1.jpg\"></p>");
      contextTypography("<img src=\"1.jpg\"> text").should.be.eql("<p><img src=\"1.jpg\"> text</p>");
    });

    it("passes more complex text", function* () {
      var result = contextTypography("text <img src=\"1.jpg\">\n\n<img src=\"2.jpg\">");
      result.should.be.eql(
        "<p>text <img src=\"1.jpg\"></p>\n<figure><img src=\"2.jpg\"></figure>"
      );
    });
  });
*/
});

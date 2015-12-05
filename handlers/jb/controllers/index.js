var JbRequest = require('../models/jbRequest');
var sendMail = require('mailer').send;
var path = require('path');
var config = require('config');
var countries = require('countries');

var products = {
  "WebStorm":      "WebStorm (JavaScript/HTML/CSS)",
  "PhpStorm":      "PhpStorm (PHP)",
  "RubyMine":      "RubyMine (Ruby)",
  "IntelliJ IDEA": "IntelliJ IDEA Ultimate (Java)",
  "ReSharper":     "ReSharper (C#)",
  "PyCharm":       "PyCharm (Python)",
  "AppCode":       "AppCode (OSX, Objective-C, C/C++)",
  "CLion":         "CLion (C/C++)"
};


exports.get = function*() {
  this.locals.products = products;
  this.locals.countries = countries.all;
  this.locals.form = {
    country: this.countryCode || 'ru'
  };
  this.body = this.render('index');
};

exports.post = function*() {
  this.locals.products = products;

  var fewDaysAgo = new Date();
  fewDaysAgo.setDate( fewDaysAgo.getDate() - 3 );

  var country = this.request.body.country && countries.all[this.request.body.country] ?
    this.request.body.country : (this.countryCode || 'ru');


  var form = this.locals.form = {
    email: this.request.body.email,
    name: this.request.body.name,
    product: this.request.body.product,
    country: country,
    countryName: countries.all[country].na
  };

  var existingRequest = yield JbRequest.findOne({
    email: this.request.body.email,
    product: this.request.body.product,
    country: this.request.body.country,
    name: this.request.body.name,
    created: {
      $gt: fewDaysAgo
    }
  }).exec();

  if (existingRequest) {
    this.locals.error = `
      <p>Вы уже делали запрос на этот продукт с этими данными менее чем 3 дня назад.</p>
      <p>Если вы не получили ответа, напишите на <a href="mailto:orders@javascript.ru">orders@javascript.ru</a>.</p>`;
    this.body = this.render('index');
    return;
  }

  var jbRequest = new JbRequest({
    email: this.request.body.email,
    product: this.request.body.product,
    country: this.request.body.country,
    name: this.request.body.name
  });

  try {

    yield sendMail({
      templatePath: path.join(this.templateDir, 'mail'),
      to: config.jb.email,
      subject: "Запрос лицензии",
      form: form
    });

    yield jbRequest.persist();

    this.body = this.render('success');
    return;
  } catch(e) {
    if (e.name != 'ValidationError') throw e;
    var errors = this.locals.errors = {};
    for(var key in e.errors) {
      errors[key] = e.errors[key].message;
    }
    this.body = this.render('index');
    return;
  }

};

const payments = require('payments');
var OrderTemplate = payments.OrderTemplate;

exports.get = function*() {
  this.nocache();

  var orderTemplate = yield OrderTemplate.findOne({
    module: 'donate',
    slug: this.params.slug
  });

  if (!orderTemplate) {
    this.throw(404);
  }

  this.locals.orderTemplate = orderTemplate;

  this.locals.sitetoolbar = true;
  this.locals.title = orderTemplate.title;

  this.locals.paymentMethods = require('../lib/paymentMethods');

  this.body = this.render('newOrder');
};

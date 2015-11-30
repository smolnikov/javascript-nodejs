const Order = require('payments').Order;
const sendMail = require('mailer').send;
const ExpiringDownloadLink = require('downloadByLink').ExpiringDownloadLink;
const path = require('path');
const log = require('log')();

// not a middleware
// can be called from CRON
module.exports = function* (order) {

  yield sendMail({
    templatePath: path.join(__dirname, '..', 'templates', 'successEmail'),
    to: order.email,
    subject: "Спасибо за поддержку!"
  });

  order.status = Order.STATUS_SUCCESS;

  yield order.persist();

  log.debug("Order success: " + order.number);
};

const Transaction = require('../models/transaction');
const path = require('path');
const money = require('money');
const config = require('config');

exports.renderForm = require('./renderForm');

// TX gets this status when created
exports.createTransaction = function*(order, requestBody) {

  var currency = requestBody.interkassaCurrency;

  if (!~['UAH', 'RUB'].indexOf(currency)) {
    throw(new Error("Unsupported currency:" + currency));
  }

  var transaction = new Transaction({
    order:         order._id,
    amount:        order.convertAmount(currency),
    status:        Transaction.STATUS_PENDING,
    currency:      currency,
    paymentMethod: path.basename(__dirname)
  });

  yield transaction.persist();

  return transaction;
};


exports.info = {
  title:    "Интеркасса",
  name:     path.basename(__dirname),
  hasIcon:  false,
  subtitle: "дополнительные методы оплаты"
};

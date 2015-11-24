'use strict';

let _ = require('lodash');
let money = require('money');
let OpenExchangeUpdater = require('./openExchangeUpdater');
let PrivatBankUpdater = require('./privatBankUpdater');

module.exports = function*() {
  let privatBankUpdater = new PrivatBankUpdater();
  let openExchangeUpdater = new OpenExchangeUpdater();

  let privatBankCurrencyRate = yield* privatBankUpdater.update();
  if (!privatBankCurrencyRate) {
    throw new Error("Failed to fetch privatRate");
  }
  let privatRates = _.indexBy(privatBankCurrencyRate.rates, 'ccy');
  var openExchangeRate = yield* openExchangeUpdater.update();

  if (!openExchangeRate) {
    throw new Error("Failed to fetch openExchangeRate");
  }


  money.rates = openExchangeRate.rates;
  money.base = openExchangeRate.base;

  // more correct rate, closer to UA exchange offices
  money.rates.UAH = privatRates.USD.buy * 0.2 + privatRates.USD.sale * 0.8;

};

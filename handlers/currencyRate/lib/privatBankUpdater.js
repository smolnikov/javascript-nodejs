'use strict';
var request = require('co-request');
var PrivatBankCurrencyRate = require('../models/privatBankCurrencyRate');

var log = require('log')();

var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

// [{"ccy":"RUR","base_ccy":"UAH","buy":"0.37500","sale":"0.39000"},{"ccy":"EUR","base_ccy":"UAH","buy":"26.00000","sale":"27.00000"},{"ccy":"USD","base_ccy":"UAH","buy":"24.20000","sale":"25.20000"}]
module.exports = class {
  *update() {

    var rate = yield PrivatBankCurrencyRate.findOne({
      created: {
        $gt: new Date(new Date() - 86400*1000/2)
      }
    }).sort({created: -1});

    if (rate) {
      return rate; // don't update too often in dev mode
    }

    var result;

    try {
      result = yield request({
        url:  url,
        json: true
      });
      log.debug(url);
    } catch(e) {
      // failed to request (remote server unavailable?)
      log.error(e);
      return;
    }

    if (!result.body) {
      log.error(result);
      return;
    }

    if (!Array.isArray(result.body)) {
      // something's wrong
      log.error(result);
      return;
    }

    let rateData = {};
    rateData.rates = result.body;
    rateData.created = new Date();

    //console.log(rateData);
    var currencyRate = yield PrivatBankCurrencyRate.create(rateData);

    return currencyRate;
  }
};

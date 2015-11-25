'use strict';
var request = require('co-request');
var OpenExchangeCurrencyRate = require('../models/openExchangeCurrencyRate');

var config = require('config');
var log = require('log')();

var url = 'http://openexchangerates.org/api/latest.json?app_id=' + config.openexchangerates.appId;

module.exports = class {
  *update() {
    var result;


    var rate = yield OpenExchangeCurrencyRate.findOne({
      created: {
        $gt: new Date(new Date() - 86400*1000/2)
      }
    }).sort({created: -1});

    if (rate) {
      return rate; // don't update too often in dev mode
    }


    //console.log("OEX request");
    try {
      result = yield request({
        url:  url,
        json: true
      });
      log.debug(url);
    } catch(e) {
      //console.log("OEX fail", e);

      // failed to request (remote server unavailable?)
      log.error("openExchange request failed", e);
      return;
    }

    if (!result.body) {
      //console.log("openExchange result empty");
      log.error("openExchange result empty");
      return;
    }

    if (!result.body.rates.RUB) {
      // something's wrong
      //console.log("openExchange no RUB rate", result);
      log.error("openExchange no RUB rate", result);
      return;
    }

    let rateData = Object.assign({}, result.body);
    rateData.created = new Date();

    var currencyRate = yield OpenExchangeCurrencyRate.findOneAndUpdate(
      { timestamp: result.body.timestamp },
      rateData,
      {upsert: true, new: true}
    );
    //console.log("currencyRate", currencyRate);

    return currencyRate;
  }
};

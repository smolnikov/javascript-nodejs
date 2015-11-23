
// - Initialize money module for sync conversion
// - Load rates from DB on boot
// - provide /currency-rate/update url to update money rates

var currencyRate;

var request = require('co-request');

// all supported currencies
// http://openexchangerates.org/api/currencies.json?app_id=APP_ID
var currencies = require('./currencies');

var update = require('./lib/update');


exports.boot = function*() {
  yield* update();

};


var mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {
  app.use(mountHandlerMiddleware('/currency-rate', __dirname));
};


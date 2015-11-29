
var mountHandlerMiddleware = require('lib/mountHandlerMiddleware');

exports.init = function(app) {
  app.use(mountHandlerMiddleware('/donate', __dirname));

  // anon can do anything here
  app.csrfChecker.ignore.add('/donate/:any*');

};

exports.onPaid = require('./lib/onPaid');
exports.cancelIfPendingTooLong = require('./lib/cancelIfPendingTooLong');
exports.createOrderFromTemplate = require('./lib/createOrderFromTemplate');

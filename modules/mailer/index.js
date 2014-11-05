var co = require('co');
var config = require('config');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var stubTransport = require('nodemailer-stub-transport');
var log = require('log')();
var thunkify = require('thunkify');

// Transport:
// --> In test env stub, otherwise SES
// --> From header by default from config
// --> sendMail logs

var transport;

if (process.env.NODE_ENV == 'test') {
  transport = nodemailer.createTransport(stubTransport());
} else {
  transport = nodemailer.createTransport(ses({
    accessKeyId:     config.mailer.ses.accessKeyId,
    secretAccessKey: config.mailer.ses.secretAccessKey,
    rateLimit:       1 // do not send more than 1 message in a second
  }));
}

// add default "From"
// triggers before email is sent
transport.use('compile', function(mail, callback){
  if (!mail.data.from) {
    mail.data.from = 'default';
  }
  var sender = config.mailer.senders[mail.data.from];
  log.debug(sender);
  mail.data.from = sender.email;
//  mail.data.html = mail.data.html.replace('</body></html>', sender.signature + '</body></html>');

  callback();
});

// log result
var sendMail = transport.sendMail;
transport.sendMail = thunkify(function(data, callback) {
  sendMail.call(this, data, function(err, info) {
    if (err) {
      log.error(err);
    } else {
      log.debug(info.envelope, data.html);
    }
    callback(err, info);
  });

});

module.exports = transport;
module.exports.inlineCss = require('./inlineCss');

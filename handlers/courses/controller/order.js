var _ = require('lodash');
var Order = require('payments').Order;
var Transaction = require('payments').Transaction;
var User = require('users').User;
var CourseParticipant = require('../models/courseParticipant');

exports.get = function*() {

  yield* this.loadOrder();

  if (!this.order) {
    this.throw(404, 'Нет такого заказа.');
  }

  var transactions = yield Transaction.find({order: this.order._id}).sort({modified: -1});
  this.locals.order = this.order;
  this.locals.transactions = transactions;

  this.body = this.render('admin/order');
};


exports.post = function*() {

  yield* this.loadOrder();

  if (!this.order) {
    this.throw(404, 'Нет такого заказа.');
  }


  this.order.amount = this.request.body.amount;


  if (this.order.status == Order.STATUS_CANCEL) {

    if (this.request.body.action == 'pending') {
      this.order.status = Order.STATUS_PENDING;
    } else if (this.request.body.action == 'paid') {
      yield* this.order.onPaid();

      this.order.status = Order.STATUS_SUCCESS;
    }
  } else if (this.order.status == Order.STATUS_PENDING) {
    if (this.request.body.action == 'paid') {
      yield* this.order.onPaid();

      this.order.status = Order.STATUS_SUCCESS;
    }
  } else if (this.order.status == Order.STATUS_SUCCESS) {
    if (this.request.body.action == 'cancel') {
      this.order.status = Order.STATUS_CANCEL;

      var userIdsByEmails = yield User.find({
        email: {
          $in: this.order.data.emails
        }
      }, {id: 1});

      userIdsByEmails = userIdsByEmails.map(user => user._id);

      var participants = yield CourseParticipant.find({
        group: this.order.data.group,
        user: {
          $in: userIdsByEmails
        },
        isActive: true
      });

      this.log.debug("cancel participants", participants);

      for (var i = 0; i < participants.length; i++) {
        var participant = participants[i];
        yield participant.persist({
          isActive: false
        });
      }

    }
  }

  yield this.order.persist();

  this.redirect(this.originalUrl);

};


'use strict';

var _ = require('lodash');
var Order = require('payments').Order;
var Transaction = require('payments').Transaction;
var User = require('users').User;
var CourseParticipant = require('../models/courseParticipant');
var CourseGroup = require('../models/courseGroup');

exports.get = function*() {

  yield* loadOrderAdmin.call(this);

  if (!this.order) {
    this.throw(404, 'Нет такого заказа.');
  }

  var transactions;

  /*
   transactions = yield Transaction.find({
   order: this.order._id
   }).sort({
   modified: -1
   });
   */
  // do we need to show all TX ?
  transactions = yield Transaction.find({
    order:  this.order._id,
    status: {$in: [Transaction.STATUS_PENDING, Transaction.STATUS_SUCCESS]}
  });

  this.locals.order = this.order;
  this.locals.transactions = transactions;

  this.body = this.render('admin/order');
};

function* loadOrderAdmin() {

  yield* this.loadOrder({
    skipPermissionCheck: true
  });

  if (!this.order) {
    this.throw(404, 'Нет такого заказа.');
  }

  if (!this.order.data.group) {
    this.throw(404, 'Нет такого заказа на курс');
  }

  let group = yield CourseGroup.findById(this.order.data.group);

  if (!this.isAdmin && !this.user._id.equals(group.teacher)) {
    this.throw(403, 'Недостаточно прав');
  }

}

exports.post = function*() {

  yield* loadOrderAdmin.call(this);

  this.order.amount = this.request.body.amount;
  this.order.currency = this.request.body.currency;

  let order = this.order;

  function* paidTx() {
    let transaction = yield Transaction.findOne({
      order:  order._id,
      status: Transaction.STATUS_PENDING
    });
    yield* order.onPaid(transaction);

    order.status = Order.STATUS_SUCCESS;
  }

  function* paidDirect() {
    let transaction = yield Transaction.findOne({
      order:  order._id,
      status: Transaction.STATUS_PENDING
    });

    if (transaction) {
      yield transaction.persist({
        status: Transaction.STATUS_FAIL
      });
    }

    yield Transaction.create({
      order:         order._id,
      amount:        order.amount,
      status:        Transaction.STATUS_SUCCESS,
      currency:      order.currency,
      paymentMethod: 'direct'
    });

    yield* order.onPaid();

    order.status = Order.STATUS_SUCCESS;
  }

  if (this.order.status == Order.STATUS_CANCEL) {

    if (this.request.body.action == 'pending') {
      this.order.status = Order.STATUS_PENDING;
    } else if (this.request.body.action == 'paid-tx') {
      yield* paidTx();
    } else if (this.request.body.action == 'paid-direct') {
      yield* paidDirect();
    }

  } else if (this.order.status == Order.STATUS_PENDING) {
    if (this.request.body.action == 'paid-tx') {
      yield* paidTx();
    } else if (this.request.body.action == 'paid-direct') {
      yield* paidDirect();
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
        group:    this.order.data.group,
        user:     {
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

      let transaction = yield Transaction.findOne({
        order:  order._id,
        status: Transaction.STATUS_SUCCESS
      });

      if (transaction) {

        yield transaction.log('возврат');

        yield transaction.persist({
          status: Transaction.STATUS_REFUND
        });
      }

    }
  }

  yield this.order.persist();

  this.redirect(this.originalUrl);

};


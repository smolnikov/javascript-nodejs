var xhr = require('client/xhr');
var notification = require('client/notification');
var delegate = require('client/delegate');
var FormPayment = require('payments/common/client').FormPayment;

class OrderForm {

  constructor(options) {
    this.elem = options.elem;

    this.product = 'donate';



    this.elem.addEventListener('submit', (e) => this.onSubmit(e));

    this.delegate('[data-order-payment-change]', 'click', function(e) {
      e.preventDefault();
      this.elem.querySelector('[data-order-form-step-payment]').style.display = 'block';
      this.elem.querySelector('[data-order-form-step-confirm]').style.display = 'none';
      this.elem.querySelector('[data-order-form-step-receipt]').style.display = 'none';
    });

    this.delegate('[data-order-currency]', 'change', function(event) {
      var newCurrency = event.delegateTarget.value;


    });
  }


  onSubmit(event) {
    event.preventDefault();
    new FormPayment(this, this.elem).submit();
  }


  // return orderData or nothing if validation failed
  getOrderData() {
    var orderData = {    };

    if (window.orderNumber) {
      orderData.orderNumber = window.orderNumber;
    } else {
      orderData.orderTemplate = 'webpack';
      orderData.amount = this.elem.amount.value;
      orderData.currency = this.elem.currency.value;
    }

    if (this.elem.elements.email) {
      if (!this.elem.elements.email.value) {
        window.ga('send', 'event', 'payment', 'checkout-no-email', 'donate');
        window.metrika.reachGoal('CHECKOUT-NO-EMAIL', {product: 'donate'});
        new notification.Error("Введите email.");
        this.elem.elements.email.scrollIntoView();
        setTimeout(function() {
          window.scrollBy(0, -200);
        }, 0);
        this.elem.elements.email.focus();
        return;
      } else {
        orderData.email = this.elem.elements.email.value;
      }
    }

    return orderData;
  }

}


delegate.delegateMixin(OrderForm.prototype);

module.exports = OrderForm;

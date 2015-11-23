var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// the schema follows http://openexchangerates.org/api/latest.json response
var schema = new Schema({

  rates: {
    type: [{
      ccy:      String,
      base_ccy: String,
      buy:      Number,
      sale:     Number
    }],
    required: true
  },

  created: {
    type:    Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PrivatBankCurrencyRate', schema);


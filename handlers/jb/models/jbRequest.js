const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const countries = require('countries');

const schema = new Schema({
  product: {
    type: String,
    enum: {
      values:  ["WebStorm", "PhpStorm", "RubyMine", "IntelliJ IDEA", "ReSharper", "PyCharm", "AppCode", "CLion"],
      message: 'Такой продукт недоступен'
    },
    required: 'Укажите продукт'
  },

  country:    {
    type: String,
    enum: Object.keys(countries.all),
    required: "Страна не указана."
  },

  email: {
    type: String,
    required: 'Укажите email'
  },
  name: {
    type: String,
    validate: [
      {
        validator: function(value) {
          return /^\s*[a-z]+\s*[a-z]+\s*$/i.test(value);
        },
        msg: 'Имя и фамилия должны быть на английском, например: ILYA KANTOR'
      }
    ],
    required: 'Укажите имя и фамилию'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JbRequest', schema);

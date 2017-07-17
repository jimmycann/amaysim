'use strict';

const filesystem = require('./filesystem');

module.exports = {
  findAll: function () {
    return filesystem.readFs('products');
  },

  findOne: function (productCode) {
    return filesystem.readFs('products')
      .then(products => products.filter(p => p.productCode === productCode));
  },

  reset: function () {
    return filesystem.resetFs('products');
  }
};

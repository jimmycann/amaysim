'use strict';

const filesystem = require('./filesystem');
const Products = require('./products');

module.exports = {
  addItem: function (productCode, promoCode) {
    if (!productCode) {
      throw new Error(`The productCode was not specified`);
    }

    return Products.findOne(productCode)
      .then(product => {
        if (!Array.isArray(product) || product.length === 0) {
          throw new Error(`The productCode \`${productCode}\` does not exist`);
        }

        return filesystem.writeFs(product[0], 'cart')
          .then(() => product[0]);
      });
  },

  findAll: function () {
    return filesystem.readFs('cart');
  },

  reset: function () {
    return filesystem.resetFs('cart');
  }
};

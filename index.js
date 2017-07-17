'use strict';

const Products = require('./services/products');
const Promotions = require('./services/promotions');
const PromoCodes = require('./services/promoCodes');
const Cart = require('./services/cart');
const Checkout = require('./services/checkout');
const res = require('./services/responses');

module.exports = {
  addItem: function () {
    return PromoCodes.addCode(process.argv[2])
      .then(() => Cart.addItem(process.argv[1]))
      .then(res.ok)
      .catch(res.handleError);
  },

  total: function () {
    return Checkout.checkTotal()
      .then(res.ok)
      .catch(res.handleError);
  },

  showProducts: function () {
    return Products.findAll()
      .then(res.ok)
      .catch(res.handleError);
  },

  showPromotions: function () {
    return Promotions.findAll()
      .then(res.ok)
      .catch(res.handleError);
  },

  showCart: function () {
    return Cart.findAll()
      .then(res.ok)
      .catch(res.handleError);
  },

  showPromoCodes: function () {
    return PromoCodes.findAll()
      .then(res.ok)
      .catch(res.handleError);
  },

  resetProducts: function () {
    return Products.reset()
      .then(() => res.ok('Products Reset'))
      .catch(res.handleError);
  },

  resetPromotions: function () {
    return Promotions.reset()
      .then(() => res.ok('Promotions Reset'))
      .catch(res.handleError);
  },

  resetCart: function () {
    return Cart.reset()
      .then(() => res.ok('Cart Reset'))
      .catch(res.handleError);
  },

  resetPromoCodes: function () {
    return PromoCodes.reset()
      .then(() => res.ok('Promo Codes Reset'))
      .catch(res.handleError);
  },

  resetAll: function () {
    return Promotions.reset()
      .then(() => Products.reset())
      .then(() => Cart.reset())
      .then(() => PromoCodes.reset())
      .then(() => res.ok('Reset Complete'))
      .catch(res.handleError);
  }
};

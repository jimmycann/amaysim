'use strict';

const Cart = require('./cart');
const Promotions = require('./promotions');

module.exports = {
  checkTotal: function () {
    return Cart.findAll()
      .then(cart => this.checkPromotions(cart)
        .then(promotions => this.applyPromotions(promotions, cart)))
      // .then(cart => cart.reduce((acc, curr) => (acc + curr.price), 0));
  },

  applyPromotions: function () {

  },

  checkPromotions: function (cart) {
    return Promotions.findAll()
      .then(promos => Promise.all([
        this.validBundle(promos, cart),
        this.validBulkDiscount(promos, cart),
        this.validBonus(promos, cart)
      ]));
  },

  validBundle: function (promos, cart) {
    return promos.filter(p => p.type === 'bundle')
      .map(p => {

      });
  },

  validBulkDiscount: function (promos, cart) {
    return promos.filter(p => p.type === 'bulkDiscount')
      .map(p => {

      });
  },

  validBonus: function (promos, cart) {
    return promos.filter(p => p.type === 'bonus')
      .map(p => {

      });
  }
};

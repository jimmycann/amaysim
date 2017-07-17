'use strict';

const filesystem = require('./filesystem');

module.exports = {
  addCode: function (promoCode) {
    if (!promoCode) {
      return Promise.resolve();
    }

    return this.findOne(promoCode, 'promo_codes')
      .then(codes => {
        if (Array.isArray(codes) && codes.length > 0) {
          throw new Error(`The promoCode \`${promoCode}\` has already been applied`);
        }

        return this.findPromotion(promoCode, 'promotions');
      })
      .then(promo => {
        if (!Array.isArray(promo) || promo.length === 0) {
          throw new Error(`The promoCode \`${promoCode}\` does not exist`);
        }

        return filesystem.writeFs(promo[0], 'promo_codes')
          .then(() => promo[0]);
      });
  },

  findOne: function (promoCode, type) {
    return filesystem.readFs(type)
      .then(result => result.filter(r => r.promoCode === promoCode));
  },

  findAll: function () {
    return filesystem.readFs('promo_codes');
  },

  reset: function () {
    return filesystem.resetFs('promo_codes');
  }
};

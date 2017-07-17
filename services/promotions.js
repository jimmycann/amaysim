'use strict';

const filesystem = require('./filesystem');

module.exports = {
  checkValidity: function (cart) {
    return this.findAll()
      .then(promotions => )
  },

  reset: function () {
    return filesystem.resetFs('promotions');
  },

  findAll: function () {
    return filesystem.readFs('promotions');
  }
};

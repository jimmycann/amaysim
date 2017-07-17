'use strict';

module.exports = {
  ok: function (result) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  },

  handleError: function (err) {
    console.error(err);
    process.exit(1);
  }
};

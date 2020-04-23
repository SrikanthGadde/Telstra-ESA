//'use strict';
module.exports = function(app) {
  var cart = require('../controllers/Controller');

  // Cart Route
  app.route('/rest/v1/users/:id/cart')
  .get(cart.retrieve_cart)
  .put(cart.update_cartitem);
};

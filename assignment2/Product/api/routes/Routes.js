//'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/Controller');

  // todoList Routes
  app.route('/rest/v1/products')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
};
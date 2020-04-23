//'use strict';


var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_tasks = function(req, res) {
  Product.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Product(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
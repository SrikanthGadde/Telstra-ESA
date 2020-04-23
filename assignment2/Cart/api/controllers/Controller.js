//'use strict';

const request = require('request');

var mongoose = require('mongoose'), 
  Cart = mongoose.model('Carts');

exports.retrieve_cart = function(req, res) {
  Cart.findOne({uuid: req.params.id}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_cartitem = function(req, res) {
  var x = 1;
    request.get('http://localhost:3000/rest/v1/products',  {json: true}, function(error, response, body){
      
      for(var i = 0; i < body.length; i++){
        if (body[i].productId == req.body.productId){
          if(body[i].availableQuantity >= req.body.quantity){
            //i = body.length;
            x = 0;
            //body = {uuid: req.params.id, cart:[{productId: body[i].productId, productName: body[i].productName, productModel: body[i].productModel, quantity: req.body.quantity, amount: (req.body.quantity)*(body[i].price)}]}
            cartitem = {productId: body[i].productId, productName: body[i].productName, productModel: body[i].productModel, quantity: req.body.quantity, amount: (req.body.quantity)*(body[i].price)}
            var price = body[i].price;
            Cart.findOne({uuid: req.params.id, cart: {$elemMatch: { productId: req.body.productId}}}, function(err, obj){
              if (err)
                res.send(err);
              if(obj){
                console.log("DUPLICATE");
                Cart.findOneAndUpdate({uuid: req.params.id, cart: {$elemMatch: { productId: req.body.productId}}}, { $set: {"cart.$.quantity": req.body.quantity, "cart.$.amount": (req.body.quantity)*(price)}}, {new: true}, function(err, task) {
                  if (err)
                    res.send(err);
                  res.json(task);
                });
              
              }
              else{
                console.log("NEW");
                Cart.findOneAndUpdate({uuid: req.params.id}, {$push: {cart: cartitem}}, {new: true}, function(err, task) {
                  if (err)
                    res.send(err);
                  res.json(task);
                });
              
              }
            });
          
          }

        }
      }

      if(x == 1){
        res.json(null);
      }

    });

};
//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var UserSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Users', UserSchema)
*/
var CartSchema = new Schema({

    uuid: String,
    cart: [{
    productId: String,
    productName: String,
    productModel: String,
    quantity: Number,
    amount: Number}]
})

module.exports = mongoose.model('Carts', CartSchema)
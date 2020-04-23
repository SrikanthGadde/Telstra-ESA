//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    productId:  String, // String is shorthand for {type: String}
    category: String,
    productName:   String,
    productModel:   String,
    price:   Number,
    availableQuantity: Number
});

module.exports = mongoose.model('Products', ProductSchema);

var UserSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Users', UserSchema)

var CartSchema = new Schema({
    productId: String,
    productName: String,
    productmodel: String,
    quantity: Number,
    amount: Number
})

module.exports = mongoose.model('Cart', CartSchema)
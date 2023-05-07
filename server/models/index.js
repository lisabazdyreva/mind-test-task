const Cart = require("./cart.model");
const CartItem = require("./cart-item.model");
const Product = require("./product.model");
const Order = require("./order.model");

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

Order.belongsTo(Cart);
Cart.hasOne(Order);

module.exports = { Cart, CartItem, Product, Order };

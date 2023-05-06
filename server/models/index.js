const Cart = require("./cart.model");
const CartItem = require("./cart-item.model");
const Product = require("./product.model");
const Order = require("./order.model");

Order.hasOne(Cart);
Cart.belongsTo(Order);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

module.exports = { Cart, CartItem, Product, Order };

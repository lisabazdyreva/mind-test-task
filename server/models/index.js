const Cart = require("./cart.model");
const CartItem = require("./cart-item.model");
const Product = require("./product.model");
const Order = require("./order.model");
const User = require("./user.model");

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

Order.belongsTo(Cart);
Cart.hasOne(Order);

User.belongsTo(Cart);

module.exports = { Cart, CartItem, Product, Order, User };

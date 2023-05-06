const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const CartItem = sequelize.define("cart_item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

module.exports = CartItem;

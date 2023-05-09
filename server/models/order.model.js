const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_chat_id: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;

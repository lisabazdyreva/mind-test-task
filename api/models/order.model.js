const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+79260589068",
  },
  customer_chat_id: {
    type: DataTypes.STRING, // TODO попробовать реализовать получение всех заказов
  },
});

module.exports = Order;

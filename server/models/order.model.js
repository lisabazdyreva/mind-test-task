const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+79260589068",
  },
});

module.exports = Order;

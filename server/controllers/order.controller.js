const { Order } = require("../models/index");
const bot = require("../tg-bot/bot");

class OrderController {
  async getAllOrders(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async getCustomerOrders(req, res) {
    const { customer_telephone } = req.body;
    const orders = await Order.findAll({ where: { customer_telephone } });
    return res.json(orders);
  }

  async postOrder(req, res) {
    const { cartId, customer_telephone, sum } = req.body;

    const order = await Order.create({ cartId, customer_telephone });

    await bot.sendOrder({
      id: order.id,
      sum,
    });

    return res.json(order);
  }
}

module.exports = new OrderController();

const { Order } = require("../models/index");
const bot = require("../tg-bot/bot");
const ApiError = require("../error/ApiError");

class OrderController {
  async getAllOrders(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  // async getCustomerOrders(req, res) {
  //   const { customer_telephone } = req.body;
  //   const orders = await Order.findAll({ where: { customer_telephone } });
  //   return res.json(orders);
  // } TODO для бота

  async postOrder(req, res, next) {
    try {
      const { cartId, customer_telephone, sum } = req.body;

      const customer_chat_id = process.env.CHAT_ID;

      const order = await Order.create({
        cartId,
        customer_telephone,
        customer_chat_id,
      });

      await bot.sendOrder({
        id: order.id,
        sum,
      });

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message)); //TODO доделать
    }
  }
}

module.exports = new OrderController();

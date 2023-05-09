const { Order, User, Cart } = require("../models");
const bot = require("../tg-bot/bot");
const ApiError = require("../error/ApiError");

class OrderController {
  async getAllOrders(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async postOrder(req, res, next) {
    try {
      const { customer_telephone, sum, userId } = req.body;

      const user = await User.findOne({ where: { client_id: userId } });

      if (!user) {
        next(ApiError.paramsBadRequest("do not change your user id, please"));
      }
      const cart = await Cart.findOne({ where: { id: user.cartId } });

      const customer_chat_id = process.env.CHAT_ID;

      const order = await Order.create({
        cartId: cart.id,
        customer_telephone,
        customer_chat_id,
      });

      await bot.sendOrder({
        id: order.id,
        sum,
      });

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();

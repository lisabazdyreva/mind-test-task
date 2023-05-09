const { Order, User, Cart } = require("../models");
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

      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message)); //TODO доделать
    }
  }
}

module.exports = new OrderController();

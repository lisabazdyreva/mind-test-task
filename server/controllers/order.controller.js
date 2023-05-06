const { Order } = require("../models/index");

class OrderController {
  async getAllOrders(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async postOrder(req, res) {
    const { cartId, customer_telephone } = req.body;

    const order = await Order.create({ cartId, customer_telephone });
    return res.json(order);
  }
}

module.exports = new OrderController();

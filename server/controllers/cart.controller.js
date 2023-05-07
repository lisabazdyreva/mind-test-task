const { Cart } = require("../models/");
const { CartItem, Order, Product } = require("../models");

class CartController {
  async getCart(req, res) {
    const { userId } = req.query;
    const cartItemsInCart = await CartItem.findAll({
      where: { cartId: userId },
      include: [Product],
    });

    return res.json(cartItemsInCart);
  }

  async removeCart(req, res) {
    const { cartId } = req.body;
    const removedCartItem = await CartItem.destroy({
      where: { cartId },
    });
    return res.json(removedCartItem);
  }

  async postCart(req, res) {
    const { customer_telephone } = req.body;

    const order = await Order.create({ customer_telephone });
  }
}

module.exports = new CartController();

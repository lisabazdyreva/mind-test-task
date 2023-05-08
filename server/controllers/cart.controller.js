const { CartItem, Order, Product } = require("../models");
const ApiError = require("../error/ApiError");

class CartController {
  async getCart(req, res) {
    const { userId } = req.query;

    const cartItemsInCart = await CartItem.findAll({
      where: { cartId: userId },
      include: [Product],
    });
    return res.json(cartItemsInCart);
  }

  async removeCart(req, res, next) {
    try {
      const { cartId } = req.body;
      const removedCartItem = await CartItem.destroy({
        where: { cartId: cartId },
      });

      if (removedCartItem > 0) {
        return res.json(removedCartItem);
      } else {
        return res.status(500).json({ message: "remove error" });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartController();

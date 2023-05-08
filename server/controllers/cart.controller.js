const { CartItem, User, Product, Cart } = require("../models");
const ApiError = require("../error/ApiError");

class CartController {
  async getCart(req, res, next) {
    try {
      const { userId } = req.query;

      const user = await User.findOne({ where: { client_id: userId } });

      if (user) {
        const cartItemsInCart = await CartItem.findAll({
          where: { cartId: user.cartId },
          include: [Product],
        });
        return res.json(cartItemsInCart);
      }
      // else {
      //   return res
      //     .status(400)
      //     .json({ message: "do not change your user id, please" });
      // }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeCart(req, res, next) {
    try {
      const { userId } = req.body;

      const user = await User.findOne({ where: { client_id: userId } });

      const removedCartItem = await CartItem.destroy({
        where: { cartId: user.cartId },
      });

      if (removedCartItem > 0) {
        await Cart.destroy({ where: { id: user.cartId } });
        return res.json(removedCartItem);
      } else {
        return res.status(500).json({ message: "remove error" });
      }
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartController();

const { CartItem, User, Product, Cart } = require("../models");
const ApiError = require("../error/ApiError");

class CartController {
  async getCart(req, res, next) {
    try {
      const { userId } = req.query;
      const user = await User.findOne({ where: { client_id: userId } });

      if (!user) {
        next(
          ApiError.paramsBadRequest("do not change your user id, please!!!")
        );
      }

      const cartItemsInCart = await CartItem.findAll({
        where: { cartId: user.cartId },
        order: [["id", "ASC"]],
        include: [Product],
      });

      return res.json(cartItemsInCart);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeCart(req, res, next) {
    try {
      const { userId } = req.body;

      const user = await User.findOne({ where: { client_id: userId } });

      if (!user) {
        next(ApiError.paramsBadRequest("do not change your user id, please"));
      }

      const removedCartItem = await CartItem.destroy({
        where: { cartId: user.cartId },
      });

      if (removedCartItem > 0) {
        await Cart.destroy({ where: { id: user.cartId } });
        return res.json(removedCartItem);
      } else {
        next(ApiError.internal("remove error"));
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartController();

const { Cart, CartItem, User } = require("../models");
const ApiError = require("../error/ApiError");

class CartItemController {
  async addToCart(req, res, next) {
    try {
      const { productId, quantity, userId } = req.body;

      const user = await User.findOne({
        where: { client_id: userId },
      });

      if (!user) {
        next(ApiError.paramsBadRequest("do not change your user id, please"));
      }

      const product = await CartItem.create({
        productId,
        quantity,
        cartId: user.cartId,
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { userId, cartItemId } = req.body;
      const user = await User.findOne({ where: { client_id: userId } });

      if (!user) {
        next(ApiError.paramsBadRequest("do not change your user id, please"));
      }

      try {
        const removedCartItem = await CartItem.destroy({
          where: { id: cartItemId },
        });

        if (removedCartItem > 0) {
          return res.json(removedCartItem);
        } else {
          next(ApiError.internal("can not remove mow"));
        }
      } catch (e) {
        next(ApiError.badRequest(e.message, "Do not change your id")); // todo too much?
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateProductInCart(req, res, next) {
    try {
      const { userId, cartItemId, quantity } = req.body;

      const user = await User.findOne({ where: { client_id: userId } });

      if (!user) {
        next(ApiError.paramsBadRequest("do not change your user id, please"));
      }

      const cartId = await user.cartId;

      const cartItem = await CartItem.findOne({
        where: { cartId, id: cartItemId },
      });

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();

        return res.json(cartItem);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartItemController();

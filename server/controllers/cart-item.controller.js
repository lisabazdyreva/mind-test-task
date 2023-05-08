const { Cart, CartItem } = require("../models");
const ApiError = require("../error/ApiError");

class CartItemController {
  async addToCart(req, res, next) {
    try {
      let cartId;
      const { productId, quantity, userCartId } = req.body;

      if (!userCartId) {
        const cart = await Cart.create();
        cartId = cart.id;
      }

      // check is user id is correct
      if (userCartId) {
        const currentCart = await Cart.findOne({ where: { id: userCartId } });
        cartId = currentCart.id;
      }

      const product = await CartItem.create({
        productId,
        quantity,
        cartId,
      });

      return res.json(product);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const { userCartId } = req.body;
      const removedCartItem = await CartItem.destroy({
        where: { id: userCartId },
      });

      if (removedCartItem > 0) {
        return res.json(removedCartItem);
      } else {
        return res.status(500).json({ message: "Cannot delete now" });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateProductInCart(req, res, next) {
    try {
      const { cartItemId, quantity } = req.body;

      const cartItem = await CartItem.findOne({ where: { id: cartItemId } });

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();

        return res.json(cartItem);
      }

      return res.status(500).json({ message: "Cannot find item in cart" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CartItemController();

const { Cart, CartItem } = require("../models");

class CartItemController {
  async addToCart(req, res) {
    let cartId;
    const { productId, quantity, userCartId } = req.body;

    if (!userCartId) {
      const cart = await Cart.create();
      cartId = cart.id;
    } else {
      const currentCart = await Cart.findOne({
        where: { id: userCartId },
      });
      cartId = currentCart.id;
    }

    const foundProduct = await CartItem.findOne({
      where: { productId, cartId },
    });

    if (foundProduct) {
      foundProduct.quantity += quantity;
      await foundProduct.save();

      return res.json(foundProduct);
    } else {
      let product = await CartItem.create({
        productId,
        quantity,
        cartId,
      });

      return res.json(product);
    }
  }

  async removeFromCart(req, res) {
    const { cartItemId } = req.body;
    const removedCartItem = await CartItem.destroy({
      where: { id: cartItemId },
    });

    return res.json(removedCartItem);
  }

  async updateProductInCart(req, res) {
    const { id, quantity } = req.body;

    const cartItem = await CartItem.findOne({ where: { id } });

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.json(cartItem);
  }
}

module.exports = new CartItemController();

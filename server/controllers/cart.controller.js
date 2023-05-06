const { Cart } = require("../models/");
const { CartItem } = require("../models");

class CartController {
  async getCart(req, res) {
    const productsInCart = await CartItem.findAll();
    return res.json(productsInCart);
  }

  async addToCart(req, res) {
    let cartId;
    const { productId, quantity, userCartId } = req.body;

    if (!userCartId) {
      const cart = await Cart.create();
      cartId = cart.id;
    } else {
      cartId = userCartId;
    }

    const product = await CartItem.create({
      productId,
      cartId,
      quantity,
    });
    return res.json(product);
  }

  async removeFromCart(req, res) {
    const { cartId } = req.body;
    // await CartItem.destroy;

    await res.json({ message: "hi from cart" });
  }
}

module.exports = new CartController();

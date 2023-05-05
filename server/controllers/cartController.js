class CartController {
  async getCart(req, res) {
    res.json({ message: "cart" });
  }
}

module.exports = new CartController();

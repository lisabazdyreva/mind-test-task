class ProductController {
  async createProduct(req, res) {
    res.json({ message: "create product" });
  }

  async getProducts(req, res) {
    res.json({ message: "get products" });
  }
}

module.exports = new ProductController();

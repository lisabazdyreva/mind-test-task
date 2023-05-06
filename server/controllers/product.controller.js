const { Product } = require("../models/index");

class ProductController {
  async createProduct(req, res) {
    const { name, price, image } = req.body;
    const product = await Product.create({ name, price, image });

    return res.json(product);
  }

  async getProducts(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
}

module.exports = new ProductController();

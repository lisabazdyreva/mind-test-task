const { Product } = require("../models/index");
const ApiError = require("../error/ApiError");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, price, image } = req.body;

      const product = await Product.create({ name, price, image });
      return res.json(product);
    } catch (e) {
      if ("SequelizeUniqueConstraintError" === e.name) {
        // не уверена, что это правильный способ поймать ошибку уникального поля, но не нашла другой способ
        next(ApiError.badRequest(e.message, req.body.name));
      } else {
        next(ApiError.badRequest(e.message));
      }
    }
  }

  async getProducts(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  }
}

module.exports = new ProductController();

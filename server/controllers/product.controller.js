const { Product } = require("../models");
const ApiError = require("../error/ApiError");

const path = require("path");
const { v4: uuidv4 } = require("uuid");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, price } = req.body;
      const { image } = req.files;

      const id = uuidv4();
      const format = image.name.split(".").reverse()[0];
      let fileName = id + "." + format;

      image.mv(path.resolve(__dirname, "../", "static", fileName));

      const product = await Product.create({ name, price, image: fileName });
      return res.json(product);
    } catch (e) {
      if ("SequelizeUniqueConstraintError" === e.name) {
        next(ApiError.noUniqueValueRequest(req.body.name)); // не уверена, что это правильный способ поймать ошибку уникального поля, но не нашла другой способ
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

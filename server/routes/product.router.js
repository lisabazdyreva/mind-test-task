const Router = require("express");
const router = new Router();
const productController = require("../controllers/product.controller");

router.post("/create", productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;

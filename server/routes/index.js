const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cart.controller");

const cartRouter = require("./cart.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");

router.use("/cart", cartRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);

router.post("/", cartController.addToCart);
router.delete("/", cartController.removeFromCart);

module.exports = router;

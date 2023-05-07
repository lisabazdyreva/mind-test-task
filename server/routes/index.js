const Router = require("express");
const router = new Router();

const cartRouter = require("./cart.router");
const cartItemRouter = require("./cart-item.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");

router.use("/cart-item", cartItemRouter);
router.use("/cart", cartRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);

module.exports = router;

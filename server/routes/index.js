const Router = require("express");
const router = new Router();

const cartRouter = require("./cart.router");
const cartItemRouter = require("./cart-item.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const userRouter = require("./user.router");
const express = require("express");

router.use("/cart-item", cartItemRouter);
router.use("/cart", cartRouter);
router.use("/products", productRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

module.exports = router;

const Router = require("express");
const router = new Router();

const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");

router.use("", cartRouter);
router.use("", productRouter);

module.exports = router;

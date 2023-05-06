const Router = require("express");
const router = new Router();

const orderController = require("../controllers/order.controller");

router.get("/", orderController.getAllOrders);
router.post("/cart", orderController.postOrder);

module.exports = router;

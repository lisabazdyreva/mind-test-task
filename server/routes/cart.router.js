const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getCart);
module.exports = router;

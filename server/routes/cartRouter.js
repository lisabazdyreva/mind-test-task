const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cartController");

router.get("/cart", cartController.getCart);

module.exports = router;

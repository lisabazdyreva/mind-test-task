const Router = require("express");
const router = new Router();

const cartItemController = require("../controllers/cart-item.controller");

router.post("/", cartItemController.addToCart);
router.delete("/", cartItemController.removeFromCart);
router.patch("/", cartItemController.updateProductInCart);

module.exports = router;

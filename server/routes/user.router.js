const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.checkUser);
router.post("/", userController.createUser);
router.delete("/", userController.removeUser);

module.exports = router;

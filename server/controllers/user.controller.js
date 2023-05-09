const { User, Cart } = require("../models");
const ApiError = require("../error/ApiError");

// todo обработка ошибок

class UserController {
  async checkUser(req, res) {}

  async createUser(req, res, next) {
    try {
      const { userId } = req.body;

      const cart = await Cart.create();
      const user = await User.create({ client_id: userId, cartId: cart.id });

      res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeUser(req, res, next) {
    try {
      const { userId } = req.body;

      const user = await User.destroy({
        where: { client_id: userId },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: "do not change your user id, please" });
      }
      res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();

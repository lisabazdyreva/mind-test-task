const { User, Cart } = require("../models/index");
const ApiError = require("../error/ApiError");

// todo обработка ошибок

class UserController {
  async checkUser(req, res) {}

  async createUser(req, res, next) {
    const { userId } = req.body;

    const cart = await Cart.create();
    const user = await User.create({ client_id: userId, cartId: cart.id });

    res.json(user);
  }

  async removeUser(req, res) {
    const { userId } = req.body;

    const user = await User.destroy({
      where: { client_id: userId },
    });
    res.json(user);
  }
}

module.exports = new UserController();

const TelegramBot = require("node-telegram-bot-api");

const token = "5741442438:AAGA3Ubns644eq8y90ooyeNGCM9b8MO6Bdc";

const bot = new TelegramBot(token, { polling: true });

const chatId = "1267843017";

class Bot {
  async sendOrder({ id, sum }) {
    const message = `<b>Thank you for order in our online store.</b>\n\n Your order number is ${id}. Total sum of you parchase is ${sum}.`;
    await bot.sendMessage(chatId, message, { parse_mode: "html" });
  }
}

module.exports = new Bot();

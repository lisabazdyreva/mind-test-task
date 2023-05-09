const TelegramBot = require("node-telegram-bot-api");

const token = "5741442438:AAFI5sunnuulipxVZsYfVW41-_qSRveM3Kw";

class Bot {
  constructor() {
    this.bot = new TelegramBot(token, { polling: true });
    this.chatId = process.env.CHAT_ID;
  }

  getBot() {
    return this.bot;
  }

  getChatId() {
    return this.chatId;
  }

  setChatId(id) {
    this.chatId = id;
  }

  async sendOrder({ id, sum }) {
    const message = `<b>Thank you for order in our online store.</b>\n\n Your order number is ${id}. Total sum of you parchase is ${sum}.`;
    await this.bot.sendMessage(this.chatId, message, { parse_mode: "html" });
  }
}

module.exports = new Bot();

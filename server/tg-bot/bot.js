// const TelegramBot = require("node-telegram-bot-api");
// require("dotenv").config();
//
// class Bot {
//   constructor() {
//     this.bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
//     this.chatId = process.env.CHAT_ID;
//   }
//
//   async sendOrder({ id, sum }) {
//     const message = `<b>Thank you for order in our online store.</b>\n\n Your order number is ${id}. Total sum of you parchase is ${sum}.`;
//     await this.bot.sendMessage(this.chatId, message, { parse_mode: "html" });
//   }
// }
//
// module.exports = new Bot();

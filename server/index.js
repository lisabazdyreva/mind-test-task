require("dotenv").config();

const express = require("express");
const sequelize = require("./db");

const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const router = require("./routes/index");
const errorHandler = require("./middleware/error-handling.middleware");

const PORT = process.env.PORT || 5000;

const token = "5741442438:AAGA3Ubns644eq8y90ooyeNGCM9b8MO6Bdc";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Received your message");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

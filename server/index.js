require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");

const cors = require("cors");
const bot = require("./tg-bot/bot");

const router = require("./routes/index");
const errorHandler = require("./middleware/error-handling.middleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

app.use(fileUpload({}));

app.use("/api", router);

app.use(errorHandler);

// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//
//     // bot.getBot().on("message", async (msg) => {
//     //   bot.setChatId(msg.chat.id);
//     //
//     //   await bot.getBot().sendMessage(bot.getChatId(), "Hello!");
//     // });
//
//
//   } catch (e) {
//     console.log(e);
//   }
// };

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;
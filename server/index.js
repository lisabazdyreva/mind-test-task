const express = require("express");
const app = express();
const router = require("./routes/index.js");

app.use(express.json());
app.use("/", router);

// app.use(errorHandler);

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

app.listen(5000, () => console.log(`Server started on port ${5000}`));
module.exports = app;

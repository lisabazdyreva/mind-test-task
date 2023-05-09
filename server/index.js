const express = require("express");
const app = express();

app.use(express.json());
app.get("/product", (req, res) => {
  res.json({ message: "OKKKK" });
});

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

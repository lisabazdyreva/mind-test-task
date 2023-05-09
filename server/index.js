const express = require("express");
const cors = require("cors");

const router = require("./routes/index.js");

const app = express();
app.use(cors());

app.use(express.json());

app.use("", router);
// app.get("/product", (req, res) => {
//   res.json({ message: "OKKKK" });
// });

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

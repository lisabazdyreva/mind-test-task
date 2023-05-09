require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");

const cors = require("cors");
const bot = require("./tg-bot/bot");

const router = require("./routes");
const errorHandler = require("./middleware/error-handling.middleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

app.use(fileUpload({}));

app.use("/api", router);

app.get("/api", (req, res) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `/api/item/${randomId}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:itemId", (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // bot.getBot().on("message", async (msg) => {
    //   bot.setChatId(msg.chat.id);
    //
    //   await bot.getBot().sendMessage(bot.getChatId(), "Hello!");
    // });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

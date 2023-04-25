const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "64456b0fc0672743bbc89d9b",
  };

  next();
});
app.use(userRouter);
app.use(cardRouter);
app.use("*", (req, res) => res.status(404).send({ message: "Страница не найдена" }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

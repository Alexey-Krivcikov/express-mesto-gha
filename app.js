const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
const { validateCreateUser, validateLogin } = require("./middlewares/validation");

const { errorHandler } = require("./errors/errorHandler");
const NotFoundError = require("./errors/not-found-err");

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLogin, login);

app.use("*", () => {
  throw new NotFoundError("Некорректный путь или запрос.");
});
app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

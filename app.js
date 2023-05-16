const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const { errorHandler } = require("./errors/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const router = require("./routes/index");

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: "https://api.mesto.front.end.nomoredomains.monster",
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

const User = require("../models/user.js");

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => {
    res
      .status(200)
      .send({ data: users })
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error("Пользователь не найден");
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "Пользователь не найден") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if ((err.name = "ValidationError")) {
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new Error("Пользователь не найден");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      } else if (err.message === "Пользователь не найден") {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new Error("Пользователь не найден");
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      } else if (err.message === "Пользователь не найден") {
        res
          .status(404)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

const Card = require("../models/card.js");

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res
      .status(200)
      .send({ data: cards })
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner }).then((card) => {
    res
      .status(201)
      .send({ data: card })
      .catch((err) => {
        if (err.name === "ValidationError") {
          res
            .status(400)
            .send({
              message: "Переданы некорректные данные при создании карточки",
            });
        } else {
          res.status(500).send({ message: "Произошла ошибка" });
        }
      });
  });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .orFail(() => {
      throw new Error("Карточка не найдена");
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === "Карточка не найдена") {
        res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => {
      throw new Error("Карточка не найдена");
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "Карточка не найдена") {
        res.status(404).send({ message: "Карточка не найдена" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });
};

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      throw new Error("Карточка не найдена");
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "Карточка не найдена") {
        res.status(404).send({ message: "Карточка не найдена" });
      } else {
        res.status(500).send({ message: "Произошла ошибка" });
      }
    });

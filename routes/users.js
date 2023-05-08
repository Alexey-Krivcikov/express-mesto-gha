const userRouter = require("express").Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");
const { validateUserId, validateUpdateUserInfo, validateAvatar } = require("../middlewares/validation");

userRouter.get("/users", getUsers);
userRouter.get("/users/me", getCurrentUser);
userRouter.get("/users/:userId", validateUserId, getUser);
userRouter.patch("/users/me", validateUpdateUserInfo, updateUserInfo);
userRouter.patch("/users/me/avatar", validateAvatar, updateUserAvatar);

module.exports = userRouter;

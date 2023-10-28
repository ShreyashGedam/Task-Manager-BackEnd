const { Router } = require("express");
const { addUser, Login } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.route("").post(addUser);
userRouter.post("/login", Login);

module.exports = userRouter;

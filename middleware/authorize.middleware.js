const taskModel = require("../models/task.model");

const authorize = async (req, res, next) => {
  try {
    const task = await taskModel
      .findOne({ _id: req.params.id })
      .populate("userId", "-password");

    if (req.user._id.equals(task.userId._id) || req.user.role == "admin") {
      next();
    } else return res.status(402).send("Unauthorized");
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

module.exports = authorize;

const taskModel = require("../models/task.model");

const addTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) return res.status(400).send("All fileds are not present");

    var data = new taskModel({ task, userId: req.user._id });
    await data.save();
    data = await data.populate("userId", "-password");

    res.json(data);
  } catch (error) {
    res.send({
      message: "Task addition failed",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const data = await taskModel.find({}).populate("userId");
    res.status(200).send(data);
  } catch (error) {
    res.send({
      message: "Task fetching failed",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !req.body.task)
      return res.status(400).send("All fileds are not present");

    var task = await taskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!task) return res.status(400).send("No such task present");

    task = await task.populate("userId");

    res.status(200).send(task);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("All fileds are not present");

    var task = await taskModel.findByIdAndUpdate(
      id,
      { status: "complete" },
      {
        new: true,
      }
    );

    if (!task) return res.status(400).send("No such task present");

    task = await task.populate("userId");

    res.status(200).send(task);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findByIdAndDelete(id);

    if (!task) return res.status(400).send("No such task present");

    res.status(200).send({
      message: "Task deleted",
      task,
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
};

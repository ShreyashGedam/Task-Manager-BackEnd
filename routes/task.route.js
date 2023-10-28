const { Router } = require("express");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/task.controller");
const authenticate = require("../middleware/authenticate.midlleware");
const authorize = require("../middleware/authorize.middleware");

const taskRouter = Router();

taskRouter.route("").post(authenticate, addTask).get(authenticate, getTasks);

taskRouter
  .route("/:id")
  .patch(authenticate, authorize, updateTask)
  .delete(authenticate, authorize, deleteTask);

taskRouter.patch("/status/:id", authenticate, authorize, updateTaskStatus);

module.exports = taskRouter;

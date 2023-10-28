const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, default: "incomplete" },
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;

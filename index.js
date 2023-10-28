const express = require("express");
const connect = require("./config/db");
const userRouter = require("./routes/user.router");
const taskRouter = require("./routes/task.route");
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

const server = app.listen(PORT, async () => {
  try {
    await connect;
    console.log("Connection to db success");
  } catch (error) {
    console.log("DB connetion failed");
  }
  console.log("app is listening on the port");
});

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://frolicking-tulumba-96a3e4.netlify.app",
    ],
  },
});

io.on("connection", (socket) => {
  socket.on("task-connect", (userId) => {
    if (!userId) return;
    console.log("User connected: ", userId.name);
  });

  socket.on("add-task", (task) => {
    socket.broadcast.emit("new-task", task);
  });

  socket.on("complete-task", (arr, temp) => {
    socket.broadcast.emit("completeTask", arr, temp);
  });

  socket.on("edit-task", (arr) => {
    socket.broadcast.emit("edit-completed", arr);
  });

  socket.on("delete-task", (arr) => {
    socket.broadcast.emit("delete-completed", arr);
  });
});

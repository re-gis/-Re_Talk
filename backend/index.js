import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import colors from "colors";
import { userRouter } from "./Routers/user.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import { chatRouter } from "./Routers/chat.routes.js";
import { messageRouter } from "./Routers/message.routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Accept formdata
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
connectDb();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Error middewares
// app.use(notFound)
// app.use(errorHandler)

// user routes
app.use("/api/user", userRouter);

// Chat routes
app.use("/api/chats", chatRouter);

// messages routes
app.use("/api/message", messageRouter);

const server = app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}...`.underline.blue);
});

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://127.0.0.1:5173",
//   },
// });

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected!");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMsgReceived) => {
    var chat = newMsgReceived.chat;
    if (!chat.users) return console.log("Chat users not defined!");
    chat.users.forEach((user) => {
      if (user._id == newMsgReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMsgReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User disconnected!");
    socket.leave(userData._id);
  });
});

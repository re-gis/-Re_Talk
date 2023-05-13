import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import colors from "colors";
import { userRouter } from "./Routers/user.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import { chatRouter } from "./Routers/chat.routes.js";
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
    origin: "http://127.0.0.1:5173",
  })
);

app.get('/api/chat', (req, res) => {
  return res.status(200).send(chats)
})

// Error middewares
// app.use(notFound)
// app.use(errorHandler)

// user routes
app.use("/api/user", userRouter);

// Chat routes
app.use('/api/chats', chatRouter)

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}...`.underline.blue);
});

import express from "express";
const app = express();
import dotenv from "dotenv";
import { chats } from "./data/data.js";
import cors from 'cors'
dotenv.config();
const PORT = process.env.PORT;


app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/api/chat", (req, res) => {
  return res.send(chats);
});

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}...`);
});

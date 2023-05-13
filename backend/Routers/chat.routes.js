import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chat.controller.js";
export const chatRouter = express.Router();


chatRouter.route('/').post(protect, accessChat)
chatRouter.route('/').get(protect, fetchChats)
chatRouter.route('/group').post(protect, createGroupChat)
chatRouter.route('/rename').put(protect, renameGroup)
chatRouter.route('/remove').delete(protect, removeFromGroup)
chatRouter.route('/groupadd').put(protect, addToGroup)
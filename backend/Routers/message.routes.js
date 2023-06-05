import express from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { allMessages, sendMessage } from '../controllers/chat.controllers.js'
export const messageRouter = express.Router()


messageRouter.route('/').post(protect, sendMessage)
messageRouter.route('/:chatId').get(protect, allMessages)
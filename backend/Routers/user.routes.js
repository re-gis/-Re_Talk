import express from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js'
export const userRouter = express.Router()

userRouter.route('/').post(registerUser)
userRouter.route('/login').post(loginUser)
// export userRouter
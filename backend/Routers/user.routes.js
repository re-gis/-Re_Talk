import express from 'express'
import { allUsers, loginUser, registerUser } from '../controllers/user.controller.js'
import { protect } from '../middlewares/auth.middleware.js';
export const userRouter = express.Router()

userRouter.route("/").post(registerUser).get(protect,allUsers);
userRouter.route('/login').post(loginUser)
// export userRouter
import express from 'express'
import { addUser, authUser } from '../controllers/userController.js'

const userRouter =express.Router()


userRouter.route("/register").post(addUser)
userRouter.route("/login").post(authUser)


export default userRouter
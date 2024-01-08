import express from "express"
import User from "../models/User.js"
import { compare, hash } from "../lib/crypto.js"
import jwt from "jsonwebtoken"

const userRouter = express.Router()

userRouter.post("/register", async (req, res, next) => {
	try {
		req.body.password = await hash(req.body.password)
		const user = await User.create(req.body)
		res.send(user)
	} catch (error) {
		next({
			status: 400,
			message: error.message,
			originalError: error
		})
	}
})

userRouter.post("/login", async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		const loginSuccess = await compare(req.body.password, user.password)

		if (!loginSuccess) { throw Error("Password mismatch") }

		const token = jwt.sign({ uid: user._id }, process.env.SECRET)

		res.send({ user, token })

	} catch (error) {
		next({
			status: 401,
			message: "Login failed",
			originalError: error
		})
	}
})

export default userRouter
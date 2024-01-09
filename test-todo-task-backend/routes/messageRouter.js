import express from "express"
import Message from "../models/Message.js"

const messageRouter = express.Router()

messageRouter.post("/", async (req, res, next) => {
	try {
		req.body.author = req.user._id
		const message = await Message.create(req.body)
		const messageAsJSON = message.toJSON()
		delete messageAsJSON.__v
		res.send(messageAsJSON)
	} catch (error) {
		next({
			status: 400,
			message: error.message,
			originError: error
		})
	}
})

export default messageRouter
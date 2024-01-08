import mongoose from "mongoose"

const { Schema, model } = mongoose

const messageSchema = new Schema({
	title: { type: String, required: true, trim: true },
	content: { type: String, required: true, trim: true },
	author: { type: Schema.Types.ObjectId, required: true, ref: "user" },
}, {
	timestamps: true
})

const Message = model("message", messageSchema)

export default Message
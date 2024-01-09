import mongoose from "mongoose"

const { Schema, model } = mongoose

const messageSchema = new Schema({
	title:   { required: true, type: String, trim: true },
	content: { required: true, type: String, trim: true },
	author:  { required: true, type: Schema.Types.ObjectId, ref: "user" },
}, {
	timestamps: true
})

const Message = model("message", messageSchema)

export default Message
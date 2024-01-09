import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema({
	email:    { required: true, type: String, trim: true, unique: true},
	password: { required: true, type: String, minlength: 7 },
	name:     { type: String, trim: true },
	avatar: {
		type: String, default: () => {
			const size = Math.round(Math.random() * 400) + 100
			return `https://placekitten.com/${size}/${size}`
		}
	}
}, {
	timestamps: true,
	toJSON: {
		transform(doc, ret) {
			delete ret.password;
			delete ret.__v;
		},
	},
})

const User = model("user", userSchema)

export default User
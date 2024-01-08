import mongoose from "mongoose";

function connect() {
	mongoose.connection.on("connecting", () => console.log("M connecting"))
	mongoose.connection.on("connected", () => console.log("M connected"))
	mongoose.connection.on("disconnected", () => console.log("M disconnected"))
	mongoose.connection.on("reconnected", () => console.log("M resconnected"))
	mongoose.connection.on("error", e => console.log("M error", e))

	const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
	const cs = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
	mongoose.connect(cs)
}

export { connect }
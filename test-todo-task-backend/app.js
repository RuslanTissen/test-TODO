import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connect } from "./lib/database.js"
import requestlogger from "./middleware/requestlogger.js"
import messageRouter from "./routes/messageRouter.js"
import userRouter from "./routes/userRouter.js"
import checkAuth from "./middleware/checkAuth.js"

// setup
dotenv.config()
connect()
const app = express()
app.use(cors())
app.use(requestlogger)
app.use(express.json())

//endpoints
app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", checkAuth, messageRouter)

app.use((req, res, next) => next({ status: 404, message: "Resource not found" }))

app.use((err, req, res, next) => {
	console.log("GE ", err)
	res.status(err.status || 500).send({
		error: err.message || "Something went wrong"
	})
})

// start
app.listen(process.env.PORT, () => {
	console.log("Listening for requests")
})
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connect } from "./lib/database.js"
import requestlogger from "./middleware/requestlogger.js"

dotenv.config()
connect()
const app = express()
app.use(cors())
app.use(requestlogger)
app.use(express.json())

app.listen(process.env.PORT, () => {
	console.log("Listening for requests")
})
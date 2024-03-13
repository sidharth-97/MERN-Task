import dotenv from "dotenv"
dotenv.config()
import express from "express"
import ConnectDB from "./config/db"
import router from "./routes/routes"

ConnectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api",router)

app.listen(3000,()=>console.log("Server connected"))
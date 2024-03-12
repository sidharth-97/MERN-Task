import dotenv from "dotenv"
dotenv.config()
import express from "express"
import ConnectDB from "./config/db"
ConnectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("test server")
})

app.listen(3000,()=>console.log("Server connected"))
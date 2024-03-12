import express from "express"
import { allTransactions, initializeDb } from "../controller/controller"

const router = express.Router()

router.post("/initializeDb", initializeDb)
router.get("/alltransactions",allTransactions)


export default router
import express from "express"
import { Statistics, allTransactions, categoryList, fetchAll, initializeDb, priceRange } from "../controller/controller"

const router = express.Router()

router.post("/initializeDb", initializeDb)
router.get("/alltransactions", allTransactions)
router.get("/statistics", Statistics)
router.get("/pricerange", priceRange)
router.get("/categorylist", categoryList)
router.get("/fetchall",fetchAll)


export default router
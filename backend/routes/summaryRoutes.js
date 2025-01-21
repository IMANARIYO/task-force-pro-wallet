import express from "express";
import { getLast4WeeksStatistics, getRecentTransactions, getSummary, getWeeklyStatistics } from "../controllers/summaryController.js";

const summaryRouter = express.Router()

summaryRouter.get('/summary', getSummary)
summaryRouter.get('/transactions/recent', getRecentTransactions)
summaryRouter.get('/statistics/weekly', getWeeklyStatistics)
summaryRouter.get('/statistics/last4weeks', getLast4WeeksStatistics)

export default summaryRouter

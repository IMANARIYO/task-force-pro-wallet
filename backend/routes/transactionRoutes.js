import * as transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const transactionsRouter = express.Router()

transactionsRouter.post('/add',authMiddleware, transactionController.createTransaction)

transactionsRouter.put('/edit/:id', authMiddleware,transactionController.updateTransaction)

transactionsRouter.delete('/:id',authMiddleware, transactionController.deleteTransaction)

transactionsRouter.get('/', authMiddleware,transactionController.getAllTransactions)

transactionsRouter.get(
  '/transactions/account/:accountId',
  transactionController.getTransactionsByAccount
)

transactionsRouter.get('/total-income',authMiddleware, transactionController.getTotalIncome)

transactionsRouter.get(
  '/total-expenses',
  transactionController.getTotalExpenses
)

export default transactionsRouter

import * as transactionController from "../controllers/transactionController.js";
import express from "express";

const transactionsRouter = express.Router()

transactionsRouter.post('/add', transactionController.createTransaction)

transactionsRouter.put('/edit/:id', transactionController.updateTransaction)

transactionsRouter.delete('/:id', transactionController.deleteTransaction)

transactionsRouter.get('/', transactionController.getAllTransactions)

transactionsRouter.get(
  '/transactions/account/:accountId',
  transactionController.getTransactionsByAccount
)

transactionsRouter.get('/total-income', transactionController.getTotalIncome)

transactionsRouter.get(
  '/total-expenses',
  transactionController.getTotalExpenses
)

export default transactionsRouter

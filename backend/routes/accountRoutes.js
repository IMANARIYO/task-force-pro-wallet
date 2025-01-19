import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

import {
  addAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount
} from '../controllers/accountController.js'

const accountsRouter = express.Router()

accountsRouter.post('/add', addAccount)

accountsRouter.get('/', getAllAccounts)

accountsRouter.put('/edit/:id', updateAccount)

accountsRouter.delete('/delete/:id', deleteAccount)

export default accountsRouter

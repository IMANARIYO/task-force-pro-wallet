import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

import {
  addAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount
} from '../controllers/accountController.js'

const accountsRouter = express.Router()

accountsRouter.post('/add',authMiddleware, addAccount)

accountsRouter.get('/',authMiddleware, getAllAccounts)

accountsRouter.put('/edit/:id',authMiddleware, updateAccount)

accountsRouter.delete('/delete/:id',authMiddleware, deleteAccount)

export default accountsRouter

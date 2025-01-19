import authMiddleware from '../middleware/authMiddleware.js'
import express from 'express'

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryById
} from '../controllers/categoryController.js'

const categoriesRouter = express.Router()

categoriesRouter.post('/add', authMiddleware, createCategory)

categoriesRouter.get('/listCategories', authMiddleware, getCategories)
categoriesRouter.get(
  '/getcategory/:categoryId',
  authMiddleware,
  getCategoryById
)

categoriesRouter.put('/update/:categoryId', authMiddleware, updateCategory)

categoriesRouter.delete('/delete/:categoryId', authMiddleware, deleteCategory)

export default categoriesRouter

import express from 'express'

import {
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategories
} from '../controllers/subCategoriesController.js'
const subcategoryRouter = express.Router()

subcategoryRouter.post('/addSubcategory/:categoryId', addSubcategory)

subcategoryRouter.put('/updateSubcategory/:subcategoryId', updateSubcategory)

subcategoryRouter.delete(
  '/deleteSubcategory/:subcategoryId',
  deleteSubcategory
)

subcategoryRouter.get('/getSubcategories/:categoryId', getSubcategories)

export default subcategoryRouter

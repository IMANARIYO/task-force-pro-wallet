import express from "express";

import {
  addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategories
} from '../controllers/subCategoriesController.js'
const subcategoryRouter = express.Router()

// Add a new subcategory to a category
subcategoryRouter.post('/addSubcategory/:categoryId', addSubcategory)

// Update an existing subcategory
subcategoryRouter.put('/updateSubcategory/:subcategoryId', updateSubcategory)

// Delete a subcategory
subcategoryRouter.delete(
  '/deleteSubcategory/:subcategoryId',
  deleteSubcategory
)

// Get all subcategories for a category
subcategoryRouter.get('/getSubcategories/:categoryId', getSubcategories)

export default subcategoryRouter

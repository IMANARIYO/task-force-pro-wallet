import Category from "../models/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, budgetAmount } = req.body
  const { userId } = req.user||1

  try {
    const newCategory = new Category({
      userId,
      name,
      budgetAmount,
      currentSpending: 0
    })

    await newCategory.save()
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create category' })
  }
}

// Get all categories for the logged-in user
export const getCategories = async (req, res) => {
  const { userId } = req.user||1

  try {
    const categories = await Category.find()
    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' })
    }

    res.status(200).json({ categories })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}

// Update an existing category
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params
  const { name, budgetAmount } = req.body // Removed subcategory handling
  const { userId } = req.user||1

  try {
    const category = await Category.findOne({ _id: categoryId, userId })

    if (!category) {
      return res.status(404).json({
        error: 'Category not found or you are not authorized to edit it'
      })
    }

    category.name = name || category.name
    category.budgetAmount = budgetAmount || category.budgetAmount

    await category.save()
    res.status(200).json({
      message: 'Category updated successfully',
      category
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update category' })
  }
}

// Delete a category
export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params
  const { userId } = req.user||1

  try {
    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      return res.status(404).json({
        error: 'Category not found or you are not authorized to delete it'
      })
    }

    await Category.findByIdAndDelete(categoryId)
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete category' })
  }
}

// Get category by ID
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params
  const { userId } = req.user||1


  try {
    const category = await Category.findOne({
      _id: categoryId
    
    })

    if (!category) {
      return res.status(404).json({
        error: 'Category not found or you are not authorized to view it'
      })
    }

    res.status(200).json({ category })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch category' })
  }
}

import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

// Add a new subcategory
export const addSubcategory = async (req, res) => {
  const { categoryId } = req.params
  const { name, budgetAmount, description } = req.body

  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' })
    }

    // Check if the subcategory's budgetAmount exceeds the remaining budget in the category
    const remainingBudget = category.budgetAmount - category.currentSpending

    if (budgetAmount > remainingBudget) {
      return res
        .status(400)
        .json({
          msg:
            'Not enough remaining budget in the category for this subcategory'
        })
    }

    // Check if the subcategory's budgetAmount is negative
    if (budgetAmount < 0) {
      return res
        .status(400)
        .json({ msg: 'Subcategory budget cannot be negative' })
    }

    // Create the subcategory
    const subcategory = new Subcategory({
      name,
      budgetAmount,
      currentSpending: 0, // Initially, no spending
      description,
      categoryId
    })

    // Update the category's current spending
    category.currentSpending += subcategory.currentSpending

    // If the category's spending equals or exceeds the budget, prevent adding more subcategories
    if (category.currentSpending >= category.budgetAmount) {
      return res
        .status(400)
        .json({
          msg: 'Category budget exceeded, no further expenses can be made'
        })
    }

    await subcategory.save()
    await category.save()

    res.status(201).json(subcategory)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

// Update a subcategory
export const updateSubcategory = async (req, res) => {
  const { subcategoryId } = req.params
  const { name, budgetAmount, description } = req.body

  try {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (!subcategory) {
      return res.status(404).json({ msg: 'Subcategory not found' })
    }

    const category = await Category.findById(subcategory.categoryId)
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' })
    }

    // Calculate remaining budget in the category
    const remainingBudget =
      category.budgetAmount -
      category.currentSpending +
      subcategory.currentSpending

    // Check if the updated subcategory's budgetAmount exceeds the remaining budget
    if (budgetAmount > remainingBudget) {
      return res
        .status(400)
        .json({
          msg:
            'Not enough remaining budget in the category for this subcategory update'
        })
    }

    subcategory.name = name || subcategory.name
    subcategory.budgetAmount = budgetAmount || subcategory.budgetAmount
    subcategory.description = description || subcategory.description

    // Update the category’s current spending after the subcategory update
    category.currentSpending =
      category.currentSpending -
      subcategory.currentSpending +
      subcategory.currentSpending

    await subcategory.save()
    await category.save()

    // If the category's spending equals or exceeds the budget, prevent adding more subcategories or expenses
    if (category.currentSpending >= category.budgetAmount) {
      return res
        .status(400)
        .json({
          msg: 'Category budget exceeded, no further expenses can be made'
        })
    }

    res.status(200).json(subcategory)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

// Delete a subcategory
export const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params

  try {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (!subcategory) {
      return res.status(404).json({ msg: 'Subcategory not found' })
    }

    const category = await Category.findById(subcategory.categoryId)
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' })
    }

    // Subtract the subcategory's currentSpending from the category's currentSpending
    category.currentSpending -= subcategory.currentSpending

    await Subcategory.findByIdAndDelete(subcategoryId)
    await category.save()

    res.status(200).json({ msg: 'Subcategory deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

// Get all subcategories for a specific category
export const getSubcategories = async (req, res) => {
  const { categoryId } = req.params

  try {
    const subcategories = await Subcategory.find({ categoryId })
    if (!subcategories) {
      return res.status(404).json({ msg: 'No subcategories found' })
    }

    res.status(200).json(subcategories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
}

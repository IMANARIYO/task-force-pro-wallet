import Category from '../models/Category.js'
import Subcategory from '../models/Subcategory.js'

const getRemainingBudget = category => {
  return category.budgetAmount - category.currentSpending
}

export const addSubcategory = async (req, res) => {
  console.log(
    'addSubcategory called -----------------------------------------------------------------------'
  )
  const { categoryId } = req.params
  const { name, budgetAmount, description } = req.body

  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    if (budgetAmount > category.accumulatedfunds) {
      return res.status(400).json({
        error: `Insufficient accumulated funds. Missing RWF ${(budgetAmount -
          category.accumulatedfunds).toFixed(2)}`,
        suggestion:
          'Consider increasing the accumulated funds or reducing the subcategory budget.'
      })
    }

    const remainingBudget = category.budgetAmount - category.currentSpending

    if (budgetAmount > remainingBudget) {
      const excessAmount = budgetAmount - remainingBudget
      return res.status(400).json({
        error: `Not enough remaining budget in the category. Exceeds by RWF ${excessAmount.toFixed(
          2
        )}`,
        suggestion:
          'Try reducing the subcategory budget or remove some of the current spending in the category.'
      })
    }

    if (budgetAmount < 0) {
      return res
        .status(400)
        .json({ error: 'Subcategory budget cannot be negative' })
    }

    const subcategory = new Subcategory({
      name,
      budgetAmount,
      currentSpending: 0,
      description,
      categoryId
    })

    if (category.currentSpending + budgetAmount > category.budgetAmount) {
      return res.status(400).json({
        error: `Adding this subcategory would exceed the category budget by RWF ${category.currentSpending +
          budgetAmount -
          category.budgetAmount}.`,
        suggestion:
          'Consider reducing the subcategory budget or reviewing the current spending in the category.'
      })
    }

    category.currentSpending += budgetAmount
    category.accumulatedfunds -= budgetAmount

    await category.save()
    await subcategory.save()

    res
      .status(201)
      .json({ message: 'Subcategory added successfully', subcategory })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}

export const updateSubcategory = async (req, res) => {
  const { subcategoryId } = req.params
  const { name, budgetAmount, description } = req.body

  try {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' })
    }

    const category = await Category.findById(subcategory.categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const difference = budgetAmount - subcategory.budgetAmount

    if (difference > 0 && difference > category.accumulatedfunds) {
      return res.status(400).json({
        error: `Insufficient accumulated funds for update. Missing RWF ${difference.toFixed(
          2
        )}`,
        suggestion:
          'Try reducing the subcategory budget or add more accumulated funds to the category by making transaction to this category.'
      })
    }

    subcategory.name = name || subcategory.name
    subcategory.budgetAmount = budgetAmount || subcategory.budgetAmount
    subcategory.description = description || subcategory.description

    const newCategorySpending =
      category.currentSpending - subcategory.budgetAmount + budgetAmount
    if (newCategorySpending > category.budgetAmount) {
      return res.status(400).json({
        error: `Updating this subcategory would exceed the category budget by RWF ${(newCategorySpending -
          category.budgetAmount).toFixed(2)}`,
        suggestion:
          "You may need to lower the subcategory's budget or reduce existing expenses."
      })
    }

    if (difference > 0) {
      category.accumulatedfunds -= difference
    }

    category.currentSpending = newCategorySpending

    await subcategory.save()
    await category.save()

    res
      .status(200)
      .json({ message: 'Subcategory updated successfully', subcategory })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}

export const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params

  try {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' })
    }

    const category = await Category.findById(subcategory.categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    category.accumulatedfunds += subcategory.budgetAmount
    category.currentSpending -= subcategory.currentSpending

    if (category.currentSpending < 0) {
      category.currentSpending = 0
    }

    await Subcategory.findByIdAndDelete(subcategoryId)
    await category.save()

    res.status(200).json({ message: 'Subcategory deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}

export const getSubcategories = async (req, res) => {
  const { categoryId } = req.params

  try {
    const subcategories = await Subcategory.find({ categoryId })
    if (!subcategories) {
      return res.status(404).json({ error: 'No subcategories found' })
    }

    res.status(200).json(subcategories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error. Please try again later.' })
  }
}

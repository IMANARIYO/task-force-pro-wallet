import Account from "../models/Acount.js";
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  let {
    name,
    budgetAmount,
    currentSpending = 0,
    accumulatedfunds = 0
  } = req.body

  const { userId } = req.user || {}

  budgetAmount = Number(budgetAmount)
  currentSpending = Number(currentSpending)
  accumulatedfunds = Number(accumulatedfunds)

  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const accounts = await Account.find({ userId })
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: 'No accounts found for the user' })
    }

    const totalLimit = accounts.reduce(
      (total, account) => total + account.limit,
      0
    )

    const categories = await Category.find({ userId })
    const totalCategoryBudget = categories.reduce(
      (total, category) => total + category.budgetAmount,
      0
    )

    if (totalCategoryBudget + budgetAmount > totalLimit) {
      const allowedBudget = totalLimit - totalCategoryBudget
      const excessAmount = totalCategoryBudget + budgetAmount - totalLimit

      if (allowedBudget <= 0) {
        return res.status(400).json({
          error: `Budget exceeds the total available account limits (RWF ${totalLimit}). Your total allocated budget for all categories is RWF ${totalCategoryBudget}, and your accounts have no remaining available funds to allocate additional budget.`
        })
      } else {
        return res.status(400).json({
          error: `Budget exceeds all your available accounts limits. You can only allocate RWF ${allowedBudget.toFixed(
            2
          )} more. The excess budget you are attempting to allocate is RWF ${excessAmount.toFixed(
            2
          )}.`
        })
      }
    }

    if (budgetAmount > totalLimit) {
      return res.status(400).json({
        error: `The budget exceeds the total available limit of your accounts. The total available limit is RWF ${totalLimit.toFixed(
          2
        )}.`
      })
    }

    if (currentSpending > budgetAmount) {
      return res.status(400).json({
        error: `Current spending exceeds the available budget. Current spending: RWF ${currentSpending}, Available budget: RWF ${budgetAmount}`
      })
    }

    const remainingBudget = budgetAmount - currentSpending

    const newCategory = new Category({
      userId,
      name,
      budgetAmount: remainingBudget,
      currentSpending,
      accumulatedfunds
    })

    await newCategory.save()
    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: `Failed to create category: ${error.message}` })
  }
}

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params
  let {
    name,
    budgetAmount,
    currentSpending = 0,
    accumulatedfunds = 0
  } = req.body
  const { userId } = req.user || {}

  budgetAmount = Number(budgetAmount)
  currentSpending = Number(currentSpending)
  accumulatedfunds = Number(accumulatedfunds)

  try {
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const accounts = await Account.find({ userId })
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: 'No accounts found for the user' })
    }

    const totalLimit = accounts.reduce(
      (total, account) => total + account.limit,
      0
    )

    const category = await Category.findOne({ _id: categoryId, userId })
    if (!category) {
      return res.status(404).json({
        error: 'Category not found or you are not authorized to edit it'
      })
    }

    const categories = await Category.find({ userId })
    const totalCategoryBudget = categories.reduce(
      (total, cat) =>
        cat._id.toString() !== categoryId ? total + cat.budgetAmount : total,
      0
    )

    if (totalCategoryBudget + budgetAmount > totalLimit) {
      const allowedBudget = totalLimit - totalCategoryBudget
      return res.status(400).json({
        error: `Updated budget exceeds available account limit. You can only allocate RWF ${allowedBudget.toFixed(
          2
        )} more.`
      })
    }

    if (budgetAmount > totalLimit) {
      return res.status(400).json({
        error: `Updated budget exceeds the total available limit of your accounts. The total available limit is RWF ${totalLimit.toFixed(
          2
        )}.`
      })
    }

    if (currentSpending > budgetAmount) {
      return res.status(400).json({
        error: `Current spending exceeds the available budget. Current spending: RWF ${currentSpending}, Available budget: RWF ${budgetAmount}`
      })
    }

    const remainingBudget = budgetAmount - currentSpending

    category.name = name || category.name
    category.budgetAmount = remainingBudget
    category.currentSpending = currentSpending
    category.accumulatedfunds =
      accumulatedfunds !== undefined
        ? accumulatedfunds
        : category.accumulatedfunds

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

export const getCategories = async (req, res) => {
  const { userId } = req.user || {}

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

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params
  const { userId } = req.user 

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

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params
  const { userId } = req.user || 1

  try {
    const category = await Category.findOne({
      _id: categoryId,
      userId
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

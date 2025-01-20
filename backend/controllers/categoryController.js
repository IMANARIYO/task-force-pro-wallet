import Account from "../models/Acount.js";
import Category from "../models/Category.js";

// Create a new category

// Create a new category
export const createCategory = async (req, res) => {
  const { name, budgetAmount } = req.body;
  const { userId } = req.user || 1;

  try {
    // Step 1: Get all accounts in the system (not just user-specific)
    const accounts = await Account.find();
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found in the system" });
    }

    // Calculate the total balance of all accounts
    const totalBalance = accounts.reduce(
      (total, account) => total + account.balance,
      0
    );

    // Step 2: Get the total budget of existing categories for the user
    const categories = await Category.find({ userId });
    const totalCategoryBudget = categories.reduce(
      (total, category) => total + category.budgetAmount,
      0
    );

    // Step 3: Check if the new category's budget exceeds the total available balance
    if (totalCategoryBudget + budgetAmount > totalBalance) {
      const allowedBudget = totalBalance - totalCategoryBudget;
      return res.status(400).json({
        error: `Budget exceeds available account balance. You can only allocate RWF ${allowedBudget.toFixed(
          2
        )} more.`
      });
    }

    // Step 4: Create the new category
    const newCategory = new Category({
      userId,
      name,
      budgetAmount,
      currentSpending: 0
    });

    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get all categories for the logged-in user
export const getCategories = async (req, res) => {
  const { userId } = req.user || 1;

  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Update an existing category// Update an existing category
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, budgetAmount } = req.body;
  const { userId } = req.user || 1;

  try {
    // Step 1: Get all accounts in the system and calculate the total balance
    const accounts = await Account.find();
    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found in the system" });
    }

    const totalBalance = accounts.reduce(
      (total, account) => total + account.balance,
      0
    );

    // Step 2: Find the existing category to be updated
    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({
        error: "Category not found or you are not authorized to edit it"
      });
    }

    // Step 3: Calculate the total budget of all categories excluding the one being updated
    const categories = await Category.find({ userId });
    const totalCategoryBudget = categories.reduce(
      (total, cat) =>
        cat._id.toString() !== categoryId ? total + cat.budgetAmount : total,
      0
    );

    // Step 4: Check if the updated budget exceeds the total balance
    if (totalCategoryBudget + budgetAmount > totalBalance) {
      const allowedBudget = totalBalance - totalCategoryBudget;
      return res.status(400).json({
        error: `Updated budget exceeds available account balance. You can only allocate RWF ${allowedBudget.toFixed(
          2
        )} more.`
      });
    }

    // Step 5: Update the category
    category.name = name || category.name;
    category.budgetAmount = budgetAmount || category.budgetAmount;

    await category.save();
    res.status(200).json({
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.user || 1;

  try {
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        error: "Category not found or you are not authorized to delete it"
      });
    }

    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const { userId } = req.user || 1;

  try {
    const category = await Category.findOne({
      _id: categoryId
    });

    if (!category) {
      return res.status(404).json({
        error: "Category not found or you are not authorized to view it"
      });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

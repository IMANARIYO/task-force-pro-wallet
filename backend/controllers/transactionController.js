import Account from "../models/Acount.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transactions.js";

// Helper function to calculate the new balance for the account
const updateAccountBalance = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    // Calculate the total balance based on transactions
    const totalIncome = await Transaction.aggregate([
      { $match: { account: accountId, type: 'Income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const totalExpenses = await Transaction.aggregate([
      { $match: { account: accountId, type: 'Expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const incomeTotal = totalIncome[0]?.total || 0;
    const expensesTotal = totalExpenses[0]?.total || 0;
    
    const newBalance = incomeTotal - expensesTotal;
    
    // Update the account balance and save
    account.balance = newBalance;
    await account.save();
    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('account').populate('category');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction and update the account balance
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, account, category } = req.body;
    
    if (!type || !amount || !account || !category) {
      return res.status(400).json({ error: 'Type, amount, account, and category are required' });
    }

    const accountToUpdate = await Account.findById(account);
    if (!accountToUpdate) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    const categoryToUpdate = await Category.findById(category);
    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found' });
    }

    req.body.categoryname = categoryToUpdate.name;

    // Handling Expense transactions and checking against budget
    if (type === 'Expense') {
      if (amount > accountToUpdate.limit) {
        return res.status(400).json({ error: `Account planned limit ${accountToUpdate.limit} exceeded` });
      }

      if (categoryToUpdate.accumulatedfunds + amount > categoryToUpdate.budgetAmount) {
        const remainingBudget = categoryToUpdate.budgetAmount - categoryToUpdate.accumulatedfunds;
        if (remainingBudget > 0) {
          categoryToUpdate.accumulatedfunds = categoryToUpdate.budgetAmount;
          await categoryToUpdate.save();
          req.body.amount = remainingBudget;

          const transaction = new Transaction(req.body);
          const savedTransaction = await transaction.save();

          accountToUpdate.balance -= remainingBudget;
          accountToUpdate.limit = Math.max(0, accountToUpdate.limit - remainingBudget);
          await accountToUpdate.save();

          return res.status(201).json({ message: `Partial transaction of ${remainingBudget} completed due to budget limit.`, transaction: savedTransaction });
        } else {
          return res.status(400).json({ error: 'You are exceeding the budget! No funds available.' });
        }
      }

      categoryToUpdate.accumulatedfunds += amount;
      await categoryToUpdate.save();
    }

    req.body.amount = amount;
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();

    // Update account balance
    if (type === 'Income') {
      accountToUpdate.balance += amount;
    } else if (type === 'Expense') {
      accountToUpdate.balance -= amount;
      accountToUpdate.limit = Math.max(0, accountToUpdate.limit - amount);
    }

    await accountToUpdate.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'An unexpected error occurred while processing the transaction' });
  }
};

// Update an existing transaction and recalculate account balance
export const updateTransaction = async (req, res) => {
  try {
    const { type, amount, account } = req.body;

    if (!type || !amount || !account) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const accountToUpdate = await Account.findById(account);
    if (!accountToUpdate) {
      return res.status(404).json({ error: "Account not found" });
    }

    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Revert previous transaction before updating balance
    if (transaction.type === "Income") {
      accountToUpdate.balance -= transaction.amount;
    } else if (transaction.type === "Expense") {
      accountToUpdate.balance += transaction.amount;
    }

    // Update transaction fields
    transaction.type = type;
    transaction.amount = amount;
    transaction.account = account;
    await transaction.save();

    // Update the account balance based on the updated transaction
    if (type === "Income") {
      accountToUpdate.balance += amount;
    } else if (type === "Expense") {
      accountToUpdate.balance -= amount;
    }

    await accountToUpdate.save();
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction and update the account balance
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const account = await Account.findById(transaction.account);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Update account balance based on transaction type
    if (transaction.type === 'Income') {
      account.balance -= transaction.amount;
    } else if (transaction.type === 'Expense') {
      account.balance += transaction.amount;
    }

    await account.save();
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all transactions for a given account
export const getTransactionsByAccount = async (req, res) => {
  try {
    const transactions = await Transaction.find({ account: req.params.accountId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total income and expenses for reporting purposes
export const getTotalIncome = async (req, res) => {
  try {
    const totalIncome = await Transaction.aggregate([
      { $match: { type: 'Income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.status(200).json({ totalIncome: totalIncome[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTotalExpenses = async (req, res) => {
  try {
    const totalExpenses = await Transaction.aggregate([
      { $match: { type: 'Expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.status(200).json({ totalExpenses: totalExpenses[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

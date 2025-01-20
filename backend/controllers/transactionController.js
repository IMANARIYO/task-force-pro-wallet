import Account from "../models/Acount.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transactions.js";

 
const updateAccountBalance = async (accountId) => {
  try {
    const account = await Account.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

     
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

     
    if (type === 'Expense') {
      if (amount > accountToUpdate.limit) {
        return res.status(400).json({ error: `Account planned limit ${accountToUpdate.limit} exceeded` });
      }
      
      const totalAfterExpense = categoryToUpdate.currentSpending + categoryToUpdate.accumulatedfunds + amount;
      
      if (totalAfterExpense > categoryToUpdate.budgetAmount) {
        const maxAllowedAmount = categoryToUpdate.budgetAmount - (categoryToUpdate.currentSpending + categoryToUpdate.accumulatedfunds);
        
        if (maxAllowedAmount > 0) {
          categoryToUpdate.accumulatedfunds += maxAllowedAmount;
          await categoryToUpdate.save();
          req.body.amount = maxAllowedAmount;

          const transaction = new Transaction(req.body);
          const savedTransaction = await transaction.save();

          accountToUpdate.balance -= maxAllowedAmount;
          accountToUpdate.limit = Math.max(0, accountToUpdate.limit - maxAllowedAmount);
          await accountToUpdate.save();

          return res.status(201).json({ message: `Partial transaction of ${maxAllowedAmount} completed due to budget limit.`, transaction: savedTransaction });
        } else {
          return res.status(400).json({ error: 'Budget exceeded! No additional funds available.' });
        }
      }

      categoryToUpdate.accumulatedfunds += amount;
      await categoryToUpdate.save();
    }

    req.body.amount = amount;
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();

     
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
 
export const updateTransaction = async (req, res) => {
  try {
    const { type, amount, account, category } = req.body;

    if (!type || !amount || !account || !category) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const accountToUpdate = await Account.findById(account);
    if (!accountToUpdate) {
      return res.status(404).json({ error: "Account not found" });
    }

    const categoryToUpdate = await Category.findById(category);
    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }

    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

     
    if (transaction.type !== type) {
       
      if (transaction.type === 'Expense') {
        categoryToUpdate.accumulatedfunds -= transaction.amount;
      } else if (transaction.type === 'Income') {
         
      }

       
      if (transaction.type === 'Income') {
        accountToUpdate.balance -= transaction.amount;
      } else if (transaction.type === 'Expense') {
        accountToUpdate.balance += transaction.amount;
      }

       
      if (type === 'Expense') {
        categoryToUpdate.accumulatedfunds += amount;
      } else if (type === 'Income') {
         
      }

       
      if (type === 'Income') {
        accountToUpdate.balance += amount;
      } else if (type === 'Expense') {
        accountToUpdate.balance -= amount;
      }

      await categoryToUpdate.save();
      await accountToUpdate.save();
    }

     
    transaction.type = type;
    transaction.amount = amount;
    transaction.account = account;
    transaction.category = category;
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: error.message });
  }
};




 
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

    const category = await Category.findById(transaction.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

     
    if (transaction.type === 'Expense') {
      category.accumulatedfunds -= transaction.amount;
    }

    await category.save();

     
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

 
export const getTransactionsByAccount = async (req, res) => {
  try {
    const transactions = await Transaction.find({ account: req.params.accountId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 
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

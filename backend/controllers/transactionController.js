import Account from "../models/Acount.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transactions.js";

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
req.body.categoryname=categoryToUpdate.name

if (type === 'Expense') {
  if (amount > accountToUpdate.limit) {
    return res.status(400).json({ error: 'account planned limit exceeded ' });
  }
  console.log("the accum is _______________________________________________",categoryToUpdate.accumulatedfunds )
  console.log("the cat buget is _______________________________________________", categoryToUpdate.budgetAmount)
  console.log("the transais _ ama______________________________________________",typeof amount)
     if (categoryToUpdate.accumulatedfunds + amount > categoryToUpdate.budgetAmount) {
      

        return res.status(400).json({ error: 'you are excedding ! This category budget has already reached its limit' });
      }
       categoryToUpdate.accumulatedfunds = categoryToUpdate.accumulatedfunds+ amount;
      await categoryToUpdate.save();
      
    }
    

    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();

    if (type === 'Income') {
      accountToUpdate.balance =accountToUpdate.balance + amount;
    } else if (type === 'Expense') {
      accountToUpdate.balance= accountToUpdate.balance - amount;
    accountToUpdate.limit = accountToUpdate.limit -amount;  

    }
 accountToUpdate.limit = Math.max(0, accountToUpdate.limit);

    await accountToUpdate.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
     res.status(500).json({ error: 'An unexpected error occurred while calculating total expenses' });
  }
};


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

    
    if (transaction.type === "Income") {
      accountToUpdate.balance -= transaction.amount;
    } else if (transaction.type === "Expense") {
      accountToUpdate.balance += transaction.amount;
    }

    
    if (type === "Expense" && accountToUpdate.balance - amount < accountToUpdate.limit) {
      return res.status(400).json({ error: "Updated transaction exceeds the account's limit" });
    }

    
    transaction.type = type;
    transaction.amount = amount;
    transaction.account = account;
    await transaction.save();

    
    if (type === "Income") {
      accountToUpdate.balance += amount;
    } else if (type === "Expense") {
      accountToUpdate.balance -= amount;
    }

    
    if (accountToUpdate.limit > accountToUpdate.balance) {
      accountToUpdate.limit = accountToUpdate.balance;
    }

    await accountToUpdate.save();
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


export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('account');
    res.status(200).json(transactions);
  } catch (error) {
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

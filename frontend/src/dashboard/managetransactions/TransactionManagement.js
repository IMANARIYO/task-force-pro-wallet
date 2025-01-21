import React, { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import TransactionsSummary from "./TransactionSummary";
import TransactionsTable from "./TransactionsTable";
import { Button } from "antd";
import { fetchCategories } from "../../services/categories";

import {
  fetchTransactions,
  fetchTotalIncome,
  fetchTotalExpenses,
  fetchAccounts,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionsServices";

const TransactionManagement = () => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

useEffect(() => {
  let isMounted = true; 
  loadData();

  return () => {
    isMounted = false; 
  };
}, []);


const loadData = async () => {
  setLoading(true);
  try {
    const [transRes, incomeRes, expensesRes, accountsRes, categoriesRes] =
      await Promise.all([
        fetchTransactions(),
        fetchTotalIncome(),
        fetchTotalExpenses(),
        fetchAccounts(),
        fetchCategories(),
      ]);

    setTransactions(transRes.data || []);
    setTotalIncome(incomeRes.data?.totalIncome || 0);
    setTotalExpenses(expensesRes.data?.totalExpenses || 0);
    setAccounts(accountsRes.data || []);
    setCategories(categoriesRes.data|| []);
    
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleAdd = () => {
    setCurrentTransaction(null);
    setIsModalVisible(true);
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
     
      await loadData(); 
    } catch (error) {
     console.log("Failed to delete transaction. Please try again.")
    }
  };

  const handleOk = async (values) => {
    const newValues = {
      ...values,
      amount: Number(values.amount),
    };

    try {
      

      if (currentTransaction) {
        await updateTransaction(currentTransaction._id, newValues);
        
      } else {
        await addTransaction(newValues);
       
      }

      setIsModalVisible(false);
      await loadData(); 
    } catch (error) {
     console.log(error)
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd}>
        Add Transaction
      </Button>
      <TransactionsTable
        transactions={transactions}
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <TransactionsSummary totalIncome={totalIncome} totalExpenses={totalExpenses} />
      <TransactionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        currentTransaction={currentTransaction}
        accounts={accounts}
        categories={categories}
      />
    </>
  );
};

export default TransactionManagement;

import DefaultLayout from "../../components/DefaultLayout";
import React, { useEffect, useState } from "react";
import TransactionModal from "./TransactionModal";
import TransactionsSummary from "./TransactionSummary";
import TransactionsTable from "./TransactionsTable";
import { Button, message } from "antd";
import { fetchCategories } from "../../services/categories";

import {
  fetchTransactions,
  fetchTotalIncome,
  fetchTotalExpenses,
  fetchAccounts,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  
} from '../../services/transactionsServices'

const TransactionManagement = () => {
  const[categories, setCategories] = useState([])
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)


  useEffect(() => {
    loadData()
  }, [])


  const loadData = async () => {
    setLoading(true)
    try {
      const [
        transRes,
        incomeRes,
        expensesRes,
        accountsRes,
        categoriesRes
      ] = await Promise.all([
        fetchTransactions(),
        fetchTotalIncome(),
        fetchTotalExpenses(),
        fetchAccounts(),
        fetchCategories()
      ])
      setTransactions(transRes.data)
      setTotalIncome(incomeRes.data.totalIncome)
      setTotalExpenses(expensesRes.data.totalExpenses)
      setAccounts(accountsRes.data)
      setCategories(categoriesRes.categories)
    } catch (error) {
      message.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setCurrentTransaction(null)
    setIsModalVisible(true)
  }

  const handleEdit = transaction => {
    setCurrentTransaction(transaction)
    setIsModalVisible(true)
  }

  const handleDelete = async id => {
    try {
      await deleteTransaction(id)
      message.success('Transaction deleted successfully')
      loadData()
    } catch (error) {
      message.error('Failed to delete transaction')
    }
  }

  const handleOk = async values => {
    
    const newvalues = {
        ...values,
        amount: Number(values.amount),
    };
    try {
             console.log("values are ......>>>", newvalues)
             
      if (currentTransaction) {
      
        await updateTransaction(currentTransaction._id, newvalues)
        message.success('Transaction updated successfully')
      } else {
   
        await addTransaction(newvalues)
        message.success('Transaction added successfully')
      }
      setIsModalVisible(false)
      loadData()
    } catch (error) {
      message.error(error?.response?.data?.error || 'Failed to save transaction.');
    }
  }

  return (
    <DefaultLayout>
      <Button type='primary' onClick={handleAdd}>
        Add Transaction
      </Button>
      <TransactionsTable
        transactions={transactions}
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <TransactionsSummary
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />
      <TransactionModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        currentTransaction={currentTransaction}
        accounts={accounts}
        transactions={transactions}
        categories={categories}
      />
    </DefaultLayout>
  )
}

export default TransactionManagement

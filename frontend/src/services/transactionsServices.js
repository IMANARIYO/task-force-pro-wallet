import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL

export const fetchTransactions = async () => {
  return axios.get(`${API_URL}/api/transactions`)
}

export const fetchTotalIncome = async () => {
  return axios.get(`${API_URL}/api/transactions/total-income`)
}

export const fetchTotalExpenses = async () => {
  return axios.get(`${API_URL}/api/transactions/total-expenses`)
}

export const fetchAccounts = async () => {
  return axios.get(`${API_URL}/api/accounts`)
}

export const addTransaction = async transaction => {
  return axios.post(`${API_URL}/api/transactions/add`, transaction)
}

export const updateTransaction = async (id, transaction) => {
  return axios.put(`${API_URL}/api/transactions/edit/${id}`, transaction)
}

export const deleteTransaction = async id => {
  return axios.delete(`${API_URL}/api/transactions/${id}`)
}

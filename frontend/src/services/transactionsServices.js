import axiosInstance from "./apiConfig";

export const fetchTransactions = async () => {
  return axiosInstance.get(`api/transactions`)
}

export const fetchTotalIncome = async () => {
  return axiosInstance.get(`api/transactions/total-income`)
}

export const fetchTotalExpenses = async () => {
  return axiosInstance.get(`api/transactions/total-expenses`)
}

export const fetchAccounts = async () => {
  return axiosInstance.get(`api/accounts`)
}

export const addTransaction = async transaction => {
  return axiosInstance.post(`api/transactions/add`, transaction)
}

export const updateTransaction = async (id, transaction) => {
  return axiosInstance.put(`api/transactions/edit/${id}`, transaction)
}

export const deleteTransaction = async id => {
  return axiosInstance.delete(`api/transactions/${id}`)
}

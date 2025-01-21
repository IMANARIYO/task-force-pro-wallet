import axiosInstance from "./apiConfig";
import { message } from "antd";

export const fetchTransactions = async () => {
  try {
    const response = await axiosInstance.get(`/api/transactions`);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error 
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const fetchTotalIncome = async () => {
  try {
    const response = await axiosInstance.get(`/api/transactions/total-income`);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to fetch total income';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const fetchTotalExpenses = async () => {
  try {
    const response = await axiosInstance.get(`/api/transactions/total-expenses`);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to fetch total expenses';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const fetchAccounts = async () => {
  try {
    const response = await axiosInstance.get(`/api/accounts`);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to fetch accounts';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await axiosInstance.post(`/api/transactions/add`, transaction);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to add transaction';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const updateTransaction = async (id, transaction) => {
  try {
    const response = await axiosInstance.put(`/api/transactions/edit/${id}`, transaction);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to update transaction';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/transactions/${id}`);
    
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to delete transaction';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

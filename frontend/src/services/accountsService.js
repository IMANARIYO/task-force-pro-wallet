import axiosInstance from "./apiConfig.js";
import { message } from "antd";

export const fetchAccounts = async () => {
  try {
    const response = await axiosInstance.get('/api/accounts');
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failedddd to fetch accounts';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const addAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post('/api/accounts/add', accountData);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to add account';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const editAccount = async (accountId, accountData) => {
  try {
    const response = await axiosInstance.put(`/api/accounts/edit/${accountId}`, accountData);
    
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to update account';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete(`/api/accounts/delete/${accountId}`);
    
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to delete account';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

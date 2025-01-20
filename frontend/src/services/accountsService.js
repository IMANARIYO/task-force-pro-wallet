import axiosInstance from "./apiConfig.js";

 
export const fetchAccounts = async () => {
  try {
    const response = await axiosInstance.get('/api/accounts');
    return { success: true, data: response.data }; 
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Failed to fetch accounts' };
  }
};

 
export const addAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post('/api/accounts/add', accountData);
    return { success: true, data: response.data };  
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Failed to add account' };
  }
};

 
export const editAccount = async (accountId, accountData) => {
  try {
    const response = await axiosInstance.put(`/api/accounts/edit/${accountId}`, accountData);
    return { success: true, data: response.data };  
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Failed to update account' };
  }
};

 
export const deleteAccount = async (accountId) => {
  try {
    const response = await axiosInstance.delete(`/api/accounts/delete/${accountId}`);
    return { success: true, message: response.data.message || 'Account deleted successfully' };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Failed to delete account' };
  }
};

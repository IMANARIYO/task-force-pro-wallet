import axiosInstance from "./apiConfig";
import { message } from "antd";

export const addSubcategory = async (categoryId, subcategoryData) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/subcategory/addSubcategory/${categoryId}/`,
      { categoryId, ...subcategoryData }
    );
    
     
    if (response.data.message) {
      message.success(response.data.message);
    }
    return response;  
  } catch (error) {
     
    const errorMessage = error.response?.data?.error || 'Failed to add subcategory';
    const suggestion = error.response?.data?.suggestion;

    message.error(errorMessage);
    if (suggestion) {
      message.info(suggestion);  
    }
     
  }
};

export const updateSubcategory = async (categoryId, subcategoryId, subcategoryData) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/subcategory/updateSubcategory/${subcategoryId}`,
      subcategoryData
    );
    
    if (response.data.message) {
      message.success(response.data.message);
    }
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to update subcategory';
    const suggestion = error.response?.data?.suggestion;

    message.error(errorMessage);
    if (suggestion) {
      message.info(suggestion);
    }
    throw new Error(errorMessage);
  }
};

export const deleteSubcategory = async (subcategoryId) => {
  try {
    const response = await axiosInstance.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/subcategory/deleteSubcategory/${subcategoryId}`
    );
    
    if (response.data.message) {
      message.success(response.data.message);
    }
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to delete subcategory';

    message.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getSubcategories = async (categoryId) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/subcategory/getSubcategories/${categoryId}`
    );

    if (!response.data || response.data.length === 0) {
      message.warning('No subcategories found');
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to get subcategories';

    message.error(errorMessage);
    throw new Error(errorMessage);
  }
};

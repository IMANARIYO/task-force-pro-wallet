import axiosInstance from "./apiConfig";
import { message } from "antd";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/categories/listCategories');
    message.success(response.data.message || 'Categories fetched successfully');
    return { success: true, data: response.data.categories };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to fetch categories';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/api/categories/getcategory/${categoryId}`);
    message.success(response.data.message || 'Category fetched successfully');
    return { success: true, data: response.data.category };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to fetch category';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post('/api/categories/create', categoryData);
    message.success(response.data.message || 'Category added successfully');
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to add category';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(`/api/categories/update/${categoryId}`, categoryData);
    message.success(response.data.message || 'Category updated successfully');
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to update category';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/api/categories/delete/${categoryId}`);
    message.success(response.data.message || 'Category deleted successfully');
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'Failed to delete category';
    message.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

import axiosInstance from './apiConfig'
import { message } from 'antd'

export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get('/api/categories/listCategories')
    return res.data.categories
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const addCategory = async categoryData => {
  try {
    const response = await axiosInstance.post(
      '/api/categories/add',
      categoryData
    )
    message.success(response.data.message)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      console.error(error.response.data.error)
      message.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      console.error('An unexpected error occurred:', error)
      message.error('An unexpected error occurred. Please try again.')
    }
  }
}

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const res = await axiosInstance.put(
      `/api/categories/update/${categoryId}`,
      categoryData
    )
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const deleteCategory = async categoryId => {
  try {
    await axiosInstance.delete(`/api/categories/delete/${categoryId}`)
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const fetchCategoryById = async categoryId => {
  try {
    const res = await axiosInstance.get(`/api/categories/${categoryId}`)
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const fetchSubcategories = async categoryId => {
  try {
    const res = await axiosInstance.get(
      `/api/subcategories/listSubcategories/${categoryId}`
    )
    return res.data.subcategories
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const addSubcategory = async (categoryId, subcategoryData) => {
  try {
    const res = await axiosInstance.post(
      `/api/subcategories/add/${categoryId}`,
      subcategoryData
    )
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const updateSubcategory = async (
  categoryId,
  subcategoryId,
  subcategoryData
) => {
  try {
    const res = await axiosInstance.put(
      `/api/subcategories/update/${categoryId}/${subcategoryId}`,
      subcategoryData
    )
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

export const deleteSubcategory = async subcategoryId => {
  try {
    await axiosInstance.delete(`/api/subcategories/delete/${subcategoryId}`)
  } catch (error) {
    if (error.response && error.response.data) {
      message.error(error.response.data.error)
      console.error(error.response.data.error)
    } else if (error.request) {
      message.error('No response from the server. Please try again later.')
      console.error('No response from the server:', error.request)
    } else {
      message.error('An unexpected error occurred. Please try again.')
      console.error('An unexpected error occurred:', error.message)
    }
  }
}

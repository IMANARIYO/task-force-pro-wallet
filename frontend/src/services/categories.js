import axiosInstance from './apiConfig'

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/api/categories/listCategories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories', error)
    throw error
  }
}

export const fetchCategoryById = async categoryId => {
  try {
    const response = await axiosInstance.get(
      `/api/categories/getcategory/${categoryId}`
    )

    return response.data.category
  } catch (error) {
    console.error('Error fetching category', error)
    throw error
  }
}

export const addCategory = async categoryData => {
  try {
    const response = await axiosInstance.post(
      '/api/categories/create',
      categoryData
    )
    return response.data
  } catch (error) {
    console.error('Error adding category', error)
    throw error
  }
}

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(
      `/api/categories/update/${categoryId}`,
      categoryData
    )
    return response.data
  } catch (error) {
    console.error('Error updating category', error)
    throw error
  }
}

export const deleteCategory = async categoryId => {
  try {
    const response = await axiosInstance.delete(
      `/api/categories/delete/${categoryId}`
    )
    return response.data
  } catch (error) {
    console.error('Error deleting category', error)
    throw error
  }
}

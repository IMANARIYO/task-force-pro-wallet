import axios from "axios";

const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/categories/listCategories`
    )
    return res.data.categories
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

export const deleteCategory = async id => {
  try {
    await axiosInstance.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/categories/delete/${id}`
    )
  } catch (error) {
    throw new Error('Failed to delete category')
  }
}

export const saveCategory = async (categoryData, isUpdate, categoryId) => {
  try {
    if (isUpdate && categoryId) {
      await axiosInstance.put(
        `${process.env
          .REACT_APP_BACKEND_URL}/api/categories/update/${categoryId}`,
        categoryData
      )
    } else {
      await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/categories/add`,
        categoryData
      )
    }
  } catch (error) {
    throw new Error('Failed to save category')
  }
}

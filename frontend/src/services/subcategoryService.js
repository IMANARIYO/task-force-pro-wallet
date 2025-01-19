import axios from "axios";

const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const addSubcategory = async (categoryId, subcategoryData) => {
  try {
    await axiosInstance.post(
      `${process.env
        .REACT_APP_BACKEND_URL}/api/subcategory/addSubcategory/${categoryId}/`,
      { categoryId, ...subcategoryData }
    )
  } catch (error) {
    throw new Error('Failed to add subcategory')
  }
}

export const updateSubcategory = async (
  categoryId,
  subcategoryId,
  subcategoryData
) => {
  try {
    await axiosInstance.put(
      `${process.env
        .REACT_APP_BACKEND_URL}/api/subcategory/update/${categoryId}/${subcategoryId}`,
      subcategoryData
    )
  } catch (error) {
    throw new Error('Failed to update subcategory')
  }
}

export const deleteSubcategory = async subcategoryId => {
  try {
    await axiosInstance.delete(
      `${process.env
        .REACT_APP_BACKEND_URL}/api/subcategory/deleteSubcategory/${subcategoryId}`
    )
  } catch (error) {
    throw new Error('Failed to delete subcategory')
  }
}
export const getSubcategories = async categoryId => {
  try {
    const response = await axiosInstance.get(
      `${process.env
        .REACT_APP_BACKEND_URL}/api/subcategory/getSubcategories/${categoryId}`
    )

    return response.data
  } catch (error) {
    throw new Error('Failed to get subcategories')
  }
}

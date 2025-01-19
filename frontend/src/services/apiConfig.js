import axios from "axios";

// Get the backend URL from environment variables
const API_URL = process.env.REACT_APP_BACKEND_URL

// Get token from localStorage
const token = localStorage.getItem('token')

// Create an axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '', // Attach the token if available
    'Content-Type': 'application/json' // Default content type
  }
})

export default axiosInstance

import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  }
})

export default axiosInstance

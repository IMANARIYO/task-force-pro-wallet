import authMiddleware from '../middleware/authMiddleware.js'
import express from 'express'
import {
  deleteUser,
  getUserProfile,
  loginUser,
  registerUser
} from '../controllers/authController.js'

const authRouther = express.Router()

authRouther.post('/register', registerUser)

authRouther.post('/login', loginUser)

authRouther.get('/profile', authMiddleware, getUserProfile)

authRouther.delete('/delete', authMiddleware, deleteUser)

export default authRouther

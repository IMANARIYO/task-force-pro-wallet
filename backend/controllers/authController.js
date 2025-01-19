import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) { return res.status(400).json({ msg: 'User already exists' }) }

    const user = new User({ name, email, password })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(201).json({ token, user: { id: user._id, name, email } })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '100h'
    })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ msg: 'User not found' })

    await User.findByIdAndDelete(req.user.id)
    res.json({ msg: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

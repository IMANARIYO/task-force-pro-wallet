import React, { useState } from 'react'
import axios from 'axios'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { email, password }
      )
      message.success('Login successful!')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/home')
    } catch (error) {
      message.error('Login failed! Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-gray-900'>
          Sign in to your account
        </h2>
        <form className='mt-8 space-y-6' onSubmit={handleLogin}>
          <div className='rounded-md shadow-sm space-y-4'>
            <input
              type='email'
              required
              className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              required
              className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${loading
              ? 'opacity-50 cursor-not-allowed'
              : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </form>
        <Link
          to='/'
          className='mt-4 w-full text-center text-blue-600 hover:text-blue-700 block'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Login

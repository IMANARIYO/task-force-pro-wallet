import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='flex-shrink-0 flex items-center'>
              <img
                src='logo512.png'
                alt='SmartWallet Logo'
                className='h-10 w-10 mr-2'
              />
            </Link>
          </div>
          <span className='text-xl font-bold text-blue-600'>SmartWallet</span>
          <div className='flex items-center space-x-4'>
            <Link
              to='/login'
              className={`${location.pathname === '/login'
                ? 'text-blue-600 font-bold'
                : 'text-gray-700'} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
            >
              Login
            </Link>
            <Link
              to='/register'
              className={`${location.pathname === '/register'
                ? 'bg-blue-700'
                : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md text-sm font-medium`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

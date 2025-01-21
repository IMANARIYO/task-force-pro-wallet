import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, Input, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const LoginModal = ({ visible, onCancel, onLogin, loading }) =>
  <Modal title='Login' visible={visible} onCancel={onCancel} footer={null}>
    <Form
      name='login'
      initialValues={{ remember: true }}
      onFinish={onLogin}
      layout='vertical'
    >
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  </Modal>

const RegisterModal = ({ visible, onCancel, onRegister, loading }) =>
  <Modal title='Register' visible={visible} onCancel={onCancel} footer={null}>
    <Form name='register' onFinish={onRegister} layout='vertical'>
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  </Modal>

const App = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async values => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        values
      )

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/home')
      setIsLoginModalVisible(false)
    } catch (error) {
      message.error('Login failed!')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async values => {
    try {
      setLoading(true)
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
        values
      )

      setIsRegisterModalVisible(false)
      setIsLoginModalVisible(true)
    } catch (error) {
      message.error('Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-6'>Welcome to Smart Wallet</h1>
      <div className='space-x-4'>
        <Button type='primary' onClick={() => setIsLoginModalVisible(true)}>
          Login
        </Button>
        <Button type='default' onClick={() => setIsRegisterModalVisible(true)}>
          Register
        </Button>
      </div>

      <LoginModal
        visible={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
        loading={loading}
      />

      <RegisterModal
        visible={isRegisterModalVisible}
        onCancel={() => setIsRegisterModalVisible(false)}
        onRegister={handleRegister}
        loading={loading}
      />
    </div>
  )
}

export default App

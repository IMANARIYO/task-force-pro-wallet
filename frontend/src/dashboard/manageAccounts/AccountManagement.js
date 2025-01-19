import AccountModal from "./AccountModal";
import AccountTable from "./AccountTable";
import DefaultLayout from "../../components/DefaultLayout";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/apiConfig";
import { Button, message } from "antd";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [accountToUpdate, setAccountToUpdate] = useState(null)
  const [isAdd, setIsAdd] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/accounts`
      )
      setAccounts(response.data)
    } catch (error) {
      message.error('Failed to fetch accounts')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setAccountToUpdate(null)
    setIsAdd(true)
    setIsUpdate(false)
    setIsModalVisible(true)
  }

  const handleEdit = account => {
    setAccountToUpdate(account)
    setIsAdd(false)
    setIsUpdate(true)
    setIsModalVisible(true)
  }

  const handleDelete = async id => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/accounts/delete/${id}`
      )
      message.success('Account deleted successfully')
      fetchAccounts()
    } catch (error) {
      message.error('Failed to delete account')
    }
  }

  const handleModalFinish = async values => {
    try {
      let response
      if (isUpdate) {
        response = await axiosInstance.put(
          `${process.env
            .REACT_APP_BACKEND_URL}/api/accounts/edit/${accountToUpdate._id}`,
          values
        )
      } else {
        response = await axiosInstance.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/accounts/add`,
          values
        )
      }
      fetchAccounts()
      setIsModalVisible(false)
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: backendError } = error.response.data

        message.error(backendError || 'Failed to save account')
      } else {
        message.error('Failed to save account')
      }
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <DefaultLayout>
      <Button type='primary' onClick={handleAdd}>
        Add Account
      </Button>
      <AccountTable
        accounts={accounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AccountModal
        isModalVisible={isModalVisible}
        isAdd={isAdd}
        isUpdate={isUpdate}
        accountToUpdate={accountToUpdate}
        onCancel={handleCancel}
        onFinish={handleModalFinish}
      />
    </DefaultLayout>
  )
}

export default AccountManagement

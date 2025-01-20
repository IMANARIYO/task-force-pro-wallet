import AccountModal from './AccountModal'
import AccountTable from './AccountTable'
import DefaultLayout from '../../components/DefaultLayout'
import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import {
  addAccount,
  deleteAccount,
  editAccount,
  fetchAccounts
} from '../../services/accountsService'

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [accountToUpdate, setAccountToUpdate] = useState(null)
  const [isAdd, setIsAdd] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    fetchAccountsData()
  }, [])

  const fetchAccountsData = async () => {
    setLoading(true)
    const { success, data, error } = await fetchAccounts()
    setLoading(false)

    if (success) {
      setAccounts(data)
    } else {
      message.error(error)
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
    const { success, message: successMessage, error } = await deleteAccount(id)

    if (success) {
      message.success(successMessage)
      fetchAccountsData()
    } else {
      message.error(error)
    }
  }

  const handleModalFinish = async values => {
    let response
    if (isUpdate) {
      response = await editAccount(accountToUpdate._id, values)
    } else {
      response = await addAccount(values)
    }

    if (response.success) {
      fetchAccountsData()
      setIsModalVisible(false)
    } else {
      message.error(response.error || 'Failed to save account')
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

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";

const { Option } = Select

const AccountModal = ({
  isModalVisible,
  isAdd,  
  isUpdate,  
  accountToUpdate,  
  onCancel,
  onFinish
}) => {
  const [form] = Form.useForm()  
  const [loading, setLoading] = useState(false)

   
  useEffect(
    () => {
      if (isUpdate && accountToUpdate) {
        form.setFieldsValue({
          name: accountToUpdate.name,
          type: accountToUpdate.type,
          balance: accountToUpdate.balance,
          limit: accountToUpdate.limit || accountToUpdate.balance  
        })
      } else if (isAdd) {
        form.resetFields()  
      }
    },
    [isUpdate, isAdd, accountToUpdate, form]
  )

   
  const handleSubmit = async values => {
     
    if (values.limit > values.balance) {
      message.error('Limit cannot exceed the balance!')
      return
    }

    setLoading(true)

     
    try {
       

      onFinish(values)  
      message.success(
        isAdd ? 'Account added successfully!' : 'Account updated successfully!'
      )
    } catch (error) {
      message.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

   
  const handleBlur = e => {
    if (!e.target.value) {
      e.target.value = accountToUpdate ? accountToUpdate.balance : 0
    }
  }

  return (
    <Modal
      title={
        isAdd ? 'Add Account' : isUpdate ? 'Edit Account' : 'Account Details'
      }
      visible={isModalVisible}
      onCancel={onCancel}
      footer={null}  
    >
      <Form
        form={form}
        initialValues={
          isAdd ? { name: '', type: '', balance: 0, limit: '' } : {}
        }
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[
            { required: true, message: 'Please input the account name!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Type'
          name='type'
          rules={[
            { required: true, message: 'Please select the account type!' }
          ]}
        >
          <Select>
            <Option value='Bank'>Bank</Option>
            <Option value='Mobile Money'>Mobile Money</Option>
            <Option value='Cash'>Cash</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Balance'
          name='balance'
          rules={[
            { required: true, message: 'Please input the account balance!' }
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Limit' name='limit'>
          <Input
            type='number'
            placeholder='i will not use more than'
            onBlur={handleBlur}  
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} block>
            {isAdd ? 'Add' : isUpdate ? 'Update' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountModal

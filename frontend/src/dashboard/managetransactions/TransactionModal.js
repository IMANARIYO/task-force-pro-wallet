import React from "react";
import { Button, Form, Input, Modal, Select } from "antd";

const { Option } = Select

const TransactionModal = ({
  visible,
  onCancel,
  onOk,
  currentTransaction,
  accounts,
  categories
}) => {
  return (
    <Modal
      title={currentTransaction ? 'Edit Transaction' : 'Add Transaction'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form initialValues={currentTransaction} onFinish={onOk}>
        <Form.Item
          label='Type'
          name='type'
          rules={[
            { required: true, message: 'Please select the transaction type!' }
          ]}
        >
          <Select>
            <Option value='Income'>Income</Option>
            <Option value='Expense'>Expense</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Amount'
          name='amount'
          type='number'
          rules={[
            { required: true, message: 'Please input the transaction amount!' }
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Account'
          name='account'
          rules={[{ required: true, message: 'Please select the account!' }]}
        >
          <Select>
            {accounts.map(account =>
              <Option key={account._id} value={account._id}>
                {account.name}
              </Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label='Category'
          name='category'
          rules={[
            { required: true, message: 'Please select a transaction category!' }
          ]}
        >
          <Select placeholder='Select a category'>
            {categories.length > 0
              ? categories.map(category =>
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
                )
              : <Option disabled>No categories available</Option>}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {currentTransaction ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TransactionModal

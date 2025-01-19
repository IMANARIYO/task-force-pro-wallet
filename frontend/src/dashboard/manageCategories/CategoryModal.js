import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";

const CategoryModal = ({ show, onClose, onSave, category }) => {
 
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(
    () => {
      if (category) {
        form.setFieldsValue({
          name: category.name,
          budgetAmount: category.budgetAmount
        })
      } else {
        form.resetFields()
      }
    },
    [category, form]
  )

  const handleSubmit = async values => {
    if (values.budgetAmount <= 0) {
      message.error('Budget amount must be greater than zero!')
      return
    }

    setLoading(true)
    try {
      console.log('Submitted values:', values)
      await onSave(values)
      message.success(
        category
          ? 'Category updated successfully!'
          : 'Category added successfully!'
      )
    } catch (error) {
      message.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={category ? 'Update Category' : 'Add Category'}
      visible={show}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        initialValues={{ name: '', budgetAmount: 0 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Category Name'
          name='name'
          rules={[
            { required: true, message: 'Please input the category name!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Budget Amount'
          name='budgetAmount'
          rules={[
            { required: true, message: 'Please input the budget amount!' }
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} block>
            {category ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CategoryModal

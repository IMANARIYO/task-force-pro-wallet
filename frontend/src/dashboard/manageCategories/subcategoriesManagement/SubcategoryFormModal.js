import React from "react";
import { Button, Input, Modal } from "antd";

const SubcategoryFormModal = ({
  subcategoryData,
  setSubcategoryData,
  onSubmit,
  onClose,
  isEdit
}) => {
  return (
    <Modal
      title={isEdit ? 'Edit Subcategory' : 'Add Subcategory'}
      visible
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={onSubmit}>
          {isEdit ? 'Update' : 'Add'}
        </Button>
      ]}
      maskClosable={false}
      centered
    >
      <div className='space-y-4'>
        <div>
          <label>Subcategory Name</label>
          <Input
            placeholder='Subcategory Name'
            value={subcategoryData.name}
            onChange={e =>
              setSubcategoryData({ ...subcategoryData, name: e.target.value })}
          />
        </div>

        <div>
          <label>Budget Amount</label>
          <Input
            placeholder='Budget Amount'
            type='number'
            value={subcategoryData.budgetAmount}
            onChange={e =>
              setSubcategoryData({
                ...subcategoryData,
                budgetAmount: parseFloat(e.target.value) || 0
              })}
          />
        </div>

        <div>
          <label>Current Spending</label>
          <Input
            placeholder='Current Spending'
            type='number'
            value={subcategoryData.currentSpending}
            onChange={e =>
              setSubcategoryData({
                ...subcategoryData,
                currentSpending: parseFloat(e.target.value) || 0
              })}
          />
        </div>

        <div>
          <label>Description</label>
          <Input.TextArea
            placeholder='Description'
            value={subcategoryData.description}
            onChange={e =>
              setSubcategoryData({
                ...subcategoryData,
                description: e.target.value
              })}
            rows={4}
          />
        </div>
      </div>
    </Modal>
  )
}

export default SubcategoryFormModal

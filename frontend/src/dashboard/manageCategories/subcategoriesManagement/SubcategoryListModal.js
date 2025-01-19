import React from "react";
import { Button, Modal, Table } from "antd";

const SubcategoryListModal = ({
  subcategories,
  subcatListModalVisible,
  setSubcatListModalVisible,
  handleAddNewSubcategory,
  subcategoryColumns
}) => {
  return (
    <Modal
      title='Subcategories'
      visible={subcatListModalVisible}
      onCancel={() => setSubcatListModalVisible(false)}
      width={1000}
      footer={[
        <Button key='add' type='primary' onClick={handleAddNewSubcategory}>
          Add New Subcategory
        </Button>,
        <Button key='close' onClick={() => setSubcatListModalVisible(false)}>
          Close
        </Button>
      ]}
    >
      <Table
        columns={subcategoryColumns}
        dataSource={subcategories}
        rowKey='_id'
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  )
}

export default SubcategoryListModal

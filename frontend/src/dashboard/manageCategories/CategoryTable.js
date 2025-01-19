import React from "react";
import { Button, Table } from "antd";

const CategoryTable = ({ categories, onEdit, onDelete, onView }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Budget Amount",
      dataIndex: "budgetAmount",
      key: "budgetAmount",
    },
    {
      title: "Current Spending",
      dataIndex: "currentSpending",
      key: "currentSpending",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => onView(record)} type="primary" style={{ marginRight: 8 }}>
            View
          </Button>
          <Button onClick={() => onEdit(record)} type="default" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button onClick={() => onDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={categories} rowKey="_id" />;
};

export default CategoryTable;

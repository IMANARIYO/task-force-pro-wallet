import React from "react";
import { Button, Table } from "antd";

const TransactionsTable = ({ transactions, loading, onEdit, onDelete,categories }) => {
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Account',
      dataIndex: ['account', 'name'],
      key: 'account',
    },
     
     
     
     
     
       {
      title: 'Category',
      dataIndex:'categoryname',
      key: 'categoryname',
    },
    
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      
      loading={loading}
      rowKey="_id"
    />
  );
};

export default TransactionsTable;

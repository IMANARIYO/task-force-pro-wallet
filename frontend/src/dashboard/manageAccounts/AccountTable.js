import React from "react";
import { Button, Table } from "antd";

const AccountTable = ({ accounts, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Limit',
      dataIndex: 'limit',
      key: 'limit',
      render: (text) => (text === Infinity ? 'Unlimited' : text),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record._id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={accounts} rowKey="_id" />;
};

export default AccountTable;

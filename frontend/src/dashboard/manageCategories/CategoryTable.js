import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

const CategoryTable = ({ categories, onEdit, onDelete, onView }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

   
  useEffect(() => {
    setFilteredData(Array.isArray(categories) ? categories : []);
  }, [categories]);

   
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

     
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredCategories);
  };

   
  const handleReset = () => {
    setSearchText("");
    setFilteredData(categories);
  };

   
  const totalBudgetAmount = Array.isArray(filteredData)
    ? filteredData.reduce((total, category) => total + category.budgetAmount, 0)
    : 0;
  const totalAccumulatedFunds = Array.isArray(filteredData)
    ? filteredData.reduce((total, category) => total + category.accumulatedfunds, 0)
    : 0;
  const totalCurrentSpending = Array.isArray(filteredData)
    ? filteredData.reduce((total, category) => total + category.currentSpending, 0)
    : 0;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search Name`}
            value={searchText}
            onChange={handleSearch}
            onPressEnter={handleSearch}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </div>
      ),
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Budget Amount",
      dataIndex: "budgetAmount",
      key: "budgetAmount",
      sorter: (a, b) => a.budgetAmount - b.budgetAmount,
      render: (text) => `RWF ${text.toFixed(2)}`,
    },
    {
      title: "Accumulated Funds",
      dataIndex: "accumulatedfunds",
      key: "accumulatedfunds",
      sorter: (a, b) => a.accumulatedfunds - b.accumulatedfunds,
      render: (text) => `RWF ${text.toFixed(2)}`,
    },
    {
      title: "Current Spending",
      dataIndex: "currentSpending",
      key: "currentSpending",
      sorter: (a, b) => a.currentSpending - b.currentSpending,
      render: (text) => `RWF ${text.toFixed(2)}`,
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        summary={() => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={1}>Total</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>{`RWF ${totalBudgetAmount.toFixed(2)}`}</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>{`RWF ${totalAccumulatedFunds.toFixed(2)}`}</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}>{`RWF ${totalCurrentSpending.toFixed(2)}`}</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </>
  );
};

export default CategoryTable;

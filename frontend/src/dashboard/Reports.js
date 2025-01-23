import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/apiConfig";
import { Button, DatePicker, Input, Select, Table, message } from "antd";
import { fetchTransactions } from "../services/transactionsServices";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("descend");

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, typeFilter, transactions]);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response =await fetchTransactions()
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      message.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

     
    if (typeFilter !== "all") {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

     
    if (searchText) {
      filtered = filtered.filter(transaction => 
        transaction.account.name.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.categoryname.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.amount.toString().includes(searchText)
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleDateFilter = (dates) => {
    if (!dates || dates.length === 0) {
      applyFilters();
    } else {
      const [startDate, endDate] = dates;
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
      setFilteredTransactions(filtered);
    }
  };

  const calculateTotals = (transactions) => {
    return transactions.reduce(
      (acc, transaction) => {
        const amount = transaction.amount;
        if (transaction.type === "Income") {
          acc.totalCredit += amount;
        } else if (transaction.type === "Expense") {
          acc.totalDebit += amount;
        }
        acc.netAmount += transaction.type === "Income" ? amount : -amount;
        return acc;
      },
      { totalCredit: 0, totalDebit: 0, netAmount: 0 }
    );
  };

  const exportToExcel = () => {
     
    const totals = calculateTotals(filteredTransactions);
    
    const exportData = filteredTransactions.map((transaction) => ({
      Date: new Date(transaction.date).toLocaleDateString(),
      Amount: transaction.amount.toFixed(2),
      Type: transaction.type,
      AccountName: transaction.account.name,
      CategoryName: transaction.categoryname,
      Budget: transaction.category.budgetAmount.toFixed(2),
      AccountLimit: transaction.account.limit.toFixed(2),
      AccountBalance: transaction.account.balance.toFixed(2),
    }));

    const ws = XLSX.utils.json_to_sheet([]);
    
     
    XLSX.utils.sheet_add_aoa(ws, [
      ["Transaction Report"],
      [],
      ["Generated Date:", new Date().toLocaleDateString()],
      ["Filter Type:", typeFilter === "all" ? "All Types" : typeFilter],
      ["Search Criteria:", searchText || "None"],
      ["Sort By:", `${sortField} (${sortOrder === "ascend" ? "Ascending" : "Descending"})`],
      [],
    ]);

     
    XLSX.utils.sheet_add_json(ws, exportData, {
      origin: "A8",
      skipHeader: false,
    });

     
    const dataLength = exportData.length;
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [],
        ["Summary"],
        ["Total Income:", `RWF ${totals.totalCredit.toFixed(2)}`],
        ["Total Expenses:", `RWF ${totals.totalDebit.toFixed(2)}`],
        ["Net Amount:", `RWF ${totals.netAmount.toFixed(2)}`],
      ],
      { origin: `A${dataLength + 10}` }
    );

     
    const cols = [
      { wch: 12 },  
      { wch: 12 },  
      { wch: 10 },  
      { wch: 20 },  
      { wch: 20 },  
      { wch: 15 },  
      { wch: 15 },  
      { wch: 15 },  
    ];
    ws["!cols"] = cols;

     
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        
         
        if (R === 0) {
          ws[cell_ref].s = {
            font: { bold: true, sz: 16 },
            fill: { fgColor: { rgb: "4F81BD" } },
            font: { color: { rgb: "FFFFFF" } },
          };
        }
         
        else if (R >= 3 && R <= 5) {
          ws[cell_ref].s = {
            font: { bold: C === 0 },
            fill: { fgColor: { rgb: "E9EEF6" } },
          };
        }
         
        else if (R === 7) {
          ws[cell_ref].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "CCCCCC" } },
            alignment: { horizontal: "center" },
          };
        }
         
        else if (R >= dataLength + 10) {
          ws[cell_ref].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "E9EEF6" } },
          };
        }
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, `Transaction_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `RWF ${amount.toFixed(2)}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Income", value: "Income" },
        { text: "Expense", value: "Expense" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Account Name",
      dataIndex: "account",
      key: "account",
      sorter: (a, b) => a.account.name.localeCompare(b.account.name),
      render: (account) => account.name,
    },
    {
      title: "Category Name",
      dataIndex: "categoryname",
      key: "categoryname",
      sorter: (a, b) => a.categoryname.localeCompare(b.categoryname),
    },
    {
      title: "Category Budget",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.budgetAmount - b.category.budgetAmount,
      render: (category) => `RWF ${category?.budgetAmount.toFixed(2)}`,
    },
    {
      title: "Account Limit",
      dataIndex: "account",
      key: "accountlimit",
      sorter: (a, b) => a.account.limit - b.account.limit,
      render: (account) => `RWF ${account.limit.toFixed(2)}`,
    },
    {
      title: "Account Balance",
      dataIndex: "account",
      key: "accountbalance",
      sorter: (a, b) => a.account.balance - b.account.balance,
      render: (account) => `RWF ${account.balance.toFixed(2)}`,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setSortField(sorter.field);
    setSortOrder(sorter.order);
  };

  return (
    <div>
       <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Transaction Report</h2>
          <div className="space-x-4">
            <RangePicker onChange={handleDateFilter} className="w-64" />
            <Button type="primary" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <Search
            placeholder="Search by account, category or amount"
            allowClear
            className="w-80"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            defaultValue="all"
            className="w-40"
            onChange={setTypeFilter}
          >
            <Option value="all">All Types</Option>
            <Option value="Income">Income</Option>
            <Option value="Expense">Expense</Option>
          </Select>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {filteredTransactions.length > 0 && (
            <>
              <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="font-semibold">Total Income</h3>
                <p className="text-xl">
                  RWF {calculateTotals(filteredTransactions).totalCredit.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-red-100 rounded-lg">
                <h3 className="font-semibold">Total Expenses</h3>
                <p className="text-xl">
                  RWF {calculateTotals(filteredTransactions).totalDebit.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="font-semibold">Net Amount</h3>
                <p className="text-xl">
                  RWF {calculateTotals(filteredTransactions).netAmount.toFixed(2)}
                </p>
              </div>
            </>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          loading={loading}
          rowKey="_id"
          onChange={handleTableChange}
        />
       </>
    </div>
  );
};

export default Reports;

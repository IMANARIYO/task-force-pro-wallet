import * as XLSX from "xlsx";
import DefaultLayout from "../components/DefaultLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, DatePicker, Table, message } from "antd";

const { RangePicker } = DatePicker;

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
  
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/transactions`
      );
      setTransactions(response.data);
        console.log("Fetching transactions____+++",response.data)
      setFilteredTransactions(response.data);
    } catch (error) {
      message.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (dates) => {
    if (!dates || dates.length === 0) {
      setFilteredTransactions(transactions);
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
      // Adjusting based on your schema
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
    // Calculate totals
    const totals = calculateTotals(filteredTransactions);
    
    // Prepare data for export
    const exportData = filteredTransactions.map((transaction) => ({
      Date: new Date(transaction.date).toLocaleDateString(),
      Amount: transaction.amount.toFixed(2),
      Type: transaction.type === "credit" ? "Credit" : "Debit",
      AccountName: transaction.account.name,
      CategoryName: transaction.categoryname,
      Budget: transaction.category.budgetAmount.toFixed(2),
      AccountLimit: transaction.account.limit.toFixed(2),
      AccountBalance: transaction.account.balance.toFixed(2),
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet([]);
    
    // Add title
    XLSX.utils.sheet_add_aoa(ws, [
      ["Transaction Report"],
      [],
      ["Generated Date:", new Date().toLocaleDateString()],
      [],
    ]);

    // Add data with headers
    XLSX.utils.sheet_add_json(ws, exportData, {
      origin: "A5",
      skipHeader: false,
    });

    // Add totals
    const dataLength = exportData.length;
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [],
        ["Summary"],
        ["Total Credits:", `RWF ${totals.totalCredit.toFixed(2)}`],
        ["Total Debits:", `RWF ${totals.totalDebit.toFixed(2)}`],
        ["Net Amount:", `RWF ${totals.netAmount.toFixed(2)}`],
      ],
      { origin: `A${dataLength + 7}` }
    );

    // Set column widths
    const cols = [
      { wch: 12 }, // Date
      { wch: 12 }, // Amount
      { wch: 8 },  // Type
      { wch: 15 }, // Account Name
      { wch: 15 }, // Category Name
      { wch: 12 }, // Budget
      { wch: 12 }, // Account Limit
      { wch: 12 }, // Account Balance
    ];
    ws["!cols"] = cols;

    // Apply styles
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        
        // Style headers
        if (R === 0 || R === 5) {
          ws[cell_ref].s = {
            font: { bold: true, sz: R === 0 ? 14 : 12 },
            fill: { fgColor: { rgb: "CCCCCC" } },
          };
        }
        
        // Style summary section
        if (R >= dataLength + 7) {
          ws[cell_ref].s = {
            font: { bold: true },
          };
        }
      }
    }

    // Create workbook and export
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, `Transaction_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `RWF ${amount.toFixed(2)}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (type === "credit" ? "Credit" : "Debit"),
    },
    {
      title: "Account Name",
      dataIndex: "account",
      key: "account",
      render: (account) => account.name,
    },
    {
      title: "Category Name",
      dataIndex: "categoryname",
      key: "categoryname",
    },
    {
      title: " category Budget",
      dataIndex: "category",
      key: "category",
      render: (category) => `RWF ${category.budgetAmount.toFixed(2)}`,
    },
    {
      title: "Account Limit",
      dataIndex: "account",
      key: "accountlimit",
      render: (account) => `RWF ${account.limit.toFixed(2)}`,
    },
    {
      title: "Account Balance",
      dataIndex: "account",
      key: "accountbalance",
      render: (account) => `RWF ${account.balance.toFixed(2)}`,
    },
  ];

  return (
    <div>
      <DefaultLayout>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Transaction Report</h2>
          <div className="space-x-4">
            <RangePicker onChange={handleDateFilter} />
            <Button type="primary" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {filteredTransactions.length > 0 && (
            <>
              <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="font-semibold">Total Credits</h3>
                <p className="text-xl">
                  RWF {calculateTotals(filteredTransactions).totalCredit.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-red-100 rounded-lg">
                <h3 className="font-semibold">Total Debits</h3>
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
        />
      </DefaultLayout>
    </div>
  );
};

export default Reports;
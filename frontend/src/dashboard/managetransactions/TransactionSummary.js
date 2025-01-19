import React from "react";

const TransactionsSummary = ({ totalIncome, totalExpenses }) => {
  return (
    <div>
      <h3>
        Total Income: {totalIncome}
      </h3>
      <h3>
        Total Expenses: {totalExpenses}
      </h3>
    </div>
  )
}

export default TransactionsSummary

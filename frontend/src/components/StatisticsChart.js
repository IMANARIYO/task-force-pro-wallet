import React, { useEffect, useState } from "react";
import axios from "axios";
import { CategoryScale, Chart as ChartJS, LineController, LineElement, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale);

const StatisticsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/summary/statistics/last4weeks`);

      const labels = data.map((item) => `Week ${item._id}`);
      const incomeData = data.map((item) => item.data.find((d) => d.type === 'Income')?.total || 0);
      const expensesData = data.map((item) => item.data.find((d) => d.type === 'Expense')?.total || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            fill: true,
          },
          {
            label: 'Expenses',
            data: expensesData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatisticsChart;

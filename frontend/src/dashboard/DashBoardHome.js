import DefaultLayout from "../components/DefaultLayout";
import PieChart from "../components/PieChart";
import React, { useEffect, useState } from "react";
import StatisticsChart from "../components/StatisticsChart";
import axios from "axios";
import { Button, Card, Col, Row, Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography

const DashBoardHome = () => {
  const [data, setData] = useState({
    income: 0,
    expenses: 0,
    totalIncome: 0,
    totalExpenses: 0,
    transactions: [],
    pieChartData: []
  })

  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const { data: summary } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/summary/summary`
      )
      const { data: transactions } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/summary/transactions/recent`
      )
      setData({
        income: summary.monthlyIncome,
        expenses: summary.monthlyExpenses,
        totalIncome: summary.totalIncome,
        totalExpenses: summary.totalExpenses,
        transactions,
        pieChartData: summary.pieChartData
      })
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleNavigate = path => {
    navigate(path)
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Category',
      dataIndex: 'categoryname',
      key: 'category'
    }
  ]

  return (
    <DefaultLayout>
      <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Space>
              <Button
                type='primary'
                onClick={() => handleNavigate('/accounts')}
              >
                Add Account
              </Button>
              <Button
                type='primary'
                onClick={() => handleNavigate('/transactions')}
              >
                Add Transaction
              </Button>
              <Button type='default' onClick={() => handleNavigate('/reports')}>
                Go to Reports
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={6}>
            <Card style={{ height: '120px' }}>
              <Title level={5}>Income (This Month)</Title>
              <p>
                RWF {data.income}
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '120px' }}>
              <Title level={5}>Expenses (This Month)</Title>
              <p>
                RWF {data.expenses}
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '120px' }}>
              <Title level={5}>Total Income</Title>
              <p>
                RWF {data.totalIncome}
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: '120px' }}>
              <Title level={5}>Total Expenses</Title>
              <p>
                RWF{data.totalExpenses}
              </p>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={16}>
            <Card>
              <Title level={5}>Income & Expenses Statistics</Title>
              <StatisticsChart data={data.transactions} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={5}>Expenses by Category</Title>
              <PieChart data={data.pieChartData} />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card>
              <Title level={5}>Recent Transactions</Title>
              <Table
                dataSource={data.transactions}
                columns={columns}
                rowKey={record => record.date + record.category}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
        
      </div>
    </DefaultLayout>
  )
}

export default DashBoardHome

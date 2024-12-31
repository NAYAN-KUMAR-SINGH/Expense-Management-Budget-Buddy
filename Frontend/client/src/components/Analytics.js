import React from "react";
import { Progress, Typography, Card, Col, Row } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const Analytics = ({ allTransection }) => {
  // Category list
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // Total transaction counts
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );

  // Total turnover calculations
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Pie Chart Data
  const transactionData = [
    { name: "Income", value: totalIncomeTransactions.length },
    { name: "Expense", value: totalExpenseTransactions.length },
  ];

  const turnoverData = [
    { name: "Income", value: totalIncomeTurnover },
    { name: "Expense", value: totalExpenseTurnover },
  ];

  return (
    <>
      <Row gutter={[16, 24]} className="m-3">
        {/* Total Transactions Section */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            hoverable
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Typography.Title level={4}>Total Transactions</Typography.Title>
            {/* Removed the number below the pie chart */}
            <div className="d-flex flex-column align-items-center mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={transactionData}
                    dataKey="value"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell fill="#00C853" />
                    <Cell fill="#D50000" />
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Typography.Text className="text-success">
              Income: {totalIncomeTransactions.length}
            </Typography.Text>
            <br />
            <Typography.Text className="text-danger">
              Expense: {totalExpenseTransactions.length}
            </Typography.Text>
          </Card>
        </Col>

        {/* Total Turnover Section */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            hoverable
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Typography.Title level={4}>Total Turnover</Typography.Title>
            {/* Removed the number below the pie chart */}
            <div className="d-flex flex-column align-items-center mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={turnoverData}
                    dataKey="value"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    <Cell fill="#00C853" />
                    <Cell fill="#D50000" />
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Typography.Text className="text-success">
              Income: {totalIncomeTurnover}
            </Typography.Text>
            <br />
            <Typography.Text className="text-danger">
              Expense: {totalExpenseTurnover}
            </Typography.Text>
          </Card>
        </Col>

        {/* Categorywise Income */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            hoverable
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Typography.Title level={4}>Categorywise Income</Typography.Title>
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "income" && transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div key={category} className="mt-2">
                    <Typography.Text strong>{category}</Typography.Text>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      strokeWidth={20}
                      strokeColor="linear-gradient(90deg, #00C853, #76FF03)"
                    />
                  </div>
                )
              );
            })}
          </Card>
        </Col>

        {/* Categorywise Expense */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={false}
            hoverable
            style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Typography.Title level={4}>Categorywise Expense</Typography.Title>
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "expense" && transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div key={category} className="mt-2">
                    <Typography.Text strong>{category}</Typography.Text>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      strokeWidth={20}
                      strokeColor="linear-gradient(90deg, #D50000, #FF3D00)"
                    />
                  </div>
                )
              );
            })}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Analytics;

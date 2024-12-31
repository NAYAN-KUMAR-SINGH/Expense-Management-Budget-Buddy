import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker, Button, Card } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the jsPDF autotable plugin
import "../styles/homePage.css";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [goal, setGoal] = useState(localStorage.getItem("goal") || 0); // Spending goal state
  const [goalExceededModalVisible, setGoalExceededModalVisible] = useState(false); // State for the goal exceeded modal
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [transactionValues, setTransactionValues] = useState(null); // Store form values
  const [incomeExceededModalVisible, setIncomeExceededModalVisible] = useState(false); // Modal for income exceeded
  
  // Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            style={{ color: "#1890ff", cursor: "pointer" }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  // Fetch Transactions and Update Dynamic Values
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);

        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });

        setLoading(false);
        setAllTransection(res.data.transections);

        // Calculate totals dynamically
        const income = res.data.totalIncome;
        const expense = res.data.totalExpense;
        setTotalIncome(income);
        setTotalExpense(expense);
        setRemainingBalance(income - expense);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch transactions");
      }
    };

    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // Handle Delete
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transections/delete-transection", {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete transaction");
    }
  };

  // Handle Form Submit (Add/Edit Transaction)
  const handleSubmit = async (values) => {
    const newExpense = values.amount; // Get the new expense amount
    const updatedExpense = totalExpense + newExpense; // Update the total expense dynamically

    // Check if the user is trying to add an expense and if it exceeds the goal
    if (values.type === "expense" && updatedExpense > goal && goal !== 0) {
      // Show modal if spending goal exceeded
      setTransactionValues(values); // Store form values
      setGoalExceededModalVisible(true);
      return; // Prevent further execution until user responds to modal
    }

    // Check if the user is trying to add an expense that exceeds income
    if (values.type === "expense" && updatedExpense > totalIncome) {
      setTransactionValues(values); // Store form values
      setIncomeExceededModalVisible(true);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }

      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  // Handle Goal Change (Input Field)
  const handleGoalChange = (e) => {
    const newGoal = e.target.value;
    setGoal(newGoal);
    localStorage.setItem("goal", newGoal);  // Persist goal in localStorage
  };

  const handleGoalExceededModalClose = () => {
    setGoalExceededModalVisible(false); // Close modal
  };

  const handleGoalExceededModalContinue = () => {
    // Proceed with saving the transaction even if the goal is exceeded
    handleSubmit(transactionValues);  // Use the stored values
    setGoalExceededModalVisible(false); // Close the modal
  };

  const handleIncomeExceededModalClose = () => {
    setIncomeExceededModalVisible(false); // Close modal
  };

  const handleIncomeExceededModalContinue = () => {
    // Proceed with saving the transaction even if it exceeds income
    handleSubmit(transactionValues);  // Use the stored values
    setIncomeExceededModalVisible(false); // Close the modal
  };

  // Navigate to GoalPage
  const navigateToGoalPage = () => {
    navigate("/goal"); // Navigate to GoalPage
  };

  // Export to PDF Function
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Prepare your table data
    const tableData = allTransection.map((transaction) => [
      moment(transaction.date).format("YYYY-MM-DD"),
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.refrence,
    ]);

    // Add a title
    doc.text("Transaction History", 14, 10);

    // Create the table in the PDF
    doc.autoTable({
      head: [["Date", "Amount", "Type", "Category", "Reference"]],
      body: tableData,
      startY: 20, // Position to start the table
    });

    // Save the PDF
    doc.save("transaction-history.pdf");
  };

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Set Spending Goal Section */}
      <div className="goal-input">
        <h6>Set Your Spending Goal</h6>
        <Input
          type="number"
          placeholder="Enter your goal (₹)"
          value={goal}
          onChange={handleGoalChange} // Update the goal
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-card">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>

        <div className="filter-card">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"}`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"}`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <div>
          <Button type="primary" onClick={() => setShowModal(true)} icon={<EditOutlined />}>
            Add New
          </Button>
          {/* Add PDF Download Button */}
          <Button type="default" onClick={exportToPDF} icon={<EditOutlined />} style={{ marginLeft: "10px" }}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary">
        <Card className="summary-box" bordered={false}>
          <h5>Total Income</h5>
          <p>₹{totalIncome.toLocaleString()}</p>
        </Card>
        <Card className="summary-box" bordered={false}>
          <h5>Total Expense</h5>
          <p>₹{totalExpense.toLocaleString()}</p>
        </Card>
        <Card className="summary-box" bordered={false}>
          <h5>Remaining Balance</h5>
          <p>₹{remainingBalance.toLocaleString()}</p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      {/* Modal for Adding/Editing Transaction */}
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="transaction-modal"
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="refrence">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="submit-btn">
            {editable ? "Update Transaction" : "Add Transaction"}
          </Button>
        </Form>
      </Modal>

      {/* Goal Exceeded Modal */}
      <Modal
        title="Goal Exceeded"
        visible={goalExceededModalVisible}
        onOk={handleGoalExceededModalContinue}
        onCancel={handleGoalExceededModalClose}
        okText="Continue"
        cancelText="Cancel"
      >
        <p>You are about to exceed your spending goal!</p>
        <p>Do you still want to proceed with this transaction?</p>
      </Modal>

      {/* Income Exceeded Modal */}
      <Modal
        title="Income Exceeded"
        visible={incomeExceededModalVisible}
        onOk={handleIncomeExceededModalContinue}
        onCancel={handleIncomeExceededModalClose}
        okText="Continue"
        cancelText="Cancel"
      >
        <p>You are about to exceed your income!</p>
        <p>Do you still want to proceed with this transaction?</p>
      </Modal>
    </Layout>
  );
};

export default HomePage;

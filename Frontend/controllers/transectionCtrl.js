const transectionModel = require("../models/transectionModel");
const moment = require("moment");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type, userid } = req.body;

    // Constructing the filter object based on frequency and type
    let filter = { userid };

    if (frequency !== "custom") {
      // If not 'custom', filter based on the provided frequency (7, 30, 365 days)
      filter.date = {
        $gt: moment().subtract(Number(frequency), "days").toDate(),
      };
    } else if (selectedDate && selectedDate.length === 2) {
      // If 'custom', use the provided date range
      filter.date = {
        $gte: selectedDate[0],
        $lte: selectedDate[1],
      };
    }

    if (type !== "all") {
      filter.type = type; // Filter based on the type (income or expense)
    }

    // Fetch transactions from the database based on the filter
    const transections = await transectionModel.find(filter);

    // Calculate the totals dynamically
    const totalIncome = transections
      .filter((tran) => tran.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transections
      .filter((tran) => tran.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const remainingBalance = totalIncome - totalExpense;

    // Return the transactions and calculated totals as a response
    res.status(200).json({
      transections,
      totalIncome,
      totalExpense,
      remainingBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transacationId },
      req.body.payload
    );
    res.status(200).send("Transaction Edited Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error editing transaction", error });
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transaction Created Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  deleteTransection,
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/GoalPage.css"; // Import the CSS file

const GoalPage = () => {
  const [income, setIncome] = useState(10000); // Example starting income
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [amountToAdd, setAmountToAdd] = useState('');
  const [goalSuccessMessage, setGoalSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [showHistory, setShowHistory] = useState(false); // Track if history is being shown
  const [goalHistory, setGoalHistory] = useState([]); // Track the history of completed goals

  const navigate = useNavigate();

  // Array of motivational thoughts
  const motivationalQuotes = [
    "Keep pushing, you're closer than you think!",
    "Every effort counts, keep going!",
    "Hard work beats talent when talent doesn't work hard.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don’t stop when you’re tired, stop when you’re done.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe in yourself and all that you are.",
    "You are capable of amazing things!",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Strive for progress, not perfection."
  ];

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedIncome = localStorage.getItem('income');
    const storedGoals = localStorage.getItem('savingsGoals');
    const storedHistory = localStorage.getItem('goalHistory');

    if (storedIncome) {
      setIncome(JSON.parse(storedIncome));
    }

    if (storedGoals) {
      setSavingsGoals(JSON.parse(storedGoals));
    }

    if (storedHistory) {
      setGoalHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save data to localStorage whenever income or savingsGoals change
  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
    localStorage.setItem('goalHistory', JSON.stringify(goalHistory));
  }, [income, savingsGoals, goalHistory]);

  // Function to create a new savings goal
  const createGoal = () => {
    if (goalName && goalAmount > 0) {
      setSavingsGoals([
        ...savingsGoals,
        { name: goalName, target: parseFloat(goalAmount), current: 0 },
      ]);
      setGoalName('');
      setGoalAmount('');
    } else {
      alert('Please provide valid goal details');
    }
  };

  // Function to add money to the selected savings goal
  const addToGoal = (index) => {
    const goal = savingsGoals[index];
    const amount = parseFloat(amountToAdd);

    if (income >= amount && amount > 0) {
      const updatedIncome = income - amount;
      const updatedGoals = [...savingsGoals];
      updatedGoals[index].current += amount;

      setIncome(updatedIncome);
      setSavingsGoals(updatedGoals);
      setAmountToAdd('');

      // Check if the goal is achieved
      if (updatedGoals[index].current >= updatedGoals[index].target) {
        setGoalSuccessMessage(`Congratulations! You can now buy the ${goal.name}!`);
        
        // Add to goal history after the goal is achieved
        setGoalHistory((prevHistory) => [
          ...prevHistory,
          { name: goal.name, achievedOn: new Date().toLocaleString() }
        ]);

        // Remove the goal after it's completed
        setTimeout(() => {
          setGoalSuccessMessage('');
          // Filter out the achieved goal and update the savingsGoals state
          setSavingsGoals((prevGoals) =>
            prevGoals.filter((_, i) => i !== index)
          );
        }, 3000);
      }
    } else {
      // Show popup with motivational quote
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setMotivationalQuote(randomQuote);
      setShowPopup(true); // Show the modal
    }
  };

  // Function to get the image based on goal name
  const getGoalImage = (goalName) => {
    if (goalName.toLowerCase().includes('bike')) {
      return 'url("https://example.com/bike-image.jpg")'; // Replace with your bike image URL
    } else if (goalName.toLowerCase().includes('house')) {
      return 'url("https://example.com/house-image.jpg")'; // Replace with your house image URL
    } else {
      return 'none'; // Default background if no specific goal
    }
  };

  // Function to toggle goal history visibility
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="goal-page-container">
      <h1>Goal Management</h1>
      <p className="income-display">Your Income: ₹{income}</p>

      {/* Create a New Goal */}
      <div className="goal-card">
        <h2>Create a New Goal</h2>
        <div className="goal-input">
          <input
            type="text"
            placeholder="Goal Name (e.g., Bike)"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="goal-input-field"
          />
        </div>
        <div className="goal-input">
          <input
            type="number"
            placeholder="Goal Target Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            className="goal-input-field"
          />
        </div>
        <button className="create-goal-btn" onClick={createGoal}>Create Goal</button>
      </div>

      {/* Display List of Savings Goals */}
      <h2>Your Goals</h2>
      {savingsGoals.length === 0 ? (
        <p>No goals created yet. Please add a goal.</p>
      ) : (
        savingsGoals.map((goal, index) => (
          <div key={index} className="goal-card" style={{ backgroundImage: getGoalImage(goal.name) }}>
            <div className="goal-card-content">
              <h3>{goal.name}</h3>
              <p>Target: ₹{goal.target} | Current: ₹{goal.current}</p>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
              {goal.current < goal.target && (
                <>
                  <input
                    type="number"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                    placeholder="Amount to Add"
                    className="amount-input"
                  />
                  <button className="add-to-goal-btn" onClick={() => addToGoal(index)}>Add to Goal</button>
                </>
              )}
              {goal.current >= goal.target && <p className="goal-achieved">Goal Achieved! 🎉</p>}
            </div>
          </div>
        ))
      )}

      {/* Display Success Message for Completed Goal */}
      {goalSuccessMessage && (
        <div className="success-message">
          <h3>{goalSuccessMessage}</h3>
        </div>
      )}

      {/* Button to Navigate Back to HomePage */}
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>

      <div className="goal-summary">
        <p>Total Goals Created: {savingsGoals.length}</p>
        <p>Total Amount for Goals Created: ₹{savingsGoals.reduce((acc, goal) => acc + goal.target, 0)}</p>
      </div>

      {/* History Button */}
      <button className="history-button" onClick={toggleHistory}>Show History</button>

      {/* Display Goal History */}
      {showHistory && (
        <div className="history-modal">
          <h2>Goal History</h2>
          {goalHistory.length === 0 ? (
            <p>No goals completed yet.</p>
          ) : (
            goalHistory.map((history, index) => (
              <div key={index} className="history-item">
                <p>{history.name} - Achieved on: {history.achievedOn}</p>
              </div>
            ))
          )}
          <button className="close-history-btn" onClick={toggleHistory}>Close History</button>
        </div>
      )}

      {/* Motivational Quote Modal */}
      {showPopup && (
        <div className="motivational-popup">
          <div className="popup-content">
            <h2>Not enough income or invalid amount</h2>
            <p className="quote">{motivationalQuote}</p>
            <button className="close-popup-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalPage;

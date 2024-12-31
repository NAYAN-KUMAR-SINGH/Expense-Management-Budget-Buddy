# **Budget-Buddy: Expense Management Application**

Budget-Buddy is a web application designed to help users manage their personal finances by tracking expenses, setting budgets, and visualizing spending patterns. This project is built with **React.js** for the frontend, **Java Spring Boot** for the backend, and **MongoDB** for the database.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Project Structure](#project-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Project Overview**

Budget-Buddy is aimed at helping users:

- Track their expenses.
- Set monthly or weekly budgets for different categories.
- Visualize spending trends and statistics.
- Stay on top of their financial goals with notifications and reports.

---

## **Tech Stack**

- **Frontend**: React.js
- **Backend**: Java Spring Boot
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Libraries**: Chart.js, Recharts (for analytics and reporting)

---

## **Features**

- **User Authentication**: Secure login and registration with JWT.
- **Expense Management**: Add, update, delete, and view expenses by category and date.
- **Budget Management**: Set budgets for different expense categories.
- **Analytics & Reporting**: View visualizations and statistics (e.g., total spending, spending trends, remaining budget).
- **Responsive Design**: Fully responsive UI for mobile and desktop users.

---

## **Installation**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (for the frontend)
- **Java JDK** (for the backend)
- **MongoDB** (local or cloud instance)

### **Frontend (React.js)**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/budget-buddy.git
   cd budget-buddy
   ```

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

   This will launch the frontend on `http://localhost:3000`.

---

### **Backend (Java Spring Boot)**

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Open the project in your IDE (e.g., IntelliJ IDEA, Eclipse).

3. Build the application:

   ```bash
   mvn clean install
   ```

4. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   This will start the backend server on `http://localhost:8080`.

---

### **MongoDB Setup**

1. Install and start MongoDB (or use a cloud instance like MongoDB Atlas).
   
2. Ensure that your MongoDB server is running on `mongodb://localhost:27017` (or update the connection string in `application.properties` in the backend).

---

## **Usage**

1. **Authentication**: 
   - Create a new account via the registration form.
   - Login using email/password to access your dashboard.

2. **Expense Management**:
   - Add, edit, or delete expenses.
   - Expenses can be categorized (e.g., food, transport, entertainment).
   
3. **Budget Management**:
   - Set a budget for each category and track how much you've spent versus the budget.

4. **Reports and Analytics**:
   - View spending trends with visual charts (pie, bar graphs, etc.).

---

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register`: Registers a new user.
- `POST /api/auth/login`: Logs in and returns a JWT token.

### **Expenses**
- `GET /api/expenses`: Fetch all expenses for the logged-in user.
- `POST /api/expenses`: Add a new expense.
- `PUT /api/expenses/{id}`: Update an existing expense.
- `DELETE /api/expenses/{id}`: Delete an expense.

### **Budgets**
- `GET /api/budgets`: Fetch all budgets for the logged-in user.
- `POST /api/budgets`: Create a new budget.
- `PUT /api/budgets/{id}`: Update an existing budget.
- `DELETE /api/budgets/{id}`: Delete a budget.

### **Analytics**
- `GET /api/analytics/spending`: Get spending summary and trends.
- `GET /api/analytics/category`: Get spending by category.

---

## **Project Structure**

### **Frontend (React.js)**

```
src/
  ├── components/         # Reusable UI components (e.g., ExpenseForm, BudgetCard)
  ├── pages/              # Different pages (Dashboard, AddExpense, Reports)
  ├── services/           # API services to interact with the backend
  ├── context/            # Context for global state management
  └── App.js              # Main App component and routing logic
```

### **Backend (Spring Boot)**

```
src/
  ├── controller/         # API controllers (ExpenseController, BudgetController)
  ├── service/            # Business logic (ExpenseService, BudgetService)
  ├── repository/         # MongoDB repository for data access
  ├── model/              # Data models (Expense, Budget, User)
  ├── security/           # Security configurations (JWT authentication)
  └── application.properties  # Application configuration (DB settings, server port)
```

---

## **Contributing**

We welcome contributions to Budget-Buddy! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Create a pull request describing your changes.

---

## **License**

This project is licensed under the MIT License.

---


---

### How to Use:
- Replace `yourusername` with your actual GitHub username or the correct repository name for cloning.
- Customize the license section or any other part of the README based on your specific needs.


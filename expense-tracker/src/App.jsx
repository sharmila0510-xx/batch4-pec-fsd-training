import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Groceries", amount: -50 },
    { id: 2, title: "Salary", amount: 2300 },
    { id: 3, title: "Phone", amount: -1000 },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  // Calculate balance
  const balance = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Calculate income
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate expense
  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  // Add new transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (!title || !amount || !type) {
      alert("Please fill all fields");
      return;
    }

    const value = Number(amount);

    const newTransaction = {
      id: Date.now(),
      title: title,
      amount: type === "income" ? value : -value,
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
    setType("");
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="app">
      <div className="expense-container">

        <h1>Expense Tracker</h1>

        {/* Balance */}
        <div className="balance-section">
          <p className="balance-title">YOUR BALANCE</p>
          <h2>
            ${balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>

        {/* Income Expense */}
        <div className="summary">
          <div className="summary-box">
            <h3>INCOME</h3>
            <p className="income">
              ${income.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="divider"></div>

          <div className="summary-box">
            <h3>EXPENSE</h3>
            <p className="expense">
              ${expense.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* History */}
        <div className="section">
          <h2 className="section-title">History</h2>
          <div className="line"></div>

          <div className="history">
            {transactions.map((transaction) => (
              <div
                className={`transaction ${
                  transaction.amount > 0 ? "transaction-income" : "transaction-expense"
                }`}
                key={transaction.id}
              >
                <span>{transaction.title}</span>

                <span>
                  {transaction.amount > 0 ? "+" : "-"}$
                  {Math.abs(transaction.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Transaction */}
        <div className="section add-section">
          <h2 className="section-title">Add new transaction</h2>
          <div className="line"></div>

          <form onSubmit={addTransaction} className="form">

            <label>Title</label>

            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Amount</label>

            <input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="radio-group">

              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === "income"}
                  onChange={(e) => setType(e.target.value)}
                />
                Income
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={type === "expense"}
                  onChange={(e) => setType(e.target.value)}
                />
                Expense
              </label>

            </div>

            <button type="submit" className="add-button">
              Add transaction
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
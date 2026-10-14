import { useState, useEffect } from "react";
import { loadTransactions, saveTransactions } from "./utils/localStorage.js";
import NewTransaction from "./components/transactions/NewTransaction.jsx";
import TransactionTable from "./components/transactions/TransactionTable.jsx";
import Balance from "./components/account/Balance.jsx";
import AccountAlert from "./components/account/AccountAlert.jsx";
import "./App.css";
import MonthlySummary from "./components/account/MonthlySummary.jsx";
import TransactionFilters from "./components/transactions/TransactionFilters.jsx";

import {
  calculateBalance,
  calculateMonthlyTotals,
  addRunningBalance,
} from "./utils/transactionCalculations.js";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [transactions, setTransactions] = useState(loadTransactions);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const balance = calculateBalance(transactions);
  const monthlyTotals = calculateMonthlyTotals(transactions, selectedMonth);

  const transactionsWithBalance = addRunningBalance(
    [...transactions].sort((firstTransaction, secondTransaction) => {
      const dateComparison = firstTransaction.date.localeCompare(
        secondTransaction.date,
      );

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return firstTransaction.id - secondTransaction.id;
    }),
  );

  const availableMonths = [
    ...new Set(
      transactions
        .filter((transaction) => transaction.date)
        .map((transaction) => transaction.date.slice(0, 7)),
    ),
  ].sort((firstMonth, secondMonth) => secondMonth.localeCompare(firstMonth));

  const filteredTransactions = transactionsWithBalance
    .filter((transaction) => {
      const matchesMonth =
        selectedMonth === "all" ||
        transaction.date.slice(0, 7) === selectedMonth;

      const matchesType =
        selectedType === "all" ||
        transaction.depositWithdrawal === selectedType;

      const matchesCategory =
        selectedCategory === "all" || transaction.category === selectedCategory;

      return matchesMonth && matchesType && matchesCategory;
    })
    .sort((firstTransaction, secondTransaction) => {
      const dateComparison = secondTransaction.date.localeCompare(
        firstTransaction.date,
      );

      if (dateComparison !== 0) {
        return dateComparison;
      }

      return secondTransaction.id - firstTransaction.id;
    });

  function handleAddTransaction(transaction) {
    setTransactions((previousTransactions) => [
      ...previousTransactions,
      transaction,
    ]);
  }

  function handleDeleteTransaction(transactionId) {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    );
  }

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <div className="dashboard">
      <header className="dashboard-hero">
        <div className="dashboard-width">
          <p className="dashboard-hero__eyebrow">Bank account</p>

          <h1 className="dashboard-hero__title">Transactions & overview</h1>
        </div>
      </header>
      <main className="dashboard-width dashboard-content">
        {/* Saldo, summary, formular og tabel  */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-3">
            <Balance balance={balance} />
          </div>
        </div>

        <AccountAlert balance={balance} />

        <div className="mb-4">
          <MonthlySummary
            selectedMonth={selectedMonth}
            monthlyIncome={monthlyTotals.income}
            monthlyExpenses={monthlyTotals.expenses}
          />
        </div>
        <div className="row g-4">
          <div className="col-12 col-xl-3">
            <NewTransaction onAddTransaction={handleAddTransaction} />
          </div>

          <div className="col-12 col-xl-9">
            <h2 className="mb-3">Transactions</h2>

            <TransactionFilters
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              availableMonths={availableMonths}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <TransactionTable
              transactions={filteredTransactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        </div>
      </main>
      );
    </div>
  );
}

export default App;

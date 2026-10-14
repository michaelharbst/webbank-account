import { useState } from "react";
import "./NewTransaction.css";

const emptyTransaction = {
  depositWithdrawal: "",
  date: "",
  amount: "",
  category: "",
  description: "",
};

function NewTransaction({ onAddTransaction }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [newTransaction, setNewTransaction] = useState(emptyTransaction);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(newTransaction.amount);

    const isFormIncomplete =
      !newTransaction.depositWithdrawal || !newTransaction.date || amount <= 0;

    if (isFormIncomplete) {
      setErrorMessage("please fill in the mandatory fields to continue");
      return;
    }

    const transactionToAdd = {
      ...newTransaction,
      id: Date.now(),
      amount: amount,
    };

    onAddTransaction(transactionToAdd);
    setNewTransaction(emptyTransaction);
  }

  return (
    <section className="card new-transaction">
      <div className="card-body">
        <h2 className="card-title mb-4">New transaction</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="depositWithdrawal" className="form-label">
              Income or expense
            </label>

            <select
              id="depositWithdrawal"
              name="depositWithdrawal"
              className="form-select"
              value={newTransaction.depositWithdrawal}
              onChange={handleInputChange}
              required
            >
              <option value="">Select transaction type</option>

              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              className="form-control"
              value={newTransaction.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className="form-control"
              value={newTransaction.amount}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>

            <select
              id="category"
              name="category"
              className="form-select"
              value={newTransaction.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              <option value="salary">Salary</option>
              <option value="housing">Housing</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="leisure">Leisure</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="Short description"
              className="form-control"
              value={newTransaction.description}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add transaction
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewTransaction;

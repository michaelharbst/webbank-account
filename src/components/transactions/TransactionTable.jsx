import "./TransactionTable.css";

function TransactionTable({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <section>
        <h2>Transactions</h2>

        <div className="alert alert-secondary">
          No transactions have been added.
        </div>
      </section>
    );
  }
  function handleDeleteClick(transaction) {
    const shouldDelete = window.confirm(
      `Delete "${transaction.description}" from ${transaction.date}?`,
    );

    if (shouldDelete) {
      onDeleteTransaction(transaction.id);
    }
  }
  return (
    <section>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Income / expense</th>
              <th className="text-end">Amount</th>
              <th className="text-end">Balance</th>
              <th scope="Col">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>

                <td>{transaction.description}</td>

                <td>{transaction.category}</td>

                <td>{transaction.depositWithdrawal}</td>

                <td
                  className={`text-end transaction-amount transaction-amount--${transaction.depositWithdrawal}`}
                >
                  {transaction.depositWithdrawal === "expense" ? "-" : "+"}
                  {Number(transaction.amount).toFixed(2)} kr.
                </td>
                <td className="text-end">
                  {transaction.runningBalance.toLocaleString("da-DK", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  kr.
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteClick(transaction)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionTable;

export function calculateBalance(transactions) {
  return transactions.reduce((total, transaction) => {
    if (transaction.depositWithdrawal === "income") {
      return total + transaction.amount;
    }

    return total - transaction.amount;
  }, 0);
}

export function addRunningBalance(transactions) {
  let runningBalance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    if (transaction.depositWithdrawal === "income") {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }

    return {
      ...transaction,
      runningBalance: runningBalance,
    };
  });

  return transactionsWithBalance;
}

export function calculateMonthlyTotals(transactions, selectedMonth) {
  return transactions.reduce(
    (totals, transaction) => {
      // Spring transaktioner uden en gyldig dato over.
      if (!transaction.date) {
        return totals;
      }

      const transactionMonth = transaction.date.slice(0, 7);

      if (selectedMonth !== "all" && transactionMonth !== selectedMonth) {
        return totals;
      }

      if (transaction.depositWithdrawal === "income") {
        totals.income += transaction.amount;
      } else {
        totals.expenses += transaction.amount;
      }

      return totals;
    },
    { income: 0, expenses: 0 },
  );
}

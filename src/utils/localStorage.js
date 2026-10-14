const TRANSACTIONS_KEY = "bankAccountTransactions";

export function loadTransactions() {
  const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);

  if (!storedTransactions) {
    return [];
  }

  try {
    const transactions = JSON.parse(storedTransactions);

    if (!Array.isArray(transactions)) {
      return [];
    }

    return transactions.filter(
      (transaction) =>
        transaction &&
        typeof transaction === "object" &&
        typeof transaction.date === "string" &&
        transaction.date.length > 0 &&
        ["income", "expense"].includes(transaction.depositWithdrawal) &&
        Number.isFinite(Number(transaction.amount)),
    );
  } catch (error) {
    console.error("Could not load transactions:", error);

    return [];
  }
}

export function saveTransactions(transactions) {
  const transactionsAsJson = JSON.stringify(transactions);

  localStorage.setItem(TRANSACTIONS_KEY, transactionsAsJson);
}

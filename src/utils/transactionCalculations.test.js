import { describe, expect, it } from "vitest";
import { calculateBalance } from "./transactionCalculations.js";

describe("calculateBalance", () => {
  it("adds income and subtracts expenses", () => {
    const transactions = [
      { depositWithdrawal: "income", amount: 1500 },
      { depositWithdrawal: "expense", amount: 250 },
      { depositWithdrawal: "income", amount: 100 },
    ];

    const expectedBalance = transactions.reduce((total, transaction) => {
      const sign = transaction.depositWithdrawal === "income" ? 1 : -1;
      return total + transaction.amount * sign;
    }, 0);

    expect(calculateBalance(transactions)).toBe(expectedBalance);
  });
});

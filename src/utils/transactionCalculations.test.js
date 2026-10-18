import { describe, expect, it } from "vitest";
import { calculateBalance, calculateMonthlyTotals } from "./transactionCalculations.js";

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

describe('calculateMonthlyTotals', () => {
  it('calculates totals for the selected month and ignores transactions without a date', () => {
    const transactions = [
      { depositWithdrawal: 'income', amount: 1800, date: '2026-01-10' },
      { depositWithdrawal: 'expense', amount: 400, date: '2026-01-14' },
      { depositWithdrawal: 'income', amount: 1000, date: '2026-02-05' },
      { depositWithdrawal: 'expense', amount: 60, date: '' },
    ]

    expect(calculateMonthlyTotals(transactions, '2026-01')).toEqual({
      income: 1800,
      expenses: 400,
    })
  })
})

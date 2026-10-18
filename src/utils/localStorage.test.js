import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadTransactions, saveTransactions } from "./localStorage.js";

describe("transaction localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty array when nothing has been saved", () => {
    expect(loadTransactions()).toEqual([]);
  });

  it("saves transactions and loads them again", () => {
    const transactions = [
      {
        id: 1,
        date: "2026-01-10",
        depositWithdrawal: "income",
        amount: 125.5,
      },
    ];

    saveTransactions(transactions);

    expect(loadTransactions()).toEqual(transactions);
  });

  it("ignores invalid transactions in the saved data", () => {
    const validTransaction = {
      id: 1,
      date: "2026-01-10",
      depositWithdrawal: "income",
      amount: 125.5,
    };

    const savedData = [
      validTransaction,
      { ...validTransaction, date: "" },
      { ...validTransaction, depositWithdrawal: "transfer" },
      { ...validTransaction, amount: "not a number" },
      null,
    ];

    localStorage.setItem(
      "bankAccountTransactions",
      JSON.stringify(savedData),
    );

    expect(loadTransactions()).toEqual([validTransaction]);
  });

  it("returns an empty array when the saved JSON is invalid", () => {
    localStorage.setItem("bankAccountTransactions", "not valid JSON");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(loadTransactions()).toEqual([]);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
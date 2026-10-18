import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TransactionTable from "./TransactionTable.jsx";

const transaction = {
  id: 1,
  date: "2026-01-10",
  description: "Monthly salary",
  category: "salary",
  depositWithdrawal: "income",
  amount: 1500,
  runningBalance: 1500,
};

describe("TransactionTable", () => {
  it("shows a message when there are no transactions", () => {
    render(
      <TransactionTable
        transactions={[]}
        onDeleteTransaction={vi.fn()}
      />,
    );

    expect(
      screen.getByText("No transactions have been added."),
    ).toBeInTheDocument();
  });

  it("deletes a transaction when deletion is confirmed", async () => {
    const user = userEvent.setup();
    const onDeleteTransaction = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <TransactionTable
        transactions={[transaction]}
        onDeleteTransaction={onDeleteTransaction}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDeleteTransaction).toHaveBeenCalledWith(1);
  });

  it("keeps a transaction when deletion is cancelled", async () => {
    const user = userEvent.setup();
    const onDeleteTransaction = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(
      <TransactionTable
        transactions={[transaction]}
        onDeleteTransaction={onDeleteTransaction}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDeleteTransaction).not.toHaveBeenCalled();
  });
});
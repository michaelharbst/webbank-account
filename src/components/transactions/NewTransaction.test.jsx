import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import NewTransaction from "./NewTransaction.jsx";

describe("NewTransaction", () => {
  it("sends a completed income transaction to the parent", async () => {
    const user = userEvent.setup();
    const onAddTransaction = vi.fn();

    render(<NewTransaction onAddTransaction={onAddTransaction} />);

    await user.selectOptions(
      screen.getByLabelText("Income or expense"),
      "income",
    );
    await user.type(screen.getByLabelText("Date"), "2026-01-10");
    await user.type(screen.getByLabelText("Amount"), "1500");
    await user.selectOptions(screen.getByLabelText("Category"), "salary");
    await user.type(
      screen.getByLabelText("Description"),
      "Monthly salary",
    );

    await user.click(
      screen.getByRole("button", { name: "Add transaction" }),
    );

    expect(onAddTransaction).toHaveBeenCalledTimes(1);
    expect(onAddTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        depositWithdrawal: "income",
        date: "2026-01-10",
        amount: 1500,
        category: "salary",
        description: "Monthly salary",
      }),
    );
  });

  it("does not add a transaction when the amount is missing", async () => {
  const user = userEvent.setup();
  const onAddTransaction = vi.fn();

  render(<NewTransaction onAddTransaction={onAddTransaction} />);

  await user.selectOptions(
    screen.getByLabelText("Income or expense"),
    "income",
  );
  await user.type(screen.getByLabelText("Date"), "2026-01-10");

  await user.click(
    screen.getByRole("button", { name: "Add transaction" }),
  );

  expect(onAddTransaction).not.toHaveBeenCalled();
});
});